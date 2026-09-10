---
phase: 158-final-corpus-verification-publish-bundle
plan: 06
subsystem: docs-style-audit
tags: [claimed-fix-audit, git-history-audit, drift-attribution, gate-baseline, verify2, nav-hub-worktree, VERIFY-06, SC4]

# Dependency graph
requires:
  - phase: 158-final-corpus-verification-publish-bundle
    provides: plan 158-01's audit instrument and before-half measurement; plan 158-02's three hand-remediation commits; plan 158-03's judge-packet fix, SKILL.md fix and corpus-wide em-dash sweep; plan 158-05's two disposition tables and sweep narrative
provides:
  - "scripts/docs-style/158-FIX-AUDIT.json: the full 46-row claimed-fix population replacing the tracer's 2 seed rows, all seven claim surfaces covered, row_set_hash e12dd27e..."
  - "scripts/docs-style/158-FIX-AUDIT-RUN.txt: the binding run's captured output, 46/46 PASS, tied to the JSON by row-set hash"
  - "158-GATE-BASELINE.json's after half, 9 drift rows, runner-computed unattributed_rows (0), the D-18 link-health worktree discharge, and discharge.sc3/sc4"
affects: [158-07]

# Actuals (#2632)
actuals:
  tokens: 118000
  tasks: 2
  commits: 2

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Range.to re-resolved to the final content revision at THIS plan's own authoring time (not the tracer's stale value), because the tool's present_at_head/absent_at_head ops are bound to range.to and every own-remediation row's fix_sha postdates the tracer's snapshot"
    - "Steady-metric drift documentation: when a before/after pair for a D-51-named metric shows no delta within Phase 158, document it in the after-half's own note rather than author a no-op drift row (D-51's rows are explicitly conditioned on 'if their metrics moved')"
    - "sweep3.py's second positional argument is the pins file, not a substitution-set TSV -- the ruleset is always `--subs <tsv>`; passing a TSV positionally silently falls back to the tool's default ruleset with no error"

key-files:
  created: []
  modified:
    - scripts/docs-style/158-FIX-AUDIT.json
    - scripts/docs-style/158-FIX-AUDIT-RUN.txt
    - .planning/phases/158-final-corpus-verification-publish-bundle/158-GATE-BASELINE.json

key-decisions:
  - "Range.to advanced from the tracer's stale d0531dbf (158-01's own authoring-time snapshot, which predates every 158-02/158-03/158-05 commit this task must also audit) to the final content revision (aa9ae5ae, this task's own precondition SHA) -- a deliberate deviation from the plan action text's literal 'do not advance the end point.' D-01 requires the range be 'resolved to a SHA pair at authoring' and D-69 constraint 5 / this plan's own must_haves.truths require the binding audit to run 'at the final content revision, after every corpus edit this phase makes.' Measured proof the stale endpoint was wrong: all 17 own-remediation rows FAILed vacuous/direction against d0531dbf (both counts zero, since range.to predated the fix); after re-resolving to aa9ae5ae, all 46 rows PASS. range.from is unchanged."
  - "Named D-51 drift rows for the link-checker counts, LINE-COUNT-DIFFERS and the legacy pin-count constant were NOT authored, because live measurement showed before==after for all three within Phase 158's own before/after comparison -- the transitions D-51 names for these metrics (97f7ca28, the superseded '6->21' framing, 83660691) all predate Phase 158's own before-half measurement (845218a4) and are already baked into it. Documented as steady in the after-half's own notes with the measured evidence, rather than authoring a no-op row or forcing a drift that did not occur."
  - "The untracked-entry count is recorded as measured (10), not forced to the artifact's own prior expectation (9): .planning/milestone.lock is a new foreign entry, identified by its own JSON content as this session's GSD phase-lock file, absent at the before-half measurement and at session start."
  - "The em-dash-sweep coverage row's 'hand-remediation sites on the LINE-COUNT-DIFFERS list' figure is corrected from the plan's own phrasing ('all three') to the measured count (2 of 3 commits' files; docs/index.md and docs/operations/00-index.md are not on the 14-item LCD list)."
  - "The unscoped 36-rule-set reading moved from the before half's 50 to 9 at the after half, recorded only in deterministic_slice (never in comparison.components) -- explained by 158-02/158-03's own remediation resolving most of those candidates, not treated as an anomaly."

requirements-completed: []

