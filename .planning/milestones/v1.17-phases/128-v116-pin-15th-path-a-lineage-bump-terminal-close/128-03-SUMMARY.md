---
phase: 128-v116-pin-15th-path-a-lineage-bump-terminal-close
plan: 03
subsystem: infra
tags: [audit-harness, frozen-at-close, validation, milestone-close, git-forensics]

# Dependency graph
requires:
  - phase: 128-02
    provides: v1.17-milestone-audit.mjs + v1.17-audit-allowlist.json (35-pin -1 line-shift) + BASELINE_21, landed as one 3-file commit (fac3bc2)
provides:
  - "V116 back-anchor pin (3dd2512) + readAtV116Close export in _lib/frozen-at-close.mjs (HARN-08)"
  - "D-128-C frozen-aware conversion of the 8 predecessor validators / 14 checks that read a HYG-02-touched file at live HEAD (HARN-09 mandate)"
  - "The pin + all 8 conversions landed as ONE indivisible commit (066a906) per the Atom-2a floor"
affects: [128-04, 128-05, 128-06]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Single-entry back-anchor pin pattern (V18..V116), no V117 pin (back-anchor invariant)"
    - "Frozen-aware read conversion: readFile()/fs.readFileSync() -> readAtV116Close() wrapped in try/catch, needle text byte-unchanged, only the read source moves live->frozen"
    - "Selective-member conversion inside loops/helpers (check-phase-59/62/118): only the HYG-02-touched path is redirected to the frozen reader; sibling paths in the same loop/helper stay live"

key-files:
  created:
    - .planning/phases/128-v116-pin-15th-path-a-lineage-bump-terminal-close/128-03-SUMMARY.md
    - .planning/phases/128-v116-pin-15th-path-a-lineage-bump-terminal-close/deferred-items.md
  modified:
    - scripts/validation/_lib/frozen-at-close.mjs
    - scripts/validation/check-phase-49.mjs
    - scripts/validation/check-phase-58.mjs
    - scripts/validation/check-phase-59.mjs
    - scripts/validation/check-phase-62.mjs
    - scripts/validation/check-phase-101.mjs
    - scripts/validation/check-phase-109.mjs
    - scripts/validation/check-phase-118.mjs
    - scripts/validation/check-phase-121.mjs

key-decisions:
  - "Re-confirmed V116=3dd251249a812e31147cd653a7ad01e6878c091b via the dual-token recover-not-assume grep before hardcoding the pin (did not trust 128-01's recorded value blindly)"
  - "check-phase-118.mjs's generic presence() helper was made path-conditional (readAtV116Close only when path === DELIVERABLE_MATRIX) rather than duplicating the helper, so the OTHER presence() call (error-codes/00-index.md, not a HYG-02 file) correctly stays live"
  - "check-phase-59/62's loop-based checks (V-59-05, V-59-36, V-62-06..09) were converted with an in-loop conditional (f === GLOSSARY_AND / g === 'docs/_glossary-android.md') rather than splitting the loop, preserving the original control flow exactly"

requirements-completed: []  # HARN-08/09 land here structurally (pin + 8/8 conversions) but are NOT marked complete in REQUIREMENTS.md — full HARN-09 (validators + CI workflow) and the requirement flip happen at the close-gate per D-128-A single-commit-flip rider, mirroring 128-01/128-02's deferral pattern

# Metrics
duration: 17min
completed: 2026-07-11
---

# Phase 128 Plan 03: V116 Pin + D-128-C Frozen-Aware Conversion (Atom 2a) Summary

**Added the V116='3dd2512' back-anchor pin + `readAtV116Close` export to `frozen-at-close.mjs`, then converted the 8 predecessor validators (14 checks) that read a HYG-02-touched file at live HEAD to the frozen reader — landed as one indivisible 9-file commit (066a906) with needle text byte-unchanged and `CHAIN_SKIP` empty on every touched file.**

## Performance

- **Duration:** 17 min
- **Started:** 2026-07-11T17:35:00Z
- **Completed:** 2026-07-11T17:52:00Z
- **Tasks:** 3 completed
- **Files modified:** 9 (1 lib + 8 validators) + 1 deferred-items doc

## Accomplishments

- Re-confirmed V116 SHA (`3dd251249a812e31147cd653a7ad01e6878c091b`, short `3dd2512`) via the dual-token
  `git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE" --all-match` command, matching 128-01's
  recorded value exactly — independently re-verified, not assumed
