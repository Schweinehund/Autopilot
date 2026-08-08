---
phase: 141-standalone-red-validator-set-chain-members-green
plan: 03
subsystem: infra
tags: [ci-validator, frozen-read, gov-02, carve, negative-harness, sweep-09]

# Dependency graph
requires:
  - phase: 141-standalone-red-validator-set-chain-members-green
    provides: "Plan 02's BASELINE_9 rebase (the single root-cause defect behind all eight RED-03
      members' --self-test failure) and its recorded pre-SWEEP-09-edit nested baselines for
      check-phase-68 (12/0/21) and check-phase-70 (23/0/28), diffed against in this plan"
provides:
  - "readAtV15CloseFor61 in check-phase-61.mjs delegates to the already-imported library reader
    (readAtV15Close) instead of its own inline execFileSync+try/catch-to-null; a failed frozen
    read now throws with a typed frozenCause and reaches the runner's outer catch"
  - "Twelve chicken-and-egg call-site returns converted from pass:true/skipped:true to
    pass:false across check-phase-68.mjs (2) and check-phase-70.mjs (10), each with its own
    file-specific detail string; wrapper try/catch untouched; check-phase-67.mjs untouched"
  - "Three new numbered assertions (8-10) in frozen-read-negative-test.mjs proving all thirteen
    SWEEP-09 sites fail loud inside a genuine file:// depth-1 shallow clone (10/10 PASS total)"
  - "DISCOVERY: check-phase-70's nested (deep-clone) tally is no longer identical pre/post edit
    (23/5/23 vs the pre-edit 23/0/28) -- 5 of its converted sites read two documents that
    genuinely do not exist at the aa6de68 SHA (authored later, in Plan 70-05). Recorded as the
    authoritative post-edit baseline for Phase 142's RED-07 comparison, not silently reconciled."
  - "Four GOV-02 ledger rows appended (one per edited file)"
affects: [142-red-07, 144-close-audit]

# Actuals (#2632)
actuals:
  tokens: 12000
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Delegate-not-swallow reader fix (SWEEP-03 precedent, check-phase-49.mjs:264): replace an
       inline try/catch-to-null body with a one-line call to the already-imported library
       reader, keeping the function's own name byte-identical when an external file pins that
       identifier via a tolerant-OR (check-phase-68.mjs:206 V-68-10)."
    - "Chicken-and-egg call-site conversion: change only the RETURN at the call-site
       (pass:true/skipped:true -> pass:false with a per-site detail string), never the shared
       wrapper reader function's own try/catch -- other call-sites in the same wrapper still
       legitimately rely on receiving null."
    - "Nested-invocation negative-harness assertions (CHECK_PHASE_NESTED=1 set on the
       subprocess env, not the harness's own env) bound a shallow-clone probe to the specific
       frozen-read checks under test while short-circuiting the CHAIN-* regression guards that
       would otherwise expand the D-32 exponential 48-66 sub-chain inside the clone."

key-files:
  created: []
  modified:
    - scripts/validation/check-phase-61.mjs
    - scripts/validation/check-phase-68.mjs
    - scripts/validation/check-phase-70.mjs
    - scripts/validation/frozen-read-negative-test.mjs
    - .planning/milestones/v1.20-GOV-02-LEDGER.md

