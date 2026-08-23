# Phase 148: Application Update Management & WinGet Routing - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-23
**Phase:** 148-application-update-management-winget-routing
**Areas discussed:** Autopatch↔Hotpatch seam · `08`↔app-lifecycle seam and WinGet weight ·
`co-management/03` prerequisite conflict · `00-overview.md` touch 4-of-4 · the bounded research pass ·
the WinGet reconciliation · H2 skeletons for `07`/`08` · plans, commits, gates and anchors

---

## Method

The user selected **all eight** gray areas and directed: *"Use /grill-me to thoroughly raise additional
questions in each of the areas and use /adversarial review to evaluate each of the questions in each of
those areas to recommend the best one and provide your reasoning."*

| Stage | Output |
|---|---|
| `/grill-me` | 65 sub-questions across the 8 areas, each with a graded recommendation and evidence |
| `/adversarial-review` — 5 parallel Finders | 765 points raw (A 156 · B 212 · C 128 · D 105 · E 164) |
| Merge + dedup | 97 issues |
| Adversary | 5 full disproofs claimed, 13 severity challenges, 78 confirmed as filed |
| Referee | **7 false positives · 90 real — 20 CRITICAL / 50 MEDIUM / 20 LOW** |
| Owner rulings | 3 (OR-1..OR-3 below) |

Finders were instructed to treat every `[MEASURED]` label in the draft as an unverified assertion and
re-run it. Finder C ran destructive probes against `00-overview.md` (edit → run validator → restore) and
left the tree clean; the apex was re-measured at 101/0/0 afterwards.

---

## Owner rulings

### OR-1 · `## Setting the Channel from Intune`

| Option | Description | Selected |
|--------|-------------|----------|
| Fetch, non-blocking, drop H2 on failure | Research attempts the fetch; success ships the H2, failure drops it and states the absence. Honours ROADMAP's research flag without contradicting REQUIREMENTS' deferral. | ✓ |
| Out of scope — honour the deferral | `REQUIREMENTS.md:140` wins; no H2, no fetch item. Smallest phase. | |
| In scope and blocking | ROADMAP's flag wins; the fetch must succeed or the phase escalates. | |

**Notes:** A genuine governing-document conflict — `REQUIREMENTS.md:140` defers the Intune-side
Microsoft 365 Apps policy surface **beyond v1.21** under `## Future Requirements`, while
`ROADMAP.md:152` names it under Phase 148's Research flag. The draft took the scope-growing side
silently *and* graded the item as blocking the phase. Recorded as CONTEXT D-02; supplies the plan-3
contingency the draft lacked.

### OR-2 · `00-overview.md:57`'s falsified hotpatch cell

| Option | Description | Selected |
|--------|-------------|----------|
| Leave it; file as v1.22 backlog | No requirement covers it, FIX-07 is complete, and Phase 145 excluded the cell deliberately. Backlog entry carries the evidence. | ✓ |
| Correct it, with corrected cell text | Overrule the scope objection but fix the content error — no date claim, no Livepatch. | |
| Re-open FIX-07 as an amendment | Land it under an `[OWNER-RULED]` FIX-07 amendment marker in REQUIREMENTS.md. | |

**Notes:** The cell reads `Hotpatch (Win 11 Ent 24H2+ default May 2026) + VBS prereq` — the May-2026
cutover this milestone's own research falsified. The drafter argued for correcting it and was wrong
three ways: no requirement authorises it, FIX-07 is `- [x]` complete, and `145-CONTEXT.md` D-17 shows
FIX-07 was **deliberately excluded** from the `00-overview.md` atom. The proposed replacement text was
independently wrong — it put Canonical's **Livepatch** in the **Windows** column, where column 6 already
carries it for Linux, and measured 32/0/0 green because `V-54-29` strips table rows before testing.
Recorded as CONTEXT D-03 and as a deferred idea.

### OR-3 · The two hotpatch research items

