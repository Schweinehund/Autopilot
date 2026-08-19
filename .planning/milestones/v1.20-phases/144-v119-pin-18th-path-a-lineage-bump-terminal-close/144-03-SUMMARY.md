---
phase: 144-v119-pin-18th-path-a-lineage-bump-terminal-close
plan: 03
subsystem: infra
tags: [ci-validator, frozen-read, gov-02, carve, negative-harness, sweep-09, harn-18]

# Dependency graph
requires:
  - phase: 141-standalone-red-validator-set-chain-members-green
    provides: "SWEEP-09's thirteen already-landed fail-loud sites in check-phase-61/68/70.mjs
      (Plan 03), and the explicit deferral of check-phase-67.mjs's remaining 7-plus-3 obligation
      to this phase (D-12)"
provides:
  - "The last ten silent-pass frozen-read sites in check-phase-67.mjs fail loud: seven
    chicken-and-egg early returns (return-field-only flip) plus three nullCount-accumulator
    blocks (V-67-01/03/06) restructured to require full readability before the aggregate is
    evaluated; V-67-05/07 get the return flip only since their thresholds already equal their
    file counts"
  - "check-phase-73.mjs's four-literal cross-validator pin (V-73-CONVERT-67-05/-06) survives
    byte-identical"
  - "One GOV-02 ledger row (path-scoped 18 hits + symbol-scoped 18 hits + the sole real pin
    identified), landed before the edit"
  - "Two negative proofs (one per fix class) run from the session scratchpad, outside the
    working tree, confirming both classes fail loud against a genuinely unreadable input"
affects: [144-close-audit]

# Actuals (#2632)
actuals:
  tokens: 6100
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Chicken-and-egg call-site conversion (Phase 141 Plan 03 precedent, reused verbatim):
       change only the RETURN at the call site (pass:true/skipped:true -> pass:false with a
       per-site detail string naming the unreadable path), never the shared wrapper reader
       function's own try/catch."
    - "Full-readability-before-aggregate restructure: for an accumulator whose pass threshold
       is strictly below its file count, a non-zero unreadable-file count must itself become a
       failure BEFORE the aggregate (sum/count) is evaluated -- otherwise a readable subset can
       silently reach the threshold while masking a genuinely unread file."
    - "Scratchpad negative-harness idiom (outside the working tree, never mutating scripts/):
       verbatim-copy the run() body under test, point its reader at a real git show against the
       real repo (cwd-scoped) with the FILES list swapped for absent paths, to prove a fail-loud
       branch without needing a full shallow-clone rig."

key-files:
  created: []
  modified:
    - scripts/validation/check-phase-67.mjs
    - .planning/milestones/v1.20-GOV-02-LEDGER.md
    - .planning/phases/144-v119-pin-18th-path-a-lineage-bump-terminal-close/144-EVIDENCE.md