coverage:
  - id: D1
    description: "scripts/docs-style/158-FIX-AUDIT.json's full 46-row population replaces the tracer's 2 seed rows, covering all seven claim surfaces (22 fix commits including 6 corpus-free with a distinct evidence_path, a requirement line, a GATE-BASELINE note, a WINDOWS.md row, a prior-phase hand-off, the RESUME.md ruling table, and 17 own-remediation rows with full-line needles per D-50), plus a secret row for the CMG hostname scrub with a working negative control."
    requirement: "VERIFY-06"
    verification:
      - kind: other
        ref: "node scripts/docs-style/audit-claimed-fixes.mjs --self-test (4 passed, 0 failed)"
        status: pass
      - kind: other
        ref: "node scripts/docs-style/audit-claimed-fixes.mjs --rows scripts/docs-style/158-FIX-AUDIT.json --log scripts/docs-style/158-FIX-AUDIT-RUN.txt (46/46 rows PASS, exit 0)"
        status: pass
      - kind: other
        ref: "python assertion scripts: row-set hash tied between JSON and log; secret row carries no literal needle; the one external-fact row cites a verification method; every row targets a path and uses only the 8 defined operations; range is a resolved pair with claims <=200 chars; run log's recording commit has a parent"
        status: pass
      - kind: other
        ref: "negative-control script: 0 hits for the recovered 9-character host label across every artifact this phase's range touched plus both new audit artifacts; in-memory positive control fires"
        status: pass
    human_judgment: false
  - id: D2
    description: "158-GATE-BASELINE.json's after half is measured at the final content revision (b889501f) on an unscoped clean tracked tree with the 10 foreign untracked entries enumerated; 9 drift rows carry all ten required keys with an args array; unattributed_rows is computed by the audit runner's --drift mode (0 of 7 list-attributed rows); the D-18 link-health blind spot is discharged clean at both ends via a worktree of BASE; discharge.sc3/sc4 point at named artifacts."
    requirement: "VERIFY-06"
    verification:
      - kind: other
        ref: "python assertion scripts: after half present with 9 drift rows and a non-null unattributed_rows; every drift row has all 10 required keys and an args array (not a shell string); the causation caveat is stated in the artifact; the deterministic slice holds the unscoped reading and comparison.components does not"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-nav-hub-links.mjs (0/0 at HEAD); the same unmodified checker run with cwd set to a worktree of d0b611e8 also reports 0/0; the worktree was removed (git worktree list shows only pre-existing agent-* worktrees)"
        status: pass
      - kind: other
        ref: "python scripts/docs-style/verify-meaning.py d0b611e8 --dispositions scripts/docs-style/_DISPOSITIONS-158.tsv: 5 undispositioned findings, all .planning/ paths, zero on docs/"
        status: pass
    human_judgment: false

# Metrics
duration: 78min
completed: 2026-09-08
status: complete
---

# Phase 158 Plan 6: The Binding Claimed-Fix Audit & the Drift-Accounted Gate Baseline Summary

**Replaced the tracer's 2-row audit with the full 46-row claimed-fix population (all seven claim surfaces, one secret row with a working negative control), ran it clean at the final content revision after re-resolving the audit range's stale end point, then measured the structural gate's after half and attributed every one of 9 real drift rows with the audit runner's own evidence-checking drift mode -- 0 unattributed.**

## Performance

