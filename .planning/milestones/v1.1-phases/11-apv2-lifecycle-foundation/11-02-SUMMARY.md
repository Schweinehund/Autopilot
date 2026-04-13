---
phase: 11-apv2-lifecycle-foundation
plan: 02
subsystem: docs
tags: [autopilot, apv2, device-preparation, mermaid, lifecycle, migration]

requires:
  - phase: 11-apv2-lifecycle-foundation (plan 01)
    provides: APv2 overview, prerequisites, admin template, lifecycle-apv2 directory
provides:
  - 10-step APv2 user-driven deployment flow with two-level Mermaid diagrams
  - APv2 automatic mode documentation with preview caveats (Windows 365)
  - Decision flowchart for APv1 vs APv2 framework selection
  - High-level migration guidance from APv1 to APv2
affects: [12-apv2-failure-index, 13-apv2-l1-trees, 14-apv2-l2-runbooks, 15-apv2-admin-setup, 17-navigation]

tech-stack:
  added: []
  patterns: [preview-caveat-double-coverage, decision-flowchart-mermaid, deployment-failure-callout]

key-files:
  created:
    - docs/lifecycle-apv2/02-deployment-flow.md
    - docs/lifecycle-apv2/03-automatic-mode.md
  modified:
    - docs/apv1-vs-apv2.md

key-decisions:
  - "ETG shown as distinct labeled node between Step 2 and Step 3 in Level 1 Mermaid — not hidden inside a step label"
  - "Preview caveats use double coverage: top banner + 5 inline callouts in automatic mode doc"
  - "Decision flowchart uses 8 questions (Q1-Q8) covering all APv1-only requirements before recommending APv2"
  - "Migration guidance stays high-level (5 numbered considerations) with Phase 15 forward references"

patterns-established:
  - "Preview double coverage: top banner blockquote + per-section inline > **Preview:** callouts"
  - "Deployment failure callout: bold **Failure here fails the deployment.** on steps that are fatal"
  - "Decision flowchart: sequential Yes/No questions leading to framework recommendation"

requirements-completed: [LIFE-01, LIFE-03, LIFE-04]

duration: 5min
completed: 2026-04-11
---

# Phase 11 Plan 02: APv2 Deployment Flow, Automatic Mode, and Comparison Extension Summary

**10-step APv2 deployment flow with two-level Mermaid diagrams, Windows 365 automatic mode with preview caveats, and APv1-vs-APv2 decision flowchart with migration guidance**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-11T14:34:24Z
- **Completed:** 2026-04-11T14:39:15Z
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments

- Created 10-step APv2 user-driven deployment flow document with two-level Mermaid diagrams (Level 1 happy path with ETG prominent, Level 2 with 5 failure points)
- Created APv2 automatic mode document with preview banner, 5 inline preview callouts, all 4 supported Windows 365 SKUs, 9-step process, and failure status labels
- Extended APv1 vs APv2 comparison with 8-question Mermaid decision flowchart and 5-step migration guidance

## Task Commits

Each task was committed atomically:

1. **Task 1: Create APv2 deployment flow document with two-level Mermaid diagrams** - `4d0bb72` (feat)
2. **Task 2: Create APv2 automatic mode document with preview caveats** - `622032e` (feat)
3. **Task 3: Extend APv1 vs APv2 comparison with decision flowchart and migration guidance** - `1fbcafb` (feat)

## Files Created/Modified

- `docs/lifecycle-apv2/02-deployment-flow.md` - 10-step APv2 user-driven deployment flow with Level 1 happy path and Level 2 failure point Mermaid diagrams, step-by-step breakdown, post-deployment sync, and quality update note
- `docs/lifecycle-apv2/03-automatic-mode.md` - APv2 automatic mode (Windows 365 Cloud PCs only) with preview banner, 4 SKU support table, 9-step process, current limits, and admin setup workflow
- `docs/apv1-vs-apv2.md` - Extended with decision flowchart (Q1-Q8 Mermaid diagram) and migration guidance (5 numbered considerations with APv1 deregistration emphasis)

## Decisions Made

- ETG shown as a distinct labeled node between Step 2 (authentication) and Step 3 (enrollment) in the Level 1 Mermaid diagram, per D-05 requirement for visual prominence
- Preview caveats implemented with double coverage per D-10: top banner blockquote + 5 inline `> **Preview:**` callouts throughout the automatic mode document
- Decision flowchart uses 8 sequential questions covering all APv1-only requirements (Windows 10, hybrid join, pre-provisioning, Reset, HoloLens/Teams Rooms, >25 apps, GCCH/DoD, Cloud PC) before recommending APv2
- Migration guidance stays high-level per D-09: 5 numbered considerations with forward references to Phase 15 for detailed configuration steps

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None - all content is complete and data sources are wired.

## Next Phase Readiness

- Phase 11 is now complete (both plans executed): APv2 lifecycle documentation set is fully delivered
- Phase 12 (APv2 Failure Index) can proceed: deployment flow steps 7-9 define the failure-causing steps that Phase 12 will catalog
- Phase 15 (APv2 Admin Setup) has forward references from migration guidance and automatic mode admin workflow
- Phase 17 (Navigation) has all cross-links pre-built via version gate headers and See Also footers (per D-11)

---
*Phase: 11-apv2-lifecycle-foundation*
*Completed: 2026-04-11*
