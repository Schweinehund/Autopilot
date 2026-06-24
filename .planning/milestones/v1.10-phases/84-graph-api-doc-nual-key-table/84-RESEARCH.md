# Phase 84: Graph API Doc + NUAL Key Table - Research

**Researched:** 2026-06-23
**Domain:** Microsoft Graph v1.0 `platformCredentialAuthenticationMethod` resource; Apple `com.apple.extensiblesso` NUAL MDM plist keys; documentation suite integration patterns
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01 (Graph doc shape):** Guide 11 uses a hybrid structure — mandatory suite anchors (frontmatter, Platform-gate header, `## Prerequisites`, `## Verification`, `## See Also`, version-history table) + operations-reference body (resource reference → List/Get/Delete operations → permissions matrix → `[!WARNING]` callout → automation pattern). Mirrors guide 10 hybrid precedent.
- **D-02 (Automation depth):** Middle depth — leaver/offboarding pattern (get → confirm → delete) with mandatory dry-run step. No bulk-audit examples (Phase 85 RUN-02). One-line forward cross-link to runbook #29 acceptable.
- **D-03 (HTTP primary):** HTTP is primary/canonical surface; PowerShell SDK (`Microsoft.Graph.Identity.SignIns`) is required co-equal companion for each operation. Both mandatory per GRAPH-01. Neither may be dropped.
- **D-04 (NUAL presentation):** Replace guide 08's existing NUAL Settings-Catalog table with one consolidated table carrying: display name + verified MDM plist key literal + type/values + one-time-vs-persistent dimension.
- **D-05 (NUAL table must-surface):** Verified literals `NewUserAuthorizationMode` (one-time; Standard/Admin/Groups/Temporary) and `UserAuthorizationMode` (persistent; Standard/Admin/Groups); correct existing line-275 cell to include `Temporary`; surface `EnableCreateUserAtLogin` prerequisite with `UseSharedDeviceKeys=Enabled` dependency; surface one-time-vs-persistent asymmetry; note `Temporary` is defined in Apple schema but NOT surfaced in Intune Settings Catalog UI.
- **D-06 (NUAL deferred blockquote removal):** Remove the v1.9 deferred-item blockquote at `08-auth-methods-deep-dive.md:278-286`. Surgical edit only — do not rewrite the `## New User At Login Window` section prose.
- **D-07 (Glossary integration):** Extend the existing Platform SSO / Secure Enclave Platform Credential term with a reciprocal `> See also:` pointer to guide 11. Reuse the D-15 `> See also:` convention (lines 128/140/146/158).
- **D-08 (Endpoint reconciliation — MANDATORY pre-task):** Navigation property is `platformCredentialMethods` in the URL for ALL operations including DELETE. `platformCredentialAuthenticationMethod` is the resource type name, NOT the URL segment. Plan 84-01 must verify against live Microsoft Learn before drafting. See verified canonical HTTP lines below.
- **D-09 (Permissions — resolve at plan time):** Confirm `UserAuthenticationMethod.ReadWrite.All` (delete) vs correct read scope; distinguish delegated vs application; note national-cloud availability. See verified permissions matrix below.

### Claude's Discretion

- Exact section ordering within the operations body, callout wording, table column layout, and which guide-10 anchors to carry vs drop, subject to suite anchors in D-01 and must-surface items in D-05.

### Deferred Ideas (OUT OF SCOPE)

- Bulk-audit / enumerate-users-with-0-registrations reporting examples → Phase 85 RUN-02
- macOS capability-matrix Graph-credential rows → Phase 85 REF-01
- Reciprocal `_glossary.md` (Windows glossary) see-also + 4-platform comparison cell updates → Phase 85 REF-02
- Navigation-hub / quick-ref-l2 integration → Phase 87
- Create/Update Graph operations (do not exist)
- Scripting credential creation (anti-feature)

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| GRAPH-01 | New `11-graph-api-platform-credential.md` with GA `platformCredentialAuthenticationMethod` resource (Graph v1.0), List/Get/Delete operations (HTTP + PowerShell SDK), key properties, and `Microsoft.Graph.Identity.SignIns` SDK cmdlets | Fully verified — all three operations confirmed GA at v1.0; HTTP URLs, PowerShell cmdlets, and response shapes verified from live Microsoft Learn (2025-11-08 to 2026-05-27) |
| GRAPH-02 | Graph doc documents required Graph permissions + Entra roles (read vs delete; delegated vs application; national-cloud availability) and mandatory `[!WARNING]` safety callout — Delete severs Entra binding (forces PSSO re-registration), does NOT remote-erase Secure Enclave key | Permissions matrix fully verified from live Microsoft Learn; national-cloud table verified; `[!WARNING]` pattern confirmed from `03-esp-policy.md` suite precedent |
| NUAL-01 | Guide 08 NUAL section documents verified MDM plist key literals `NewUserAuthorizationMode` (Standard/Admin/Groups/Temporary) and `UserAuthorizationMode` (Standard/Admin/Groups) + `EnableCreateUserAtLogin` prerequisite + one-time-vs-persistent asymmetry; v1.9 deferred-item callout removed (PSSO-FUT-01 closed) | Verified from Apple `device-management` YAML schema (release branch); `Temporary` confirmed in schema for `NewUserAuthorizationMode` only; Intune Settings Catalog display-name mapping confirmed from `FEATURES.md` (Microsoft Learn Settings Catalog page, updated 2026-05-11) |

