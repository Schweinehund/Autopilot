---
phase: 16-apv1-admin-setup-guides
plan: "01"
subsystem: docs/admin-setup-apv1
tags: [documentation, admin-guide, apv1, hardware-hash, deployment-profile, esp-policy]
requires: []
provides:
  - docs/admin-setup-apv1/00-overview.md
  - docs/admin-setup-apv1/01-hardware-hash-upload.md
  - docs/admin-setup-apv1/02-deployment-profile.md
  - docs/admin-setup-apv1/03-esp-policy.md
affects:
  - docs/admin-setup-apv1/ (new directory)
tech-stack:
  added: []
  patterns:
    - Admin guide template with dual-layer troubleshooting (inline what-breaks callouts + Configuration-Caused Failures table)
    - Mermaid graph LR for setup sequence (overview)
    - Mermaid flowchart TD for decision trees (hardware hash path selection)
    - L2 content in details blocks to preserve L1/L2 separation
key-files:
  created:
    - docs/admin-setup-apv1/00-overview.md
    - docs/admin-setup-apv1/01-hardware-hash-upload.md
    - docs/admin-setup-apv1/02-deployment-profile.md
    - docs/admin-setup-apv1/03-esp-policy.md
  modified: []
decisions:
  - "APv1 silently wins warning placed only in 00-overview.md (D-11 — single Consider APv2 callout location)"
  - "OEM path kept to 5 verification steps only (D-05 — minimal depth, verification role only)"
  - "PowerShell path gets full depth with 4 common error scenarios including TLS 1.2 and Graph auth changes"
  - "oldest created profile wins rule documented in 02-deployment-profile.md as primary conflict resolution behavior"
  - "ESP quality update default change documented as critical callout with new vs existing profile table"
  - "40-minute hybrid join buffer documented in ESP timeout guidance"
  - "TrustedInstaller conflict warning elevated to CRITICAL WARNING block in Step 3"
metrics:
  duration: 7 minutes
  completed: 2026-04-13
  tasks_completed: 3
  files_created: 4
  total_lines: 676
---

# Phase 16 Plan 01: APv1 Admin Setup — Overview, Hardware Hash, Deployment Profile, and ESP Policy Summary

APv1 admin setup foundation: sequential overview/index plus three configuration guides (hardware hash upload, deployment profile, ESP policy) covering OEM/CSV/PowerShell registration paths, all 11 OOBE settings with per-setting what-breaks warnings, and ESP policy with Windows quality update default change and TrustedInstaller conflict warning.

## What Was Built

### Task 1: Overview and Hardware Hash Upload Guide

**`docs/admin-setup-apv1/00-overview.md`** (60 lines) — Sequential index for all 10 APv1 admin setup guides. Contains:
- Version gate blockquote with APv2 and comparison page links
- "Consider APv2" callout including the "APv1 silently wins" warning (D-11 — placed here only)
- Mermaid `graph LR` diagram showing the 10-step setup sequence
- Numbered list of all 10 guide files (01–10) with one-line purpose descriptions and links
- See Also and Next step footer

**`docs/admin-setup-apv1/01-hardware-hash-upload.md`** (191 lines) — Hardware hash registration for all three paths. Contains:
- Mermaid `flowchart TD` decision tree for path selection (OEM / CSV / PowerShell)
- Path 1 (OEM): 5 verification steps only — admin's role is verification, not registration
- Path 2 (CSV): ANSI encoding requirement, column format table (case-sensitive headers, no Excel), 500-device limit, import error reference table (ZtdDeviceAssignedToAnotherTenant, ZtdDeviceAlreadyAssigned, ZtdDeviceDuplicated, InvalidZtdHardwareHash)
- Path 3 (PowerShell): Option A (local CSV) and Option B (direct upload with -Online), plus 4 common error scenarios (execution policy, NuGet/TLS 1.2, Graph auth July 2023 update, stale hash)
- 8 "What breaks if misconfigured" callouts, all linking to l1-runbooks/01-device-not-registered.md
- Configuration-Caused Failures table with 6 entries

