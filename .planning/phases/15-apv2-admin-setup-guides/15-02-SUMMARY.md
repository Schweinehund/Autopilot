---
phase: 15-apv2-admin-setup-guides
plan: "02"
subsystem: docs/admin-setup-apv2
tags: [documentation, apv2, admin-guide, device-preparation-policy, corporate-identifiers, enrollment-restrictions]
dependency_graph:
  requires:
    - 15-01 (docs/admin-setup-apv2/00-overview.md, 01-prerequisites-rbac.md, 02-etg-device-group.md)
    - 13-01/13-02 (l1-runbooks/06, 07, 09)
  provides:
    - docs/admin-setup-apv2/03-device-preparation-policy.md
    - docs/admin-setup-apv2/04-corporate-identifiers.md
  affects:
    - Phase 17 navigation hub updates (will link to admin-setup-apv2/)
tech_stack:
  added: []
  patterns:
    - Admin template dual-layer pattern (inline what-breaks + Configuration-Caused Failures table)
    - Sequential navigation footer (03 -> 04 -> 00-overview)
    - APv2 frontmatter with last_verified/review_by/applies_to/audience
key_files:
  created:
    - docs/admin-setup-apv2/03-device-preparation-policy.md
    - docs/admin-setup-apv2/04-corporate-identifiers.md
  modified: []
decisions:
  - "Documented all 8 configurable Device Preparation policy settings with per-setting what-breaks callouts (12 total callouts across settings and policy-level concerns)"
  - "Valid combinations table follows D-12: 5 combinations from live known issues page (3 Standard User + 2 Administrator), marked as active known issue April 2026"
  - "Corporate identifiers guide opens with conditional when-required section per D-10 to prevent admins from wasting time on a step that may not apply"
  - "Enrollment restriction interaction subsection scoped to APv2-relevant interactions only per D-11 (not a full enrollment restrictions guide)"
metrics:
  duration_minutes: 4
  completed_date: "2026-04-13"
  tasks_completed: 2
  files_created: 2
  files_modified: 0
---

# Phase 15 Plan 02: APv2 Admin Setup Guides (Policy + Identifiers) Summary

**One-liner:** Device Preparation policy guide with 12 per-setting what-breaks callouts and Entra ID Local Administrator valid combinations table, plus conditional corporate identifiers guide with enrollment restriction conflict precedence rules.

## What Was Built

Two Markdown documentation files completing the 5-file APv2 admin setup guide set in `docs/admin-setup-apv2/`:

### Task 1: Device Preparation policy configuration guide

**File:** `docs/admin-setup-apv2/03-device-preparation-policy.md`
**Commit:** `b12ae80`

The most complex file in the admin setup set. Covers all 8 configurable Device Preparation policy settings across 8 wizard steps:

- Deployment mode, Join type, User account type (with Entra ID Local Admin valid combinations table)
- Device group selection (with device vs user group confusion warning)
- 4 OOBE settings: timeout (15-720 min), custom error message, allow skip, show diagnostics
- Apps section (up to 25) with ETG assignment requirement callout
- Scripts section (up to 10) with System context requirement callout
- Assignments (user group) with device vs user group confusion warning
- Policy priority for multi-policy scenarios

The Entra ID Local Administrator known issue (active April 2026) is documented in full: 5 valid combinations in a two-table format (3 for Standard User result, 2 for Administrator result), with the failure consequence when an unsupported combination is used (provisioning skipped, user reaches desktop without apps, no error shown).

12 total "What breaks if misconfigured" callouts, each with Admin sees / End user sees / Runbook link. 8-row Configuration-Caused Failures table. Links to all 3 L1 runbooks (06, 07, 09). Navigation footer to 04-corporate-identifiers.md.

### Task 2: Corporate identifiers and enrollment restriction guide

**File:** `docs/admin-setup-apv2/04-corporate-identifiers.md`
**Commit:** `5f176a2`

Conditional guide with prominent "When Corporate Identifiers Are Required" section at the top, explaining exactly when to skip this step. Covers:

- CSV format (manufacturer,model,serial_number -- no header row, with examples)
- Windows-only identifier type (serial number only and IMEI explicitly marked NOT supported)
- Upload procedure with portal navigation path
- Enrollment Restriction Interaction subsection: ownership table showing APv2 behavior with/without corporate identifiers, 4 conflict precedence rules, diagnosis path to L1 runbook 06 step 13
- 4 "What breaks" callouts, 4-row Configuration-Caused Failures table
- Navigation footer linking back to 00-overview.md (completing the sequence)

## Deviations from Plan

None -- plan executed exactly as written.

The plan specified all content requirements exhaustively. All acceptance criteria met:
- Task 1: 12 what-breaks callouts (plan required at least 7), 8-row failures table (plan required at least 7), all 3 L1 runbooks linked (06, 07, 09)
- Task 2: 4 what-breaks callouts (plan required at least 3), 4-row failures table (plan required at least 4), enrollment restriction BEFORE principle documented

## Known Stubs

None -- both files contain fully specified content. No placeholder text, no hardcoded empty values, no "coming soon" entries. The APv1 admin guides version gate references "coming in Phase 16" which is an intentional and accurate forward reference documented in the CONTEXT.md (D-14 decision), not a stub.

## Self-Check: PASSED
