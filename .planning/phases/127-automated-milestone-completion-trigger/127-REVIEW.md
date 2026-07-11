---
phase: 127-automated-milestone-completion-trigger
reviewed: 2026-07-11T00:35:00Z
depth: standard
files_reviewed: 2
files_reviewed_list:
  - .claude/hooks/publish-bundle-gate.cjs
  - scripts/pipeline/build-publish-bundle.mjs
findings:
  critical: 0
  warning: 2
  info: 1
  total: 3
status: issues_found
---

# Phase 127: Code Review Report

**Reviewed:** 2026-07-11T00:35:00Z
**Depth:** standard
**Files Reviewed:** 2
**Status:** issues_found

## Summary

Reviewed the new Stop-hook (`publish-bundle-gate.cjs`, 127-02) and the `--version` CLI
parameterization added to `build-publish-bundle.mjs` (127-01).

Verified directly (static read + `git diff 9a649f7^..HEAD` scoping + live execution):

- **Fail-open contract holds.** `main()` is wrapped in `try { main(); } catch { process.exit(0); }`;
  every early-return path uses `allow()`/`block()`, both of which `process.exit(0)`. No
  `process.exit(2)` anywhere in the file, no `continue` key ever emitted (self-test assertion
  (h) plus a manual grep both confirm this). Ran the hook end-to-end against a synthetic
  `.planning/STATE.md` (traversal-shaped `milestone:`, no-`v`-prefix `milestone:`, and a
  normal complete-milestone case) — every invocation exited 0 and never wrote anywhere.
- **Never writes STATE.md.** Grepped the file for `writeFileSync`/`appendFileSync` — zero
  matches; the hook only ever calls `fs.existsSync` / `fs.readFileSync` against
  `.planning/STATE.md` and `dist/<zip>`.
- **Version validation is anchored and argv-array-safe.** `VERSION_RE = /^v?\d+\.\d+(\.\d+)?$/`
  is `$`-terminated, correctly rejecting the traversal-shaped `v1.17/../../secrets` case
  (confirmed live: silent allow, exit 0). All subprocess calls (`execFileSync('pandoc', […])`,
  `execFileSync('pwsh', […])`) pass argv as arrays — no shell-string interpolation of
  version-derived data anywhere in either file.
- **No `require()` of the ESM pipeline.** The hook is fully self-contained (its own
  `probePandoc`/`probePwsh`) and does not import `build-publish-bundle.mjs`, avoiding
  `ERR_REQUIRE_ESM`.
- **Probe timeouts bounded.** Two probes × 4000ms = 8s worst case, comfortably under the 15s
  Stop-hook ceiling.
- **`deriveZipName` in the .mjs is backward-compatible and fail-closed.** Missing `--version`
  defaults to `v1.17` (unchanged behavior); malformed/traversal-shaped input throws at module
  load, `FATAL:` to stderr, `exit(1)`, no zip written — confirmed by self-test cases (f1)-(f4),
  both of which pass live (`15 passed, 0 failed`).

Two lower-severity issues found below (a comment/regex correctness gap and a probe
error-handling inconsistency), plus one piece of genuinely dead code inherited from the
sibling hook's "clone the skeleton verbatim" approach. No BLOCKER-level findings.

## Warnings

### WR-01: Hook's version regex does not actually mirror `deriveZipName`'s, despite the comment claiming it does "exactly"

**File:** `.claude/hooks/publish-bundle-gate.cjs:32-37`
**Issue:** The comment states:

```
// ANCHORED ($-terminated) version validation -- mirrors 127-01's deriveZipName() exactly.
const VERSION_RE = /^v?\d+\.\d+(\.\d+)?$/;
```

But `scripts/pipeline/build-publish-bundle.mjs:55` defines `deriveZipName`'s validation as:

```js
if (!/^v\d+\.\d+(\.\d+)?$/.test(version)) { ... }
```

