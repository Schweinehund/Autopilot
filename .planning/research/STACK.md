# Stack Research — v1.9 macOS Platform SSO + Secure Enclave Authentication Documentation

**Domain:** Microsoft Entra ID + Apple Platform SSO feature surface for documentation authoring — macOS enterprise auth (Platform SSO, Secure Enclave, Enterprise SSO plug-in) via Microsoft Intune
**Researched:** 2026-06-20
**Confidence:** HIGH for all product names, payload keys, version floors, auth-method matrices, Secure Enclave hardware facts (all verified against Microsoft Learn + Apple Platform Deployment + Apple Security Guide, sources dated as late as 2026-06-15)
**Scope reminder:** "Stack" here = the Microsoft Intune / Entra ID / Apple platform configuration surfaces that v1.9 docs must cite accurately. v1.9 ships markdown documentation only — there is no application code to install. This file focuses on macOS only; iOS/iPadOS is out of scope for v1.9.

---

## TL;DR for downstream consumers

| Item | Value | Confidence |
|---|---|---|
| Umbrella product name | **Microsoft Enterprise SSO plug-in for Apple devices** | HIGH |
| macOS-specific sub-feature 1 | **Platform SSO** (macOS 13+; recommended macOS 14+) | HIGH |
| macOS-specific sub-feature 2 | **SSO app extension** (macOS 10.15+; redirect type; configurable alone or bundled with Platform SSO) | HIGH |
| Intune config surface for Platform SSO | **Settings Catalog** only — `Devices > Manage devices > Configuration > Create > New policy > macOS > Settings catalog > Authentication > Extensible Single Sign On (SSO)` | HIGH |
| Apple payload type name | `com.apple.extensiblesso` | HIGH |
| Extension Identifier (macOS) | `com.microsoft.CompanyPortalMac.ssoextension` | HIGH |
| Team Identifier | `UBF8T346G9` | HIGH |
| Registration token | `{{DEVICEREGISTRATION}}` (literal value including braces) | HIGH |
| macOS version floor (absolute min) | **macOS 13.0** (Platform SSO functional but Secure Enclave + Smart Card require 14+; 13 is "deprecated" path) | HIGH |
| macOS version recommended floor | **macOS 14 Sonoma** (recommended by Microsoft — all three auth methods available) | HIGH |
| Company Portal version floor | **5.2404.0** (any Platform SSO) — **5.2604.0** (Platform SSO during ADE enrollment) | HIGH |
| Licensing | **Included in all Microsoft Intune licensing plans** — no premium Entra ID tier required for Platform SSO itself | HIGH |
| Auth methods | **Secure Enclave (recommended)** / **Password (sync)** / **Smart Card** | HIGH |
| Smart Card macOS floor | **macOS 14+** only — not available on macOS 13 | HIGH |
| Secure Enclave hardware | All **Apple Silicon** Macs + all **T2-equipped Intel Macs** (2018-2020 models) | HIGH |
| Hybrid-join support | **NOT SUPPORTED** — macOS Platform SSO requires Entra ID join; no hybrid-join path | HIGH |
| Entra-side prerequisite | "Allow users to join devices" = **All** (or scoped group) in Entra ID > Devices > Device Settings | HIGH |
| Device Identity Key Storage transition | From August 2025, new registrations use **Secure Enclave** for WPJ key storage by default (replaces Keychain) | HIGH |

---

## 1. Product Name Disambiguation (CRITICAL — most-confused area)

Three terms appear in the ecosystem and must be precisely distinguished in all v1.9 docs:

### 1.1 Microsoft Enterprise SSO plug-in for Apple devices

The **umbrella product**. Delivered via Microsoft Intune Company Portal (macOS) or Microsoft Authenticator (iOS/iPadOS). On macOS it has two sub-components:

- **Platform SSO** — the newer, recommended component; configures device-level Entra ID authentication at macOS login and SSO across all apps
- **SSO app extension** — the foundational component; provides SSO for apps and websites using Microsoft Entra ID; can be configured standalone (legacy Device Features template) or bundled inside Platform SSO policy (Settings Catalog)

**v1.9 doc rule:** "Microsoft Enterprise SSO plug-in" is the container name. When discussing macOS enterprise authentication, the correct sub-feature names are "Platform SSO" and "SSO app extension." Do NOT use "Enterprise SSO plug-in" as a synonym for "Platform SSO" — they are different scopes.

