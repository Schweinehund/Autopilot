---
phase: 64-apple-business-delegation-runbooks
plan: 01
subsystem: apple-business-validation
tags: [validator, conventions, wave-1-contract, hard-callout, abaudit]
dependency_graph:
  requires: [check-phase-63.mjs, v1.6-milestone-audit.mjs]
  provides: [check-phase-64.mjs, 64-CONVENTIONS.md]
  affects: [wave-2-runbooks-11-18]
tech_stack:
  added: []
  patterns: [path-a-copy-validator, locked-string-contract, abaudit-registry]
key_files:
  created:
    - scripts/validation/check-phase-64.mjs
    - .planning/phases/64-apple-business-delegation-runbooks/64-CONVENTIONS.md
  modified: []
decisions:
  - "Locked 4 exact hard-callout opening strings in 64-CONVENTIONS.md as the Wave-1 contract both the validator and Wave-2 runbooks reference"
  - "V-64-08 scoped to action runbooks 11-17 only; 18-cross-org-boundary-cheat-sheet.md explicitly exempt (reference cheat-sheet with no single delegated action)"
  - "ABAUDIT-05..20 reserved block established; specific number assignments deferred to Wave 2 task order"
  - "CHAIN_PHASES includes 63, excludes 64 per V-64-SELF anti-self-recursion invariant"
metrics:
  duration: "~10 minutes"
  completed: 2026-05-22
  tasks_completed: 2
  files_created: 2
---

# Phase 64 Plan 01: Wave-1 Foundation — Validator + Convention Contract Summary

**One-liner:** Phase 64 Wave-1 foundation: locked hard-callout strings (OP-9/OP-11/OP-6/OP-5) + ABAUDIT-05..20 registry in 64-CONVENTIONS.md; check-phase-64.mjs Path-A validator with V-64-01..V-64-SELF assertions confirming Wave-2 contract byte-for-byte.

---

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Author 64-CONVENTIONS.md Wave-1 contract | 8fc7109 | `.planning/phases/64-apple-business-delegation-runbooks/64-CONVENTIONS.md` |
| 2 | Build check-phase-64.mjs validator | 3d16120 | `scripts/validation/check-phase-64.mjs` |

---

## What Was Built

### Task 1: 64-CONVENTIONS.md

The locked Wave-1 contract artifact. Contains:
- 4 exact hard-callout opening strings (the byte-for-byte strings `check-phase-64.mjs` asserts and Wave-2 runbooks must contain)
- Full callout body templates for OP-9, OP-11, OP-6, OP-5
- D-04 Refined-C gate table: L2 approval clause ONLY on 12- Path C (OP-11); absent from OP-9/OP-6/OP-5
- ABAUDIT-05..20 reserved block with scoping rule (comment on line i exempts ONLY line i+1)
- Per-runbook `platform:` frontmatter values table (ios+macos+shared-ipad for 12-; ios+ipados+macos+tvos for 11-/13-/14-/15-/17-/18-)
- Locked 5-field envelope spec (last_verified: 2026-05-22 / review_by: 2026-07-21)
- C16 constraint: 12- must NOT contain `34-apple-business` in Phase 64
- Hard-callout convention definition (Phase 64 first realization; ⛔ glyph + --- separator pattern)

### Task 2: check-phase-64.mjs

Path-A copy of check-phase-63.mjs with Phase 64 constants and assertions:

