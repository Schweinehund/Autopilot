---
phase: 65-apple-business-l1-l2-hub-navigation-integration
plan: "01"
subsystem: validation-scaffold
tags: [validator-as-deliverable, anchor-inventory, wave-1-gate, c16, abaudit]
dependency_graph:
  requires: []
  provides: [check-phase-65.mjs, 65-CONVENTIONS.md, 65-ANCHOR-INVENTORY.md]
  affects: [scripts/validation/check-phase-65.mjs]
tech_stack:
  added: []
  patterns: [validator-as-deliverable, path-a-copy, anchor-inventory-gate]
key_files:
  created:
    - scripts/validation/check-phase-65.mjs
    - .planning/phases/65-apple-business-l1-l2-hub-navigation-integration/65-CONVENTIONS.md
    - .planning/phases/65-apple-business-l1-l2-hub-navigation-integration/65-ANCHOR-INVENTORY.md
  modified: []
decisions:
  - "CHAIN_PHASES extends to [48..64]; CHAIN_SKIP={48,51,58,60,61} unchanged"
  - "V-65-01..V-65-14 assert pending Wave 2-4 deliverables; all fail at Wave 1 scaffold time with descriptive messages"
  - "V-65-AUDIT delegates all C16 logic to v1.6-milestone-audit.mjs subprocess (no duplication)"
  - "ABAUDIT-24 reserved for L2 #26 Intune-scope leaf Option B only; Option A recommended"
metrics:
  duration: "~25 minutes"
  completed: "2026-05-22"
  tasks: 3
  files: 3
---

# Phase 65 Plan 01: Wave-1 Gate Scaffold Summary

**One-liner:** Wave-1 validator scaffold (`check-phase-65.mjs` + `65-CONVENTIONS.md` + `65-ANCHOR-INVENTORY.md`) — 17-assertion gate for C16 triangle close, PITFALL-6 baseline, and locked-string registry for all Wave 2-5 tasks.

## What Was Built

### Task 1: 65-CONVENTIONS.md (commit `0090a3e`)

Wave-1 locked-string contract. Records:
- Exact 5-field frontmatter for L1 #34 (`platform: ios+macos+shared-ipad`) and L2 #26
- 4 C16 load-bearing substrings verbatim (with C16 edge IDs and harness line numbers)
- H2 title lock: `## Apple Business Quick Reference` (slug `#apple-business-quick-reference` is C16 load-bearing — DO NOT REWORD)
- ABAUDIT-24 reservation (next after ABAUDIT-23 in `18-cross-org-boundary-cheat-sheet.md`); Option A recommended
- C15 regex set the L2 #26 Intune-scope leaf must dodge (regex 1: `/\bIntune\s+(RBAC|role...)/i`; regex 4: `/\bIntune[-\s]side\b.{0,40}\b(delegat|RBAC...)/i`)
- Atomic-trio 3-sub-action INDIVISIBLE contract (12- back-link + 4 allowlist removals + V-64-05 flip)
- Hub-file insertion points (verified line numbers from 65-RESEARCH.md)
- CHAIN_PHASES `[48..64]` / CHAIN_SKIP `{48,51,58,60,61}` unchanged

### Task 2: 65-ANCHOR-INVENTORY.md (commit `523899f`)

PITFALL-6 / SC#5 pre-edit anchor baseline. H2/H3 anchor slug snapshots captured for all 6 files before any Wave 2-4 edits:

| File | H2 Count | H3 Count | Total Headings |
|------|----------|----------|----------------|
| `12-shared-ipad-passcode-reset.md` | 5 (incl. H1) | 5 | 10 |
| `common-issues.md` | 7 | 25+ | 43 |
| `quick-ref-l1.md` | 8 | 20+ | 29 |
| `quick-ref-l2.md` | 8 | 22+ | 34 |
| `operations/00-index.md` | 5 (incl. H1) | 0 | 5 |
| `docs/index.md` | 7 | 17+ | 26+ |

Flags:
- `#cross-references` in `12-` flagged as D-04a append target (line 187)
- `#operations` and `#cross-platform-references` in `docs/index.md` flagged MUST-REMAIN-STABLE
- `apple-business-quick-reference` slug flagged as TO-BE-CREATED (not present pre-edit) for `quick-ref-l1.md` (C16 load-bearing)
- ABAUDIT-06 (line 13) + ABAUDIT-07 (line 116) in `12-` documented as unshifted by Wave 4 append at `:194`

### Task 3: check-phase-65.mjs (commit `c25fa10`)

17-assertion validator scaffold. Wave 1 execution state:

| Assertion | Status | Reason |
|-----------|--------|--------|
| V-65-01: L1 #34 exists | FAIL | Plan 65-02 Wave 2 deliverable |
| V-65-02: L1 #34 platform frontmatter | FAIL | Plan 65-02 Wave 2 deliverable |
| V-65-03: L1 #34 12-shared-ipad-passcode-reset | FAIL | Plan 65-02 Wave 2 deliverable |
| V-65-04: L1 #34 #which-admin-owns-this-pool | FAIL | Plan 65-02 Wave 2 deliverable |
| V-65-05: L2 #26 exists | FAIL | Plan 65-03 Wave 2 deliverable |
| V-65-06: L2 #26 7-leaf Mermaid | FAIL | Plan 65-03 Wave 2 deliverable |
| V-65-07: common-issues.md AB H2 | FAIL | Plan 65-03 Wave 3 deliverable |
| V-65-08: quick-ref-l1.md AB Quick Reference | FAIL | Plan 65-03 Wave 3 deliverable |
| V-65-09: quick-ref-l2.md AB Quick Reference | FAIL | Plan 65-03 Wave 3 deliverable |
| V-65-10: operations/00-index.md AB section | FAIL | Plan 65-03 Wave 3 deliverable |
| V-65-11: docs/index.md AB under Operations | FAIL | Plan 65-03 Wave 3 deliverable |
| V-65-12: 12- 34-apple-business back-link | FAIL | Plan 65-04 Wave 4 atomic-trio |
| V-65-13: allowlist 0 sunset-65 entries | FAIL | Plan 65-04 Wave 4 atomic-trio |
| V-65-14: V-64-05 old detail string absent | FAIL | Plan 65-04 Wave 4 atomic-trio |
| V-65-CHAIN-{48..64} | 9 PASS, 5 SKIP | SKIP={48,51,58,60,61} pre-existing |
| V-65-AUDIT | PASS | v1.6 harness exits 0 |
| V-65-SELF | PASS | 65 absent from CHAIN_PHASES |

**Wave 1 result: 14 PASS, 14 FAIL, 5 SKIPPED — exits 1 (expected; all FAILs are pending Wave 2-4 deliverables)**

## Verification

- `node --check scripts/validation/check-phase-65.mjs` exits 0 (syntactically valid ESM)
- `node scripts/validation/check-phase-65.mjs` exits 1 with `Result: 14 PASS, 14 FAIL, 5 SKIPPED`
- `node scripts/validation/check-phase-64.mjs` exits 0 — Phase 64 chain untouched (expected; flip happens in Wave 4)
- All 3 Wave-1 artifacts exist on disk

## ABAUDIT-24 Allocation

ABAUDIT-24 is RESERVED but NOT YET ALLOCATED. It will be allocated in Plan 65-03 (Wave 2 L2 #26 authoring) if and only if the L2 #26 Intune-scope leaf callout requires Option B (use banned phrases + ABAUDIT exemption). Option A (avoid the phrases via scope-boundary callout language) is the recommended approach per 65-CONVENTIONS.md §3.

## 4 Sunset-65 Allowlist Entries (Wave 4 removes)

The following 4 entries in `scripts/validation/v1.6-audit-allowlist.json` `c16_missing_endpoint_exemptions` are scheduled for removal by the Plan 65-04 Wave 4 atomic commit:

1. `docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md` (`sunset_phase: "65"`)
2. `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md` (`sunset_phase: "64-65"`)
3. `docs/common-issues.md#apple-business-governance-failure-scenarios` (`sunset_phase: "65"`)
4. `docs/quick-ref-l1.md#apple-business-quick-reference` (`sunset_phase: "65"`)

V-65-13 asserts `c16_missing_endpoint_exemptions.length === 0` post-Wave-4.

## Captured H2/H3 Anchor Count per File

(From 65-ANCHOR-INVENTORY.md; full tables in that artifact)

| File | Anchors Captured | Key Flags |
|------|------------------|-----------|
| `12-shared-ipad-passcode-reset.md` | 10 headings | #cross-references = D-04a target; ABAUDIT-06 line 13, ABAUDIT-07 line 116 |
| `common-issues.md` | 43 headings | insertion point line 337 |
| `quick-ref-l1.md` | 29 headings | #apple-business-quick-reference to-be-created (C16 load-bearing) |
| `quick-ref-l2.md` | 34 headings | insertion point line 329 |
| `operations/00-index.md` | 5 headings | insertion point line 63 |
| `docs/index.md` | 26+ headings | #operations + #cross-platform-references MUST-REMAIN-STABLE |

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check

Checking file existence and commit hashes...

## Self-Check: PASSED

- `scripts/validation/check-phase-65.mjs`: FOUND
- `.planning/phases/65-apple-business-l1-l2-hub-navigation-integration/65-CONVENTIONS.md`: FOUND
- `.planning/phases/65-apple-business-l1-l2-hub-navigation-integration/65-ANCHOR-INVENTORY.md`: FOUND
- Commit `0090a3e` (65-CONVENTIONS.md): FOUND
- Commit `523899f` (65-ANCHOR-INVENTORY.md): FOUND
- Commit `c25fa10` (check-phase-65.mjs): FOUND
