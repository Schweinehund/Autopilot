# Phase 145: Corpus Correction, Validator Gate & Archival-Drift Fix - Context

**Gathered:** 2026-08-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Twelve enumerated corrections (FIX-01..FIX-12) land across the five
`docs/operations/patch-management/` documents plus four collateral files, each corrected claim
carrying a per-claim evidence line; and the two validator-level traps that would silently redden
v1.21 — the `.planning/` link that re-breaks at archival, and `check-phase-59`'s live ops-index
row-count equality — are disarmed before any new content lands.

**Not this phase:** authoring new guides (146–151), the ops-index row growth itself (152), the
harness close (153). This phase only corrects what exists and unblocks what follows.

</domain>

<decisions>
## Implementation Decisions

All decisions below were produced by `/grill-me` (26 sub-questions expanded from 8 selected gray
areas, 6 dissolved on measurement) then adjudicated by `/adversarial-review` (4 parallel Finders →
Adversary → Referee; 91 raw findings, 68 deduplicated, 12 disproved). Verdicts against the draft
picks: **7 UPHOLD, 22 AMEND, 3 REVERSE**, plus 8 areas the original 8 never covered.

Every `[MEASURED]` figure here was executed at HEAD `358e5ad4` and independently re-run by a
verification agent. Figures the review corrected are marked `[CORRECTED]`.

### Evidence lines and freshness (FIX-10)

- **D-01:** Evidence lines use the convention that **already exists** in the corpus — a standalone
  `**Source:** [Article title](https://learn.microsoft.com/...) (updated YYYY-MM-DD)` line placed
  after the paragraph carrying the corrected claim. `[MEASURED]`
  `docs/admin-setup-macos/10-kerberos-sso-extension.md:156` is verbatim this shape; `[CITED` runs
  118 hits across 19 files. **Do not invent an inline parenthetical.** — **Reversibility:** costly —
  undoing means re-editing every corrected claim across five files.
- **D-02:** The URL is markdown-linked, not bare. `V-54-29` strips markdown links before banning
  `Hotpatch`/`VBS`/`MEETS_STRONG_INTEGRITY`, so a `Hotpatch`-bearing article title is safe in
  `00-overview.md` **only** in linked form.
- **D-03:** In `01-windows-wufb-rings.md` **only**, screen every URL for a bare `\bring(s)?\b` token
  and backtick the URL if one is present. `[MEASURED]` reproduced live — appending the canonical
  Learn URL `.../waas-deployment-rings-windows-updates` took `check-phase-54` from **32/0 to 31/1**
  with `V-54-11 FAIL`. `V-54-11` strips inline code but **not** link targets. The draft claim "a URL
  is free of validator risk" was inverted.
- **D-04:** "Dated after the event it describes" is read as **dated after the corpus assertion being
  corrected** — the source's `ms.date` must post-date the `last_verified` stamp under which the
  falsified claim shipped. **[OWNER-RULED 2026-08-19]** Three corrected claims describe *future*
  events (hotpatch May 2026, Android Oct 31 2026, Apple 27.0), for which no source can post-date the
  event; the literal reading is unsatisfiable. No requirement text is edited.
- **D-05:** One evidence line **per corrected claim**, scoped to the five patch-management documents
  only. Corrections landing in `co-management/03`, `admin-setup-ios/07` or the FIX-11 files carry no
  evidence line — FIX-10's own text scopes both granularity and file set.
- **D-06:** All five files get `review_by = last_verified + 60 days` computed by arithmetic.
  `last_verified` is stamped with the **actual execution date of the commit landing that file's
  corrections**, never 2026-08-19. Per-file, so a phase spanning two days breaks nothing.
- **D-07:** Evidence lines go **outside** the leading `> **Platform applicability:**` blockquote that
  opens all five files. `00-overview.md:10-19` carries the Apple OS 26 and October 31 2026 claims
  inside that blockquote, but as routing pointers — their evidence attaches to the body claims.

### Correction / attribution shape (FIX-05, FIX-07, FIX-08)

- **D-08:** One rhetorical shape across all three: corrected statement primary, superseded corpus
  assertion as a trailing subordinate clause, `**Source:**` line beneath. The superseded claim is
  **paraphrased and attributed to the corpus, never to Microsoft**.
