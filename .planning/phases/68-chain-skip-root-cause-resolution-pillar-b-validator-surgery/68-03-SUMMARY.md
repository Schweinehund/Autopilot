---
phase: 68-chain-skip-root-cause-resolution-pillar-b-validator-surgery
plan: 03
subsystem: validation
tags:
  - validation
  - atomic-commit
  - chain-skip-removal
  - chain-03
  - phase-68
  - pillar-b
  - validator-surgery
  - v1.5-frozen-aware
  - option-a-pivot
dependency_graph:
  requires:
    - 68-01 (CHAIN-01 CRLF normalization @ 36a753d)
    - 68-02 (CHAIN-02 archive-path helper + self-test repoint + v1.5 sidecar rebase @ 79c65c6)
    - 68-04 (MILESTONES.md cdcce23 garbage-entry deletion @ d142c7a)
  provides:
    - empty CHAIN_SKIP across check-phase-{62,63,64,65,66}.mjs (atomic 5-file commit @ 7b635ca)
    - V-61-01..04 v1.5-frozen-aware (precondition commit @ d7d7d5f; Plan 68-03 Option A pivot)
    - subprocess timeout 60000ms -> 300000ms across 10 sites in chain validators (deviation Rule 3 auto-fix)
  affects:
    - full chain check-phase-{48..66}.mjs exits 0 with 0 SKIPPED — first time since v1.5 close
tech_stack:
  added: []
  patterns:
    - "V1.5-frozen-aware validator surgery: reading historical state at v1.5-close SHA ba2cbc0 via execFileSync('git', ['show', 'ba2cbc0:.planning/REQUIREMENTS.md']) rather than HEAD — same pattern as Plan 68-02 archive-path helper"
    - "Atomic 5-file indivisible commit per Phase 66-02 (3a9a671) precedent — preserves chain-validator topology atomicity"
    - "SHA-placeholder handling: {68_03_SHA} + {68_05_SHA} left as literal tokens for Plan 68-05 close-gate fill via amend or follow-up commit (avoids self-referential chicken-and-egg)"
key_files:
  created:
    - .planning/phases/68-chain-skip-root-cause-resolution-pillar-b-validator-surgery/68-03-SUMMARY.md
  modified:
    - scripts/validation/check-phase-61.mjs (Task 1 precondition @ d7d7d5f)
    - scripts/validation/check-phase-62.mjs (Task 2 atomic @ 7b635ca)
    - scripts/validation/check-phase-63.mjs (Task 2 atomic @ 7b635ca)
    - scripts/validation/check-phase-64.mjs (Task 2 atomic @ 7b635ca)
    - scripts/validation/check-phase-65.mjs (Task 2 atomic @ 7b635ca)
    - scripts/validation/check-phase-66.mjs (Task 2 atomic @ 7b635ca)
decisions:
  - "Option A pivot — validator surgery on check-phase-61.mjs V-61-01..04 (user-approved at checkpoint). V-61-01..04 originally asserted post-Plan-61-04 state of `## v1.5 Requirements (Active)` section in REQUIREMENTS.md, but the file was reorganized for v1.7 (`## v1.7 Requirements (Active)` per commit 939a8af; v1.5 reqs migrated to PROJECT.md `## Validated` per Phase 61-03 commit 0302100). Fix: V-61-01..04 read REQUIREMENTS.md state at v1.5-close SHA ba2cbc0 via execFileSync('git', ['show', 'ba2cbc0:.planning/REQUIREMENTS.md']) instead of HEAD."
  - "Plan 68-03 split into 2 commits (precondition + atomic) due to Option A pivot, NOT one. Task 1 (d7d7d5f) = check-phase-61.mjs validator surgery as a separate stop-gate-clearing commit. Task 2 (7b635ca) = original atomic CHAIN_SKIP removal across 5 chain validators."
  - "Subprocess timeout 60000ms -> 300000ms across 10 sites (Rule 3 auto-fix). With empty CHAIN_SKIP, check-phase-66 recursively traverses the full chain via execFileSync subprocesses. check-phase-65 standalone now takes ~102s; original 60s timeout tripped V-66-CHAIN-65. 300s gives ~3x headroom."