- Inserted the `V116` entry into `MILESTONE_CLOSE_SHAS` directly after `V115` and before the `// V14 omitted`
  comment (position preserved); appended `readAtV116Close` after `readAtV115Close`; confirmed no `V117` entry
  exists anywhere in the file (back-anchor invariant)
- Converted all 8 D-128-C validators / 14 checks to `readAtV116Close`, per the exact RESEARCH.md enumeration:
  `check-phase-49` (V-49-19, V-49-21), `check-phase-58` (V-58-13/16/17/18/19/22, 6 identical-shape reads
  converted via one `replace_all`), `check-phase-59` (V-59-05, V-59-36 — loop-conditional conversions),
  `check-phase-62` (V-62-06..09 — loop-conditional conversion), `check-phase-101` (V-101-BANNER),
  `check-phase-109` (V-109-ROW-ANDROID), `check-phase-118` (PRESENCE-MATRIX via a path-conditional
  `presence()` helper + ENROLL + REFORMAT + TABLE-REMEDIATION), `check-phase-121` (V-121-VHROW)
- Confirmed via `git diff` grep that NO line in any of the 8 files touches `CHAIN_SKIP` or `CHAIN_PHASES`
  (both stay exactly as they were — empty Set, unchanged arrays)
- Confirmed via `git diff` that every removed line was either a bare `readFile(...)` call or an import
  statement being widened — zero needle/expected-value strings were altered (no value-masking)
- Ran all 8 converted validators standalone: 7/8 exit 0 cleanly; `check-phase-62.mjs` exits 1 due to
  4 PRE-EXISTING, unrelated chain-subprocess failures (proven byte-identical before/after this plan's
  edit via diff of the FAIL-line sets) — its own converted check (`V-62-06..09`) PASSES; documented in
  `deferred-items.md`, not fixed (out of D-128-C scope)
- Landed the V116 pin + all 8 conversions as ONE indivisible 9-file commit (`066a906`) via direct `git`
  (not `gsd-sdk query commit` — SDK write-verbs hang on this repo per project memory)

## Task Commits

All 3 tasks landed together as a single indivisible Atom-2a commit (by plan design — see `<action>` for
Task 3: "Stage exactly the 9 Atom-2a files ... and commit as ONE indivisible commit"):

1. **Task 1: Add the V116 pin + readAtV116Close export (HARN-08)** — staged, not committed separately
2. **Task 2: Convert the 8 D-128-C validators to readAtV116Close (14 checks)** — staged, not committed separately
3. **Task 3: Land Atom 2a as one commit** - `066a906` (feat)

**Plan metadata:** (this commit, see below — SUMMARY + STATE + ROADMAP)

## Files Created/Modified

- `scripts/validation/_lib/frozen-at-close.mjs` - added `V116: '3dd2512'` to `MILESTONE_CLOSE_SHAS` + `readAtV116Close` export
- `scripts/validation/check-phase-49.mjs` - V-49-19/21 android-glossary reads converted to `readAtV116Close`
- `scripts/validation/check-phase-58.mjs` - V-58-13/16/17/18/19/22 android-matrix reads converted (6 sites, one `replace_all`)
- `scripts/validation/check-phase-59.mjs` - V-59-05/36 loop-conditional android-glossary reads converted
- `scripts/validation/check-phase-62.mjs` - V-62-06..09 loop-conditional android-glossary read converted; new `_lib/frozen-at-close.mjs` import added
- `scripts/validation/check-phase-101.mjs` - V-101-BANNER android-glossary read converted; new import added
- `scripts/validation/check-phase-109.mjs` - V-109-ROW-ANDROID android-matrix read converted; new import added
- `scripts/validation/check-phase-118.mjs` - PRESENCE-MATRIX (path-conditional helper), ENROLL, REFORMAT, TABLE-REMEDIATION android-matrix reads converted; new import added
- `scripts/validation/check-phase-121.mjs` - V-121-VHROW android-glossary read converted; new import added
- `.planning/phases/128-v116-pin-15th-path-a-lineage-bump-terminal-close/deferred-items.md` - documents the pre-existing check-phase-62.mjs chain-subprocess failures (out of scope)

## Decisions Made

- Re-confirmed the V116 SHA via the dual-token grep at execution time rather than trusting 128-01's recorded
  value blindly (recover-not-assume, per project convention) — result matched exactly