- **D-09:** **Token obligations are per-file and are NOT uniform.** The draft's "nearly unconstrained
  by validators" was generalised from `V-54-12` alone across three requirements and four files, and
  is false for three of the five. Binding pins:
  - `02-macos-update-enforcement.md` — `V-54-15` opener line `> ⚠️ **Hard deadline (Apple OS 26):**`
    survives byte-identical (blockquote **body** is free text); `V-54-16` requires **≥5**
    `[HARD-DEADLINE` tokens — a count gate an attribution rewrite can break.
  - `04-android-patch-delivery.md` — `V-54-23` verbatim opener; `V-54-24` requires **≥4**
    `[HARD-DEADLINE` tokens.
  - `01-windows-wufb-rings.md` — `V-54-12`'s four literals survive **anywhere in the file**
    (`[MEASURED]` the tokens are tested against whole-file content, not the `## Hotpatch` region).
  - `00-overview.md` — `V-54-29` bars `Hotpatch`/`VBS`/`MEETS_STRONG_INTEGRITY` from **body prose**;
    table rows, fenced code, markdown links and inline code are all stripped first.
- **D-10:** Paraphrase carries a **verbatim-literal preservation list**. These must survive:
  `May 2026`, `VBS`, `default`, and (`opt-out` OR `April 2026`) in `01-windows-wufb-rings.md`;
  `Apple OS 26` in `02-macos`; `Oct 31 2026`/`October 31 2026`, `Android 13+`, `12-month`,
  `May 2025`, `September 30 2025` in `04-android`. Paraphrasing is precisely the operation that
  drops pinned literals.
- **D-11:** No separate dated correction marker — `last_verified` plus the `**Source:**` line carry
  the date. `[MEASURED]` there is **no `## Version History` section in any of the five files**, so
  `V-54-30`'s "outside Version History" carve-out is dead there and no alternative anchor exists.
- **D-12:** FIX-07's Windows 11 Pro exclusion is flagged in **prose**, no bracketed token — *"this
  guide's Windows 11 Pro exclusion is not restated by the current article; treat it as
  unconfirmed."* `[CORRECTED]` `**Source confidence:**` is 4 hits / 3 files in `docs/`, not the
  70/38 first reported — too thin to import as a convention. `V-54-30`'s regex is case-**sensitive**
  and lacks `/i`.

### C11 ordering and the `00-overview.md` atom

- **D-13:** **Do not substitute a C11 allowlisted keyword — singularise.** `[CORRECTED]` the
  `\bAutopatch rings\b` hits are **three**, at `:78`/`:83`/`:86` (offsets 5701 / 6163 / 6317), not
  the two at `:79`/`:87` the draft claimed; the draft narrowed ROADMAP's correct `:76-87` range and
  lost the hit FIX-03 rewrites. `[MEASURED]` the two surviving windows `[5501,5916]` and
  `[5963,6378]` are **disjoint**, so a single keyword insertion is geometrically impossible.
  ROADMAP:93 and REQUIREMENTS' own `V-54-11` row both already prefer the singular because the
  anti-pattern regex is plural-only. — **Reversibility:** reversible.
- **D-14:** Fallback only, if a site must retain the plural: **two** `disambiguation` insertions are
  required (one in `[5501,5916]`, one in `[6117,6378]`), never one. The noun `disambiguation` must
  be exact — `disambiguates` does not match the windowKeywords regex.
- **D-15:** `[CORRECTED 2026-08-19, post-research]` **Exactly ONE** audit enforces C11 against
  today's `docs/` — `v1.20-milestone-audit.mjs`. Sixteen scripts carry the C11 pattern, but in
  v1.5–v1.19 the identically-named `walkMd()`/`readFile()` helpers read a **frozen Map** built by
  `createFrozenCorpusReader` at that milestone's own close SHA (`readFile` returns
  `FROZEN.get(relPath)`), so a break in live `docs/` **cannot redden them**. Only v1.20's helpers
  are genuinely live (`readFileSync(join(process.cwd(), relPath))`). The name collision with the
  live helpers in `c17-eee-contract.mjs` is what produced the earlier "16 live" figure — it was
  asserted by the draft **and** by an independent verification agent, and both were wrong.
  `c11_ops_exemptions` is empty in all 18 sidecars. v1.20 **is** an apex chain member, so the C11
  constraint is real — it is narrower, not absent.
- **D-16:** `[CORRECTED 2026-08-19, post-research]` Minimum sufficient C11 verification is
  **`v1.20-milestone-audit.mjs`** — the only live enforcer — plus v1.21's own audit once Phase 153
  authors it. The earlier "run v1.5 plus any one of v1.6–v1.20" instruction was **unsound**: v1.5's
  C11 reads frozen bytes and can never observe a Phase-145 edit. The divergent-keyword-list finding
  below is retained because it binds Phase 153's new audit, not this phase's verification.
  `[MEASURED]` `v1.5-milestone-audit.mjs:517`'s keyword regex is 168 chars vs 277
  in every other C11-bearing audit — six alternates short. "Identical in all 16" is false.

### Commit atoms and gates

