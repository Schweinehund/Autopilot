# Feature Research — macOS Platform SSO Follow-ons: Kerberos, Graph API & NUAL (v1.10)

**Domain:** macOS Platform SSO follow-on documentation — Kerberos SSO extension, Graph API Platform Credential management, NUAL MDM key verification. Documentation suite for enterprise Intune/Entra ID admins and L1/L2 service desk teams.
**Researched:** 2026-06-22
**Confidence:** HIGH for all three surfaces — verified against Apple device-management schema (YAML, release branch), Microsoft Graph API v1.0 docs (updated 2025-11-13), and Microsoft Entra Kerberos/PSSO tutorial (updated 2026-06-15). Confidence notes per surface below.

---

## Research Scope

This file covers ONLY the three v1.10 in-scope surfaces (PSSO-FUT-01/02/04). Multi-tenant PSSO (PSSO-FUT-03) is explicitly out of scope per v1.10 project definition.

**What already exists (v1.9 guides — do not re-document):**
- `07-platform-sso-setup.md` — Settings Catalog `com.apple.extensiblesso` policy creation, Entra prerequisites, device/user registration flow
- `08-auth-methods-deep-dive.md` — Secure Enclave key, Password sync, Smart Card deep-dives; NUAL behavior description (without MDM key literals)
- `09-enterprise-sso-plugin-migration.md` — Product-name disambiguation, migrate/keep/coexist decision matrix, Error 10002 staged migration, Kerberos SSO extension coexistence note (SSOMIG-04)

**Sources for this research:**
- Apple `com.apple.extensiblesso` YAML schema, `apple/device-management` GitHub repo, release branch (authoritative MDM payload spec)
- Microsoft Graph v1.0: `platformCredentialAuthenticationMethod` resource, list, get, delete operations — `learn.microsoft.com/en-us/graph/api/resources/platformcredentialauthenticationmethod?view=graph-rest-1.0` (updated 2026-01-28)
- Microsoft Graph v1.0: list permissions — `learn.microsoft.com/en-us/graph/api/platformcredentialauthenticationmethod-list?view=graph-rest-1.0` (updated 2025-11-13)
- Microsoft Graph v1.0: delete permissions — `learn.microsoft.com/en-us/graph/api/platformcredentialauthenticationmethod-delete?view=graph-rest-1.0` (updated 2025-11-08)
- Microsoft Entra: Kerberos/PSSO tutorial — `learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on-kerberos-configuration` (updated 2026-06-15)
- Apple Support: Kerberos SSO extension deployment guide — `support.apple.com/guide/deployment/kerberos-sso-extension-depe6a1cda64/web`

---

## Surface 1: Kerberos SSO Extension (PSSO-FUT-04)

### Behavioral Summary

The Kerberos SSO extension is an **Apple-native, Apple-owned** extension. It handles Kerberos ticket-granting for on-premises Active Directory and — when combined with PSSO — for Microsoft Entra ID Cloud Kerberos resources (Azure Files, Windows Hello for Business cloud Kerberos trust environments). It is NOT a Microsoft extension and does NOT use Microsoft's Company Portal extension identifier.

**Extension identifier:** `com.apple.AppSSOKerberos.KerberosExtension` (Apple-controlled, TeamIdentifier: `apple`)
**Payload type used:** `com.apple.extensiblesso` with `Type: Credential` (not `Redirect` — distinct from the PSSO extension)
**Deployed via:** Separate MDM profile from the PSSO Settings Catalog policy; uploaded as a Custom template `.mobileconfig` file in Intune
**macOS requirement:** macOS 14.6+ for PSSO TGT-sharing integration; macOS 10.15+ for standalone Kerberos extension (no PSSO)

#### Realm Configuration

The `Realm` key must be the Kerberos realm name in **all uppercase** (e.g., `CONTOSO.COM`). This is the on-premises AD domain/forest realm. The `Hosts` array must include both the bare domain and a dot-prefixed wildcard (e.g., `contoso.com` and `.contoso.com`) to match all subdomain resources.

For **Microsoft Entra ID Cloud Kerberos**, a separate profile is required with `Realm: KERBEROS.MICROSOFTONLINE.COM` and `preferredKDCs` pointing to the tenant-specific KKDCP endpoint (`kkdcp://login.microsoftonline.com/{tenantId}/kerberos`).

