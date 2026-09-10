---
gsd_state_version: 1.0
milestone: v1.22
milestone_name: Google-Style Corpus Landing, Authoring-Standard Adoption & Walk-Up AVD Kiosk Recipe
current_phase: 159
current_phase_name: HARN — Harness Close
status: executing
stopped_at: Completed 159-12-PLAN.md (wrote both v1.22 close artifacts ahead of the close gate)
last_updated: "2026-09-10T04:30:08.133Z"
last_activity: 2026-09-09
last_activity_desc: Phase 159 execution started
state_head: 54f6758bdd8ccac41ca72d97089e930d97112a23
progress:
  total_phases: 6
  completed_phases: 5
  total_plans: 43
  completed_plans: 42
  percent: 83
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-09-08 after Phase 158 — Key Decisions row + footer; v1.22 scoped 2026-08-31: 39 requirements across 6 pillars)

**Core value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices through Microsoft Intune / Entra ID without escalating to engineering — and find those answers as clean, correctly-cited results in the Copilot Studio / SharePoint knowledge base. v1.22 makes that corpus read as one voice: a single adopted writing standard applied to every document, proven not to have changed any document's meaning, and carried forward into how new documents are authored — plus the field-validated walk-up AVD kiosk build formalized as Recipe #6.
**Current focus:** Phase 159 — HARN — Harness Close

## Current Position

Phase: 159 (HARN — Harness Close) — EXECUTING
Plan: 13 of 13
Status: PAUSED at Task 4 checkpoint:decision (gate=blocking-human) — Tasks 1-3 committed (322e9259 corrective push/shared commit, fa6ea6ae dispatch axis, 659e1d94 fresh-clone + blind-agent axes); awaiting the owner's ruling (all-green / remediate / unmet) on the three-axis re-audit evidence before a continuation agent finalizes the plan
Last activity: 2026-09-09 — Phase 159 execution started

Progress: [████████░░] 83% — 5/6 phases complete; 30/30 authored plans complete (Phase 159 not yet planned)

## v1.22 Requirement Coverage (39/39 mapped — roadmap created 2026-08-31)

| Phase | Requirements | Count |
|-------|-------------|-------|
| 154 | STYLE-01, STYLE-03, STYLE-04, STYLE-05, STYLE-06, VERIFY-01 | 6 |
| 155 | RCP-01, RCP-02, RCP-03, RCP-04, RCP-05, RCP-06, RCP-07, RCP-08, RCP-09, RCP-10 | 10 |
| 156 | STYLE-02, VERIFY-02, VERIFY-03, VERIFY-04 | 4 |
| 157 | STD-01, STD-02, STD-03, STD-04, HYG-01, HYG-02, HYG-03, HYG-04, HYG-05, HYG-06, HYG-07 | 11 |
| 158 | VERIFY-05, VERIFY-06 | 2 |
| 159 | HARN-01, HARN-02, HARN-03, HARN-04, HARN-05, HARN-06 | 6 |
| **Total** | **39/39 mapped (0 orphaned, 0 duplicated)** | **39** |

**Sequential-on-main-tree execution** per `.planning/config.json` `use_worktrees:false` (durable user constraint). Phase numbering continues from v1.21 (closed at Phase 153) → v1.22 spans Phases 154-159.

**Named decisions (LOCKED at roadmap 2026-08-31):**

