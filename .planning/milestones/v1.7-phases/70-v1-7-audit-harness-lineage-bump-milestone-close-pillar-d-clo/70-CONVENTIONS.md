---
phase: 70
plan: 70-01
wave: 1
type: conventions
created: 2026-05-28
tags: [freshness-routing, harness-forward-01, v1.7-frozen-aware]
---

# Phase 70 Wave-1 Conventions: Per-V-NN-NN Freshness Routing Matrix

## Purpose

Wave 3 (Plan 70-03) plan author **executes this matrix** when scaffolding the HARNESS-03 validator bodies — they make **zero classification decisions**. This document absorbs all D-01 LOCKED classifier-risk into a reviewed artifact BEFORE Wave 3 plan authoring begins. Per-V-NN-NN freshness routing is pre-classified per `70-CONTEXT.md` §D-01 LOCKED (Option C: per-assertion-class freshness rules). DO NOT re-litigate; the gray area is closed.

## Per-V-NN-NN Freshness Routing Matrix

Columns: `V-NN-NN` (assertion identifier) | `Validator` (which `check-phase-NN.mjs`) | `Assertion summary` (what is checked) | `Freshness class` (HEAD-coupled OR `[v1.7-frozen @ {phase_70_close_SHA}]`-aware) | `Mechanism` (helper function name or direct call) | `Rationale` (1-line).