#### TGT Lifecycle

On macOS, the Kerberos extension **proactively keeps the TGT fresh** — it monitors network state changes and attempts to acquire/renew tickets when the corporate network (or VPN) becomes reachable. This is unlike iOS, where the extension only requests a TGT on demand (to conserve battery). Default TGT lifetime is typically 10 hours (set by the KDC). The extension handles renewal transparently; the user does not need to interact unless the TGT has fully expired and cannot be silently renewed.

**Integration with PSSO TGT sharing (`usePlatformSSOTGT: true`):** When this key is `true`, the Kerberos extension uses the TGT issued by PSSO/Entra for the same realm, rather than acquiring its own TGT independently. The `custom_tgt_setting` key (Company Portal 2508+) controls whether both on-prem and cloud TGTs are mapped, or only one:
- Value `0`: Both on-prem and cloud TGTs mapped (default)
- Value `1`: On-prem TGT only
- Value `2`: Cloud TGT only
- Value `3`: No TGT mapping

#### Password Change Sync

The `syncLocalPassword` key (Boolean) controls whether the extension syncs the local macOS account password to match Active Directory credentials. When `true`, the extension monitors AD password-expiration timestamps and updates the local password after successful Kerberos authentication. Password sync is NOT supported with macOS mobile accounts. Setting `allowPasswordChange: true` permits the user to initiate a password change via the menu-bar extra.

`performKerberosOnly: true` disables password expiration checks, external password change checks, and home-directory retrieval — use this in PSSO-combined deployments where Entra handles password lifecycle and Kerberos is used only for resource authentication.

#### On-Premises AD Dependency

Hard requirement: an on-premises Active Directory domain running Windows Server 2008 or later, reachable from the Mac (via corporate LAN, Wi-Fi, or VPN). The extension is explicitly **not designed for Entra ID–only environments** — it requires a traditional Kerberos KDC. For Entra ID Cloud Kerberos, Microsoft Entra Kerberos must be deployed first (the same infrastructure used for Windows Hello for Business cloud Kerberos trust or passwordless security key sign-in).

#### How It Differs from Platform SSO

| Dimension | Kerberos SSO Extension | Platform SSO |
|-----------|----------------------|-------------|
| Owner | Apple | Microsoft (delivered via Company Portal) |
| Extension identifier | `com.apple.AppSSOKerberos.KerberosExtension` | `com.microsoft.CompanyPortalMac.ssoextension` |
| Payload type | `Credential` | `Redirect` |
| What it authenticates | On-prem AD / Kerberos resources | Entra ID (cloud) |
| Device join | None | Entra joins the device |
| PRT issued | No | Yes (hardware-bound when SE key method) |
| Same device coexistence | YES — different identifiers | YES |
| Same device conflict | Only with another Credential-type Kerberos profile | With legacy Device Features SSO app extension (Error 10002) |

**Versus Legacy Enterprise SSO plug-in redirect mode:** The legacy "SSO app extension" (Device Features template, Redirect type) provides browser/app URL-matching SSO for Entra resources. The Kerberos extension provides Kerberos ticket acquisition for on-prem resources. They solve different problems; the correct comparison is Kerberos extension vs. PSSO (for Entra resources), not Kerberos extension vs. the legacy redirect mode.

#### When an Org Chooses It

An org deploys the Kerberos SSO extension when users need seamless authentication to **on-premises Kerberos resources** (file servers, intranet apps, print servers, SharePoint on-prem) from macOS. It is additive to PSSO — deployed alongside PSSO as a separate profile, not instead of it. Orgs that are **Entra-only** with no on-prem AD dependency do not need this extension.

#### Diagnostics

```bash
# Verify TGT presence and ticket details (shows tgt_ad and/or tgt_cloud ticket paths)
app-sso platform -s

# Standard Kerberos command-line tools
klist       # list current Kerberos tickets
kinit       # acquire a Kerberos TGT interactively
kdestroy    # destroy all tickets
```

