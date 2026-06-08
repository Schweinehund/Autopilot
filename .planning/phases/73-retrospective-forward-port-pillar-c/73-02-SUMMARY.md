---
phase: 73-retrospective-forward-port-pillar-c
plan: "02"
subsystem: chain-validators
tags: [retro-02, frozen-aware-conversion, atomic-sc4, chain-apex, chain-degraded-closed]
dependency_graph:
  requires: [73-01]
  provides: [check-phase-61-V61-17..20-converted, check-phase-67-V67-05/06-fixed, check-phase-70-V70-24-fixed, V17_CLOSEGATE-4df3a16, V-73-CONVERT-NN-x8]
  affects: [check-phase-{61,67,70}.mjs, scripts/validation/_lib/frozen-at-close.mjs, check-phase-73.mjs]
tech_stack:
  added: []
  patterns: [frozen-aware-conversion-retro-02, additive-v17-closegate, rule1-wrong-sha-fix, rule1-wrong-pattern-fix]
key_files:
  created: []
  modified:
    - scripts/validation/check-phase-61.mjs
    - scripts/validation/check-phase-67.mjs
    - scripts/validation/check-phase-70.mjs
    - scripts/validation/check-phase-73.mjs
    - scripts/validation/_lib/frozen-at-close.mjs
decisions:
  - "V-67-05/06 COMPLEX_CONVERSION: alternative root cause — not wrong SHA (aa6de68 has content), but wrong assertion PATTERNS (literal OP-10 / Version History heading never written into corpus files). Fix: assert actual callout text + SWEEP-02 date rows."
  - "V-70-24 Rule 1 bug fix (out-of-inventory): readProjectAtV17Close() (aa6de68) only has 7/12 v1.7 reqs; 4df3a16 (Plan 70-05 Commit B = true close-gate) has all 12. Added V17_CLOSEGATE:4df3a16 to _lib/frozen-at-close.mjs + new readProjectAtV17CloseGate() helper (ADD-not-MODIFY per D-02 carve-out)."
  - "CHAIN-70 required V-70-24 fix to pass: V-73-CHAIN-70 FAIL had two independent root causes (cascade from V-61/67 + V-70-24 independent wrong-SHA FAIL); both fixed in same atomic SHA."
  - "V17_CLOSEGATE additive to _lib/frozen-at-close.mjs: Plan 73-03 V-73-LIB-EXISTS only checks original 4 keys (V141/V15/V16/V17); additive V17_CLOSEGATE entry is non-breaking."
metrics:
  duration_seconds: ~2400
  tasks_completed: 3
  files_changed: 5
  completed_date: "2026-06-08"
one-liner: "Atomic SC#4 landing of RETRO-02 frozen-aware conversion (6 assertion fixes across check-phase-{61,67,70}.mjs + V17_CLOSEGATE entry in _lib/frozen-at-close.mjs + 8-entry V-73-CONVERT-NN grow in check-phase-73.mjs), closing all 8 CHAIN-DEGRADED-AT-HEAD-01 FAILs in ONE SHA (`a85da77`)."
---

# Phase 73 Plan 02: RETRO-02 Per-Validator HEAD-Coupled Assertion Conversion Summary

**One-liner:** Atomic SC#4 landing of RETRO-02 frozen-aware conversion (6 assertion fixes across check-phase-{61,67,70}.mjs + V17_CLOSEGATE entry in _lib/frozen-at-close.mjs + 8-entry V-73-CONVERT-NN grow in check-phase-73.mjs), closing all 8 CHAIN-DEGRADED-AT-HEAD-01 FAILs in ONE SHA (`a85da77`).

## Atomic Commit

**SHA:** `a85da773b3b6b5f3a4e368da756609cf22a49948` (short: `a85da77`)
**Message:** `fix(73-02): RETRO-02 per-validator HEAD-coupled assertion conversion to frozen-aware (atomic SC#4)`
**Files (5):**
1. `scripts/validation/check-phase-61.mjs` (MODIFIED — V-61-17..20 converted + readAtV15Close import added)
2. `scripts/validation/check-phase-67.mjs` (MODIFIED — V-67-05/06 assertion pattern fix)
3. `scripts/validation/check-phase-70.mjs` (MODIFIED — V-70-24 SHA fix + readProjectAtV17CloseGate helper added)
4. `scripts/validation/_lib/frozen-at-close.mjs` (MODIFIED — additive V17_CLOSEGATE:4df3a16 + readAtV17CloseGate export)
5. `scripts/validation/check-phase-73.mjs` (MODIFIED — V-73-CONVERT-NN array grown from stub to 8 entries)

