---
phase: 141-standalone-red-validator-set-chain-members-green
plan: 02
subsystem: infra
tags: [ci-validator, frozen-read, supervision-pins, gov-02, carve, tracer]

# Dependency graph
requires:
  - phase: 141-standalone-red-validator-set-chain-members-green
    provides: "Plan 01's governance gate — the withdrawn classifier-context-window mechanism
      no longer forecloses the BASELINE_9 rebase fix, and the CARVE Category 6 clearance for
      this file was already confirmed clean"
provides:
  - "regenerate-supervision-pins.mjs's BASELINE_9 array rebased to its live descendants — the
    single root-cause defect behind all eight RED-03 members' --self-test failure"
  - "One new dated audit-trail comment recording the rebase and the cobo cardinality caveat,
    appended without touching any of the 18 prior comments or the four live-pinned literals"
  - "check-phase-48.mjs proven green bare/standalone (7/7, exit 0) — the end-to-end tracer path
    from corpus content through classify() through the self-test to a chain member's exit code"
  - "check-phase-60.mjs and check-phase-61.mjs proven green bare/standalone (25/0 and 34/0)"
  - "Pre-SWEEP-09-edit nested tallies for check-phase-68 (12/0/21) and check-phase-70 (23/0/28),
    handed to Plan 03 and Phase 142's RED-07 comparison"
  - "One GOV-02 ledger row for the regenerate-supervision-pins.mjs edit"
affects: [141-03, 141-04, 141-05, 141-06, 142-red-07]

# Actuals (#2632)
actuals:
  tokens: 7000
  tasks: 2
  commits: 2

tech-stack:
  added: []
  patterns:
    - "Append-only audit-trail comment above a pinned array literal (D-04/D-05) — a new dated
       line records the fix; the 18 prior lines and the four live-pinned literal substrings
       (V-60-09, V-66-03, V-68-06, V-70-06) survive byte-for-byte"
    - "Set-subtraction self-test invariant survives a non-bijective input: a coordinate present
       on both sides of `sidecarPins − BASELINE_9` vs `classifierTier1Keys − BASELINE_9` cancels
       regardless of whether BASELINE_9 names it — documented rather than 'fixed'"

key-files:
  created: []
  modified:
    - scripts/validation/regenerate-supervision-pins.mjs
    - .planning/milestones/v1.20-GOV-02-LEDGER.md

key-decisions:
  - "Rebased all nine BASELINE_9 coordinates to their live descendants per RESEARCH.md's
     verified target list; re-verified all nine against live content (not the research file)
     before editing, per D-31's re-execute-every-number discipline — every coordinate carried
     a `supervis` token."
  - "Recorded the cobo.md cardinality change honestly: 8 of 9 coordinates are clean lineage
     rebases; the ninth (03-fully-managed-cobo.md) is a 1-occurrence-to-2-occurrence content
     change (lines 51 and 53), of which only 51 is carried forward. Not claimed as a 1:1
     bijection anywhere in the comment or commit message."
  - "Did not touch classify() (D-03) or v1.7-audit-allowlist.json — both confirmed byte-unchanged
     by git diff --stat."
  - "No CARVE D-09 amendment needed for this edit — regenerate-supervision-pins.mjs is already
     CARVE Category 6, on-list; carve-gate.mjs confirmed 40/40 in-scope/on-list both before and
     after."

requirements-completed: []  # RED-02 and RED-03 land fully across this multi-plan phase; this
  # tracer plan proves the fix end-to-end on the cheapest chain member but does not by itself
  # flip the requirement (check-phase-{62..66} remain outside this plan's scope).

coverage: []  # Infra/tooling gate — no UAT-testable deliverable; verified entirely by the
  # automated <verify> commands and acceptance-criteria greps recorded below.

duration: ~35min
completed: 2026-08-08
status: complete
---

# Phase 141 Plan 02: TRACER — BASELINE_9 Rebase Summary

**Rebased the nine stale `BASELINE_9` coordinates in `regenerate-supervision-pins.mjs` to
their live descendants, proving the whole failure mechanism end to end: corpus content ->
`classify()` -> sidecar set-difference -> `--self-test` exit 0 -> bare `check-phase-48` exit 0.**

## Performance

- **Duration:** ~35 min
- **Completed:** 2026-08-08
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- All 9 of 9 `BASELINE_9` coordinates rebased from their dead pre-`aaf0d2ff` positions to their
  live descendants, re-verified against live file content immediately before editing (each of
  the nine target lines confirmed to carry a `supervis` token — see "Re-verified coordinates"
  below).
- One new dated audit-trail comment appended (`// BASELINE_9 refreshed 2026-08-08 (Phase 141
  Plan 02): ...`), honestly recording the 8-clean/1-cardinality-change split rather than
  claiming a false 9-of-9 bijection.
- `regenerate-supervision-pins.mjs --self-test` now exits 0 with an identical diff (17 vs 17
  new-pin sets).
- Bare, non-nested `check-phase-48.mjs` now exits 0 with 7 PASS / 0 FAIL (was 6/1 at phase
  entry — the self-test assertion was the sole failure).
