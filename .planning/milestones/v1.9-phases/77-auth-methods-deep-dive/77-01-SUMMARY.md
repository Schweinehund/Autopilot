---
phase: 77-auth-methods-deep-dive
plan: "01"
subsystem: docs/admin-setup-macos
tags: [platform-sso, secure-enclave, auth-methods, macos, documentation]
dependency_graph:
  requires: [phase-76-platform-sso-admin-setup-guide]
  provides: [guide-08-auth-methods-deep-dive, 00-overview-link-08, v1.9-deferred-cleanup]
  affects: [docs/admin-setup-macos/08-auth-methods-deep-dive.md, docs/admin-setup-macos/00-overview.md, docs/v1.9-DEFERRED-CLEANUP.md]
tech_stack:
  added: []
  patterns: [A3-hybrid-document-structure, duplication-with-cross-reference, C13-atomic-link-landing, hard-bordered-callout, section-local-last_verified-annotation]
key_files:
  created:
    - docs/admin-setup-macos/08-auth-methods-deep-dive.md
    - docs/v1.9-DEFERRED-CLEANUP.md
  modified:
    - docs/admin-setup-macos/00-overview.md
decisions:
  - "D-01/A3: A3 hybrid structure (selection table + per-method deep-dives + corpus skeleton tail)"
  - "D-02/C3: FileVault stated canonically once in SE section; cross-referenced elsewhere"
  - "D-03/D3: consolidated misconception box + point-of-use callouts at each method"
  - "D-04/B1: four-dimension selection table placed decision-first at doc top"
  - "PSSO-11/D-03=B: NewUserAuthorizationMode key literal omitted -- LOW confidence; tracked in v1.9-DEFERRED-CLEANUP.md"
metrics:
  duration: "~15 minutes"
  completed: "2026-06-21"
  tasks: 3
  files: 3
---

# Phase 77 Plan 01: Auth Methods Deep-Dive Summary

**One-liner:** Three-method Platform SSO auth-method reference guide (Secure Enclave [recommended], Password sync, Smart card) with four-dimension selection table, FileVault/SE-key canonical sub-section, Touch ID biometric policy (AAGUID, no-fallback lockout), NUAL, and misconceptions box -- atomically wired into 00-overview navigation.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Author guide 08 (08-auth-methods-deep-dive.md) | bba11f6 | docs/admin-setup-macos/08-auth-methods-deep-dive.md |
| 2 | Convert 00-overview line-47 code-span to live link + Version-History row | bba11f6 | docs/admin-setup-macos/00-overview.md |
| 3 | Create v1.9-DEFERRED-CLEANUP.md for NewUserAuthorizationMode tracking | bba11f6 | docs/v1.9-DEFERRED-CLEANUP.md |

Tasks 1, 2, and 3 landed in ONE atomic commit (bba11f6) per C13 broken-link gate requirement.

## What Was Built

### docs/admin-setup-macos/08-auth-methods-deep-dive.md (332 lines, new)

A3 hybrid deep-dive / selection reference guide for the architect and senior-admin audience. Structure:

1. **Auth Method Comparison** -- Four-dimension table (passwordless / phishing-resistant / hardware / macOS-version) with Secure Enclave marked "Recommended (Microsoft)", Password sync "Second choice", Smart card "Third choice" (SC1)
2. **Secure Enclave Key Method** -- Six non-negotiable fact anchors (non-exportable, hardware-bound, PRT, WPJ-in-SE-since-Aug-2025, FileVault non-relationship, MDM-reset-destroys-key); hardware scope (Apple Silicon + T2 Intel list; pre-2018 Intel WILL FAIL)
   - **FileVault and the Secure Enclave Key** -- C3 canonical sub-section; hard-bordered callout stating FileVault uses local password at cold boot; SE key is parallel, not a replacement (SC2)
   - **SE Key Destruction Warning** -- MDM-driven or FileVault-recovery password reset destroys key; re-registration required (SC2)
   - **Touch ID Biometric Policy** -- `enable_se_key_biometric_policy` [CP 2504] + `UserSecureEnclaveKeyBiometricPolicy` [macOS 14.6+]; verbatim no-password-fallback lockout warning; admin-driven re-registration requirement; section-local last_verified provenance annotation (SC4 / PSSO-09)
   - **Passkey / FIDO2 from the Platform Credential** -- AAGUID `7FD635B3-2EF9-4542-8D9D-164F2C771EFC` with conditional key-restrictions note; Entra auth-methods enablement; Smart card does NOT support passkey (SC5 / PSSO-10)
