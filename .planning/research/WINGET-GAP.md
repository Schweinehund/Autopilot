# WinGet Gap-Fill Research

**Milestone:** v1.21 — Enterprise Update, Driver & Firmware/BIOS Governance
**Scope:** targeted gap-fill for one guide section (`docs/operations/patch-management/08-windows-app-updates.md`)
**Researched:** 2026-08-19
**Builds on:** `STACK.md` §C-4 (Enterprise App Management). Does not duplicate it.

---

## How to read this file

| Label | Meaning |
|-------|---------|
| **SOURCED** | I fetched the page on 2026-08-19. URL + the page's own `ms.date` / `updated_at` recorded in the Sources table. |
| **SOURCED (absence)** | I fetched the page and the claim is *not on it*. A documented silence, not an inference. |
| **MEASURED** | I ran a command against this repo. Command shown. |
| **PREMISE** | Inference. Not fetched, not measured. |
| **UNVERIFIED** | I tried to verify and could not. Do not ship as fact. |
| **THIRD-PARTY** | Community source (GitHub issue, blog, search summary). Useful, not authoritative. |

> **Every string inside quotation marks below is verbatim from a page I actually fetched on 2026-08-19.** Nothing is reconstructed from memory. Where I could not fetch a supporting page, the claim appears unquoted and labelled.

Seam-assigned confidence (MEASURED — `node ~/.claude/gsd-core/bin/gsd-tools.cjs query classify-confidence --provider webfetch`): `webfetch` → **LOW**, `websearch` → **LOW**. No Context7/MCP provider was available in this session; the `research-plan` seam returned `context7` for three of four questions and I fell back to `webfetch` per the provider-fallback table. Four digests cached via `research-store put`. As in `STACK.md`, the seam tiers by transport, not by page authority — treat `SOURCED` + Microsoft Learn as usable.

---

## Corpus baseline — MEASURED

Command: `grep -rniE "winget" docs --include=*.md --exclude-dir=graphify-out`

**2 hits, 2 files, both incidental**, in identical Autopilot device-preparation app-type lists:

```
docs/admin-setup-apv2/02-etg-device-group.md:129:   **Supported app types:** LOB (.msi/.intunewin), Win32, Microsoft Store (WinGet), Microsoft 365 apps, Enterprise App Catalog.
docs/admin-setup-apv2/03-device-preparation-policy.md:141:2. Supported app types: LOB (line-of-business), Win32, Microsoft Store (WinGet only), Microsoft 365, Enterprise App Catalog.
```

Both are **accurate** against current first-party documentation (see §3, WinGet-1). Neither is update-governance content. Corpus size MEASURED at **282** markdown files. The target file `docs/operations/patch-management/08-windows-app-updates.md` does **not exist yet** (MEASURED: `ls` returns *No such file or directory*); `docs/operations/patch-management/` currently holds `00-overview.md` … `04-android-patch-delivery.md` only.

---

## Bottom line, up front

**WinGet is not a supported enterprise application-patching surface through Intune, and Microsoft does not document it as one.** That is the honest, well-sourced negative the brief invited.

But that sentence alone would mislead a reader, because the name "WinGet" is attached to three genuinely different things, only one of which is a scripting mechanism:

| Thing | Is it a patching surface? | Intune control plane |
|-------|---------------------------|----------------------|
| **Microsoft Store app (new)** — the Intune app type. Its device-preparation eligibility filter is expressed in terms of WinGet support. | **Yes** — apps auto-update, and this is documented. | Full: an Intune app object with assignments. |
| **App Installer / `winget.exe`** — the OS-component CLI. | **No.** Nothing in Intune targets, schedules, reports on, or versions it. | Only a **Group-Policy-shaped on/off surface**: the `DesktopAppInstaller` policy CSP, ADMX-backed, custom OMA-URI only. |
| **`winget configure`** — WinGet Configuration / DSC. | **No.** Documented purely as developer machine setup. | None. |

**The routing sentence for the guide** (all three clauses SOURCED — see §3):

> Enterprise App Management and WinGet are not the same mechanism and are not alternatives to each other. Enterprise App Catalog apps are Microsoft-hosted Win32 packages installed by the Intune Management Extension — Microsoft's FAQ answers the question "Does Enterprise App Management use **Winget**?" with "No." WinGet is a Windows OS component delivered and updated by the Microsoft Store, with no Intune assignment, no Intune reporting, and no first-party Intune integration. If you want Intune to patch a non-Microsoft app, use Enterprise App Management, or the Microsoft Store app (new) type if the app is in the Store. If you want WinGet, you are writing and owning a script.

---

## 1. The Microsoft Store app (new) — the real, documented Intune surface

**Source:** `https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store` — `ms.date: 2026-06-25`, `updated_at: 2026-07-27`. Fetched 2026-08-19. All of §1 is **SOURCED** unless marked otherwise.

