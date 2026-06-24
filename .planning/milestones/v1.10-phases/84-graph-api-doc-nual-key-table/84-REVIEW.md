---
phase: 84-graph-api-doc-nual-key-table
reviewed: 2026-06-23T00:00:00Z
depth: standard
files_reviewed: 4
files_reviewed_list:
  - docs/admin-setup-macos/11-graph-api-platform-credential.md
  - docs/admin-setup-macos/08-auth-methods-deep-dive.md
  - docs/admin-setup-macos/00-overview.md
  - docs/_glossary-macos.md
findings:
  critical: 1
  warning: 3
  info: 3
  total: 7
status: issues_found
---

# Phase 84: Code Review Report

**Reviewed:** 2026-06-23
**Depth:** standard
**Files Reviewed:** 4
**Status:** issues_found

## Summary

Reviewed the new Graph API Platform Credential guide (guide 11), the NUAL table rework in guide 08, and the two cross-link insertions (00-overview.md, _glossary-macos.md).

The headline deliverables are solid. All Graph endpoints correctly use the `platformCredentialMethods` nav-property segment, all use v1.0 (no `/beta/`), the destructive Delete section carries a proper `> [!WARNING]` callout asserting all three required reader-safety facts (severs Entra binding / forces PSSO re-registration / does NOT erase the Secure Enclave key), and the NUAL table changes are correct (`NewUserAuthorizationMode` lists Standard/Admin/Groups/Temporary; `UserAuthorizationMode` excludes Temporary; the deferred-item blockquote is fully removed; the "Temporary not in Intune UI" caveat is present). Both new cross-links to guide 11 resolve to the file that exists.

However, the **Delete-operation permissions table inverts the privilege hierarchy** relative to both the Read table in the same guide and the least-privilege convention the project mandates (CLAUDE.md). An admin following the Delete table verbatim would over-grant tenant-wide write access to every user's authentication methods. This is the one blocker.

## Critical Issues

### CR-01: Delete permissions table inverts least/higher-privileged columns — drives over-provisioning of tenant-wide auth-method write

**File:** `docs/admin-setup-macos/11-graph-api-platform-credential.md:169-171`
**Issue:**
The Delete-operation permissions table lists the broad `UserAuthenticationMethod.ReadWrite` (delegated) and `UserAuthenticationMethod.ReadWrite.All` (application) in the **Least privileged** column, and the resource-specific `UserAuthMethod-PlatformCred.ReadWrite` / `UserAuthMethod-PlatformCred.ReadWrite.All` in the **Higher privileged** column. This is backwards:

- The resource-specific `UserAuthMethod-PlatformCred.ReadWrite[.All]` scopes write access to *Platform Credentials only* — it is the narrowest permission that can perform the delete, i.e. the least privileged.
- The broad `UserAuthenticationMethod.ReadWrite[.All]` grants write to **every** authentication method of the user (phone, FIDO2, Authenticator, password, email OTP, etc.) — it is the higher-privileged option.

