---
phase: 142-archival-path-fix-chain-adoption-cold-clone-threshold
plan: 02
subsystem: infra
tags: [governance, ci-validators, carve-allowlist, gsd-carve]

# Dependency graph
requires:
  - phase: 142-archival-path-fix-chain-adoption-cold-clone-threshold
    provides: "Plan 01's ROADMAP/REQUIREMENTS/PROJECT/STATE amendment markers and the D-19 fixed three-commit sequence this plan is Commit 2 of"
provides:
  - "scripts/validation/check-phase-138.mjs on the v1.20 CARVE Category-5 allowlist, authorizing Plan 05's CHAIN_EXTRA edit"
  - "Recorded scope amendments list back-filled with Phase 141's D-27/D-28 and extended with this phase's six (four to twelve bullets)"
affects: [142-05-chain-adoption, 144-harness-close]

# Actuals (#2632)
actuals:
  tokens: 1263
  tasks: 2
  commits: 1

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "CARVE amendment commits land alone, before the edit they authorize, per D-09 rules 1 and 3 — the single-file shape is proven by the commit's own name-list, not by carve-gate.mjs, because .planning/ sits outside the gate's diff scope"
    - "Commit-message prose must never repeat the amended file's own literal path (git show --name-only prints the message before the file list, so a literal filename in the body creates a false positive on any downstream single-file-shape check)"

key-files:
  created: []
  modified:
    - .planning/milestones/v1.20-CARVE.md

key-decisions:
  - "Rationale comment above the new check-phase-138.mjs glob line repeats the literal filename once (matching the check-phase-67.mjs precedent's shape), so the plan's grep -c check-phase-138\\.mjs == 2 acceptance criterion (one glob line + one comment mention) is satisfied exactly rather than by accident"
  - "Commit message describes the amended file only as \"the CARVE allowlist\" / \"CARVE\" and never spells out its literal path, carrying forward Plan 01's lesson (a literal v1.20-CARVE.md string in commit-message prose creates a false positive on git show --name-only's combined message+file-list output)"

patterns-established: []

requirements-completed: []  # This plan authorizes RED-06's mechanism (CARVE allowlist entry) but does not land the CHAIN_EXTRA edit itself -- Plan 05 completes RED-06.

coverage:
  - id: D1
    description: "scripts/validation/check-phase-138.mjs added to CARVE Category 5 with a rationale comment naming RED-06/Phase 142/CHAIN_EXTRA, authorizing Plan 05's apex edit"
    verification:
      - kind: other
        ref: "grep -c 'check-phase-138\\.mjs' .planning/milestones/v1.20-CARVE.md == 2; grep -c '^scripts/validation/check-phase-138\\.mjs$' .planning/milestones/v1.20-CARVE.md == 1"
        status: pass
    human_judgment: false
  - id: D2
    description: "Recorded scope amendments list back-filled with Phase 141's D-27/D-28 and extended with this phase's D-35, D-20/D-21/D-22, D-24, D-11, D-25, D-27/D-28/D-29 -- lead sentence corrected from 'four' to 'twelve'"
    verification:
      - kind: other
        ref: "grep -c 'D-28' .planning/milestones/v1.20-CARVE.md >= 1 (was 0); grep -c '^- \\*\\*D-' .planning/milestones/v1.20-CARVE.md == 12"
        status: pass
    human_judgment: false
  - id: D3
    description: "Commit 2 of D-19's three-commit sequence lands, touching exactly one file (.planning/milestones/v1.20-CARVE.md), before the edit it authorizes"
    verification:
      - kind: other
        ref: "git show --name-only --format= HEAD prints exactly '.planning/milestones/v1.20-CARVE.md'; git show --name-only --format= HEAD | grep -c . == 1"
        status: pass
    human_judgment: false
  - id: D4
    description: "carve-gate.mjs and its self-test are both green before and after the amendment"
    verification:
      - kind: other
        ref: "node scripts/validation/carve-gate.mjs exits 0 (44 in-scope, 44 on-list, 0 off-list); node scripts/validation/carve-gate.mjs --self-test exits 0 (9/9 PASS)"
        status: pass
    human_judgment: false

