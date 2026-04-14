---
phase: 23-macos-admin-setup
plan: "03"
status: complete
started: 2026-04-14T16:59:00Z
completed: 2026-04-14T17:03:00Z
---

# Plan 23-03 Summary: App Deployment & Capability Matrix

## What Was Built

Created the app deployment guide (MADM-04) and cross-platform capability matrix (MADM-06).

## Key Files

### Created
- `docs/admin-setup-macos/04-app-deployment.md` (164 lines) -- DMG, PKG (managed/unmanaged), VPP with comparison table, per-type prerequisites, dual-portal VPP section, VPP token renewal
- `docs/reference/macos-capability-matrix.md` (101 lines) -- 5-domain comparison (Enrollment, Configuration, App Deployment, Compliance, Software Updates) with key gaps summary

## Acceptance Criteria Met

- [x] App deployment has comparison table with DMG, PKG, VPP columns
- [x] Size limits: 8 GB DMG, 2 GB managed PKG, 8 GB unmanaged PKG
- [x] H2 sections for DMG, PKG (managed/unmanaged), VPP
- [x] Per-type H3 prerequisite sub-sections
- [x] Dual-portal VPP section (In ABM / In Intune)
- [x] VPP Renewal/Maintenance section
- [x] .intunemac wrapping removal note (August 2022)
- [x] Unmanaged PKG Known Issue note
- [x] Capability matrix in docs/reference/ (not admin-setup-macos/)
- [x] 5 domain H2 sections with comparison tables
- [x] "No" for macOS security baselines in Configuration and Compliance
- [x] Key Gaps Summary section
- [x] Cross-reference to windows-vs-macos.md

## Deviations

None.

## Self-Check: PASSED