### 1.1 Portal path (what the admin actually clicks)

Verbatim from the page:

> 1. In the Microsoft Intune admin center, select **Apps** > **All Apps** > **Create**.
> 2. In **Select app type** pane, select **Microsoft Store app (new)** under the **Store app** section.

Three-step creation flow: **App information**, **Assignments**, **Review + create**. Search defaults to the **United States** Microsoft Store catalog with a region drop-down. Search result columns are **Name**, **Publisher**, **Type** (Win32 or UWP).

### 1.2 Delivery mechanism

| Attribute | Value |
|-----------|-------|
| Client agent | **Intune Management Extension (IME)** — a stated prerequisite: "Client device need to be able to support the [Intune Management Extension (IME)] to install Microsoft Store apps." |
| Content origin | Microsoft Store, plus publisher-hosted content for Win32: "Third party vendors or publishers that add Win32 apps to the Microsoft Store are responsible for hosting their own content in their respective infrastructure." |
| Package types | UWP, `.msix`, and Win32 `.exe` / `.msi` |
| Install context | **System** or **User**, chosen at app creation. "If the option is greyed out, the specific store application only supports the selected install behavior." Win32 Store apps support one or the other "Based on their installer definition in the store". |
| Hardware floor | "Client devices must support at least two core processors" |
| Not supported | "Any app that has an ARM64 installer isn't supported." Paid apps are not supported. |
| Preview status | "Win32 apps that are in the Microsoft Store are currently in preview. Not all Win32 apps will be available or searchable." |

**Note the shared agent.** The IME installs *both* Store apps and Enterprise App Catalog apps. The IME is not the distinguishing factor between the two surfaces — the catalog, hosting and licensing are. Do not let the guide imply otherwise.

### 1.3 The update mechanism — and it splits in two

This is the part the guide must get right, because the page gives **two different answers** depending on package type.

Headline sentence, verbatim: *"Upon deployment, Intune automatically keeps the apps up to date when a new version becomes available."*

And under the `## App update` heading, verbatim: *"Apps that are deployed from the Microsoft Store are automatically kept up to date to the latest version of the app. For this feature to work properly for UWP apps, the **Turn off Automatic Download and Install of updates** shouldn't be enabled."*

Then the page splits:

| | **UWP Store apps** | **Win32 Store apps** |
|---|---|---|
| Who updates | *"UWP apps are kept up to date by the Store."* | *"Microsoft Store Win32 apps are kept up to date by Intune"* |
| Needs an Intune assignment? | **No.** *"The UWP app will stay up to date with or without Intune assignment once it is installed, unless the Store policy is set to block auto-update."* | **Yes.** *"…therefore in order for the app to be updated it must be assigned in Intune."* |
| Store update policy applies? | **Yes** — blocked by **Turn off Automatic Download and Install of updates** (`ApplicationManagement/AllowAppStoreAutoUpdate`). | **No.** *"App updates are not affected by the Store's update policies."* And: *"For Win32 Store apps, if **Turn off Automatic Download and Install of updates** is set, then the Win32 apps with an active Intune assignment are still automatically updated."* |
| How to suppress | Enable the Store auto-update block CSP — tenant/device-wide, not per-app. | **No documented suppression.** Only removing the Intune assignment stops it. |

### 1.4 Cadence — the honest negative

**SOURCED (absence).** The page states *that* apps are kept up to date. It gives **no cadence, no check interval, no schedule, no SLO, and no per-app version pinning**. Nothing on the page, on `deploy-windows`, or on the EAM page supplies one.

**Write this as an explicit gap in the guide.** Enterprise App Management publishes catalog-availability SLOs (24 h / 7 days / 48 h expedited — see `STACK.md` §C-4); the Microsoft Store app type publishes nothing comparable. An admin choosing between the two on update-governance grounds needs to know that.

### 1.5 The four constraints that make this a governance topic

These follow from the above and are the reason the section exists at all:

1. **No rings, no phasing, no deferral.** The page documents nothing resembling deployment rings for Store app updates. `SOURCED (absence)`
2. **No version pinning and no rollback for Win32 Store apps.** You get latest, or you get no assignment. `SOURCED (absence)` + `PREMISE` on the framing.
3. **The update behaviour is not the same for UWP and Win32,** so a blanket statement like "Intune keeps Store apps updated" is only half-true for either. `SOURCED`
4. **Win32 Store apps are in preview.** Do not build a governance model on them without saying so. `SOURCED`

### 1.6 The Store-app ↔ WinGet relationship — state it carefully

This is where a careless guide will fabricate. The precise position:

