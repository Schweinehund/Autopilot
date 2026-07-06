---
doc_id: RE-145
status: Approved
owner: Intune Admin Lead
doc_type: Reference
last_verified: 2026-04-25
review_by: 2026-06-24
audience: admin
platform: Android
applies_to: AOSP
---

**Platform:** Android · **Doc Type:** Reference · **Doc ID:** RE-145 · **Status:** Approved

# Intune: AOSP OEM Matrix — RealWear / Zebra / Pico / HTC / Meta Quest

## Summary

This reference document is a capability matrix comparing Microsoft Intune support across the five specialty-hardware OEMs enrolled under AOSP: RealWear, Zebra, Pico, HTC, and Meta Quest. It covers hardware scope, enrollment method and Wi-Fi embedding, vendor portals and licensing tiers, and Intune AOSP mode support for each OEM. The primary audience is Intune administrators configuring AOSP-managed specialty hardware.

This matrix compares Microsoft Intune support across the 5 specialty-hardware OEMs in scope for AOSP enrollment: RealWear, Zebra, Pico, HTC, and Meta Quest. The matrix is organized capability-first; columns = capability dimensions, rows = OEMs. For per-OEM admin guides see [09-aosp-realwear.md](../admin-setup-android/09-aosp-realwear.md), [10-aosp-zebra.md](../admin-setup-android/10-aosp-zebra.md), [11-aosp-pico.md](../admin-setup-android/11-aosp-pico.md), [12-aosp-htc-vive-focus.md](../admin-setup-android/12-aosp-htc-vive-focus.md), [13-aosp-meta-quest.md](../admin-setup-android/13-aosp-meta-quest.md). For the broader Android capability landscape (modes, mode-vs-feature mapping) see [Android Capability Matrix](android-capability-matrix.md).

## Scope

> ⚠️ **AOSP scope reminder.** Devices listed in this matrix are supported under AOSP because they have no GMS. If GMS is present on a target device, use Android Enterprise fully managed instead — these OEMs are not supported under AOSP when GMS is available. (Phase 39 PITFALL-7 framing.)

## Hardware Scope

The table below lists the supported models, minimum firmware, and device type for each of the five AOSP OEMs.

| OEM | Models | Minimum Firmware | Type |
|-----|--------|------------------|------|
| RealWear | HMT-1 / HMT-1Z1 / Navigator 500 | HMT-1 11.2; HMT-1Z1 11.2; Nav 500 1.1 | AR/VR Headset |
| Zebra | WS50 | 11-49-15.00 | Wearable Scanner |
| Pico | PICO 4 Enterprise / PICO Neo3 Pro/Eye | PUI 5.6.0 / PUI 4.8.19 | AR/VR Headset |
| HTC | Vive Focus 3 / XR Elite / Focus Vision | 5.2 - 5.0.999.624 / 4.0 - 1.0.999.350 / 7.0.999.159 | AR/VR Headset |
| Meta | Quest 2 / 3 / 3s / Pro | v49 / v59 / v71 / v49 [^meta-volatility] | AR/VR Headset |

> **Table summary:** This table lists supported models and minimum firmware for all 5 AOSP OEMs; all are AR/VR headsets except Zebra's wearable scanner.

## Enrollment Method and Wi-Fi Embedding

The table below compares the AOSP enrollment method and Wi-Fi credential embedding requirement for each OEM.

| OEM | Enrollment Method | Wi-Fi Embedding |
|-----|-------------------|-----------------|
| RealWear | QR-only AOSP | REQUIRED (WPA/WPA2-PSK/WPA3 only — NOT EAP) |
| Zebra | QR-only AOSP + OEMConfig APK push | OPTIONAL |
| Pico | QR-only AOSP | OPTIONAL |
| HTC | QR-only AOSP (Settings > Advanced > MDM setup > QR code) | OPTIONAL |
| Meta Quest | QR-only AOSP + Meta for Work portal [^meta-volatility] | OPTIONAL |

> **Table summary:** This table shows all 5 OEMs use QR-only AOSP enrollment; RealWear is the only OEM where Wi-Fi embedding is REQUIRED rather than optional.

## Vendor Portals and Licensing

The table below shows each OEM's optional vendor portal and the minimum Intune plan tier required.

| OEM | Vendor Portal | Intune Plan Tier |
|-----|---------------|------------------|
| RealWear | RealWear Cloud (OPTIONAL) | Plan 2 OR Suite |
| Zebra | None (StageNow OPTIONAL) | Plan 1 |
| Pico | PICO Business Suite (OPTIONAL) | Plan 2 OR Suite |
| HTC | None | Plan 2 OR Suite |
| Meta Quest | Meta for Work / Meta Horizon Managed Services [^meta-volatility] | Plan 2 OR Suite |

