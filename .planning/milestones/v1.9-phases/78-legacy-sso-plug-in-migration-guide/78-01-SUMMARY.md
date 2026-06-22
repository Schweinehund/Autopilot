---
phase: 78-legacy-sso-plug-in-migration-guide
plan: 01
subsystem: docs/admin-setup-macos
tags: [documentation, enterprise-sso, platform-sso, migration, kerberos, macos]
dependency_graph:
  requires:
    - Phase 75 (glossary anchors: #enterprise-sso-plug-in, #platform-sso, #secure-enclave)
    - Phase 76 (07-platform-sso-setup.md, guide-09 code-span in 00-overview:49 planted)
    - Phase 77 (08-auth-methods-deep-dive.md, guide-09 code-span in 08:327 planted)
  provides:
    - docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md (A3 hybrid migration guide)
    - Live nav edges: 00-overview -> 09, 08-auth-methods-deep-dive -> 09
    - Configuration-Caused Failures tail (hub-compatible for Phase 81)
    - See Also hooks for Phase 79 (capability matrix) and Phase 80 (runbooks)
  affects:
    - docs/admin-setup-macos/08-auth-methods-deep-dive.md (line-327 live link + Version-History)
    - docs/admin-setup-macos/00-overview.md (line-49 live link + Version-History)
tech_stack:
  added: []
  patterns:
    - A3 hybrid structure (custom body + corpus tail): same pattern as guides 07 and 08
    - C13 atomic link+target landing (three files in one commit): Phase-77 D-02 precedent
    - Hard-bordered destructive-action callout (blockquote + bold title + sub-item bullets)
    - Link-not-copy (D-03a decision matrix -> guide 08; D-06a rollback -> prerequisite callout)
    - DS-2 90-day section-level provenance annotation on VR-3 MEDIUM-confidence facts
key_files:
  created:
    - docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md
  modified:
    - docs/admin-setup-macos/08-auth-methods-deep-dive.md
    - docs/admin-setup-macos/00-overview.md
decisions:
  - "A1 (A3 hybrid): custom body over corpus tail -- same referee-blessed pattern as guides 07/08"
  - "B4 (scenario-row matrix): migrate/keep/coexist axis only; links guide 08 for auth-method selection (D-03a)"
  - "C1 (dedicated Rollback H2 + hard-bordered callout): all three SC3 elements; compliance-script swap stated canonically in D-06 up-front callout, cross-referenced from rollback (D-06a link-not-copy)"
  - "D1 (atomic dual conversion + reciprocal See Also + bounded Kerberos subsection): three files in one commit for C13 compliance"
metrics:
  duration: "~25 minutes"
  completed: "2026-06-21"
  tasks_completed: 3
  tasks_total: 3
  files_created: 1
  files_modified: 2
---

# Phase 78 Plan 01: Enterprise SSO Plug-in Migration Guide Summary

**One-liner:** A3 hybrid migration guide for macOS Enterprise SSO plug-in -> Platform SSO with four-term disambiguation, Error 10002 staged sequence, destructive Rollback H2, bounded Kerberos coexistence note, and atomic C13 nav wiring.

## What Was Built

### Task 1: Guide 09 (09-enterprise-sso-plugin-migration.md) -- COMPLETE

Created `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` (175 lines, A3 hybrid) with the locked D-01 body order:

1. **Product-Name Disambiguation (SC1 / SSOMIG-01):** Four-term table (Microsoft Enterprise SSO plug-in [umbrella] | Platform SSO [Settings Catalog modern] | SSO app extension [Device Features legacy] | Kerberos SSO extension [separate Apple-native]) + terminology-trap callout (writing "configure the Enterprise SSO plug-in" without specifying which surface -> Error 10002).

2. **When-to-Use-Which Decision Matrix (B4 / D-03 / SSOMIG-01):** Five scenario rows (macOS 13+ migrate; mixed fleet keep/coexist; macOS 12 silent failure; on-prem Kerberos coexistence; same-device FORBIDDEN Error 10002; hybrid Entra join NOT SUPPORTED). Decision column links [Auth Methods Deep-Dive](08-auth-methods-deep-dive.md) for method selection (D-03a link-not-copy). "Coexist" explicitly disambiguated as cross-segment NOT same-device (D-03c).

3. **Up-Front Compliance-Script Prerequisite Callout (D-06 / C1 interlock):** Hard-bordered callout titled "Before You Migrate -- Update Compliance Scripts First" placed BEFORE the migration sequence, following guide-07 Known Silent Blockers precedent. States `security find-certificate` -> `app-sso platform -s` swap ONCE CANONICALLY. DS-2 `_Section provenance_` annotation: VR-3 MEDIUM confidence, `last_verified: 2026-06-21` / `review_by: 2026-09-21`.

4. **Staged Migration Sequence + Error 10002 Warning (SC2 / SSOMIG-02):** 7-step sequence (PILOT group -> PSSO validate with `app-sso platform -s` -> THEN unassign legacy -> 48h monitor [practitioner-recommended, not official SLA] -> expand per-group -> no profile overlap -> do not delete legacy until confirmed unassigned everywhere). Error 10002 behavior stated canonically: both profiles stop working; PSSO registration blocked.

5. **What Breaks During Migration:** Four items (Chrome native-messaging host, Edge profile sign-in, macOS 12 silent failure, transient profile-conflict window). DS-2 section-level provenance annotation.

6. **Dedicated ## Rollback H2 (C1 / D-05 / SSOMIG-03):** Hard-bordered destructive-action callout carrying all three SC3 elements as sub-item bullets: (a) WPJ-key removal from Secure Enclave is destructive + cannot be undone without re-enrolling; (b) CA-blocked-until-re-registered impact window (active service outage for device-based CA users); (c) compliance-script swap cross-reference to up-front prerequisite callout by anchor (does NOT restate the command -- D-06a link-not-copy).

7. **Bounded Kerberos SSO Extension (Coexistence) Subsection (D1 / D-08 / SSOMIG-04):** Delivers exactly the SC4 trio: distinct Apple-native extension (Kerberos payload type, not Redirect); separate Extension Identifiers required (sharing causes override, MG-4); coexists with PSSO when identifiers are separate. Exactly one PSSO-FUT-04 deferred-deep-dive cross-reference. No payload/config detail.

8. **Corpus Tail:** `## Configuration-Caused Failures` four-column table (Misconfiguration | Portal | Symptom | Runbook) with four seeded rows; Phase-80 runbook filenames as code-spans (not live links per C13). No-runbook cells use `--` (double hyphen, matching guide 08).

9. **See Also:** Live links to guide 07 and guide 08 + three verified glossary anchors (#enterprise-sso-plug-in, #platform-sso, #secure-enclave). No live links to not-yet-authored files.

10. **Version History:** Single row `| 2026-06-21 | Phase 78 (SSOMIG-01..04): initial Enterprise SSO plug-in migration guide | -- |`.

Verify: `GUIDE09_OK` confirmed.

### Task 2: 08-auth-methods-deep-dive.md line-327 conversion -- COMPLETE

Converted `## See Also` line-327 code-span:
- **Before:** `` - Legacy Enterprise SSO plug-in and migration guide: `09-enterprise-sso-plugin-migration.md` (Phase 78 -- not yet authored) ``
- **After:** `- [Legacy Enterprise SSO Plug-in & Migration Guide](09-enterprise-sso-plugin-migration.md) -- when to migrate...`

Added Version-History row: `| 2026-06-21 | Phase 78: converted guide-09 code-span to live link in ## See Also | -- |`

No headings touched (anchor stability). Verify: `GUIDE08NAV_OK` confirmed.

### Task 3: 00-overview.md line-49 conversion -- COMPLETE

Converted numbered-list item 9:
- **Before:** `` 9. `09-enterprise-sso-plugin-migration.md` (added in a later documentation phase) ``
- **After:** `9. **[Enterprise SSO Plug-in & Migration Guide](09-enterprise-sso-plugin-migration.md)** -- Decision-first reference for mixed-fleet admins...`

Description text is consistent with guide 09's actual H1 title and purpose. Mermaid diagram (node `I` = `[9. Enterprise SSO<br/>Migration]`) unchanged -- already correct (D-08a). Added Version-History row: `| 2026-06-21 | Phase 78: converted guide-09 code-span to live link with description | -- |`

No headings touched (anchor stability). Verify: `OVERVIEW09_OK` confirmed.

## Commit

**Atomic commit (C13 landing):** `64b72ac` -- all three files in one commit:
- `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` (CREATE)
- `docs/admin-setup-macos/08-auth-methods-deep-dive.md` (EDIT)
- `docs/admin-setup-macos/00-overview.md` (EDIT)

## Verification

- `GUIDE09_OK`: PASSED
- `GUIDE08NAV_OK`: PASSED
- `OVERVIEW09_OK`: PASSED
- `node scripts/validation/v1.8-milestone-audit.mjs`: **15/15 PASSED** (C13 green -- all broken-link allowlist checks honored)
- `git show --name-only HEAD`: Confirms exactly the three doc files in the atomic commit

## Deviations from Plan

None -- plan executed exactly as written. All three tasks landed in one atomic commit as required. All four success criteria (SC1-SC4) satisfied. C13 passes 15/15.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. This is a pure documentation phase; no executable code created. All STRIDE threats mitigated as planned:
- T-78-01 (rollback guidance completeness): Dedicated ## Rollback H2 with three-element SC3 callout
- T-78-02 (Error 10002 dual-profile misconfiguration): Staged sequence + decision matrix "coexist" disambiguation
- T-78-03 (false-negative compliance after migration): Up-front D-06 prerequisite callout with VR-3 MEDIUM annotation
- T-78-04 (broken internal link): Atomic three-file commit; C13 passes 15/15

## Self-Check

**Files created/modified:**
- `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md`: FOUND (175 lines)
- `docs/admin-setup-macos/08-auth-methods-deep-dive.md`: FOUND (modified)
- `docs/admin-setup-macos/00-overview.md`: FOUND (modified)

**Commits:**
- `64b72ac`: feat(78-01): author Enterprise SSO plug-in migration guide + atomic nav wiring -- FOUND

## Self-Check: PASSED
