# Phase 161 — Evidence Record

This file is the shared evidence record all four plans in Phase 161 append to (D-57). It is a
`files_modified` entry in every plan's frontmatter, which is what makes the phase's sequential
depends-on chain a real shared-file dependency rather than reflexive chaining (D-35). 161-01
creates the first two task-headed sections below; 161-02, 161-03 and 161-04 append their own.

## Task 1 (161-01): Gate baseline

Full figures recorded in `161-GATE-BASELINE.json` (single `phase_baseline` snapshot, sha
`fa951b90`). Summary below; see the JSON for every `invocation` string.

**Structural gate — six validators, all green pre-edit:**

| Validator | Result | Wall-clock |
|---|---|---|
| `check-phase-54.mjs` | Summary: 32 passed, 0 failed, 0 skipped | — |
| `c17-eee-contract.mjs` | 237 files checked, 0 with violations, 0 total (all 13 assertions at 0) | — |
| `check-nav-hub-links.mjs` | 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total | — |
| `check-phase-155.mjs` | 10 PASS, 0 FAIL, 0 SKIPPED | — |
| `check-phase-156.mjs` | 10 PASS, 0 FAIL, 0 SKIPPED (also the V-156-ADMIN-4 reading: `administrator`=10 on RE-237) | — |
| apex `check-phase-159.mjs` | 117 PASS, 0 FAIL, 0 SKIPPED (un-nested) | 124s |

**Environment probes:** `claude auth status` → `loggedIn: true`. `claude -p` one-word PONG probe →
round trip returned `PONG`. Root `npm test` → fails immediately (`'vitest' is not recognized`,
frontend deps not installed); this is the pre-existing baseline `161-RESEARCH.md` records, a
**compare-not-count** anchor — the identical failure before and after this wave is the no-drift
signal, never a pass requirement. `git status --porcelain` shows `.planning/STATE.md` modified
(session tracking) plus two pre-existing untracked paths, `.claude/skills/fireworks-tech-graph/`
and `.planning/milestone.lock`, both out of scope for this phase.

**Style instruments — recorded as reports, never thresholds:**

`check.py --no-headings` on RE-237 → 93 candidates (report-only; the finished corpus carries
thousands). `sweep3.py` run PER DIRECTORY: `docs/recipes` → 0 TOTAL edits, 563 pins loaded, nonzero
protected counts (291 table row, 29 validator-pinned string, 1 cited verbatim quotation) proving a
genuine scan occurred; `docs/reference` → 0 TOTAL edits, protected counts 848 table row, 3 heading
line, 2 UI label line. Both sweep3 blind spots restated here: it skips every line starting with the
pipe character, so it can never see a table cell, and it sets the em-dash rule off unconditionally,
so D-28's tight-em-dash requirement for new `docs/` strings has no instrument at all — that check is
a hand ruling deferred to 161-04 Task 6.