</phase_requirements>

---

## Summary

Phase 84 delivers two things: a new Graph-API operations doc (`11-graph-api-platform-credential.md`) for programmatic management of macOS Secure Enclave Platform Credentials, and a surgical edit to guide 08's NUAL section replacing the v1.9 deferred-item blockquote with verified MDM payload key literals.

The highest-value research task was the D-08/D-09 endpoint and permissions reconciliation against live Microsoft Learn. This research resolves the contradiction in the prior PITFALLS.md (`:201/:224` DELETE used `platformCredentialAuthenticationMethod` in the URL). **CONFIRMED: the navigation property used in the URL for ALL operations — List, Get, AND Delete — is `platformCredentialMethods`, not `platformCredentialAuthenticationMethod`.** Every prior research document that used `platformCredentialAuthenticationMethod` as a URL segment was incorrect. The correct DELETE URL is `DELETE /users/{id}/authentication/platformCredentialMethods/{platformCredentialAuthenticationMethodId}`. Plan 84-01's pre-task check is satisfied by this research.

The NUAL plist key literals (`NewUserAuthorizationMode`, `UserAuthorizationMode`, `EnableCreateUserAtLogin`) are confirmed from the Apple `device-management` YAML schema (release branch). The `Temporary` value exists only in `NewUserAuthorizationMode`, not `UserAuthorizationMode`. This is the authoritative source for PSSO-FUT-01 closure. No second-pass verification against the Intune Settings Catalog page was blocked — the Microsoft Learn Settings Catalog page (updated 2026-05-11) surfaces these display names and was previously confirmed in `FEATURES.md`.

**Primary recommendation:** Execute the three plans in order: 84-01 (pre-task verification, now satisfied by this research), 84-02 (author guide 11), 84-03 (guide 08 NUAL surgical edit + 00-overview + glossary). The endpoint reconciliation (D-08) and permissions matrix (D-09) are fully pre-resolved — plans 84-02 and 84-03 may proceed directly to content authoring.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Graph API operations doc (guide 11) | Documentation | — | New Markdown file; no runtime tier. HTTP + PowerShell examples are code samples, not deployed code. |
| NUAL key table update (guide 08) | Documentation | — | Surgical Markdown edit to an existing file; no runtime tier. |
| `00-overview.md` guide 11 node | Documentation | — | Mermaid + numbered list extension; follows exact guide 10 precedent. |
| Glossary see-also extension | Documentation | — | Single `> See also:` line appended inside existing Platform SSO term blockquote. |

This is a documentation-only phase. There are no runtime, API, database, or frontend tiers involved.

---

## Standard Stack

This is a pure documentation phase. There are no packages to install.

**Documentation tooling (pre-existing, no installs needed):**

| Tool | Version | Purpose |
|------|---------|---------|
| GitHub Flavored Markdown | — | `[!WARNING]` / `[!CAUTION]` callout blockquotes, tables, code fences |
| Mermaid (in `00-overview.md`) | — | `graph LR` diagram, already in use |

---

## Package Legitimacy Audit

Not applicable — this phase installs no packages. Documentation-only deliverables.

---

## Architecture Patterns

### Recommended Project Structure (new + edited files)

```
docs/
  admin-setup-macos/
    11-graph-api-platform-credential.md   # NEW — hybrid operations-reference guide
    08-auth-methods-deep-dive.md          # EDIT — NUAL section surgical update
    00-overview.md                         # EDIT — guide 11 node addition
  _glossary-macos.md                      # EDIT — Platform SSO see-also extension
```