Source: [Microsoft Entra — Microsoft Enterprise SSO plug-in for Apple devices](https://learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin) (updated 2026-06-15). Confidence: HIGH.

### 1.2 Platform SSO vs SSO app extension — configuration surface differences

| Dimension | SSO app extension (standalone) | Platform SSO (includes SSO app extension) |
|---|---|---|
| Intune config surface | **Device Features template** (`Devices > Manage devices > Configuration > Create > New policy > macOS > Templates > Device features`) | **Settings Catalog** (`Authentication > Extensible Single Sign On (SSO)`) |
| What it configures | SSO for apps and websites using Entra ID; no device-level login integration | Both device-level macOS login authentication AND app/web SSO |
| macOS version floor | macOS 10.15 | macOS 13.0 (recommended 14.0) |
| Company Portal requirement | Yes (any version) | Yes, version 5.2404.0+ |
| Workplace Join (WPJ) cert | Obtained after user manually signs into app/browser | Obtained during Platform SSO registration; hardware-bound from August 2025 |
| Phishing-resistant auth | NO | YES (Secure Enclave method) |
| Windows Hello for Business analog | NO | YES (Secure Enclave method) |
| Can coexist in same policy | NO — never deploy both; Platform SSO supersedes and conflicts with standalone SSO app extension profile | N/A |

**Decision rule for v1.9 docs:** New deployments should always use Platform SSO (Settings Catalog). The standalone SSO app extension (Device Features template) is legacy/migration context. Step 7 in the Intune Platform SSO guide explicitly requires unassigning any existing SSO app extension profiles after validating the Platform SSO policy.

Source: [Microsoft Learn — Configure macOS Enterprise SSO app extension with MDMs](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-enterprise-sso-plugin-macos) (updated 2026-04-14). Confidence: HIGH.

### 1.3 Kerberos SSO extension — NOT Platform SSO

The **Kerberos SSO extension** (payload type `Kerberos` vs `SSO`) is a separate macOS SSO mechanism for on-premises Active Directory Kerberos. Microsoft Platform SSO can optionally configure a Kerberos SSO scenario via Extension Data keys, but the Kerberos extension and Platform SSO are distinct payloads. v1.9 docs must not conflate them.

**v1.9 scope decision:** Kerberos SSO configuration is an optional Platform SSO scenario; document it as a "common Platform SSO scenario" cross-reference (per `configure-platform-sso-scenarios-macos`) rather than in the core Platform SSO admin guide.

---

## 2. Platform SSO Configuration Surface (Intune)

### 2.1 Admin center navigation path

```
Devices
  > Manage devices
    > Configuration
      > Create
        > New policy
          Platform: macOS
          Profile type: Settings catalog
            > Authentication
              > Extensible Single Sign On (SSO)
```

The Settings Catalog is the **only correct path** for Platform SSO. The older `Templates > Device features > Single sign-on app extension` path configures only the SSO app extension and does NOT configure Platform SSO. Creating both a Settings Catalog Platform SSO policy and a Device Features SSO app extension policy on the same device causes **error 10002** (multiple SSOe payloads conflict).

### 2.2 Required Settings Catalog keys — complete list

All settings live under `Authentication > Extensible Single Sign On (SSO)` in the Settings Catalog picker.

| Setting Name in Intune | Value | macOS Version | Required |
|---|---|---|---|
| `Extension Identifier` | `com.microsoft.CompanyPortalMac.ssoextension` | 13+ | Required |
| `Team Identifier` | `UBF8T346G9` | 13+ | Required |
| `Type` | `Redirect` | 13+ | Required |
| `URLs` | See §2.3 for full list | 13+ | Required |
| `Registration Token` | `{{DEVICEREGISTRATION}}` | 13+ | Required |
| `Screen Locked Behavior` | `Do Not Handle` | 13+ | Required |
| `Authentication Method (Deprecated)` | `Password` or `UserSecureEnclaveKey` | **macOS 13 ONLY** | Required if macOS 13 devices in scope |
| `Platform SSO > Authentication Method` | `Password`, `UserSecureEnclaveKey`, or `SmartCard` | **macOS 14+** | Required for macOS 14+ |
| `Platform SSO > Use Shared Device Keys` | Enabled | macOS 14+ | Required (enables shared keys across users on same device; triggers re-registration if changed later) |
| `Platform SSO > Token To User Mapping > Account Name` | `com.apple.PlatformSSO.AccountShortName` (recommended) or `preferred_username` | 13+ | Required |
| `Platform SSO > Token To User Mapping > Full Name` | `name` | 13+ | Required |
| `Platform SSO > FileVault Policy` | `AttemptAuthentication` | **macOS 15+ only** | Required for Password auth on macOS 15+ |
| `Platform SSO > Enable Registration During Setup` | Enabled | macOS 26+ (ADE only) | Required only for Platform SSO during ADE enrollment |
| `Platform SSO > Enable Create First User During Setup` | Enabled | macOS 26+ (ADE only) | Required only if Password auth + ADE enrollment |

**Critical mixed-fleet rule:** If the fleet includes BOTH macOS 13.x and macOS 14+ devices, BOTH `Authentication Method (Deprecated)` AND `Platform SSO > Authentication Method` must be configured in the SAME settings catalog policy. Omitting either causes error 10001 on the excluded OS version.

Source: [Microsoft Learn — Configure Platform SSO for macOS devices](https://learn.microsoft.com/en-us/intune/intune-service/configuration/platform-sso-macos) (updated 2026-05-18). Confidence: HIGH.

### 2.3 Required URLs (Redirect type)

Core URLs (required for all environments):
```
https://login.microsoftonline.com
https://login.microsoft.com
https://sts.windows.net
```

Sovereign cloud additions (add only if environment uses these):
```
https://login.partner.microsoftonline.cn  (Azure China)
https://login.chinacloudapi.cn             (Azure China)
https://login.microsoftonline.us           (Azure Government)
https://login-us.microsoftonline.com       (Azure Government)
```

### 2.4 Apple payload type name (for non-Intune MDM or custom profile references)

The Apple MDM payload type is `com.apple.extensiblesso`. The Settings Catalog exposes this via the UI; custom `.mobileconfig` files or non-Intune MDMs must use this payload type. v1.9 docs should cite this string when explaining the payload for L2 troubleshooting context (e.g., `System Settings > Privacy and Security > Profiles` shows the profile under `com.apple.extensiblesso Profile`).

Source: [Apple Platform Deployment — Extensible Single Sign-on MDM payload settings](https://support.apple.com/guide/deployment/extensible-single-sign-on-payload-settings-depfd9cdf845/web) (confirmed payload type `com.apple.extensiblesso`). Confidence: HIGH.

### 2.5 Assignment rules (user groups, not device groups)

Platform SSO policies **must be assigned to user groups or user groups with assignment filters** for devices with user affinity. Assigning to device groups on devices with user affinity causes users to be unable to access Conditional Access-protected resources. This is a documented Microsoft constraint (not an advisory).

Only one Platform SSO settings catalog policy can be assigned per device. All Platform SSO scenario settings (Kerberos, non-Microsoft app SSO, Touch ID biometric, etc.) must be added to the single existing policy — not created as separate Platform SSO policies.

---

## 3. Authentication Methods — Per-Method Prerequisite Tables

### 3.1 Comparison matrix

| Feature | Secure Enclave (UserSecureEnclaveKey) | Password (sync) | Smart Card |
|---|---|---|---|
| Passwordless | YES | NO | YES |
| Phishing-resistant MFA | YES | NO | YES |
| Can be used as passkey (WebAuthn) | YES | NO | NO |
| MFA mandatory during setup | YES | NO (optional) | YES |
| Local Mac password synced with Entra ID | NO — local password unchanged | YES — Entra password replaces/syncs with local password | NO — local password unchanged |
| macOS 13.x supported | YES | YES | NO |
| macOS 14.x supported | YES | YES | YES |
| Settings Catalog key value | `UserSecureEnclaveKey` | `Password` | `SmartCard` |
| Settings Catalog key value (macOS 13 deprecated field) | `UserSecureEnclaveKey` | `Password` | N/A — 13 not supported |
| Requires Secure Enclave hardware | YES | NO | NO (external hardware token) |
| Touch ID device unlock (after initial reboot password) | YES | YES | YES |
| FileVault behavior | Local password unchanged (FileVault still uses local password as unlock key) | Local password syncs; FileVault uses synced password | Local password unchanged |
| Microsoft recommendation | **RECOMMENDED** | Second choice | Third choice |
| Windows Hello for Business analog | YES | NO | Partial (certificate-based) |

Source: [Microsoft Learn — Configure Platform SSO for macOS — Step 1 auth method table](https://learn.microsoft.com/en-us/intune/intune-service/configuration/platform-sso-macos) (updated 2026-05-18). Confidence: HIGH.

### 3.2 Secure Enclave method — specific prerequisites

| Prerequisite | Requirement | Why it matters |
|---|---|---|
| macOS version | 13.0 minimum; **14.0 strongly recommended** | macOS 13 uses `Authentication Method (Deprecated)` key; macOS 14+ uses `Platform SSO > Authentication Method`. Both work but Microsoft's own docs say "strongly recommend 14.0 Sonoma for best experience" |
| Hardware | **Apple Silicon** OR **T2-equipped Intel Mac** — see §5 for model list | Secure Enclave is the physical hardware component that stores and protects the cryptographic key; without it, `UserSecureEnclaveKey` cannot provision |
| Company Portal | 5.2404.0+ | Contains the SSO extension that provisions the Secure Enclave key |
| MFA during registration | Required — user must complete MFA to register | MFA establishes the initial identity binding for the hardware key |
| Device join permission in Entra | User must be in "Users may join devices to Microsoft Entra" allowlist | If not allowed, registration silently fails with no error shown |
| FileVault interaction | Local password unchanged; FileVault uses local password; after reboot user enters local password, then Touch ID takes over | By design — Apple's FileVault architecture requires local password as disk unlock key |
| Touch ID biometric policy (optional) | macOS 14.6+; Company Portal 2504+ | Optional `enable_se_key_biometric_policy: true` Extension Data key — forces Touch ID for every Secure Enclave key access. Requires re-registration if enabled post-PSSO-registration |

### 3.3 Password (sync) method — specific prerequisites

| Prerequisite | Requirement | Why it matters |
|---|---|---|
| macOS version | 13.0+ | No macOS 14 floor; macOS 13 supported via `Authentication Method (Deprecated)` = `Password` |
| Entra ID password complexity | Must match Intune MDM password policy | If policies diverge, password sync silently fails and users are locked out |
| Per-user MFA | Must be DISABLED (use CA-based MFA instead) | Per-user MFA causes password sync failure during registration — known issue |
| FileVault + macOS 15 | `Platform SSO > FileVault Policy` = `AttemptAuthentication` unlocks Entra password verification at FileVault screen | macOS 14 and earlier cannot use Entra password at FileVault screen — this is a macOS 15 feature only |
| KeyVault recovery | Optional but recommended (Institutional FileVault Recovery Keys) | Allows data recovery if user forgets password; admin configures via Apple MDM payload settings |
| SSPR (Self-Service Password Reset) | Recommended enabled in Entra ID | Password change from another device syncs within 4 hours; SSPR enables user self-recovery |

### 3.4 Smart Card method — specific prerequisites

| Prerequisite | Requirement | Why it matters |
|---|---|---|
| macOS version | **14.0+ only** — NOT available on macOS 13 | Smart Card is only exposed in `Platform SSO > Authentication Method` (macOS 14+); the deprecated macOS 13 field does not support SmartCard value |
| Smart card / hard token hardware | External smart card or smart card-compatible token (e.g., YubiKey) with certificate and PIN | Physical hardware token required; no software fallback |
| Entra ID CBA | Microsoft Entra certificate-based authentication (CBA) configured in Entra ID | Entra must be configured to accept the certificate on the smart card for authentication |
| Certificate type | X.509 certificate on the smart card that maps to Entra ID user identity | Attribute mapping must be configured in Entra CBA settings |
| Setup Assistant Smart Card limit | Smart card authentication during macOS Setup Assistant is **NOT supported** | If deploying Platform SSO during ADE/Setup Assistant, Smart Card requires PSSO registration to complete AFTER Setup Assistant finishes |

Source: [Microsoft Entra — macOS PSSO overview](https://learn.microsoft.com/en-us/entra/identity/devices/macos-psso) (updated 2026-06-15); [Microsoft Learn — Configure Platform SSO for macOS — Smart Card tab](https://learn.microsoft.com/en-us/intune/intune-service/configuration/platform-sso-macos). Confidence: HIGH.

---

## 4. Version Floors and Prerequisites — Exact Values

### 4.1 Version matrix — what is required and why

| Component | Minimum Version | WHY it matters |
|---|---|---|
| **macOS (absolute floor)** | **13.0 Ventura** | Platform SSO framework introduced in macOS 13; below 13 there is no Platform SSO capability at all |
| **macOS (recommended floor)** | **14.0 Sonoma** | All three auth methods (SE key + Password + Smart Card) available; `Platform SSO > Authentication Method` key used instead of deprecated field; Microsoft explicitly says "strongly recommend 14.0 for best experience"; macOS 14 also added Entra repair flow in Settings |
| **macOS (FileVault Entra password)** | **15.0 Sequoia** | `Platform SSO > FileVault Policy = AttemptAuthentication` only available on macOS 15+; only on 15+ can Entra password be used at FileVault screen |
| **macOS (ADE enrollment-time PSSO)** | **macOS 26** | `Enable Registration During Setup` capability requires macOS 26+; earlier versions cannot complete PSSO during Setup Assistant |
| **Company Portal (Platform SSO)** | **5.2404.0** | Version that introduced Platform SSO support; older versions cause Platform SSO to fail silently |
| **Company Portal (ADE enrollment PSSO)** | **5.2604.0** | Version required when deploying Platform SSO during Automated Device Enrollment |
| **Company Portal (Touch ID biometric policy)** | **2504** | Required for `enable_se_key_biometric_policy` (UserSecureEnclaveKeyBiometricPolicy) |
| **macOS (Touch ID biometric policy)** | **14.6** | Required for `UserSecureEnclaveKeyBiometricPolicy` |
| **Smart Card available** | **macOS 14.0** | Smart Card auth method key only exists in the non-deprecated `Platform SSO > Authentication Method` field |
| **macOS 15.3 known fix** | **15.3** | Re-registration concurrency bug fixed in macOS 15.3 (Apple confirmed); persistent re-registration prompts on 15.0–15.2 are a known Apple OS bug |

### 4.2 Entra ID prerequisites — Entra-side configuration

| Entra-side requirement | Where to configure | Why required |
|---|---|---|
| **Users may join devices to Microsoft Entra** = All (or scoped group including target users) | Entra admin center: Entra ID > Devices > Overview > Device Settings > `Microsoft Entra join and registration settings` | Without this, PSSO registration silently fails — no error shown to user |
| **Entra device registration** | Automatic when user completes PSSO registration flow | Devices receive a hardware-bound WPJ certificate; WPJ cert is what apps and browsers use for device-based Conditional Access |
| **Conditional Access MFA policy** (not per-user MFA) | CA policy in Entra admin center | Per-user MFA (legacy) causes Password sync failures during PSSO registration; use CA-based MFA instead |
| **No hybrid-join deployment** | N/A — architecture constraint | macOS PSSO requires Entra ID join; hybrid-join is NOT supported and Microsoft has stated there are no plans to support it |
| **WPJ certificate (hardware-bound from Aug 2025)** | Automatic from August 2025 | Microsoft transitioned WPJ key storage from Apple Keychain to Apple Secure Enclave for new registrations starting August 2025; requires Enterprise SSO plug-in to report device identity |
| **Passkeys (FIDO2) — optional** | Entra admin center: Authentication methods | Required only if organization wants to use Secure Enclave Platform Credential as a FIDO2 passkey; AAGUID to allowlist: `7FD635B3-2EF9-4542-8D9D-164F2C771EFC` |
| **Entra CBA — Smart Card only** | Entra admin center: Authentication methods > Certificate-based authentication | Required only for Smart Card auth method; configures how Entra validates the certificate on the smart card |

Source: [Microsoft Learn — Configure Platform SSO (prerequisites section)](https://learn.microsoft.com/en-us/intune/intune-service/configuration/platform-sso-macos); [Microsoft Entra — macOS PSSO troubleshooting — Insufficient permissions](https://learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension). Confidence: HIGH.

### 4.3 Licensing

Platform SSO is **included in all Microsoft Intune licensing plans** — this is an explicit statement from Microsoft Learn. No Entra ID P1 or P2 tier is required for Platform SSO itself. Related features that DO require Entra ID P1/P2:

- Conditional Access policies (Entra ID P1 minimum)
- Entra ID Protection risk-based CA (Entra ID P2)
- SSPR in some configurations

For the core Platform SSO admin guide, document: "Platform SSO requires only a Microsoft Intune license. Conditional Access integration, which is a recommended complement to Platform SSO, requires Microsoft Entra ID P1 or higher."

Source: [Microsoft Learn — Configure Platform SSO > Benefits section](https://learn.microsoft.com/en-us/intune/intune-service/configuration/platform-sso-macos): "It's included with all Microsoft Intune licensing plans." Confidence: HIGH.

---

## 5. Secure Enclave — Hardware Facts to Pin

### 5.1 Which Mac hardware has Secure Enclave

**All current and recent Mac hardware has a Secure Enclave.** The Secure Enclave is a dedicated hardware security chip integrated into:

- **All Apple Silicon Macs** (M1, M2, M3, M4 and all variants) — 2020 onwards; Secure Enclave is part of the Apple Silicon SoC
- **All T2 Security Chip Intel Macs** — specific models 2018-2020 (see list below)
- **T1 chip Macs** — MacBook Pro 2016-2017 with Touch Bar (T1 is an earlier generation; has Secure Enclave but not the same capabilities as T2/Apple Silicon)

T2-equipped Intel Mac models (Secure Enclave via T2):

| Model | Year |
|---|---|
| MacBook Pro | 2018, 2019, 2020 (Intel) |
| MacBook Air | 2018, 2019, 2020 (Intel) |
| Mac mini | 2018 |
| iMac | 2020 (27-inch 5K Retina), iMac Pro |
| Mac Pro | 2019 |

**Macs WITHOUT Secure Enclave (no Platform SSO Secure Enclave method):**
- Intel Mac models 2017 and earlier without T1 or T2 (most pre-2018 Intel Macs)
- MacBook (12-inch models without Touch Bar, pre-T2)

**v1.9 practical implication:** Any Mac purchased since 2018 almost certainly has Secure Enclave hardware. The Secure Enclave method will fail to provision only on genuinely old hardware (2017 and earlier Intel without T2). In a modern fleet this edge case may not need prominent documentation, but a capability matrix row and a prerequisite note are appropriate.

Source: [Apple Platform Security — The Secure Enclave](https://support.apple.com/guide/security/the-secure-enclave-sec59b0b31ff/web); [Apple Support — Mac computers with Apple T2 Security Chip](https://support.apple.com/en-us/103265). Confidence: HIGH for Apple Silicon and T2 list; HIGH for T1 (2016-2017 Touch Bar MacBook Pro).

### 5.2 How Platform SSO uses the Secure Enclave

The Secure Enclave is used to generate and protect the **User Secure Enclave Key** (referred to in Apple's platform SSO documentation as the "Platform Credential"). Key facts:

1. **The key cannot be exported.** Secure Enclave hardware prevents keys from ever leaving the chip; even the OS kernel cannot read them. Keys are used only for signing operations performed inside the Secure Enclave.

2. **The key is hardware-bound to the specific Mac.** The User Secure Enclave Key is tied to both the device hardware AND the user account on that device. A key provisioned on one Mac cannot be transferred to another Mac.

3. **The key generates a hardware-bound Primary Refresh Token (PRT).** After Platform SSO registration, the Secure Enclave key is used to obtain a PRT. Apps and browsers use this PRT for device-wide SSO without requiring re-authentication.

4. **The key functions as a passkey (WebAuthn).** When using Secure Enclave auth, the PRT key can serve as a FIDO2 passkey via WebAuthn APIs in browsers. This enables phishing-resistant MFA via the Mac itself (no external hardware key needed).

5. **FileVault does NOT use the Secure Enclave key.** FileVault disk encryption uses the local macOS account password as the unlock key — this is why the Secure Enclave method intentionally leaves the local account password unchanged. The two mechanisms are parallel, not interdependent.

6. **Password reset breaks the Secure Enclave key.** If a password reset occurs without the local account password being provided (FileVault recovery, MDM-driven recovery), the Secure Enclave resets and the Platform SSO key is lost. The device must re-register for Platform SSO. This is an important L2 troubleshooting scenario.

7. **Device Identity Key Storage migration (August 2025):** Microsoft transitioned from storing the WPJ certificate in Apple Keychain to storing it in the Secure Enclave for all new device registrations. This means applications that previously accessed the WPJ cert via Keychain will fail — they must use MSAL + Enterprise SSO plug-in instead.

Source: [Apple Platform Security — The Secure Enclave](https://support.apple.com/guide/security/the-secure-enclave-sec59b0b31ff/web); [Microsoft Entra — apple-sso-plugin — Device Identity Key Storage section](https://learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin); [Microsoft Learn — Configure Platform SSO — Secure Enclave tab](https://learn.microsoft.com/en-us/intune/intune-service/configuration/platform-sso-macos). Confidence: HIGH.

### 5.3 Secure Enclave vs FileVault relationship

This is the single most frequently misunderstood aspect of macOS Platform SSO. The relationship:

| Mechanism | What it protects | Uses Secure Enclave? | Uses local account password? |
|---|---|---|---|
| **FileVault** | Full disk encryption | NO — uses local account password as key | YES — required |
| **Platform SSO (Secure Enclave method)** | Entra ID authentication credential (WPJ cert / PRT key) | YES — key generated in and never leaves Secure Enclave | NO — local password deliberately unchanged |
| **Platform SSO (Password method)** | Entra ID authentication credential (synced password) | Partially — WPJ cert stored in SE from Aug 2025 | YES — Entra password syncs to local password |

**Documentation implication:** The admin guide must explicitly state "Enabling Platform SSO with the Secure Enclave method does NOT change your FileVault configuration. FileVault continues to use the local macOS account password as its disk unlock key. After a device reboot, users must enter their local password to unlock FileVault, then Touch ID handles subsequent unlocks." This prevents the common admin mistake of thinking Platform SSO makes the local password irrelevant.

---

## 6. Legacy Enterprise SSO Plug-in (SSO App Extension) — When to Document

### 6.1 What it is and when it predates Platform SSO

The standalone SSO app extension (configured via the **Device Features template**, not Settings Catalog) provides Entra ID SSO for apps and websites on macOS 10.15+. It does NOT integrate with the macOS login screen and does NOT create a WPJ certificate during registration.

**Payload type (Apple):** `com.apple.extensiblesso` (same payload type as Platform SSO — distinguished by the absence of Platform SSO-specific keys)

**Extension Identifier:** `com.microsoft.CompanyPortalMac.ssoextension` (same as Platform SSO)

**When admins still use the standalone SSO app extension:**
- Legacy macOS 10.15–12.x devices (cannot run Platform SSO)
- Orgs that have not yet migrated to Platform SSO
- During migration period when Platform SSO policy is being validated

### 6.2 Migration path from SSO app extension to Platform SSO

The migration is documented explicitly in the Intune Platform SSO guide:
1. Create and assign the Platform SSO settings catalog policy
2. Validate Platform SSO is working (Step 6 in the Intune guide — use `app-sso platform -s` command)
3. **Unassign** the existing Device Features SSO app extension profile
4. Do NOT keep both profiles assigned — error 10002 (multiple SSOe payloads) results

**v1.9 implication:** The migration runbook is a dedicated v1.9 deliverable. The key insight to document: since Platform SSO's Settings Catalog policy includes the SSO app extension configuration automatically, migrating to Platform SSO is a policy-add-then-remove-old-policy operation, not a reconfiguration.

Source: [Microsoft Learn — Configure Platform SSO — Step 7](https://learn.microsoft.com/en-us/intune/intune-service/configuration/platform-sso-macos): "If you keep both policies, conflicts can occur." Confidence: HIGH.

### 6.3 Additional configuration keys shared between both configurations

These optional keys apply to both the SSO app extension and Platform SSO (configured in Extension Data in Settings Catalog for Platform SSO):

| Key | Type | Recommended Value | Purpose |
|---|---|---|---|
| `AppPrefixAllowList` | String | `com.microsoft.,com.apple.` | Allows non-MSAL apps matching these bundle ID prefixes to use SSO |
| `browser_sso_interaction_enabled` | Integer | `1` | Allows Safari and non-MSAL apps to bootstrap the SSO extension |
| `disable_explicit_app_prompt` | Integer | `1` | Suppresses redundant authentication prompts from apps that bypass SSO at protocol level |
| `enable_se_key_biometric_policy` | Boolean | `true` (high-security optional) | Requires Touch ID for every Secure Enclave key access; macOS 14.6+, CP 2504+ |
| `use_most_secure_storage` | Integer | `0` (troubleshooting only) | Disables Secure Enclave key storage — for diagnostics only, never production |

---

## 7. Platform SSO During ADE Enrollment (Enrollment-time PSSO)

This is a distinct deployment mode with higher prerequisites:

| Requirement | Value | Notes |
|---|---|---|
| macOS version | **macOS 26+** | `Enable Registration During Setup` requires macOS 26 |
| Company Portal | **5.2604.0+** | Must be deployed as a **Line-of-Business (LOB) app** (not from App Store) |
| ADE enrollment profile | Setup Assistant with modern authentication + Await final configuration = Yes + Locked enrollment = Yes | All four settings required |
| Group type | **Assigned (static) user groups only** — NOT dynamic groups, NOT device groups | Feature does not work with dynamic or device groups |
| Smart Card | **NOT available during Setup Assistant** | Smart Card PSSO requires completing Setup Assistant first; then PSSO registration can be initiated |
| Policy assignment | Settings Catalog policy + LOB Company Portal app + ADE enrollment profile all assigned to the **same static user group** | If assigned to different groups, enrollment fails; wipe and re-enroll required |

Source: [Microsoft Learn — Add Platform SSO policy to ADE Profile on macOS devices](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-during-enrollment) (updated 2026-06-01). Confidence: HIGH.

---

## 8. Browser SSO Support

Platform SSO requires specific browser configurations for device-based Conditional Access to work:

| Browser | Configuration required |
|---|---|
| **Safari** | Built-in SSO integration — no additional configuration needed |
| **Microsoft Edge** | User must sign into Edge profile; Edge uses Microsoft SSO integration automatically |
| **Google Chrome** | Requires [Microsoft Single Sign On extension](https://chromewebstore.google.com/detail/windows-accounts/ppnbnpeolgkicgegkbkbjmhlideopiji) (force-install via Intune `.plist` preference file); Chrome 135+ has built-in Enterprise SSO support |
| **Firefox** | Requires [MicrosoftEntraSSO policy](https://mozilla.github.io/policy-templates/#microsoftentrasso) configured (Intune preference file or manual); Firefox 133+ Enterprise supports this policy |

Browser SSO is blocked if TLS inspection intercepts Apple CDN domains or Microsoft login domains. Ensure these are excluded from TLS break-and-inspect:
- `app-site-association.cdn-apple.com`
- `app-site-association.networking.apple`
- All Microsoft login URLs (for Platform SSO-targeted devices)

Source: [Microsoft Entra — apple-sso-plugin — Requirements](https://learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin) (updated 2026-06-15). Confidence: HIGH.

---

## 9. What NOT to Document (Out of Scope for v1.9)

| Surface | Reason excluded |
|---|---|
| **iOS/iPadOS Platform SSO or Enterprise SSO plug-in** | iOS uses Microsoft Authenticator (not Company Portal) as the plug-in host; iOS PSSO is a different implementation; out of v1.9 scope |
| **Apple School Manager (ASM) / Education federation** | Education-specific; enterprise scope only |
| **Non-Entra identity providers** (Okta, Ping, etc.) | v1.9 scope is Entra ID-joined Macs via Intune only; other IdPs would use the same Platform SSO framework but are separate documentation projects |
| **macOS hybrid join** | Not supported; document as explicit "not supported, no roadmap" callout in the prerequisites section only |
| **Jamf Pro / other MDM Platform SSO configurations** | v1.9 is Intune-managed; MDM-generic payload values can be noted for L2 context only |
| **Kerberos SSO deep-dive** | Optional Platform SSO scenario; cross-reference to `configure-platform-sso-scenarios-macos`; do not fold into core Platform SSO admin guide |
| **Managed Apple Account federation** | Covered in existing docs; Platform SSO is separate from Managed Apple Account sign-in |
| **ABM/Apple Business token management** | Out of v1.9 scope (v1.6 covered this) |

---

## 10. Key Canonical URLs for v1.9 Citations

### Microsoft Learn (HIGH confidence — all verified June 2026)

| Purpose | URL | Last Updated |
|---|---|---|
| Platform SSO configuration guide (primary) | https://learn.microsoft.com/en-us/intune/intune-service/configuration/platform-sso-macos | 2026-05-18 |
| Platform SSO during ADE enrollment | https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-during-enrollment | 2026-06-01 |
| Platform SSO scenarios (Kerberos, Touch ID, non-MSAL apps) | https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-scenarios-macos | (current) |
| SSO app extension — macOS (legacy / Device Features template) | https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-enterprise-sso-plugin-macos | 2024-05-01 |
| SSO overview and options for Apple devices | https://learn.microsoft.com/en-us/intune/device-configuration/enterprise-sso-plugin | (current) |
| Microsoft Enterprise SSO plug-in for Apple devices (Entra ID) | https://learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin | 2026-06-15 |
| macOS Platform SSO overview (Entra ID) | https://learn.microsoft.com/en-us/entra/identity/devices/macos-psso | 2026-06-15 |
| Platform SSO troubleshooting and known issues | https://learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension | 2026-06-15 |
| Join Mac with Entra ID via Company Portal (user experience) | https://learn.microsoft.com/en-us/entra/identity/devices/device-join-microsoft-entra-company-portal | (current) |
| Join Mac with Entra ID during OOBE (user experience) | https://learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on | (current) |
| Entra certificate-based authentication (Smart Card) | https://learn.microsoft.com/en-us/entra/identity/authentication/concept-certificate-based-authentication-mobile-ios | (current) |

### Apple Official (HIGH confidence)

| Purpose | URL |
|---|---|
| Extensible SSO MDM payload settings | https://support.apple.com/guide/deployment/extensible-single-sign-on-payload-settings-depfd9cdf845/web |
| Platform SSO overview (Apple Platform Deployment) | https://support.apple.com/guide/deployment/dep7bbb05313/web |
| The Secure Enclave (Apple Platform Security) | https://support.apple.com/guide/security/the-secure-enclave-sec59b0b31ff/web |
| Mac computers with Apple T2 Security Chip | https://support.apple.com/en-us/103265 |
| Integrate with Microsoft Entra ID (Apple Deployment Guide) | https://support.apple.com/guide/deployment/integrate-with-microsoft-entra-id-depa85a35cf2/web |
| FileVault MDM payload settings | https://support.apple.com/en-ie/guide/deployment/dep32bf53500/1/web/1.0 |
| Manage FileVault with MDM | https://support.apple.com/en-ie/guide/deployment/dep0a2cb7686/web |
| Platform SSO on-demand account creation | https://support.apple.com/guide/deployment/dep7bbb05313/web |

---

## 11. Confidence Summary

| Finding | Confidence | Verification basis |
|---|---|---|
| Product name hierarchy (plug-in > Platform SSO + SSO app extension) | HIGH | Microsoft Entra docs + Intune docs cross-referenced |
| All Settings Catalog key names and values | HIGH | Directly from Microsoft Learn Platform SSO guide (updated 2026-05-18) |
| Apple payload type `com.apple.extensiblesso` | HIGH | Apple Platform Deployment official page |
| Extension Identifier + Team Identifier | HIGH | Multiple Microsoft sources confirm `com.microsoft.CompanyPortalMac.ssoextension` + `UBF8T346G9` |
| Version floors (macOS 13/14/15, CP 5.2404.0 / 5.2604.0) | HIGH | Microsoft Learn prerequisites section (current docs) |
| macOS 26 for ADE enrollment PSSO | HIGH | Directly from June 2026 updated Microsoft Learn ADE enrollment doc |
| Smart Card = macOS 14+ only | HIGH | Auth method comparison table in official docs |
| Secure Enclave hardware list (T2 models + Apple Silicon) | HIGH | Apple Security Guide + Apple T2 support page |
| Keys in Secure Enclave cannot be exported | HIGH | Apple Platform Security guide |
| FileVault/Secure Enclave non-relationship | HIGH | Multiple Microsoft Learn sources explicit on this |
| Licensing = included in all Intune plans | HIGH | Explicit statement in Microsoft Learn Platform SSO benefits section |
| Hybrid-join = not supported | HIGH | Microsoft Entra PSSO FAQ explicit; "no plans to support" stated |
| August 2025 WPJ key storage migration (SE default) | HIGH | Microsoft Entra apple-sso-plugin page, "Device Identity Key Storage" section |
| macOS 15.3 re-registration bug fix | HIGH | Microsoft Entra troubleshooting page; "Apple confirmed the fix is deployed in macOS 15.3" |
| ADE enrollment group-type constraints (static user, not dynamic/device) | HIGH | June 2026 Microsoft Learn ADE enrollment page |
| macOS 15.3 / iOS 18.1.1 Enterprise SSO regression (PluginKit Code=16) | HIGH | Microsoft Entra apple-sso-plugin page, "Important update" section |

---

## 12. Version-Sensitive Facts That Must Be Pinned in v1.9 Docs

These facts are specifically version-dependent and MUST be cited with versions in the documentation (not stated as universally true):

1. **Smart Card = macOS 14+ only.** On macOS 13, only `Password` and `UserSecureEnclaveKey` are valid Authentication Method values.

2. **FileVault Entra password unlock = macOS 15+ only.** The `FileVaultPolicy = AttemptAuthentication` key only applies on macOS 15 and later. On macOS 14 and 13, FileVault still requires the local account password exclusively.

3. **Company Portal 5.2404.0 minimum.** Older Company Portal silently breaks Platform SSO. This is not a user-visible error — the admin must verify CP version during deployment.

4. **Authentication Method (Deprecated) = macOS 13 only.** The top-level `Authentication Method` field is the legacy path; macOS 14+ should use `Platform SSO > Authentication Method`. Mixed fleets need BOTH in the same policy.

5. **WPJ key storage in Secure Enclave (default from August 2025).** New device registrations after August 2025 store the WPJ certificate in the Secure Enclave. Applications that access WPJ via Keychain will fail. This affects any organization that upgraded devices post-August 2025 without also updating their MDM configuration to use MSAL/Enterprise SSO plug-in.

6. **macOS 15.3 re-registration bug fixed.** Devices on macOS 15.0–15.2 may experience unexpected re-registration prompts (OS concurrency bug). Fixed in 15.3. L2 runbooks should recommend upgrading to 15.3+ before troubleshooting PSSO re-registration loops.

7. **ADE enrollment PSSO requires macOS 26.** Platform SSO during Setup Assistant is a macOS 26-only capability. Do not document it as available on earlier versions.

8. **Touch ID biometric policy requires macOS 14.6 AND Company Portal 2504.** Both version floors must be met; the feature silently does not activate if either is below minimum.

---

*Stack research for: v1.9 macOS Platform SSO + Secure Enclave Authentication Documentation*
*Researched: 2026-06-20*
*Source freshness: primary Microsoft Learn sources dated 2026-05-18 to 2026-06-15; Apple sources current as of June 2026*
