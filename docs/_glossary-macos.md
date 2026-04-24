---
last_verified: 2026-04-24
review_by: 2026-07-16
applies_to: both
audience: all
platform: all
---

> **Platform coverage:** This glossary covers Apple-platform provisioning and management terminology for macOS and iOS/iPadOS.
> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md). For Android Enterprise terminology, see the [Android Enterprise Provisioning Glossary](_glossary-android.md).

# Apple Provisioning Glossary

## Alphabetical Index

[ABM](#abm) | [ABM Token](#abm-token) | [Account-Driven User Enrollment](#account-driven-user-enrollment) | [ADE](#ade) | [APNs](#apns) | [Await Configuration](#await-configuration) | [Jailbreak Detection](#jailbreak-detection) | [MAM-WE](#mam-we) | [Setup Assistant](#setup-assistant) | [Supervision](#supervision) | [VPP](#vpp)

---

## Enrollment

### Account-Driven User Enrollment

Apple's privacy-preserving BYOD enrollment method for iOS/iPadOS (iOS 15+) and macOS (Sonoma+). The user starts enrollment from Settings > General > VPN & Device Management on their personal device by signing in with their Managed Apple ID; the OS coordinates with the organization's MDM via the well-known `https://[domain]/.well-known/com.apple.remotemanagement` discovery endpoint. Only the organization's "work" apps and data are managed; the user's personal content (photos, iCloud, personal apps) remains invisible to IT. Supersedes the deprecated profile-based User Enrollment (deprecated iOS 18).

> **Windows equivalent:** No direct equivalent. The closest parallel is [Intune MAM-WE](#mam-we) on Windows MAM-enrolled devices, but Account-Driven User Enrollment is a device-level BYOD enrollment path whereas Windows MAM-WE is app-layer only. Microsoft's "Work profile on personally-owned devices" concept applies to Android but has no iOS-Autopilot equivalent.

### ADE

Automated Device Enrollment -- Apple's zero-touch enrollment mechanism for organization-owned macOS (and iOS/iPadOS) devices through Apple Business Manager. Devices assigned to an MDM server in ABM enroll automatically during Setup Assistant. Formerly known as DEP (Device Enrollment Program).

> **Windows equivalent:** [Windows Autopilot](_glossary.md#apv1) -- APv1 uses hardware hash registration and profile assignment; APv2 uses [Enrollment Time Grouping](_glossary.md#enrollment-time-grouping-etg). Both achieve zero-touch enrollment but use different identity mechanisms (serial number via ABM vs hardware hash upload to Intune).

### Await Configuration

A setting in the macOS ADE enrollment profile (officially "Await final configuration") that locks the device at the end of Setup Assistant until Intune confirms critical configuration policies are installed. The user sees an "Awaiting final configuration" screen. Default for new enrollment profiles since late 2024.

> **Windows equivalent:** [ESP](_glossary.md#esp) (Enrollment Status Page) -- both block the user from accessing the desktop until policies and apps are applied. Key difference: ESP has explicit device-phase and user-phase stages, while Await Configuration is a single hold point at the end of Setup Assistant.

### Setup Assistant

The macOS first-run configuration experience presented after power-on or device wipe. Screens are customizable (show or hide) via the ADE enrollment profile in Intune. Includes Apple-specific screens such as Apple ID, FileVault, Siri, and Privacy.

> **Windows equivalent:** [OOBE](_glossary.md#oobe) (Out-of-Box Experience) -- both are the first-run setup flow on their respective platforms. OOBE has Autopilot-specific branding and Entra credential entry; Setup Assistant has Apple-specific screens and supports both modern (Entra) and legacy authentication.

### Supervision

Apple's formal management designation for organization-owned iOS/iPadOS devices enrolled through [ADE](#ade) via Apple Business Manager. Supervision applies to iOS, iPadOS, and (to a lesser gating extent) macOS. Supervision is set at enrollment time and CANNOT be added retroactively without a full device erase. Supervised iOS/iPadOS devices unlock capabilities unavailable on unsupervised devices -- silent app install ([VPP](#vpp) device-licensed), home screen layout control, extensive restriction profiles, AirDrop/Camera/Safari restrictions, and DDM-enforced app install. Verify on device: Settings > General > About shows "This iPhone is supervised and managed by [organization]."

> **Windows equivalent:** No direct equivalent in Autopilot. The closest parallels are (a) Autopilot pre-provisioning (device enters with administrative context) for the enrollment-time-only supervision concept, and (b) macOS FileVault enforcement via ADE for the "set-at-enrollment, cannot-add-retroactively" lifecycle property. Neither Windows nor macOS gates as many capabilities on supervision state as iOS does.

---

## Device Management

### ABM

Apple Business Manager -- Apple's web portal for managing device enrollment, app distribution (Apps and Books), and Managed Apple IDs for organizations. ABM is the single Apple-side portal for all device management administration. Accessed at [business.apple.com](https://business.apple.com).

> **Windows equivalent:** No direct single equivalent. Device enrollment is managed in the [Intune admin center](https://intune.microsoft.com) under Devices > Windows > Enrollment. ABM is Apple-side while Intune is Microsoft-side; macOS admins work across both portals.

### ABM Token

The server token (.p7m file) downloaded from Apple Business Manager that enables communication between Intune and ABM for device sync and enrollment profile deployment. Also called "enrollment program token" or "ADE token" in Microsoft documentation. Must be renewed annually -- a lapsed token silently stops new device syncing.

> **Windows equivalent:** No equivalent. Windows Autopilot uses Graph API and direct Intune integration without a separate token file. The annual renewal lifecycle of the ABM token is a macOS-unique operational concern.

### APNs

Apple Push Notification service -- Apple's push notification service used by all Apple platforms (iOS, iPadOS, macOS, tvOS) for MDM command delivery. Intune uses APNs to wake devices and deliver configuration profiles, app install commands, and compliance evaluation triggers. The Apple **APNs certificate** (Microsoft also calls it the "MDM Push Certificate") is provisioned per-tenant in Intune admin center at `Devices > Enrollment > Apple > MDM Push Certificate` and must be renewed annually. **Critical cross-platform blast radius:** a single expired or revoked APNs certificate breaks ALL iOS/iPadOS AND macOS MDM communication for the entire tenant until renewed. Must be renewed by the SAME Apple ID that created it -- renewing with a different Apple ID forces re-enrollment of every managed Apple device.

> **Windows equivalent:** No direct equivalent for the certificate lifecycle. Windows Autopilot relies on Windows Notification Service (WNS) and HTTPS polling; there is no per-tenant certificate to renew. The closest parallel is Intune's automatic communication with Windows clients via Entra ID, which does not lapse annually.

### Jailbreak Detection

An iOS/iPadOS-specific compliance check in Intune that evaluates device integrity indicators (e.g., root filesystem writability, presence of jailbreak tool signatures) and marks the device non-compliant if jailbreak is detected. Configured in Intune admin center at `Devices > Compliance policies > [policy] > Device Health > Jailbroken devices`. Not a real-time protection -- evaluation happens at compliance sync intervals. Users are notified via Company Portal if their device is flagged.

> **Windows equivalent:** No direct equivalent (jailbreaking is an iOS/iPadOS concept). The closest parallel in Windows is Attestation-based compliance (TPM attestation proving the device booted into a known good state), which addresses a different threat model (early boot integrity vs OS-level rooting).

---

## App Distribution

### VPP

Volume Purchase Program -- Apple's bulk app licensing mechanism, now branded as "Apps and Books" within Apple Business Manager. Applies to all Apple platforms (iOS, iPadOS, macOS, tvOS). Licenses are purchased in ABM and synced to Intune via a location token. The VPP licensing model has two variants that affect deployment behavior on iOS/iPadOS:

- **Device-licensed** -- License is pinned to the device serial number. Enables silent install on supervised iOS/iPadOS devices (no Apple ID sign-in required on the device). Preferred for corporate-owned supervised (ADE) deployments.
- **User-licensed** -- License is pinned to the user's Managed Apple ID. Requires the user to sign in on the device. Used in 1:1 education and personal-device scenarios.

Silent app installation on iOS/iPadOS requires BOTH (a) VPP device-licensed assignment AND (b) device supervision via ADE. On unsupervised iOS devices, even VPP apps prompt the user for confirmation. On macOS, VPP installs silently regardless of supervision state (macOS does not enforce the supervised-only silent-install gate).

Cross-links: [iOS App Deployment Guide](admin-setup-ios/05-app-deployment.md) | [macOS App Deployment Guide](admin-setup-macos/04-app-deployment.md)

> **Windows equivalent:** Microsoft Store for Business (deprecated) and Intune app deployment. Windows uses Win32 app packaging (.intunewin), MSI, MSIX, and Microsoft Store apps. The VPP/Apps and Books licensing model has no direct Windows equivalent -- Intune's per-user vs per-device assignment in Windows app deployments is the closest conceptual parallel but uses Microsoft licensing infrastructure, not Apple's.

---

## App Protection (MAM)

### MAM-WE

Managed App Without Enrollment -- Intune's **app-layer** data protection model for iOS/iPadOS where the Intune Company Portal (or line-of-business equivalent) enforces app protection policies on specific Microsoft 365 and third-party apps WITHOUT enrolling the device in Intune MDM. The device is NOT supervised, NOT registered in Intune Devices blade, and NOT visible to IT as a managed device -- Intune only sees the protected apps. Provides capabilities like app-level PIN, per-app encryption at rest, copy/paste restrictions between managed and personal apps, and **selective wipe** (removes managed app data only, preserves personal data and the device). Primary use case: BYOD scenarios where the user does not want to enroll their personal device but the organization must protect data accessed through work apps.

**Scope boundary (per Phase 26):** MAM-WE is separate from MDM enrollment paths (ADE, Device Enrollment, User Enrollment). A device can have MAM-WE + MDM enrollment simultaneously, but MAM-WE alone grants NO device-level control. See [MAM-WE App Protection Policies](admin-setup-ios/09-mam-app-protection.md) for configuration and the three-level data protection framework.

> **Windows equivalent:** Intune App Protection Policies on Windows MAM-enrolled devices -- functionally analogous (per-app PIN, selective wipe, copy/paste gates) but uses different underlying mechanisms (Windows Information Protection lineage vs iOS's App Extensions SDK). Microsoft does not use the "MAM-WE" branding on Windows.

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-24 | Phase 42: added Android Enterprise Provisioning Glossary see-also to continuation banner (AEAUDIT-03) | -- |
| 2026-04-17 | Phase 32: added iOS/iPadOS terms (supervision, MAM-WE, APNs, account-driven user enrollment, jailbreak detection), updated VPP with iOS device-licensed vs user-licensed distinction, new ## App Protection (MAM) H2 | -- |
| 2026-04-13 | Initial version -- 6 macOS terms with Windows cross-references | -- |
