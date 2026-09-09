---
phase: 159-harn-harness-close
plan: 04
subsystem: infra
tags: [frozen-read, milestone-close, harness-conversion, c17-eee-contract, path-a-lineage]

# Dependency graph
requires:
  - phase: 159-02
    provides: "MILESTONE_CLOSE_SHAS.V121 = 'e129081e' live in scripts/validation/_lib/frozen-at-close.mjs, so this plan's frozen reader construction and C17 materialize wrapper both resolve against a real, proven close-gate SHA"
  - phase: 159-03
    provides: "the working-copy v1.21-milestone-audit.mjs proven byte-equal to the frozen e129081e blob immediately before this plan's Task 2 edit, so the conversion's starting point is provably unmodified"
provides:
  - "scripts/validation/v1.21-milestone-audit.mjs converted from live-HEAD reads to frozen V121 reads across the whole harness: MILESTONE_TAG='V121', a frozen corpus reader built with the sidecar as an extra path, all three corpus-reading helpers (readFile/walkMd/parseAllowlist) routed through it, and the C17 leg's subprocess spawn wrapped in withDocsAtClose('V121', ...) behind a live existsSync presence guard and a known-member guard on docs/recipes/05-enterprise-update-plan.md"
  - "HARN-03 discharged and the C17-FROZEN-AWARE-RESIDUE-V21 class this file's own header named is closed"
  - "A perturbation proof (scratch clone, non-shallow file:// URL) demonstrating the converted harness ignores a working-tree edit to a sidecar-pinned line that would have moved three checks (C2/C7/C9) on the pre-conversion harness"
  - "Two negative probes (bogus known member, wrong milestone tag) proving the C17 anti-vacuous-green guards fail before they are trusted to pass"
affects: [159-07, 159-08, 159-09, 159-13]

# Actuals (#2632)
actuals:
  tokens: 6630
  tasks: 3
  commits: 3

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Whole-harness frozen-read conversion (readFile/walkMd/parseAllowlist routed through createFrozenCorpusReader, C17 spawn wrapped in withDocsAtClose) applied to a nineteenth-generation harness, the same shape as the prior six v1.15-v1.20 conversions"
    - "Perturbation proof via a non-shallow file:// scratch clone: edit a sidecar-pinned line in the clone's working tree, run the converted harness there, and separately run a pre-conversion snapshot copy against the identical edit to prove the class of defect the conversion eliminates"
    - "Negative-probe-before-trust: a guard is not accepted as real until it has been made to fail (bogus known member, wrong milestone tag) and reverted green afterward"

key-files:
  created: []
  modified:
    - scripts/validation/v1.21-milestone-audit.mjs
    - .planning/phases/159-harn-harness-close/159-EVIDENCE.md

key-decisions:
  - "Followed D-18 exactly: whole-harness conversion in the v1.20-milestone-audit.mjs shape — MILESTONE_TAG='V121', createFrozenCorpusReader with the sidecar as an extra path, all three helpers routed through it."
  - "Followed D-19: the C17 existsSync contract-presence guard stays live against the real repository root by standing ruling (v1.21 Phase 153 D-11), never frozen — only the spawn's corpus is frozen."
  - "Followed D-20: the known member is docs/recipes/05-enterprise-update-plan.md, measured present at V121 (e129081e) and absent at the preceding close (V120, 246fa3dd), with V121's docs tree (307 paths) strictly dominating V120's (296) — a genuine one-step-back discriminator."
  - "Followed D-21: the success detail string now names the V121 corpus and materialized file count; the sidecar path literal is byte-unchanged (GOV-02); the header's stale 'born live-head' birth-condition paragraph is rewritten in place to record the conversion, tag, known member and standing ruling, without reusing the literal three-word marker phrase itself."
  - "Followed D-26: the perturbation and both negative probes ran in a non-shallow file:// scratch clone, never the main tree — verified via git status before and after each probe."

patterns-established:
  - "A pin-line-shift perturbation (insert one line above a sidecar-pinned coordinate) is a stronger, more realistic proof of frozen-read independence than editing arbitrary docs content, because it demonstrates the exact HYG-02-class defect this codebase has hit before: a single line insertion cascades to un-exempt every later pinned coordinate in the same file on a live-reading harness."

requirements-completed: [HARN-03]

coverage:
  - id: D1
    description: "v1.21-milestone-audit.mjs converted from live-HEAD to frozen V121 reads across the whole harness (all three corpus helpers plus the C17 leg), exits 0 with the same 16/0/0 triple as the pre-conversion live baseline, sidecar path and structural contract validator byte-unchanged (HARN-03, D-18/D-19/D-20/D-21)"
    requirement: HARN-03
    verification:
      - kind: other
        ref: "node scripts/validation/v1.21-milestone-audit.mjs --verbose (16/0/0, C17 names V121 corpus); --self-test (9/0); 5 conversion markers present; git diff --numstat e129081e..HEAD -- c17-eee-contract.mjs = 0; git status --porcelain -- docs/ empty"
        status: pass
    human_judgment: false
  - id: D2
    description: "Conversion proven by a scratch-clone perturbation (a sidecar-pinned-line edit leaves the converted harness's verdict unchanged while moving 3 checks on a pre-conversion snapshot) and by two negative probes (bogus known member, wrong milestone tag) each producing a real C17 FAIL before being reverted green"
    requirement: null
    verification:
      - kind: other
        ref: "159-EVIDENCE.md §13 — perturbation transcript (16/0/0 converted vs 13/3/0 unconverted-snapshot), two negative-probe transcripts (each 15/1/0), ordering backstop (two runs byte-identical), check-phase-54/55/56 all 32/0/0"
        status: pass
    human_judgment: false