- **D-17:** Per validator-safe atom, ≈ one commit per file, across **~35 files in five classes** —
  not the "5+" the draft assumed:
  1. `00-overview.md` — FIX-01 + FIX-02 + FIX-03 + FIX-04 + FIX-06 (two `OfferPrograms` sites) +
     FIX-10, **one commit** (the C11 hits and their keepers are interleaved).
  2. `01-windows-wufb-rings.md` — FIX-01 + FIX-02 + FIX-04 + FIX-07 + FIX-10, one commit.
  3. `02-macos` / `03-ios` / `04-android` — one commit each.
  4. `admin-setup-ios/07-device-enrollment.md` **+** `03-ios-update-lifecycle.md` — **ONE commit**;
     `V-54-32` atomically couples `V-54-19/20/21`.
  5. `co-management/03:25` · FIX-11's 4 files · FIX-09's 26 md files + generator + SVG ·
     `check-phase-59.mjs` (FIX-12, **its own commit, landed first**, never mixed with doc edits).
- **D-18:** Per-commit gate, run as an explicit task step (**not** the git hook):
  `check-phase-53.mjs`, `check-phase-54.mjs`, `check-phase-57.mjs`, `check-phase-59.mjs`,
  `c17-eee-contract.mjs`, `check-nav-hub-links.mjs`, plus `v1.20-milestone-audit.mjs` for C11 (per
  the corrected D-16 — it is the only live C11 enforcer).
  `check-phase-54.mjs` is a **hard** gate on every commit touching `01-windows-wufb-rings.md`
  (ROADMAP:93 directs this).
- **D-19:** `[MEASURED]` `scripts/hooks/pre-commit.sh` only JSON-parses two v1.4 sidecars, but
  `scripts/validation/pre-commit-advisory.sh` **is** content-scoped and its `PINNED_FILE_PATTERN`
  covers `docs/_glossary-linux.md`, which FIX-11 edits. Run it. Do not conclude "no content gate
  exists" from a one-file grep.
- **D-20:** `[DISPROVED — do not act on it]` a review finding asserted `BASELINE_9` in
  `regenerate-supervision-pins.mjs` is line-coordinate pinned into `docs/_glossary-linux.md`. It is
  **not** — `BASELINE_9` pins Android files only (`_glossary-android.md`,
  `android-capability-matrix.md`, `android-lifecycle/`, `decision-trees/08-android-triage.md`,
  `admin-setup-android/`). Recorded so a later agent does not re-derive the false coupling.

### Phase 146 ownership collision

- **D-21:** **[OWNER-RULED 2026-08-19]** Phase 145 **does** edit `01-windows-wufb-rings.md` for
  FIX-01/02/04/07/10. ROADMAP Phase 146's *"the only phase in v1.21 that edits
  01-windows-wufb-rings.md"* is false as written and is restated as **"the only phase performing
  structural surgery (the driver/firmware stub-and-move) on this file."** `[MEASURED]` `## Hotpatch`
  exists in exactly one file corpus-wide. — **Reversibility:** one-way — deferring FIX-07 instead
  would land the milestone's own corrections after two phases of content built on top of them.
- **D-22:** `[CORRECTED]` the Hotpatch section is **`:107–151`** (next H2 at `:152`), not `:107-124`
  as the draft stated. `:107-124` is only the prerequisites list; FIX-07's substantive corrections
  sit at `:127-128`, `:132`, `:137-139`, `:142-146`.
- **D-23:** Two ROADMAP:93 directives the draft dropped are carried forward: prefer the singular
  `Autopatch ring` form, and gate every commit touching this file on `check-phase-54.mjs`.

### The two undated deadlines

- **D-24:** These are **two different problems**. **Apple:** not a research question — FIX-05 records
  that Intune's article carries a deprecation banner with **no date given**, so there is nothing to
  source; pre-commit to stating the absence. **Android:** genuinely `[UNVERIFIED]`; one bounded
  first-party attempt at plan time discharges ROADMAP's `Research flag: YES`.
- **D-25:** **The Android date literal is RETAINED everywhere, never deleted.** `[CORRECTED]` the
  draft recommended deleting it and claimed no assertion pinned it — false: `check-phase-54.mjs:384`
  pins `> ⚠️ **Hard deadline (Oct 31 2026):**` **verbatim** in `04-android-patch-delivery.md`, plus
  a whole-file token at `:389`. Both FIX-08 and ROADMAP's research flag require the rewrite to
  *retain the pinned literals*. Rewrite by attribution instead: the corpus asserts the deadline, the
  current first-party pages do not restate it, it is carried unconfirmed.