## Inventory-Driven Conversion Set

**Source-of-truth:** `.planning/phases/73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md`

**CONVERT_PLAN_73_02 count:** 1 (check-phase-61.mjs — V-61-17..20 only; well below 12 anti-ballooning tripline)

**Total Plan 73-02 conversion scope** (inventory + appendix + out-of-inventory Rule 1):

| Assertion | File | Type | Conversion | Target SHA |
|-----------|------|------|------------|------------|
| V-61-17 | check-phase-61.mjs | CONVERT_PLAN_73_02 | readFile(MILESTONES_DOC) → readAtV15Close + suffix | ba2cbc0 |
| V-61-18 | check-phase-61.mjs | CONVERT_PLAN_73_02 | readFile(MILESTONES_DOC) → readAtV15Close + suffix | ba2cbc0 |
| V-61-19 | check-phase-61.mjs | CONVERT_PLAN_73_02 | readFile(MILESTONES_DOC) → readAtV15Close + suffix | ba2cbc0 |
| V-61-20 | check-phase-61.mjs | CONVERT_PLAN_73_02 | readFile(MILESTONES_DOC) → readAtV15Close + suffix | ba2cbc0 |
| V-67-05 | check-phase-67.mjs | COMPLEX_CONVERSION (appendix) | wrong pattern fix (OP-10 literal → content-token callout) | aa6de68 (unchanged) |
| V-67-06 | check-phase-67.mjs | COMPLEX_CONVERSION (appendix) | wrong pattern fix (VH heading → SWEEP-02 date rows) | aa6de68 (unchanged) |
| V-70-24 | check-phase-70.mjs | Rule 1 bug fix (out-of-inventory) | wrong SHA fix (aa6de68 → 4df3a16 close-gate) | 4df3a16 |
| V17_CLOSEGATE | _lib/frozen-at-close.mjs | Additive | new entry + readAtV17CloseGate export | 4df3a16 |

**Anti-ballooning outcome:** CONVERT_PLAN_73_02 count = 1 (check-phase-61.mjs). SCOPE-GAP-RETRO-02-OVERFLOW-01 stub trigger NOT fired (1 << 12 anti-ballooning limit). No overflow.

## V-67-05/06 Empirical SHA Determination (Open Question 1)

**Empirical investigation:**
- `git show aa6de68:docs/admin-setup-ios/05-app-deployment.md | grep OP-10` → **0 results** at both `aa6de68` and `4df3a16`
- `git show aa6de68:docs/admin-setup-ios/05-app-deployment.md` → DOES contain `"Apple calls this artifact a \"content token\""` and the `| 2026-05-26 |` SWEEP-02 change row

**Root cause determination:** The original assertions checked for WRONG PATTERNS:
- V-67-05 searched for literal `OP-10` — but "OP-10" is a PITFALLS.md pattern label, never written into corpus files. SWEEP-02 commit `55260b3` inserted a `> **Note:** Apple calls this artifact a "content token"` blockquote callout above each `## Renewal / Maintenance` table.
- V-67-06 searched for `version history` heading or `## *history` — but the deployment docs (`docs/admin-setup-ios/05-app-deployment.md` + `docs/admin-setup-macos/04-app-deployment.md`) use a bare tail table `| Date | Change | Author |` with NO `## Version History` heading. Only `docs/_glossary-macos.md` has `## Version History`.

**Decision:** SHA `aa6de68` is CORRECT for V-67-05/06 (both files have the content at `aa6de68`). The root cause was wrong assertion patterns, not wrong SHA. `V17_CLOSEGATE` was NOT needed for V-67-05/06.

**V17_CLOSEGATE was added for V-70-24** (separate Rule 1 fix): `readProjectAtV17Close()` (reads at `aa6de68`) only finds 7/12 v1.7 requirements because the remaining 5 (CHAIN-01..03, HARNESS-05/06) were added in Plan 70-05 Commit B `4df3a16` (true close-gate), not at Atom 2 `aa6de68`.

## V-73-CONVERT-NN Entries Grown

