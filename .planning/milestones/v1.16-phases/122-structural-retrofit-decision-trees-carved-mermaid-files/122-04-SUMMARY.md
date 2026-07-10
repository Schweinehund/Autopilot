---
phase: 122-structural-retrofit-decision-trees-carved-mermaid-files
plan: 04
subsystem: docs-retrofit
tags: [mermaid-conversion, decision-tables, eee-standard, c17, retro-05, docs-decision-trees]

# Dependency graph
requires:
  - phase: 122-01
    provides: retrofit-mermaid-structural.mjs fork (DECISION_TREE_PATHS router, mermaid-absence guard, doc_id-idempotency guard) + hand-minted RE-207..217 registry rows
provides:
  - docs/decision-trees/05-device-lifecycle.md converted to a mermaid-free decision table (LOCKED — 18), enrolled RE-212, doc_type Reference (D-04a directory precedence over the -lifecycle filename)
  - docs/decision-trees/06-macos-triage.md converted to a mermaid-free decision table (LOCKED — 31) with the nested MACSSO diamond made explicit, enrolled RE-213
  - docs/decision-trees/07-ios-triage.md converted to a mermaid-free decision table (LOCKED — 23), enrolled RE-214
affects: [122-05, 122-06, 122-07, 122-verification, phase-123-nav-hub-retrofit]

# Tech tracking
tech-stack:
  added: []
  patterns: [decision-table-per-file, LOCKED-N nodes-plus-labeled-edges annotation, word-preserving blockquote split (Transform A)]

key-files:
  created: []
  modified:
    - docs/decision-trees/05-device-lifecycle.md
    - docs/decision-trees/06-macos-triage.md
    - docs/decision-trees/07-ios-triage.md
    - docs/_registry/RE-index.md

key-decisions:
  - "05-device-lifecycle.md's Q1-Q4 decision graph converted to a single 5-row ordinal-column decision table (one row per terminal action/path) rather than a per-edge table -- matches the shipped 10-8021x-triage.md / 06 / 07 Routing Verification precedent"
  - "06/07 already carried a pre-existing Routing Verification table (Path | Step 1 | Step 2 | Destination) built under the same shape convention prior to this phase; conversion work was fence + Legend removal, LOCKED-N annotation, and (for 06) explicit nested-MACSSO row labeling -- not a from-scratch table author"
  - "All 3 files' LOCKED-N counts (18/31/23) independently re-derived against git show 71be4ab bytes and found to match the plan's precomputed values exactly -- no corrections needed (unlike 122-02's 08-android off-by-one)"

patterns-established:
  - "Nested-diamond-node explicit labeling: when a sub-decision (MACSSO) is reached from a parent diamond, its outgoing edges are annotated with a parenthetical '(nested X node)' tag in the Path column rather than only being distinguishable via the Step-2 text"

requirements-completed: [RETRO-05]

# Metrics
duration: 15min
completed: 2026-07-08
---

# Phase 122 Plan 04: Convert + Enroll Decision-Trees 05/06/07 (RE-212/213/214) Summary

**Converted the Q1-Q4 device-lifecycle decision graph and the pre-existing macOS/iOS Routing Verification tables to fully mermaid-free, C17-green decision tables, with the nested Platform SSO (MACSSO) sub-diamond in 06 made explicit and 05 correctly enrolled as doc_type Reference despite its `-lifecycle` filename.**

## Performance

- **Duration:** 15min
- **Started:** 2026-07-08T01:15:00Z
- **Completed:** 2026-07-08T01:34:00Z
- **Tasks:** 3 completed
- **Files modified:** 4 (3 decision-tree docs + registry)

## Accomplishments

