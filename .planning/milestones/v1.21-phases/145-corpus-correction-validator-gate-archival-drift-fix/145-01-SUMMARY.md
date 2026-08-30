---
phase: 145-corpus-correction-validator-gate-archival-drift-fix
plan: 01
subsystem: testing
tags: [validators, frozen-read, docs, autopatch, corpus-correction]

# Dependency graph
requires: []
provides:
  - "check-phase-59.mjs V-59-14 converted to a frozen v1.5-close read (readAtV15Close), unblocking future ops-index row growth"
  - "co-management/03-cocmgmt-migration-paths.md corrected Autopatch default-ring names (site 4 of 4 for FIX-01)"
affects: [145-02, 145-03, phase-152]

# Actuals (#2632)
actuals:
  tokens: 820
  tasks: 2
  commits: 2

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Frozen-read conversion pattern: swap live readFile() for readAtV15Close(), delete the null-guard, replace with the throw-and-propagate comment used at existing readAtV15Close call sites, append [v1.5-frozen @ <sha>] to the assertion name only (never the filename)"

key-files:
  created: []
  modified:
    - scripts/validation/check-phase-59.mjs
    - docs/operations/co-management/03-cocmgmt-migration-paths.md

key-decisions:
  - "Converted only V-59-14's read call (D-34); V-59-02, V-59-13, V-59-34 stay live reads"
  - "Let readAtV15Close throw uncaught, matching the :659/:660 idiom, not readAtV116Close's try/catch convention (D-36)"
  - "Appended [v1.5-frozen @ ba2cbc0] to the assertion NAME only, never the file — audit-harness-v1.5-integrity.yml:270 guards on the filename (D-37)"
  - "co-management/03 edit scoped to the exact five-word parenthetical swap only — no FIX-02, no FIX-04 rename, no evidence line, no platform-applicability blockquote (D-50)"

patterns-established:
  - "Tracer-style before/after behavioral probe for validator conversions: prove the OLD assertion fails on the target growth case, then prove the NEW assertion passes on the identical case, reverting the scratch edit both times before the real commit"

requirements-completed: [FIX-12, FIX-01]

coverage:
  - id: D1
    description: "V-59-14 reads docs/operations/00-index.md at the v1.5 close SHA ba2cbc0 (frozen), not live at HEAD — proven by a sixth Patch row passing where it previously failed"
    requirement: "FIX-12"
    verification:
      - kind: unit
        ref: "node scripts/validation/check-phase-59.mjs"
        status: pass
    human_judgment: false
  - id: D2
    description: "co-management/03's Autopatch default-ring parenthetical corrected from the falsified four-name cohort to the two current default rings (Test and Last)"
    requirement: "FIX-01"
    verification:
      - kind: unit
        ref: "node scripts/validation/check-phase-53.mjs"
        status: pass
    human_judgment: false

duration: 12min
completed: 2026-08-19
status: complete
---

# Phase 145 Plan 01: Validator Frozen-Read Conversion & Autopatch Ring-Name Fix Summary

**Converted check-phase-59.mjs's V-59-14 to a frozen v1.5-close read so ops-index row growth stops tripping a stale row-count equality, and corrected the falsified four-ring Autopatch parenthetical in co-management/03 to the two current default rings.**

## Performance

- **Duration:** 12 min
- **Started:** 2026-08-19T16:46:00Z (approx)
- **Completed:** 2026-08-19T16:58:04Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- `V-59-14` in `check-phase-59.mjs` now reads `docs/operations/00-index.md` via `readAtV15Close` (commit `ba2cbc0`) instead of the live working tree, converting a standing row-count prohibition into a historical fact about v1.5 close — proven with a measured before/after probe
- `docs/operations/co-management/03-cocmgmt-migration-paths.md:25` now names the two current Autopatch default rings (`Test and Last`) instead of the falsified four-name cohort (`Test, First, Fast, Broad`)
- All seven D-18 gate validators (`check-phase-53/54/57/59`, `c17-eee-contract`, `check-nav-hub-links`, `v1.20-milestone-audit`) confirmed green at their recorded baselines after each commit

## Task Commits

Each task was committed atomically:

1. **Task 1: FIX-12 — convert V-59-14's ops-index read to a frozen read** - `a08439d3` (fix)
2. **Task 2: FIX-01 (site 4 of 4) — correct the Autopatch default-ring names in co-management/03** - `d6cc29bc` (docs)

_Plan metadata commit follows this SUMMARY._

## Files Created/Modified
- `scripts/validation/check-phase-59.mjs` - `V-59-14` converted to a frozen read at v1.5 close; assertion name gains `[v1.5-frozen @ ba2cbc0]` suffix
- `docs/operations/co-management/03-cocmgmt-migration-paths.md` - one line corrected: Autopatch default-ring names

## Behavioral Probe (Task 1 tracer, both halves measured)