### Pattern 1: Hybrid Suite-Anchor + Operations-Reference Body (from guide 10)

**What:** Mandatory suite anchors (frontmatter, Platform-gate header, `## Prerequisites`, `## Verification`, `## See Also`, version-history table) wrap an operations-reference-shaped body rather than a Settings-Catalog config guide body.

**When to use:** Any new guide in the `admin-setup-macos/` suite that covers a non-Settings-Catalog capability (Graph API, CLI operations, etc.).

**Template (from guide 10, `10-kerberos-sso-extension.md` lines 1-17):**
```yaml
---
last_verified: 2026-06-23
review_by: 2026-09-23
applies_to: ADE
audience: admin
platform: macOS
---

> **Platform gate:** This guide covers [topic] for macOS [scope].
> For Platform SSO setup (prerequisite), see [Platform SSO Setup](07-platform-sso-setup.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).

# [Guide Title]

[One-paragraph intro]

---

## What This Guide Is NOT
```

**Body sequence for guide 11 (Graph API operations-reference):**
1. `## What This Guide Is NOT` (disambiguation — no Create/Update; device-initiated only)
2. `## Resource Reference` (properties table: id, displayName, createdDateTime, keyStrength, platform, device relationship)
3. `## Operations`
   - `### List Platform Credentials` (GET /users/{id}/authentication/platformCredentialMethods)
   - `### Get a Platform Credential` (GET /users/{id}/authentication/platformCredentialMethods/{id})
   - `### Delete a Platform Credential` (DELETE — with `[!WARNING]` callout)
4. `## Permissions` (permissions matrix table)
5. `## Leaver / Offboarding Automation Pattern` (dry-run-first script)
6. `## Prerequisites`
7. `## Verification`
8. `## See Also`
9. Version-history table

### Pattern 2: Suite `[!WARNING]` Blockquote for Destructive Operations

**What:** GitHub Flavored Markdown `> [!WARNING]` blockquote immediately before or within the DELETE operation section. Required by suite convention (G-2, PITFALLS.md).

**Source:** `docs/admin-setup-apv1/03-esp-policy.md` lines 101-105.
[VERIFIED: Microsoft Learn + internal suite]

```markdown
> [!WARNING]
> **Deleting a Platform Credential severs the Entra ID binding for the user's device and forces PSSO re-registration.** The user will see the "Registration Required" prompt on their next Conditional Access-gated sign-in. The Secure Enclave private key on the device is NOT remotely erased — only the Entra-side record is removed. Use with care in automation loops; test with `-WhatIf` before running against production users.
```

### Pattern 3: Glossary Reciprocal `> See also:` Convention (D-15)

**What:** Append a `> See also:` line INSIDE the existing `> **Windows equivalent:**` blockquote (or the standalone `> See also:` blockquote if no Windows equivalent exists). Do not create a new standalone blockquote.

**Source:** `_glossary-macos.md` lines 128/140/146/158 — the D-15 convention.
[VERIFIED: internal codebase read]

**Current Platform SSO term see-also (line 128):**
```markdown
> See also: [Enterprise SSO Plug-in](#enterprise-sso-plug-in); [Entra ID SSO](_glossary.md#entra-id-sso); [Platform SSO Setup Guide](admin-setup-macos/07-platform-sso-setup.md).
```

**Target state** (extend same line — add guide 11 link):
```markdown
> See also: [Enterprise SSO Plug-in](#enterprise-sso-plug-in); [Entra ID SSO](_glossary.md#entra-id-sso); [Platform SSO Setup Guide](admin-setup-macos/07-platform-sso-setup.md); [Graph API: Platform Credential Management](admin-setup-macos/11-graph-api-platform-credential.md).
```

### Pattern 4: `00-overview.md` Mermaid + Numbered List Extension

**What:** Add guide 11 as a new node in the `graph LR` Mermaid diagram and append item 11 to the numbered list. Follow the exact Phase 83 precedent.

**Source:** `00-overview.md` lines 20-52 (current state).
[VERIFIED: internal codebase read]

**Current Mermaid last node:** `J[10. Kerberos SSO<br/>Extension]`
**New node to add:** `J --> K[11. Graph API<br/>Platform Credential]`

**Current numbered list last entry (line 52):** item 10 ending with `app-sso platform -s` / `klist` diagnostics.
**New item 11:** `**[Graph API: Platform Credential Management](11-graph-api-platform-credential.md)** -- ...`

### Anti-Patterns to Avoid