8 entries added to `check-phase-73.mjs` V-73-CONVERT-NN array:

| Entry ID | Name | File Asserted | Key Check |
|----------|------|---------------|-----------|
| CONVERT-61-17 | V-73-CONVERT-61-17 | check-phase-61.mjs | readAtV15Close import + V-61-17.*v1.5-frozen match |
| CONVERT-61-18 | V-73-CONVERT-61-18 | check-phase-61.mjs | readAtV15Close import + V-61-18.*v1.5-frozen match |
| CONVERT-61-19 | V-73-CONVERT-61-19 | check-phase-61.mjs | readAtV15Close import + V-61-19.*v1.5-frozen match |
| CONVERT-61-20 | V-73-CONVERT-61-20 | check-phase-61.mjs | readAtV15Close import + V-61-20.*v1.5-frozen match |
| CONVERT-67-05 | V-73-CONVERT-67-05 | check-phase-67.mjs | content-token callout pattern + V-67-05.*v1.7-frozen match |
| CONVERT-67-06 | V-73-CONVERT-67-06 | check-phase-67.mjs | SWEEP-02 date-row pattern + V-67-06.*v1.7-frozen match |
| CONVERT-70-24 | V-73-CONVERT-70-24 | check-phase-70.mjs | readProjectAtV17CloseGate present + 4df3a16 SHA + close-gate in name |
| CONVERT-LIB-V17-CLOSEGATE | V-73-CONVERT-LIB-V17-CLOSEGATE | _lib/frozen-at-close.mjs | V17_CLOSEGATE:4df3a16 entry + readAtV17CloseGate export |

## Chain Delta-Diff Witness

**Pre-fix baseline:** `.claude/tmp/73-chain-pre.txt` (Plan 73-01 SHA `d2b8917`)
- Result: 23 PASS, 8 FAIL, 1 SKIPPED
- FAILs: V-73-CHAIN-{61, 62, 63, 64, 65, 66, 67, 70}

**Post-fix witness:** `.claude/tmp/73-chain-post.txt` (Plan 73-02 SHA `a85da77`)
- Result: **39 PASS, 0 FAIL, 1 SKIPPED**
- FAILs: NONE

**Delta:** 8 FAIL → 0 FAIL (all V-73-CHAIN-{61..67,70} flipped to PASS)
**SKIPPED:** 1 (V-73-AUDIT = 73-VERIFICATION.md not yet authored — expected transient until Plan 73-03)

This closes the 7th entry in the chicken-and-egg accepted-residual lineage:
Plan 68-05 → 69-02 → 70-05 Commit B → 71-01 → 72-01 → 73-01 → **73-02 RESOLUTION (8-FAIL surface CLOSED)**

## Predecessor-Byte-Unchanged Invariant

`git diff 8e56086 HEAD -- <v1.4..v1.7 workflow YAMLs + milestone-audit MJS + sidecar JSONs>` → **EMPTY** (confirmed)
`node scripts/validation/v1.7-milestone-audit.mjs` → **15/15 PASS** (defense-in-depth invariant preserved)

## D-01 + D-02 Carve-Out Verification

- **D-01 preserved:** 3 helper-spawn catch blocks at check-phase-48.mjs:72, check-phase-60.mjs:188, check-phase-61.mjs:403 UNCHANGED (stderr-only carve-out — HELPER-SPAWN-STDERR-01 still deferred)
- **D-02 preserved:** Existing inline helpers `readCorpusFileAtV17Close()` / `readSidecarAtV17Close()` in check-phase-67.mjs lines 35-57 BYTE-UNCHANGED. New helper `readProjectAtV17CloseGate()` was ADDED alongside existing `readProjectAtV17Close()` in check-phase-70.mjs (ADD-not-MODIFY pattern per D-02).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] V-67-05/06 alternative root cause: wrong assertion patterns (not wrong SHA)**

- **Found during:** Task 1 empirical SHA investigation
- **Issue:** V-67-05 searched for literal `OP-10` which was a plan design label (PITFALLS.md reference) never written into corpus files. V-67-06 searched for `## Version History` heading but deploy docs use bare `| Date | Change | Author |` tables.
- **Fix:** V-67-05 now asserts the actual callout text (`"Apple calls this artifact a \"content token\""` / `"formerly \"VPP location token\""`). V-67-06 now asserts `2026-05-26.*SWEEP-02` date rows + `## Version History` for glossary.
- **SHA decision:** `aa6de68` is CORRECT (content IS present at aa6de68). No V17_CLOSEGATE needed for V-67-05/06.
- **Files modified:** `scripts/validation/check-phase-67.mjs`
- **Commit:** `a85da77` (part of atomic commit)

