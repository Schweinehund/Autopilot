---
phase: 120-eee-standard-extension-mermaid-c17-policy-hygiene-fix
reviewed: 2026-07-07T00:00:00Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - docs/_standards/EEE-SOP-standard.md
  - scripts/validation/c17-eee-contract.mjs
  - scripts/validation/_lib/frozen-at-close.mjs
findings:
  critical: 0
  warning: 1
  info: 2
  total: 3
status: issues_found
---

# Phase 120: Code Review Report

**Reviewed:** 2026-07-07
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

Phase 120 is an EDIT-ONLY documentation-standard + validator phase. I reviewed the three
in-scope files against the LOCKED constraints from CONTEXT/RESEARCH and for internal consistency
of the edits.

**All three LOCKED constraints are satisfied — no Critical findings:**

1. **c17-eee-contract.mjs assertion #1 — byte-unchanged behavior.** Confirmed via `git show f452856`:
   the change is exactly 3 added comment lines (206-208) above the `hasMermaid` line. The
   `hasMermaid` expression (line 209, `/^```mermaid/`) and the `inCodeFence` mask are byte-for-byte
   unchanged. The file contains **zero** occurrences of the literal `CHAIN_PHASES` (grep count 0),
   satisfying the `check-phase-115.mjs` V-115-STANDALONE absence assertion. `--self-test` exits 0
   (4/4 PASS) and `node --check` passes.
2. **frozen-at-close.mjs HYG-01 — comment-only.** Confirmed via `git show 4e2cb18`: only the header
   STATUS comment block (lines 2-17) changed. `MILESTONE_CLOSE_SHAS`, `readAtClose`, and all
   convenience exports are untouched. `node --check` passes.
3. **EEE-SOP-standard.md Doc Type Taxonomy — exactly 4 values.** The controlled-vocabulary table
   (lines 127-132) still contains exactly `Runbook | Guide | RCA | Reference`. The 5-row "structural
   classes" table (lines 161-167) is explicitly illustrative and does not add a `doc_type` value.
   New D-02 rulings are bullets; the D-08 precedence rule is a numbered list; the sole blockquote
   (line 369) is well under 200 chars; no table exceeds 25 rows — so the doc does not trip its own
   C17 assertions #11/#12. No ruling contradicts an existing one; the decision-tree/lifecycle
   worked resolutions are internally consistent with both the D-02 bullets and the D-08 rules.

Two residual quality defects were found: the HYG-01 comment correction, though comment-only,
replaces an understated stale claim with an **overstated and self-contradictory** one that is
inaccurate for `check-phase-61.mjs` (WR-01); and a decision-ID citation inconsistency in the
EEE-SOP taxonomy section (IN-01).

## Warnings

### WR-01: HYG-01 corrected comment is inaccurate and self-contradictory for check-phase-61.mjs

**File:** `scripts/validation/_lib/frozen-at-close.mjs:5-17`
**Issue:** HYG-01's stated purpose is to fix a *stale* header comment (the old "EXISTING inline
helpers in check-phase-{61,67,68,70}.mjs REMAIN INLINE"). The replacement overshoots and is itself
inaccurate for one of the four named files:

- The new header (lines 6-9) asserts: *"ALL chain validators, including check-phase-{61, 67, 68,
  70}.mjs, now consume readers from this centralized module. The prior inline-helper duplication in
  those four files was refactored away and **centralized here**."*
- Ground truth for `check-phase-61.mjs`: it imports `readAtV15Close` from this module but uses it
  **only** for the MILESTONES.md reads (V-61-17..20, lines 271-323). Its primary v1.5-frozen reads
  for REQUIREMENTS/ROADMAP (V-61-01..08) go through a **local** function `readAtV15CloseFor61`
  (lines 39-45) that runs its own `execFileSync('git', ['show', 'ba2cbc0:'...])` with a
  **hardcoded** SHA and **deliberately omits stdio** to preserve the removed inline reader's
  stderr-leak behavior (Landmine C, line 38). That reader was *consolidated* (2 helpers → 1
  wrapper) but was **not** "centralized here" — it remains local by design.
- The same corrected comment block **contradicts itself on direction**: lines 6-9 say the readers
  were "centralized **here**" (into this module), while lines 16-17 say they were "consolidated
  **into** check-phase-{61,67,68,70}.mjs" — the opposite direction of consolidation.

By contrast, `check-phase-67/68/70.mjs` genuinely delegate to the module (e.g.
`check-phase-70.mjs:42` `return readAtV17Close(relPath)`), so the claim is accurate for those three.

Note: this is a WARNING, not a Critical — the LOCKED "comment-only, no functional change" constraint
IS satisfied (git diff confirms zero code change). The defect is that a hygiene fix whose entire
value is comment accuracy landed a still-inaccurate, self-contradictory comment.

**Fix:** Scope the claim to what is true and remove the directional contradiction, e.g.:
```
// STATUS (corrected v1.16 Phase 120 HYG-01 — see .planning/REQUIREMENTS.md HYG-01):
//   - check-phase-{67,68,70}.mjs delegate their frozen reads to this module's readers
//     (v1.14 Phase 111, Plan 111-01 Tasks 3-4).
//   - check-phase-61.mjs imports readAtV15Close for its MILESTONES.md reads, but retains a
//     deliberate LOCAL reader (readAtV15CloseFor61) with a hardcoded v1.5-close SHA and
//     divergent stdio (Landmine C) for its REQUIREMENTS/ROADMAP reads — that path is NOT
//     centralized here.
//   - FROZEN-AWARE-ADOPTION-SWEEP-01 (the broader sweep) remains deferred.
```
Delete or reword the "consolidated into check-phase-{61,67,68,70}.mjs" clause (lines 16-17) so it
no longer claims the opposite consolidation direction.

## Info

### IN-01: Decision-ID citation inconsistency for the five structural classes (D-07 vs D-05)

**File:** `docs/_standards/EEE-SOP-standard.md:144-159`
**Issue:** The four new edge-case ruling bullets (glossary line 144, decision-tree line 146,
nav-hub line 151, lifecycle line 154) each cite the originating decision as `(v1.16 D-07)`. The
immediately following summary-table intro (line 158) attributes the *same* class-set — "The five
structural classes newly mapped in v1.16 (**D-05**)" — to `D-05`. Same rulings, two different
decision IDs within four lines. A reader tracing provenance cannot tell whether these classes were
mapped under D-05 or D-07.
**Fix:** Use one consistent decision ID (the bullets use D-07 four times, so line 158 `(D-05)` is
the likely typo → change to `(v1.16 D-07)`), or add a one-line note distinguishing D-05 (decision
to add the illustrative summary table) from D-07 (the classification rulings) if they are genuinely
distinct decisions.

### IN-02: Decision-ID namespace is reused across milestones (D-01/D-02/D-05 collisions)

**File:** `docs/_standards/EEE-SOP-standard.md:80, 93, 158, 404-442`
**Issue:** Decision identifiers `D-0x` are reused across milestone contexts with different meanings:
v1.15 uses `D-01` for "owner frontmatter-only" (line 93) and `D-05` for the visible-header-block
format spec (line 80); the new v1.16 STD-04 Mermaid policy reuses `D-01`..`D-04` (lines 404-442)
for entirely different decisions, and line 158 reuses `D-05` for a v1.16 mapping. This is a
pre-existing convention rather than a Phase-120 regression, but the STD-04 additions widen the
collision surface and make bare `D-0x` references ambiguous without a milestone qualifier.
**Fix:** Non-blocking. Prefer always qualifying with the milestone (the STD-04 section and the new
bullets already mostly do this, e.g. `(v1.16 D-07)`); the pre-existing v1.15 `D-05`/`D-01`
references at lines 80/93 could optionally be namespaced `(v1.15 D-05)` for symmetry.

---

_Reviewed: 2026-07-07_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
