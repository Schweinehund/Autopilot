# Phase 157: STD + HYG — Authoring Standard & Corpus Hygiene - Context

**Gathered:** 2026-09-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Make Google style the standing authoring standard for **new** documents — a bounded mechanical gate,
the non-gate rule written down where a future milestone will find it, and both measured rewrite
hazards recorded — and close the located hygiene defects plus the stale-open SEED-001.

Discharges STD-01, STD-02, STD-03, STD-04, HYG-01, HYG-02, HYG-03, HYG-04, HYG-05, HYG-06, HYG-07.

**Out of scope in both directions.** No further corpus styling — Phase 156 closed that. No publish
bundle and no VERIFY-06 git-history audit (Phase 158). No harness work and no
`check-phase-157.mjs` — Phase 159 authors every v1.22 content-phase validator leaf
(Phase 155 **D-52**, `155-CONTEXT.md:533`). A defect found outside the named surface is recorded,
not fixed.

This CONTEXT was produced by `/gsd-discuss-phase` + `/grill-me` + `/adversarial-review`
(5 parallel Finders → Adversary → Referee). 24 drafted answers → 73 deduplicated findings →
**64 standing** after adjudication: the Adversary disproved 10, the Referee upheld 9 and overturned 1.
Every `[MEASURED]` row below was executed against this repository at HEAD `7e399a1b` on branch
`v1.22/154-style-landing`; all seven agents verified `git status --porcelain` byte-identical at start
and end, and no agent edited the repository.

**Five of the draft's own recommendations were falsified, and two Finder findings were themselves
falsified on appeal.** The draft's gate slice, its leak-class needles, its C17 answer, its
`pre-commit-advisory.sh` fact and its `v1.9-DEFERRED-CLEANUP` pin list were all wrong. But a Finder's
`person-first` fix would have falsified a Windows OOBE string, and a Finder's date inversion would have
spread the wrong citation date from 8 sites to 11. Both were caught on appeal. All corrections below
are load-bearing.

</domain>

<decisions>
## Implementation Decisions

### Area A — The STD-02 mechanical gate

- **D-01:** The **modal reading governs**, by owner ruling. `[MEASURED]` the governing text is modal
  3-to-1 — `.planning/REQUIREMENTS.md:6` (milestone bar) and `:65` (STD-02) both read "**can** actually
  report zero", and `ROADMAP.md:187` (the Phase 157 Goal) reads "bounded to exactly the slice that
  **can report zero**". The sole present-indicative is `ROADMAP.md:193` (SC#2). No requirement-vs-SC
  precedence rule exists in this repository or in `gsd-core`, so the tie breaks on weight of text.
  Decisive secondary ground: **both** readings say "on unprotected prose", and `check.py` has no notion
  of protection, so the indicative reading cannot mean "raw `check.py` output is 0" either.

- **D-02:** The gate is **`anthropomorphism` + `person-first`**, and `vague-link`/`empty-alt` are
  recorded as *structurally incapable of firing*, deliberately not gated. `[MEASURED]`
  `check.py:66` `mask_code()` runs `re.sub(r"\]\([^)]*\)", …)` **before** `RULES` (`:117`), destroying
  the `](` that `vague-link` (`:40`) and `empty-alt` (`:42`) both require; three independent probe files
  carrying six well-formed vague links and two `![](img.png)` returned **zero** from both rules.
  `anthropomorphism` (`:37`) contains no `](`, no backtick and no URL, survives masking, and fired 2-3
  times on every probe — it is a live regex at 0 corpus hits, which is what a regression guard is.
  A green from a dead regex is worse than no rule at all. — **Reversibility:** costly — the exclusion
  record is a permanent, milestone-crossing artifact that STD-03 exists to stop a later milestone
  re-litigating; changing the slice later means re-opening that record and re-arguing the reading.

