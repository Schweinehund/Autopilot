---
last_verified: 2026-08-24
review_by: 2026-10-23
applies_to: APv1
audience: admin
platform: Windows
---

> **Platform applicability:** This overview is Windows-specific and routes firmware and BIOS
> configuration work by which party holds the BIOS secret — Dell, HP and Lenovo custody, the two
> native Intune BIOS surfaces and why they are disjoint, what this domain does not own, and where
> it sits beside firmware update delivery. For DFCI mechanics, prerequisites, OEM support and the
> device removal sequences, see
> [Device Firmware Configuration Interface (DFCI)](01-windows-dfci.md).

# Firmware and BIOS Governance

Firmware and BIOS governance decides which BIOS settings a managed Windows device is allowed to
have, and who is permitted to change them. That is a different question from firmware updates,
which deliver vendor payloads onto a device and are owned elsewhere in this corpus.

This overview routes by custody of the BIOS secret rather than by tool. The credential that
authorizes a BIOS change is what actually differs between manufacturers, and everything else —
console, connector, recovery path, what happens when a subscription lapses — follows from it.

<a id="who-holds-the-secret"></a>
## Who Holds the BIOS Secret

Dell, HP and Lenovo each answer the custody question differently. Find your manufacturer, read the
custody column, and the operating model follows.

| Manufacturer | Who holds the BIOS secret | Reached through |
|---|---|---|
| Dell | Microsoft Intune, inside your tenant | The BIOS configuration and other settings Templates policy |
| HP | HP, in a cloud vault outside your tenant | HP Connect for Microsoft Endpoint Manager, a vendor connector |
| Lenovo | You, as an encrypted INI file or as a private key in your own Azure Key Vault | Think BIOS Config Tool V2 and Lenovo BIOS Certificate Tool V2 |

**Dell — Intune holds the secret.** Dell hardware is reached through the BIOS configuration and
other settings Templates policy, created and assigned in the Intune console. Custody and vendor
coverage are both stated on the Microsoft page for that surface:

> Intune stores the BIOS passwords for each device.
>
> Currently, only Dell is supported.

**Source:** [Use BIOS configuration profiles for Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows) (ms.date 2024-06-06, updated 2026-07-01)

**HP — HP holds the secret, outside your tenant.** HP hardware is reached through HP Connect for
Microsoft Endpoint Manager, a vendor connector administered at `admin.hp.com` rather than in the
Intune console. The BIOS password is never held by your tenant at all:

> Passwords are managed by HP Connect and stored in a cloud vault.

