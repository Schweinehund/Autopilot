# Phase 156: STYLE Extension & Full-Landing Verification - Context

**Gathered:** 2026-09-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Extend the Google-style pass to the **13** documents it has never correctly seen — the 9 post-fork
documents, RE-237, and the 3 already-styled documents Phase 155 wrote un-styled prose into — then
prove the complete landing (Phase 154's merge plus this batch) with a fresh-agent judge pass over
**batch-10's hunks only** and a before/after structural-gate comparison.

Discharges STYLE-02, VERIFY-02, VERIFY-03, VERIFY-04.

**Out of scope in both directions.** No authoring-standard or hygiene work, and no bounded
`check.py` gate (Phase 157). No publish bundle and no VERIFY-06 git-history audit (Phase 158). No
harness work and no `check-phase-154/155/156.mjs` — Phase 159 authors every v1.22 content-phase
validator leaf (Phase 155 **D-52**, `155-CONTEXT.md:533`; note `155-CONTEXT.md:21` mis-cites this as
D-31). A defect found outside the 13 is recorded, not fixed.

This CONTEXT was produced by `/gsd-discuss-phase` + `/grill-me` + `/adversarial-review`
(5 parallel Finders → Adversary → Referee). 104 raw findings → 71 deduplicated → **61 confirmed**
(18 CRITICAL, 31 MEDIUM, 12 LOW), 9 clean disproofs, 2 Adversary rulings overturned by the Referee,
and 1 finding the Adversary wrongly conceded that the Referee struck. Every `[MEASURED]` row below
was executed against this repository at HEAD `ce9b0b73` on branch `v1.22/154-style-landing`; all
seven agents verified `git status --porcelain` byte-identical at start and end, and `--apply` was
run only against scratch copies outside the repository.

**Five of the draft's own measurements were falsified during review** — the `[PILOT]` count, the
`Ask the admin` protection claim, the editable-prose modal subset, the re-emission arithmetic, and
the em-dash classification. A sixth, larger error was structural: the draft hand-rolled a classifier
instead of running the committed tool, and that single choice produced every wrong number in Area C.
All corrections below are load-bearing.

</domain>

<decisions>
## Implementation Decisions

### Area A — Batch-10 shape and rule sets

- **D-01:** Batch 10 is **reuse-then-author**, not author-from-scratch. `[MEASURED]` run in
  isolation, all 34 `subs-*.tsv` yield 53 edits on the 13 and every `subs-tense-*` (7 sets) and
  `subs-should-*` (4 sets) yields **0**. But run **sequentially with `--apply`**, the way a real batch
  runs, they deliver **31 edits across 6 files for zero authoring effort** (the isolated sum
  double-counts: `directional-reference` 6→0, all four `via` sets 4→0). Run the existing sets first,
  then author batch-10 rows for the residue. The draft's "the sets don't fire" was overstated.

- **D-02:** The real worklist is **≈244**, not `prose_all.py`'s 324. `[MEASURED]` **80 of the 106**
  lowercase `admin` hits are `admin center`, exempted by sweep3's own built-in rule
  (`sweep3.py:22`, `(?<![\w-])admin(?!\s+center)(?![\w-])`). Actionable admin-class is ≈74, not 154.
  `etc.` (4, batch-1 KEEP) and `quick` (1, batch-8 KEEP) also deduct.

- **D-03:** `prose.py` / `prose_all.py` output is a starting worklist, **never** an authoritative one.
  `[MEASURED]` it omits four of sweep3's guards — `KEEP_LINE`, the exact pin check, the C17 #12
  200-char cap, and the leading-`<!--` frontmatter handling — so its "if it shows up here, sweep3 can
  edit it" guarantee is false: **48 of the 324** hits sit on lines containing a `_CONTENT-PINS.txt`
  literal and **46** sit inside blockquotes subject to the cap.

- **D-04:** Commits split by **edit kind**, not doc family. Phase 154's D-20 precedent split because
  three small hand-authored diffs were buried inside a 10,000-line machine diff — an asymmetry of
  *kind*. Four doc-family commits are all one kind and leave this phase's largest work item
  unassigned. The kinds are the mechanical sweep, the em-dash pass, the judge fixes plus their rule
  deletions, and the pin regeneration. Every commit needs a named gate; `LEFTOVERS: 0` over the 13 is
  true only after the last file, so it cannot be the per-commit gate, and D-21's conflict-marker gate
  is trivially green here (no merge) and does not cover the question.

- **D-05:** Order is fixed and the idempotency proof is mandatory. Sweeps → judge → **judge fix and
  the corresponding `subs-*.tsv` row deletion in the same commit** → re-run base plus every rule set
  over the 13 reporting **0 edits** → SC#4 measurement. Rule deletions are *derived from* the
  verdicts and cannot precede them. RESUME's hardest-won rule is that a revert with no corresponding
  rule change is not a fix — 20 rows across 6 files had to go after the original pass, and STYLE-03
  mandates the deletion independently. The draft stated this order backwards and never used the word
  idempotency, which RESUME records as a gate line.

- **D-06:** The `Sure Admin` guard is proven live, and its recorded detector is **replaced**.
  `[MEASURED, perturb-and-restore]` `subs-admin-batch9.tsv` row 26 as shipped, against the HP file —
  **0 files, 0 edits**. With `(?<!Sure )` stripped — **20 edits**, exactly D-23's prediction, five
  inside `**Source:**` citation titles whose URLs still read `sure-admin`. Run that perturbation once
  as a non-vacuity proof. **The detector D-23 recorded is vacuous**: `grep -c "Sure Administrator"
  docs/` without `-r` errors `Is a directory`, prints `0` and exits 2 — it can never fail. Use
  `grep -rc`. Counts are **35** corpus-wide and **25** in the HP file (occurrences, not the 34/24 line
  counts the draft carried). D-23's strongest limb is link breakage, not a typo: `### Sure Admin` owns
  a glossary heading and the `#sure-admin` anchor at `docs/_glossary.md:193`.

- **D-07:** `[PILOT]` in RE-237 is **28**, not 27. `[MEASURED]` 27 was last true at `cbca7cfb`;
  `2fba8fc5` added the 28th. The draft inherited 27 from Phase 155's SUMMARY instead of measuring at
  HEAD — this repository's own *a written audit log is not evidence* failure, committed inside a
  document whose header claimed every row was executed at HEAD. Assert **28**, and state plainly that
  nothing mechanical enforces it: the label is a paragraph at
  `.claude/skills/google-style-verify/SKILL.md:119`, correctly on the protected-signal list, with no
  validator and no `check.py` rule behind it.

- **D-08:** **`_CONTENT-PINS.txt` protects almost nothing in the 13, and the pin differ is not the
  detector this phase needs.** `[MEASURED]` `pins2.py:41-42` reads validators from the **live** repo
  but the corpus from `D:/claude/docs-google-style-test` — the **scratch** repo, which forked before
  every v1.21 document existed. Regenerated against live `docs/` the pin count is **685**, not 562. Of
  **117** validator literals present in the 13, only **39 are pinned**; **78 are not**, owned by
  `check-phase-149` (23), `-148` (22), `-150` (19), `-151` (8), `-152` (4), `-135` (4), `-136` (3),
  `-50` (3), `-147` (2), `-67` (2), `-146` (1) and `check-nav-hub-links` (1). The same root cause makes
  RESUME's standing audit #2 **vacuous in this repository** — it regenerates from the scratch corpus
  and compares to itself, reporting 0 lost whatever happens to `docs/`. Phase 154's D-31 bars running
  `pins2.py` **in that phase** and for the same reason; it does not bind Phase 156, which is the phase
  that needs the live-corpus pins. Whether to regenerate `_CONTENT-PINS.txt` or to add a separate
  live-corpus literal check beside it is Claude's discretion, but the phase must not proceed on the
  claim that the exact pin check protects the mechanical pass.
  — **Reversibility:** costly — STYLE-06 asserts a 562-pin invariant in every recorded invocation,
  so a regenerated file changes a number the D-27 amendment and both gate baselines quote.

- **D-09:** The armed landmine is a **named, reproducible instance**, not a hypothetical.
  `[MEASURED]` `check-phase-151.mjs:173` hard-requires the verbatim sentence
  `Four of the nine mechanisms below have no rollback path at all`. It sits in **editable prose** at
  `docs/recipes/05-enterprise-update-plan.md:798`, it **contains `below`** — one of batch 10's own 93
  directional targets, so the phase is *obliged* to rewrite it — and `grep -cF` against
  `_CONTENT-PINS.txt` returns **0**. The exact pin check cannot fire on an unpinned literal, the pin
  differ never sees it lost, and apex `check-phase-153` chains 151. Same shape, spot-verified:
  `Dell wants a virgin BIOS; Lenovo needs a provisioned one` (`check-phase-150`, present at
  `docs/operations/firmware-bios/00-overview.md:140`, unpinned).

- **D-10:** **NEGATIVE assertions are structurally invisible to the pin differ** and must be re-run
  directly. A pin detects a *lost* literal, never an *introduced* one. Live negatives over the 13:
  `V-149-BARREDPHRASINGS` (`check-phase-149.mjs:216-238`) requires `/\bthe six(?!-)\b/i` and
  `/most business OEMs/i` to be **absent** from `00-overview.md` and `01-windows-dfci.md` — a
  word-list or directional rewrite producing "the six OEMs" hard-fails the apex. Also
  `V-151-ROLLBACK` (default-channel absence), `V-148-LIMITATIONS` (eight limitations, count **derived
  from the document**, so a merged or split bullet changes it) and `V-150-MATRIX` (the silence-cell
  count relationship). Re-run 145-152 after every batch-10 commit.

- **D-11:** `V-135-*` has **six** surviving content assertions, not five. `[MEASURED]`
  `V-135-RECIPE` is still live at `check-phase-135.mjs:73` — only its `EXPECTED_LINE_COUNT = 328` was
  retired in Phase 155 — and now asserts existence, non-emptiness, the verbatim H1
  `# Windows 11 Multi-App Kiosk: Assigned Access Provisioning`, and
  `./Vendor/MSFT/AssignedAccess/Configuration`. Also unlisted by the draft and both exact-count
  equalities on a batch-10 document: `EXPECTED_ANTIFEATURE_ROWS = 12` and the 3-row namespace table.

- **D-12:** The three unmentioned standing post-batch audits are in scope. RESUME names **four** that
  must all come back empty; the draft named one. Missing are frontmatter drift, HTML-comment span
  drift, and the inline `"..."` quotation audit. The vector is live: `[MEASURED]` **13 of 13** batch-10
  documents carry `audience: admin` and **6 of 13** carry `owner: Intune Admin Lead` — a capitalised
  `Admin` inside a frontmatter value — against an admin class that is the largest rule family in the
  batch. RESUME records this bug shipping twice, in 20 reference docs and again one file-shape later
  in batch 8. Verified clear: none of the 13 opens with a leading HTML comment, so the batch-8 blind
  spot is not live here — record that as checked, not as covered.

- **D-13:** Every recorded command uses **Windows-style paths**. `[MEASURED]`
  `python sweep3.py /tmp/b10 …` reproduces correctly in Git Bash but in **PowerShell** — this
  project's primary shell — reports `DRY RUN -- 0 files … 0 TOTAL edits` and **exits 0**. `prose.py`'s
  own docstring carries the sibling warning. A downstream planner replaying an MSYS path gets a
  vacuous green in a phase whose whole theme is non-vacuity proofs.

### Area B — Judge geometry and the verdict record

- **D-14:** The judge dispatches from an ordinary `<task type="auto">` as a fresh
  **`claude -p` process**. `[MEASURED]` `timeout 120 claude -p "Reply with exactly: PONG"
  --output-format text </dev/null` returns `PONG`, exit 0; `claude.exe` v2.1.260 is on PATH; and
  `gsd-executor`'s tool grant includes `Bash`. This repository's independence mechanism has always
  been a fresh **process**, not a fresh agent type — 112-04's Axis 1/3 is `git clone` plus a clean
  PowerShell session. The blocker is therefore not structural, and this moots the whole
  `general-purpose`-versus-anti-pattern-#10 question: the project `CLAUDE.md` reaches every subagent
  type identically, so no `subagent_type` choice ever bought a contamination advantage.

- **D-15:** **No `checkpoint:human-action`.** `gsd-executor` genuinely has no `Agent` tool (verified
  across all 35 agents; only `gsd-debug-session-manager` has one), but the correct response is D-14,
  not a checkpoint. `checkpoints.md:227-247` restricts `human-action` to work with **no CLI or API**,
  and `planner-antipatterns.md:15-25` makes using it for automatable work the **first** listed
  anti-pattern — *"if Claude CAN automate it, Claude MUST automate it."* Both precedents the draft
  cited fail: `112-04-PLAN.md:100` is `checkpoint:human-verify` running a fresh shell, and
  `155-03-PLAN.md:156` is a genuine owner-artifact gate. Note also that the two governing workflows
  disagree on what follows a checkpoint (`execute-plan.md:112` routes to MAIN,
  `execute-phase.md:1124` spawns a continuation executor, itself without `Agent`), which is a second
  reason not to build on that mechanism.

- **D-16:** `judge-packets.py` needs a **walk-root filter**, not a path-join fix, plus two guards.
  `[MEASURED]` invoked the natural way it is a silent false-green: `judge-packets.py 8de413aa docs
  --chunk-file … --chunks 4` → **0 hunks / 0 files, exit 0**, while `… . …` → **386 hunks / 167
  files**. Root cause: `git diff --name-only` returns repo-root-relative paths regardless of `cwd`
  (351 of them, including `.claude/` and `.planning/`), so there is **no docs scoping at all** — fixing
  only the `root / f` join still emits `.planning/*.md`, proven by `.planning/REQUIREMENTS.md`
  appearing in the working invocation. Fault isolated: `git_show` is correct from any cwd; only
  `p.exists()` fails. Two further defects: `changed_files()` never inspects `returncode`
  (`:40-43`), so a typo'd BASE or non-repo cwd is a third vacuous-green channel; and `--chunks N`
  pre-allocates bins (`:118-127`) with **no empty-bin guard**, so a judge can be dispatched on `[]`
  while a global "packets > 0" assertion passes. Commit the tool edit separately from any corpus
  edit — the same shape D-31 applied to `verify2.py`, which argv-ified **only BASE**, not the walk
  root.

- **D-17:** The judge BASE is the SHA **immediately before the first batch-10 document commit**, and
  the run requires a clean tree. This is the *structural* mechanism that keeps the 406 out of range —
  a filter would be second best. Two corrections to the draft's rationale. `[MEASURED]` at the
  pre-merge BASE, **383** of the 406 re-emit, **3** emitted hunks were never in the 406, and **23** of
  the 406 do not re-emit — "386 of them" was wrong in both directions, and one emitted hunk is
  `.planning/REQUIREMENTS.md`, so the worklist is not even a subset of the judged corpus. And
  "this phase's own starting HEAD" is ambiguous: under the earlier reading the phase's own planning
  commits enter the worklist, which is not hypothetical, because planning files demonstrably emit
  hunks.

- **D-18:** Chunking is derived from the **real** modal population and carries an empty-bin guard.
  `[MEASURED]` the editable-prose modal subset is **114** under judge-packets' own 8-modal regex and
  **102** under the skill's stated 5-modal set — not the draft's 52, which silently dropped `must`.
  `must` alone is **50**, and it is precisely the class the measured 26-STRENGTHENED-versus-19-INVERTED
  bias turns on. Whatever `--chunks` value is chosen must be justified against
  `.claude/skills/google-style-verify/SKILL.md:99`, whose committed literal is `--chunks 10`, because
  VERIFY-02 requires "the same section-3 decision procedure". `--chunks N` bins by file and never
  splits a document, so SC#2's "one judge reads a whole document" holds at any N.

- **D-19:** The judge prompt is **committed and dispatched from the same bytes**. A committed
  `156-JUDGE-PROMPT.md` that is retyped into the dispatch is exactly the written audit log the record
  warns against — the draft grounded the artifact on that lesson and then reproduced it. Under D-14
  the dispatch reads the file, so the binding is mechanical. The blocklist must be **extended** beyond
  RESUME's four items (itself the one document this phase marks untrusted, and the only place the list
  exists): add `_JUDGE-VERDICTS.json`, which carries every rationale *and* a full replacement line per
  finding, `_DISPOSITIONS*.tsv`, and this phase's own CONTEXT, PLAN and SUMMARY files. Record the
  VERIFY-03 out-of-task findings with file and line in `156-JUDGE-FINDINGS.md`, with an **explicit
  empty statement** if there are none — an absent file is not evidence of an empty list.

