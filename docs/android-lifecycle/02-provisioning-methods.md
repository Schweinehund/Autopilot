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

<a id="samsung-kme-mutual-exclusion"></a>
> **Samsung devices:** Knox Mobile Enrollment (KME) is mutually exclusive with Zero-Touch on the same Samsung device. Configure only one. KME is deferred to v1.4.1; see the [KME deferral note](#knox-mobile-enrollment-kme---deferred-to-v141) at the bottom of this page.

## Mode × Method Matrix

| Mode | NFC | QR | afw#setup | Zero-Touch | Notes |
|------|-----|-----|-----------|------------|-------|
| <a id="cobo"></a>Fully Managed (COBO) | ✓ (Android 8+; NFC tag with ≥ 888 bytes) | ✓ (Android 9+ built-in reader; Android 7-8 needs external QR reader app) | ✓ (all supported Android) | ✓ (Android 8+, via [Zero-Touch portal](https://enterprise.google.com/android/zero-touch/customers)) | Dual-SIM devices: register IMEI 1 only — see Phase 35 prerequisites. See also [`../_glossary-android.md#cobo`](../_glossary-android.md#cobo). |
| <a id="byod-work-profile"></a>BYOD Work Profile | ✗ | ✗ | ✗ | ✗ | Company Portal user-initiated enrollment only; no corporate provisioning methods apply. AMAPI migration April 2025 — Microsoft Intune app is the primary management surface post-migration. See [`../_glossary-android.md#byod`](../_glossary-android.md#byod). |
| <a id="dedicated-cosu"></a>Dedicated (COSU) | ✓ (Android 8+) | ✓ (Android 9+ built-in reader) | ✓ (all supported Android) | ✓ (Android 8+) | Managed Home Screen exit-PIN must sync between device-restrictions profile and MHS app config — see Phase 38 and [`../_glossary-android.md#managed-home-screen`](../_glossary-android.md#managed-home-screen). |
| <a id="zero-touch"></a>Zero-Touch Enrollment | — | — | — | ✓ (Android 8+, via portal) | ZT is itself a provisioning method — reseller relationship is Step 0; see Phase 35 `02-zero-touch-portal.md`. |
| <a id="aosp"></a>AOSP | ✗ | ✓ (Android 10+, one device at a time, Wi-Fi credentials embedded in QR for RealWear-class OEMs) | ✗ | ✗ | OEM firmware-specific; full OEM matrix deferred to v1.4.1 — see Phase 39 AOSP stub. |

## Per-Method Details

### NFC

Near-Field Communication provisioning uses an NFC tag (≥ 888 bytes) encoded with an Android Enterprise provisioning payload. An admin initially configures one "source" NFC tag; unenrolled (freshly reset) target devices receive the configuration by bumping against the tag. Android 8+ required. Not supported for BYOD Work Profile (personally-owned devices do not use corporate NFC flows) or AOSP (OEM-dependent). See [Android Glossary — DPC](../_glossary-android.md#dpc) for the policy-controller context.

### QR

QR code provisioning uses a QR payload encoded with the enrollment configuration. Android 9+ has a built-in QR reader in the setup wizard; Android 7-8 requires an external QR reader app installed before setup. Works for Fully Managed COBO, Dedicated (COSU), and AOSP (Android 10+, one device at a time, Wi-Fi credentials required in the QR payload for RealWear-class OEMs). Not supported for BYOD Work Profile. See [Android Glossary — DPC](../_glossary-android.md#dpc) for the policy-controller context.

<a id="afw-setup"></a>
### afw#setup

The DPC identifier string (`afw#setup`) — literally the text "afw#setup" entered in place of a Google account during device setup — triggers the Android Enterprise DPC download on freshly-reset fully-managed-eligible devices. Supported on all fully-managed-eligible Android versions. See [Android Glossary — afw#setup](../_glossary-android.md#afw-setup). Applies to COBO and Dedicated; does not apply to BYOD Work Profile or AOSP.

### Zero-Touch

Zero-Touch provisioning is corporate-scale: Android OEM resellers upload device IMEI and serial lists to the [Zero-Touch portal](https://enterprise.google.com/android/zero-touch/customers), and those devices enroll automatically on first boot. Reseller relationship is Step 0 — the portal requires a reseller identity. Android 8+. Applies to COBO, Dedicated, and Zero-Touch Enrollment (ZTE is a mode that uses Zero-Touch provisioning). See [Android Glossary — Zero-Touch Enrollment](../_glossary-android.md#zero-touch-enrollment). Samsung devices: see the [Samsung KME mutual-exclusion note](#samsung-kme-mutual-exclusion) above.

<a id="knox-mobile-enrollment-kme---deferred-to-v141"></a>
## Knox Mobile Enrollment (KME) — Deferred to v1.4.1

Knox Mobile Enrollment is Samsung's Zero-Touch-equivalent for Samsung hardware. A KME row will be added to the matrix above in v1.4.1 per [PROJECT.md Key Decisions](../../.planning/PROJECT.md). For v1.4, treat Samsung devices as Zero-Touch-eligible per the [Samsung KME mutual-exclusion note](#samsung-kme-mutual-exclusion) at the top of this page. Do NOT configure both KME and Zero-Touch on the same Samsung device — KME takes precedence at the device firmware level.

Full KME admin documentation (binding Knox Admin Portal to Intune, Samsung reseller workflow, KME-specific failure modes) is tracked in the v1.4 deferred-items list and will ship in v1.4.1.

## See Also

- [Android Enterprise Enrollment Overview](00-enrollment-overview.md) — two-axes model and 5-mode comparison; references filtered rows from this matrix
- [Android Version Matrix](03-android-version-matrix.md) — minimum Intune-supported Android OS per mode; version breakpoint narratives (Android 11, 12, 15)
- [Android Enterprise Provisioning Glossary](../_glossary-android.md) — definitions for [afw#setup](../_glossary-android.md#afw-setup), [Zero-Touch Enrollment](../_glossary-android.md#zero-touch-enrollment), [Managed Home Screen](../_glossary-android.md#managed-home-screen)
