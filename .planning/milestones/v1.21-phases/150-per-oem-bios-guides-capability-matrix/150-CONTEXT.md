# Phase 150: Per-OEM BIOS Guides & Capability Matrix - Context

**Gathered:** 2026-08-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Three per-OEM BIOS guides — Dell, HP and Lenovo — authored to one identical section shape under
`docs/operations/firmware-bios/`, plus an enrolled capability matrix at
`docs/reference/firmware-oem-matrix.md` that is a genuine transposition of those guides rather than a
second artifact that drifts. Requirements BIOS-05, BIOS-06, BIOS-07, BIOS-08, BIOS-09, BIOS-10 and
BIOS-12.

**This phase also owns**, by explicit hand-forward from 149 D-26 and D-65, the outbound links from
`00-overview.md` to the three new guides, the correction of that file's now-false sentence, and any
correction to a custody position the plan-time re-fetch falsifies.

**Not this phase:** the matrix's registry row, filename-map rows, ops-index rows and `docs/index.md`
entry (all Phase 152, INT-01/INT-04); `check-phase-150.mjs` (Phase 153, HARN-04 — content phases hand
off a needle-spec only); Recipe #5 (Phase 151); any edit to `01-windows-dfci.md` or to
`patch-management/06-windows-driver-firmware-updates.md`.

**How this context was produced.** A 45-question grill draft was subjected to a five-Finder / Adversary
/ Referee adversarial review. **149 raw findings → 120 net distinct → 34 disproved → 86 surviving**,
plus 6 the Referee raised that no Finder had. The review **reversed four of the draft's own
recommendations** and found **three requirements carrying essentially zero decisions**. Four rulings
below are the owner's.

</domain>

<decisions>
## Implementation Decisions

Evidence labels: `[MEASURED]` = a command run this session · `[INHERITED]` = a locked 149-CONTEXT
decision, carried not re-derived · `[REVERSED]` = the draft's answer was overturned by the adversarial
review · `[OWNER-RULED 2026-08-25]` = the owner decided · `[PREMISE]` = inference, not measured ·
`[UNVERIFIED]` = open, must close at plan time.

### The deliverable shape

- **D-01:** **[OWNER-RULED 2026-08-25]** **The guide shape is SIX capability H2s, not five, present in
  all three guides** — `## Delivery`, `## Authentication`, `## Scope`, `## Prerequisites`,
  `## Offboarding and Loss of the Management Plane`, `## Recovery` — followed by the two inherited tail
  H2s. BIOS-09's whole content (Dell's subscription-end trap, HP's 30-day countdown, the orphaned
  Remediations, the fleet-first ordering) is **offboarding**, which is none of the five sections SC#1
  names; the Dell `C:\ProgramData\Dell` ACL trap is a second homeless class in the same shape. Lenovo's
  sixth section states the **structural absence** — Lenovo has no vendor management plane to lose, which
  is BIOS-01's own discriminator — so "identical" stays true across all three.
  — **Reversibility:** one-way — this amends SC#1 and BIOS-05 from "five-section" to "six-section", and
  the H2 set becomes slugs Phase 151 and Phase 152 match byte-for-byte (146 D-39, 148 D-16).
- **D-02:** **The SC#1 / BIOS-05 amendment is FILED, not assumed.** Phase 150 writes the amendment into
  `.planning/REQUIREMENTS.md` as an evidence-carrying entry naming D-01 as its ground, exactly as 149
  D-05 filed its SC#4 registration-path premise amendment. A shape that contradicts the shipped
  requirement text without a filed amendment is what the milestone audit grades as drift.
- **D-03:** **The three filenames are `02-dell-bios-configuration.md`, `03-hp-bios-configuration.md`
  and `04-lenovo-bios-configuration.md`.** `[INHERITED]` D-21 locks the `02-dell-*` / `03-hp-*` /
  `04-lenovo-*` vendor-first prefix and D-22 records the naming flag discharged, so the corpus's
  `NN-<platform>-<topic>` habit is already overridden by an inherited decision — only the suffix was
  open, and the deliverables line shipped a literal wildcard. Phase 152's filename-map and registry rows
  and Phase 151's links key on exact paths, so it is decided here.
  — **Reversibility:** one-way — a rename after 152 breaks published `.docx` output filenames.
- **D-04:** **The matrix is `docs/reference/firmware-oem-matrix.md` with H1 `# Firmware OEM Capability
  Matrix`.** `[MEASURED]` C17 assertion 2 requires exactly one H1 after the header block and assertion 3
  bars a bare `RE-NNN` H1. That H1 string enters D-23's Title-collision space and is re-checked at plan
  time against Phase 151's planned Titles.
- **D-05:** **The matrix H2 skeleton is `## Summary` first, then the six guide H2s in D-01's order, then
  `## Key Gaps Summary`, `## Source Attribution`, `## See Also`, `## Version History`.** `[MEASURED]`
  C17 assertion 4 requires `## Summary` be the **first** H2 with no H3 between the header block and it,
  and assertion 5 requires it carry at least 30 words.

### Matrix conventions the draft measured away

- **D-06:** `[REVERSED]` **`## Source Attribution` is MANDATORY, not declined.** The draft rejected it
  as *"1-of-26, not a convention."* `[MEASURED]` that one is `aosp-oem-matrix.md:97` — the corpus's
  **only** OEM matrix and the file the draft itself elects as its structural precedent, sitting between
  `## See Also` at `:87` and `## Version History` at `:109`, which is exactly the span the draft's
  precedent summary omitted. Its own Version History records why it exists: *"`## Source Attribution` H2
  per D-15 (per-OEM pins outside tables); cell-value rules literal-strings only per D-16."* You cannot
  import D-16's literal-string cell rule (D-19 below) and delete the mechanism that carries the pins —
  least of all in a phase whose three headline cells are documented silences.
- **D-07:** `[REVERSED]` **Every capability table is followed by a table-summary blockquote**, in the
  corpus's own `> **Table summary:**` form.
  `[MEASURED]` `grep -c "^> \*\*Table summary:\*\*" docs/reference/*.md` = 4-platform 7 · android 7 ·
  **aosp 4** · ios 6 · linux 9 · macos 8 = **41 instances across 6 of 7 matrices**, including the chosen
  precedent, on tables of about five rows. It is a house convention, not a validator rule. The draft
  concluded there was "no prose-summary requirement" purely because it read C17 and stopped.
- **D-08:** `[MEASURED]` **C17 assertion 11 is irrelevant to this file and must not be cited as the
  ground for D-07.** `c17-eee-contract.mjs:345-384` fires only above 25 data rows, and it counts the
  **header row** (only `/^\|[-: |]+\|$/` separator rows are excluded), so the real threshold is 25 data
  rows plus a header. Three-OEM tables sit far under it. The draft stated the threshold as "more than 25
  data rows", which is wrong by one row.