- Bare `check-phase-60.mjs` (25 PASS / 0 FAIL, was 23/2) and `check-phase-61.mjs` (34 PASS /
  0 FAIL, was 31/3) both cleared as a consequence — the `CHAIN-48` and self-test re-invocation
  assertions that were failing now pass.
- Nested pre-SWEEP-09-edit baselines recorded for `check-phase-68.mjs` (12 PASS / 0 FAIL / 21
  SKIPPED, V-68-06 PASS) and `check-phase-70.mjs` (23 PASS / 0 FAIL / 28 SKIPPED, V-70-06 PASS)
  — handed to Plan 03 and Phase 142's RED-07 comparison per D-15.
- One GOV-02 ledger row appended recording the target-scoped path-literal grep (regenerate-
  supervision-pins.mjs: 62 hits in `scripts/`, 47 in `.github/`, 374 files in `.planning/`, none
  a new frozen call-site conflict) and the symbol grep (BASELINE_9/10/11, --self-test), plus
  the full blast-radius regression tally.
- `classify()` byte-unchanged (zero diff hunks in the `:204-238` span), `v1.7-audit-
  allowlist.json` byte-unchanged, `docs/` byte-unchanged (`git diff --stat` empty for both).
- `carve-gate.mjs` exits 0 (40 in-scope, 40 on-list, 0 off-list) both before and after — no
  amendment needed, `regenerate-supervision-pins.mjs` is already CARVE Category 6.

## Re-verified coordinates (D-31 discipline — checked against live content, not the research file)

```
docs/_glossary-android.md:145   ### Supervision
docs/_glossary-android.md:147   > **Android note:** "Supervision" is an iOS/iPadOS management-state concept ...
docs/_glossary-android.md:303   > **Cross-platform note:** On iOS/iPadOS, the analog is Apple's Single App Mode ...
docs/_glossary-android.md:333   | 2026-04-21 | Phase 34 Foundation: ... supervision as callout-only ...
docs/android-lifecycle/00-enrollment-overview.md:65   Android's Fully Managed mode is the closest analog to iOS Supervision ...
docs/android-lifecycle/00-enrollment-overview.md:67   "Supervision" is not an Android management term ...
docs/android-lifecycle/00-enrollment-overview.md:97   - [Apple Provisioning Glossary](../_glossary-macos.md) — for iOS/macOS terminology including [supervision](...)
docs/admin-setup-android/03-fully-managed-cobo.md:51   > **Cross-platform note:** Android's Fully Managed is the closest analog to iOS Supervision on ADE-enrolled devices ...
docs/l2-runbooks/20-android-app-install-investigation.md:33   Unlike iOS (where supervision state and licensing model are the primary failure axes) ...
```

All nine carry a `supervis` token — no coordinate failed the pre-edit check, so no STOP was
triggered.

## Cobo cardinality caveat (recorded honestly, not glossed over)

`docs/admin-setup-android/03-fully-managed-cobo.md` carries **two** Tier-1 supervision
occurrences today (lines 51 and 53) where the old `BASELINE_9` tracked only one (line 36).
`scripts/validation/v1.7-audit-allowlist.json:19-20` already pins both. Only line 51 is
carried forward into the rebased array (matching CONTEXT.md's explicit nine-coordinate target
list). This is **not** a lossless rename — it is safe purely because of the self-test's
set-subtraction invariant: `expectedNewKeys = sidecarPins(Tier-1) − BASELINE_9` and
`classifierNewKeys = classifierTier1Keys − BASELINE_9`. Because line 53 sits in **both**
`sidecarPins` and `classifierTier1Keys` today, it appears in both sets after subtraction and
cancels, regardless of whether `BASELINE_9` names it. Neither the array comment nor the two
commit messages in this plan claim a 9-of-9 bijection.

## Task Commits

Each task was committed atomically:

1. **Task 1: TRACER — rebase BASELINE_9, prove --self-test exits 0 and check-phase-48 exits 0
   standalone** — `a5ffe68f` (fix)
2. **Task 2: Blast-radius verification of the four live pins, chain-member baselines, and the
   GOV-02 ledger row** — `0678ac3c` (docs)

## Files Created/Modified

