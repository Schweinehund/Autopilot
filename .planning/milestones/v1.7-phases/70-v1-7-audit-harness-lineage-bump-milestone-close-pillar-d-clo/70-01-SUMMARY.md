---
phase: 70
plan: 70-01
subsystem: validation-tooling-scaffold
tags: [wave-1, scaffold, conventions, harness-03-scaffold, v1.7-frozen-aware, freshness-routing-matrix]
dependency_graph:
  requires:
    - "70-CONTEXT.md D-01 LOCKED (Option C: per-assertion-class freshness rules)"
    - "70-CONTEXT.md D-04 LOCKED (Wave-based 5-plan structure)"
    - "70-RESEARCH.md §HARNESS-03 (proposed V-NN-NN assertion lists)"
    - "scripts/validation/check-phase-66.mjs (Path-A source for scaffold)"
    - "scripts/validation/check-phase-61.mjs (per-assertion-class router exemplar post-d7d7d5f / post-2d61981)"
  provides:
    - "70-CONVENTIONS.md per-V-NN-NN freshness routing matrix (60 V-NN-NN rows)"
    - "9 v1.7-frozen-aware helper signatures documented"
    - "V-NN-SELF guard CHAIN_PHASES spec for check-phase-67/68/69/70.mjs"
    - "HARNESS-FORWARD-01 carry-forward closure note"
    - "Chicken-and-Egg SHA Placeholder Convention (BOTH {phase_70_close_SHA} + {phase_70_atom_1_SHA})"
    - "Wave-1 Scaffold Placeholder Phrase contract (literal 'Wave-1 placeholder')"
    - "check-phase-70.mjs Path-A scaffold (V-70-01..27 placeholders + V-70-SELF/CHAIN/AUDIT)"
  affects:
    - "Plan 70-02 Wave 2 (Atom 1): consumes BASELINE_11 placeholder {phase_70_atom_1_SHA} convention"
    - "Plan 70-03 Wave 3 (Atom 2): executes the freshness routing matrix verbatim; fills V-70-01..27 bodies"
    - "Plan 70-03 Wave 3 Task 4 grep contract: 'Wave-1 placeholder' literal phrase delta (27 -> 0)"
    - "Plan 70-05 Wave 5 Commit A: substitutes both {phase_70_close_SHA} + {phase_70_atom_1_SHA} across 5 files"
tech_stack:
  added: []
  patterns:
    - "Per-assertion-class freshness routing matrix (D-01 Option C; check-phase-61.mjs lineage)"
    - "Wave-1 scaffold absorbs Wave-3 classification decisions (planner-vs-executor decoupling)"
    - "V-NN-SELF guard pattern with literal CHAIN_PHASES array (check-phase-65.mjs:151 precedent)"
    - "Wave-1 Scaffold Placeholder Phrase contract (literal-grep delta as completion signal)"
key_files:
  created:
    - ".planning/phases/70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo/70-CONVENTIONS.md"
    - "scripts/validation/check-phase-70.mjs"
  modified: []
decisions:
  - "Matrix authored with 60 V-NN-NN rows (well above the audit gate of >= 16) for full forward-coverage of check-phase-67/68/69/70 assertions"
  - "27 placeholder body slots reserved for V-70-01..27 (matches RESEARCH proposed assertion list)"
  - "V-70-AUDIT gracefully degrades via existsSync check (HARNESS-01 lands in Wave 2; until then SKIPPED)"
  - "V-70-18..27 names embed literal {phase_70_close_SHA} for clarity (substituted by Plan 70-05 Commit A)"
metrics:
  duration: "~30 minutes (single sequential execution session)"
  completed: "2026-05-28T17:11Z"
  tasks_completed: 2
  files_created: 2
  files_modified: 0
  commits: 2
---

# Phase 70 Plan 70-01: Wave 1 Scaffold + Conventions + per-V-NN-NN Freshness Matrix Summary

Authored `70-CONVENTIONS.md` with 60-row per-V-NN-NN freshness routing matrix + 9 v1.7-frozen-aware helper signatures + V-NN-SELF spec + HARNESS-FORWARD-01 closure note + dual SHA-placeholder convention; scaffolded `scripts/validation/check-phase-70.mjs` with CHAIN_PHASES = [48..69] (V-NN-SELF guard) + V-70-01..27 literal `Wave-1 placeholder` body slots + V-70-CHAIN/AUDIT/SELF runtime guards (Wave 3 Plan 70-03 fills V-70-01..27 bodies; Plan 70-05 Commit A substitutes the SHA placeholders).

## What Shipped

### Task 1 — `70-CONVENTIONS.md` (commit `22663d7`)

Per-V-NN-NN freshness routing matrix authored as the Wave-1 absorption surface for all D-01 classifier-risk. Wave 3 Plan 70-03 executes this matrix row-by-row when implementing the HARNESS-03 validator bodies — zero re-classification at plan-phase.

