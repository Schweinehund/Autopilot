---
last_verified: 2026-04-23
review_by: 2026-06-22
audience: admin
platform: Android
applies_to: AOSP
---

# AOSP Device Management Stub — Intune

> **Platform gate:** This guide covers AOSP device management in Intune — specialty AR/VR and wearable-scanner hardware with no Google Mobile Services. For other Android Enterprise modes, see [Android Admin Setup Overview](00-overview.md).
> For iOS/iPadOS, see [iOS Admin Guides](../admin-setup-ios/00-overview.md).
> For macOS, see [macOS Admin Guides](../admin-setup-macos/00-overview.md).
> For Android terminology, see the [Android Enterprise Provisioning Glossary](../_glossary-android.md).

> **Platform note:** AOSP (Android Open Source Project) management in Intune is a distinct enrollment surface from Android Enterprise (COBO/BYOD/Dedicated/ZTE). AOSP devices have no Google Mobile Services (GMS), no FCM push, and no Managed Google Play — this is structurally distinct from iOS User Enrollment (which has user identity) and macOS Automated Device Enrollment (which has Apple ID). For cross-platform comparison, see [Android enrollment overview](../android-lifecycle/00-enrollment-overview.md#aosp).

<!-- The #### In Managed Google Play subsection is intentionally omitted.
     AOSP does not use Managed Google Play (no Google Mobile Services). -->

<!-- The #### In Zero-Touch portal subsection is intentionally omitted.
     AOSP does not use the Zero-Touch portal; AOSP enrollment is QR-only, one device at a time. -->

## Scope and Status

> ⚠️ **This is a stub in v1.4. Full AOSP admin coverage is planned for v1.4.1.** See [Deferred Content](#deferred-content) for what this stub does NOT cover. Per-OEM enrollment mechanics, AOSP user-associated vs userless distinctions, and AOSP-specific L1/L2 runbooks are deferred.

This guide covers scope, supported device classes, and enrollment constraints for AOSP in Intune at v1.4. RealWear is highlighted as the confirmed GA case; admins with non-RealWear hardware are routed to Android Enterprise fully managed where GMS is available.

## What AOSP Is

AOSP (Android Open Source Project) is the base Android operating system without Google Mobile Services (GMS). Devices running AOSP do NOT have:

- **Firebase Cloud Messaging (FCM) push** — Intune uses direct polling for device-management signals; policy sync is poll-driven.
- **Managed Google Play (MGP)** — no Play Store apps; app deployment uses Intune APK delivery.
- **Google account sign-in as a management handshake** — AOSP corporate modes mark device ownership automatically during QR provisioning.

AOSP devices report via `intunecdnpeasd.manage.microsoft.com` rather than the GMS-path endpoints.

## When to Use AOSP

Use AOSP in Intune when the device hardware is in one of the MS Learn supported classes:

- **AR/VR headsets** (DigiLens, HTC, Lenovo, Meta, PICO, RealWear, Vuzix)
- **Wearable scanners** (Zebra)

Do NOT use AOSP for mainstream Android phones or tablets. If the device has GMS — which includes virtually all consumer and enterprise Android phones/tablets — use an Android Enterprise mode instead (Fully Managed COBO, BYOD Work Profile, Dedicated, or ZTE). See the [Android Enrollment Overview](../android-lifecycle/00-enrollment-overview.md) for the decision framework.

## Supported OEMs

The authoritative list of AOSP-supported devices lives at [MS Learn — AOSP Supported Devices](https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices). Re-verify at execute time.

<a id="realwear-confirmed-ga"></a>
### RealWear (confirmed GA)

RealWear **HMT-1** (firmware 11.2+), **HMT-1Z1** (11.2+), and **Navigator 500** (1.1+) are confirmed GA for AOSP management in Intune — AR/VR headsets deployed for hands-free frontline work (field service, maintenance, remote expert assistance).

Enrollment is QR-only, one device at a time. **Wi-Fi credentials MUST be embedded in the QR enrollment payload** because RealWear devices cannot join Wi-Fi interactively during enrollment — the device must come up already network-connected to reach the Intune enrollment server on first boot.

`[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-23]`

<a id="other-aosp-supported-oems"></a>
### Other AOSP-Supported OEMs

Other OEMs in Microsoft's AOSP supported-devices list as of 2026-04-23:

- **DigiLens** (DigiLens ARGO)
- **HTC** (Vive Focus 3, Vive XR Elite, Vive Focus Vision)
- **Lenovo** (ThinkReality VRX)
- **Meta** (Quest 2, Quest 3, Quest 3s, Quest Pro — select regions only for Quest 2 / 3 / Pro)
- **PICO** (PICO 4 Enterprise, PICO Neo3 Pro/Eye)
- **Vuzix** (Blade 2, M400, M4000)
- **Zebra** (WS50 wearable scanner)

**Per v1.4 scope, per-OEM enrollment mechanics for non-RealWear OEMs are deferred to v1.4.1. If GMS is present on these devices, use Android Enterprise fully managed instead of AOSP.** See [Deferred Content](#deferred-content) for v1.4.1 coverage.

## Enrollment Constraints

AOSP enrollment has three load-bearing constraints that differ from GMS-based modes:

- **QR-only enrollment.** The only supported provisioning method for AOSP is QR code. NFC, DPC identifier (afw#setup), and Zero-Touch are NOT supported (Android 10+).

  > **What breaks if misconfigured:** Attempting NFC, afw#setup, or Zero-Touch on AOSP — enrollment fails silently or falls through to consumer setup. Recovery: factory-reset and re-provision via QR.

- **One device at a time.** Bulk enrollment is not supported. Each device scans its own QR code in its own session (Android 10+).

  > **What breaks if misconfigured:** Bulk or queue-based enrollment — only the first device completes. Recovery: enroll each device individually.

- **Wi-Fi credential embedding (RealWear-specific).** RealWear devices cannot join Wi-Fi interactively during enrollment. The QR payload MUST include Wi-Fi credentials (SSID + password / EAP config). See [RealWear (confirmed GA)](#realwear-confirmed-ga) above.

  > **What breaks if misconfigured:** Wi-Fi credentials absent from the QR payload — the device cannot reach the Intune enrollment server; enrollment hangs. Recovery: regenerate QR with Wi-Fi embedded; factory-reset; re-scan.

## Prerequisites and Licensing

AOSP enrollment in Intune requires an Intune tenant with Android enrollment enabled, device hardware on the [MS Learn supported-devices list](https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices) at the required minimum firmware, and (for RealWear) Wi-Fi credentials available for QR-payload embedding.

**Intune licensing:** Intune Plan 1 is sufficient for baseline AOSP enrollment and core device management. Intune Suite / Plan 2 may be required for advanced capabilities (Remote Help, specialty-device management, Advanced Analytics with AOSP devices). Verify against [Microsoft Intune licensing](https://learn.microsoft.com/en-us/intune/fundamentals/intune-plans-and-pricing) at execute time. `[MEDIUM: research inference, last_verified 2026-04-23]`

<a id="deferred-content"></a>
## Deferred Content

The following AOSP content is tracked for v1.4.1 and out of scope for v1.4:

| Topic | Current state in v1.4 | Target | Rationale |
|---|---|---|---|
| Per-OEM enrollment steps (non-RealWear) | Stub lists OEMs; defers mechanics | v1.4.1 | Sparse public docs; speculative content would stale fast |
| AOSP user-associated enrollment | Mentioned as mode class only | v1.4.1 | OEM matrix must firm up first |
| AOSP userless (shared-device) enrollment | Mentioned as mode class only | v1.4.1 | Per-OEM mechanics gate admin-guide depth |
| AOSP L1 triage runbook | Not in v1.4 scope | v1.4.1 | Specialty class; volume-low; L2 routing current |
| AOSP L2 investigation runbook | Not in v1.4 scope | v1.4.1 | Awaits per-OEM failure-mode catalog |
| AOSP per-OEM behavioral failure catalog | Not written | v1.4.1 | Depends on OEM matrix + field evidence |
| Intune Plan 2 / Suite per-OEM licensing table | Stub-level statement only | v1.4.1 | Microsoft licensing guidance is evolving |

## See Also

- [Android Enterprise Admin Setup Overview](00-overview.md)
- [Managed Google Play Binding](01-managed-google-play.md)
- [Zero-Touch Portal Configuration](02-zero-touch-portal.md)
- [Android Enterprise Provisioning Glossary — AOSP](../_glossary-android.md#aosp)
- [Android Enterprise Enrollment Overview — AOSP](../android-lifecycle/00-enrollment-overview.md#aosp)
- [Android Provisioning Methods Matrix](../android-lifecycle/02-provisioning-methods.md)
- [MS Learn — AOSP Supported Devices](https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices)

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-04-23 | Initial stub (Phase 39 scope) — 9-H2 whitelist; RealWear GA spotlight + 7-OEM non-RealWear enumeration; PITFALL-7 "use fully managed instead" framing; Wi-Fi credential embedding requirement; Platform note banner; deferred-content table. Full coverage deferred to v1.4.1 (AEAOSPFULL-04). | -- |