- **Using `platformCredentialAuthenticationMethod` as a URL segment:** The resource type name is NOT the navigation property. All three HTTP operations use `platformCredentialMethods` in the URL. See D-08 verified canonical HTTP lines in the Code Examples section.
- **Documenting the beta endpoint:** The resource is GA in v1.0. Never use `/beta/` in examples.
- **Scripting credential creation:** No Graph Create operation exists. The guide must include an explicit "What This Guide Is NOT" noting that credentials are device-initiated only.
- **DELETE without `[!WARNING]`:** Hard requirement (G-2). The callout is not optional polish.
- **NUAL section rewrite:** Guide 08 NUAL change is surgical — table consolidation + deferred blockquote removal only. No prose rewrite of `## New User At Login Window`.
- **Adding a redundant second NUAL table:** D-04 mandates one consolidated table replacing the existing one.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| `[!WARNING]` callout syntax | Custom callout HTML/CSS | GFM `> [!WARNING]` blockquote | Suite convention; renders in GitHub and MkDocs; used in `03-esp-policy.md` |
| Mermaid diagram node | Inline SVG | Extend existing `graph LR` in `00-overview.md` | Consistent rendering; all guides already use this pattern |
| PowerShell dry-run | Custom `-WhatIf`-style logic | `-WhatIf` native parameter | `Remove-MgUserAuthenticationPlatformCredentialMethod` natively supports `-WhatIf` and `-Confirm` (verified from Microsoft Learn cmdlet reference) |

---

## Code Examples

Verified patterns from live Microsoft Learn and official Apple schema sources.

### D-08 VERIFIED: Canonical HTTP Request Lines for All Three Operations

Source: Microsoft Learn v1.0 API reference (fetched 2026-06-23)
[VERIFIED: Microsoft Learn — platformcredentialauthenticationmethod-list, -get, -delete (v1.0)]

```http
# List own credentials (delegated, /me)
GET https://graph.microsoft.com/v1.0/me/authentication/platformCredentialMethods

# List another user's credentials (admin)
GET https://graph.microsoft.com/v1.0/users/{id | userPrincipalName}/authentication/platformCredentialMethods

# Get a single credential
GET https://graph.microsoft.com/v1.0/users/{id | userPrincipalName}/authentication/platformCredentialMethods/{platformCredentialAuthenticationMethodId}

# Get with device expansion
GET https://graph.microsoft.com/v1.0/users/{id}/authentication/platformCredentialMethods/{platformCredentialAuthenticationMethodId}?$expand=device

# Delete a credential (DESTRUCTIVE — see [!WARNING] callout)
DELETE https://graph.microsoft.com/v1.0/users/{id | userPrincipalName}/authentication/platformCredentialMethods/{platformCredentialAuthenticationMethodId}
```

**Note on D-08 resolution:** `platformCredentialMethods` is the navigation property (URL segment). `platformCredentialAuthenticationMethod` is the resource type name (used in `@odata.type` values and operation reference titles). The prior `PITFALLS.md:201` DELETE URL (`…/platformCredentialAuthenticationMethod/{id}`) was INCORRECT. All docs must use `platformCredentialMethods` in the URL.

### PowerShell SDK Cmdlets (Microsoft.Graph.Identity.SignIns)

Source: Microsoft Learn PowerShell cmdlet reference and operation pages (fetched 2026-06-23)
[VERIFIED: Microsoft Learn — platformcredentialauthenticationmethod-list, -get, -delete PowerShell tabs]

```powershell
# Module import
Import-Module Microsoft.Graph.Identity.SignIns

# List all credentials for a user
Get-MgUserAuthenticationPlatformCredentialMethod -UserId $userId

# Get a single credential
Get-MgUserAuthenticationPlatformCredentialMethod -UserId $userId -PlatformCredentialAuthenticationMethodId $methodId

# Delete with -WhatIf (dry-run — ALWAYS test first)
Remove-MgUserAuthenticationPlatformCredentialMethod `
    -UserId $userId `
    -PlatformCredentialAuthenticationMethodId $methodId `
    -WhatIf

# Delete for real (after -WhatIf review)
Remove-MgUserAuthenticationPlatformCredentialMethod `
    -UserId $userId `
    -PlatformCredentialAuthenticationMethodId $methodId `
    -Confirm
```

**`-WhatIf` status:** CONFIRMED. `Remove-MgUserAuthenticationPlatformCredentialMethod` supports both `-WhatIf` (reports what would happen without deleting) and `-Confirm` (prompts before each deletion). Also supports `-PassThru` (returns true on success). This satisfies the G-2 dry-run requirement natively for the PowerShell surface.

