---
phase: 159-harn-harness-close
plan: 07
subsystem: testing
tags: [validation, apex, chain-arithmetic, harness-conversion, nested-flag]

requires:
  - phase: 159-harn-harness-close
    provides: "159-05/159-06's five content leaves (154-158), the converted v1.21 harness (159-04), and the forked v1.22 harness (159-03)"
provides:
  - "check-phase-159.mjs -- the v1.22 terminal apex: 111-entry generated chain (48..158), CHAIN_EXTRA [30,31], the additive V-159-HARN03 leg exercising the converted v1.21 harness for real in every invocation including nested"
  - "159-EVIDENCE.md §18/§19 -- derived arithmetic, chain-member presence confirmation, plain-vs-nested apex scan, wall-time breakdown, archive-root token provenance, predecessor-apex re-run"
affects: [159-08, 159-11, 159-13]

actuals:
  tokens: 9814
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Apex additive-leg-without-NESTED-skip: a leg whose spawn target is a frozen (byte-static-since-conversion) harness omits the NESTED-skip branch entirely, because a frozen corpus has nothing to skip re-auditing for -- the leg reports a genuine pass in every invocation, plain or nested"
    - "Positive-only harness assertions: the apex asserts only that the newly-converted harness references its conversion signature (withDocsAtClose) and exits 0 -- no negative substring assertion about the current-milestone harness is ever written, avoiding the V-140-C17CARVEOUT stale-negative-claim defect class"

key-files:
  created:
    - scripts/validation/check-phase-159.mjs
  modified:
    - .planning/phases/159-harn-harness-close/159-EVIDENCE.md

key-decisions:
  - "V-159-HARN03 (the additive conversion leg) copies check-phase-153.mjs's AUDIT-HARNESS spawn/timeout/failure-detail shape exactly, but deliberately omits the `if (NESTED) return skip` branch -- the only structural change from the copied template, per D-25"
  - "Both harness-spawning legs (AUDIT-HARNESS and HARN03) share the same 300,000ms cap, even though D-29's prose names the 300s cap as applying 'only to the AUDIT-HARNESS spawn' -- recorded as a delta in 159-EVIDENCE.md §19 rather than leaving HARN03 with no explicit timeout, since both spawn targets are fast (~2s) deterministic harness runs of the same class"
  - "The archive-root token 'v1.22-phases' was named directly from D-29 (159-CONTEXT.md), never transcribed from check-phase-153.mjs's own 'v1.21-phases' token -- the resolver's live-path-first behavior means a wrong token cannot be caught in-phase, and check-phase-125.mjs has carried a wrong token for two milestones for exactly this reason"

patterns-established:
  - "Plain-vs-nested full-apex leg enumeration: rather than scanning every individual chain member's own nested behavior (the predecessor's Task-2-scale scan), this plan enumerates the apex's OWN top-level legs (AUDIT, CHAIN class, AUDIT-HARNESS, HARN03, SELF) as a smaller, targeted table -- sufficient because the additive leg's non-skipping behavior is the only new claim this apex generation needs proven, and the underlying chain-member content was already re-verified standalone in 159-05/159-06"

requirements-completed: []

