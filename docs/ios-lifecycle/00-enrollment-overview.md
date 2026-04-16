---
last_verified: 2026-04-16
review_by: 2026-07-15
applies_to: all
audience: all
platform: iOS
---

> **Version gate:** This guide covers iOS/iPadOS enrollment paths in Microsoft Intune. For macOS ADE, see [macOS ADE Lifecycle](../macos-lifecycle/00-ade-lifecycle.md). For Windows Autopilot, see [Autopilot Lifecycle Overview](../lifecycle/00-overview.md). For terminology, see the [Apple Provisioning Glossary](../_glossary-macos.md).

# iOS/iPadOS Enrollment Path Overview

## How to Use This Guide

This guide describes all four iOS/iPadOS enrollment paths and establishes the supervision axis that governs what each path can manage.

- **L1 Service Desk:** Use the [Enrollment Path Comparison](#enrollment-path-comparison) table to identify the enrollment type, then read the per-path section for use case confirmation.
- **L2 Desktop Engineering:** Use the [Supervision](#supervision) section for the enrollment-time constraint and its consequences.
- **Intune Admins:** Use the per-path sections for selection guidance and links to admin setup guides.

## The Four iOS/iPadOS Enrollment Paths

iOS/iPadOS supports four distinct enrollment approaches, each with fundamentally different management scopes, ownership models, and supervision states. Selecting the wrong enrollment path at deployment time can result in over-collection of personal data or under-management of corporate assets.

The choice of enrollment path determines supervision state, which is permanent once set. Supervised mode grants the MDM server expanded control capabilities unavailable on unsupervised devices — OS update enforcement, silent app installation, and supervised-only restrictions. Supervision cannot be layered onto an existing enrollment.

Three of the four paths involve MDM enrollment, installing a device management profile that gives Intune device-level control. The fourth path, MAM Without Enrollment (MAM-WE), operates at the application layer only — no device enrollment, no MDM profile installed.

## Enrollment Path Comparison

| Enrollment Path | Ownership Model | Supervision State | Management Scope | Appropriate Use Case |
|-----------------|-----------------|-------------------|------------------|---------------------|
| Automated Device Enrollment (ADE) | Corporate-owned | Supervised | Full device (all MDM capabilities including supervised-only restrictions, remote wipe, OS update enforcement, silent app install) | Corporate fleet; zero-touch deployment via ABM; new or wiped devices only |
| Device Enrollment | Personal or corporate | Unsupervised | Device (MDM-managed policies, certificates, Wi-Fi, VPN, compliance -- no supervised-only capabilities) | BYOD or legacy corporate devices not eligible for ADE; no ABM required |
| User Enrollment (account-driven) | Personal (BYOD) | Unsupervised | App-layer + limited device (separate managed APFS volume; per-app VPN, Wi-Fi; no UDID, serial, or IMEI collection) | Privacy-preserving BYOD; iOS 15+ required |
| MAM Without Enrollment (MAM-WE) | Any | N/A (no enrollment) | App-layer only (policy controls within SDK-integrated apps; no MDM profile installed) | Unmanaged personal devices needing M365 app access; contractor/partner devices |

## Supervision

**What supervision is:** [Supervision](../_glossary-macos.md#supervision) is a management state set at enrollment time. Supervised devices give the MDM server expanded capabilities unavailable on unsupervised devices: blocking native app removal, enforcing OS updates, silently installing apps, and applying supervised-only configuration policies. Unsupervised devices receive standard MDM management only (policies, certificates, Wi-Fi, VPN, compliance) and cannot be governed by supervised-only settings.

**When supervision is set:** Supervision is set at enrollment time, exclusively through [Automated Device Enrollment (ADE)](../_glossary-macos.md#ade). For iOS/iPadOS 13.0 and later, devices enrolled via ADE are automatically supervised. Supervision cannot be added to a device that was enrolled without it — a device enrolled through Device Enrollment or User Enrollment is unsupervised for the lifetime of that enrollment.

**Changing supervision requires a full device erase:** Changing a device from unsupervised to supervised requires a full device erase and re-enrollment via ADE. A full device erase removes ALL data on the device, including personal data, installed apps, accounts, and settings. This is not a selective wipe — it restores the device to factory state.

To verify supervision state: **Settings > General > About** shows "This iPhone is supervised and managed by [organization name]" on supervised devices.

Subsequent admin setup guides mark supervised-only settings with the supervised-only callout pattern.

## Enrollment Path Details

### Automated Device Enrollment (ADE)

[ADE](../_glossary-macos.md#ade) is the zero-touch corporate enrollment path for iOS/iPadOS. Devices assigned to an MDM server in Apple Business Manager ([ABM](../_glossary-macos.md#abm)) enroll automatically during Setup Assistant — no user interaction required. All ADE-enrolled iOS/iPadOS devices are **supervised** (see [Supervision](#supervision)), enabling the full range of Intune MDM capabilities including OS update enforcement, silent app installation, and supervised-only restrictions.

ADE requires corporate device ownership and prior ABM assignment. It is appropriate for new or wiped devices only — existing devices cannot be re-enrolled via ADE without a full device erase. See [iOS/iPadOS ADE Lifecycle](01-ade-lifecycle.md) for the complete end-to-end pipeline.

### Device Enrollment

Device Enrollment uses Company Portal or web-based enrollment to install an MDM profile. Enrollment is user-initiated and does not require ABM. Enrolled devices are **unsupervised** (see [Supervision](#supervision)), limiting management to standard MDM capabilities: policies, certificates, Wi-Fi, VPN, and compliance evaluation. Supervised-only restrictions and silent app installation are not available.

Device Enrollment is appropriate for BYOD or corporate devices not eligible for ADE. Personal devices enrolled through this path are subject to full device-level management — admins should evaluate whether User Enrollment provides a better privacy boundary.

### User Enrollment

Account-driven User Enrollment is the privacy-preserving BYOD path for iOS 15 and later. The user enrolls by adding a work account via **Settings > VPN & Device Management**, creating a separate managed APFS volume that isolates managed apps and data from personal content. Enrolled devices are **unsupervised** (see [Supervision](#supervision)).

Intune does not collect UDID, serial number, or IMEI. Management is limited to apps, per-app VPN, Wi-Fi, and compliance within the managed volume. Profile-based user enrollment via Company Portal is deprecated as of iOS 18 and is no longer available for newly enrolled devices — account-driven User Enrollment is the current standard.

---

### MAM Without Enrollment (MAM-WE)

MAM-WE applies app protection policies to Microsoft 365 apps using the Intune App SDK — no MDM profile is installed and the device is not enrolled in Intune. Policy controls apply only within SDK-integrated apps (Outlook, Teams, Microsoft Edge, and others). IT has no device-level management: no inventory, no compliance evaluation, no device wipe.

MAM-WE provides selective wipe capability: managed app data and corporate accounts are removed without affecting personal data or other apps. MAM-WE is appropriate for unmanaged personal devices needing M365 app access, contractor or partner devices, or devices already managed by another MDM.

> **Not an MDM enrollment path:** MAM-WE applies app protection policies at the application layer without installing an MDM management profile. The device is not enrolled in Intune. IT has no device-level management capabilities -- only data protection within managed apps.

## See Also

- [iOS/iPadOS ADE Lifecycle](01-ade-lifecycle.md) -- for ADE end-to-end stages from ABM assignment through post-enrollment management
- [macOS ADE Lifecycle](../macos-lifecycle/00-ade-lifecycle.md) -- for cross-platform comparison of the ADE pipeline
- [Apple Provisioning Glossary](../_glossary-macos.md) -- for terminology including [ADE](../_glossary-macos.md#ade), [ABM](../_glossary-macos.md#abm), and [VPP](../_glossary-macos.md#vpp)
