---
phase: 159-harn-harness-close
plan: 05
subsystem: testing
tags: [validation, needle-attribution, google-style, kiosk-recipe, corpus-floor]

requires:
  - phase: 159-harn-harness-close
    provides: "159-04's converted V121 harness and the five re-read boundary SHAs used for attribution"
provides:
  - "check-phase-154.mjs — 13-check standalone leaf for the style-landing phase"
  - "check-phase-155.mjs — 10-check standalone leaf for the kiosk-recipe formalization"
  - "check-phase-156.mjs — 10-check standalone leaf for the style-extension phase"
  - "159-EVIDENCE.md §14/§15 — full attribution proof, failability perturbations, not-pinnable lists, and attribution supersession for all three leaves"
affects: [159-06, 159-08]

actuals:
  tokens: 13138
  tasks: 3
  commits: 2

tech-stack:
  added: []
  patterns:
    - "Corpus-wide zero needle: docs/ walker + corpus-floor sentinel (files.length < 250) + literal substring count, reused verbatim from check-phase-145.mjs"
    - "Fail-loud spawn pairing: a hard presence assertion on the tool file plus a spawn check that never gracefully skips on a missing runtime, so the two absence classes produce distinguishable FAIL messages"
    - "Byte-identity via direct Buffer comparison instead of a spawned hash command (no execFileSync needed for the two asset script pairs)"

key-files:
  created:
    - scripts/validation/check-phase-154.mjs
    - scripts/validation/check-phase-155.mjs
    - scripts/validation/check-phase-156.mjs
  modified:
    - .planning/phases/159-harn-harness-close/159-EVIDENCE.md

key-decisions:
  - "The case-insensitive reading of 'sign into' never reaches 0 at HEAD (a different live phrase collides under case-folding); only the literal case-sensitive substring satisfies the two-part attribution proof, so that is the only matcher pinned in check-phase-156.mjs"
  - "_DISPOSITIONS-batch10.tsv genuinely carries 0 data rows at authoring time (correct current state, not a regression); the leaf pins presence only for that file instead of D-35's assumed >=1 row, with the delta recorded in EVIDENCE.md per D-65"
  - "Asset-pair byte-identity is asserted via direct Buffer.equals() comparison rather than spawning git hash-object, keeping the 155 leaf's spawn count at 0"

patterns-established:
  - "Live-value correction protocol: when a CONTEXT-carried assumption fails re-measurement, the leaf is adjusted to the true state and the divergence is written into EVIDENCE.md and the plan SUMMARY, never silently patched over"

requirements-completed: []

coverage:
  - id: D1
    description: "check-phase-154.mjs exists, runs standalone, and exits 0 with 13/13 PASS"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-154.mjs"
        status: pass
    human_judgment: false
  - id: D2
    description: "check-phase-155.mjs exists, runs standalone, exits 0 with 10/10 PASS, and spawns nothing"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-155.mjs"
        status: pass
      - kind: other
        ref: "grep -cE 'execFileSync|spawnSync' scripts/validation/check-phase-155.mjs"
        status: pass
    human_judgment: false
  - id: D3
    description: "check-phase-156.mjs exists, runs standalone, exits 0 with 10/10 PASS, and spawns nothing"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-156.mjs"
        status: pass
      - kind: other
        ref: "grep -cE 'execFileSync|spawnSync' scripts/validation/check-phase-156.mjs"
        status: pass
    human_judgment: false
  - id: D4
    description: "Every needle is attributed by a two-part boundary-series proof and proved failable in a scratch copy, recorded in 159-EVIDENCE.md"
    verification:
      - kind: manual_procedural
        ref: "159-EVIDENCE.md §14 boundary-series table and failability-proof table"
        status: pass
    human_judgment: true
    rationale: "Attribution correctness (does the transition genuinely land inside the owning phase's window) requires reading the recorded git-grep series, not something a single automated command can assert in isolation"

duration: 55min
completed: 2026-09-09
status: complete
---