- **D-09:** `[MEASURED]` **There is no file-level blockquote budget.** `c17-eee-contract.mjs:389-408`
  walks each run of consecutive `^>` lines **independently** and joins it with `bqLines.join(' ')` before
  the 200-character comparison. Adding a blockquote costs nothing against any other blockquote, so the
  draft's "consume blockquote budget" argument is void.
- **D-10:** **Long quotes still live in the guides, but on the real ground.** `[MEASURED]` five
  load-bearing strings exceed the 200-character cap in their bare shipping form — Dell Master Password
  Lockout 259, HP 30-day countdown 258, HP partial-removal 253, HP orphaned Remediations 202, HP
  lockout-on-mismatch 374 — and `[MEASURED]` `grep -rln "doc_id" docs/operations/firmware-bios/` returns
  zero, so the guides are unenrolled and uncapped. The cap is **not** a structural bar on quoting in the
  matrix: C17 assertion 12 matches only `/^>/` at column 0, so inline quoted prose, a footnote
  (`aosp-oem-matrix.md:85` ships a 300-plus-character one) or two blockquotes split by a blank line all
  escape it. The policy stands; the draft's stated reason for it did not.
- **D-11:** `[MEASURED]` **Quote lengths are measured in the BARE `>` form, which is what ships.**
  `grep -rn '^> \*"' docs/` = 0 — the corpus has never shipped an emphasis-wrapped blockquote, and
  `00-overview.md:44`, `:52` and `:66` are all bare. Two strings sit near the line with no margin (HP
  hardware floor 197, HP Endorsement Key definition 169) and D-38's re-fetch may move either across it,
  so re-measure after fetching, never before.
- **D-12:** `[REVERSED]` **The C1-5 *"OS features gated by this setting"* column LANDS, with its
  cross-links.** The draft declined 149 D-14's hand-forward on the ground that C1-5 is a DFCI artifact.
  `[MEASURED]` `PITFALLS.md:284-292` defines C1-5 as *"Firmware/BIOS settings that silently gate later OS
  features"* with three chains — virtualization to VBS to Hotpatch and Credential Guard, Secure Boot to
  attestation, TPM to Autopilot attestation. **None is DFCI-specific**; DFCI appears only as one instance
  at `PITFALLS.md:905`. All three are settings Dell's `.cctk` template, HP Sure Admin and BCU, and Lenovo
  TBCT V2 configure, so the column has three non-empty cells, not zero. C1-5's prescribed cross-links
  come with it — D-45 selects `docs/decision-trees/03-tpm-attestation.md` as the chosen target.
- **D-13:** **`## See Also` carries six links** — the three guides, `00-overview.md`,
  `01-windows-dfci.md`, and D-12's TPM target. `[MEASURED]` `aosp-oem-matrix.md`'s See Also is a full
  inventory (five per-OEM guides plus the sibling matrix plus the scope stub), not a minimal one.
- **D-14:** **`## Key Gaps Summary` ships as TWO labeled enumerations — capability absences, and
  documentation silences.** `[MEASURED]` in all four platform matrices that H2 is a numbered list of what
  the platform **cannot do** (*"No device-level Conditional Access"*, *"No zero-touch enrollment"*).
  Filing "Lenovo does not document password recovery" into an undifferentiated list of that kind converts
  silence into incapacity by section placement — the argument-from-silence conversion 149 D-43 exists to
  prevent, executed by layout and invisible to every gate. Deleting the H2 instead would cost SC#1's
  prominence, so the fix is the labeled split, not removal.
- **D-15:** **`## Scope` sits third, in D-01's order, and the sibling deviation is not a deviation.**
  `[MEASURED]` only `aosp-oem-matrix.md` places a `## Scope` H2 immediately after `## Summary`; linux and
  macos go straight to capability H2s. And aosp's `## Scope` is a *document*-scope reminder, not a
  capability dimension, whereas this matrix's `## Scope` is the guides' scope-of-control capability. There
  is no convention being departed from.
- **D-16:** **The matrix does NOT restate the overview's custody table.** Custody is one column inside
  `## Authentication`. This is a judgement call, not a measured rule — `[PREMISE]` that a column is
  sufficiently different from a table to avoid the duplication class.

### Matrix mechanics — frontmatter, enrollment and the registry split

- **D-17:** **Frontmatter ships in full, and one field is a hard failure if wrong.** `doc_id: RE-226` ·
  `status: Approved` · `owner` matching the sibling matrices · `doc_type: Reference` ·
  `platform: Windows` · `audience: admin` · `last_verified` = the commit-1 date · `review_by` = **+60**
  · **no `applies_to`**. `[MEASURED]` C17 assertion 8 requires `doc_id`, `status`, `owner`, `doc_type`
  and `last_verified`; assertion 10 is an explicit **hard failure with no fallback** on any `platform`
  value outside the 20-entry `D1_MAP` at `c17-eee-contract.mjs:26-47`; assertion 9 requires the header
  block's four fields byte-match frontmatter. The draft decided two of these seven.
- **D-18:** **The review cycle is +60, not the template's +90.** `[MEASURED]` `reference-template.md`
  instructs +90, `aosp-oem-matrix.md` ships 60, and `EEE-SOP-standard.md` runs 90. The live sibling
  matrix convention is 60 and the milestone runs 60. `[INHERITED]` D-63's warning applies only to
  `_glossary.md`'s legacy 90 — do not generalize it.
- **D-19:** **Cell values are literal strings, with a three-way vocabulary** — a sourced value,
  `Not documented by vendor` for a documented silence, and `n/a` for a structural absence. Per
  `aosp-oem-matrix.md`'s D-16, no `+` notation. Collapsing silence into `n/a` is the drift SC#1 exists to
  prevent. Evidence pins for the silence cells live in `## Source Attribution` (D-06), which is why
  declining that H2 was not survivable.
- **D-20:** **The matrix ships enrolled and Approved, with the registry row deferred to Phase 152.**
  Frontmatter carries `doc_id: RE-226` and `status: Approved`.
  `[MEASURED]` the registry holds 225 rows with max `RE-225`, so RE-226 is next free and no gaps exist.
  `[MEASURED]` C17 enrolls on `doc_id` plus a `docs/` path and never reads `RE-index.md`; no validator
  anywhere asserts doc_id-to-registry parity. `[MEASURED]` the live precedent is stronger than the
  absence-of-a-validator argument — `EEE-SOP-standard.md` is `doc_id: STD-001`, `status: Approved`,
  enrolled, **with no registry row today**. `[MEASURED]` all 8 `status: Draft` files in the corpus are
  templates, so shipping Draft would be unprecedented across 226 files and would force a second
  frontmatter edit in 152 for no gate benefit.
- **D-21:** **RE-226 is reserved by RULE, not by the number alone.** The plan recomputes
  `max(RE-NNN) + 1` at plan time and Phase 152 re-verifies before landing the row; Phase 151 takes the
  next id after this one. Nothing in the repo serializes id allocation — `[MEASURED]` both pipeline
  builders are registry-driven and neither reads the doc_id set. `[MEASURED]` 149 D-66's *"hand forward
  the RULE, never a number"* is scoped in its own sentence to the INT-03 canary, so reserving an id here
  does not violate it; the recompute rule is belt and braces.
