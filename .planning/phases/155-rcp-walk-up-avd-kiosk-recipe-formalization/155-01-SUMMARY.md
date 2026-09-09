---
phase: 155-rcp-walk-up-avd-kiosk-recipe-formalization
plan: 01
subsystem: docs-governance
tags: [gsd-planning-docs, validator-mjs, annotate-and-supersede, apex-chain, check-phase-54, check-phase-135, check-phase-153]

# Dependency graph
requires:
  - phase: 154-style-landing-merge-the-verified-google-style-pass
    provides: the landed Google-style corpus (docs/) that this phase's RE-222/RE-224/RE-237 edits build on top of
provides:
  - "A D-05 annotate-and-supersede amendment in REQUIREMENTS.md (RCP-04) and ROADMAP.md (Phase 155 Success Criterion 5) that authorizes flip-first-then-register commit ordering for plan 155-06"
  - "check-phase-135.mjs's V-135-RECIPE check retired from a 328-line equality pin to existence/non-emptiness/H1/content-needle assertions, unblocking RCP-07's three mandated RE-224 prose corrections"
  - "A recorded D-00a predecessor-frozen-surface exception in STATE.md scoping the check-phase-135.mjs edit"
  - "155-GATE-BASELINE.json: a committed, command-sourced measurement of every structural-gate component and content count this phase changes, for every later plan to diff against"
affects: [155-04-rcp-06-07-08-content-corrections, 155-06-registration-and-promotion, 156-style-extension-full-landing-verification]

# Actuals (#2632)
actuals:
  tokens: 6700
  tasks: 3
  commits: 4

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Non-vacuous scratch-directory instrument for sweep3.py: sweep3.py's rglob walks a ROOT, so a single-file path always reports 0 files/0 edits; copying the target file into its own scratch directory (mirroring the docs/... relative path) exercises the real walk."
    - "Non-vacuity proof for a retired equality pin: run the new assertion against a deliberately emptied copy in an isolated cwd (the validator hardcodes its relative path and resolves against process.cwd()), confirming a real failure mode exists before trusting a 'PASS' on the real file."

key-files:
  created:
    - .planning/phases/155-rcp-walk-up-avd-kiosk-recipe-formalization/155-GATE-BASELINE.json
  modified:
    - scripts/validation/check-phase-135.mjs
    - .planning/REQUIREMENTS.md
    - .planning/ROADMAP.md
    - .planning/STATE.md

key-decisions:
  - "D-05 (owner-ruled): flip-first, then register — reverses RCP-04's literal ordering clause by annotate-and-supersede, never deleting the superseded wording."
  - "D-10 (owner-ruled): retire V-135-RECIPE's 328-line equality pin for existence/non-emptiness/H1/content-needle assertions, recorded as a scoped D-00a exception in STATE.md."
  - "sweep3.py's printed '%d files' figure is len(touched) (files with at least one non-protected edit), not a scanned/loaded count — this plan's own action text assumed the opposite for a zero-edit document. Recorded as a measured-value-wins deviation; non-vacuity re-established independently via filesystem presence + non-zero protected-line counts."

requirements-completed: [RCP-04, RCP-07]

coverage:
  - id: D1
    description: "Phase 155 gate baseline captured as a committed JSON artifact before any content edit, covering all five structural-gate components, six changing counts, four-document style residual, pin residency, and line-ending reading"
    requirement: ""
    verification:
      - kind: other
        ref: "node -e \"...155-GATE-BASELINE.json verify script from PLAN.md Task 1...\""
        status: pass
    human_judgment: false
  - id: D2
    description: "V-135-RECIPE retired from a 328-line equality pin to existence/non-emptiness/H1/content-needle assertions; other six V-135-* assertions and check-phase-136.mjs untouched"
    requirement: "RCP-07"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-135.mjs (7 PASS, 0 FAIL, 0 SKIPPED, before/during-perturbation/after-restore)"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-135.mjs against emptied scratch copy (exit 1, RECIPE FAIL -- empty after trimming)"
        status: pass
    human_judgment: false
  - id: D3
    description: "D-05 flip-first amendment landed by annotate-and-supersede in REQUIREMENTS.md RCP-04 and ROADMAP.md Phase 155 Success Criterion 5, with check-phase-54 measured 32/0/0 on both sides"
    requirement: "RCP-04"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-54.mjs (32 passed, 0 failed, 0 skipped, both before and after)"
        status: pass
    human_judgment: false

duration: 20min
completed: 2026-09-03
status: complete
---

# Phase 155 Plan 01: Governance Preconditions Summary

**D-05 flip-first amendment landed in REQUIREMENTS.md/ROADMAP.md by annotate-and-supersede, V-135-RECIPE's 328-line equality pin retired for content needles with a recorded D-00a exception, and the phase's gate baseline committed as 155-GATE-BASELINE.json — all measured against the live tree, not read from prior documents.**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-09-02T22:32:29-05:00 (first task commit)
- **Completed:** 2026-09-02T22:42:44-05:00 (last task commit)
- **Tasks:** 3 completed
- **Files modified:** 5 (1 created, 4 modified) across 4 commits (1 pre-task deviation commit + 3 task commits)

