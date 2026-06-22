---
last_verified: 2026-06-21
review_by: 2026-09-21
applies_to: both
audience: admin
platform: all
---

# Intune: macOS vs Windows Capability Matrix

This document compares Intune management capabilities between Windows and macOS across five operational domains. This is a feature parity analysis, not a terminology comparison -- for concept mapping between platforms, see [Windows vs macOS Concept Comparison](../windows-vs-macos.md). For macOS admin setup guides, see [macOS Admin Setup Overview](../admin-setup-macos/00-overview.md). For a side-by-side comparison of macOS capabilities against Windows, macOS, iOS, Android, and Linux, see [4-Platform Capability Comparison](4-platform-capability-comparison.md).

## Enrollment

| Feature | Windows | macOS |
|---------|---------|-------|
| Zero-touch enrollment method | Autopilot (hardware hash to Intune) | ADE via ABM (serial number to ABM) |
| Hardware identity | 4KB hardware hash | Serial number |
| Enrollment types | User-driven, Pre-provisioning, Self-deploying, Hybrid Entra join | ADE with user affinity, ADE without user affinity |
| Pre-provisioning (White Glove) | Yes (APv1 only) | No |
| Self-deploying/kiosk enrollment | Yes (APv1) | Partially (ADE without user affinity) |
| Hybrid domain join | Yes (APv1 + Intune Connector) | No |
| Enrollment Status Page equivalent | ESP (device phase + user phase, itemized) | Await Configuration (single lock, generic progress) |
| ESP timeout configuration | Yes (admin-configurable) | No (no enforced timeout) |
| Dynamic enrollment groups | Yes (ZTDId attribute) | Yes (enrollmentProfileName attribute) |
| Re-enrollment fires blocking screen | Yes (every enrollment) | No (first enrollment only) |

## Configuration

