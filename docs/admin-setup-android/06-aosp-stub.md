---
last_verified: 2026-04-25
review_by: 2026-06-24
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

> **AOSP per-OEM coverage SHIPPED in v1.4.1 (Phase 45).** See [aosp-oem-matrix.md](../reference/aosp-oem-matrix.md) for the cross-OEM capability matrix and per-OEM admin guides 09-13.

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

RealWear HMT-1, HMT-1Z1, and Navigator 500 are confirmed GA for AOSP management in Intune. Per-OEM enrollment mechanics: see [09-aosp-realwear.md](09-aosp-realwear.md) (including the Wi-Fi-credentials-embedded-in-QR REQUIRED walkthrough).

`[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]`

<a id="other-aosp-supported-oems"></a>
### Other AOSP-Supported OEMs

Other OEMs on Microsoft's list (2026-04-25):

- **DigiLens** (ARGO) — per-OEM coverage deferred to a future milestone.
- **HTC** (Vive Focus 3, Vive XR Elite, Vive Focus Vision) — per-OEM enrollment mechanics: see [12-aosp-htc-vive-focus.md](12-aosp-htc-vive-focus.md).
- **Lenovo** (ThinkReality VRX) — per-OEM coverage deferred to a future milestone.
- **Meta** (Quest 2/3/3s/Pro — select regions only for 2/3/Pro) — per-OEM enrollment mechanics: see [13-aosp-meta-quest.md](13-aosp-meta-quest.md).
- **PICO** (4 Enterprise, Neo3 Pro/Eye) — per-OEM enrollment mechanics: see [11-aosp-pico.md](11-aosp-pico.md).
- **Vuzix** (Blade 2, M400, M4000) — per-OEM coverage deferred to a future milestone.
- **Zebra** (WS50) — per-OEM enrollment mechanics: see [10-aosp-zebra.md](10-aosp-zebra.md).

**For the 5 OEMs shipped in v1.4.1 (RealWear, Zebra, PICO, HTC, Meta Quest), follow the per-OEM admin guides linked above. For the remaining OEMs (DigiLens, Lenovo, Vuzix), per-OEM mechanics are deferred to a future milestone. If GMS is present, use Android Enterprise fully managed — these OEMs are not supported under AOSP when GMS is available.**

## Enrollment Constraints

AOSP enrollment constraints (Android 10+):

- **QR-only.** NFC, DPC identifier (afw#setup), and Zero-Touch are NOT supported. *Breaks: silent fail / consumer-setup fallthrough. Recovery: factory-reset, re-provision via QR.*
- **One device at a time.** Bulk enrollment not supported. *Breaks: only first device completes. Recovery: enroll individually.*
- **Wi-Fi embedding (RealWear).** QR payload MUST include Wi-Fi credentials (SSID + password / EAP); devices cannot join Wi-Fi interactively during enrollment. *Breaks: device cannot reach Intune; enrollment hangs. Recovery: regenerate QR with Wi-Fi; factory-reset; re-scan.*

## Prerequisites and Licensing

Requires: Intune tenant with Android enrollment enabled; hardware on the [MS Learn list](https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices) at minimum firmware; (for RealWear) Wi-Fi credentials for QR embedding.

**Licensing:** Plan 1 covers baseline enrollment; Plan 2 / Suite may be required for Remote Help and advanced specialty-device management. `[MEDIUM: research inference, last_verified 2026-04-25]`

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
| 2026-04-25 | Phase 45 AEAOSPFULL-09: Deferred Content table COLLAPSED — per-OEM coverage NOW SHIPPED in 09-13 admin docs + aosp-oem-matrix.md + L1 runbook 29 + L2 runbook 23. PITFALL-7 framing + 9-H2 whitelist + 8-OEM enumeration + Platform note PRESERVED per D-24 LOCKED. | -- |
