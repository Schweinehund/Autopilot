---
phase: 05-l1-runbooks
plan: 02
subsystem: documentation
tags: [l1-runbooks, esp, oobe, autopilot, troubleshooting]

# Dependency graph
requires:
  - phase: 04-l1-decision-trees
    provides: ESP decision tree with ESD5/ESD7 timing thresholds and ESE4/ESE5 escalation data
  - phase: 03-error-codes
    provides: ESP error code table (03-esp-enrollment.md) as link target
  - phase: 02-lifecycle
    provides: ESP lifecycle guide (04-esp.md) and OOBE guide (03-oobe.md)
provides:
  - ESP stuck or failed L1 runbook with three anchored sub-sections (device, user, error code)
  - OOBE failure L1 runbook with misroute detection and escalation focus
affects: [05-l1-runbooks, 07-navigation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Sub-sectioned runbook with anchor IDs for deep-linking from decision trees"
    - "Intentionally thin runbook pattern — most OOBE paths lead to escalation"
    - "Misroute detection — OOBE runbook cross-links to device, profile, and network runbooks"

key-files:
  created:
    - docs/l1-runbooks/02-esp-stuck-or-failed.md
    - docs/l1-runbooks/05-oobe-failure.md
  modified: []

key-decisions:
  - "ESP runbook uses three anchored sub-sections (device-phase-steps, user-phase-steps, error-code-steps) with separate numbered step sequences per D-07"
  - "Timing thresholds: 30 minutes device phase, 60 minutes user phase — matching Phase 4 decision tree exactly"
  - "OOBE runbook is intentionally thin: most failures are L2 territory; L1 value is clean misroute detection and complete data collection"
  - "OOBE misroute detection covers three cases: device not registered (01), network failure (04), profile not applied (03)"

patterns-established:
  - "Anchored sub-section pattern: ## Section Name {#anchor-id} for deep-linking from decision trees"
  - "User communication scripts use blockquote format: > **Say to the user:**"
  - "Shared escalation criteria section at the bottom of multi-section runbooks"

requirements-completed: [L1RB-02, L1RB-05]

# Metrics
duration: 8min
completed: 2026-03-20
---

# Phase 05 Plan 02: ESP and OOBE L1 Runbooks Summary

**ESP runbook with three anchored sub-sections (device/user/error-code), 30/60 min thresholds, and OOBE runbook with misroute detection cross-linking to all other L1 runbooks**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-20T21:40:00Z
- **Completed:** 2026-03-20T21:42:13Z
- **Tasks:** 2 completed
- **Files modified:** 2

## Accomplishments

- Created `docs/l1-runbooks/02-esp-stuck-or-failed.md` — the highest-volume L1 scenario runbook, with three labeled sub-sections each containing a distinct numbered step sequence and anchor IDs for deep-linking from the ESP decision tree
- Created `docs/l1-runbooks/05-oobe-failure.md` — intentionally thin runbook focused on misroute detection (links to 3 other runbooks) and complete escalation data collection, matching TRE5 data requirements from Phase 4 triage tree
- Both runbooks maintain zero-tolerance L1 boundary: no PowerShell, registry paths, or log file references in either file

## Task Commits

Each task was committed atomically:

1. **Task 1: Create ESP stuck or failed runbook** - `9841abd` (feat)
2. **Task 2: Create OOBE failure runbook** - `d87c6a0` (feat)

## Files Created/Modified

- `docs/l1-runbooks/02-esp-stuck-or-failed.md` — ESP runbook with device-phase-steps, user-phase-steps, error-code-steps sub-sections; timing thresholds 30 min (device) and 60 min (user); 6 user communication scripts; shared escalation criteria with 10-item data collection checklist
- `docs/l1-runbooks/05-oobe-failure.md` — OOBE failure runbook with registration check, connectivity check, misroute detection (links to runbooks 01, 03, 04), single power cycle retry, and escalation criteria with 8-item data collection checklist

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — both runbooks are fully wired to their reference targets. Cross-links to other L1 runbooks (01, 03, 04) reference files that will be created in the same phase. The `[L2 Runbooks](../l2-runbooks/)` forward-link is intentionally marked as "(available after Phase 6)" per established pattern from Phase 4.

## Self-Check: PASSED

- `docs/l1-runbooks/02-esp-stuck-or-failed.md` — EXISTS
- `docs/l1-runbooks/05-oobe-failure.md` — EXISTS
- Commit `9841abd` — EXISTS (feat(05-02): create ESP stuck or failed L1 runbook)
- Commit `d87c6a0` — EXISTS (feat(05-02): create OOBE failure L1 runbook)
