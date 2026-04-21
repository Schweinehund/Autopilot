---
last_verified: 2026-04-21
review_by: 2026-06-20
applies_to: both
audience: admin
platform: Android
---

# Android Provisioning Methods

> **Platform gate:** This reference matrix covers the four Android Enterprise provisioning methods supported in Microsoft Intune — NFC, QR code, DPC identifier (`afw#setup`), and Zero-Touch — across all five enrollment modes (Fully Managed COBO, BYOD Work Profile, Dedicated COSU, Zero-Touch Enrollment, AOSP).
> For iOS/iPadOS enrollment methods, see [iOS/iPadOS Enrollment Overview](../ios-lifecycle/00-enrollment-overview.md). For Android terminology, see the [Android Enterprise Provisioning Glossary](../_glossary-android.md).

This matrix is organized mode-first — readers locate their target enrollment mode (COBO, BYOD Work Profile, Dedicated, Zero-Touch Enrollment, AOSP) in the row list, then scan across to see which provisioning methods are supported and at which Android version. Cells carry both the support indicator and the version gate; the Notes column captures mode-level constraints that apply regardless of method (e.g., dual-SIM IMEI registration for COBO, Managed Home Screen exit-PIN sync for Dedicated, OEM firmware dependency for AOSP).

This is the SINGLE canonical provisioning-method reference for v1.4. Downstream admin guides in [admin-setup-android/](../admin-setup-android/) (Phase 35-39) reference filtered rows from this matrix via anchor links rather than duplicating the grid. If you are authoring a mode-specific admin guide, link to the appropriate row in this file rather than copying the matrix.

> **Samsung devices:** Knox Mobile Enrollment (KME) is mutually exclusive with Zero-Touch on the same Samsung device. Configure only one. KME is deferred to v1.4.1; see the [KME deferral note](#knox-mobile-enrollment-kme--deferred-to-v141) at the bottom of this page.
