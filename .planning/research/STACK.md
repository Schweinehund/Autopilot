# Stack Research

**Domain:** Enterprise update, driver and firmware/BIOS governance documentation (Intune/Entra day-2 operations corpus, v1.21)
**Researched:** 2026-08-18
**Confidence:** MIXED — see the per-claim labels. Seam-assigned provider confidence is LOW/MEDIUM (below); evidence class is the load-bearing column.

---

## How to read this file

Every substantive row carries two labels.

| Label | Meaning |
|-------|---------|
| **SOURCED** | I fetched the page. URL + the page's own `ms.date` / `updated_at` / published date is recorded, plus my fetch date (2026-08-18). |
| **MEASURED** | I ran a command. The command is given. Unless the row says otherwise the command was run **against this repo**; the two rows that probe live URLs say so explicitly and give the `curl` invocation. |
| **PREMISE** | Inference or assumption. Not fetched, not measured. Treat as a hypothesis for the roadmap, never as documentable fact. |
| **UNVERIFIED** | I tried to verify and could not. Do NOT ship as fact. |

**Evidence class** (independent of the seam's provider tier):

| Class | Meaning |
|-------|---------|
| `FIRST-PARTY` | Vendor's own documentation (Microsoft Learn, Apple Support, Android Developers, Canonical, Lenovo CDRT). |
| `THIRD-PARTY` | Community/blog/aggregated search result. |
| `NONE` | Could not obtain. |

**Seam-assigned confidence** (from `gsd_run query classify-confidence`, MEASURED — command: `node ~/.claude/gsd-core/bin/gsd-tools.cjs query classify-confidence --provider webfetch`):

| Provider used | Seam tier |
|---------------|-----------|
| `webfetch` | LOW |
| `websearch` | LOW |

The seam classifies by transport mechanics, not by the authority of the page fetched. It returns LOW for `webfetch` regardless of target. I record that verdict as instructed, and I do **not** use it to justify treating a first-party Microsoft Learn page with a recorded `ms.date` as low-quality evidence. Where a claim below is `SOURCED` + `FIRST-PARTY`, the requirements author should treat it as usable; where it is `THIRD-PARTY` or `UNVERIFIED`, it must be re-verified before it enters a shipped document.

> **No quotation marks appear below unless the string is verbatim from a page I actually fetched.** Setting names, blade paths and verdict labels rendered in **bold** or `code` are verbatim UI/API strings from the cited page.

---

## Executive correction notice — five corpus claims are now WRONG, not merely stale

This is the single most important output of this research. The v1.21 scoping assumed Pillar E was a *freshness re-verification*. It is not. It is a **correction** pillar. Five load-bearing assertions in `docs/operations/patch-management/` are contradicted by current first-party documentation.

| # | Corpus claim (location) | Status | Correct current statement |
|---|-------------------------|--------|---------------------------|
| C-1 | Hotpatch "defaults on for Windows 11 Enterprise 24H2+ from May 2026" + an "April 2026 opt-out toggle" (`01-windows-wufb-rings.md:106-140`) | **UNSUPPORTED** | Current Learn Hotpatch article (`ms.date` 2026-05-28) documents no default-on behaviour and no opt-out toggle. Hotpatch is **opt-in** via a **Windows quality update policy** setting. See Pillar A-3. |
| C-2 | "WUfB deployment rings and Autopatch rings are **mutually exclusive** — they cannot coexist on the same device" (PITFALL-9, `01-windows-wufb-rings.md:77-90`) | **WRONG** | An Autopatch group is a container that *includes* **Update rings policy for Windows 10 and later** among the policies it creates and assigns. Autopatch manages update rings; it does not exclude them. |
| C-3 | Autopatch rings are "Test, First, Fast, and Broad" | **WRONG / HISTORICAL** | Autopatch groups have **Test** and **Last** as the two default deployment rings. Up to 15 rings per group, up to 300 groups per tenant. |
| C-4 | "Driver and firmware updates are NOT gated by WUfB deployment rings or Autopatch rings — they are an independent policy surface" (`00-overview.md:80-84`) | **HALF WRONG — see note below** | The **"not gated by rings"** half is wrong: driver update policies are an Autopatch groups software-update workload, are configured **per deployment ring**, and require a Windows license carrying the Autopatch entitlement. The **"independent policy surface"** half is **correct** and must NOT be deleted — see the C-4 note. |
| C-5 | Product name "Windows Update for Business (WUfB)" used throughout | **RENAMED** | The feature is now **Windows Update client policies**. Learn states the feature was formerly known as Windows Update for Business. `WUfB` survives only in **Windows Update for Business reports**, which retains the old name. |

MEASURED (command: `grep -ril "Windows Update client policies" docs --include=*.md --exclude-dir=graphify-out | wc -l`): **0 files** in the corpus use the current name.

**C-3 occurrence list — complete.** MEASURED (command: `grep -rniE "First.*Fast.*Broad" docs --include=*.md --exclude-dir=graphify-out`, re-run 2026-08-19), **4 hits in 2 files**:

- `docs/operations/patch-management/01-windows-wufb-rings.md:64`, `:69`, `:99`
- `docs/operations/co-management/03-cocmgmt-migration-paths.md:25` — *"ring authoring by managing rings (Test, First, Fast, Broad) automatically based on Microsoft's"*

`docs/operations/patch-management/00-overview.md:76` also carries the ring names, rendered `(Test, First, Fast, Broad rings)` — it is matched by a `Test, First, Fast` prefix grep but not by the comma-and form. Any repair sweep must key on **`First` + `Fast` + `Broad`**, not on the exact comma-and string, or it will miss both `00-overview.md:76` and the co-management file. `MEASURED`

**C-4 note — what is wrong and what is right.** The corpus sentence conflates two claims. Learn's driver-update article states verbatim: *"Driver update policies can be used independently **or** as part of Windows Autopatch"* (quoted again in Pillar B below). So **"independent policy surface" is TRUE as first-party text** — driver update policies exist as their own policy object and do not require Autopatch groups to be composed. What is **false** is "NOT gated by WUfB deployment rings or Autopatch rings": approval mode and the 0–30 day deferral are set **per deployment ring**, and the licensing prerequisite is a Windows license carrying the Autopatch entitlement. The corpus fix is to **split the sentence**, not to delete it. Deleting the independence claim would replace one wrong statement with another. `SOURCED / FIRST-PARTY`

---

## Recommended Stack

### Core Technologies — Pillar A: Firmware / BIOS governance

MEASURED (command: `grep -ri "DFCI" docs --include=*.md --exclude-dir=graphify-out | wc -l`) → **0**. Also 0 for `SEMM`, `Sure Admin`, `Dell Command`. Corpus size MEASURED at **282** markdown files (`find docs -name '*.md' -not -path '*graphify-out*' | wc -l`).

#### A-1. Intune DFCI profile — the Intune-native path

| Attribute | Value | Label |
|-----------|-------|-------|
| Profile type | **Devices > Manage devices > Configuration > Create > New policy**, Platform = **Windows 10 and later**, Profile type = **Templates** > **Device Firmware Configuration Interface** | SOURCED / FIRST-PARTY |
| Underlying CSP | **UEFI CSP** (`/windows/client-management/mdm/uefi-csp`) | SOURCED / FIRST-PARTY — **but not from `configure-dfci-windows`.** That page never uses the string "UEFI CSP". The string is verbatim on `ref-dfci-settings-windows`: *"These settings use the [UEFI CSP]"*. `configure-bios-windows`'s comparison table also says DFCI applies settings *"Through UEFI CSP using the DFCI layer, which is isolated from the OS"*. Cite one of those two, not the profile-creation page. |
| Registration prerequisite | Device must be registered for Windows Autopilot **by the OEM or a Microsoft CSP partner**. Devices manually registered (CSV import) **cannot** use DFCI. Learn states this is by design and requires external attestation of the device's commercial acquisition. | SOURCED / FIRST-PARTY |
| Firmware prerequisite | The manufacturer must add DFCI to their UEFI firmware during manufacturing, or provide it as a firmware update. | SOURCED / FIRST-PARTY |
| Companion profiles | A **Windows Autopilot deployment profile** and an **Enrollment State Page** profile are both required. **The source's own step heading is "Step 2 - Create an Enrollment State Page profile"** — *State*, not *Status*. The same page then uses "Enrollment Status page" in running prose about the reboot, and `configure-bios-windows` uses "Enrollment Status Page (ESP)". The corpus should use **ESP / Enrollment Status Page** as the product name (it is the admin-centre term) but must not present "Enrollment Status Page profile" as a verbatim quote from this page. | SOURCED / FIRST-PARTY |
| Reboot model | Three reboots: (1) ESP-time reboot enrols UEFI to Intune, (2) optional confirmation reboot, (3) a required reboot for UEFI to receive the settings from Windows. | SOURCED / FIRST-PARTY |
| Licensing | **No add-on SKU named.** DFCI is documented under core Intune device configuration with no separate licensing block on the page. | SOURCED (absence) / FIRST-PARTY |

**Source:** `https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-dfci-windows` — page `ms.date: 2026-06-23`, `updated_at: 2026-07-01`. Fetched 2026-08-18.
Note the **URL moved**: the old `/intune/intune-service/configuration/device-firmware-configuration-interface-windows` path returns **HTTP 301** to `/intune/device-configuration/templates/configure-dfci-windows` (it does **not** 404 — corrected 2026-08-19, see the URL-probe block under *What NOT to Use*). The canonical path is the `device-configuration/templates/` one. Any link the corpus writes must use the new path — a live 301 today is not a guarantee the redirect survives, and a redirected link reads as stale to a reviewer.

#### A-2. DFCI persistence and removal — the trap, stated correctly

The corpus scoping calls this "the irreversible-unenroll trap". The precise, sourced behaviour:

- Reinstalling an older Windows version, installing a separate OS, or formatting the hard drive **does not** override DFCI management. The page gives the camera example: reinstalling the OS or wiping the computer will not turn the camera back on. `SOURCED / FIRST-PARTY`
- DFCI's trust chain uses public key cryptography and does not depend on local UEFI (BIOS) password security. `SOURCED / FIRST-PARTY`
- **Deleting the DFCI profile, or removing a device from the assigned group, does NOT remove DFCI settings or re-enable the UEFI menus.** `SOURCED / FIRST-PARTY`
- **Correct retire sequence** (order is load-bearing): edit the DFCI profile → set **Allow local user to change UEFI (BIOS) settings** to **Only not configured settings** → set all other settings to **Not configured** → save → wipe the device → **then** delete the Windows Autopilot record. `SOURCED / FIRST-PARTY`
- **Correct reuse sequence:** wipe the device but do **not** remove the Autopilot device record. `SOURCED / FIRST-PARTY`
- **Recovery when done in the wrong order** (wiped + Autopilot record deleted before unlocking): the menus stay locked and Intune can no longer send profile updates. Recovery is to open the UEFI menu and refresh management from network; this unlocks the menus but leaves all settings at the previous profile's values. `SOURCED / FIRST-PARTY`
- Learn also carries an explicit warning that configuring and assigning DFCI profiles **can lock the device beyond repair**, and that the settings change device hardware and cannot be fixed by re-imaging. `SOURCED / FIRST-PARTY`

#### A-3. DFCI OEM support — **nine** OEMs, and a three-way documented conflict

**CORRECTED 2026-08-19.** The original draft gave six OEMs from a single page and never fetched the page Microsoft actually maintains as the OEM list. There are **three** first-party lists and they disagree.

**List 1 — the authoritative Learn list: NINE OEMs.** `https://learn.microsoft.com/en-us/autopilot/dfci-management`, `ms.date: 2025-03-25`, `updated_at: 2026-04-14`, fetched 2026-08-19. Under the H2 **"OEMs that support DFCI"**, verbatim: **Acer**, **Asus**, **Dynabook**, **Fujitsu**, **Microsoft Surface**, **Panasonic**, **VAIO**, **Samsung**, **NEC** — followed by the sentence *"Other OEMs are pending."* `SOURCED / FIRST-PARTY`

**List 2 — the BIOS-configuration comparison table: SIX OEMs.** `configure-bios-windows` (`ms.date: 2024-06-06`, `updated_at: 2026-07-01`) gives the DFCI column as **Surface, Acer, Asus, Dynabook, Fujitsu, Panasonic**. This is the older, narrower list and it lives on the corpus's *oldest* Microsoft source. `SOURCED / FIRST-PARTY`

**List 3 — Project Mu: ONE OEM, undated.** `https://microsoft.github.io/mu/dyn/mu_feature_dfci/DfciPkg/Docs/Scenarios/DfciScenarios/` named **only Microsoft Surface**, with a note that more are in the works, and carried **no date at all** (fetched 2026-08-18). `SOURCED / FIRST-PARTY`

**Correction to the original draft's framing:** it claimed Learn "points to the Project Mu page as the authoritative OEM list". It does not. `dfci-management`'s actual sentence is a see-also: *"For an overview of DFCI benefits, scenarios, and requirements, see [Device Firmware Configuration Interface (DFCI) Introduction]"* — pointing at Project Mu's `Dfci_Feature/` page, not at an OEM roster. `configure-dfci-windows` does link Project Mu's `DfciScenarios/#oems-that-support-dfci` anchor from its prerequisite bullet, and `configure-bios-windows` appends *"For more information, go to Microsoft DFCI Scenarios."* to its six-OEM cell. Neither page calls Project Mu authoritative for OEM support.

**Recommendation for the roadmap:** document the **nine**-OEM list from `autopilot/dfci-management`, cite that page, and carry the three-list discrepancy as an explicit caveat — including that Microsoft's own comparison table on `configure-bios-windows` is two years staler and still says six. Keep the closing sentence of the Learn list (*"Other OEMs are pending."*) so the list reads as open, not exhaustive. Do **not** generalise to "most business OEMs", and do **not** hardcode "the six".

#### A-4. Surface DFCI eligibility — a real, enumerable model list

`SOURCED / FIRST-PARTY` — `https://learn.microsoft.com/en-us/surface/surface-manage-dfci-guide`, `ms.date: 2026-07-14`.

- Prerequisites: **Windows 11 or Windows 10 version 1809 or later**; registered with Windows Autopilot; commercial SKUs only unless otherwise specified.
- Eligible families: Surface Pro (Pro X through Pro 12th Edition), Surface Laptop (Laptop Go / Go 2 / Go 3 / SE, Laptop 3 / 4 / 5 / 6, Laptop Studio all generations, Laptop 7th/8th Edition and the "for Business" variants), Surface Hub 3, Book 3, Go 3, Go 4, Studio 2+.
  - **Do not render this as "Laptop 3–6".** The table's row for Laptop 3 is verbatim **`Laptop 3 (Intel processors only)`**; Laptop 4, 5 and 6 carry no such qualifier. A range collapses a real per-model exclusion (AMD-based Surface Laptop 3 SKUs). `SOURCED / FIRST-PARTY`
- **Model-gated settings** worth a table in the guide:
  - Surface Pro X does **not** support DFCI for built-in camera, audio, Wi-Fi/Bluetooth.
  - **USB type A**, **Wake-on-LAN**, **Wake-on-Power** are supported **only on Surface Laptop Go 2 and later** (devices released after 1 June 2022).
- Settings Intune exposes that **do not apply to Surface**, verbatim from the page's Note: *"CPU and IO virtualization, **Disable Boot from network adapters**, Windows Platform Binary Table (WPBT), NFC, and SD card."* The leading **Disable** is part of the source string and was dropped in the original draft; note that the Intune settings-reference page's own display name for the setting is the unprefixed **Boot from network adapters** (see A-7), so the two pages genuinely differ and the corpus should quote whichever page it cites. `SOURCED / FIRST-PARTY`
- **Removing DFCI management on Surface** (returns device to factory-new): Retire/Wipe in Intune → delete the Autopilot registration → connect wired Internet with a Surface-branded Ethernet adapter → UEFI menu → **Management > Configure > Refresh from Network**. `SOURCED / FIRST-PARTY`
- **Self-registered devices never get DFCI.** To manage a Surface with Intune but without DFCI, self-register it to Autopilot. `SOURCED / FIRST-PARTY`

#### A-5. SEMM vs DFCI — the routing answer

`PREMISE` with `SOURCED` support: the Surface DFCI guide I fetched **never mentions SEMM**. It presents DFCI as the modern Intune-native path for Surface UEFI management and states DFCI eliminates BIOS passwords. MEASURED: `SEMM` occurs **0** times in the corpus.

I could **not** fetch a current first-party SEMM page in this session. Therefore:
- Documentable now: DFCI is the Intune/cloud path for Surface UEFI settings on Autopilot-registered commercial Surface devices. `SOURCED`
- **Requires a dedicated verification task at plan time:** the precise current status of Surface Enterprise Management Mode (Surface UEFI Configurator, SEMM certificate/package model, whether it is still recommended for non-Autopilot or imaged Surface fleets). `UNVERIFIED / NONE`
- **Do not** ship a "SEMM vs DFCI, use X when Y" decision table on the strength of this research alone.

#### A-6. Intune **BIOS configuration and other settings** — a net-new surface the scoping missed entirely

This is the highest-value discovery of this research. Intune has a **second, distinct, native BIOS policy type** that the v1.21 scoping does not mention.

`SOURCED / FIRST-PARTY` — `https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows`, `ms.date: 2024-06-06`, `updated_at: 2026-07-01`. Re-fetched 2026-08-19.

> **The page's opening Warning — quote it in full, it is the highest-consequence sentence on the page and this milestone is themed on bricking traps:**
>
> *"BIOS configuration changes can impact device functionality and operability, **including the ability to boot or access Bitlocker encrypted drives**. This feature allows Intune administrators to easily update BIOS configurations on their devices. When you make changes, test and deploy in phases to minimize the impact of any unexpected configurations."*
>
> `SOURCED / FIRST-PARTY`

| Attribute | Value |
|-----------|-------|
| Policy name | **BIOS configuration and other settings** |
| Path | **Devices > Manage devices > Configuration > Create > New policy** → Platform **Windows 10 and later** → **Templates** > **BIOS configuration and other settings** |
| Supported OEMs | **Dell** only. Learn's comparison table says "Dell / Possibly more in the future". |
| How it works | You author the config with an OEM tool, deploy the OEM Win32 agent app to devices, then upload the config file to the Intune policy. The **agent must be installed before the policy is assigned.** |
| Dell file format | **Dell Client Configuration Tool Kit file (`.cctk`)**, **2 MB** size limit |
| Dell agent | Dell Command, from `https://www.dell.com/support/kbdoc/000214308/dell-command-endpoint-configure-for-microsoft-intune` |
| Key settings | **Hardware** (select OEM vendor; currently only Dell); **Disable per-device BIOS password protection** (**No** = Intune generates a unique per-device password; **Yes** = no password, previous passwords removed); **Configuration file** |
| Password retrieval | Microsoft Graph **hardwarePasswordDetails** API. Per-device: `https://graph.microsoft.com/beta/deviceManagement/hardwarePasswordDetails('<deviceID>')`. All devices: `https://graph.microsoft.com/beta/deviceManagement/hardwarePasswordDetails` |
| RBAC — policy authoring | **Minimum role to configure the Intune policies at all: `Policy and Profile manager`.** Verbatim: *"To configure the Intune policies, at a minimum, sign in to the Intune admin center with the **Policy and Profile manager** role."* The original draft omitted this entirely and recorded only the password-read roles. |
| RBAC — password read | **Two options, two different roles.** *Option 1 (per device)* needs a **custom Intune RBAC role** with **Managed devices > Read Bios Password = Yes** — and **creating that custom role itself requires the built-in `Intune Role Administrator` role** (*"At a minimum, sign in to the Intune admin center as a member of the **Intune Role Administrator** built-in Intune role."*). *Option 2 (all devices at once)* needs only the Entra **`Intune Administrator`** role and no custom role at all. Option 2 is the wider blast radius and the cheaper path — say so. |
| Enrollment scope | Organization-owned, MDM-enrolled devices only. Personal and non-enrolled devices are not supported. |
| Hard prerequisite | Devices must **not** already have a BIOS password. Intune must hold the password or it cannot update the configuration. |
| Autopilot integration | Verbatim from the comparison table: *"In the Enrollment Status Page (ESP) settings, select the OEM Win32 app."* (contrast, verbatim: DFCI — *"Intune automatically enrolls the device in DFCI mgmt."*) **The words "as a blocking app" are NOT on the page** and were added by the original draft; selecting an app in ESP settings is how you make it blocking, but do not present the phrase as a quote. |
| Reporting | Reports only *whether the configuration file applied* (contrast: DFCI reports **per setting**) |
| Removal | Set **Disable per-device BIOS password protection** to **Yes**, assign, let the device check in, reboot. **Unenrolling the device from Intune does NOT remove the BIOS password.** |
| Subscription-end trap | If the tenant's Intune subscription ends, there is **no way** to read or retrieve BIOS passwords; the only option is to contact the OEM. Back up passwords outside Intune. |

**This changes the Pillar A structure recommendation.** The scoping framed per-OEM BIOS work as vendor-tooling-delivered-through-Intune (Win32 app / script). For **Dell that is now only half true** — Dell has a first-class Intune policy template. The Dell guide should lead with the native **BIOS configuration and other settings** template and treat raw Dell Command | Configure scripting as the fallback.

#### A-7. Complete DFCI settings surface (for the settings-reference section)

`SOURCED / FIRST-PARTY` — `https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-dfci-settings-windows`, `ms.date: 2026-06-23`, `updated_at: 2026-07-01`. All value sets are **Not configured / Enabled / Disabled** unless stated.

| Category | Settings (verbatim display names) |
|----------|-----------------------------------|
| UEFI access | **Allow local user to change UEFI settings** — values **Only not configured settings**, **None** |
| Security features | **CPU and IO virtualization** (Not configured / **Enabled** only — no Disabled value); **Windows Platform Binary Table** (WPBT); **Simultaneous multithreading** (SMT) |
| Cameras | **Cameras**, **Front cameras**, **Rear cameras**, **Infrared (IR) cameras** |
| Microphones and speakers | **Microphones and speakers** (category), **Microphones** (granular) |
| Radios | **Radios (Bluetooth, Wi-Fi, NFC, etc.)** (category), **Bluetooth**, **WWAN**, **NFC**, **Wi-Fi** (granular) |
| Boot Options | **Boot from external media (USB, SD)**, **Boot from network adapters** |
| Ports | **USB type A**, **SD card** |
| Wake settings | **Wake on LAN**, **Wake on power** |

**Three documented interaction traps** worth first-class callouts (the original draft said "two" and then listed three):

1. **Category-vs-granular conflict loop.** If both a category setting (e.g. **Microphones and speakers**) and its granular member (**Microphones**) are configured, the two flip each other noncompliant on every sync, forever. The documented pattern for "allow only Wi-Fi": leave **Radios (Bluetooth, Wi-Fi, NFC, etc.)** at **Not configured**, set **Wi-Fi** to Enable, set all other granular radios to Disabled. `SOURCED / FIRST-PARTY`
2. **Boot/port bricking.** Setting **Boot from external media (USB, SD)** to Disabled also disables booting from network adapters; combining it with **Boot from network adapters = Enabled** makes one of the two noncompliant. Disabling all external boot options or all external ports significantly complicates OS recovery — Learn says recovery may require physically opening the device and replacing the hardware storage. The Surface guide adds the specific case: disabling both **Boot from external media** and **USB type A** on an unbootable device means you cannot recover without replacing the SSD. `SOURCED / FIRST-PARTY`
3. Setting **Radios** to Disabled requires a wired network connection or the device can become unmanageable. `SOURCED / FIRST-PARTY`

#### A-8. Per-OEM native BIOS tooling delivered through Intune

**Confidence is materially lower here than for the Intune-native surfaces.** HP's first-party developer portal returned HTTP 403 to my fetch. Dell's own manual pages were not fetched directly. Only Lenovo's first-party engineering blog was fetched successfully.

| OEM | Tool / mechanism | Delivery through Intune | Auth model | Evidence |
|-----|------------------|-------------------------|------------|----------|
| **Dell** | **Dell Command \| Configure** authors a `.cctk`; **Dell Command \| Endpoint Configure for Microsoft Intune (DCECMI)** is the on-device agent | Agent as a **Win32 app** (required assignment), config as an Intune **BIOS configuration and other settings** template policy | Intune-generated **unique per-device BIOS password**, retrievable via Graph `hardwarePasswordDetails` | `SOURCED / FIRST-PARTY` for the Intune policy side; agent/tool names corroborated `THIRD-PARTY` |
| **Dell** | **Dell Command \| Update** — driver/BIOS *update* client (distinct from Configure) | Deployable as a Win32 app; **is present in the Intune Enterprise App Catalog** — the catalog app list I fetched contains **Dell Command Update**, **Dell Command Update (Windows Universal Application)** and **Dell EMC System Update** | n/a | `SOURCED / FIRST-PARTY` (catalog list on the Enterprise App Management page) |
| **HP** | **HP BIOS Configuration Utility (BCU)**; **HP Client Management Script Library (CMSL)** PowerShell module; **HP Sure Admin** for authenticated BIOS access | Win32 app / PowerShell platform script; **HP Client Management Script Library is in the Enterprise App Catalog** | HP Sure Admin uses Enhanced BIOS Authentication Mode with a signing key rather than a plaintext BIOS password — **the specific cmdlet names, key-provisioning flow and model/BIOS floors could not be verified**; HP's developer portal returned 403 | `THIRD-PARTY` for BCU/CMSL/Sure Admin roles; catalog presence is `SOURCED / FIRST-PARTY`; **auth mechanics are `UNVERIFIED`** |
| **Lenovo** | **Think BIOS Config Tool V2** — rebuilt as PowerShell over the **`Lenovo.BIOS.Config`** module (v1.0.2), GUI + CLI, exports/imports **INI** files; **Lenovo BIOS Certificate Tool V2** generates cryptographically signed WMI commands | The tool itself can **create Win32 App packages automatically**, **generate Proactive Remediation scripts**, and **upload directly to Intune via Microsoft Graph API** | Supervisor password **or** certificate-based signing; certificate signing supported on **ThinkPad 2022+, ThinkCentre 2020+, ThinkStation 2020+**; **Azure Key Vault** integration keeps private keys off the endpoint | `SOURCED / FIRST-PARTY` (Lenovo CDRT ThinkDeploy blog, published **2025-11-04**) |
| **Lenovo** | **Commercial Vantage** | Ships ADMX/ADML; Intune path is ADMX ingestion or a **Custom OMA-URI** profile per policy | n/a | `THIRD-PARTY` |

**Scope guardrail for the roadmap (matches the milestone's own "Intune-delivery-shaped and link-not-copy" rule):**
- **Document:** what the tool is, what Intune object carries it (Win32 app / platform script / template policy / custom OMA-URI), what authentication model it uses, and what it cannot do.
- **Do not document:** per-setting BIOS token tables, vendor CLI syntax reference, or model-by-model support matrices. Those are the vendor's manuals.
- **Flag as out of scope (vendor-infrastructure-dependent, beyond the corpus's Intune-client-side boundary):** Dell TechDirect / Dell Client Command Suite server components, Lenovo Device Manager cloud console. `PREMISE`
- **`HP Connect for Microsoft Endpoint Manager` — REMOVED from the out-of-scope list 2026-08-19 by owner ruling; it is IN SCOPE for v1.21.** It is not merely a vendor console: it changes HP's Intune delivery shape from a Win32-packaged BCU/CMSL script to a **vendor connector with Entra-integrated certificate authentication**, which is squarely an Intune-object question. **This research has zero coverage of it** — `connect.admin.hp.com` was never fetched, and HP's developer portal 403'd. It needs a dedicated research pass before it can become a requirement. `UNVERIFIED / NONE`
- **The `[LOW]` confidence on this whole section reflects a non-attempt, not an unavailability.** Lenovo CDRT's guide site (`docs.lenovocdrt.com`) and HP's Sure Admin guides plus `connect.admin.hp.com` are publicly reachable and were not tried. Do not carry the LOW rating forward as evidence that better sources do not exist.

---

### Core Technologies — Pillar B: Windows driver + firmware updates

`SOURCED / FIRST-PARTY` — `https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-driver-updates` (`ms.date: 2026-01-14`, `updated_at: 2026-04-09`) and `https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-manage-driver-and-firmware-updates` (`ms.date: 2025-03-31`, `updated_at: 2025-06-04`).

Note the **URL move**: `/intune/intune-service/protect/windows-driver-updates-overview` returns **HTTP 301** to `/intune/device-updates/windows/manage-driver-updates` (it does **not** 404 — corrected 2026-08-19). Write the canonical `device-updates/windows/` path.

| Attribute | Value |
|-----------|-------|
| Policy type | **driver update policies** |
| Navigation | **Devices > Manage updates > Windows updates > Driver updates** tab |
| Approval scope choice | **Use the same approval method for all deployment rings** or **Use different approval methods for each deployment ring** |
| Approval modes | **Automatically approve** and **Manually review and approve** (documented in the Autopatch article as **Automatic** and **Manual**; Automatic is the **default** and the recommended mode) |
| Automatic deferral | **Driver update deferrals** > **Deferral period in days**, **0 to 30 days**, settable per deployment ring; by default matches the Windows quality update deferral values |
| Manual mode | No deferral (shown as *Not applicable*); the admin must **specify the date to start offering** each approved driver |
| Driver tabs | **Recommended** drivers (OEM/publisher-marked *required*, most recent required version — the same updates offered through Windows Update) and **Other drivers** (superseded versions, firmware updates, optional/opt-in driver updates) |
| Approval actions | **Approve for all policies** / **Decline for all unreviewed policies** / **Manage for individual policies**, then pick the date to make the driver available through Windows Update |
| Not managed | **Extensions** drivers are not managed by Autopatch. **Plug and play** drivers install automatically on first detection, then become manageable and require approval for subsequent updates. |

**Mode-switch data-loss trap** — deserves a first-class callout. Switching between Automatic and Manual **generates new policies that replace the old ones**, and Learn states you will lose any approvals, paused drivers and declined drivers previously made for those groups/rings. `SOURCED / FIRST-PARTY`

**Prerequisites — all explicit, all must land in the guide:**

| Requirement | Value |
|-------------|-------|
| Licensing | **Microsoft Intune Plan 1** **AND** a Windows license that includes the **Autopatch entitlement** |
| Windows editions | **Pro**, **Pro Education**, **Enterprise**, **Education**. **Windows Enterprise LTSC is not supported** — Learn says to use update ring policies instead. |
| Identity | Intune-managed **AND** Microsoft Entra joined or Microsoft Entra hybrid joined |
| Telemetry | Diagnostic data on, minimum **Required** |
| Service | **Microsoft Account Sign-In Assistant** (`wlidsvc`) enabled and running |
| Clouds | Public cloud and **GCC** |
| Admin roles | **Policy and Profile manager** (or custom with Device configurations Assign/Create/Delete/View Reports/Update/Read). Report viewing: **Endpoint Security Manager**, **Read Only Operator**, **Help Desk Operator**, or custom with Managed devices/View Reports. |

**Architecture (the answer to "relationship to Autopatch"):** Intune supplies identity, assignment and approvals → **Windows Autopatch** configures Windows Update behaviour and coordinates deployment → **Windows Update** determines applicability and installs only approved updates → reporting flows back through Autopatch into Intune reporting. Driver update policies can be used independently **or** as part of Windows Autopatch. Client-side install behaviour (restarts, notifications) is still governed by standard Windows Update policy settings. `SOURCED / FIRST-PARTY`

**Retain from the existing corpus:** the SCCM/WUfB **dual-scan** source-conflict section and its three mitigations (`01-windows-wufb-rings.md:169-196`) are not contradicted by anything I fetched, and the Autopatch prerequisites page independently confirms the underlying mechanism by pointing at scan source to control which update types come from WSUS vs the cloud. Keep it; re-label "WUfB" to "Windows Update client policies". `SOURCED / FIRST-PARTY` (mechanism), `PREMISE` (that the three mitigations remain individually current).

---

### Core Technologies — Pillar C: Windows Autopatch, M365 Apps, Enterprise App Management

#### C-1. Windows Autopatch

`SOURCED / FIRST-PARTY` — overview `https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-overview` (`ms.date: 2026-07-13`, `updated_at: 2026-07-21`); prerequisites `.../prepare/windows-autopatch-prerequisites` (`ms.date: 2026-02-26`, `updated_at: 2026-05-14`); groups `.../deploy/windows-autopatch-groups-overview` (`ms.date: 2025-06-17`, `updated_at: 2026-06-19`).

**What it is now:** a cloud service that automates **Windows, Microsoft 365 Apps for enterprise, Microsoft Edge, and Microsoft Teams** updates.

**Licensing — exhaustive, verbatim list:**
- Microsoft 365 Business Premium
- Windows 10/11 Education A3 or A5 (included in Microsoft 365 A3 or A5)
- Windows 10/11 Enterprise E3 or E5 (included in Microsoft 365 F3, E3, or E5)
- Windows 10/11 Enterprise E3 or E5 VDA

**The restructuring the milestone must call out (this is the "renamed or restructured recently" answer):** In **April 2025**, Autopatch **removed feature activation** and made Autopatch features available to **Business Premium and A3+** licenses. Feature entitlement is now tiered — everything (Releases, Update rings, Quality updates, Feature updates, **Driver and firmware updates**, Autopatch groups, all communications, Intune Reports, Device readiness) is available at Business Premium / A3+ / E3+ / F3, and **only one feature is E3+/F3-exclusive: submitting support requests** to the Windows Autopatch Service Engineering Team. `SOURCED / FIRST-PARTY`

**Enrollment / onboarding prerequisites:**

| Area | Requirement |
|------|-------------|
| Identity | **Microsoft Entra ID P1 or P2** and **Microsoft Intune** required. Entra must be source of authority, or accounts synced via latest supported Microsoft Entra Connect for hybrid join. |
| Device management | Already enrolled in Intune before registering with Autopatch. Intune as MDM authority, or co-management enabled. |
| Co-management workloads | At minimum **Windows Update** and **Device configuration** workloads at **Pilot Intune** or **Intune** |
| Ownership | **Corporate-owned only.** Windows BYOD is **blocked during device registration prerequisite checks.** |
| Management source | Intune or ConfigMgr co-management. **Devices only managed by Configuration Manager aren't supported.** |
| Activity | Must have communicated with Intune **in the last 28 days**, and be internet-connected |
| Diagnostic data | **Required** level minimum; **Optional** for Windows 11, **Enhanced** for Windows 10, to get the tailored deployment protections |
| Editions | Windows 11 and Windows 10 Professional, Education, Enterprise, Pro Education, Pro for Workstations, and **IoT Enterprise**. General Availability Channel. |
| LTSC | Supported for registration, but **only the Windows quality updates workload**. Windows Update client policies and Autopatch **do not offer feature updates to LTSC devices**. |
| Auth | **App-only auth must be turned on** in the Autopatch tenant or Autopatch groups does not work properly |
| Group type | **Autopatch groups does not support user-based Microsoft Entra groups** |

**Ring model — CORRECTED:**
- An **Autopatch group** is a container of Entra groups plus software update policies: **Update rings policy for Windows 10 and later**, **feature updates for Windows 10 and later policies**, **driver update policies**, **Microsoft 365 App update policies**, **Microsoft Edge update policies**.
- Default deployment rings are **Test** and **Last**. Both are automatically present, **cannot be removed or renamed**, and each supports only one Entra group assignment at a time (one level of nesting allowed).
- **At least two deployment rings** are required; a single-ring composition is unsupported.
- Limits: **up to 15 deployment rings per Autopatch group**, **up to 300 Autopatch groups per tenant** (the Create option greys out at 300).
- Ring distribution types: **Dynamic**, **Assigned**, or a combination — except Test and Last, which do **not** support the combination.
- Software update workloads: Windows feature updates, Windows quality updates, **Driver and firmware updates**, Microsoft 365 Apps for enterprise, Microsoft Edge.

**Beyond-the-OS coverage, with the actual service objectives:**

| Workload | What Autopatch does |
|----------|---------------------|
| Windows quality | Aims to keep at least **95%** of Up to Date devices on the latest quality update |
| Windows feature | Multi-phase release policies with customizable phased deployments per Autopatch group |
| **Microsoft 365 Apps for enterprise** | Aims to keep at least **90%** of eligible devices on a supported version of the **Monthly Enterprise Channel (MEC)** |
| **Microsoft Edge** | Configures eligible devices for Edge's progressive rollouts on the **Stable** channel |
| **Microsoft Teams** | Allows eligible devices to use the standard automatic update channel |
| **Drivers and firmware** | Per Pillar B above |

**Reporting surfaces:** Intune reports; **Hotpatch quality update report**; enhanced **Windows quality and feature update reports**; **device alerts**; **Autopatch alerts and remediation** (which surfaces VBS status via the alert `Hotpatch – VBS not running`); **Autopatch groups membership report**. Communications flow through **Microsoft 365 admin center > Message center**. `SOURCED / FIRST-PARTY`

**Relationship to Windows Update client policies — RE-ATTRIBUTED 2026-08-19.** This sentence does **not** come from §C-1's three sources (overview / prerequisites / groups). It lives on `https://learn.microsoft.com/en-us/windows/deployment/update/waas-manage-updates-wufb` (`ms.date: 2024-05-16`, `updated_at: 2025-10-02`), in the closing *"Other Windows Update client policies services"* list. Verbatim:

> *"Windows Autopatch is a cloud service designed to work with your existing Windows Update client policies. Windows Autopatch provides additional control over the approval, scheduling, and safeguarding of updates delivered from Windows Update to managed devices."*

That is cooperation, not exclusion — this sentence is a direct refutation of corpus claim C-2. `SOURCED / FIRST-PARTY` (`waas-manage-updates-wufb`, not the Autopatch overview).

**The stronger refutation of C-2 is the containment sentence** on `windows-autopatch-groups-overview`, already recorded in the ring model above: an Autopatch group is a container that includes **Update rings policy for Windows 10 and later** among the policies it creates and assigns. Prefer that one as the load-bearing citation; the `waas-manage-updates-wufb` sentence is corroboration. `SOURCED / FIRST-PARTY`

#### C-2. Hotpatch — the freshness item, and it fails

`SOURCED / FIRST-PARTY` — `https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-hotpatch-updates`, `ms.date: 2026-05-28`, `updated_at: 2026-06-02`. Fetched 2026-08-18.

| Attribute | Current documented value |
|-----------|--------------------------|
| Enablement | **Opt-in.** Devices > **Manage updates** > **Windows updates** > **Quality updates** tab > **Create** > **Windows quality update policy** > Settings > set **When available, apply without restarting the device ("Hotpatch")** to **Allow** |
| Default-on claim | **Not present anywhere on the current page.** No May 2026 flip, no April 2026 opt-out toggle, no "Hotpatch toggle" on an update ring. |
| Service dependency | **Requires Windows Autopatch** to create and deploy hotpatch updates to devices enrolled in the Autopatch quality update policy |
| Licensing | **Windows 11 Enterprise E3 or E5, Microsoft 365 F3, Windows 11 Education A3 or A5, Microsoft 365 Business Premium, or Windows 365 Enterprise.** **Re-verified 2026-08-19** against the live page: the string is **`Microsoft 365 F3`**. PITFALLS.md quotes the same sentence as "Windows 11 Enterprise F3" — **PITFALLS is wrong and must be fixed**; STACK is correct. Verbatim: *"One of the eligible licenses: Windows 11 Enterprise E3 or E5, Microsoft 365 F3, Windows 11 Education A3 or A5, Microsoft 365 Business Premium, or Windows 365 Enterprise"* |
| OS floor | **Windows 11, version 24H2 or later** |
| Baseline requirement | Device must be on the **latest baseline release version** |
| VBS | **Required.** Enable via CSP **`VirtualizationBasedTechnology`**. Verify in **System Information > System summary > Virtualization-based security = Running**. |
| Arm64 | Must **disable CHPE**: CSP **`DisableCHPE`** (policy-csp-system), or DWORD `HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management` → `HotPatchRestrictions=1`, then restart. Set once; survives updates. |
| Cadence | **Baseline (restart) in January, April, July, October**; **hotpatch (no restart) in the other eight months**. Occasional out-of-band baselines are possible and do **not** shift the planned cadence. |
| Ineligible devices | Silently receive the standard **LCU** instead, keeping their configured update ring settings |
| Deferral interaction | Turning on hotpatch **does not change** existing deadline-driven or scheduled installation configurations; deferral and active-hours settings still apply |
| Version-upgrade trap | Upgrading Windows version (e.g. 24H2 → 25H2) during a **baseline month** keeps the device on the hotpatch cycle; upgrading during a **hotpatch month** switches it to standard updates and requires a restart, with hotpatch resuming after the next baseline |
| Rollback | Automatic rollback is **not supported**; you can uninstall a hotpatch, which is quick but requires a restart |
| Verification | Event Viewer, filter `AllowRebootlessUpdates`; `Update/AllowRebootlessUpdates:true` + `isEnrolled: 1` indicates enrolment. Also Settings > Windows Update > Advanced options > **Configured update policies** > **Enable hotpatching when available**. |
| Report | **Hotpatch quality update report** — per-policy view of update statuses for all devices receiving hotpatch |
| Arm64 Office note | 32-bit Microsoft 365 Apps on Windows Arm: new feature updates stopped **October 2025**, security updates end **December 2026**. No plans to support hotpatch on Arm64 with CHPE enabled. |

**What survives from the corpus:** the reboot-cadence reduction from monthly to quarterly, and the compliance-reporting re-baselining advice, are consistent with the documented 4-baseline/8-hotpatch year. Keep that reasoning; **delete the default-on and opt-out-toggle claims.**

**RETRACTED 2026-08-19 — the "delete the Windows 11 Pro constraint" instruction.** The original draft justified it by asserting that Business Premium and Windows 365 Enterprise are "neither of which is Enterprise edition". That premise is **wrong for Windows 365 Enterprise**, which provisions Cloud PCs running **Windows 11 Enterprise**. The page also carries an H2 titled verbatim **"Hotpatch on Windows 11 Enterprise or Windows Server 2025"**, and its Autopatch sibling documents hotpatch as a Windows 11 **Enterprise** feature. So the page does **not** establish that Hotpatch reaches Windows 11 Pro.

The honest position: the prerequisite is stated as a **licence list**, not an edition list, and the page never says "Pro is supported" or "Pro is not supported". Do **not** instruct the corpus to delete its Pro-exclusion sentence on the strength of this research. `UNVERIFIED` — **plan-time task: establish whether a Windows 11 Pro device carrying an eligible licence (e.g. Microsoft 365 Business Premium) is offered hotpatch, or is treated as an "ineligible device" and given the LCU.** Until that is sourced, restate the constraint as the licence list plus the observed Enterprise framing, and flag Pro as unconfirmed.

#### C-3. Microsoft 365 Apps update channels

`SOURCED / FIRST-PARTY` — `https://learn.microsoft.com/en-us/microsoft-365-apps/updates/overview-update-channels`, `ms.date: 2026-05-27`, `updated_at: 2026-06-23`.

| Channel | Feature update cadence | Support duration | Rollback |
|---------|------------------------|------------------|----------|
| **Current Channel** (default for M365 Apps for enterprise / for business, and for subscription Project & Visio) | As soon as ready, ~monthly, no set schedule | Until the next version ships (~1 month) | Not applicable |
| **Current Channel (Preview)** | ≥1 week ahead of Current Channel, no set schedule | Until next version | — |
| **Monthly Enterprise Channel** | Second Tuesday monthly | **3 months** | **3 months** |
| **Semi-Annual Enterprise Channel** | Second Tuesday of **January and July** | **8 months** (was fourteen; reduced beginning July 2025) | **2 months** |
| **Semi-Annual Enterprise Channel (Preview)** | ~4 months ahead of SAEC | — | — |
| **Beta Channel** (formerly Insider / Insider Fast) | Continuous | **Not supported** — test environments only | — |
| `PerpetualVL2021` | Office LTSC 2021 volume-licensed only | — | — |

**SAEC unification — the date has PASSED and the source page has not been updated. Do not write it as a future deadline.** `SOURCED / FIRST-PARTY`, re-verified 2026-08-19.

The original draft wrote this as a hard deadline "inside this milestone's window". Today is **2026-08-19**; the stated month was **July 2026**. Both readings are unsafe, so the corpus must state **both facts**:

1. **Microsoft's announcement, verbatim and still future-tense on the page** (`overview-update-channels`, `ms.date: 2026-05-27`, `updated_at: 2026-06-23`): the top-of-page Important reads *"Microsoft is making significant changes to update channels beginning July 2026. **Semi-Annual Enterprise Channel** will receive feature and security updates monthly, on the same basis as Monthly Enterprise Channel"*; the SAEC section adds *"Beginning July 2026, Semi-Annual Enterprise Channel **will** begin receiving monthly feature and security updates. Rollback to prior feature releases with security updates **will be** available for 2 months."*; and the support-duration section adds *"Beginning July 2026, feature releases for Semi-Annual Enterprise Channel **will be** supported for 1 month. A 2-month rollback period **will be** available … resulting in an effective 3-month support window."*
2. **The same page's own comparison table still describes the OLD behaviour**: SAEC *Feature updates* = *"Twice a year (in January and July), on the second Tuesday of the month"*; *Support duration* = *"Eight months (Beginning July 2025; previously fourteen months)"*; *Rollback support* = *"Two months"*. The SAEC feature-updates section likewise still reads *"twice a year, on the second Tuesday in January and July"*.

So as of 2026-08-19 the page is **internally inconsistent and has not been revised past its announcement**. Neither "the change landed" nor "the change is upcoming" is supportable from it. **Write the announcement with its date and its verbatim tense, note that the page's own comparison table was not updated, and route the live-state question to a plan-time verification task.** Treat the actual post-July-2026 SAEC cadence as `UNVERIFIED`.

The corpus's two-hard-deadline framing still needs a **third** entry for this — but as *"announced for July 2026, source page not yet updated"*, not as a countdown.

**Configuration surfaces:** Office Deployment Tool (`Channel` attribute in Add and Updates elements), Group Policy ADMX **Update Channel** under `Computer Configuration\Policies\Administrative Templates\Microsoft Office 2016 (Machine)\Updates`, and Microsoft 365 admin center > **Show all > Settings > Org settings > Services > Microsoft 365 installation options** (tenant-wide, self-install only). `SOURCED / FIRST-PARTY`

**Structural constraints worth a callout:** update channel is **device-specific, not user-following**; **only one channel per device** (M365 Apps, Project and Visio on one device must share it); Teams and OneDrive have **separate cadences** outside these channels. `SOURCED / FIRST-PARTY`

**Autopatch interaction:** Autopatch's M365 Apps target is **Monthly Enterprise Channel** at ≥90% of eligible devices, and Autopatch groups create/assign **Microsoft 365 App update policies**. `SOURCED / FIRST-PARTY`

**Gap:** I did **not** fetch the Intune-side M365 Apps update policy surface (the settings-catalog / Cloud Policy path for setting channel and deadline from Intune, and the exact **Update Deadline** / **Set a deadline** setting names). Treat "how channel and deadline are set via Intune policy" as `UNVERIFIED` and give it a dedicated plan-time verification task.

#### C-4. Enterprise App Management / Enterprise App Catalog

`SOURCED / FIRST-PARTY` — `https://learn.microsoft.com/en-us/intune/app-management/deployment/enterprise-app-management`, `ms.date: 2026-06-03`, `updated_at: 2026-06-24`.

MEASURED (`grep -ril "Enterprise App Catalog" docs --include=*.md --exclude-dir=graphify-out`): **6 files / 7 hits**, matching the scoping's count.

| Attribute | Value |
|-----------|-------|
| Licensing | **Requires a subscription in addition to Microsoft Intune Plan 1 or Plan 2.** Purchasable **as a standalone SKU or as part of the Microsoft Intune Suite.** So: yes, an add-on; no, not Intune-Suite-only. |
| Platform | **Windows apps only.** Catalog apps are **Win32 (exe and msi)**, prepared as Win32 apps and **hosted by Microsoft**, served from `*.manage.microsoft.com`. |
| Clouds | Public, **GCC High**, **DoD** |
| **WinGet** | **Explicitly NOT used.** Learn's FAQ: does Enterprise App Management use Winget? **No.** Catalog apps are installed directly by the **Intune Management Extension (IME)**. |
| Update automation | **Auto-update** for catalog apps with a **Required** assignment — Intune detects a newer catalog version and updates targeted devices with no new app object and no supersedence relationship. Supported on Windows 10 and 11. Apps assigned **Available for enrolled devices** keep the old workflow. |
| Alternative | **Guided update supersedence** for admins who want to review before applying; available updates listed under **Apps > Enterprise App Catalog apps with updates** |
| Self-updating apps | Some catalog apps self-update per the vendor's own process; Intune enforces a **target minimum version** and reports the detected version |
| Catalog SLOs | 80–90% of updates available within **24 hours** of ingestion; manual-validation apps within **seven days**; expedited goal of **48 hours** for high-usage/critical apps |
| Reporting | **Managed Apps report** for per-device catalog app state |
| Automation | Microsoft Graph |

**Auto-update limitations — every one is a documented gap and belongs in the guide:**
- **No rollback and no automatic uninstall remediation.**
- **Malicious version revocation:** Microsoft removes the app and posts a notification, but **you** must identify impacted devices and remediate.
- **Catalog cache lag of up to one hour** — devices can remain exposed to a revoked version for that window.
- **No rollout rings / no phased deployment.** A new version goes to all targeted devices simultaneously.
- **Reporting reflects latest state only** — no per-device history of prior version states.
- **An *auto-update* catalog app cannot be used as a blocking app in ESP or Autopilot device preparation** — verbatim: *"You can't add an **auto-update** Enterprise App Catalog app as a blocking app in the Enrollment Status Page (ESP) or Autopilot device preparation."* **This is a limitation of auto-update, not of the catalog.** See the positive statement below — writing only the negative inverts the guidance.
- **Conflicts with other app types** targeting the same app are unsupported (race condition between LOB and auto-update installs).
- Microsoft **does not assert compliance, authorization, authenticity, or integrity** for apps distributed via Intune.
- **Intune performs no license check** on catalog apps; you buy and distribute vendor licenses yourself.
- Apps behind a paywall or sign-in screen are **not supported** for catalog addition.
- Vendor-requested removals: existing deployments keep working, but no new deployments (the page names **think-cell** as a live example).
- ConfigMgr does not directly support catalog apps; co-managed clients can receive them when targeted from Intune.

**The Autopilot positive — ADDED 2026-08-19, and it must lead the ESP discussion.** The page's *Benefits* section states verbatim: *"**Windows Autopilot integration**: Enterprise App Catalog apps are supported with Windows Autopilot. … Using Windows Autopilot, you can select blocking apps from the Enterprise App Catalog in the Enrollment Status Page (ESP) and the Device Preparation Page (DPP) profiles. This feature allows you to update apps more easily without needing to update those profiles with the latest versions."* `SOURCED / FIRST-PARTY`

**The correct guidance is therefore a trade-off, not a prohibition:** catalog apps **can** be ESP/DPP blocking apps; turning **auto-update** on for a given catalog app is what forfeits that. An Autopilot-centric corpus adding a driver/firmware pillar will hit exactly this choice — say it as a choice.

**Correction for the requirements author:** the milestone question frames pillar 5 as "Enterprise App Catalog … and WinGet-based app patching". Those are two different things. Enterprise App Management is **not** WinGet-based, per Microsoft's own FAQ. If WinGet-based patching is genuinely in scope, it is a separate surface (WinGet CLI / Microsoft Store app type / `DesktopAppInstaller`) that this research did **not** cover. `SOURCED / FIRST-PARTY` for the negative; `UNVERIFIED` for any WinGet surface.

---

### Core Technologies — Pillar D: Linux update delivery

`SOURCED / FIRST-PARTY` — `https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-custom-settings-linux` (`ms.date: 2025-01-09`, `updated_at: 2026-07-01`) and `https://learn.microsoft.com/en-us/intune/fundamentals/ref-supported-platforms` (`ms.date: 2025-10-14`, `updated_at: 2026-07-01`).

**The blocking finding — the milestone's own platform floor is stale.**

Intune's current supported-platform list for Linux is:
- **Ubuntu Desktop 24.04 and 26.04 LTS** with a GNOME graphical desktop environment
- **Ubuntu LTS, version 24.04 and 26.04**
- **RedHat Enterprise Linux 9**
- **RedHat Enterprise Linux 10**

**Ubuntu 22.04 is no longer listed. Ubuntu 26.04 is new.** `SOURCED / FIRST-PARTY`

**INTRA-MICROSOFT CONFLICT — ADDED 2026-08-19. The two pages this section cites do not agree, and the original draft suppressed it while using the platform list to justify a 25-file repair.**

The **same two sources** give different Linux support matrices:

| Page | `ms.date` / `updated_at` | Linux versions stated |
|------|--------------------------|------------------------|
| `fundamentals/ref-supported-platforms` | 2025-10-14 / 2026-07-01 | Ubuntu Desktop **24.04 and 26.04 LTS** (GNOME); Ubuntu LTS **24.04 and 26.04**; **RedHat Enterprise Linux 9**; **RedHat Enterprise Linux 10** |
| `device-configuration/templates/configure-custom-settings-linux` | 2025-01-09 / 2026-07-01 | Prerequisites, verbatim: *"**Linux Ubuntu Desktop**, **RedHat Enterprise Linux 8**, or **RedHat Enterprise Linux 9**"* — then links to `ref-supported-platforms` "for a list of the supported versions" |

So the page that documents the **only delivery mechanism Pillar D has** (Linux platform scripts) still names **RHEL 8**, which the platform reference dropped, and does **not** name RHEL 10 or any Ubuntu version at all. Both pages were touched on the same `updated_at` (2026-07-01), so this is not a simple staleness gradient.

**This is exactly the class of conflict this file records for the DFCI OEM lists (A-3), and it must be recorded here too.** Guidance for the roadmap:

- Treat **`ref-supported-platforms` as authoritative** for versions — it is the page `configure-custom-settings-linux` itself defers to.
- **Do not** write "RHEL 8 is supported" on the strength of the custom-settings prerequisites block, and **do not** silently drop the discrepancy: an admin running RHEL 8 today will find one Microsoft page that appears to bless it.
- The Ubuntu 22.04 sweep (owner-ruled IN SCOPE: **25 markdown files + 1 SVG**, `docs/diagrams/decision-tree-09-linux-triage.svg`) should carry the same caveat wherever it states a supported-version list.

`SOURCED / FIRST-PARTY` both sides; both re-fetched 2026-08-19.

MEASURED (`grep -ril "Ubuntu 22.04" docs --include=*.md --exclude-dir=graphify-out`): **25 files / 64 hits**. `Ubuntu 24.04`: 8 files / 15 hits. `Ubuntu 26.04`: **0**.

This is a **25-file corpus-wide accuracy problem** that the v1.21 scoping did not identify, and it is materially larger than the 5-file `patch-management/` freshness scope. The roadmap must decide whether Pillar D absorbs it or whether it becomes its own repair wave. `PREMISE` on the sequencing; the count is MEASURED.

**What Intune can do for Linux updates: nothing natively.**

| Capability | Status |
|------------|--------|
| Native Intune Linux update policy | **None exists.** No update-policy surface for Linux appears anywhere in the Intune update documentation set I fetched, and the Linux configuration article offers only custom Bash. `SOURCED (absence) / FIRST-PARTY` |
| Delivery mechanism | **Devices > Manage devices > Scripts and remediations > Platform scripts** tab > **Add** > **Linux**. Upload an existing Bash script; **only `.sh` files**. Script text is editable in the portal after upload. Microsoft's samples: `https://github.com/microsoft/shell-intune-samples/tree/master/Linux` |
| **Execution context** | **User** (default) — runs when a user signs in; **does not run** if no user signs in or there's no user affinity. **Root** — always runs at device level, with or without a logged-in user. First Root execution **may require end-user consent**; it continues on schedule after consent. |
| **Execution frequency** | Default **Every 15 minutes** |
| **Execution retries** | Default **No retries** |
| Maximum script size | **Not stated on the page.** `UNVERIFIED` |
| Timeout | **Not stated on the page.** `UNVERIFIED` |
| Max scripts per device | **Not stated on the page.** `UNVERIFIED` |
| Warning | Learn states custom configuration profiles **shouldn't be used for sensitive information**, naming WiFi connections and authenticating apps/sites |

**Root is mandatory for any update-management use case.** `PREMISE` — Learn does not say this, but package installation requires privilege and the User context is documented not to run without a signed-in user. Frame it as a recommendation, not a vendor statement.

**`unattended-upgrades` configuration surface** — `SOURCED / FIRST-PARTY`, `https://ubuntu.com/server/docs/how-to/software/automatic-updates/` (no explicit last-updated date on the page):

| Item | Value |
|------|-------|
| Enablement file | `/etc/apt/apt.conf.d/20auto-upgrades` |
| Behaviour file | `/etc/apt/apt.conf.d/50unattended-upgrades` |
| Logs | `/var/log/unattended-upgrades` |
| Enable keys | `APT::Periodic::Update-Package-Lists "1";` and `APT::Periodic::Unattended-Upgrade "1";` (`"0"` disables) |
| Repository scoping | `Unattended-Upgrade::Allowed-Origins`. **CORRECTED 2026-08-19 — the default is FOUR enabled origins, not just `-security`.** Verbatim default block: `"${distro_id}:${distro_codename}";` (**base release**), `"${distro_id}:${distro_codename}-security";`, `"${distro_id}ESMApps:${distro_codename}-apps-security";` and `"${distro_id}ESM:${distro_codename}-infra-security";` — with `-updates`, `-proposed` and `-backports` present but **commented out**. Saying "default is security only" understates what an untouched `unattended-upgrades` will install, which is the whole point of the row. |
| Reboot | `Unattended-Upgrade::Automatic-Reboot "false";` and `Unattended-Upgrade::Automatic-Reboot-Time "now";` |
| Reboot-required detection | `/var/run/reboot-required` |

**Ubuntu Pro / Livepatch** — `THIRD-PARTY`, aggregated from search, **not fetched from Canonical directly**. Livepatch patches the running kernel in memory without a reboot; delivered via an Ubuntu Pro subscription attached with `sudo pro attach <token>`; Pro is free for personal use up to 5 machines and paid at enterprise scale; ESM provides 10 years of vulnerability fixes. **Treat every number here as requiring re-verification against `ubuntu.com/pro` before it ships.** The relevant honest framing for the corpus: Livepatch and ESM are **Canonical-side subscription entitlements**, entirely outside Intune's control plane — Intune can only verify their state via a custom compliance script.

**The honest statement the milestone asked for**, assembled from the above: *Intune has no native Linux update policy. Everything is a Bash script delivered as a platform script, executed at a 15-minute default cadence in User or Root context, with no built-in reporting of update state beyond the script's own exit code. Enforcement is `unattended-upgrades` on the device; Intune's only levers are delivery of the config and custom-compliance detection of the result.* `SOURCED` for each component; `PREMISE` for the synthesis.

---

## Supporting Libraries — the tooling surface (real code)

| Component | Purpose | Notes |
|-----------|---------|-------|
| Node `.mjs` validators under `scripts/validation/` | Corpus contract enforcement | Pillar G appends `MILESTONE_CLOSE_SHAS.V120` + `readAtV120Close` + `lsTreeAtV120Close` to `_lib/frozen-at-close.mjs`; Pillar H converts the C17 `existsSync` guard in all five C17-bearing harnesses simultaneously. Out of scope for this research. |
| `build-filename-map.mjs` | Registry / filename map | **CORRECTED 2026-08-19.** The original draft asserted "Recipe #5 = registry row **226**" unlabelled and as settled fact. MEASURED (command: `grep -n "225" scripts/pipeline/build-filename-map.mjs`): the generator's `--self-test` currently pins **225** rows (`rows.length === 225`, bumped 221→223 at v1.18 close, 223→225 in Phase 137). v1.21 adds **at least two** enrolled artefacts — recipe #5 *and* `docs/reference/firmware-oem-matrix.md` — so the floor is **227**, not 226. Per the owner ruling the new `docs/operations/**` docs also get registry rows (no `doc_id`), making the real target **227 + N(ops docs registered)**. **Compute N from the registry at bump time; never hardcode it from a document count.** Both drift canaries must be bumped. |
| `build-publish-bundle.mjs` | docx bundle | Has its **own** Approved-row canary distinct from the filename-map canary |
| pandoc + PowerShell docx pipeline | Publication | Unchanged by this milestone's content |

No new dependency is warranted for any pillar. `PREMISE`.

---

## Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| `gsd-tools.cjs query research-plan` | Provider selection + digest cache | MEASURED: seam returned `context7` for all 7 questions; **no Context7/MCP provider is available in this session**, so all fetches fell back to `webfetch`/`websearch` per the provider-fallback table. Seven digests were cached via `research-store put`. |
| `gsd-tools.cjs query classify-confidence` | Confidence tiering | MEASURED: `webfetch` → LOW, `websearch` → LOW, `context7`/`ref`/`jina`/`firecrawl` → MEDIUM. No provider available in this session yields HIGH. |

---

## Installation

Not applicable — this is a documentation milestone. The "install" surface is Intune tenant configuration plus OEM agent apps:

```text
# Intune-native, no install:
Devices > Manage devices > Configuration > Templates > Device Firmware Configuration Interface
Devices > Manage devices > Configuration > Templates > BIOS configuration and other settings
Devices > Manage updates > Windows updates > Driver updates
Devices > Manage updates > Windows updates > Quality updates
Devices > Manage devices > Scripts and remediations > Platform scripts > Linux

# Requires an OEM Win32 agent deployed FIRST (required assignment, before policy):
Dell "Dell Command" agent [SOURCED]  -> .cctk file, 2 MB limit [SOURCED]
  (product name "Dell Command | Endpoint Configure for Microsoft Intune (DCECMI)"
   is THIRD-PARTY -- see A-8; Learn calls it only "Dell Command")
HP BIOS Configuration Utility (BCU) / HP Client Management Script Library  [THIRD-PARTY]
Lenovo Think BIOS Config Tool V2 (Lenovo.BIOS.Config PowerShell module)    [SOURCED, vendor blog]

# Requires an add-on subscription on top of Intune Plan 1 or Plan 2:
Intune Enterprise App Management (standalone SKU or Intune Suite)

# Requires a Windows license carrying the Autopatch entitlement:
driver update policies  -- entitlement is necessary AND (per the page) sufficient
Hotpatch                -- entitlement is NECESSARY BUT NOT SUFFICIENT (see below)
```

**Labelling correction (2026-08-19).** The Dell agent name **DCECMI** and the `.cctk` extension are `SOURCED / FIRST-PARTY` only in part. `configure-bios-windows` names the tool as **"Dell Command"** (linking `dell.com/support/kbdoc/000214308/dell-command-endpoint-configure-for-microsoft-intune`) and names the file as the **"Dell Client Configuration Tool Kit file (`.cctk`)"** with the **2 MB** limit — those are first-party. The expansion **"Dell Command | Endpoint Configure for Microsoft Intune (DCECMI)"** and the acronym **DCECMI** are `THIRD-PARTY`, as A-8's own evidence column already says. The original draft restated them unlabelled as fact here and again in *Stack Patterns by Variant*. Keep the label attached wherever the acronym appears.

**Autopatch entitlement is NECESSARY, not SUFFICIENT, for Hotpatch — ADDED 2026-08-19.** The two licence lists are not the same list:

| | Driver update policies (`manage-driver-updates`) | Hotpatch (`windows-autopatch-hotpatch-updates`) |
|---|---|---|
| Requirement | **Intune Plan 1** *and* a Windows licence carrying the **Autopatch entitlement** | *"One of the eligible licenses"* — an explicit five-item list |
| Includes Windows 10/11 Enterprise **E3/E5 VDA** | **Yes** (via the Autopatch licence list) | **No** — absent from the hotpatch list |
| Includes **Windows 365 Enterprise** | Not named | **Yes** |
| OS floor | Windows Pro / Pro Education / Enterprise / Education; **LTSC not supported** | **Windows 11, version 24H2 or later** only |
| Further gates | — | VBS on; latest baseline release; Arm64 must disable CHPE |

A tenant can hold an Autopatch-entitled licence (e.g. **Windows 10/11 Enterprise E3 VDA**) and be entitled to driver update policies while **not** appearing on the hotpatch eligible-licence list at all. Do **not** write "if you have Autopatch you have Hotpatch". `SOURCED / FIRST-PARTY` (both pages, re-fetched 2026-08-19).

---

## Alternatives Considered

| Recommended | Alternative | When to use the alternative |
|-------------|-------------|-----------------------------|
| **DFCI profile** | **BIOS configuration and other settings** | **Dell fleets only.** **CORRECTED 2026-08-19** — the original row also routed "any fleet where the device was not OEM/CSP-registered for Autopilot" here. That routing is broken: **BIOS configuration and other settings supports Dell only** (*"This feature applies to: Windows, Dell devices"*; **Hardware** setting = *"Currently, only Dell is supported"*; comparison table = *"Dell / Possibly more in the future"*). An HP or Lenovo fleet without OEM/CSP Autopilot registration would be routed to a policy that cannot serve it. For those fleets the answer is the per-OEM tooling in A-8 (BCU/CMSL, `Lenovo.BIOS.Config`), **not** this template. BIOS-config does handle arbitrary OEM settings where DFCI handles a fixed set — but only on Dell. |
| **BIOS configuration and other settings** (Dell) | Raw Dell Command \| Configure via Win32 app / script | Settings outside the template's supported flow, or fleets that already have a BIOS password Intune doesn't hold (the template hard-requires no pre-existing password). |
| **DFCI** for Surface | SEMM | `UNVERIFIED` — do not write this row until SEMM's current status is confirmed. |
| **Automatic** driver approval mode | **Manual** | Fleets with recent driver or hardware regressions from Windows Updates. Note the mode-switch wipes all prior approvals. |
| **Monthly Enterprise Channel** | Current Channel | IT/dev pilot groups. |
| **Monthly Enterprise Channel** | Semi-Annual Enterprise Channel | Only non-interactive devices and specialized/business-critical workloads. **Do not write "only until July 2026" as a countdown** — that month has passed (today is 2026-08-19) and the source page still describes the change in the future tense while its own comparison table still shows the pre-change values. State the announcement with its date, note the page was not updated, and treat the current SAEC cadence as `UNVERIFIED`. See C-3. |
| **Autopatch** (service-managed) | Standalone Windows Update client policies | Tenants without an Autopatch-entitled license, LTSC feature-update needs, or ConfigMgr-only management. |
| **Auto-update** for catalog apps | **Guided update supersedence** | Any fleet that needs phased rollout or pre-review — auto-update has no rings and no rollback. |

---

## What NOT to Use / What NOT to Document

| Avoid | Why | Do instead |
|-------|-----|------------|
| The phrase "Windows Update for Business" as the product name | Renamed to **Windows Update client policies** | Use the new name; keep `WUfB` only in **Windows Update for Business reports**, which retained it |
| "Test, First, Fast, Broad" Autopatch rings | Superseded by Autopatch groups; defaults are **Test** and **Last** | Document Test/Last + up to 15 custom rings, 300 groups |
| PITFALL-9 mutual exclusion | Contradicted by the current Autopatch groups model | Document that Autopatch **creates and assigns** Update ring policies; the real pitfall is *admin-owned* update-ring policies overlapping Autopatch-owned ones |
| "Driver/firmware is **not gated by** WUfB deployment rings or Autopatch rings" | Wrong — approval mode and the 0–30 day deferral are configured **per deployment ring**, and there is an Autopatch-entitlement licensing dependency | Document it as an Autopatch groups software-update workload with per-ring approval modes. **Do NOT delete the "independent policy surface" clause** — Learn says verbatim *"Driver update policies can be used independently **or** as part of Windows Autopatch"*, so that half is TRUE. Split the corpus sentence; don't strike it. (This row previously read "wrong on both counts" — over-corrected, retracted 2026-08-19.) |
| Hotpatch "default-on May 2026 / April 2026 opt-out toggle" | Unsupported by the current article | Document the opt-in quality-update-policy setting |
| DFCI OEM list as "most business OEMs" or similar, **and equally "the six"** | Contested three ways: **nine** per `autopilot/dfci-management` (the OEM-list page), **six** per `configure-bios-windows`'s comparison table, **one** per Project Mu | Give the **nine** from `autopilot/dfci-management` (`ms.date` 2025-03-25, `updated_at` 2026-04-14), keep its closing *"Other OEMs are pending."*, cite that page, and caveat the two narrower lists. (This row previously said "give the six" — corrected 2026-08-19, see A-3.) |
| Old Learn URLs (`/intune/intune-service/...`) written as live links | **MEASURED (HTTP probe, `curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}"`, run 2026-08-19): FOUR 404, TWO live 301 redirects.** The original draft's "all return HTTP 404" was reproducibly false, and it was labelled `MEASURED` in violation of this file's own definition of MEASURED as a repo command. The **conclusion** — the canonical paths moved, write the new ones — survives; the evidence class does not. Detail below the table. | Use `/intune/device-configuration/templates/...`, `/intune/device-updates/windows/...`, `/intune/app-management/deployment/...` |
| Framing Enterprise App Management as WinGet-based | Microsoft's FAQ says **No**; installs are via the Intune Management Extension | Document IME-based install and say plainly that WinGet is not the mechanism |
| Ubuntu 22.04 as a supported Intune platform | Removed from the supported list | Ubuntu 24.04 and 26.04 LTS, RHEL 9 and 10 |
| HP Sure Admin key-provisioning mechanics | I could not fetch HP's first-party page (403) | Either verify at plan time or scope the HP guide to BCU/CMSL delivery and reference HP's docs for Sure Admin |
| Vendor cloud consoles (Dell TechDirect, Lenovo Device Manager) | Vendor-infrastructure-dependent, outside the corpus's Intune-client-side scope | Name them once as out-of-scope alternatives and link out. **`HP Connect for Microsoft Endpoint Manager` was struck from this row 2026-08-19 — owner-ruled IN SCOPE.** It is a connector with Entra-integrated certificate auth, not just a console, and it has **zero research coverage here**. Research it before writing it. |
| Rewriting OEM BIOS token/setting reference tables | The milestone's own link-not-copy guardrail | Document the Intune delivery object and link the vendor manual |

**Old-URL probe — full result, run 2026-08-19.** Command: `curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" <url>`. This is an HTTP probe against live URLs, **not** a repo command; see the amended `MEASURED` definition at the top of this file.

| Old path | Result | Redirects to |
|----------|--------|--------------|
| `/intune/intune-service/configuration/device-firmware-configuration-interface-windows` | **301** | `/intune/device-configuration/templates/configure-dfci-windows` |
| `/intune/intune-service/protect/windows-driver-updates-overview` | **301** | `/intune/device-updates/windows/manage-driver-updates` |
| `/intune/intune-service/configuration/ref-dfci-settings-windows` | **404** | — |
| `/intune/intune-service/configuration/configure-bios-windows` | **404** | — |
| `/intune/intune-service/apps/apps-add-enterprise-app-catalog` | **404** | — |
| `/intune/intune-service/apps/linux-shell-scripts` | **404** | — |

Practical consequence for the corpus: a link-checker that only tests for HTTP 200 will pass the two redirecting URLs and fail the four dead ones, so **"the corpus links are fine because nothing 404s" is not a safe conclusion**. Any link audit for v1.21 must flag 3xx as well as 4xx.

---

## Stack Patterns by Variant

**If the fleet is OEM/CSP-registered Autopilot on a DFCI-capable OEM (Acer, Asus, Dynabook, Fujitsu, Microsoft Surface, Panasonic, VAIO, Samsung, NEC — "Other OEMs are pending", see A-3):**
- Use the **DFCI** profile. Certificate-based, per-setting reporting, survives reimage, auto-enrols during Autopilot.
- Because it survives reimage, the **retire-then-wipe-then-delete-Autopilot-record order is mandatory**.

**If the fleet is Dell** (this template supports **Dell only** — do not route non-Dell fleets here)**:**
- Use **BIOS configuration and other settings** with the **Dell Command** agent (`SOURCED`; the name "DCECMI" is `THIRD-PARTY`) as a required Win32 app, assigned before the policy.
- **Minimum role to author the policy: `Policy and Profile manager`.**
- Devices must not already carry a BIOS password.
- Back up the Graph-retrievable per-device passwords outside Intune — subscription lapse makes them unrecoverable.

**If the fleet is HP or Lenovo:**
- No native Intune template. Deliver BCU/CMSL or `Lenovo.BIOS.Config` as a Win32 app or platform script.
- Lenovo ThinkPad 2022+/ThinkCentre 2020+/ThinkStation 2020+ can use certificate signing with Azure Key Vault instead of a supervisor password.

**If the tenant has an Autopatch-entitled license (Business Premium / A3+ / E3+ / F3):**
- Autopatch groups own the ring topology, and driver, M365 Apps, Edge and quality/feature workloads all flow through them.
- Hotpatch becomes available (Windows 11 24H2+, VBS on, Arm64 CHPE off).

**If the tenant does NOT have that entitlement:**
- **Driver update policies and Hotpatch are unavailable.** Fall back to standalone Windows Update client policies (update rings), and to OEM update clients (Dell Command | Update etc.) delivered as apps for drivers/firmware.

**If the fleet includes Linux:**
- There is no update policy. Root-context Bash platform scripts writing `unattended-upgrades` config, plus custom compliance scripts reading `/var/run/reboot-required`, is the whole of it.

---

## Version Compatibility

| Surface | Floor | Notes |
|---------|-------|-------|
| DFCI (Surface) | Windows 11, or Windows 10 version 1809 or later | Plus Autopilot registration by OEM/CSP and commercial SKU |
| Driver update policies | Windows Pro / Pro Education / Enterprise / Education | **LTSC not supported**; Entra joined or hybrid joined; telemetry ≥ Required |
| Hotpatch | **Windows 11, version 24H2 or later** | VBS required; Arm64 must disable CHPE; must be on the latest baseline |
| Autopatch registration | Windows 10/11 Pro, Education, Enterprise, Pro Education, Pro for Workstations, IoT Enterprise; GA Channel | LTSC = quality updates workload only |
| Enterprise App Catalog | Windows 10 and 11 | Windows 10 is **allowed**, not supported (EOS 2025-10-14) |
| Apple DDM software update | **iOS/iPadOS 17.0 and later**, **macOS 14.0 and later** | Device Enrollment and Automated Device Enrollment both supported |
| Apple legacy MDM update policies | iOS 10.3–18, iPadOS 13.0–18, **supervised only** | Deprecated; see below |
| Intune Apple platform support | **Supported:** iOS/iPadOS **17.x and later**, macOS **14.x and later** — published under **both** "Devices with user affinity" and "Devices without user affinity". **Allowed to enroll:** iOS/iPadOS **15.x and later**, macOS **12.x and later**. | **CORRECTED 2026-08-19 — do not flatten this.** The **"Allowed to enroll" tier is published ONLY under "Devices without user affinity"** (devices enrolled without user affinity via ADE or Apple Configurator). The "Devices with user affinity" block lists **Supported only** and carries no allowed tier. A user-affinity fleet on iOS 16 therefore has no documented allowed-tier fallback on this page. `SOURCED / FIRST-PARTY` (`ref-supported-platforms`, `ms.date` 2025-10-14, `updated_at` 2026-07-01) |
| Intune Linux | Ubuntu Desktop 24.04 / 26.04 LTS (GNOME), RHEL 9, RHEL 10 | **22.04 removed** |
| Play Integrity MEETS_STRONG_INTEGRITY | Android 13+ behaviour differs from Android 12 and lower | See below |

---

## Pillar E — Freshness re-verification of the five named claims

### E-1. "Hotpatch defaults on for Windows 11 Enterprise 24H2+ from May 2026" + VBS prerequisite

**VERDICT: default-on claim UNSUPPORTED. VBS prerequisite CONFIRMED.**

- Default-on / May 2026 / April 2026 opt-out toggle: **not present** on the current article (`ms.date: 2026-05-28`, fetched 2026-08-18). The documented model is opt-in via **When available, apply without restarting the device ("Hotpatch")** = **Allow** on a **Windows quality update policy**. `SOURCED / FIRST-PARTY`
- VBS: **CONFIRMED and stricter than the corpus states** — VBS is required for the hotpatch installer to function, enabled via CSP `VirtualizationBasedTechnology`, with a dedicated Autopatch alert `Hotpatch – VBS not running`. `SOURCED / FIRST-PARTY`
- **New, uncaptured prerequisite:** Arm64 devices must disable CHPE (`DisableCHPE` CSP or `HotPatchRestrictions=1`). `SOURCED / FIRST-PARTY`
- **Edition framing — RESTATED 2026-08-19, the original was over-corrected.** The prerequisite is expressed as a **licence list** (Win 11 Ent E3/E5, **Microsoft 365 F3**, Win 11 Edu A3/A5, M365 Business Premium, Windows 365 Enterprise) rather than an edition list. But the original draft went further and told the corpus to **delete its Windows 11 Pro exclusion**, on the premise that Business Premium and Windows 365 Enterprise are "neither of which is Enterprise edition". **That premise is wrong for Windows 365 Enterprise, which provisions Cloud PCs running Windows 11 Enterprise**, and the page itself carries an H2 titled verbatim **"Hotpatch on Windows 11 Enterprise or Windows Server 2025"**. The page states neither that Pro is supported nor that it is excluded. **Do not instruct a Pro-exclusion deletion.** Record the licence list, record the Enterprise framing, and route "is Windows 11 Pro offered hotpatch?" to a plan-time verification task. `UNVERIFIED`
- **Licence-list string check:** the page says **`Microsoft 365 F3`**, not "Windows 11 Enterprise F3". PITFALLS.md quotes the latter and must be corrected. `SOURCED / FIRST-PARTY`
- **Entitlement is necessary but not sufficient:** holding an Autopatch-entitled licence does not imply hotpatch eligibility — the two licence lists differ (Autopatch includes Windows 10/11 Enterprise E3/E5 **VDA**; the hotpatch list does not, and adds **Windows 365 Enterprise**). See the *Installation* section for the side-by-side. `SOURCED / FIRST-PARTY`

### E-2. "Apple OS 26 removes the legacy MDM software-update commands"

**VERDICT: DIRECTIONALLY RIGHT, VERSION WRONG. It is 26 = deprecated, 27 = no longer functions.**

- Apple's own WWDC26 device management updates page (published **2026-06-08**, fetched 2026-08-18) states that **legacy software update management no longer functions in all 27.0 operating systems**, and lists what goes: **software update commands**, **software update queries**, **recommended cadence settings**, and **software update restrictions, like deferrals and Background Security Improvements**. It names iOS 27, iPadOS 27, macOS 27, tvOS 27, visionOS 27, watchOS 27. `SOURCED / FIRST-PARTY`
- **MIS-ATTRIBUTION CORRECTED 2026-08-19.** The original draft attributed the two configuration identifiers to the WWDC26 deployment page above. **That page does not contain either string** (re-fetched 2026-08-19 with a targeted string check). What it does say, verbatim, is the category-level replacement: *"IT teams should use **declarative software update management** to configure and enforce updates on devices with increased user transparency and more control."* Correct attribution for the identifiers:
  - **`com.apple.configuration.softwareupdate.enforcement.specific`** — appears verbatim on Apple's **Software Update Settings declarative configuration** page, `https://support.apple.com/guide/deployment/software-update-settings-declarative-dep0578d8b8a/web` (published **2024-09-25**), where it is referenced in the Background Security Improvements discussion. Its own configuration page is **Software Update declarative configuration**, `https://support.apple.com/guide/deployment/software-update-declarative-configuration-depca14ecd4d/web` (published **2024-09-25**), which documents the payload keys `TargetOSVersion`, `TargetBuildVersion`, `TargetLocalDateTime`, `DetailsURL` but does **not** print the identifier string itself. Intune's settings-catalog reference lists this configuration as **Software Update** and links both. `SOURCED / FIRST-PARTY`
  - **`com.apple.configuration.softwareupdate.settings`** — the *configuration* is first-party and documented (Apple's **Software Update Settings declarative configuration**, `dep0578d8b8a`, published 2024-09-25; Intune lists it as **Software Update Settings**). The **literal identifier string** was not found verbatim on any page fetched in this session; Apple's `apple/device-management` YAML repo (`declarative/declarations/configurations/softwareupdate.settings.yaml`) is the first-party home for it and was **not fetched**. Treat the exact string as `UNVERIFIED` until that YAML is read; the configuration's existence and name are `SOURCED / FIRST-PARTY`.
  - **Do not cite the WWDC26 deployment page for either identifier.**
- Intune's side: the iOS MDM-policy article (`ms.date: 2025-10-15`, `updated_at: 2026-06-22`) carries an Important banner stating Apple has deprecated MDM-based software update workloads and that **Intune will soon end support** for MDM-based Apple software update policies, recommending DDM. **No end-of-support date is given.** `SOURCED / FIRST-PARTY`
- Individual command names (`ScheduleOSUpdate`, `OSUpdateStatus`, `AvailableOSUpdates`, `com.apple.SoftwareUpdate`) appeared only in `THIRD-PARTY` search results. **Do not quote them as Apple's list** — Apple's own page uses category names, not command names.
- **Corpus fix:** replace "Apple OS 26 removes the legacy MDM software-update commands" with the two-stage truth: **deprecated with the 26 releases; non-functional in all 27.0 operating systems**. The `**[HARD-DEADLINE]**` cell in `00-overview.md` should point at OS 27, not OS 26.

### E-3. "iOS 17+ unsupervised DDM update-key retraction, effective August 2025"

**VERDICT: NOT CONFIRMED — and the current Intune documentation appears to contradict the supervision framing.**

- Intune's current Apple update-policy article (`ms.date: 2026-02-24`, `updated_at: 2026-05-21`) states the DDM software update configuration requires **iOS/iPadOS 17.0 and later** and **macOS 14.0 and later**, and lists supported enrollment methods as **Device Enrollment** and **Automated Device Enrollment** — with **no supervision requirement stated**. `SOURCED / FIRST-PARTY`
- The legacy MDM article confines itself to *supervised* devices and to iOS 10.3–18 / iPadOS 13.0–18. That is where supervision matters. `SOURCED / FIRST-PARTY`
- **No August 2025 retraction event appears in any page I fetched.** `UNVERIFIED`
- **The corpus's DDM key names are also wrong as Intune display strings.** Intune's settings-catalog names, verbatim:
  - **Declarative Device Management > Software Update Enforce Latest**: **Delay in Days**, **Install Time** (24-hour, leading zero required)
  - **Declarative Device Management > Software Update**: **Details URL**, **Target Build Version** (e.g. `25A354`, supplemental `25A354a`), **Target Date Time**, **Target OS Version** (e.g. `26.0`, supplemental `26.0.1`)
  - **`TargetLocalDateTime`** is the raw Apple key, not the Intune label. `SOURCED / FIRST-PARTY` — documented as a payload key of the **Software Update declarative configuration** at `https://support.apple.com/guide/deployment/software-update-declarative-configuration-depca14ecd4d/web` (published 2024-09-25), alongside `TargetOSVersion`, `TargetBuildVersion` and `DetailsURL`. (The original draft asserted this unlabelled and unsourced.)
  - **`OfferPrograms` — RETRACTED 2026-08-19. The original finding was measured over the wrong scope and its conclusion is wrong.**
    - The draft's negative ("does not appear anywhere in Intune's documented settings surface") was reached without ever fetching the Intune settings surface. The relevant page is `https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/ref-apple-settings` (`ms.date: 2024-11-13`, `updated_at: 2026-07-01`), fetched 2026-08-19. It documents two DDM configurations — **Software Update** and **Software Update Settings** — and **delegates every key definition to Apple** (Apple Platform Guides / Apple Developer / Apple YAML columns). It enumerates **no keys at all**, so "does not appear on the Intune surface" is true of `TargetLocalDateTime` and every other key equally, and proves nothing.
    - **`OfferPrograms` is a real, documented, first-party Apple key.** It sits in the **`Beta`** dictionary of the **Software Update Settings** declarative configuration (`support.apple.com/guide/deployment/software-update-settings-declarative-dep0578d8b8a/web`, published 2024-09-25), alongside `ProgramEnrollment` and `RequireProgram`, described as an array of beta programs presented to the user to choose from. `SOURCED / FIRST-PARTY`
    - **What is actually wrong** is the corpus's *framing*, if it presents `OfferPrograms` as an update-**enforcement** key: it is a **beta-program enrolment** key. MEASURED: `OfferPrograms` appears **3 files / 5 hits** in the corpus. **Re-read those five hits for the enforcement-vs-beta distinction; do NOT delete them as fabricated.**
- **Recommendation:** treat E-3 as a **retraction candidate**. Either produce a first-party citation for the August 2025 event at plan time, or delete the claim and rewrite the iOS section around the Intune settings-catalog names above. Do not carry it forward on the strength of the existing corpus text.

**Bonus documented behaviours worth capturing** (all `SOURCED / FIRST-PARTY`): with **Target Date Time**, if the user hasn't updated by the deadline a **one-minute countdown** appears, then a forced install and restart; if the device is powered off at the deadline, there is a **one hour grace period** after power-on. When an update enforcement is assigned, the device **ignores software update settings including automatic update actions**. A policy reporting *Success* only means the configuration installed — monitor OS version separately, and expect an error once devices pass the configured version (the device reads it as a downgrade attempt).

### E-4. "Android: Play Integrity MEETS_STRONG_INTEGRITY, October 31 2026 fleet compliance deadline"

**VERDICT: verdict label CONFIRMED. The October 31 2026 deadline is UNVERIFIED and I could not find it anywhere.**

- `MEETS_STRONG_INTEGRITY` is a current, correctly-named `deviceIntegrity` verdict. `SOURCED / FIRST-PARTY` — `https://developer.android.com/google/play/integrity/verdicts`, page last-updated **2026-05-01**, fetched 2026-08-18.
- **No October 31 2026 deadline** appears on that page, and three separate targeted searches (including a literal-string search for `"October 31, 2026"` alongside Play Integrity) returned nothing. `UNVERIFIED`
- The nearest real dated events found: Google required hardware-backed security signals for stronger integrity checks in **May 2025**; the Play Integrity library v1.5.0 (**August 2025**) added `GET_INTEGRITY` / `GET_STRONG_INTEGRITY` remediation dialogs. Both `THIRD-PARTY`.
- **Recommendation:** this is currently a `**[HARD-DEADLINE]**` cell in `00-overview.md`. **Do not carry a hard-deadline callout on an unverifiable date.** Either produce a first-party Google citation at plan time or demote it to a non-dated statement about strong-integrity requirements.

### E-5. "Android 13+ requires patch age of 12 months or less"

**VERDICT: TRUE, but the corpus states it too broadly.**

Verbatim from `https://developer.android.com/google/play/integrity/verdicts` (last updated 2026-05-01, fetched 2026-08-18):

> On Android 13 and higher, the `MEETS_STRONG_INTEGRITY` verdict requires `MEETS_DEVICE_INTEGRITY` and security updates in the last year for all partitions of the device, including an Android OS partition patch and a vendor partition patch.

> On Android 12 and lower, the `MEETS_STRONG_INTEGRITY` verdict only requires hardware-backed proof of boot integrity and **does not** require the device to have a recent security update.

Three corrections the corpus needs:
1. The 12-month requirement is a **condition of `MEETS_STRONG_INTEGRITY`**, not a general Android 13+ platform requirement. A device can be perfectly compliant at `MEETS_DEVICE_INTEGRITY` with an older patch.
2. It requires **all partitions** — both an **Android OS partition patch** and a **vendor partition patch**. A vendor lagging on the vendor partition fails the device even when the OS partition is current. This is the operationally load-bearing detail and the corpus omits it entirely.
3. The Android 12-and-lower carve-out is worth stating, because mixed fleets will show inconsistent verdicts for identical patch ages.

Full verdict set, verbatim labels: `MEETS_DEVICE_INTEGRITY`, `MEETS_BASIC_INTEGRITY`, `MEETS_STRONG_INTEGRITY`, `MEETS_VIRTUAL_INTEGRITY`. `SOURCED / FIRST-PARTY`

---

## Route, do not expand (explicit scoping calls for the roadmap)

**Retitled 2026-08-19.** The previous title, "Not worth documenting", reads as a deletion instruction. Every row below **routes** a topic to a smaller treatment (a migration table row, a one-line mention, a link-out); none of them bars the topic from the corpus. A validator that requires, say, a `forceDelayedSoftwareUpdates` row in a migration table is asking for exactly what row 1 prescribes.

| Item | Reason | Route it to |
|------|--------|-------------|
| Legacy Apple MDM software update commands, `com.apple.SoftwareUpdate` payload, `forceDelayedSoftwareUpdates`, iOS device-restrictions "Defer software updates" | Non-functional in all Apple 27.0 OSes; Intune is ending support. **Evidence note (2026-08-19):** Apple's WWDC26 page names the *categories* that stop working (software update commands, queries, recommended cadence settings, and restrictions "like deferrals and Background Security Improvements") — it does **not** print `com.apple.SoftwareUpdate` or `forceDelayedSoftwareUpdates`. Those two strings were **not** sourced in this session: `UNVERIFIED` as first-party Apple wording, `PREMISE` as the keys the corpus's own deprecated-surface text refers to. Source them from Apple's `device-management` YAML or the legacy restrictions payload page before they appear in a shipped table. | A **migration table row** naming the old key and its DDM replacement. Do not expand the mechanism. |
| iOS MDM update policy schedule types (`Update at next check-in` / `Update during scheduled time` / `Update outside of scheduled time`) | Same — deprecated surface. | A single mention in the same migration table. |
| `OfferPrograms` as a DDM **update-enforcement** key | **CORRECTED 2026-08-19 — no longer a retraction candidate.** `OfferPrograms` is a real first-party Apple key, but it belongs to the **`Beta`** dictionary of `Software Update Settings` (beta-program enrolment), **not** to update enforcement. See E-3. | Keep the key; **fix its category**. Mention it once under beta-program handling, not under enforcement. |
| SAEC as a general-purpose channel | Microsoft scopes it to non-interactive and specialized workloads only, and announced unification toward MEC beginning July 2026 — a month that has now passed with the source page still future-tense (see C-3) | A channel-comparison row plus the announcement with its date and unresolved state. |
| Beta Channel for M365 Apps | Explicitly not supported | One line in the channel table. |
| Dell TechDirect / Lenovo Device Manager | Vendor cloud infrastructure, outside the corpus's Intune-client-side scope | Name once, link out. |
| **HP Connect for Microsoft Endpoint Manager** | **NO LONGER OUT OF SCOPE — owner-ruled IN SCOPE for v1.21 (2026-08-19).** It changes HP's delivery shape from a Win32-packaged script to a vendor connector with Entra-integrated certificate auth, which is an *Intune-object* question, not a vendor-console question. This research did **not** cover it (`connect.admin.hp.com` was never fetched). | **Needs its own research pass before it becomes a requirement.** `UNVERIFIED` |
| Windows Server 2025 hotpatch / Azure Update Manager / Azure Arc | Server-side; the corpus is client-fleet scoped | Name once. Note the hotpatch page's own H2 *"Hotpatch on Windows 11 Enterprise or Windows Server 2025"* is where a reader will meet the server material. |
| Per-OEM BIOS token reference tables | link-not-copy guardrail | Link the vendor manual. |

---

## Open questions the roadmap must resolve

1. **SEMM's current status** — required before any "SEMM vs DFCI" routing content can ship. `UNVERIFIED`
2. **HP Sure Admin authentication mechanics** — HP's first-party page 403'd. `UNVERIFIED`
3. **Intune-side M365 Apps update policy** — the settings-catalog/Cloud Policy path and exact setting names for channel and deadline were not fetched. `UNVERIFIED`
4. **Intune Linux platform-script hard limits** — max script size, timeout, per-device script count are not on the article. `UNVERIFIED`
5. **The October 31 2026 Android deadline** — produce a citation or retract the hard-deadline callout. `UNVERIFIED`
6. **The August 2025 iOS unsupervised DDM retraction** — produce a citation or retract. `UNVERIFIED`
7. **WinGet-based patching — OWNER-RULED IN SCOPE (2026-08-19), with ZERO research coverage.** It is a **separate surface** from Enterprise App Management (Microsoft's own FAQ: *"Does Enterprise App Management use Winget? **No.**"*) — WinGet CLI / Microsoft Store app type / `DesktopAppInstaller`. **Nothing in this file supports a WinGet requirement.** It needs its own research pass before it becomes one; do not let it ride into REQUIREMENTS.md on the strength of the Enterprise App Management section. `UNVERIFIED`
8. **The 25-file Ubuntu 22.04 problem — OWNER-RULED IN SCOPE (2026-08-19): 25 markdown files + 1 SVG** (`docs/diagrams/decision-tree-09-linux-triage.svg`, which needs a regeneration task). MEASURED at 25 files / 64 hits for the markdown. The sequencing question (Pillar D absorbs it vs its own wave) remains open.
9. **Ubuntu Pro / Livepatch specifics** — only `THIRD-PARTY` evidence obtained; re-verify against Canonical before shipping numbers.
10. **Is Windows 11 Pro offered Hotpatch?** The page states a licence list, never an edition verdict, and carries an H2 titled *"Hotpatch on Windows 11 Enterprise or Windows Server 2025"*. Do not act on the retracted "delete the Pro constraint" instruction until this is answered. `UNVERIFIED` (raised by the 2026-08-19 corrections; see C-2 / E-1)
11. **The `com.apple.configuration.softwareupdate.settings` identifier string** — the configuration is documented first-party; the literal identifier was not found verbatim on any page fetched. Read `apple/device-management` `declarative/declarations/configurations/softwareupdate.settings.yaml` to confirm. `UNVERIFIED` (raised 2026-08-19; see E-2)
12. **`com.apple.SoftwareUpdate` and `forceDelayedSoftwareUpdates` as Apple's own strings** — used in the routing table but never sourced. Source or drop before either appears in a shipped migration table. `UNVERIFIED` (raised 2026-08-19)
13. **RHEL 8 on Linux platform scripts** — `configure-custom-settings-linux`'s Prerequisites still name RHEL 8 while `ref-supported-platforms` lists only RHEL 9/10. Decide which the corpus states and how it presents the conflict. (raised 2026-08-19; see Pillar D)
14. **HP Connect for Microsoft Endpoint Manager** — owner-ruled IN SCOPE, zero coverage here. `connect.admin.hp.com` was never fetched. `UNVERIFIED` (raised 2026-08-19)
15. **Post-July-2026 SAEC cadence** — the source page announces the change in the future tense and its own comparison table still shows the pre-change values. Establish the live state. `UNVERIFIED` (raised 2026-08-19; see C-3)

---

## Sources

All fetched 2026-08-18 unless marked **[2026-08-19]**, which denotes a page fetched (or re-fetched) during the adversarial-review correction pass. Page dates are the pages' own `ms.date` / `updated_at` / published date where exposed.

**Microsoft Learn — first party**

- **[2026-08-19]** `https://learn.microsoft.com/en-us/autopilot/dfci-management` — `ms.date` 2025-03-25, `updated_at` 2026-04-14 — **the nine-OEM "OEMs that support DFCI" list** + "Other OEMs are pending."; the Project Mu see-also; the Windows 11 24H2 Professional-edition DFCI known issue. **Not fetched in the original pass — this is the page that carries the authoritative OEM roster.**
- **[2026-08-19]** `https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/ref-apple-settings` — `ms.date` 2024-11-13, `updated_at` 2026-07-01 — the actual Intune Apple settings-catalog surface: **Software Update** and **Software Update Settings** DDM configurations, all key definitions delegated to Apple. **Not fetched in the original pass** — its absence is what made the `OfferPrograms` finding unsound.
- `https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-dfci-windows` — `ms.date` 2026-06-23, `updated_at` 2026-07-01 — DFCI prerequisites, profile path, conflicts, reuse/retire/recover
- `https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-dfci-settings-windows` — `ms.date` 2026-06-23, `updated_at` 2026-07-01 — complete DFCI settings surface, UEFI CSP
- `https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows` — `ms.date` 2024-06-06, `updated_at` 2026-07-01 — BIOS configuration and other settings; DFCI-vs-BIOS-config comparison table; DFCI OEM list; Graph `hardwarePasswordDetails`
- `https://learn.microsoft.com/en-us/surface/surface-manage-dfci-guide` — `ms.date` 2026-07-14 — Surface eligible-model list, per-setting support, removing DFCI management
- `https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-driver-updates` — `ms.date` 2026-01-14, `updated_at` 2026-04-09 — driver update policy prerequisites, licensing, architecture
- `https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-manage-driver-and-firmware-updates` — `ms.date` 2025-03-31, `updated_at` 2025-06-04 — approval modes, deferrals, recommended vs other drivers, mode-switch data loss
- `https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-overview` — `ms.date` 2026-07-13, `updated_at` 2026-07-21 — April 2025 restructuring, feature entitlement, workloads, reporting
- `https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites` — `ms.date` 2026-02-26, `updated_at` 2026-05-14 — licences, infrastructure, co-management, editions, LTSC
- `https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview` — `ms.date` 2025-06-17, `updated_at` 2026-06-19 — Test/Last rings, 15-ring and 300-group limits, software update workloads
- `https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-hotpatch-updates` — `ms.date` 2026-05-28, `updated_at` 2026-06-02 — Hotpatch prerequisites, enablement, cadence, CHPE, troubleshooting
- `https://learn.microsoft.com/en-us/windows/deployment/update/waas-manage-updates-wufb` — `ms.date` 2024-05-16, `updated_at` 2025-10-02 — **Windows Update client policies** rename; deferral maxima (365/30); 35-day pause; Autopatch relationship
- `https://learn.microsoft.com/en-us/microsoft-365-apps/updates/overview-update-channels` — `ms.date` 2026-05-27, `updated_at` 2026-06-23 — channels, support durations, July 2026 SAEC unification
- `https://learn.microsoft.com/en-us/intune/app-management/deployment/enterprise-app-management` — `ms.date` 2026-06-03, `updated_at` 2026-06-24 — licensing, auto-update, limitations, WinGet negative, catalog app list
- `https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-custom-settings-linux` — `ms.date` 2025-01-09, `updated_at` 2026-07-01 — platform scripts path, execution context/frequency/retries
- `https://learn.microsoft.com/en-us/intune/fundamentals/ref-supported-platforms` — `ms.date` 2025-10-14, `updated_at` 2026-07-01 — Linux/Apple/Android/Windows platform floors
- `https://learn.microsoft.com/en-us/intune/device-updates/apple/` — `ms.date` 2026-02-24, `updated_at` 2026-05-21 — DDM settings-catalog names, version floors, enforcement behaviour
- `https://learn.microsoft.com/en-us/intune/device-updates/apple/deprecated-mdm-policies-ios` — `ms.date` 2025-10-15, `updated_at` 2026-06-22 — deprecation banner, supervised scope, legacy schedule types

**Apple — first party**

- `https://support.apple.com/guide/deployment/device-management-updates-depd638aa061/web` — published 2026-06-08 — legacy software update management non-functional in all 27.0 OSes (commands, queries, recommended cadence settings, restrictions incl. deferrals and Background Security Improvements); *"IT teams should use declarative software update management…"*. **[2026-08-19] Re-checked: this page does NOT contain `com.apple.configuration.softwareupdate.enforcement.specific` or `com.apple.configuration.softwareupdate.settings`.** The original draft's attribution of those two identifiers to this page was wrong and has been corrected in E-2.
- `https://support.apple.com/guide/deployment/software-updates-depc4c80847a/web` — published 2026-07-30 — DDM framing; contains no legacy-command detail
- **[2026-08-19]** `https://support.apple.com/guide/deployment/software-update-declarative-configuration-depca14ecd4d/web` — published 2024-09-25 — **Software Update declarative configuration**: payload keys `TargetOSVersion`, `TargetBuildVersion`, `TargetLocalDateTime`, `DetailsURL`
- **[2026-08-19]** `https://support.apple.com/guide/deployment/software-update-settings-declarative-dep0578d8b8a/web` — published 2024-09-25 — **Software Update Settings declarative configuration**: `AutomaticActions`, `RapidSecurityResponse`, `Deferrals`, `Notifications`, and the **`Beta` dictionary containing `ProgramEnrollment`, `OfferPrograms`, `RequireProgram`**; also carries a verbatim reference to `com.apple.configuration.softwareupdate.enforcement.specific`
- **NOT fetched, named for the plan-time task:** `https://github.com/apple/device-management/blob/release/declarative/declarations/configurations/softwareupdate.settings.yaml` — first-party home of the literal `com.apple.configuration.softwareupdate.settings` identifier. `UNVERIFIED`

**Google — first party**

- `https://developer.android.com/google/play/integrity/verdicts` — last updated 2026-05-01 — verdict labels and the verbatim `MEETS_STRONG_INTEGRITY` definition

**Canonical — first party**

- `https://ubuntu.com/server/docs/how-to/software/automatic-updates/` — no date exposed — `unattended-upgrades` paths and keys, `/var/run/reboot-required`

**Vendor engineering blog — first party**

- `https://blog.lenovocdrt.com/introducing-think-bios-config-tool-v2-and-lenovo-bios-certificate-tool-v2/` — published 2025-11-04 — `Lenovo.BIOS.Config`, Intune Graph upload, certificate signing, Azure Key Vault

**Project Mu — first party, undated**

- `https://microsoft.github.io/mu/dyn/mu_feature_dfci/DfciPkg/Docs/Scenarios/DfciScenarios/` — **no date on page** — named only Microsoft Surface as of this fetch. This is the **third** and narrowest of three disagreeing first-party OEM lists (nine on `autopilot/dfci-management`, six on `configure-bios-windows`, one here). Microsoft Learn links it as a see-also, **not** as an authoritative OEM roster — see A-3.

**Third-party (search aggregation — re-verify before shipping)**

- Dell Command | Endpoint Configure / `.cctk` workflow corroboration
- HP BCU / CMSL / Sure Admin roles (HP's own developer portal returned HTTP 403)
- Ubuntu Pro / Livepatch subscription and coverage figures
- Apple legacy command names (`ScheduleOSUpdate`, `OSUpdateStatus`) — **not** in Apple's own wording

**Failed fetches, recorded for honesty** — status codes **re-probed 2026-08-19** (`curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}"`). Two of the six old Learn paths are **live 301 redirects, not 404s**; the original draft's blanket "all return HTTP 404" was reproducibly false.

- `https://learn.microsoft.com/en-us/intune/intune-service/configuration/device-firmware-configuration-interface-windows` — **HTTP 301** → `/intune/device-configuration/templates/configure-dfci-windows` (**corrected: not a 404**)
- `https://learn.microsoft.com/en-us/intune/intune-service/protect/windows-driver-updates-overview` — **HTTP 301** → `/intune/device-updates/windows/manage-driver-updates` (**corrected: not a 404**)
- `https://learn.microsoft.com/en-us/intune/intune-service/configuration/ref-dfci-settings-windows` — HTTP 404 (URL moved)
- `https://learn.microsoft.com/en-us/intune/intune-service/configuration/configure-bios-windows` — HTTP 404 (URL moved)
- `https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-add-enterprise-app-catalog` — HTTP 404 (URL moved)
- `https://learn.microsoft.com/en-us/intune/intune-service/apps/linux-shell-scripts` — HTTP 404 (URL moved)
- `https://developers.hp.com/hp-client-management/blog/hp-sure-admin-step-step` — HTTP 403. **Note:** HP's other surfaces (`connect.admin.hp.com`, HP's Sure Admin guides) and Lenovo CDRT's `docs.lenovocdrt.com` were **never attempted**. A 403 on one HP page is not evidence that HP is unsourceable.
- `https://derflounder.wordpress.com/2026/06/08/...` — HTTP 403
- `https://developer.apple.com/documentation/devicemanagement/softwareupdateenforcementspecific` — **[2026-08-19]** fetched but returned only the page title (JavaScript-rendered documentation); no payload content retrievable. Use Apple's Support-guide pages or the `apple/device-management` YAML repo instead.

## Corrections Applied (2026-08-19, adversarial review)

Audit trail. Each row is one referee-ruled correction against this file. "Retracted" rows **remove an over-correction** — they make the file less wrong, not less specific.

| # | Location | What changed |
|---|----------|--------------|
| 1 | E-2, Sources | **Mis-attribution fixed.** The two `com.apple.configuration.softwareupdate.*` identifiers were attributed to the Apple WWDC26 deployment page, which does not contain them (re-checked 2026-08-19). Re-sourced `…enforcement.specific` to Apple's `dep0578d8b8a` (published 2024-09-25); downgraded the `…settings` literal string to `UNVERIFIED` and named the un-fetched Apple YAML as the place to confirm it. No source invented. |
| 7 | E-3, routing table | `TargetLocalDateTime` labelled and sourced (Apple `depca14ecd4d`, published 2024-09-25). `forceDelayedSoftwareUpdates` and `com.apple.SoftwareUpdate` labelled `UNVERIFIED` / `PREMISE` — they were asserted unlabelled with no source, and Apple's page names categories, not keys. Added as Open Question 12. |
| 38, 116 | A-3 (`:92`–`:96`), What-NOT-to-Use, Stack Patterns | **DFCI is nine OEMs, not six.** Fetched `learn.microsoft.com/en-us/autopilot/dfci-management` (`ms.date` 2025-03-25, `updated_at` 2026-04-14) — never fetched in the original pass. Added VAIO, Samsung, NEC and *"Other OEMs are pending."* Struck the "give the six" rule and the six-OEM hardcode in the routing decision. Struck the false claim that Learn points at Project Mu as the authoritative OEM list (its actual text is a see-also). Kept the three-list discrepancy as a documented caveat. |
| 40 | C-4 row (`:50`), What-NOT-to-Use | **Over-correction retracted.** C-4 graded the corpus "wrong on both counts"; Learn states verbatim *"Driver update policies can be used independently **or** as part of Windows Autopatch"* — quoted by this file itself in Pillar B. Only the "not gated by rings" half is wrong. The row now instructs a **sentence split**, not the deletion of a true statement. |
| 42 | C-3 row (`:49`) | Ring correction kept (Test + Last, cannot be removed/renamed, 15 rings/group, 300 groups/tenant). Occurrence list completed and re-measured: added `docs/operations/co-management/03-cocmgmt-migration-paths.md:25`, plus `01-windows-wufb-rings.md:64/:69/:99`, and flagged that `00-overview.md:76`'s `(Test, First, Fast, Broad rings)` rendering is missed by a comma-and grep. |
| 46, 47 | Pillar D | **Suppressed intra-Microsoft conflict recorded.** `configure-custom-settings-linux` Prerequisites still say *"Linux Ubuntu Desktop, RedHat Enterprise Linux 8, or RedHat Enterprise Linux 9"* while `ref-supported-platforms` lists RHEL 9/10 — both `updated_at` 2026-07-01. Added as a table with routing guidance, matching how A-3 handles the DFCI OEM conflict. New Open Question 13. |
| 51 | C-3, Alternatives | SAEC unification de-tensed. Today is 2026-08-19; the stated month was July 2026. Recorded **both** facts: the announcement's verbatim future tense on a page last updated 2026-06-23, **and** the same page's comparison table still reading *"Twice a year (in January and July)"* / *"Eight months"* / *"Two months"*. Live cadence marked `UNVERIFIED` (Open Question 15). |
| 53 | C-2 (`:302`), E-1 | **"Delete the Windows 11 Pro constraint" retracted.** Its premise ("Windows 365 Enterprise is not Enterprise edition") is wrong, and the page carries an H2 titled *"Hotpatch on Windows 11 Enterprise or Windows Server 2025"*. Restated as a licence-list-vs-edition distinction with Pro left `UNVERIFIED`. New Open Question 10. |
| 54 | C-1 (`:277`) | Refutation quote re-attributed. It is not on the overview/prerequisites/groups pages; it is on `waas-manage-updates-wufb` (`ms.date` 2024-05-16, `updated_at` 2025-10-02) and is now quoted verbatim from there. Also flagged the `windows-autopatch-groups-overview` containment sentence as the stronger citation. |
| 55 | C-2 Licensing row, E-1 | Re-fetched. The page says **`Microsoft 365 F3`** — **STACK was correct; PITFALLS.md is wrong** and must be fixed there. Quote added verbatim. |
| 56 | Installation (`:517`), E-1 | Autopatch entitlement recorded as **necessary but not sufficient** for Hotpatch, with a side-by-side table of the two differing licence lists (Autopatch includes Enterprise E3/E5 **VDA**; Hotpatch's does not and adds Windows 365 Enterprise) plus Hotpatch's extra OS/VBS/baseline/CHPE gates. |
| 57 | `:76`, `:190`, `:490`, `:690` | **`MEASURED: all return HTTP 404` was reproducibly false.** Re-probed with `curl`: **two are live 301 redirects** (DFCI config, driver-updates-overview), four are genuine 404s. Full probe table added. The `MEASURED` definition at the top was amended to cover HTTP probes explicitly, since the original label violated this file's own repo-command definition. Conclusion (write the canonical paths) preserved, plus a new warning that a 200-only link-checker passes the two redirects. |
| 62 | A-6 | Added the page's opening Warning verbatim, including *"…including the ability to boot or access Bitlocker encrypted drives."* |
| 68 | Alternatives row vs `:130`/`:511` | Broken routing fixed. **BIOS configuration and other settings is Dell-only**; the row no longer sends non-OEM-registered HP/Lenovo fleets to a policy that cannot serve them, and points them at A-8 instead. |
| 69 | Version-Compatibility | Apple tiers un-flattened. The **"Allowed to enroll"** tier is published **only** under *"Devices without user affinity"*; the user-affinity block lists Supported only. Stated explicitly, with the consequence for user-affinity fleets. |
| 70 | E-3 | **The `OfferPrograms` retraction is itself retracted.** The absence was measured against a page never fetched; the real Intune surface (`settings-catalog/ref-apple-settings`, fetched 2026-08-19) enumerates **no** keys at all, so the negative proved nothing. `OfferPrograms` is a real first-party Apple key in the **`Beta`** dictionary of Software Update Settings. The corpus's five hits are to be **re-categorised (beta enrolment, not enforcement), not deleted.** |
| 73 | assorted | "Two documented interaction traps" → **three** (it listed three). **UEFI CSP** re-attributed from `configure-dfci-windows` (which never uses the string) to `ref-dfci-settings-windows` / `configure-bios-windows`. **Enrollment Status Page** distinguished from the source's step heading **"Enrollment State Page"**. **"as a blocking app"** removed from inside a quote. **"Laptop 3–6"** expanded, restoring `Laptop 3 (Intel processors only)`. **"Boot from network adapters"** restored to the Surface page's `Disable Boot from network adapters`, with the two pages' divergence noted. *Not treated as a defect:* the Test/First/Fast/Broad attribution to `00-overview.md:76` — that line does carry the names. |
| 80 | C-4 | EAC positive added and given the lead: *"you can select blocking apps from the Enterprise App Catalog in the Enrollment Status Page (ESP) and the Device Preparation Page (DPP) profiles."* The ESP limitation is scoped to **auto-update** apps only, so the guidance is now a trade-off rather than a prohibition. |
| 117–120 | Installation (`:452`), Stack Patterns, Supporting Libraries, Pillar D, A-6 | **DCECMI/`.cctk`** relabelled — Learn says "Dell Command" and "Dell Client Configuration Tool Kit file (`.cctk`), 2 MB"; the DCECMI expansion is `THIRD-PARTY` and now carries that label everywhere it appears. **"Recipe #5 = registry row 226"** was unlabelled and wrong: the generator self-test pins **225** rows today, v1.21 adds at least two enrolled artefacts → floor **227**, and per the owner ruling the target is **227 + N(ops docs), computed from the registry, never hardcoded**. **Ubuntu `Allowed-Origins`** default corrected from "security only" to the four enabled origins (base release, `-security`, ESM apps, ESM infra) with `-updates`/`-proposed`/`-backports` commented out. **A-6 roles** added: minimum `Policy and Profile manager` to author; `Intune Role Administrator` to create the custom Read-Bios-Password role; `Intune Administrator` for the all-device read. |
| — | A-8, What-NOT-to-Use, routing table, Open Questions | **Owner decisions applied.** `HP Connect for Microsoft Endpoint Manager` struck from the out-of-scope lists (owner-ruled IN SCOPE) and flagged as having **zero coverage** in this research. **WinGet** flagged as owner-ruled IN SCOPE with zero coverage and an explicit "do not let it ride into REQUIREMENTS.md" warning. **Ubuntu 22.04 sweep** recorded as owner-ruled IN SCOPE at **25 markdown files + 1 SVG**. The `[LOW]` rating on A-8 annotated as reflecting a non-attempt, not an unavailability. |
| — | "Not worth documenting" table | **Retitled "Route, do not expand"** with an explicit note that every row routes rather than bars — the previous title read as a deletion instruction. A third column now names the destination for each row. |

**Not corrected — verified non-defects.** The Test/First/Fast/Broad attribution to `00-overview.md:76` (that line does read `(Test, First, Fast, Broad rings)`; only the comma-and rendering drifts). The routing table's rows, which prescribe migration-table treatment rather than barring topics.

---
*Stack research for: enterprise update, driver and firmware/BIOS governance documentation*
*Researched: 2026-08-18. Corrected under adversarial review 2026-08-19 — see "Corrections Applied" above.*
