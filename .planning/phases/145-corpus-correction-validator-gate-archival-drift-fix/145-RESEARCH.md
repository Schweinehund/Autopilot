# Phase 145: Corpus Correction, Validator Gate & Archival-Drift Fix - Research

**Researched:** 2026-08-19
**Domain:** Documentation correction (markdown content) + validator/harness JS (Node, no framework) — a docs-only content-correction phase with one script edit (`check-phase-59.mjs`)
**Confidence:** HIGH on all re-measured repo facts (executed against HEAD `9182718b9cf213e6081b96f8b2fc2a9825da834a` this session); HIGH on the Android date finding (direct first-party fetch this session); HIGH-MEDIUM on the FIX-01..FIX-08 correction sourcing (relayed from `.planning/research/{STACK,PITFALLS,SUMMARY}.md`, an adversarially-reviewed research pass dated 2026-08-18/19, with two of its most load-bearing claims independently re-fetched and confirmed in this session)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

All decisions below were produced by `/grill-me` (26 sub-questions expanded from 8 selected gray
areas, 6 dissolved on measurement) then adjudicated by `/adversarial-review` (4 parallel Finders →
Adversary → Referee; 91 raw findings, 68 deduplicated, 12 disproved). Verdicts against the draft
picks: **7 UPHOLD, 22 AMEND, 3 REVERSE**, plus 8 areas the original 8 never covered.

Every `[MEASURED]` figure in CONTEXT.md was executed at HEAD `358e5ad4` and independently re-run by
a verification agent. HEAD at research time is `9182718b` (three commits later — Jira sync commits
only; no content changed). Figures the review corrected are marked `[CORRECTED]`.

**D-01..D-07 (Evidence lines and freshness, FIX-10):** Evidence lines use the existing corpus
convention — a standalone `**Source:** [Article title](url) (updated YYYY-MM-DD)` line after the
paragraph carrying the corrected claim (precedent: `docs/admin-setup-macos/10-kerberos-sso-extension.md:156`).
Do not invent an inline parenthetical. URLs are markdown-linked, not bare (`V-54-29` strips markdown
links before banning `Hotpatch`/`VBS`/`MEETS_STRONG_INTEGRITY`). In `01-windows-wufb-rings.md`
**only**, screen every URL for a bare `\bring(s)?\b` token and backtick it if present (`V-54-11`
strips inline code but not link targets — reproduced live: adding a bare ring-bearing URL took
`check-phase-54` from 32/0 to 31/1). "Dated after the event it describes" means dated after the
corpus assertion's `last_verified` stamp (2026-04-28), not after the future event itself
**[OWNER-RULED 2026-08-19]** — three corrected claims describe future events (hotpatch May 2026,
Android Oct 31 2026, Apple 27.0), so the literal reading is unsatisfiable; no requirement text is
edited. One evidence line per corrected claim, scoped to the five patch-management documents only —
`co-management/03`, `admin-setup-ios/07` and the FIX-11 files carry no evidence line. All five files
get `review_by = last_verified + 60 days` computed by arithmetic, stamped with the actual execution
date of the commit landing that file's corrections (never 2026-08-19 blindly). Evidence lines go
**outside** the leading `> **Platform applicability:**` blockquote.

**D-08..D-12 (Correction/attribution shape, FIX-05/07/08):** One rhetorical shape across all three:
corrected statement primary, superseded corpus assertion as a trailing subordinate clause
(paraphrased and attributed to the corpus, never to Microsoft), `**Source:**` line beneath. Token
obligations are per-file and NOT uniform — see the Validator Constraints table in REQUIREMENTS.md
and the re-measured C11/pin data below. Paraphrase carries a verbatim-literal preservation list:
`May 2026`, `VBS`, `default`, and (`opt-out` OR `April 2026`) in `01-windows-wufb-rings.md`;
`Apple OS 26` in `02-macos`; `Oct 31 2026`/`October 31 2026`, `Android 13+`, `12-month`, `May 2025`,
`September 30 2025` in `04-android`. No separate dated correction marker — `last_verified` plus the
`**Source:**` line carry the date (there is no `## Version History` section in any of the five
files). FIX-07's Windows 11 Pro exclusion is flagged in **prose**, no bracketed token — *"this
guide's Windows 11 Pro exclusion is not restated by the current article; treat it as unconfirmed."*
`V-54-30`'s regex is case-sensitive and lacks `/i`.

**D-13..D-16 (C11 ordering, `00-overview.md` atom):** Do not substitute a C11 allowlisted keyword —
singularise where possible. `[CORRECTED]` the `\bAutopatch rings\b` hits are **three** in
`00-overview.md`, not two — see the re-measured offsets below. Fallback only, if a site must retain
the plural: **two** `disambiguation` insertions are required, never one; the noun must be exact
(`disambiguates` does not match). 16 milestone-audit scripts carry the C11 pattern (D-15 asserts all
16 read `walkMd('docs')` live, none frozen — **this session's direct measurement found otherwise for
15 of the 16; see the Validator Architecture finding below, flagged for the planner's attention, not
silently overridden**). Minimum sufficient C11 verification is `v1.5-milestone-audit.mjs` plus any
one of `v1.6`-`v1.20` — `v1.5-milestone-audit.mjs:517`'s keyword regex is 168 chars vs 277 in every
other C11-bearing audit, six alternates short.

**D-17..D-20 (Commit atoms and gates):** Per validator-safe atom, ≈one commit per file, across ~35
files in five classes (see CONTEXT.md D-17 for the full breakdown — reproduced verbatim in the Code
Examples section below). Per-commit gate, run as an explicit task step (not the git hook):
`check-phase-53.mjs`, `check-phase-54.mjs`, `check-phase-57.mjs`, `check-phase-59.mjs`,
`c17-eee-contract.mjs`, `check-nav-hub-links.mjs`, plus the two C11 audits from D-16.
`check-phase-54.mjs` is a **hard** gate on every commit touching `01-windows-wufb-rings.md`.
`scripts/validation/pre-commit-advisory.sh` is content-scoped and its `PINNED_FILE_PATTERN` covers
`docs/_glossary-linux.md`, which FIX-11 edits — run it. `[DISPROVED — do not act on it]` a review
finding asserted `BASELINE_9` in `regenerate-supervision-pins.mjs` is line-coordinate pinned into
`docs/_glossary-linux.md`; it is not — `BASELINE_9` pins Android files only.

**D-21..D-23 (Phase 146 ownership collision):** **[OWNER-RULED 2026-08-19]** Phase 145 **does** edit
`01-windows-wufb-rings.md` for FIX-01/02/04/07/10. ROADMAP Phase 146's "the only phase that edits
01-windows-wufb-rings.md" is false as written and is restated as "the only phase performing
structural surgery (the driver/firmware stub-and-move)." `[CORRECTED]` the Hotpatch section is
`:107-151` (next H2 at `:152`), not `:107-124` — re-confirmed exactly in this session (see below).
Prefer the singular `Autopatch ring` form, and gate every commit touching this file on
`check-phase-54.mjs`.

**D-24..D-27 (The two undated deadlines):** Two different problems. **Apple:** not a research
question — FIX-05 records that Intune's article carries a deprecation banner with no date given, so
there is nothing to source; pre-commit to stating the absence. **Android:** genuinely `[UNVERIFIED]`
per REQUIREMENTS; one bounded first-party attempt at plan time discharges ROADMAP's Research flag.
**The Android date literal is RETAINED everywhere, never deleted** — `check-phase-54.mjs:384` pins
`> ⚠️ **Hard deadline (Oct 31 2026):**` verbatim in `04-android-patch-delivery.md`, plus a
whole-file token at `:389`. Three collateral constraints on the rewrite: `V-54-24` requires ≥4
`[HARD-DEADLINE` tokens in the Android file; `check-phase-57.mjs:427` bans the literal inside
`quick-ref-l2.md`'s Play Integrity H3 region; an absence statement in `00-overview.md` must not name
`MEETS_STRONG_INTEGRITY` in body prose. `[CORRECTED]` the overview's date is at `:55` (also `:19`,
`:58`), not `:57`. The researcher performs one bounded pass at plan time and writes the result into
RESEARCH.md as a named row (query strings, pages fetched, date, verdict) — **see the External
Research Finding section below: this session FOUND the date first-party, changing the executor's
path from D-25's attribution fallback to a direct `**Source:**` citation.**

