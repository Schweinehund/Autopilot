# Phase 156: STYLE Extension & Full-Landing Verification - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-09-04
**Phase:** 156-style-extension-full-landing-verification
**Areas discussed:** Batch-10 shape & rule sets, Judge geometry & verdict record, Em-dash canon on the 13, Before/after gate artifact
**Method:** `/gsd-discuss-phase` + `/grill-me` + `/adversarial-review`, at the owner's explicit direction — the owner asked that additional questions be raised in each area and that each pick be adjudicated adversarially with reasoning, rather than answered back to them one at a time.

---

## Area selection

| Option | Description | Selected |
|--------|-------------|----------|
| Batch-10 shape & rule sets | Commit granularity, TSV reuse vs authoring, the HP file's 24 `Sure Admin` hits | ✓ |
| Judge geometry & verdict record | judge-packets geometry, verdict file shape, chunking, agent type, SC#3 artifacts | ✓ |
| Em-dash canon on the 13 | Normalize or leave; mechanism given `do_em = False` | ✓ |
| Before/after gate artifact | Artifact shape, baseline path resolution, link-differ BASE, explained deltas | ✓ |

**User's choice:** All four, plus an explicit instruction to use `/grill-me` to expand the question tree and `/adversarial-review` to evaluate each question and recommend the best answer with reasoning.
**Notes:** This matches the Phase 154 and Phase 155 precedent on this repository, where the same three-command combination was used for gray-area picks.

---

## Method and outcome

A draft decision set was written first, with every claim measured against the repository at HEAD `ce9b0b73`. It was then attacked by five parallel Finder agents (one per area plus a cross-cutting agent hunting omissions and boundary defects), an Adversary scored to disprove findings at double penalty for wrong disproofs, and a Referee scored for accuracy.

| Stage | Result |
|---|---|
| Raw findings | 104 across 5 Finders, 518 points |
| Deduplicated | 71 |
| Adversary | 11 disproved, 60 confirmed, score +59 |
| Referee | 2 Adversary disproofs overturned, 9 upheld, 1 wrongly-conceded finding struck |
| **Final** | **61 confirmed — 18 CRITICAL, 31 MEDIUM, 12 LOW** |

All seven agents operated read-only and verified `git status --porcelain` byte-identical at start and end. `sweep3.py --apply` ran only against scratch copies outside the repository.

---

## Area 1 — Batch-10 shape and rule sets

| Option | Description | Selected |
|--------|-------------|----------|
| Reuse the existing 34 `subs-*.tsv` | They cover the same doc families | |
| Author new batch-10 TSVs from scratch | The existing sets appear inert | |
| **Reuse sequentially, then author for the residue** | 31 free edits first, then rules for the ~244 real worklist | ✓ |

**Outcome:** The draft picked "author new", on the measurement that every `subs-tense-*` and `subs-should-*` set reports 0 edits on the 13. The Adversary reproduced those numbers exactly but showed the framing was wrong: run **sequentially with `--apply`**, the way a real batch runs, the existing sets deliver **31 edits across 6 files for zero authoring effort**. The Referee upheld this. The draft's denominator was also inflated — 80 of the 106 `admin` hits are `admin center`, exempted by sweep3's own rule, so the real worklist is ≈244, not 324.