- **D-03:** `person-first` enters the slice with a **documented protection filter and two named
  exemptions**, and the filter is described in prose, not hand-rolled into the gate. `[MEASURED]`
  raw 86 hits; running `sweep3.py:64-67`'s actual `PROTECT` regex plus its skip set (`quoted_lines`,
  fence, indent, `HEADING`, table rows, `KEEP_LINE`) leaves **2 mechanical survivors and 0 genuine
  unprotected-prose hits**. The two survivors are `05-linux-update-delivery.md:211` (a quotation that
  survives only because it **wraps a line** — `PROTECT`'s quote arm is `[^"\n]{1,400}`, line-at-a-time)
  and `apple-business/16-managed-apple-account-runbook.md:258` (a blockquoted template email to end
  users). **Both are must-not-edit.**

- **D-04:** The four sites an earlier draft proposed to "fix" are **protected quotations and must not be
  touched**. `[MEASURED]` `admin-setup-apv1/06-user-driven.md:71` is the Windows OOBE string
  `"Let's set things up for work or school"`; `end-user-guides/android-work-profile-setup.md:106` is the
  Android error dialog `"We couldn't sign you in."`; `l1-runbooks/31-linux-compliance-non-compliant.md:77`
  is a quoted user report. `sweep3.py:56-63` states the rule in its own words: *"a verbatim vendor
  sentence or a UI string quoted INLINE sailed through three times… Falsifying any of them is worse than
  the style violation it fixes and no validator can see it."* `google-style/SKILL.md:127` names the same
  class an anti-pattern. This is recorded because a Finder recommended the edit and was overturned.

- **D-05:** The exclusion record carries **unprotected counts, never raw**, and never conflates the two
  `admin` entries. `[MEASURED]` raw-vs-unprotected: person-first 86→0, em-dash 3,123→832,
  directional 207→96, latin-abbrev 61→35, future-tense 91→40, passive 3,756→2,790.
  `word-list.md:116` `DON'T USE: admin` (2,220) and `:121` `DON'T USE: Android: administrator` (1,156)
  are **distinct entries**, and SC#2 excludes only the Android one. Recording "person-first: 86,
  permanently excluded" would defeat STD-03 in the other direction.

- **D-06:** The record must **not** state that headings are excluded via `--no-headings`. `[MEASURED]`
  the flag only adds `"headings"` to `skip`, suppressing `heading-case` and `heading-punct`
  (`check.py:110-118`); the nine structural rules still run on heading lines and **142 hits land there**
  (em-dash 128, latin-abbrev 8, passive 5, directional 1), e.g. `EEE-SOP-standard.md:446`. By contrast
  `sweep3.py:199` skips heading lines outright. SC#2 requires the exclusion be "stated inline" — state
  the mechanism truthfully or the deliverable ships a falsehood.

- **D-07:** `.planning/REQUIREMENTS.md:62` is **annotate-and-superseded**, by owner ruling. `[MEASURED]`
  its `[MEASURED 2026-08-24]` preamble reports **9,363** candidates and ends with the bolded
  **"No rule class is at zero."** Today the figure is **10,402** (+1,039, +11.1%; passive 3,324→3,756,
  em-dash 2,916→3,123, word-list 2,573→3,078, assorted 303→445) and three classes are at zero. Because
  `vague-link` and `empty-alt` cannot fire on any input, the sentence was **necessarily false on
  2026-08-24 as well** — not merely stale. The supersession must state which corpus the replacement was
  measured over; whether 9,363 covered `docs/` or the pre-landing scratch corpus is unreconciled.
  — **Reversibility:** costly — REQUIREMENTS.md is read live by 3 `check-phase-*` validators, 20
  `vN-milestone-audit.mjs` harnesses and 15 workflows.

- **D-08:** Baseline the **apex chain**, not one validator, before touching REQUIREMENTS.md.
  `[MEASURED]` `V-54-21` (`check-phase-54.mjs:345-360`, `REQ` at `:30`, chained at `:587`) is a NEGATIVE
  assertion about `05-compliance-policy.md` literals — near-zero risk, and the draft flagged it as the
  headline one. The exposure it missed: `V-54-27` (`:437`) recursively walks the **entire `.planning/`
  tree** for a bare `> **Platform:**` token, and REQUIREMENTS.md has 20+ live readers.

- **D-09:** The gate is a **standalone tool in `scripts/validation/`, with no CI workflow, and it is not
  enforcing until Phase 159** — by owner ruling, with the gap stated plainly in the phase artifacts.
  `[MEASURED]` no `push:` trigger exists in any of the 18 workflows; `git log --all | grep -ci "merge
  pull request"` → **0** (all 64 merges are local worktree merges); no `paths:` filter watches `docs/**`.
  The project ships by push + `workflow_dispatch`. The content-phase standalone-gate precedent is
  **one**, not two — `git show --stat 8d4235bf` (carve-gate.mjs, Phase 139) touches **zero `docs/`
  files** in a governance phase; only `check-nav-hub-links.mjs` (`eee079ce`, Phase 123) qualifies, and
  it was made enforcing by `check-phase-123`/`-143`. Adding a `.github/workflows/` file has zero
  precedent and HARN-04 assigns the next one to Phase 159. Do not claim "a mechanical gate exists"
  unqualified.

- **D-10:** The gate **invokes `check.py`** and never forks or reimplements it, and it parses the
  bracketed rule field **positionally**. Never grep the output stream for `[anthropomorphism]` —
  `check.py:139` prints guidance text sliced from `word-list.md`, so a corpus or reference edit could
  trip a substring match. Do not add an `--only` flag: the skill is vendored. Note for Phase 159's
  wiring: `grep -rn 'python\|setup-python\|pip' .github/workflows/` → **0**; all 18 workflows are
  `setup-node@v4`, so a CI job needs `setup-python`. Cite the argv surface as `check.py:138-142`.

- **D-11:** Anti-vacuity is a **`--self-test` that runs every time**, not a one-time perturb-and-restore.
  A file-count floor proves files were read, not that a rule can match — 294 scanned, 0 hits, PASS is
  exactly what a dead regex produces, and it is why `vague-link`/`empty-alt` survived into the draft.
  The fitting precedent is `check-nav-hub-links.mjs --self-test` (`:18-21`, `:311`), invoked as a check
  by `check-phase-143.mjs:123`: feed each gated rule a synthetic violating string every run and assert
  it fires. **That would have caught D-02 on the first run.** Keep a floor as a secondary guard but
  count `== <path>: N candidate(s)` header lines **from the run's own output**, so an empty argv, a
  crashed interpreter or a non-zero exit cannot yield "0 matches → PASS".

- **D-12:** Scope is the **whole corpus, enumerated with `git ls-files`**, not a filesystem walk and not
  a changed-files set. `[MEASURED]` runtime is **64-75 seconds** over 294 files — not "nothing", but
  acceptable; a changed-files gate cannot catch a regression introduced by a rename or a bulk sweep.
  `docs/` holds **576 files on disk but 294 tracked `.md`**; the difference is `docs/graphify-out/`
  (268 untracked, gitignored at `.gitignore:73`, currently 0 `.md`). A filesystem walk makes the result
  depend on whether the author last ran the graphify skill.

- **D-13:** `scripts/validation/pre-commit-advisory.sh` is **left untouched and dropped from the phase
  artifacts entirely**. `[MEASURED]` it is **not dead** — `README-supervision-pins.md:132-140` is a live
  tracked install document with a graceful-degradation contract at `:145-165`;
  `audit-harness-v1.5-integrity.yml:324-329` runs job `pin-helper-advisory` (`continue-on-error: true`,
  Phase 43 D-14 / Phase 48 D-22); `scripts/hooks/README.md:26-32` carries the tiered doctrine; and
  `145-05-PLAN.md:139` cites it one milestone ago. Its `PINNED_FILE_PATTERN` (`:6`) is Android/Linux
  supervision-pin drift, **not prose style** — the question was a category error. Recording it as dead
  would ship a falsehood contradicting three live tracked files.

### Area B — The HYG-02 leak class

- **D-14:** The class is **two needles, not three**, by owner ruling. Needle (i) the literal
  `.planning/`; needle (ii) `(ROADMAP|REQUIREMENTS|PITFALLS|FEATURES|RESEARCH|STACK|PLAN|SUMMARY)`
  **with and without the `.md` extension**. The extension-less arm is mandatory: `[MEASURED]`
  HYG-02's own second named defect, `00-overview.md:266` — "…per the **Phase 59 ROADMAP** entry" —
  matches **none** of the draft's three needles, so the `[MEASURED]` criterion would have reported 0
  with a named defect still in place.

- **D-15:** Needle (iii), the requirement-identifier arm, is **dropped and recorded as mechanically
  undecidable**, by owner ruling. `[MEASURED]` `[A-Z]{2,6}-[0-9]{2}` over `docs/` → 149 distinct / 360
  occurrences / 104 files, of which **129 of 142 outside the meta dirs are formal planning requirement
  IDs** — but the same token carries both roles: `OP-11` (19 hits) is a `.planning/research/PITFALLS.md`
  pitfall ID **and** a published permission-matrix cell (`01-role-permission-model.md:244`) **and** a
  callout header (`:247`); `DELEG-05` sits in a published **H1**
  (`15-mdm-server-reassign-runbook.md:29`); `STD-05`, `RE-237` and `PITFALL-7` are published vocabulary;
  and `UTF-8` (5), `UTF-16`, `OS-26` (14), `CD-07`, `PHASE-45` are pure shape false positives. Enforcing
  it means editing published H1s, which changes the registry `Title` column that
  `build-filename-map.mjs:4` treats as "the sole source of truth" and `build-publish-bundle.mjs` fails
  closed on. This is a requirement reinterpretation and must be recorded as one.
  — **Reversibility:** one-way — HYG-02's text mandates catching "the class rather than the prefix";
  dropping an arm is a documented narrowing that a later milestone must re-open deliberately, not
  rediscover.

- **D-16:** The widened needle catches the **47 `.planning/research/` artifact citations the draft never
  looked for**. `[MEASURED]` `PITFALLS.md|FEATURES.md` → **47 hits / 19 files**, ~10-11 carrying the
  `research/` prefix — literally the "escaped by dropping `.planning/`" shape HYG-02 describes, and the
  strongest instances in the repository. Also `RESEARCH.md` (9), `STACK.md` (6), `62-SCRAPE-PREP.md`
  (1). Worst single sites: `16-managed-apple-account-runbook.md` (10),
  `15-mdm-server-reassign-runbook.md` (7), `17-audit-log-scoping-runbook.md` (6). The brief's
  "10 hits / 10 files" census is **not reproducible by any needle variant** — 4-needle gives 8/8,
  6-needle 9/9, no-boundary 11 hits over 9 files.

- **D-17:** The **five near-identical clones of the named `:266` defect** are in scope with it.
  `[MEASURED]` `grep -rn "amend the operations index" docs/` → **10 hits**;
  `drift-migration/00-overview.md:204`, `drift-migration/01-windows-drift-detection.md:221`,
  `app-lifecycle/00-overview.md:220` and `app-lifecycle/02-macos-pkg-dmg-pipeline.md:213` are the same
  sentence template. `app-lifecycle/02:213` leaks **"per ROADMAP line 457"** — a line number into a
  planning file, strictly worse than the named defect.

- **D-18:** `Phase NN` is **out of the gated class for v1.22**, with its census recorded as a deferred
  item — by owner ruling. `[MEASURED]` the draft's "large majority inside Version History rows" is
  false: 666 occurrences on 607 lines split as **body prose 332 (49.8%) across 95 files**, Version
  History 198 (29.7%), other table rows 115, `## Changelog` 21. The exemption's stated ground is false
  twice over — `EEE-SOP-standard.md:209-223` mandates one row whose canonical form is
  `| YYYY-MM-DD | v1.15 EEE reformat — content not re-reviewed |`, a **milestone** token with zero phase
  numbers, and **351 of 527 VH rows across 251 files carry no `Phase NN` at all**. And provenance mostly
  lives under a legacy `## Changelog` heading anyway (`02-zero-touch-portal.md:263` vs `:270`). Gating
  body prose would put the gate **RED on 95 files at HEAD**, past the HYG preamble's own bound of
  "defects that already carry a file and a line".

- **D-19:** `docs/_standards/EEE-SOP-standard.md:578` and `:649` are **both edited** — keep the
  provenance, drop the path. `[MEASURED]` `grep -rn "\.planning/" docs/` returns **2**, and both hits
  are these lines; neither is one of HYG-02's named defects. `:649` reads "Owner-ruled, recorded as D-04
  in `` `.planning/phases/151-…/151-CONTEXT.md` ``" — the provenance survives as "recorded as D-04 in the
  Phase 151 context"; only the path, which rots at milestone archival, goes.

- **D-20:** **FIX-11 is re-opened and discharged explicitly**, by owner ruling — the real reason these
  two lines matter. `[MEASURED]` FIX-11's own criterion (`.planning/milestones/v1.21-REQUIREMENTS.md:41`)
  is `grep -rn "\.planning/research/\|\.planning/phases/" docs/` returns **0**. Driven to 0 by
  `9fd7cf1c` (Phase 145, 2026-08-19); **re-broken seven days later by `285a65d5`** (Phase 151,
  2026-08-26), which introduced exactly `:578` and `:649`. At HEAD the criterion returns **2**, while
  `V-145-ARCHIVALDRIFT` (`check-phase-145.mjs:142`) reports 0 because its regex
  `/\]\([^)]*\.planning\/(research|phases)\//` matches only **markdown link syntax** and both hits are
  inline-code / table-cell text. `v1.21-REQUIREMENTS.md:195` still reads `| FIX-11 | Phase 145 |
  Complete |`. A shipped, Complete-marked requirement has been RED for ten days and nothing knows.
  Fixing the lines silently would repeat the exact failure mode.

- **D-21:** The standing gate **folds FIX-11's criterion in alongside the bare `.planning/` literal**, so
  the regression cannot recur invisibly. This is the project's own proof that a one-time measurement is
  not a guard.

- **D-22:** `docs/v1.9-DEFERRED-CLEANUP.md` gets its bare `REQUIREMENTS.md lines 70, 88` citation fixed
  and is **not moved or deleted** — right answer, and the draft's reason was fabricated. `[MEASURED]`
  `grep -rn "docs/v1\.9-DEFERRED-CLEANUP" scripts/` → **zero hits**; the validators the draft named pin
  different files (`check-phase-62/63/64/65/66` → `.planning/milestones/v1.6-`, `-70` → `v1.7-`,
  `-72/-73` → `v1.8-`, `-151` → `v1.19-`). **The actual authority is
  `.planning/milestones/v1.9-DEFERRED-CLEANUP.md:191`**: *"CROSS-LINKED, **NOT deleted or
  overwritten**… the `docs/` file carries the fuller PSSO-FUT-01 detail authored at Phase 77 and remains
  valid."* Verified: the `docs/` copy is materially fuller, so the sibling is **not** a superset and
  retention is a recorded ruling. The convergence hygiene flag in that same line is a genuine deferred
  item.

- **D-23:** The two-tier rule is stated as **mechanics, not as a claim about publication**. Write it as:
  the literal `.planning/` grep is corpus-wide with no directory exclusion per SC#4; the class needles
  exclude `docs/_standards/` and `docs/_registry/` because recording provenance is those documents'
  function. Note inline the fact that makes the layering worth documenting — the literal arm's **entire
  live surface at HEAD (2 hits) sits inside the directory the class arm excludes**. Do not lean on
  "not published prose": `EEE-SOP-standard.md:41-43` says the meta directories *and* `docs/_templates/`
  are "**governed by this standard** but do not belong in the indexed SharePoint library".

### Area C — The authoring standard

- **D-24:** The standard lands as a **new section in `docs/_standards/EEE-SOP-standard.md`**, matching
  the v1.16 STD-04 (`:402`) and v1.18 STD-05 (`:456`) precedent. Publish-exclusion is the *defining
  property* of the class that already holds every prior authoring standard — authoring guidance is
  written for authors working in the repository, not for SharePoint readers, so non-delivery is the
  point, not a defect.

- **D-25:** The heading is **`## Prose Style Authoring Standard`**, carrying **no requirement ID**, by
  owner ruling; the `v1.22 STD-01..STD-04` attribution goes in the Version History row, exactly where
  both precedents put the milestone token. `[MEASURED]` `STD-0*` has **four live meanings**: `STD-01`,
  `STD-02` and `STD-03` are v1.15 requirements (`v1.15-REQUIREMENTS.md:33-35`, `check-phase-114.mjs:61-63`)
  — and **`STD-01` is the requirement to author this very file**; `STD-04`/`STD-05` are the existing
  sections; and `STD-NNN` is the meta-doc ID namespace, this file being **`doc_id: STD-001`**
  (`:2`, pinned at `_CONTENT-PINS.txt:4`). The draft's `(v1.22 STD-01..STD-04)` also deviates twice from
  the precedent it claimed to match (both precedents are bare single IDs, and no precedent spans a
  range) and would make `:593`'s existing cross-reference to "(STD-04) section above" ambiguous. The
  same collision shape exists for HYG — `:648` already carries a `v1.19 HYG-05` row.

- **D-26:** The new heading is **pinned** in `scripts/docs-style/_CONTENT-PINS.txt` and
  `_PINNED-HEADINGS.txt`. `[MEASURED]` both precedent headings are protected (`_CONTENT-PINS.txt:103`
  and `_PINNED-HEADINGS.txt:72` for STD-04, `_CONTENT-PINS.txt:139` for STD-05, plus
  `check-phase-120.mjs:70` as an exact needle); a brand-new heading would be pinned by nothing, and
  Phase 158 SC#3 routes a style sweep over exactly Phase 157's edited files — i.e. over a fresh,
  unpinned normative section full of `must`/`never`, which is the STD-04 hazard applied to STD-04's own
  text.

- **D-27:** The section **is C17-governed**, and the two hazards must be written as **prose, not as a
  blockquote**. `[MEASURED]` `EEE-SOP-standard.md:2` reads `doc_id: STD-001`; `c17-eee-contract.mjs:523-538`
  enrolls any file under `docs/` carrying a `doc_id`, with **no meta-doc exclusion**; the file is not a
  TEMPLATE-SENTINEL (`last_verified: 2026-07-04`, not `1970-01-01`). Live run: **237 files checked, 0
  violations, exit 0**. Binding constraints: assertion **#12** (`:387-409`) joins consecutive top-level
  `>` lines with a space and hard-fails over **200 characters** — and the `must` hazard exists today as
  a ~900-character single blockquote run at `google-style-verify/SKILL.md:104-121`, so copying that
  shape in is an immediate hard fail; assertion **#11** requires a prose summary within 5 lines of any
  table over 25 rows. C17 is on the apex chain.

- **D-28:** Insert the section **before `:641`**, preceded by a `---` horizontal rule. `[MEASURED]`
  every top-level standard section is preceded by a rule (before `:402`, `:456`, `:583`), and
  `## Version History` at `:641` is the file's **terminal** H2 — a section "added at the end" would land
  after the row announcing it. Decide `last_verified`/`review_by` explicitly: `:7-8` read `2026-07-04` /
  `2026-10-02`, never bumped by the v1.18 or v1.21 amendments, and `review_by` is 27 days out.

- **D-29:** The section's own text must **state whether the prose standard governs the whole corpus or
  only the enrolled set**. `[MEASURED]` `:41-43` and `:312-325` scope the standard to "Phase-1 in-scope
  corpus documents"; **`docs/operations/` is 29 files and 0 of 29 carry a `doc_id`**; and
  `REQUIREMENTS.md:127` puts retrofitting them out of scope. Yet every HYG-01..HYG-05 defect site is in
  `docs/operations/`, and D-12's gate runs over all 294 files. That is a 57-file scope mismatch and it
  must be resolved in prose, not left implicit.

- **D-30:** The wiring surface is **project `CLAUDE.md` + the 8 `docs/_templates/*.md` + the tracked
  `google-style/SKILL.md`**, by owner ruling. `[MEASURED]` templates alone are provably insufficient:
  there is **no template** for `docs/operations/` (29 files, the entire v1.21 output),
  `docs/decision-trees/`, `docs/*-lifecycle/`, the six `_glossary*.md`, `docs/end-user-guides/` or
  `docs/error-codes/`. `CLAUDE.md` is the only file loaded unconditionally every session and today
  carries **zero** doc-authoring guidance, still describing a PowerShell/FastAPI/React application.
  There is no `CONTRIBUTING.md` and no authoring-flow document; `.claude/settings.json` does not exist
  (only untracked `settings.local.json`), so a hook-based wiring is not shareable.

- **D-31:** The template→standard link **cannot be verified by the link checker**, so do not rely on it.
  `[MEASURED]` `check-nav-hub-links.mjs:280` reads
  `if (relPath.startsWith('docs/_templates/')) continue;` — templates are excluded **as a source**, not
  just as a target, so an anchored template link is never checked, forever. "Land both sides in one
  commit" addresses commit ordering, which is a different failure mode. Also: **all 8 templates are
  themselves C17-enrolled** via the `doc_id: RE-[FILL-IN]` TEMPLATE-SENTINEL path
  (`c17-eee-contract.mjs:300,490`), so D-30 is **9 C17-governed edits**, not zero.

- **D-32:** The gate asserts **(a)** the gated rules stay zero and **(b)** the leak class is empty —
  **not (c)** the wiring presence. `[MEASURED]` bundling per se is fine: 20 `vN-milestone-audit.mjs`
  files bundle up to 17 unrelated concerns each. The objection is **lifetime**: "all 8 templates carry
  the directive and the standard section exists" is verbatim the presence-plus-landed-needle shape of
  `check-phase-114.mjs:61-77`, `-120.mjs:61-72` and `-129.mjs:43-53` — a milestone-lifetime content
  assertion. `carve-gate.mjs:5-12` states the consequence: welding one into a permanent apex member
  *"would go RED at the first v1.21 content commit and stay red forever — manufacturing exactly the
  accepted-red class this milestone's bar requires deleting."* Assertion (c) belongs in Phase 159's
  `check-phase-157.mjs` leaf.

- **D-33:** STD-03's standing rule is written in **three places**: the module docstring of
  `.claude/skills/google-style/check.py`, `scripts/docs-style/RESUME.md`, and the new standard section.
  `[MEASURED]` the draft's premise was false twice. REQUIREMENTS.md is **not** removed at close here —
  `git log --diff-filter=D` deletions stop at `d0fda4f9` (v1.17), v1.18-v1.21 all closed without
  deleting it, and 22 `vN-REQUIREMENTS.md` copies are retained permanently. And the audience is wrong:
  **`grep -rln "docs/_standards" ~/.claude/gsd-core/` → 0** — nothing in the GSD workflow set reads that
  directory, so a future milestone's planning agents would never find it there. `check.py`'s docstring
  and `RESUME.md` are what a future re-litigation actually opens. Keep `REQUIREMENTS.md:123`'s
  Out-of-Scope entry; drop the "archived at close" justification.

- **D-34:** The two hazards are **split**, and no edit is made to `google-style-verify/SKILL.md`.
  `[MEASURED]` the `must` hazard is **already fully documented** there at `:104-121` — a normative
  callout carrying the 26-vs-19 counts and two worked contradiction examples — plus the self-indictment
  at `:195-197` (*"its largest class — a hedge promoted to `must` — is one this skill previously
  *recommended*. Budget for it."*). The counts are confirmed against
  `scripts/docs-style/_JUDGE-VERDICTS.json`: `{"STRENGTHENED": 26, "PRESERVED": 360, "INVERTED": 19,
  "WEAKENED": 1}`, 406 records, baseline `c97d322`. The hazard with **no home** is passive→active:
  `grep -in "passive\|actor\|invent"` over that skill returns **0 hits**. It is a property of the
  *rewriter* — record it in the standard section and add it to `google-style/SKILL.md` beside the
  existing quoted-error-message anti-pattern at `:127`, whose normative reference is
  `references/voice.md`.

- **D-35:** Record the **two-copy divergence risk** when editing the skill. `[MEASURED]` both
  `~/.claude/skills/google-style/` and `.claude/skills/google-style/` exist and are byte-identical
  (`SKILL.md`, `check.py`, 68-69 `references/`); the global copy is untracked and outside the
  repository, so a tracked-copy edit silently diverges and which loads is environment-dependent.
  `google-style-verify` exists **only** at project level — a session loading only the global skills has
  the rewriter without the verifier, the exact pairing STD-01 requires.

### Area D — The hygiene defects

- **D-36:** HYG-01's true class is **5 sites in 3 files**, and the requirement names the *least*
  published one. `[MEASURED]` `docs/operations/00-index.md:28` (section paragraph, Windows/macOS/iOS/
  Android, no Linux) and `:32` (the named row); `docs/index.md:305` (byte-equivalent paragraph) and
  `:309` ("4-platform update-enforcement comparison hub (Windows + macOS + iOS + Android)") — **seven
  lines above `:312`, which links `05-linux-update-delivery.md`**; and
  `patch-management/00-overview.md:30-33`, which routes to four platforms **two lines below** a
  5-platform paragraph. `docs/index.md` carries `doc_id: RE-219` → EEE-enrolled and shipped in the
  publish bundle, while the *named* site carries no `doc_id` and ships in neither. Leave
  `00-index.md:48,60` and `index.md:320,330` — correct, no Linux guide exists in those sets.

- **D-37:** HYG-01 edits must respect **`V-54-08`'s column order**. `[MEASURED]`
  `check-phase-54.mjs:127-143` requires `patch-management/00-overview.md` to carry a table row matching
  `| … Windows … macOS … iOS … Android … |` **in that order**; it passes today only because Linux is an
  appended sixth column. No Linux-motivated column reordering. Gate-safe otherwise: no file under
  `scripts/` or `.claude/skills/` carries the `4-platform comparison hub` prose.

- **D-38:** HYG-03 is **two edits plus two recorded non-defects**. Fix the conflation at
  `docs/reference/macos-capability-matrix.md:70` (`| Microsoft Store integration | Yes (Windows Package
  Manager) | …`); link the bare twin at `docs/admin-setup-apv2/03-device-preparation-policy.md:141`.
  `[MEASURED]` `02-etg-device-group.md:129` is **already linked** (Phase 152, `4816635b`) and its anchor
  resolves — record as satisfied; `00-overview.md:247` ("the Windows Package Manager control surface")
  is **correct usage** — leave it. Frozen-read safety verified: `check-phase-63.mjs:208-230` byte-pins
  the matrix but reads it frozen-to-frozen via `readAtV113Close`, so the live `:70` edit cannot break it.

- **D-39:** The **new link at `03:141` uses the explicit anchor id, not the slug**. `[MEASURED]`
  `02:129`'s existing link rides `#enterprise-app-management-store-apps-and-winget--routing`, an
  em-dash-derived **double-hyphen slug** protected by no pin file, in a corpus that runs bulk em-dash
  sweeps — while `08-windows-app-updates.md:251` carries an explicit
  `<a id="eam-store-winget-routing"></a>` immediately above the heading at `:252`. Doubling a fragile
  unpinned anchor is the wrong direction; the explicit id exists for exactly this.

- **D-40:** HYG-04 is **three sites, and the correct date is `2025-06-17`**. `[MEASURED]` three sites
  carry the wrong `2026-06-19` — `patch-management/00-overview.md:101`,
  `01-windows-wufb-rings.md:76` and `:101`. Eight carry `2025-06-17` and are **correct**, including the
  two in `docs/recipes/05-enterprise-update-plan.md:95,106` that ship in the bundle as `RE-227` — leave
  them. Fixing only the named line would leave two live contradictions of the same fact.

- **D-41:** The date is resolved from the **page's own rendered bytes, with a control**, and the method
  is recorded as the evidence. `[MEASURED]` the Learn page carries **two** date metas —
  `ms.date 2025-06-17` and `updated_at 2026-06-19` — which is why this project twice got contradictory
  answers from the same URL. What the page **renders** is
  `<span>Last updated on <local-time datetime="2025-06-17T08:00:00.000Z"
  data-article-date-source="calculated">2025-06-17</local-time></span>`. Control: an unrelated Learn
  page with a divergent pair (`ms.date 2026-06-25` / `updated_at 2026-07-27`) renders **2026-06-25**.
  Learn's displayed date always tracks `ms.date`; `updated_at` is a build timestamp the page never
  surfaces. **Record `ms.date` as the corpus convention explicitly.** HYG-04 is therefore *not*
  internally contradictory — "agree with the six citations" and "agree with the page's own live date"
  both resolve to `2025-06-17`. Never use a summarizing fetch for this class of question.

- **D-42:** Disposition `07-windows-autopatch.md:432` — an **undated** Further Reading link to the same
  URL, the 12th citation. A "one fact, one date" remediation must decide about it rather than leave it
  unexamined. `[MEASURED]` context: the class the draft suspected **does not exist** — 171
  `(updated …)` lines, 167-168 dated citations, 32-33 distinct URLs, and **exactly one URL carries two
  different dates**: HYG-04's own.

- **D-43:** HYG-05 is a **false statement requiring a substantive correction**, not a disambiguation.
  `[MEASURED]` `patch-management/00-overview.md:79-86` reads "each carries its own Entra group **(a
  group supports up to 15 rings, and a tenant up to 300 groups)**" — nearest antecedent *Entra group*,
  and "300 groups" reads as 300 Entra groups. Both are false. `07-windows-autopatch.md:219-222` quotes
  Microsoft verbatim: "up to 15 deployment rings **per Autopatch group**" and "up to 300 **Autopatch
  groups** in your tenant". A disambiguation that keeps the parenthetical attached to the Entra-group
  clause **satisfies HYG-05's literal wording and still ships a wrong planning limit**. Re-attach the
  limits to Autopatch groups.

- **D-44:** HYG-06 is **five entries, not six** — DFCI is already satisfied. `[MEASURED]`
  `docs/_glossary.md:183` carries `### Device Firmware Configuration Interface (DFCI)` with an
  Alphabetical Index link, covering the CSP path, cert-chain authorization, per-setting reporting,
  reinstall persistence and the Autopilot-registration gate. The other five — hotpatching, the Autopatch
  group model, `unattended-upgrades`, the Microsoft 365 Apps update channels, the Enterprise App Catalog
  — are absent from all six glossary files case-insensitively and across variants. Record the
  falsification against the requirement text.

- **D-45:** Glossary placement follows the **Phase 149/150 "shoehorn plus re-declare" precedent**.
  `unattended-upgrades` → `_glossary-linux.md`; the other four → `_glossary.md`. `[MEASURED]`
  `_glossary.md` is `doc_id: RE-184` "Autopilot Glossary", scoped by its `## Summary` to APv1/APv2
  deployment, with entries as H3s under exactly six category H2s — `Autopilot`, `Enrollment`,
  `Hardware`, `Network`, `Security`, `Deployment Modes` — **none of which naturally takes
  patch-management vocabulary**. Place each under the closest H2 **and amend the `## Summary` coverage
  enumeration to declare the widened scope**, exactly as Phase 149 did when it added DFCI. Creating a
  patch-management glossary is a new capability the phase does not have.

- **D-46:** The glossary entry checklist is **longer than three items**. Each entry also needs: a dated,
  phase-attributed `## Version History` row (`_glossary.md:328+` has one for every prior addition —
  Phases 59, 75, 91, 149, 150); **`last_verified`/`review_by` must NOT be advanced** — owner ruling D-63
  (2026-08-25) puts this file on a 90-day cycle, not the milestone's 60-day one; C17 #4/#5's
  `## Summary`-first ≥30-word rule; C17 #12's 200-char blockquote cap (the DFCI `> See also:` line
  already sits near it); `_glossary-linux.md`'s **five mandatory category H2s**
  (`check-phase-49.mjs:199-214`, `V-49-13`, live read); `V-49-19`'s cross-platform-collision note rule;
  and `V-49-20`'s pinned `[Linux Provisioning Glossary](_glossary-linux.md)` literal. No validator
  counts entries or asserts index parity, and `regenerate-supervision-pins.mjs:225-230` treats
  `## Alphabetical Index` as exempt, so index edits do not perturb supervision pins.

