---
phase: 122-structural-retrofit-decision-trees-carved-mermaid-files
plan: 06
subsystem: docs-retrofit
tags: [mermaid-conversion, decision-tables, numbered-stage-list, eee-standard, c17, retro-08, admin-setup]

# Dependency graph
requires:
  - phase: 122-01
    provides: retrofit-mermaid-structural.mjs fork (ADMIN_SETUP_CARVEOUT_PATHS router -> Guide, mermaid-absence guard, doc_id-idempotency guard)
provides:
  - docs/admin-setup-android/00-overview.md converted to a Mode/Portal/Destination decision table (LOCKED — 15), enrolled RE-092 (Guide, Approved)
  - docs/admin-setup-ios/00-overview.md converted to a Path/Step decision table (LOCKED — 15), enrolled RE-106 (Guide, Approved)
  - docs/admin-setup-macos/00-overview.md converted to a numbered stage list with an explicit reconvergence note (LOCKED — 11), enrolled RE-116 (Guide, Approved)
affects: [122-verification, phase-123-nav-hub-retrofit]

# Tech tracking
tech-stack:
  added: []
  patterns: [decision-table-per-CHOOSE-diamond, numbered-stage-list-with-explicit-reconvergence-note, LOCKED-N nodes-plus-labeled-edges re-derivation, word-preserving blockquote split (Transform A)]

key-files:
  created: []
  modified:
    - docs/admin-setup-android/00-overview.md
    - docs/admin-setup-ios/00-overview.md
    - docs/admin-setup-macos/00-overview.md
    - docs/_registry/RE-index.md

key-decisions:
  - "Independently re-derived android/00's LOCKED-N as 15 (11 nodes + 4 labeled edges via grep-verified node/edge extraction against git show 71be4ab bytes), correcting the plan's precomputed 16 -- same class of correction as 122-02's 08-android-triage off-by-one"
  - "Independently re-derived ios/00's LOCKED-N as 15 (11 nodes + 4 labeled edges), correcting the plan's precomputed 18 by a larger margin (RESEARCH's own table undercounted nodes at 10 and used a different edge-labeling convention)"
  - "macos/00's LOCKED-N (11 nodes + 0 labeled edges) matched the plan's precomputed value exactly, confirming the counting methodology used to correct android/ios"
  - "macos/00 has no {...} diamond, so per the D-02 bright-line it converts to the pre-existing numbered stage list (not a table), with an explicit prose note added directly under the LOCKED-N annotation capturing the Step-2 fan-out into Steps 3/4/5 and their fan-in to Step 6, plus the separate linear Step 7->8->9->10->11 chain"
  - "ios/00's Corporate ADE branch fan-out (node C into D/E/F) is preserved inside a single decision-table cell (\"then in parallel: ...\") rather than exploded into extra rows, since the fan-out is a sub-structure of one CHOOSE outcome, not a second diamond"

patterns-established:
  - "Decision-table cell can hold a multi-step chain with an inline fan-out note (\"-> then in parallel: A, B, C\") when a single CHOOSE outcome's branch itself contains a linear+fan-out sub-flow, avoiding a nested-table anti-pattern"
  - "For diamond-free reconvergence diagrams, the explicit merge note goes directly under the LOCKED-N annotation (before the list), not folded into an existing list item's prose -- keeps the reconvergence highly visible to the D-01 verification pass"

key-links: []

requirements-completed: []

# Metrics
duration: 25min
completed: 2026-07-08
---

# Phase 122 Plan 06: Convert + Enroll Admin-Setup Overviews Android/iOS/macOS (RE-092/106/116) Summary

**Converted the 3 FULL-tier admin-setup overview carve-outs (android/00, ios/00, macos/00) to mermaid-free EEE Guides — 2 CHOOSE-diamond flowcharts to decision tables, 1 diamond-free reconvergence flowchart to a numbered stage list with an explicit merge note — correcting 2 of the plan's precomputed LOCKED-N counts on independent re-derivation.**

## Performance

- **Duration:** ~25 min
- **Completed:** 2026-07-08
- **Tasks:** 3 completed
- **Files modified:** 4 (3 admin-setup docs + registry)

## Accomplishments

