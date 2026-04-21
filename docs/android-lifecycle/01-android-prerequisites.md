---
last_verified: 2026-04-21
review_by: 2026-06-20
applies_to: all
audience: all
platform: Android
---

# Android Enterprise Prerequisites

> **Platform gate:** This guide covers Android Enterprise prerequisites: the tri-portal surface, GMS-vs-AOSP split, and Android 12+ corporate-identifier behavior. For iOS/iPadOS enrollment, see [iOS/iPadOS Enrollment Overview](../ios-lifecycle/00-enrollment-overview.md). For macOS ADE, see [macOS ADE Lifecycle](../macos-lifecycle/00-ade-lifecycle.md). For Android terminology, see the [Android Enterprise Provisioning Glossary](../_glossary-android.md).

## How to Use This Guide

This is a concept-only orientation. It is NOT a setup guide and NOT a mechanics guide — it explains why Android Enterprise requires coordination across three separate portals, which portals apply to which enrollment mode, and what changed in Android 12 for corporate identifiers. For the actual binding and portal-configuration steps, see [Managed Google Play binding](../admin-setup-android/01-managed-google-play.md) and [Zero-Touch portal configuration](../admin-setup-android/02-zero-touch-portal.md).

Audience: Intune admins new to Android Enterprise, and documentation authors planning downstream mode-specific guides. This doc does not describe the ownership × management-scope framework that selects a mode — for that, see the [Two Axes of Android Enterprise](00-enrollment-overview.md#two-axes-of-android-enterprise) narrative in the enrollment overview.

## Tri-Portal Surface

Android Enterprise management through Microsoft Intune spans three separate administrative portals, each owned by a different operator and each with a distinct scope. A fully functional Android deployment requires configuration across all three for Zero-Touch Enrollment, or across two for other GMS modes.

- **Intune admin center** (`endpoint.microsoft.com`, often shortened to "Intune admin center") — Microsoft's admin portal, and the only portal where enrollment profiles, app assignments, compliance policies, and device inventory live. This is the single pane of glass for day-two management regardless of enrollment mode.
- **Managed Google Play (MGP)** — Google's corporate-facing app store. MGP is the required binding endpoint for every GMS mode: without an MGP binding, no Android Enterprise app assignment, OEMConfig policy, or managed app distribution can reach a device. See [Managed Google Play](../_glossary-android.md#managed-google-play). *Cross-platform note:* MGP is the Android analog to Apple Volume Purchase Program (VPP) — both mediate between an EMM and a vendor app store — but the binding model and account requirements differ and should not be conflated.
- **Zero-Touch portal (ZT portal)** (`enterprise.google.com/android/zero-touch/customers`) — Google's device-provisioning registry, operated as a separate web property from MGP. ZT portal is where authorized resellers upload corporate-purchased devices and where admins configure the default DPC provisioning payload. See [Zero-Touch Enrollment](../_glossary-android.md#zero-touch-enrollment). *Cross-platform note:* ZT portal is the Android analog to Apple Automated Device Enrollment (ADE) via Apple Business Manager — both deliver zero-touch corporate provisioning — but Android ZT enrollment is gated by reseller relationship rather than direct purchase-to-MDM linkage.

## GMS vs. AOSP Split

Android Enterprise devices divide into two worlds by the presence of Google Mobile Services (GMS). GMS modes — [COBO (Fully Managed)](../_glossary-android.md#fully-managed), [BYOD Work Profile](../_glossary-android.md#work-profile), [Dedicated (COSU)](../_glossary-android.md#dedicated), and [Zero-Touch Enrollment](../_glossary-android.md#zero-touch-enrollment) — all depend on MGP binding for app and policy delivery. ZTE additionally depends on ZT portal configuration for the pre-first-boot enrollment payload.

[AOSP](../_glossary-android.md#dpc) mode (open-source Android on devices without certified GMS) uses neither portal. AOSP devices are specialty hardware — RealWear HMT, Zebra purpose-built scanners, Pico and HTC VIVE Focus XR headsets, Meta Quest for Business — and enroll through the [Android Management API](../_glossary-android.md#amapi) (AMAPI) directly without MGP or ZT involvement. See the [AOSP stub](../admin-setup-android/06-aosp-stub.md) (authored in Phase 39) for AOSP details; this document does not deep-dive AOSP.

## Portal Dependencies by Mode

- **COBO (Fully Managed)** — MGP binding required
- **BYOD Work Profile** — MGP binding required
- **Dedicated (COSU)** — MGP binding required
- **Zero-Touch Enrollment (ZTE)** — MGP binding required AND ZT portal configuration required
- **AOSP** — Neither MGP nor ZT portal; OEM-gated via AMAPI; see [Phase 39 AOSP stub](../admin-setup-android/06-aosp-stub.md)

For provisioning method support per mode (NFC, QR, afw#setup, Zero-Touch), see [Android Provisioning Methods](02-provisioning-methods.md). For Android OS minimums per mode, see [Android Version Matrix](03-android-version-matrix.md).

## Android 12+ Corporate Identifiers

Starting with Android 12, IMEI and serial number are no longer accessible for pre-marking personally-owned work profile devices as corporate. Admins who relied on identifier upload for BYOD WP pre-marking must use asset tags or accept that Android 12+ BYOD WP devices will show as Personal ownership until enrollment completes. See [Android Version Matrix](03-android-version-matrix.md#android-12-corporate-identifiers) for the full version-gate detail.

What still works on Android 12+: COBO, Dedicated (COSU), and WPCO modes continue to auto-mark devices as corporate at enrollment without any pre-upload step, because ownership is established by the provisioning flow itself rather than by hardware-identifier lookup. Asset tag — an admin-uploaded custom string rather than a hardware-derived identifier — also remains functional on Android 12+ BYOD WP devices and is the documented fallback when BYOD pre-marking is required.

## See Also

- [Android Enterprise Enrollment Overview](00-enrollment-overview.md) — five-mode comparison, ownership × management-scope axes
- [Android Provisioning Methods](02-provisioning-methods.md) — method support per mode
- [Android Version Matrix](03-android-version-matrix.md#android-12-corporate-identifiers) — full version-gate detail for Android 12 identifier removal
- [Managed Google Play binding](../admin-setup-android/01-managed-google-play.md) — MGP binding mechanics (Phase 35)
- [Zero-Touch portal configuration](../admin-setup-android/02-zero-touch-portal.md) — ZT portal mechanics (Phase 35)
- [Android Enterprise Provisioning Glossary](../_glossary-android.md) — [Managed Google Play](../_glossary-android.md#managed-google-play), [Zero-Touch Enrollment](../_glossary-android.md#zero-touch-enrollment), [DPC](../_glossary-android.md#dpc)

| Date | Change | Author |
|------|--------|--------|
| 2026-04-21 | Initial version — concept-only orientation to tri-portal surface, GMS/AOSP split, Android 12+ identifiers | -- |
