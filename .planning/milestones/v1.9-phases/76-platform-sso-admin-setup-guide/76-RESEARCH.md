# Phase 76: Platform SSO Admin Setup Guide — Research

**Researched:** 2026-06-21
**Domain:** macOS Platform SSO documentation authoring — technical facts, corpus mechanics, harness constraints
**Confidence:** HIGH (all decision-locked technical facts verified against Microsoft Learn official docs dated 2026-05-18 and 2026-06-01)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **A3 (D-01):** Hybrid structure — corpus outer skeleton (Prerequisites / Steps / Verification / Configuration-Caused Failures / See Also per 02-enrollment-profile.md) with PSSO-specific Steps inside.
- **A3 supplement (D-01a):** Bootstrapping blockers live in an upfront callout BEFORE any Settings Catalog steps (DF-3 ordering invariant).
- **A3 supplement (D-01b):** `app-sso platform -s` goes in `## Verification`, not Steps.
- **B1 (D-02):** In 00-overview.md, link guide 07 live; reference 08/09 as code-span/plain-text (NOT links); all three as Mermaid nodes. Keeps the frozen v1.8 C13 15-entry allowlist green.
- **C4 (D-03):** Bootstrapping blockers in an upfront callout naming all three + point-of-use inline cross-refs (NOT a Configuration-Caused-Failures table entry).
- **D1 (D-04):** ADE-during-Setup as a bordered Advanced/Optional subsection at guide end (post-enrollment = documented default); dual-field as a side-by-side table in the Settings Catalog step.

### Mandatory Carry-Overs

1. Convert the `07-platform-sso-setup.md` code-span in 03-configuration-profiles.md line 168 to a live markdown link IN THE SAME COMMIT that creates guide 07.
2. Front matter `last_verified: 2026-06-20` / `review_by: 2026-09-20` on guide 07 (ADE subsection mandatory; apply to whole doc per DS-2 90-day PSSO cadence).
3. Version-History table rows on guide 07 and 00-overview.md.
4. DS-1 callout discipline: main PSSO section gets NO supervised-only callout; ADE subsection gets an ADE-only callout (distinct string).

### Claude's Discretion

- Exact prose wording, callout text, table cells, step instructions within factual constraints.
- Whether individual fact-bearing lines (beyond the ADE subsection) get their own `last_verified`/`review_by` annotations.
- Exact number and naming of `### Step N` subheadings inside guide 07.

### Deferred Ideas (OUT OF SCOPE)

- Convert 00-overview 08/09 code-spans to live links (Phases 77/78).
- Auth-method selection/comparison content PSSO-05 (Phase 77 / guide 08).
- Capability-matrix Authentication section SSOREF-02 (Phase 79).
- Nav-hub integration SSOREF-04 (Phase 81).
- v1.9 harness lineage bump (Phase 82).
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PSSO-01 | Admin can stand up macOS Platform SSO from guide 07 — Settings Catalog payload, key identifiers, Entra prerequisites, user-group assignment, Company Portal prerequisite, registration flow with `app-sso platform -s` | SC1-section (a) below covers all identifiers and Settings Catalog fields; verified via Microsoft Learn 2026-05-18 |
| PSSO-02 | Guide documents mixed-fleet dual-field configuration (macOS 13 deprecated field AND macOS 14+ field in one policy) to prevent Error 10001 | SC2-section (b) below; exact field names verified; dual-field table prescription from VR-4 + official docs |
| PSSO-03 | Guide documents three bootstrapping prerequisites: per-user MFA removal, CA exclusion during bootstrap window, TLS break-and-inspect exemption | SC3-section (c) below; all three from PITFALLS DF-3/DF-9/DF-10; placement governed by D-03 (C4) |
| PSSO-12 | ADE-during-Setup-Assistant advanced/optional path — macOS 26 + CP 5.2604.0 + static-groups-only + Smart-card-excluded + wipe-to-fix + achievable prereq branch; `last_verified`/`review_by` carried | SC4-section (d) below; verified via Microsoft Learn ADE-PSSO doc 2026-06-01 |
</phase_requirements>

---

## Summary

Phase 76 authors a documentation guide (`docs/admin-setup-macos/07-platform-sso-setup.md`) that enables an Intune admin to stand up macOS Platform SSO end-to-end. The guide uses the same outer skeleton as guides 01–06 (confirmed from 02-enrollment-profile.md), but its Steps section is PSSO-specific. All technical facts have been verified against the official Microsoft Learn Platform SSO configuration page (updated 2026-05-18) and the ADE-during-enrollment page (updated 2026-06-01). No fact in this phase requires a "verify at authoring time" flag — all were resolved.

The phase also produces two surgical edits: extending 00-overview.md's Mermaid diagram and bullet list to surface guides 07/08/09 without breaking the v1.8 C13 15-entry allowlist, and converting the code-span placeholder on line 168 of 03-configuration-profiles.md to a live markdown link. Both edits are anchor-safe (body-level only, no heading changes).

