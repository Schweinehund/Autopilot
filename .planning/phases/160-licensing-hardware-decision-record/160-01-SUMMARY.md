---
phase: 160-licensing-hardware-decision-record
plan: 01
subsystem: docs
tags: [planning-artifacts, gate-baseline, roadmap, requirements, annotate-and-supersede]

# Dependency graph
requires:
  - phase: 155-rcp-walk-up-avd-kiosk-recipe-formalization
    provides: the annotate-and-supersede direct-Edit pattern for amending a ROADMAP/REQUIREMENTS success criterion without deleting original text, and the 155-GATE-BASELINE.json key shape this plan mirrors
provides:
  - "One append-only D-28 amendment note on ROADMAP.md Phase 160 success criterion 2, quoting that file's own antecedent clause"
  - "One append-only D-28 amendment note on REQUIREMENTS.md LIC-02, quoting that file's own (different) antecedent clause"
  - "160-GATE-BASELINE.json: a single pre-edit phase_baseline snapshot covering all six structural validators, two report-only style instruments, pin_residency counts, and line_endings for the four files this phase touches"
affects: [160-02, 160-03]

# Actuals (#2632)
actuals:
  tokens: 3525
  tasks: 2
  commits: 2

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Annotate-and-supersede success-criterion amendment via direct Edit (D-39 carve-out from gsd-tools roadmap/requirements subcommands)"
    - "Single phase_baseline JSON snapshot with no pre/post key pairs -- a record, never a re-run equality gate (D-37)"

key-files:
  created:
    - .planning/phases/160-licensing-hardware-decision-record/160-GATE-BASELINE.json
  modified:
    - .planning/ROADMAP.md
    - .planning/REQUIREMENTS.md

key-decisions:
  - "Recorded a genuine byte-count drift in 160-GATE-BASELINE.json: 160-DRAFTS.md's ROADMAP.md figure (220 bare-LF / 23,426 bytes at HEAD 3a4b78db) is stale because commit c04c5721 inserted the Wave 1/2/3 plan list after DRAFTS was authored. The live-measured figure (233 bare-LF / 24,891 bytes) is what was recorded, with the drift explained inline, per this task's own instruction to re-measure rather than transcribe."
  - "No requirement-flip CLI (requirements.mark-complete) was run against the real tree in this plan -- requirements: [] is the sole flip control, and both LIC-01/LIC-02 bullets were re-verified unchecked and start-anchored after the edit."

patterns-established: []

requirements-completed: []  # D-28/D-35: this plan declares no requirements; LIC-01 flips at 160-02, LIC-02 at 160-03

coverage:
  - id: D1
    description: "160-GATE-BASELINE.json: single pre-edit phase_baseline snapshot -- six structural validators, two style instruments, pin_residency, line_endings -- every figure captured from this task's own command output"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-54.mjs -- Summary: 32 passed, 0 failed, 0 skipped"
        status: pass
      - kind: other
        ref: "node scripts/validation/c17-eee-contract.mjs -- 237 files checked, 0 with violations, 0 total (all 13 assertions 0)"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-nav-hub-links.mjs -- 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-155.mjs -- Result: 10 PASS, 0 FAIL, 0 SKIPPED"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-156.mjs -- Result: 10 PASS, 0 FAIL, 0 SKIPPED"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-159.mjs (apex) -- Result: 117 PASS, 0 FAIL, 0 SKIPPED, measured wall-clock 116s"
        status: pass
      - kind: other
        ref: "node -e (structural check on 160-GATE-BASELINE.json shape) -- top:[phase_baseline], bad:[] -- exit 0"
        status: pass
    human_judgment: false
  - id: D2
    description: "ROADMAP.md SC2 and REQUIREMENTS.md LIC-02 each carry one append-only D-28 amendment note, byte-exact from 160-DRAFTS.md, quoting each file's own differing antecedent clause, with check-phase-54 bracketing the edit 32/0 on both sides"
    requirement: null
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-54.mjs run immediately before AND immediately after the two Edit operations -- both readings: 32 passed, 0 failed, 0 skipped"
        status: pass
      - kind: other
        ref: "grep -c 'SUCCESS-CRITERION AMENDMENT, D-28' .planning/ROADMAP.md .planning/REQUIREMENTS.md -- both 1"
        status: pass
      - kind: other
        ref: "grep -c 'consistent with the per-user-vs-per-device consequence RCP-08 landed in v1.22.' .planning/ROADMAP.md .planning/REQUIREMENTS.md -- both 1 (antecedent survives verbatim)"
        status: pass
      - kind: other
        ref: "gsd-tools query roadmap.get-phase 160 -- found: true, 3 success_criteria, amendment inside criterion 2"
        status: pass
      - kind: other
        ref: "grep -c '^- \\[ \\] \\*\\*LIC-01\\*\\*:' and '^- \\[ \\] \\*\\*LIC-02\\*\\*:' .planning/REQUIREMENTS.md -- both 1, both still unchecked"
        status: pass
      - kind: other
        ref: "grep -rc '05-compliance-policy.md' .planning/ROADMAP.md .planning/REQUIREMENTS.md -- both 0 (V-54-21 negative)"
        status: pass
    human_judgment: false

duration: 12min
completed: 2026-09-12
status: complete
---

# Phase 160 Plan 01: Gate Baseline + SC2/LIC-02 Amendment Summary