The menu-bar extra (Kerberos SSO extension applet) appears in the macOS menu bar when the extension is deployed. Users can sign in and change passwords via the applet, but when `usePlatformSSOTGT: true`, the applet may show "Not signed in" while Kerberos still functions correctly (TGTs are delivered by PSSO). Admins should instruct users to **ignore the menu-bar "Not signed in" status** in PSSO-combined deployments and instead validate via `app-sso platform -s`.

#### Browser Support

Safari supports Kerberos SSO by default. Edge and Chrome require `AuthNegotiateDelegateAllowlist` and `AuthServerAllowlist` policies configured with the on-prem AD forest name. Firefox requires `network.negotiate-auth.trusted-uris` and `network.automatic-ntlm-auth.trusted-uris` configuration.

---

### Feature Categories — Kerberos SSO Extension Guide

#### Table Stakes

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Realm and Hosts configuration walkthrough | Any admin deploying Kerberos SSO needs exact key names and values; getting realm case wrong is a universal failure mode | MEDIUM | Realm must be ALL CAPS; both bare and dot-prefixed hosts required |
| Extension Identifier disambiguation from PSSO identifier | v1.9 guide 09 already calls this out as a pitfall — admins who reuse the PSSO identifier break both extensions | LOW | Already framed in guide 09 SSOMIG-04; guide 10 must be the authoritative source |
| On-prem AD dependency and when to deploy vs not deploy | L2 and admins need this to triage "why isn't SSO working to our file server" | LOW | Covers the Entra-only exclusion |
| Coexistence with PSSO — same-device deployment pattern | The scenario most orgs will encounter: migrating to PSSO while retaining on-prem Kerberos | LOW | Cross-links to guide 09 SSOMIG-04 coexistence note |
| `app-sso platform -s` diagnostic output interpretation | L2 runbook anchor; TGT presence/absence is the primary diagnostic signal | LOW | Distinguishes `tgt_ad` vs `tgt_cloud` ticket paths |
| Separate MDM profile deployment steps (Intune Custom template) | Admin needs to know this is NOT a Settings Catalog policy — it is uploaded as a .mobileconfig | MEDIUM | Must not be confused with guide 07's Settings Catalog flow |

#### Differentiators

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| PSSO TGT-sharing integration (`usePlatformSSOTGT`, `custom_tgt_setting`) | Eliminates duplicate TGT acquisition when PSSO is already deployed; removes the menu-bar "Not signed in" confusion | MEDIUM | `custom_tgt_setting` key requires Company Portal 2508+; `usePlatformSSOTGT` is the core key for PSSO-combined deployments |
| Cloud Kerberos profile (Entra ID Cloud Kerberos / Azure Files) | Orgs using Azure Files with Kerberos auth or Windows Hello cloud Kerberos trust can extend seamless SSO to cloud file shares via a second profile | HIGH | Azure Files PSSO Kerberos TGT feature is in limited preview as of 2026-06-15; admins must contact azurefiles@microsoft.com |
| `performKerberosOnly` flag behavior | Removes noise from password-expiration flows in PSSO-combined deployments where Entra owns password lifecycle | LOW | Must be set to `true` in PSSO-combined deployments to avoid double-prompting |
| Browser-specific Kerberos policy matrix (Edge, Chrome, Firefox) | Prevents the common "file server SSO works, web app doesn't" failure; browser policies are invisible to MDM audit | MEDIUM | Per-browser policy deployment is a separate Intune profile concern; cross-links to browser management docs |
| Password change sync behavior (`syncLocalPassword`, `allowPasswordChange`) | Orgs with local account + AD synchronization requirements need exact behavior documented to avoid account lockouts | MEDIUM | Incompatible with macOS mobile accounts |

#### Anti-Features

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Documenting Kerberos extension as a replacement for PSSO | Admins unfamiliar with the distinction may deploy ONLY the Kerberos extension and skip PSSO | Kerberos extension provides NO Entra device join, NO PRT, NO Conditional Access compliance — Entra SSO will fail | Guide must frame it as additive to PSSO, not an alternative |
| Covering standalone Kerberos extension deployment without PSSO | Technically possible on macOS 10.15+ | Creates a documentation fork for a rapidly shrinking legacy scenario; v1.9 already gates modern guidance at macOS 14+ | Scope to PSSO-combined deployment; mention standalone only as a note |
| Documenting Kerberos extension for Entra-only fleets | Orgs without on-prem AD sometimes ask about it | Kerberos extension is irrelevant without a Kerberos KDC; including it creates confusion and unnecessary deployment | Explicitly state: if no on-prem AD and no Azure Files Kerberos, skip this guide entirely |

