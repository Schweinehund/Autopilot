---
phase: 139-governance-carve-fetch-depth-retrofit-shallow-job-repair
reviewed: 2026-08-06T03:51:18Z
depth: standard
files_reviewed: 25
files_reviewed_list:
  - .claude/hooks/v1.20-carve-gate.cjs
  - .claude/settings.local.json
  - .github/workflows/audit-harness-integrity.yml
  - .github/workflows/audit-harness-v1.5-integrity.yml
  - .github/workflows/audit-harness-v1.6-integrity.yml
  - .github/workflows/audit-harness-v1.7-integrity.yml
  - .github/workflows/audit-harness-v1.8-integrity.yml
  - .github/workflows/audit-harness-v1.9-integrity.yml
  - .github/workflows/audit-harness-v1.10-integrity.yml
  - .github/workflows/audit-harness-v1.11-integrity.yml
  - .github/workflows/audit-harness-v1.12-integrity.yml
  - .github/workflows/audit-harness-v1.13-integrity.yml
  - .github/workflows/audit-harness-v1.14-integrity.yml
  - .github/workflows/audit-harness-v1.15-integrity.yml
  - .github/workflows/audit-harness-v1.16-integrity.yml
  - .github/workflows/audit-harness-v1.17-integrity.yml
  - .github/workflows/audit-harness-v1.18-integrity.yml
  - .github/workflows/audit-harness-v1.19-integrity.yml
  - .gitignore
  - scripts/validation/_lib/frozen-at-close.mjs
  - scripts/validation/carve-gate.mjs
  - scripts/validation/check-phase-49.mjs
  - scripts/validation/check-phase-51.mjs
  - scripts/validation/check-phase-69.mjs
  - scripts/validation/check-phase-70.mjs
  - scripts/validation/frozen-read-negative-test.mjs
findings:
  critical: 1
  warning: 3
  info: 1
  total: 5
status: issues_found
---

# Phase 139: Code Review Report

**Reviewed:** 2026-08-06T03:51:18Z
**Depth:** standard
**Files Reviewed:** 25
**Status:** issues_found

## Summary

Reviewed the v1.20 CARVE governance gate (`carve-gate.mjs` + its Stop-hook), the extended
`frozen-at-close.mjs` library (`lsTreeAtClose` + `frozenCause`), the fail-loud conversion in
`check-phase-49/51.mjs`, the frozen-to-frozen `V-69-08`/`V-70-17` blob comparison, the
shallow-clone negative-test harness, and all 16 `fetch-depth: 0` / `frozen-read-probe`
workflow retrofits.

The bulk of the delivered work is solid and was empirically verified, not just read:
`carve-gate.mjs --self-test` (7/7 PASS), a live `carve-gate.mjs --json` run against the actual
dirty tree, `check-phase-49.mjs` (22/22 PASS against the current frozen SHAs), and a set of
manual `git` probes reproducing the exact stderr strings `frozenCause()` matches against. All
16 workflows were grep-verified to carry `fetch-depth: 0` on every checkout and a
`frozen-read-probe` job with zero `needs:` key (genuinely dependency-free, as required — a
`needs:` key would make the probe skip precisely when the harness fails, destroying its
evidentiary value). The `V-69-08`/`V-70-17` conversion correctly fixes the prior
`check-phase-63.mjs` V-63-08 anti-pattern (skip-pass on `git rev-parse` failure) by pushing any
`rev-parse` failure into the `drift` array instead — verified by reading both files side by
side.

Two real defects remain in the gate's own enforcement logic (the class of bug the review brief
explicitly asked to hunt for: an allowlist gate that wrongly passes). One is a genuine
fail-open swallow inside `carve-gate.mjs` itself; the other is a logic gap in the D-09
genesis-exemption rule that a crafted two-commit history can exploit to smuggle a self-
authorizing amendment through undetected. Two further quality/verification-gap findings round
out the list (a Stop-hook whose diagnostic message goes blank on non-off-list gate failures,
and an untested classifier branch in `frozenCause`).

## Critical Issues

### CR-01: `commitsInRange()` silently swallows `git log` failures, disabling the D-09 committed-history check

**File:** `scripts/validation/carve-gate.mjs:139-146`
**Issue:** `commitsInRange(base)` wraps `git log --format=%H <base>..HEAD` in a bare
try/catch that returns `[]` on any failure:

```js
function commitsInRange(base) {
  try {
    const out = git(['log', '--format=%H', base + '..HEAD']);
    return out.split('\n').map((s) => s.trim()).filter(Boolean);
  } catch {
    return [];
  }
}
```

