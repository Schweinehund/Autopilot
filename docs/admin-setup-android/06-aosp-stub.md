---
last_verified: 2026-04-23
review_by: 2026-06-22
audience: admin
platform: Android
applies_to: AOSP
---

# AOSP Device Management Stub — Intune

> **Platform gate:** AOSP device management in Intune — specialty AR/VR and wearable-scanner hardware with no GMS. Other Android Enterprise modes: [Android Admin Setup Overview](00-overview.md). iOS/iPadOS: [iOS Admin Guides](../admin-setup-ios/00-overview.md). macOS: [macOS Admin Guides](../admin-setup-macos/00-overview.md). Android terminology: [Glossary](../_glossary-android.md).

> **Platform note:** AOSP management is a distinct surface from Android Enterprise (COBO/BYOD/Dedicated/ZTE) — no GMS, no FCM push, no Managed Google Play. See [Android enrollment overview](../android-lifecycle/00-enrollment-overview.md#aosp).

<!-- The #### In Managed Google Play subsection is intentionally omitted.
     AOSP does not use Managed Google Play (no Google Mobile Services). -->

<!-- The #### In Zero-Touch portal subsection is intentionally omitted.
     AOSP does not use the Zero-Touch portal; AOSP enrollment is QR-only, one device at a time. -->

## Scope and Status

> ⚠️ **Stub in v1.4; full AOSP admin coverage planned for v1.4.1.** See [Deferred Content](#deferred-content) for gaps — per-OEM mechanics, user-associated vs userless, and AOSP L1/L2 runbooks are deferred.

RealWear is the confirmed GA case; non-RealWear admins are routed to Android Enterprise fully managed where GMS is available.

## What AOSP Is

AOSP is Android without GMS (no FCM, no MGP, no Google sign-in handshake). Devices report via `intunecdnpeasd.manage.microsoft.com` rather than GMS-path endpoints.

## When to Use AOSP

Use AOSP when the hardware is in one of the MS Learn supported classes:

- **AR/VR headsets** (DigiLens, HTC, Lenovo, Meta, PICO, RealWear, Vuzix)
- **Wearable scanners** (Zebra)

Do NOT use AOSP for mainstream phones/tablets. If GMS is present, use an Android Enterprise mode instead (COBO, BYOD, Dedicated, ZTE) — see the [Enrollment Overview](../android-lifecycle/00-enrollment-overview.md).

## Supported OEMs

Authoritative list: [MS Learn — AOSP Supported Devices](https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices). Re-verify at execute time.

<a id="realwear-confirmed-ga"></a>
### RealWear (confirmed GA)

RealWear HMT-1, HMT-1Z1, and Navigator 500 are confirmed GA for AOSP management in Intune. Per-OEM enrollment mechanics (including Wi-Fi credential embedding in the QR payload) are deferred to Phase 45.

`[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-23]`

<a id="other-aosp-supported-oems"></a>
### Other AOSP-Supported OEMs

Other OEMs on Microsoft's list (2026-04-23):

- **DigiLens** (ARGO)
- **HTC** (Vive Focus 3, Vive XR Elite, Vive Focus Vision)
- **Lenovo** (ThinkReality VRX)
- **Meta** (Quest 2/3/3s/Pro — select regions only for 2/3/Pro)
- **PICO** (4 Enterprise, Neo3 Pro/Eye)
- **Vuzix** (Blade 2, M400, M4000)
- **Zebra** (WS50)

**Per-OEM mechanics for non-RealWear OEMs deferred to v1.4.1. If GMS is present, use Android Enterprise fully managed — these OEMs are not supported under AOSP when GMS is available.**

## Enrollment Constraints

AOSP enrollment constraints (Android 10+):

- **QR-only.** NFC, DPC identifier (afw#setup), and Zero-Touch are NOT supported. *Breaks: silent fail / consumer-setup fallthrough. Recovery: factory-reset, re-provision via QR.*
- **One device at a time.** Bulk enrollment not supported. *Breaks: only first device completes. Recovery: enroll individually.*
- **Wi-Fi embedding (RealWear).** QR payload MUST include Wi-Fi credentials (SSID + password / EAP); devices cannot join Wi-Fi interactively during enrollment. *Breaks: device cannot reach Intune; enrollment hangs. Recovery: regenerate QR with Wi-Fi; factory-reset; re-scan.*

## Prerequisites and Licensing

Requires: Intune tenant with Android enrollment enabled; hardware on the [MS Learn list](https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices) at minimum firmware; (for RealWear) Wi-Fi credentials for QR embedding.

**Licensing:** Plan 1 covers baseline enrollment; Plan 2 / Suite may be required for Remote Help and advanced specialty-device management. `[MEDIUM: research inference, last_verified 2026-04-23]`

<a id="deferred-content"></a>
## Deferred Content

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
| 2026-04-24 | v1.4.1 Phase 43 AEAUDIT-04: body trimmed toward ~700-word target; RealWear deep content + per-OEM enrollment mechanics migrated to Phase 45 prep shell; PITFALL-7 "not supported under AOSP" framing preserved; 9-H2 whitelist + 8-OEM enumeration + deferred-content table intact. | -- |
