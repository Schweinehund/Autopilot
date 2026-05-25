---
phase: 63-multi-ou-architecture-apple-admin-setup
verified: 2026-05-21T00:00:00Z
status: passed
score: 10/10
overrides_applied: 0
deferred:
  - truth: "Admin can consolidate VPP content tokens per OU with hard-bordered 'DO NOT TOUCH the new OU until full migration completes' callout (OP-9)"
    addressed_in: "Phase 64"
    evidence: "Phase 64 SC#1: 'Admin can manage VPP catalog per OU (11-vpp-catalog-runbook.md) including the untouched-OU OP-9 hard-bordered callout and post-migration license-count verification within 0.1%'. CONTEXT D-01 (approved pre-planning) explicitly placed the OP-9 hard-bordered operational callout in Phase 64; Phase 63's 07-vpp-content-token-consolidation.md covers concepts + points to Phase 64 without duplicating."
---

# Phase 63: Multi-OU Architecture & Apple Admin Setup — Verification Report

**Phase Goal:** Admins can choose between OUs / custom roles / combined topology via a decision matrix, author a custom role with the v1.6 differentiator min-viable sub-org admin bundle, onboard a sub-org admin (with paired offboarding), assign devices to MDM servers per OU, consolidate VPP content tokens, provision Managed Apple Accounts (manual / SCIM / OIDC+JIT), and manage Shared iPad + Apple TV lifecycle — and 3 incremental rows land in ios-capability-matrix.md without touching macos-capability-matrix.md or 4-platform-capability-comparison.md.