- **D-26:** Three collateral constraints on that rewrite: `V-54-24` requires **≥4** `[HARD-DEADLINE`
  tokens in the Android file; `check-phase-57.mjs:427` **bans** the literal inside `quick-ref-l2.md`'s
  Play Integrity H3 region, so the hedge must not propagate there; and an absence statement in
  `00-overview.md` must not name `MEETS_STRONG_INTEGRITY` in **body prose** (`V-54-29` — the table
  cell at `:55` is stripped and safe). `[CORRECTED]` the overview's date is at `:55` (also `:19`,
  `:58`), not `:57`.
- **D-27:** The researcher performs one bounded pass at plan time and **writes the negative result
  into RESEARCH.md as a named row** (query strings, pages fetched, date, verdict). The executor
  reads that row as the trigger for the attribution path. No second attempt during execution. The
  `**Source:**` line has no rendering for "we looked and found nothing" and must not be faked.

### FIX-11 archival-drift fix

- **D-28:** Fix **all 11 lines across 4 files**, not the 9/3 first measured. `[CORRECTED]` the 4th
  file is `docs/cross-platform/apple-business/10-apple-tv-lifecycle.md:187,:241`, pointing at
  `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` — which **exists in the repo but not in the
  published bundle**, and which SC#3's regex cannot see.
- **D-29:** SC#3's regex text is **not** amended. Once all 11 are fixed, both the literal
  `\.planning/research/\|\.planning/phases/` form and the broader `\.planning/` form return 0.
  Fixing the invisible file is cheaper than amending a criterion Phase 153's close-gate measures.
- **D-30:** Default replacement is drop-the-path-keep-the-label — **but three sites need substance,
  not a label**, and are handled individually. `[MEASURED]`:
  - `_glossary-apple-business.md:120` — stripping leaves the dangling *"see … deferred items"*, and
    its `.planning/phases/62-…/` target **no longer exists**.
  - `_glossary-apple-business.md:190` — `CI-2`/`CI-3` become undefined; `CI-3` has 2 corpus
    occurrences, **both being stripped**.
  - `l2-runbooks/25-linux-agent-investigation.md:93` — `PITFALL-4` has **exactly one** corpus
    occurrence and it is the site being stripped.
  **Executor rule:** before stripping any identifier, confirm it retains ≥1 defining occurrence in
  `docs/`; if not, inline the substance or drop the identifier.
- **D-31:** `_glossary-linux.md:157` — the one site the draft said "genuinely needs its substance
  inlined" — needs only the **link unwrapped**. `[MEASURED]` its own next clause already states
  PITFALL-2's substance ("compliance reporting exists but is not consumable by device-level CA
  grants"), and `admin-setup-linux/03-compliance-policy.md:44` carries it too.
- **D-32:** The reader-facing-defect argument is bounded to `.planning/` paths only — **not** to the
  ~28 other `PITFALLS.md` mentions in `docs/`. The draft asserted a principle scoping to ~38 sites
  and then executed 9, with no stated boundary.
- **D-33:** All three original FIX-11 files are C17-enrolled (RE-181 / RE-180 / RE-067) and C17 is at
  `[MEASURED]` **234/0**. These are mid-paragraph prose edits adding no blockquote and no heading, so
  the known #12 blockquote-length and #4 Summary-ordering traps are untouched. Re-run
  `c17-eee-contract.mjs` after the commit anyway.

### FIX-12 frozen-read conversion

- **D-34:** Convert **`V-59-14` only**. `V-59-02` (existence), `V-59-13` (H2 presence) and `V-59-34`
  (negative TBD/TODO hygiene) stay **live** — "does the file exist" and "has a TODO appeared" are
  correctly live questions. FIX-12 is `[OWNER-RULED 2026-08-19]` and names `V-59-14`'s
  `patchRows === 5` explicitly, so the option space was already closed.
- **D-35:** Helper is `readAtV15Close` — locked by the same owner ruling. `[CORRECTED]` the
  assertion text must say *"the ops index carried five Patch rows at **v1.5 close**"*, **not**
  "Phase 59 shipped five rows": `frozen-at-close.mjs:71` records `V15: 'ba2cbc0', // Phase 61 close
  — canonical`. `[MEASURED]` precondition verified — `git show ba2cbc0:docs/operations/00-index.md`
  yields Patch/App/Drift = 5/5/5, matching live. The frozen blob lacks the live
  `## Apple Business Governance` H2 (Phase 65), so frozen ≠ live document.
- **D-36:** Let it throw, matching `:659`'s `// no null-check … let it propagate`. `[CORRECTED]` this
  is **helper-tracked, not an idiom**: `readAtV15Close` throws at `:315`/`:659`; `readAtV116Close` is
  wrapped in try/catch at `:287`/`:940`. A future planner picking the other helper inherits the
  opposite convention.
- **D-37:** Append `[v1.5-frozen @ ba2cbc0]` to the **assertion name**, copying `V-59-07`'s suffix.
  Rename the assertion only — **never the file**: `audit-harness-v1.5-integrity.yml:270`'s
  `if [ -f … ]` guard would turn a renamed file into a silent skip.
