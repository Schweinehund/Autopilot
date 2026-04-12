---
phase: 06-l2-runbooks
plan: 01
subsystem: documentation
tags: [l2-runbooks, autopilot, log-collection, mdmdiagnosticstool, powershell, event-logs, registry]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: powershell-ref.md, registry-paths.md, endpoints.md, l2-template.md, glossary
  - phase: 04-l1-decision-trees
    provides: escalation terminal node IDs (ESE, TPE, PRE, TRE) referenced in index
  - phase: 05-l1-runbooks
    provides: index table pattern with When-to-Use column
provides:
  - docs/l2-runbooks/01-log-collection.md — standalone prerequisite guide covering all 5 D-05 collection items
  - docs/l2-runbooks/00-index.md — L2 runbook index with when-to-use routing table for all 5 investigation runbooks
affects: [06-02, 06-03, 06-04, 06-05, 07-navigation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "L2 log collection as standalone prerequisite: gather-everything-first before investigating"
    - "Artifact naming convention: YYYY-MM-DD_SerialNumber_artifact-type for Microsoft support sharing"
    - "L2 index pattern: when-to-use table + L1 escalation mapping table with node ID routing"

key-files:
  created:
    - docs/l2-runbooks/01-log-collection.md
    - docs/l2-runbooks/00-index.md
  modified: []

key-decisions:
  - "Log collection guide is standalone prerequisite (D-04): every other L2 runbook opens with 'collect diagnostic package per Log Collection Guide'"
  - "Artifact naming convention uses $prefix = YYYY-MM-DD_SerialNumber pattern — automatically generated via PowerShell, compatible with Microsoft Premier Support sharing"
  - "Index escalation mapping table uses L1 node IDs (ESE, TPE, PRE, TRE) to explicitly route L1 escalation tickets to the correct L2 runbook"

patterns-established:
  - "L2 guide structure: frontmatter → version gate banner → Context → numbered Sections → Tool References"
  - "Glossary first-mention linking per file using ../_glossary.md#term anchor pattern"
  - "L2 index table: Runbook | When to Use | Prerequisite columns"

requirements-completed: [L2RB-01]

# Metrics
duration: 3min
completed: 2026-03-21
---

# Phase 6 Plan 1: L2 Log Collection Guide and Index Summary

**Standalone log collection prerequisite guide (mdmdiagnosticstool cab, 4 wevtutil exports, Get-AutopilotLogs, reg export snapshot, naming convention) and L2 runbook index with escalation routing table**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-21T13:56:23Z
- **Completed:** 2026-03-21T13:59:07Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Created `docs/l2-runbooks/01-log-collection.md` covering all 5 D-05 items: mdmdiagnosticstool cab collection, 4 wevtutil epl event log exports with serial/date prefix naming, Get-AutopilotLogs one-command alternative, reg export for ESP tracking registry snapshot, and 6-row artifact naming convention table
- Created `docs/l2-runbooks/00-index.md` with when-to-use routing table for all 5 L2 runbooks, L1 escalation node ID mapping (ESE/TPE/PRE/TRE), and links to L1 runbooks, error code index, and decision trees
- Established `docs/l2-runbooks/` directory structure mirroring existing `docs/l1-runbooks/` pattern

## Task Commits

1. **Task 1: Create L2 log collection guide** - `d6f7b24` (feat)
2. **Task 2: Create L2 runbook index** - `b45a270` (feat)

## Files Created/Modified

- `docs/l2-runbooks/01-log-collection.md` — L2RB-01 prerequisite guide for diagnostic package collection
- `docs/l2-runbooks/00-index.md` — L2 runbook index with when-to-use and escalation routing

## Decisions Made

- Log collection guide is a standalone prerequisite per D-04 — every other L2 runbook opens with a reference to it. This mirrors how L2 teams actually work: gather everything first, then investigate.
- Artifact naming convention built as a PowerShell `$prefix` variable pattern (`YYYY-MM-DD_SerialNumber`) to automate consistent naming across all 6 artifact types and enable sharing with Microsoft Premier Support without renaming.
- Index escalation mapping table explicitly maps L1 node IDs to L2 runbooks so that escalation tickets arriving via L1 can be routed to the correct investigation guide without re-reading the when-to-use descriptions.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `docs/l2-runbooks/` directory created with index and log collection prerequisite
- Plans 06-02 through 06-05 (ESP, TPM, Hybrid Join, Policy Conflict runbooks) can now open with "collect a diagnostic package per [Log Collection Guide](01-log-collection.md)"
- All L2 runbooks will link to `01-log-collection.md` as their prerequisite

---
*Phase: 06-l2-runbooks*
*Completed: 2026-03-21*
