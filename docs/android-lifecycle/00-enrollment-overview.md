---
last_verified: 2026-04-21
review_by: 2026-06-20
applies_to: all
audience: all
platform: Android
---

# Android Enterprise Enrollment Overview

> **Platform gate:** This guide covers Android Enterprise enrollment modes in Microsoft Intune. For iOS/iPadOS enrollment, see [iOS/iPadOS Enrollment Overview](../ios-lifecycle/00-enrollment-overview.md). For macOS ADE, see [macOS ADE Lifecycle](../macos-lifecycle/00-ade-lifecycle.md). For Windows Autopilot, see [Autopilot Lifecycle Overview](../lifecycle/00-overview.md). For Android terminology, see the [Android Enterprise Provisioning Glossary](../_glossary-android.md).

## How to Use This Guide

This guide describes all five Android Enterprise enrollment modes and the two orthogonal axes (ownership × management scope) that govern what each mode can manage.

- **L1 Service Desk:** Use the [Enrollment Mode Comparison](#enrollment-mode-comparison) table to identify the mode, then read the per-mode H3 for use-case confirmation.
- **L2 Desktop Engineering:** Use [Two Axes of Android Enterprise](#two-axes-of-android-enterprise) for ownership × management-scope gating; follow [For Admins Familiar with iOS](#for-admins-familiar-with-ios) if your mental model comes from iOS enrollment paths.
- **Intune Admins:** Use the per-mode sections for selection guidance and links to admin setup guides (available from Phase 35 onward).

## Enrollment Mode Comparison

| Mode | Ownership Model | Management Scope | Provisioning Surface | Appropriate Use Case |
|------|-----------------|------------------|----------------------|----------------------|
| Zero-Touch Enrollment (ZTE) | Corporate-owned | Fully managed (or Dedicated via portal) | Zero-Touch portal + Intune (see [02-provisioning-methods.md#zero-touch](02-provisioning-methods.md#zero-touch)) | Corporate-scale automated enrollment via reseller; devices enroll on first boot |
| Fully Managed (COBO) | Corporate-owned | Fully managed | QR, NFC, afw#setup, Zero-Touch (see [02-provisioning-methods.md#cobo](02-provisioning-methods.md#cobo)) | Corporate single-user device; maximum admin control; no personal profile |
| BYOD Work Profile | Personally-owned | Work profile (containerized) | Company Portal (user-initiated) — see [02-provisioning-methods.md#byod-work-profile](02-provisioning-methods.md#byod-work-profile) | BYOD with data separation; user keeps personal side; admin sees only work-profile telemetry |
| Dedicated (COSU) | Corporate-owned | Dedicated (COSU — locked kiosk) | QR, NFC, afw#setup, Zero-Touch (see [02-provisioning-methods.md#dedicated-cosu](02-provisioning-methods.md#dedicated-cosu)) | Kiosk, digital signage, shared shift devices with Managed Home Screen |
| AOSP | Corporate-owned (specialty) | AOSP (unmanaged — no GMS) | QR only, OEM-gated, out-of-GMS — see [02-provisioning-methods.md#aosp](02-provisioning-methods.md#aosp) | AR/VR headsets, rugged specialty devices without Google Mobile Services (see Phase 39 stub) |

## Two Axes of Android Enterprise

Android Enterprise enrollment is defined by two orthogonal axes: **ownership model** × **management scope**. The five modes above are named combinations of these axes.

**Axis 1 — Ownership Model.** Who owns the hardware, which governs acceptable management postures:

- **Corporate-owned:** The organization provides the device; full-device management is acceptable from first boot.
- **Personally-owned:** The user owns the device; the organization provisions only a containerized work profile and the personal side remains private.

**Axis 2 — Management Scope.** What the admin can configure and what data the admin can see:

- **Fully managed:** The whole device is managed — all apps, settings, restrictions. No personal profile.
- **Work profile (containerized):** Only the work-profile container is managed; personal side is invisible to the admin.
- **Dedicated (COSU):** Device is locked to a curated app set via Managed Home Screen for kiosk scenarios.
- **AOSP (unmanaged — no GMS):** Device runs Android without Google Mobile Services; management is OEM-gated and narrower than any GMS-based mode.

AOSP is structurally outside both axes — it lacks Managed Google Play binding — see the AOSP detail below.

## For Admins Familiar with iOS

Android's Fully Managed mode is the closest analog to iOS Supervision, but the mapping is partial — iOS supervision is a permanent per-device state gating ~60 restriction settings; Android Fully Managed is an ownership-mode designation. See [_glossary-android.md#fully-managed](../_glossary-android.md#fully-managed) for disambiguation.

"Supervision" is not an Android management term — Android does not use "supervised" or "unsupervised" as device states; see [_glossary-macos.md#supervision](../_glossary-macos.md#supervision) for the iOS definition. In the opposite direction, Android BYOD Work Profile is closer in intent to iOS account-driven User Enrollment than to anything involving supervision — both isolate corporate data in a container on a personally-owned device while leaving the personal side private.

## Enrollment Mode Details

### Zero-Touch Enrollment (ZTE)

Zero-Touch Enrollment is Android's corporate-scale, reseller-mediated provisioning pipeline — the closest structural analog to Apple's Automated Device Enrollment. Devices purchased from a participating reseller are pre-registered against the organization's [Zero-Touch portal](../_glossary-android.md#zero-touch-enrollment) tenant; on first boot they contact the portal, match to the configured enrollment profile, and hand off to Intune for Fully Managed (or Dedicated) enrollment with no user steps. ZTE requires a one-time reseller relationship (Step 0) and a ZT tenant linked to Intune. On Samsung hardware, Zero-Touch and Knox Mobile Enrollment are mutually exclusive; v1.4 documents ZTE only, with KME deferred to v1.4.1. See `../admin-setup-android/02-zero-touch-portal.md` (Phase 35).

### Fully Managed (COBO)

Fully Managed — Corporate-Owned, Business-Only (COBO) — is Android Enterprise's highest-control posture. The entire device is managed, there is no personal profile, and the admin governs apps, settings, restrictions, OS update behavior, and certificates. All four provisioning methods are supported: QR, NFC, afw#setup (DPC identifier), and Zero-Touch. COBO fits single-user corporate devices that should carry no personal content; for the iOS mental-model bridge see the [For Admins Familiar with iOS](#for-admins-familiar-with-ios) section above. See `../admin-setup-android/03-fully-managed-cobo.md` (Phase 36).

### BYOD Work Profile

BYOD Work Profile is the personally-owned, work-profile-only mode — users keep their device and add a managed container that isolates corporate apps and data from the personal side. End users install the [Microsoft Intune app](../_glossary-android.md#byod) (the primary management surface post-2025) and complete provisioning through it; Intune sees only work-profile telemetry and can selectively wipe only the work container. **AMAPI migration (April 2025):** Microsoft moved personally-owned work-profile management to the Android Management API; custom OMA-URI profiles are no longer supported — configure via AMAPI-backed templates. See `../admin-setup-android/04-byod-work-profile.md` (Phase 37).

### Dedicated (COSU)

Dedicated — Corporate-Owned, Single-Use (COSU) — locks the device to a curated set of apps through Managed Home Screen (MHS), which replaces the default launcher. Scenarios include single-app and multi-app kiosks, digital signage, warehouse scanners, and Entra shared device mode for frontline workers. A critical configuration gate is the **MHS exit-PIN sync** requirement: the exit-PIN in the MHS app-configuration profile must match the exit-PIN in the parent device-restrictions profile, or admins are locked out of MHS settings on the device. Dedicated supports QR, NFC, afw#setup, and Zero-Touch. See `../admin-setup-android/05-dedicated-devices.md` (Phase 38).

### AOSP

AOSP — Android Open Source Project — is structurally different from every other mode here. AOSP devices run Android **without Google Mobile Services**: no Managed Google Play binding, no work profile, no GMS-backed management APIs. Only **QR provisioning is supported**, and only on OEMs that have implemented the AOSP management enrollment handshake (RealWear confirmed GA; full OEM matrix deferred to Phase 39 stub). AOSP fits AR/VR headsets, rugged specialty devices, and similar out-of-GMS hardware — never mainstream phones or tablets (use COBO, BYOD Work Profile, or Dedicated). v1.4 covers AOSP at stub depth; full coverage lands in v1.4.1. See `../admin-setup-android/06-aosp-stub.md` (Phase 39).

## See Also

- [Android Enterprise Provisioning Glossary](../_glossary-android.md) — for all 19 Android terms including [Fully Managed](../_glossary-android.md#fully-managed), [Work Profile](../_glossary-android.md#work-profile), and [Zero-Touch Enrollment](../_glossary-android.md#zero-touch-enrollment)
- [Android Provisioning Methods](02-provisioning-methods.md) — full mode × method matrix (NFC / QR / afw#setup / Zero-Touch) with Android version availability
- [Android Version Matrix](03-android-version-matrix.md) — minimum Intune-supported Android OS per mode and breakpoint callouts for Android 11, 12, 15
- [iOS/iPadOS Enrollment Overview](../ios-lifecycle/00-enrollment-overview.md) — cross-platform comparison for admins coming from iOS enrollment paths
- [Apple Provisioning Glossary](../_glossary-macos.md) — for iOS/macOS terminology including [supervision](../_glossary-macos.md#supervision)