coverage:
  - id: D1
    description: "check-phase-159.mjs exists, generates its 111-entry chain by arithmetic, holds an empty CHAIN_SKIP, carries the v1.22 harness and archive-root constants, and reports 116 PASS, 0 FAIL, 1 SKIPPED over 117 total checks pre-close-gate"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-159.mjs --verbose"
        status: pass
      - kind: other
        ref: "node -e arithmetic derivation script (chain=111 extra=2 total=117)"
        status: pass
    human_judgment: false
  - id: D2
    description: "The additive V-159-HARN03 leg exercises the converted v1.21 harness for real in both a plain and a nested invocation, never reporting a skip marker in either"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-159.mjs --verbose | grep -i HARN03 (plain)"
        status: pass
      - kind: other
        ref: "CHECK_PHASE_NESTED=1 node scripts/validation/check-phase-159.mjs --verbose | grep -i HARN03 (nested)"
        status: pass
    human_judgment: false
  - id: D3
    description: "No negative substring assertion about the v1.22 harness exists in the apex; the skip set is empty; no string-command child process call exists; the archive-root token and its in-phase unfalsifiability are recorded with provenance"
    verification:
      - kind: other
        ref: "node -e apex-constants/negative-assertion detector"
        status: pass
      - kind: other
        ref: "node -e CHAIN_SKIP declaration-emptiness assertion"
        status: pass
      - kind: other
        ref: "grep -nE 'execSync\\(|child_process\\)\\.exec\\(' scripts/validation/check-phase-159.mjs (no match)"
        status: pass
    human_judgment: false
  - id: D4
    description: "The predecessor apex (check-phase-153.mjs) still exits 0 with 0 FAIL after this plan's commits; its carve-out successor leg's six-file scope is untouched by this phase's work, and every figure whose live value differs from CONTEXT/RESEARCH is recorded with its delta"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-153.mjs"
        status: pass
      - kind: manual_procedural
        ref: "159-EVIDENCE.md §19 deltas table"
        status: pass
    human_judgment: true
    rationale: "Whether the carve-out successor's six-file scope genuinely remains untouched by this phase's specific file edits is a scope-reasoning judgment recorded in prose, not something a single automated command asserts in isolation"

duration: 55min
completed: 2026-09-09
status: complete
---

# Phase 159 Plan 07: Write the v1.22 Terminal Apex Summary

`check-phase-159.mjs` written from the `check-phase-153.mjs` template with a generated 111-entry
chain, the v1.22 harness and archive-root constants, and one additive leg (`V-159-HARN03`) that
exercises the newly-converted v1.21 harness for real in every invocation, including nested ones —
partially discharging the standing nested-flag-visibility deferral for frozen harnesses.

## Performance

- **Duration:** 55 min
- **Started:** 2026-09-09T14:50:00Z
- **Completed:** 2026-09-09T15:45:00Z
- **Tasks:** 3 completed
- **Files modified:** 2 (1 created, 1 modified)

## Accomplishments

- Derived the apex arithmetic by command rather than recalling it: generated chain length 111
  (`[48..158]`), `CHAIN_EXTRA=[30,31]` disjointness proven by an empty intersection, total checks
  117 (1 AUDIT + 111 chain + 2 extra + 1 AUDIT-HARNESS + 1 HARN03 + 1 SELF). Confirmed all 113
  chain-member files (111 span + 2 extra) present on disk before writing the apex.
- Confirmed both spawn targets green before the apex existed: `v1.22-milestone-audit.mjs`
  (16 passed, 0 failed, 0 skipped) and the converted `v1.21-milestone-audit.mjs` (16 passed, 0
  failed, 0 skipped, materializing 307 frozen V121 files).
- Wrote `check-phase-159.mjs`: generated chain (no literal array), empty `CHAIN_SKIP`, `HARNESS`
  pointed at the v1.22 harness, `ARCHIVE_ROOT_TOKEN='v1.22-phases'` named from D-29, and the new
  `V-159-HARN03` additive leg — copied from the AUDIT-HARNESS spawn shape but with the
  `if (NESTED) return skip` branch deliberately omitted, per D-25.
- Apex reports the expected pre-verification triple exactly: `116 PASS, 0 FAIL, 1 SKIPPED (total
  checks: 117)`. The one legitimate skip is `V-159-AUDIT` (159-VERIFICATION.md not yet authored).
  `V-159-HARN03` confirmed passing for real in both a plain run and a `CHECK_PHASE_NESTED=1` run —
  neither output line contains a skip marker.
- Recorded the full plain-vs-nested apex scan: 114 of 117 legs differ in verdict class between the
  two invocations (113 `CHAIN` legs + `AUDIT-HARNESS`, all legitimate by-design nested-optimization
  skips), while `V-159-HARN03` and `V-159-SELF` report identical results in both modes, and
  `V-159-AUDIT` skips identically in both (it never reads `NESTED`).
- Measured the apex's plain-run wall time (~101s) and isolated the enforcing prose-style gate's
  contribution: `check-phase-157.mjs` alone costs ~73s standalone — roughly 72% of the apex's total
  cost — matching 159-06's own accepted "+76s per apex" estimate.
