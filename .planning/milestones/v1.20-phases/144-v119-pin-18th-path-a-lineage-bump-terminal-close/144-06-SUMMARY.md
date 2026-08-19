---
phase: 144-v119-pin-18th-path-a-lineage-bump-terminal-close
plan: 06
subsystem: infra
tags: [path-a, milestone-audit, ci, validators, gov-02, pin-drift]

# Dependency graph
requires:
  - phase: 144-v119-pin-18th-path-a-lineage-bump-terminal-close (Plan 01)
    provides: CARVE Category 11 / Category 2 authorization for this plan's new scripts/validation/ paths
  - phase: 144-v119-pin-18th-path-a-lineage-bump-terminal-close (Plan 02)
    provides: the pre-conversion v1.19-milestone-audit.mjs source this plan copies forward, and the V119 back-anchor SHA the pin-drift adjudication is measured against
provides:
  - v1.20-milestone-audit.mjs — the 18th Path-A milestone-audit harness, C1-C17 inherited, reading its own corpus LIVE (no frozen reader — there is no V120 pin at this close)
  - v1.20-audit-allowlist.json — header-fields-only sidecar copy, all 59 line-pins carried forward byte-identical
  - BASELINE_24 in regenerate-supervision-pins.mjs, closing the forward reference BASELINE_23 named
  - the recorded pin-drift verdict (ZERO real drift, line-granular adjudication) in 144-EVIDENCE.md
affects: [144-07, 144-08]

# Actuals (#2632)
actuals:
  tokens: 26942
  tasks: 3
  commits: 4

# Tech tracking
tech-stack:
  added: []
  patterns: [path-a-lineage-copy, header-fields-only-sidecar-copy, line-granular-pin-drift-adjudication]

key-files:
  created:
    - scripts/validation/v1.20-milestone-audit.mjs
    - scripts/validation/v1.20-audit-allowlist.json
  modified:
    - scripts/validation/regenerate-supervision-pins.mjs
    - .planning/milestones/v1.20-GOV-02-LEDGER.md
    - .planning/phases/144-v119-pin-18th-path-a-lineage-bump-terminal-close/144-EVIDENCE.md

key-decisions:
  - "Copy source for the 18th harness is the v1.19 source BEFORE Plan 02's frozen-aware conversion (retrieved via `git show <commit>:scripts/validation/v1.19-milestone-audit.mjs` at the commit preceding Plan 02's conversion commit dba21d0b), not the post-conversion HEAD form -- copying the converted form forward would have made the v1.20 harness audit v1.19's frozen corpus instead of its own live one"
  - "Every hardcoded predecessor string re-derived in the new harness's 4 header lines (lineage sentence, source-of-truth doc path, sidecar allow-list description, usage line) plus the sidecar path literal in parseAllowlist() -- the check count (16; C8 was never defined) is stated as counted from the live checks array, not carried from any predecessor's header prose"
  - "The 'Frozen-predecessor reproducibility anchor: v1.6-milestone-audit.mjs pinned at Phase 66 close' header line and all check-body comments (C1-C17 descriptions, phase-origin citations) are carried byte-identical -- confirmed via the v1.17/v1.18/v1.19 harnesses that this line is a fixed historical anchor, not a per-generation string needing re-derivation"
  - "Sidecar built programmatically (JSON.parse + set 2 fields + JSON.stringify) rather than hand-edited, then verified via a node one-liner that the ONLY differing top-level keys between v1.19 and v1.20 sidecars are `generated` and `phase`"
  - "The rotting-external recursive-vs-naive trap measured directly on the sidecar this plan authored: a naive walk over only the 5 flat top-level arrays (skipping `c13_rotting_external` because it is an OBJECT, not itself an array) finds 16 distinct `docs/` files; recursing into `c13_rotting_external`'s 3 nested arrays (`ci_1_abm_urls`, `ci_2_vpp_location_token`, `ci_3_managed_apple_id`) and unioning with the flat-array set reaches the true 33"
  - "BASELINE_24 appended at the END of the existing baseline comment chain (after the Phase 141 BASELINE_9-refresh addendum, immediately before `const BASELINE_9 = [`), matching the file's own established chronological-append convention rather than inserting immediately after BASELINE_23's forward-reference line"
  - "Pin-drift adjudication in 144-EVIDENCE.md transcribes the already-measured figures from 144-CONTEXT.md D-17 (106 changed files, 33 sidecar-named docs files, candidate intersection 5 with 3 line-pinned, 21 hunks all 1:1 line-neutral) rather than re-deriving them, per the plan's explicit instruction"
  - "The pin generator's report-mode instrument is never cited as evidentiary proof anywhere in this plan's outputs -- confirmed by a literal grep for the flag string returning zero hits in both 144-EVIDENCE.md and the new harness"