# Metrics
duration: ~9min
completed: 2026-08-10
status: complete
---

# Phase 142 Plan 02: CARVE Amendment for check-phase-138 + Amendments Back-fill Summary

**Landed Commit 2 of D-19's fixed three-commit sequence — the apex validator added to the v1.20 CARVE allowlist alone and first, with Phase 141's missing D-27/D-28 amendments back-filled and this phase's six appended — as the single-file diff CARVE D-09 requires.**

## Performance

- **Duration:** ~9 min
- **Completed:** 2026-08-10T18:44:13Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Added `scripts/validation/check-phase-138.mjs` to CARVE Category 5, preceded by a rationale comment naming RED-06, Phase 142, and the `CHAIN_EXTRA` mechanism — matching the existing `check-phase-67.mjs` precedent's comment shape, and authorizing Plan 05's edit before it lands.
- Corrected Category 5's header comment from "sixteen" to "seventeen" chain validators (confirmed no source file pins that literal — a fresh grep across `scripts/` and `.github/` returned zero hits, matching the plan-time finding).
- Back-filled the "Recorded scope amendments" list with Phase 141's D-27 (amendment instrument) and D-28 (six statements across three documents), closing a gap where `grep -c "D-28"` returned 0 — the list Phase 144's close-gate reads was already stale.
- Appended this phase's own six amendment bullets (D-35, D-20/D-21/D-22, D-24, D-11, D-25, D-27/D-28/D-29) and corrected the list's lead sentence from "four" to "twelve" amendments.
- Landed Commit 2 touching exactly one file — verified via `git show --name-only --format= HEAD` printing a single line, `.planning/milestones/v1.20-CARVE.md` — with `carve-gate.mjs` and its `--self-test` both green before and after.

## Task Commits

1. **Task 1: Add the apex to Category 5 and record this phase's scope amendments** - amended working tree only, no commit (per plan design)
2. **Task 2: Land Commit 2 and prove its single-file shape** - `024a7454` (docs)

**Plan metadata:** SUMMARY.md committed separately per CARVE D-09 rule 1 (the amendment commit may touch no other path, including this plan's own SUMMARY).

## Files Created/Modified

- `.planning/milestones/v1.20-CARVE.md` - Category-5 allowlist entry for `check-phase-138.mjs` plus rationale comment; header count correction; "Recorded scope amendments" list back-filled and extended (four to twelve bullets)

## Decisions Made

- The new rationale comment repeats `check-phase-138.mjs` literally once (mirroring the `check-phase-67.mjs` precedent), so the plan's `grep -c` acceptance criterion for that filename lands on exactly `2` (one glob line, one comment mention) by design rather than coincidence.
- The commit message names "CARVE" and "check-phase-138" but never spells out the literal file path `.planning/milestones/v1.20-CARVE.md`, applying the lesson Plan 01 recorded: `git show --name-only` prints the message body before the file list, so a literal filename in prose creates a false positive on any downstream single-file-shape grep.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Commit 3 (Plan 142-05's `CHAIN_EXTRA` edit to `check-phase-138.mjs`) is unblocked — the apex is now on the allowlist, so editing it will no longer make `carve-gate.mjs` report an off-list path.
- Plans 03/04 (the RED-04/05 validator successor assertions in `check-phase-30.mjs`/`check-phase-31.mjs`) are independent of this plan and remain unblocked by Plan 01's earlier amendments.
- Phase 144's close-gate now reads a complete "Recorded scope amendments" list — Phase 141's D-27/D-28 are no longer silently missing.
- No blockers. `carve-gate.mjs` (44/44/0) and its `--self-test` (9/9 PASS) both confirmed green at HEAD `024a7454`.

---
*Phase: 142-archival-path-fix-chain-adoption-cold-clone-threshold*
*Completed: 2026-08-10*