- Re-ran the predecessor apex `check-phase-153.mjs`: now `111 PASS, 0 FAIL, 0 SKIPPED` (up from its
  own documented pre-close-gate `110/0/1`), because v1.21 has since archived and its `V-153-AUDIT`
  leg now finds `153-VERIFICATION.md` at the live archived path. Confirmed its
  `V-153-C17CARVEOUT-SUCCESSOR` leg's six-file scope (`v1.15`..`v1.20` harnesses) remains untouched
  by this phase's work.
- Confirmed no negative substring assertion about any harness exists anywhere in the new apex, the
  skip set is empty (proven by a declaration-emptiness assertion), no string-command child process
  call exists (argument-array form only, confirmed by grep), and `git status --porcelain -- docs/`
  stayed empty across all three of this plan's commits.

## Task Commits

1. **Task 1: Derive the apex arithmetic and confirm every chain member exists** - `2991f6dc` (docs)
2. **Task 2: Write the apex with generated arithmetic, the new constants, and the additive conversion leg** - `38ca25f1` (feat)
3. **Task 3: Record the apex evidence and the nested-visibility scan** - `e934f90c` (docs)

## Files Created/Modified
- `scripts/validation/check-phase-159.mjs` - the v1.22 terminal apex: 117 checks, generated 111-entry chain, additive HARN03 leg
- `.planning/phases/159-harn-harness-close/159-EVIDENCE.md` - §18 (Task 1 arithmetic/presence/harness-green evidence) and §19 (Task 3 plain-vs-nested scan, wall time, provenance, predecessor re-run, deltas) appended

## Decisions Made
- `V-159-HARN03` copies the AUDIT-HARNESS leg's spawn/timeout/failure-detail structure exactly but
  omits the NESTED-skip branch, per D-25 — the only structural deviation from the copied shape.
- Both harness-spawning legs (`AUDIT-HARNESS`, `HARN03`) share the 300,000ms cap; D-29's prose
  scopes the 300s cap to "only" the AUDIT-HARNESS spawn, so this is recorded as a delta in
  159-EVIDENCE.md §19 rather than leaving HARN03 with no explicit timeout at all.
- The archive-root token `'v1.22-phases'` was named directly from D-29, never transcribed from
  `check-phase-153.mjs`'s own `'v1.21-phases'` token — the resolver's live-path-first behavior means
  a wrong token is unfalsifiable in-phase, and a predecessor (`check-phase-125.mjs`) has carried a
  wrong token for two milestones for exactly this reason.

## Deviations from Plan

None - plan executed exactly as written. The one recorded discrepancy (the 300s-cap scope note
above) is a documented delta between CONTEXT prose and the implementation's chosen shape, not a bug,
missing functionality, blocker, or architectural change — it is disclosed in 159-EVIDENCE.md §19 per
the plan's own measurement-discipline instruction (D-65), not corrected as a Rule 1-4 deviation.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness

The v1.22 apex exists, generates its chain correctly, and reports the expected pre-verification
triple (`116 PASS, 0 FAIL, 1 SKIPPED`, 117 total). Its one additive leg (`V-159-HARN03`) proves the
converted v1.21 harness is exercised for real in every invocation. Plan 159-08 (the 19th CI
coexistence workflow) is unblocked — `check-phase-139.mjs`'s `V-139-PROBEJOB`/`V-139-FETCHDEPTH`
guards should be run standalone against the new workflow file before it is committed, and this apex
must be re-measured after that workflow commit lands (a chain member globs every
`audit-harness-*.yml` file). No blockers.

---
*Phase: 159-harn-harness-close*
*Completed: 2026-09-09*

## Self-Check: PASSED

`scripts/validation/check-phase-159.mjs` confirmed present on disk and executable (117 checks,
116 PASS / 0 FAIL / 1 SKIPPED). All three task commits (`2991f6dc`, `38ca25f1`, `e934f90c`)
confirmed in `git log`. `159-EVIDENCE.md` §18/§19 confirmed present with the required tokens
(`nested`, `archive-root`, `117`, `116`). Predecessor apex `check-phase-153.mjs` confirmed still
green (`111 PASS, 0 FAIL, 0 SKIPPED`). `check-phase-54.mjs`/`-55.mjs`/`-56.mjs` each confirmed
`Summary: 32 passed, 0 failed, 0 skipped`. `git status --porcelain -- docs/` confirmed empty.