key-decisions:
  - "Kept comments free of the literal identifiers they describe (readAtV15CloseFor61,
     execFileSync) where a plain-English paraphrase suffices -- the acceptance criteria pin
     exact grep counts (9 and 4 respectively) and an incidental comment mention would have
     inflated them. Verified by re-grepping after each edit, not assumed."
  - "Did NOT edit _lib/frozen-at-close.mjs's header comment (lines 10-13), which now describes
     check-phase-61.mjs as keeping 'a deliberate exception... a genuinely inline reader' -- this
     is stale after Task 1's delegation, but the file is outside this plan's files_modified
     scope and CARVE Category 4 edits were not authorized here. Recorded, not fixed (D-05
     pattern) -- flagged below for Phase 144."
  - "Did NOT repoint check-phase-70.mjs's 5 diverging call-sites (V-70-18/19/20/21/22) to a
     *CloseGate-style reader (mirroring V-70-24's existing readProjectAtV17CloseGate() pattern)
     even though that would restore the pre-edit deep-clone tally. This plan's <action> text
     authorizes only a return-field flip at the twelve named call-sites, not a reader-function
     rewrite; the SHA-repointing fix is architectural (new reader function(s)) and belongs to a
     future plan, not squeezed into this one's scope."
  - "Recorded the check-phase-70 nested-tally divergence as the authoritative post-edit
     baseline (23 PASS/5 FAIL/23 SKIPPED, exit 1) rather than reconciling it to match the
     plan's predicted 23/0/28 -- the plan's own flagged_assumptions text explicitly
     pre-authorizes exactly this outcome as 'correct behaviour, not a defect in this plan.'"

requirements-completed: []  # SWEEP-09 lands 13 of its Phase-141 sites here (check-phase-61's
  # reader + the 12 chicken-and-egg call-sites in 68/70); check-phase-67's 7 remaining sites are
  # explicitly deferred to Phase 144 (D-12), so the requirement does not flip complete from this
  # plan alone. RED-03 needs check-phase-{62..66} exercised too (Plan 05's scope).

coverage: []  # Infra/tooling gate -- no UAT-testable deliverable; verified entirely by the
  # automated <verify> commands, acceptance-criteria greps, and the negative-harness run
  # recorded below.

duration: ~50min
completed: 2026-08-08
status: complete
---

# Phase 141 Plan 03: SWEEP-09 — Thirteen Fail-Loud Reader Sites Summary

**Routed check-phase-61's inline `readAtV15CloseFor61` through the shared frozen-read library
and converted twelve `chicken-and-egg` call-site returns in check-phase-68/70 from
passing-but-skipped to failing, proven end to end by three new `file://` shallow-clone
negative-harness assertions (10/10 PASS) -- and surfaced a genuine pre-existing latent defect
in check-phase-70 that the pre-edit code had been silently masking.**

## Performance

- **Duration:** ~50 min
- **Completed:** 2026-08-08
- **Tasks:** 3
- **Files modified:** 5

## Accomplishments

- `readAtV15CloseFor61` (`check-phase-61.mjs`) now delegates to the already-imported
  `readAtV15Close` library reader instead of an inline `execFileSync`+`try/catch`-to-null; the
  function's own name survives byte-identical (grep count 9, unchanged), so
  `check-phase-68.mjs:206` V-68-10's tolerant-OR still passes. Bare `check-phase-61.mjs` exits 0
  with an unchanged 34/0/0 tally.
- Twelve chicken-and-egg call-site returns converted from `{pass:true, skipped:true, ...}` to
  `{pass:false, detail: '<file-specific text>'}`: 2 in `check-phase-68.mjs` (`:123`
  `regenerate-supervision-pins.mjs`, `:185` `MILESTONES.md`), 10 in `check-phase-70.mjs`
  (9 guarding `aa6de68`, 1 -- `:485` -- guarding the distinct close-gate SHA `4df3a16`, each
  given its own detail string per D-14). Wrapper reader functions' `try/catch` left completely
  untouched; `check-phase-67.mjs` left completely untouched (`chicken-and-egg` count unchanged
  at 7, `git diff --stat` empty).
- Three new numbered assertions (8, 9, 10) added to `frozen-read-negative-test.mjs`, reusing the
  existing `file://` depth-1 clone and its `.git/shallow` hard guard, each subprocess run with
  `CHECK_PHASE_NESTED=1` to bound the probe to the frozen-read checks under test. All 10/10
  assertions PASS, exit 0. Assertion 8 asserts the `unreachable-sha` cause token is present in
  `check-phase-61`'s combined output (the direct proof Task 1's delegation surfaces the real git
  cause). Assertions 9/10 assert FAIL counts (>= 2, >= 10) without a cause-token requirement,
  documenting the asymmetry that `check-phase-68`/`-70`'s own wrapper functions still flatten
  their throw to null by design.
- **Genuine discovery, not a plan defect:** `check-phase-70`'s nested (deep-clone) tally is no
  longer identical pre/post edit. 5 of the 10 converted sites (V-70-18/19 reading
  `70-04-AUDIT-RESULTS.md`, V-70-20/21/22 reading `v1.7-MILESTONE-AUDIT.md`) genuinely fail on
  THIS repo's real deep clone -- both documents were authored in Plan 70-05, after the `aa6de68`
  Atom-2 snapshot this file reads, so `git show aa6de68:<path>` confirms `fatal: path ... does
  not exist in 'aa6de68'` on a deep, non-shallow clone. Nested tally is now **23 PASS / 5 FAIL /
  23 SKIPPED, exit 1** (was 23/0/28, exit 0). This is exactly the vacuous-pass class SWEEP-09
  exists to delete -- the pre-edit code was silently masking a real, permanent documentation
  gap, not a transient bootstrap race. See "Deviations from Plan" below.
