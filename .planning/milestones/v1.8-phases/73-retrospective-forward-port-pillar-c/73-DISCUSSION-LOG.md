# Phase 73: Retrospective Forward-Port (Pillar C) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-08
**Phase:** 73-retrospective-forward-port-pillar-c
**Areas discussed:** D-01 Wrapper fold-in boundary, D-02 Helper centralization, D-03 Inventory shape + plan layout, D-04 SHA-pin convention
**Method:** 4 parallel `gsd-advisor-researcher` agents in adversarial-review mode (Finder/Adversary/Referee, lower score = better) per user memory `feedback_adversarial_review_preference`. All 4 picks user-approved via single "Approve all 4 — proceed to CONTEXT.md" selection.

---

## D-01: Wrapper fold-in boundary

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | Pure RETRO scope per REQUIREMENTS.md:25-27 literal text — Convert HEAD-coupled assertions only; document the 11 stderr-only sites in inventory but route ALL to v1.9+ | 9 | |
| B | Fold all 11 sites into RETRO-02 commits — Each conversion plan ALSO fixes affected file's CHAIN/AUDIT wrapper in same atomic commit; helper-spawn sites also folded | 9 | |
| C (refined) | Fold 8 CHAIN+AUDIT wrappers into Plan 73-01 RETRO-01 atomic SHA; route 3 helper-spawn sites at check-phase-{48, 60, 61}.mjs to v1.9+ as HELPER-SPAWN-STDERR-01 stub (class-type carve-out) | **7** | ✓ |
| D | Pure-wrapper Phase 73a (RETRO-02 catch-block fix) FIRST, then RETRO-01/02 conversion (wave-order inversion) | 10 | |

**User's choice:** C refined
**Notes:** Decision wedge — Phase 73 RETRO-01 inventory work must read source on ALL 19 `check-phase-{48..66}.mjs` files per `REQUIREMENTS.md:25` literal contract → folding the 8 CHAIN+AUDIT wrapper fixes into the RETRO-01 inventory landing SHA honors Phase 72's "free passenger" framing literally; the 3 helper-spawn sites are shape-distinct (`--self-test` failure-mode + different slice-budget) → class-type carve-out to v1.9+ preserves `REQUIREMENTS.md:67` strict-scope discipline. Wrapper-fix anchored to RETRO-01 SHA (not RETRO-02 conversion SHA) keeps free-passenger framing intact even if V-61-17 closure cascade-collapses check-phase-{62..65}.mjs as non-RETRO-02 modification targets.

---

## D-02: Helper centralization vs per-file inheritance

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | Continue per-file inline pattern (status quo) — Each new helper declared inline in the file that needs it | 6 | |
| B | Centralize ALL frozen-aware helpers into `_lib/frozen-at-close.mjs` — Existing inline helpers in check-phase-{61, 67, 68, 70}.mjs refactored too | 7 | |
| C | Centralize ONLY NEW helpers; leave existing inline helpers untouched (hybrid) — Refactor deferred to v1.9+ as FROZEN-AWARE-ADOPTION-SWEEP-01 | **4** | ✓ |
| D | SHA-registry-only centralization (named constants module without helper functions) | 5 | |

**User's choice:** C (centralize NEW only)
**Notes:** Decision wedge — Does Phase 73 RETRO-02 produce ENOUGH new frozen-aware helpers to justify `_lib` extraction (5-10 expected per 8-FAIL inventory floor), AND does extraction count as in-scope vs sweep-creep? Strict-scope-discipline interpretation of `REQUIREMENTS.md:67` routes existing-helper refactor to v1.9+, which makes Option C dominate Option B by ducking the SCOPE-GAP-class debate. Empirical evidence: 3× verbatim duplication of `readCorpusFileAtV17Close` across check-phase-{67, 68, 70}.mjs; 13 inline helpers across 4 files. Helper-signature drift documented (v1.5-family lacks hardened stdio; v1.7-family has it) — new `_lib` adopts hardened v1.7-family signature.

---

## D-03: Inventory artifact shape + plan layout

### Dimension A: Inventory shape

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A-md | Single committed markdown artifact (`73-RETRO-INVENTORY.md`) per-validator table | **8** | ✓ |
| A-mjs | Executable scan tool (`inventory-head-coupled-assertions.mjs --report`) | 14 | |
| A-both | Both: `.mjs` scan tool + curated markdown artifact | 18 | |