- **D-38:** Recorded **for Phase 152, not 145**: `[MEASURED]` **six** validators read the ops index
  (`check-phase-53/54/55/56/59/65`), four carrying negative H2 constraints — `V-54-28` bars exactly
  `^## Patch Management$`, `V-55-28` bars `## App Lifecycle`, `V-56-29` bars `## Drift Detection`/
  `## Tenant Migration`, `V-65-10` requires a live `## Apple Business`. The existing
  `## Patch & Update Management` H2 does not match `V-54-28`'s anchored regex, so adding rows is
  unaffected. FIX-12 disarms the row-count trap; these four are naming constraints on Phase 152.

### FIX-04 rename scope

- **D-39:** **[OWNER-RULED 2026-08-19]** Rename product-name prose in the **five patch-management
  documents only**, on ROADMAP SC#1's authority, and **retain the coined `WUfB deployment ring`
  compound**. `[MEASURED]` 113 `WUfB` tokens / 13 files; the compound alone is **56 of 113**; the
  spelled-out product name is 13. This is a ratified scope reduction — FIX-04's own text grants
  exactly **one** named carve-out ("Windows Update for Business **reports**"), so the compound
  exemption is the owner's, not the requirement's. — **Reversibility:** costly — widening later means
  re-sweeping 8 more files including two nav hubs.
- **D-40:** `[DISPROVED — do not reuse]` the draft justified the deferral with "the other 8 files'
  pins were never surveyed". `[MEASURED]` `grep -rln "WUfB" scripts/validation/*.mjs` returns **only
  `check-phase-54.mjs`**. There is zero unsurveyed pin risk. The binding authority is SC#1's file
  scope, nothing else.
- **D-41:** `V-54-09` binds only the ~10-line `## Ring Terminology` window in `00-overview.md` — keep
  one WUfB-deployment-ring token and one Autopatch-ring token there verbatim. `V-54-11`'s bare
  `deployment` and `Update` alternates mean the rename would be validator-safe elsewhere; the
  compound is retained by D-39's editorial ruling, not by a pin.
- **D-42:** **Rename body prose only.** `[MEASURED]` `V-54-11` strips **headings**, so the H1
  `# Windows WUfB Rings`, the anchor-owning H2 `## WUfB Deployment Rings` and the filename
  `01-windows-wufb-rings.md` (hardcoded in ≥8 links) are validator-invisible and reader-maximal.
  Leave the H2 text and the filename untouched this milestone — an H2 rename silently breaks inbound
  `(#wufb-deployment-rings)` anchors, and Phase 146 owns structural surgery on that file.
- **D-43:** Accepted cost: deferring the other 8 files splits the `[Windows WUfB Rings]` nav label
  across pages. Recorded, not fixed.

### FIX-09 Ubuntu sweep and SVG

- **D-44:** **[OWNER-RULED 2026-08-19]** Key the sweep on bare **`\b22\.04\b`** over `docs/**/*.md`
  **plus `scripts/generate-diagrams.py`**. `[CORRECTED]` the true set is **26 markdown files**, not
  SC#5's 25 — the 26th is `docs/linux-lifecycle/00-enrollment-overview.md:21`
  (`Ubuntu LTS Linux endpoints (22.04 / 24.04)`) and `:113` (`20.04 / 22.04 / 24.04`), which carry no
  adjacent "Ubuntu" and are invisible to SC#5's key. Close on
  `grep -rn "22\.04" docs/ scripts/generate-diagrams.py` returning **0**. SC#5's text is not amended;
  CONTEXT records the corrected figure.
- **D-45:** Edit `scripts/generate-diagrams.py:1544`, then run the generator **unmodified**.
  `[MEASURED]` it is byte-idempotent — all 14 SVGs regenerate identically, confirmed by `md5sum` and
  `diff -rq`. Only `decision-tree-09-linux-triage.svg` changes.
- **D-46:** Prove idempotency with `md5sum`/`diff -rq` against a pre-run copy, **not**
  `git status --porcelain`. `[MEASURED]` `core.autocrlf=true` and `.gitattributes` covers only
  `scripts/pipeline/reference.docx`, so porcelain is structurally incapable of reporting a pure
  line-ending change on an `.svg`.
- **D-47:** `[MEASURED]` `grep -rln "docs/diagrams\|\.svg" scripts/validation/` returns **nothing** —
  SC#5's SVG half has **no automated gate**. The phase carries an explicit verification step and
  records its output as close evidence. "Satisfiable at zero cost" is true for doing the work and
  false for proving it.
