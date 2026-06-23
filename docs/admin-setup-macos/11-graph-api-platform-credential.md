---
last_verified: 2026-06-23
review_by: 2026-09-23
applies_to: ADE
audience: admin
platform: macOS
---

> **Platform gate:** This guide covers programmatic management of macOS Secure Enclave Platform Credentials via the Microsoft Graph API (`platformCredentialAuthenticationMethod`, Graph v1.0).
> For Platform SSO setup (prerequisite), see [Platform SSO Setup](07-platform-sso-setup.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).

# Graph API: Platform Credential Management

This guide is the operations reference for administering macOS Secure Enclave Platform Credentials programmatically via the Microsoft Graph v1.0 API. It covers the `platformCredentialAuthenticationMethod` resource — how to list, retrieve, and delete credential registrations for users in your tenant, the required permissions for each operation, and the leaver/offboarding automation pattern with a mandatory dry-run step.

---

## What This Guide Is NOT

> **No Create or Update operation exists for Platform Credentials.**
>
> Platform Credentials are **device-initiated only** — they are created automatically by Company Portal during Platform SSO registration on the macOS device. There is no Graph API endpoint to create or update a Platform Credential remotely. Scripting credential creation is not possible through the Graph API. If a user's credential is missing, the device must re-register through Company Portal.

This guide covers **List / Get / Delete** of existing Platform Credential registrations only. It does NOT cover:

- Creating or updating Platform Credentials (no such operation exists).
- Scripting Platform SSO enrollment or Company Portal registration.
- Bulk-audit reporting (enumerate users with zero registrations) — see the forward cross-link in the [Leaver / Offboarding Automation Pattern](#leaver--offboarding-automation-pattern) section for Phase 85 runbook #29.

---

## Resource Reference

The `platformCredentialAuthenticationMethod` resource (Graph v1.0) represents a single macOS Secure Enclave Platform Credential registration for a user. Each registration corresponds to one enrolled macOS device.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | String | Unique identifier for this credential registration. Inherited from `authenticationMethod`. |
| `displayName` | String | Name of the device on which Platform Credential is registered (maps to the device display name in Entra). |
| `createdDateTime` | DateTimeOffset | Timestamp of registration. Inherited from `authenticationMethod`. |
| `keyStrength` | `authenticationMethodKeyStrength` | Key strength of the credential. Values: `normal`, `weak`, `unknown`. A value of `normal` indicates the credential is Secure Enclave-backed. |
| `platform` | `authenticationMethodPlatform` | Platform of the registered device. Values: `macOS`, `windows`, `iOS`, `android`, `linux`, `unknown`. |

### Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| `device` | `device` | The registered Entra ID device object associated with this credential. Supports `$expand`. Only returned on a single GET request with `?$expand=device` — NOT returned by List operations. |

---

## Operations

### List Platform Credentials

Returns all Platform Credential registrations for a user.

#### HTTP

```http
# List own credentials (delegated, /me)
GET https://graph.microsoft.com/v1.0/me/authentication/platformCredentialMethods

# List another user's credentials (admin — requires cross-user permission)
GET https://graph.microsoft.com/v1.0/users/{id | userPrincipalName}/authentication/platformCredentialMethods
```

**Response:** Returns a collection of `platformCredentialAuthenticationMethod` objects. The `device` relationship is NOT expanded by default on List — use a single GET with `?$expand=device` to retrieve device details.

#### PowerShell SDK (`Microsoft.Graph.Identity.SignIns`)

```powershell
Import-Module Microsoft.Graph.Identity.SignIns

# List all credentials for a user
$userId = "user@contoso.com"
Get-MgUserAuthenticationPlatformCredentialMethod -UserId $userId
```

---

### Get a Platform Credential

Returns a single Platform Credential registration by ID.

#### HTTP

```http
# Get a single credential by ID
GET https://graph.microsoft.com/v1.0/users/{id | userPrincipalName}/authentication/platformCredentialMethods/{platformCredentialAuthenticationMethodId}

# Get with device details expanded
GET https://graph.microsoft.com/v1.0/users/{id}/authentication/platformCredentialMethods/{platformCredentialAuthenticationMethodId}?$expand=device
```

**Note on `$expand`:** The `device` relationship is only returned on a single GET request with `?$expand=device`. The List operation does not support `$expand`.

#### PowerShell SDK

```powershell
Import-Module Microsoft.Graph.Identity.SignIns

# Get a single credential by method ID
Get-MgUserAuthenticationPlatformCredentialMethod `
    -UserId $userId `
    -PlatformCredentialAuthenticationMethodId $methodId
```

---

### Delete a Platform Credential

Removes a Platform Credential registration from Entra ID.

> [!WARNING]
> **Deleting a Platform Credential severs the Entra ID binding for the user's device and forces PSSO re-registration.** The user will see the "Registration Required" prompt on their next Conditional Access-gated sign-in. The Secure Enclave private key on the device is NOT remotely erased — only the Entra-side record is removed. Use with care in automation loops; test with `-WhatIf` before running against production users.

#### HTTP

```http
# Delete a Platform Credential (DESTRUCTIVE — see [!WARNING] above)
DELETE https://graph.microsoft.com/v1.0/users/{id | userPrincipalName}/authentication/platformCredentialMethods/{platformCredentialAuthenticationMethodId}
```

**Response:** `204 No Content` on success.

#### PowerShell SDK

```powershell
Import-Module Microsoft.Graph.Identity.SignIns

# Dry-run first — ALWAYS verify before deleting in production
Remove-MgUserAuthenticationPlatformCredentialMethod `
    -UserId $userId `
    -PlatformCredentialAuthenticationMethodId $methodId `
    -WhatIf

# Delete for real — only after reviewing -WhatIf output
Remove-MgUserAuthenticationPlatformCredentialMethod `
    -UserId $userId `
    -PlatformCredentialAuthenticationMethodId $methodId `
    -Confirm
```

---

## Permissions

The permissions required differ by operation (read vs delete) and calling context (delegated vs application).

### Read Operations (List and Get)

| Permission type | Least privileged | Higher privileged |
|----------------|-----------------|-------------------|
| Delegated (work/school account, self via `/me`) | `UserAuthMethod-PlatformCred.Read` | `UserAuthenticationMethod.Read`, `UserAuthenticationMethod.ReadWrite`, `UserAuthMethod-PlatformCred.Read.All`, `UserAuthMethod-PlatformCred.ReadWrite`, `UserAuthMethod-PlatformCred.ReadWrite.All`, `UserAuthenticationMethod.Read.All`, `UserAuthenticationMethod.ReadWrite.All` |
| Delegated (admin acting on another user) | `UserAuthMethod-PlatformCred.Read` | (same as above) |
| Application | `UserAuthMethod-PlatformCred.Read.All` | `UserAuthenticationMethod.Read.All`, `UserAuthenticationMethod.ReadWrite.All`, `UserAuthMethod-PlatformCred.ReadWrite.All` |
| Personal Microsoft account | Not supported | Not supported |

**Minimum Entra role for cross-user delegated read:** Global Reader, Authentication Administrator, or Privileged Authentication Administrator.

### Delete Operation

| Permission type | Least privileged | Higher privileged |
|----------------|-----------------|-------------------|
| Delegated (work/school account, self via `/me`) | `UserAuthenticationMethod.ReadWrite` | `UserAuthMethod-PlatformCred.ReadWrite`, `UserAuthMethod-PlatformCred.ReadWrite.All`, `UserAuthenticationMethod.ReadWrite.All` |
| Delegated (admin acting on another user) | `UserAuthenticationMethod.ReadWrite` | (same as above) |
| Application | `UserAuthenticationMethod.ReadWrite.All` | `UserAuthMethod-PlatformCred.ReadWrite.All` |
| Personal Microsoft account | Not supported | Not supported |

**Minimum Entra role for cross-user delegated delete:** Authentication Administrator or Privileged Authentication Administrator. **Global Reader is NOT sufficient for delete operations.**

**MFA re-prompt:** If a user deletes their own credential and last authenticated more than 10 minutes ago in the current Graph session, the system will prompt for MFA before completing the delete.

### National Cloud Availability

| Global service | US Government L4 | US Government L5 (DOD) | China (21Vianet) |
|----------------|-----------------|------------------------|-----------------|
| Yes | Yes | Yes | Yes |

---

## Leaver / Offboarding Automation Pattern

The most common automation use case for Platform Credential management is the leaver/offboarding pattern: when a user leaves the organization, enumerate their Platform Credentials and delete them to sever the Entra binding on their enrolled devices.

> **Forward reference:** For bulk-audit reporting (enumerating all users with zero or more Platform Credential registrations across the tenant), see [L2 Runbook #29: macOS Graph Credential Investigation](../../docs/l2-runbooks/29-macos-graph-credential-investigation.md). Bulk-audit examples are out of scope for this guide.

### Mandatory Dry-Run Gate

**Always run the `-WhatIf` dry-run step before executing deletions in production.** Review the output to confirm you are targeting the correct user and credential IDs before proceeding.

```powershell
Import-Module Microsoft.Graph.Identity.SignIns

$leaverUpn = "user@contoso.com"

# Step 1: Enumerate credentials
$creds = Get-MgUserAuthenticationPlatformCredentialMethod -UserId $leaverUpn
if (-not $creds) {
    Write-Host "No Platform Credentials found for $leaverUpn"
    return
}

# Step 2: Review (dry-run with -WhatIf — MANDATORY before production delete)
foreach ($cred in $creds) {
    Write-Host "Found: $($cred.DisplayName) | id=$($cred.Id) | platform=$($cred.Platform) | created=$($cred.CreatedDateTime)"
    Remove-MgUserAuthenticationPlatformCredentialMethod `
        -UserId $leaverUpn `
        -PlatformCredentialAuthenticationMethodId $cred.Id `
        -WhatIf
}

# Step 3: Confirm before executing
# Review the -WhatIf output above, then re-run without -WhatIf only after confirming
# Remove-MgUserAuthenticationPlatformCredentialMethod `
#     -UserId $leaverUpn `
#     -PlatformCredentialAuthenticationMethodId $cred.Id `
#     -Confirm
```

**What happens after deletion:** The user's macOS device retains the Secure Enclave private key (it is NOT remotely erased), but the Entra-side registration record is removed. The user will be prompted for PSSO re-registration ("Registration Required") on their next Conditional Access-gated sign-in. For a returning user (re-hire), re-registration occurs automatically through Company Portal.

---

## Prerequisites

- **Platform SSO deployed:** Platform SSO must already be deployed and devices registered before Platform Credentials exist to manage. See [Platform SSO Setup](07-platform-sso-setup.md) for the Settings Catalog configuration and device registration verification.

- **Secure Enclave authentication method in use:** The Platform Credential resource represents Secure Enclave-backed credentials specifically. The Platform SSO authentication method must be configured for Secure Enclave key (not Password sync) for credentials to appear. See [Auth Methods Deep-Dive](08-auth-methods-deep-dive.md) for authentication method selection.

- **Appropriate Graph API permissions:** The calling identity (Entra App Registration for application context, or admin account for delegated context) must be granted the permissions documented in the [Permissions](#permissions) section above. Admin consent is required for all application permissions.

- **PowerShell SDK module (for PowerShell examples):**

  ```powershell
  Install-Module Microsoft.Graph.Identity.SignIns
  ```

  The `Microsoft.Graph.Identity.SignIns` module provides `Get-MgUserAuthenticationPlatformCredentialMethod` and `Remove-MgUserAuthenticationPlatformCredentialMethod`. Requires PowerShell 7+ and the Microsoft.Graph SDK.

---

## Verification

Use the following read-only command to confirm Platform Credentials exist for a user before performing any Delete operation. This is the safe pre-delete check — it does not modify any data.

```powershell
Import-Module Microsoft.Graph.Identity.SignIns

# Read-only — list credentials before any delete
$userId = "user@contoso.com"
$creds = Get-MgUserAuthenticationPlatformCredentialMethod -UserId $userId
$creds | Select-Object Id, DisplayName, Platform, CreatedDateTime, KeyStrength
```

**Expected output for an enrolled macOS device:**

| Id | DisplayName | Platform | CreatedDateTime | KeyStrength |
|----|-------------|----------|-----------------|-------------|
| `{guid}` | `Mac-Device-Name` | `macOS` | `2026-01-15T...` | `normal` |

A `KeyStrength` of `normal` confirms the credential is Secure Enclave-backed. An empty result set means no Platform Credentials are registered for the user — either Platform SSO is not deployed, the device has not completed registration, or credentials have already been deleted.

---

## See Also

- [Platform SSO Setup](07-platform-sso-setup.md) -- Settings Catalog policy creation, prerequisites, and verification for Platform SSO (prerequisite for this guide)
- [Auth Methods Deep-Dive](08-auth-methods-deep-dive.md) -- Authentication method selection for Platform SSO, including Secure Enclave key configuration
- [Platform SSO](../_glossary-macos.md#platform-sso) -- Glossary definition and terminology
- [Secure Enclave](../_glossary-macos.md#secure-enclave) -- Glossary definition for the hardware security module backing Platform Credentials
- [platformCredentialAuthenticationMethod resource type (v1.0)](https://learn.microsoft.com/en-us/graph/api/resources/platformcredentialauthenticationmethod?view=graph-rest-1.0) -- Microsoft Learn (authoritative resource type reference; properties and relationships)
- [List platformCredentialMethods (v1.0)](https://learn.microsoft.com/en-us/graph/api/platformcredentialauthenticationmethod-list?view=graph-rest-1.0) -- Microsoft Learn (List operation; permissions)
- [Get platformCredentialAuthenticationMethod (v1.0)](https://learn.microsoft.com/en-us/graph/api/platformcredentialauthenticationmethod-get?view=graph-rest-1.0) -- Microsoft Learn (Get operation; permissions)
- [Delete platformCredentialAuthenticationMethod (v1.0)](https://learn.microsoft.com/en-us/graph/api/platformcredentialauthenticationmethod-delete?view=graph-rest-1.0) -- Microsoft Learn (Delete operation; permissions; national cloud table)
- [L2 Runbook #29: macOS Graph Credential Investigation](../../docs/l2-runbooks/29-macos-graph-credential-investigation.md) -- Phase 85 runbook for bulk-audit / enumerate-users-with-registrations reporting (out of scope for this guide)

---

| Date | Change | Author |
|------|--------|--------|
| 2026-06-23 | Phase 84 (GRAPH-01/GRAPH-02): initial Graph API Platform Credential guide | -- |