**Verified:** 2026-05-21
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Admin can pick OUs-only / custom-roles-only / combined topology from a criteria comparison table (OU-01) | VERIFIED | `03-ous-vs-custom-roles.md` contains a 7-row criteria comparison table with exactly 3 topology columns; "most-permissive wins across overlapping assignments" OP-4 callout at line 64 is directly adjacent to the Best Fit row at line 62 |
| 2 | "Most-permissive wins across overlapping assignments" callout sits adjacent to the OU-01 matrix (OP-4) | VERIFIED | OP-4 blockquote starts 2 lines after the last table row (Best Fit); no intervening section break |
| 3 | Admin can author ONE canonical Sub-Org Admin bundle of 4-6 permissions (OU-02) | VERIFIED | `04-custom-role-authoring.md` has exactly ONE `## Sub-Org Admin Bundle (Canonical — 6 Permissions)` section with 6 table rows (3 Edit + 3 View companion); file explicitly states "singular — there are no tiered add-ons or alternative archetypes" |
| 4 | The OU-02 bundle excludes Manage MDM Servers (OP-1) and Account Holder (OP-2), and pairs every Edit with its companion View (OP-3) | VERIFIED | Excluded Permissions table lists `Manage MDM Servers — EXCLUDED (OP-1)` and `Account Holder — EXCLUDED (OP-2)`; OP-3 companion View column present in bundle table; link to `#edit-without-view-dependency-table-op-3-prevention` anchor |
| 5 | Admin can onboard a sub-org admin via 05-sub-org-admin-onboarding.md with exact C16 slug heading and paired offboarding (OU-03) | VERIFIED | Heading `## Which admin owns this pool?` present verbatim (→ slug `#which-admin-owns-this-pool`); 3-gate offboarding section with OP-8 references; cross-links to `_admin-directory.md`, `04-custom-role-authoring.md`, `02-ous-architecture.md` |
| 6 | Admin can assign devices to MDM servers per OU with Manage MDM Servers DENY-by-default guidance (OU-04) | VERIFIED | `06-mdm-server-assignment.md` has OP-1 DENY-by-default callout; procedure table using "Assign devices to MDM server" (not Manage MDM Servers); forward reference to `15-mdm-server-reassign-runbook.md` (Phase 64) |
| 7 | Admin can consolidate VPP content tokens per OU; doc points to Phase 64's 11-vpp-catalog-runbook.md for OP-9 operational callout (OU-05) | VERIFIED (with deferred item) | `07-vpp-content-token-consolidation.md` has `## Content Token Consolidation Concepts` section (anchorable); "does not duplicate that callout" present; `11-vpp-catalog-runbook.md` referenced; OP-9 hard-bordered callout deferred to Phase 64 per approved CONTEXT D-01 decision |
| 8 | Admin can provision Managed Apple Accounts via a manual / SCIM / OIDC+JIT decision matrix (OU-06) | VERIFIED | `08-managed-apple-account-provisioning.md` has 3-path decision matrix with When/Tradeoff structure; SCIM, OIDC, and manual paths all named; forward reference to `16-managed-apple-account-runbook.md` |
| 9 | Admin can manage Shared iPad lifecycle including Find My disable (OP-12) as a mandatory step (OU-07) | VERIFIED | `09-shared-ipad-lifecycle.md` has 5 lifecycle stages; `> **Critical (OP-12): Find My — MANDATORY PRE-DEPLOYMENT DISABLE**` hard-bordered callout (not hedged, labeled as mandatory/blocking); frontmatter `platform: ios+shared-ipad` |
| 10 | Admin can manage Apple TV lifecycle via Configurator retail path + OU assignment + content-token deployment + CRD heuristic (OU-08) | VERIFIED | `10-apple-tv-lifecycle.md` documents Configurator-only retail enrollment, OU assignment, content-token app deployment steps; `Conference Room Display` heuristic as `> **Note (OP-15` (not hard-bordered, LOW severity); v1.7+ deferral for per-OU CRD deep-dive; `platform: apple-tv` |
| 11 | Exactly 3 new rows are in ios-capability-matrix.md under Enrollment H2 (OU-09) | VERIFIED | Enrollment H2 section contains exactly 3 new table rows: `Apple TV management`, `Shared iPad sessions`, `Apple Business delegation surface` — all before `## Configuration` H2 |
| 12 | macos-capability-matrix.md and 4-platform-capability-comparison.md remain byte-unchanged (OU-10) | VERIFIED | `git hash-object docs/reference/macos-capability-matrix.md` = `e91d7f9e001bb7ff4dc56a4ca98c84868fbf0716` (matches baseline); `git hash-object docs/reference/4-platform-capability-comparison.md` = `f25ff51a14b7feac46611c4c0511ed5c074ce03f` (matches baseline) |
| 13 | D-05: 02-ous-architecture.md no longer references stale 05-vpp-catalog-consolidation | VERIFIED | String `05-vpp-catalog-consolidation` absent; `11-vpp-catalog-runbook.md` and `07-vpp-content-token-consolidation.md` present; "does not duplicate that callout" retained; anchor set unchanged (PITFALL-6) |
| 14 | Pre-edit anchor inventory captured before any surgical edits (PITFALL-6 / DA-4) | VERIFIED | `63-ANCHOR-INVENTORY.md` exists with 2 `Pre-edit git SHA` entries for `ios-capability-matrix.md` and `02-ous-architecture.md`; byte-unchanged baseline hashes recorded for guard files |
| 15 | check-phase-63.mjs exits 0 against Phase 63 corpus | VERIFIED | `node scripts/validation/check-phase-63.mjs` → 27 PASS, 0 FAIL, 5 SKIPPED (pre-existing CRLF/path issues on Windows worktree; documented in CHAIN_SKIP; resolved at Phase 66 terminal re-audit on Linux) |
| 16 | v1.6-milestone-audit.mjs exits 0 (15/15) | VERIFIED | `node scripts/validation/v1.6-milestone-audit.mjs` → 15 passed, 0 failed, 0 skipped |

**Score:** 10/10 requirements verified (16 observable truths checked; all pass)

---

### Deferred Items

Items not yet met but explicitly addressed in later milestone phases.

