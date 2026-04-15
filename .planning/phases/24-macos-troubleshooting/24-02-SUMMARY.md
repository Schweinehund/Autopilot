---
phase: 24-macos-troubleshooting
plan: "02"
subsystem: docs/l2-runbooks
tags: [macOS, L2, runbooks, diagnostics, IntuneMacODC, ADE]
dependency_graph:
  requires:
    - 24-01 (macOS L1 triage tree and runbooks — wave 1 parallel)
    - docs/reference/macos-commands.md (Phase 22)
    - docs/reference/macos-log-paths.md (Phase 22)
    - docs/admin-setup-macos/03-configuration-profiles.md (Phase 23)
    - docs/admin-setup-macos/04-app-deployment.md (Phase 23)
    - docs/admin-setup-macos/05-compliance-policy.md (Phase 23)
  provides:
    - docs/l2-runbooks/10-macos-log-collection.md
    - docs/l2-runbooks/11-macos-profile-delivery.md
    - docs/l2-runbooks/12-macos-app-install.md
    - docs/l2-runbooks/13-macos-compliance.md
  affects:
    - 24-03 (index/navigation updates will link to these files)
    - docs/admin-setup-macos/06-config-failures.md (TBD Phase 24 links resolved in 24-03)
tech_stack:
  added: []
  patterns:
    - IntuneMacODC-first log collection (Section 1 primary, Terminal Section 2 fallback)
    - macOS-native diagnostics only (profiles, log show, system_profiler, pgrep, csrutil, fdesetup)
    - L2 triage block (From L1 escalation / Starting fresh)
    - Canonical reference links (macos-commands.md, macos-log-paths.md — never inline-defined)
key_files:
  created:
    - docs/l2-runbooks/10-macos-log-collection.md
    - docs/l2-runbooks/11-macos-profile-delivery.md
    - docs/l2-runbooks/12-macos-app-install.md
    - docs/l2-runbooks/13-macos-compliance.md
  modified:
    - docs/l2-runbooks/10-macos-log-collection.md (minor edit — removed mdmdiagnosticstool.exe cross-reference)
    - docs/l2-runbooks/11-macos-profile-delivery.md (minor edit — removed registry pattern wording)
decisions:
  - "3 separate investigation runbooks (one per MTRO-04 area) rather than combined — clean 1:1 mapping to profile delivery, app install, compliance"
  - "IntuneMacODC comparison to mdmdiagnosticstool.exe removed — macOS runbooks must not reference Windows tool names per acceptance criteria"
metrics:
  duration: ~35 minutes
  completed: 2026-04-15
  tasks_completed: 2
  files_created: 4
  files_modified: 2
---

# Phase 24 Plan 02: macOS L2 Runbooks Summary

## One-Liner

IntuneMacODC-first macOS L2 log collection guide plus 3 investigation runbooks (profile delivery via unified log, app install via IME/MDM channel split, compliance via csrutil/fdesetup/sw_vers) using macOS-native diagnostics exclusively.

## What Was Built

### Task 1: macOS L2 Log Collection Guide (`10-macos-log-collection.md`)

- **Section 1: IntuneMacODC** — primary comprehensive collection tool (curl download, chmod, sudo run, 7-step procedure). Covers what IntuneMacODC collects: Intune agent logs, Company Portal logs, system profiler output, profiles show output, process list, network config, system log excerpts.
- **Section 2: Terminal-Based Targeted Collection** — fallback for when IntuneMacODC cannot be downloaded (network restrictions). Covers: `profiles status -type enrollment`, `sudo profiles show`, `system_profiler SPConfigurationProfileDataType`, `log show` with `com.apple.ManagedClient` subsystem, ADE enrollment events via `cloudconfigurationd`, Intune agent process check via `pgrep`.
- **Section 3: Log Paths by macOS Version** — table with macOS 13/14/15 columns for all key log paths. Includes macOS 15 IntuneMDMAgent caveat (may be absent; use unified log instead).
- All commands link to canonical `macos-commands.md` reference. All log paths link to `macos-log-paths.md`. No inline path or command definitions.

### Task 2: 3 Investigation Runbooks

**`11-macos-profile-delivery.md` — macOS Profile Delivery Investigation**
- Triage block (from L1 escalation / starting fresh pattern)
- Context explaining Apple MDM channel vs Windows CSP/SyncML (no Windows diagnostic patterns)
- Investigation: MDM enrollment status verification → profiles show → unified log query → profile conflict check → Intune portal assignment status → Sync trigger → specific failure scenarios
- 5 resolution scenarios: pending/not checking in, profile conflict, SSID mismatch, firewall blocking MDM, certificate chain incomplete
- Escalation ceiling with IntuneMacODC data requirements

**`12-macos-app-install.md` — macOS App Install Failure Diagnosis**
- Explicit IME channel (DMG/PKG via IntuneMdmDaemon) vs MDM channel (VPP via APNs) distinction table — prevents cross-diagnosing wrong channel
- Investigation paths branch at Step 2 based on app type
- IME path: pgrep process check → IntuneMDMDaemon log analysis with common error patterns table
- VPP path: token status check → license count check → Available/device-group assignment issue
- 5 resolution scenarios covering download failure, detection rule mismatch, VPP token expiry, VPP assignment type, disk space

**`13-macos-compliance.md` — macOS Compliance Evaluation Investigation**
- Context: macOS has no Intune security baselines — compliance policies are the only enforcement mechanism
- Investigation: enrollment status → installed profiles → Intune per-setting compliance status → specific Terminal checks (csrutil, fdesetup, socketfilterfw, sw_vers)
- Conditional Access interaction investigation: Entra device object status, Company Portal registration, compliance sync
- Company Portal log analysis for registration failures
- 6 resolution scenarios: compliance not evaluated, SIP disabled (user Recovery Mode action), OS non-compliant, password timing gap, Gatekeeper without enforcement profile, Entra sync issue

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Anti-pattern removal] Removed Windows tool cross-references from macOS files**
- **Found during:** Task 2 verification (grep check for Windows patterns)
- **Issue:** `10-macos-log-collection.md` compared IntuneMacODC to `mdmdiagnosticstool.exe`; `11-macos-profile-delivery.md` mentioned `registry` in an anti-pattern callout. Both triggered the no-Windows-patterns acceptance criterion.
- **Fix:** Replaced `mdmdiagnosticstool.exe` cross-reference with plain description ("primary comprehensive log collection tool"). Removed `registry` word from profile delivery context paragraph.
- **Files modified:** `10-macos-log-collection.md`, `11-macos-profile-delivery.md`
- **Commits:** 21e5724 (included in Task 2 commit)

## Known Stubs

None. All 4 files are fully implemented with real diagnostic commands, log paths, and resolution scenarios sourced from Phase 22/23 reference materials. No placeholder content exists.

## Self-Check: PASSED

All files confirmed present on disk:
- FOUND: docs/l2-runbooks/10-macos-log-collection.md
- FOUND: docs/l2-runbooks/11-macos-profile-delivery.md
- FOUND: docs/l2-runbooks/12-macos-app-install.md
- FOUND: docs/l2-runbooks/13-macos-compliance.md
- FOUND: .planning/phases/24-macos-troubleshooting/24-02-SUMMARY.md

Commits confirmed in git history:
- FOUND: 352d0c9 (Task 1 — macOS L2 log collection guide)
- FOUND: 21e5724 (Task 2 — 3 investigation runbooks)