**Primary recommendation:** Author guide 07 as a single commit that simultaneously creates the file, converts the 03-stub code-span, and updates 00-overview — landing the live link and its target atomically (the D-06 / C13 mandate).

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Platform SSO Settings Catalog policy | Documentation (guide 07) | — | Admin-facing config walk-through; no code tier |
| Entra device registration prerequisites | Documentation (guide 07 Prerequisites) | — | Entra-side admin tasks documented in guide |
| Bootstrapping blockers callout | Documentation (guide 07, upfront, pre-Steps) | — | D-01a / C4: must appear before Settings Catalog steps |
| Dual-field mixed-fleet table | Documentation (guide 07 Steps, Settings Catalog step) | — | D-04 / VR-4: side-by-side table in the same step |
| ADE-during-Setup advanced path | Documentation (guide 07, bordered subsection at end) | — | D-04: bordered Advanced/Optional, clearly post-enrollment default |
| `app-sso platform -s` verification | Documentation (guide 07 Verification) | — | D-01b: corpus Verification section |
| Navigation surfacing (07/08/09) | Documentation (00-overview.md edit) | — | B1: Mermaid nodes + live link 07 + code-span 08/09 |
| Stub code-span → live link | Documentation (03-config-profiles.md edit) | — | D-06 mandatory carry-over |

---

## (a) SC1 — Settings Catalog Fields and Identifiers

### Core Identifiers (VERIFIED: learn.microsoft.com, 2026-05-18)

| Field | Exact Value | Notes |
|-------|------------|-------|
| Extension Identifier | `com.microsoft.CompanyPortalMac.ssoextension` | Copy-paste; case-exact |
| Team Identifier | `UBF8T346G9` | Copy-paste |
| Registration Token | `{{DEVICEREGISTRATION}}` | Literal string including curly braces; exact case |
| Type | `Redirect` | Required; ignored for credential payloads |

### Settings Catalog Navigation Path (VERIFIED: learn.microsoft.com, 2026-05-18)

**Intune admin center:** Devices > Manage devices > Configuration > Create > New policy > (Platform: macOS) > (Profile type: Settings catalog) > Configuration settings > Add settings > **Authentication** > **Extensible Single Sign On (SSO)**

### Required Fields to Select in Settings Picker (VERIFIED: learn.microsoft.com, 2026-05-18)

| Field Name in Picker | macOS Scope | Required Value |
|---------------------|------------|----------------|
| Authentication Method (Deprecated) | macOS 13 only | `Password` or `UserSecureEnclaveKey` |
| Extension Identifier | all | `com.microsoft.CompanyPortalMac.ssoextension` |
| Platform SSO > Authentication Method | macOS 14+ | `Password`, `UserSecureEnclaveKey`, or `SmartCard` |
| Platform SSO > FileVault Policy | macOS 15+ | `AttemptAuthentication` (Password method only) |
| Platform SSO > Token To User Mapping > Account Name | all | `com.apple.PlatformSSO.AccountShortName` (recommended) or `preferred_username` |
| Platform SSO > Token To User Mapping > Full Name | all | `name` |
| Platform SSO > Use Shared Device Keys | macOS 14+ | Enabled |
| Registration Token | all | `{{DEVICEREGISTRATION}}` |
| Screen Locked Behavior | all | `Do Not Handle` |
| Team Identifier | all | `UBF8T346G9` |
| Type | all | `Redirect` |
| URLs | all | See URL list below |

### Required URLs (VERIFIED: learn.microsoft.com, 2026-05-18)

Standard cloud (all tenants must include):
- `https://login.microsoftonline.com`
- `https://login.microsoft.com`
- `https://sts.windows.net`

Sovereign cloud additions (Azure Government / China 21Vianet — include if applicable):
- `https://login.partner.microsoftonline.cn`
- `https://login.chinacloudapi.cn`
- `https://login.microsoftonline.us`
- `https://login-us.microsoftonline.com`

### macOS Version Gates (VERIFIED: learn.microsoft.com, 2026-05-18)

| Auth Method | Minimum macOS | Notes |
|-------------|--------------|-------|
| Secure Enclave key (UserSecureEnclaveKey) | 13 | Recommended; macOS 14 recommended for best experience |
| Password sync | 13 | Available via deprecated field on 13; native field on 14+ |
| Smart Card | 14 | NOT available on macOS 13 via any field |
| FileVault Policy (AttemptAuthentication) | 15 | Password method only |

**Framework minimum:** macOS 13 (not 14). macOS 14 is RECOMMENDED, not required for Secure Enclave or Password methods. Smart Card is hard-gated at macOS 14+. [VERIFIED: learn.microsoft.com, 2026-05-18]

### Company Portal Version Requirements (VERIFIED: learn.microsoft.com, 2026-05-18 and 2026-06-01)

| Use Case | Minimum CP Version |
|----------|--------------------|
| Standard PSSO (post-enrollment) | 5.2404.0 |
| ADE-during-Setup-Assistant PSSO | 5.2604.0 |

These are two distinct code paths with different floors. An older CP installs without error but Platform SSO silently fails.

### Assignment Rule (VERIFIED: learn.microsoft.com, 2026-05-18)

For devices with user affinity: assign the Platform SSO settings catalog policy to **user groups or user groups**, NOT device groups and NOT filters on device groups. Microsoft explicitly states: "it's not supported to assign to device groups or filters" for devices with user affinity — doing so can result in the user being unable to access CA-protected resources. [VERIFIED: learn.microsoft.com, 2026-05-18]

### Entra Prerequisites (VERIFIED: learn.microsoft.com, 2026-05-18)

- Users must be allowed to join devices to Microsoft Entra ID (configured in Entra > Devices > Device Settings > "Users may join devices to Azure AD").
- Intune admin account needs Device Configuration Read/Create/Update/Assign permissions (Policy and Profile Manager built-in role or equivalent).
- MFA must be enabled in the tenant for the registration step (users complete MFA when responding to the "Registration Required" notification).

