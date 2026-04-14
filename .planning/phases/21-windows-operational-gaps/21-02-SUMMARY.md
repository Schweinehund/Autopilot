---
phase: 21-windows-operational-gaps
plan: "02"
subsystem: docs/reference
tags: [infrastructure, network, entra-id, licensing, win32, esp, autopilot]
dependency_graph:
  requires: []
  provides:
    - docs/reference/network-infrastructure.md
    - docs/reference/entra-prerequisites.md
    - docs/reference/licensing-matrix.md
    - docs/reference/win32-app-packaging.md
    - docs/reference/esp-timeout-tuning.md
  affects:
    - docs/reference/endpoints.md (linked from network-infrastructure.md)
    - docs/admin-setup-apv1/03-esp-policy.md (extended by esp-timeout-tuning.md and win32-app-packaging.md)
tech_stack:
  added: []
  patterns:
    - admin-template.md frontmatter pattern (last_verified, review_by, applies_to: both, audience: admin, platform: Windows)
    - Per-setting "What breaks if misconfigured" callouts
    - Cross-reference via relative markdown links (no endpoint table duplication per D-07/D-08)
key_files:
  created:
    - docs/reference/network-infrastructure.md
    - docs/reference/entra-prerequisites.md
    - docs/reference/licensing-matrix.md
    - docs/reference/win32-app-packaging.md
    - docs/reference/esp-timeout-tuning.md
  modified: []
decisions:
  - "network-infrastructure.md links to endpoints.md as canonical URL source and contains zero https:// URLs in table rows, satisfying D-07 and D-08"
  - "esp-timeout-tuning.md declares itself an extension of 03-esp-policy.md in version gate, not a standalone guide"
  - "entra-prerequisites.md covers 6 settings in a single consequence table rather than spreading across multiple Step subsections"
metrics:
  duration_minutes: 25
  completed_date: 2026-04-14
  tasks_completed: 2
  tasks_total: 2
  files_created: 5
  files_modified: 0
---

# Phase 21 Plan 02: Infrastructure Reference Docs Summary

**One-liner:** Five infrastructure reference docs covering Autopilot network/firewall requirements, Entra ID prerequisites with per-setting consequences, SKU-to-feature licensing matrix, Win32 app detection rule priority order, and scenario-based ESP timeout tuning with calculation formula.

## Completed Tasks

| Task | Name | Commit | Files Created |
|------|------|--------|---------------|
| 1 | Network, Entra, and licensing reference docs (WINF-01, WINF-02, WINF-03) | 530633c | network-infrastructure.md, entra-prerequisites.md, licensing-matrix.md |
| 2 | Win32 app packaging and ESP timeout tuning docs (WINF-04, WINF-05) | 7b81d5c | win32-app-packaging.md, esp-timeout-tuning.md |

## What Was Built

### network-infrastructure.md (WINF-01)
Covers firewall port requirements (80, 443, UDP 123), split-tunnel VPN considerations, proxy configuration (WPAD, authenticated proxy limitations, SSL inspection), and supplementary test commands. Links to `endpoints.md` as the canonical URL table — contains zero `https://` URL rows itself. Includes "What breaks if misconfigured" callouts for each infrastructure configuration area.

### entra-prerequisites.md (WINF-02)
Six-setting consequence table covering MDM user scope, auto-enrollment, device limit per user, "users may join devices" setting, MDM authority, and WIP scope overlap. Portal navigation paths for each setting. Verification checklist confirming every setting.

### licensing-matrix.md (WINF-03)
Two tables: (1) license-to-Autopilot support matrix covering M365 Business Premium, F1, F3, E3, E5, A1/A3/A5, EMS E3/E5, Intune for Education, and a la carte combination; (2) feature-to-license mapping for dynamic groups, Windows Subscription Activation, pre-provisioning, self-deploying, APv2, and Autopilot Reset. Links to `apv1-vs-apv2.md` for framework feature differences.

### win32-app-packaging.md (WINF-04)
Four-tier detection rule priority: MSI product code > file version check > registry key/value > PowerShell custom script. ESP tracking requirements table showing assignment type vs ESP phase vs blocking behavior. Dependency chain configuration with IME log path for circular dependency diagnosis. Anti-pattern warning for LOB+Win32 mixing (TrustedInstaller conflict).

### esp-timeout-tuning.md (WINF-05)
Scenario timeout matrix with six scenarios: standard cloud join, hybrid Entra join (100 min recommended), pre-provisioning, large app payload, quality updates enabled, and APv2 fixed timeout. Timeout calculation formula with worked example. Misconfiguration consequences table for device/user/overall phase timeouts. Declares itself an extension of `03-esp-policy.md` (not standalone).

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all five documents contain substantive content with no placeholder text, TODO markers, or empty data sources.

## Self-Check: PASSED

- docs/reference/network-infrastructure.md: EXISTS
- docs/reference/entra-prerequisites.md: EXISTS
- docs/reference/licensing-matrix.md: EXISTS
- docs/reference/win32-app-packaging.md: EXISTS
- docs/reference/esp-timeout-tuning.md: EXISTS
- Task 1 commit 530633c: EXISTS
- Task 2 commit 7b81d5c: EXISTS
- All 5 files: `applies_to: both`, `audience: admin`, `platform: Windows`, `last_verified: 2026-04-13`, `review_by: 2026-07-12`
- network-infrastructure.md: zero https:// URLs in table rows (no endpoint table duplication)
- entra-prerequisites.md: 6-row consequence table present
- licensing-matrix.md: both SKU table and feature-to-license table present
- win32-app-packaging.md: 4-tier detection rule priority, IntuneManagementExtension.log, Do NOT mix Win32 warning
- esp-timeout-tuning.md: 100 minutes for hybrid, APv2 fixed 60 min, quality update buffer callout