- **The Autopilot device-preparation documentation ties them explicitly.** Verbatim from the device-prep policy tutorial: *"**Microsoft Store** - only Microsoft Store apps that support WinGet are supported."* (`ms.date: 2025-06-11`, `updated_at: 2026-06-22`). **This single sentence is the only first-party statement I found linking the Intune Store app type to WinGet, and it is a device-preparation eligibility filter, not a statement about the update mechanism.** `SOURCED`
- **The Store-app article itself never says WinGet delivers or updates the app.** Its only WinGet mentions are the opposite kind — carve-outs saying `winget.exe` escapes Store lockdown policies: *"The Windows Package Manager command-line tool `winget.exe` is not affected by this policy"* (of **Turn off the Store application**), and that **Only display the private store within the Microsoft Store app** *"Allows the Windows Package Manager `winget` command line interface (CLI) access to the Microsoft Store."* `SOURCED (absence)` + `SOURCED`
- **`deploy-windows` — the Windows app-type reference — does not mention WinGet at all.** `SOURCED (absence)` (`ms.date: 2025-10-02`, `updated_at: 2026-04-16`).
- **There is a documented dependency on the App Installer stack, which is the WinGet component.** The Store-app article's "Common Store policy settings and their impact on Microsoft Store apps" section lists **Enable App Installer Microsoft Store Source** (`DesktopAppInstaller/EnableMicrosoftStoreSource`) and **Enable App Installer** (`DesktopAppInstaller/EnableAppInstaller`), both with recommended values *"**Not configured** or **Enabled**"* and both flagged *"Not built in; use a custom configuration profile."* Microsoft recommending that admins keep App Installer and its Microsoft Store source enabled, inside an article about Intune Store-app deployment, is strong evidence of a client-side dependency. `SOURCED` for the policy rows; **`PREMISE`** for the inference that the Store app type rides the App Installer / `msstore` source.
- **What I could NOT verify:** any first-party statement that the Intune Microsoft Store app (new) type is implemented on top of the WinGet client or the WinGet `msstore` source. `UNVERIFIED`. **The guide must not assert it.**

**Actionable trap for the guide, and it is a good one:** the two `DesktopAppInstaller` policies the Store-app article recommends are **not in the Intune settings catalog**. Microsoft's own instruction is *"Not built in; use a custom configuration profile."* An admin who hardens Windows by disabling App Installer via ADMX/OMA-URI can degrade a supported Intune app type, using a lever Intune does not surface in its normal policy UI. `SOURCED`

---

## 2. WinGet CLI and `winget configure` delivered through Intune

### 2.1 What WinGet is, first-party

**Source:** `https://learn.microsoft.com/en-us/windows/package-manager/winget/` — `ms.date: 2026-07-19`, `updated_at: 2026-07-21`. Fetched 2026-08-19.

> "**WinGet** is a command line tool enabling users to discover, install, upgrade, remove and configure applications on Windows 10, Windows 11, and Windows Server 2025 computers. This tool is the client interface to the Windows Package Manager service."

> "**WinGet** the Windows Package Manager is available on Windows 11, modern versions of Windows 10, and Windows Server 2025 as a part of the **App Installer**. The **App Installer** is a System Component delivered and updated by the Microsoft store on Windows Desktop versions, and via Updates on Windows Server 2025."

**Two governance consequences, both direct:**

1. **You do not control the WinGet version from Intune.** The Store delivers and updates App Installer. An update-governance guide that recommends WinGet is recommending a tool whose own version is outside the control plane it is documenting. `SOURCED` (mechanism) / `PREMISE` (framing).
2. Documented commands relevant here: `upgrade` — *"Upgrades the given specified application."* — and `configure`, `pin`, `export`, `import`, `list`, `repair`. `SOURCED`

### 2.2 The "WinGet under SYSTEM" problem — the first-party root cause

The brief asks for what Microsoft documents versus what is community practice. Here is the clean split.

**What Microsoft documents (SOURCED, same page):**

> "The **WinGet** command line tool is only supported on Windows 10 version 1809 (build 17763) or later. WinGet will not be available until you have logged into Windows as a user for the first time, triggering Microsoft Store to register the Windows Package Manager as part of an asynchronous process. If you have recently logged in as a user for the first time and find that WinGet is not yet available, you can open PowerShell and enter the following command to request this WinGet registration: `Add-AppxPackage -RegisterByFamilyName -MainPackage Microsoft.DesktopAppInstaller_8wekyb3d8bbwe`."

**That sentence is the whole problem, stated by Microsoft.** WinGet is a per-user-registered MSIX package whose availability is gated on an interactive first sign-in and an asynchronous Store registration. Every context where Intune runs code with no signed-in user — Autopilot / device-preparation ESP, a Win32 app or platform script in **System** context, a device-context remediation — is a context where WinGet may not be registered and resolvable. The Autopilot device-preparation policy documentation independently confirms the constraint on the Intune side: *"The PowerShell script should also be configured to run in the **System** context since the PowerShell scripts run during OOBE when no user is signed in."* `SOURCED`

The page's `## Administrator considerations` section covers only elevation and UAC. It says **nothing** about the SYSTEM account, service context, or unattended execution. `SOURCED (absence)`