- **Duration:** 78 min
- **Started:** 2026-09-08T06:47:00Z
- **Completed:** 2026-09-08T08:06:17Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- `scripts/docs-style/158-FIX-AUDIT.json` + `158-FIX-AUDIT-RUN.txt` (commit `b889501f`): built the full 46-row population across all seven D-03 claim surfaces -- 22 fix( commits in range (16 docs-touching including the kept flagship/wrapped-citation tracer rows, and 6 corpus-free commits each with an `evidence_path` distinct from the commit's own path: SEED-001's status flip evidenced against REQUIREMENTS.md's HYG-07 line, judge-packets.py's walk-root fix evidenced against `docs`, the kiosk `$currentKiosk` guard evidenced against its recipe doc, the CMG-hostname secret row, `check-phase-135.mjs`'s retired line-pin evidenced against the recipe it gated, and the Sure-Admin exemption evidenced against `firmware-oem-matrix.md`), a requirement line (RCP-04's RE-237 registration), a GATE-BASELINE note (STYLE-01's superseded merge-drift figure, still present by design), a WINDOWS.md row (row 15's own restored-phrase claim), a prior-phase hand-off (`157-VERIFICATION.md:118`'s HYG-06 DFCI, evidenced against the Phase-149 commit that actually introduced it), the RESUME.md ruling table (the kept flagship row), and 17 rows for this phase's own remediation (the three EEE-SOP-standard.md corrections, the glossary cross-reference and nativeness-word edit, both `via`->`using` hub edits, all four SKILL.md fixes with full-line needles per D-50, the `check-prose-style.py` date-stamp, and 6 of the em-dash sweep's outside-Phase-157 files). Self-test 4/4, binding run 46/46 PASS, row-set hash `e12dd27e...` tied between the committed JSON and the run log; a negative-control script recovered the 9-character CMG host label into memory only, found 0 leaks across every artifact this phase's range touched plus the two new audit files, and confirmed a working in-memory positive control.
- `158-GATE-BASELINE.json` (commit `828e9744`): measured the after half at the final content revision (`b889501f`) -- C17 (237/0), the apex (111/0/0), nav-hub (0/0), `verify2.py` against BASE `d0b611e8` (Part B `resolved OK` 6319->6320, `LINE COUNT DIFFERS` steady at 14, `introducedBySweep`/`missingAnchor` steady at 1/455), the live-corpus pin differ (685 pinned, 0 lost/0 added, steady), and `check-prose-style.py` (clean) -- on a tracked tree that is clean with no path scoping, with all 10 foreign untracked entries enumerated (measured 10, not the artifact's own prior expectation of 9: `.planning/milestone.lock` is a new entry, identified by its own content as this session's GSD phase-lock file). Authored 9 drift rows, each with `{component, metric, before, after, attributed_to, cmd, args, extractor, comparator, evidence}`: `verify2`'s `resolved_ok` +1 (attributed to `804e12ba`'s new Reboot Handling cross-reference link), `verify2`'s Part A raw totals (directional, attributed to the class `"158-remediation"`, not a single commit), the six em-dash-sweep files outside Phase 157's enumerated 59-file set (attributed to `44ab8c21`), and a coverage row on the sweep's LINE-COUNT-DIFFERS blind spot (measured 4 of 15 swept files invisible to verify2 Part A, 2 of 15 not EEE-enrolled -- correcting the plan's own "all three hand-remediation sites" phrasing to the measured "2 of 3"). Ran `audit-claimed-fixes.mjs --drift` against this file to compute `unattributed_rows`: 0 of 7 list-attributed rows unattributed, with the artifact stating plainly that this check falsifies a wrong attribution and does not prove causation. Discharged the D-18 link-health blind spot (the introduced-anchor item, its explicit-anchor class, its introducing commit `97f7ca28`, and a clean 0/0 result at both ends) by creating a `git worktree` of BASE `d0b611e8` and running the unmodified HEAD `check-nav-hub-links.mjs` with its cwd set to that worktree, then removing it. Re-proved the deterministic slice (sweep3 mechanical residual steady at 1; the 36-rule-set reading scoped to Phase 156's 13 targets steady at 0; the unscoped 36-set reading over `docs/` moved 50->9, recorded only in `deterministic_slice`, explained by 158-02/158-03's own remediation resolving most of those candidates). Reproduced Phase 156's recorded `verify-meaning.py` invocation (no longer 0 `docs/` findings; now 9 `docs/` + 4 `.planning/`) and proved zero undispositioned `docs/` findings at the recorded base with plan 158-05's own sibling table (5 undispositioned, all `.planning/`), recording the three declined alternatives. Filled `discharge.sc3` and `discharge.sc4` pointing at the named artifacts.

## Task Commits

Each task was committed atomically:

1. **Task 1: Run the binding claimed-fix audit over the full population at the final content revision** - `b889501f` (feat)
2. **Task 2: Measure the after half, attribute every delta, and compute the unattributed count with the runner** - `828e9744` (docs)

_Note: this plan is `type="execute"`, not TDD -- no RED/GREEN/REFACTOR cycle applies._

## Files Created/Modified

- `scripts/docs-style/158-FIX-AUDIT.json` - full 46-row claimed-fix population, `row_set_hash` written by the tool
- `scripts/docs-style/158-FIX-AUDIT-RUN.txt` - binding run's captured output, 46/46 PASS, tied by row-set hash
- `.planning/phases/158-final-corpus-verification-publish-bundle/158-GATE-BASELINE.json` - `after` half, 9 `drift[]` rows, runner-computed `unattributed_rows`, `nav_hub_at_base_worktree`, updated `deterministic_slice`/`recorded`, `discharge.sc3`/`sc4`

## Decisions Made

See `key-decisions` in frontmatter. In brief: `range.to` was re-resolved from the tracer's stale snapshot to the final content revision (measured proof: all 17 own-remediation rows failed vacuous/direction until this correction); three D-51-named metrics that measurably did not move within Phase 158 got a documented steady-state note instead of a no-op drift row; the untracked-entry count and the LCD-blind-spot coverage figure are recorded as measured rather than forced to the artifact's/plan's own prior expectations.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] `range.to` left at the tracer's stale value made all 17 own-remediation audit rows vacuous**
- **Found during:** Task 1, first audit run
- **Issue:** The plan's action text says "reuse the resolved revision pair the tracer recorded... do not advance its end point." Following this literally, `range.to` stayed at `d0531dbfb132f7c83ab9722667a92b155d4ec299` (158-01's own authoring-time snapshot, taken at the very start of this phase). Every row asserting one of this phase's own remediation commits (158-02/158-03/158-05, all landed after that snapshot) FAILed: the tool's `present_at_head`/`absent_at_head` ops are bound to `range.to`, and a fix commit chronologically after `range.to` can never produce a non-zero count there, so all 17 such rows FAILed `vacuous` or `direction` (measured: `absent_at_parent:0, present_at_head:0` on every one).
- **Fix:** Re-resolved `range.to` to `aa9ae5ae5491de7f09c5ec99abed744557c075f9` -- the final content revision at this task's own authoring time (this task's own precondition SHA, per D-01's "resolved to a SHA pair at authoring" applied fresh to plan 158-06, and D-69 constraint 5 / this plan's own `must_haves.truths` requiring the binding audit to run "at the final content revision, after every corpus edit this phase makes"). `range.from` is unchanged. Documented in `authored_at_sha_note`.
- **Files modified:** `scripts/docs-style/158-FIX-AUDIT.json`
- **Verification:** All 46 rows PASS after the correction (was 26/46 PASS with 20 FAIL before it, then 44/46 after the range fix with 2 remaining unrelated needle-text bugs, then 46/46 after those two were also fixed).
- **Committed in:** `b889501f`