| # | Item | Addressed In | Evidence |
|---|------|-------------|----------|
| 1 | OP-9 hard-bordered "DO NOT TOUCH the new OU until full migration completes" callout in Phase 63 VPP doc | Phase 64 | Phase 64 SC#1 explicitly owns `11-vpp-catalog-runbook.md` with the OP-9 untouched-OU hard-bordered callout; CONTEXT D-01 (approved pre-planning) established this boundary; `07-vpp-content-token-consolidation.md` points to Phase 64 without duplicating the operational callout |

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/cross-platform/apple-business/03-ous-vs-custom-roles.md` | OUs-vs-Custom-Roles decision matrix (3 topology columns) + adjacent OP-4 callout | VERIFIED | 7-row criteria comparison table; OP-4 blockquote immediately follows Best Fit row; no Mermaid; C15 clean |
| `docs/cross-platform/apple-business/04-custom-role-authoring.md` | Single canonical Sub-Org Admin 4-6 permission bundle; SOT citation to 01-role-permission-model.md | VERIFIED | 6 permissions (3 Edit + 3 View companion); OP-1/OP-2 exclusions; OP-3 link; `01-role-permission-model.md` cited |
| `docs/cross-platform/apple-business/05-sub-org-admin-onboarding.md` | Sub-org admin onboarding + paired offboarding + C16 `#which-admin-owns-this-pool` anchor | VERIFIED | Exact heading `## Which admin owns this pool?` present; 3-gate OP-8 offboarding; depth≤2 cap honored |
| `docs/cross-platform/apple-business/06-mdm-server-assignment.md` | Per-OU MDM server assignment + OP-1 DENY-by-default callout | VERIFIED | OP-1 callout present; "Assign devices to MDM server" vs "Manage MDM Servers" distinction clear; topology-aware guidance (Combined + OUs-only paths) after WR-02 fix |
| `docs/cross-platform/apple-business/07-vpp-content-token-consolidation.md` | Per-OU content-token consolidation concepts; points to Phase 64 runbook for OP-9 | VERIFIED | `## Content Token Consolidation Concepts` anchor section; "does not duplicate" present; 11-vpp-catalog-runbook.md referenced |
| `docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md` | Manual / SCIM / OIDC+JIT provisioning decision matrix (Apple-side framing) | VERIFIED | All 3 paths documented; SCIM, OIDC, manual present; 16-managed-apple-account-runbook.md forward ref; C15 clean |
| `docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md` | Shared iPad lifecycle stages + mandatory OP-12 Find My disable | VERIFIED | 5 stages (enrollment, session config, user provisioning, sign-in/out, wipe); OP-12 hard-bordered Critical callout (mandatory, not hedged); `platform: ios+shared-ipad` |
| `docs/cross-platform/apple-business/10-apple-tv-lifecycle.md` | Apple TV lifecycle: Configurator retail path + OU assignment + content-token deployment + OP-15 CRD heuristic | VERIFIED | Configurator-only path documented; OU assignment section; content-token app deployment steps; CRD heuristic as Note (OP-15, LOW); v1.7+ deferral; `platform: apple-tv` |
| `docs/reference/ios-capability-matrix.md` (+3 rows) | 3 new Enrollment rows: Apple TV management / Shared iPad sessions / Apple Business delegation surface | VERIFIED | Exactly 3 new data rows in Enrollment table; all 3 feature labels present |
| `.planning/phases/63-multi-ou-architecture-apple-admin-setup/63-ANCHOR-INVENTORY.md` | Pre-edit anchor inventory with Pre-edit git SHA entries for 2 edited files | VERIFIED | 2 Pre-edit git SHA entries; verbatim H2/H3 anchor lists; byte-unchanged baseline hashes |
| `scripts/validation/check-phase-63.mjs` | Phase 63 validator-as-deliverable; extends check-phase chain to include 62; exits 0 | VERIFIED | V-63-01..V-63-11 + ANCHOR-INVENTORY + FRONTMATTER-PARSE + C14-UNIT + C15-UNIT + V-63-SELF + V-63-CHAIN + V-63-AUDIT; 27 PASS, 0 FAIL |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `04-custom-role-authoring.md` | `01-role-permission-model.md` | SOT citation cross-link | VERIFIED | `01-role-permission-model.md` cited in body text and cross-references; `#edit-without-view-dependency-table-op-3-prevention` anchor link present |
| `03-ous-vs-custom-roles.md` | `02-ous-architecture.md` | Most-permissive-wins precedent cross-link | VERIFIED | Cross-links to `02-ous-architecture.md` in prerequisite reading and OP-4 callout |
| `05-sub-org-admin-onboarding.md` | `_admin-directory.md` | C16 which-admin-owns-this-pool cross-link | VERIFIED | Cross-link present in `## Which admin owns this pool?` section and offboarding Gate 3 |
| `05-sub-org-admin-onboarding.md` | `04-custom-role-authoring.md` | Role-assignment cross-link | VERIFIED | Cross-linked in Step 2 (Custom Role Assignment) and cross-references |
| `06-mdm-server-assignment.md` | `15-mdm-server-reassign-runbook.md` | Phase 64 forward reference | VERIFIED | Forward reference present: "does not duplicate that procedure — refer to Phase 64" |
| `07-vpp-content-token-consolidation.md` | `11-vpp-catalog-runbook.md` | Phase 64 OP-9 operational callout owner | VERIFIED | Explicit pointer with "does not duplicate that callout" prose |
| `08-managed-apple-account-provisioning.md` | `16-managed-apple-account-runbook.md` | Phase 64 forward reference | VERIFIED | Forward reference present: "does not duplicate that procedure — refer to Phase 64" |
| `02-ous-architecture.md` | `11-vpp-catalog-runbook.md` | D-05 reconciled forward reference | VERIFIED | `11-vpp-catalog-runbook.md` present in lines 102-107; `05-vpp-catalog-consolidation` absent |