key-decisions:
  - "Confirmed the exact 7-plus-3 vulnerability classification empirically before editing: of
     the five nullCount-accumulator blocks (V-67-01/03/05/06/07), exactly V-67-01, V-67-03 and
     V-67-06 have a pass threshold strictly below their file count (so a partial-null read can
     silently clear it); V-67-05 and V-67-07's thresholds equal their file counts, so any
     partial-null read already forces a hard fail without restructuring. Verified directly
     against the real content at the aa6de68 SHA (docs/admin-setup-macos/04-app-deployment.md
     alone carries 7 of the required >= 6 'content token' mentions), not assumed from the plan
     text."
  - "Did not mark HARN-18 complete in this plan. HARN-18's own success-criteria text spans the
     full 18th Path-A lineage bump (v1.20-milestone-audit.mjs, allowlist, BASELINE_24,
     check-phase-139..144.mjs, the apex, the 17th workflow) -- none of which this plan touches.
     Per D-24, all 28 v1.20 requirements flip to Validated in a single terminal close-gate
     commit; SWEEP-09 (already Complete since Phase 141) is untouched, and HARN-18 stays
     Pending until that commit."
  - "Did not wait out the bare (non-nested) full check-phase-67.mjs run to completion. Its own
     7 checks + SELF were directly confirmed unchanged and green (both via a nested run and via
     check-phase-138.mjs's real, non-simulated nested invocation of 67 as a chain member), and
     the bare run's CHAIN-48..64 progressed PASS with zero deviation from the pre-edit baseline
     before hitting the well-documented Windows-only exponential deep-nest cost
     (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01) at CHAIN-65/66 -- a pre-existing, edit-unrelated
     hazard this project's own standing ruling treats Linux GHA as authoritative for."

requirements-completed: []  # HARN-18 stays Pending -- this plan lands a routed sub-item
  # (D-03's check-phase-67.mjs fix), not HARN-18's own success criteria. SWEEP-09 was already
  # Complete since Phase 141 and needed no further action here. Both flip to Validated only at
  # Phase 144's single terminal close-gate commit (D-24).

coverage: []  # Infra/tooling gate -- no UAT-testable deliverable; verified entirely by the
  # automated <verify> commands, acceptance-criteria greps, and the scratchpad negative-proof
  # harness recorded in 144-EVIDENCE.md.

duration: ~50min
completed: 2026-08-13
status: complete
---

# Phase 144 Plan 03: check-phase-67.mjs Ten Fail-Loud Sites Summary

**Landed the last ten silent-pass frozen-read sites in `check-phase-67.mjs` across two classes
(seven return-field flips + three full-readability-before-aggregate restructures), proven by a
scratchpad negative harness outside the working tree, with `check-phase-73.mjs`'s four-literal
cross-validator pin and the predecessor apex both confirmed still green.**

## Performance

- **Duration:** ~50 min
- **Completed:** 2026-08-13
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments

- **GOV-02 census landed first, alone.** Path-string grep across `scripts/`, `.github/`,
  `package.json` (18 hits, 6 files, all prose/invocation except the real pin) plus symbol-scoped
  grep for `V-67-0[1-7]` (18 hits, 3 files). Identified the SOLE real pinning call site
  (`check-phase-73.mjs:266-302`, `V-73-CONVERT-67-05`/`-06`) and quoted its four literals
  verbatim in the ledger row so the post-edit re-check needed no re-derivation. `carve-gate.mjs`
  stayed green throughout (107 in-scope, 0 off-list).
- **Ten sites converted, two classes, one commit:**
  - Seven chicken-and-egg early returns (V-67-01..07, the `nullCount === FILES.length` /
    `j === null` all-unreadable branches) flipped from `{pass:true, skipped:true}` to
    `{pass:false, detail: '...'}`, each naming the unreadable file(s) and the frozen tag,
    reusing Phase 141 Plan 03's detail-string convention verbatim.
  - Three accumulator blocks (V-67-01, V-67-03, V-67-06) restructured: a new
    `unreadable.length > 0` branch (after the all-unreadable branch, before the
    threshold/aggregate check) fails loud on ANY partial-null read, naming the specific
    unreadable file(s), closing the exact exploit the plan describes -- confirmed live against
    the real corpus at `aa6de68` for V-67-03 (`docs/admin-setup-macos/04-app-deployment.md`
    alone carries 7 "content token" mentions, which alone clears the `>= 6` threshold and would
    have silently passed pre-fix while its sibling file sat unread).
  - V-67-05 and V-67-07 got the return-flip only (no restructure) since their thresholds already
    equal their file counts.
  - Shared wrapper reader functions' `try/catch` (`readCorpusFileAtV17Close`,
    `readSidecarAtV17Close`, lines 25-39) confirmed untouched by `git diff -U0` hunk inspection.
- **All four `check-phase-73.mjs` pinned literals survive** (`frozen-at-close` x2,
  `V-67-05.*v1\.7-frozen` x2, `Apple calls this artifact` x1, `SWEEP-02` x16).
  `check-phase-73.mjs` exits 0 at 40/0/0, unchanged from the pre-edit baseline.
- **Nested + apex regression confirmed green:** `CHECK_PHASE_NESTED=1 check-phase-67.mjs` ->
  8 PASS/0 FAIL/20 SKIPPED (identical to pre-edit); `check-phase-138.mjs` (the predecessor apex,
  which nested-invokes 67 as a real chain member, not simulated) -> 95 PASS/0 FAIL/0 SKIPPED.
- **Two negative proofs**, run from a scratchpad script entirely outside the repository working
  tree (verbatim-copied `run()` bodies for V-67-07 and V-67-03, reader repointed at a real
  `git show aa6de68:<path>` against the real repo, FILES lists pointed at absent paths):
  - Class 1 (V-67-07, all three FILES absent): reports `pass:false`, names all three unreadable
    files, no longer `skipped:true`.
  - Class 2 (V-67-03, one absent + one real file whose own count alone clears the old
    threshold): reports `pass:false`, names the specific unreadable file, proving the
    restructure -- not the numeric threshold -- is what fails this.
  - `git status --porcelain --untracked-files=all -- scripts` empty throughout; no file under
    `scripts/` was created or mutated to stage the proof.