- Four GOV-02 ledger rows appended (`check-phase-61.mjs`, `check-phase-68.mjs`,
  `check-phase-70.mjs`, `frozen-read-negative-test.mjs`), each carrying target-scoped
  path-literal and symbol greps with hit counts, per D-15/CARVE D-12.
- `node scripts/validation/carve-gate.mjs` exits 0 throughout (40 -> 41 -> 42 in-scope paths,
  all on-list, 0 off-list) -- all four edited files are CARVE Category 5 or 9, already on-list;
  no D-09 amendment needed.

## Task Commits

Each task was committed atomically:

1. **Task 1: Route check-phase-61's readAtV15CloseFor61 through the shared frozen-read
   library** -- `6ebbaf6d` (fix)
2. **Task 2: Convert the twelve chicken-and-egg call-site returns in check-phase-68 and
   check-phase-70 to fail-loud** -- `112510fb` (fix)
3. **Task 3: Prove fail-loud with three new file:// shallow-clone assertions in the negative
   harness** -- `547f813b` (test)

## Files Created/Modified

- `scripts/validation/check-phase-61.mjs` -- `readAtV15CloseFor61` body replaced with a
  one-line delegation to `readAtV15Close`; doc comment rewritten to state the reader throws
  instead of returning null; eight consumer `null` guards left as dead-but-harmless code (D-09)
- `scripts/validation/check-phase-68.mjs` -- 2 chicken-and-egg call-site returns converted to
  fail-loud (`:123`, `:185`)
- `scripts/validation/check-phase-70.mjs` -- 10 chicken-and-egg call-site returns converted to
  fail-loud (`:389,403,420,435,450,466,485,501,517,532`)