- **D-20:** The verdict record is a **sibling** `_JUDGE-VERDICTS-batch10.json`, leaving
  `_JUDGE-VERDICTS.json` byte-identical — but this is the phase's one genuine close call and the
  Referee left it as an owner call. Against the sibling: SC#2's text reads "verdict-record key count
  = 406 + batch-10 hunk count", a singular record, and a two-file sum needs an interpretive argument;
  `[MEASURED]` a per-entry `baseline` field on the **new** rows only would keep the 406 byte-unchanged
  (they carry no such field), `(file, baseline_line)` is **unique across all 406** so the key shape is
  sound, only **2 of 406** rows fall inside the 13, and **nothing reads `_JUDGE-VERDICTS.json`
  programmatically** — no script, no validator, no CI — so there is no mechanical argument either way.
  D-28's `_DISPOSITIONS-docs.tsv` precedent is **dis-analogous**: `--dispositions` takes exactly one
  path, so that sibling was tool-forced. For the sibling: the existing top-level `"baseline":
  "c97d322"` is wrong for batch-10 rows, the 406 `file` keys are scratch-root-relative while
  batch-10's are `docs/`-prefixed, and "byte-unchanged" is provable by `git diff --exit-code` rather
  than argued.

- **D-21:** `verify-meaning.py` cannot be path-scoped and **the clean-tree remedy does not work**.
  `[MEASURED]` its argv parse (`:313-346`) accepts only BASE, `--dispositions`, `--json` and
  `--self-test`. Phase 154 already ran it on a clean tree (`docsUntouched.exitCode = 0`) and **still**
  got 3 non-`docs/` findings, because a *committed* close-out commit (`9086c705`) sat inside the diff
  range — recorded at `154-03-SUMMARY.md:36` and logged as `.planning/WINDOWS.md` row 10, still
  **open**, reading *"VERIFY-01/D-28's assumption that no planning file is in range is falsified."*
  The draft re-adopted the falsified assumption without citing the record that killed it. The split is
  `STATE.md` (2) + **`WINDOWS.md`** (1) — and `WINDOWS.md` is the file a phase writes on every
  deviation, so it will be dirty again. Also: `_DISPOSITIONS-docs.tsv` is frozen at exactly 6 rows by
  a deliberate Phase 154 contract (`reasonsByteIdenticalToOriginal = true`), so batch-10 findings must
  not simply be appended to it.