| Option | Description | Selected |
|--------|-------------|----------|
| Fetch the page; Pro stays unconfirmed | Add `windows-autopatch-hotpatch-updates` to the fetch list (sole first-party source for APP-02's licence list); Windows 11 Pro stays flagged unconfirmed, mirroring `01:144-145`. | ✓ |
| Fetch both; resolve Pro this phase | Also make the Pro question a first-class research item requiring a definitive answer. | |
| Fetch the page only; drop the Pro task | Formally close the Pro question as out of scope for v1.21. | |

**Notes:** `PITFALLS.md` C1-9 records **two agents each "re-fetching and verifying" the hotpatch licence
sentence and reaching opposite conclusions**, one having received a stale revision. The draft's fetch
list omitted the page entirely while requiring `07` to carry the list from it. Recorded as CONTEXT D-04,
with the stale-revision tells (`Build 26100.2033`, `an x64 (AMD/Intel) CPU`) written into the plan.

---

## Area 1 · Autopatch ↔ Hotpatch seam

**Draft position:** `07` is a delta; both licence lists ship side by side; cross-link `01#hotpatch` and
`01#ring-terminology`; hotpatch-on-Pro out of scope; state the Autopatch-vs-EAM cloud availability
difference and pre-flag it so code review does not surface it.

**Outcome:** delta and the dual licence lists confirmed — but the framing was inverted. The drafter
flagged the duplication as its second-riskiest decision; `ROADMAP.md:147` SC#2 and `REQUIREMENTS.md:61`
**mandate** it, and its 147 D-49 citation was a category error. `01#ring-terminology` **does not exist**
(the anchor is at `00-overview.md:66`); a live probe took `check-nav-hub-links` from 0/0 to 1 corpus-link
failure. `grep -rn "#hotpatch" docs/` = 0, so "`06` already links into it" was fabricated. APP-01's
**named** disambiguation anchor (`01:66`) was never identified. The Autopatch-vs-EAM "conflict" is two
different products, and the instruction to pre-silence code review was withdrawn.

## Area 2 · `08` ↔ `app-lifecycle/` seam and WinGet's weight

**Draft position:** `app-lifecycle/` owns install and manual replacement, `08` owns unattended currency;
every EAM auto-update sentence links `01#supersedence`; two WinGet H2s out of roughly eight.

**Outcome:** the seam was falsified by all three corpus files the draft cited.
`app-lifecycle/00-overview.md:73-79` already publishes `update` as a lifecycle state across all four
platforms; `01:63` documents Available-assigned supersedence auto-updating on the IME timer; and
`STACK.md:381` says EAM auto-update uses *"no new app object and no supersedence relationship"* — the
link rule pointed readers at the mechanism Microsoft says EAM does not use. Replaced with an
object-model-versus-update-governance seam. The two-H2 sizing rested on a denominator error (APP-01/02
live in `07`, so `08` holds four requirements) and on reading `WINGET-GAP.md:308`'s *"one or two"* —
a **requirement-ID** count — as an H2 count. Restored to §6's four subsections.

## Area 3 · The `co-management/03` prerequisite conflict

**Draft position:** treat the two-vs-three workload question as a research question; if research says
two, correct `03` by attribution and re-stamp; if three, correct `STACK.md`.

**Outcome:** the research question survives; the correction is deleted. `REQUIREMENTS.md:129` — the
draft's sole cited authority — records *FIX-01's* Phase-145 incursion and restates *"cross-link only, do
not re-author"*. APP-01 closes *"re-authoring neither"*; SC#1 requires *"prerequisite literals intact"*.
The claim spans six sites in three files, one of which is under owner-ruled 146 D-72. And the proposed
evidence-line shape is barred by the three decisions the draft cited in its favour. The Adversary
disproved the Finder's "at minimum is a floor, so no conflict" reading — `03:54-58` and `STACK.md` §C-1
cite **the same page at the same date** and read it incompatibly — so the conflict is real and goes to
research as a narrow question: *is Office Click-to-Run Apps a documented Autopatch prerequisite?*

## Area 4 · `00-overview.md` touch 4-of-4

**Draft position:** routing bullets and Related Resources entries; correct the falsified hotpatch cell;
no new comparison-table row; conditional re-stamp.

**Outcome:** the additive edits and the no-new-row conclusion survive; both supporting arguments were
falsified. `V-54-08` is presence-only and a data row cannot fail it — the real rule is 147 D-34's
one-physical-line constraint. Two unnamed `V-54-29` leaks were measured: the em-dash **description**
after a link is not stripped (a natural Related Resources entry mentioning Hotpatch measured 31/1), and
a **wrapped** link leaks its text because the strip regex does not cross newlines. The hotpatch cell went
to OR-2. The re-stamp mechanism was refined — `V-54-07` has no lower bound, so advancing `last_verified`
*past* `review_by` passes silently while advancing `review_by` alone fails loudly.

## Area 5 · The bounded research pass

**Draft position:** eight fetch items, four graded; `gh api` on backing repos; verifier re-fetches.

**Outcome:** expanded to nine items with a failure policy for **every** one. The sole first-party source
for APP-02's licence list was missing (OR-3). The retrieval method was falsified for this phase's own
list — `146-RESEARCH.md:99` measured `MicrosoftDocs/windows-itpro-docs` unreadable on every branch, and
that is where the `DesktopAppInstaller` CSP page lives; `147-VERIFICATION.md:150`'s curl + tag-strip
method is the applicable precedent, and the draft cited 145 and 146 while skipping 147. Items (a) and
(g) target an artifact class `145-VERIFICATION.md:99` already measured as un-fetchable (client-side
rendering). 147 D-21's Source-line **scope** rule was absent.

## Area 6 · The WinGet reconciliation

**Draft position:** two corpus sites, reconciled in the routing H2, neither edited.

**Outcome:** confirmed and extended. A **third** site states the conflation in the corpus's own Reference
voice and the `winget` grep misses it — `docs/reference/macos-capability-matrix.md:70`'s *"Microsoft
Store integration | Yes (Windows Package Manager)"*. `WINGET-GAP.md` §2.2's SYSTEM-context root cause —
the most Autopilot-relevant WinGet fact, naming device-preparation ESP explicitly — was owned by nobody.
The verbatim FAQ negative and its anti-fabrication guardrail had no decision. The reconciliation is
knowingly unreachable from the two files that cause the confusion; recorded as an accepted gap with the
inbound wiring handed to Phase 152.

## Area 7 · H2 skeletons for `07` and `08`

**Draft position:** nine H2s each, seven anchors each, mirroring `06`.

**Outcome:** both skeletons rebuilt at ten H2s / eight anchors, matching the measured `05` and `06`
precedent the draft cited but did not follow — and needing *more* H2s, not fewer, once the coverage gaps
were found. `## Enrolment and Prerequisites` would have been the corpus's **first British-spelled
heading** (`Enrollment` = 5,481 occurrences, `Enrolment` = 5, British-spelled headings = 0), in the file
whose slugs Phase 151 links; 146 D-39 had already ruled on exactly this. `## Setting the Channel from
Intune` sat on the OR-1 conflict. The callouts-H2 census was stale — seven files, two under
`docs/operations/`, because Phase 147 shipped `05:382`.

## Area 8 · Plans, commits, gates and anchors

**Draft position:** four plans, two waves with plans 1-3 parallel, nine gates, canary bump 225→227.

**Outcome:** three plans (the `co-management/03` plan deleted with Q3.2), **strictly sequential** waves —
146 ran three, 147 ran two, and `use_worktrees: false` is a durable constraint. All nine gate baselines
verified three times independently and carried forward unchanged. The canary hand-off was wrong in both
number and method: zero of the 225 registry rows point into `docs/operations/`, so Phase 152 lands
roughly ten rows, and `REQUIREMENTS.md:98` (INT-03) requires the target be **computed from the registry**
and never hard-coded from a document count — so the rule is handed forward, not a number. The nine gates
were documented as asserting almost nothing about the new files, which sit outside `PATCH_FILES`, C17 and
the registry.

---

## Claude's Discretion

Prose wording; H2 names except the pinned callouts literal and the four §6-mapped WinGet subsections;
`**Source:**` article titles; the Related Resources insertion point within the Windows-contiguous block;
edit order within each commit; whether `PerpetualVL2021` is mentioned or omitted; the phrasing of the
three seam statements.

---

## Deferred Ideas

Nine, recorded in CONTEXT `<deferred>`: the falsified hotpatch cell (OR-2); the Windows 11 Pro
eligibility question (OR-3); `co-management/03`'s stale licence parenthetical and its planning-ledger
citation; the three-workload claim in the two unowned co-management files; the
`macos-capability-matrix.md:70` conflation; `docs/operations/00-index.md:32`'s stale "4-platform"
description; the 217-file past-due population; and Windows glossary terminology.