| Feature | Windows | macOS |
|---------|---------|-------|
| Security baselines | Yes (Windows 10/11, Defender, Edge, M365) | No |
| Settings Catalog | Yes | Yes |
| Custom OMA-URI | Yes | No (uses custom profile with plist payload) |
| BitLocker / FileVault | BitLocker (MDM) | FileVault (MDM) |
| Registry inspection via MDM | Yes | No (plist/defaults system) |
| PPPC (Privacy Preferences) | N/A | Yes (macOS only) |
| Platform SSO | No | Yes (macOS 14+ via Settings Catalog) — see [Authentication](#authentication) |
| Kernel Extension policy | No | Yes (macOS-only KEXT management) |
| Declarative Device Management (DDM) | No | Yes (macOS 14+, preferred for software updates) |

## App Deployment

| Feature | Windows | macOS |
|---------|---------|-------|
| Primary formats | Win32 (.intunewin), MSI, MSIX, Store | DMG, PKG (managed/unmanaged), VPP |
| App wrapping tool | IntuneWinAppUtil.exe | None required (upload .dmg or .pkg directly) |
| Microsoft Store integration | Yes (Windows Package Manager) | No (App Store via VPP/ABM only) |
| Advanced detection rules (registry, PS) | Yes | No (bundle ID + version only for DMG/PKG) |
| Dependency declarations | Yes | No |
| Install order control | Yes (dependency chains) | No explicit ordering |
| Supersedence | Yes | No |
| Max app size (non-store) | 30 GB (Win32) | 8 GB (DMG/unmanaged PKG), 2 GB (managed PKG) |
| Uninstall from device on retirement | Yes (configured) | No (app remains after device retirement) |

## Compliance

| Feature | Windows | macOS |
|---------|---------|-------|
| Security baselines | Yes | No |
| Compliance settings breadth | Extensive (Defender, BitLocker, firewall, encryption, password, etc.) | Limited (SIP, FileVault, firewall, Gatekeeper, password) |
| Hardware attestation | TPM-based | N/A |
| SIP enforcement via MDM | N/A | Read-only compliance check only (cannot enforce SIP) |
| Custom compliance scripts | Yes (PowerShell) | Yes (Shell scripts via IME) |
| Userless device compliance | Yes | Not supported ("Device compliance evaluation is not supported for userless macOS devices") |
| Grace period after non-compliance | Yes (configurable) | Yes (configurable) |

## Software Updates

| Feature | Windows | macOS |
|---------|---------|-------|
| Update management method | Windows Update for Business | DDM-based (macOS 14+, recommended) or MDM update policy (macOS 13 and older) |
| Force OS version | Yes | Yes (DDM or MDM policy) |
| Update deadline enforcement | Yes | Yes (DDM) |
| Deferral control | Yes (0-30 days) | Yes (0-30 days via Restrictions + DDM) |
| "Update Only" app deployment | Yes (Win32 supersedence) | No (documented gap) |

## Conditional Access

| Feature | Windows | macOS |
|---------|---------|-------|
| Device-based CA (`Require device to be marked as compliant`) | Supported | Supported (compliance evaluation requires user affinity — see [Compliance](#compliance)) |
| Web-app CA via Edge | Supported | Supported (Microsoft Edge / Safari with Single Sign-On Extension) |
| Per-app CA (MAM) | n/a (Windows uses Intune client) | Limited (MAM-WE is iOS-primary; macOS uses configuration profiles + DeviceID surface) |
| App-based CA / Approved Client App | Supported | Supported (via configuration profile + native MDM enrollment) |
| Risk-based CA | Supported (Entra ID Protection signals) | Supported (Entra ID Protection signals; macOS device state factored when user-affinity is present) |

## Key Gaps Summary

The most significant capability gaps for macOS compared to Windows are:

1. **No security baselines** -- admins must manually configure all security settings
2. **No app dependency or install order control** -- critical for complex deployments
3. **No app supersedence** -- cannot automatically replace old app versions
4. **No pre-provisioning (White Glove)** -- IT cannot pre-stage devices before user delivery
5. **Simpler but less granular Await Configuration** vs Windows ESP -- no per-app progress tracking
6. **Apps not removed on device retirement** -- explicit uninstall required before retiring
7. **No userless device compliance** -- compliance evaluation requires user affinity

## Authentication

This section documents macOS Platform SSO (PSSO) authentication. Windows SSO configuration (Windows Hello for Business / Web Account Manager) is not covered in this matrix.

| Feature | Windows | macOS |
|---------|---------|-------|
| Auth methods | n/a — not covered in this matrix | Three methods: Secure Enclave key (Microsoft-recommended), Password sync, Smart card — see [Auth Methods Deep Dive](../admin-setup-macos/08-auth-methods-deep-dive.md) |
| Hardware gate | n/a — not covered in this matrix | Secure Enclave method requires T2 chip (Intel 2018–2020) or Apple Silicon (M1+, 2020+); Password sync and Smart card have no hardware gate |
| macOS version floor | n/a — not covered in this matrix | macOS 14.0 Sonoma (recommended floor — all three methods, non-deprecated Settings Catalog key, NUAL); see [guide 08](../admin-setup-macos/08-auth-methods-deep-dive.md) for macOS 13 absolute-minimum details |
| Entra ID licensing | n/a — not covered in this matrix | No Entra ID P1 or P2 required for Platform SSO itself (Conditional Access integration is licensed independently of PSSO) |
| NUAL (New User at Login) | n/a — not covered in this matrix | Supported — macOS 14+; creates on-demand accounts at login window using Shared Device Keys — see [guide 08](../admin-setup-macos/08-auth-methods-deep-dive.md) |
| Passkey / FIDO2 | n/a — not covered in this matrix | Supported via Platform Credential — Secure Enclave method only; requires Entra Authentication-methods enablement — see [guide 08](../admin-setup-macos/08-auth-methods-deep-dive.md) |
| Hybrid Entra join | n/a — not covered in this matrix | **Not supported** — macOS PSSO requires Entra ID (cloud-only) join; hybrid Entra-joined devices are not supported by PSSO — see [Enterprise SSO Plug-in & Migration Guide](../admin-setup-macos/09-enterprise-sso-plugin-migration.md) |

## See Also

- [Windows vs macOS Concept Comparison](../windows-vs-macos.md) -- terminology mapping (not feature parity)
- [macOS Admin Setup Overview](../admin-setup-macos/00-overview.md)
- [macOS ADE Lifecycle Overview](../macos-lifecycle/00-ade-lifecycle.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md) -- Windows framework comparison
- [Platform SSO Setup Guide](../admin-setup-macos/07-platform-sso-setup.md) -- step-by-step Platform SSO configuration (Settings Catalog payload, registration flow)

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Initial version -- 5-domain capability matrix comparing Windows and macOS Intune management | -- |
| 2026-06-22 | Phase 81 (SSOREF-04): added E4 See Also cross-link to 07-platform-sso-setup.md | -- |
| 2026-06-21 | Add `## Authentication` section (7 rows: auth methods, hardware gate, macOS version floor, Entra licensing, NUAL, passkey/FIDO2, hybrid Entra join anti-feature); update `## Configuration` Platform SSO row to link `#authentication` (X1); refresh DS-2 dates | -- |