The hook's regex makes the leading `v` **optional** (`v?`); `deriveZipName`'s makes it
**mandatory**. They are not the same regex, so the "mirrors ... exactly" claim is false. In
practice this doesn't currently cause a functional break — the hook always normalizes to a
`v`-prefixed string (`normalizedVersion = version.startsWith('v') ? version : 'v' + version`)
before embedding it in the suggested `--version=` command, so the value handed to
`deriveZipName` downstream always satisfies its stricter mandatory-`v` regex. But the
inaccurate comment is a real maintenance hazard: a future refactor that assumes the two regexes
are interchangeable (e.g., extracting one shared constant, or having the hook pass a raw
unnormalized `version` straight through) would silently reintroduce a validation gap, since the
two patterns accept different input sets.
**Fix:** Either make the comment accurate (state the intentional divergence — hook accepts both
forms and normalizes, CLI requires the `v` prefix explicitly), or share a single exported regex
constant between the two files to remove the duplication risk entirely, e.g.:

```js
// mirrors deriveZipName()'s mandatory-v regex, but additionally accepts an unprefixed
// milestone value (STATE.md's `milestone:` field is sometimes written without a leading v);
// normalizedVersion below guarantees the value handed to the CLI always has the v prefix.
const VERSION_RE = /^v?\d+\.\d+(\.\d+)?$/;
```

### WR-02: `probePandoc` misclassifies a subprocess timeout as "pandoc present"

**File:** `.claude/hooks/publish-bundle-gate.cjs:47-63`
**Issue:**

```js
function probePandoc() {
  try {
    execFileSync('pandoc', ['--version'], { stdio: 'pipe', timeout: PROBE_TIMEOUT_MS });
    return true;
  } catch (e) {
    if (e.code === 'ENOENT' || e.status === 127) { ... return false-ish ... }
    return true; // non-ENOENT error ... still means the binary exists
  }
}
```

When `execFileSync`'s `timeout` fires, Node kills the child with `SIGTERM` and throws an error
whose `.code` is not `'ENOENT'` and whose `.status` is `null` (not `127`) — the error instead
carries `.signal === 'SIGTERM'` (and `.killed === true`). That error falls through to the
`return true` branch, so a hung/unresponsive `pandoc` binary is reported as "present and OK"
after burning the full 4s timeout, rather than being treated as unavailable. This is
inconsistent with `probePwsh`, whose catch is unconditional (`catch { return false; }` — *any*
error, including a timeout, is treated as "not available"). The two probes disagree on how to
treat a timeout, and `probePandoc`'s treatment is the more dangerous of the two: it can produce
a "nudge" (prerequisites present, go ahead and run the build) when pandoc is actually
non-functional, which just means the user hits a `FATAL:` failure in
`build-publish-bundle.mjs`'s own `preflightCheck()` instead of getting an accurate warn message
from the hook.
**Fix:** Treat a timeout as "not confirmed present," matching `probePwsh`'s conservative
behavior:

```js
} catch (e) {
  if (e.signal || e.killed) return false; // timed out — don't assume presence
  if (e.code === 'ENOENT' || e.status === 127) { ... }
  return true;
}
```

## Info

### IN-01: `completedPhases` is dead — computed and threaded through but never read

**File:** `.claude/hooks/publish-bundle-gate.cjs:76, 104, 124-126`
**Issue:** `main()` parses `completed_phases` from STATE.md frontmatter and passes it into
`computeDecision({ ..., completedPhases, ... })`, but `computeDecision`'s destructured
`completedPhases` parameter (line 76) is never referenced in the function body — only
`stopHookActive`, `version`, `status`, `percent`, `zipExists`, `pandocOk`, and `pwshOk` drive the
decision. This is leftover from cloning `jira-milestone-gate.cjs`'s skeleton "verbatim" (per
the file's own header comment) — in the sibling hook `completedPhases` legitimately drives a
`completionDrift` check that has no equivalent here, since this hook's gate is purely
zip-presence + milestone-complete + prerequisite-availability. It's harmless (no behavior
impact) but is unused code that adds a false impression the decision considers phase-completion
granularity.
**Fix:** Drop `completedPhases` from the `grab()` call and from the `computeDecision()` call
site/parameter list (and from `BASE` in the self-test fixture, where it's likewise inert), or
add a one-line comment noting it's intentionally unused/reserved.

---

_Reviewed: 2026-07-11T00:35:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
