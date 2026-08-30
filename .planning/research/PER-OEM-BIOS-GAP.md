# Per-OEM BIOS / Firmware Configuration Through Intune — Dell, HP, Lenovo

**Scope:** Targeted gap-fill for v1.21 Pillar A, owner-ruled at full per-OEM depth.
**Researched:** 2026-08-19
**Supersedes:** nothing. **Extends:** `STACK.md` §A-8, which flagged this area as a non-attempt.

---

## How to read this file

### Claim labels

| Label | Meaning |
|-------|---------|
| **SOURCED** | I fetched the page. URL + the page's own published/updated date + my fetch date are in the Sources table. |
| **MEASURED** | I ran a command. The command is shown inline. |
| **PREMISE** | Inference. Not fetched, not measured. A hypothesis for the roadmap, never a documentable fact. |
| **UNVERIFIED** | I tried and could not confirm. Do **not** ship as fact. |

### Quotation provenance — read this before reusing any quote

This milestone has already shipped two fabricated citations. To make that failure mode structurally impossible here, every quoted string below carries its extraction path:

| Marker | Meaning | Trust for shipping |
|--------|---------|--------------------|
| **`[DIRECT]`** | I retrieved the bytes myself (`curl` with a browser UA, or my own PDF text-layer extraction) and read the string in the raw output. Whitespace and line breaks are reflowed; **no words added, removed or reordered**. | Safe to quote. |
| **`[RELAYED]`** | The string came back inside a `WebFetch` response, i.e. through a summarising model. I did **not** see the raw page bytes. | **Re-verify before quoting in a shipped document.** Safe to use as an unquoted claim. |

> **PDF reflow note.** The HP Connect User Guide is a PDF whose text layer breaks mid-word and mid-sentence (e.g. `proactive \n remediations`). My extractor rejoins those fragments. `[DIRECT]` quotes from that PDF are therefore *character-accurate but whitespace-normalised*. Where the source itself is ungrammatical I mark it `[sic]` rather than silently repairing it — repairing it would be exactly the fabrication this gate exists to prevent.

**Extraction method, MEASURED.** `developers.hp.com` returns HTTP 403 to `WebFetch`. It returns HTTP 200 to `curl` with a browser `User-Agent`:

```
curl -sS -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ..." \
  -o /dev/null -w "HTTP %{http_code} size=%{size_download}\n" \
  https://developers.hp.com/hp-client-management/blog/secure-bios-hp-sure-admin-and-cmsl
→ HTTP 200  size=70534
```

This is the single most important methodological finding in this pass. **HP's developer portal is not blocked — it is user-agent gated.** `STACK.md` §A-8 recorded HP auth mechanics as `UNVERIFIED` because of that 403. They are now sourced. Any future researcher hitting a 403 on an HP property should retry with a browser UA before declaring unavailability.

---

## Corpus baseline

MEASURED (`grep -ril "<term>" docs --include=*.md --exclude-dir=graphify-out | wc -l`, run 2026-08-19, corpus = 282 markdown files):

| Term | Files |
|------|-------|
| `HP Connect`, `Sure Admin`, `CMSL`, `BIOS Configuration Utility` | **0** each |
| `Dell Command`, `DCECMI`, `cctk`, `Dell Management Portal` | **0** each |
| `Think BIOS`, `Commercial Vantage` | **0** each |
| `hardwarePassword`, `Partner portals`, `DFCI` | **0** each |
| `Lenovo` | 5 (incidental) |

**This is greenfield.** There is no existing per-OEM BIOS content to correct, retrofit or reconcile — unlike Pillar E, which is a correction pillar. Pillar A is pure new authoring, which is the cheaper shape.

---

## The headline finding: this is a three-way *architecture* split, not a three-way tool split

The scoping assumed the per-OEM story was "same shape, three vendors" — package a vendor CLI as a Win32 app and drive it with a script. That is wrong, and it is the single thing the guides must get right.

**All three vendors now offer a cloud connector, and two of them are reachable from inside the Intune admin center.** The real discriminator is not *which CLI* but *who holds the secret and where the policy object lives*.

| | Dell | HP | Lenovo |
|---|---|---|---|
| **Native Intune policy template exists?** | **Yes** — `BIOS configuration and other settings` | No | No |
| **Vendor cloud connector** | Dell Management Portal (`manage.dell.com`) | **HP Connect** (`admin.hp.com`) | None |
| **Connector linked from Intune UI** | **Yes** — `Devices > Manage devices > Partner portals` | **Not found** in Intune UI — separate portal | n/a |
| **Who holds the BIOS secret** | **Intune** (Graph `hardwarePasswordDetails`) | **HP's cloud vault** | **You do** (encrypted INI, or Azure Key Vault) |
| **Secret leaves your tenant?** | No | **Yes** | No |

That middle row is the finding that most changes the guide. Dell's connector is a first-class Intune partner surface; HP's is a genuinely external console that *writes into* your tenant. Lenovo has no connector at all and instead ships tooling that *generates* Intune objects for you to own.

---

## 4. The routing decision sequence (answered first — it is the guide's spine)

State it as a sequence, not a matrix. Each step is a hard discriminator, not a preference.

**Step 1 — Is the device DFCI-capable?**
DFCI requires (a) the OEM to be on Microsoft's DFCI list, **and** (b) the device to have been registered for Autopilot **by the OEM or a CSP partner**, not by CSV import. `SOURCED` (established in `STACK.md` §A-1/§A-3; not re-derived here).
**Dell, HP and Lenovo are not on the nine-OEM DFCI list.** For those three fleets Step 1 always fails, and that failure is the entire reason Pillar A needs per-OEM guides at all. Do not present DFCI as an option an admin "chooses not to use" on a Latitude — present it as unavailable.

**Step 2 — Is it Dell, and do you only need BIOS *settings*?**
→ Use the native Intune **BIOS configuration and other settings** template + DCECMI agent. This is the only path where the policy object is a first-class Intune configuration profile and Intune owns the password. Prefer it over everything below. `SOURCED`

**Step 3 — Do you need per-setting reporting?**
Only DFCI reports per setting. The Dell native template reports **only whether the configuration file applied**. `SOURCED` (`STACK.md` §A-6). Per-OEM script/connector paths report whatever the delivery vehicle reports — a remediation exit code or a Win32 install result — which is coarser still. If an auditor needs per-setting attestation on a Dell/HP/Lenovo fleet, **no path satisfies that today**; say so rather than implying one does.

