---
phase: 141-standalone-red-validator-set-chain-members-green
plan: 04
subsystem: infra
tags: [ci-validator, timeout, github-actions, gov-02, carve, frozen-read, subprocess-nesting]

# Dependency graph
requires:
  - phase: 141-standalone-red-validator-set-chain-members-green
    provides: "Plan 03's SWEEP-09 13-site fail-loud landing (check-phase-61/68/70) plus its
      OWNER-RATIFIED addendum repointing check-phase-70's V-70-18..22 to the V17_CLOSEGATE
      reader, whose green nested baselines (check-phase-68 12/0/21, check-phase-70 28/0/23)
      this plan re-confirms unchanged after every edit"
provides:
  - "check-phase-68.mjs, check-phase-69.mjs, check-phase-70.mjs: subEnv now propagates
    CHECK_PHASE_NESTED unconditionally (matching the 14-validator precedent: 72,73,74,82,88,
    93,95,100,112,119,125,128,134,138), not gated on isPeer -- a genuine, previously-unknown
    defect this plan discovered and the owner ratified fixing in-plan (Task 1a, extended scope)"
  - "Bare check-phase-68.mjs: 926520ms/exit 1 (2 FAIL: CHAIN-65/CHAIN-66, real timeouts
    misclassified as content failures) -> 42633ms/exit 0 (33 PASS, 0 FAIL, 0 SKIPPED) after
    Task 1a -- this is the new Phase-142 RED-07 bare-invocation baseline"
  - "check-phase-66.mjs:318 and check-phase-67.mjs:261 chain-spawn timeouts raised
    300000ms->1800000ms (D-17); check-phase-66.mjs:341 and check-phase-67.mjs:287 (the two
    harness/AUDIT spawns) keep the literal timeout:300000 so check-phase-68.mjs:225 V-68-11's
    substring-presence check stays green"
  - "29 needs:harness-run jobs across audit-harness-v1.{5,6,7}-integrity.yml (15/7/7) now carry
    if: always(), so every fanned-out validator job reports a real result instead of skipped
    once Plan 06 dispatches the first-ever run of the 19 never-executed v1.5/v1.6 jobs; the two
    pre-existing quarterly-schedule guards are conjoined, never replaced"
  - "check-phase-67's CI job timeout-minutes raised 15->60 (still exponential, untouched by
    Task 1a); check-phase-68/69/70's left at their existing 15 (Task 1a's fix already drops
    their floor well under that cap); linux-chain-ubuntu-latest's 30 left untouched (Plan 06
    triage watch item, unchanged from the plan's own prohibition)"
  - "Eight GOV-02 ledger rows appended (3 for Task 1a, 2 for Task 2, 3 for Task 3) -- more than
    the plan's originally-anticipated 5, due to the owner-ratified scope extension"
affects: [141-05, 141-06, 142-red-07, 144-close-audit]

# Actuals (#2632)
actuals:
  tokens: 8900
  tasks: 4
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Unconditional CHECK_PHASE_NESTED subEnv propagation: const subEnv = { ...process.env,
       CHECK_PHASE_NESTED: '1' }, with isPeer selecting subTimeout only -- the 14-validator
       precedent (check-phase-72 et al.), now also applied to the v1.7-era trio (68/69/70)
       that had never received it."
    - "CI job-cap sizing derived from a real re-measurement, not a blanket floor: when a fix
       changes a validator's measured floor by an order of magnitude mid-plan, the job-cap rule
       is re-applied against the NEW figure (with a documented cold-multiplier + margin), not
       against the stale pre-fix figure -- recorded explicitly as an owner-ratified amendment to
       the plan's own acceptance text, not silently reconciled."

key-files:
  created: []
  modified:
    - scripts/validation/check-phase-66.mjs
    - scripts/validation/check-phase-67.mjs
    - scripts/validation/check-phase-68.mjs
    - scripts/validation/check-phase-69.mjs
    - scripts/validation/check-phase-70.mjs
    - .github/workflows/audit-harness-v1.5-integrity.yml
    - .github/workflows/audit-harness-v1.6-integrity.yml
    - .github/workflows/audit-harness-v1.7-integrity.yml
    - .planning/milestones/v1.20-GOV-02-LEDGER.md

