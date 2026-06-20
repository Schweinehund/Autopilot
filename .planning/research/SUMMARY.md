# Project Research Summary

**Project:** v1.9 macOS Platform SSO & Secure Enclave Authentication Documentation
**Domain:** Documentation milestone -- macOS enterprise authentication (Platform SSO, Secure Enclave, Enterprise SSO plug-in) via Microsoft Intune / Entra ID
**Researched:** 2026-06-20
**Confidence:** HIGH across all four research files -- primary sources are Microsoft Learn docs updated 2026-05-18 to 2026-06-15 and Apple Platform Security / Deployment guides current as of June 2026.

---

## Executive Summary

This is a pure documentation milestone that closes a ~2.5-year lag between the existing `docs/admin-setup-macos/` corpus and the current state of macOS enterprise authentication. Platform SSO reached general availability in August 2025 (macOS 13 framework, macOS 14 recommended, macOS 26 ADE-enrollment mode GA in May 2026), yet the suite's only coverage is a ~50-word stub in `03-configuration-profiles.md` that contains three factual errors. The gap is critical: admins deploying PSSO without docs will hit silent failures (Error 10001 on macOS 13 mixed-fleet, Error 10002 from legacy profile conflicts, per-user MFA blocking Password sync, Secure Enclave key loss after MDM password reset) that generate L1/L2 helpdesk volume with no runbook to route to.

The recommended documentation approach mirrors the pattern established across v1.2 through v1.6 for other platforms: admin setup guide first (for the click-path audience), then an auth-method deep-dive (for the architect/senior-admin audience), then a legacy/migration guide (for the mixed-fleet admin audience), then L1/L2 runbooks, then reference integration (capability matrix, glossary), then harness lineage bump. All four research files agree on this sequence -- there are no tensions in phase ordering. The three content files (STACK, FEATURES, PITFALLS) converge on the same phase-to-topic mapping, and the ARCHITECTURE file grounded every file-naming and cross-link decision in direct corpus inspection.

The single highest-risk documentation error is terminology confusion between the umbrella product ("Microsoft Enterprise SSO plug-in for Apple devices"), its modern sub-feature ("Platform SSO," configured via Settings Catalog), and its legacy sub-feature ("SSO app extension," configured via Device Features template). Using these terms interchangeably causes admins to configure the wrong surface, resulting in Error 10002 and SSO outages. Every v1.9 document must open with or reference a disambiguation that makes these three scopes explicit. The second-highest-risk area is the Secure Enclave + FileVault interaction: admins widely believe Platform SSO (Secure Enclave method) makes the local macOS password irrelevant, which is false -- FileVault continues to use the local password as its disk encryption key at cold boot.

---

## Key Findings

### Recommended Stack (from STACK.md)

v1.9 ships markdown documentation only. The "stack" is the Microsoft Intune / Entra ID / Apple platform configuration surface that all v1.9 docs must cite accurately.

**Product name hierarchy (must be enforced in all v1.9 docs):**

| Term | Scope | Config surface |
|------|-------|---------------|
| Microsoft Enterprise SSO plug-in for Apple devices | Umbrella product; delivered via Company Portal | N/A -- parent container |
| Platform SSO (PSSO) | Modern sub-feature (macOS 13+, recommended 14+); device-level Entra ID auth + SSO | Intune Settings Catalog ONLY |
| SSO app extension | Legacy sub-feature; app/browser SSO without OS-level login integration | Intune Device Features template (or auto-included with PSSO) |
| Kerberos SSO extension | DIFFERENT Apple-native extension; on-premises AD Kerberos only | Separate MDM payload; coexists with PSSO |

**Key identifiers (pin in all v1.9 docs):**
- Extension Identifier: `com.microsoft.CompanyPortalMac.ssoextension`
- Team Identifier: `UBF8T346G9`
- Registration Token: `{{DEVICEREGISTRATION}}` (literal string including braces)
- Apple payload type: `com.apple.extensiblesso`
- Platform Credential AAGUID (passkey): `7FD635B3-2EF9-4542-8D9D-164F2C771EFC`

**Version floors (all HIGH confidence):**

