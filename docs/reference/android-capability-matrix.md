---
last_verified: 2026-04-25
review_by: 2026-06-24
applies_to: both
audience: admin
platform: Android
phase_46_wave2_retrofit: 2026-04-25
---

# Intune: Android Capability Matrix — Modes by Feature

This matrix compares Intune management capabilities across the five Android Enterprise enrollment modes: COBO (Fully Managed), BYOD (Work Profile), Dedicated (COSU), ZTE (Zero-Touch), and AOSP (stub reference). It is organized mode-first (columns = modes, rows = features) across five locked domains — Enrollment, Configuration, App Deployment, Compliance, and Software Updates. For Apple↔Android capability analogs across these modes, see the [Cross-Platform Equivalences section](#cross-platform-equivalences) below, which lays out three paired rows mapping iOS/Apple enrollment concepts to Android enrollment concepts. For the sibling platform matrices, see [iOS Capability Matrix](ios-capability-matrix.md) and [macOS Capability Matrix](macos-capability-matrix.md). For the enrollment narrative that gave rise to these 5 modes (including the two-axes ownership × management-scope model), see [Android Provisioning Lifecycle](../android-lifecycle/00-enrollment-overview.md).

## Enrollment

| Feature | COBO (Fully Managed) | COPE (WPCO / Corp-Owned Work Profile) | BYOD (Work Profile) | Dedicated (COSU) | ZTE (Zero-Touch) | AOSP |
|---------|----------------------|----------------------|---------------------|------------------|------------------|------|
| Tri-portal admin surface required | Intune + [MGP](../admin-setup-android/01-managed-google-play.md) | Intune + [MGP](../admin-setup-android/01-managed-google-play.md) | Intune + [MGP](../admin-setup-android/01-managed-google-play.md) | Intune + [MGP](../admin-setup-android/01-managed-google-play.md) | Intune + [MGP](../admin-setup-android/01-managed-google-play.md) + [Zero-Touch portal setup](../admin-setup-android/02-zero-touch-portal.md) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Ownership model | Corporate-owned | Corporate-owned (work profile separated) | Personally-owned | Corporate-owned (specialty) | Corporate-owned | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Provisioning methods | QR / NFC / afw#setup / Zero-Touch — see [provisioning methods](../android-lifecycle/02-provisioning-methods.md#cobo) | QR / NFC (Android 8-10) / afw#setup (Android 8-10) / Token (Android 8-10) / Zero-Touch — see [08-cope-full-admin.md#provisioning-method-choice](../admin-setup-android/08-cope-full-admin.md#provisioning-method-choice) | Company Portal / Intune app (user-initiated) — see [provisioning methods](../android-lifecycle/02-provisioning-methods.md#byod-work-profile) | QR / NFC / afw#setup / Zero-Touch — see [provisioning methods](../android-lifecycle/02-provisioning-methods.md#dedicated-cosu) | Zero-Touch portal binding — see [provisioning methods](../android-lifecycle/02-provisioning-methods.md#zero-touch) and [Zero-Touch portal setup](../admin-setup-android/02-zero-touch-portal.md) | QR-only provisioning on select OEMs — see [stub](../admin-setup-android/06-aosp-stub.md) |
| Hardware identity / token model | Enrollment token + optional IMEI/serial pre-mark (Android ≤ 11 only for BYOD — not COBO) | Enrollment token (default + staging up to 65 years) — see [08-cope-full-admin.md#enrollment-token](../admin-setup-android/08-cope-full-admin.md#enrollment-token) | Google account (no IMEI/serial pre-mark on Android 12+; see [Android 12 breakpoint](../android-lifecycle/03-android-version-matrix.md#android-12-corporate-identifiers)) | Enrollment token; QR rotation discipline required | IMEI / serial upload to reseller → Zero-Touch portal | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Minimum Android version | Android 10.0 — see [version matrix](../android-lifecycle/03-android-version-matrix.md#cobo) | Android 8.0 — see [08-cope-full-admin.md#prerequisites](../admin-setup-android/08-cope-full-admin.md#prerequisites) | Android 5.0 (practical: 8+) — see [version matrix](../android-lifecycle/03-android-version-matrix.md) | Android 8.0 — see [version matrix](../android-lifecycle/03-android-version-matrix.md) | Android 8.0 — see [version matrix](../android-lifecycle/03-android-version-matrix.md) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| User affinity / userless support | User-affinity or userless (ADE-analogous) | User-affinity required (work-profile attached to user identity) | User-affinity required (user is enrollee) | Userless (shared-shift / signage); user-affinity variant via Entra shared device mode | User-affinity or userless on first-boot handoff | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| DPC identity on device | Android Device Policy | Android Device Policy (work-profile DPC + device-owner DPC) | Microsoft Intune app (post-AMAPI April 2025; Company Portal was prior DPC) | Android Device Policy + Managed Home Screen launcher | Android Device Policy (post-ZTE handoff to Intune) | OEM DPC (AOSP-specific) — see [stub](../admin-setup-android/06-aosp-stub.md) |
| Entra join / Shared Device Mode | Entra-joined at enrollment (Chrome Custom Tab sign-in) | Entra-joined at enrollment (Chrome Custom Tab sign-in) | Entra work-profile identity | Entra shared device mode available (frontline multi-user) | Entra-joined post-Zero-Touch handoff | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Factory Reset Protection (Android 15) | EFRP enforced on re-enrollment — see [Android 15 breakpoint](../android-lifecycle/03-android-version-matrix.md#android-15-breakpoint) | EFRP enforced; Android 15 Settings-app reset requires re-supplying Google account — see [08-cope-full-admin.md#android-15-frp](../admin-setup-android/08-cope-full-admin.md#android-15-frp) | Unaffected | EFRP enforced on re-provisioning — see [Android 15 breakpoint](../android-lifecycle/03-android-version-matrix.md#android-15-breakpoint) | EFRP enforced on re-enrollment | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Android 15 Private Space | N/A¹ | N/A¹ | N/A¹ | N/A¹ | N/A¹ | N/A¹ |

¹ Personal-side feature outside Intune management surface across all modes; see [glossary](../_glossary-android.md#private-space) and [version matrix breakpoint](../android-lifecycle/03-android-version-matrix.md#android-15-private-space-breakpoint).

## Configuration

| Feature | COBO (Fully Managed) | COPE (WPCO / Corp-Owned Work Profile) | BYOD (Work Profile) | Dedicated (COSU) | ZTE (Zero-Touch) | AOSP |
|---------|----------------------|----------------------|---------------------|------------------|------------------|------|
| Settings Catalog applicability | Yes (device-wide) | Yes (work-profile scope + device-owner-side restrictions) | Yes (work-profile scope) | Yes (device-wide) | Yes (device-wide, post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Restriction profile breadth | Extensive (🔒 FM/DO-only: device-wide restrictions, hardware toggles, CA trust-store control, USB policy) | Work-profile + device-owner restrictions (broader than BYOD; narrower than COBO — no personal-side reach) | Work-profile-only (no personal-side reach) | 🔒 Dedicated-only kiosk lockdown (launcher takeover, exit-PIN, single-app vs multi-app) | Same as COBO post-handoff (🔒 FM/DO-only) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Configuration Profiles vs OMA-URI (post-AMAPI) | Configuration Profiles + custom profiles (device-wide) | Configuration Profiles + custom profiles (work-profile scope) | 🔒 AMAPI-backed templates ONLY — OMA-URI removed April 2025 (AMAPI migration) | Configuration Profiles + kiosk-specific custom profiles | Configuration Profiles (post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Policy Sets support | Yes | Yes (work-profile-scoped) | Yes (work-profile-scoped) | Yes | Yes | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| App-config (Managed Configurations) targeting | Yes (device-targeted) | Yes (work-profile-targeted) | Yes (user-targeted within work profile) | Yes (MHS app-config exit-PIN MUST sync with device restrictions) | Yes (device-targeted post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Per-mode restriction count / scope | ~150+ device-wide restriction keys available | Work-profile keys + device-owner-side restrictions (between BYOD and COBO breadth) | ~40 work-profile keys (smaller surface by design) | COBO-set + kiosk lockdown keys | Same as COBO post-handoff | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Wi-Fi profile authentication | Username/password or certificate | Username/password or certificate (work-profile scope) | 🔒 Certificate-based ONLY post-AMAPI (username/password broken on BYOD post-April 2025) | Username/password or certificate | Username/password or certificate (post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| DDM (Declarative Device Management) | DDM: N/A (Android uses Play-integrated policy channel instead) | DDM: N/A (Android uses Play-integrated policy channel instead) | DDM: N/A | DDM: N/A | DDM: N/A | DDM: N/A |

## App Deployment

| Feature | COBO (Fully Managed) | COPE (WPCO / Corp-Owned Work Profile) | BYOD (Work Profile) | Dedicated (COSU) | ZTE (Zero-Touch) | AOSP |
|---------|----------------------|----------------------|---------------------|------------------|------------------|------|
| Managed app channel | [Managed Google Play](../_glossary-android.md#managed-google-play) (mandatory) | [Managed Google Play](../_glossary-android.md#managed-google-play) (mandatory, work-profile-scoped) | [Managed Google Play](../_glossary-android.md#managed-google-play) (mandatory, work-profile-scoped) | [Managed Google Play](../_glossary-android.md#managed-google-play) (mandatory) | [Managed Google Play](../_glossary-android.md#managed-google-play) (mandatory, post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) (no MGP; OEM side-channel) |
| Silent install (no user prompt) | Yes (🔒 FM/DO-only — device-wide silent install) | Yes for MGP work-profile apps | Yes for MGP work-profile apps (user consents once at enrollment) | Yes (🔒 Dedicated-only — required for kiosk app provisioning) | Yes (post-handoff; 🔒 FM/DO-only) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| LOB APK delivery path | Private app via MGP (upload APK to MGP as private app) | Private app via MGP (work-profile-scoped) | Private app via MGP (work-profile-scoped) | Private app via MGP | Private app via MGP (post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) (sideload / OEM firmware integration) |
| Managed Home Screen (MHS) | N/A | N/A | N/A | 🔒 Dedicated-only — see [Dedicated Devices](../admin-setup-android/05-dedicated-devices.md); exit-PIN MUST sync between device restrictions and MHS app-config | N/A | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| App-config (Managed Configurations) | Yes | Yes (work-profile-scoped) | Yes (work-profile-scoped) | Yes (MHS app-config is the canonical example) | Yes (post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Work-profile app isolation | N/A (device-wide; no personal side) | Yes — kernel-level container between personal and work apps on a corporate-owned device | 🔒 BYOD-only — kernel-level container between personal and work apps | N/A | N/A (device-wide post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| AMAPI migration footnote | Unaffected | Unaffected (AMAPI April 2025 affected BYOD specifically; COPE/WPCO unaffected) | 🔒 BYOD-only — Microsoft Intune app is the DPC post-April 2025 (replaced Company Portal); custom OMA-URI removed | Unaffected | Unaffected | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |

## Compliance

| Feature | COBO (Fully Managed) | COPE (WPCO / Corp-Owned Work Profile) | BYOD (Work Profile) | Dedicated (COSU) | ZTE (Zero-Touch) | AOSP |
|---------|----------------------|----------------------|---------------------|------------------|------------------|------|
| [Play Integrity](../_glossary-android.md#play-integrity) verdict levels (successor to the prior Google attestation API, turned off January 2025) | All three: Basic / Basic + Device / Strong integrity | All three: Basic / Basic + Device / Strong integrity | All three: Basic / Basic + Device / Strong integrity | All three: Basic / Basic + Device / Strong integrity | All three: Basic / Basic + Device / Strong integrity | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) (deprecated-API-successor: Play Integrity is not available on non-GMS AOSP hardware) |
| Conditional Access attestation requirement | Full Play Integrity (Strong integrity typical) | Full Play Integrity on work-profile | Full Play Integrity on work-profile | Full Play Integrity | Full Play Integrity (post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Device-based restriction enforcement | 🔒 FM/DO-only (device-wide compliance gating) | Work-profile + device-owner-side enforcement | Work-profile-scoped only | 🔒 FM/DO-only + kiosk-specific | 🔒 FM/DO-only (post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Password / passcode policy enforcement | Device-wide passcode complexity | Work-profile challenge + device PIN (corporate-owned device-owner side) | Work-profile challenge (separate from device PIN) | Device-wide (often kiosk-exit PIN + device PIN) | Device-wide (post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Default compliance posture (newly enrolled, not-yet-evaluated) | "Not evaluated" — CA grace period applies | "Not evaluated" — CA grace period applies | "Not evaluated" | "Not evaluated" | "Not evaluated" (post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| L2 investigation runbook | See [21-android-compliance-investigation.md](../l2-runbooks/21-android-compliance-investigation.md) | See [21-android-compliance-investigation.md](../l2-runbooks/21-android-compliance-investigation.md) | See [21-android-compliance-investigation.md](../l2-runbooks/21-android-compliance-investigation.md) | See [21-android-compliance-investigation.md](../l2-runbooks/21-android-compliance-investigation.md) | See [21-android-compliance-investigation.md](../l2-runbooks/21-android-compliance-investigation.md) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |

## Software Updates

| Feature | COBO (Fully Managed) | COPE (WPCO / Corp-Owned Work Profile) | BYOD (Work Profile) | Dedicated (COSU) | ZTE (Zero-Touch) | AOSP |
|---------|----------------------|----------------------|---------------------|------------------|------------------|------|
| System update policy support | Yes — admin-defined update posture (Default / Automatic / Postpone up to 30 days / Windowed) | Yes — admin-defined update posture (Default / Automatic / Postpone up to 30 days / Windowed) on the device-owner side | Work-profile telemetry only (no device-wide system update control on personally-owned devices) | Yes — typically Windowed (off-hours maintenance) for kiosk fleets | Yes — post-handoff; same scope as COBO | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Deferral window capabilities | 🔒 FM/DO-only — forced deferral up to 30 days | 🔒 device-owner-side — forced deferral up to 30 days | Advisory only (user ultimately controls personal-device updates) | 🔒 FM/DO-only — forced deferral up to 30 days (kiosk windowed updates common) | 🔒 FM/DO-only — forced deferral up to 30 days | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Play Store app-update control | Yes — per-app auto-update posture via MGP | Yes — per-app auto-update posture via MGP (work-profile apps) | Yes (work-profile apps only) | Yes | Yes (post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) (no Play Store) |
| OEM update enforcement | 🔒 FM/DO-only — Android OS update posture respected by OEMs in managed mode | 🔒 device-owner-side — Android OS update posture respected by OEMs in managed mode | N/A (OEM updates apply to personal device; admin has no enforcement surface) | 🔒 FM/DO-only — matches COBO (kiosk windowed posture common) | 🔒 FM/DO-only — matches COBO post-handoff | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) (OEM firmware update pipeline varies by vendor) |

## Cross-Platform Equivalences

<!-- AEAUDIT-04: "supervision" in this section MUST appear only as an iOS-attributed
     reference. Android management states are "Fully Managed" / "Work Profile" /
     "Dedicated" / "ZTE" — never "supervised". Each paired row MUST attribute the
     platform in the column header (e.g., "iOS Supervision" not "Supervision"). -->

This section maps three Apple↔Android capability pairs called out in ROADMAP SC#1. It is NOT a 4-platform comparison — see the [4-platform deferral footer](#deferred-4-platform-unified-capability-comparison) below. Each paired row attributes the platform explicitly on both sides (e.g., "iOS Supervision" and "Android Fully Managed"); the Android side never uses Apple-attributed terms such as "supervised" or "unsupervised" as Android management states.

| iOS / Apple | Android |
|-------------|---------|
| **iOS Supervision (ADE-enrolled)** | **Android Fully Managed (COBO / DPC owner)** |
| iOS Supervision is a permanent per-device state, set at Apple Automated Device Enrollment (ADE) time, that gates approximately 60 additional restriction settings (home-screen layout, AirDrop / Camera / Safari / screen-recording restrictions, transparent per-app VPN, silent VPP device-licensed install, DDM app install) on top of a normal MDM enrollment. Supervision cannot be added retroactively without a full device erase. See [iOS Capability Matrix — Enrollment](ios-capability-matrix.md#enrollment) for the full supervised-only surface. | Android Fully Managed (COBO) is an ownership-mode designation set at provisioning time — not a per-device state layered onto a pre-existing enrollment. It delivers the closest Android analog to the iOS supervised capability set (device-wide silent install, device-wide restrictions breadth, forced deferral windows for OS updates) but the mapping is partial. "Supervision" is not an Android management term — Android does not use "supervised" or "unsupervised" as device states; the Android equivalents are the four named ownership/management modes (Fully Managed, Work Profile, Dedicated, Zero-Touch). See [Fully Managed](../_glossary-android.md#fully-managed) and [Android Provisioning Lifecycle — For Admins Familiar with iOS](../android-lifecycle/00-enrollment-overview.md#for-admins-familiar-with-ios). |
| **iOS Automated Device Enrollment (ADE) via Apple Business Manager** | **Google Zero-Touch Enrollment via ZT portal** |
| Apple ADE is hardware-vendor-chain enrollment via Apple Business Manager (ABM): Apple-authorized resellers upload device serial numbers into the organization's ABM tenant, which binds ADE-purchased iOS / iPadOS / macOS devices to a specific MDM at factory level. First-boot Setup Assistant completes enrollment automatically. Reseller relationship is implicit (Apple-authorized channel); no per-device token management. Devices enroll on first boot via ABM → MDM handoff. | Google Zero-Touch Enrollment binds hardware to the organization via the [Zero-Touch portal](../admin-setup-android/02-zero-touch-portal.md) with an explicit reseller relationship as Step 0 — a distinct tri-portal administrative surface (Intune + Managed Google Play + Zero-Touch portal). Resellers upload IMEI / serial lists to the portal; devices enroll on first boot via portal → Intune handoff into Fully Managed or Dedicated. Samsung hardware: Zero-Touch is mutually exclusive with Knox Mobile Enrollment — see the [Knox Mobile Enrollment](#knox-mobile-enrollment-row). |
| **iOS Account-Driven User Enrollment (BYOD iOS 15+)** | **Android Work Profile (BYOD, Company Portal enrollment)** |
| iOS Account-Driven User Enrollment (iOS 15+) is the privacy-preserving BYOD path for personally-owned devices: a Managed Apple ID creates a cryptographically-isolated APFS volume for corporate apps and data while leaving personal apps, photos, iCloud content, and device identifiers outside IT visibility. IT cannot see personal apps or inspect personal data — this is Apple-enforced. Selective wipe removes only corporate data. | Android Work Profile is the privacy-preserving BYOD path using a work-profile partition — a kernel-level container that isolates work apps, work data, work certificates, and work policies from the personal side of a personally-owned device. Post-AMAPI migration (April 2025), the Microsoft Intune app is the primary DPC (replacing Company Portal); Wi-Fi profiles in the work container require certificate-based authentication. Selective wipe removes only the work container. See [BYOD Work Profile](../admin-setup-android/04-byod-work-profile.md) and [Work Profile](../_glossary-android.md#work-profile). |

## Key Gaps Summary

The most significant Android capability gaps relative to Windows/macOS/iOS are (8 items, iOS-matrix parity):

1. **No CLI diagnostic hook** — Android has no equivalent of Windows `mdmdiagnosticstool.exe` or macOS `profiles` / `log show`; Android device diagnostics come through Company Portal / Intune app log uploads, and the L1/L2 investigation paths rely on Intune admin-center reports. See [L2 Log Collection](../l2-runbooks/18-android-log-collection.md).
2. **Mode-locked restriction scope** — The deepest restriction settings (device-wide silent install, hardware toggles, CA trust-store control, USB policy, forced OS-update deferral) are 🔒 FM/DO-only — unavailable on BYOD Work Profile by design, and structurally different from the iOS ADE-gated restriction set (see the [Cross-Platform Equivalences](#cross-platform-equivalences) section for the full cross-platform mapping).
3. **Tri-portal admin surface** — Android Enterprise uniquely requires three admin portals (Intune + Managed Google Play + Zero-Touch portal when ZTE is used), vs a single admin center for Windows, and two portals for Apple (Intune + ABM).
4. **Play Integrity replaces the prior device-attestation predecessor** — Google's January 2025 cutover to [Play Integrity](../_glossary-android.md#play-integrity) (successor to the prior Google attestation API, turned off January 2025) means there is no fallback for the deprecated API on any Android device today; compliance policies must reference Play Integrity verdict levels exclusively.
5. **AMAPI-migrated BYOD DPC** — Post-April 2025, the Microsoft Intune app is the primary DPC for BYOD (replacing Company Portal); custom OMA-URI profiles are removed for BYOD; Wi-Fi must use certificate-based authentication. Legacy BYOD tenants require migration.
6. **No DDM equivalent** — Android does not have a Declarative Device Management analog; Android uses a Play-integrated policy channel (Android Device Policy + AMAPI) rather than the DDM status-channel model used by iOS 17+ / macOS 14+.
7. **AOSP per-OEM matrix** — AOSP (RealWear, Zebra, Pico, HTC VIVE Focus, Meta Quest) per-OEM capability mapping is in the [AOSP OEM Matrix](aosp-oem-matrix.md); this matrix cross-references it at lines 121-127.
8. **Dedicated = COSU + MHS, not Apple single-app mode** — Android Dedicated uses Managed Home Screen (MHS) with an exit-PIN gate, distinct from Apple single-app mode (which is ADE-gated on iOS and configures the app directly); the MHS exit-PIN must sync between the device-restrictions profile and the MHS app-config profile.

## See Also

- [iOS Capability Matrix](ios-capability-matrix.md) — sibling trilateral Windows / macOS / iOS capability matrix
- [macOS Capability Matrix](macos-capability-matrix.md) — sibling bilateral Windows / macOS capability matrix
- [Android Provisioning Lifecycle](../android-lifecycle/00-enrollment-overview.md) — enrollment-overview narrative with two-axes model
- [Android Provisioning Methods](../android-lifecycle/02-provisioning-methods.md) — canonical mode × method matrix (NFC / QR / afw#setup / Zero-Touch)
- [Android Version Matrix](../android-lifecycle/03-android-version-matrix.md) — canonical Intune-minimum Android version per mode and notable version breakpoints

---

<a id="knox-mobile-enrollment-row"></a>
### Knox Mobile Enrollment (Samsung)

Knox Mobile Enrollment (KME) is Samsung's zero-touch-equivalent enrollment channel for Samsung devices. KME provisions Samsung devices into the existing Android Enterprise device-owner modes (COBO / Dedicated / WPCO) via the Knox Admin Portal → Intune handoff using a flat `EXTRA_ENROLLMENT_TOKEN` Custom JSON Data field. KME itself is **free** and does not require a paid Knox license; KPE Premium has been free since Samsung's 2024-03-21 update, and Microsoft Intune Plan 1+ supplies KPE Premium transparently to enrolled Samsung devices. KME is **mutually exclusive with Google Zero-Touch** on the same Samsung device — KME takes precedence at the device firmware level when both are configured.

For full admin coverage, see [Knox Mobile Enrollment Admin Guide](../admin-setup-android/07-knox-mobile-enrollment.md). For L1 enrollment-failure triage, see [L1 Runbook 28: Android Knox Enrollment Failed](../l1-runbooks/28-android-knox-enrollment-failed.md). For L2 investigation, see [L2 Runbook 22: Android Knox Investigation](../l2-runbooks/22-android-knox-investigation.md). For provisioning-method placement in the lifecycle reference, see [Knox Mobile Enrollment](../android-lifecycle/02-provisioning-methods.md#knox-mobile-enrollment).

<a id="deferred-full-aosp-capability-mapping"></a>
### AOSP per-OEM capability mapping

AOSP (Android Open Source Project) devices — RealWear, Zebra, Pico, HTC VIVE
Focus, Meta Quest — appear in this matrix as a single AOSP column. Per-OEM
capability mapping (5-OEM × 4-capability-H2 sub-tables) is documented in
[AOSP OEM Matrix](aosp-oem-matrix.md). See also [AOSP stub](../admin-setup-android/06-aosp-stub.md).

<a id="deferred-4-platform-unified-capability-comparison"></a>
### Deferred: 4-platform unified capability comparison

This matrix is Android-centric with a bounded 3-row Cross-Platform Equivalences
section. A unified Windows|macOS|iOS|Android 4-platform feature comparison doc
is deferred to v1.5 (AECOMPARE-01). The paired rows in this matrix are NOT a
4-platform comparison — they are mode-level feature parity assertions between
Apple and Android, constrained to the 3 SC#1-named pairs.

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-25 | Phase 45 AEAOSPFULL-09: `#deferred-full-aosp-capability-mapping` anchor fill — replaced "deferred to v1.4.1" prose with cross-link to new `aosp-oem-matrix.md` per AEAOSPFULL-09 verbatim "link to" wording. Anchor preserved for backward-compat. | -- |
| 2026-04-24 | Initial version — Phase 42: Android Enterprise capability matrix (5 domains, 5 mode rows, Cross-Platform Equivalences H2 with 3 paired rows, Key Gaps Summary, deferral footers) | -- |