### Task 2: Deployment Profile Configuration Guide

**`docs/admin-setup-apv1/02-deployment-profile.md`** (196 lines) — All 11 OOBE settings with per-setting what-breaks callouts. Contains:
- Full portal navigation path to Deployment Profiles
- 11 settings documented: Deployment mode, Join type, EULA, Privacy, Hide change account, User account type, Allow pre-provisioned (with error 0x80180005), Language, Keyboard, Device name template (%SERIAL%/%RAND%, 15-char limit), Convert to Autopilot
- 13 "What breaks if misconfigured" callouts
- Profile conflict resolution: oldest created profile wins (not most specific, not highest priority)
- All Devices assignment warning with exclusions-not-supported note
- Configuration-Caused Failures table with 8 entries linking to l1-runbooks/03-profile-not-assigned.md and l1-runbooks/05-oobe-failure.md

### Task 3: ESP Policy Configuration Guide

**`docs/admin-setup-apv1/03-esp-policy.md`** (229 lines) — All 11 ESP settings with per-setting what-breaks callouts. Contains:
- Full portal navigation path (Device onboarding path in newer Intune UI)
- 11 settings documented: Show progress, Timeout (with +40-minute hybrid join buffer), Custom message, Log collection, OOBE-only display, Windows quality updates (with default change table), Block device use, Allow reset, Allow use on error, Required apps scope, Technician phase blocking
- 12 "What breaks if misconfigured" callouts
- Critical default change callout: new profiles default quality updates to Yes (+20–40 minutes, Windows 11 only, not in technician flow)
- Critical TrustedInstaller warning for LOB + Win32 app mixing
- App type tracking reference table (Win32, LOB/MSI, Store, PowerShell scripts, Certificates, Available)
- L2 details block referencing l2-runbooks/02-esp-deep-dive.md (per D-16)
- Configuration-Caused Failures table with 8 entries

## Sequential Navigation Chain

All four files form a working chain:
- `00-overview.md` → Next step: `01-hardware-hash-upload.md`
- `01-hardware-hash-upload.md` → Next step: `02-deployment-profile.md`
- `02-deployment-profile.md` → Next step: `03-esp-policy.md`
- `03-esp-policy.md` → Next step: `04-dynamic-groups.md` (Plan 02)

## Commits

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Overview and hardware hash upload guide | 87e538e | docs/admin-setup-apv1/00-overview.md, 01-hardware-hash-upload.md |
| 2 | Deployment profile configuration guide | 6bd3961 | docs/admin-setup-apv1/02-deployment-profile.md |
| 3 | ESP policy configuration guide | 71efeeb | docs/admin-setup-apv1/03-esp-policy.md |

## Deviations from Plan

None — plan executed exactly as written. All acceptance criteria met:
- 00-overview.md: applies_to: APv1, Consider APv2 callout, APv1 silently wins warning, graph LR diagram, 10 guide links, Next step footer
- 01-hardware-hash-upload.md: flowchart TD decision tree, ANSI encoding, Get-WindowsAutopilotInfo (both options), ZtdDeviceAssignedToAnotherTenant table, 8 what-breaks callouts (exceeds minimum 4), Configuration-Caused Failures table, l1-runbooks/01-device-not-registered links
- 02-deployment-profile.md: applies_to: APv1, 0x80180005 error, oldest created profile wins, 13 what-breaks callouts (exceeds minimum 7), l1-runbooks/03-profile-not-assigned and l1-runbooks/05-oobe-failure links, 8-entry Configuration-Caused Failures table, Next step footer
- 03-esp-policy.md: applies_to: APv1, Install Windows quality updates with default change documented, TrustedInstaller conflict warning, 40-minute hybrid join buffer, 12 what-breaks callouts (exceeds minimum 8), l2-runbooks details block, 8-entry Configuration-Caused Failures table, app type tracking table, Next step footer

## Known Stubs

None — all links to l1-runbooks and l2-runbooks reference files that were confirmed to exist in docs/ before authoring.

## Self-Check: PASSED
