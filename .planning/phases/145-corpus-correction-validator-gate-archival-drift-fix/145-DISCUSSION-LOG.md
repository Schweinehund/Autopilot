# Phase 145: Corpus Correction, Validator Gate & Archival-Drift Fix - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-19
**Phase:** 145-Corpus Correction, Validator Gate & Archival-Drift Fix
**Areas discussed:** Evidence-line format · Correction/attribution shape · Commit granularity ·
The two `[UNVERIFIED]` dates · FIX-11 blast radius · FIX-12 conversion scope · FIX-04 rename
breadth · FIX-09 SVG regeneration — **all eight selected**

---

## Method

The owner selected all eight gray areas and directed: *"Use /grill-me to thoroughly raise
additional questions in each of the areas and use /adversarial-review to evaluate each of the
questions in each of those areas to recommend the best one and provide your reasoning."*

**Stage 1 — codebase pass.** Per grill-me's rule ("if a question can be answered by exploring the
codebase, explore the codebase instead"), every validator, requirement and edit target was read
before any question was drafted.

**Stage 2 — `/grill-me`.** The 8 areas expanded to **26 sub-questions**. Six dissolved on
measurement, one of them dissolving an entire area (FIX-09's SVG regeneration — the generator
proved byte-idempotent, so "regenerate all 14 vs only #09" had no cost either way). One previously
unknown contradiction surfaced: ROADMAP Phase 146's "only phase that edits
`01-windows-wufb-rings.md`" claim versus Phase 145's own FIX-01/02/07 requirements.

**Stage 3 — `/adversarial-review`.** Four parallel Finders (three by area group, one dedicated to
re-running every measured claim) → Adversary → Referee.

| Stage | Output |
|---|---|
| Finder A (Areas 1–2) | 25 findings |
| Finder B (Areas 3, 6) | 27 findings |
| Finder C (Areas 4, 5, 7, 8) | 27 findings |
| Finder D (all measurements + cross-cutting) | 12 findings + full verification table |
| **Merged, deduplicated** | **68** |
| Adversary | 12 disproved, 6 figures corrected, 56 confirmed |
| Referee | Verdicts on all 32 sub-questions + 8 new areas |

**Final verdicts on the draft picks: 7 UPHOLD · 22 AMEND · 3 REVERSE.**

---

## The three reversals

### Q1.1 — Evidence-line format

| Option | Description | Selected |
|--------|-------------|----------|
| Inline parenthetical | `(Microsoft Learn, *title*, updated YYYY-MM-DD)` at sentence end — the draft pick, justified as "matches the existing corpus idiom, adds zero new structure" | |
| Per-claim blockquote | A `> **Source:**` block per corrected claim | |
| **Existing `**Source:**` line** | **The convention that already exists at `admin-setup-macos/10:156`** | **✓** |
| Foot-of-document Sources table | Extend the `## External References` list every target file already has | |

**Outcome:** REVERSE. The draft's founding premise — "no per-claim citation convention exists in the
corpus" — was falsified five ways. `admin-setup-macos/10-kerberos-sso-extension.md:156` is verbatim
`**Source:** [title](url) (updated 2026-06-15)`, exactly FIX-10's required shape; `[CITED` runs 118
hits / 19 files. The draft's own tie-breaker therefore selects the existing line, not the
parenthetical it recommended.

**Also overturned:** the draft's claim that "a URL is free of validator risk". Reproduced live —
appending the canonical Learn URL containing `…deployment-rings…` to `01-windows-wufb-rings.md` took
`check-phase-54` from **32/0 to 31/1** with `V-54-11 FAIL`. `V-54-11` strips inline code but not
link targets. The draft's italic `*<title>*` template was also the one emphasis form `V-54-11` does
not strip, while REQUIREMENTS' own row names backticks as the escape.

### Q3.3 — Which C11 keyword replaces `mutually exclusive`

| Option | Description | Selected |
|--------|-------------|----------|
| Substitute `disambiguation` | One allowlisted keyword into the `:76-87` window — the draft pick | |
| **Singularise** | **`Autopatch rings` → `Autopatch ring`; the plural-only regex stops matching** | **✓** |
| `c11_ops_exemptions` sidecar entry | Allowlist the line in all 18 sidecars | |

**Outcome:** REVERSE, on three independent defects. (1) The hit map was wrong — **three** hits at
`:78`/`:83`/`:86`, not two at `:79`/`:87`; the draft narrowed ROADMAP's correct `:76-87` range and
lost the hit FIX-03 rewrites. (2) The two surviving windows `[5501,5916]` and `[5963,6378]` are
**disjoint**, so a single keyword insertion is geometrically impossible — at least two are needed.
(3) ROADMAP:93 and REQUIREMENTS' own `V-54-11` row **already** prefer the singular form. Singularising
deletes the matches outright, and two of the three hits sit inside text FIX-02/FIX-03 rewrite anyway.

### Q4.2 — The Android `Oct 31 2026` literal

| Option | Description | Selected |
|--------|-------------|----------|
| Rewrite the cell without the date | Drop the unsourced literal, state the absence — the draft pick | |
| **Retain the literal, rewrite around it** | **Attribution: the corpus asserts it, current pages do not restate it** | **✓** |