### Dimension B: Plan layout (STATE.md: 2-4)

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| B-1 | 1 atomic monster plan + close-gate (collapses inventory into conversion SHA) | 16 | |
| B-2 | 2 plans (Plan 73-01 atomic = inventory + conversion combined; Plan 73-02 close-gate) | 11 | |
| B-3 | 3 plans (Plan 73-01 inventory; Plan 73-02 conversion; Plan 73-03 close-gate) — mirrors Phase 71 D-04 3-plan precedent | **6** | ✓ |
| B-4 | 4 plans (Plan 73-01 inventory; Plan 73-02 wave 1; Plan 73-03 wave 2; Plan 73-04 close-gate) | 12 | |

**Combined winner: A-md + B-3 (score 14)**

**User's choice:** A-md + B-3
**Notes:** Decision wedge — v1.8 is closure-not-expansion + SC#1 inventory-precedence requires per-REQ atomic split. A-mjs (re-runnable scan tool) adds NEW tooling to close OLD tooling debt, violating SC#4 anti-ballooning. Phase 72 Section E per-validator markdown-inventory precedent is freshest and directly applicable. B-1/B-2 collapse inventory into conversion SHA → violate SC#1 "inventory is a committed artifact" literal read (inventory must PRECEDE conversion as source-of-truth). B-3 mirrors Phase 71 D-04 LOCKED 3-plan precedent EXACTLY and honors Phase 72 D-03 requirement-count-delta scaling (Phase 71: 2 reqs → 3 plans; Phase 72: 1 req → 2 plans; Phase 73: 2 reqs → 3 plans by linear extrapolation). Lands at `STATE.md:139` "2-4" midpoint. B-4 over-decomposes a 2-REQ phase; sequential-on-main-tree (`use_worktrees:false`) kills parallelism benefit.

**Empirical anchors (from D-03 advisor scan):** 19 validators in inventory scope; 7-validator must-touch floor (V-72-CHAIN-{61..67} FAILs); 4-5 candidate NEW HEAD-coupled in 48..60 band (check-phase-{53, 54, 56, 58, 60}.mjs probe); 6 already frozen-aware (check-phase-{61, 67, 68, 70}.mjs + 2 partial). Total RETRO-02 conversion candidates: **7-12 validators**, not 19.

---

## D-04: SHA-pin convention

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | Continue inline SHA literals (status quo) | 3.5 | |
| B | Named-constants module `_lib/milestone-close-shas.mjs` (or merge with D-02 module) | **1.5** | ✓ |
| C | Git tags (`git show v1.5:...`) | 4.5 REJECTED | |
| D | Sidecar JSON registry (`scripts/validation/milestone-close-shas.json`) | 2.5 | |