**Append-only D-28 amendment lands on ROADMAP SC2 and REQUIREMENTS LIC-02 by direct Edit, bracketed by check-phase-54 32/0 on both sides, plus a single pre-edit 160-GATE-BASELINE.json snapshot covering all six structural validators, both style instruments, and the apex.**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-09-12T15:38:00Z (approx, per STATE.md session start)
- **Completed:** 2026-09-12T15:46:37Z
- **Tasks:** 2 completed
- **Files modified:** 3 (1 created, 2 modified)

## Accomplishments
- Captured a single pre-edit `phase_baseline` snapshot in `160-GATE-BASELINE.json`, mirroring `155-GATE-BASELINE.json`'s key shape, with every figure taken from this task's own command output (none transcribed from CONTEXT/RESEARCH/DRAFTS): six structural validators green, two report-only style instruments recorded (never as thresholds), pin_residency counts, blockquote-run lengths, and line-ending byte/CRLF counts for all four files this phase touches.
- Amended ROADMAP.md Phase 160 success criterion 2 and REQUIREMENTS.md LIC-02 with one append-only `**[SUCCESS-CRITERION AMENDMENT, D-28]**` note each, byte-exact from `160-DRAFTS.md`'s `### FINAL AMENDMENT TEXT` section, each quoting its own file's differing antecedent clause, with `check-phase-54` measured 32/0 immediately before and immediately after the edit.
- Confirmed apex `check-phase-159.mjs` 117 PASS / 0 FAIL / 0 SKIPPED with a real measured wall-clock (116 seconds), recorded as the pre-edit anchor for 160-03's post-edit comparison.

## Task Commits

Each task was committed atomically:

1. **Task 1: Capture the pre-edit gate and style baseline into 160-GATE-BASELINE.json** - `71e91f82` (docs)
2. **Task 2: Append the D-28 amendment to ROADMAP SC2 and REQUIREMENTS LIC-02, bracketed by check-phase-54** - `bb8b652f` (docs)

**Plan metadata:** committed separately (see `git_commit_metadata` step below)

## Files Created/Modified
- `.planning/phases/160-licensing-hardware-decision-record/160-GATE-BASELINE.json` - single pre-edit `phase_baseline` snapshot (created)
- `.planning/ROADMAP.md` - Phase 160 SC2 append-only D-28 amendment note
- `.planning/REQUIREMENTS.md` - LIC-02 append-only D-28 amendment note

## Decisions Made
- Recorded (rather than "fixed") a genuine drift between `160-DRAFTS.md`'s stale ROADMAP.md byte count (220 bare-LF / 23,426 bytes at HEAD `3a4b78db`) and this task's live measurement (233 bare-LF / 24,891 bytes at HEAD `f45ac9e2`): commit `c04c5721` inserted the Wave 1/2/3 plan list into Phase 160's ROADMAP section between those two commits. Phase 160 SC2's own text (the Task 2 edit target) was confirmed unchanged by that commit before proceeding. Per this task's own instruction ("Record what the commands actually print; if any figure differs... stop and re-measure"), the live figure was recorded and the plan continued rather than halting, because the discrepancy traced to an explainable, unrelated prior commit and did not touch the edit target.
- Did not run `requirements.mark-complete` for LIC-01 or LIC-02 anywhere in this plan, per explicit prohibition (D-35/D-39): the `requirements: []` frontmatter field is the only flip control, and it must survive until 160-02 (LIC-01) and 160-03 (LIC-02) land their respective content.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## Authentication Gates

None encountered.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Ready for 160-02 (Wave 2, LIC-01: RE-237 pilot reading, STD-05 decision block, fact check, judge packet). The 160-GATE-BASELINE.json pre-edit anchor (apex 117/0 at 116s wall-clock; check-phase-54 32/0; check-phase-155/156 10/0 each; c17-eee-contract 237/0/13-zero; check-nav-hub-links 0/0/0; check.py 86/20 candidates; sweep3.py 0 TOTAL edits per directory) is in place for 160-02 and 160-03 to compare their post-edit readings against. Both LIC-01 and LIC-02 requirement bullets remain unchecked and start-anchored, confirming no early flip fired.

## Self-Check: PASSED

- `.planning/phases/160-licensing-hardware-decision-record/160-GATE-BASELINE.json` -- FOUND on disk, parses as valid JSON with single top-level key `phase_baseline`.
- Commit `71e91f82` -- FOUND in `git log --oneline --all`.
- Commit `bb8b652f` -- FOUND in `git log --oneline --all`.
- All task-level `<acceptance_criteria>` re-verified above under Task Commits / coverage block -- all PASS.
- Plan-level `<verification>` re-run: `check-phase-54` 32/0 both sides recorded; `c17-eee-contract` 237/0/13-zero; `check-nav-hub-links` 0/0/0; `check-phase-155`/`check-phase-156` 10/0 each; apex `check-phase-159` 117/0 at 116s; `check.py` 86 (RE-237) / 20 (matrix); `sweep3.py` 0 TOTAL edits for `docs/recipes` and `docs/reference`; `roadmap.get-phase 160` 3 success criteria with amendment inside criterion 2; both LIC bullets unchecked and start-anchored; `test ! -e scripts/validation/check-phase-160.mjs` succeeds.

---
*Phase: 160-licensing-hardware-decision-record*
*Completed: 2026-09-12*