**Outcome:** REVERSE. The draft claimed "no check-phase-54 assertion pins that string" — false.
`check-phase-54.mjs:384` pins `> ⚠️ **Hard deadline (Oct 31 2026):**` **verbatim** in
`04-android-patch-delivery.md`, plus a whole-file token at `:389`. The draft had audited
`00-overview.md`, the wrong file. Both FIX-08 and ROADMAP's research flag require the rewrite to
*retain the pinned literals*.

---

## Owner rulings taken (4 questions, all answered as recommended)

| # | Question | Options offered | Ruling |
|---|---|---|---|
| 1 | FIX-10's "dated after the event" is unsatisfiable for three future-dated claims | After the corpus assertion **(rec)** / After the article's own revision / Amend FIX-10 + SC#1 text | **After the corpus assertion** |
| 2 | Phase 146's "only phase that edits `01-windows-wufb-rings.md`" is false as written | Restate 146's claim **(rec)** / Region ownership, no edit / Defer FIX-07 to 146 | **Restate 146's claim** |
| 3 | FIX-04 says "throughout", SC#1 says "all five" | 5 docs + keep compound **(rec)** / 5 docs + rename compound / Corpus-wide + keep / Corpus-wide + full | **5 docs, keep compound** |
| 4 | SC#5's Ubuntu key misses a 26th file | Correct the sweep key **(rec)** / Honour SC#5 literally / Correct key + amend SC#5 | **Correct the sweep key** |

Ruling 3 is the consequential one: it converts what the draft had presented as a validator-safety
finding into an **explicit owner-ratified scope reduction**. FIX-04 grants exactly one carve-out
("Windows Update for Business reports"); retaining the coined `WUfB deployment ring` compound exempts
**56 of 113** `WUfB` tokens, and that exemption is now the owner's, not the requirement's.

---

## Eight areas the original gray-area set never covered

Surfaced by the review, all now locked in CONTEXT.md as D-50 through D-55 plus D-28/D-44:

| Area | Why it mattered |
|---|---|
| `co-management/03-cocmgmt-migration-paths.md` | A required FIX-01/FIX-02 edit target named in REQUIREMENTS **twice** and in SC#2, covered by no gray area. REQUIREMENTS:129 flagged it as an unresolved conflict with the architecture research's "cross-link only" ruling — measurement dissolved it: the file has **no `exclusiv` string at all** and `:24-25` already states FIX-02's corrected position, so only a five-word parenthetical swap is needed. |
| FIX-03 | Unaddressed by all 8 areas, yet its `:80-84` span contains the C11 hit the draft's map lost. |
| FIX-06 | Forces an edit to a **6th file** (`admin-setup-ios/07:46`) inside `V-54-19`'s regex cell, atomically coupled by `V-54-32`. Plus a live contradiction: FIX-06 says "re-categorised, **not deleted**" while REQUIREMENTS' `V-54-18` row says "may be dropped freely". |
| The Ubuntu sweep key | `Ubuntu 22.04` misses a 26th file carrying bare `22.04`; SC#5 would pass literally with a live 22.04 claim in the corpus. |
| The `.planning/` criterion | SC#3's regex cannot see a 4th defective file pointing at `.planning/milestones/v1.6-DEFERRED-CLEANUP.md`, which exists. True count 11 lines / 4 files, not 9/3. |
| The 36-char C11 cliff | In `01-windows-wufb-rings.md` between `:62` and `:65` — the file no area examined. (The `00-overview.md` "56-char cliff" raised by a Finder was **disproved**.) |
| The PITFALL-9 keeper | Both C11 keepers for the `:77` hit live **inside the blockquote FIX-02 rewrites**. |
| Evidence-line placement | All five files open with a shared `> **Platform applicability:**` blockquote carrying two of the corrected claims. |

---

## Claude's Discretion

Prose wording of every correction; article titles for `**Source:**` lines; commit order beyond the
stated ordering constraints; phrasing of deferral records. All byte offsets, line numbers and hit
maps are to be **re-measured at plan time** — the review found a systematic transcription drift in
the draft (`:79`→`:78`, `:87`→`:86`, `:57`→`:55`, `:107-124`→`:107-151`).

## Findings disproved (recorded so they are not re-derived)

- The `00-overview.md` 56-character C11 cliff — the draft's own placement rule puts the citation
  upstream of the keeper, where the window shifts with it. Even a 200-char insertion stays green.
- FIX-03 omitted from the `00-overview.md` commit atom — it is the same file, so already inside it.
- `BASELINE_9` in `regenerate-supervision-pins.mjs` line-coordinate pinned into
  `docs/_glossary-linux.md` — **fabricated**; `BASELINE_9` pins Android files only.
- `check-phase-59`'s CI fetch-depth risk — already `fetch-depth: 0` on the only invocation path.
- A `frozen-read-negative-test.mjs` registration obligation for FIX-12's new call site —
  `check-phase-59` is not registered at all, and the gap predates this phase.
- Corrected figures: `Source confidence` is 4 hits/3 files (not 70/38); the `:77` C11 window carries
  **two** keepers (not "solely PITFALL-9"); the `readFile(OPS_INDEX_MD)` grep returns 3 (not 4).

## Deferred Ideas

FIX-04's remaining 8 files · the `V-54-18` requirements-row clarification · `check-phase-59`'s
absence from `frozen-read-negative-test.mjs` · the ~28 non-`.planning/` `PITFALLS.md` mentions ·
a `review_by < today` freshness gate (217 of 271 dated files are past due under a green harness) ·
an automated gate for the SVG half of SC#5. Full entries with triggers in CONTEXT.md `<deferred>`.
