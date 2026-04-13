---
phase: 15-apv2-admin-setup-guides
plan: 01
subsystem: documentation
tags: [apv2, autopilot, device-preparation, etg, rbac, admin-setup, intune]

# Dependency graph
requires:
  - phase: 11-apv2-lifecycle-foundation
    provides: lifecycle-apv2/ directory with 00-overview.md and 01-prerequisites.md for cross-linking
  - phase: 13-apv2-l1-decision-trees-runbooks
    provides: L1 runbooks 06-09 (deployment-not-launched, apps-not-installed, apv1-conflict, timeout) used as "what breaks" link targets

provides:
  - docs/admin-setup-apv2/00-overview.md -- Sequential index for the 5-file APv2 admin setup guide set with Mermaid flow diagram
  - docs/admin-setup-apv2/01-prerequisites-rbac.md -- Admin-level prerequisite verification and custom RBAC role creation (5 permission categories)
  - docs/admin-setup-apv2/02-etg-device-group.md -- ETG security group creation with inline PowerShell for Intune Provisioning Client service principal setup

affects:
  - 15-apv2-admin-setup-guides (plans 02+: 03-device-preparation-policy.md and 04-corporate-identifiers.md link FROM these files)
  - 17-navigation-updates (will wire docs/index.md to the new admin-setup-apv2/ directory)
  - 16-apv1-admin-guides (pattern reference for APv1 equivalent)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Admin template structure: Prerequisites (numbered 0-N with APv1 deregistration as item 0) -> Steps (with per-setting what-breaks callouts) -> Verification checklist -> Configuration-Caused Failures table -> See Also footer -> Next step nav"
    - "What breaks callout 3-element pattern: Admin sees / End user sees / Runbook link -- mandatory for every configurable setting"
    - "Configuration-Caused Failures table scoped to each file's own settings only (per D-09)"
    - "Inline PowerShell for admin audience content (no details blocks) -- established in 02-etg-device-group.md"

key-files:
  created:
    - docs/admin-setup-apv2/00-overview.md
    - docs/admin-setup-apv2/01-prerequisites-rbac.md
    - docs/admin-setup-apv2/02-etg-device-group.md
  modified: []

key-decisions:
  - "APv1 deregistration is prerequisite 0 (first and most critical) in 01-prerequisites-rbac.md -- APv1 silently takes precedence when both registrations exist"
  - "All 5 RBAC permission categories documented with exact permission names from official Microsoft Learn requirements page (verified 2026-04-07)"
  - "PowerShell procedure (New-MgServicePrincipal + New-MgGroupOwnerByRef) is inline in 02-etg-device-group.md -- not in details blocks per D-04/D-06"
  - "Both service principal name variants documented: Intune Provisioning Client and Intune Autopilot ConfidentialClient (both refer to AppID f1346770-5b25-470b-88bd-d5744ab7952c)"
  - "Expected PowerShell error codes documented inline: 409 Conflict (already exists, proceed) and 403 Forbidden (insufficient permissions)"
  - "App limit of 25 cited (raised from 10 on January 30, 2026) per research state-of-the-art table"

patterns-established:
  - "Pattern: Admin guide structure -- every file follows admin-template.md with Prerequisites -> Steps -> Verification -> Configuration-Caused Failures -> See Also -> Next step footer"
  - "Pattern: Sequential navigation -- 00-overview.md -> 01 -> 02 -> 03 -> 04 via Next step footers; 00-overview.md serves as re-entry point from any file"
  - "Pattern: Version gate blockquote on every admin guide file indicating APv2 scope and linking to APv1 coming in Phase 16"
  - "Pattern: Configuration-Caused Failures table covers only the current file's settings (not cross-file)"

requirements-completed: [ASET-01, ASET-02, ASET-04]

# Metrics
duration: 5min
completed: 2026-04-12
---

# Phase 15 Plan 01: APv2 Admin Setup Overview, Prerequisites/RBAC, and ETG Device Group Summary

**APv2 admin setup foundation: sequential 5-file guide set entry point, admin-level prerequisite verification with APv1-first ordering, and ETG device group creation with inline PowerShell for Intune Provisioning Client service principal ownership.**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-13T02:50:39Z
- **Completed:** 2026-04-13T02:55:39Z
- **Tasks:** 3/3
- **Files modified:** 3

## Accomplishments

### Task 1: APv2 admin setup overview (00-overview.md)

Created `docs/admin-setup-apv2/00-overview.md` as the entry point and sequencer for the 5-file admin setup guide set. Contains:
- Numbered list of all 4 configuration guide files with brief purpose descriptions
- Mermaid linear flow diagram (4 setup steps as sequential boxes)
- Before You Begin section linking to device-level prerequisites (lifecycle-apv2/01-prerequisites.md) and noting APv1 deregistration requirement
- Version gate blockquote, See Also footer, and Next step link to 01-prerequisites-rbac.md

### Task 2: Prerequisites and RBAC role guide (01-prerequisites-rbac.md)

Created `docs/admin-setup-apv2/01-prerequisites-rbac.md` covering admin-level prerequisites and RBAC role creation. Contains:
- Prerequisites 0-4 with APv1 deregistration as item 0 (most critical)
- Steps 1-4 covering APv1 deregistration verification, auto-enrollment verification, Entra join permissions verification, and custom RBAC role creation
- All 5 RBAC permission categories (Device configurations, Enrollment programs, Managed apps, Mobile apps, Organization) with per-permission tables
- 5 "What breaks if misconfigured" callouts each with Admin sees / End user sees / Runbook link
- Configuration-Caused Failures table (5 rows covering this file's settings)
- Link to lifecycle-apv2/01-prerequisites.md for device-level prerequisites (no duplication per D-15)

### Task 3: ETG device group guide (02-etg-device-group.md)

Created `docs/admin-setup-apv2/02-etg-device-group.md` covering ETG group creation, service principal ownership, and app/script assignment. Contains:
- 4-item ETG checklist table (Security group type, Assigned membership, No role-assignable, Intune Provisioning Client as owner)
- AppID `f1346770-5b25-470b-88bd-d5744ab7952c` cited 7 times (checklist, Option A portal instructions, Option B PowerShell 3x, verification, Configuration-Caused Failures table)
- Both service principal name variants documented: "Intune Provisioning Client" and "Intune Autopilot ConfidentialClient"
- Full inline PowerShell procedure: Install-Module, Connect-MgGraph, New-MgServicePrincipal, Get-MgServicePrincipal, Get-MgGroup, New-MgGroupOwnerByRef
- Expected error handling: 409 Conflict (already exists), 403 Forbidden (permissions)
- App assignment steps (up to 25 apps, Device/System context) and script assignment steps (Run as logged on credentials = No)
- 4 "What breaks if misconfigured" callouts and Configuration-Caused Failures table (6 rows)

## Deviations from Plan

None -- plan executed exactly as written.

## Known Stubs

None -- all files contain substantive content. The 00-overview.md references 03-device-preparation-policy.md and 04-corporate-identifiers.md as forward links to files created in Plan 02, which is expected and correct.

## Self-Check: PASSED

| Item | Status |
|------|--------|
| docs/admin-setup-apv2/00-overview.md | FOUND |
| docs/admin-setup-apv2/01-prerequisites-rbac.md | FOUND |
| docs/admin-setup-apv2/02-etg-device-group.md | FOUND |
| .planning/phases/15-apv2-admin-setup-guides/15-01-SUMMARY.md | FOUND |
| Commit b4e7044 (overview) | FOUND |
| Commit 945394a (prerequisites/RBAC) | FOUND |
| Commit 19da52b (ETG device group) | FOUND |