---

## Surface 2: Graph API Platform Credential Management (PSSO-FUT-02)

### Behavioral Summary

The `platformCredentialAuthenticationMethod` resource represents a **single Secure Enclave Platform Credential registration** for a user on a specific macOS device. It is part of the Microsoft Graph authentication methods API. The resource is available in **Graph v1.0** (promoted from beta; confirmed via Microsoft Learn doc updated 2026-01-28). This is not a preview feature.

**Resource endpoint base:** `/users/{id}/authentication/platformCredentialMethods`
**Resource properties:**
- `id` — Unique identifier for the credential registration
- `displayName` — Name of the device on which the credential is registered (maps to the device display name in Entra)
- `createdDateTime` — Timestamp of registration
- `keyStrength` — `normal`, `weak`, or `unknown`
- `platform` — `macOS` (also possible values: `windows`, `iOS`, `android`, `linux`, `unknown`)
- `device` (relationship, `$expand`) — The registered Entra device object

**Operations available:**
- `GET /me/authentication/platformCredentialMethods` — list own credentials (self-service, delegated only)
- `GET /users/{id}/authentication/platformCredentialMethods` — list another user's credentials (admin use)
- `GET /users/{id}/authentication/platformCredentialMethods/{methodId}` — get a single credential
- `DELETE /users/{id}/authentication/platformCredentialMethods/{methodId}` — delete/revoke a credential

#### Credential Lifecycle as Seen from Graph

1. **Registration:** When a user completes Platform SSO device registration (completing the "Registration Required" interactive flow via Company Portal), Entra ID creates a `platformCredentialAuthenticationMethod` object linked to the user. The Secure Enclave key is generated on-device; only the public key and metadata are stored in Entra. The Graph object appears immediately after successful registration.

2. **Enumeration:** An admin (or automation) can enumerate all Platform Credential registrations for a user. This is useful when auditing which devices have active PSSO registrations, or when troubleshooting authentication failures where the credential count (0 vs. 1 vs. multiple) is diagnostic. A user can have multiple credentials if they have registered PSSO on multiple devices.

3. **Deletion/Revocation:** DELETE removes the Entra-side credential record. This forces PSSO re-registration on the device — the next time the user encounters a Conditional Access policy requiring a compliant device, they will see the "Registration Required" prompt again. The Secure Enclave private key on the device is NOT remotely erased by a Graph delete (the hardware key persists on the device but the Entra binding is severed). The admin use case is: device lost/stolen/transferred, leaver workflow, or "force re-registration" remediation.

#### Why Manage via Graph vs. Intune Portal vs. Device

| Method | When to Use | Limitations |
|--------|-------------|-------------|
| Intune portal (device detail) | Manual one-off investigation; viewing device compliance state | No bulk operations; requires navigating per-device; no scriptable path |
| `app-sso platform -s` on device | L2 on-device verification; confirms local PSSO state | Requires local access or remote shell to the device; not centralized |
| Graph API | Bulk audit (enumerate all users with 0 registrations), automated leaver workflow (delete credential at offboarding), reporting (credential age, key strength, device correlation), programmatic re-registration trigger | Requires app registration with appropriate permissions; no native Intune UI shortcut |

The Graph API path is the only one that supports **automation at scale** — scripted offboarding, bulk audit, and zero-touch credential lifecycle management. Admins who want to integrate PSSO credential state into ticketing systems, ITSM workflows, or SIEMs must use Graph.

#### Permissions

**To list (GET) — least privileged:**
- Delegated (reading own): `UserAuthMethod-PlatformCred.Read`
- Delegated (admin reading another user): `UserAuthMethod-PlatformCred.Read.All` or `UserAuthenticationMethod.Read.All`; requires Entra role: **Global Reader**, **Authentication Administrator**, or **Privileged Authentication Administrator**
- Application (service principal / automation): `UserAuthMethod-PlatformCred.Read.All`