This directly contradicts the Read table in the same guide (lines 158, 160), which correctly places `UserAuthMethod-PlatformCred.Read[.All]` as least privileged and `UserAuthenticationMethod.*` as higher privileged. An admin configuring the leaver/offboarding app registration (the guide's primary use case) by following the Delete table's "Least privileged" column would grant `UserAuthenticationMethod.ReadWrite.All`, giving the automation app write access to all auth methods of all users — a real least-privilege violation flagged explicitly in CLAUDE.md ("Follow principle of least privilege for Graph API permissions").

**Fix:** Swap the two columns for both delegated and application rows so the resource-specific permission is least privileged:
```markdown
### Delete Operation

| Permission type | Least privileged | Higher privileged |
|----------------|-----------------|-------------------|
| Delegated (work/school account, self via `/me`) | `UserAuthMethod-PlatformCred.ReadWrite` | `UserAuthMethod-PlatformCred.ReadWrite.All`, `UserAuthenticationMethod.ReadWrite`, `UserAuthenticationMethod.ReadWrite.All` |
| Delegated (admin acting on another user) | `UserAuthMethod-PlatformCred.ReadWrite` | (same as above) |
| Application | `UserAuthMethod-PlatformCred.ReadWrite.All` | `UserAuthenticationMethod.ReadWrite.All` |
| Personal Microsoft account | Not supported | Not supported |
```
Confirm the exact authoritative ordering against the Microsoft Learn "Delete platformCredentialAuthenticationMethod" permissions table before finalizing.

## Warnings

### WR-01: "10 minutes" MFA re-prompt window stated as hard fact without a provenance note — breaks suite convention for medium-confidence claims

**File:** `docs/admin-setup-macos/11-graph-api-platform-credential.md:176`
**Issue:** The "**MFA re-prompt:** ... last authenticated more than 10 minutes ago ..." sentence presents a specific numeric threshold as authoritative. Graph's self-service auth-method-management flows do require recent (re-)authentication, but the precise "10 minute" figure is not a documented Graph constant and is the kind of value that drifts. Guide 08 in the same suite handles exactly this situation with explicit provenance blockquotes (e.g. lines 109, 185, 254 mark MEDIUM-confidence values and tell the reader to re-confirm). Stating an unsourced numeric threshold as fact here is inconsistent with that convention and risks an admin building automation timing around an unverified number.
**Fix:** Either (a) remove the specific "10 minutes" figure and state the behavior qualitatively ("...if the session's last interactive authentication is stale, the system prompts for MFA before completing the delete"), or (b) add a provenance note in the guide-08 style citing the source and review date for the 10-minute value.

### WR-02: Gate-block pairs "Microsoft Graph API" with the resource-type token, not the nav segment — invites the exact wrong-endpoint mistake the guide otherwise avoids

**File:** `docs/admin-setup-macos/11-graph-api-platform-credential.md:9`
**Issue:** The platform-gate blockquote reads "via the Microsoft Graph API (`platformCredentialAuthenticationMethod`, Graph v1.0)". Every actual endpoint in the guide correctly uses the `platformCredentialMethods` nav-property segment, but the gate block is the first code-span a reader sees and visually associates "Graph API" with `platformCredentialAuthenticationMethod`. A reader skimming the gate could construct `.../authentication/platformCredentialAuthenticationMethod` (a 404). The body prose (line 15, 35) correctly frames `platformCredentialAuthenticationMethod` as the *resource type*, so the gate should match that framing.
**Fix:** Disambiguate in the gate block, e.g.: "via the Microsoft Graph API (`platformCredentialAuthenticationMethod` resource type; `platformCredentialMethods` endpoint segment, Graph v1.0)."

### WR-03: `keyStrength = normal` is asserted as proof of Secure Enclave backing in two places without qualification

**File:** `docs/admin-setup-macos/11-graph-api-platform-credential.md:44, 266`
**Issue:** Line 44 ("A value of `normal` indicates the credential is Secure Enclave-backed") and line 266 ("A `KeyStrength` of `normal` confirms the credential is Secure Enclave-backed") state an inference as a guarantee. `keyStrength` is a generic `authenticationMethodKeyStrength` enum (`normal`/`weak`/`unknown`) shared across authentication-method resources; `normal` reflects key strength, not a hardware-attestation flag, and is not a documented Secure-Enclave indicator. Presenting it as confirmation that the key is hardware-backed could mislead an operator into treating a software-fallback registration as Secure Enclave-backed. This claim is also unsourced relative to the suite's provenance convention.
**Fix:** Soften to a correlation and direct the reader to the authoritative check the suite already documents (`app-sso platform -s`, per guide 08 line 51 and the glossary Secure Enclave entry). E.g.: "`normal` is the expected value for a healthy registration; it is not by itself a hardware-attestation guarantee. Confirm Secure Enclave backing on-device with `app-sso platform -s`."

## Info

### IN-01: Forward-reference link to L2 Runbook #29 is a deliberate dangling link to a non-existent (Phase 85) file

**File:** `docs/admin-setup-macos/11-graph-api-platform-credential.md:190, 280`
**Issue:** Both references point to `../../docs/l2-runbooks/29-macos-graph-credential-investigation.md`, which does not exist (highest runbook present is #27; #29 is Phase 85 future work). The guide explicitly labels these as forward references / out of scope, so this is intentional, but it is a link that will not resolve for any reader today and any link-checker run against the suite will flag it.
**Fix:** Acceptable as a tracked forward reference. If the suite runs an automated link checker, add #29 to an allowlist, or render the target as inline code (not a live link) until the Phase 85 file lands, then convert to a live link.

### IN-02: Redundant `docs/` segment in the runbook relative path

**File:** `docs/admin-setup-macos/11-graph-api-platform-credential.md:190, 280`
**Issue:** The path `../../docs/l2-runbooks/...` from `docs/admin-setup-macos/` climbs two levels to the repo root and then re-enters `docs/`. It resolves correctly, but the cleaner intra-`docs` form is `../l2-runbooks/...` (one level up to `docs/`). The doubled traversal is stylistically inconsistent with the other links in the same file, which use single `../` to reach sibling `docs` content (e.g. `../_glossary-macos.md`).
**Fix:** Change both occurrences to `../l2-runbooks/29-macos-graph-credential-investigation.md` for consistency (and so the link resolves once the file exists).

### IN-03: Guide 11 version-history table has a single row and no chronological context vs. the suite's multi-row convention

**File:** `docs/admin-setup-macos/11-graph-api-platform-credential.md:284-286`
**Issue:** Minor: the new guide's history table contains only the initial-version row. This is correct for a brand-new file, but note that the other reviewed files (08, 00, glossary) maintain newest-first or mixed ordering inconsistently across the suite (e.g. _glossary-macos.md inserts the Phase 84 row above older Phase 81/75 rows, while 00-overview.md appends Phase 84 at the bottom). No action needed for guide 11; flagging the suite-wide ordering inconsistency observed while reviewing in case a convention is meant to be enforced.
**Fix:** None required for this phase. Consider documenting a version-history ordering convention (newest-first vs. append) for the suite to prevent future drift.

---

_Reviewed: 2026-06-23_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