**2. [Rule 1 - Bug] V-70-24 wrong SHA: PROJECT.md at aa6de68 has only 7/12 v1.7 requirements**

- **Found during:** Task 3 pre-commit chain re-run (CHAIN-70 still failing after V-61/67 fixes)
- **Issue:** check-phase-70.mjs V-70-24 `readProjectAtV17Close()` reads PROJECT.md at `aa6de68` (Plan 70-02 Atom 1 = HARNESS-03/04 author SHA), but the 12 v1.7 traceability rows in PROJECT.md were added in Plan 70-05 Commit B `4df3a16` (true close-gate). At `aa6de68`, only 7/12 are present.
- **Fix:** Added `V17_CLOSEGATE: '4df3a16'` to `_lib/frozen-at-close.mjs` MILESTONE_CLOSE_SHAS + `readAtV17CloseGate` export. Added `readProjectAtV17CloseGate()` helper to check-phase-70.mjs (ADD-not-MODIFY). Updated V-70-24 to use new helper.
- **Scope note:** check-phase-70.mjs was NOT in the RETRO-INVENTORY {48..66} scan range. This is an out-of-inventory Rule 1 fix required to satisfy the plan's MUST HAVE "V-73-CHAIN-70 PASS".
- **Files modified:** `scripts/validation/check-phase-70.mjs`, `scripts/validation/_lib/frozen-at-close.mjs`
- **Commit:** `a85da77` (part of atomic commit)

## Hand-off Entry-State Signal for Plan 73-03

**Plan 73-03 inputs from Plan 73-02:**

- `a85da77` = Plan 73-02 atomic SHA (confirm via `git log -1 --oneline`)
- `.claude/tmp/73-chain-post.txt` = post-RETRO-02 chain witness (39 PASS / 0 FAIL / 1 SKIPPED)
- V-73-CONVERT-NN entries: 8 entries, all PASS at Plan 73-02 SHA
- V17_CLOSEGATE: `4df3a16` added to `_lib/frozen-at-close.mjs` (additive; V-73-LIB-EXISTS still PASS checking original 4 keys only)
- CHAIN-DEGRADED-AT-HEAD-01: **CLOSED** (all 8 FAILs flipped → PASS; ready for v1.8-DEFERRED-CLEANUP.md STUB → CLOSED transition in Plan 73-03 Wave 4)
- 73-VERIFICATION.md: NOT YET AUTHORED (Plan 73-03 Wave 3 task)
- V-73-AUDIT: still SKIP-PASS (expected transient; Plan 73-03 lands the verification doc)

## Known Stubs

None — all stubs from Plan 73-01 (V-73-CONVERT-* stub comment, V17_CLOSEGATE key omission) resolved in this atomic commit.

## Self-Check: PASSED

- FOUND: `scripts/validation/check-phase-61.mjs` (readAtV15Close import + V-61-17..20 with [v1.5-frozen @ ba2cbc0] suffix)
- FOUND: `scripts/validation/check-phase-67.mjs` (V-67-05/06 with corrected assertion patterns + [v1.7-frozen @ aa6de68] suffix)
- FOUND: `scripts/validation/check-phase-70.mjs` (V-70-24 rewired to readProjectAtV17CloseGate + 4df3a16 SHA)
- FOUND: `scripts/validation/_lib/frozen-at-close.mjs` (V17_CLOSEGATE:4df3a16 + readAtV17CloseGate export)
- FOUND: `scripts/validation/check-phase-73.mjs` (8 V-73-CONVERT-NN entries, all PASS)
- FOUND commit: `a85da77` (5 files in ONE atomic commit confirmed)
- `.claude/tmp/73-chain-post.txt`: 39 PASS / 0 FAIL / 1 SKIPPED confirmed
- Predecessor-byte-unchanged: `git diff 8e56086 HEAD -- <surfaces>` EMPTY confirmed
- v1.7-milestone-audit.mjs: 15/15 PASS confirmed