Microsoft does document one machine-scope bootstrap, but only in the **Windows Sandbox** section, not as an Intune or SYSTEM recipe:

> "`Repair-WinGetPackageManager -AllUsers`"
> "To install the WinGet PowerShell module in machine scope, you can use the `-Scope AllUsers` parameter with the `Install-Module` cmdlet."

`SOURCED` that these exist; **`UNVERIFIED`** that they constitute a supported SYSTEM-context path — Microsoft does not say so.

**What is community practice (THIRD-PARTY, clearly labelled):**

- `microsoft/winget-cli` issue **#5752**, *"Winget Needs Full Enterprise Support—SYSTEM Context, Intune Integration, and Machine-Wide Deployment"*, opened **2025-09-26**, **still open**, with **no maintainer reply** at fetch time. The author's claims, verbatim: *"Winget runs in user context by default, making it incompatible with SYSTEM-level deployment scenarios—especially via Intune."* / *"The App Installer MSIX packaging restricts machine-wide availability and complicates access for SYSTEM processes."* / *"There is no native support in Intune for Winget manifests, updates, or bulk deployments."*
  **This is a user's feature request on Microsoft's repo, not a Microsoft statement.** Its evidential value is that the request exists and is unanswered — which is itself the strongest available signal that first-party enterprise SYSTEM support does not exist. `THIRD-PARTY`
- Multiple community wrapper projects exist (resolving `winget.exe` out of the `WindowsApps` path, bootstrapping App Installer, then shelling out from a Win32 app in System context). They work in practice for many admins. **They are unsupported, and their failure modes track App Installer versions Microsoft ships on its own schedule.** `THIRD-PARTY`, surfaced via `websearch` and not individually fetched — do not cite specifics in the guide.

### 2.3 `winget configure` / WinGet Configuration — out of scope, and here is why

**Source:** `https://learn.microsoft.com/en-us/windows/package-manager/configuration/` — `ms.date: 2024-11-21`, `updated_at: 2025-07-24`. Fetched 2026-08-19. **That `ms.date` is 21 months old as of today.**

- Scope, verbatim: *"a YAML-formatted WinGet Configuration file that lists all of the software versions, packages, tools, dependencies, and settings required to set up the desired state of the development environment on your Windows machine."* The page's framing is **"machine setup and project onboarding"** throughout; its `ms.service` is `dev-environment`. `SOURCED`
- Intune / MDM / SYSTEM / unattended-at-scale: **ABSENT.** Not mentioned once. `SOURCED (absence)`
- Reliability, verbatim: *"The most common reason for a WinGet Configuration to fail is due to a PowerShell DSC resource requiring administrative access to apply the desired state. Not all DSC resources surface explicit reasons for failure."* And: *"the configuration file will continue to run, accomplishing as many tasks as possible, even if some of the assertions or resource dependencies fail"* — i.e. **partial success is the designed behaviour**, which is close to the worst possible property for a patch-compliance mechanism. `SOURCED`
- Trust model puts the burden on the operator: *"WinGet Configuration files and any associated PowerShell DSC Resources should be checked to ensure that they are trustworthy before applying them."* `SOURCED`

**Verdict: exclude.** It is a developer-onboarding tool, not a patching mechanism, by Microsoft's own framing, and it fails partially by design.

### 2.4 What Intune *can* actually do to WinGet — the `DesktopAppInstaller` policy CSP

This is the one genuinely Intune-shaped WinGet surface and it belongs in the guide as a **control/hardening** item, not a patching item.

**Source:** `https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-desktopappinstaller` — `ms.date: 2025-03-12`, `updated_at: 2025-03-12`. Fetched 2026-08-19. All settings are **device scope only** (`✅ Device ❌ User`), Pro / Enterprise / Education / IoT Enterprise. All are **ADMX-backed**, which the page flags: *"This CSP contains ADMX-backed policies which require a special SyncML format to enable or disable."* → in Intune terms, **custom OMA-URI configuration profile**, matching the Store-app article's *"Not built in; use a custom configuration profile."*

