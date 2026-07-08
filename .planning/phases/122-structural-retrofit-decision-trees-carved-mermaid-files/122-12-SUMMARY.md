---
phase: 122-structural-retrofit-decision-trees-carved-mermaid-files
plan: 12
subsystem: docs
tags: [c17-eee-contract, d-01-verification, decision-trees, mermaid-conversion, leaf-parity]

# Dependency graph
requires:
  - phase: 122-02..122-05
    provides: all 11 decision-trees (docs/decision-trees/00..10) converted from Mermaid to C17-compliant text-equivalent tables, enrolled RE-207..217, Status Approved
provides:
  - Independent D-01 leaf-parity re-derivation ledger for all 11 decision-trees (RE-207..217) -- a separate agent's read-only re-derivation of each pre-conversion Mermaid element set (git show 71be4ab) diffed against the converted table, per CONTEXT D-01
  - Confirmation that RETRO-05's leaf-preservation obligation (STD-04 D-04 human gate) holds across the full decision-tree class, with zero gaps
affects: [122-13, 122-14, 122-15, 125-v115-pin-lineage-bump-terminal-close]

# Tech tracking
tech-stack:
  added: []
  patterns: [read-only D-01 independent re-derivation plan (git show base-bytes diff, no validator chain, no checkout); adversarial second-agent verification distinct from the authoring agent per D-01 RIDER 3]

key-files:
  created:
    - .planning/phases/122-structural-retrofit-decision-trees-carved-mermaid-files/122-12-SUMMARY.md
  modified: []

key-decisions:
  - "Independently re-derived LOCKED-N for all 11 decision-trees directly from git show 71be4ab base bytes (node-by-node, edge-by-edge manual enumeration), not by trusting the converted file's own annotation or the converting agent's SUMMARY reasoning (D-01 RIDER 4 / T-122-09 mitigation)"
  - "08-android-triage.md: independent re-derivation confirms 39 (14 nodes + 25 labeled edges), matching the correction already recorded in STATE.md [Phase 122-02] and the file's current LOCKED-39 annotation -- NOT the RESEARCH.md/plan's original precomputed 38. This independently confirms the prior plan's off-by-one correction was itself correct."
  - "10-8021x-triage.md: independent re-derivation confirms 11 (6 nodes + 5 labeled edges) under the R1 nodes-plus-labeled-edges convention, matching the file's already-upgraded LOCKED-11 annotation (from the older 5-leaf-count convention) -- confirms the 122-05 upgrade was correct"
  - "All 11 files: zero stale diagram-prose found (click the leaf|node shape|classDef|## Legend all return 0); zero remaining mermaid fences (grep -c '^```mermaid' = 0 on all 11); zero subgraph/classDef remnants corpus-wide"
  - "No gaps found across all 11 files -- every node, every labeled edge (including all reconvergence merges: 00's 4-way TRD4, 08's two 4-way merges into ANDR25/ANDE3, 06's nested MACSSO 3-edge sub-decision), and every edge's condition semantics verified present and unnarrowed in the converted tables"

requirements-completed: []

# Metrics
duration: 45min
completed: 2026-07-08
---

# Phase 122 Plan 12: Independent D-01 Decision-Tree Leaf-Parity Verification Summary

**Independently re-derived the pre-conversion Mermaid node/edge set for all 11 decision-trees (RE-207..217) directly from `git show 71be4ab` base bytes and diffed each against its converted table -- zero gaps, zero stale diagram-prose, zero narrowed edge semantics found across the full class.**

## Performance

- **Duration:** ~45 min
- **Started:** 2026-07-08
- **Completed:** 2026-07-08
- **Tasks:** 2 (both read-only verification, no product-file writes)
- **Files modified:** 0 (`files_modified: []` per plan frontmatter -- SUMMARY only)

## Accomplishments

- Re-derived, from raw `git show 71be4ab:docs/decision-trees/<file>.md` Mermaid bytes, the complete node list, labeled-edge list (with condition text), and reconvergence/merge structure for all 11 decision-trees -- independently of the converting agent's own annotations or SUMMARY reasoning (D-01 RIDER 4 / T-122-09 mitigation: this agent did not author any of the 11 conversions)
- Confirmed every one of the 11 LOCKED-N annotations currently in the working tree exactly matches this independent re-derivation:

  | File | New ID | Re-derived N (nodes+labeled edges) | File's Annotated N | Reconvergence | Verdict |
  |------|--------|--------------------------------------|---------------------|----------------|---------|
  | 00-initial-triage.md | RE-207 | 36 (18+18) | LOCKED-36 | Yes -- 4-way into TRD4, preserved as 4 explicit per-mode rows | PASS |
  | 01-esp-failure.md | RE-208 | 43 (24+19) | LOCKED-43 | None (verified) | PASS |
  | 02-profile-assignment.md | RE-209 | 35 (19+16) | LOCKED-35 | None (verified) | PASS |
  | 03-tpm-attestation.md | RE-210 | 33 (18+15) | LOCKED-33 | None (verified) | PASS |
  | 04-apv2-triage.md | RE-211 | 23 (14+9) | LOCKED-23 | None (verified) | PASS |
  | 05-device-lifecycle.md | RE-212 | 18 (10+8) | LOCKED-18 | None; all 4 Q1-Q4 diamonds preserved | PASS |
  | 06-macos-triage.md | RE-213 | 31 (16+15) | LOCKED-31 | Nested MACSSO diamond's 3 edges preserved as explicit rows | PASS |
  | 07-ios-triage.md | RE-214 | 23 (12+11) | LOCKED-23 | None (verified) | PASS |
  | 08-android-triage.md | RE-215 | 39 (14+25) | LOCKED-39 | Yes -- TWO 4-way merges (into ANDR25 and ANDE3), each preserved as 4 explicit per-mode rows | PASS |
  | 09-linux-triage.md | RE-216 | 12 (7+5) | LOCKED-12 | B->C/D/E fan-out preserved; LINCA->LINR32 continuation folded into CA-disambiguation row | PASS |
  | 10-8021x-triage.md | RE-217 | 11 (6+5) | LOCKED-11 | None; upgraded from older 5-leaf-count convention (confirmed correct) | PASS |