**To delete — least privileged:**
- Delegated (own): `UserAuthenticationMethod.ReadWrite`
- Delegated (admin acting on another user): `UserAuthMethod-PlatformCred.ReadWrite.All` or `UserAuthenticationMethod.ReadWrite.All`; requires Entra role: **Authentication Administrator** or **Privileged Authentication Administrator**
- Application (automation): `UserAuthenticationMethod.ReadWrite.All`

**MFA re-prompt on self-service delete:** If a user attempts to delete their own credential and last authenticated more than 10 minutes ago in the current Graph session, they are re-prompted for MFA.

**National cloud availability:** Global service, US Gov L4, US Gov L5 (DOD), China (21Vianet) — all supported.

---

### Feature Categories — Graph API Platform Credential Document

#### Table Stakes

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Resource property reference (`id`, `displayName`, `createdDateTime`, `keyStrength`, `platform`) | Admins building automation need to know every queryable field; `keyStrength` drives compliance decisions | LOW | All properties confirmed in v1.0 schema |
| List all credentials for a user (GET) with full HTTP request and PowerShell example | The canonical read operation; needed for audit and troubleshooting | LOW | `Get-MgUserAuthenticationPlatformCredentialMethod -UserId $userId` is the PowerShell SDK cmdlet |
| Delete/revoke a credential (DELETE) with full HTTP request and PowerShell example | The primary admin action: leaver workflow, lost device, force re-registration | LOW | `Remove-MgUserAuthenticationPlatformCredentialMethod` is the PowerShell SDK cmdlet |
| Permission requirements table (delegated vs application, roles required) | Any admin deploying automation needs this; wrong permissions = silent 403 failures | LOW | Authentication Administrator is the minimum admin role for cross-user operations |
| Explanation of what Graph delete does vs. does not do to the device | Critical misconception: admins think Graph delete remote-wipes the key; it does not | LOW | Must state clearly: Entra binding severed; device SE key persists; user must re-register |
| Relationship between Graph credential `id` and the device object (`$expand=device`) | Needed for correlation: "which device does this credential belong to?" | LOW | `$expand=device` on the GET returns the linked Entra device object |

#### Differentiators

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Leaver/offboarding automation pattern (PowerShell script: get user credentials → delete each) | The most common automation use case; a fully scripted snippet prevents credential orphaning at employee departure | MEDIUM | Illustrates the enumerate-then-delete pattern; references `UserAuthenticationMethod.ReadWrite.All` app permission |
| Bulk audit pattern (enumerate users with 0 registrations) | Surfaces users who have PSSO deployed but have not completed registration — a compliance gap indicator | HIGH | Requires iterating user list; may need Graph SDK pagination; complex query but high value for PSSO deployment health monitoring |
| `createdDateTime` as credential age signal | Old credentials on stale/decommissioned devices that were never offboarded properly; audit exposure | LOW | Simple filter on response; no complexity in retrieval |
| `keyStrength` field interpretation | `normal` = Secure Enclave-backed, `weak` = software-backed or degraded, `unknown` = registration predates strength reporting | LOW | Admins need to know `weak` warrants investigation |
| Comparison: Graph delete vs. Intune "Wipe" vs. PSSO re-registration remote action | Distinguishes three different remediation verbs that admins frequently confuse | LOW | Ties to guide 08 SE Key Destruction Warning section |

#### Anti-Features

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Documenting the beta endpoint (`graph-rest-beta`) as the primary reference | Some community content still references beta | Resource is GA in v1.0; shipping beta-first content suggests instability where none exists | Use v1.0 exclusively; note beta exists for parity but discourage its use in production automation |
| Scripting credential creation via Graph | Admins sometimes ask "can I pre-register credentials?" | There is no Graph API to CREATE a platformCredentialAuthenticationMethod — registration is device-initiated only via the PSSO registration flow | Document clearly: Graph supports read + delete only; registration is always device-initiated |
| Covering FIDO2/Windows Hello credentials in the same document | Authentication methods API covers multiple credential types | `platformCredentialAuthenticationMethod` is macOS-specific (Platform Credential); conflating it with `windowsHelloForBusinessAuthenticationMethod` creates scope confusion | Scope this document to macOS Platform Credential only; cross-reference the auth methods overview for the broader API |