- **D-22:** `[MEASURED]` **An Approved matrix with no registry row is SILENTLY EXCLUDED from the publish
  bundle until Phase 152.** `build-publish-bundle.mjs:520` filters `allRows.filter(r => r.status ===
  'Approved')` from `RE-index.md`, so the document simply is not in the `.docx` output and **nothing
  fails**. This is the accepted cost of BIOS-12's deferral, and it is recorded here so a verifier does
  not surface it as a defect.

### BIOS-07 — the requirement that had zero decisions

- **D-23:** `[NEW — the whole requirement carried essentially no decisions]` **HP Connect is written as
  a vendor connector, in five specific claims** — a cloud console administered at `admin.hp.com`;
  policies published into Intune device groups as Remediations over the Microsoft Graph API; Entra
  **Global Administrator** consent once, after which an **Intune Administrator** operates it;
  certificate and key-pair authentication through Sure Admin; and **no per-device agent**. The draft's
  four HP-adjacent questions decided a provisioning order, an F10 constraint, a currency caveat and
  **Dell's** consent grant — none of BIOS-07's clauses.
- **D-24:** `[NEW]` **Dell is written as the opposite pole, and that is what makes "not a Win32 agent"
  informative.** DCECMI **is** a per-device agent, and the research states the ordering constraint
  plainly — the agent must be installed **before** the policy is assigned. Without the Dell half stated,
  SC#3's discriminator has nothing to discriminate against.
- **D-25:** `[NEW]` **The HP Graph write scope ships QUALITATIVELY and the scope list is not invented.**
  Ship *"mostly read-only, with one write scope covering device configuration and policies"* as a claim.
  `[MEASURED]` the research records that the HP Connect guide's Appendix C is screenshots with no text
  layer and that grepping the raw extraction for `DeviceManagement*`, `Directory.Read*` and `Group.Read*`
  returned **zero** matches. U-4 is therefore closed as unobtainable, not left open.
- **D-26:** `[NEW]` **The HP license floor ships in Prerequisites with a link to the licensing matrix.**
  The subscription must permit Remediations, at an E3/A3 or E5/A5 class level. `docs/reference/licensing-matrix.md`
  exists and is enrolled, so this is a link-not-copy case and the matrix is a live contradiction surface
  if the floor is restated rather than routed.
- **D-27:** **HP's script packages are named `HPConnectForMEM-<device group name>` and are found under
  Reports, Endpoint Analytics, Proactive Remediation.** This is the single most useful operational fact
  in the HP material — it is how a service desk answers *"where did this BIOS policy come from?"* in a
  tenant it did not build. It ships subject to D-33's naming rule.

### BIOS-09 — the second requirement that had zero decisions

- **D-28:** `[NEW]` **All four of BIOS-09's facts land in D-01's `## Offboarding` H2.** Dell — the
  subscription ends and there is no path to read or retrieve BIOS passwords, OEM contact only, therefore
  back the passwords up outside Intune. HP — account deactivation starts a 30-day countdown after which
  all policies and secrets are permanently deleted, reactivation inside the window needs a Global
  Administrator, and the orphaned Remediation scripts keep running in Intune and must be removed by hand.
  Lenovo — the structural absence.
- **D-29:** `[REVERSED]` **The two HP orders are DIFFERENT OBJECTS and are labeled separately.** The
  per-device key order is EBAM, then LAK, then Signing Key, then Endorsement Key. The **fleet-first**
  order is a different thing entirely — de-provision the fleet, *then* deactivate the HP Connect account.
  The draft supplied only the first and called it *"the de-provisioning order"*, which is exactly how the
  requirement-bearing one gets dropped.
- **D-30:** **[OWNER-RULED 2026-08-25]** **SC#3's "both paths carry the fleet-first order" is HP-only in
  the sources, and the mismatch is RECORDED, not papered over.** The research documents fleet-first for
  HP alone; Dell's subscription-end guidance is back the passwords up outside Intune, with no ordering
  stated anywhere. Writing a fleet-first order into the Dell guide to satisfy a literal reading of SC#3
  would be precisely the unsourced drift SC#1 bars. Each vendor's path ships with its own sourced
  content, cross-referenced to the other, and the SC-versus-research mismatch is filed as an accepted
  inconsistency using 149 D-68's instrument so the verifier does not grade it as a gap.

### BIOS-06 — the inverted-prerequisite pair

- **D-31:** `[REVERSED]` **The pair's home in the matrix is a 2×2 sub-table inside `## Prerequisites` —
  password-state as rows, Dell and Lenovo as columns.** The draft said *"a named row"*, which is not
  constructible: D-05 fixes matrix rows as the three OEMs, so a two-state pair cannot be one row. The
  research's own artifact is already that 2×2.
- **D-32:** **Three placements, and the third is the one SC#2 actually grades.** One sentence in the
  Dell guide's Prerequisites, one in Lenovo's, the 2×2 in the matrix, **and BIOS-06's own closing
  formulation — *Dell wants a virgin BIOS; Lenovo needs a provisioned one* — as the overview's
  cross-reference sentence.** SC#2 grades on the pair *reading as a cross-vendor decision point*; two
  halves in two files, neither stating the inversion, does not produce that reading.
- **D-33:** `[REVERSED]` **The draft's ground for keeping the pair out of the overview is DELETED.** It
  argued that BIOS-06 is a Phase 150 requirement so its home cannot be a Phase 149 file. That rule is
  invented — 149 D-25's actual complaint was role-based (four of five requirements landed in a file the
  draft insisted was a routing hub), the overview already carries BIOS-01 plus parts of BIOS-02 and
  BIOS-11, and the draft's own D-34 and D-36 put the overview in this phase's edit set anyway.
- **D-34:** **Both halves carry LITERAL grep needles, fixed here and asserted in the PLAN.** `[INHERITED]`
  D-60 and 147 D-68 require a runnable grep per prose negative. The draft supplied paraphrases; both
  halves are negatives whose surface form varies, so a paraphrase-level instruction yields a grep that
  passes on any wording, which is no gate at all.
- **D-35:** **HP is the third leg of the prerequisite story and it is not optional.** Dell refuses when a
  password already exists; **HP retries until the BIOS locks out**; Lenovo cannot bootstrap one remotely.
  The research's instruction is explicit — *both* guides need a survey-existing-BIOS-passwords step before
  anything is assigned. Framing the story as Dell-versus-Lenovo alone leaves the matrix's HP prerequisite
  cell undefined.

### Editing 149's shipped overview

- **D-36:** **[OWNER-RULED 2026-08-25]** **The HP cloud-vault quote is QUOTED in the HP guide and the
  overview's copy becomes a pointer.** `[MEASURED]` `00-overview.md:52` already ships *"Passwords are
  managed by HP Connect and stored in a cloud vault."* with its evidence line at `:54`, and `:66` ships
  the Lenovo Azure Key Vault quote. BIOS-07 and SC#3 require the HP line **in the HP guide, quoted
  against Dell's no-customer-data statement** — pointing does not satisfy "quoted against". So the guide
  carries both quotes with **two separate evidence lines**, and the overview is reduced to the custody
  claim plus a link. Same treatment for the Lenovo quote. Phase 150 owns that edit under D-65's
  falsification clause.
  — **Reversibility:** costly — it edits a file shipped and verified in the previous phase.