### `app-sso platform -s` Verification (VERIFIED: learn.microsoft.com, 2026-05-18)

The guide references this command in `## Verification`. The official Microsoft Learn page points to "Check your device registration status" at `https://learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on#check-your-device-registration-status` for the full verification steps, with `app-sso platform -s` as the canonical device-side check. The output includes:
- `Device Registration:` field (REGISTERED / NOT REGISTERED)
- `User Registration:` field (REGISTERED / PENDING / FAILED)

The `## Verification` section should cover both device-side (`app-sso platform -s`) and Intune-portal checks (profile status "Succeeded" in Devices > Configuration > [profile] > Device status; Settings app: Settings > Privacy and security > Profiles shows `com.apple.extensiblesso Profile`).

### NewUserAuthorizationMode Key (CONFIRMED NOT NEEDED for guide 07)

Per PSSO-11 / D3=B: the `NewUserAuthorizationMode` key is LOW-confidence, omitted from guide 07, and tracked in v1.9-DEFERRED-CLEANUP.md. The official Microsoft Learn page references `com.apple.PlatformSSO.AccountShortName` and `preferred_username` for Token To User Mapping, not `NewUserAuthorizationMode`. Guide 07 uses `com.apple.PlatformSSO.AccountShortName` (recommended value per docs). [VERIFIED: learn.microsoft.com, 2026-05-18]

---

## (b) SC2 — Mixed-Fleet Dual-Field Configuration (PSSO-02)

### The Dual-Field Requirement (VERIFIED: learn.microsoft.com, 2026-05-18)

In a mixed macOS 13 + 14+ fleet, a single Settings Catalog policy MUST configure BOTH:

1. `Authentication Method (Deprecated)` — macOS 13 only; supports `Password` or `UserSecureEnclaveKey` (not SmartCard)
2. `Platform SSO > Authentication Method` — macOS 14+; supports `Password`, `UserSecureEnclaveKey`, or `SmartCard`

Configuring only the macOS 14+ field causes Error 10001 on macOS 13 devices. Configuring only the deprecated field means macOS 14+ devices miss the full Platform SSO > sub-settings.

### Side-by-Side Table Prescription (VR-4 + D-04)

Per VR-4 and decision D-04 (D1), this must be presented as a side-by-side table in the Settings Catalog configuration step (not as a callout or inline aside). The table should show:

| | macOS 13 | macOS 14+ |
|--|----------|-----------|
| **Field** | Authentication Method (Deprecated) | Platform SSO > Authentication Method |
| **Supports SmartCard** | No | Yes |
| **Failure if missing** | Error 10001 on macOS 13 devices | Missed Platform SSO sub-settings |

The Error 10001 consequence must be called out adjacent to or in the table header.

### Error 10001 Root Cause Statement (VERIFIED: learn.microsoft.com, 2026-05-18)

Microsoft Learn documents Error 10001 explicitly: "This error can occur if you didn't configure a required setting in the settings catalog profile, or you configured a setting in the settings catalog profile that isn't applicable for the redirect type payload." In the mixed-fleet context, the missing `Authentication Method (Deprecated)` for macOS 13 is the direct cause.

---

## (c) SC3 — Bootstrapping Blockers (PSSO-03)

### Placement Rule (D-01a / C4)

All three blockers appear in an upfront callout in guide 07, BEFORE the Settings Catalog step. Additionally, each blocker gets a point-of-use inline cross-reference at the step where it is relevant. These are NOT entries in the `## Configuration-Caused Failures` table.

### Blocker 1: Per-User MFA (DF-3) [VERIFIED: PITFALLS.md, sourced from learn.microsoft.com]

- **What:** Legacy per-user MFA (in Azure AD per-user MFA settings, NOT Conditional Access MFA) silently blocks Password sync PSSO registration. The webview authentication challenge escalates in a way the PSSO registration host cannot complete. No error is displayed; the flow simply stalls.
- **Resolution:** Disable per-user MFA for all PSSO target users; use Conditional Access MFA policy instead.
- **Applies to:** Password sync method specifically. Secure Enclave key method is less affected (no password sync step), but the prerequisite is still a best practice.
- **Placement:** Must appear BEFORE any Settings Catalog steps per DF-3.
- **Point-of-use cross-ref:** In the auth method configuration step.

### Blocker 2: CA Compliance Gating During Bootstrap (DF-9) [MEDIUM confidence, PITFALLS.md + learn.microsoft.com]

- **What:** A Conditional Access policy requiring "compliant device" blocks user PSSO registration on newly enrolled devices because device compliance depends on PSSO being established first — a circular dependency. Device registration (Phase 1, silent) succeeds; user registration (Phase 2, interactive) fails with "compliant device required."
- **Resolution:** Temporarily exclude the enrollment device group from strict CA "require compliant device" policies during the PSSO bootstrapping window. The exclusion can be removed after initial enrollment is confirmed.
- **Point-of-use cross-ref:** In the Entra prerequisites / assignment step.

### Blocker 3: TLS Break-and-Inspect (DF-10) [VERIFIED: learn.microsoft.com troubleshoot guide]

