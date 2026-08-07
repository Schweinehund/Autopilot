---
phase: 140-frozen-aware-harness-conversion
reviewed: 2026-08-07T05:08:53Z
depth: standard
files_reviewed: 18
files_reviewed_list:
  - scripts/validation/_lib/frozen-at-close.mjs
  - scripts/validation/v1.4-milestone-audit.mjs
  - scripts/validation/v1.4.1-milestone-audit.mjs
  - scripts/validation/v1.5-milestone-audit.mjs
  - scripts/validation/v1.6-milestone-audit.mjs
  - scripts/validation/v1.7-milestone-audit.mjs
  - scripts/validation/v1.8-milestone-audit.mjs
  - scripts/validation/v1.9-milestone-audit.mjs
  - scripts/validation/v1.10-milestone-audit.mjs
  - scripts/validation/v1.11-milestone-audit.mjs
  - scripts/validation/v1.12-milestone-audit.mjs
  - scripts/validation/v1.13-milestone-audit.mjs
  - scripts/validation/v1.14-milestone-audit.mjs
  - scripts/validation/v1.15-milestone-audit.mjs
  - scripts/validation/v1.16-milestone-audit.mjs
  - scripts/validation/v1.17-milestone-audit.mjs
  - scripts/validation/v1.18-milestone-audit.mjs
  - .claude/hooks/v1.20-carve-gate.cjs
findings:
  critical: 0
  warning: 2
  info: 2
  total: 4
status: issues_found
---

# Phase 140: Code Review Report

**Reviewed:** 2026-08-07T05:08:53Z
**Depth:** standard
**Files Reviewed:** 18
**Status:** issues_found

## Summary

Reviewed the 16 milestone-audit harness conversions (live-HEAD → frozen-at-close reads), the
`readManyAtClose`/`createFrozenCorpusReader` batch reader added to `_lib/frozen-at-close.mjs`,
and the hardened `v1.20-carve-gate.cjs` Stop hook.

Independent verification performed (not just reading):
- Ran `_lib/frozen-at-close.mjs --self-test`: 6/6 PASS.
- Wrote a standalone script that fetched all 232 files in the v1.5-close `docs/` tree via both
  `readManyAtClose` (the batch `cat-file --batch` path) and `readAtV15Close` (the per-file
  `git show` path) and diffed every file byte-for-byte. **0 mismatches across 232 files**,
  including files containing em-dashes (U+2014, confirmed 9 occurrences in one sampled file).
  This proves the Buffer-based byte-slicing in `readManyAtClose` does not desynchronize on
  multibyte content — the highest-risk item named in the review brief checks out clean.
- Ran all 16 converted harnesses directly: all exit 0, matching the stated "17 harnesses green"
  baseline.
- Confirmed via `lsTreeAtClose` probes that every milestone's `docs/` corpus enumerates a
  non-trivial, monotonically-growing file count (167 → 280 across V14…V118), and that the
  Android/Linux-scoped subdirectories used by `androidDocPaths()`/`linuxDocPaths()` enumerate
  non-zero at every sampled tag — ruling out the "enumerates zero files, passes vacuously"
  failure mode named in the review brief.
- Grepped all 16 harnesses for `MILESTONE_TAG`/`SIDECAR_PATH` and confirmed each file pins its
  own milestone's tag and its own sidecar filename (no cross-milestone copy-paste drift), that
  every harness constructs exactly one `FROZEN` reader instance (no split-instance corpus/sidecar
  reads), and that `walkMd()` is never called outside the `docs/` prefix the reader enumerates.
- Confirmed the only remaining `existsSync(...)` live-HEAD reads are the four identical,
  in-source-documented C17-contract-presence guards in v1.15–v1.18 (the accepted Phase 143
  deferral) — no other live-HEAD read survived the conversion.
- Confirmed the `v1.20-carve-gate.cjs` D-31 hardening does what its comment claims: a non-zero
  gate exit with an unparsed or empty `offList` now fails open with a diagnostic instead of
  falling through to a "0 off-list path(s) ... HARD-BLOCKING" message; ran its `--self-test`
  (6/6 PASS).

No blocker-tier defects found. Two warnings and two info-level findings, all latent-quality
items rather than currently-firing bugs, consistent with the stated "everything green today"
baseline.

## Warnings

### WR-01: `MILESTONE_TAG` in v1.20-carve-gate.cjs is validated but never used to build a path — the comment overstates what the guard protects

