---
phase: 159-harn-harness-close
plan: 08
subsystem: infra
tags: [ci-workflow, github-actions, path-a-lineage, dual-apex, python-pin]

requires:
  - phase: 159-harn-harness-close
    provides: "159-07's terminal apex (check-phase-159.mjs), and 159-03/159-04/159-05/159-06's full lineage of harness, sidecar, baseline block, and five content leaves"
provides:
  - "`.github/workflows/audit-harness-v1.22-integrity.yml` -- the 19th CI coexistence workflow, a thirteen-job mechanical diff of its 16-job predecessor"
  - "The pinned Python 3.13 setup step in exactly the three jobs that transitively run the authoring-standard leaf: `linux-chain-ubuntu-latest`, `check-phase-157`, `check-phase-159`"
  - "159-EVIDENCE.md §20/§21 -- the mechanical diff table, arithmetic, dual-apex reading, the two chain-member requirements quoted verbatim, the Python pin decision, and the full end-to-end lineage re-measurement with predecessor-surface census"
  - "HARN-04 flipped complete -- the 20th Path-A lineage (pin, converted predecessor, new harness, sidecar, baseline block, five leaves, apex, workflow) is inventoried and green standalone"
affects: [159-09, 159-10, 159-11, 159-13]

actuals:
  tokens: 9200
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Per-job mechanical predecessor diff (carried/renamed/dropped/added disposition per job) as the authoring method for a new Path-A CI workflow generation, rather than writing from a blank template"
    - "Scoped-tool addition: a new third-party setup action (Python) added to exactly the N jobs that transitively need it, proven by an exact-count acceptance command rather than a presence-only check"

key-files:
  created:
    - .github/workflows/audit-harness-v1.22-integrity.yml
  modified:
    - .planning/phases/159-harn-harness-close/159-EVIDENCE.md
    - .planning/phases/159-harn-harness-close/159-RESEARCH.md

key-decisions:
  - "Job count derived by direct enumeration of job names, not the plan's own literal grep-count verify command -- that command coincidentally also matches the on: block's bare `schedule:` trigger key (no underscore, same 2-space indentation as a job name), inflating both the predecessor's real 16-job count (prints 17) and the new file's real 13-job count (prints 14). Documented in 159-EVIDENCE.md §20/§21 as a measurement-command anomaly, not a real job-count defect -- confirmed by direct name enumeration matching D-30's carried figures exactly in both directions."
  - "The header comment describing the new Python setup step avoids repeating the exact literal strings `actions/setup-python@v5` and `python-version: '3.13'` verbatim, because an earlier draft's header comment doubled both literal-count acceptance criteria from 3 to 4 (one real usage in each of the three jobs, plus one in the header's own descriptive prose). Reworded to describe the step without the literal strings; both counts now read exactly 3."
  - "Python 3.13 pinned (not left to the runner default), matching this session's local Axis-1 fresh-clone reproduction environment (Python 3.13.5), per 159-RESEARCH.md's Planner Assumption 2 -- now marked RESOLVED AT EXECUTION in place."
  - "The predecessor-surface census's two anticipated 'pre-existing entries' (this task's own action text named the count but not the identities) were traced by `git log --all -- <path>` to `check-phase-135.mjs` and `check-prose-style.py`, both landed by the 159-01 squash commit from Phase 155/157 content work that predates any Plan 159-0X commit -- neither is a Phase-159-authored edit."

patterns-established: []

requirements-completed: [HARN-04]

