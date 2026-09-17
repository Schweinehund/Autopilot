---
phase: 161-vendor-de-bloat-into-the-kiosk-baseline
plan: 03
subsystem: infra
tags: [kiosk-safety-review, powershell, gpl-3.0, de-bloat, fact-check, vendoring]

requires:
  - phase: 161-02
    provides: the vendored RemoveBloat.ps1 and its GPL-3.0 license text, the NOTICE provenance entry, and the Baseline README's Attribution and license section this plan reads and extends
provides:
  - "Baseline README three new H2 sections: Known runtime fetch paths and their triggers (five rows), Kiosk-safety review (PROTECTED list, re-measured class table, five negative controls, prohibition, intunecomplete note, three named acceptances, a named open finding), Pattern-list reconciliation (fifteen rows in four groups)"
  - "161-FACTCHECK.md created: three fresh-context confirmation rounds logged verbatim with dispatch strings, verdicts, and the running process count against the phase's eight-process cap"
  - "161-EVIDENCE.md Task 1 (161-03) section: negative controls, re-measured class-table ranges, the Edge finding, reconciliation totals, named acceptances, confirmation-pass outcome, PART G rows 23-26"
affects: [161-04-PLAN]

actuals:
  tokens: 46000
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Second fresh-context confirmation pass reading a large vendored script chunked via its own Read tool (not embedded in the dispatch prompt), capped at three rounds, correcting the artifact under review between rounds rather than after the cap"
    - "Named open finding recorded directly on the reviewed artifact's own surface when a round-capped iterative process still has a residual, per D-52"
    - "Excluded-identifier needle checks scoped to the plan's own owned files rather than a directory-wide sweep that catches pre-existing planning prose describing the needle syntax itself"

key-files:
  created:
    - .planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-FACTCHECK.md
  modified:
    - assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/README.md
    - .planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-EVIDENCE.md

key-decisions:
  - "The vendored script (4,405 lines) was read chunked across its entire length in this task and by all three confirmation-pass dispatches, in nine ~500-line windows each time, rather than sampled at DRAFTS' pinned-SHA line pointers — every line range the class table cites was re-measured this way and all matched exactly except the McAfee block, which is wider than DRAFTS' pointer (see Deviations)."
  - "The confirmation pass's packet was built by pointing a fresh claude -p process at the two file paths and letting it read them with its own Read tool, rather than embedding the 4,405-line script inline in the dispatch prompt — this satisfies 'read chunked' for the dispatched process itself and keeps the logged dispatch strings small and auditable."
  - "Round cap reached at round 3 per D-52: zero PROTECTED-list breaches were found in any round, but two small completeness items survived (a Dell hardcoded-path uninstaller trio; a non-hive registry-value write) plus a minor count correction. Both were folded into the README and the residual is recorded as a named open finding directly on the README's own surface, not only in the evidence file."

requirements-completed: []

coverage:
  - id: D1
    description: "Baseline README carries the three locked H2 sections with the required shape: PROTECTED list, re-measured class table naming the Edge finding, five counted negative controls, the -custombloatlist prohibition, five fetch-path rows with the ODT fetch stated unconditional, and the fifteen-row reconciliation with four group totals summing to fifteen"
    requirement: null
    verification:
      - kind: other
        ref: "grep -cFx checks for all three new H2 literals plus Attribution and license and the pre-edit Assemble heading (all 1)"
        status: pass
      - kind: other
        ref: "five negative-control greps against Files/RemoveBloat.ps1 (2/0/0/0/1, matching the plan's expected values)"
        status: pass
      - kind: other
        ref: "git show HEAD:<script> | sha256sum matches 161-02's recorded value; check-phase-155.mjs 10/0/0"
        status: pass
    human_judgment: false
  - id: D2
    description: "A second fresh-context confirmation pass (three rounds, capped) read the script chunked and found zero omitted PROTECTED hits in every round; every dispatch logged verbatim in 161-FACTCHECK.md with round number, packet path and verdict; no dispatch stated an expected control value; the residual at the cap is a named open finding on the README surface"
    verification:
      - kind: other
        ref: "161-FACTCHECK.md contains three round headings and 15 case-insensitive 'dispatch' mentions"
        status: pass
      - kind: other
        ref: "claude auth status reports loggedIn:true; a one-word PONG probe round-tripped before Task 2 began"
        status: pass
      - kind: other
        ref: "check-phase-54.mjs 32/0/0 after 161-FACTCHECK.md landed (V-54-27 recursive .planning/ walk)"
        status: pass
    human_judgment: false
  - id: D3
    description: "161-EVIDENCE.md Task 1 (161-03) section records all five control counts with expected values beside measured, the re-measured class-table ranges with the McAfee difference stated, the Edge finding, the four reconciliation group totals, three named acceptances, the confirmation pass outcome, PART G rows 23-26, and all-zero excluded-identifier needles scoped to this plan's three owned files"
    verification:
      - kind: other
        ref: "grep -cE for the Task 1 (161-03) heading (=1) and the total task-headed section count (=5)"
        status: pass
      - kind: other
        ref: "excluded-identifier needles (SID, employer, certificate-subject prefix) scoped to README + FACTCHECK + EVIDENCE = 0"
        status: pass
      - kind: other
        ref: "test ! -e scripts/validation/check-phase-161.mjs succeeds"
        status: pass
    human_judgment: false

