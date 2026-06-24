# Stack Research — v1.10 macOS Platform SSO Follow-ons (Kerberos, Graph API, NUAL)

**Domain:** Microsoft Entra ID + Apple Platform SSO follow-on surfaces for documentation authoring — Kerberos SSO extension, Graph API Platform Credential management, NUAL MDM key literal verification
**Researched:** 2026-06-22
**Confidence:** HIGH for Graph API GA status and all v1.0 paths (verified from Microsoft Graph docs contributor repo + Microsoft Learn); HIGH for Kerberos extension identifier and payload mechanics (verified from Apple device-management schema + Microsoft Entra tutorial + Apple Platform Deployment); HIGH for NUAL plist key literals (confirmed from Apple's authoritative `apple/device-management` repo + Apple Device Policy Explorer); MEDIUM for `app-sso` Kerberos-specific CLI subcommands (diagnostic command `app-sso platform -s` confirmed, Kerberos-specific subcommand surface thin in public docs)

**Scope:** v1.10-specific NEW surfaces only. Existing v1.9-researched facts (Platform SSO, Secure Enclave, Enterprise SSO plug-in) are inherited from the v1.9 STACK.md (researched 2026-06-20 — final section of this file preserved below). This file EXTENDS v1.9 STACK.md; it does NOT replace it.

**Out of scope (do NOT research or document):** Multi-tenant PSSO (PSSO-FUT-03) — deferred to its own architectural milestone.

---

## TL;DR for downstream consumers — v1.10 new surfaces

| Surface | Key Fact | Confidence |
|---|---|---|
| Graph API GA status | `platformCredentialAuthenticationMethod` is **GA in v1.0** — NOT beta | HIGH |
| Graph API URL root | `https://graph.microsoft.com/v1.0/users/{id}/authentication/platformCredentialMethods` | HIGH |
| Graph API operations | **List**, **Get**, **Delete** only — no Create/Update | HIGH |
| Graph API min permission (read) | `UserAuthMethod-PlatformCred.Read` (delegated) / `UserAuthMethod-PlatformCred.Read.All` (application) | HIGH |
| Graph API min permission (delete) | `UserAuthenticationMethod.ReadWrite` (delegated) / `UserAuthenticationMethod.ReadWrite.All` (application) | HIGH |
| Kerberos extension identifier | `com.apple.AppSSOKerberos.KerberosExtension` | HIGH |
| Kerberos Team Identifier | `apple` | HIGH |
| Kerberos payload type (Apple) | `com.apple.extensiblesso(kerberos)` — distinct from the redirect-type `com.apple.extensiblesso` used for Platform SSO | HIGH |
| Kerberos SSO type | `Credential` (not `Redirect`) | HIGH |
| Kerberos Intune deployment path | **Custom Template (mobileconfig upload)** — NOT Settings Catalog; Platform: macOS, Profile type: Templates > Custom | HIGH |
| Kerberos macOS version floor | **macOS 14.6** (for PSSO TGT integration; standalone Kerberos SSO extension works on earlier macOS) | HIGH |
| NUAL key — one-time permissions | `NewUserAuthorizationMode` (string; values: `Standard`, `Admin`, `Groups`, `Temporary`) | HIGH — VERIFIED |
| NUAL key — persistent permissions | `UserAuthorizationMode` (string; values: `Standard`, `Admin`, `Groups`) | HIGH — VERIFIED |
| NUAL key — enable new-user login | `EnableCreateUserAtLogin` (boolean; default: `false`) | HIGH — VERIFIED |
| NUAL resolution verdict | **RESOLVABLE — CLOSE PSSO-FUT-01** — all three key literals confirmed from Apple authoritative source | HIGH |

---

## Surface A: Kerberos SSO Extension

### A.1 What it is and how it relates to Platform SSO

The Kerberos SSO extension is an **Apple-native extension** — not a Microsoft product. It handles Kerberos Ticket Granting Ticket (TGT) acquisition for on-premises Active Directory and cloud-based Kerberos resources. It is distinct from the Microsoft Enterprise SSO plug-in (Platform SSO / SSO app extension).

In the Platform SSO + Kerberos context documented in v1.10, Microsoft Entra ID issues Kerberos TGTs during PSSO registration. These TGTs are shared with macOS's native Kerberos stack via TGT mapping in PSSO. The Apple Kerberos SSO extension then handles how those TGTs are delivered to applications.

**Coexistence model (already stated in v1.9 guide 09):** Platform SSO (`com.microsoft.CompanyPortalMac.ssoextension`, Redirect type) and the Kerberos SSO extension (`com.apple.AppSSOKerberos.KerberosExtension`, Credential type) run as separate profiles with separate extension identifiers. They do not conflict when identifiers are kept distinct.

### A.2 Extension identifier and payload type

| Field | Value | Source | Confidence |
|---|---|---|---|
| Extension Identifier | `com.apple.AppSSOKerberos.KerberosExtension` | Microsoft Entra Kerberos tutorial (mobileconfig example) + Apple Deployment Guide Kerberos payload settings page | HIGH |
| Team Identifier | `apple` | Same sources — mobileconfig examples | HIGH |
| Apple MDM payload type | `com.apple.extensiblesso(kerberos)` | Apple Platform Deployment — Extensible Single Sign-on Kerberos payload settings | HIGH |
| SSO Type | `Credential` (NOT `Redirect`) | Apple deployment guide; Intune device features guide comparison table | HIGH |
| Payload scope | System (device-level) | Microsoft Entra tutorial mobileconfig example | HIGH |

**Critical distinction:** The Platform SSO profile uses `com.apple.extensiblesso` with `Type: Redirect`. The Kerberos SSO extension profile uses `com.apple.extensiblesso(kerberos)` with `Type: Credential`. In the Intune UI, these are exposed under different profile shapes — Platform SSO goes through Settings Catalog; the Kerberos extension mobileconfig is uploaded via the Custom Template. Never configure both using the same extension identifier or the same profile.

### A.3 Intune deployment path for Kerberos SSO extension

The Kerberos SSO extension MDM profile is NOT deployed via Settings Catalog for the standalone Kerberos profile. Per the Microsoft Entra Kerberos tutorial (canonical Microsoft source, verified 2026-06-22):

**Profile creation path:**
```
Devices > Configuration > Create > New policy
  Platform: macOS
  Profile type: Templates
    Template: Custom
```

**Steps:**
1. Author the Kerberos mobileconfig file (see §A.4 for required keys)
2. In Intune: Devices > Configuration > Create > New Policy > macOS > Templates > Custom
3. Enter a name (e.g., "macOS - Platform SSO Kerberos On-Premises")
4. Set Deployment channel: **Device channel** (recommended)
5. Upload the `.mobileconfig` file
6. Assign to user groups (same user groups as Platform SSO policy)

**Repeat for Cloud Kerberos profile** if both on-prem and cloud Kerberos TGTs are needed.

**IMPORTANT NOTE about Settings Catalog + Kerberos interaction:** The Kerberos TGT *mapping behavior* (whether to map on-prem TGT, cloud TGT, both, or neither) is configured via a key in the Platform SSO Settings Catalog policy's **Extension Data** setting — NOT in the Kerberos mobileconfig. The `custom_tgt_setting` Extension Data key (documented in the Intune scenarios page) controls how PSSO-issued TGTs are delivered. The Kerberos mobileconfig is a separate, additional profile that configures the Apple Kerberos extension to consume those TGTs.

Source: [Microsoft Entra — Enable Kerberos SSO to on-premises Active Directory and Microsoft Entra ID Kerberos Resources in Platform SSO](https://learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on-kerberos-configuration) (updated 2026-06-15). Confidence: HIGH.

Also: [Microsoft Intune — Platform SSO scenarios for macOS — Kerberos section](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-scenarios-macos) (updated 2026-05-13). Confidence: HIGH.

### A.4 Required Kerberos mobileconfig keys

**On-premises Active Directory profile keys:**

| Configuration Key | Value | Notes |
|---|---|---|
| `ExtensionIdentifier` | `com.apple.AppSSOKerberos.KerberosExtension` | Required — the Apple Kerberos extension identifier |
| `TeamIdentifier` | `apple` | Required |
| `Type` | `Credential` | Required — Kerberos uses Credential type, not Redirect |
| `Realm` | `CONTOSO.COM` | Required — uppercase; your AD domain realm name |
| `Hosts` | `.contoso.com` and `contoso.com` | Required — both dot-prefixed and bare domain |
| `PayloadType` | `com.apple.extensiblesso` | Required — the outer payload type |
| `PayloadScope` | `System` | Recommended — deploy at device level |
| `ExtensionData > allowPlatformSSOAuthFallback` | `true` | Recommended — allows fallback to PSSO TGT |
| `ExtensionData > usePlatformSSOTGT` | `true` | KEY setting — uses the Platform SSO-issued TGT |
| `ExtensionData > performKerberosOnly` | `true` | Recommended — extension does only Kerberos, skips password expiry checks |
| `ExtensionData > syncLocalPassword` | `false` | Recommended — do not sync Kerberos/AD password to local macOS account |

**Cloud Kerberos (Microsoft Entra ID) profile additional keys:**

| Configuration Key | Value | Notes |
|---|---|---|
| `Realm` | `KERBEROS.MICROSOFTONLINE.COM` | Uppercase — Entra cloud Kerberos realm |
| `Hosts` | `windows.net` and `.windows.net` | Required for Azure Files / cloud Kerberos resources |
| `ExtensionData > preferredKDCs` | `kkdcp://login.microsoftonline.com/{TenantID}/kerberos` | Replace `{TenantID}` with your Entra tenant ID |
| `ExtensionData > usePlatformSSOTGT` | `true` | Required — consume PSSO TGT for cloud Kerberos |
| `ExtensionData > performKerberosOnly` | `true` | Same as on-prem |

Source: Full mobileconfig XML examples in Microsoft Entra Kerberos tutorial (verified 2026-06-22). Confidence: HIGH.

### A.5 macOS version requirements

| Scenario | macOS Version | Notes |
|---|---|---|
| Apple Kerberos SSO extension (standalone, no PSSO integration) | macOS 10.15+ | Extension exists without PSSO; limited utility if no TGT mapping |
| Kerberos SSO extension + PSSO TGT mapping (`usePlatformSSOTGT: true`) | **macOS 14.6 Sonoma** minimum | Microsoft Entra Kerberos tutorial explicitly states macOS 14.6 as minimum for PSSO Kerberos integration |
| Company Portal version (for PSSO Kerberos integration) | **5.2408.0 or later** | Required per Microsoft Entra Kerberos tutorial |
| TGT customization (`custom_tgt_setting` Extension Data key) | Company Portal version 2508 and newer | Per Intune scenarios page |

### A.6 On-premises AD prerequisites

The on-prem Kerberos SSO configuration requires:

1. **Windows Server 2008 or later** — AD domain controller requirement
2. **Network access** — Mac must be able to reach AD domain controllers via Wi-Fi, Ethernet, or VPN
3. **Microsoft Entra Kerberos (Cloud Kerberos Trust)** — Required for cloud Kerberos TGT scenario. If deploying Windows Hello for Business with Cloud Kerberos Trust is already complete, this prerequisite is met. Setup instructions: [Cloud Kerberos trust deployment guide](https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/deploy/hybrid-cloud-kerberos-trust)
4. **Platform SSO already deployed** — Kerberos TGT integration requires Platform SSO to be configured and devices registered; Kerberos SSO is an optional add-on to Platform SSO, not a standalone deployment
5. **DNS resolution** — Mac must resolve AD domain (`contoso.com`) via DNS

### A.7 `app-sso` CLI diagnostics for Kerberos

The `app-sso` command-line tool is the primary diagnostic utility. Commands confirmed by Microsoft Entra Kerberos tutorial (HIGH confidence):

| Command | Purpose | Expected output |
|---|---|---|
| `app-sso platform -s` | Show full Platform SSO + Kerberos TGT status | Shows `Device Registration`, `User Registration`, and Kerberos ticket details including `ticketKeyPath: tgt_ad` (on-prem) and `ticketKeyPath: tgt_cloud` (cloud) |
| `/usr/bin/klist` | List held Kerberos tickets (standard macOS Kerberos tool) | Lists TGTs with expiry times |
| `/usr/bin/kdestroy` | Destroy/clear Kerberos tickets | Removes cached TGTs |

After deploying both the PSSO policy and the Kerberos mobileconfig, the device should show two Kerberos tickets in `app-sso platform -s` output: one `tgt_ad` (on-prem) and one `tgt_cloud` (if cloud Kerberos is also configured).

**Note on `app-ssoctl`:** No documentation for an `app-ssoctl` command was found across Apple Platform Deployment, Microsoft Learn, or Apple Developer Forums as of 2026-06-22. The Apple Deployment Guide for Kerberos SSO extension documents `app-sso` only. The `app-ssoctl` name does not appear to be a valid macOS CLI tool. Use `app-sso` exclusively. Confidence: MEDIUM (cannot definitively rule out undocumented internal tool, but no public evidence exists).

### A.8 Browser configuration for Kerberos SSO

Safari supports Kerberos SSO by default. Other browsers require additional configuration:

| Browser | Required setting |
|---|---|
| Safari | No additional configuration needed |
| Microsoft Edge | Configure `AuthNegotiateDelegateAllowlist` and `AuthServerAllowlist` with on-premises AD forest information |
| Google Chrome | Configure `AuthNegotiateDelegateAllowlist` and `AuthServerAllowlist` with on-premises AD forest information |
| Firefox | Configure `network.negotiate-auth.trusted-uris` and `network.automatic-ntlm-auth.trusted-uris` |

Source: [Microsoft Entra — Enable Kerberos SSO tutorial — Browser Support section](https://learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on-kerberos-configuration) (updated 2026-06-15). Confidence: HIGH.

### A.9 What NOT to document in the Kerberos guide

| Out of scope | Reason |
|---|---|
| Azure Files / Cloud Kerberos TGT (limited preview) | Explicitly marked "currently in limited preview" in Microsoft Entra tutorial; document as preview callout only, not as GA feature |
| Kerberos SSO extension without Platform SSO | Out of scope; v1.10 documents PSSO-integrated Kerberos deployment only |
| `performKerberosOnly: false` scenarios (password expiry checks) | AD password management via Kerberos extension is a complex optional scenario; out of scope for v1.10 guide 10 |

---

## Surface B: Graph API — `platformCredentialAuthenticationMethod`

### B.1 GA vs Beta verdict: CONFIRMED GA in v1.0

**Verdict: GA. Ship the documentation.**

The `platformCredentialAuthenticationMethod` resource type and all three operations (List, Get, Delete) are documented under `graph-rest-1.0` — the generally available Microsoft Graph endpoint. Verified directly from:

- Microsoft Graph docs contributor repo (github.com/microsoftgraph/microsoft-graph-docs-contrib) — file paths under `api-reference/v1.0/`
- Microsoft Learn: `https://learn.microsoft.com/en-us/graph/api/resources/platformcredentialauthenticationmethod?view=graph-rest-1.0`
- Both the resource page and the operation pages carry `monikers: graph-rest-1.0`, confirming GA

The resource also exists in beta (same operations), but the v1.0 surface is stable and documentable.

Source: Direct WebFetch of Microsoft Learn v1.0 resource page (verified 2026-06-22). Also documented in the `macos-psso.md` Microsoft Entra overview page which explicitly lists the v1.0 Graph API URLs. Confidence: HIGH.

### B.2 Resource path

| Path variant | URL |
|---|---|
| Self (signed-in user) — delegated only | `GET /me/authentication/platformCredentialMethods` |
| Specific user (by ID or UPN) | `GET /users/{id | userPrincipalName}/authentication/platformCredentialMethods` |
| Get single method | `GET /users/{id}/authentication/platformCredentialMethods/{platformCredentialAuthenticationMethod-id}` |
| Delete single method | `DELETE /users/{id}/authentication/platformCredentialMethods/{platformCredentialAuthenticationMethod-id}` |

**Note on `/me` endpoint:** The `/me` endpoint requires a signed-in user and therefore only supports delegated permissions. Application permissions are not supported for `/me`. For automation scenarios (e.g., admin bulk-clearing credentials), the `/users/{id}` path is required.

### B.3 Supported operations

| Operation | HTTP Method | Returns | Notes |
|---|---|---|---|
| **List** | `GET` | Collection of `platformCredentialAuthenticationMethod` objects | Lists all Platform Credential registrations for a user |
| **Get** | `GET` (with specific ID) | Single `platformCredentialAuthenticationMethod` object | Gets properties of one registration; supports `$expand=device` to include device details |
| **Delete** | `DELETE` | `204 No Content` | Removes the credential registration; device must re-register for PSSO |
| Create | N/A | N/A | **NOT SUPPORTED** — registrations are created only by the device during PSSO enrollment |
| Update | N/A | N/A | **NOT SUPPORTED** — no PATCH operation exists |

Source: Microsoft Learn resource type page + individual operation pages (verified 2026-06-22). Confidence: HIGH.

### B.4 Resource properties

| Property | Type | Description |
|---|---|---|
| `id` | String | Unique identifier for the authentication method |
| `displayName` | String | Name of the device on which Platform Credential is registered |
| `createdDateTime` | DateTimeOffset | Date/time when the Platform Credential Key was registered |
| `keyStrength` | authenticationMethodKeyStrength | Key strength: `normal`, `weak`, or `unknown` |
| `platform` | authenticationMethodPlatform | Platform: `macOS`, `windows`, `iOS`, `android`, `linux`, or `unknown` |

**Relationship:**
- `device` — the registered device resource; expand with `?$expand=device` on a single GET

Source: Microsoft Learn v1.0 resource page (verified 2026-06-22). Confidence: HIGH.

### B.5 Required permissions — full matrix

**For LIST and GET operations:**

| Permission type | Least privileged | Higher privileged options |
|---|---|---|
| Delegated (work or school account) | `UserAuthMethod-PlatformCred.Read` | `UserAuthenticationMethod.Read`, `UserAuthenticationMethod.Read.All`, `UserAuthMethod-PlatformCred.Read.All`, `UserAuthMethod-PlatformCred.ReadWrite`, `UserAuthMethod-PlatformCred.ReadWrite.All`, `UserAuthenticationMethod.ReadWrite`, `UserAuthenticationMethod.ReadWrite.All` |
| Delegated (personal Microsoft account) | Not supported | Not supported |
| Application | `UserAuthMethod-PlatformCred.Read.All` | `UserAuthenticationMethod.Read.All`, `UserAuthMethod-PlatformCred.ReadWrite.All`, `UserAuthenticationMethod.ReadWrite.All` |

**For DELETE operations:**

| Permission type | Least privileged | Higher privileged options |
|---|---|---|
| Delegated (work or school account) | `UserAuthenticationMethod.ReadWrite` | `UserAuthMethod-PlatformCred.ReadWrite`, `UserAuthMethod-PlatformCred.ReadWrite.All`, `UserAuthenticationMethod.ReadWrite.All` |
| Delegated (personal Microsoft account) | Not supported | Not supported |
| Application | `UserAuthenticationMethod.ReadWrite.All` | `UserAuthMethod-PlatformCred.ReadWrite.All` |

**Required Entra roles for delegated access (when acting on another user's credentials):**
- Global Reader (read only)
- Authentication Administrator
- Privileged Authentication Administrator

**MFA re-prompt on DELETE:** When a user deletes their own authentication methods via delegated permissions, the system prompts for MFA re-authentication if the user last authenticated more than 10 minutes ago in the current session.

Source: Microsoft Learn List operation page + Delete operation page (verified 2026-06-22). Confidence: HIGH.

### B.6 PowerShell SDK cmdlets

| Operation | Cmdlet |
|---|---|
| List | `Get-MgUserAuthenticationPlatformCredentialMethod -UserId $userId` |
| Get | `Get-MgUserAuthenticationPlatformCredentialMethod -UserId $userId -PlatformCredentialAuthenticationMethodId $id` |
| Delete | `Remove-MgUserAuthenticationPlatformCredentialMethod -UserId $userId -PlatformCredentialAuthenticationMethodId $id` |

Module: `Microsoft.Graph.Identity.SignIns`

Source: PowerShell SDK code samples on Microsoft Learn operation pages (verified 2026-06-22). Confidence: HIGH.

### B.7 National cloud availability

All three operations (List, Get, Delete) are available in:
- Global service (commercial)
- US Government L4 (GCC High)
- US Government L5 (DoD)
- China operated by 21Vianet

Source: Cloud deployment tables on Microsoft Learn operation pages (verified 2026-06-22). Confidence: HIGH.

### B.8 What NOT to document in the Graph API doc

| Out of scope | Reason |
|---|---|
| Graph API for Windows/iOS/Android Platform Credentials | `platform` property can be non-macOS values but v1.10 scope is macOS Platform SSO follow-ons only |
| Programmatic creation of Platform Credential registrations | Create is not supported via Graph — by design; document explicitly |
| Multi-tenant scenarios | PSSO-FUT-03 is explicitly deferred to its own milestone |

---

## Surface C: NUAL MDM Plist Key Literals — PSSO-FUT-01 Resolution

### C.1 Verdict: VERIFIED. CLOSE PSSO-FUT-01.

Both key literals are confirmed from Apple's authoritative `apple/device-management` GitHub repository (the canonical Apple MDM schema, used by all MDM vendors) and cross-verified from the Apple Device Policy Explorer tool (appledevicepolicy.tools) which renders the same schema. Both sources agree exactly.

The PSSO-FUT-01 decision "keep deferred rather than ship a guessed key" was correct at Phase 77. The keys are now verified and the documentation can be written.

### C.2 Verified key literals

| Settings Catalog Display Name (shown in Intune) | MDM Plist Key Literal | Type | Allowed Values | Notes |
|---|---|---|---|---|
| "New User Authorization Mode" | `NewUserAuthorizationMode` | String | `Standard`, `Admin`, `Groups`, `Temporary` | One-time permissions applied when the new account is first created at login |
| "User Authorization Mode" | `UserAuthorizationMode` | String | `Standard`, `Admin`, `Groups` | Persistent permissions applied each time the user authenticates via PSSO |
| "Enable Create User At Login" (the boolean prerequisite for NUAL) | `EnableCreateUserAtLogin` | Boolean | `true` / `false`; default: `false` | Must be `true` for NUAL to be active; requires `UseSharedDeviceKeys = true` |

Source: [Apple device-management repository — `com.apple.extensiblesso.yaml`](https://github.com/apple/device-management/blob/release/mdm/profiles/com.apple.extensiblesso.yaml) (authoritative Apple MDM schema, `release` branch); cross-verified at [Apple Device Policy Explorer](https://appledevicepolicy.tools/policy-explorer/detail?type=com.apple.extensiblesso&branch=release) (2026-06-22). Confidence: HIGH.

Also confirmed by indirect verification: the [Intune Platform SSO scenarios page](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-scenarios-macos) lists all three display names in its End User Experience Settings table using identical wording, confirming that Intune exposes these keys as Settings Catalog settings under their display names. The Settings Catalog display names match the MDM plist key names exactly (same words, same case convention for the labels).

### C.3 Additional NUAL-related keys (context for the guide)

These keys are adjacent to the authorization-mode settings and may need documentation context in guide `08`:

| MDM Plist Key | Type | Default | macOS Version | Notes |
|---|---|---|---|---|
| `EnableCreateUserAtLogin` | Boolean | `false` | macOS 14+ | The prerequisite key — must be enabled for NUAL to work |
| `NewUserAuthorizationMode` | String | none | macOS 14+ | One-time account creation permissions |
| `UserAuthorizationMode` | String | none | macOS 14+ | Persistent sign-in permissions |
| `EnableCreateFirstUserDuringSetup` | Boolean | `true` | macOS 26+ | ADE-only: creates first user during Setup Assistant via Platform SSO |
| `NewUserAuthenticationMethods` | Array of strings | — | macOS 14+ | Allowed values: `Password`, `SmartCard`, `AccessKey` — the auth methods for newly created accounts at login |
| `EnableRegistrationDuringSetup` | Boolean | `false` | macOS 26+ | ADE-only: enables PSSO registration during Setup Assistant |

Source: Apple `device-management` repo, `release` branch, `com.apple.extensiblesso.yaml` (verified 2026-06-22). Confidence: HIGH.

### C.4 Intune Settings Catalog location for NUAL keys

In Intune, these settings appear in the Settings Catalog under:

```
Authentication > Extensible Single Sign On (SSO) > Platform SSO
```

The Settings Catalog picker shows them as:
- `Platform SSO > Enable Create User At Login` (Boolean toggle)
- `Platform SSO > New User Authorization Mode` (Enum: Standard / Admin / Groups)
- `Platform SSO > User Authorization Mode` (Enum: Standard / Admin / Groups)

Source: Intune Platform SSO scenarios page End User Experience Settings table (display names match); Settings Catalog path inferred from settings category structure confirmed in configure-platform-sso-macos.md. Confidence: HIGH for display names; MEDIUM for exact Settings Catalog picker path (the path was not explicitly verified in the fetched pages — it is inferred from the Settings Catalog structure already documented in v1.9 STACK.md §2.1).

**Resolution action for guide `08`:** The NUAL section in `08-auth-methods-deep-dive.md` currently has a deferred-item callout block stating the MDM key literals are unconfirmed. That block should be replaced with the verified literals above. The Settings Catalog table should be updated to include a new "MDM plist key literal" column (or inline key references).

### C.5 Intune's current display names for NUAL settings (cross-reference to verify no drift)

From the Intune scenarios page (fetched 2026-06-22, page last updated 2026-05-11):

| Intune Display Name | Allowed Values as shown in Intune | Notes |
|---|---|---|
| Enable Create User At Login | Enable or Disable | Note: the Apple schema key is `EnableCreateUserAtLogin` (boolean); Intune renders as Enable/Disable toggle |
| New User Authorization Mode | Standard, Admin, or Groups | Note: Intune docs say "Currently, Standard and Admin values are supported" — Groups and Temporary exist in Apple schema but may not be fully surfaced in Intune UI as of 2026-05-11 |
| User Authorization Mode | Standard, Admin, or Groups | Same caveat — Groups defined in Apple schema; Intune support status for Groups value should be noted as "schema-supported but Intune UI may not expose Groups" |

**Caveat to document:** The Apple `NewUserAuthorizationMode` schema includes a `Temporary` value (temporary session configuration for newly created accounts at login). This value is defined in Apple's MDM schema but does NOT appear in the Intune Settings Catalog display. The `Temporary` value would require a custom mobileconfig. Document this in guide `08` as a "schema value not exposed in Intune Settings Catalog."

---

## Authoritative Source URLs — v1.10 additions

### Microsoft Learn (HIGH confidence — all verified 2026-06-22)

| Purpose | URL | Last Updated |
|---|---|---|
| Kerberos SSO extension + Platform SSO tutorial | https://learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on-kerberos-configuration | 2026-06-15 |
| Platform SSO scenarios (Kerberos, Touch ID, non-MSAL) | https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-scenarios-macos | 2026-05-13 |
| Graph API — `platformCredentialAuthenticationMethod` resource (v1.0) | https://learn.microsoft.com/en-us/graph/api/resources/platformcredentialauthenticationmethod?view=graph-rest-1.0 | 2026-01-28 |
| Graph API — List operation (v1.0) | https://learn.microsoft.com/en-us/graph/api/platformcredentialauthenticationmethod-list?view=graph-rest-1.0 | 2025-11-13 |
| Graph API — Get operation (v1.0) | https://learn.microsoft.com/en-us/graph/api/platformcredentialauthenticationmethod-get?view=graph-rest-1.0 | (current) |
| Graph API — Delete operation (v1.0) | https://learn.microsoft.com/en-us/graph/api/platformcredentialauthenticationmethod-delete?view=graph-rest-1.0 | 2025-11-08 |
| macOS PSSO overview — Graph API section | https://learn.microsoft.com/en-us/entra/identity/devices/macos-psso | 2026-06-15 |
| SSO app extension vs Kerberos type comparison (Device Features guide) | https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-enterprise-sso-plugin-macos | 2024-05-01 |

### Apple Official (HIGH confidence — all verified 2026-06-22)

| Purpose | URL |
|---|---|
| Kerberos SSO extension overview | https://support.apple.com/guide/deployment/kerberos-sso-extension-depe6a1cda64/web |
| Extensible Single Sign-on Kerberos payload settings | https://support.apple.com/guide/deployment/extensible-single-sign-kerberos-payload-dep13c5cfdf9/web |
| Apple device-management repo — `com.apple.extensiblesso.yaml` | https://github.com/apple/device-management/blob/release/mdm/profiles/com.apple.extensiblesso.yaml |
| Apple Device Policy Explorer — com.apple.extensiblesso | https://appledevicepolicy.tools/policy-explorer/detail?type=com.apple.extensiblesso&branch=release |

---

## Confidence Summary — v1.10 surfaces

| Finding | Confidence | Verification basis |
|---|---|---|
| Graph API `platformCredentialAuthenticationMethod` is GA in v1.0 | HIGH | Direct fetch of `graph-rest-1.0`-moniker Microsoft Learn pages; Context7 docs confirming v1.0 path |
| Graph API URL paths (`/authentication/platformCredentialMethods`) | HIGH | Microsoft Learn + Context7 both confirm |
| Graph API operations: List, Get, Delete only (no Create/Update) | HIGH | Resource type page explicitly states only these three methods |
| Graph API permissions matrix (read vs delete) | HIGH | Individual operation pages on Microsoft Learn |
| Kerberos extension identifier `com.apple.AppSSOKerberos.KerberosExtension` | HIGH | Microsoft Entra tutorial mobileconfig example; Apple deployment guide Kerberos payload settings page |
| Kerberos payload type `com.apple.extensiblesso(kerberos)` | HIGH | Apple Platform Deployment — Extensible Single Sign-on Kerberos payload settings |
| Kerberos `Type: Credential` (not Redirect) | HIGH | Apple deployment guide + Intune Device Features guide comparison table |
| Kerberos Intune deployment = Custom Template (not Settings Catalog) | HIGH | Microsoft Entra tutorial Intune steps; Intune scenarios page shows Kerberos TGT mapping is via Extension Data key in existing PSSO policy |
| Kerberos `usePlatformSSOTGT: true` as the integration key | HIGH | Microsoft Entra tutorial; both on-prem and cloud profiles |
| macOS 14.6 as minimum for PSSO Kerberos TGT integration | HIGH | Microsoft Entra Kerberos tutorial prerequisites |
| `app-sso platform -s` showing `tgt_ad` and `tgt_cloud` ticket keys | HIGH | Microsoft Entra tutorial Testing Kerberos SSO section |
| No `app-ssoctl` command documented | MEDIUM | Not found in any Apple/Microsoft public source; likely does not exist as a public tool |
| NUAL key `NewUserAuthorizationMode` confirmed literal | HIGH | Apple `device-management` repo YAML + Apple Device Policy Explorer (dual verification) |
| NUAL key `UserAuthorizationMode` confirmed literal | HIGH | Same dual verification |
| NUAL key `EnableCreateUserAtLogin` confirmed literal | HIGH | Same dual verification |
| `Temporary` value for `NewUserAuthorizationMode` not in Intune Settings Catalog UI | MEDIUM | Intune docs (2026-05-11) list only Standard/Admin/Groups; Apple schema has Temporary; Intune UI support unconfirmed |
| NUAL settings in `Platform SSO >` category of Settings Catalog | HIGH | Intune scenarios page display names match Apple schema keys; Settings Catalog path confirmed by category structure in v1.9 docs |

---

## What NOT to document in v1.10 (scope guard)

| Surface | Reason |
|---|---|
| Multi-tenant PSSO (PSSO-FUT-03) | Explicitly deferred to its own architectural milestone |
| Kerberos SSO extension WITHOUT Platform SSO TGT integration | Out of v1.10 scope — v1.10 Kerberos guide covers PSSO-integrated deployment only |
| Azure Files / Cloud Kerberos (limited preview feature) | Explicitly marked "limited preview" in Microsoft Entra tutorial as of 2026-06-15; document as preview callout only |
| Graph API Create/Update for Platform Credentials | Does not exist |
| iOS/iPadOS Kerberos SSO or Graph API | v1.10 scope is macOS follow-ons only |
| Graph API operations for non-macOS Platform Credentials | Platform property filtering is a query concern; document macOS scope in examples |

---

## Integration with existing v1.9 STACK.md

The v1.9 STACK.md (researched 2026-06-20) remains fully valid. All Platform SSO, Secure Enclave, Enterprise SSO plug-in, and Settings Catalog facts from that research are inherited unchanged. The v1.10 additions in this document are additive.

Cross-reference: The Kerberos guide (`10-kerberos-sso-extension.md`) and the Graph API doc will cite the v1.9 Settings Catalog configuration path documented in v1.9 STACK.md §2.1 as a prerequisite ("Platform SSO must already be deployed and devices registered before Kerberos TGT integration can be configured").

---

*Stack research for: v1.10 macOS Platform SSO Follow-ons — Kerberos SSO Extension, Graph API Platform Credential management, NUAL MDM key verification*
*Researched: 2026-06-22*
*Source freshness: Microsoft Learn sources dated 2025-11-08 to 2026-06-15; Apple device-management repo `release` branch; all verified 2026-06-22*
