# Phase 73: Retrospective Forward-Port (Pillar C) - Context

**Gathered:** 2026-06-08
**Status:** Ready for planning

<domain>
## Phase Boundary

The **Pillar C entry phase** of v1.8 — closes the HARNESS-FORWARD-01 + SCOPE-GAP-61 retrospective debt routed forward from v1.7 close (`v1.7-DEFERRED-CLEANUP.md:52-66, 110-131`) by class-wide-scanning `scripts/validation/check-phase-{48..66}.mjs` (19 validators) for HEAD-coupled assertions whose validator name or docstring cites a milestone-close state, then converting identified assertions to v1.5/v1.6/v1.7-frozen-aware via SHA-pinned helpers (parallel to existing `readRequirementsAtV15Close()` / `readRoadmapAtV15Close()` in `check-phase-61.mjs:38-62` + `readCorpusFileAtV17Close()` / `readSidecarAtV17Close()` / `readMilestoneAuditAtV17Close()` in `check-phase-67/68/70.mjs`). Independent of Pillar A (Phase 71 — CLOSED 2026-06-04) and coordinated with Pillar B (Phase 72 — CLOSED 2026-06-06) by file-disjoint ownership boundary so the two pillars executed in parallel per `STATE.md:128-130` Wave B/C separation; Phase 72 LANDED FIRST (per actual execution order: 71 → 72 → 73 → 74).

**Why now / why fix matters (post-Phase-72 entry-state synergy per `72-VERIFICATION.md` + 72-CONTEXT.md hand-off):**

> Phase 72 Plan 72-01 atomic SHA `d374095` fixed 6 CHAIN-wrapper stdout+stderr capture surfaces in `check-phase-{66..71}.mjs`, surfacing the previously-masked stdout diagnostic for V-61-17 + V-67-05/06. The 8 pre-existing V-72-CHAIN-{61..67, 70} FAILs (`CHAIN-DEGRADED-AT-HEAD-01` status PARTIALLY-RESOLVED-EMPIRICAL-BASELINE-CAPTURED per `v1.8-DEFERRED-CLEANUP.md:101`) are the empirical conversion floor for Phase 73 RETRO-01 inventory — `.claude/tmp/72-chain-post.txt` is the inventory's empirical signature data source.

Phase 73's value is dual: (1) close `CHAIN-DEGRADED-AT-HEAD-01` v1.8-DEFERRED-CLEANUP.md entry by converting the V-61-17 + V-67-05 + V-67-06 root-cause assertions (and cascade chains) from HEAD-coupled to frozen-aware, and (2) ship the class-wide signature inventory deliverable per `REQUIREMENTS.md:25` so downstream milestones inherit a clean retrospective-audit floor.

**Empirical entry-state inventory (D-03 advisor grep-verified across `scripts/validation/check-phase-{48..66}.mjs`):**