**Step 4 — Is it HP, and is a vendor-hosted secret vault acceptable to your security team?**
→ Yes: **HP Connect**. It is HP's own recommended Intune path and it automates Sure Admin key provisioning end to end.
→ No: **HP CMSL** packaged as a Win32 app / platform script, with you holding the Endorsement and Signing keys. More work, no third-party secret custody.
This is a governance decision, not a technical one, and it must be made **before** provisioning — see the HP recovery section for why reversing it is expensive.

**Step 5 — Is it Lenovo?**
→ ThinkPad/ThinkStation: **Think BIOS Config Tool V2**, which generates the Intune objects for you.
→ **ThinkCentre: TBCT V2 does not support it.** `SOURCED` — see the Lenovo section. This is a hard fork in a mixed desktop fleet and the guide must not paper over it.
→ Password-less: layer **Lenovo BIOS Certificate Tool V2** with Azure Key Vault signing.

**Step 6 — Firmware/BIOS *updates* (not settings) are a different question entirely.**
Driver-and-firmware updates through Windows Update / Autopatch driver update policies are OEM-agnostic and are Pillar B, not Pillar A. Vendor update clients (Dell Command | Update, Lenovo System Update, HP Image Assistant) are a *parallel* path, and running both is a real conflict risk. See the "Updates vs configuration" section below — the guides must keep these two axes separate or readers will conflate them.

---

## 1. Dell

### Delivery

Three distinct Intune-deliverable surfaces. They are not alternatives to each other; they do different jobs.

| Surface | Intune object | Job |
|---------|---------------|-----|
| **Dell Command \| Configure (DCC)** | *None* — authoring tool, runs on the admin's workstation | Authors the BIOS settings package consumed by DCECMI |
| **Dell Command \| Endpoint Configure for Microsoft Intune (DCECMI)** | **Win32 app** (required assignment) + the native **BIOS configuration and other settings** template policy | On-device agent that applies the package |
| **Dell Management Portal** | **Partner portal** link inside Intune; publishes apps into your tenant | Publishes Dell apps (e.g. Dell Command \| Update) to Intune |

**The native template is the supported 2026 path for settings.** `SOURCED` — established in `STACK.md` §A-6 and not re-derived. The agent must be installed **before** the policy is assigned.

**DCECMI is current and actively maintained.** Latest version **v2.0.4, released May 2026**; the KB article's own last-updated date is **18 May 2026**. Version 2.0.0.10 added ARM64 compatibility. `SOURCED [RELAYED]`

**Dell Management Portal is a genuine Intune-integrated surface, not just a vendor console.** Dell documents the entry point as inside the Intune admin center: `Devices` → expand `Manage devices` → `Partner portals` → `Dell Management Portal` → `Connect now`. `SOURCED [RELAYED]`, KB 000356434, updated **23 May 2026**.

> Dell's data-custody statement, `[RELAYED]`: *"Dell does not collect or retain any customer data from Microsoft Intune. The data remains in the Microsoft tenant but is supplemented with Dell-specific capabilities."*

That sentence is worth quoting in the guide **specifically because it is the opposite of HP Connect's model**, and the contrast is the clearest way to teach the difference.

**Dell Command | Configure remains current**: **v5.2.2, released March 2026**; KB last updated **06 May 2026**. Supports Windows 11, Windows 10, Windows PE, RHEL 8/9, Ubuntu Desktop 20.04/22.04/24.04. `SOURCED [RELAYED]`

### Authentication

**Intune holds the secret. This is Dell's structural advantage and should be stated plainly.**

- Intune generates a **unique per-device BIOS password**; retrieval is via Microsoft Graph `hardwarePasswordDetails`. `SOURCED` (`STACK.md` §A-6).
- Dell's own user guide documents the manual retrieval path: endpoint `https://graph.microsoft.com/beta/deviceManagement/hardwarePasswordDetails`, queried in Graph Explorer, requiring three permissions — `DeviceManagementConfiguration.Read.All`, `DeviceManagementConfiguration.ReadWrite.All`, `DeviceManagementManagedDevices.PrivilegedOperations.All`. `SOURCED [RELAYED]`
- The response returns **the current password and the previous 15 passwords**. `SOURCED [RELAYED]` — a genuinely useful service-desk detail, because it means a password rotation that half-applied is recoverable.

**Two RBAC paths to read a password**, with materially different blast radius — a custom Intune role carrying `Managed devices > Read Bios Password = Yes` (per device; creating the role itself needs `Intune Role Administrator`), or the Entra `Intune Administrator` role (all devices, no custom role). `SOURCED` (`STACK.md` §A-6). The second is cheaper and much wider; the guide should say so rather than listing them neutrally.

> **⚠ Graph API naming trap — flag for re-verification.** There appear to be **two similarly-named resources**: `hardwarePasswordDetails` (current, Dell-documented, per above) and `hardwarePasswordInfo` (reportedly deprecated from Intune 2406, with `List hardwarePasswordInfos` requiring Global Administrator from 2404). `hardwarePasswordDetail` is reportedly available from Intune **2405**. `UNVERIFIED` — these version numbers reached me only through a search summary; the Graph beta reference URL I tried returned **HTTP 404**. **Do not publish the version numbers without re-verifying.** Do publish the warning that the two resource names are distinct and easily confused, which is itself the useful content.

**Blast-radius note on the Dell Management Portal connector.** The consent grant is broad and includes BitLocker key read. Reported permission set `[RELAYED]`: read all users' full profiles; read directory data; **read your BitLocker keys**; read Intune devices; **read and write Intune apps**; **read and write Intune device configuration and policies**; perform user-impacting remote actions on Intune devices; maintain access to data granted. Requires a **Global Administrator** to consent. `SOURCED [RELAYED]` — worth a callout, since "connect a partner portal to publish an app" reads much lower-risk than the grant actually is.

### Scope of control

- BIOS settings are authored in **Dell Command | Configure**, then applied by DCECMI. `SOURCED [RELAYED]`
- File format **`.cctk`**, **2 MB** limit, uploaded to the Intune policy. `SOURCED` (`STACK.md` §A-6).
  - Note: the DCECMI KB article itself does **not** mention `.cctk`; the format constraint is documented on the Microsoft side. `SOURCED` (absence noted honestly).
- **Not manageable this way:** anything requiring per-setting compliance reporting (the policy reports only file-applied/not-applied), and anything on a device that already has a BIOS password.

**Do not enumerate Dell BIOS tokens in the corpus.** That is the vendor's manual and violates the link-not-copy constraint. `PREMISE` (scope judgement, consistent with `STACK.md` §A-8's guardrail).

### Prerequisites and hard blockers