- **D-37:** `[MEASURED]` **The now-false sentence spans lines 128-130 of the overview, not 129-131.**
  In `00-overview.md`, line 128
  ends *"…Vendor-specific procedures for Dell, HP and"* and line 131 is blank. A `sed` edit written to
  the draft's cited range would leave a dangling sentence fragment and delete a blank line — a broken
  sentence shipping invisibly, since no validator reads prose. The edit count is **four to six sites**,
  not the draft's three: the false sentence, the `02/03/04` links (same physical site, per D-26's
  hand-forward), D-32's cross-reference sentence, two frontmatter fields, plus D-36's quote reduction and
  any custody correction D-40 triggers. 148 D-52 is headed verbatim `### 00-overview.md — touch 4 of 4`.
- **D-38:** **The overview also gains an outbound link to the matrix.** The domain's router must point at
  its own capability matrix; the draft enumerated links to `02/03/04` and never included the matrix.
- **D-39:** **Frontmatter authority is D-30, not D-69.** `last_verified` takes the execution date and
  `review_by` is +60 by arithmetic. `[INHERITED]` D-69 is a midnight-spanning tiebreaker, not a general
  rule, and the draft cited it as one. `[MEASURED]` D-30 also already closed the question the draft
  re-opened as `[UNVERIFIED]` — nothing enforces the 60-day interval on these files, because `V-54-07` is
  `PATCH_FILES`-scoped at `check-phase-54.mjs:35` and every one of those five is a `patch-management/`
  file.
- **D-40:** **The falsification diff is a named checklist with ONE owner, run at plan time.** Three
  claims are at risk — HP's cloud-vault custody, sourced to a 2022 PDF; the Lenovo Azure Key Vault
  superlative, which 149 shipped explicitly flagged as this corpus's own inference; and Dell's *"Intune
  stores the BIOS passwords"*, sourced to a Learn page updated 2026-07-01. If a re-fetch corrects any of
  them, **150 owns the correction to 149's overview** (D-65). The draft mandated this diff twice in two
  questions with no owner, which is how one gets run and the other considered discharged.
- **D-41:** **`01-windows-dfci.md` is not edited, and linking into it is not editing it.** `[INHERITED]`
  D-41 states *"linking is not editing"* verbatim. Nothing in BIOS-05 through BIOS-12 reaches `01`, and
  `[MEASURED]` `01:195` and `01:13` both already link to `00-overview.md`, so the domain has an onward
  path.
- **D-42:** `[MEASURED]` **Editing the 149 file is mechanically safe, and here is the proof the draft
  never supplied.** `grep -rn "firmware-bios" scripts/` = **0** — no validator, frozen-blob gate or
  hash pin touches this directory. `V-54-29`'s `OV` constant is `patch-management/00-overview.md` only,
  so 148 D-53's two silent leak modes (the em-dash description after a link, and a link wrapped across a
  newline defeating `/\[.*?\]\(.*?\)/g`) do **not** bind here. Recorded so a planner can tell "measured
  safe" from "never checked".

### The evidence regime

- **D-43:** `[REVERSED]` **ONE phase-wide fetch list, D-46-shaped, with an "On failure" disposition on
  every row.** The draft invoked D-46 correctly and then populated a list covering only the three
  recovery gaps — leaving **every other quoted string in the phase with no fetch obligation at all**,
  against an absolute inherited bar. Every string this phase ships inside quotation marks goes on the
  list: Dell KB 000180749, Dell KB 000140298, the Dell no-customer-data statement, the Learn
  `configure-bios-windows` page, the HP Connect User Guide, the HP SPM and CMSL developer pages, the
  Lenovo TBCT and LBCT pages, and the CDRT blog. Each row grades as *BLOCKS SC#N — escalate* or
  *non-blocking — state the absence*. `[INHERITED]` D-37 — no string ships inside quotation marks unless
  it was read from the live page at plan time — and D-52 — nothing ships from the research file inside
  quotation marks.
- **D-44:** `[REVERSED]` **The ThinkCentre statements are `[RELAYED]` and go on D-43's list.** The draft
  authorized shipping them *"as quotes or claims"*. The research's own trust table says `[RELAYED]` means
  re-verify before quoting, safe as an unquoted claim. Same treatment for the HTA-to-V2 INI breaking
  change and Dell's no-customer-data statement, all three `[RELAYED]`.
- **D-45:** **BIOS-07's mandated Dell contrast quote is quotable — the research says so.** It reads that
  the no-customer-data sentence *"is worth quoting in the guide specifically because it is the opposite
  of HP Connect's model."* There is no requirement-versus-research conflict here; there is only D-43's
  re-fetch obligation.
- **D-46:** `[INHERITED]` **D-56's real rule is carried, and the draft carried the wrong one.** One
  evidence line may cover one blockquote of contiguous quotes from **one page**; it may **never** span
  claims from different pages. This phase quotes seven-plus distinct vendor pages and SC#3 mandates two
  vendors' quotes juxtaposed in one place, which is the exact hazard. The draft instead characterized
  `146 WR-01` as a cross-file duplication precedent; it is a within-one-file mis-scoped-citation defect
  at `01-windows-wufb-rings.md:203-210`. 149 D-25 mischaracterizes it the same way, so the error was
  inherited rather than invented — but the real rule was carried nowhere.
- **D-47:** **Dates follow the source's own shape.** `[INHERITED]` D-51's `ms.date` plus `updated_at`
  pair is a **Learn** convention; vendor pages have no such pair and `[MEASURED]` 149 itself shipped
  single dates for exactly these sources at `00-overview.md:54` and `:68`. Record both dates where both
  exist, one where one exists, and never invent the second.
- **D-48:** `[INHERITED]` **Retrieval is `curl` with a browser User-Agent, tag-strip, literal grep**
  (D-50), pinned by surrounding heading and never by grep hit (D-53), with `[DIRECT]` and `[RELAYED]`
  markers applied (D-52). HP's developer portal returns 403 to WebFetch and 200 to `curl` with a browser
  UA — the research calls this its single most important methodological finding.

### Recovery gaps — U-1, U-2, U-3

- **D-49:** `[REVERSED]` **Two genuinely DISTINCT sources per gap, and the exhausted ones are named as
  spent.** The draft's U-1 second source was `docs.lenovocdrt.com/guides/lbct/` — which **is** U-2's
  entire list, and LBCT is the **certificate** tool, an implausible home for a lost **supervisor
  password** answer. U-1 goes to the Lenovo Support BIOS-password KB plus the TBCT V2 documentation.
  U-3's `developers.hp.com` **has already been fetched** with the browser UA — that is how the `[DIRECT]`
  SPM material was obtained — so it counts as spent and U-3's second source must be HP support or the
  Sure Admin whitepaper via a working TLS path.
