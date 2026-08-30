# Phase 151: Recipe #5 — The Enterprise Update Plan - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-26
**Phase:** 151-recipe-5-the-enterprise-update-plan
**Areas discussed:** Decision-block anatomy · Steps spine & branch depth · Recipe-template divergence (RCP-05) · Summary end-state under STD-05 D-06 · Rollback/Recovery shape · Synthesis depth vs cross-link · Frontmatter, filename & doc_id

**Method:** the owner selected all seven areas and directed that `/grill-me` raise additional
questions in each and `/adversarial-review` evaluate every question and recommend the best answer
with reasoning. A 71-question grill draft was written, then reviewed by four parallel Finder agents
(three MECE chunks plus one cross-cutting), an Adversary, and a Referee.

**Review yield:** 112 raw findings → 87 net distinct (25 duplicates removed) → 14 disproved → **73
real issues** (19 CRITICAL, 27 MEDIUM, 27 LOW). The Referee's mandatory missed-issues pass added **8
more that no Finder had raised** (M-1..M-8). Two Adversary disproofs were themselves overturned as
overreach and re-severed rather than dismissed.

---

## Owner rulings

### 1. Doc class — the question the draft never asked

| Option | Description | Selected |
|--------|-------------|----------|
| Amend the class definition | Widen the Device Recipe class to admit a fleet/tenant configuration plan, and widen STD-05 D-06 to accept a fleet end-state. Filed the way Phase 150 D-02 filed its amendment | ✓ |
| Amend D-06 only | Narrower; leaves the class-definition sentence inaccurate and the filename/H1 convention break unjustified | |
| Reposition outside `docs/recipes/` | Honest about what the artifact is, but contradicts RCP-01's explicit `docs/recipes/05-*` | |

**User's choice:** Amend the class definition.
**Notes:** Surfaced only by the Referee's missed-issues pass. The template defines the class as "an
end-to-end, step-by-step provisioning walkthrough" while the draft's own governing rule said the
reader "must open a guide to implement any of them". The STD-05 D-06 question the draft *did* ask was
a symptom. → CONTEXT D-04, D-05.

### 2. Intune click-paths

| Option | Description | Selected |
|--------|-------------|----------|
| Full click-paths, accept the length | Follow the template MUST and the 4/4 precedent; the recipe becomes the only executable artifact in the chain | ✓ |
| Entry-point blade path only | Matches what the guides carry; halves the cost but leaves the chain with no full navigation anywhere | |
| Click-paths for the three Case 1 decisions only | Depth where the reader forks; still a partial divergence needing a record | |

**User's choice:** Full click-paths, accept the length.
**Notes:** The draft's reason for omitting them was measurably false — guides 06 and 07 contain zero
`Intune admin center` occurrences and carry blade locations, not procedures. Drives the line budget
to 600-700 against a class maximum of 328. → CONTEXT D-32, D-33.

### 3. RCP-05 — the template divergence

| Option | Description | Selected |
|--------|-------------|----------|
| Promote + retrofit recipes 01 and 02 | Class becomes genuinely uniform at 5-of-5; fully resolves rather than inverts the divergence | ✓ |
| Promote only, grandfather 01/02 | Cheapest; converts an additive 2-of-4 into a 2-of-5 mandated-section gap | |
| Record the divergence, do not promote | RCP-05's other explicit option; no artifact changes at all | |

**User's choice:** Promote + retrofit 01 and 02.
**Notes:** Reopened by a reversal — the draft claimed editing recipes 01/02 was "an active red", but
those two are pinned only by content needles while 03 and 04 carry hard line-count and H2-skeleton
pins. The constraint was exactly backwards, and the wrong version had foreclosed this option.
→ CONTEXT D-03, D-47, D-48.

### 4. `review_by` interval

| Option | Description | Selected |
|--------|-------------|----------|
| FIX-10's 60-day milestone cadence | Requirement-backed; all 14 guides from 146-150 sit at exactly 60 days; no new convention, no template edit | ✓ |
| The template's +90 days | Strictest class convention-following; recipe outlives its sources by a month | |
| Earliest source date, corrected to 2026-10-18 | Keeps the draft's principle on a corrected measurement; new convention, breaks the template rule, no lower bound | |

**User's choice:** FIX-10's 60-day cadence.
**Notes:** The draft's original answer rested on a fabricated `[MEASURED]` row claiming 2026-10-19
was the earliest source date. It is 2026-10-18 across three files, and the See Also set contained a
document already 60 days overdue — so the draft's own principle produced a date in the past.
→ CONTEXT D-01, D-71.

### 5. D-5's reversibility rating vs RCP-02's "exactly one"

| Option | Description | Selected |
|--------|-------------|----------|
| Scope the rule to the recommended branch | D-5 rates `Reversible — disruptive`; the Current-Channel absence stays fully stated in the consequence cell and in Rollback/Recovery | ✓ |
| Rate D-5 Effectively irreversible, amend RCP-02 | Most faithful to the evidence; costs a second filed amendment and makes SC#2 non-literal | |
| Add a fifth enum value for default-path irreversibility | Precise; invents vocabulary mid-phase and creates two near-synonyms | |