| Requirement | Detail | Label |
|---|---|---|
| **No pre-existing BIOS password** | Hard blocker. Intune must own the password or it cannot update the configuration. | `SOURCED` (milestone brief / §A-6) |
| Enrollment | Organization-owned, MDM-enrolled only. No personal, no non-enrolled. | `SOURCED` |
| OS / hardware | Dell commercial client, Windows 10 or later | `SOURCED [RELAYED]` |
| **.NET 8.0 Desktop Runtime (x64)** | Must be installed; can itself be deployed as an Intune app | `SOURCED [RELAYED]` |
| **Filesystem ACL** | **SYSTEM account must have Modify permission on `C:\ProgramData\Dell`** | `SOURCED [RELAYED]` |
| Ordering | Agent Win32 app must land **before** the policy is assigned | `SOURCED` |
| Autopilot | Select the OEM Win32 app in ESP settings | `SOURCED` (§A-6) |

The `C:\ProgramData\Dell` ACL requirement is the kind of thing that produces a silent, confusing failure and belongs in the troubleshooting section, not buried in prerequisites.

### Recovery — the most important Dell content

Ordered from best to worst outcome:

1. **Password known to Intune** → Graph `hardwarePasswordDetails`, current + previous 15. `SOURCED [RELAYED]`
2. **Device removed from Intune management** → passwords remain readable via Graph. `SOURCED` (brief).
3. **Intune subscription ends** → **no way to read or retrieve BIOS passwords; only option is to contact the OEM.** `SOURCED` (§A-6). ⇒ **Back the passwords up outside Intune.** This is the recommendation the guide must make explicitly.
4. **Removing the password** → set `Disable per-device BIOS password protection` to **Yes**, assign, let the device check in, reboot. **Unenrolling the device does *not* remove the BIOS password.** `SOURCED` (§A-6).
5. **Password genuinely lost** → Dell Support, with **ownership verification**; customer supplies computer model, Service Tag and proof of ownership. `SOURCED [RELAYED]`, KB 000140298, updated **01 May 2026**.
6. **Master Password Lockout enabled and password forgotten** → **unrecoverable.**

> Dell KB 000180749 (updated **25 Nov 2024**), `[RELAYED]`:
> *"If the Master Password Lockout option is selected and the customer subsequently forgets the password, Dell will not be able to assist in the recovery of passwords. The platform will be unrecoverable, and the motherboard or hard drive will need to be replaced."*
>
> and: *"Once enabled, the Admin, System, and HDD passwords are protected from being reset using recovery password."*

That is the Dell equivalent of DFCI's "lock the device beyond repair" warning, and it deserves the same prominence. **Re-verify both strings before shipping** — they are `[RELAYED]`.

Dell also acknowledges unauthorised third-party BIOS password generators exist and require physical presence. `SOURCED [RELAYED]`. The guide should mention this **only** to tell a service desk that such tools are not a sanctioned path — not as a procedure.

---

## 2. HP — including HP Connect, the brief's highest-priority unknown

### What HP Connect actually is

**A vendor-hosted cloud console that writes Intune Remediations into your tenant over Graph, and stores your BIOS secrets in HP's cloud.** It is not an Intune blade, and it is not merely a separate console either — it is both external *and* deeply integrated, which is the nuance the guide has to land.

Primary source: **HP Connect for Microsoft Endpoint Manager — User Guide, Version 1.2.0, dated September 27, 2022**, retrieved from `connect.admin.hp.com`. I extracted the PDF text layer myself; quotes below are `[DIRECT]` with whitespace reflowed.

> **⚠ Source-currency caveat, and it is significant.** The only comprehensive first-party HP Connect document I could obtain is **~4 years old** and still uses the retired "Microsoft Endpoint Manager" branding and the retired "Proactive Remediations" feature name (now **Remediations**), and refers to "Azure Active Directory" (now **Microsoft Entra ID**). HP's current product page brands it simply **HP Connect**. The product is **not** deprecated — see below — but **its documentation has not kept pace**, and any procedure copied from it must be re-checked against the live console. This is a genuine, documentable boundary and the guide should state it rather than presenting 2022 screenshots as current.

**Currency check, `SOURCED`:** HP's live Client Management Solutions page (fetched 2026-08-19) still lists HP Connect as a current offering — *"Remotely configure, secure, and update the BIOS of HP PCs managed with HP Connect"* `[RELAYED]` — alongside MIK, HPIA, CMSL, BCU and the Linux utilities, with **no tool marked deprecated, retired or superseded**. Separately, HP's own Sure Admin walkthrough (footer **© 2026**) names HP Connect as the Intune option, `[DIRECT]`:

> *"Microsoft Endpoint Manager/Intune: For cloud customers HP offers HP Connect for deploying and managing Sure Admin along with all BIOS Configuration. This is a simple and fast solution to manage your BIOS and protect it."*

So: **CURRENT product, STALE documentation.** Both halves must be stated.

### Delivery

**Policies become Intune Remediations.** `[DIRECT]`:

> *"Policies created by HP Connect are published to and enforced by MEM as proactive remediations."*
> *"HP Connect interacts with Endpoint Manager via Microsoft Graph API."*

Concrete, verifiable artefacts in your tenant, `[DIRECT]`: the script packages are named **`HPConnectForMEM-<device group name>`** and are found at **`Reports` / `Endpoint Analytics` / `Proactive Remediation`**, where `Properties` shows the assigned device groups and schedule, and `Device Status` shows which systems received the policy. HP warns `[DIRECT]`: *"Status reporting can take hours, even days to apply and show up in this list."*

That naming convention is the single most useful operational fact in this whole section — it is how a service desk answers "where did this BIOS policy come from?" in a tenant they did not build. **Put it in the guide.**

### Authentication — two mutually exclusive models

`[DIRECT]`: *"Both types of authentication can not coexist on a device at the same time."* [sic]

**(a) HP Sure Admin / EBAM — certificate-based, password-free.**

Sure Admin rides on **HP Secure Platform Management (SPM)**. Three keys, and the hierarchy is the whole story. From HP's developer portal, `[DIRECT]`:

> *"Endorsement Key: The Endorsement Key is the secure foundation for the platform. It protects the Signing Key and is also required to provision or de-provision the device."*

- **Endorsement Key (EK)** — root of trust; required to provision **and** de-provision.
- **Signing Key (SK)** — endorsed by the EK; signs every payload.
- **Local Access Key (LAK)** — secures F10 Setup locally.

