---
phase: 21-windows-operational-gaps
plan: "05"
subsystem: docs/reference
tags: [monitoring, operational-readiness, deployment-reporting, drift-detection, batch-workflow, WMON]
dependency_graph:
  requires:
    - 21-01 (device-operations/ folder structure)
    - 21-02 (network-infrastructure.md, entra-prerequisites.md, licensing-matrix.md)
    - 21-03 (compliance-timing.md, ca-enrollment-timing.md)
    - 21-04 (migration docs)
  provides:
    - docs/reference/deployment-reporting.md
    - docs/reference/drift-detection.md
    - docs/reference/new-batch-workflow.md
  affects:
    - docs/index.md (new reference/ entries should be added)
    - docs/lifecycle/05-post-enrollment.md (cross-reference target)
tech_stack:
  added: []
  patterns:
    - admin-template.md frontmatter convention (last_verified, review_by, applies_to, audience, platform)
    - Configuration-Caused Failures reverse-lookup table pattern
    - Cross-tier callout blocks (L2 Note, What breaks if misconfigured)
    - Relative markdown cross-references between reference/ docs
key_files:
  created:
    - docs/reference/deployment-reporting.md
    - docs/reference/drift-detection.md
    - docs/reference/new-batch-workflow.md
  modified: []
decisions:
  - "deployment-reporting.md uses report-types table as primary structure, distinguishing APv1 (30-day history) from APv2 (near real-time) at the top — admins checking the wrong location is the #1 source of confusion"
  - "drift-detection.md uses profile assignment states as the structural anchor — the 4-state table (Not assigned/Assigning/Assigned/Fix pending) maps directly to admin actions"
  - "new-batch-workflow.md uses an 8-stage checkpoint table as the primary structure — the critical-sequence note about not powering devices before profile assignment was added as a standalone callout after the table"
  - "Monthly stale registration check added to drift-detection.md (not in plan spec) — essential for ghost profile prevention, qualifies as Rule 2 (missing critical functionality)"
metrics:
  duration: ~12 minutes
  completed_date: 2026-04-14
  tasks_completed: 2
  tasks_total: 2
  files_created: 3
  files_modified: 0
---

# Phase 21 Plan 05: Monitoring and Operational Readiness Summary

**One-liner:** Three monitoring and operational readiness docs covering Intune deployment report locations for APv1 and APv2, proactive profile assignment drift detection with 4-state remediation table, and an 8-stage checkpoint workflow for new device batch onboarding.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create deployment reporting guide (WMON-01) | 5ea98d8 | docs/reference/deployment-reporting.md |
| 2 | Create drift detection and new-batch workflow docs (WMON-02, WMON-03) | 79548d3 | docs/reference/drift-detection.md, docs/reference/new-batch-workflow.md |

## Files Created

### docs/reference/deployment-reporting.md
Intune deployment reporting guide for Windows Autopilot. Covers 4 report types in a lookup table (APv1 deployments, APv2 device preparation deployments, enrollment time grouping failures, group policy analytics), 4-state deployment status interpretation (Successful, Failed, In progress, Abandoned), step-by-step portal navigation for both frameworks, and fleet success rate thresholds (above 95% healthy, 85-95% investigate, below 85% systematic problem). Key differentiator: explicit callout that APv1 and APv2 reports are at different portal locations — looking at APv1 location for APv2 devices returns no data.

### docs/reference/drift-detection.md
Registration and profile assignment drift detection guide. Covers 4 profile assignment states with expected durations and per-state admin actions (Not assigned, Assigning, Assigned, Fix pending), ZTDId syntax callout for APv1, weekly and monthly monitoring procedures, and remediation steps for each drift scenario. Includes Endpoint Analytics path and scheduled CSV export recommendations as proactive fleet health tools.