**D-28..D-33 (FIX-11 archival-drift fix):** Fix all **11 lines across 4 files**, not 9/3 —
re-confirmed exactly in this session (see below). SC#3's regex text is not amended; once all 11 are
fixed, both the literal and broader `.planning/` forms return 0. Default replacement is
drop-the-path-keep-the-label — but three sites need substance, not a label (see CONTEXT.md D-30 for
the three named sites and D-31 for `_glossary-linux.md:157`, which needs only the link unwrapped).
**Executor rule:** before stripping any identifier, confirm it retains ≥1 defining occurrence in
`docs/`; if not, inline the substance or drop the identifier. The reader-facing-defect argument is
bounded to `.planning/` paths only. All three original FIX-11 files are C17-enrolled and C17 is at
`[MEASURED]` 234/0 (re-confirmed exactly this session).

**D-34..D-38 (FIX-12 frozen-read conversion):** Convert **`V-59-14` only**. `V-59-02`, `V-59-13`,
`V-59-34` stay live. **[OWNER-RULED 2026-08-19]**, names `V-59-14`'s `patchRows === 5` explicitly.
Helper is `readAtV15Close`. The assertion text must say "the ops index carried five Patch rows at
v1.5 close", not "Phase 59 shipped five rows" — `frozen-at-close.mjs:71` records
`V15: 'ba2cbc0', // Phase 61 close — canonical`. Let it throw, matching `:659`'s
`// no null-check … let it propagate` idiom (helper-tracked, not a universal idiom —
`readAtV116Close` uses try/catch). Append `[v1.5-frozen @ ba2cbc0]` to the **assertion name**, never
the filename (`audit-harness-v1.5-integrity.yml:270`'s `if [ -f … ]` guard would silently skip a
renamed file). Recorded for Phase 152, not 145: six validators read the ops index; four carry
negative H2 constraints that do not block adding rows.

**D-39..D-43 (FIX-04 rename scope):** **[OWNER-RULED 2026-08-19]** Rename product-name prose in the
**five patch-management documents only**, on ROADMAP SC#1's authority, and **retain the coined
`WUfB deployment ring` compound**. `[MEASURED]` 113 `WUfB` tokens / 13 files; the compound alone is
56 of 113; the spelled-out product name is 13 — all re-confirmed exactly this session (see below).
`[DISPROVED — do not reuse]` "the other 8 files' pins were never surveyed" — `grep -rln "WUfB"
scripts/validation/*.mjs` returns only `check-phase-54.mjs`. `V-54-09` binds only the ~10-line
`## Ring Terminology` window in `00-overview.md` — keep one WUfB-deployment-ring token and one
Autopatch-ring token there verbatim. **Rename body prose only** — `V-54-11` strips headings, so the
H1, the anchor-owning H2, and the filename `01-windows-wufb-rings.md` are validator-invisible and
reader-maximal; leave the H2 text and filename untouched this milestone. Accepted cost: deferring
the other 8 files splits the `[Windows WUfB Rings]` nav label across pages.

**D-44..D-49 (FIX-09 Ubuntu sweep and SVG):** **[OWNER-RULED 2026-08-19]** Key the sweep on bare
`\b22\.04\b` over `docs/**/*.md` plus `scripts/generate-diagrams.py`. `[CORRECTED]` the true set is
**26 markdown files**, not SC#5's 25 — re-confirmed exactly this session (see below). Edit
`scripts/generate-diagrams.py:1544`, then run the generator unmodified — it is byte-idempotent (all
14 SVGs regenerate identically). Prove idempotency with `md5sum`/`diff -rq` against a pre-run copy,
**not** `git status --porcelain` (`core.autocrlf=true` makes porcelain structurally incapable of
reporting a pure line-ending change on an `.svg`). `grep -rln "docs/diagrams\|\.svg"
scripts/validation/` returns nothing — no automated gate exists for the SVG half; the phase carries
an explicit verification step and records its output as close evidence. The RHEL-8-vs-9/10 conflict
does not go into the SVG — update `:1544` to `Ubuntu 24.04 / 26.04 LTS · RHEL 9 / 10` only; the
conflict lands in markdown wherever a supported-version list appears. Edit
`docs/decision-trees/09-linux-triage.md` and the generator's subtitle to the **same** version list
in the **same** commit.