3. **Password Sync Method** -- What syncs, FileVault cross-reference (one password unlocks both), ~4h sync window with MEDIUM-confidence provenance note, complexity-mismatch, macOS 15 FileVaultPolicy, per-user-MFA blocker (DF-3), AD-bound limitation (DF-7) (SC3 / PSSO-07)
4. **Smart Card Method** -- Opens with Entra CBA hard prerequisite callout (DF-11) before any config detail; 5-step CBA summary; link to `how-to-certificate-based-authentication`; sc_auth pairing (MEDIUM confidence, section-local provenance note); macOS 14+ gate; verbatim not-available-during-Setup-Assistant warning (SC4 / PSSO-08)
5. **New User At Login Window (NUAL)** -- macOS 14+, Shared Device Keys, `com.apple.PlatformSSO.AccountShortName`; Settings Catalog display names documented; `NewUserAuthorizationMode` key literal OMITTED (D-03=B / PSSO-11); deferral note pointing to v1.9-DEFERRED-CLEANUP.md (SC5)
6. **Common Misconceptions** -- Six-row myth-vs-fact table seeding the three named dangers + CD-3 rows; each danger cross-referenced to its canonical method-section anchor (D3)
7. **Configuration-Caused Failures** -- Four-column table (Misconfiguration / Portal / Symptom / Runbook); runbook filenames as code-spans (Phase 80 not yet authored); 5 rows seeded from research pitfalls
8. **See Also** -- Live links to `07-platform-sso-setup.md` + four glossary anchors; `09-enterprise-sso-plugin-migration.md` as code-span only (C13 mechanism, Phase 78 not authored)
9. **Version History** -- horizontal rule + table; 2026-06-21 entry; Author `--`

### docs/admin-setup-macos/00-overview.md (modified)

Line-47 edit only:
- Converted: `` 8. `08-auth-methods-deep-dive.md` (added in a later documentation phase) ``
- To: `8. **[Auth Methods Deep-Dive](08-auth-methods-deep-dive.md)** -- Selection guide and deep-dive reference for all three Platform SSO authentication methods (Secure Enclave key [recommended], Password sync, Smart card) with FileVault interaction, dangerous misconceptions, Touch ID biometric policy, and Passkey/FIDO2 from the Platform Credential.`
- Double-hyphen `--` separator matching corpus style of items 1-7 (PITFALL-6 / anchor stability preserved)
- Line-49 `09-enterprise-sso-plugin-migration.md` code-span: untouched (Phase 78)
- Version-History row added (2026-06-21, Phase 77, Author `--`)
- No headings added, removed, renamed, or reordered (anchor stability)

### docs/v1.9-DEFERRED-CLEANUP.md (new)

Tracking file for the omitted `NewUserAuthorizationMode` MDM payload key literal:
- Documents why omitted (LOW confidence -- plist key name not confirmed from authoritative schema)
- What IS documented (display name, values Standard/Admin/Groups, behavior)
- Where to land when resolved (guide-08 NUAL section)
- Requirement linkage: PSSO-11 (deferred arm) / PSSO-FUT-01 (REQUIREMENTS.md lines 70, 88)
- Resolution trigger: verify key name against live Settings Catalog payload schema / Microsoft Learn

## Verification Results

| Check | Result |
|-------|--------|
| `GUIDE08_OK` sentinel | PASS |
| `OVERVIEW_OK` sentinel | PASS |
| `DEFERRED_OK` sentinel | PASS |
| v1.8-milestone-audit.mjs | 15/15 PASS (C13 broken-link gate green) |
| Atomic commit (3 files together) | PASS -- bba11f6 shows all 3 files |
| guide-08 min_lines >= 120 | PASS -- 332 lines |
| No live link to 09-enterprise-sso-plugin-migration.md | PASS -- code-span only |
| NewUserAuthorizationMode literal NOT in guide-08 | PASS -- omitted per PSSO-11/D-03=B |
| Double-hyphen `--` (not em-dash) in 00-overview line-47 | PASS |

## Deviations from Plan

None -- plan executed exactly as written. The three tasks were grouped into one atomic commit (bba11f6) as required by C13.

**Notes on medium-confidence items handled:**
- ~4-hour password sync timing (A2): documented as "approximately 4 hours" with a section-local MEDIUM-confidence `last_verified` / `review_by` provenance annotation and a note to confirm against current Microsoft Learn
- `sc_auth` pairing (A3): documented as a prerequisite pairing step with a section-local MEDIUM-confidence provenance annotation and a note to confirm exact command from Apple Platform Deployment documentation
- Both items are disclosed transparently; the guide does not overstate confidence

## Known Stubs

None that prevent the plan goal from being achieved. The `NewUserAuthorizationMode` key deferral is intentional (PSSO-11 / D-03=B locked decision) and tracked in v1.9-DEFERRED-CLEANUP.md.

## Threat Flags

No new security-relevant surface introduced. This phase authors documentation only (no code, no endpoints, no auth paths). All security claims verified from official Microsoft/Apple sources per T-77-01, T-77-02, T-77-03 threat register.

## Self-Check: PASSED

- [x] `docs/admin-setup-macos/08-auth-methods-deep-dive.md` exists (332 lines)
- [x] `docs/admin-setup-macos/00-overview.md` contains live link to guide-08
- [x] `docs/v1.9-DEFERRED-CLEANUP.md` exists and contains NewUserAuthorizationMode + PSSO-FUT-01
- [x] Commit bba11f6 exists with all 3 files
- [x] v1.8-milestone-audit.mjs 15/15 PASS