- `check-phase-118.mjs`'s shared `presence()` helper is called for BOTH `DELIVERABLE_MATRIX` (HYG-02-touched)
  and `DELIVERABLE_ERRCODES` (not HYG-02-touched); rather than duplicating the helper or converting both
  targets, made the helper path-conditional (`path === DELIVERABLE_MATRIX ? readAtV116Close(...) : readFile(...)`)
  so only the correct target is frozen-aware — satisfies "convert ONLY reads of the 5 HYG-02 files"
- `check-phase-59.mjs` V-59-05 (loop over 3 glossaries) and V-59-36 (loop over 2 glossaries), and
  `check-phase-62.mjs` V-62-06..09 (loop over 4 glossaries), each needed only ONE of their loop members
  converted (`docs/_glossary-android.md`); used an in-loop conditional rather than restructuring the loop,
  preserving the exact original control flow and failure-aggregation semantics

## Deviations from Plan

None (Rule 1-4 sense) — plan executed exactly as written; the pin and all 8/14 conversions landed precisely
per the RESEARCH.md/PATTERNS.md enumeration, in the mandated pin-before-conversions order, as one commit.

One SCOPE-BOUNDARY-excluded discovery (not a deviation, not auto-fixed):

**[SCOPE BOUNDARY] check-phase-62.mjs standalone exit=1 due to pre-existing, unrelated chain failures**
- **Found during:** Task 2 verification (running all 8 converted validators standalone)
- **Issue:** `check-phase-62.mjs` exits 1 (30 PASS, 4 FAIL). The 4 failures are its `V-62-CHAIN-48`,
  `V-62-CHAIN-60`, `V-62-CHAIN-61` (subprocess calls to `check-phase-48/60/61.mjs`, each independently
  broken) and `V-62-AUDIT` (subprocess call to `v1.6-milestone-audit.mjs`, which fails its OWN C2 check
  against `docs/_glossary-android.md` at live HEAD — the SAME HYG-02 `-1` line-shift root cause as
  128-02's `v1.17-audit-allowlist.json` fix, but on the OLDER, frozen `v1.6-audit-allowlist.json` sidecar).
- **Why not fixed:** SCOPE BOUNDARY — proven pre-existing via `git show HEAD:scripts/validation/check-phase-62.mjs`
  run standalone before this plan's edit landed: identical 30 PASS / 4 FAIL, byte-identical FAIL-line set
  (confirmed via `diff`). This plan's own converted check (`V-62-06..09`) PASSES in both runs. Fixing
  `check-phase-48/60/61.mjs`, `regenerate-supervision-pins.mjs --self-test`, or `v1.6-milestone-audit.mjs`
  is out of D-128-C's mandate (convert ONLY the 8 named validators' own reads, not their transitive
  subprocess chain or a different milestone's frozen harness/sidecar).
- **Files touched:** none (documentation only)
- **Logged to:** `.planning/phases/128-v116-pin-15th-path-a-lineage-bump-terminal-close/deferred-items.md`

## Issues Encountered

None beyond the SCOPE BOUNDARY item above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- 128-04 (Atom 2b, per the objective's framing) can proceed: `readAtV116Close` exists and is proven working
  (7/8 converted validators exit 0 cleanly; the 8th's own converted check passes)
- The Wave-0 anchor (`f0e1f1632d708160cd7148f0ec91b0411fbee48d`, from 128-01) and Atom 1 (`fac3bc2`, from
  128-02) remain the base for 128-05's predecessor-byte-unchanged HARD gate; Atom 2a (`066a906`) is the
  latest commit in that lineage
- No push has occurred (per instructions — push happens in 128-04 alongside Atom 2b so both Atom-2 commits
  fire the CI `paths:` trigger together)
- `deferred-items.md`'s DEFER-128-03-A observation should be folded into `v1.17-DEFERRED-CLEANUP.md` at the
  close-gate (mirrors how prior milestones carry forward `FROZEN-AWARE-ADOPTION-SWEEP-01`-adjacent findings)

---
*Phase: 128-v116-pin-15th-path-a-lineage-bump-terminal-close*
*Completed: 2026-07-11*

## Self-Check: PASSED

- FOUND: `.planning/phases/128-v116-pin-15th-path-a-lineage-bump-terminal-close/128-03-SUMMARY.md`
- FOUND: `.planning/phases/128-v116-pin-15th-path-a-lineage-bump-terminal-close/deferred-items.md`
- FOUND: commit `066a906` in `git log --oneline --all`
- FOUND: `readAtV116Close` present in `scripts/validation/_lib/frozen-at-close.mjs`
- No unexpected file deletions in the Atom-2a commit (confirmed via `git diff --diff-filter=D`)