`checkAmendmentViolations()` (the D-09 self-authorization enforcement — the rule that a commit
must never amend the CARVE allowlist and land the edit it authorizes in the same commit) feeds
this return value directly into its commit-level violation loop. If `git log` fails for *any*
reason — an unreachable `base` in a partially-shallow or ref-corrupted clone, a transient git
error, `base` resolving differently for `log`'s range-walk than for `diff`'s single-tree
comparison — the function returns an empty array instead of throwing, and
`checkAmendmentViolations` silently reports **zero commit-level violations**, with no log line,
no exit code, no signal that anything went wrong. This is a fail-open path in the exact
component this milestone's CARVE governance exists to make fail-loud (see `frozen-at-close.mjs`
D-27/D-28's explicit "enrichment, not a swallow" comment, and `frozen-read-negative-test.mjs`'s
entire purpose) — and it sits inside the gate's own core enforcement, not a downstream
consumer.

In the one condition tested (a wholly unresolvable `base` SHA), `diffChangedPaths(base)` throws
first and `main()` exits 1 before `checkAmendmentViolations` is ever reached, which currently
masks the bug in the most obvious repro. But this is incidental protection from a *different*
code path, not a designed invariant: `diffChangedPaths` and `commitsInRange` resolve `base`
through different git subcommands (`diff <base>` vs. `log <base>..HEAD`), and a future
refactor, a partially-shallow ref graph, or a re-ordering of the two calls in `main()` would
reactivate the hole with no test currently guarding against it. Given a gate whose entire job
is refusing an off-list edit that arrives packaged with its own authorization, "quietly report
0 violations instead of failing loud" is the single most consequential defect class this file
can have.

**Fix:** Match the fail-loud pattern already used everywhere else in this phase's own delivered
code (`readAtClose`/`lsTreeAtClose` in `frozen-at-close.mjs`) — rethrow instead of swallowing,
and let `main()`'s existing outer semantics turn it into a hard exit 1:

```js
function commitsInRange(base) {
  const out = git(['log', '--format=%H', base + '..HEAD']);
  return out.split('\n').map((s) => s.trim()).filter(Boolean);
}
```

and wrap the `checkAmendmentViolations(base)` call site in `main()` in the same
try/catch-and-exit-1 pattern already used for `readAllowlist` and the diff/status reads, so a
`git log` failure fails the gate closed instead of silently passing D-09.

## Warnings

### WR-01: D-09 genesis exemption is keyed on per-commit status, not "never existed before" — a delete-then-recreate sequence defeats the self-authorization guard

**File:** `scripts/validation/carve-gate.mjs:194-221`
**Issue:** `checkAmendmentViolations` exempts a commit from the D-09 check when the CARVE's
`git show --name-status` code for that commit `startsWith('A')` (line 200), and exempts the
working tree when its porcelain code is `'??'` or `.includes('A')` (line 211). Both checks are
purely *local to the single commit/working-tree state being examined* — neither asks "has this
file ever existed in this repo's history before now?"