- **What:** Corporate proxies performing TLS inspection on Microsoft login endpoints break PSSO token acquisition. PSSO registration and token-refresh flows use certificate-pinned requests; a proxy injecting a non-Apple-root CA breaks these flows. Symptom: PSSO registration succeeds on non-intercepting proxies, fails behind TLS-inspecting proxies; certificate validation failures in error logs.
- **Resolution:** Exempt PSSO endpoints and Microsoft login endpoints from TLS break-and-inspect. At minimum: `login.microsoftonline.com`, `login.microsoft.com`, `sts.windows.net`. Alternatively, use Tenant Restrictions v2 client-side signaling instead of proxy header injection.
- **Point-of-use cross-ref:** In the Entra prerequisites / network requirements step.

---

## (d) SC4 — ADE-during-Setup-Assistant Advanced Path (PSSO-12)

### Prerequisites (VERIFIED: learn.microsoft.com, 2026-06-01)

| Requirement | Value |
|-------------|-------|
| macOS version | macOS 26 and newer (hard gate — no earlier macOS) |
| Company Portal version | 5.2604.0 or newer (LOB app, NOT VPP) |
| Enrollment method | Automated Device Enrollment (Apple Business Manager) |
| Group type | Assigned (static) user groups only — NOT dynamic groups, NOT device groups |
| Three-policy same-group rule | All three — Settings Catalog PSSO policy, Company Portal LOB app, ADE enrollment profile — must be assigned to the SAME static user groups |
| ADE profile settings | User Affinity: "Enroll with User Affinity"; Authentication: "Setup Assistant with modern authentication"; Await Final Configuration: Yes; Locked Enrollment: Yes |

### Key Settings Catalog Field for ADE Path (VERIFIED: learn.microsoft.com, 2026-06-01)

| Field | Path | Value |
|-------|------|-------|
| Enable Registration During Setup | Authentication > Extensible single sign-on > Platform SSO > Enable Registration During Setup | Enabled |
| Enable Create First User During Setup | Authentication > Extensible single sign-on > Platform SSO > Enable Create First User During Setup | Enabled (Password method only) |

### Smart Card Exclusion (VERIFIED: learn.microsoft.com, 2026-06-01 and macOS 14 gate)

Smart Card authentication method is NOT available during the ADE-during-Setup-Assistant path. Secure Enclave key (recommended) and Password sync are supported. Guide must note this exclusion in the ADE subsection.

### Wipe-to-Fix Recovery (VERIFIED: learn.microsoft.com, 2026-06-01)

If any of the three required policies are misconfigured or missing, there is no in-place fix. The official Microsoft Learn doc states explicitly: "Wipe the device, follow the steps, and re-enroll the device." Recovery procedure documented in the official page involves: (1) unassign PSSO policy with Enable Registration During Setup, sync device; (2) update policy to disable the setting, sync device; (3) if Password method, disable Enable Create First User During Setup; (4) wipe device; (5) re-enroll with correct configuration.

### "Update-to-macOS-26-First" Branch (D4=B)

CONTEXT.md D-04a requires an achievable "update-to-macOS-26-first" prerequisite branch. Since the ADE path requires macOS 26 at enrollment time (not just ADE), guide 07 must state: if the fleet is on macOS <26, update to macOS 26 BEFORE enrolling via this ADE path. This is not an aspirational note — it is the explicit prerequisite gate.

### Front Matter for ADE Subsection (MANDATORY carry-over)

```yaml
last_verified: 2026-06-20
review_by: 2026-09-20
```

The ADE section carries `last_verified` / `review_by` because the ADE-during-Setup-Assistant feature GA'd May 2026 and the ecosystem is rapidly evolving. Per REQUIREMENTS.md PSSO-12 and CONTEXT.md.

### macOS 15.3 Re-Registration Bug (VERIFIED: PITFALLS.md DF-8, sourced from learn.microsoft.com)

macOS 15.0–15.2 had a concurrency bug causing re-registration loops. FIXED in macOS 15.3. Guide 07 must NOT write "awaiting Apple fix" — the fix shipped. If noting macOS 15 at all (in the standard PSSO prerequisites), write: "macOS 15.0–15.2: re-registration loop — fixed in 15.3; upgrade to 15.3+ for Sequoia fleets." This is a version-gated note; the ADE path requires macOS 26, so the 15.x bug is only relevant to the standard (post-enrollment) path context.

---

## (e) SC5 — 00-overview.md Extension (B1 Mechanics)

### Current State of 00-overview.md (VERIFIED: file read)

**Front matter** (lines 1–7):
```yaml
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: ADE
audience: admin
platform: macOS
```

**Mermaid diagram** (lines 19–28):
```
graph LR
  A[1. ABM<br/>Configuration] --> B[2. Enrollment<br/>Profile]
  B --> C[3. Configuration<br/>Profiles]
  B --> D[4. App<br/>Deployment]
  B --> E[5. Compliance<br/>Policies]
  C --> F[6. Config<br/>Failures]
  D --> F
  E --> F
```

**Numbered bullet list** (lines 30–41): Six entries, 01-abm-configuration.md through 06-config-failures.md, all as live markdown links.

**Version-History table** (lines 58–60):
```
| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Initial version | -- |
```

### B1 Edit Mechanics

**Three additions required — all body-level, anchor-safe:**

1. **Mermaid:** Add three new nodes (07, 08, 09) downstream of the existing diagram. Safe because Mermaid node labels are not markdown anchor targets — C13 never validates them. Connect logically: `C --> G[7. Platform SSO<br/>Setup]` and add `G --> H[8. Auth Methods<br/>Deep-Dive]` (code-span reference in bullets; Mermaid node is safe), `G --> I[9. Enterprise SSO<br/>Migration]` (same).