| Component | Version | What it unlocks |
|-----------|---------|-----------------|
| macOS (absolute floor) | 13.0 Ventura | Platform SSO framework; Secure Enclave + Password methods only |
| macOS (recommended floor) | 14.0 Sonoma | All three auth methods; non-deprecated Settings Catalog key; NUAL; Repair flow |
| macOS (FileVault Entra password) | 15.0 Sequoia | `FileVaultPolicy = AttemptAuthentication` -- Entra password at FileVault boot screen |
| macOS 15.3 | 15.3 | PSSO concurrency bug fixed (re-registration loops on 15.0-15.2 -- Apple confirmed) |
| macOS (ADE enrollment-time PSSO) | 26 (Tahoe) | `EnableRegistrationDuringSetup` -- PSSO during Setup Assistant |
| Company Portal (standard PSSO) | 5.2404.0 | Platform SSO support introduced |
| Company Portal (ADE enrollment PSSO) | 5.2604.0 | PSSO during ADE/Setup Assistant |
| Company Portal (Touch ID biometric policy) | 2504 | `enable_se_key_biometric_policy` |
| macOS (Touch ID biometric policy) | 14.6 | `UserSecureEnclaveKeyBiometricPolicy` |

**Licensing:** Platform SSO is included in all Microsoft Intune licensing plans. No Entra ID P1/P2 required for PSSO itself. Conditional Access integration (recommended complement) requires Entra ID P1+.

**Hybrid-join:** NOT supported. macOS PSSO requires Entra ID join (cloud-only). Microsoft has no plans to support hybrid join on macOS. Document as an explicit anti-feature.

**Three auth method comparison:**

| Dimension | Secure Enclave (recommended) | Password sync | Smart Card |
|-----------|------------------------------|--------------|------------|
| Passwordless | YES | NO | YES |
| Phishing-resistant MFA | YES | NO | YES |
| Can be used as passkey (WebAuthn) | YES | NO | NO |
| Local Mac password synced with Entra | NO (local password unchanged) | YES (Entra password replaces local) | NO (local password unchanged) |
| macOS 13 supported | YES | YES | NO |
| macOS 14+ supported | YES | YES | YES |
| Requires Secure Enclave hardware | YES (T2 Intel or Apple Silicon) | NO | NO (external hardware token) |
| Microsoft recommendation | RECOMMENDED | Second choice | Third choice |
| Settings Catalog key value (macOS 14+) | `UserSecureEnclaveKey` | `Password` | `SmartCard` |

**Secure Enclave hardware scope:** All Apple Silicon Macs (M1, M2, M3, M4+, 2020+) and T2-equipped Intel Macs (MacBook Pro 2018-2020, MacBook Air 2018-2020, Mac mini 2018, iMac 2020, Mac Pro 2019). Pre-2018 Intel Macs without T2 have no Secure Enclave -- Secure Enclave auth method will fail to provision on these.

**Secure Enclave key facts (non-negotiable documentation anchors):**
1. The private key NEVER leaves the Secure Enclave -- cannot be exported, backed up, or copied
2. The key is hardware-bound to the specific Mac AND to the specific user account on that Mac
3. The key generates a hardware-bound Primary Refresh Token (PRT) for device-wide app/browser SSO
4. The key can function as a passkey (WebAuthn/FIDO2) in supported browsers
5. FileVault does NOT use the Secure Enclave key -- FileVault uses the local macOS account password as its disk encryption key (parallel mechanisms, not interdependent)
6. Password reset that bypasses the interactive macOS password-change UI (MDM-driven reset, FileVault recovery) destroys the Secure Enclave key -- device must re-register PSSO
7. From August 2025, all new Entra device registrations store the WPJ certificate in the Secure Enclave (not Login Keychain) -- `security find-certificate` checks will return false negatives

---

### Expected Features (from FEATURES.md)

**Must have -- table stakes (Phases 75-76):**
- Platform SSO admin setup guide -- Settings Catalog paths, all required settings, macOS 13 vs 14+ field split, assignment to user groups (NOT device groups), Entra prerequisites, pre-flight checklist
- Auth method selection guide -- comparison table, decision criteria, Microsoft recommends Secure Enclave
- Secure Enclave method deep-dive -- what changes, what does NOT change (local password stays), Touch ID after first reboot, PRT for device-wide SSO, password-reset-destroys-SE-key warning, FileVault interaction
- Password sync method deep-dive -- what syncs, 4-hour sync window, complexity mismatch failure, temp password limitation, FileVaultPolicy setting (macOS 15+ only), per-user MFA blocker
- Registration flow (user perspective) -- per-method step-by-step; `app-sso platform -s` verification
- Company Portal role -- install (required) vs. sign-in (not required for ongoing SSO); version gate; Chrome native messaging issue
- L1 runbook -- "Registration required" notification not appearing (wait 10 min; sign out/in; Repair flow macOS 14+)
- Legacy Enterprise SSO plug-in -- what it is; what it does NOT do vs. PSSO; when to keep it
- Legacy-to-PSSO migration guide -- coexistence = Error 10002; staged migration sequence; what breaks; rollback procedure

