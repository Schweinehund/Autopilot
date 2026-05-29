# Phase 70: v1.7 Audit Harness Lineage Bump + Milestone Close (Pillar D — Close-Gate) — Research

**Researched:** 2026-05-28
**Domain:** Validation tooling lifecycle / audit-harness Path-A inheritance / milestone close-gate orchestration
**Confidence:** HIGH (Path-A precedent fully readable; all gray areas already adjudicated in 70-CONTEXT.md via parallel `/adversarial-review`; tactical specifics extracted from source files verbatim)

## Summary

Phase 70 is mechanically a **Path-A copy + EXTEND** operation, NOT a design exercise. Every architectural question has been adjudicated in 70-CONTEXT.md (D-01..D-04 LOCKED). This research extracts the line-level edit specifications, exact file lists, atomic-commit pre-flight protocols, and acceptance criteria templates that the planner needs to author 5 plans (70-01..70-05) without re-litigation.

Six deliverables (HARNESS-01..06) land across 5 waves:
- **Wave 1 (70-01):** Conventions + per-V-NN-NN freshness matrix + check-phase-70.mjs scaffold
- **Wave 2 (70-02):** Atom 1 (3 files; literal Phase 66-02 `3a9a671` precedent)
- **Wave 3 (70-03):** Atom 2 (5 files; 4 validators + 1 workflow YAML EXTEND)
- **Wave 4 (70-04):** 3-axis terminal re-audit (local fresh-clone + GHA workflow_dispatch + 70-04-AUDIT-RESULTS.md)
- **Wave 5 (70-05):** v1.7-MILESTONE-AUDIT.md + v1.7-DEFERRED-CLEANUP.md finalize + 4-doc traceability closure + two-commit chicken-and-egg

**Primary recommendation:** Author plans verbatim against the line-level specs in this document; do NOT re-research file contents during plan-phase. Every Wave's edit surface is fully enumerated below.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01: HARNESS-03 per-phase validator scope — Option C (Phase-specific freshness rules per assertion class)**
- Each `check-phase-67..70.mjs` is Path-A from `check-phase-66.mjs` BUT applies per-assertion-class freshness routing (NOT uniform HEAD-coupled, NOT uniform frozen-aware)
- Freshness routing matrix:
  - SWEEP corpus state → v1.7-frozen-aware via `readCorpusAtV17Close()` helper
  - CHAIN_SKIP empty-Set → HEAD-coupled (permanent invariant)
  - Workflow YAML integrity → HEAD-coupled (live contract)
  - Milestone audit doc → v1.7-frozen-aware (frozen at Phase 70 close SHA)
  - Per-phase verification artifacts (6N-VERIFICATION.md) → v1.7-frozen-aware
  - REQUIREMENTS.md / ROADMAP.md planning-doc reads → v1.7-frozen-aware
- **V-NN-SELF guard:** `CHAIN_PHASES` Set does NOT include validator's own phase (per `check-phase-65.mjs:151` precedent)
  - `check-phase-67.mjs` CHAIN_PHASES = {48..66} (excludes 67)
  - `check-phase-68.mjs` CHAIN_PHASES = {48..67} (excludes 68)
  - `check-phase-69.mjs` CHAIN_PHASES = {48..68} (excludes 69)
  - `check-phase-70.mjs` CHAIN_PHASES = {48..69} (excludes 70)
- **Per-V-NN-NN freshness matrix** authored as Plan 70-01 Wave 1 deliverable in `70-CONVENTIONS.md`

**D-02: Atomic-commit composition — Option C (Two-atomic split: harness-core / validator+CI surface)**
- **Atom 1 (Wave 2 / Plan 70-02):** harness-core 3-file indivisible scope (mirrors Phase 66-02 `3a9a671`)
  - `scripts/validation/v1.7-milestone-audit.mjs` NEW (HARNESS-01)
  - `scripts/validation/v1.7-audit-allowlist.json` NEW (HARNESS-02)
  - `scripts/validation/regenerate-supervision-pins.mjs` MODIFIED (BASELINE_11 freshness comment)
- **Atom 2 (Wave 3 / Plan 70-03):** validator+CI surface 5-file indivisible scope (chain-validator topology + CI-execution-graph indivisibility)
  - `scripts/validation/check-phase-67.mjs` NEW
  - `scripts/validation/check-phase-68.mjs` NEW
  - `scripts/validation/check-phase-69.mjs` NEW
  - `scripts/validation/check-phase-70.mjs` NEW
  - `.github/workflows/audit-harness-v1.7-integrity.yml` MODIFIED (HARNESS-04 EXTEND)
- Pre-commit dry-run protocol locked (see HARNESS-02 + HARNESS-04 sections below)

**D-03: HARNESS-05 terminal re-audit mechanics + ARCHIVE-01 timing — Option B (3-axis mandatory stacking + ARCHIVE-01 deferred)**
- Both evidence axes mandatory:
  - Axis 1 (local fresh-clone): fresh `gsd-executor` sub-agent + fresh `git clone --no-hardlinks` into `$env:TEMP\v1.7-audit-<rand>`
  - Axis 2 (cross-OS Linux GHA): `gh workflow run audit-harness-v1.7-integrity.yml --ref master` post-Wave-3
- 3-axis stacking: (1) fresh-clone D-03 + (2) fresh sub-agent D-22 + (3) cross-OS Linux GHA CILINUX-01
- ARCHIVE-01 recurrence-check **DEFERRED** to `/gsd-complete-milestone` skill invocation (NOT inside HARNESS-06)

