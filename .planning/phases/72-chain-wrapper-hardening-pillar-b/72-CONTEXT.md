# Phase 72: Chain-Wrapper Hardening (Pillar B) - Context

**Gathered:** 2026-06-06
**Status:** Ready for planning

<domain>
## Phase Boundary

The **Pillar B entry phase** of v1.8 — fixes the chain-apex stderr-only wrapper that masked SCOPE-GAP-61 on Windows local for 2 weeks (per `v1.7-DEFERRED-CLEANUP.md:160-192` CHAIN-WRAPPER-01 entry). Surgical-but-uniform fix: bring the **CHAIN-regression-guard wrapper** to parity with the **AUDIT-harness wrapper** already-correct pattern (intra-file inconsistency at `check-phase-66.mjs:313` vs `:332-333` proves the contract). Independent of Pillar A (Phase 71 — CLOSED 2026-06-04) and Pillar C (Phase 73 — class-wide HEAD-coupled assertion forward-port) per ROADMAP Wave B/Wave C separation; coordinated with Phase 73 by file-disjoint ownership boundary so the two pillars may execute in parallel per `STATE.md:128-130`.

**Why now / why fix matters (post-Phase-71 entry-state synergy per `71-VERIFICATION.md` Section F):**

> Post-WRAPPER-01 fix, the diagnostic detail for V-61-17 + V-67-05/06 will surface in stdout per the recommended `(err.stderr || '').toString() + (err.stdout || '').toString()` capture pattern (`v1.7-DEFERRED-CLEANUP.md:181-186`), giving Phase 73 RETRO-01 inventory the empirical signature it needs.

Phase 72's value is dual: (1) close the literal CHAIN-WRAPPER-01 diagnostic-masking surface (REQUIREMENTS.md:21), and (2) un-mask the pre-existing 8 V-71-CHAIN-{61..67, 70} FAILs documented in `v1.8-DEFERRED-CLEANUP.md` CHAIN-DEGRADED-AT-HEAD-01 so Phase 73 RETRO-01 has empirically-grounded inventory data.

**Empirical site inventory (D-01 advisor grep-verified across `scripts/validation/check-phase-*.mjs`):**

| Wrapper class | Stderr-only sites | Already-correct sites |
|---|---|---|
| **CHAIN regression-guard** (subprocess of sibling check-phase-NN.mjs) | 12 sites: check-phase-{60:230, 61:368, 62:316, 63:321, 64:306, 65:294, **66:313** (REQ-locked target), 67:273, 68:278, 69:194, 70:593, 71:213} | 0 |
| **AUDIT subprocess** (subprocess of vN.N-milestone-audit.mjs) | 2 sites: check-phase-{60:248, 61:386} (v1.5 harness latent masking) | 10 sites: check-phase-{62:335, 63:340, 64:325, 65:314, **66:333**, 67:295, 68:300, 69:216, 70:617, 71:236} |
| **Helper-spawn** (regenerate-supervision-pins.mjs --self-test) | 3 sites: check-phase-{48:72, 60:188, 61:403} | — |

**Grand total: 17 stderr-only sites across 13 files** (NOT 13+3 as initial estimate — check-phase-48.mjs has NO CHAIN wrapper; it is a single-spawn pre-v1.5-finalization validator).

**Deliverables (exactly — locked by D-01..D-04):**

