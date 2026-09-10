# Phase 157: STD + HYG — Authoring Standard & Corpus Hygiene - Research

**Researched:** 2026-09-05
**Domain:** Documentation-corpus tooling (Python/Node standalone validators) + prose hygiene edits in a Markdown corpus governed by an 111-entry apex validator chain
**Confidence:** HIGH — every claim below was independently re-executed against this repository at HEAD `567a4685` (branch `v1.22/154-style-landing`), which is `7e399a1b` (the CONTEXT's measurement commit) plus two `.planning`-only commits. `docs/`, `scripts/validation/`, `scripts/docs-style/` and `.claude/skills/` are byte-identical to the CONTEXT's measurement point, so every count reproduced below is current, not stale.

## Summary

This phase has almost no discovery risk left — `157-CONTEXT.md` already carries 50 `[MEASURED]` decisions from a 5-Finder adversarial-review pass. This research's job was narrower: re-run the load-bearing commands myself, at HEAD, and report what a planner needs that CONTEXT documents but doesn't hand over as ready-to-paste code — the exact shape of the standalone-gate tool, the exact rule-surface line numbers, and a from-scratch re-derivation of the HYG-02 leak-class census so the planner isn't trusting a written record for the numbers it plans against (this project's own standing rule: "a written claim is not evidence").

**Everything reproduced exactly.** Every numeric claim I re-derived — `check.py`'s 10,402-candidate total, the six raw-hit counts in D-05, the HYG-02 needle census (2 / 47 / 10), all HYG-01/03/04/05/06 file:line coordinates, the `_JUDGE-VERDICTS.json` 406-record breakdown, the C17 live run (237/0), the two `.planning/` literal hits at `EEE-SOP-standard.md:578,649`, the six category H2s in `_glossary.md` and the five in `_glossary-linux.md`, the zero-push-trigger/zero-merge-commit CI facts, the `docs/operations/` 29-files-0-`doc_id` count, and the absent `docs/_standards` reference in `gsd-core` — reproduced byte-for-byte or count-for-count against the CONTEXT's own figures. I found **zero** numeric drift.

**I did find two small citation-accuracy issues inside CONTEXT's own line-number citations** (not in its substance): `check.py`'s `anthropomorphism` rule tuple is defined at line **38**, not the `:37` cited twice in CONTEXT (D-02 and canonical_refs); and the specific line D-10 cites for "prints guidance text sliced from word-list.md" (`check.py:139`) is actually `skip = set()` — the guidance-embedding code is at lines 125-134 and the print-format call is at line 152. Neither affects any decision; both are one-line pointer corrections a planner should use instead of the cited ones if writing code that references those exact lines.