2. **Numbered bullet list — guide 07:** Add entry 7 as a LIVE markdown link: `7. **[Platform SSO Setup](07-platform-sso-setup.md)**` — the file exists after Phase 76, so the link is valid. C13 gate satisfied.

3. **Numbered bullet list — guides 08/09:** Add entries 8 and 9 as code-span/plain-text per B1 decision. Exact literal form from CONTEXT.md §Specific Ideas:
   - `` 8. `08-auth-methods-deep-dive.md` (added in a later documentation phase) ``
   - `` 9. `09-enterprise-sso-plugin-migration.md` (added in a later documentation phase) ``
   These are NOT markdown links — C13 sees no link target to validate. The 15-entry allowlist remains at 15.

4. **Version-History row:** Add a new row for Phase 76: `| 2026-06-20 | Phase 76: added guides 07/08/09 to Mermaid diagram and numbered list | -- |`

### C13 Allowlist Analysis (VERIFIED: v1.8-milestone-audit.mjs lines 668-679)

The v1.8 C13 gate hard-asserts `allowlist.length === 15` with exactly `6 transient_external` + `9 template_placeholder` categories. The allowlist check operates on the allowlist sidecar file, not on link content. Mermaid node labels are never evaluated as links. Code-span filenames in bullet text are never evaluated as links. Only `[text](path)` markdown link syntax is evaluated by `markdown-link-check`. Therefore:
- Adding `[Platform SSO Setup](07-platform-sso-setup.md)` as a live link is safe IF AND ONLY IF guide 07 is created in the same commit.
- Adding `` `08-auth-methods-deep-dive.md` `` as a code-span is safe unconditionally.
- No allowlist entry is needed for any of the three additions.

---

## (f) 03-configuration-profiles.md Code-Span → Live Link Conversion

### Current State (VERIFIED: file read)

**Line 168 (exact current text):**
```
Continue with Platform SSO setup in `07-platform-sso-setup.md` (added in the next documentation phase).
```

### Target State

```
Continue with Platform SSO setup in [07-platform-sso-setup.md](07-platform-sso-setup.md).
```

The parenthetical `(added in the next documentation phase)` is dropped because the file now exists. The link target is a sibling file in the same directory (`docs/admin-setup-macos/`), so the relative path is correct.

### Anchor Safety

The `## Extensible SSO` heading (line 157) and `#### In Intune admin center` subheading (line 159) must NOT be changed — they are existing anchors that may be inbound link targets from 06-config-failures.md or other corpus files. Only line 168 prose changes. A Version-History row must be added.

**Version-History row to add:**
```
| 2026-06-20 | Phase 76 (PSSO-01 / D-06): converted `07-platform-sso-setup.md` code-span to live markdown link | -- |
```

---

## Corpus Skeleton to Replicate (guide 07)

Based on 02-enrollment-profile.md (the canonical sibling exemplar):

### Front Matter Shape

```yaml
---
last_verified: 2026-06-20
review_by: 2026-09-20
applies_to: ADE
audience: admin
platform: macOS
---
```

Note: `applies_to: ADE` is the existing corpus front-matter value even for guides that cover non-ADE paths, because all guides in `docs/admin-setup-macos/` are ADE-focused. However, since guide 07 applies broadly to any MDM-enrolled Mac (not exclusively ADE), the executor may use `applies_to: both` or `applies_to: macOS` — defer exact value to executor's judgment within Claude's Discretion scope. The `last_verified` / `review_by` values are mandatory.

### Platform Gate Banner

```markdown
> **Platform gate:** This guide covers macOS Platform SSO configuration via Microsoft Intune.
> For Windows Autopilot setup, see [Windows Admin Setup Guides](../admin-setup-apv1/00-overview.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).
```

### Section Sequence (LOCKED by A3 / D-01)

```
## Prerequisites
## Steps
  ### Step 1: [Pre-deploy prerequisites / Entra setup]
  ### Step 2: [Upfront bootstrapping blockers callout placement — D-01a]
  ### Step N: [Create Settings Catalog policy]
  ... (remaining steps per guide author's discretion)
## Verification
## Configuration-Caused Failures
## See Also
---
| Date | Change | Author |
```

**Note on bootstrapping blockers placement:** D-01a requires the upfront callout to appear BEFORE any Settings Catalog steps. The planner must sequence the bootstrapping callout step (or a dedicated "Before You Begin" sub-section under Prerequisites) such that it precedes the "Create Settings Catalog policy" step. One valid structure: put the blockers callout in a subsection of `## Prerequisites` (e.g., `### Known Silent Blockers — Resolve Before Deployment`) so DF-3's "before any Settings Catalog steps" ordering is unambiguous.

### Configuration-Caused Failures Table (per corpus pattern)

The `## Configuration-Caused Failures` table uses columns: `Misconfiguration | Portal | Symptom | Runbook`. Bootstrapping blockers (DF-3/DF-9/DF-10) are NOT in this table per D-03. The table covers Settings Catalog misconfigurations that produce observable portal/device errors:

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| Only macOS 14+ auth method configured on mixed fleet | Intune | Error 10001 on macOS 13 devices | [to be linked to SSORUN-03 in Phase 80] |
| Legacy SSO app extension profile still assigned alongside PSSO | Intune | Error 10002; registration suppressed | [to be linked in Phase 80] |
| `{{DEVICEREGISTRATION}}` token mis-typed or missing braces | Intune | Profile succeeds; no registration prompt | [to be linked in Phase 80] |
| Authentication method changed on existing policy | Intune | Fleet-wide re-registration | — |