| V-NN-NN | Validator | Assertion summary | Freshness class | Mechanism | Rationale |
|---------|-----------|-------------------|-----------------|-----------|-----------|
| V-67-01 | check-phase-67.mjs | SWEEP-01 ABM URLs: 4 URLs in 4 files unchanged from post-revalidation state (`3fb8ca5`) | `[v1.7-frozen @ {phase_70_close_SHA}]` | `readCorpusFileAtV17Close(relPath)` | SWEEP corpus state per D-01; post-close mutable surface |
| V-67-02 | check-phase-67.mjs | SWEEP-01 sidecar `c13_rotting_external.ci_1_abm_urls`: 4 entries with `last_revalidated: 2026-05-26` | `[v1.7-frozen @ {phase_70_close_SHA}]` | `readSidecarAtV17Close()` | Sidecar reflects v1.7-close state |
| V-67-03 | check-phase-67.mjs | SWEEP-02 VPP rename: 6 surgical edits across 2 files (5 content-token mentions + first-mention compound form) | `[v1.7-frozen @ {phase_70_close_SHA}]` | `readCorpusFileAtV17Close(relPath)` | SWEEP corpus state per D-01 |
| V-67-04 | check-phase-67.mjs | SWEEP-02 sidecar `c13_rotting_external.ci_2_vpp_location_token`: 6 entries with `resolved_2026_05_26: true` annotations | `[v1.7-frozen @ {phase_70_close_SHA}]` | `readSidecarAtV17Close()` | Sidecar reflects v1.7-close state |
| V-67-05 | check-phase-67.mjs | SWEEP-02 OP-10 callouts: 2 OP-10 first-mention-per-H2 callouts present | `[v1.7-frozen @ {phase_70_close_SHA}]` | `readCorpusFileAtV17Close(relPath)` | SWEEP corpus state per D-01 |
| V-67-06 | check-phase-67.mjs | SWEEP-02 Version History rows: 2 VH rows in 2 affected files + glossary coord row | `[v1.7-frozen @ {phase_70_close_SHA}]` | `readCorpusFileAtV17Close(relPath)` | SWEEP corpus state per D-01 |
| V-67-07 | check-phase-67.mjs | `last_verified` bumps: 3 frontmatter updates to `2026-05-26` (iOS + macOS + glossary) | `[v1.7-frozen @ {phase_70_close_SHA}]` | `readCorpusFileAtV17Close(relPath)` | SWEEP corpus state per D-01 |
| V-67-CHAIN | check-phase-67.mjs | Chain regression-guards for check-phase-{48..66}.mjs (each exit 0) | HEAD-coupled | `execFileSync` loop (lines 293-321 verbatim from check-phase-66.mjs) | Live chain invariant |
| V-67-AUDIT | check-phase-67.mjs | `v1.7-milestone-audit.mjs` exits 0 (15/15 PASS) | HEAD-coupled | `execFileSync` on v1.7-milestone-audit.mjs | Live harness gate |
| V-67-SELF | check-phase-67.mjs | `CHAIN_PHASES` does NOT include 67 | HEAD-coupled | Set membership check (check-phase-65.mjs:151 pattern) | Permanent invariant |
| V-68-01 | check-phase-68.mjs | CHAIN-01: check-phase-51.mjs readFile() contains `.replace(/\r\n/g, '\n')` | HEAD-coupled | source grep | Permanent code invariant |
| V-68-02 | check-phase-68.mjs | CHAIN-01: check-phase-58.mjs readFile() contains `.replace(/\r\n/g, '\n')` | HEAD-coupled | source grep | Permanent code invariant |
| V-68-03 | check-phase-68.mjs | CHAIN-02: `scripts/validation/_lib/archive-path.mjs` exists | HEAD-coupled | `existsSync` | Permanent code asset |
| V-68-04 | check-phase-68.mjs | CHAIN-02: archive-path helper called from 5 call-sites (check-phase-{31,48,60,62,63}.mjs + regenerate-supervision-pins.mjs) | HEAD-coupled | source grep across 6 files | Permanent code invariant |
| V-68-05 | check-phase-68.mjs | CHAIN-02: regenerate-supervision-pins.mjs BASELINE_9 +1 banner shift documented in BASELINE comment block | `[v1.7-frozen @ {phase_70_close_SHA}]` | `readCorpusFileAtV17Close('scripts/validation/regenerate-supervision-pins.mjs')` | BASELINE banner is a v1.7-close-state freeze (BASELINE_11 closes BASELINE_10) |
| V-68-06 | check-phase-68.mjs | CHAIN-02: `parseAllowlist()` lineage repointed (v1.6 → v1.7 sidecar at Plan 70-02) | HEAD-coupled | source grep for `v1.7-audit-allowlist.json` reference | Live source-of-truth (regenerate-supervision-pins.mjs HEAD) |
| V-68-07 | check-phase-68.mjs | CHAIN-03: `CHAIN_SKIP = new Set([])` across check-phase-{62..66}.mjs (5 validators) | HEAD-coupled | source grep `new Set\(\[\]\)` in 5 files | Permanent invariant per `7b635ca` |
| V-68-08 | check-phase-68.mjs | CHAIN-31 STRETCH: check-phase-31.mjs `_missing` discriminator marker | HEAD-coupled | source grep | Permanent code invariant |
| V-68-09 | check-phase-68.mjs | MILESTONES.md cdcce23 garbage entry deletion: zero `One-liner:` placeholders in v1.5 section | `[v1.7-frozen @ {phase_70_close_SHA}]` | `readMilestonesAtV17Close()` | MILESTONES.md post-cdcce23-cleanup state at v1.7 close |
| V-68-10 | check-phase-68.mjs | v1.5-frozen-aware helpers: check-phase-61.mjs `readRequirementsAtV15Close()` + `readRoadmapAtV15Close()` present | HEAD-coupled | source grep | Permanent code invariant |
| V-68-11 | check-phase-68.mjs | subprocess timeout: 10 sites bumped 60000 → 300000 across check-phase-{62..66}.mjs | HEAD-coupled | source grep `timeout: 300000` | Permanent code invariant |
| V-68-CHAIN | check-phase-68.mjs | Chain regression-guards for check-phase-{48..67}.mjs | HEAD-coupled | `execFileSync` loop | Live chain invariant |
| V-68-AUDIT | check-phase-68.mjs | `v1.7-milestone-audit.mjs` exits 0 | HEAD-coupled | `execFileSync` | Live harness gate |
| V-68-SELF | check-phase-68.mjs | `CHAIN_PHASES` does NOT include 68 | HEAD-coupled | Set membership check | Permanent invariant |
| V-69-01 | check-phase-69.mjs | `.github/workflows/audit-harness-v1.7-integrity.yml` exists | HEAD-coupled | `existsSync` | Live workflow YAML |
| V-69-02 | check-phase-69.mjs | Workflow has 4 jobs (parse + path-match + harness-run + linux-chain-ubuntu-latest) | HEAD-coupled | YAML substring check | Live workflow YAML |
| V-69-03 | check-phase-69.mjs | linux-chain-ubuntu-latest job has `core.autocrlf false` step | HEAD-coupled | substring check | Live workflow YAML |
| V-69-04 | check-phase-69.mjs | linux-chain-ubuntu-latest checkout step has `fetch-depth: 0` (FETCH-DEPTH-01 inheritance from `85521bb`) | HEAD-coupled | substring check `with: { fetch-depth: 0 }` | Live workflow YAML; FETCH-DEPTH-01 contract |
| V-69-05 | check-phase-69.mjs | linux-chain-ubuntu-latest `continue-on-error: false` (PR-blocking per D-A9) | HEAD-coupled | substring check | Live workflow YAML |
| V-69-06 | check-phase-69.mjs | `node-version: '20'` declared | HEAD-coupled | substring check | Live workflow YAML |
| V-69-07 | check-phase-69.mjs | `::notice title=CHAIN_TIMING_LINUX::` emission present | HEAD-coupled | substring check | Live workflow YAML preserves Phase 69 close-state post-HARNESS-04 |
| V-69-08 | check-phase-69.mjs | Predecessor workflows (v1.4/v1.5/v1.6) byte-unchanged via HEAD blob comparison | HEAD-coupled | blob SHA comparison (HEAD vs. frozen blob hashes documented in this matrix) | Live predecessor-byte-unchanged invariant |
| V-69-CHAIN | check-phase-69.mjs | Chain regression-guards for check-phase-{48..68}.mjs | HEAD-coupled | `execFileSync` loop | Live chain invariant |
| V-69-AUDIT | check-phase-69.mjs | `v1.7-milestone-audit.mjs` exits 0 | HEAD-coupled | `execFileSync` | Live harness gate |
| V-69-SELF | check-phase-69.mjs | `CHAIN_PHASES` does NOT include 69 | HEAD-coupled | Set membership check | Permanent invariant |
| V-70-01 | check-phase-70.mjs | HARNESS-01: `scripts/validation/v1.7-milestone-audit.mjs` exists | HEAD-coupled | `existsSync` | Live deliverable |
| V-70-02 | check-phase-70.mjs | HARNESS-01: lineage docstring contains `v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7` | HEAD-coupled | substring check on HEAD source | Live deliverable docstring |
| V-70-03 | check-phase-70.mjs | HARNESS-01: harness references `v1.7-audit-allowlist.json` (parseAllowlist path) | HEAD-coupled | substring check on HEAD source | Live deliverable provenance |
| V-70-04 | check-phase-70.mjs | HARNESS-02: `scripts/validation/v1.7-audit-allowlist.json` exists + valid JSON | HEAD-coupled | `JSON.parse` on HEAD content | Live deliverable |
| V-70-05 | check-phase-70.mjs | HARNESS-02: sidecar shape (`c13_rotting_external` object + `quarterly_audit.cadence === "0 8 1 1,4,7,10 *"` + `c16_missing_endpoint_exemptions: []`) | HEAD-coupled | JSON shape check on HEAD content | Live deliverable |
| V-70-06 | check-phase-70.mjs | HARNESS-02: BASELINE_11 freshness comment in regenerate-supervision-pins.mjs (`BASELINE_11 refreshed` + `Phase 70` attribution) | HEAD-coupled | substring check on HEAD source | Live deliverable |
| V-70-07 | check-phase-70.mjs | HARNESS-03: 4 validators exist (check-phase-{67,68,69,70}.mjs) | HEAD-coupled | `existsSync` × 4 | Live deliverable |
| V-70-08 | check-phase-70.mjs | HARNESS-03: V-NN-SELF guard verified per validator (`CHAIN_PHASES` does not include own phase) | HEAD-coupled | source grep + parse check | Live deliverable invariant |
| V-70-09 | check-phase-70.mjs | HARNESS-04: workflow YAML path-filter contains `scripts/validation/v1.7-*` | HEAD-coupled | substring check on HEAD YAML | Live workflow YAML |
| V-70-10 | check-phase-70.mjs | HARNESS-04: workflow YAML path-filter does NOT contain `docs/decision-trees/09-linux-triage.md` (REMOVED per Phase-69 D-04 sub-decision (a)) | HEAD-coupled | substring absence check | Live workflow YAML |
| V-70-11 | check-phase-70.mjs | HARNESS-04: workflow YAML has 2 crons (`0 8 * * 1` + `0 8 1 1,4,7,10 *`) | HEAD-coupled | substring × 2 | Live workflow YAML |
| V-70-12 | check-phase-70.mjs | HARNESS-04: workflow YAML has `pin-helper-advisory` job with `continue-on-error: true` | HEAD-coupled | YAML structure check | Live workflow YAML |
| V-70-13 | check-phase-70.mjs | HARNESS-04: workflow YAML has `rotting-external-quarterly` job | HEAD-coupled | substring check | Live workflow YAML |
| V-70-14 | check-phase-70.mjs | HARNESS-04: workflow YAML chain-67..70 are ACTIVE `node` invocations (NOT skip-if-missing for-loop) | HEAD-coupled | regex check for explicit `node scripts/validation/check-phase-67.mjs` etc. | Live workflow YAML |
| V-70-15 | check-phase-70.mjs | HARNESS-04: workflow YAML PRESERVES `fetch-depth: 0` on linux-chain-ubuntu-latest checkout (FETCH-DEPTH-01 inheritance) | HEAD-coupled | substring check | Live workflow YAML |
| V-70-16 | check-phase-70.mjs | HARNESS-04: workflow YAML parse/path-match/harness-run jobs reference v1.7 sidecar/harness (NOT v1.6) | HEAD-coupled | substring check | Live workflow YAML |
| V-70-17 | check-phase-70.mjs | HARNESS-04: Predecessor workflows (v1.4/v1.5/v1.6) BYTE-UNCHANGED via HEAD blob comparison | HEAD-coupled | blob SHA comparison | Live predecessor-byte-unchanged invariant |
| V-70-18 | check-phase-70.mjs | HARNESS-05: `70-04-AUDIT-RESULTS.md` exists in phase dir | `[v1.7-frozen @ {phase_70_close_SHA}]` | `readCorpusFileAtV17Close('.planning/phases/70-.../70-04-AUDIT-RESULTS.md')` | Per-phase audit-results artifact authored at Wave 4 close |
| V-70-19 | check-phase-70.mjs | HARNESS-05: audit-results document contains B.1 (local fresh-clone) + B.2 (Linux GHA cross-OS) sections | `[v1.7-frozen @ {phase_70_close_SHA}]` | `readCorpusFileAtV17Close(...)` | Frozen audit-results state |
| V-70-20 | check-phase-70.mjs | HARNESS-06: `.planning/milestones/v1.7-MILESTONE-AUDIT.md` exists with YAML frontmatter (milestone: v1.7, status: passed, scores.requirements: 12/12, scores.phases: 4/4) | `[v1.7-frozen @ {phase_70_close_SHA}]` | `readMilestoneAuditAtV17Close()` | Doc IS the milestone artifact; frozen at v1.7 close |
| V-70-21 | check-phase-70.mjs | HARNESS-06: milestone audit doc has `performed_by` + Auditor-Independence + Command Verification Table sections | `[v1.7-frozen @ {phase_70_close_SHA}]` | `readMilestoneAuditAtV17Close()` | Frozen milestone audit artifact |
| V-70-22 | check-phase-70.mjs | HARNESS-06: milestone audit doc has NEW "Discoveries Surfaced During Execution" section (FETCH-DEPTH-01 + SCOPE-GAP-61 + D-04-OVERSPEC-01 + CHAIN-WRAPPER-01 + ARCHIVE-01) | `[v1.7-frozen @ {phase_70_close_SHA}]` | `readMilestoneAuditAtV17Close()` | Frozen milestone audit artifact |
| V-70-23 | check-phase-70.mjs | HARNESS-06: `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` finalized (carry-forward + v1.6 items + Phase 69 discoveries) | `[v1.7-frozen @ {phase_70_close_SHA}]` | `readDeferredCleanupAtV17Close()` | Frozen deferred-cleanup artifact |
| V-70-24 | check-phase-70.mjs | Traceability closure: PROJECT.md Validated section has 12 v1.7 rows | `[v1.7-frozen @ {phase_70_close_SHA}]` | `readProjectAtV17Close()` | SCOPE-GAP-61-class surface; explicit per HARNESS-FORWARD-01 |
| V-70-25 | check-phase-70.mjs | Traceability closure: ROADMAP.md Progress table 4/4 v1.7 phases (67-70) Complete | `[v1.7-frozen @ {phase_70_close_SHA}]` | `readRoadmapAtV17Close()` | SCOPE-GAP-61-class surface |
| V-70-26 | check-phase-70.mjs | Traceability closure: STATE.md frontmatter status: complete + completed_phases: 4 / total_phases: 4 for v1.7 | `[v1.7-frozen @ {phase_70_close_SHA}]` | `readStateAtV17Close()` | SCOPE-GAP-61-class surface |
| V-70-27 | check-phase-70.mjs | Traceability closure: REQUIREMENTS.md Traceability table 12 v1.7 rows all "Complete" | `[v1.7-frozen @ {phase_70_close_SHA}]` | `readRequirementsAtV17Close()` | SCOPE-GAP-61-class surface |
| V-70-CHAIN | check-phase-70.mjs | Chain regression-guards for check-phase-{48..69}.mjs | HEAD-coupled | `execFileSync` loop | Live chain invariant |
| V-70-AUDIT | check-phase-70.mjs | `v1.7-milestone-audit.mjs` exits 0 | HEAD-coupled | `execFileSync` | Live harness gate |
| V-70-SELF | check-phase-70.mjs | `CHAIN_PHASES` does NOT include 70 | HEAD-coupled | Set membership check | Permanent invariant |