**D-04: Plan structure + audit doc depth — Option D (Wave-based 5-plan + full v1.6 audit doc depth)**
- 5-plan structure with explicit `wave: 1..5` frontmatter + `depends_on: [70-(N-1)]` linear chaining (Phase 66 verbatim precedent)
- `v1.7-MILESTONE-AUDIT.md` maintains full v1.6 (344-line) depth — prose tightens naturally to 12-req corpus
- NEW section "Discoveries Surfaced During Execution" (per Claude's Discretion)

### Claude's Discretion

- **D-01 per-V-NN-NN freshness matrix authoring** — Plan 70-01 Wave-1 author writes ~16-40 row table in `70-CONVENTIONS.md`; V-NN-NN numbering is tactical choice within per-assertion-class framework
- **70-04-AUDIT-RESULTS.md section shape** — mirror Phase 66-04 verbatim + add B.2 Linux cross-OS evidence section
- **Plan 70-05 chicken-and-egg resolution** — `{phase_70_close_SHA}` placeholder follows two-commit Option (b) per D-04 recommendation: Commit A = SHA placeholder fill; Commit B = close-gate
- **Wave 4 axis 2 GHA workflow_dispatch invocation timing** — recommend immediate at Wave-4 start
- **v1.7-MILESTONE-AUDIT.md NEW "Discoveries Surfaced During Execution" section** — v1.7-specific addition that future v1.8+ may adopt

### Deferred Ideas (OUT OF SCOPE)

- v1.7 milestone archival (`/gsd-complete-milestone` skill territory; NOT HARNESS-06)
- ARCHIVE-01 recurrence-check (deferred to `/gsd-complete-milestone` invocation post-Phase-70)
- ARCHIVE-01 root-cause investigation (v1.8+ scope)
- CHAIN-WRAPPER-01 root-cause investigation (v1.8+ scope)
- Retrospective audit of HEAD-coupled assertions across `check-phase-{48..66}.mjs` per HARNESS-FORWARD-01 (v1.8+ scope)
- New C-checks beyond v1.6 inheritance (C1-C16 inherited verbatim)
- Any corpus (`docs/*`) edits
- Modifications to v1.4/v1.5/v1.6 workflow YAML files (predecessor-byte-unchanged invariant)
- BASELINE refresh beyond BASELINE_11
- CI-3 Managed Apple ID corpus rename (45 occurrences / 16 files; v1.8+ deferral)
- Worktree-based execution (`use_worktrees:false` durable)
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HARNESS-01 | `scripts/validation/v1.7-milestone-audit.mjs` Path-A copy from v1.6 with C1-C16 preserved; lineage extends `v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7` | §HARNESS-01 section — line-by-line edit spec; Path-A source mapped 1:1 |
| HARNESS-02 | `scripts/validation/v1.7-audit-allowlist.json` Path-A copy with `c13_rotting_external` reset + BASELINE_11 freshness comment in `regenerate-supervision-pins.mjs` | §HARNESS-02 section — exact JSON shape + BASELINE comment insertion point |
| HARNESS-03 | `check-phase-67..70.mjs` Path-A from `check-phase-66.mjs` with V-NN-SELF guard + per-assertion-class freshness routing per D-01 | §HARNESS-03 section — proposed V-NN-NN assertion lists per phase + freshness matrix |
| HARNESS-04 | `.github/workflows/audit-harness-v1.7-integrity.yml` EXTEND (NOT recreate) — path-filter swap + 2 crons + pin-helper-advisory + rotting-external-quarterly + chain-67..70 active invocations | §HARNESS-04 section — 9-step edit itemization with exact YAML snippets |
| HARNESS-05 | Terminal re-audit (Axis 1 local + Axis 2 GHA) → `70-04-AUDIT-RESULTS.md` | §HARNESS-05 section — PowerShell recipe + gh CLI capture sequence + section structure |
| HARNESS-06 | `v1.7-MILESTONE-AUDIT.md` NEW + `v1.7-DEFERRED-CLEANUP.md` FINALIZE + 4-doc traceability closure | §HARNESS-06 section — full v1.6 template mapping + Discoveries section + carry-forward list |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

CLAUDE.md describes the Windows Autopilot Troubleshooter & Improvement Suite (PowerShell/Python/React three-tier). **NOT load-bearing for Phase 70** since deliverables live entirely in `scripts/validation/` + `.github/workflows/` + `.planning/` — no PowerShell module, FastAPI endpoint, or React component touched. CLAUDE.md's security notes (never commit `.env`, audit log all admin actions) remain general guidance but are non-conflicting with Phase 70 scope.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Milestone audit harness (C1-C16 checks) | `scripts/validation/` Node.js validator | — | Existing tier owner; v1.7 inherits Path-A |
| Sidecar JSON shape + allowlist | `scripts/validation/` JSON sidecar | Node helper consumers | Established pattern; v1.6 schema preserved |
| BASELINE_NN freshness audit-trail | `scripts/validation/regenerate-supervision-pins.mjs` comment block | — | Existing comment block at lines 392-415; v1.7 appends |
| Per-phase chain validator | `scripts/validation/check-phase-NN.mjs` | Chain-apex recursion via `execFileSync` | Validator-as-deliverable pattern from v1.3+ |
| CI workflow (cross-OS validation) | `.github/workflows/audit-harness-v1.7-integrity.yml` | GHA ubuntu-latest runner | Extends Phase-69-staged file; co-exists with v1.4/v1.5/v1.6 |
| Milestone audit document | `.planning/milestones/v1.N-MILESTONE-AUDIT.md` | — | Path-A template inheritance v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 |
| Deferred-cleanup artifact | `.planning/milestones/v1.N-DEFERRED-CLEANUP.md` | — | Separate from MILESTONE-AUDIT per v1.6 D-04 precedent |
| Traceability closure | PROJECT.md + ROADMAP.md + STATE.md + REQUIREMENTS.md (4-doc) | — | Established 4-doc closure pattern across v1.4..v1.6 |
| Terminal re-audit independence | Fresh `gsd-executor` sub-agent + fresh `git clone --no-hardlinks` + GHA workflow_dispatch | 3-axis stacking | D-03 LOCKED mechanism + D-22 INTENT + CILINUX-01 axis |

## Standard Stack

### Core (No external dependencies introduced — Phase 70 uses installed Node.js + Git + gh CLI only)

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Node.js | ≥ 20 (workflow YAML pins `node-version: '20'`) | Runs all `*.mjs` validators | Established across v1.4..v1.6 |
| Git | (any modern) | `git clone --no-hardlinks`, `git show <SHA>:<path>` for v1.N-frozen-aware helpers | Established mechanism |
| gh CLI | (any modern) | `gh workflow run` + `gh run list` for Axis 2 GHA invocation | Established in Phase 69 evidence capture |
| markdown-link-check | `3.14.2` (pinned) | Quarterly rotting-external job (inherited from v1.6 workflow) | Existing pin; v1.7 workflow inherits |

### Supporting (project-internal, no install)

| File | Purpose | When to Use |
|------|---------|-------------|
| `scripts/validation/_lib/archive-path.mjs` | Phase 68 CHAIN-02 helper for `.planning/phases/` ↔ `.planning/milestones/<version>-phases/` path resolution | Inherited transparently via chain-apex; check-phase-67..70 do NOT modify |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Two-commit chicken-and-egg (D-04 Option b) | Literal `{phase_70_close_SHA}` placeholder (Plan 69-02 Option a) | Two-commit is cleaner audit-doc citation symmetry; literal-placeholder is one fewer commit but requires `git log --all --grep="70-05"` recovery |
| Path-A recreation of workflow YAML | EXTEND existing file | EXTEND is REQUIRED — file already exists post-Phase-69 `dd1ff08` + Fix-1 `85521bb` + Fix-2 `2d61981`; recreation would lose `fetch-depth: 0` inheritance and Phase 69 close-state |

**Installation:** None. All tooling pre-installed.

**Version verification:** No new packages installed. Existing `markdown-link-check@3.14.2` pin remains.

## Package Legitimacy Audit

**Not applicable to Phase 70** — zero new packages introduced. All tooling (Node.js, Git, gh CLI, markdown-link-check) is pre-installed and pinned via prior phases. Phase 70 only adds Node.js files (`.mjs`) and JSON sidecar; no `npm install` operations.

## Architecture Patterns

### System Architecture Diagram

```
                      ┌──────────────────────────────────┐
                      │ Phase 70 Pillar D Close-Gate     │
                      └──────────────────────────────────┘
                                       │
       ┌──────────────────────┬────────┴────────┬──────────────────────┐
       │                      │                 │                      │
   Wave 1                  Wave 2            Wave 3                Wave 4
   Scaffold               Atom 1            Atom 2              Re-Audit
       │                      │                 │                      │
       │ 70-CONVENTIONS.md   │                 │                      │
       │ (V-NN-NN matrix)    │                 │                      │
       │                      │                 │                      │
       │ check-phase-70.mjs  ├─►  HARNESS-01  ├─► HARNESS-03         ├─► HARNESS-05
       │ scaffold (V-NN-SELF │  v1.7-milestone │  check-phase-67    │  Axis 1: fresh
       │  guard)             │  -audit.mjs     │  check-phase-68    │  clone + fresh
       │                      │                 │  check-phase-69    │  gsd-executor
       │                      │  HARNESS-02     │  check-phase-70    │
       │                      │  v1.7-audit-    │                    │  Axis 2: GHA
       │                      │  allowlist.json │  HARNESS-04        │  workflow_
       │                      │  + BASELINE_11  │  workflow YAML     │  dispatch on
       │                      │                 │  EXTEND (9 edits)  │  master HEAD
       │                      │                 │                    │
       │                      ▼                 ▼                    ▼
       │              ONE atomic commit  ONE atomic commit    70-04-AUDIT-
       │              (3 files)          (5 files)             RESULTS.md
       │                                                              │
       └──────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
                                   Wave 5 (70-05)
                                   HARNESS-06
                                       │
       ┌──────────────────────┬────────┴────────┬──────────────────────┐
       │                      │                 │                      │
   Commit A:              v1.7-MILESTONE      v1.7-DEFERRED       Traceability
   {phase_70_close_SHA}   -AUDIT.md NEW       -CLEANUP.md         closure (4 docs:
   placeholder fill in    (Path-A from v1.6,  FINALIZE (extend    PROJECT, ROADMAP,
   frozen-aware refs of   344-line full       with v1.6 carry-    STATE,
   check-phase-NN.mjs     depth + Discoveries overs + final       REQUIREMENTS)
                          section)            dispositions)
                                       │
                                       ▼
                              Commit B: close-gate
                              (12/12 v1.7 reqs Active → Validated)
```

### Recommended Project Structure

```
.planning/phases/70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo/
├── 70-CONTEXT.md                  # (exists)
├── 70-RESEARCH.md                 # (this file)
├── 70-CONVENTIONS.md              # Wave 1 deliverable: per-V-NN-NN freshness matrix
├── 70-01-PLAN.md ... 70-05-PLAN.md
├── 70-01-SUMMARY.md ... 70-05-SUMMARY.md
├── 70-04-AUDIT-RESULTS.md         # Wave 4 deliverable
└── 70-VERIFICATION.md             # Wave 5 close-gate report

scripts/validation/
├── v1.7-milestone-audit.mjs       # Wave 2 NEW
├── v1.7-audit-allowlist.json      # Wave 2 NEW
├── regenerate-supervision-pins.mjs # Wave 2 MODIFIED (BASELINE_11 comment append)
├── check-phase-67.mjs ... check-phase-70.mjs  # Wave 3 NEW (4 validators)
└── (predecessor files BYTE-UNCHANGED)

.github/workflows/
├── audit-harness-v1.7-integrity.yml  # Wave 3 EXTEND (9 itemized edits)
└── (v1.4/v1.5/v1.6 BYTE-UNCHANGED)

.planning/milestones/
├── v1.7-MILESTONE-AUDIT.md        # Wave 5 NEW (Path-A from v1.6)
└── v1.7-DEFERRED-CLEANUP.md       # Wave 5 EXTEND (carry-forward + final)
```

---

## HARNESS-01: v1.7-milestone-audit.mjs Path-A Specifics

### Path-A Source

`scripts/validation/v1.6-milestone-audit.mjs` (980 lines verified) — copy verbatim, then apply lineage edits below.

### Required Edits (line-anchored)

| Edit # | Source line(s) | Mod | Spec |
|--------|---------------|-----|------|
| E-01 | Line 2 | REWRITE | Replace header comment `// v1.6 Milestone Audit Harness (Path A copy of v1.5 + C14/C15/C16 blocking-from-start + '+' separator parsing)` → `// v1.7 Milestone Audit Harness (Path A copy of v1.6; lineage v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7; C1-C16 inherited verbatim)` |
| E-02 | Line 3 | REWRITE | Replace `// Source of truth: .planning/phases/62-apple-business-foundation-rebrand/62-CONTEXT.md (D-01..D-05)` → `// Source of truth: .planning/phases/70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo/70-CONTEXT.md (D-01..D-04)` |
| E-03 | Line 4 | REWRITE | Replace `// Sidecar allow-list: scripts/validation/v1.6-audit-allowlist.json (new sidecar; ...)` → `// Sidecar allow-list: scripts/validation/v1.7-audit-allowlist.json (v1.7 Path-A from v1.6 with c13_rotting_external reset for v1.7 per Phase 67 SWEEP-01/02 close-state)` |
| E-04 | Line 5 | REWRITE | Replace `// Frozen-predecessor reproducibility anchor: v1.5-milestone-audit.mjs pinned at Phase 61 close` → `// Frozen-predecessor reproducibility anchor: v1.6-milestone-audit.mjs pinned at Phase 66 close` |
| E-05 | Line 35 | REWRITE | Replace usage docstring: `// Usage: node scripts/validation/v1.6-milestone-audit.mjs [--verbose] [--self-test]` → `// Usage: node scripts/validation/v1.7-milestone-audit.mjs [--verbose] [--self-test]` |
| E-06 | Line 79 | REWRITE | Replace `const raw = readFile('scripts/validation/v1.6-audit-allowlist.json');` → `const raw = readFile('scripts/validation/v1.7-audit-allowlist.json');` |

### Anti-Modifications (DO NOT TOUCH)

- C1-C16 check bodies (lines 246-808) — preserved verbatim per D-A9 inheritance
- C14/C15/C16 regex bodies (lines 689-727) — preserved verbatim
- Self-test synthetic tests (lines 816-940) — preserved verbatim
- Runner loop (lines 944-979) — preserved verbatim
- All helper functions (`readFile`, `walkMd`, `parseAllowlist`, `appleBusinessDocPaths`, `parsePlatformValue`, `relNormalize`, `androidDocPaths`, `linuxDocPaths`) preserved verbatim except `parseAllowlist` (single line 79 path edit per E-06)
- `c14_callout_sites` literal token list lines 694: `['Apple Business Manager', 'Apple Business', '2026-04-14']` — preserved verbatim (CONTEXT D-01 + REQUIREMENTS.md:32 + STATE.md:96 lock C1-C16 inheritance)

### Acceptance Criteria Template

```
- `scripts/validation/v1.7-milestone-audit.mjs` exists and is byte-identical to v1.6 except for 6 lineage edits (E-01..E-06)
- `node scripts/validation/v1.7-milestone-audit.mjs` exits 0 with "Summary: 15 passed, 0 failed, 0 skipped" (15 BLOCKING checks: C1, C2, C3 informational, C4 informational, C5, C6, C7, C9, C10, C11, C12, C13, C14, C15, C16)
- `node scripts/validation/v1.7-milestone-audit.mjs --self-test` exits 0 with "Self-test: 9 passed, 0 failed"
- `node scripts/validation/v1.7-milestone-audit.mjs --verbose` shows C3 + C4 informational detail + all 15 PASS lines
- `git diff scripts/validation/v1.6-milestone-audit.mjs scripts/validation/v1.7-milestone-audit.mjs` shows exactly 6 line changes (E-01..E-06)
```

### Dependency Notes

- Depends on HARNESS-02 in the same atomic commit (Atom 1) — harness references the v1.7 sidecar at line 79; sidecar must exist or `parseAllowlist()` degrades to empty arrays and C2/C13/C14/C15/C16 FAIL
- BASELINE_11 freshness comment in `regenerate-supervision-pins.mjs` is the third file in Atom 1 (also HARNESS-02 contract)

---

## HARNESS-02: v1.7-audit-allowlist.json Path-A Specifics + BASELINE_11

### Path-A Source

`scripts/validation/v1.6-audit-allowlist.json` (121 lines verified) — copy verbatim, then apply 5 mutations below.

### Required Mutations

| Mutation # | JSON path | Mod | Spec |
|-----------|----------|-----|------|
| M-01 | `schema_version` (line 2) | KEEP | Retain `"1.1"` (no schema change between v1.6 and v1.7) |
| M-02 | `generated` (line 3) | UPDATE | Replace `"2026-05-21T00:00:00Z"` → `"2026-05-28T00:00:00Z"` (or Wave 2 commit date) |
| M-03 | `phase` (line 4) | UPDATE | Replace `"62-apple-business-foundation-rebrand"` → `"70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo"` |
| M-04 | `c13_rotting_external.ci_1_abm_urls` (lines 80-85) | RESET-AND-INHERIT | Carry forward the 4 entries verbatim from v1.6 sidecar but verify each has `"last_revalidated": "2026-05-26"` already populated (per Phase 67 Plan 67-01 commit `3fb8ca5`); these reflect post-revalidation state — Phase 70 inherits as-is |
| M-05 | `c13_rotting_external.ci_2_vpp_location_token` (lines 86-93) | RESET-OR-EMPTY | The 6 entries in v1.6 sidecar already carry `"resolved_2026_05_26": true` per Phase 67 Plan 67-02 commit `55260b3`. **Decision point for Plan 70-02 author:** (a) inherit 6 entries as-is with `"resolved": true` markers (audit-trail continuity), OR (b) clear array `[]` to reflect "post-rename clean state" (CONTEXT D-01 wording "reset for v1.7"). Recommend (a) — empirically consistent with v1.6 sidecar's annotate-not-remove pattern; (b) breaks the audit trail. |
| M-06 | `c13_rotting_external.ci_3_managed_apple_id` (lines 94-112) | KEEP-AS-IS | 16-file enumeration unchanged — CI-3 remains deferred to v1.8+; Phase 70 carries it forward verbatim |
| M-07 | `c13_rotting_external.quarterly_audit` (lines 113-118) | UPDATE | Update `"next_review": "2026-07-01"` if Phase 70 close lands after 2026-07-01 (next quarterly cron fire); otherwise preserve |
| M-08 | `c16_missing_endpoint_exemptions` (line 120) | KEEP-EMPTY | `[]` — Phase 65 atomic-trio cleared all sunset-65 exemptions; v1.7 inherits empty (V-66-06 / V-65-13 invariants) |
| M-09 | All other keys (`supervision_exemptions`, `safetynet_exemptions`, `c7_knox_allowlist`, `cope_banned_phrases`, `c9_exemptions`, `c11_ops_exemptions`, `c11_ops_patterns` if present, `c13_broken_link_allowlist`) | KEEP-AS-IS | Path-A inheritance verbatim |

### BASELINE_11 Freshness Comment (HARNESS-02 sub-contract)

**Target file:** `scripts/validation/regenerate-supervision-pins.mjs`
**Insertion point:** Append new comment block AFTER existing BASELINE_10 + Phase 68 Plan 68-02 carry-over comments (currently at lines 401-415) and BEFORE `const BASELINE_9 = [` declaration at line 416.

**Exact insertion text:**

```javascript
// BASELINE_11 refreshed 2026-05-28 (Phase 70 Plan 70-02): closes BASELINE_10 v1.6 carry-over
// per HARNESS-02 contract (REQUIREMENTS.md:32 + ROADMAP.md:370); v1.7 line positions verified
// against HEAD {phase_70_atom_1_SHA} (Phase 69 close-gate baseline + Phase 70 Plan 70-01 chain green).
// BASELINE_9 entries above remain unchanged -- Phase 70 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 70
// close and remain valid for the v1.7 corpus. Resolution path: BASELINE_12 will refresh at
// v1.8 close per the Path-A inheritance pattern (v1.4.1 -> BASELINE_8 -> v1.5 -> BASELINE_9
// -> v1.6 -> BASELINE_10 -> v1.7 -> BASELINE_11).
```

**Note on placeholder `{phase_70_atom_1_SHA}`:** This is the literal-placeholder convention. The Plan 70-02 author can either:
- Leave the placeholder as literal (recoverable via `git log --all --grep="70-02"`) — minimal-friction, single-commit Wave 2
- OR follow up with a sed -i pass post-commit to substitute the SHA (additional commit; not recommended for Wave 2 since Wave 5 already does this via two-commit chicken-and-egg)

Recommendation: **leave as literal placeholder**. Wave 5 Plan 70-05 already runs a SHA-substitution commit (Commit A) for the check-phase-NN.mjs frozen-aware refs — the BASELINE_11 placeholder can ride that same commit if desired, OR be substituted in a separate sed -i pass within Plan 70-05 Commit A scope.

### parseAllowlist() v1.6 → v1.7 Lineage Repoint (additional sub-contract surfacing during dry-run)

**Forward-pointer captured in regenerate-supervision-pins.mjs:414-415:**
> "Forward-pointer: Phase 70 HARNESS-02 repoints parseAllowlist() to v1.7 sidecar at that future commit via 1-line edit (line 422)."

**Actual target lines** (verified from regenerate-supervision-pins.mjs grep):
- Line 290: `const allow = parseAllowlist('scripts/validation/v1.6-audit-allowlist.json');` (in `doReport`)
- Line 336: `const allow = parseAllowlist('scripts/validation/v1.6-audit-allowlist.json');` (in `doEmitStubs`)
- Line 431: `const allow = parseAllowlist('scripts/validation/v1.6-audit-allowlist.json');` (in `doSelfTest`)
- Line 433: `process.stderr.write('FAIL: sidecar missing at scripts/validation/v1.6-audit-allowlist.json\n');` (error message)

**Decision point for Plan 70-02 author:** Whether to repoint these 4 sites within Atom 1 OR defer to a separate plan. Two considerations:

1. **If repointed in Atom 1:** Adds 4 line edits to a 4th file (`regenerate-supervision-pins.mjs`) but BASELINE_11 comment edit already touches that file. Net: still 3 files in Atom 1, 5 line edits in `regenerate-supervision-pins.mjs`. Atom 1 remains literal Phase 66-02 3-file precedent.
2. **If deferred:** Creates risk that v1.7-milestone-audit.mjs ships referencing v1.7 sidecar (per E-06) while regenerate-supervision-pins.mjs `--self-test` continues to read v1.6 sidecar — divergent provenance at the same milestone.

**Recommendation:** **Repoint all 4 sites within Atom 1 BASELINE_11 commit** — keeps the 3-file Atom 1 scope but ensures sidecar-provenance coherence across the v1.7 milestone-close state.

### Atomic-Commit Dry-Run Protocol (Atom 1)

**Inherits Phase 66-02 D-01 5-step pattern:**

```
1. Stage Atom 1 files in working tree (NOT yet `git add`):
   - scripts/validation/v1.7-milestone-audit.mjs NEW
   - scripts/validation/v1.7-audit-allowlist.json NEW
   - scripts/validation/regenerate-supervision-pins.mjs MODIFIED (BASELINE_11 + parseAllowlist repoint)

2. Pre-commit dry-run sequence (each MUST exit 0 before proceeding):
   a. node scripts/validation/v1.7-milestone-audit.mjs
      → expect: exit 0; "Summary: 15 passed, 0 failed, 0 skipped"
   b. node scripts/validation/v1.7-milestone-audit.mjs --self-test
      → expect: exit 0; "Self-test: 9 passed, 0 failed"
   c. node scripts/validation/regenerate-supervision-pins.mjs --self-test
      → expect: exit 0; "Un-pinned Tier-2 count: 0"
   d. node scripts/validation/v1.6-milestone-audit.mjs  # regression guard
      → expect: exit 0; "Summary: 15 passed, 0 failed, 0 skipped" (predecessor BYTE-UNCHANGED)
   e. node scripts/validation/check-phase-66.mjs  # chain regression guard
      → expect: exit 0; "Result: 23 PASS, 0 FAIL, 0 SKIPPED" (or equivalent post-Phase-68 state)

3. If any of (a)-(e) red, reconcile within Atom 1 (do NOT cross atomic boundary):
   - Most likely red: (a)/(b) caught a typo in E-01..E-06 OR a parseAllowlist() path mismatch
   - Fix in working tree, re-run from step 2a

4. Stage commit:
   git add scripts/validation/v1.7-milestone-audit.mjs \
           scripts/validation/v1.7-audit-allowlist.json \
           scripts/validation/regenerate-supervision-pins.mjs

5. Verify staging boundary:
   git diff --cached --name-only
   → expect exactly 3 files; abort if more or fewer

6. Commit:
   git commit -m "feat(harness): v1.7 audit harness atomic Atom 1 — Path-A from v1.6"

7. Post-commit verification:
   git log --name-only -1 HEAD
   → expect exactly the 3 files (no others)
   git diff HEAD~1 HEAD --stat
   → expect ~10-20 lines changed (E-01..E-06 + BASELINE_11 comment + parseAllowlist 4-line repoint + sidecar inherited shape)
```

### Acceptance Criteria Template

```
- scripts/validation/v1.7-audit-allowlist.json exists and is valid JSON (JSON.parse succeeds)
- schema_version = "1.1"; c13_rotting_external is an OBJECT (not empty array)
- c13_rotting_external.quarterly_audit.cadence === "0 8 1 1,4,7,10 *"
- c13_rotting_external.ci_1_abm_urls.length === 4
- c13_rotting_external.ci_2_vpp_location_token.length === 6 (annotate-not-remove)
- c13_rotting_external.ci_3_managed_apple_id maintained for v1.8+ deferral tracking
- c16_missing_endpoint_exemptions.length === 0
- scripts/validation/regenerate-supervision-pins.mjs contains "BASELINE_11 refreshed"
- scripts/validation/regenerate-supervision-pins.mjs contains "Phase 70" attribution
- scripts/validation/regenerate-supervision-pins.mjs parseAllowlist() calls reference v1.7-audit-allowlist.json (4 sites)
- ALL 3 files in ONE atomic commit verified via `git log --name-only -1 HEAD`
- v1.7 harness + v1.6 harness BOTH exit 0 post-commit (no predecessor regression)
- regenerate-supervision-pins.mjs --self-test exits 0 with v1.7 sidecar
```

### Dependency Notes

- HARNESS-01 + HARNESS-02 + BASELINE_11 land as ONE atomic commit (Atom 1 / Wave 2 / Plan 70-02 single commit)
- Atom 1 is independent of Atom 2 except that Atom 2's check-phase-70.mjs V-70-01 will assert HARNESS-01 deliverable existence and Atom 2's workflow YAML EXTEND will repoint to v1.7 sidecar

---

## HARNESS-03: Per-Phase Validators check-phase-67..70.mjs

### Path-A Source

`scripts/validation/check-phase-66.mjs` (380 lines verified) — copy verbatim per validator, then apply per-phase customization below.

### Per-Validator Per-Assertion-Class Freshness Routing (D-01 LOCKED)

#### check-phase-67.mjs (HARNESS-03 sub-deliverable A)

**CHAIN_PHASES** = `[48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66]` (excludes 67 per V-NN-SELF guard)
**CHAIN_SKIP** = `new Set([])` (inherited from check-phase-66 post-Phase-68; permanent invariant)

**Proposed assertion list (planner refines exact V-NN-NN numbering in 70-CONVENTIONS.md):**

| V-67-NN | Assertion | Freshness Class | Mechanism |
|---------|-----------|-----------------|-----------|
| V-67-01 | SWEEP-01 ABM URLs: 4 URLs in 4 files unchanged from post-revalidation state | v1.7-frozen-aware | Read corpus at `{phase_70_close_SHA}` via `readCorpusAtV17Close()` helper |
| V-67-02 | SWEEP-01 sidecar c13_rotting_external.ci_1_abm_urls: 4 entries with `last_revalidated: 2026-05-26` | v1.7-frozen-aware | Read v1.7-audit-allowlist.json at `{phase_70_close_SHA}` |
| V-67-03 | SWEEP-02 VPP rename: 6 surgical edits across 2 files (5 `content token` mentions + first-mention compound form) | v1.7-frozen-aware | Read corpus at `{phase_70_close_SHA}` |
| V-67-04 | SWEEP-02 sidecar c13_rotting_external.ci_2_vpp_location_token: 6 entries with `resolved_2026_05_26: true` annotations | v1.7-frozen-aware | Read v1.7-audit-allowlist.json at `{phase_70_close_SHA}` |
| V-67-05 | SWEEP-02 OP-10 callout: 2 OP-10 first-mention-per-H2 callouts present | v1.7-frozen-aware | Read corpus at `{phase_70_close_SHA}` |
| V-67-06 | SWEEP-02 Version History rows: 2 VH rows in 2 affected files + glossary coord row | v1.7-frozen-aware | Read corpus at `{phase_70_close_SHA}` |
| V-67-07 | last_verified bumps: 3 frontmatter updates to `2026-05-26` (iOS + macOS + glossary) | v1.7-frozen-aware | Read corpus at `{phase_70_close_SHA}` |
| V-67-CHAIN | chain regression-guards for check-phase-{48..66}.mjs (each exit 0) | HEAD-coupled | execFileSync invocation pattern (lines 293-321 verbatim from check-phase-66.mjs) |
| V-67-AUDIT | v1.7-milestone-audit.mjs exits 0 (15/15 PASS) | HEAD-coupled | execFileSync pattern |
| V-67-SELF | CHAIN_PHASES does NOT include 67 | HEAD-coupled | Set membership check (line 342-348 pattern from check-phase-66.mjs) |

#### check-phase-68.mjs (HARNESS-03 sub-deliverable B)

**CHAIN_PHASES** = `[48..67]` (excludes 68)
**CHAIN_SKIP** = `new Set([])`

**Proposed assertion list:**

| V-68-NN | Assertion | Freshness Class | Mechanism |
|---------|-----------|-----------------|-----------|
| V-68-01 | CHAIN-01: check-phase-51.mjs readFile() contains `.replace(/\r\n/g, '\n')` | HEAD-coupled | `c.includes(".replace(/\\r\\n/g, '\\n')")` source grep |
| V-68-02 | CHAIN-01: check-phase-58.mjs readFile() contains `.replace(/\r\n/g, '\n')` | HEAD-coupled | source grep |
| V-68-03 | CHAIN-02: `scripts/validation/_lib/archive-path.mjs` exists | HEAD-coupled | existsSync check |
| V-68-04 | CHAIN-02: archive-path helper called from 5 call-sites (check-phase-{31,48,60,62,63}.mjs + regenerate-supervision-pins.mjs) | HEAD-coupled | source grep across 6 files |
| V-68-05 | CHAIN-02: regenerate-supervision-pins.mjs BASELINE_9 +1 banner shift documented in BASELINE comment block | v1.7-frozen-aware (state at v1.7 close) | Read at `{phase_70_close_SHA}` |
| V-68-06 | CHAIN-02: parseAllowlist() lineage repointed (v1.5 → v1.6 historical, then v1.6 → v1.7 at Plan 70-02) | HEAD-coupled | source grep for `v1.7-audit-allowlist.json` reference |
| V-68-07 | CHAIN-03: CHAIN_SKIP = `new Set([])` across check-phase-{62..66}.mjs (5 validators) | HEAD-coupled | source grep `new Set\(\[\]\)` in 5 files |
| V-68-08 | CHAIN-31 STRETCH: check-phase-31.mjs `_missing` discriminator marker | HEAD-coupled | source grep |
| V-68-09 | MILESTONES.md cdcce23 garbage entry deletion: zero `One-liner:` placeholders in v1.5 section | v1.7-frozen-aware | Read MILESTONES.md at `{phase_70_close_SHA}` |
| V-68-10 | v1.5-frozen-aware helpers: check-phase-61.mjs `readRequirementsAtV15Close()` + `readRoadmapAtV15Close()` present | HEAD-coupled | source grep |
| V-68-11 | subprocess timeout: 10 sites bumped 60000 → 300000 across check-phase-{62..66}.mjs | HEAD-coupled | source grep `timeout: 300000` |
| V-68-CHAIN | chain regression-guards for check-phase-{48..67}.mjs | HEAD-coupled | execFileSync pattern |
| V-68-AUDIT | v1.7-milestone-audit.mjs exits 0 | HEAD-coupled | execFileSync |
| V-68-SELF | CHAIN_PHASES does NOT include 68 | HEAD-coupled | Set membership check |

#### check-phase-69.mjs (HARNESS-03 sub-deliverable C)

**CHAIN_PHASES** = `[48..68]` (excludes 69)
**CHAIN_SKIP** = `new Set([])`

**Proposed assertion list:**

| V-69-NN | Assertion | Freshness Class | Mechanism |
|---------|-----------|-----------------|-----------|
| V-69-01 | `.github/workflows/audit-harness-v1.7-integrity.yml` exists | HEAD-coupled | existsSync |
| V-69-02 | Workflow has 4 jobs (parse + path-match + harness-run + linux-chain-ubuntu-latest) | HEAD-coupled | YAML substring check |
| V-69-03 | linux-chain-ubuntu-latest job has `core.autocrlf false` step | HEAD-coupled | substring check |
| V-69-04 | linux-chain-ubuntu-latest checkout step has `fetch-depth: 0` (FETCH-DEPTH-01 inheritance) | HEAD-coupled | substring check `with: { fetch-depth: 0 }` |
| V-69-05 | linux-chain-ubuntu-latest `continue-on-error: false` (PR-blocking per D-A9) | HEAD-coupled | substring check |
| V-69-06 | `node-version: '20'` declared | HEAD-coupled | substring check |
| V-69-07 | `::notice title=CHAIN_TIMING_LINUX::` emission present | HEAD-coupled | substring check (verifies Phase 69 close-state preserved post-HARNESS-04) |
| V-69-08 | Predecessor workflows (v1.4/v1.5/v1.6) byte-unchanged | HEAD-coupled | Compare file hashes against frozen blob SHAs documented in 70-CONVENTIONS.md |
| V-69-CHAIN | chain regression-guards for check-phase-{48..68}.mjs | HEAD-coupled | execFileSync |
| V-69-AUDIT | v1.7-milestone-audit.mjs exits 0 | HEAD-coupled | execFileSync |
| V-69-SELF | CHAIN_PHASES does NOT include 69 | HEAD-coupled | Set membership check |

**Note re: Phase 69 close-state vs HEAD:** Phase 69 close-gate measured the workflow YAML in a specific state. HARNESS-04 in Phase 70 will EXTEND that file (path-filter swap + 2 crons + pin-helper-advisory + rotting-external-quarterly + chain-67..70 active invocations). check-phase-69.mjs assertions about workflow YAML are intentionally HEAD-coupled (D-01 routing) because:
- Workflow YAML is a live contract that legitimately mutates as v1.7 progresses
- The Phase 69 SC#1-5 requirements (CILINUX-01) closed at Phase 69 close — verified once at that close
- Phase 70 HARNESS-04 extensions are ADDITIVE (add jobs/crons; preserve fetch-depth:0); a check-phase-69 V-69-NN assertion that the file contains both Phase 69 close-state attributes AND Phase 70 extension attributes is the correct invariant going forward

#### check-phase-70.mjs (HARNESS-03 sub-deliverable D — MOST COMPLEX)

**CHAIN_PHASES** = `[48..69]` (excludes 70)
**CHAIN_SKIP** = `new Set([])`

**Proposed assertion list:**

| V-70-NN | Assertion | Freshness Class | Mechanism |
|---------|-----------|-----------------|-----------|
| V-70-01 | HARNESS-01: `scripts/validation/v1.7-milestone-audit.mjs` exists | HEAD-coupled | existsSync |
| V-70-02 | HARNESS-01: lineage docstring contains `v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7` | HEAD-coupled | substring check |
| V-70-03 | HARNESS-01: harness references v1.7-audit-allowlist.json (parseAllowlist path) | HEAD-coupled | substring check |
| V-70-04 | HARNESS-02: `scripts/validation/v1.7-audit-allowlist.json` exists + valid JSON | HEAD-coupled | JSON.parse |
| V-70-05 | HARNESS-02: sidecar shape (`c13_rotting_external` object + `quarterly_audit.cadence === "0 8 1 1,4,7,10 *"` + `c16_missing_endpoint_exemptions: []`) | HEAD-coupled | JSON shape check |
| V-70-06 | HARNESS-02: BASELINE_11 freshness comment in regenerate-supervision-pins.mjs | HEAD-coupled | substring check `BASELINE_11 refreshed` + `Phase 70` |
| V-70-07 | HARNESS-03: 4 validators exist (check-phase-67/68/69/70.mjs) | HEAD-coupled | existsSync × 4 |
| V-70-08 | HARNESS-03: V-NN-SELF guard verified per validator (CHAIN_PHASES does not include own phase) | HEAD-coupled | source grep + parse check |
| V-70-09 | HARNESS-04: workflow YAML path-filter contains `scripts/validation/v1.7-*` | HEAD-coupled | substring check |
| V-70-10 | HARNESS-04: workflow YAML path-filter does NOT contain `docs/decision-trees/09-linux-triage.md` (REMOVED per Phase-69 D-04 sub-decision (a)) | HEAD-coupled | substring absence check |
| V-70-11 | HARNESS-04: workflow YAML has 2 crons (`0 8 * * 1` + `0 8 1 1,4,7,10 *`) | HEAD-coupled | substring × 2 |
| V-70-12 | HARNESS-04: workflow YAML has `pin-helper-advisory` job with `continue-on-error: true` | HEAD-coupled | YAML structure check |
| V-70-13 | HARNESS-04: workflow YAML has `rotting-external-quarterly` job | HEAD-coupled | substring check |
| V-70-14 | HARNESS-04: workflow YAML chain-67..70 are ACTIVE `node` invocations (NOT skip-if-missing for-loop) | HEAD-coupled | regex check for explicit `node scripts/validation/check-phase-67.mjs` etc. |
| V-70-15 | HARNESS-04: workflow YAML PRESERVES `fetch-depth: 0` on linux-chain-ubuntu-latest checkout | HEAD-coupled | substring check |
| V-70-16 | HARNESS-04: workflow YAML parse/path-match/harness-run jobs reference v1.7 sidecar/harness (NOT v1.6) | HEAD-coupled | substring check |
| V-70-17 | HARNESS-04: Predecessor workflows (v1.4/v1.5/v1.6) BYTE-UNCHANGED | HEAD-coupled | blob SHA comparison |
| V-70-18 | HARNESS-05: `70-04-AUDIT-RESULTS.md` exists in phase dir | v1.7-frozen-aware | Read at `{phase_70_close_SHA}` |
| V-70-19 | HARNESS-05: audit-results document contains B.1 (local fresh-clone) + B.2 (Linux GHA cross-OS) sections | v1.7-frozen-aware | Read at close-SHA |
| V-70-20 | HARNESS-06: `.planning/milestones/v1.7-MILESTONE-AUDIT.md` exists with YAML frontmatter (milestone: v1.7, status: passed, scores.requirements: 12/12, scores.phases: 4/4) | v1.7-frozen-aware | Read at close-SHA |
| V-70-21 | HARNESS-06: milestone audit doc has performed_by + Auditor-Independence + Command Verification Table sections | v1.7-frozen-aware | Read at close-SHA |
| V-70-22 | HARNESS-06: milestone audit doc has NEW "Discoveries Surfaced During Execution" section (FETCH-DEPTH-01 + SCOPE-GAP-61 + D-04-OVERSPEC-01 + CHAIN-WRAPPER-01 + ARCHIVE-01) | v1.7-frozen-aware | Read at close-SHA |
| V-70-23 | HARNESS-06: `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` finalized (carry-forward + v1.6 items + Phase 69 discoveries) | v1.7-frozen-aware | Read at close-SHA |
| V-70-24 | Traceability closure: PROJECT.md Validated section has 12 v1.7 rows | v1.7-frozen-aware | Read at close-SHA |
| V-70-25 | Traceability closure: ROADMAP.md Progress table 4/4 v1.7 phases (67-70) Complete | v1.7-frozen-aware | Read at close-SHA |
| V-70-26 | Traceability closure: STATE.md frontmatter status: complete + completed_phases: 4 / total_phases: 4 for v1.7 | v1.7-frozen-aware | Read at close-SHA |
| V-70-27 | Traceability closure: REQUIREMENTS.md Traceability table 12 v1.7 rows all "Complete" | v1.7-frozen-aware | Read at close-SHA |
| V-70-CHAIN | chain regression-guards for check-phase-{48..69}.mjs | HEAD-coupled | execFileSync |
| V-70-AUDIT | v1.7-milestone-audit.mjs exits 0 | HEAD-coupled | execFileSync |
| V-70-SELF | CHAIN_PHASES does NOT include 70 | HEAD-coupled | Set membership check |

**Total V-70-NN count:** ~30 (V-70-01..V-70-27 + V-70-CHAIN + V-70-AUDIT + V-70-SELF). Plan 70-01 author may consolidate/split — D-01 freshness routing is the constraint, not the exact numbering.

### v1.7-frozen-aware Helper Pattern (Plan 70-01 Wave-1 Authoring)

For assertions tagged "v1.7-frozen-aware" above, the planner MUST provide a helper analogous to `readRequirementsAtV15Close()` / `readRoadmapAtV15Close()`:

```javascript
// Reads <FILE> at v1.7-close SHA {phase_70_close_SHA} (frozen state).
// {phase_70_close_SHA} is the literal placeholder until Plan 70-05 Commit A
// substitutes the actual Phase 70 close-gate commit SHA via sed -i.
function read<File>AtV17Close() {
  try {
    return execFileSync('git', ['show', '{phase_70_close_SHA}:<relative-path>'], { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n');
  } catch (err) {
    return null;
  }
}
```

**Helpers needed across the 4 validators (Plan 70-01 author lists explicitly in 70-CONVENTIONS.md):**
- `readCorpusFileAtV17Close(relPath)` — generic corpus file reader for SWEEP-01/02 assertions
- `readSidecarAtV17Close()` — reads `scripts/validation/v1.7-audit-allowlist.json` at close-SHA
- `readMilestoneAuditAtV17Close()` — reads `.planning/milestones/v1.7-MILESTONE-AUDIT.md` at close-SHA
- `readDeferredCleanupAtV17Close()` — reads `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` at close-SHA
- `readRequirementsAtV17Close()` / `readRoadmapAtV17Close()` / `readStateAtV17Close()` / `readProjectAtV17Close()` — for traceability assertions
- `readMilestonesAtV17Close()` — for V-68-09 cdcce23-cleanup post-state

### Acceptance Criteria Template

```
For each of check-phase-67/68/69/70.mjs:
- File exists in scripts/validation/
- Path-A from check-phase-66.mjs verified via structural-diff (helpers + runner loop byte-identical)
- CHAIN_PHASES = [48..N-1] (excludes own phase)
- CHAIN_SKIP = new Set([]) (inherited from Phase 68 close)
- V-NN-SELF asserts CHAIN_PHASES does NOT include own phase number
- Phase-specific V-NN-NN assertions per 70-CONVENTIONS.md freshness matrix
- v1.7-frozen-aware helpers use {phase_70_close_SHA} placeholder (Wave-5 chicken-and-egg fill)
- Validator runs to completion (exit 0 or 1 with explicit FAIL list — never crashes)
- On execution post-Wave-5 close: check-phase-{67,68,69,70}.mjs each exit 0 with V-NN-SELF PASS + V-NN-CHAIN cascade PASS + V-NN-AUDIT PASS + all V-NN-NN PASS
```

### Dependency Notes

- check-phase-67/68/69.mjs scaffolds can be authored in Wave 1 (Plan 70-01) but final V-NN-NN bodies depend on the freshness matrix in 70-CONVENTIONS.md
- check-phase-70.mjs Wave 1 scaffold lands with V-70-SELF + V-70-AUDIT + V-70-CHAIN + empty placeholders for V-70-01..27; bodies fill in Wave 3 (Plan 70-03 Atom 2)
- ALL 4 validators land in Atom 2 (Wave 3 / Plan 70-03 single commit) per D-02

---

## HARNESS-04: Workflow YAML EXTEND Specifics

### Target File

`.github/workflows/audit-harness-v1.7-integrity.yml` (94 lines verified at HEAD post-Phase-69)

**CRITICAL:** This file ALREADY EXISTS. Phase 70 MODIFIES — does NOT recreate via Path-A. Recreating would lose:
- Phase 69 Fix-1 `85521bb` `fetch-depth: 0` setting (FETCH-DEPTH-01 inheritance contract)
- Phase 69 Fix-2 `2d61981` workflow integrity post-V-61-05..08 closure
- `core.autocrlf false` step
- `::notice title=CHAIN_TIMING_LINUX::` emission

### Itemized Edits (9 mandatory)

#### EDIT (a) — REMOVE `docs/decision-trees/09-linux-triage.md` from path-filter

**Source line 13** (currently):
```yaml
      - 'docs/decision-trees/09-linux-triage.md'
```

**Action:** DELETE this line entirely.

**Rationale:** Phase-69-SC#5-evidence-only entry per CONTEXT D-04 sub-decision (a); no v1.7-deliverable status. Captured in v1.7-DEFERRED-CLEANUP.md / STATE.md:138 "REMOVE docs/decision-trees/09-linux-triage.md from path-filter".

#### EDIT (b) — Path-filter swap v1.6 → v1.7-scoped surfaces

**Source lines 9-13** (current state):
```yaml
    paths:
      - 'scripts/validation/check-phase-*.mjs'
      - '.github/workflows/audit-harness-v1.7-integrity.yml'
      - '.planning/REQUIREMENTS.md'
      - 'docs/decision-trees/09-linux-triage.md'  # (DELETED per EDIT a)
```

**Required v1.7-scoped path-filter (after edit):**
```yaml
    paths:
      - 'scripts/validation/v1.7-*'
      - 'scripts/validation/check-phase-*.mjs'
      - '.github/workflows/audit-harness-v1.7-integrity.yml'
      - '.planning/REQUIREMENTS.md'
      - '.planning/milestones/v1.7-MILESTONE-AUDIT.md'
      - '.planning/milestones/v1.7-DEFERRED-CLEANUP.md'
```

Add 3 new path-filter entries (`scripts/validation/v1.7-*`, milestone audit doc, deferred-cleanup doc) and KEEP existing entries except 09-linux-triage.md.

#### EDIT (c) — Add `schedule:` block with 2 crons

**Insert after line 14 (`workflow_dispatch:`) BEFORE the `# NOTE:` comment block at lines 16-18:**

```yaml
  schedule:
    - cron: '0 8 * * 1'         # Weekly bitrot catch: 08:00 UTC every Monday (Path-A from v1.6 line 26)
    - cron: '0 8 1 1,4,7,10 *'  # Quarterly c13_rotting_external check: 08:00 UTC on 1st of Jan/Apr/Jul/Oct (Phase 66 AUDIT-14 inheritance)
```

**Then DELETE the `# NOTE: on.schedule: OMITTED` comment block at lines 16-18** — no longer accurate.

#### EDIT (d) — Repoint `parse` job from v1.6 sidecar → v1.7 sidecar

**Source lines 21-38:**
- Line 22: `name: Parse v1.6 sidecar JSON` → `name: Parse v1.7 sidecar JSON`
- Line 28: `name: Validate v1.6-audit-allowlist.json` → `name: Validate v1.7-audit-allowlist.json`
- Line 32: `const j = JSON.parse(fs.readFileSync('scripts/validation/v1.6-audit-allowlist.json', 'utf8'));` → `const j = JSON.parse(fs.readFileSync('scripts/validation/v1.7-audit-allowlist.json', 'utf8'));`
- Line 37: `console.log('v1.6 sidecar OK: ...');` → `console.log('v1.7 sidecar OK: ...');`

#### EDIT (e) — Repoint `path-match` job

**Source lines 40-53:**
- Line 41: `name: Harness references v1.6 sidecar` → `name: Harness references v1.7 sidecar`
- Line 46: `name: Verify harness sidecar reference` (KEEP)
- Line 48: `if grep -q "scripts/validation/v1.6-audit-allowlist.json" scripts/validation/v1.6-milestone-audit.mjs; then` → `if grep -q "scripts/validation/v1.7-audit-allowlist.json" scripts/validation/v1.7-milestone-audit.mjs; then`
- Line 49: `echo "OK: harness references v1.6 sidecar"` → `echo "OK: harness references v1.7 sidecar"`
- Line 51: `echo "FAIL: harness does not reference v1.6-audit-allowlist.json"` → `echo "FAIL: harness does not reference v1.7-audit-allowlist.json"`

#### EDIT (f) — Repoint `harness-run` job

**Source lines 55-64:**
- Line 56: `name: Run v1.6 milestone audit harness` → `name: Run v1.7 milestone audit harness`
- Line 63: `name: Run v1.6-milestone-audit.mjs` → `name: Run v1.7-milestone-audit.mjs`
- Line 64: `run: node scripts/validation/v1.6-milestone-audit.mjs --verbose` → `run: node scripts/validation/v1.7-milestone-audit.mjs --verbose`

#### EDIT (g) — Replace `check-phase-67..70 skip-if-missing stubs` with active node invocations

**Source lines 85-93 (current skip-if-missing for-loop):**
```yaml
      - name: check-phase-67..70 skip-if-missing stubs
        run: |
          for i in 67 68 69 70; do
            if [ -f scripts/validation/check-phase-$i.mjs ]; then
              node scripts/validation/check-phase-$i.mjs
            else
              echo "check-phase-$i.mjs not present -- skipping (graceful degradation per Phase 42 D-31)"
            fi
          done
```

**Replace with active per-validator invocations (mirrors v1.6 workflow check-phase-62..66 pattern at lines 76-154 of v1.6 workflow):**

Option (i) — Keep within `linux-chain-ubuntu-latest` job (single job, sequential):
```yaml
      - name: Run check-phase-67.mjs
        run: node scripts/validation/check-phase-67.mjs
      - name: Run check-phase-68.mjs
        run: node scripts/validation/check-phase-68.mjs
      - name: Run check-phase-69.mjs
        run: node scripts/validation/check-phase-69.mjs
      - name: Run check-phase-70.mjs
        run: node scripts/validation/check-phase-70.mjs
```

Option (ii) — Promote to separate jobs (mirrors v1.6 workflow pattern):
Add 4 new jobs `check-phase-67`, `check-phase-68`, `check-phase-69`, `check-phase-70` each runs-on ubuntu-latest with `needs: harness-run` — mirrors v1.6 workflow lines 76-154 verbatim.

**Recommendation:** **Option (ii) — separate jobs**. Rationale: parallel execution (each job is its own ubuntu-latest runner), better failure isolation, mirrors v1.6 workflow surface area, and the `linux-chain-ubuntu-latest` job remains focused on chain-apex (check-phase-66 cascade). Plan 70-03 author has discretion; both options satisfy the contract.

**Important:** Whichever option chosen, PRESERVE the existing `linux-chain-ubuntu-latest` chain-apex node invocation (current line 82 `node scripts/validation/check-phase-66.mjs --verbose`) AND the `::notice CHAIN_TIMING_LINUX::` emission.

#### EDIT (h) — Add `pin-helper-advisory` job

**Insert as new job (mirrors v1.6 workflow lines 190-206 verbatim):**
```yaml
  pin-helper-advisory:
    name: Supervision-pin drift advisory (CI)
    runs-on: ubuntu-latest
    needs: harness-run
    continue-on-error: true   # Phase 43 D-14 / Phase 48 D-22: advisory only; never fails build
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Run regenerate-supervision-pins.mjs --report
        run: |
          node scripts/validation/regenerate-supervision-pins.mjs --report || true
          echo "[advisory] CI advisory job; never blocks merge per Phase 43 D-14 + Phase 48 D-22"
      - name: Run --self-test (advisory only)
        run: |
          node scripts/validation/regenerate-supervision-pins.mjs --self-test || \
            echo "[advisory] --self-test failed; advisory only"
```

#### EDIT (i) — Add `rotting-external-quarterly` job

**Insert as new job (mirrors v1.6 workflow lines 156-188 verbatim, with one repoint):**
```yaml
  rotting-external-quarterly:
    name: Quarterly c13_rotting_external link-check
    runs-on: ubuntu-latest
    needs: harness-run
    if: github.event_name == 'schedule' && github.event.schedule == '0 8 1 1,4,7,10 *'
    # DEFAULT continue-on-error: false -- quarterly drift FAILS the scheduled run per D-A9 fully-blocking
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Install markdown-link-check
        run: npm install -g markdown-link-check@3.14.2  # Pinned via `npm view markdown-link-check version` at Phase 66 Wave 3 authoring (2026-05-25)
      - name: Extract URLs from c13_rotting_external
        run: |
          node -e "
            const fs = require('fs');
            const sidecar = JSON.parse(fs.readFileSync('scripts/validation/v1.7-audit-allowlist.json','utf8'));   # REPOINTED v1.6 → v1.7
            const c13 = sidecar.c13_rotting_external || {};
            const urls = [];
            if (Array.isArray(c13.ci_1_abm_urls)) urls.push(...c13.ci_1_abm_urls.map(e => e.url).filter(Boolean));
            // CI-2 + CI-3 entries do not carry URLs -- they are line-ref tracking only
            fs.writeFileSync('quarterly-urls.txt', urls.join('\n'));
            console.log('Quarterly URL check candidates: ' + urls.length);
          "
      - name: Run markdown-link-check
        run: |
          if [ -s quarterly-urls.txt ]; then
            while IFS= read -r url; do
              markdown-link-check <(echo "[link]($url)") || exit 1
            done < quarterly-urls.txt
          else
            echo "No URLs to check in c13_rotting_external (empty population -- DEFERRED-CLEANUP.md notes calibration finding)"
          fi
```

### Anti-Modifications (DO NOT TOUCH)

- `linux-chain-ubuntu-latest` job's `core.autocrlf false` step (line 73-74) — Phase 69 contract
- `linux-chain-ubuntu-latest` job's checkout step `with: { fetch-depth: 0 }` (line 76) — **FETCH-DEPTH-01 inheritance contract; LOAD-BEARING**
- `linux-chain-ubuntu-latest` job's `timeout-minutes: 30` (line 70) — Phase 69 close-state
- `linux-chain-ubuntu-latest` job's `continue-on-error: false` (line 71) — D-A9 PR-blocking contract
- `linux-chain-ubuntu-latest` job's chain-apex invocation (lines 79-84) — `node scripts/validation/check-phase-66.mjs --verbose` + `::notice title=CHAIN_TIMING_LINUX::...`

### Atomic-Commit Dry-Run Protocol (Atom 2)

```
1. Stage Atom 2 files in working tree (post-Atom-1 — Atom 1 must already be on HEAD):
   - scripts/validation/check-phase-67.mjs NEW
   - scripts/validation/check-phase-68.mjs NEW
   - scripts/validation/check-phase-69.mjs NEW
   - scripts/validation/check-phase-70.mjs NEW
   - .github/workflows/audit-harness-v1.7-integrity.yml MODIFIED (9 itemized edits)

2. Pre-commit dry-run sequence (each MUST exit 0 before proceeding):
   a. node scripts/validation/v1.7-milestone-audit.mjs
      → expect: exit 0; 15/15 PASS (Atom 1 result preserved)
   b. node scripts/validation/check-phase-67.mjs
      → expect: exit 0; V-67-NN all PASS (SWEEP corpus state at HEAD matches Phase 67 close)
   c. node scripts/validation/check-phase-68.mjs
      → expect: exit 0; V-68-NN all PASS (CHAIN-01/02/03 state at HEAD)
   d. node scripts/validation/check-phase-69.mjs
      → expect: exit 0; V-69-NN all PASS (workflow YAML post-EXTEND has all required substrings)
   e. node scripts/validation/check-phase-70.mjs
      → expect: exit 0 for V-70-01..17 (HEAD-coupled assertions) + EXPECTED-PASS-or-degraded for V-70-18..27 (v1.7-frozen-aware assertions hit literal {phase_70_close_SHA} → null from execFileSync → check passes by short-circuit OR fails-then-recovers post-Wave-5-Commit-A)
   f. node scripts/validation/check-phase-66.mjs  # chain-apex regression guard
      → expect: exit 0; chain green; Phase 68 close-state preserved
   g. YAML lint: yamllint .github/workflows/audit-harness-v1.7-integrity.yml
      → expect: clean (no errors); v1.6 workflow as syntactic reference
   h. Predecessor byte-unchanged check:
      git diff --stat .github/workflows/audit-harness-integrity.yml \
                       .github/workflows/audit-harness-v1.5-integrity.yml \
                       .github/workflows/audit-harness-v1.6-integrity.yml
      → expect: empty diff (zero changes to predecessor files)

3. If any of (a)-(h) red, reconcile within Atom 2 (do NOT cross atomic boundary):
   - Most likely red: (b)/(c)/(d)/(e) caught a V-NN-NN assertion mismatch — fix the assertion body in the validator (NOT the corpus/workflow)
   - For v1.7-frozen-aware assertions hitting null from {phase_70_close_SHA}: this is EXPECTED pre-Wave-5; the validator should null-guard gracefully (return PASS with degraded detail OR document as known limitation per V-NN-AUDIT note)

4. Stage commit:
   git add scripts/validation/check-phase-67.mjs \
           scripts/validation/check-phase-68.mjs \
           scripts/validation/check-phase-69.mjs \
           scripts/validation/check-phase-70.mjs \
           .github/workflows/audit-harness-v1.7-integrity.yml

5. Verify staging boundary:
   git diff --cached --name-only
   → expect exactly 5 files; abort if more or fewer

6. Commit:
   git commit -m "feat(validators+ci): v1.7 validator-CI surface atomic Atom 2 — HARNESS-03 + HARNESS-04"

7. Post-commit verification:
   git log --name-only -1 HEAD
   → expect exactly the 5 files (no others)
   gh workflow run audit-harness-v1.7-integrity.yml --ref master  # OPTIONAL — Wave-4 handles this formally
```

### Acceptance Criteria Template

```
- `.github/workflows/audit-harness-v1.7-integrity.yml` post-EDIT has:
  - 6 path-filter entries (scripts/validation/v1.7-* + check-phase-*.mjs + workflow self-ref + REQUIREMENTS.md + v1.7-MILESTONE-AUDIT.md + v1.7-DEFERRED-CLEANUP.md)
  - 0 occurrences of 'docs/decision-trees/09-linux-triage.md'
  - 2 schedule crons ('0 8 * * 1' + '0 8 1 1,4,7,10 *')
  - parse + path-match + harness-run all reference v1.7 (NOT v1.6)
  - linux-chain-ubuntu-latest PRESERVES fetch-depth: 0 + core.autocrlf false + continue-on-error: false + node-version '20' + chain-apex check-phase-66 + ::notice CHAIN_TIMING_LINUX::
  - 4 new active node invocations for check-phase-67/68/69/70 (NOT skip-if-missing for-loop)
  - pin-helper-advisory job present with continue-on-error: true
  - rotting-external-quarterly job present with v1.7 sidecar reference
- Predecessor workflow files BYTE-UNCHANGED:
  - .github/workflows/audit-harness-integrity.yml (v1.4)
  - .github/workflows/audit-harness-v1.5-integrity.yml
  - .github/workflows/audit-harness-v1.6-integrity.yml
- ALL 5 files in ONE atomic commit verified via `git log --name-only -1 HEAD`
```

### Dependency Notes

- Atom 2 depends on Atom 1 (Atom 1 lands HARNESS-01 + HARNESS-02 + BASELINE_11 first; chain validators in Atom 2 reference v1.7-milestone-audit.mjs + v1.7-audit-allowlist.json)
- Workflow YAML edits are Wave 3 Plan 70-03 atomic-commit scope per D-02
- After Atom 2 lands, Wave 4 immediately triggers Axis 2 GHA workflow_dispatch

---

## HARNESS-05: Terminal Re-Audit (3-Axis Mandatory Stacking)

### Axis 1: Local Fresh-Clone (D-03 LOCKED Mechanism)

**Precedent:** Phase 66-04 commit `489edca` — verbatim mechanism inheritance.

**PowerShell recipe (Plan 70-04 executor runs verbatim, replacing `v1.6` → `v1.7`):**

```powershell
# 1. Generate 8-char random temp-dir suffix
$rand = -join ((48..57) + (97..122) | Get-Random -Count 8 | ForEach-Object {[char]$_})
$auditPath = "$env:TEMP\v1.7-audit-$rand"

# 2. Capture HEAD SHA from main repo BEFORE clone
$mainHeadSha = git -C D:\claude\Autopilot rev-parse HEAD

# 3. Fresh clone (--no-hardlinks for stricter physical isolation)
git clone --no-hardlinks D:\claude\Autopilot $auditPath

# 4. Verify clone HEAD matches main repo HEAD
$cloneHeadSha = git -C $auditPath rev-parse HEAD
if ($cloneHeadSha -ne $mainHeadSha) {
    Write-Error "Clone HEAD ($cloneHeadSha) != main HEAD ($mainHeadSha) -- abort"
    exit 1
}

# 5. Move into clone
Push-Location $auditPath

# 6. Run each validator, capture exit codes + last summary line
$results = [ordered]@{}
$cmds = @(
    @{ name = 'harness';            path = 'scripts/validation/v1.7-milestone-audit.mjs' },
    @{ name = 'harness-selftest';   path = 'scripts/validation/v1.7-milestone-audit.mjs'; args = @('--self-test') },
    @{ name = 'check-phase-67';     path = 'scripts/validation/check-phase-67.mjs' },
    @{ name = 'check-phase-68';     path = 'scripts/validation/check-phase-68.mjs' },
    @{ name = 'check-phase-69';     path = 'scripts/validation/check-phase-69.mjs' },
    @{ name = 'check-phase-70';     path = 'scripts/validation/check-phase-70.mjs' },
    @{ name = 'chain-apex-66';      path = 'scripts/validation/check-phase-66.mjs' }  # Cross-OS regression cross-check
)
foreach ($c in $cmds) {
    $argList = @($c.path)
    if ($c.ContainsKey('args')) { $argList += $c.args }
    $stdoutCombined = & node @argList 2>&1
    $exit = $LASTEXITCODE
    $stdoutText = ($stdoutCombined | Out-String)
    $summary = ($stdoutCombined | Select-String -Pattern 'Summary:|Result:' | Select-Object -Last 1).ToString()
    if (-not $summary) { $summary = ($stdoutCombined | Select-Object -Last 1 | Out-String).Trim() }
    $results[$c.name] = @{
        exit = $exit
        summary = $summary
        stdout_tail = ($stdoutCombined | Select-Object -Last 20 | Out-String).Trim()
    }
    Write-Host "[$($c.name)] exit=$exit | $summary"
}

# 7. Persist results JSON
$resultsJsonPath = "$env:TEMP\v1.7-audit-results-$rand.json"
$results | ConvertTo-Json -Depth 4 | Out-File $resultsJsonPath -Encoding utf8

# 8. Return to main repo BEFORE cleanup
Pop-Location

# 9. Remove clone post-audit
Remove-Item -Recurse -Force $auditPath
if (Test-Path $auditPath) {
    Write-Error "Clone removal FAILED -- orphan temp directory at $auditPath"
    exit 1
}

# 10. Confirm zero orphan temp dirs
$orphans = Get-ChildItem $env:TEMP -Filter "v1.7-audit-*" -Directory -ErrorAction SilentlyContinue
if ($orphans) {
    Write-Warning "Orphan temp directories found: $($orphans.FullName -join ', ')"
}
```

### PowerShell Random Suffix Mechanism (`Get-Random` vs `New-Guid`)

**Recommend:** `Get-Random -Count 8` over `[0-9a-z]` charset (charset = `(48..57) + (97..122)`) → `36^8 ≈ 2.8 trillion combinations`. This is the verbatim Phase 66-04 mechanism (T-66-04-TD threat-model entry).

**Alternative considered:** `[System.IO.Path]::GetRandomFileName()` produces 12-char lowercase alphanumeric + dot — slightly higher entropy but the dot complicates path validation. `New-Guid` is 36 chars including 4 hyphens — needlessly long for a temp-dir suffix. **Stick with Phase 66-04 `Get-Random -Count 8` precedent**.

### Axis 2: Cross-OS Linux GHA (CILINUX-01 Axis)

**Trigger AFTER Atom 2 lands on master (so chain-67..70 are active not skip-if-missing).**

```bash
# Trigger workflow_dispatch on master HEAD
gh workflow run audit-harness-v1.7-integrity.yml --ref master

# Wait a moment for queueing, then capture run URL + status
sleep 10
gh run list --workflow=audit-harness-v1.7-integrity.yml --limit=1 \
  --json url,status,conclusion,headSha,createdAt

# Optionally watch the run to completion
RUN_ID=$(gh run list --workflow=audit-harness-v1.7-integrity.yml --limit=1 --json databaseId --jq '.[0].databaseId')
gh run watch $RUN_ID

# Capture ubuntu-latest job log tail for linux-chain-ubuntu-latest
gh run view $RUN_ID --log --job=linux-chain-ubuntu-latest | tail -100

# Capture per-job exit conclusions
gh run view $RUN_ID --json jobs --jq '.jobs[] | {name, conclusion}'
```

**Expected outcomes:**
- All 4 (or 8 if EDIT g Option ii chosen) jobs exit 0
- chain-apex check-phase-66.mjs reports `Result: 28 PASS, 0 FAIL, 0 SKIPPED` on ubuntu-latest (matches Phase 69 close baseline)
- chain-67..70 validators each exit 0 with V-NN-NN all PASS (HEAD-coupled assertions) + v1.7-frozen-aware assertions degrade gracefully if {phase_70_close_SHA} is literal pre-Wave-5
- Linux wall-clock timing: `::notice CHAIN_TIMING_LINUX::Full chain wall-clock: ~56s` (Phase 69 reference) — Phase 70 chain may run slightly longer due to 4 additional validators

### `70-04-AUDIT-RESULTS.md` Section Structure

**Mirrors Phase 66-04 `66-04-AUDIT-RESULTS.md` verbatim with one addition (B.2 Linux cross-OS section):**

```markdown
---
phase: 70
plan: 04
wave: 4
audit_type: terminal-re-audit
audit_date: 2026-05-NN
audit_started_iso: 2026-05-NNTHH:MM:SS.NNNZ
audit_method: 3-axis stacking (D-03 fresh-clone + D-22 fresh sub-agent + CILINUX-01 cross-OS Linux GHA)
auditor_agent: gsd-executor (fresh sub-agent — ZERO context-carryover from Plans 70-01..03 author-agents per D-22 INTENT)
main_head_sha: {phase_70_atom_2_SHA}
clone_head_sha: {phase_70_atom_2_SHA}
head_sha_match: true
clone_path: "C:\\Users\\<user>\\AppData\\Local\\Temp\\v1.7-audit-<rand>"
clone_removed_post_audit: true
no_orphan_temp_directories: true
gha_workflow_run_url: "https://github.com/Schweinehund/Autopilot/actions/runs/<RUN_ID>"
gha_workflow_run_conclusion: success
gha_chain_timing_linux_seconds: NN
mechanical_checks_local:
  harness: { exit: 0, summary: "Summary: 15 passed, 0 failed, 0 skipped" }
  harness_selftest: { exit: 0, summary: "Self-test: 9 passed, 0 failed" }
  check_phase_67: { exit: 0, summary: "Result: NN PASS, 0 FAIL, 0 SKIPPED" }
  check_phase_68: { exit: 0, summary: "Result: NN PASS, 0 FAIL, 0 SKIPPED" }
  check_phase_69: { exit: 0, summary: "Result: NN PASS, 0 FAIL, 0 SKIPPED" }
  check_phase_70: { exit: 0 or 1, summary: "Result: NN PASS, M FAIL, 0 SKIPPED", expected_fail: "V-70-20 + V-70-22 + V-70-23 chicken-and-egg with Wave 5 milestone-audit-doc authoring" }
  chain_apex_66: { exit: 0, summary: "Result: 28 PASS, 0 FAIL, 0 SKIPPED" }
mechanical_checks_gha:
  parse: { conclusion: success }
  path_match: { conclusion: success }
  harness_run: { conclusion: success }
  linux_chain_ubuntu_latest: { conclusion: success, chain_apex_summary: "Result: 28 PASS, 0 FAIL, 0 SKIPPED" }
  check_phase_67: { conclusion: success }
  check_phase_68: { conclusion: success }
  check_phase_69: { conclusion: success }
  check_phase_70: { conclusion: success or expected-degraded }
  pin_helper_advisory: { conclusion: success }
tags:
  - phase-70
  - wave-4
  - terminal-re-audit
  - 3-axis-stacking
  - close-gate
---

# Phase 70 Wave 4 — Terminal Re-Audit Results (3-Axis Stacking)

## B.1 Axis 1 — Local Fresh-Clone Evidence (D-03 LOCKED + D-22 INTENT)

[Mirror Phase 66-04 structure: Mechanism Narrative + Command Verification Table + Expected vs Actual + CHAIN_SKIP Suppression Rationale (now "CHAIN_SKIP empty-Set inherited from Phase 68") + V-70-NN chicken-and-egg disclosure + Auditor-Independence Verification + Full Validator Output]

## B.2 Axis 2 — Cross-OS Linux GHA Evidence (CILINUX-01 axis)

**GHA Workflow Run URL:** https://github.com/Schweinehund/Autopilot/actions/runs/<RUN_ID>
**Workflow:** `.github/workflows/audit-harness-v1.7-integrity.yml`
**Branch / ref:** master
**Triggered by:** workflow_dispatch (Plan 70-04 executor)
**HEAD SHA at run:** {phase_70_atom_2_SHA}

### Per-Job Conclusions

| Job | Conclusion | Notes |
|-----|-----------|-------|
| parse | success | v1.7 sidecar JSON valid |
| path-match | success | v1.7-milestone-audit.mjs references v1.7-audit-allowlist.json |
| harness-run | success | v1.7 harness 15/15 PASS on ubuntu-latest |
| linux-chain-ubuntu-latest | success | chain-apex check-phase-66 28/0/0; chain-67..70 active invocations |
| check-phase-67 (or in-job) | success | V-67-NN all PASS on Linux LF line endings |
| check-phase-68 | success | V-68-NN all PASS |
| check-phase-69 | success | V-69-NN all PASS |
| check-phase-70 | success | V-70-01..17 HEAD-coupled all PASS; V-70-18..27 v1.7-frozen-aware degraded pre-Wave-5 (expected) |
| pin-helper-advisory | success (continue-on-error: true) | Advisory only |

### Chain Timing on Linux

`::notice title=CHAIN_TIMING_LINUX::Full chain wall-clock: NNs` (Phase 69 reference: ~56s; Phase 70 anticipated similar)

### Cross-OS PASS-Count EXACT MATCH

| Validator | Windows local | Linux GHA | Match? |
|-----------|--------------|-----------|--------|
| v1.7-milestone-audit.mjs | 15/0/0 | 15/0/0 | yes |
| chain-apex 66 | 28/0/0 | 28/0/0 | yes |
| check-phase-67 | NN/0/0 | NN/0/0 | yes |
| check-phase-68 | NN/0/0 | NN/0/0 | yes |
| check-phase-69 | NN/0/0 | NN/0/0 | yes |
| check-phase-70 | NN/M/0 | NN/M/0 | yes (M = chicken-and-egg count) |

## Wave 5 Handoff

[Mirror Phase 66-04 "Wave 5 Handoff" section]
```

### Acceptance Criteria Template

```
- 70-04-AUDIT-RESULTS.md exists in phase dir
- YAML frontmatter has audit_method = "3-axis stacking (D-03 + D-22 + CILINUX-01)"
- B.1 section captures: local fresh-clone PowerShell recipe execution + exit codes + summary lines per validator + clone path + clone removal confirmation
- B.2 section captures: GHA workflow_dispatch run URL + per-job conclusions + chain timing notice + Cross-OS PASS-Count EXACT MATCH table
- 3-axis stacking explicit: (1) fresh-clone D-03 + (2) fresh sub-agent D-22 + (3) cross-OS Linux GHA CILINUX-01
- Clone removed post-audit (zero orphan $env:TEMP\v1.7-audit-* directories)
- GHA conclusion = success (all jobs green; pin-helper-advisory continue-on-error true acceptable)
- V-70-NN chicken-and-egg disclosure (V-70-20 + V-70-22 + V-70-23 expected RED at Wave 4 since Wave 5 deliverables not yet authored)
```

### Dependency Notes

- HARNESS-05 depends on Atom 2 landing on master (so chain-67..70 active in workflow YAML)
- HARNESS-05 produces input for HARNESS-06 (Wave 5 Plan 70-05 reads `70-04-AUDIT-RESULTS.md` to populate v1.7-MILESTONE-AUDIT.md mechanical_checks block + Command Verification Table)
- Wave 4 is a SINGLE commit (artifact-only; no source-file edits)

---

## HARNESS-06: v1.7-MILESTONE-AUDIT.md + v1.7-DEFERRED-CLEANUP.md Finalize + 4-Doc Traceability Closure

### v1.7-MILESTONE-AUDIT.md (Path-A from v1.6, Full 344-Line Depth)

**Path-A source:** `.planning/milestones/v1.6-MILESTONE-AUDIT.md` (344 lines verified).

**Section-by-section mapping (v1.6 → v1.7):**

| v1.6 source | v1.7 application | Adjustments |
|-------------|------------------|-------------|
| Lines 1-82 (YAML frontmatter) | KEEP STRUCTURE | Update: milestone: v1.7; scores.requirements: 12/12; scores.phases: 4/4; mechanical_checks.harness: scripts/validation/v1.7-milestone-audit.mjs; allowlist: scripts/validation/v1.7-audit-allowlist.json; commit: {phase_70_atom_2_SHA}; close_commit: {phase_70_close_SHA}; performed_by narrative updated for 3-axis stacking; deferred_items cross-link to v1.7-DEFERRED-CLEANUP.md |
| Lines 84-89 (Executive Summary header) | REWRITE | "v1.7 delivers the Deferred Backlog Closure + Validator Chain Hardening milestone. Coverage: 4 phases (67-70) + 12 reqs closed (SWEEP-01/02 + CHAIN-01/02/03 + CILINUX-01 + HARNESS-01..06)." |
| Lines 91-101 (Methodology highlights — 4 bullets) | REWRITE | (1) Path-A audit harness lineage v1.6 → v1.7 (preserves C1-C16 verbatim); (2) Per-assertion-class freshness routing (D-01); (3) Two-atomic split (D-02 — harness-core Atom 1 + validator+CI surface Atom 2); (4) 3-axis stacking at terminal re-audit (D-03 fresh-clone + D-22 fresh sub-agent + CILINUX-01 cross-OS) |
| Lines 102-104 (Pillar Closure Narrative header `## v1.6 Five-Pillar Closure Narrative`) | REWRITE | `## v1.7 Four-Pillar Closure Narrative` |
| Lines 104-118 (Pillar 1 — Foundation & Rebrand, Phase 62) | REWRITE per v1.7 | Pillar A — Corpus Surgical Sweeps (Phase 67): SWEEP-01 + SWEEP-02 closed; closing SHAs `3fb8ca5` + `55260b3` |
| Lines 122-136 (Pillar 2 — Multi-OU, Phase 63) | REWRITE per v1.7 | Pillar B — CHAIN_SKIP Root-Cause Resolution (Phase 68): CHAIN-01 + CHAIN-02 + CHAIN-03 closed; closing SHAs `36a753d` + `79c65c6` + `d142c7a` + `d7d7d5f` + `7b635ca` + Plan 68-05 close SHA |
| Lines 138-158 (Pillar 3 — Delegation Runbooks, Phase 64) | REWRITE per v1.7 | Pillar C — CI-Linux Hardening (Phase 69): CILINUX-01 closed; closing SHAs `dd1ff08` + `85521bb` + `2d61981` + Plan 69-02 close SHA |
| Lines 160-172 (Pillar 4 — L1/L2 + Hub Nav, Phase 65) | REWRITE per v1.7 | Pillar D — v1.7 Harness Lineage Bump + Milestone Close (Phase 70): HARNESS-01..06 closed; closing SHAs from Atom 1 + Atom 2 + Plan 70-04 audit-results commit + Plan 70-05 Commit A + Plan 70-05 Commit B |
| Lines 174-186 (Pillar 5 — Validation Tooling, Phase 66) | DELETE (not 5 pillars in v1.7) | v1.7 has 4 phases not 5; merge content into Pillar D Phase 70 narrative |
| Lines 188-207 (Auditor-Independence Verification) | **EXPAND** | Document 3 axes not 2 (was 2 layers: logical + physical; now 3 layers: logical sub-agent + physical fresh-clone + cross-OS Linux GHA). Include both axis run URLs from Wave 4 (local clone path + GHA workflow run URL). |
| Lines 209-221 (Mechanical Checks Detail / Command Verification Table) | REWRITE | Capture from `70-04-AUDIT-RESULTS.md`: 7 (or 8) command rows for local + 5+ GHA job rows for cross-OS. Add Wave 5 local re-run column. |
| **NEW v1.7-specific section** (NOT in v1.6 template) | INSERT after Mechanical Checks Detail | **"## Discoveries Surfaced During Execution"** with 5 sub-entries (proposed structure below) |
| Lines 223-267 (Requirements Traceability — 39 reqs) | REWRITE for 12 reqs | 12 rows: SWEEP-01 + SWEEP-02 + CHAIN-01 + CHAIN-02 + CHAIN-03 + CILINUX-01 + HARNESS-01 + HARNESS-02 + HARNESS-03 + HARNESS-04 + HARNESS-05 + HARNESS-06 with closing SHAs |
| Lines 269-277 (Cross-Phase Integration — 5/5 Pillar Flows) | REWRITE | 4 flows: Phase 67 corpus state → Phase 68 chain → Phase 69 cross-OS → Phase 70 milestone close |
| Lines 279-287 (Deferred Items Summary) | UPDATE | Cross-link to v1.7-DEFERRED-CLEANUP.md (finalized at HARNESS-06); enumerate carry-forward (CI-3 + 5 other v1.6 items) + Phase 69 discoveries final dispositions |
| Lines 289-293 (Wave 5 Post-Audit Confirmation / Chicken-and-Egg) | UPDATE | Wave 5 LOCAL re-run after Plan 70-05 Commit A SHA-fill: check-phase-70.mjs V-70-20 + V-70-22 + V-70-23 PASS post-commit; Wave 5 captures in 70-VERIFICATION.md |
| Lines 295-335 (v1.6 Audit Harness Lineage Phase 62→66) | REWRITE for v1.7 | Lineage v1.6 → v1.7 documented (E-01..E-06 from §HARNESS-01); per-phase chain validators 67..70; CI workflow Path-A from v1.6 + 9 itemized edits per HARNESS-04; sidecar `v1.7-audit-allowlist.json` arrays preserved + c13_rotting_external state |
| Lines 337-344 (Milestone Close) | UPDATE | HARNESS-01..06 closed; 12/12 v1.7 requirements closed; 4/4 v1.7 phases complete; v1.7 milestone shipped 2026-05-NN; Next: v1.8+ entry-phase planning |

### NEW "Discoveries Surfaced During Execution" Section (Proposed Structure)

```markdown
## Discoveries Surfaced During Execution

v1.7 surfaced 5 architectural discoveries during execution. 3 closed in-Phase; 2 deferred to v1.8+:

### Phase 69 Cross-OS Discoveries (3, all CLOSED in v1.7)

**FETCH-DEPTH-01** (PRIMARY cross-OS; CLOSED 2026-05-28 in commit `85521bb`)
- Symptom: shallow-clone (default fetch-depth:1 on actions/checkout@v4) cannot resolve historical SHA `ba2cbc0` that v1.5-frozen-aware validators depend on
- Evidence: Phase 69 B.1 iter 1 run 26513528485 FAIL with `fatal: invalid object name 'ba2cbc0'`
- Fix: Added `with: { fetch-depth: 0 }` to linux-chain-ubuntu-latest checkout
- Forward-coordination: Phase 70 HARNESS-04 EXTEND preserved verbatim per FETCH-DEPTH-01 inheritance contract
- Cross-link: v1.7-DEFERRED-CLEANUP.md §FETCH-DEPTH-01

**SCOPE-GAP-61** (SECONDARY latent Windows+Linux; CLOSED 2026-05-28 in commit `2d61981`)
- Symptom: V-61-05..08 in check-phase-61.mjs left HEAD-coupled by Plan 68-03 Task 1; Plan 69-01 tracking-update `6e12a75` introduced "In Progress" row to ROADMAP.md violating v1.5-close §Progress shape
- Evidence: Phase 69 B.1 iter 2 run 26574959797 FAIL with empty stderr (masked by CHAIN-WRAPPER-01)
- Fix: Added `readRoadmapAtV15Close()` helper parallel to `readRequirementsAtV15Close()`; rewired V-61-05..08
- Attribution: Plan 68-03 Task 1 **scope-gap closure**, NOT Phase 69 deliverable surface
- Cross-link: v1.7-DEFERRED-CLEANUP.md §SCOPE-GAP-61

**D-04-OVERSPEC-01** (TERTIARY design-vs-reality; ACKNOWLEDGED 2026-05-28, no fix needed)
- Symptom: Plan 69-02 SC#5 D-04 synthetic-PR design pre-supposed check-phase-51 would FAIL on CRLF injection; reality is Phase 68 CHAIN-01 fix made check-phase-51 CRLF-tolerant
- Reframe: B.2-GREEN is the CORRECT outcome and positive cross-OS resilience proof
- Future SC#5 design guidance: synthetic regression tests must verify defensive validator can actually fail under test condition
- Cross-link: v1.7-DEFERRED-CLEANUP.md §D-04-OVERSPEC-01

### Latent Meta-Bugs Surfaced (2, DEFERRED to v1.8+)

**CHAIN-WRAPPER-01** (DEFERRED to v1.8+)
- Symptom: `scripts/validation/check-phase-66.mjs:313` chain-apex wrapper captures only `err.stderr` (not `err.stdout`); check-phase-61 writes per-validator FAIL detail to stdout; chain-66 wrapper masks V-61-05 failure as empty-stderr generic chain failure
- Impact: Masked SCOPE-GAP-61 on Windows local for 2 weeks
- Deferral rationale: CILINUX-01 scope was workflow YAML, not chain wrapper; route to v1.8+ chain-resilience pickup combined with HARNESS-FORWARD-01 retrospective audit
- Cross-link: v1.7-DEFERRED-CLEANUP.md §CHAIN-WRAPPER-01

**ARCHIVE-01** (Root-cause DEFERRED to v1.8+)
- Symptom: cdcce23 archive-script garbage-insert in v1.5 H2 entry of MILESTONES.md (scripted-extraction debris)
- Phase 68 surgical symptom fix: Plan 68-04 SHA `d142c7a` DELETED garbage lines
- Root cause: archive-script source defect; investigation deferred to v1.8+ per v1.7-DEFERRED-CLEANUP.md §ARCHIVE-01
- Phase 70 disposition: Recurrence-check runbook ("`git diff HEAD~1 HEAD -- .planning/MILESTONES.md` immediately after archive automation runs") routed to `/gsd-complete-milestone` skill invocation site (NOT inside HARNESS-06 per D-03 ruling)
- Cross-link: v1.7-DEFERRED-CLEANUP.md §ARCHIVE-01 + §ARCHIVE-02
```

### v1.7-DEFERRED-CLEANUP.md Finalization

**Current state (already-authored stub at Phase 68 close + extended Phase 69 close):** 11 entries — ARCHIVE-01, ARCHIVE-02, HARNESS-FORWARD-01, TIMEOUT-01 (CLOSED), FETCH-DEPTH-01 (CLOSED), SCOPE-GAP-61 (CLOSED), D-04-OVERSPEC-01 (ACKNOWLEDGED), CHAIN-WRAPPER-01 (DEFERRED), CHAIN-31 (CLOSED), Carry-forward placeholder section.

**Plan 70-05 author MUST:**
1. KEEP entries 1-10 verbatim (they reflect v1.7 in-Phase work or v1.8+ deferral)
2. EXTEND the "Carry-forward from v1.6-DEFERRED-CLEANUP.md" section (currently a stub with 7 bullet items) by:
   - Promoting each bullet to a full section with `## CI-3 Managed Apple ID Corpus Rename`, `## Multi-tenant Apple Business`, etc.
   - Carry the full v1.6 sections (45-occurrence table for CI-3; trigger conditions; estimated effort) verbatim from v1.6-DEFERRED-CLEANUP.md lines 62-126
   - Add NEW final-disposition headers acknowledging Phase 70 close-state
3. ADD final dispositions for Phase 67 discoveries (3 additional VPP sites in `02-macos-pkg-dmg-pipeline.md`)
4. ADD v1.8+ trigger conditions for each item

**Carry-forward items to promote (from v1.6-DEFERRED-CLEANUP.md):**
- CI-3 (Managed Apple ID, 45 occurrences / 16 files; v1.6-DEFERRED-CLEANUP.md:62-92)
- Multi-tenant Apple Business surfaces
- Apple Business Device API documentation
- Per-OU Conference Room Display deep-dive
- Account Holder lockout dedicated recovery runbook
- Apple School Manager (ASM) education-specific surfaces
- 3 additional VPP-location-token sites in `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` (lines 115, 149, 155) + 1 more discovered in 67-VERIFICATION.md (4 total beyond Phase 67 calibrated scope)

### 4-Doc Traceability Closure

**PROJECT.md** — add 12 v1.7 rows to ## Validated section with closing SHAs:

```markdown
- ✓ SWEEP-01 (Phase 67) — 2026-05-26 — closing SHA `3fb8ca5`
- ✓ SWEEP-02 (Phase 67) — 2026-05-26 — closing SHA `55260b3`
- ✓ CHAIN-01 (Phase 68) — 2026-05-26 — closing SHA `36a753d`
- ✓ CHAIN-02 (Phase 68) — 2026-05-26 — closing SHA `79c65c6`
- ✓ CHAIN-03 (Phase 68) — 2026-05-26 — closing SHA `7b635ca`
- ✓ CILINUX-01 (Phase 69) — 2026-05-28 — closing SHAs `dd1ff08` + `85521bb` + `2d61981`
- ✓ HARNESS-01 (Phase 70) — 2026-05-NN — closing SHA `{phase_70_atom_1_SHA}`
- ✓ HARNESS-02 (Phase 70) — 2026-05-NN — closing SHA `{phase_70_atom_1_SHA}`
- ✓ HARNESS-03 (Phase 70) — 2026-05-NN — closing SHA `{phase_70_atom_2_SHA}`
- ✓ HARNESS-04 (Phase 70) — 2026-05-NN — closing SHA `{phase_70_atom_2_SHA}`
- ✓ HARNESS-05 (Phase 70) — 2026-05-NN — closing SHA `{phase_70_audit_results_SHA}`
- ✓ HARNESS-06 (Phase 70) — 2026-05-NN — closing SHA `{phase_70_close_SHA}`
```

**ROADMAP.md** — Progress table row updates (4 rows):

| Phase | Plans | Status | Completed |
|-------|-------|--------|-----------|
| 67. v1.7 Pillar A — Corpus Surgical Sweeps | 3/3 | Complete | 2026-05-26 |
| 68. v1.7 Pillar B — CHAIN_SKIP Root-Cause Resolution | 5/5 | Complete | 2026-05-26 |
| 69. v1.7 Pillar C — CI-Linux Hardening | 2/2 | Complete | 2026-05-28 |
| 70. v1.7 Pillar D — v1.7 Audit Harness Lineage Bump + Milestone Close | 5/5 | Complete | 2026-05-NN |

**STATE.md** — frontmatter + body updates:
- `status: complete` (from `planning`)
- `progress.total_phases: 4`
- `progress.completed_phases: 4`
- `progress.total_plans: 15` (or actual final plan count)
- `progress.completed_plans: 15`
- `progress.percent: 100`
- Performance Metrics section gains v1.7 line: "v1.7: 4 phases (67-70), 15 plans, shipped 2026-05-NN — Deferred Backlog Closure + Validator Chain Hardening"
- Decisions section gains Phase 70 H3 entries (Plan 70-02 + Plan 70-03 + Plan 70-04 + Plan 70-05)

**REQUIREMENTS.md** — Traceability table 6 v1.7 HARNESS rows flip Pending → Complete (SWEEP/CHAIN/CILINUX already Complete from Phases 67-69):

```markdown
| HARNESS-01 | Phase 70 | Complete |
| HARNESS-02 | Phase 70 | Complete |
| HARNESS-03 | Phase 70 | Complete |
| HARNESS-04 | Phase 70 | Complete |
| HARNESS-05 | Phase 70 | Complete |
| HARNESS-06 | Phase 70 | Complete |
```

Also flip Active checkboxes `[ ]` → `[x]` for HARNESS-01..06 (lines 30, 32, 34, 36, 38, 40 in current REQUIREMENTS.md).

### Two-Commit Chicken-and-Egg Protocol (Plan 70-05)

**Commit A (SHA placeholder fill):**
- File scope: across check-phase-67/68/69/70.mjs + regenerate-supervision-pins.mjs BASELINE_11 comment
- Substitute `{phase_70_close_SHA}` → actual close-gate SHA candidate via sed -i
- BUT — Commit A's own SHA is not yet known. Resolution: Commit A substitutes Atom 1 + Atom 2 + audit-results SHAs (which are known), AND substitutes `{phase_70_close_SHA}` with the eventual Commit B SHA — using a "best-guess + verify" pass OR pre-computing via local commit-tree + reset.

**Simpler alternative (recommended):** Use the Plan 69-02 Option (a) pattern → leave `{phase_70_close_SHA}` as literal placeholder; recoverable via `git log --all --grep="70-05"`. Plan 70-05 then is a SINGLE commit (close-gate) rather than two.

**CONTEXT D-04 + Claude's Discretion explicitly recommends Option (b) two-commit** for cleaner audit-doc citation symmetry with v1.6 Phase 66-05 Plan 66-05 ATOMIC TRIO precedent. **Final choice up to Plan 70-05 author**; recommend (b) for symmetry, but (a) is acceptable if commit-tree pre-computation feels brittle.

**If Option (b) chosen — Commit A scope (SHA-fill from already-landed SHAs):**
- File scope: check-phase-67/68/69/70.mjs frozen-aware helpers + regenerate-supervision-pins.mjs BASELINE_11 + v1.7-MILESTONE-AUDIT.md mechanical_checks.commit field
- Substitutions: `{phase_70_atom_1_SHA}` → actual; `{phase_70_atom_2_SHA}` → actual; `{phase_70_audit_results_SHA}` → actual; `{phase_70_close_SHA}` → leave as literal (Commit B's own SHA cannot be known pre-Commit-B)

**Commit B scope (close-gate):**
- File scope: v1.7-MILESTONE-AUDIT.md NEW (full doc) + v1.7-DEFERRED-CLEANUP.md FINALIZED + PROJECT.md + ROADMAP.md + STATE.md + REQUIREMENTS.md + 70-VERIFICATION.md NEW
- This is the milestone close commit; its SHA fills `{phase_70_close_SHA}` retroactively (literal placeholder remains in source — recoverable via git log)

### Acceptance Criteria Template

```
HARNESS-06 milestone close acceptance criteria:

- v1.7-MILESTONE-AUDIT.md exists with full v1.6-depth (200+ lines; v1.6 was 344 — v1.7 may tighten to ~250-300 for 12-req corpus naturally)
- YAML frontmatter: milestone: v1.7 + status: passed + scores.requirements: 12/12 + scores.phases: 4/4
- 3-axis Auditor-Independence Verification section (NOT just 2-axis as v1.6) with logical + physical + cross-OS-Linux-GHA rows
- Command Verification Table populated from 70-04-AUDIT-RESULTS.md (local + GHA conclusions)
- NEW "Discoveries Surfaced During Execution" section with 5 sub-entries (FETCH-DEPTH-01 CLOSED + SCOPE-GAP-61 CLOSED + D-04-OVERSPEC-01 ACKNOWLEDGED + CHAIN-WRAPPER-01 DEFERRED + ARCHIVE-01 DEFERRED)
- 12-row Requirements Traceability table (SWEEP-01/02 + CHAIN-01/02/03 + CILINUX-01 + HARNESS-01..06) all ✓ Validated
- 4-row Cross-Phase Integration table
- Cross-link to v1.7-DEFERRED-CLEANUP.md (finalized)

- v1.7-DEFERRED-CLEANUP.md finalized with:
  - 11 in-Phase entries preserved (TIMEOUT/FETCH-DEPTH/SCOPE-GAP/D-04-OVERSPEC/CHAIN-31 CLOSED; ARCHIVE-01/02 + HARNESS-FORWARD-01 + CHAIN-WRAPPER-01 DEFERRED)
  - 7 carry-forward sections promoted from stub to full sections (CI-3 + Multi-tenant + Apple Business Device API + per-OU CRD + Account Holder runbook + ASM + 3-4 additional VPP sites)
  - Each section has Trigger-to-sweep + Estimated effort + Status

- PROJECT.md ## Validated section has 12 v1.7 rows with closing SHAs
- ROADMAP.md Progress table 4 v1.7 phase rows all Complete with dates
- STATE.md status: complete + completed_phases: 4 + percent: 100 + Performance Metrics v1.7 line + Decisions Phase 70 entries
- REQUIREMENTS.md Traceability table 12 v1.7 rows all Complete
- 70-VERIFICATION.md authored as Phase 70 close-gate report (SC#1-5 satisfaction + HARNESS-01..06 contract evidence + atomic-commit SHA inventory + 3-axis re-audit evidence + V-70-NN final state)

- POST-COMMIT local re-run of check-phase-70.mjs shows V-70-18..27 transition from chicken-and-egg degraded to PASS (where applicable; some v1.7-frozen-aware assertions only pass once Commit B's own SHA is fillable via `git log --all --grep="70-05"` recovery)
```

### Dependency Notes

- HARNESS-06 depends on HARNESS-05 (70-04-AUDIT-RESULTS.md is input data)
- HARNESS-06 is Wave 5 / Plan 70-05 — final commit(s) of Phase 70
- After Plan 70-05 close-gate commit lands, `/gsd-complete-milestone` invocation may follow (separate skill territory; ARCHIVE-01 recurrence-check happens at that skill's site)

---

## Wave-Plan-Structure Section

### Wave 1 / Plan 70-01 — Scaffold + Conventions + Per-Assertion Freshness Matrix

**Frontmatter:**
```yaml
---
phase: 70
plan: 70-01
wave: 1
title: Scaffold + Conventions + per-V-NN-NN freshness matrix
depends_on: []
---
```

**Files modified:**
- `.planning/phases/70-.../70-CONVENTIONS.md` NEW
- `scripts/validation/check-phase-70.mjs` NEW (scaffold with V-70-SELF + V-70-AUDIT + V-70-CHAIN; placeholder V-70-01..27)
- (optional) `.planning/phases/70-.../70-ANCHOR-INVENTORY.md` NEW — likely empty/skipped for Pillar D (no corpus anchors touched)

**Deliverables:**
1. `70-CONVENTIONS.md` — per-V-NN-NN freshness routing matrix (~16-40 row table) covering check-phase-67/68/69/70.mjs assertion lists from §HARNESS-03 above
2. v1.7-frozen-aware helper signature documentation (`readCorpusFileAtV17Close`, `readSidecarAtV17Close`, `readMilestoneAuditAtV17Close`, etc.)
3. HARNESS-FORWARD-01 closure note (pattern carry-forward documentation)
4. check-phase-70.mjs Path-A scaffold (V-NN-SELF guard with CHAIN_PHASES = {48..69}; placeholder bodies for V-70-01..27)

**Commit:** Single Wave-1 scaffold commit (`docs(phase-70): wave 1 scaffold — conventions + check-phase-70 placeholder`)

### Wave 2 / Plan 70-02 — Atom 1 (Per D-02)

**Frontmatter:**
```yaml
---
phase: 70
plan: 70-02
wave: 2
title: ATOMIC harness-core — HARNESS-01 + HARNESS-02 + BASELINE_11
depends_on: [70-01]
---
```

**Files modified:**
- `scripts/validation/v1.7-milestone-audit.mjs` NEW (HARNESS-01)
- `scripts/validation/v1.7-audit-allowlist.json` NEW (HARNESS-02)
- `scripts/validation/regenerate-supervision-pins.mjs` MODIFIED (BASELINE_11 freshness comment + parseAllowlist v1.6→v1.7 lineage repoint at 4 sites)

**Commit:** **Atom 1** — ONE atomic commit per D-02; literal Phase 66-02 `3a9a671` 3-file precedent

**Pre-commit dry-run protocol:** See §HARNESS-02 Atomic-Commit Dry-Run Protocol above.

### Wave 3 / Plan 70-03 — Atom 2 (Per D-02)

**Frontmatter:**
```yaml
---
phase: 70
plan: 70-03
wave: 3
title: ATOMIC validators + CI surface — HARNESS-03 + HARNESS-04
depends_on: [70-02]
---
```

**Files modified:**
- `scripts/validation/check-phase-67.mjs` NEW
- `scripts/validation/check-phase-68.mjs` NEW
- `scripts/validation/check-phase-69.mjs` NEW
- `scripts/validation/check-phase-70.mjs` MODIFIED (Wave 1 scaffold → full V-70-01..27 bodies)
- `.github/workflows/audit-harness-v1.7-integrity.yml` MODIFIED (9 itemized edits per §HARNESS-04)

**Commit:** **Atom 2** — ONE atomic commit per D-02; 5 files indivisible (chain-validator topology + CI-execution-graph)

**Pre-commit dry-run protocol:** See §HARNESS-04 Atomic-Commit Dry-Run Protocol above.

### Wave 4 / Plan 70-04 — 3-Axis Terminal Re-Audit (Per D-03)

**Frontmatter:**
```yaml
---
phase: 70
plan: 70-04
wave: 4
title: HARNESS-05 — 3-axis terminal re-audit (local fresh-clone + GHA workflow_dispatch)
depends_on: [70-03]
---
```

**Files modified:**
- `.planning/phases/70-.../70-04-AUDIT-RESULTS.md` NEW (artifact only; no source-file edits)

**Spawn protocol:** Fresh `gsd-executor` sub-agent spawn (orchestrator dispatch; zero context-carryover from Plans 70-01..70-03 author-agents per D-22 INTENT)

**Workflow:**
1. Axis 1 — local fresh-clone (PowerShell recipe per §HARNESS-05 Axis 1)
2. Axis 2 — GHA workflow_dispatch (gh CLI invocation per §HARNESS-05 Axis 2)
3. Capture all evidence into `70-04-AUDIT-RESULTS.md` with B.1 + B.2 sections

**Commit:** Single Wave-4 audit-results commit (`docs(phase-70): wave 4 terminal re-audit — 3-axis stacking evidence`)

### Wave 5 / Plan 70-05 — HARNESS-06 Milestone Close + Traceability

**Frontmatter:**
```yaml
---
phase: 70
plan: 70-05
wave: 5
title: HARNESS-06 — v1.7-MILESTONE-AUDIT.md + v1.7-DEFERRED-CLEANUP.md FINALIZE + 4-doc traceability closure
depends_on: [70-04]
---
```

**Files modified:**
- (Commit A) — sed-i SHA placeholder fill across:
  - `scripts/validation/check-phase-67.mjs`
  - `scripts/validation/check-phase-68.mjs`
  - `scripts/validation/check-phase-69.mjs`
  - `scripts/validation/check-phase-70.mjs`
  - `scripts/validation/regenerate-supervision-pins.mjs` (BASELINE_11 comment block)
- (Commit B) — milestone close:
  - `.planning/milestones/v1.7-MILESTONE-AUDIT.md` NEW
  - `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` FINALIZED
  - `.planning/PROJECT.md`
  - `.planning/ROADMAP.md`
  - `.planning/STATE.md`
  - `.planning/REQUIREMENTS.md`
  - `.planning/phases/70-.../70-VERIFICATION.md` NEW
  - `.planning/phases/70-.../70-05-SUMMARY.md` NEW (per project workflow convention)

**Commits:** 2 (Commit A = SHA-fill; Commit B = close-gate). Plan 70-05 author may opt for Option (a) single literal-placeholder commit (D-04 Claude's Discretion).

---

## Anti-Regression Invariants Checklist (Phase 70 MUST Preserve)

Per STATE.md lines 125-134 + REQUIREMENTS.md:36 + REQUIREMENTS.md:67 + REQUIREMENTS.md:70:

- [ ] C12 240-cell math (6 H2 × 5 platform cols × 48 rows) — no edits to `docs/reference/4-platform-capability-comparison.md`
- [ ] D-13/D-18 sibling-anchor-pin contract — `docs/reference/macos-capability-matrix.md` + `docs/reference/4-platform-capability-comparison.md` BYTE-UNCHANGED
- [ ] PITFALL-6 anchor inventory — no edits to existing capability matrices, glossaries, or hub files (Phase 70 deliverables touch ZERO corpus files)
- [ ] Append-only contract on hub files — `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/operations/00-index.md`, `docs/index.md` BYTE-UNCHANGED in Phase 70
- [ ] L1 runbook count UNCHANGED — no L1 additions/removals (v1.6 ended with #34; v1.7 makes no changes)
- [ ] L2 runbook count UNCHANGED — no L2 additions/removals (v1.6 ended with #26)
- [ ] Predecessor workflow YAML BYTE-UNCHANGED — `audit-harness-integrity.yml` (v1.4) + `audit-harness-v1.5-integrity.yml` + `audit-harness-v1.6-integrity.yml`
- [ ] BASELINE_9 array byte-unchanged in regenerate-supervision-pins.mjs (lines 416-426) — only comment block above gains BASELINE_11 row
- [ ] v1.4/v1.5/v1.6 milestone-audit.mjs files BYTE-UNCHANGED
- [ ] Auditor-independence at terminal re-audit (fresh clone D-03 + fresh sub-agent D-22 + cross-OS Linux GHA CILINUX-01)
- [ ] BASELINE_10 v1.6 carry-over CLOSED by BASELINE_11 freshness comment (HARNESS-02 contract)
- [ ] Sequential-on-main-tree execution (`use_worktrees:false` durable per `.planning/config.json:7` + memory)
- [ ] Zero corpus edits (cleanup + tooling milestone — REQUIREMENTS.md:67 lock)
- [ ] No new C-checks beyond v1.6 inheritance (REQUIREMENTS.md:69 lock)
- [ ] CI-3 Managed Apple ID corpus rename DEFERRED to v1.8+ (45 occurrences / 16 files; trigger not met)
- [ ] PROJECT.md / ROADMAP.md / STATE.md / REQUIREMENTS.md 4-doc traceability closure pattern preserved (v1.4..v1.6 lineage)
- [ ] `docs/decision-trees/09-linux-triage.md` REMOVED from path-filter (per Phase 69 D-04 sub-decision (a) + STATE.md:138)

**Verification commands (Plan 70-05 close-gate or Wave 4 Axis 1):**

```bash
# Predecessor workflow byte-unchanged
git diff <phase_70_atom_1_SHA>^ HEAD -- \
  .github/workflows/audit-harness-integrity.yml \
  .github/workflows/audit-harness-v1.5-integrity.yml \
  .github/workflows/audit-harness-v1.6-integrity.yml
# Expect: empty diff

# Predecessor milestone-audit harness byte-unchanged
git diff <phase_70_atom_1_SHA>^ HEAD -- \
  scripts/validation/v1.4-milestone-audit.mjs \
  scripts/validation/v1.4.1-milestone-audit.mjs \
  scripts/validation/v1.5-milestone-audit.mjs \
  scripts/validation/v1.6-milestone-audit.mjs
# Expect: empty diff (and if any of these don't exist on disk, that's also fine — no fabrication)

# Zero corpus edits across Phase 70
git diff <phase_67_close_SHA> HEAD -- docs/
# Expect: empty diff except 09-linux-triage.md path-filter removal (which is .github/, not docs/)

# Hub files byte-unchanged across Phase 70
git diff <phase_67_close_SHA> HEAD -- \
  docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md \
  docs/operations/00-index.md docs/index.md
# Expect: empty diff
```

---

## Runtime State Inventory (Phase 70 is Tooling-Only — Minimal Runtime Surface)

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None — Phase 70 ships no data migrations; sidecar `v1.7-audit-allowlist.json` is git-committed source-of-truth, not runtime-stored state | None |
| Live service config | None — Phase 70 introduces no external services. GitHub Actions workflow YAML is git-committed; GHA-managed scheduled crons re-load on each commit | None (GHA auto-loads `schedule:` blocks on workflow YAML commit) |
| OS-registered state | None — Phase 70 modifies no Windows Task Scheduler, launchd, systemd, pm2, or registry entries | None |
| Secrets/env vars | None — Phase 70 references no secrets. CI-Linux job uses default GHA-provided `GITHUB_TOKEN` only (existing) | None |
| Build artifacts | None — Phase 70 produces no compiled binaries, packaged tarballs, egg-info dirs, or installed packages | None |

**The canonical question — answered:** After every file change Phase 70 makes is committed, no runtime systems have stale references because Phase 70 touches ONLY git-committed source files. The GHA workflow YAML auto-reloads on commit; the validator harness re-reads the sidecar on each invocation; the BASELINE_11 comment is documentation, not runtime state.

---

## Common Pitfalls

### Pitfall 1: Recreating workflow YAML via Path-A copy instead of EXTENDING

**What goes wrong:** Planner treats HARNESS-04 like HARNESS-01/02 (Path-A copy) and overwrites the existing `audit-harness-v1.7-integrity.yml`.
**Why it happens:** REQUIREMENTS.md:36 historically described HARNESS-04 as "Path-A copy from audit-harness-v1.6-integrity.yml" before Phase 69 staged the v1.7 file.
**How to avoid:** CONTEXT.md explicit: file EXISTS at HEAD post-Phase-69 `dd1ff08` + Fix-1 `85521bb` + Fix-2 `2d61981`. Phase 70 MODIFIES via 9 itemized EDITs (a..i) per §HARNESS-04.
**Warning signs:** Plan 70-03 draft contains language like "Path-A copy `audit-harness-v1.6-integrity.yml` → `audit-harness-v1.7-integrity.yml`" or `files_modified` lists the YAML as NEW instead of MODIFIED. Loss of `fetch-depth: 0` on linux-chain checkout would be the catastrophic failure mode (re-introduces FETCH-DEPTH-01).

### Pitfall 2: Splitting Atom 1 across files OR collapsing Atom 1 + Atom 2 into one commit

**What goes wrong:** Planner authors Plan 70-02 with 4-5 files (Atom 1 + check-phase-70.mjs scaffold or workflow YAML) or Plan 70-02 + 70-03 collapse into single 8-file commit.
**Why it happens:** Author thinks "atomic" is stylistic, not contractual.
**How to avoid:** D-02 LOCKED — Atom 1 = 3-file literal Phase 66-02 precedent; Atom 2 = 5-file CI-execution-graph atomic. Two-atomic split is the work product, not a stylistic choice.
**Warning signs:** Plan 70-02 `files_modified` lists != 3 files. Plan 70-03 `files_modified` lists != 5 files. Pre-commit dry-run protocols inadvertently allow cross-atom file additions.

### Pitfall 3: V-NN-SELF guard regression (CHAIN_PHASES includes own phase)

**What goes wrong:** Author copies check-phase-66.mjs verbatim including `CHAIN_PHASES = [48..65]` without realizing check-phase-67's CHAIN_PHASES should be `[48..66]` (excluding 67).
**Why it happens:** Path-A copy + insufficient mental model of V-NN-SELF semantics.
**How to avoid:** Each validator's CHAIN_PHASES = `[48..N-1]` where N is the validator's own phase. Verify via V-NN-SELF assertion (`CHAIN_PHASES.includes(N) === false`).
**Warning signs:** Validator standalone run shows `V-NN-CHAIN-N` cycle (self-recursive subprocess invocation). Subprocess timeout on chain run (since validator spawns itself).

### Pitfall 4: Forgetting v1.7-frozen-aware helpers (HEAD-coupling everything)

**What goes wrong:** Author Path-A copies check-phase-66.mjs verbatim but doesn't add `readCorpusAtV17Close()` / `readSidecarAtV17Close()` / etc. helpers; HEAD-couples all assertions.
**Why it happens:** check-phase-66.mjs source has no v1.6-frozen-aware helpers (it pre-dates the pattern); Path-A copy is faithful but incomplete for v1.7 needs.
**How to avoid:** Reference `check-phase-61.mjs` (lines 38-63) for the helper pattern; per-V-NN-NN freshness matrix in 70-CONVENTIONS.md dictates routing.
**Warning signs:** All V-NN-NN assertions read via `readFile(<path>)` (HEAD-coupled). check-phase-70.mjs has zero `execFileSync('git', ['show', '{phase_70_close_SHA}:...'])` invocations.

### Pitfall 5: Skipping the BASELINE_11 + parseAllowlist repoint pair

**What goes wrong:** Author adds BASELINE_11 comment but forgets to repoint 4 `parseAllowlist('scripts/validation/v1.6-audit-allowlist.json')` sites to v1.7 in `regenerate-supervision-pins.mjs`.
**Why it happens:** BASELINE_11 is the visible contract (REQUIREMENTS.md:32); the parseAllowlist repoint is the implicit corollary captured only in the forward-pointer at regenerate-supervision-pins.mjs:414-415.
**How to avoid:** Atomic-commit dry-run step (c) `node scripts/validation/regenerate-supervision-pins.mjs --self-test` will FAIL if sidecar pointer is stale + v1.7 sidecar has line-coord drift OR v1.6 sidecar is removed (which it ISN'T — v1.6 persists for predecessor reproducibility).
**Warning signs:** Wave 2 pre-commit dry-run step (c) reds. Post-commit, regenerate-supervision-pins.mjs `--self-test` reads v1.6 sidecar while v1.7-milestone-audit.mjs reads v1.7 sidecar — divergent provenance.

### Pitfall 6: Re-litigating gray areas during plan-phase

**What goes wrong:** Plan author re-explores Option A vs B vs C for D-01/D-02/D-03/D-04 instead of executing the LOCKED decisions.
**Why it happens:** Author treats CONTEXT.md decisions as recommendations rather than constraints.
**How to avoid:** CONTEXT.md decisions are LOCKED via `/adversarial-review` user-approval. The plan author EXECUTES the decisions; gray areas were resolved at discuss-phase.
**Warning signs:** Plan draft contains language like "considering Option A or B..." or "alternative approach..." for any D-01/D-02/D-03/D-04 boundary.

### Pitfall 7: ARCHIVE-01 recurrence-check creep into HARNESS-06 scope

**What goes wrong:** Plan 70-05 author adds `git diff HEAD~1 HEAD -- .planning/MILESTONES.md` runbook to HARNESS-06 deliverables, thinking it's needed for v1.7-MILESTONE-AUDIT.md authoring.
**Why it happens:** v1.7-DEFERRED-CLEANUP.md:21 says "Plan 70 author MUST run `git diff...`" which sounds like Plan 70 scope.
**How to avoid:** CONTEXT D-03 LOCKED: ARCHIVE-01 recurrence-check belongs at the `/gsd-complete-milestone` skill invocation site (post-Phase-70-close), NOT inside HARNESS-06. v1.7-MILESTONE-AUDIT.md does NOT include archival mechanics.
**Warning signs:** Plan 70-05 task list includes "audit MILESTONES.md for cdcce23-style garbage". v1.7-MILESTONE-AUDIT.md contains a "## Archive-Script Recurrence Check" section.

---

## Code Examples (Verified from Source Files)

### Example 1: V-NN-SELF guard pattern (verbatim from check-phase-65.mjs:151)

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

### Example 2: v1.N-frozen-aware helper (verbatim from check-phase-61.mjs:38-63)

```javascript
// Reads <FILE>.md state at v1.N-close SHA <FROZEN_SHA> (frozen state for V-NN-NN structural assertions).
function read<File>AtV1NClose() {
  try {
    return execFileSync('git', ['show', '<FROZEN_SHA>:<relative-path>'], { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n');
  } catch (err) {
    return null;
  }
}
```

### Example 3: V-NN-CHAIN regression-guard loop (verbatim from check-phase-66.mjs:293-321)

```javascript
// === V-NN-CHAIN: chain regression-guards for check-phase-{48..N-1}.mjs ===
for (let i = 0; i < CHAIN_PHASES.length; i++) {
  const phaseNum = CHAIN_PHASES[i];
  const id = 'CHAIN-' + phaseNum;
  checks.push({
    id, name: `V-NN-${id}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
      if (CHAIN_SKIP.has(phaseNum)) {
        return { pass: true, skipped: true, detail: 'pre-existing failure (CHAIN_SKIP empty post-Phase-68 — should never trigger)' };
      }
      const path = `scripts/validation/check-phase-${phaseNum}.mjs`;
      if (!existsSync(join(process.cwd(), path))) {
        return { pass: true, skipped: true, detail: path + ' not present (graceful skip)' };
      }
      try {
        execFileSync('node', [path], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
        return { pass: true, detail: 'check-phase-' + phaseNum + ' exits 0' };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + stderr.slice(0, 200) };
      }
    }
  });
}
```

### Example 4: Atomic-commit verification command (verbatim from v1.6 Phase 66-02 plan)

```bash
git log --name-only -1 HEAD
# Expect: exactly N files (no others) where N = Atom 1 (3) or Atom 2 (5)

git diff HEAD~1 HEAD --stat
# Expect: line-count delta within expected bounds per atom
```

### Example 5: Phase 66-04 PowerShell fresh-clone recipe (verbatim mechanism — replace v1.6 → v1.7)

See full recipe in §HARNESS-05 Axis 1 above.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Single-file harness check (`check-phase-NN.mjs` with only V-NN-NN assertions) | Chain-validator pattern (chain-apex recursively spawns check-phase-{48..N-1} via execFileSync) | Phase 47+ (v1.4 / v1.4.1) | Validators become regression-guards for predecessors |
| Worktree-based auditor-independence (D-22 literal `git worktree add`) | Fresh `git clone --no-hardlinks` D-03 LOCKED mechanism | v1.6 Phase 66-04 commit `489edca` | STRICTER physical isolation (separate `.git/` vs shared); reconciles `use_worktrees:false` |
| HEAD-coupled validator assertions on milestone-close planning-doc state | v1.N-frozen-aware helpers via `execFileSync('git', ['show', '<frozen_SHA>:<path>'])` | Phase 68 Plan 68-03 Task 1 commit `d7d7d5f` (REQUIREMENTS); Phase 69 Fix-2 `2d61981` (ROADMAP) | Validators robust against post-close planning-doc reorganization |
| 60s subprocess timeout per chain validator invocation | 300s subprocess timeout | Phase 68 atomic commit `7b635ca` (Rule 3 auto-fix) | 3x headroom over empirical 102s Windows max; Linux measured 56s |
| Default `actions/checkout@v4` (fetch-depth:1 shallow clone) | `with: { fetch-depth: 0 }` on cross-OS chain jobs | Phase 69 Fix-1 commit `85521bb` | v1.N-frozen-aware validators can resolve historical SHAs on GHA Linux |
| Skip-if-missing for-loop stub for check-phase-67..70 in CI workflow | Active `node scripts/validation/check-phase-NN.mjs` invocations | Phase 70 HARNESS-04 EXTEND | chain-67..70 cross-OS verified PR-blocking |
| Single-axis auditor-independence (fresh-clone OR fresh-sub-agent) | 3-axis stacking (fresh-clone + fresh-sub-agent + cross-OS Linux GHA) | Phase 70 D-03 LOCKED | Operationalizes STATE.md:111 independence-axes elevation |

**Deprecated/outdated:**
- CHAIN_SKIP `{48, 51, 58, 60, 61}` suppression — removed atomically in Phase 68 commit `7b635ca`; chain green for first time since v1.5 close
- v1.6 sidecar reference in `regenerate-supervision-pins.mjs` — repointed v1.5→v1.6 in Phase 68 Plan 68-02 commit `79c65c6`; will repoint v1.6→v1.7 in Phase 70 Atom 1
- Path-A copy approach for HARNESS-04 workflow YAML — superseded by EXTEND approach since file exists post-Phase-69
- 2-axis auditor-independence (used at v1.5 Phase 61 + v1.6 Phase 66) — superseded by 3-axis stacking at v1.7 Phase 70

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| (none) | All claims in this research are CITED to source files (verbatim line refs) or VERIFIED via tool reads. No assumed knowledge. | — | — |

**Empty table — all assertions are CITED or VERIFIED. No user confirmation needed.**

---

## Open Questions

1. **Plan 70-05 commit topology — Option (a) single literal-placeholder commit vs Option (b) two-commit chicken-and-egg**
   - What we know: CONTEXT D-04 + Claude's Discretion recommends Option (b) for cleaner audit-doc citation symmetry with v1.6 Phase 66-05 ATOMIC TRIO precedent
   - What's unclear: Whether Plan 70-05 author prefers symmetry (Option b) or minimal-commit-count (Option a)
   - Recommendation: Defer to Plan 70-05 author at plan-phase; both options satisfy CONTEXT D-04. Recommend Option (b) for symmetry but accept (a) if commit-tree pre-computation feels brittle.

2. **HARNESS-04 EDIT (g) chain-67..70 invocation topology — Option (i) within `linux-chain-ubuntu-latest` job vs Option (ii) separate per-validator jobs**
   - What we know: v1.6 workflow uses Option (ii) (separate jobs for check-phase-62..66 at lines 76-154)
   - What's unclear: Whether Plan 70-03 author prefers parallel-job topology (Option ii) or sequential-step topology (Option i)
   - Recommendation: Option (ii) — mirrors v1.6 workflow surface area; parallel execution; better failure isolation. Plan 70-03 author may choose either.

3. **v1.7-audit-allowlist.json M-05 c13_rotting_external.ci_2_vpp_location_token — keep 6 entries with `resolved` markers OR clear array**
   - What we know: v1.6 sidecar carries the 6 entries with `"resolved_2026_05_26": true` per Phase 67 Plan 67-02 commit `55260b3` (annotate-not-remove pattern)
   - What's unclear: Whether v1.7 sidecar should preserve audit-trail (keep 6 entries) or reflect post-rename clean-state (empty array)
   - Recommendation: Keep 6 entries with `resolved_2026_05_26: true` markers — empirically consistent with v1.6 sidecar's annotate-not-remove pattern; clearing would break the audit trail and contradict CONTEXT D-01's reference to "post-SWEEP-01/02 state from Phase 67 commits"

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All `.mjs` validators (Wave 2 + Wave 3 + Wave 4 Axis 1) | ✓ | ≥20 (workflow YAML pins) | — |
| Git | Wave 4 Axis 1 fresh-clone + v1.N-frozen-aware helpers | ✓ | (any modern) | — |
| gh CLI | Wave 4 Axis 2 GHA workflow_dispatch invocation + run-log capture | ✓ | (any modern) | — |
| PowerShell | Wave 4 Axis 1 fresh-clone recipe | ✓ | Windows-native | — |
| GitHub Actions ubuntu-latest runner | Wave 4 Axis 2 cross-OS evidence | ✓ (Phase 69 verified) | — | — |
| markdown-link-check | rotting-external-quarterly CI job (HARNESS-04 EDIT i) | ✓ (pinned `3.14.2`) | 3.14.2 | — |
| Sed (sed -i) | Plan 70-05 Commit A SHA-substitution pass | ✓ (Git-bash or WSL available on Windows) | (any modern) | PowerShell `(Get-Content ... ) -replace ...` equivalent |

**Missing dependencies with no fallback:** None
**Missing dependencies with fallback:** None

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Custom Node.js validator chain (`scripts/validation/*.mjs`) + GitHub Actions workflow |
| Config file | None (validators are self-contained ESM modules; workflow YAML at `.github/workflows/audit-harness-v1.7-integrity.yml`) |
| Quick run command | `node scripts/validation/v1.7-milestone-audit.mjs --verbose` (post-Wave-2) |
| Full suite command | `node scripts/validation/check-phase-70.mjs --verbose` (post-Wave-3; chain-apex recursively spawns 48..69) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HARNESS-01 | v1.7-milestone-audit.mjs exists with C1-C16 PASS | structural | `node scripts/validation/v1.7-milestone-audit.mjs` | ❌ Wave 2 |
| HARNESS-02 | v1.7-audit-allowlist.json valid + BASELINE_11 comment + parseAllowlist repoint | structural + dry-run | `node scripts/validation/regenerate-supervision-pins.mjs --self-test` | ❌ Wave 2 |
| HARNESS-03 | check-phase-67..70.mjs each exit 0 with V-NN-SELF + V-NN-CHAIN + V-NN-AUDIT + V-NN-NN | structural + integration | `node scripts/validation/check-phase-70.mjs` (chain-apex) | ❌ Wave 3 |
| HARNESS-04 | Workflow YAML has 9 itemized edits + predecessor BYTE-UNCHANGED | structural + diff | `gh workflow run` + `git diff <predecessor-files>` | ❌ Wave 3 |
| HARNESS-05 | 3-axis re-audit produces 70-04-AUDIT-RESULTS.md with B.1 + B.2 sections | end-to-end | PowerShell fresh-clone recipe + `gh workflow run` | ❌ Wave 4 |
| HARNESS-06 | v1.7-MILESTONE-AUDIT.md + v1.7-DEFERRED-CLEANUP.md + 4-doc traceability closure | document | `node scripts/validation/check-phase-70.mjs` post-Commit-B | ❌ Wave 5 |

### Sampling Rate

- **Per task commit:** `node scripts/validation/v1.7-milestone-audit.mjs` (quick; ~5s)
- **Per wave merge:** `node scripts/validation/check-phase-70.mjs` (chain-apex; recursively spawns 48..69; ~102s Windows / ~56s Linux)
- **Phase gate:** Full chain green (chain-apex 28/0/0 OR 30+/0/0 with 4 new v1.7 validators) BOTH Windows AND Linux GHA

### Wave 0 Gaps

- **None — existing test infrastructure covers all phase requirements.** The harness + chain validator framework is mature (28 validators at HEAD; 32+ post-Wave-3). Phase 70 EXTENDS this infrastructure with 4 new validators; does not require new framework.

---

## Security Domain

> Phase 70 is tooling/validation work — `security_enforcement` is not explicitly enabled in `.planning/config.json` (key absent). Per protocol, treating as enabled.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | Phase 70 introduces no authentication surface |
| V3 Session Management | no | No sessions |
| V4 Access Control | no | No new access surfaces; GHA workflow inherits existing repo permissions |
| V5 Input Validation | yes (low) | `JSON.parse` on sidecar (existing pattern); `execFileSync` for git operations (existing pattern) — no new untrusted input surfaces |
| V6 Cryptography | no | Phase 70 introduces no cryptographic operations |

### Known Threat Patterns for Validator + CI Stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Subprocess command injection via untrusted file paths | Tampering | `execFileSync` with array args (not `exec` with string concatenation) — existing pattern preserved |
| GHA workflow_dispatch abuse | EoP | Repo-level permissions inherit; no new permission grants |
| Slopsquatting / typosquatting of npm dependencies | Tampering | No new npm packages introduced; `markdown-link-check@3.14.2` pinned via `npm view` at Phase 66 Wave 3 |
| Path traversal via sidecar JSON | Tampering | Sidecar is git-committed source-of-truth; tampering requires repo write access |

---

## Sources

### Primary (HIGH confidence)

- `D:\claude\Autopilot\.planning\phases\70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo\70-CONTEXT.md` (lines 1-291 read; 372 total) — full D-01..D-04 locked decisions + Canonical References list + Existing Code Insights
- `D:\claude\Autopilot\.planning\REQUIREMENTS.md` (full) — Pillar D HARNESS-01..06 binding contracts (lines 28-40); Out-of-Scope table (lines 59-72); Traceability table (lines 77-100)
- `D:\claude\Autopilot\.planning\ROADMAP.md` (lines 350-420) — Phase 70 SC#1-5 verbatim
- `D:\claude\Autopilot\.planning\STATE.md` (full 242 lines) — v1.7 architectural decisions (lines 100-119) + anti-regression invariants (lines 125-134) + Phase 69 Decisions (lines 165-173) — FETCH-DEPTH-01 + SCOPE-GAP-61 + D-04-OVERSPEC-01 + CHAIN-WRAPPER-01 details
- `D:\claude\Autopilot\scripts\validation\v1.6-milestone-audit.mjs` (full 980 lines) — Path-A source for HARNESS-01; C1-C16 implementations + self-test
- `D:\claude\Autopilot\scripts\validation\v1.6-audit-allowlist.json` (full 121 lines) — Path-A source for HARNESS-02; sidecar shape
- `D:\claude\Autopilot\scripts\validation\check-phase-66.mjs` (full 380 lines) — Path-A source for HARNESS-03; V-NN-SELF guard + chain-apex wrapper + execFileSync pattern
- `D:\claude\Autopilot\scripts\validation\check-phase-61.mjs` (full 440 lines) — per-assertion-class freshness routing exemplar; readRequirementsAtV15Close + readRoadmapAtV15Close helpers
- `D:\claude\Autopilot\.github\workflows\audit-harness-v1.7-integrity.yml` (full 94 lines) — HARNESS-04 EXTEND target (current state post-Phase-69)
- `D:\claude\Autopilot\.github\workflows\audit-harness-v1.6-integrity.yml` (full 207 lines) — source for missing-from-v1.7 jobs (2 crons + pin-helper-advisory + rotting-external-quarterly)
- `D:\claude\Autopilot\.planning\milestones\v1.6-MILESTONE-AUDIT.md` (full 344 lines) — HARNESS-06 Path-A template
- `D:\claude\Autopilot\.planning\milestones\v1.7-DEFERRED-CLEANUP.md` (full 224 lines) — current state; HARNESS-06 extension surface
- `D:\claude\Autopilot\.planning\milestones\v1.6-DEFERRED-CLEANUP.md` (full 150 lines) — carry-forward source
- `D:\claude\Autopilot\.planning\milestones\v1.6-phases\66-apple-business-validation-tooling-closure-milestone-audit\66-02-PLAN.md` (lines 1-120 read) — Atom 1 precedent
- `D:\claude\Autopilot\.planning\milestones\v1.6-phases\66-apple-business-validation-tooling-closure-milestone-audit\66-04-PLAN.md` (lines 1-150 read) — fresh-clone mechanism precedent
- `D:\claude\Autopilot\.planning\milestones\v1.6-phases\66-apple-business-validation-tooling-closure-milestone-audit\66-04-AUDIT-RESULTS.md` (full 372 lines) — audit-results artifact precedent
- `D:\claude\Autopilot\.planning\milestones\v1.6-phases\66-apple-business-validation-tooling-closure-milestone-audit\66-05-PLAN.md` (lines 1-100 read) — Wave 5 milestone close precedent
- `D:\claude\Autopilot\scripts\validation\regenerate-supervision-pins.mjs` (BASELINE comment region + parseAllowlist callers grep'd) — BASELINE_10/11 insertion point + 4 parseAllowlist sites at lines 290, 336, 431, 433
- `D:\claude\Autopilot\scripts\validation\check-phase-65.mjs` (lines 140-170 read) — V-65-SELF + V-65-CHAIN structural pattern

### Secondary (MEDIUM confidence)

- None — all sources are primary (direct file reads)

### Tertiary (LOW confidence)

- None — no WebSearch dependencies; this research is entirely codebase-internal

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all tooling versions verified via existing pin records (markdown-link-check@3.14.2 + node-version '20')
- Architecture: HIGH — all patterns verified via direct source-file reads; v1.6 → v1.7 deltas line-anchored
- Pitfalls: HIGH — all pitfalls grounded in CONTEXT D-01..D-04 + STATE.md anti-regression invariants

**Research date:** 2026-05-28
**Valid until:** 7 days (fast-moving validator surface; Plan 70-01..05 should execute within this window)

## RESEARCH COMPLETE

**Phase:** 70 - v1.7 Audit Harness Lineage Bump + Milestone Close (Pillar D — Close-Gate)
**Confidence:** HIGH

### Key Findings

1. **HARNESS-04 is EXTEND not Path-A** — workflow YAML already exists at HEAD post-Phase-69. 9 itemized edits required; `fetch-depth: 0` is load-bearing inheritance contract (FETCH-DEPTH-01). Catastrophic failure mode = accidentally recreating the file via Path-A and losing fetch-depth:0.

2. **HARNESS-01 is 6-line lineage edit** — `v1.7-milestone-audit.mjs` is byte-identical to v1.6 except 6 line edits (E-01..E-06). All C1-C16 check bodies + self-test + runner loop preserved verbatim.

3. **HARNESS-02 reveals implicit parseAllowlist repoint** — BASELINE_11 freshness comment is the visible contract, but 4 `parseAllowlist('scripts/validation/v1.6-audit-allowlist.json')` sites in `regenerate-supervision-pins.mjs` (lines 290, 336, 431, 433) must also repoint to v1.7 sidecar for provenance coherence. Forward-pointer at `regenerate-supervision-pins.mjs:414-415` documents this.

4. **HARNESS-03 freshness routing fully specified** — ~30 V-70-NN assertions across check-phase-70.mjs (most complex of the 4 validators); ~10-15 V-NN-NN per check-phase-67/68/69.mjs. Per-V-NN-NN freshness matrix is Plan 70-01 Wave-1 deliverable in `70-CONVENTIONS.md`. v1.7-frozen-aware helpers (`readCorpusFileAtV17Close`, `readSidecarAtV17Close`, etc.) follow check-phase-61.mjs pattern verbatim.

5. **Two-atomic split locked** — Atom 1 (3 files literal Phase 66-02 precedent); Atom 2 (5 files chain-validator + CI surface). Pre-commit dry-run protocols fully specified for both atoms.

### File Created

`D:\claude\Autopilot\.planning\phases\70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo\70-RESEARCH.md`

### Confidence Assessment

| Area | Level | Reason |
|------|-------|--------|
| HARNESS-01 spec | HIGH | Line-anchored 6 edits with byte-level source verification |
| HARNESS-02 spec | HIGH | JSON shape + BASELINE_11 insertion point grepped + parseAllowlist 4 sites verified |
| HARNESS-03 spec | HIGH | V-NN-NN assertion lists derived from D-01 routing matrix + check-phase-66.mjs Path-A inheritance |
| HARNESS-04 spec | HIGH | 9 itemized edits with line-anchored source from v1.7 + v1.6 workflow YAMLs |
| HARNESS-05 spec | HIGH | PowerShell recipe + gh CLI sequence + audit-results structure from Phase 66-04 verbatim precedent |
| HARNESS-06 spec | HIGH | v1.6-MILESTONE-AUDIT.md section-by-section mapping + Discoveries section structure + 4-doc traceability closure exhaustively enumerated |
| Anti-regression invariants | HIGH | All 17 invariants cited to STATE.md + REQUIREMENTS.md + CONTEXT.md sources |

### Open Questions

3 open questions (commit topology choice, EDIT g sub-option choice, M-05 sidecar choice) — all 3 are Plan-author tactical choices within LOCKED CONTEXT D-01..D-04 constraints. Recommendations provided; defer to Plan author at plan-phase.

### Ready for Planning

Research complete. Planner can now author 5 plans (70-01..70-05) directly from this document without re-research. Every Wave's edit surface is enumerated; every atomic-commit dry-run protocol is specified; every acceptance criterion template is provided.