| Setting | Applicable OS | What it does (verbatim, condensed to the operative clause) |
|---------|---------------|-----------------------------------------------------------|
| `EnableAppInstaller` | Win11 22H2+ | *"This policy controls whether the Windows Package Manager can be used by users."* Disabled → *"users won't be able to use the Windows Package Manager."* Users can still run `winget` and `winget -?`; *"Any other command will result in the user being informed the operation is disabled by Group Policy."* |
| `EnableWindowsPackageManagerCommandLineInterfaces` | **Win11 24H2+** | *"This policy determines if a user can perform an action using the Windows Package Manager through a command line interface (WinGet CLI, or WinGet PowerShell)."* — *"This policy doesn't override the 'Enable App Installer' policy."* |
| `EnableWindowsPackageManagerConfiguration` | **Win11 24H2+** | Controls whether *"the Windows Package Manager configuration feature"* can be used — **this is the `winget configure` kill switch.** |
| `EnableMicrosoftStoreSource` | Win11 22H2+ | Enabled → the Microsoft Store source *"will be available and can't be removed."* Disabled → *"won't be available."* |
| `EnableDefaultSource` | Win11 22H2+ | Same three-state treatment for the default (community) source. |
| `EnableAdditionalSources` | Win11 22H2+ | *"controls additional sources provided by the enterprise IT administrator"* — enabled sources *"can't be removed."* Representation obtained via `winget source export`. |
| `EnableAllowedSources` | Win11 22H2+ | *"only the sources specified can be added or removed"* — the allow-list. |
| `EnableLocalManifestFiles` | Win11 22H2+ | Controls installing packages from local manifests. |
| `EnableMSAppInstallerProtocol` | Win11 22H2+ | `ms-appinstaller` web protocol. **Note the inverted default:** *"If you disable or don't configure this setting, users won't be able to install packages from websites that use this protocol."* |
| `EnableHashOverride` | Win11 22H2+ | Whether users may override SHA256 validation. |
| `EnableLocalArchiveMalwareScanOverride` | Win11 22H2+ | Whether users may override the archive malware scan. |
| `EnableBypassCertificatePinningForMicrosoftStore` | Win11 22H2+ | Store certificate-pinning bypass. |
| `EnableSettings` | Win11 22H2+ | Whether users may change WinGet settings. Note: *"The settings are stored inside of a .json file on the user's system. It may be possible for users to gain access to the file using elevated credentials. This won't override any policy settings that have been configured by this policy."* |
| `EnableExperimentalFeatures` | Win11 22H2+ | *"Some of these experimental features may be implemented prior to the Group Policy settings designed to control their behavior."* |
| `SourceAutoUpdateInterval` | Win11 22H2+ | Package-source index refresh in minutes. Critically: *"The index is downloaded when a user invokes a command, and the interval has passed (the index is not updated in the background). This setting has no impact on REST-based sources."* |

**The single most useful row for an update-governance guide is the last one**, and it is a clean disqualifier: WinGet's own source index *"is not updated in the background"* and refreshes only when **a user invokes a command**. A mechanism whose catalog is refreshed by interactive user action is structurally the wrong shape for unattended fleet patching. `SOURCED`

**Registry key for detection/compliance scripting:** `Software\Policies\Microsoft\Windows\AppInstaller`, value name = the policy name in the table. `SOURCED`

---

## 3. The boundary — Enterprise App Management vs the Store app type vs WinGet

**This is the load-bearing output of this brief.** Three surfaces, routinely conflated, with one verbatim first-party sentence anchoring the split.

### The anchor quote

**Source:** `https://learn.microsoft.com/en-us/intune/app-management/deployment/enterprise-app-management` — `ms.date: 2026-06-03`, `updated_at: 2026-06-24`. Fetched **2026-08-19** (independently re-fetched for this brief; `STACK.md` §C-4 fetched it 2026-08-18). Verbatim, FAQ section, question heading and answer:

> ### Does Enterprise App Management use **Winget**?
>
> No. Enterprise App Catalog apps are directly installed by the Intune management extension (IME).

That is the complete answer, exactly as published — one word, one sentence. **Do not extend it, do not paraphrase it into something stronger, and do not attach a date or a rationale Microsoft did not give.**

### The comparison table

