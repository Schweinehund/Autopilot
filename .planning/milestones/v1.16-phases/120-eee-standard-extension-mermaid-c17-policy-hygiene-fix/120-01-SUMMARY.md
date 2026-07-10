---
phase: 120-eee-standard-extension-mermaid-c17-policy-hygiene-fix
plan: 01
subsystem: docs-standard
tags: [eee-sop, c17, mermaid, doc-type-taxonomy, validation-harness]

# Dependency graph
requires:
  - phase: 119-frozen-surface-rebaseline-lineage-bump-close
    provides: EEE-SOP-standard.md (STD-001) + c17-eee-contract.mjs (13-assertion validator) as shipped v1.15 artifacts
provides:
  - "Mermaid-in-Enrolled-Classes Policy (STD-04): D-01 text-equivalent conversion rule, D-02 C17 #1 byte-unchanged, D-03 conversion shapes, D-04 honesty caveat"
  - "4 new D-02 Edge-case rulings: glossary->Reference, decision-tree->Reference, nav-hub->Reference, lifecycle->Guide"
  - "D-08 Non-MECE precedence rule: directory precedence -> dominant body structure -> tie-to-Reference"
  - "C17 Enforcement Reference row 1 cross-reference + Version History row + comment-only pointer near assertion #1"
affects: [122-structural-retrofit-decision-trees-carved-mermaid, 121-structural-retrofit-glossaries-lifecycle-end-user-guides, 123-orphan-nav-hub-retrofit]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Comment-only cross-reference pattern for locked/frozen validator logic (assertion text/regex untouched, only doc-comments added)"
    - "Illustrative summary table kept separate from a frozen controlled-vocabulary table (5-row Doc Type mapping vs. the untouched 4-row Doc Type Taxonomy)"

key-files:
  created: []
  modified:
    - docs/_standards/EEE-SOP-standard.md
    - scripts/validation/c17-eee-contract.mjs

key-decisions:
  - "D-01/D-02/D-03/D-04 (Mermaid policy) and D-07/D-08 (taxonomy edge rulings) written into the standard verbatim to CONTEXT.md's locked substance; prose wording is this plan's discretion only"
  - "D-04 honesty caveat written as plain prose (no blockquote) to avoid any risk of tripping C17 assertion #12's 200-char blockquote limit"
  - "5-class Doc Type mapping table kept as a separate illustrative 5-row/3-column table, not merged into or replacing the frozen 4-row Doc Type Taxonomy table"
  - "Comment-only pointer added above c17-eee-contract.mjs's hasMermaid line; wording avoids the literal substring CHAIN_PHASES and preserves --self-test / C17 assertion-violation-counts: strings"

requirements-completed: [STD-04]

# Metrics
duration: 6min
completed: 2026-07-07
---

# Phase 120 Plan 01: EEE Standard Extension — Mermaid/C17 Policy Summary

**Codified the Mermaid-in-enrolled-classes text-equivalent-conversion policy (STD-04) and 4 new Doc Type edge rulings into EEE-SOP-standard.md, with C17 assertion #1 left byte-unchanged and zero regression across all four baseline validator runs.**

## Performance

- **Duration:** 6 min
- **Started:** 2026-07-07T15:01:37Z
- **Completed:** 2026-07-07T15:06:55Z
- **Tasks:** 2 completed
- **Files modified:** 2