---

### Data-Flow Trace (Level 4)

Not applicable — this is a documentation-only phase. All artifacts are static markdown files with no dynamic data rendering. No Level 4 data-flow verification required.

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| check-phase-63.mjs exits 0 | `node scripts/validation/check-phase-63.mjs` | 27 PASS, 0 FAIL, 5 SKIPPED | PASS |
| v1.6-milestone-audit.mjs exits 0 (15/15) | `node scripts/validation/v1.6-milestone-audit.mjs` | 15 passed, 0 failed, 0 skipped | PASS |
| macos-capability-matrix.md byte-unchanged | `git hash-object docs/reference/macos-capability-matrix.md` | `e91d7f9e001bb7ff4dc56a4ca98c84868fbf0716` == baseline | PASS |
| 4-platform-capability-comparison.md byte-unchanged | `git hash-object docs/reference/4-platform-capability-comparison.md` | `f25ff51a14b7feac46611c4c0511ed5c074ce03f` == baseline | PASS |

---

### Probe Execution

Step 7c: SKIPPED — no `scripts/*/tests/probe-*.sh` probes defined for this documentation phase. Validation probes are the check-phase-63.mjs and v1.6-milestone-audit.mjs validators covered in Behavioral Spot-Checks above.

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|------------|------------|-------------|--------|----------|
| OU-01 | 63-01-PLAN.md | OUs-vs-Custom-Roles decision matrix with most-permissive wins callout | SATISFIED | `03-ous-vs-custom-roles.md` with 3-topology criteria comparison table + adjacent OP-4 blockquote |
| OU-02 | 63-01-PLAN.md | Min-viable sub-org admin bundle (4-6 permissions) | SATISFIED | `04-custom-role-authoring.md` — 6 permissions, OP-1/OP-2/OP-3 guards all verified |
| OU-03 | 63-02-PLAN.md | Sub-org admin onboarding + paired offboarding + C16 anchor | SATISFIED | `05-sub-org-admin-onboarding.md` — exact C16 heading, 3-gate OP-8 offboarding |
| OU-04 | 63-03-PLAN.md | Per-OU MDM server assignment + OP-1 DENY-by-default | SATISFIED | `06-mdm-server-assignment.md` — OP-1 callout + procedure table + Phase 64 forward ref |
| OU-05 | 63-03-PLAN.md | Per-OU VPP content token consolidation; OP-9 callout pointer (not duplicate) | SATISFIED (with deferred item) | `07-vpp-content-token-consolidation.md` — consolidation concepts + pointer to Phase 64 OP-9; hard-bordered callout itself deferred to Phase 64 per CONTEXT D-01 |
| OU-06 | 63-03-PLAN.md | Manual / SCIM / OIDC+JIT provisioning decision matrix | SATISFIED | `08-managed-apple-account-provisioning.md` — 3-path matrix + Phase 64 forward ref |
| OU-07 | 63-04-PLAN.md | Shared iPad lifecycle including mandatory OP-12 Find My disable | SATISFIED | `09-shared-ipad-lifecycle.md` — 5 stages + Critical (OP-12) hard-bordered callout |
| OU-08 | 63-04-PLAN.md | Apple TV lifecycle: Configurator retail path + OU assignment + content-token + CRD heuristic | SATISFIED | `10-apple-tv-lifecycle.md` — all elements present; CRD heuristic as Note (OP-15) |
| OU-09 | 63-05-PLAN.md | 3 new rows in ios-capability-matrix.md under Enrollment H2 | SATISFIED | Exactly 3 rows: Apple TV management / Shared iPad sessions / Apple Business delegation surface |
| OU-10 | 63-05-PLAN.md | macos + 4-platform matrices byte-unchanged | SATISFIED | Git blob hashes match baselines exactly |