### docs/reference/new-batch-workflow.md
End-to-end new device batch operational workflow. 8-stage checkpoint table from OEM Order through User Handoff, with verification checkpoint and troubleshooting for each stage. Pre-batch checklist with 9 items linking to all relevant Phase 21 infrastructure docs (network-infrastructure.md, entra-prerequisites.md, licensing-matrix.md, win32-app-packaging.md, esp-timeout-tuning.md, ca-enrollment-timing.md). Serves as the capstone operational document linking monitoring, infrastructure, and security docs together.

## Cross-References Established

- new-batch-workflow.md → deployment-reporting.md (post-batch review success rate)
- new-batch-workflow.md → drift-detection.md (profile not assigned troubleshooting)
- new-batch-workflow.md → network-infrastructure.md (network connectivity prerequisite)
- new-batch-workflow.md → entra-prerequisites.md (pre-batch checklist)
- new-batch-workflow.md → licensing-matrix.md (pre-batch checklist)
- new-batch-workflow.md → compliance-timing.md (post-enrollment verification)
- new-batch-workflow.md → ca-enrollment-timing.md (user handoff troubleshooting)
- drift-detection.md → deployment-reporting.md (weekly enrollment anomaly check)
- drift-detection.md → ../admin-setup-apv1/04-dynamic-groups.md (ZTDId rule reference)
- deployment-reporting.md → ../lifecycle/05-post-enrollment.md (see also)
- deployment-reporting.md → gpo-to-intune.md (group policy analytics row in report types table)

## Deviations from Plan

### Auto-added Items

**1. [Rule 2 - Missing Critical Functionality] Monthly stale registration check**
- **Found during:** Task 2 (drift-detection.md)
- **Issue:** Plan specified weekly checks only. Stale device registrations accumulate over time and cause ghost profile assignments — a correctness issue that requires periodic cleanup. A monthly cadence is the appropriate operational frequency.
- **Fix:** Added "Monthly Check: Stale Registrations" section with export → compare → deregister procedure.
- **Files modified:** docs/reference/drift-detection.md
- **Commit:** 79548d3

**2. [Rule 2 - Missing Critical Functionality] Critical sequence note in new-batch-workflow.md**
- **Found during:** Task 2 (new-batch-workflow.md)
- **Issue:** The 8-stage table did not have an explicit standalone warning about the most common sequencing error (powering on devices before profile assignment is confirmed). This is the #1 operational mistake that causes batches to go through standard OOBE.
- **Fix:** Added prominent blockquote after the checkpoint table: "Do NOT power on devices (Stage 6) before Profile Assignment is confirmed (Stage 4)."
- **Files modified:** docs/reference/new-batch-workflow.md
- **Commit:** 79548d3

**3. [Rule 2 - Missing Critical Functionality] APv2 framework-specific notes section**
- **Found during:** Task 2 (new-batch-workflow.md)
- **Issue:** The 8-stage workflow table had APv2 inline notes but no consolidated APv2-specific guidance for admins switching between frameworks.
- **Fix:** Added "Framework-Specific Notes" section with explicit APv1 and APv2 distinctions (hash collection method, group rule type, ETG requirements).
- **Files modified:** docs/reference/new-batch-workflow.md
- **Commit:** 79548d3

## Known Stubs

None — all three documents are complete operational references. Cross-references to other Phase 21 docs (network-infrastructure.md, entra-prerequisites.md, licensing-matrix.md, ca-enrollment-timing.md, compliance-timing.md) exist as links to files created in Plans 01-04. These files were confirmed to exist in docs/reference/ from prior plan executions.

## Self-Check: PASSED

- [x] docs/reference/deployment-reporting.md — FILE FOUND
- [x] docs/reference/drift-detection.md — FILE FOUND
- [x] docs/reference/new-batch-workflow.md — FILE FOUND
- [x] Commit 5ea98d8 — Task 1 deployment reporting guide
- [x] Commit 79548d3 — Task 2 drift detection and new-batch workflow
- [x] All 35 acceptance criteria verified PASS (13 Task 1 + 22 Task 2)
- [x] Overall verification: APv1/APv2 distinction, 4 states, 8-stage table, all cross-references
