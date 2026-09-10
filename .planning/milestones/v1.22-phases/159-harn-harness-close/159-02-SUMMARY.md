---
phase: 159-harn-harness-close
plan: 02
subsystem: infra
tags: [git-plumbing, frozen-read, milestone-close, back-anchor-pin]

# Dependency graph
requires:
  - phase: 159-01
    provides: the entire v1.22 milestone landed on `master` as one single-parent commit, so this plan's frozen reads and validator runs operate against a stable, ordinary commit history
provides:
  - "`MILESTONE_CLOSE_SHAS.V121 = 'e129081e'` inserted strictly before the `V14` entry in `scripts/validation/_lib/frozen-at-close.mjs` (never appended), the sixth link in the V117→V121 back-anchor chain"
  - "`readAtV121Close` and `lsTreeAtV121Close` exported from the two existing export runs, following the unbroken V18..V120 single-entry pattern"
  - "The pin proven end-to-end by a real frozen read: 113,803 bytes from `docs/recipes/05-enterprise-update-plan.md`, 307 docs paths listed"
  - "A named, scoped, one-time re-amendment of the file's APPEND-ONLY ruling (Phase 159 D-15), recorded in the file's own header comment"
  - "The one-step-back discriminator measurement (V121=307 vs V120=296 docs paths, difference 11) the v1.21 harness conversion plan depends on"
affects: [159-03, 159-04, 159-08, 159-13]

# Actuals (#2632)
actuals:
  tokens: 4252
  tasks: 3
  commits: 3

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Mid-file insertion (never append) into an APPEND-ONLY-ratified object literal, gated by re-running the same live pin check on both sides of the edit rather than trusting the diff"
    - "Subject-line pair discriminator (`awk` on `%H|%s`, never the dual-token `--grep --all-match` form) for recovering a milestone close-gate SHA, regression-checked against every already-pinned predecessor before trusting the new result"

key-files:
  created: []
  modified:
    - scripts/validation/_lib/frozen-at-close.mjs
    - .planning/phases/159-harn-harness-close/159-EVIDENCE.md

key-decisions:
  - "Followed D-14 exactly: recovered e129081e via the subject-line pair discriminator at count 1, regression-checked at count 1 against V117/V118/V119/V120, before trusting it."
  - "Followed D-15: named the Phase 159 APPEND-ONLY re-amendment explicitly in the file's header comment block, mirroring Phase 153's own precedent shape, scoped to this one insert only."
  - "Followed D-16/D-17: ran all three live guards (V-140-V14PIN, V-120-HYG01, V-73-LIB-EXISTS) standalone before and after the edit (six readings, all 0 FAIL), and proved the pin end-to-end with a real frozen read rather than by inspection."
  - "Measured D-20's one-step-back discriminator live: V121 docs tree (307 paths) strictly dominates V120's (296), difference 11, known member present at V121/absent at V120 by two separate commands."

patterns-established:
  - "A tracer task's own literal acceptance-criteria command can be plan-text-wrong (here: `export function` grep against a codebase that only ever uses `export const`) without the underlying deliverable being wrong — verify intent, not literal text, and document the substitution as a Rule 3 deviation rather than silently skipping the check."

requirements-completed: [HARN-01, HARN-02]

coverage:
  - id: D1
    description: "V121 back-anchor pin inserted strictly before V14 in MILESTONE_CLOSE_SHAS, discriminator recovered and regression-checked at count 1 across five versions, all three live guards green before and after (HARN-01)"
    requirement: HARN-01
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-140.mjs (V-140-V14PIN PASS, 0 FAIL, both sides of the edit); object-order assertion command prints 'V121 before V14; V14 still last key'"
        status: pass
    human_judgment: false
  - id: D2
    description: "readAtV121Close/lsTreeAtV121Close appended to the two existing export runs, unbroken V18-V120 pattern, proven end-to-end by a real frozen read (HARN-02)"
    requirement: HARN-02
    verification:
      - kind: other
        ref: "node -e frozen-read proof: 'V121 pin resolves; read bytes=113803; docs paths=307'; export contiguity confirmed via grep -c \"^export const readAtV1\"/\"^export const lsTreeAtV1\" (19->20, 18->19)"
        status: pass
    human_judgment: false
  - id: D3
    description: "One-step-back discriminator measurement the v1.21 harness conversion plan (159-03/04) depends on: V121 docs tree (307) strictly exceeds V120's (296), known member present/absent confirmed"
    requirement: null
    verification:
      - kind: other
        ref: "git ls-tree -r --name-only e129081e/246fa3dd -- docs | wc -l (307/296); git cat-file -e presence/absence checks"
        status: pass
    human_judgment: false
  - id: D4
    description: "HARN-02 unclassified-edge flagged assumption surfaced as open residual risk, not dismissed"
    requirement: null
    verification: []
    human_judgment: true
    rationale: "No gate in this plan's verify set can prove the absence of a fourth, uncovered failure mode for the two new exports beyond the three named ones (collision, wrong tag, wrong-SHA resolution) — this is a judgment call about completeness of a failure taxonomy, not something a command can assert."

# Metrics
duration: 8min
completed: 2026-09-09
status: complete
---

# Phase 159 Plan 2: V121 back-anchor pin Summary

**Inserted the V121 close-gate SHA (`e129081e`) strictly before the V14 entry in the shared frozen-read library, appended its two convenience exports, and proved the pin end-to-end with a real frozen read returning 307 docs paths — the sixth unbroken link in the V117→V121 back-anchor chain.**

