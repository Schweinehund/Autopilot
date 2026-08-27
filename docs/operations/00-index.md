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
| [Linux Update Delivery](patch-management/05-linux-update-delivery.md) | Ubuntu apt and unattended-upgrades via a Bash platform script, reboot handling, Ubuntu Pro Livepatch, compliance signal |
| [Windows Driver and Firmware Updates](patch-management/06-windows-driver-firmware-updates.md) | Driver update policy approval modes and workflow, deferral and deadline behavior, OEM catalog firmware delivery |
| [Windows Autopatch](patch-management/07-windows-autopatch.md) | Autopatch service prerequisites, Autopatch groups and the Test and Last deployment rings, update workloads and service objectives |
| [Windows Application Updates](patch-management/08-windows-app-updates.md) | Microsoft 365 Apps update channels, Enterprise App Management catalog, Store apps and the WinGet control surface |

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

## Apple Business Governance

Apple Business delegated governance — sub-org admin onboarding, Shared iPad passcode reset, MDM server assignment, Managed Apple Account provisioning, VPP catalog management, and cross-org boundary operations.

| Guide | Covers |
|-------|--------|
| [Overview: Apple Business Governance](../cross-platform/apple-business/00-overview.md) | Governance model overview; tree root linking all 18 admin-context docs |
| [Role & Permission Model](../cross-platform/apple-business/01-role-permission-model.md) | 7-subgroup permission catalog; OP-1/OP-2/OP-3 safety rules; Edit-without-View table |
| [OUs Architecture](../cross-platform/apple-business/02-ous-architecture.md) | OU primitive; flat-by-default; OU-scoped resource coverage |
| [L1 Runbooks](../l1-runbooks/00-index.md#apple-business-l1-runbooks) | L1 #34 — Shared iPad passcode reset (Path A) |
| [L2 Runbooks](../l2-runbooks/00-index.md#apple-business-l2-runbooks) | L2 #26 — Permission denied investigation (7-leaf triage) |

## Firmware and BIOS Governance

Windows firmware and BIOS configuration governance — custody of the BIOS secret across Dell, HP
and Lenovo hardware, the two native Intune BIOS surfaces, per-OEM delivery and recovery paths, and
the cross-vendor capability comparison.

| Guide | Covers |
|-------|--------|
| [Overview: Firmware and BIOS Governance](firmware-bios/00-overview.md) | Routing by who holds the BIOS secret; the two native Intune BIOS surfaces and why they are disjoint |
| [Windows DFCI](firmware-bios/01-windows-dfci.md) | DFCI prerequisites and disqualifiers, OEM and Surface eligibility, settings surface, retire / reuse / recover sequences |
| [Dell BIOS Configuration](firmware-bios/02-dell-bios-configuration.md) | DCECMI per-device agent plus the native BIOS configuration Templates policy; Intune stores the BIOS password |
| [HP BIOS Configuration](firmware-bios/03-hp-bios-configuration.md) | HP Connect connector publishing Sure Admin and BIOS password policies as Remediations; vendor-held secret |
| [Lenovo BIOS Configuration](firmware-bios/04-lenovo-bios-configuration.md) | Think BIOS Config Tool V2 and BIOS Certificate Tool V2; customer-held key material, no vendor connector |
| [Firmware OEM Capability Matrix](../reference/firmware-oem-matrix.md) | Cross-vendor comparison of delivery, authentication, scope, prerequisites, offboarding and recovery |

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-08-27 | Phase 152 plan 152-03: appended Firmware and BIOS Governance H2 (6 rows; 6th Operations sub-section) and appended 4 rows to the Patch & Update Management table for Linux update delivery, Windows driver and firmware updates, Windows Autopatch and Windows application updates (INT-04) | -- |
| 2026-05-22 | Phase 65 plan 65-03: appended Apple Business Governance H2 (ABNAV-06; 5th Operations sub-section) | -- |
| 2026-05-01 | Phase 59 (CLEAN-08): added 3 new H2 sections (Patch & Update Management 5 rows / App Lifecycle Automation 5 rows / Compliance Drift Detection + Tenant Migration 5 rows) mirroring Co-Management section template; updated frontmatter `platform: Windows` -> `platform: cross-platform`; discharges DPO-Phase56-01 hand-off chain (D-10) | -- |
