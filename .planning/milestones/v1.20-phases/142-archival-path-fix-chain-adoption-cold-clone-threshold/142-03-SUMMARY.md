---
phase: 142-archival-path-fix-chain-adoption-cold-clone-threshold
plan: 03
subsystem: testing
tags: [ci-validator, node-esm, regex, vacuous-assertion-repair, gov-02-ledger]

# Dependency graph
requires:
  - phase: 142-01
    provides: SC-amendment commits extending RED-04's scope to cover V-30-02 (D-35) and correcting the [48..138]->[48..143] span
  - phase: 142-02
    provides: CARVE amendment authorizing check-phase-138.mjs edits (not consumed by this plan; prerequisite for Plan 05)
provides:
  - check-phase-30.mjs exits 0 standalone (RED-04 satisfied)
  - Three genuinely non-vacuous successor assertions (V-30-01 table-shape check, V-30-02 regex-literal repair, V-30-10 line-anchored comment-enum check)
  - isMissing classifier repaired for ubuntu-latest npm text (D-13), both call sites in this file
  - GOV-02 ledger row for check-phase-30.mjs (grep-before-edit + regression baselines + post-edit confirmation)
affects: [142-04, 142-05, 142-06]

# Actuals (#2632)
actuals:
  tokens: 4825
  tasks: 3
  commits: 3

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Regex literal over string-constructed RegExp() to avoid JS double-quoted-string escape collapse"
    - "Line-anchored author-guidance-comment assertion instead of frontmatter/whole-file substring test"
    - "Markdown table row-count scoped between a heading and the next heading, minus header+separator rows"

key-files:
  created: []
  modified:
    - scripts/validation/check-phase-30.mjs
    - .planning/milestones/v1.20-GOV-02-LEDGER.md

key-decisions:
  - "V-30-01's row-count leg carries the anti-vacuity weight; the token-count leg alone would pass with the entire Routing Verification table deleted (D-04)"
  - "V-30-10's root cause is 600eabd6 (Phase 40-01, v1.4 Android enum addition), not the later Phase 114 D-07 usually blamed (D-06)"
  - "V-30-02 fix paired with the SC#1 amendment already landed in 142-01, not a bare bug fix (D-35)"
  - "isMissing classifier gets exactly one new arm (npm's observed ubuntu-latest text); neither --yes nor --no-install flag removed from either spawn (D-13, T-142-07-T)"

requirements-completed: [RED-04]

coverage:
  - id: D1
    description: "check-phase-30.mjs exits 0 standalone (12 passed, 0 failed, 1 skipped) via three genuinely repaired assertions, not a corpus edit"
    requirement: "RED-04"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-30.mjs -- Summary: 12 passed, 0 failed, 1 skipped, exit 0"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-30.mjs --verbose -- V-30-01 detail: LOCKED=true IOS-tokens=true table-rows=9 (nonzero, non-vacuous)"
        status: pass
      - kind: other
        ref: "grep -c \"new RegExp\" scripts/validation/check-phase-30.mjs -- returns 1 (deferred filename regex only)"
        status: pass
    human_judgment: false
  - id: D2
    description: "RED-07 regression guard and GOV-01 carve-gate stay green after the edit; zero docs/ changes"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-68.mjs -- Result: 33 PASS, 0 FAIL, 0 SKIPPED, exit 0"
        status: pass
      - kind: other
        ref: "node scripts/validation/carve-gate.mjs -- 45 in-scope, 45 on-list, 0 off-list, exit 0"
        status: pass
      - kind: other
        ref: "git status --porcelain docs/ -- empty"
        status: pass
    human_judgment: false
  - id: D3
    description: "GOV-02 ledger row appended for check-phase-30.mjs with target-scoped + symbol-scoped grep, hit classification, and pre/post-edit regression baselines"
    verification:
      - kind: other
        ref: "tail -1 .planning/milestones/v1.20-GOV-02-LEDGER.md -- names check-phase-30.mjs, ends with | 03 |"
        status: pass
    human_judgment: false

duration: 25min
completed: 2026-08-10
status: complete
---

# Phase 142 Plan 03: RED-04 Validator Repair (check-phase-30.mjs) Summary

**Repaired three vacuous/superseded assertions in check-phase-30.mjs (Mermaid-diamond count, `[sS]` double-escape regex bug, pre-Android platform enum) with genuinely-failable successors, and fixed the npm `isMissing` classifier for `ubuntu-latest` — zero corpus edits, check-phase-30.mjs now exits 0 standalone.**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-08-10T18:47:00Z
- **Completed:** 2026-08-10T18:55:31Z
- **Tasks:** 3
- **Files modified:** 2

