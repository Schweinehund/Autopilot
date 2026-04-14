---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: all
platform: all
---

> **Platform coverage:** This page maps Windows Autopilot concepts to macOS ADE equivalents.
> It covers terminology and enrollment mechanisms, not Intune feature parity (see [Capability Matrix](reference/macos-capability-matrix.md)).

# Windows Autopilot vs macOS ADE: Concept Comparison

Microsoft Intune manages both Windows devices through Windows Autopilot and macOS devices through Apple's Automated Device Enrollment (ADE). While both platforms achieve zero-touch provisioning via Intune, they use fundamentally different mechanisms, terminology, and portals. This page maps the key concepts between them to help admins who manage both platforms navigate the differences. This is a terminology and workflow comparison, not a feature parity analysis — for Intune capability gaps between platforms, see the [Capability Matrix](reference/macos-capability-matrix.md).

## Concept Comparison

| Concept | Windows Autopilot | macOS ADE | Notes |
|---------|-------------------|-----------|-------|
| Device registration portal | Intune admin center ([hardware hash](_glossary.md#hardware-hash) upload) | [Apple Business Manager](_glossary-macos.md#abm) (device assignment) | Windows uses hardware hash; macOS uses serial number via ABM |
| Enrollment mechanism | Autopilot deployment profile | [ADE](_glossary-macos.md#ade) enrollment profile | Both configured in Intune admin center |
| First-run experience | [OOBE](_glossary.md#oobe) (Out-of-Box Experience) | [Setup Assistant](_glossary-macos.md#setup-assistant) | Conceptually equivalent — both run on first power-on |
| Progress/blocking screen | [ESP](_glossary.md#esp) (Enrollment Status Page) | [Await Configuration](_glossary-macos.md#await-configuration) | ESP has device-phase and user-phase. Await Configuration is a single hold at end of Setup Assistant. |
| Provisioning stages | OOBE > ESP device phase > ESP user phase > Desktop | Setup Assistant > Await Configuration > Company Portal login > Desktop | macOS has no formal device/user phase split in the blocking screen |
| Hardware identity | Hardware hash (4KB device fingerprint) | Serial number (in ABM) | Different identity mechanisms |
| Enrollment lock | N/A (ESP blocks by design) | Locked enrollment (prevents management profile removal) | macOS locked enrollment is a supervision-level setting |
| Profile delivery mechanism | Windows MDM channel | Apple MDM (APNs) | Windows uses WinHTTP; macOS uses Apple Push Notification service |
| User authentication | Entra credentials at OOBE | Setup Assistant with modern authentication (Entra) or legacy | macOS has two auth methods; modern authentication is recommended |
| App distribution | Win32 apps, MSI, MSIX, Store apps | DMG, PKG, VPP/Apps and Books | Completely different packaging formats |
| Device compliance | Windows security baselines + compliance policies | Compliance policies only (no macOS security baselines in Intune) | Key gap: macOS has no Intune security baselines |
| Disk encryption | BitLocker | FileVault | Both manageable via Intune policies |
| Firewall | Windows Defender Firewall | macOS Application Firewall | Different configuration surface areas |
| Platform-exclusive concepts | Hardware hash, ESP device/user phase, Pre-provisioning, Self-deploying mode, Hybrid Entra join, ODJ | ABM token renewal, Setup Assistant screen customization, Apple ID integration, FileVault escrow, APNs certificate | Concepts with no direct equivalent on the other platform |

## Diagnostic Tools

| Task | Windows | macOS |
|------|---------|-------|
| Collect diagnostic logs | `mdmdiagnosticstool.exe -out <path>` | `sudo ./IntuneMacODC.sh` (IntuneMacODC tool) |
| View installed profiles | N/A (registry inspection) | `sudo profiles show` or System Settings > Profiles |
| Check enrollment status | `dsregcmd /status` | `profiles status -type enrollment` |
| View MDM agent logs | Event Viewer > DeviceManagement-Enterprise-Diagnostics-Provider | `tail -f /Library/Logs/Microsoft/Intune/*IntuneMDMDaemon*.log` |

## Which Platform Am I Troubleshooting?

**Use Windows Autopilot docs if:**

- A hardware hash was uploaded to Intune admin center before the device was shipped
- The device went through the OOBE (Out-of-Box Experience) provisioning flow
- An Enrollment Status Page (ESP) appeared during setup
- The device is running Windows 10 or Windows 11

**Use macOS ADE docs if:**

- The device was assigned to your MDM server in Apple Business Manager (ABM)
- The device went through macOS Setup Assistant during provisioning
- The device is a Mac (MacBook, Mac mini, iMac, Mac Pro, or Mac Studio)
- The device is supervised (check via `profiles status -type enrollment`)

Return to [Documentation Hub](index.md) to find your platform and role.

## See Also

- [Autopilot Glossary](_glossary.md) — Windows Autopilot terminology
- [macOS Provisioning Glossary](_glossary-macos.md) — macOS ADE terminology
- [APv1 vs APv2](apv1-vs-apv2.md) — Windows framework selection
- [Capability Matrix](reference/macos-capability-matrix.md) — Intune feature parity comparison

---

| Version | Change | Author |
|---------|--------|--------|
| 2026-04-14 | Resolved capability matrix forward references to reference/macos-capability-matrix.md | -- |
| 2026-04-13 | Initial version | -- |