- `scripts/validation/frozen-read-negative-test.mjs` -- 3 new numbered assertions (8-10), 3 new
  path constants (REPO_61/68/70), total assertion count raised 7 -> 10 in the header comment
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` -- 4 rows appended (one per edited validator)

## Decisions Made

See `key-decisions` in frontmatter. In summary: keep comments free of the exact literal
identifiers/substrings the acceptance-criteria greps count (to avoid inflating a pinned count);
leave `_lib/frozen-at-close.mjs`'s now-stale header comment unedited (out of this plan's scope,
flagged for Phase 144); do not repoint check-phase-70's 5 diverging call-sites to a
`*CloseGate`-style reader (an architectural change this plan's `<action>` text does not
authorize); record the check-phase-70 nested-tally divergence honestly as the new baseline
rather than reconciling it, per the plan's own flagged_assumptions license.

## Deviations from Plan

### Recorded, Not Auto-Fixed

**1. [Discovery -- pre-authorized by plan's flagged_assumptions] check-phase-70's nested
tally diverges from the plan's predicted identical-on-deep-clone figure**
- **Found during:** Task 2 verification (`CHECK_PHASE_NESTED=1 node
  scripts/validation/check-phase-70.mjs`)
- **Issue:** The plan's must_haves truth states "On a deep clone both guarded SHAs resolve, so
  the converted branches are dead: check-phase-68 and check-phase-70 report IDENTICAL nested
  PASS/FAIL/SKIPPED tallies before and after the conversion." Measured post-edit:
  check-phase-68 IS identical (12/0/21, matches). check-phase-70 is NOT identical
  (23 PASS/5 FAIL/23 SKIPPED vs the pre-edit 23/0/28) -- 5 sites (V-70-18/19/20/21/22) read two
  documents (`70-04-AUDIT-RESULTS.md`, `v1.7-MILESTONE-AUDIT.md`) that were authored in Plan
  70-05, chronologically AFTER the `aa6de68` "Atom 2" snapshot these sites read at. `git show
  aa6de68:<path>` on this repo's real deep clone confirms both paths genuinely do not exist at
  that SHA -- this is not a shallow-clone artifact; it is stable and reproducible across
  repeated runs.
- **Why not auto-fixed:** The correct remedy (repoint these 5 sites to a `*CloseGate`-style
  reader targeting the later `4df3a16` SHA, mirroring `V-70-24`'s existing
  `readProjectAtV17CloseGate()` precedent) requires a new reader function -- an architectural
  change this plan's `<action>` text does not authorize (it specifies only a return-field flip
  at the twelve named call-sites, explicitly prohibiting new shared constants or merged sites).
  The plan's own `flagged_assumptions` section explicitly pre-authorizes exactly this outcome:
  "If a future clone or a future SHA rotation changes that, the deep-clone tally comparison in
  Task 2's acceptance criteria will fail -- and that failure is correct behaviour, not a defect
  in this plan."
- **Disposition:** Recorded as the authoritative post-edit nested baseline for Phase 142's
  RED-07 comparison (23 PASS / 5 FAIL / 23 SKIPPED, exit 1 -- NOT 23/0/28/exit-0). Flagged as a
  new deferred item for Phase 142/144: the underlying root cause (5 of check-phase-70's
  `[v1.7-frozen @ aa6de68]`-labeled assertions actually need the later close-gate SHA) should be
  fixed the same way `V-70-24` already was, in a future plan with the scope to add a reader
  function.
- **Verified:** Reproduced twice (stable, not flaky); confirmed via direct `git show
  aa6de68:<path>` that both target documents are genuinely absent at that SHA on a deep clone;
  Task 3's negative-harness assertion 10 still passes (FAIL count 11 >= 10 required, since ALL
  10 converted sites additionally fail on `unreachable-sha` inside the shallow clone regardless
  of this deep-clone-only divergence).
- **Committed in:** `112510fb` (Task 2 commit; the divergence is documented in the commit
  message and the GOV-02 ledger row, not silently glossed over)

**2. [Recorded, out of scope] `_lib/frozen-at-close.mjs`'s header comment is now stale**
- **Found during:** Task 1 pre-edit grep sweep
- **Issue:** `_lib/frozen-at-close.mjs:10-13` describes `check-phase-61.mjs` as "a deliberate
  exception: it keeps a genuinely inline reader (readAtV15CloseFor61...)" -- this is no longer
  accurate after Task 1's delegation.
- **Why not fixed:** `_lib/frozen-at-close.mjs` is not in this plan's `files_modified` list; an
  edit there is a separate CARVE Category 4 frozen-surface change this plan does not authorize.
- **Disposition:** Recorded here for Phase 144's close-review pass, not fixed (matches the D-05
  pattern already established this milestone: record stale documentation, don't silently fix it
  out of scope).

---

**Total deviations:** 1 genuine discovery (recorded, not auto-fixed, pre-authorized by the
plan's own flagged_assumptions) + 1 stale-comment observation (recorded, out of scope).
**Impact on plan:** Zero scope creep. Both items are honestly documented rather than either
silently "fixed" (which would have exceeded this plan's authorized scope) or silently ignored
(which would have hidden a genuine finding from Phase 142/144).

## Issues Encountered

Two early edits to `check-phase-61.mjs`'s reader comment accidentally inflated the
`readAtV15CloseFor61` and `execFileSync` grep counts by mentioning those literal identifiers in
prose (9 -> 10, and 5 -> 5 instead of dropping to 4). Caught immediately by re-running the
acceptance-criteria greps after the first edit (not assumed correct), reworded the comments to
paraphrase instead of repeating the literal identifiers, and re-verified both counts landed
exactly as the plan specifies (9 and 4 respectively) before proceeding.

## Verification

- `node scripts/validation/frozen-read-negative-test.mjs`: **10/10 PASS, exit 0.**
- Bare `node scripts/validation/check-phase-61.mjs`: **34 PASS, 0 FAIL, 0 SKIPPED, exit 0**
  (unchanged from Plan 02's baseline).
- `CHECK_PHASE_NESTED=1 node scripts/validation/check-phase-68.mjs`: **12 PASS, 0 FAIL,
  21 SKIPPED, exit 0** (byte-identical to Plan 02's pre-edit nested baseline -- both converted
  branches confirmed dead on this deep clone).
- `CHECK_PHASE_NESTED=1 node scripts/validation/check-phase-70.mjs`: **23 PASS, 5 FAIL,
  23 SKIPPED, exit 1** (diverges from Plan 02's 23/0/28 baseline -- see Deviations above; this
  is the new authoritative post-edit figure for Phase 142's RED-07 comparison).
- `node scripts/validation/carve-gate.mjs`: **PASS, 42 in-scope, 42 on-list, 0 off-list, exit
  0** (final state, after all three tasks).
- `grep -c "readAtV15CloseFor61" scripts/validation/check-phase-61.mjs` = **9** (unchanged).
- `grep -c "execFileSync" scripts/validation/check-phase-61.mjs` = **4** (down from 5).
- `grep -c "ba2cbc0:" scripts/validation/check-phase-61.mjs` = **0** (down from 1).
- `grep -c "skipped: true" scripts/validation/check-phase-68.mjs` = **7** (down from 9, delta
  exactly 2).
- `grep -c "skipped: true" scripts/validation/check-phase-70.mjs` = **7** (down from 17, delta
  exactly 10).
- `grep -c "chicken-and-egg" scripts/validation/check-phase-67.mjs` = **7** (unchanged --
  deferred file untouched).
- `git diff --stat scripts/validation/check-phase-67.mjs` (across all three commits): **empty.**
- `git diff scripts/validation/check-phase-70.mjs | grep -c "^-.*4df3a16"` = **1** (the distinct
  `:485` site converted with its own detail string, not folded into the other nine).
- `git diff scripts/validation/check-phase-68.mjs scripts/validation/check-phase-70.mjs | grep
  "^-" | grep -cE "catch|function read"` = **0** (wrapper functions untouched).
- `grep -c "file://" scripts/validation/frozen-read-negative-test.mjs` = **6** (clone
  construction confirmed).
- No temp clone directory residue confirmed after the negative-harness run (OS temp root
  listing).
- Four GOV-02 ledger rows appended; append-only verified (no existing row edited or reordered).

## Next Phase Readiness

SWEEP-09's 13-site Phase-141 landing is complete: `check-phase-61`'s reader delegates with a
typed `frozenCause`, and 12 chicken-and-egg call-sites in `check-phase-68`/`-70` fail loud,
proven under a genuine shallow clone by 10/10 negative-harness assertions. `check-phase-67`'s
remaining 7 sites are untouched and confirmed unchanged, ready for Phase 144's scoped edit
(D-12) once its CARVE amendment lands. **Handed to Phase 142's RED-07 comparison as the
authoritative post-edit baseline:** `check-phase-68` nested = 12/0/21 (matches Plan 02's
pre-edit figure, unchanged); `check-phase-70` nested = **23/5/23, exit 1** (does NOT match Plan
02's pre-edit 23/0/28 -- the 5-site divergence documented above must be accounted for, not
assumed away, when Phase 142 measures its own regression guard). A new deferred item is
flagged for Phase 142/144: repoint `check-phase-70`'s V-70-18/19/20/21/22 to a
`*CloseGate`-style reader (mirroring the already-established `V-70-24` precedent) so those five
assertions read the correct, later SHA where their target documents actually exist. No blockers
to Plan 04/05 proceeding; Plan 05's budgeted sweep for `check-phase-62..66` is unaffected by
this plan's edits (none of those five files were touched).

## Self-Check: PASSED

- FOUND: `.planning/phases/141-standalone-red-validator-set-chain-members-green/141-03-SUMMARY.md`
- FOUND: `scripts/validation/check-phase-61.mjs`
- FOUND: `scripts/validation/check-phase-68.mjs`
- FOUND: `scripts/validation/check-phase-70.mjs`
- FOUND: `scripts/validation/frozen-read-negative-test.mjs`
- FOUND: `.planning/milestones/v1.20-GOV-02-LEDGER.md`
- FOUND: commit `6ebbaf6d`
- FOUND: commit `112510fb`
- FOUND: commit `547f813b`

## Addendum: SHA repoint for the V-70-18..22 divergence (OWNER-RATIFIED 2026-08-08)

**Discovery, recapped:** this plan's Task 2 measured that `check-phase-70.mjs`'s nested tally
diverged from its pre-edit baseline (23 PASS/5 FAIL/23 SKIPPED, exit 1, vs. the predicted
23/0/28, exit 0) because 5 of the 10 converted chicken-and-egg call-sites --
V-70-18/19/20/21/22 -- read `70-04-AUDIT-RESULTS.md` and `v1.7-MILESTONE-AUDIT.md` through the
`aa6de68` (v1.7-frozen Atom-2) reader, but both documents were authored later, in Plan 70-05
Commit B. Before this plan's fail-loud conversion, these five sites had returned
`{pass:true, skipped:true}` on the null `aa6de68` read since Phase 70 -- vacuously passing and
never verifying anything on any clone, an instance of the exact defect class SWEEP-09 exists to
delete. This plan's own scope (a return-field flip only, no new reader function) explicitly did
not authorize the SHA-repointing fix, and recorded it as a deferred item for Phase 142/144.

**Owner ratification:** the owner ratified fixing this immediately as a scoped addendum to this
plan, rather than waiting for Phase 142/144, since the underlying pattern (repoint to
`V17_CLOSEGATE` / `4df3a16`) was already fully proven by `V-70-24`'s existing
`readProjectAtV17CloseGate()` precedent (Plan 73-02 RETRO-02) -- the identical situation for
`PROJECT.md`.

**Fix applied:** added `readCorpusFileAtV17CloseGate(relPath)`, the general-path equivalent of
`readProjectAtV17CloseGate()`, to `check-phase-70.mjs`. Repointed V-70-18..22 to it. Updated each
of the five checks' `name` string and null-branch `detail` string from
`[v1.7-frozen @ aa6de68]` to `[v1.7-close-gate @ 4df3a16]`, matching V-70-24's existing wording
convention. Added a comment above the repointed group, in V-70-24's own comment style, recording
that Phase 141 SWEEP-09 exposed these as vacuous-since-Phase-70 and citing the RETRO-02
precedent. V-70-23/24/25/26/27 and all nine other SWEEP-09 call-sites (in `check-phase-61.mjs`
and `check-phase-68.mjs`, plus the other five `aa6de68`-arm sites in `check-phase-70.mjs`) were
left untouched -- confirmed via `git diff scripts/validation/check-phase-70.mjs`, which shows
edits scoped exactly to the new reader function and the five named checks. The `null`-branch
`pass: false` stays fail-loud throughout; no site was reverted to `skipped: true`.

**Before/after tallies:**

| Metric | Before (post-141-03) | After (this addendum) |
|---|---|---|
| `CHECK_PHASE_NESTED=1 check-phase-70.mjs` | 23 PASS / 5 FAIL / 23 SKIPPED, exit 1 | **28 PASS / 0 FAIL / 23 SKIPPED, exit 0** |
| V-70-18..22 individually | FAIL (frozen read of absent-at-`aa6de68` docs) | **PASS** (frozen read of present-at-`4df3a16` docs) |
| `grep -c "skipped: true" check-phase-70.mjs` | 7 | 7 (unchanged) |
| `node scripts/validation/carve-gate.mjs` | PASS, 42/42 | PASS, 42/42 (unchanged -- no new path, no CARVE amendment) |
| `CHECK_PHASE_NESTED=1 check-phase-68.mjs` | 12 PASS / 0 FAIL / 21 SKIPPED, exit 0 | 12 PASS / 0 FAIL / 21 SKIPPED, exit 0 (unchanged; not in this addendum's scope) |

**Corrected Phase-142 RED-07 baseline:** this addendum supersedes the "Next Phase Readiness"
section above's handoff figure for `check-phase-70`. The authoritative post-addendum nested
baseline for Phase 142's RED-07 comparison is now **`check-phase-70` = 28 PASS / 0 FAIL /
23 SKIPPED, exit 0** (not the 23/5/23, exit 1 figure this plan originally recorded).
`check-phase-68` remains **12 PASS / 0 FAIL / 21 SKIPPED, exit 0**, unchanged. The deferred item
flagged in "Next Phase Readiness" above (repoint V-70-18..22 to a `*CloseGate`-style reader) is
now **closed** -- no outstanding action remains for Phase 142/144 on this specific finding.

**Commit:** `671b9d49` (fix) -- code change only, staged and committed individually
(`scripts/validation/check-phase-70.mjs`), per this addendum's own atomic-commit requirement.

---
*Phase: 141-standalone-red-validator-set-chain-members-green*
*Completed: 2026-08-08*
