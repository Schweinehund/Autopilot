# Feature Research — macOS Platform SSO + Secure Enclave Authentication (v1.9)

**Domain:** macOS Platform SSO, Secure Enclave authentication, legacy Enterprise SSO plug-in, and migration path — documentation for enterprise Intune/Entra ID admins and L1/L2 service desk teams.
**Researched:** 2026-06-20
**Confidence:** HIGH for all core behavioral claims — verified against Microsoft Learn docs updated 2026-05-18 to 2026-06-15 and Apple deployment guide (current). LOW-flagged items called out inline.

---

## Research Scope and Source Quality

All behavioral claims below are verified against current official sources (HIGH confidence unless flagged):

- Microsoft Learn: "Configure Platform SSO for macOS devices" (`learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos`) — updated 2026-05-18
- Microsoft Entra: "macOS Platform Single Sign-on overview" (`learn.microsoft.com/en-us/entra/identity/devices/macos-psso`) — updated 2026-06-15
- Microsoft Entra: "Join a Mac device with Microsoft Entra ID during OOBE with macOS PSSO" (`learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on`) — updated 2026-06-15
- Microsoft Entra: "Join a Mac device using Company Portal" (`learn.microsoft.com/en-us/entra/identity/devices/device-join-microsoft-entra-company-portal`) — updated 2026-06-15
- Microsoft Entra: "macOS Platform SSO known issues and troubleshooting" (`learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension`) — updated 2026-06-15
- Microsoft Entra: "Microsoft Enterprise SSO plug-in for Apple devices" (`learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin`) — updated 2026-06-15
- Microsoft Intune: "Configure macOS Enterprise SSO app extension" (`learn.microsoft.com/en-us/intune/device-configuration/templates/configure-enterprise-sso-plugin-macos`) — updated 2026-04-14
- Microsoft Entra: "Integrate macOS PSSO into your MDM solution" (`learn.microsoft.com/en-us/entra/identity/devices/macos-psso-integration-guide`)
- Apple Deployment: "Platform SSO on-demand account creation" (`support.apple.com/guide/deployment/dep7bbb05313/web`)

---

## Part 1: Platform SSO End-to-End Behavior

### 1.1 What Platform SSO Is (and What It Builds On)

Platform SSO is a Microsoft Entra feature delivered through the **Microsoft Enterprise SSO plug-in** (which lives inside the Intune Company Portal app on macOS). It has two components that are always deployed together when using the Settings Catalog route:

1. **Platform SSO** — binds a hardware-backed identity credential or Entra ID password to the macOS login experience, so the device itself becomes an Entra-joined identity anchor.
2. **SSO app extension** — intercepts Microsoft identity URLs across Safari, Edge, Chrome (with extension), Firefox (with policy), and MSAL apps to silently deliver tokens after a single sign-in.

When Platform SSO is NOT used, only component 2 is deployed (the legacy SSO app extension alone). This is the key distinction between "legacy" and "Platform SSO" configurations.

### 1.2 Registration / Onboarding Flow (Step-by-Step Verified Behavior)

**Prerequisites the admin must satisfy first:**
- macOS 13.0 minimum (macOS 14 strongly recommended)
- Company Portal version 5.2404.0 or later deployed as required app
- Settings Catalog profile created with Extension Identifier `com.microsoft.CompanyPortalMac.ssoextension`, Team Identifier `UBF8T346G9`, Type = Redirect, required URLs, Registration Token = `{{DEVICEREGISTRATION}}`, and chosen auth method
- Assigned to user groups (NOT device groups on user-affinity devices — device group assignment causes Conditional Access failures per Microsoft guidance)
- Users allowed to join devices to Entra ID (Entra admin center: Devices > Device Settings > "Users may join devices to Microsoft Entra" = All or scoped group)

**Onboarding sequence after profile delivery:**

1. Device receives the Settings Catalog profile via MDM check-in (APNs).
2. A **"Registration required"** notification appears in the macOS Notification Center (top-right corner). On macOS 14, a dialog also prompts.
3. User clicks the notification and selects **Register**.
4. Depending on auth method (see Part 2), user provides credentials + MFA.
5. The SSO extension creates the appropriate credential (Secure Enclave key, or password sync, or smart card pairing) and registers the device with Entra ID.
6. The device receives a **Workplace Join (WPJ) certificate** that is hardware-bound via the SSO plug-in — this is what satisfies device-based Conditional Access.
7. The device receives a **hardware-bound Primary Refresh Token (PRT)** that silently provides tokens to apps and browsers for device-wide SSO.
8. Registration state is visible in: Settings > Users & Groups > Network Account Server (shows "Platform SSO: Registered") and via Terminal: `app-sso platform -s`

**If the notification is dismissed or missed:**
- It reappears automatically after approximately 10 minutes.
- User can trigger it by signing out and back in.
- On macOS 14+, admin can trigger repair via Settings > Users & Groups > Network Account Server > Edit > Repair.

### 1.3 Company Portal's Role During Registration

Company Portal does two distinct things for Platform SSO:

1. **Hosts the SSO extension.** The SSO extension binary (`Mac SSO Extension.appex`) lives inside Company Portal. Without Company Portal installed, the extension cannot load. Version 5.2404.0 is the minimum that includes Platform SSO support.
2. **Is the Entra device registration broker.** During PSSO registration, Company Portal acts as the Entra ID authentication broker — it handles the WPJ certificate issuance and PRT bootstrap.

Company Portal does NOT need to be actively open or signed into for SSO to work after registration. It must be installed. The distinction that matters for docs: "installed" (required for SSO) vs. "signed in" (required for initial MDM enrollment, not for ongoing SSO).