> **Table summary:** This table shows Zebra is the only OEM requiring just Intune Plan 1; the remaining four OEMs require Plan 2 or Suite.

## Intune AOSP Mode

The table below shows whether each OEM supports user-associated and userless Intune AOSP enrollment modes.

| OEM | User-Associated | Userless |
|-----|-----------------|----------|
| RealWear | Yes | Yes |
| Zebra | Yes | Yes |
| Pico | Yes | Yes |
| HTC | Yes | Yes |
| Meta Quest | Yes | Yes |

> **Table summary:** This table confirms all 5 AOSP OEMs support both user-associated and userless Intune enrollment modes uniformly.

[^meta-volatility]: As of February 20, 2026, Meta no longer sells commercial Quest SKUs. HMS subscriptions are free through January 4, 2030 (maintenance mode). 4-portal pattern remains; Intune-direct AOSP enrollment is the vendor-independent fallback. See [13-aosp-meta-quest.md#meta-horizon-subscription-status](../admin-setup-android/13-aosp-meta-quest.md#meta-horizon-subscription-status). Plan-time re-verification gate: [meta.com/blog/an-update-on-meta-for-work](https://www.meta.com/blog/an-update-on-meta-for-work).

## See Also

- [AOSP Stub](../admin-setup-android/06-aosp-stub.md) — AOSP scope context
- [Android Capability Matrix](android-capability-matrix.md) — Android mode-vs-feature mapping; this matrix's `#deferred-full-aosp-capability-mapping` anchor links to this AOSP OEM matrix per AEAOSPFULL-09
- [09 RealWear](../admin-setup-android/09-aosp-realwear.md) — RealWear admin guide
- [10 Zebra](../admin-setup-android/10-aosp-zebra.md) — Zebra admin guide
- [11 Pico](../admin-setup-android/11-aosp-pico.md) — Pico admin guide
- [12 HTC](../admin-setup-android/12-aosp-htc-vive-focus.md) — HTC VIVE Focus admin guide
- [13 Meta Quest](../admin-setup-android/13-aosp-meta-quest.md) — Meta Quest admin guide

## Source Attribution

Per-OEM source-confidence pins for the data points across the four capability sub-tables above (D-15: pins live OUTSIDE tables to keep cells literal-strings only per D-16).

- RealWear: `[HIGH: MS Learn AOSP supported devices + support.realwear.com, last_verified 2026-04-25]`
- Zebra: `[HIGH: MS Learn oemconfig-zebra-android-devices + techdocs.zebra.com, last_verified 2026-04-25]`
- Pico: `[HIGH: MS Learn + business.picoxr.com, last_verified 2026-04-25]` (license tier MEDIUM per RESEARCH.md §1)
- HTC: `[HIGH: MS Learn + vive.com support, last_verified 2026-04-25]`
- Meta Quest: `[HIGH: MS Learn + meta.com/blog/an-update-on-meta-for-work, last_verified 2026-04-25]`

**Per-OEM Intune AOSP Mode (sub-table #4) — section-level confidence pin per W-3:** `[MEDIUM: AR/VR pattern inference + MS Learn dual-mode AOSP support, last_verified 2026-04-25] — per-OEM verification deferred to v1.5 if mode-specific failure modes emerge in field use`. This single section-level pin replaces per-cell MEDIUM markers across the 10 mode cells; addresses RESEARCH.md Open Question §1 (per-OEM mode enumeration) at the section level rather than scattering markers inline.

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-06 | v1.15 EEE reformat — content not re-reviewed | — |
| 2026-04-25 | Initial version (Phase 45 AEAOSPFULL-06) — 4 H2 sub-tables in fixed order (Hardware Scope / Enrollment Method and Wi-Fi Embedding / Vendor Portals and Licensing / Intune AOSP Mode); 5-OEM rows (RealWear / Zebra / Pico / HTC / Meta Quest); Meta-row footnote `[^meta-volatility]` for Feb 20, 2026 Meta Horizon wind-down volatility per D-14; `## Source Attribution` H2 per D-15 (per-OEM pins outside tables; W-3 section-level mode-confidence pin); cell-value rules literal-strings only per D-16 (no `+` notation); single `## Scope` H2 at top with PITFALL-7 framing once per D-13; `## Version History` H2 (NOT `## Changelog`) per sibling matrix convention | -- |
