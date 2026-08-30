# Phase 151: Recipe #5 — The Enterprise Update Plan - Context

**Gathered:** 2026-08-26
**Status:** Ready for planning

<domain>
## Phase Boundary

`docs/recipes/05-*` — the corpus's **first configuration artifact of any kind** — authored as one
prescriptive Device Recipe synthesising the operations guides written in Phases 146 through 150:
ring topology, deadlines, driver and firmware approval cadence, and application update channels.
Nine decision points, each carrying a reversibility rating and a platform-applicability marker, and
a `## Rollback/Recovery` section authored truthfully as largely a catalogue of absences.
Requirements RCP-01, RCP-02, RCP-03, RCP-04 and RCP-05.

**This phase also owns**, by owner ruling during this discussion, three things the requirement text
does not name: an EEE-SOP amendment widening the Device Recipe doc class to admit a fleet-scoped
configuration plan (D-04); the retrofit of `## Rollback/Recovery` into recipes 01 and 02 (D-47); and
a needle-spec hand-forward to **both** Phase 152 and Phase 153, not 152 alone (D-75).

**Not this phase:** the registry row, filename-map rows, both canary bumps, ops-index rows and
`docs/index.md` entry (all Phase 152, INT-01/INT-04); `check-phase-151.mjs` and the apex
(Phase 153, HARN-03 — content phases hand off a needle-spec only); any edit to recipes 03 or 04;
any edit to the operations guides authored in 146-150; re-authoring any procedure those guides own.

**How this context was produced.** A 71-question grill draft was subjected to a four-Finder /
Adversary / Referee adversarial review. **112 raw findings → 87 net distinct → 14 disproved → 73
surviving**, plus **8 the Referee raised that no Finder had**. The review **falsified two of the
draft's own `[MEASURED]` rows**, **reversed one load-bearing constraint**, and found the phase's
single largest structural question had never been asked at all. Seven rulings below are the owner's.

</domain>

<decisions>
## Implementation Decisions

Evidence labels: `[MEASURED]` = a command run this session · `[CORRECTED]` = a draft claim the
adversarial review falsified and replaced · `[REVERSED]` = a draft constraint the review overturned ·
`[OWNER-RULED 2026-08-26]` = the owner decided · `[REFEREE]` = surfaced by the Referee's
missed-issues pass, no Finder raised it · `[PREMISE]` = inference, not measured · `[UNVERIFIED]` =
open, must close at plan time.

### Corrections of record — falsified premises the draft carried

- **D-01:** **Two draft `[MEASURED]` rows were fabricated and are struck.** First, the claim that
  `2026-10-19` is the earliest `review_by` among the synthesised guides is false — the earliest is
  `2026-10-18`, carried by three files (`02-macos-update-enforcement.md`,
  `03-ios-update-lifecycle.md`, `04-android-patch-delivery.md`), and `06-windows-driver-firmware-updates.md`
  is not even uniquely earliest at `2026-10-19`. Second, the claim that "every click-path was
  authored in 146-150" is false — measured `Intune admin center` counts are 0 for guide 06, 0 for 07,
  1 for 08, and 0 for all five `firmware-bios/*`. The guides carry blade **locations**, not numbered
  procedures. Both rows are deleted, not amended. Any downstream agent that reads a `[MEASURED]` row
  in this file must be able to reproduce it by running the command named beside it.
- **D-02:** **The app-lifecycle overview is 60 days past due and is excluded from See Also.**
  `docs/operations/app-lifecycle/00-overview.md` carries `review_by` of 2026-06-27. It is excluded from the See Also set on
  freshness grounds, and the exclusion is recorded here so a successor does not re-add it without
  first re-stamping that file. Re-stamping it is **not** this phase's work.
- **D-03:** **The reversed constraint** — the draft asserted that editing recipes 01 and 02 was "an
  active red". That is backwards. `[REVERSED]` `[MEASURED]` `check-phase-131.mjs` pins recipe 02 by
  content needles only, and `V-135-RECIPE01ZEROEDIT` pins recipe 01 by byte-presence of exactly two
  heading strings — neither is a line count. The hard pins are on recipes **03 and 04**
  (`V-135-RECIPE` and `V-136-RECIPE` pin measured line counts 328 and 301, and `V-136-H2SKELETON`
  pins an exact 8-element H2 order). Recipes 01 and 02 — the two lacking the section — are cheap to
  retrofit; recipes 03 and 04 must not be touched at all.

### The artifact's doc class — the question the draft never asked

- **D-04:** **[OWNER-RULED 2026-08-26]** **The Device Recipe class definition is amended, not
  worked around.** `[REFEREE]` The template defines the class as "an end-to-end, step-by-step
  provisioning walkthrough with embedded admin decision points" (`docs/_templates/recipe-template.md`
  lines 2-3), and this recipe is a tenant-scoped configuration plan. Phase 151 files an amendment to
  `docs/_standards/EEE-SOP-standard.md` widening the class to admit a fleet or tenant configuration
  plan, and widening STD-05 D-06's end-state rule to accept a fleet end-state. The STD-05 D-06
  question the draft did ask is a **symptom** of this, not the disease.
  — **Reversibility:** one-way — the amendment changes a standard that 83 validators and every future
  recipe read; it also legitimises the filename (D-66) and the H1 (D-33), both of which break a 4/4
  convention and are indefensible without it.