## Accomplishments

- **Task 1:** `155-GATE-BASELINE.json` committed alone, carrying every structural-gate component (C17 237/0, nav-hub-links 0/0, check-phase-135 7/0, check-phase-54 32/0, apex check-phase-153 111/0 non-nested), a conflict-marker sweep (0 hits), six counts this phase changes (registry/filename-map row counts at 236, both canary occurrence counts, RE-222/224/237/index line counts, licensing-matrix byte/line count), the sweep3.py style residual for the full corpus (5 files, 562 pins, 9 TOTAL edits) and per-document via a non-vacuous scratch-directory instrument, pin residency (562/562/0 lost, six per-file counts), and the CRLF/core.autocrlf/.gitattributes reading — anchored to SHA `fa8c3302` as a record, never an equality gate.
- **Task 2:** `V-135-RECIPE` rewritten from a 328-line equality pin to existence + non-emptiness + verbatim-H1 + two content-needle assertions (`## Unsupported and Anti-Feature Callouts`, `./Vendor/MSFT/AssignedAccess/Configuration`), proven by a perturbation experiment (append blank line → still 7 PASS/0 FAIL → restore → clean) and an emptied-scratch-copy non-vacuity proof (exit 1, `RECIPE FAIL -- ... is empty after trimming`). The D-00a exception, Phase 151's D-48 supersession, and a Phase 156 forward note are recorded in `STATE.md` in the same commit.
- **Task 3:** D-05's flip-first amendment landed additively in `REQUIREMENTS.md` RCP-04 (plus a D-39 RCP-03 site-list annotation naming all 7 editable canary sites and both provenance lines) and `ROADMAP.md` Phase 155 Success Criterion 5, with `check-phase-54.mjs` measured 32 passed/0 failed/0 skipped immediately before and immediately after the edit.

## Task Commits

Each task was committed atomically (plus one pre-task deviation commit):

0. **Pre-task deviation: commit pending orchestrator STATE.md edit** - `fa8c3302` (docs) — Rule 3 auto-fix, see Deviations below.
1. **Task 1: Capture the phase baseline as a committed artifact** - `c133433b` (docs)
2. **Task 2: Retire V-135-RECIPE's 328-line equality pin, record D-00a exception** - `6689ffc3` (fix)
3. **Task 3: Land D-05 flip-first amendment in REQUIREMENTS.md/ROADMAP.md** - `c9b46ded` (docs)

**Plan metadata:** committed together with this SUMMARY (see final commit below).

## Files Created/Modified

- `.planning/phases/155-rcp-walk-up-avd-kiosk-recipe-formalization/155-GATE-BASELINE.json` - New measurement artifact: every structural-gate component, six changing counts, per-document style residual, pin residency, line-ending reading — all command-sourced this task
- `scripts/validation/check-phase-135.mjs` - `V-135-RECIPE` check rewritten (existence/non-empty/H1/needles instead of a line-count equality); `EXPECTED_LINE_COUNT` constant deleted; the other six assertions untouched
- `.planning/REQUIREMENTS.md` - RCP-04 gains a `[SUCCESS-CRITERION AMENDMENT, D-05]` block (ordering reversal + 4 grounds) plus a D-39 RCP-03 site-list annotation, appended after the byte-unchanged original sentence
- `.planning/ROADMAP.md` - Phase 155 Success Criterion 5 gains a `[SUCCESS-CRITERION AMENDMENT, D-05]` block, appended after the byte-unchanged original sentence
- `.planning/STATE.md` - Phase-155-execution-start marker committed (pre-task deviation); D-00a exception, D-48 supersession and Phase 156 forward note recorded (Task 2)

## Decisions Made

- **D-05 (owner-ruled, applied verbatim):** flip-first, then register. Order is review → owner sign-off → two-site frontmatter flip → atomic registration commit. Landed by annotate-and-supersede in both planning documents; the superseded wording survives byte-for-byte as the prefix of the amended line, matching the Phase 143/154 precedent's own commit-diff shape (1 line changed = 1 deletion + 1 insertion in `git diff --numstat`, not literally "zero deletions" — see Deviations).
- **D-10 (owner-ruled, applied verbatim):** retire `V-135-RECIPE`'s 328-line pin; the replacement must fail on an empty file (proven) and must not degrade to a vacuous pass. D-00a exception scope is exactly the `RECIPE` check body and the deleted constant, recorded in STATE.md in the same commit as the code edit.
- **Deviation-driven:** sweep3.py's own "N files" print is a touched-file count, not a scanned-file count — recorded both figures plus an independent non-vacuity proof rather than forcing the plan's literal-but-incorrect expectation onto the artifact.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Committed a pending orchestrator STATE.md edit before Task 1's clean-tree precondition check**
- **Found during:** Pre-Task-1 precondition check
- **Issue:** Task 1's precondition requires `git status --porcelain` to show no TRACKED file with a modified/staged status. `.planning/STATE.md` carried an uncommitted "Phase 155 execution started" marker edit from the orchestrator, left over from before this executor was spawned.
- **Fix:** Committed the pending STATE.md edit alone, confirmed the tracked tree was then clean, and proceeded with Task 1's precondition check.
- **Files modified:** `.planning/STATE.md`
- **Verification:** `git status --porcelain` after the commit showed only untracked files, satisfying Task 1's precondition.
- **Committed in:** `fa8c3302`

