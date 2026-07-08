---
phase: 122-structural-retrofit-decision-trees-carved-mermaid-files
plan: 05
subsystem: docs-retrofit
tags: [mermaid-conversion, decision-tables, eee-standard, c17, retro-05, docs-decision-trees]

# Dependency graph
requires:
  - phase: 122-01
    provides: retrofit-mermaid-structural.mjs fork (DECISION_TREE_PATHS router, mermaid-absence guard, doc_id-idempotency guard) + hand-minted RE-207..217 registry rows
provides:
  - docs/decision-trees/09-linux-triage.md converted to a mermaid-free decision table (LOCKED — 12), enrolled RE-216
  - docs/decision-trees/10-8021x-triage.md fence + stale Legend removed, annotation upgraded to the R1 nodes+labeled-edges convention (LOCKED — 11), enrolled RE-217
  - All 11 decision-trees (00..10) now C17-green, Mermaid-free, and Approved in RE-index.md — RETRO-05 CLOSED
affects: [122-verification, phase-123-nav-hub-retrofit]

# Tech tracking
tech-stack:
  added: []
  patterns: [decision-table-per-file, LOCKED-N nodes-plus-labeled-edges annotation, word-preserving blockquote split (Transform A)]

key-files:
  created: []
  modified:
    - docs/decision-trees/09-linux-triage.md
    - docs/decision-trees/10-8021x-triage.md
    - docs/_registry/RE-index.md

key-decisions:
  - "09-linux-triage.md's pre-existing Routing Verification table already covered all 6 edges (5 labeled root branches + the LINCA→LINR32 continuation folded into the CA-disambiguation row's Step 2 cell) -- conversion work was fence + Legend removal, LOCKED-N annotation, and blockquote split, not a from-scratch table author"
  - "10-8021x-triage.md's LOCKED-N annotation upgraded from the older leaf-count convention (5 leaves, implicit in its pre-existing 5-row table) to the R1 nodes+labeled-edges convention (LOCKED — 11 = 6 nodes + 5 labeled edges), per 122-CONTEXT.md's explicit ruling that this file sets precedent and must not be grandfathered under the older convention"
  - "Both files' LOCKED-N counts (12/11) independently re-derived against git show 71be4ab bytes and found to match the plan's precomputed values exactly -- no corrections needed"

patterns-established: []

requirements-completed: [RETRO-05]

# Metrics
duration: 20min
completed: 2026-07-08
---

# Phase 122 Plan 05: Convert + Enroll Decision-Trees 09/10 (RE-216/217) Summary

**Converted the final two decision-trees to mermaid-free, C17-green decision tables — including 10-8021x-triage.md, the STD-04-cited exemplar that still carried a live fence and a stale Legend alongside its already-drafted routing table — completing all 11 decision-trees (RETRO-05).**

## Performance

- **Duration:** ~20 min
- **Completed:** 2026-07-08
- **Tasks:** 2 completed
- **Files modified:** 3 (2 decision-tree docs + registry)

## Accomplishments

- `docs/decision-trees/09-linux-triage.md`: removed the mermaid fence + Legend section (stale diagram-shape prose), kept and annotated the pre-existing Routing Verification table (LOCKED — 12, nodes + labeled edges: 7 nodes + 5 labeled edges), split the 1 pre-existing over-200-char platform-gate blockquote into 2 word-preserving groups, enrolled RE-216
- `docs/decision-trees/10-8021x-triage.md`: removed the LIVE mermaid fence AND the stale Legend section together (this file was NOT yet actually converted despite already having a nice-looking Routing Verification table sitting alongside them); upgraded the LOCKED-N annotation from the older 5-leaf-count convention to the R1 nodes+labeled-edges convention (LOCKED — 11 = 6 nodes + 5 labeled edges); split the 1 pre-existing over-200-char platform-gate blockquote into 2 word-preserving groups; enrolled RE-217
- Independently re-derived both files' node/edge counts against `git show 71be4ab` bytes before writing any annotation — both (12/11) matched the plan's precomputed LOCKED-N exactly, no corrections required
- Full corpus C17 re-verified after each write: 206 files checked, 0 violations (assertions #1-13 all 0)
- Flipped RE-216/217 registry rows Pending -> Approved
- **All 11 decision-trees (RE-207..217) are now C17-green, Mermaid-free, and Approved — RETRO-05 is fully closed**

## Task Commits

Each task was committed atomically:

1. **Task 1: Convert + enroll 09-linux-triage.md (RE-216, LOCKED — 12)** - `1c3c17b` (feat)
2. **Task 2: Convert + enroll 10-8021x-triage.md (RE-217, delete fence + Legend, upgrade to LOCKED — 11)** - `91daa66` (feat)

**Plan metadata:** (this commit, docs: complete plan)

## Files Created/Modified

- `docs/decision-trees/09-linux-triage.md` - Pre-existing Routing Verification table retained + LOCKED-12 annotation + 1 blockquote split, enrolled RE-216 (Reference)
- `docs/decision-trees/10-8021x-triage.md` - Fence + Legend removed, Routing Verification table retained + LOCKED-11 annotation (upgraded convention) + 1 blockquote split, enrolled RE-217 (Reference)
- `docs/_registry/RE-index.md` - RE-216/217 flipped Pending -> Approved

## Decisions Made

- Both files' pre-existing "Routing Verification" tables were already structurally complete under the R1 convention once the LOCKED-N annotation was upgraded — no rows needed to be added or restructured, matching the 06/07 precedent from 122-04 (conversion work was removal + annotation, not from-scratch authoring)
- 10-8021x-triage.md's LOCKED-N annotation explicitly upgraded to the nodes+labeled-edges convention (not grandfathered as leaf-count) per 122-CONTEXT.md's ruling that this file — being the STD-04-cited exemplar — sets the precedent all other decision-trees follow

## Deviations from Plan

None — plan executed exactly as written. Both LOCKED-N counts matched the plan's precomputed values on independent re-derivation.

## Verification Results

- C17 exits 0 on both files individually and on the full 206-file corpus (`--all`): assertions #1-13 all 0
- `grep -c '^```mermaid'` = 0 for both files
- `grep -c '^## Legend'` = 0 for 10-8021x-triage.md (stale Legend confirmed removed)
- `LOCKED — 12` present in 09-linux-triage.md; `LOCKED — 11` present in 10-8021x-triage.md
- `doc_id: RE-216` / `RE-217` each present exactly once
- Both diamonds (LIN1, LINCA) represented in 09; the single diamond (EAP1) represented in 10
- Routing Verification table in 10-8021x-triage.md retained with all 5 destination rows
- Stale-prose grep (`click the leaf|node shape|classDef|rounded`) clean in both files
- All 11 decision-tree registry rows (RE-207..217) confirmed Approved via full-registry grep

## Known Stubs

None.

## Threat Flags

None — this plan touches only existing decision-tree files and the registry table; no new network endpoints, auth paths, or trust-boundary surface introduced.

## Self-Check: PASSED

- FOUND: `docs/decision-trees/09-linux-triage.md`
- FOUND: `docs/decision-trees/10-8021x-triage.md`
- FOUND: commit `1c3c17b` (Task 1)
- FOUND: commit `91daa66` (Task 2)