### Area C — The em-dash canon on the 13

- **D-22:** The direction is **confirmed and positively supported**, and the pass is in scope.
  `[MEASURED]` under sweep3's own predicates there are **43** editable-prose spaced em dashes outside
  the 13 across 16 files — not the ~146 across 63 files an early classifier reported — against 4,373
  tight corpus-wide. **91% of the corpus's editable spaced dashes live inside the 13.** Tight is the
  landed canon, and normalizing the 13 removes an asymmetry rather than creating one. The rule is
  real, not an inherited convention: `references/dashes.md` says *"Don't put a space before or after
  it"*, `check.py:34` implements `em-dash-spaced`, and `REQUIREMENTS.md:31` (STYLE-05) says prose
  carries the tight dash while headings keep the spaced one. **Phase 157 SC#2 does not bind this
  phase** — it excludes the em-dash rule from a *mechanical gate* over the slice of `check.py` that can
  report zero, because check.py counts protected instances that can never reach zero. Excluding a rule
  from a gate is not a ruling that prose stays spaced.

- **D-23:** The count is **447**, not 434, and the mechanism is a **3-row TSV through the unmodified
  committed `sweep3.py`** — not a bespoke script. `[MEASURED]` `\s+—\s+` 434 + `\s+—` 9 + `—\s+` 4 =
  **447**, protecting 304 table row, 166 cited verbatim quotation and 3 heading line. The draft
  rejected the TSV on a misreading: the load-time guard is `pat.endswith(" ")`, a **literal space**
  test, and `\s+—\s+` ends in `+`, so it loads cleanly. The TSV route buys `quoted_lines()`, the
  `PROTECT` mask, the exact pin check, the C17 #12 cap and the frontmatter skip **for free** — the
  five guards the draft's hand-rolled classifier silently dropped, which is why nine of its thirteen
  per-file rows were wrong. Three consequences of using the real tool: the 3 frontmatter `applies_to:`
  values and the 1 inline-code span are **not** edited (verified byte-identical after `--apply` on a
  scratch copy), and the 72 table-row dashes stay protected — including 5 genuine lone `| — |` N/A
  cells at `08-windows-app-updates.md:61,64,65` and `licensing-matrix.md:101,102`, each of which *is*
  spaced. The validator count content-matching that placeholder is **11**, not ten.

