---
last_verified: 2026-05-01
review_by: 2026-06-15
applies_to: both
audience: admin
platform: all
---

# 5-Platform Capability Comparison: Windows, macOS, iOS/iPadOS, Android, Linux

This reference doc compares Microsoft Intune management capabilities across all five platforms in the v1.5 documentation suite — Windows (Autopilot v1 / v2), macOS (Apple Automated Device Enrollment via Apple Business Manager), iOS / iPadOS (Apple ADE + Account-Driven User Enrollment + MAM-WE), Android (Android Enterprise — COBO / COPE / BYOD / Dedicated / ZTE / AOSP), and Linux (Ubuntu 22.04 / 24.04 LTS via the `intune-portal` deb client). Each non-empty cell carries a verdict word followed by a hyperlink to the source per-platform capability matrix (link-not-copy structural reference per PITFALL-7 — no per-cell duplication of platform-specific matrix prose).

Windows column links target the Windows column of [`linux-capability-matrix.md`](linux-capability-matrix.md) (the existing Win-bilateral capability source); a dedicated `windows-capability-matrix.md` is deferred to v1.6+. Within `linux-capability-matrix.md` the table columns are Feature / Windows / Linux — both the Windows column and the Linux column in this comparison doc reach the same H2 anchor in the same file but represent different rows of that bilateral table.

**Verdict vocabulary** (5-state lock): cells use exactly one of `Supported` / `Partial` / `Not supported` / `Mode-dependent` / `n/a`. The em-dash (`—`) separates the verdict word from the hyperlink. `Mode-dependent` applies primarily to Android (which has 5 GMS modes + AOSP) where verdicts diverge per mode; the linked source matrix carries the per-mode prose.

For sibling per-platform matrices, see [Linux Capability Matrix](linux-capability-matrix.md), [macOS Capability Matrix](macos-capability-matrix.md), [iOS Capability Matrix](ios-capability-matrix.md), and [Android Capability Matrix](android-capability-matrix.md).

## Enrollment

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

## Configuration

