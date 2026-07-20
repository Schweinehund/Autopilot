---
phase: 134-v117-pin-16th-path-a-lineage-bump-terminal-close
plan: 01
subsystem: infra
tags: [validator-chain, frozen-at-close, back-anchor-pin, harness-lineage]

# Dependency graph
requires:
  - phase: 128-v116-pin-15th-path-a-lineage-bump-terminal-close
    provides: V116 pin precedent + dual-token positive-confirmation SHA-recovery method
provides:
  - "V117 back-anchor pin (MILESTONE_CLOSE_SHAS.V117 = 'b56bba5') in scripts/validation/_lib/frozen-at-close.mjs"
  - "readAtV117Close convenience export"
  - "WAVE0_ANCHOR SHA for Plan 134-04's predecessor byte-unchanged HARD gate"
affects: [134-02, 134-03, 134-04, 134-05, v1.19-planning]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Back-anchor invariant: single-entry V-tag pin per milestone close, appended never rewritten"]

key-files:
  created: []
  modified:
    - scripts/validation/_lib/frozen-at-close.mjs

key-decisions:
  - "V117 SHA recovered via dual-token positive-confirmation grep, subject-line verified per the v1.17 false-positive caveat (mandatory guardrail from GA-2)"

patterns-established: []

requirements-completed: [HARN-11]

# Metrics
duration: 3min
completed: 2026-07-20
---

# Phase 134 Plan 01: V117 Back-Anchor Pin + Wave-0 Anchor Capture Summary

**Pinned the v1.17 close-gate SHA (b56bba5, subject-line dual-token verified) as `V117` in `frozen-at-close.mjs`, added `readAtV117Close`, and captured the Wave-0 anchor SHA for the terminal byte-unchanged gate.**

## Performance

- **Duration:** 3 min
- **Started:** 2026-07-20T04:58:21Z
- **Completed:** 2026-07-20T05:01:14Z
- **Tasks:** 2 completed
- **Files modified:** 1

## Accomplishments
- Recovered and subject-line-verified the V117 SHA (`b56bba5ea19f9b3fea6376a48dcc24f4ea1d3428`), explicitly ruling out the runner-up (`066a9068`, Atom 2a — subject lacks "MILESTONE CLOSE"), the archival git-rm (`d0fda4f9`), and the safety commit (`6851b54a`) — none of the latter two appear in the dual-token `--all-match` output at all.
- Captured the phase-start Wave-0 anchor SHA before any edit landed: `WAVE0_ANCHOR=18fd8b63bfc68957ced2750b3241ad9760609a94`.
- Added `MILESTONE_CLOSE_SHAS.V117 = 'b56bba5'` + `readAtV117Close` export to `scripts/validation/_lib/frozen-at-close.mjs`, mirroring the V116 entry/export pattern exactly; diff is append-only (9 insertions, 0 deletions) — V116 and all prior entries byte-unchanged.

## Task Commits

Each task was committed atomically:

1. **Task 1: Recover + subject-verify the V117 SHA and capture the Wave-0 anchor** - no file edits (recovery + recording only, per plan spec) — no commit
2. **Task 2: Add the V117 entry + readAtV117Close export to frozen-at-close.mjs** - `c3a3de25` (feat)

**Plan metadata:** (this commit, pending)

## Files Created/Modified
- `scripts/validation/_lib/frozen-at-close.mjs` - Added `V117: 'b56bba5'` entry to `MILESTONE_CLOSE_SHAS` + `readAtV117Close` convenience export

## Recovery Record (HARN-11)

**Recovery command:**
```
git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE" --all-match --format="%H %s"
```

**Newest match (chosen):** `b56bba5ea19f9b3fea6376a48dcc24f4ea1d3428` — subject: `docs(128-07): v1.17 MILESTONE-AUDIT + DEFERRED-CLEANUP + 10-req traceability + v1.17 MILESTONE CLOSE`

**Subject-line verification:**
```
git show -s --format=%s b56bba5e
-> docs(128-07): v1.17 MILESTONE-AUDIT + DEFERRED-CLEANUP + 10-req traceability + v1.17 MILESTONE CLOSE
```
Both tokens (`MILESTONE-AUDIT` and `MILESTONE CLOSE`) confirmed present in the SUBJECT line (not just the body) — the mandatory v1.17-false-positive-caveat check.

**Rejected candidates (confirmed):**
- `066a9068` — Atom 2a commit; subject lacks "MILESTONE CLOSE" (body-only mention).
- `d0fda4f9` — archival git-rm commit; absent from dual-token `--all-match` output entirely.
- `6851b54a` — safety commit; absent from dual-token `--all-match` output entirely.

**WAVE0_ANCHOR=18fd8b63bfc68957ced2750b3241ad9760609a94** (captured via `git rev-parse HEAD`, before the Task 2 edit landed — recorded for Plan 134-04's predecessor byte-unchanged HARD gate).

## Decisions Made
None - followed plan as specified. The SHA recovery was unambiguous this cycle (no live false-positive trap encountered, unlike the v1.17-recovering-V116 cycle), but the subject-line verification step was still performed explicitly per the mandatory guardrail.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

`readAtV117Close` and `MILESTONE_CLOSE_SHAS.V117` are live and verified (`node -e` import check passed: `readAtV117Close` exported, `MILESTONE_CLOSE_SHAS.V117 === 'b56bba5'`). Plan 134-02 (16th Path-A harness) and Plan 134-03 (6 new validators) can proceed. `WAVE0_ANCHOR=18fd8b63bfc68957ced2750b3241ad9760609a94` is recorded above for Plan 134-04's predecessor byte-unchanged HARD gate. No blockers.

---
*Phase: 134-v117-pin-16th-path-a-lineage-bump-terminal-close*
*Completed: 2026-07-20*

## Self-Check: PASSED

- FOUND: scripts/validation/_lib/frozen-at-close.mjs
- FOUND: c3a3de25 (Task 2 commit)
- FOUND: .planning/phases/134-v117-pin-16th-path-a-lineage-bump-terminal-close/134-01-SUMMARY.md