key-decisions:
  - "Halted Task 1 mid-plan per its own explicit action text ('if the tally is not zero-FAIL,
     STOP and report') rather than auto-fixing under Rules 1-3 -- the discovered defect
     (check-phase-68's own subEnv gating) lived in a file outside this plan's files_modified
     list and outside CONTEXT.md's ratified D-17/D-18 scope, so it required owner sign-off
     before extending scope, matching this milestone's established discipline for every
     timeout-site decision."
  - "Owner ratified Task 1a (subEnv alignment for check-phase-68/69/70) as an in-plan scope
     extension, with the precedent (14 other chain validators already use the unconditional
     form) as the deciding evidence -- landed as its own atomic commit before re-running the
     Task 1 baseline, per the ratification's stated sequence."
  - "check-phase-67.mjs was explicitly excluded from Task 1a (only :261's timeout value moves,
     per D-12/D-13's Phase-144 deferral) -- its CI job cap was sized against a DERIVED (not
     re-measured) ~22.4min floor using the plan's original rule (max(60, 2x floor)=60), distinct
     from 68/69/70 which now stay at their existing 15min cap."
  - "Caught and corrected two self-introduced defects before committing Task 2: an inline code
     comment on check-phase-67.mjs accidentally used the literal phrase 'chicken-and-egg',
     inflating that file's pinned grep count from 7 to 8, and the same comment's line count
     exceeded the plan's 'at most 2 added/1 removed' diff-scope acceptance criterion. Re-grepped
     and shortened the comment to a single line before staging -- verified, not assumed."

requirements-completed: []  # RED-03 (this plan's listed requirement) needs check-phase-{62..66}
  # exercised standalone too, per 141-03-SUMMARY.md's own handoff note ("RED-03 needs
  # check-phase-{62..66} exercised too (Plan 05's scope)") -- explicitly Plan 05's budgeted
  # sweep, not landed here. Marking RED-03 complete now would be premature.

coverage: []  # Infra/tooling gate -- no UAT-testable deliverable; verified entirely by the
  # automated <verify> commands, acceptance-criteria greps, and the nested/bare validator runs
  # recorded below.

duration: ~65min
completed: 2026-08-08
status: complete
---

# Phase 141 Plan 04: Timeout Root-Cause Repair + CI Fan-Out Enablement Summary

**Discovered and fixed a third, previously-unknown timeout defect (check-phase-68/69/70's
subEnv gated CHECK_PHASE_NESTED on isPeer instead of propagating it unconditionally) via an
owner-ratified scope extension, dropping check-phase-68's bare floor from 926s/exit-1 to
43s/exit-0, then landed the two originally-scoped D-17 chain-spawn timeout raises and enabled
all 29 CI fan-out jobs with if: always(), sizing each job's cap against real measurement rather
than a blanket formula.**

## Performance

- **Duration:** ~65 min (includes the halted Task 1 measurement, the owner ratification
  round-trip, and the three committed tasks)
- **Completed:** 2026-08-08
- **Tasks:** 4 (Task 1a + Task 1 re-run + Task 2 + Task 3; Task 1's initial halted measurement
  produced no commit)
- **Files modified:** 9

## Accomplishments