metrics:
  duration_minutes: ~45
  completed: 2026-05-26
---

# Phase 68 Plan 68-03: ATOMIC CHAIN_SKIP Removal Summary

**One-liner:** Atomic 5-file CHAIN_SKIP empty-Set substitution across check-phase-{62..66}.mjs (commit `7b635ca`) preceded by Option A pivot precondition commit (`d7d7d5f`) that makes V-61-01..04 v1.5-frozen-aware — full chain check-phase-{48..66}.mjs exits 0 with 0 SKIPPED for the first time since v1.5 close.

## Execution Topology

Plan 68-03 landed as **2 separate commits** rather than 1 due to an Option A pivot surfaced at the cascade-verification step (gray-area-pick — user resolved at checkpoint):

| # | Commit  | Files | Type | Purpose |
|---|---------|-------|------|---------|
| 1 | `d7d7d5f` | scripts/validation/check-phase-61.mjs | precondition | V-61-01..04 v1.5-frozen-aware (Option A pivot) — clears the stop gate that masked CHAIN_SKIP removal |
| 2 | `7b635ca` | check-phase-62.mjs, check-phase-63.mjs, check-phase-64.mjs, check-phase-65.mjs, check-phase-66.mjs | atomic | CHAIN_SKIP = new Set([]) + uniform Phase-68-closure narrative + subprocess timeout 60s → 300s (Rule 3) |

This split is documented in commit body for `7b635ca`: "Cascade evidence … Plan 68-03 Task 1 (d7d7d5f): V-61-01..04 v1.5-frozen-aware (Option A pivot)".

## Task 1: Precondition — V-61-01..04 v1.5-frozen-aware (commit `d7d7d5f`)

### Discovery

During the Wave 1 cascade-verification step at the start of Plan 68-03, the executor (agentId `acd049c095db7c347`) discovered that `check-phase-61.mjs` was still failing 4 assertions (V-61-01..04) with `30 PASS, 4 FAIL, 0 SKIPPED` (exit=1):

```
[1/34] V-61-01: REQUIREMENTS.md active-section has zero unchecked [ ] reqs (post-Plan-61-04 AUDIT-08 flip) FAIL -- Active section boundaries not found
[2/34] V-61-02: REQUIREMENTS.md AUDIT-08 specifically flipped [x] (Plan 61-04 atomic close commit) FAIL -- AUDIT-08 not flipped to [x]
[3/34] V-61-03: REQUIREMENTS.md active reqs all carry inline traceability comments per CONTEXT D-09 template FAIL -- Active section boundaries not found
[4/34] V-61-04: REQUIREMENTS.md §Future Requirements legitimately deferred items preserved (LIN-DEFER-01, RHEL-01, BYOPC-01, WEB-01, CHROMEOS-01, CODE-01) FAIL -- Missing deferred items: LIN-DEFER-01, RHEL-01, BYOPC-01, WEB-01, CHROMEOS-01, CODE-01
```

Root cause: these checks assert structural state of the `## v1.5 Requirements (Active)` section of REQUIREMENTS.md, but the file was reorganized after v1.5 close:

| commit  | change |
|---------|--------|
| `b45777d` | docs(61-02): complete REQUIREMENTS.md verify-and-flip + ROADMAP §Progress reconciliation |
| `0302100` | docs(61-03): migrate v1.5 reqs Active→Validated + add Closed Deferred Items (v1.4.1 → v1.5) subsection |
| `939a8af` | docs: define milestone v1.7 requirements (replaces v1.5 active section with v1.7 active section) |

At v1.5-close SHA `ba2cbc0`, REQUIREMENTS.md had the `## v1.5 Requirements (Active)` section + the 6 deferred items LIN-DEFER-01, RHEL-01, BYOPC-01, WEB-01, CHROMEOS-01, CODE-01. These were migrated/closed post-close.

### Mechanism — Option A (user-approved)

