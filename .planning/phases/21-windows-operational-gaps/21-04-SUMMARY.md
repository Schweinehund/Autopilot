---
phase: 21-windows-operational-gaps
plan: "04"
subsystem: docs/reference
tags: [migration, apv1-apv2, imaging, gpo, intune, windows]
dependency_graph:
  requires: []
  provides:
    - docs/reference/apv1-apv2-migration.md
    - docs/reference/imaging-to-autopilot.md
    - docs/reference/gpo-to-intune.md
  affects:
    - docs/apv1-vs-apv2.md (linked from apv1-apv2-migration.md)
    - docs/reference/win32-app-packaging.md (linked from imaging-to-autopilot.md)
    - docs/reference/gpo-to-intune.md (linked from imaging-to-autopilot.md)
tech_stack:
  added: []
  patterns:
    - admin-template.md with Rollback/Recovery extension (D-12)
    - Migration Prerequisites subsection (D-14)
    - What breaks if sequenced incorrectly callouts (D-13)
    - Outcome-based policy table (D-17)
    - Coexistence model framing (D-18)
key_files:
  created:
    - docs/reference/apv1-apv2-migration.md
    - docs/reference/imaging-to-autopilot.md
    - docs/reference/gpo-to-intune.md
  modified: []
decisions:
  - "APv1-to-APv2 migration modeled as ongoing coexistence (weeks/months parallel operation), not a one-shot cutover (D-18)"
  - "apv1-apv2-migration.md links to apv1-vs-apv2.md feature table and adds blocker column rather than duplicating (D-16)"
  - "gpo-to-intune.md organized by business outcome, not GPO setting name; includes Do Not Migrate list for cloud-incompatible GPO categories (D-17)"
  - "All three migration guides extend admin-template.md with Rollback/Recovery section and Migration Prerequisites subsection (D-11, D-12, D-14)"
  - "APv1 silently wins warning made explicit: both APv1 profile and APv2 policy co-existing causes APv1 to take precedence silently"
metrics:
  duration: "~30 minutes"
  completed: 2026-04-14
  tasks_completed: 2
  files_created: 3
  files_modified: 0
---

# Phase 21 Plan 04: Migration Reference Guides Summary

Three migration reference documents created in `docs/reference/` covering the most common provisioning framework migration paths: APv1-to-APv2 coexistence, on-premises MDT/SCCM imaging to Autopilot, and GPO policy migration to Intune using Group Policy Analytics.

## What Was Built

### Task 1: APv1-to-APv2 Coexistence Migration Playbook (WMIG-01)

**Commit:** `e313d29`
**File:** `docs/reference/apv1-apv2-migration.md`

APv1-to-APv2 coexistence playbook structured as an ongoing parallel operation model (weeks/months), not a one-shot cutover. Key content:

- **8-item readiness checklist** with explicit blocker flags — each unchecked item is a blocker that keeps that device category on APv1
- **Feature gap matrix** linking to `apv1-vs-apv2.md` with an added Migration Blocker column (not duplicating the existing table)
- **6-step coexistence process**: categorize fleet, create APv2 pilot policy, remove APv1 registration, wipe and re-provision, 30-day soak, expand
- **APv1 silently wins warning** with "What breaks if sequenced incorrectly" callout explaining the silent failure mode
- **Fleet-level rollback section** explaining that per-device rollback requires wipe + re-registration, and the option B approach (group removal) preserves the rollback path
- Cross-references to `apv1-vs-apv2.md`, APv1 admin setup, and device-operations retire/wipe

### Task 2: Imaging-to-Autopilot and GPO-to-Intune Guides (WMIG-02, WMIG-03)

**Commit:** `c82ba00`
**Files:** `docs/reference/imaging-to-autopilot.md`, `docs/reference/gpo-to-intune.md`

**imaging-to-autopilot.md:**
- MDT retirement notice prominently placed — no extended support after first ConfigMgr release post October 2025
- 4-row migration path table covering MDT→Autopilot, MDT→ConfigMgr OSD, SCCM OSD→Autopilot for Existing Devices, and manual USB/WDS→Autopilot
- App packaging step-by-step using `IntuneWinAppUtil.exe` with detection rule guidance by installer type
- Autopilot for Existing Devices section with `AutoPilotConfigurationFile.json` location, JSON limitations (user-driven only, no self-deploy/pre-provision), and task sequence placement sequencing warning
- 90-day parallel operation rollback model

**gpo-to-intune.md:**
- 5-step Group Policy Analytics workflow from GPMC.msc XML export through GPA import, MDM Support Report review, Settings Catalog migration, and unsupported setting handling
- Outcome-based policy table (8 business outcomes) mapping GPO location to Intune implementation — organized by what the policy achieves, not by GPO setting name
- "Do Not Migrate" list (6 categories): login scripts, folder redirection, IE Enhanced Security, WMI filter GPOs, environment-specific GPOs, drive mapping GPOs — each with modern cloud alternative
- GPO/Intune parallel operation warning: leaving GPO active after Intune policy is deployed causes unpredictable "last write wins" behavior
- Rollback by reversing OU scope changes, not by modifying Intune profiles

## Deviations from Plan

None — plan executed exactly as written.

All 15 overall verification checks pass. All per-task acceptance criteria (12 for Task 1, 17 for Task 2) pass. Cross-links from plan frontmatter verified (apv1-apv2-migration.md → apv1-vs-apv2.md, imaging-to-autopilot.md → win32-app-packaging.md, gpo-to-intune.md → imaging-to-autopilot.md).

## Known Stubs

None. All three files contain complete, actionable content with no placeholder text, TODO markers, or empty data structures flowing to rendered output.

## Self-Check: PASSED

Files exist:
- `docs/reference/apv1-apv2-migration.md` — FOUND
- `docs/reference/imaging-to-autopilot.md` — FOUND
- `docs/reference/gpo-to-intune.md` — FOUND

Commits exist:
- `e313d29` — FOUND (feat(21-04): create APv1-to-APv2 coexistence migration playbook)
- `c82ba00` — FOUND (feat(21-04): create imaging-to-autopilot and GPO-to-Intune migration guides)