**2. [Rule 1 - Bug/premise correction] sweep3.py's per-document "files" figure means touched-files, not scanned-files**
- **Found during:** Task 1's per-document style-residual measurement
- **Issue:** The plan's own action text asserted that a zero-edit document copied into its own scratch directory would still print "1 file" (e.g. "1 file / 0 edits" for RE-222). Reproducing the instrument showed sweep3.py's printed `%d files` is `len(touched)` — the count of files with at least one non-protected edit — so a zero-edit document legitimately prints "0 files", not "1 file". Reading the source (`scripts/docs-style/sweep3.py:275`) confirmed this is the script's actual, intentional semantics, not a bug in sweep3.py itself.
- **Fix:** Recorded both the independently-verified filesystem-presence count (`find <scratch>/<doc> -name '*.md' | wc -l` = 1 for all four documents) and sweep3.py's own touched-file count in `155-GATE-BASELINE.json`, plus the non-zero `protected` line counts (which only occur if the file was actually read and tokenized), as the non-vacuity proof the plan's acceptance criteria actually needs. The plan-time "1 file / 0 edits" figures for RE-222/RE-224/licensing-matrix.md do not match this session's reproduction; the measured value (0 touched files, but 1 file present and scanned, proven by non-zero protected counts) is recorded as authoritative per this plan's own "measured number wins" instruction.
- **Files modified:** `.planning/phases/155-rcp-walk-up-avd-kiosk-recipe-formalization/155-GATE-BASELINE.json`
- **Verification:** `find <scratch>/<doc> -name '*.md' | wc -l` returns 1 for all four documents; sweep3.py's protected-line counts are non-zero for all four (38/64/28/42 table rows respectively), proving the file was read even where zero edits occurred.
- **Committed in:** `c133433b`

**3. [Rule 1 - Bug/premise correction] `git diff --numstat` cannot show "zero deletions" for a single-line in-place append**
- **Found during:** Task 3's acceptance-criteria self-check
- **Issue:** One acceptance criterion literally reads "`git diff --numstat HEAD~1 -- .planning/REQUIREMENTS.md` shows zero deletions." Git diffs line-by-line: appending text to the end of an existing line makes git record that whole line as one deletion + one insertion, not a pure addition. The established Phase 154 precedent commit (`b9a442c4`, the same annotate-and-supersede mechanism cited by this plan) shows the identical pattern — 5 amendment blocks in REQUIREMENTS.md produced `5 5` in `git diff --numstat`, not `5 0`.
- **Fix:** Verified the semantic guarantee the criterion actually protects — the original wording survives as a byte-for-byte verbatim PREFIX of the amended line (confirmed by direct diff inspection) — which is the same standard the Phase 154 precedent commit message states explicitly ("No superseded wording deleted -- every original bullet/criterion is preserved verbatim as a byte-for-byte prefix of its amended line"). Proceeded on that basis rather than blocking on an unsatisfiable literal reading of "zero deletions" via line-based diffing.
- **Files modified:** none (verification-only)
- **Verification:** `git diff HEAD -- .planning/REQUIREMENTS.md .planning/ROADMAP.md` inspected directly; both amended lines begin with the exact original sentence, unmodified, before the appended amendment block.
- **Committed in:** n/a (verification step, not a code change)

---

**Total deviations:** 3 (1 blocking auto-fix, 2 premise corrections where the measured/precedent reality diverged from the plan's literal text)
**Impact on plan:** None affect the plan's substance — the D-05 amendment, the V-135-RECIPE retirement, and the gate baseline all landed exactly as specified. All three deviations are documentation/measurement-fidelity corrections, not scope changes.

## Issues Encountered

None beyond the deviations above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- The phase can legally perform flip-then-register (plan 155-06 depends on this).
- RE-224 (RCP-07's three mandated prose corrections, landed in plan 155-04) can be edited without arithmetic breaking the apex — proven by perturbation, not by reading.
- The predecessor `check-phase-135.mjs` edit is recorded as an explicitly-scoped D-00a exception in `STATE.md` before HARN-05's close-time re-measure can find it unexplained.
- `155-GATE-BASELINE.json` is committed and available for every later plan in this phase to diff against.
- `docs/` is completely untouched by this plan (`git diff --stat fa8c3302..HEAD -- docs/` is empty).
- No blockers for plan 155-02 (the tracer, wave 1, independent of this plan's file set).

## Self-Check: PASSED

- `155-GATE-BASELINE.json` exists on disk: FOUND
- `155-01-SUMMARY.md` (this file) exists on disk: FOUND
- All 4 claimed commit hashes exist in `git log --oneline --all`: FOUND (fa8c3302, c133433b, 6689ffc3, c9b46ded)

---
*Phase: 155-rcp-walk-up-avd-kiosk-recipe-formalization*
*Completed: 2026-09-03*
