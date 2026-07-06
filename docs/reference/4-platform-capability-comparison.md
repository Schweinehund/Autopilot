---
doc_id: RE-143
status: Approved
owner: Intune Admin Lead
doc_type: Reference
last_verified: 2026-06-24
review_by: 2026-09-24
applies_to: both
audience: admin
platform: all
---

**Platform:** All Platforms · **Doc Type:** Reference · **Doc ID:** RE-143 · **Status:** Approved

# 5-Platform Capability Comparison: Windows, macOS, iOS/iPadOS, Android, Linux

## Summary

This reference document compares Microsoft Intune management capabilities across all five supported platforms — Windows, macOS, iOS/iPadOS, Android, and Linux — spanning six operational domains: enrollment, configuration, app deployment, compliance, software updates, and conditional access. Each table links back to the authoritative per-platform capability matrix rather than duplicating verdicts. The primary audience is Intune administrators and L2 engineers evaluating cross-platform feature parity.

This reference doc compares Microsoft Intune management capabilities across all five platforms in the v1.5 documentation suite — Windows (Autopilot v1 / v2), macOS (Apple Automated Device Enrollment via Apple Business Manager), iOS / iPadOS (Apple ADE + Account-Driven User Enrollment + MAM-WE), Android (Android Enterprise — COBO / COPE / BYOD / Dedicated / ZTE / AOSP), and Linux (Ubuntu 22.04 / 24.04 LTS via the `intune-portal` deb client). Each non-empty cell carries a verdict word followed by a hyperlink to the source per-platform capability matrix (link-not-copy structural reference per PITFALL-7 — no per-cell duplication of platform-specific matrix prose).

Windows column links target the Windows column of [`linux-capability-matrix.md`](linux-capability-matrix.md) (the existing Win-bilateral capability source); a dedicated `windows-capability-matrix.md` is deferred to v1.6+. Within `linux-capability-matrix.md` the table columns are Feature / Windows / Linux — both the Windows column and the Linux column in this comparison doc reach the same H2 anchor in the same file but represent different rows of that bilateral table.

**Verdict vocabulary** (5-state lock): cells use exactly one of `Supported` / `Partial` / `Not supported` / `Mode-dependent` / `n/a`. The em-dash (`—`) separates the verdict word from the hyperlink. `Mode-dependent` applies primarily to Android (which has 5 GMS modes + AOSP) where verdicts diverge per mode; the linked source matrix carries the per-mode prose.

For sibling per-platform matrices, see [Linux Capability Matrix](linux-capability-matrix.md), [macOS Capability Matrix](macos-capability-matrix.md), [iOS Capability Matrix](ios-capability-matrix.md), and [Android Capability Matrix](android-capability-matrix.md).

## Enrollment

The table below compares enrollment-related capabilities — zero-touch methods, hardware identity, ESP equivalents, and BYOD support — across all five platforms.

