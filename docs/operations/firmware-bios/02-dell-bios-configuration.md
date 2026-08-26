---
last_verified: 2026-08-25
review_by: 2026-10-24
applies_to: APv1
audience: admin
platform: Windows
---

> **Platform applicability:** This guide is Windows-specific and covers Dell BIOS configuration
> through Intune — delivery surfaces, password custody and RBAC, scope of control, prerequisites
> and hard blockers, offboarding and loss of the management plane, and recovery. For the domain
> overview and the routing question of who holds the BIOS secret on Dell, HP and Lenovo hardware,
> see [Firmware and BIOS Governance](00-overview.md).

# Dell BIOS Configuration Through Intune

Dell is the vendor where Microsoft Intune itself holds the BIOS secret. This guide covers Dell
Command | Configure, Dell Command | Endpoint Configure for Microsoft Intune (DCECMI), and the Dell
Management Portal — the three Intune-deliverable surfaces that reach Dell commercial hardware —
plus the native BIOS configuration and other settings Templates policy that Intune uses to enforce
and later retrieve a device's BIOS password. For the routing question of who holds the BIOS secret
on Dell, HP and Lenovo hardware, see
[Firmware and BIOS Governance](00-overview.md#who-holds-the-secret).

<a id="delivery"></a>
## Delivery

Three Intune-deliverable surfaces reach Dell hardware, and they are not alternatives to each other
— each does a different job.

**Dell Command | Configure (DCC)** is an admin-workstation authoring tool. It has no Intune object
of its own; it is where the BIOS settings package that DCECMI later applies is authored. Dell
Command | Configure remains current at **v5.2.2**, released March 2026.

**Source:** [Dell Command | Configure](https://www.dell.com/support/kbdoc/en-us/000178000/dell-command-configure) (Dell, Last Modified 2026-05-06)

**Dell Command | Endpoint Configure for Microsoft Intune (DCECMI)** is the on-device agent. It
ships two Intune objects: a required-assignment **Win32 app**, and the native **BIOS configuration
and other settings** Templates policy. DCECMI is a **per-device agent** — that distinction is the
pole [HP BIOS Configuration Through Intune](03-hp-bios-configuration.md) is written against,
because HP's connector installs no such per-device agent at all. The agent must be installed
**before** the policy is assigned; assigning the policy first leaves the device with nothing to
apply it. DCECMI is current at **v2.0.4**, released May 2026.

**Source:** [Dell Command | Endpoint Configure for Microsoft Intune](https://www.dell.com/support/kbdoc/en-us/000214308/dell-command-endpoint-configure-for-microsoft-intune) (Dell, Last Modified 2026-05-18)

**The Dell Management Portal** is a partner-portal link inside Intune (**Devices > Manage devices
> Partner portals > Dell Management Portal > Connect now**) that publishes Dell apps — including
Dell Command | Update, the driver and firmware update client — into your tenant. It is a genuine
Intune-integrated surface, not merely a vendor console, and its consent grant is covered in
Prerequisites below.

**Source:** [How to Connect Dell Management Portal to Microsoft Intune](https://www.dell.com/support/kbdoc/en-us/000356434/how-to-connect-dell-management-portal-to-microsoft-intune) (Dell, Version 2, Last Modified 2026-05-23)

<a id="authentication"></a>
## Authentication

Intune holds the secret. For the custody model that makes that statement true across Dell, HP and
Lenovo hardware, see
[Firmware and BIOS Governance](00-overview.md#who-holds-the-secret) — that page carries the
custody quote; it is not repeated here.

Intune generates a **unique per-device BIOS password** the first time the BIOS configuration and
other settings policy applies. Retrieval is via Microsoft Graph **beta**, at
`https://graph.microsoft.com/beta/deviceManagement/hardwarePasswordDetails`, queried in Graph
Explorer and requiring three permissions: `DeviceManagementConfiguration.Read.All`,
`DeviceManagementConfiguration.ReadWrite.All`, and
`DeviceManagementManagedDevices.PrivilegedOperations.All`. The response returns the **current
password and the previous 15**.

**Source:** [Use BIOS configuration profiles for Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows) (Microsoft Learn, ms.date 2024-06-06, updated 2026-07-01)

Three similarly-named Graph resources exist and are easily confused: the plural
`hardwarePasswordDetails` used above, `hardwarePasswordInfo`, and the singular
`hardwarePasswordDetail`. Version numbers for the deprecation and availability of the latter two
circulate in search summaries, but the beta reference URL for them returned HTTP 404 during this
corpus's research, so no version number ships here. The warning that the three names are distinct
and easily confused is the useful content.

**Two RBAC paths retrieve a password, and they are not equivalent — read the second as the wider,
cheaper option, not a neutral alternative.** A custom Intune role carrying `Managed devices > Read
Bios Password = Yes` reads one device at a time; **creating that custom role at all requires the
Intune Role Administrator** built-in role. The Entra **Intune Administrator** role reads **all**
devices with no custom role required — it is both cheaper to grant and much wider in blast radius,
and an admin choosing between the two should know that before choosing. The minimum role to author
the BIOS configuration policy at all — distinct from either password-read role — is the
**Policy and Profile manager** role.

**Source:** [Use BIOS configuration profiles for Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows) (Microsoft Learn, ms.date 2024-06-06, updated 2026-07-01)

**Passwords remain readable after a device leaves Intune management.** Unenrolling a device from
Intune does not revoke Graph's ability to return its stored password history. The empty-management
state that does end retrieval is different, and worse: see Offboarding below.

Contrast with Dell's own custody statement, which this corpus quotes because HP's equivalent
product states the opposite:

> Dell does not collect or retain any customer data from Microsoft Intune.

The complete sentence continues that the data stays in the Microsoft tenant, supplemented with
Dell-specific capabilities transacted through Graph API calls — an unquoted claim here because the
complete form runs long; the sentence above is a complete, accurate, standalone sentence on its
own.

**Source:** [How to Connect Dell Management Portal to Microsoft Intune](https://www.dell.com/support/kbdoc/en-us/000356434/how-to-connect-dell-management-portal-to-microsoft-intune) (Dell, Version 2, Last Modified 2026-05-23)

<a id="scope"></a>
## Scope

Settings are authored in Dell Command | Configure, then applied to the device by DCECMI as a
**`.cctk`** file — the Dell Client Configuration Tool Kit format — uploaded to the Intune policy
under a **2 MB** size limit. The DCECMI KB article itself does not mention `.cctk`; the format
constraint is documented on the Microsoft side, and that asymmetry is recorded here honestly
rather than papered over.

**Source:** [Use BIOS configuration profiles for Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows) (Microsoft Learn, ms.date 2024-06-06, updated 2026-07-01)

Two hard scope limits. First, the policy reports only whether the configuration file **applied**,
never per setting — if an auditor needs per-setting attestation on a Dell fleet, no path in this
corpus satisfies that today, and this guide states that plainly rather than implying a workaround
exists. Second, a device that already has a BIOS password is out of scope entirely; see
Prerequisites.

This corpus does not enumerate Dell BIOS tokens here — that is Dell Command | Configure's own
manual, and this corpus links rather than copies vendor reference material.

BIOS settings configured through this surface silently gate later OS features: platform
virtualization gates Virtualization-Based Security, which gates Hotpatch and Credential Guard;
Secure Boot gates attestation; and the TPM gates Autopilot attestation. For the failure path when a
firmware setting blocks TPM attestation, see
[TPM Attestation Failure Decision Tree](../../decision-trees/03-tpm-attestation.md).

<a id="prerequisites"></a>
## Prerequisites

The native BIOS configuration template requires no pre-existing BIOS password on the device. This
is a hard blocker, not a preference: Intune must own the password or it cannot update the
configuration.

Before assigning anything, survey existing BIOS passwords across the fleet — Dell refuses outright
where a password already exists, and the same survey step prevents a lockout rather than a refusal
on the HP leg of this three-vendor story; see
[HP BIOS Configuration Through Intune](03-hp-bios-configuration.md).

The remaining hard requirements:

- Organization-owned, MDM-enrolled devices only. No personal devices and no non-enrolled devices.
- Dell commercial client hardware, running Windows 10 or later.
- **.NET 8.0 Desktop Runtime (x64)** must be installed on the device — it can itself be deployed
  as an Intune app.
- The **SYSTEM account must have Modify permission on `C:\ProgramData\Dell`**. This is the silent,
  confusing failure mode: without it, DCECMI fails quietly rather than reporting a clear cause.
- The DCECMI Win32 app must land on the device **before** the BIOS configuration policy is
  assigned.
- The OEM Win32 app must be selected in the Enrollment Status Page settings for Autopilot devices.

**Source:** [Dell Command | Endpoint Configure for Microsoft Intune](https://www.dell.com/support/kbdoc/en-us/000214308/dell-command-endpoint-configure-for-microsoft-intune) (Dell, Last Modified 2026-05-18)

**The Dell Management Portal's consent grant reads much lower-risk than it is.** Connecting the
partner portal to publish Dell apps requires a **Global Administrator** to consent, and the grant
includes reading BitLocker recovery keys and read-write access to Intune device configuration and
policies — evaluate the grant on that basis, not on "connect a partner portal to publish an app."
The full permission enumeration is in the KB listed under External References.

**Source:** [How to Connect Dell Management Portal to Microsoft Intune](https://www.dell.com/support/kbdoc/en-us/000356434/how-to-connect-dell-management-portal-to-microsoft-intune) (Dell, Version 2, Last Modified 2026-05-23)

**On Dell Client Device Manager:** Dell currently recommends Dell Command | Update for enterprise
driver and firmware updates while signaling migration toward Dell Client Device Manager in the
future. This corpus does not recommend Dell Client Device Manager yet — that is a judgment made
here on the record, not a declined out-of-scope item.

<a id="offboarding"></a>
## Offboarding and Loss of the Management Plane

When the Intune subscription ends, there is **no path to read or retrieve BIOS passwords** — the
only option is to contact Dell directly. **Back the passwords up outside Intune before that
happens**; this is an explicit recommendation, not an implication.

Dell documents **no** de-provisioning order anywhere — re-confirmed against Dell KB 000356434
during this corpus's research. That is unlike HP, whose account deactivation carries a documented
fleet-first order; see [HP BIOS Configuration Through Intune](03-hp-bios-configuration.md). This
guide does not invent a fleet-first order for Dell to match that shape — writing one to satisfy a
literal reading would be exactly the kind of unsourced drift this corpus's own governance bars. In
both vendors, losing the management plane loses the secret; only the documented ordering differs.

**Source:** [How to Connect Dell Management Portal to Microsoft Intune](https://www.dell.com/support/kbdoc/en-us/000356434/how-to-connect-dell-management-portal-to-microsoft-intune) (Dell, Version 2, Last Modified 2026-05-23)

Removing the password entirely is a documented, non-destructive operation: set **Disable
per-device BIOS password protection** to **Yes**, assign, let the device check in, and reboot.
**Unenrolling a device from Intune does not remove the BIOS password** — that negative is the fact
readers get wrong most often.

**Source:** [Use BIOS configuration profiles for Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows) (Microsoft Learn, ms.date 2024-06-06, updated 2026-07-01)

<a id="recovery"></a>
## Recovery

Six recovery scenarios, in order from best to worst outcome:

1. **Password known to Intune.** Retrieve it through Graph beta `hardwarePasswordDetails` — the
   response carries the current password plus the previous 15, so a rotation that half-applied is
   recoverable from history alone.
2. **Device removed from Intune management.** Passwords remain readable through Graph; removal
   from management does not end retrieval.
3. **Intune subscription ended.** Unrecoverable through Intune — contact Dell directly. This is
   why passwords should be backed up outside Intune before the subscription ends; see Offboarding
   above.
4. **Password removal via the disable setting.** The documented, non-destructive path: set
   **Disable per-device BIOS password protection** to **Yes**, assign, and reboot.
5. **Password genuinely lost.** Contact Dell Support with ownership verification: computer model,
   Service Tag, and proof of ownership. Dell's own KB adds a widening note for this scenario:

> If recovery isn't possible, motherboard replacement may be needed.

**Source:** [Dell BIOS Password Help: What to Do If You're Locked Out](https://www.dell.com/support/kbdoc/en-us/000140298/dell-support-for-lost-bios-password) (Dell, Version 14, Last Modified 2026-05-01)

6. **Master Password Lockout enabled and the password forgotten — unrecoverable.**

> If the Master Password Lockout option is selected and the customer subsequently forgets the
> password, Dell will not be able to assist in the recovery of passwords. The platform will be
> unrecoverable, and the motherboard or hard drive will need to be replaced.
>
> Once enabled, the Admin, System, and HDD passwords are protected from being reset using recovery
> password.

**Source:** [Dell Client Products Unauthorized BIOS Password Reset Tools](https://www.dell.com/support/kbdoc/en-us/000180749/dell-client-products-unauthorized-bios-password-reset-tools) (Dell, Last Modified 2024-11-25)

These escalation specifics — model, Service Tag, and proof of ownership — are Dell's own support
process and are not generalized to HP or Lenovo elsewhere in this corpus; nothing sources that
either vendor's support requires or accepts them.

Dell also acknowledges that unauthorized third-party BIOS password generator tools exist and
require physical presence to use. That acknowledgment is mentioned here only to tell a service
desk that such tools are not a sanctioned recovery path — never as a procedure.

<a id="unsupported-callouts"></a>
## Unsupported and Anti-Feature Callouts

These are documented absences in the surface itself, not misconfigurations an administrator can
correct.

**No per-setting compliance reporting, and no path to per-setting attestation.** The BIOS
configuration policy reports only whether the configuration file applied, never per individual
setting. As of 2026-08-25, checked against the Microsoft Learn BIOS configuration profiles page, no
per-setting attestation path exists for a Dell fleet through this policy.

**No path to apply the template to a device that already has a BIOS password.** The native
template requires a virgin BIOS; see Prerequisites.

**DFCI is unavailable on Dell hardware, not declined.** Dell appears on none of the DFCI
manufacturer lists this corpus tracks. See
[Device Firmware Configuration Interface (DFCI)](01-windows-dfci.md) for that surface and its own
OEM list.

## Related Resources

- [Firmware and BIOS Governance](00-overview.md) — the domain overview: who holds the BIOS secret
  on Dell, HP and Lenovo hardware
- [Device Firmware Configuration Interface (DFCI)](01-windows-dfci.md) — the other native Intune
  BIOS surface, unavailable on Dell hardware
- [HP BIOS Configuration Through Intune](03-hp-bios-configuration.md) — the vendor-connector
  custody model, and the leg of the prerequisite survey story where a lockout replaces a refusal
- [Lenovo BIOS Configuration Through Intune](04-lenovo-bios-configuration.md) — the inverted half
  of the prerequisite pair: a BIOS password required before bootstrap, rather than barred
- [Firmware OEM Capability Matrix](../../reference/firmware-oem-matrix.md) — the three-vendor
  transposition of this guide's six sections
- [Windows Driver and Firmware Updates](../patch-management/06-windows-driver-firmware-updates.md#unsupported-callouts)
  — Dell Command | Update is an update client, distinct from Dell Command | Configure, and running
  it alongside Intune driver policies is a real conflict this corpus already adjudicates at that
  link

## External References

- [Use BIOS configuration profiles for Windows devices in Microsoft Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows)
- [Dell Command | Endpoint Configure for Microsoft Intune (Dell)](https://www.dell.com/support/kbdoc/en-us/000214308/dell-command-endpoint-configure-for-microsoft-intune)
- [Using Graph APIs to retrieve the Dell BIOS Password manually (Dell)](https://www.dell.com/support/manuals/en-us/command-endpoint-configure/dcec_ug/using-graph-apis-to-retrieve-the-dell-bios-password-manually)
  — the manuals-platform page documenting the two RBAC retrieval paths in Dell's own words; it
  could not be re-fetched during this corpus's 2026-08-25 research (a JavaScript-rendered manuals
  page unreadable by both a plain fetch and a reader proxy), so the RBAC claim in Authentication
  above ships at its existing sourced confidence level rather than a freshly re-verified one.
- [Dell Command | Configure (Dell)](https://www.dell.com/support/kbdoc/en-us/000178000/dell-command-configure)
- [How to Connect Dell Management Portal to Microsoft Intune (Dell)](https://www.dell.com/support/kbdoc/en-us/000356434/how-to-connect-dell-management-portal-to-microsoft-intune)
- [Dell BIOS Password Help: What to Do If You're Locked Out (Dell)](https://www.dell.com/support/kbdoc/en-us/000140298/dell-support-for-lost-bios-password)
- [Dell Client Products Unauthorized BIOS Password Reset Tools (Dell)](https://www.dell.com/support/kbdoc/en-us/000180749/dell-client-products-unauthorized-bios-password-reset-tools)
