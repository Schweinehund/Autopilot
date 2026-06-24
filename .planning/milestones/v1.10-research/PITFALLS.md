# Pitfalls Research — v1.10 macOS Platform SSO Follow-ons (Kerberos, Graph API & NUAL)

**Domain:** Documentation suite — Apple Kerberos SSO extension, Microsoft Graph `platformCredentialAuthenticationMethod` resource, NUAL MDM plist key literals in guide 08; doc-integration conventions
**Researched:** 2026-06-22
**Overall confidence:** HIGH for Kerberos extension identifiers (Apple developer docs + Microsoft Learn authoritative examples); HIGH for Graph API GA status (Context7 `v1.0` endpoint evidence); HIGH for NUAL key literals (Apple `device-management` repo YAML schema); HIGH for doc-integration pitfalls (internal v1.0–v1.9 lineage)

---

## Scope

Three content surfaces + doc-integration layer:

- **AXIS 1 — Kerberos SSO extension accuracy traps:** Extension identifier errors, conflation with Platform SSO or Enterprise SSO plug-in, stale CLI syntax, wrong on-prem AD scope
- **AXIS 2 — Graph API accuracy traps:** GA-vs-beta confusion, destructive DELETE without safety callout, wrong permission/scope
- **AXIS 3 — NUAL MDM key accuracy traps:** Shipping a guessed key literal, redundancy with existing guide 08 NUAL table
- **AXIS 4 — Doc-integration traps:** Navigation-last invariant, capability-matrix anchor inventory, pre-existing chain-red masking

---

## Confidence-Level Legend

| Level | Evidence | Use |
|-------|----------|-----|
| HIGH | Apple developer docs + Microsoft Learn official, corroborated | State as fact |
| MEDIUM | Single authoritative source OR strong community + one official anchor | State with attribution |
| LOW | Community-only or inference | Flag for live-tenant validation |

---

## AXIS 1 — Kerberos SSO Extension Accuracy Traps

### K-1: Wrong Extension Identifier — Using a Microsoft or generic SSO value Instead of `com.apple.AppSSOKerberos.KerberosExtension`

**Confidence:** HIGH — Apple Developer Documentation `ExtensibleSingleSignOnKerberos`; Microsoft Learn Kerberos PSSO configuration guide (explicit plist sample, last updated 2024-05-13 / re-verified 2026-06-15)

**What goes wrong:**
A doc author copying from Platform SSO documentation inserts `com.microsoft.CompanyPortalMac.ssoextension` (the Microsoft PSSO extension identifier) as the `ExtensionIdentifier` value in the Kerberos SSO extension profile, or inserts a generic placeholder. On-device, the Kerberos extension fails to load; authentication to on-prem Kerberos resources silently stops working. Because the Microsoft PSSO extension with the WRONG identifier is now effectively claiming the Kerberos payload, the Platform SSO extension may also malfunction (two payloads under the same identifier override each other).

**Why it happens:**
Guide 09 documents both extensions side-by-side as a coexistence note (v1.9 SSOMIG-04). An author who copies the Microsoft PSSO Extension Identifier from guide 07 or guide 09 and pastes it into the Kerberos profile will produce a broken config. The two identifiers are superficially similar: both live in `com.apple.extensiblesso` payloads.

**Authoritative value:**
The Apple Kerberos SSO extension `ExtensionIdentifier` is `com.apple.AppSSOKerberos.KerberosExtension`.
The Microsoft PSSO extension `ExtensionIdentifier` is `com.microsoft.CompanyPortalMac.ssoextension`.
These are different extension bundles from different vendors. They MUST each appear in a separate profile entry with their own identifier.

**Warning signs:**
- Kerberos profile entry uses any `com.microsoft.*` identifier value
- Profile entry uses an identifier containing only `com.apple.extensiblesso` without the `.KerberosExtension` suffix
- Doc shows "Extension Identifier" in a single profile that handles both Entra and Kerberos authentication

**Prevention strategy:**
Phase that authors guide `10-kerberos-sso-extension.md` MUST include the exact literal `com.apple.AppSSOKerberos.KerberosExtension` sourced from Apple developer documentation, not from memory or from guide 09's prose. Include a side-by-side "Extension Identifier" comparison table showing both values and confirming they are distinct.

**Phase to address:** Kerberos guide authoring phase (the phase that writes `10-kerberos-sso-extension.md`).