- **Constants:** `AB_11`..`AB_18` pointing at all 8 delegation runbooks; `HARNESS` for v1.6-milestone-audit.mjs
- **CHAIN_PHASES:** `[48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]` — includes 63, excludes 64
- **CHAIN_SKIP:** `Set([48, 51, 58, 60, 61])` — carries forward all pre-existing skip entries
- **V-64-01:** All 8 files exist
- **V-64-02:** `11-` OP-9 exact opening string `> **⛔ Untouched-OU — DO NOT ACT until migration completes (OP-9)**`
- **V-64-03:** `12-` Path A < Path B < Path C ordering (indexOf; accepts ### or ## heading level)
- **V-64-04:** `12-` OP-11 exact opening string `> **⛔ MDM EraseDevice — DESTRUCTIVE / L2 approval required (OP-11)**`
- **V-64-05:** `12-` does NOT contain `34-apple-business` (negative assertion; C16 Phase 65 gate)
- **V-64-06:** All 8 frontmatter contain `last_verified:`
- **V-64-07:** All 8 frontmatter contain `platform:`
- **V-64-08:** Action runbooks `11-`–`17-` ONLY contain `## Required Role & Permission` (18- explicitly exempt in comment)
- **V-64-09:** All 8 contain `## Verification`
- **V-64-10:** C15 framing guard — full 8-regex C15_BANNED set with ABAUDIT allowlist (matches v1.6-milestone-audit.mjs lines 718-727)
- **V-64-ANTIPROLIFERATION:** No `15b-` or `15-mdm-server-reassign-2` sibling exists
- **V-64-CHAIN:** Regression-guard loop over check-phase-48..63
- **V-64-AUDIT:** v1.6-milestone-audit.mjs subprocess exits 0
- **V-64-SELF:** CHAIN_PHASES does NOT include 64

**Validation run result (Wave 1, before Wave 2 runbooks exist):**
- 14 PASS, 10 FAIL, 5 SKIPPED — exit code 1 (expected)
- All 10 FAILs report "file missing" for the 11-..18- runbooks (Wave 2 work)
- CHAIN, AUDIT, SELF, ANTIPROLIFERATION all PASS
- No crashes, no thrown errors — validator runs cleanly to exit code 1

---

## Deviations from Plan

None — plan executed exactly as written.

The `V-64-10` C15 framing guard was implemented with the full 8-regex set from `v1.6-milestone-audit.mjs` lines 718-727 (same logic as V-63-10), consistent with the plan's instruction to "replicate the check-phase-63 V-63-10 ABAUDIT line-pair allowlist logic."

---

## Decisions Made

1. **Locked callout strings** — The 4 exact opening strings from 64-PATTERNS.md are locked in both 64-CONVENTIONS.md and check-phase-64.mjs; any deviation in Wave-2 runbooks will produce a V-64-02/V-64-04 FAIL.

2. **V-64-08 scope** — `## Required Role & Permission` asserted only for the 7 action runbooks (`11-`–`17-`); `18-cross-org-boundary-cheat-sheet.md` is explicitly exempt because it is a reference document with no single delegated action (as specified in plan critical_contract_note and task acceptance criteria).

3. **ABAUDIT-05..20 reserved** — Generous block established; Wave 2 authors assign specific numbers per task order. The `18-` disambiguation table has highest ABAUDIT density and gets first allocation starting at ABAUDIT-05.

4. **V-64-05 negative assertion** — Implemented as `c.includes('34-apple-business')` — exact string match guards against accidentally adding the C16 forward link before Phase 65.

5. **CHAIN_SKIP unchanged** — No new entries added; all 5 pre-existing skip entries (48/51/58/60/61) documented with root cause attribution per the Phase 63 pattern.

---

## Known Stubs

None. This plan creates a validator (code) and a convention document (reference artifact). Neither contains placeholder data that flows to UI rendering. The validator correctly reports FAIL for Wave-2 runbooks not yet authored — this is intentional and documented in the acceptance criteria.

---

## Threat Flags

None. No new network endpoints, auth paths, file access patterns, or schema changes introduced. The validator is a read-only Node.js script that inspects files via `fs.readFileSync` and invokes prior validators as subprocesses. No new security surface.

---

## Self-Check: PASSED

| Item | Status |
|------|--------|
| `scripts/validation/check-phase-64.mjs` exists | FOUND |
| `.planning/phases/64-apple-business-delegation-runbooks/64-CONVENTIONS.md` exists | FOUND |
| Commit `8fc7109` (Task 1) | FOUND |
| Commit `3d16120` (Task 2) | FOUND |