| Feature | Windows | macOS | iOS | Android | Linux |
|---------|---------|-------|-----|---------|-------|
| Zero-touch / autopilot enrollment method | Supported — [matrix](linux-capability-matrix.md#enrollment) | Supported — [matrix](macos-capability-matrix.md#enrollment) | Supported — [matrix](ios-capability-matrix.md#enrollment) | Mode-dependent — [matrix](android-capability-matrix.md#enrollment) | Not supported — [matrix](linux-capability-matrix.md#enrollment) |
| Hardware identity / token model | Supported — [matrix](linux-capability-matrix.md#enrollment) | Supported — [matrix](macos-capability-matrix.md#enrollment) | Supported — [matrix](ios-capability-matrix.md#enrollment) | Mode-dependent — [matrix](android-capability-matrix.md#enrollment) | n/a — [matrix](linux-capability-matrix.md#enrollment) |
| User affinity / userless enrollment | Supported — [matrix](linux-capability-matrix.md#enrollment) | Supported — [matrix](macos-capability-matrix.md#enrollment) | Partial — [matrix](ios-capability-matrix.md#enrollment) | Mode-dependent — [matrix](android-capability-matrix.md#enrollment) | Not supported — [matrix](linux-capability-matrix.md#enrollment) |
| Pre-provisioning (White Glove / equivalent) | Supported — [matrix](linux-capability-matrix.md#enrollment) (APv1 only — see [APv1 vs APv2](../apv1-vs-apv2.md)) | Not supported — [matrix](macos-capability-matrix.md#enrollment) | Not supported — [matrix](ios-capability-matrix.md#enrollment) | Not supported — [matrix](android-capability-matrix.md#enrollment) | Not supported — [matrix](linux-capability-matrix.md#enrollment) |
| Hybrid Entra Join / domain join | Supported — [matrix](linux-capability-matrix.md#enrollment) (APv1 only — see [APv1 vs APv2](../apv1-vs-apv2.md)) | Not supported — [matrix](macos-capability-matrix.md#enrollment) | Not supported — [matrix](ios-capability-matrix.md#enrollment) | Not supported — [matrix](android-capability-matrix.md#enrollment) | Not supported — [matrix](linux-capability-matrix.md#enrollment) |
| Enrollment Status Page (ESP / equivalent) | Supported — [matrix](linux-capability-matrix.md#enrollment) | Partial — [matrix](macos-capability-matrix.md#enrollment) | Partial — [matrix](ios-capability-matrix.md#enrollment) | Mode-dependent — [matrix](android-capability-matrix.md#enrollment) | Not supported — [matrix](linux-capability-matrix.md#enrollment) |
| Re-enrollment behavior (blocking screen) | Supported — [matrix](linux-capability-matrix.md#enrollment) | Not supported — [matrix](macos-capability-matrix.md#enrollment) | Not supported — [matrix](ios-capability-matrix.md#enrollment) | Mode-dependent — [matrix](android-capability-matrix.md#enrollment) | n/a — [matrix](linux-capability-matrix.md#enrollment) |
| BYOD enrollment path | Supported — [matrix](linux-capability-matrix.md#enrollment) | n/a — [matrix](macos-capability-matrix.md#enrollment) | Supported — [matrix](ios-capability-matrix.md#enrollment) | Supported — [matrix](android-capability-matrix.md#enrollment) | Partial — [matrix](linux-capability-matrix.md#enrollment) |
| Factory-reset / re-provisioning behavior | Supported — [matrix](linux-capability-matrix.md#enrollment) | Supported — [matrix](macos-capability-matrix.md#enrollment) | Supported — [matrix](ios-capability-matrix.md#enrollment) | Mode-dependent — [matrix](android-capability-matrix.md#enrollment) | Not supported — [matrix](linux-capability-matrix.md#enrollment) |
| Windows 10 support / minimum OS | Supported — [matrix](linux-capability-matrix.md#enrollment) (APv1 only on Windows 10; APv2 requires Windows 11 22H2+ — see [APv1 vs APv2](../apv1-vs-apv2.md)) | n/a — [matrix](macos-capability-matrix.md#enrollment) | n/a — [matrix](ios-capability-matrix.md#enrollment) | n/a — [matrix](android-capability-matrix.md#enrollment) | n/a — [matrix](linux-capability-matrix.md#enrollment) |
| macOS 26 in-place ABM migration | n/a — [matrix](linux-capability-matrix.md#enrollment) | Supported — [matrix](macos-capability-matrix.md#enrollment) | n/a — [matrix](ios-capability-matrix.md#enrollment) | n/a — [matrix](android-capability-matrix.md#enrollment) | n/a — [matrix](linux-capability-matrix.md#enrollment) |

> **Table summary:** This table compares 12 enrollment capabilities across Windows, macOS, iOS, Android, and Linux; Android varies by mode while Linux lacks zero-touch and hybrid-join support entirely.

## Configuration

The table below compares configuration-management capabilities — profile mechanisms, Settings Catalog breadth, DDM, and 802.1X — across all five platforms.

| Feature | Windows | macOS | iOS | Android | Linux |
|---------|---------|-------|-----|---------|-------|
| MDM configuration profile mechanism | Supported — [matrix](linux-capability-matrix.md#configuration) | Supported — [matrix](macos-capability-matrix.md#configuration) | Supported — [matrix](ios-capability-matrix.md#configuration) | Mode-dependent — [matrix](android-capability-matrix.md#configuration) | Not supported — [matrix](linux-capability-matrix.md#configuration) |
| Settings Catalog availability + breadth | Supported — [matrix](linux-capability-matrix.md#configuration) | Supported — [matrix](macos-capability-matrix.md#configuration) | Supported — [matrix](ios-capability-matrix.md#configuration) | Mode-dependent — [matrix](android-capability-matrix.md#configuration) | Partial — [matrix](linux-capability-matrix.md#configuration) |
| Custom configuration via scripts | Supported — [matrix](linux-capability-matrix.md#configuration) | Supported — [matrix](macos-capability-matrix.md#configuration) | Not supported — [matrix](ios-capability-matrix.md#configuration) | Mode-dependent — [matrix](android-capability-matrix.md#configuration) | Partial — [matrix](linux-capability-matrix.md#configuration) |
| Declarative Device Management (DDM) | Not supported — [matrix](linux-capability-matrix.md#configuration) | Supported — [matrix](macos-capability-matrix.md#configuration) | Supported — [matrix](ios-capability-matrix.md#configuration) | n/a — [matrix](android-capability-matrix.md#configuration) | Not supported — [matrix](linux-capability-matrix.md#configuration) |
| Restriction profile breadth | Supported — [matrix](linux-capability-matrix.md#configuration) | Partial — [matrix](macos-capability-matrix.md#configuration) | Supported — [matrix](ios-capability-matrix.md#configuration) | Mode-dependent — [matrix](android-capability-matrix.md#configuration) | Not supported — [matrix](linux-capability-matrix.md#configuration) |
| Certificate deployment (SCEP / PKCS / ACME) | Supported — [matrix](linux-capability-matrix.md#configuration) | Supported — [matrix](macos-capability-matrix.md#configuration) | Supported — [matrix](ios-capability-matrix.md#configuration) | Supported — [matrix](android-capability-matrix.md#configuration) | Not supported — [matrix](linux-capability-matrix.md#configuration) |
| Network Authentication (802.1X) | Supported — [matrix](linux-capability-matrix.md#configuration) | Supported — [matrix](macos-capability-matrix.md#configuration) | Partial — [matrix](ios-capability-matrix.md#configuration) | Mode-dependent — [matrix](android-capability-matrix.md#configuration) | Partial — [matrix](linux-capability-matrix.md#configuration) |
| Security baselines availability | Supported — [matrix](linux-capability-matrix.md#configuration) | Not supported — [matrix](macos-capability-matrix.md#configuration) | Not supported — [matrix](ios-capability-matrix.md#configuration) | Not supported — [matrix](android-capability-matrix.md#configuration) | Not supported — [matrix](linux-capability-matrix.md#configuration) |
| Hardware / firmware configuration policies | Supported — [matrix](linux-capability-matrix.md#configuration) | Partial — [matrix](macos-capability-matrix.md#configuration) | n/a — [matrix](ios-capability-matrix.md#configuration) | Mode-dependent — [matrix](android-capability-matrix.md#configuration) | Not supported — [matrix](linux-capability-matrix.md#configuration) |

> **Table summary:** This table compares 10 configuration capabilities; Windows and macOS lead in breadth while Linux configuration is largely out-of-band from Intune.

## App Deployment

The table below compares app-deployment capabilities — packaging formats, delivery mechanisms, supersedence, and app-config targeting — across all five platforms.

| Feature | Windows | macOS | iOS | Android | Linux |
|---------|---------|-------|-----|---------|-------|
| Primary app packaging formats | Supported — [matrix](linux-capability-matrix.md#app-deployment) | Supported — [matrix](macos-capability-matrix.md#app-deployment) | Supported — [matrix](ios-capability-matrix.md#app-deployment) | Mode-dependent — [matrix](android-capability-matrix.md#app-deployment) | Not supported — [matrix](linux-capability-matrix.md#app-deployment) |
| Binary package delivery (Win32 / DMG / PKG / IPA / APK / etc.) | Supported — [matrix](linux-capability-matrix.md#app-deployment) | Supported — [matrix](macos-capability-matrix.md#app-deployment) | Supported — [matrix](ios-capability-matrix.md#app-deployment) | Mode-dependent — [matrix](android-capability-matrix.md#app-deployment) | Not supported — [matrix](linux-capability-matrix.md#app-deployment) |
| Script-based delivery | Supported — [matrix](linux-capability-matrix.md#app-deployment) | Supported — [matrix](macos-capability-matrix.md#app-deployment) | Not supported — [matrix](ios-capability-matrix.md#app-deployment) | Not supported — [matrix](android-capability-matrix.md#app-deployment) | Supported — [matrix](linux-capability-matrix.md#app-deployment) |
| Microsoft Store / VPP / Play integration | Supported — [matrix](linux-capability-matrix.md#app-deployment) | Supported — [matrix](macos-capability-matrix.md#app-deployment) | Supported — [matrix](ios-capability-matrix.md#app-deployment) | Supported — [matrix](android-capability-matrix.md#app-deployment) | Not supported — [matrix](linux-capability-matrix.md#app-deployment) |
| LOB / sideloaded app delivery path | Supported — [matrix](linux-capability-matrix.md#app-deployment) | Supported — [matrix](macos-capability-matrix.md#app-deployment) | Supported — [matrix](ios-capability-matrix.md#app-deployment) | Mode-dependent — [matrix](android-capability-matrix.md#app-deployment) | Not supported — [matrix](linux-capability-matrix.md#app-deployment) |
| Silent install capability | Supported — [matrix](linux-capability-matrix.md#app-deployment) | Supported — [matrix](macos-capability-matrix.md#app-deployment) | Mode-dependent — [matrix](ios-capability-matrix.md#app-deployment) | Mode-dependent — [matrix](android-capability-matrix.md#app-deployment) | Not supported — [matrix](linux-capability-matrix.md#app-deployment) |
| App supersedence + dependency graphs | Supported — [matrix](linux-capability-matrix.md#app-deployment) | Not supported — [matrix](macos-capability-matrix.md#app-deployment) | Not supported — [matrix](ios-capability-matrix.md#app-deployment) | Not supported — [matrix](android-capability-matrix.md#app-deployment) | Not supported — [matrix](linux-capability-matrix.md#app-deployment) |
| App-config (managed configurations) targeting | Supported — [matrix](linux-capability-matrix.md#app-deployment) | Supported — [matrix](macos-capability-matrix.md#app-deployment) | Supported — [matrix](ios-capability-matrix.md#app-deployment) | Mode-dependent — [matrix](android-capability-matrix.md#app-deployment) | Not supported — [matrix](linux-capability-matrix.md#app-deployment) |
| Apps removed on retirement / unenrollment | Supported — [matrix](linux-capability-matrix.md#app-deployment) | Not supported — [matrix](macos-capability-matrix.md#app-deployment) | Supported — [matrix](ios-capability-matrix.md#app-deployment) | Mode-dependent — [matrix](android-capability-matrix.md#app-deployment) | n/a — [matrix](linux-capability-matrix.md#app-deployment) |

> **Table summary:** This table compares 10 app-deployment capabilities; Windows uniquely supports supersedence and dependency graphs, while Linux is script-delivery only.

## Compliance

The table below compares compliance capabilities — settings scope, custom scripts, hardware attestation, and CA grant targets — across all five platforms.

| Feature | Windows | macOS | iOS | Android | Linux |
|---------|---------|-------|-----|---------|-------|
| Compliance settings catalog scope | Supported — [matrix](linux-capability-matrix.md#compliance) | Partial — [matrix](macos-capability-matrix.md#compliance) | Supported — [matrix](ios-capability-matrix.md#compliance) | Mode-dependent — [matrix](android-capability-matrix.md#compliance) | Partial — [matrix](linux-capability-matrix.md#compliance) |
| Custom compliance scripts | Supported — [matrix](linux-capability-matrix.md#compliance) | Supported — [matrix](macos-capability-matrix.md#compliance) | Not supported — [matrix](ios-capability-matrix.md#compliance) | Not supported — [matrix](android-capability-matrix.md#compliance) | Supported — [matrix](linux-capability-matrix.md#compliance) |
| Disk encryption check | Supported — [matrix](linux-capability-matrix.md#compliance) | Supported — [matrix](macos-capability-matrix.md#compliance) | Supported — [matrix](ios-capability-matrix.md#compliance) | Mode-dependent — [matrix](android-capability-matrix.md#compliance) | Partial — [matrix](linux-capability-matrix.md#compliance) |
| Password / passcode complexity policy | Supported — [matrix](linux-capability-matrix.md#compliance) | Supported — [matrix](macos-capability-matrix.md#compliance) | Supported — [matrix](ios-capability-matrix.md#compliance) | Mode-dependent — [matrix](android-capability-matrix.md#compliance) | Partial — [matrix](linux-capability-matrix.md#compliance) |
| Hardware attestation (TPM / T2 / Play Integrity / supervised) | Supported — [matrix](linux-capability-matrix.md#compliance) | Partial — [matrix](macos-capability-matrix.md#compliance) | Supported — [matrix](ios-capability-matrix.md#compliance) | Mode-dependent — [matrix](android-capability-matrix.md#compliance) | Not supported — [matrix](linux-capability-matrix.md#compliance) |
| Jailbreak / root detection | n/a — [matrix](linux-capability-matrix.md#compliance) | Partial — [matrix](macos-capability-matrix.md#compliance) | Supported — [matrix](ios-capability-matrix.md#compliance) | Mode-dependent — [matrix](android-capability-matrix.md#compliance) | n/a — [matrix](linux-capability-matrix.md#compliance) |
| Userless device compliance support | Supported — [matrix](linux-capability-matrix.md#compliance) | Not supported — [matrix](macos-capability-matrix.md#compliance) | Partial — [matrix](ios-capability-matrix.md#compliance) | Mode-dependent — [matrix](android-capability-matrix.md#compliance) | Not supported — [matrix](linux-capability-matrix.md#compliance) |
| Default compliance posture (newly enrolled, not-yet-evaluated) | Supported — [matrix](linux-capability-matrix.md#compliance) | Supported — [matrix](macos-capability-matrix.md#compliance) | Supported — [matrix](ios-capability-matrix.md#compliance) | Supported — [matrix](android-capability-matrix.md#compliance) | Supported — [matrix](linux-capability-matrix.md#compliance) |
| CA grant target (compliance enforcement) | Supported — [matrix](linux-capability-matrix.md#compliance) | Supported — [matrix](macos-capability-matrix.md#compliance) | Supported — [matrix](ios-capability-matrix.md#compliance) | Mode-dependent — [matrix](android-capability-matrix.md#compliance) | Not supported — [matrix](linux-capability-matrix.md#compliance) |

> **Table summary:** This table compares 10 compliance capabilities; hardware attestation and userless compliance support vary the most across platforms.

## Software Updates

The table below compares software-update capabilities — update mechanisms, deferral, deadline enforcement, and reporting — across all five platforms.

| Feature | Windows | macOS | iOS | Android | Linux |
|---------|---------|-------|-----|---------|-------|
| Update management mechanism | Supported — [matrix](linux-capability-matrix.md#software-updates) | Supported — [matrix](macos-capability-matrix.md#software-updates) | Supported — [matrix](ios-capability-matrix.md#software-updates) | Mode-dependent — [matrix](android-capability-matrix.md#software-updates) | Not supported — [matrix](linux-capability-matrix.md#software-updates) |
| Force OS version / forced update enforcement | Supported — [matrix](linux-capability-matrix.md#software-updates) | Supported — [matrix](macos-capability-matrix.md#software-updates) | Supported — [matrix](ios-capability-matrix.md#software-updates) | Mode-dependent — [matrix](android-capability-matrix.md#software-updates) | Not supported — [matrix](linux-capability-matrix.md#software-updates) |
| Update deferral duration | Supported — [matrix](linux-capability-matrix.md#software-updates) | Supported — [matrix](macos-capability-matrix.md#software-updates) | Supported — [matrix](ios-capability-matrix.md#software-updates) | Mode-dependent — [matrix](android-capability-matrix.md#software-updates) | Not supported — [matrix](linux-capability-matrix.md#software-updates) |
| Update deadline enforcement | Supported — [matrix](linux-capability-matrix.md#software-updates) | Supported — [matrix](macos-capability-matrix.md#software-updates) | Supported — [matrix](ios-capability-matrix.md#software-updates) | Mode-dependent — [matrix](android-capability-matrix.md#software-updates) | Not supported — [matrix](linux-capability-matrix.md#software-updates) |
| Emergency / critical update override | Supported — [matrix](linux-capability-matrix.md#software-updates) | Supported — [matrix](macos-capability-matrix.md#software-updates) | Supported — [matrix](ios-capability-matrix.md#software-updates) | Not supported — [matrix](android-capability-matrix.md#software-updates) | Not supported — [matrix](linux-capability-matrix.md#software-updates) |
| Driver / firmware update management | Supported — [matrix](linux-capability-matrix.md#software-updates) | Not supported — [matrix](macos-capability-matrix.md#software-updates) | n/a — [matrix](ios-capability-matrix.md#software-updates) | Mode-dependent — [matrix](android-capability-matrix.md#software-updates) | Not supported — [matrix](linux-capability-matrix.md#software-updates) |
| Update status reporting | Supported — [matrix](linux-capability-matrix.md#software-updates) | Supported — [matrix](macos-capability-matrix.md#software-updates) | Supported — [matrix](ios-capability-matrix.md#software-updates) | Mode-dependent — [matrix](android-capability-matrix.md#software-updates) | Not supported — [matrix](linux-capability-matrix.md#software-updates) |

> **Table summary:** This table compares 8 software-update capabilities; Linux has no Intune-managed update mechanism, while Windows and macOS both support deferral and deadline enforcement.

## Conditional Access

The table below compares Conditional Access capabilities — device-based CA, web-app CA, per-app CA, and risk-based CA — across all five platforms.

| Feature | Windows | macOS | iOS | Android | Linux |
|---------|---------|-------|-----|---------|-------|
| Device-based CA (`Require device to be marked as compliant`) | Supported — [matrix](linux-capability-matrix.md#conditional-access) | Supported — [matrix](macos-capability-matrix.md#conditional-access) | Supported — [matrix](ios-capability-matrix.md#conditional-access) | Mode-dependent — [matrix](android-capability-matrix.md#conditional-access) | Not supported — [matrix](linux-capability-matrix.md#conditional-access) |
| Web-app CA via Edge / Safari / Chrome | Supported — [matrix](linux-capability-matrix.md#conditional-access) | Supported — [matrix](macos-capability-matrix.md#conditional-access) | Supported — [matrix](ios-capability-matrix.md#conditional-access) | Supported — [matrix](android-capability-matrix.md#conditional-access) | Supported — [matrix](linux-capability-matrix.md#conditional-access) |
| Per-app CA (MAM / MAM-WE / managed app) | n/a — [matrix](linux-capability-matrix.md#conditional-access) | Partial — [matrix](macos-capability-matrix.md#conditional-access) | Supported — [matrix](ios-capability-matrix.md#conditional-access) | Mode-dependent — [matrix](android-capability-matrix.md#conditional-access) | Not supported — [matrix](linux-capability-matrix.md#conditional-access) |
| App-based CA / Approved Client App | Supported — [matrix](linux-capability-matrix.md#conditional-access) | Supported — [matrix](macos-capability-matrix.md#conditional-access) | Supported — [matrix](ios-capability-matrix.md#conditional-access) | Mode-dependent — [matrix](android-capability-matrix.md#conditional-access) | Not supported — [matrix](linux-capability-matrix.md#conditional-access) |
| Risk-based CA (Entra ID Protection) | Supported — [matrix](linux-capability-matrix.md#conditional-access) | Supported — [matrix](macos-capability-matrix.md#conditional-access) | Supported — [matrix](ios-capability-matrix.md#conditional-access) | Mode-dependent — [matrix](android-capability-matrix.md#conditional-access) | Partial — [matrix](linux-capability-matrix.md#conditional-access) |

> **Table summary:** This table compares 6 Conditional Access capabilities; device-based CA is unavailable on Linux, and per-app CA is mode-dependent on Android.

## Single Sign-On

The table below documents OS-integrated Platform SSO support, which in this comparison set is macOS-exclusive.

| Feature | Windows | macOS | iOS | Android | Linux |
|---------|---------|-------|-----|---------|-------|
| OS-integrated SSO (Platform SSO) | N/A | Supported (macOS 14+, incl. Kerberos SSO Extension) — [matrix](macos-capability-matrix.md#authentication) | N/A | N/A | N/A |

> **Table summary:** This single-row table confirms Platform SSO is supported only on macOS 14+ among the five compared platforms; other platforms are marked N/A by deliberate scope.

> Non-macOS platform SSO authentication is not covered in this documentation set; `N/A` reflects deliberate scope, not capability absence.

## See Also

- [Linux Capability Matrix](linux-capability-matrix.md) — Win|Linux bilateral comparison; primary Windows column source per architecture deferral
- [macOS Capability Matrix](macos-capability-matrix.md) — Windows|macOS bilateral comparison
- [iOS Capability Matrix](ios-capability-matrix.md) — Windows|macOS|iOS trilateral comparison
- [Android Capability Matrix](android-capability-matrix.md) — Android Enterprise mode-by-feature matrix (5 GMS modes + AOSP)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md) — Windows-internal Autopilot v1 vs v2 feature divergence (footnote target for 3 Enrollment H2 rows)
- [Windows vs macOS Concept Comparison](../windows-vs-macos.md) — terminology mapping (not feature parity)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-06 | v1.15 EEE reformat — content not re-reviewed | — |
| 2026-06-24 | Phase 91: add macOS 26 in-place ABM migration row under ## Enrollment; update V-63-09 BASELINE in check-phase-63.mjs atomically | -- |
| 2026-05-01 | Initial version — Phase 58: 5-platform capability comparison (Windows, macOS, iOS, Android, Linux) across 6 domain H2s with link-not-copy cell architecture (DEFER-08 / AECOMPARE-01 close; CLEAN-05) | -- |
| 2026-06-21 | Add `## Single Sign-On` section (7th H2) with one feature row — macOS Platform SSO cell (X3 SC2 verbatim, links matrix `#authentication`); non-macOS cells bare N/A (X2); update front-matter dates (DS-2) | -- |