- **D-24:** The draft's "no tool will do this" is **false**, and so was its framing of the effort.
  `[MEASURED]` scratch commit `306b974` — *"mechanical v2: prose em dashes + Latin abbrevs,
  headings/tables/pins protected"* — changed **262 files, 4,281 insertions / 4,281 deletions** and took
  the corpus from 21 tight / 6,542 spaced-side to 4,387 / 2,057. A mechanical em-dash sweep already ran
  once; `do_em = False` at `sweep3.py:212` is a post-hoc lock on the arm that did it, and the "never
  executed in any batch" claim was unprovable anyway from a single vendored snapshot. So this is one
  command plus a dry-run diff plus a review — **not 434 adjudications**, and not the likely owner "no"
  the draft billed it as.

- **D-25:** The genuinely adjudicable residue is **~34 sites**, enumerated. `[MEASURED]` **19** sit at
  a soft line break (9 end a line, 10 begin one) where tightening leaves the *rendered* markdown
  reading `…else— firmware…` — `check.py` is per-line and goes green while the document still violates
  the rule. **6** would delete list-continuation indentation (`\s+—` matched at column 0); none
  currently follows a blank line, so CommonMark lazy continuation saves the render, one blank line
  away from a structural break. **9** produce run-in description lists that `dashes.md` still rejects
  in tight form (`- **Reversible**—the choice…`, `- **Dell fleet**—Intune holds…`); its "Colons instead
  of dashes in description lists" section marks exactly that shape as bad.