---

## Surface 3: NUAL MDM Key Verification (PSSO-FUT-01)

### Behavioral Summary

NUAL (New User At Login window) enables any organizational user with Entra credentials to sign in to a **shared Mac** at the macOS login window, creating a new local macOS account on first login. It is documented in guide 08's NUAL section. The v1.9 deferred item (PSSO-FUT-01) is specifically the **MDM plist key literals** for the two authorization-mode settings — they were omitted from guide 08 because the key names could not be confirmed from an authoritative source at Phase 77.

**This research resolves PSSO-FUT-01.** The Apple `com.apple.extensiblesso` YAML schema (canonical MDM payload spec, `apple/device-management` GitHub repo, release branch) confirms the exact key names:

| Settings Catalog Display Name | MDM plist key literal | Type | Allowed values |
|-------------------------------|----------------------|------|----------------|
| New User Authorization Mode | `NewUserAuthorizationMode` | String | `Standard`, `Admin`, `Groups`, `Temporary` |
| User Authorization Mode | `UserAuthorizationMode` | String | `Standard`, `Admin`, `Groups` |
| Enable Create User At Login | `EnableCreateUserAtLogin` | Boolean | `true` / `false`; default `false` |

**Confidence: HIGH** — sourced directly from Apple's machine-readable device-management schema (YAML, release branch), which is the authoritative source for MDM payload key names for `com.apple.extensiblesso`.

#### Behavior at the macOS Login Window

**`EnableCreateUserAtLogin: true`** — The macOS login window presents the option for any user (not just pre-existing local accounts) to sign in. When an Entra user signs in for the first time, macOS creates a new local account automatically. Requires `UseSharedDeviceKeys: true` in the same Settings Catalog policy. Only functions with `AuthenticationMethod: Password` or `SmartCard` (not Secure Enclave key method, which is per-user-per-device hardware bound).

**`NewUserAuthorizationMode`** — Controls the **one-time** permissions granted to the new local account at the moment of first creation:
- `Standard` — New account is a standard user (default recommended for shared/kiosk scenarios)
- `Admin` — New account is added to the local administrators group (use with caution; suitable only for self-managed developer machines)
- `Groups` — Group membership is assigned using `AdministratorGroups`, `AdditionalGroups`, or `AuthorizationGroups` keys
- `Temporary` — Account uses a temporary session configuration at creation (kiosk/lab use case)

**`UserAuthorizationMode`** — Controls the **persistent** permissions granted to the account at **each subsequent PSSO sign-in** (not just at creation). This is the ongoing authorization level, re-evaluated every time the user authenticates at the login window. It does NOT have a `Temporary` value — `Standard`, `Admin`, or `Groups` only.

**Key behavioral distinction — one-time vs persistent:** `NewUserAuthorizationMode` fires once (account creation). `UserAuthorizationMode` fires on every subsequent sign-in. If an admin sets `NewUserAuthorizationMode: Admin` and `UserAuthorizationMode: Standard`, the user gets admin rights on day one but standard rights on all subsequent logins — the admin promotion is overwritten at next sign-in. This asymmetry is the primary configuration pitfall.

---

### Feature Categories — NUAL MDM Key Verification (Guide 08 Update)

#### Table Stakes

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Confirmed MDM key literals (`NewUserAuthorizationMode`, `UserAuthorizationMode`) in guide 08's Settings Catalog table | The current guide 08 table has display names only; admins deploying via Custom profiles or scripting need the plist key | LOW | This is the core PSSO-FUT-01 deliverable; a targeted table update in guide 08 |
| `Temporary` value clarification for `NewUserAuthorizationMode` (not available in `UserAuthorizationMode`) | Admins may try to set `Temporary` in `UserAuthorizationMode` and get an unexpected result | LOW | Document the enum difference between the two keys |
| One-time vs persistent behavior explanation with the "day-1 Admin then Standard" pitfall example | This asymmetry is non-obvious and causes misconfiguration in lab/shared-device deployments | LOW | Requires a brief callout box; can be inline in guide 08 |
| `EnableCreateUserAtLogin` dependency on `UseSharedDeviceKeys: true` | Missing prerequisite causes silent non-function | LOW | Already noted in guide 08 but should be cross-referenced with the key literal clarification |

