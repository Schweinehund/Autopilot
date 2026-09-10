---
phase: 157-std-hyg-authoring-standard-corpus-hygiene
plan: 01
subsystem: docs-corpus-tooling
tags: [google-style, check.py, c17-eee-contract, requirements-traceability, hyg-02, fix-11]

requires:
  - phase: 156-style-extension-full-landing-verification
    provides: apex chain at 111 PASS / 0 FAIL / 0 SKIPPED, corpus at 294 tracked docs/*.md
provides:
  - "157-BASELINE.json: the committed equality target (apex tally, C17, nav-hub, check.py rule
    breakdown, all three leak needles + full needle_class_sites enumeration) that plans 02-07 compare
    against for the rest of the phase"
  - "Literal HYG-02 leak arm closed corpus-wide (both live .planning/ path hits removed from
    EEE-SOP-standard.md, provenance retained)"
  - "FIX-11 re-opened and re-discharged in v1.21-REQUIREMENTS.md with both regression/discharge commit
    SHAs and the reason V-145-ARCHIVALDRIFT missed it"
affects: [157-02, 157-03, 157-04, 157-05, 157-06, 157-07, 158]

actuals:
  tokens: 3253
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Apex chain (check-phase-153.mjs) run once in the foreground per Pitfall 4, never backgrounded,
      before any pinned surface is touched"
    - "Annotate-and-supersede for a false traceability row: keep the old row's cells, add a superseding
      annotation with named commit SHAs, never delete/rewrite history"

key-files:
  created:
    - .planning/phases/157-std-hyg-authoring-standard-corpus-hygiene/157-BASELINE.json
  modified:
    - docs/_standards/EEE-SOP-standard.md
    - .planning/milestones/v1.21-REQUIREMENTS.md

key-decisions:
  - "D-08/D-50 order honored: apex baselined and confirmed green before any validator-pinned surface
    was touched; HYG-02's literal arm closed before any later gate work"
  - "D-19: both EEE-SOP-standard.md path removals keep the D-04/owner-ruled/2026-08-26 provenance,
    dropping only the repository path"
  - "D-20/D-21: FIX-11 annotated with both commit SHAs (9fd7cf1c discharge, 285a65d5 regression) rather
    than silently re-fixed, and the standing detector is named as the future plan-04 gate"

requirements-completed: [HYG-02]

coverage:
  - id: D1
    description: "157-BASELINE.json committed with apex 111/0/0, C17 237/0, check.py 10402-candidate
      breakdown, and all three leak needles (literal=2, fix11=2, class=83/43 files) plus the full
      needle_class_sites enumeration"
    requirement: HYG-02
    verification:
      - kind: other
        ref: "python -c \"import json;...\" one-shot invariant check (six asserts) against
          157-BASELINE.json — see plan Task 1 <verify>"
        status: pass
    human_judgment: false
  - id: D2
    description: "Both live .planning/ literal-prefix hits removed from EEE-SOP-standard.md
      (lines 578/649), provenance (D-04, owner-ruled, 2026-08-26, Phase 151) retained verbatim"
    requirement: HYG-02
    verification:
      - kind: other
        ref: "grep -rc recursive-per-file-summed-by-awk literal needle == 0; grep -qF both replacement
          strings present; C17 237/0 — see plan Task 2 <verify>"
        status: pass
    human_judgment: false
  - id: D3
    description: "FIX-11 re-opened and re-discharged in v1.21-REQUIREMENTS.md with both commit SHAs,
      both dates, and the V-145-ARCHIVALDRIFT blind-spot reason"
    verification:
      - kind: other
        ref: "grep -qF 285a65d5 && grep -qF 9fd7cf1c && grep -qF 'Phase 157'; bare Complete row count
          == 0; .planning/REQUIREMENTS.md and ROADMAP.md byte-unchanged — see plan Task 3 <verify>"
        status: pass
    human_judgment: false

duration: 12min
completed: 2026-09-05
status: complete
---

# Phase 157 Plan 01: Baseline & HYG-02 Literal-Arm Closure Summary

**Baselined the apex chain (111/0/0) and both HYG-02 leak needles into a committed 157-BASELINE.json,
closed the two live `.planning/` path leaks in EEE-SOP-standard.md while preserving their D-04
provenance, and re-opened + re-discharged FIX-11 in v1.21-REQUIREMENTS.md with both regression and
discharge commit SHAs named.**

## Performance

- **Duration:** 12 min
- **Started:** 2026-09-05T14:51:19-05:00 (first commit)
- **Completed:** 2026-09-05T14:53:45-05:00 (last commit)
- **Tasks:** 3 completed
- **Files modified:** 3 (1 created, 2 modified)

## Accomplishments

- Ran the 111-entry apex chain (`check-phase-153.mjs`) once in the foreground and confirmed 111 PASS /
  0 FAIL / 0 SKIPPED at HEAD `1cd8c4d7`, before touching any validator-pinned surface (D-08).
- Committed `157-BASELINE.json` carrying all eleven required keys: `base_sha`, `apex`, `c17`, `nav_hub`,
  `checkpy` (10,402-candidate rule breakdown), `tracked_md` (294), and all three leak needles
  (`needle_literal`=2, `needle_fix11`=2, `needle_class`=83 across 43 files) plus the full
  `needle_class_sites` path:line enumeration for plans 02/03 to work from without re-deriving it.
- Closed the literal arm of HYG-02 corpus-wide: both live `.planning/` path hits — both sitting inside
  `docs/_standards/EEE-SOP-standard.md`, the directory the class-needle excludes — were replaced with
  the unbackticked phrase "the Phase 151 context," keeping the D-04 / owner-ruled / 2026-08-26 provenance
  byte-identical.
- Re-opened and re-discharged FIX-11 in `.planning/milestones/v1.21-REQUIREMENTS.md`: the traceability
  row no longer reads a bare Complete, and a new annotation states both commit SHAs (`9fd7cf1c`
  discharge, `285a65d5` regression), both dates, why `V-145-ARCHIVALDRIFT`'s link-only regex missed the
  regression, and that the standing detector is now Phase 157's own plan-04 gate.

## Task Commits

Each task was committed atomically:

1. **Task 1: Baseline the apex chain and the three leak needles at the phase's starting commit** -
   `d0b611e8` (docs)
2. **Task 2: Drop the two repository paths from EEE-SOP-standard.md, keeping the provenance** -
   `e6930d25` (fix)
3. **Task 3: Re-open and re-discharge FIX-11 in the v1.21 milestone requirements** - `5579f524` (docs)

No separate plan-metadata commit was required beyond this SUMMARY's own commit (below).

**Phase first commit SHA (D-48): `d0b611e8`**

## Files Created/Modified

- `.planning/phases/157-std-hyg-authoring-standard-corpus-hygiene/157-BASELINE.json` - new committed
  artifact carrying the phase's starting apex/C17/nav-hub/check.py/needle measurements; the equality
  target for plans 03-07.
- `docs/_standards/EEE-SOP-standard.md` - two-line edit: replaced the backticked repository path at
  both the D-04 amendment prose (formerly line 578) and the Version History row (line 649) with "the
  Phase 151 context," keeping all provenance wording, the date, and the D-04 attribution unchanged.
- `.planning/milestones/v1.21-REQUIREMENTS.md` - FIX-11's traceability row status cell changed from a
  bare "Complete" to "Regressed & re-discharged (see note below)"; a new annotation paragraph added
  immediately before the Coverage line, naming both SHAs, both dates, and the validator blind spot.
  FIX-11's own criterion text (line 41) is byte-unchanged. `.planning/REQUIREMENTS.md` and
  `.planning/ROADMAP.md` are untouched by this plan.

## Decisions Made

- D-08/D-50 ordering honored exactly: apex baselined and confirmed green in the foreground (per
  Pitfall 4 — never backgrounded) before any validator-pinned surface was touched, and HYG-02's literal
  arm was closed in this plan (wave 1) specifically because the plan-04 gate would otherwise be red at
  its own landing commit.
- D-19's provenance-preservation rule applied literally: only the repository path was dropped from each
  of the two sites; every other word, the bold `**D-04**`, the owner-ruled/date framing, and the
  following sentence about D-01 through D-07 are byte-identical to before.
- D-20/D-21 honored: FIX-11 was not silently repaired. The annotation records the full regression
  history (discharge commit, regression commit, ten days RED, the specific regex shape that made the
  regression invisible) and names Phase 157's own future gate as the new standing detector, so this
  project's "a one-time measurement is not a guard" lesson is the annotation's own stated reason for
  existing.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Merged a line-wrapped sentence to satisfy the plan's own literal-string verify check**
- **Found during:** Task 2 (EEE-SOP-standard.md edit, site one)
- **Issue:** The plan's task-2 `<verify>` requires
  `grep -qF 'recorded as **D-04** in the Phase 151 context' docs/_standards/EEE-SOP-standard.md` to
  succeed. The original prose wrapped mid-phrase across two source lines (`...recorded as **D-04** in`
  / `` `.planning/phases/...`. It is purely additive:``). Replacing only the backticked path in place
  would have left the required literal string split across a line break, which a single-line `grep -qF`
  can never match — the acceptance criterion's plain-English "exactly 2 changed lines" and the plan's
  own executable literal-string check were mutually unsatisfiable as originally wrapped.
- **Fix:** Merged the two source lines into one so the full required string
  (`recorded as **D-04** in the Phase 151 context`) sits on a single physical line. No other content in
  the sentence, or the following sentence about D-01 through D-07, was altered.
- **Files modified:** `docs/_standards/EEE-SOP-standard.md`
- **Verification:** `grep -qF 'recorded as **D-04** in the Phase 151 context' docs/_standards/EEE-SOP-standard.md`
  passes; `git diff --numstat` for the file reads `2 insertions, 3 deletions` (the merge collapses what
  would otherwise read as a 1-line net change into a 2-line net change at that one site) rather than a
  literal "2 changed lines" reading of the acceptance criterion — the stricter, machine-checked
  `<verify>` commands (all of which passed) govern over the looser prose acceptance-criteria phrasing.
- **Committed in:** `e6930d25` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug fix, Rule 1)
**Impact on plan:** Necessary to satisfy the plan's own literal-string verify command; no prose meaning
changed, no scope creep. All four of Task 2's `<verify>` commands and all three of Task 1's and Task 3's
pass exactly as specified.

## Issues Encountered

None beyond the deviation above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `157-BASELINE.json` is committed and gives plans 02 through 07 a single equality target for the apex
  tally and both remaining needle definitions (`needle_class` and its full 83-site enumeration) — no
  later plan needs to re-derive the census from scratch.
- HYG-02's literal arm is closed corpus-wide; the plan-04 gate (STD-02) can be authored in plan 04
  without landing red on its own leak-class assertion.
- FIX-11 is re-opened and re-discharged in writing; no blocker for later plans.
- No blockers for plan 02.

---
*Phase: 157-std-hyg-authoring-standard-corpus-hygiene*
*Completed: 2026-09-05*

## Self-Check: PASSED
All files (157-BASELINE.json, 157-01-SUMMARY.md, EEE-SOP-standard.md, v1.21-REQUIREMENTS.md) exist.
All commit hashes (d0b611e8, e6930d25, 5579f524, 690d65d9) found in git log.