- **D-50:** **U-6 is load-bearing AND unfetchable, so it gets an explicit closure rule.** It is
  load-bearing because `[MEASURED]` `00-overview.md:48-49` ships the claim that HP Connect is
  *"administered at `admin.hp.com` rather than in the Intune console"* — if HP Connect appears under
  Intune's Partner portals as Dell's does, U-6 falsifies a shipped 149 claim and fires D-65. It is
  unfetchable because the research's only named source is *"Live Intune admin center"*, which no agent
  here can open. **Closure rule** — one documented attempt against HP's own material, then ship 149's
  claim unchanged and record U-6 as open. It may not block.
- **D-51:** **U-8 does not block.** `[MEASURED]` 149's overview already carries the 2022-document
  currency caveat at `:56`, so a newer HP Connect guide would be a bonus, not a prerequisite.
- **D-52:** **U-9 is closed as not-applicable, and its worked example is corrected.** The draft's `n/a`
  example — *"Lenovo has no connector"* — is sound: the research states Lenovo's model is the outlier
  with no vendor cloud connector, and U-9's subject, the Commercial Vantage Policy Manager, is a
  client-side PowerShell GUI deploying a Custom OMA-URI profile. A GUI is not a connector.
- **D-53:** **A documented-silence Recovery section has three parts, and part (a) is PER-GAP.** (a) What
  the vendor **does** document for **that** gap; (b) the explicit statement that the vendor does not
  document the loss path, with the pages checked; (c) the escalation instruction. `[REVERSED]` the draft
  let certificate reset — which answers U-2 — serve as part (a) for the section a reader reaches having
  lost a **supervisor password**, which reads as a recovery path that does not exist for them.
- **D-54:** `[REVERSED]` **The escalation instruction says "escalate to vendor support" and stops.**
  `[MEASURED]` model plus Service Tag plus proof of ownership is **Dell's** requirement and nothing
  sources that Lenovo or HP support requires or accepts it. Those specifics stay in the Dell guide. The
  draft's own defence — that an escalation path is a procedure, not a claim about the vendor — is the
  rationalization that would have shipped it.
- **D-55:** **No system-board sentence, not even hedged** — the research says outright it was not sourced
  and must not ship as fact. **But that bar does not reach Lenovo's own first-party pointer** to System
  Deployment Boot Mode or Absolute's Remote SVP, which is sourced and may ship as a **bootstrap
  alternative**, never as a recovery path. Dell's third-party BIOS password generators ship only as the
  research rules — to tell a service desk such tools are not a sanctioned path, never as a procedure.
- **D-56:** **The HP Endorsement-Key conclusion ships as the conjunction of two sourced facts plus a
  conclusion attributed to THIS corpus.** HP states the EK is required to provision or de-provision, and
  documents de-provisioning as requiring `kek.pfx`. The guide states both and then says this corpus found
  no documented escape hatch. `[INHERITED]` D-43 — write an absence as an enumeration fact, never as a
  sourced absence. Correct the draft's char count while you are there: the shipped fragment *"required to
  provision or de-provision the device"* is **48** characters, not 169; 169 is the full definition.
- **D-57:** **A silence claim carries an as-of date.** The shipped prose says, in substance, "as of
  `<date>`, checked against `<pages>`". Every other claim in this domain carries a page date; a silence
  claim has none to carry, so without this it goes stale invisibly and no validator will ever notice.
- **D-58:** **The provenance record lives in RESEARCH.md and the pages checked are named in the guide.**
  These are not in tension — the pinned record (URL, fetch date, page date, **and the search terms that
  returned nothing**) is a research artifact; the guide names which pages were checked. The search terms
  are load-bearing because of D-59.
- **D-59:** **The verifier reproduces the recorded searches; it does not diff a string.** `[INHERITED]`
  D-55's protocol is quote-diffing — fetch page, compare string — and there is no analogous mechanism for
  *"this page does not say X"*. That is why D-58 records the search terms.
- **D-60:** **A `[RELAYED]`-only or non-first-party recovery answer is not shippable as a procedure.** A
  forum post, a partner KB or a search summary may inform a claim; none may become a recovery runbook.
  The draft ruled on the first-party and unsourced cases and left this middle one open, where D-52's
  re-verification allowance is a live path to a weakly-sourced procedure.
- **D-61:** **U-2 is not re-litigated.** `[MEASURED]` the research's body already grades the absence
  `SOURCED` — it fetched the certificate page and the information is not on it — while the register lists
  U-2 as `UNVERIFIED`. The register's own *"why it matters"* cell reads *"Cert page explicitly silent"*,
  so it is asking a **wider** question about the LBCT sub-pages, not contradicting itself. Spend budget on
  the wider question, not on re-proving the discharged negative.
- **D-62:** **Dell's Recovery section transcribes the research's pre-ruled six-scenario list in its fixed
  best-to-worst order.** Password known to Intune via Graph beta `hardwarePasswordDetails`, current plus
  the previous 15; device removed from management and passwords still readable; subscription ended and
  unrecoverable; password removal via the disable setting; genuinely lost, Dell Support with ownership
  verification; Master Password Lockout, unrecoverable. This is transcription, not invention.
- **D-63:** **The plan-time closure attempts run at RESEARCH time; the verifier re-fetches at
  verification.** `/gsd-plan-phase` spawns the researcher, which writes RESEARCH.md, then the planner.
  Two stages, both named, so nobody has to guess.

### Guide depth, the seam, and naming

- **D-64:** **Cmdlet and artifact NAMES as signposts; ordered sequences where the order is itself the
  safety fact; no syntax, no BIOS token tables, no per-model matrices.** The provisioning order (SPM
  Endorsement Key, then Signing Key, then reboot with PPI accepted, then EBAM, then LAK) and D-29's two
  de-provisioning orders all qualify — HP's partial-removal trap, where disabling EBAM without clearing
  the LAK leaves the machine *looking* locked, is an ordering failure exactly like 149 D-40's.
- **D-65:** `[INHERITED]` **Zero code fences.** D-31 measured all four siblings at 0, and D-64's ordered
  sequences plus cmdlet names are the two highest-pressure fence temptations in the phase. 149 D-36 had
  to rule *"numbered list, not a code fence"* for the same reason.
- **D-66:** **Model-family floor sentences are not per-model matrices.** ThinkPad 2022+ / ThinkCentre
  2020+ / ThinkStation 2020+ and HP's *"most Pro/Elite/Z HP commercial systems manufactured since 2018"*
  both ship as sentences. `[INHERITED]` D-32 already drew this line — it shipped a model-eligibility
  sentence while declining the eligible-model table.