| Feature | Windows | macOS | iOS | Android | Linux |
|---------|---------|-------|-----|---------|-------|
| MDM configuration profile mechanism | Supported — [matrix](linux-capability-matrix.md#configuration) | Supported — [matrix](macos-capability-matrix.md#configuration) | Supported — [matrix](ios-capability-matrix.md#configuration) | Mode-dependent — [matrix](android-capability-matrix.md#configuration) | Not supported — [matrix](linux-capability-matrix.md#configuration) |
| Settings Catalog availability + breadth | Supported — [matrix](linux-capability-matrix.md#configuration) | Supported — [matrix](macos-capability-matrix.md#configuration) | Supported — [matrix](ios-capability-matrix.md#configuration) | Mode-dependent — [matrix](android-capability-matrix.md#configuration) | Partial — [matrix](linux-capability-matrix.md#configuration) |
| Custom configuration via scripts | Supported — [matrix](linux-capability-matrix.md#configuration) | Supported — [matrix](macos-capability-matrix.md#configuration) | Not supported — [matrix](ios-capability-matrix.md#configuration) | Mode-dependent — [matrix](android-capability-matrix.md#configuration) | Partial — [matrix](linux-capability-matrix.md#configuration) |
| Declarative Device Management (DDM) | Not supported — [matrix](linux-capability-matrix.md#configuration) | Supported — [matrix](macos-capability-matrix.md#configuration) | Supported — [matrix](ios-capability-matrix.md#configuration) | n/a — [matrix](android-capability-matrix.md#configuration) | Not supported — [matrix](linux-capability-matrix.md#configuration) |
| Restriction profile breadth | Supported — [matrix](linux-capability-matrix.md#configuration) | Partial — [matrix](macos-capability-matrix.md#configuration) | Supported — [matrix](ios-capability-matrix.md#configuration) | Mode-dependent — [matrix](android-capability-matrix.md#configuration) | Not supported — [matrix](linux-capability-matrix.md#configuration) |
| Certificate deployment (SCEP / PKCS / ACME) | Supported — [matrix](linux-capability-matrix.md#configuration) | Supported — [matrix](macos-capability-matrix.md#configuration) | Supported — [matrix](ios-capability-matrix.md#configuration) | Supported — [matrix](android-capability-matrix.md#configuration) | Not supported — [matrix](linux-capability-matrix.md#configuration) |
| Security baselines availability | Supported — [matrix](linux-capability-matrix.md#configuration) | Not supported — [matrix](macos-capability-matrix.md#configuration) | Not supported — [matrix](ios-capability-matrix.md#configuration) | Not supported — [matrix](android-capability-matrix.md#configuration) | Not supported — [matrix](linux-capability-matrix.md#configuration) |
| Hardware / firmware configuration policies | Supported — [matrix](linux-capability-matrix.md#configuration) | Partial — [matrix](macos-capability-matrix.md#configuration) | n/a — [matrix](ios-capability-matrix.md#configuration) | Mode-dependent — [matrix](android-capability-matrix.md#configuration) | Not supported — [matrix](linux-capability-matrix.md#configuration) |

## App Deployment

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

## Compliance

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

## Software Updates

| Feature | Windows | macOS | iOS | Android | Linux |
|---------|---------|-------|-----|---------|-------|
| Update management mechanism | Supported — [matrix](linux-capability-matrix.md#software-updates) | Supported — [matrix](macos-capability-matrix.md#software-updates) | Supported — [matrix](ios-capability-matrix.md#software-updates) | Mode-dependent — [matrix](android-capability-matrix.md#software-updates) | Not supported — [matrix](linux-capability-matrix.md#software-updates) |
| Force OS version / forced update enforcement | Supported — [matrix](linux-capability-matrix.md#software-updates) | Supported — [matrix](macos-capability-matrix.md#software-updates) | Supported — [matrix](ios-capability-matrix.md#software-updates) | Mode-dependent — [matrix](android-capability-matrix.md#software-updates) | Not supported — [matrix](linux-capability-matrix.md#software-updates) |
| Update deferral duration | Supported — [matrix](linux-capability-matrix.md#software-updates) | Supported — [matrix](macos-capability-matrix.md#software-updates) | Supported — [matrix](ios-capability-matrix.md#software-updates) | Mode-dependent — [matrix](android-capability-matrix.md#software-updates) | Not supported — [matrix](linux-capability-matrix.md#software-updates) |
| Update deadline enforcement | Supported — [matrix](linux-capability-matrix.md#software-updates) | Supported — [matrix](macos-capability-matrix.md#software-updates) | Supported — [matrix](ios-capability-matrix.md#software-updates) | Mode-dependent — [matrix](android-capability-matrix.md#software-updates) | Not supported — [matrix](linux-capability-matrix.md#software-updates) |
| Emergency / critical update override | Supported — [matrix](linux-capability-matrix.md#software-updates) | Supported — [matrix](macos-capability-matrix.md#software-updates) | Supported — [matrix](ios-capability-matrix.md#software-updates) | Not supported — [matrix](android-capability-matrix.md#software-updates) | Not supported — [matrix](linux-capability-matrix.md#software-updates) |
| Driver / firmware update management | Supported — [matrix](linux-capability-matrix.md#software-updates) | Not supported — [matrix](macos-capability-matrix.md#software-updates) | n/a — [matrix](ios-capability-matrix.md#software-updates) | Mode-dependent — [matrix](android-capability-matrix.md#software-updates) | Not supported — [matrix](linux-capability-matrix.md#software-updates) |
| Update status reporting | Supported — [matrix](linux-capability-matrix.md#software-updates) | Supported — [matrix](macos-capability-matrix.md#software-updates) | Supported — [matrix](ios-capability-matrix.md#software-updates) | Mode-dependent — [matrix](android-capability-matrix.md#software-updates) | Not supported — [matrix](linux-capability-matrix.md#software-updates) |

## Conditional Access

| Feature | Windows | macOS | iOS | Android | Linux |
|---------|---------|-------|-----|---------|-------|
| Device-based CA (`Require device to be marked as compliant`) | Supported — [matrix](linux-capability-matrix.md#conditional-access) | Supported — [matrix](macos-capability-matrix.md#conditional-access) | Supported — [matrix](ios-capability-matrix.md#conditional-access) | Mode-dependent — [matrix](android-capability-matrix.md#conditional-access) | Not supported — [matrix](linux-capability-matrix.md#conditional-access) |
| Web-app CA via Edge / Safari / Chrome | Supported — [matrix](linux-capability-matrix.md#conditional-access) | Supported — [matrix](macos-capability-matrix.md#conditional-access) | Supported — [matrix](ios-capability-matrix.md#conditional-access) | Supported — [matrix](android-capability-matrix.md#conditional-access) | Supported — [matrix](linux-capability-matrix.md#conditional-access) |
| Per-app CA (MAM / MAM-WE / managed app) | n/a — [matrix](linux-capability-matrix.md#conditional-access) | Partial — [matrix](macos-capability-matrix.md#conditional-access) | Supported — [matrix](ios-capability-matrix.md#conditional-access) | Mode-dependent — [matrix](android-capability-matrix.md#conditional-access) | Not supported — [matrix](linux-capability-matrix.md#conditional-access) |
| App-based CA / Approved Client App | Supported — [matrix](linux-capability-matrix.md#conditional-access) | Supported — [matrix](macos-capability-matrix.md#conditional-access) | Supported — [matrix](ios-capability-matrix.md#conditional-access) | Mode-dependent — [matrix](android-capability-matrix.md#conditional-access) | Not supported — [matrix](linux-capability-matrix.md#conditional-access) |
| Risk-based CA (Entra ID Protection) | Supported — [matrix](linux-capability-matrix.md#conditional-access) | Supported — [matrix](macos-capability-matrix.md#conditional-access) | Supported — [matrix](ios-capability-matrix.md#conditional-access) | Mode-dependent — [matrix](android-capability-matrix.md#conditional-access) | Partial — [matrix](linux-capability-matrix.md#conditional-access) |

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
| 2026-05-01 | Initial version — Phase 58: 5-platform capability comparison (Windows, macOS, iOS, Android, Linux) across 6 domain H2s with link-not-copy cell architecture (DEFER-08 / AECOMPARE-01 close; CLEAN-05) | -- |
