# Phase 159: HARN — Harness Close - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-09-08
**Phase:** 159-harn-harness-close
**Areas discussed:** History mechanism & push choreography; HARN-03 depth & Path-A fork; Leaves 154–158, STD-02 gate, apex; Close-time hygiene & dispositions; Plan count & terminal chain; Occurrence-needle form; Pre-push guard & Axis-3 protocol; Hooks & Jira on master; Leaf needle literals; Amendment wording; Owner checkpoints; Close documents

**Method.** Each area was drafted with `/grill-me` (questions with a recommended answer and measured evidence), then reviewed by `/adversarial-review` (Finders → Adversary → Referee) before the owner ruled. Three rounds: round 1 (Areas 1–4) 101 findings, 8 false positives, 14 critical; round 2 (Areas 5–8) 55 findings, 2 false positives; round 3 (Areas 9–12) 46 findings, 8 false positives. Every option below marked (Recommended) was the referee-corrected recommendation; the owner took it in all 33 rulings. Three earlier rulings were amended by later rounds and are recorded in their final form in CONTEXT.md.

---

## Area 1 — History mechanism & push choreography

| Option | Description | Selected |
|--------|-------------|----------|
| commit-tree squash, first task on master | Zero-churn plumbing squash after the scrub; all 159 work on master | ✓ |
| Squash at the push checkpoint | Phase split across two branches | |
| Rewrite history at 9a114815 | 141 commits rewritten, audit range invalidated | |
| Archive ref + delete branch + pre-push hook | refs/archive/v1.22-landing; pushRemote guard disproved | ✓ |
| Keep the branch, hook only | | |
| Delete outright | | |
| Publish bundle after a general secret scan | | ✓ |
| git rm at HEAD / rewrite unpushed 11 | | |
| Push at owner checkpoint, corrective re-push next plan | v1.21's superseded shared commit | ✓ |
| Single push post-checkpoint / owner manual push | | |
| Follow what v1.21 actually did (record in MILESTONES/STATE/PROJECT/tag inside the archive commit) | First draft's precedent citation was false | ✓ |
| Pull archival into the last plan / tag the close-gate commit | | |
| Secure-phase after the close-gate, before archival | | ✓ |
| Scrub + annotate both 158 records, log it | | ✓ |
| Curated squash subject/body via -F | | ✓ |

**Notes:** the draft's `pushRemote=no_push` guard, its `git checkout && merge --squash` mechanism, and its Q1.9 precedent were all overturned by the review.

## Area 2 — HARN-03 depth & Path-A fork

| Option | Description | Selected |
|--------|-------------|----------|
| A0 with the four carried decisions | Own plan for the pin; D-31 re-amendment; live guards; end-to-end read | ✓ |
| Whole-harness conversion, guard stays live, amend SC#2/HARN-03 | | ✓ |
| Convert the guard too / C17 leg only | | |
| Disclose dead pins, byte-identical copy, per-pin token check | | ✓ |
| Spawn the converted v1.21 harness from the apex, not NESTED-gated | V-159-HARN03 | ✓ |
| Positive substring only / no extra check | | |

## Area 3 — Leaves 154–158, STD-02 gate, apex

| Option | Description | Selected |
|--------|-------------|----------|
| D-35 carve-out with phase attribution + four bans | Later amended (round 3) to D-35's form with attribution corrected | ✓ |
| Full python run inside check-phase-157, always | | ✓ |
| NESTED-skipped / C18 leg | | |
| Mechanical per-job diff of all 16 v1.21 jobs + python step | Later amended (round 3): v1.22 = 13 jobs | ✓ |
| Name the literals, fix the order, amend in Plan 159-01 | | ✓ |

## Area 4 — Close-time hygiene & dispositions

| Option | Description | Selected |
|--------|-------------|----------|
| Adopt `.gitattributes eol=lf` now | Draft's cost claim measured false | ✓ |
| v1.21 Axis-1 bar from an origin clone | | ✓ |
| Prune worktrees, commit orphans, ignore tool-local entries | | ✓ |
| Full v1.21 close-record contracts | Later amended (round 3): four-row source table | ✓ |
| Carry 158-REVIEW findings to DEFERRED-CLEANUP | | ✓ |

## Area 5 — Plan count & terminal chain

| Option | Description | Selected |
|--------|-------------|----------|
| 13 plans, formula-derived counts, hand-flip inside the close-gate | Job count later amended to 13 | ✓ |
| 9 plans | | |
| Unbundle both roots, pattern-scan, drop-on-hit | | ✓ |

## Area 6 — Occurrence-needle form

| Option | Description | Selected |
|--------|-------------|----------|
| Zero-with-floor, per-file scoped counts, scripts presence | Ceilings banned | ✓ |
| Amend Area 3: 156 pins the batch10 sibling; 154 pins its real deliverables | | ✓ |

## Area 7 — Pre-push guard & Axis-3

| Option | Description | Selected |
|--------|-------------|----------|
| Fixed guard in scripts/hooks/, per-clone install | New-ref hole fixed; hooksPath alternative struck | ✓ |
| Prompt-barred, same-host Axis-3; size every leg | No flag confines Bash | ✓ |

## Area 8 — Hooks & Jira on master

| Option | Description | Selected |
|--------|-------------|----------|
| Hold RTS-829 In Progress until verify-phase passes | 153 D-69 | ✓ |
| Re-embed the adapted hook then commit the installer; annotate STATE SHAs | | ✓ |

## Area 9 — Leaf needle literals

| Option | Description | Selected |
|--------|-------------|----------|
| Referee-resolved set per leaf (amends Area 3) | D-35's attribution superseded; boundaries corrected | ✓ |
| D-35 verbatim as 158's needles | | |

## Area 10 — Amendment wording

| Option | Description | Selected |
|--------|-------------|----------|
| Five blocks as corrected, one commit, explicit D-NN grep (amends Area 5: 13 jobs) | v1.21 Phase 153 D-11 citation; PROJECT.md restored | ✓ |
| Keep 14 jobs and the v1.20 citation | | |

## Area 11 — Owner checkpoints

| Option | Description | Selected |
|--------|-------------|----------|
| Three checkpoints in 153's shapes, corrected | 153-14's close-gate checkpoint restored; partial option restored | ✓ |
| Two checkpoints, no close-gate gate | | |

## Area 12 — Close documents

| Option | Description | Selected |
|--------|-------------|----------|
| Four-row table, lineage-only Part D, corrected corrections (amends Area 4) | Net-new Part C = 2 | ✓ |
| Keep the draft's Part A/C/D and eight corrections | | |

## Claude's Discretion

Leaf check ids and detail wording; the evidence-section split of Plan 159-09; merging 158 Deferred Ideas that share a root cause; per-leg Axis timeouts within D-50; the bundle-scan pattern set beyond the five named classes.

## Deferred Ideas

Running all seven frozen harnesses from every apex; repointing the dead SafetyNet pins; a repository secret scanner; structural isolation for Axis-3; the Phase 158 Deferred Ideas as Part A entries; the nine DEFER-121-07-A placeholders; `workflow.windows_enforce`.

## Review artifacts (scratchpad, not committed)

`159-DRAFT-DECISIONS.md`, `-2.md`, `-3.md`; Finder reports `159-FINDER-{X,A1,A2,A3,A4}.md`, `159-FINDER2-{A56,A78}.md`, `159-FINDER3-{A910,A1112}.md`; `159-ADVERSARY{,-2,-3}.md`; `159-REFEREE{,-2,-3}.md`.
