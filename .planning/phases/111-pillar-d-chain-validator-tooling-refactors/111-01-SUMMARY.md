---
phase: 111
plan: 01
subsystem: chain-validators
tags: [refactor, dry, chain-validators, exec-fail-detail, frozen-at-close, tool-01, tool-02, tool-03]
dependency_graph:
  requires: []
  provides: [exec-fail-detail.mjs, frozen-at-close adoption in check-phase-67/68/70]
  affects: [check-phase-48, check-phase-60, check-phase-61, check-phase-62 through 100]
tech_stack:
  added: [scripts/validation/_lib/exec-fail-detail.mjs]
  patterns: [execFailDetail(stdout, stderr, {n, trim, prefix}), readAtV17Close delegation, Landmine B catch→null]
key_files:
  created:
    - scripts/validation/_lib/exec-fail-detail.mjs
  modified:
    - scripts/validation/check-phase-48.mjs
    - scripts/validation/check-phase-60.mjs
    - scripts/validation/check-phase-61.mjs
    - scripts/validation/check-phase-62.mjs
    - scripts/validation/check-phase-63.mjs
    - scripts/validation/check-phase-64.mjs
    - scripts/validation/check-phase-65.mjs
    - scripts/validation/check-phase-66.mjs
    - scripts/validation/check-phase-67.mjs
    - scripts/validation/check-phase-68.mjs
    - scripts/validation/check-phase-69.mjs
    - scripts/validation/check-phase-70.mjs
    - scripts/validation/check-phase-71.mjs
    - scripts/validation/check-phase-72.mjs
    - scripts/validation/check-phase-73.mjs
    - scripts/validation/check-phase-74.mjs
    - scripts/validation/check-phase-82.mjs
    - scripts/validation/check-phase-88.mjs
    - scripts/validation/check-phase-93.mjs
    - scripts/validation/check-phase-95.mjs
    - scripts/validation/check-phase-100.mjs
decisions:
  - D-04 locked API: execFailDetail(stdout, stderr, {n, trim, prefix}) with no default for n
  - Variant A/B/C distinction preserved per-site (n=500 CHAIN, n=500 harness 60+61, n=300 harness 62-100)
  - Landmine A atomicity: check-phase-61 + check-phase-68 committed together
  - Landmine B: all readAtV17Close delegations wrapped in catch→null
  - Landmine C: readAtV15CloseFor61 omits stdio to preserve stderr-leak behavior of removed inline readers
  - Task 5 check-phase-61 changes merged into Task 3 commit (Landmine A requirement)
metrics:
  duration: ~90 minutes
  completed: 2026-07-01
  tasks_completed: 5
  files_modified: 21
---

# Phase 111 Plan 01: Chain-Validator Tooling Refactors (TOOL-01/02/03) Summary

**One-liner:** Three DRY refactors — execFailDetail helper centralizing 40 failure-detail slice sites, frozen-at-close.mjs adoption replacing 14 inline git-show readers, and stdout capture for 3 --self-test catch blocks — all verified byte-identical via D-03 VERBOSE diff.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Create exec-fail-detail.mjs helper | `119e938` | `scripts/validation/_lib/exec-fail-detail.mjs` |
| 2 | Consume execFailDetail at 40 sites | `4a2d0b6` | 20 check-phase files (60-100) |
| 3 | Landmine A: inline v1.5 reader removal + V-68-10 tolerant-OR | `8e6d94a` | check-phase-61.mjs, check-phase-68.mjs |
| 4 | TOOL-02: 12 inline v1.7 reader delegation | `3266f5d` | check-phase-67.mjs, check-phase-70.mjs |
| 5 | TOOL-03: --self-test stdout capture | `43be1a0` | check-phase-48.mjs, check-phase-60.mjs |

## D-03 Verification

VERBOSE chain output (check-phase-100.mjs --verbose) captured before and after all changes:
- Baseline: 31 PASS, 24 FAIL, 0 SKIPPED (24 pre-existing failures from v1.14 content phases 101-110)
- After all 5 tasks: 31 PASS, 24 FAIL, 0 SKIPPED
- VERBOSE diff: **EMPTY** (byte-identical) — confirmed for all tasks combined

## Deviations from Plan

### Non-deviation: Task commits restructured due to shared files

**Context:** check-phase-61.mjs needed both Task 3 (Landmine A inline reader removal) and Task 5 (--self-test stdout capture). check-phase-68.mjs needed both Task 3 (V-68-10 tolerant-OR) and Task 4 (inline v1.7 reader bodies). Per Landmine A, check-phase-61 and check-phase-68 MUST be in one commit.

**Resolution:** Task 3 commit (`8e6d94a`) includes all changes to check-phase-61 AND check-phase-68 (Task 3 + Task 4 for 68, Task 3 + Task 5 for 61). Task 4 commit (`3266f5d`) covers only check-phase-67 + check-phase-70. Task 5 commit (`43be1a0`) covers check-phase-48 + check-phase-60 only.

**Impact:** Zero — behavior is identical, Landmine A atomicity preserved.

### Auto-fixed: Stale comment reference in TOOL-02 wrapper

**Found during:** Task 3
**Issue:** Initial comment for `readAtV15CloseFor61` contained the old function names, which would have caused the acceptance grep to fail.
**Fix:** Removed old symbol names from the comment — changed "unified replacement for readRequirementsAtV15Close + readRoadmapAtV15Close" to "unified replacement for the two inline v1.5-frozen readers".
**Files modified:** check-phase-61.mjs

## Known Stubs

None.

## Threat Flags

None — this plan modifies chain-validator tooling only, no network endpoints, auth paths, or schema changes.

## Self-Check: PASSED

Files created/modified:
- [x] `scripts/validation/_lib/exec-fail-detail.mjs` — FOUND
- [x] `scripts/validation/check-phase-48.mjs` — FOUND
- [x] `scripts/validation/check-phase-60.mjs` — FOUND
- [x] `scripts/validation/check-phase-61.mjs` — FOUND
- [x] `scripts/validation/check-phase-67.mjs` — FOUND
- [x] `scripts/validation/check-phase-68.mjs` — FOUND
- [x] `scripts/validation/check-phase-70.mjs` — FOUND

Commits verified in git log:
- [x] `119e938` feat(111): add exec-fail-detail.mjs
- [x] `4a2d0b6` refactor(111): consume execFailDetail at 40 failure-detail sites
- [x] `8e6d94a` refactor(111): TOOL-02 Landmine A
- [x] `3266f5d` refactor(111): TOOL-02 — 12 inline v1.7 frozen readers
- [x] `43be1a0` fix(111): TOOL-03 — capture stdout in --self-test catch blocks
