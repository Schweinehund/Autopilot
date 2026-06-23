---
last_verified: 2026-06-23
review_by: 2026-09-23
applies_to: ADE
audience: L2
platform: macOS
---

> **Platform gate:** This guide covers macOS Platform Credential L2 investigation via the Microsoft Graph API. For macOS Platform SSO investigation, see [macOS Platform SSO Investigation](27-macos-sso-investigation.md). For other macOS ADE investigation runbooks, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).

# macOS Graph Platform Credential Investigation

## Context

This runbook covers L2 investigation of macOS Secure Enclave Platform Credentials through the Microsoft Graph API, across three failure classes: Platform Credential not appearing in Graph (device enrolled but no credential record found), the delete-and-re-register flow (forcing PSSO re-registration by removing the stale Entra-side record), and permission or role errors when calling `platformCredentialMethods` operations.

Before starting: collect a diagnostic package per the [macOS Log Collection Guide](10-macos-log-collection.md). For Graph API calls, confirm you have appropriate permissions per [Graph API: Platform Credential Management §Permissions](../admin-setup-macos/11-graph-api-platform-credential.md#permissions) before proceeding.

No L1 escalation exists for this failure class — begin at Step 1.

> **Bulk-audit / enumerate-users-with-zero-registrations note:** This runbook is scoped to the single-user investigation workflow (enumerate, verify, delete-and-re-register, permission troubleshooting). Bulk-audit reporting across the tenant is out of scope for this runbook per D-06 — see [Graph API: Platform Credential Management](../admin-setup-macos/11-graph-api-platform-credential.md) for the leaver/offboarding automation pattern that serves as a starting point for tenant-wide scripts.

---

### Step 1: Enumerate Platform Credentials for the user

Start with a read-only enumeration to confirm whether any Platform Credential records exist for the affected user in Entra ID. This operation does not modify any data.

```http
GET https://graph.microsoft.com/v1.0/users/{id | userPrincipalName}/authentication/platformCredentialMethods
```

**Minimum permission for this operation (delegated):** `UserAuthMethod-PlatformCred.Read` (or any higher scope listed in [guide 11 §Permissions](../admin-setup-macos/11-graph-api-platform-credential.md#permissions)).

**PowerShell SDK equivalent:**

```powershell
Import-Module Microsoft.Graph.Identity.SignIns

$userId = "user@contoso.com"
Get-MgUserAuthenticationPlatformCredentialMethod -UserId $userId
```

**Interpreting the response:**

| Response | What it signals |
|----------|----------------|
| Collection with one or more `platformCredentialAuthenticationMethod` objects | Platform Credential(s) exist in Entra — proceed to Step 2 to verify properties |
| Empty collection `[]` or `null` | No Platform Credential registered — see interpretation guidance below |

**If the collection is empty:** The user has no Platform Credential registered in Entra. Possible causes:

- Platform SSO is not deployed or the Secure Enclave authentication method is not configured (Password-sync PSSO does not produce Platform Credentials; only Secure Enclave method does — see [Auth Methods Deep-Dive](../admin-setup-macos/08-auth-methods-deep-dive.md)).
- The device has not yet completed PSSO registration. Confirm PSSO registration state on the device via `app-sso platform -s` before assuming a Graph-side problem.
- Platform Credentials have been previously deleted (by an admin or leaver workflow). The device will prompt for PSSO re-registration on the next Conditional Access-gated sign-in.

### Step 2: Verify credential properties and device association

If Step 1 returned one or more credentials, retrieve the properties of the specific credential to confirm it is associated with the correct device and shows the expected `platform` and `keyStrength` values.

```http
GET https://graph.microsoft.com/v1.0/users/{id}/authentication/platformCredentialMethods/{platformCredentialAuthenticationMethodId}?$expand=device
```

Note: the `$expand=device` query parameter retrieves the associated Entra ID device object in the same response. The `device` relationship is NOT returned by the List operation in Step 1 — a single GET with `$expand=device` is required.

**PowerShell SDK equivalent:**

```powershell
Import-Module Microsoft.Graph.Identity.SignIns

Get-MgUserAuthenticationPlatformCredentialMethod `
    -UserId $userId `
    -PlatformCredentialAuthenticationMethodId $methodId
```

**Expected properties for a healthy macOS Platform Credential:**

| Property | Expected value | Notes |
|----------|---------------|-------|
| `platform` | `macOS` | Confirms this is a macOS credential (not Windows, iOS, etc.) |
| `keyStrength` | `normal` | Confirms the credential is Secure Enclave-backed; `weak` or `unknown` may indicate a registration anomaly |
| `displayName` | Device name | Should match the device's Entra ID display name |
| `createdDateTime` | Recent timestamp | A very old `createdDateTime` on a device that was re-enrolled may indicate a stale record from a prior enrollment |

If the credential exists but is stale (wrong device, old timestamp from a prior enrollment, or the device has been wiped and re-enrolled), proceed to Step 3 to delete the stale record and force re-registration.

### Step 3: Delete credential (delete-and-re-register flow)

> [!WARNING]
> **Deleting a Platform Credential severs the Entra ID binding for the user's device and forces PSSO re-registration.** The user will see the "Registration Required" prompt on their next Conditional Access-gated sign-in. The Secure Enclave private key on the device is NOT remotely erased — only the Entra-side record is removed. Use with care in automation loops; test with `-WhatIf` before running against production users.

Delete the identified credential using its `platformCredentialAuthenticationMethodId` from Step 2.

**Always perform a dry-run first:**

```powershell
Import-Module Microsoft.Graph.Identity.SignIns

# Dry-run — MANDATORY before production delete
Remove-MgUserAuthenticationPlatformCredentialMethod `
    -UserId $userId `
    -PlatformCredentialAuthenticationMethodId $methodId `
    -WhatIf
```

Review the `-WhatIf` output to confirm you are targeting the correct user and credential ID, then execute:

```http
DELETE https://graph.microsoft.com/v1.0/users/{id | userPrincipalName}/authentication/platformCredentialMethods/{platformCredentialAuthenticationMethodId}
```

**Expected response:** `204 No Content` on success.

**PowerShell SDK equivalent (after dry-run review):**

```powershell
Remove-MgUserAuthenticationPlatformCredentialMethod `
    -UserId $userId `
    -PlatformCredentialAuthenticationMethodId $methodId `
    -Confirm
```

**Minimum permission for Delete (delegated):** `UserAuthenticationMethod.ReadWrite` for an admin acting on another user. See [guide 11 §Permissions](../admin-setup-macos/11-graph-api-platform-credential.md#permissions) for the full permissions matrix including application permissions and national-cloud availability.

### Step 4: Verify re-registration

After deleting the credential, verify that PSSO re-registration is initiated correctly on the device.

**Expected user experience:** The user will see a "Registration Required" prompt (via Conditional Access) on their next sign-in to a managed app or Conditional Access-protected resource.

**Confirm re-registration via `app-sso platform -s`** on the device (before re-registration, expect the output to show `User Registration` in a non-REGISTERED state):

```bash
app-sso platform -s
```

After the user responds to the "Registration Required" prompt and completes re-registration, re-run `app-sso platform -s` and confirm:

- `Device Registration: REGISTERED`
- `User Registration: REGISTERED`

Also re-run Step 1 to confirm a new `platformCredentialAuthenticationMethod` record appears in Graph:

```http
GET https://graph.microsoft.com/v1.0/users/{id | userPrincipalName}/authentication/platformCredentialMethods
```

A new record with a fresh `createdDateTime` confirms that re-registration succeeded.

### Step 5: Permission and role troubleshooting

If Step 1, 2, or 3 returns a `401 Unauthorized` or `403 Forbidden` response, the calling identity lacks the required permission for that operation. Distinguish between:

**Read vs delete scope mismatch:** Read operations require `UserAuthMethod-PlatformCred.Read` (or higher); delete operations require `UserAuthenticationMethod.ReadWrite` (delegated) or `UserAuthenticationMethod.ReadWrite.All` (application). A token with only read scope will fail on DELETE with `403 Forbidden`.

**Delegated vs application context:** For delegated calls, the signed-in admin account must hold at least Authentication Administrator or Privileged Authentication Administrator role for cross-user operations. Global Reader is NOT sufficient for delete. For application (daemon) context, the app registration must be granted `UserAuthenticationMethod.ReadWrite.All` with admin consent.

**National cloud:** Verify the endpoint you are calling matches your tenant's sovereign cloud. The `platformCredentialMethods` operations are available in Global, US Gov L4, US Gov L5 (DOD), and China (21Vianet) — see [guide 11 §National Cloud Availability](../admin-setup-macos/11-graph-api-platform-credential.md#national-cloud-availability) for the full table.

For the complete permissions matrix (least-privileged to higher-privileged, delegated vs application, national-cloud availability table), see **[Graph API: Platform Credential Management §Permissions](../admin-setup-macos/11-graph-api-platform-credential.md#permissions)** — this is the authoritative in-suite reference; the full table is not replicated here to avoid maintenance drift.

---

## Microsoft Support Escalation Packet

When the steps above do not resolve the issue, engage Microsoft Support. Assemble the following before opening a case:

- **Graph API error response** — full HTTP response including status code, error code (e.g., `Request_ResourceNotFound`, `Authorization_RequestDenied`), message, and request ID from the response headers
- **`app-sso platform -s` full JSON output** — captured on the affected device; confirms device-side PSSO registration state
- **Entra admin center screenshot** — Entra admin center > Users > [user] > Authentication methods, showing Platform Credentials (or their absence)
- **Intune device configuration status screenshot** — Intune admin center > Devices > [device] > Configuration, showing Platform SSO Settings Catalog policy status
- **App Registration permissions screenshot** (for application-context failures) — the API permissions blade of the Entra App Registration used for Graph calls, showing granted scopes and admin consent state
- **macOS version** and **Company Portal version** — from the Intune device record or device About screen

---

## Related Resources

- [macOS Log Collection Guide (runbook 10)](10-macos-log-collection.md) — prerequisite for this runbook
- [Graph API: Platform Credential Management](../admin-setup-macos/11-graph-api-platform-credential.md) — authoritative reference for endpoints, permissions, `[!WARNING]` delete semantics, and leaver/offboarding automation pattern (link-not-copy)
- [macOS Platform SSO Investigation (runbook 27)](27-macos-sso-investigation.md) — for shared-symptom tickets involving PSSO registration failures or "Registration Required" loop
- [macOS ADE L2 Runbook Index](00-index.md#macos-ade-runbooks)

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-23 | Initial version — macOS Graph Platform Credential L2 investigation (RUN-02): enumerate/verify, delete-and-re-register (with mandatory [!WARNING]), permission/role troubleshooting | -- |
