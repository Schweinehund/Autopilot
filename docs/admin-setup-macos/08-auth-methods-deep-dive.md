---
last_verified: 2026-06-21
review_by: 2026-09-21
applies_to: ADE
audience: admin
platform: macOS
---

> **Platform gate:** This guide covers macOS Platform SSO authentication methods in depth.
> For the Platform SSO setup walk-through, see [Platform SSO Setup](07-platform-sso-setup.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).

# macOS Platform SSO: Auth Method Selection & Deep-Dive

This guide helps architects and senior Intune administrators choose the right [Platform SSO](../_glossary-macos.md#platform-sso) authentication method and understand the critical interactions, constraints, and failure modes for each. It complements the setup walk-through in [Platform SSO Setup](07-platform-sso-setup.md), which covers policy creation steps.

## Auth Method Comparison

Choose your authentication method using the four dimensions below. Secure Enclave key is Microsoft's recommended method for most deployments.

| | Secure Enclave Key | Password Sync | Smart Card |
|--|-------------------|---------------|-----------|
| **Microsoft recommendation** | **Recommended (Microsoft)** | Second choice | Third choice |
| **Passwordless** | Yes | No | Yes |
| **Phishing-resistant** | Yes | No | Yes |
| **Hardware required** | Yes -- T2 Intel or Apple Silicon | No | No -- external token |
| **macOS version gate** | macOS 13+ | macOS 13+ | macOS 14+ only |

> **Selection guidance:**
>
> - **Secure Enclave key** -- Best for most organizations. Passwordless, phishing-resistant, hardware-bound, and drives device-wide SSO via a Primary Refresh Token. Requires T2 Intel or Apple Silicon hardware; pre-2018 non-T2 Intel Macs WILL fail to provision and should fall back to Password sync.
> - **Password sync** -- Use for legacy hardware that lacks a T2 chip or Apple Silicon, or for organizations not yet ready for full passwordless. The local macOS password is kept equal to the Entra password.
> - **Smart card** -- Use only when your organization already operates a PKI and has Entra Certificate-Based Authentication fully configured. Requires macOS 14+. Not available during Setup Assistant.

---

## Secure Enclave Key Method

The [Secure Enclave](../_glossary-macos.md#secure-enclave) key method stores the Platform SSO credential in the device's hardware security enclave. It is Microsoft's recommended authentication method for macOS Platform SSO.

### What the Secure Enclave Key Is and Is Not

Six non-negotiable facts that govern every admin and helpdesk decision for this method:

1. **The private key never leaves the Secure Enclave.** It cannot be exported, backed up, transferred to another device, or read by software. No key material is ever exposed outside the hardware boundary.

2. **The key is hardware-bound to a specific Mac AND a specific user account.** A key provisioned for a user on one Mac cannot be used on any other Mac, even the same user.

3. **The key generates a hardware-bound Primary Refresh Token (PRT) for device-wide SSO.** This PRT provides seamless SSO to all Entra-integrated apps and browsers without further authentication prompts at the login window.

4. **From August 2025, new Entra device registrations store the WPJ key in the Secure Enclave** (not the Login Keychain). `security find-certificate` returns false negatives for SE-stored keys. Use `app-sso platform -s` to verify registration state.

5. **FileVault does NOT use the Secure Enclave key.** See [FileVault and the Secure Enclave Key](#filevault-and-the-secure-enclave-key) below -- this is a frequently misunderstood interaction.

6. **MDM-driven or FileVault-recovery password reset destroys the Secure Enclave key.** See [SE Key Destruction Warning](#se-key-destruction-warning) below.

**Hardware scope -- which Macs support the Secure Enclave key method:**

- All Apple Silicon Macs (M1, M2, M3, M4+, 2020 and later)
- Intel Macs with Apple T2 Security Chip: MacBook Pro 2018--2020, MacBook Air 2018--2020, Mac mini 2018, iMac 2020, Mac Pro 2019
- Pre-2018 Intel Macs WITHOUT T2: **Secure Enclave auth method WILL FAIL to provision.** Recommend fallback to Password sync for these devices.

**Settings Catalog key values:**

- macOS 14+: `Platform SSO > Authentication Method` = `UserSecureEnclaveKey`
- macOS 13 (mixed fleet): also set `Authentication Method (Deprecated)` = `UserSecureEnclaveKey` (see [Platform SSO Setup](07-platform-sso-setup.md) Step 3 dual-field table)

### FileVault and the Secure Enclave Key

> **FileVault and Platform SSO -- Cold-Boot Behavior**
>
> FileVault uses the **local macOS account password** as its disk encryption key. After any reboot,
> macOS presents the FileVault unlock screen and requires this local password -- regardless of which
> Platform SSO authentication method is configured. Touch ID and SSO are only available after
> FileVault unlocks the disk and macOS loads the login window.
>
> The Secure Enclave PSSO key is a **parallel** mechanism to FileVault, not a replacement for it.
> After a cold reboot, the user must enter the local account password at the FileVault screen before
> Touch ID becomes available.
>
> This behavior is by design: Apple's FileVault disk encryption uses the local password as its unlock
> key. Platform SSO and the Secure Enclave key operate at the macOS login window layer -- a layer
> that only becomes accessible after FileVault has unlocked the disk.

This is the canonical statement of the FileVault/PSSO relationship. Other sections of this guide cross-reference this sub-section rather than restating these facts.

**Touch ID timing detail:** After cold boot: user enters local password at FileVault screen → disk unlocks → macOS loads → login window appears → Touch ID becomes available. Touch ID is NOT available at the FileVault pre-boot screen.

### SE Key Destruction Warning

> **MDM/Recovery Password Reset Destroys the Secure Enclave Key**
>
> Any password reset that bypasses the interactive macOS password-change UI destroys the derived
> Secure Enclave key and requires the user to re-register Platform SSO:
>
> - MDM-driven password reset (Intune remote action)
> - FileVault recovery key use (user or helpdesk enters the FileVault recovery key at cold boot)
>
> This is **expected behavior, not a bug.** The Secure Enclave key binding is tied to the user's
> interactive password-change flow. When the password is reset by external means, the binding is
> severed and the key becomes inaccessible.
>
> **Resolution:** The user must complete a fresh PSSO registration after the password reset. Helpdesk
> should inform users that Platform SSO will prompt for re-registration following any MDM-driven
> password reset or FileVault recovery key use.

### Touch ID Biometric Policy

> _Section provenance -- `last_verified: 2026-06-21` / `review_by: 2026-09-21`. High-drift content: Company Portal 2504 and macOS 14.6 version floor -- re-confirm against current Microsoft Learn / Apple documentation at each 90-day review._

The Touch ID biometric policy allows Secure Enclave key authentication to use Touch ID biometrics at the macOS login window. It is configured via an Extension Data key in the existing Platform SSO Settings Catalog policy.

**Configuration:**

| Property | Value |
|----------|-------|
| Settings Catalog delivery | `Extension Data` key-value pair in the existing Platform SSO Settings Catalog policy |
| MDM key name | `enable_se_key_biometric_policy` |
| MDM key type | Boolean |
| MDM key value to enable | `true` |
| Apple macOS API name | `UserSecureEnclaveKeyBiometricPolicy` |
| Minimum macOS version | macOS 14.6 |
| Minimum Company Portal version | 2504 |

> **No-Password-Fallback Lockout Warning:**
>
> "There's no option for password fallback while authenticating with User Secure Enclave Key when
> UserSecureEnclaveKeyBiometricPolicy is enabled. Therefore, users won't be able to authenticate
> to Microsoft Entra ID if they don't have Touch ID biometrics available."
>
> Before enabling this policy, confirm that **all target devices** have functioning Touch ID hardware.
> Devices with broken Touch ID sensors, external keyboards without Touch ID, or models without
> Touch ID will have NO authentication path to Entra ID via Platform SSO once this policy is active.
>
> See [Common Misconceptions](#common-misconceptions) for the "Touch ID means no password is ever
> needed" myth and [FileVault and the Secure Enclave Key](#filevault-and-the-secure-enclave-key)
> for cold-boot behavior.

**Re-registration requirement:**

"If this feature is enabled after PSSO registration is completed, all users will need to undergo a full PSSO re-registration process for the policy to take effect. This re-registration process must be admin-driven, as users won't see a re-registration prompt."

Plan a staged rollout: enable the policy for a pilot group, verify Touch ID authentication works, then expand to the full fleet. Orchestrate re-registration proactively -- users will not be prompted automatically.

### Passkey / FIDO2 from the Platform Credential

The Secure Enclave Platform Credential can be used as a passkey (WebAuthn/FIDO2) in supported browsers via WebAuthn APIs. This extends the Secure Enclave key's phishing-resistant authentication to web applications that support passkeys.

**How it works:** The PRT key stored in the Secure Enclave is exposed to supported browsers as a WebAuthn authenticator. Users can register and authenticate with web applications using the Platform Credential as a passkey without any additional hardware token.

**Entra authentication-methods enablement (admin prerequisite):** FIDO2 (passkey) must be enabled in Entra ID Authentication Methods > FIDO2 security key for the Platform Credential passkey to function. This is a separate Entra admin task.

**AAGUID (conditional -- required only when FIDO2 key restrictions apply):**

When your organization has FIDO2 key restrictions enabled in the Entra FIDO2 Authentication Method policy, add the macOS Platform Credential AAGUID to your allowlist:

```
7FD635B3-2EF9-4542-8D9D-164F2C771EFC
```

This AAGUID step is **only required when key restrictions are configured.** Organizations without FIDO2 key restrictions do not need to configure an AAGUID allowlist -- the Platform Credential passkey functions without it.

**End-user self-enablement:** Users can configure and use the Platform Credential as a passkey in supported browsers (Edge, Chrome with SSO extension, Safari, Firefox with MicrosoftEntraSSO policy) without additional MDM configuration beyond the base PSSO policy.

**Smart card does NOT support passkey use.** Only the Secure Enclave key method enables the Platform Credential as a passkey.

---

## Password Sync Method

The Password sync method sets the local macOS account password equal to the user's Microsoft Entra ID password and keeps the two in sync. It is the recommended fallback for hardware that lacks a T2 chip or Apple Silicon.

**What syncs:** The Entra ID password becomes and remains equal to the local macOS account password. The local password is NOT removed -- it is set equal to the Entra password. Both passwords are the same value.

**Settings Catalog key value:** `Platform SSO > Authentication Method` = `Password` (macOS 13 and 14+). For mixed 13/14 fleets, also set `Authentication Method (Deprecated)` = `Password`.

**MFA not mandatory at setup:** Unlike the Secure Enclave key and Smart Card methods, MFA is not mandatory for Password sync setup.

### FileVault Interaction (Password Sync)

For the FileVault cold-boot behavior, see [FileVault and the Secure Enclave Key](#filevault-and-the-secure-enclave-key). The Password sync nuance: because the local password equals the Entra password, one password unlocks both FileVault and Entra. Users type their Entra password at the FileVault pre-boot screen and it IS their Entra password.

### Sync Timing and Common Failure Modes

> _Sync timing provenance -- `last_verified: 2026-06-21` / `review_by: 2026-09-21`. The ~4-hour sync window is MEDIUM confidence (consistent with PITFALLS.md and SUMMARY.md research; not confirmed verbatim from the fetched Intune/Entra docs in this session). Confirm current timing against the Microsoft Learn Platform SSO troubleshooting guide at each 90-day review._

**Sync timing:** Approximately 4 hours for password propagation from Entra to the local macOS account after an Entra password change. Plan helpdesk guidance around this window -- users may be unable to log in with a new password until the sync completes.

**Complexity-mismatch failure:** If the Entra password complexity policy and the macOS local account password policy do not match, password sync fails silently. Align both policies before deploying.

**macOS 15+ FileVaultPolicy:** Set `Platform SSO > FileVaultPolicy` = `AttemptAuthentication` for macOS 15+ fleets using the Password sync method. This enables the device to verify the Entra password with Entra at the FileVault unlock screen. This setting applies to macOS 15 and later and is only meaningful for the Password method.

**Per-user MFA silent blocker (DF-3):** Legacy per-user MFA (set in the legacy Azure AD per-user MFA settings, NOT Conditional Access) silently blocks Password sync PSSO registration. No error is shown; the flow stalls. Resolution: disable per-user MFA for all PSSO target users and use Conditional Access MFA policy instead.

**AD-bound (mobile) account limitation (DF-7):** Devices where the macOS user account was created by Active Directory binding (AD mobile accounts) silently fail Password sync registration. The PSSO password synchronization API expects a standard macOS local account. Recommend the Secure Enclave key method for organizations transitioning away from AD binding.

---

## Smart Card Method

> **Prerequisite -- Entra CBA Must Be Configured First:**
>
> Smart Card Platform SSO **silently fails** if Entra Certificate-Based Authentication (CBA) is not
> pre-configured in the Entra tenant. Deploying the `SmartCard` Settings Catalog value without
> completing the Entra CBA configuration produces no actionable error -- registration simply fails.
>
> Entra CBA is a separate multi-step Entra admin task that requires the **Privileged Authentication
> Administrator** role (to upload CA certificates) and the **Authentication Policy Administrator**
> role (to configure authentication and username-binding policies). Allow multiple days for PKI
> certificate upload and policy propagation before deploying the PSSO Smart Card profile.
>
> Complete the Entra CBA configuration and verify it works (Step 5 below) before deploying any
> Smart Card PSSO Settings Catalog policy.
>
> Authoritative guide: [Entra ID Certificate-Based Authentication configuration](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-certificate-based-authentication)

### Entra CBA Admin Steps (Summary)

These five steps must be complete before deploying the Smart Card PSSO profile:

**Step 1 -- Configure trusted CA certificates in Entra:**
- Role required: Privileged Authentication Administrator
- Navigation: Entra admin center > Entra ID > Identity Secure Score > Public key infrastructure
- Action: Create a PKI container, upload root CA and intermediate CA certificate files (.cer or .p7b), configure CRL URL for each CA
- Note: Upload is asynchronous, can take up to 30 minutes. The PKI-based trust store supports up to 250 CAs.

**Step 2 -- Enable CBA for target users:**
- Role required: Authentication Policy Administrator
- Navigation: Entra admin center > Entra ID > Authentication methods > Certificate-based authentication
- Action: Enable CBA for specific security groups (do NOT enable for All Users -- users enabled for CBA who lack a valid certificate cannot register other MFA methods and may be locked out)

**Step 3 -- Configure authentication binding policy:**
- Role required: Authentication Policy Administrator
- Action: Set the protection level to MFA to satisfy phishing-resistant MFA Conditional Access policies. Optionally create custom rules scoped by certificate issuer or policy OID.

**Step 4 -- Configure username binding policy (X.509 attribute to Entra user attribute):**
- Default mapping: `PrincipalName` (certificate SAN) → `userPrincipalName` (Entra user object)
- Custom mappings also supported (e.g., `RFC822Name` → `userPrincipalName`)
- For orgs syncing from on-premises AD, alternative security IDs (AltSecId) can be synced via Entra Connect

**Step 5 -- Verify CBA works before deploying the PSSO profile:**
- Test by signing in to MyApps portal (myapps.microsoft.com) with the smart card certificate on a test device
- Confirm certificate picker appears and authentication succeeds
- Only after CBA is confirmed working should the Smart Card PSSO Settings Catalog profile be deployed

### Smart Card Settings Catalog Configuration

**Settings Catalog key value:** `Platform SSO > Authentication Method` = `SmartCard` (macOS 14+ only)

**macOS 14+ required:** Smart Card method is NOT supported on macOS 13. The deprecated `Authentication Method (Deprecated)` field does NOT accept `SmartCard` -- only the macOS 14+ `Platform SSO > Authentication Method` field accepts it. Do NOT deploy the SmartCard value to a mixed 13/14 fleet without filtering; macOS 13 devices will fail.

**sc_auth pairing prerequisite:** Smart card certificates must be paired with the local macOS user account before PSSO Smart Card registration. This is accomplished via the macOS `sc_auth` command.

> _sc_auth provenance -- `last_verified: 2026-06-21` / `review_by: 2026-09-21`. The sc_auth pairing step is MEDIUM confidence (confirmed as the standard Apple macOS smart card pairing command from requirements and pitfalls documentation; the exact command syntax was not confirmed from the fetched Microsoft Learn pages in this session). Confirm exact command from Apple Platform Deployment documentation before deploying at scale._

**Not available during Setup Assistant:** "Authenticating with Smart Card in Setup Assistant is not supported. If you want to use Smart Card as the authentication method, you must complete PSSO registration after Setup Assistant is completed." Plan your enrollment workflow to complete Setup Assistant before prompting users for Smart Card PSSO registration.

---

## New User At Login Window (NUAL)

NUAL (New User At Login Window) allows any organizational user with Entra credentials to sign in to a shared Mac at the login window, creating a new local account automatically. This is distinct from the standard per-user PSSO flow -- NUAL is designed for shared or kiosk devices where the macOS account does not pre-exist.

**macOS version:** macOS 14+ required.

**Configuration -- Shared Device Keys:** NUAL is enabled by configuring `Platform SSO > Use Shared Device Keys` = Enabled in the Settings Catalog policy.

**Account name mapping:** `Platform SSO > Token To User Mapping > Account Name` = `com.apple.PlatformSSO.AccountShortName` determines how the new macOS account's short name is derived from the Entra identity token. This uses the UPN prefix and is the recommended mapping for ADE PSSO deployments.

**NUAL Settings Catalog settings:**

| Settings Catalog Setting | Type | Purpose |
|--------------------------|------|---------|
| `Enable Create User At Login` | Boolean | Allow any organizational user to sign in and create a new local account on first login |
| `New User Authorization Mode` | Enum (Standard / Admin / Groups) | One-time permissions granted to the new user when the account is first created |
| `User Authorization Mode` | Enum (Standard / Admin / Groups) | Persistent permissions at each subsequent PSSO sign-in |

> **Deferred item -- MDM key literal for New User Authorization Mode:**
>
> The Settings Catalog display name is "New User Authorization Mode" with values Standard / Admin / Groups.
> The underlying MDM plist key name is unconfirmed from an authoritative Settings Catalog payload schema
> and is therefore omitted from this guide pending verification.
>
> See `v1.9-DEFERRED-CLEANUP.md` for tracking details (PSSO-11 / PSSO-FUT-01).

---

## Common Misconceptions

> **Platform SSO Myth vs. Fact**
>
> The following table addresses the most dangerous misconceptions about Platform SSO. Each of the three
> named dangers has a canonical description in the relevant method section -- this table cross-references
> those sections rather than restating them.

| Claim | Accurate? | Nuance |
|-------|-----------|--------|
| "No password needed after enrollment" | CONDITIONALLY TRUE | Only at the login window after FileVault disk is unlocked. Cold reboot always requires the local account password at the FileVault screen. See [FileVault and the Secure Enclave Key](#filevault-and-the-secure-enclave-key). |
| "Password sync removes the local password" | FALSE | Local password is NOT removed. It is set equal to the Entra password and is still required for FileVault unlock at cold boot. |
| "Secure Enclave key method means no password at all" | FALSE | The local account password still exists -- it is required for FileVault cold boot and for the Secure Enclave key binding. In normal flows users do not type it at the login window (Touch ID handles login window auth after disk unlock). See [FileVault and the Secure Enclave Key](#filevault-and-the-secure-enclave-key). |
| "PSSO satisfies phishing-resistant MFA for Conditional Access" | TRUE | Secure Enclave key and Smart Card methods are treated as phishing-resistant MFA by Entra Conditional Access. Password sync is NOT phishing-resistant. |
| "Touch ID means no password is ever needed" | FALSE | Touch ID is unavailable at the FileVault pre-boot screen -- only available at the macOS login window after disk unlock. Enabling the Touch ID biometric policy with no password fallback can lock users out if Touch ID is unavailable. See [Touch ID Biometric Policy](#touch-id-biometric-policy). |
| "An MDM password reset is just a convenience reset -- PSSO keeps working" | FALSE | MDM-driven password reset destroys the Secure Enclave key. The user must re-register Platform SSO. See [SE Key Destruction Warning](#se-key-destruction-warning). |

---

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| Smart Card PSSO deployed without Entra CBA pre-configured | Intune | Smart card PSSO registration fails silently; no actionable error; device appears to accept the policy | `35-macos-sso-sign-in-failure.md` (Phase 80) |
| Auth method changed in an existing policy applied to enrolled fleet | Intune | Fleet-wide re-registration triggered for all users; helpdesk flooded simultaneously | -- |
| MDM-driven password reset or FileVault recovery key use | Intune / macOS | User's PSSO stops working after password reset; sign-in prompts resume; re-registration required | `36-macos-se-key-verification.md` (Phase 80) |
| Touch ID biometric policy enabled on devices lacking Touch ID support | Intune | Users with no Touch ID cannot authenticate to Entra ID via PSSO; no password fallback | -- |
| AAGUID `7FD635B3-2EF9-4542-8D9D-164F2C771EFC` listed in FIDO2 policy without key restrictions configured | Entra | No functional impact (AAGUID ignored when key restrictions are disabled); admin confusion about why it has no effect | -- |

---

## See Also

- [Platform SSO Setup](07-platform-sso-setup.md) -- Settings Catalog policy creation, prerequisites, and verification
- [Platform SSO](../_glossary-macos.md#platform-sso)
- [Secure Enclave](../_glossary-macos.md#secure-enclave)
- [Enterprise SSO Plug-in](../_glossary-macos.md#enterprise-sso-plug-in)
- [Entra ID SSO](../_glossary.md#entra-id-sso)
- Legacy Enterprise SSO plug-in and migration guide: `09-enterprise-sso-plugin-migration.md` (Phase 78 -- not yet authored)

---

| Date | Change | Author |
|------|--------|--------|
| 2026-06-21 | Phase 77 (PSSO-05..11): initial version -- auth method selection table and three-method deep-dive with FileVault interaction, misconceptions box, Touch ID biometric policy, Passkey/FIDO2, NUAL | -- |