- **Task 1 (measurement, halted then re-run):** Bare `node scripts/validation/check-phase-68.mjs`
  first measured **926 520 ms, exit 1** (31 PASS, **2 FAIL**: `CHAIN-65`/`CHAIN-66`) -- a real
  timeout, not a content defect. Root-caused to `check-phase-68.mjs:266-270`'s `subEnv = isPeer
  ? {...,CHECK_PHASE_NESTED:'1'} : process.env`, which left phases 48-66 spawned bare (no nested
  short-circuit) under the non-peer `300000ms` cap -- `check-phase-65` (305-335s measured) and
  `check-phase-66` (~665s measured) both exceed that cap when invoked this way. Per Task 1's own
  action text ("if the tally is not zero-FAIL, STOP and report"), halted and reported rather than
  auto-fixing a file outside this plan's `files_modified` scope.
- **Task 1a (new, owner-ratified scope extension):** Aligned `check-phase-68.mjs`,
  `check-phase-69.mjs`, `check-phase-70.mjs` to the 14-validator precedent -- `subEnv` now
  propagates `CHECK_PHASE_NESTED` unconditionally, with `isPeer` selecting only `subTimeout`.
  Blast-radius verified: the old conditional-ternary literal had zero external pins anywhere in
  `scripts/validation/*.mjs` or `.github/workflows/*.yml`, and `V-68-11`'s `VALIDATORS=[62..66]`
  array is untouched. Nested tallies unchanged post-edit (68: 12/0/21, 69: 9/0/22, 70: 28/0/23 --
  all exit 0), confirming nested mode short-circuits before reaching `subEnv` and only the bare
  invocation path changed.
- **Task 1 re-run (after Task 1a):** Bare `check-phase-68.mjs` re-measured quiesced:
  **33 PASS, 0 FAIL, 0 SKIPPED, exit 0, 42 633 ms** -- the zero-FAIL gate now met. This is the
  new Phase-142 RED-07 bare-invocation baseline.
- **Task 2:** Raised the two D-17 chain-spawn timeouts -- `check-phase-66.mjs:318`
  (`300000`->`1800000`) and `check-phase-67.mjs:261` (`300000`->`1800000`), each with a one-line
  inline comment. `check-phase-66.mjs:341` and `check-phase-67.mjs:287` (the harness/`V-67-AUDIT`
  spawns) keep the literal `timeout: 300000`, satisfying `check-phase-68.mjs:225` V-68-11's
  substring-presence check across phases 62-66. This is the ONLY edit this milestone makes to
  `check-phase-67.mjs`; its `chicken-and-egg` count confirmed unchanged at 7 both before and
  after. `git diff --numstat` on `check-phase-67.mjs` = 2 added/1 removed. Verified nested:
  `check-phase-66` (V-66-03/V-66-05 PASS), `check-phase-68` (V-68-11 PASS, 12/0/21 unchanged),
  `check-phase-73`/`check-phase-74` (the two live pins on `check-phase-67.mjs`'s content, both
  `content.includes()`/`content.match()` string assertions rather than raw line-index pins --
  confirmed unaffected, both exit 0).
- **Task 3:** Added `if: always()` to all 29 `needs: harness-run` jobs across
  `audit-harness-v1.{5,6,7}-integrity.yml` (15/7/7). The two jobs with a pre-existing
  quarterly-schedule guard (`v1.6`/`v1.7`'s `rotting-external-quarterly`) were conjoined via
  `if: always() && github.event_name == 'schedule' && github.event.schedule == '0 8 1 1,4,7,10
  *'`, preserving the expression verbatim rather than replacing it. Job-cap sizing was revised
  against Task 1a's discovery: `check-phase-67`'s `timeout-minutes` raised `15`->`60` (its
  `:261` spawn still has no `env:` override at all, so a bare run still re-expands 48-66
  non-nested; derived warm floor ~1342.8s/~22.4min from CONTEXT.md's per-member figures, rule
  `max(60, 2x floor)`=`60`). `check-phase-68/69/70`'s caps left unchanged at `15` -- Task 1a's
  fix already drops their measured floor to 42.633s; even applying D-22's measured 6.8x
  cold/warm multiplier plus a 2x safety margin (~9.66min) the existing 15min cap is already
  sufficient, and this milestone's own prohibition bars lowering any existing timeout regardless.
  `linux-chain-ubuntu-latest`'s existing 30min cap left untouched (Plan 06 triage watch item, per
  the plan's own prohibition). Negative-grep confirms zero trigger/path-filter/checkout-depth/
  runner/step lines removed. `actionlint` not installed on this machine -- recorded; Plan 06's
  `gh workflow run` dispatch is the real YAML-parse gate.

## Task Commits

Each task was committed atomically:

1. **Task 1a: Align check-phase-68/69/70's subEnv to unconditional nesting** -- `15d59e89` (fix)
2. **Task 2: Raise the two in-script chain-spawn caps (D-17)** -- `a8d81b42` (fix)
3. **Task 3: if: always() on 29 fan-out jobs + revised job-cap sizing** -- `4841266d` (ci)

_Task 1's initial measurement (halted) and its re-run (after Task 1a) produced no commits --
both are measurement-only, recorded in this SUMMARY and the GOV-02 ledger._

## Files Created/Modified

- `scripts/validation/check-phase-66.mjs` -- `:318` chain-spawn timeout raised to 1800000; `:341`
  harness spawn's `timeout: 300000` left untouched
- `scripts/validation/check-phase-67.mjs` -- `:261` chain-spawn timeout raised to 1800000 (only
  edit this milestone makes to this file); `:287`'s `timeout: 300000` left untouched
- `scripts/validation/check-phase-68.mjs` -- `subEnv` unconditional-nesting alignment (Task 1a)
- `scripts/validation/check-phase-69.mjs` -- `subEnv` unconditional-nesting alignment (Task 1a)
- `scripts/validation/check-phase-70.mjs` -- `subEnv` unconditional-nesting alignment (Task 1a)
- `.github/workflows/audit-harness-v1.5-integrity.yml` -- 15 `if: always()` insertions
- `.github/workflows/audit-harness-v1.6-integrity.yml` -- 7 `if: always()` insertions (1
  conjoined with the pre-existing schedule guard)
- `.github/workflows/audit-harness-v1.7-integrity.yml` -- 7 `if: always()` insertions (1
  conjoined); `check-phase-67`'s `timeout-minutes` raised 15->60
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` -- 8 rows appended (3 Task 1a, 2 Task 2, 3 Task 3)

## Decisions Made

See `key-decisions` in frontmatter. In summary: honored Task 1's own explicit halt instruction
rather than auto-fixing an out-of-scope file; the owner ratified extending scope to the trio's
`subEnv` alignment (Task 1a) citing the 14-validator precedent as deciding evidence; sized
`check-phase-67`'s CI cap against a derived floor (unaffected by Task 1a) distinct from
`68/69/70`'s cap (left unchanged, now well-covered by the re-measured floor); caught and fixed
two self-introduced acceptance-criteria violations (an inflated `chicken-and-egg` grep count and
an oversized diff) in `check-phase-67.mjs`'s comment before committing.

## Deviations from Plan

### Auto-fixed Issues (self-caught, before commit)

**1. [Self-correction] check-phase-67.mjs comment accidentally used the pinned phrase
"chicken-and-egg"**
- **Found during:** Task 2, pre-commit acceptance-criteria re-verification
- **Issue:** The first draft of the inline comment explaining the timeout raise read "...its
  chicken-and-egg guards/silent passes stay deferred to Phase 144", inflating
  `grep -c "chicken-and-egg" scripts/validation/check-phase-67.mjs` from 7 to 8 and the diff
  `--numstat` to 5 added/1 removed, both violating this task's explicit acceptance criteria.
- **Fix:** Shortened the comment to a single line without the phrase: "raised from 300000, mirrors
  check-phase-66.mjs:318."
- **Files modified:** scripts/validation/check-phase-67.mjs
- **Verification:** Re-ran both greps post-fix: `chicken-and-egg` = 7 (unchanged), `--numstat` =
  2 added/1 removed (within the "at most 2/1" limit).
- **Committed in:** `a8d81b42` (Task 2 commit; the corrected comment is what's in the diff)

### Owner-ratified scope extension (not a silent fix)

**2. [Rule 4 -> Owner-ratified] Task 1a: check-phase-68/69/70's subEnv gating**
- **Found during:** Task 1's initial measurement (bare check-phase-68.mjs, 926520ms/exit 1)
- **Issue:** `check-phase-68.mjs`'s (and, by the identical pattern, `check-phase-69.mjs`'s and
  `check-phase-70.mjs`'s) `CHAIN-*` loop gated `CHECK_PHASE_NESTED` propagation on `isPeer
  (phaseNum >= 67)`, leaving phases 48-66 spawned bare under a 300000ms cap that two of their
  real children (`check-phase-65`, `check-phase-66`) exceed -- a third manifestation of the D-17
  timeout-root-cause class, at a call site not named in CONTEXT.md/RESEARCH.md and not in this
  plan's `files_modified`.
- **Why not auto-fixed under Rules 1-3:** This milestone's established discipline treats every
  timeout call site and value as an owner-ratified decision (D-17/D-18/D-31); silently expanding
  scope to a third, previously-unreviewed site would have been exactly the kind of unreviewed
  scope creep that discipline exists to prevent.
- **Resolution:** Halted per Task 1's own action text, reported the finding with root cause and
  precedent evidence (14 other chain validators already use the unconditional form), and the
  owner ratified Task 1a as an in-plan scope extension.
- **Files modified:** scripts/validation/check-phase-68.mjs, check-phase-69.mjs, check-phase-70.mjs
- **Verification:** Bare check-phase-68.mjs re-measured 33/0/0, exit 0 (was 31/2/0, exit 1).
  Nested tallies for all three unchanged (12/0/21, 9/0/22, 28/0/23). carve-gate.mjs 42/42/0 (no
  amendment needed, Category 5 already on-list).
- **Committed in:** `15d59e89` (Task 1a commit)

**3. [Owner-ratified] Task 3's job-cap acceptance text superseded**
- **Found during:** Task 3, after Task 1a's re-measurement
- **Issue:** The plan's original Task 3 acceptance criteria expected all four v1.7 jobs
  (`check-phase-67/68/69/70`) raised away from `timeout-minutes: 15` (`grep -c "timeout-minutes:
  15" ... returns 0`). That text predates Task 1a's discovery.
- **Resolution (per the coordinator's explicit ratification message):** Only `check-phase-67`
  (unaffected by Task 1a) was raised, to `60`. `check-phase-68/69/70` were left at their existing
  `15` -- now comfortably sufficient given the re-measured floor, and lowering is separately
  prohibited regardless. `grep -c "timeout-minutes: 15" .github/workflows/audit-harness-v1.7-integrity.yml`
  now returns **3**, not 0 -- an intentional, owner-ratified departure from the plan's literal
  acceptance text, with the sizing arithmetic recorded in the GOV-02 ledger and this SUMMARY
  rather than silently reconciled.
- **Files modified:** .github/workflows/audit-harness-v1.7-integrity.yml
- **Verification:** See Task 3 accomplishments above; carve-gate.mjs 44/44/0; nested
  check-phase-69/70 confirm V-69-08/V-70-17 unaffected.
- **Committed in:** `4841266d` (Task 3 commit)

---

**Total deviations:** 1 self-caught-and-fixed (comment phrasing), 2 owner-ratified scope/text
changes (Task 1a's discovery, Task 3's sizing amendment).
**Impact on plan:** The scope extension was necessary for RED-03's eventual bare-invocation
requirement to be achievable at all (check-phase-68 could not otherwise reach zero-FAIL bare) and
was explicitly owner-approved before landing, not assumed. No unauthorized scope creep.

## Issues Encountered

The first background measurement attempt for Task 1 (a `powershell -Command` string with
backtick line-continuation) failed with a bash quoting error before any timed work started;
rewritten as a `.ps1` script file invoked via `powershell -File`, which ran cleanly in the
background for both the halted (926520ms) and re-run (42633ms) measurements. No other tooling
issues.

## Next Phase Readiness

Both D-17 timeout root causes are repaired, the `check-phase-68/69/70` subEnv defect Task 1a
discovered is fixed and proven via re-measurement, and all 29 CI fan-out jobs now evaluate
regardless of the upstream harness result. `check-phase-66`/`-67`/`-68`/`-69`/`-70` and the two
validators pinning `check-phase-67.mjs`'s content (`-73`/`-74`) all exit 0 nested with their
individually-named assertions PASS. `carve-gate.mjs` exits 0 throughout (44/44/0, final state).

**Handed to Plan 05:** the new bare `check-phase-68` baseline (33/0/0, exit 0, 42633ms) for
comparison once Plan 05's budgeted `check-phase-{62..66}` standalone sweep lands -- RED-03 is
not yet complete (this plan intentionally left `requirements-completed: []`; RED-03 needs
`check-phase-{48,60,61,62,63,64,65,66}` all exit 0 standalone, which Plan 05 owns per
`141-03-SUMMARY.md`'s own handoff).

**Handed to Plan 06:** the `check-phase-67` job's now-60min cap and the unchanged 15min caps on
`68/69/70`, both explicitly labelled provisional/DERIVED pending the first real cold-clone CI
measurement; the `if: always()` fan-out is the prerequisite Plan 06's dispatched run needed to
distinguish a green run from an unrun (`skipped`) one.

**Handed to Phase 142 (RED-07):** the corrected bare `check-phase-68` baseline (33/0/0, exit 0)
supersedes any pre-Task-1a figure for that comparison.

No blockers to Plan 05 proceeding.

## Self-Check: PASSED

- FOUND: `.planning/phases/141-standalone-red-validator-set-chain-members-green/141-04-SUMMARY.md`
- FOUND: `scripts/validation/check-phase-66.mjs`
- FOUND: `scripts/validation/check-phase-67.mjs`
- FOUND: `scripts/validation/check-phase-68.mjs`
- FOUND: `scripts/validation/check-phase-69.mjs`
- FOUND: `scripts/validation/check-phase-70.mjs`
- FOUND: `.github/workflows/audit-harness-v1.5-integrity.yml`
- FOUND: `.github/workflows/audit-harness-v1.6-integrity.yml`
- FOUND: `.github/workflows/audit-harness-v1.7-integrity.yml`
- FOUND: `.planning/milestones/v1.20-GOV-02-LEDGER.md`
- FOUND: commit `15d59e89`
- FOUND: commit `a8d81b42`
- FOUND: commit `4841266d`

---
*Phase: 141-standalone-red-validator-set-chain-members-green*
*Completed: 2026-08-08*
