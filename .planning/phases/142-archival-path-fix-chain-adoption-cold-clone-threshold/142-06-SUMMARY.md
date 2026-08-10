---
phase: 142-archival-path-fix-chain-adoption-cold-clone-threshold
plan: 06
subsystem: NEST-01 cold-clone threshold measurement
tags: [cold-clone, NEST-01, apex-measurement, mechanism-X, ADVISORY-RECORDED]
dependency graph:
  requires: [142-05 (chain adoption, 95-check apex with CHAIN_EXTRA=[30,31])]
  provides: [142-EVIDENCE.md — NEST-01's measured method, ratio, threshold, and two-tier mechanism-X disposition]
  affects: [Phase 144's close audit, which reads this artifact as NEST-01's evidence]
tech-stack:
  added: []
  patterns: ["git clone --no-hardlinks into a scratch dir outside the repo, timed apex n>=3 warm vs n>=3 cold-clone, ratio compared against a declared threshold (Axis-1 precedent from 138-04)"]
key-files:
  created:
    - .planning/phases/142-archival-path-fix-chain-adoption-cold-clone-threshold/142-EVIDENCE.md
  modified: []
decisions:
  - "Cold-clone median uses the 3 non-verbose runs (2/3/4) to hold verbosity constant against the non-verbose warm denominator; the genuinely-cold verbose run 1 (23092ms) is recorded separately as a confirmatory data point, not folded into the median"
  - "Per-child sweep script kept out of the repo (session scratchpad only) since the plan's files_modified lists only 142-EVIDENCE.md; its JSON output was transcribed into the evidence table, matching the 141-05 sweep's own precedent of a separately-stored raw record"
metrics:
  duration: ~45 min
  completed: 2026-08-10
status: complete
actuals:
  tokens: 12500
  tasks: 2
  commits: 1
---

# Phase 142 Plan 06: NEST-01 Cold-Clone Threshold Summary

Measured the chain-apex's cold-clone cost with a fully declared method (clone depth, cache state,
Defender state, runner, tree identity, verbosity, node version — all six D-27 variables plus node
version), computed the cold-clone/warm ratio against the ratified 8x threshold, published a 92-row
per-child nested marginal-cost table, and recorded the two-tier mechanism-X disposition. Result:
**ratio 1.333x, PASS** (well under the 8x fail threshold).

## What Was Built

**Task 1 + Task 2 (combined into one measurement-and-write pass — both write to the single
`142-EVIDENCE.md` artifact the plan produces, so the work was not splittable into two independently
committable states):**

- **Quiescence-attested warm median** (main worktree, HEAD `1c2c5bbc`): 3 serial runs of
  `check-phase-138.mjs`, non-verbose — 17044 / 16915 / 17722 ms. n=3 (odd), median = **17044 ms**.
  All three reported the adopted 95-check tally.
- **Full-depth cold clone**: `git clone --no-hardlinks D:/claude/Autopilot <scratch-temp-dir>`
  (42771 ms clone-creation, not folded into any apex figure). Attested: no `.git/shallow` marker,
  clone `HEAD` and commit count (3118) both equal to the source tree's. 4 apex runs inside the
  clone — run 1 (`--verbose`, genuinely cache-cold): 23092 ms; runs 2–4 (non-verbose): 22720 / 22983
  / 22647 ms. The n=3 non-verbose sample's median (**22720 ms**) is the ratio's numerator, holding
  the verbose flag constant against the warm denominator; run 1 is recorded separately as a
  confirmatory data point (1.6% from the median). All four reported the adopted 95-check tally.
- **Ratio**: 22720 / 17044 = **1.333x**, compared against the ≥8x fail threshold — **PASS**.
- **Per-child marginal-cost sweep**: all 92 adopted chain members (`CHAIN_PHASES` [48..137] +
  `CHAIN_EXTRA` [30, 31]) spawned individually with `CHECK_PHASE_NESTED=1`, exactly as the apex
  spawns them. Total 15597 ms, mean share 169.53 ms. Six members exceed 3x mean:
  `check-phase-54` (979ms, 5.77x), `-55` (931ms, 5.49x), `-56` (888ms, 5.24x), `-61` (599ms, 3.53x),
  `-67` (744ms, 4.39x), `-70` (621ms, 3.66x) — all exit 0, no content failure, disposition
  `ADVISORY-RECORDED`.