# Phase 159 Plan 05: Style-Landing, Kiosk-Recipe & Style-Extension Content Leaves Summary

Three standalone chain-member validators (check-phase-154/155/156.mjs) written with every needle
re-measured live against the corpus and the five re-read boundary SHAs, each pinning only
attributable, proved-failable needles in the three allowed forms — corpus-wide zero with the floor,
per-file exact count, and scripts/assets artifact assertion.

## Performance

- **Duration:** 55 min
- **Started:** 2026-09-09T13:50:00Z
- **Completed:** 2026-09-09T14:45:00Z
- **Tasks:** 3 completed
- **Files modified:** 4 (3 created, 1 modified)

## Accomplishments
- `check-phase-154.mjs` (13 checks): two corpus-wide zeros (`i.e.`, `cf.`) with the corpus-floor
  sentinel, six per-file `e.g.` counts re-measured live and matching exactly, the meaning-verification
  tool's presence and its `--self-test` spawn (paired to distinguish a missing tool from a missing
  python3 runtime), the dispositions table, and the batch-9 substitution table's lookbehind guard.
- `check-phase-155.mjs` (10 checks, zero spawns): the recipe's provenance heading exactly once, all
  seven content substrings, the exactly-one RE-237 registry row, four hub-wiring files, the licensing
  phrase, the NOTICE asset, both script pairs re-hashed live and byte-identical, and the two
  retirement content needles inside `check-phase-135.mjs`.
- `check-phase-156.mjs` (10 checks, zero spawns): the "sign into" corpus-wide zero (literal,
  case-sensitive — the only matcher that survives the attribution proof), four per-file `administrator`
  counts with the matcher stated explicitly, the batch-10 judge-verdict file's normalized byte length
  paired with its hypothetical CRLF length, and the two batch-10 substitution tables.
- Re-ran the full two-part attribution proof for all three corpus-wide-zero candidates against the
  five re-read boundary SHAs plus HEAD; all three land inside their owning phase's window and stay
  stable at every later boundary (delta 0 against D-32/D-33/D-35).
- Caught and corrected one live-value divergence from CONTEXT: `_DISPOSITIONS-batch10.tsv` genuinely
  has 0 data rows (a correct, documented state), so that file's needle was adjusted to presence-only
  rather than pinning the CONTEXT-assumed "≥1 row," which would have made the leaf permanently red.

## Task Commits

1. **Task 1: Re-measure the attribution boundaries and prove every candidate needle failable** — no
   standalone commit (evidence recorded in the same commit as Task 3; see Deviations)
2. **Task 2: Write the style-landing leaf and the kiosk-recipe leaf** - `b97508f0` (feat)
3. **Task 3: Write the style-extension leaf and record the three-leaf evidence** - `7cf7e356` (feat, includes Task 1's boundary/failability evidence)

## Files Created/Modified
- `scripts/validation/check-phase-154.mjs` - 13-check standalone leaf, style-landing deliverables
- `scripts/validation/check-phase-155.mjs` - 10-check standalone leaf, kiosk-recipe deliverables, zero spawns
- `scripts/validation/check-phase-156.mjs` - 10-check standalone leaf, style-extension deliverables, zero spawns
- `.planning/phases/159-harn-harness-close/159-EVIDENCE.md` - §14 (Task 1 boundary/failability/not-pinnable/supersession evidence) and §15 (Task 3 three-leaf confirmation) appended

## Decisions Made
- "sign into" is pinned as a literal case-sensitive substring, not case-insensitive, because the
  case-insensitive reading never reaches 0 at HEAD (a different live phrase collides under
  case-folding) and would fail the attribution proof's stability half.
- `_DISPOSITIONS-batch10.tsv`'s needle was narrowed from "present with ≥1 data row" (D-35's
  assumption) to "present" only, because the file genuinely and correctly has 0 data rows right now.