- `scripts/validation/regenerate-supervision-pins.mjs` — `BASELINE_9` array rebased (9
  coordinates) + one appended dated audit-trail comment (24 insertions, 9 deletions, two diff
  hunks: the appended comment block and the array literal — zero hunks inside `classify()`)
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` — one row appended (append-only verified: the
  sole `^-` diff line is the patch header, not a content removal)

## Decisions Made

See `key-decisions` in frontmatter. In summary: rebase all nine coordinates to live content
verified immediately before editing (not trusted from the research file); record the cobo
cardinality change honestly rather than claiming a bijection; touch nothing inside `classify()`
or the v1.7 fixture; no CARVE amendment needed (Category 6 already on-list).

## Deviations from Plan

None — plan executed exactly as written. Both tasks landed with the exact file-touch scopes
and verification shapes the plan specified.

## Issues Encountered

None. The system clock advanced from 2026-08-07 to 2026-08-08 mid-session (between reading the
plan and writing the audit-trail comment); the appended comment and both commit messages use
2026-08-08, matching the actual commit date and the precedent set by 141-01-SUMMARY.md
(`completed: 2026-08-08`).

## Verification

- `node scripts/validation/regenerate-supervision-pins.mjs --self-test`: **17 vs 17, Diff:
  identical, Self-test: PASS, exit 0.**
- Bare `node scripts/validation/check-phase-48.mjs` (`CHECK_PHASE_NESTED` unset): **7 PASS, 0
  FAIL, 0 SKIPPED, exit 0.**
- `git diff --stat scripts/validation/v1.7-audit-allowlist.json`: empty.
- `git diff --stat docs/`: empty.
- `git diff -U0 scripts/validation/regenerate-supervision-pins.mjs`: two hunks, both at
  `@@ -532,0 +533,15 @@` (the appended comment) and `@@ -534,9 +549,9 @@` (the array literal);
  zero hunks inside the pre-edit `classify()` span (`:204-238`).
- `git diff ... | grep "^-" | grep -c "BASELINE_9 refreshed"` → **0** (no existing comment line
  removed or rewritten).
- `grep -c "BASELINE_9 refreshed 2026-05-06 (Phase 60 Plan 08)"` → **1** (V-60-09 literal intact).
- `grep -c "BASELINE_10 refreshed"` → **1**, `grep -c "Phase 66"` → **5** (V-66-03 literals intact).
- `grep -c "BASELINE_11 refreshed"` → **1**, `grep -c "Phase 70"` → **5** (V-70-06 literals intact).
- `grep -c "v1.7-audit-allowlist.json"` → **6** (V-68-06 literal intact).
- `BASELINE_9` array tuple count via `sed`/`grep`: **9**.
- Neither the appended comment nor either commit message claims a one-to-one/bijective rename
  (the comment explicitly states "Not a lossless 9-of-9 bijection").
- Quiesce assertion (`Get-CimInstance Win32_Process` filtered on `check-phase*` command lines):
  **0** before every timed run.
- Bare `node scripts/validation/check-phase-60.mjs` (warm, second same-day run, 5.95 s): **25
  PASS, 0 FAIL, 0 SKIPPED, exit 0**; V-60-09/V-60-10/V-60-12 individually PASS.
- Bare `node scripts/validation/check-phase-61.mjs` (warm, 10.33 s): **34 PASS, 0 FAIL, 0
  SKIPPED, exit 0**; V-61-21/V-61-32/V-61-34 individually PASS.
- `CHECK_PHASE_NESTED=1 node scripts/validation/check-phase-68.mjs` (warm, 0.27 s, declared
  **nested** — not standalone evidence for SC#2/SC#3 per D-21): **12 PASS, 0 FAIL, 21 SKIPPED,
  exit 0**; V-68-06 PASS. This is the pre-SWEEP-09-edit baseline handed to Plan 03/Phase 142.
- `CHECK_PHASE_NESTED=1 node scripts/validation/check-phase-70.mjs` (warm, 0.75 s, declared
  **nested**, same caveat): **23 PASS, 0 FAIL, 28 SKIPPED, exit 0**; V-70-06 PASS. Same
  pre-SWEEP-09-edit baseline handoff.
- `node scripts/validation/carve-gate.mjs`: **PASS, 40 in-scope, 40 on-list, 0 off-list, exit
  0** — run after both tasks; `regenerate-supervision-pins.mjs` is CARVE Category 6, already
  on-list, no D-09 amendment needed for this edit.
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` gained exactly one appended row; the single
  `^-` line in the diff is the patch header, not a content removal.
- No bare (non-nested) `check-phase-66` run was made in this plan — it costs ~665 s standalone
  and belongs to Plan 05's single budgeted sweep, per the plan's explicit prohibition.
- All wall-clock figures above are warm-cache (this is the second-or-later invocation of each
  validator this session) and were each run serially — never two validators concurrently.

## Next Phase Readiness

The single defect behind all eight RED-03 members' `--self-test` failure is repaired and
proven end to end on the cheapest chain member (`check-phase-48`, 0.5 s) plus the two next-
cheapest (`check-phase-60`/`-61`). `check-phase-62` through `-66` are expected to clear as a
consequence once exercised — that measurement belongs to Plan 05's budgeted sweep, not this
plan. `check-phase-61`'s `readAtV15CloseFor61` delegation (SWEEP-09) and `check-phase-68`/`-70`'s
chicken-and-egg call-site conversions (SWEEP-09) remain open for Plan 03, which now has a
recorded pre-edit nested baseline (12/0/21 and 23/0/28) to diff against. No blockers.

## Self-Check: PASSED

- FOUND: `.planning/phases/141-standalone-red-validator-set-chain-members-green/141-02-SUMMARY.md`
- FOUND: `scripts/validation/regenerate-supervision-pins.mjs`
- FOUND: `.planning/milestones/v1.20-GOV-02-LEDGER.md`
- FOUND: commit `a5ffe68f`
- FOUND: commit `0678ac3c`

---
*Phase: 141-standalone-red-validator-set-chain-members-green*
*Completed: 2026-08-08*
