---
phase: 73-retrospective-forward-port-pillar-c
plan: "01"
subsystem: chain-validators
tags: [retro-01, wrapper-fold, frozen-at-close, atomic-sc4, chain-apex]
dependency_graph:
  requires: [72-02]
  provides: [73-RETRO-INVENTORY.md, _lib/frozen-at-close.mjs, check-phase-73.mjs, 8-wrapper-folds]
  affects: [check-phase-{60..65}.mjs, check-phase-73.mjs]
tech_stack:
  added: [scripts/validation/_lib/frozen-at-close.mjs, scripts/validation/check-phase-73.mjs]
  patterns: [atomic-commit-sc4, wrapper-fold-pattern, frozen-aware-sha-pinning, chain-apex-validator]
key_files:
  created:
    - .planning/phases/73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md
    - scripts/validation/_lib/frozen-at-close.mjs
    - scripts/validation/check-phase-73.mjs
  modified:
    - scripts/validation/check-phase-60.mjs
    - scripts/validation/check-phase-61.mjs
    - scripts/validation/check-phase-62.mjs
    - scripts/validation/check-phase-63.mjs
    - scripts/validation/check-phase-64.mjs
    - scripts/validation/check-phase-65.mjs
decisions:
  - "V-73-WRAPPER-NEG isChainWrapper filter added to exclude helper-spawn catch blocks from CHAIN wrapper assertion (auto-fix Rule 1: CHAIN_WRAPPER_ANCHOR {0,400} gap also matches PIN_HELPER --self-test wrapper in check-phase-60.mjs; filter added to distinguish CHAIN wrappers from helper-spawn wrappers)"
  - "RETRO-01 scan outcome: only 1 CONVERT_PLAN_73_02 candidate in {48..66} range (check-phase-61 V-61-17..20); CASCADE_ONLY for {62..65}; all others NO_HEAD_COUPLING — well below 12 anti-ballooning tripline"
  - "V14 omitted from MILESTONE_CLOSE_SHAS confirmed: zero v1.4-close-state assertions found in check-phase-{48..66}.mjs scan"
metrics:
  duration_seconds: ~1800
  tasks_completed: 5
  files_changed: 9
  completed_date: "2026-06-08"
one-liner: "Atomic SC#4 landing of RETRO-01 class-signature inventory + 8 CHAIN+AUDIT wrapper fold-ins + centralized `_lib/frozen-at-close.mjs` SHA-pin registry + Phase 73 chain-apex validator stub in ONE commit (`d2b8917`), with pre-RETRO-02 chain witness captured at `.claude/tmp/73-chain-pre.txt`."
---

# Phase 73 Plan 01: RETRO-01 Inventory + 8 Wrapper Folds + _lib/frozen-at-close + check-phase-73 Stub Summary

**One-liner:** Atomic SC#4 landing of RETRO-01 class-signature inventory + 8 CHAIN+AUDIT wrapper fold-ins + centralized `_lib/frozen-at-close.mjs` SHA-pin registry + Phase 73 chain-apex validator stub in ONE commit (`d2b8917`), with pre-RETRO-02 chain witness captured at `.claude/tmp/73-chain-pre.txt`.

## Atomic Commit

**SHA:** `d2b8917f2746d0d1b85da732c38c8509db0d1afa` (short: `d2b8917`)
**Message:** `feat(73-01): RETRO-01 inventory + 8 wrapper folds + _lib/frozen-at-close + check-phase-73 stub (atomic SC#1 + SC#4)`
**Files (9):**
1. `.planning/phases/73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md` (NEW — RETRO-01 inventory artifact)
2. `scripts/validation/_lib/frozen-at-close.mjs` (NEW — MILESTONE_CLOSE_SHAS + readAtClose + 4 convenience exports)
3. `scripts/validation/check-phase-73.mjs` (NEW — Phase 73 chain-apex validator)
4. `scripts/validation/check-phase-60.mjs` (MODIFIED — CHAIN wrapper + AUDIT wrapper fold-in)
5. `scripts/validation/check-phase-61.mjs` (MODIFIED — CHAIN wrapper + AUDIT wrapper fold-in)
6. `scripts/validation/check-phase-62.mjs` (MODIFIED — CHAIN wrapper fold-in)
7. `scripts/validation/check-phase-63.mjs` (MODIFIED — CHAIN wrapper fold-in)
8. `scripts/validation/check-phase-64.mjs` (MODIFIED — CHAIN wrapper fold-in)
9. `scripts/validation/check-phase-65.mjs` (MODIFIED — CHAIN wrapper fold-in)

