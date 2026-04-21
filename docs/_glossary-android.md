---
last_verified: 2026-04-21
review_by: 2026-06-20
applies_to: both
audience: all
platform: all
---

# Android Enterprise Provisioning Glossary

> **Platform coverage:** This glossary covers Android Enterprise provisioning and management terminology for Intune-managed Android devices. For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md). For Apple-platform terminology (macOS, iOS/iPadOS), see the [Apple Provisioning Glossary](_glossary-macos.md).

## Alphabetical Index

[afw#setup](#afw-setup) | [AMAPI](#amapi) | [BYOD](#byod) | [COBO](#cobo) | [COPE](#cope) | [Corporate Identifiers](#corporate-identifiers) | [Dedicated](#dedicated) | [DPC](#dpc) | [EMM](#emm) | [Entra Shared Device Mode](#entra-shared-device-mode) | [Fully Managed](#fully-managed) | [Managed Google Play](#managed-google-play) | [Managed Home Screen](#managed-home-screen) | [Play Integrity](#play-integrity) | [Supervision](#supervision) | [User Enrollment](#user-enrollment) | [Work Profile](#work-profile) | [WPCO](#wpco) | [Zero-Touch Enrollment](#zero-touch-enrollment)

---

## Enrollment

### BYOD

Bring-Your-Own-Device refers to Android Enterprise's personally-owned work profile enrollment path. The user installs Company Portal (or starts enrollment through the Microsoft Intune app post-AMAPI), which provisions a work profile container on their personal device. The user retains full ownership of the personal profile; the organization manages only the work profile. BYOD enrollment is user-initiated from the device and does not use corporate provisioning methods such as NFC, QR bulk provisioning, or Zero-Touch.

> **Cross-platform note:** On Windows, "BYOD" typically refers to Mobile Application Management Without Enrollment (MAM-WE) or light device enrollment — see the [Windows Autopilot Glossary](_glossary.md). On iOS, BYOD maps to [Account-Driven User Enrollment or profile-based User Enrollment](_glossary-macos.md#account-driven-user-enrollment) — completely different provisioning mechanics (no work profile container). macOS has limited BYOD support through User Enrollment only. Do not conflate.

### User Enrollment

User Enrollment in the Android context refers to AOSP user-associated enrollment, where a Microsoft Entra user identity is tied to the device at enrollment time. It is an AOSP-specific concept used on non-GMS hardware (for example, purpose-built rugged or head-mounted devices) and does NOT describe Android Enterprise BYOD. Android Enterprise BYOD uses the [Work Profile](#work-profile) model on personally-owned devices; AOSP user-associated enrollment is a different Phase 39 stub scope.

> **Cross-platform note:** On iOS, "User Enrollment" refers to Apple's privacy-preserving BYOD enrollment method (profile-based or account-driven). See [Account-Driven User Enrollment](_glossary-macos.md#account-driven-user-enrollment) in the Apple glossary. The iOS concept is a device-level managed APFS volume with user-bound Managed Apple ID — structurally unrelated to Android AOSP user-associated enrollment. Do not conflate.

### Zero-Touch Enrollment

Zero-Touch Enrollment (ZTE) is Google's corporate-scale Android provisioning channel. OEM resellers upload device IMEI, serial number, or MEID lists to the [Zero-Touch portal](https://enterprise.google.com/android/zero-touch/customers); devices then enroll automatically on first boot without admin intervention. The reseller relationship is Step 0 — a device cannot appear in the ZT portal unless a ZT-enabled reseller provisions it. ZTE supports Fully Managed (COBO), WPCO, and Dedicated modes, but not personally-owned BYOD Work Profile.

> **Cross-platform note:** On iOS/iPadOS and macOS, the analog is Automated Device Enrollment (ADE) through Apple Business Manager — see [ADE](_glossary-macos.md#ade). On Windows, the analog is Windows Autopilot — see the [Windows Autopilot Glossary](_glossary.md). All three share the "reseller-registers-serial-numbers-upstream, device-enrolls-automatically-on-first-boot" shape but use different portals and identity plumbing. Do not conflate ZT portal entries with ABM device assignments or Autopilot hardware hash uploads.

## Ownership & Management Scope

### COBO

Corporate-Owned, Business-Only (COBO) is Android Enterprise's fully managed mode for corporate-owned devices with no personal profile present. The entire device is managed — all apps, data, configuration, and user experience are IT-controlled. COBO offers maximum admin control: silent app install, device-wide restrictions, full compliance telemetry, and enforcement of OS updates. Admins often refer to COBO and [Fully Managed](#fully-managed) interchangeably; COBO is the ownership category, Fully Managed is the Android Enterprise enrollment mode name.

> **Cross-platform note:** No exact Windows/macOS/iOS term; the closest analog is iOS ADE-supervised corporate-owned enrollment through [ABM](_glossary-macos.md#abm) (see [iOS Supervision](_glossary-macos.md#supervision)) or macOS ADE-enrolled supervised. On Windows, Autopilot corporate-owned deployment is the closest analog. Mapping is partial — "corporate-owned" has a cross-platform meaning but the per-platform management scopes differ. Do not conflate COBO with iOS supervision state; supervision is a permanent per-device gating state on iOS, whereas COBO is an ownership-mode designation on Android.

### COPE

Corporate-Owned, Personally-Enabled (COPE) is an older Android Enterprise mode that combines a fully managed corporate device with a separately provisioned work profile for the user's personal use. Google recommends [WPCO](#wpco) as the successor pattern for the same use case, so new deployments should provision WPCO rather than COPE. COPE is still functionally supported on existing fleets — no formal deprecation notice from Google — but WPCO is the preferred terminology and the path documented in current Google Android Enterprise guidance.

> **Cross-platform note:** No equivalent on Windows, macOS, or iOS. The "corporate device with personal-use partition" model does not exist as a first-class enrollment mode on those platforms. See the [WPCO entry](#wpco) for the current Google-recommended naming.

### Dedicated

Dedicated mode (also called COSU — Corporate-Owned Single-Use) is Android Enterprise's kiosk enrollment path. The device operates in a locked, single-purpose state running one or more pre-selected apps through [Managed Home Screen](#managed-home-screen) or an OEM launcher. Typical use cases include shift-worker tablets, retail point-of-sale terminals, logistics handhelds, and signage. Dedicated devices have no personal profile and no user-owned data; admins configure an exit-PIN for service-mode access.

> **Cross-platform note:** On Windows, the analog is Assigned Access (kiosk mode) / Shared Device mode — see the [Windows Autopilot Glossary](_glossary.md). On iOS/iPadOS, the analogs are Shared iPad and Single App Mode / Guided Access. All three share the "locked kiosk" intent, but the Android Dedicated implementation uses Managed Home Screen as the launcher layer, whereas Windows uses a shell replacement and iOS uses App Lock / Autonomous Single App Mode. Do not conflate the exit-PIN requirement — it is Android-specific (see Phase 38 for the MHS exit-PIN sync requirement).

### Fully Managed

Fully Managed is Android Enterprise's highest-control enrollment mode. The entire device is managed with no personal profile, all apps and data are corporate, and admins have full control over restrictions, configuration, certificates, Wi-Fi, VPN, and OS update timing. Fully Managed is the Android Enterprise enrollment-mode name for the ownership category commonly abbreviated [COBO](#cobo). Provisioning uses QR, NFC (Android 8+), DPC identifier [afw#setup](#afw-setup), or [Zero-Touch Enrollment](#zero-touch-enrollment).

> **Cross-platform note:** The closest iOS analog is [Supervision](_glossary-macos.md#supervision) state on ADE-enrolled devices, but the mapping is partial — iOS supervision is a permanent per-device state that gates roughly 60 restriction settings on top of a normal MDM enrollment, whereas Android Fully Managed is an ownership-mode designation set at provisioning time. See [_glossary-macos.md#supervision](_glossary-macos.md#supervision). On Windows, the closest analog is Autopilot corporate deployment with a restrictive device configuration profile — no separate "supervised" state layer. Do not conflate.

### Supervision

> **Android note:** "Supervision" is an iOS/iPadOS management-state concept (see [Apple Glossary — Supervision](_glossary-macos.md#supervision)). Android does not use this term. The closest analog is [Fully Managed](#fully-managed), which is an ownership-mode designation set at provisioning, not a permanent device state gating restriction settings. Do not conflate.

### Work Profile

Android Enterprise's containerized partition on a user's device. The work profile creates a separate OS-level container that holds managed apps, data, and policies, isolated from the personal profile. Work profile apps appear on the launcher with a badged briefcase icon. Applies to both BYOD Work Profile (personally-owned device) and Work Profile on Corporate-Owned devices ([WPCO](#wpco), formerly [COPE](#cope)). Data does not cross the profile boundary by default; the user can pause the work profile (Android 7+) to suspend notifications and managed apps.

> **Cross-platform note:** On Windows, the phrase "Work profile on personally-owned devices" applies only to Android — there is no on-Windows work-profile equivalent; closest parallels are MAM-WE app protection (app-layer only) or a separate Entra-joined work device. On iOS, there is no work-profile equivalent; the closest parallel is [Account-Driven User Enrollment](_glossary-macos.md#account-driven-user-enrollment), which uses a managed APFS volume rather than a profile container. macOS has no equivalent concept. Do not conflate with iOS User Enrollment.

### WPCO

Work Profile on Corporate-Owned devices (WPCO) is Android Enterprise's newer mode combining a fully managed device with a user-separated work profile. Google recommends WPCO as the successor pattern to [COPE](#cope) — same "corporate device with personal-use partition" shape, cleaner profile boundary and better user-privacy controls. WPCO provisioning is QR, Zero-Touch, or DPC identifier [afw#setup](#afw-setup); the NFC path was removed on Android 11+.

> **Cross-platform note:** No Windows, macOS, or iOS equivalent — the "corporate device with user-separated personal partition" model is Android-specific. See also the [COPE entry](#cope) for the older terminology drift context.

## Provisioning Methods

<a id="afw-setup"></a>
### afw#setup

Android for Work Setup identifier — a literal string entered in place of a Google account during device setup to trigger the Android Enterprise DPC download for Fully Managed and Dedicated mode provisioning. It is a historical but still-functional signaling mechanism: typing `afw#setup` at the email-address prompt during Setup Wizard causes the device to download the Android Device Policy agent (or the Microsoft Intune app as DPC) and begin enterprise provisioning. Supported on Android 6+ for Fully Managed; removed as a COPE/WPCO path on Android 11+.

> **Cross-platform note:** No Windows, macOS, or iOS equivalent. This signaling pattern — a special string entered at initial setup to trigger enterprise provisioning — is Android-specific. Do not conflate with QR or NFC provisioning (those are separate methods; see the [Android Provisioning Methods matrix](android-lifecycle/02-provisioning-methods.md)).

### Corporate Identifiers

Corporate Identifiers are pre-loaded IMEI, serial number, or MEID lists uploaded to Intune that tag devices as corporate-owned at enrollment. An uploaded identifier causes a device to enroll into the Fully Managed or Dedicated flow rather than the personal BYOD Work Profile flow. Critical version gate: Android 12 removed IMEI and serial-number access from personally-owned work profile (BYOD) devices, so corporate-identifier tagging effectively works only for corporate-owned enrollment scenarios on Android 12+. See [`docs/android-lifecycle/03-android-version-matrix.md`](android-lifecycle/03-android-version-matrix.md) for the Android 12 breakpoint detail.

> **Cross-platform note:** On iOS/iPadOS, the analog is ABM device assignment by serial number — devices purchased through an Apple-authorized reseller appear in [ABM](_glossary-macos.md#abm) and can be assigned to an MDM server, producing the same "corporate-tagged at enrollment" effect. On Windows, the analog is hardware hash upload for Autopilot, which tags devices as corporate in the Intune Windows Autopilot devices blade. All three achieve the same enrollment-time corporate tagging, but use different identity plumbing (IMEI/serial in Intune for Android, ABM assignment for iOS, hardware hash for Windows). Do not conflate.

### DPC

Device Policy Controller (DPC) is the on-device app responsible for applying Android Enterprise policies. In Intune-managed scenarios, the Microsoft Intune app is the DPC for Fully Managed, Dedicated, WPCO, and post-AMAPI BYOD Work Profile; Company Portal was the legacy DPC for BYOD prior to the April 2025 AMAPI migration. The DPC receives configuration from Intune via Google Play Services on GMS devices, and enforces restrictions, certificate deployment, Wi-Fi profiles, and app assignments locally.

> **Cross-platform note:** On iOS/iPadOS and macOS, the analog is the MDM profile itself — the OS-level MDM framework plays the policy-controller role, and there is no separately-installed on-device management agent. On Windows, the MDM client is built into the operating system; Intune extends it via the Intune Management Extension for Win32 apps and PowerShell scripts, but there is no analog to the "DPC as a distinct on-device app" Android model. Do not conflate the Microsoft Intune DPC app on Android with the separate "Company Portal" app, which is the end-user portal for BYOD enrollment and app discovery.

## Portals & Binding

### EMM

Enterprise Mobility Management (EMM) is the umbrella term for platforms that combine Mobile Device Management (MDM) with Mobile Application Management (MAM) and identity integration. Microsoft Intune is an EMM. Google's Android Enterprise program certifies EMM platforms through the Managed Google Play bind — the EMM tenant must be bound to a Managed Google Play account for the EMM's device policies to reach Android Enterprise devices. EMM certification status is visible in the Managed Google Play admin surface.

> **Cross-platform note:** "EMM" is platform-agnostic umbrella vocabulary; Microsoft Intune is the EMM across Windows, macOS, iOS/iPadOS, and Android. On the Apple side, the equivalent mandatory upstream binding is the [APNs](_glossary-macos.md#apns) push certificate and the [ABM](_glossary-macos.md#abm) server token. On Windows, no third-party binding is required — Intune integrates directly with Entra ID for device enrollment. The Android "EMM must be bound to Managed Google Play" requirement has no Apple or Windows equivalent.

### Entra Shared Device Mode

Entra Shared Device Mode is a Microsoft Entra authentication mode for shared Android devices. Users sign in and sign out through supported line-of-business apps; Entra state (tokens, app data for Entra-integrated apps) is scoped to the active user session and cleared at sign-out. It is typically layered on top of Dedicated mode for shift-worker scenarios where a single device is reused by multiple users across shifts. Supported on Android 5.0+ for apps integrated with the Microsoft Authentication Library (MSAL) shared-device APIs.

> **Cross-platform note:** On iOS/iPadOS, the closest analog is Shared iPad (education and enterprise flavors), which provides OS-level user-partition separation — structurally different from Entra Shared Device Mode's app-scoped session model. On Windows, the closest analog is Shared PC mode with per-user temporary profiles. The Android Entra mode is an identity-layer concept riding on top of Dedicated enrollment, not a device enrollment mode in its own right.

### Managed Google Play

Managed Google Play (MGP) is Google's enterprise app distribution surface, tenant-bound to Intune. Admins use MGP to approve public Play Store apps for managed devices, distribute private (line-of-business) Android apps uploaded to the tenant's MGP catalog, and deliver web apps as app-wrapped shortcuts. Since August 2024, the preferred MGP binding uses a Microsoft Entra account rather than a Gmail account; existing Gmail-bound tenants continue to function but new bindings should use Entra. MGP is mandatory for all GMS-based Android Enterprise enrollment modes (COBO, BYOD, Dedicated, Zero-Touch); only out-of-GMS AOSP deployments bypass it.

> **Cross-platform note:** On iOS/iPadOS and macOS, the analog is Volume Purchase Program (VPP) / Apps and Books through [ABM](_glossary-macos.md#abm) — see [VPP](_glossary-macos.md#vpp) in the Apple glossary. On Windows, the closest analog is Microsoft Store for Business (deprecated) or the direct Intune app-assignment model for Win32/MSIX apps. The MGP "tenant-bound to an upstream Google portal" requirement is Android-specific; Windows and iOS app distribution use different trust models.

## Compliance & Attestation

### AMAPI

Android Management API (AMAPI) is Google's newer Android Enterprise management API that progressively replaced the older Android Management Service for Intune-managed BYOD Work Profile devices. Microsoft migrated Android personally-owned work profile management to AMAPI in April 2025. Post-migration, custom OMA-URI profiles for BYOD are no longer supported; Wi-Fi configuration requires certificate-based authentication (username/password Wi-Fi is effectively broken on the BYOD path); and the Microsoft Intune app is the primary BYOD management surface, replacing Company Portal as the DPC for BYOD.

> **Cross-platform note:** No direct Windows, macOS, or iOS equivalent — AMAPI is the Google-maintained API that Microsoft and other EMM vendors consume to manage Android Enterprise devices. The concept is roughly parallel to "the MDM protocol" on Apple platforms (the Apple-defined MDM commands that EMMs send to devices via APNs), but AMAPI-vs-Apple-MDM migration events affect only the Android fleet, not the Apple fleet.

### Managed Home Screen

Managed Home Screen (MHS) is Microsoft's launcher app for Android Enterprise Dedicated (COSU) devices. It enforces kiosk mode, presents an allow-listed set of apps to the end user, and supports an exit-kiosk PIN used by service technicians and admins. An important exit-PIN synchronization requirement exists — the PIN configured in the device-restrictions profile must match the PIN in the Managed Home Screen app configuration, or users hit a visible error when attempting to exit kiosk mode. See [`docs/android-lifecycle/03-android-version-matrix.md`](android-lifecycle/03-android-version-matrix.md) and the Phase 38 Dedicated runbooks for detailed MHS configuration and exit-PIN troubleshooting.

> **Cross-platform note:** On iOS/iPadOS, the analog is Apple's Single App Mode or Autonomous Single App Mode configured through a supervised MDM profile — structurally different (OS-level App Lock rather than a launcher replacement). On Windows, the analog is Assigned Access shell replacement. MHS is Android-specific and adds the distinct exit-PIN sync concern that neither Apple nor Windows kiosk mechanisms require.

### Play Integrity

Play Integrity is Google's device-attestation API, successor to the SafetyNet Attestation API (which Google turned off in January 2025). Play Integrity returns three verdict levels: Basic integrity, Basic + Device integrity, and Strong integrity (the last requires hardware-backed security such as a valid boot attestation from the device's TEE). Intune's Android compliance UI uses "Play Integrity Verdict" terminology and gates compliance policies on one of the three verdicts. Compliance evaluation happens at sync intervals, not in real time.

> **Cross-platform note:** On iOS/iPadOS, the analog is DeviceCheck and App Attest — Apple-provided device-attestation APIs with similar intent (confirm device integrity to a backend). See [Jailbreak Detection](_glossary-macos.md#jailbreak-detection) for the Intune-exposed iOS compliance surface, which is related but narrower. On Windows, the analog is TPM-based device attestation through Windows Health Attestation. All three address device-integrity attestation, but the verdict shapes, API surfaces, and enforcement points differ substantially. Do not conflate Play Integrity verdicts with iOS jailbreak compliance signals.

---

## Version History