- PHASE-COUNT: 6 phases (154-159), one per pillar with STYLE and VERIFY each split across two phases to honor the landing/prove-it and merge/extend orderings. `config.json` sets no `granularity` key (default standard, 4-6); 6 sits at the top of that band, justified by 39 requirements across 6 categories plus two non-negotiable internal orderings (STYLE-01→STYLE-02→VERIFY-04's after-half; RCP-01..03→RCP-04). Comparable shape is v1.18 (6 phases) and v1.20 (6 phases) rather than v1.21 (9).
- STYLE-SPLIT: STYLE-01/03/04/05/06 (the merge plus its protective canon) land in Phase 154; STYLE-02 (batch 10, including RE-237) lands in Phase 156, after Phase 155 (RCP) has finished reconciling and researching RE-237's content — so the style pass touches RE-237 once, after its prose is final, not before. VERIFY-04's before-measurement is captured in Phase 154 (the first phase, per the milestone's own hard constraint); its after-measurement — required to follow **both** STYLE-01 and STYLE-02 — lands in Phase 156 where both are complete.
- RCP-BEFORE-STYLE2: Phase 155 (RCP, all 10 requirements as one phase) is sequenced between Phase 154 and Phase 156 because RCP-06/RCP-07 edit RE-222 and RE-224, which are themselves part of the merged scratch corpus — those edits must land after the Phase 154 merge, not before it or they risk being overwritten; and RCP-09/RCP-10 finalize RE-237's own prose before STYLE-02 batches it in Phase 156, avoiding a re-style.
- RCP-ATOMICITY: RCP-01 (registry row), RCP-02 (nav wiring) and RCP-03 (both canary bumps) are one commit; RCP-04 (Draft→Approved) is a later, separate commit — both inside Phase 155. Content phases never touch the registry outside this phase.
- STD-HYG-TOGETHER: STD (4 reqs) and HYG (7 reqs) share Phase 157 rather than splitting into two thin phases — both are independent of the STYLE/RCP critical path, both are "close out the milestone's remaining surface area" work, and STD-04's authoring guidance and HYG's corrections are both prose-hygiene concerns a single content pass can carry together.
- FINAL-VERIFY-SEPARATE: VERIFY-05 (dist rebuild) and VERIFY-06 (fix-verification discipline) form their own Phase 158 rather than folding into Phase 157, because VERIFY-05 needs the *fully* final corpus (post STD gate, post HYG fixes, post RCP-04 promotion) and VERIFY-06 is a cross-cutting audit over claims made across Phases 154-157 — it is honestly a final phase, not a 157 sub-task.
- HARNESS-PHASE: Phase 159 is the sole deliverable of the closing cluster (mirrors v1.13 Phase 100 / v1.14 112 / v1.15 119 / v1.16 125 / v1.17 128 / v1.18 134 / v1.19 138 / v1.20 144 / v1.21 153). Hard constraint from the milestone brief: HARN never batches with content work.
- NO-COMPLIANCE-FILENAME: this file and ROADMAP.md were authored and checked against `check-phase-54.mjs`'s `V-54-21` negative — neither file names the off-by-one compliance-policy filename the milestone brief flags.
- DISCUSS-PHASE-FLAGS: gray areas are NOT resolved at roadmap — deferred to `/gsd-discuss-phase` + `/adversarial-review` per project convention. Named: whether RCP-05's `[PILOT]` labeling is already satisfied by the as-authored Draft or needs active editing (155); the exact split of STD-02's mechanical-gate implementation vs STD-03's non-gate documentation (157); whether VERIFY-06's git-log-S audit needs a reusable script or is a one-time manual pass (158).

## Performance Metrics

**Velocity across milestones:**

- v1.0: 10 phases, 24 plans — shipped 2026-04-10
- v1.1: 9 phases, 18 plans — shipped 2026-04-13
- v1.2: 6 phases, 20 plans — shipped 2026-04-15
- v1.3: 8 phases, 44 plans — shipped 2026-04-19
- v1.4: 9 phases, 40 plans — shipped 2026-04-24
- v1.4.1: 5 phases, 33 plans — shipped 2026-04-25
- v1.5: 14 phases, 101 plans — shipped 2026-05-07
- v1.6: 5 phases (62-66), 30 plans — shipped 2026-05-25
- v1.7: 4 phases (67-70), 15 plans — shipped 2026-05-29
- v1.8: 4 phases (71-74), 13 plans — shipped 2026-06-08
- v1.9: 8 phases (75-82), 19 plans — shipped 2026-06-22
- v1.10: 6 phases (83-88), 16 plans — shipped 2026-06-24
- v1.11: 5 phases (89-93), 13 plans — shipped 2026-06-26
- v1.12: 2 phases (94-95), 5 plans — shipped 2026-06-26
- v1.13: 5 phases (96-100), 14 plans — shipped 2026-06-29
- v1.14: 12 phases (101-112), 38 plans — shipped 2026-07-02
- v1.15: 7 phases (113-119), 40 plans — shipped 2026-07-06
- v1.16: 6 phases (120-125), 38 plans — shipped 2026-07-10
- v1.17: 3 phases (126-128), 11 plans — shipped 2026-07-11
- v1.18: 6 phases (129-134), 17 plans — shipped 2026-07-20
- v1.19: 4 phases (135-138), 12 plans — shipped 2026-08-04
- v1.20: 6 phases (139-144), 44 plans — shipped 2026-08-18
- v1.21: 9 phases (145-153), 48 plans, 131 tasks — shipped 2026-08-30
- v1.22: 6 phases (154-159) — roadmap created 2026-08-31, not yet planned

**Per-plan duration history (v1.0–v1.21):** archived in `.planning/milestones/vX.Y-ROADMAP.md` per milestone and in `.planning/MILESTONES.md`'s key-accomplishments entries. Re-populated here per-plan as v1.22 phases execute.

*Updated after each plan completion*
**Per-Plan Metrics:**

| Plan | Duration | Tasks | Files |
|------|----------|-------|-------|
| Phase 154 P01 | 12min | 3 tasks | 3 files |
| Phase 154 P02 | 41min | 3 tasks | 281 files |
| Phase 154 P03 | ~20min | 3 tasks | 3 files |
| Phase 154 P04 | 55min | 2 tasks | 3 files |
| Phase 155 P01 | 20min | 3 tasks | 5 files |
| Phase 155 P02 | 14min | 2 tasks | 7 files |
| Phase 155 P04 | 20min | 3 tasks | 4 files |
| Phase 155 P03 | 196min | 3 tasks | 23 files |
| Phase 155 P05 | 40min | 3 tasks | 3 files |
| Phase 155 P06 | 10min | 3 tasks | 7 files |
| Phase 156 P01 | 40min | 3 tasks | 5 files |
| Phase 156 P02 | 59min | 3 tasks | 2 files |
| Phase 156 P03 | 20min | 3 tasks | 8 files |
| Phase 156 P04 | 17min | 3 tasks | 13 files |
| Phase 156 P05 | 20min | 3 tasks | 3 files |
| Phase 156 P06 | 7min | 3 tasks | 2 files |
| Phase 157 P01 | 12min | 3 tasks | 3 files |
| Phase 157 P02 | 18min | 3 tasks | 14 files |
| Phase 157 P03 | 12min | 3 tasks | 29 files |
| Phase 157 P04 | 45min | 3 tasks | 2 files |
| Phase 157 P05 | 35min | 3 tasks | 6 files |
| Phase 157 P06 | 35min | 3 tasks | 3 files |
| Phase 157 P07 | 55min | 3 tasks | 15 files |
| Phase 158 P01 | 37min | 3 tasks | 5 files |
| Phase 158 P02 | 16min | 3 tasks | 4 files |
| Phase 158 P03 | 22min | 3 tasks | 19 files |
| Phase 158 P04 | 15 min | 3 tasks | 3 files |
| Phase 158 P05 | 23min | 3 tasks | 3 files |
| Phase 158-final-corpus-verification-publish-bundle P06 | 78min | 2 tasks | 3 files |
| Phase 158 P07 | 27min | 3 tasks | 6 files |
| Phase 159 P01 | 33min | 6 tasks | 15 files |
| Phase 159 P02 | 8min | 3 tasks | 2 files |
| Phase 159 P03 | 13min | 3 tasks | 4 files |
| Phase 159 P04 | 12min | 3 tasks | 2 files |
| Phase 159 P05 | 55min | 3 tasks | 4 files |
| Phase 159 P06 | 42min | 3 tasks | 3 files |
| Phase 159 P07 | 55 min | 3 tasks | 2 files |
| Phase 159 P08 | 48min | 3 tasks | 3 files |
| Phase 159 P09 | 55 min | 3 tasks | 1 files |
| Phase 159 P10 | 11min | 3 tasks | 2 files |
| Phase 159 P11 | 26min | 4 tasks | 2 files |
| Phase 159 P12 | 28min | 3 tasks | 3 files |

## Accumulated Context

### Decisions

**v1.22 roadmap decisions (LOCKED 2026-08-31):** see "Named decisions" above.

**Carried-forward durable architectural decisions (from v1.14–v1.21):**

- Sequential-on-main-tree per `use_worktrees:false`; atomic harness commits (Atom 1 + Atom 2); frozen-aware via `_lib/frozen-at-close.mjs`; non-current-milestone predecessor frozen surfaces BYTE-UNCHANGED except explicitly-scoped exceptions (D-00a doctrine).
- WINDOWS-CLONE-DEEPNEST-TIMEOUT-01: Linux GHA BOTH chain validators authoritative (D-03 corrected OS split, held v1.12–v1.21); the within-apex curve is healthy (~17s at HEAD).
- Adversarial-review invoked at discuss-phase for gray-area scoping decisions (per user memory `feedback_adversarial_review_preference.md`).
- Back-anchor pin recovery precedent (V117→V121, now due at v1.22 close for V121): recover the close-gate SHA via the subject-line pair discriminator `git log --all --format="%H|%s" | awk -F'|' '$2 ~ /vX\.Y/ && $2 ~ /MILESTONE CLOSE/'`, count=1 — NOT the dual-token `--grep --all-match` form, which returns multiple candidates because it matches on the commit body.
- A later `check-phase-N` validator can pin an earlier `check-phase`'s EXACT call-site string verbatim — grep before editing any frozen validator line (memory `reference_frozen_callsite_pinning.md`).
- Archival-drift close blocker: `complete-milestone` archiving `.planning/phases/NNN/` can break predecessor check-phase validators reading hardcoded `phases/` paths — scan nested-fail children pre-push at every close (memory `reference_archival_drift_close_blocker.md`).
- `.planning/REQUIREMENTS.md` must not be deleted at milestone close — `check-phase-54.mjs` live-reads it outside the frozen-at-close mechanism (memory `reference_complete_milestone_keep_requirements.md`); the same validator also live-reads `.planning/ROADMAP.md` with the `V-54-21` negative-filename assertion.
- `KEEP_LINE` is the only thing protecting a hand-adjudicated style revert; a revert with no `KEEP_LINE` entry is undone by the next `sweep3.py` run. A blanket TSV row that splits a real label pair must be deleted from the TSV, not worked around.
- `must` is the dangerous style rewrite, not the flattened assertion — STRENGTHENED (a hedge promoted to `must`) outnumbered INVERTED 26 to 19 in the original judge pass.
- A written audit log is not evidence — a prior `RESUME.md` ruling claimed a revert that `git log -S` proved never happened, and the false label shipped gate-green for four batches. Verify any claimed fix with `git log -S "<string>"` before trusting a count that rests on it (this is VERIFY-06's whole premise).

*(Full v1.0–v1.21 execution-decision logs are archived in `.planning/milestones/vX.Y-MILESTONE-AUDIT.md` and `.planning/MILESTONES.md`. The detailed per-plan D-NN decision ledger for v1.21's own Phases 145-153 lives in `.planning/milestones/v1.21-phases/*/*-SUMMARY.md` and `.planning/milestones/v1.21-ROADMAP.md`.)*

- [Phase 154]: Committed a pending orchestrator STATE.md edit before Task 1's clean-tree precondition check, so the precondition held on a genuinely clean tracked tree (Rule 3 auto-fix).
- [Phase 154]: Tightened verify2.py's BASE guard to a one-line ternary to keep the diff at 4 insertions / 2 deletions, satisfying the plan's diff-size acceptance criterion while meeting D-31's fail-loud requirement.
- [Phase 154]: Recomputed the tight-em-dash census with a whitespace-boundary regex after a naive raw-character count (7063/290) conflated spaced instances; the corrected tight-only count (7/5) matches CONTEXT.md's pre-merge figure exactly.
- [Phase 154]: [Phase 154]: Landed the 280-file Google-style pass via git fetch + git apply --3way --directory=docs into docs/ as four commits (C1-C4) on v1.22/154-style-landing; all three conflicts (index.md, android, patch-mgmt overview) hand-resolved by their individually-stated D-05 rules.
- [Phase 154]: [Phase 154]: Human ruled proceed with annotate-and-supersede for the Task 1 SHA-anchor mismatch (gate_baseline.sha=789a348a vs branch tip 8de413aa) -- both SHAs' docs/ tree objects are byte-identical, confirming it is a stale label on a sound measurement; gate_baseline.sha corrected to 8de413aa with measured_at_sha preserving the original.
- [Phase 154]: Two new plan-premise deviations found and investigated to root cause in plan 154-03 (VERIFY-01 path-scope gap, STYLE-04 pinned-headings scope gap); both logged to WINDOWS.md (#10, #11), both independently proven not to indicate a corpus-meaning regression, both flagged for 154-04's amendment sweep.
- [Phase 154]: 154-04: annotate-and-supersede amendment sweep landed 9 blocks (5 REQUIREMENTS.md + 4 ROADMAP.md) correcting STYLE-01/02/06 and VERIFY-01/06 figures to what plans 154-01/02/03 actually measured; check-phase-54.mjs green 32/0/0 before and after.
- [Phase 155]: D-05 flip-first amendment landed by annotate-and-supersede in REQUIREMENTS.md (RCP-04) and ROADMAP.md (Phase 155 SC5); check-phase-135.mjs V-135-RECIPE retired from a 328-line pin to existence/H1/content-needle assertions with a recorded D-00a exception; 155-GATE-BASELINE.json committed as the phase's command-sourced measurement anchor.
- [Phase 155]: RCP-09 asset tree founded: Dependencies/ folder (VCLibs .appx, 6.7MB) documented in NOTICE but not committed -- fails the plan's own 2MB size-cap gate, same rationale as D-30's MSIX exclusion
- [Phase 155]: WindowsApp_AutoLogon.xml vendored from the ShellLauncher/ variant (not MultiApp/) -- matches RE-237's V2-namespace reference and its not-worked-here Shell Launcher branch context
- [Phase 155]: MSIX SHA256 documented as an Entra-ID auth-gate limitation (winget msstore download requires admin-role auth), not fabricated -- packager command recorded for later completion
- [Phase 155]: [Phase 155]: RCP-10 claims re-confirmed at execute time via Playwright DOM-text extraction (not WebFetch) -- claim_1 resolved POSITIVE, claim_2 resolved UNVERIFIED (edition-only gate, no activation-mechanism first-party source found), matching predicted outcome, no HALT
- [Phase 155]: [Phase 155]: RCP-08 amended the incumbent Windows Subscription Activation row in licensing-matrix.md rather than adding a new row -- its remedy is not a licence SKU, so a new row's Minimum License cell would have no honest value
- [Phase 155]: 155-03: ConfigMgr package source scrubbed to documented placeholders (owner-ruled, commit-scrubbed, 2026-09-03); scrub extended to two further employer-name occurrences beyond the ruling's named location
- [Phase 155]: 155-03: Remove-KioskOemBloat.ps1/Remove-KioskRunTasks.ps1 gated with SupportsShouldProcess across all three required deployment copies (kiosk-baseline/Files, remediations/oem-bloat, remediations/run-task-cleanup), byte-identical after edit, preserving RE-237's never-diverge invariant
- [Phase 155]: 155-03: RemoveBloat.ps1 (Andrew Taylor De-Bloat) not vendored -- still an open Ask-the-admin decision in RE-237, not one of RCP-09's ten items; recorded as a NOTICE gap
- [Phase 155]: 155-05: RE-237 asset wiring corrected the plan's own de-bloat-vendoring paraphrase against NOTICE's recorded gap; two blockquotes needed a true blank line (not a bare '>') to split under C17 assertion 12; [PILOT] label added to the verify skill's protected-signal list as a pure insertion ahead of Phase 156's judge pass
- [Phase 155]: RE-237 promoted Draft to Approved and registered as registry identifier 237 (permanent), flip-then-register order per D-05, after an owner-approved pre-flip content review with 2 fixes (F1 attribution split, 4 RCP-09 companion links)
- [Phase 155]: Origin seed SEED-002 closed: all four scope sections discharged or carried to backlog additively; Phase 156 must re-measure baselines for 4 rewritten batch-10 documents; Phase 159 needle set and both-directions Phase 156 handoff recorded
- [Phase 156]: [Phase 156]: pins2.py's lits collection changed from set() to an insertion-ordered dict (Rule 1) -- str hash randomization made two runs over the same corpus emit equal-length pin ties in a different order, which would have made the committed live-pin baseline nondeterministic
- [Phase 156]: [Phase 156]: judge-packets.py's real pin/hunk coverage over the 13 batch-10 documents measured 117 present / 39 pinned / 78 unpinned -- totals match CONTEXT.md's D-08 prediction exactly, per-validator attribution differs and both are recorded
- [Phase 156]: [Phase 156]: Sure Admin guard proven to fire by perturb-and-restore (shipped TSV row = 0 edits, (?<!Sure )-stripped row = 20 edits, matching D-06's prediction); vacuous grep -c detector replaced with grep -rc
- [Phase 156]: D-20 (owner-ruled): verdict record is a sibling scripts/docs-style/_JUDGE-VERDICTS-batch10.json, leaving _JUDGE-VERDICTS.json byte-identical (git-fact provable via git diff --exit-code).
- [Phase 156]: Mechanical residual over the 13 docs re-measured (not inherited) as an enumerated, dispositioned 10-site list per D-32/D-33.
- [Phase 156]: judge_base annotate-and-supersede (owner-ruled): phase_baseline.judge_base = 987770f8, superseding Task 1's unsatisfiable HEAD==before.sha precondition; landed in the same commit as the first document edit so the parent relationship is mechanically true
- [Phase 156]: D-32's base substitution set never applied in this phase; subs-batch10.tsv reimplements only lowercase admin/admins as an authored TSV
- [Phase 156]: 5 pre-existing line-boundary em dashes manually reflowed (whitespace-only) before re-tightening, since a per-line TSV cannot move a line-wrap position
- [Phase 156]: Dispatch-mechanism smoke test recorded but excluded from official verdict counts in _JUDGE-VERDICTS-batch10.json (judged=0/judges=0 is the real pipeline's accurate zero)
- [Phase 156]: 156-04: extended subs-batch10.tsv with sign-in-to row (sweep3 built-in regex verbatim), closing base-substitution residual to its single permanent citation-blocked site
- [Phase 156]: 156-04: diagnosed 14 boundary spaced em-dashes as two classes -- 8 reflow-fixable (fixed), 6 link-adjacency architecturally unfixable (empirically proven, recorded as WINDOWS row 14 confirming row 12's recurrence)
- [Phase 156]: 156-04: 4 pre-existing run-in-description-list tight dashes left untouched as an out-of-scope Phase 157/STD-04 authoring-standard concern
- [Phase 156]: Used judge_base (987770f8), not before.sha, as BASE for verify-meaning.py and judge-packets.py in plan 156-05, per the settled D-17 owner ruling.
- [Phase 156]: Full-batch judge worklist over all 13 batch-10 documents is a legitimate, measured zero: 24 in-scope raw modal-loss candidates all dropped by judge-packets.py's modal-bag filter because no mechanical rule set this phase applied removes a modal word.
- [Phase 156]: Proved the D-05/D-37 idempotency closure via a scratch-copy scoped to exactly the 13 batch-10 targets (all 36 rule sets report 0), rather than trusting the unscoped full-docs/-root reading, which is non-zero for 8 sets purely from pre-existing out-of-batch corpus files unrelated to this phase.
- [Phase 156]: VERIFY-04 after half measured at 090ca859, distinct from before.sha 0425921b; three-column Phase-154/before/after comparison assembled with zero unexplained regressions — verify2.py's Part A counts move at every measurement because it always diffs against the fixed pre-merge BASE; the narrow INTRODUCED=0 reading is the actual gate signal, per D-31
- [Phase 156]: 10 deferred items (dash handoffs, the permanent citation-blocked residual, D-08 pin-coverage exposure, D-33/D-37 lessons, out-of-batch files, out-of-scope findings, WINDOWS row 10) handed forward to Phase 157/158/159 each with a measured value and reproducing command
- [Phase 157]: D-08/D-50 order honored: apex baselined green before any pinned surface touched; HYG-02 literal arm closed first
- [Phase 157]: D-19: EEE-SOP-standard.md path removals keep D-04/owner-ruled/2026-08-26 provenance, only the repository path dropped
- [Phase 157]: D-20/D-21: FIX-11 annotated with both commit SHAs (9fd7cf1c discharge, 285a65d5 regression), standing detector named as future plan-04 gate
- [Phase 157]: Applied one fixed lowercase substitution vocabulary across all 14 Apple Business runbooks to close HYG-02's leak-class arm; positive control proved the needle can fire before trusting its zero
- [Phase 157]: STD-02 gate authored: check-prose-style.py gates anthropomorphism+person-first with a mandatory --self-test; REQUIREMENTS.md preamble annotated-and-superseded (D-07)
- [Phase 157]: Widened HYG-01/HYG-04/HYG-05 fixes beyond the requirement's named coordinate: HYG-01 corrected all five hub sites, HYG-04 corrected all three wrong-date sites, HYG-05 re-attached both limits to Autopatch groups rather than a minimal Entra-group disambiguation. — Per plan 05's explicit instruction and CONTEXT D-36/D-40/D-43: correcting only the requirement's named coordinate would have left live contradictions of the same fact or a wrong planning limit still shipping.
- [Phase 157]: Recorded two non-defects (02-etg-device-group.md:129 already linked/corrected in Phase 152; patch-management/00-overview.md:247 correct usage) and one citation disposition (07-windows-autopatch.md:432 left undated, matching sibling Further Reading entries) instead of editing or silently omitting them. — Per D-38/D-42: a disposition list must cover every item it claims to cover, and churning already-correct sites risks unnecessary diffs against frozen/pinned surfaces.
- [Phase 157]: HYG-06 count falsified: DFCI already satisfied (Phase 149), only five terms genuinely absent (D-44) — Requirement text names six terms; measurement across all six glossary files, case-insensitively, found DFCI already has a full entry
- [Phase 157]: HYG-07 seed closure recorded as mechanically inert: gsd-tools scanSeeds recognises only dormant/active/triggered, not planted or closed (D-49) — No guard built; normalizing this repo's seed vocabulary to the GSD schema would flip SEED-001 to open at a future close gate
- [Phase 157]: Prose Style Authoring Standard section resolves scope explicitly: it governs the whole 294-file tracked corpus, not only the 237-file EEE-enrolled subset, naming the 57-file gap.
- [Phase 157]: last_verified and review_by left byte-unchanged in EEE-SOP-standard.md; the deliberate non-advance is stated in the new Version History row.
- [Phase 157]: No edit made to google-style-verify/SKILL.md per D-34: the mandate-promotion hazard is already fully documented there, and a second copy would create the divergence risk this phase records.
- [Phase 158]: 158-01: audit-claimed-fixes.mjs built and self-tested (4/4 cases, git-repo tmpdir fixture with LF+CRLF blobs); flagship KEEP row fix_sha corrected to af678f0c (the merge-landing commit) since RESUME's cited f30c37b/dc7e996 predate the merge and are not HEAD ancestors
- [Phase 158]: 158-01: LINE COUNT DIFFERS resolved as 14 at 845218a4, not CONTEXT.md's 21 -- this live, verbatim run supersedes both prior written figures; 21 is not reproducible by any recorded command
- [Phase 158]: 158-01: discovery audit found zero unexpected falsifications -- three known-and-owned ones (EEE-SOP-standard.md:662, REQUIREMENTS.md:80 HYG-06 count, docs/_glossary-linux.md:143 cross-reference) confirmed still live and already owned by later plans; no WINDOWS.md row added
- [Phase 158]: Phase 158 Plan 2: corrected EEE-SOP-standard.md's falsified two-skill byte-identical claim (D-05) by removing the point-in-time assertion rather than re-measuring it, stating the divergence as measured instead.
- [Phase 158]: Phase 158 Plan 2: gave the Linux glossary's unattended-upgrades entry a corpus-consistency cross-reference to the reboot-handling anchor instead of an external vendor re-fetch, since the claim is already supported by a dated citation elsewhere in the corpus.
- [Phase 158]: [Phase 158]: 158-03: judge-packets.py fix rewritten to a minimal-diff form (13 ins/2 del) to stay under the plan's 30-changed-line acceptance cap; two-case scratch demonstration proves emitted output unchanged for the following-anchor case and correctly neighbourhood-anchored for the no-anchor case
- [Phase 158]: [Phase 158]: 158-03: em-dash sweep closed corpus-wide (15 files, 31 edits, idempotent), guarded by boundary/pin-differ/CR-insensitive-byte-identity checks rather than the substitution table's own lookarounds; one link-adjacency residual (docs/recipes/02-shared-ipad-full-provisioning.md:286) left spaced, matching Phase 156's already-accepted architectural class -- recorded as WINDOWS.md #16, not hand-fixed inside the frozen sweep commit
- [Phase 158]: Judge dispatch used claude -p with --tools "" (all tools disabled) and cwd outside the repository, as the concrete mechanism for the plan's 'no tool authority over this repository' requirement. — The prior phase's recorded dispatch command was a shell string that was never executed (process_count 0); this plan needed a real, safe dispatch mechanism since 2 real packets existed.
- [Phase 158]: One chunk file containing both byte-identical hunks was judged by a single claude -p process; the verdict record still carries two separate per-hunk packet records, each hashed from its own re-serialized JSON object. — D-55's 'two packets' refers to judge-packets.py's two hunk-objects, not two dispatched files; one judge reading one assembled file necessarily produces one process serving both packet records.
- [Phase 158]: 158-05: header-attributed 5 planning-tree meaning-checker findings (not the 4 CONTEXT.md D-12 recorded) and 27 NO-CANDIDATES style-disposition files (not 26) -- both live re-measurements, both recorded rather than forced to match the written figures.
- [Phase 158]: 158-05: folded a duplicate directional/word-list finding on the same 'above' token into one EDIT row at EEE-SOP-standard.md:658 to hold the style disposition table at exactly 5 EDIT rows without breaking the post-edit byte-identity re-proof; corrected limb three's arithmetic to 93-5 EDIT-3 SWEPT=85 (not the naive 93-5=88 D-62 implied), since the mechanical sweep is a separate mechanism from the five named style edits.
- [Phase 158-06]: Range.to re-resolved to the final content revision (aa9ae5ae) instead of the tracer's stale endpoint — D-01/D-69 constraint 5 require the binding audit at the final content revision; leaving range.to stale made all 17 own-remediation rows vacuous (measured).
- [Phase 158-06]: Three D-51-named drift metrics (link-checker counts, LINE-COUNT-DIFFERS, legacy pin count) got no drift row — Live before/after measurement showed no delta within Phase 158 for these three; documented as steady in the after-half's own notes instead of a no-op row.
- [Phase 158]: 158-07: rebuilt dist/docs-library-v1.22.zip in its own invocation (488-line run log, 239 entries, both canaries 237/237); a build-tooling EOL mismatch (Node wrote LF against core.autocrlf=true) made filename-map.md show git-status-modified with zero actual content diff, resolved via `git checkout --` on that one file after proving byte-identity both before and after (Rule 3). Landed six annotate-and-supersede amendment blocks: the `_CONTENT-PINS.txt` pin count (562→563, commit 83660691), VERIFY-06's confirmation criterion widened to every claim with its retroactivity/reproduce/carve-out parts, HYG-06's glossary-entry count corrected to five (DFCI pre-existed since Phase 149's 8e5070d9), and HARN-06's history record (origin/master…master 0/11, current branch re-measured 171 ahead of master — not CONTEXT's stale 152 — squash recommended, mechanism deferred to Phase 159). The untracked-entry count measured 10 after this plan's own commits (not the plan text's expected 9), consistent with 158-06's own precedent that `.planning/milestone.lock` is a new foreign entry.
- [Phase 158]: [Phase 158-07]: Rebuilt dist/docs-library-v1.22.zip in one dedicated invocation (488-line log, 239 entries, both canaries 237/237); fixed a build-tooling EOL mismatch (Node wrote LF against core.autocrlf=true) via git checkout -- after proving byte-identity; landed six annotate-and-supersede amendment blocks correcting the pin count, the VERIFY-06 confirmation criterion, the HYG-06 glossary count and the HARN-06 history record; both requirements flip at this plan's boundary.
- [Phase 159]: Landed v1.22 milestone on master via git commit-tree plumbing squash after scrubbing a recurring verifier-secret-echo leak; caught and reverted a near-miss that would have deleted 16 tracked files during worktree hygiene.
- [Phase 159]: Followed D-14/D-15/D-16/D-17 exactly: recovered V121 SHA via subject-line pair discriminator (count 1, regression-checked against V117-V120), inserted the pin strictly before V14 (never appended), named the Phase 159 D-15 APPEND-ONLY re-amendment in the file's header, and proved the pin end-to-end with a real frozen read (113803 bytes, 307 docs paths).
- [Phase 159]: Fork ordering proven: three-way hash equality (frozen blob, unconverted working copy, new v1.22-milestone-audit.mjs) confirmed before any identity edit — D-22 requires the fork source be the frozen v1.21 blob at e129081e, never the working copy, so the byte-equality assertion is the evidence the order was honoured
- [Phase 159]: Sidecar and BASELINE_26 populations re-measured live reproduce D-23/D-24's carried figures exactly (89/73/33/44 total; 40/44 pass-both, 7/9 BASELINE_9 lines changed) -- zero delta on every figure — D-65 measurement discipline: live value wins over any carried figure, and a zero delta is itself a result worth recording
- [Phase 159]: Converted v1.21-milestone-audit.mjs to frozen V121 reads per D-18/D-19/D-20/D-21, proven by scratch-clone perturbation and two negative probes (D-26) — Discharges HARN-03 and closes the C17-FROZEN-AWARE-RESIDUE-V21 class
- [Phase 159]: sign into pinned literal case-sensitive (not case-insensitive) — the CI reading never reaches 0 at HEAD
- [Phase 159]: _DISPOSITIONS-batch10.tsv needle narrowed to presence-only; live measurement found 0 data rows, correctly, against D-35's assumed >=1
- [Phase 159]: Only the five full D-01..D-05 heading texts are pinnable in check-phase-157.mjs; colon-prefix and bare forms both collide with unrelated D-series and are never used. — Colon-prefix counts 3/3/3/3/2 across three unrelated D-series; bare form additionally collides with an unrelated heading at line 134.
- [Phase 159]: check-phase-158.mjs uses a default child_process import (cp.execFileSync) instead of a destructured one to minimize its literal execFileSync-substring count to exactly 1. — Satisfies that leaf's own exact-count gate as tightly as the mandated single spawn permits.
- [Phase 159]: V-159-HARN03 additive leg copies AUDIT-HARNESS's shape but omits the NESTED-skip branch (D-25) -- the converted v1.21 harness is exercised for real in every apex invocation
- [Phase 159]: Archive-root token 'v1.22-phases' named directly from D-29, never transcribed from check-phase-153.mjs's own token -- unfalsifiable in-phase per the resolver's live-path-first behavior
- [Phase 159]: Job count derived by direct enumeration, not the plan's own grep-count verify command -- that pattern also matches the on: block's bare schedule: trigger key (no underscore), inflating both real counts by 1; documented as a measurement-command anomaly, not a defect.
- [Phase 159]: Python 3.13 pinned in exactly linux-chain-ubuntu-latest, check-phase-157, and check-phase-159 -- matching the local Axis-1 reproduction environment; the header comment describing the step avoids repeating the literal action/version strings after an earlier draft's prose doubled the exact-count acceptance criteria from 3 to 4.
- [Phase 159]: The predecessor-surface census's two anticipated pre-existing entries were traced and named: check-phase-135.mjs and check-prose-style.py, both landed by the 159-01 squash from Phase 155/157 content predating any Plan 159-0X commit.
- [Phase 159]: Bundle scan patterns 3/4 (118 email, 4 hostname matches) judged not a true hit -- all resolve to Microsoft-documentation placeholder domains inside the docs corpus, bundle stays tracked — Both matches are inside the pre-style-pass docs corpus the bundle preserves, resolving to contoso.com/onmicrosoft.com-class placeholders, not real secrets
- [Phase 159]: Owner ruled proceed on the milestone-close push; git push origin master published 60 commits to origin/master at 326af04d, with all four remote atom branches kept. — Blocking-human checkpoint per D-10/D-55; owner's verbatim ruling recorded in 159-EVIDENCE.md sections 26-27.
- [Phase 159]: [Phase 159]: 159-11: Re-established the true shared commit (828df055) via a corrective push of the previous plan's boundary commits (requirement-flip + summary commit); all three re-audit axes bound to it.
- [Phase 159]: [Phase 159]: 159-11: Dispatch axis (19 workflows, 240 jobs), fresh-clone axis, and blind-agent axis all ran byte-identical at 828df055 -- 0 failures, 0 illegitimate skips, 0 incomplete legs, 0 retries; owner ruled all-green at the Task 4 blocking-human checkpoint, no accepted-red disposition invoked.
- [Phase 159]: NESTED-GUARD-SECOND-ORDER-ASYMMETRY carried with V-159-HARN03's partial discharge noted, not closed -- general apex-guard architecture unchanged
- [Phase 159]: Eight of Phase 158's twelve Deferred Ideas merged into one Part A entry (PHASE-158-CARRIED-RESIDUE) under a stated shared root cause; four remain their own named entries
- [Phase 159]: Four falsifications tracing to 158-VERIFICATION.md:97 grouped under one milestone-audit correction of record rather than reported separately

### Plan-Time Research Flags (not blockers — resolve at each phase's plan time)

- **Phase 155 (RCP-10): the two external claims RE-237 rests on.** Whether the reference implementation (`Azure/WindowsAppKiosk`) genuinely ships no single-app variant, and the activation-versus-edition basis of the Shell Launcher licensing failure (`Class is not licensed for use`, Intune `-2016281112`). Fetch canonical pages as source bytes, not `WebFetch` — the same URL has returned contradictory answers to two agents in one session in this project's history (memory `reference_canonical_source_bytes_not_webfetch.md`).
- **Phase 154/156 (STYLE-01/STYLE-02): re-measure drift at plan time.** The `22 files / 4,032 insertions / 12 deletions` figure and the `c97d322` pristine-baseline SHA are `[MEASURED 2026-08-31]` — this repo takes commits from other sessions, so both must be re-confirmed, not assumed, when each phase actually plans.
- **Phase 159 (HARN-01): V121 SHA already recovered and confirmed at milestone scoping** — `MILESTONE_CLOSE_SHAS.V121 = e129081e` (the v1.21 close-gate commit). Re-confirm with the subject-line pair discriminator at plan/execute time rather than trusting this note blindly.

### Pending Todos

None yet for v1.22.

### Blockers/Concerns

No open blockers. v1.21 shipped clean: 58/58 Validated, apex 111/0/0 measured before and after archival, zero archival drift, three-axis re-audit owner-ruled all-green. `origin/master` was 0 ahead / 0 behind with tag `v1.21` present at v1.22 scoping time — re-measure before the v1.22 close rather than assuming it still holds.

**[STATE ANNOTATION, 2026-09-09, Phase 159 Plan 01 Task 2]** `v1.22/154-style-landing` was squashed onto `master` as one commit (`9cc84aa6`, single parent `8de413aa`) via `git commit-tree`, per `159-CONTEXT.md` D-01/D-02. The branch's original tip (`9cc76587`) and full pre-squash commit history are preserved at `refs/archive/v1.22-landing` (tree-equal to `master^{tree}`); the branch itself is deleted. **A live re-measurement found 17 commit-SHA-shaped tokens cited in this document (not the 14 D-46 carried), of which 11 — including this section's own then-current `state_head` — are now unreachable from `master` by direct ancestry: `0425921b`, `090ca859`, `83660691`, `845218a4`, `987770f8`, `aa9ae5ae`, `af678f0c`, the pre-squash `state_head` `bdb22fdf`, `c97d322`, `dc7e996`, `f30c37b`.** All 11 remain resolvable through `refs/archive/v1.22-landing`, which any commit reachable from `master^` (i.e. `8de413aa` and its ancestors) is NOT part of, but every commit that was ever on the landing branch IS. If a future session needs to inspect one of these SHAs, resolve it against `refs/archive/v1.22-landing`, not `master`. This delta (11, not D-46's carried 8) is recorded per D-65 — the live count wins.

**Live watch items carried into v1.22:**

- **`V121-PIN-DEFERRAL` is mandatory at the v1.22 close (Phase 159, HARN-01/02).** Insert `MILESTONE_CLOSE_SHAS.V121 = e129081e` strictly before the `V14` entry in `frozen-at-close.mjs`, never appended — `V-140-V14PIN` regex-asserts `V14` stays the object's last key, and an append fails that apex-chain check. This is the sixth link in an unbroken back-anchor chain (V117 → V118 → V119 → V120 → V121).
- **`C17-FROZEN-AWARE-RESIDUE-V21` is open until Phase 159 lands** — `v1.21-milestone-audit.mjs` is live-HEAD by construction, since no `V121` pin existed until this milestone's close.
- **A one-time measurement is not a guard.** FIX-11 proved `docs/` carried zero `.planning/` references at v1.21 Phase 145; Phase 151 reintroduced two, and nothing noticed because no validator asserts it. HYG-02 fixes the two known leaks and widens the sweep to catch the class (not just the `.planning/` prefix) — but any success criterion that must still hold at close needs a gate, not a checklist tick. VERIFY-06 exists for exactly this reason.
- **9 audit items are structurally un-suppressible** until `DEFER-121-07-A`'s 9 `YYYY-MM-DD` Version-History date placeholders are filled (`docs/_glossary.md`, `docs/_glossary-linux.md`, `docs/ios-lifecycle/00-enrollment-overview.md`, `docs/android-lifecycle/{00,01,02,03}-*.md`, `docs/linux-lifecycle/{00,01}-*.md`) — they surface at every milestone close by design and are **not** in v1.22's own requirement scope (no v1.22 requirement names them); they will carry forward again unless a future milestone adds a requirement for them.
- **Glossary zero-margin hazard remains live.** Re-measure glossary `last_verified` / `review_by` metadata at plan time (HYG-06 adds new terms to these files); never assume the staleness margin held.
- **Two stale provenance citations** at `docs/_standards/EEE-SOP-standard.md:578` and `:649` point at an archived Phase-151 context file. No gate catches them (inline code, not links). Left unedited on purpose at v1.21 close; worth noticing if Phase 157's hygiene pass touches that file, though it is not a named HYG requirement.
- **`e1`, `e2`, `ee`** are stray 2026-08-04 debug-output files at the repo root, noted in PROJECT.md Key Context as housekeeping — delete opportunistically in whichever v1.22 phase first touches the working tree root, not itself a requirement.
- **`D-00a` exception: `scripts/validation/check-phase-135.mjs`'s `RECIPE` check (Phase 155, D-10, owner-ruled 2026-09-02).** The D-00a doctrine ("non-current-milestone predecessor frozen surfaces BYTE-UNCHANGED except explicitly-scoped exceptions") is scoped OUT for this one check body and its one retired constant only — no other assertion in the file, and no other file, is touched under this exception. Scope: the `RECIPE` check's body (now asserts existence, non-emptiness, verbatim H1, and two content needles) and the deleted `EXPECTED_LINE_COUNT = 328` constant. Reason: RCP-07 mandates three prose corrections to `docs/recipes/03-windows-11-multi-app-kiosk.md` (RE-224), which the retired equality pin made an immediate apex failure by arithmetic alone — proven by CONTEXT.md D-09's perturbation experiment (appending one blank line took the apex `check-phase-153` from 111 PASS/0 FAIL to 110 PASS/1 FAIL) and reproduced independently in plan 155-01 Task 2. Measured safety: no validator names `check-phase-135.mjs`'s call site or the `V-135-RECIPE` assertion name outside the file itself (`grep -rn "check-phase-135" scripts/ .github/` and `grep -rn "V-135-RECIPE" scripts/ .github/` both re-run clean in plan 155-01 Task 2); it is absent from the `PRED_BLOBS` frozen-blob maps in `check-phase-69.mjs:46` and `check-phase-70.mjs:88`; `.github/workflows/audit-harness-v1.19-integrity.yml:117` only invokes it and still exits 0 after the edit. **Forward note for HARN-05:** the close-time byte-unchanged re-measure must find this entry as the explanation for `check-phase-135.mjs`'s predecessor diff, not report it as unexplained drift. **Supersession:** Phase 151's D-48 ("Recipes 03 and 04 are not touched. Their line-count pins (328 and 301) make any edit an immediate red") is superseded by RCP-07 for Recipe 03 only — Recipe 04's own `check-phase-136.mjs` `EXPECTED_LINE_COUNT = 301` pin is untouched and out of scope. **Forward note for Phase 156:** RE-224's line count is now unpinned by `check-phase-135.mjs`, but its five remaining `V-135-*` content assertions (`ROLLBACKORDER`, `RECIPE01ZEROEDIT`, `XMLFENCE`, `NAMESPACETABLE`, `ANTIFEATURE`) and `V-135-SELF` still apply and must not be disturbed by the STYLE-02 batch-10 pass.

- **Phase 158 closed 2026-09-08 with three open watch items, none blocking.** (a) WINDOWS #16: one spaced em dash at `docs/recipes/02-shared-ipad-full-provisioning.md:286`, the accepted link-adjacency sweep-guard class (rows 12/14); the plan forbade the fix path. (b) `158-REVIEW.md` CR-01/WR-01/WR-02 on `scripts/docs-style/audit-claimed-fixes.mjs`: vacuity guard false-FAILs a sole legitimately-zero assertion, top-level CLI dispatch runs on import, `--drift` mode has no self-test — none affects the shipped 46-row audit; fix with `/gsd-code-review 158 --fix` or carry to the v1.22 deferred-cleanup file. (c) `158-GATE-BASELINE.json` `discharge.sc4` text says 8 drift rows while the array holds 9 (descriptive miscount only). `/gsd-secure-phase 158` has NOT run yet — security enforcement is on, so it is required before Phase 159 advances.

- **Phase 158 decision-coverage gate override (2026-09-08, plan-phase).** `check.decision-coverage-plan` returned `passed:false, reason:could-not-parse` because 40 of the 71 `D-NN` bullets in `158-CONTEXT.md` wrap their bold lead-in across lines and/or carry a second colon inside the bold (a `file:line` cite), which `decisions.cjs` cannot parse; a scratch line-join alone did not make them parse. Coverage was proven independently: a literal-token grep for `D-01`..`D-71` across the seven `158-NN-PLAN.md` files reports zero missing, the planner reported 71/71, and the plan:post gap-analysis reports 33/33 on the subset the parser could read. Proceeded under the workflow's "proceed anyway" branch; verify-phase should re-surface this and confirm coverage by grep, not by the parser.

## Deferred Items

Items acknowledged and deferred at milestone close, most recent first. Acknowledgment is **verdict-preserving and self-invalidating** — it never rewrites an artifact's own verdict, and the suppression lapses automatically the moment the artifact changes, so a stale acknowledgment can never hide a new problem.

**v1.21 close (2026-08-30) — 26 acknowledged.** Every one is an **archived-milestone carry-forward** (v1.0 through v1.17). **Zero** are in v1.21's own scope: v1.21 shipped 58/58 requirements Validated, 9/9 phases verified, and a milestone audit of `passed`. Full 26-row table archived in `.planning/milestones/v1.21-MILESTONE-AUDIT.md` (mirrors the table that lived here through v1.21's own close).

### Not acknowledgeable — carried forward unsuppressed (9)

Nine open items could **not** be acknowledged by any sanctioned path. All nine are GFM **table rows** in `.planning/milestones/v1.16-phases/121-structural-retrofit-glossaries-lifecycle-end-user-guides/deferred-items.md`, belonging to a single deferral, `DEFER-121-07-A` — unfilled `YYYY-MM-DD` Version-History date placeholders in 9 documents, self-rated **Low / cosmetic** by its own author:

```
docs/_glossary.md                                  docs/android-lifecycle/02-provisioning-methods.md
docs/_glossary-linux.md                            docs/android-lifecycle/03-android-version-matrix.md
docs/ios-lifecycle/00-enrollment-overview.md       docs/linux-lifecycle/00-enrollment-overview.md
docs/android-lifecycle/00-enrollment-overview.md   docs/linux-lifecycle/01-linux-prerequisites.md
docs/android-lifecycle/01-android-prerequisites.md
```

**Why they cannot be acknowledged.** For `deferred_items` the suppression marker is the entry's own `status:` field set to `acknowledged`. That works for heading and bullet entries. It cannot work for table rows: `parseDeferredItemsWithStatus` appends rows from `parseDeferredTableItems` with a hardcoded empty status, so no status a human writes is ever read back. The CLI writer refuses them outright, and its own source comments describe table rows as *"permanently un-acknowledgeable via the CLI writer — a known, deliberate limitation"*.

**Why not fixed instead.** The remediation is trivial — fill `2026-07-07` into 9 Version-History rows — but no v1.22 requirement names this fix, so it is not in scope. It remains a candidate for a future milestone's HYG-class requirement.

**They will resurface at every future milestone close** until either the 9 dates are filled by a scoped requirement or `deferred-items.md` gains a table-row acknowledgment path.

## Session Continuity

Last session: 2026-09-10T04:30:06.569Z
Stopped at: Completed 159-12-PLAN.md (wrote both v1.22 close artifacts ahead of the close gate)
Resume file: None
Next action: `/gsd-plan-phase 154`

## Operator Next Steps

1. **`/gsd-secure-phase 158`** first (security enforcement is on and no `158-SECURITY.md` exists), then **`/gsd-discuss-phase 159`** — the HARN harness-close phase has no CONTEXT.md yet. Phases 154-158 are complete and verified (30/30 plans); the landing branch `v1.22/154-style-landing` is 170+ commits ahead of local `master` and nothing has been pushed this milestone — the push is Phase 159's HARN-06. Optional before 159: `/gsd-code-review 158 --fix` for the three audit-runner findings.

2. **`V121-PIN-DEFERRAL` is MANDATORY at the v1.22 close (Phase 159)** — the sixth link in an unbroken back-anchor chain (V117 → V118 → V119 → V120 → V121). Phase 159 must add to `scripts/validation/_lib/frozen-at-close.mjs`:
   - `MILESTONE_CLOSE_SHAS.V121 = 'e129081e'` — **inserted before the `V14` entry, never appended.**
   - `readAtV121Close` / `lsTreeAtV121Close` exports, following the V18..V120 single-entry pattern.
   - Recover the SHA with the **subject-line pair discriminator** (returns count=1), never the naive dual-token `--grep --all-match` form:
     ```
     git log --all --format="%H|%s" | awk -F'|' '$2 ~ /v1\.21/ && $2 ~ /MILESTONE CLOSE/'
     ```
     Already recovered and confirmed at v1.21's own close: `e129081e`. Re-verify before trusting it.

3. **Also open at this roadmap's creation:**
   - `C17-FROZEN-AWARE-RESIDUE-V21` — `v1.21-milestone-audit.mjs` is live-HEAD by construction, because no `V121` pin exists yet. Resolves when Phase 159 lands.
   - **9 un-acknowledgeable audit items** (see `## Deferred Items` above) — not in v1.22's requirement scope; will resurface at the v1.22 close unless a future milestone scopes their fix.

4. **Durable close-time carve-outs for this repo** (sixth consecutive milestone applying them):
   - **Never `git rm .planning/REQUIREMENTS.md`.** `check-phase-54.mjs` live-reads it outside the frozen-at-close mechanism.
   - **`.planning/ROADMAP.md` is also live-read** by `check-phase-54` (`V-54-21`/`V-54-32`: the off-by-one compliance-policy filename must be absent, and the file must be non-empty). This roadmap was authored with zero occurrences of that filename — verify `check-phase-54.mjs` still passes after any future edit to this file or to ROADMAP.md.
   - **The `milestone.complete` summarizer cannot be trusted at face value.** Two consecutive closes undercounted tasks and scraped deviation-log fragments into MILESTONES.md as accomplishments. Rewrite the entry, the task count, and these Operator Next Steps by hand at the v1.22 close.