**Reversals in this area:** the commit split moved from doc family to edit kind (the family split has all four commits doing the same kind of work, and orphaned the phase's largest work item); the `Sure Admin` detector was replaced (`grep -c … docs/` without `-r` hits the "Is a directory" error path and prints 0 unconditionally — it can never fail); `[PILOT]` was corrected from 27 to 28; and the `> **Ask the admin:**` protection claim was withdrawn entirely — `check-phase-136` counts 5 in one file, `docs/recipes/04-android-dedicated-mhs-multi-app.md`, which is not among the 13.

**The largest single finding in the whole review landed here.** `pins2.py:41-42` reads validators from the live repo but the corpus from the scratch repo, so `_CONTENT-PINS.txt` protects only 39 of the 117 validator literals present in the 13. Two Finders found this independently. `check-phase-151.mjs:173` requires a verbatim sentence that sits in editable prose, contains a `below` this phase is obliged to rewrite, and is unpinned.

---

## Area 2 — Judge geometry and the verdict record

| Option | Description | Selected |
|--------|-------------|----------|
| `checkpoint:human-action` handing back to the main session | The executor has no `Agent` tool | |
| Escalate the blocker to the owner | Treat it as unsolvable inside a plan | |
| **`claude -p` as a fresh process from `<task type="auto">`** | Uses the executor's `Bash` grant; matches the fresh-process precedent | ✓ |

**Outcome:** The draft correctly established that `gsd-executor` has no `Agent` tool, then proposed a checkpoint. The Adversary tested rather than argued — `claude -p` answers non-interactively with no parent context, and the executor has `Bash` — so the blocker is not structural. The Referee agreed and raised the finding to CRITICAL because it overturns the draft's one declared blocker. Both precedents the draft cited had also failed on inspection: `112-04` is `checkpoint:human-verify` running a fresh **shell**, not an agent dispatch.

**Notes:** This also mooted the anti-pattern #10 question. The project `CLAUDE.md` reaches every subagent type identically, so `general-purpose` never bought a contamination advantage over a gsd-* agent — the pick was spending a bold NEVER for nothing.

**Other reversals:** the modal subset was corrected from 52 to 114 (the draft silently dropped `must`, which alone is 50 and is the class the STRENGTHENED bias turns on); the "386 re-emit" figure was wrong in both directions; and the clean-tree remedy was found to be already-falsified prior art, logged as `WINDOWS.md` row 10 and still open. The verdict-record shape (sibling vs append) survived as a genuine close call and is recorded as such, with the counter-argument preserved.

---

## Area 3 — The em-dash canon on the 13

| Option | Description | Selected |
|--------|-------------|----------|
| Leave the spaced dashes and record the inconsistency | Phase 157 gate-excludes the rule anyway | |
| Normalize by a bespoke scoped script | `do_em = False` means no tool will do it | |
| **Normalize via a 3-row TSV through the unmodified `sweep3.py`** | 447 edits with all five guards live | ✓ |

**Outcome:** The direction survived; almost everything else was reversed. A mechanical em-dash sweep had **already run once** — scratch commit `306b974`, 262 files — so "no tool will do this" was false. The TSV rejection rested on misreading a literal-space load guard. And the draft's hand-rolled classifier dropped five sweep3 predicates, producing 434 instead of the correct **447** and getting nine of thirteen per-file rows wrong.

**Notes:** The two Finders disagreed about whether tight is the landed canon, and the Adversary settled it by measurement rather than argument: **43** editable spaced dashes outside the 13, not the ~146 the cross-cutting agent reported using its own classifier — the same defect it had been warned about. 91% of the corpus's editable spaced dashes live inside the 13, so normalizing removes an asymmetry rather than creating one. Phase 157's SC#2 excludes the rule from a *gate*, which is not a ruling that prose stays spaced.

**Scale correction:** the draft billed this as ~434 adjudications and the likely place for an owner "no". With the real mechanism it is one command plus a review, with ~34 genuinely adjudicable sites — 19 soft line breaks, 6 indentation losses, 9 run-in description lists.

---

## Area 4 — The before/after gate artifact

| Option | Description | Selected |
|--------|-------------|----------|
| Two-point before/after with a zero-residual target | Simple side-by-side | |
| **Enumerated dispositioned residual, embedded comparison with a drift check** | The zero target is unsatisfiable | ✓ |

**Outcome:** The artifact shape and the resolver survived. Two claims did not. "Zero structural drift" is false — `verify2.py` Part A and `resolvedOk` both moved under Phase 155; only `INTRODUCED 0`, the actual gate signal, survives. And "drive the residual to 0" is **unsatisfiable without fabricating a Microsoft quotation**: the last site is `desired` inside a verbatim citation at `08-windows-app-updates.md:266`, with all three escapes blocked — and no requirement asks for zero in the first place.

**Notes:** Two Finder attacks on this area were themselves disproved by the Referee. SC#1 is *not* unsatisfiable — `--no-headings` and `_CONTENT-PINS.txt` are two milestone-wide constraints owned by STYLE-04 and STYLE-06, named in one breath, and Phase 154 resolved the identical looseness with a correction note rather than an amendment. VERIFY-04 is *not* unamended-and-unmeetable — "before **and** after … at the same commit on both sides" means five components at one commit **per side**, and the mechanical residual is not one of the five. So the draft's "no amendment required" conclusion held, for corrected reasons.

---

## Claude's Discretion

- The mechanism for live-corpus pin coverage — regenerate, argv-ify `pins2.py`, or add a separate literal check — provided the phase does not proceed on the false claim that the current pin file protects the 13, and STYLE-06's 562-pin invariant is preserved or amended deliberately.
- The `--chunks` value, provided it is justified against the skill's committed `--chunks 10`, derived from the real 114/102 modal subset, and paired with an empty-bin guard.
- JSON key names and nesting inside `156-GATE-BASELINE.json`.
- Commit message wording, and whether the `judge-packets.py` fix rides with a tooling commit or its own.

## Deferred Ideas

- The 43 editable spaced em dashes outside the 13, and the 14 en dashes plus 1 spaced ASCII `--` inside them → Phase 157 or backlog.
- A merge-marker / conflict gate as a standing validator → carried from Phase 155.
- `pins2.py` and `verify2.py` cross-repo geometry rework beyond the minimum.
- `judge-packets.py` alignment quality — greedy `difflib` pairing with no consumption → backlog.
- A corpus-wide evidence-label taxonomy → Phase 157.
- `V-132-HUBSNOTWIRED` / `V-137-HUBSNOTWIRED` regex repair → carried from Phase 155.
- `.gitattributes` `* text=auto eol=lf` → Phase 159.
- `docs/index.md` and `docs/_registry/RE-index.md`, touched by Phase 155 and outside the 13 — measured impact nil, recorded not acted on.
- The Phase 157 handoff contract naming which classes are permanent gate exclusions and why.
