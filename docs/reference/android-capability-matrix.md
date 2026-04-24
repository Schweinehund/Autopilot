---
last_verified: 2026-04-24
review_by: 2026-06-23
applies_to: both
audience: admin
platform: Android
---

# Intune: Android Capability Matrix — Modes by Feature

This matrix compares Intune management capabilities across the five Android Enterprise enrollment modes: COBO (Fully Managed), BYOD (Work Profile), Dedicated (COSU), ZTE (Zero-Touch), and AOSP (stub reference). It is organized mode-first (columns = modes, rows = features) across five locked domains — Enrollment, Configuration, App Deployment, Compliance, and Software Updates. For Apple↔Android capability analogs across these modes, see [## Cross-Platform Equivalences](#cross-platform-equivalences) below, which lays out three paired rows mapping iOS/Apple enrollment concepts to Android enrollment concepts. For the sibling platform matrices, see [iOS Capability Matrix](ios-capability-matrix.md) and [macOS Capability Matrix](macos-capability-matrix.md). For the enrollment narrative that gave rise to these 5 modes (including the two-axes ownership × management-scope model), see [Android Provisioning Lifecycle](../android-lifecycle/00-enrollment-overview.md).

## Enrollment

| Feature | COBO (Fully Managed) | BYOD (Work Profile) | Dedicated (COSU) | ZTE (Zero-Touch) | AOSP |
|---------|----------------------|---------------------|------------------|------------------|------|
| Tri-portal admin surface required | Intune + [MGP](../admin-setup-android/01-managed-google-play.md) | Intune + [MGP](../admin-setup-android/01-managed-google-play.md) | Intune + [MGP](../admin-setup-android/01-managed-google-play.md) | Intune + [MGP](../admin-setup-android/01-managed-google-play.md) + [Zero-Touch portal setup](../admin-setup-android/02-zero-touch-portal.md) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Ownership model | Corporate-owned | Personally-owned | Corporate-owned (specialty) | Corporate-owned | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Provisioning methods | QR / NFC / afw#setup / Zero-Touch — see [provisioning methods](../android-lifecycle/02-provisioning-methods.md#cobo) | Company Portal / Intune app (user-initiated) — see [provisioning methods](../android-lifecycle/02-provisioning-methods.md#byod-work-profile) | QR / NFC / afw#setup / Zero-Touch — see [provisioning methods](../android-lifecycle/02-provisioning-methods.md#dedicated-cosu) | Zero-Touch portal binding — see [provisioning methods](../android-lifecycle/02-provisioning-methods.md#zero-touch) and [Zero-Touch portal setup](../admin-setup-android/02-zero-touch-portal.md) | QR-only provisioning on select OEMs — see [stub](../admin-setup-android/06-aosp-stub.md) |
| Hardware identity / token model | Enrollment token + optional IMEI/serial pre-mark (Android ≤ 11 only for BYOD — not COBO) | Google account (no IMEI/serial pre-mark on Android 12+; see [Android 12 breakpoint](../android-lifecycle/03-android-version-matrix.md#android-12-corporate-identifiers)) | Enrollment token; QR rotation discipline required | IMEI / serial upload to reseller → Zero-Touch portal | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Minimum Android version | Android 10.0 — see [version matrix](../android-lifecycle/03-android-version-matrix.md#cobo) | Android 5.0 (practical: 8+) — see [version matrix](../android-lifecycle/03-android-version-matrix.md) | Android 8.0 — see [version matrix](../android-lifecycle/03-android-version-matrix.md) | Android 8.0 — see [version matrix](../android-lifecycle/03-android-version-matrix.md) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| User affinity / userless support | User-affinity or userless (ADE-analogous) | User-affinity required (user is enrollee) | Userless (shared-shift / signage); user-affinity variant via Entra shared device mode | User-affinity or userless on first-boot handoff | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| DPC identity on device | Android Device Policy | Microsoft Intune app (post-AMAPI April 2025; Company Portal was prior DPC) | Android Device Policy + Managed Home Screen launcher | Android Device Policy (post-ZTE handoff to Intune) | OEM DPC (AOSP-specific) — see [stub](../admin-setup-android/06-aosp-stub.md) |
| Entra join / Shared Device Mode | Entra-joined at enrollment (Chrome Custom Tab sign-in) | Entra work-profile identity | Entra shared device mode available (frontline multi-user) | Entra-joined post-Zero-Touch handoff | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Factory Reset Protection (Android 15) | EFRP enforced on re-enrollment — see [Android 15 breakpoint](../android-lifecycle/03-android-version-matrix.md#android-15-breakpoint) | Unaffected | EFRP enforced on re-provisioning — see [Android 15 breakpoint](../android-lifecycle/03-android-version-matrix.md#android-15-breakpoint) | EFRP enforced on re-enrollment | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |

## Configuration

| Feature | COBO (Fully Managed) | BYOD (Work Profile) | Dedicated (COSU) | ZTE (Zero-Touch) | AOSP |
|---------|----------------------|---------------------|------------------|------------------|------|
| Settings Catalog applicability | Yes (device-wide) | Yes (work-profile scope) | Yes (device-wide) | Yes (device-wide, post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Restriction profile breadth | Extensive (🔒 FM/DO-only: device-wide restrictions, hardware toggles, CA trust-store control, USB policy) | Work-profile-only (no personal-side reach) | 🔒 Dedicated-only kiosk lockdown (launcher takeover, exit-PIN, single-app vs multi-app) | Same as COBO post-handoff (🔒 FM/DO-only) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Configuration Profiles vs OMA-URI (post-AMAPI) | Configuration Profiles + custom profiles (device-wide) | 🔒 AMAPI-backed templates ONLY — OMA-URI removed April 2025 (AMAPI migration) | Configuration Profiles + kiosk-specific custom profiles | Configuration Profiles (post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Policy Sets support | Yes | Yes (work-profile-scoped) | Yes | Yes | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| App-config (Managed Configurations) targeting | Yes (device-targeted) | Yes (user-targeted within work profile) | Yes (MHS app-config exit-PIN MUST sync with device restrictions) | Yes (device-targeted post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Per-mode restriction count / scope | ~150+ device-wide restriction keys available | ~40 work-profile keys (smaller surface by design) | COBO-set + kiosk lockdown keys | Same as COBO post-handoff | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Wi-Fi profile authentication | Username/password or certificate | 🔒 Certificate-based ONLY post-AMAPI (username/password broken on BYOD post-April 2025) | Username/password or certificate | Username/password or certificate (post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| DDM (Declarative Device Management) | DDM: N/A (Android uses Play-integrated policy channel instead) | DDM: N/A | DDM: N/A | DDM: N/A | DDM: N/A |

## App Deployment

| Feature | COBO (Fully Managed) | BYOD (Work Profile) | Dedicated (COSU) | ZTE (Zero-Touch) | AOSP |
|---------|----------------------|---------------------|------------------|------------------|------|
| Managed app channel | [Managed Google Play](../_glossary-android.md#managed-google-play) (mandatory) | [Managed Google Play](../_glossary-android.md#managed-google-play) (mandatory, work-profile-scoped) | [Managed Google Play](../_glossary-android.md#managed-google-play) (mandatory) | [Managed Google Play](../_glossary-android.md#managed-google-play) (mandatory, post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) (no MGP; OEM side-channel) |
| Silent install (no user prompt) | Yes (🔒 FM/DO-only — device-wide silent install) | Yes for MGP work-profile apps (user consents once at enrollment) | Yes (🔒 Dedicated-only — required for kiosk app provisioning) | Yes (post-handoff; 🔒 FM/DO-only) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| LOB APK delivery path | Private app via MGP (upload APK to MGP as private app) | Private app via MGP (work-profile-scoped) | Private app via MGP | Private app via MGP (post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) (sideload / OEM firmware integration) |
| Managed Home Screen (MHS) | N/A | N/A | 🔒 Dedicated-only — see [Dedicated Devices](../admin-setup-android/05-dedicated-devices.md); exit-PIN MUST sync between device restrictions and MHS app-config | N/A | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| App-config (Managed Configurations) | Yes | Yes (work-profile-scoped) | Yes (MHS app-config is the canonical example) | Yes (post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Work-profile app isolation | N/A (device-wide; no personal side) | 🔒 BYOD-only — kernel-level container between personal and work apps | N/A | N/A (device-wide post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| AMAPI migration footnote | Unaffected | 🔒 BYOD-only — Microsoft Intune app is the DPC post-April 2025 (replaced Company Portal); custom OMA-URI removed | Unaffected | Unaffected | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |

## Compliance

| Feature | COBO (Fully Managed) | BYOD (Work Profile) | Dedicated (COSU) | ZTE (Zero-Touch) | AOSP |
|---------|----------------------|---------------------|------------------|------------------|------|
| [Play Integrity](../_glossary-android.md#play-integrity) verdict levels (successor to the prior Google attestation API, turned off January 2025) | All three: Basic / Basic + Device / Strong integrity | All three: Basic / Basic + Device / Strong integrity | All three: Basic / Basic + Device / Strong integrity | All three: Basic / Basic + Device / Strong integrity | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) (deprecated-API-successor: Play Integrity is not available on non-GMS AOSP hardware) |
| Conditional Access attestation requirement | Full Play Integrity (Strong integrity typical) | Full Play Integrity on work-profile | Full Play Integrity | Full Play Integrity (post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Device-based restriction enforcement | 🔒 FM/DO-only (device-wide compliance gating) | Work-profile-scoped only | 🔒 FM/DO-only + kiosk-specific | 🔒 FM/DO-only (post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Password / passcode policy enforcement | Device-wide passcode complexity | Work-profile challenge (separate from device PIN) | Device-wide (often kiosk-exit PIN + device PIN) | Device-wide (post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Default compliance posture (newly enrolled, not-yet-evaluated) | "Not evaluated" — CA grace period applies | "Not evaluated" | "Not evaluated" | "Not evaluated" (post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| L2 investigation runbook | See [21-android-compliance-investigation.md](../l2-runbooks/21-android-compliance-investigation.md) | See [21-android-compliance-investigation.md](../l2-runbooks/21-android-compliance-investigation.md) | See [21-android-compliance-investigation.md](../l2-runbooks/21-android-compliance-investigation.md) | See [21-android-compliance-investigation.md](../l2-runbooks/21-android-compliance-investigation.md) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |

## Software Updates

| Feature | COBO (Fully Managed) | BYOD (Work Profile) | Dedicated (COSU) | ZTE (Zero-Touch) | AOSP |
|---------|----------------------|---------------------|------------------|------------------|------|
| System update policy support | Yes — admin-defined update posture (Default / Automatic / Postpone up to 30 days / Windowed) | Work-profile telemetry only (no device-wide system update control on personally-owned devices) | Yes — typically Windowed (off-hours maintenance) for kiosk fleets | Yes — post-handoff; same scope as COBO | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Deferral window capabilities | 🔒 FM/DO-only — forced deferral up to 30 days | Advisory only (user ultimately controls personal-device updates) | 🔒 FM/DO-only — forced deferral up to 30 days (kiosk windowed updates common) | 🔒 FM/DO-only — forced deferral up to 30 days | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) |
| Play Store app-update control | Yes — per-app auto-update posture via MGP | Yes (work-profile apps only) | Yes | Yes (post-handoff) | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) (no Play Store) |
| OEM update enforcement | 🔒 FM/DO-only — Android OS update posture respected by OEMs in managed mode | N/A (OEM updates apply to personal device; admin has no enforcement surface) | 🔒 FM/DO-only — matches COBO (kiosk windowed posture common) | 🔒 FM/DO-only — matches COBO post-handoff | AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md) (OEM firmware update pipeline varies by vendor) |