Provisioning order is fixed: SPM (EK, then SK) → reboot with PPI accepted → enable EBAM → provision LAK. `Get-HPSecurePlatformState` returns `NotConfigured` / `ProvisioningInProgress` / `Provisioned`. `SOURCED [DIRECT]`

**Anti-replay is a real operational constraint**, `[DIRECT]`: *"a payload can only be used once on a specific device. This is due to the additional anti-replay protection developed in Sure Admin."* Payloads carry a nonce compared against a monotonically increasing BIOS counter. HP's practical advice, `[DIRECT]`: *"it might be useful to delay the creation of the Disable payload until ready to be used."*

**Local F10 access requires a phone and the Internet.** The LAK secures F10 with a QR-code challenge; the technician scans it with the **HP Sure Admin** mobile app, which contacts a key service over the Internet and returns a **one-time PIN**. `SOURCED [DIRECT]`. Under HP Connect the app talks to HP Connect itself; standalone, HP offers an **Azure-hosted KMS** — `[DIRECT]`: *"HP Softpaq sp143492 contains the software modules required to set up an Azure KMS service provider."* HP Connect adds, `[DIRECT]`: *"AAD administrators are automatically enabled for local access via the Sure Admin app."*

> **This is a hard boundary the guide must state plainly:** on a Sure-Admin-provisioned HP, **a technician standing in front of a dead machine in a datacentre with no phone signal cannot enter BIOS Setup.** That is not a defect, it is the design — but it is a service-desk-visible constraint that no amount of Intune configuration removes.

**Where the secrets live — the flag the brief asked for.** `[DIRECT]`:

> *"Passwords are managed by HP Connect and stored in a cloud vault."*

Sure Admin certificates are uploaded to the same vault as **`.pfx` files containing private keys**, `[DIRECT]`: *"HP Connect will read the certificates and obtain the embedded private/public keys to configure HP Sure Admin. These cryptographic keys are then used when creating BIOS authentication policies, and to authorize (sign) BIOS settings changes."*

⇒ **Using HP Connect means your BIOS Endorsement and Signing private keys, and your BIOS passwords, live in HP's cloud — outside your Entra tenant, outside Intune's control, and outside your Purview/DLP boundary.** This is the most important governance fact in Pillar A and it is exactly the "secret stored somewhere Intune does not control" case the brief asked to flag. Dell's model is the opposite; Lenovo's Key Vault option keeps the key in *your* Azure subscription.

A useful default-behaviour trap, `[DIRECT]`: *"If only the Secure Platform Management (SPM) keys are saved but not the Local Access key, HP Connect will use the Signing Key (saved as the SPM secret) as the Local Access Key."* — i.e. skipping LAK setup silently widens the Signing Key's exposure to field technicians.

**(b) BIOS passwords — the legacy model, with a lockout trap.**

HP Connect tracks passwords by hint, `[DIRECT]`: *"HP Connect maintains password hints on each device managed by policy. The hint resides in the BIOS and point back to information stored in HP Connect."* [sic] On a password change it determines which prior password applies, uses it, and sets a new hint.

> **The HP analogue of Dell's "no pre-existing password" blocker**, `[DIRECT]` and `[sic]` throughout:
> *"if a BIOS password authentication policy is published to a device group and the devices currently have a BIOS password not matching the password in the policy, dependent on the device BIOS policy for lockout , a device may get a BIOS lockout should the authentication policy is attempted by the MEM remediation script and fail to match or set the password a number of times."*

Same underlying hazard as Dell's, different failure mode: Dell refuses, HP retries until the BIOS locks out. **Both guides need a "survey existing BIOS passwords before you assign anything" step.**

### Scope of control

- Settings are supported **per platform**, with a **Global Settings policy** that applies across platforms. `SOURCED [DIRECT]`
- HP Connect warns that some settings will not apply without an auth policy in place, `[DIRECT]`: *"certain settings may require that an authentication method (HP Sure Admin or password) be applied, or the setting may not b"* — the extracted string truncates mid-word at a page boundary; **do not quote this one**, state it as a claim.
- **Once Sure Admin is on, BIOS updates change shape**, `[DIRECT]`: *"Securing the BIOS with certificates (with Sure Admin) also means that BIOS updates will require specific handling, including the signing of the new BIOS firmware capsule and using Sure Admin commands for the update."* This couples Pillar A to Pillar B for HP specifically and is easy to miss.

### Prerequisites and hard blockers

| Requirement | Detail | Label |
|---|---|---|
| **Hardware floor** | *"HP Sure Admin is a feature on most Pro/Elite/Z HP commercial systems manufactured since 2018 (for some systems an up-to-date BIOS will be required for the first generation - aka the G5 generation)."* | `SOURCED [DIRECT]` |
| **Licence** | Subscription allowing **Remediations** — *"HP Connect requires an appropriate subscription level to Microsoft Azure (example, E3/A3 and E5/A5, Virtual Desktop/user)"*, and *"The license must allow the use of Proactive Remediations."* | `SOURCED [DIRECT]` |
| **Consent** | Global Administrator must sign in at `admin.hp.com` and consent; *"A tenant Global Administrator can accept these permissions on behalf of the entire organization."* Thereafter an **Intune Administrator** can operate it. | `SOURCED [DIRECT]` |
| **Write scope** | *"most of the permissions are Read-Only, except for one. HP Connect requires write access to device configuration and policies."* | `SOURCED [DIRECT]` |
| **Tenant storage** | None required in the customer's Azure tenant | `SOURCED [DIRECT]` |
| MDM | MEM/Intune configured as the MDM authority | `SOURCED [DIRECT]` |
| CMSL (standalone path) | Module **1.6 or later** on the client | `SOURCED [DIRECT]` |

**The exact Graph permission scopes are `UNVERIFIED`.** The guide's Appendix C enumerates them, but those pages are **screenshots** — no text layer. MEASURED: grepping the raw extraction for `DeviceManagement*`, `Directory.Read*`, `Group.Read*` returned **zero matches**. Report the qualitative shape (mostly read-only, one write scope covering device configuration and policies) and **do not invent the scope list**.

### Recovery — HP

