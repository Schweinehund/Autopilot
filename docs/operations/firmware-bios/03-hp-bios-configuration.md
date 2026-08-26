---
last_verified: 2026-08-25
review_by: 2026-10-24
applies_to: APv1
audience: admin
platform: Windows
---

> **Platform applicability:** This guide is Windows-specific and covers HP BIOS configuration
> through Intune — delivery surfaces, authentication and secret custody, scope of control,
> prerequisites and hard blockers, offboarding and loss of the management plane, and recovery. For
> the domain overview and the routing question of who holds the BIOS secret on Dell, HP and Lenovo
> hardware, see [Firmware and BIOS Governance](00-overview.md).

# HP BIOS Configuration Through Intune

HP is the vendor where a vendor-hosted cloud console holds the BIOS secret — not Intune, and not
the customer's own tenant. This guide covers HP Connect for Microsoft Endpoint Manager, the vendor
connector that publishes Sure Admin certificate policies and BIOS password policies into Intune
device groups as Remediations, plus the HP Client Management Script Library and HP BIOS
Configuration Utility scripting paths that HP Connect wraps. For the routing question of who holds
the BIOS secret on Dell, HP and Lenovo hardware, see
[Firmware and BIOS Governance](00-overview.md#who-holds-the-secret).

<a id="delivery"></a>
## Delivery

HP Connect for Microsoft Endpoint Manager is **a vendor connector, not a Win32 agent** — it installs
nothing on the device it manages.

HP Connect is administered as a cloud console at `admin.hp.com`. It is also discoverable from
inside Intune: since April 2023, HP Connect has appeared under the Intune admin center's **Partner
portals** tab, the same discovery surface Dell's own Management Portal uses. The two vendors are
symmetric on UI discoverability; they differ on secret custody, which remains this guide's routing
spine.

> In April 2023, we announced HP Connect would be joining Surface in the Partner portals tab of the Intune admin center.

**Source:** [Intune expands OEM integration in partner portal](https://techcommunity.microsoft.com/blog/microsoftintuneblog/intune-expands-oem-integration-in-partner-portal/4253264) (Microsoft Intune Blog, published 2024-09-25)

Policies authored in HP Connect are published into Intune device groups as Intune Remediations
(formerly Proactive Remediations), over the Microsoft Graph API:

> Policies created by HP Connect are published to and enforced by MEM as proactive remediations.
>
> HP Connect interacts with Endpoint Manager via Microsoft Graph API.

**Source:** [HP Connect for Microsoft Endpoint Manager — User Guide](https://connect.admin.hp.com/static/HPConnectUserGuide.pdf) (HP, Version 1.2.0, published 2022-09-27)

Consent is granted once by an Entra **Global Administrator** signing in at `admin.hp.com`; after
that, an **Intune Administrator** operates HP Connect day to day.

Authentication into a managed device is certificate- and key-pair-based, through HP Sure Admin —
developed fully in Authentication below.

**No per-device agent.** HP Connect installs nothing on the device it manages — a real distinction
from Dell, whose Dell Command | Endpoint Configure for Microsoft Intune (DCECMI) **is** a per-device
Win32 agent that must be installed before its BIOS configuration policy is assigned. See
[Dell BIOS Configuration Through Intune](02-dell-bios-configuration.md).

The script packages HP Connect creates in your tenant are named
**`HPConnectForMEM-<device group name>`** and are found under Reports, Endpoint Analytics,
Proactive Remediation, where Properties shows the assigned device groups and schedule and Device
Status shows which systems received the policy. That path label is the console's own literal label
and ships as written; the surrounding prose in this guide uses current names. This is the single
most useful operational fact in the HP material — it is how a service desk answers where a BIOS
policy came from in a tenant it did not build. HP's own latency warning applies:

> Status reporting can take hours, even days to apply and show up in this list.

**Source:** [HP Connect for Microsoft Endpoint Manager — User Guide](https://connect.admin.hp.com/static/HPConnectUserGuide.pdf) (HP, Version 1.2.0, published 2022-09-27)

HP Connect is a **current** product — HP's live Client Management Solutions page still lists it and
marks no BIOS management tool retired. Its only comprehensive first-party document, however, is
Version 1.2.0 dated 2022-09-27, and this corpus's 2026-08-25 research re-confirmed that no newer
edition exists. The custody model that document describes is the durable fact; its console
procedures cannot be trusted against the live console, and this guide does not reproduce them.

<a id="authentication"></a>
## Authentication

HP Connect supports two mutually exclusive authentication models:

> Both types of authentication can not coexist on a device at the same time.

The wording above is HP's own [sic].

**(a) HP Sure Admin / EBAM — certificate-based, password-free.** Sure Admin rides on HP Secure
Platform Management. Three keys, and their hierarchy is the whole story:

> Endorsement Key: The Endorsement Key is the secure foundation for the platform. It protects the
> Signing Key and is also required to provision or de-provision the device.

**Source:** [Secure BIOS with HP Sure Admin and CMSL](https://developers.hp.com/hp-client-management/blog/secure-bios-hp-sure-admin-and-cmsl) (HP Developer Portal, updated 2024-09-10)

The **Endorsement Key** is the root of trust, required to provision **and** de-provision the device.
The **Signing Key**, endorsed by the Endorsement Key, signs every payload. The **Local Access Key**
secures F10 Setup locally.

The provisioning order is itself a safety fact, and it ships as a numbered list rather than a code
fence for that reason:

1. Provision the Secure Platform Management Endorsement Key.
2. Provision the Signing Key.
3. Reboot and accept the physical presence prompt.
4. Enable EBAM.
5. Provision the Local Access Key.

`Get-HPSecurePlatformState` returns one of three states — named here as a signpost only, no
invocation syntax.

Anti-replay is a real operational constraint:

> a payload can only be used once on a specific device. This is due to the additional anti-replay
> protection developed in Sure Admin.

**Source:** [Secure BIOS with HP Sure Admin and CMSL](https://developers.hp.com/hp-client-management/blog/secure-bios-hp-sure-admin-and-cmsl) (HP Developer Portal, updated 2024-09-10)

HP's practical consequence: delay creating a disable payload until it is ready to be used — a
payload generated too early is spent the moment it is used, and anti-replay will not let it be used
again.

The default-behavior trap:

> If only the Secure Platform Management (SPM) keys are saved but not the Local Access key, HP
> Connect will use the Signing Key (saved as the SPM secret) as the Local Access Key.

**Source:** [HP Connect for Microsoft Endpoint Manager — User Guide](https://connect.admin.hp.com/static/HPConnectUserGuide.pdf) (HP, Version 1.2.0, published 2022-09-27)

Skipping Local Access Key setup silently widens the Signing Key's exposure to field technicians —
the key meant to sign every BIOS change ends up handed to whoever scans the F10 QR code.

**Custody — this is where Success Criterion 3 is decided.** HP's own statement:

> Passwords are managed by HP Connect and stored in a cloud vault.
>
> HP Connect will read the certificates and obtain the embedded private/public keys to configure HP
> Sure Admin. These cryptographic keys are then used when creating BIOS authentication policies, and
> to authorize (sign) BIOS settings changes.

**Source:** [HP Connect for Microsoft Endpoint Manager — User Guide](https://connect.admin.hp.com/static/HPConnectUserGuide.pdf) (HP, Version 1.2.0, published 2022-09-27)

Contrast with Dell's own custody statement, quoted here in full because that juxtaposition is what
"quoted against" requires — pointing at another file would not satisfy it:

> Dell does not collect or retain any customer data from Microsoft Intune. The data remains in the Microsoft tenant but is supplemented with Dell-specific capabilities which are transacted with Microsoft infrastructure through Graph API calls.

**Source:** [How to Connect Dell Management Portal to Microsoft Intune](https://www.dell.com/support/kbdoc/en-us/000356434/how-to-connect-dell-management-portal-to-microsoft-intune) (Dell, Version 2, Last Modified 2026-05-23)

Using HP Connect means the BIOS Endorsement and Signing private keys, and the BIOS passwords, live
in HP's cloud — outside the Entra tenant, outside Intune's control, and outside the tenant's own
data-governance boundary. Dell's model is the opposite pole: Intune itself holds the secret.
Lenovo's Key Vault option keeps the key in the customer's own Azure subscription. See
[Dell BIOS Configuration Through Intune](02-dell-bios-configuration.md) and
[Lenovo BIOS Configuration Through Intune](04-lenovo-bios-configuration.md).

**(b) BIOS passwords — the legacy model, with a lockout trap.** HP Connect tracks passwords by
hint:

> HP Connect maintains password hints on each device managed by policy. The hint resides in the
> BIOS and point back to information stored in HP Connect.

The wording above is HP's own [sic].

**Source:** [HP Connect for Microsoft Endpoint Manager — User Guide](https://connect.admin.hp.com/static/HPConnectUserGuide.pdf) (HP, Version 1.2.0, published 2022-09-27)

HP's analogue of Dell's blocker is a lockout rather than a refusal, shipped complete because this
file is unenrolled and the string is over the 200-character cap:

> if a BIOS password authentication policy is published to a device group and the devices currently
> have a BIOS password not matching the password in the policy, dependent on the device BIOS policy
> for lockout , a device may get a BIOS lockout should the authentication policy is attempted by the
> MEM remediation script and fail to match or set the password a number of times.

The spacing and grammar above are HP's own, preserved exactly [sic].

**Source:** [HP Connect for Microsoft Endpoint Manager — User Guide](https://connect.admin.hp.com/static/HPConnectUserGuide.pdf) (HP, Version 1.2.0, published 2022-09-27)

<a id="scope"></a>
## Scope

HP Connect configures settings **per platform**, plus a **Global Settings** policy that applies
across platforms.

Per D-25, the Microsoft Graph write scope ships qualitatively, not as an enumerated list:

> most of the permissions are Read-Only, except for one. HP Connect requires write access to device
> configuration and policies.

**Source:** [HP Connect for Microsoft Endpoint Manager — User Guide](https://connect.admin.hp.com/static/HPConnectUserGuide.pdf) (HP, Version 1.2.0, published 2022-09-27)

The guide's own Appendix C enumerates the Graph scopes as screenshots with no text layer; grepping
the raw extraction for the expected scope-name prefixes returned zero matches. That is an
enumeration fact about the published document — the scope list is not invented here.

Some settings will not apply unless an authentication method — Sure Admin or a BIOS password — is
already in place. HP's own sentence describing this truncates mid-word at a page boundary in this
corpus's extraction, so it ships as an unquoted claim rather than a quote.

Securing the BIOS with Sure Admin permanently changes how BIOS updates are delivered, and this fact
gets its own sentence because a shared seam sentence would suppress it:

> Securing the BIOS with certificates (with Sure Admin) also means that BIOS updates will require
> specific handling, including the signing of the new BIOS firmware capsule and using Sure Admin
> commands for the update.

**Source:** [Secure BIOS with HP Sure Admin and CMSL](https://developers.hp.com/hp-client-management/blog/secure-bios-hp-sure-admin-and-cmsl) (HP Developer Portal, updated 2024-09-10)

Plainly: choosing Sure Admin changes how BIOS updates are delivered, permanently — a firmware
capsule now has to be signed and applied through Sure Admin's own commands rather than a generic
updater.

BIOS settings configured through this surface silently gate later OS features: platform
virtualization gates Virtualization-Based Security, which gates Hotpatch and Credential Guard;
Secure Boot gates attestation; and the TPM gates Autopilot attestation. For the failure path when a
firmware setting blocks TPM attestation, see
[TPM Attestation Failure Decision Tree](../../decision-trees/03-tpm-attestation.md).

For scripted configuration, this corpus recommends the **HP Client Management Script Library
(CMSL)**. **HP BIOS Configuration Utility (BCU)** remains legacy-but-supported — HP has not called
it retired or withdrawn, and this guide does not say so either.

<a id="prerequisites"></a>
## Prerequisites

HP is the third leg of the inverted-prerequisite story: **HP retries until the BIOS locks out.**
That is the opposite failure mode to Dell, which refuses outright when a BIOS password already
exists — and it is why both fleets need the same first step.

Before assigning anything, survey existing BIOS passwords across the fleet — the same survey step
that prevents a refusal on the Dell leg of this story; see
[Dell BIOS Configuration Through Intune](02-dell-bios-configuration.md).

The remaining hard requirements:

- **Hardware floor**, as a single sourced sentence and never a per-model table:

  > HP Sure Admin is a feature on most Pro/Elite/Z HP commercial systems manufactured since 2018
  > (for some systems an up-to-date BIOS will be required for the first generation - aka the G5
  > generation).

  **Source:** [Secure BIOS with HP Sure Admin and CMSL](https://developers.hp.com/hp-client-management/blog/secure-bios-hp-sure-admin-and-cmsl) (HP Developer Portal, updated 2024-09-10)

- **License floor.** The subscription must permit Remediations, at an E3/A3 or E5/A5 class level:

  > HP Connect requires an appropriate subscription level to Microsoft Azure (example, E3/A3 and
  > E5/A5, Virtual Desktop/user)
  >
  > The license must allow the use of Proactive Remediations.

  **Source:** [HP Connect for Microsoft Endpoint Manager — User Guide](https://connect.admin.hp.com/static/HPConnectUserGuide.pdf) (HP, Version 1.2.0, published 2022-09-27)

  See [Licensing Matrix](../../reference/licensing-matrix.md) for the authoritative tier detail
  rather than restating it here — restating it would create a second contradiction surface.

- **Consent.** A Global Administrator signs in at `admin.hp.com` and consents once:

  > A tenant Global Administrator can accept these permissions on behalf of the entire organization.

  **Source:** [HP Connect for Microsoft Endpoint Manager — User Guide](https://connect.admin.hp.com/static/HPConnectUserGuide.pdf) (HP, Version 1.2.0, published 2022-09-27)

  Thereafter, an Intune Administrator can operate HP Connect.

- **Tenant storage.** None is required in the customer's own Azure tenant — the flip side of the
  custody position in Authentication above; readers should see both together.

- **MDM authority.** Intune configured as the MDM authority.

- **Standalone path.** HP Client Management Script Library module 1.6 or later on the client, for
  fleets that decline the vendor-hosted vault. That path costs more work and means the fleet itself
  holds the Endorsement and Signing keys, with no third-party secret custody.

- **The F10 constraint.** The Local Access Key secures F10 Setup locally with a QR-code challenge;
  the technician scans it with the HP Sure Admin mobile app, which contacts a key service over the
  internet and returns a one-time PIN. On a Sure-Admin-provisioned HP, a technician standing in
  front of a dead machine with no phone signal cannot enter BIOS Setup. That is the design, not a
  defect, and no amount of Intune configuration removes it.

<a id="offboarding"></a>
## Offboarding and Loss of the Management Plane

**Order one — de-provisioning a single device.**

1. Disable EBAM.
2. De-provision the Local Access Key.
3. De-provision the Signing Key.
4. De-provision the Endorsement Key.

Immediately after this order, the partial-removal trap — shipped complete because this file is
unenrolled and the string is over the 200-character cap:

> in order to fully disable HP Sure Admin, the CMSL provides specific commands, but note that the Local Access Key must be removed as well or the user will continue to see a QR code when attempting to enter the BIOS locally after pressing F10 during boot.

**Source:** [Secure BIOS with HP Sure Admin and CMSL](https://developers.hp.com/hp-client-management/blog/secure-bios-hp-sure-admin-and-cmsl) (HP Developer Portal, updated 2024-09-10)

Disabling EBAM without clearing the Local Access Key leaves the machine *looking* locked, and that
generates service-desk tickets.

**Order two — retiring HP Connect itself.**

1. De-provision the fleet.
2. Deactivate the HP Connect account.

This is a different object from the per-device key order above. Deactivating HP Connect while
devices are still Sure-Admin-provisioned destroys the only copy of the keys needed to de-provision
them.

Account deactivation carries its own fuse, and orphaned Remediation scripts survive it — two
contiguous quotes from the same page:

> Deactivation starts a 30-day countdown where tenant administrators will be able to login to admin.hp.com in read only mode (view only). At the end of the 30 days, all policies and secrets created by the organization in HP Connect will be permanently deleted.
>
> the Microsoft Endpoint Manager Proactive Remediation scripts published by HP Connect to AAD will remain in place. If these Remediations are no longer required, they need to be manually removed from MEM.

**Source:** [HP Connect for Microsoft Endpoint Manager — User Guide](https://connect.admin.hp.com/static/HPConnectUserGuide.pdf) (HP, Version 1.2.0, published 2022-09-27)

Reactivation inside the 30-day window requires a Global Administrator. The orphaned Remediation
scripts keep running in Intune after HP Connect is gone and must be removed by hand.

In both HP and Dell, losing the management plane loses the secret — but HP documents an order and
Dell documents none. Re-confirmed 2026-08-25: Dell KB 000356434 states no disconnection or
de-provisioning order at all. This guide does not invent a Dell order to satisfy a literal reading
of that symmetry — doing so would be exactly the unsourced drift this corpus's own governance bars.
See [Dell BIOS Configuration Through Intune](02-dell-bios-configuration.md).

<a id="recovery"></a>
## Recovery

What is documented — the ordered de-provisioning path above — is this section's starting point; it
is referenced here, not repeated.

**The Endorsement-Key-loss gap.** HP's own definition, already quoted in Authentication above,
makes the Endorsement Key required to provision **or de-provision** the device — the fragment
shipped there is 48 characters, drawn from the fuller 169-character definition; it is referenced
here rather than re-quoted, keeping its evidence line scoped to one page.

HP documents de-provisioning as requiring the Endorsement Key file, named here as a signpost only,
with no cmdlet syntax: `kek.pfx`.

This corpus found no documented escape hatch. As of 2026-08-25, checked against HP's
developer-portal pages *Secure BIOS with HP Sure Admin and CMSL*, *HP Secure Platform Management and
HP Client Management Script Library*, and *HP Sure Admin step-by-step*, HP documents no recovery
path for a lost Endorsement Key. Treat the Endorsement Key as irreplaceable and back it up
accordingly.

If the Endorsement Key is genuinely lost, escalate to HP support and stop. Nothing in this corpus's
research sources what HP support does or does not require beyond that point, so Dell's own
model-plus-proof-of-ownership requirement is not carried across to HP.

<a id="unsupported-callouts"></a>
## Unsupported and Anti-Feature Callouts

These are documented absences in the surface itself, not misconfigurations an administrator can
correct.

**DFCI is unavailable on HP hardware, not declined.** HP appears on none of the DFCI manufacturer
lists this corpus tracks. See
[Device Firmware Configuration Interface (DFCI)](01-windows-dfci.md) for that surface and its own
OEM list.

**No per-setting compliance attestation path exists on an HP fleet today.**

**The two authentication models cannot coexist on one device.** Sure Admin certificates and BIOS
passwords are mutually exclusive per device; see Authentication above.

**The 2022 HP Connect User Guide's procedures cannot be trusted against the live console**, and this
corpus does not reproduce them.

## Related Resources

- [Firmware and BIOS Governance](00-overview.md) — the domain overview: who holds the BIOS secret on
  Dell, HP and Lenovo hardware
- [Dell BIOS Configuration Through Intune](02-dell-bios-configuration.md) — the opposite custody
  pole, the per-device Win32 agent this guide's connector is written against, and the
  survey-existing-passwords step shared by both prerequisite legs
- [Lenovo BIOS Configuration Through Intune](04-lenovo-bios-configuration.md) — the third custody
  model, where the customer's own Azure Key Vault can hold the signing key
- [Device Firmware Configuration Interface (DFCI)](01-windows-dfci.md) — the other native Intune
  BIOS surface, unavailable on HP hardware
- [Firmware OEM Capability Matrix](../../reference/firmware-oem-matrix.md) — the three-vendor
  transposition of this guide's six sections
- [Licensing Matrix](../../reference/licensing-matrix.md) — the license floor for HP Connect
  Remediations
- [Windows Driver and Firmware Updates](../patch-management/06-windows-driver-firmware-updates.md#unsupported-callouts)
  — HP Image Assistant is a parallel, non-Intune update channel, and running it alongside Intune
  driver policies is a real conflict this corpus already adjudicates at that link

## External References

- [HP Connect for Microsoft Endpoint Manager — User Guide (HP)](https://connect.admin.hp.com/static/HPConnectUserGuide.pdf)
- [Secure BIOS with HP Sure Admin and CMSL (HP)](https://developers.hp.com/hp-client-management/blog/secure-bios-hp-sure-admin-and-cmsl)
- [HP Secure Platform Management and HP Client Management Script Library (HP)](https://developers.hp.com/hp-client-management/blog/hp-secure-platform-management-hp-client-management-script-library)
- [HP Sure Admin step-by-step (HP)](https://developers.hp.com/hp-client-management/blog/hp-sure-admin-step-step)
- [Intune expands OEM integration in partner portal (Microsoft Intune Blog)](https://techcommunity.microsoft.com/blog/microsoftintuneblog/intune-expands-oem-integration-in-partner-portal/4253264)
- [How to Connect Dell Management Portal to Microsoft Intune (Dell)](https://www.dell.com/support/kbdoc/en-us/000356434/how-to-connect-dell-management-portal-to-microsoft-intune)