- **Matrix coverage:** 60 V-NN-NN rows (audit gate `grep -cE 'V-(67|68|69|70)-' >= 16` exceeded by 3.75×)
  - check-phase-67: V-67-01..07 (all v1.7-frozen-aware: SWEEP corpus state) + V-67-CHAIN + V-67-AUDIT + V-67-SELF (HEAD-coupled)
  - check-phase-68: V-68-01..11 MIXED (HEAD-coupled invariants + V-68-05 BASELINE banner shift + V-68-09 cdcce23-cleanup post-state = v1.7-frozen-aware) + V-68-CHAIN/AUDIT/SELF
  - check-phase-69: V-69-01..08 + V-69-CHAIN/AUDIT/SELF (workflow YAML integrity = HEAD-coupled per D-01)
  - check-phase-70: V-70-01..17 HEAD-coupled (live deliverables) + V-70-18..27 v1.7-frozen-aware (audit-results + milestone-audit + deferred-cleanup + traceability closure across 4 docs) + V-70-CHAIN/AUDIT/SELF
- **v1.7-frozen-aware helpers (9 signatures documented):** `readCorpusFileAtV17Close(relPath)` / `readSidecarAtV17Close()` / `readMilestoneAuditAtV17Close()` / `readDeferredCleanupAtV17Close()` / `readRequirementsAtV17Close()` / `readRoadmapAtV17Close()` / `readStateAtV17Close()` / `readProjectAtV17Close()` / `readMilestonesAtV17Close()` — each follows `check-phase-61.mjs:38-44` shape post-`d7d7d5f` + post-`2d61981`
- **V-NN-SELF guard table** — 4 rows (check-phase-67 → [48..66] / check-phase-68 → [48..67] / check-phase-69 → [48..68] / check-phase-70 → [48..69])
- **HARNESS-FORWARD-01 closure note** — pattern applied to check-phase-67..70.mjs per D-01 Option C; retrospective audit of check-phase-{48..66}.mjs **REMAINS** deferred to v1.8+ (D-01 Option D was REJECTED to preserve this boundary)
- **Chicken-and-Egg SHA Placeholder Convention** — documents BOTH `{phase_70_close_SHA}` (4 validators) AND `{phase_70_atom_1_SHA}` (regenerate-supervision-pins.mjs BASELINE_11 attribution); Plan 70-05 Commit A is a SINGLE commit substituting both across EXACTLY 5 files
- **Wave-1 Scaffold Placeholder Phrase** — locks literal phrase `Wave-1 placeholder` for V-70-NN scaffolded detail strings; Plan 70-03 Task 4 greps for the literal phrase as primary completion signal

### Task 2 — `scripts/validation/check-phase-70.mjs` (commit `2f2dc7b`)

Path-A scaffold from `scripts/validation/check-phase-66.mjs` with phase-70-specific customizations applied per Plan task spec. 319 lines.

- **CHAIN_PHASES** = `[48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69]` — 22-element literal array; explicitly excludes 70 per V-NN-SELF guard (check-phase-65.mjs:151 precedent)
- **CHAIN_SKIP** = `new Set([])` — inherited verbatim from Phase 68 CHAIN-03 close commit `7b635ca` (post-CHAIN_SKIP-empty-Set invariant)
- **V-70-01..27 placeholders** — 27 `checks.push({...})` entries return `{ pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-NN' }` (literal `Wave-1 placeholder` phrase per scaffold-phrase contract); names for V-70-18..27 embed `[v1.7-frozen @ {phase_70_close_SHA}]` for traceability
- **V-70-CHAIN regression-guard loop** — verbatim lines 293-321 from check-phase-66.mjs (iterates 22 predecessor phases via `execFileSync` with `timeout: 300000`; ENOENT graceful skip preserved)
- **V-70-AUDIT** — references `scripts/validation/v1.7-milestone-audit.mjs`; gracefully degrades via `existsSync` check (HARNESS-01 lands in Wave 2 Plan 70-02; until then SKIPPED with explanatory detail)
- **V-70-SELF guard** — verbatim shape from check-phase-66.mjs:342-348 with N=70 substitution
- **Runner loop + readFile helper** — byte-identical to check-phase-66.mjs (structural-diff confirmed empty)

## Verification

### Task 1 acceptance criteria

