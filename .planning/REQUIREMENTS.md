# Requirements: macOS Platform SSO & Secure Enclave Authentication Documentation (v1.9)

**Defined:** 2026-06-20
**Core Value:** IT teams can independently provision, troubleshoot, and manage Apple-platform single sign-on (macOS Platform SSO + Secure Enclave) through Microsoft Intune / Entra ID without escalating to engineering.

**Research basis:** `.planning/research/SUMMARY.md` (+ STACK / FEATURES / ARCHITECTURE / PITFALLS) — HIGH confidence, sources Microsoft Learn 2026-05-18..2026-06-15 + Apple Platform Security/Deployment June 2026.

**Gray-area picks resolved via `/adversarial-review` (2026-06-20):**
- **D1 Touch ID biometric policy → Option A** (full subsection in `08-auth-methods-deep-dive.md`)
- **D2 Passkey/FIDO2 → Option A** (advanced section in `08`, adjacent to Secure Enclave method)
- **D3 NUAL → Option B** (document behavior now; defer the LOW-confidence `NewUserAuthorizationMode` key until verified)
- **D4 ADE-during-Setup PSSO → Option B** (advanced/optional path with an "update-to-macOS-26-first" branch; post-enrollment registration remains the documented default)

---

## v1.9 Requirements

Requirements for this milestone. Each maps to exactly one roadmap phase.

### Platform SSO Setup & Authentication (PSSO)

- [x] **PSSO-01**: Admin can stand up macOS Platform SSO from a dedicated setup guide (`07-platform-sso-setup.md`) — Settings Catalog payload (`com.apple.extensiblesso`), key identifiers (extension `com.microsoft.CompanyPortalMac.ssoextension`, Team ID `UBF8T346G9`, registration token literal `{{DEVICEREGISTRATION}}`), Entra device-registration prerequisites, assignment to **user** groups (not device groups), Company Portal install as a prerequisite step, and the registration flow with `app-sso platform -s` verification
- [x] **PSSO-02**: Guide documents mixed-fleet dual-field configuration (macOS 13 deprecated `Authentication Method` AND macOS 14+ `Platform SSO > Authentication Method` in one policy) to prevent Error 10001 on excluded OS versions
- [x] **PSSO-03**: Guide documents the bootstrapping prerequisites — remove legacy per-user MFA (silently blocks Password sync), exclude new-enrollment devices from strict Conditional Access "compliant device" gating during the bootstrap window, and exempt PSSO/Microsoft login endpoints from TLS break-and-inspect
- [x] **PSSO-04**: Existing inaccurate Extensible SSO stub in `03-configuration-profiles.md` (lines ~157-168, 3 factual errors) is corrected and repointed to `07-platform-sso-setup.md`
- [x] **PSSO-05**: Admin can choose an auth method from a selection/comparison guide (Secure Enclave key [recommended] vs Password sync vs Smart card; passwordless / phishing-resistant / hardware / macOS-version dimensions)
- [x] **PSSO-06**: Secure Enclave auth method is documented in depth (`08-auth-methods-deep-dive.md`) — hardware scope (Apple Silicon + T2 Intel), non-exportable hardware-bound key, PRT for device-wide SSO, **FileVault non-relationship** (local password still required at cold boot), and the **password-reset-destroys-the-key** warning
- [x] **PSSO-07**: Password sync auth method is documented in depth (`08`) — what syncs and the ~4-hour window, complexity-mismatch failure, macOS 15+ `FileVaultPolicy = AttemptAuthentication`, per-user MFA blocker, and the AD-bound (mobile) account limitation
- [x] **PSSO-08**: Smart card auth method is documented in depth (`08`) — Entra CBA prerequisite (separate Entra admin task), `sc_auth` pairing, macOS 14+ gate, and the not-available-during-Setup-Assistant constraint
- [x] **PSSO-09**: Touch ID biometric policy is documented as a subsection of the Secure Enclave method in `08` (D1=A) — `enable_se_key_biometric_policy` [CP 2504] + `UserSecureEnclaveKeyBiometricPolicy` [macOS 14.6+], the **no-password-fallback lockout warning**, and admin-driven re-registration to enable
- [x] **PSSO-10**: Passkey/FIDO2 from the Secure Enclave Platform Credential is documented as an advanced section in `08` (D2=A) — Entra Authentication-methods enablement, AAGUID allowlist `7FD635B3-2EF9-4542-8D9D-164F2C771EFC` (conditional — only when FIDO2 key restrictions apply), and end-user self-enablement
- [x] **PSSO-11**: NUAL (new-user-at-login-window / on-demand account creation) behavior is documented conceptually in `08` (D3=B) — macOS 14+, Shared Device Keys, `com.apple.PlatformSSO.AccountShortName` mapping; the LOW-confidence `NewUserAuthorizationMode` privilege key is **omitted** and tracked in `v1.9-DEFERRED-CLEANUP.md` pending verification
- [x] **PSSO-12**: ADE-during-Setup-Assistant PSSO (`EnableRegistrationDuringSetup`) is documented as an **advanced/optional** path (D4=B) with an explicit, achievable "update-to-macOS-26-first" prerequisite branch — macOS 26 + Company Portal 5.2604.0 + static-groups-only + Smart-card-excluded + wipe-to-fix-if-misconfigured; post-enrollment registration remains the documented default. Section carries `last_verified: 2026-06-20` / `review_by: 2026-09-20`

