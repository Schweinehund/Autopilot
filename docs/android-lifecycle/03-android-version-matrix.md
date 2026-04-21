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

## Version Breakpoint Details

Each breakpoint below documents a Google-driven behavior change that materially affects admin operations. Breakpoint content is sourced from Google Android Enterprise Help, Microsoft Learn, and Jason Bayton's Android Enterprise reference material (bayton.org). Verify `last_verified` frontmatter date before citing this file as authoritative; Phase 42 milestone audit re-validates against current sources.

<a id="android-11-breakpoint"></a>
### Android 11 — COPE NFC Provisioning Removed

**Affected modes:** COBO (no impact — QR / afw#setup / Zero-Touch still supported), COPE / WPCO (NFC and afw#setup paths removed).

**What changed:** Google removed NFC and DPC identifier (`afw#setup`) as valid provisioning methods for work profile on corporate-owned (COPE / WPCO) devices on Android 11+. The two paths silently stop working on Android 11+ devices; administrators who relied on NFC for COPE provisioning see provisioning handshake failures with no legacy-path fallback.

**Admin action required:** For COBO, no action — continue using QR, afw#setup, or Zero-Touch. For COPE / WPCO enrollments on Android 11+, migrate to QR or Zero-Touch (Google recommends WPCO as the successor pattern for the same use case). Documenting this migration path is Phase 36 scope (COBO admin guide includes a COPE migration note per AECOBO-02).

**References:**
- [Jason Bayton — Android 11 COPE changes](https://bayton.org/android/android-11-cope-changes/)
- [Microsoft Learn — Android Enterprise corporate-owned provisioning methods](https://learn.microsoft.com/en-us/intune/device-enrollment/android/ref-corporate-methods)
- [02-provisioning-methods.md](02-provisioning-methods.md) — per-method × per-mode version gating cells

<a id="android-12-breakpoint"></a>
### Android 12 — IMEI / Serial Removed from Corporate Identifiers (BYOD only)

**Affected modes:** BYOD Work Profile only. COBO, Dedicated, Zero-Touch Enrollment, and AOSP are unaffected.

**What changed:** Google removed IMEI / serial / MEID read access from personally-owned work profile devices on Android 12+. The practical impact: administrators can NO LONGER pre-mark Android 12+ personal devices as corporate via identifier upload — corporate identifiers work only on Android 11 and earlier for BYOD. COBO / Dedicated / ZTE / WPCO devices auto-mark as corporate at enrollment time (no identifier upload needed), so those modes are unchanged.

**Admin action required:** For BYOD tenants with corporate-identifier workflows, document Android 11 as the ceiling for pre-marking. Treat Android 12+ BYOD devices as personal-at-enrollment (they can still enroll; they cannot be pre-flagged as corporate via upload). See [Corporate Identifiers](../_glossary-android.md#corporate-identifiers) for the glossary entry.

**References:**
- [Microsoft Learn — Add corporate identifiers](https://learn.microsoft.com/en-us/intune/device-enrollment/add-corporate-identifiers)
- [Android Enterprise Provisioning Glossary — Corporate Identifiers](../_glossary-android.md#corporate-identifiers)

<a id="android-15-breakpoint"></a>
### Android 15 — Factory Reset Protection Hardening

**Affected modes:** COBO (re-enrollment after reset), Dedicated (re-provisioning), Zero-Touch Enrollment (re-enrollment). BYOD Work Profile is unaffected.

**What changed:** On Android 15, the OEM unlocking setting no longer affects the reset process — after a hard reset, Enterprise Factory Reset Protection (EFRP) is always enforced. FRP now triggers on more reset pathways than on Android 13 / 14, meaning re-enrollment flows that worked on Android 13 / 14 can block on Android 15 unless EFRP is configured BEFORE devices are reset.

**Admin action required:** Configure Enterprise Factory Reset Protection (EFRP) via Intune policy as part of the COBO / Dedicated / ZTE enrollment profile BEFORE devices ship or before admin-initiated reset. Document the EFRP configuration step in the relevant admin guide (Phase 36 COBO and Phase 38 Dedicated per AECOBO-03 and AEDED-03). See [Google AE Help — Enable enterprise factory reset protection](https://support.google.com/work/android/answer/14549362).

**References:**
- [Google Android Enterprise Help — Enable enterprise factory reset protection](https://support.google.com/work/android/answer/14549362)
- [Jason Bayton — Android 15: What's new for enterprise?](https://bayton.org/blog/2024/10/actually-new-for-enterprise-android-15/)
- [Microsoft Learn — Factory Reset Protection Emails Not Enforced in Intune for Android](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-configuration/factory-reset-protection-emails-not-enforced)