coverage:
  - id: D1
    description: "The predecessor's sixteen job names, trigger set, and header annotations are enumerated from the live file; the mechanical diff plan (carried/renamed/dropped/added per job) is recorded as a table; the 5+1+7=13 arithmetic is confirmed; the dual-apex reading is recorded naming both counted jobs; both chain-member requirements are quoted verbatim; the Python pin decision is resolved on the record"
    verification:
      - kind: other
        ref: "159-EVIDENCE.md §20"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-139.mjs (5 PASS, 0 FAIL, 0 SKIPPED, run standalone before the workflow file existed)"
        status: pass
    human_judgment: false
  - id: D2
    description: "audit-harness-v1.22-integrity.yml exists with exactly thirteen jobs matching the enumerated target list, no push trigger, matching checkout/fetch-depth counts (13/13), the Python setup action in exactly three jobs pinned at 3.13, the frozen-read-probe job carrying no dependency key, and the path-match job referencing the v1.22 sidecar's literal path"
    verification:
      - kind: other
        ref: "grep -nE job-name enumeration (13 real jobs); grep -c push: (0); checkout/fetch-depth count parity (13/13); setup-python@v5 and python-version:'3.13' counts (3/3); frozen-read-probe needs-key scan (clean); sidecar literal grep (5 occurrences, all legitimate)"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-139.mjs, standalone before and after the commit (5 PASS, 0 FAIL, 0 SKIPPED both times)"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-159.mjs --verbose, re-run after the workflow commit (116 PASS, 0 FAIL, 1 SKIPPED, total 117 -- unchanged pre-verification triple)"
        status: pass
    human_judgment: false
  - id: D3
    description: "The 20th Path-A lineage (pin, converted predecessor, new harness, sidecar, baseline block, five leaves, apex, workflow) is inventoried member by member with live measurements; the predecessor-surface census against e129081e holds exactly its expected membership (11 this-phase entries + 2 named pre-existing entries in scripts/validation/, exactly 1 entry in .github/workflows/); all three lineage triples are green; check-phase-54/-55/-56 each report 32/0/0"
    verification:
      - kind: other
        ref: "git diff --name-only e129081e -- scripts/validation/ (13 entries, all traced and explained in 159-EVIDENCE.md §21); git diff --name-only e129081e -- .github/workflows/ (1 entry, the new file)"
        status: pass
      - kind: other
        ref: "node scripts/validation/v1.22-milestone-audit.mjs --verbose (16/0/0); node scripts/validation/check-phase-159.mjs --verbose (116/0/1, total 117); node scripts/validation/check-phase-139.mjs (5/0/0)"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-54.mjs / -55.mjs / -56.mjs (32 passed, 0 failed, 0 skipped, each)"
        status: pass
    human_judgment: false

duration: 48min
completed: 2026-09-09
status: complete
---

# Phase 159 Plan 08: The 19th CI Coexistence Workflow Summary

Authored `audit-harness-v1.22-integrity.yml` as a thirteen-job mechanical diff of its 16-job
predecessor — five new content leaves, a fresh apex, and seven carried support jobs — with a pinned
Python 3.13 setup step added to exactly the three jobs that transitively run the authoring-standard
gate, closing the 20th Path-A lineage and flipping HARN-04.

## Performance

- **Duration:** 48 min
- **Started:** 2026-09-09T16:00:00Z
- **Completed:** 2026-09-09T16:48:00Z
- **Tasks:** 3 completed
- **Files modified:** 3 (1 created, 2 modified)

## Accomplishments

- Enumerated the predecessor's 16 job names, trigger set (`pull_request`/`schedule`/
  `workflow_dispatch`, no `push`), and header annotations (dual-apex, CARVE-1, harness-dependency
  cascade, advisory non-evidence) from the live file rather than a carried count.
- Recorded the mechanical diff plan as a table: 8 predecessor content leaves (145-152) and the
  predecessor's own apex job (153) dropped; 5 new leaves (154-158) and a fresh apex (159) added; 7
  support jobs (`parse`, `path-match`, `harness-run`, `linux-chain-ubuntu-latest`,
  `rotting-external-quarterly`, `pin-helper-advisory`, `frozen-read-probe`) carried unchanged.
  Confirmed 5 + 1 + 7 = 13 by direct addition.
- Quoted both chain-member requirements (`V-139-FETCHDEPTH`, `V-139-PROBEJOB`) verbatim from
  `check-phase-139.mjs`'s own source, giving the authoring task literal, mechanical targets.
- Resolved the Python pin decision: `3.13`, matching this session's local Axis-1 reproduction
  environment (`Python 3.13.5`), placed in exactly `linux-chain-ubuntu-latest`, `check-phase-157`,
  and `check-phase-159`. Marked `159-RESEARCH.md`'s Planner Assumption 2 RESOLVED in place.