### Leaver/Offboarding Automation Pattern (D-02)

```powershell
# Leaver/offboarding pattern — enumerate then delete with -WhatIf gate
Import-Module Microsoft.Graph.Identity.SignIns

$leaverUpn = "user@contoso.com"

# Step 1: Enumerate credentials
$creds = Get-MgUserAuthenticationPlatformCredentialMethod -UserId $leaverUpn
if (-not $creds) {
    Write-Host "No Platform Credentials found for $leaverUpn"
    return
}

# Step 2: Review (dry-run)
foreach ($cred in $creds) {
    Write-Host "Found: $($cred.DisplayName) | id=$($cred.Id) | platform=$($cred.Platform) | created=$($cred.CreatedDateTime)"
    Remove-MgUserAuthenticationPlatformCredentialMethod `
        -UserId $leaverUpn `
        -PlatformCredentialAuthenticationMethodId $cred.Id `
        -WhatIf
}

# Step 3: Confirm before executing
# Re-run without -WhatIf only after reviewing the output above
```

### NUAL Consolidated Table (NUAL-01 verified literals)

Source: Apple `device-management` YAML schema, release branch (fetched 2026-06-23)
[VERIFIED: Apple device-management GitHub repo — com.apple.extensiblesso.yaml]

```markdown
| Settings Catalog Display Name | MDM plist key | Type | Allowed Values | Scope |
|-------------------------------|--------------|------|----------------|-------|
| Enable Create User At Login | `EnableCreateUserAtLogin` | Boolean | `true` / `false` (default: `false`) | Prerequisite — requires `UseSharedDeviceKeys: true` in same policy |
| New User Authorization Mode | `NewUserAuthorizationMode` | String | `Standard`, `Admin`, `Groups`, `Temporary` | One-time: applied at account creation only |
| User Authorization Mode | `UserAuthorizationMode` | String | `Standard`, `Admin`, `Groups` | Persistent: re-applied at each subsequent PSSO sign-in |
```

**Notes for the table:**
- `Temporary` is a valid value in the Apple schema for `NewUserAuthorizationMode` but is **NOT surfaced in the Intune Settings Catalog UI** (must be set via a custom profile or direct plist).
- `UserAuthorizationMode` does NOT have a `Temporary` value — Standard/Admin/Groups only.
- **Behavioral asymmetry example:** Setting `NewUserAuthorizationMode: Admin` + `UserAuthorizationMode: Standard` grants admin rights at first login, then reverts to standard at every subsequent sign-in. The admin promotion is overwritten.

---

## D-08/D-09 Verified Permissions Matrix

Source: Microsoft Learn v1.0 API reference (fetched 2026-06-23, updated 2025-11-08 and 2025-11-13)
[VERIFIED: Microsoft Learn — platformcredentialauthenticationmethod-list and -delete (v1.0)]

### List / Get (Read) Operations

| Permission type | Least privileged | Higher privileged |
|----------------|-----------------|-------------------|
| Delegated (work/school, self via `/me`) | `UserAuthMethod-PlatformCred.Read` | `UserAuthenticationMethod.Read`, `UserAuthenticationMethod.ReadWrite`, `UserAuthMethod-PlatformCred.Read.All`, `UserAuthMethod-PlatformCred.ReadWrite`, `UserAuthMethod-PlatformCred.ReadWrite.All`, `UserAuthenticationMethod.Read.All`, `UserAuthenticationMethod.ReadWrite.All` |
| Delegated (admin acting on another user) | `UserAuthMethod-PlatformCred.Read` | (same as above) |
| Application | `UserAuthMethod-PlatformCred.Read.All` | `UserAuthenticationMethod.Read.All`, `UserAuthenticationMethod.ReadWrite.All`, `UserAuthMethod-PlatformCred.ReadWrite.All` |
| Personal Microsoft account | Not supported | Not supported |

**Minimum Entra role (cross-user delegated):** Global Reader, Authentication Administrator, or Privileged Authentication Administrator.

### Delete Operation

| Permission type | Least privileged | Higher privileged |
|----------------|-----------------|-------------------|
| Delegated (work/school, self via `/me`) | `UserAuthenticationMethod.ReadWrite` | `UserAuthMethod-PlatformCred.ReadWrite`, `UserAuthMethod-PlatformCred.ReadWrite.All`, `UserAuthenticationMethod.ReadWrite.All` |
| Delegated (admin acting on another user) | `UserAuthenticationMethod.ReadWrite` | (same as above) |
| Application | `UserAuthenticationMethod.ReadWrite.All` | `UserAuthMethod-PlatformCred.ReadWrite.All` |
| Personal Microsoft account | Not supported | Not supported |

**Minimum Entra role (cross-user delegated delete):** Authentication Administrator or Privileged Authentication Administrator. (Global Reader is NOT sufficient for delete.)

**MFA re-prompt:** If a user deletes their own credential and last authenticated more than 10 minutes ago in the current Graph session, the system prompts for MFA.

### National Cloud Availability (all four operations)

| Global service | US Government L4 | US Government L5 (DOD) | China (21Vianet) |
|----------------|-----------------|----------------------|-----------------|
| Yes | Yes | Yes | Yes |

---

## Resource Properties (Verified)

Source: Microsoft Learn resource type page (fetched 2026-06-23, updated 2026-01-28)
[VERIFIED: Microsoft Learn — platformcredentialauthenticationmethod resource (v1.0)]

| Property | Type | Description |
|---------|------|-------------|
| `id` | String | Unique identifier for this credential registration. Inherited from `authenticationMethod`. |
| `displayName` | String | Name of the device on which Platform Credential is registered (maps to the device display name in Entra). |
| `createdDateTime` | DateTimeOffset | Timestamp of registration. Inherited from `authenticationMethod`. |
| `keyStrength` | `authenticationMethodKeyStrength` | `normal`, `weak`, or `unknown`. `normal` = Secure Enclave-backed. |
| `platform` | `authenticationMethodPlatform` | `macOS`, `windows`, `iOS`, `android`, `linux`, `unknown`. |

**Relationship:**
| Relationship | Type | Description |
|-------------|------|-------------|
| `device` | `device` | The registered Entra device object. Supports `$expand`. Only returned on a single GET with `?$expand=device`. |

---

## Common Pitfalls

### Pitfall 1: Using `platformCredentialAuthenticationMethod` as a URL Segment (G-1/D-08)

**What goes wrong:** The DELETE URL is written as `.../authentication/platformCredentialAuthenticationMethod/{id}` (the resource type name), rather than `.../authentication/platformCredentialMethods/{id}` (the navigation property). The URL returns a 404 or route-not-found error.

**Why it happens:** The resource type name (`platformCredentialAuthenticationMethod`) and the navigation property path (`platformCredentialMethods`) differ. Prior internal research (`PITFALLS.md:201`) propagated the wrong form.

**How to avoid:** Use `platformCredentialMethods` in ALL operation URLs. This has been verified from live Microsoft Learn for List, Get, and Delete. Do not copy from the prior PITFALLS.md DELETE example.

**Warning signs:** Any URL containing `authentication/platformCredentialAuthenticationMethod/` (with `Authentication` suffix in the path segment).

### Pitfall 2: Omitting the `[!WARNING]` Callout on DELETE (G-2)

**What goes wrong:** DELETE is documented without the suite's `> [!WARNING]` blockquote. An L2 engineer running a deletion loop silently causes fleet-wide PSSO re-registration.

**How to avoid:** The `[!WARNING]` is a hard requirement. It must state: Delete severs the Entra binding (forces PSSO re-registration); does NOT remote-erase the Secure Enclave key; use `-WhatIf` before running against production users.

### Pitfall 3: Wrong Permission for Delete in the Application Context (G-3/D-09)

**What goes wrong:** The permissions table states `UserAuthMethod-PlatformCred.ReadWrite.All` as the least-privilege application permission for delete, but the live Microsoft Learn docs specify `UserAuthenticationMethod.ReadWrite.All` as the least-privilege application permission. Using the wrong scope causes silent 403 failures in automation scripts.

**Correct application permission for delete:** `UserAuthenticationMethod.ReadWrite.All` (least privileged). `UserAuthMethod-PlatformCred.ReadWrite.All` is an allowed higher-privileged alternative.

**How to avoid:** Use the verified permissions matrix in this research document. Do not copy from prior PITFALLS.md `G-3` section which listed FEATURES.md-era values — verify against the live reference.

### Pitfall 4: Adding `Temporary` to `UserAuthorizationMode` (N-1/D-05)

**What goes wrong:** The guide documents `Temporary` as a valid value for `UserAuthorizationMode`. It is NOT — `Temporary` is only valid for `NewUserAuthorizationMode` (the one-time key). Apple schema is explicit: `UserAuthorizationMode` rangelist = Standard/Admin/Groups.

**How to avoid:** The consolidated NUAL table must have separate Allowed Values columns clearly showing `Temporary` in `NewUserAuthorizationMode` only.

### Pitfall 5: Rewriting the `## New User At Login Window` Section Prose (N-2/D-06)

