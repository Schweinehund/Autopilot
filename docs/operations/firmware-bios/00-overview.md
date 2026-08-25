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

Three manufacturers dominate the commercial Windows fleet, and all three answer the custody
question differently. Find your manufacturer, read the custody column, and the operating model
follows.

| Manufacturer | Who holds the BIOS secret | Reached through |
|---|---|---|
| Dell | Microsoft Intune, inside your tenant | The BIOS configuration and other settings Templates policy |
| HP | HP, in a cloud vault outside your tenant | HP Connect for Microsoft Endpoint Manager, a vendor connector |
| Lenovo | You, as an encrypted INI file or as a private key in your own Azure Key Vault | Think BIOS Config Tool V2 and Lenovo BIOS Certificate Tool V2 |

**Dell — Intune holds the secret.** Dell hardware is reached through the BIOS configuration and
other settings Templates policy, created and assigned in the Intune console. The BIOS password is
held by Intune inside your own tenant, with no vendor cloud service between the console and the
device. That surface reaches one manufacturer:

> Currently, only Dell is supported.

**Source:** [Use BIOS configuration profiles for Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows) (ms.date 2024-06-06, updated 2026-07-01)

**HP — HP holds the secret, outside your tenant.** HP hardware is reached through HP Connect for
Microsoft Endpoint Manager, a vendor connector administered at `admin.hp.com` rather than in the
Intune console. The BIOS password is never held by your tenant at all:

> Passwords are managed by HP Connect and stored in a cloud vault.

**Source:** [HP Connect for Microsoft Endpoint Manager — User Guide](https://connect.admin.hp.com/static/HPConnectUserGuide.pdf) (Version 1.2.0, published 2022-09-27)

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

## Related Resources

- [Device Firmware Configuration Interface (DFCI)](01-windows-dfci.md) — DFCI mechanics,
  prerequisites and disqualifiers, OEM support, Surface eligibility, the settings surface, and the
  retire, reuse and recover sequences

## External References

- [Use BIOS configuration profiles for Windows devices in Microsoft Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows)
- [HP Connect for Microsoft Endpoint Manager — User Guide (HP)](https://connect.admin.hp.com/static/HPConnectUserGuide.pdf)
- [Introducing Think BIOS Config Tool V2 and Lenovo BIOS Certificate Tool V2 (Lenovo ThinkDeploy Blog)](https://blog.lenovocdrt.com/introducing-think-bios-config-tool-v2-and-lenovo-bios-certificate-tool-v2/)