## Pre-RETRO-02 Chain Witness

**File:** `.claude/tmp/73-chain-pre.txt`
**Captured at:** Plan 73-01 atomic SHA `d2b8917` (post-commit Wave 6)

**Expected/actual results:**
- V-73-INVENTORY: PASS (19 validator rows present)
- V-73-LIB-EXISTS: PASS (MILESTONE_CLOSE_SHAS + 4 convenience exports confirmed)
- V-73-WRAPPER-NEG: PASS (0 stderr-only CHAIN wrappers across FIXED_FILES_RETRO_02)
- V-73-AUDIT-WRAPPER-NEG: PASS (0 stderr-only AUDIT wrappers across AUDIT_FIXED_FILES)
- V-73-AUDIT: SKIPPED (73-VERIFICATION.md not yet authored — Plan 73-03 lands it)
- V-73-AUDIT-HARNESS: PASS (v1.7 harness exits 0)
- V-73-SELF: PASS (CHAIN_PHASES excludes 73, CHAIN_SKIP empty)
- **V-73-CHAIN-{61,62,63,64,65,66,67,70}: FAIL (8 documented-residual — expected transient state)**
- Result: 23 PASS, 8 FAIL, 1 SKIPPED

## Transient State Disclosure (Chicken-and-Egg Lineage)

**Status at Plan 73-01 SHA:** CHAIN-DEGRADED-AT-HEAD-01 PARTIALLY-RESOLVED (same status as post-Phase-72).

The 8 V-73-CHAIN-{61,62,63,64,65,66,67,70} FAILs are the documented-residual from pre-existing HEAD-coupled assertions in check-phase-{61,67}.mjs. This is the **6th entry in the chicken-and-egg accepted-residual lineage:**
1. Plan 68-05 (initial CHAIN-DEGRADED entry)
2. Plan 69-02 (residual persists)
3. Plan 70-05 Commit A (residual persists)
4. Plan 71-01 (residual persists)
5. Plan 72-01 (8 FAILs baseline captured + wrapper fixes applied to {66..71})
6. **Plan 73-01 (wrapper fixes applied to {60..65}, 8 FAILs persist as delta-witness target)**

Resolution path: Plan 73-02 RETRO-02 per-validator HEAD-coupled assertion conversion will flip these 8 FAILs → PASS. The `.claude/tmp/73-chain-pre.txt` witness file documents the 8-FAIL baseline for Plan 73-02 delta comparison.

## RETRO-01 Inventory Scan Outcome

**Scan scope:** `check-phase-{48..66}.mjs` (19 validators)

**Disposition counts:**
- `CONVERT_PLAN_73_02`: 1 (check-phase-61.mjs — V-61-17..20 only)
- `CASCADE_ONLY`: 4 (check-phase-{62,63,64,65}.mjs — fail only via CHAIN subprocess spawning check-phase-61)
- `NO_HEAD_COUPLING`: 14 (check-phase-{48,49,50,51,52,53,54,55,56,57,58,59,60,66}.mjs)
- `ALREADY_FROZEN_AWARE`: 0 in {48..66} range (check-phase-61.mjs V-61-01..08 already frozen-aware, but V-61-17..20 are NOT)
- `SCOPE_GAP_DEFERRED_V19`: 0

**SCOPE-GAP tripline:** NOT triggered (1 CONVERT_PLAN_73_02 candidate, well below 12 anti-ballooning tripline). No `SCOPE-GAP-RETRO-02-OVERFLOW-01` stub needed.

**V14 inclusion decision:** RETRO_01_V14_REQUIRED = false. Zero validators in {48..66} range cite v1.4-close state. `MILESTONE_CLOSE_SHAS` V14 key OMITTED per default.