**Row count:** 60 V-NN-NN rows (audit gate requires >= 16; well above).

## v1.7-Frozen-Aware Helper Signatures

Wave 3 (Plan 70-03) instantiates these helpers per validator. Each helper follows `check-phase-61.mjs:38-63` shape (post-`d7d7d5f` + post-`2d61981`): `execFileSync('git', ['show', '{phase_70_close_SHA}:<path>'], { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n')` with a `try/catch` returning `null` on failure (callers null-guard).

The literal placeholder `{phase_70_close_SHA}` is left in source until Plan 70-05 Commit A substitutes the actual Phase 70 close-gate commit SHA via `sed -i` across the 4 validator files (see §"Chicken-and-Egg SHA Placeholder Convention" below).

| # | Helper signature | Purpose | Consumed by |
|---|------------------|---------|-------------|
| 1 | `function readCorpusFileAtV17Close(relPath)` | Generic corpus reader for SWEEP corpus state + BASELINE banner block | V-67-01 / V-67-03 / V-67-05 / V-67-06 / V-67-07 ; V-68-05 (regenerate-supervision-pins.mjs) ; V-70-18 / V-70-19 (audit-results) |
| 2 | `function readSidecarAtV17Close()` | Reads `scripts/validation/v1.7-audit-allowlist.json` at close-SHA | V-67-02 / V-67-04 |
| 3 | `function readMilestoneAuditAtV17Close()` | Reads `.planning/milestones/v1.7-MILESTONE-AUDIT.md` at close-SHA | V-70-20 / V-70-21 / V-70-22 |
| 4 | `function readDeferredCleanupAtV17Close()` | Reads `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` at close-SHA | V-70-23 |
| 5 | `function readRequirementsAtV17Close()` | Reads `.planning/REQUIREMENTS.md` at close-SHA | V-70-27 |
| 6 | `function readRoadmapAtV17Close()` | Reads `.planning/ROADMAP.md` at close-SHA | V-70-25 |
| 7 | `function readStateAtV17Close()` | Reads `.planning/STATE.md` at close-SHA | V-70-26 |
| 8 | `function readProjectAtV17Close()` | Reads `.planning/PROJECT.md` at close-SHA | V-70-24 |
| 9 | `function readMilestonesAtV17Close()` | Reads `.planning/MILESTONES.md` at close-SHA | V-68-09 (cdcce23-cleanup post-state) |

