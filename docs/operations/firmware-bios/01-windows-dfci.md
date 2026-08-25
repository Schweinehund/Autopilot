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

<a id="dfci-oem-support"></a>
## OEM Support

DFCI reaches a short, named list of manufacturers, and the list is the first thing to check before
any of the rest of this guide is worth reading. The canonical enumeration lives on Microsoft's DFCI
management page, which names nine and states plainly that the list is open rather than closed:

> Acer. Asus. Dynabook. Fujitsu. Microsoft Surface. Panasonic. VAIO. Samsung. NEC.
>
> Other OEMs are pending.

**Source:** [Manage DFCI for Windows Autopilot devices](https://learn.microsoft.com/en-us/autopilot/dfci-management) (ms.date 2025-03-25, updated 2026-04-14)

That list is not the only one Microsoft publishes. Two other pages carry shorter variants of it, and
because a reader who greps for DFCI can land on either of them first, this guide records the
divergence as a documented conflict rather than silently preferring one page.

**The six-OEM variant.** The Intune BIOS-configuration page compares the two native BIOS surfaces
side by side, and its DFCI column names six manufacturers:

> Surface, Acer, Asus, Dynabook, Fujitsu, Panasonic

**Source:** [Use BIOS configuration profiles for Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows) (ms.date 2024-06-06, updated 2026-07-01)

Those six are a strict subset of the nine — the shorter list drops VAIO, Samsung and NEC, and adds
nothing. The page carrying it has an `ms.date` of 2024-06-06, roughly two years older than the
canonical list's 2025-03-25, and it is the oldest Microsoft Learn page cited anywhere in this guide.
It is also a side-reference: the column exists to contrast DFCI against the Dell-only BIOS
configuration surface, not to enumerate DFCI's own support matrix. Treat the nine-OEM list as
current and this one as stale.

**The one-OEM variant.** Microsoft's DFCI Scenarios page, published in the Project Mu documentation
set, carries a third list. Its own OEM section names a single manufacturer — Microsoft Surface,
rendered as a logo image linking to the Surface DFCI guide rather than as a text list — and closes
with:

> More are in the works...

**Source:** [Microsoft DFCI Scenarios](https://microsoft.github.io/mu/dyn/mu_feature_dfci/DfciPkg/Docs/Scenarios/DfciScenarios/) (page carries no publication or revision date)

That page is the narrowest of the three and the only one with no date at all, so it cannot be aged
against the other two. Microsoft does not designate any of the three lists as the authoritative one.
Instead the pages point at each other as further reading: the BIOS-configuration comparison column
sends the reader to the DFCI Scenarios page for more information, and the DFCI management page lists
that same DFCI Scenarios page under its related content. A reader following those pointers can
arrive at a shorter list than the one they started from, which is precisely why the count matters.

**Dell, HP and Lenovo are on none of the three lists.** DFCI is unavailable on Dell, HP and Lenovo
hardware — it is not an option an administrator declined, not a setting left switched off, and not a
capability that can be turned on by licensing, firmware update or configuration. There is no DFCI
profile to assign to those devices because the manufacturer never integrated the DFCI code and the
Microsoft Device Management Trust certificate into the firmware in the first place. Those fleets are
governed through an entirely different mechanism, and choosing between them is what
[Firmware and BIOS Governance](00-overview.md) exists to route.

<a id="surface-eligibility"></a>
## Surface Eligibility

Microsoft Surface is one of the nine supported manufacturers, and it is the only one whose DFCI
behavior Microsoft documents on a dedicated page. Four things on that page change what an
administrator can plan for.

**The prerequisite floor.** A Surface device must be at a supported Windows version and registered
with Windows Autopilot:

> Windows 11 or Windows 10 version 1809 or later

The eligible-device list on the same page is further narrowed by product SKU:

> Unless otherwise specified, listed devices are commercial SKUs only.

**Source:** [DFCI management for Surface devices](https://learn.microsoft.com/en-us/surface/surface-manage-dfci-guide) (ms.date 2026-07-14, updated 2026-07-14)

**Self-registered Surface devices never get DFCI.** This is the Surface-specific restatement of the
eligibility gate above, and it is worth reading as its own rule because it describes a working,
fully managed device that simply has no firmware control:

> DFCI won't be applied to self-registered devices.

**Source:** [DFCI management for Surface devices](https://learn.microsoft.com/en-us/surface/surface-manage-dfci-guide) (ms.date 2026-07-14, updated 2026-07-14)

A self-registered Surface enrolls in Intune, receives policy and reports compliance normally. Every
DFCI setting assigned to it is simply not applied, and nothing in the Intune console presents that
as an error, so the absence is easy to miss.

**Some settings Intune shows do not apply to Surface at all.** Intune exposes the full DFCI settings
catalog regardless of manufacturer, and a subset of it is inert on Surface hardware:

> DFCI in Intune includes settings that don't currently apply to Surface devices: CPU and IO virtualization, Disable Boot from network adapters, Windows Platform Binary Table (WPBT), NFC, and SD card.

**Source:** [DFCI management for Surface devices](https://learn.microsoft.com/en-us/surface/surface-manage-dfci-guide) (ms.date 2026-07-14, updated 2026-07-14)

That quotation follows the Surface page's own display names, and one of them diverges from the rest
of the product. The Intune DFCI settings reference names the same underlying setting **Boot from
network adapters**, without the leading **Disable** the Surface page uses. The two first-party pages
genuinely differ on the display name; this document quotes the Surface page, so the prefix is
present here and will be absent when the same setting is reached through the settings reference.

**Model eligibility is neither uniform nor stable.** Support is gated per model and, within a
family, per processor — a model can be excluded outright while its siblings are supported, and one
Surface Laptop generation is listed for Intel processors only. The current eligible-device list and
its exclusions live on the vendor page cited above; check them there against the exact SKU being
purchased or deployed rather than against a family name.

**The bound this section works to, stated on the record.** This guide ships no eligible-model table
and no table of which DFCI settings are gated to which Surface models. That is a deliberate scope
choice, not an omission: the requirements document's Out of Scope section bars per-model matrices
literally, on the ground that these guides route to vendor documentation rather than rewrite vendor
manuals. The reasoning holds independently of that bar, because a model list is high-churn data with
a short useful life — a copy of it is wrong the first time Microsoft ships a new Surface generation,
and wrong silently. The durable facts are the ones above: the floor, the self-registration rule, the
inert settings and the existence of per-model and per-processor gating. The current values behind
them belong at the vendor page.

<a id="dfci-settings-surface"></a>
## The Settings Surface

The Intune DFCI settings reference organizes everything a DFCI profile can reach into eight
categories: UEFI access, Security features, Cameras, Microphones and speakers, Radios, Boot Options,
Ports, and Wake settings. Most individual settings take one of three values — Not configured,
Enabled or Disabled — and the exceptions matter more than the pattern. The full per-setting option
matrix lives on that page and is deliberately not reproduced here; read it there, against the exact
profile you are about to assign.

**Source:** [Device Firmware Configuration Interface (DFCI) profile settings in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-dfci-settings-windows) (ms.date 2026-06-23, updated 2026-07-01)

One of those exceptions belongs here rather than in a footnote. In the Security features category,
CPU and IO virtualization is documented with two options and no third: there is no Disabled value for
it, so DFCI can switch platform virtualization on and structurally cannot switch it off. That
asymmetry has consequences further down this page.

**What ships here and what routes out.** This guide names a setting when it carries a durable,
high-consequence behavior — a bricking risk, an interaction trap, or a compliance conflict — and
routes the reader out to the vendor or Microsoft page when the setting is high-churn enumerable data
with no independent narrative value. Applying that rule honestly means about a dozen individual
setting names still appear in this file, across this section, the Surface section above and the
retire sequence below; the rule bounds which ones, not whether any do. It is also why the
requirements bar on per-model matrices does not reach the page cited above: that bar exists so these
guides route to vendor documentation rather than rewrite vendor manuals, and the DFCI settings
reference is a Microsoft Intune policy reference, not a vendor manual.

**Trap: a category setting and one of its granular members never converge.** Some DFCI settings are
categories — Microphones and speakers, or Radios (Bluetooth, Wi-Fi, NFC, etc.) — and some are
granular members of those categories, such as Microphones or Wi-Fi. Configure both and the profile
never settles. On the first sync the granular setting applies and the category setting is reported
noncompliant; on every sync afterward Intune applies the category setting because it is
noncompliant, which makes the granular setting noncompliant, then applies the granular setting,
which makes the category setting noncompliant again. The loop does not time out and nothing on the
device breaks it. Configure the category or the granular settings, never both.

Microsoft's own worked example is the case administrators reach for most often — permit Wi-Fi and
nothing else:

1. Leave the category setting Radios (Bluetooth, Wi-Fi, NFC, etc.) at Not configured.
2. Set the Wi-Fi radio setting to Enable.
3. Set all the other granular radio settings to Disabled.

**Source:** [Use DFCI profiles on Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-dfci-windows) (ms.date 2026-06-23, updated 2026-07-01)

**Trap: disabling external boot also disables network boot, and the pair cannot both be compliant.**
Setting Boot from external media (USB, SD) to Disabled also prevents the device booting from network
adapters, so pairing it with Boot from network adapters set to Enabled asks the firmware for two
states it cannot hold at once. The settings reference states the compliance result and the recovery
cost in the same place:

> When set to Disabled, don't set the Boot from network adapters setting to Enabled. It causes the Boot from external media (USB, SD) setting or Boot from network adapters setting to become noncompliant.
>
> Disabling all external boot options or all external ports significantly complicates OS recovery. To recover a device that can no longer boot Windows, you might have to physically open the device and replace the hardware storage.

**Source:** [Device Firmware Configuration Interface (DFCI) profile settings in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-dfci-settings-windows) (ms.date 2026-06-23, updated 2026-07-01)

On Surface hardware the recovery half has a named worst case, and it is published on the Surface
guide rather than in the settings reference:

> If you disable both Boot from external media and USB type A—and the device becomes unbootable for any reason—you won't be able to recover the device without replacing the SSD. You'll be unable to boot from external media and perform a PXE boot or DFCI refresh from the network.

**Source:** [DFCI management for Surface devices](https://learn.microsoft.com/en-us/surface/surface-manage-dfci-guide) (ms.date 2026-07-14, updated 2026-07-14)

Read the two halves together before locking a boot path. A device with no external boot route and no
network boot route has no remote recovery route either, so the repair becomes a hardware operation
on a bench, one device at a time.

**Trap: a disabled radios category needs a wired connection, or the device becomes unmanageable.**
Setting the Radios (Bluetooth, Wi-Fi, NFC, etc.) category to Disabled switches off the built-in
radios the firmware manages — including the ones the device would otherwise use to reach Intune:

> When you set this option to Disabled, the device requires a wired network connection. Otherwise, the device can be unmanageable.

**Source:** [Device Firmware Configuration Interface (DFCI) profile settings in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-dfci-settings-windows) (ms.date 2026-06-23, updated 2026-07-01)

**One firmware setting reaches all the way into update eligibility, in one direction only.** Reading
that chain backward is the mistake this part of the section exists to prevent:

1. The DFCI setting for CPU and IO virtualization exposes only Not configured and Enabled. DFCI can
   switch the platform's CPU and IO virtualization capabilities on — the settings reference records
   that enabling it also turns on Windows Virtualization Based Security and Device Guard — and it
   carries no value that switches them back off.
2. The exposure therefore does not live in a DFCI profile at all. A device whose
   virtualization-based security is off got there through firmware settings configured outside DFCI,
   at the manufacturer's own BIOS surface, and that is the only place it can be corrected.
3. The consequence surfaces in update servicing, months later and in a different console. A device
   without virtualization-based security enabled and running can be temporarily ineligible for the
   in-memory quality-update path:

> Devices might be temporarily ineligible because the devices don't have Virtualization-based Security (VBS) enabled and running.

**Source:** [Windows Autopatch - Frequently Asked Questions](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-faq) (ms.date 2026-05-28, updated 2026-05-28)

The eligibility half of that chain belongs to the update domain rather than this one. For the
Windows servicing policy that consumes it, including the driver and firmware update policy, see
[Windows WUfB Rings](../patch-management/01-windows-wufb-rings.md).

<a id="bricking-irreversible"></a>
## Bricking and Irreversible Configuration

Everything above assumes a device that can still be reached. This section is about the settings that
take that assumption away. Microsoft states the risk on the page that describes how to build a DFCI
profile, in its own words, without hedging:

> Configuring and assigning DFCI profiles can lock the device beyond repair. So, pay attention to the values you configure.

**Source:** [Use DFCI profiles on Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-dfci-windows) (ms.date 2026-06-23, updated 2026-07-01)

That is the DFCI surface's own warning, and it is the only one quoted in this guide. The Dell
Templates surface carries a separate, differently worded warning on a different Microsoft page,
about boot paths and encrypted volumes; it is quoted once, in
[Firmware and BIOS Governance](00-overview.md), and is not repeated here.

**Re-imaging does not undo any of it.** The settings reference adds a sentence the profile page does
not, and it is the one that makes the irreversibility concrete:

> The DFCI profile settings change the device hardware, and can't be fixed by re-imaging the OS.

**Source:** [Device Firmware Configuration Interface (DFCI) profile settings in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-dfci-settings-windows) (ms.date 2026-06-23, updated 2026-07-01)

Read that against the recovery instinct it defeats. The standard answer to a misconfigured Windows
device is to rebuild it, and rebuilding does not touch this layer. A DFCI setting survives the wipe,
survives the reinstall, and survives the device being handed to someone else.

**Deleting the profile removes nothing.** The instinct on discovering a bad DFCI profile is to
delete the profile, or to pull the device out of the group the profile is assigned to. Both are the
wrong move, and Microsoft says so directly:

> Deleting the DFCI profile, or removing a device from the group assigned to the profile doesn't remove DFCI settings or re-enable the UEFI (BIOS) menus.

**Source:** [Use DFCI profiles on Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-dfci-windows) (ms.date 2026-06-23, updated 2026-07-01)

Deleting the profile is worse than doing nothing, because it removes the only instrument that can
still change the device. The settings stay, the UEFI menus stay locked, and Intune no longer has a
profile through which to unlock them. To stop using DFCI on a device, update the settings in the
existing profile — do not delete it — and release the device through the retire sequence rather than
by withdrawing the assignment.

The retire sequence, the reuse sequence and the recovery path for a device already locked in the
wrong order are documented in the sections that follow, each with its own ordering constraints.

## Related Resources

- [Firmware and BIOS Governance](00-overview.md) — the domain overview: who holds the BIOS secret
  on Dell, HP and Lenovo hardware, the two native Intune BIOS surfaces, and what this domain does
  not own

## External References

- [Device Firmware Configuration Interface (DFCI) profile settings in Microsoft Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-dfci-settings-windows)
- [Use BIOS configuration profiles for Windows devices in Microsoft Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows)