### Legacy SSO & Migration (SSOMIG)

- [x] **SSOMIG-01**: Legacy Microsoft Enterprise SSO plug-in (SSO app extension, Device Features template) is documented (`09-enterprise-sso-plugin-migration.md`) — what it is and does NOT do vs Platform SSO, with a when-to-use-which decision matrix; product-name hierarchy (Enterprise SSO plug-in umbrella vs Platform SSO vs SSO app extension vs Kerberos SSO extension) made explicit
- [x] **SSOMIG-02**: Staged legacy→Platform SSO migration sequence is documented (`09`) — assign PSSO to pilot → validate → THEN unassign legacy profile (never both assigned simultaneously → Error 10002), plus what breaks during migration
- [x] **SSOMIG-03**: Mandatory PSSO rollback procedure is documented (`09`) — destructive WPJ-key removal from Secure Enclave, CA-blocked-until-re-registered impact, and the pre-migration compliance-script update (`security find-certificate` → `app-sso platform -s`, false-negatives since WPJ moved to Secure Enclave)
- [x] **SSOMIG-04**: Kerberos SSO extension coexistence is documented as a cross-reference note (`09`) — distinct Apple-native extension, separate extension identifiers, coexists with PSSO (full Kerberos deep-dive out of scope)

### Troubleshooting Runbooks (SSORUN)

- [x] **SSORUN-01**: L1 runbook `35-macos-sso-sign-in-failure.md` — "Registration required" not appearing despite Intune "Succeeded" (4 root causes: old Company Portal / Error 10002 legacy conflict / mistyped registration token / dismissed notification); `app-sso platform -s` as the first triage step
- [x] **SSORUN-02**: L1 runbook `36-macos-secure-enclave-key.md` — Secure Enclave key verification and loss-after-password-reset recovery (re-registration path)
- [x] **SSORUN-03**: L2 runbook `27-macos-sso-investigation.md` — PSSO registration-failure + Password-sync-failure investigation (sign-in logs, sysdiagnose, TLS-inspection exclusions, per-user-MFA/AD-bound causes), with the macOS 15.0-15.2 re-registration loop version-gated to "fixed in 15.3"

### Reference & Navigation Integration (SSOREF)

