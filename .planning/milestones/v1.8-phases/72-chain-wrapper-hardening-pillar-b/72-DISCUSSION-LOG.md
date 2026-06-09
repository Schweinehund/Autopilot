# Phase 72: Chain-Wrapper Hardening (Pillar B) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-06
**Phase:** 72-chain-wrapper-hardening-pillar-b
**Areas discussed:** D-01 Wrapper-fix scope, D-02 SC#3 reconciliation, D-03 Plan layout + atomicity, D-04 check-phase-72.mjs design
**Discussion mode:** `/gsd-discuss-phase 72 --chain` + per-area `/adversarial-review` (4 parallel `gsd-advisor-researcher` agents, Finder/Adversary/Referee scored)
**Approval method:** Single `Approve all 4 — proceed to CONTEXT.md` selection (mirroring Phase 71 D-01..D-04 lock pattern)

---

## D-01: Wrapper-fix scope

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A — Surgical (literal SC#1 only) | Fix only check-phase-66.mjs:313; per-validator audit produces documentation-only AUDIT-REPORT.md for Phase 73 / v1.9+ pickup. Honors "fixed OR documented" via documented branch. Single-file diff; trivially revertable; 1 plan; ≤30min impl. | 9 | |
| B — Full sweep (uniform across all CHAIN wrappers) | Fix all 13 stderr-only CHAIN wrappers in check-phase-{48, 60, 61, 62..71}.mjs + 2 stderr-only AUDIT wrappers in check-phase-{60, 61}.mjs in one atomic commit. ~17 files / 1 plan / single atomic SHA. Risks: ballooning + colliding with Phase 73's exact RETRO-02 file set. | 9 | |
| **C — Phase 72 ownership boundary (check-phase-{66..71}.mjs)** | **Fix CHAIN wrappers in 66, 67, 68, 69, 70, 71 (6 files). Document remaining 11 sites for Phase 73 fold-in as RETRO-02 catch-block free passenger. File-disjoint with Phase 73; allows overlapping execution per STATE.md:128-130. Empirical grep correction by advisor: 17 sites NOT 16 (check-phase-48.mjs has no CHAIN wrapper).** | **6** | **✓** |
| D — Helper-extraction (DRY refactor) | Extract scripts/validation/_lib/exec-fail-detail.mjs formatExecFailDetail(err) helper; refactor all CHAIN+AUDIT wrappers to use the helper. Maximum future-proofing. ~16 files + 1 NEW lib file / 1-2 plans. Risks: largest blast radius; over-abstracts for a 30-min surgical fix. | 10 | |

**User's choice:** Approve all 4 — Option C locked
**Notes:** Adversarial wedge that decided it (advisor dossier `.claude/tmp/phase72-D01-advisor.md`): Option A's "documented" branch leaves Phase 73 working against a half-masked diagnostic surface when RETRO-01 invokes check-phase-61/67.mjs standalone (their inner wrappers stay broken). Option B's wholesale sweep collides with Phase 73's exact RETRO-02 file set (60/61/67). Option C threads the needle: fixes SC#1 line 313 + propagates uniform pattern to 67..71 (Pillar B's natural v1.7/v1.8 era) + documents remaining 11 sites for Phase 73 RETRO-02 fold-in. Option D's helper-extraction is correctly flagged as a Phase 73 RETRO-02 sub-optimization opportunity or v1.9+ pickup — deferred.

---

## D-02: SC#3 reconciliation strategy