# Metrics
duration: 12min
completed: 2026-09-09
status: complete
---

# Phase 159 Plan 4: Convert v1.21-milestone-audit.mjs to frozen V121 reads Summary

**Converted `v1.21-milestone-audit.mjs` from live-HEAD reads to the V121 frozen snapshot across the whole harness — all three corpus-reading helpers plus the C17 leg's materialized subprocess spawn — and proved the conversion with a real scratch-clone perturbation and two guards deliberately made to fail before being trusted, discharging HARN-03.**

## Performance

- **Duration:** 12 min
- **Started:** 2026-09-09T12:31:00Z (approx., immediately after 159-03's close-out)
- **Completed:** 2026-09-09T12:43:27Z
- **Tasks:** 3 completed
- **Files modified:** 2 (1 source harness, 1 evidence document)

## Accomplishments

- Recorded the pre-conversion live baseline (16 passed, 0 failed, 0 skipped) and confirmed all three conversion preconditions live: the V121 pin resolves to real bytes (113,803 read, 307 docs paths), the known member `docs/recipes/05-enterprise-update-plan.md` is present at V121 and absent at the preceding close (V121=307 vs V120=296 docs paths), and `c17-eee-contract.mjs` has 0 commits since the V121 close.
- Converted the whole harness in the already-converted `v1.20-milestone-audit.mjs` shape: `MILESTONE_TAG='V121'`, a frozen corpus reader with the sidecar as an extra path, `readFile`/`walkMd`/`parseAllowlist` all routed through it, and the C17 leg's contract path absolutized before the working-directory swap with the `existsSync` presence guard staying live against the real repository root.
- Converted harness exits 0 with the identical 16/0/0 triple the unconverted harness produced live; the success detail string now names the V121 corpus and the 307-file materialized count; the header's stale birth-condition paragraph is rewritten in place.
- Proved the conversion in a non-shallow `file://` scratch clone: a one-line insertion above a sidecar-pinned `supervision_exemptions` coordinate left the converted harness's verdict unchanged (16/0/0) while the identical edit against a pre-conversion snapshot copy moved three checks to FAIL (C2/C7/C9, 13/3/0) via a cascading pin-line-shift — the exact `HYG-02` class defect the conversion eliminates.
- Proved both anti-vacuous-green guards failable before trusting them: a bogus known-member path and a wrong milestone tag on the materialize wrapper each produced a real C17 FAIL (15/1/0), both reverted green afterward. Confirmed the ordering backstop (two consecutive runs byte-identical) and re-ran `check-phase-54/55/56` (all 32/0/0) after the commit.

## Task Commits

Each task was committed atomically:

1. **Task 1: Record the pre-conversion baseline and confirm the conversion preconditions** - `538aea18` (docs)
2. **Task 2: Convert the whole harness to frozen reads and the C17 leg to a materialized corpus** - `80d773d6` (feat)
3. **Task 3: Prove the conversion by perturbation and by two deliberate negative probes** - `9660e1cf` (docs)

**Plan metadata:** committed as part of this final close-out step (STATE.md/ROADMAP.md/REQUIREMENTS.md sync + this SUMMARY.md).

_Note: TDD tasks may have multiple commits (test → feat → refactor) — not applicable to this plan._

## Files Created/Modified

- `scripts/validation/v1.21-milestone-audit.mjs` — whole-harness conversion to frozen V121 reads; header birth-condition paragraph rewritten; C17 leg materializes the frozen docs tree behind a live presence guard and a known-member guard
- `.planning/phases/159-harn-harness-close/159-EVIDENCE.md` — two new sections (§12-§13) recording the pre-conversion baseline/preconditions and the perturbation/negative-probe proof

## Decisions Made

D-18/D-19/D-20/D-21/D-26 followed exactly as specified in `159-CONTEXT.md` — see key-decisions above. One presentation choice not dictated by CONTEXT: the header's rewritten paragraph deliberately avoids reusing the literal three-word marker phrase the old paragraph used (so a grep for that exact phrase reliably returns 0), while still recording the same fact — the file's prior birth condition (no close SHA to freeze against) no longer holds.

## Deviations from Plan

None - plan executed exactly as written. All acceptance criteria and verify commands passed on the first attempt in Tasks 1 and 2; Task 3's perturbation and negative probes were designed to fail and did, exactly as intended, before being reverted.

## Issues Encountered

None. One minor executor-side correction during Task 3 (not a plan deviation): the pre-conversion snapshot copy used for the perturbation contrast had to be placed inside `scripts/validation/` (not the scratch clone's root) so its relative `./_lib/exec-fail-detail.mjs` import resolved — a Node ES-module path-resolution detail, not a plan or deliverable defect.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

HARN-03 is discharged. The v1.21 harness now reads its own frozen V121 corpus everywhere except the C17 contract-presence guard, which correctly stays live by standing ruling. Plan 159-07 (the apex) can now add its `V-159-HARN03` leg spawning this converted harness and asserting it references `withDocsAtClose`. Plans 159-08/159-09/159-13 depend on this conversion being in place before the CI workflow and close-gate evidence reference it.

**Known Stubs:** None.

**Threat Flags:** None beyond what this plan's own `<threat_model>` already scoped and mitigated (T-159-16 through T-159-20, all `mitigate`, all closed by this plan's own verify/acceptance commands; T-159-SC `accept`, zero package-manager installs performed).

## Self-Check: PASSED

Both modified files confirmed present on disk with the expected content; all 3 commit hashes (`538aea18`, `80d773d6`, `9660e1cf`) confirmed present in `git log --oneline --all`.

---
*Phase: 159-harn-harness-close*
*Completed: 2026-09-09*