Note: Runbook links will be to future Phase 80 files. At Phase 76 authoring time, the runbook files do not exist. Use the Phase 75 / D-06 pattern — code-span placeholder referencing the future runbook filename (e.g., `` `35-macos-sso-sign-in-failure.md` ``), to be converted to live links in Phase 80 in the same commit that creates those runbooks.

### Version-History Table Shape

```markdown
---

| Date | Change | Author |
|------|--------|--------|
| 2026-06-20 | Phase 76 (PSSO-01/02/03/12): initial Platform SSO admin setup guide | -- |
```

### See Also Section (guide 07)

Must link to the glossary anchors created in Phase 75:

- `[Platform SSO](../_glossary-macos.md#platform-sso)`
- `[Secure Enclave](../_glossary-macos.md#secure-enclave)`
- `[Enterprise SSO Plug-in](../_glossary-macos.md#enterprise-sso-plug-in)`
- `[Configuration Profiles](03-configuration-profiles.md)` (back-link to the stub that now points here)
- `[macOS ADE Lifecycle Overview](../macos-lifecycle/00-ade-lifecycle.md)` (standard corpus pattern)

---

## Architecture Patterns

### Guide 07 Data Flow (Documentation)

```
Admin reads guide 07
  |
  v
## Prerequisites (incl. bootstrapping blockers callout)
  |
  v
## Steps
  ├─> Create Entra prerequisites (device join settings, CA exclusion, MFA migration, TLS exemption)
  ├─> Install / verify Company Portal 5.2404.0+
  ├─> Create Settings Catalog policy (dual-field table for mixed fleet)
  ├─> Assign to user groups (not device groups, not filters)
  └─> [Advanced: ADE-during-Setup subsection at end]
  |
  v
## Verification
  ├─> Intune portal: profile status "Succeeded"
  ├─> Device: app-sso platform -s (Device Registration: REGISTERED, User Registration: REGISTERED)
  └─> Device: System Settings > Privacy and security > Profiles > com.apple.extensiblesso Profile
  |
  v
## Configuration-Caused Failures (table)
```

### ADE-during-Setup Subsection Structure (D-04 / PSSO-12)

The subsection is bordered with a hard-bordered callout or a `---` delimited block labeled "Advanced / Optional". It appears AFTER the standard post-enrollment registration flow (Step 5 or the last standard step). It contains:

1. ADE-only callout (DS-1 — distinct from supervised-only callout)
2. Prerequisites table: macOS 26, CP 5.2604.0, static groups, three-policy same-group rule
3. "Update-to-macOS-26-first" branch (achievable prerequisite statement)
4. Settings Catalog additions: Enable Registration During Setup (Enabled); Enable Create First User During Setup (Enabled, Password method only)
5. Smart-card-excluded note
6. Wipe-to-fix recovery statement

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead |
|---------|-------------|-------------|
| Settings Catalog navigation path | Re-derive from Intune UI | Copy exact path from this research (VERIFIED 2026-05-18) |
| Extension Identifier value | Type from memory | Copy-paste: `com.microsoft.CompanyPortalMac.ssoextension` |
| Team ID value | Type from memory | Copy-paste: `UBF8T346G9` |
| Registration Token value | Type from memory | Copy-paste: `{{DEVICEREGISTRATION}}` (including braces) |
| Version-History table shape | Custom format | Replicate exact format from 02-enrollment-profile.md lines 137-140 |
| Corpus outer skeleton | Freeform structure | Replicate `## Prerequisites / ## Steps / ## Verification / ## Configuration-Caused Failures / ## See Also` from 02-enrollment-profile.md |

---

## Common Pitfalls (authoring-time traps)

### Pitfall 1: DS-1 — Supervised-Only Callout Misuse

**What goes wrong:** Adding a "supervised-only" callout to the main PSSO section because ADE = supervised. Platform SSO is NOT supervision-gated; it works on any MDM-enrolled Mac. Only the ADE-during-Setup-Assistant sub-feature requires ADE. The ADE subsection gets an "ADE-only" callout with distinct language from the suite's supervised-only callout.

**Prevention:** Main PSSO section = no supervised-only callout. ADE subsection = ADE-only callout. Different callout strings, different placement.

### Pitfall 2: VR-5 — Conflating Post-Enrollment and ADE-During-Setup Flows

**What goes wrong:** Writing the ADE-during-Setup path inline with the standard flow as if they are the same steps. The default documented flow is post-enrollment (user receives "Registration Required" notification after reaching the desktop). The ADE path (macOS 26 + CP 5.2604.0 + Enable Registration During Setup) is an advanced/optional variant. Decision D-04 places the ADE path in a bordered subsection at the guide end precisely to prevent this conflation.

**Prevention:** The bordered Advanced/Optional subsection at the end of guide 07. The standard steps never mention `Enable Registration During Setup`.

### Pitfall 3: Missing the Dual-Field (Error 10001)

**What goes wrong:** Showing only the `Platform SSO > Authentication Method` field and omitting `Authentication Method (Deprecated)`. Any macOS 13 device receiving this profile will show Error 10001 in Intune.

**Prevention:** Side-by-side table in the Settings Catalog step (per D-04 / VR-4). Both fields must be configured in the same policy when targeting a mixed fleet.

### Pitfall 4: DF-3 Ordering — Per-User MFA Callout After Settings Catalog Steps