**Should have -- differentiators (Phases 77-79):**
- Smart card method deep-dive -- Entra CBA prerequisites (separate Entra admin task), sc_auth pairing (manual/scripted), macOS 14+ gate, not available during Setup Assistant
- NUAL (on-demand account creation at login window) -- macOS 14+, Shared Device Keys, `com.apple.PlatformSSO.AccountShortName` mapping
- PSSO during ADE enrollment -- `EnableRegistrationDuringSetup`, macOS 26 + CP 5.2604.0, static groups only, Smart card excluded, wipe-to-fix if misconfigured
- L2 runbook -- PSSO registration failure investigation (sign-in logs, `app-sso platform -s`, sysdiagnose, TLS inspection exclusions)
- L2 runbook -- Password sync failures (complexity mismatch, per-user MFA, SSPR edge cases, AD-bound mobile accounts)
- Passkey/FIDO2 from Platform Credential -- enabling in Entra, AAGUID allowlist, user configuration
- Touch ID biometric policy -- macOS 14.6+ gate, no-fallback warning, admin-driven re-registration to enable

**Defer to v1.10+:**
- Hybrid Entra join PSSO (not supported -- document as anti-feature only in v1.9)
- Multi-tenant PSSO scenarios
- Graph API management of Platform Credential (`platformCredentialAuthenticationMethod` resource)
- Kerberos SSO deep-dive (cross-reference as optional PSSO scenario only)

---

### Architecture Approach (from ARCHITECTURE.md)

The existing documentation suite uses a hub-and-spoke architecture with function-tier layers (admin setup / lifecycle / runbooks / reference / nav hubs) connected by bidirectional cross-links. ARCHITECTURE.md was grounded in direct file inspection of the full existing corpus -- every naming decision is verified against actual files.

**New files to create:**
1. `docs/admin-setup-macos/07-platform-sso-setup.md` -- full admin setup guide (Settings Catalog paths, Entra prerequisites, registration flow, auth method selection)
2. `docs/admin-setup-macos/08-auth-methods-deep-dive.md` -- all three auth methods with architecture, prerequisites, UX, failure modes
3. `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` -- legacy SSO plug-in coverage, decision matrix, staged migration sequence
4. `docs/l1-runbooks/35-macos-sso-sign-in-failure.md` -- L1 registration/sign-in failure runbook
5. `docs/l1-runbooks/36-macos-secure-enclave-key.md` -- L1 Secure Enclave key verification runbook
6. `docs/l2-runbooks/27-macos-sso-investigation.md` -- L2 full PSSO investigation guide
7. `scripts/validation/v1.9-milestone-audit.mjs` + `v1.9-audit-allowlist.json` (Path-A from v1.8)
8. `scripts/validation/check-phase-75.mjs` through `check-phase-81.mjs` (one per phase)
9. `.github/workflows/audit-harness-v1.9-integrity.yml` (sixth parallel coexistence CI workflow)

**Existing files requiring surgical extension (append-only or targeted edits, not rewrites):**
- `docs/admin-setup-macos/03-configuration-profiles.md` -- replace inaccurate ~50-word stub (lines 157-168) with accurate 2-paragraph summary + link to 07
- `docs/admin-setup-macos/00-overview.md` -- extend Mermaid diagram and bullet list to include guides 07/08/09
- `docs/macos-lifecycle/00-ade-lifecycle.md` -- extend Stage 4/6/7 with SSO timing notes and Entra device registration
- `docs/_glossary-macos.md` -- add `## Authentication` section (Platform SSO, Secure Enclave, Enterprise SSO Plug-in entries with reciprocal see-also)
- `docs/_glossary.md` -- reciprocal see-also only
- `docs/reference/macos-capability-matrix.md` -- add `## Authentication` section with auth method rows
- `docs/reference/4-platform-capability-comparison.md` -- update macOS Platform SSO cell (link-not-copy)
- `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md` -- append-only macOS section extensions
- `docs/l1-runbooks/00-index.md`, `docs/l2-runbooks/00-index.md` -- append rows for new runbooks
- `scripts/validation/_lib/frozen-at-close.mjs` -- add V18 SHA entry + `readAtV18Close` export