- Ran the plan's exact automated stale-prose grep (`click the leaf\|node shape\|classDef\|^## Legend`, case-insensitive) on all 11 files: **0 matches on every file**
- Ran `grep -c '^```mermaid'` on all 11 files: **0 fences remaining on every file** -- all Mermaid content genuinely removed, not merely visually hidden
- Ran a corpus-wide `subgraph|classDef` scan across `docs/decision-trees/*.md`: **zero matches** -- no orphaned subgraph or classDef styling directives survive from any of the 11 original diagrams
- Ran `node scripts/validation/c17-eee-contract.mjs` against the decision-trees class: **0 violations across all 13 assertions** (confirms the harness itself sees no residual Mermaid fences or structural regressions, though C17 has no diagram-leaf parser -- this D-01 pass is the actual completeness gate per STD-04 D-04)
- Performed the semantic-paraphrase check (D-01 RIDER 1) on every labeled edge: all condition text in the converted tables matches the base-byte edge labels verbatim or near-verbatim (no narrowing found) -- specifically re-verified `10-8021x-triage.md`'s previously-cited narrowing risk ("Trust prompt or untrusted server / RADIUS root CA missing") and confirmed the full condition text is preserved unabridged in the current table (the narrowing this RIDER exists to guard against was already fixed by a prior plan, 122-05)
- Confirmed all 11 files carry exactly one Mermaid block each in the pre-conversion base bytes (no multi-block files in this class), so no per-block classification gap exists

## Task Commits

This is a verification-only plan (`files_modified: []`) -- no per-task code/doc commits were made, matching the 117-10 and 121-07 precedent (verification-only plans close with only the SUMMARY + STATE/ROADMAP metadata commit).

**Plan metadata:** (recorded after this SUMMARY -- see completion report)

## Files Created/Modified

- `.planning/phases/122-structural-retrofit-decision-trees-carved-mermaid-files/122-12-SUMMARY.md` -- this D-01 verification ledger

## Decisions Made

- Both tasks' independent re-derivations matched the working tree's current `LOCKED-N` annotations exactly for all 11 files, including the two files (08, 10) where a prior plan (122-02, 122-05) had already corrected an initial miscount/convention mismatch -- this plan's independent re-derivation serves as a second, separate confirmation that those corrections were themselves accurate, not merely self-consistent.
- No corrections were required to any of the 11 files in this plan -- this is purely a read-only confirmatory pass per the plan's `files_modified: []` design.
- All four D-01 RIDERs (semantic-paraphrase, multi-block/subgraph enumeration, stale-prose grep, pre-fork base-byte capture) were applied uniformly across all 11 files, not just the 4 FULL-tier files named in Task 1.

## Deviations from Plan

### Auto-fixed Issues

None -- this is a read-only verification plan; no code/doc changes were made or needed (zero gaps found).

**Total deviations:** 0
**Impact on plan:** None -- all 11 files pass D-01 independent leaf-parity re-derivation with zero gaps.

## Known Stubs

None.

## Threat Flags

None -- this plan introduces no new surface; it is a read-only diff/grep verification pass over already-converted files (T-122-01, T-122-05, T-122-09 all confirmed mitigated per the threat model, no new threats surfaced).

## Issues Encountered

None.

## User Setup Required

None -- no external service configuration required.

## Next Phase Readiness

- **RETRO-05's leaf-preservation obligation (STD-04 D-04) is independently confirmed satisfied for all 11 decision-trees** -- the D-01 gate this plan exists to provide has been discharged with zero gaps, zero stale prose, zero narrowed edges, and zero dropped reconvergence merges.
- This plan does NOT itself close RETRO-05 (that requirement's traceability entry is owned by the plan(s) that performed the conversions, per REQUIREMENTS.md) -- `requirements-completed` is correctly left empty here; this is confirmatory verification, not the authoring work.
- Remaining Phase 122 work (per STATE.md Plan 12 of 15): D-01 verification for the remaining 19 non-decision-tree files (10 carved-mermaid + 9 lifecycle) was already completed in prior plans per STATE.md's accumulated decisions (122-06 through 122-11); this plan closes out the decision-tree-specific D-01 obligation named explicitly in CONTEXT/RESEARCH as the front-loaded, highest-value verification target.
- No blockers for subsequent Phase 122 plans or Phase 123 (nav-hub retrofit, navigation-last).

---
*Phase: 122-structural-retrofit-decision-trees-carved-mermaid-files*
*Completed: 2026-07-08*