| | **Enterprise App Management** | **Microsoft Store app (new)** | **WinGet CLI (`winget.exe`)** |
|---|---|---|---|
| **What it is** | Licensed Intune add-on: a Microsoft-curated catalog of prepared, Microsoft-hosted Win32 packages | An Intune app type sourced from the Microsoft Store | A Windows OS component (App Installer) |
| **Delivered by** | **IME** — *"directly installed by the Intune management extension (IME)"* `SOURCED` | **IME** — IME support is a stated prerequisite `SOURCED` | Nothing in Intune. It is on the box or it isn't. |
| **Content hosted by** | Microsoft: *"Microsoft hosts the applications in Microsoft storage accessible through `*.manage.microsoft.com`"* `SOURCED` | Microsoft Store, plus the publisher's own infrastructure for Win32 `SOURCED` | Publisher URLs from a manifest |
| **Package types** | *"Windows Win32 applications (exe and msi)"* `SOURCED` | UWP, `.msix`, Win32 `.exe` / `.msi` (Win32 in preview) `SOURCED` | EXE, ZIP, INNO, NULLSOFT, MSI, WIX, APPX, MSIX, BURN, PORTABLE, FONT `SOURCED` |
| **Licensing** | *"requires a subscription in addition to Microsoft Intune Plan 1 or Plan 2"*; standalone SKU or Intune Suite `SOURCED` | Included with Intune. No add-on. `SOURCED (absence)` — no licensing block on the article |
| **Auto-update** | Opt-in per app, **Required** assignments only; alternative is **Guided update supersedence** `SOURCED` | On by default. UWP by the Store, Win32 by Intune. No opt-out documented for Win32. `SOURCED` | `winget upgrade`, run by whatever you wrote. Nothing runs it for you. |
| **Update SLO published** | **Yes** — 80–90 % within 24 h of ingestion; manual-validation ≤ 7 days; expedited goal 48 h `SOURCED` | **No** `SOURCED (absence)` | n/a |
| **Rings / phasing** | **No.** *"Auto-update doesn't support rollout rings or deployment plans for staged update deployment."* `SOURCED` | **No** `SOURCED (absence)` | Whatever you build |
| **Rollback** | **No.** *"Auto-update apps don't provide rollback or automatic uninstall remediation."* `SOURCED` | **No** `SOURCED (absence)` | Manual |
| **ESP / device-prep blocking app** | **No** for auto-update apps: *"You can't add an auto-update Enterprise App Catalog app as a blocking app in the Enrollment Status Page (ESP) or Autopilot device preparation."* `SOURCED` | **Yes**, subject to *"only Microsoft Store apps that support WinGet are supported"* `SOURCED` | n/a |
| **Reporting** | **Managed Apps report**, per-device, latest state only `SOURCED` | Intune app install status `SOURCED` | **None.** Script exit codes only. |
| **Intune control plane** | Full app object | Full app object | **None.** Only `DesktopAppInstaller` on/off policies via custom OMA-URI. `SOURCED` |

### The three routing rules for the guide

1. **App is in the Enterprise App Catalog** → use Enterprise App Management. Accept the documented limits: no rings, no rollback, one-hour catalog cache lag, and you own revocation remediation (all `SOURCED`, all catalogued in `STACK.md` §C-4 — link, do not restate).
2. **App is in the Microsoft Store** → use **Microsoft Store app (new)**. Know that UWP and Win32 update by different mechanisms with different suppression behaviour (§1.3), and that no cadence is published (§1.4).
3. **Neither** → Win32 app with supersedence, and you own the packaging and the update cadence. **WinGet is not the answer here, and Microsoft does not present it as one.**

### The two conflations to kill explicitly

- **"Enterprise App Management is WinGet-powered."** False. Microsoft's own FAQ says No. `STACK.md` already flags this as corpus correction material; this brief supplies the verbatim quote and its `ms.date` so the guide can cite it without re-fetching.
- **"Microsoft Store app (new) is just WinGet with a UI, so WinGet must be supported."** Also wrong, in the other direction. The only first-party WinGet↔Store-app link is a device-preparation **eligibility filter** (*"only Microsoft Store apps that support WinGet are supported"*), not a claim that WinGet is the delivery or update engine, and not a claim that the CLI is enterprise-supported. `SOURCED` for the filter, `UNVERIFIED` for the implementation.

---

## 4. Third-party app patching — what Microsoft actually positions

**The answer is Enterprise App Management, and it is a licensed add-on.** `SOURCED` via the EAM article's own framing: *"Microsoft Intune Enterprise App Management enables you to easily discover and deploy applications and keep them up to date from the Enterprise App Catalog. The Enterprise App Catalog is a collection of prepared Microsoft and non-Microsoft applications."*

Supporting boundaries, all already SOURCED in `STACK.md` and re-confirmed here:

- **Windows Autopatch does not cover third-party apps.** Its documented workloads are Windows quality/feature updates, **Microsoft 365 Apps for enterprise**, **Microsoft Edge**, **Microsoft Teams**, and driver/firmware. Non-Microsoft applications are outside it. (`STACK.md` §C-1, `SOURCED`.)
- **The Microsoft Store app (new) type covers third-party apps that are in the Store**, and updates them (§1.3). Genuinely first-party, genuinely included in base Intune, and materially narrower in catalog than EAM.
- **Win32 + supersedence** remains the universal fallback and is what the corpus's existing `docs/operations/app-lifecycle/01-windows-win32-msix-scale.md` already covers.
- **WinGet is not positioned as any of this.** `SOURCED (absence)` across four Learn pages fetched: `deploy-windows` (the Windows app-type reference) does not mention WinGet at all; `add-microsoft-store` mentions it only as a policy carve-out; `enterprise-app-management` mentions it only to say No; and the WinGet article itself never mentions Intune, MDM, or enterprise deployment.

**So the honest hierarchy for the guide:**

```
1. In the Enterprise App Catalog?        -> Enterprise App Management  (add-on licence)
2. In the Microsoft Store?               -> Microsoft Store app (new)  (included)
3. Neither?                              -> Win32 app + supersedence   (you own it)
4. Want WinGet?                          -> you are writing an unsupported script; see §5
```

---

## 5. What should be OUT of scope — with reasoning built to survive re-litigation

Each exclusion is stated as a **rule with a first-party or measured basis**, not a preference. Reasons are ordered so that the strongest argument is the one that does not depend on taste.