- [x] **SSOREF-01**: `_glossary-macos.md` gains a `## Authentication` section (Platform SSO, Secure Enclave, Enterprise SSO plug-in entries) with reciprocal `_glossary.md` see-also
- [x] **SSOREF-02**: `macos-capability-matrix.md` gains a `## Authentication` section (auth-method rows, hardware/macOS-version gates, Entra licensing, hybrid-join = NOT SUPPORTED) and `4-platform-capability-comparison.md` macOS Platform SSO cell is updated (link-not-copy; pre-edit anchor inventory to prevent C12/C13 anchor drift)
- [x] **SSOREF-03**: `00-ade-lifecycle.md` Stage 4/6/7 are surgically extended with PSSO timing/registration notes and `00-overview.md` Mermaid + bullet list is extended for guides 07/08/09
- [x] **SSOREF-04**: Navigation hubs integrate the new content (append-only) — `index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `l1-runbooks/00-index.md`, `l2-runbooks/00-index.md`, and `decision-trees/06-macos-triage.md` SSO failure leaf

### Validation Tooling & Milestone Close (SSOHARN)

- [x] **SSOHARN-01**: `v1.9-milestone-audit.mjs` + `v1.9-audit-allowlist.json` ship as Path-A copies from v1.8 (C1-C16 inherited) + BASELINE_13 freshness comment in `regenerate-supervision-pins.mjs` (Atom 1, indivisible)
- [x] **SSOHARN-02**: Per-phase `check-phase-75..NN.mjs` validators ship as deliverables + `_lib/frozen-at-close.mjs` gains a `V18` entry (v1.8 close-gate SHA) + `readAtV18Close` export; the V18 SHA is pinned BEFORE any validator is authored (Atom 2, indivisible)
- [x] **SSOHARN-03**: `audit-harness-v1.9-integrity.yml` ships as the 6th parallel CI coexistence workflow (predecessors v1.4/v1.5/v1.6/v1.7/v1.8 byte-unchanged)
- [x] **SSOHARN-04**: 3-axis terminal re-audit (Axis 1 fresh `git clone --no-hardlinks` + Axis 2 cross-OS Linux GHA + Axis 3 fresh sub-agent; cross-OS PASS-Count EXACT MATCH) + `v1.9-MILESTONE-AUDIT.md` + `v1.9-DEFERRED-CLEANUP.md` + 4-doc traceability closure (PROJECT/ROADMAP/STATE/REQUIREMENTS)

---

## Future Requirements (v1.10+)

Acknowledged but deferred. Not in this milestone's roadmap.

### Deferred PSSO surfaces

- **PSSO-FUT-01**: NUAL exact `NewUserAuthorizationMode` privilege key — document once the key name is verified against the live Settings Catalog / Microsoft Learn (currently LOW confidence; see PSSO-11)
- **PSSO-FUT-02**: Graph API management of the Platform Credential (`platformCredentialAuthenticationMethod` resource)
- **PSSO-FUT-03**: Multi-tenant PSSO scenarios
- **PSSO-FUT-04**: Kerberos SSO extension deep-dive guide (v1.9 ships only the coexistence cross-reference per SSOMIG-04)

---

## Out of Scope

Explicitly excluded for v1.9. Documented to prevent scope creep. Anti-features are documented in-corpus as anti-features (not silently omitted).

| Feature | Reason |
|---------|--------|
| Hybrid Entra join PSSO | NOT supported by Microsoft (no plans to support on macOS); documented in-corpus as an explicit anti-feature only |
| Multi-tenant PSSO | Net-new architectural scope, not authentication-doc cleanup; deferred to v1.10+ |
| Graph API Platform Credential management | Distinct programmatic surface; deferred to v1.10+ |
| Kerberos SSO deep-dive | v1.9 ships coexistence cross-reference only (SSOMIG-04); full guide deferred |
| Apple School Manager / education-tenant auth | Outside the enterprise (corporate IT) scope maintained across v1.0–v1.8 |
| `NewUserAuthorizationMode` exact key value | LOW research confidence; deferred until verified (per D3=B / PSSO-11) rather than shipping a possibly-wrong literal |
| New platforms / non-macOS auth | v1.9 is a single-feature macOS-authentication content milestone |

---

## Traceability

Populated at roadmap creation 2026-06-20. Each requirement maps to exactly one phase.

| Requirement | Phase | Status |
|-------------|-------|--------|
| PSSO-01 | Phase 76 | Complete |
| PSSO-02 | Phase 76 | Complete |
| PSSO-03 | Phase 76 | Complete |
| PSSO-04 | Phase 75 | Complete |
| PSSO-05 | Phase 77 | Complete |
| PSSO-06 | Phase 77 | Complete |
| PSSO-07 | Phase 77 | Complete |
| PSSO-08 | Phase 77 | Complete |
| PSSO-09 | Phase 77 | Complete |
| PSSO-10 | Phase 77 | Complete |
| PSSO-11 | Phase 77 | Complete |
| PSSO-12 | Phase 76 | Complete |
| SSOMIG-01 | Phase 78 | Complete |
| SSOMIG-02 | Phase 78 | Complete |
| SSOMIG-03 | Phase 78 | Complete |
| SSOMIG-04 | Phase 78 | Complete |
| SSORUN-01 | Phase 80 | Complete |
| SSORUN-02 | Phase 80 | Complete |
| SSORUN-03 | Phase 80 | Complete |
| SSOREF-01 | Phase 75 | Complete |
| SSOREF-02 | Phase 79 | Complete |
| SSOREF-03 | Phase 75 | Complete |
| SSOREF-04 | Phase 81 | Complete |
| SSOHARN-01 | Phase 82 | Validated |
| SSOHARN-02 | Phase 82 | Validated |
| SSOHARN-03 | Phase 82 | Validated |
| SSOHARN-04 | Phase 82 | Validated |

**Coverage:**
- v1.9 requirements: 27 total
- Mapped to phases: 27 (roadmap complete)
- Unmapped: 0 ✓
- **Validated: 27/27** (v1.9 MILESTONE CLOSED 2026-06-22 via Phase 82 Plan 82-04 single close-gate commit `{phase_82_close_SHA}`; NO Commit A per D-04)

---
*Requirements defined: 2026-06-20*
*Last updated: 2026-06-22 — v1.9 MILESTONE CLOSED via Phase 82 Plan 82-04 close-gate. 4 SSOHARN reqs flipped to Validated; cumulative 27/27 Validated. Single close-gate commit (NO Commit A per D-04); literal `{phase_82_close_SHA}` recoverable via `git log --all --grep="82-04" --grep="close-gate" --all-match -1 --format=%H`.*