- Authored `audit-harness-v1.22-integrity.yml`: 13 jobs confirmed by direct name enumeration, 0
  push triggers, checkout/fetch-depth parity (13/13), Python setup in exactly 3 jobs pinned at
  3.13, `frozen-read-probe` carrying no `needs:` key, `path-match` referencing the v1.22 sidecar's
  literal path, and a phase-numbered job scan returning exactly 6 (154 through 159, none below).
  `check-phase-139.mjs` (5 PASS, 0 FAIL, 0 SKIPPED) run standalone both before and after the commit;
  `check-phase-159.mjs --verbose` re-run after the workflow landed, unchanged pre-verification
  triple (116 PASS, 0 FAIL, 1 SKIPPED, total 117).
- Re-measured the full 20th Path-A lineage end to end: pin, converted predecessor harness (16/0/0),
  new harness (16/0/0), sidecar, baseline block, five leaves (13/13, 10/10, 10/10, 34/34, 12/12),
  apex (116/0/1), and the workflow itself — all eight members present and green standalone.
- Recorded the predecessor-surface census against the v1.21 close SHA (`e129081e`): 13 entries in
  `scripts/validation/` (11 this phase's own additions across Plans 159-02..159-07, plus exactly 2
  named pre-existing entries — `check-phase-135.mjs` and `check-prose-style.py`, both landed by the
  159-01 squash from Phase 155/157 content that predates any Plan 159-0X commit) and exactly 1
  entry in `.github/workflows/` (this plan's own new file). Nothing beyond that list appears.
- Confirmed the workflow fires nothing on its own (no `push` trigger anywhere in this repository)
  and that its purpose is presence on the default branch so a later manual dispatch can exercise
  the cross-OS evidence axis. Workflow file count: 18 before this plan's commit, 19 after, delta +1.
  `check-phase-54.mjs`/`-55.mjs`/`-56.mjs` each report `32 passed, 0 failed, 0 skipped` after both
  commits.

## Task Commits

1. **Task 1: Enumerate the predecessor and derive the mechanical diff plan** - `bacb05bb` (docs)
2. **Task 2: Author the thirteen-job coexistence workflow** - `36d471ce` (feat)
3. **Task 3: Re-measure the lineage end to end and record the workflow evidence** - `b3950f10` (docs)

## Files Created/Modified
- `.github/workflows/audit-harness-v1.22-integrity.yml` - the 19th CI coexistence workflow: 13 jobs, no push trigger, Python 3.13 pinned in 3 jobs
- `.planning/phases/159-harn-harness-close/159-EVIDENCE.md` - §20 (Task 1 diff plan, arithmetic, requirements, Python decision) and §21 (Task 3 lineage inventory, census, deltas) appended
- `.planning/phases/159-harn-harness-close/159-RESEARCH.md` - Planner Assumption 2 marked RESOLVED AT EXECUTION in place

## Decisions Made
- Job counts are derived by direct name enumeration, not by the plan's own literal grep-count verify
  command — that command's pattern also matches the `on:` block's bare `schedule:` trigger key,
  inflating both the predecessor's real count (17 printed vs. 16 real) and the new file's real count
  (14 printed vs. 13 real). Documented as a measurement-command anomaly, not a job-count defect.
- The header comment describing the Python setup step was reworded to avoid repeating the exact
  literal strings `actions/setup-python@v5` and `python-version: '3.13'`, after an earlier draft's
  header prose inflated both exact-count acceptance criteria from 3 to 4.
- Python pinned at `3.13` (not the runner default), matching the local Axis-1 reproduction
  environment, per the resolved Planner Assumption 2.
- The two anticipated "pre-existing entries" in the predecessor-surface census were traced and
  named: `check-phase-135.mjs` and `check-prose-style.py`, both squashed from Phase 155/157 content
  that predates any Plan 159-0X commit.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Header comment prose inflated the Python literal-count acceptance criteria from 3 to 4**
- **Found during:** Task 2, immediately after authoring the workflow file
- **Issue:** The initial header comment described the new Python setup step using the exact literal
  strings `actions/setup-python@v5` and `python-version: '3.13'`, which — combined with the three
  genuine per-job usages — made both of Task 2's exact-count acceptance commands
  (`grep -c "actions/setup-python@v5"` and `grep -c "python-version: '3.13'"`) print 4 instead of
  the required 3.
- **Fix:** Reworded the header comment to describe the Python step without repeating either exact
  literal string ("the pinned-minor Python 3 setup step" instead of naming the action and version
  literally).
- **Files modified:** `.github/workflows/audit-harness-v1.22-integrity.yml`
- **Verification:** both `grep -c` counts read `3` after the edit, matching the acceptance criteria exactly.
- **Committed in:** `36d471ce` (fixed before commit; no separate commit needed)

### Documented Deviation (Rule 1 — plan-verify-command defect, not fixable within this plan's scope)

**2. [Rule 1] Task 1 and Task 2's job-count grep commands both false-positive-match the `schedule:` trigger key**
- **Found during:** Task 1, running the plan's own second `<verify>` command against the live
  predecessor file
- **Issue:** `grep -nE "^  [a-z][a-z0-9-]*:"` is meant to count job names under `jobs:`, but the
  `on:` block's own `schedule:` key is also a bare-lowercase, 2-space-indented, colon-terminated
  line with no distinguishing feature the pattern can exclude — it matches identically. (
  `pull_request:` and `workflow_dispatch:` do not false-positive because their underscores fall
  outside `[a-z0-9-]`.) This inflated the predecessor's printed count from 16 to 17 (Task 1) and the
  new file's printed count from 13 to 14 (Task 2).
- **Resolution:** Both real job counts were confirmed by direct enumeration of job names from each
  file's `jobs:` block, matching D-30's carried figures (16 predecessor, 13 new) exactly. Recorded
  in `159-EVIDENCE.md` §20/§21 as a measurement-command anomaly rather than treated as a real
  regression or worked around by editing either workflow file's structure.
- **Files modified:** None (measurement-only; no source change required or made)
- **Verification:** `159-EVIDENCE.md` §20/§21's job-name enumeration tables list all 16/13 real job
  names by line number, independent of the flawed grep pattern.
- **Committed in:** `bacb05bb` (Task 1 documentation), `b3950f10` (Task 3 confirmation)

---

**Total deviations:** 2 (1 auto-fixed Rule 1 bug, 1 documented Rule 1 measurement-command defect).
**Impact on plan:** Both fixes were necessary for the workflow to satisfy its own literal acceptance
criteria exactly and for the evidence record to be accurate. Neither is scope creep or a functional
regression — the first is a one-line comment wording change with no behavioral effect, and the
second is a proxy-command imprecision documented rather than silently worked around.

## Issues Encountered
None beyond the two documented deviations above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness

The 19th CI coexistence workflow exists, is green against the chain member that inspects it
(`check-phase-139.mjs`), and the apex's pre-verification triple is unchanged after it landed. The
20th Path-A lineage is complete and green standalone: pin, exports, converted harness, new harness,
sidecar, baseline block, five leaves, apex, and workflow. HARN-04 is the only requirement this plan
declares and it is now flipped complete. The predecessor-surface census holds exactly its expected
membership. No blockers for Plan 159-09 (the next plan in sequence per STATE.md's Plan 8 of 13
position). The workflow itself fires nothing until a future PR, schedule tick, or manual dispatch —
a later plan (per D-30/D-63) is expected to exercise the cross-OS evidence axis via
`workflow_dispatch`.

---
*Phase: 159-harn-harness-close*
*Completed: 2026-09-09*

## Self-Check: PASSED

`.github/workflows/audit-harness-v1.22-integrity.yml` confirmed present on disk with 13 real jobs
(direct enumeration). All three task commits (`bacb05bb`, `36d471ce`, `b3950f10`) confirmed in
`git log`. `159-EVIDENCE.md` §20/§21 confirmed present with the required job-diff table, arithmetic,
Python decision, lineage inventory, and predecessor-surface census. `159-RESEARCH.md` Planner
Assumption 2 confirmed marked RESOLVED AT EXECUTION in place. `check-phase-139.mjs` confirmed green
(5 PASS, 0 FAIL, 0 SKIPPED) both before and after the workflow commit. `check-phase-159.mjs
--verbose` confirmed unchanged pre-verification triple (116 PASS, 0 FAIL, 1 SKIPPED, total 117)
after the workflow commit. `check-phase-54.mjs`/`-55.mjs`/`-56.mjs` confirmed `32 passed, 0 failed,
0 skipped` each. `git status --porcelain -- docs/` confirmed empty across all three commits.