- **D-47:** Match the index's existing convention, do not "fix" it. `[MEASURED]` `_glossary.md:33`'s
  Alphabetical Index is **not strictly alphabetical** — it ends `… | [ZTDID](#ztdid) | [ZTD](#ztd)` —
  and no validator enforces order. Re-sorting it is out of scope and would be an unpinned prose change
  Phase 158 must then sweep.

- **D-48:** **No `157-EDITED-FILES.md` artifact.** Record the phase's first and last commit SHAs in the
  SUMMARY instead. `[MEASURED]` `ROADMAP.md:208` (Phase 158 SC#3) puts the enumeration in Phase 158's
  hands and prescribes the method — "the edited-file list is enumerated from `git diff --name-only`
  across Phase 157's commits" — so a static file satisfies nothing Phase 158 will not re-derive, and it
  goes stale on any re-execution or amend. (The draft's worry that such a file would violate SC#2 was
  itself wrong: `ROADMAP.md:207` governs *per-fix* confirmations, not the file list.)

- **D-49:** SEED-001's `status` flips to `closed` as SC#4 requires, **no guard is built**, and the
  off-schema vocabulary is recorded. `[MEASURED]` the "nothing scans seeds" premise is false —
  `~/.claude/gsd-core/bin/lib/audit.cjs:600` `scanSeeds` feeds `gsd-tools audit-open`, described at
  `capability-registry.cjs:300` as an open-artifact audit "for **milestone close gates**". But
  `audit.cjs:614` reads `new Set(['dormant','active','triggered'])`: **`planted` is not in it**, so the
  scanner never flagged SEED-001 and HYG-07's stated rationale ("a seed that never closes trains the
  seed-scan to be ignored") is false. `closed` is likewise not a recognised terminal status
  (`plant-seed.md:74` writes `dormant`), so the edit is **cosmetically correct and mechanically inert**.
  The real latent risk is the inverse: normalising this repository's seed vocabulary to the GSD schema
  would flip SEED-001 to **open at a close gate**. SEED-001's content did ship in v1.13 — verified in
  three buckets at named lines — so the flag is legitimately stale.

- **D-50:** Order is **HYG-02 (plus the two `EEE-SOP-standard.md` lines) → the gate → the remaining HYG
  in any order → the standard section**. The draft's rationale was self-contradictory: "gate-last gives
  every commit a real gate to run" is false, because if the gate is authored last no earlier commit can
  run it at all. The real dependency is narrow — the gate's leak-class assertion would be red at its own
  landing commit unless HYG-02 has landed — and it binds **HYG-02 only**. `[MEASURED]` HYG-01, HYG-03,
  HYG-04, HYG-05, HYG-06 and HYG-07 have **zero** interaction with any gated rule. Gate second so it is
  enforcing over the largest number of subsequent commits, and land the C17-constrained authoring last.

### Claude's Discretion

- The gate tool's filename and internal structure, provided it is single-file, invokes `check.py`
  rather than reimplementing it, carries a `--self-test` per D-11, and enumerates via `git ls-files`.
- Exact wording of the `EEE-SOP-standard.md` supersession row and the `REQUIREMENTS.md:62` annotation,
  provided the corrected figure names the corpus it was measured over.
- Commit message wording and commit granularity, provided D-50's ordering holds and the standard-section
  commit is separable from every corpus edit.
- Which of the six `_glossary.md` category H2s each of the four Windows terms lands under, provided the
  `## Summary` enumeration is amended in the same commit per D-45.
- Whether `EEE-SOP-standard.md`'s `last_verified`/`review_by` are bumped, provided the choice is stated
  rather than left implicit (D-28).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Governing planning documents
- `.planning/ROADMAP.md` — Phase 157 Goal at `:187` (**the modal "can report zero", decisive for D-01**)
  and SC#1-SC#4 at `:192-195`; Phase 158 SC#2 `:207` and SC#3 `:208` (D-48).
- `.planning/REQUIREMENTS.md` — STD-01..04 (`:64-67`), HYG-01..07 (`:73-79`), the milestone bar at `:6`,
  the **falsified `[MEASURED 2026-08-24]` preamble at `:62`** (D-07), the Out-of-Scope entries at `:123`
  and `:127`.
- `.planning/STATE.md` — the LOCKED named decisions, including STD-HYG-TOGETHER and the
  DISCUSS-PHASE-FLAGS entry that deferred this phase's STD-02/STD-03 split to this discussion.
- `.planning/milestones/v1.21-REQUIREMENTS.md:41` and `:195` — FIX-11's criterion and its false
  `Complete` row (D-20).
- `.planning/milestones/v1.9-DEFERRED-CLEANUP.md:191` — the retention ruling that is B4's real authority
  (D-22).

### The standard and the corpus contract
- `docs/_standards/EEE-SOP-standard.md` — `:2` `doc_id: STD-001` (D-27); `:7-8` freshness (D-28);
  `:41-43` scope and the meta-directory sentence (D-23, D-29); `:209-223` the Version-History row rule
  (D-18); `:302-308` excluded directories; `:312-325` Phase-1 scope (D-29); `:402` and `:456` the two
  precedent sections (D-24, D-25); `:578` and `:649` the two edit sites (D-19); `:593` the STD-04
  cross-reference; `:641` the terminal `## Version History` (D-28); `:648` the `v1.19 HYG-05` row.
- `scripts/validation/c17-eee-contract.mjs` — `:300,490` the TEMPLATE-SENTINEL enrollment path (D-31);
  `:387-409` assertion #12's 200-char cap (D-27); `:523-538` the `doc_id` enrollment loop.
- `docs/_templates/` — all 8 files, all C17-enrolled (D-30, D-31).

### The style tooling
- `.claude/skills/google-style/check.py` — `:37` the anthropomorphism rule, `:40,42` the two dead rules,
  `:52-71` `mask_code` (**`:66` is the line that kills them**), `:110-118` the `--no-headings` scope,
  `:117` the rule loop, `:138-142` the argv surface, `:139` the print format.
- `.claude/skills/google-style/SKILL.md:25,127` and `references/voice.md` — the passive→active hazard's
  home (D-34).
- `.claude/skills/google-style-verify/SKILL.md:104-121` and `:195-197` — the `must` hazard, already
  fully documented (D-34).
- `.claude/skills/google-style/references/word-list.md:116` and `:121` — the two distinct `admin`
  entries (D-05).
- `scripts/docs-style/sweep3.py` — `:56-63` the quoted-string rationale (D-04), `:64-67` `PROTECT`,
  `:199` the heading skip (D-06).
- `scripts/docs-style/_CONTENT-PINS.txt` (`:4`, `:103`, `:139`) and `_PINNED-HEADINGS.txt:72` — where the
  new heading must be pinned (D-26).
- `scripts/docs-style/_JUDGE-VERDICTS.json` — the 26/19 counts, 406 records, baseline `c97d322` (D-34).
- `scripts/docs-style/RESUME.md` — **treat as untrusted**; one of STD-03's three homes (D-33).

### Validators and gate precedent
- `scripts/validation/check-nav-hub-links.mjs` — `:18-21`, `:311` the `--self-test` precedent (D-11);
  `:280` the `_templates/` source exclusion (D-31). Authored `eee079ce` (Phase 123), the single
  content-phase standalone-gate precedent.
- `scripts/validation/check-phase-143.mjs:123` — how a self-test becomes an enforced check.
- `scripts/validation/carve-gate.mjs:5-12` — the accepted-red anti-pattern behind D-32.
- `scripts/validation/check-phase-145.mjs:142-148` — `V-145-ARCHIVALDRIFT`, its link-only regex and its
  250-file floor (D-20, D-21).
- `scripts/validation/check-phase-54.mjs` — `:30` the `REQ` constant, `:127-143` `V-54-08`'s column order
  (D-37), `:345-360` `V-54-21`, `:437` `V-54-27`, `:587` the chained re-assert (D-08).
- `scripts/validation/check-phase-49.mjs:199-214` (`V-49-13`), `:288` (`V-49-19`), `:320` (`V-49-20`) —
  the live glossary constraints (D-46).
- `scripts/validation/check-phase-63.mjs:208-230` — the frozen-to-frozen matrix pin, verified harmless
  to D-38.
- `scripts/validation/check-phase-114.mjs:61-77`, `-120.mjs:61-72`, `-129.mjs:43-53` — the
  presence-plus-needle shape assertion (c) must not copy (D-32).
- `scripts/validation/regenerate-supervision-pins.mjs:225-230` — the Alphabetical-Index exemption (D-46).
- `scripts/validation/README-supervision-pins.md:132-165` and
  `.github/workflows/audit-harness-v1.5-integrity.yml:324-329` — proof `pre-commit-advisory.sh` is live
  (D-13).
- `scripts/hooks/README.md:26-32` — Phase 43 D-08's tiered-enforcement doctrine (D-09).

### The hygiene defect sites
- `docs/operations/00-index.md:28,32`; `docs/index.md:305,309`;
  `docs/operations/patch-management/00-overview.md:30-33` — HYG-01's five sites (D-36).
- `docs/operations/co-management/03-cocmgmt-migration-paths.md:55` and
  `docs/operations/patch-management/00-overview.md:266` — HYG-02's two named defects (D-14).
- `docs/reference/macos-capability-matrix.md:70`,
  `docs/admin-setup-apv2/03-device-preparation-policy.md:141`,
  `docs/operations/patch-management/08-windows-app-updates.md:251-252` — HYG-03 (D-38, D-39).
- `docs/operations/patch-management/00-overview.md:101`, `01-windows-wufb-rings.md:76,101`,
  `07-windows-autopatch.md:432` — HYG-04 (D-40, D-42).
- `docs/operations/patch-management/00-overview.md:79-86` and `07-windows-autopatch.md:219-222` —
  HYG-05's false statement and its correct source (D-43).
- `docs/_glossary.md:33,183,328+` and `docs/_glossary-linux.md` — HYG-06 (D-44 through D-47).
- `.planning/seeds/SEED-001-macos-psso-admin-setup-doc-accuracy.md:6` — HYG-07 (D-49).
- `~/.claude/gsd-core/bin/lib/audit.cjs:600,614` and `capability-registry.cjs:300` — the seed scanner and
  its status set (D-49).

### Precedent and prior phases
- `.planning/phases/156-…/156-CONTEXT.md` — D-05 (order and idempotency), D-08 (pins protect little),
  D-37 (the Phase 158 symmetry), and the deferred list that hands this phase its inheritance.
- `.planning/phases/155-…/155-CONTEXT.md:533` — **D-52**, the validator-deferral decision behind D-09
  and D-32.
- `.planning/phases/154-…/154-CONTEXT.md` — the annotate-and-supersede and perturb-and-restore
  precedents.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`check-nav-hub-links.mjs` is the whole gate blueprint** — a standalone content-phase tool with a
  `--self-test`, made enforcing later by a `check-phase-NN` leaf. Copy its shape, not `carve-gate.mjs`'s.
- **`sweep3.py`'s `PROTECT` and skip set are the corpus's protection semantics.** Any claim about
  "unprotected prose" must be derived from them, not hand-rolled — a hand-rolled filter inverted the
  rule on all four of its own findings.
- **`v1.NN-milestone-audit.mjs` proves bundling is precedented** — up to 17 unrelated concerns in one
  non-`check-phase` validator. The constraint on the gate is assertion *lifetime*, not assertion count.
- **The Phase 149/150 glossary precedent is "shoehorn plus re-declare"** — place under the closest H2
  and amend the `## Summary` enumeration in the same commit.

### Established Patterns
- Annotate-and-supersede for planning-document amendments; keep the provenance, drop the rotting path.
- Perturb-and-restore as the non-vacuity proof — but as a **repeating `--self-test`**, since this phase
  proves a one-time proof cannot catch a rule that was never alive.
- Every top-level standard section: `---` rule, `## <Name>`, `### D-NN:` decisions, one Version History
  row carrying the milestone token.

### Integration Points
- `c17-eee-contract.mjs` enrolls on `doc_id` alone, so both the standard **and** all 8 templates are
  C17-governed — 9 constrained edits in the wiring work.
- The apex `check-phase-153` chains 145-152, so `V-54-08`, `V-49-13/19/20` and `V-145-ARCHIVALDRIFT` are
  all live over this phase's edit surface.
- `docs/operations/` is outside C17, outside the registry and outside the publish bundle, yet holds every
  HYG-01..05 site — the gate's scope and the standard's scope disagree there by 57 files (D-29).

</code_context>

<specifics>
## Specific Ideas

- **A rule reporting zero is not the same as a rule that can fire.** Two of the three rules the draft
  chose were dead regexes — `mask_code` destroys the `](` they need — and the observed "0 hits" was
  read as a clean corpus. The gate's anti-vacuity proof must therefore assert that each gated rule
  *fires on a synthetic violation*, every run. This is the sharpest instance yet of the project's
  standing lesson that the committed tool is the measurement: three independent agents ran `check.py`
  and got identical, correct numbers, and every wrong conclusion came from reading its output rather
  than probing its behaviour.

- **The strongest protection in this corpus is the one a style filter is most likely to break.** A
  Finder proposed four one-word `person-first` edits; all four were inline-quoted vendor, UI or user
  strings, including the Windows OOBE prompt and an Android error dialog. `sweep3.py:56-63` already
  records that this exact class "sailed through three times" and that falsifying one "is worse than the
  style violation it fixes and no validator can see it."

- **One URL, two dates, and both are real.** The Learn page carries `ms.date` and `updated_at`, which is
  why this project twice got contradictory answers from the same URL. The resolution came from reading
  what the page *renders* — a `<local-time>` element — and confirming it against an unrelated page with
  a divergent pair. Record the method, not just the date; a corpus-wide date convention now has an
  evidenced basis for the first time.

- **A shipped requirement can be RED for ten days with every gate green.** FIX-11's criterion has failed
  since Phase 151 because `V-145-ARCHIVALDRIFT` matches markdown-link syntax and the regression landed
  as inline code. The phase that fixes those two lines should re-open and discharge the requirement
  rather than let a false `Complete` stand.

</specifics>

<deferred>
## Deferred Ideas

- **The 95-file `Phase NN` body-prose population** — 332 occurrences, with the four-bucket census
  (VH 198, other tables 115, Changelog 21) attached. Owner-ruled out of the v1.22 gated class (D-18).
- **The requirement-identifier leak arm** — mechanically undecidable, with the 129-of-142 evidence and
  the published-H1 casualties recorded. Re-opening it needs a registry, filename-map and bundle-parity
  plan (D-15).
- **~18 citations copied from `updated_at` rather than `ms.date`** — implied by the 18-to-7 census once
  D-41 fixes the convention. None carries a file and line in any requirement, so the HYG preamble's own
  bound excludes them.
- **Citation freshness drift** — 5 of 32 probed Learn URLs are stale against both metas; worst case
  `waas-manage-updates-wufb` cited at `2025-10-02` against a live `updated_at` of `2026-08-20`, cited
  4 times. Out of milestone scope by the requirement preamble.
- **DEFERRED-CLEANUP convergence** — the v1.10+ hygiene flag at
  `.planning/milestones/v1.9-DEFERRED-CLEANUP.md:191`, still open (D-22).
- **`docs/operations/` EEE/C17 enrollment** — 29 files, 0 with `doc_id`, explicitly out of scope at
  `REQUIREMENTS.md:127`, but it is why the gate's scope and the standard's scope disagree (D-29).
- **Seed-status schema normalisation** — this repository's `planted`/`closed` vocabulary is off-schema
  against `audit.cjs:614`'s `{dormant, active, triggered}`. Normalising would flip SEED-001 to open at a
  close gate, so it needs a deliberate pass (D-49).
- **The two-copy skill divergence** — `~/.claude/skills/google-style/` untracked vs the tracked project
  copy, with `google-style-verify` project-only (D-35).
- **`_glossary.md:33`'s non-alphabetical index tail** (`ZTDID` before `ZTD`) — no validator enforces
  order; re-sorting is an unpinned prose change Phase 158 would have to sweep (D-47).
- **A merge-marker / conflict gate as a standing validator** — carried from Phases 155 and 156; still no
  validator covers it.
- **`V-132-HUBSNOTWIRED` / `V-137-HUBSNOTWIRED` regex repair** — carried from Phase 155.
- **A corpus-wide evidence-label taxonomy** (`[SOURCED]`/`[ASSUMED]`/`[UNVERIFIED]`/`[PILOT]`) defined in
  one place — carried from Phases 155 and 156.
- **`judge-packets.py` alignment quality** and **`pins2.py` cross-repo geometry** — carried from
  Phase 156.
- **`.gitattributes` `* text=auto eol=lf`** — deferred to Phase 159 by Phase 154.

</deferred>

---

*Phase: 157-std-hyg-authoring-standard-corpus-hygiene*
*Context gathered: 2026-09-05*