**Pin residency (RE-237, seven rows, three are 161's delta over 160's baseline):** `Ask the admin:`
callouts = 5; `What breaks if misconfigured:` callouts = 9; `administrator` = 10; `ruled
2026-09-10` = 1 (161 delta); `Deploy-WindowsApp.ps1` = 4 (161 delta); ASCII ` -- ` = 0 (161 delta,
confirming tight em dash U+2014 is the only long-dash idiom in this file); contiguous `>` blockquote
runs = 27, max joined run length = 197 chars (under the C17 #12 200-char cap).

**Line endings** recorded for the four files this phase edits (RE-237, NOTICE, the PSADT functions
file, the Baseline README) — all four are LF-only and end with a newline. The `pending` sub-object
carries `git check-attr -a` readings for the two not-yet-existing vendored paths
(`Files/RemoveBloat.ps1`, `Files/LICENSE.GPL-3.0.txt`): both read `text: auto` and `eol: lf`, making
D-06's "the eol rule is a no-op on these LF files" claim a reading rather than an assumption.

`test ! -e scripts/validation/check-phase-161.mjs` succeeds — no leaf validator was authored in this
phase; Phase 167 owns that leaf under HARN-04.

## Task 2 (161-01): Amendment landing

**`check-phase-54.mjs` gate bracket, both readings recorded verbatim:**

- Immediately before the first `Edit`: `Summary: 32 passed, 0 failed, 0 skipped`
- Immediately after the fourth `Edit`: `Summary: 32 passed, 0 failed, 0 skipped`

No drop occurred; the four appends did not break a live-read assertion.

**Four antecedent confirmations (`grep -cF`, each 1 in its owning file and 0 in the other):**

| Antecedent | ROADMAP.md | REQUIREMENTS.md |
|---|---|---|
| E-A1 — "the script carries the same Authenticode signing chain as the rest of the Baseline package" | 1 | 0 |
| E-A2 — "re-signed with the same Authenticode chain the Baseline package already uses" | 0 | 1 |
| E-A3 — "a pilot-device run's second-boot block-sensor reading is recorded as `[PILOT]`" | 1 | 0 |
| E-A4 — "the change is exercised once on the pilot device with the second-boot block-sensor reading recorded as `[PILOT]`" | 0 | 1 |

Confirms the ROADMAP pair and the REQUIREMENTS pair are not interchangeable: each amendment quotes
only text its own file actually contains.

**Amendment-marker and placeholder counts:** `SUCCESS-CRITERION AMENDMENT` = 3 in `ROADMAP.md` and 3
in `REQUIREMENTS.md` (one pre-existing plus two added in each). Unsubstituted `D-NN` placeholder
count across both files = 0.

**VND anchor greps (all three bullets still unchecked and start-anchored):**
`^- \[ \] \*\*VND-0[23]\*\*:` on `REQUIREMENTS.md` = 2. `^- \[ \] \*\*VND-01\*\*:` = 1. No
`requirements.mark-complete` invocation of any kind appears anywhere in this plan's transcript or
its commits — `VND-02` and `VND-03` remain unchecked precisely because this plan declares
`requirements: []`.

**`roadmap.get-phase 161`:** returns `found: true` with exactly 3 `success_criteria`; criteria 2 and
3 each carry their amendment inline.

**Landing commit:** `e7a9792a` — `docs(161-01): amend Phase 161 SC2/SC3 and VND-02/VND-03 for the
signing and pilot clauses`.

**PART G needle rows re-measured at this plan's own landing commit** (each plan re-measures its own
needles rather than deferring all nine to 161-04, D-45):

| # | Needle | Value at `e7a9792a` |
|---|---|---|
| 36 | `SUCCESS-CRITERION AMENDMENT` count, ROADMAP | 3 |
| 37 | `SUCCESS-CRITERION AMENDMENT` count, REQUIREMENTS | 3 |
| 38 | `D-NN` placeholder count, both files | 0 |

**D-27 label precedent:** `D-27` is already a live amendment label in three archived milestone files
(carried decision-ledger references from earlier milestones); this is the norm here too, because
each new string names Phase 161 explicitly and cannot be confused with an earlier milestone's use of
the same decision-label shorthand.

**D-41 — corroboration, not load-bearing:** E-A1's and E-A2's ground is the ruling (Phase 161
pilot-checkpoint scoping), not a measurement. The signature-block reading
`grep -rlF '# SIG # Begin signature block' assets/` is corroboration only: it returned no match
(exit 1, zero files) at this plan's landing commit — true before 161-02 lands the vendored bytes,
and PART G row 9/10 record it will name exactly the vendored script and no EEE-authored file
afterward. No validator guards that reading and none is added here; it is re-measured, not cited as
a gate.

---

*Sections 3 through 9 are owned by 161-02, 161-03 and 161-04. `## Needle list handed to Phase 167
(HARN-04)` lands inside section 9 (D-42, D-57). No empty headings are pre-created for them here —
each later plan creating its own section is what makes the shared-file dependency real (D-35).*
