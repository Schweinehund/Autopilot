---
last_verified: 2026-04-21
review_by: 2026-06-20
applies_to: both
audience: admin
platform: Android
---

# Android Version Matrix

> **Platform gate:** This reference shows the minimum Intune-supported Android OS per enrollment mode and three notable Android version breakpoints (Android 11 COPE NFC removal, Android 12 corporate-identifier IMEI/serial removal, Android 15 FRP hardening) plus policy-gated non-version breakpoints (SafetyNet → Play Integrity January 2025, AMAPI migration for BYOD April 2025).
> For provisioning-method version availability per mode × method, see [02-provisioning-methods.md](02-provisioning-methods.md). For Android terminology, see the [Android Enterprise Provisioning Glossary](../_glossary-android.md).

This matrix captures two distinct version axes:

- **Intune Minimum OS** is the minimum Android API level that Intune supports for management of a device in the given enrollment mode. It is what Microsoft enforces at enrollment time.
- **Notable Version Breakpoints** are Android-platform-level behavior changes that materially affect admin operations for the mode — typically Google feature removals, new hardening behaviors, or corporate-identifier restrictions.

These two axes are related but not equivalent. Per-method × per-mode version gating (e.g., "NFC requires Android 8+; QR built-in reader requires Android 9+") lives in [02-provisioning-methods.md](02-provisioning-methods.md) cells, not this matrix. If you are authoring admin guidance that references a specific Android version requirement, cite THIS matrix for mode-level Intune minimums and [02-provisioning-methods.md](02-provisioning-methods.md) for method-level gates. Do not restate version numbers inline in admin guides — that creates drift-surface (Pitfall 1).

<a id="cobo"></a>
<a id="byod"></a>
<a id="dedicated"></a>
<a id="zte"></a>
<a id="aosp"></a>

| Mode | Intune Minimum OS | Notable Version Breakpoints |
|------|-------------------|----------------------------|
| Fully Managed (COBO) | Android 10.0 | Android 11: enrollment-time grouping; Android 15: FRP hardening |
| BYOD Work Profile | Android 5.0 (practical: Android 8+) | Android 9: built-in QR reader; Android 12: IMEI/serial removed from corporate identifiers; Android 15: Private Space unsupported |
| Dedicated (COSU) | Android 8.0 | Android 9: built-in QR reader; Android 15: FRP hardening on re-provisioning |
| Zero-Touch Enrollment | Android 8.0 (Oreo) | Android 15: FRP hardening affects re-enrollment flows |
| AOSP | Varies by OEM firmware | Not an Android API-level gate — OEM firmware-specific; see [Phase 39 AOSP stub](../admin-setup-android/06-aosp-stub.md) |