- **D-48:** The RHEL-8-vs-9/10 conflict does **not** go into the SVG. Update `:1544` to the supported
  version list only (`Ubuntu 24.04 / 26.04 LTS · RHEL 9 / 10`); the conflict lands in the markdown
  wherever a supported-version list appears, per FIX-09's own wording. `[CORRECTED]` `:1544` is the
  `sub=` argument of `title(W // 2, 36, …)` — a centre-anchored **subtitle** at y=58 on a 1200px
  canvas, **not** a footer; the real footer is `footer_path(W-20, H-8, …)`. The draft's "a footer
  cannot carry it legibly" reasoning was built on the wrong element.
- **D-49:** Edit `docs/decision-trees/09-linux-triage.md` and the generator's subtitle to the **same**
  version list in the **same** commit. `[MEASURED]` all three hits there are the slash-compound
  `Ubuntu 22.04/24.04 LTS`, one inside a `> **Platform gate:**` blockquote, and the SVG subtitle
  carries the same string — otherwise the diagram and its page disagree.

### Areas the original gray-area set never covered

- **D-50:** `co-management/03-cocmgmt-migration-paths.md` takes a minimal token-swap, not re-authoring.
  Edit `:25` and nothing else: `(Test, First, Fast, Broad)` → `(Test and Last)`. Do **not** apply
  FIX-02 there, do **not** apply FIX-04's rename there, do **not** add any blockquote.
  `[MEASURED]` the file contains **no `exclusiv` string anywhere**, and `:24-25` already reads
  *"Autopatch eliminates manual WUfB ring authoring by managing rings … automatically"* — already
  FIX-02's corrected containment position, so FIX-02 requires no edit here. A five-word parenthetical
  swap is not "re-authoring", which **dissolves REQUIREMENTS:129's flagged conflict** with the
  architecture research's "cross-link only, do not re-author" ruling. Touches none of `V-53-20`'s
  four required literals, adds no `> **Platform applicability:**` blockquote (`V-53-21`), and the
  file carries no `\bAutopatch rings\b` hit so C11 is not in play. Verify `check-phase-53.mjs`
  exits 0.
- **D-51:** FIX-03's sentence split. Split `00-overview.md:80-84` into (1) the verbatim-true
  independence clause — *"Driver and firmware updates are an independent policy surface that admins
  approve per-update"* — and (2) the corrected gating statement — *"Approval mode and the 0–30 day
  deferral are set per deployment ring, and the quality-update deadline and grace period do apply to
  drivers."* **Drop the plural `Autopatch rings`** in doing so; the L83 C11 hit dies with the
  rewrite. Land in the same commit as FIX-02's deletion of the L86 paragraph — that paragraph is
  L83's only C11 keeper, which is why FIX-01/02/03 cannot be split across commits. Do not import
  `Hotpatch`/`VBS`/`MEETS_STRONG_INTEGRITY` into the new prose.
- **D-52:** FIX-06 governs over the `V-54-18` row. Re-categorise `OfferPrograms`, do **not** delete,
  at all `[MEASURED]` 5 sites across 3 files (`admin-setup-ios/07:46`; `00-overview.md:53`,`:114`;
  `03-ios-update-lifecycle.md:56`,`:71`) — recast as a **`Beta`-dictionary beta-programme-enrolment
  key**, not update enforcement. On the contradiction the review surfaced: FIX-06 says
  "re-categorised, **not deleted**" while REQUIREMENTS' `V-54-18` row says "`OfferPrograms` **may be
  dropped freely**" — the requirement checkbox governs; the `V-54-18` row describes **pin latitude**
  (no assertion requires retaining it; `V-54-18` needs only ≥2 of 4 DDM keys), not a content
  directive. Flag the row for a one-line clarification at close.
- **D-53:** FIX-06 forces a coupled two-file commit. The `admin-setup-ios/07:46` edit sits inside
  `V-54-19`'s `ddmRowRe` cell, which requires `DDM`, `unsupervised` and `iOS 17` on **one line**, the
  literal `Supervised-only in iOS 17+ enforcement policies` **absent**, and the
  `03-ios-update-lifecycle.md` cross-link present. `V-54-32` atomically couples `V-54-19/20/21`, so
  `admin-setup-ios/07` and `03-ios-update-lifecycle.md` land in **one commit**.
- **D-54:** The real C11 cliff is in `01-windows-wufb-rings.md`, not the overview. `[MEASURED]`
  slack between `:62` and `:65` is **36 characters**: the L65 hit sits at offset 3988, its only
  keeper (`disambiguation`, inside the `:62` H2) at 3824, window opening at 3788. **Never insert a
  `**Source:**` line or any other text into that gap.** FIX-01's own rewrite *shortens* the
  parenthetical (`Test, First, Fast, and Broad` → `Test and Last`) so it is safe as specified — the
  hazard is added text. The `00-overview.md` "56-character cliff" raised during review was
  **disproved**: D-01 places the citation upstream of the keeper, where the window shifts with it.