- **Cross-referenced, not re-measured** (D-31): `check-phase-64` standalone (91710ms = 30.6% of the
  300000ms per-subprocess cap — not a crossing candidate) and `check-phase-66` standalone
  (386235ms — the real crossing member, already over cap as a non-peer child of `check-phase-67`,
  recorded for free from `141-EVIDENCE.md`).
- **Cold first-run-of-session**: recorded as its own row per D-16, the 33278/50419/63176 ms range
  cited without re-derivation; explicitly distinguished from this session's own run 1 (17044ms,
  which is a warm-median row, not a first-invocation-of-session row, since this machine's session
  had already exercised git/node before the first `check-phase-138` invocation).
- **Mechanism X, two-tier**: (i) in-phase/executable — the per-child table above, its six named
  outliers, `ADVISORY-RECORDED`; (ii) structural — the frozen-aware full-depth `harness-run`
  checkout, attributed to CARVE-1/SWEEP-01 (Phases 139–141), explicitly not double-booked here.
  Timeout-raise explicitly withdrawn as a mechanism (moves zero wall-clock cost).
- **Disposition statement**: Advisory, does not breach the milestone bar (the two dispositions
  v1.20 must delete are `ACCEPTED-STANDALONE-CI-RED` / `ACCEPTED-SCOPED-RED`; this item is neither),
  citing D-10 not the T-138-23 threat row. No Windows CI runner exists (198/198 jobs
  `ubuntu-latest`).
- **CI cold clone named**: every job's `fetch-depth: 0` checkout on a fresh runner is already a
  genuine cold clone on the authoritative runner class, with Phase 141 Plan 06's 41-job fan-out
  cited as the precedent, not re-derived.
- **A falsifiable threshold-and-response rule** written for a future reader (§"Threshold and
  response rule" in the evidence file), applicable without re-reading this plan.
- Scratch clone removed post-measurement; absence confirmed via a direct `[ -d ... ]` check.

## Verification

- `test -f 142-EVIDENCE.md` — present
- `grep -c 'ADVISORY-RECORDED'` = 3 (≥1 required)
- `grep -c '^| '` = 112 (≥92 required — includes the 92-row per-child table plus other tables' rows)
- `grep -c 'check-phase-66'` = 2 (≥1 required); the artifact states the 30%-of-cap member
  (`check-phase-64`) was NOT re-measured
- `grep -c '8'` = 82 (nonzero); threshold stated as a ratio with n, quiescence attestation, and
  tie-break rule named
- `grep -ci 'defender'` = 3 (≥1 required)
- `grep -ci 'tree identity'` = 7 (≥1 required)
- `git status --porcelain scripts/ .github/ docs/` — empty
- `node scripts/validation/check-phase-138.mjs` — `Result: 95 PASS, 0 FAIL, 0 SKIPPED (total checks:
  95)`, exit 0
- `node scripts/validation/carve-gate.mjs` — `47 in-scope, 47 on-list, 0 off-list`, exit 0

## Deviations from Plan

None — plan executed as written. Both tasks converged on producing the same single artifact
(`142-EVIDENCE.md`), so they were executed and committed together in one commit rather than two,
since no intermediate committable state existed between "measure" (Task 1) and "write the file that
records the measurement" (Task 2).

## Self-Check: PASSED

- FOUND: `.planning/phases/142-archival-path-fix-chain-adoption-cold-clone-threshold/142-EVIDENCE.md`
- FOUND commit `cdb3241a` in `git log --oneline`
- Re-ran `node scripts/validation/check-phase-138.mjs`: 95 PASS/0 FAIL/0 SKIPPED, exit 0 — confirmed
- Re-ran `node scripts/validation/carve-gate.mjs`: 47/47/0, exit 0 — confirmed
- Confirmed scratch clone directory absent (`[ -d ... ]` check returned false)