**What goes wrong:** Placing the per-user MFA blocker as a "note" inside or after the Settings Catalog configuration step. DF-3 mandates this appears BEFORE any Settings Catalog steps.

**Prevention:** Upfront callout in `## Prerequisites` or as the first item in an explicit "Before You Begin" block. D-01a enforces this.

### Pitfall 5: C13 — Live-Linking 08/09 in 00-overview

**What goes wrong:** Converting the 08/09 entries to live markdown links in 00-overview.md now (Phase 76). Guide 08 and guide 09 do not exist yet. This creates broken internal links that break the v1.8 C13 gate.

**Prevention:** B1 decision: 08/09 as code-span/plain-text in the bullet list. Only guide 07 gets a live link, and only in the same commit that creates the file.

### Pitfall 6: Anchor Drift in Edited Files

**What goes wrong:** Renaming, reordering, or adding headings in 00-overview.md or 03-configuration-profiles.md. These are edited (not new) files and have inbound link targets.

**Prevention:** Edits in both files are body-level only. No heading changes in either file. For 03-configuration-profiles.md: only line 168 prose changes. For 00-overview.md: only Mermaid body additions and new bullet items.

### Pitfall 7: Runbook Links in Configuration-Caused Failures Table

**What goes wrong:** Linking to PSSO runbooks (35-macos-sso-sign-in-failure.md, etc.) in the `## Configuration-Caused Failures` table before those files exist (Phase 80).

**Prevention:** Use the D-06 code-span pattern: reference the runbook filename as a code-span (not a live link) with a parenthetical. The Phase 80 plan converts these to live links in the same commits that create the runbooks.

---

## File-State Facts for the Planner

### Files to CREATE

- `docs/admin-setup-macos/07-platform-sso-setup.md` — new file; no anchor constraints on its internal headings.

### Files to EDIT

| File | Current Line Count | Edit Location | Edit Type |
|------|-------------------|---------------|-----------|
| `docs/admin-setup-macos/00-overview.md` | 61 lines | Lines 19–28 (Mermaid body) + lines 30–41 (bullet list) + lines 58–60 (Version-History) | Body-level additions only; no heading changes |
| `docs/admin-setup-macos/03-configuration-profiles.md` | 204 lines | Line 168 (code-span → live link prose) + lines 199–203 (Version-History table) | Single-line text change + new Version-History row |

### Glossary Anchors Available (created Phase 75, stable)

These anchors exist and are stable — guide 07 See Also can link to them:
- `docs/_glossary-macos.md#platform-sso`
- `docs/_glossary-macos.md#secure-enclave`
- `docs/_glossary-macos.md#enterprise-sso-plug-in`
- `docs/_glossary.md#entra-id-sso` (via the `#entra-id-sso` anchor in _glossary.md, cross-referenced from _glossary-macos.md)

### 03-stub Exact Target (line 168 current text)

```
Continue with Platform SSO setup in `07-platform-sso-setup.md` (added in the next documentation phase).
```

Target replacement:
```
Continue with Platform SSO setup in [07-platform-sso-setup.md](07-platform-sso-setup.md).
```

No other changes to the `## Extensible SSO` section content. The section text on lines 163–166 (the accurate corrected description from Phase 75) remains verbatim.

---

## Environment Availability

This phase is purely documentation authoring — no external tools, runtimes, or services required at execution time. The Intune admin center URLs are referenced for instructional prose only.

Step 2.6: SKIPPED (no external dependencies identified for documentation authoring).

---

## Validation Architecture

Config: `.planning/config.json` — no `workflow.nyquist_validation: false` key found (default = enabled), but this phase produces only `.md` files. No automated test framework is applicable for Markdown documentation authoring.

Validation for this phase is the v1.8 milestone audit harness (`scripts/validation/v1.8-milestone-audit.mjs`), specifically C13 (broken-link gate). The relevant check is NOT about test files — it is the allowlist shape assertion.

**Phase-gate validation:**
- C13 must remain green: `allowlist.length === 15`, `6 transient_external`, `9 template_placeholder` — no new internal broken links introduced.
- `07-platform-sso-setup.md` must exist when `00-overview.md` links to it (atomic commit satisfies this).
- `07-platform-sso-setup.md` must exist when `03-configuration-profiles.md` links to it (atomic commit satisfies this — same commit).

**Quick run (after authoring):**
```bash
node scripts/validation/v1.8-milestone-audit.mjs
```

---

## Security Domain

This phase authors documentation only. No new API endpoints, no secrets, no authentication code. ASVS is not applicable to documentation authoring. The security content documented IN the guide (TLS exemption, CA policy, per-user MFA) is factual representation of Microsoft's official security guidance, not new security code.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `applies_to: ADE` is the correct front-matter value for guide 07, consistent with sibling guides 01-06 | Corpus Skeleton | Guide front-matter would be inconsistent; low impact, executor can adjust |
| A2 | Runbook files `35-macos-sso-sign-in-failure.md` et al. do not yet exist as of Phase 76 | Configuration-Caused Failures table | If they exist, live links are safe and code-spans are conservative |
| A3 | The 00-overview.md Mermaid graph direction (`graph LR`) and existing node IDs (A–F) are correct to extend with G/H/I | 00-overview edit mechanics | If node IDs conflict, rename outgoing nodes; structure is not locked |