1. **Disable Sure Admin, correct order** (all four steps, in order): disable EBAM → deprovision LAK → deprovision Signing Key → deprovision Endorsement Key. `SOURCED [DIRECT]`
2. **The partial-removal trap**, `[DIRECT]`: *"in order to fully disable HP Sure Admin, the CMSL provides specific commands, but note that the Local Access Key must be removed as well or the user will continue to see a QR code when attempting to enter the BIOS locally after pressing F10 during boot."* ⇒ Disabling EBAM without clearing the LAK leaves the machine *looking* locked. This will generate service-desk tickets.
3. **Endorsement Key lost ⇒ the device cannot be de-provisioned.** HP's own definition makes the EK *"required to provision or de-provision the device"*, and de-provisioning is `New-HPSecurePlatformDeprovisioningPayload -EndorsementKeyFile kek.pfx`. `SOURCED [DIRECT]` for both facts; the **conclusion** that no alternative recovery exists is `PREMISE` — HP does not state an escape hatch on the pages I read, and I found no documented one. **Flag for a plan-time verification task:** does HP offer an EK-loss recovery path (support-assisted reset, board replacement) as Dell does for Master Password Lockout? Until answered, write it as "no documented recovery — treat the Endorsement Key as irreplaceable."
4. **HP Connect account deactivation is a 30-day fuse on your secrets**, `[DIRECT]`:
   > *"Deactivation starts a 30-day countdown where tenant administrators will be able to login to admin.hp.com in read only mode (view only). At the end of the 30 days, all policies and secrets created by the organization in HP Connect will be permanently deleted."*
   and:
   > *"the Microsoft Endpoint Manager Proactive Remediation scripts published by HP Connect to AAD will remain in place. If these Remediations are no longer required, they need to be manually removed from MEM."*

   ⇒ **Two separate traps.** (a) Deactivating HP Connect while devices are still Sure-Admin-provisioned destroys the only copy of the keys needed to de-provision them — the HP equivalent of DFCI's wrong-order retire. **Correct order: de-provision the fleet first, then deactivate the account.** (b) Orphaned Remediations keep running in Intune after HP Connect is gone and must be deleted by hand. Reactivation is possible within 30 days but **requires a Global Administrator**. `SOURCED [DIRECT]`
5. This mirrors Dell's subscription-end trap exactly, and the guides should cross-reference each other on it: **in both vendors, losing the management plane loses the secret.**

---

## 3. Lenovo

Lenovo's model is the outlier: **no vendor cloud connector, and no vendor-held secrets.** The tooling is a generator — it builds Intune artefacts that you then own. For a link-not-copy corpus this is the easiest of the three to document well.

### Delivery

**Think BIOS Config Tool V2 (TBCT V2)** — a PowerShell/WPF GUI (`ThinkBIOSConfigUI.ps1`) over the **`Lenovo.BIOS.Config`** module, reading and writing BIOS settings via WMI. Current as of **2026-04-06**: GUI **v2.0.3**, module **v1.0.3**, installed with `Install-Module 'Lenovo.BIOS.Config'`. `SOURCED [RELAYED]`

It produces Intune artefacts directly — **Win32 `.intunewin` packages**, **Remediations scripts**, and **direct upload to Intune via Microsoft Graph API**. `SOURCED [RELAYED]`. Requires `IntuneWinAppUtil.exe`, the Microsoft Graph modules, and tenant permissions.

**For supervisor-password changes specifically, Lenovo documents the Win32 app path, not Remediations** — the install script exits **3010** to signal Intune to soft-reboot, because the password change requires a reboot. `SOURCED [RELAYED]`, CDRT blog published **2026-04-16**.

**Lenovo BIOS Certificate Tool V2 (LBCT V2)** — the password-less companion; generates cryptographically signed WMI commands. `SOURCED`

**Commercial Vantage** — two documented Intune routes: **ADMX ingestion** into an *Imported Administrative templates* profile, or the **Commercial Vantage Policy Manager**, a PowerShell GUI that deploys the same policies as a **single Custom OMA-URI profile** via Graph, with no template ingestion. Installation is driven by `VantageInstaller.exe` from version `20.2506.39.0`. `SOURCED [RELAYED]` — this came via search summary only; **re-verify against `docs.lenovocdrt.com/guides/cv/management/intune/` before shipping.**

### Authentication

Two models, and the choice is model-generation-gated.

**(a) Supervisor password.** Supplied through an **encrypted INI** file generated by TBCT V2 with a passphrase; the deployment script uses a matching secret key to decrypt. `SOURCED [RELAYED]`. The secret therefore lives in your Intune package and your key material — **never in a vendor cloud**.

> **Breaking change worth a callout**, `[RELAYED]`: *"Previously created INI files from the HTA version which contain an encrypted password are not compatible with the new Think BIOS Config Tool V2 due to changes in encryption methods."* Anyone migrating from the old HTA tool must regenerate every INI.

**(b) Certificate-based BIOS authentication.** Replaces the plain-text supervisor password with a digital signing certificate, removing the need to ship passwords in scripts. Two enrollable certificates: **Supervisor Certificate** and **System Management Certificate**, both resettable from the BIOS menu, with Subject/Issuer viewable there. `SOURCED [RELAYED]`

**Azure Key Vault is the differentiator.** LBCT V2 can *"Sign commands using keys stored in Azure Key Vault"*, which *"Eliminates need to distribute private keys"*. `SOURCED [RELAYED]`, CDRT blog **2025-11-04**.

⇒ **Lenovo is the only one of the three where the signing key can live in infrastructure you own, under your own RBAC, logging and rotation.** For a security-conscious reader that is a decisive advantage and the guide should say so.

### Scope of control and the ThinkCentre fork

> **⚠ The two tools disagree on ThinkCentre, and both statements are first-party and correct.**
>
> - **TBCT V2**, `[RELAYED]`: *"This solution currently does not support ThinkCentre desktop products due to incompatible WMI BIOS Interface implementation."*
> - **LBCT V2**, `[RELAYED]`: supports *"Lenovo ThinkPad (2022+), ThinkCentre (2020+), or ThinkStation (2020+) with certificate support"*.
>
> These are **not** contradictory: the BIOS *certificate* capability exists on ThinkCentre 2020+, but the *settings-configuration tool* cannot drive ThinkCentre's WMI interface. `PREMISE` for that reconciliation — it is the only reading consistent with both sources, but neither page states it explicitly.

**This corrects `STACK.md` §A-8**, which recorded "certificate signing supported on ThinkPad 2022+, ThinkCentre 2020+, ThinkStation 2020+" against the **Think BIOS Config Tool** row. The model list belongs to **LBCT**, not TBCT, and TBCT's own ThinkCentre exclusion was missing. A mixed ThinkPad + ThinkCentre fleet **cannot** use one tool for BIOS settings.

### Prerequisites and hard blockers