patterns-established:
  - "Path-A generation copy: retrieve the PRE-conversion source of the predecessor harness via git history when the predecessor has since been frozen-aware-converted, so the new generation inherits the live-read mechanism rather than the frozen one"
  - "Sidecar header-fields-only copy verified by node-one-liner key-diff, not by eyeballing a JSON diff"

requirements-completed: []  # HARN-18's mechanism lands here; the requirement itself flips at Phase 144's single close-gate commit (D-24), not in this plan.

coverage:
  - id: D1
    description: "v1.20-milestone-audit.mjs exists, exits 0, reads live HEAD (zero createFrozenCorpusReader references), references only its own sidecar, and states a check count (16) counted from the live checks array"
    requirement: "HARN-18"
    verification:
      - kind: other
        ref: "node scripts/validation/v1.20-milestone-audit.mjs -> 16 passed, 0 failed, 0 skipped, exit 0; grep -c createFrozenCorpusReader -> 0; grep -c v1.20-audit-allowlist.json -> 2; grep -c v1.19-audit-allowlist.json -> 0"
        status: pass
    human_judgment: false
  - id: D2
    description: "v1.20-audit-allowlist.json is a header-fields-only copy of the v1.19 sidecar; the rotting-external section's recursive walk reports 33 distinct docs/ files against a naive 16"
    requirement: "HARN-18"
    verification:
      - kind: other
        ref: "node -e JSON.parse(...) exits 0; node one-liner key-diff -> ['generated','phase']; recursive-walk one-liner -> 33 vs naive 16"
        status: pass
    human_judgment: false
  - id: D3
    description: "BASELINE_24 appended to regenerate-supervision-pins.mjs with zero coordinate change; self-test and its Plan 04 consumer leaf both still exit 0"
    requirement: "HARN-18"
    verification:
      - kind: other
        ref: "grep -c BASELINE_24 -> 3; git diff HEAD~1 --numstat -> 19 0; node regenerate-supervision-pins.mjs --self-test -> Diff: identical, exit 0; node check-phase-141.mjs -> 6 PASS/0 FAIL/0 SKIPPED, exit 0"
        status: pass
    human_judgment: false
  - id: D4
    description: "Pin-drift verdict recorded in 144-EVIDENCE.md using the sidecar-intersection method, line-granular, transcribed not re-derived, with no report-mode citation"
    requirement: "HARN-18"
    verification:
      - kind: other
        ref: "144-EVIDENCE.md Plan 06 Task 3 section: 106/33/5(3 line-pinned)/21 hunks all line-neutral -> ZERO real drift; grep -c -- '--report' 144-EVIDENCE.md and v1.20-milestone-audit.mjs both -> 0"
        status: pass
    human_judgment: false

duration: ~5min
completed: 2026-08-13
status: complete
---

# Phase 144 Plan 06: 18th Path-A Lineage Bump + BASELINE_24 Summary