## Accomplishments
- GOV-02 target-scoped + symbol-scoped grep run and recorded BEFORE any source edit (19 hits, all provenance comments, none a `String.includes()` pin — no frozen call-site conflict)
- V-30-02's `[sS]` double-quoted-string regex bug fixed with a regex literal — the check has never inspected a real Mermaid block since Phase 30; it now genuinely can fail
- V-30-01 rewritten from a vacuous Mermaid-diamond count (always 0 since Phase 122's STD-04 text-table conversion) to a structural assertion on the Routing Verification table itself (>=3 rows, IOS1/IOS2/IOS3 tokens, the file's own LOCKED literal) — the row-count leg is the anti-vacuity leg; verified 9 rows live
- V-30-10 rewritten from a dead whole-file substring test (broken by Android's addition to the platform enum at `600eabd6`, Phase 40-01) to a line-anchored author-guidance-comment assertion, identical regex to what Plan 04 will apply to `check-phase-31.mjs`'s V-31-25
- `isMissing` classifier repaired at both external-tool call sites in this file with the npm text actually observed on `ubuntu-latest` (`"npm error npx canceled due to missing packages and no YES option"`), without removing either `--yes` or `--no-install` flag
- `check-phase-30.mjs` flips from 10 passed/2 failed/1 skipped (exit 1) to 12 passed/0 failed/1 skipped (exit 0)
- `check-phase-68.mjs` (RED-07 regression guard) and `carve-gate.mjs` (GOV-01 gate) both confirmed green before and after; `check-phase-138.mjs` apex confirmed unchanged (93/0/0) — chain adoption is Plan 05's scope, not this plan's

## Task Commits

Each task was committed atomically:

1. **Task 1: GOV-02 target-scoped grep and ledger row, before any edit** - `17850471` (docs)
2. **Task 2: Repair V-30-02's regular-expression construction** - `513ffc1b` (fix)
3. **Task 3: Rewrite V-30-01 and V-30-10, extend the external-tool classifier, commit** - `c0a2b2af` (fix)

_No plan-metadata commit yet — final metadata commit follows after STATE.md/ROADMAP.md updates._

## Files Created/Modified
- `scripts/validation/check-phase-30.mjs` — V-30-02 regex literal, V-30-01/V-30-10 successor bodies + `name` strings, `isMissing` classifier arm x2
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` — one appended row (Plan 03), grep-before-edit + pre/post-edit regression baselines

## Decisions Made
- Scoped the V-30-01 row-count regex to the section between the `## Routing Verification` heading and the next `## ` heading, then subtracted 2 for header+separator rows — verified against the live table (9 data rows, no embedded pipe characters in cell content today) rather than transcribing RESEARCH.md's illustrative form verbatim, per D-37's "verify refutations as hard as claims" discipline
- Kept the IOS1/IOS2/IOS3 token check as a whole-file `.includes()` test (matching the tokens' actual location in the file's prose at lines 33/37, not inside table cells) — the table row-count is what makes the assertion non-vacuous, per D-04
- Wrote the ledger row in two stages within the same plan: Task 1 recorded pre-edit grep/baselines only (no source edit yet, satisfying the acceptance criterion that `git diff --stat scripts/` prints nothing at Task 1's end); Task 3 then extended that same row with post-edit confirmation and committed it together with the source edit, per D-19's "commit the source edit and the ledger row together"

## Deviations from Plan

None — plan executed exactly as written. All acceptance criteria in Tasks 1-3 were met without needing Rule 1-4 fixes.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- RED-04 is satisfied: `check-phase-30.mjs` exits 0 standalone with genuinely-failable assertions (not permanently-true-by-construction pins)
- Plan 04 (RED-05, `check-phase-31.mjs`) can proceed independently — this plan touched only `check-phase-30.mjs` and the GOV-02 ledger
- Plan 05 (RED-06 chain adoption via `CHAIN_EXTRA = [30, 31]`) is still correctly blocked until Plan 04 is also green (D-12) — this plan's apex check confirmed `check-phase-138.mjs` unchanged at 93/0/0
- No stubs, no skipped tests, no unrun `<verify>` steps to log to `.planning/WINDOWS.md`

---
*Phase: 142-archival-path-fix-chain-adoption-cold-clone-threshold*
*Completed: 2026-08-10*

## Self-Check: PASSED

All created/modified files confirmed present on disk; all three task commits (`17850471`, `513ffc1b`, `c0a2b2af`) confirmed present in git history.
