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

<a id="dfci-prerequisites"></a>
## Prerequisites and Disqualifiers

DFCI's eligibility gate has three parts, and all three must hold. The device must be registered with
Windows Autopilot; that registration must have been performed by a party who can attest to the
device's commercial acquisition; and the operating system and the firmware must both be at a
supported level. The third part is the least restrictive of the three, and Microsoft states it
broadly rather than by build number:

> A currently supported version of Windows and a supported UEFI is required.

**Source:** [Manage DFCI for Windows Autopilot devices](https://learn.microsoft.com/en-us/autopilot/dfci-management) (ms.date 2025-03-25, updated 2026-04-14)

The second part is the one that disqualifies whole fleets, and it is stated first-party without
hedging:

> You can't use DFCI with devices manually registered for Windows Autopilot, such as imported from a csv file.
> By design, DFCI management requires external attestation of the device's commercial acquisition through an OEM or a Microsoft CSP partner registration to Windows Autopilot.

**Source:** [Use DFCI profiles on Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-dfci-windows) (ms.date 2026-06-23, updated 2026-07-01)

Read that gate for what it actually turns on. The disqualifier is not the file format the hash
arrived in, and it is not the tool that produced the hash — it is who vouched for the purchase. A
registration performed by the OEM, or by a Microsoft CSP partner, carries external attestation of
commercial acquisition. A registration an administrator performs from their own console does not,
whatever tool produced the hash.

**The four registration channels, classified.** This corpus teaches four ways a device reaches the
Autopilot service — the four rows of the Import Methods table in
[Hardware Hash Collection](../../lifecycle/01-hardware-hash.md). The qualifying column below is
derived from the first-party gate quoted above, which names an OEM registration and a Microsoft CSP
partner registration as the two that confer the external attestation DFCI requires.

| Channel | Qualifies for DFCI | Why |
|---|---|---|
| CSV upload | No | Manual registration by the administrator; the source names a csv import as its own disqualifying example |
| OEM direct registration | Yes | The OEM registers the device at the factory and thereby attests to its commercial acquisition |
| PowerShell `Get-WindowsAutopilotInfo`, including `-Online` | No | Manual registration by an administrator or technician; no external party attests to the purchase |
| Partner Center / CSP partner | Yes | The gate names a Microsoft CSP partner registration alongside an OEM one |

The `-Online` switch deserves its own sentence, because it is the case administrators most often
expect to qualify. It removes the CSV file from the workflow by writing the hash straight to the
tenant, but the registering party is still the administrator, so the device is still manually
registered and DFCI is still unavailable on it.

A reader who registered a fleet through the CSV or PowerShell paths documented in
[Hardware Hash Upload](../../admin-setup-apv1/01-hardware-hash-upload.md) does not have DFCI
available, and no Intune-side configuration change makes it available. The attestation had to be
present at registration time; re-registering through a qualifying channel is the only route to it.

**APv2 fleets have no DFCI at all.** A Windows Autopilot device preparation (APv2) fleet carries no
Autopilot registration in the sense this gate means. The APv2 admin setup registers devices with a
manufacturer, model and serial-number CSV rather than a hardware hash, in
[Corporate Identifiers](../../admin-setup-apv2/04-corporate-identifiers.md), and the
[APv2 Admin Setup Overview](../../admin-setup-apv2/00-overview.md) states that any existing APv1
registration must be removed before APv2 works at all. No Autopilot registration means no external
attestation, which means no DFCI, ever, on those devices. That conclusion is this corpus's own
reading of its two APv2 documents against the gate quoted above; Microsoft does not state it, and no
citation here should be read as if it did.

**A known issue blocks DFCI on 24H2 Professional during OOBE.** It carries its own workaround, and
both halves are first-party:

> DFCI can't currently be configured during the out-of-box experience (OOBE) on devices with Professional editions of Windows 11, version 24H2
> For devices that have already been provisioned and have Professional editions of Windows 11, version 24H2, install KB5046740 or later to enroll in DFCI. Devices with Professional editions of Windows 11, version 24H2 that have KB5046740 or later installed are automatically enrolled in DFCI after a reboot.

**Source:** [Manage DFCI for Windows Autopilot devices](https://learn.microsoft.com/en-us/autopilot/dfci-management) (ms.date 2025-03-25, updated 2026-04-14)

For a device that must have DFCI configured during OOBE rather than afterward, the source's second
route is an edition change made mid-provisioning: upgrade the device to the Enterprise edition of
Windows 11, version 24H2 during OOBE onboarding, then sync the device and reboot it to get it
enrolled in DFCI. Both routes leave the rest of the provisioning sequence alone — the Autopilot
deployment profile, the Enrollment Status Page (ESP) profile and the DFCI profile are still created
and assigned in the usual order, and it is DFCI enrollment specifically, not device enrollment, that
the known issue blocks.

## Related Resources

- [Firmware and BIOS Governance](00-overview.md) — the domain overview: who holds the BIOS secret
  on Dell, HP and Lenovo hardware, the two native Intune BIOS surfaces, and what this domain does
  not own

## External References

- [Device Firmware Configuration Interface (DFCI) profile settings in Microsoft Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-dfci-settings-windows)
- [Use BIOS configuration profiles for Windows devices in Microsoft Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows)