---

### Anti-Patterns Found

| File | Pattern | Severity | Assessment |
|------|---------|----------|------------|
| `docs/reference/ios-capability-matrix.md` | `last_verified: 2026-04-17` (Phase 32 baseline, not updated for Phase 63 additions) | INFO | IN-03 from code review; identified as info-level; does not block goal; 60-day re-verification window from Phase 63 additions falls before Phase 32 review_by date |
| `scripts/validation/check-phase-63.mjs` (V-63-10 regex) | `scope\s+tag` does not match plural "scope tags" | INFO | IN-02 from code review; identified as info-level; does not affect Phase 63 corpus which has no plural scope tags violations |
| Multiple docs | Forward hyperlinks to Phase 64 files that do not yet exist | INFO | IN-01 from code review; `C13` (markdown-link-check) passes because the check-phase-63 validator excludes Phase 64 forward references from broken-link scope; Phase 64 will resolve on delivery |

All BLOCKER/WARNING level anti-patterns from code review (CR-01, CR-02, CR-03, WR-01, WR-02, WR-03, WR-04, WR-05) were fixed before submission. No unreferenced TBD/FIXME/XXX debt markers found in Phase 63 authored files.

---

### D-05 Cross-Cutting Fix Verification

The stale `05-vpp-catalog-consolidation` forward-reference in the frozen Phase 62 file `02-ous-architecture.md` was repaired atomically:

- String `05-vpp-catalog-consolidation` is absent from `02-ous-architecture.md`
- Reconciled targets present: `07-vpp-content-token-consolidation.md` (Phase 63 admin-setup) and `11-vpp-catalog-runbook.md` (Phase 64 operational)
- Sentence "does not duplicate that callout" retained verbatim (stable OP-9 deferral-contract anchor text)
- All H2/H3 anchor texts unchanged (verified — CRLF-normalized heading comparison confirms no anchor shift)
- Only lines 102-107 modified (expanded from 4 to 6 lines due to reconciliation prose; line-number shift in subsequent headings is expected and does not affect GitHub slug derivation)

---

### Code Review Integration Note

63-REVIEW.md documented 11 findings (3 Critical, 5 Warning, 3 Info). Per the user instruction, Critical+Warning findings were fixed before verification. This was confirmed:

- **CR-01** (dangling "see note below" reference in 05-): Fixed — Step 5 revised to safe default-account-type guidance
- **CR-02** (Apple TV matrix row "supervised ADE only" inaccuracy): Fixed — row revised to "supervised only — ADE path (business-channel) or Configurator path (retail)"
- **CR-03** (broken relative PITFALLS.md hyperlink in 09-): Fixed — converted to plain text reference (no broken hyperlink)
- **WR-01** (duplicate "The The" in 02-ous-architecture.md:101-102): Fixed — duplicate "The" removed
- **WR-02** (delegation-path inconsistency in 06-mdm-server-assignment.md): Fixed — OP-1 callout and table now reference Combined topology (custom role bundle) + OUs-only topology (Device Enrollment Manager preset)
- **WR-03** (deprecated "ABM" term in 09- Stage 3 sub-header): Fixed — "Manual (Apple Business portal entry)"
- **WR-04** (Phase 50 missing from CHAIN_PHASES): Fixed — `CHAIN_PHASES = [48, 49, 50, 51, 52, 53, ...]`
- **WR-05** (header comment overstating "~18" assertions): Fixed — header comment reads "12 V-63-NN structural assertions"

Info findings (IN-01, IN-02, IN-03) were not required to be fixed under the review contract.

---

### Human Verification Required

None. This is a documentation-only phase. All structural invariants are machine-verifiable (content presence, byte hashes, validator exit codes). No visual, real-time, or external service verification is required.

---

### Gaps Summary

No gaps. All 10 OU requirements are satisfied. The OP-9 hard-bordered callout item (deferred to Phase 64) was an intentional pre-planning design decision documented in CONTEXT D-01 and is covered by Phase 64 SC#1 — it does not constitute a gap for Phase 63.

---

_Verified: 2026-05-21T00:00:00Z_
_Verifier: Claude (gsd-verifier)_