**Critical cross-link edges (8 SSO-specific edges; potential C17 harness check):**
- SSO-E1: `07-platform-sso-setup.md` -> `_glossary-macos.md#platform-sso`
- SSO-E2: `_glossary-macos.md` -> `07-platform-sso-setup.md` (reciprocal see-also)
- SSO-E3: `07-platform-sso-setup.md` -> `macos-capability-matrix.md#authentication`
- SSO-E4: `macos-capability-matrix.md` -> `07-platform-sso-setup.md` (See Also)
- SSO-E5: `35-macos-sso-sign-in-failure.md` -> `27-macos-sso-investigation.md` (escalation)
- SSO-E6: `27-macos-sso-investigation.md` -> `35-macos-sso-sign-in-failure.md` (back-link)
- SSO-E7: `03-configuration-profiles.md` (Extensible SSO section) -> `07-platform-sso-setup.md`
- SSO-E8: `00-ade-lifecycle.md` (Stage 4) -> `07-platform-sso-setup.md`

Whether these become a named C17 blocking harness check (parallel to C16 for Apple Business content) is a Phase 81 gray-area decision. Invoke `/adversarial-review` at Phase 81 planning per user memory preference.

---

### Critical Pitfalls (from PITFALLS.md)

**Top 5 deployment failure modes (all HIGH confidence):**

1. **Registration prompt never appears despite Intune reporting "Succeeded"** (DF-1) -- Four root causes: (a) Company Portal older than 5.2404.0 -- silent failure; (b) legacy SSO app extension profile still active -- Error 10002; (c) `{{DEVICEREGISTRATION}}` Registration Token mis-typed or braces missing; (d) user dismissed the notification. Primary triage: `app-sso platform -s` on device, not Intune portal. Must appear in admin setup pre-flight checklist AND L1 runbook #35.

2. **Secure Enclave key destroyed by MDM password reset** (DF-2) -- Any password reset that bypasses the interactive macOS password-change UI (FileVault recovery, MDM-driven reset) destroys the derived Secure Enclave key. PSSO must be re-registered. This is expected behavior, not a bug. Document explicitly in auth-method deep-dive and L2 runbook.

3. **Error 10002 -- dual-profile coexistence** (DF-5/MG-1) -- Deploying the new Settings Catalog PSSO policy without unassigning the existing Device Features SSO app extension profile causes Error 10002; both stop working. Migration sequencing: assign PSSO to pilot -> validate -> THEN unassign legacy profile. Never leave both assigned simultaneously.

4. **Error 10001 -- macOS 13/14 mixed-fleet misconfiguration** (DF-4) -- In a mixed fleet, BOTH the deprecated `Authentication Method (Deprecated)` field (macOS 13) AND `Platform SSO > Authentication Method` (macOS 14+) must be configured in the SAME Settings Catalog policy. Configuring only the macOS 14+ field causes Error 10001 on macOS 13 devices.

5. **Per-user MFA blocks Password sync registration** (DF-3) -- Legacy per-user MFA (not CA MFA) causes Password sync PSSO registration to stall silently with no error. Must appear as step-1 prerequisite in admin setup guide, before any Settings Catalog steps.

**Additional high-priority pitfalls (by phase):**
- **DF-9 (Phase 75):** New device PSSO registration blocked by CA 'compliant device' requirement before PSSO has established device registration -- exclude new-enrollment devices from strict CA compliance during bootstrapping window
- **DF-10 (Phase 75):** Corporate TLS inspection on Microsoft login endpoints breaks PSSO token acquisition -- exempt PSSO endpoints from TLS break-and-inspect
- **DF-11 (Phase 76):** Smart card PSSO silently fails if Entra CBA is not pre-configured in the Entra tenant -- must be step-1 prerequisite in Smart card section
- **DF-12 (Phase 75/78):** Changing `Authentication Method` or `Use Shared Device Keys` in existing policy triggers fleet-wide re-registration -- pilot before changing method in production
- **DF-13 (Phase 75 ADE):** ADE PSSO during Setup Assistant requires all three policies on SAME STATIC groups -- dynamic groups = silent failure; wipe-to-fix only
- **MG-2 (Phase 78):** IT scripts using `security find-certificate` for WPJ verification return false negatives post-PSSO (WPJ in Secure Enclave since Q3 2025); replace with `app-sso platform -s`
- **MG-3 (Phase 78):** PSSO rollback leaves CA-blocked users with no Entra device registration -- rollback section in migration guide is mandatory, not deferrable
- **DS-5 (Phase 75):** Existing `03-configuration-profiles.md` stub (lines 157-168) has three factual errors -- replace as part of Phase 75

