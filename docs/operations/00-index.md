---
last_verified: 2026-05-01
review_by: 2026-06-30
applies_to: all
audience: admin
platform: cross-platform
---

# Operations

This index covers operational depth guides for Intune-managed fleets. Guides are grouped by
operational domain.

## Co-Management

Windows ConfigMgr-to-Intune co-management guidance — workload slider model, migration sequence,
tenant attach disambiguation, and Windows Autopatch prerequisites.

| Guide | Covers |
|-------|--------|
| [Overview: Workload Model](co-management/00-overview.md) | 7 workloads, 3 slider states, Pilot Intune disambiguation |
| [Windows Tenant Attach](co-management/01-windows-tenant-attach.md) | Tenant attach vs full co-management |
| [Workload Slider Migration](co-management/02-windows-workload-sliders.md) | Low-risk-first migration sequence, EP HIGH-RISK callout |
| [Migration Paths and Autopatch](co-management/03-cocmgmt-migration-paths.md) | Windows Autopatch co-management prerequisites |

## Patch & Update Management

Cross-platform OS update enforcement guidance — Windows Update for Business rings, macOS managed update commands (DDM), iOS supervised vs unsupervised update lifecycle, and Android per-OEM patch delivery (Play Integrity tier impact).

| Guide | Covers |
|-------|--------|
| [Overview: Cross-Platform Update Enforcement](patch-management/00-overview.md) | 4-platform comparison hub for update enforcement; cross-platform routing |
| [Windows WUfB Rings](patch-management/01-windows-wufb-rings.md) | Windows Update for Business ring topology, deferral periods, Hotpatch, dual-scan source conflict |
| [macOS Update Enforcement](patch-management/02-macos-update-enforcement.md) | DDM Software Update Enforce Latest; deprecated MDM commands removed with Apple OS 26 |
| [iOS Update Lifecycle](patch-management/03-ios-update-lifecycle.md) | DDM TargetOSVersion / TargetBuildVersion / TargetLocalDateTime; unsupervised iOS 17+ scope |
| [Android Patch Delivery](patch-management/04-android-patch-delivery.md) | Per-OEM patch delivery, Play Integrity MEETS_STRONG_INTEGRITY enforcement cascade, Zebra LifeGuard OTA |

## App Lifecycle Automation

Cross-platform app deployment at scale — Win32/MSIX packaging + supersedence, macOS .pkg/.dmg pipelines, iOS VPP device-vs-user licensing, Android Managed Google Play app lifecycle.

| Guide | Covers |
|-------|--------|
| [Overview: Cross-Platform App Lifecycle](app-lifecycle/00-overview.md) | 4-platform comparison hub for app deployment; cross-platform routing |
| [Windows Win32 / MSIX at Scale](app-lifecycle/01-windows-win32-msix-scale.md) | Win32ContentPrepTool, supersedence chains, dependency graphs, MSIX delivery |
| [macOS PKG/DMG Pipeline](app-lifecycle/02-macos-pkg-dmg-pipeline.md) | Apple Developer ID Installer cert + signing; LOB PKG / unmanaged PKG / DMG / VPP / Mac App Store |
| [iOS VPP Licensing](app-lifecycle/03-ios-vpp-licensing.md) | Device-licensing (silent install on supervised) vs user-licensing (Apple ID required) flows |
| [Android Managed Google Play Lifecycle](app-lifecycle/04-android-mgp-lifecycle.md) | MGP private track, web app publishing, AMAPI custom-apps API, OEMConfig (Zebra side-load) |

## Compliance Drift Detection + Tenant Migration

Cross-platform configuration drift workflows + tenant-to-tenant migration runbooks — BitLocker re-key, ABM token re-issue, Managed Google Play re-binding, cross-platform encryption-drift surface.

| Guide | Covers |
|-------|--------|
| [Overview: Cross-Platform Drift + Migration](drift-migration/00-overview.md) | 4-platform comparison hub for drift detection + tenant migration; cross-platform routing |
| [Windows Drift Detection](drift-migration/01-windows-drift-detection.md) | Intune Remediations (Proactive Remediations); detect+remediate Bash/PowerShell pairs; portal report interpretation |
| [macOS Drift Detection](drift-migration/02-macos-drift-detection.md) | Profile revocation; deployment-report-driven compliance drift detection |
| [iOS / Android Drift Detection](drift-migration/03-ios-android-drift-detection.md) | iOS jailbreak detection / OS downgrade; Android Play Integrity verdict change |
| [Tenant Migration Runbook](drift-migration/04-tenant-migration-runbook.md) | Windows BitLocker re-key + ABM token re-issue + MGP re-binding; cross-platform encryption drift section |

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-01 | Phase 59 (CLEAN-08): added 3 new H2 sections (Patch & Update Management 5 rows / App Lifecycle Automation 5 rows / Compliance Drift Detection + Tenant Migration 5 rows) mirroring Co-Management section template; updated frontmatter `platform: Windows` -> `platform: cross-platform`; discharges DPO-Phase56-01 hand-off chain (D-10) | -- |
