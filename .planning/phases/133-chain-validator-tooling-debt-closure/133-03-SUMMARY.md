---
phase: 133-chain-validator-tooling-debt-closure
plan: 03
subsystem: infra
tags: [chain-validator, check-phase-128, subprocess, attestation, ci]

# Dependency graph
requires:
  - phase: 133-01
    provides: TOOL-04 re-pin coordinate reconciliation tables (independent workstream, no direct dependency)
provides:
  - "133-ONE-N-ATTESTATION.md: source-cited proof the CHECK_PHASE_NESTED=1 guard already gives check-phase-128.mjs single-apex O(n) subprocess behavior (81 spawns per top-level descent)"
  - "Windows cold-clone verification of check-phase-128.mjs (non-authoritative, D-08)"
  - "CARVE-2 hand-off note for Phase 134 (TOOL-05 closed via attestation, not a code task)"
affects: [134-v117-pin-16th-path-a-lineage-bump-terminal-close]

# Tech tracking
tech-stack:
  added: []
  patterns: []

key-files:
  created:
    - .planning/phases/133-chain-validator-tooling-debt-closure/133-ONE-N-ATTESTATION.md
  modified: []

key-decisions:
  - "TOOL-05 ships as verification + attestation only, per D-06/D-07 — no cache code, no in-process memo, check-phase-128.mjs stays read-only"
  - "CARVE-2 recorded as a Phase-134 hand-off note (not a ROADMAP/REQUIREMENTS edit): the imagined within-apex O(n^2) does not exist; TOOL-05 is closed by this attestation"

patterns-established: []

requirements-completed: [TOOL-05]

# Metrics
duration: 12min
completed: 2026-07-19
---

# Phase 133 Plan 03: TOOL-05 Single-Apex O(n) Attestation Summary

**Attested (with `check-phase-128.mjs` line-cited evidence) that the pre-existing `CHECK_PHASE_NESTED=1` guard already gives the chain apex an 81-spawn O(depth) subprocess property — zero code authored — and captured a Windows cold-clone run (82 PASS/0 FAIL/1 SKIPPED, ~22.4s) confirming the linear signature, non-authoritative per D-08.**

## Performance

- **Duration:** 12 min
- **Started:** 2026-07-19T14:31:46Z
- **Completed:** 2026-07-19T14:43:00Z
- **Tasks:** 2 completed
- **Files modified:** 1 (created)

## Accomplishments
- Proved from source that `check-phase-128.mjs`'s `CHECK_PHASE_NESTED=1` guard (lines 101, 108-110, 117, 146-148) collapses a top-level descent to exactly 81 subprocess spawns (80 `CHAIN_PHASES` children + 1 `AUDIT-HARNESS`), each child receiving NESTED and short-circuiting its own chain-guard re-expansion — the O(n), not O(n²), signature.
- Clarified `isPeer` (line 115-116) affects only subprocess timeout (600s vs 300s), not spawn count, so it is not mistaken for a second optimization axis.
- Recorded the DUAL-APEX do-not-disturb boundary: the standalone workflow job and `linux-chain-ubuntu-latest` job each independently run a full top-level, non-nested descent — intentional, unaffected by this attestation, no `.github/workflows/*.yml` touched.
- Ran an actual `git clone --no-hardlinks` cold-clone verification of `check-phase-128.mjs` in the session scratchpad (not the working tree), capturing exit 0 / 82 PASS / 0 FAIL / 1 SKIPPED at ~22.4s wall-clock — matching the RESEARCH baseline's PASS/FAIL/SKIP tuple (82/0/1) within the same linear-signature band as its ~14.9s warm-tree run. Scratch clone deleted immediately after capture.
- Recorded CARVE-2 verbatim-in-intent as a Phase-134 hand-off note inside the attestation artifact — no ROADMAP.md/REQUIREMENTS.md text edited.

## Task Commits

Each task was committed atomically:

1. **Task 1: Attest the O(n) mechanism from source (read-only)** - `aabdf03f` (docs)
2. **Task 2: Capture Windows cold-clone verification + record CARVE-2** - `fde0e08d` (docs)

**Plan metadata:** pending final commit below (docs: complete plan)

## Files Created/Modified
- `.planning/phases/133-chain-validator-tooling-debt-closure/133-ONE-N-ATTESTATION.md` - the O(n) attestation with `check-phase-128.mjs` line citations, the 81-spawn conclusion, the DUAL-APEX boundary note, the captured Windows cold-clone evidence, and the CARVE-2 Phase-134 hand-off note

## Decisions Made
- Followed D-06/D-07 exactly: no code lands for TOOL-05. `check-phase-128.mjs` was read via the `Read` tool only, never opened with `Edit`/`Write`; `git diff --name-only -- scripts/validation/` verified empty after both tasks.
- Used the session scratchpad (not the repo working tree) for the `git clone --no-hardlinks` cold-clone target, and deleted it immediately after capturing the PASS/FAIL/SKIP + wall-clock tuple, so no persistent artifact or on-disk cache was left behind — consistent with D-07's rejection of a false-pass-masking result cache.
- Marked the cold-clone evidence explicitly NON-AUTHORITATIVE per D-08; Linux GHA remains authoritative (D-03) and Phase 134's HARN-13 3-axis re-audit is the final exact-match, not this session's capture.

## Deviations from Plan

None - plan executed exactly as written. Both tasks' automated verification commands (`grep`/`test -z` checks specified in the plan) passed on first attempt.

## Issues Encountered

None. The cold-clone run took ~22.4s versus the RESEARCH baseline's ~14.9s warm-tree run — expected variance from a fresh clone's cold Node module cache and filesystem cache, not a shape change; both are in the same low-double-digit-seconds linear band for 81 real subprocess spawns, and this is explicitly discussed and reconciled in the attestation artifact rather than treated as an anomaly.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

TOOL-05 is closed via this attestation; no further TOOL-05 work is expected. Phase 134 (HARN-11/12/13) should treat TOOL-05 as CLOSED per the CARVE-2 hand-off note recorded in `133-ONE-N-ATTESTATION.md` — if Phase 134 authors a new `check-phase-129.mjs` apex, it should simply repeat the same proven `CHECK_PHASE_NESTED` NESTED-guard pattern (Path-A copy), which is ordinary apex construction, not a TOOL-05 remediation task. No blockers for Phase 134.

## Self-Check: PASSED

- FOUND: `.planning/phases/133-chain-validator-tooling-debt-closure/133-ONE-N-ATTESTATION.md`
- FOUND: commit `aabdf03f` (Task 1)
- FOUND: commit `fde0e08d` (Task 2)

---
*Phase: 133-chain-validator-tooling-debt-closure*
*Completed: 2026-07-19*