**Source:** [HP Connect for Microsoft Endpoint Manager — User Guide](https://connect.admin.hp.com/static/HPConnectUserGuide.pdf) (Version 1.2.0, published 2022-09-27)

That guide is version 1.2.0 from 2022 and is the oldest source cited anywhere in this domain. The
custody model it documents is the durable fact; the console details, and the Microsoft Endpoint
Manager branding carried in the connector's own product name, both predate Intune's current naming.
Confirm the connector's current name and its administration surface at `admin.hp.com` before acting
on this section.

**Lenovo — you hold the secret.** Lenovo hardware is reached through Think BIOS Config Tool V2 and
Lenovo BIOS Certificate Tool V2. The secret is either an encrypted INI file that you store and
protect, or a signing certificate whose private key you keep in your own Azure Key Vault:

> The Lenovo BIOS Certificate Tool has been updated with a new UI and the Lenovo.BIOS.Certificates module has been updated to include support for Azure Key Vault for storage of private keys used in signing the settings change commands.

**Source:** [Introducing Think BIOS Config Tool V2 and Lenovo BIOS Certificate Tool V2](https://blog.lenovocdrt.com/introducing-think-bios-config-tool-v2-and-lenovo-bios-certificate-tool-v2/) (published 2025-11-04)

Of the three, Lenovo is the only manufacturer whose signing key can sit in infrastructure you own
outright, and therefore under your own Azure role-based access control (RBAC), audit logging and
key rotation policy. Lenovo makes no such comparative claim, and the post cited above uses none of
those three terms. Read that comparison as this corpus's own inference from the documented platform
behavior of Azure Key Vault, applied to the one custody fact Lenovo does state: the private key
lives in your Azure Key Vault, not in Intune and not in a vendor cloud.

The custody answer is also the answer to what happens when the relationship ends. A secret held by
Intune ends with the Intune subscription; a secret held in a vendor cloud ends on the vendor's
terms; a secret you hold outlives both, and is yours to lose.

<a id="native-bios-surfaces"></a>
## The Two Native Intune BIOS Surfaces

Intune has two native ways to reach firmware settings, and they are disjoint: no device is governed
by both. Which one applies is decided by hardware, not by preference or licensing.

**DFCI is the broad surface, and it reaches none of Dell, HP or Lenovo.** DFCI reaches the nine
OEMs enumerated on the Autopilot DFCI management page. That count is not the only one Microsoft
publishes: two further pages carry shorter lists, of six manufacturers and of one.
[Device Firmware Configuration Interface (DFCI)](01-windows-dfci.md) carries all three, together
with the canonical list's trailing statement about OEMs still pending, and records the divergence as
a documented conflict rather than resolving it.

**Source:** [Manage DFCI for Windows Autopilot devices](https://learn.microsoft.com/en-us/autopilot/dfci-management) (ms.date 2025-03-25, updated 2026-04-14)

**BIOS configuration and other settings is the narrow surface, and it reaches Dell alone.** It is a
Templates policy in the Intune console, and it works the way vendor BIOS tooling works rather than
the way DFCI works: you upload the manufacturer's own configuration file, and Intune holds the BIOS
password.

> For Dell, upload the Dell Client Configuration Tool Kit file (.cctk). The file size limit is 2 MB.

**Source:** [Use BIOS configuration profiles for Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows) (ms.date 2024-06-06, updated 2026-07-01)

Disjointness follows from those two reaches. The manufacturers DFCI supports are not the
manufacturer the Templates policy supports, so a device that qualifies for one never qualifies for
the other. Do not plan a fleet on the assumption that one surface backstops the other.

<a id="choosing-a-path"></a>
## Choosing a Path

Start from the manufacturer, not from the tool.

- **Dell fleet** — Intune holds the BIOS password. Use the BIOS configuration and other settings
  Templates policy, and upload a Dell Client Configuration Tool Kit file.
- **HP fleet** — HP holds the BIOS password in its own cloud vault. Work through HP Connect for
  Microsoft Endpoint Manager. The secret never enters your tenant, so offboarding runs on HP's
  terms rather than yours.
- **Lenovo fleet** — you hold the secret. Work through Think BIOS Config Tool V2 and Lenovo BIOS
  Certificate Tool V2, and decide up front whether the secret is an encrypted INI file or a private
  key in your own Azure Key Vault. That choice is the one with lasting consequences.
- **Surface, or another OEM DFCI supports** — no BIOS password is involved at all. Go to
  [Device Firmware Configuration Interface (DFCI)](01-windows-dfci.md).

Two questions settle almost every case: does your hardware appear on the DFCI OEM list, and if it
does not, who is willing to hold your BIOS password. Vendor-specific procedures for Dell, HP and
Lenovo are not yet written in this corpus — this section names the surface and the custody model so
the choice can be made before the procedure exists.

<a id="domain-boundary"></a>
## What This Domain Does Not Own

Four adjacent things are routinely mistaken for firmware configuration. Each has an owner
elsewhere in this corpus.

**TPM state and attestation failures.** Triaged in
[TPM Attestation Failure Decision Tree](../../decision-trees/03-tpm-attestation.md). That document
is written for L1 triage while this one is written for administrators, so expect a change of
altitude across the link — read it as a triage path, not as a configuration reference.

**Secure Boot.** Defined in [Secure Boot](../../_glossary.md#secure-boot) as a UEFI firmware
feature in its own right. Nothing in this domain turns it on or off.

**BitLocker and security baseline interactions.** Owned by
[Security Baseline Interactions with Autopilot Provisioning](../../reference/security-baseline-conflicts.md).
BitLocker appears in this domain only as a consequence — a BIOS change can cost you access to an
encrypted drive — never as a setting this domain configures.

**Firmware updates.** Owned by
[Windows Driver and Firmware Updates](../patch-management/06-windows-driver-firmware-updates.md),
and separated from firmware configuration in the next section.

Neither TPM nor Secure Boot appears in the DFCI settings surface, and the ground for saying so is
an enumeration rather than a prohibition. The DFCI settings reference enumerates eight setting
categories — UEFI access, Security features, Cameras, Microphones and speakers, Radios,
Boot Options, Ports, and Wake settings — and neither TPM nor Secure Boot appears among them.

**Source:** [Device Firmware Configuration Interface (DFCI) profile settings in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-dfci-settings-windows) (ms.date 2026-06-23, updated 2026-07-01)

No Microsoft page states the exclusion as a limitation. What the enumeration shows is the strongest
form the claim can honestly take, and it is the form used here.

<a id="updates-vs-configuration"></a>
## Where This Domain Fits

Two domains in this corpus carry the word firmware, and they answer different questions.

Firmware *updates* are delivery — getting a manufacturer's firmware payload onto a device, on a
schedule, through the Intune driver and firmware update policy. That is owned by
[Windows Driver and Firmware Updates](../patch-management/06-windows-driver-firmware-updates.md).

Firmware *configuration* is policy — deciding which BIOS settings a device is allowed to have, and
who is permitted to change them. That is this domain.

A device can be fully current on firmware and still have every BIOS setting wrong, and it can be
locked down correctly while running firmware from three years ago. If the question is when a
payload arrives, it belongs to the update domain. If the question is what the firmware is permitted
to do once it is there, it belongs here.

<a id="before-you-start"></a>
## Before You Start

BIOS configuration is not an ordinary policy assignment. It changes hardware, and the failure modes
are physical.

> BIOS configuration changes can impact device functionality and operability, including the ability to boot or access Bitlocker encrypted drives.

**Source:** [Use BIOS configuration profiles for Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows) (ms.date 2024-06-06, updated 2026-07-01)

Read that as written. A wrong BIOS setting can cost you the boot path, or the encrypted volume
behind it, on a device nobody can reach remotely. Before assigning anything on the Dell Templates
surface, pilot on a small group you can physically recover, and confirm your BitLocker recovery
keys are escrowed and retrievable first.

DFCI carries its own, separately worded warning about irreversible configuration, published on a
different Microsoft page. It is quoted once, in
[Device Firmware Configuration Interface (DFCI)](01-windows-dfci.md), and is not restated here.

<a id="unsupported-callouts"></a>
## Unsupported and Anti-Feature Callouts

**DFCI is unavailable on Dell, HP and Lenovo hardware — unavailable, not declined.** None of the
three appears on any of the three DFCI OEM lists, so there is no DFCI profile to assign to them and no
configuration that makes one apply. This is why custody is the routing question: for Dell, HP and
Lenovo fleets the answer is a vendor path, not an Intune-native one.

**The native Templates surface supports exactly one manufacturer.** Not one manufacturer today with
others announced — one, stated flatly on the Microsoft page quoted above. Plan Dell BIOS
configuration as a single-vendor capability, and do not budget for it to widen.

**The TPM and Secure Boot exclusion is not a documented limitation.** No first-party sentence states
it, so there is nothing to cite and nothing to raise a support case against. The only honest ground
is the enumeration recorded above. Treat it as an observation about the settings surface as
currently documented, and re-check it whenever the settings reference is revised.

## Related Resources

- [Device Firmware Configuration Interface (DFCI)](01-windows-dfci.md) — DFCI mechanics,
  prerequisites and disqualifiers, OEM support, Surface eligibility, the settings surface, and the
  retire, reuse and recover sequences
- [Windows Driver and Firmware Updates](../patch-management/06-windows-driver-firmware-updates.md)
  — firmware update delivery through the Intune driver and firmware update policy; the other half
  of the updates-versus-configuration seam
- [TPM Attestation Failure Decision Tree](../../decision-trees/03-tpm-attestation.md) — L1 triage
  path for provisioning failures that trace to the TPM
- [Security Baseline Interactions with Autopilot Provisioning](../../reference/security-baseline-conflicts.md)
  — BitLocker and security baseline behavior during Autopilot provisioning
- [Secure Boot](../../_glossary.md#secure-boot) — the glossary definition of the UEFI feature this
  domain does not configure

## External References

- [Manage DFCI for Windows Autopilot devices (Microsoft Learn)](https://learn.microsoft.com/en-us/autopilot/dfci-management)
- [Device Firmware Configuration Interface (DFCI) profile settings in Microsoft Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-dfci-settings-windows)
- [Use BIOS configuration profiles for Windows devices in Microsoft Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows)
- [HP Connect for Microsoft Endpoint Manager — User Guide (HP)](https://connect.admin.hp.com/static/HPConnectUserGuide.pdf)
- [Introducing Think BIOS Config Tool V2 and Lenovo BIOS Certificate Tool V2 (Lenovo ThinkDeploy Blog)](https://blog.lenovocdrt.com/introducing-think-bios-config-tool-v2-and-lenovo-bios-certificate-tool-v2/)