**Plan 73-02 RETRO-02 conversion scope:** check-phase-61.mjs (V-61-17..20) + check-phase-67.mjs (V-67-05/06 COMPLEX_CONVERSION). CASCADE_ONLY files ({62..65}) expected to self-heal once V-61-17 closes.

## Predecessor-Byte-Unchanged Invariant

`git diff ea4e769 HEAD -- <v1.4/v1.4.1/v1.5/v1.6/v1.7 workflow YAMLs + milestone-audit MJS + sidecar JSONs>` returns EMPTY.

Also verified: `git diff 67cb0cd HEAD -- check-phase-67.mjs check-phase-68.mjs check-phase-70.mjs` returns EMPTY (D-02 carve-out preserved — existing inline helpers byte-unchanged).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] V-73-WRAPPER-NEG helper-spawn false-positive**

- **Found during:** Task 5 pre-commit dry-run
- **Issue:** `CHAIN_WRAPPER_ANCHOR` regex (400-char gap) was broad enough to also match the helper-spawn catch block at `check-phase-60.mjs:188` (`PIN_HELPER --self-test`), causing V-73-WRAPPER-NEG to FAIL with "2 stderr-only CHAIN wrapper(s): check-phase-60.mjs[1], check-phase-61.mjs[3]"
- **Root cause:** The plan's CHAIN_WRAPPER_ANCHOR regex design was based on FIXED_FILES [66..72] (check-phase-72.mjs context) which don't have helper-spawn sites. check-phase-60/61 DO have helper-spawn sites, and the broad {0,400} gap catches them.
- **Fix:** Added `isChainWrapper` discriminator to V-73-WRAPPER-NEG assertion body in `check-phase-73.mjs`: `const isChainWrapper = /['"]check-phase-['"]/.test(m[1]) || /check-phase-.*FAIL/.test(m[1]);` — only count matches where the catch block return statement contains `'check-phase-'` (CHAIN wrapper detail prefix), excluding helper-spawn wrappers that use `'--self-test FAIL:'`
- **Files modified:** `scripts/validation/check-phase-73.mjs` (V-73-WRAPPER-NEG assertion body)
- **Commit:** `d2b8917` (part of atomic commit)

## Hand-off Entry-State Signal for Plan 73-02

**Source-of-truth:** `.planning/phases/73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md`

**Plan 73-02 RETRO-02 conversion targets:**
1. `check-phase-61.mjs` — V-61-17, V-61-18, V-61-19, V-61-20 (readFile(MILESTONES_DOC) → readAtV15Close('.planning/MILESTONES.md'))
2. `check-phase-67.mjs` — V-67-05, V-67-06 (COMPLEX_CONVERSION: wrong frozen-SHA `aa6de68` vs content authored at `4df3a16`; executor must run `git show aa6de68:docs/...` vs `git show 4df3a16:docs/...` before choosing target)

**V-73-CONVERT-NN stub:** Present in `check-phase-73.mjs` as comment block — awaits incremental growth in Plan 73-02 atomic commit.

**Delta-witness target:** `.claude/tmp/73-chain-pre.txt` = 8-FAIL baseline (V-73-CHAIN-{61,62,63,64,65,66,67,70} FAIL). Plan 73-02 captures `.claude/tmp/73-chain-post.txt` after conversion and compares.

## Known Stubs

- `check-phase-73.mjs` V-73-CONVERT-* stub comment (intentional — grows in Plan 73-02 per CONTEXT.md Claude's Discretion)
- `_lib/frozen-at-close.mjs` V14 key omitted (intentional — RETRO-01 scan confirmed zero v1.4-close-state assertions)

## Self-Check: PASSED

- FOUND: `.planning/phases/73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md`
- FOUND: `scripts/validation/_lib/frozen-at-close.mjs`
- FOUND: `scripts/validation/check-phase-73.mjs`
- FOUND: `.planning/phases/73-retrospective-forward-port-pillar-c/73-01-SUMMARY.md`
- FOUND commit: `d2b8917` (9 files in ONE commit confirmed)
- Witness file: `.claude/tmp/73-chain-pre.txt` present with 84 lines, V-73-INVENTORY + V-73-LIB-EXISTS present, 8 CHAIN FAILs confirmed