All locked technical facts (Settings Catalog field names, identifiers, version gates, ADE prerequisites, wipe-to-fix, static-groups rule) are VERIFIED against official Microsoft Learn documentation (2026-05-18 and 2026-06-01).

**If this table's VERIFIED items are wrong:** They would require a change in Microsoft's official documentation, which is the authoritative source. The research verifies the current state of those docs.

---

## Open Questions (RESOLVED)

> Both questions below have a definitive recommendation and are implemented by the Phase 76 plans (code-span runbook placeholders per D-06; `applies_to: ADE` for corpus consistency, executor discretion). No blocking unknowns remain.

1. **`applies_to` front-matter value for guide 07**
   - What we know: All existing guides 01-06 use `applies_to: ADE`. Guide 07 covers PSSO which works on any MDM-enrolled Mac, not exclusively ADE.
   - What's unclear: Whether the executor should use `ADE`, `both`, or `macOS` for consistency vs accuracy.
   - Recommendation: Use `applies_to: ADE` for corpus consistency since this directory is named `admin-setup-macos/` and is the ADE admin setup suite. If it matters, executor uses discretion.

2. **Runbook link placeholders in Configuration-Caused Failures table**
   - What we know: PSSO runbooks ship in Phase 80; guide 07 is Phase 76.
   - What's unclear: Whether to use code-span placeholders or omit the Runbook column entirely for PSSO rows.
   - Recommendation: Use code-span placeholders (same D-06 pattern as the 03-stub). Planner specifies this in task actions.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Platform SSO "in public preview" | Generally Available | August 2025 | Never write "preview" — it's GA |
| PSSO during ADE "in preview" | Generally Available | May 2026 (macOS 26 GA) | ADE path is GA; requires macOS 26 |
| macOS 15.0–15.2 re-registration loop "awaiting fix" | Fixed in macOS 15.3 | macOS 15.3 release | Write "fixed in 15.3" not "pending fix" |
| `security find-certificate` for WPJ verification | `app-sso platform -s` | Q3 2025 (WPJ moved to Secure Enclave) | Old command returns false negatives on PSSO devices |
| macOS 14+ only for Platform SSO (common misconception) | macOS 13+ (Smart Card = 14+) | GA Aug 2025 confirms 13 support | Guide must state 13 as minimum, 14 as recommended |

---

## Sources

### Primary (HIGH confidence — VERIFIED in this research session)

- Microsoft Learn — "Configure Platform SSO for macOS devices" (canonical URL: learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos), updated 2026-05-18 — Settings Catalog fields, identifiers, version gates, assignment rule, all URL values, Error 10001/10002, Company Portal 5.2404.0 floor
- Microsoft Learn — "Add Platform SSO policy to ADE Profile on macOS devices" (learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-during-enrollment), updated 2026-06-01 — macOS 26 gate, CP 5.2604.0, Enable Registration During Setup field path, static-groups rule, three-policy same-group rule, wipe-to-fix recovery, Smart Card exclusion
- `.planning/research/PITFALLS.md` — DF-3, DF-4, DF-9, DF-10, DF-12, DF-13, DS-1, DS-2, VR-4, VR-5 (sourced from Microsoft Learn + Apple Platform Deployment, researched 2026-06-20)
- `docs/admin-setup-macos/02-enrollment-profile.md` — corpus skeleton exemplar (front-matter, section structure, Version-History shape, platform gate banner pattern)
- `docs/admin-setup-macos/00-overview.md` — current Mermaid and bullet list (confirmed line ranges and content)
- `docs/admin-setup-macos/03-configuration-profiles.md` — current code-span at line 168 (confirmed exact text)
- `docs/_glossary-macos.md` — confirmed Phase 75 anchors: `#platform-sso`, `#secure-enclave`, `#enterprise-sso-plug-in` at lines 123, 130, 136
- `scripts/validation/v1.8-milestone-audit.mjs` lines 668-679 — C13 gate: `allowlist.length !== 15` hard-fail, `6 transient_external` / `9 template_placeholder` assertions

### Secondary (HIGH confidence — from prior research sessions, not re-fetched)

- `.planning/phases/76-platform-sso-admin-setup-guide/76-CONTEXT.md` — all four locked decisions (A3/B1/C4/D1), mandatory carry-overs, phase boundary
- `.planning/REQUIREMENTS.md` — PSSO-01/02/03/12 requirement text

---

## Metadata

**Confidence breakdown:**

| Area | Level | Reason |
|------|-------|--------|
| Settings Catalog field names and values | HIGH | Verified against Microsoft Learn 2026-05-18 |
| Version gates (macOS 13/14/15/26, CP versions) | HIGH | Verified against Microsoft Learn 2026-05-18 + 2026-06-01 |
| ADE-during-enrollment prerequisites | HIGH | Verified against Microsoft Learn 2026-06-01 |
| Bootstrapping blockers (DF-3/DF-9/DF-10) | HIGH (DF-3/DF-10) / MEDIUM (DF-9) | DF-3/DF-10 from Microsoft Learn troubleshoot guide; DF-9 from Microsoft Learn + Jamf community (bootstrapping pattern well-established) |
| Corpus skeleton and anchor rules | HIGH | Verified from 02-enrollment-profile.md and 00-overview.md direct reads |
| C13 harness constraint | HIGH | Verified from v1.8-milestone-audit.mjs lines 668-679 |

**Research date:** 2026-06-21
**Valid until:** 2026-09-20 (90-day PSSO cadence) — Settings Catalog field names and Company Portal version floors are most likely to change before then