**User's choice:** B (MERGED with D-02 Option C `_lib/frozen-at-close.mjs`)
**Notes:** Decision wedge — At ≥10 SHA-pinned helpers (D-02 advisor's 8-FAIL inventory floor + 19-validator RETRO-02 scope), duplication cost of inline literals (Option A) overwhelms new-module cost of constants centralization (Option B). Option C (git tags) CRITICAL REJECTION: v1.6 has NO git tag (Phase 73 would need to create one); v1.5/v1.7 tag-SHAs DIVERGE from helper-authoring SHAs (v1.5 tag `53cf475` ≠ helper `ba2cbc0`; v1.7 tag `45d4afe` ≠ helper `aa6de68`) → using git tags would FAIL existing v1.5/v1.7 assertions on next chain run (SHA-content-shift breaks assertion content match); plus tag-mutation risk + `with: fetch-tags: true` CI compounding FETCH-DEPTH-01-class surface. Option D (sidecar JSON) close second but Option B in-source named-constants pattern beats sidecar-import overhead at this scale. **D-02 + D-04 MERGED**: both advisors recommended the same `_lib/frozen-at-close.mjs` landing site → constants and readers live together, not split modules.

**Empirical close-SHA discoveries (D-04 advisor `git log` verification):**

| Milestone | Close SHA | Source |
|---|---|---|
| v1.4.1 | `5c976ec` | Phase 47 close 2026-04-25 (`feat(47-03): PROJECT.md traceability closure`) |
| v1.5 | `ba2cbc0` | Phase 61 close — canonical (matches check-phase-61.mjs:40) |
| v1.6 | `9d8877c` | Phase 66 close 2026-05-25 — v1.6 is the ONLY milestone v1.4..v1.7 without a git tag |
| v1.7 | `aa6de68` | Phase 70 Plan 70-02 Atom 1 — canonical (matches check-phase-67/68/70.mjs) |

---

## Claude's Discretion

- RETRO-01 inventory column headers + row schema (Plan 73-01 plan-phase finalizes; may add "convertibility risk" / "frozen-SHA confidence" columns)
- Whether `check-phase-73.mjs` V-73-CONVERT-NN grows incrementally during Plan 73-02 RETRO-02 or is authored monolithically in Plan 73-01 Wave 4 (recommend incremental discovery per Phase 72 V-72-WRAPPER-NEG empirical grep-driven pattern)
- Whether to include V14 (`b5cf529` / `671f72a` candidates) in `MILESTONE_CLOSE_SHAS` (conditional: include only if RETRO-01 surfaces v1.4-close-state assertion; v1.4 close was Phase 42 predating chain validators at Phase 48 — likely zero references; default OMIT)
- `SCOPE-GAP-RETRO-02-OVERFLOW-01` STUB authoring trigger (if RETRO-01 inventory surfaces >12 conversion candidates; plan-phase author decides empirical threshold, recommend 12)
- Whether `_lib/frozen-at-close.mjs` hosts additional `readSidecarAtClose(milestoneTag)` convenience for sidecar JSON paths (Plan 73-02 author decides based on actual RETRO-02 conversion needs)
- Per-validator V-NN-NN naming convention for converted assertions (recommend preserve existing IDs + suffix with `[v1.X-frozen @ <SHA>]` per check-phase-61.mjs:78 precedent for backward-compat)

---

## Deferred Ideas

### Already locked elsewhere (Phase 72 hand-off + v1.7-DEFERRED-CLEANUP carry-over)

- HARNESS-FORWARD-01 + SCOPE-GAP-61 retrospective debts — Phase 73 RETRO-01 + RETRO-02 closes both
- 8 pre-existing V-72-CHAIN-{61..67, 70} FAILs (CHAIN-DEGRADED-AT-HEAD-01) — Phase 73 closes
- v1.8 audit harness lineage bump (HARNESS-07/08/09/10/11/12 + VPP-01) — Phase 74 Pillar D
- CI-3 + Multi-tenant Apple Business + ABDevice API + per-OU CRD + Account Holder + ASM — all v1.9+ per Microsoft Intune portal rebrand-adoption trigger gates

### Discovered during Phase 73 discussion (NEW stubs Plan 73-03 authors in v1.8-DEFERRED-CLEANUP.md)

- **HELPER-SPAWN-STDERR-01** — 3 helper-spawn stderr-only sites at check-phase-{48, 60, 61}.mjs (D-01 class-type carve-out; deterministic `--self-test` failure-mode justifies route to v1.9+)
- **FROZEN-AWARE-ADOPTION-SWEEP-01** — Existing inline helpers in check-phase-{61, 67, 68, 70}.mjs refactor to consume `_lib/frozen-at-close.mjs` (D-02 strict-scope-discipline carve-out; 13 inline helpers + helper-signature-drift normalization deferred to v1.9+)
- **EXEC-FAIL-DETAIL-EXTRACTION-01** — Phase 72 D-01 deferred-idea hand-off — DRY catch-block stdout+stderr capture across all CHAIN+AUDIT+helper-spawn wrappers (Phase 68 `_lib/archive-path.mjs` precedent applies; deferred to v1.9+ for clean DRY-refactor scope)
- **SCOPE-GAP-RETRO-02-OVERFLOW-01** (conditional) — If Plan 73-01 RETRO-01 inventory surfaces >12 conversion candidates per `REQUIREMENTS.md:67` anti-ballooning guardrail

### Discussed but explicitly out of v1.8 scope (REJECTED options)

- D-01 Option D wave-order inversion (REJECTED — violates REQUIREMENTS.md:25-27 numbering)
- D-02 Option B centralize-ALL refactor (REJECTED — strict-scope-discipline routes existing-helper refactor to v1.9+)
- D-03 A-mjs scan tool (REJECTED — v1.8 closure-not-expansion + tooling-to-close-tooling-debt violation)
- D-03 B-4 wave-split (REJECTED — sequential-on-main-tree kills parallelism benefit; 19-validator scope too small)
- D-04 Option C git-tags (REJECTED — v1.6 has no tag; v1.5/v1.7 tag-SHAs ≠ helper-authoring SHAs; tag-mutation + fetch-tags CI compound)
- Worktree-based execution (use_worktrees:false durable per memory + .planning/config.json:7)
- Modifications to v1.4/v1.4.1/v1.5/v1.6/v1.7 workflow YAMLs / harness MJS / sidecar JSONs (predecessor-byte-unchanged invariant)
- `docs/*` corpus edits (v1.8 is tooling-only milestone)