| Class | Sites | Phase 73 disposition |
|---|---|---|
| **HEAD-coupled assertions (RETRO-01/02 PRIMARY)** | 7 must-touch (V-72-CHAIN-{61..67} FAILs) + 4-5 candidate (check-phase-{53, 54, 56, 58, 60}.mjs band per D-03 advisor exploratory probe) | **CONVERTED in Plan 73-02 RETRO-02 atomic** |
| **Already-frozen-aware** | check-phase-{61, 67, 68, 70}.mjs (4 files — pre-Phase 73) | **LEFT BYTE-UNCHANGED** (inline helpers retained per D-02 strict-scope-discipline) |
| **CHAIN-wrapper stderr-only (Phase 72 D-01 fold-in #1)** | check-phase-{60..65}.mjs (6 sites) | **FOLDED into Plan 73-01 RETRO-01 atomic** (per D-01) |
| **AUDIT-wrapper stderr-only (Phase 72 D-01 fold-in #2)** | check-phase-{60, 61}.mjs (2 sites) | **FOLDED into Plan 73-01 RETRO-01 atomic** (per D-01) |
| **Helper-spawn stderr-only (Phase 72 D-01 carve-out)** | check-phase-{48, 60, 61}.mjs (3 sites) | **DEFERRED to v1.9+** as `HELPER-SPAWN-STDERR-01` new stub per D-01 class-type carve-out |

**RETRO-02 conversion scope estimate (per D-03 advisor empirical scan):** 7-12 validators, NOT 19. The 7-validator must-touch floor is the V-72-CHAIN-{61..67} FAILs (V-61-17 root cause + V-67-05/06 root cause + 5 cascade-chain validators). The 4-5 candidate band in check-phase-{53, 54, 56, 58, 60}.mjs surfaces via RETRO-01 scan; per `REQUIREMENTS.md:67` anti-ballooning guardrail, if RETRO-01 surfaces SCOPE-GAP-class discoveries beyond this band, they route to v1.9+ as `SCOPE-GAP-RETRO-02-OVERFLOW-01` stub.

**Empirically-discovered milestone-close SHAs (per D-04 advisor `git log` verification — Phase 73 RETRO-02 deliverable):**

| Milestone | Close SHA | Source / verification |
|---|---|---|
| **v1.4.1** | `5c976ec` | Phase 47 close 2026-04-25; commit `feat(47-03): PROJECT.md traceability closure` |
| **v1.5** | `ba2cbc0` | Phase 61 close — **MATCHES existing helper in check-phase-61.mjs:40** (canonical) |
| **v1.6** | `9d8877c` | Phase 66 close 2026-05-25; `docs(v1.6): milestone close traceability 4-doc flip` — **v1.6 is the ONLY milestone v1.4..v1.7 without a git tag** (project convention is helper-authoring SHA, not git-tag SHA) |
| **v1.7** | `aa6de68` | Phase 70 Plan 70-02 Atom 1 — **MATCHES existing helpers in check-phase-67/68/70.mjs** (canonical; helper-authoring SHA per Plan 70-05 substitution convention, NOT true close-gate `4df3a16`) |

**Deliverables (exactly — locked by D-01..D-04):**

- **RETRO-01 class-signature inventory artifact (Plan 73-01 Wave 1 + D-03 A-md)** — `.planning/phases/73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md` — per-validator class-signature table for ALL 19 validators `check-phase-{48..66}.mjs` with columns: validator name; HEAD-coupled assertion IDs (V-NN-NN); citation evidence from docstring; conversion target SHA (per D-04 `MILESTONE_CLOSE_SHAS` lookup); disposition (CONVERT_PLAN_73_02 / ALREADY_FROZEN / NO_HEAD_COUPLING / SCOPE_GAP_DEFERRED_V19). Inventory PRECEDES conversion per SC#1 "inventory is a committed artifact" literal read (per D-03 wedge analysis).

- **8 CHAIN+AUDIT wrapper fold-in (Plan 73-01 Wave 2 + D-01 Option C refined)** — Uniform stdout+stderr capture pattern propagated to `check-phase-{60, 61, 62, 63, 64, 65}.mjs` CHAIN-wrapper sites (6 fixes, matches Phase 72 Plan 72-01 fix-pattern at e.g. `check-phase-66.mjs:309-318`) AND `check-phase-{60, 61}.mjs` AUDIT-wrapper sites (2 fixes, mirrors `check-phase-66.mjs:332-333` precedent). Folded into Plan 73-01 atomic SHA alongside RETRO-01 inventory + `_lib/frozen-at-close.mjs` + `check-phase-73.mjs` stub (single SC#4 atomic landing).

- **NEW `_lib/frozen-at-close.mjs` centralized helper module (Plan 73-01 Wave 3 + D-02 Option C + D-04 Option B MERGED)** — `scripts/validation/_lib/frozen-at-close.mjs` exports:
  - `MILESTONE_CLOSE_SHAS = { V141: '5c976ec', V15: 'ba2cbc0', V16: '9d8877c', V17: 'aa6de68' }` (V14 omitted unless RETRO-01 surfaces a v1.4-close-state assertion — `git log` candidate `b5cf529` or `671f72a` left as TBD until RETRO-01 confirms need)
  - `readAtClose(milestoneTag, relPath)` — generic reader with **hardened signature** consuming v1.7-family pattern: `encoding: 'utf8'`, `timeout: 10000`, `stdio: ['ignore', 'pipe', 'pipe']`, CRLF→LF normalization via `.replace(/\r\n/g, '\n')`
  - Convenience exports: `readAtV141Close`, `readAtV15Close`, `readAtV16Close`, `readAtV17Close`
  - Module docstring at top documents HYBRID STATUS: "NEW helpers (Phase 73 onward) consume from here. EXISTING helpers in check-phase-{61, 67, 68, 70}.mjs remain inline (refactor deferred to v1.9+ as FROZEN-AWARE-ADOPTION-SWEEP-01)."

- **RETRO-02 per-validator HEAD-coupled assertion conversion (Plan 73-02 atomic — 7-12 file SHA)** — Each identified HEAD-coupled assertion in `check-phase-{48..66}.mjs` (excluding the 4 already-frozen-aware files) is rewired to consume `_lib/frozen-at-close.mjs` readers with check-name suffixing per `[v1.X-frozen @ <SHA>]` convention (mirrors `check-phase-61.mjs:78` `[v1.5-frozen @ ba2cbc0]` precedent + `check-phase-67.mjs:73` `[v1.7-frozen @ aa6de68]` precedent). Plan 73-02 also flips 8 V-72-CHAIN-{61..67, 70} FAILs → PASS (CHAIN-DEGRADED-AT-HEAD-01 status STUB → CLOSED transition).

- **`check-phase-73.mjs` validator-as-deliverable (Plan 73-01 Wave 4 + Plan 73-02 grow)** — NEW Path-A from `check-phase-72.mjs`. CHAIN_PHASES = `{48..72}`; CHAIN_SKIP = `new Set([])` (inherits Phase 68 `7b635ca` invariant). Assertions:
  - **V-73-INVENTORY** — Heading-presence check on `73-RETRO-INVENTORY.md` (per-validator class-signature table heading present + at least 19 row entries for check-phase-{48..66}.mjs — analogous to Phase 72's V-72-AUDIT-VERIFY pattern).
  - **V-73-LIB-EXISTS** — `scripts/validation/_lib/frozen-at-close.mjs` exists, exports `MILESTONE_CLOSE_SHAS` with V141/V15/V16/V17 keys + `readAtV{141,15,16,17}Close` functions.
  - **V-73-WRAPPER-NEG** — Complementary negative invariant per Phase 72 V-72-WRAPPER-NEG precedent: count CHAIN-wrapper catch-blocks within `check-phase-{60..65}.mjs` (FIXED_FILES_RETRO_02 = [60, 61, 62, 63, 64, 65]) containing `err.stderr` but NO `err.stdout` → assert == 0 per file. Closes the 6 CHAIN wrapper fold-in surface.
  - **V-73-AUDIT-WRAPPER-NEG** — Complementary negative invariant for AUDIT-wrapper sites: count AUDIT-wrapper catch-blocks within `check-phase-{60, 61}.mjs` (AUDIT_FIXED_FILES = [60, 61]) containing `err.stderr` but NO `err.stdout` → assert == 0 per file. Closes the 2 AUDIT wrapper fold-in surface.
  - **V-73-CONVERT-NN** — Per-converted-assertion check (one per Plan 73-02 conversion): asserts that `check-phase-NN.mjs` (where NN is the converted file) contains the expected `readAtV{15,16,17}Close` import + replaces the previously HEAD-coupled `readFile` call. Grows in Plan 73-02 from the inventory-driven conversion set (~7-12 entries).
  - **V-73-AUDIT** — Heading-presence check on `73-VERIFICATION.md` post-Plan-73-03 landing (mirrors Phase 72 V-72-AUDIT-VERIFY); SKIP-PASS until Plan 73-03 lands.
  - **V-73-CHAIN** — Standard chain regression-guards for CHAIN_PHASES={48..72}; uses the NEW uniform CHAIN-wrapper stdout+stderr capture inherited from Phase 72 (`check-phase-73.mjs` authored with the fixed pattern from inception — self-dogfood per Phase 72 D-04 precedent).
  - **V-73-AUDIT-HARNESS + V-73-SELF** — Standard chain-apex topology per `check-phase-72.mjs` template; V-73-SELF asserts `CHAIN_PHASES` does NOT include 73 (D-22 auditor-independence).

- **73-VERIFICATION.md (Plan 73-03 close-gate)** — SC#1-4 satisfaction checklist; pre-RETRO-02-vs-post-RETRO-02 chain delta-diff witness proving 8 V-72-CHAIN-{61..67, 70} FAILs flip → PASS (count delta witnessable via `.claude/tmp/73-chain-pre.txt` vs `.claude/tmp/73-chain-post.txt`); per-validator conversion-record table (Section E — converted-files × converted-assertion IDs × frozen-SHA-tag); cross-reference to v1.8-DEFERRED-CLEANUP.md CHAIN-DEGRADED-AT-HEAD-01 STUB → CLOSED transition + 3 NEW stubs (HELPER-SPAWN-STDERR-01 + FROZEN-AWARE-ADOPTION-SWEEP-01 + EXEC-FAIL-DETAIL-EXTRACTION-01 per Phase 72 deferred-ideas hand-off + D-01 carve-out); Phase 74 entry-state readiness signal (HARNESS-07..12 + VPP-01 inheriting clean chain).

- **Traceability** — REQUIREMENTS.md RETRO-01 + RETRO-02 Pending→Complete + closing SHAs; STATE.md frontmatter progress (3/4 phases complete + 5/12 reqs validated → 4/4 phases approach + 7/12 reqs Validated) + Performance Metrics + Pending Todos updates; ROADMAP.md Phase 73 row Complete with closing SHA + Phase 74 entry-state note; PROJECT.md v1.8 requirement-count snapshot if applicable.

**Out of scope (Phase 73 owns nothing else):**

- The 3 helper-spawn stderr-only sites in `check-phase-{48, 60, 61}.mjs` — class-type carve-out per D-01 Option C refined; routed to v1.8-DEFERRED-CLEANUP.md `HELPER-SPAWN-STDERR-01` new STUB (finalized by Phase 74 HARNESS-12). Deterministic `--self-test` failure-mode + distinct slice-budget profile justify the class-type distinction.
- Refactor of existing inline helpers in `check-phase-{61, 67, 68, 70}.mjs` to consume `_lib/frozen-at-close.mjs` — D-02 strict-scope-discipline carve-out; routed to v1.8-DEFERRED-CLEANUP.md `FROZEN-AWARE-ADOPTION-SWEEP-01` new STUB (Phase 74 HARNESS-12 finalizes).
- `_lib/exec-fail-detail.mjs` helper extraction (Phase 72 D-01 deferred-idea hand-off) — routed to v1.8-DEFERRED-CLEANUP.md `EXEC-FAIL-DETAIL-EXTRACTION-01` new STUB. Phase 73 does NOT DRY the catch-block stdout+stderr capture pattern across all wrappers.
- v1.4 milestone-close-frozen-aware helpers — Phase 73 RETRO-01 may surface NO v1.4-close-state assertions in check-phase-{48..66}.mjs (v1.4 close was Phase 42, predating chain validators introduced at Phase 48). If RETRO-01 confirms zero v1.4 references, `MILESTONE_CLOSE_SHAS.V14` is OMITTED (TBD-style placeholder eliminated). If RETRO-01 surfaces v1.4-state references, plan-phase author empirically discovers v1.4-close SHA candidates (`b5cf529` / `671f72a` per D-02 advisor pre-scan).
- v1.8 audit harness lineage bump (HARNESS-07..12 + VPP-01) — Phase 74 Pillar D scope per `REQUIREMENTS.md:29-46`.
- HARNESS-09 per-phase validators `check-phase-{71..74}.mjs` Path-A copy + workflow YAML — Phase 74 Pillar D. Phase 73's `check-phase-73.mjs` ships as a validator-as-deliverable (per validator-as-deliverable pattern from v1.3+); Phase 74 HARNESS-09 inherits it for `check-phase-74.mjs` Path-A copy.
- SCOPE-GAP-class discoveries beyond the 7-12 RETRO-02 conversion candidates — `REQUIREMENTS.md:67` anti-ballooning guardrail routes any overflow to v1.9+ as `SCOPE-GAP-RETRO-02-OVERFLOW-01` new STUB.
- Any `docs/*` corpus edits — v1.8 is tooling-only milestone (`REQUIREMENTS.md` Out of Scope line 64).
- Modification to v1.4/v1.4.1/v1.5/v1.6/v1.7 workflow YAMLs + milestone-audit harness MJS + sidecar JSONs — predecessor-byte-unchanged invariant per `REQUIREMENTS.md:69` (chain validators `check-phase-{48..72}.mjs` are NOT in that invariant per Phase 68 / Phase 72 precedent).
- Worktree-based execution — `.planning/config.json:7` `use_worktrees:false` durable per memory `project_execphase_sequential.md`.
- New C-checks beyond v1.7 inheritance — v1.8 harness lineage bump (HARNESS-07) lands at Phase 74.

</domain>

<decisions>
## Implementation Decisions

All four gray areas resolved via 4 parallel `gsd-advisor-researcher` agents in adversarial-review mode (Finder argues FOR each option, Adversary argues AGAINST, Referee picks winner with score; lower = better) per user memory `feedback_adversarial_review_preference`. Each advisor read REQUIREMENTS / ROADMAP / STATE sections + `v1.7-DEFERRED-CLEANUP.md` + `v1.8-DEFERRED-CLEANUP.md` + `71-CONTEXT.md` + `72-CONTEXT.md` + `72-VERIFICATION.md` + `.claude/tmp/72-chain-post.txt` empirical witness + actual `scripts/validation/check-phase-*.mjs` source files. Scores below match Phase 72 convention (D-01 = 7 / D-02 = 4 / D-03 combined = 14 / D-04 = 1.5). All four recommendations user-approved without revision via single `Approve all 4 — proceed to CONTEXT.md` selection. **D-02 + D-04 merged on synthesis** — both advisors recommended the same `_lib/frozen-at-close.mjs` module landing site (D-02 for helpers, D-04 for `MILESTONE_CLOSE_SHAS` constants), so the deliverable is ONE module hosting BOTH surfaces.

### D-01: Wrapper fold-in boundary — Option C refined (8 CHAIN+AUDIT folds at RETRO-01 SHA; 3 helper-spawn route to v1.9+) (score **C=7** / A=9 / B=9 / D=10)

**Decision:** Fold the 8 CHAIN+AUDIT wrapper-stderr-only sites Phase 72 documented as "expected free passenger" (6 CHAIN in `check-phase-{60..65}.mjs` + 2 AUDIT in `check-phase-{60, 61}.mjs`) into Plan 73-01 RETRO-01 inventory landing SHA (atomic-within-plan commit alongside the inventory artifact). The 3 helper-spawn stderr-only sites at `check-phase-{48, 60, 61}.mjs` route to v1.8-DEFERRED-CLEANUP.md `HELPER-SPAWN-STDERR-01` new STUB for v1.9+ pickup (class-type carve-out: deterministic `--self-test` failure-mode + distinct slice-budget profile justify the distinction).

| File | Line | Wrapper class | Phase 73 disposition |
|------|------|---------------|----------------------|
| check-phase-60.mjs | 230 | CHAIN | **FIXED in Plan 73-01** |
| check-phase-61.mjs | 368 | CHAIN | **FIXED in Plan 73-01** |
| check-phase-62.mjs | 316 | CHAIN | **FIXED in Plan 73-01** |
| check-phase-63.mjs | 321 | CHAIN | **FIXED in Plan 73-01** |
| check-phase-64.mjs | 306 | CHAIN | **FIXED in Plan 73-01** |
| check-phase-65.mjs | 294 | CHAIN | **FIXED in Plan 73-01** |
| check-phase-60.mjs | 248 | AUDIT | **FIXED in Plan 73-01** |
| check-phase-61.mjs | 386 | AUDIT | **FIXED in Plan 73-01** |
| check-phase-48.mjs | 72 | Helper-spawn | **DEFERRED to v1.9+** (HELPER-SPAWN-STDERR-01) |
| check-phase-60.mjs | 188 | Helper-spawn | **DEFERRED to v1.9+** (HELPER-SPAWN-STDERR-01) |
| check-phase-61.mjs | 403 | Helper-spawn | **DEFERRED to v1.9+** (HELPER-SPAWN-STDERR-01) |

**Uniform fix pattern** (matches Phase 72 Plan 72-01 stdout+stderr capture at `check-phase-{66..71}.mjs`):

```javascript
} catch (err) {
  const stderr = err.stderr ? err.stderr.toString() : '';
  const stdout = err.stdout ? err.stdout.toString() : '';
  const isMissing = err.code === 'ENOENT' || err.status === 127
    || stderr.includes('not found') || stderr.includes('Could not resolve');
  if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
  return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + (stdout + stderr).slice(0, 500).trim() };
}
```

Slice budget 300 (matches AUDIT-wrapper precedent + Phase 72 propagation).

**Rationale (per advisor dossier `.claude/tmp/phase73-D01-advisor.md`):**

- **Adversarial wedge that decided it:** Phase 73 RETRO-01 inventory work must read source on ALL 19 `check-phase-{48..66}.mjs` files per `REQUIREMENTS.md:25` literal contract — so folding the 8 CHAIN+AUDIT wrapper fixes into the RETRO-01 inventory landing SHA honors Phase 72's "free passenger" framing literally; the 3 helper-spawn sites are shape-distinct (`--self-test` failure-mode + different slice-budget) so class-type carve-out to v1.9+ preserves REQUIREMENTS.md:67 strict-scope discipline.
- **Option A wedge (pure RETRO scope):** Defeats Phase 72 D-01 "expected free passenger" hand-off; leaves 11 stderr-only sites for v1.9+ pickup that should be naturally folded. Score 9.
- **Option B wedge (fold all 11 sites):** The 3 helper-spawn sites at `check-phase-48.mjs` (v1.5-era) + `check-phase-{60, 61}.mjs` helper-call surfaces have different topology from CHAIN/AUDIT wrappers — they spawn `regenerate-supervision-pins.mjs --self-test` (Plan 43-NN supervision helper) whose failure-mode is supervision-pin-drift-deterministic, not subprocess-output-formatting. Folding them risks slice-budget-tuning collision. Score 9.
- **Option D wedge (wave-order inversion):** Violates `REQUIREMENTS.md:25-27` numbering — RETRO-01 (scan) comes BEFORE RETRO-02 (conversion). REQ-numbering reflects execution order. Score 10.
- **The "files Phase 73 already opens" boundary inverts** for `check-phase-{62..65}.mjs` IF V-61-17 closure cascade-collapses (making those files non-RETRO-02 modification targets), but RETRO-01 inventory reading is contractually required on ALL 19 files — anchoring fold-in to RETRO-01 inventory SHA (not RETRO-02 conversion SHA) keeps wrapper-fixes free-passenger even under cascade-collapse.
- **Anti-precedent risk preserved:** `check-phase-48.mjs` v1.5-era ownership preserved (not touched in Phase 73); `check-phase-{60, 61}.mjs` helper-spawn site ownership also preserved per class-type discipline.

### D-02: Helper centralization — Option C (Centralize NEW helpers only; existing inline helpers untouched) (score **C=4** / A=6 / B=7 / D=5)

**Decision:** NEW `scripts/validation/_lib/frozen-at-close.mjs` module hosts Phase 73 RETRO-02 conversions (5-10 expected per D-03 advisor empirical scan). EXISTING inline helpers in `check-phase-{61, 67, 68, 70}.mjs` LEFT BYTE-UNCHANGED — refactor deferred to v1.9+ as `FROZEN-AWARE-ADOPTION-SWEEP-01` stub (Phase 74 HARNESS-12 finalizes the entry).

**Concrete module shape (drop-in for Plan 73-01 Wave 3):**

```javascript
// scripts/validation/_lib/frozen-at-close.mjs
//
// Centralized frozen-aware readers for chain validators (Phase 73 onward).
//
// HYBRID STATUS:
//   - NEW helpers (Phase 73 onward) consume readers from this module.
//   - EXISTING inline helpers in check-phase-{61, 67, 68, 70}.mjs REMAIN INLINE.
//     Refactor deferred to v1.9+ as FROZEN-AWARE-ADOPTION-SWEEP-01 per
//     `.planning/milestones/v1.8-DEFERRED-CLEANUP.md` (Phase 74 HARNESS-12 finalizes).
//
// Lineage: parallel to inline readRequirementsAtV15Close() introduced
// Plan 68-03 Task 1 commit d7d7d5f + readCorpusFileAtV17Close() introduced
// Plan 70-02 Atom 1 commit 26a1ae9; centralized per D-02 LOCKED Option C.

import { execFileSync } from 'node:child_process';

export const MILESTONE_CLOSE_SHAS = {
  V141: '5c976ec',  // Phase 47 close 2026-04-25 (D-04 advisor empirical discovery)
  V15:  'ba2cbc0',  // Phase 61 close — canonical (matches inline helper in check-phase-61.mjs:40)
  V16:  '9d8877c',  // Phase 66 close 2026-05-25 (D-04 advisor empirical discovery; v1.6 has NO git tag)
  V17:  'aa6de68',  // Phase 70 Plan 70-02 Atom 1 — canonical (matches inline helpers in check-phase-67/68/70.mjs)
  // V14 omitted — RETRO-01 must surface a v1.4-close-state assertion in check-phase-{48..66}.mjs
  // before adding (v1.4 close was Phase 42, predating chain validators).
  // Candidates if needed: b5cf529 or 671f72a (D-02 advisor pre-scan).
};

/**
 * Read a file at a frozen milestone-close SHA via `git show <SHA>:<path>`.
 * Hardened signature (v1.7-family pattern): explicit stdio, CRLF normalization.
 *
 * @param {keyof MILESTONE_CLOSE_SHAS} milestoneTag — e.g., 'V15', 'V16', 'V17', 'V141'
 * @param {string} relPath — repo-relative path (e.g., '.planning/REQUIREMENTS.md')
 * @returns {string} file contents at frozen SHA, LF line endings
 * @throws if milestoneTag missing or git show fails
 */
export function readAtClose(milestoneTag, relPath) {
  const sha = MILESTONE_CLOSE_SHAS[milestoneTag];
  if (!sha) throw new Error(`No frozen SHA for milestone ${milestoneTag}`);
  return execFileSync('git', ['show', sha + ':' + relPath], {
    encoding: 'utf8',
    timeout: 10000,
    stdio: ['ignore', 'pipe', 'pipe'],
  }).replace(/\r\n/g, '\n');
}

// Convenience exports for readability at call-sites
export const readAtV141Close = (p) => readAtClose('V141', p);
export const readAtV15Close  = (p) => readAtClose('V15',  p);
export const readAtV16Close  = (p) => readAtClose('V16',  p);
export const readAtV17Close  = (p) => readAtClose('V17',  p);
```

**Rationale (per advisor dossier `.claude/tmp/phase73-D02-advisor.md`):**

- **Adversarial wedge that decided it:** Does Phase 73 RETRO-02 produce ENOUGH new frozen-aware helpers to justify `_lib` extraction (5-10 expected per 8-FAIL inventory floor), AND does extraction count as in-scope vs sweep-creep? Strict-scope-discipline interpretation of `REQUIREMENTS.md:67` routes existing-helper refactor to v1.9+, which makes Option C dominate Option B by ducking the SCOPE-GAP-class debate.
- **Option A wedge (per-file inline):** 4 sites already duplicate `readCorpusFileAtV17Close` byte-identically; Phase 73 would extend duplication to 7-10+ sites. Status-quo bias-only justification. Score 6.
- **Option B wedge (centralize ALL):** REFACTOR of existing inline helpers in check-phase-{61, 67, 68, 70}.mjs is sweep-scope; chain validators ARE exempt from byte-unchanged invariant per `REQUIREMENTS.md:69` carve-out, but the refactor still feels like SCOPE-GAP-class expansion. Score 7.
- **Option D wedge (SHA-registry only):** Half-measure — helpers stay duplicated; deduplication win is only on SHA literals (not on `execFileSync` invocation + CRLF normalization + stdio hardening). D-04 Option B preferred merge with D-02 Option C makes this Option D redundant. Score 5.
- **Empirical evidence supporting Option C:** 3× verbatim duplication confirmed across check-phase-{67, 68, 70}.mjs `readCorpusFileAtV17Close`. 13 inline helpers across 4 files at HEAD. 108 SHA-literal instances total (most are user-facing assertion-detail strings that centralization will NOT remove — the 8-30 SHA-pinned-helper duplication is the productive win surface).
- **Helper-signature drift documented:** v1.5-family helpers (check-phase-61.mjs:40-62) LACK `stdio: ['ignore', 'pipe', 'pipe']`; v1.7-family helpers HAVE it. The new `_lib` module adopts hardened v1.7-family signature; existing inline helpers preserve their original signatures (refactor-to-hardened deferred to v1.9+ adoption sweep).

### D-03: Inventory artifact shape + plan layout — A-md + B-3 (markdown inventory + 3-plan split) (combined score **14** = A-md 8 + B-3 6)

**Decision Dimension A (Inventory shape):** A-md (committed markdown artifact at `.planning/phases/73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md`) — per-validator class-signature table for all 19 validators with columns: validator-name; HEAD-coupled-assertion-IDs; citation-evidence-from-docstring; conversion-target-SHA; disposition. Matches Phase 72 Section E Per-Validator Audit Inventory precedent (scaled from 17 to 19 sites). NO standalone `.mjs` scan tool.

**Decision Dimension B (Plan layout):** B-3 (3-plan split) — mirrors Phase 71 D-04 LOCKED 3-plan precedent + honors Phase 72 D-03 requirement-count-delta scaling (Phase 71: 2 reqs / 3 plans → Phase 72: 1 req / 2 plans → Phase 73: 2 reqs / 3 plans). Lands at `STATE.md:139` "2-4" midpoint.

```
Plan 73-01 (ATOMIC commit — RETRO-01 inventory + 8 wrapper folds + _lib module + check-phase-73 stub)
  Wave 1: Class-wide scan of check-phase-{48..66}.mjs (19 validators) for HEAD-coupled assertions.
    Empirical heuristic: grep for `readFile(` + cross-reference to docstrings citing
    milestone-close state ("v1.5 close", "v1.6 close", "Plan NN-NN", "post-Plan-NN-NN", etc.).
    Output: per-validator class-signature table → 73-RETRO-INVENTORY.md
  Wave 2: Apply uniform CHAIN+AUDIT wrapper fix at 8 sites (D-01 fix snippet propagation):
    - check-phase-60.mjs:230 (CHAIN) + check-phase-60.mjs:248 (AUDIT)
    - check-phase-61.mjs:368 (CHAIN) + check-phase-61.mjs:386 (AUDIT)
    - check-phase-62.mjs:316 (CHAIN)
    - check-phase-63.mjs:321 (CHAIN)
    - check-phase-64.mjs:306 (CHAIN)
    - check-phase-65.mjs:294 (CHAIN)
  Wave 3: Author scripts/validation/_lib/frozen-at-close.mjs (D-02 + D-04 merged module).
    MILESTONE_CLOSE_SHAS + readAtClose() + 4 convenience exports.
  Wave 4: Author scripts/validation/check-phase-73.mjs (Path-A from check-phase-72.mjs).
    - CHAIN_PHASES = [48..72]; CHAIN_SKIP = new Set([])
    - Self-dogfood: NEW check-phase-73.mjs CHAIN wrapper authored with stdout+stderr from inception
    - V-73-INVENTORY + V-73-LIB-EXISTS + V-73-WRAPPER-NEG + V-73-AUDIT-WRAPPER-NEG + V-73-AUDIT + V-73-CHAIN + V-73-AUDIT-HARNESS + V-73-SELF
  Wave 5: Pre-commit dry-run:
    - node scripts/validation/check-phase-73.mjs (expect V-73-INVENTORY + V-73-LIB-EXISTS + V-73-WRAPPER-NEG + V-73-AUDIT-WRAPPER-NEG PASS; V-73-CHAIN-{61..67,70} still expected FAIL per D-03 documented-residual until Plan 73-02 conversion lands)
    - Predecessor-byte-unchanged check: git diff Plan-72-02-SHA HEAD -- <v1.4/v1.4.1/v1.5/v1.6/v1.7 frozen surfaces> returns EMPTY
  Wave 6: Capture pre-RETRO-02 chain witness:
    - node scripts/validation/check-phase-73.mjs > .claude/tmp/73-chain-pre.txt 2>&1
      (records V-72-CHAIN-{61..67,70} FAIL state at Plan 73-01 SHA — defining the delta-witness target for Plan 73-02)
  ATOMIC commit (~10-12 files in ONE SHA per Phase 67 Plan 67-02 / Phase 72 Plan 72-01 7-file precedent scaled):
    feat(73-01): RETRO-01 inventory + 8 wrapper folds + _lib/frozen-at-close + check-phase-73 stub (atomic SC#1 + SC#4)

Plan 73-02 (ATOMIC commit — RETRO-02 per-validator HEAD-coupled assertion conversion)
  Wave 1: Per-converted-file conversion (~7-12 files in scope):
    - check-phase-{53?, 54?, 56?, 58?, 60, 61, 62, 63, 64, 65, 66}.mjs — convert each
      HEAD-coupled assertion to consume readAtV{15,16,17}Close from _lib/frozen-at-close.mjs.
    - Check-name suffixing `[v1.X-frozen @ <SHA>]` per check-phase-61.mjs:78 precedent.
    - Inventory-driven (Plan 73-01 RETRO-INVENTORY.md as source-of-truth)
  Wave 2: Grow check-phase-73.mjs V-73-CONVERT-NN assertions
    (one per converted assertion; ~7-12 entries; each asserts the import + replacement pattern)
  Wave 3: Pre-commit chain re-run:
    - node scripts/validation/check-phase-73.mjs > .claude/tmp/73-chain-post.txt 2>&1
      (expect: 8 V-72-CHAIN-{61..67,70} FAILs FLIPPED → PASS; V-73-CONVERT-NN PASS; chain-apex 0 FAIL)
  Wave 4: Predecessor-byte-unchanged check + v1.7-milestone-audit.mjs subprocess re-run (15/15 PASS unchanged invariant)
  ATOMIC commit (~7-12 files + check-phase-73.mjs grow in ONE SHA per SC#4 byte-exact):
    fix(73-02): RETRO-02 per-validator HEAD-coupled assertion conversion to frozen-aware (atomic SC#4)

Plan 73-03 (close-gate — 73-VERIFICATION.md + traceability flips + DEFERRED-CLEANUP updates)
  Wave 1: Full chain re-run check-phase-{48..73}.mjs (final witness for SC#3)
  Wave 2: v1.7-milestone-audit.mjs → 15/15 PASS unchanged (predecessor-byte-unchanged invariant)
  Wave 3: Author 73-VERIFICATION.md:
    - Section A: Phase 73 Goal achievement narrative
    - Section B: Commands evidence + chain re-run outputs (pre-Plan-73-02 delta-diff witness)
    - Section C: SC#1-4 satisfaction
    - Section D: Atomic Plan 73-01 + 73-02 SHAs recorded byte-exact (SC#4 compliance for both)
    - Section E: Per-validator conversion-record table (~7-12 entries from RETRO-02)
    - Section F: Discoveries (any new HEAD-coupled assertion classes; SCOPE-GAP-RETRO-02-OVERFLOW-01 stub if surfaced)
    - Section G: Phase 74 entry-state readiness signal (HARNESS-07..12 inheriting clean chain + _lib precedent)
    - Section H: Sign-off
  Wave 4: Update v1.8-DEFERRED-CLEANUP.md:
    - CHAIN-DEGRADED-AT-HEAD-01: STUB → CLOSED (status transition + Phase 73 closing SHA reference)
    - HELPER-SPAWN-STDERR-01 NEW STUB (3 sites at check-phase-{48, 60, 61}.mjs helper-spawn class; routed to v1.9+ per D-01 carve-out)
    - FROZEN-AWARE-ADOPTION-SWEEP-01 NEW STUB (existing inline helper refactor to _lib consumption; routed to v1.9+ per D-02 carve-out)
    - EXEC-FAIL-DETAIL-EXTRACTION-01 NEW STUB (Phase 72 D-01 deferred-idea hand-off; DRY catch-block stdout+stderr capture across all wrappers; routed to v1.9+)
    - Optional: SCOPE-GAP-RETRO-02-OVERFLOW-01 NEW STUB (only if RETRO-01 surfaced overflow per REQUIREMENTS.md:67 guardrail)
  Wave 5: Traceability — REQUIREMENTS.md RETRO-01 + RETRO-02 Pending→Complete + closing SHAs (Plan 73-01 atomic + Plan 73-02 atomic + Plan 73-03 close-gate SHA); STATE.md frontmatter + Performance Metrics + Pending Todos; ROADMAP.md Phase 73 row Complete + Phase 74 entry-state note
  Commit:
    docs(73-03): Phase 73 close-gate — 73-VERIFICATION.md + traceability flips + v1.8-DEFERRED-CLEANUP transitions
```

**Total commits:** 3. Atomic for Plans 73-01 + 73-02 per SC#4 byte-exact contract; traceability + verification narrative isolated in Plan 73-03 (bisect-clean per Phase 67 / 71 / 72 D-03 convention).

**Rationale (per advisor dossier `.claude/tmp/phase73-D03-advisor.md`):**

- **Adversarial wedge that decided it:** v1.8 is closure-not-expansion + SC#1 inventory-precedence requires per-REQ atomic split. A-mjs (re-runnable scan tool) adds NEW tooling to close OLD tooling debt, violating SC#4 anti-ballooning. Phase 72 Section E per-validator markdown-inventory precedent is freshest and directly applicable. B-1/B-2 collapse inventory into conversion SHA → violate SC#1 "inventory is a committed artifact" literal read.
- **B-4 wedge (4-plan split with conversion-waves):** Over-decomposes a 2-REQ phase; sequential-on-main-tree (`use_worktrees:false`) kills parallelism benefit. 19-validator scope is small enough that wave-splitting is overhead, not insurance. Score B-4=12.
- **B-2 wedge (2-plan):** Compresses past Phase 72 D-03 requirement-count-delta scaling (Phase 72: 1 req → 2 plans; Phase 73: 2 reqs → 3 plans by linear extrapolation). Score B-2=11.
- **B-1 wedge (1 atomic monster + close-gate):** Cargo-cults Phase 71/72 atomic-of-single-deliverable; collapses RETRO-01 inventory into conversion SHA. Score B-1=16.
- **A-mjs / A-both wedge:** Build-tool overhead for a one-shot retrospective; markdown artifact suffices per Phase 72 precedent. A-mjs=14, A-both=18.

### D-04: SHA-pin convention — Option B (Named-constants module — MERGED with D-02 Option C `_lib/frozen-at-close.mjs`) (score **B=1.5** / A=3.5 / C=4.5 REJECTED / D=2.5)

**Decision:** `MILESTONE_CLOSE_SHAS` constants live in `scripts/validation/_lib/frozen-at-close.mjs` alongside the readers (D-02 Option C merge). NOT a separate `_lib/milestone-close-shas.mjs` module — single-file landing reduces overhead.

**Empirical close-SHAs discovered (deliverable side-effect per D-04 advisor `git log` verification):**

| Milestone | Close SHA | Source / verification |
|---|---|---|
| **v1.4.1** | `5c976ec` | `feat(47-03): PROJECT.md traceability closure` 2026-04-25 (Phase 47 close) |
| **v1.5** | `ba2cbc0` | Phase 61 close — CANONICAL (matches inline helper in `check-phase-61.mjs:40`) |
| **v1.6** | `9d8877c` | `docs(v1.6): milestone close traceability 4-doc flip` 2026-05-25 11:13:19 (Phase 66 close; **v1.6 has NO git tag** — only milestone v1.4..v1.7 without one) |
| **v1.7** | `aa6de68` | Phase 70 Plan 70-02 Atom 1 — CANONICAL (matches inline helpers in `check-phase-67/68/70.mjs`; project convention is helper-authoring SHA NOT true close-gate `4df3a16` per Plan 70-05 substitution) |

**Rationale (per advisor dossier `.claude/tmp/phase73-D04-advisor.md`):**

- **Adversarial wedge that decided it:** At ≥10 SHA-pinned helpers (D-02 advisor's 8-FAIL inventory floor + 19-validator RETRO-02 scope), duplication cost of inline literals (Option A) overwhelms the new-module cost of constants centralization (Option B); Option C (git tags) REJECTED — v1.6 has NO git tag AND tag-SHAs diverge from helper-authoring SHAs (v1.5 tag `53cf475` ≠ helper `ba2cbc0`; v1.7 tag `45d4afe` ≠ helper `aa6de68`) which would FAIL existing v1.5/v1.7 assertions on a SHA-content shift, plus tag-mutation risk and a 2nd fetch-tags CI surface compounding FETCH-DEPTH-01.
- **Option A wedge (inline literals):** Zero-change-from-precedent benefit; but Phase 73 adds 5-10 new helper-authoring sites that would each carry their own SHA literal. SHA-literal duplication count would grow from current 13 sites to 20-30+. Score 3.5.
- **Option C wedge (git tags) CRITICAL REJECTION:** v1.6 has NO git tag (Phase 73 would need to create one) → constraint addition. v1.5 tag `53cf475` ≠ helper `ba2cbc0` and v1.7 tag `45d4afe` ≠ helper `aa6de68` → using git tags would FAIL existing v1.5/v1.7 assertions on next chain run (SHA-content-shift breaks the assertion content match). Plus `with: fetch-tags: true` would add a 2nd FETCH-DEPTH-01-class CI compounding surface on `linux-chain-ubuntu-latest` (per `v1.7-DEFERRED-CLEANUP.md:88-106` precedent). Score 4.5 REJECTED.
- **Option D wedge (sidecar JSON):** Adds new artifact class to maintain; JSON-parse-on-import overhead; SC#4 atomic-commit pattern requires careful coordination. Score 2.5 — close, but Option B's named-constants in-source pattern beats sidecar-import overhead at this scale.
- **CI inheritance preserved:** HARNESS-10 (Phase 74) preserves `fetch-depth: 0` on `linux-chain-ubuntu-latest` checkout per FETCH-DEPTH-01 inheritance; NO `fetch-tags: true` needed (Option C rejected).

### Claude's Discretion

- **RETRO-01 inventory column headers + row schema** — Plan 73-01 plan-phase author finalizes (`73-RETRO-INVENTORY.md` shape); recommended schema documented in domain section above. May add additional columns (e.g., "convertibility risk" / "frozen-SHA confidence") if Phase 73 plan-phase advisor surfaces useful granularity.
- **Whether `check-phase-73.mjs` V-73-CONVERT-NN grows incrementally during Plan 73-02 RETRO-02 or is authored monolithically in Plan 73-01 Wave 4** — Recommend Plan 73-01 ships V-73-CONVERT-* as a stub-array placeholder + Plan 73-02 grows the array as conversions land (incremental discovery; matches Phase 72 V-72-WRAPPER-NEG empirical grep-driven pattern).
- **Whether to include V14 (`b5cf529` / `671f72a` candidates) in `MILESTONE_CLOSE_SHAS`** — Conditional: include only if RETRO-01 surfaces a v1.4-close-state assertion in `check-phase-{48..66}.mjs`. Default OMIT (Phase 73 plan-phase author empirically confirms during inventory scan; v1.4 close was Phase 42, predating chain validators introduced at Phase 48 — likely zero v1.4-state references).
- **`SCOPE-GAP-RETRO-02-OVERFLOW-01` STUB authoring trigger** — If Plan 73-01 RETRO-01 inventory surfaces >12 conversion candidates (above the D-03 advisor 7-12 estimate), Plan 73-03 close-gate authors the stub per `REQUIREMENTS.md:67` anti-ballooning guardrail. Plan-phase author decides the empirical threshold (recommend 12 as the trip-line).
- **Whether the `_lib/frozen-at-close.mjs` module hosts an additional `readSidecarAtClose(milestoneTag)` convenience for sidecar JSON paths** — Plan 73-02 author decides based on actual RETRO-02 conversion needs (current sidecar reads exist in `check-phase-67.mjs:50-55` for `readSidecarAtV17Close()` which is JSON-parsed-on-load; if RETRO-02 needs to convert assertions citing v1.6 sidecar `v1.6-audit-allowlist.json`, the convenience may add a `JSON.parse` wrapper for callers).
- **Per-validator V-NN-NN naming convention for converted assertions** — Recommend preserve existing IDs + suffix with `[v1.X-frozen @ <SHA>]` per existing inline-helper precedent at `check-phase-61.mjs:78` / `check-phase-67.mjs:73`. Plan 73-02 author preserves backward-compat naming so V-71-CHAIN-NN cascade-references remain stable.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 73 contract docs
- `.planning/REQUIREMENTS.md` lines 23-27 — RETRO-01 + RETRO-02 contract + SC#1 inventory-as-committed-artifact literal + SC#2 conversion via SHA-pinned helpers + scope-discipline guardrail
- `.planning/REQUIREMENTS.md` lines 67-69 — anti-ballooning + predecessor-byte-unchanged invariant (chain validators NOT in invariant — Phase 73 modifies check-phase-{60..65}.mjs per D-01 carve-out)
- `.planning/ROADMAP.md` lines 348-358 — Phase 73 Goal + SC#1-4 (SC#1 "inventory is a committed artifact" + SC#3 "chain exits 0 after conversions" + SC#4 scope-discipline guardrail)
- `.planning/STATE.md` lines 77-142 — v1.8 phase dependency summary + Wave designation map ("Wave C sequential after Wave A — may overlap with Wave B") + requirement coverage table (Phase 73 plan estimate "2-4")
- `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` lines 52-66 — HARNESS-FORWARD-01 retrospective scope contract
- `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` lines 110-131 — SCOPE-GAP-61 retrospective recommendation + class-signature documentation (`readRequirementsAtV15Close()` precedent)
- `.planning/milestones/v1.8-DEFERRED-CLEANUP.md` lines 56-101 — CHAIN-DEGRADED-AT-HEAD-01 (status PARTIALLY-RESOLVED-EMPIRICAL-BASELINE-CAPTURED; per-validator root cause table + Phase 73 closes contract)

### Phase 72 precedent + entry-state signals
- `.planning/phases/72-chain-wrapper-hardening-pillar-b/72-CONTEXT.md` D-01 lines 62-108 — wrapper-fix scope ownership boundary precedent (Phase 72 fixed 6 CHAIN at check-phase-{66..71}.mjs; Phase 73 inherits the documented 11 remaining sites — 8 fold-in + 3 carve-out per D-01)
- `.planning/phases/72-chain-wrapper-hardening-pillar-b/72-CONTEXT.md` D-03 lines 137-181 — 2-plan split precedent (Phase 71: 2 reqs → 3 plans; Phase 72: 1 req → 2 plans; Phase 73: 2 reqs → 3 plans by linear extrapolation per D-03)
- `.planning/phases/72-chain-wrapper-hardening-pillar-b/72-CONTEXT.md` D-04 lines 193-279 — source-text regex anchored to topology marker precedent (Phase 73 V-73-WRAPPER-NEG inherits)
- `.planning/phases/72-chain-wrapper-hardening-pillar-b/72-VERIFICATION.md` (if exists) Section E Per-Validator Audit Inventory — Phase 73 inventory shape precedent (A-md format markdown table)
- `.claude/tmp/72-chain-post.txt` — Phase 72 close-gate empirical witness (8 V-72-CHAIN-{61..67, 70} FAIL detail strings; RETRO-01 inventory signature data)

### Phase 71 precedent (3-plan split scaling)
- `.planning/phases/71-archive-automation-root-cause-fix-pillar-a/71-CONTEXT.md` D-04 lines 136-188 — 3-plan precedent (Plan 71-01 atomic + Plan 71-02 sweep + Plan 71-03 close-gate); Phase 73 D-03 B-3 inherits this exact shape

### Existing frozen-aware helper implementations (READ BEFORE AUTHORING `_lib/frozen-at-close.mjs`)
- `scripts/validation/check-phase-61.mjs` lines 38-62 — `readRequirementsAtV15Close()` + `readRoadmapAtV15Close()` (v1.5-family inline; v1.5-frozen helpers signature differs — LACKS `stdio: ['ignore', 'pipe', 'pipe']` — preserve as-is per D-02 carve-out)
- `scripts/validation/check-phase-67.mjs` lines 35-55 — `readCorpusFileAtV17Close()` + `readSidecarAtV17Close()` (v1.7-family inline; HARDENED signature with explicit stdio — `_lib/frozen-at-close.mjs` adopts this pattern)
- `scripts/validation/check-phase-68.mjs` lines 35-50 — `readCorpusFileAtV17Close()` (3rd duplication site; byte-identical to check-phase-67.mjs)
- `scripts/validation/check-phase-70.mjs` lines 40-80 — `readCorpusFileAtV17Close()` + `readMilestoneAuditAtV17Close()` + `readDeferredCleanupAtV17Close()` + `readRequirementsAtV17Close()` (4-helper expansion; 4 v1.7-frozen SHA literals)

### Phase 68 `_lib` precedent (Phase 73 architectural rhyme)
- `scripts/validation/_lib/archive-path.mjs` — Phase 68 Plan 68-04 `cdcce23` deletion / Plan 68-NN extraction precedent. Read to confirm the 30-LOC module pattern + 5 importers (check-phase-{31, 48, 60, 62, 63}.mjs). Phase 73's `_lib/frozen-at-close.mjs` mirrors this architectural pattern.

### Fix targets — wrapper fold-in (Plan 73-01 Wave 2)
- `scripts/validation/check-phase-60.mjs` line 230 (CHAIN) + line 248 (AUDIT) — Phase 73 fold-in
- `scripts/validation/check-phase-61.mjs` line 368 (CHAIN) + line 386 (AUDIT) — Phase 73 fold-in
- `scripts/validation/check-phase-62.mjs` line 316 (CHAIN) — Phase 73 fold-in
- `scripts/validation/check-phase-63.mjs` line 321 (CHAIN) — Phase 73 fold-in
- `scripts/validation/check-phase-64.mjs` line 306 (CHAIN) — Phase 73 fold-in
- `scripts/validation/check-phase-65.mjs` line 294 (CHAIN) — Phase 73 fold-in
- **Carved out** to v1.9+ (HELPER-SPAWN-STDERR-01): `check-phase-48.mjs:72` + `check-phase-60.mjs:188` + `check-phase-61.mjs:403` helper-spawn sites

### check-phase-73.mjs Path-A source (READ BEFORE AUTHORING)
- `scripts/validation/check-phase-72.mjs` — Phase 72 Plan 72-01 SHA `d374095`. CHAIN_PHASES Set, CHAIN_SKIP empty-Set invariant, V-72-WRAPPER-NEG complementary negative invariant pattern (V-73-WRAPPER-NEG + V-73-AUDIT-WRAPPER-NEG inherit), V-72-AUDIT-VERIFY heading-presence pattern (V-73-AUDIT inherits), V-72-CHAIN wrapper topology (already-uniform stdout+stderr capture per Phase 72 self-dogfood), V-72-SELF guard (no self-reference; D-22 auditor-independence).

### Atomic-commit precedents (READ FOR PLAN 73-01 + 73-02 PATTERNS)
- Phase 72 Plan 72-01 commit `d374095` — 7-file atomic-within-plan commit (Phase 73 Plan 73-01 closest precedent — 10-12 files atomic)
- Phase 71 Plan 71-01 commit `e4887b2` — 3-file atomic ARCHIVE-01 fix + regression fixture
- Phase 70 Plan 70-02 commit `26a1ae9` — 3-file atomic harness commit
- Phase 67 Plan 67-02 commit `55260b3` — 5-file atomic-within-plan commit
- Phase 68 Plan 68-03 commit `7b635ca` — 5-file CHAIN_SKIP atomic removal (cross-validator atomic write)

### Anti-regression / scope-discipline precedents
- `.planning/REQUIREMENTS.md` lines 67-69 — anti-ballooning guardrail (Phase 73 owns RETRO-01 + RETRO-02 + 8 wrapper folds via D-01 fold-in; SCOPE-GAP-class discoveries route to v1.9+) + predecessor-byte-unchanged invariant (chain validators check-phase-{48..72}.mjs NOT in invariant per Phase 68/72 precedent)
- `.planning/STATE.md` lines 128-130 — Wave C sequential after Wave A — may overlap with Wave B (Phase 72 already CLOSED; Phase 73 has clean entry)
- `.planning/config.json` line 7 — `use_worktrees: false` durable per memory `project_execphase_sequential.md`

### Advisor dossiers (for planner deep-dive)
- `.claude/tmp/phase73-D01-advisor.md` (321 lines / 31.6 KB) — D-01 full dossier (Option C refined ownership boundary + class-type carve-out for helper-spawn + drop-in CHAIN+AUDIT pseudocode + drop-in HELPER-SPAWN-STDERR-01 stub spec)
- `.claude/tmp/phase73-D02-advisor.md` (condensed dossier from inline advisor return) — D-02 full dossier (Option C centralize-new-only + 3× verbatim duplication empirical evidence + helper-signature-drift documentation + `_lib/frozen-at-close.mjs` drop-in module spec)
- `.claude/tmp/phase73-D03-advisor.md` (340 lines / 31.6 KB) — D-03 full dossier (A-md + B-3 combined + Phase 71 D-04 inheritance + requirement-count-delta scaling + B-2/B-4/B-1 wedge analysis + RETRO-02 7-12 conversion scope empirical estimate)
- `.claude/tmp/phase73-D04-advisor.md` (292 lines / 21.4 KB) — D-04 full dossier (Option B named-constants module + D-02 merge synthesis + Option C git-tags critical rejection + empirical close-SHA discovery v1.4.1=5c976ec / v1.6=9d8877c)

### Optional cross-references (not load-bearing for plan)
- `.planning/milestones/v1.5-MILESTONE-AUDIT.md` — v1.5 close documentation (confirms `ba2cbc0` canonical helper-authoring SHA)
- `.planning/milestones/v1.6-MILESTONE-AUDIT.md` — v1.6 close documentation (confirms Phase 66-05 close + helper-authoring SHA `9d8877c`)
- `.planning/milestones/v1.7-MILESTONE-AUDIT.md` — v1.7 close documentation (Phase 70 Plan 70-02 Atom 1 `26a1ae9` + Plan 70-05 substitution to `aa6de68`)
- `.planning/phases/47-integration-re-audit/` (Phase 47 close artifacts) — v1.4.1 close confirms `5c976ec` SHA
- `.github/workflows/audit-harness-v1.7-integrity.yml` — `fetch-depth: 0` on linux-chain-ubuntu-latest job (Phase 73 NO modification per predecessor-byte-unchanged invariant; Phase 74 HARNESS-10 inherits)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- **Path-A validator template** — `scripts/validation/check-phase-72.mjs` (Phase 72 Plan 72-01 SHA `d374095`). Lines establish: imports (readFileSync, existsSync, execFileSync, join, process), `readFile()` helper with CRLF normalization (`check-phase-48.mjs:25` lineage), CHAIN_PHASES Set, CHAIN_SKIP empty-Set invariant (Phase 68 `7b635ca`), V-72-CHAIN wrapper topology (already-uniform stdout+stderr capture per Phase 72 self-dogfood — Phase 73 inherits the fixed pattern from inception), V-72-WRAPPER-NEG complementary negative invariant pattern (V-73-WRAPPER-NEG + V-73-AUDIT-WRAPPER-NEG inherit), V-72-AUDIT-VERIFY heading-presence pattern (V-73-INVENTORY + V-73-AUDIT inherit), V-72-SELF guard.
- **v1.7-family hardened helper signature** — `scripts/validation/check-phase-67.mjs:35-55` + `check-phase-68.mjs:45-50` + `check-phase-70.mjs:40-80`. `execFileSync('git', ['show', SHA + ':' + path], { encoding: 'utf8', timeout: 10000, stdio: ['ignore', 'pipe', 'pipe'] }).replace(/\r\n/g, '\n')`. `_lib/frozen-at-close.mjs` adopts this signature verbatim.
- **v1.5-family inline helper precedent** — `scripts/validation/check-phase-61.mjs:38-62` — `readRequirementsAtV15Close()` + `readRoadmapAtV15Close()`. Use-pattern at lines 85-166 (e.g., `const c = readRequirementsAtV15Close()` + assertion against `c`). Phase 73 RETRO-02 converted assertions adopt same use-pattern but consume from `_lib/frozen-at-close.mjs` imports.
- **Phase 68 `_lib` extraction precedent** — `scripts/validation/_lib/archive-path.mjs` introduced via Plan 68-04 surgical deletion `cdcce23` + extraction. 30-LOC module + 5 importer call-sites. Phase 73's `_lib/frozen-at-close.mjs` mirrors this architectural rhyme (~80 LOC module + 5-10 importer call-sites).
- **`readFile()` CRLF-normalization idiom** — `check-phase-48.mjs:25` + `check-phase-60.mjs:24` + `regenerate-supervision-pins.mjs:77`. `check-phase-73.mjs` inherits verbatim.
- **Atomic-within-plan pattern** — Phase 67 Plan 67-02 `55260b3` (5 files in ONE SHA) + Phase 71 Plan 71-01 `e4887b2` (3 files in ONE SHA) + Phase 72 Plan 72-01 `d374095` (7 files in ONE SHA). Plan 73-01 scales to ~10-12 files: 8 wrapper edits (`check-phase-{60..65}.mjs` CHAIN + `check-phase-{60, 61}.mjs` AUDIT) + 1 NEW `_lib/frozen-at-close.mjs` + 1 NEW `check-phase-73.mjs` + 1 NEW `73-RETRO-INVENTORY.md`. Plan 73-02 scales to ~7-12 files: per-validator RETRO-02 conversion + check-phase-73.mjs V-73-CONVERT-NN grow.
- **Per-plan close-gate pattern** — Plan 72-02 / Plan 71-03 / Plan 70-05 Commit B / Plan 69-02 / Plan 68-05 all follow same close-gate shape (chain re-run + VERIFICATION.md + traceability flips across PROJECT/REQUIREMENTS/STATE/ROADMAP). Plan 73-03 inherits with pre-RETRO-02-vs-post-RETRO-02 chain delta-diff witness per Phase 72 D-02 Option B precedent.

### Established Patterns

- **CHAIN_SKIP empty-Set invariant** — Permanent post-Phase 68 `7b635ca`. `check-phase-73.mjs` MUST declare `CHAIN_SKIP = new Set([])` (V-73-SELF assertion enforces).
- **CHAIN_PHASES exclusion of validator's own phase** — `check-phase-73.mjs` CHAIN_PHASES = {48..72} (does NOT include 73). V-73-SELF guard mirror of `check-phase-72.mjs` V-72-SELF.
- **Uniform wrapper pattern (CHAIN ≡ AUDIT capture shape)** — Post-Phase-73-Plan-73-01-Wave-2, both CHAIN and AUDIT subprocess catch blocks across `check-phase-{60..73}.mjs` use the same `(stdout + stderr).slice(0, 500).trim()` shape (slice budget 500 per RESEARCH.md Pattern 4 empirical correction from Phase 72; AUDIT-HARNESS catch block budget remains 300 per `check-phase-72.mjs:332` precedent). Phase 73 closes the wrapper-class signature surface for the 8 sites Phase 72 D-01 carved out as "free passenger" (excludes the 3 helper-spawn sites per D-01 carve-out).
- **Source-text regex anchored to topology marker (NOT byte-exact equality)** — Phase 71 V-71-FIX-01 + Phase 72 V-72-WRAPPER-01..06 established this pattern. Phase 73 V-73-WRAPPER-NEG + V-73-AUDIT-WRAPPER-NEG inherit: anchor on `execFileSync('node', [path], ...)` or `execFileSync('node', [auditPath], ...)` topology marker + 600-char catch-block window + presence/absence token checks.
- **Complementary negative invariant for whole-file class signature** — V-73-WRAPPER-NEG (FIXED_FILES_RETRO_02 = [60..65]) + V-73-AUDIT-WRAPPER-NEG (AUDIT_FIXED_FILES = [60, 61]). Counts stderr-only catch blocks within respective wrapper-window across files → asserts == 0. Closes the wrapper-fold-in class signature per Phase 72 V-72-WRAPPER-NEG precedent.
- **Pre-conversion vs post-conversion chain delta-diff witness** — Plan 73-01 Wave 6 captures `.claude/tmp/73-chain-pre.txt` (records V-72-CHAIN-{61..67, 70} FAIL state at Plan 73-01 SHA). Plan 73-02 Wave 3 captures `.claude/tmp/73-chain-post.txt` (8 FAILs flipped → PASS). Witness inherits Phase 72 Plan 72-02 Wave 1 precedent.
- **Chicken-and-egg accepted-residual precedent depth** — Plan 68-05 → 69-02 → 70-05 Commit B → 71-01 Rule 4 Option A → 72-01 → 72-02 → **73-01 transitional state (V-73-CONVERT-* stubs + V-72-CHAIN-{61..67, 70} still FAIL until Plan 73-02 conversion lands)**. Plan 73-01 inherits Plan 72-01 transient-state precedent (PASS on Plan 73-01 deliverables + documented-residual FAIL on pre-existing chain assertions until Plan 73-02 RETRO-02 closes them).
- **Predecessor-byte-unchanged anti-regression invariant** — REQUIREMENTS.md:69 — v1.4/v1.4.1/v1.5/v1.6/v1.7 workflow YAMLs + milestone-audit harness MJS + sidecar JSONs MUST be byte-identical pre/post-Plan-73-NN. `git diff Plan-72-02-SHA HEAD -- <predecessor surfaces>` returns EMPTY at Plan 73-01 + 73-02 + 73-03 commit times. Chain validators `check-phase-{48..72}.mjs` are NOT in that invariant (Phase 68/72/73 precedent); Phase 73 modifies check-phase-{60..65}.mjs per D-01 fold-in + check-phase-{48..66}.mjs RETRO-02 subset per D-03 B-3 conversion plan.

### Integration Points

- **`scripts/validation/_lib/frozen-at-close.mjs`** — NEW module. Sibling to existing `scripts/validation/_lib/archive-path.mjs` (Phase 68 precedent). Imported by Phase 73 RETRO-02 converted validators + future v1.9+ adoption-sweep targets (existing check-phase-{61, 67, 68, 70}.mjs inline helpers eventually refactor to consume per `FROZEN-AWARE-ADOPTION-SWEEP-01` stub).
- **`scripts/validation/check-phase-73.mjs`** — NEW validator. Becomes the 21st in the chain (post-Phase-73; matches `check-phase-72.mjs` as the most-recent prior). Inherited by Phase 74 HARNESS-09 Path-A copy for `check-phase-74.mjs`.
- **8 wrapper-folded validators (check-phase-{60..65}.mjs CHAIN + check-phase-{60, 61}.mjs AUDIT)** — modified at the wrapper catch block only (per D-01 fold-in). Diff is mechanically uniform across files (same edit applied 8 times). Bisect-clean if wrapper fix regresses, isolated to Plan 73-01 atomic SHA.
- **7-12 RETRO-02-converted validators (subset of check-phase-{48..66}.mjs)** — modified at HEAD-coupled assertion sites only. Each converted assertion imports from `_lib/frozen-at-close.mjs` + replaces `readFile(...)` with `readAtV{15,16,17}Close(...)` + suffix check-name with `[v1.X-frozen @ <SHA>]`. Bisect-clean if conversion regresses, isolated to Plan 73-02 atomic SHA.
- **`.planning/phases/73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md`** — NEW Plan 73-01 deliverable. V-73-INVENTORY assertion targets this file (heading-presence check + per-validator row count). Source-of-truth for Plan 73-02 RETRO-02 conversion scope.
- **`.planning/phases/73-retrospective-forward-port-pillar-c/73-VERIFICATION.md`** — NEW close-gate artifact (Plan 73-03). V-73-AUDIT assertion targets this file (heading-presence check); transitions SKIP-PASS → PASS once Plan 73-03 lands. Section E hosts the per-validator conversion-record table.
- **`.planning/milestones/v1.8-DEFERRED-CLEANUP.md` CHAIN-DEGRADED-AT-HEAD-01 entry** — Plan 73-03 Wave 4 transitions STUB → CLOSED (Phase 73 closing SHA references). Phase 74 HARNESS-12 finalizes the artifact at v1.8 milestone close per `REQUIREMENTS.md:41` contract.
- **`.planning/milestones/v1.8-DEFERRED-CLEANUP.md` 3 NEW stubs** — Plan 73-03 Wave 4 authors: HELPER-SPAWN-STDERR-01 (D-01 carve-out) + FROZEN-AWARE-ADOPTION-SWEEP-01 (D-02 carve-out) + EXEC-FAIL-DETAIL-EXTRACTION-01 (Phase 72 D-01 deferred-idea hand-off). All route to v1.9+ per scope-discipline guardrail.
- **`.github/workflows/audit-harness-v1.7-integrity.yml`** — UNCHANGED in Phase 73 (predecessor-byte-unchanged invariant). Phase 74 HARNESS-10 ships NEW `audit-harness-v1.8-integrity.yml` that includes `check-phase-73` job.
- **Phase 74 entry-state contract** — HARNESS-09 inherits Phase 73's `check-phase-73.mjs` as Path-A source for `check-phase-74.mjs`; HARNESS-07 inherits clean V-72-CHAIN-{61..67, 70} → PASS state; HARNESS-12 finalizes v1.8-DEFERRED-CLEANUP.md by promoting v1.7 carry-overs (CI-3 + Multi-tenant + ABDevice API + per-OU CRD + Account Holder + ASM) to full sections alongside Phase 73's 3 NEW stubs + CHAIN-DEGRADED-AT-HEAD-01 CLOSED transition.

</code_context>

<specifics>
## Specific Ideas

- **User invokes `/adversarial-review` for gray-area picks during /gsd-discuss-phase** (per user memory `feedback_adversarial_review_preference`). Phase 73 honored verbatim — 4 parallel `gsd-advisor-researcher` agents dispatched in adversarial-review mode (Finder/Adversary/Referee scoring); all 4 picks user-approved via single "Approve all 4" selection. D-02 advisor's empirical grep corrected the prompt-cited v1.4 SHA (`fd95e36` does NOT resolve → candidates `b5cf529` / `671f72a`); D-04 advisor's `git log` empirically discovered v1.4.1 = `5c976ec` + v1.6 = `9d8877c` (v1.6 has NO git tag — critical Option C rejection wedge) — directly attributable to the adversarial-review pattern's empirical-grounding requirement.
- **User maximum-effort preference** (per user memory `feedback_effort_level`) — every gray-area dossier produced concrete operational steps + acceptance criteria + anti-regression risk analysis + adversarial-wedge identification + drop-in pseudocode. Phase 73 dossiers averaged 290-340 lines each.
- **Sequential-on-main-tree execution durable** (per user memory `project_execphase_sequential.md` + `.planning/config.json:7` `use_worktrees:false`). Plans 73-01 + 73-02 + 73-03 execute sequentially on the main tree. NO worktree experiments.
- **Phase 73 = Pillar C "Retrospective Forward-Port"** (per ROADMAP:348 + REQUIREMENTS:23). All decisions tilt toward minimum-blast-radius + class-signature-closure + maximum-revertibility WITHIN the SC#1 inventory-precedes-conversion + SC#4 atomic-with-witness constraints. Wave C "sequential after Wave A — may overlap with Wave B" position is now post-Phase-72-close (Phase 73 has clean entry state with empirically-grounded V-72-CHAIN-{61..67, 70} FAIL inventory baseline).
- **Today's date is 2026-06-08.** Phase 73 discussion authoring date. Frontmatter `last_verified:` bumps NOT needed (no `docs/*` corpus edits in v1.8; Plan 73-01 wrapper fixes + Plan 73-02 RETRO-02 conversions are chain-validator tooling, not corpus).
- **"DO NOT mask via deletion — investigate the script" doctrine continued from Phases 71 + 72** — Phase 73 honors via FORWARD-PORT-NOT-DELETION: convert HEAD-coupled assertions to frozen-aware (preserve the verification semantics by anchoring to the milestone-close moment they were authored for), not delete them. The 8 V-72-CHAIN-{61..67, 70} FAILs are CONVERTED, not silenced.
- **Phase 72 entry-state synergy** (per `72-CONTEXT.md` Section "Why now / why fix matters" + `v1.8-DEFERRED-CLEANUP.md` CHAIN-DEGRADED-AT-HEAD-01 status PARTIALLY-RESOLVED-EMPIRICAL-BASELINE-CAPTURED) — Phase 73's value is dual: close CHAIN-DEGRADED-AT-HEAD-01 entry via V-61-17 + V-67-05 + V-67-06 conversion AND ship the class-wide signature inventory deliverable. Plan 73-03 VERIFICATION.md Section B records the pre-RETRO-02-vs-post-RETRO-02 chain delta-diff witness as defense-in-depth.
- **"2-4h" effort baseline preserved** — `v1.7-DEFERRED-CLEANUP.md:66` HARNESS-FORWARD-01 + `:131` SCOPE-GAP-61 estimates honored for the literal scan + conversion; D-01 fold-in adds ~30min uniform wrapper edits + D-02 module extraction ~1h + D-04 SHA-registry construction ~30min; D-03 B-3 compresses to 3 plans (within STATE.md upper bound).
- **`MILESTONE_CLOSE_SHAS` lineage extension** — Phase 73 introduces the named-constants registry that Phase 74 HARNESS-08 (`v1.8-audit-allowlist.json` + BASELINE_12 freshness) MAY consume for its own historical SHA references (planner discretion at Phase 74). Pattern is reusable for v1.9+ retrospective audits.

</specifics>

<deferred>
## Deferred Ideas

### Already locked elsewhere (not new deferrals — recorded for downstream awareness)

- **3 helper-spawn stderr-only sites** (HELPER-SPAWN-STDERR-01) — Plan 73-03 authors NEW v1.8-DEFERRED-CLEANUP.md stub:
  - check-phase-48.mjs:72 (v1.5-era; lowest-risk helper-spawn class)
  - check-phase-60.mjs:188 (v1.5-era helper-spawn)
  - check-phase-61.mjs:403 (v1.5-era helper-spawn)
  - Class-type carve-out per D-01: `--self-test` failure-mode is deterministic; distinct slice-budget profile; route to v1.9+ for clean class-type closure
- **Existing inline helpers refactor to `_lib/frozen-at-close.mjs`** (FROZEN-AWARE-ADOPTION-SWEEP-01) — Plan 73-03 authors NEW v1.8-DEFERRED-CLEANUP.md stub:
  - check-phase-61.mjs:38-62 — `readRequirementsAtV15Close()` + `readRoadmapAtV15Close()` v1.5-family inline (signature lacks hardened `stdio` — refactor would harden)
  - check-phase-67.mjs:35-55 — `readCorpusFileAtV17Close()` + `readSidecarAtV17Close()` v1.7-family inline
  - check-phase-68.mjs:35-50 — `readCorpusFileAtV17Close()` 3rd duplication site (byte-identical)
  - check-phase-70.mjs:40-80 — `readCorpusFileAtV17Close()` + `readMilestoneAuditAtV17Close()` + `readDeferredCleanupAtV17Close()` + `readRequirementsAtV17Close()` 4-helper expansion
  - Strict-scope-discipline carve-out per D-02: refactor would expand v1.8 retrospective scope; v1.9+ adoption sweep
- **`_lib/exec-fail-detail.mjs` helper extraction** (EXEC-FAIL-DETAIL-EXTRACTION-01) — Plan 73-03 authors NEW v1.8-DEFERRED-CLEANUP.md stub:
  - Phase 72 D-01 deferred-idea hand-off
  - DRY catch-block stdout+stderr capture across all CHAIN+AUDIT+helper-spawn wrappers
  - Phase 68 `_lib/archive-path.mjs` precedent applies; deferred to v1.9+ for clean DRY-refactor scope
- **8 pre-existing V-72-CHAIN-{61..67, 70} FAILs** (CHAIN-DEGRADED-AT-HEAD-01) — Phase 73 RETRO-02 closes via V-61-17 + V-67-05 + V-67-06 conversion + cascade; v1.8-DEFERRED-CLEANUP.md status transitions STUB → CLOSED at Plan 73-03
- **HARNESS-FORWARD-01 + SCOPE-GAP-61 retrospective debts** — Phase 73 closes both via RETRO-01 inventory + RETRO-02 conversion + `_lib/frozen-at-close.mjs` centralization
- **v1.8 audit harness lineage bump** (HARNESS-07/08/09/10/11/12 + VPP-01) — Phase 74 Pillar D scope
- **ARCHIVE-UPSTREAM-01** — upstream PR to `get-shit-done-cc` (Phase 71 surfaced; Phase 74 HARNESS-12 finalizes the `v1.8-DEFERRED-CLEANUP.md` stub)
- **CI-3 Managed Apple ID corpus rename** (45 occurrences / 16 files) — DEFERRED to v1.9+ per Microsoft Intune portal rebrand-adoption trigger gate
- **Multi-tenant Apple Business / ABDevice API / per-OU CRD / Account Holder runbook / ASM** — all carried forward in `v1.8-DEFERRED-CLEANUP.md` (Phase 74 HARNESS-12 finalizes)

### Discovered during Phase 73 discussion (new for v1.8-DEFERRED-CLEANUP.md or v1.9+)

- **`MILESTONE_CLOSE_SHAS.V14` reservation** — `_lib/frozen-at-close.mjs` initially OMITS v1.4 (candidates `b5cf529` / `671f72a` per D-02 advisor pre-scan; v1.4 close was Phase 42, predating chain validators at Phase 48). Plan 73-01 RETRO-01 scan empirically confirms whether v1.4-close-state assertions exist in check-phase-{48..66}.mjs. If RETRO-01 surfaces v1.4 references, plan-phase author empirically discovers + adds V14 SHA. If zero, OMIT cleanly.
- **`SCOPE-GAP-RETRO-02-OVERFLOW-01` stub authoring trigger** — If Plan 73-01 RETRO-01 inventory surfaces >12 conversion candidates (above D-03 advisor 7-12 estimate), Plan 73-03 close-gate authors NEW v1.8-DEFERRED-CLEANUP.md stub per `REQUIREMENTS.md:67` anti-ballooning guardrail. Tripline empirical (recommend 12).
- **v1.6 git-tag creation deferral** — D-04 advisor discovered v1.6 has NO git tag (only milestone v1.4..v1.7 without one). Creating `git tag v1.6 9d8877c` is OUT-OF-SCOPE for Phase 73 (would touch `.planning/MILESTONES.md` lineage + invariant questions). Plan 73-03 may flag this as v1.9+ archival hygiene if planner surfaces it as worth doing.
- **Helper-signature drift normalization** — v1.5-family helpers (check-phase-61.mjs) lack hardened `stdio: ['ignore', 'pipe', 'pipe']`; v1.7-family helpers have it. Phase 73 `_lib/frozen-at-close.mjs` adopts hardened signature for NEW; refactor of OLD inline helpers to hardened signature folded into `FROZEN-AWARE-ADOPTION-SWEEP-01` stub.

### Discussed but explicitly out of v1.8 scope

- **Worktree-based execution** — `use_worktrees:false` durable per `.planning/config.json:7` + memory `project_execphase_sequential.md`
- **Modifications to v1.4/v1.4.1/v1.5/v1.6/v1.7 workflow YAMLs / harness MJS / sidecar JSONs** — predecessor-byte-unchanged invariant
- **`docs/*` corpus edits** — v1.8 is tooling-only milestone
- **`_lib/exec-fail-detail.mjs` DRY refactor in Phase 73** — D-02 advisor flagged as overkill for the immediate fix; folded to v1.9+ as EXEC-FAIL-DETAIL-EXTRACTION-01 per Phase 72 D-01 deferred-idea precedent
- **Git tags for SHA pinning** — D-04 Option C REJECTED (v1.6 has no tag; v1.5/v1.7 tag-SHAs ≠ helper-authoring SHAs; tag-mutation risk + fetch-tags CI compound surface)
- **Sidecar JSON SHA registry** — D-04 Option D scored second-best (2.5) but Option B (in-source named constants) preferred for new-module simplicity
- **Centralize ALL helpers (existing + new) in single sweep** — D-02 Option B scored 7; strict-scope-discipline interpretation of REQUIREMENTS.md:67 routes to v1.9+ adoption sweep
- **4-plan split with conversion waves** — D-03 B-4 scored 12; sequential-on-main-tree kills parallelism benefit; 19-validator scope too small to wave-split

</deferred>

---

*Phase: 73-retrospective-forward-port-pillar-c*
*Context gathered: 2026-06-08*