- **D-67:** `[REVERSED]` **U-7 links to what the corpus already says; it is not declined.** `[MEASURED]`
  `docs/operations/patch-management/06-windows-driver-firmware-updates.md:768-771` already ships
  *"OEM utilities such as vendor repository managers, image assistants and update retrievers are a
  parallel, non-Intune channel… running both without deciding which one owns a given driver class
  reproduces the same conflict the scan source policy exists to prevent."* No new adjudication is needed
  and no backlog item either — each guide's seam sentence links there. The draft's "write nothing, in any
  form" also cited D-43 as a **bar** while another of its own answers applied the identical rule as a
  **permission**.
- **D-68:** **The seam sentence names DCU, HP Image Assistant and Lenovo System Update per guide, and
  `06` is NOT edited** (D-42). `[MEASURED]` `06` deliberately keeps vendor clients generic, so this phase
  is the only place naming them — recorded here so a reviewer does not read the asymmetry as a defect.
- **D-69:** **The HP Sure Admin to BIOS-update coupling gets its OWN sentence, outside the seam cap.**
  Securing the BIOS with certificates means BIOS updates require specific handling including signing the
  new firmware capsule. The research calls it *"easy to miss"* and a one-sentence seam cap would have
  suppressed it.
- **D-70:** **The DCDM judgement ships as a RECORDED decline; BCU's ships as drafted.** The research
  heads that section *"Two judgement calls the guides must make explicitly"* and rules *"do not recommend
  DCDM yet"* — making the judgement on the record is what discharges it, and declaring it out of scope
  does not, especially since DCDM's documented deployment path is via the Dell Management Portal, which
  this phase puts in the Dell guide's Prerequisites. For HP — recommend CMSL as the scripting path, name
  BCU legacy-but-supported, and never write "deprecated", which HP has not said.
- **D-71:** **Write `Remediations`, not `Proactive Remediations`, in prose; quotations preserve the
  source's own wording.** `[MEASURED]` the corpus convention exists at
  `docs/operations/drift-migration/01-windows-drift-detection.md:18` — *"Intune Remediations (formerly
  Proactive Remediations)"*. Same rule for Microsoft Endpoint Manager, except inside HP Connect's own
  product name, and for Azure Active Directory to Microsoft Entra ID. BIOS-07 and SC#3 use the retired
  forms because the 2022 HP guide does. `[INHERITED]` D-58 is the precedent that retired Microsoft names
  are a gate-visible hazard.
- **D-72:** **Three Graph resource names, not two, and no version numbers** — `hardwarePasswordDetails`,
  `hardwarePasswordInfo` and the singular `hardwarePasswordDetail`. `[INHERITED]` D-65's correction — it
  is Graph **beta**, a word the earlier draft dropped. The 2404/2405/2406 numbers reached the research
  only through a search summary and the beta reference URL returned HTTP 404, so the shippable content is
  the confusion warning alone.
- **D-73:** **Both Dell RBAC paths ship as an ASYMMETRY, not a neutral list** — a custom Intune role
  carrying `Read Bios Password` per device, whose creation itself needs Intune Role Administrator, versus
  the Entra Intune Administrator role, which reads all devices with no custom role and is cheaper and
  much wider. Plus `Policy and Profile manager` as the minimum to author the policy at all, and the fact
  that passwords stay readable **after** a device leaves Intune management. This was the strongest answer
  in the draft and survives untouched.
- **D-74:** **The Dell Management Portal consent blast radius ships as a Prerequisites callout** — the
  grant includes BitLocker key read and Intune policy write and requires a Global Administrator. Ship the
  shape and the Global-Administrator requirement as claims; the permission enumeration is `[RELAYED]` and
  goes on D-43's list before any of it is quoted.
- **D-75:** **The HP F10 constraint ships in Prerequisites, not Recovery** — a technician standing in
  front of a dead machine with no phone signal cannot enter BIOS Setup on a Sure-Admin-provisioned HP.
  It is a precondition of choosing Sure Admin. **Do not lift the research file's blockquote**: that
  passage is researcher prose formatted as a blockquote, not a first-party string — the exact defect
  `[INHERITED]` D-37 was written for.
- **D-76:** **The Lenovo guide's Delivery and Authentication sections carry TWO tools and TWO auth
  models each.** `[NEW — no Finder raised this]` TBCT V2 drives settings over WMI; LBCT V2 drives
  certificates; authentication splits into an encrypted INI supervisor password and a
  model-generation-gated certificate model. BIOS-08's fork is decided, but nothing decided how a
  two-tool vendor occupies one Delivery and one Authentication H2, or how the matrix transposes a cell
  with two values at different hardware floors. Each section is sub-divided by tool, and the matrix cell
  carries both values with their floors.
- **D-77:** **The ThinkCentre reconciliation is labeled as THIS corpus's reading.** Two first-party
  facts ship — TBCT V2 does not support ThinkCentre due to an incompatible WMI BIOS interface, and LBCT
  V2 supports ThinkPad 2022+ / ThinkCentre 2020+ / ThinkStation 2020+ — and the reconciliation between
  them is marked as inference, because the research marks it `PREMISE` and says neither page states it.
  BIOS-08 also requires the model list not be attached to the wrong tool.

### Anchors, links and gates

- **D-78:** `[NEW — the draft never mentioned anchors]` **A hand-authored short-form `<a id>` sits above
  every H2 in all four files, and the id list is written into the PLAN.** `[MEASURED]` `00-overview.md`
  is 9 H2 / 7 anchors and `01-windows-dfci.md` is 12 / 10 — anchors equal H2 minus the two tail H2s.
  `[INHERITED]` D-12 requires hand-authored short forms rather than heading slugs, D-24 states the
  anchor count is the contract, and D-65 hands the full list forward. `check-nav-hub-links` resolves
  anchors with **no allowlist**, and 146 D-39 and 148 D-16 make every H2 a slug Phase 151 must match
  byte-for-byte.
- **D-79:** `[INHERITED]` **Relative paths computed from the source file, always** (D-27), and the three
  guides each carry a full platform-applicability blockquote with D-29's link back to the overview
  (D-31). **The matrix does NOT get one** — `[MEASURED]` 0 of 7 reference matrices carries one and
  `V-54-27` is a negative assertion that bars only the truncated form. Do not read that decline as
  blanket, and do not copy `01`'s length as a target: `[MEASURED]` `01`'s joins at **493 characters**,
  2.5× the C17 cap, surviving only because operations files are unenrolled.
- **D-80:** **[OWNER-RULED 2026-08-25]** `[REVERSED]` **TWO commits, not five.** One content commit
  landing the three guides, the matrix and the glossary together; then one commit for the overview edits.
  The draft's guide-guide-guide-matrix-overview order claimed to keep the link checker green at every
  intermediate commit and does not — overview-last fixes only the overview-to-guide direction, while
  guide-to-guide cross-links, every guide-to-matrix link and any guide-to-glossary anchor all dangle
  mid-sequence. `[INHERITED]` D-28 measured that exact symmetry — *"guide-first strands `01`→`00` exactly
  as overview-first strands `00`→`01`. The argument is symmetric"* — and chose one commit, with a live
  probe returning 2 corpus-link failures. 148 D-65 measured four dangling links as apex 100/1.