| Excluded | Reason that survives challenge | Basis |
|----------|-------------------------------|-------|
| **Community WinGet automation frameworks (WAU / Winget-AutoUpdate, and every Intune-Win32 WinGet wrapper repo)** | The corpus's own scope rule is *Intune-delivery-shaped and link-not-copy* (`STACK.md` §A-8). These are third-party scripts with no Intune object model, no Intune reporting, and no vendor support contract. Documenting them makes this corpus the support surface for someone else's unversioned PowerShell. | `PREMISE` on the rule application; the scope rule itself is established in `STACK.md`. |
| **`winget configure` / WinGet Configuration** | Microsoft's own page scopes it to *"the desired state of the development environment on your Windows machine"* under `ms.service: dev-environment`, never mentions Intune or MDM, and documents partial-failure as designed behaviour. It is not a patching mechanism by the vendor's own framing. | `SOURCED` |
| **Step-by-step "how to run WinGet as SYSTEM from an Intune Win32 app"** | Microsoft documents the blocking mechanism (per-user MSIX registration gated on interactive first sign-in) and documents **no** SYSTEM-context path. Publishing a recipe would be publishing an unsupported workaround as corpus guidance, and its correctness is hostage to App Installer versions the Store ships outside Intune's control. **The winget-cli issue asking for exactly this support is open and unanswered.** | `SOURCED` + `SOURCED (absence)` + `THIRD-PARTY` |
| **Third-party patch products (PatchMyPC, Robopack, Scappman, Chocolatey for Business, Ninite, etc.)** | Same boundary that already excluded HP Connect / Dell TechDirect / Lenovo Device Manager in `STACK.md` §A-8: vendor-infrastructure-dependent, outside the corpus's Intune-client-side line. **Name the category once as an out-of-scope alternative; do not evaluate products.** | `PREMISE`, consistent with an established milestone guardrail |
| **A WinGet CLI command reference** (`install` / `upgrade` / `pin` / `export` syntax) | link-not-copy. That is `learn.microsoft.com/windows/package-manager/winget/`. | `PREMISE`, established guardrail |
| **Private WinGet REST sources / self-hosted package repositories** | Requires infrastructure Intune cannot reach or manage; the `EnableAdditionalSources` / `EnableAllowedSources` policies can *point at* such a source but Intune has no visibility into it. **One sentence naming it as out of scope is correct; a section is not.** | `SOURCED` (the policies exist) + `PREMISE` (the scope call) |
| **Microsoft Store for Business / Store for Education** | Retired. The corpus already carries this in `docs/reference/linux-capability-matrix.md:60` (MEASURED). Do not resurrect it. | `MEASURED` + `SOURCED` (the Store-app article links the retirement-migration blog) |

**What is explicitly IN scope, and small:** one subsection of `08-windows-app-updates.md` covering (a) the Microsoft Store app (new) surface and its split update model, (b) the EAM-vs-WinGet routing statement, (c) the `DesktopAppInstaller` policy CSP as a **hardening/control** surface with the "not in the settings catalog" trap, and (d) a plainly-stated negative on WinGet as a patching mechanism.

---

## 6. Recommended shape for the guide section

Roughly 4 subsections. Deliberately short — this is a routing section, not a pillar.

1. **Choosing a Windows app update mechanism** — the 4-step hierarchy from §4, as a decision list.
2. **Microsoft Store app (new)** — portal path (§1.1), the UWP-vs-Win32 update split table (§1.3), the "no published cadence / no rings / no rollback / no pinning" constraint block (§1.4–1.5), ARM64 and preview caveats.
3. **Enterprise App Management vs WinGet — routing** — the verbatim FAQ quote, the three-column table from §3, and the two conflations to kill. Link to the existing EAM content rather than restating `STACK.md` §C-4.
4. **Controlling WinGet on managed devices** — framed as *hardening*, not patching. The `DesktopAppInstaller` CSP table (§2.4), the custom-OMA-URI requirement, the `EnableAppInstaller` ↔ Store-app-type interaction trap (§1.6), and the closing negative: WinGet is not an Intune-managed patching surface.

**One or two requirement IDs is the right size.** A candidate split: one requirement for the Store-app surface + routing statement (subsections 1–3), one for the WinGet control/hardening surface (subsection 4).

---

## 7. Gaps, and what must not be shipped without further verification

