# Phase 77: Auth Methods Deep-Dive — Research

**Researched:** 2026-06-21
**Domain:** macOS Platform SSO authentication-method deep-dive documentation (pure documentation phase)
**Confidence:** HIGH across all core facts; two items flagged MEDIUM/LOW as noted

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01 (A3):** Hybrid structure — method-per-section body (comparison table → SE section → Password section → Smart Card section → advanced sections) PLUS corpus-compatible `## Configuration-Caused Failures` + `## See Also` tail.
- **D-01a:** Guide 08 is a new file → no internal anchor-stability constraint. Internal heading names are at planner/executor discretion within SC1–SC5 factual constraints.
- **D-02 (C3):** Both — dedicated FileVault/Secure-Enclave interaction sub-section AND per-method cross-referenced callouts. State each FileVault fact once canonically (in the SE section); cross-reference (do NOT restate) from Password-sync section and misconception box.
- **D-03 (D3):** Both — consolidated "Common Misconceptions" myth-vs-fact box (CD-3 table) AND point-of-use hard-bordered callouts at each method. Each danger stated canonically in its method section; box links to the method sections.
- **D-04 (B1 restructure arm):** Comparison/selection table at the **top** of the doc, before method deep-dives. Built to SC1's **exactly four** locked dimensions — passwordless / phishing-resistant / hardware / macOS-version — with SE clearly marked as Microsoft's recommendation. DO NOT lift the SUMMARY draft table verbatim (it has ~10 rows; SC1 requires exactly four dimensions).
- **D-04a:** Extra rows from the research draft (passkey-capable, local-password-synced, Settings-Catalog-key-value, macOS-13-vs-14 split) belong in per-method deep-dive bodies, NOT the SC1 selection table.

### Claude's Discretion

- Exact prose wording of the guide, method deep-dives, comparison-table cells, callouts, and the misconception box.
- Exact internal heading names/anchors for guide 08 (new file — no anchor-stability constraint).
- Whether individual fact-bearing lines get their own `last_verified`/`review_by` annotations per DS-2 — apply where the researcher flags rapidly-changing facts (Company Portal version floors, macOS-version gates, Touch-ID CP 2504 / macOS 14.6).

### Deferred Ideas (OUT OF SCOPE)

- `NewUserAuthorizationMode` **exact privilege key value** — LOW confidence; **omit** from guide 08 and record in `v1.9-DEFERRED-CLEANUP.md`. (Official docs show `New User Authorization Mode` as a Settings Catalog display name with values Standard/Admin/Groups; the underlying MDM key name was not confirmed from the Settings Catalog payload schema. Track in DEFERRED-CLEANUP.)
- Legacy Enterprise SSO plug-in & migration guide `09-...` — Phase 78. Guide 08 may name it in See Also as a code-span/plain-text filename, NOT a live link (C13 mechanism).
- Capability-matrix Authentication section — Phase 79 (link-not-copy to guide 08).
- L1/L2 runbooks — Phase 80.
- Nav-hub integration — Phase 81.
- v1.9 harness lineage bump — Phase 82.

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PSSO-05 | Admin can choose an auth method from a selection/comparison guide (SE key [recommended] vs Password sync vs Smart card; passwordless / phishing-resistant / hardware / macOS-version dimensions) | Verified comparison table cells § Standard Stack; D-04 dimension set confirmed from official Microsoft Learn |
| PSSO-06 | Secure Enclave auth method documented in depth — hardware scope, non-exportable key, PRT for device-wide SSO, FileVault non-relationship, password-reset-destroys-key warning | All six SE non-negotiable fact anchors verified § Secure Enclave Method Facts |
| PSSO-07 | Password sync auth method documented in depth — sync timing, complexity-mismatch, macOS 15+ FileVaultPolicy, per-user MFA blocker, AD-bound limitation | All facts verified from official sources § Password Sync Method Facts |
| PSSO-08 | Smart card auth method documented in depth — Entra CBA prerequisite, sc_auth pairing, macOS 14+ gate, not-available-during-Setup-Assistant | CBA prerequisite distilled § Entra CBA Admin Steps; macOS gate and SA exclusion verified from official sources |
| PSSO-09 | Touch ID biometric policy documented (D1=A) — enable_se_key_biometric_policy [CP 2504], UserSecureEnclaveKeyBiometricPolicy [macOS 14.6+], no-password-fallback lockout warning, admin-driven re-registration | All verified from official Entra docs § Touch ID Biometric Policy |
| PSSO-10 | Passkey/FIDO2 from Platform Credential documented (D2=A) — Entra auth-methods enablement, AAGUID allowlist, end-user self-enablement | AAGUID verified; conditional-note on key-restrictions-only verified § Passkey/FIDO2 Facts |
| PSSO-11 | NUAL documented conceptually (D3=B) — macOS 14+, Shared Device Keys, AccountShortName mapping; NewUserAuthorizationMode key OMITTED + tracked in DEFERRED-CLEANUP | NUAL behavior verified; key name deferred — see Assumptions Log |

</phase_requirements>

---

## Summary

Phase 77 authors a pure-documentation deep-dive/selection reference guide (`docs/admin-setup-macos/08-auth-methods-deep-dive.md`) and converts one line in `docs/admin-setup-macos/00-overview.md` from a code-span to a live link. No code changes. No packages. The research focus was: (a) distilling the Entra CBA prerequisite steps for the Smart Card section (the "Research Flag" deferred from roadmap planning), (b) confirming all per-method technical facts against current official sources, and (c) documenting the corpus conventions the planner must follow.

The Entra CBA admin walk-through has been fully fetched and distilled. Entra CBA requires five admin steps (PKI/CA upload → enable CBA for a group → authentication-binding policy → username-binding policy → verify). Guide 08 does NOT need to reproduce all five steps — it must accurately describe what the admin must have completed first and link to the official source. The key fact: CBA is configured in **Entra admin center > Authentication methods > Certificate-based authentication** and requires the **Privileged Authentication Administrator** Entra role to upload CA certificates and the **Authentication Policy Administrator** role to configure policies. This is a separate multi-day Entra admin task before any PSSO Smart Card Settings Catalog profile is deployed.

The Touch ID `UserSecureEnclaveKeyBiometricPolicy` no-password-fallback lockout warning is confirmed from official Entra docs: when enabled, there is NO password fallback; if a user lacks Touch ID biometrics they CANNOT authenticate to Entra ID via PSSO, and re-registration to disable requires admin-driven action (users do not self-trigger the re-registration prompt).

