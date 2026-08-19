# Phase 141: Standalone-RED Validator Set — Chain Members Green - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-07
**Phase:** 141-standalone-red-validator-set-chain-members-green
**Areas discussed:** RED-02 fix shape, SWEEP-09 scope, Phase scope (timeouts / `if: always()` / CI fan-out), Document amendments

**Method:** Owner directed `/grill-me` codebase interrogation followed by `/adversarial-review`
(5 parallel Finders → Adversary → Referee), with each option scored and a best option
recommended with reasoning. 70 findings raised (525 Finder points); Adversary disproved 3
(scoring +16); Referee confirmed 67.

---

## Area selection

All four areas the orchestrator surfaced were selected, plus an explicit instruction to run
`/grill-me` and `/adversarial-review` over each. Two further forks were **discovered by the
review** and added: the carried-in `if: always()` deferred item, and the CI fan-out.

---

## RED-02 fix shape

| Option | Description | Selected |
|--------|-------------|----------|
| Rebase BASELINE_9 + amend SC#2 | Fix the stale data, `classify()` byte-unchanged, owner-ratified `[SUCCESS-CRITERION AMENDMENT]` to SC#2 (D-24 precedent) | ✓ |
| Rebase BASELINE_9, no amendment | Same code fix, treat SC#2 as descriptive; closes RED-02 by a mechanism its SC does not name | |
| Classifier window change as written | Honour SC#2 literally; reverses Phase 48 D-14's accepted Tier-2 verdict and leaves BASELINE_9 re-rotting | |
| Both: rebase AND window fix | Referee ruled strictly worse than rebase-only — takes the reversal and the zeroed Tier-2 arm for no benefit | |

**User's choice:** Rebase BASELINE_9 + amend SC#2.

**Notes:** The orchestrator's original draft recommended a classifier window variant ("F",
heading-aware +2) and was **reversed outright**. The Finder found that all 9 BASELINE_9
coordinates are dead; the Adversary attacked it with a live rebase experiment expecting it to
fold and reproduced a PASS exactly; the Referee reproduced it a third time; the orchestrator
verified 9/9 dead independently. The draft's variant-comparison table was also found to rest on
two figures measured against the wrong corpus (369 occurrences / 16 heading lines across all of
`docs/`, when the classifier scans only 32 Android paths / 26 lines / **1** heading) — meaning
all six variants are behaviourally identical and the stated differentiator did not exist.
Project memory `reference_check_phase_61_red_at_head` had already named the un-rebased
BASELINE_9 as a root cause.

---

## SWEEP-09 scope

| Option | Description | Selected |
|--------|-------------|----------|
| 61/68/70 in 141; CARVE-amend 67, defer its edits to 144 | Land the requirement's own named site plus the two Category-5 on-list files; 67 gets its amendment now, edits at 144 | ✓ |
| All 19 sites in 141 | Includes `check-phase-67`; needs the CARVE amendment first and risks the live `check-phase-73`/`-74` line-range pins | |
| Only check-phase-61 in 141 | The literal minimum; leaves 18 sites incl. the worse silent-pass class | |
| Escalate the whole re-scope separately | Record the census, amend the text, ratify the edit scope before any code change | |

**User's choice:** 61/68/70 in 141; CARVE-amend 67, defer its edits to 144.

**Notes:** The draft had recommended re-scoping SWEEP-09 on the grounds that its intersection
with RED-03 was empty. The review found this false: the draft had silently substituted the
requirement's unit (reader *sites* → vacuous-pass *consumer guards*), and on the requirement's
own unit `check-phase-61.mjs:39-43` is in scope and is named explicitly by the requirement text.
"Cannot be fixed at the library root" was also inverted — it instructs an in-place fix, not a
discharge. Census corrected from 15 to 19 sites; `check-phase-67` found to be absent from the
CARVE allowlist entirely (the draft had claimed 67/68/70 were all off-list, when 68 and 70 are
on-list and only 67 is not); and an uncounted, worse class found in `check-phase-67` —
partial-null passes that return `pass:true` with no `skipped` marker.

