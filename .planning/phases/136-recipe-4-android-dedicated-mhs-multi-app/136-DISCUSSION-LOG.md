# Phase 136: Recipe #4 — Android Dedicated, MHS Multi-App — Discussion Log

**Date:** 2026-08-03
**Mode:** `/gsd-discuss-phase 136 --chain`
**Human reference only.** Downstream agents (researcher, planner, executor, verifier) read `136-CONTEXT.md`, not this file.

---

## Gray Area Selection

**Question:** Which areas do you want to discuss for Phase 136 (RE-225 Android Dedicated MHS multi-app)?

Options presented:
1. **MHS config surface + payload format (DOMINANT)** — which Intune surface the recipe works, and whether the settings payload ships as a column-0 ```json fence + key-decomposition table or pure click-path + settings table.
2. **Fork taxonomy + decision-block shapes (gray area #6)** — "Case-1b" (PROJECT.md footer) vs "Case-2" (FEATURES.md:127); plus MHS-03's sign-in block and MHS-04's physically-separated hardening.
3. **Table architecture + C17 #11 row budget (gray area #7)** — whether anti-feature, provisioning-fork and failures tables merge, and whether that crosses the >25-data-row threshold.
4. **Shared anchor (gray area #8) + Rollback/Recovery (D6.1 f)** — where a kiosk/dedicated taxonomy anchor can live given the pin minefield, and whether RE-225 carries `## Rollback/Recovery`.

**User selected:** All four, with the instruction: *"Use /grill-me to thoroughly raise additional questions in each of the areas and use /adversarial review to evaluate each of the questions in each of those areas to recommend the best one and provide your reasoning."*

Two areas were offered as Claude's discretion unless the user wanted them (verification admissibility of the deliberately-break-it PIN checks; HYG-06 spot-verification depth). Both were subsequently pulled into the adversarial rounds and ruled explicitly.

---

## `/grill-me` — 30 questions across 4 areas

Codebase-answerable questions were resolved by reading, not asked. Each question carried a recommended answer with its evidence.

| Area | Questions | Notable recommendations |
|---|---|---|
| 1 — MHS config surface + payload | Q1.1-Q1.10 | App Configuration policy as the sole worked surface; "Enter JSON data" over the Configuration designer; column 0; one fence; the sign-in-key-in-fence vs debug-menu-key-out asymmetry; the GUI label mismatch; four-column decomposition table; no markers inside the fence |
| 2 — Fork taxonomy + block shapes | Q2.1-Q2.8 | Case 2 for the provisioning fork; the Knox/ZT exclusion via anti-feature row + prose; SDM arm routing to the anchor; token type as a confirm-and-route Step 1; sign-in block placement; MHS-04 separation; exactly three decision blocks |
| 3 — Table architecture + row budget | Q3.1-Q3.6 | No merge; unconditional prose summary under the decomposition table; bounded key set; failures-table routing; `Worked value` column; a `> **Note:**` does not satisfy C17 #11 |
| 4 — Shared anchor + Rollback/Recovery | Q4.1-Q4.7 | No new taxonomy anchor; Scope banner overflow; **no `## Rollback/Recovery`**; file identity; HYG-06 no-bump; verification admissibility split; two plans |

---

## `/adversarial-review` — three full rounds

Pattern per round: 3 parallel Finders (MECE chunks) → Adversary (scored to over-dismiss, loses 2× for wrong calls) → Referee (scored for accuracy).

| Round | Target | Findings | Adversary disproofs claimed | **Referee confirmed** | Missed by all agents |
|---|---|---|---|---|---|
| 1 | the 30 grill-me rulings | 82 (129 + 93 + 160 pts) | 69 | **27** | 3 |
| 2 | the R1-amended set | 69 (143 + 118 + 157 pts) | 54 | **23** | 3 |
| 3 | the R2-amended set | 52 (108 + 99 + 158 pts) | 43 | **13** | 1 |

### Round 1 — five CRITICAL confirmed
1. R1.7's premise was **factually false** — the anchor states the two PINs must match four times (`05:245/251/253/255`), making the "delta" claim into re-authoring.
2. R2.1's Case-2 test was **self-refuted** by R2.3 in the same set, and its only corroborating citation was contested.
3. R4.3's safety valve was **structurally void** — the failures table is fixed at three columns and cannot carry a recovery procedure.
4. SC1's **Android-15-FRP cross-link clause had zero carrier**, and R4.3 actively negated it.
5. The "complete" payload would have **unset the exit PIN** on paste.