- Asset-pair byte-identity checks compare file bytes directly (`Buffer.equals()`) rather than
  spawning `git hash-object`, keeping the 155 leaf's spawn count at the required 0.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corpus-floor literal used a named constant, breaking the acceptance grep**
- **Found during:** Task 2, immediately after writing `check-phase-154.mjs`
- **Issue:** The initial implementation used `const CORPUS_FLOOR = 250;` with `files.length <
  CORPUS_FLOOR`, but the plan's `<verify>` step greps for the literal source substring
  `files.length < 250`, which a named-constant comparison never produces.
- **Fix:** Inlined the literal `250` directly in the comparison (matching check-phase-145.mjs's own
  established form), keeping the corpus-floor sentinel's intent unchanged.
- **Files modified:** `scripts/validation/check-phase-154.mjs`
- **Verification:** `grep -c 'files.length < 250' scripts/validation/check-phase-154.mjs` → 1
- **Committed in:** `b97508f0`

**2. [Rule 1 - Bug] `_DISPOSITIONS-batch10.tsv` needle pinned against a live value that does not hold**
- **Found during:** Task 1 measurement pass
- **Issue:** D-35 (159-CONTEXT.md) asserts all three batch-10 tables carry "≥1 data row." Live
  measurement of `_DISPOSITIONS-batch10.tsv` found 0 data rows (header comments only) — its own
  header explains this is the correct current state, since batch-10 produced 0 deterministic
  findings at the tracer commit and rows accrue only as future findings surface.
- **Fix:** `check-phase-156.mjs`'s `V-156-DISPOSITIONSBATCH10` check asserts presence only for this
  one file; the two tables that do carry rows (`subs-batch10.tsv`, `subs-emdash-batch10.tsv`) keep
  the "≥1 data row" needle.
- **Files modified:** `scripts/validation/check-phase-156.mjs`, `159-EVIDENCE.md` (Live-value
  correction section)
- **Verification:** `node scripts/validation/check-phase-156.mjs` → `10 PASS, 0 FAIL, 0 SKIPPED`
- **Committed in:** `7cf7e356`

### Process Note (not a Rule 1-4 deviation)

Task 1 produced no source-file changes (per its own scope: "No source file is modified by this
task"), only evidence prose. Rather than create a commit containing only a partial EVIDENCE.md
section, Task 1's boundary-series, failability, not-pinnable, and supersession evidence was written
in the same edit pass as Task 3's own evidence section and committed together in `7cf7e356`. Task
1's acceptance criteria were independently verified (boundary SHAs, attribution proof, corpus floor,
failability perturbations) before Task 2 began, exactly as the plan's task ordering requires — only
the commit boundary was consolidated.

---

**Total deviations:** 2 auto-fixed (2x Rule 1 - bug/incorrect-premise correction).
**Impact on plan:** Both fixes were necessary for the leaves to be correct and green; neither is
scope creep. The `_DISPOSITIONS-batch10.tsv` correction is the more consequential of the two — it
prevents a permanently-red leaf that would have blocked the apex for a reason unrelated to any real
regression.

## Issues Encountered
None beyond the two auto-fixed deviations above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness

Three of the five apex chain members required by plan 159-06/159-08 now exist and run green
standalone (`check-phase-154.mjs`, `-155.mjs`, `-156.mjs`). The remaining two leaves
(`check-phase-157.mjs`, `check-phase-158.mjs`) are 159-06's scope. No blockers. The attribution
supersession recorded in §14 (158 D-35's misattribution of five Phase-157 deliverables) still needs
to be written into `v1.22-MILESTONE-AUDIT.md`'s Corrections of Record section at the milestone-close
step (D-61) — this plan only records the pointer, per its own scope.

---
*Phase: 159-harn-harness-close*
*Completed: 2026-09-09*

## Self-Check: PASSED

All three created leaves confirmed present on disk; SUMMARY.md confirmed present; all three task
commits (`b97508f0`, `7cf7e356`) plus the metadata commit (`7a648306`) confirmed in `git log`.