Known issue: If Company Portal is installed via a method that doesn't write the native messaging host JSON file correctly, Chrome SSO fails. Workaround is a fresh pkg install from the direct download URL, or a script to copy `com.microsoft.browsercore.json` to the Chrome NativeMessagingHosts directory.

### 1.4 What the Secure Enclave Key Actually Is

The Secure Enclave key in Platform SSO is a **hardware-bound asymmetric cryptographic key pair** generated by and stored in the device's Secure Enclave chip (T2 on Intel Macs, Apple Silicon built-in). This is referred to as the **User Secure Enclave Key** or **Platform Credential for macOS** in official docs.

Key properties (verified):
- The private key never leaves the Secure Enclave — it cannot be exported, backed up, or copied.
- The key is tied to both the device hardware and the macOS user account.
- After PSSO registration with Secure Enclave, this key serves as the phishing-resistant credential for Entra ID authentication, analogous to Windows Hello for Business.
- The key can be used as a **passkey** (WebAuthn/FIDO2) in supported browsers. AAGUID for macOS Platform Credential: `7FD635B3-2EF9-4542-8D9D-164F2C771EFC`.
- As of August 2025, Microsoft Entra ID transitioned from Apple Keychain to Secure Enclave as the default storage for device identity keys for all new device registrations.

**What the Secure Enclave key does NOT do:** It does NOT replace the local macOS account password. FileVault uses the local password as its disk unlock key, so Apple cannot allow another credential to replace it at the OS level. The local password remains unchanged in Secure Enclave mode.

### 1.5 New User at Login Window (NUAL / On-Demand Account Creation)

Platform SSO (macOS 14+) supports **on-demand account creation** — a user with no pre-existing local account can sign in at the macOS login window with their Entra ID credentials, and a local account is created automatically.

Requirements:
- macOS 14 or later
- Platform SSO configured with `Use Shared Device Keys` enabled (recommended)
- The `Token To User Mapping > Account Name` must be set to `com.apple.PlatformSSO.AccountShortName` (recommended) or `preferred_username`
- Setup Assistant must already have been completed with a local admin account; FileVault unlocked

User experience at the login window: user enters their Entra ID UPN and authenticates. A new local account is created using the UPN prefix (or full UPN depending on mapping config), and the user lands at the macOS desktop. Account privilege level (standard user vs. admin) is configurable via the `NewUserAuthorizationMode` setting.

Smart card is NOT supported for NUAL during Setup Assistant — the card must be registered after Setup Assistant completes.

### 1.6 PSSO During ADE Enrollment (EnableRegistrationDuringSetup)

Platform SSO can be configured to complete registration automatically during Automated Device Enrollment, eliminating the post-setup "Registration required" notification:

- Feature: `EnableRegistrationDuringSetup` flag in the SSO extension payload
- Requires: Setup Assistant with modern authentication + Company Portal SSO extension configured
- During ADE Setup Assistant, the user authenticates with Entra credentials — the PSSO registration completes as part of Setup Assistant — device is Entra-joined before the user reaches the desktop
- Smart card auth is NOT supported during Setup Assistant PSSO; smart card users must register after Setup Assistant completes

If misconfigured, device must be wiped and re-enrolled (no in-place fix). When Company Portal hasn't yet arrived during Setup Assistant, the "Unable to sign in" error appears; retry resolves it once Company Portal installs.

---

## Part 2: Per-Auth-Method Behavioral Differences

### 2.1 Auth Method Comparison Matrix (Verified)

| Feature | Secure Enclave | Smart Card | Password |
|---------|---------------|------------|----------|
| Passwordless (phishing-resistant) | YES | YES | NO |
| Touch ID for device unlock | YES | YES | YES |
| Can be used as passkey (WebAuthn) | YES | NO | NO |
| MFA mandatory for setup | YES | YES | NO |
| Local Mac password synced with Entra | NO | NO | YES |
| Supported on macOS 13.x | YES | NO | YES |
| Supported on macOS 14.x+ | YES | YES | YES |
| NUAL (on-demand account creation) | YES (macOS 14+) | YES (macOS 14+) | YES (macOS 14+) |
| Microsoft recommendation | RECOMMENDED | Use for PIV/CAC environments | Avoid if Secure Enclave is viable |

**Version gate summary:**
- macOS 13: Secure Enclave and Password only. Use `Authentication Method (Deprecated)` setting with values `UserSecureEnclaveKey` or `Password`.
- macOS 14+: All three methods. Use `Platform SSO > Authentication Method` setting.
- Mixed-OS fleet: Deploy BOTH authentication settings in the same profile. One profile handles both OS versions.

### 2.2 Secure Enclave Mode — Detailed Behavior

**What changes on the device:**
- A hardware-bound User Secure Enclave Key is created and registered with Entra ID.
- The local account password is NOT changed (by design — FileVault uses it).
- The device is Entra-joined (Workplace Join certificate installed, hardware-bound PRT issued).

**Day-to-day login experience:**
- After a reboot: user must enter local account password to unlock the device (FileVault requirement). Touch ID is not available until after first password unlock post-reboot.
- After initial unlock: Touch ID can be used for subsequent unlocks and for Entra ID app authentication.
- Apps and browsers silently receive tokens via the PRT — no repeated credential prompts.