---

## Phase scope — timeouts, `if: always()`, CI fan-out

| Option | Description | Selected |
|--------|-------------|----------|
| Raise the two timeouts | `check-phase-66:318` above 300000 and the 67/68/69/70 CI `timeout-minutes` | ✓ |
| `if: always()` on fanned-out jobs | The twice-deferred item explicitly assigned to Phase 141 | ✓ |
| First CI fan-out run + in-phase triage | Push + dispatch, triage the 19 newly-unblocked jobs in-phase | ✓ |
| Defer all three to Phase 144 | Keeps 141 to RED-01/02/03 + SWEEP-09 only | |

**User's choice:** All three in scope for Phase 141 (multi-select).

**Notes:** The draft had declared Area 1 "dissolved" and stated there was no timeout root-cause
class. The review falsified this twice: `check-phase-66:318` spawns a ~305s child under a 300s
cap, and `audit-harness-v1.7-integrity.yml` runs `check-phase-67` (which expands through 66)
under a PR-blocking `timeout-minutes: 15` against a ~15.2 min floor. The draft's belief that
raising the cap was barred by V-68-11 was also wrong — V-68-11 tests substring *presence* and
`check-phase-66` carries the literal twice. The `if: always()` item had been carried 139 → 140 →
141 and the draft omitted it entirely.

---

## Document amendments

| Option | Description | Selected |
|--------|-------------|----------|
| Six statements, in-line markers, annotate-not-overwrite | ROADMAP SC#2 + SC#4 amended; REQUIREMENTS figures annotated; SWEEP-09 census corrected; STATE.md hygiene; SC#1 struck | ✓ |
| Only SC#2 | Amend just the statement blocking the fix | |
| All of it including SC#1 | The draft's original four plus the two the review found | |

**User's choice:** Six statements, in-line amendment markers, annotate-not-overwrite.

**Notes:** The draft had proposed the D-09 CARVE instrument; the review established that D-09
governs the allowlist, that `.planning/` sits outside the carve-gate's `IN_SCOPE_PREFIXES`
entirely (so the hazard the draft cited cannot fire), and that D-09 rule 1 actually *bars* the
proposed commit shape. The established instrument is the in-line
`[SUCCESS-CRITERION AMENDMENT, D-NN]` marker, precedent D-24. The review also struck one of the
draft's four statements (ROADMAP SC#1 is satisfied, not falsified — amending it would delete the
record that the ratified 140→141 ordering was correct) and added two the draft had missed
(ROADMAP SC#2, and STATE.md's omission of SWEEP-09 from the Phase-141 requirement block).

---

## Claude's Discretion

- Plan/atom decomposition and commit ordering, subject to amendment-first, `if: always()`-before-fan-out, and CARVE-amendment-before-144 sequencing
- Rebased `BASELINE_9` comment wording and the new dated audit-trail line
- Whether `readAtV15CloseFor61`'s library routing is a wrapper or a direct replacement
- Precise `timeout` / `timeout-minutes` values
- Sweep-script shape and evidence-artifact format

## Deferred Ideas

- `check-phase-67.mjs`'s 7 chicken-and-egg guards + 3 partial-null silent passes → Phase 144
- The 18 false audit-trail comments above `BASELINE_9`/`10`/`11` → recorded, needs its own requirement
- Synthetic negative fixture for the Tier-2 arm → backlog; premise evaporates under the chosen fix
- The unowned standalone-chain cost (NEST-01 covers only the apex curve) → raise at Phase 142 discuss
- `check-phase-64` as the next 300000 ms crossing candidate → Phase 142
- `audit-harness-v1.7-integrity.yml:95`'s stale `~102s` reference → Phase 144 hygiene
- Class (d) content drift in `check-phase-30`/`-31` → Phase 142 (RED-04/05)
