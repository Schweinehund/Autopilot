---
last_verified: 2026-06-27
review_by: 2026-09-27
applies_to: ADE
audience: admin
platform: macOS
---

> **Platform gate:** This guide covers macOS ADE configuration via Apple Business Manager and Intune.
> For Windows Autopilot setup, see [Windows Admin Setup Guides](../admin-setup-apv1/00-overview.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).

# macOS Enrollment Profile Configuration

This guide covers creating and configuring a macOS [ADE](../_glossary-macos.md#ade) enrollment profile in Intune, including user affinity, authentication method, [Await Configuration](../_glossary-macos.md#await-configuration), locked enrollment, and [Setup Assistant](../_glossary-macos.md#setup-assistant) screen customization.

## Prerequisites

- ADE token configured and active (see [ABM Configuration](01-abm-configuration.md))
- Intune Administrator role
- At least one device synced from ABM

## Steps

### Step 1: Create Enrollment Profile

#### In Intune admin center

1. Navigate to **Devices** > **Enrollment** > **Apple** > **Enrollment program tokens**.
2. Select the ADE token.
3. Select **Profiles** > **Create profile** > **macOS**.
4. Enter a profile name and description.

### Step 2: Configure User Affinity and Authentication

Configure the following enrollment settings:

| Setting | Options | Default | Notes |
|---------|---------|---------|-------|
| User Affinity | Enroll with User Affinity / Enroll without User Affinity | -- | Determines whether device is associated with a specific user |
| Authentication method (with affinity) | Setup Assistant with modern authentication (recommended) / Setup Assistant (legacy) | Modern auth | Legacy requires AD FS WS-Trust 1.3 |
| Await final configuration | Yes / No | Yes (new profiles since late 2024) | Locks device until policies apply |
| Locked enrollment | Yes / No | -- | Prevents user from removing management profile |
| Local account creation (LAPS) | Configure / Not configured | Not configured | Creates local admin account during setup |

> **What breaks if misconfigured:** Without user affinity, Company Portal will not work and user-based Conditional Access policies do not apply. Symptom appears in: Intune admin center (device shows no primary user) and Company Portal (app not functional).
> See: [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md)

> **What breaks if misconfigured:** Legacy authentication method requires AD FS WS-Trust 1.3 and is incompatible with modern Conditional Access policies. Symptom appears in: Setup Assistant (authentication failure screen).
> See: [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md)

> **What breaks if misconfigured:** Await final configuration set to No allows users to reach the desktop before policies and profiles apply, causing immediate compliance failures. Symptom appears in: device (user reaches desktop without management) and Intune admin center (non-compliant status).
> See: [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md)

> **What breaks if misconfigured:** Locked enrollment set to Yes prevents the user from removing the management profile via System Settings > Profiles. This setting cannot be changed after enrollment without a factory wipe. If set to No, the user can remove the MDM profile and become unmanaged. Symptom appears in: device (Profiles section in System Settings).
> See: [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md)

> **What breaks if misconfigured:** Misconfigured LAPS username template causes account creation failure during Setup Assistant. Link to official LAPS documentation for full configuration. Symptom appears in: Setup Assistant (error during account creation).
> See: [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md)

#### Account Settings: Local Admin and Local User Accounts

The **Account Settings** section of the enrollment profile decides *which macOS accounts exist after Setup Assistant* — and, critically, **whether the end user gets a login account at all.**

> **PSSO depends on this — read first:** In the standard single-user flow, **Platform SSO does not create the user's login account.** PSSO binds the user's Entra identity to an *existing* local account *after* the desktop loads (the "Registration Required" popup). The login account itself is created here, by the enrollment profile. If **Create a local primary account = No**, a single-user device is stranded at the managed local-admin login window with no way to sign in with Entra. See [Platform SSO Setup](07-platform-sso-setup.md).

**Local administrator account** — a managed break-glass admin ([macOS LAPS](https://learn.microsoft.com/intune/device-security/laps/setup-macos)):

| Setting | Options | When / why |
|---------|---------|------------|
| Create a local admin account | Yes / No | **Yes** to provision a managed break-glass admin. Its password is auto-generated per device, escrowed in Intune (device record > **Local admin password**), and rotated every 6 months by default. Required if the primary account is **Standard** (macOS requires ≥1 admin account). |
| Admin account username / full name | static or tokens (`{{partialUPN}}`, `{{serialNumber}}`, `{{onPremisesSamAccountName}}`, `{{managedDeviceName}}`) | Name the managed admin. Keep it generic (e.g. `admin`) and consistent across the fleet. |
| Hide in Users & Groups | Yes / Not configured | **Yes** to keep the break-glass admin off the login window and out of System Settings > Users & Groups. Recommended. |
| Admin account password rotation period (days) | blank = 6-month default / custom | Set a shorter cycle for a tighter security posture. |

> **Exclude this managed admin from Platform SSO.** Add the admin account name (e.g. `admin`) to the PSSO policy's **`Non Platform SSO Accounts`** setting so the break-glass admin isn't prompted to register for PSSO and is exempt from the FileVault/Login/Unlock policies. See [Platform SSO Setup](07-platform-sso-setup.md).

**Local user account** — the end user's primary login account:

| Setting | Options | When / why |
|---------|---------|------------|
| Create a local primary account | Yes / No | **Yes** for any single-user device — this is the account the user logs into. **No** only for shared / admin-managed Macs where users are created another way (e.g. PSSO `Enable Create User At Login`). `No` + a managed admin strands a single-user device at the admin login. |
| Account type | Standard / Administrator | **Standard** (least privilege) when a separate managed admin exists — recommended for managed fleets. **Administrator** when users need local admin (developers, self-service) or when no managed admin account is created. |
| Prefill account info | Yes / Not configured | **Not configured** (default): Setup Assistant shows the account screen prefilled from the user's Entra identity, password from the modern-auth sign-in; user can edit. **Yes**: enforce a fleet-wide naming standard via the two fields below. |
| Primary account name | static or tokens (`{{partialUPN}}`, `{{serialNumber}}`, `{{onPremisesSamAccountName}}`, `{{managedDeviceName}}`) | The macOS **short name** / home-folder name. Used only when Prefill = Yes. |
| Primary account full name | static or tokens (`{{username}}`, `{{onPremisesSamAccountName}}`, `{{serialNumber}}`) | The account **display name**. Used only when Prefill = Yes. |
| Restrict editing | Yes / Not configured | Available only when Prefill = Yes. Governs the **account name and full name only** — *not* the password. **Yes**: the name/full-name screen is skipped (user can't edit those fields). **Not configured**: prefilled name values are shown but editable. See the password-behavior note below. |

> **Why a local-password prompt can still appear (even with `Restrict editing = Yes`).** `Restrict editing` suppresses only the **name and full-name** fields. The local account **password** is auto-filled only when the Setup Assistant Microsoft Entra sign-in produced a **reusable plaintext password**. It will **not** be auto-filled — and the user is prompted to create a local password — when the sign-in is:
> - **Passwordless** — Temporary Access Pass (TAP), FIDO2 / security key, Authenticator passwordless / phone sign-in, or certificate-based auth (no password is entered, so none can be reused). Microsoft's passwordless walkthrough confirms: with a TAP, *"the user creates their local account with a local account password (which could be a PIN)."*
> - **Federated** — ADFS / third-party IdP, where the password is entered on the IdP's page rather than the Entra web view, so macOS can't capture it.
>
> This is **expected behavior, not a misconfiguration.** A fully zero-prompt account creation requires a **non-federated, password-based** Setup Assistant sign-in. Note also that Microsoft documents the fully-silent "account creation screen never appears" experience specifically for **Setup Assistant (legacy)**; with **modern authentication** the local password is tied to the Entra password sign-in. (Don't confuse this account-creation password with the later PSSO "enter your local account password" registration prompt — that one is always expected.)

> **Match the prefilled short name to your PSSO Account Name mapping.** If you set **Prefill = Yes**, set the **Primary account name to the same token your PSSO `Token To User Mapping > Account Name` resolves to.** With the recommended `com.apple.PlatformSSO.AccountShortName` (UPN prefix), use **`{{partialUPN}}`** so both produce the same short name (`john`). This matters most for the flows where PSSO *creates* the account — `Enable Create User At Login` (shared device) and ADE-during-Setup-Assistant — where a mismatch produces a **second, duplicate account**. In the **standard post-enrollment** path, PSSO registers the account the user is already signed into, so an exact match isn't strictly required there — but it remains good hygiene. See [Platform SSO Setup](07-platform-sso-setup.md).

> **What breaks if misconfigured:** `Create a local primary account = No` on a single-user (user-affinity) device leaves only the managed local admin account. The device boots to a login window showing that admin account, whose password is escrowed in Intune (not known to the user), and offers no Entra sign-in option. Fix requires editing the profile and performing a **wipe + re-enroll** — Account Settings apply only during Setup Assistant. Symptom appears in: device (login window stuck on the managed-admin account after Setup Assistant).
> See: [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md)

**Recommended for standard single-user PSSO:** Create a local admin account = **Yes** (+ Hide in Users & Groups = **Yes**); Create a local primary account = **Yes**; Account type = **Standard**; Prefill account info = **Not configured** (or **Yes** + Primary account name `{{partialUPN}}` for naming consistency that also guarantees a PSSO account match).

> **UPN-looking login:** The macOS login window displays the account's **Full Name**, not the short name. Set **Primary account full name = `{{username}}`** so the login shows `jsmith@contoso.com`, while keeping the short name as `{{partialUPN}}` (`jsmith`, home folder `/Users/jsmith`). This is the supported way to get a UPN-style login on the **Secure Enclave** method — do **not** switch the PSSO `Account Name` mapping to `preferred_username` for this (it would mismatch the short name and overwrite LAPS). See [Platform SSO → End-User Sign-In Experience](07-platform-sso-setup.md#end-user-sign-in-experience-secure-enclave).

### Step 3: Configure Setup Assistant Screens

These screens appear during the first-run experience and can be shown or hidden per organizational preference. Configure which screens users see during macOS setup.

| Screen | Min macOS Version | Recommended | Notes |
|--------|-------------------|-------------|-------|
| Location Services | 10.11 | Organization preference | |
| Restore | 10.9-15.3 | Show | macOS 15.4+: cannot be hidden; user gets an alert instead of restoration screen |
| Apple ID | 10.9 | Show | User needs for iCloud |
| Terms and conditions | 10.9 | Show | |
| Touch ID and Face ID | 10.12.4 | Show | |
| Apple Pay | 10.12.4 | Hide (configure later) | |
| Siri | 10.12 | Hide | |
| Diagnostics Data | 10.9 | Organization preference | |
| Display Tone | 10.13.6 | Show | |
| FileVault | 10.10 | Show (prompts encryption) | |
| iCloud Diagnostics | 10.12.4 | Hide | |
| Registration | 10.9 | Show | |
| iCloud Storage | 10.13.4 | Hide | |
| Appearance | 10.14 | Show | |
| Screen Time | 10.15 | Hide | |
| Privacy | 10.13.4 | Show | |
| Accessibility | 11 | Show | Hiding blocks VoiceOver on supported devices |
| Auto unlock with Apple Watch | 12.0 | Hide | |
| Terms of Address | 13.0 | Hide | |
| Wallpaper | 14.1 | Show | |
| Lockdown mode | 14.0 | Hide | |
| Intelligence | 15.0 | Organization preference | Apple Intelligence settings |
| App Store | 11.1 | Organization preference | |
| Software update | 15.4 | Show | |
| Additional privacy settings | 26.0 | Organization preference | |
| OS Showcase | 26.1 | Organization preference | |
| Update completed | 26.1 | Show | |
| Get started | 15.0 | Show | |

> **What breaks if misconfigured:** The Restore screen on macOS 15.4+ cannot be hidden -- hiding it has no effect and users receive an alert instead. The Accessibility screen hiding blocks VoiceOver on supported devices, which may create accessibility compliance issues. Symptom appears in: device (unexpected screens during Setup Assistant or blocked assistive technology).
> See: [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md)

### Step 4: Assign Profile to Devices

#### In Intune admin center

1. After saving the profile, navigate to the ADE token.
2. Select **Devices** > select devices > **Assign profile**.
3. Choose the profile created above.
4. Alternatively, set this profile as the **Default profile** on the token (recommended -- all synced devices automatically receive it).

## Verification

- [ ] Enrollment profile appears under token's Profiles tab in Intune admin center
- [ ] User Affinity setting matches organizational requirement
- [ ] Await final configuration is set to Yes (recommended)
- [ ] Authentication method is "Setup Assistant with modern authentication"
- [ ] For single-user devices: **Create a local primary account = Yes** (Account type Standard if a managed admin account exists)
- [ ] If primary-account prefill is used: short-name token matches the PSSO `Token To User Mapping > Account Name` value
- [ ] At least one device shows the profile assignment in Devices > [serial] > Profile column
- [ ] Locked enrollment set per organizational policy

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| No user affinity on user-targeted deployment | Intune | Company Portal non-functional; user CA policies not applied | [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md) |
| Legacy authentication method | Intune | Setup Assistant auth failure when modern CA policies are enforced | [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md) |
| Await Configuration = No | Intune | User reaches desktop before policies apply; immediate non-compliance | [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md) |
| Locked enrollment = No on supervised device | Intune | User can remove management profile via System Settings | [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md) |
| `Create a local primary account = No` on a single-user device | Intune | Device stuck at managed local-admin login after Setup Assistant; no Entra sign-in option; PSSO never reached. Requires profile fix + wipe/re-enroll | [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md) |
| Prefilled primary account short name ≠ PSSO `Account Name` token (create-user-at-login / ADE-during-Setup flows only) | Intune / device | Duplicate second local account created when PSSO provisions the account (standard post-enrollment binds the signed-in account instead) | [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md) |
| Hiding Accessibility screen | Intune | VoiceOver blocked on supported devices | [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md) |
| Hiding Restore screen on macOS 15.4+ | Intune | Setting has no effect; user sees alert instead | [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md) |

## See Also

- [ABM Configuration](01-abm-configuration.md)
- [Configuration Profiles](03-configuration-profiles.md)
- [Platform SSO Setup](07-platform-sso-setup.md) -- account binding depends on the primary account created here; see the Account Settings section
- [macOS ADE Lifecycle Overview](../macos-lifecycle/00-ade-lifecycle.md)
- [PSSO Provisioning Walkthrough](../macos-lifecycle/01-psso-provisioning-walkthrough.md)
- [macOS Provisioning Glossary](../_glossary-macos.md)

---

| Date | Change | Author |
|------|--------|--------|
| 2026-06-28 | Formalized Account Settings section under DEP-01; bounded spot-verify of 4 factual claims confirmed correct against Microsoft Learn (2026-06-28) | -- |
| 2026-06-27 | Added Account Settings section (local admin + local user accounts, account-type/prefill/restrict-editing guidance, PSSO account-creation ownership + short-name match); verified against Microsoft Learn | -- |
| 2026-06-27 | Added managed-admin → `Non Platform SSO Accounts` exclusion callout; scoped the duplicate-account symptom to create-user-at-login / ADE-during-Setup flows | -- |
| 2026-06-27 | Clarified `Restrict editing` governs name/full-name only (not password) + added password-prefill behavior note (passwordless/federated sign-in still prompts for a local password); verified against Microsoft Learn | -- |
| 2026-06-27 | Added UPN-looking-login note (login window shows Full Name → set `{{username}}` for `jsmith@contoso.com` display; keep short name `{{partialUPN}}`; don't switch PSSO mapping to `preferred_username`); cross-linked to Platform SSO end-user-experience section | -- |
| 2026-04-14 | Resolved Phase 24 runbook links | -- |
| 2026-04-14 | Initial version -- enrollment profile with Setup Assistant screens, enrollment settings, what-breaks callouts | -- |
