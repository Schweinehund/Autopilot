# Phase 157: STD + HYG — Authoring Standard & Corpus Hygiene - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-09-05
**Phase:** 157-std-hyg-authoring-standard-corpus-hygiene
**Areas discussed:** STD-02 gate slice, HYG-02 leak class, STD-01/03/04 landing surface,
HYG named-line vs class
**Method:** `/gsd-discuss-phase` → `/grill-me` (24 questions with drafted answers) →
`/adversarial-review` (5 parallel Finders → Adversary → Referee) → 9 owner rulings

---

## Method and outcome

The user selected all four gray areas and directed that `/grill-me` deepen the questions and
`/adversarial-review` adjudicate them. 24 drafted answers produced 73 deduplicated findings across five
Finders (measurement re-verification plus one per area). The Adversary, scored to lose double for a
wrong disproof, disproved 10 and confirmed 63. The Referee upheld 9 disproofs and overturned 1, leaving
**64 standing findings**.

Finder scores: measurements 101 · Area A 105 · Area B 102 · Area C 128 · Area D 81. Adversary +75.

Five of the draft's own recommendations were falsified. Two Finder findings were themselves falsified on
appeal — both would have caused real damage had they shipped.

---

## Area A — the STD-02 mechanical gate slice

| Option | Description | Selected |
|--------|-------------|----------|
| Modal reading — anthropomorphism + person-first | "can report zero" wins 3-to-1 across governing text; person-first enters with a documented protection filter and two named exemptions | ✓ |
| Indicative reading — anthropomorphism alone | Take `ROADMAP.md:193` at face value; simpler, but STD-02's three-exclusion clause must be re-worded as a pure recording obligation | |
| Modal, person-first deferred | Adopt the reading, ship anthropomorphism only, record person-first as an evidenced candidate | |

**User's choice:** Modal reading — anthropomorphism + person-first.

**Notes:** The draft's answer was `{anthropomorphism, vague-link, empty-alt}` on the ground that those
three "report zero". Two independent Finders proved `vague-link` and `empty-alt` cannot fire on any
input — `check.py:66` `mask_code()` blanks `](…)` before the rules run, destroying what both regexes
require — so the observed zero was a dead regex, not a clean corpus. The Adversary then proved
`anthropomorphism` *does* fire, narrowing the finding from "3-for-3 vacuous" to "2-for-3 dead". The
Referee overturned the Adversary's attempt to defend the indicative reading after finding two errors in
it: the cited line was SC#1 rather than SC#2, and `ROADMAP.md:187` — the phase Goal, six lines above —
carries the modal.

---

## Area A — REQUIREMENTS.md:62

| Option | Description | Selected |
|--------|-------------|----------|
| Annotate-and-supersede | Correct the sentence and state which corpus the replacement was measured over; baseline the apex chain first | ✓ |
| Supersede `:62` and amend STD-02 | Also name person-first as a fourth recorded class | |
| Leave `:62`, record drift elsewhere | Smallest blast radius, but a bolded false statement survives in the file a future milestone reads first | |

**User's choice:** Annotate-and-supersede.

**Notes:** The draft had aimed its amendment at STD-02 for a contradiction that does not exist. The
falsified clause is one line above — the `[MEASURED 2026-08-24]` preamble's "No rule class is at zero",
false today and necessarily false when written. The draft also under-counted REQUIREMENTS.md's live
readers by an order of magnitude (1 named vs 20+ actual).

---

## Area A — gate placement and enforcement

| Option | Description | Selected |
|--------|-------------|----------|
| Tool now, enforcement at Phase 159 | Land the standalone tool with its `--self-test`; state plainly that it is not enforcing yet | ✓ |
| Tool + scheduled workflow now | Gives it a real runner, but adding a workflow has zero precedent and HARN-04 assigns the next one to Phase 159 | |
| Amend the 157/159 boundary | Cleanest mechanically, but overturns Phase 155's D-52 one phase later | |

**User's choice:** Tool now, enforcement at Phase 159.

**Notes:** The draft proposed a `pull_request: paths: ['docs/**']` job. Measured inert — no `push:`
trigger exists repo-wide, `git log --all | grep -ci "merge pull request"` returns 0, and no `paths:`
filter watches `docs/**`. The draft also cited two content-phase precedents for a standalone gate; only
one survives (`carve-gate.mjs` touched zero `docs/` files in a governance phase).

---

## Area B — the HYG-02 leak class

