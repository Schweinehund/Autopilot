---
phase: 21-windows-operational-gaps
plan: "01"
subsystem: docs/device-operations
tags: [device-lifecycle, autopilot-reset, retire, wipe, re-provisioning, tenant-migration, decision-tree]
dependency_graph:
  requires:
    - docs/_templates/admin-template.md
    - docs/lifecycle/05-post-enrollment.md
    - docs/apv1-vs-apv2.md
    - docs/reference/endpoints.md
    - docs/decision-trees/00-initial-triage.md
  provides:
    - docs/device-operations/ (new folder with 5 files)
    - docs/decision-trees/05-device-lifecycle.md
  affects:
    - docs/lifecycle/05-post-enrollment.md (should link to device-operations/ per D-09 — not modified in this plan)
    - docs/index.md (not yet updated — handled by later plan)
tech_stack:
  added: []
  patterns:
    - admin-template.md with L1 Action + L2 Note cross-tier callouts
    - Mermaid flowchart with classDef styling (05-device-lifecycle.md)
    - Five-action comparison table for device lifecycle actions
    - Prerequisite checklist with checkboxes
key_files:
  created:
    - docs/device-operations/00-overview.md
    - docs/device-operations/01-autopilot-reset.md
    - docs/device-operations/02-retire-wipe.md
    - docs/device-operations/03-re-provisioning.md
    - docs/device-operations/04-tenant-migration.md
    - docs/decision-trees/05-device-lifecycle.md
  modified: []
decisions:
  - "Applied audience: both to WDLC-01/02/03 per D-21 (L1 handles basic resets, L2 investigates complex scenarios)"
  - "Applied audience: admin to WDLC-04 per D-23 (tenant migration is project-level, not L1/L2 task)"
  - "Decision tree placed in docs/decision-trees/ (not device-operations/) following existing pattern"
  - "Table rows use plain text (not bold) for action names to satisfy literal acceptance criteria check"
metrics:
  duration_minutes: 6
  completed_date: 2026-04-14
  tasks_completed: 2
  files_created: 6
  files_modified: 0
---

# Phase 21 Plan 01: Device Operations Guides Summary

## One-liner

Six new markdown files covering device lifecycle management: Autopilot Reset (local/remote), five-action retire/wipe comparison, ownership transfer re-provisioning, and tenant-to-tenant migration — plus a Mermaid decision tree routing admins to the correct action.

## What Was Built

### Task 1: Device Operations Guides (WDLC-01 through WDLC-04)

Created `docs/device-operations/` with four operational guides:

**01-autopilot-reset.md (WDLC-01)** — APv1-only Autopilot Reset with two procedure paths:
- Local reset via CTRL+WIN+R at lock screen with WinRE prerequisite
- Remote reset via Intune admin center with timing difference explained (fires at next check-in, not immediately)
- Data preservation table: 10 items categorized as Preserved or REMOVED for each method
- Explicit unsupported scenarios callout: hybrid Entra joined and Surface Hub devices
- Primary user clearing difference: local reset does NOT clear primary user; remote reset DOES

**02-retire-wipe.md (WDLC-02)** — Five-action comparison table with step-by-step procedures:
- All five actions: Autopilot Reset, Retire, Wipe, Fresh Start, Delete (Deregister)
- Table columns: What It Does, What Is Preserved, Enrollment State After, When to Use
- Links to decision tree at two prominent locations
- L1 Action callout: BYOD vs corporate device distinction (Retire vs Wipe)
- L2 Note callout: stale device Retire failure with 30-day threshold

**03-re-provisioning.md (WDLC-03)** — Ownership transfer and re-enrollment guide:
- Prerequisite checklist with 7 checkboxes covering primary user, group membership, profile assignment, device limits, and framework-specific hash/OS requirements
- Three scenarios: same-org transfer, device refresh (new hardware), device return/decommission
- APv1 vs APv2 differences noted inline throughout
- Re-enrollment OOBE flow for post-Wipe devices

**04-tenant-migration.md (WDLC-04)** — Tenant-to-tenant migration (audience: admin):
- Critical warnings block: prohibition on Autopilot Reset, 500-device batch limit, no undo after Tenant A deletion
- Online migration: 6 steps, hash collection before deletion, `Get-WindowsAutoPilotInfo`
- Offline migration: `AutoPilotConfigurationFile.json` deployed to `%windir%\provisioning\autopilot\`
- Migration prerequisites subsection per D-14

### Task 2: Decision Tree and Folder Overview

**docs/decision-trees/05-device-lifecycle.md** — Mermaid `graph TD` flowchart:
- Entry question: "What do you want to preserve?"
- Routes to: Retire (personal data), Autopilot Reset (same tenant re-use), Tenant Migration (cross-tenant), Fresh Start (keep documents), Wipe (full factory reset)
- Action quick-reference table linking to device-operations/ guides
- "Already Wiped?" sidebar for Delete/Deregister edge case
- Hybrid Entra join note: Autopilot Reset not supported, use Wipe

**docs/device-operations/00-overview.md** — Folder index per D-06:
- Numbered list of 4 operations with description and link
- "Not sure which action?" prompt linking to decision tree
- Navigation links to lifecycle/00-overview.md and lifecycle/05-post-enrollment.md

## Deviations from Plan

### Auto-fixed Issues

None.

### Content Adaptations

**Table row formatting:** Plan acceptance criteria checked for `| Retire |` without bold markers. Initial implementation used `| **Retire** |` (bold in first column, a common Markdown table pattern). Corrected to plain text to match the literal check pattern. This is a presentation preference, not a bug.

## Known Stubs

None. All content is complete and wired. The word "not available" appears in content as accurate technical fact (Autopilot Reset is not available for APv2), not as a stub placeholder.

## Commits

| Task | Commit | Files |
|------|--------|-------|
| Task 1: WDLC guides | `01fd4a8` | docs/device-operations/01-autopilot-reset.md, 02-retire-wipe.md, 03-re-provisioning.md, 04-tenant-migration.md |
| Task 2: Decision tree + overview | `796f306` | docs/decision-trees/05-device-lifecycle.md, docs/device-operations/00-overview.md |

## Self-Check: PASSED

All 6 created files confirmed present on disk. Both task commits (`01fd4a8`, `796f306`) confirmed in git log.