**D-50..D-55 (Areas the original gray-area set never covered):** `co-management/03` takes a minimal
token-swap at `:25`: `(Test, First, Fast, Broad)` → `(Test and Last)`. Do not apply FIX-02 or FIX-04
there, do not add any blockquote — the file already reads the corrected containment position at
`:24-25` and has no `exclusiv` string. FIX-03's sentence split at `00-overview.md:80-84`: (1) the
verbatim-true independence clause, (2) the corrected gating statement. Drop the plural
`Autopatch rings` in doing so; land in the same commit as FIX-02's deletion of the L86 paragraph
(L83's only C11 keeper). FIX-06 governs over the `V-54-18` row — re-categorise `OfferPrograms`, do
**not** delete, at all 5 sites across 3 files (re-confirmed exactly this session). FIX-06 forces a
coupled two-file commit: `admin-setup-ios/07:46` + `03-ios-update-lifecycle.md` (`V-54-32` couples
`V-54-19/20/21`). The real C11 cliff is in `01-windows-wufb-rings.md`, not the overview — slack
between `:62` and `:65` is ~36 characters (re-confirmed within 2 bytes this session; never insert a
`**Source:**` line or any other text into that gap). FIX-02's rewrite of the PITFALL-9 blockquote at
`01-windows-wufb-rings.md:77` must retain that literal **and** singularise the hit — both C11
keepers for that hit live inside the very blockquote FIX-02 rewrites.

### Claude's Discretion

Prose wording of every correction, the exact article titles selected for `**Source:**` lines, the
order in which the five files are committed (beyond the ordering constraints above), and the
phrasing of the deferral records. **All byte offsets, insertion sites and hit maps are to be
re-measured at plan time, never transcribed from CONTEXT.md** — the review found a systematic
off-by-one/two pattern in the draft. This research re-measured every cited offset directly against
HEAD and reports the fresh values below; where they diverge from CONTEXT.md's figures by more than a
trivial byte count, that is called out explicitly.

### Deferred Ideas (OUT OF SCOPE)

- **FIX-04's remaining 8 files** — deferred by D-39's owner ruling. Trigger: a corpus-hygiene
  milestone, or the first phase that edits any of those files for another reason.
- **The `V-54-18` requirements-row clarification** ("`OfferPrograms` may be dropped freely" reads as
  a content directive contradicting FIX-06) — one-line fix at milestone close.
- **`check-phase-59`'s absence from `frozen-read-negative-test.mjs`** — pre-existing gap, not created
  by this phase. Trigger: the next tooling-debt phase.
- **The ~28 non-`.planning/` `PITFALLS.md` mentions in `docs/`** — same reader-facing class as FIX-11
  but outside its scope. Trigger: a corpus-hygiene milestone.
- **A `review_by < today` freshness gate** — 217 of 271 dated files are past due under a green
  harness because no validator compares `review_by` to today. Trigger: a dedicated corpus-hygiene
  milestone.
- **An automated gate for the SVG half of SC#5** — nothing in `scripts/validation/` reads
  `docs/diagrams/` at all. Trigger: the next tooling-debt phase.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FIX-01 | Autopatch default rings are `Test`/`Last`, not `Test/First/Fast/Broad` | Sourced (Autopatch groups overview, ms.date 2025-06-17/updated 2026-06-19); all 4+ sweep sites re-measured below (First/Fast/Broad keyed, not comma-and) |
| FIX-02 | WUfB/Autopatch mutual-exclusivity removed, replaced with containment position | Sourced (same page — the containment quote); all 5+2 sites re-measured below (3 in overview + 1 in windows-wufb-rings + `co-management/03`, plus 2 additional mutual-exclusion-language sites the requirement text under-counts) |
| FIX-03 | Driver sentence split, not struck; deferral-vs-deadline distinction | Sourced (`manage-driver-updates`, `driver-updates-faq`); exact split text drafted in D-51, line span confirmed |
| FIX-04 | Rename to "Windows Update client policies" in the 5 patch-management docs only | Sourced (`waas-manage-updates-wufb`, ms.date 2024-05-16/updated 2025-10-02); full per-file WUfB token census re-measured below |
| FIX-05 | Apple two-stage cutover (deprecated w/ 26, non-functional in 27.0); Intune banner has no date | Sourced (Apple WWDC26 deployment-updates page, published 2026-06-08; Intune deprecated-mdm-policies-ios, ms.date 2025-10-15/updated 2026-06-22 — confirms no date in the banner) |
| FIX-06 | Apple DDM settings-catalog display names; `OfferPrograms` re-categorised into `Beta` dict | Sourced (Apple `software-update-settings-declarative` page, published 2024-09-25 — the `Beta` dict verbatim; Intune `ref-apple-settings`); all 5 `OfferPrograms` sites re-measured below |
| FIX-07 | Hotpatch: default-on, two config levels, Arm64+CHPE, VBS required, Pro exclusion unconfirmed | **Directly re-fetched this session** — `windows-autopatch-hotpatch-updates` (ms.date 2026-05-28/updated 2026-06-02): VBS, CHPE/`HotPatchRestrictions=1`, licence list confirmed verbatim; Pro inclusion/exclusion genuinely silent on this page — D-12's "unconfirmed" stance corroborated fresh, not resolved either way |
| FIX-08 | `MEETS_STRONG_INTEGRITY` 12-month age scoped to all-partitions condition; Oct 31 2026 sourcing | **Directly re-fetched this session** — see External Research Finding section: the date WAS found first-party this session (changes the executor path from D-25's attribution fallback to direct citation) |
| FIX-09 | Ubuntu 22.04 → 24.04/26.04 LTS + RHEL 9/10 sweep, SVG regen | 26-file / generator sweep re-measured below; RHEL 8-vs-9/10 conflict documented in `.planning/research/PITFALLS.md:550` |
| FIX-10 | Evidence lines + ≤60-day `review_by` interval on all 5 files | Convention precedent confirmed (`10-kerberos-sso-extension.md:156`); C11/pin collision map below |
| FIX-11 | `docs/_glossary-linux.md:157` archival-drift fix, all 11 lines / 4 files | All 11 sites re-confirmed exactly (line, file) this session; narrow vs. broad grep behavior confirmed |
| FIX-12 | `check-phase-59.mjs` V-59-14 frozen-read conversion | Confirmed live at `check-phase-59.mjs:456` (`readFile(OPS_INDEX_MD)`, not `readAtV15Close`); exact 1-line diff identified below |

</phase_requirements>

## Summary

This is a documentation-correction phase, not a software-feature phase: the deliverable is corrected
markdown prose across five `docs/operations/patch-management/*.md` files (plus five collateral
files/sites) and a one-line read-source swap in `scripts/validation/check-phase-59.mjs`. There is no
new stack to select, no framework to install, and no "don't hand-roll" library gap — the engineering
challenge is entirely about **not breaking the 20+ live validator pins** that gate these exact files
while telling the truth about content those same pins currently protect as false. CONTEXT.md's 55
locked decisions already resolve the shape of every correction; this research's job was narrower:
(1) make the one bounded external research attempt the phase authorizes (Android Oct 31 2026 date),
(2) assemble a claim→source→date table for the eight correction requirements, and (3) re-measure
every repo fact CONTEXT.md explicitly forbids transcribing.

**The external research attempt succeeded.** Unlike the prior milestone's three failed attempts,
this session found "Microsoft Intune will enforce this change by **October 31, 2026**" as a direct,
first-party sentence on `learn.microsoft.com/en-us/intune/whats-new/in-development` (ms.date
2026-07-27, updated_at 2026-07-31 — both post-date the corpus's `last_verified: 2026-04-28`). This
changes FIX-08's authoring path: the executor should cite this page directly rather than falling back
to D-25's "the corpus asserts it, current pages don't restate it" attribution pattern — though the
pinned literals and evidence-line mechanics are unaffected either way.

**Every re-measured repo fact in this document was executed at HEAD `9182718b` (2026-08-19) via
direct grep/python/node against the live tree — none transcribed from CONTEXT.md.** Where a
re-measurement diverges from CONTEXT.md's cited figure by more than a couple of bytes (an artifact of
CRLF line endings and matching-engine differences, not a substantive disagreement), that is called
out. One genuine architectural finding diverges from CONTEXT.md D-15's characterization (frozen vs.
live C11 readers) and is flagged, not silently resolved, per this agent's remit.

**Primary recommendation:** Treat the ~35-file, five-commit-class breakdown in CONTEXT.md D-17 as the
task decomposition skeleton; gate every commit with the validator set in D-18 (now confirmed all
green at HEAD); use this document's claim→source table for `**Source:**` line content; and use the
re-measured C11/offset data below instead of re-deriving byte positions by hand.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Corrected patch-management prose (FIX-01..10) | Content / Docs corpus | — | Pure markdown edits; no code executes this content |
| Validator gate (`check-phase-*.mjs`, C11 audits) | Tooling / CI (Node scripts) | — | Enforces pins against the docs tier at commit time and in CI |
| Archival-drift fix (FIX-11) | Content / Docs corpus | Tooling (`check-nav-hub-links.mjs`) | The link target is a doc-tier fact; the validator only detects it |
| Frozen-read conversion (FIX-12) | Tooling / CI (Node script) | — | `check-phase-59.mjs`'s read-source swap from live `fs` to a frozen-at-tag reader |
| Ubuntu/RHEL sweep + SVG regen (FIX-09) | Content / Docs corpus | Build tooling (`generate-diagrams.py`) | Text sites are content; the SVG is a build artifact regenerated from a Python source line |

This phase touches no browser, server-rendering, API, or database tier — it is entirely
content-and-validator-tooling, consistent with the milestone's "corpus corrections" framing.

## External Research Finding — the Android `October 31 2026` deadline (D-27 named row)

**Attempt date:** 2026-08-19 (this session). **Verdict: FOUND, first-party, DIRECT.**

**Query strings used (3 WebSearch + 2 WebFetch, matching REQUIREMENTS' "three targeted searches
including a literal string search" precedent):**

1. `Intune Play Integrity MEETS_STRONG_INTEGRITY "October 31 2026" patch age Android compliance`
   (WebSearch — surfaced the techcommunity.microsoft.com support-tip blog as the likely source)
2. `WebFetch` on `https://techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-changes-to-google-play-strong-integrity-for-android-13-or-above/4435130`
   — **returned only the page title**, no body content retrievable (client-rendered page; matches
   REQUIREMENTS' account of a page the date is "attributed to" but not found on). No date extracted.
3. `"October 31, 2026" Intune Android strong integrity enforce site:learn.microsoft.com` (WebSearch,
   literal-string form) — surfaced `learn.microsoft.com/en-us/intune/whats-new/in-development`
4. `WebFetch` on `https://learn.microsoft.com/en-us/intune/whats-new/in-development` — **succeeded**.
   The tool returned the page's full YAML frontmatter and body markdown, including:
   - `ms.date: 2026-07-27T00:00:00.0000000Z`
   - `updated_at: 2026-07-31T07:37:00.0000000Z`
   - Under `## Notices` → `### Plan for Change: Google Play strong integrity definition update for
     Android 13 or above`, the verbatim sentence: *"Microsoft Intune will enforce this change by
     **October 31, 2026**."*, immediately following a citation of Google's own December 2024
     Play-Integrity-API blog post as the source of the underlying definition change.
5. `"October 31, 2026" Android compliance Intune fleet` (WebSearch, confirmatory) — returned the
   same Learn URL and consistent paraphrase, corroborating (4) was not a one-off render.

**`[DIRECT]` vs `[RELAYED]` note:** the WebFetch tool itself routes fetched HTML through a
summarizing model before returning it to this agent, so strictly no fetch in this environment is
"raw bytes read by the researcher's own eyes." This attempt is graded `[DIRECT]` rather than
`[RELAYED]` because (a) the returned content included the page's complete YAML frontmatter
(`ms.date`, `updated_at`, `document_id`, `git_commit_id`, `original_content_git_url`) — metadata that
is exceptionally hard to fabricate consistently and has every hallmark of genuine Learn build
tooling — and (b) the returned body was the full, ~40-section article (all "Plan for Change" and
"What's new" notices), not a targeted three-sentence answer to the prompt, indicating the fetch
returned the converted document rather than a paraphrased summary. **Executor action:** if maximum
rigor is required before shipping, re-fetch this exact URL once more (`curl` or WebFetch) immediately
before landing FIX-08's commit and diff the returned sentence against the quote above — a single
confirmatory read, not a new research pass.

**Consequence for FIX-08's authoring path:** because this page's `ms.date` (2026-07-27) post-dates
the corpus's `last_verified` (2026-04-28) per D-04's "post-dates the corpus assertion" reading, FIX-08
may now carry a direct `**Source:** [In development - Microsoft Intune | Microsoft Learn](https://learn.microsoft.com/en-us/intune/whats-new/in-development) (updated 2026-07-31)`
line citing this exact sentence, rather than D-25's attribution-only fallback ("the corpus asserts
the deadline, current first-party pages do not restate it"). **The pinned literals
(`Oct 31 2026`/`October 31 2026`, `Android 13+`, `12-month`, `May 2025`, `September 30 2025`) are
unaffected either way and must still all survive** per D-10's preservation list and `V-54-23/24`.

## Claim → Source → Source-Date Table (FIX-01..FIX-09)

All rows below are `[CITED]` from `.planning/research/{STACK,PITFALLS,SUMMARY}.md` — a five-Finder
adversarial-review research pass completed 2026-08-18/19 for this same milestone's requirements
gathering, with each first-party URL's own `ms.date`/`updated_at` recorded there. Two rows
(FIX-07's VBS/CHPE/Arm64 claims and FIX-08's date) were **independently re-fetched and confirmed
`[VERIFIED: direct fetch this session]`** in this research pass; those are marked explicitly.

| Req | Corrected claim | Source | Source's own date | Label |
|---|---|---|---|---|
| FIX-01 | Autopatch default rings are `Test` and `Last`; auto-present, cannot be removed/renamed; one Entra group each; ≤15 rings/group, ≤300 groups/tenant | [Windows Autopatch groups overview](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview) | ms.date 2025-06-17, updated 2026-06-19 | `[CITED]` |
| FIX-02 | Autopatch group is a container that *includes* `Update rings policy for Windows 10 and later`; consequence is loss of direct authorship, not exclusion | same page as FIX-01 (the containment quote) | ms.date 2025-06-17, updated 2026-06-19 | `[CITED]` |
| FIX-03 | Driver approval mode + 0–30 day deferral are set per deployment ring; quality-update deadline/grace period **do** apply to drivers; "independent policy surface" is verbatim-true | [Manage driver updates](https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-driver-updates); [Driver updates FAQ](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) | manage-driver-updates: ms.date 2026-01-14, updated 2026-04-09; FAQ: ms.date 2026-01-06, updated 2026-04-09 | `[CITED]` |
| FIX-04 | Product renamed **Windows Update client policies**; `WUfB` survives only in "Windows Update for Business reports" | [Manage Windows Update for client policies (waas-manage-updates-wufb)](https://learn.microsoft.com/en-us/windows/deployment/update/waas-manage-updates-wufb) | ms.date 2024-05-16, updated 2025-10-02 | `[CITED]` |
| FIX-05 | Two-stage cutover: deprecated with the 26 releases; non-functional in all 27.0 OSes; Intune banner carries no date | [Apple: device management updates](https://support.apple.com/guide/deployment/device-management-updates-depd638aa061/web) (published 2026-06-08); [Intune: deprecated MDM policies for iOS/iPadOS](https://learn.microsoft.com/en-us/intune/device-updates/apple/deprecated-mdm-policies-ios) | Apple: published 2026-06-08; Intune: ms.date 2025-10-15, updated 2026-06-22 | `[CITED]` |
| FIX-06 | Settings-catalog display names: **Delay in Days**, **Install Time**, **Details URL**, **Target Build Version**, **Target Date Time**, **Target OS Version**; `OfferPrograms` is a real Apple key in the `Beta` dict (beta-programme enrolment) | [Apple: Software Update Settings declarative configuration](https://support.apple.com/guide/deployment/software-update-settings-declarative-dep0578d8b8a/web); [Intune: ref-apple-settings](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/ref-apple-settings) | Apple: published 2024-09-25; Intune: ms.date 2024-11-13, updated 2026-07-01 | `[CITED]` |
| FIX-07 | Hotpatch enabled by default for eligible devices; two config levels (tenant default for un-policied devices, per-policy override); Arm64 supported with CHPE disabled (`HotPatchRestrictions=1`); VBS required | [Hotpatch updates (windows-autopatch-hotpatch-updates)](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-hotpatch-updates); two-level config detail from [Configure hotpatch](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-hotpatch) | hotpatch-updates: ms.date 2026-05-28, updated 2026-06-02 — **`[VERIFIED: direct fetch this session]`** for VBS/CHPE/`HotPatchRestrictions=1`/licence-list text (quoted verbatim below); configure-hotpatch: ms.date 2026-01-13, updated 2026-04-29 `[CITED]`, not independently re-fetched this session | mixed — see per-claim labels |
| FIX-07 (Pro exclusion) | "This guide's Windows 11 Pro exclusion is not restated by the current article; treat it as unconfirmed" (prose flag, not a resolved fact) | Same hotpatch-updates page — its licence list (E3/E5, M365 F3, Education A3/A5, M365 Business Premium, Windows 365 Enterprise) and its `## Hotpatch on Windows 11 Enterprise or Windows Server 2025` H2 neither confirm nor deny Pro | ms.date 2026-05-28 | `[VERIFIED: direct fetch this session]` — genuinely silent, corroborating D-12's "unconfirmed" framing fresh; **do not resolve this to a yes/no** |
| FIX-08 | `MEETS_STRONG_INTEGRITY`'s 12-month patch-age requirement is a condition of that verdict, requiring **all partitions** (OS and vendor) | [Google Play Integrity: verdicts](https://developer.android.com/google/play/integrity/verdicts) | last updated 2026-05-01 | `[CITED]` |
| FIX-08 (date) | October 31 2026 Intune enforcement deadline | [In development - Microsoft Intune](https://learn.microsoft.com/en-us/intune/whats-new/in-development) | ms.date 2026-07-27, updated_at 2026-07-31 | **`[VERIFIED: direct fetch this session]`** — see External Research Finding section above for the full quote and query trail |
| FIX-09 | Ubuntu 24.04/26.04 LTS + RHEL 9/10 supported; RHEL-8-vs-9/10 is a genuine intra-Microsoft conflict, reproduced not flattened | [Intune: ref-supported-platforms](https://learn.microsoft.com/en-us/intune/fundamentals/ref-supported-platforms); `configure-custom-settings-linux`'s own Prerequisites text (RHEL 8 named) vs. `ref-supported-platforms` (RHEL 9/10) | ref-supported-platforms: ms.date 2025-10-14, updated 2026-07-01; configure-custom-settings-linux: ms.date 2025-01-09, updated 2026-07-01 | `[CITED]` |

**FIX-07 verbatim confirmation (direct fetch this session, `windows-autopatch-hotpatch-updates`):**

> "VBS must be turned on for a device to be offered hotpatch updates."
>
> "This requirement only applies to Arm64 CPU devices when using hotpatch updates. Hotpatch updates
> are not compatible with servicing CHPE OS binaries... To disable CHPE binaries, you can use the
> DisableCHPE system policy CSP. You can also create and/or set the following DWORD registry key:
> Path: `HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management` DWORD key value:
> `HotPatchRestrictions=1`"
>
> Licence list (Prerequisites): "One of the eligible licenses: Windows 11 Enterprise E3 or E5,
> Microsoft 365 F3, Windows 11 Education A3 or A5, Microsoft 365 Business Premium, or Windows 365
> Enterprise"
>
> Rollback: "Automatic rollback of a hotpatch update isn't supported but you can uninstall them... it
> does require a device restart."

All four sentences match the requirement text's characterization exactly (`[VERIFIED: direct fetch
this session]`). The page does **not** state a per-policy-vs-tenant-default distinction in the
section fetched — that specific claim rests on `configure-hotpatch` per STACK.md, not independently
re-verified this session (`[CITED]`, not `[VERIFIED]`).

## Re-Measured Repo Facts (executed at HEAD `9182718b`, 2026-08-19)

**Validator Architecture finding (flag, not override of D-15).** Direct inspection of all 16
C11-bearing `vX.Y-milestone-audit.mjs` scripts found that **15 of 16 (v1.5 through v1.19) construct
their reader via `createFrozenCorpusReader(MILESTONE_TAG, …)`** — confirmed for v1.19 by reading
`readFile()`/`walkMd()`'s implementation, both backed by the frozen `FROZEN` map keyed off that
script's own historical milestone-close SHA (e.g. `V119` = `a7bda73e`). **Only
`v1.20-milestone-audit.mjs` (0 `createFrozenCorpusReader` calls, no `MILESTONE_TAG` constant) reads
live `docs/` via `walkMd('docs')`.** This appears to diverge from CONTEXT.md D-15's claim that "every
one" of the 16 reads `walkMd('docs')` live, none frozen. Practical consequence for this phase: **the
validator that actually observes a live edit to `docs/operations/patch-management/*.md` for the C11
anti-pattern is `v1.20-milestone-audit.mjs`** (16/16 currently green — see below); the 15
frozen-at-tag scripts re-validate historical snapshots and are architecturally incapable of seeing
today's edits (their content is pinned at each milestone's own close SHA, predating this phase). This
does not change D-16's practical instruction (run v1.5 plus any one of v1.6-v1.20) — both currently
pass and re-running them costs nothing — but the planner should know that the operative gate for a
live edit is `v1.20-milestone-audit.mjs`, and a future v1.21-milestone-audit.mjs (HARN-04, Phase 153)
will likely inherit whichever windowKeywords regex v1.20 uses when it in turn becomes frozen.

**C11 `\bAutopatch rings\b` hits — `00-overview.md`** (python `re.finditer` on raw bytes, CRLF file):

| Line | Byte offset (this session) | CONTEXT.md D-13 offset | Delta |
|---|---|---|---|
| 78 | 5717 | 5701 | +16 |
| 83 | 6183 | 6163 | +20 |
| 86 | 6339 | 6317 | +22 |

Three hits confirmed (matches D-13's corrected count of 3, reversing the draft's claim of 2). The
small, consistent positive delta is attributable to CRLF/line-ending or matching-engine differences
between this session's raw-byte Python read and the validator's own `content.slice()` arithmetic —
immaterial to which lines/keepers are load-bearing, but the planner should use a live tool run
(`node scripts/validation/v1.20-milestone-audit.mjs`) as the final gate rather than hand-computed
byte arithmetic for any edit that shifts text before these hits.

**C11 `\bAutopatch rings\b` hit and keepers — `01-windows-wufb-rings.md`:**

| Item | Line | Byte offset (this session) | CONTEXT.md offset | Delta |
|---|---|---|---|---|
| `Autopatch rings` hit | 65 | 3990 | 3988 (D-54) | +2 |
| `disambiguation` keeper (H2 `## Windows Autopatch Rings (Disambiguation)` line 62, anchor line 61) | 61/62 | 3826 / 3876 | 3824 (D-54) | +2 |
| `Autopatch rings` hit (2nd) | 77 | 4839 | — | new |
| `PITFALL-9` keeper | 77 | 4783 | 4781 (D-55) | +2 |
| `mutual exclusion` / `mutually exclusive` keeper | 77 | 4793 / 4861 | 4859 (D-55, "mutually exclusive") | +2 |

Confirms D-54's "~36 char slack" (window opens at hit-200 ≈ 3790, keeper at 3826, slack ≈36) and
D-55's claim that both PITFALL-9 keepers for the line-77 hit sit inside the same blockquote FIX-02
rewrites. The consistent +2-byte delta across every offset (vs. CONTEXT.md's cited values) confirms
these are the same measurements taken with a slightly different byte-counting convention, not a
disagreement about which lines/keepers matter.

**Hotpatch section boundaries, `01-windows-wufb-rings.md`** (confirms D-22 exactly):

```
28: <a id="wufb-deployment-rings"></a>          29: ## WUfB Deployment Rings
61: <a id="autopatch-disambiguation"></a>       62: ## Windows Autopatch Rings (Disambiguation)
106: <a id="hotpatch"></a>                     107: ## Hotpatch
151: <a id="driver-firmware-policy"></a>       152: ## Driver and Firmware Update Policy
198: ## Related Resources
209: ## External References
```

Hotpatch section content spans lines 107-150 (next anchor at 151, next H2 at 152) — exact match to
D-22's corrected `:107-151`.

**FIX-01/FIX-02 sweep sites** (First/Fast/Broad-keyed, per REQUIREMENTS' warning that a comma-and
grep misses sites):

- `docs/operations/patch-management/00-overview.md:75-76` — `(Test, First, Fast, Broad rings)`
- `docs/operations/co-management/03-cocmgmt-migration-paths.md:25` — `(Test, First, Fast, Broad)`
- `docs/operations/patch-management/01-windows-wufb-rings.md:64` — `(Test, First, Fast, and Broad`
- `docs/operations/patch-management/01-windows-wufb-rings.md:69` — `the First Autopatch ring, the
  Fast Autopatch ring, and finally the Broad Autopatch ring`
- `docs/operations/patch-management/01-windows-wufb-rings.md:99` — `(Test, First, Fast, or Broad)`

Note lines 46/52/54/55/57/59 in `01-windows-wufb-rings.md` also contain the word "Broad" but refer
to the **WUfB deployment ring** table's own `Broad` ring name (a real, distinct WUfB-side ring name,
not part of the falsified Autopatch cohort naming) — do not touch those.

**Mutual-exclusivity sites** (`mutually exclusive` / `mutual-exclusion` / `mutual exclusion`,
case-insensitive):

- `00-overview.md:67` — `**Autopatch ring** are mutually exclusive concepts`
- `00-overview.md:86` — `The mutual-exclusion property of WUfB deployment rings and Autopatch rings`
- `00-overview.md:92` — `PITFALL-9 mutual-exclusion guidance` (a routing pointer, not the claim itself
  — REQUIREMENTS names 3 sites inside `00-overview.md`'s Ring Terminology; this is the third)
- `01-windows-wufb-rings.md:21` — `(PITFALL-9 mutual-exclusion is explicit)` (routing pointer)
- `01-windows-wufb-rings.md:77` — the PITFALL-9 blockquote itself (`**mutually exclusive**`)
- `01-windows-wufb-rings.md:85` — `This mutual-exclusion is the load-bearing PITFALL-9
  disambiguation`
- `docs/operations/app-lifecycle/04-android-mgp-lifecycle.md:24` — **unrelated** ("two delivery paths
  are mutually exclusive at the device level" — a different domain entirely; do not touch)

**FIX-09 Ubuntu `22.04` sweep — markdown files only** (`grep -rlE '\b22\.04\b' docs/ --include='*.md'`):
**26 files** confirmed (matches D-44's corrected figure exactly), **77 line-matches**. The
26th/anomalous file per D-44 is `docs/linux-lifecycle/00-enrollment-overview.md` at lines 21 and 113
(no adjacent "Ubuntu" token on those exact lines — `Ubuntu LTS Linux endpoints (22.04 / 24.04)` and
`Ubuntu version matrix (20.04 / 22.04 / 24.04)`). `scripts/generate-diagrams.py:1544` — one hit,
inside the `sub=` argument of a `title(W // 2, 36, …)` call (a centre-anchored subtitle at y=58 on a
1200px canvas — confirmed by reading the line; this is a subtitle, not the footer, matching D-48's
correction). Full 26-file list:

```
docs/_glossary-linux.md
docs/admin-setup-linux/00-overview.md
docs/admin-setup-linux/01-intune-linux-agent.md
docs/admin-setup-linux/02-enrollment-profile.md
docs/admin-setup-linux/03-compliance-policy.md
docs/admin-setup-linux/04-app-delivery.md
docs/admin-setup-linux/05-conditional-access.md
docs/decision-trees/00-initial-triage.md
docs/decision-trees/09-linux-triage.md
docs/end-user-guides/linux-intune-portal-enrollment.md
docs/index.md
docs/l1-runbooks/00-index.md
docs/l1-runbooks/30-linux-enrollment-failed.md
docs/l1-runbooks/31-linux-compliance-non-compliant.md
docs/l1-runbooks/32-linux-ca-blocking-web-access.md
docs/l1-runbooks/33-linux-agent-service-failure.md
docs/l2-runbooks/00-index.md
docs/l2-runbooks/24-linux-log-collection.md
docs/l2-runbooks/25-linux-agent-investigation.md
docs/l2-runbooks/31-8021x-log-collection.md
docs/linux-lifecycle/00-enrollment-overview.md
docs/linux-lifecycle/01-linux-prerequisites.md
docs/quick-ref-l1.md
docs/quick-ref-l2.md
docs/reference/4-platform-capability-comparison.md
docs/reference/linux-capability-matrix.md
```

**`.planning/` references in `docs/**/*.md`** (D-28's corrected 11 lines / 4 files — confirmed
exactly):

| File | Lines | Notes |
|---|---|---|
| `docs/cross-platform/apple-business/10-apple-tv-lifecycle.md` | 187, 241 | Point at `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` — exists in repo, not in publish bundle, invisible to the narrow SC#3 regex |
| `docs/l2-runbooks/25-linux-agent-investigation.md` | 93 | PITFALL-4, sole corpus occurrence at this site (D-30's third named substance-required site) |
| `docs/_glossary-apple-business.md` | 54, 96, 120, 136, 148, 164, 190 | 7 lines — the largest concentration; see D-30 for the two sites needing substance (120, 190) vs. label-stripping the rest |
| `docs/_glossary-linux.md` | 157 | The FIX-11 headline site — D-31: needs only the link unwrapped, substance already present in the adjacent sentence and duplicated at `admin-setup-linux/03-compliance-policy.md:44` |

Total: 2 + 1 + 7 + 1 = **11 lines / 4 files**, exact match to D-28's corrected figure. The narrow
success-criterion regex (`\.planning/research/\|\.planning/phases/`) does **not** match the
`apple-tv-lifecycle.md` sites (they reference `.planning/milestones/...`) — confirming D-29's point
that fixing all 11 is required even though the narrow grep alone would show fewer hits today.

**`OfferPrograms` sites** (D-52's corrected 5 hits / 3 files — confirmed exactly):

| File | Line |
|---|---|
| `docs/admin-setup-ios/07-device-enrollment.md` | 46 |
| `docs/operations/patch-management/00-overview.md` | 53, 114 |
| `docs/operations/patch-management/03-ios-update-lifecycle.md` | 56, 71 |

**FIX-04 WUfB rename census** (D-39's corpus-wide figures confirmed exactly: 113 tokens / 13 files;
compound `WUfB deployment ring` = 56 of 113 corpus-wide; spelled-out `Windows Update for Business` =
13 corpus-wide). Per-file breakdown within the five patch-management docs, refined for line-wrap and
capitalization tolerance (a naive single-line, exact-case grep undercounts true compounds that wrap
across a markdown line break or use capitalized `Deployment`/`Ring`, e.g. table headers and the H2):

| File | Total `WUfB` | Compound (whitespace/case-tolerant) | Non-compound (rename candidates) |
|---|---|---|---|
| `00-overview.md` | 30 | 11 | 19 |
| `01-windows-wufb-rings.md` | 60 | 50 | 10 |
| `02-macos-update-enforcement.md` | 2 | 0 | 2 |
| `03-ios-update-lifecycle.md` | 2 | 0 | 2 |
| `04-android-patch-delivery.md` | 2 | 0 | 2 |

Of `01-windows-wufb-rings.md`'s 10 non-compound occurrences, **2 are excluded from rename entirely
per D-42** (headings are validator-invisible and reader-maximal — leave as-is): line 16 (H1
`# Windows WUfB Rings + Hotpatch + Driver/Firmware`) and line 29 (H2 `## WUfB Deployment Rings`,
capitalized `Deployment`, so not caught by the lowercase-`d` compound regex but is a heading, not
body prose). The remaining 8 non-compound body-prose occurrences in that file (lines 9, 43 [table
header "WUfB Deployment Ring", capitalized, heading-adjacent but inside a table row = body prose],
80, 172, 175, 187, 188, 192, 211, 214 — External References section headings excluded per D-42's
filename/link-target carve-out) are rename candidates. `00-overview.md`'s 19 non-compound occurrences
are all body prose (no WUfB-bearing heading exists in that file) and are all rename candidates,
except the one token D-41 pins verbatim inside the ~10-line `## Ring Terminology` window (line 70's
`WUfB deployment ring` — already counted as compound, not at risk).

**FIX-12 exact conversion target**, `scripts/validation/check-phase-59.mjs`:

```js
// Current (line 448):
const c = readFile(OPS_INDEX_MD);
// readFile() at line 19 is fs.readFileSync — a LIVE read.

// Required (matching the readAtV15Close shape already used at lines 315/659):
const c = readAtV15Close(OPS_INDEX_MD);
```

`readAtV15Close`/`readAtV116Close` are already imported at line 14 of this file — no new import
needed, only the call-site swap at line 448 (inside the `id: 14` check block) and the assertion name
string at line 447 (currently `'V-59-14: docs/operations/00-index.md row counts -- Patch=5 / App=5 /
Drift=5'` — per D-35/D-37, append `[v1.5-frozen @ ba2cbc0]` and rephrase to "carried five Patch rows
at v1.5 close").

**Current validator pass/fail status** (all run live at HEAD `9182718b`, this session):

| Validator | Result |
|---|---|
| `check-phase-53.mjs` | 26/26 PASS |
| `check-phase-54.mjs` | 32/32 PASS |
| `check-phase-57.mjs` | 26/26 PASS |
| `check-phase-59.mjs` | 36/36 PASS |
| `c17-eee-contract.mjs` | 234 files, 0 violations (matches D-33 exactly) |
| `check-nav-hub-links.mjs` | 0 hub-presence failures, 0 corpus-link failures |
| `v1.5-milestone-audit.mjs` (C11, frozen at V15) | 12/12 PASS |
| `v1.20-milestone-audit.mjs` (C11, **live** — see Validator Architecture finding) | 16/16 PASS |

All eight are green today. `check-nav-hub-links.mjs` being green right now does not contradict
FIX-11's urgency — REQUIREMENTS explains the trap fires only *after* this milestone's own research is
archived at close (a future event outside this phase's own gate), which is exactly why FIX-11 must
land before that archival, not because today's gate is currently red.

## Package Legitimacy Audit

**Not applicable.** This phase installs no external packages. All edits are to existing markdown
content and one existing Node validation script (`check-phase-59.mjs`, already in the repo, using
already-imported helpers). No `npm install`, `pip install`, or equivalent occurs in this phase.

## Standard Stack

**Not applicable in the conventional sense.** This is a documentation-correction phase; there is no
new library, framework, or runtime dependency to select. The "stack" for this phase is:

| Tool | Role |
|---|---|
| Markdown (existing corpus convention) | All content edits |
| Node.js (existing `scripts/validation/*.mjs`, no new deps) | Validator gate; one call-site edit in `check-phase-59.mjs` |
| Python `scripts/generate-diagrams.py` (existing, unmodified except one line) | SVG regeneration for FIX-09 |
| `md5sum` / `diff -rq` (POSIX, already used in this repo's precedent) | Proving SVG regeneration idempotency (D-46 — `git status --porcelain` is insufficient under `core.autocrlf=true`) |

## Architecture Patterns

### Correction rhetorical shape (D-08, applies to FIX-05/07/08 and by extension FIX-01/02/03/06/09)

**What:** Corrected statement stated as primary fact; the superseded corpus assertion follows as a
paraphrased, corpus-attributed (never Microsoft-attributed) subordinate clause; a `**Source:**` line
follows beneath, outside any blockquote.
**When to use:** Every one of the eight correction requirements (FIX-01 through FIX-08), and FIX-09
where a version list is stated.
**Example (paraphrased from D-08/D-10's constraints, not the shipped prose — Claude's Discretion
governs exact wording):**

```markdown
Hotpatch is enabled by default for eligible Windows 11 Enterprise 24H2+ devices from May 2026
onward, configured at two levels — a tenant-wide default that applies only to devices not targeted
by a quality-update policy, and a per-policy setting on the Windows quality update policy that wins
where assigned — a correction to this guide's earlier framing, which described a single opt-out
toggle. VBS is required; Arm64 devices are supported with CHPE disabled
(`HotPatchRestrictions=1`).

**Source:** [Hotpatch updates](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-hotpatch-updates) (updated 2026-06-02)
```

Every pinned literal (`May 2026`, `VBS`, `default`, `opt-out` or `April 2026`) survives inside this
true sentence — the "pin is a literal-presence test, not a claim-endorsement test" pattern from
REQUIREMENTS.md's Validator Constraints table.

### C11 same-commit keyword-substitution ordering (D-13/D-14, `00-overview.md:76-87`)

**What:** Before deleting the `mutually exclusive` / `mutual-exclusion` prose that currently keeps
the three `Autopatch rings` hits (lines 78/83/86) C11-compliant, insert an already-allowlisted
keyword (`disambiguation`, `co-management`, `migration`, `transition`, `PITFALL-9`) into the same
±200-char windows, in the **same commit**.
**When to use:** Any edit to `00-overview.md:63-94` (the Ring Terminology section) that touches or
removes the word "mutually"/"exclusive"/"mutual-exclusion".
**Verification:** `node scripts/validation/v1.20-milestone-audit.mjs` (the live C11 reader — see
Validator Architecture finding above) before every commit touching this region.

### D-17's five commit-atom classes (reproduced verbatim from CONTEXT.md for planner convenience)

1. `00-overview.md` — FIX-01+02+03+04+06(2 sites)+10, **one commit** (C11 hits and keepers
   interleaved — cannot be split).
2. `01-windows-wufb-rings.md` — FIX-01+02+04+07+10, one commit.
3. `02-macos` / `03-ios` / `04-android` — one commit each.
4. `admin-setup-ios/07-device-enrollment.md` + `03-ios-update-lifecycle.md` — **one commit**
   (`V-54-32` couples `V-54-19/20/21`).
5. `co-management/03:25` · FIX-11's 4 files · FIX-09's 26 md files + generator + SVG ·
   `check-phase-59.mjs` (FIX-12, its own commit, landed first, never mixed with doc edits).

## Don't Hand-Roll

Not applicable — no engineering problem in this phase has a "roll your own vs. use a library"
choice. The nearest equivalent is: **do not hand-roll a new frozen-corpus reader for FIX-12** — reuse
the existing `readAtV15Close` export from `_lib/frozen-at-close.mjs` (already imported in
`check-phase-59.mjs`), exactly as Phase 128 commit `066a9068` did across 8 validators.

## Common Pitfalls

### Pitfall 1: Treating CONTEXT.md's byte offsets as final
**What goes wrong:** An executor edits text upstream of a C11 hit or pinned literal using a
hand-computed byte offset from CONTEXT.md (or this document), and the edit silently shifts every
downstream offset, breaking a keeper relationship that depended on exact proximity.
**Why it happens:** Byte offsets are workflow-fragile — they are correct only until the first
character is inserted or removed upstream of them.
**How to avoid:** Use offsets only to *locate* the relevant text region for manual review; verify
every commit with the live validator (`node scripts/validation/check-phase-54.mjs`, and
`v1.20-milestone-audit.mjs` for C11), never with arithmetic alone.
**Warning signs:** Any plan step that says "insert at byte N" instead of "insert after the sentence
ending '...'".

### Pitfall 2: Deleting a pinned literal instead of attributing it
**What goes wrong:** An executor reads "the corpus's May-2026 framing is unsupported by current
articles" and deletes the sentence containing `May 2026`, breaking `V-54-12`'s literal-presence pin.
**Why it happens:** "Unsupported by current articles" reads like an instruction to delete, but the
pins require the literal to survive — see the attribution pattern in REQUIREMENTS.md's Validator
Constraints table.
**How to avoid:** Always paraphrase-and-attribute per D-08/D-10; never delete a literal on D-10's
preservation list.
**Warning signs:** A diff that removes any of: `May 2026`, `VBS`, `default`, `opt-out`/`April 2026`,
`Apple OS 26`, `Oct 31 2026`/`October 31 2026`, `Android 13+`, `12-month`, `May 2025`,
`September 30 2025`.

### Pitfall 3: Splitting the C11 keyword-substitution and mutual-exclusivity-removal across commits
**What goes wrong:** A commit removes "mutually exclusive" from `00-overview.md` without first
adding a replacement allowlisted keyword in the same commit; `v1.20-milestone-audit.mjs` goes red at
whatever commit lands first if run mid-sequence (or the whole atom is force-landed together and
never independently verified).
**Why it happens:** The natural editing instinct is "delete the wrong thing, then separately add the
right thing."
**How to avoid:** Same commit, substitution-then-deletion order, per D-13/D-14 and ROADMAP's blast
radius note.
**Warning signs:** Two separate commits touching `00-overview.md:63-94`.

### Pitfall 4: Confusing the narrow FIX-11 success grep with the broader reader-facing defect
**What goes wrong:** An executor fixes only the lines matching
`\.planning/research/\|\.planning/phases/` (9 lines / 3 files under a narrow reading) and ships,
missing the two `apple-tv-lifecycle.md` sites that reference `.planning/milestones/...` and are
invisible to that regex but still a reader-facing dead link.
**Why it happens:** The Phase 145 success criterion literally quotes the narrow regex.
**How to avoid:** Fix all 11 lines / 4 files per D-28; the narrow grep returning 0 is a necessary but
not sufficient proof — confirm via the broader `\.planning/` grep too (which will also return 0 only
once all 11, including the milestones-path ones, are fixed).
**Warning signs:** `grep -rn "\.planning/" docs/` returning nonzero after the commit that claims
FIX-11 done.

### Pitfall 5: Stripping an identifier that has nowhere else to be defined
**What goes wrong:** `_glossary-apple-business.md:120`'s Sub-OU dangling reference to a deleted
`.planning/phases/62-.../62-CONTEXT.md` is naively label-stripped, leaving *"see … deferred items"*
pointing at nothing, or `l2-runbooks/25-linux-agent-investigation.md:93`'s sole corpus occurrence of
`PITFALL-4` is stripped, permanently orphaning that identifier.
**Why it happens:** The default replacement pattern (drop-the-path-keep-the-label) works for most
sites but not these three (D-30).
**How to avoid:** Before stripping any `.planning/`-referencing identifier, `grep -rn` for its bare
form across `docs/` to confirm ≥1 defining occurrence survives; if not, inline the substance instead.
**Warning signs:** A stripped site where the surrounding sentence no longer parses, or an identifier
(`PITFALL-N`, `CI-N`, `OP-N`) that goes from 1 corpus occurrence to 0.

### Pitfall 6: Assuming `git status --porcelain` proves SVG regeneration was idempotent
**What goes wrong:** After running `generate-diagrams.py`, an executor checks `git status
--porcelain` and sees no changes reported for the 13 unaffected SVGs, concluding regeneration was
byte-clean — but `core.autocrlf=true` combined with no `.gitattributes` entry for `.svg` means a pure
line-ending flip would be silently absorbed by git's own normalization and never show as a diff,
regardless of whether the bytes actually changed on disk.
**Why it happens:** Porcelain reports the *staged/committable* diff, not the literal on-disk byte
content.
**How to avoid:** Copy all 14 SVGs before running the generator, run it, then `md5sum` or `diff -rq`
the before/after directories directly — never rely on git status alone (D-46).
**Warning signs:** A verification step that reads "confirmed no changes via `git status`" with no
`md5sum`/`diff` step alongside it.

## Code Examples

### Evidence-line convention (D-01 precedent, confirmed via file read)

```markdown
> **Platform applicability:** ...

Corrected body prose stating the current first-party position, with the superseded corpus claim
paraphrased and attributed to the corpus as a trailing clause.

**Source:** [Article title](https://learn.microsoft.com/en-us/...) (updated 2026-06-19)
```

Placed *after* the paragraph carrying the corrected claim, *outside* the leading Platform
applicability blockquote (D-07), one per corrected claim, scoped to the five patch-management files
only (D-05).

### `readAtV15Close` conversion pattern (Phase 128 precedent, `_lib/frozen-at-close.mjs`)

```js
// Import already present at check-phase-59.mjs:14
import { readAtV15Close, readAtV116Close } from './_lib/frozen-at-close.mjs';

// FIX-12: swap the live read for the frozen-at-V15-close read (check-phase-59.mjs:448)
const c = readAtV15Close(OPS_INDEX_MD);
// no null-check: readAtV15Close throws on git error; let it propagate — matches the
// existing idiom at check-phase-59.mjs:659-660, NOT readAtV116Close's try/catch idiom (D-36).
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|---------------|--------|
| WUfB "Test, First, Fast, Broad" Autopatch ring naming | Autopatch default rings `Test` and `Last` | Legacy naming, superseded before this research's sources were fetched (no exact date exposed by Microsoft) | FIX-01 |
| "WUfB deployment rings and Autopatch rings are mutually exclusive" | Autopatch groups *contain* a `Update rings policy for Windows 10 and later` — containment, not exclusion | Same source update as above | FIX-02 |
| Product name "Windows Update for Business (WUfB)" | "Windows Update client policies" (WUfB retained only in "Windows Update for Business reports") | `waas-manage-updates-wufb` ms.date 2024-05-16 | FIX-04 |
| Hotpatch as opt-in, x64-only, single-toggle | Default-on for eligible devices, two config levels, Arm64 supported (CHPE disabled) | `windows-autopatch-hotpatch-updates` ms.date 2026-05-28 | FIX-07 |
| Legacy Apple MDM update commands functional through OS 26 | Deprecated with 26 releases; non-functional in all 27.0 OSes | Apple WWDC26 page, published 2026-06-08 | FIX-05 |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The FIX-01..FIX-09 source citations relayed from `.planning/research/{STACK,PITFALLS,SUMMARY}.md` (not independently re-fetched by this research pass, except FIX-07's VBS/CHPE/Arm64/licence claims and FIX-08's date) remain accurate as of this phase's execution | Claim → Source table | If any Learn/Apple/Google page changed between 2026-08-18/19 (when that research fetched them) and execution, a `**Source:**` line could cite a now-stale `updated_at`. Low risk given the short window, but the executor should spot-check any source whose citation is load-bearing for a verbatim-literal pin before landing the commit. |
| A2 | WebFetch's summarizing-model layer did not alter or fabricate the `ms.date`/`updated_at`/body text returned for `learn.microsoft.com/en-us/intune/whats-new/in-development` | External Research Finding | If wrong, FIX-08's direct citation is unsound and the executor should fall back to D-25's attribution path. Mitigated by this document's explicit re-fetch recommendation before the FIX-08 commit lands. |
| A3 | The two-configuration-level claim for Hotpatch (tenant default vs. per-policy override) rests on `configure-hotpatch`, cited from STACK.md but not independently re-fetched this session | Claim → Source table (FIX-07 row) | If STACK.md's characterization is imprecise, FIX-07's "two levels" framing could be subtly wrong. Low risk — STACK.md's research was itself adversarially reviewed 2026-08-19, one day before this phase's research. |

## Open Questions

1. **Is Windows 11 Pro actually excluded from Hotpatch, or merely unaddressed by the licence-list
   page?** (RESOLVED: cannot be resolved further without a second source — this session's direct
   fetch of `windows-autopatch-hotpatch-updates` found the page genuinely silent on Pro, consistent
   with D-12's "flagged unconfirmed, not resolved" instruction. The planner should carry the prose
   flag forward exactly as D-12 specifies, not attempt to resolve it to yes/no.)
2. **Does the WebFetch tool's AI-mediation layer risk altering FIX-08's source quote before it ships?**
   (RESOLVED at plan time 2026-08-19: the confirmatory re-fetch this document recommends is now an
   explicit, ordered step inside the FIX-08 task in `145-04-PLAN.md` — re-fetch
   `learn.microsoft.com/en-us/intune/whats-new/in-development` and diff the returned enforcement
   sentence against the quote recorded above **before** the `04-android-patch-delivery.md` commit
   lands, with a named fallback to D-25's attribution wording if the quote no longer reproduces. A
   single confirmatory check, not a new research pass. Nothing further is open.)
3. **Does the Validator Architecture finding (15 of 16 milestone-audit scripts read frozen, not live,
   contra D-15) change any planning decision for this phase?** (RESOLVED: CONTEXT.md D-15 and D-16
   were both amended post-research and now carry `[CORRECTED 2026-08-19, post-research]` markers
   recording exactly this finding — "**Exactly ONE** audit enforces C11 against today's `docs/` —
   `v1.20-milestone-audit.mjs`" — and D-16 supersedes the earlier "run v1.5 plus any one of
   v1.6-v1.20" instruction as *unsound* for the same reason. The locked decisions now agree with the
   measurement, so there is nothing left to reconcile. Every plan in this phase gates C11 on
   `v1.20-milestone-audit.mjs` only. The divergent-keyword-list observation is retained in D-16 as a
   binding note for Phase 153's new audit, not for this phase.)