| Option | Description | Selected |
|--------|-------------|----------|
| Drop needle (iii), record why | Keep the `.planning/` literal and a widened artifact-name needle covering the extension-less form; record the requirement-ID arm as mechanically undecidable | ✓ |
| Enforce needle (iii) | Honors "catch the class" literally, at 72-108 files plus a registry/filename-map/bundle cascade | |
| Allowlist-bounded needle | Honest about being a pin file rather than a class rule | |

**User's choice:** Drop it, record why.

**Notes:** All three of the draft's needles failed on HYG-02's *own second named defect* —
`00-overview.md:266` cites a bare `ROADMAP` with no `.md`, matching none of them. The draft also missed
47 `PITFALLS.md`/`FEATURES.md` citations across 19 files, ~10 carrying the `research/` prefix, which is
the strongest instance of the defect shape in the repository. Needle (iii) proved undecidable: `OP-11`
is simultaneously a planning pitfall ID, a published matrix cell and a callout header, and `DELEG-05`
sits in a published H1.

---

## Area B — `Phase NN` citations

| Option | Description | Selected |
|--------|-------------|----------|
| Out of the gated class, census recorded | Leave ungated for v1.22; record the four-bucket census as a deferred item | ✓ |
| Gate it, accept the 95-file rewrite | Most aggressive reading, far past the phase's scoped surface | |
| Gate only the 5 nearest clones | Bounded, catches the demonstrable siblings | |

**User's choice:** Out of the gated class, census recorded.

**Notes:** The draft assumed the "large majority" of 607 hits were mandated Version History rows.
Measured the opposite: body prose 332 (49.8%) across 95 files, Version History 198 (29.7%). The
exemption's stated ground failed twice more — the standard's mandated row carries a *milestone* token,
not a phase number, and 351 of 527 rows carry no `Phase NN` at all. The five near-identical clones of
the named defect remain in scope with it (CONTEXT D-17).

---

## Area B — FIX-11

| Option | Description | Selected |
|--------|-------------|----------|
| Re-open and discharge explicitly | Mark it re-opened, fix the lines under HYG-02, record the discharge with git evidence | ✓ |
| Fix, note the regression, leave the status | Avoids editing a closed milestone's requirements file | |
| Fix the lines only | Smallest scope; the false `Complete` survives | |

**User's choice:** Re-open and discharge explicitly.

**Notes:** Surfaced by a Finder verifying the draft's "standing gate" claim from git rather than
accepting it. FIX-11 was driven to 0 by Phase 145 and re-broken seven days later by Phase 151 — with
the same two lines HYG-02 must fix — and `V-145-ARCHIVALDRIFT` reports 0 because its regex matches only
markdown-link syntax while the regression landed as inline code.

---

## Area C — the authoring standard's landing surface

| Option | Description | Selected |
|--------|-------------|----------|
| `## Prose Style Authoring Standard` (no ID) | No collision with the four live `STD-0N` meanings; milestone token in the Version History row where both precedents put it | ✓ |
| `## Prose Style Standard (STD-06)` | Matches the suffix pattern but invents an ID no requirement carries | |
| `## Prose Style Standard (v1.22 STD-01..STD-04)` | The draft's original; two deviations from precedent plus an ambiguity against `:593` | |

**User's choice:** `## Prose Style Authoring Standard`.

**Notes:** The draft flagged one collision. Measured four: `STD-01`/`STD-02`/`STD-03` are v1.15
requirements — and `STD-01` is the requirement to author this very file — while `STD-NNN` is the
meta-doc ID namespace and the file's own `doc_id` is `STD-001`. A parallel collision exists for HYG
(`:648` already carries a `v1.19 HYG-05` row).

---

## Area C — the wiring surface

| Option | Description | Selected |
|--------|-------------|----------|
| Project `CLAUDE.md` | The only file loaded unconditionally every session; today carries zero doc-authoring guidance | ✓ |
| The 8 `docs/_templates/` files | The draft's original; necessary but provably insufficient | ✓ |
| `google-style/SKILL.md` | Needed regardless — the passive→active hazard has no home anywhere else | ✓ |
| `google-style-verify/SKILL.md` | Measured redundant; `:104-121` already carries the full `must` callout | |

**User's choice:** All three of the first options; the verify skill excluded.

