---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: both
audience: admin
platform: all
---

# Intune: iOS/iPadOS Capability Matrix — Windows, macOS, iOS

This matrix compares Intune management capabilities across three platforms. Apple-platform readers (admins coming from macOS ADE) will find the iOS↔macOS comparison surfaces the most meaningful differences — DDM maturity, supervision model scope, and VPP licensing behavior. Windows readers should treat iOS and macOS as structurally distinct from Windows despite being managed via the same Intune tenant. For the Windows↔macOS-only view, see the [macOS Capability Matrix](macos-capability-matrix.md). For concept-level terminology comparison, see [Windows vs macOS Concept Comparison](../windows-vs-macos.md).

## Enrollment

| Feature | Windows | macOS | iOS |
|---------|---------|-------|-----|
| Zero-touch enrollment method | Autopilot (hardware hash to Intune) | ADE via ABM (serial number to ABM) | ADE via ABM (serial number to ABM) |
| Hardware identity | 4KB hardware hash | Serial number | Serial number |
| Enrollment types | User-driven, Pre-provisioning, Self-deploying, Hybrid Entra join | ADE with user affinity, ADE without user affinity | ADE (user affinity / userless), Device Enrollment (Company Portal / web-based), [Account-Driven User Enrollment](../_glossary-macos.md#account-driven-user-enrollment) (BYOD iOS 15+), MAM-WE (app-layer, no device enrollment) |
| Supervision state | N/A | Supervised via ADE | [Supervised via ADE](../_glossary-macos.md#supervision) / Unsupervised (Device Enrollment, User Enrollment) |
| Supervised-only capability gates | N/A | Limited (select configuration categories) | Extensive — silent VPP app install, home screen layout, restriction profiles (AirDrop/Camera/etc.), DDM app install |
| Pre-provisioning (White Glove) | Yes (APv1 only) | No | No |
| Self-deploying / kiosk enrollment | Yes (APv1) | Partially (ADE without user affinity) | Partially (ADE without user affinity / Shared iPad — see SIPAD-01 future milestone) |
| Hybrid domain join | Yes (APv1 + Intune Connector) | No | No |
| ESP / Await Configuration equivalent | ESP (device phase + user phase, itemized) | Await Configuration (single lock, generic progress) | Setup Assistant waits (no ESP-equivalent; DDM status channel provides post-enrollment progress on iOS 17+) |
| ABM token shared with macOS | N/A | Yes | Yes (same ABM token covers iOS, iPadOS, macOS, tvOS enrollment) |
| Re-enrollment blocking screen | Yes (every enrollment) | No (first enrollment only) | No (first enrollment only) |
| Dynamic enrollment groups | Yes (ZTDId attribute) | Yes (enrollmentProfileName attribute) | Yes (enrollmentProfileName attribute) |

## Configuration

| Feature | Windows | macOS | iOS |
|---------|---------|-------|-----|
| Declarative Device Management (DDM) | No | Yes (macOS 14+) | Yes (iOS 17+) |
| DDM managed software update enforcement | N/A | Yes (unsupervised OK) | Yes (works on both supervised AND unsupervised iOS 17+ devices) |
| Configuration profile mechanism | Intune configuration profiles, Settings Catalog, ADMX templates | Configuration profiles (.mobileconfig) | Configuration profiles (.mobileconfig) |
| Home screen layout control | Limited (Start menu via Windows Shell) | No | Yes (🔒 supervised ADE only) |
| Restriction profiles scope | Policy CSP + MDM restrictions | Limited (select macOS restrictions) | Extensive — AirDrop, Camera, Safari, Siri, App Store, screen recording (🔒 many are supervised-only) |
| Wi-Fi auto-join enforcement | Yes | Yes | Yes (🔒 supervised ADE only for forced auto-join; unsupervised users can disable) |
| Per-app VPN | Yes | Yes | Yes (🔒 supervised ADE only for transparent per-app VPN) |
| Certificate deployment | SCEP, PKCS | SCEP, PKCS, ACME (macOS 14+) | SCEP, PKCS, ACME (iOS 16+) |
| Security baselines | Yes (curated baseline sets) | No | No |

## App Deployment

| Feature | Windows | macOS | iOS |
|---------|---------|-------|-----|
| App packaging formats | Win32 (.intunewin), MSI, MSIX, Microsoft Store | PKG, DMG, Script-based, Microsoft Store | VPP App Store apps, LOB/IPA apps |
| Silent app install | Yes | Yes | Yes (🔒 supervised ADE only for VPP device-licensed apps; unsupervised requires user confirmation per app) |
| VPP device-licensed vs user-licensed | N/A | Both supported | Both supported — device-licensed preferred for ADE corporate; user-licensed for 1:1 education / personal devices |
| LOB / sideloaded apps | Yes (Win32 wrapper) | Yes (PKG/DMG) | Yes (IPA via Intune, requires enterprise distribution cert OR ABM custom apps) |
| App dependency / install order | Yes | No | No |
| App supersedence (version replace) | Yes | No | No |
| Managed app status reporting | Yes (Intune app deployment status) | Yes | Yes (per-app install state visible in Intune > Apps > iOS/iPadOS apps > [app] > Device install status) |
| Apps removed on retirement | Yes | No (explicit uninstall required) | Yes (managed apps removed on unenrollment / selective wipe) |

## Compliance

| Feature | Windows | macOS | iOS |
|---------|---------|-------|-----|
| OS version gate | Yes | Yes | Yes |
| Passcode / password complexity | Yes | Yes | Yes |
| Disk encryption check | Yes (BitLocker) | Yes (FileVault) | Yes (device-level always-on on iOS — no toggle) |
| Jailbreak / root detection | N/A | Partial (T2 chip attestation) | Yes (iOS-specific check; evaluated at sync intervals, not real-time) |
| TPM attestation | Yes | N/A | N/A |
| Default compliance posture (newly enrolled, not-yet-evaluated) | "Not evaluated" (CA grace period applies) | "Not evaluated" | "Not evaluated" (see [iOS Compliance Policy Guide](../admin-setup-ios/06-compliance-policy.md) for CA timing behavior) |
| Userless device compliance | Yes (Autopilot self-deploying) | No (requires user affinity) | Partial (ADE without user affinity works; Account-Driven UE requires user) |
| Actions for Noncompliance | Yes | Yes | Yes (email, push notification, retire after N days) |

## Software Updates

| Feature | Windows | macOS | iOS |
|---------|---------|-------|-----|
| Update ring management | Yes (Windows Update for Business) | Yes (DDM managed software update on macOS 14+) | Yes (DDM managed software update on iOS 17+ — works supervised AND unsupervised) |
| Update deferral — duration | Up to 365 days (feature), 30 days (quality) | Up to 90 days via DDM | Up to 90 days via DDM (iOS 17+) |
| Legacy update deferral path | N/A | Restrictions profile (pre-DDM) | Restrictions profile (pre-iOS 17 — deprecated, DDM preferred) |
| Emergency / critical update override | Yes (Expedited Windows Quality Updates) | Yes (DDM emergency update) | Yes (DDM emergency update on iOS 17+) |
| Update status reporting | Windows Update report | DDM status channel (macOS 14+) | DDM status channel (iOS 17+); polling on older |

## Key Gaps Summary

The most significant iOS capability gaps relative to Windows and macOS are:

1. **No CLI diagnostic access** — iOS has no equivalent to Windows `mdmdiagnosticstool.exe` or macOS `profiles` / `log show` / `system_profiler`. L2 relies on MDM diagnostic report, Company Portal log upload, or Mac+cable sysdiagnose (see [iOS L2 Log Collection Guide](../l2-runbooks/14-ios-log-collection.md)).
2. **Supervision gates a significant capability subset** — silent app install, home screen control, DDM app install, and most restriction profiles are supervised-only. Supervision is set at ADE enrollment and CANNOT be added retroactively without a full device erase.
3. **No hybrid domain join** — iOS has no concept equivalent to Entra Hybrid Join; authentication is Entra-only.
4. **No registry / plist-equivalent admin inspection** — unlike macOS Terminal (`profiles show`) or Windows regedit, iOS admins cannot directly inspect device state; diagnostics come through Intune admin center reports only.
5. **No pre-provisioning / White Glove equivalent** — iOS has no staging path for IT to pre-configure devices before user delivery; ADE enrollment happens at user's first Setup Assistant.
6. **Jailbreak detection is iOS-only** — represents a unique compliance surface; no Windows or macOS equivalent (TPM attestation addresses a different threat model).
7. **No app dependency or install order control** — like macOS, iOS lacks Intune's Windows Win32 dependency graph feature. Complex deployments must sequence via separate compliance-gated assignments.
8. **Account-Driven User Enrollment privacy limits** — on BYOD devices enrolled via Account-Driven UE, IT cannot see personal apps, photos, iCloud content, or device identifiers beyond the work profile. This is by design (Apple-enforced) but creates support-investigation limitations.

## See Also

- [macOS Capability Matrix](macos-capability-matrix.md) — Windows↔macOS bilateral view (sibling document)
- [Windows vs macOS Concept Comparison](../windows-vs-macos.md) — terminology mapping across platforms
- [iOS Enrollment Path Overview](../ios-lifecycle/00-enrollment-overview.md) — 4-path enrollment comparison (ADE, Device, User, MAM-WE)
- [iOS Admin Setup Overview](../admin-setup-ios/00-overview.md) — entry point for all iOS admin guides
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md) — Windows framework comparison

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Initial version — Phase 32: trilateral capability matrix (Windows, macOS, iOS) across 5 domains with Apple-parity framing preamble and 8-gap Key Gaps Summary | -- |
