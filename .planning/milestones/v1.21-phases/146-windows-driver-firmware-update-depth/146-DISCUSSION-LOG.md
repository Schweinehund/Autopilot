# Phase 146: Windows Driver & Firmware Update Depth - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-19
**Phase:** 146-Windows Driver & Firmware Update Depth
**Areas discussed:** Dual-scan / ConfigMgr split · Stub anatomy · New guide shape & absences · Sourcing + overview touch

---

## Gray-area selection

| Option | Description | Selected |
|--------|-------------|----------|
| Dual-scan / ConfigMgr split | Where DRV-06's four-step procedure lands; the SC#4-vs-SC#5-vs-PITFALLS conflict | ✓ |
| Stub anatomy — what survives | What DRV-07's stub-and-move actually retains in `01-windows-wufb-rings.md` | ✓ |
| New guide shape & absences | H2 skeleton for `06`; how DRV-03/04/05 absences are presented; ring discipline | ✓ |
| Sourcing + overview touch | The search-summary rows; how far the `00-overview.md` edit goes | ✓ |

**User's choice:** all four, plus — *"Use /grill-me to thoroughly raise additional questions in each of the areas and use /adversarial review to evaluate each of the questions in each of those areas to recommend the best one and provide your reasoning."*

**Notes:** matches the Phase 145 pattern (grill → adversarial-review → owner ratification) and the standing maximum-thoroughness preference.

---

## Method

1. **Pre-measurement.** Ground truth executed at HEAD `b37e63e2` before drafting. Three figures inherited from Phase 145's CONTEXT had already moved: D-54's three-hit C11 map in `01` (now one), D-13's three-hit map in `00-overview.md` (now zero), and ARCHITECTURE.md's `01:151-152` stub coordinates (now `:168-169`, file 231 lines).
2. **`/grill-me`** expanded the 4 areas into **28 sub-questions**, each with a draft recommendation, written to `146-GRILL-DRAFT.md`.
3. **`/adversarial-review`** ran 5 parallel Finders (one per area + one cross-cutting on measurement verification and boundary/ownership), then a sequential Adversary, then a Referee.

| Stage | Output |
|---|---|
| 5 Finders | 64 findings after dedup (8 CRITICAL, 37 MEDIUM, 18 LOW as filed). Scores 54 / 75 / 77 / 76 / 78 |
| Adversary | 8 DISPROVED, 7 CONFIRMED-with-correction. Score 24 |
| Referee | **57 REAL** (6 CRITICAL, 34 MEDIUM, 17 LOW), **7 FALSE POSITIVE**. Overruled the Adversary once |

**Verdicts on the 28 draft picks: 4 UPHOLD, 20 AMEND, 3 REVERSE.** Plus 16 uncovered decision areas.

---

## Area 1 — Dual-scan / ConfigMgr split (Q1.1–Q1.7)