Concretely: commit N deletes `.planning/milestones/v1.20-CARVE.md` (status `D`, an in-scope-
excluded path so this alone doesn't fail the gate against `base`). Commit N+1 re-adds the file
(status `A`) with a *new* glob category, in the same commit as an edit to a path that now
matches that new glob. Because commit N+1's CARVE status is `A`, `checkAmendmentViolations`
classifies it as a genesis commit and exempts it — even though the file demonstrably existed
before commit N, and the "genesis" is fabricated by the delete/recreate pair. The independent
off-list `partition()` check downstream still runs, but it now sees the edited path as on-list
(because the very same commit added the covering glob), so nothing in the pipeline flags the
self-authorization. This is precisely the failure mode D-09 exists to prevent: an edit and the
allowlist entry that legitimizes it landing together.

**Fix:** Base the genesis determination on whether `CARVE_PATH` is reachable at `base` (or at
any ancestor of `HEAD` prior to the commit under test), not on the single commit's status
letter — e.g. `git cat-file -e <parent-of-commit>:<CARVE_PATH>` failing is the actual "did not
exist before" signal, not the local `A` status:

```js
function carveExistedBefore(sha) {
  try {
    execFileSync('git', ['cat-file', '-e', sha + '^:' + CARVE_PATH], { stdio: 'ignore' });
    return true;
  } catch {
    return false; // absent at parent — this really is the first-ever creation
  }
}
```

### WR-02: Stop-hook loses the real failure reason for every non-off-list gate failure

**File:** `.claude/hooks/v1.20-carve-gate.cjs:83-100, 125-139`; `scripts/validation/carve-gate.mjs:236-258`
**Issue:** `carve-gate.mjs` only writes JSON to stdout (even under `--json`) on the "off-list
paths found" success-of-parsing path (lines 270-286). On every other failure — missing CARVE
file, unparseable/empty allowlist, a git read failure, or a D-09 amendment violation — it
writes only to stderr and exits 1 with **empty stdout** (lines 236-240, 247-251, 254-258).

The hook's `runGate()` then does:

```js
const out = err.stdout ? err.stdout.toString() : stdout;
let offList = [];
try { offList = JSON.parse(out).offList || []; } catch { offList = []; }
```

For all of those non-off-list failure classes, `out` is empty, `JSON.parse('')` throws, and
`offList` silently becomes `[]`. The resulting nudge/warn message then reads:

> "CARVE gate (v1.20-carve-gate): 0 off-list path(s) -- ."

for a missing CARVE file, a corrupt allowlist, a git-read error, *and* an actual D-09 violation
— four completely different, actionable failure classes all producing the same content-free
message. Worse, because `keyForOffList([])` is identical across all of them, the scratch-file
dedup logic treats a fresh D-09 violation arriving right after an unrelated git-read hiccup as
"the same off-list set fired again," jumping straight to the harder WARN tier instead of
nudging fresh — the escalation logic's entire purpose (distinguish a repeat of the *same*
problem from a new one) is defeated for this whole class of failure. The hook still blocks
correctly (fail-safe), but the user is told nothing useful about why.

**Fix:** Have `carve-gate.mjs` always emit a JSON error payload on stderr-only failure paths
too (e.g. `{ error: 'missing-carve' | 'amendment-violation' | 'git-read-failed', detail }`), and
have the hook surface that `error` field (or fall back to a distinct string like `'<gate error, see verbose output>'`) instead of defaulting to an empty `offList`, and include the error
class in `keyForOffList` so distinct failure classes don't collapse into one dedup bucket.

### WR-03: `frozenCause()`'s `'not a tree object'` sub-pattern is unverified/possibly unreachable

**File:** `scripts/validation/_lib/frozen-at-close.mjs:51-67`
**Issue:** The six-pattern classifier's `unreachable-sha` branch matches three substrings:
`'invalid object name'`, `'Not a valid object name'`, and `'not a tree object'`. Manual probing
confirms the first two are real and reachable from this module's actual call sites (`git show
<sha>:<path>` emits `invalid object name` on an unreachable sha; `git ls-tree <sha> -- <path>`
emits `Not a valid object name` on an unreachable sha — both were reproduced directly against
this repo). No self-test assertion (neither `frozen-at-close.mjs`'s own `selfTest()` nor
`frozen-read-negative-test.mjs`) exercises `'not a tree object'`, and manual attempts to
trigger it via both of this module's actual invocation shapes (`git show sha:path`, `git
ls-tree -r -z --name-only sha -- dirPrefix`) did not reproduce it. It appears to have been
added to satisfy the plan's documented "six-pattern, not two-pattern" grep-count requirement
(`139-02-PLAN.md:222`) rather than a confirmed real git message for a codepath this module
exercises. If the actual wording differs (or the branch is simply dead), a real occurrence of
whatever git error this was meant to catch would silently fall through to `'other'` with no
test ever catching the drift.

**Fix:** Either find and record the concrete git invocation that produces `not a tree object`
from this module's call shapes and add a self-test assertion for it (mirroring assertion (v)'s
shallow-clone pattern), or remove the untested pattern and let it fall through to `'other'`
until a real occurrence is observed and documented.

## Info

### IN-01: `MILESTONE_TAG` validation in the hook is dead code today

**File:** `.claude/hooks/v1.20-carve-gate.cjs:44-49`
**Issue:** `VERSION_RE.test(MILESTONE_TAG)` is checked but `MILESTONE_TAG` (`'v1.20'`) is never
subsequently used to construct a path or otherwise consumed anywhere else in the file. The
in-file comment explains this is deliberate forward-looking scaffolding ("the guard is what
makes it SAFE to derive a path from a milestone-tag-shaped string at all... if this hook is
cloned for v1.21+"), so this is not a functional defect — flagging only as a minor YAGNI note
per repo convention: the guard currently protects a value nothing reads.
**Fix:** No action required; low priority. If genuinely never consumed by the time this hook is
cloned for v1.21, delete both the constant and the guard at that point rather than carrying it
indefinitely.

---

_Reviewed: 2026-08-06T03:51:18Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
