---
phase: 141-standalone-red-validator-set-chain-members-green
plan: 01
subsystem: infra
tags: [governance, carve, gov-02, roadmap, requirements, state, documentation]

# Dependency graph
requires:
  - phase: 140-frozen-aware-harness-conversion
    provides: RED-01's discharge (nine harnesses frozen-aware, zero glossary edits) — this
      plan's SC#1 DISCHARGED annotation records that fact
provides:
  - ROADMAP.md Phase 141 SC#1/SC#2/SC#4 amended and Discuss-phase flags corrected
  - REQUIREMENTS.md SWEEP-09 amended to the reader-site census; "Ordering, corrected"
    annotated with a dated re-measurement
  - STATE.md's six stale locations corrected (27/27 -> 28/28, SWEEP-09 added to the
    Phase-141 row + dependency diagram)
  - scripts/validation/check-phase-67.mjs added to the CARVE Category 5 allowlist
  - One GOV-02 ledger row for the governance-doc edit
affects: [141-02, 141-03, 141-04, 141-05, 141-06, 144-harn-close]

# Actuals (#2632)
actuals:
  tokens: 11300
  tasks: 2
  commits: 2

tech-stack:
  added: []
  patterns:
    - "[SUCCESS-CRITERION AMENDMENT, D-NN] in-line bracket marker for annotate-and-supersede
       amendments to ratified ROADMAP/REQUIREMENTS success criteria"
    - "D-09 CARVE amendment commit: single-file, rationale comment above the added glob,
       lands before the edit it authorizes"

key-files:
  created: []
  modified:
    - .planning/ROADMAP.md
    - .planning/REQUIREMENTS.md
    - .planning/STATE.md
    - .planning/milestones/v1.20-GOV-02-LEDGER.md
    - .planning/milestones/v1.20-CARVE.md

