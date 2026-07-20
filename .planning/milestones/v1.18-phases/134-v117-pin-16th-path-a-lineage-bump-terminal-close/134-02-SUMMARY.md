---
phase: 134-v117-pin-16th-path-a-lineage-bump-terminal-close
plan: 02
subsystem: infra
tags: [validator-chain, path-a-harness, audit-allowlist, baseline-refresh]

# Dependency graph
requires:
  - phase: 134-v117-pin-16th-path-a-lineage-bump-terminal-close
    plan: 01
    provides: V117 back-anchor pin + WAVE0_ANCHOR SHA
provides:
  - "v1.18-milestone-audit.mjs (16th Path-A harness, C1-C17 inherited verbatim)"
  - "v1.18-audit-allowlist.json (byte-verbatim sidecar, zero pin drift confirmed)"
  - "BASELINE_22 audit-trail comment in regenerate-supervision-pins.mjs"
affects: [134-03, 134-04, 134-05]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Path-A copy-forward: relabel header/usage/parseAllowlist reference only, C1-C17 body byte-identical", "Append-only BASELINE_N audit-trail comment; line-coord array never touched"]

key-files:
  created:
    - scripts/validation/v1.18-milestone-audit.mjs
    - scripts/validation/v1.18-audit-allowlist.json
  modified:
    - scripts/validation/regenerate-supervision-pins.mjs

key-decisions:
  - "v1.18-audit-allowlist.json copied byte-verbatim from v1.17's (only phase/generated metadata changed) — regenerate-supervision-pins.mjs --report positively confirmed zero drift (26 pinned, 0 un-pinned Tier-1/Tier-2, 0 stale) rather than assumed, per the plan's mandatory --report-confirm step"
  - "Pre-Atom-1 HEAD for BASELINE_22 captured as b54043aa (Task 1's own harness-commit), NOT the Wave-0 anchor 18fd8b63 from 134-01-SUMMARY.md, per the Phase 119/125/128 Wave-0-vs-pre-Atom-1-anchor discipline"

patterns-established: []

requirements-completed: [HARN-12]

# Metrics
duration: 8min
completed: 2026-07-20
---

# Phase 134 Plan 02: 16th Path-A Harness + BASELINE_22 Refresh Summary

**Authored `v1.18-milestone-audit.mjs` (Path-A copy of v1.17, C1-C17 inherited verbatim, harness `--verbose` exits 0/16 checks) + byte-verbatim `v1.18-audit-allowlist.json` sidecar (zero pin drift `--report`-confirmed, 26 pinned) + the BASELINE_22 append-only audit-trail comment in `regenerate-supervision-pins.mjs` (BASELINE_9 array byte-unchanged).**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-07-20T05:05:21Z (STATE.md session timestamp)
- **Completed:** 2026-07-20T05:12:00Z
- **Tasks:** 2 completed
- **Files modified:** 3 (2 created, 1 modified)

## Accomplishments