**Landed `v1.20-milestone-audit.mjs` (the 18th Path-A harness, copied from v1.19's pre-conversion live-read source, C1-C17 inherited, 16 checks) with its header-fields-only sidecar `v1.20-audit-allowlist.json`, appended `BASELINE_24` to the pin-regeneration helper, and recorded the pin-drift adjudication (ZERO real drift, line-granular) in the phase evidence ledger — the target `check-phase-144.mjs`'s AUDIT-HARNESS check and the 17th CI workflow's path-match job now have a real, internally-consistent artifact to point at.**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-08-13T00:32:48-05:00 (first commit)
- **Completed:** 2026-08-13T00:37:42-05:00 (last commit)
- **Tasks:** 3
- **Files modified:** 5 (2 created, 3 modified)

## Accomplishments
- Recorded a GOV-02 pre-edit census for the pin-regeneration helper (the one frozen surface this plan edits), confirming no external call site pins a `BASELINE_NN` symbol this plan's append would disturb, and ruled the plan's two new files exempt from census as creations, not frozen-surface edits
- Authored `scripts/validation/v1.20-audit-allowlist.json` as a header-fields-only copy of the v1.19 sidecar — verified programmatically that `generated` and `phase` are the ONLY differing top-level keys, and that a recursive walk of the `c13_rotting_external` object (an object of nested arrays, not a flat list) reports 33 distinct `docs/` files against the naive top-level-arrays-only count of 16
- Authored `scripts/validation/v1.20-milestone-audit.mjs`, copying the sole remaining unconverted Path-A harness source forward from BEFORE its own Plan 02 frozen-aware conversion (retrieved via `git show`), so the 18th generation reads its own live corpus rather than v1.19's frozen one — re-derived the lineage sentence, source-of-truth doc path, sidecar-allowlist description, and usage line; left the historical `v1.6-milestone-audit.mjs pinned at Phase 66 close` anchor line and all C1-C17 check bodies byte-identical (they carry no per-generation strings)
- Confirmed the new harness runs identically to the pre-conversion v1.19 source: 16 passed, 0 failed, 0 skipped, exit 0, same check ids one-for-one, zero `createFrozenCorpusReader` references, sidecar path re-pointed with zero residual `v1.19-audit-allowlist.json` literals
- Appended `BASELINE_24` to `regenerate-supervision-pins.mjs` at the end of the existing baseline comment chain (following BASELINE_23's exact shape: refresh date, requirement citation, JIT pre-edit HEAD SHA, Path-A chain pointer), zero coordinate change to the `BASELINE_9` array — self-test still reports `Diff: identical`/`PASS`, and the Plan 04 leaf (`check-phase-141.mjs`) that spawns it as `V-141-PINSELFTEST` still reports 6 PASS/0 FAIL/0 SKIPPED
- Recorded the pin-drift adjudication in `144-EVIDENCE.md` using the sidecar-intersection method (not the pin generator's report-mode instrument, which hardcodes the v1.7 sidecar and covers only 26 of 59 pins): the already-measured figures (106 changed files, 33 sidecar-named docs files, candidate intersection 5 with 3 line-pinned, all 21 hunks 1:1 line-neutral under a zero-context diff) transcribed verbatim, verdict ZERO real drift, adjudicated line-granular not merely file-granular

## Task Commits

Each task was committed atomically:

1. **Task 1a: GOV-02 census row for the pin-regeneration helper** - `441a725b` (docs)
2. **Task 1b: v1.20-audit-allowlist.json, header-fields-only copy** - `c2c2155c` (feat)
3. **Task 2: v1.20-milestone-audit.mjs, the 18th Path-A harness** - `785d9c67` (feat)
4. **Task 3: BASELINE_24 append + pin-drift adjudication** - `c05c26ae` (feat)

_Note: no plan-metadata commit yet — this executor's final metadata commit (SUMMARY + STATE + ROADMAP) follows separately._

## Files Created/Modified
- `scripts/validation/v1.20-milestone-audit.mjs` - the 18th Path-A milestone-audit harness, 16 checks, live-HEAD corpus reads
- `scripts/validation/v1.20-audit-allowlist.json` - header-fields-only sidecar copy, 59 line-pins carried byte-identical
- `scripts/validation/regenerate-supervision-pins.mjs` - `BASELINE_24` comment block appended, zero coordinate change
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` - one row appended: the pre-edit census for the pin-regeneration helper
- `.planning/phases/144-v119-pin-18th-path-a-lineage-bump-terminal-close/144-EVIDENCE.md` - Plan 06 Task 3 section: pin-drift adjudication + self-test regression gate table

## Decisions Made
- Retrieved the copy source via `git show dba21d0b~1:scripts/validation/v1.19-milestone-audit.mjs` (the commit immediately preceding Plan 02's conversion) rather than any earlier commit in the file's history, since that is the exact pre-conversion state the plan specifies
- Built the sidecar programmatically (parse → mutate two fields → stringify) rather than hand-editing the copied JSON, eliminating manual-copy transcription risk across 59 line-pins
- Placed `BASELINE_24` at the chronological end of the comment chain (after the Phase 141 addendum) rather than immediately after `BASELINE_23`'s own forward-reference line, matching the file's own established append order (each milestone's block landed after the previous milestone's PLUS any intervening non-milestone-close comment, exactly the shape the Phase 141 BASELINE_9-refresh addendum already demonstrates)
- Omitted a self-referential "grep the evidentiary section for the report-mode flag" verification paragraph from `144-EVIDENCE.md` after recognizing it would itself introduce a literal `--report` string, contradicting the plan's own prohibition — replaced with a direct, flag-string-free record of the sidecar-intersection method instead

## Deviations from Plan

None — plan executed exactly as written. One self-correction during drafting (see Decisions Made: the evidentiary-citation paragraph) was caught and fixed before commit, not left as a deviation to document.

## Issues Encountered
None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- `scripts/validation/v1.20-milestone-audit.mjs` and its sidecar exist, are internally consistent, and are pre-authorized by CARVE Category 2 (`v*.*-milestone-audit.mjs` glob) and Category 11 — Plan 07's apex `check-phase-144.mjs` AUDIT-HARNESS check has a real target to point at (absent would have been a hard FAIL per D-13, not a skip)
- `BASELINE_24` closes the forward reference the pin-regeneration helper already named at `:531-532`, ready for Plan 08's 17th CI workflow to reference in its `path-match` job literal
- Pin-drift is adjudicated and recorded (ZERO real drift) — Plan 07/08 do not need to re-run this measurement
- `carve-gate.mjs` reports 114 in-scope, 114 on-list, 0 off-list at HEAD — every path this plan created or edited is authorized
- No blockers for Plan 07

---
*Phase: 144-v119-pin-18th-path-a-lineage-bump-terminal-close*
*Completed: 2026-08-13*

## Self-Check: PASSED

All created/modified files and all four task commits verified present.