V-61-01..04 now read REQUIREMENTS.md state at v1.5-close SHA `ba2cbc0` via `execFileSync('git', ['show', 'ba2cbc0:.planning/REQUIREMENTS.md'])` instead of HEAD. This preserves the original assertion semantics without breaking on v1.7 reorg — same v1.5-frozen-aware pattern as the archive-path helper from Plan 68-02 (CHAIN-02).

New helper added at the top of check-phase-61.mjs (just after `readFile()`):

```javascript
function readRequirementsAtV15Close() {
  try {
    return execFileSync('git', ['show', 'ba2cbc0:.planning/REQUIREMENTS.md'], { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n');
  } catch (err) {
    return null;
  }
}
```

Each of V-61-01..04 swapped `readFile(REQUIREMENTS)` → `readRequirementsAtV15Close()` + null-guard with detail message `'could not read REQUIREMENTS.md at v1.5-close ba2cbc0'`. Each check name suffixed with `[v1.5-frozen @ ba2cbc0]` for transparency.

### Result

| Before | After |
|--------|-------|
| 30 PASS, 4 FAIL, 0 SKIPPED (exit=1) | **34 PASS, 0 FAIL, 0 SKIPPED (exit=0)** |

## Task 2: Atomic CHAIN_SKIP Removal (commit `7b635ca`)

### Pre-edit Wave 1 cascade-verification

All 3 Wave 1 plan summaries confirmed present and SHAs captured:

| Plan | SUMMARY path | SHA |
|------|--------------|-----|
| 68-01 | 68-01-SUMMARY.md | `36a753d` |
| 68-02 | 68-02-SUMMARY.md | `79c65c6` |
| 68-04 | 68-04-SUMMARY.md | `d142c7a` |

Cascade cross-check (after Task 1 precondition commit `d7d7d5f`):

```
phase-48 exit=0 Result: 7 PASS, 0 FAIL, 0 SKIPPED
phase-51 exit=0 Summary: 25 passed, 0 failed, 0 skipped
phase-58 exit=0 Summary: 26 passed, 0 failed, 0 skipped
phase-60 exit=0 Result: 25 PASS, 0 FAIL, 0 SKIPPED
phase-61 exit=0 Result: 34 PASS, 0 FAIL, 0 SKIPPED
```

All 5 cascade-target validators GREEN. Safe to remove CHAIN_SKIP suppression.

### Per-file pre-edit / post-edit state

| File | CHAIN_SKIP line | BEFORE | AFTER |
|------|------------------|--------|-------|
| scripts/validation/check-phase-62.mjs | 67 | `const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);` | `const CHAIN_SKIP = new Set([]);` |
| scripts/validation/check-phase-63.mjs | 74 | `const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);` | `const CHAIN_SKIP = new Set([]);` |
| scripts/validation/check-phase-64.mjs | 73 | `const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);` | `const CHAIN_SKIP = new Set([]);` |
| scripts/validation/check-phase-65.mjs | 69 | `const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);` | `const CHAIN_SKIP = new Set([]);` |
| scripts/validation/check-phase-66.mjs | 64 | `const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);` | `const CHAIN_SKIP = new Set([]);` |

Note: line numbers 67 (check-phase-62) and 74 (check-phase-63) drifted by +1 from the original 68-RESEARCH.md inventory (66 / 73) — explained by an extra line in the existing per-file comment blocks that the inventory under-counted. The exact text-match was unaffected; both pre-edit `old_string` patterns matched verbatim.

### Uniform Phase-68-closure comment block

Each of the 5 files' canonical CHAIN_SKIP comment block (the multi-line `// ...` lines immediately above the `const CHAIN_SKIP` declaration) was replaced with the uniform Phase-68-closure template per 68-RESEARCH.md §Atomic Commit Surface. SHAs substituted:

| Placeholder | Filled with | Source |
|-------------|-------------|--------|
| `{68_01_SHA}` | `36a753d` | Plan 68-01 SUMMARY |
| `{68_02_SHA}` | `79c65c6` | Plan 68-02 SUMMARY |
| `{68_04_SHA}` | `d142c7a` | Plan 68-04 SUMMARY |
| `{68_03_SHA}` | **left as literal** | self-referential — Plan 68-05 close-gate fills via `sed -i` across all 5 files in one operation |
| `{68_05_SHA}` | **left as literal** | Plan 68-05 close-gate fills similarly |