**Surprising / non-obvious behaviors admins should know:**
- The Secure Enclave key is destroyed if the local account password is reset via FileVault recovery or MDM-driven recovery (because those paths don't use the current password, so the Secure Enclave cannot derive the new key from the recovery context). After such a reset, PSSO must be re-registered. This is a documented known issue.
- If `UserSecureEnclaveKeyBiometricPolicy` is enabled (optional, requires macOS 14.6+ and Company Portal 2504+), Touch ID is required every time the key is accessed — there is NO password fallback for Entra auth. Users without enrolled Touch ID cannot authenticate to Entra ID at all.
- The Platform Credential AAGUID (`7FD635B3-2EF9-4542-8D9D-164F2C771EFC`) must be added to the FIDO2 allowed-AAGUID list in Entra if key restrictions are applied to the FIDO2 policy.
- Re-registration is required if the admin changes `Authentication Method` or `Use Shared Device Keys` in the policy.

### 2.3 Password Sync Mode — Detailed Behavior

**What changes on the device:**
- The local account password is replaced with (and kept in sync with) the user's Entra ID password.
- The local account username does NOT change.
- The device is Entra-joined (same WPJ certificate + PRT as Secure Enclave mode).

**Day-to-day login experience:**
- User signs in with their Entra ID password at the macOS login window — same password they use for Office 365, Teams, etc.
- Touch ID works for device unlock after initial password entry.
- After password sync is established, the OLD local password no longer works.

**Surprising / non-obvious behaviors admins should know:**
- If the user's Entra ID password changes (e.g., SSPR), they have up to 4 hours before the Mac prompts for the new password.
- If SSPR is done on a different machine, the user can still unlock the Mac with EITHER the old OR the new password for a transition period. Using the old password triggers a "set new password" prompt. Using the new password syncs immediately.
- Temporary passwords issued by IT during password reset CANNOT be synced to the Mac via Platform SSO. User must complete the password reset flow using SSPR on the device itself.
- Intune password complexity policy and Entra ID password policy MUST match. Mismatch causes silent sync failure.
- Per-user MFA (legacy per-account MFA, not Conditional Access MFA) causes password sync failure during PSSO setup. Admins must migrate to Conditional Access MFA before deploying password sync PSSO.
- macOS 15+ only: The new Entra ID password works at the FileVault unlock screen when the device boots (FileVault Policy setting `AttemptAuthentication` enables this; requires adding `Platform SSO > FileVault Policy` to the Settings Catalog profile).
- Optional: Enable KeyVault recovery (Institutional FileVault Recovery Key) so IT can recover data if a user forgets the synced password.

### 2.4 Smart Card Mode — Detailed Behavior

**What changes on the device:**
- The smart card certificate + PIN are used as the primary authentication factor for both device login and Entra ID app authentication.
- The local account password is NOT changed (same as Secure Enclave — FileVault still uses it).
- The device is Entra-joined (WPJ certificate + hardware-bound PRT).

**Prerequisites (more complex than other methods):**
1. Microsoft Entra Certificate-Based Authentication (CBA) must be enabled in Entra ID and configured with the issuing CA(s).
2. A valid X.509 certificate must be loaded on the smart card (PIV-compatible).
3. The smart card must be paired with the local macOS account BEFORE PSSO registration — this is a manual step using terminal commands: `sc_auth identities`, `sudo sc_auth pair -h <HASH> -u <USERNAME>`, `sc_auth list`.
4. Supported hardware: PIV-compatible smart cards (e.g., YubiKey 5 Series, CAC cards) and compatible readers.
5. macOS 14+ required for smart card PSSO.

**Day-to-day login experience:**
- User inserts smart card (or taps NFC token) and enters PIN to unlock device and authenticate to apps.
- After reboot, local password is still required for initial FileVault unlock (keychain access). Smart card PIN replaces password for subsequent unlocks.
- Touch ID works as an alternative to smart card PIN for device unlock post-reboot.

**Surprising / non-obvious behaviors admins should know:**
- Smart card PSSO is NOT supported for NUAL during Setup Assistant (post-Setup-Assistant registration only).
- The smart card must be physically paired with the local account beforehand — this is an IT-attended step (or scripted via MDM), not something users can self-serve without admin elevation.
- Entra CBA configuration is a separate admin prerequisite with its own CA trust and policy setup — it is NOT automatically configured when deploying the PSSO profile.

---

## Part 3: Legacy Microsoft Enterprise SSO Plug-in

### 3.1 What the Legacy SSO App Extension Does

The "legacy" configuration refers to deploying the SSO app extension WITHOUT Platform SSO — using Intune's **Device Features template** (Templates > Device features > Single sign-on app extension type: Microsoft Entra ID) rather than the Settings Catalog with Platform SSO settings.

**What it provides:**
- Single sign-on to apps and websites that use Microsoft Entra ID for authentication (Microsoft 365 apps, Safari, Edge, Chrome with extension, Firefox with policy, MSAL-based apps).
- Intercepts Microsoft identity URLs and provides silent tokens after the user has bootstrapped the extension by signing in once.

**What it does NOT provide (vs. Platform SSO):**
- Does NOT bind the macOS login credential to Entra ID — the local account and Entra ID are separate identities.
- Does NOT join the device to Entra ID (no WPJ certificate, no hardware-bound PRT).
- Does NOT enable passwordless login, Touch ID at the Entra level, or passkeys.
- Does NOT support NUAL (new user at login window).
- Does NOT provide Secure Enclave hardware-bound credentials.
- Provides only partial Conditional Access device compliance (device enrollment must be separately complete; no hardware device identity anchor).

**OS support:** macOS 10.15+ (much older baseline than Platform SSO's 13.0+).

**Bootstrap flow:** User opens any Microsoft app or Safari, signs in with Entra credentials once, the SSO extension caches a token, subsequent apps and browser sessions silently authenticate.

**Technical mechanism:** Redirect-type SSO extension intercepting `login.microsoftonline.com`, `login.microsoft.com`, `sts.windows.net` (and sovereign cloud equivalents). Extension identifier: `com.microsoft.CompanyPortalMac.ssoextension`, Team Identifier: `UBF8T346G9`. Same identifiers as Platform SSO — the difference is the absence of Platform SSO settings in the payload.

### 3.2 Kerberos SSO Extension (Separate Concern)

The **Kerberos SSO extension** is a DIFFERENT extension type (Kerberos payload type, not Redirect). It provides SSO to on-premises Active Directory resources using Kerberos tickets. It is:
- Deployed as a separate profile with payload type Kerberos (vs. SSO/Redirect for the Microsoft Entra plug-in).
- Can coexist on the same device as the Microsoft Entra redirect SSO extension or Platform SSO — they are separate payloads.
- Used for on-premises AD resources (file shares, legacy apps using Kerberos) — NOT for Entra ID authentication.

When admins need both on-premises Kerberos SSO AND Entra ID SSO/PSSO, they deploy both profiles separately. Platform SSO also includes optional built-in Kerberos SSO capability (via additional settings in the same Platform SSO profile) for environments that need both cloud and on-premises SSO in a single profile.

### 3.3 Legacy vs. Platform SSO Decision Matrix

| Decision Criterion | Use Legacy SSO App Extension | Use Platform SSO |
|-------------------|------------------------------|-----------------|
| macOS version floor | 10.15+ | 13.0+ (14+ recommended) |
| Device Entra join required | NO | YES |
| Passwordless / phishing-resistant auth | NO | YES (Secure Enclave or Smart Card) |
| Touch ID for Entra auth | NO | YES |
| Passkey (WebAuthn) support | NO | YES (Secure Enclave only) |
| NUAL (new user at login window) | NO | YES (macOS 14+) |
| Synced Mac + Entra password | NO | YES (Password sync method) |
| Conditional Access device compliance | Partial (enrollment required separately) | YES (WPJ cert + PRT enables device CA) |
| Zero Trust / NIST AAL2+ | NO | YES (Secure Enclave meets phishing-resistant MFA) |
| Admin setup complexity | LOW | MEDIUM-HIGH |
| Shared/kiosk Mac scenarios | LIMITED | YES (NUAL + Shared Device Keys) |
| Mixed macOS 10.15-12 in fleet | MUST use legacy | N/A (PSSO not supported below 13.0) |

**Concrete guidance:**
- Use Platform SSO for any fleet running macOS 13+ where the org has Entra ID and wants device-based Conditional Access, passwordless, or simplified credential management.
- Use legacy SSO app extension ONLY for macOS 10.15-12 devices or as a temporary bridge while migrating.
- Platform SSO INCLUDES the SSO app extension — configuring Platform SSO via the Settings Catalog automatically provides both. The legacy Device Features template provides only the SSO app extension.

### 3.4 Migration from Legacy SSO Extension to Platform SSO

**Can they coexist? Officially: NO (conflict risk).**

Per Microsoft documentation, having both a legacy SSO app extension profile (Device Features template) AND a Platform SSO profile (Settings Catalog) causes error `10002: multiple SSOe payloads configured`. The Intune guidance (Step 7 of the Platform SSO setup) explicitly states: unassign any existing SSO app extension profiles once you confirm the Settings Catalog policy is working.

**Recommended migration sequence:**

1. Deploy Platform SSO Settings Catalog profile to a PILOT group (separate from devices currently using legacy profile).
2. Validate PSSO registration completes for pilot devices. Confirm error `10001`/`10002` is absent.
3. Confirm SSO works in browsers and apps on pilot.
4. For remaining devices: assign the PSSO Settings Catalog profile AND simultaneously unassign the legacy Device Features template profile to the same group. Do NOT overlap.
5. On existing enrolled devices, after receiving the PSSO profile, users see the "Registration required" notification. The old SSO extension registration is replaced by the PSSO registration.
6. Confirm Platform SSO status: Settings > Users & Groups > Network Account Server > Registered.
7. For devices that had a Workplace Join key in Keychain (from the legacy SSO extension's device registration), the key should be removed after successful PSSO registration — verify via the Intune PSSO troubleshooting guide's device migration section.

**What can break during migration:**
- Devices on macOS 12 or earlier: PSSO profile installs but PSSO registration fails silently (no error displayed, registration does not complete). These devices need the legacy profile retained or be upgraded first.
- Profile conflict window: If both profiles briefly coexist on the device during policy sync, error 10002 appears and SSO stops working temporarily. Minimize this window by staging the swap carefully.
- Chrome SSO: After migration, Chrome may lose SSO until the `com.microsoft.browsercore.json` native messaging host file is present. See the Chrome troubleshooting workaround (copy or reinstall Company Portal).
- Edge SSO: Users must be signed in to their Edge profile for browser SSO to work after PSSO registration. This is a behavior change from the legacy extension where Edge SSO did not require profile sign-in.

---

## Feature Landscape

### Table Stakes

Features admins and L1/L2 teams assume are documented. Missing these = documentation feels incomplete and admins escalate.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Platform SSO admin setup (Settings Catalog paths, required fields) | Every macOS 14+ deployment now needs PSSO; existing stub is ~50 words | MEDIUM | Settings Catalog profile, 12 required settings, version split macOS 13 vs 14+ |
| End-to-end registration flow (admin perspective) | Admins must know what users will experience to support them | LOW | "Registration required" notification, MFA, WPJ cert, PRT |
| End-to-end registration flow (user perspective) | L1 must be able to walk users through this | LOW | Step-by-step per auth method; 3 tabs of different UX |
| Auth method selection rationale | Admins must choose BEFORE deploying — cannot easily change post-deploy | MEDIUM | Comparison table; Microsoft recommends Secure Enclave |
| Secure Enclave mode behavior | Most recommended method; admins need to know what changes and what does not | MEDIUM | Local password stays; Touch ID post-reboot; PRT for device-wide SSO |
| Password sync mode behavior | Common starting point for orgs not ready for passwordless | MEDIUM | Password sync timing; complexity policy match requirement; FileVault interaction |
| Company Portal role (install vs. sign-in distinction) | Common misconception that CP must be signed in for SSO | LOW | CP must be installed (version gate); registration uses CP as broker |
| Registration verification (Terminal command) | L1/L2 must be able to confirm successful registration | LOW | `app-sso platform -s`; Settings > Users & Groups > Network Account Server |
| Entra prerequisites for PSSO | Admins must configure Entra side before deploying Intune profile | MEDIUM | Device join permissions; Conditional Access MFA (not per-user MFA) |
| L1 runbook: "Registration required" notification not appearing | Most common L1 call after PSSO deployment | LOW | Wait 10 min; sign out/in; Repair flow on macOS 14+ |
| L2 runbook: PSSO registration failure investigation | Sign-in logs, `app-sso platform -s`, sysdiagnose collection | HIGH | TLS inspection exclusions; multiple error sources |
| Legacy Enterprise SSO plug-in — what it is and when to keep it | Many existing deployments have this; admins need to understand what they have | MEDIUM | Device Features template vs. Settings Catalog; macOS 10.15+ baseline |
| Legacy-to-Platform-SSO migration guide | Mixed fleets; admins need safe migration path | MEDIUM | Coexistence = error 10002; staged rollout required |
| Glossary entries (Platform SSO, Secure Enclave, WPJ, PRT, SSO app extension) | Existing glossary lacks these; new terminology throughout v1.9 docs | LOW | Approximately 5-8 new entries |
| Capability matrix updates (auth methods, hardware/version support) | Existing matrix has no auth-method rows | LOW | macOS 13/14/14.6 version gates; T2 vs. Apple Silicon note |

### Differentiators

Deep value that distinguishes this doc set from generic "follow the wizard" guidance.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Per-auth-method behavioral deep-dive (what changes, what surprises) | Admins cannot find this consolidated anywhere; they have to synthesize 6+ docs | HIGH | Especially: Secure Enclave does NOT change local password; FileVault interaction; Password sync complexity mismatch failure; Smart card prereq chain |
| Secure Enclave + FileVault interaction explanation | Persistent L2 misconception: "why doesn't PSSO replace the login password?" | MEDIUM | Design constraint documented clearly; Touch ID post-reboot unlock flow |
| Smart card mode prerequisite chain | Smart card PSSO has 5 prerequisites admins must hit in order; Apple CBA is a separate Entra admin task | HIGH | CBA must be enabled in Entra; sc_auth pairing is manual/scripted; macOS 14+ only; not supported during Setup Assistant |
| NUAL (on-demand account creation at login window) | Enables shared/kiosk/hoteling Mac scenarios without pre-created local accounts | MEDIUM | macOS 14+ only; Shared Device Keys required; `com.apple.PlatformSSO.AccountShortName` mapping |
| PSSO during ADE (EnableRegistrationDuringSetup) | Zero registration prompts post-enrollment; streamlined fleet onboarding | HIGH | ADE + modern auth + Company Portal SSO extension required; smart card excluded; wipe-to-fix if misconfigured |
| UserSecureEnclaveKeyBiometricPolicy (Touch ID enforcement) | High-security orgs that need Touch ID mandatory for every Entra auth; meets NIST AAL2+ biometric requirements | MEDIUM | macOS 14.6+ and CP 2504+; NO password fallback — must plan for users without Touch ID; admin-driven re-registration required to enable post-initial-deploy |
| Passkey (FIDO2) from Secure Enclave credential | Platform Credential as passkey in browser; phishing-resistant MFA from the Mac itself | MEDIUM | AAGUID must be added to FIDO2 policy if key restrictions in use; user must enable Company Portal in Settings > Passwords > Password Options |
| Migration sequencing rationale (why staged, what breaks in a naive swap) | Admins who try to flip both profiles at once cause SSO outage | MEDIUM | Profile conflict window; Chrome native messaging host issue; Edge profile sign-in requirement |
| Password change event and token revocation behavior | Admins need to understand what happens to users during password reset | MEDIUM | 4-hour sync window; SSPR on other machine allows old password temporarily; temp passwords cannot sync |
| Conditional Access device compliance via WPJ cert | PSSO = device becomes a CA-evaluated identity; admins configuring device-based CA need to understand this | HIGH | Dependency: PSSO registration must complete before device can satisfy device-based CA |
| Kerberos SSO co-deployment (on-premises AD + Entra) | Hybrid orgs need both; Platform SSO profile supports optional Kerberos settings | MEDIUM | Separate Kerberos profile OR built-in Kerberos settings within PSSO profile |

### Anti-Features

Things admins commonly expect Platform SSO to do that it does NOT do. Documenting these prevents support escalations.

| Anti-Feature | Why Requested | Why Wrong / What Actually Happens | What to Do Instead |
|-------------|---------------|------------------------------------|-------------------|
| PSSO replaces the local macOS login password (Secure Enclave or Smart Card mode) | Admins assume "SSO" means one password everywhere | FileVault uses the local password as disk encryption key; Apple cannot allow another credential to replace it at the firmware level. The local password stays in SE and Smart Card mode. | Communicate to users: local password is unchanged; Entra ID credential is used for apps. Password sync mode DOES sync the passwords if one-password is the goal. |
| PSSO on macOS 12 or earlier | Intune pushes the profile to any macOS device | Profile installs but PSSO registration fails silently on macOS 12 and earlier. No error is shown. Device either uses legacy SSO extension behavior (if URLs are in the payload) or gets no SSO. | Upgrade devices to macOS 13+ before deploying PSSO profile, OR scope the profile assignment to a dynamic group filtering macOS 13+ devices. |
| Deploy both legacy Device Features SSO profile AND Settings Catalog PSSO profile simultaneously | Admins want SSO "coverage" during migration | Error 10002: multiple SSOe payloads conflict. Both stop working until one is removed. | Stage the migration: validate PSSO, then unassign legacy profile before or simultaneously with assigning PSSO profile. |
| Smart card PSSO during ADE Setup Assistant | Admins want passwordless out-of-the-box for PIV users | Smart card PSSO is explicitly NOT supported during Setup Assistant. | Deploy smart card PSSO after Setup Assistant completes via Company Portal registration flow. |
| Per-user MFA enabled in Entra + Password sync PSSO | Admins enable per-user MFA before migrating to CA MFA | Per-user MFA causes password sync failure during PSSO registration setup. The registration stalls. | Migrate to Conditional Access MFA (not per-user MFA) before deploying password sync PSSO. |
| Assign PSSO profile to device groups (for user-affinity devices) | Admins follow their standard "assign everything to device groups" pattern | Devices with user affinity receive the profile but Company Portal may bypass Entra device registration, causing CA failures. Microsoft explicitly warns against this. | Assign PSSO profile to user groups (not device groups) for devices with user affinity. |
| Chrome SSO works automatically after PSSO registration | Admins expect browser SSO to "just work" | Chrome requires the Microsoft Single Sign On extension (or Chrome 135+) AND the native messaging host JSON file to be present. A Company Portal install via certain methods misses the JSON file. | Deploy the Microsoft Single Sign On extension via Intune preference file policy; ensure Company Portal is freshly installed via pkg if Chrome SSO does not work. |
| PSSO supports hybrid Entra join (on-premises AD join + Entra) | Orgs with existing hybrid AD want PSSO without re-platforming | PSSO is Microsoft Entra join ONLY. Hybrid join is explicitly not supported and not planned per Microsoft docs. | For hybrid-join macOS fleets, use the legacy SSO app extension + Kerberos SSO extension. PSSO is a migration target that requires fully cloud-based Mac management. |
| PSSO registration persists after FileVault recovery or MDM-driven password reset | Admins expect the device to "just keep working" after a recovery reset | Password resets that do not provide the current local password (FileVault recovery, MDM reset) destroy the Secure Enclave keys. PSSO registration is lost and must be redone. | Document this explicitly in the L2 runbook: after any recovery-based password reset, inform user to expect a PSSO re-registration prompt. |
| Platform SSO logs are easily readable | L2 engineers expect human-readable diagnostic output | `app-sso platform -s` is the primary diagnostic command; full investigation requires `log stream` with AppSSO subsystem, or a full sysdiagnose. | Provide specific Terminal commands and log paths in L2 runbook; document sysdiagnose collection steps. |

---

## Feature Dependencies

```
[Entra ID: Users may join devices to Entra (All or scoped)]
    └──required-before──> [PSSO Registration (any auth method)]

[Company Portal 5.2404.0+ installed as required app]
    └──required-before──> [PSSO Registration]
        └──enables──> [WPJ Certificate issuance]
            └──enables──> [Device-based Conditional Access]
        └──enables──> [Hardware-bound PRT]
            └──enables──> [App/browser SSO without repeated prompts]

[macOS 14+]
    └──required-before──> [Smart Card PSSO]
    └──required-before──> [NUAL (on-demand account creation)]
    └──required-before──> [Use Shared Device Keys setting]

[Secure Enclave PSSO registered]
    └──enables──> [Platform Credential as Passkey]
        └──requires──> [FIDO2 method enabled in Entra authentication methods]
        └──requires──> [User enables Company Portal in Settings > Passwords > Password Options]

[macOS 14.6+ AND Company Portal 2504+]
    └──required-before──> [UserSecureEnclaveKeyBiometricPolicy (Touch ID enforcement)]
        └──requires──> [Admin-driven PSSO re-registration for all existing users]

[Entra CBA enabled + CA trust configured]
    └──required-before──> [Smart Card PSSO Registration]
        └──requires──> [Smart card paired with local account via sc_auth]
            └──required-before──> [Smart Card PSSO Registration flow]

[Legacy SSO app extension profile (Device Features template)]
    └──conflicts-with──> [Platform SSO Settings Catalog profile]
        NOTE: error 10002 if both present simultaneously

[Kerberos SSO Extension (separate profile)]
    └──coexists-with──> [Legacy SSO app extension] (separate payload types; compatible)
    └──coexists-with──> [Platform SSO] (compatible; OR use built-in Kerberos settings in PSSO profile)
```

### Dependency Notes

- **PSSO requires Entra device join permissions:** If the user's account is not in the allowed set for Entra join, registration fails silently — no error is shown to the user. Admin must check Entra > Devices > Device Settings.
- **Password sync requires matching complexity policies:** Intune device password policy and Entra ID password policy must be identical. Mismatch causes silent sync failure — device appears registered but passwords stop syncing.
- **Passkey use requires passkey method enabled in Entra:** The Secure Enclave Platform Credential is a passkey, but Entra must have the FIDO2/Passkey authentication method policy enabled. If FIDO2 key restrictions are active, the macOS Platform Credential AAGUID must be allowlisted.
- **Legacy-to-PSSO migration conflicts:** Both profiles on the same device causes error 10002 and SSO stops working entirely. Staged migration (pilot group) is required to avoid fleet-wide SSO outage.

---

## MVP Definition for v1.9 Documentation

### Must Document First (Phase 75 scope — core delivery)

- [ ] Platform SSO admin setup guide — Settings Catalog paths, all required settings, version split (macOS 13 vs 14+), assignment to user groups
- [ ] Auth method selection guide — comparison table, Microsoft recommendation, decision criteria
- [ ] Secure Enclave mode deep-dive — what changes, what does not, Touch ID behavior, FileVault interaction, password-reset-destroys-SE-key warning
- [ ] Password sync mode deep-dive — what syncs, when, complexity mismatch failure, temp password limitation, FileVault Policy setting (macOS 15+)
- [ ] Registration flow (user perspective) — per-method step-by-step with UI state descriptions
- [ ] Company Portal role clarification (install vs. sign-in; version requirement; Chrome native messaging issue)
- [ ] Registration verification (Terminal + Settings UI)
- [ ] L1 runbook: "Registration required" not appearing / user cannot register
- [ ] Legacy Enterprise SSO plug-in — what it is, what it does/does not do, when to keep it
- [ ] Legacy-to-PSSO migration guide — coexistence warning, staged migration sequence, what breaks

### Add After Core (Later Phases in v1.9)

- [ ] Smart card mode deep-dive — Entra CBA prerequisites, sc_auth pairing, hardware requirements, macOS 14+ gate
- [ ] NUAL (on-demand account creation) — macOS 14+ only; Shared Device Keys; mapping config
- [ ] PSSO during ADE (EnableRegistrationDuringSetup) — enrollment-time registration; smart card exclusion; wipe-to-fix
- [ ] Passkey (FIDO2) from Platform Credential — enabling in Entra; AAGUID; user configuration
- [ ] UserSecureEnclaveKeyBiometricPolicy — macOS 14.6+ gate; no-fallback warning; admin-driven re-reg
- [ ] Kerberos SSO alongside PSSO — on-premises AD + Entra hybrid scenarios
- [ ] L2 runbook: PSSO registration failure investigation — sign-in logs, sysdiagnose, TLS inspection exclusions
- [ ] L2 runbook: Password sync failures — complexity mismatch, per-user MFA, SSPR edge cases
- [ ] Glossary entries + capability matrix rows

### Deferred (v1.10+)

- [ ] Hybrid Entra join PSSO (not supported per Microsoft; document as anti-feature only in v1.9)
- [ ] Multi-tenant PSSO scenarios (out of scope for v1.9 per PROJECT.md)
- [ ] Graph API management of PlatformCredential (`platformCredentialAuthenticationMethod` resource)

---

## Feature Prioritization Matrix

| Feature | Admin Value | L1/L2 Value | Implementation Cost | Priority |
|---------|-------------|-------------|---------------------|----------|
| Admin setup guide (Settings Catalog) | HIGH | MEDIUM | MEDIUM | P1 |
| Auth method comparison + selection | HIGH | LOW | LOW | P1 |
| Secure Enclave deep-dive | HIGH | MEDIUM | MEDIUM | P1 |
| Password sync deep-dive | HIGH | MEDIUM | MEDIUM | P1 |
| Registration flow (user perspective) | MEDIUM | HIGH | LOW | P1 |
| L1 runbook: registration not appearing | LOW | HIGH | LOW | P1 |
| Legacy SSO plug-in explanation | HIGH | MEDIUM | LOW | P1 |
| Legacy-to-PSSO migration guide | HIGH | LOW | MEDIUM | P1 |
| Smart card deep-dive | MEDIUM | LOW | HIGH | P2 |
| NUAL (on-demand account creation) | MEDIUM | LOW | MEDIUM | P2 |
| PSSO during ADE | HIGH | LOW | HIGH | P2 |
| L2 PSSO failure runbook | LOW | HIGH | HIGH | P2 |
| L2 password sync failure runbook | LOW | HIGH | MEDIUM | P2 |
| Passkey / FIDO2 from Platform Credential | MEDIUM | LOW | MEDIUM | P2 |
| UserSecureEnclaveKeyBiometricPolicy | LOW | LOW | LOW | P3 |
| Kerberos alongside PSSO | MEDIUM | LOW | MEDIUM | P3 |
| Glossary + capability matrix | MEDIUM | MEDIUM | LOW | P2 |

**Priority key:** P1 = Phase 75-76 core delivery; P2 = Phase 77+ delivery; P3 = stretch or v1.10

---

## Legacy vs. Platform SSO Decision Narrative (for Migration Guide)

**The single most important decision for mixed-fleet admins:**

If any device in the fleet runs macOS 12 or earlier, those devices CANNOT use Platform SSO. They must keep the legacy SSO app extension (or get no Microsoft SSO at all). This creates a transitional state where both config types exist in the tenant during a migration.

**The recommended transition approach:**

1. Create a dynamic Entra group scoping to macOS 13+ devices only.
2. Deploy the Platform SSO Settings Catalog profile to that group.
3. Create a second Entra group for macOS 10.15-12 devices.
4. Deploy the legacy Device Features SSO profile to that group.
5. As macOS 12 devices are upgraded to 13+, they automatically move to the PSSO group (dynamic group rule handles this), receive the PSSO profile, and trigger the "Registration required" notification.
6. When ALL devices in the fleet are on macOS 13+, retire the legacy Device Features profile.

**The Conditional Access implication of the transition:**

During the transition, macOS 12 devices using the legacy SSO app extension are NOT Entra-joined (no WPJ cert). If CA policies require device compliance, these devices fail CA. The options are: (a) exclude macOS 12 devices from device-based CA policies during transition, (b) accelerate the macOS upgrade to eliminate the transition period, or (c) tolerate the CA gap for legacy devices. This is a concrete decision admins must make — and it belongs in the migration guide.

**Hybrid Entra join is not an option:**

If admins ask "can we keep hybrid join and still use PSSO?" the answer is no. Microsoft explicitly states PSSO supports Entra join only, with no plans for hybrid join on macOS. Orgs currently hybrid-joined (e.g., using Jamf Connect with on-premises AD) that want PSSO must complete a cloud-first transition of their Mac management before PSSO is applicable.

---

## Version-Sensitive Behavior Summary

| Behavior | macOS 13 | macOS 14 | macOS 14.6 | macOS 15+ |
|----------|----------|----------|-----------|---------|
| Secure Enclave PSSO | YES | YES | YES | YES |
| Password sync PSSO | YES | YES | YES | YES |
| Smart card PSSO | NO | YES | YES | YES |
| NUAL (on-demand account creation) | NO | YES | YES | YES |
| Settings Catalog: `Authentication Method (Deprecated)` | REQUIRED | Optional (use new setting) | Optional | Optional |
| Settings Catalog: `Platform SSO > Authentication Method` | Not honored | REQUIRED | REQUIRED | REQUIRED |
| Settings Catalog: `Platform SSO > FileVault Policy` | NO | NO | NO | YES (macOS 15 only) |
| `Use Shared Device Keys` | NO | YES | YES | YES |
| UserSecureEnclaveKeyBiometricPolicy | NO | NO | YES (requires CP 2504+) | YES |
| FileVault new Entra password at boot screen | NO | NO | NO | YES (with AttemptAuthentication policy) |
| "Registration Required" Entra dialog at notification | Notification only, no dialog | YES (dialog appears) | YES | YES |
| Repair flow (Settings > Users & Groups > Network Account Server > Repair) | NO | YES | YES | YES |

**Known active bugs / issues (as of docs updated 2026-06-15):**

- macOS 15.0-15.2: Concurrency issue causes PSSO device config corruption and unexpected re-registration prompts. Apple confirmed fix in macOS 15.3. If still occurring on 15.3+, engage Apple support.
- macOS 15.3 / iOS 18.1.1: Enterprise SSO extension framework regression (PluginKit Code=16 error). Workaround: reboot the device. Apple investigating.
- Company Portal installed via certain automated methods: Chrome native messaging host JSON missing, Chrome SSO fails. Workaround: fresh pkg install or MDM script to copy JSON.
- Chrome 135+ gains automatic Enterprise SSO support without requiring the Microsoft Single Sign On extension separately.

---

## Dependencies on Existing macOS Docs

| Existing Doc | Dependency / Update Needed |
|-------------|---------------------------|
| `docs/admin-setup-macos/03-configuration-profiles.md` | Replace the ~50-word Extensible SSO stub (lines 157-168) with a cross-reference to the new Platform SSO admin setup guide. Keep the Settings Catalog nav path. |
| `docs/macos-lifecycle/00-ade-lifecycle.md` | Stage 4 mentions "On macOS 14+, this uses a native authentication broker" (line ~229). Stage 7 (Company Portal sign-in) needs a note that PSSO registration follows Company Portal enrollment and what that looks like. Add reference to new PSSO guide. |
| `docs/_glossary-macos.md` | Add: Platform SSO, Secure Enclave (PSSO context), WPJ (Workplace Join) certificate, PRT (Primary Refresh Token), SSO app extension, Enterprise SSO plug-in, NUAL, Passkey (PSSO context). |
| `docs/macos-capability-matrix.md` | Add rows: Platform SSO auth methods (SE / Password / Smart Card), macOS version gates, Touch ID for Entra, NUAL, Passkey support, Hybrid join = NO. |
| `docs/l1-runbooks/` and `docs/l2-runbooks/` | New runbooks route into existing macOS hubs; cross-link from common-issues and quick-ref-l1/l2. |

---

## Sources

- Microsoft Learn: Configure Platform SSO for macOS devices — `learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos` (updated 2026-05-18) — HIGH confidence
- Microsoft Entra: macOS Platform Single Sign-on overview — `learn.microsoft.com/en-us/entra/identity/devices/macos-psso` (updated 2026-06-15) — HIGH confidence
- Microsoft Entra: Join a Mac device with Entra ID during OOBE with macOS PSSO — `learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on` (updated 2026-06-15) — HIGH confidence
- Microsoft Entra: Join a Mac device with Entra ID using Company Portal — `learn.microsoft.com/en-us/entra/identity/devices/device-join-microsoft-entra-company-portal` (updated 2026-06-15) — HIGH confidence
- Microsoft Entra: macOS Platform SSO known issues and troubleshooting — `learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension` (updated 2026-06-15) — HIGH confidence
- Microsoft Entra: Microsoft Enterprise SSO plug-in for Apple devices — `learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin` (updated 2026-06-15) — HIGH confidence
- Microsoft Intune: Configure macOS Enterprise SSO app extension with MDMs — `learn.microsoft.com/en-us/intune/device-configuration/templates/configure-enterprise-sso-plugin-macos` (updated 2026-04-14) — HIGH confidence
- Microsoft Entra: Integrate macOS PSSO into your MDM solution — `learn.microsoft.com/en-us/entra/identity/devices/macos-psso-integration-guide` — HIGH confidence
- Apple Deployment: Platform SSO on-demand account creation — `support.apple.com/guide/deployment/dep7bbb05313/web` — HIGH confidence (macOS 14 requirement, NUAL behavior)
- Microsoft Entra: CBA on Apple devices — `learn.microsoft.com/en-us/entra/identity/authentication/concept-certificate-based-authentication-mobile-ios` (updated 2026-04-19) — HIGH confidence (smart card prerequisites)

---

*Feature research for: macOS Platform SSO + Secure Enclave Authentication documentation suite (v1.9)*
*Researched: 2026-06-20*
*Next review recommended: before Phase 75 begins or when macOS 15.x / Sequoia release notes update PSSO behavior*