**Canonical implementation template (mirror of `check-phase-61.mjs:38-44`):**

```javascript
// Reads <FILE> at v1.7-close SHA {phase_70_close_SHA} (frozen state).
// Substitution: Plan 70-05 Commit A replaces {phase_70_close_SHA} with the actual
// Phase 70 close-gate commit SHA via `sed -i` (per Phase 68 Plan 68-05 / Phase 69 Plan 69-02 precedent).
function read<File>AtV17Close() {
  try {
    return execFileSync('git', ['show', '{phase_70_close_SHA}:<relative-path>'], { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n');
  } catch (err) {
    return null;
  }
}
```

## V-NN-SELF Guard Per-Validator CHAIN_PHASES Spec

Each `check-phase-NN.mjs` MUST exclude its own phase number from `CHAIN_PHASES` per the `check-phase-65.mjs:151` precedent (V-NN-SELF guard pattern; check-phase-66.mjs:342-348 invariant shape).

| Validator | CHAIN_PHASES | Excludes (own phase) | Notes |
|-----------|--------------|----------------------|-------|
| `check-phase-67.mjs` | `[48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66]` (19 elements) | 67 | Inherits Phase 68 `CHAIN_SKIP = new Set([])` invariant per `7b635ca` |
| `check-phase-68.mjs` | `[48,...,67]` (20 elements) | 68 | Inherits Phase 68 `CHAIN_SKIP = new Set([])` invariant |
| `check-phase-69.mjs` | `[48,...,68]` (21 elements) | 69 | Inherits Phase 68 `CHAIN_SKIP = new Set([])` invariant |
| `check-phase-70.mjs` | `[48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69]` (22 elements) | 70 | Inherits Phase 68 `CHAIN_SKIP = new Set([])` invariant |