**Pre-conversion (before-half):** appended a scratch sixth row to the ops-index Patch table, ran `node scripts/validation/check-phase-59.mjs`:
```
[14/36] V-59-14: docs/operations/00-index.md row counts -- Patch=5 / App=5 / Drift=5 FAIL -- Patch row count = 6, expected 5
Summary: 35 passed, 1 failed, 0 skipped
```
Reverted with `git checkout -- docs/operations/00-index.md`.

**Post-conversion (after-half):** re-applied the identical scratch row, converted V-59-14 to `readAtV15Close`, ran the validator again:
```
Summary: 36 passed, 0 failed, 0 skipped
```
Reverted the scratch row again; `git status --porcelain docs/` confirmed clean before the real commit.

**Landed assertion name (exact string):**
```
V-59-14: docs/operations/00-index.md carried row counts Patch=5 / App=5 / Drift=5 at v1.5 close [v1.5-frozen @ ba2cbc0]
```

## Decisions Made
- Converted only `V-59-14`'s read; left `V-59-02`, `V-59-13`, `V-59-34` as live reads per D-34 — those are correctly live questions ("does the file exist", "has a TODO appeared").
- Let `readAtV15Close` throw uncaught (no try/catch), matching the file's existing `:659`/`:660` idiom rather than `readAtV116Close`'s wrapped convention, per D-36.
- Suffix `[v1.5-frozen @ ba2cbc0]` appended to the assertion **name** string only; the file itself was not renamed, because `audit-harness-v1.5-integrity.yml:270`'s `if [ -f ... ]` guard would turn a rename into a silent CI skip (D-37).
- co-management/03 edit held to the exact five-word parenthetical swap named by D-50 — no FIX-02 (already correctly worded), no FIX-04 rename (out of scope for this file), no evidence line (D-05 scopes those to the five patch-management docs), no platform-applicability blockquote (barred by `V-53-21`).

## Deviations from Plan

### Auto-fixed Issues

None — both tasks executed exactly as scoped by the plan's `<action>` blocks.

### Plan-document measurement drift (not a code defect)

Two of Task 1's literal `<verify>` grep commands predicted counts that did not match measurement, and both traced to the plan authoring stage rather than to this execution:

1. `grep -c 'readAtV15Close(OPS_INDEX_MD)' scripts/validation/check-phase-59.mjs` — plan expected `3` ("the two pre-existing sites plus V-59-14"). Measured: `1`. There was only ever one call site that literally reads `readAtV15Close(OPS_INDEX_MD)` — the new V-59-14 site. The other two `readAtV15Close` call sites in the file read different arguments (`INDEX_MD` at line 315, and a loop variable `f` over `ALL_GLOSSARIES` at line 659, which does not include `OPS_INDEX_MD`). A looser count of *all* `readAtV15Close(` call sites in the file is `3`, which is likely what the plan intended.
2. `grep -c 'v1.5-frozen @ ba2cbc0' scripts/validation/check-phase-59.mjs` — plan expected `2` ("V-59-07 and V-59-14"). Measured: `3`. A third assertion, `V-59-24`, already carried the `[v1.5-frozen @ ba2cbc0]` suffix before this plan ran (visible at line 655, pre-existing, untouched by this plan) — the plan's authoring-time count of pre-existing suffix sites under-counted by one.

Per this phase's Rule 1 ("RE-MEASURE, NEVER TRANSCRIBE") both discrepancies were re-measured and confirmed as plan-document drift, not implementation defects: every semantic acceptance criterion in Task 1 (36/0 pass, `V-59-14` reads via `readAtV15Close`, suffix present, file not renamed, all seven D-18 gates green) was independently verified true. No code change was made in response to these two literal-count mismatches, since the underlying facts they were meant to check are otherwise proven correct.

---

**Total deviations:** 0 auto-fixed. 2 plan-document measurement discrepancies noted and independently re-verified (no code impact).
**Impact on plan:** None on scope or correctness — both tasks landed exactly as specified.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- `check-phase-59.mjs` no longer bars ops-index Patch-row growth, clearing the way for Phase 152 to add a patch-management guide without tripping V-59-14.
- One of four FIX-01 sites (`co-management/03`) is corrected; the remaining three sites land in plans 02 and 03 of this phase.
- All D-18 gate validators confirmed green at baseline; no drift introduced.

---
*Phase: 145-corpus-correction-validator-gate-archival-drift-fix*
*Completed: 2026-08-19*

## Self-Check: PASSED

- FOUND: scripts/validation/check-phase-59.mjs
- FOUND: docs/operations/co-management/03-cocmgmt-migration-paths.md
- FOUND: .planning/phases/145-corpus-correction-validator-gate-archival-drift-fix/145-01-SUMMARY.md
- FOUND: commit a08439d3 (Task 1)
- FOUND: commit d6cc29bc (Task 2)