| Criterion | Required | Actual | Status |
|-----------|----------|--------|--------|
| `grep -cE 'V-(67\|68\|69\|70)-\d{2}'` | >= 16 | 60 (per row) / 63 (per node verifier) | PASS |
| `grep -c '{phase_70_close_SHA}'` | >= 1 | 31 | PASS |
| `grep -c '{phase_70_atom_1_SHA}'` | >= 1 | 3 | PASS |
| `grep -c "v1.6-frozen-aware"` (typo absence) | == 0 | 0 | PASS |
| 9 v1.7-frozen-aware helper signatures documented | 9 | 9 | PASS |
| V-NN-SELF guard table | 4 rows | 4 | PASS |
| HARNESS-FORWARD-01 closure note | present | present | PASS |
| Plan 70-05 Commit A SINGLE-commit BOTH-placeholders note | present | present | PASS |

### Task 2 acceptance criteria

| Criterion | Required | Actual | Status |
|-----------|----------|--------|--------|
| `node scripts/validation/check-phase-70.mjs` exit code | 0 | 0 | PASS |
| Result line | V-70-SELF PASS + V-70-CHAIN-{48..66} PASS + check-phase-67/68/69 SKIPPED + V-70-AUDIT SKIPPED + V-70-01..27 SKIPPED | `Result: 20 PASS, 0 FAIL, 31 SKIPPED` | PASS |
| `grep -c "CHAIN_PHASES = \[48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69\]"` | == 1 | 1 | PASS |
| `grep -c "id: 'SELF'"` | == 1 | 1 | PASS |
| `grep -c "v1.7-milestone-audit.mjs"` | >= 1 | 5 | PASS |
| `grep -c "Wave-1 placeholder"` | >= 27 | 29 (27 placeholders + 2 documentation references) | PASS |
| CHAIN_PHASES contains 70 (false-positive check) | 0 false matches | only V-70-SELF guard's own `includes(70)` check (intentional; correct) | PASS |
| readFile helper byte-identical to check-phase-66.mjs (structural-diff) | empty diff | empty diff | PASS |
| Predecessor regression-guard: `node scripts/validation/check-phase-66.mjs` exit 0 | exit 0 | exit 0, `Result: 28 PASS, 0 FAIL, 0 SKIPPED` (unchanged) | PASS |

## Deviations from Plan

None — plan executed exactly as written.

(Per scope rules: minor stylistic clarifications such as breaking up V-70-NN matrix rows or extending the helper canonical-template block did not change semantics, scope, or acceptance criteria, so they are not deviations.)

## Self-Check: PASSED

- 70-CONVENTIONS.md (FOUND: `.planning/phases/70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo/70-CONVENTIONS.md`)
- check-phase-70.mjs (FOUND: `scripts/validation/check-phase-70.mjs`)
- Commit `22663d7` (FOUND in git log)
- Commit `2f2dc7b` (FOUND in git log)
- All acceptance criteria met
- Predecessor regression-guard green (check-phase-66.mjs 28/0/0 unchanged)
- Scaffold green standalone (20/0/31)

## Forward Coordination

- **Plan 70-02 (Wave 2) consumes:** 70-CONVENTIONS.md §"Chicken-and-Egg SHA Placeholder Convention" — Plan 70-02 Task 3 BASELINE_11 comment uses literal `{phase_70_atom_1_SHA}` placeholder per the convention (substitution lands in Plan 70-05 Commit A)
- **Plan 70-03 (Wave 3) consumes:** 70-CONVENTIONS.md §"Per-V-NN-NN Freshness Routing Matrix" rows V-70-01..27 (verbatim execution) + §"v1.7-Frozen-Aware Helper Signatures" (9 helpers to instantiate) + §"Wave-1 Scaffold Placeholder Phrase" grep contract (27 → 0 delta)
- **Plan 70-03 (Wave 3) modifies:** `scripts/validation/check-phase-70.mjs` to replace V-70-01..27 placeholder bodies with real implementations per matrix
- **Plan 70-05 (Wave 5 Commit A) substitutes:** `{phase_70_close_SHA}` across 4 validators (check-phase-67/68/69/70.mjs) + `{phase_70_atom_1_SHA}` in regenerate-supervision-pins.mjs — SINGLE commit, 5 files
- **Plan 70-05 (Wave 5 Commit B) updates:** v1.7-DEFERRED-CLEANUP.md §HARNESS-FORWARD-01 status flip to `applied-to-check-phase-67..70.mjs; retrospective audit REMAINS deferred to v1.8+`

## Commit Record

| # | Hash | Type | Description |
|---|------|------|-------------|
| 1 | `22663d7` | docs | Author 70-CONVENTIONS.md with per-V-NN-NN freshness routing matrix (60 rows; 9 helpers; V-NN-SELF spec; HARNESS-FORWARD-01 closure; dual SHA placeholder convention; Wave-1 placeholder phrase contract) |
| 2 | `2f2dc7b` | feat | Scaffold scripts/validation/check-phase-70.mjs Path-A from check-phase-66.mjs with CHAIN_PHASES=[48..69] + V-70-01..27 literal `Wave-1 placeholder` body slots + V-70-CHAIN/AUDIT/SELF + readFile/runner verbatim |