**V-NN-SELF guard shape (verbatim from check-phase-66.mjs:342-348):**

```javascript
// === V-NN-SELF: CHAIN_PHASES does NOT include N (no self-reference; D-22 auditor-independence) ===
checks.push({
  id: 'SELF', name: 'V-NN-SELF: CHAIN_PHASES array does NOT include N (no self-recursive call)',
  run() {
    if (CHAIN_PHASES.includes(N)) return { pass: false, detail: 'CHAIN_PHASES includes N -- self-reference regression' };
    const skipList = [...CHAIN_SKIP].sort((a, b) => a - b).join(',');
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] -- N absent (correct); CHAIN_SKIP = [' + skipList + ']' };
  }
});
```

## HARNESS-FORWARD-01 Carry-Forward Closure Note

**(a) Pattern applied:** Per-assertion-class freshness routing extended through `check-phase-67.mjs` / `check-phase-68.mjs` / `check-phase-69.mjs` / `check-phase-70.mjs` per D-01 LOCKED (Option C). The pattern was inducted at Phase 68 Plan 68-03 Task 1 (`d7d7d5f`, `readRequirementsAtV15Close()`) and extended at Phase 69 Fix-2 (`2d61981`, `readRoadmapAtV15Close()`). Phase 70 generalizes the pattern across 9 helper functions covering corpus / sidecar / milestone-audit / deferred-cleanup / 4 planning-docs / MILESTONES.md.

