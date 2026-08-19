---
phase: 144-v119-pin-18th-path-a-lineage-bump-terminal-close
plan: 01
subsystem: infra
tags: [governance, carve-gate, allowlist, ci]

# Dependency graph
requires:
  - phase: 143-link-coverage-fence-mask-unification
    provides: green apex chain, all corpus link/anchor/fence work closed
provides:
  - Category 11 CARVE allowlist amendment authorizing ten literal scripts/ paths for the rest of Phase 144
  - Pattern-level proof (144-EVIDENCE.md) that the amendment authorizes each of the ten paths
affects: [144-02, 144-03, 144-04, 144-05, 144-06, 144-07, 144-08]

# Actuals (#2632)
actuals:
  tokens: 1416
  tasks: 2
  commits: 2

# Tech tracking
tech-stack:
  added: []
  patterns: [carve-amendment-alone-and-first, literal-path-allowlist-over-glob]

key-files:
  created:
    - .planning/phases/144-v119-pin-18th-path-a-lineage-bump-terminal-close/144-EVIDENCE.md
  modified:
    - .planning/milestones/v1.20-CARVE.md

key-decisions:
  - "Ten literal paths, zero wildcard characters — a `check-phase-14*.mjs` glob was explicitly avoided because globToRegExp maps `*` to `[^/]*` with zero-width matching allowed and would over-match unrelated files."
  - "Amendment landed alone and first, before any of the six new validators, the sidecar, or the three pipeline paths exist — satisfying D-09's amendment-before-edit rule."
  - "Task 2's proof is pattern-level (string equality against the stripped allowlist), not a live gate run, since none of the ten target files exist yet and creating one would itself violate rule 3 of the amendment procedure."

patterns-established:
  - "CARVE amendment-first: every governance-gated phase opens with a single-file amendment commit before any authorized edit lands (mirrors 140-01, 141-01, 142-01/02, 143-01)."

requirements-completed: []

coverage:
  - id: D1
    description: "CARVE allowlist gains a Category 11 block with ten literal paths (six new validators, the apex, the sidecar, three over-listed pipeline paths) authorizing every scripts/ edit the rest of Phase 144 makes"
    verification:
      - kind: other
        ref: "node scripts/validation/carve-gate.mjs (in-scope=106 on-list=106 off-list=0, exit 0)"
        status: pass
      - kind: other
        ref: "git show --name-only --format= HEAD | wc -l == 1; git diff HEAD~1 --numstat -- .planning/milestones/v1.20-CARVE.md shows 0 deletions"
        status: pass
    human_judgment: false
  - id: D2
    description: "Pattern-level proof that all ten candidate paths are on-list via exact string match, recorded in the phase's measurement ledger"
    verification:
      - kind: other
        ref: "node one-liner exact-equality test against the stripped allowlist block: 10/10 matched"
        status: pass
    human_judgment: false

duration: 5min
completed: 2026-08-13
status: complete
---

# Phase 144 Plan 01: CARVE Category-11 Amendment Summary

**Authorized ten literal scripts/ paths (five leaf validators + apex, the new allowlist sidecar, three over-listed pipeline paths) in the v1.20 CARVE governance document — landed alone and first, unblocking every other Phase 144 plan.**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-08-13T04:14:06Z
- **Completed:** 2026-08-13T04:17:23Z
- **Tasks:** 2
- **Files modified:** 2 (1 modified, 1 created)

## Accomplishments
- Appended a Category 11 block to `.planning/milestones/v1.20-CARVE.md`'s `carve-allowlist` fenced block, with a one-line rationale comment and ten literal paths (zero wildcard characters), following Category 5's per-line style
- Appended a `## Recorded scope amendments` bullet naming D-07 and what it authorizes, so Phase 144's own close-gate reads this as authorized scope
- Proved authorization pattern-level (exact string equality, matching `carve-gate.mjs`'s `globToRegExp` semantics for a wildcard-free line) for all ten candidate paths — 10/10 matched
- Recorded the `carve-gate.mjs` in-scope/on-list/off-list triple and exit code, plus the single-file-commit proof, in a new `144-EVIDENCE.md` measurement ledger for later plans to append to

## Task Commits

Each task was committed atomically:

1. **Task 1: Author the Category-11 allowlist amendment** - `febd06d4` (docs)
2. **Task 2: Prove the amendment actually authorizes the ten paths** - `a82c38f2` (docs)

_Note: no plan-metadata commit yet — this executor's final metadata commit (SUMMARY + STATE + ROADMAP) follows separately._

## Files Created/Modified
- `.planning/milestones/v1.20-CARVE.md` - Category 11 allowlist block (10 literal paths) + `## Recorded scope amendments` bullet
- `.planning/phases/144-v119-pin-18th-path-a-lineage-bump-terminal-close/144-EVIDENCE.md` - phase measurement ledger, opened with the Plan 01 authorization proof

## Decisions Made
- Ten literal entries only, no `check-phase-14*.mjs` glob (D-07's explicit trap avoidance) — verified via `grep -c 'check-phase-14\*'` returning 0 inside the fenced block
- Over-listed three pipeline paths (`build-publish-bundle.mjs`, `build-filename-map.mjs`, `filename-map.md`) even though only two scripts are named in D-07 prose, per the plan's explicit "over-listing costs nothing, under-listing hard-blocks mid-phase" instruction
- Task 2's proof deliberately stayed pattern-level rather than creating any placeholder files under `scripts/`, since an untracked in-scope file is exactly what the gate is designed to reject and creating one would violate D-09 rule 3

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- `node scripts/validation/carve-gate.mjs` exits 0 with `in-scope=106 on-list=106 off-list=0` — every `scripts/` path Phase 144's remaining plans (02-08) create or edit is pre-authorized
- `144-EVIDENCE.md` is open as the phase's measurement ledger for later plans to append to
- No blockers for Plan 02 (the phase tracer)

---
*Phase: 144-v119-pin-18th-path-a-lineage-bump-terminal-close*
*Completed: 2026-08-13*

## Self-Check: PASSED

All created/modified files and both task commits verified present.
