---
last_verified: 2026-06-20
review_by: 2026-09-20
applies_to: both
audience: all
platform: all
---

> **Platform coverage:** This glossary covers Apple-platform provisioning and management terminology for macOS and iOS/iPadOS.
> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md). For Android Enterprise terminology, see the [Android Enterprise Provisioning Glossary](_glossary-android.md). For Linux terminology, see [Linux Provisioning Glossary](_glossary-linux.md).
> **Apple Business governance:** For Apple Business delegated permission terminology (Organizational Units, custom roles, Managed Apple Account, content tokens), see the [Apple Business Governance Glossary](_glossary-apple-business.md).

# Apple Provisioning Glossary

## Alphabetical Index

[ABM](#abm) | [ABM Token](#abm-token) | [Account-Driven User Enrollment](#account-driven-user-enrollment) | [ADE](#ade) | [APNs](#apns) | [Await Configuration](#await-configuration) | [Enterprise SSO Plug-in](#enterprise-sso-plug-in) | [Jailbreak Detection](#jailbreak-detection) | [MAM-WE](#mam-we) | [Platform SSO](#platform-sso) | [Secure Enclave](#secure-enclave) | [Setup Assistant](#setup-assistant) | [Supervision](#supervision) | [VPP](#vpp)

---

## Enrollment

### Account-Driven User Enrollment

Apple's privacy-preserving BYOD enrollment method for iOS/iPadOS (iOS 15+) and macOS (Sonoma+). The user starts enrollment from Settings > General > VPN & Device Management on their personal device by signing in with their Managed Apple ID; the OS coordinates with the organization's MDM via the well-known `https://[domain]/.well-known/com.apple.remotemanagement` discovery endpoint. Only the organization's "work" apps and data are managed; the user's personal content (photos, iCloud, personal apps) remains invisible to IT. Supersedes the deprecated profile-based User Enrollment (deprecated iOS 18).

> **Windows equivalent:** No direct equivalent. The closest parallel is [Intune MAM-WE](#mam-we) on Windows MAM-enrolled devices, but Account-Driven User Enrollment is a device-level BYOD enrollment path whereas Windows MAM-WE is app-layer only. Microsoft's "Work profile on personally-owned devices" concept applies to Android but has no iOS-Autopilot equivalent.
> See also: [BYOD](_glossary-android.md#byod) (Android); [User Enrollment](_glossary-android.md#user-enrollment) (Android).

### ADE

Automated Device Enrollment -- Apple's zero-touch enrollment mechanism for organization-owned macOS (and iOS/iPadOS) devices through Apple Business Manager. Devices assigned to an MDM server in ABM enroll automatically during Setup Assistant. Formerly known as DEP (Device Enrollment Program).

> **Windows equivalent:** [Windows Autopilot](_glossary.md#apv1) -- APv1 uses hardware hash registration and profile assignment; APv2 uses [Enrollment Time Grouping](_glossary.md#enrollment-time-grouping-etg). Both achieve zero-touch enrollment but use different identity mechanisms (serial number via ABM vs hardware hash upload to Intune).
> See also: [Zero-Touch Enrollment](_glossary-android.md#zero-touch-enrollment) (Android).

### Await Configuration

A setting in the macOS ADE enrollment profile (officially "Await final configuration") that locks the device at the end of Setup Assistant until Intune confirms critical configuration policies are installed. The user sees an "Awaiting final configuration" screen. Default for new enrollment profiles since late 2024.

> **Windows equivalent:** [ESP](_glossary.md#esp) (Enrollment Status Page) -- both block the user from accessing the desktop until policies and apps are applied. Key difference: ESP has explicit device-phase and user-phase stages, while Await Configuration is a single hold point at the end of Setup Assistant.
> See also: [ESP](_glossary.md#esp) (Windows).

### Setup Assistant

The macOS first-run configuration experience presented after power-on or device wipe. Screens are customizable (show or hide) via the ADE enrollment profile in Intune. Includes Apple-specific screens such as Apple ID, FileVault, Siri, and Privacy.

> **Windows equivalent:** [OOBE](_glossary.md#oobe) (Out-of-Box Experience) -- both are the first-run setup flow on their respective platforms. OOBE has Autopilot-specific branding and Entra credential entry; Setup Assistant has Apple-specific screens and supports both modern (Entra) and legacy authentication.
> See also: [OOBE](_glossary.md#oobe) (Windows).

### Supervision

Apple's formal management designation for organization-owned iOS/iPadOS devices enrolled through [ADE](#ade) via Apple Business Manager. Supervision applies to iOS, iPadOS, and (to a lesser gating extent) macOS. Supervision is set at enrollment time and CANNOT be added retroactively without a full device erase. Supervised iOS/iPadOS devices unlock capabilities unavailable on unsupervised devices -- silent app install ([VPP](#vpp) device-licensed), home screen layout control, extensive restriction profiles, AirDrop/Camera/Safari restrictions, and DDM-enforced app install. Verify on device: Settings > General > About shows "This iPhone is supervised and managed by [organization]."

> **Windows equivalent:** No direct equivalent in Autopilot. The closest parallels are (a) Autopilot pre-provisioning (device enters with administrative context) for the enrollment-time-only supervision concept, and (b) macOS FileVault enforcement via ADE for the "set-at-enrollment, cannot-add-retroactively" lifecycle property. Neither Windows nor macOS gates as many capabilities on supervision state as iOS does.
> See also: [Supervision](_glossary-android.md#supervision) (Android); [Supervision](_glossary-linux.md#supervision) (Linux).

---

## Device Management

### ABM

Apple Business Manager -- Apple's web portal for managing device enrollment, app distribution (Apps and Books), and Managed Apple IDs for organizations. ABM is the single Apple-side portal for all device management administration. Accessed at [business.apple.com](https://business.apple.com).

> **Windows equivalent:** No direct single equivalent. Device enrollment is managed in the [Intune admin center](https://intune.microsoft.com) under Devices > Windows > Enrollment. ABM is Apple-side while Intune is Microsoft-side; macOS admins work across both portals.
> See also: [ABM (Apple Business Manager)](_glossary-linux.md#abm-apple-business-manager) (Linux).
> See also: [Apple Business](_glossary-apple-business.md#apple-business) (renamed 2026-04-14; ABM Token → content token rebrand mapping).

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
> See also: [VPP (Volume Purchase Program)](_glossary-linux.md#vpp-volume-purchase-program) (Linux).

---

## App Protection (MAM)

### MAM-WE

Managed App Without Enrollment -- Intune's **app-layer** data protection model for iOS/iPadOS where the Intune Company Portal (or line-of-business equivalent) enforces app protection policies on specific Microsoft 365 and third-party apps WITHOUT enrolling the device in Intune MDM. The device is NOT supervised, NOT registered in Intune Devices blade, and NOT visible to IT as a managed device -- Intune only sees the protected apps. Provides capabilities like app-level PIN, per-app encryption at rest, copy/paste restrictions between managed and personal apps, and **selective wipe** (removes managed app data only, preserves personal data and the device). Primary use case: BYOD scenarios where the user does not want to enroll their personal device but the organization must protect data accessed through work apps.

**Scope boundary (per Phase 26):** MAM-WE is separate from MDM enrollment paths (ADE, Device Enrollment, User Enrollment). A device can have MAM-WE + MDM enrollment simultaneously, but MAM-WE alone grants NO device-level control. See [MAM-WE App Protection Policies](admin-setup-ios/09-mam-app-protection.md) for configuration and the three-level data protection framework.

> **Windows equivalent:** Intune App Protection Policies on Windows MAM-enrolled devices -- functionally analogous (per-app PIN, selective wipe, copy/paste gates) but uses different underlying mechanisms (Windows Information Protection lineage vs iOS's App Extensions SDK). Microsoft does not use the "MAM-WE" branding on Windows.
> See also: [Web-app CA](_glossary-linux.md#web-app-ca) (Linux).

---

## Authentication

### Platform SSO

Platform SSO (PSSO) is a macOS-native feature (available macOS 13+; macOS 14 recommended) powered by the Microsoft Enterprise SSO plug-in that enables users to sign in to their Mac using their Microsoft Entra ID credentials and provides single sign-on across apps and browsers that use Entra ID for authentication. It registers the Mac with Entra ID, delivering a hardware-bound Primary Refresh Token (PRT) used for device-wide SSO. Platform SSO offers three mutually exclusive authentication methods configured in the Settings Catalog: Secure Enclave key/Platform Credential (recommended — local macOS password unchanged), Password sync (Entra ID password replaces and stays synced with local password), and Smart Card (requires macOS 14+; local password unchanged). Assigning the Platform SSO policy to user groups — not device groups — is required for devices with user affinity.

> **Windows equivalent:** On Windows, Entra-joined devices receive a Primary Refresh Token brokered by Windows Hello for Business or the Web Account Manager, which silently provides SSO across apps, Edge, and browsers. Platform SSO on macOS is conceptually analogous: hardware-bound credentials, phishing-resistant authentication, and device-wide SSO — both establish a PRT tied to device identity for continuous access.
> See also: [Enterprise SSO Plug-in](#enterprise-sso-plug-in); [Entra ID SSO](_glossary.md#entra-id-sso).

### Secure Enclave

The Secure Enclave is a dedicated secure subsystem integrated into Apple's SoC, physically isolated from the main processor, that stores and manages cryptographic keys such that software — including the OS kernel — cannot extract the private key material. Keys are generated and used within the Secure Enclave; they never leave in plain-text form (Apple's own phrasing: "Not having a mechanism to transfer plain-text key data into or out of the Secure Enclave is fundamental to its security"). Hardware scope: all Apple Silicon Macs (M1 and later, 2020+) and Intel Macs with the Apple T2 Security Chip (MacBook Pro/Air 2018–2020, Mac mini 2018, iMac 2020, Mac Pro 2019); pre-2018 Intel Macs without T2 cannot use the Secure Enclave Platform Credential auth method. From August 2025, new Entra device registrations store the Workplace Join (WPJ) key in the Secure Enclave by default — use `app-sso platform -s` to verify registration rather than `security find-certificate`, which returns false negatives for Secure Enclave-stored keys.

> See also: [TPM](_glossary.md#tpm) (analogous hardware root of trust; not bit-for-bit equivalent — Secure Enclave performs no TPM-2.0/DICE attestation).

### Enterprise SSO Plug-in

The Microsoft Enterprise SSO plug-in for Apple devices is the umbrella product — an Apple enterprise SSO extension delivered on macOS (and iOS/iPadOS) via the Intune Company Portal app — that provides Entra ID single sign-on across apps and browsers. It contains two sub-features: Platform SSO (the modern mode, configured via Settings Catalog, macOS 13+, recommended macOS 14+) and the SSO app extension (the legacy mode, configured via Intune Device Features template). The plug-in uses the Redirect type in Apple's extensible SSO framework; the Kerberos SSO extension (for on-premises AD Kerberos) is a separate, coexisting Apple-native extension. Running both the legacy SSO app extension profile and a Platform SSO Settings Catalog policy simultaneously causes Error 10002; migration sequence is to assign Platform SSO to a pilot group, validate, then remove the legacy profile.

> See also: [Platform SSO](#platform-sso); [Entra ID SSO](_glossary.md#entra-id-sso).

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-20 | Phase 75: added `## Authentication` section (Platform SSO, Secure Enclave, Enterprise SSO Plug-in); added three new terms to `## Alphabetical Index`; updated `last_verified` and `review_by` front matter | -- |
| 2026-05-26 | Phase 67 (SWEEP-02): coordinating row for VPP location token → content token surgical rename in admin-setup-ios/05- + admin-setup-macos/04-app-deployment.md (PITFALLS.md CI-2 closure) | -- |
| 2026-05-05 | Phase 59 (CLEAN-08): appended `> See also:` lines INSIDE existing `> **Windows equivalent:**` blockquotes for collision-matrix terms (Account-Driven User Enrollment, ADE, Await Configuration, Setup Assistant, Supervision, ABM, VPP, MAM-WE); existing `> **Windows equivalent:**` labels PRESERVED verbatim per D-15 anti-rename | -- |
| 2026-04-24 | Phase 42: added Android Enterprise Provisioning Glossary see-also to continuation banner (AEAUDIT-03) | -- |
| 2026-04-17 | Phase 32: added iOS/iPadOS terms (supervision, MAM-WE, APNs, account-driven user enrollment, jailbreak detection), updated VPP with iOS device-licensed vs user-licensed distinction, new ## App Protection (MAM) H2 | -- |
| 2026-04-13 | Initial version -- 6 macOS terms with Windows cross-references | -- |