**What goes wrong:** The executor rewrites guide 08's NUAL section prose, introducing new misconfigurations or violating the blast-radius discipline.

**How to avoid:** The ONLY changes to guide 08 are: (1) replace the existing NUAL table with the consolidated version, (2) remove the deferred blockquote at lines 278-286, (3) append a version-history row. No other prose changes.

### Pitfall 6: Touching Navigation-Hub Files (DI-1)

**What goes wrong:** Any of `docs/index.md`, `common-issues.md`, `quick-ref-l2.md` are edited in this phase.

**How to avoid:** Navigation-last invariant. Those files belong to Phase 87. No task in Phase 84 may reference navigation-hub file edits.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `platformCredentialAuthenticationMethod` in beta only | GA in Graph v1.0 | Promoted to v1.0 (docs updated 2025-11-08 per commit metadata) | Can document without stability warnings |
| NUAL key literals deferred (PSSO-FUT-01, v1.9) | Verified from Apple schema | 2026-06-22 research pass | Can now ship key literals in guide 08 |
| DELETE URL used resource type name as URL segment (PITFALLS.md:201 stale) | Navigation property `platformCredentialMethods` confirmed from live docs (2026-06-23) | This research | All doc examples must use `platformCredentialMethods` in URL |

**Deprecated/outdated:**
- PITFALLS.md `:201/:224` DELETE URL form (`…/platformCredentialAuthenticationMethod/{id}`): REPLACED by `…/platformCredentialMethods/{id}` (this research, verified 2026-06-23).

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `Temporary` value in `NewUserAuthorizationMode` is not surfaced in Intune Settings Catalog UI (only in Apple schema) | NUAL table, D-05 | If Intune now exposes it, the parenthetical note is slightly wrong but not harmful. Risk: LOW. |
| A2 | Guide 11 frontmatter `applies_to: ADE` matches the pattern from guides 07-10 | Architecture Patterns | If a different tag is required, it's a trivial fix. Risk: LOW. |
| A3 | The `$expand=device` query parameter is supported on List as well as Get | Code Examples | Microsoft Learn explicitly states it is only returned on a single GET — list does not support `$expand`. Risk: LOW — already accounted for in the code examples (only single GET uses `$expand`). |