## Performance

- **Duration:** 8 min
- **Started:** 2026-09-09T12:05:05Z
- **Completed:** 2026-09-09T12:12:55Z
- **Tasks:** 3 completed (Task 2 is the plan TRACER)
- **Files modified:** 2 (`scripts/validation/_lib/frozen-at-close.mjs`, `159-EVIDENCE.md`)

## Accomplishments

- Recovered and regression-checked the V121 close SHA with the subject-line pair discriminator: 5 rows (V117-V121), all candidate counts exactly 1, dual-token `--all-match` form never used.
- Inserted `MILESTONE_CLOSE_SHAS.V121 = 'e129081e'` strictly before `V14` (never appended), named the Phase 159 D-15 APPEND-ONLY re-amendment explicitly in the file's header, and appended `readAtV121Close`/`lsTreeAtV121Close` into the two existing export runs (grew from 19→20 and 18→19 respectively, contiguous, no new export block).
- Proved the pin end-to-end: a real frozen read of `docs/recipes/05-enterprise-update-plan.md` at V121 returned 113,803 bytes; a real tree listing of `docs` at V121 returned 307 paths.
- Ran all three live guards (`V-140-V14PIN`, `V-120-HYG01`, `V-73-LIB-EXISTS`) standalone before and after the edit — six readings, all 0 FAIL.
- Measured the one-step-back discriminator the v1.21 harness conversion plan needs: V121's docs tree (307 paths) strictly exceeds V120's (296), difference 11; the known member is present at V121 and absent at V120; the structural contract validator (`c17-eee-contract.mjs`) has had 0 commits since the V121 close and reads only the docs walk outside `--self-test`.

## Task Commits

Each task was committed atomically:

1. **Task 1: Recover and regression-check the close SHA, pre-edit guard triples** - `9f75f529` (docs)
2. **Task 2 (TRACER): Insert pin, append exports, prove end-to-end** - `c6e37a6c` (feat)
3. **Task 3: Record pin evidence and one-step-back discriminator measurement** - `59b4b195` (docs)

**Plan metadata:** committed as part of this final close-out step (STATE.md/ROADMAP.md/REQUIREMENTS.md sync + this SUMMARY.md).

_Note: TDD tasks may have multiple commits (test → feat → refactor) — not applicable to this plan._

## Files Created/Modified
- `scripts/validation/_lib/frozen-at-close.mjs` - V121 pin inserted before V14; `readAtV121Close`/`lsTreeAtV121Close` exports appended; Phase 159 D-15 re-amendment named in the header comment block
- `.planning/phases/159-harn-harness-close/159-EVIDENCE.md` - three new sections (§6-§8) recording the five discriminator rows, six guard triples, frozen-read proof, one-step-back discriminator measurement, and the flagged HARN-02 assumption

## Decisions Made

- D-14/D-15/D-16/D-17 followed exactly as specified in `159-CONTEXT.md` — see key-decisions above.
- Retitled the shared evidence document's header from "Plan 159-01" to "Phase 159" (with a one-line pointer noting §1-§5 belong to 159-01 and §6+ belong to 159-02), since this file is shared across multiple plans in this phase and the old title was already inaccurate once a second plan started writing to it.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Mis-specified verify command] Task 2's export-count acceptance criterion checks for a code style this file never uses**
- **Found during:** Task 2
- **Issue:** The acceptance criteria's literal command, `` grep -c "export function readAtV1" ``, can never return a non-zero count for this file — every convenience export from `readAtV14Close` through the new `readAtV121Close` is declared `export const ... = (p) => ...`, never `export function`. The literal command reads 0 both before and after the edit, so it cannot distinguish "the run grew by one" from "nothing changed."
- **Fix:** Used the intent-true check instead: `grep -c "^export const readAtV1"` (19→20) and `grep -c "^export const lsTreeAtV1"` (18→19), confirming both new exports sit contiguously inside their existing runs immediately after the V120 entries, with no new export block created.
- **Files modified:** none (verification-only)
- **Verification:** counts and contiguity confirmed; documented in `159-EVIDENCE.md` §7
- **Committed in:** `c6e37a6c`

---

**Total deviations:** 1 auto-fixed (Rule 3 — mis-specified verify command in the plan text itself).
**Impact on plan:** The fix used the plan's own verify command as intended (proving export growth and contiguity), correcting only a literal-text/code-style mismatch in the acceptance criteria, not the deliverable. No scope creep.

## Issues Encountered

None beyond the deviation documented above, which was resolved during execution.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

The V121 pin is live, proven end-to-end, and gated green on all three live guards. Every later plan in Phase 159 that resolves through this pin — the v1.21 harness conversion (159-03/04), the v1.22 fork's provenance assertion, and the apex leg that spawns the converted harness — can now proceed. The HARN-02 unclassified-edge residual risk (a possible fourth, uncovered failure mode for the two new exports) is recorded as open, not resolved; no blocker, but worth a second look if a future harness conversion trips on the two new exports in an unexpected way.

**Known Stubs:** None.

**Threat Flags:** None beyond what this plan's own `<threat_model>` already scoped and mitigated (T-159-07 through T-159-10, all `mitigate`, all closed by this plan's own verify commands).

## Self-Check: PASSED

Both key files confirmed present on disk; all 3 commit hashes confirmed present in `git log --all`.

---
*Phase: 159-harn-harness-close*
*Completed: 2026-09-09*