The `NewUserAuthorizationMode` (NUAL privilege key) situation has been partially resolved: official Intune docs show it as `New User Authorization Mode` in the Settings Catalog UI with supported values Standard/Admin/Groups. However, the underlying MDM payload key name was not confirmed from an authoritative schema source. Per D-03/PSSO-11, omit the key literal from guide 08 and track in DEFERRED-CLEANUP.

**Primary recommendation:** Write guide 08 as a reference document for the architect/senior-admin audience using the A3 hybrid structure. The SC1 four-dimension selection table goes first; three method deep-dives follow; advanced sections (Touch ID, Passkey/FIDO2, NUAL) trail the method sections; the corpus-compatible tail (## Configuration-Caused Failures + ## See Also) closes the document.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Auth method selection table | Documentation | — | Pure content; no code tier |
| Secure Enclave key facts | Documentation | Entra ID (cloud) | Key generated in device hardware; PRT consumed by Entra |
| FileVault interaction | Documentation | macOS (OS layer) | FileVault is an Apple OS feature; PSSO is parallel, not integrated |
| Password sync | Documentation | Entra ID (cloud) | Entra password drives the sync; complexity policy is Entra-side |
| Smart Card CBA prerequisite | Entra admin (cloud) | Documentation | CBA is an Entra tenant configuration task separate from Intune/PSSO |
| Touch ID biometric policy | Intune (Settings Catalog) | macOS 14.6+ | Delivered via MDM Extension Data key; enforced by macOS/Company Portal |
| Passkey/FIDO2 enablement | Entra admin (auth methods) | Documentation | FIDO2 key method must be enabled in Entra Authentication Methods policy |
| NUAL account creation | macOS (login window) | Intune (Settings Catalog) | macOS 14+ feature; triggered at login window; configured via MDM |

---

## Standard Stack

This phase authors documentation only. There are no packages to install. The "stack" is the Microsoft/Apple configuration surface the guide must cite accurately.

### Confirmed Identifiers and Key Values

[VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos, updated 2026-05-18]

| Identifier | Value |
|-----------|-------|
| Extension Identifier | `com.microsoft.CompanyPortalMac.ssoextension` |
| Team Identifier | `UBF8T346G9` |
| Apple payload type | `com.apple.extensiblesso` |
| Registration Token | `{{DEVICEREGISTRATION}}` (literal, both sets of braces, exact case) |
| Auth Method key value — SE | `UserSecureEnclaveKey` |
| Auth Method key value — Password | `Password` |
| Auth Method key value — Smart Card | `SmartCard` |
| FileVault Policy key value | `AttemptAuthentication` |
| Token-to-User Mapping (Account Name) | `com.apple.PlatformSSO.AccountShortName` (recommended) or `preferred_username` |
| Token-to-User Mapping (Full Name) | `name` |
| Touch ID biometric Extension Data key | `enable_se_key_biometric_policy` (Boolean, value: `true`) |
| Platform Credential AAGUID (passkey) | `7FD635B3-2EF9-4542-8D9D-164F2C771EFC` |

### Version Floors (All HIGH Confidence)

[VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos + learn.microsoft.com/en-us/entra/identity/devices/macos-psso, both verified 2026-06-21]

| Component | Version | What it gates |
|-----------|---------|---------------|
| macOS (absolute floor) | 13.0 Ventura | PSSO framework; SE key + Password methods only; Smart Card NOT supported |
| macOS (recommended floor) | 14.0 Sonoma | All three auth methods; NUAL; non-deprecated Settings Catalog key |
| macOS (FileVaultPolicy) | 15.0 Sequoia | `FileVaultPolicy = AttemptAuthentication` — Entra password at FileVault boot screen (Password method only) |
| macOS (15.0–15.2 bug) | 15.3 | Re-registration loop bug fixed; recommend 15.3+ for Sequoia fleets |
| macOS (Touch ID biometric policy) | 14.6 | `UserSecureEnclaveKeyBiometricPolicy` |
| macOS (NUAL / on-demand account creation) | 14.0 | `Enable Create User At Login` + `New User Authorization Mode` |
| Company Portal (standard PSSO) | 5.2404.0 | PSSO support introduced |
| Company Portal (Touch ID biometric policy) | 2504 | `enable_se_key_biometric_policy` |
| Company Portal (ADE enrollment PSSO) | 5.2604.0 | PSSO during ADE/Setup Assistant |

---

## Package Legitimacy Audit

Not applicable. This phase installs no external packages. It authors one new Markdown file and edits one existing Markdown file.

---

## Architecture Patterns

### Corpus Front Matter Pattern

[VERIFIED: direct file inspection of `docs/admin-setup-macos/07-platform-sso-setup.md` and `docs/admin-setup-macos/02-enrollment-profile.md`]

```yaml
---
last_verified: 2026-06-21
review_by: 2026-09-21
applies_to: ADE
audience: admin
platform: macOS
---
```

The `applies_to: ADE` field is corpus-standard for this guide series. The 90-day `review_by` date (DS-2) must be set on creation; guide 08 carries rapidly-changing facts (CP version floors, Touch ID macOS gate) that warrant this annotation.

### Platform Gate Banner (corpus-standard, from 07)

```markdown
> **Platform gate:** This guide covers macOS Platform SSO authentication methods.
> For the Platform SSO setup walk-through, see [Platform SSO Setup](07-platform-sso-setup.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).
```

### A3 Hybrid Document Structure

[VERIFIED: 77-CONTEXT.md D-01; direct inspection of 07-platform-sso-setup.md and 02-enrollment-profile.md for corpus skeleton tail conventions]

```
# macOS Platform SSO: Auth Method Selection & Deep-Dive

[front matter]
[platform gate banner]

## [Auth Method Comparison/Selection] (SC1 — four-dimension table, decision-first)

## Secure Enclave Key Method (PSSO-06)
### [What the Secure Enclave Key Is and Is Not] (CD-2 mandate)
### [FileVault and the Secure Enclave Key] (DF-6 / C3 canonical location)
### Touch ID Biometric Policy (PSSO-09)
### [Passkey / FIDO2 from the Platform Credential] (PSSO-10)

## Password Sync Method (PSSO-07)

## Smart Card Method (PSSO-08)

## [New User At Login Window / NUAL] (PSSO-11, conceptual only)

## Common Misconceptions (D3 consolidated myth/fact box — CD-3)

## Configuration-Caused Failures (A3 corpus tail — hub compatibility)

## See Also (A3 corpus tail)

---
[Version History table]
```

Notes on structure:
- "Advanced sections" (Touch ID, Passkey/FIDO2) are subsections of the SE section per D1=A and D2=A.
- NUAL is a separate section per D3=B (conceptual only; `NewUserAuthorizationMode` key omitted).
- `## Configuration-Caused Failures` must use the same table shape as `06-config-failures.md` and `07-platform-sso-setup.md` (columns: Misconfiguration | Portal | Symptom | Runbook). Runbook column values use code-span filenames (e.g., `` `35-macos-sso-sign-in-failure.md` ``) not live links until Phase 80 creates them.
- `## See Also` must link back to `07-platform-sso-setup.md` (CONTEXT.md ROADMAP:451 depends-on). Also links to Phase-75 glossary anchors. DO NOT create a live link to `09-enterprise-sso-plugin-migration.md` (Phase 78 not yet authored — use code-span only per C13 mechanism).

### Version History Table

[VERIFIED: direct inspection of 02-enrollment-profile.md and 00-overview.md]

```markdown
| Date | Change | Author |
|------|--------|--------|
| 2026-06-21 | Phase 77: initial version — auth method selection table and three-method deep-dive (PSSO-05..11) | -- |
```

### 00-overview.md Edit — Atomic Line 47 Conversion

[VERIFIED: direct inspection of 00-overview.md line 47]

Current line 47 content (code-span):
```
8. `08-auth-methods-deep-dive.md` (added in a later documentation phase)
```

Required replacement (live link):
```
8. **[Auth Methods Deep-Dive](08-auth-methods-deep-dive.md)** — Selection guide and deep-dive reference for all three Platform SSO authentication methods (Secure Enclave key [recommended], Password sync, Smart card) with FileVault interaction, dangerous misconceptions, Touch ID biometric policy, and Passkey/FIDO2 from the Platform Credential.
```

This edit MUST land in the same commit that creates guide 08. The v1.8 C13 gate hard-asserts `allowlist.length === 15` — adding a live internal link to a not-yet-existing target before guide 08 exists would add a broken link not in the allowlist and fail C13. The atomicity is the fix.

Also add a Version History row to `00-overview.md` for this edit.

---

## Per-Method Technical Fact Sheets

### Secure Enclave Key Method Facts

[VERIFIED: learn.microsoft.com/en-us/entra/identity/devices/macos-psso updated 2026-06-15; learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos updated 2026-05-18; Apple Secure Enclave hardware docs]

**Non-negotiable documentation anchors (SC2/PSSO-06 requirements):**

1. The private key NEVER leaves the Secure Enclave — cannot be exported, backed up, or copied. [VERIFIED: Apple Platform Security Guide; Entra PSSO overview]
2. The key is hardware-bound to the specific Mac AND to the specific user account on that Mac. [VERIFIED: Entra PSSO overview]
3. The key generates a hardware-bound Primary Refresh Token (PRT) for device-wide app and browser SSO. [VERIFIED: Entra PSSO overview; Intune Platform SSO guide]
4. **FileVault does NOT use the Secure Enclave key.** FileVault uses the local macOS account password as its disk encryption key at cold boot. The SE key and FileVault are parallel mechanisms, not interdependent. [VERIFIED: Intune Platform SSO guide — "This behavior is by design due to Apple's FileVault disk encryption, which uses the local password as the unlock key"] The C3 canonical statement lives in the SE section and is cross-referenced from the Password sync section and the misconception box.
5. **MDM-driven or FileVault-recovery password reset destroys the derived Secure Enclave key.** The device must re-register PSSO. Any password reset that bypasses the interactive macOS password-change UI (MDM-driven reset, FileVault recovery key use) severs the binding. This is expected behavior, not a bug. [VERIFIED: PITFALLS.md DF-2; Intune troubleshooting guide]
6. From August 2025, all new Entra device registrations store the WPJ certificate in the Secure Enclave (not Login Keychain). `security find-certificate` returns false negatives for SE-stored keys. Use `app-sso platform -s` to verify. [VERIFIED: SUMMARY.md fact anchor #7; Entra overview updated 2026-06-15]

**Hardware scope:** [VERIFIED: Apple T2 Security Chip list; Glossary SE entry — Phase 75]
- All Apple Silicon Macs (M1, M2, M3, M4+, 2020 and later)
- Intel Macs with Apple T2 Security Chip: MacBook Pro 2018–2020, MacBook Air 2018–2020, Mac mini 2018, iMac 2020, Mac Pro 2019
- Pre-2018 Intel Macs WITHOUT T2: Secure Enclave auth method WILL FAIL to provision. Recommend fallback to Password sync.

**Settings Catalog key value:** `UserSecureEnclaveKey` (macOS 14+); also `Authentication Method (Deprecated)` = `UserSecureEnclaveKey` for macOS 13 mixed-fleet. [VERIFIED: Intune guide]

**FileVault canonical statement for C3:**
> "FileVault uses the local macOS account password as its disk encryption key at cold boot; the Secure Enclave PSSO key is a parallel mechanism, not a replacement — Touch ID and SSO operate only after the disk is unlocked. After a cold reboot, the user must enter the local account password at the FileVault screen before Touch ID becomes available."

**Touch ID timing nuance (per-method detail, not misconception box):**
After cold boot, the user enters local password at the FileVault screen → disk unlocks → macOS loads → login window appears → Touch ID becomes available. Touch ID is NOT available at the FileVault pre-boot screen.

---

### Touch ID Biometric Policy Facts (PSSO-09)

[VERIFIED: learn.microsoft.com/en-us/entra/identity/devices/macos-psso, section "Microsoft Platform SSO: UserSecureEnclaveKeyBiometricPolicy", updated 2026-06-15]

| Property | Value |
|----------|-------|
| Settings Catalog delivery mechanism | `Extension Data` key-value pair in the existing Platform SSO Settings Catalog policy |
| MDM key name | `enable_se_key_biometric_policy` |
| MDM key type | Boolean |
| MDM key value to enable | `true` |
| Apple macOS API name | `UserSecureEnclaveKeyBiometricPolicy` |
| Minimum macOS version | macOS 14.6 |
| Minimum Company Portal version | 2504 |

**No-password-fallback lockout (CRITICAL WARNING — PSSO-09 requirement):**
> "There's no option for password fallback while authenticating with User Secure Enclave Key when UserSecureEnclaveKeyBiometricPolicy is enabled. Therefore, users won't be able to authenticate to Microsoft Entra ID if they don't have Touch ID biometrics available." — [VERBATIM: official Entra docs]

**Re-registration requirement:**
> "If this feature is enabled after PSSO registration is completed, all users will need to undergo a full PSSO re-registration process for the policy to take effect. This re-registration process must be admin-driven, as users won't see a re-registration prompt." — [VERBATIM: official Entra docs]

Implication for guide 08: the point-of-use D3 callout in the Touch ID subsection must include both the lockout warning AND the admin-driven re-registration requirement. Admins enabling this policy post-deployment need to orchestrate re-registration across the fleet.

---

### Password Sync Method Facts (PSSO-07)

[VERIFIED: Intune Platform SSO guide; PITFALLS.md DF-3, DF-7; SUMMARY.md]

1. **What syncs:** The Microsoft Entra ID password becomes (and stays in sync with) the local macOS account password. The local password is NOT removed — it is set equal to the Entra password. [VERIFIED: Intune guide — "The Microsoft Entra ID password replaces the local account password, and the two passwords stay in sync"]
2. **FileVault implication:** For the Password sync method, the local password equals the Entra password, so there is ONE password that unlocks both FileVault and Entra. This is the C3 cross-reference nuance for Password sync: the user types one password at the FileVault screen, which IS their Entra password. [VERIFIED: PITFALLS.md DF-6 line 172]
3. **Sync timing:** ~4-hour sync window for password propagation from Entra to the local macOS account. (Note: this is from research; precise Microsoft Learn statement on timing is MEDIUM confidence.) [ASSUMED — not found verbatim in the fetched docs; PITFALLS.md and SUMMARY.md agree on ~4 hours]
4. **Complexity-mismatch failure:** If the Entra password complexity policy and the macOS local account password policy do not match, password sync fails. [VERIFIED: REQUIREMENTS.md PSSO-07; Intune guide note on password policy matching]
5. **macOS 15+ FileVaultPolicy:** `FileVaultPolicy = AttemptAuthentication` — enables the device to verify the Entra password with Entra at the FileVault unlock screen when a Mac is turned on. This setting applies to macOS 15 and later and is only meaningful for the Password method. [VERIFIED: Intune guide — "Applies when you select Password for the Authentication Method setting"]
6. **Per-user MFA blocker (DF-3):** Legacy per-user MFA (set in legacy Azure AD per-user MFA, NOT Conditional Access) silently blocks Password sync PSSO registration. No error is shown; the flow stalls. Resolution: disable per-user MFA for target users and use Conditional Access MFA policy instead. [VERIFIED: guide 07 existing content; PITFALLS.md DF-3]
7. **AD-bound (mobile) account limitation (DF-7):** Devices where the macOS user account was created by Active Directory binding (AD mobile account) silently fail Password sync registration. The PSSO password synchronization API expects a standard macOS local account. Recommend SE key method for orgs transitioning away from AD binding. [VERIFIED: Apple Developer Forums; PITFALLS.md DF-7]
8. **Settings Catalog key value:** `Password` (macOS 13 and 14+). [VERIFIED: Intune guide]
9. **MFA not mandatory at setup:** Unlike SE key and Smart Card, MFA is not mandatory for Password sync setup. [VERIFIED: Intune comparison table — "MFA mandatory for setup: Password = No"]

---

### Smart Card Method Facts (PSSO-08)

[VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos updated 2026-05-18; learn.microsoft.com/en-us/entra/identity/devices/macos-psso updated 2026-06-15; PITFALLS.md DF-11]

1. **macOS version gate:** Smart Card method is NOT supported on macOS 13. macOS 14+ required. In a mixed 13/14 fleet, the deprecated `Authentication Method (Deprecated)` field does NOT support `SmartCard` — only the `Platform SSO > Authentication Method` (macOS 14+) field accepts `SmartCard`. [VERIFIED: Intune guide comparison table + Step 2 table]
2. **Not available during Setup Assistant:** Smart Card PSSO registration cannot complete during ADE/Setup Assistant. The official Entra PSSO overview states: "Authenticating with Smart Card in Setup Assistant is not supported. If you want to use Smart Card as the authentication method, you must complete PSSO registration after Setup Assistant is completed." [VERIFIED: learn.microsoft.com/en-us/entra/identity/devices/macos-psso — "Authenticating with Smart Card in Setup Assistant is not supported"]
3. **Entra CBA is a hard prerequisite.** Smart card PSSO silently fails if Entra CBA is not pre-configured in the Entra tenant. See distilled Entra CBA admin steps below. [VERIFIED: PITFALLS.md DF-11; Intune guide CBA reference]
4. **Settings Catalog key value:** `SmartCard` (macOS 14+ only). [VERIFIED: Intune guide]
5. **Passwordless and phishing-resistant:** Yes on both. [VERIFIED: Intune comparison table]
6. **Hardware:** External smart card or smart-card-compatible hard token (e.g., YubiKey). Local password unchanged. [VERIFIED: Entra PSSO overview]
7. **sc_auth pairing:** [ASSUMED — not confirmed from the fetched docs in this session; PITFALLS.md DF-11 references `sc_auth pairing` but the exact command was not reproduced in the fetched Microsoft Learn pages. The planner should note this as a point needing verification — either from Apple's `man sc_auth` or a supplementary Microsoft/Apple doc fetch.] The general concept: smart card certificates must be paired with the local macOS user account via `sc_auth`. Guide 08 should reference this as a prerequisite pairing step and link to Apple documentation for the exact command.

---

## Entra CBA Admin Prerequisites — Distilled for Smart Card Section

[VERIFIED: learn.microsoft.com/en-us/entra/identity/authentication/how-to-certificate-based-authentication, updated 2026-06-15]

Guide 08's Smart Card section must open with a hard prerequisite callout stating that **Entra ID Certificate-Based Authentication (CBA) must be configured in the Entra tenant before Smart Card Platform SSO will function.** This is a SEPARATE Entra admin task from the Intune Settings Catalog policy.

### What CBA Is

Entra CBA allows Entra ID to authenticate users via X.509 client certificates issued from a trusted enterprise PKI. For Platform SSO Smart Card, the smart card certificate is the X.509 client certificate. Without CBA, smart card PSSO registration fails silently.

### Five Admin Steps (Summary for Guide 08's Prerequisite Callout)

Guide 08 does NOT need to reproduce the full CBA walk-through. It must accurately describe what must have been done first:

**Step 1 — Configure trusted CA certificates in Entra:**
- Role required: **Privileged Authentication Administrator**
- Navigation: Entra admin center > **Entra ID** > **Identity Secure Score** > **Public key infrastructure**
- Action: Create a PKI container, upload root CA and intermediate CA certificate files (.cer or .p7b), configure CRL URL for each CA
- Note: The PKI-based trust store (preferred) supports up to 250 CAs. Upload is asynchronous, can take up to 30 minutes.

**Step 2 — Enable CBA for target users:**
- Role required: **Authentication Policy Administrator**
- Navigation: Entra admin center > **Entra ID** > **Authentication methods** > **Certificate-based authentication**
- Action: Enable CBA, select specific security groups containing the users who will use smart card PSSO (do NOT enable for All Users — see CBA lockout risk below)
- Warning: A user enabled for CBA who lacks a valid certificate is considered MFA-capable and cannot register other MFA methods — they would be locked out if they cannot present a certificate.

**Step 3 — Configure authentication binding policy:**
- Role required: **Authentication Policy Administrator**
- Navigation: Same pane > **Configure**
- Action: Set default protection level (Single-factor or MFA — for smart card PSSO the protection level should be set to MFA to satisfy phishing-resistant MFA Conditional Access policies). Optionally create custom rules scoped by certificate issuer or policy OID.

**Step 4 — Configure username binding policy (X.509 attribute → Entra user attribute):**
- Role required: **Authentication Policy Administrator**
- Navigation: Same Configure pane > Username binding
- Action: Map a certificate field to a user attribute. Default mapping: `PrincipalName` (certificate SAN) → `userPrincipalName` (Entra user object). Custom mappings also supported (e.g., `RFC822Name` → `userPrincipalName`, or `IssuerAndSerialNumber` → `certificateUserIds`).
- Note: For orgs syncing from on-premises AD, alternative security IDs (AltSecId) can be synced via Entra Connect to populate `certificateUserIds`.

**Step 5 — Verify CBA works before deploying Smart Card PSSO profile:**
- Test by signing in to MyApps portal (myapps.microsoft.com) with the smart card certificate on a test device in the target browser (Edge, Safari, or Firefox on macOS).
- Confirm certificate picker appears and authentication succeeds.
- Only after CBA is confirmed working should the Smart Card PSSO Settings Catalog profile be deployed.

### Authoritative Source

[VERIFIED: learn.microsoft.com/en-us/entra/identity/authentication/how-to-certificate-based-authentication]

Guide 08 Smart Card section should reference: `https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-certificate-based-authentication` as the authoritative CBA configuration guide.

### CBA Recovery Cost Note (for callout severity)

From PITFALLS.md: "Configure and verify Entra CBA (upload CA certificates, set authentication strength policy) before deploying smart card PSSO — this requires Entra Global Admin [actually Privileged Authentication Administrator] and is a multi-day provisioning process for the Entra side alone." Recovery if skipped: HIGH cost — CBA cannot be retroactively configured quickly; the Entra CBA setup itself (PKI upload, policy creation, verification) is a separate project-level task.

---

### Passkey / FIDO2 Facts (PSSO-10)

[VERIFIED: learn.microsoft.com/en-us/entra/identity/devices/macos-psso updated 2026-06-15]

1. **Platform Credential as passkey:** The Secure Enclave Platform Credential can be used as a passkey (WebAuthn/FIDO2) in supported browsers via WebAuthn APIs. [VERIFIED: Entra PSSO overview — "In web browsers, this PRT key can be used as a passkey using WebAuthN APIs"]
2. **AAGUID:** `7FD635B3-2EF9-4542-8D9D-164F2C771EFC` — the AAGUID for the macOS Platform Credential. [VERIFIED: Entra PSSO overview — exact quote: "If you use key restrictions in your FIDO policy, then you need to add the AAGUID for the macOS Platform Credential to your list of allowed AAGUIDs: 7FD635B3-2EF9-4542-8D9D-164F2C771EFC"]
3. **AAGUID is conditional:** The AAGUID allowlist is only required when the organization has FIDO2 key restrictions enabled in their Entra FIDO2 Authentication Method policy. Orgs without key restrictions do not need to configure this. Guide 08 should note this as a conditional requirement. [VERIFIED: Entra PSSO overview — "If you use key restrictions in your FIDO policy, then you need to add..."]
4. **Entra authentication-methods enablement:** FIDO2 (passkey) must be enabled in Entra ID Authentication Methods > FIDO2 security key for the Platform Credential passkey to function. This is an Entra admin task. [VERIFIED: Entra PSSO overview links to FIDO2 authentication method docs]
5. **End-user self-enablement:** Users can configure and use the Platform Credential as a passkey in supported browsers (Edge, Chrome with SSO extension, Safari, Firefox with MicrosoftEntraSSO policy) without additional MDM configuration beyond the base PSSO policy. [VERIFIED: Intune PSSO guide — browser support table]
6. **Smart Card does NOT support passkey use.** [VERIFIED: Intune comparison table — "Can be used as passkey: Smart Card = No"]

---

### NUAL (New User At Login Window) Facts (PSSO-11)

[VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-scenarios-macos, updated 2026-05-13; Intune Platform SSO guide]

1. **macOS version:** macOS 14+ required for NUAL (on-demand account creation at the login window). [VERIFIED: REQUIREMENTS.md PSSO-11; Intune guide]
2. **Shared Device Keys:** NUAL is enabled by configuring `Platform SSO > Use Shared Device Keys` = Enabled in the Settings Catalog policy. [VERIFIED: Intune guide — "Optionally, allow new users to log in with Entra ID credentials (macOS 14.x+)" tied to Shared Device Keys]
3. **AccountShortName mapping:** The `Platform SSO > Token To User Mapping > Account Name` = `com.apple.PlatformSSO.AccountShortName` setting determines how the new macOS account's short name is derived from the Entra identity. [VERIFIED: Intune guide — "For Platform SSO during Automated Device Enrollment, set the key value to com.apple.PlatformSSO.AccountShortName to use the UPN prefix"]
4. **Settings Catalog settings for NUAL:** [VERIFIED: Intune Platform SSO scenarios page, updated 2026-05-13]
   - `Enable Create User At Login` — Boolean — Allow any organizational user to sign in to the device using their Entra credentials; creates a new local account on first login.
   - `New User Authorization Mode` — enum (Standard | Admin | Groups) — One-time permissions the user has at sign-in when the account is first created. Currently, Standard and Admin values are supported. [NOTE: This is the Settings Catalog UI display name; the underlying MDM payload key name was not confirmed in this session — per PSSO-11/D3=B, omit the key literal from guide 08.]
   - `User Authorization Mode` — enum (Standard | Admin | Groups) — Persistent permissions the user has at each subsequent PSSO sign-in.
5. **NewUserAuthorizationMode key name status:** The Settings Catalog scenarios page shows the display name as "New User Authorization Mode" with values Standard/Admin/Groups. The underlying MDM plist key name was NOT confirmed from an authoritative schema source in this session. Per PSSO-11, omit the MDM key literal from guide 08 and record in DEFERRED-CLEANUP. [ASSUMED — see Assumptions Log A1]

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Entra CBA admin steps | Do not reproduce the full CBA guide in 08 | Reference `learn.microsoft.com/en-us/entra/identity/authentication/how-to-certificate-based-authentication` | CBA is a multi-step, multi-role Entra admin process; guide 08 must accurately describe what is required as a prerequisite and link out |
| FileVault interaction explanation | Do not invent/paraphrase the "why" from scratch | Quote from official source or cite Intune Platform SSO guide explanation | The "by design due to Apple's FileVault disk encryption" language is verbatim from official Microsoft Learn |
| Comparison table | Do not lift SUMMARY.md draft table verbatim | Build from SC1's four locked dimensions using verified per-method facts | SUMMARY draft has ~10 rows and does NOT match SC1's four-dimension contract (B1/D-04) |
| Touch ID warning language | Do not soften or editorialize the no-fallback warning | Reproduce the exact warning from official Entra docs | This is a safety-critical fact; verbatim from official source is safest |

---

## Common Pitfalls

### Pitfall 1: FileVault misconception — "PSSO makes local password unnecessary"

**What goes wrong:** Documentation or admin communications call PSSO "fully passwordless" without the cold-boot caveat. Users on SE key method expect no password at all; after a firmware update or reboot they see the FileVault password prompt and report the feature "broke."

**Why it happens:** Conflation of "passwordless at the macOS login window" (true for SE key after disk is unlocked) with "no local password needed at all" (false — FileVault pre-boot always requires local password).

**How to avoid (D3 requirement):** The consolidated misconception box must contain this myth-vs-fact row. The SE section's FileVault sub-section (C3 canonical location) must state it explicitly. The Password-sync section cross-references the same sub-section rather than restating it.

**Key fact anchor:** "FileVault uses the local macOS account password as its disk encryption key at cold boot; the Secure Enclave PSSO key is a parallel mechanism, not a replacement."

---

### Pitfall 2: MDM/recovery password reset destroys the Secure Enclave key (DF-2)

**What goes wrong:** Helpdesk performs MDM-driven password reset; user's PSSO stops working; re-registration required. Docs that don't surface this at the SE method section generate L2 tickets.

**Why it happens:** MDM-driven reset and FileVault recovery key use bypass the interactive macOS password-change UI that would normally update the SE key's binding. The key becomes inaccessible.

**How to avoid:** State explicitly in the SE section that any password reset bypassing the interactive UI (MDM-driven reset, FileVault recovery key) destroys the SE key and requires re-registration. This is expected behavior, not a bug.

---

### Pitfall 3: Smart Card PSSO silent failure without Entra CBA (DF-11)

**What goes wrong:** Admin configures `SmartCard` in Settings Catalog PSSO policy. Policy deploys successfully. Smart card is physically present. Registration fails silently or with a cryptic error. Root cause: CBA not pre-configured in Entra.

**Why it happens:** Smart card PSSO is layered on Entra CBA. The Settings Catalog policy alone does not provision the Entra side.

**How to avoid:** The Smart Card section MUST open with a hard prerequisite callout stating CBA must be configured first (see Entra CBA steps above). This callout should appear BEFORE any Settings Catalog configuration steps.

---

### Pitfall 4: Touch ID no-password-fallback lockout (PSSO-09)

**What goes wrong:** Admin enables `enable_se_key_biometric_policy`. A user's device lacks Touch ID support (external keyboard without Touch ID, Touch ID hardware failure). User cannot authenticate to Entra ID via PSSO at all — no password fallback path.

**Why it happens:** The biometric policy mandates Touch ID for SE key access with no fallback by design.

**How to avoid:** The Touch ID subsection must carry the no-password-fallback warning prominently. Admin should ensure all target devices support Touch ID before enabling the policy. The D3 misconception box should reference this danger.

---

### Pitfall 5: Changing auth method triggers fleet-wide re-registration (DF-12)

**What goes wrong:** Admin changes `Platform SSO > Authentication Method` from Password to SE key in an existing production PSSO policy. All previously-registered users receive re-registration prompts simultaneously; helpdesk is flooded.

**Why it happens:** Changing the `Authentication Method` or `Use Shared Device Keys` settings in an existing policy triggers Entra re-registration for all targeted devices.

**How to avoid:** The guide should note this in the method sections (especially Password and SE key) with a callout recommending pilot testing before changing auth method in production.

---

### Pitfall 6: AAGUID listed unconditionally (PSSO-10)

**What goes wrong:** Guide states "configure AAGUID `7FD635B3-2EF9-4542-8D9D-164F2C771EFC`" without the conditional note. Admins without FIDO2 key restrictions configured think they must add the AAGUID to an allowlist that doesn't exist in their tenant.

**Why it happens:** AAGUID allowlists only apply when FIDO2 key restrictions are enabled. Most tenants don't have this.

**How to avoid:** State clearly: the AAGUID is only required when the organization has FIDO2 key restrictions enabled in the Entra FIDO2 Authentication Method policy.

---

## Code Examples

### Selection Table (four-dimension SC1 format)

```markdown
| | Secure Enclave Key | Password Sync | Smart Card |
|--|-------------------|---------------|-----------|
| **Microsoft recommendation** | **Recommended** | Second choice | Third choice |
| **Passwordless** | Yes | No | Yes |
| **Phishing-resistant** | Yes | No | Yes |
| **Hardware required** | Yes — T2 Intel or Apple Silicon | No | No — external token |
| **macOS version gate** | macOS 13+ | macOS 13+ | macOS 14+ only |
```

Note: The exact prose surrounding the table (column headers, row labels, footnotes) is at executor discretion. The FOUR DIMENSIONS are locked. The "Microsoft recommendation" row is required by SC1 ("comparison table clearly marks Secure Enclave as Microsoft's recommendation").

### C3 FileVault Canonical Statement Location

State once in the SE section, then cross-reference from Password sync and misconception box. Pattern (hard-bordered callout):

```markdown
> **FileVault and Platform SSO — Cold-Boot Behavior**
>
> FileVault uses the **local macOS account password** as its disk encryption key. After any reboot,
> macOS presents the FileVault unlock screen and requires this local password — regardless of which
> Platform SSO authentication method is configured. Touch ID and SSO are only available after
> FileVault unlocks the disk and macOS loads the login window.
>
> The Secure Enclave PSSO key is a **parallel** mechanism to FileVault, not a replacement for it.
```

### D3 Consolidated Misconception Box (myth-vs-fact table seeding)

CD-3 rows from PITFALLS.md (verified HIGH confidence):

| Claim | Accurate? | Nuance |
|-------|-----------|--------|
| "No password needed after enrollment" | CONDITIONALLY TRUE | Only at the login window after FileVault disk is unlocked. Cold reboot requires local password at FileVault screen. |
| "Password sync removes the local password" | FALSE | Local password is NOT removed; it is set equal to the Entra password and is still required for FileVault. |
| "Secure Enclave key method means no password at all" | FALSE | Local account password still exists as SE key unlock factor and is required for FileVault. Users don't TYPE it in normal flows (Touch ID handles login window auth). |
| "PSSO satisfies phishing-resistant MFA for CA" | TRUE | SE key and Smart Card methods are treated as phishing-resistant MFA by Entra Conditional Access. Password sync is NOT phishing-resistant. |
| "Touch ID means no password is ever needed" | FALSE | Touch ID unavailable at FileVault pre-boot screen; only available at macOS login window post-unlock. |

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| WPJ certificate stored in Login Keychain | WPJ key stored in Secure Enclave by default | August 2025 (PSSO GA) | `security find-certificate` returns false negatives; use `app-sso platform -s` |
| Per-user MFA for tenant MFA enforcement | Conditional Access MFA policies | Pre-PSSO (long-standing recommendation) | Per-user MFA silently blocks Password sync PSSO registration |
| SSO app extension (Device Features template) | Platform SSO Settings Catalog policy | PSSO GA August 2025 | Running both simultaneously = Error 10002; migration required |
| macOS 13 `Authentication Method (Deprecated)` field | macOS 14+ `Platform SSO > Authentication Method` | macOS 14 release | Both must be in same policy for mixed 13/14 fleets; Smart Card only in 14+ field |
| Classic CBA CA trust store | PKI-based trust store (preferred) | Entra CBA enhancement | Supports up to 250 CAs vs classic limit; new features including issuer hints |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `NewUserAuthorizationMode` MDM plist key literal omitted per D3=B/PSSO-11. Official Intune docs show display name "New User Authorization Mode" with values Standard/Admin/Groups — underlying MDM key name not confirmed from schema. | NUAL Facts | LOW — the decision to omit is LOCKED per PSSO-11. Risk is zero: guide 08 does not use the key literal. Deferred to PSSO-FUT-01. |
| A2 | Password sync ~4-hour propagation timing. PITFALLS.md and SUMMARY.md agree on ~4 hours but this was not found verbatim in the fetched Intune/Entra docs. | Password Sync Facts | MEDIUM — if timing is wrong, the guide's description of the sync window is inaccurate. The planner may want to add a `last_verified` annotation on the specific timing claim and a note that the exact timing should be confirmed with the Microsoft Learn Platform SSO guide or troubleshooting guide. |
| A3 | `sc_auth` pairing command for Smart Card. Confirmed as the standard Apple macOS smart card pairing command from general knowledge; REQUIREMENTS.md and PITFALLS.md reference it, but the exact `sc_auth` command was not reproduced in the fetched Microsoft Learn pages for Platform SSO. | Smart Card Facts | MEDIUM — if `sc_auth` is not the right command or the pairing flow differs for PSSO-specific Smart Card, the guide's prerequisite steps would be inaccurate. Planner should add a verification step: confirm `sc_auth` pairing steps from Apple Platform Deployment documentation or an additional Microsoft Learn fetch of the Smart Card PSSO user registration flow. |

**If this table is empty (except for the three entries above):** All other claims in this research were VERIFIED from official Microsoft Learn docs fetched in this session (updated dates confirmed) or from direct file inspection of the corpus.

---

## Open Questions

1. **`sc_auth` exact command and pairing flow for Smart Card PSSO**
   - What we know: `sc_auth pairing` is referenced in REQUIREMENTS.md and PITFALLS.md. Smart card must be paired with the local macOS user account before or during PSSO registration.
   - What's unclear: The exact `sc_auth` command arguments, whether pairing is manual vs MDM-scriptable, and whether the Platform SSO Smart Card flow has Apple-specific pairing documentation.
   - Recommendation: Add a plan task to fetch `https://support.apple.com/guide/deployment/` smart-card-related pages or `https://learn.microsoft.com/en-us/entra/identity/authentication/concept-certificate-based-authentication-mobile-ios` macOS section more carefully. Alternatively: note in guide 08 that `sc_auth pairing` is a macOS-native prerequisite and link to Apple deployment documentation.

2. **Password sync exact timing window**
   - What we know: ~4 hours is stated in pre-existing research (PITFALLS.md, SUMMARY.md).
   - What's unclear: This timing was not confirmed from the fetched official Intune/Entra docs in this session.
   - Recommendation: Add `last_verified: 2026-06-21` / `review_by: 2026-09-21` annotation on any statement about sync timing in guide 08, and consider flagging it as "approximately 4 hours (confirm current timing in [Microsoft Learn PSSO troubleshooting guide])".

---

## Environment Availability

Step 2.6: SKIPPED. This phase creates one new Markdown file and edits one existing Markdown file. No external tools, runtimes, databases, or CLI utilities beyond git are required.

---

## Validation Architecture

### Test Framework

Per `.planning/config.json` and CONTEXT.md: Phase 77 runs against the frozen v1.8 harness. There is no per-file structural validator for `docs/admin-setup-macos/`. The only live gate is **C13** (broken-link check). No separate test framework is needed for this documentation phase.

| Property | Value |
|----------|-------|
| Framework | v1.8-milestone-audit.mjs (frozen) |
| Config file | `scripts/validation/v1.8-milestone-audit.mjs` (frozen, inherited) |
| Quick run command | `node scripts/validation/v1.8-milestone-audit.mjs` |
| Full suite command | same |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PSSO-05..11 | Guide 08 content accuracy | Manual review | n/a | ❌ Wave 0 (create guide 08) |
| C13 gate | No broken internal links after 00-overview.md edit | Automated | `node scripts/validation/v1.8-milestone-audit.mjs` | ✅ |
| Atomic commit | 08 and 00-overview.md edit land together | Manual / git | `git diff HEAD --name-only` after commit | — |

### Sampling Rate

- **Per task commit:** `node scripts/validation/v1.8-milestone-audit.mjs` — must PASS (15/15) after the atomic commit that creates guide 08 and converts the 00-overview line 47 code-span to a live link.
- **Phase gate:** Same audit PASS before `/gsd-verify-work`.

### Wave 0 Gaps

- [ ] `docs/admin-setup-macos/08-auth-methods-deep-dive.md` — new file to create (the primary deliverable)
- [ ] `docs/admin-setup-macos/00-overview.md` line 47 — code-span to live link conversion (atomic with guide 08 creation)
- [ ] `docs/v1.9-DEFERRED-CLEANUP.md` — must record `NewUserAuthorizationMode` key omission (per PSSO-11 / D3=B)

---

## Security Domain

`security_enforcement` is not explicitly set in config; treating as enabled.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | Documentation only — describes authentication mechanisms, does not implement them | Document accurately per ASVS; no code |
| V5 Input Validation | No (documentation phase) | n/a |
| V6 Cryptography | Documentation only — Secure Enclave key non-exportability is a cryptography claim | Verify all cryptographic claims from official Apple/Microsoft sources (done) |

### Known Threat Patterns for Documentation

| Pattern | Risk | Mitigation |
|---------|------|-----------|
| Inaccurate security claim (e.g., "fully passwordless") | Admins misconfigure, enabling phishing attacks | D3 misconception box + C3 FileVault canonical statement; point-of-use callouts |
| Omitting CBA prerequisite for Smart Card | Silent failure; admin may weaken CA configuration to "fix" it | Hard prerequisite callout opening Smart Card section |
| Touch ID no-fallback not warned | Users locked out; potential access loss | PSSO-09 no-password-fallback warning in Touch ID subsection |

---

## Sources

### Primary (HIGH confidence — VERIFIED in this session)

- `learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos` (updated 2026-05-18) — Settings Catalog fields, version gates, auth method comparison table, FileVault interaction language, NUAL settings
- `learn.microsoft.com/en-us/entra/identity/devices/macos-psso` (updated 2026-06-15) — AAGUID `7FD635B3-2EF9-4542-8D9D-164F2C771EFC` (confirmed), UserSecureEnclaveKeyBiometricPolicy (confirmed + full warning text), Smart Card SA exclusion (verbatim), passwordless links
- `learn.microsoft.com/en-us/entra/identity/authentication/how-to-certificate-based-authentication` (updated 2026-06-15) — Full Entra CBA admin configuration walk-through: Step 1 PKI/CA upload, Step 2 enable CBA, Step 3 auth binding policy, Step 4 username binding policy, Step 5 test
- `learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-scenarios-macos` (updated 2026-05-13) — Touch ID `enable_se_key_biometric_policy` key confirmed, NUAL `Enable Create User At Login` + `New User Authorization Mode` display names confirmed
- Direct file inspection: `docs/admin-setup-macos/07-platform-sso-setup.md`, `docs/admin-setup-macos/00-overview.md` (line 47 confirmed), `docs/admin-setup-macos/02-enrollment-profile.md`, `docs/admin-setup-macos/06-config-failures.md`, `docs/_glossary-macos.md`
- `.planning/phases/77-auth-methods-deep-dive/77-CONTEXT.md` — locked structure decisions
- `.planning/REQUIREMENTS.md` — PSSO-05..11 requirement texts
- `scripts/validation/v1.8-milestone-audit.mjs` lines 660–679 — C13 `allowlist.length !== 15` assertion (confirmed)

### Secondary (MEDIUM confidence)

- `.planning/research/PITFALLS.md` — DF-2, DF-6, DF-7, DF-11, DF-12, CD-2, CD-3 (sourced from official docs + community; used for nuance and pitfall framing)
- `.planning/research/SUMMARY.md` — SE non-negotiable fact anchors, version floor table, per-method bullets

### Tertiary (for cross-reference/history — LOW weight)

- `learn.microsoft.com/en-us/entra/identity/authentication/concept-certificate-based-authentication-mobile-ios` (updated 2026-04-19) — iOS/macOS CBA concept page; confirms CBA overview but does not contain the admin configuration steps (those are in how-to-certificate-based-authentication)

---

## Metadata

**Confidence breakdown:**
- SE key facts: HIGH — verified from Entra PSSO overview + Intune guide (both updated June 2026)
- Password sync facts: HIGH (behavioral) / MEDIUM (exact 4-hour timing)
- Smart Card facts: HIGH (CBA prerequisite, macOS 14 gate, SA exclusion verbatim) / MEDIUM (sc_auth pairing exact command)
- Touch ID biometric policy: HIGH — verified verbatim from Entra PSSO overview including no-fallback warning
- Passkey/FIDO2 AAGUID: HIGH — confirmed verbatim from Entra PSSO overview
- NUAL: HIGH (behavior, macOS gate, display names) / LOW (underlying MDM key name omitted per PSSO-11)
- Entra CBA admin steps: HIGH — fetched from official how-to page updated 2026-06-15
- Corpus conventions (front matter, table shapes, Version History): HIGH — directly inspected

**Research date:** 2026-06-21
**Valid until:** 2026-09-21 (90-day PSSO cadence — DS-2)