**(b) v1.8+ deferral preserved:** Retrospective audit of `check-phase-{48..66}.mjs` for HEAD-coupled assertions on milestone-close-state surfaces **REMAINS deferred to v1.8+** (per `v1.7-DEFERRED-CLEANUP.md` §HARNESS-FORWARD-01 + §SCOPE-GAP-61 retrospective recommendation). D-01 Option D was **REJECTED** in `70-CONTEXT.md` precisely to preserve this boundary — pulling the retrospective audit into Phase 70 would over-scope the close-gate and force a forensic sweep across 18 historical validators. The pattern lands surgically in `check-phase-67..70.mjs`; v1.8+ owns the retrospective.

**(c) Plan 70-05 close-gate update:** At Plan 70-05 (Wave 5 close-gate), `v1.7-DEFERRED-CLEANUP.md` §HARNESS-FORWARD-01 entry status flips to: `applied-to-check-phase-67..70.mjs; retrospective audit of check-phase-{48..66}.mjs REMAINS deferred to v1.8+`. The status flip is a planning-doc edit only — no code surgery.

## Chicken-and-Egg SHA Placeholder Convention

Phase 70 introduces **TWO literal-placeholder SHAs** that cannot be substituted until specific commits land. Both are recovered via `git log --all --grep="70-NN"` if the substitution mechanism fails. Plan 70-05 Commit A performs a **SINGLE** SHA-fill commit substituting **both** placeholders across **exactly 5 files** (4 validators + `regenerate-supervision-pins.mjs`).