**Facts requiring `last_verified` / `review_by` front matter (90-day review cycle on ALL PSSO docs):**
- Auth method capability table (macOS 13 vs 14+ version gates; Smart card = macOS 14+ only)
- ADE during Setup Assistant section -- `last_verified: 2026-06-20`, `review_by: 2026-09-20`
- Company Portal version requirements (5.2404.0 and 5.2604.0)
- macOS 15.3 re-registration bug fix note (fixed -- do not write 'awaiting Apple fix')
- WPJ key storage in Secure Enclave (default from August 2025) -- any L2 verification commands using Keychain
- `NewUserAuthorizationMode` key name (confirm at Phase 76/77 authoring time -- see Gaps)

---

## Implications for Roadmap

All four research files converge on a 7-phase structure (Phases 75-81). There are NO tensions in phase ordering -- researcher agreement is unanimous. Dependencies are clear and grounded in both technical prerequisites and existing corpus architecture.

### Phase 75 -- Foundation: Glossary, Lifecycle Extensions, Admin Setup Core

**Rationale:** Glossary terms must pre-exist before admin guides link to them. The admin setup guide (07) is the highest-value deliverable and unblocks Phases 76-77. The existing inaccurate stub in `03-configuration-profiles.md` must be corrected in this same phase (three factual errors per DS-5). Per-user MFA blocker (DF-3) and Error 10001 (DF-4) must both be addressed in the admin setup prerequisites section.