**Notes:** The draft's C7 (add the `must` hazard to the verify skill) buys nothing — it is already there
verbatim with the 26-vs-19 counts, confirmed against `_JUDGE-VERDICTS.json`. Its C8 ("no change to the
rewriter skill") was what left the passive→active hazard homeless: that skill returns zero hits for
"passive", "actor" or "invent". Templates alone were shown insufficient by the 29 `docs/operations/`
files, for which no template exists.

---

## Area C — findings that changed answers without needing a ruling

- **C17 enrollment (CONTEXT D-27).** The draft answered "not enrolled, C17 does not apply" after
  explicitly instructing itself to verify rather than assume. `EEE-SOP-standard.md:2` carries
  `doc_id: STD-001` and the enrollment loop has no meta-doc exclusion. The binding constraint this
  hides is assertion #12's 200-char blockquote cap, against a hazard callout that is ~900 characters as
  one run.
- **STD-03's homes (CONTEXT D-33).** The draft's premise — REQUIREMENTS.md is archived at close — is
  false here; deletions stop at v1.17. And nothing in the GSD workflow set reads `docs/_standards/`, so
  the rule also goes into `check.py`'s docstring and `RESUME.md`.

---

## Area D — the hygiene defects

No option table: these resolved to measurement rather than preference. Recorded here because the
requirement text was wrong in four places.

| Defect | Requirement says | Ruling |
|---|---|---|
| HYG-01 | one site at `00-index.md:32` | **5 sites in 3 files**; the named one is the least published (no `doc_id`), while `docs/index.md:309` is EEE-enrolled and ships in the bundle |
| HYG-03 | conflation plus two bare twins | **One twin was already linked** by Phase 152; only `03:141` is bare, and its new link must use the explicit anchor id, not the fragile em-dash slug |
| HYG-04 | one site; correct it to agree with the six 2025-06-17 citations | **Three sites** carry the wrong value — and the requirement's direction is right, contrary to a Finder's inversion |
| HYG-05 | an ambiguous antecedent to disambiguate | **A false statement.** A disambiguation satisfying the literal wording still ships a wrong planning limit |
| HYG-06 | six terms need glossary entries | **DFCI already has one**; five remain, and `_glossary.md` has no category H2 that naturally takes patch vocabulary |
| HYG-07 | flip `status: planted` to `closed` | Correct as an edit, but **mechanically inert** — both values are off-schema against the scanner's `{dormant, active, triggered}` |

**The date question, twice reversed.** The draft ruled `2025-06-17` on a majority-and-provenance
fallback. Finder 5 pulled the page's raw bytes, found `ms.date 2025-06-17` and `updated_at 2026-06-19`,
and inverted the ruling on an 18-to-7 corpus census. The Adversary found the rendered
`<local-time>2025-06-17</local-time>` "Last updated on" element and inverted it back. The Referee
settled it with a control — an unrelated Learn page with a divergent pair renders its `ms.date` — and
recorded `ms.date` as the corpus convention. Net: the draft's answer was right, and the corpus now has
an evidenced date convention for the first time.

**Glossary placement** was ruled by precedent rather than by asking: Phase 149/150's "shoehorn plus
re-declare" — place under the closest H2 and amend the `## Summary` coverage enumeration in the same
commit.

---

## Claude's Discretion

- The gate tool's filename and internal structure, within the constraints of CONTEXT D-10 to D-12.
- Wording of the `REQUIREMENTS.md:62` annotation and the standard's Version History row.
- Commit message wording and granularity, within CONTEXT D-50's ordering.
- Which `_glossary.md` category H2 each of the four Windows terms lands under.
- Whether `EEE-SOP-standard.md`'s `last_verified`/`review_by` are bumped, provided the choice is stated.

---

## Deferred Ideas

Recorded in full in `157-CONTEXT.md` `<deferred>`. New to this phase:

- The 95-file `Phase NN` body-prose population, with its four-bucket census.
- The requirement-identifier leak arm, with the 129-of-142 evidence and the published-H1 casualties.
- ~18 citations copied from `updated_at` rather than `ms.date`, implied once the convention is fixed.
- Citation freshness drift — 5 of 32 probed URLs stale against both metas.
- Seed-status schema normalisation, which would flip SEED-001 to open at a close gate.
- The two-copy skill divergence (`~/.claude/skills/` untracked vs the tracked project copy).
- `_glossary.md:33`'s non-alphabetical index tail.
- DEFERRED-CLEANUP convergence and `docs/operations/` EEE enrollment, both pre-existing.

Carried forward from Phases 155 and 156: a merge-marker gate, the `V-132`/`V-137-HUBSNOTWIRED` regex
repair, a corpus-wide evidence-label taxonomy, `judge-packets.py` alignment quality, `pins2.py`
cross-repo geometry, and `.gitattributes` (already deferred to Phase 159).