- **D-26:** The judge applier carries a **per-hunk em-dash count guard**. RESUME records two judge
  fixes silently reverting the em-dash canon, and `verify-meaning.py:73`'s `mech_canon()` is
  `re.sub(r"\s*—\s*", "—", s)` — it canonicalises em-dash spacing **away**, by design, so the canon is
  invisible to the quotation and label-drift detectors. The count guard is the only detector, and this
  phase raises em-dash density in these files to 100% of prose instances. Em-dash-only edits do not
  pollute the judge worklist (modal-bag equality, `judge-packets.py:83-85`), so the two passes do not
  interfere in that direction.

- **D-27:** The en-dash scope gap is recorded as a handoff, not fixed silently. `[MEASURED]`
  `dashes.md` says of en dashes *"Don't use."*; the 13 contain **14 en dashes** and 1 spaced ASCII
  `--`, none in this pass's scope and none visible to `check.py`'s `\s—|—\s`. The **43** editable
  spaced dashes outside the 13 are likewise out of scope here. Both go to Phase 157 or the backlog with
  their measurements, so a later phase does not rediscover them as a surprise.

### Area D — The before/after gate artifact

- **D-28:** `156-GATE-BASELINE.json` mirrors 154's structure, embeds Phase 154's before-values
  verbatim for a self-contained side-by-side, **and** carries a `source_sha` plus a content hash of
  the block it copied, with a re-derivation step. `[MEASURED]` nothing reads `154-GATE-BASELINE.json`
  programmatically — `grep -rl` across `scripts/`, `.github/` and every `.mjs`/`.py`/`.yml` returns
  nothing — so an embedded copy going stale would be detected by nothing, and the staleness class is
  not hypothetical: that file's own `anchor_note` records `sha` being re-pointed
  `789a348a → 8de413aa` **after** its components were measured.

- **D-29:** The `154-GATE-BASELINE.json` path is **resolved**, never hardcoded, by a two-candidate
  glob — `.planning/phases/154-*/` then `.planning/milestones/v1.22-phases/154-*/` — failing loud on 0
  or more than 1 match, never a silent null. At Phase 156's runtime only the first candidate exists, so
  the archived arm ships **untested** unless the plan exercises it deliberately, which is precisely
  Phase 134's recorded failure.

- **D-30:** The `verify2.py` BASE **stands as `789a348a`**, cited by its JSON path
  (`components.verify2.base`) rather than as a bare hex string. `[MEASURED]` that is the value Phase
  154 actually used in both its baseline and its landing invocation, and
  `789a348a^{tree}:docs == 8de413aa^{tree}:docs == 2a275d9a…`, so the two are functionally identical
  for a tool that reads only `docs/`. Cite the path because the JSON's top-level `sha` now reads
  `8de413aa` and a planner reading the `anchor_note` would otherwise "correct" the BASE. Add the
  clean-tree precondition the draft stated only for `verify-meaning.py`: `verify2.py:47` reads the
  **working tree**, so an uncommitted `docs/` edit silently enters the SC#4 measurement, and `:42`
  hardcodes `Path('docs')` — D-31 argv-ified only BASE.

