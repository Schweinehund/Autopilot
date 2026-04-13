---
phase: 16-apv1-admin-setup-guides
plan: "02"
subsystem: docs
tags: [autopilot, apv1, admin-guide, dynamic-groups, deployment-modes, user-driven, pre-provisioning, self-deploying]

requires:
  - phase: 16-apv1-admin-setup-guides
    provides: overview and core setup guides (Plan 01)
provides:
  - Dynamic groups guide with ZTDId membership rule and sync delay expectations
  - Deployment modes comparison table with selection guidance
  - User-driven mode guide with hybrid join cross-reference
  - Pre-provisioning mode guide with TPM 2.0 and Win+F12 documentation
  - Self-deploying mode guide with no user affinity callout
affects: [16-03, 17-navigation]

tech-stack:
  added: []
  patterns: [mode-comparison-table, hybrid-join-cross-reference]

key-files:
  created:
    - docs/admin-setup-apv1/04-dynamic-groups.md
    - docs/admin-setup-apv1/05-deployment-modes-overview.md
    - docs/admin-setup-apv1/06-user-driven.md
    - docs/admin-setup-apv1/07-pre-provisioning.md
    - docs/admin-setup-apv1/08-self-deploying.md
  modified: []

key-decisions:
  - "Modes overview is comparison/index only - no Configuration-Caused Failures table per D-08"
  - "Each mode guide cross-references Intune Connector (09) for hybrid join scenarios"
  - "L2 details blocks: hybrid join for user-driven, TPM attestation for pre-provisioning and self-deploying"

patterns-established:
  - "Mode guide pattern: mode-specific prerequisites prominent, end-user/technician experience walkthrough, L2 details block"

requirements-completed: [ADMN-04, ADMN-05]

duration: 6min
completed: 2026-04-13
---

# Plan 16-02: Dynamic Groups + Deployment Mode Guides Summary

**Dynamic groups with ZTDId rule and sync delays, 3-mode comparison table, and full admin guides for user-driven (hybrid join), pre-provisioning (TPM 2.0/Win+F12/reseal), and self-deploying (no user affinity)**

## Performance

- **Duration:** 6 min
- **Started:** 2026-04-13
- **Completed:** 2026-04-13
- **Tasks:** 3
- **Files created:** 5

## Accomplishments

- Dynamic groups guide with ZTDId membership rule, group tag targeting, sync delay expectations (5-15 min to 24 hours), and 5-entry config failures table
- Deployment modes overview with comparison table covering TPM, ethernet, credentials, hybrid join, and best-for scenarios
- User-driven guide with hybrid join cross-reference, 7-step end user walkthrough, and L2 hybrid join details block
- Pre-provisioning guide with TPM 2.0/wired ethernet requirements, Win+F12 trigger, reseal workflow, and L2 TPM details block
- Self-deploying guide with no user affinity callout, device-based licensing guidance, and L2 TPM details block

## Task Commits

1. **Task 1: Dynamic groups + modes overview** - `9c33593`
2. **Task 2: User-driven + pre-provisioning** - `fe23fc4`
3. **Task 3: Self-deploying** - `b3e0e6f`

## Files Created/Modified

- `docs/admin-setup-apv1/04-dynamic-groups.md` - Dynamic device groups with ZTDId rule
- `docs/admin-setup-apv1/05-deployment-modes-overview.md` - 3-mode comparison table and selection guidance
- `docs/admin-setup-apv1/06-user-driven.md` - User-driven mode with hybrid join subsection
- `docs/admin-setup-apv1/07-pre-provisioning.md` - Pre-provisioning with technician flow and reseal
- `docs/admin-setup-apv1/08-self-deploying.md` - Self-deploying with no user affinity

## Decisions Made

None - followed plan as specified.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Files 04-08 complete; Plan 16-03 creates final files 09-10
- Sequential navigation chain: 03 -> 04 -> 05 -> 06 -> 07 -> 08 -> 09 (next plan)

---
*Phase: 16-apv1-admin-setup-guides*
*Completed: 2026-04-13*
