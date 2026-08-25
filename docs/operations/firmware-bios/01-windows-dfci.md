---
last_verified: 2026-08-24
review_by: 2026-10-23
applies_to: APv1
audience: admin
platform: Windows
---

> **Platform applicability:** This guide is Windows-specific and covers the Device Firmware
> Configuration Interface (DFCI) as its own surface — what the interface is, its prerequisites and
> disqualifiers, OEM support, Surface eligibility, the settings surface, and the irreversible
> configuration, retire, reuse and recover sequences. For the domain overview and the routing
> question of who holds the BIOS secret on Dell, HP and Lenovo hardware, see
> [Firmware and BIOS Governance](00-overview.md).

# Device Firmware Configuration Interface (DFCI)

DFCI is the interface Microsoft Intune uses to manage UEFI (BIOS) settings on supported Windows
devices without a BIOS password and without an operator touching the hardware. It is one of the two
native Intune BIOS surfaces described in
[Firmware and BIOS Governance](00-overview.md); the other reaches Dell hardware only.

<a id="what-dfci-is"></a>
## What DFCI Is

DFCI is not an agent and not a script. Intune delivers a DFCI profile through a configuration
service provider that addresses the device firmware directly, below the operating system. The
settings reference names that interface without ambiguity:

> These settings use the UEFI CSP.

Reporting follows the same shape as delivery: it is per setting rather than per profile, so one
setting can be reported noncompliant while the rest of the profile applies — the settings reference
documents exactly that outcome for one pair of boot settings.

**Source:** [Device Firmware Configuration Interface (DFCI) profile settings in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-dfci-settings-windows) (ms.date 2026-06-23, updated 2026-07-01)

Because that layer sits below the operating system, a DFCI setting is not undone by reinstalling
Windows. Authorization does not come from a password an operator supplies; it travels a certificate
trust chain that begins with the OEM attesting the device's commercial acquisition at Autopilot
registration and ends at the Intune tenant that owns the profile. The device firmware honors the
profile because it trusts that chain. Microsoft's own comparison of the two native BIOS surfaces
describes the DFCI path as:

> Through UEFI CSP using the DFCI layer, which is isolated from the OS

**Source:** [Use BIOS configuration profiles for Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows) (ms.date 2024-06-06, updated 2026-07-01)

Two consequences shape everything else in this guide. Settings that reach the firmware are not
reversible by ordinary OS-level recovery, and a trust chain anchored at registration is a trust
chain that can be broken by how a device is registered, retired or reused.

## Related Resources

- [Firmware and BIOS Governance](00-overview.md) — the domain overview: who holds the BIOS secret
  on Dell, HP and Lenovo hardware, the two native Intune BIOS surfaces, and what this domain does
  not own

## External References

- [Device Firmware Configuration Interface (DFCI) profile settings in Microsoft Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-dfci-settings-windows)
- [Use BIOS configuration profiles for Windows devices in Microsoft Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows)