**Delivers:** `_glossary-macos.md` (## Authentication section, 3 new entries), `_glossary.md` (reciprocal see-also), `00-ade-lifecycle.md` Stage 4/6/7 surgical extensions, `07-platform-sso-setup.md`, `00-overview.md` Mermaid + bullet list update, `03-configuration-profiles.md` stub corrected

**Addresses features:** Admin setup guide (P1), auth method selection (P1), Company Portal role (P1), Entra prerequisites (P1), ADE PSSO subsection (P2)

**Avoids pitfalls:** DF-3, DF-4, DF-5, DF-9, DF-10, DF-13, DS-5

**Research flag:** NO -- all facts HIGH confidence. Settings Catalog key names, version floors, Entra prerequisites all verified against current official docs.

---

### Phase 76 -- Admin Setup Depth: Auth Methods Deep-Dive

**Rationale:** References guide 07 (Phase 75). Serves the architect/senior-admin audience. Separating from 07 follows the single-responsibility pattern and allows index.md to link at appropriate granularity. Secure Enclave + FileVault interaction (DF-6, CD-2, CD-3) and password-reset-destroys-key (DF-2) are the two most common post-deployment misconceptions and must be documented explicitly here.

**Delivers:** `08-auth-methods-deep-dive.md` -- all three auth methods: Secure Enclave (hardware facts, non-exportable keys, FileVault non-relationship, passkey/FIDO2, Touch ID biometric policy option), Password sync (sync timing, complexity mismatch, temp-password limitation, macOS 15 FileVaultPolicy, AD-bound accounts), Smart card (Entra CBA prerequisite, sc_auth pairing, macOS 14+ gate, not during Setup Assistant)

**Addresses features:** Secure Enclave deep-dive (P1), Password sync deep-dive (P1), Smart card deep-dive (P2), NUAL (P2), PSSO during ADE (P2), Touch ID biometric policy (P3)

**Avoids pitfalls:** DF-2, DF-6, DF-7, DF-11, CD-1, CD-2, CD-3

**Research flag:** Smart card section needs `microsoft_docs_fetch` of Entra CBA configuration guide at Phase 76 authoring time -- research confirmed CBA is required but did not fully document the Entra admin configuration walk-through. See Gaps section.

---

### Phase 77 -- Legacy SSO Plug-in and Migration Guide

**Rationale:** References guide 07 (Phase 75). Serves the mixed-fleet admin. Staged migration sequence (pilot -> validate -> unassign legacy), rollback procedure, and pre-migration compliance-script checklist must be explicit. Rollback section is MANDATORY (MG-3 -- rolling back PSSO without this procedure leaves users CA-blocked).

**Delivers:** `09-enterprise-sso-plugin-migration.md` -- what legacy SSO app extension is and is not vs. PSSO, decision matrix (when to use each), staged migration sequence (steps 1-6), what breaks during migration (Chrome native messaging, Edge profile sign-in, macOS 12 silent failure), rollback procedure, Kerberos SSO coexistence (separate Extension Identifiers required)

**Addresses features:** Legacy SSO plug-in explanation (P1), migration guide (P1), Kerberos coexistence (P3)

**Avoids pitfalls:** DF-5/MG-1, MG-2, MG-3, MG-4, MG-5

**Research flag:** NO -- all findings HIGH confidence.

---

### Phase 78 -- Reference Integration: Capability Matrix and 5-Platform Comparison

**Rationale:** Matrix synthesizes facts from Phases 75-77. MANDATORY pre-edit anchor inventory before any `macos-capability-matrix.md` edits (DS-3 risk: C12/C13 harness failures if existing anchor offsets shift). Add PSSO rows BELOW existing rows to preserve anchor offsets.

**Delivers:** `macos-capability-matrix.md` ## Authentication section (auth method rows, hardware gate, macOS version gates, Entra licensing, NUAL, passkey, hybrid join = NOT SUPPORTED); `4-platform-capability-comparison.md` macOS cells updated (link-not-copy); pre-edit anchor inventory audit

**Addresses features:** Capability matrix updates (P2)

**Avoids pitfalls:** DS-3 (anchor drift -- pre-edit inventory required), DS-1 (PSSO is NOT supervised-only; only ADE-during-Setup-Assistant is ADE-only), DS-2 (90-day `last_verified`/`review_by` on all PSSO content)

**Research flag:** NO -- matrix content is HIGH confidence. Anchor inventory is a mechanical corpus audit.

---

### Phase 79 -- L1/L2 Runbooks

**Rationale:** Runbooks reference admin guides (Phases 75-77) and glossary (Phase 75). Pre-authoring cross-link inventory is a hard contract before authoring begins (DS-4 prevention pattern from prior milestones). L2 #27 must reference L1 #35 and #36 as source escalation paths. Replace `security find-certificate` with `app-sso platform -s` everywhere (VR-3). Version-gate the macOS 15.0-15.2 re-registration loop step (fixed in 15.3).

**Delivers:** `35-macos-sso-sign-in-failure.md` (L1), `36-macos-secure-enclave-key.md` (L1), `27-macos-sso-investigation.md` (L2), `l1-runbooks/00-index.md` rows for #35/#36, `l2-runbooks/00-index.md` row for #27 + escalation mapping update

**Addresses features:** L1 runbook: registration not appearing (P1), L2 PSSO failure investigation (P2), L2 password sync failure (P2)

**Avoids pitfalls:** DS-4 (cross-link gaps -- pre-authoring inventory required), VR-3 (Keychain WPJ checks replaced with `app-sso platform -s`), DF-8 (macOS 15.0-15.2 re-registration loop -- version-gate to 'fixed in 15.3')

**Research flag:** `app-sso diagnose` command and `log stream --predicate` SSO subsystem filter values are LOW confidence. Validate against Apple developer docs at Phase 79 authoring time.

---

### Phase 80 -- Nav Hub Integration

**Rationale:** Nav hubs are append-only. Can only link to what exists (Phases 75-79). Decision tree extends SSO failure leaf nodes. Never rewrite existing table rows -- append only per five-milestone established pattern.

**Delivers:** `docs/index.md` macOS section extensions (07/08/09 + #35/#36/#27 rows), `common-issues.md` SSO failure entry (append-only), `quick-ref-l1.md` SSO escalation triggers, `quick-ref-l2.md` SSO log paths + attestation command, `decision-trees/06-macos-triage.md` SSO leaf nodes, final cross-link closure checklist

**Addresses features:** All cross-navigation integration (P2)

**Avoids pitfalls:** DS-4 (hub link gaps -- final closure checklist), DS-2 (`last_verified`/`review_by` audit across all new PSSO docs before phase closes)

**Research flag:** NO -- mechanical append-only work following established patterns.

---

### Phase 81 -- Harness Lineage Bump (Atom 1 + Atom 2) + Terminal Re-Audit Close

**Rationale:** Harness is always authored last. FIRST task in Phase 81: identify v1.8 close-gate SHA from git log (commit that delivered `v1.8-MILESTONE-AUDIT.md` + 4-doc traceability closure), pin as V18 in `frozen-at-close.mjs`. Do NOT author any `check-phase-NN.mjs` before V18 is pinned (AP-5 anti-pattern). C17 decision is the key gray-area pick.

**Delivers (Atom 1, indivisible):** `v1.9-milestone-audit.mjs` + `v1.9-audit-allowlist.json` + BASELINE_13 comment in `regenerate-supervision-pins.mjs`

**Delivers (Atom 2, indivisible):** `check-phase-75.mjs` through `check-phase-81.mjs` (chain-apex: CHAIN_PHASES=[48..80]) + `audit-harness-v1.9-integrity.yml` + `_lib/frozen-at-close.mjs` (V18 entry + `readAtV18Close` export)

**Delivers (Phase 82 close-gate):** 3-axis terminal re-audit (Axis 1 fresh-clone local, Axis 2 cross-OS Linux GHA, Axis 3 fresh sub-agent); `v1.9-MILESTONE-AUDIT.md` + `v1.9-DEFERRED-CLEANUP.md` + 4-doc traceability closure; two-commit chicken-and-egg close-gate

**Avoids pitfalls:** AP-5 (V18 SHA pinned before validators authored), AP-2 (07/08/09 are separate files -- per-file validator assertions), AP-3 (00-overview.md Mermaid update required -- check-phase-76 must assert)

**Research flag:** C17 cross-link check decision -- invoke `/adversarial-review` at Phase 81 planning per user memory preference.

---

### Phase Ordering Rationale

- Glossary before admin guides: glossary terms must pre-exist for guides to link to them
- Admin setup (07) before auth deep-dive (08) and migration (09): 08 and 09 reference 07 in See Also
- Content phases (75-80) before harness (81): harness validates what exists
- Capability matrix (78) after admin guides (75-77): matrix synthesizes verified facts; pre-edit anchor inventory required
- Runbooks (79) after admin guides (75-77): L2 #27 references `app-sso platform -s` diagnostics documented in admin guides
- Nav hub integration (80) after runbooks (79): hubs can only link to what already exists
- Three admin guides (07/08/09) are three SEPARATE files, not one mega-guide: different audiences; `docs/index.md` link-at-granularity architecture requires separate files; established single-responsibility pattern across 01-06

---

### Research Flags Summary

**Phases needing research at authoring time:**
- **Phase 76 (Smart card section):** Entra CBA configuration detail (CA cert upload, auth strength policy, X.509 attribute mapping). Fetch `learn.microsoft.com/en-us/entra/identity/authentication/concept-certificate-based-authentication-mobile-ios` at plan time.
- **Phase 79 (L2 runbook):** `app-sso diagnose` command and `log stream --predicate` subsystem filter values -- LOW confidence. Validate against Apple developer docs.
- **Phase 81 (harness):** C17 cross-link check decision -- invoke `/adversarial-review` at Phase 81 planning.

**Phases with standard patterns (skip research-phase):**
- Phase 75, 77, 78, 80 -- all facts HIGH confidence; patterns are well-established.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack (product names, identifiers, version floors, licensing) | HIGH | All facts verified against Microsoft Learn 2026-05-18 to 2026-06-15 and Apple Platform Security June 2026. No tensions between research files. |
| Features (auth method behavior, UX, prerequisites, anti-features) | HIGH | Verified against 9 official Microsoft Learn and Apple Deployment sources. All behavioral claims confirmed in official sources. |
| Architecture (file structure, naming conventions, cross-link topology, harness lineage) | HIGH | Grounded in direct corpus inspection of all named existing files. File numbers, stub locations, harness patterns all verified. |
| Pitfalls (deployment failure modes, migration pitfalls, doc-suite traps) | HIGH (AXIS 1-4); MEDIUM (some AXIS 2 recency) | DF-1 through DF-13 all HIGH confidence. WPJ Keychain migration (VR-3) is MEDIUM (Jamf community + Microsoft change note). |

**Overall confidence: HIGH.**

### Gaps to Address

1. **Smart card Entra CBA configuration detail (MEDIUM confidence)** -- Research confirmed CBA is a hard prerequisite but did not fully document the Entra admin walk-through (CA cert upload, auth strength policy, X.509 attribute mapping). Handle at Phase 76 authoring: fetch the Entra CBA guide in full.

2. **`NewUserAuthorizationMode` key name (LOW confidence)** -- Research referenced this Settings Catalog key for NUAL account privilege level but did not confirm the exact current key name in the Intune admin center. Handle at Phase 76/77 authoring: inspect Settings Catalog or fetch `learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-scenarios-macos`.

3. **macOS 26 ADE-during-Setup-Assistant detailed UX (MEDIUM confidence)** -- Prerequisites captured but in-Setup-Assistant user interaction flow is documented at summary level only. Handle at Phase 75 ADE subsection: fetch `learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-during-enrollment` in full.

4. **C17 cross-link check decision (open)** -- Whether SSO-E1 through SSO-E8 edges become a named C17 blocking harness check is unresolved. Handle at Phase 81 planning via `/adversarial-review`.

5. **`app-sso diagnose` command and log subsystem paths (LOW confidence)** -- `app-sso platform -s` is HIGH confidence as the primary triage command, but the `log stream --predicate` subsystem filter values for SSO deep-dive diagnostics were not enumerated. Handle at Phase 79 L2 runbook authoring: validate against Apple developer documentation.

---

## Sources

### Primary (HIGH confidence)

**Microsoft Learn (all verified June 2026):**
- `learn.microsoft.com/en-us/intune/intune-service/configuration/platform-sso-macos` (updated 2026-05-18) -- Primary admin setup; Settings Catalog keys, version floors, auth method comparison
- `learn.microsoft.com/en-us/entra/identity/devices/macos-psso` (updated 2026-06-15) -- Entra PSSO overview; device registration state transitions
- `learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension` (updated 2026-06-15) -- All known issues (DF-1 through DF-12); macOS 15.3 bug fix confirmed
- `learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin` (updated 2026-06-15) -- Umbrella product name hierarchy; WPJ key storage migration August 2025; browser SSO requirements
- `learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-during-enrollment` (updated 2026-06-01) -- ADE enrollment PSSO; macOS 26; static group constraint
- `learn.microsoft.com/en-us/intune/device-configuration/templates/configure-enterprise-sso-plugin-macos` (updated 2026-04-14) -- Legacy SSO app extension
- `learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on` (updated 2026-06-15) -- OOBE/ADE user experience
- `learn.microsoft.com/en-us/entra/identity/devices/device-join-microsoft-entra-company-portal` (updated 2026-06-15) -- Company Portal registration flow
- `learn.microsoft.com/en-us/entra/identity/authentication/concept-certificate-based-authentication-mobile-ios` (updated 2026-04-19) -- Smart card / Entra CBA prerequisite

**Apple Official (current June 2026):**
- `support.apple.com/guide/security/the-secure-enclave-sec59b0b31ff/web` -- Secure Enclave hardware facts; key non-exportability
- `support.apple.com/en-us/103265` -- T2 Security Chip model list
- `support.apple.com/guide/deployment/dep7bbb05313/web` -- Platform SSO overview; NUAL; on-demand account creation
- `support.apple.com/guide/deployment/extensible-single-sign-on-payload-settings-depfd9cdf845/web` -- Apple payload type `com.apple.extensiblesso`

**Microsoft Tech Community:**
- `techcommunity.microsoft.com/blog/microsoft-entra-blog/now-generally-available-platform-sso-for-macos-with-microsoft-entra-id/4437424` -- PSSO GA August 2025
- `techcommunity.microsoft.com/blog/intunecustomersuccess/new-platform-sso-with-registration-during-automated-device-enrollment-on-macos/4519846` -- PSSO during ADE GA May 2026

### Secondary (MEDIUM confidence)

- Apple Developer Forums `developer.apple.com/forums/thread/803802` -- AD-bound mobile account Password sync failure (DF-7)
- Jamf Community -- WPJ key storage migration Q3 2025 (VR-3)
- `scloud.work/intune-assigment-error-10002-platform-sso/` -- Error 10002 community corroboration
- `intuneirl.com/the-complete-macos-sso-playbook-advanced-configuration-strategies-explained/` -- FileVault interaction behavior

### Internal (HIGH confidence for doc-authoring patterns)

- `.planning/PROJECT.md` -- v1.9 milestone scope, Phase 75+ numbering, sequential-on-main-tree constraint, v1.8 Path-A lineage precedent
- Direct corpus inspection (ARCHITECTURE.md): all files in `docs/admin-setup-macos/`, `docs/_glossary-macos.md`, `docs/reference/macos-capability-matrix.md`, `docs/reference/4-platform-capability-comparison.md`, `docs/index.md`, `docs/l1-runbooks/00-index.md`, `docs/l2-runbooks/00-index.md`, `docs/macos-lifecycle/00-ade-lifecycle.md`, `scripts/validation/` (v1.4-v1.8 lineage), `_lib/frozen-at-close.mjs`, `check-phase-74.mjs`, `audit-harness-v1.8-integrity.yml`

---
*Research completed: 2026-06-20*
*Ready for roadmap: yes*