duration: 35min
completed: 2026-09-17
status: complete
---

# Phase 161 Plan 03: Kiosk-safety review and pattern-list reconciliation Summary

**Line-by-line kiosk-account-safety review of the vendored `RemoveBloat.ps1` against an explicit PROTECTED list, confirmed by three capped fresh-context passes with zero PROTECTED-list breaches found, landing the Baseline README's fetch-path table, five-part safety review, and fifteen-row EEE pattern reconciliation.**

## Performance

- **Duration:** ~35 min
- **Started:** 2026-09-17T02:30:00Z (approx.)
- **Completed:** 2026-09-17T02:54:35Z
- **Tasks:** 3
- **Files modified:** 3 (1 created, 2 modified)

## Accomplishments

- Read `Files/RemoveBloat.ps1` (4,405 lines) chunked across its whole length and re-measured every
  line range the README's class table cites against the committed bytes — all ranges matched
  `161-DRAFTS.md`'s pinned-SHA pointers exactly except the McAfee block, which is wider than the
  DRAFTS pointer (measured 3943-4052 vs. the pointer's 3945-3985); the difference is stated in both
  the README and `161-EVIDENCE.md`.
- Landed three new Baseline README H2 sections in the D-25 order: `## Known runtime fetch paths and
  their triggers` (five rows, the Office Deployment Tool fetch stated unconditional during ESP
  device setup with no hedging), `## Kiosk-safety review` (the PROTECTED list as a single source, a
  re-measured class table naming the one PROTECTED item on the removal list —
  `Microsoft.MicrosoftEdge.Stable`, spared only by a single upstream whitelist line — five negative
  controls as counts, the `-custombloatlist` prohibition with its brittleness caveat, the
  `$intunecomplete` note, and three named acceptances for CrossDevice, Quick Assist and Realtek
  audio), and `## Pattern-list reconciliation` (fifteen `Remove-KioskOemBloat.ps1` patterns in four
  groups — 7 removed upstream, 2 kept by the whitelist, 5 not listed upstream, 1 HP-publisher
  partial — concluding the EEE overlay stays load-bearing for seven of the fifteen).
- Ran three fresh-context confirmation rounds (the D-52 three-round cap), each dispatched as a
  separate `claude -p` process reading the script chunked with its own Read tool. Every round
  returned zero omitted PROTECTED-list hits and unchanged negative-control counts; each round's
  disclosed completeness gaps (entire removal classes the class table did not name, though none
  PROTECTED-relevant) were folded into the README before the next round ran. At the cap, two small
  items remained plus a minor count correction; both were folded in and the residual is recorded as
  a named open finding directly on the README's own surface, per D-52's rule that a suppressed
  residual is the failure mode, not an unresolved one.
- Recorded every dispatch verbatim in the new `161-FACTCHECK.md` (round number, full prompt text,
  transcribed verdict, running process count against the phase's eight-process cap: 3 of 8 used).
- Recorded `161-EVIDENCE.md` section 5 (`## Task 1 (161-03): Review and reconciliation record`) with
  every figure sourced from a command this plan ran, plus PART G needle rows 23-24b re-measured at
  this plan's own landing commit.

## Task Commits

1. **Task 1: Read the vendored script chunked and write the fetch-path, kiosk-safety review and pattern-list reconciliation sections** - `7dbedb20` (docs)
2. **Task 2: Run the second fresh-context confirmation pass over the review and log every dispatch in 161-FACTCHECK.md** - `96dd1d01` (docs)
3. **Task 3: Record the review measurements, control counts and this plan's needle rows in 161-EVIDENCE.md** - `579182c7` (docs)

_This plan is entirely documentation and evidence-record work over a governance corpus and one
verbatim-vendored PowerShell script; no TDD phases apply._

## Files Created/Modified

- `assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/README.md` - three new H2 sections (fetch paths, kiosk-safety review, pattern-list reconciliation)
- `.planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-FACTCHECK.md` - created; three confirmation-round dispatches logged verbatim
- `.planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-EVIDENCE.md` - Task 1 (161-03) section appended

## Decisions Made

- Every line range the class table cites was re-measured against the committed bytes in this task
  rather than carried from DRAFTS' pinned-SHA pointers; only the McAfee block's range differed
  (wider, see above), and the difference is stated on both the README and evidence surfaces.
- The confirmation-pass packet pointed the dispatched process at the two file paths and let it read
  them with its own Read tool, chunked, rather than embedding the 4,405-line script inline in the
  dispatch prompt — keeps the logged dispatch strings auditable and small while still satisfying
  "reads the script chunked across the whole file."
- At the three-round cap, the residual was recorded as a named open finding directly on the
  README's own `## Kiosk-safety review` surface (not only in `161-EVIDENCE.md`), per D-52's explicit
  instruction that a suppressed residual is the failure mode this gate exists to prevent.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Round-1 and round-2 confirmation passes surfaced omitted removal classes the class table draft did not name; README corrected before each subsequent round**
- **Found during:** Task 2, rounds 1 and 2
- **Issue:** The class table as first landed (Task 1) named the required D-25/D-09 shape but did not
  disclose several entirely-unmentioned removal classes present in the 4,405-line script — none
  PROTECTED-relevant, but real completeness gaps a byte-level review should not leave silent
  (Windows 10 Backup removal, OneDrive Photos removal, the broader OOBE/CoPilot/Recall registry
  block, extended Xbox actions, misc shortcut removal, the HP `$packagePatterns` loop's unfiltered
  mechanism, `UninstallAppFull`/`parseExeUninstall`/`UninstallApp` helper functions, OEM
  process-kill loops, several OEM hardcoded-path and registry removals, and — round 2's most
  significant finding — three Dell hardcoded-path uninstalls that bypass the `$appstoignore`
  whitelist entirely and remove two apps that ARE on that whitelist, though neither is a PROTECTED
  item).
- **Fix:** Added "Miscellaneous OS-tweak removals," "Manufacturer uninstall-loop matching
  mechanism," and "Additional per-manufacturer removal paths not covered above" rows to the class
  table, plus a `Microsoft.Edge.GameAssist`/SVCUI-census disclosure on the AppX row, after each of
  rounds 1 and 2, before the next round dispatched.
- **Files modified:** `assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/README.md`
- **Verification:** Round 3 (the cap) confirmed zero omitted PROTECTED hits and only two small
  residual items remained, both folded in after round 3 per the next deviation below.
- **Committed in:** `96dd1d01` (Task 2 commit)

**2. [Rule 1 - Bug] Round-3 (capped) confirmation pass found two further omissions and one count error; folded in and recorded as a named residual**
- **Found during:** Task 2, round 3 (the three-round cap)
- **Issue:** Round 3 found two further un-named classes (a Dell hardcoded-path uninstaller trio,
  lines 2883-2914; a "Learn about this picture" registry write, lines 959-978) and one minor count
  error (the HP row said "five OEM Start Menu `.lnk` targets"; the script has six).
- **Fix:** Folded both items and the corrected count into the class table, then added a "Named open
  finding (D-52 round cap reached)" paragraph stating the pass condition was met on the safety
  dimension (zero PROTECTED hits, all three rounds) but that a granular completeness residual
  remains below that level, accepted per D-52 rather than pursued past the cap.
- **Files modified:** `assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/README.md`
- **Verification:** All plan-level `<verify>` checks re-ran green after this final correction
  (H2 literals, negative controls, digest, `check-phase-155`).
- **Committed in:** `96dd1d01` (Task 2 commit)

**3. [Rule 1 - Bug] The plan's own literal directory-wide excluded-identifier verify command over-triggers on pre-existing planning prose describing the needle syntax itself**
- **Found during:** Task 3, running the plan's own literal `<verify>` command for the `CN=` needle
- **Issue:** Run literally over `.planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/` and
  `assets/recipes/06-walk-up-avd-kiosk/` (as the plan's verify block specifies), the `CN=` needle
  reports 2 hits — both inside `161-CONTEXT.md` and `161-DRAFTS.md`, pre-existing planning documents
  authored before this plan ran, which describe the `CN=` pattern itself in prose (the same
  false-positive class 161-02 already documented: a check whose own description contains the
  literal it is meant to detect the absence of). My own first `161-EVIDENCE.md` draft also spelled
  the pattern literally in backticks, adding a third avoidable hit under the same class.
- **Fix:** Not a code fix to the pre-existing planning prose (out of this plan's scope, and correct
  as documentation). Rewrote my own `161-EVIDENCE.md` sentence to describe the certificate
  Subject/Issuer field prefix prosaically instead of spelling the literal pattern, and scoped the
  actual acceptance test to what the plan's own frontmatter `prohibitions` and this task's
  acceptance criteria specify — "over the README, `161-FACTCHECK.md` and `161-EVIDENCE.md`" (the
  three files this plan creates or edits) — confirming all three needles (SID, employer,
  certificate-subject prefix) are zero when scoped that way.
- **Files modified:** `.planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-EVIDENCE.md`
- **Verification:** Scoped grep over the three plan-owned files returns 0 for all three needles;
  the wider directory-wide match is explained and attributed to pre-existing planning prose, not
  introduced by this plan.
- **Committed in:** `579182c7` (Task 3 commit)

---

**Total deviations:** 3 auto-fixed (all Rule 1). **Impact on plan:** All three were correctness
fixes discovered by the plan's own iterative confirmation process and its own verify instrumentation
— no PROTECTED-list breach was ever found, no locked/verbatim artifact was touched, and the round-cap
residual is explicitly disclosed rather than hidden. No scope creep.

## Issues Encountered

None beyond the three deviations documented above, all resolved without touching the vendored
script or either EEE removal script.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

The Baseline README carries all three D-25-ordered new sections with a re-measured, thrice-confirmed
class table and a fifteen-row reconciliation; `161-FACTCHECK.md` and `161-EVIDENCE.md` section 5 are
on disk and committed. `161-04-PLAN.md` (the PSADT wiring, `## Assemble` E-B1 replacement, RE-237
edits, and the pilot checkpoint) can proceed — the vendored script's HEAD digest is unchanged from
161-02's record, `check-phase-155` remains 10/0/0, and no byte of either EEE removal script was
touched. `161-FACTCHECK.md` has 3 of the phase's 8-process cap used, leaving 5 for 161-04's
fact-check and judge dispatches. VND-02 and VND-03 remain unchecked; this plan declares
`requirements: []` by design (D-35) and made no `requirements.mark-complete` call.

## Self-Check: PASSED

- `test -f assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/README.md` → FOUND
- `test -f .planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-FACTCHECK.md` → FOUND
- `test -f .planning/phases/161-vendor-de-bloat-into-the-kiosk-baseline/161-EVIDENCE.md` → FOUND
- `git log --oneline --all | grep -q 7dbedb20` → FOUND
- `git log --oneline --all | grep -q 96dd1d01` → FOUND
- `git log --oneline --all | grep -q 579182c7` → FOUND
- Re-ran plan-level `<verification>`: three H2 literals present once each ✓; Attribution/license and
  pre-edit Assemble heading byte-unchanged ✓; five negative controls 2/0/0/0/1 ✓; HEAD digest
  `bf0f4bd0…` matches 161-02's record ✓; `check-phase-155` 10/0/0 ✓; `check-phase-54` 32/0/0 ✓;
  `161-FACTCHECK.md` 15 dispatch mentions, 3 round headings, process-cap note present ✓; PART G rows
  23-26 recorded in `161-EVIDENCE.md` ✓; excluded-identifier needles scoped to this plan's three
  owned files all zero ✓; `check-phase-161.mjs` confirmed absent ✓.

---
*Phase: 161-vendor-de-bloat-into-the-kiosk-baseline*
*Completed: 2026-09-17*
