---
phase: 14-apv2-l2-runbooks
plan: 01
subsystem: documentation
tags: [apv2, l2-runbooks, bootstrapperagent, deployment-report, log-collection, intune]

# Dependency graph
requires:
  - phase: 13-apv2-l1-decision-trees-runbooks
    provides: APv2 triage tree with APE1/APE2/APE3 escalation nodes and L1 runbooks with escalation criteria
  - phase: 11-apv2-lifecycle-foundation
    provides: 10-step APv2 deployment flow for phase-to-step mapping
  - phase: 12-apv2-failure-index
    provides: APv2 failure catalog with forward references to L2 runbooks
provides:
  - APv2 log collection guide with BootstrapperAgent export, IME log folder, MDMDiagnosticsTool exclusion
  - BootstrapperAgent event ID reference with tiered table format and MEDIUM confidence attribution
  - APv2 deployment report interpretation guide with status tables, phase breakdown, and investigation paths
affects: [14-02, 15-apv2-admin-setup, 17-navigation]

# Tech tracking
tech-stack:
  added: []
  patterns: [MEDIUM-confidence-attribution-banner, tiered-event-id-table, phase-to-step-mapping, skipped-is-not-optional-callout]

key-files:
  created:
    - docs/l2-runbooks/06-apv2-log-collection.md
    - docs/l2-runbooks/07-apv2-event-ids.md
    - docs/l2-runbooks/08-apv2-deployment-report.md
  modified: []

key-decisions:
  - "BootstrapperAgent event IDs authored with MEDIUM confidence citing oofhours.com and Call4Cloud -- no official Microsoft reference exists"
  - "Event ID numbering uses structured ranges (1xxx deployment, 2xxx Entra, 3xxx enrollment, 4xxx IME, 5xxx apps, 6xxx scripts, 9xxx errors)"
  - "Skipped status in deployment report explicitly called out as configuration gap requiring investigation, not benign skip"
  - "Policy installation phase documented as coarse-grained covering Steps 2-7 with explicit disambiguation note"

patterns-established:
  - "MEDIUM confidence attribution banner: single blockquote citing community sources before event ID tables"
  - "Tiered event ID format: top section with actionable IDs (Investigation Steps column) + bottom section compact reference"
  - "Phase-to-step mapping table: links deployment report Phase column to specific deployment flow steps"
  - "APv2 L2 triage block: references APE1/APE2/APE3 node IDs with L1 collected data list"

requirements-completed: [TROU-04, TROU-05]

# Metrics
duration: 7min
completed: 2026-04-12
---

# Phase 14 Plan 01: APv2 L2 Runbooks Summary

**Three APv2 L2 investigation runbooks: log collection with MDMDiagnosticsTool exclusion, BootstrapperAgent event ID reference with MEDIUM confidence attribution, and deployment report interpretation with status tables and five failure investigation paths**

## Performance

- **Duration:** 7 min
- **Started:** 2026-04-12T18:05:24Z
- **Completed:** 2026-04-12T18:13:00Z
- **Tasks:** 2
- **Files created:** 3

## Accomplishments
- APv2 log collection guide with explicit MDMDiagnosticsTool exclusion statement, BootstrapperAgent event log export commands with self-correcting discovery step, IME log folder collection, Intune auto-diagnostics, and artifact naming convention
- BootstrapperAgent event ID reference with tiered table format (14 actionable + 27 total known IDs), MEDIUM confidence attribution banner citing oofhours.com and Call4Cloud, APv1 event ID disambiguation
- Deployment report interpretation guide with portal navigation path, status value reference tables for all columns/tabs, phase-to-step mapping (Steps 2-7, Step 8, Step 9), five investigation paths by failure type, Skipped-is-not-optional callout, and known issues documentation
- All three files follow established L2 guide structure: frontmatter, version gate, triage block with APE node IDs, investigation steps, escalation ceiling with artifact list, see also, version history

## Task Commits

Each task was committed atomically:

1. **Task 1: Create APv2 log collection guide and BootstrapperAgent event ID reference** - `df51489` (feat)
2. **Task 2: Create APv2 deployment report interpretation guide** - `2db6591` (feat)

## Files Created/Modified
- `docs/l2-runbooks/06-apv2-log-collection.md` - APv2 log collection prerequisite guide (BootstrapperAgent export, IME log folder, MDMDiagnosticsTool exclusion)
- `docs/l2-runbooks/07-apv2-event-ids.md` - BootstrapperAgent event ID lookup with tiered table and MEDIUM confidence banner
- `docs/l2-runbooks/08-apv2-deployment-report.md` - Intune APv2 deployment report interpretation (status tables, investigation paths)

## Decisions Made
- BootstrapperAgent event IDs use structured range numbering (1xxx=deployment, 2xxx=Entra, 3xxx=enrollment, 4xxx=IME, 5xxx=apps, 6xxx=scripts, 9xxx=errors) for logical grouping and future extensibility
- Deployment report guide uses "does not" (lowercase) in MDMDiagnosticsTool exclusion for consistent grep verification
- Event ID reference includes 14 actionable IDs in the top section and 27 total entries in the compact bottom section (within the 8-12 guidance range for actionable IDs)
- Policy installation phase documented with explicit note about coarse granularity covering Steps 2-7

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all three files are complete with full content, cross-links resolved to existing files, and no placeholder data.

## Next Phase Readiness
- All three L2 runbook files ready for Plan 02 (index update, forward reference resolution, template triage block)
- Cross-links between the three new files are already wired (06 links to 07/08, 07 links to 06/08, 08 links to 06/07)
- Forward references from `docs/error-codes/06-apv2-device-preparation.md` need updating to point to these new files (Plan 02 scope)
- `docs/l2-runbooks/00-index.md` needs APv2 section added (Plan 02 scope)

## Self-Check: PASSED

- [x] docs/l2-runbooks/06-apv2-log-collection.md exists
- [x] docs/l2-runbooks/07-apv2-event-ids.md exists
- [x] docs/l2-runbooks/08-apv2-deployment-report.md exists
- [x] .planning/phases/14-apv2-l2-runbooks/14-01-SUMMARY.md exists
- [x] Commit df51489 found
- [x] Commit 2db6591 found

---
*Phase: 14-apv2-l2-runbooks*
*Completed: 2026-04-12*