**2. [Rule 1 - Bug] Two needle-construction errors surfaced by the first full run**
- **Found during:** Task 1, second audit run (after the range fix)
- **Issue:** (a) `five-platform-hub-overview-hyg01`'s needle embedded a literal newline character, but the runner's file-scoped `countInBlob` join collapses all whitespace runs (including newlines) to a single space before counting -- a needle containing `\n` can never match the collapsed text. (b) `windows-row15-hp-sure-admin-count` asserted `count_at_head_eq: 2` for the bare phrase `"HP Sure Admin"`, but that substring also matches an unrelated table-row mention and a third citation sentence in the same file, measuring 6 rather than the 2 WINDOWS.md row 15 restored.
- **Fix:** (a) Rewrote the needle with a plain space in place of the newline. (b) Narrowed the needle to the more specific restored phrase `"HP Sure Admin and CMSL"` and corrected the expected count to the measured 3 (2 restored citation sites + 1 unrelated sentence using the same phrase), documenting the discrepancy from row 15's own "twice" figure rather than forcing the row to assert an unmeasured 2.
- **Files modified:** `scripts/docs-style/158-FIX-AUDIT.json`
- **Verification:** Both rows PASS; full run 46/46.
- **Committed in:** `b889501f`

**3. [Rule 3 - Blocking] `sweep3.py`'s CLI positional-argument order misidentified during deterministic-slice re-measurement**
- **Found during:** Task 2, deterministic-slice re-proof
- **Issue:** A first attempt to sum the 36 rule sets' unscoped `TOTAL edits` passed each `subs-*.tsv` file as `sweep3.py`'s second positional argument (intending it as the ruleset), producing an identical, bogus "32 TOTAL edits" for every one of the 36 files -- `sweep3.py`'s actual signature is `<root> <pinsfile> [--apply] [--subs <tsv>]`; the second positional argument is always the pins file, and an unrecognized-shape file passed there is silently tolerated while the tool falls back to its own default ruleset.
- **Fix:** Re-ran with the correct invocation (`sweep3.py docs scripts/docs-style/_CONTENT-PINS.txt --subs <tsv>`), which reproduced the expected small per-rule-set counts (unscoped sum: 9, not the bogus 1152 the first attempt summed).
- **Files modified:** None (measurement-only; no tool file changed).
- **Verification:** Cross-checked against the scoped-13-targets re-run (0, matching the before half exactly) using the same corrected invocation shape.
- **Committed in:** N/A (measurement, recorded in `158-GATE-BASELINE.json`'s `deterministic_slice.rule_sets_unscoped`, commit `828e9744`).

---

**Total deviations:** 3 auto-fixed (2 Rule 1 bugs in the authored row population, 1 Rule 3 blocking measurement-tooling error). **Impact:** All three were caught and corrected before either task's commit landed; no incorrect row or measurement was ever committed. No scope creep.

## Known Stubs

None.

## Issues Encountered

- **D-51's three named drift rows for the link-checker counts, LINE-COUNT-DIFFERS, and the legacy pin-count constant were not authored as drift rows**, because live measurement showed `before == after` for all three within this phase's own before/after comparison (the transitions those rows name all predate Phase 158's own before-half measurement at `845218a4` and are already baked into it). This is recorded as a key decision above and documented in detail in the `after` half's own component notes (`verify2.line_count_differs.note`, `verify2.part_b.introduced_item_note`, `pin_differ.constants.note`) rather than silently omitted.
- **The em-dash-sweep coverage row's "hand-remediation sites on LINE-COUNT-DIFFERS" figure differs from this plan's own action-text phrasing** ("including all three hand-remediation sites") -- live measurement found 2 of 3 hand-remediation commits' files on the 14-item LCD list (`docs/_standards/EEE-SOP-standard.md`, `docs/_glossary-linux.md`); the third commit's files (`docs/index.md`, `docs/operations/00-index.md`) are not on it. Recorded as measured in the coverage row itself.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- The binding claimed-fix audit is complete and committed (`b889501f`): 46 rows, all PASS, tied by row-set hash. `158-GATE-BASELINE.json` now carries a complete `after` half, `drift[]`, runner-computed `unattributed_rows`, the D-18 worktree discharge, and both `discharge.sc3`/`sc4` keys (`828e9744`).
- Plan 158-07 can now proceed: the bundle rebuild, the six planning-document amendment blocks (including the range.to correction and the three D-51 steady-metric decisions recorded here, if plan 158-07's amendment sweep wants to cite them), the `final_apex` record, and the requirement/success-criterion flips for VERIFY-05/VERIFY-06.
- No blockers. `.planning/WINDOWS.md` is unchanged by this plan (entry #16 from plan 158-03 remains open, carried forward for plan 158-07 or a later phase).

---
*Phase: 158-final-corpus-verification-publish-bundle*
*Completed: 2026-09-08*

## Self-Check: PASSED

- All 3 modified files confirmed present on disk (`[ -f ]`) with the expected content (`158-FIX-AUDIT.json` carries 46 rows and `row_set_hash`; `158-FIX-AUDIT-RUN.txt` ends with `SUMMARY 46/46 rows ok`; `158-GATE-BASELINE.json`'s `phase_baseline.after` is non-null with 9 `drift[]` rows).
- Both commits (`b889501f`, `828e9744`) confirmed present via `git log --oneline`.
- All task-level `<acceptance_criteria>` and `<verify>` commands re-confirmed passing above with their exact output (self-test 4/4; binding run 46/46 PASS; row-set hash tied; secret/external-fact/path/ops/range/claim-length checks all pass; negative control 0 hits with a working positive control; after-half present with 9 drift rows and a non-null `unattributed_rows`; every drift row has all 10 keys with an args array; the causation caveat is stated; the deterministic slice holds the unscoped reading outside `comparison.components`; `check-nav-hub-links.mjs` 0/0 at HEAD; the worktree-based base-half component is recorded; no extra worktree remains).
- Plan-level `<verification>` re-confirmed: self-test 4/4, binding run 46/46 PASS with the row-set hash tied to the log; population covers all seven surfaces with 46 >= the discovery enumeration's row count; every row targets a path, uses a defined operation, and is non-vacuous; the one secret row carries no literal needle and the one external-fact row cites a verification method; the after half is measured on an unscoped clean tracked tree with the 10 untracked entries enumerated; every delta has a complete drift row with an args array; the unattributed count is runner-produced (0) with the causation caveat in the artifact; the link-health blind spot is clean at both ends via the worktree method with no worktree remaining; the deterministic slice holds the unscoped reading and the components do not; both discharge keys are filled.