**Sources:**
- [Apple Developer Docs — ExtensibleSingleSignOnKerberos](https://developer.apple.com/documentation/devicemanagement/extensiblesinglesignonkerberos)
- [Microsoft Learn — Enable Kerberos SSO in Platform SSO](https://learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on-kerberos-configuration) — plist sample shows `ExtensionIdentifier` = `com.apple.AppSSOKerberos.KerberosExtension`

---

### K-2: Conflating the Apple Kerberos Extension with Platform SSO or the Microsoft Enterprise SSO Plug-in

**Confidence:** HIGH (Microsoft Learn; Apple Developer Docs; guide 09 existing disambiguation — v1.9 SSOMIG-04)

**What goes wrong:**
Three distinct features share the `com.apple.extensiblesso` payload type and are routinely conflated:

| Feature | Owner | Payload type | Purpose | Identifier prefix |
|---------|-------|-------------|---------|-------------------|
| Platform SSO (PSSO) | Microsoft (Company Portal) | `com.apple.extensiblesso` — Redirect type | Entra ID device registration + login binding | `com.microsoft.CompanyPortalMac.ssoextension` |
| Microsoft Enterprise SSO plug-in (redirect legacy) | Microsoft (Company Portal) | `com.apple.extensiblesso` — Redirect type | Token brokering (pre-PSSO) | same as PSSO in newer Company Portal |
| Apple Kerberos SSO extension | Apple (built-in) | `com.apple.extensiblesso` — **Credential** type | On-prem AD / Kerberos TGT only | `com.apple.AppSSOKerberos.KerberosExtension` |

Conflation traps specific to guide 10 authoring:

1. **Claiming the Kerberos extension handles Entra ID authentication** — it does not. The Kerberos extension handles only Kerberos ticket-granting for on-prem AD resources (or Cloud Kerberos TGTs issued by Platform SSO/Entra). Entra ID SSO is handled by the Microsoft PSSO extension.
2. **Stating the Kerberos extension is "part of" Platform SSO or Company Portal** — it is an Apple-built-in extension, not shipped by Microsoft.
3. **Treating Kerberos extension diagnostics as identical to Platform SSO diagnostics** — the `app-sso platform -s` command reports Platform SSO state; Kerberos ticket state is checked via `klist` (standard MIT Kerberos CLI) or `app-sso platform -s` which also surfaces Kerberos TGTs (tgt_ad / tgt_cloud) when PSSO Kerberos integration is active.
4. **Saying Kerberos extension requires Platform SSO** — it does not. The Kerberos extension can be deployed standalone, without PSSO, as it historically was for on-prem AD organizations. The v1.10 scope covers the coexistence-with-PSSO pattern, but the guide must distinguish standalone from PSSO-coexistence configurations.

**Warning signs:**
- Guide prose says "the Enterprise SSO plug-in handles Kerberos" (wrong — Enterprise SSO plug-in is Microsoft's; Kerberos extension is Apple's)
- Guide uses `app-sso diagnose` for Kerberos-only diagnostics (NOTE: `app-sso diagnose` is UNVERIFIED in v1.9 plan context; the verified Kerberos check is `app-sso platform -s` which reports tgt_ad/tgt_cloud ticket paths)
- Guide makes PSSO a prerequisite for Kerberos extension

**Prevention strategy:**
Guide 10 opening section must include an explicit "What this guide is NOT" disambiguation box referencing guide 09's coexistence note and guide 07/08 for Platform SSO itself. The guide covers only the Apple-native Kerberos extension (`com.apple.AppSSOKerberos.KerberosExtension`), and its on-prem AD / Kerberos authentication role.

**Phase to address:** Kerberos guide authoring phase.

**Sources:**
- [Microsoft Learn — Enable Kerberos SSO in Platform SSO](https://learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on-kerberos-configuration)
- Existing guide 09 `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` §Kerberos SSO Extension (Coexistence) — the v1.9 coexistence note already calls out the extension type and identifier distinctness; guide 10 must not contradict it

---

### K-3: Stale or Wrong `app-sso` CLI Syntax for Kerberos Diagnostics

**Confidence:** MEDIUM — `app-sso platform -s` for Platform SSO Kerberos ticket state is HIGH confidence (Microsoft Learn sample output); standalone Kerberos-only `app-sso kerberos` subcommand availability is MEDIUM confidence (man page exists but Microsoft Learn does not endorse it; v1.9 explicitly banned `app-sso diagnose` as UNVERIFIED); `klist` is HIGH confidence (standard MIT Kerberos CLI, available on macOS)

**What goes wrong:**
An author documents Kerberos diagnostic steps using:
- `app-sso diagnose` — this command's output was marked UNVERIFIED in v1.9 Phase 80 planning (80-01-PLAN.md, 80-02-PLAN.md explicitly banned it); a v1.10 author may assume it is now verified and use it
- `kinit` / `kdestroy` as admin-initiated diagnostic steps — these are user-ticket manipulation commands, not appropriate admin diagnostic steps (they destroy or request tickets interactively)
- `klist -v` syntax flags that differ across macOS versions

Additionally: the v1.9 PSSO Kerberos ticket output uses `app-sso platform -s` to show `ticketKeyPath` = `tgt_ad` (on-prem) and `tgt_cloud` (Entra). A guide that documents `app-sso kerberos` subcommands without verifying they exist in the shipped macOS binary will break in production.

**Warning signs:**
- `app-sso diagnose` appears in any Kerberos troubleshooting step
- CLI syntax is sourced from community blog posts rather than verified against macOS man pages or Microsoft Learn
- Kerberos diagnostic steps do not distinguish the standalone-Kerberos-extension case from the PSSO-integrated case

**Prevention strategy:**
Before authoring guide 10 diagnostics:
1. Verify `app-sso` subcommands against the man page (`app-sso -h` / man page at https://keith.github.io/xcode-man-pages/app-sso.1.html).
2. Use `app-sso platform -s` (HIGH confidence; verified by Microsoft Learn) for checking TGT state in the PSSO+Kerberos coexistence case.
3. Use `klist` (HIGH confidence; standard macOS MIT Kerberos CLI) for checking Kerberos ticket cache state in all configurations.
4. Do NOT use `app-sso diagnose` unless explicitly verified from a current macOS binary or Apple developer documentation update; follow the v1.9 PROHIBITED list precedent.

**Phase to address:** Kerberos guide authoring phase — verify CLI syntax before incorporating any `app-sso` subcommand other than `platform -s`.

**Sources:**
- [app-sso man page](https://keith.github.io/xcode-man-pages/app-sso.1.html)
- [Microsoft Learn — Enable Kerberos SSO in Platform SSO (Testing section)](https://learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on-kerberos-configuration) — shows `app-sso platform -s` as the verified Kerberos TGT check command

---

### K-4: Over-documenting On-Prem Active Directory Content Outside the Suite's Intune/Entra Scope

**Confidence:** HIGH (internal suite scope discipline; v1.9 PROJECT.md scope definition)

**What goes wrong:**
The Kerberos SSO extension's primary use case is on-premises AD Kerberos. Guide 10 risks expanding into:
- Active Directory DNS/SRV record configuration
- Kerberos realm mapping for multi-domain forests
- AD domain controller reachability testing (`nltest`, `klist`, AD-specific tooling)
- Organizational Unit structures in AD
- Kerberos Key Distribution Center (KDC) configuration

None of these are Intune/Entra admin actions. The suite's scope is "through Microsoft Intune" — the Intune/Entra admin perspective. AD admin actions are outside scope.

**Why it happens:**
Kerberos documentation naturally wants to explain the full protocol. Microsoft Learn's own Kerberos guide includes on-prem AD prerequisites. An author following the Microsoft Learn page will absorb out-of-scope AD content and include it unless explicitly constrained.

**Warning signs:**
- Guide sections addressing "configure your AD realm" or "verify SRV records" that require an AD admin rather than an Intune admin
- More than one paragraph on on-prem Kerberos infrastructure prerequisites (a brief dependency note is appropriate; a how-to is not)
- Guide uses tools (`nltest`, `klist get`, domain controller diagnostics) that require AD admin access

**Prevention strategy:**
Guide 10 scope gate: the document covers ONLY the MDM payload configuration and verification actions an Intune/Entra admin performs. On-prem AD prerequisites are summarized in one callout pointing to Microsoft's Kerberos PSSO guide and Apple's Kerberos SSO Extension User Guide for AD-side setup. Do not duplicate AD admin content.

**Phase to address:** Kerberos guide authoring phase — SCOPE checklist item before content expansion begins.

**Sources:**
- Suite scope: `PROJECT.md` "through Microsoft Intune" framing; v1.9 milestone "Intune/Entra scope" constraints carried forward to v1.10
- [Microsoft Learn — Enable Kerberos SSO in Platform SSO](https://learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on-kerberos-configuration) — model for what is in-scope vs what to defer to Apple/AD admin docs

---

### K-5: Wrong Payload Type — Using Redirect Instead of Credential for Kerberos Extension

**Confidence:** HIGH (Apple Developer Docs; Microsoft Learn plist sample)

**What goes wrong:**
The `com.apple.extensiblesso` payload supports two `Type` values: `Redirect` and `Credential`. The Microsoft PSSO extension uses `Redirect`. The Apple Kerberos SSO extension uses `Credential`. A doc author who copies from PSSO configuration guides will specify `Type = Redirect`, which is wrong for the Kerberos extension and causes the Kerberos ticket-granting flow to fail silently.

**Authoritative value:** Kerberos profile requires `Type = Credential` (confirmed in Microsoft Learn plist sample: `<key>Type</key><string>Credential</string>`).

**Warning signs:**
- Settings Catalog or plist sample shows `Type: Redirect` in the Kerberos profile
- Guide does not distinguish the payload type between PSSO (Redirect) and Kerberos (Credential)

**Prevention strategy:**
Include the `Type = Credential` value explicitly in every Kerberos profile plist example. Add a callout: "The Kerberos SSO extension uses Type = Credential, NOT Redirect. Using Redirect (the Platform SSO value) is the most common configuration copy-error."

**Phase to address:** Kerberos guide authoring phase.

**Sources:**
- [Microsoft Learn — Enable Kerberos SSO in Platform SSO](https://learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on-kerberos-configuration) — plist sample explicitly shows `<string>Credential</string>`

---

## AXIS 2 — Graph API Accuracy Traps

### G-1: Documenting `platformCredentialAuthenticationMethod` as Beta When It Is GA in v1.0

**Confidence:** HIGH — Context7 confirms resource and all three operations (GET single, LIST, DELETE) are in the `v1.0` Graph API endpoint, not `beta`; endpoints use `https://graph.microsoft.com/v1.0/` path prefix in all Context7-sourced documentation (source: `/microsoftgraph/microsoft-graph-docs-contrib`)

**What goes wrong:**
The v1.9 deferred item PSSO-FUT-02 (`v1.9-DEFERRED-CLEANUP.md`) carried a research flag: "keep deferred if still beta." If an author checks old training data or a stale search result that referenced the beta period, they will document this resource under `https://graph.microsoft.com/beta/` and warn readers it may change. This is wrong: the resource is GA and stable.

**Authoritative endpoints (v1.0):**
```
GET  https://graph.microsoft.com/v1.0/me/authentication/platformCredentialMethods
GET  https://graph.microsoft.com/v1.0/me/authentication/platformCredentialMethods/{id}
GET  https://graph.microsoft.com/v1.0/users/{id}/authentication/platformCredentialMethods
DELETE https://graph.microsoft.com/v1.0/users/{id}/authentication/platformCredentialAuthenticationMethod/{id}
```

**Warning signs:**
- Endpoint URL in doc uses `graph.microsoft.com/beta/`
- A callout says "this API is in preview and subject to change"
- Code samples reference the beta SDK namespace rather than the v1.0 namespace

**Prevention strategy:**
Phase that authors the Graph API doc MUST verify the endpoint namespace against Microsoft Graph documentation before drafting. The research guard is: confirm the URL prefix is `/v1.0/` not `/beta/`. If a future check finds the resource has been moved or renamed, it warrants a research flag in the phase plan — do not assume.

**Phase to address:** Graph API doc authoring phase.

**Sources:**
- Context7 `/microsoftgraph/microsoft-graph-docs-contrib` — GET list source: `api-reference/v1.0/api/platformcredentialauthenticationmethod-list.md`; DELETE source: `api-reference/v1.0/api/platformcredentialauthenticationmethod-delete.md`

---

### G-2: Documenting the DELETE Operation Without the Suite's Established Safety-Callout Convention

**Confidence:** HIGH (internal suite convention; existing suite callout pattern uses `[!WARNING]` / `[!CAUTION]` blockquotes for destructive operations; DELETE on `platformCredentialAuthenticationMethod` triggers PSSO re-registration for the affected user)

**What goes wrong:**
The DELETE endpoint (`DELETE /users/{id}/authentication/platformCredentialAuthenticationMethod/{id}`) is a **destructive, user-impacting operation**: it removes the user's Secure Enclave Platform Credential, forcing the user to re-register Platform SSO. If documented without a safety callout following the suite's convention, an L2 engineer running a bulk credential cleanup script could silently trigger fleet-wide re-registration.

The suite's established convention for destructive operations:
- `[!WARNING]` blockquote for operations that are reversible at significant cost or have fleet-wide impact
- `[!CAUTION]` for operations that are irreversible or critical-path
- Prose description of the consequence ("this action removes the user's Platform Credential and requires the user to re-register Platform SSO") in the same section as the operation

The existing suite uses this pattern in `docs/admin-setup-apv1/03-esp-policy.md`, `docs/reference/win32-app-packaging.md`, and `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` (the rollback / WPJ removal section, which uses "destructive" prose callouts).

**Warning signs:**
- DELETE endpoint documented without any callout block
- DELETE endpoint documented with only a plain-text note ("note: this deletes the credential") rather than a `[!WARNING]` or `[!CAUTION]` blockquote
- Automation script examples that call DELETE in a loop without a dryrun or confirmation step

**Prevention strategy:**
The phase plan for the Graph API doc MUST explicitly include a "safety callout required for DELETE" deliverable item. The callout should follow the `> [!WARNING]` GitHub-flavored Markdown syntax consistent with `03-esp-policy.md` and `win32-app-packaging.md`. Automation examples must include a confirmation step (e.g., `-WhatIf` for PowerShell, a `--dry-run` flag pattern for shell, or a review loop before batch deletion).

**Phase to address:** Graph API doc authoring phase — safety callout is a hard requirement, not optional polish.

**Sources:**
- `docs/admin-setup-apv1/03-esp-policy.md` lines 101–105 — pattern: `> [!WARNING]` blockquote for destructive operations
- `docs/reference/win32-app-packaging.md` lines 112–116 — same pattern
- `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` line 125 — "WPJ key removal is destructive" prose callout (v1.9 precedent for Secure Enclave destructive operations)

---

### G-3: Wrong Graph Permission / Scope for Listing or Deleting Platform Credentials

**Confidence:** HIGH — Context7 confirms the correct permission structure for `platformCredentialAuthenticationMethod`; multiple permission types exist and the least-privileged correct scope is specific

**What goes wrong:**
The Graph API operations for platform credentials have distinct permissions for read vs. delete. A doc that states the wrong permission will cause either:
- Insufficient-permission errors in automation scripts (if it understates the required scope)
- Least-privilege violation (if it overstates and recommends a broader permission than necessary)

**Authoritative permission structure (from Context7 Microsoft Graph docs):**

| Operation | Minimum delegated permission | Minimum application permission |
|-----------|------------------------------|--------------------------------|
| List/Get platform credentials | `UserAuthenticationMethod.Read.All` | `UserAuthenticationMethod.Read.All` |
| Delete platform credential | `UserAuthenticationMethod.ReadWrite.All` | `UserAuthenticationMethod.ReadWrite.All` |
| List own credential (`/me/`) | `UserAuthenticationMethod.Read` (self) | Not supported for `/me/` |

There is also a specific narrow scope `UserAuthMethod-PlatformCred.Read.All` documented in the Graph permissions reference for reading platform credential methods specifically (admin consent required).

**Warning signs:**
- Doc lists `DeviceManagementManagedDevices.Read.All` as the required permission (this is the Intune device management scope, not the authentication method scope)
- Doc conflates the authentication method read scope with any Intune device scope
- Doc does not distinguish between the `/me/` (delegated) path and the `/users/{id}/` (admin application) path

**Prevention strategy:**
Phase that authors the Graph API doc MUST verify the exact permission names against the Graph permissions reference at `https://learn.microsoft.com/en-us/graph/permissions-reference` or Context7. Include the permission table in the doc (not just a sentence saying "you need admin permissions"). Distinguish the admin-automation case (application permission, acts on behalf of any user) from the delegated case (delegated permission, acts on behalf of the signed-in user).

**Phase to address:** Graph API doc authoring phase — permission table is a required doc component.

**Sources:**
- Context7 `/microsoftgraph/microsoft-graph-docs-contrib` — `UserAuthenticationMethod Permissions` source: `api-reference/v1.0/includes/permissions/authenticationmethod-get-2-permissions.md`
- Context7 — `Permissions Reference > UserAuthMethod-PlatformCred.Read.All` source: `concepts/permissions-reference.md`

---

## AXIS 3 — NUAL MDM Key Accuracy Traps

### N-1: Shipping a Guessed MDM Plist Key Literal — the Core v1.9-Deferred Guard

**Confidence:** HIGH for key literal resolution — Apple `device-management` GitHub repo (official Apple MDM schema source at `https://github.com/apple/device-management/blob/release/mdm/profiles/com.apple.extensiblesso.yaml`) confirms the exact key names; MEDIUM for Intune Settings Catalog display-name-to-key-name mapping (the Settings Catalog may use a different surface name; must verify against live Intune catalog or Microsoft Learn Settings Catalog reference)

**What goes wrong:**
PSSO-FUT-01 was deferred from v1.9 specifically because the MDM plist key literals were LOW confidence (Phase 77 PSSO-11 / D3=B decision). The risk is documenting a plausible but wrong key name. For example:
- Guessing `NewUserAuthorizationMode` is correct because it matches the Settings Catalog display name — but the underlying plist key in the `com.apple.extensiblesso` payload could be `newUserAuthorizationMode` (camelCase) or `New_User_Authorization_Mode` or similar
- Guessing `UserAuthorizationMode` without confirming whether the payload key is exactly that string or a variant

**Authoritative research finding (2026-06-22 verification):**
The Apple `device-management` GitHub repository YAML schema for `com.apple.extensiblesso` confirms:
- `NewUserAuthorizationMode` — key: "The permission to apply to newly created accounts at login" (one-time, at account creation)
- `UserAuthorizationMode` — key: "The permission to apply to an account each time the user authenticates" (persistent, per subsequent sign-in)

These match the Settings Catalog display names documented in guide 08's NUAL table. **The key literals ARE `NewUserAuthorizationMode` and `UserAuthorizationMode` (PascalCase).**

**However**, before v1.10 ships these literals in the guide 08 NUAL settings table, the phase must perform a second-pass verification against (1) Microsoft Learn Settings Catalog reference page for `com.apple.extensiblesso` and (2) the live Intune admin center Settings Catalog payload schema, to confirm the Intune UI-facing key name matches the Apple schema key name. The Settings Catalog sometimes wraps Apple keys under different display names without exposing the underlying plist key.

**Warning signs:**
- Phase plan ships key literals sourced only from training data or community blogs
- Key literals are added to the NUAL table without citing the Apple `device-management` schema or Microsoft Learn Settings Catalog reference
- A note is NOT added to the NUAL table indicating the source and verification date

**Prevention strategy — the "do not ship a guessed key" guard:**
The phase that closes PSSO-FUT-01 MUST follow this verification sequence:
1. Check `https://github.com/apple/device-management/blob/release/mdm/profiles/com.apple.extensiblesso.yaml` for the exact Apple MDM key name (HIGH confidence source)
2. Cross-reference against `https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos` (or the NUAL-specific Settings Catalog page) for the Intune-side surface name
3. Only after BOTH sources are checked and agree should the key literal be inserted into guide 08
4. If the sources disagree or the Intune key name is not found, defer again with a narrowed LOW-confidence flag (do not ship)

**Phase to address:** NUAL key verification phase (the dedicated phase or task that closes PSSO-FUT-01).

**Sources:**
- [Apple device-management GitHub — com.apple.extensiblesso YAML schema](https://github.com/apple/device-management/blob/release/mdm/profiles/com.apple.extensiblesso.yaml) — authoritative Apple MDM payload spec
- `docs/admin-setup-macos/08-auth-methods-deep-dive.md` lines 278–286 — existing deferred-item callout (the guide ALREADY has the deferred-item note; v1.10 replaces it with the verified key)
- `docs/v1.9-DEFERRED-CLEANUP.md` — fuller PSSO-FUT-01 detail including resolution trigger sources

---

### N-2: Redundancy With Content Already in Guide 08's NUAL Settings Table

**Confidence:** HIGH (direct read of `docs/admin-setup-macos/08-auth-methods-deep-dive.md` lines 270–287)

**What goes wrong:**
Guide 08's NUAL section already contains a Settings Catalog settings table with three rows:
- `Enable Create User At Login` (Boolean)
- `New User Authorization Mode` (Enum: Standard / Admin / Groups)
- `User Authorization Mode` (Enum: Standard / Admin / Groups)

The deferred item is only the MDM plist key literals for the two authorization-mode settings. A v1.10 author who creates a new NUAL table or expands the NUAL section without carefully reading the existing content will:
- Duplicate the `Enable Create User At Login` row (already documented with MDM key implicit)
- Restate the enum values (Standard / Admin / Groups) already in the table
- Add a second NUAL configuration section that conflicts with or is visually redundant to the existing one

**The correct change is surgical:** Add the MDM plist key column to the EXISTING table, or add a `MDM plist key:` row beneath each entry. The deferred item is specifically the key literal — NOT a rewrite of the NUAL section.

**Warning signs:**
- Phase plan says "write NUAL section" rather than "add MDM key literals to existing NUAL table"
- Phase plan creates a new `docs/admin-setup-macos/` file for NUAL rather than editing guide 08
- Diff shows the entire NUAL section (`## New User At Login Window`) replaced rather than augmented

**Prevention strategy:**
Phase plan must explicitly scope PSSO-FUT-01 as a surgical edit to guide 08, not a section rewrite. Deliverable: add the plist key literal value to the two authorization-mode rows. Remove the deferred-item callout blockquote (lines 278–286 of guide 08) once the keys are confirmed. Version history row appended.

**Phase to address:** NUAL key verification phase.

**Sources:**
- `docs/admin-setup-macos/08-auth-methods-deep-dive.md` lines 270–287 — existing NUAL table and deferred-item callout

---

## AXIS 4 — Doc-Integration Traps

### DI-1: Breaking the Navigation-Last Invariant

**Confidence:** HIGH — navigation-last is an established invariant enforced across v1.0–v1.9; specifically enforced in Phase 80 planning (80-CONTEXT.md, 80-03-PLAN.md, 80-03-SUMMARY.md) where nav-hub edits were explicitly prohibited until Phase 81; Phase 81 was the designated nav-hub integration phase

**What goes wrong:**
The navigation-last invariant means: **nav-hub files are edited LAST, in a dedicated integration phase, after all content files exist**. Nav-hub files in this suite include:
- `docs/index.md`
- `docs/common-issues.md`
- `docs/quick-ref-l1.md` / `docs/quick-ref-l2.md`
- `docs/decision-trees/06-macos-triage.md` (or equivalent triage tree)
- Runbook index files (`docs/l1-runbooks/00-index.md`, `docs/l2-runbooks/00-index.md`)

**For v1.10 specifically:** Guide `10-kerberos-sso-extension.md` (new file) and the dedicated Graph API doc (new file) must each be integrated into nav-hub files. If a content-authoring phase also edits `docs/index.md` or `common-issues.md` to add nav entries before the content is finished, two problems arise:
1. Forward-link to a file that does not exist yet causes a C13 broken-link FAIL at the next audit gate
2. If the filename changes during authoring (e.g., planned as `10-kerberos-sso.md`, shipped as `10-kerberos-sso-extension.md`), every nav-hub edit must be corrected

**Warning signs:**
- Phase plan for guide 10 authoring includes a task to edit `docs/index.md`
- Phase plan for Graph API doc includes a task to add a row to `common-issues.md`
- A single phase both authors a new guide AND edits nav-hub files

**Prevention strategy:**
Roadmap must include a dedicated nav-hub integration phase (the equivalent of v1.9's Phase 81 SSOREF-04). Content-authoring phases for Kerberos, Graph API, and NUAL must include the explicit prohibition: "Nav-hub files (`docs/index.md`, `common-issues.md`, `quick-ref-l1/l2.md`) are NOT touched in this phase — navigation-last invariant." The integration phase runs after all content is stable.

**Phase to address:** Roadmap-level design — designate one phase as the nav-hub integration phase (runs after all v1.10 content phases). Each content phase plan includes an explicit navigation-last prohibition clause.

**Sources:**
- `docs/admin-setup-macos/.planning/milestones/v1.9-phases/80-l1-l2-runbooks/80-CONTEXT.md` — "navigation-last invariant" doctrine and Phase 81 ownership
- `docs/admin-setup-macos/.planning/milestones/v1.9-phases/80-l1-l2-runbooks/80-03-SUMMARY.md` — `navigation-last-invariant` pattern tag

---

### DI-2: Editing the Capability Matrix Without a Pre-Edit Anchor Inventory (C12/C13 Harness Risk)

**Confidence:** HIGH — this exact pitfall was documented in v1.9 research DS-3; the harness guards are active; `check-phase-58.mjs` V-58-02 and V-58-11/V-58-14 check `macos-capability-matrix.md` structure; `check-phase-63.mjs` V-63-08 has a byte-unchanged baseline blob check for `macos-capability-matrix.md` at `e91d7f9e001bb7ff4dc56a4ca98c84868fbf0716` (this baseline is FROM Phase 63, meaning any edit to the matrix will break V-63-08 unless the validator is updated atomically)

**What goes wrong:**
The `macos-capability-matrix.md` file has:
- A byte-unchanged baseline guard in `check-phase-63.mjs` (blob hash `e91d7f9e001bb7ff4dc56a4ca98c84868fbf0716`)
- H2 anchor checks in `check-phase-58.mjs` (V-58-11: `## Conditional Access` must exist; V-58-14: link to `4-platform-capability-comparison.md` must exist)
- Cross-link edges in `check-phase-81.mjs` (E3: guide 07 links to `macos-capability-matrix.md#authentication`; E4: `macos-capability-matrix.md` links to guide 07)
- The `## Authentication` H2 section (added Phase 79) with rows for Platform SSO auth methods

Any v1.10 additions to the capability matrix (Kerberos SSO rows, Graph API row, updated NUAL row) will:
1. **Break V-63-08** (byte-unchanged baseline) — because `check-phase-63.mjs` was written at Phase 63 and locked the matrix at that commit. The fix: update V-63-08 to the new blob hash in the same atomic commit as the matrix change (following the v1.9 harness-update pattern).
2. **Risk breaking C12** — if a new H2 is added and the `4-platform-capability-comparison.md` cells pointing to those H2 anchors are not updated (link-not-copy architecture)
3. **Risk breaking C13** — if new cross-links to new guide 10 or Graph API doc are added before those files exist

**Warning signs:**
- Phase plan edits `macos-capability-matrix.md` without a corresponding update to `check-phase-63.mjs` V-63-08 blob baseline
- Phase plan adds a new H2 to the matrix without verifying whether `4-platform-capability-comparison.md` has cells pointing to that H2
- Matrix edit and harness validator update are in separate commits (not atomic)

**Prevention strategy — the "pre-edit anchor inventory" guard:**
The phase that adds Kerberos or Graph API rows to `macos-capability-matrix.md` MUST:
1. Run `git hash-object docs/reference/macos-capability-matrix.md` to record the current blob hash BEFORE any edits
2. Audit all validators that reference `macos-capability-matrix.md` (`check-phase-58.mjs`, `check-phase-63.mjs`, `check-phase-81.mjs`) — list every assertion that will be affected
3. For V-63-08: update the blob hash expectation in the same atomic commit as the matrix change
4. For C12 (4-platform comparison): verify that any new H2 anchor is either covered by an existing `4-platform-capability-comparison.md` cell or a new cell is added in the same commit
5. For C13: do NOT add cross-links in the matrix to guide 10 or the Graph API doc until those files exist

**Phase to address:** The phase that integrates Kerberos/Graph API content into the capability matrix (likely the nav-hub integration phase or a dedicated matrix-update phase). This is the same phase that must update the harness validator — following the v1.9 Phase 79 + Phase 82 atomic harness commit pattern.

**Sources:**
- `scripts/validation/check-phase-63.mjs` lines 202–220 — V-63-08 byte-unchanged baseline assertion
- `scripts/validation/check-phase-58.mjs` lines 88, 220, 248 — H2 and cross-link assertions on `macos-capability-matrix.md`
- `scripts/validation/check-phase-81.mjs` lines 48–49 — E3/E4 cross-link edges
- v1.9 research `PITFALLS.md` DS-3 — identical pitfall documented for v1.9 Phase 80; same risks carry forward to v1.10

---

### DI-3: The Pre-Existing Chain-Red Must Not Be Masked by the v1.10 Harness-Bump Phase

**Confidence:** HIGH — documented in `v1.9-DEFERRED-CLEANUP.md` §PRE-EXISTING-CHAIN-RED-AT-HEAD-01; evidence is the apex `check-phase-82.mjs` reporting 10 FAIL / 1 SKIPPED at v1.9 close HEAD (phases 58, 59, 60, 61, 62, 63, 64, 65, 66, 73); this state is PRE-EXISTING before any v1.10 work begins

**What goes wrong:**
The validator chain `[48..82]` is currently RED at HEAD: 10 pre-existing legacy FAILs in validators for phases 58–66/73. When v1.10 adds `check-phase-83..NN.mjs` validators and a new apex, a phase executor may:

1. **Mask the legacy FAILs by expanding CHAIN_SKIP** — adding phases 58/59/60/61/62/63/64/65/66/73 to `CHAIN_SKIP = new Set([58, 59, ...])` in the new apex validator. This hides the pre-existing FAILs, makes the new apex appear green, but silently abandons chain integrity for legacy phases.
2. **Redefine "all PASS" to mean the new phases only** — writing the close-gate audit summary as "all v1.10 validators PASS" without disclosing that the chain remains RED for legacy phases. This satisfies the letter of the phase plan but violates the "do NOT mask via deletion" doctrine established in `v1.9-DEFERRED-CLEANUP.md`.
3. **Fix some but not all of the legacy FAILs in a harness-bump phase** — a harness-bump phase is not the right scope for a class-wide RETRO-style scan. If only some FAILs are fixed, the chain appears partially fixed but not to 0 FAIL, creating ambiguity about which FAILs are new regressions vs. known legacy.

**The correct approach:**
The v1.9-DEFERRED-CLEANUP PRE-EXISTING-CHAIN-RED-AT-HEAD-01 resolution mechanism is: a dedicated chain-health phase (1 phase, 2-4 plans) performing a RETRO-style scan of `check-phase-{58..66, 73}.mjs` for HEAD-coupled assertions, converting them to frozen-aware reads via `_lib/frozen-at-close.mjs`, and restoring/regenerating `73-RETRO-INVENTORY.md`. This is DISTINCT from the harness-lineage-bump phase.

**Warning signs:**
- Harness-bump phase plan includes `CHAIN_SKIP` entries for any of phases 58–66/73
- Harness-bump phase plan close-gate audit summary does not report the full chain FAIL count (passes when "new phases all GREEN" without mentioning the legacy RED)
- The chain-health pass is folded into the harness-bump phase scope without a pre-fold adversarial-review decision

**Prevention strategy — the "do not mask pre-existing chain-red" guard:**
The v1.10 roadmap MUST explicitly schedule the chain-health pass as a separate decision point. Options (to be resolved at roadmap, not execution time):
- **Option A (preferred by DEFERRED-CLEANUP):** Dedicated early chain-health phase before the v1.10 harness-lineage bump, so the bump phase inherits a GREEN chain
- **Option B:** Fold chain-health into the harness-lineage-bump phase scope (requires adversarial-review to validate scope discipline before execution)
- **Option C (PROHIBITED):** Mask legacy FAILs via CHAIN_SKIP expansion — violates the "do NOT mask" doctrine

The harness-bump phase MUST document the chain state honestly: if legacy FAILs remain at close-gate, the audit summary must list them as "pre-existing legacy FAILs (out-of-scope for this phase)" with the count. The count must match the count documented in `v1.9-DEFERRED-CLEANUP.md` (currently 10 FAIL / 1 SKIPPED).

**Phase to address:** Roadmap-level design for the chain-health phase; harness-lineage-bump phase must NOT fold chain-health unless the adversarial-review process approves the fold.

**Sources:**
- `v1.9-DEFERRED-CLEANUP.md` §PRE-EXISTING-CHAIN-RED-AT-HEAD-01 — full evidence, root-cause class, resolution mechanism, estimated effort
- `.planning/phases/82-harness-lineage-bump-terminal-re-audit-milestone-close/82-02-SUMMARY.md` §Known Issue — the precedent Phase 82 set for honest reporting of pre-existing FAILs
- `.planning/phases/82-harness-lineage-bump-terminal-re-audit-milestone-close/82-03-AUDIT-RESULTS.md` §Pre-existing legacy chain FAILs — cross-OS EXACT MATCH evidence

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|------------------|----------------|-----------------|
| Source Kerberos Extension Identifier from guide 09 prose rather than Apple dev docs | Faster — guide 09 mentions both identifiers | Guide 09 prose is correct but not the authoritative source; if guide 09 is ever updated, the Kerberos guide may silently diverge | Never — always source from Apple developer documentation directly |
| Document Graph API DELETE without a safety callout | Simpler doc | A bulk-delete script without a callout leads to accidental PSSO fleet re-registration; no way to undo without user-by-user re-enrollment | Never — suite convention requires `[!WARNING]` for all destructive operations |
| Ship NUAL MDM key literals sourced only from community blogs | Resolves PSSO-FUT-01 immediately | Wrong key name in a Settings Catalog table is worse than a deferred-item note; it creates silent misconfigurations | Never — Apple `device-management` schema + MS Learn verification required first |
| Fold chain-health RETRO pass into the harness-lineage-bump phase without adversarial-review | Fewer phases | If chain-health work overruns, it balloons the harness-bump phase; if chain-health is incomplete, the new apex inherits partially-fixed legacy state | Only after adversarial-review approves the fold (per v1.9 Phase 80 gray-area precedent) |
| Edit `macos-capability-matrix.md` and update the harness validator in separate commits | Easier review of individual changes | V-63-08 will FAIL between the two commits, creating a transient broken-chain state; breaks the atomic-commit indivisibility invariant | Never — matrix edit and V-63-08 blob update must be atomic |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Kerberos extension + PSSO coexistence | Using the same `Extension Identifier` value for both extensions in Intune Settings Catalog | Each extension must be in a SEPARATE profile entry with its own identifier: `com.apple.AppSSOKerberos.KerberosExtension` for Kerberos; `com.microsoft.CompanyPortalMac.ssoextension` for PSSO |
| Graph API DELETE + safety convention | Documenting DELETE without a blockquote safety callout | Follow the `> [!WARNING]` pattern from `03-esp-policy.md`; include "removes user's Platform Credential; requires PSSO re-registration" as the consequence statement |
| NUAL key literals + guide 08 existing content | Writing a new NUAL section or new file | Surgical edit to guide 08's existing NUAL table only; add MDM key column to the two authorization-mode rows; remove the deferred-item callout blockquote |
| Capability matrix + V-63-08 baseline | Editing `macos-capability-matrix.md` without updating `check-phase-63.mjs` V-63-08 | Run `git hash-object` pre-edit and post-edit; update V-63-08 blob hash in the same atomic commit as the matrix file change |
| Nav-hub integration + content authoring | Adding `docs/index.md` entries in a content-authoring phase | Nav-hub edits belong in the dedicated integration phase; content-authoring phases must explicitly prohibit nav-hub file edits |

---

## "Looks Done But Isn't" Checklist

- [ ] **Kerberos guide identifier:** Is `com.apple.AppSSOKerberos.KerberosExtension` sourced from Apple developer documentation (not from guide 09 prose or memory)?
- [ ] **Kerberos guide payload type:** Does the Kerberos profile example use `Type = Credential` (not `Redirect`)?
- [ ] **Kerberos guide scope:** Does the guide avoid AD admin content beyond a brief dependency note?
- [ ] **Graph API endpoint namespace:** Does every Graph API example use `https://graph.microsoft.com/v1.0/` (not `/beta/`)?
- [ ] **Graph DELETE safety callout:** Is there a `[!WARNING]` or `[!CAUTION]` blockquote on the DELETE endpoint section?
- [ ] **Graph permission table:** Does the doc include a permission table distinguishing read vs. delete scopes?
- [ ] **NUAL key verification:** Are the plist key literals sourced from Apple `device-management` schema AND cross-verified against Microsoft Learn Settings Catalog reference (not guessed)?
- [ ] **NUAL surgical edit:** Is the change scoped to adding key literals to the existing guide 08 table (not a rewrite)?
- [ ] **Capability matrix harness:** Is V-63-08 blob hash updated in the same atomic commit as the matrix file change?
- [ ] **Navigation-last invariant:** Do all content-authoring phase plans explicitly prohibit editing nav-hub files?
- [ ] **Chain-red honest reporting:** Does the harness-bump phase audit summary report the full chain FAIL count (including any remaining legacy FAILs), not just the new-phase count?

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|-----------------|--------------|
| K-1 Wrong extension identifier | Kerberos guide authoring | Phase plan cites Apple dev docs as source; guide contains the literal `com.apple.AppSSOKerberos.KerberosExtension` |
| K-2 Extension conflation with PSSO | Kerberos guide authoring | Opening disambiguation section present; does not contradict guide 09 |
| K-3 Stale `app-sso` CLI syntax | Kerberos guide authoring | Verify against man page; no `app-sso diagnose` in guide |
| K-4 Out-of-scope AD content | Kerberos guide authoring | SCOPE checklist item in phase plan; no AD admin how-to steps |
| K-5 Wrong payload type (Redirect vs Credential) | Kerberos guide authoring | Every Kerberos plist example uses `Type = Credential` |
| G-1 Beta vs GA Graph endpoint | Graph API doc authoring | Endpoint URLs confirmed as `v1.0` before doc is written |
| G-2 DELETE without safety callout | Graph API doc authoring | `[!WARNING]` blockquote present on DELETE section |
| G-3 Wrong Graph permission scope | Graph API doc authoring | Permission table present with least-privilege scopes verified |
| N-1 Guessed NUAL key literal | NUAL key verification (PSSO-FUT-01 close) | Two-source verification: Apple schema + Microsoft Learn; source citation in guide 08 |
| N-2 NUAL content redundancy | NUAL key verification | Diff shows surgical addition to existing table only; deferred-item callout removed |
| DI-1 Navigation-last broken | Roadmap + each content phase plan | Nav-hub prohibition clause in every content-phase plan; dedicated integration phase in roadmap |
| DI-2 Capability matrix without anchor inventory | Matrix-update/integration phase | Pre-edit anchor inventory step in phase plan; V-63-08 update in same atomic commit |
| DI-3 Chain-red masked | Harness-lineage-bump phase | Audit summary reports full chain FAIL count; no CHAIN_SKIP entries for phases 58–66/73 |

---

## Sources

### HIGH confidence (official Apple and Microsoft documentation)

- [Apple Developer Docs — ExtensibleSingleSignOnKerberos](https://developer.apple.com/documentation/devicemanagement/extensiblesinglesignonkerberos)
- [Apple device-management GitHub — com.apple.extensiblesso YAML schema](https://github.com/apple/device-management/blob/release/mdm/profiles/com.apple.extensiblesso.yaml) — authoritative MDM plist key names including `NewUserAuthorizationMode` and `UserAuthorizationMode`
- [Apple Support — Extensible Single Sign-on Kerberos MDM payload settings](https://support.apple.com/guide/deployment/dep13c5cfdf9/web)
- [Microsoft Learn — Enable Kerberos SSO in Platform SSO](https://learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on-kerberos-configuration) — plist sample with `com.apple.AppSSOKerberos.KerberosExtension` and `Type = Credential`; last updated 2024-05-13, re-verified 2026-06-15
- [Microsoft Learn — Platform SSO scenarios for macOS (Settings Catalog)](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-scenarios-macos) — end user experience settings table including `New User Authorization Mode` and `User Authorization Mode` display names; last updated 2026-05-11
- Context7 `/microsoftgraph/microsoft-graph-docs-contrib` — confirmed `platformCredentialAuthenticationMethod` in `api-reference/v1.0/` (GET, LIST, DELETE all GA); permission scopes in `concepts/permissions-reference.md`
- [Microsoft Graph Docs — platformCredentialAuthenticationMethod-list (v1.0)](https://github.com/microsoftgraph/microsoft-graph-docs-contrib/blob/main/api-reference/v1.0/api/platformcredentialauthenticationmethod-list.md)
- [Microsoft Graph Docs — platformCredentialAuthenticationMethod-delete (v1.0)](https://github.com/microsoftgraph/microsoft-graph-docs-contrib/blob/main/api-reference/v1.0/api/platformcredentialauthenticationmethod-delete.md)
- [app-sso man page](https://keith.github.io/xcode-man-pages/app-sso.1.html)

### HIGH confidence (internal v1.9 lineage)

- `docs/admin-setup-macos/08-auth-methods-deep-dive.md` lines 270–287 — existing NUAL table and deferred-item callout (PSSO-FUT-01)
- `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` §Kerberos SSO Extension (Coexistence) — lines 140–148
- `.planning/milestones/v1.9-DEFERRED-CLEANUP.md` §PSSO-FUT-01, §PSSO-FUT-02, §PSSO-FUT-04, §PRE-EXISTING-CHAIN-RED-AT-HEAD-01
- `scripts/validation/check-phase-63.mjs` lines 202–220 — V-63-08 byte-unchanged baseline for `macos-capability-matrix.md`
- `scripts/validation/check-phase-58.mjs` lines 88, 220, 248 — H2 and cross-link assertions on `macos-capability-matrix.md`
- `scripts/validation/check-phase-81.mjs` lines 48–49 — E3/E4 cross-link edges
- `docs/admin-setup-apv1/03-esp-policy.md` lines 101–105 — `[!WARNING]` callout convention for destructive operations (suite pattern)
- `.planning/milestones/v1.9-phases/80-l1-l2-runbooks/80-CONTEXT.md` — navigation-last invariant doctrine
- `.planning/phases/82-harness-lineage-bump-terminal-re-audit-milestone-close/82-02-SUMMARY.md` — pre-existing chain-red honest reporting precedent

---
*Pitfalls research for: v1.10 macOS Platform SSO follow-ons (Kerberos SSO extension, Graph API, NUAL)*
*Researched: 2026-06-22*