- **D-55:** FIX-02's rewrite of the PITFALL-9 blockquote must retain that literal. `[MEASURED]` both C11 keepers for the
  L77 hit (`PITFALL-9`@4781 and `mutually exclusive`@4859) live **inside the very blockquote FIX-02
  rewrites**. REQUIREMENTS' C11 row calls `:77` "the safe one, independently green via its own
  `PITFALL-9` literal" — true only *if* that label survives the rewrite, which the requirement never
  says. Retain the literal **and** singularise the hit. `PITFALL-9` is also a corpus-wide
  cross-reference used at `00-overview.md:92` and `co-management/03:111`.

### Claude's Discretion

Prose wording of every correction, the exact article titles selected for `**Source:**` lines, the
order in which the five files are committed (beyond the ordering constraints below), and the
phrasing of the deferral records. All byte offsets, insertion sites and hit maps are to be
**re-measured at plan time**, never transcribed from this document — the review found a systematic
off-by-one/two pattern (`:79`→`:78`, `:87`→`:86`, `:57`→`:55`, `:107-124`→`:107-151`) in the draft
that was caused by exactly that.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Governing artifacts
- `.planning/REQUIREMENTS.md` — FIX-01..FIX-12 requirement text; the **"Validator Constraints on
  Requirement Text"** table (the authoring patterns that satisfy both pin and truth); the
  "Why FIX-11 cannot be deferred" and "Why FIX-12 is a phase-145 deliverable" paragraphs
