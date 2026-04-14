---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: both
audience: admin
platform: all
---

# Intune: macOS vs Windows Capability Matrix

This document compares Intune management capabilities between Windows and macOS across five operational domains. This is a feature parity analysis, not a terminology comparison -- for concept mapping between platforms, see [Windows vs macOS Concept Comparison](../windows-vs-macos.md). For macOS admin setup guides, see [macOS Admin Setup Overview](../admin-setup-macos/00-overview.md).

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
| Platform SSO | No | Yes (macOS 14+ via Settings Catalog) |
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

## Key Gaps Summary

The most significant capability gaps for macOS compared to Windows are:

1. **No security baselines** -- admins must manually configure all security settings
2. **No app dependency or install order control** -- critical for complex deployments
3. **No app supersedence** -- cannot automatically replace old app versions
4. **No pre-provisioning (White Glove)** -- IT cannot pre-stage devices before user delivery
5. **Simpler but less granular Await Configuration** vs Windows ESP -- no per-app progress tracking
6. **Apps not removed on device retirement** -- explicit uninstall required before retiring
7. **No userless device compliance** -- compliance evaluation requires user affinity

## See Also

- [Windows vs macOS Concept Comparison](../windows-vs-macos.md) -- terminology mapping (not feature parity)
- [macOS Admin Setup Overview](../admin-setup-macos/00-overview.md)
- [macOS ADE Lifecycle Overview](../macos-lifecycle/00-ade-lifecycle.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md) -- Windows framework comparison

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Initial version -- 5-domain capability matrix comparing Windows and macOS Intune management | -- |