- Copied `v1.17-milestone-audit.mjs` verbatim to `v1.18-milestone-audit.mjs`, relabeling v1.17→v1.18 in the header comment, `Usage:` line, and the `parseAllowlist()` filename reference (line 82). C1-C17 checks inherited byte-identical — grep confirms zero `v1.17-audit-allowlist` residue.
- Copied `v1.17-audit-allowlist.json` byte-verbatim to `v1.18-audit-allowlist.json`, updating only the `"phase"` and `"generated"` metadata fields (26 supervision + 10 c7_knox + 4 c9 + 4 safetynet pins, unchanged identity/count from Phase 133's TOOL-04 14-sidecar convergence).
- Ran `node scripts/validation/regenerate-supervision-pins.mjs --report` (read-only) against the live v1.18 corpus: **26 pinned, 0 un-pinned Tier-1, 0 un-pinned Tier-2, 0 stale pins** — positively confirmed zero drift (not assumed), matching the research's MEDIUM-confidence prediction and Phase 133's prior full-convergence of all 14 sidecars (including the hardcoded `v1.7-audit-allowlist.json` reference this tool's `--report`/`--emit-stubs` modes read from, which is why the report reflects the current 26-pin state rather than a stale v1.7 baseline).
- Ran `node scripts/validation/v1.18-milestone-audit.mjs --verbose`: **16 passed, 0 failed, 0 skipped** (17 check IDs, C4/C8 informational/retired IDs folded in per precedent numbering) — includes the C17 EEE-contract subprocess spawn (`c17-eee-contract.mjs` exits 0). Also ran `--self-test`: 9/9 passed.
- Captured the pre-Atom-1 HEAD (`b54043aa5ed4ec1d89730c5ff328c471fcc8c597` — Task 1's own harness-authoring commit) immediately before editing `regenerate-supervision-pins.mjs`, per the Phase 119/125/128 discipline that the true pre-Atom-1 predecessor is whatever HEAD is at that exact moment, not the Wave-0 anchor (`18fd8b63bfc68957ced2750b3241ad9760609a94`, recorded in 134-01-SUMMARY.md) — Task 1's commit landed between Wave-0 and this Atom 1.
- Added the BASELINE_22 audit-trail comment mirroring the BASELINE_21 template exactly: closes the BASELINE_21 v1.17 carry-over, records the captured HEAD SHA, states the BASELINE_9 array is not altered, and forward-points to BASELINE_23 at the next milestone close. `git diff` on the file shows only added `//` comment lines — zero array-value changes.

## Task Commits

Each task was committed atomically:

1. **Task 1: Path-A copy the 16th harness + sidecar; --report-confirm zero pin drift** - `b54043aa` (feat)
2. **Task 2: Add the BASELINE_22 refresh audit-trail comment** - `9d864882` (docs)

**Plan metadata:** (this commit, pending)

## Files Created/Modified

- `scripts/validation/v1.18-milestone-audit.mjs` - NEW. 16th Path-A audit harness, C1-C17 inherited verbatim from v1.17, allowlist reference relabeled to `v1.18-audit-allowlist.json`.
- `scripts/validation/v1.18-audit-allowlist.json` - NEW. Byte-verbatim sidecar copy of v1.17's, only `phase`/`generated` metadata updated.
- `scripts/validation/regenerate-supervision-pins.mjs` - MODIFIED (append-only). BASELINE_22 audit-trail comment added immediately above `const BASELINE_9 = [`; the array itself is byte-unchanged.

## Pin-Drift Result (HARN-12 acceptance criterion)

**Zero-delta confirmed via `--report`** (not assumed):
```
=== supervision pin report ===
Pinned (in sidecar): 26
Un-pinned Tier-1 (stub-eligible): 0
Un-pinned Tier-2 (suspected regression): 0
Stale pins (line now has no supervision hit): 0
```
No targeted `{file,line}` repoints were required — Phase 133's TOOL-04 re-pin already converged all 14 sidecars (including the hardcoded `v1.7-audit-allowlist.json` this tool's report/stub modes read) to the exact v1.17 pin set, so the v1.18 byte-verbatim copy carries forward with zero drift.

## Pre-Atom-1 HEAD SHA (BASELINE_22)

**`b54043aa5ed4ec1d89730c5ff328c471fcc8c597`** — captured via `git rev-parse HEAD` immediately before authoring the BASELINE_22 comment (Task 2), i.e. after Task 1's harness-authoring commit had already landed. This differs from the Wave-0 anchor `18fd8b63bfc68957ced2750b3241ad9760609a94` recorded in 134-01-SUMMARY.md, per the standing Wave-0-vs-pre-Atom-1-anchor discipline (Phase 119/125/128 precedent).

## Decisions Made

None beyond what the plan specified — followed the plan's mandatory `--report`-confirm step exactly (did not assume zero-delta) and the Phase 119/125/128 anchor-capture discipline for BASELINE_22.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

`v1.18-milestone-audit.mjs` + `v1.18-audit-allowlist.json` are live, harness `--verbose` exits 0 (16/0/0), and `--self-test` passes 9/9. `regenerate-supervision-pins.mjs` carries the BASELINE_22 comment with `--report` still clean. Plan 134-03 (the 6 new `check-phase-129..134.mjs` validators + 15th CI workflow) can proceed — `check-phase-134.mjs`'s AUDIT-HARNESS step will spawn `v1.18-milestone-audit.mjs` per the check-phase-128 template. No blockers.

---
*Phase: 134-v117-pin-16th-path-a-lineage-bump-terminal-close*
*Completed: 2026-07-20*

## Self-Check: PASSED

- FOUND: scripts/validation/v1.18-milestone-audit.mjs
- FOUND: scripts/validation/v1.18-audit-allowlist.json
- FOUND: b54043aa (Task 1 commit)
- FOUND: 9d864882 (Task 2 commit)