| Option | Description | Score (out of 25) | Selected |
|--------|-------------|-------|----------|
| A — Literal SC#3 (close-gate blocks until 0 FAIL) | Phase 72 close-gate requires actual 0 FAIL / 0 SKIPPED chain exit. Forces either Phase 73 scope-bleed (pull V-61-17 + V-67-05/06 conversion into Phase 72) OR Wave inversion (Phase 73 closes before Phase 72). | 22 | |
| **B — Intent re-read with "no false positives introduced" anchor** | **Phase 72 close-gate satisfies SC#3 via the second-clause discriminator. 8 pre-existing V-71-CHAIN-{61..67,70} FAILs are accepted-residual per Plan 68-05 / 70-05 Commit B / 71-01 chicken-and-egg precedent (4-deep lineage). Close-gate validator V-72-WRAPPER-01 + V-72-AUDIT + V-72-CHAIN-{48..71 minus pre-existing-residual} PASS. Pre-vs-post chain delta-diff witness proves count-identical pre/post.** | **6** | **✓** |
| C — Cross-phase close-gate (Phase 72 + 73 jointly satisfy SC#3) | Phase 72 plan-phase explicitly contracts SC#3 satisfaction to Phase 73 close-gate. Phase 72 VERIFICATION.md SC#3 line reads "DEFERRED to Phase 73 close-gate per cross-phase contract." | 14 | |
| D — Surgical V-61-17 conversion in Phase 72 | Phase 72 brings ONE narrow frozen-aware conversion in-scope — V-61-17 (root of 7-FAIL cascade). The cascade collapses naturally; only V-67-05/06 remain. Phase 73 owns V-67-05/06 + class-wide scan + per-validator audit-doc. | 21 | |

**User's choice:** Approve all 4 — Option B locked
**Notes:** Adversarial wedges (advisor dossier `.claude/tmp/phase72-D02-advisor.md`): Option A forces Wave B/C collapse (defeats ROADMAP.md:194-196 + STATE.md:129-130). Option D violates REQUIREMENTS.md:67 anti-ballooning guardrail read as Phase-72-vs-73 discipline; also partial satisfaction (V-67-05/06 remain) means even the surgical expansion fails SC#3 first-clause literally. Option C creates a precedent vacuum (every prior chicken-and-egg accepted-residual is INTRA-phase, not INTER-phase). Option B's "depends on running the chain pre-fix to establish baseline" wedge is operationally tractable — `.claude/tmp/71-03-chain-rerun.txt` already serves as the canonical pre-fix witness; Phase 72 close-gate only needs `.claude/tmp/72-chain-post.txt` + delta-diff proving 21 PASS / 8 FAIL / 0 SKIPPED IDENTICAL count with only `detail:` strings changing.

---

## D-03: Plan layout + atomic-commit composition

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A — Single-plan one-shot atomic | Plan 72-01 lands EVERYTHING in one atomic commit (wrapper fix + check-phase-72.mjs + AUDIT-REPORT + 72-VERIFICATION.md + traceability flips + DEFERRED-CLEANUP updates). One SHA satisfies SC#4 byte-exactly. | 12 | |
| **B — Two-plan atomic split (fix+validator / close-gate)** | **Plan 72-01 atomic commit = 6 wrapper fixes + check-phase-72.mjs (7 files in ONE SHA satisfying SC#4 byte-exact). Plan 72-02 = chain re-run + 72-VERIFICATION.md + traceability flips + v1.8-DEFERRED-CLEANUP.md updates. Two SHAs total. Bisect-clean code-only commit. Matches STATE.md plan estimate's upper bound exactly.** | **6** | **✓** |
| C — Three-plan split (mirror Phase 71 D-04) | Plan 72-01 atomic = wrapper fix + check-phase-72.mjs; Plan 72-02 = AUDIT-REPORT.md (separate commit); Plan 72-03 = close-gate VERIFICATION.md + traceability + DEFERRED-CLEANUP.md updates. Three SHAs. Exceeds STATE.md plan estimate. | 13 | |
| D — Two-commit chicken-and-egg (Phase 70 Plan 70-05 Commit A+B precedent) | Plan 72-01 atomic Commit A = wrapper fix + check-phase-72.mjs with `{phase_72_close_SHA}` placeholder. Plan 72-02 Commit B = VERIFICATION.md SHA substitution + traceability + DEFERRED-CLEANUP.md updates. Two SHAs but tighter close-gate coupling. | 11 | |

**User's choice:** Approve all 4 — Option B locked
**Notes:** Adversarial wedges (advisor dossier `.claude/tmp/phase72-D03-advisor.md`): Option A interleaves traceability + code (defeats bisect-on-fix-only convention from Phase 67 Plan 67-02 / Phase 71 Plan 71-01). Option D's chicken-and-egg SHA placeholder is a solution looking for a problem — Phase 72 has zero forward-coupled references to its own closing SHA (unlike Phase 70 where check-phase-NN.mjs validators needed it). Option C cargo-cults Phase 71 D-04 without honoring requirement-count delta (Phase 71: 2 reqs → 3 plans; Phase 72: 1 req → 2 plans). SC#4 wording delta from Phase 71 ("with the regression fixture") to Phase 72 ("the chain-apex fix lands atomically") confirms 2-plan split is byte-exact compliant — Plan 72-01 atomic SHA = "the chain-apex fix lands atomically" verbatim.

---

## D-04: check-phase-72.mjs validator-as-deliverable design

### D-04a — V-72-WRAPPER-01 assertion shape

| Option | Description | Score (5 axes) | Selected |
|--------|-------------|-------|----------|
| **A — Source-text regex (parameterized over FIXED_FILES)** | **Read each file in FIXED_FILES = [66..72]; regex-match the catch block at the CHAIN-wrapper site for BOTH `err.stderr` AND `err.stdout` tokens within the same try/catch. ADD V-72-WRAPPER-NEG negative invariant for whole-file class signature (counts stderr-only catch blocks within CHAIN-wrapper window → assert == 0).** | **9** | **✓** |
| B — Behavioral subprocess proof (round-trip stub) | V-72-WRAPPER-01 spawns check-phase-66.mjs with a temp stub-failing peer; asserts captured detail contains the stub's stdout token. Strongest semantic guarantee. Implementation complex; cross-OS unreliability. | 14 | |
| C — Exact snippet equality (strict literal) | Grep-checks check-phase-66.mjs for the literal recommended snippet `((err.stderr || '').toString() + (err.stdout || '').toString())`. Maximum literal compliance; brittle to any refactor. | 16 | |
| D — Multi-file pattern check (one V-72-WRAPPER-N per fixed file) | One V-72-WRAPPER-N assertion per fixed file. Only viable if D-01 picks a sweep option. | (D-01 dependent) | |

### D-04b — V-72-AUDIT-N record placement

| Option | Description | Score (5 axes) | Selected |
|--------|-------------|-------|----------|
| α — In-file audit comments | Each fixed CHAIN-wrapper file gets a 1-2-line comment `// CHAIN-wrapper stderr+stdout capture (WRAPPER-01)`; V-72-AUDIT counts these comments. | 12 | |
| β — External AUDIT-REPORT.md artifact | `.planning/phases/72-.../72-AUDIT-REPORT.md` enumerates all 17 sites with per-file status; V-72-AUDIT asserts the file exists + matches schema. | 14 | |
| γ — Sidecar JSON | `scripts/validation/wrapper-audit-72.json` machine-readable site inventory; V-72-AUDIT loads + asserts coverage. | 15 | |
| **δ — Folded into 72-VERIFICATION.md** | **No separate audit artifact; 72-VERIFICATION.md Section E hosts the audit table; V-72-AUDIT asserts 72-VERIFICATION.md exists post-Plan-72-02 with the "Per-Validator Audit Inventory" heading.** | **8** | **✓** |

**User's choice:** Approve all 4 — D-04a Option A + D-04b Option δ combination locked
**Notes:** Adversarial wedges (advisor dossier `.claude/tmp/phase72-D04-advisor.md`):
- D-04a Option A's naive regex admits AUDIT-wrapper aliasing — check-phase-66.mjs:332-333 AUDIT wrapper already has both tokens; a whole-file token count would PASS on the unfixed file. Mitigation: anchor regex to `execFileSync('node', [path], ...)` topology marker + 600-char catch-block window, scoping to CHAIN-regression-guard specifically. ADD V-72-WRAPPER-NEG complementary negative invariant.
- D-04a Option C (exact snippet equality) brittle to refactor — Phase 73 RETRO-02 might extract a `captureSubprocessOutput(err)` helper; Option C would FAIL the helper-refactored file even though the helper IS the right cleanup. Phase 71 V-71-FIX-01 deliberately avoided this brittleness (uses anchored regex, not byte-exact snippet).
- D-04a Option B (behavioral) disproportionate to 30-min wrapper fix + cross-OS unreliability + CHAIN_PHASES topology violation.
- D-04b Option β (external AUDIT-REPORT.md) duplicates content 72-VERIFICATION.md already covers (Phase 71 lesson — verification IS the audit record). Option α (in-file comments) bloats source files across 6 sites with low signal value. Option γ (sidecar JSON) introduces a new machine-readable artifact class that doesn't exist elsewhere in v1.5+ validation tooling.
- **D-04a A + D-04b δ combination inherits Phase 71 V-71-FIX-01 idiom + V-71-AUDIT shape verbatim** — no new convention introduced; scales gracefully across the D-01 surgical-vs-sweep branches via parameterized FIXED_FILES array; total cost matches the 30-min wrapper-fix proportionality.
- **Self-dogfood call-out:** check-phase-72.mjs's own CHAIN wrapper (Path-A from check-phase-71.mjs:213) MUST be authored with the new stdout+stderr pattern from NEW-file-authoring time (not buggy-then-fixed) — V-72-WRAPPER-07 in FIXED_FILES self-assertion. Phase 71 V-71-CHAIN wrapper ate its own dogfood (was authored buggy and stayed buggy through Phase 71 close); Phase 72 explicitly breaks the cycle.

---

## Claude's Discretion

The following implementation details were left to the planner's discretion (recorded for plan-phase author awareness):

- Exact `CHAIN_WRAPPER_ANCHOR` regex (`execFileSync(...)` anchor + 200-char gap + catch + 600-char window) — planner verifies empirically against all 7 files at Plan 72-01 Wave 2; tune the gap window if false-positives surface
- Slice budget for composite stdout+stderr (recommended 300, matching AUDIT-wrapper precedent)
- Whether Plan 72-01 Wave 4 re-captures `.claude/tmp/72-chain-pre.txt` OR Plan 72-02 Wave 1 uses `.claude/tmp/71-03-chain-rerun.txt` as the pre-fix witness — recommend re-capture for clean delta-diff
- Whether to expand FIXED_FILES to include AUDIT wrapper sites in check-phase-{60, 61}.mjs (only if Plan 72-01 author finds those 2 sites trivial to fix in-Phase-72; recommend NOT — route to Phase 73 RETRO-02 per D-01 C boundary)
- Whether 72-VERIFICATION.md Section F (Discoveries) drafts a new v1.8-DEFERRED-CLEANUP.md stub for any newly-discovered wrapper class beyond the 17-site inventory — recommend defensive draft if anything surfaces
- Whether to record empirical V-61-17 + V-67-05/06 stdout-diagnostic content in 72-VERIFICATION.md Section B Commands evidence — recommend YES; defense-in-depth for Phase 73 RETRO-01 inventory

## Deferred Ideas

The following came up during Phase 72 discussion but belong elsewhere:

- **`scripts/validation/_lib/exec-fail-detail.mjs` helper-extraction** — D-01 Option D was scored DOWN as overkill for the immediate fix but flagged as a Phase 73 RETRO-02 sub-optimization opportunity OR v1.9+ pickup. The Phase 68 `scripts/validation/_lib/archive-path.mjs` precedent demonstrates the localizing pattern.
- **11 remaining stderr-only sites** — Phase 73 fold-in:
  - 6 CHAIN wrappers in check-phase-{60..65}.mjs (Phase 73 RETRO-02 catch-block free passenger)
  - 2 AUDIT wrappers in check-phase-{60, 61}.mjs (Phase 73 RETRO-02 alongside V-61-17 conversion)
  - 3 helper-spawn sites in check-phase-{48, 60, 61}.mjs (Phase 73 plan author discretion; or v1.9+ if scope-discipline triggered)
- **Slice-budget composite stdout+stderr standard** — Phase 72 sets 300; if V-61-17 + V-67-05/06 diagnostic text exceeds 300 chars, Phase 73+ may widen. Capture empirical width in Phase 72 close-gate `.claude/tmp/72-chain-post.txt` for downstream calibration.
- **Phase 73 RETRO-02 scope-discipline trigger** — If Phase 73 RETRO-01 inventory surfaces SCOPE-GAP-class discoveries beyond the documented 8-FAIL inventory + 11 stderr-only sites Phase 72 surfaces, REQUIREMENTS.md:67 anti-ballooning guardrail routes to v1.9+. Phase 72 records the 11-site baseline so Phase 73 has a clear inventory floor.
- **V-72-WRAPPER assertion design extensibility to Phase 74 HARNESS-09** — Phase 74 will Path-A copy check-phase-72.mjs for check-phase-{73, 74}.mjs; the parameterized FIXED_FILES design (D-04a Option A) makes that copy mechanical (add 73, 74 to the array). No Phase 74 redesign needed.