- **WRAPPER-01 root-cause fix (D-01 Option C ownership boundary)** — 6 CHAIN-wrapper fixes in `check-phase-{66, 67, 68, 69, 70, 71}.mjs` (Pillar B's natural v1.6/v1.7/v1.8-era ownership). Uniform pattern: `((err.stderr || '').toString() + (err.stdout || '').toString()).trim()` matching the in-file AUDIT-wrapper precedent (e.g., `check-phase-66.mjs:332-333`). The remaining **11 stderr-only sites** (CHAIN: 60/61/62/63/64/65 — 6 sites; AUDIT: 60/61 — 2 sites; helper: 48/60/61 — 3 sites) are **documented for Phase 73 fold-in** as RETRO-02 catch-block free passenger (D-01 Wedge 1 mitigation: Phase 73 RETRO-02 already modifies check-phase-{60,61,62..65}.mjs for HEAD-coupled assertion conversion; folding the wrapper fix into the same atomic commits avoids diff-noise pollution per advisor analysis).

- **check-phase-72.mjs validator-as-deliverable (D-04 Option A + δ)** — NEW Path-A from `check-phase-71.mjs`. CHAIN_PHASES = {48..71}; CHAIN_SKIP = `new Set([])` (inherits Phase 68 `7b635ca` invariant). Assertions:
  - **V-72-WRAPPER-01..06** — Source-text regex assertion parameterized over `FIXED_FILES = [66, 67, 68, 69, 70, 71, 72]` (note: includes 72 itself — self-dogfood). For each file, anchor regex to the CHAIN-regression-guard `name:` line + 600-char window, assert presence of BOTH `err.stderr` AND `err.stdout` tokens within the same catch block.
  - **V-72-WRAPPER-NEG** — Complementary negative invariant: "no stderr-only catch block remains" within the CHAIN-wrapper window across `FIXED_FILES`. Closes the AUDIT-wrapper-aliasing wedge (D-04 advisor critical finding — AUDIT wrapper at `check-phase-66.mjs:332-333` already has both tokens; naive regex would PASS on unfixed file).
  - **V-72-AUDIT** — Assert `72-VERIFICATION.md` exists post-Plan-72-02 landing and contains the audit-table heading (folded inventory per D-04 Option δ — NO standalone AUDIT-REPORT.md artifact; verification IS the audit record per Phase 71 lesson).
  - **V-72-CHAIN** — Standard chain regression-guards for CHAIN_PHASES={48..71}; uses the new uniform CHAIN-wrapper stdout+stderr capture (self-dogfood).
  - **V-72-AUDIT-HARNESS + V-72-SELF** — Standard chain-apex topology per `check-phase-71.mjs:243, 286` template; V-72-SELF asserts `CHAIN_PHASES` does NOT include 72 (no self-reference; D-22 auditor-independence).

- **72-VERIFICATION.md (Plan 72-02 close-gate)** — SC#1-4 satisfaction checklist; pre-fix-vs-post-fix chain delta-diff witness proving SC#3 second-clause compliance ("no false positives introduced by stdout capture addition" per D-02 Option B); per-validator audit inventory table (Section E — all 17 sites with per-site disposition FIXED / DEFERRED_PHASE_73 / DEFERRED_DOCUMENTED); cross-reference to v1.8-DEFERRED-CLEANUP.md CHAIN-DEGRADED-AT-HEAD-01 stub for the 8 pre-existing V-71-CHAIN-{61..67, 70} FAILs (documented-residual per D-02 Option B chicken-and-egg accepted-residual lineage Plan 68-05 → 69-02 → 70-05 Commit B → 71-01 → 72-02); Phase 73 entry-state readiness signal.

- **Traceability** — REQUIREMENTS.md WRAPPER-01 Pending→Complete + closing SHA; STATE.md frontmatter progress + Performance Metrics + Pending Todos updates; ROADMAP.md Phase 72 row Complete with closing SHA; PROJECT.md if a v1.8 requirement-count snapshot row exists.

**Out of scope (Phase 72 owns nothing else):**

- HARNESS-FORWARD-01 / SCOPE-GAP-RETRO-01 / RETRO-01 + RETRO-02 — Phase 73 Pillar C scope (REQUIREMENTS.md:25-27). Phase 72 does NOT convert HEAD-coupled assertions to frozen-aware. Phase 72 surfaces the stdout diagnostic; Phase 73 closes the assertions.
- The 6 non-Pillar-B CHAIN-wrapper stderr-only sites in check-phase-{60..65}.mjs — folded into Phase 73 RETRO-02 catch-block work (D-01 Option C boundary).
- The 2 stderr-only AUDIT-wrapper sites in check-phase-{60, 61}.mjs — documented; folded into Phase 73 RETRO-02 along with the V-61-17 HEAD-coupled conversion (these files are already in Phase 73's file set).
- The 3 helper-spawn stderr-only sites in check-phase-{48, 60, 61}.mjs — lowest-risk class (highly-deterministic supervision-pins helper); document in Phase 72 AUDIT-REPORT inventory; route to Phase 73 RETRO-02 or v1.9+ at Phase 73 plan-phase author's discretion.
- v1.8 audit harness lineage bump (HARNESS-07..12 + VPP-01) — Phase 74 Pillar D scope.
- Frozen-aware conversion of V-61-17 + V-67-05/06 — Phase 73 Pillar C RETRO-02 scope per `v1.8-DEFERRED-CLEANUP.md:86-89` (D-02 Option D rejected per REQUIREMENTS.md:67 anti-ballooning guardrail).
- Any `docs/*` corpus edits — v1.8 is tooling-only milestone (REQUIREMENTS.md Out of Scope).
- Modification to v1.4/v1.4.1/v1.5/v1.6/v1.7 workflow YAMLs + milestone-audit harness MJS + sidecar JSONs — predecessor-byte-unchanged invariant per REQUIREMENTS.md:69 (chain validators check-phase-NN.mjs are NOT in that invariant per Phase 68 / Phase 73 precedent).
- Worktree-based execution — `.planning/config.json:7` `use_worktrees:false` durable per memory `project_execphase_sequential.md`.
- New C-checks beyond v1.7 inheritance — v1.8 harness lineage bump (HARNESS-07) lands at Phase 74.

</domain>

<decisions>
## Implementation Decisions

All four gray areas resolved via 4 parallel `gsd-advisor-researcher` agents in adversarial-review mode (Finder argues FOR each option, Adversary argues AGAINST, Referee picks winner with score; lower = better) per user memory `feedback_adversarial_review_preference`. Each advisor read REQUIREMENTS / ROADMAP / STATE sections + `v1.7-DEFERRED-CLEANUP.md` + `v1.8-DEFERRED-CLEANUP.md` + `71-CONTEXT.md` / `71-VERIFICATION.md` + the actual `scripts/validation/check-phase-*.mjs` source files. Scores in parentheses match Phase 71 convention (D-01 score-10 / D-02 score-9 / D-03 score-8 / D-04 score-7). All four recommendations user-approved without revision via single `Approve all 4 — proceed to CONTEXT.md` selection. **One D-01/D-04 tension resolved via synthesis** (D-01 mentioned a standalone AUDIT-REPORT-WRAPPER-01.md artifact; D-04 Option δ recommends folding into 72-VERIFICATION.md — D-04 δ wins on Phase 71 verification-is-the-audit-record lesson + D-03 B agrees).

### D-01: Wrapper-fix scope — Option C (Phase 72 ownership boundary: check-phase-{66..71}.mjs CHAIN wrappers, 6 files) (score **C=6** / A=9 / B=9 / D=10)

**Decision:** Fix the 6 CHAIN-regression-guard wrappers in Pillar B's natural v1.6/v1.7/v1.8-era ownership: `check-phase-{66, 67, 68, 69, 70, 71}.mjs`. Document the remaining 11 sites (CHAIN 60-65 + AUDIT 60-61 + helper 48/60/61) as Phase 73 fold-in for RETRO-02 catch-block free-passenger work.

| File | Line | Wrapper class | Phase 72 disposition |
|------|------|---------------|----------------------|
| check-phase-66.mjs | 313 | CHAIN (REQ-locked target SC#1) | **FIXED in Plan 72-01** |
| check-phase-67.mjs | 273 | CHAIN | **FIXED in Plan 72-01** |
| check-phase-68.mjs | 278 | CHAIN | **FIXED in Plan 72-01** |
| check-phase-69.mjs | 194 | CHAIN | **FIXED in Plan 72-01** |
| check-phase-70.mjs | 593 | CHAIN | **FIXED in Plan 72-01** |
| check-phase-71.mjs | 213 | CHAIN | **FIXED in Plan 72-01** |
| check-phase-{60..65}.mjs | (6 sites) | CHAIN | **DOCUMENTED for Phase 73 RETRO-02 fold-in** |
| check-phase-{60, 61}.mjs | (2 sites) | AUDIT | **DOCUMENTED for Phase 73 RETRO-02 fold-in** |
| check-phase-{48, 60, 61}.mjs | (3 sites) | Helper-spawn | **DOCUMENTED for Phase 73 RETRO-02 (or v1.9+ at Phase 73 author discretion)** |

**Uniform fix pattern** (matches in-file AUDIT-wrapper precedent at e.g., `check-phase-66.mjs:332-333`):

```javascript
// BEFORE (CHAIN regression-guard catch):
} catch (err) {
  const stderr = err.stderr ? err.stderr.toString() : '';
  const isMissing = err.code === 'ENOENT' || ...;
  if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
  return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + stderr.slice(0, 200) };
}

// AFTER (uniform with AUDIT-wrapper pattern, stdout+stderr capture):
} catch (err) {
  const stderr = err.stderr ? err.stderr.toString() : '';
  const stdout = err.stdout ? err.stdout.toString() : '';
  const isMissing = err.code === 'ENOENT' || err.status === 127
    || stderr.includes('not found') || stderr.includes('Could not resolve');
  if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
  return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + (stdout + stderr).slice(0, 300).trim() };
}
```

Slice budget bumped 200→300 to accommodate composite stdout+stderr (matches AUDIT-wrapper precedent at `check-phase-66.mjs:338`).

**Rationale (per advisor dossier `.claude/tmp/phase72-D01-advisor.md`):**

- **Adversarial wedge that decided it (Wedge 2):** Option A's "documented" branch defeats the Phase 71 entry-state synergy claim (`71-VERIFICATION.md:287` Section F). Phase 73 RETRO-01 inventory invokes check-phase-61/67.mjs **standalone** (not just chained through 66) to scan HEAD-coupled assertions — if those wrappers remain stderr-only, the empirical stdout signature Phase 73 needs stays masked at the standalone-invocation surface. Option C extends the fix to 67..71 (where Phase 73 also has work to do at the chain-apex topology) and lets RETRO-02 fold the remaining 60-65 wrappers into its assertion-conversion commits naturally.
- **Wedge 1 mitigation:** Option B's wholesale sweep collides with Phase 73's exact RETRO-02 file set (60/61/67) creating diff-noise pollution. Option C's file-overlap with Phase 73 is **exactly 1 file** (check-phase-66.mjs at line 313 — the RETRO-01 scan-range boundary), orders of magnitude better than Option B's 17-site collision.
- **Critical empirical inconsistency anchor:** The intra-file inconsistency at `check-phase-66.mjs` (line 313 CHAIN stderr-only vs line 333 AUDIT stdout+stderr, 20 lines apart, same author) proves the fix-direction is unambiguous — uniform pattern, not novel design.
- **Anti-precedent risk preserved:** `check-phase-{48, 60, 61}.mjs` belong to v1.4.1/v1.5 era; touching them in Phase 72 would risk the predecessor-byte-unchanged invariant interpretation concerns Phase 71 D-04 advisor flagged. Phase 73 explicitly owns conversions in those files (REQUIREMENTS.md:25-27 scope check-phase-{48..66}.mjs); folding wrapper fixes there is natural.
- **Self-dogfood:** New `check-phase-72.mjs` is also authored with the fixed pattern from inception (not buggy-then-fixed) — included in `FIXED_FILES` array as 7th entry.

### D-02: SC#3 reconciliation — Option B (Intent re-read with "no false positives introduced" as discriminator anchor) (score **B=6/25** / C=14 / A=22 / D=21)

**Decision:** Phase 72 close-gate satisfies ROADMAP SC#3 (`ROADMAP.md:341`) via the **second-clause discriminator**: "no false positives introduced by stdout capture addition." The 8 pre-existing V-71-CHAIN-{61..67, 70} FAILs are accepted-residual (documented in `v1.8-DEFERRED-CLEANUP.md` CHAIN-DEGRADED-AT-HEAD-01 → resolved in Phase 73 Pillar C); the wrapper fix is NEUTRAL with respect to pre-existing degradation. Phase 72 close-gate proves SC#3 second-clause via **pre-fix-vs-post-fix chain delta-diff witness**.

**SC#3 satisfaction recipe (close-gate Plan 72-02 Wave 1):**

1. **Pre-fix baseline witness** (already exists per Phase 71 close): `.claude/tmp/71-03-chain-rerun.txt` records `21 PASS / 8 FAIL / 0 SKIPPED` at HEAD pre-Plan-72-01. If absent or stale, Plan 72-02 author re-runs `node scripts/validation/check-phase-71.mjs > .claude/tmp/72-chain-pre.txt 2>&1` BEFORE Plan 72-01 lands; or extracts the count from `71-VERIFICATION.md` Section B if the empirical text isn't preserved.
2. **Post-fix witness** (Plan 72-02 Wave 1): `node scripts/validation/check-phase-72.mjs > .claude/tmp/72-chain-post.txt 2>&1` after Plan 72-01 atomic SHA lands.
3. **Delta-diff assertion** (close-gate verifier): PASS-count + FAIL-count + SKIPPED-count IDENTICAL pre-vs-post. Only the `detail:` strings should differ (now carrying V-61-17 + V-67-05/06 + their cascade chain's stdout diagnostic content; previously empty stderr noise).
4. **72-VERIFICATION.md Section C SC#3 satisfaction template:**
   ```
   SC#3: Full chain check-phase-48..66.mjs exits 0 with 0 FAIL / 0 SKIPPED -- no false positives introduced
   
   - First clause read against introduced-by-this-phase class: SATISFIED (0 new FAILs introduced by stdout capture)
   - Second clause is the discriminator: SATISFIED (delta-diff witness proves count-identical pre-vs-post)
   - Pre-existing 8 V-71-CHAIN-{61..67, 70} FAILs: documented-residual per v1.8-DEFERRED-CLEANUP.md CHAIN-DEGRADED-AT-HEAD-01 (lines 56-99); resolution mechanism pre-specified in REQUIREMENTS.md:25-27 (Phase 73 Pillar C RETRO-01 + RETRO-02). Empirical proof of fix's positive impact: post-fix detail strings now carry V-61-17 root-cause text ("MILESTONES.md top-H2 mismatch: expected v1.5, got v1.7") whereas pre-fix detail was empty noise.
   - Precedent: chicken-and-egg accepted-residual at Plan 68-05 / 69-02 / 70-05 Commit B / 71-01 Rule 4 Option A (this is the 5th entry in the lineage)
   ```

**Rationale (per advisor dossier `.claude/tmp/phase72-D02-advisor.md`):**

- **Adversarial wedge that decided it:** Option A (literal "0 FAIL / 0 SKIPPED") forces Wave B/C collapse — either pulling Phase 73 RETRO-02 work into Phase 72 (Pillar B scope-bleed) or inverting close-gate order (Phase 73 closes before Phase 72). Both defeat `ROADMAP.md:194-196` Wave designation that explicitly says "Wave B (sequential after Wave A — may overlap with Wave C)."
- **Option D (surgical V-61-17 conversion) violates REQUIREMENTS.md:67 read as Phase-72-vs-73 discipline.** The anti-ballooning guardrail intent is to prevent retrospective scope expansion in v1.8; cherry-picking V-61-17 is exactly the in-pillar scope creep the guardrail forbids. Also: even after V-61-17 cascade-collapse, V-67-05/06 remain unresolved, so SC#3 first-clause is NOT literally satisfied even with surgical expansion.
- **Option C (cross-phase close-gate dependency) creates a precedent vacuum** — every prior chicken-and-egg accepted-residual is INTRA-phase (within one phase's close-gate plan window); inter-phase verification-artifact dependency violates per-phase VERIFICATION.md self-containment convention.
- **The second clause of SC#3 ("no false positives introduced by stdout capture addition") is load-bearing text.** ROADMAP.md:341 is one sentence with two clauses; the second clause CONDITIONS the first clause on the causal source of any observed FAILs. Reading the first clause without the second strands the second as orphaned text.
- **Chicken-and-egg precedent depth:** Plan 68-05 (`{68_05_SHA}` placeholder) → Plan 69-02 (`{69_02_SHA}`) → Plan 70-05 Commit B (`{phase_70_close_SHA}`) → Plan 71-01 Rule 4 Option A documented-transient — Phase 72 close-gate is the 5th application; the pattern is now project doctrine.

### D-03: Plan layout + atomic-commit composition — Option B (Two-plan atomic split: fix+validator / close-gate) (score **B=6** / D=11 / C=13 / A=12)

**Decision:** Two-plan split with one atomic-within-plan commit + one close-gate commit. Scaled-down Plan 71-01 (`e4887b2`) precedent for the atomic phase + Plan 71-03 close-gate shape for the verification phase. Two SHAs total. STATE.md "1-2 plans" upper bound matches exactly at 2.

```
Plan 72-01 (ATOMIC commit — WRAPPER-01 fix + regression-witness validator)
  Wave 1: Apply uniform CHAIN-wrapper fix at 6 sites:
    - check-phase-66.mjs:309-318 (SC#1 literal target)
    - check-phase-67.mjs:269-278
    - check-phase-68.mjs:274-283
    - check-phase-69.mjs:190-199
    - check-phase-70.mjs:589-598
    - check-phase-71.mjs:209-218
    Each catch block replaced with the uniform stdout+stderr capture pattern (D-01 fix snippet above).
  Wave 2: Author scripts/validation/check-phase-72.mjs (Path-A from check-phase-71.mjs).
    - CHAIN_PHASES = [48..71]; CHAIN_SKIP = new Set([])
    - Self-dogfood: NEW check-phase-72.mjs CHAIN wrapper authored with stdout+stderr from inception
    - FIXED_FILES = [66, 67, 68, 69, 70, 71, 72] (includes self)
    - V-72-WRAPPER-01..07 + V-72-WRAPPER-NEG + V-72-AUDIT + V-72-CHAIN + V-72-AUDIT-HARNESS + V-72-SELF
  Wave 3: Pre-commit dry-run:
    - node scripts/validation/check-phase-72.mjs (expect V-72-WRAPPER-* PASS; V-72-CHAIN-{61..67,70} expected FAIL per D-02 documented-residual)
    - Predecessor-byte-unchanged check: git diff Plan-71-03-SHA HEAD -- <v1.4/v1.4.1/v1.5/v1.6/v1.7 frozen surfaces> returns EMPTY
  Wave 4: Capture pre-fix-vs-post-fix delta witness:
    - If .claude/tmp/71-03-chain-rerun.txt is absent, run pre-fix chain capture FIRST: node scripts/validation/check-phase-71.mjs > .claude/tmp/72-chain-pre.txt 2>&1 (BEFORE staging the wrapper fix)
    - Then run post-fix chain capture: node scripts/validation/check-phase-72.mjs > .claude/tmp/72-chain-post.txt 2>&1 (AFTER staging the wrapper fix)
  ATOMIC commit (7 files in ONE SHA per Phase 67 Plan 67-02 atomic-within-plan precedent 55260b3; Phase 71 Plan 71-01 e4887b2 scaled-down precedent):
    fix(72-01): WRAPPER-01 chain-apex stdout+stderr capture + check-phase-72.mjs regression-witness (atomic SC#4)

Plan 72-02 (close-gate — 72-VERIFICATION.md + traceability flips + DEFERRED-CLEANUP updates)
  Wave 1: Full chain re-run check-phase-{48..72}.mjs (expect identical PASS-count + FAIL-count + SKIPPED-count vs pre-fix witness; only detail strings change)
  Wave 2: v1.7-milestone-audit.mjs → 15/15 PASS unchanged (predecessor-byte-unchanged invariant)
  Wave 3: Author 72-VERIFICATION.md:
    - Section A: Phase 72 Goal achievement narrative
    - Section B: Commands evidence + chain re-run outputs (pre + post delta-diff witness)
    - Section C: SC#1-4 satisfaction (SC#3 uses Option B template above)
    - Section D: Atomic Plan 72-01 SHA recorded byte-exact (SC#4 compliance)
    - Section E: Per-validator audit-inventory table (17 sites with disposition per D-01 Option C boundary)
    - Section F: Discoveries (any new wrapper-class findings; ARCHIVE-style stub if surfaced)
    - Section G: Phase 73 entry-state readiness signal (RETRO-01 + RETRO-02 + 11 stderr-only sites still pending + check-phase-72 chain wrapper ready for Phase 73 to inherit Path-A from)
    - Section H: Sign-off
  Wave 4: Update v1.8-DEFERRED-CLEANUP.md CHAIN-DEGRADED-AT-HEAD-01 entry — append "post-WRAPPER-01-fix empirical stdout-diagnostic signature now visible at chain-apex output per Phase 72 Plan 72-02 close-gate witness .claude/tmp/72-chain-post.txt"; this transitions the stub from STUB → PARTIALLY-RESOLVED-EMPIRICAL-BASELINE-CAPTURED. Phase 73 RETRO-01 closes the entry fully.
  Wave 5: Traceability — REQUIREMENTS.md WRAPPER-01 Pending→Complete + closing SHA Plan 72-01 atomic + Plan 72-02 close-gate SHA recorded; STATE.md frontmatter + Performance Metrics + Pending Todos; ROADMAP.md Phase 72 row Complete
  Commit:
    docs(72-02): Phase 72 close-gate — chain delta-diff witness + 72-VERIFICATION.md + traceability flips
```

**Total commits:** 2. Atomic ONLY for Plan 72-01 per SC#4 wording delta from Phase 71: Phase 72 SC#4 is "the chain-apex fix lands atomically" (no co-required artifact NAMED — but the regression-witness validator IS the proof-of-fix). Bisect-clean for code-only commit Plan 72-01; traceability + verification narrative isolated in Plan 72-02.

**Rationale (per advisor dossier `.claude/tmp/phase72-D03-advisor.md`):**

- **Adversarial wedge that decided it:** Option A interleaves traceability flips (PROJECT/REQUIREMENTS/STATE/ROADMAP edits) with code change in one commit, defeating the bisect-on-fix-only convention Phase 67 Plan 67-02 (55260b3) + Phase 71 Plan 71-01 (e4887b2) established. This is a 2-precedent regression risk.
- **Option D (chicken-and-egg SHA placeholder) is unnecessary here.** Phase 70 Plan 70-05 Commit A needed the mechanism because downstream check-phase-NN.mjs validators had FORWARD-coupled references to the milestone-close SHA (BASELINE_11 comment + V-NN-NN frozen-aware assertions). Phase 72's check-phase-72.mjs asserts ONLY against (a) check-phase-{66..72}.mjs source code at HEAD, (b) v1.7-milestone-audit subprocess exit-0, (c) chain re-run on {48..71}, (d) V-72-SELF guard — NONE need a frozen Phase 72 SHA. The placeholder mechanism would add complexity without solving any actual chicken-and-egg problem.
- **Option C (three-plan split) cargo-cults Phase 71 D-04 without honoring requirement-count delta.** Phase 71 had TWO requirements (ARCHIVE-01 + ARCHIVE-02); Plan 71-02 was standalone because ARCHIVE-02 was a standalone requirement (re-authoring v1.1+v1.2 from canonical source). Phase 72 has ONE requirement (WRAPPER-01); the audit is derived output of SC#2 (bundled into WRAPPER-01), not an independent deliverable. Plus three plans exceeds STATE.md "1-2 plans" upper bound by 50%.
- **Phase 71 D-04 inheritance SCALES proportionally to requirement-count:** Phase 71 (2 reqs) → 3 plans; Phase 72 (1 req) → 2 plans. Pattern preserved.
- **SC#4 byte-exact compliance:** Plan 72-01 atomic SHA = "the chain-apex fix lands atomically" verbatim.

### D-04: check-phase-72.mjs assertion design — Option A + δ (Source-text regex parameterized over FIXED_FILES + audit folded into 72-VERIFICATION.md) (D-04a A=9 / B=14 / C=16 / D depends on D-01; D-04b δ=8 / α=12 / β=14 / γ=15)

**Decision:**
- **D-04a V-72-WRAPPER-01..07 design:** Source-text regex parameterized over `FIXED_FILES = [66, 67, 68, 69, 70, 71, 72]` (the D-01 C set + self-dogfood). For each file, anchor regex to the CHAIN-regression-guard `name:` line + 600-char window, assert BOTH `err.stderr` AND `err.stdout` tokens within the same catch block. **Add complementary V-72-WRAPPER-NEG** negative invariant: count catch-blocks within the CHAIN-wrapper window that contain `err.stderr` but no `err.stdout` → assert == 0 per FIXED_FILES entry. The negative invariant closes the AUDIT-wrapper-aliasing wedge (D-04 advisor critical finding).
- **D-04b V-72-AUDIT record:** Audit inventory folded into `72-VERIFICATION.md` Section E (table of all 17 sites with per-site disposition); V-72-AUDIT assertion is heading-presence check (assert `72-VERIFICATION.md` exists AND contains "Per-Validator Audit Inventory" heading). NO standalone AUDIT-REPORT.md artifact (Phase 71 lesson: verification IS the audit record).

**Concrete assertion design (drop-in for Plan 72-01 Wave 2):**

```javascript
// scripts/validation/check-phase-72.mjs (excerpt — V-72-WRAPPER-01..07 + V-72-WRAPPER-NEG)

const FIXED_FILES = [66, 67, 68, 69, 70, 71, 72]; // D-01 C set + self-dogfood

// Anchor regex: find catch block inside CHAIN-regression-guard topology
// The CHAIN-regression-guard run() block opens with execFileSync('node', [path], ...);
// followed by the catch block. We anchor on 'execFileSync' + path-variable identifier.
const CHAIN_WRAPPER_ANCHOR = /execFileSync\('node',[\s\S]{0,200}?catch\s*\(\s*err\s*\)\s*\{([\s\S]{0,600}?)\n\s*\}/g;

FIXED_FILES.forEach((phaseNum) => {
  checks.push({
    id: `WRAPPER-${String(phaseNum).padStart(2, '0')}`,
    name: `V-72-WRAPPER-${phaseNum}: check-phase-${phaseNum}.mjs CHAIN wrapper captures both stderr AND stdout`,
    run() {
      const content = readFile(`scripts/validation/check-phase-${phaseNum}.mjs`);
      if (!content) return { pass: false, detail: `check-phase-${phaseNum}.mjs not found` };
      const matches = [...content.matchAll(CHAIN_WRAPPER_ANCHOR)];
      if (matches.length === 0) return { pass: false, detail: `no CHAIN wrapper catch block found in check-phase-${phaseNum}.mjs (anchor regex miss)` };
      // For each CHAIN-wrapper catch block, BOTH tokens must be present
      const violators = matches.filter((m) => !(/err\.stderr/.test(m[1]) && /err\.stdout/.test(m[1])));
      if (violators.length > 0) {
        return { pass: false, detail: `${violators.length} of ${matches.length} CHAIN wrapper(s) in check-phase-${phaseNum}.mjs missing err.stdout capture` };
      }
      return { pass: true, detail: `${matches.length} CHAIN wrapper(s) in check-phase-${phaseNum}.mjs capture both streams` };
    }
  });
});

// V-72-WRAPPER-NEG: negative invariant — no stderr-only catch within CHAIN-wrapper window
checks.push({
  id: 'WRAPPER-NEG',
  name: 'V-72-WRAPPER-NEG: zero stderr-only CHAIN wrappers remain across FIXED_FILES',
  run() {
    const stderrOnly = [];
    FIXED_FILES.forEach((phaseNum) => {
      const content = readFile(`scripts/validation/check-phase-${phaseNum}.mjs`);
      if (!content) return;
      const matches = [...content.matchAll(CHAIN_WRAPPER_ANCHOR)];
      matches.forEach((m, idx) => {
        const hasStderr = /err\.stderr/.test(m[1]);
        const hasStdout = /err\.stdout/.test(m[1]);
        if (hasStderr && !hasStdout) {
          stderrOnly.push({ file: `check-phase-${phaseNum}.mjs`, occurrence: idx + 1 });
        }
      });
    });
    if (stderrOnly.length > 0) {
      return { pass: false, detail: `${stderrOnly.length} stderr-only CHAIN wrapper(s) remain: ${JSON.stringify(stderrOnly)}` };
    }
    return { pass: true, detail: `0 stderr-only CHAIN wrappers across ${FIXED_FILES.length} FIXED_FILES (whole-file class signature satisfied)` };
  }
});

// V-72-AUDIT: heading-presence check on 72-VERIFICATION.md (folded audit inventory per D-04b δ)
checks.push({
  id: 'AUDIT',
  name: 'V-72-AUDIT: 72-VERIFICATION.md exists and contains Per-Validator Audit Inventory heading',
  run() {
    const verif = readFile('.planning/phases/72-chain-wrapper-hardening-pillar-b/72-VERIFICATION.md');
    if (!verif) return { pass: true, skipped: true, detail: '72-VERIFICATION.md not yet authored (expected during Plan 72-02 close-gate; PASS-via-skip until Plan 72-02 lands)' };
    if (!/Per-Validator Audit Inventory/i.test(verif)) {
      return { pass: false, detail: '72-VERIFICATION.md missing "Per-Validator Audit Inventory" section heading' };
    }
    // Optional: count the 17-site rows + verify D-01 boundary disposition labels
    return { pass: true, detail: '72-VERIFICATION.md exists with audit inventory section' };
  }
});
```

**Plan 72-01 Wave 3 expected pre-commit signature:** V-72-WRAPPER-{66..72} all PASS + V-72-WRAPPER-NEG PASS + V-72-AUDIT SKIP-PASS (deferred to Plan 72-02) + V-72-AUDIT-HARNESS PASS + V-72-SELF PASS + V-72-CHAIN-{48..71 minus pre-existing-residual} PASS + V-72-CHAIN-{61..67, 70} FAIL (8 expected per D-02 Option B documented-residual). **Plan 72-01 commits as 7 PASS + 1 SKIP-PASS + 8 documented-FAIL = transient state per Plan 71-01 Rule 4 Option A precedent.** Plan 72-02 close-gate flips V-72-AUDIT SKIP-PASS → PASS once 72-VERIFICATION.md lands.

**Rationale (per advisor dossier `.claude/tmp/phase72-D04-advisor.md`):**

- **Adversarial wedge that decided it:** Naive Option A regex admits AUDIT-wrapper aliasing — `check-phase-66.mjs:332-333` AUDIT wrapper ALREADY has both `err.stderr` AND `err.stdout` tokens. A whole-file token count would PASS on the unfixed file. Mitigation: anchor regex to `execFileSync('node', [path], ...)` + catch-block within 600-char window, scoping to CHAIN-regression-guard topology specifically. ADD V-72-WRAPPER-NEG complementary negative invariant for whole-file class signature.
- **Option B (behavioral subprocess proof) disproportionate to 30-min wrapper fix.** Spawns subprocess-of-subprocess + temp-file creation + cross-OS pathing concerns + CHAIN_PHASES topology violation (check-phase-66.mjs invokes its own CHAIN_PHASES=[48..65] subprocesses; nesting Phase 72 → check-phase-66 → 48..65 spawn-of-spawn is the class of flakiness Phases 67-70 invested in eliminating).
- **Option C (exact snippet equality) brittle to refactor.** Phase 73 RETRO-02 might extract a `captureSubprocessOutput(err)` helper; Option C would FAIL the helper-refactored file even though the helper IS the right cleanup. Phase 71 V-71-FIX-01 explicitly avoided this brittleness (uses anchored regex, not byte-exact snippet) — Option A inherits Phase 71's design lesson.
- **Option D (multi-file per-file V-72-WRAPPER-N) was a sweep-only design** that only applied if D-01 picked Option B. D-01 picked Option C — the parameterized FIXED_FILES iteration is the right shape.
- **Option δ for V-72-AUDIT inherits Phase 71 V-71-AUDIT subprocess pattern:** check-phase-71.mjs:236 V-71-AUDIT does a subprocess-exits-0 check, not a separate AUDIT-REPORT.md scan. Folding Phase 72's audit inventory into 72-VERIFICATION.md is the same self-containment pattern. Phase 71 lesson: verification IS the audit record (no separate artifact needed; would duplicate-document content).

### Claude's Discretion

- Exact CHAIN_WRAPPER_ANCHOR regex (the `execFileSync(...)` anchor + 200-char gap + catch + 600-char window) — planner verifies empirically against all 7 files at Plan 72-01 Wave 2; tune the gap window if false-positives surface (Phase 73 RETRO-02 helper-extraction may require window expansion).
- Slice budget for composite stdout+stderr — recommended 300 (vs AUDIT wrapper's existing 300 per check-phase-66.mjs:338). Planner adjusts if any check-phase-NN peer validator emits >300 chars of useful diagnostic.
- Whether Plan 72-01 Wave 4 captures `.claude/tmp/72-chain-pre.txt` OR Plan 72-02 Wave 1 uses `.claude/tmp/71-03-chain-rerun.txt` as the pre-fix witness — planner picks based on freshness (recommend re-capture in Plan 72-01 Wave 4 BEFORE staging for clean delta-diff).
- Whether to expand FIXED_FILES to include AUDIT wrapper sites in check-phase-{60, 61}.mjs in V-72-WRAPPER assertions (only if Plan 72-01 author decides those 2 sites are easy enough to fix in-Phase-72 without scope creep — recommend NOT; route to Phase 73 RETRO-02 per D-01 boundary).
- Whether 72-VERIFICATION.md Section F (Discoveries) authors a v1.8-DEFERRED-CLEANUP.md new-stub for any newly-discovered wrapper class beyond the 17-site inventory (recommend defensive draft: surface anything weird the chain re-run shows post-fix).
- Whether to record empirical V-61-17 + V-67-05/06 stdout-diagnostic content as defense-in-depth in 72-VERIFICATION.md Section B Commands evidence — recommend YES; this is the operational proof Phase 73 will cite at RETRO-01 inventory.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 72 contract docs
- `.planning/REQUIREMENTS.md` lines 19-21 — WRAPPER-01 contract + SC#1+SC#2+SC#3 (close-gate language analyzed under D-02)
- `.planning/ROADMAP.md` lines 333-343 — Phase 72 Goal + SC#1-4 (SC#3 second-clause discriminator load-bearing per D-02; SC#4 wording delta from Phase 71 per D-03)
- `.planning/STATE.md` lines 77-142 — v1.8 phase dependency summary + Wave designation map ("Wave B sequential after Wave A — may overlap with Wave C") + requirement coverage table (Phase 72 plan estimate "1-2 plans")
- `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` lines 160-192 — CHAIN-WRAPPER-01 entry: scope + recommended fix snippet (lines 179-186) + estimated effort ("30min surgical wrapper edit + chain-apex regression sweep")
- `.planning/milestones/v1.8-DEFERRED-CLEANUP.md` lines 56-99 — CHAIN-DEGRADED-AT-HEAD-01 stub: per-validator root cause + Phase 73 resolution mechanism + "Why NOT a Phase 72 entry-gate blocker" (line 93)

### Phase 71 precedent + entry-state signals
- `.planning/phases/71-archive-automation-root-cause-fix-pillar-a/71-CONTEXT.md` D-04 lines 136-188 — 3-plan split precedent + Phase 67 Plan 67-02 atomic-within-plan inheritance + Phase 68 Plan 68-04 MILESTONES.md-separation precedent (Phase 72 D-03 scales down by 1 plan per requirement-count delta)
- `.planning/phases/71-archive-automation-root-cause-fix-pillar-a/71-VERIFICATION.md` Section E Discoveries + Section F — Phase 72 entry-state readiness signal (load-bearing for D-02 SC#3 reconciliation: "Post-WRAPPER-01 fix, diagnostic detail for V-61-17 + V-67-05/06 will surface in stdout… giving Phase 73 RETRO-01 inventory the empirical signature it needs")
- `.planning/phases/71-archive-automation-root-cause-fix-pillar-a/71-01-SUMMARY.md` Transient States Landed section — Rule 4 Option A documented-transient precedent (Phase 72 Plan 72-01 inherits)
- `.planning/phases/71-archive-automation-root-cause-fix-pillar-a/71-02-SUMMARY.md` — Plan 71-02 separation precedent for ARCHIVE-02 sweep (Phase 72 D-03 scales down: no equivalent standalone requirement)

### Fix target + reference patterns (READ BEFORE EDITING)
- `scripts/validation/check-phase-66.mjs` lines 293-340 — the SC#1-locked fix target. Observe CHAIN-wrapper stderr-only catch at line 313 AND AUDIT-wrapper stdout+stderr catch at lines 332-333 in the SAME file (the in-file inconsistency is the unambiguous fix-direction anchor)
- `scripts/validation/check-phase-71.mjs` — Path-A source for new `check-phase-72.mjs`. CHAIN_PHASES Set, CHAIN_SKIP empty-Set invariant, readFile() CRLF normalization, V-71-AUDIT subprocess pattern (D-04 δ inheritance), V-71-CHAIN wrapper topology (which itself needs fixing in Plan 72-01 Wave 1 per D-01 C boundary)
- `scripts/validation/check-phase-67.mjs` lines 270-305 — observe peer-validator stderr-only CHAIN at line 273 + already-correct AUDIT at 294-295 (uniform pattern source-of-truth)

### Recommended fix snippet (literal from v1.7-DEFERRED-CLEANUP.md:181-186)
```javascript
} catch (err) {
  const out = ((err.stderr || '').toString() + (err.stdout || '').toString()).trim();
  return { pass: false, detail: `check-phase-${phaseNum} FAIL: ${out}` };
}
```
Adopted with uniform-with-existing-AUDIT-wrapper extensions: keep the `isMissing` graceful-skip branch, bump slice budget 200→300, preserve detail-format string. See D-01 "Uniform fix pattern" code block above.

### Atomic-commit precedents (READ FOR PLAN 72-01 PATTERN)
- Phase 67 Plan 67-02 commit `55260b3` — 5-file atomic-within-plan commit (Phase 72 Plan 72-01 most-direct precedent — 7 files atomic)
- Phase 71 Plan 71-01 commit `e4887b2` — 3-file atomic ARCHIVE-01 fix + regression fixture (closest scale-up reference; Phase 72 inherits structure scaled to 7 files)
- Phase 70 Plan 70-02 `26a1ae9` — 3-file atomic harness commit (smaller scale precedent)
- Phase 68 Plan 68-03 `7b635ca` — 5-file CHAIN_SKIP atomic removal (cross-validator atomic write)

### Anti-regression / scope-discipline precedents
- `.planning/REQUIREMENTS.md` lines 67-69 — anti-ballooning guardrail (read as Phase-72-vs-73 discipline per D-02) + predecessor-byte-unchanged invariant (workflow YAMLs + milestone-audit harness MJS + sidecar JSONs only; chain validators NOT in invariant)
- `.planning/STATE.md` lines 128-130 — Wave B sequential after Wave A (may overlap with Wave C) — D-02 / D-03 hinge on preserving this Wave separation
- `.planning/config.json` line 7 — `use_worktrees: false` durable per memory `project_execphase_sequential.md`

### Advisor dossiers (for planner deep-dive)
- `.claude/tmp/phase72-D01-advisor.md` (264 lines / 23.7 KB) — D-01 full dossier (Option C ownership boundary + empirical 17-site grep inventory + Wedge 1+2 analysis + Option B Phase-73-file-collision dissection)
- `.claude/tmp/phase72-D02-advisor.md` (216 lines / ~27 KB) — D-02 full dossier (Option B intent-re-read + 4-deep chicken-and-egg lineage + 5-axis score matrix + V-72-CHAIN-{N} close-gate verification recipe + 72-VERIFICATION.md Section C SC#3 template + REQUIREMENTS.md:69 carve-out question)
- `.claude/tmp/phase72-D03-advisor.md` (~16 KB) — D-03 full dossier (Option B two-plan split + SC#4 wording delta from Phase 71 + Phase 71 D-04 inheritance scaling + Option D chicken-and-egg kill-shot rationale)
- `.claude/tmp/phase72-D04-advisor.md` (282 lines) — D-04 full dossier (Option A + δ combination + AUDIT-wrapper aliasing wedge + V-72-WRAPPER-NEG complementary negative invariant + drop-in pseudocode + D-01 coupling explicit)

### Optional cross-references (not load-bearing for plan)
- `scripts/validation/check-phase-{60..65}.mjs` CHAIN wrapper sites — Phase 73 RETRO-02 fold-in targets (documented in Phase 72 audit inventory but NOT modified)
- `scripts/validation/check-phase-48.mjs` line 72 — helper-spawn stderr-only site (Phase 73 RETRO-02 or v1.9+ disposition)
- `.planning/milestones/v1.7-MILESTONE-AUDIT.md` — closing harness baseline (Phase 72 must not alter v1.7 harness output per predecessor-byte-unchanged invariant)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- **Path-A validator template** — `scripts/validation/check-phase-71.mjs` (Phase 71 Plan 71-01 SHA `e4887b2`). Lines establish: imports (readFileSync, existsSync, execFileSync, join, process), `readFile()` helper with CRLF normalization (`check-phase-48.mjs:25` lineage), CHAIN_PHASES Set, CHAIN_SKIP empty-Set invariant (Phase 68 `7b635ca`), V-71-CHAIN wrapper topology (line 213 — currently stderr-only; fixed in Phase 72 Plan 72-01 Wave 1 per D-01 C boundary), V-71-AUDIT subprocess wrapper to v1.7-milestone-audit.mjs (line 236), V-71-SELF guard (no self-reference), runner-loop pattern (process.stdout.write per check-phase-71.mjs:283).
- **In-file AUDIT-wrapper precedent** — `check-phase-66.mjs:332-333` (stdout+stderr capture pattern already correct in the SAME file as the buggy CHAIN wrapper at line 313). This is the unambiguous fix-direction anchor — uniform pattern propagation, not novel design.
- **`readFile()` CRLF-normalization idiom** — `check-phase-48.mjs:25` + `check-phase-60.mjs:24` + `regenerate-supervision-pins.mjs:77`. `check-phase-72.mjs` inherits verbatim.
- **Atomic-within-plan pattern** — Phase 67 Plan 67-02 `55260b3` (5 files in ONE SHA) + Phase 71 Plan 71-01 `e4887b2` (3 files in ONE SHA). Plan 72-01 scales to 7 files: 6 wrapper edits (`check-phase-{66..71}.mjs`) + 1 NEW `check-phase-72.mjs`.
- **Per-plan close-gate pattern** — Plan 71-03 / Plan 70-05 Commit B / Plan 69-02 / Plan 68-05 all follow same close-gate shape (chain re-run + VERIFICATION.md + traceability flips across PROJECT/REQUIREMENTS/STATE/ROADMAP). Plan 72-02 inherits with delta-diff witness Section per D-02 Option B.

### Established Patterns

- **CHAIN_SKIP empty-Set invariant** — Permanent post-Phase 68 `7b635ca`. `check-phase-72.mjs` MUST declare `CHAIN_SKIP = new Set([])` (V-72-SELF assertion enforces).
- **CHAIN_PHASES exclusion of validator's own phase** — `check-phase-72.mjs` CHAIN_PHASES = {48..71} (does NOT include 72). V-72-SELF guard mirror of `check-phase-71.mjs:300`.
- **Uniform wrapper pattern (CHAIN ≡ AUDIT capture shape)** — Post-Phase-72-Plan-72-01, both CHAIN and AUDIT subprocess catch blocks across `check-phase-{66..72}.mjs` use the same `(stdout + stderr).slice(0, 300).trim()` shape. Future Phase 73 RETRO-02 helper-extraction may DRY this further by introducing `scripts/validation/_lib/exec-fail-detail.mjs` (Phase 68 `scripts/validation/_lib/archive-path.mjs` precedent) — but Option D was scored DOWN by D-01 advisor as overkill for the immediate fix.
- **Source-text regex anchored to topology marker (NOT byte-exact equality)** — Phase 71 V-71-FIX-01 established this pattern. Phase 72 V-72-WRAPPER-01..06 inherits: anchor on `execFileSync('node', [path], ...)` topology marker + 600-char catch-block window + presence/absence token checks; do NOT byte-equality-match the literal recommended snippet (Option C scored DOWN in D-04 for brittle-to-refactor).
- **Complementary negative invariant for whole-file class signature** — V-72-WRAPPER-NEG counts stderr-only catch blocks within CHAIN-wrapper window across FIXED_FILES → assert == 0. Closes the AUDIT-wrapper-aliasing wedge surfaced by D-04 advisor (check-phase-66.mjs:332-333 AUDIT wrapper already has both tokens; naive whole-file check would PASS on unfixed file).
- **Pre-fix vs post-fix chain delta-diff witness** — D-02 Option B SC#3 satisfaction mechanism: `.claude/tmp/72-chain-pre.txt` + `.claude/tmp/72-chain-post.txt` + delta-diff assertion (count-identical, detail-string-changed-only). Inherits Phase 70 Plan 70-04 `70-04-AUDIT-RESULTS.md` artifact-only-commit precedent for capturing chain outputs as witnesses.
- **Chicken-and-egg accepted-residual precedent depth** — Plan 68-05 → 69-02 → 70-05 Commit B → 71-01 Rule 4 Option A → **72-02 (this phase's contribution)**. Project doctrine for documented-transient at close-gate.
- **Predecessor-byte-unchanged anti-regression invariant** — REQUIREMENTS.md:69 — v1.4/v1.4.1/v1.5/v1.6/v1.7 workflow YAMLs + milestone-audit harness MJS + sidecar JSONs MUST be byte-identical pre/post-Plan-72-NN. `git diff Plan-71-03-SHA HEAD -- <predecessor surfaces>` returns EMPTY at Plan 72-01 commit time. Chain validators `check-phase-{60..70}.mjs` are NOT in that invariant (Phase 68 / Phase 73 precedent modifies them); Phase 72 modifies check-phase-{66..71}.mjs per D-01 C boundary.

### Integration Points

- **`scripts/validation/check-phase-72.mjs`** — NEW validator. Becomes the 20th in the chain (post-Phase-72; matches `check-phase-71.mjs` as the most-recent prior). Inherited by Phase 74 HARNESS-09 Path-A copy for `check-phase-73/74.mjs`.
- **6 wrapper-fixed validators (check-phase-{66..71}.mjs)** — modified at the CHAIN-regression-guard catch block only. Diff is mechanically uniform across files (same edit applied 6 times). Bisect-clean if WRAPPER-01 fix regresses, isolated to Plan 72-01 atomic SHA.
- **`.planning/phases/72-chain-wrapper-hardening-pillar-b/72-VERIFICATION.md`** — NEW close-gate artifact. V-72-AUDIT assertion targets this file (heading-presence check); transitions SKIP-PASS → PASS once Plan 72-02 lands. Section E hosts the 17-site per-validator audit inventory (D-04b δ — folded inventory).
- **`.planning/milestones/v1.8-DEFERRED-CLEANUP.md` CHAIN-DEGRADED-AT-HEAD-01 entry** — Plan 72-02 Wave 4 appends post-fix empirical signature observation (transitions from STUB → PARTIALLY-RESOLVED-EMPIRICAL-BASELINE-CAPTURED). Phase 73 RETRO-01 closes the entry fully.
- **`.github/workflows/audit-harness-v1.7-integrity.yml`** — UNCHANGED in Phase 72 (predecessor-byte-unchanged invariant). Phase 74 HARNESS-10 ships NEW `audit-harness-v1.8-integrity.yml` that includes `check-phase-72` job.
- **Phase 73 entry-state contract** — RETRO-01 class-wide scan inherits Phase 72's `72-VERIFICATION.md` Section E audit inventory as the empirical baseline for the 11 remaining stderr-only sites + reads Phase 72's empirical V-61-17 + V-67-05/06 stdout-diagnostic content (recorded in 72-VERIFICATION.md Section B Commands evidence) as the HEAD-coupled assertion class signature data. Phase 73 RETRO-02 catch-block fold-in for check-phase-{60..65}.mjs CHAIN wrappers + check-phase-{60, 61}.mjs AUDIT wrappers is **expected free passenger** alongside the assertion-conversion work.

</code_context>

<specifics>
## Specific Ideas

- **User invokes `/adversarial-review` for gray-area picks during /gsd-discuss-phase** (per user memory `feedback_adversarial_review_preference`). Phase 72 honored verbatim — 4 parallel `gsd-advisor-researcher` agents dispatched in adversarial-review mode (Finder/Adversary/Referee scoring); all 4 picks user-approved via single "Approve all 4" selection. D-01 advisor's empirical grep corrected the prompt estimate (17 sites NOT 16; check-phase-48.mjs has NO CHAIN wrapper) — directly attributable to the adversarial-review pattern's empirical-grounding requirement.
- **User maximum-effort preference** (per user memory `feedback_effort_level`) — every gray-area dossier produced concrete operational steps + acceptance criteria + anti-regression risk analysis + adversarial-wedge identification + drop-in pseudocode. Phase 72 dossiers averaged ~250 lines each.
- **Sequential-on-main-tree execution durable** (per user memory `project_execphase_sequential.md` + `.planning/config.json:7` `use_worktrees:false`). Plans 72-01 + 72-02 execute sequentially on the main tree. NO worktree experiments.
- **Phase 72 = Pillar B "Chain-Wrapper Hardening"** (per ROADMAP:333 + REQUIREMENTS:19). All decisions tilt toward minimum-blast-radius + file-disjoint-coordination-with-Phase-73 + maximum-revertibility WITHIN the SC#4 atomic-with-witness constraint. Wave B "sequential after Wave A — may overlap with Wave C" position lets it land before Wave D (Phase 74 milestone close) without blocking Phase 73 in-progress.
- **Today's date is 2026-06-06.** Phase 72 discussion authoring date. Frontmatter `last_verified:` bumps NOT needed (no `docs/*` corpus edits in v1.8; Plan 72-01 wrapper fixes are chain-validator tooling, not corpus).
- **"DO NOT mask via deletion — investigate the script" doctrine continued from Phase 71** — Phase 72 honors via UNIFORM-PATTERN-PROPAGATION: fix the wrapper to surface diagnostic detail, not silence the FAILs. Phase 73 then converts the now-visible HEAD-coupled assertions to frozen-aware (not deletion either).
- **Phase 71 entry-state synergy** (per `71-VERIFICATION.md` Section F) — Phase 72's value is dual: surface the masked stdout diagnostic AND fix the CHAIN-WRAPPER-01 literal contract. Plan 72-02 VERIFICATION.md Section B records V-61-17 + V-67-05/06 empirical stdout text as defense-in-depth for Phase 73 RETRO-01 inventory.
- **"30min surgical wrapper edit" effort baseline preserved** — v1.7-DEFERRED-CLEANUP.md:192 estimate honored for the literal SC#1 fix; D-01 Option C ownership boundary expands to 6 sites (uniform mechanical edit + ~2h impl + sweep + audit per advisor estimate); D-03 Option B compresses to 2 plans (within STATE.md upper bound).

</specifics>

<deferred>
## Deferred Ideas

### Already locked elsewhere (not new deferrals — recorded for downstream awareness)

- **11 remaining stderr-only sites** — Phase 73 fold-in:
  - CHAIN wrappers in check-phase-{60, 61, 62, 63, 64, 65}.mjs (6 sites) — folded into Phase 73 RETRO-02 catch-block free passenger alongside HEAD-coupled assertion conversion
  - AUDIT wrappers in check-phase-{60, 61}.mjs (2 sites) — v1.5 harness latent masking; folded into Phase 73 RETRO-02 alongside V-61-17 conversion
  - Helper-spawn sites in check-phase-{48, 60, 61}.mjs (3 sites) — lowest-risk class; Phase 73 plan-phase author discretion (Phase 73 RETRO-02 vs route to v1.9+ pickup)
- **HARNESS-FORWARD-01 + SCOPE-GAP-RETRO-01** retrospective scan + v1.5/v1.6/v1.7-frozen-aware conversion of check-phase-{48..66}.mjs — Phase 73 Pillar C (RETRO-01 + RETRO-02)
- **8 pre-existing V-71-CHAIN-{61..67, 70} FAILs** (CHAIN-DEGRADED-AT-HEAD-01) — Phase 73 RETRO-02 closes; Phase 72 surfaces empirical stdout signature as RETRO-01 inventory feed
- **v1.8 audit harness lineage bump** (HARNESS-07/08/09/10/11/12 + VPP-01) — Phase 74 Pillar D
- **ARCHIVE-UPSTREAM-01** — upstream PR to `get-shit-done-cc` (Phase 71 surfaced; Phase 74 HARNESS-12 finalizes the `v1.8-DEFERRED-CLEANUP.md` stub)
- **CI-3 Managed Apple ID corpus rename** (45 occurrences / 16 files) — DEFERRED to v1.9+ per Microsoft Intune portal rebrand-adoption trigger gate
- **Multi-tenant Apple Business / ABDevice API / per-OU CRD / Account Holder runbook / ASM** — all carried forward in `v1.8-DEFERRED-CLEANUP.md` (Phase 74 HARNESS-12 finalizes)

### Discovered during Phase 72 discussion (new for v1.8-DEFERRED-CLEANUP.md or v1.9+)

- **`scripts/validation/_lib/exec-fail-detail.mjs` helper-extraction opportunity** — D-01 Option D (DRY refactor across all CHAIN+AUDIT+helper-spawn wrappers) was scored DOWN as overkill for the immediate fix but flagged as a viable Phase 73 RETRO-02 sub-optimization OR v1.9+ pickup. The Phase 68 `scripts/validation/_lib/archive-path.mjs` precedent demonstrates the localizing pattern. Defer to Phase 73 plan-phase author's discretion: fold helper extraction into RETRO-02 sweep if natural, otherwise leave for v1.9+ chain-validator cleanup.
- **Slice-budget composite stdout+stderr standard** — Phase 72 sets slice budget to 300 (matching AUDIT wrapper). If Phase 73 RETRO-02 or post-WRAPPER-01 chain re-runs show V-61-17 + V-67-05/06 diagnostic text exceeding 300 chars, future Phase 73+ may want to widen. Capture empirical width observation in Phase 72 close-gate `.claude/tmp/72-chain-post.txt` for downstream calibration.
- **Possible Phase 73 RETRO-02 scope-discipline trigger** — If Phase 73 RETRO-01 inventory surfaces SCOPE-GAP-class discoveries beyond the documented 8-FAIL inventory + 11 stderr-only sites Phase 72 surfaces, REQUIREMENTS.md:67 anti-ballooning guardrail routes to v1.9+. Phase 72 records the 11-site baseline so Phase 73 has a clear inventory floor.

### Discussed but explicitly out of v1.8 scope

- **Worktree-based execution** — `use_worktrees:false` durable per `.planning/config.json:7` + memory `project_execphase_sequential.md`
- **Modifications to v1.4/v1.4.1/v1.5/v1.6/v1.7 workflow YAMLs / harness MJS / sidecar JSONs** — predecessor-byte-unchanged invariant
- **`docs/*` corpus edits** — v1.8 is tooling-only milestone
- **V-61-17 + V-67-05/06 frozen-aware conversion in Phase 72** — D-02 Option D rejected per REQUIREMENTS.md:67 anti-ballooning read as Phase-72-vs-73 discipline
- **Behavioral subprocess proof for V-72-WRAPPER-01** — D-04 Option B rejected as disproportionate to 30-min wrapper fix + cross-OS unreliability risk
- **Chicken-and-egg SHA placeholder for Plan 72-01 → 72-02** — D-03 Option D rejected as unnecessary mechanism (no forward-coupled references to Phase 72 closing SHA exist)
- **Three-plan split mirroring Phase 71 D-04** — D-03 Option C rejected as cargo-cult without honoring requirement-count delta (Phase 71: 2 reqs / 3 plans → Phase 72: 1 req / 2 plans)
- **Standalone AUDIT-REPORT-WRAPPER-01.md artifact** — D-04 Option β rejected per Phase 71 lesson (verification IS the audit record; folded into 72-VERIFICATION.md Section E)

</deferred>

---

*Phase: 72-chain-wrapper-hardening-pillar-b*
*Context gathered: 2026-06-06*