**User's choice:** Scope the rule to the recommended branch.
**Notes:** The draft's worst-case rule and its enum were mutually unsatisfiable — the rule forced D-5
to a second `Effectively irreversible`, breaking the requirement's count, while Area 5 simultaneously
cited that same absence as a flagship irreversibility. → CONTEXT D-11, D-13, D-14.

### 6. Decision-point identity

| Option | Description | Selected |
|--------|-------------|----------|
| Hand-authored descriptive `<a id>`, no visible D-NN | Dodges the double-hyphen slug trap, the STD-05 D-NN namespace collision, and slug fragility in one move | ✓ |
| Heading slugs only | Pure to the recipe class; fragile targets for Phase 152's hub and 153's validator | |
| Visible D-NN labels plus anchors | Trivially greppable; keeps the namespace collision | |

**User's choice:** Hand-authored anchors, no visible D-NN labels.
**Notes:** Four findings clustered here. `### Step 3: **Decision D-1 —** …` slugs to
`step-3-decision-d-1--driver-approval-mode` — a double hyphen — against a link checker with no
allowlist. → CONTEXT D-21, D-22, D-23.

### 7. What goes into the template

| Option | Description | Selected |
|--------|-------------|----------|
| `## Rollback/Recovery` only, prose placeholder | Smallest correct edit; keeps C13's 15/9 allowlist equality intact; kills the scope-creep finding | ✓ |
| Both, adding a live decision block to the template | Makes both conventions durable; far larger than RCP-05 asks | |
| Both, marker line inside the existing comment | Cheap; the comment is deleted at publish time so it enforces nothing | |

**User's choice:** Rollback/Recovery only, prose placeholder.
**Notes:** The draft's proposal to also promote the marker line was found unimplementable — the
template has no live decision block, only worked examples inside a "delete this whole comment block
before publishing" comment. The Referee separately found that a bracketed link in any new template
placeholder would break C13's hard 15-entry allowlist equality inside an apex member.
→ CONTEXT D-50, D-51.

---

## Falsified premises the review caught

| Draft claim | Reality | Landed as |
|---|---|---|
| "2026-10-19 is the earliest `review_by` among the synthesised guides" `[MEASURED]` | 2026-10-18, in three files; 06 not uniquely earliest | D-01 (struck) |
| "Every click-path was authored in 146-150" | Guides 06 and 07 have zero; they carry blade locations | D-01 (struck) |
| "Editing recipes 01/02 is an active red" | Backwards — 03/04 are the hard-pinned pair | D-03 (reversed) |
| "Recipes are unbound" (from `check-phase-54` scoping) | True but irrelevant — C11 binds every `docs/**` file live | D-76 |
| "The Linux row's sourced half" | The Confidence column is empty; `[PREMISE]` prefixes the whole cell | D-43 |
| "Link `05-linux-update-delivery.md`" for a rollback claim | Zero matches for all seven recovery patterns | D-44 |
| "expedite restart 0-2d" restated | Two `expedit` hits corpus-wide, neither about restart grace | D-60 |
| "For most of the mechanisms there is no rollback" | Four of nine, per the phase's own research | D-41 |

## Findings the Adversary disproved (not carried into CONTEXT)

- Template being C17-enrolled makes promotion unsafe — all eleven live assertions measure zero risk
  from a new late H2.
- Editing the archived v1.19 deferred-cleanup file fires a CI cascade — that workflow already fires
  on the close PR through other path entries and runs weekly against live HEAD.
- The v1.19 file's verbatim-transcription mandate bars the edit — the Status line sits outside the
  transcription, and the file names in-place editing as a permitted option.
- `RECIPE-OUTBOUND-LINK-COVERAGE`'s trigger fires — its trigger is conjunctive and the second
  conjunct is unmet; recorded as deliberately carried in D-81.
- "Every `platform: all` file is an index or hub" — false; ~25 files carry it including capability
  matrices.
- Q1.1-vs-Q1.2 inconsistent strictness — D-01 enumerates the column sets explicitly but is silent on
  what sits between lead-in and table.

## Claude's Discretion

Prose wording; the exact Summary sentence; which claims carry inline confidence tags beyond the
FIX-10 evidence lines; wave decomposition and commit granularity within the two-commit constraint;
the `<a id>` slug strings; mechanism ordering inside Rollback/Recovery beyond worst-first; whether
the reversibility enum definition sits in `## Summary` or its own block.

## Deferred Ideas

- Guide-level back-links from the operations guides to Recipe #5 — unowned by any phase.
- Re-stamping `docs/operations/app-lifecycle/00-overview.md` (60 days past due).
- `RECIPE-OUTBOUND-LINK-COVERAGE` — carried; its home is a future tooling milestone.
- L1/L2 runbook coverage for the update domain — measured as entirely absent.
- Google style application to the recipe class — a corpus-wide decision, not a phase-151 one.