- **D-31:** The claim that the merge and Phase 155 introduced **zero structural drift is dropped**.
  `[MEASURED]` at HEAD, `verify2.py 789a348a` reports Part A `6070 / 3462 / 2608` against Phase 154's
  recorded `6119 / 3493 / 2626`, and Part B `resolved OK` **6271 → 6304**, with six new
  `LINE COUNT DIFFERS` entries. Only the narrow `INTRODUCED 0` — the actual gate signal — survives, and
  that is what SC#4 should assert. The draft asserted the broad claim under a `[MEASURED]` header over
  a table whose own two rows read "to re-measure".

- **D-32:** **The residual target is not zero, and no requirement asks for zero.** `[MEASURED]` the
  10th and last site is `docs/operations/patch-management/08-windows-app-updates.md:266`, token class
  `desired`, sitting inside a verbatim Microsoft quotation — *"the desired state of the development
  environment on your Windows machine,"* — which `quoted_lines()` cannot protect because it recognises
  only blockquotes. All three escapes are blocked: editing it fabricates a citation, the exact defect
  class VERIFY-02 exists to catch; pinning it moves the pin count 562 → 563, a changed before/after
  value; and a `KEEP_LINE` entry contradicts D-26's "sweep3.py unchanged" assertion. VERIFY-01 is
  already Complete and D-16 rescoped it to the **landed set**. State the target as an enumerated,
  dispositioned residual with this site named and adjudicated, not as a bare 0. Full site list —
  `01-windows-dfci.md:109` admin · `02-dell-bios-configuration.md:85` admin ·
  **`08-windows-app-updates.md:266` desired (CITATION)** · `05-enterprise-update-plan.md:158/182/189/254`
  admin · `05-enterprise-update-plan.md:232` admins · `06-walk-up-avd-kiosk-autologon.md:19` sign-into ·
  **`06-walk-up-avd-kiosk-autologon.md:81` admin (the new one)**.

- **D-33:** The residual moved 9 → 10 for a reason worth carrying forward. `[MEASURED]` the new edit
  is in RE-237 at `06-walk-up-avd-kiosk-autologon.md:81` and entered at `9ce464a9`, a
  **verification-gap-closure commit landed after** `43df3d63 docs(phase-155): complete phase
  execution` — not from RCP content prose, since 155's content plans all held RE-237 at exactly 1.
  The transferable lesson is that **a phase's own remediation commits move the residual after the
  phase reports complete**, which is why this phase re-measures rather than inheriting.

- **D-34:** **No planning-document amendment is required**, and the draft's conclusion here survives
  review — but for corrected reasons. SC#1's `--no-headings` and `_CONTENT-PINS.txt` are two
  **milestone-wide constraints** owned by STYLE-04 and STYLE-06 respectively, named in one breath as
  the rest of the milestone names them, not one tool's argv; Phase 154 hit the identical looseness and
  resolved it with a recorded correction note
  (`154-GATE-BASELINE.json` → `landing.style_04_05.style04_correction.note`), which is the precedent to
  follow. VERIFY-04's "before **and** after … at the same commit on both sides" cannot mean one commit
  for both halves without contradicting itself in the same sentence; the coherent reading is all five
  components at one commit **per side** on a clean tree, which Phase 154 did and Phase 156 repeats
  later. The five components are C17, the apex, the nav-hub link checker, the link differ and the pin
  differ — the mechanical residual is **not** among them, so D-32's trajectory raises no VERIFY-04
  question.

- **D-35:** Carry the `--no-headings` correction forward, not the error. `sweep3.py`'s argv parse
  recognises only `--subs` and `--apply` and **silently discards** everything else, and it skips
  headings unconditionally regardless — so `--no-headings` passed to `sweep3.py` is a no-op that
  Phase 154 already convicted (D-25) and recorded. The flag belongs to `check.py`.

- **D-36:** Name **all three** corpus-wide negative walkers plus the amendment-sensitive one, and
  treat them as landmines rather than coverage. `[MEASURED]` identical `const roots = ['docs',
  '.planning']` at `check-phase-54.mjs:457`, `check-phase-55.mjs:465` and `check-phase-56.mjs:462` →
  `V-54-27`, `V-55-27`, `V-56-28`, all asserting **zero** bare `> **Platform:**` tokens corpus-wide,
  and all three are apex-chain members — a trip in any one takes the apex to 110/1/0 and breaks this
  phase's own after-measurement. The risk is live: `.planning/milestones/v1.5-phases/54-…/54-PATTERNS.md:702`
  already contains the token and passes **only** because a prior phase fenced it. Guardrail — any
  quotation of that token in a Phase 156 artifact must sit inside a fence or backticks. `V-54-21`
  (`check-phase-54.mjs:346-358`, negative on `05-compliance-policy.md` references in both planning
  documents) is the one an amendment could trip. `156-GATE-BASELINE.json` is `.json` and is never
  walked.