#### Differentiators

| Feature | Why Valuable | Complexity | Notes |
|---------|-------------|------------|-------|
| Explicit enum table showing which values exist in each key | Prevents the `Temporary` in `UserAuthorizationMode` mistake; also documents the `Groups` value which requires additional keys | LOW | A side-by-side enum comparison is clearer than prose |
| Cross-reference to `AdministratorGroups` / `AdditionalGroups` / `AuthorizationGroups` keys for `Groups` mode | Admins choosing `Groups` mode need to know there are companion keys; omitting them means the `Groups` setting silently has no effect | LOW | These companion keys are in the same `com.apple.extensiblesso` schema; note them without requiring a full deep-dive |

#### Anti-Features

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Adding a full NUAL deployment guide | NUAL is complex enough that admins want step-by-step instructions | PSSO-FUT-01 scope is a key-literal verification + table update in guide 08, NOT a standalone NUAL guide; expanding scope breaks the minimal-NUAL-fix decision (4A winner from adversarial review) | Complete guide 08 key-literal gap; defer a standalone NUAL guide if demand surfaces post-v1.10 |
| Documenting `Temporary` mode in detail | It is a valid enum value | Temporary session behavior varies by macOS version and has limited enterprise use; adding full coverage balloons a targeted fix into a new investigation | Note existence; defer deep-dive to post-v1.10 if needed |

---

## Feature Dependencies

```
[Surface 3: NUAL Key Literals]
    └──belongs-to──> [Guide 08: Auth Methods Deep-Dive] (targeted table update)
    └──requires-reading──> [Guide 07: Platform SSO Setup] (UseSharedDeviceKeys prerequisite)

[Surface 2: Graph API Platform Credential]
    └──requires-understanding-of──> [Guide 08: Auth Methods Deep-Dive] (Secure Enclave Key section)
    └──requires-understanding-of──> [Guide 07: Platform SSO Setup] (what triggers registration)
    └──new-deliverable──> Standalone Graph-API operations doc (new file)

[Surface 1: Kerberos SSO Extension]
    └──requires-cross-link-from──> [Guide 09: Enterprise SSO Plug-in & Migration] (SSOMIG-04 coexistence note → link to guide 10)
    └──requires-reading──> [Guide 07: Platform SSO Setup] (PSSO must be deployed first in combined scenarios)
    └──new-deliverable──> Guide 10: Kerberos SSO Extension (new file)
    └──new-deliverable──> L2 Kerberos troubleshooting runbook (new file)

[Cloud Kerberos (Surface 1 differentiator)]
    └──depends-on──> [Microsoft Entra Kerberos deployment] (WHfB cloud Kerberos trust or passwordless security key on-prem infrastructure)
    └──gated-by──> Company Portal 2508+ (for custom_tgt_setting key)
    └──Azure Files Kerberos is LIMITED PREVIEW (2026-06-15) — document as preview, flag for re-verification
```

### Dependency Notes

- **NUAL key literals require guide 08 update, not a new file.** The scope decision (4A minimal fix) is locked.
- **Graph API doc is a new file.** It has no anchor in any v1.9 guide; guide 08 has a brief mention of "programmatic" as deferred. The new doc cross-links to guide 08's SE Key section for credential context.
- **Kerberos guide 10 requires a back-edge cross-link from guide 09.** The SSOMIG-04 section in guide 09 currently ends with a "deferred to PSSO-FUT-04" note; guide 10 must replace that placeholder with a live link.
- **Kerberos guide 10 prerequisite: PSSO must already be configured.** Guide 10 assumes guide 07 has been completed (PSSO policy deployed). It does NOT repeat guide 07 steps.
- **Cloud Kerberos (Azure Files) is limited preview as of 2026-06-15.** The guide should document it but flag it prominently as preview-gated; do not present it as GA.

---

## Feature Prioritization Matrix

