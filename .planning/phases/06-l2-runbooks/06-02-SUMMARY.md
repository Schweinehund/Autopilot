---
phase: 06-l2-runbooks
plan: 02
subsystem: docs/l2-runbooks
tags: [l2-runbooks, esp, policy-conflicts, registry-investigation, autopilot]
dependency_graph:
  requires:
    - 06-01 (log collection guide — Step 1 link in both runbooks)
    - 05-03 (L1 ESP runbook — escalation source ESE1-ESE5)
    - 04-01 (ESP decision tree — ESE node IDs referenced in triage blocks)
    - 03-02 (ESP error codes — policy conflicts table source)
  provides:
    - docs/l2-runbooks/02-esp-deep-dive.md (ESP registry investigation guide)
    - docs/l2-runbooks/05-policy-conflicts.md (policy conflict analysis guide)
  affects:
    - 06-03 (future runbooks can cross-link to these two for ESP context)
    - docs/l2-runbooks/00-index.md (index links to both files)
tech_stack:
  added: []
  patterns:
    - L2 registry investigation pattern: PowerShell registry reads with ErrorAction SilentlyContinue, dry-run WhatIf before live commands
    - Dual-path triage block: L1-escalation path (skip to Step 2) vs fresh-start path (begin Step 1)
    - Escalation ceiling pattern: explicit Microsoft-side indicators for when to stop L2 investigation
key_files:
  created:
    - docs/l2-runbooks/02-esp-deep-dive.md
    - docs/l2-runbooks/05-policy-conflicts.md
  modified: []
decisions:
  - ESP deep-dive covers device and user phase separation via FirstSync IsServerProvisioningDone value; 0 = device phase incomplete, 1 = device phase done
  - AppWorkload.log documented as primary app install log replacing IntuneManagementExtension.log (changed August 2024)
  - Policy conflict guide covers all 6 patterns from error-codes/03-esp-enrollment.md; InteractiveLogon banner added as 6th pattern under Security Baseline scenario
  - PreferredAadTenantDomainName investigation uses Provisioning/Diagnostics/Autopilot registry path per existing registry-paths.md reference
metrics:
  duration: 4min
  completed: 2026-03-21
  tasks_completed: 2
  files_created: 2
---

# Phase 06 Plan 02: ESP Deep-Dive and Policy Conflict Runbooks Summary

## One-Liner

ESP registry investigation guide (FirstSync/Sidecar/ExpectedPolicies) and policy conflict analysis (AutoAdminLogon/AppLocker/DeviceLock/Security Baseline/PreferredAadTenantDomainName) authored as companion L2 runbooks.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create ESP deep-dive investigation guide | 8ddc0a7 | docs/l2-runbooks/02-esp-deep-dive.md |
| 2 | Create policy conflict analysis guide | d779dba | docs/l2-runbooks/05-policy-conflicts.md |

## What Was Built

### docs/l2-runbooks/02-esp-deep-dive.md

Six-step investigation guide for ESP failures at the registry level:

1. Collect diagnostic package (links to 01-log-collection.md)
2. Identify ESP phase via `FirstSync\IsServerProvisioningDone` value
3. Check `ExpectedPolicies` for stalled device phase policies
4. Check `Sidecar` Win32 app install status per-app
5. Check `AppWorkload.log` as primary app install log (with note about August 2024 path change)
6. Cross-reference to policy conflicts when no app failure found

Three resolution scenarios: stale FirstSync keys (Restart-EnrollmentStatusPage with WhatIf), Win32 app install failure (Sidecar-driven identification), ESP timeout (timeout config and Conditional Access).

Triage block routes ESE1/ESE2/ESE4/ESE5 escalations to Step 2 and fresh investigations to Step 1. Escalation ceiling documents Microsoft-side service indicators.

### docs/l2-runbooks/05-policy-conflicts.md

Six-step investigation guide for policy-driven provisioning failures:

1. Collect diagnostic package (links to 01-log-collection.md)
2. Check AutoAdminLogon via Winlogon registry
3. Check AppLocker CSP assignment in Intune
4. Check DeviceLock policies via registry and Intune
5. Check PreferredAadTenantDomainName via Autopilot diagnostics registry
6. Review Security Baseline profile assignments including interactive logon banners

Five resolution scenarios covering all policy conflict patterns. Escalation ceiling for Microsoft-side service issues.

## Decisions Made

- **AppWorkload.log as primary:** Documented the August 2024 log path change explicitly. IntuneManagementExtension.log remains but is not the primary source for app install status.
- **All 6 error-codes patterns covered:** The policy conflicts table in 03-esp-enrollment.md has 6 entries; all 6 appear in 05-policy-conflicts.md (AppLocker CSP, DeviceLock, Security Baseline UAC/VBS, AutoAdminLogon, PreferredAadTenantDomainName, Interactive Logon Message).
- **PreferredAadTenantDomainName registry:** Uses the existing `Provisioning/Diagnostics/Autopilot` path from registry-paths.md rather than a new path.
- **Security Baseline policy names flagged:** Per STATE.md blocker, the guide explicitly notes that setting names must be validated against the current baseline version — conflict categories (VBS, UAC, DeviceLock, Winlogon) are stable but names vary by version.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — both runbooks are complete investigation guides with all required sections. No placeholder content or TODO markers.

## Self-Check: PASSED

- docs/l2-runbooks/02-esp-deep-dive.md: EXISTS
- docs/l2-runbooks/05-policy-conflicts.md: EXISTS
- Task 1 commit 8ddc0a7: FOUND
- Task 2 commit d779dba: FOUND
- Both files contain required cross-links, triage blocks, escalation ceilings, and Tool References sections