Additionally each block now cites `d7d7d5f` for the Plan 68-03 Task 1 precondition commit (Option A pivot). The check-phase-66.mjs variant notes the historical "v1.7 CI-Linux job per v1.6-DEFERRED-CLEANUP.md" resolution path was superseded by Phase 68 Pillar B Validator Surgery.

### Subprocess timeout bump (deviation Rule 3 auto-fix)

**Discovery during post-edit dry-run:** After applying the empty-Set substitution, `check-phase-66.mjs` reported `Result: 27 PASS, 1 FAIL, 0 SKIPPED` with `V-66-CHAIN-65: check-phase-65.mjs exits 0 (CHAIN regression-guard) FAIL -- check-phase-65 FAIL:` (empty stderr).

Root cause: with `CHAIN_SKIP = new Set([])`, `check-phase-66.mjs` must now recursively traverse the full chain {48..65} via `execFileSync('node', [path], { stdio: 'pipe', timeout: 60000 })`. `check-phase-65.mjs` itself recursively traverses {48..64}, and standalone `time` measured `1m42.206s` (102 seconds) — exceeding the 60-second subprocess timeout. The empty-stderr FAIL matched the timeout-kill signature.

**Auto-fix (Rule 3 — blocking issue):** Bumped `timeout: 60000` → `timeout: 300000` (60s → 5min) across 10 sites in the 5 files (2 sites per file: one for CHAIN regression-guards, one for v1.5-milestone-audit invocation). Gives ~3x headroom over the empirical 102s standalone time for check-phase-65 (the deepest non-66 chain validator).

| File | sites bumped |
|------|--------------|
| check-phase-62.mjs | 2 (lines 313, 331) |
| check-phase-63.mjs | 2 (lines 318, 336) |
| check-phase-64.mjs | 2 (lines 303, 321) |
| check-phase-65.mjs | 2 (lines 291, 310) |
| check-phase-66.mjs | 2 (lines 310, 329) |

This is bundled into the same atomic commit `7b635ca` — the timeout bump is part of the empty-Set transition's correctness requirement, NOT a separate scope.

### Atomic commit boundary verification

```
$ git log --name-only -1 HEAD --pretty=format:"%h %s"
7b635ca fix(validation): atomically remove CHAIN_SKIP {48,51,58,60,61} from check-phase-62..66 (CHAIN-03)
scripts/validation/check-phase-62.mjs
scripts/validation/check-phase-63.mjs
scripts/validation/check-phase-64.mjs
scripts/validation/check-phase-65.mjs
scripts/validation/check-phase-66.mjs
```

Exactly 5 files in single SHA. Diff stat: `5 files changed, 102 insertions(+), 101 deletions(-)`.

## Full-Chain Post-Commit Verification

```
phase-48 exit=0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED
phase-49 exit=0 | Summary: 22 passed, 0 failed, 0 skipped
phase-50 exit=0 | Summary: 26 passed, 0 failed, 0 skipped
phase-51 exit=0 | Summary: 25 passed, 0 failed, 0 skipped
phase-52 exit=0 | Summary: 22 passed, 0 failed, 0 skipped
phase-53 exit=0 | Summary: 26 passed, 0 failed, 0 skipped
phase-54 exit=0 | Summary: 32 passed, 0 failed, 0 skipped
phase-55 exit=0 | Summary: 32 passed, 0 failed, 0 skipped
phase-56 exit=0 | Summary: 32 passed, 0 failed, 0 skipped
phase-57 exit=0 | Summary: 26 passed, 0 failed, 0 skipped
phase-58 exit=0 | Summary: 26 passed, 0 failed, 0 skipped
phase-59 exit=0 | Summary: 36 passed, 0 failed, 0 skipped
phase-60 exit=0 | Result: 25 PASS, 0 FAIL, 0 SKIPPED
phase-61 exit=0 | Result: 34 PASS, 0 FAIL, 0 SKIPPED
phase-62 exit=0 | Result: 34 PASS, 0 FAIL, 0 SKIPPED
phase-63 exit=0 | Result: 32 PASS, 0 FAIL, 0 SKIPPED
phase-64 exit=0 | Result: 29 PASS, 0 FAIL, 0 SKIPPED
phase-65 exit=0 | Result: 33 PASS, 0 FAIL, 0 SKIPPED
phase-66 exit=0 | Result: 28 PASS, 0 FAIL, 0 SKIPPED
---
FAILURES:
Total SKIPPED: 0
```