| Feature | Reader Value | Implementation Cost | Priority |
|---------|-------------|---------------------|----------|
| NUAL key literals in guide 08 (PSSO-FUT-01 closure) | HIGH — closes an explicit documented gap; admins are blocked without this | LOW — targeted table update, ~30min | P1 |
| Kerberos extension: realm/hosts/coexistence walkthrough + diagnostic commands | HIGH — primary admin/L2 need for Kerberos deployments | MEDIUM — new full guide, but well-documented source material available | P1 |
| Graph API: list + delete + permissions + PowerShell examples | HIGH — only programmatic path for credential lifecycle automation | LOW — API is simple (3 operations); well-documented in v1.0 | P1 |
| Kerberos extension: PSSO TGT-sharing integration (`usePlatformSSOTGT`) | HIGH — required knowledge for combined PSSO+Kerberos deployments | MEDIUM — requires the custom_tgt_setting table and mobileconfig examples | P1 |
| Graph API: leaver/offboarding automation pattern | MEDIUM — valuable differentiator; not every org scripts this immediately | MEDIUM — scripting snippet with error handling | P2 |
| Kerberos extension: browser policy matrix (Edge/Chrome/Firefox) | MEDIUM — needed for web app Kerberos scenarios; often discovered via escalation | LOW — a table, no new investigation needed | P2 |
| Kerberos L2 troubleshooting runbook | MEDIUM — L2 escalation path for TGT failures, password sync issues | MEDIUM — requires scenario-based runbook structure | P2 |
| Cloud Kerberos / Azure Files preview documentation | LOW — limited preview; most orgs not yet eligible | MEDIUM — requires preview caveats throughout | P3 |

---

## v1.9 Guide Dependency Map

| v1.10 Deliverable | Depends On (v1.9 Guides) | Action Required in v1.9 Guide |
|-------------------|--------------------------|-------------------------------|
| Guide 08 NUAL key update | `08-auth-methods-deep-dive.md` NUAL section | Update Settings Catalog table with confirmed plist key literals; add one-time vs persistent callout |
| Guide 10 Kerberos SSO Extension | `09-enterprise-sso-plugin-migration.md` SSOMIG-04 | Replace "deferred to PSSO-FUT-04" placeholder note with live cross-link to new guide 10 |
| Guide 10 Kerberos SSO Extension | `07-platform-sso-setup.md` | Add cross-link in ## See Also to guide 10 (Kerberos coexistence path) |
| Graph API operations doc (new) | `08-auth-methods-deep-dive.md` SE Key section | Add cross-link in ## See Also to new Graph API doc |
| Kerberos L2 runbook | Existing L2 hub index file | Append L2 entry for Kerberos TGT failures |
| Glossary | `_glossary-macos.md` | Add entries: Kerberos TGT, Realm, NUAL, platformCredentialAuthenticationMethod |
| `macos-capability-matrix.md` | Existing capability matrix | Add Kerberos SSO extension row; confirm Platform Credential Graph management row |

---

## Sources

- Apple device management schema (authoritative): `https://github.com/apple/device-management/blob/release/mdm/profiles/com.apple.extensiblesso.yaml`
- Apple Kerberos SSO extension deployment guide: `https://support.apple.com/guide/deployment/kerberos-sso-extension-depe6a1cda64/web`
- Microsoft Entra: Kerberos + PSSO tutorial: `https://learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on-kerberos-configuration` (updated 2026-06-15)
- Microsoft Graph v1.0: `platformCredentialAuthenticationMethod` resource: `https://learn.microsoft.com/en-us/graph/api/resources/platformcredentialauthenticationmethod?view=graph-rest-1.0` (updated 2026-01-28)
- Microsoft Graph v1.0: list operation + permissions: `https://learn.microsoft.com/en-us/graph/api/platformcredentialauthenticationmethod-list?view=graph-rest-1.0` (updated 2025-11-13)
- Microsoft Graph v1.0: delete operation + permissions: `https://learn.microsoft.com/en-us/graph/api/platformcredentialauthenticationmethod-delete?view=graph-rest-1.0` (updated 2025-11-08)
- Apple extensiblesso policy explorer: `https://appledevicepolicy.tools/policy-explorer/detail?type=com.apple.extensiblesso&branch=release`

---
*Feature research for: macOS Platform SSO Follow-ons (v1.10) — Kerberos SSO Extension, Graph API Platform Credential, NUAL MDM Key Verification*
*Researched: 2026-06-22*
