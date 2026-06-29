---
last_verified: 2026-06-27
review_by: 2026-09-27
applies_to: ADE
audience: admin
platform: macOS
---

> **Platform gate:** This guide covers macOS Platform SSO configuration via Microsoft Intune.
> For Windows Autopilot setup, see [Windows Admin Setup Guides](../admin-setup-apv1/00-overview.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).

# macOS Platform SSO Setup

This guide walks an Intune administrator through configuring [Platform SSO](../_glossary-macos.md#platform-sso) on macOS using the Settings Catalog `com.apple.extensiblesso` payload in Microsoft Intune.

## Registration Approach: Decision and Alternatives

Platform SSO can register the user's account at different points in provisioning, and the macOS account can be created by different actors. **This deployment registers PSSO *during Setup Assistant* — Secure Enclave method, single-user, with the local account created by the enrollment profile.** The user reaches the desktop already PSSO-registered (no post-desktop "Registration Required" step).

**Chosen configuration:**

- **Authentication method:** Secure Enclave
- **Account creation:** the ADE [enrollment profile](02-enrollment-profile.md) (single-user — "Model A", see [Optional and Advanced Platform SSO Settings](#optional-and-advanced-platform-sso-settings))
- **Registration timing:** `Enable Registration During Setup = Enabled` (configured per the [Advanced / Optional: ADE-during-Setup-Assistant](#advanced--optional-ade-during-setup-assistant) section)
- **`Enable Create First User During Setup` is NOT set** — it is the Password-method account-creation piece and does not apply to Secure Enclave.

**Why this approach:**

- **Seamless first-run** — the user finishes Setup Assistant already registered; no post-desktop "Registration Required" notification to chase.
- **Keeps Secure Enclave** — the passwordless / phishing-resistant hardware-bound credential is retained (no switch to the Password method).
- **Single-user simplicity** — the enrollment profile owns account creation; no shared-device / login-window account-creation machinery.

**What this approach requires** (the macOS-26 ADE-during-Setup-Assistant apparatus — all mandatory):

- macOS 26 or newer
- Company Portal **5.2604.0+ deployed as a LOB app** (not VPP) — see [Step 2](#step-2-install--verify-company-portal)
- The PSSO settings-catalog policy, the Company Portal LOB app, and the enrollment profile all assigned to the **same Assigned (static) user group**
- Enrollment profile: **Await final configuration = Yes** and **Locked enrollment = Yes**
- No in-place fix for misconfiguration — recovery is **wipe + re-enroll** (see the [Advanced section](#advanced--optional-ade-during-setup-assistant))

**Alternatives considered:**

| Approach | How accounts / registration work | Why not chosen here |
|----------|----------------------------------|---------------------|
| **Standard post-enrollment registration** | Enrollment profile creates the account; PSSO registers *after* the desktop via the "Registration Required" notification | Fewer prerequisites (Company Portal 5.2404.0, no three-policy same-group rule), but the user must complete a post-desktop registration step — less seamless. Fully supported and the simplest single-user option; documented in Steps 1–4 as the alternative. |
| **PSSO creates the account (Password method)** | `Enable Create First User During Setup` synthesizes the local account from the Entra identity (password sync) during Setup Assistant | Requires switching from Secure Enclave to the **Password** method — gives up passwordless / phishing-resistant Secure Enclave. Not worth it for a single-user fleet. |
| **Shared / login-window account creation** | `Enable Create User At Login` — any org user signs in at the login window and PSSO creates their account on the fly | This is the **shared / userless** (Model B) deployment; **Conditional Access isn't supported** on shared multi-user Macs. Wrong model for single-user devices. |

> **Key distinction:** With **Secure Enclave**, PSSO does **not** create the macOS account — it only *registers* an account that the enrollment profile (or Setup Assistant) created. PSSO *creating* the account **during Setup Assistant** requires the **Password** method (`Enable Create First User During Setup`, a password-sync experience). The shared-device `Enable Create User At Login` *can* create accounts with any method including Secure Enclave (the user supplies a password at first login), but that is the **multi-user / userless** model — not single-user. So for this single-user Secure Enclave deployment, the account is always created upstream and PSSO registers it (just earlier in the flow, since registration-during-setup is on).

## End-User Sign-In Experience (Secure Enclave)

This deployment uses the **Secure Enclave** method, so set expectations clearly: the user authenticates with **Entra during enrollment and for app SSO**, but the **macOS device login itself uses a local password** (with Touch ID) — **not** a continuously-synced Entra password. Don't assume "Entra password everywhere."

| Stage | What the user does | Credential |
|-------|--------------------|------------|
| Enrollment / Setup Assistant | Signs in with Entra (modern auth) + MFA | Entra |
| PSSO registration (during setup) | Confirms Entra identity + MFA | Entra |
| Apps / websites / resources (after login) | Nothing — SSO is automatic via the Secure Enclave key (Touch ID when prompted) | Entra (hardware-bound key) |
| **macOS lock screen / FileVault unlock** | Enters their **local account password**, or uses **Touch ID** | **Local password (independent of Entra)** |

**Why the lock screen isn't the Entra password:** Secure Enclave keeps the local account password independent — *"The user's local account password isn't affected and is required to sign in to the Mac."* At first setup the local password may equal the Entra password (modern auth seeds it), but the two **drift** after any Entra password change — there is no sync. (Continuous Entra-password sign-in at the lock screen is the **Password** method, which trades away Secure Enclave's passwordless / phishing-resistance — see [Registration Approach](#registration-approach-decision-and-alternatives) and the auth-method comparison in [Configuration Profiles → Extensible SSO](03-configuration-profiles.md#extensible-sso).)

**How the login appears as the UPN:** The macOS login window shows the account's **Full Name** (display name), so set the enrollment profile's **Primary account full name = `{{username}}`** → the login window shows `jsmith@contoso.com`. Keep the **short name** as `{{partialUPN}}` (`jsmith`, clean home folder `/Users/jsmith`) and the PSSO **`Token To User Mapping > Account Name = com.apple.PlatformSSO.AccountShortName`** (which matches the short name). **Do not** use `preferred_username` here — the enrollment-profile short name can only be the UPN prefix, so `preferred_username` would mismatch it and overwrite the LAPS account name. See [Enrollment Profile → Account Settings](02-enrollment-profile.md#account-settings-local-admin-and-local-user-accounts).

### Local password lifecycle and rotation

The user's local password is a low-frequency fallback (cold-boot FileVault unlock, recovery) — Touch ID + the Secure Enclave key handle day-to-day SSO. Three distinct credentials are in play; don't conflate them:

| Credential | Managed how |
|-----------|-------------|
| **End-user local password** | Set by the user; enforce strength via a macOS Passcode policy (see [Configuration Profiles → Local Password Policy](03-configuration-profiles.md#local-password-policy-passcode)). Reset only on suspected compromise. |
| **Managed local admin (LAPS)** | Auto-generated + auto-rotated by Intune (6-month default) — break-glass only. |
| **Entra ID password** | Governed by Entra; recommended **never-expire + MFA + Entra Password Protection**. |

**Recommended (current best practice):** enforce a **strong but non-expiring** local password — solid minimum length / passphrase, block simple passwords, prevent reuse — and **do not** force periodic expiration. NIST and Microsoft advise against periodic password rotation: it pushes users toward weaker, predictable variants (`Summer2024!` → `Summer2025!`) for no real security gain. Put the security on the identity layer (MFA, Conditional Access, Entra Password Protection) and on Secure Enclave's phishing-resistance; reset the local password only on suspected compromise (recovery via the escrowed FileVault recovery key or the managed admin).

**If your compliance regime requires periodic rotation:** you can force the local password to expire (e.g. 90 days) via the macOS Passcode policy's **Password expiration (days)** setting — see [Configuration Profiles → Local Password Policy](03-configuration-profiles.md#local-password-policy-passcode). Pair it with the compensating controls above. Note this forces the *user to change* the password (it is **not** silent rotation like the LAPS admin account).

## Prerequisites

- **Entra ID:** "Users may join devices to Microsoft Entra ID" enabled (Entra admin center > Devices > Device Settings).
- **Intune role:** Policy and Profile Manager built-in role (or Device Configuration Read/Create/Update/Assign permissions).
- **MFA:** Tenant MFA enabled — users complete MFA when responding to the "Registration Required" notification during the registration step.
- **Company Portal:** Minimum version 5.2404.0 installed on target devices for the standard post-enrollment path (see Step 2).
- **macOS version:** macOS 13 minimum (macOS 14 recommended for full Platform SSO feature set). Smart Card authentication method requires macOS 14+. For Sequoia fleets: macOS 15.0–15.2 had a re-registration loop bug — fixed in macOS 15.3; upgrade to 15.3+ before deploying.

> **Account creation is owned by the enrollment profile, not this policy.** Platform SSO binds the user's Entra identity to an *existing* local account after the desktop loads — it does **not** create the user's login account. That account comes from the ADE [enrollment profile's Account Settings](02-enrollment-profile.md#account-settings-local-admin-and-local-user-accounts). If the enrollment profile has **Create a local primary account = No**, a single-user device is stranded at the managed local-admin login window with no Entra sign-in option, and PSSO is never reached. For a single-user device, set **Create a local primary account = Yes** (Account type **Standard** if a managed admin account exists), and — if you prefill the primary account name — match its short-name token to the `Token To User Mapping > Account Name` value below.

> **Registration approach (this deployment):** This build registers PSSO **during Setup Assistant** (`Enable Registration During Setup`), which additionally requires Company Portal **5.2604.0 as a LOB app**, the three-policy same-group rule, and **Locked enrollment = Yes** — see [Registration Approach: Decision and Alternatives](#registration-approach-decision-and-alternatives). The Company Portal floor below (5.2404.0) applies to the **standard post-enrollment** alternative.

### Known Silent Blockers — Resolve Before Deployment

> **Before You Deploy — Resolve These First:**
>
> The following issues cause Platform SSO registration to fail silently — no error is displayed, and the registration flow simply stalls or is blocked. Resolve all three before configuring the Settings Catalog policy.
>
> - **Remove legacy per-user MFA (DF-3):** Legacy per-user MFA (set in Azure AD per-user MFA settings, NOT Conditional Access) silently blocks Password sync PSSO registration. The webview authentication challenge cannot be completed by the PSSO registration host. No error is shown; the flow stalls. **Resolution:** Disable per-user MFA for all PSSO target users and use Conditional Access MFA policy instead.
>
> - **Exclude newly-enrolled devices from strict CA "require compliant device" gating during bootstrap (DF-9):** A Conditional Access policy requiring "compliant device" blocks user PSSO registration on newly enrolled devices, because device compliance depends on PSSO being established first — a circular dependency. Device registration (Phase 1, silent) succeeds; user registration (Phase 2, interactive) fails with "compliant device required." **Resolution:** Temporarily exclude the enrollment device group or user group from strict CA "require compliant device" policies during the PSSO bootstrapping window; remove the exclusion after enrollment is confirmed.
>
> - **Exempt PSSO / Microsoft login endpoints from TLS break-and-inspect (DF-10):** Corporate proxies performing TLS inspection on Microsoft login endpoints break PSSO token acquisition. PSSO registration and token-refresh flows use certificate-pinned requests; a proxy injecting a non-Apple-root CA breaks these flows. **Resolution:** Exempt the following endpoints from TLS inspection: `login.microsoftonline.com`, `login.microsoft.com`, `sts.windows.net`. Alternatively, use Tenant Restrictions v2 client-side signaling instead of proxy header injection.

## Steps

### Step 1: Configure Entra ID Prerequisites and Network Requirements

Before creating any Intune policy, confirm the following in the Entra admin center:

1. Navigate to **Entra admin center** > **Devices** > **Device Settings**.
2. Confirm "Users may join devices to Microsoft Entra ID" is set to **All** (or the appropriate scoped group).
3. Confirm the Intune admin account has Policy and Profile Manager permissions or equivalent Device Configuration permissions.

**CA exclusion (DF-9 point-of-use):** If your tenant has Conditional Access policies requiring "compliant device," create a CA exclusion for newly enrolling devices or users for the duration of the PSSO bootstrapping window. See the [Known Silent Blockers](#known-silent-blockers--resolve-before-deployment) callout above for the circular-dependency detail.

**Network requirements (DF-10 point-of-use):** Confirm with your network team that TLS break-and-inspect is disabled for the following PSSO endpoints: `login.microsoftonline.com`, `login.microsoft.com`, `sts.windows.net`. See the [Known Silent Blockers](#known-silent-blockers--resolve-before-deployment) callout above for proxy exemption details.

**Assignment rule — user groups only:** The Platform SSO Settings Catalog policy must be assigned to **user groups**, NOT device groups and NOT filters on device groups. Microsoft explicitly states this is not supported for devices with user affinity and can result in users being unable to access Conditional Access–protected resources.

### Step 2: Install / Verify Company Portal

Platform SSO requires Company Portal (the Microsoft Enterprise SSO plug-in is bundled inside it) to be installed and running on the device before registration can succeed.

- **Minimum version for standard post-enrollment PSSO:** 5.2404.0
- Deploy via Intune as a managed app (DMG/PKG line-of-business app), or verify existing deployment meets the version floor.
- Verify: Open Company Portal on a test device and confirm version ≥ 5.2404.0 under About. If deploying the advanced ADE-during-Setup-Assistant path, see the [Advanced / Optional: ADE-during-Setup-Assistant](#advanced--optional-ade-during-setup-assistant) section at the end of this guide — that path requires Company Portal 5.2604.0 or newer (LOB app, NOT VPP).

> **Deploy to the device — install target and assignment target are distinct:** The **install target is the device** — Company Portal carries the Microsoft Enterprise SSO plug-in, which Apple requires to be *present on the device* for Platform SSO to function. The end user never has to open or sign in to Company Portal — per Microsoft, "it just needs to be installed on the device." Deploy it as a **Required** app.
>
> The **assignment target** governs which devices receive Company Portal — choose based on your fleet type:
>
> - **Standard fleets (with user affinity):** assign Company Portal as Required to the **same user groups** as the Platform SSO Settings Catalog policy (Step 4), so the app and the policy land together. (This is also the rule for the ADE-during-Setup-Assistant path — see the three-policy same-group rule in the Advanced section.)
> - **Shared / user-less Macs** (enrolled without user affinity): assign Company Portal to **device groups** instead — there is no user to target.
>
> Note that an **older Company Portal version causes Platform SSO to fail** — pair the assignment with the version floor above.

### Step 3: Create the Settings Catalog Policy

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Platform:** macOS > **Profile type:** Settings catalog > **Configuration settings** > Add settings > **Authentication** > **Extensible Single Sign On (SSO)**

The payload is `com.apple.extensiblesso`. Select and configure the following fields:

| Field | Value | Scope |
|-------|-------|-------|
| Extension Identifier | `com.microsoft.CompanyPortalMac.ssoextension` | All |
| Team Identifier | `UBF8T346G9` | All |
| Type | `Redirect` | All |
| Registration Token | `{{DEVICEREGISTRATION}}` | All — copy-paste including both sets of braces; exact case required |
| Screen Locked Behavior | `Do Not Handle` | All |
| Platform SSO > Token To User Mapping > Account Name | `com.apple.PlatformSSO.AccountShortName` | All (recommended — see Account Name token note after table) |
| Platform SSO > Token To User Mapping > Full Name | `name` | All |
| Platform SSO > Use Shared Device Keys | Enabled | macOS 14+ |
| Authentication Method (Deprecated) | `Password` or `UserSecureEnclaveKey` | macOS 13 only — see dual-field table below |
| Platform SSO > Authentication Method | `Password`, `UserSecureEnclaveKey`, or `SmartCard` | macOS 14+ — see dual-field table below |
| Platform SSO > FileVault Policy | `AttemptAuthentication` | macOS 15+; Password method only |
| Platform SSO > Non Platform SSO Accounts | Managed local admin account name(s), e.g. `admin` | Recommended whenever the enrollment profile creates a managed admin — see note after table |
| URLs | See URL list below | All |

**Required URLs — standard cloud:**

- `https://login.microsoftonline.com`
- `https://login.microsoft.com`
- `https://sts.windows.net`

**Sovereign cloud additions** (include if applicable for Azure Government / China 21Vianet):

- `https://login.partner.microsoftonline.cn`
- `https://login.chinacloudapi.cn`
- `https://login.microsoftonline.us`
- `https://login-us.microsoftonline.com`

**Per-user MFA (DF-3 point-of-use):** When selecting the authentication method, ensure legacy per-user MFA has been disabled for target users before deploying the Password sync method. See the [Known Silent Blockers](#known-silent-blockers--resolve-before-deployment) callout above.

**Account Name token — `AccountShortName` vs `preferred_username` (point-of-use):** The `Token To User Mapping > Account Name` field accepts two alternative values; pick **one**. This controls what string becomes the macOS local account's short name and where that string comes from:

| Value | What becomes the macOS account short name | Use when |
|-------|-------------------------------------------|----------|
| `com.apple.PlatformSSO.AccountShortName` (recommended) | An **Apple token** — macOS derives the name from the **UPN prefix**: `jsmith@contoso.com` → `jsmith` | Default. Produces clean short names and is the value most likely to **match an existing local account**, so PSSO binds to it instead of creating a second account. Required value for the ADE-during-Setup-Assistant path. |
| `preferred_username` | The literal **Entra ID `preferred_username` claim value**, used verbatim — typically the full UPN (`jsmith@contoso.com`) | Only when the macOS account name must equal the exact Entra claim. ⚠️ On the ADE path this value **overwrites the macOS LAPS account name** — the LAPS `SamAccountName` is ignored. |

This mapping is consumed **only at account creation** — changing it later does NOT rename existing local accounts; it affects only newly created ones. **Scope note:** a short-name mismatch produces a duplicate/second account only in the flows where PSSO *creates* the account — `Enable Create User At Login` (shared device) and ADE-during-Setup-Assistant. In the **standard post-enrollment** path (this guide's default), PSSO registers the account the user is already signed into, so an exact match isn't strictly required there — but keeping the short name equal to the UPN prefix is good hygiene and future-proofs you for the create flows.

**Exclude the managed admin from Platform SSO (`Non Platform SSO Accounts`):** If your ADE [enrollment profile](02-enrollment-profile.md#account-settings-local-admin-and-local-user-accounts) creates a managed local administrator account (e.g. `admin`), list that account name in the **Non Platform SSO Accounts** field. Per Microsoft, accounts in this list aren't prompted to register for Platform SSO and are exempt from the `FileVaultPolicy`, `LoginPolicy`, and `UnlockPolicy` — which is exactly what you want for a break-glass admin. Omitting it lets the break-glass account get entangled in PSSO registration and FileVault prompts.

#### Mixed-Fleet Dual-Field Configuration (prevents Error 10001)

In a mixed macOS 13 + 14+ fleet, a single Settings Catalog policy **must configure both** the deprecated macOS 13 field and the macOS 14+ field. Configuring only the macOS 14+ field causes Error 10001 on all macOS 13 devices.

| | macOS 13 | macOS 14+ |
|--|----------|-----------|
| **Field** | `Authentication Method (Deprecated)` | `Platform SSO > Authentication Method` |
| **Supported values** | `Password`, `UserSecureEnclaveKey` (no SmartCard on macOS 13) | `Password`, `UserSecureEnclaveKey`, `SmartCard` |
| **Supports SmartCard** | No | Yes |
| **Failure if missing** | Error 10001 on macOS 13 devices | macOS 14+ devices miss Platform SSO sub-settings |

Both fields must be present in the **same policy**. Microsoft Learn documents Error 10001 as: "This error can occur if you didn't configure a required setting in the settings catalog profile, or you configured a setting in the settings catalog profile that isn't applicable for the redirect type payload." In the mixed-fleet context, the missing `Authentication Method (Deprecated)` for macOS 13 is the direct cause.

### Step 4: Assign the Policy to User Groups

#### In Intune admin center

1. In the Settings Catalog policy, select **Assignments**.
2. Under **Included groups**, add the target **user groups**.
3. Do NOT assign to device groups or use filters on device groups — this is not supported for Platform SSO on devices with user affinity and will result in users being unable to access CA-protected resources.
4. Select **Save**.

## Verification

- [ ] Intune portal: navigate to **Devices** > **Configuration** > [profile name] > **Device status** — status shows **Succeeded** for enrolled devices.
- [ ] Device-side: open Terminal and run `app-sso platform -s`. Confirm the output shows:
  - `Device Registration: REGISTERED`
  - `User Registration: REGISTERED`
- [ ] Device-side: navigate to **System Settings** > **Privacy and security** > **Profiles** — confirm a profile named or containing `com.apple.extensiblesso Profile` is listed.
- [ ] Company Portal version ≥ 5.2404.0 confirmed on at least one enrolled test device.
- [ ] User-group assignment confirmed (not device-group assignment) in policy Assignments tab.
- [ ] If the enrollment profile creates a managed local admin: that account name is listed in `Non Platform SSO Accounts`.
- [ ] Registration-during-setup (this deployment): the device reaches the desktop **already registered** (no post-desktop "Registration Required" prompt), and `app-sso platform -s` shows `User Registration: REGISTERED` at first sign-in.
- [ ] Registration-during-setup: Company Portal **5.2604.0+ as a LOB app**, and the PSSO policy + Company Portal LOB + enrollment profile are all assigned to the **same Assigned (static) user group**.

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| Only macOS 14+ `Platform SSO > Authentication Method` configured on mixed fleet (no deprecated field) | Intune | Error 10001 on macOS 13 devices | `35-macos-sso-sign-in-failure.md` (Phase 80) |
| Legacy SSO app extension profile still assigned alongside Platform SSO Settings Catalog policy | Intune | Error 10002; PSSO registration suppressed | `35-macos-sso-sign-in-failure.md` (Phase 80) |
| `{{DEVICEREGISTRATION}}` registration token mistyped or missing braces | Intune | Profile deploys successfully but no "Registration Required" notification appears; registration never starts | `35-macos-sso-sign-in-failure.md` (Phase 80) |
| Authentication method changed on existing policy applied to enrolled fleet | Intune | Fleet-wide re-registration triggered for all users | — |
| Enrollment profile `Create a local primary account = No` on a single-user device | Intune (enrollment profile, not this policy) | Device stuck at managed local-admin login after Setup Assistant; no Entra sign-in option; PSSO never reached. Requires profile fix + wipe/re-enroll | [Enrollment Profile → Account Settings](02-enrollment-profile.md#account-settings-local-admin-and-local-user-accounts) |
| Prefilled primary account short name ≠ `Token To User Mapping > Account Name` value (create-user-at-login / ADE-during-Setup flows only) | Intune / device | Duplicate second local account created when PSSO provisions the account (not applicable to the standard post-enrollment path, which binds the signed-in account) | [Enrollment Profile → Account Settings](02-enrollment-profile.md#account-settings-local-admin-and-local-user-accounts) |
| Managed local admin account omitted from `Non Platform SSO Accounts` | Intune | Break-glass admin prompted to register for PSSO and subjected to FileVault/Login/Unlock policies | [Common PSSO scenarios](https://learn.microsoft.com/intune/device-configuration/settings-catalog/configure-platform-sso-scenarios-macos) |

## Optional and Advanced Platform SSO Settings

Step 3 lists the **required** Platform SSO settings. The Settings Catalog **Extensible Single Sign On (SSO)** item exposes many more options — Enable Create User At Login, the authorization modes, FileVault Policy, Extension Data, and others. **Most belong to a different deployment model** than the standard single-user flow this guide documents, so for a standard build you deliberately **leave them off**. This section explains when and why each is used.

### The two account models

Platform SSO supports two ways the macOS login account comes into existence:

| | **Model A — standard single-user (this guide)** | **Model B — login-window / shared** |
|---|---|---|
| Who creates the macOS account | The ADE [enrollment profile](02-enrollment-profile.md) (or the user, interactively in Setup Assistant) | **PSSO itself**, at the login window |
| Enrollment | With user affinity (one user per Mac) | Userless / no-affinity (shared) |
| PSSO's job | **Register** an existing account after the desktop loads | **Create + register** the account at sign-in |
| Typical use | 1 person : 1 Mac | Shared Macs — labs, frontline, hot-desks, kiosks |

**The deciding question is "who creates the macOS account," not "did we use the enrollment profile":**

| Account created by | PSSO's role | Model B settings needed? |
|---|---|---|
| Enrollment profile (pre-staged) **or** the user typing it in Setup Assistant | Register only | **No** |
| PSSO during Setup Assistant (ADE-during-Setup, macOS 26) | Create + register | **Yes** — `Enable Registration During Setup` + `Enable Create First User During Setup` (see [Advanced section](#advanced--optional-ade-during-setup-assistant)) |
| PSSO at the login window (shared devices) | Create + register | **Yes** — the full Model B stack below |

### Optional settings reference

**Account-model settings (Model B — shared / PSSO-created accounts):**

| Setting | What it does | When to use |
|---|---|---|
| Enable Create User At Login | Any org user signs in at the login window with Entra creds; PSSO creates the local account on first login | Shared / multi-user Macs (labs, frontline, hot-desks); userless enrollment |
| Enable Authorization | Switches on the authorization-mode engine the modes below depend on | Whenever you use Create User At Login / authorization modes |
| New User Authorization Mode (Standard / Admin / Groups) | Privilege granted **when** a PSSO account is first created | First user → Admin, others → Standard; or `Groups` to map an Entra group → admin at creation (≥1 Admin required before Standard) |
| User Authorization Mode (Standard / Admin / Groups) | Privilege re-evaluated **each** PSSO sign-in | `Groups` mode for just-in-time admin via live Entra group membership — the one option with a plausible single-user use (advanced) |
| Use Shared Device Keys | Device-bound shared keys so multiple users share one registration | Required for shared devices; Microsoft recommends **Enabled** generally (keep it on even single-user) |

**Password-method gates (only with Authentication Method = Password, macOS 15+):**

| Setting | What it does | When to use |
|---|---|---|
| FileVault Policy (`AttemptAuthentication` / `RequireAuthentication` / `AllowOfflineGracePeriod` / `AllowAuthenticationGracePeriod`) | Verifies the **Entra** password at the **FileVault unlock** screen; grace-period variants bound how long a Mac stays unlockable **offline** before re-checking with Entra | Password method; enforce online password re-validation (e.g. cut off a disabled account) |
| LoginPolicy / UnlockPolicy | Same idea for the **login window** and **lock-screen unlock** | Password method |

> **Not the disk-encryption FileVault.** PSSO **FileVault Policy** only governs Entra-password verification at unlock; it does **not** enable or configure encryption — that is the separate **Full Disk Encryption** policy in [Configuration Profiles](03-configuration-profiles.md) (deployed to **devices**). With the **Secure Enclave** method these password gates don't apply at all.

**Cross-cutting (apply to any model):**

| Setting | What it does | When to use |
|---|---|---|
| Non Platform SSO Accounts | Excludes listed local accounts (e.g. the managed `admin`) from PSSO registration + FileVault/Login/Unlock policies | **Recommended** whenever the enrollment profile creates a managed admin |
| Account Display Name | The org name shown in PSSO prompts/notifications | Optional, cosmetic |

**Add-on scenarios (via the `Extension Data` key/value setting — independent of the account model):**

| Scenario | Key(s) | When to use |
|---|---|---|
| On-prem AD Kerberos SSO | `custom_tgt_setting` (0–3) | SSO to on-premises AD Kerberos resources (file shares, legacy apps) |
| Force Touch ID for the Secure Enclave key | `enable_se_key_biometric_policy` | Secure Enclave method + require Touch ID whenever the key is accessed |
| SSO for non-Microsoft apps | `AppPrefixAllowList`, `browser_sso_interaction_enabled`, `disable_explicit_app_prompt` | Extend SSO beyond Microsoft apps; migrating from the legacy Enterprise SSO extension |

> **Standard single-user Secure Enclave build — leave these off.** With a single user, an account created by the enrollment profile (or interactively in Setup Assistant), and the Secure Enclave method, you do **not** configure the Model B settings (Create User At Login, Enable Authorization, authorization modes) or the Password-method gates (FileVault / Login / Unlock Policy). The only optional settings worth setting are **Non Platform SSO Accounts** (exclude the managed admin) and, optionally, **Account Display Name**. Reach for the rest only if you move to **shared devices**, **zero-touch during-Setup-Assistant** provisioning, or the **Password** auth method.

## See Also

- [Platform SSO](../_glossary-macos.md#platform-sso)
- [Secure Enclave](../_glossary-macos.md#secure-enclave)
- [Enterprise SSO Plug-in](../_glossary-macos.md#enterprise-sso-plug-in)
- [Configuration Profiles](03-configuration-profiles.md)
- [Enrollment Profile Configuration](02-enrollment-profile.md) -- Account Settings here create the local account PSSO binds to (single-user devices need `Create a local primary account = Yes`)
- [macOS ADE Lifecycle Overview](../macos-lifecycle/00-ade-lifecycle.md)
- [PSSO Provisioning Walkthrough](../macos-lifecycle/01-psso-provisioning-walkthrough.md) -- End-to-end operator walkthrough from enrollment profile through Platform SSO registration (standard post-enrollment and ADE-during-Setup-Assistant paths)
- [macOS Capability Matrix — Authentication](../reference/macos-capability-matrix.md#authentication) -- macOS vs Windows auth-method capability comparison and hardware/version gates

---

## Advanced / Optional: ADE-during-Setup-Assistant

> **ADE-only path:** The following section covers Platform SSO registration during Setup Assistant — an advanced, optional configuration that requires Automated Device Enrollment (ADE / Apple Business Manager). This is NOT a supervised-only feature; it requires ADE specifically because PSSO must register before the user reaches the desktop. The **default and documented standard path is post-enrollment** (the user receives a "Registration Required" notification after reaching the desktop). Proceed here only if your organization requires zero-click PSSO registration during the ADE Setup Assistant flow.

> _Section provenance — `last_verified: 2026-06-20` / `review_by: 2026-09-20`. This is the highest-drift content in this guide (macOS 26 GA, Company Portal 5.2604.0); re-confirm against current Microsoft Learn / Apple documentation at each 90-day review._

**If your fleet is currently on macOS < 26:** Update devices to macOS 26 before enrolling via this path. The ADE-during-Setup-Assistant PSSO feature hard-gates at macOS 26 and will not activate on earlier versions. Perform the OS update, then proceed with the prerequisites below.

### ADE Path Prerequisites

| Requirement | Value |
|-------------|-------|
| macOS version | macOS 26 or newer (hard gate — no earlier macOS) |
| Company Portal version | 5.2604.0 or newer (LOB app, NOT VPP) |
| Enrollment method | Automated Device Enrollment via Apple Business Manager |
| Group type | Assigned (static) user groups only — NOT dynamic groups, NOT device groups |
| Three-policy same-group rule | The Settings Catalog PSSO policy, the Company Portal LOB app, and the ADE enrollment profile must all be assigned to the **same** static user groups |
| ADE enrollment profile settings | User Affinity: "Enroll with User Affinity"; Authentication: "Setup Assistant with modern authentication"; Await Final Configuration: Yes; Locked Enrollment: Yes |

### Additional Settings Catalog Fields for the ADE Path

In addition to all fields in Step 3, enable the following in the same Settings Catalog policy:

| Field Path | Value | Notes |
|-----------|-------|-------|
| Authentication > Extensible single sign-on > Platform SSO > Enable Registration During Setup | Enabled | Triggers PSSO registration during Setup Assistant. **Required for this path — all auth methods, including Secure Enclave.** |
| Authentication > Extensible single sign-on > Platform SSO > Enable Create First User During Setup | Enabled | **Password method ONLY** — the password-sync account-creation piece. **Omit on Secure Enclave / Smart Card.** |

> **Secure Enclave deployments enable only `Enable Registration During Setup`.** `Enable Create First User During Setup` synthesizes the local account from the Entra password and applies solely to the **Password** method — leave it unset with Secure Enclave. The enrollment profile (or Setup Assistant) creates the account; PSSO registers it during setup. This is the configuration described in [Registration Approach: Decision and Alternatives](#registration-approach-decision-and-alternatives).

### Smart Card Exclusion

Smart Card authentication is **not available** during the ADE-during-Setup-Assistant path. Use Secure Enclave key (recommended) or Password sync for this path.

### Recovery: Wipe and Re-Enroll

If any of the three required policies are misconfigured or missing from the correct group, there is no in-place fix. The official Microsoft recovery procedure is:

1. Unassign the PSSO policy with Enable Registration During Setup from the device; sync.
2. Update the policy to disable Enable Registration During Setup; sync.
3. If Password method: disable Enable Create First User During Setup.
4. Wipe the device.
5. Re-enroll with the corrected configuration.

There is no repair path that avoids a device wipe for this specific misconfiguration.

---

| Date | Change | Author |
|------|--------|--------|
| 2026-06-27 | Clarified Account Name token choice (`AccountShortName` vs `preferred_username` + LAPS-overwrite caveat) and Company Portal assignment target (device vs user); verified against Microsoft Learn | -- |
| 2026-06-27 | Added enrollment-profile account-creation ownership callout + two Configuration-Caused-Failures rows (`Create a local primary account = No`; prefilled short-name ≠ PSSO Account Name token) with cross-links to 02-enrollment-profile.md | -- |
| 2026-06-27 | Added `Non Platform SSO Accounts` row + break-glass-admin exclusion note; scoped the duplicate-account symptom to create-user-at-login / ADE-during-Setup flows (standard post-enrollment binds the signed-in account); verified against Microsoft Learn | -- |
| 2026-06-27 | Added "Optional and Advanced Platform SSO Settings" section: two account models (Model A vs Model B), "who creates the account → which settings" decision table, per-setting reference (Create User At Login / authorization modes / Use Shared Device Keys / FileVault-Login-Unlock Policy / Non PSSO Accounts / Extension Data add-ons), and standard-single-user-Secure-Enclave leave-off guidance; verified against Microsoft Learn | -- |
| 2026-06-27 | Added "Registration Approach: Decision and Alternatives" decision record — chosen `Enable Registration During Setup` (Secure Enclave, register-during-Setup-Assistant) with reasoning, required apparatus, and alternatives (standard post-enrollment / Password-creates-account / shared login-window) with why-not; clarified Secure-Enclave enables registration-only (not Create First User During Setup); reconciled Company Portal version per path; added during-setup verification items | -- |
| 2026-06-27 | Added "End-User Sign-In Experience (Secure Enclave)" section: per-stage credential table (Entra at enrollment/SSO vs local password at lock screen + drift caveat), UPN-via-Full-Name display guidance (keep AccountShortName, not preferred_username), and local-password lifecycle/rotation (3-credential distinction; non-expiring best practice + compliance expiration alternative + recovery); corrected the "Key distinction" overstatement (Create User At Login is not Password-only); verified against Microsoft Learn | -- |
| 2026-06-22 | Phase 81 (SSOREF-04): added E3 See Also cross-link to macos-capability-matrix.md#authentication | -- |
| 2026-06-20 | Phase 76 (PSSO-01/02/03/12): initial Platform SSO admin setup guide | -- |
