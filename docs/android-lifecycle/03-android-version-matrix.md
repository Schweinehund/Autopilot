---
last_verified: 2026-04-25
review_by: 2026-06-24
applies_to: both
audience: admin
platform: Android
phase_46_wave2_retrofit: 2026-04-25
---

# Android Version Matrix

> **Platform gate:** This reference shows the minimum Intune-supported Android OS per enrollment mode and three notable Android version breakpoints (Android 11 COPE NFC removal, Android 12 corporate-identifier IMEI/serial removal, Android 15 FRP hardening) plus policy-gated non-version breakpoints (Play Integrity attestation cutover January 2025, AMAPI migration for BYOD April 2025).
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
| BYOD Work Profile | Android 5.0 (practical: Android 8+) | Android 9: built-in QR reader; Android 12: IMEI/serial removed from corporate identifiers; [Android 15: Private Space unsupported](#android-15-private-space-breakpoint) |
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
<a id="android-12-corporate-identifiers"></a>
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

<a id="android-15-private-space-breakpoint"></a>
### Android 15 — Private Space (Personal-Side, Unmanageable)

**Affected modes:** All modes — Private Space is a personal-side feature outside the Intune MDM management surface (informational, not an admin lever).

**What changed:** On Android 15, Google introduced **Private Space**, a user-controlled hidden profile partition on the personal side of the device. Users can hide apps, accounts, and data inside Private Space; the partition is locked behind a separate authentication factor and is invisible to OS-level inventory queries. Private Space coexists with the work profile on COPE / WPCO and BYOD modes but lives on the personal side of the profile boundary, not within the work-profile container.

**Admin action required:** None — Private Space is an OS-level personal-side feature without an admin policy lever in Intune. **Intune** cannot manage Private Space content, visibility, or installed apps on COPE, COBO, BYOD, or any other Android Enterprise mode. Admins should adjust user-facing privacy messaging to acknowledge that Private Space content is outside IT visibility regardless of enrollment mode. (Applies to Android 15.0+.)

> **EMM-tier nuance:** AMAPI-native EMMs may apply application allowlist/blocklist policies that originate at the parent profile within Private Space on COPE deployments per Google AMAPI behavior; this is outside Intune's customDPC management surface. [MEDIUM: Bayton Private Space article, last_verified: 2026-04-25]

**References:**
- [Microsoft Learn — Set up Android Enterprise corporate-owned work profile (Limitations)](https://learn.microsoft.com/en-us/intune/device-enrollment/android/setup-corporate-work-profile)
- [Bayton — What is Android 15 Private Space?](https://bayton.org/android/what-is-android-15-private-space/)
- [_glossary-android.md#private-space](../_glossary-android.md#private-space) — glossary canonical entry

## Non-Version Breakpoints

The following drift events are NOT gated by Android API level — they are policy-gated or temporally-gated by Google or Microsoft changes. Document them here alongside version breakpoints so admins have a single drift-surface to consult.

### SafetyNet → Play Integrity (January 2025)

Google turned off SafetyNet Attestation API in January 2025. [Play Integrity API](../_glossary-android.md#play-integrity) is the successor. Intune compliance UI now uses "Play Integrity verdict" terminology — three verdict levels are returned: **Basic integrity**, **Basic + Device integrity**, and **Strong integrity** (which requires hardware-backed security such as a trusted execution environment or strongbox).

**Admin action required:** Update any Android compliance policy references from the legacy attestation name to "Play Integrity." All Phase 34 and later Android documentation uses Play Integrity terminology exclusively; there is no fallback to the legacy API on any Android device today. Compliance content ships with Phase 38 (Dedicated) and [L2 investigation — Play Integrity failure troubleshooting](../l2-runbooks/21-android-compliance-investigation.md#cause-a-play-integrity-verdict-failure).

**References:**
- [Google Android Developers — Play Integrity API overview](https://developer.android.com/google/play/integrity)

### AMAPI Migration for BYOD (April 2025)

Microsoft migrated Android personally-owned work profile (BYOD Work Profile) management to AMAPI — the [Android Management API](../_glossary-android.md#amapi) — in April 2025. Custom OMA-URI profiles for BYOD Work Profile are no longer supported. Wi-Fi configuration now requires certificate-based authentication (username / password Wi-Fi is broken on post-migration BYOD devices). The device-side management app changed from Company Portal to the Microsoft Intune app; both apps may still be installed, but the Intune app is the primary management surface for BYOD post-migration.

**Affected modes:** BYOD Work Profile only. COBO, Dedicated, Zero-Touch Enrollment, and AOSP are NOT affected.

**Admin action required:** If operating a BYOD tenant with legacy custom OMA-URI profiles, audit and migrate to AMAPI-compatible configuration policies. Wi-Fi profiles must use certificate-based authentication (802.1X with certificate). The AMAPI migration callout is Phase 37 BYOD admin guide scope per AEBYOD-03.

**References:**
- [Microsoft Tech Community — Android Enterprise personally-owned work profile AMAPI migration](https://techcommunity.microsoft.com/)

## See Also

- [Android Enterprise Enrollment Overview](00-enrollment-overview.md) — two-axes model and 5-mode comparison with cross-references to this matrix for mode-level minimums
- [Android Provisioning Methods](02-provisioning-methods.md) — mode × method × version cells; cite this file for method-level version gating, NOT for mode-level Intune minimums
- [Android Enterprise Provisioning Glossary](../_glossary-android.md) — definitions for [Play Integrity](../_glossary-android.md#play-integrity), [AMAPI](../_glossary-android.md#amapi), [COPE](../_glossary-android.md#cope), [WPCO](../_glossary-android.md#wpco), [Corporate Identifiers](../_glossary-android.md#corporate-identifiers), [Fully Managed](../_glossary-android.md#fully-managed)