### Placeholder 1: `{phase_70_close_SHA}`

- **What it is:** The Phase 70 close-gate commit SHA (target of v1.7-frozen-aware reads in check-phase-67..70.mjs).
- **Lives in:** All 9 v1.7-frozen-aware helpers (`readCorpusFileAtV17Close`, `readSidecarAtV17Close`, `readMilestoneAuditAtV17Close`, `readDeferredCleanupAtV17Close`, `readRequirementsAtV17Close`, `readRoadmapAtV17Close`, `readStateAtV17Close`, `readProjectAtV17Close`, `readMilestonesAtV17Close`) across the 4 validator files `scripts/validation/check-phase-{67,68,69,70}.mjs`. Per-file occurrence counts depend on which helpers each validator instantiates (Wave 3 Plan 70-03 Tasks 1-4 define per-file helper sets).
- **Substituted by:** Plan 70-05 Commit A via `sed -i` across the 4 validator files. Same `sed -i` invocation also substitutes `{phase_70_atom_1_SHA}` in `regenerate-supervision-pins.mjs` (see Placeholder 2 below).
- **Plan 70-05 Commit B residual handling:** Commit B's own SHA recovers any residual `{phase_70_close_SHA}` literal in `v1.7-MILESTONE-AUDIT.md` frontmatter via `git log --all --grep="70-05"` per `70-CONTEXT.md` D-04 Option (b) recommendation.

### Placeholder 2: `{phase_70_atom_1_SHA}`

- **What it is:** The Plan 70-02 (Wave 2 Atom 1) commit SHA (target of HARNESS-02 BASELINE_11 freshness comment attribution in `regenerate-supervision-pins.mjs`).
- **Lives in:** The BASELINE_11 freshness comment region placed by Plan 70-02 Task 3 inside `scripts/validation/regenerate-supervision-pins.mjs` (HARNESS-02 Atom 1 attribution per `70-RESEARCH.md` §HARNESS-02 BASELINE_11 comment text).
- **Substituted by:** Plan 70-05 Commit A via `sed -i` on `scripts/validation/regenerate-supervision-pins.mjs`. Same single Commit A also handles Placeholder 1 substitutions.

### Single-SHA-Fill Commit Pattern (Plan 70-05 Commit A)

Plan 70-05 Commit A is a **SINGLE commit** substituting **BOTH** placeholders across **EXACTLY 5 files**:

1. `scripts/validation/check-phase-67.mjs` — `{phase_70_close_SHA}` substitution
2. `scripts/validation/check-phase-68.mjs` — `{phase_70_close_SHA}` substitution
3. `scripts/validation/check-phase-69.mjs` — `{phase_70_close_SHA}` substitution
4. `scripts/validation/check-phase-70.mjs` — `{phase_70_close_SHA}` substitution
5. `scripts/validation/regenerate-supervision-pins.mjs` — `{phase_70_atom_1_SHA}` substitution (BASELINE_11 comment attribution)

**Precedent cross-reference:** Phase 68 Plan 68-05 Commit A `3814bee` (single-SHA-fill commit for `{68_03_SHA}` across 5 chain validators) + Phase 69 Plan 69-02 close-gate `{69_02_SHA}` (literal-placeholder Option (a) variant). Phase 70 uses the same single-SHA-fill pattern but with two placeholders consolidated into one commit per `70-CONTEXT.md` D-04 Claude's Discretion (Option b: two-commit chicken-and-egg; cleaner audit-doc citation symmetry with v1.6 Phase 66-05 Plan 66-05-PLAN.md ATOMIC TRIO precedent).

