---
phase: 133-chain-validator-tooling-debt-closure
plan: 04
subsystem: infra
tags: [node, validation-harness, ci, chain-validator, frozen-surface, execFailDetail]

# Dependency graph
requires:
  - phase: 133-01
    provides: TOOL-04 re-pin coordinate methodology (separate D-00a-exception commit, unrelated to this plan)
  - phase: 133-03
    provides: TOOL-05 O(n) attestation (source-cited, no code)
provides:
  - "3 HELPER-SPAWN-STDERR-01 --self-test stderr slice budgets raised n:200 -> n:1000 at check-phase-{48,60,61}.mjs"
  - "Written DEFER-119-A disposition confirming it remains ACCEPTED-ADVISORY, no independent action, for Phase 134's close-audit"
affects: [134-chain-validator-close]

# Tech tracking
tech-stack:
  added: []
  patterns: ["D-00a-exception single-line numeric-literal frozen-surface edit, separate atomic commit per D-09"]

key-files:
  created: []
  modified:
    - scripts/validation/check-phase-48.mjs
    - scripts/validation/check-phase-60.mjs
    - scripts/validation/check-phase-61.mjs

key-decisions:
  - "Chosen stderr slice budget: n:1000 (Claude's discretion per CONTEXT) - 5x the prior 200 chars, enough to show a full --self-test failure block without unbounded output"
  - "DEFER-119-A: no code change - confirmed ACCEPTED-ADVISORY, continue-on-error:true, both pin-helper-advisory steps structurally non-blocking regardless of outcome"

patterns-established:
  - "D-00a-exception commits carry an exact 'D-00a-EXCEPTION: <requirement> <what>, <scope>' attestation line and are verified via git show --stat HEAD to touch only the scoped files"

requirements-completed: [TOOL-06]

# Metrics
duration: 8min
completed: 2026-07-19
---

# Phase 133 Plan 04: TOOL-06 Stderr Slice-Budget Tuning Summary

**Raised the `--self-test` catch-block stderr slice budget from n:200 to n:1000 at the 3 frozen `HELPER-SPAWN-STDERR-01` call sites (check-phase-48.mjs:85, check-phase-60.mjs:201, check-phase-61.mjs:397), landed as its own atomic D-00a-exception commit, and confirmed DEFER-119-A stays ACCEPTED-ADVISORY.**

## Performance

- **Duration:** 8 min
- **Tasks:** 2 (retune 3 call sites; land separate attested commit + DEFER-119-A disposition)
- **Files modified:** 3

## Accomplishments
- Closed the residual TOOL-06 SC#3 numeric-budget nit (core stdout-drop bug already fixed by v1.14 TOOL-03) — the 3 `--self-test` catch blocks now slice up to 1000 chars of combined stdout+stderr instead of 200, enough to show a useful failure excerpt.
- Landed the change as a single, bounded, attested D-00a-exception commit, verified separate from any TOOL-04 re-pin work per D-09/GA-4.
- Documented DEFER-119-A's disposition in writing so Phase 134's close-audit does not re-litigate it.

## Task Commits

Each task was committed atomically:

1. **Task 1 + Task 2 (combined per plan intent — Task 2 IS the commit for Task 1's edits):** `74939dfb` (fix) — "raise --self-test stderr slice budget at 3 frozen call sites" carrying the `D-00a-EXCEPTION: TOOL-06 stderr slice-budget tuning, 3 call sites` attestation line.

_Note: Task 1 (edit) and Task 2 (commit + document) are two steps of one atomic change per the plan's own instruction — Task 2's `<action>` is "Land the 3-site retune as ONE atomic commit." No separate Task-1-only commit was made; the plan does not call for one._

**Plan metadata:** commit for this SUMMARY + STATE/ROADMAP updates (separate, see final commit below).

## Files Created/Modified
- `scripts/validation/check-phase-48.mjs` - `--self-test` catch-block `execFailDetail` call: `n: 200` -> `n: 1000` (line 85)
- `scripts/validation/check-phase-60.mjs` - `--self-test` catch-block `execFailDetail` call: `n: 200` -> `n: 1000` (line 201); the two separate `n: 500` CHAIN/harness sites (lines 247, 269) untouched
- `scripts/validation/check-phase-61.mjs` - `--self-test` catch-block `execFailDetail` call: `n: 200` -> `n: 1000` (line 397); the two separate `n: 500` CHAIN/harness sites (lines 354, 376) untouched

## Decisions Made
- **Chosen `n` value: 1000.** Per CONTEXT this was left to Claude's discretion. 1000 chars is large enough to surface a complete `--self-test` failure message (stack trace head + relevant output) while staying well short of the `n:500`-times-two CHAIN/harness sites' scale-appropriate budget for their different (larger, multi-subprocess) failure context — kept deliberately distinct so the two failure classes remain visually distinguishable in CI logs.
- **DEFER-119-A: auto-resolved, no independent action (D-05).** The `pin-helper-advisory` job is `continue-on-error: true` and both its `--report` (`|| true`) and `--self-test` (`|| echo`) steps are structurally non-blocking regardless of exit code. Any TOOL-04 re-pin of `v1.7-audit-allowlist.json` may incidentally change `--self-test`'s pass/fail outcome but cannot change whether the advisory job blocks the build. This disposition is written here for Phase 134's close-audit to consume without re-litigating.

## Deviations from Plan

None - plan executed exactly as written. Both tasks' acceptance criteria were verified mechanically (node -c syntax check, diff-scope assertions, commit-message grep, `git show --stat` file-count/exclusion checks) and all passed on the first attempt.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- TOOL-06 (SC#3) is closed. Combined with 133-01 (TOOL-04) and 133-03 (TOOL-05), all three Phase 133 requirements (TOOL-04, TOOL-05, TOOL-06) now have their implementation work landed.
- DEFER-119-A's disposition is on record — Phase 134's HARN-12/HARN-13 close-audit does not need to re-investigate it.
- No blockers for Phase 134. The frozen-surface edit surface for this plan is closed: `_lib/exec-fail-detail.mjs`, the `n:500` CHAIN/harness sites, `check-phase-128.mjs`, `regenerate-supervision-pins.mjs`, all `*-audit-allowlist.json` files, and all `.github/` workflows remain byte-unchanged by this plan (verified via the diff-scope gate and `git show --stat`).

---
*Phase: 133-chain-validator-tooling-debt-closure*
*Completed: 2026-07-19*

## Self-Check: PASSED

All claimed files and commits verified present:
- FOUND: scripts/validation/check-phase-48.mjs
- FOUND: scripts/validation/check-phase-60.mjs
- FOUND: scripts/validation/check-phase-61.mjs
- FOUND: .planning/phases/133-chain-validator-tooling-debt-closure/133-04-SUMMARY.md
- FOUND: commit 74939dfb
