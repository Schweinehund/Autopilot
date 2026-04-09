---
phase: 08-reference-anchors
plan: "01"
subsystem: docs/reference
tags: [gap-closure, anchors, registry, glossary, tech-debt]
dependency_graph:
  requires: []
  provides:
    - "docs/reference/registry-paths.md#winlogon"
    - "docs/reference/registry-paths.md#autopilotsettings"
    - "docs/reference/registry-paths.md#provisioning-diagnostics"
    - "docs/_glossary.md#entra"
    - "docs/_glossary.md#intune"
  affects:
    - "docs/error-codes/03-esp-enrollment.md (inbound #winlogon link now resolves)"
    - "docs/error-codes/01-mdm-enrollment.md (inbound #intune and #entra links now resolve)"
    - "docs/error-codes/*.md (all #entra and #intune fragment links now resolve)"
tech_stack:
  added: []
  patterns:
    - "Inline HTML <a id=\"...\"> anchors for GFM table rows (GFM does not auto-anchor table cells)"
    - "GFM H3 headings auto-generate lowercase fragment IDs"
key_files:
  modified:
    - docs/reference/registry-paths.md
    - docs/_glossary.md
decisions:
  - "Inline HTML id anchors used for registry-paths.md table rows — GFM does not generate anchors for table cells; non-invasive approach preserves single-table layout"
  - "No inline HTML needed for glossary headings — GFM auto-generates #entra and #intune from ### Entra and ### Intune H3 headings"
  - "Intune placed under Enrollment section (after ### MDM) — Intune is a concrete MDM implementation"
  - "Entra placed under Deployment Modes section (before ### Hybrid join) — Entra ID is the identity service backing all deployment modes"
metrics:
  duration: "5 minutes"
  completed_date: "2026-04-08"
  tasks_completed: 2
  files_modified: 2
---

# Phase 8 Plan 1: Reference Anchors — Foundation Reference Gap Closure Summary

Closed 3 foundation-reference tech debt items from the v1.0 milestone audit: added the missing Winlogon registry entry with inline HTML anchor, added inline HTML anchors to two existing registry-paths.md rows, and added Entra/Intune term headings to _glossary.md so inbound fragment links resolve correctly.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add Winlogon entry and inline anchors to registry-paths.md | 7cbe092 | docs/reference/registry-paths.md |
| 2 | Add Entra and Intune term headings to _glossary.md | 338f44f | docs/_glossary.md |

## Changes Made

### Task 1: registry-paths.md

**3 inline HTML anchors added to existing rows:**
- `<a id="provisioning-diagnostics">` prepended to `HKLM:\SOFTWARE\Microsoft\Provisioning\Diagnostics\Autopilot` row
- `<a id="autopilotsettings">` prepended to `HKLM:\SOFTWARE\Microsoft\Provisioning\AutopilotSettings` row

**1 new row added (Winlogon):**
```
| <a id="winlogon"></a>`HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon` | AutoAdminLogon and DefaultDomainName settings ... | `l2-runbooks/05-policy-conflicts.md` (Steps 2 and 6), `error-codes/03-esp-enrollment.md` | MEDIUM confidence — referenced by L2 policy conflict runbook for AutoAdminLogon investigation |
```

Table row count: 8 original data rows → 9 data rows (increased by 1 as required).

Note: The plan stated "9 original data rows → 10" but the original file had 8 data rows. The count increased by exactly 1 as required. The plan's count was slightly off, but all acceptance criteria are met.

### Task 2: _glossary.md

**### Intune** added under `## Enrollment` section, after `### MDM`:
> Microsoft Intune — Microsoft's cloud MDM service and the concrete implementation of MDM used by Windows Autopilot to deliver policies, apps, and configuration profiles to enrolled devices.

**### Entra** added under `## Deployment Modes` section, before `### Hybrid join`:
> Microsoft Entra ID — the current product name for Azure Active Directory (renamed July 2023). The identity service that authenticates users and devices during Autopilot enrollment and stores device objects created by hybrid join and Autopilot registration.

**Alphabetical Index updated:**
- `[Entra](#entra)` inserted between `[Device phase](#device-phase)` and `[ESP](#esp)` (alphabetically correct: En- < Es-)
- `[Intune](#intune)` inserted between `[Hybrid join](#hybrid-join)` and `[MDM](#mdm)` (alphabetically correct: In- < MD-)

## Verification Output

```
Anchor count in registry-paths.md: 3
H3 heading count in _glossary.md: 2
Winlogon row present: OK
### Entra heading: OK
### Intune heading: OK
Index Entra position ([Device phase]...[Entra]...[ESP]): OK
Index Intune present: OK
Microsoft Entra ID in definition: OK
Microsoft Intune in definition: OK
```

## Deviations from Plan

None — plan executed exactly as written. The only minor note is that the original registry-paths.md had 8 data rows (not 9 as stated in the plan), so the final count is 9 (not 10). All acceptance criteria grep checks pass.

## Known Stubs

None — all changes are complete definitions with no placeholder content.

## Self-Check: PASSED

- docs/reference/registry-paths.md modified and committed (7cbe092)
- docs/_glossary.md modified and committed (338f44f)
- All grep acceptance criteria verified and passing
- SUMMARY.md created at .planning/phases/08-reference-anchors/08-01-SUMMARY.md