- **D-05:** **The amendment is FILED as an evidence-carrying entry, exactly as Phase 150 D-02 filed
  its SC#1 amendment.** A shape that contradicts a shipped standard without a filed amendment is what
  the milestone audit grades as drift.
- **D-06:** **`## Summary`'s opening sentence names a concrete fleet end-state, not a set of
  placeholders.** The draft's proposed sentence ("drivers on **a chosen** approval mode, BIOS on **a
  named** custody path…") is four unresolved variables and fails D-06's "so a reader can confirm
  applicability before starting" purpose. All four shipped openers name a concrete artifact. The
  replacement names what the fleet looks like when the plan is in force, in the same register as
  `01-shared-windows-avd-client.md` line 19.
- **D-07:** **The Summary does not pre-decide any of the nine decisions.** The draft's "with hotpatch
  left at its tenant default" states the outcome of D-2, which the recipe keeps live — making either
  the decision fake or the Summary false for every admin who chooses otherwise. Struck.
- **D-08:** **The template's literal trailing frame is preserved or its omission recorded.**
  `recipe-template.md` lines 51-53 carry the non-bracketed literal ", provisioned end-to-end from
  zero through Intune." Dropping it silently is a new untracked divergence in the phase that exists
  to close one.

### Decision-block anatomy

- **D-09:** **No new table columns.** STD-05 D-01 literally enumerates both column sets, and D-04
  rule 1 makes "decision blocks use the D-01 composite shape" one of only three normative rules.
  Widening amends a normative rule silently. This survived an explicit consistency attack.
- **D-10:** **The reversibility rating and platform marker live on a single non-blockquote bold line
  between the lead-in and the table.** Shape — `**Applies to:** Windows-only · **Reversibility:**
  Reversible — disruptive` — using the `·` U+00B7 separator from the Visible Header Block Format
  D-05 (not STD-05 D-05, which is the branch idiom; two live D-05s exist and the citation must
  disambiguate). D-02's mandatory blank line survives because the hazard is GFM lazy continuation,
  which any blank line defeats.
- **D-11:** **[OWNER-RULED 2026-08-26]** **Ratings are assigned at the branch the recipe RECOMMENDS,
  not the worst-case branch.** The draft's worst-case rule forced D-5 to `Effectively irreversible`
  (Current Channel is the default and its Rollback support row reads "Not applicable"), producing two
  such ratings and breaking RCP-02's "one". Under the recommended-branch rule D-5 rates
  `Reversible — disruptive` on Monthly Enterprise's three-month window, and the Current-Channel
  absence is stated in full in D-5's consequence text and again in `## Rollback/Recovery`. RCP-02's
  count stays literally true and nothing is softened.
  — **Reversibility:** costly — the rule determines all nine ratings and SC#2 is graded by counting
  them; changing it later re-rates the whole set.
- **D-12:** **One rating per decision point, nine ratings total.** RCP-02's "one Destructive and one
  Effectively irreversible" is only countable if exactly nine ratings exist.
- **D-13:** **The rating vocabulary is a closed four-value enum** — `Reversible`,
  `Reversible — disruptive`, `Destructive`, `Effectively irreversible`. The two values RCP-02
  requires counting are neither prefixes nor substrings of any other member, so the count is
  unambiguous.
- **D-14:** **`Destructive` is D-3 (driver approval mode) and `Effectively irreversible` is D-4
  (BIOS/firmware surface).** The draft assigned these nowhere; the assignment arrived only as an
  aside in an Area-5 cross-reference question, and SC#2 rides on it.
- **D-15:** **The enum is defined in a short definition list, and the placement is chosen so
  `## Summary` does not become six stacked constructs.** No shipped recipe carries a bulleted list in
  `## Summary`; all four are one prose paragraph plus one to five blockquotes.
- **D-16:** **Platform-marker vocabulary is `Windows-only` / `Linux-only` / `macOS, iOS and Android`
  / `All platforms`, and the literal token `Windows-only` is what makes RCP-03 a grep.** The prose
  marker deliberately reads `All platforms`; the frontmatter and header block read the D1 map's
  `All Platforms`. The two are different surfaces and the casing difference is intentional, recorded
  here so a reviewer does not read it as drift.
- **D-17:** **Six decisions are `Windows-only`** — D-1, D-2, D-3, D-4, D-5, D-6. RCP-03's floor of
  three is cleared with margin. D-5 is settled first-party and needs no plan-time hedge: guide 08
  quotes "Update channels are device-specific and apply only to installations of Microsoft 365 Apps
  on devices running **Windows**." Enterprise App Management is likewise Windows-only.
- **D-18:** **Every one of the nine `> **Ask the admin:**` lead-ins is a single blockquote line,
  blank-line separated from any other blockquote.** C17 assertion #12 caps *contiguous* top-level
  blockquote runs at 200 characters — verified against the validator's `while (/^>/)` loop, which
  terminates on a blank line. The draft's Area-4 claim that blockquotes must also clear the cap "as a
  contiguous run" is wrong and is struck; the Area-1 reading is correct and governs.