| Sub-question | Verdict | Outcome |
|---|---|---|
| Q1.1 procedure in `01` or `06`? | AMEND | `06` upheld; rationale rewritten (the draft quoted only C1-6's parenthetical and never rebutted *"Add the four-step procedure as a named co-existence path"*) |
| Q1.2 deprecate option 3 in place? | AMEND | Yes, **plus** a `**Source:**` line — the draft corrected a claim in `01` with no evidence line while requiring one in `06` |
| Q1.3 does the withdrawn claim exist in `docs/`? | AMEND | Measurement holds (0 hits). But DRV-06 and PITFALLS attach the phrase to **different mitigations** — ruled C1-6 governs |
| Q1.4 Win10/Win11 scoping | AMEND | Carry it **verbatim** as a `*Note:*` block — C1-6 already renders it quoted |
| Q1.5 optional steps 5–6 | AMEND | Ship, but use the source's own wording; "empty reporting" was an inference beyond source |
| Q1.6 undefined-state warning placement | **UPHOLD** | Verbatim blockquote at step 3 with a `**Source:**` line |
| Q1.7 the Update-Ring-policies sentence | AMEND | Ships verbatim — but **both** stated hazards were disproved by execution |

**Notable disproof (Q1.7):** the draft claimed the sentence would need qualifying in `01`. Inserted verbatim → **32 passed, 0 failed**. `check-phase-54.mjs:197` tests `before.trim()` and `...Using Update` matches the bare `Update` alternative.

**Notable false positive:** a Finder claimed `01:203` (*"This is the strategic fix..."*) is the semantic carrier of the withdrawn claim. Disproved — it asserts **preference**, which C1-6 confirms; the withdrawn half is **exclusivity**. And C1-6's fourth answer leaves the workload on ConfigMgr, i.e. not Autopatch-ready, so `:203` survives untouched.

---

## Area 2 — Stub anatomy (Q2.1–Q2.7)

| Sub-question | Verdict | Outcome |
|---|---|---|
| Q2.1 what moves? | AMEND | 8 movable lines not 9; retained 38 not "~34"; the draft's `34+9=43≠47` did not close |
| Q2.2 is the H2 shortened? | **UPHOLD** (conclusion) / AMEND (rationale) | Byte-identical H2 upheld — but both stated reasons measured false, and the two dispositive documents were never cited |
| Q2.3 blade path moves? | **UPHOLD** | Unchallenged |
| Q2.4 forward-link to `06` | AMEND | Three added constraints, incl. "not between `:186` and `:191`" |
| Q2.5 C11 exposure in `01` | AMEND | Correct but **unpropagated** — the stale map still lives in REQUIREMENTS — and **incomplete**: C11 is four patterns, not one |
| Q2.6 `V-54-11` exposure | AMEND | Extend from "sentence" to **any added byte incl. link targets**; add the v1.20 audit to the gate |
| Q2.7 H1/blockquote/intro | AMEND | Right for those three, dangerously incomplete as a phase rule |

**Q2.2 detail.** The draft defended a byte-identical H2 with (a) "renaming risks the regex" and (b) a D-42 analogy. Both false: `## Driver and Firmware Updates`, `## Driver and Firmware` and `## Driver/Firmware Policy` all PASS `V-54-13`; and D-42's rationale is anchor-slug coupling, which does not transfer because the driver H2 does not own its anchor. The evidence that **does** settle it was never cited — `ROADMAP.md:102` (SC#5) omits "shortened" entirely, and `ARCHITECTURE.md:166` says the stub *"retains the anchor... and the whole dual-scan section"*, so the noun "shortened" governs the section.

---

## Area 3 — New guide shape & absences (Q3.1–Q3.8)

| Sub-question | Verdict | Outcome |
|---|---|---|
| Q3.1 filename / `05-` hole | **UPHOLD** | Author `06-`, do not renumber — and this is what discharges Phase 148's dependency |
| Q3.2 C17 enrollment | **UPHOLD** | No `doc_id`; independently supported by `EEE-SOP-standard.md:325-330` |
| Q3.3 frontmatter | AMEND | Plus: carry FIX-04's naming rule into `06`; "sibling shape" = the five named fields only |
| Q3.4 Platform blockquote | AMEND | Include it — but `V-54-27` binds corpus-wide, and "same shape as `01`" invites forward links |
| Q3.5 H2 skeleton | AMEND (substantially) | Heading renamed to the corpus convention; American spelling; AF-9 and B-5 given homes; the bijection claim deleted |
| Q3.6 absence presentation | **UPHOLD** (conclusion) / AMEND (rationale) | No new PITFALL-N — but for the opposite reason the draft gave |
| Q3.7 elevate DRV-04 | **UPHOLD** | Unchallenged |
| Q3.8 voluntary ring discipline | **REVERSE** | Both the rule and its grounds were wrong |

**Q3.8 detail — the founding error.** The draft's premise was *"`06` is unvalidated, so ring discipline is editorial."* Three Finders independently proved otherwise: C11 in `v1.20-milestone-audit.mjs` live-walks all of `docs/`, is an apex chain member, and DRV-06's own prose trips `\bSCCM\b[^.]*\bIntune\b` and `\bSystem Center\b` (reproduced: 16/0 → 15/1). Separately, the proposed rule *"always `WUfB deployment ring`"* would falsify DRV-03's required verbatim (*"use deployment rings to limit driver installation"*) and F-5's (*"may vary between rings"*).

The Adversary then caught the Finder's proposed fix: **"driver deployment ring" appears in no first-party quote** — one hit repo-wide, a researcher's own row title.

**Q3.6 detail.** The conclusion (no new identifiers) survived, but the rationale inverted the facts: `PITFALL-5`, `-8` and `-13` have zero prose occurrences **because they are live NEGATIVE regression guards**. Zero occurrences is the assertion, not evidence of retirement — and `PITFALL-13` means the ceiling is not 10.

---

## Area 4 — Sourcing + overview touch (Q4.1–Q4.7)

| Sub-question | Verdict | Outcome |
|---|---|---|
| Q4.1 the two search-summary rows | AMEND | Wrong rows identified — see below |
| Q4.2 re-fetch fallback | **REVERSE** | Both branches unsafe |
| Q4.3 supersedence → Phase 148 | **REVERSE** | Phase 148 carries no such obligation; grep returns zero |
| Q4.4 `00-overview.md` scope | AMEND | Three sites not two; and `:85-90` would have orphaned a citation |
| Q4.5 validator exposure | AMEND | Conclusion right by accident; numbers and mechanism both wrong |
| Q4.6 re-stamp | AMEND | Made conditional; and the gate is one-sided |
| Q4.7 commit atomicity | AMEND | Order right, risk assessment inverted |

**Q4.1/Q4.3 detail.** ROADMAP says two **rows**; the draft read it as two **source pages**. `FEATURES.md:11` names them — B-5, AF-6, X-3 — and X-3 is already resolved, so the live two are **B-5 and AF-6, both Phase 146 content**. AF-6 never appeared in the draft, despite its `0–30d` ranges being exactly what the drafted `## Deferral` H2 restates.

**Q4.2 detail.** Branch 1 assumed the fully-fetched FAQ carries the once-Approved-never-Declined constraint; `grep -rn "never be Declined" .planning/` returns exactly one hit — the search-summary cell itself. Branch 2 proposed shipping it "as a stated absence", but DRV-03 and SC#3 both mandate its **presence**, so that branch fails the phase.

---

## The Referee's overrule

The Adversary disproved the "retained lines land byte-identical" rule by re-wrapping `01:180-184` at seven widths and getting `check-phase-54` **32/0/0** every time. Sound — on the validator it tested.

The Referee ran the same experiment against the validator the Adversary had itself just confirmed was live:

```
reflow 01:186-189 at width 100 →
  v1.20-milestone-audit: [11/16] C11 FAIL -- 1 hit: 01-windows-wufb-rings.md:191
  check-phase-54:        32 passed, 0 failed
```

`01` carries two live C11 `\bSCCM\b[^.]*\bIntune\b` hits at `:186` and `:191`, both inside SC#5's mandated keep-set. `:191` is held green **only** by the link path `../co-management/02-windows-workload-sliders.md` sitting in its ±200-char window. Finding reinstated and **elevated to CRITICAL**.

**Lesson recorded in CONTEXT `<specifics>`:** a disproof is only as wide as the gate it was run against.

---

## Owner rulings (2026-08-19)

| Question | Options presented | Chosen |
|---|---|---|
| `01:200`'s closed "pick one" enumeration | Open the list + 4th pointer item **(recommended)** / Lead-in sentence only / Leave it | **Open the list + 4th pointer item** |
| `REQUIREMENTS.md:128`'s stale C11 map | Fix in 146 **(recommended)** / CONTEXT-only / Fix + flag for close | **Fix the row in 146** (and flag for close) |
| If the re-fetch fails | Block and escalate **(recommended)** / Ship partial / Pre-authorize attempt 2 | **Block and escalate** |
| Scope adds (multi-select) | 4 offered | **All four accepted** |

Scope adds accepted: fix `00-overview.md:154` and `:211-213`; carry FIX-04's naming rule into `06`; add AF-9's Unsupported callout; rule `co-management/02` explicitly out of scope.

---

## Claude's Discretion

Prose wording throughout; exact article titles for `**Source:**` lines; the precise H2 name satisfying the C11 keyword-window constraint; the wording of the fourth mitigation item; edit order within each commit.

---

## Deferred Ideas

- `co-management/02-windows-workload-sliders.md` — cross-link only, do not edit (owner-ruled). No v1.21 phase owns it; six live `check-phase-53` pins.
- `update-enterprise-supersedence` re-fetch — unowned; no phase in v1.21 carries the obligation.
- `REQUIREMENTS.md`'s `V-54-18` row clarification — carried from Phase 145, joined at close by the C11-row correction.
- A `review_by < today` freshness gate — the existing test is one-sided (`days > 60`).
- `## Version History` in `docs/operations/` — a domain-wide ruling for a hygiene milestone.
- C17 enrollment of the ~20 legacy `docs/operations/` documents — out of scope per INT-02.
- An automated gate for `http(s)` link targets — nothing verifies any Learn URL in the corpus.

---

## Session artifacts

- `146-GRILL-DRAFT.md` — 28 sub-questions with draft recommendations (scratchpad)
- `146-FINDER-MERGED.md` — 64 deduplicated findings from 5 parallel Finders (scratchpad)
- `146-ADVERSARY.md` — 64 rebuttal verdicts (scratchpad)