- **D-37:** Phase 156 owes itself the symmetry Phase 158 SC#3 owes Phase 157. The judge fixes and the
  em-dash pass write **new prose into documents this phase has already dispositioned**, after the
  mechanical pass, and SC#4 is a structural gate that cannot see it. The re-sweep in D-05's step 4 is
  what closes this; without it the phase ships the same unstyled-patch defect it exists to prevent.

### Claude's Discretion

- Whether D-08's live-corpus pin coverage lands as a regenerated `_CONTENT-PINS.txt`, an argv-ified
  `pins2.py`, or a separate literal-coverage check beside the existing file — provided the phase does
  not proceed on the false claim that the current pin file protects the 13, and provided STYLE-06's
  562-pin invariant is either preserved or amended deliberately rather than silently.
- The exact `--chunks` value, provided it is justified against the skill's committed `--chunks 10`,
  derived from the real 114/102 modal subset rather than 52, and paired with an empty-bin guard.
- Exact JSON key names and nesting inside `156-GATE-BASELINE.json`, provided the before and after
  blocks stay separable and the embedded 154 values carry `source_sha` and a content hash.
- Commit message wording throughout, and whether the `judge-packets.py` fix rides with the tooling
  commit or its own, provided it is separable from every corpus edit.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Governing planning documents
- `.planning/ROADMAP.md` — Phase 156 goal and SC#1-SC#4; Phases 157-159 which depend on this work.
- `.planning/REQUIREMENTS.md` — STYLE-02 (with its D-17 amendment), VERIFY-02, VERIFY-03, VERIFY-04
  verbatim, plus STYLE-04/05/06 as the milestone-wide invocation constraints.
- `.planning/STATE.md` — the LOCKED named decisions, the D-00a exception, and the Phase 156 forward
  note on RE-224's unpinned line count.
- `.planning/WINDOWS.md` — **row 10, still open**: VERIFY-01/D-28's no-planning-file-in-range
  assumption is falsified. D-21 depends on this.

### The pass, its record and its tooling
- `scripts/docs-style/RESUME.md` — **treat as untrusted**; it carries documented false claims and is
  the only source of the judge blocklist. Its `:430` standing-audit stanza and `:93-95` rule-change
  lesson are load-bearing for D-05 and D-12.
- `scripts/docs-style/sweep3.py` — `:22` the `admin center` exemption (D-02), `:89` the em-dash
  substitution, `:154-158` the comment-aware frontmatter skip, `:199-215` the skip loop and
  `do_em = False` at `:212`, `:242-249` the argv parse, `:259-260` the literal-space load guard (D-23).
- `scripts/docs-style/judge-packets.py` — `:26` the 8-modal regex, `:40-43` `changed_files()` with the
  unchecked returncode, `:70-79` the alignment, `:83-85` the modal-bag drop, `:118-127` the binning.
- `scripts/docs-style/verify-meaning.py` — `:73` `mech_canon()`, `:313-346` the argv parse with no
  path scoping.
- `scripts/docs-style/verify2.py` — `:27` argv BASE, `:42` the hardcoded `Path('docs')`, `:47` the
  worktree read, `slug()` and its double-hyphen note.
- `scripts/docs-style/pins2.py` — `:41-42`, the live-validators / scratch-corpus split behind D-08.
- `scripts/docs-style/_CONTENT-PINS.txt` (562) and `_EMDASH-PINS.txt` (8) — never interchangeable.
- `scripts/docs-style/_JUDGE-VERDICTS.json` — the 406, `baseline` `c97d322`, scratch-root-relative
  keys, `(file, baseline_line)` unique.
- `scripts/docs-style/_DISPOSITIONS-docs.tsv` — frozen at exactly 6 rows by Phase 154 contract.
- `scripts/docs-style/subs-admin-batch9.tsv` — line 26 / data row 2, D-06's perturbation site.
- `.claude/skills/google-style-verify/SKILL.md` — §3 the decision procedure, `:99` the committed
  `--chunks 10`, `:119` the `[PILOT]` protected signal.
- `.claude/skills/google-style/check.py` — `:34` `em-dash-spaced`, `:138-141` the argv surface.
- `.claude/skills/google-style/references/dashes.md` — the tight-dash rule, the en-dash prohibition,
  and the description-list section behind D-25.

### Validators over the 13
- `scripts/validation/check-phase-151.mjs:173` — D-09's armed landmine.
- `scripts/validation/check-phase-149.mjs:216-238` — `V-149-BARREDPHRASINGS`, D-10's negative.
- `scripts/validation/check-phase-148.mjs`, `-150.mjs`, `-152.mjs` — the derived-count and
  silence-cell assertions.
- `scripts/validation/check-phase-135.mjs:73` — `V-135-RECIPE`, live with three needles (D-11).
- `scripts/validation/check-phase-54.mjs:457`, `-55.mjs:465`, `-56.mjs:462` — the three negative
  walkers; `check-phase-54.mjs:30-31` and `:346-358` for D-36.
- `scripts/validation/c17-eee-contract.mjs` — `:258-268` assertion #5's 30-word minimum,
  `#12`'s 200-char cap.
- `scripts/validation/check-phase-153.mjs` — the apex on both sides; `:81-84` the chain-membership rule.