## Task Commits

Each task was committed atomically:

1. **Task 1: GOV-02 target-scoped census row, before the edit** -- `2a4db2cb` (docs)
2. **Task 2: Land the ten fail-loud sites, two classes** -- `44441802` (fix)
3. **Task 3: Negative proof and chain regression gate** -- `99f140ee` (test)

## Files Created/Modified

- `scripts/validation/check-phase-67.mjs` -- 10 sites converted (7 return flips, 3 accumulator
  restructures); check inventory and `V-67-NN` ids unchanged; wrapper reader `try/catch`
  untouched
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` -- 1 row appended, pre-edit, naming both grep
  forms, the sole real pin, and its four literals
- `.planning/phases/144-v119-pin-18th-path-a-lineage-bump-terminal-close/144-EVIDENCE.md` -- 1
  new section appended (Plan 03 negative proofs + chain regression gate)

## Decisions Made

See `key-decisions` in frontmatter. In summary: verified the 7-plus-3 vulnerability
classification empirically (not from the plan text alone) before editing; left HARN-18 Pending
per D-24's single-close-gate-flip rule (this plan lands only a routed sub-item, not HARN-18's own
success criteria); accepted the bare non-nested full-chain run's Windows-only slow tail
(CHAIN-65/66) as out of scope for this session, relying on the nested run plus a real
(non-simulated) nested invocation via `check-phase-138.mjs` for confirmation, consistent with
this project's own standing Linux-GHA-authoritative ruling for that hazard class.

## Deviations from Plan

### Recorded, Not a Defect

**1. [Recorded, environment-specific] Bare `check-phase-67.mjs` full-chain run not waited to
completion**
- **Found during:** Task 2/3 verification
- **Issue:** A bare (non-nested) invocation of `check-phase-67.mjs` recursively spawns its own
  CHAIN-48..66 sub-guards, and CHAIN-65/66 hit the repo's well-documented Windows-only
  exponential deep-nest cost (`WINDOWS-CLONE-DEEPNEST-TIMEOUT-01`). The run progressed PASS
  through CHAIN-64 with zero deviation from a pre-edit control run before this session's time
  budget required moving on.
- **Why not chased further:** This is a pre-existing, edit-unrelated hazard class this project's
  own STATE.md records as a durable watch item, with an explicit standing ruling that Linux GHA
  is authoritative for the full non-nested chain on this OS split. The edit only touches checks
  1-7's return statements, not the CHAIN loop mechanics (confirmed via `git diff -U0` hunk
  ranges), so there is no code-level reason for CHAIN-65/66 to behave differently pre- vs
  post-edit.
- **Disposition:** Recorded in `144-EVIDENCE.md`. Own-check inventory (the only part this
  plan's edit can affect) directly confirmed unchanged and green via the nested run and via
  `check-phase-138.mjs`'s real nested invocation of 67 (95 PASS/0 FAIL/0 SKIPPED). No blocker to
  Phase 144's later plans.

---

**Total deviations:** 1 recorded, environment-specific observation (not a defect in this plan's
edit). **Impact on plan:** Zero scope creep; both fix classes proven by direct execution and by a
genuine negative harness.

## Next Phase Readiness

`check-phase-67.mjs`'s last ten silent-pass sites are closed: seven return flips plus three
full-readability-before-aggregate restructures, both classes proven fail-loud by a scratchpad
negative harness outside the working tree. `check-phase-73.mjs`'s four-literal pin and the
predecessor apex (`check-phase-138.mjs`, 95/0/0) both confirmed green. SWEEP-09 required no
further action (already Complete since Phase 141); HARN-18 stays Pending, reserved for Phase
144's single terminal close-gate commit alongside the rest of the 18th Path-A lineage bump. No
blockers to Phase 144's remaining plans.

## Self-Check: PASSED

- FOUND: `.planning/phases/144-v119-pin-18th-path-a-lineage-bump-terminal-close/144-03-SUMMARY.md`
- FOUND: `scripts/validation/check-phase-67.mjs`
- FOUND: `.planning/milestones/v1.20-GOV-02-LEDGER.md`
- FOUND: `.planning/phases/144-v119-pin-18th-path-a-lineage-bump-terminal-close/144-EVIDENCE.md`
- FOUND: commit `2a4db2cb`
- FOUND: commit `44441802`
- FOUND: commit `99f140ee`