Plus 15 MEDIUM, 7 LOW, and three items no agent raised (designer-label sourcing charter; the Steps-callout runbook rule; unruled `## See Also`).

### Round 2 — the meta-finding
**Five of round 1's own fixes introduced fresh unsourced premises — the exact defect class they were fixing.** The Referee: the fixes acted "by *asserting a mechanism* rather than by *sourcing one*."
- R1.5's "the editor replaces the entire payload" — **zero corpus hits**, invented.
- R1.8's "only three designer labels exist" — false against four lines in the file it cited.
- R4.9's "the only other candidate home" — false; `## Verification` is unconditional.
- R3.7's "live for the first time" — false; RE-223 had targets and declined.
- R3.8's "roughly nine blockquotes" — false; the corpus ships 1/4/6.

Round 2 imposed two process rules: a **sourcing pass** (every "the repo supplies X" / "X is the only Y" claim carries a file:line or is struck) and a **conditional-ruling budget** (every deferral states why the answer is not already in the repo). Four of six deferrals closed as a result.

### Round 3 — the thesis failed, one substantive finding survived
Three Finders argued the defect class had shifted to "fix-collisions" and that the set lacked a closure step. The Referee ruled the **thesis failed**: all ~20 alleged collisions dissolved when the paired rulings were read together, several refuted by the other ruling's own text. **Zero architectural defects survived.** Ten of 13 confirmed items were coordinate/attribution typos; two were one-word wording fixes.

The one substantive finding: **the Step-2→Step-6 no-exit-PIN window** (D2.9a). The Referee also broke the alleged H-01/H-08 contradiction — the hazard is *PIN in zero policies*, not *PIN in one policy*, so it is branch-independent and both rulings stand.

Two adjudications went against the prior round's reasoning:
- **R2.1's grounding.** `ROADMAP.md:84`'s definite singular is *not* "textual and unanswerable" — silence is a gap, not a lock. `EEE-SOP-standard.md:479`'s "no procedure fork" is the decisive ground instead. Right outcome, over-claimed rationale.
- **R4.3.** "Un-anchored" means *the anchor does not own it* — delta discipline's licence to author — not "unsourced". And no `REQUIREMENTS.md` line is needed: D6.1(f) hands the case to Phase 136.

### Missed by all nine agents across three rounds
**Indented blockquotes are invisible to C17 `#12`** — the validator tests `/^>/`, column-0 anchored. Recipe 02 indents three of four callouts and all three `Ask the admin` lead-ins, as does `recipe-template.md:112-113`. Ruled deliberately (column 0 for all) rather than left for mid-authoring discovery.

---

## Rulings that changed across rounds

| Ruling | R1 | R2 | R3 (final) |
|---|---|---|---|
| `## Rollback/Recovery` | omit | conditional, Plan-1-gated | **SHIPS** — 8 H2s, position fixed |
| Exit-PIN label line | RE-225-owned delta | one host sentence, droppable | **one host sentence, closed** — SC2's marker carrier |
| Provisioning fork | Case 2 (self-refuted test) | Case 2 (definite singular) | **Case 2** (`EEE-SOP:479` no-procedure-fork) |
| Fence key set | "complete payload" | two gated branches | **one branch survives**, gated on D1.1 |
| Decision blocks | three | three | **five** (2 Case-3 prompts counted) |
| Verification | two deliberately-break checks split | "only positive forms: [2 items]" | **7 lines** — "only" struck |
| Designer-label column | conditional, mostly em-dash | always exists, cells vary | unchanged; fetch extension deleted |

---

## Deferred Ideas Captured
Option B taxonomy Reference doc · the anchor's past-due `review_by` · the six-site `c17:150→:158` coordinate correction · the second Rollback/Recovery template divergence (2-of-4) · ANDROID-APPDEPLOY-01 · RCPFUT-04/05 · a mechanical `[SRC]` re-resolution check.

## Claude's Discretion
Prose wording throughout · whether M-A lands as a row or a lead-in sentence · which of D2.9a's two resolutions to take · concrete worked values · which failures rows route to a real runbook.

## Process Note
Confirmed counts ran **27 → 23 → 13**, and severity collapsed faster than count. A fourth round was assessed as negative expected value: 8 of round 3's 13 survivors were mechanically findable by a script re-resolving every `[SRC]` file:line against HEAD, and the closure table catches the ninth. That script is logged as a deferred tooling idea.