**If this table were empty:** All claims verified or cited. The three assumptions above are low-risk caveats.

---

## Open Questions

1. **Intune Settings Catalog display-name for `Temporary`**
   - What we know: `Temporary` is in the Apple schema rangelist for `NewUserAuthorizationMode`. FEATURES.md (from Microsoft Learn Settings Catalog page, updated 2026-05-11) documents the display name as `New User Authorization Mode` with enum `Standard/Admin/Groups` — but CONTEXT.md D-05 explicitly says to add `Temporary` and note it is "defined in Apple schema but NOT surfaced in Intune Settings Catalog UI."
   - What's unclear: Whether the May 2026 Intune Settings Catalog page omits `Temporary` (confirming D-05's note) or has since added it.
   - Recommendation: D-05 is locked. Write the note as locked. If during execution the executor finds that Intune has added `Temporary` to the UI, update the parenthetical from "not in Intune UI" to "now available in Intune UI (as of [date])." Low-risk discrepancy.

2. **Forward cross-link wording from guide 08 NUAL section to guide 09 L2 runbook #29**
   - What we know: D-02 permits "a one-line forward cross-link" to runbook #29.
   - What's unclear: Whether the cross-link belongs in guide 11 (Graph API doc) or guide 08 (NUAL section), or both.
   - Recommendation: Place the forward cross-link in guide 11's leaver/automation section. Guide 08's NUAL section has no natural anchor for a runbook reference; the Graph doc is the right location.

---

## Environment Availability

This phase is documentation-only (new Markdown file + three surgical edits). The only tools required are already available:

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Git | Committing deliverables | Yes | (current repo) | — |
| Text editor / Write tool | Authoring Markdown | Yes | — | — |
| Microsoft Learn MCP / WebFetch | Plan 84-01 verification (pre-resolved in this research) | Yes | — | — |

No runtime or service dependencies.

---

## Security Domain

> `security_enforcement` not set in config.json (absent = enabled). This is a documentation-only phase. No authentication, session, cryptography, or input validation logic is implemented. ASVS categories do not apply to Markdown content authoring.