### Precedent and prior phases
- `.planning/phases/154-…/154-CONTEXT.md` — D-16, D-17, D-20, D-21, D-23, D-25, D-26, D-28, D-31.
- `.planning/phases/154-…/154-GATE-BASELINE.json` — the before-half, the `anchor_note`, and
  `landing.style_04_05.style04_correction.note` (D-34/D-35).
- `.planning/phases/154-…/154-03-SUMMARY.md:36` — the clean-tree/committed-commit finding (D-21).
- `.planning/phases/155-…/155-CONTEXT.md` — **D-52** at `:533` is the validator-deferral decision;
  `:21` mis-cites it as D-31.
- `.planning/phases/155-…/155-05-SUMMARY.md:303-306` — the both-directions Phase 156 handoff.
- `~/.claude/gsd-core/references/checkpoints.md:227-247` and
  `~/.claude/gsd-core/references/planner-antipatterns.md:15-25` — D-15.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **The committed `sweep3.py` is the em-dash engine.** A 3-row TSV through it, unmodified, delivers
  all five protective guards the phase would otherwise hand-roll and get wrong.
- **`claude -p` from `Bash`** is the judge dispatch, and matches this repo's fresh-process
  independence precedent rather than inventing a new mechanism.
- **`judge-packets.py --chunks N` bins by file** and never splits a document, so SC#2's whole-document
  requirement holds at any N.
- **The existing 34 `subs-*.tsv`** are worth 31 free edits when run sequentially, and batch 9's
  two-row negative-context idiom is the reference shape for the admin class.

### Established Patterns
- Annotate-and-supersede for planning-document amendments; a recorded **correction note** inside the
  gate baseline where the defect is a naming looseness rather than a criterion error (Phase 154).
- Generated JSON measurement artifacts under the phase directory, resolved not hardcoded.
- Perturb-and-restore as the standard non-vacuity proof for a guard (Phases 154, 155, and D-06 here).

### Integration Points
- Apex `check-phase-153` chains 145-152 as hard members, so every batch-10 document sits under a
  chained validator; the apex is the same on both sides of the before/after comparison.
- `check-phase-54/55/56` walk `.planning/` recursively, so this phase's own artifacts are inside a
  validator's reach.
- `.planning/phases/` relocates at milestone close, so D-29's resolver exists for Phases 158 and 159.

</code_context>

<specifics>
## Specific Ideas

- **The structural gate cannot see this phase's core risk, and this time the pin differ cannot
  either.** Phase 154 learned that C17 reports 237 files and 0 violations on a tree carrying live
  conflict markers. Phase 156 adds a sharper case: `_CONTENT-PINS.txt` was built by intersecting live
  validator literals with the **scratch** corpus, so for exactly the 9 documents batch 10 exists for,
  the pin differ protects 39 of 117 literals — and it is structurally blind to introduced strings, which
  is the shape `V-149-BARREDPHRASINGS` actually asserts.
- **Every wrong number in this discussion came from reading a tool instead of running it.** The
  em-dash classification, the modal subset, the `[PILOT]` count, the `Ask the admin` protection claim
  and the `Sure Administrator` detector were each a plausible inference that a single command
  falsified. The committed tool is the measurement; a hand-rolled reimplementation of it is a new
  defect surface. Phase 154 recorded the same lesson from four falsified measurements; this phase
  produced six.
- **A guard is only as good as its detector.** The `Sure Admin` fix is genuinely correct and genuinely
  load-bearing — and the detector recorded alongside it can never fail. Assert detectors by proving
  they fire, not by observing that they pass.

</specifics>

<deferred>
## Deferred Ideas

- **The 43 editable spaced em dashes outside the 13**, across 16 files, and the **14 en dashes plus
  1 spaced ASCII `--`** inside the 13. → Phase 157 or backlog, with these measurements attached.
- **A merge-marker / conflict gate as a standing validator** — carried from Phase 155; still no
  validator covers it.
- **`pins2.py` cross-repo geometry rework** beyond whatever D-08 does minimally, and the same for
  `verify2.py` beyond D-31's two-line edit. → Phase 157 or later.
- **`judge-packets.py` alignment quality** — `difflib` greedy per-line `max(ratio)` with no
  consumption produces many-to-one pairings, so denser edits raise the mispairing rate and can attach
  a wrong `after` line to a hunk. Not blocking at batch-10 density. → backlog.
- **A corpus-wide evidence-label taxonomy** (`[SOURCED]`/`[ASSUMED]`/`[UNVERIFIED]`/`[PILOT]`) defined
  in one place — carried from Phase 155. → Phase 157.
- **`V-132-HUBSNOTWIRED` / `V-137-HUBSNOTWIRED` regex repair** — carried from Phase 155.
- **`.gitattributes` `* text=auto eol=lf`** — already deferred to Phase 159 by Phase 154.
- **`docs/index.md` and `docs/_registry/RE-index.md`** were also touched by Phase 155 and sit outside
  the 13, so nothing in this milestone re-styles them. Measured impact nil — 4 added lines, zero em
  dashes, modals, admin or directional hits — so this is recorded, not acted on.
- **The Phase 157 handoff contract** — which classes are permanent gate exclusions and why, including
  the em-dash rule's real reason (check.py counts protected instances that can never reach zero).

</deferred>

---

*Phase: 156-style-extension-full-landing-verification*
*Context gathered: 2026-09-04*