## Wave-1 Scaffold Placeholder Phrase

**Contract:** The literal string `Wave-1 placeholder` is the ONLY acceptable phrasing for V-70-NN scaffold placeholder detail strings in `scripts/validation/check-phase-70.mjs` (Task 2 of this plan). Do **NOT** paraphrase. Forbidden alternatives include: "Wave 1 stub", "scaffold placeholder", "Wave-1 stub", "wave 1 placeholder", "Wave 1 stub-out", "stub for Wave 3", etc.

**Why this matters:** Plan 70-03 Task 4 acceptance criteria greps for the **literal** phrase `Wave-1 placeholder` to confirm all 27 V-70-01..27 placeholder detail strings have been removed and replaced with real implementation bodies post-upgrade. Paraphrased phrasing will cause spurious test failures (false positives — "we found a non-`Wave-1 placeholder` paraphrase, so placeholders must still be present"), or worse, false negatives (the grep silently passes despite leftover paraphrased scaffolds, leading to a green Plan 70-03 build that ships broken validators).

**Where it lives:** Every `checks.push({ id: 'NN', name: '...', run() { return { pass: true, skipped: true, detail: '<phrase here>' }; } })` placeholder body in `check-phase-70.mjs` MUST use the exact literal `Wave-1 placeholder` somewhere in its `detail` string. The full Plan 70-01 Task 2 recommended phrasing is:

```
Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-NN
```

Plan 70-03 Task 4 grep contract: `grep -c "Wave-1 placeholder" scripts/validation/check-phase-70.mjs` MUST equal `0` (zero) after Plan 70-03 lands; pre-Plan-70-03 (i.e., after Plan 70-01 Wave 1 commit) the same grep MUST equal `27` (one per V-70-NN placeholder). Plan 70-03 author monitors this delta as a primary completion signal.

## References

- `70-CONTEXT.md` §D-01 LOCKED — per-assertion-class freshness routing decision (Option C)
- `70-CONTEXT.md` §D-02 LOCKED — atomic-commit composition (Atom 1 + Atom 2)
- `70-CONTEXT.md` §D-04 LOCKED — Wave-based 5-plan structure + chicken-and-egg two-commit pattern
- `70-RESEARCH.md` §HARNESS-03 — proposed V-NN-NN assertion lists per validator (matrix seed)
- `70-RESEARCH.md` §"v1.7-frozen-aware Helper Pattern (Plan 70-01 Wave-1 Authoring)" — 9-helper enumeration
- `70-RESEARCH.md` Pitfall 4 (forgetting v1.7-frozen-aware helpers) + Pitfall 6 (re-litigating gray areas)
- `70-VALIDATION.md` row 70-01-02 — audit gate: `grep -cE 'V-(67|68|69|70)-' 70-CONVENTIONS.md` >= 16 (this doc satisfies with 60 rows)
- `scripts/validation/check-phase-61.mjs` lines 38-63 — canonical `readRequirementsAtV15Close()` / `readRoadmapAtV15Close()` shape (post-`d7d7d5f` + post-`2d61981`); template for v1.7 helpers
- `scripts/validation/check-phase-66.mjs` lines 293-321 + 342-348 — V-NN-CHAIN regression-guard loop + V-NN-SELF guard shape (Path-A source for check-phase-70.mjs scaffold)
- Phase 68 commit `d7d7d5f` — `readRequirementsAtV15Close()` inception (Plan 68-03 Task 1 Option A pivot)
- Phase 69 commit `2d61981` — `readRoadmapAtV15Close()` addition (Plan 68-03 Task 1 scope-gap closure surfaced during Phase 69 B.1 baseline)
- `v1.7-DEFERRED-CLEANUP.md` §HARNESS-FORWARD-01 — current language preserved at Phase 70 close (Plan 70-05 status flip)
- `v1.7-DEFERRED-CLEANUP.md` §SCOPE-GAP-61 — retrospective audit recommendation (v1.8+)