key-decisions:
  - "Applied the established [SUCCESS-CRITERION AMENDMENT, D-28] bracket marker to all four
     amended ROADMAP/REQUIREMENTS statements (SC#2, SC#4, SWEEP-09, Discuss-phase flags),
     annotating and superseding rather than deleting the original wording (D-27 discipline)."
  - "SC#1 marked [DISCHARGED, D-29] rather than amended-as-false — the criterion was satisfied,
     not falsified, and deleting the record would erase evidence the ratified ordering was
     correct."
  - "REQUIREMENTS.md's 'Ordering, corrected' paragraph left byte-unchanged; a new dated
     re-measurement line appended below it, since :8 stamps every [MEASURED] figure to HEAD
     347c20a8 and overwriting would destroy provenance."
  - "CARVE Category 5 header count corrected fifteen->sixteen after confirming zero grep hits
     on the literal phrase 'fifteen chain validators' across scripts/ and .github/ — no pin
     depends on that wording."

requirements-completed: []  # RED-01/02/03 and SWEEP-09 land fully across Plans 01-06; this
  # plan is the governance gate only — no requirement flips to Complete/Validated here (D-30).

coverage: []  # Governance/documentation gate — no UAT-testable deliverable; verified entirely
  # by the acceptance-criteria greps and the two live validator gates recorded below.

duration: ~15min
completed: 2026-08-08
status: complete
---

# Phase 141 Plan 01: Governance Gate — Six D-28 Document Amendments + D-09 CARVE Amendment Summary

**Six owner-ratified ROADMAP/REQUIREMENTS/STATE amendments landed alone as one `.planning/`-only
commit, then `check-phase-67.mjs` added to the CARVE allowlist as a second, single-file commit —
unblocking every downstream plan in this phase.**

## Performance

- **Duration:** ~15 min
- **Completed:** 2026-08-08T04:51:30Z
- **Tasks:** 2
- **Files modified:** 5 (4 in Task 1, 1 in Task 2)

## Accomplishments

- `ROADMAP.md` Phase 141 SC#2 no longer forecloses the correct RED-02 fix: the withdrawn
  classifier-context-window mechanism is superseded (preserved verbatim, marked) by the
  `BASELINE_9` rebase mechanism, with the four-way reproduction cited.
- `ROADMAP.md` Phase 141 SC#4 and `REQUIREMENTS.md` SWEEP-09 both carry the corrected
  19-reader-site census (not "~19 validators"), with the existing "SWEEP-03 fixes 4" clause
  and the `check-phase-61.mjs:39-45` explanatory note retained verbatim.
- `ROADMAP.md` Phase 141 SC#1 annotated `[DISCHARGED, D-29]` — satisfied, not falsified.
- `ROADMAP.md` Phase 141 "Discuss-phase flags" corrected to name the two live owner-ratified
  forks (RED-02 root cause, SWEEP-09 scope) instead of "None dominant."
- `REQUIREMENTS.md`'s "Ordering, corrected" paragraph annotated (not overwritten) with a new
  dated 2026-08-07 re-measurement line.
- `STATE.md`'s six stale locations corrected: current focus (Phase 140 -> 141), the Phase-141
  requirement row and dependency-diagram block (SWEEP-09 added, classifier-window mechanism
  replaced with the rebase mechanism), and every `27/27`/`27`/`all 27` corrected to `28`.
- `scripts/validation/check-phase-67.mjs` added to the CARVE Category 5 chain-validator
  allowlist via a single-file commit, with a rationale comment and the header count corrected
  fifteen->sixteen (zero grep hits on the old phrase confirmed first).

## Task Commits

Each task was committed atomically:

1. **Task 1: Six owner-ratified document amendments (D-27/D-28/D-29)** — `fc44815b` (docs)
2. **Task 2: CARVE D-09 amendment — allowlist check-phase-67.mjs** — `3bd2ded9` (docs)

_No plan-metadata commit yet — STATE.md/ROADMAP.md updates below land in the final commit._

## Files Created/Modified

- `.planning/ROADMAP.md` — Phase 141 SC#1/SC#2/SC#4 amended, Discuss-phase flags corrected
- `.planning/REQUIREMENTS.md` — SWEEP-09 amended, "Ordering, corrected" annotated
- `.planning/STATE.md` — six stale locations corrected (see Accomplishments)
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` — one row appended for the Task 1 edit
- `.planning/milestones/v1.20-CARVE.md` — `check-phase-67.mjs` added to Category 5

## Decisions Made

See `key-decisions` in frontmatter. In summary: annotate-and-supersede throughout (never
delete a ratified sentence or a `[MEASURED]` figure), `[DISCHARGED, D-29]` instead of
amending SC#1 as false, and the CARVE header word-count only corrected after a zero-hit grep
proved nothing pins the old wording.

## Deviations from Plan

None — plan executed exactly as written. Both tasks landed with the exact commit shapes and
file-touch scopes the plan specified (Task 1: four `.planning/` files, one commit; Task 2:
exactly one file, one commit).

## Issues Encountered

None.

## Verification

- `node scripts/validation/check-phase-54.mjs` (the sole LIVE reader of ROADMAP/REQUIREMENTS/
  STATE): **32 passed, 0 failed, 0 skipped, exit 0** — both before Task 1's edits (baseline)
  and after Task 1's commit (unchanged tally, confirming the six amendments + STATE hygiene
  fixes did not perturb any live assertion).
- `node scripts/validation/carve-gate.mjs`: **PASS, 39 in-scope, 39 on-list, 0 off-list, exit
  0** — run before Task 1, after Task 1, and after Task 2 (unchanged in-scope/on-list counts
  each time, since `.planning/` sits outside `IN_SCOPE_PREFIXES`, confirming D-27's premise
  that this instrument cannot self-authorize a `.planning/` edit).
- `git show --stat HEAD --name-only` after Task 1: exactly `.planning/ROADMAP.md`,
  `.planning/REQUIREMENTS.md`, `.planning/STATE.md`, `.planning/milestones/v1.20-GOV-02-LEDGER.md`
  — zero `scripts/`, `.github/`, or `docs/` paths.
- `git show --stat HEAD --name-only` after Task 2: exactly `.planning/milestones/v1.20-CARVE.md`
  — one file (D-09 rule 1).
- `git status --porcelain scripts/ .github/ docs/` immediately before Task 2's commit: **empty**
  (captured output, confirming the D-09 rule-1 precondition).
- `sed -n '/```carve-allowlist/,/```/p' .planning/milestones/v1.20-CARVE.md | grep -c
  "^scripts/validation/check-phase-67.mjs$"` → **1**.
- `grep -rn "fifteen chain validators" scripts/ .github/` → **0 hits** (checked before editing
  the header, per the plan's instruction) — Category 5 header now reads "sixteen."
- `git log --oneline -- scripts/validation/check-phase-67.mjs` shows only pre-v1.20 historical
  commits (Phases 70-112); none post-dates this amendment (D-09 rule 3 — the amendment lands
  before any edit it would authorize).
- `git diff HEAD~1 -- .planning/REQUIREMENTS.md | grep "^-" | grep -c "Ordering, corrected"` →
  **0** — the paragraph was annotated, not overwritten.
- `grep -c "SWEEP-03 fixes 4" .planning/REQUIREMENTS.md` → **1** — the clause the earlier draft
  dropped is retained.
- `git diff HEAD~1 -- .planning/milestones/v1.20-GOV-02-LEDGER.md | grep -c "^-"` → **1**, and
  that single line is the diff header (`--- a/...`), not a content removal — confirmed
  append-only, no existing row edited.
- `grep -c "27/27" .planning/STATE.md` → **0**; `grep -c "28/28" .planning/STATE.md` → **2**;
  `grep -c "all 27 v1.20 requirements" .planning/STATE.md` → **0**.
- No requirement anywhere reads `Validated` as a result of this task (D-30) — the sole
  `Validated` hit in the three governance files is pre-existing v1.19 close-record prose,
  unrelated to this plan's edits.

**GOV-02 ledger note (Task 2):** no ledger row was added for the CARVE amendment commit — per
the ledger's own discipline rule, `.planning/milestones/v1.20-CARVE.md` is a `.planning/` path,
outside `carve-gate.mjs`'s `IN_SCOPE_PREFIXES`, and no frozen surface was modified. This absence
is correct, not a missing-evidence gap.

## Next Phase Readiness

The governance gate is clear: `check-phase-67.mjs` is on the CARVE allowlist (unblocking Plan
04's `:261` timeout raise), the withdrawn classifier-context-window mechanism no longer
forecloses Plan 02's `BASELINE_9` rebase fix, and SWEEP-09 is present in every requirement count
downstream plans will check. No blockers for Plan 02 (the `BASELINE_9` rebase tracer).

---
*Phase: 141-standalone-red-validator-set-chain-members-green*
*Completed: 2026-08-08*
