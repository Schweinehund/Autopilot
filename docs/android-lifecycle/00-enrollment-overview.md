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
- **L2 Desktop Engineering:** Use the [Two Axes of Android Enterprise](#two-axes-of-android-enterprise) section to understand ownership × management-scope gating; follow the [For Admins Familiar with iOS](#for-admins-familiar-with-ios) section if your mental model is iOS supervision.
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

## For Admins Familiar with iOS

## Enrollment Mode Details

## See Also
