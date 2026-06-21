---
last_verified: 2026-06-20
review_by: 2026-09-20
applies_to: ADE
audience: admin
platform: macOS
---

> **Platform gate:** This guide covers macOS Platform SSO configuration via Microsoft Intune.
> For Windows Autopilot setup, see [Windows Admin Setup Guides](../admin-setup-apv1/00-overview.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).

# macOS Platform SSO Setup

This guide walks an Intune administrator through configuring [Platform SSO](../_glossary-macos.md#platform-sso) on macOS using the Settings Catalog `com.apple.extensiblesso` payload in Microsoft Intune.

## Prerequisites

- **Entra ID:** "Users may join devices to Microsoft Entra ID" enabled (Entra admin center > Devices > Device Settings).
- **Intune role:** Policy and Profile Manager built-in role (or Device Configuration Read/Create/Update/Assign permissions).
- **MFA:** Tenant MFA enabled — users complete MFA when responding to the "Registration Required" notification during the registration step.
- **Company Portal:** Minimum version 5.2404.0 installed on target devices for the standard post-enrollment path (see Step 2).
- **macOS version:** macOS 13 minimum (macOS 14 recommended for full Platform SSO feature set). Smart Card authentication method requires macOS 14+. For Sequoia fleets: macOS 15.0–15.2 had a re-registration loop bug — fixed in macOS 15.3; upgrade to 15.3+ before deploying.

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
- Deploy via Intune as a managed app (VPP from Apps and Books or as a DMG/PKG), or verify existing deployment meets the version floor.
- Verify: Open Company Portal on a test device and confirm version ≥ 5.2404.0 under About. If deploying the advanced ADE-during-Setup-Assistant path, see the [Advanced / Optional: ADE-during-Setup-Assistant](#advanced--optional-ade-during-setup-assistant) section at the end of this guide — that path requires Company Portal 5.2604.0 or newer (LOB app, NOT VPP).

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
| Platform SSO > Token To User Mapping > Account Name | `com.apple.PlatformSSO.AccountShortName` | All (recommended) |
| Platform SSO > Token To User Mapping > Full Name | `name` | All |
| Platform SSO > Use Shared Device Keys | Enabled | macOS 14+ |
| Authentication Method (Deprecated) | `Password` or `UserSecureEnclaveKey` | macOS 13 only — see dual-field table below |
| Platform SSO > Authentication Method | `Password`, `UserSecureEnclaveKey`, or `SmartCard` | macOS 14+ — see dual-field table below |
| Platform SSO > FileVault Policy | `AttemptAuthentication` | macOS 15+; Password method only |
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

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| Only macOS 14+ `Platform SSO > Authentication Method` configured on mixed fleet (no deprecated field) | Intune | Error 10001 on macOS 13 devices | `35-macos-sso-sign-in-failure.md` (Phase 80) |
| Legacy SSO app extension profile still assigned alongside Platform SSO Settings Catalog policy | Intune | Error 10002; PSSO registration suppressed | `35-macos-sso-sign-in-failure.md` (Phase 80) |
| `{{DEVICEREGISTRATION}}` registration token mistyped or missing braces | Intune | Profile deploys successfully but no "Registration Required" notification appears; registration never starts | `35-macos-sso-sign-in-failure.md` (Phase 80) |
| Authentication method changed on existing policy applied to enrolled fleet | Intune | Fleet-wide re-registration triggered for all users | — |

## See Also

- [Platform SSO](../_glossary-macos.md#platform-sso)
- [Secure Enclave](../_glossary-macos.md#secure-enclave)
- [Enterprise SSO Plug-in](../_glossary-macos.md#enterprise-sso-plug-in)
- [Configuration Profiles](03-configuration-profiles.md)
- [macOS ADE Lifecycle Overview](../macos-lifecycle/00-ade-lifecycle.md)

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
| Authentication > Extensible single sign-on > Platform SSO > Enable Registration During Setup | Enabled | Triggers PSSO registration during Setup Assistant |
| Authentication > Extensible single sign-on > Platform SSO > Enable Create First User During Setup | Enabled | Password method only |

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
| 2026-06-20 | Phase 76 (PSSO-01/02/03/12): initial Platform SSO admin setup guide | -- |