**File:** `.claude/hooks/v1.20-carve-gate.cjs:39-49`
**Issue:** The comment block says: *"This hook's only path-relevant constant (MILESTONE_TAG below) is validated against it before it is ever concatenated into a path... the guard is what makes it SAFE to derive a path from a milestone-tag-shaped string at all."* In fact `MILESTONE_TAG` is declared, regex-validated, and then never referenced again anywhere else in the file — `scratchPath()` builds its filename from the hardcoded literal `'v1.20-carve-gate-state.json'`, not from `` `${MILESTONE_TAG}-carve-gate-state.json` ``. The `VERSION_RE` guard is therefore currently inert: it protects a path-construction step that doesn't exist yet. This isn't exploitable today (nothing derives a path from the constant), but the comment will mislead a v1.21+ maintainer who clones this hook and assumes the anchoring guard already covers whatever they wire `MILESTONE_TAG` into — the actual `VERSION_RE.test()` call site and the actual path-building call site are decoupled, so a future edit could reintroduce the exact path-traversal shape this comment claims is prevented.
**Fix:** Either wire `MILESTONE_TAG` into `scratchPath()`'s filename (making the guard load-bearing), or trim the comment to state plainly that the guard is pre-emptive/currently unused rather than implying it's already protecting a live path-concatenation:
```js
// Pre-emptive guard: MILESTONE_TAG is NOT currently interpolated into any path (scratchPath()
// still uses a hardcoded literal). This validates the constant now so that IF a future v1.21+
// clone of this hook starts deriving a path from it, the anchoring check is already in place —
// it protects nothing today.
```

### WR-02: Dead imports left behind by the conversion in all 16 harnesses

**File:** `scripts/validation/v1.4-milestone-audit.mjs:18` (and the identical import line in all 15 other converted harnesses: v1.4.1, v1.5–v1.14, v1.15–v1.18)
**Issue:** Every converted harness still imports `readFileSync, existsSync, readdirSync, statSync` from `node:fs`. After the conversion:
- `readFileSync`, `readdirSync`, `statSync` are unused in **all 16** files (0 remaining call sites — verified by grep).
- `existsSync` is unused in the 12 pre-C17 harnesses (v1.4 through v1.14); it is legitimately still used in v1.15–v1.18 for the one documented C17-contract-presence exception.

There's no ESLint config wired into this repo's CI, so this doesn't fail a build today, but it's dead weight left by a mechanical 16-file conversion and will read as "did the conversion actually finish?" to the next person who greps for `readFileSync` expecting a real call site.
**Fix:** In v1.4 through v1.14, drop the import line to just `import { join } from 'node:path';` equivalent (remove the whole `node:fs` import if nothing else needs it) or trim to `import {} from 'node:fs'` → i.e. delete the import entirely. In v1.15–v1.18, trim to `import { existsSync } from 'node:fs';` only.

## Info

### IN-01: `_lib/frozen-at-close.mjs` header comment's importer count is now stale

**File:** `scripts/validation/_lib/frozen-at-close.mjs:359`
**Issue:** The self-test block's header comment states *"it is a no-op on `import`, so all 21 real importers are unaffected."* This phase added `createFrozenCorpusReader`/`readManyAtClose` imports to 16 new files. A current count (`grep -rl "from '.*_lib/frozen-at-close.mjs'" scripts/validation/*.mjs | wc -l`) returns **39** importers today, not 21. Not a functional defect — just a number that will confuse the next reader trying to gauge blast radius of an edit to this file.
**Fix:** Update the comment to either drop the specific number (`"...so all real importers are unaffected"`) or refresh it to the current count with a note that it will drift again.

### IN-02: `v1.20-carve-gate.cjs` self-test doesn't exercise the D-31 hardening it was written to add

**File:** `.claude/hooks/v1.20-carve-gate.cjs:174-201`
**Issue:** The `runSelfTest()` block tests `computeDecision()`'s pure decision matrix (allow/nudge/warn/stop_hook_active) and `keyForOffList()`'s hashing, but nothing in the self-test exercises the actual bug this phase's diff fixes — the `!parsed || offList.length === 0` fail-open branch added to `main()` (lines 130-137). That branch was verified manually in this review (by inspection and by tracing `runGate()`'s catch path), but it has no automated regression coverage; a future refactor of `runGate()`'s JSON-parsing logic could silently reintroduce the "0 off-list path(s) ... HARD-BLOCKING" defect this hardening exists to prevent, and `--self-test` would still report 6/6 PASS.
**Fix:** Add a synthetic-fixture test for the D-31 branch by extracting the `!parsed || offList.length === 0` check into a small pure predicate (mirroring how `computeDecision` was already extracted) so it can be asserted directly, e.g.:
```js
function shouldFailOpenOnUnnamedOffList(parsed, offList) {
  return !parsed || offList.length === 0;
}
// self-test:
assert('fail-open on unparsed gate output', shouldFailOpenOnUnnamedOffList(false, []) === true);
assert('fail-open on genuinely-empty offList', shouldFailOpenOnUnnamedOffList(true, []) === true);
assert('proceeds to nudge/warn on real offList', shouldFailOpenOnUnnamedOffList(true, ['x.mjs']) === false);
```

---

_Reviewed: 2026-08-07T05:08:53Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