- **D-81:** **Four gate classes bind, the same four 149 had.** `check-nav-hub-links` (target existence
  and anchor resolution, no allowlist), `V-54-27` (corpus-wide, walks `.planning/` too), **C11** via
  `v1.20-milestone-audit.mjs:585`'s live `walkMd('docs')` — which binds **both** the edited overview and
  the new matrix — and **C17**, which in this phase binds the matrix and `_glossary.md` rather than the
  glossary alone. The draft called C17 *"a fourth binding gate 149 did not have"* and then conceded in
  the same sentence that 149's C17 bound the glossary. The scope changed; the count did not.
- **D-82:** `[INHERITED]` **The prose-negative grep set carries forward unchanged** — D-59's American
  spelling regex (the 149 draft wrote "honouring", "labelled" and "enrolment"; so did this phase's grill
  draft), D-58's `Configuration Manager` and singular `Autopatch ring`, and D-60's rule of a runnable grep
  per prose negative. C11 strips nothing, so URL text is scanned.
- **D-83:** **The apex is `check-phase-144.mjs` and it subsumes everything above.** `[INHERITED]` D-01 —
  it reaches `check-nav-hub-links` through `check-phase-143.mjs`'s `V-143-CORPUSRUN`, C11 and C17 through
  `V-144-AUDIT-HARNESS`, and `V-54-27` through the chained 54. Run it after the content commit and again
  after the overview commit, **separately from the verifier**. `check-phase-150.mjs` does not exist and is
  Phase 153's to author.
- **D-84:** **Run `check-phase-49` after the glossary edit.** `[INHERITED]` D-63 — `V-49-19` at
  `check-phase-49.mjs:288-317` loads `_glossary.md`'s H3 term set for a Linux-glossary collision audit.

### The glossary

- **D-85:** **Four terms — `Sure Admin`, `Think BIOS Config`, `HP Connect`, `DCECMI` — all under
  `## Hardware`.** `[INHERITED]` D-64 hands the first two here as mandatory. `[MEASURED]` 149 placed all
  four of its firmware terms under `## Hardware`, not `## Security`. Going wider (SPM, Endorsement Key,
  LBCT, Commercial Vantage, `.cctk`) risks the glossary growing faster than the corpus uses the terms.
  Term forms and D-62's double-hyphen slug trap are settled in the PLAN, not left to the executor.
- **D-86:** **All THREE of D-63's obligations ship, not one.** (1) An `## Alphabetical Index` row per new
  term, inserted **sorted in place** at `docs/_glossary.md:33` — `[MEASURED]` a single line, never split.
  (2) A `## Version History` row. (3) C17 conformance, including the 200-character cap on any
  `> See also:` line. The draft carried only the `check-phase-49` run.
- **D-87:** `[REVERSED]` **`_glossary.md`'s `last_verified` STAYS at `2026-06-29` and `review_by` at
  `2026-09-27`.** `[MEASURED]` `git show 87c01e32` (2026-08-25) records an **owner ruling** that the
  non-advance is deliberate — 90-day cycle, frontmatter bytes unchanged, and the non-advance itself
  recorded as a Version History row. The draft's general rule that every touched file takes the commit-1
  date would have reversed an owner ruling made the same day.

### Accepted inconsistencies

- **D-88:** Recorded so the verifier and code review do not surface them as defects. (a) SC#3's
  *"both … carry the fleet-first de-provisioning order"* is HP-only in the sources — D-30, owner-ruled.
  (b) The matrix ships Approved and is absent from the publish bundle until Phase 152 — D-22.
  (c) U-6 may close as open without blocking — D-50. (d) `06` keeps vendor update clients generic while
  this phase names them — D-68. (e) SC#1 and BIOS-05 say "five-section" until D-02's amendment lands.

### Claude's Discretion

- Section-internal ordering inside each of the six H2s, and the sub-headings within Lenovo's two-tool
  Delivery and Authentication sections (D-76).
- The exact `## Summary` wording for the matrix, subject to C17's 30-word floor.
- Which of the two labeled `## Key Gaps Summary` enumerations comes first (D-14).
- The `owner` frontmatter value, matched to whichever the sibling matrices carry.
- Wave and plan decomposition, and per-plan requirement assignment — those are `/gsd-plan-phase`'s, as
  they were in 149. **But plan the remediation round in**: `[INHERITED]` D-28 records verbatim that 148
  D-66 measured that *neither* predecessor finished in the number of plans it started with.
- The PLAN carries a **question-to-requirement map**. Without one, the BIOS-07 hole recurs — three
  requirements carried essentially zero decisions in a 45-question draft and no gate caught it.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase inputs
- `.planning/ROADMAP.md` — Phase 150 Goal, the five Success Criteria, Blast radius and Research flag;
  also Phase 151 (which owns Recipe #5 and states *"no external research pass"*) and Phase 152 (which
  owns INT-01 through INT-06)
- `.planning/REQUIREMENTS.md` — BIOS-05 through BIOS-10 and BIOS-12 at lines 75-82; the requirement map
  at 205-255; the BIOS-12 note at 252; INT-01 through INT-06 at 96-101. **D-02 files the SC#1 / BIOS-05
  six-section amendment here.**
- `.planning/phases/149-firmware-bios-domain-overview-dfci-surface-uefi/149-CONTEXT.md` — D-01 (the apex),
  D-12 and D-24 (the anchor contract), D-21 through D-23 (numbering, H1s), D-25 through D-31 (links,
  paths, commits, frontmatter, the platform blockquote), D-37 and D-43 (the quotation and absence gates),
  D-40 (ordered runbooks), D-41 (*"linking is not editing"*), D-42 (the updates seam), D-45 through D-63
  (fetch, evidence, greps, the glossary), D-64 and D-65 (**the hand-forwards to this phase, including the
  falsification clause**), D-66 through D-69
- `.planning/phases/149-firmware-bios-domain-overview-dfci-surface-uefi/149-RESEARCH.md` — the seven
  re-fetched sources and their byte-exact quotes

### Research
- `.planning/research/PER-OEM-BIOS-GAP.md` — the phase's primary research artifact. The `[DIRECT]` and
  `[RELAYED]` trust table, the three-way architecture split, the per-vendor Delivery / Authentication /
  Scope / Prerequisites / Recovery material, the CURRENT-versus-DEPRECATED table, the nine-row UNVERIFIED
  register, and the Sources table S-1 through S-20