The content of guide 11 itself documents security-relevant Graph API permissions. The key security accuracy requirements are:
- Document least-privilege scopes correctly (verified above; D-09 satisfied).
- Include `[!WARNING]` on DELETE (G-2; required).
- Do not document the beta endpoint as production (G-1; verified GA on v1.0).
- Do not imply Create/Update operations exist (they do not).

---

## Sources

### Primary (HIGH confidence — live Microsoft Learn, fetched 2026-06-23)

- `https://learn.microsoft.com/en-us/graph/api/resources/platformcredentialauthenticationmethod?view=graph-rest-1.0` — resource properties, operations list (updated 2026-01-28)
- `https://learn.microsoft.com/en-us/graph/api/platformcredentialauthenticationmethod-list?view=graph-rest-1.0` — List HTTP URL, permissions, PowerShell cmdlet (updated 2025-11-13)
- `https://learn.microsoft.com/en-us/graph/api/platformcredentialauthenticationmethod-get?view=graph-rest-1.0` — Get HTTP URL, permissions, PowerShell cmdlet (updated 2026-05-27)
- `https://learn.microsoft.com/en-us/graph/api/platformcredentialauthenticationmethod-delete?view=graph-rest-1.0` — Delete HTTP URL, permissions, national cloud table (updated 2025-11-08)
- `https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.identity.signins/remove-mguserauthenticationplatformcredentialmethod?view=graph-powershell-1.0` — `-WhatIf`/`-Confirm` confirmation (updated 2026-03-02)
- `https://raw.githubusercontent.com/apple/device-management/release/mdm/profiles/com.apple.extensiblesso.yaml` — Apple MDM schema: `NewUserAuthorizationMode`, `UserAuthorizationMode`, `EnableCreateUserAtLogin` key literals and rangelist (authoritative Apple source)

### Primary (HIGH confidence — internal codebase)

- `docs/admin-setup-macos/10-kerberos-sso-extension.md` — hybrid suite-anchor + custom body precedent (guide 10 structure)
- `docs/admin-setup-macos/08-auth-methods-deep-dive.md` lines 260-286 — NUAL section current state (table + deferred blockquote to replace)
- `docs/admin-setup-macos/00-overview.md` — Mermaid + numbered list current state; guide 10 node precedent (lines 20-52)
- `docs/_glossary-macos.md` lines 119-148 — Platform SSO, Secure Enclave, Enterprise SSO Plug-in, Kerberos SSO Extension terms; D-15 see-also convention
- `docs/admin-setup-apv1/03-esp-policy.md` lines 101-105 — `> [!WARNING]` blockquote pattern
- `.planning/research/FEATURES.md` Surface 2 — Graph API resource description, permissions, SDK cmdlets (v1.10 research, 2026-06-22)
- `.planning/research/PITFALLS.md` AXIS 2 G-1/G-2/G-3 — Graph API pitfalls; AXIS 3 N-1/N-2 — NUAL pitfalls

### Secondary (MEDIUM confidence — prior v1.10 research, corroborated by live fetch)

- `.planning/research/FEATURES.md` Surface 3 — NUAL key literals (confirmed against Apple schema live fetch)
- `.planning/phases/84-graph-api-doc-nual-key-table/84-CONTEXT.md` — all decisions D-01..D-09

---

## Metadata

**Confidence breakdown:**
- D-08 Endpoint reconciliation: HIGH — fetched from three live Microsoft Learn pages; all three operations confirmed to use `platformCredentialMethods` in the URL
- D-09 Permissions matrix: HIGH — fetched from live List and Delete API reference pages (2025-11-08 / 2025-11-13)
- PowerShell SDK cmdlets: HIGH — confirmed from live Microsoft Learn (List, Get, Delete pages + Remove cmdlet reference page)
- `-WhatIf`/`-Confirm` support: HIGH — confirmed from live PowerShell cmdlet reference syntax block (2026-03-02)
- NUAL key literals: HIGH — confirmed from Apple `device-management` YAML schema (release branch)
- Guide 11 structure: HIGH — guide 10 hybrid precedent confirmed from codebase read
- `00-overview.md` guide 11 node pattern: HIGH — guide 10 node confirmed from codebase read (lines 31-32, 52)
- Glossary D-15 see-also convention: HIGH — confirmed from codebase read (lines 128/140/146/158)

**Research date:** 2026-06-23
**Valid until:** 2026-09-23 (Graph API v1.0 stable; Apple schema on release branch; 90-day review cycle matches existing suite `review_by` dates)