**Primary recommendation:** Build the STD-02 gate as a new single-file standalone tool in `scripts/validation/`, structurally modeled on `check-nav-hub-links.mjs` (the only content-phase standalone-gate precedent with a `--self-test`): enumerate the corpus with `git ls-files 'docs/*.md'` (a genuinely new idiom for this codebase — no existing `scripts/validation/*.mjs` or `scripts/docs-style/*.py` file enumerates via `git ls-files`; they all use a recursive filesystem walk), shell out to `check.py --no-headings` per-file or in one batch, parse the `[rule-id]` bracket positionally (never grep for a rule name — the note text is guidance prose that can collide with corpus content), and gate only on `anthropomorphism` and `person-first` (after subtracting `person-first`'s two sweep3.py-`PROTECT`-surviving lines). Land HYG-02 (plus the two `EEE-SOP-standard.md` provenance-path edits) before authoring the gate — the gate's own leak-class assertion would otherwise be red at its landing commit — then the gate, then the remaining HYG items in any order, then the C17-constrained authoring-standard section last, per CONTEXT D-50.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Prose-style mechanical checking (STD-02 gate) | Local dev tooling (`scripts/validation/`, standalone, not CI) | — | No `push:` trigger exists in any of the 18 workflows (`[MEASURED]` 0 hits); the gate is explicitly not enforcing until Phase 159 per D-09. It is a developer-invoked script, not a service. |
| Authoring standard content (STD-01/03/04) | Meta-documentation (`docs/_standards/EEE-SOP-standard.md`) | — | This is the established home for every prior authoring standard (v1.15 STD-01..03, v1.16 STD-04, v1.18 STD-05); publish-exclusion is the class's defining property, not a gap. |
| Wiring the standard into authoring flow (STD-01) | Project config (`CLAUDE.md`, `docs/_templates/*.md`) | Vendored skill (`google-style/SKILL.md`) | `CLAUDE.md` is the only file loaded unconditionally every session; templates are per-doc-class authoring scaffolds; the skill itself is the mechanism invoked. |
| Corpus content corrections (HYG-01..07) | Docs corpus (`docs/operations/`, `docs/reference/`, `docs/admin-setup-apv2/`, `docs/_glossary*.md`) | — | Direct prose/link/date edits at named coordinates; no code or tooling layer involved. |
| Seed-file lifecycle (HYG-07) | GSD planning metadata (`.planning/seeds/`) | — | Off-schema against `gsd-core`'s seed-status vocabulary; a metadata edit, not a corpus edit. |

## User Constraints (from CONTEXT.md)

<user_constraints>

### Locked Decisions

All 50 decisions below (`D-01`..`D-50`) are locked, evidence-tagged `[MEASURED]`, and produced via `/gsd-discuss-phase` + `/grill-me` + `/adversarial-review` (5 Finders → Adversary → Referee) against this repository at HEAD `7e399a1b`. Copied verbatim from `157-CONTEXT.md`; do not re-litigate.

#### Area A — The STD-02 mechanical gate

- **D-01:** The **modal reading governs**, by owner ruling. `[MEASURED]` the governing text is modal 3-to-1 — `.planning/REQUIREMENTS.md:6` (milestone bar) and `:65` (STD-02) both read "**can** actually report zero", and `ROADMAP.md:187` (the Phase 157 Goal) reads "bounded to exactly the slice that **can report zero**". The sole present-indicative is `ROADMAP.md:193` (SC#2). No requirement-vs-SC precedence rule exists in this repository or in `gsd-core`, so the tie breaks on weight of text. Decisive secondary ground: **both** readings say "on unprotected prose", and `check.py` has no notion of protection, so the indicative reading cannot mean "raw `check.py` output is 0" either.

- **D-02:** The gate is **`anthropomorphism` + `person-first`**, and `vague-link`/`empty-alt` are recorded as *structurally incapable of firing*, deliberately not gated. `[MEASURED]` `check.py:66` `mask_code()` runs `re.sub(r"\]\([^)]*\)", …)` **before** `RULES` (`:117`), destroying the `](` that `vague-link` (`:40`) and `empty-alt` (`:42`) both require; three independent probe files carrying six well-formed vague links and two `![](img.png)` returned **zero** from both rules. `anthropomorphism` (rule tuple at `:38` — CONTEXT cites `:37`, a one-line pointer error confirmed by this research; see Common Pitfalls) contains no `](`, no backtick and no URL, survives masking, and fired 2-3 times on every probe — it is a live regex at 0 corpus hits, which is what a regression guard is. A green from a dead regex is worse than no rule at all. — **Reversibility:** costly — the exclusion record is a permanent, milestone-crossing artifact that STD-03 exists to stop a later milestone re-litigating; changing the slice later means re-opening that record and re-arguing the reading.

- **D-03:** `person-first` enters the slice with a **documented protection filter and two named exemptions**, and the filter is described in prose, not hand-rolled into the gate. `[MEASURED]` raw 86 hits; running `sweep3.py`'s actual `PROTECT` regex (defined at lines 66-68 in this research's re-count; CONTEXT cites `:64-67`) plus its skip set (`quoted_lines`, fence, indent, `HEADING` at line 69, table rows, `KEEP_LINE`) leaves **2 mechanical survivors and 0 genuine unprotected-prose hits**. The two survivors are `05-linux-update-delivery.md:211` (a quotation that survives only because it **wraps a line** — `PROTECT`'s quote arm is `[^"\n]{1,400}`, line-at-a-time) and `apple-business/16-managed-apple-account-runbook.md:258` (a blockquoted template email to end users). **Both are must-not-edit.**

- **D-04:** The four sites an earlier draft proposed to "fix" are **protected quotations and must not be touched**. `[MEASURED]` `admin-setup-apv1/06-user-driven.md:71` is the Windows OOBE string `"Let's set things up for work or school"`; `end-user-guides/android-work-profile-setup.md:106` is the Android error dialog `"We couldn't sign you in."`; `l1-runbooks/31-linux-compliance-non-compliant.md:77` is a quoted user report. `sweep3.py:56-63` states the rule in its own words: *"a verbatim vendor sentence or a UI string quoted INLINE sailed through three times… Falsifying any of them is worse than the style violation it fixes and no validator can see it."* `google-style/SKILL.md:127` names the same class an anti-pattern (confirmed verbatim by this research: `- "Fixing" passive voice inside a quoted error message or log line.`). This is recorded because a Finder recommended the edit and was overturned.

- **D-05:** The exclusion record carries **unprotected counts, never raw**, and never conflates the two `admin` entries. `[MEASURED]` raw-vs-unprotected: person-first 86→0, em-dash 3,123→832, directional 207→96, latin-abbrev 61→35, future-tense 91→40, passive 3,756→2,790. `word-list.md:116` `DON'T USE: admin` (2,220) and `:121` `DON'T USE: Android: administrator` (1,156) are **distinct entries**, and SC#2 excludes only the Android one. Recording "person-first: 86, permanently excluded" would defeat STD-03 in the other direction. (This research independently re-ran `check.py --no-headings` over the full tracked corpus and reproduced every raw count exactly: person-first 86, em-dash-spaced 3,123, passive 3,756, future-tense 91, directional 207, latin-abbrev 61, vague-link 0, empty-alt 0, anthropomorphism 0, total 10,402 candidates.)

- **D-06:** The record must **not** state that headings are excluded via `--no-headings`. `[MEASURED]` the flag only adds `"headings"` to `skip`, suppressing `heading-case` and `heading-punct` (`check.py:110-118`); the nine structural rules still run on heading lines and **142 hits land there** (em-dash 128, latin-abbrev 8, passive 5, directional 1), e.g. `EEE-SOP-standard.md:446`. By contrast `sweep3.py:199` skips heading lines outright (confirmed exact by this research: `if HEADING.match(ln):` is line 199). SC#2 requires the exclusion be "stated inline" — state the mechanism truthfully or the deliverable ships a falsehood.

- **D-07:** `.planning/REQUIREMENTS.md:62` is **annotate-and-superseded**, by owner ruling. `[MEASURED]` its `[MEASURED 2026-08-24]` preamble reports **9,363** candidates and ends with the bolded **"No rule class is at zero."** Today the figure is **10,402** (+1,039, +11.1%; passive 3,324→3,756, em-dash 2,916→3,123, word-list 2,573→3,078, assorted 303→445) and three classes are at zero (this research independently reproduced 10,402 exactly, confirming the figure is still current at this HEAD). Because `vague-link` and `empty-alt` cannot fire on any input, the sentence was **necessarily false on 2026-08-24 as well** — not merely stale. The supersession must state which corpus the replacement was measured over; whether 9,363 covered `docs/` or the pre-landing scratch corpus is unreconciled. — **Reversibility:** costly — REQUIREMENTS.md is read live by 3 `check-phase-*` validators, 20 `vN-milestone-audit.mjs` harnesses and 15 workflows.

- **D-08:** Baseline the **apex chain**, not one validator, before touching REQUIREMENTS.md. `[MEASURED]` `V-54-21` (`check-phase-54.mjs:345-360`, `REQ` at `:30`, chained at `:587`) is a NEGATIVE assertion about `05-compliance-policy.md` literals — near-zero risk, and the draft flagged it as the headline one. The exposure it missed: `V-54-27` (`:437`, confirmed exact by this research) recursively walks the **entire `.planning/` tree** for a bare `> **Platform:**` token, and REQUIREMENTS.md has 20+ live readers.

- **D-09:** The gate is a **standalone tool in `scripts/validation/`, with no CI workflow, and it is not enforcing until Phase 159** — by owner ruling, with the gap stated plainly in the phase artifacts. `[MEASURED]` no `push:` trigger exists in any of the 18 workflows (this research confirmed: 0 hits); `git log --all | grep -ci "merge pull request"` → **0** (this research confirmed: 0 — all merges are local worktree merges); no `paths:` filter watches `docs/**` (confirmed: 0 hits). The project ships by push + `workflow_dispatch`. The content-phase standalone-gate precedent is **one**, not two — `git show --stat 8d4235bf` (carve-gate.mjs, Phase 139) touches **zero `docs/`** files in a governance phase; only `check-nav-hub-links.mjs` (`eee079ce`, Phase 123) qualifies, and it was made enforcing by `check-phase-123`/`-143`. Adding a `.github/workflows/` file has zero precedent and HARN-04 assigns the next one to Phase 159. Do not claim "a mechanical gate exists" unqualified.

- **D-10:** The gate **invokes `check.py`** and never forks or reimplements it, and it parses the bracketed rule field **positionally**. Never grep the output stream for `[anthropomorphism]` — the guidance text embedded per hit is sliced from `word-list.md` (word-list hit construction spans `check.py:125-134`; this research found the print-format call itself is at `check.py:152`, not the `:139` CONTEXT cites — see Common Pitfalls), so a corpus or reference edit could trip a substring match. Do not add an `--only` flag: the skill is vendored (confirmed by this research: `check.py` has no `--only` flag; `main()`'s only recognized flag is `--no-headings`). Note for Phase 159's wiring: `grep -rn 'python\|setup-python\|pip' .github/workflows/` → **0** (confirmed by this research); all 18 workflows are `setup-node@v4`, so a CI job needs `setup-python`. Cite the argv surface as `check.py:138-142` (confirmed exact by this research: `def main(argv):` through `argv = [a for a in argv if a != "--no-headings"]` is precisely lines 138-142).

- **D-11:** Anti-vacuity is a **`--self-test` that runs every time**, not a one-time perturb-and-restore. A file-count floor proves files were read, not that a rule can match — 294 scanned, 0 hits, PASS is exactly what a dead regex produces, and it is why `vague-link`/`empty-alt` survived into the draft. The fitting precedent is `check-nav-hub-links.mjs --self-test` (`:18-21`, `:311`, both confirmed exact by this research), invoked as a check by `check-phase-143.mjs:123`: feed each gated rule a synthetic violating string every run and assert it fires. **That would have caught D-02 on the first run.** Keep a floor as a secondary guard but count `== <path>: N candidate(s)` header lines **from the run's own output**, so an empty argv, a crashed interpreter or a non-zero exit cannot yield "0 matches → PASS".

- **D-12:** Scope is the **whole corpus, enumerated with `git ls-files`**, not a filesystem walk and not a changed-files set. `[MEASURED]` runtime is **64-75 seconds** over 294 files (this research independently reproduced: 68.7 seconds real time for `check.py --no-headings` over all 294 tracked `.md` files) — not "nothing", but acceptable; a changed-files gate cannot catch a regression introduced by a rename or a bulk sweep. `docs/` holds **576 files on disk but 294 tracked `.md`** (both figures independently reproduced by this research: `find docs -type f` = 576, `git ls-files 'docs/*.md'` = 294); the difference is `docs/graphify-out/` (268 untracked files confirmed by this research, gitignored at `.gitignore:73` confirmed exact, currently 0 `.md` confirmed — `git ls-files 'docs/*.md' | grep -c graphify-out` = 0). A filesystem walk makes the result depend on whether the author last ran the graphify skill. **This research additionally found that `git ls-files` is a genuinely new enumeration idiom for this codebase**: `c17-eee-contract.mjs`, `check-nav-hub-links.mjs` (which copies `walkMd` "verbatim" from `c17-eee-contract.mjs` per its own comment) and `sweep3.py` (`pathlib.Path(root).rglob("*.md")`) all use a recursive filesystem walk, not `git ls-files`. No existing `scripts/validation/*.mjs` or `scripts/docs-style/*.py` file can be copied for this specific enumeration method — the planner should budget for writing it fresh (it is a 1-line `execFileSync('git', ['ls-files', 'docs/*.md'])` call, not a research risk, just a "no copy-paste source" fact).

- **D-13:** `scripts/validation/pre-commit-advisory.sh` is **left untouched and dropped from the phase artifacts entirely**. `[MEASURED]` it is **not dead** — `README-supervision-pins.md:132-140` is a live tracked install document with a graceful-degradation contract at `:145-165`; `audit-harness-v1.5-integrity.yml:324-329` runs job `pin-helper-advisory` (`continue-on-error: true`, Phase 43 D-14 / Phase 48 D-22); `scripts/hooks/README.md:26-32` carries the tiered doctrine (confirmed present by this research — the 3-tier doctrine text: pre-commit / CI / scheduled-weekly); and `145-05-PLAN.md:139` cites it one milestone ago. Its `PINNED_FILE_PATTERN` (`:6`) is Android/Linux supervision-pin drift, **not prose style** — the question was a category error. Recording it as dead would ship a falsehood contradicting three live tracked files.

#### Area B — The HYG-02 leak class

- **D-14:** The class is **two needles, not three**, by owner ruling. Needle (i) the literal `.planning/`; needle (ii) `(ROADMAP|REQUIREMENTS|PITFALLS|FEATURES|RESEARCH|STACK|PLAN|SUMMARY)` **with and without the `.md` extension**. The extension-less arm is mandatory: `[MEASURED]` HYG-02's own second named defect, `00-overview.md:266` — "…per the **Phase 59 ROADMAP** entry" — matches **none** of the draft's three needles, so the `[MEASURED]` criterion would have reported 0 with a named defect still in place. (This research independently confirmed the "amend the operations index" sentence template — the shared wording carrying this leak — has exactly **10** occurrences via `grep -rn "amend the operations index" docs/`, matching D-17 exactly.)

- **D-15:** Needle (iii), the requirement-identifier arm, is **dropped and recorded as mechanically undecidable**, by owner ruling. `[MEASURED]` `[A-Z]{2,6}-[0-9]{2}` over `docs/` → 149 distinct / 360 occurrences / 104 files, of which **129 of 142 outside the meta dirs are formal planning requirement IDs** — but the same token carries both roles: `OP-11` (19 hits) is a `.planning/research/PITFALLS.md` pitfall ID **and** a published permission-matrix cell (`01-role-permission-model.md:244`) **and** a callout header (`:247`); `DELEG-05` sits in a published **H1** (`15-mdm-server-reassign-runbook.md:29`); `STD-05`, `RE-237` and `PITFALL-7` are published vocabulary; and `UTF-8` (5), `UTF-16`, `OS-26` (14), `CD-07`, `PHASE-45` are pure shape false positives. Enforcing it means editing published H1s, which changes the registry `Title` column that `build-filename-map.mjs:4` treats as "the sole source of truth" and `build-publish-bundle.mjs` fails closed on. This is a requirement reinterpretation and must be recorded as one. — **Reversibility:** one-way — HYG-02's text mandates catching "the class rather than the prefix"; dropping an arm is a documented narrowing that a later milestone must re-open deliberately, not rediscover.

- **D-16:** The widened needle catches the **47 `.planning/research/` artifact citations the draft never looked for**. `[MEASURED]` `PITFALLS.md|FEATURES.md` → **47 hits / 19 files** (both figures independently reproduced exactly by this research), ~10-11 carrying the `research/` prefix — literally the "escaped by dropping `.planning/`" shape HYG-02 describes, and the strongest instances in the repository. Also `RESEARCH.md` (9, reproduced exactly), `STACK.md` (6, reproduced exactly), `62-SCRAPE-PREP.md` (1, reproduced exactly). Worst single sites: `16-managed-apple-account-runbook.md` (10), `15-mdm-server-reassign-runbook.md` (7), `17-audit-log-scoping-runbook.md` (6). The brief's "10 hits / 10 files" census is **not reproducible by any needle variant** — 4-needle gives 8/8, 6-needle 9/9, no-boundary 11 hits over 9 files.

- **D-17:** The **five near-identical clones of the named `:266` defect** are in scope with it. `[MEASURED]` `grep -rn "amend the operations index" docs/` → **10 hits** (reproduced exactly by this research); `drift-migration/00-overview.md:204`, `drift-migration/01-windows-drift-detection.md:221`, `app-lifecycle/00-overview.md:220` and `app-lifecycle/02-macos-pkg-dmg-pipeline.md:213` are the same sentence template. `app-lifecycle/02:213` leaks **"per ROADMAP line 457"** — a line number into a planning file, strictly worse than the named defect.

- **D-18:** `Phase NN` is **out of the gated class for v1.22**, with its census recorded as a deferred item — by owner ruling. `[MEASURED]` the draft's "large majority inside Version History rows" is false: 666 occurrences on 607 lines split as **body prose 332 (49.8%) across 95 files**, Version History 198 (29.7%), other table rows 115, `## Changelog` 21. The exemption's stated ground is false twice over — `EEE-SOP-standard.md:209-223` mandates one row whose canonical form is `| YYYY-MM-DD | v1.15 EEE reformat — content not re-reviewed |`, a **milestone** token with zero phase numbers, and **351 of 527 VH rows across 251 files carry no `Phase NN` at all**. And provenance mostly lives under a legacy `## Changelog` heading anyway (`02-zero-touch-portal.md:263` vs `:270`). Gating body prose would put the gate **RED on 95 files at HEAD**, past the HYG preamble's own bound of "defects that already carry a file and a line".

- **D-19:** `docs/_standards/EEE-SOP-standard.md:578` and `:649` are **both edited** — keep the provenance, drop the path. `[MEASURED]` `grep -rn "\.planning/" docs/` returns **2** (reproduced exactly by this research), and both hits are these lines; neither is one of HYG-02's named defects. `:649` reads "Owner-ruled, recorded as D-04 in `` `.planning/phases/151-…/151-CONTEXT.md` ``" — the provenance survives as "recorded as D-04 in the Phase 151 context"; only the path, which rots at milestone archival, goes.

- **D-20:** **FIX-11 is re-opened and discharged explicitly**, by owner ruling — the real reason these two lines matter. `[MEASURED]` FIX-11's own criterion (`.planning/milestones/v1.21-REQUIREMENTS.md:41`) is `grep -rn "\.planning/research/\|\.planning/phases/" docs/` returns **0**. Driven to 0 by `9fd7cf1c` (Phase 145, 2026-08-19); **re-broken seven days later by `285a65d5`** (Phase 151, 2026-08-26), which introduced exactly `:578` and `:649`. At HEAD the criterion returns **2**, while `V-145-ARCHIVALDRIFT` (`check-phase-145.mjs:142`) reports 0 because its regex `/\]\([^)]*\.planning\/(research|phases)\//` matches only **markdown link syntax** and both hits are inline-code / table-cell text. `v1.21-REQUIREMENTS.md:195` still reads `| FIX-11 | Phase 145 | Complete |`. A shipped, Complete-marked requirement has been RED for ten days and nothing knows. Fixing the lines silently would repeat the exact failure mode.

- **D-21:** The standing gate **folds FIX-11's criterion in alongside the bare `.planning/` literal**, so the regression cannot recur invisibly. This is the project's own proof that a one-time measurement is not a guard.

- **D-22:** `docs/v1.9-DEFERRED-CLEANUP.md` gets its bare `REQUIREMENTS.md lines 70, 88` citation fixed and is **not moved or deleted** — right answer, and the draft's reason was fabricated. `[MEASURED]` `grep -rn "docs/v1\.9-DEFERRED-CLEANUP" scripts/` → **zero hits**; the validators the draft named pin different files (`check-phase-62/63/64/65/66` → `.planning/milestones/v1.6-`, `-70` → `v1.7-`, `-72/-73` → `v1.8-`, `-151` → `v1.19-`). **The actual authority is `.planning/milestones/v1.9-DEFERRED-CLEANUP.md:191`**: *"CROSS-LINKED, **NOT deleted or overwritten**… the `docs/` file carries the fuller PSSO-FUT-01 detail authored at Phase 77 and remains valid."* Verified: the `docs/` copy is materially fuller, so the sibling is **not** a superset and retention is a recorded ruling. The convergence hygiene flag in that same line is a genuine deferred item.

- **D-23:** The two-tier rule is stated as **mechanics, not as a claim about publication**. Write it as: the literal `.planning/` grep is corpus-wide with no directory exclusion per SC#4; the class needles exclude `docs/_standards/` and `docs/_registry/` because recording provenance is those documents' function. Note inline the fact that makes the layering worth documenting — the literal arm's **entire live surface at HEAD (2 hits) sits inside the directory the class arm excludes**. Do not lean on "not published prose": `EEE-SOP-standard.md:41-43` (confirmed exact by this research) says the meta directories *and* `docs/_templates/` are "**governed by this standard** but do not belong in the indexed SharePoint library".

#### Area C — The authoring standard

- **D-24:** The standard lands as a **new section in `docs/_standards/EEE-SOP-standard.md`**, matching the v1.16 STD-04 (`:402`) and v1.18 STD-05 (`:456`) precedent (both headings confirmed at exactly those line numbers by this research). Publish-exclusion is the *defining property* of the class that already holds every prior authoring standard — authoring guidance is written for authors working in the repository, not for SharePoint readers, so non-delivery is the point, not a defect.

- **D-25:** The heading is **`## Prose Style Authoring Standard`**, carrying **no requirement ID**, by owner ruling; the `v1.22 STD-01..STD-04` attribution goes in the Version History row, exactly where both precedents put the milestone token. `[MEASURED]` `STD-0*` has **four live meanings**: `STD-01`, `STD-02` and `STD-03` are v1.15 requirements (`v1.15-REQUIREMENTS.md:33-35`, `check-phase-114.mjs:61-63` — both confirmed exact by this research) — and **`STD-01` is the requirement to author this very file** (v1.15-REQUIREMENTS.md's STD-01 text reads: "The canonical **EEE SOP standard** document is authored in-repo…"); `STD-04`/`STD-05` are the existing sections; and `STD-NNN` is the meta-doc ID namespace, this file being **`doc_id: STD-001`** (`:2`, pinned at `_CONTENT-PINS.txt:4` — both confirmed exact by this research). The draft's `(v1.22 STD-01..STD-04)` also deviates twice from the precedent it claimed to match (both precedents are bare single IDs, and no precedent spans a range) and would make `:593`'s existing cross-reference to "(STD-04) section above" ambiguous. The same collision shape exists for HYG — `:648` already carries a `v1.19 HYG-05` row.

- **D-26:** The new heading is **pinned** in `scripts/docs-style/_CONTENT-PINS.txt` and `_PINNED-HEADINGS.txt`. `[MEASURED]` both precedent headings are protected (`_CONTENT-PINS.txt:103` and `_PINNED-HEADINGS.txt:72` for STD-04, `_CONTENT-PINS.txt:139` for STD-05 — all three line numbers confirmed exact by this research, plus `check-phase-120.mjs:70` as an exact needle, also confirmed exact); a brand-new heading would be pinned by nothing, and Phase 158 SC#3 routes a style sweep over exactly Phase 157's edited files — i.e. over a fresh, unpinned normative section full of `must`/`never`, which is the STD-04 hazard applied to STD-04's own text.

- **D-27:** The section **is C17-governed**, and the two hazards must be written as **prose, not as a blockquote**. `[MEASURED]` `EEE-SOP-standard.md:2` reads `doc_id: STD-001`; `c17-eee-contract.mjs:523-538` enrolls any file under `docs/` carrying a `doc_id`, with **no meta-doc exclusion**; the file is not a TEMPLATE-SENTINEL (`last_verified: 2026-07-04`, not `1970-01-01`). Live run (re-executed by this research): **237 files checked, 0 violations, exit 0**, 0.6 seconds. Binding constraints: assertion **#12** (comment at `:387`, code through `:406` — confirmed by this research; CONTEXT cites `:387-409`) joins consecutive top-level `>` lines with a space and hard-fails over **200 characters** — and the `must` hazard exists today as a ~900-character single blockquote run at `google-style-verify/SKILL.md:104-121`, so copying that shape in is an immediate hard fail; assertion **#11** requires a prose summary within 5 lines of any table over 25 rows. C17 is on the apex chain.

- **D-28:** Insert the section **before `:641`**, preceded by a `---` horizontal rule. `[MEASURED]` every top-level standard section is preceded by a rule (before `:402`, `:456`, `:583`); `## Version History` at `:641` is the file's **terminal** H2 — a section "added at the end" would land after the row announcing it. (This research independently confirmed via `grep -n "^## "` that `## Version History` at line 641 is the last H2 in a 649-line file, and the two `.planning/` literal hits sit at exactly `:578` and `:649`.) Decide `last_verified`/`review_by` explicitly: `:7-8` read `2026-07-04` / `2026-10-02`, never bumped by the v1.18 or v1.21 amendments, and `review_by` is 27 days out.

- **D-29:** The section's own text must **state whether the prose standard governs the whole corpus or only the enrolled set**. `[MEASURED]` `:41-43` and `:312-325` scope the standard to "Phase-1 in-scope corpus documents"; **`docs/operations/` is 29 files and 0 of 29 carry a `doc_id`** (both figures independently confirmed exactly by this research); and `REQUIREMENTS.md:127` puts retrofitting them out of scope. Yet every HYG-01..HYG-05 defect site is in `docs/operations/`, and D-12's gate runs over all 294 files. That is a 57-file scope mismatch and it must be resolved in prose, not left implicit.

- **D-30:** The wiring surface is **project `CLAUDE.md` + the 8 `docs/_templates/*.md` + the tracked `google-style/SKILL.md`**, by owner ruling. `[MEASURED]` templates alone are provably insufficient: there is **no template** for `docs/operations/` (29 files, the entire v1.21 output), `docs/decision-trees/`, `docs/*-lifecycle/`, the six `_glossary*.md`, `docs/end-user-guides/` or `docs/error-codes/` (this research confirmed exactly 8 templates exist: `admin-template.md`, `admin-template-android.md`, `admin-template-ios.md`, `admin-template-macos.md`, `l1-template.md`, `l2-template.md`, `recipe-template.md`, `reference-template.md` — no `operations`/`glossary`/`decision-tree`/`lifecycle` template among them). `CLAUDE.md` is the only file loaded unconditionally every session and today carries **zero** doc-authoring guidance, still describing a PowerShell/FastAPI/React application (confirmed by this research: `grep -in "documentation\|authoring\|google-style" CLAUDE.md` returns only generic API-docs / runbook-location mentions, zero authoring-standard guidance). There is no `CONTRIBUTING.md` (confirmed: 0 hits) and no authoring-flow document; `.claude/settings.json` does not exist (confirmed: only untracked `settings.local.json` exists), so a hook-based wiring is not shareable.

- **D-31:** The template→standard link **cannot be verified by the link checker**, so do not rely on it. `[MEASURED]` `check-nav-hub-links.mjs:280` reads `if (relPath.startsWith('docs/_templates/')) continue;` (confirmed exact by this research) — templates are excluded **as a source**, not just as a target, so an anchored template link is never checked, forever. "Land both sides in one commit" addresses commit ordering, which is a different failure mode. Also: **all 8 templates are themselves C17-enrolled** via the `doc_id: RE-[FILL-IN]` TEMPLATE-SENTINEL path (`c17-eee-contract.mjs:300,490`; this research confirmed all 8 templates carry `doc_id: RE-[FILL-IN]` at their respective lines), so D-30 is **9 C17-governed edits**, not zero.

- **D-32:** The gate asserts **(a)** the gated rules stay zero and **(b)** the leak class is empty — **not (c)** the wiring presence. `[MEASURED]` bundling per se is fine: 20 `vN-milestone-audit.mjs` files bundle up to 17 unrelated concerns each. The objection is **lifetime**: "all 8 templates carry the directive and the standard section exists" is verbatim the presence-plus-landed-needle shape of `check-phase-114.mjs:61-77`, `-120.mjs:61-72` and `-129.mjs:43-53` — a milestone-lifetime content assertion. `carve-gate.mjs:5-12` states the consequence: welding one into a permanent apex member *"would go RED at the first v1.21 content commit and stay red forever — manufacturing exactly the accepted-red class this milestone's bar requires deleting."* Assertion (c) belongs in Phase 159's `check-phase-157.mjs` leaf.

- **D-33:** STD-03's standing rule is written in **three places**: the module docstring of `.claude/skills/google-style/check.py`, `scripts/docs-style/RESUME.md`, and the new standard section. `[MEASURED]` the draft's premise was false twice. REQUIREMENTS.md is **not** removed at close here — `git log --diff-filter=D` deletions stop at `d0fda4f9` (v1.17), v1.18-v1.21 all closed without deleting it, and 22 `vN-REQUIREMENTS.md` copies are retained permanently. And the audience is wrong: **`grep -rln "docs/_standards" ~/.claude/gsd-core/` → 0** (confirmed exactly by this research) — nothing in the GSD workflow set reads that directory, so a future milestone's planning agents would never find it there. `check.py`'s docstring and `RESUME.md` are what a future re-litigation actually opens (this research confirmed `RESUME.md` line 7 reads: "NEXT SESSION STARTS HERE — the verification is DONE; decide whether to land"). Keep `REQUIREMENTS.md:123`'s Out-of-Scope entry; drop the "archived at close" justification.

- **D-34:** The two hazards are **split**, and no edit is made to `google-style-verify/SKILL.md`. `[MEASURED]` the `must` hazard is **already fully documented** there at `:104-121` — a normative callout carrying the 26-vs-19 counts and two worked contradiction examples (both confirmed present verbatim by this research at exactly those lines) — plus the self-indictment at `:195-197` (*"its largest class — a hedge promoted to `must` — is one this skill previously *recommended*. Budget for it."* — confirmed verbatim). The counts are confirmed against `scripts/docs-style/_JUDGE-VERDICTS.json`: `{"STRENGTHENED": 26, "PRESERVED": 360, "INVERTED": 19, "WEAKENED": 1}`, 406 records, baseline `c97d322` — **this research independently re-read the JSON's own `counts` field and reproduced this exact dictionary and the `judged: 406` value; a naive string-grep for quoted verdict names in the raw file produces different totals (410) because verdict-name strings also appear inside per-record prose fields — use the file's own `counts`/`judged` keys, never a substring grep, when re-verifying this figure.** The hazard with **no home** is passive→active: `grep -in "passive\|actor\|invent"` over that skill returns **0 hits** (confirmed exactly by this research). It is a property of the *rewriter* — record it in the standard section and add it to `google-style/SKILL.md` beside the existing quoted-error-message anti-pattern at `:127` (confirmed verbatim by this research), whose normative reference is `references/voice.md`.

- **D-35:** Record the **two-copy divergence risk** when editing the skill. `[MEASURED]` both `~/.claude/skills/google-style/` and `.claude/skills/google-style/` exist and are byte-identical (`SKILL.md`, `check.py`, 68-69 `references/`) — this research independently `diff`'d both `check.py` and `SKILL.md` between the two locations and confirmed byte-identical; the global copy is untracked and outside the repository, so a tracked-copy edit silently diverges and which loads is environment-dependent. `google-style-verify` exists **only** at project level (confirmed by this research: no `~/.claude/skills/google-style-verify/` directory exists) — a session loading only the global skills has the rewriter without the verifier, the exact pairing STD-01 requires.

#### Area D — The hygiene defects

- **D-36:** HYG-01's true class is **5 sites in 3 files**, and the requirement names the *least* published one. `[MEASURED]` `docs/operations/00-index.md:28` (section paragraph, Windows/macOS/iOS/Android, no Linux) and `:32` (the named row); `docs/index.md:305` (byte-equivalent paragraph) and `:309` ("4-platform update-enforcement comparison hub (Windows + macOS + iOS + Android)") — **seven lines above `:312`, which links `05-linux-update-delivery.md`**; and `patch-management/00-overview.md:30-33`, which routes to four platforms **two lines below** a 5-platform paragraph. All five coordinates and their exact text were independently reproduced by this research (see Common Pitfalls / Coordinate Verification for the full text dump). `docs/index.md` carries `doc_id: RE-219` → EEE-enrolled and shipped in the publish bundle, while the *named* site carries no `doc_id` and ships in neither. Leave `00-index.md:48,60` and `index.md:320,330` — correct, no Linux guide exists in those sets.

- **D-37:** HYG-01 edits must respect **`V-54-08`'s column order**. `[MEASURED]` `check-phase-54.mjs:127-143` requires `patch-management/00-overview.md` to carry a table row matching `| … Windows … macOS … iOS … Android … |` **in that order**; it passes today only because Linux is an appended sixth column. No Linux-motivated column reordering. Gate-safe otherwise: no file under `scripts/` or `.claude/skills/` carries the `4-platform comparison hub` prose.

- **D-38:** HYG-03 is **two edits plus two recorded non-defects**. Fix the conflation at `docs/reference/macos-capability-matrix.md:70` (`| Microsoft Store integration | Yes (Windows Package Manager) | …` — confirmed verbatim by this research); link the bare twin at `docs/admin-setup-apv2/03-device-preparation-policy.md:141` (confirmed by this research: reads "Microsoft Store (WinGet only)", unlinked). `[MEASURED]` `02-etg-device-group.md:129` is **already linked** (Phase 152, `4816635b`) and its anchor resolves — confirmed by this research: the line already reads `[Microsoft Store (WinGet)](../operations/patch-management/08-windows-app-updates.md#enterprise-app-management-store-apps-and-winget--routing)` — record as satisfied; `00-overview.md:247` ("the Windows Package Manager control surface") is **correct usage** — leave it. Frozen-read safety verified: `check-phase-63.mjs:208-230` byte-pins the matrix but reads it frozen-to-frozen via `readAtV113Close`, so the live `:70` edit cannot break it.

- **D-39:** The **new link at `03:141` uses the explicit anchor id, not the slug**. `[MEASURED]` `02:129`'s existing link rides `#enterprise-app-management-store-apps-and-winget--routing`, an em-dash-derived **double-hyphen slug** protected by no pin file, in a corpus that runs bulk em-dash sweeps — while `08-windows-app-updates.md:251` carries an explicit `<a id="eam-store-winget-routing"></a>` immediately above the heading at `:252` (both confirmed verbatim, exact lines, by this research). Doubling a fragile unpinned anchor is the wrong direction; the explicit id exists for exactly this.

- **D-40:** HYG-04 is **three sites, and the correct date is `2025-06-17`**. `[MEASURED]` three sites carry the wrong `2026-06-19` — `patch-management/00-overview.md:101`, `01-windows-wufb-rings.md:76` and `:101` (all three confirmed verbatim, exact lines, by this research). Eight carry `2025-06-17` and are **correct**, including the two in `docs/recipes/05-enterprise-update-plan.md:95,106` that ship in the bundle as `RE-227` — leave them (both confirmed verbatim, exact lines, by this research). Fixing only the named line would leave two live contradictions of the same fact.

- **D-41:** The date is resolved from the **page's own rendered bytes, with a control**, and the method is recorded as the evidence. `[MEASURED]` the Learn page carries **two** date metas — `ms.date 2025-06-17` and `updated_at 2026-06-19` — which is why this project twice got contradictory answers from the same URL. What the page **renders** is `<span>Last updated on <local-time datetime="2025-06-17T08:00:00.000Z" data-article-date-source="calculated">2025-06-17</local-time></span>`. Control: an unrelated Learn page with a divergent pair (`ms.date 2026-06-25` / `updated_at 2026-07-27`) renders **2026-06-25**. Learn's displayed date always tracks `ms.date`; `updated_at` is a build timestamp the page never surfaces. **Record `ms.date` as the corpus convention explicitly.** HYG-04 is therefore *not* internally contradictory — "agree with the six citations" and "agree with the page's own live date" both resolve to `2025-06-17`. Never use a summarizing fetch for this class of question. (This research did not re-fetch the live URL — it is not required to execute the already-resolved fix, and the CONTEXT's resolution is internally consistent with the local corpus evidence this research did re-verify: the eight correct `2025-06-17` citations and three wrong `2026-06-19` citations.)

- **D-42:** Disposition `07-windows-autopatch.md:432` — an **undated** Further Reading link to the same URL, the 12th citation. A "one fact, one date" remediation must decide about it rather than leave it unexamined. `[MEASURED]` context: the class the draft suspected **does not exist** — 171 `(updated …)` lines, 167-168 dated citations, 32-33 distinct URLs, and **exactly one URL carries two different dates**: HYG-04's own. (This research confirmed `07-windows-autopatch.md:432` is indeed undated — the "External References" list item carries no `(updated …)` suffix, unlike the six dated citations inside the same file's body.)

- **D-43:** HYG-05 is a **false statement requiring a substantive correction**, not a disambiguation. `[MEASURED]` `patch-management/00-overview.md:79-86` reads "each carries its own Entra group **(a group supports up to 15 rings, and a tenant up to 300 groups)**" — nearest antecedent *Entra group*, and "300 groups" reads as 300 Entra groups. Both are false. `07-windows-autopatch.md:219-222` quotes Microsoft verbatim: "up to 15 deployment rings **per Autopatch group**" and "up to 300 **Autopatch groups** in your tenant". A disambiguation that keeps the parenthetical attached to the Entra-group clause **satisfies HYG-05's literal wording and still ships a wrong planning limit**. Re-attach the limits to Autopatch groups. (Both quotes confirmed verbatim, exact lines, by this research.)

- **D-44:** HYG-06 is **five entries, not six** — DFCI is already satisfied. `[MEASURED]` `docs/_glossary.md:183` carries `### Device Firmware Configuration Interface (DFCI)` with an Alphabetical Index link, covering the CSP path, cert-chain authorization, per-setting reporting, reinstall persistence and the Autopilot-registration gate (confirmed verbatim, exact line, by this research). The other five — hotpatching, the Autopatch group model, `unattended-upgrades`, the Microsoft 365 Apps update channels, the Enterprise App Catalog — are absent from all six glossary files case-insensitively and across variants (confirmed by this research: a case-insensitive grep for all five terms across all 6 `docs/_glossary*.md` files returns 0 hits). Record the falsification against the requirement text.

- **D-45:** Glossary placement follows the **Phase 149/150 "shoehorn plus re-declare" precedent**. `unattended-upgrades` → `_glossary-linux.md`; the other four → `_glossary.md`. `[MEASURED]` `_glossary.md` is `doc_id: RE-184` "Autopilot Glossary", scoped by its `## Summary` to APv1/APv2 deployment, with entries as H3s under exactly six category H2s — `Autopilot`, `Enrollment`, `Hardware`, `Network`, `Security`, `Deployment Modes` (this research independently confirmed all six via `grep -n "^## "`, at lines 37/43/109/226/238/264 respectively) — **none of which naturally takes patch-management vocabulary**. Place each under the closest H2 **and amend the `## Summary` coverage enumeration to declare the widened scope**, exactly as Phase 149 did when it added DFCI. Creating a patch-management glossary is a new capability the phase does not have.

- **D-46:** The glossary entry checklist is **longer than three items**. Each entry also needs: a dated, phase-attributed `## Version History` row (`_glossary.md:328+` has one for every prior addition — Phases 59, 75, 91, 149, 150, all confirmed present verbatim by this research at the file's tail); **`last_verified`/`review_by` must NOT be advanced** — owner ruling D-63 (2026-08-25) puts this file on a 90-day cycle, not the milestone's 60-day one; C17 #4/#5's `## Summary`-first ≥30-word rule; C17 #12's 200-char blockquote cap (the DFCI `> See also:` line already sits near it); `_glossary-linux.md`'s **five mandatory category H2s** (`check-phase-49.mjs:199-214`, `V-49-13`, live read — confirmed exact by this research: Distro & Lifecycle, Agent & Service, Compliance & Encryption, Operations & Diagnostics, Cross-Platform Collisions, matching `_glossary-linux.md`'s own six H2s minus the Alphabetical Index/Summary/Version History structural ones); `V-49-19`'s cross-platform-collision note rule; and `V-49-20`'s pinned `[Linux Provisioning Glossary](_glossary-linux.md)` literal (confirmed exact by this research: `RECIPROCAL_LINK_LITERAL` at `check-phase-49.mjs:31`). No validator counts entries or asserts index parity, and `regenerate-supervision-pins.mjs:225-230` treats `## Alphabetical Index` as exempt, so index edits do not perturb supervision pins.

- **D-47:** Match the index's existing convention, do not "fix" it. `[MEASURED]` `_glossary.md:33`'s Alphabetical Index is **not strictly alphabetical** — it ends `… | [ZTDID](#ztdid) | [ZTD](#ztd)` (confirmed verbatim, exact line, by this research) — and no validator enforces order. Re-sorting it is out of scope and would be an unpinned prose change Phase 158 must then sweep.

- **D-48:** **No `157-EDITED-FILES.md` artifact.** Record the phase's first and last commit SHAs in the SUMMARY instead. `[MEASURED]` `ROADMAP.md:208` (Phase 158 SC#3) puts the enumeration in Phase 158's hands and prescribes the method — "the edited-file list is enumerated from `git diff --name-only` across Phase 157's commits" — so a static file satisfies nothing Phase 158 will not re-derive, and it goes stale on any re-execution or amend. (The draft's worry that such a file would violate SC#2 was itself wrong: `ROADMAP.md:207` governs *per-fix* confirmations, not the file list.)

- **D-49:** SEED-001's `status` flips to `closed` as SC#4 requires, **no guard is built**, and the off-schema vocabulary is recorded. `[MEASURED]` the "nothing scans seeds" premise is false — `~/.claude/gsd-core/bin/lib/audit.cjs:600` `scanSeeds` feeds `gsd-tools audit-open`, described at `capability-registry.cjs:300` as an open-artifact audit "for **milestone close gates**". But `audit.cjs:614` reads `new Set(['dormant','active','triggered'])` — this research independently confirmed this exact line and set contents: **`planted` is not in it**, so the scanner never flagged SEED-001 and HYG-07's stated rationale ("a seed that never closes trains the seed-scan to be ignored") is false. `closed` is likewise not a recognised terminal status (this research confirmed `.planning/seeds/SEED-001-macos-psso-admin-setup-doc-accuracy.md` currently reads `status: planted` at line 6, not any of `dormant`/`active`/`triggered`), so the edit is **cosmetically correct and mechanically inert**. The real latent risk is the inverse: normalising this repository's seed vocabulary to the GSD schema would flip SEED-001 to **open at a close gate**. SEED-001's content did ship in v1.13 — verified in three buckets at named lines — so the flag is legitimately stale.

- **D-50:** Order is **HYG-02 (plus the two `EEE-SOP-standard.md` lines) → the gate → the remaining HYG in any order → the standard section**. The draft's rationale was self-contradictory: "gate-last gives every commit a real gate to run" is false, because if the gate is authored last no earlier commit can run it at all. The real dependency is narrow — the gate's leak-class assertion would be red at its own landing commit unless HYG-02 has landed — and it binds **HYG-02 only**. `[MEASURED]` HYG-01, HYG-03, HYG-04, HYG-05, HYG-06 and HYG-07 have **zero** interaction with any gated rule. Gate second so it is enforcing over the largest number of subsequent commits, and land the C17-constrained authoring last.

### Claude's Discretion

- The gate tool's filename and internal structure, provided it is single-file, invokes `check.py` rather than reimplementing it, carries a `--self-test` per D-11, and enumerates via `git ls-files`.
- Exact wording of the `EEE-SOP-standard.md` supersession row and the `REQUIREMENTS.md:62` annotation, provided the corrected figure names the corpus it was measured over.
- Commit message wording and commit granularity, provided D-50's ordering holds and the standard-section commit is separable from every corpus edit.
- Which of the six `_glossary.md` category H2s each of the four Windows terms lands under, provided the `## Summary` enumeration is amended in the same commit per D-45.
- Whether `EEE-SOP-standard.md`'s `last_verified`/`review_by` are bumped, provided the choice is stated rather than left implicit (D-28).

### Deferred Ideas (OUT OF SCOPE)

- **The 95-file `Phase NN` body-prose population** — 332 occurrences, with the four-bucket census (VH 198, other tables 115, Changelog 21) attached. Owner-ruled out of the v1.22 gated class (D-18).
- **The requirement-identifier leak arm** — mechanically undecidable, with the 129-of-142 evidence and the published-H1 casualties recorded. Re-opening it needs a registry, filename-map and bundle-parity plan (D-15).
- **~18 citations copied from `updated_at` rather than `ms.date`** — implied by the 18-to-7 census once D-41 fixes the convention. None carries a file and line in any requirement, so the HYG preamble's own bound excludes them.
- **Citation freshness drift** — 5 of 32 probed Learn URLs are stale against both metas; worst case `waas-manage-updates-wufb` cited at `2025-10-02` against a live `updated_at` of `2026-08-20`, cited 4 times. Out of milestone scope by the requirement preamble.
- **DEFERRED-CLEANUP convergence** — the v1.10+ hygiene flag at `.planning/milestones/v1.9-DEFERRED-CLEANUP.md:191`, still open (D-22).
- **`docs/operations/` EEE/C17 enrollment** — 29 files, 0 with `doc_id`, explicitly out of scope at `REQUIREMENTS.md:127`, but it is why the gate's scope and the standard's scope disagree (D-29).
- **Seed-status schema normalisation** — this repository's `planted`/`closed` vocabulary is off-schema against `audit.cjs:614`'s `{dormant, active, triggered}`. Normalising would flip SEED-001 to open at a close gate, so it needs a deliberate pass (D-49).
- **The two-copy skill divergence** — `~/.claude/skills/google-style/` untracked vs the tracked project copy, with `google-style-verify` project-only (D-35).
- **`_glossary.md:33`'s non-alphabetical index tail** (`ZTDID` before `ZTD`) — no validator enforces order; re-sorting is an unpinned prose change Phase 158 would have to sweep (D-47).
- **A merge-marker / conflict gate as a standing validator** — carried from Phases 155 and 156; still no validator covers it.
- **`V-132-HUBSNOTWIRED` / `V-137-HUBSNOTWIRED` regex repair** — carried from Phase 155.
- **A corpus-wide evidence-label taxonomy** (`[SOURCED]`/`[ASSUMED]`/`[UNVERIFIED]`/`[PILOT]`) defined in one place — carried from Phases 155 and 156.
- **`judge-packets.py` alignment quality** and **`pins2.py` cross-repo geometry** — carried from Phase 156.
- **`.gitattributes` `* text=auto eol=lf`** — deferred to Phase 159 by Phase 154.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| STD-01 | Wire `google-style` into the document-creation flow; document its pairing with `google-style-verify` for bulk rewrites | D-30 identifies the exact wiring surface (`CLAUDE.md` + 8 templates + tracked `SKILL.md`) with a re-verified 8-template inventory and a confirmed-empty `CONTRIBUTING.md`/`.claude/settings.json`. D-31 confirms the link checker cannot verify a template→standard link (excluded as a source at `check-nav-hub-links.mjs:280`), so wiring must not rely on that check. D-35 documents the two-copy skill risk to flag in the wiring doc. |
| STD-02 | Add a mechanical gate over exactly the slice of `check.py --no-headings` that can report zero on unprotected prose | D-02/D-05 give the exact gated rule set (`anthropomorphism` + `person-first`) with independently re-derived raw/unprotected counts. D-09 through D-13 give the tool's placement, enumeration method (`git ls-files`, confirmed as a new idiom — see Architecture Patterns), and the one existing structural analog (`check-nav-hub-links.mjs`) with exact `--self-test` line numbers re-verified. D-06 gives the true mechanism of the `--no-headings` flag (confirmed exact against source) so the exclusion record states it correctly. |
| STD-03 | Write the non-gate rule ("never mandate a rule set whose checker cannot report zero on work already accepted") as a standing rule in a place a future milestone will find it | D-33 gives the three verified homes (`check.py`'s docstring, `RESUME.md`, the new standard section) with the `gsd-core` audience-miss re-confirmed (0 hits). |
| STD-04 | Record the two rewrite hazards (must-promotion 26-vs-19, passive→active) in authoring guidance | D-34 re-confirms the `_JUDGE-VERDICTS.json` counts via the file's own `counts` key (not a substring grep, which is unreliable — see Common Pitfalls) and confirms `google-style-verify/SKILL.md` already documents the `must` hazard fully (no edit needed there) while `passive`/`actor`/`invent` are absent (0 hits) — that hazard needs a new home in `google-style/SKILL.md` beside the existing anti-pattern at `:127` (verified verbatim). |
| HYG-01 | Fix the 4-platform update-enforcement hub description to 5-platform | D-36/D-37 give all 5 site coordinates with re-verified exact text, plus the `V-54-08` column-order constraint (cell edits only, no reordering) confirmed against `check-phase-54.mjs:127-143`. |
| HYG-02 | Remove leaked internal planning references from published prose (widened class, not just the literal prefix) | D-14 through D-23 re-derive the entire census from scratch: 2 literal `.planning/` hits (both non-target, inside `docs/_standards/`), 47 `PITFALLS.md|FEATURES.md` hits / 19 files, 9 `RESEARCH.md`, 6 `STACK.md`, 1 `62-SCRAPE-PREP.md`, and 10 exact clones of the "amend the operations index" sentence — all independently reproduced by this research at HEAD. |
| HYG-03 | Correct the macOS/Windows package-manager conflation and link its unlinked twins | D-38/D-39 re-verify the exact conflated line, the already-linked satisfied site, the correct-usage non-defect, and the specific anchor-id-not-slug guidance with the target anchor id confirmed present. |
| HYG-04 | Correct the citation-date mismatch to agree with the article's own live date | D-40/D-41/D-42 re-verify all 3 wrong-date sites, all 8 correct-date sites (including the 2 that ship in the publish bundle), and the 1 undated Further-Reading link, all at exact coordinates. |
| HYG-05 | Disambiguate the ambiguous ring/group-count antecedent | D-43 re-verifies both the false parenthetical and Microsoft's verbatim correct quote at exact coordinates. |
| HYG-06 | Author glossary entries for 6 new v1.21 terms | D-44 re-confirms DFCI is already satisfied (0-hit case-insensitive grep for the other 5 across all 6 glossary files) and D-45/D-46 give the exact placement precedent, category H2 list, and the full non-obvious checklist (Version History row, frozen `last_verified`, C17 constraints, `_glossary-linux.md`'s 5 mandatory H2s, the pinned reciprocal-link literal). |
| HYG-07 | Close stale-open `SEED-001` | D-49 re-confirms the seed's exact current `status: planted` value and the exact `audit.cjs:614` status set that makes the fix mechanically inert but still correct to make. |

</phase_requirements>

## Standard Stack

No new external packages are introduced by this phase. All tooling is already vendored and in-repo.

### Core (existing, no new installs)
| Tool | Version/Location | Purpose | Why Standard |
|------|-------------------|---------|---------------|
| `python3` | System interpreter (already invoked by `.claude/skills/google-style/check.py`, `scripts/docs-style/sweep3.py`) | Runs `check.py`, the mechanical style checker the gate must invoke | Already the vendored skill's runtime; this research independently re-ran it (68.7s over 294 files) confirming it is present and working in this environment |
| `node` | Already used by every `scripts/validation/*.mjs` file | Runs the new gate tool, structurally modeled on `check-nav-hub-links.mjs` | Matches the established idiom for every standalone content-phase validator in this repository |

### Package Legitimacy Audit

**N/A — this phase installs no external packages.** All tooling (`check.py`, `sweep3.py`, `check-nav-hub-links.mjs`, `c17-eee-contract.mjs`) is already vendored in-repo; the new gate tool this phase's planner authors is first-party code with zero new dependencies (Node built-ins only, matching the `scripts/validation/` convention stated in `check-nav-hub-links.mjs`'s own header comment: "Node built-ins ONLY — zero external npm packages").

## Architecture Patterns

### System Architecture Diagram

```
git ls-files 'docs/*.md'  (294 tracked .md files, NEW enumeration idiom for this repo)
        |
        v
new gate tool (scripts/validation/check-prose-style.mjs or similar, single file)
        |
        |-- spawns --> python check.py --no-headings <files...>
        |                     |
        |                     v
        |              mask_code() strips fences/inline-code/links/URLs
        |                     |
        |                     v
        |              RULES loop (10 regexes) + word-list scan
        |                     |
        |                     v
        |              stdout: "== <path>: N candidate(s)" + "  L<n> [<rule-id>] <note>"
        |
        v
gate tool parses stdout POSITIONALLY (never substring-greps rule names)
        |
        |-- filters to gated rules only: anthropomorphism, person-first
        |-- subtracts person-first's 2 sweep3.py-PROTECT-surviving lines (must-not-edit)
        |
        v
--self-test mode: feed synthetic violating strings for EACH gated rule, assert each fires
        |
        v
exit 0 (gated rules at zero, self-test passes) / exit 1 (regression or dead-regex detected)
        |
        v
(NOT wired into CI this phase -- D-09; Phase 159 adds the check-phase-157.mjs leaf and
 the enforcing CI workflow)
```

### Recommended Project Structure
No new directories. One new file in the existing flat `scripts/validation/` directory (Claude's Discretion governs the exact name), following the single-file, no-subdirectory convention every other standalone validator there uses.

### Pattern 1: Standalone content-phase gate with `--self-test`
**What:** A single `.mjs` file in `scripts/validation/` with no chain registration, invoked manually, that supports a `--self-test` flag which runs synthetic assertions instead of the real corpus scan.
**When to use:** Exactly this phase's STD-02 gate — a check that is authored now but is deliberately not enforcing until a later phase wires it into CI (D-09).
**Example (the one existing precedent, re-verified by this research):**
```javascript
// scripts/validation/check-nav-hub-links.mjs (confirmed at these exact lines)
// Usage:  node scripts/validation/check-nav-hub-links.mjs [--verbose] [--self-test]
const argv = process.argv.slice(2);
const SELF_TEST = argv.includes('--self-test');   // line 30

// ── Self-test mode (c17-eee-contract.mjs --self-test analog) ──── (line 311)
if (SELF_TEST) {
  let stPassed = 0, stFailed = 0;
  function stAssert(label, pass, detail) {
    const tag = pass ? 'PASS' : 'FAIL';
    process.stdout.write(padLabel('[ST] ' + label) + tag + (detail ? ' -- ' + detail : '') + '\n');
    if (pass) stPassed++; else stFailed++;
  }
  // ... one stAssert() call per synthetic case ...
  process.stdout.write('\nSelf-test: ' + stPassed + ' passed, ' + stFailed + ' failed\n');
  process.exit(stFailed > 0 ? 1 : 0);
}
```
For STD-02's gate, the D-11-mandated equivalent is: for each of the two gated rules (`anthropomorphism`, `person-first`), construct a one-line synthetic Markdown fixture guaranteed to trip that rule (e.g. a line containing `"we recommend"` for `person-first`, or `"the system wants to reboot"` for `anthropomorphism` — matching `check.py`'s own regex literally), run `check.py` against it, and assert the rule fires. This is what D-02's finding says would have caught the dead-regex problem on day one.

### Pattern 2: Promoting a standalone self-test into an enforced chain member (for Phase 159's later reference, not this phase's work)
**Example (re-verified):**
```javascript
// scripts/validation/check-phase-143.mjs:~115-127
// Live-runs the tool itself (not a source-grep) with --self-test and asserts exit 0
// plus a specific tail string in stdout.
```

### Anti-Patterns to Avoid
- **Grepping `check.py`'s stdout for a bracketed rule name as a substring match.** D-10: the note text after the bracket is guidance prose sliced from `word-list.md`; a corpus or reference-file edit could introduce a coincidental substring match. Parse the `[rule-id]` field positionally from the fixed `"  L%-5d [%s] %s"` format instead.
- **Hand-rolling a "protected prose" filter for `person-first`.** D-03: a hand-rolled filter inverted the rule on all four of its own findings during the draft. Always derive "unprotected" from `sweep3.py`'s actual `PROTECT` regex and skip set, never a fresh implementation.
- **Treating "0 hits" as proof a rule works.** D-02/D-11: `vague-link` and `empty-alt` report 0 hits because `mask_code()` destroys their `](` requirement before the rule ever runs — the exact same "0 hits" a real regression would also produce. A file-count floor cannot distinguish these; only a synthetic-violation self-test can.
- **Using a filesystem walk (`rglob`/`walkMd`) for corpus enumeration in this specific gate.** D-12: every other `scripts/validation/*.mjs` and `scripts/docs-style/*.py` file does this, and it is fine for them, but this gate specifically must not — a filesystem walk would silently include or exclude files depending on whether `docs/graphify-out/` (268 untracked files, gitignored) currently holds any `.md` files (0 today, but not guaranteed). Use `git ls-files 'docs/*.md'`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Determining which corpus lines are "protected" from a style rule | A fresh regex/heuristic for quoted/UI/vendor text | `sweep3.py`'s existing `PROTECT` regex (lines 66-68) + its skip set (`quoted_lines`, `FENCE`, indent check, `HEADING` at line 69, table-row check, `KEEP_LINE` at line 47) | A hand-rolled filter inverted the rule on all 4 of its own findings during the draft (D-03/D-04); this corpus's protection semantics are already codified and load-bearing |
| Enumerating gated-rule regressions with a fresh detector | A new "count total candidates" script | The existing `check.py` invocation, parsed positionally | `check.py` is the vendored, already-correct tool; D-10 explicitly forbids forking or reimplementing it |
| Verifying a corpus-wide `.planning/` leak class | A single literal-string grep | The two-needle approach from D-14 (`\.planning/` literal + the extension-optional document-name class) | The single-needle version was proven to miss a named defect (`00-overview.md:266`) entirely — the class, not the prefix, is what leaks |

**Key insight:** Every "obvious" hand-rolled filter this phase's draft attempted (a protection filter, a leak-class needle, a coverage census) was independently falsified by measurement at least once. The corpus already has working tools for two of these three problems (`sweep3.py`'s `PROTECT`, `check.py` itself); trust them over a fresh implementation.

## Common Pitfalls

### Pitfall 1: Citing a CONTEXT line number without re-verifying it against the source
**What goes wrong:** A planner copies a `check.py:NN` or `sweep3.py:NN` citation from `157-CONTEXT.md` into a PLAN.md task or into the new gate tool's code comments, and the number is off by a line or two.
**Why it happens:** This research found two such cases even in a CONTEXT this measurement-dense: `check.py`'s `anthropomorphism` rule tuple is at line **38**, not the `:37` CONTEXT cites twice (D-02, canonical_refs); and the guidance-text-embedding code D-10 describes is at lines 125-134 (with the actual `print()` call at line 152), not the `:139` cited (line 139 is `skip = set()` inside `main()`). Neither number is wrong by much, and neither affects the substance of any decision, but a planner writing a code comment that says `// see check.py:37` would be pointing at the wrong tuple.
**How to avoid:** Before writing any line-number citation into new code or a PLAN.md task, re-grep the source for the exact string, exactly as this research did throughout. Every OTHER coordinate in the CONTEXT — all HYG-01 through HYG-06 sites, both `EEE-SOP-standard.md` `.planning/` literals, all C17 assertion/enrollment lines, the STD-04/STD-05 headings, the `_JUDGE-VERDICTS.json` counts — reproduced exactly, so this is not a systemic problem, just a reason to always re-verify before citing.
**Warning signs:** A citation to a single rule-definition line without having grepped for the rule's unique string this session.

### Pitfall 2: Trusting a substring grep over a structured file's own summary field
**What goes wrong:** This research's own first attempt to re-verify `_JUDGE-VERDICTS.json`'s 26/360/19/1 breakdown via `grep -o '"STRENGTHENED"|"PRESERVED"|"INVERTED"|"WEAKENED"'` produced 27/361/20/2 (410 total) — all four categories inflated by exactly 1 — because those verdict-name strings also appear inside per-record prose/evidence fields in the JSON, not just in the "verdict" key.
**Why it happens:** JSON files with narrative content (evidence quotes, notes) can echo their own controlled-vocabulary terms inside free text.
**How to avoid:** Parse the file's own `counts` key (an explicit summary object: `{"STRENGTHENED": 26, "PRESERVED": 360, "INVERTED": 19, "WEAKENED": 1}`) and its `judged` key (`406`), rather than grepping the raw bytes. This research confirmed the `counts` field matches CONTEXT/REQUIREMENTS.md exactly.
**Warning signs:** A recount that differs from a cited figure by a small, uniform amount across every category — that pattern (not a random miss) suggests the recount method, not the original figure, is wrong.

### Pitfall 3: Assuming `git ls-files` is an existing idiom to copy
**What goes wrong:** A planner looks for an existing `scripts/validation/*.mjs` file that already enumerates the corpus via `git ls-files` to copy from, and doesn't find one, then either gives up on the enumeration method or reaches for `walkMd`/`rglob` instead (silently reintroducing the `docs/graphify-out/` risk D-12 exists to avoid).
**Why it happens:** Every other file in `scripts/validation/` and `scripts/docs-style/` — `c17-eee-contract.mjs`, `check-nav-hub-links.mjs` (explicitly "verbatim" copied from the former), `sweep3.py` — uses a recursive filesystem walk (`walkMd`/`rglob`), confirmed by this research. There is genuinely no existing file to copy the `git ls-files` pattern from.
**How to avoid:** Treat this as a 1-line, low-risk addition (`execFileSync('git', ['ls-files', 'docs/*.md'], {encoding:'utf8'}).trim().split('\n')` in Node, or `subprocess.check_output(['git','ls-files','docs/*.md']).decode().splitlines()` in Python), not a research gap. Budget a few minutes for it, not a search for a nonexistent precedent.
**Warning signs:** Time spent searching `scripts/` for a `git ls-files` call that doesn't exist.

### Pitfall 4: Re-running the full apex chain (`check-phase-153.mjs`) live during planning or a turn-boundary-sensitive task
**What goes wrong:** The apex chain is 111 PASS / 0 FAIL / 0 SKIPPED as of the last recorded measurement (Phase 156's close, commit `090ca859`) and this project's own memory notes ("Validator chain baseline runs get killed") record that full-chain runs (5-9 minutes) die at turn boundaries and can leave the tree dirty if a checkout was in flight.
**Why it happens:** The apex chain (`check-phase-153.mjs`) spans 105+ entries and is not fast like the individual leaves.
**How to avoid:** Use the last-recorded tally (`111/0/0`, `nested: false`, from `156-06-SUMMARY.md`) as the pre-phase baseline rather than re-running it during planning; re-run it only as an execution-phase verification step with an appropriate timeout/background strategy. Fast standalone checks (`c17-eee-contract.mjs` — 0.6s, `check-nav-hub-links.mjs` — 0.8s) are safe to re-run freely; this research did so live and both reproduced 237/0 and 0/0 respectively.
**Warning signs:** A task attempting to shell out to `check-phase-153.mjs` without `run_in_background` or an extended timeout.

### Pitfall 5: Editing `docs/reference/macos-capability-matrix.md` structurally instead of cell-only
**What goes wrong:** REQUIREMENTS.md's own validator-constraints table already warns: "cell-value edits are preferred over structural edits because line-shifting is the known pin hazard" for `V-58-22`/`V-58-23`'s capability-matrix anchors, and `check-phase-63.mjs:208-230` byte-pins this exact file (frozen-to-frozen via `readAtV113Close`, confirmed present by this research).
**Why it happens:** HYG-03's fix at `macos-capability-matrix.md:70` is a one-cell text change (`Yes (Windows Package Manager)` → the corrected product name), and it is tempting to "clean up" surrounding rows while there.
**How to avoid:** Edit only the cell content at line 70; do not restructure the table, add/remove rows, or shift line numbers. The frozen-read (`readAtV113Close`) means the live edit is safe *only* because it doesn't change line count/structure — confirmed by D-38's own research note.
**Warning signs:** A diff touching more than the single conflated cell in that file.

## Code Examples

### Enumerating the corpus (D-12's required method, re-verified working)
```bash
# Confirmed: 294 tracked .md files under docs/, 68.7s for a full check.py pass
git ls-files 'docs/*.md'
```

### Invoking `check.py` with the correct flag (confirmed exact argv surface, check.py:138-142)
```bash
python .claude/skills/google-style/check.py --no-headings $(git ls-files 'docs/*.md')
# Output shape per file: "\n== <path>: N candidate(s)"
# Output shape per hit:  "  L<line>   [<rule-id>] <guidance note>"
# Final line:            "<total> candidate(s) total. Confirm each against references/ before rewriting."
```

### Parsing a hit line positionally (never substring-grep the rule name — D-10)
```javascript
// Fixed format from check.py:152 -- "  L%-5d [%s] %s"
const m = /^\s*L(\d+)\s+\[([a-z-]+)\]\s(.*)$/.exec(line);
if (m) {
  const [, lineNo, ruleId, note] = m;
  // ruleId is now a clean positional field -- never a substring match against `note`
}
```

### sweep3.py's PROTECT regex — the corpus's own "unprotected prose" definition (D-03, confirmed exact at lines 66-68)
```python
PROTECT = re.compile(r"`[^`]*`|\]\([^)]*\)|https?://\S+|<[^>]+>"
                     r"|\"[^\"\n]{1,400}\""
                     r"|\b[\w-]+(?:\.[\w-]+)*\.(?:com|net|org|io|dev|gov|edu|mil)\b(?:/\S*)?")
HEADING = re.compile(r"^\s{0,3}#{1,6}\s")   # line 69
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|---------------|--------|
| REQUIREMENTS.md's `[MEASURED 2026-08-24]` preamble claiming 9,363 total candidates and "no rule class is at zero" | 10,402 total (this research reproduced exactly), with `vague-link`, `empty-alt`, and now `anthropomorphism` all structurally/actually at zero | Confirmed stale by this research and by D-07; the 2026-08-24 figure was false even on the day it was written because `vague-link`/`empty-alt` were already dead regexes | The annotate-and-supersede edit to `REQUIREMENTS.md:62` must name the corrected figure AND the corpus it was measured over (this repo's `docs/`, not a scratch corpus) |
| FIX-11's criterion (`grep -rn "\.planning/research/\|\.planning/phases/" docs/` = 0) treated as permanently discharged since Phase 145 | Re-broken by Phase 151 (`285a65d5`), currently 2, RED for 10+ days undetected because `V-145-ARCHIVALDRIFT`'s regex only matches markdown-link syntax | Discovered this phase (D-20) | This phase must explicitly re-open and discharge FIX-11, not silently fix the two lines |

**Deprecated/outdated:**
- Treating "0 hits from `check.py`" as evidence a rule is protective — two of the ten rules (`vague-link`, `empty-alt`) produce 0 hits by construction (masked before they can match), not by corpus cleanliness.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | D-41's Learn-page rendering resolution (`ms.date` is the corpus convention, page renders `2025-06-17`) was not re-fetched live by this research session; it is carried forward from CONTEXT's own `[MEASURED]` finding. | HYG-04 / D-41 | Low — this research independently confirmed the *local* corpus evidence (8 correct `2025-06-17` citations vs. 3 wrong `2026-06-19` citations) is internally consistent with the resolution, so even if the live page has since changed, the corpus-internal consistency argument for `2025-06-17` still holds. |
| A2 | The apex chain's last-recorded tally (111/0/0 at commit `090ca859`) is assumed still accurate at the current HEAD (`567a4685`), since only `.planning`-only commits landed since Phase 156's close. | Common Pitfalls / Pitfall 4, Architectural baseline | Low-Medium — if this assumption is wrong (an intervening edit to `docs/`, `scripts/validation/`, or a pinned file occurred outside this research's view), the planner should re-run the apex chain once, with a background/extended-timeout strategy, before relying on 111/0/0 as a precondition. |

**All other claims in this research were independently re-verified this session** via direct command execution (grep, sed, python, node, git) against the live repository at HEAD, not carried forward from CONTEXT without re-checking.

## Open Questions

None outstanding for planning purposes — the CONTEXT's own "Deferred Ideas" section (copied above) enumerates every item explicitly out of scope, and this research found zero unresolved ambiguity in the load-bearing STD-02/HYG-02 mechanics that CONTEXT left open. The two citation-line corrections noted in Common Pitfalls / Pitfall 1 are informational only and require no decision.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|--------------|-----------|---------|----------|
| `python3` | Running `check.py`, `sweep3.py` | Confirmed working (68.7s live run over 294 files) | Not pinned in this repo; ambient interpreter used | — |
| `node` | Running the new gate tool, `check-nav-hub-links.mjs`, `c17-eee-contract.mjs` | Confirmed working (live runs completed in <1s each) | Not pinned in this repo; ambient runtime used (all 18 CI workflows use `setup-node@v4`) | — |
| `git` | `git ls-files` enumeration, `git log -S` verification per this milestone's VERIFY-06 discipline | Confirmed working throughout this research session | Ambient | — |

No missing dependencies. This phase requires no new tool installation.

## Security Domain

`security_enforcement` is not explicitly set to `false` in `.planning/config.json`, so this section is included per policy, scoped to what actually applies to a docs-corpus + local-tooling phase with no network-facing surface, no auth, and no user input handling.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-------------------|
| V2 Authentication | No | No auth surface in this phase's deliverables |
| V3 Session Management | No | N/A |
| V4 Access Control | No | N/A |
| V5 Input Validation | Yes (narrow) | The new gate tool spawns a subprocess (`check.py`) with a file-list argument built from `git ls-files` output — a trusted, repo-internal source, not external/user input. Use `execFileSync`/`spawnSync` with an argument array (never a shell string built via concatenation) to avoid any shell-injection surface, matching the existing convention in `check-nav-hub-links.mjs` and `c17-eee-contract.mjs` (both use Node's `fs`/`child_process` primitives directly, never `exec()` with a interpolated string). |
| V6 Cryptography | No | N/A |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|-----------------------|
| Command injection via a filename containing shell metacharacters passed to `check.py` | Tampering | Use `execFileSync('python', ['check.py', '--no-headings', ...files])` (argument array), never a shell-interpolated command string. All 294 filenames in this corpus are repo-controlled paths, not external input, but the mitigation costs nothing and matches existing convention. |
| A malicious/typo'd `docs/_templates/*.md` edit silently bypassing the link checker (D-31) | Tampering (of documentation integrity) | Not a runtime security issue — a documentation-integrity gap already recorded as a Deferred Idea; no action required this phase beyond noting it in the wiring documentation per D-31. |

## Sources

### Primary (HIGH confidence — re-executed this session against the live repository)
- `.claude/skills/google-style/check.py` (full file read, all RULES/mask_code/main() line numbers independently re-verified)
- `scripts/docs-style/sweep3.py` (PROTECT/HEADING/KEEP_LINE line numbers re-verified)
- `scripts/validation/check-nav-hub-links.mjs` (self-test structure, `_templates/` exclusion, all cited line numbers re-verified)
- `scripts/validation/c17-eee-contract.mjs` (enrollment loop, assertion #12, live-run 237/0)
- `scripts/validation/check-phase-49.mjs`, `check-phase-54.mjs`, `check-phase-63.mjs`, `check-phase-114.mjs`, `check-phase-120.mjs`, `check-phase-143.mjs`, `check-phase-145.mjs` (cited constraint lines re-verified)
- `docs/_standards/EEE-SOP-standard.md` (all H2 line numbers, both `.planning/` literal hits, frontmatter re-verified)
- `docs/_glossary.md`, `docs/_glossary-linux.md` and the other 4 glossary files (category H2s, DFCI entry, index tail, absent-terms grep re-verified)
- `docs/operations/00-index.md`, `docs/index.md`, `docs/operations/patch-management/*.md`, `docs/reference/macos-capability-matrix.md`, `docs/admin-setup-apv2/*.md` (all HYG defect coordinates re-verified verbatim)
- `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/STATE.md` (governing text re-verified)
- `.planning/seeds/SEED-001-macos-psso-admin-setup-doc-accuracy.md` and `~/.claude/gsd-core/bin/lib/audit.cjs` (seed status and scanner logic re-verified)
- `scripts/docs-style/_JUDGE-VERDICTS.json` (counts field re-verified against its own structured summary, not a substring grep)
- `.github/workflows/*.yml` (0 push triggers, 0 setup-python, 18 setup-node re-verified)
- `git log --all`, `git ls-files`, `find docs -type f` (all corpus-size and CI-history claims independently re-derived)

### Secondary (MEDIUM confidence)
- D-41's Microsoft Learn page-rendering resolution (`ms.date` vs `updated_at`) — carried forward from CONTEXT's own `[MEASURED]` finding, not re-fetched live this session (see Assumptions Log A1); the corpus-internal citation-date evidence supporting it was independently re-verified.

### Tertiary (LOW confidence)
- None. Every claim in this research was either independently re-executed against the live repository or explicitly flagged in the Assumptions Log.

## Metadata

**Confidence breakdown:**
- Standard stack: N/A (no new packages) — HIGH confidence that no new stack decision is needed
- Architecture (gate tool shape, corpus enumeration): HIGH — the one existing structural analog (`check-nav-hub-links.mjs`) was read in full and its exact self-test/exclusion/exit-code mechanics re-verified; the `git ls-files` enumeration gap was independently discovered and confirmed absent from all existing tooling
- Pitfalls: HIGH — every pitfall listed was either directly observed by this research (the two citation-line drifts, the JSON substring-grep trap) or is a re-verified CONTEXT finding
- Hygiene defect coordinates (HYG-01 through HYG-07): HIGH — every single named file:line coordinate in the CONTEXT was independently re-opened and its exact text confirmed at this HEAD; zero drift found

**Research date:** 2026-09-05
**Valid until:** This research is tied to a specific commit (`567a4685`, itself built on the CONTEXT's `7e399a1b` measurement point). Re-verify any coordinate or count cited here if the branch advances past this commit before planning/execution begins — this project's own standing lesson (Phase 150/151/152 review traps) is that coordinates in this repository have gone stale *inside a single phase*.