- `docs/decision-trees/05-device-lifecycle.md`: hand-authored a net-new 5-row decision table (Retire / Autopilot Reset / Tenant Migration / Fresh Start / Wipe) covering all 4 diamonds (Q1-Q4), split 2 pre-existing over-200-char blockquotes, enrolled RE-212 as **doc_type Reference** per the D-04(a) LOCKED directory-precedence worked case
- `docs/decision-trees/06-macos-triage.md`: removed the mermaid fence + Legend section, kept and annotated the pre-existing Routing Verification table (LOCKED — 31), made the nested `MACSSO` diamond's 3 outgoing edges explicit `(nested MACSSO node)` rows so the sub-decision is not silently flattened into the parent symptom branch, enrolled RE-213
- `docs/decision-trees/07-ios-triage.md`: removed the mermaid fence + Legend section, kept and annotated the pre-existing Routing Verification table (LOCKED — 23), split the 1 pre-existing over-200-char blockquote, enrolled RE-214
- Independently re-derived all 3 files' node/edge counts against `git show 71be4ab` bytes before writing any table -- all three (18/31/23) matched the plan's precomputed LOCKED-N exactly, no corrections required
- Full corpus C17 re-verified after each write: 204 files checked, 0 violations (assertions #1-13 all 0)
- Flipped RE-212/213/214 registry rows Pending -> Approved

## Task Commits

Each task was committed atomically:

1. **Task 1: Convert + enroll 05-device-lifecycle.md (RE-212, Reference, LOCKED — 18, 4 diamonds Q1-Q4)** - `785e460` (feat)
2. **Task 2: Convert + enroll 06-macos-triage.md (RE-213, LOCKED — 31, nested MACSSO diamond)** - `aff7a82` (feat)
3. **Task 3: Convert + enroll 07-ios-triage.md (RE-214, LOCKED — 23)** - `1028348` (feat)

**Plan metadata:** committed separately (this file + STATE/ROADMAP/REQUIREMENTS)

## Files Created/Modified

- `docs/decision-trees/05-device-lifecycle.md` - Net-new 5-row ordinal decision table (Q1-Q4), 2 blockquotes split, enrolled RE-212 (Reference)
- `docs/decision-trees/06-macos-triage.md` - Pre-existing Routing Verification table retained + LOCKED-31 annotation + nested-MACSSO row labeling, enrolled RE-213
- `docs/decision-trees/07-ios-triage.md` - Pre-existing Routing Verification table retained + LOCKED-23 annotation, 1 blockquote split, enrolled RE-214
- `docs/_registry/RE-index.md` - RE-212/213/214 flipped Pending -> Approved

## Deviations from Plan

None — plan executed exactly as written. All 3 LOCKED-N counts matched the plan's precomputed values on independent re-derivation (no off-by-one corrections needed, unlike 122-02's 08-android-triage.md).

## Verification Results

- C17 exits 0 on all 3 files individually and on the full 204-file corpus (`--all`): assertions #1-13 all 0
- `grep -c '^```mermaid'` = 0 for all 3 files
- `LOCKED — 18` present in 05-device-lifecycle.md; `LOCKED — 31` present in 06-macos-triage.md; `LOCKED — 23` present in 07-ios-triage.md
- `doc_id: RE-212` / `RE-213` / `RE-214` and `doc_type: Reference` (05) each present exactly once
- All 4 diamonds (Q1-Q4) represented in 05; all 4 diamonds incl. nested MACSSO represented in 06; all 3 diamonds represented in 07
- Stale-prose grep (`mermaid|click|decision tree|diagram above|diagram below|node shape|legend|classDef`) clean in all 3 files, except two expected/precedented false-positive classes left intentionally unchanged: (a) "Decision Tree" appearing in the doc's own title/heading (matches the 04-apv2-triage.md precedent), and (b) "click target" inside a historical (pre-Phase-122) Version History row describing a past change, not the removed diagram (matches the 08-android-triage.md precedent of leaving historical VH prose byte-unchanged)

## Known Stubs

None.

## Threat Flags

None — this plan touches only existing decision-tree files and the registry table; no new network endpoints, auth paths, or trust-boundary surface introduced.

## Self-Check: PASSED
