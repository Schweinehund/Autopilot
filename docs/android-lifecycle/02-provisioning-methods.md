---
last_verified: 2026-04-25
review_by: 2026-06-24
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
> **Samsung devices:** Knox Mobile Enrollment (KME) is mutually exclusive with Zero-Touch on the same Samsung device. Configure only one. For full KME admin coverage, see [Knox Mobile Enrollment](../admin-setup-android/07-knox-mobile-enrollment.md); for the within-this-doc record, see [Knox Mobile Enrollment](#knox-mobile-enrollment) below.

## Mode × Method Matrix

| Mode | NFC | QR | afw#setup | Zero-Touch | Notes |
|------|-----|-----|-----------|------------|-------|
| <a id="cobo"></a>Fully Managed (COBO) | ✓ (Android 8+; NFC tag with ≥ 888 bytes) | ✓ (Android 9+ built-in reader; Android 7-8 needs external QR reader app) | ✓ (all supported Android) | ✓ (Android 8+, via [Zero-Touch portal](https://enterprise.google.com/android/zero-touch/customers)) | Dual-SIM devices: register IMEI 1 only — see Phase 35 prerequisites. See also [`../_glossary-android.md#cobo`](../_glossary-android.md#cobo). |
| <a id="byod-work-profile"></a>BYOD Work Profile | ✗ | ✗ | ✗ | ✗ | Company Portal user-initiated enrollment only; no corporate provisioning methods apply. AMAPI migration April 2025 — Microsoft Intune app is the primary management surface post-migration. See [`../_glossary-android.md#byod`](../_glossary-android.md#byod). |
| <a id="dedicated-cosu"></a>Dedicated (COSU) | ✓ (Android 8+) | ✓ (Android 9+ built-in reader) | ✓ (all supported Android) | ✓ (Android 8+) | Managed Home Screen exit-PIN must sync between device-restrictions profile and MHS app config — see Phase 38 and [`../_glossary-android.md#managed-home-screen`](../_glossary-android.md#managed-home-screen). |
| <a id="zero-touch"></a>Zero-Touch Enrollment | — | — | — | ✓ (Android 8+, via portal) | ZT is itself a provisioning method — reseller relationship is Step 0; see Phase 35 `02-zero-touch-portal.md`. |
| <a id="aosp"></a>AOSP | ✗ | ✓ (Android 10+, one device at a time, Wi-Fi credentials embedded in QR for RealWear-class OEMs) | ✗ | ✗ | OEM firmware-specific; full per-OEM coverage in Phase 45 — see Phase 39 AOSP stub. |

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

<a id="knox-mobile-enrollment"></a>
## Knox Mobile Enrollment (KME)

Knox Mobile Enrollment is Samsung's Zero-Touch-equivalent for Samsung hardware. KME provisions Samsung devices into the existing Android Enterprise device-owner modes (Fully Managed COBO / Dedicated / WPCO) via the Knox Admin Portal → Intune handoff using a flat `EXTRA_ENROLLMENT_TOKEN` Custom JSON Data field. KME itself is free; KPE Premium has been free since Samsung's 2024-03-21 update; Microsoft Intune Plan 1+ supplies KPE Premium transparently. KME is mutually exclusive with Zero-Touch on the same Samsung device — see the [Samsung KME mutual-exclusion note](#samsung-kme-mutual-exclusion) at the top of this page. KME takes precedence at the device firmware level when both are configured.

For full admin coverage, see [Knox Mobile Enrollment Admin Guide](../admin-setup-android/07-knox-mobile-enrollment.md). For L1 enrollment-failure triage, see [L1 Runbook 28: Android Knox Enrollment Failed](../l1-runbooks/28-android-knox-enrollment-failed.md). For L2 investigation, see [L2 Runbook 22: Android Knox Investigation](../l2-runbooks/22-android-knox-investigation.md). For the cross-mode capability matrix, see [Knox Mobile Enrollment (Samsung)](../reference/android-capability-matrix.md#knox-mobile-enrollment-row).

## See Also

- [Android Enterprise Enrollment Overview](00-enrollment-overview.md) — two-axes model and 5-mode comparison; references filtered rows from this matrix
- [Android Version Matrix](03-android-version-matrix.md) — minimum Intune-supported Android OS per mode; version breakpoint narratives (Android 11, 12, 15)
- [Android Enterprise Provisioning Glossary](../_glossary-android.md) — definitions for [afw#setup](../_glossary-android.md#afw-setup), [Zero-Touch Enrollment](../_glossary-android.md#zero-touch-enrollment), [Managed Home Screen](../_glossary-android.md#managed-home-screen)