- `.planning/research/PITFALLS.md` §C1-5 at lines 284-292 — the *"OS features gated by this setting"*
  column and its prescribed cross-links (**D-12 reverses the draft's decline of this**)
- `.planning/research/STACK.md` §A-1 through §A-8 — DFCI mechanics, the Dell native template, and the
  §A-8 non-attempt this research extends

### Corpus files this phase reads or edits
- `docs/operations/firmware-bios/00-overview.md` — **edited** (D-36, D-37, D-38, D-39, D-40); the false
  sentence at 128-130, the HP quote at 52 with its evidence line at 54, the Lenovo quote at 66, the seven
  hand-authored anchors, the eight evidence lines at 46/54/68/94/103/160/190/215
- `docs/operations/firmware-bios/01-windows-dfci.md` — **read only** (D-41); the sibling shape, the tail
  H2s, and its 493-character platform blockquote
- `docs/operations/patch-management/06-windows-driver-firmware-updates.md` §768-771 — **read only**
  (D-67); the existing vendor-client-versus-Intune conflict statement the seam links to
- `docs/reference/aosp-oem-matrix.md` — the structural precedent (D-05, D-06, D-07, D-13)
- `docs/reference/android-capability-matrix.md`, `ios-capability-matrix.md`,
  `linux-capability-matrix.md`, `macos-capability-matrix.md` — the `## Key Gaps Summary` convention and
  what it means (D-14)
- `docs/reference/licensing-matrix.md` — the HP license-floor link target (D-26)
- `docs/decision-trees/03-tpm-attestation.md` — C1-5's chosen cross-link target (D-12)
- `docs/_glossary.md` — **edited** (D-85, D-86, D-87); `doc_id: RE-184`, the single-line
  `## Alphabetical Index` at 33, the 90-day cycle and the 2026-08-25 owner ruling
- `docs/_registry/RE-index.md` — read for the RE-226 recompute (D-21); **not edited** (Phase 152)
- `docs/_templates/reference-template.md` — the reference shape, and its +90 cycle that D-18 overrides

### Validators and pipeline
- `scripts/validation/c17-eee-contract.mjs` — enrollment at 5-6; assertion 4 at 239-253; assertion 8 at
  289-295; assertion 9 at 312-330; assertion 10's hard failure and the `D1_MAP` at 26-47 and 339-341;
  assertion 11 at 345-384; assertion 12 at 389-408
- `scripts/validation/check-nav-hub-links.mjs` — `resolveLinkTarget` at 288, `githubSlug` at 121-126,
  the inbound-link walk at 276-300; no baseline, allowlist, ratchet or expected-failure list
- `scripts/validation/check-phase-54.mjs` — `PATCH_FILES` at 35 (why D-39's interval question is closed);
  `V-54-27` at 437-467
- `scripts/validation/check-phase-49.mjs` §288-317 — `V-49-19`, the glossary H3 term set (D-84)
- `scripts/validation/check-phase-144.mjs` §65-69 — the apex chain (D-83)
- `scripts/validation/v1.20-milestone-audit.mjs` §574-585 — C11's four fallback patterns and its live
  `walkMd('docs')` (D-81, D-82)
- `scripts/pipeline/build-filename-map.mjs` §283 and `scripts/pipeline/build-publish-bundle.mjs` §520
  and §523 — the two independent `225` canaries and the Approved-filter that silently excludes the
  matrix until Phase 152 (D-22, and the Phase 152 hand-forward)

### Standards
- `docs/_standards/EEE-SOP-standard.md` — the EEE contract, §D1's platform map, and directory precedence
- `.planning/ARCHITECTURE.md` §293 — the bar on an estimate becoming a literal

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`docs/reference/aosp-oem-matrix.md` (RE-145)** — a near-exact structural precedent: the corpus's only
  other OEM matrix, capability-first with OEM rows, `## Source Attribution` for per-OEM pins,
  `## See Also` as a full inventory of the per-OEM guides it transposes, `## Version History` with an
  initial row recording the shape decisions themselves.
- **`docs/operations/firmware-bios/01-windows-dfci.md`** — the sibling operations shape: platform
  blockquote, hand-authored anchors, the `## Unsupported and Anti-Feature Callouts` /
  `## Related Resources` / `## External References` tail, and 149 D-40's ordered-runbook pattern for
  sequences whose ordering is the safety fact.
- **`docs/operations/drift-migration/01-windows-drift-detection.md:18`** — the corpus's existing
  retired-branding form, *"Intune Remediations (formerly Proactive Remediations)"* (D-71).

### Established Patterns
- **C17 enrollment is `doc_id` plus a `docs/` path, and nothing else.** The matrix is enrolled and the
  three guides are not; that asymmetry drives D-10, D-17 and D-79.
- **No validator asserts doc_id-to-registry parity**, which is what makes BIOS-12's split shippable —
  and `EEE-SOP-standard.md` (STD-001) is the live precedent for an Approved enrolled document with no
  registry row.
- **Anchors are hand-authored short forms, not heading slugs** — a planner guessing a GitHub slug
  produces a hard `check-nav-hub-links` failure with no allowlist to absorb it.
- **Evidence lines are standalone, line-start, one page per line** — D-46.

### Integration Points
- `00-overview.md`'s `## Choosing a Path` and `## Related Resources` receive the outbound links (D-37,
  D-38); its `## Who Holds the BIOS Secret` table's *Reached through* column is a third candidate site.
- `_glossary.md`'s `## Hardware` H3 set and its single-line `## Alphabetical Index` (D-85, D-86).
- The matrix's `## See Also` reaches back into both 149 files, the three new guides, and C1-5's TPM
  target (D-13).

</code_context>

<specifics>
## Specific Ideas

- **The routing spine is custody, not tooling.** 149 established it and this phase must not invert it —
  each guide leads with where the BIOS secret lives, because that is the security-review question that
  must be answered before any packaging work starts.
- **The single highest-value sentence in the phase** is BIOS-06's own closing formulation — *Dell wants a
  virgin BIOS; Lenovo needs a provisioned one* — and D-32 gives it a named home rather than letting it be
  flattened into two disconnected halves.
- **The most useful operational fact** for a service desk inheriting a tenant it did not build is HP's
  `HPConnectForMEM-<device group name>` script-package naming (D-27).
- **Recovery is the most-used content for this audience**, which is why three gaps closing as documented
  silence is a real cost and D-49's two-distinct-sources rule exists.

</specifics>

<deferred>
## Deferred Ideas

- **A per-OEM firmware/BIOS Device Recipe** — the guides are operations documents; a prescriptive
  configuration artifact for BIOS governance would be its own phase. Recipe #5 in Phase 151 covers
  driver/firmware approval cadence but not BIOS settings custody.
- **Retrofitting the 20 legacy operations documents into C17 enrollment** — explicitly out of scope per
  Phase 152's SC#3.
- **A `docs/reference/00-index.md` row for the matrix** — `[MEASURED]` 4 of 7 reference matrices,
  including `aosp-oem-matrix.md`, have no index row and nothing fails, so this is the status quo rather
  than a defect. Handed to Phase 152 as a **disposition to record either way**, not as an obligation.
- **HP Connect procedural screenshots and step-by-step console walkthroughs** — the only comprehensive
  first-party document is version 1.2.0 from 2022 and its procedures cannot be trusted against the live
  console. The guide states the boundary; it does not reproduce the procedures.
- **Per-setting compliance attestation for Dell, HP or Lenovo fleets** — no path satisfies it today; the
  guides say so rather than implying otherwise.

</deferred>

---

*Phase: 150-per-oem-bios-guides-capability-matrix*
*Context gathered: 2026-08-25*