**ALL 19 phases exit=0; 0 FAILURES; 0 SKIPPED — first time since v1.5 close.**

## Harness Compatibility

| Harness | Exit | Result | Status |
|---------|------|--------|--------|
| v1.5-milestone-audit.mjs | 0 | 12 passed, 0 failed, 0 skipped | UNCHANGED (12/12 PASS from Plan 68-02 baseline) |
| v1.6-milestone-audit.mjs | 0 | 15 passed, 0 failed, 0 skipped | UNCHANGED (15/15 PASS baseline) |
| regenerate-supervision-pins.mjs --self-test | 0 | `Un-pinned Tier-2 count: 0 (all supervision occurrences classified or explicitly pinned)` + `Self-test: PASS` | UNCHANGED (PASS from Plan 68-02 baseline) |

## V-NN-SELF + V-66-07 Compatibility

| Assertion | Status | Note |
|-----------|--------|------|
| V-62-SELF | PASS | CHAIN_PHASES = [48,49,51..61]; 62 absent. Printed detail now reads `CHAIN_SKIP = []` instead of `[48,51,58,60,61]`. |
| V-63-SELF | PASS | Same shape — assertion logic independent of CHAIN_SKIP contents. |
| V-64-SELF | PASS | Same shape. |
| V-65-SELF | PASS | Same shape. |
| V-66-SELF | PASS | Same shape. |
| V-66-07   | PASS | Asserts substring `CHAIN_SKIP` in `.planning/milestones/v1.6-DEFERRED-CLEANUP.md`. Plan 68-03 does NOT touch that file; assertion unaffected (CHAIN_SKIP token appears at 8 positions in v1.6-DEFERRED-CLEANUP.md per RESEARCH §V-66-07 compatibility check). |

## Deviations from Plan

### Pivots (user-approved at checkpoint)

**1. [Pivot — Option A] V-61-01..04 v1.5-frozen-aware validator surgery**
- **Found during:** Wave 1 cascade-verification step (Task 68-03-01)
- **Issue:** Plan 68-03 plan assumed check-phase-61.mjs would exit 0 after Plans 68-01+02+04. In practice, V-61-01..04 still FAILed because REQUIREMENTS.md was reorganized for v1.7 post-v1.5-close.
- **Fix:** Validator surgery on check-phase-61.mjs to read REQUIREMENTS.md state at v1.5-close SHA `ba2cbc0` via `execFileSync('git', ['show', ...])` instead of HEAD. Committed separately as precondition commit `d7d7d5f`.
- **User decision:** Option A (validator surgery) selected over alternative Option B (revert REQUIREMENTS.md edits) and Option C (relax V-61-01..04 to absence-only checks).
- **Files modified:** scripts/validation/check-phase-61.mjs
- **Commit:** `d7d7d5f`

### Auto-fixed Issues

**2. [Rule 3 — Blocking issue] Subprocess timeout 60000ms → 300000ms across 10 sites**
- **Found during:** Task 2 post-edit dry-run (after empty-Set substitution but before staging)
- **Issue:** With `CHAIN_SKIP = new Set([])`, check-phase-66 must recursively invoke check-phase-65 (which recursively invokes 64, etc.). check-phase-65 standalone takes ~102s. 60s subprocess timeout was killing check-phase-65 invocation from inside check-phase-66, surfacing as `V-66-CHAIN-65 FAIL -- check-phase-65 FAIL:` (empty stderr — timeout-kill signature).
- **Fix:** Bumped `timeout: 60000` → `timeout: 300000` across 10 sites (2 per file × 5 files). Bundled into the atomic commit `7b635ca` since the timeout fix is part of the empty-Set transition's correctness requirement.
- **Files modified:** scripts/validation/check-phase-{62,63,64,65,66}.mjs (lines 291/303/310/313/318/321/329/331/336)
- **Commit:** `7b635ca` (bundled with the CHAIN_SKIP empty-Set substitution)