- `.planning/ROADMAP.md` — Phase 145 Goal / Success Criteria 1–5 / Blast radius / Research flag;
  **Phase 146 blast radius** (the ownership sentence restated by D-21, plus the singular-`Autopatch
  ring` and check-phase-54-gate directives); Phase 152 (FIX-12's beneficiary)
- `.planning/STATE.md` — v1.21 phase dependency summary and the V120 back-anchor obligation

### Validators that gate this phase
- `scripts/validation/check-phase-54.mjs` — `V-54-07` (frontmatter + ≤60-day interval), `V-54-08`
  (4-platform table), `V-54-09` (Ring Terminology window), `V-54-11` (bare-`ring` NEGATIVE),
  `V-54-12` (Hotpatch, whole-file tokens), `V-54-15/16` (Apple), `V-54-18` (DDM keys), `V-54-19/32`
  (iOS coupling), `V-54-23/24` (Android deadline), `V-54-29` (overview body-prose ban), `V-54-30`
  (TBD/TODO)
- `scripts/validation/check-phase-53.mjs` — `V-53-20/21` gating `co-management/03`
- `scripts/validation/check-phase-57.mjs` §`:427` — **bans** `Oct 31 2026` inside `quick-ref-l2.md`'s
  Play Integrity H3
- `scripts/validation/check-phase-59.mjs` — `V-59-14` (the FIX-12 conversion target) plus
  `V-59-02/13/34` which stay live; `V-59-07` is the naming precedent for D-37
- `scripts/validation/_lib/frozen-at-close.mjs` §`:71` — `V15: 'ba2cbc0'`
- `scripts/validation/v1.5-milestone-audit.mjs` §`:517` and `v1.19-milestone-audit.mjs` §`:577` —
  the C11 `\bAutopatch rings\b` pattern and its divergent windowKeywords lists
- `scripts/validation/c17-eee-contract.mjs` — 234/0 baseline; enrollment is `doc_id`-gated
- `scripts/validation/check-nav-hub-links.mjs` — markdown-link resolution only
- `scripts/validation/pre-commit-advisory.sh` §`:6` — `PINNED_FILE_PATTERN` covers `_glossary-linux.md`

### Edit targets
- `docs/operations/patch-management/00-overview.md` · `01-windows-wufb-rings.md` ·
  `02-macos-update-enforcement.md` · `03-ios-update-lifecycle.md` · `04-android-patch-delivery.md`
- `docs/operations/co-management/03-cocmgmt-migration-paths.md` §`:25`
- `docs/admin-setup-ios/07-device-enrollment.md` §`:46` (coupled with `03-ios-update-lifecycle.md`)
- `docs/_glossary-linux.md` §`:157` · `docs/_glossary-apple-business.md` (7 sites) ·
  `docs/l2-runbooks/25-linux-agent-investigation.md` §`:93` ·
  `docs/cross-platform/apple-business/10-apple-tv-lifecycle.md` §`:187,:241`
- `scripts/generate-diagrams.py` §`:1544` · `docs/diagrams/decision-tree-09-linux-triage.svg` ·
  `docs/decision-trees/09-linux-triage.md`

### Citation-convention precedents (D-01)
- `docs/admin-setup-macos/10-kerberos-sso-extension.md` §`:156` — the canonical
  `**Source:** [title](url) (updated YYYY-MM-DD)` shape
- `docs/operations/app-lifecycle/03-ios-vpp-licensing.md` §`:146` — the dated External-References form

### Review artifacts (this session)
- `145-DISCUSSION-LOG.md` — the full grill + adversarial-review chain, with per-question verdicts

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`readAtV15Close` / `readAtV116Close`** (`_lib/frozen-at-close.mjs`): already imported by
  `check-phase-59.mjs`; FIX-12 adds a third `readAtV15Close` call site. Phase 128 commit `066a9068`
  performed this exact conversion across 8 validators — copy that shape.
- **`scripts/generate-diagrams.py`**: a working, byte-idempotent generator for all 14 SVGs. FIX-09's
  "regeneration not text edit" is satisfiable by a one-line source edit plus an unmodified run.
- **The `**Source:**` citation line**: an existing corpus convention, not a new one to design.
- **The `## External References` sections**: all five patch-management files already carry one with
  Microsoft Learn URLs — available for dedup and cross-reference.

### Established Patterns
- **A pin is a literal-presence test, not a claim-endorsement test.** This is what makes the whole
  phase possible: `V-54-12` can require `May 2026` while the corpus states that May 2026 is
  unsupported, because the literal survives inside a true sentence (the attribution pattern).
- **Frozen-read conversion**: `V-59-07`'s `[v1.5-frozen @ ba2cbc0]` naming suffix and the
  throw-don't-swallow idiom at `:659`.
- **Atomicity coupling**: `V-54-32` couples `V-54-19/20/21` — a shipped precedent for
  multi-file single-commit atoms.

### Integration Points
- `check-phase-59.mjs` is the only source file this phase modifies. It runs as a named CI job at
  `.github/workflows/audit-harness-v1.5-integrity.yml:270`, which `[MEASURED]` carries
  `fetch-depth: 0` — the frozen-read shallow-clone hazard is already discharged on the only
  invocation path.
- `[MEASURED]` `check-phase-59` is **not** registered in `frozen-read-negative-test.mjs` (which names
  49/51/61/68/70) despite already carrying four frozen-read sites. FIX-12's third site creates no new
  registration obligation; the gap predates this phase.

</code_context>

<specifics>
## Specific Ideas

- The owner's standing preference for maximum thoroughness was exercised in full here: all 8 gray
  areas selected, `/grill-me` expanding them to 26 sub-questions, `/adversarial-review` (4 Finders →
  Adversary → Referee) adjudicating every one. **3 of the draft picks were reversed and 22 amended** —
  the draft's own founding premise in Area 1 was falsified, and the C11 hit map it would have handed
  the planner was wrong in three ways.
- The one instruction the owner should see repeated to the executor: **re-measure every line number
  and byte offset at plan time.** The review's most consistent finding was transcription drift.

</specifics>

<deferred>
## Deferred Ideas

- **FIX-04's remaining 8 files** (`docs/index.md`, `docs/operations/00-index.md`,
  `docs/operations/co-management/01`,`02`,`03`, `docs/linux-lifecycle/00-enrollment-overview.md`,
  `docs/operations/drift-migration/00-overview.md`, `docs/reference/linux-capability-matrix.md`) —
  deferred by D-39's owner ruling. **Trigger:** a corpus-hygiene milestone, or the first phase that
  edits any of those files for another reason. Accepted cost: the split nav label (D-43).
- **The `V-54-18` requirements-row clarification** — its "`OfferPrograms` may be dropped freely"
  wording describes pin latitude but reads as a content directive contradicting FIX-06. One-line fix
  at milestone close (D-52).
- **`check-phase-59`'s absence from `frozen-read-negative-test.mjs`** — a pre-existing gap covering
  four frozen-read sites, not created by this phase. **Trigger:** the next tooling-debt phase.
- **The ~28 non-`.planning/` `PITFALLS.md` mentions in `docs/`** — same reader-facing class as
  FIX-11 but outside its scope by D-32. **Trigger:** a corpus-hygiene milestone.
- **A `review_by < today` freshness gate** — carried from REQUIREMENTS' Future Requirements;
  `[MEASURED]` 217 of 271 dated files are past due under a green harness because no validator
  compares `review_by` to the current date.
- **An automated gate for the SVG half of SC#5** — nothing in `scripts/validation/` reads
  `docs/diagrams/` at all (D-47). **Trigger:** the next tooling-debt phase.

</deferred>

---

*Phase: 145-Corpus Correction, Validator Gate & Archival-Drift Fix*
*Context gathered: 2026-08-19*
