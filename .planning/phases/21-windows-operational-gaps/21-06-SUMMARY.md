---
phase: "21-windows-operational-gaps"
plan: "06"
subsystem: docs/navigation
tags: [navigation, reference-index, glossary, common-issues, lifecycle]
dependency_graph:
  requires: [21-01, 21-02, 21-03, 21-04, 21-05]
  provides: [navigation-wiring, reference-index, glossary-terms]
  affects: [docs/index.md, docs/common-issues.md, docs/lifecycle/05-post-enrollment.md, docs/_glossary.md, docs/reference/00-index.md]
tech_stack:
  added: []
  patterns: [surgical-edit, alphabetical-glossary, two-click-navigation]
key_files:
  created:
    - docs/reference/00-index.md
  modified:
    - docs/index.md
    - docs/common-issues.md
    - docs/lifecycle/05-post-enrollment.md
    - docs/_glossary.md
decisions:
  - "Reference/00-index.md organizes 18 Phase 21 files into 5 sub-domain sections plus 3 existing references (18 total links)"
  - "Device Operations added as a named section in docs/index.md under Windows Autopilot Admin Setup"
  - "Autopilot Reset glossary entry expanded in-place rather than creating a duplicate entry"
  - "Tenant migration placed in Hardware section of glossary (closest alphabetical fit near TPM terms)"
metrics:
  duration_minutes: 25
  completed_date: "2026-04-14"
  tasks_completed: 2
  tasks_total: 2
  files_created: 1
  files_modified: 4
---

# Phase 21 Plan 06: Navigation Wiring Summary

One-liner: Reference folder index + docs hub, common-issues routing, lifecycle See Also, and glossary extended to make all 18 Phase 21 docs reachable within two clicks.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create reference folder index and update docs hub | 9035263 | docs/reference/00-index.md (new), docs/index.md |
| 2 | Update common-issues routing, lifecycle See Also, and glossary | 2ec9cf2 | docs/common-issues.md, docs/lifecycle/05-post-enrollment.md, docs/_glossary.md |

## What Was Built

### docs/reference/00-index.md (new)

Organizes all Phase 21 reference files into 5 sub-domain sections:

- **Existing References** — endpoints.md, powershell-ref.md, registry-paths.md (preserved)
- **Infrastructure Prerequisites** — network-infrastructure, entra-prerequisites, licensing-matrix, win32-app-packaging, esp-timeout-tuning
- **Security and Compliance** — ca-enrollment-timing, security-baseline-conflicts, compliance-timing
- **Migration Guides** — apv1-apv2-migration, imaging-to-autopilot, gpo-to-intune
- **Monitoring and Operations** — deployment-reporting, drift-detection, new-batch-workflow

### docs/index.md (modified)

Two additions made surgically — existing structure preserved:

1. **Device Operations section** added under Windows Autopilot Admin Setup, with links to `device-operations/00-overview.md` and `decision-trees/05-device-lifecycle.md`
2. **Reference Index, Migration Guides, and Monitoring** entries added to Cross-Platform References table

### docs/common-issues.md (modified)

Three new symptom routing sections added before Version History:

- **Device Reset and Lifecycle Issues** — routes to device-operations/00-overview, decision-trees/05-device-lifecycle, device-operations/01-autopilot-reset
- **Migration Issues** — routes to reference/apv1-apv2-migration, reference/imaging-to-autopilot, reference/gpo-to-intune
- **Security and Enrollment Issues** — routes to reference/ca-enrollment-timing, reference/compliance-timing, reference/security-baseline-conflicts

All 7 existing APv1 and APv2 sections preserved.

### docs/lifecycle/05-post-enrollment.md (modified)

Two additions per D-09:

1. Blockquote added immediately after "Feeds into: Ongoing device management (outside lifecycle scope)" pointing to `device-operations/00-overview.md` — reinforces the scope boundary rather than contradicting it
2. **See Also** section added at the bottom with links to device-operations/ overview and two key operation docs

### docs/_glossary.md (modified)

Seven new terms added in alphabetical order within existing sections:

| Term | Section | Links to |
|------|---------|----------|
| Compliance grace period | Enrollment | reference/compliance-timing.md |
| Device retirement | Deployment Modes | device-operations/02-retire-wipe.md |
| Device wipe | Deployment Modes | device-operations/02-retire-wipe.md |
| Group Policy Analytics | Hardware | reference/gpo-to-intune.md |
| Selective wipe | Security | Cross-reference to Device retirement |
| Tenant migration | Hardware | device-operations/04-tenant-migration.md |
| Autopilot Reset | Enrollment | device-operations/01-autopilot-reset.md (expanded from brief existing entry) |

Alphabetical index line updated with all 7 new anchors.

## Deviations from Plan

None — plan executed exactly as written. All surgical edits preserved existing content. Glossary terms inserted in alphabetically correct positions within existing section structure.

## Known Stubs

None. All links reference files that exist on disk (verified before writing).

## Self-Check: PASSED

Files exist:

- `docs/reference/00-index.md` — confirmed created
- `docs/index.md` — contains `device-operations` (1 occurrence in Device Operations section, 1 in decision tree link)
- `docs/common-issues.md` — contains `Device Reset`, `Migration Issues`, `CA Enrollment Timing`
- `docs/lifecycle/05-post-enrollment.md` — contains `device-operations` (5 occurrences) and `outside lifecycle scope`
- `docs/_glossary.md` — contains `Device retirement`, `Tenant migration`, `Group Policy Analytics`, `Compliance grace period`

Commits exist:

- `9035263` — feat(21-06): create reference index and update docs hub
- `2ec9cf2` — feat(21-06): update routing, lifecycle See Also, and glossary