- **D-19:** **The `> **What breaks if misconfigured:**` closers are the long blockquotes, and they
  are budgeted.** The template makes one MUST per configurable setting; measured counts across shipped
  recipes are 1, 4, 6 and 6, and `V-136-BREAKSCALLOUT` pins the count in recipe 04. The draft never
  allocated them at all. Each is measured against the 200-character cap at plan time; the class has
  very little headroom (the longest shipped run measures 187).
- **D-20:** **The spec/code divergence on C17 #12 is recorded, not relied on silently.** The standard's
  assertion table says "Gate blockquote (if present) ≤ 200 characters" while the validator measures
  every contiguous run; a successor reading only the standard would draw the opposite conclusion. The
  cap is also column-0-anchored, so it is inert on indented blockquotes.

### Decision-point identity

- **D-21:** **[OWNER-RULED 2026-08-26]** **Each decision carries a hand-authored descriptive
  `<a id>` anchor and NO visible `D-NN` label.** Shape — `<a id="decision-driver-approval-mode">`.
  This dodges three defects at once: the double-hyphen slug (`### Step 3: **Decision D-1 —** Driver
  approval mode` slugs to `step-3-decision-d-1--driver-approval-mode`, verified by tracing the link
  checker's `githubSlug`, against a checker with no allowlist); the collision between a visible
  `D-1`..`D-9` namespace and STD-05's own `D-01`..`D-07`; and the fragility of heading-derived slugs
  that Phase 152's hub and Phase 153's validator would pin.
  — **Reversibility:** costly — Phase 152's hub links and Phase 153's needles both pin these ids;
  renaming them later means editing two downstream phases' artifacts.
- **D-22:** **The `<a id>` convention is a recorded, deliberate divergence from the recipe class.**
  Measured: `<a id>` count in `docs/recipes/*` is 0, 0, 0, 0; the operations guides carry 8 each. The
  recipe class links by heading slug today. This phase changes that for decision points only, and
  says so rather than letting a reviewer discover it.
- **D-23:** **The nine decisions remain internally referenced by their anchor, never by heading
  slug.** Mixing the two is what makes a later wording edit silently break inbound links.

### Steps spine and branch depth

- **D-24:** **A linear Steps spine ordered by domain**, with the caveat that the draft's stated
  justification was false and is not carried forward: domain grouping does **not** map one Step to
  one guide. D-1 and D-2 both route to guide 07, D-4 alone spans five files plus the matrix, and the
  deferral/deadline Step maps to no single guide. Domain ordering is chosen because it matches how
  146-150 are filed, not because of a 1:1 property that does not hold.
- **D-25:** **Ten Steps** — nine decision Steps plus one non-decision Step carrying deferrals and
  deadlines, which RCP-01 names as a deliverable and for which research supplies no decision point.
- **D-26:** **The tenth Step is explicitly in scope for anchors, verification and outbound links**,
  even though it is not a decision point and therefore carries no reversibility rating or platform
  marker (those are scoped by RCP-02 and RCP-03 to decision points). The draft excluded it from every
  downstream structure, leaving RCP-01's named "deadlines" deliverable with no anchor, no
  verification entry and no link.
- **D-27:** **Three Case 1 branching decisions — D-1, D-3, D-4 — and the rest Case 2.** D-2 is
  **not** among them and is **not** boolean: it has three branches (leave the tenant default in
  place / block at tenant level / override per-cohort in a Windows quality update policy) plus the
  two-level precedence rule that the tenant toggle applies only to devices *not* in a quality update
  policy. STD-05 D-04 rule 3 exempts **Boolean** decisions only; the draft misapplied a normative
  exemption and in doing so dropped the per-cohort override that RCP-02 names as the corrected
  position.
- **D-28:** **Branch bodies are sibling H3 sections consuming step letters, never H4 subsections.**
  STD-05 D-04 rule 3 caps branch headings at H2 or H3; Steps are already H3, so a branch inside a
  Step would be H4 and forbidden. The shipped idiom is recipe 01's `### Step 5a` / `### Step 5b`.
- **D-29:** **Eight branch bodies exist and are named, counted and placed in the plan** — D-1 has 2,
  D-3 has 2, D-4 has 4 including the "none" branch. The draft specified three Case 1 decisions and
  then never accounted for their branch sections at all.
- **D-30:** **D-4's "none" branch gets a body.** "No BIOS management" is the honest default for a
  Dell, HP or Lenovo fleet and is where the DFCI-is-unavailable-not-declined fact lands.
- **D-31:** **Each branch reconverges with a one-line routing sentence to the next Step.** STD-05
  D-05 permits non-converging forks; this is a sequential plan, so reconvergence is stated rather
  than left implicit.
- **D-32:** **[OWNER-RULED 2026-08-26]** **The recipe carries full Intune click-paths, and the length
  is accepted.** The draft's reason for omitting them was measurably false (D-01): the guides carry
  blade locations, not procedures, so the recipe is the only place in the whole chain a navigation
  path can live. Omitting them would ship an "Enterprise Update Plan" with no navigation anywhere for
  the four things RCP-01 says it delivers, and would manufacture a fresh template divergence in the
  phase that exists to close one.
  — **Reversibility:** reversible — adding or trimming click-paths is local prose work, but it is the
  single largest driver of the line budget (D-34).
- **D-33:** **The realistic line budget is 600 to 700 lines, not the draft's 380 to 450.** The draft's
  own estimate omitted the eight branch bodies entirely, and the click-path ruling adds to it.
  Measured comparators: shipped recipes are 242, 289, 328 and 301 lines. This artifact is roughly
  twice the class maximum and the plan must size waves accordingly rather than discovering it mid-
  execution.
- **D-34:** **Free-value (Case 3) prompts are permitted where the reader must pick a number.** The
  draft excluded Case 3 entirely, which is contradicted by recipe 04's two shipped free-value prompts
  and by the tenth Step's own content — a deferral or deadline range the admin must choose a value
  from is the textbook Case 3 shape.
- **D-35:** **`## Prerequisites` names the entitlement gates that decide which decisions are even
  open**, and must include the one the draft omitted: the Dell BIOS branch requires that devices do
  **not** already have a BIOS password set, which closes that branch for an existing fleet and is the
  likeliest reason a reader's chosen branch is unavailable.
- **D-36:** **`## Unsupported and Anti-Feature Callouts` carries plan-level anti-features only** — no
  tenant-specific ring sizes, dates or percentages; no approval-workflow tooling; and an explicit
  "this is not a per-platform procedure guide". Not a copy of the guides' own callout tables, which
  all of 05 through 08 already carry.
- **D-37:** **`## Verification` verifies that the plan is in place, one check per decision, across all
  five platforms.** The draft named only two anchors, both Windows and both outside the audited link
  roster. A Windows-only Verification section in a five-platform plan is the RCP-03 failure mode
  landing in the section whose job is to prove the plan exists.
- **D-38:** **`## Configuration-Caused Failures` is authored, and its Runbook column is decided.**
  `[REFEREE]` The draft asked zero of its 71 questions about this section, though it is one of eight
  class H2s and `V-136-FAILURESTABLE` pins its row count in recipe 04. Measured: the update domain has
  **no** L1 or L2 runbook coverage at all, so the template's `Runbook` column cannot be filled the
  usual way. Recipe 04's precedent fills it with intra-recipe step anchors, which must be reconciled
  with the D-21 anchor scheme.

### Rollback/Recovery

- **D-39:** **Prose with one bold pseudo-heading per mechanism**, matching what recipes 03 and 04
  ship in this same section. Recorded honestly: this **declines** research item X-9, a prioritised
  "no-rollback summary table", and the draft's stated reason (that a table "flattens you-cannot into
  a cell") is an unevidenced aesthetic claim contradicted by its own source, which is itself a
  three-column table. The choice stands on house precedent, not on that argument.
- **D-40:** **STD-05 D-04 rule 2 does not bind this section.** It scopes *branch bodies*, so a table
  would have been permitted. Recorded so a successor does not think a constraint drove D-39.
- **D-41:** **The opening sentence states the true count, not "most".** Research says the truthful
  answer is "you cannot" for **four** of the nine mechanisms — the driver update, the Autopatch driver
  mode switch, Enterprise App Catalog auto-update, and Current Channel. Shipping "most" would put a
  false quantifier in the first line of the section RCP-04 designates as the milestone's flagship
  honesty artifact.
- **D-42:** **All nine mechanisms appear, and the nine-versus-six relationship to RCP-04 is stated.**
  RCP-04 enumerates six absences; research lists nine mechanisms. The three extras — DFCI, the Dell
  BIOS password, and Linux `unattended-upgrades` — are precisely the ones with documented recovery
  paths, which is the arithmetic that makes D-41 true.
- **D-43:** **The Linux entry is written as an open gap, not as a sourced absence.** The research
  row's Confidence column is **empty**, uniquely among the nine rows, and its `[PREMISE]` tag prefixes
  the whole cell — there is no "sourced half" to promote to fact, as the draft assumed.
- **D-44:** **`05-linux-update-delivery.md` is NOT cited as support for a rollback claim.** Measured:
  that file contains zero matches for all seven of `rollback`, `roll back`, `recover`, `revert`,
  `downgrade`, `snapshot` and `apt pin`. Citing it would be an unsourced claim wearing a citation.
- **D-45:** **The two RCP-04 flagship absences are expanded** — the default Microsoft 365 Apps channel
  having no rollback at all, and hotpatch uninstall requiring the very restart hotpatch exists to
  avoid. Ordering is worst-first, and hotpatch's placement respects that it *has* a documented
  uninstall path.
- **D-46:** **"Not applicable" is not silently rewritten as "no rollback at all".** The source table's
  Rollback-support cell reads "Not applicable"; the recipe's stronger phrasing is an inference and is
  attributed as one rather than presented as a quotation.

### Template divergence — RCP-05

- **D-47:** **[OWNER-RULED 2026-08-26]** **Promote `## Rollback/Recovery` into the template AND
  retrofit recipes 01 and 02**, so the class is genuinely uniform at 5-of-5. This is the option the
  draft foreclosed with a backwards constraint (D-03). Promoting alone would invert an additive
  2-of-4 divergence into a 2-of-5 mandated-section gap that a future auditor reads as two violations,
  permanently grandfathered by a disclaimer.
  — **Reversibility:** costly — it edits two shipped Approved documents; both need their
  `last_verified` and `review_by` re-stamped, and recipe 02's four content needles must survive.
- **D-48:** **Recipes 03 and 04 are not touched.** Their line-count pins (328 and 301) and
  `V-136-H2SKELETON`'s exact 8-element H2 order make any edit an immediate red.
- **D-49:** **The insertion point is between `## Verification` and `## Configuration-Caused
  Failures`** — not eyeballed from the two shipped files but machine-enforced by
  `V-135-ROLLBACKORDER` and `V-136-H2SKELETON`, which already pin exactly that position.
- **D-50:** **[OWNER-RULED 2026-08-26]** **Only `## Rollback/Recovery` goes into the template. The
  reversibility/platform marker line does NOT.** RCP-05 is scoped to the Rollback divergence alone;
  the marker line is a same-session, un-ratified convention, and pushing it into the file every future
  recipe copies is scope creep past the requirement.
- **D-51:** **The promoted section's placeholder is prose-only, with no bracketed markdown link.**
  `[REFEREE]` C13 asserts a hard equality of exactly 15 allowlist entries and exactly 9
  `template_placeholder` entries, none of which name `recipe-template.md`. A link in the new
  placeholder could not be absorbed by the sidecar without breaking a hard equality inside an apex
  member.
- **D-52:** **The template change is its own commit**, separate from the recipe content commit —
  `docs/_templates/` is a different blast radius and C17 applies template-specific rules to it.
- **D-53:** **The `TEMPLATE-SENTINEL` line is untouched.** `check-phase-129.mjs` asserts its presence,
  and the sentinel is what makes C17 skip assertions #9 and #12 on the template.
- **D-54:** **Promotion is safe against every live gate, and this was verified rather than assumed.**
  The template *is* C17-enrolled (it carries a `doc_id` key), so the draft's one-validator check was
  the wrong question — but working all eleven non-skipped assertions individually shows a new late H2
  breaks none of them. `## Summary` remains the first H2 and the Summary word-count window still ends
  at `## Prerequisites`.
- **D-55:** **The divergence entry is closed in `.planning/milestones/v1.19-DEFERRED-CLEANUP.md` by
  flipping its Status line**, which sits *outside* the file's verbatim-transcription block. The file's
  own Correction of Record names in-place editing as "a live option a successor could take". Editing
  it adds zero marginal CI exposure — that workflow already fires on the close PR through other path
  entries and runs weekly on a cron against live HEAD.
- **D-56:** **A successor tracking entry is opened for anything the promotion leaves unresolved**, so
  the closure does not mask residue. With D-47's retrofit there should be none; if the retrofit is
  descoped at plan time, the 2-of-5 gap must be tracked, not grandfathered silently.

### Synthesis, sourcing and links

- **D-57:** **The governing rule** — restate the decision and its consequence in the recipe; link the
  guide for the mechanism's full treatment. With D-32 the recipe also carries the click-path, so a
  reader can execute the plan from this document and opens a guide for depth, not for basic
  navigation.
- **D-58:** **Per-claim evidence lines follow the milestone's own convention, not the older recipe
  convention.** FIX-10 makes "per-claim evidence lines citing sources dated after the event each
  claim describes" a v1.21 requirement, and **every** guide this recipe synthesises carries them —
  measured across the fourteen files, roughly 212 `**Source:**` lines. The draft cited only guide 06's
  64 as an outlier and chose the pre-FIX-10 sparse-tag convention without naming FIX-10 at all.
- **D-59:** **The AF-6 numeric ranges are tagged `[SOURCED, search-summary]` or dropped — never shipped
  as bare first-party figures.** Research labels them as relayed through a search summary of a page
  that was never fully fetched, and this phase runs **no external research pass**, so nobody re-fetches
  them. Shipping them untagged is the fabricated-citation shape this milestone has already been burned
  by.
- **D-60:** **The "expedite restart 0-2d" range is DROPPED.** Measured: `expedit` appears twice in the
  entire corpus, neither hit about restart grace. The recipe would be originating the number, not
  restating it. Consequence to carry: the expedite rollback mechanism has no guide to link, so its
  `## Rollback/Recovery` entry cites RCP-04 directly and states the absence of corpus coverage.
- **D-61:** **The ranges that DO verify are restated with their dash fidelity preserved** — the corpus
  uses an en-dash for paraphrased ranges and a hyphen for the two that sit inside verbatim Microsoft
  quotes. Restating a quoted range outside quotation marks strips the marking that made it safe.
- **D-62:** **`01-windows-wufb-rings.md` is in the link roster.** The draft omitted it entirely, yet it
  sources hotpatch-enabled-by-default, hotpatch's absent automatic rollback, and ring topology itself —
  RCP-01's first named deliverable and half of RCP-02's corrected positions. The draft routed D-2 to a
  *licensing* anchor in guide 07 for a claim that guide does not contain.
- **D-63:** **D-7 gets outbound targets.** `02-macos-update-enforcement.md`,
  `03-ios-update-lifecycle.md` and `04-android-patch-delivery.md` were absent from the roster, the
  path shapes and the See Also list — a five-platform plan that never links three of the five
  platforms' guides fails SC#1 and SC#5 in substance.
- **D-64:** **The DCU-versus-Autopatch conflict routes to `firmware-bios/02-dell-bios-configuration.md`,
  not to guide 06**, which contains zero Dell Command content. It is named as an unadjudicated conflict,
  one clause, and is not resolved — it has no first-party adjudication.
- **D-65:** **Every reference uses a full relative path; numeric-prefix shorthand is barred.**
  `[REFEREE]` Two different `05-` documents live in this link web — the new recipe and
  `patch-management/05-linux-update-delivery.md` — and the draft's own facts block used a `07#anchor`
  shorthand that is not a valid link. Three distinct path shapes are needed:
  `../operations/patch-management/`, `../operations/firmware-bios/`, and `../reference/`.
- **D-66:** **`## See Also` is sized to the class**, measured at 5, 6, 6 and 6 entries in the shipped
  recipes rather than the draft's proposed nine, and its membership is reconciled with the decision
  link roster — the draft implied two different five-file sets in two different answers.
- **D-67:** **No back-links from any operations guide or from recipes 01-04 to this recipe.** For 03
  and 04 this is forced by their line-count pins. Guide-level back-links are genuinely unowned by any
  phase — Phase 152 SC#4 names only the docs index and the operations index — and are recorded as a
  deferred idea rather than silently absorbed here.

### Frontmatter, filename and handoff

- **D-68:** **Filename `docs/recipes/05-enterprise-update-plan.md`.** This breaks the 4/4
  device-end-state naming convention, and is defensible only because D-04 amends the class definition.
  Without that amendment it would be an unjustified divergence.
- **D-69:** **The platform frontmatter value is `all`**, rendering `All Platforms` in the header
  block. The objection that
  every `platform: all` file is an index or hub is false — measured, roughly 25 files carry it,
  including capability matrices, `windows-vs-macos.md` and two 802.1X guides.
- **D-70:** **The recipe is RE-227, Approved, and doc type Guide.** RE-226 is the highest
  allocated id and has no registry row yet; the in-milestone precedent is `firmware-oem-matrix.md`,
  which carries `RE-226` and `Approved` with its row deferred to Phase 152. The registry-max
  allocation method is unsafe during this deferral window and would yield a collision — allocate from
  the maximum across the registry **and** the enrolled corpus.
- **D-71:** **[OWNER-RULED 2026-08-26]** **`last_verified` is the authoring date and `review_by` is
  authoring date + 60 days**, matching FIX-10's ratified in-milestone cadence, which all fourteen
  guides authored in 146-150 follow exactly. This supersedes the draft's fabricated earliest-source
  scheme (D-01) and needs no new convention, no template edit and no lower-bound guard.
  — **Reversibility:** reversible — a frontmatter date pair, though it must be re-stamped if execution
  crosses a milestone boundary.
- **D-72:** **The date pair is decided together, and the owner key is set.**
  `[REFEREE]` The draft fixed `review_by` absolutely while never setting the value it is relative to,
  and walked eight frontmatter keys while skipping `owner`, which C17 assertion #8 requires non-empty.
  All four shipped recipes carry `owner: Intune Admin Lead`.
- **D-73:** **Frontmatter key order follows the template scaffold**, which already encodes the
  standard's mandated order.
- **D-74:** **No `> **Platform applicability:**` blockquote.** That is the operations-guide convention.
  This is also enforced more broadly than the draft realised: `V-54-27` is a corpus-wide negative that
  scans `.planning/` as well as `docs/`.
- **D-75:** **The hand-forward carries the RULE, not just a row — and it goes to BOTH Phase 152 and
  Phase 153.** `[REFEREE]` Phase 152 receives the registry row with its Title **verbatim from the H1**
  (the registry Title column is the sole source of the `.docx` output filename), plus the instruction
  that the filename map is regenerated by its generator and that **both** canary targets are recomputed
  from the registry after the rows land, never hard-coded from a document count. Phase 153 — which
  authors the leaf validators for Phases 145 through 152 — receives the needle-spec for
  `check-phase-151.mjs`. The draft handed one pipe-delimited row with a placeholder title to Phase 152
  and gave Phase 153 nothing.

### Gates and verification

- **D-76:** **C11 binds this recipe and is defended deliberately.** `[REFEREE]` The v1.20 milestone
  audit's C11 ops-domain anti-pattern check is BLOCKING, sits inside the apex chain, and walks
  `docs/` **live** — not a frozen tree — with a four-pattern fallback that includes a literal
  `Autopatch rings` pattern and no sidecar override. A recipe whose first decision is "Autopatch
  groups versus standalone rings" is the most likely new C11 hit in the corpus. Defenses: never write
  `SCCM` (write `Configuration Manager`), and keep any `Autopatch rings` string inside the
  ±200-character allowlisted-keyword window. The draft checked `check-phase-54`'s scoping, concluded
  "recipes are unbound", and never looked at the gate that actually binds.
- **D-77:** **Phase 151 runs the link checker and the apex chain by hand, and the plan says so.** SC#5
  requires every outbound link to resolve; the checker has no standalone CI execution site, so
  coverage arrives only through the apex chain. No draft answer assigned the run, which is exactly how
  a success criterion gets graded against an unrun gate.
- **D-78:** **The apex chain is run separately from the verifier**, per the standing lesson that a
  prose or link change can trip a gate a passing verifier does not exercise.
- **D-79:** **The expected C17 corpus count is stated as a number.** The corpus measures 235 enrolled
  files at 0 violations today; this phase takes it to 236. Phase 150 tracked its equivalent transition
  explicitly and this phase does the same.
- **D-80:** **SC#5's link audit covers every outbound link, not just the decision roster.** The draft
  verified ten targets and left the See Also entries, the per-branch links and the Verification links
  unaudited.
- **D-81:** **`RECIPE-OUTBOUND-LINK-COVERAGE` is NOT fired by this phase and is left carried.** Its
  trigger is conjunctive — "a fifth or later recipe lands **and** the coverage gap becomes an
  operational cost" — and the entry names a future tooling milestone as its home. Recorded because a
  Finder read the trigger with the conjunct elided and concluded the opposite.

### Claude's Discretion

Prose wording throughout; the exact Summary sentence satisfying D-06 and D-07; which four to six
claims carry inline confidence tags beyond the FIX-10 evidence lines; wave decomposition and commit
granularity within the D-52 two-commit constraint; the precise `<a id>` slug strings; the ordering of
mechanisms inside `## Rollback/Recovery` beyond the worst-first rule; whether the reversibility enum
definition sits in `## Summary` or its own block, subject to D-15.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements and roadmap
- `.planning/REQUIREMENTS.md` — RCP-01 through RCP-05 (the five requirements), FIX-10 (the 60-day
  cadence and the per-claim evidence-line convention), INT-01/INT-04 (what belongs to Phase 152)
- `.planning/ROADMAP.md` — Phase 151 goal, dependencies, five Success Criteria, blast radius; Phase
  152 and Phase 153 sections for the handoff boundaries
- `.planning/STATE.md` — the v1.21 dependency summary and the DISCUSS-PHASE-FLAGS named decisions

### Standards that bind the artifact
- `docs/_standards/EEE-SOP-standard.md` — STD-05 Admin Decision-Point Block Format (D-01 composite
  shape and the two enumerated column sets, D-02 mandatory blank line, D-03 case boundary, D-04 the
  three normative rules, D-05 branch idiom, D-06 Summary end-state); the D1 Platform Normalization
  Map; the C17 13-assertion list; the Doc Type Taxonomy D-02 edge-case ruling for `docs/recipes/*`.
  **This file is amended by this phase per D-04 and D-05.**
- `docs/_templates/recipe-template.md` — the doc-class definition (lines 2-3), the +90 day rule
  (line 5), the click-path instruction, the two MUST-level authoring rules, the H1 shape (line 47),
  the Summary frame (lines 51-53). **This file is amended by this phase per D-47 and D-50.**

### Research this recipe synthesises
- `.planning/research/FEATURES.md` §5.1 (measured doc-class shape), §5.2 (the nine decision points
  D-1 through D-9 with branches, consequences and ratings), §5.3 (the nine Rollback/Recovery
  mechanisms), F-6 (the template divergence), AF-6 (the ranges and their search-summary provenance),
  X-9 (the declined no-rollback table)
- `.planning/research/SUMMARY.md` — the Pillar F scoping and the corrected D-1/D-2 positions

### Guides the recipe cites (all nine decisions plus the tenth Step)
- `docs/operations/patch-management/00-overview.md` — cross-platform routing; the verified deferral
  and driver-deferral ranges
- `docs/operations/patch-management/01-windows-wufb-rings.md` — ring topology; hotpatch enabled by
  default; hotpatch's absent automatic rollback **(omitted from the draft, added by D-62)**
- `docs/operations/patch-management/02-macos-update-enforcement.md`,
  `03-ios-update-lifecycle.md`, `04-android-patch-delivery.md` — D-7's enforcement primitives
  **(omitted from the draft, added by D-63)**
- `docs/operations/patch-management/05-linux-update-delivery.md` — D-8; note D-44, it carries no
  rollback content
- `docs/operations/patch-management/06-windows-driver-firmware-updates.md` — D-3 approval modes; the
  verified deadline and grace ranges; reporting
- `docs/operations/patch-management/07-windows-autopatch.md` — D-1 Autopatch groups and the Test/Last
  model; reporting
- `docs/operations/patch-management/08-windows-app-updates.md` — D-5 M365 channels; D-6 Enterprise
  App Management; the Windows-only channel quotation
- `docs/operations/firmware-bios/00-overview.md` and `01-windows-dfci.md` — D-4 routing and DFCI
- `docs/operations/firmware-bios/02-dell-bios-configuration.md` — the Dell branch, the BIOS-password
  precondition, and the DCU conflict target **(per D-64)**
- `docs/operations/firmware-bios/03-hp-bios-configuration.md`, `04-lenovo-bios-configuration.md` —
  the vendor-connector branch
- `docs/reference/firmware-oem-matrix.md` — the D-4 capability transposition

### Shape precedents
- `docs/recipes/03-windows-11-multi-app-kiosk.md` and `04-android-dedicated-mhs-multi-app.md` — the
  two recipes carrying `## Rollback/Recovery`; hard-pinned, never edit
- `docs/recipes/01-shared-windows-avd-client.md` — the `### Step 5a` / `### Step 5b` sibling-branch
  idiom (D-28) and the D-06 end-state exemplar; **retrofit target per D-47**
- `docs/recipes/02-shared-ipad-full-provisioning.md` — **retrofit target per D-47**

### Gates
- `scripts/validation/c17-eee-contract.mjs` — the 13 assertions; enrollment by `doc_id` presence
- `scripts/validation/check-nav-hub-links.mjs` — corpus-wide link and anchor checker, no allowlist,
  `<a id>` recognised verbatim, `{#id}` deliberately unsupported
- `scripts/validation/v1.20-milestone-audit.mjs` — **C11 ops anti-pattern (D-76) and C13's
  15/9 allowlist equality (D-51)**, both BLOCKING apex members
- `scripts/validation/check-phase-129.mjs` (template pins), `check-phase-131.mjs` (recipe 02 needles),
  `check-phase-135.mjs` (recipe 03 line count, `V-135-ROLLBACKORDER`, `V-135-RECIPE01ZEROEDIT`),
  `check-phase-136.mjs` (recipe 04 line count, `V-136-H2SKELETON`, `V-136-BREAKSCALLOUT`,
  `V-136-FAILURESTABLE`), `check-phase-54.mjs` (`V-54-07` scope, `V-54-27` negative)
- `.planning/milestones/v1.19-DEFERRED-CLEANUP.md` — the `ROLLBACK-RECOVERY-DIVERGENCE-COUNT` entry
  closed by D-55
- `.planning/milestones/v1.20-DEFERRED-CLEANUP.md` — `RECIPE-OUTBOUND-LINK-COVERAGE`, left carried
  per D-81

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- The STD-05 composite decision block, shipped fourteen times across four recipes — the recipe reuses
  the shape verbatim and adds only the D-10 marker line
- Recipe 01's `### Step 5a` / `### Step 5b` sibling-branch idiom — the only shipped solution to the
  D-04 rule 3 heading-depth constraint, reused directly by D-28
- The operations guides' hand-authored `<a id>` convention, eight per guide — reused for decision
  anchors by D-21, which is a divergence for the recipe class and is recorded as one
- Phase 150's `## Phase 152 hand-forward` SUMMARY section — the four-item shape D-75 follows

### Established Patterns
- C17 enrollment is opt-in by `doc_id` presence, so adding the key enrolls the file and all thirteen
  assertions fire from that moment
- A doc may carry `status: Approved` and a `doc_id` while its registry row lands a phase later — the
  in-milestone precedent is `firmware-oem-matrix.md`
- Content phases never touch the registry, the filename map or the canaries; that is one atomic
  Phase 152 commit
- Predecessor frozen surfaces stay byte-unchanged; a later validator can pin an earlier one's exact
  call-site string, so grep before editing any frozen validator line

### Integration Points
- Phase 152 consumes the D-75 registry row, the filename-map regeneration rule and the both-canaries
  rule; it also wires the docs index and the operations index
- Phase 153 consumes the `check-phase-151.mjs` needle-spec and chains this phase into the apex
- The amended `docs/_standards/EEE-SOP-standard.md` and `docs/_templates/recipe-template.md` become
  the contract every future recipe reads

</code_context>

<specifics>
## Specific Ideas

- The recipe is the corpus's first configuration artifact, and after D-32 it is also the only place
  in the whole update chain where a full navigation path exists. That is the artifact's distinguishing
  value, not an incidental property.
- `## Rollback/Recovery` is the milestone's flagship honesty section. It must be true before it is
  impressive: four of nine mechanisms have no rollback, and the section says four, not "most".
- The two corrected positions are restated in full in the recipe rather than linked, because a reader
  who follows only the link would get the plan wrong: an Autopatch group **contains** update-ring
  policies rather than excluding them, and hotpatch is **enabled by default**, is not x64-only, and
  requires VBS on Windows 11 Enterprise.

</specifics>

<deferred>
## Deferred Ideas

- **Guide-level back-links from the operations guides to Recipe #5** — genuinely unowned; Phase 152
  SC#4 names only the docs index and the operations index. Belongs to a future navigation pass, not
  to this phase.
- **Re-stamping `docs/operations/app-lifecycle/00-overview.md`** (`review_by: 2026-06-27`, 60 days
  past due) — needed before that file can join any See Also set, but out of scope here.
- **`RECIPE-OUTBOUND-LINK-COVERAGE`** — carried forward unchanged; its conjunctive trigger is unmet
  and its recorded home is a future tooling milestone that gives `check-nav-hub-links.mjs` a real
  standalone CI execution site.
- **L1/L2 runbook coverage for the update domain** — measured as absent, which is why D-38's Runbook
  column cannot be filled the conventional way. Authoring those runbooks is its own phase.
- **Google style application to the recipe class** — the skill and tooling are vendored and the
  adoption decision is recorded, but the corpus rewrite never landed and `check.py` cannot gate.
  Applying it to one new document while 235 others diverge is a corpus-wide decision, not a
  phase-151 one.

</deferred>

---

*Phase: 151-recipe-5-the-enterprise-update-plan*
*Context gathered: 2026-08-26*