### Scope discoveries (for Plan 68-05 close-gate)

- **{68_03_SHA} placeholder fill:** Plan 68-05 close-gate must replace the literal `{68_03_SHA}` token in all 5 chain validators with the actual SHA `7b635ca` (this commit). Recommended approach: `git ls-files 'scripts/validation/check-phase-*.mjs' | xargs sed -i 's/{68_03_SHA}/7b635ca/g'` followed by a small `docs(68-05): fill self-referential {68_03_SHA} placeholder` commit, OR `git commit --amend` of the Plan 68-05 close-gate commit.
- **{68_05_SHA} placeholder fill:** Plan 68-05 close-gate must replace the literal `{68_05_SHA}` token with its own SHA, similarly.
- **Option A pivot documentation:** Plan 68-05 close-gate (68-VERIFICATION.md) should document the Option A pivot mechanism (v1.5-frozen-aware) as a v1.7 architectural pattern — same pattern as Plan 68-02 archive-path helper. Worth a §Patterns row in 68-VERIFICATION.md / v1.7-DEFERRED-CLEANUP.md narrative.
- **Subprocess timeout discovery:** The 60s→300s timeout bump is a forward coordination flag for Phase 69 (CI-Linux). If CI-Linux runners are slower than the local Windows host's ~102s, even 300s may need additional headroom. Recommend Phase 69 first-run timing measurement.

## Rollback Semantics

Single `git revert 7b635ca` cleanly restores `CHAIN_SKIP = new Set([48,51,58,60,61])` + original per-file canonical comment blocks + 60000ms timeouts across ALL 5 v1.6 validators in one operation — full atomicity preserved per chain-validator indivisibility doctrine.

The Task 1 precondition commit `d7d7d5f` is independently revertable; reverting it restores HEAD-coupled V-61-01..04 reads (which would re-introduce the 4 FAILs).

## Self-Check: PASSED

- [x] scripts/validation/check-phase-61.mjs has `readRequirementsAtV15Close()` helper at top
- [x] V-61-01..04 names include `[v1.5-frozen @ ba2cbc0]` suffix
- [x] check-phase-61.mjs exits 0 with 34/34 PASS
- [x] commit `d7d7d5f` present in `git log` (Task 1 precondition)
- [x] commit `7b635ca` present in `git log` (Task 2 atomic)
- [x] `git log --name-only -1 7b635ca` returns exactly 5 files (check-phase-62..66.mjs)
- [x] All 5 chain validators have `CHAIN_SKIP = new Set([])`
- [x] All 5 chain validators have `Phase 68 (Pillar B` narrative
- [x] All 5 chain validators have `{68_03_SHA}` literal placeholder
- [x] All 5 chain validators have `timeout: 300000` (10 sites)
- [x] Full chain check-phase-{48..66}.mjs exits 0 with 0 SKIPPED
- [x] v1.5-milestone-audit.mjs 12/12 PASS unchanged
- [x] v1.6-milestone-audit.mjs 15/15 PASS unchanged
- [x] regenerate-supervision-pins.mjs --self-test PASS unchanged
- [x] 68-03-SUMMARY.md authored (this file)

## Handoff to Plan 68-05

| Item | Value |
|------|-------|
| `{68_03_SHA}` for placeholder substitution | `7b635ca` |
| Task 1 precondition SHA (Option A pivot) | `d7d7d5f` |
| Discovery flag — subprocess timeout | 60s → 300s applied to all 5 chain validators; forward coordination flag for Phase 69 CI-Linux |
| Discovery flag — v1.5-frozen-aware pattern | Same pattern as Plan 68-02 archive-path helper; document in 68-VERIFICATION.md / v1.7-DEFERRED-CLEANUP.md as v1.7 architectural pattern |
| Atomic-commit boundary | 5 files in SHA `7b635ca`; full chain green for first time since v1.5 close |