| Gap | Status | What to do |
|-----|--------|------------|
| Whether the Intune **Microsoft Store app (new)** type is implemented on the WinGet client / `msstore` source | **UNVERIFIED** | State the documented dependency on App Installer policies (§1.6, SOURCED) and stop. Do not assert the implementation. |
| Update **cadence / check interval** for Microsoft Store apps deployed via Intune | **SOURCED (absence)** | Ship the absence as a finding. Do not invent a number, and do not borrow the IME's or EAM's. |
| Whether any Microsoft channel has since responded to winget-cli #5752 | Open + unanswered as of fetch 2026-08-19 | Re-check at plan time. A maintainer reply would change §2.2's framing but not its conclusion. |
| Whether `Repair-WinGetPackageManager -AllUsers` constitutes a supported SYSTEM-context bootstrap | **UNVERIFIED** | Microsoft documents it only for Windows Sandbox. Do not present it as an Intune pattern. |
| Whether **Win32 Store apps** have exited preview since `ms.date: 2026-06-25` | `SOURCED` as preview at that date | Re-verify before the guide ships; the label affects the governance recommendation. |
| Exact Intune **settings-catalog** names for the two Store CSPs that *are* built in (`AllowAppStoreAutoUpdate`, `DisableStoreOriginatedApps`) | `SOURCED` as **Settings Catalog** with the GP paths given; the exact settings-catalog leaf names were not confirmed in the portal | Confirm the catalog string at plan time, or cite the CSP name. |

---

## Sources

All fetched **2026-08-19** unless noted. `ms.date` / `updated_at` are the pages' own metadata as returned.

| # | URL | `ms.date` | `updated_at` | Class | Used for |
|---|-----|-----------|--------------|-------|----------|
| 1 | `https://learn.microsoft.com/en-us/intune/app-management/deployment/enterprise-app-management` | 2026-06-03 | 2026-06-24 | FIRST-PARTY | The verbatim "Does Enterprise App Management use **Winget**? / No." FAQ; EAM hosting, licensing, auto-update limits, SLOs |
| 2 | `https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store` | 2026-06-25 | 2026-07-27 | FIRST-PARTY | Microsoft Store app (new): portal path, IME prerequisite, UWP-vs-Win32 update split, Store policy interactions, `DesktopAppInstaller` recommendations, ARM64 exclusion, Win32 preview |
| 3 | `https://learn.microsoft.com/en-us/windows/package-manager/winget/` | 2026-07-19 | 2026-07-21 | FIRST-PARTY | What WinGet is; App Installer delivered/updated by the Store; the per-user registration / first-sign-in constraint; command list; `Repair-WinGetPackageManager` |
| 4 | `https://learn.microsoft.com/en-us/windows/package-manager/configuration/` | 2024-11-21 | 2025-07-24 | FIRST-PARTY | `winget configure` scope (development environment), partial-failure design, trust burden, absence of Intune/MDM/SYSTEM |
| 5 | `https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-desktopappinstaller` | 2025-03-12 | 2025-03-12 | FIRST-PARTY | The 15-setting `DesktopAppInstaller` policy CSP; ADMX-backed → custom OMA-URI; `SourceAutoUpdateInterval` "not updated in the background" |
| 6 | `https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-autopilot-policy` | 2025-06-11 | 2026-06-22 | FIRST-PARTY | *"**Microsoft Store** - only Microsoft Store apps that support WinGet are supported."*; 25-app / 10-script limits; System-context requirement during OOBE |
| 7 | `https://learn.microsoft.com/en-us/intune/app-management/deployment/deploy-windows` | 2025-10-02 | 2026-04-16 | FIRST-PARTY | Windows app-type table; user-vs-device context rules; **absence** of any WinGet mention |
| 8 | `https://learn.microsoft.com/en-us/autopilot/device-preparation/requirements` | 2025-06-11 | 2026-06-22 | FIRST-PARTY | Checked for a WinGet app-type statement — **ABSENT**; requirements page carries none |
| 9 | `https://github.com/microsoft/winget-cli/issues/5752` | opened 2025-09-26 | still open at fetch | THIRD-PARTY (community issue on a Microsoft repo) | The open, unanswered enterprise-SYSTEM-support request; author's claims quoted as claims, not as Microsoft statements |
| 10 | `websearch: "winget-cli running winget as SYSTEM context service known issue Intune Win32 app"` | n/a | n/a | THIRD-PARTY | Confirms the existence of the community-wrapper ecosystem. **No specific project or technique from this result is cited as fact.** |
| 11 | `websearch: "Intune keep third-party apps updated Enterprise App Catalog auto-update supersedence..."` | n/a | n/a | THIRD-PARTY | Corroborates §4's hierarchy; every load-bearing claim is independently SOURCED from #1 |

**Repo commands (MEASURED, 2026-08-19):**

```
grep -rniE "winget" docs --include=*.md --exclude-dir=graphify-out          -> 2 hits / 2 files
find docs -name '*.md' -not -path '*graphify-out*' | wc -l                  -> 282
ls docs/operations/patch-management/08-windows-app-updates.md               -> No such file or directory
grep -rn "Enterprise App Catalog" docs --include=*.md --exclude-dir=graphify-out -> 7 hits / 6 files
node ~/.claude/gsd-core/bin/gsd-tools.cjs query classify-confidence --provider webfetch  -> LOW
```