- `docs/admin-setup-android/00-overview.md`: converted the `CHOOSE{Choose your mode}` flowchart diamond to a Mode | Required Portal(s) | Destination Guide decision table preserving all 6 outcomes (COBO, BYOD Work Profile, Dedicated, ZTE, AOSP, Knox KME); removed the mermaid fence; reworded 2 stale "diagram above/below" references to "table"; split the 1 pre-existing over-200-char Platform-gate blockquote into 3 word-preserving groups; enrolled RE-092 (Guide)
- `docs/admin-setup-ios/00-overview.md`: converted the `CHOOSE{Choose path}` flowchart diamond to a Path | Step 1 | Step 2 | Step 3 (then parallel) | Destination Guide(s) decision table preserving all 4 outcomes and the Corporate ADE branch's internal fan-out into 3 parallel guides; removed the mermaid fence; reworded 4 stale "diagram" references (3 inline parentheticals + 1 "diagram above") to "table"/"below"; split the 1 pre-existing over-200-char Platform-gate blockquote into 2 word-preserving groups; enrolled RE-106 (Guide)
- `docs/admin-setup-macos/00-overview.md`: converted the diamond-free `graph LR` flowchart (11 nodes, 12 plain edges, C/D/E→F reconvergence) to the pre-existing numbered stage list, adding an explicit prose reconvergence note (Step 2 fans out to Steps 3/4/5, which feed back into Step 6; Step 3 also continues into the linear Step 7→8→9→10→11 chain); removed the mermaid fence; split the 1 pre-existing over-200-char Platform-gate blockquote into 2 word-preserving groups; enrolled RE-116 (Guide)
- Independently re-derived all 3 files' node/edge counts against `git show 71be4ab` bytes (confirmed byte-identical to working tree modulo CRLF) using a grep-based node/edge extraction script, not manual estimation
- Corrected 2 of the plan's 3 precomputed LOCKED-N values: android/00 15 (not the plan's 16), ios/00 15 (not the plan's 18); macos/00's 11 matched exactly
- Full corpus C17 re-verified after each write: up to 209 files checked, 0 violations (assertions #1-13 all 0)
- Flipped RE-092/106/116 registry rows Pending -> Approved

## Task Commits

Each task was committed atomically:

1. **Task 1: Convert + enroll admin-setup-android/00-overview.md (RE-092, LOCKED — 15)** - `1ee3bb2` (feat)
2. **Task 2: Convert + enroll admin-setup-ios/00-overview.md (RE-106, LOCKED — 15)** - `eecf3fe` (feat)
3. **Task 3: Convert + enroll admin-setup-macos/00-overview.md (RE-116, LOCKED — 11, reconvergence)** - `0d34ccb` (feat)

**Plan metadata:** (this commit, docs: complete plan)

## Files Created/Modified

- `docs/admin-setup-android/00-overview.md` — Mermaid CHOOSE diamond converted to a 6-row decision table, LOCKED-15 annotation, blockquote split, enrolled RE-092 (Guide, Approved)
- `docs/admin-setup-ios/00-overview.md` — Mermaid CHOOSE diamond converted to a 4-row decision table (with the Corporate ADE fan-out preserved inline), LOCKED-15 annotation, blockquote split, enrolled RE-106 (Guide, Approved)
- `docs/admin-setup-macos/00-overview.md` — Diamond-free graph converted to the pre-existing numbered stage list + explicit reconvergence note, LOCKED-11 annotation, blockquote split, enrolled RE-116 (Guide, Approved)
- `docs/_registry/RE-index.md` — RE-092/106/116 flipped Pending -> Approved

## Decisions Made

- Both android/00 and ios/00 LOCKED-N counts were independently re-derived and found to differ from the plan's precomputed values; corrected inline per Rule 1 (bug fix — the plan's precomputed node/edge counts were wrong), matching the established 122-02 precedent for handling precomputed-count errors
- macos/00's reconvergence is documented as explicit prose directly under the LOCKED-N line (not buried inside an existing list item), keeping it maximally visible for the D-01 independent verification pass per the plan's threat model (T-122-01)
- ios/00's Corporate ADE fan-out (guide 3 → parallel guides 4/5/6) is represented as one table cell with a "then in parallel" note rather than 3 separate table rows, since it is a sub-structure within a single CHOOSE outcome, not a second decision point

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected admin-setup-android/00-overview.md's LOCKED-N from the plan's precomputed 16 to the independently re-derived 15**
- **Found during:** Task 1
- **Issue:** The plan's must_haves/acceptance_criteria specified `LOCKED — 16`, sourced from 122-RESEARCH.md's Class 2 table entry (nodes=8, edges 10/8/2). A grep-based node/edge extraction against the actual mermaid fence (verified byte-identical to `git show 71be4ab`) found 11 unique node IDs (START, CHOOSE, MGP, COBO_PATH, BYOD_PATH, DED_PATH, MGPZTE, ZT, ZTE_PATH, AOSP_PATH, KNOX) and 10 total edges, of which 4 carry an explicit `-->|label|` (CHOOSE's 4 outgoing branches; the 6th "outcome" is a bundled label spanning 3 modes on one edge, not a distinct edge)
- **Fix:** Annotated the file as `LOCKED — 15 (nodes + labeled edges)` — 11 nodes + 4 labeled edges — and preserved all 6 CHOOSE *outcomes* as 6 table rows (outcome count and LOCKED-N element count are distinct per D-02: LOCKED-N counts literal graph elements, the table row count reflects semantic outcomes)
- **Files modified:** docs/admin-setup-android/00-overview.md
- **Verification:** Re-ran the grep-based extraction against the git-show baseline before writing; confirmed node/edge counts by direct `grep -c`/`grep -oE` against the raw fence text (11 nodes, 10 edges, 4 labeled)
- **Committed in:** `1ee3bb2` (Task 1 commit)

**2. [Rule 1 - Bug] Corrected admin-setup-ios/00-overview.md's LOCKED-N from the plan's precomputed 18 to the independently re-derived 15**
- **Found during:** Task 2
- **Issue:** The plan specified `LOCKED — 18`, sourced from 122-RESEARCH.md's Class 2 table (nodes=10, edges 9/8/1). The same grep-based extraction found 11 unique node IDs (START, CHOOSE, A, B, C, D, E, F, G, H, I) and 10 total edges, 4 of which are labeled (CHOOSE's 4 outgoing branches: Corporate ADE, BYOD w/o ABM, Privacy-preserving BYOD, App-layer only)
- **Fix:** Annotated the file as `LOCKED — 15 (nodes + labeled edges)` — 11 nodes + 4 labeled edges — with all 4 CHOOSE outcomes as table rows, and the Corporate ADE branch's internal A→B→C→{D,E,F} fan-out preserved inline within that row's cells
- **Files modified:** docs/admin-setup-ios/00-overview.md
- **Verification:** Re-ran the grep-based extraction against the git-show baseline before writing; confirmed 11 nodes / 10 edges / 4 labeled by direct `grep -c`/`grep -oE` against the raw fence text
- **Committed in:** `eecf3fe` (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 1 — LOCKED-N precomputed-count corrections)
**Impact on plan:** Both corrections are required for D-01 correctness (the LOCKED-N annotation must reflect the actual, independently re-derived element count, not an unverified upstream estimate). No scope creep — same file set, same conversion shapes, only the annotated number changed. macos/00's LOCKED-11 required no correction, confirming the counting methodology.

## Issues Encountered

None beyond the LOCKED-N corrections documented above.

## User Setup Required

None - no external service configuration required.

## Verification Results

- C17 exits 0 on all 3 files individually and on the full corpus (`--all`, up to 209 files): assertions #1-13 all 0
- `grep -c '^```mermaid'` = 0 for all 3 files
- `LOCKED — 15` present in android/00 and ios/00; `LOCKED — 11` present in macos/00
- `doc_id: RE-092` / `RE-106` / `RE-116` each present exactly once; `doc_type: Guide` present exactly once in each file
- All 6 android CHOOSE outcomes represented as table rows; all 4 iOS CHOOSE outcomes represented as table rows
- macos/00's C/D/E→F reconvergence explicitly preserved as prose directly under the LOCKED-N annotation, plus the G→H→I→J→K chain order preserved in the unmodified numbered list
- Stale-prose grep (`click|decision tree|diagram above|diagram below|node shape|legend|classDef`) clean in all 3 files (only historical Changelog/Version-History rows retain the word "Mermaid" as a factual record of past authoring, matching the established 10-8021x-triage.md precedent)
- All 3 registry rows (RE-092/106/116) confirmed Approved via grep

## Known Stubs

None.

## Threat Flags

None — this plan touches only existing admin-setup overview files and the registry table; no new network endpoints, auth paths, or trust-boundary surface introduced. Both threat-register mitigations (T-122-01 dropped-reconvergence, T-122-05 stale-prose) were actively verified and confirmed mitigated per the Verification Results above.

## Next Phase Readiness

- RE-092/106/116 are C17-green, Mermaid-free, and Approved — 3 of the 9 admin-setup carve-outs done
- Remaining RETRO-08 work (apv1/00, apv1/01, apv2/00, linux/00, 8021x/00, 8021x/01, ca-enrollment-timing.md) is handed to subsequent Phase 122 plans
- No blockers identified

## Self-Check: PASSED

- FOUND: `docs/admin-setup-android/00-overview.md`
- FOUND: `docs/admin-setup-ios/00-overview.md`
- FOUND: `docs/admin-setup-macos/00-overview.md`
- FOUND: commit `1ee3bb2` (Task 1)
- FOUND: commit `eecf3fe` (Task 2)
- FOUND: commit `0d34ccb` (Task 3)

---
*Phase: 122-structural-retrofit-decision-trees-carved-mermaid-files*
*Completed: 2026-07-08*