## Accomplishments
- Added the "Mermaid-in-Enrolled-Classes Policy (STD-04)" top-level section to EEE-SOP-standard.md, stating D-01 (text-equivalent conversion, not a carve-out), D-02 (C17 assertion #1 stays unchanged), D-03 (decision-table/list and sequence-step-list conversion shapes with the RE-068 / `10-8021x-triage.md` exemplars), and D-04 (the honesty caveat that a green C17 run does not attest leaf-completeness)
- Appended 4 new `### D-02 Edge-case rulings` bullets (glossary, decision-tree, nav-hub, lifecycle) plus an illustrative 5-row/3-column Doc Type mapping table, and added the `#### Non-MECE precedence rule (D-08)` subsection with its 3-step tie-breaker and two worked resolutions
- Cross-referenced C17 Enforcement Reference assertion row 1's "Source in this standard" column to the new policy section, added a dated Version History row, and added a comment-only pointer above `c17-eee-contract.mjs`'s `hasMermaid` line — assertion #1 logic and the `inCodeFence` mask are byte-for-byte unchanged (confirmed via `git diff`: only 3 comment lines added)
- Verified zero regression across all four baseline commands (self-test 4/4, corpus 174 files/0 violations, check-phase-115 7/7, v1.15-milestone-audit 16/16) and confirmed zero `CHAIN_PHASES` occurrences in the validator file

## Task Commits

1. **Task 1: Extend EEE-SOP-standard.md with the Mermaid policy, 4 new D-02 rulings, and the D-08 precedence rule** - `4763020` (feat)
2. **Task 2: Cross-reference C17 assertion #1 to the new standard section (comment-only) and prove zero regression** - `f452856` (docs)

_No TDD tasks in this plan — documentation-standard authoring + comment-only validator edit._

## Files Created/Modified
- `docs/_standards/EEE-SOP-standard.md` - New "Mermaid-in-Enrolled-Classes Policy (STD-04)" section; 4 new D-02 bullets + illustrative 5-row Doc Type mapping table; new "Non-MECE precedence rule (D-08)" subsection; C17 Enforcement Reference row 1 cross-reference updated; new dated Version History row
- `scripts/validation/c17-eee-contract.mjs` - 3-line comment-only pointer added above the `hasMermaid` assertion-#1 line; zero logic changes

## Decisions Made
- Wrote the D-04 honesty caveat as plain prose rather than a blockquote — sidesteps any risk of the >200-char blockquote assertion (#12) on a dense single-sentence caveat, per RESEARCH Pitfall 3 guidance
- Kept the 5-class illustrative Doc Type mapping table to exactly 5 rows / 3 columns and placed it inside the D-02 prose (not as a modification to the frozen 4-row Doc Type Taxonomy table), per RESEARCH Pitfall 2 / Anti-Patterns guidance
- Named `docs/decision-trees/10-8021x-triage.md`'s "Routing Verification" table and `docs/l2-runbooks/26-apple-business-permission-denied.md` (RE-068) as the in-corpus D-03 exemplars, matching CONTEXT.md's canonical references exactly
- Phrased the comment-only C17 pointer using "policy + rationale... documented in docs/_standards/EEE-SOP-standard.md" — verified it contains no literal `CHAIN_PHASES` substring and does not alter the `--self-test` or `C17 assertion-violation-counts:` strings

## Deviations from Plan

None - plan executed exactly as written. Both tasks' `<action>` and `<acceptance_criteria>` items were completed as specified; no Rule 1-4 auto-fixes were needed since this was a pure additive-prose + comment-only edit with no runtime behavior to break.

## Issues Encountered

None. All four baseline validation commands (self-test, corpus run, check-phase-115, v1.15-milestone-audit) passed identically before and after every edit, confirmed by direct execution at each checkpoint.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 122 (RETRO-05/RETRO-08, decision-trees + carved-mermaid retrofit) is now unblocked: the STD-04 Mermaid policy (D-01..D-04) is locked and cited, giving those retrofits a concrete conversion rule (decision table/list shapes, leaf-count LOCKED invariant, honesty caveat) to follow
- Phase 121 (RETRO-04/07/09, glossaries/lifecycle/end-user-guides) can consume the new D-07 Doc Type rulings (glossary/lifecycle mappings) and the D-08 precedence rule for any non-MECE classification decisions
- Phase 123 (RETRO-06, nav-hub retrofit) can consume the nav-hub->Reference D-07 ruling
- Plan 120-02 (HYG-01 stale `frozen-at-close.mjs` header-comment fix) remains outstanding within Phase 120 — not part of this plan's scope
- No blockers identified for downstream phases

---
*Phase: 120-eee-standard-extension-mermaid-c17-policy-hygiene-fix*
*Completed: 2026-07-07*

## Self-Check: PASSED

- FOUND: docs/_standards/EEE-SOP-standard.md
- FOUND: scripts/validation/c17-eee-contract.mjs
- FOUND: commit 4763020 (Task 1)
- FOUND: commit f452856 (Task 2)
