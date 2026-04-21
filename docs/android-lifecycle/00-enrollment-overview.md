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

This guide describes all five Android Enterprise enrollment modes and establishes the two orthogonal axes (ownership × management scope) that govern what each mode can manage.

- **L1 Service Desk:** Use the [Enrollment Mode Comparison](#enrollment-mode-comparison) table to identify the enrollment mode, then read the per-mode H3 section for use-case confirmation.
- **L2 Desktop Engineering:** Use the [Two Axes of Android Enterprise](#two-axes-of-android-enterprise) section to understand ownership × management-scope gating; follow the [For Admins Familiar with iOS](#for-admins-familiar-with-ios) section if your mental model comes from iOS enrollment paths.
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

Android Enterprise enrollment is defined by two orthogonal axes. Every deployment scenario lands at the intersection of an **ownership model** and a **management scope** — the five enrollment modes above are named combinations of these two axes, not independent categories.

**Axis 1 — Ownership Model.** Ownership determines who owns the hardware and therefore which management postures are legally and operationally acceptable:

- **Corporate-owned:** The organization purchases or provides the device. Full-device management is acceptable, and the admin controls the entire provisioning surface from first boot.
- **Personally-owned:** The user owns the device. The organization provisions only a containerized work profile; the user's personal side remains private and unmanaged.

**Axis 2 — Management Scope.** Management scope determines what the admin can actually configure on the device and which data the admin can see:

- **Fully managed:** The entire device is managed — all apps, all settings, all restrictions. No personal profile exists. This is the Android Enterprise high-control posture.
- **Work profile (containerized):** Only the work-profile container is managed. The admin sees work-profile telemetry; the personal side is invisible and untouched.
- **Dedicated (COSU):** The device runs a locked, single-purpose or multi-app kiosk experience via Managed Home Screen. End-user flexibility is intentionally constrained for scenarios like signage or shared-shift devices.
- **AOSP (unmanaged — no GMS):** The device runs Android Open Source Project builds without Google Mobile Services. Management is OEM-gated and fundamentally narrower than any GMS-based mode.

The five enrollment modes in the table above are combinations of these two axes. AOSP is structurally outside both — it lacks Managed Google Play binding entirely — see the AOSP mode detail below for why it does not fit cleanly on either axis.

## For Admins Familiar with iOS

Android's Fully Managed mode is the closest analog to iOS Supervision, but the mapping is partial — iOS supervision is a permanent per-device state gating ~60 restriction settings; Android Fully Managed is an ownership-mode designation. See [_glossary-android.md#fully-managed](../_glossary-android.md#fully-managed) for disambiguation.

"Supervision" is an iOS/iPadOS concept and is not an Android management term — Android does not use "supervised" or "unsupervised" as device states. See [_glossary-macos.md#supervision](../_glossary-macos.md#supervision) for the full iOS supervision definition if you need deeper context. In the opposite direction, Android **BYOD Work Profile** is closer in intent to **iOS account-driven User Enrollment** than to anything involving supervision: both isolate corporate data inside a container on a personally-owned device while leaving the personal side private. Do not map BYOD Work Profile onto "Device Enrollment (unsupervised)" — the privacy containment model differs materially.

## Enrollment Mode Details

## See Also