| Requirement | Detail | Label |
|---|---|---|
| **Cannot set an initial supervisor password** | See below — the biggest Lenovo blocker | `SOURCED [RELAYED]` |
| ThinkCentre | Not supported by TBCT V2 | `SOURCED [RELAYED]` |
| Module | `Lenovo.BIOS.Config` (v1.0.3 as of Apr 2026) | `SOURCED [RELAYED]` |
| Runtime | Windows PowerShell or PowerShell Core, administrative | `SOURCED [RELAYED]` |
| Intune features | `IntuneWinAppUtil.exe`, Graph modules, tenant permissions | `SOURCED [RELAYED]` |
| Reboot | Supervisor password change requires reboot; script returns `3010` | `SOURCED [RELAYED]` |
| Cert auth floor | ThinkPad 2022+ / ThinkCentre 2020+ / ThinkStation 2020+ | `SOURCED [RELAYED]` |

> **The Lenovo hard blocker**, `[RELAYED]`: *"The new Think BIOS Config Tool v2 does NOT set an initial supervisor password"*. Lenovo points to **System Deployment Boot Mode** or a third-party option (Absolute's Remote SVP) instead.

**This is the exact mirror image of Dell's blocker and the guide must not blur them:**

| | Dell native template | Lenovo TBCT V2 |
|---|---|---|
| Device has **no** BIOS password | ✅ Required starting state | ❌ **Cannot bootstrap one remotely** |
| Device **has** a BIOS password | ❌ Hard blocker | ✅ Required starting state |

⇒ **Dell wants a virgin BIOS; Lenovo needs one that is already provisioned.** For Lenovo this means the supervisor password must be set **before or during imaging/OOBE**, not by Intune afterwards. That single row is probably the highest-value sentence in the entire per-OEM matrix, and it is precisely the sort of thing a routing matrix (the degraded option the main research pass recommended) would have flattened away.

**Lockout warning**, `[RELAYED]`: incorrect passphrases can trigger BIOS security lockouts after repeated failures — the same hazard class as HP's, and Lenovo likewise recommends lab testing before broad deployment.

### Recovery — Lenovo

**This is the weakest-sourced area of the three and I will not guess.**

- **Certificate reset** is available from the BIOS menu for both the Supervisor and System Management certificates. `SOURCED [RELAYED]`
- **Private key lost:** Lenovo's certificate-based BIOS authentication reference page **does not address** private-key loss, reverting to password authentication, or hard prerequisites. `SOURCED` (documented absence — I fetched the page and the information is not on it).
- **Azure Key Vault mitigates this structurally**, since the key is backed by your own Key Vault's soft-delete/purge-protection and recovery model rather than a `.pfx` on an admin's laptop. `PREMISE` — sensible and almost certainly right, but Lenovo does not say it.
- **Supervisor password lost:** `UNVERIFIED`. I did not locate a first-party Lenovo statement equivalent to Dell's Master Password Lockout article. Industry-standard expectation is that a lost ThinkPad supervisor password is **not** recoverable and requires a system-board replacement, but **I did not source that and it must not be shipped as fact.**

> **Plan-time verification task (high priority, service-desk-critical):** obtain Lenovo's first-party statement on (a) lost supervisor password recovery and (b) lost BIOS certificate private key recovery. Candidate sources: `docs.lenovocdrt.com/guides/lbct/` sub-pages (Getting Started Guide, Module Cmdlet Reference — neither of which I fetched), and Lenovo Support's BIOS password KB. This is the single largest remaining gap in Pillar A.

---

## Cross-cutting: updates vs configuration — keep these axes separate

The brief asks where Dell Command | Update fits and how it interacts with Windows Update driver policies. The honest answer is that this belongs to **Pillar B**, and the guides' main job is to prevent readers from conflating it with Pillar A.

- **Dell Command | Update (DCU)** is a driver/BIOS/firmware *update* client, distinct from Dell Command | Configure. It is Intune-deliverable as a Win32 app, is present in the **Intune Enterprise App Catalog**, and can be published to Intune from the **Dell Management Portal**. `SOURCED` (§A-8 for the catalog; `[RELAYED]` KB 000447089, updated **24 May 2026**, for the portal path).
- **DCU settings are configured from Intune via Imported Administrative templates** (`Devices > Configuration profiles > Create profile > Windows 10 and later > Templates > Imported Administrative templates`, then expand `Computer Configuration`). Dell's ADMX/GPO Reference Guide documents no OMA-URI or Settings Catalog route. `SOURCED [RELAYED]` — the page carries **no date**, so treat currency as unknown.
- **Dell's stated direction is Dell Client Device Manager (DCDM)**, which installs DCU and Dell Trusted Device as *modules* rather than standalone apps, and is deployed into Intune via the Dell Management Portal. Dell **currently recommends DCU** for enterprises while suggesting migration to DCDM in future. `SOURCED [RELAYED]` — search-summary only; **re-verify before writing a recommendation**, because recommending the wrong side of this transition is exactly the "shipping a deprecated tool" failure mode the quality gate names.
- **The conflict risk is real and under-documented.** Running a vendor update client *and* Intune/Autopatch driver update policies means two independent schedulers can offer the same firmware. `PREMISE` — I found no first-party page that adjudicates this. **Flag it as a gray area for `/gsd-discuss-phase`, not as guidance.**

---

## CURRENT vs DEPRECATED — the failure mode the quality gate names

| Tool | Latest version / date found | Verdict | Basis |
|------|------------------------------|---------|-------|
| Intune **BIOS configuration and other settings** (Dell) | Learn `updated_at` 2026-07-01 | **CURRENT — preferred for Dell settings** | `SOURCED` |
| **DCECMI** | v2.0.4, May 2026 (KB 18 May 2026) | **CURRENT** | `SOURCED [RELAYED]` |
| **Dell Command \| Configure** | v5.2.2, March 2026 (KB 06 May 2026) | **CURRENT** (authoring only) | `SOURCED [RELAYED]` |
| **Dell Management Portal** | KB 23–24 May 2026 | **CURRENT** | `SOURCED [RELAYED]` |
| **Dell Command \| Update** | KB current | **CURRENT — Dell's own present recommendation** | `SOURCED [RELAYED]` |
| **Dell Client Device Manager** | — | **EMERGING — future direction, not yet the recommendation** | `SOURCED [RELAYED]` |
| **HP Connect** | Product page live 2026-08-19; user guide **v1.2.0, 2022-09-27** | **CURRENT PRODUCT, STALE DOCS** | `SOURCED` |
| **HP CMSL** | Sure Admin blog *Upd 9/10/2024*; portal © 2026 | **CURRENT** | `SOURCED [DIRECT]` |
| **HP Sure Admin / SPM** | Same | **CURRENT** | `SOURCED [DIRECT]` |
| **HP BCU** | **v4.0.33.1, 8 Dec 2022**; page footer *Last Updated: 12/19/2019* | **STALE, NOT FORMALLY DEPRECATED** | `SOURCED [RELAYED]` |
| **Lenovo TBCT V2** | GUI v2.0.3 / module v1.0.3, **2026-04-06** | **CURRENT** | `SOURCED [RELAYED]` |
| **Lenovo TBCT (HTA v1)** | — | **SUPERSEDED** — INI files incompatible with V2 | `SOURCED [RELAYED]` |
| **Lenovo LBCT V2** | module 2.1.2 | **CURRENT** | `SOURCED [RELAYED]` |
| **Lenovo Commercial Vantage** | `VantageInstaller.exe` from 20.2506.39.0 | **CURRENT** | `SOURCED [RELAYED]` |

**Two judgement calls the guides must make explicitly:**

1. **HP BCU is not deprecated but is four years stale**, and HP's own current material routes BIOS work through CMSL and HP Connect. Recommend **CMSL** as the scripting path and mention BCU as legacy/still-supported. Do **not** write "BCU is deprecated" — HP has not said that, and asserting it would be an over-claim.
2. **Do not recommend DCDM yet.** Dell's own current recommendation is DCU. Recommending DCDM early is the same class of error as recommending a deprecated tool — just in the other direction.

---

## Explicit UNVERIFIED register

Carry these forward as plan-time verification tasks. **None may be written as fact.**

| # | Gap | Why it matters | Suggested source |
|---|-----|----------------|------------------|
| U-1 | **Lenovo lost-supervisor-password recovery** | Service desk's most-used path; Dell has a first-party answer, Lenovo's is missing | Lenovo Support BIOS password KB |
| U-2 | **Lenovo lost certificate private key recovery** | Cert page explicitly silent | `docs.lenovocdrt.com/guides/lbct/` sub-pages |
| U-3 | **HP Endorsement Key loss — is there any escape hatch?** | Currently `PREMISE` that there is none | HP developer portal via curl+UA; HP support |
| U-4 | **HP Connect exact Graph permission scopes** | Guide's Appendix C is screenshots; grep for scope names returned 0 | Live consent dialog, or a current HP Connect doc |
| U-5 | **`hardwarePasswordDetails` vs `hardwarePasswordInfo`, and the 2404/2405/2406 version numbers** | Graph reference URL 404'd; numbers came only via search summary | Microsoft Graph beta reference; Intune What's New |
| U-6 | **Is HP Connect listed under Intune `Partner portals` like Dell?** | Would change the routing answer materially | Live Intune admin center |
| U-7 | **DCU vs Autopatch driver-policy conflict** | No first-party adjudication found | Dell + Learn; likely a discuss-phase gray area |
| U-8 | **Whether a current (post-2022) HP Connect user guide exists** | Everything procedural rests on a 2022 doc | `connect.admin.hp.com`; HP support |
| U-9 | **Lenovo Commercial Vantage Policy Manager details** | Search-summary only | `docs.lenovocdrt.com/guides/cv/management/intune/` |

**Fetch failures, reported honestly:**
- `developers.hp.com` — HTTP **403** to `WebFetch`; **HTTP 200 to `curl` with a browser UA**. Resolved.
- `h20195.www2.hp.com` (Sure Admin whitepaper 4AA7-7307ENW) — TLS failure, *unable to verify the first certificate*. **Not obtained.**
- `kaas.hpcloud.hp.com` HP Sure Admin User Guide PDF — downloaded, but CID-font-encoded; my extractor could not recover text. **Not obtained.** (Its metadata reads © 2012–2016, so it is likely the wrong document anyway.)
- `docs.lenovocdrt.com/guides/tbct/thinkbiosconfig/` — HTTP **404** (the V1 path; V2 lives at `/guides/tbct_v2/`).
- Microsoft Graph `hardwarePasswordDetail` beta reference — HTTP **404**.
- HP Connect guide Appendices C/D/E — pages are images; no text layer.

---

## Recommendations for the three guides

1. **Lead each guide with the secret-custody question, not the tool.** "Where does the BIOS secret live?" is what actually differs, and it is a security-review question that must be answered before any packaging work starts.
2. **Structure all three identically** — Delivery / Authentication / Scope / Prerequisites / Recovery — so the capability matrix is a genuine transposition of the guides rather than a separate artefact that will drift.
3. **Put the Dell↔Lenovo inverted-prerequisite table in the shared routing page**, not buried in either guide. It is the highest-value cross-vendor insight found.
4. **Give recovery its own H2 in every guide**, per the brief. For Lenovo, ship the U-1/U-2 gaps as an explicit "not documented by the vendor — escalate to Lenovo Support" statement rather than omitting the section.
5. **State the vendor-infrastructure boundaries plainly** — they are real and the brief asks for them, not for them to be hidden:
   - HP Sure Admin local F10 access **requires a phone with Internet connectivity**. Intune cannot substitute.
   - HP Connect **stores BIOS passwords and Sure Admin private keys in HP's cloud**, outside the tenant.
   - Dell BIOS password retrieval **requires an active Intune subscription**; the vault dies with the subscription.
   - Lenovo **cannot bootstrap an initial supervisor password remotely**; that must happen at imaging/OOBE time.
6. **Do not rewrite vendor manuals.** No BIOS token tables, no full CMSL cmdlet reference, no per-model matrices. Cmdlet *names* as signposts (e.g. `Get-HPSecurePlatformState` to check provisioning state) are appropriate; syntax reference is not.
7. **Flag Pillar A phases for deeper research** on the U-1/U-2/U-3 recovery gaps before the Lenovo and HP guides are planned. All three are recovery-path questions, which the brief identifies as the most-used content — shipping them as gaps would undercut the guides' primary purpose.

---

## Sources

Fetch date **2026-08-19** for all rows.

| # | Source | URL | Page's own date | Method | Class |
|---|--------|-----|-----------------|--------|-------|
| S-1 | HP Connect for Microsoft Endpoint Manager — User Guide | `https://connect.admin.hp.com/static/HPConnectUserGuide.pdf` | **Version 1.2.0, September 27, 2022** | WebFetch → PDF saved → **own text-layer extraction** | FIRST-PARTY `[DIRECT]` |
| S-2 | Secure BIOS with HP Sure Admin and CMSL | `https://developers.hp.com/hp-client-management/blog/secure-bios-hp-sure-admin-and-cmsl` | *Upd 9/10/2024* (in title) | **curl + browser UA** (403 to WebFetch) | FIRST-PARTY `[DIRECT]` |
| S-3 | HP Sure Admin step-by-step | `https://developers.hp.com/hp-client-management/blog/hp-sure-admin-step-step` | No date; footer **© 2026** | **curl + browser UA** | FIRST-PARTY `[DIRECT]` |
| S-4 | Securing an HP BIOS with Sure Admin and the CMSL | `https://developers.hp.com/hp-client-management/blog/securing-hp-bios-sure-admin-and-cmsl` | No date | **curl + browser UA** | FIRST-PARTY `[DIRECT]` |
| S-5 | HP Client Management Solutions Overview | `https://www.hp.com/us-en/solutions/client-management-solutions.html` | No date given | WebFetch | FIRST-PARTY `[RELAYED]` |
| S-6 | HP BIOS Configuration Utility (BCU) | `https://ftp.ext.hp.com/pub/caps-softpaq/cmit/HP_BCU.html` | v4.0.33.1 **8 Dec 2022**; footer *Last Updated 12/19/2019* | WebFetch | FIRST-PARTY `[RELAYED]` |
| S-7 | Dell Command \| Endpoint Configure for Microsoft Intune | `https://www.dell.com/support/kbdoc/en-us/000214308/dell-command-endpoint-configure-for-microsoft-intune` | **18 May 2026** | WebFetch | FIRST-PARTY `[RELAYED]` |
| S-8 | DCECMI User's Guide — Using Graph APIs to retrieve the Dell BIOS Password manually | `https://www.dell.com/support/manuals/en-us/command-endpoint-configure/dcec_ug/using-graph-apis-to-retrieve-the-dell-bios-password-manually` | No date on page | WebFetch | FIRST-PARTY `[RELAYED]` |
| S-9 | How to Connect Dell Management Portal to Microsoft Intune | `https://www.dell.com/support/kbdoc/en-us/000356434/how-to-connect-dell-management-portal-to-microsoft-intune` | **23 May 2026** | WebFetch | FIRST-PARTY `[RELAYED]` |
| S-10 | How to Deploy Dell Command Update Using Dell Management Portal | `https://www.dell.com/support/kbdoc/en-us/000447089/how-to-deploy-dell-command-update-using-dell-management-portal` | **24 May 2026** (Article Version 2) | WebFetch | FIRST-PARTY `[RELAYED]` |
| S-11 | Dell Command \| Configure | `https://www.dell.com/support/kbdoc/en-us/000178000/dell-command-configure` | **06 May 2026**; v5.2.2 Mar 2026 | WebFetch | FIRST-PARTY `[RELAYED]` |
| S-12 | Dell Command \| Update ADMX and GPO Reference Guide — Configure settings using Microsoft Intune | `https://www.dell.com/support/manuals/en-us/command-update/admx_rg/configure-settings-using-microsoft-intune` | **No date** | WebFetch | FIRST-PARTY `[RELAYED]` |
| S-13 | Dell BIOS Password Help: What to Do If You're Locked Out | `https://www.dell.com/support/kbdoc/en-us/000140298/dell-support-for-lost-bios-password` | **01 May 2026** | WebFetch | FIRST-PARTY `[RELAYED]` |
| S-14 | Dell Client Products Unauthorized BIOS Password Reset Tools | `https://www.dell.com/support/kbdoc/en-us/000180749/dell-client-products-unauthorized-bios-password-reset-tools` | **25 Nov 2024** | WebFetch | FIRST-PARTY `[RELAYED]` |
| S-15 | Think BIOS Config Tool V2 | `https://docs.lenovocdrt.com/guides/tbct_v2/` | **6 April 2026** (GUI v2.0.3 / module v1.0.3) | WebFetch | FIRST-PARTY `[RELAYED]` |
| S-16 | Changing the BIOS Supervisor Password with Intune and the Think BIOS Config Tool V2 | `https://blog.lenovocdrt.com/changing-the-bios-supervisor-password-with-intune-and-the-think-bios-config-tool-v2/` | **16 April 2026** | WebFetch | FIRST-PARTY `[RELAYED]` |
| S-17 | Introducing Think BIOS Config Tool V2 and Lenovo BIOS Certificate Tool V2 | `https://blog.lenovocdrt.com/introducing-think-bios-config-tool-v2-and-lenovo-bios-certificate-tool-v2/` | **4 November 2025** | WebFetch | FIRST-PARTY `[RELAYED]` |
| S-18 | Lenovo BIOS Certificate Tool | `https://docs.lenovocdrt.com/guides/lbct/` | No date; module 2.1.2 | WebFetch | FIRST-PARTY `[RELAYED]` |
| S-19 | Certificate-based BIOS Authentication (ThinkPad) | `https://docs.lenovocdrt.com/ref/bios/settings/thinkpad/certbasedbiosauth/` | **No date** | WebFetch | FIRST-PARTY `[RELAYED]` |
| S-20 | `STACK.md` §A-1 … §A-8 (this repo) | `.planning/research/STACK.md` | 2026-08-18, corrected 2026-08-19 | Read | INTERNAL |

**Seam-assigned provider confidence** — MEASURED (`node ~/.claude/gsd-core/bin/gsd-tools.cjs query classify-confidence --provider websearch` → `LOW`; `--provider webfetch` → `LOW`). As `STACK.md` records, the seam classifies by transport mechanics, not by page authority. Every row above except S-5's tool list is vendor-first-party documentation with a recorded date. **Evidence class and the `[DIRECT]`/`[RELAYED]` marker are the load-bearing columns, not the seam tier.**

### Confidence by area

| Area | Confidence | Reason |
|------|------------|--------|
| HP Connect architecture, delivery, secret custody, offboarding | **HIGH** | 57-page first-party guide, self-extracted `[DIRECT]` |
| HP Connect currency of *procedures* | **LOW** | Only doc is from 2022, pre-rename |
| HP Sure Admin / SPM key model, provisioning, deprovisioning | **HIGH** | HP developer portal `[DIRECT]`, two corroborating pages |
| Dell delivery, auth, prerequisites | **HIGH** | Multiple 2026-dated Dell KBs + Learn via `STACK.md` |
| Dell recovery | **HIGH** | Explicit first-party unrecoverable-state statement |
| Lenovo delivery and Intune artefacts | **HIGH** | CDRT docs + two 2025/2026 CDRT blogs |
| Lenovo model support / ThinkCentre fork | **MEDIUM** | Two first-party sources, reconciliation is `PREMISE` |
| **Lenovo recovery** | **LOW** | Vendor pages explicitly silent — see U-1/U-2 |
| Updates-vs-configuration conflict | **LOW** | No first-party adjudication found |
