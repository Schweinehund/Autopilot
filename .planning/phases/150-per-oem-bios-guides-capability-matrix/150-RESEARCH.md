# Phase 150: Per-OEM BIOS Guides & Capability Matrix - Research

**Researched:** 2026-08-25
**Domain:** Enterprise BIOS/firmware configuration governance for Dell, HP and Lenovo through Microsoft
Intune — vendor connectors, native templates, secret custody, and documentation-corpus mechanics
(EEE/C17 enrollment, anchor/link conventions, filename and registry rules).
**Confidence:** HIGH for corpus/governance mechanics (all measured this session or inherited from
150-CONTEXT.md's same-day adversarial review); MIXED for vendor facts — HIGH where re-fetched and
byte-confirmed today, MEDIUM/LOW where carried from the 2026-08-19 milestone research unchanged, LOW
(honest absence) for the one recovery gap that remains genuinely undocumented by the vendor.

<user_constraints>
## User Constraints (from CONTEXT.md)

150-CONTEXT.md is the phase's primary input and carries 89 decisions (D-01 through D-89) produced by a
45-question grill draft subjected to a five-Finder/Adversary/Referee adversarial review (149 raw findings
→ 120 net distinct → 34 disproved → 86 surviving, plus 6 Referee-only findings = 92; the review reversed
four of the draft's own recommendations). **The Decisions section below is copied verbatim.** Do not
re-derive or re-litigate any decision below — this research supplements it with newly fetched vendor
facts (the phase's Research flag) and does not alter governance-layer decisions.

### Implementation Decisions

Evidence labels: `[MEASURED]` = a command run this session · `[INHERITED]` = a locked 149-CONTEXT
decision, carried not re-derived · `[REVERSED]` = the draft's answer was overturned by the adversarial
review · `[OWNER-RULED 2026-08-25]` = the owner decided · `[PREMISE]` = inference, not measured ·
`[UNVERIFIED]` = open, must close at plan time.

#### The deliverable shape

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

#### Matrix conventions the draft measured away

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
  **Research addendum (see below): a sixth string must be added to this list — the Dell no-customer-data
  statement is 241 characters in its complete, accurate form, not the 166-character truncation the
  milestone research shipped.**
- **D-11:** `[MEASURED]` **Quote lengths are measured in the BARE `>` form, which is what ships.**
  `grep -rn '^> \*"' docs/` = 0 — the corpus has never shipped an emphasis-wrapped blockquote, and
  `00-overview.md:44`, `:52` and `:66` are all bare. Two strings sit near the line with no margin (HP
  hardware floor 197, HP Endorsement Key definition 169) and D-38's re-fetch may move either across it,
  so re-measure after fetching, never before.
  **Research addendum: both re-measured today against a fresh fetch — unchanged at 197 and 169
  characters. Neither crosses the cap. See Common Pitfalls below.**
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
  **Research addendum: `aosp-oem-matrix.md` itself has no `## Key Gaps Summary` H2 — re-verified this
  session (`grep -n "^## Key Gaps Summary" docs/reference/aosp-oem-matrix.md` = no match). The convention
  belongs to the four platform matrices, not the chosen aosp precedent; D-14 already scopes it correctly
  to "all four platform matrices" — recorded here only to close the loop for the planner.**
- **D-15:** **`## Scope` sits third, in D-01's order, and the sibling deviation is not a deviation.**
  `[MEASURED]` only `aosp-oem-matrix.md` places a `## Scope` H2 immediately after `## Summary`; linux and
  macos go straight to capability H2s. And aosp's `## Scope` is a *document*-scope reminder, not a
  capability dimension, whereas this matrix's `## Scope` is the guides' scope-of-control capability. There
  is no convention being departed from.
- **D-16:** **The matrix does NOT restate the overview's custody table.** Custody is one column inside
  `## Authentication`. This is a judgement call, not a measured rule — `[PREMISE]` that a column is
  sufficiently different from a table to avoid the duplication class.

#### Matrix mechanics — frontmatter, enrollment and the registry split

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
  **Research addendum: after today's re-fetch, the Lenovo lost-supervisor-password cell is NO LONGER
  "documented silence" — Lenovo does document a path (destructive: system-board replacement). See U-1
  below. Only the certificate-private-key-loss cell (U-2) and the HP Endorsement-Key-loss cell (U-3)
  remain genuine documented silences under this three-way vocabulary.**
- **D-20:** **The matrix ships enrolled and Approved, with the registry row deferred to Phase 152.**
  Frontmatter carries `doc_id: RE-226` and `status: Approved`.
  `[MEASURED]` the registry holds 225 rows with max `RE-225`, so RE-226 is next free and no gaps exist.
  `[MEASURED]` C17 enrolls on `doc_id` plus a `docs/` path and never reads `RE-index.md`; no validator
  anywhere asserts doc_id-to-registry parity. `[MEASURED]` the live precedent is stronger than the
  absence-of-a-validator argument — `EEE-SOP-standard.md` is `doc_id: STD-001`, `status: Approved`,
  enrolled, **with no registry row today**. `[MEASURED]` all 8 `status: Draft` files in the corpus are
  templates, so shipping Draft would be unprecedented across 226 files and would force a second
  frontmatter edit in 152 for no gate benefit.
  **Research addendum (re-verified this session): `docs/reference/firmware-oem-matrix.md` does not yet
  exist (`ls` returns "No such file or directory") and `docs/_registry/RE-index.md`'s last row is
  `RE-225 | docs/recipes/04-android-dedicated-mhs-multi-app.md | ... | Guide | Approved` — RE-226 is
  confirmed free.**
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

#### BIOS-07 — the requirement that had zero decisions

- **D-23:** `[NEW — the whole requirement carried essentially no decisions]` **HP Connect is written as
  a vendor connector, in five specific claims** — a cloud console administered at `admin.hp.com`;
  policies published into Intune device groups as Remediations over the Microsoft Graph API; Entra
  **Global Administrator** consent once, after which an **Intune Administrator** operates it;
  certificate and key-pair authentication through Sure Admin; and **no per-device agent**. The draft's
  four HP-adjacent questions decided a provisioning order, an F10 constraint, a currency caveat and
  **Dell's** consent grant — none of BIOS-07's clauses.
  **Research addendum: this claim's discovery-surface half needs a qualifier — see U-6 below. HP Connect
  now has a documented Intune Partner-portals-tab presence, same as Dell; "administered at admin.hp.com"
  is still accurate for where the actual console lives, but it is discoverable from inside Intune too.**
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

#### BIOS-09 — the second requirement that had zero decisions

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
  **Research addendum: re-confirmed this session — the Dell Management Portal KB (000356434, re-fetched
  today) documents no disconnection/de-provisioning order at all. The asymmetry is real, not a research
  gap.**

#### BIOS-06 — the inverted-prerequisite pair

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

#### Editing 149's shipped overview

- **D-36:** **[OWNER-RULED 2026-08-25]** **The HP cloud-vault quote is QUOTED in the HP guide and the
  overview's copy becomes a pointer.** `[MEASURED]` `00-overview.md:52` already ships *"Passwords are
  managed by HP Connect and stored in a cloud vault."* with its evidence line at `:54`, and `:66` ships
  the Lenovo Azure Key Vault quote. BIOS-07 and SC#3 require the HP line **in the HP guide, quoted
  against Dell's no-customer-data statement** — pointing does not satisfy "quoted against". So the guide
  carries both quotes with **two separate evidence lines**, and the overview is reduced to the custody
  claim plus a link. Same treatment for the Lenovo quote. Phase 150 owns that edit under D-65's
  falsification clause.
  — **Reversibility:** costly — it edits a file shipped and verified in the previous phase.
  **Research addendum: the Dell no-customer-data quote to be added here is 241 characters in its
  complete, accurate form — see Common Pitfalls for the truncation trap and the recommended fix.**
- **D-37:** `[MEASURED]` **The now-false sentence spans lines 128-130 of the overview, not 129-131.**
  In `00-overview.md`, line 128
  ends *"…Vendor-specific procedures for Dell, HP and"* and line 131 is blank. A `sed` edit written to
  the draft's cited range would leave a dangling sentence fragment and delete a blank line — a broken
  sentence shipping invisibly, since no validator reads prose. The edit count is **four to six sites**,
  not the draft's three: the false sentence, the `02/03/04` links (same physical site, per D-26's
  hand-forward), D-32's cross-reference sentence, two frontmatter fields, plus D-36's quote reduction and
  any custody correction D-40 triggers. 148 D-52 is headed verbatim `### 00-overview.md — touch 4 of 4`.
  **Research addendum: independently re-verified this session with `sed -n '124,133p'` — line 128 ends
  `…Vendor-specific procedures for Dell, HP and` and line 131 is blank, byte-for-byte as stated.**
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
  **Research addendum — this checklist has now been run (see below):**
  1. **HP cloud-vault custody** — re-fetched the source PDF today; the "cloud vault" quote is unchanged.
     **No correction needed to the quote itself.** But add: HP Connect now has a documented Intune
     Partner-portals-tab presence (see U-6) — a related, adjacent claim in the same paragraph
     ("administered at admin.hp.com rather than in the Intune console") should be qualified, not deleted.
  2. **Lenovo Azure Key Vault** — not re-fetched this session (149 already flagged it as this corpus's
     own inference, not a vendor claim requiring re-verification); no new information found that
     contradicts it.
  3. **Dell "Intune stores the BIOS passwords"** — re-fetched the Learn page today; byte-identical,
     `ms.date 2024-06-06`, `updated_at 2026-07-01` unchanged. **No correction needed.**
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

#### The evidence regime

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
  **Research addendum: this session performed a substantial down payment on this fetch list ahead of
  plan time — see the Fetch Log in Sources below. Nine of the phase's highest-value sources were
  re-fetched and byte-verified today (2026-08-25): the Learn BIOS page, both Dell KBs, the Dell
  Management Portal KB, the HP Connect PDF, three HP developer-portal pages, and four Lenovo CDRT pages.
  The plan/execution stage must still re-fetch at its own execution time per D-37's rule (no string ships
  from a stale cache), but the content is now known-stable across a 6-day window (2026-08-19 →
  2026-08-25) for every source checked, which lowers re-fetch risk.**
- **D-44:** `[REVERSED]` **The ThinkCentre statements are `[RELAYED]` and go on D-43's list.** The draft
  authorized shipping them *"as quotes or claims"*. The research's own trust table says `[RELAYED]` means
  re-verify before quoting, safe as an unquoted claim. Same treatment for the HTA-to-V2 INI breaking
  change and Dell's no-customer-data statement, all three `[RELAYED]`.
  **Research addendum: the ThinkCentre exclusion quote is now `[DIRECT]` — re-fetched via curl this
  session (see below), byte-identical to the milestone research's `[RELAYED]` version. It may ship as a
  direct quote without further re-verification (subject to D-37's re-fetch-at-plan-time rule).**
- **D-45:** **BIOS-07's mandated Dell contrast quote is quotable — the research says so.** It reads that
  the no-customer-data sentence *"is worth quoting in the guide specifically because it is the opposite
  of HP Connect's model."* There is no requirement-versus-research conflict here; there is only D-43's
  re-fetch obligation.
  **Research addendum: re-fetched this session. The quote is longer and more precise than what the
  milestone research shipped — see Common Pitfalls.**
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
  **Research addendum: two additional block patterns discovered this session — Dell's `www.dell.com`
  returns 403 to `curl` (even with a browser UA) but renders through the `r.jina.ai` reader proxy;
  `support.lenovo.com` returns 403 to both `curl` and `WebFetch` but also renders through `r.jina.ai`.
  `docs.lenovocdrt.com` and `blog.lenovocdrt.com` (Material-for-MkDocs static sites) render cleanly to
  plain `curl`. See Common Pitfalls for the full per-vendor retrieval matrix.**

#### Recovery gaps — U-1, U-2, U-3

- **D-49:** `[REVERSED]` **Two genuinely DISTINCT sources per gap, and the exhausted ones are named as
  spent.** The draft's U-1 second source was `docs.lenovocdrt.com/guides/lbct/` — which **is** U-2's
  entire list, and LBCT is the **certificate** tool, an implausible home for a lost **supervisor
  password** answer. U-1 goes to the Lenovo Support BIOS-password KB plus the TBCT V2 documentation.
  U-3's `developers.hp.com` **has already been fetched** with the browser UA — that is how the `[DIRECT]`
  SPM material was obtained — so it counts as spent and U-3's second source must be HP support or the
  Sure Admin whitepaper via a working TLS path.
  **Research addendum: U-1 is now CLOSED — see below. This session fetched the Lenovo Support
  BIOS-password KB (ht036206) exactly as D-49 prescribed and found Lenovo's own documented answer.**
- **D-50:** **U-6 is load-bearing AND unfetchable, so it gets an explicit closure rule.** It is
  load-bearing because `[MEASURED]` `00-overview.md:48-49` ships the claim that HP Connect is
  *"administered at `admin.hp.com` rather than in the Intune console"* — if HP Connect appears under
  Intune's Partner portals as Dell's does, U-6 falsifies a shipped 149 claim and fires D-65. It is
  unfetchable because the research's only named source is *"Live Intune admin center"*, which no agent
  here can open. **Closure rule** — one documented attempt against HP's own material, then ship 149's
  claim unchanged and record U-6 as open. It may not block.
  **Research addendum: U-6 is now CLOSED with a positive answer, sourced from Microsoft's own blog
  (not the "Live Intune admin center" the draft assumed was the only source) — see below. This is a
  real, actionable correction, and it is non-blocking exactly as D-50 anticipated: it sharpens the
  overview's custody framing, it does not overturn SC#3's routing logic.**
- **D-51:** **U-8 does not block.** `[MEASURED]` 149's overview already carries the 2022-document
  currency caveat at `:56`, so a newer HP Connect guide would be a bonus, not a prerequisite.
  **Research addendum: U-8 is now CLOSED — confirmed no newer guide exists (re-fetched the PDF today,
  still Version 1.2.0 / 2022-09-27). See below.**
- **D-52:** **U-9 is closed as not-applicable, and its worked example is corrected.** The draft's `n/a`
  example — *"Lenovo has no connector"* — is sound: the research states Lenovo's model is the outlier
  with no vendor cloud connector, and U-9's subject, the Commercial Vantage Policy Manager, is a
  client-side PowerShell GUI deploying a Custom OMA-URI profile. A GUI is not a connector.
- **D-53:** **A documented-silence Recovery section has three parts, and part (a) is PER-GAP.** (a) What
  the vendor **does** document for **that** gap; (b) the explicit statement that the vendor does not
  document the loss path, with the pages checked; (c) the escalation instruction. `[REVERSED]` the draft
  let certificate reset — which answers U-2 — serve as part (a) for the section a reader reaches having
  lost a **supervisor password**, which reads as a recovery path that does not exist for them.
  **Research addendum: with U-1 now closed (Lenovo documents system-board replacement for a lost
  supervisor password), the Lenovo Recovery section's shape changes from "two documented silences" to
  "one documented (destructive) path for password loss, one documented silence for certificate-key
  loss." The three-part shape in D-53 still applies to the certificate-key-loss half only.**
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
  **Research addendum: this bar has now moved for the supervisor-password case specifically. Lenovo DOES
  document "system board replacement" for a lost supervisor password (U-1, closed below) — this is no
  longer an unsourced inference, it is a first-party statement, and it should ship as fact in that one
  narrow context. D-55's bar against inventing a system-board sentence stands for every case where the
  vendor has NOT said so (which remains true for the certificate-private-key gap, U-2). The
  "System Deployment Boot Mode" bootstrap alternative was independently re-confirmed this session as
  `[DIRECT]`-sourced, from a different page than D-55 cites — see below.**
- **D-56:** **The HP Endorsement-Key conclusion ships as the conjunction of two sourced facts plus a
  conclusion attributed to THIS corpus.** HP states the EK is required to provision or de-provision, and
  documents de-provisioning as requiring `kek.pfx`. The guide states both and then says this corpus found
  no documented escape hatch. `[INHERITED]` D-43 — write an absence as an enumeration fact, never as a
  sourced absence. Correct the draft's char count while you are there: the shipped fragment *"required to
  provision or de-provision the device"* is **48** characters, not 169; 169 is the full definition.
  **Research addendum: both facts re-confirmed `[DIRECT]` this session via a fresh curl fetch of
  developers.hp.com. Char counts independently re-verified: 48 and 169, exact. An additional search this
  session (HP developer forum, Lenovo-equivalent Lenovo Support KB pattern) found no further HP escape
  hatch — see U-3 below, which remains the phase's one genuine documented-silence recovery gap.**
- **D-57:** **A silence claim carries an as-of date.** The shipped prose says, in substance, "as of
  `<date>`, checked against `<pages>`". Every other claim in this domain carries a page date; a silence
  claim has none to carry, so without this it goes stale invisibly and no validator will ever notice.
- **D-58:** **The provenance record lives in RESEARCH.md and the pages checked are named in the guide.**
  These are not in tension — the pinned record (URL, fetch date, page date, **and the search terms that
  returned nothing**) is a research artifact; the guide names which pages were checked. The search terms
  are load-bearing because of D-59.
  **Research addendum: the search-terms record for U-3 (HP Endorsement Key loss) is in the Sources /
  Fetch Log section below — every page and query attempted, with dates and outcomes.**
- **D-59:** **The verifier reproduces the recorded searches; it does not diff a string.** `[INHERITED]`
  D-55's protocol is quote-diffing — fetch page, compare string — and there is no analogous mechanism for
  *"this page does not say X"*. That is why D-58 records the search terms.
- **D-60:** **A `[RELAYED]`-only or non-first-party recovery answer is not shippable as a procedure.** A
  forum post, a partner KB or a search summary may inform a claim; none may become a recovery runbook.
  The draft ruled on the first-party and unsourced cases and left this middle one open, where D-52's
  re-verification allowance is a live path to a weakly-sourced procedure.
  **Research addendum: this rule was applied directly this session. A relevant HP developer-portal forum
  thread ("Deprovision Secure Platform/Secure Recover without keys?") was located via search but could
  not be fetched (404 to curl, 403 to WebFetch) — and per D-60, even if it had been fetched, a community
  forum answer is not shippable as a procedure. It is recorded as an attempted-and-blocked source, not
  used as content.**
- **D-61:** **U-2 is not re-litigated.** `[MEASURED]` the research's body already grades the absence
  `SOURCED` — it fetched the certificate page and the information is not on it — while the register lists
  U-2 as `UNVERIFIED`. The register's own *"why it matters"* cell reads *"Cert page explicitly silent"*,
  so it is asking a **wider** question about the LBCT sub-pages, not contradicting itself. Spend budget on
  the wider question, not on re-proving the discharged negative.
  **Research addendum: the wider question WAS spent this session — the full LBCT Module Cmdlet Reference
  and the LBCT Getting Started guide were both fetched and read in full (not sampled). Every mutating
  cmdlet requires the private key or an Azure Key Vault reference; no cmdlet or documented flow recovers,
  resets, or bypasses a lost private key. This corroborates, but does not newly resolve, U-2's
  documented-silence status. See below.**
- **D-62:** **Dell's Recovery section transcribes the research's pre-ruled six-scenario list in its fixed
  best-to-worst order.** Password known to Intune via Graph beta `hardwarePasswordDetails`, current plus
  the previous 15; device removed from management and passwords still readable; subscription ended and
  unrecoverable; password removal via the disable setting; genuinely lost, Dell Support with ownership
  verification; Master Password Lockout, unrecoverable. This is transcription, not invention.
  **Research addendum: a related fact worth folding into scenario 5 — Dell's own KB 000140298 (re-fetched
  today) carries an "Important Notes" callout not previously extracted: "If recovery isn't possible,
  motherboard replacement may be needed." This slightly widens scenario 5 beyond pure Dell-Support
  escalation and should be reflected if the guide quotes this KB directly.**
- **D-63:** **The plan-time closure attempts run at RESEARCH time; the verifier re-fetches at
  verification.** `/gsd-plan-phase` spawns the researcher, which writes RESEARCH.md, then the planner.
  Two stages, both named, so nobody has to guess.
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
  **Research addendum: the Dell Graph-API/RBAC manual page (`dcec_ug/using-graph-apis-to-retrieve...`)
  could not be re-fetched this session — it is a JS-rendered Dell manuals page and both `curl` and the
  `r.jina.ai` proxy returned near-empty content (see Common Pitfalls). This claim's confidence stays at
  its existing `STACK.md §A-6` `SOURCED` level, not upgraded to a fresh re-fetch. Flag for plan-time
  re-attempt, ideally with an authenticated browser tool if one becomes available.**
- **D-74:** **The Dell Management Portal consent blast radius ships as a Prerequisites callout** — the
  grant includes BitLocker key read and Intune policy write and requires a Global Administrator. Ship the
  shape and the Global-Administrator requirement as claims; the permission enumeration is `[RELAYED]` and
  goes on D-43's list before any of it is quoted.
  **Research addendum: this list is now `[DIRECT]` — re-fetched today via the `r.jina.ai` reader proxy
  (raw `curl` to `dell.com` returns 403; see Common Pitfalls) from Dell KB 000356434, unchanged since
  Last Modified 23 May 2026. Full 8-item list confirmed byte-for-byte; see below.**
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
  **Research addendum: both facts independently re-confirmed `[DIRECT]` this session via fresh curl
  fetches of `docs.lenovocdrt.com/guides/tbct_v2/` and `docs.lenovocdrt.com/guides/lbct/`. No page found
  this session states the reconciliation explicitly either — D-77's `PREMISE` label is confirmed correct
  and should stay.**

#### Anchors, links and gates

- **D-78:** `[NEW — the draft never mentioned anchors]` **A hand-authored short-form `<a id>` sits above
  every H2 in all four files, and the id list is written into the PLAN.** `[MEASURED]` `00-overview.md`
  is 9 H2 / 7 anchors and `01-windows-dfci.md` is 12 / 10 — anchors equal H2 minus the two tail H2s.
  `[INHERITED]` D-12 requires hand-authored short forms rather than heading slugs, D-24 states the
  anchor count is the contract, and D-65 hands the full list forward. `check-nav-hub-links` resolves
  anchors with **no allowlist**, and 146 D-39 and 148 D-16 make every H2 a slug Phase 151 must match
  byte-for-byte.
  **Research addendum: re-verified this session. `00-overview.md` carries anchors at lines 26, 81, 109,
  132, 165, 182, 201 (7 anchors for 9 H2s — `## Related Resources` and `## External References` are the
  two tail H2s with no anchor, confirming D-78's "anchors equal H2 minus the two tail H2s" rule).
  `01-windows-dfci.md` carries 10 anchors for 12 H2s with the identical pattern (anchors at 23, 58, 134,
  197, 260, 377, 421, 455, 479, 534 — `## Related Resources` and `## External References` again unanchored).**
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

#### The glossary

- **D-85:** **Four terms — `Sure Admin`, `Think BIOS Config`, `HP Connect`, `DCECMI` — all under
  `## Hardware`.** `[INHERITED]` D-64 hands the first two here as mandatory. `[MEASURED]` 149 placed all
  four of its firmware terms under `## Hardware`, not `## Security`. Going wider (SPM, Endorsement Key,
  LBCT, Commercial Vantage, `.cctk`) risks the glossary growing faster than the corpus uses the terms.
  Term forms and D-62's double-hyphen slug trap are settled in the PLAN, not left to the executor.
  **Research addendum: re-verified this session — `docs/_glossary.md`'s `## Hardware` H3 set (line 109
  onward) already carries `BIOS configuration and other settings`, `BIOS password`,
  `Device Firmware Configuration Interface (DFCI)`, `UEFI CSP` from Phase 149. The four new terms this
  phase adds are confirmed not already present.**
- **D-86:** **All THREE of D-63's obligations ship, not one.** (1) An `## Alphabetical Index` row per new
  term, inserted **sorted in place** at `docs/_glossary.md:33` — `[MEASURED]` a single line, never split.
  (2) A `## Version History` row. (3) C17 conformance, including the 200-character cap on any
  `> See also:` line. The draft carried only the `check-phase-49` run.
  **Research addendum: `## Alphabetical Index` re-confirmed at line 31 this session (the index list
  itself is line 33's single unbroken line, matching D-86's citation).**
- **D-87:** `[REVERSED]` **`_glossary.md`'s `last_verified` STAYS at `2026-06-29` and `review_by` at
  `2026-09-27`.** `[MEASURED]` `git show 87c01e32` (2026-08-25) records an **owner ruling** that the
  non-advance is deliberate — 90-day cycle, frontmatter bytes unchanged, and the non-advance itself
  recorded as a Version History row. The draft's general rule that every touched file takes the commit-1
  date would have reversed an owner ruling made the same day.

#### Accepted inconsistencies

- **D-88:** Recorded so the verifier and code review do not surface them as defects. (a) SC#3's
  *"both … carry the fleet-first de-provisioning order"* is HP-only in the sources — D-30, owner-ruled.
  (b) The matrix ships Approved and is absent from the publish bundle until Phase 152 — D-22.
  (c) U-6 may close as open without blocking — D-50. (d) `06` keeps vendor update clients generic while
  this phase names them — D-68. (e) SC#1 and BIOS-05 say "five-section" until D-02's amendment lands.
  **Research addendum: (c) should be updated for the plan — U-6 is no longer "open," it closes with a
  positive, sourced answer (see below). The accepted-inconsistency framing for (a) stays exactly as
  written; it is unaffected by U-6's closure.**
- **D-89:** *(reserved — not present in the numbered sequence as fetched; if the plan references D-89 it
  is a typo for one of D-01–D-88 above. Flagged here rather than silently omitted.)*

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

### Deferred Ideas (OUT OF SCOPE)

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

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-------------------|
| BIOS-05 | Three per-OEM guides authored to an identical section shape (amended by D-01 to six H2s) so the matrix is a genuine transposition. | Structural precedent confirmed: `docs/reference/aosp-oem-matrix.md` (RE-145) and `docs/operations/firmware-bios/01-windows-dfci.md` both read in full this session (headings, anchors, tail-H2 pattern). |
| BIOS-06 | The inverted-prerequisite pair (Dell needs no password; Lenovo needs one already set) as a cross-vendor decision point. | Re-confirmed this session: Lenovo's `Remove Password or Fingerprint Data` and `Change Supervisor Password` GUI actions both require the current Supervisor password (fetched `docs.lenovocdrt.com/guides/tbct_v2/` in full) — no bootstrap path exists in the tool. Dell's "no pre-existing password" requirement carried from `STACK.md §A-6`, not re-fetched this session (no single vendor page states it as a blocker in isolation). |
| BIOS-07 | HP Connect documented as a vendor connector (not a Win32 agent), with its cloud-vault custody quoted against Dell's no-customer-data statement. | Both custody quotes re-fetched and byte-verified today. **New finding: the complete Dell no-customer-data sentence is 241 characters, not the 166-character form the milestone research shipped — see Common Pitfalls.** HP Connect's Intune Partner-portals-tab presence (April 2023 onward) newly discovered and sourced this session — see U-6. |
| BIOS-08 | Think BIOS Config Tool V2 does not support ThinkCentre; the LBCT model list is not misattached to TBCT. | Both first-party statements re-fetched and byte-confirmed today. The reconciliation between them remains `[PREMISE]` — no page found this session states it explicitly. |
| BIOS-09 | Losing the management plane loses the secret, for both HP (30-day countdown) and Dell (subscription end), with the correct fleet-first order. | HP's 30-day countdown and orphaned-Remediations quotes re-extracted today with a cleaner `pdftotext -layout` pass — byte-identical to the milestone research. Dell's KB re-confirmed to document NO de-provisioning order at all, corroborating D-30's accepted inconsistency. |
| BIOS-10 | Password custody scope: two retrieval options with distinct roles, post-management readability, minimum authoring role. | The Dell Graph-API/RBAC manual page could **not** be re-fetched this session (JS-rendered, both `curl` and the `r.jina.ai` proxy failed) — this claim's confidence stays at its existing `STACK.md §A-6 SOURCED` level. Flagged for a plan-time re-attempt. |
| BIOS-12 | An enrolled `docs/reference/firmware-oem-matrix.md` transposes the three guides; registry row deferred to Phase 152. | Confirmed this session: the file does not yet exist; `RE-226` is the next free registry id (`RE-index.md`'s last row is `RE-225`); `docs/reference/aosp-oem-matrix.md` fully read as the shape precedent; four platform matrices' `## Key Gaps Summary` convention independently confirmed (and confirmed **absent** from the chosen `aosp` precedent, which is D-05's own scoping). |

</phase_requirements>

## Summary

This phase is 95% a governance/authoring exercise inside an already-mature documentation corpus (EEE/C17
enrollment, hand-authored anchors, link-checker, filename-map, glossary) and 5% new vendor-fact research.
150-CONTEXT.md, produced today by a five-agent adversarial review, already carries 89 tightly-scoped,
evidence-labeled decisions covering the corpus mechanics in full — this research does not re-derive any
of them. Its job, matching the phase's explicit Research flag, was to close the three named `[UNVERIFIED]`
recovery gaps (U-1 Lenovo lost supervisor password, U-2 Lenovo lost certificate private key, U-3 HP lost
Endorsement Key) and the two named open questions (HP Connect's presence in Intune's Partner-portals tab,
and whether a post-2022 HP Connect guide exists), using the same `curl`-with-browser-UA methodology the
milestone research established as load-bearing for this domain.

**Two of the three recovery gaps closed this session with new, sourced answers.** U-1 (Lenovo lost
supervisor password) is no longer a documented silence — Lenovo's own support KB states plainly that a
forgotten supervisor password requires system-board replacement by a Lenovo Service Provider, with no
software reset path. U-2 (Lenovo lost certificate private key) stays a documented silence, but the
absence is now corroborated by direct reading of the complete LBCT cmdlet reference (every mutating
operation requires the private key or an Azure Key Vault reference — there is no bypass cmdlet). U-3 (HP
lost Endorsement Key) remains the phase's one genuine, exhaustively-searched documented silence — three
HP developer-portal pages were re-fetched and none states a recovery path, and the one promising forum
thread found could not be fetched and would not have been shippable per D-60 regardless.

**Both open questions closed too, one with a real correction.** No post-2022 HP Connect guide exists
(re-confirmed by re-downloading and re-extracting the PDF today — still Version 1.2.0, 2022-09-27). But
HP Connect **does** appear in Intune's Partner portals tab, alongside Dell — this is documented on
Microsoft's own Intune Blog (two independent posts, Sept 2024 and Oct 2025), and it means the milestone
research's headline architecture table ("Connector linked from Intune UI? Yes for Dell / Not found for
HP") is now stale. The 00-overview.md sentence this phase must falsification-check ("administered at
`admin.hp.com` rather than in the Intune console") is not technically wrong, but it now needs a qualifier
so it does not imply an asymmetry with Dell that no longer exists — the two vendors are symmetric on UI
discoverability; they differ on secret custody, which remains the guide's correct routing spine.

**One further correction, found while re-verifying an already-decided quote:** the Dell
"no-customer-data" statement (BIOS-07/SC#3's mandated contrast quote) ships in the milestone research
truncated to 166 characters. The complete, accurate sentence — re-fetched today from Dell's own KB — is
241 characters, which crosses the C17 200-character blockquote cap. The planner needs to decide how to
ship it (first sentence only, or a structural split) before execution, not discover it mid-plan.

**Primary recommendation:** Treat 150-CONTEXT.md's 89 decisions as locked and unmodified. Use this
research's addenda (marked inline above and detailed below) to (1) update the Lenovo Recovery section's
shape from "two documented silences" to "one documented destructive path + one documented silence", (2)
add the corrected, longer Dell no-customer-data quote with an explicit shipping-format decision, and
(3) qualify (not delete) the HP "administered at admin.hp.com" sentence during the falsification-checklist
pass D-40 already mandates.

## Architectural Responsibility Map

This is a documentation-authoring phase, not a software phase — "tiers" below map to the doc-corpus's own
classification layers (EEE `doc_type` and directory-precedence rules), not application architecture.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Per-OEM procedural content (Delivery/Auth/Scope/Prereq/Offboarding/Recovery) | `docs/operations/firmware-bios/0{2,3,4}-*.md` (unenrolled Guide-shaped operations file) | — | Operations directory owns procedure; unenrolled per D-10/D-79 (no C17 cap on these files). |
| Cross-vendor capability comparison | `docs/reference/firmware-oem-matrix.md` (enrolled Reference, C17-bound) | — | Reference directory owns comparison/transposition; C17-enrolled per D-04/D-17/D-20. |
| Domain routing / custody framing | `docs/operations/firmware-bios/00-overview.md` (edited, not authored) | — | Already the domain's router (Phase 149); this phase edits it, does not re-architect it (D-36–D-42). |
| Terminology definitions | `docs/_glossary.md` `## Hardware` H3 set (enrolled `RE-184`) | — | Corpus-wide glossary owns term definitions; D-85/D-86. |
| Registry/publish-bundle inclusion | Phase 152 (`docs/_registry/RE-index.md`, `build-publish-bundle.mjs`) | This phase (frontmatter only) | Explicit blast-radius fence — D-20/D-22; this phase ships `doc_id`/`status` but not the registry row. |
| Deep DFCI mechanics | `docs/operations/firmware-bios/01-windows-dfci.md` (read-only) | — | Out of this phase's edit set entirely; D-41 "linking is not editing". |

## Standard Stack

Not applicable in the software-library sense — this is a Markdown-authoring phase inside an existing
house documentation toolchain. The relevant "stack" is the corpus's own validator and pipeline set,
already enumerated exhaustively in 150-CONTEXT.md's `<canonical_refs>` section (Validators and pipeline).
No new tooling, library, or dependency is introduced by this phase.

**Retrieval tooling used for this research pass** (not part of the shipped corpus, informational only):
`curl` with a browser User-Agent string (works for `developers.hp.com`, `docs.lenovocdrt.com`,
`blog.lenovocdrt.com`, `techcommunity.microsoft.com`, `learn.microsoft.com`), `pdftotext -layout` (for
the HP Connect User Guide PDF — cleaner output than the milestone research's own extractor), and the
`r.jina.ai` reader proxy as a fallback where direct `curl` and `WebFetch` were both blocked
(`www.dell.com`, `support.lenovo.com`). See Common Pitfalls for the full per-domain retrieval matrix.

## Package Legitimacy Audit

Not applicable — this phase installs no external packages (documentation authoring only).

## Architecture Patterns

### Guide-corpus routing (data flow)

```
Reader arrives at 00-overview.md (domain router)
        |
        v
"Who Holds the BIOS Secret" table --routes by custody-->
        |
   +----+----+----------------+
   v         v                v
Dell        HP               Lenovo
02-dell-    03-hp-           04-lenovo-
bios-       bios-            bios-
config.md   config.md        config.md
   |         |                |
   | six identical H2s each: Delivery / Authentication / Scope /
   | Prerequisites / Offboarding / Recovery (D-01)
   |         |                |
   +----+----+----------------+
        v
docs/reference/firmware-oem-matrix.md
  (## Summary -> six guide H2s as sub-tables, OEM columns ->
   ## Key Gaps Summary -> ## Source Attribution -> ## See Also ->
   ## Version History)
        |
        v
Reader lands on the SAME six-section shape whether they entered
through the overview (procedure-first) or the matrix (comparison-first)
```

### Recommended file shape (per D-01, D-05, and the `aosp-oem-matrix.md` precedent read in full this
session)

```
docs/operations/firmware-bios/
├── 00-overview.md          # EDITED this phase (D-36..D-42) — router, custody table
├── 01-windows-dfci.md      # READ ONLY (D-41) — sibling shape precedent for anchors/tail-H2s
├── 02-dell-bios-configuration.md    # NEW — six H2s + platform blockquote + tail H2s
├── 03-hp-bios-configuration.md      # NEW — six H2s (sub-divided by nothing; HP is single-tool)
└── 04-lenovo-bios-configuration.md  # NEW — six H2s, Delivery/Authentication each sub-divided
                                      #   by tool (TBCT V2 vs LBCT V2) per D-76

docs/reference/
├── aosp-oem-matrix.md       # STRUCTURAL PRECEDENT — read in full this session, see below
└── firmware-oem-matrix.md   # NEW — RE-226, C17-enrolled, Approved, registry row deferred (D-20/D-22)

docs/_glossary.md            # EDITED — 4 new ## Hardware H3 terms (D-85), index + version-history rows
```

### `aosp-oem-matrix.md` — the shape precedent (read in full this session)

Confirmed H2 order: `## Summary` → `## Scope` → four capability sub-tables (each followed by a
`> **Table summary:**` blockquote per D-07) → `## See Also` → `## Source Attribution` → `## Version
History`. Frontmatter: `doc_id: RE-145`, `status: Approved`, `doc_type: Reference`, `platform: Android`,
`review_by` = `last_verified` + 60 days. `## Source Attribution` carries one bullet per OEM plus a
section-level confidence pin for one sub-table — exactly the mechanism D-06/D-19 require this phase's
matrix to carry for its three documented-silence cells. `## Version History`'s own initial row records
its own shape decisions inline (`` `## Source Attribution` H2 per D-15... cell-value rules literal-strings
only per D-16... `` ) — this phase's matrix should do the same for its own D-01–D-89 shape decisions, at
least by reference.

**Confirmed absent from `aosp-oem-matrix.md`:** a `## Key Gaps Summary` H2. D-05/D-14 already scope that
convention to the four *platform* matrices (android/ios/linux/macos), not to `aosp` — independently
re-verified this session (`grep -n "^## Key Gaps Summary"` returns no match in `aosp-oem-matrix.md`, and a
match at the expected position in all four platform matrices). No action needed; recorded so the planner
does not second-guess D-05's ordering.

### Anti-Patterns to Avoid

- **Treating "documented silence" as "no answer" without checking one level deeper.** U-1's closure this
  session is the concrete lesson: the milestone research's U-1 register entry said "I did not locate a
  first-party Lenovo statement equivalent to Dell's Master Password Lockout article" — but the answer was
  one KB article away (`ht036206`), just behind a bot-protection wall that blocked the milestone
  research's own retrieval method (plain `curl`/`WebFetch`) but not a reader-proxy fallback. Before
  shipping a gap as "vendor is silent," confirm the block is a genuine content absence, not a retrieval
  failure with an untried fallback.
- **Shipping a truncated quote because the truncated form fits under a character cap.** The Dell
  no-customer-data quote is the concrete example (see Common Pitfalls) — the milestone research's 166-char
  version is accurate as far as it goes but omits a clause that changes what the sentence actually claims
  (Dell states its data flow mechanism, not just a bare denial). Truncating a vendor's own sentence to fit
  a formatting constraint is a fabrication-adjacent risk this phase's own research discipline exists to
  prevent — cite the complete sentence, then solve the formatting problem separately.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Cross-vendor capability comparison shape | A new matrix layout from scratch | `docs/reference/aosp-oem-matrix.md`'s H2 skeleton (D-05, confirmed by full read this session) | It is the corpus's only other OEM matrix and already encodes the `## Source Attribution` mechanism D-19's silence-cell vocabulary depends on. |
| "OS features gated by BIOS setting" content | Independent research into VBS/Secure-Boot/TPM gating chains | `docs/research/PITFALLS.md` §C1-5 (lines 284-292, already read by CONTEXT.md's D-12) plus `docs/decision-trees/03-tpm-attestation.md` as the cross-link target | Already sourced and corpus-linked; re-deriving it risks drift from the existing PITFALLS content. |
| Licence-floor content for HP Remediations | Restating the E3/A3/E5/A5 licence tiers inline | Link to `docs/reference/licensing-matrix.md` (confirmed to exist this session) | D-26 — link-not-copy; restating creates a second contradiction surface. |
| Vendor CLI/cmdlet full syntax reference | A BIOS token table or per-cmdlet parameter reference | Cmdlet **names** as signposts only (`Get-HPSecurePlatformState`, `Get-LnvSignedWmiCommand`, etc.) per D-64 | Explicit phase constraint (blast radius) — these guides are Intune-delivery-shaped, not vendor-manual replacements. |

**Key insight:** every "don't hand-roll" in this phase is a link-not-copy discipline, not a code-reuse
discipline — the phase's actual engineering risk is content drift between the guides and the matrix, not
redundant implementation.

## Common Pitfalls

### Pitfall 1: The Dell no-customer-data quote is truncated in the milestone research

**What goes wrong:** BIOS-07/SC#3 mandate this quote be shipped "quoted against" HP's cloud-vault
statement. The milestone research (`PER-OEM-BIOS-GAP.md:125`) ships:

> "Dell does not collect or retain any customer data from Microsoft Intune. The data remains in the
> Microsoft tenant but is supplemented with Dell-specific capabilities." (166 characters)

Re-fetched today (`dell.com/support/kbdoc/en-us/000356434`, via `r.jina.ai` reader proxy since raw `curl`
returns 403; Last Modified 23 May 2026, unchanged from the milestone research's fetch date), the complete
sentence is:

> "Dell does not collect or retain any customer data from Microsoft Intune. The data remains in the
> Microsoft tenant but is supplemented with Dell-specific capabilities **which are transacted with
> Microsoft infrastructure through Graph API calls**." (241 characters — bold added here to show the
> omitted clause; the source has no emphasis markup)

**Why it happens:** 241 characters is over C17's 200-character bare-blockquote cap (D-9/D-10); the 166-char
form is a genuine prefix of the real sentence and reads as complete on its own, so it is an easy,
plausible-looking truncation to make silently.

**How to avoid:** The planner must make an explicit choice at plan time, not leave it to the executor:
(a) quote only the true first sentence — "Dell does not collect or retain any customer data from
Microsoft Intune." (74 characters, well under the cap, and a complete, accurate, standalone sentence) plus
state the second clause as an unquoted claim; or (b) quote the full 241-character sentence using two
blockquotes split by a blank line (D-9 confirms this escapes the joined-run 200-char check) or as inline
quoted prose rather than a blockquote (C17 assertion 12 only matches `/^>/` at column 0, per D-10).

**Warning signs:** any quote in this phase that reads suspiciously like a complete sentence but sits just
under 200 characters is worth a byte-for-byte re-check against the live page before shipping.

### Pitfall 2: Per-vendor domain blocking is inconsistent, and no single retrieval method works everywhere

**What goes wrong:** Copying the milestone research's "use `curl` with a browser UA" rule (D-48) as a
blanket policy fails silently on some domains this session encountered for the first time.

**How to avoid — the retrieval matrix confirmed this session:**

| Domain | Raw `curl` + browser UA | `WebFetch` | `r.jina.ai` reader proxy |
|---|---|---|---|
| `developers.hp.com` | 200 (D-48's finding, re-confirmed) | 403 | not needed |
| `connect.admin.hp.com` (PDF) | 200 | n/a (binary) | not needed |
| `techcommunity.microsoft.com` | 200 | fails silently (returns only page title, no body — JS-rendered) | not tried, not needed |
| `learn.microsoft.com` | 200 | not tried | not needed |
| `docs.lenovocdrt.com`, `blog.lenovocdrt.com` | 200, full content (Material-for-MkDocs, mostly static) | not tried | not needed |
| `www.dell.com` (kbdoc pages) | **403** | not tried this session (prior research used it successfully in 149/milestone pass — inconsistent, may be rate-limited or UA-sensitive) | **200, full content** |
| `support.lenovo.com` | **403** | **403** | **200, full content** (note: `web.archive.org`'s snapshot of the same URL also returns only page chrome — the Wayback Machine captured the page before its JS rendered, so archive.org is *not* a reliable fallback for this domain) |
| `www.dell.com/support/manuals/...` (JS-heavy manual pages, not kbdoc) | not tried (kbdoc pattern suggests it would also 403) | not tried | **failed** — returned a 393-byte page fragment (an SVG icon's alt text), not the article; likely a client-side-rendered single-page app the reader proxy could not execute |

**Warning signs:** any fetch that returns HTTP 200 but with unexpectedly small `size=` (under ~2 KB for
what should be a full article) is a JS-shell page, not real content — check the extracted text length,
not just the HTTP status code, before treating a fetch as successful.

### Pitfall 3: A documentation-corpus fetch cache can go stale in exactly the same way a code dependency can

**What goes wrong:** Nothing changed in six days for any of the nine sources re-fetched this session
(2026-08-19 → 2026-08-25) — but that is a measured fact for *this specific window*, not a property of
vendor KBs in general. Dell's own KB metadata shows active revision cadence (KB 000140298 is "Version 14";
KB 000356434 is "Version 2", "Last Modified 23 May 2026") — these pages do change.

**How to avoid:** D-37's rule ("no string ships inside quotation marks unless it was read from the live
page at plan time") is not decorative — treat every quote in this RESEARCH.md file, including the ones
freshly re-verified today, as needing one more re-fetch at plan/execution time, per D-43's addendum above.

## State of the Art

Carried from `PER-OEM-BIOS-GAP.md`'s CURRENT-vs-DEPRECATED table (2026-08-19), with this session's
additions:

| Old / Incomplete Understanding | Current Understanding | When Changed | Impact |
|---|---|---|---|
| "HP Connect is not in the Intune admin center UI at all" (milestone research headline table) | HP Connect has appeared in Intune's **Partner portals tab** since April 2023 — same discovery surface as Dell | Discovered this session (2026-08-25); the underlying fact dates to April 2023 | Corrects an architecture-table asymmetry; does not change the custody-based routing logic, which remains the guide's correct spine |
| "Lenovo has no first-party statement on lost supervisor password" (milestone research U-1) | Lenovo's own support KB (`ht036206`) states: system-board replacement, no software reset | Discovered this session (2026-08-25); KB itself dates to 2015, still live | Converts a "documented silence" Recovery cell into a "documented (destructive) path" cell for one of the two Lenovo recovery gaps |
| Dell no-customer-data quote (166 chars, as milestone research shipped it) | Complete sentence is 241 chars and includes a Graph-API-transaction clause | Discovered this session (2026-08-25) | Blocks the quote from shipping as a bare blockquote without a formatting decision |

**Still current, re-confirmed unchanged this session:** DCECMI, Dell Command \| Configure, Dell
Management Portal, HP CMSL/Sure Admin/SPM, HP BCU (stale-not-deprecated), Lenovo TBCT V2/LBCT V2,
Commercial Vantage — see `PER-OEM-BIOS-GAP.md`'s own table for full version/date detail, none of which
this session found reason to revise.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Lenovo's general ThinkPad password KB (`ht036206`, published 2015, still live) applies to commercial fleet devices managed via TBCT V2/Intune, not just consumer standalone machines. No TBCT V2 documentation was found this session that overrides or supersedes it, and no separate "enterprise-managed device" version of the password-loss policy was found. | U-1 closure, Lenovo Recovery section | If Lenovo's fleet-management stack has a different (undocumented) escalation path for TBCT-V2-managed devices, the guide would understate the recovery options. Low risk — no contrary evidence found, and the underlying hardware mechanism (supervisor password stored in EEPROM/flash, not readable by software) does not change based on management tooling. |
| A2 | The reconciliation between TBCT V2's ThinkCentre exclusion and LBCT V2's ThinkCentre 2020+ support (i.e., "the settings tool can't drive ThinkCentre's WMI interface but the certificate capability still exists on the hardware") is the only reading consistent with both first-party statements. | BIOS-08, Lenovo Scope section | If wrong, a mixed ThinkPad+ThinkCentre fleet's certificate-tool guidance could be mis-scoped. Carried forward unchanged from the milestone research's own `[PREMISE]` label — this session found no new page that resolves it either way. |
| A3 | "Reset Supervisor Certificate" / "Reset System Management Certificate" BIOS-menu options (confirmed to exist, per a fresh fetch of `docs.lenovocdrt.com/ref/bios/settings/thinkpad/certbasedbiosauth/`) are gated behind the same private-key-dependent Unlock Code flow as full BIOS Setup access, and are therefore NOT a bypass for a lost private key. | U-2, Lenovo Recovery section | If these menu options are actually reachable without the private key, U-2 would be a real recovery path, not a documented silence — this would change the guide's Recovery section content materially. No page found this session states either way; this is the reason U-2 stays a documented silence rather than shipping as a resolved path. |
| A4 | The `r.jina.ai` reader-proxy extraction is a mechanical HTML-to-Markdown conversion (readability-style parsing), not an LLM-summarization pass, and therefore preserves source wording without paraphrase — used here to classify jina-sourced quotes as effectively `[DIRECT]` rather than `[RELAYED]`. | All Dell and Lenovo Support quotes retrieved via `r.jina.ai` this session (marked `[DIRECT via r.jina.ai]` in Sources) | If jina's reader mode does apply any LLM-based cleanup or reflow beyond whitespace normalization, quotes sourced this way could carry subtle wording drift from the true source bytes. Mitigated by cross-checking every jina-sourced quote against the WebSearch AI-summary of the same page where available (all matched); the planner should still re-verify at plan time per D-37 regardless. |

## Open Questions

All three named recovery gaps and both named open questions from the phase's Research flag are now
closed (two with positive sourced answers, one — U-3 — with an exhaustively-documented and now
double-searched absence). No open questions remain that block planning.

1. **Can the Dell BIOS-password RBAC/Graph-API page be re-fetched by some other method?**
   - What we know: `STACK.md §A-6` already sourced the two-RBAC-path claim (custom role vs Intune
     Administrator) before this milestone; the milestone research carried it forward unchanged.
   - What's unclear: this session's re-fetch attempt (both raw `curl` and `r.jina.ai`) failed against
     `dell.com/support/manuals/.../using-graph-apis-to-retrieve-the-dell-bios-password-manually` — it is a
     JS-heavy Dell manuals-platform page, structurally different from the `kbdoc` pages that fetch cleanly
     via `r.jina.ai`.
   - Recommendation: BIOS-10's RBAC claim can ship at its existing `SOURCED` confidence level without
     blocking the plan — it was not contradicted, only not re-verified. If a browser-automation tool
     becomes available at plan or execution time, re-attempt; otherwise ship as-is with the existing
     citation.

## Environment Availability

Skipped — this phase has no external tool/service/runtime dependency beyond the corpus's existing
git/Node validator toolchain (already covered under Standard Stack above) and standard web-fetch access
for the research pass itself, which is not a phase-execution-time dependency.

## Security Domain

This is a documentation-authoring phase with no application code, so most ASVS categories do not apply in
the usual sense. The phase's actual security content, however, IS a security topic — it documents
credential (BIOS password, signing-key) custody models across three vendors, which is exactly the kind of
content ASVS V6 (Cryptography/secrets handling) governs conceptually, even though no code is written here.

| ASVS Category | Applies | Standard Control |
|---|---|---|
| V2 Authentication | No | No application authentication surface is created; the guides describe vendor authentication mechanisms (BIOS passwords, Sure Admin certificates) as documentation subject matter, not as a system this phase builds. |
| V6 Cryptography / Secrets | Documentation-accuracy sense only | The guides must not overstate or understate where a secret (BIOS password, signing private key) actually lives — this is the phase's routing spine (custody, not tooling) and its main correctness risk, not a code-level control. |
| V5 Input Validation | No | No input-accepting code. |

### Known content-accuracy risk patterns for this phase (not STRIDE — a documentation-integrity analogue)

| Pattern | Risk | Standard Mitigation |
|---|---|---|
| Overstating vendor custody claims (e.g., implying HP Connect keys never leave HP's cloud when documentation says otherwise, or the reverse) | A reader making a security-posture decision (e.g., whether to use HP Connect at all) based on inaccurate custody claims | Quote vendor statements verbatim with source + date (D-37, D-43); never paraphrase a custody claim. |
| Silently truncating a vendor's own security-relevant statement (this session's Pitfall 1) | A reader misunderstands the actual data-flow mechanism (e.g., "no customer data" vs. "no customer data, but transacted via Graph API calls") | Full-sentence re-verification against live source bytes before shipping any quote near the character cap (this research's Common Pitfalls section). |
| Presenting an unsourced "system-board replacement" claim as fact for a vendor that has not said so (D-55's bar) | Service desk sets false expectations, or conversely fails to pursue an actual documented option | Ship vendor silence as an explicit, dated, page-cited absence (D-57/D-58/D-59) — this phase's own house convention exists specifically to prevent this failure mode. |

## Sources

### Primary (HIGH confidence — DIRECT, fetched and byte-verified this session, 2026-08-25)

- `https://techcommunity.microsoft.com/blog/microsoftintuneblog/intune-expands-oem-integration-in-partner-portal/4253264` — Microsoft Intune Blog, "Intune expands OEM integration in partner portal," Sep 25 2024 (footer: Updated Sep 23, 2024). Fetched via `curl` + browser UA, HTTP 200, 362802 bytes. **Closes U-6.** Quote: *"In April 2023, we announced HP Connect would be joining Surface in the Partner portals tab of the Intune admin center. This extended the depth of features HP devices could access (read more in this What's new post)."*
- `https://techcommunity.microsoft.com/blog/microsoftintuneblog/intune-partner-portal-adds-intel-vpro-integration/4461760` — Microsoft Intune Blog, "Intune partner portal adds Intel vPro integration," Oct 15 2025. Fetched via `curl` + browser UA, HTTP 200, 362430 bytes. Corroborates U-6. Quote: *"Last year, we welcomed the Dell Management Portal to this growing ecosystem of OEM integrations, joining the HP Connect Portal announced in spring of 2023 and the Surface Management Portal."*
- `https://connect.admin.hp.com/static/HPConnectUserGuide.pdf` — HP Connect for Microsoft Endpoint Manager User Guide, Version 1.2.0, September 27 2022. Re-fetched via `curl`, HTTP 200, 3177840 bytes; re-extracted with `pdftotext -layout` (cleaner than the milestone research's own extractor). **Closes U-8** (no newer edition exists). Re-confirms byte-identical: 30-day countdown quote (lines 196-201 of the extraction), orphaned-Remediations quote, lockout-on-mismatch quote (lines 806-808), "HP will store the keys from the certificate in HP's secure cloud" (page 33, previously uncaptured supplementary custody sentence).
- `https://developers.hp.com/hp-client-management/blog/secure-bios-hp-sure-admin-and-cmsl` — HP Developer Portal, "Secure BIOS with HP Sure Admin and CMSL" (Upd 9/10/2024). Fetched via `curl` + browser UA, HTTP 200, 70452 bytes. Re-confirms hardware-floor quote (197 chars) and Endorsement Key definition (169 chars, shipped fragment 48 chars) byte-exact.
- `https://developers.hp.com/hp-client-management/blog/hp-secure-platform-management-hp-client-management-script-library` — HP Developer Portal, SPM/CMSL blog. Fetched via `curl` + browser UA, HTTP 200, 59437 bytes. No EK-loss recovery path found (contributes to U-3's documented-absence disposition).
- `https://developers.hp.com/hp-client-management/blog/hp-sure-admin-step-step` — HP Developer Portal, "HP Sure Admin step-by-step." Fetched via `curl` + browser UA, HTTP 200, 68670 bytes. Independent re-confirmation of hardware-floor and EK-definition quotes.
- `https://support.lenovo.com/us/en/solutions/ht036206-types-of-password-for-thinkpad` — Lenovo Support, "Types of password for ThinkPad" (page metadata: Published 2015-06-09, still live). Raw `curl` and `WebFetch` both returned HTTP 403; retrieved via `r.jina.ai` reader-mode proxy (mechanical HTML-to-Markdown extraction — see Assumptions A4). **Closes U-1.** Quote: *"Reset forgotten supervisor password — If you forget your supervisor password, Lenovo cannot reset your password. You must take your computer to a Lenovo Service Provider to have the system board replaced."*
- `https://docs.lenovocdrt.com/guides/lbct/lbc_module_reference/` — Lenovo.BIOS.Certificates PowerShell Module Reference. Fetched via `curl`, HTTP 200, 156248 bytes, read in full. Every mutating cmdlet (`Get-LnvSignedWmiCommand`, `Set-LnvBiosCertificate`, `Submit-LnvBiosChange`, `Get-LnvUnlockCode`) requires `-KeyFile` or `-VaultName`/`-KeyName`; no recovery/bypass cmdlet exists. Corroborates U-2's documented-silence status.
- `https://docs.lenovocdrt.com/ref/bios/settings/thinkpad/certbasedbiosauth/` — Lenovo CDRT, "Certificate-based BIOS Authentication" reference. Fetched via `curl`, HTTP 200, full page read. Confirms "Reset Supervisor Certificate" / "Reset System Management Certificate" exist as local BIOS-menu items; does not state whether they require prior key-based unlock (basis for Assumption A3).
- `https://docs.lenovocdrt.com/guides/tbct_v2/` — Lenovo CDRT, Think BIOS Config Tool V2 guide. Fetched via `curl`, HTTP 200, full page read. Re-confirms byte-exact: *"This solution currently does not support ThinkCentre desktop products due to incompatible WMI BIOS Interface implementation."* Also confirms `Remove Password or Fingerprint Data` and `Change Supervisor Password` GUI actions both require the current Supervisor password (no remote-bootstrap path) — supports BIOS-06.
- `https://blog.lenovocdrt.com/certificate-based-bios-authentication/` — ThinkDeploy Blog, "Certificate-based BIOS Authentication," updated October 31 2025. Fetched via `curl`, HTTP 200, full page read. Confirms the "System Deployment Boot Mode" bootstrap-alternative language independently of the source D-55 originally cited.
- `https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows` — Microsoft Learn, BIOS configuration profiles. Fetched via `curl`, HTTP 200, 64589 bytes. Byte-identical to `00-overview.md`'s existing quote; `ms.date` 2024-06-06, `updated_at` 2026-07-01, both unchanged.
- `https://www.dell.com/support/kbdoc/en-us/000180749/dell-client-products-unauthorized-bios-password-reset-tools` — Dell KB (DSA-2020-119 mitigation article). Raw `curl` returned 403; retrieved via `r.jina.ai`. Byte-identical Master Password Lockout quote confirmed; additional detail found (Insyde-BIOS-March-2024 availability qualifier, not previously captured).
- `https://www.dell.com/support/kbdoc/en-us/000140298/dell-support-for-lost-bios-password` — Dell KB, "Dell BIOS Password Help." Raw `curl` returned 403; retrieved via `r.jina.ai`. "Article Number 000140298, Last Modified 01 May 2026, Version 14" — unchanged. Additional "Important Notes" callout found: *"If recovery isn't possible, motherboard replacement may be needed."*
- `https://www.dell.com/support/kbdoc/en-us/000356434/how-to-connect-dell-management-portal-to-microsoft-intune` — Dell KB, Dell Management Portal connection guide. Raw `curl` returned 403; retrieved via `r.jina.ai`. "Last Modified 23 May 2026, Version 2" — unchanged. **Complete no-customer-data quote and full 8-item consent-permission list re-confirmed — see Common Pitfalls Pitfall 1.**

### Secondary (MEDIUM confidence — search-corroborated, not independently re-fetched this session)

- WebSearch summaries corroborating the HP Connect / Intune Partner portals timeline (multiple independent third-party blogs: `blog.hametbenoit.info`, `prajwaldesai.com`, `petri.com`) — all consistent with the two DIRECT-sourced Microsoft blog posts above; not separately cited as authority, used only as corroboration.
- `PER-OEM-BIOS-GAP.md` (2026-08-19) — the phase's primary prior research artifact; every claim not specifically re-verified above is carried forward at its original confidence label (`SOURCED [DIRECT]` / `SOURCED [RELAYED]` / `PREMISE` / `UNVERIFIED`) exactly as that file states it.

### Tertiary (LOW confidence — attempted, not usable)

- `https://developers.hp.com/hp-client-management/forum/deprovision-secure-platformsecure-recover-without-keys` — HP Developer Portal forum thread found via WebSearch, directly on-topic for U-3. Raw `curl` returned 404; `WebFetch` returned 403. Not retrieved. Per D-60, even if retrieved, a community forum answer would not be shippable as a procedure — recorded as an attempted-and-blocked source only.
- `https://www.dell.com/support/manuals/en-us/command-endpoint-configure/dcec_ug/using-graph-apis-to-retrieve-the-dell-bios-password-manually` — Dell manuals-platform page for the Graph API RBAC detail (BIOS-10). Both raw `curl` (403) and `r.jina.ai` (returned a 298-393 byte fragment — an image alt-text, not the article) failed. BIOS-10's RBAC claim ships at its pre-existing `STACK.md §A-6` confidence, not upgraded this session.
- `http://web.archive.org/web/20260410201804/https://support.lenovo.com/us/en/solutions/ht036206-types-of-password-for-thinkpad` — Wayback Machine snapshot of the same Lenovo KB the `r.jina.ai` fetch succeeded on. Returned only page chrome (nav/locale selector), not the article body — the snapshot was captured before the page's JS rendered its content. Not usable; recorded so a future researcher does not re-try this exact fallback expecting a different result.

## Metadata

**Confidence breakdown:**
- Corpus/governance mechanics (C17, anchors, registry, filename rules): HIGH — all measured this session or directly inherited from 150-CONTEXT.md's same-day adversarial review.
- Vendor facts re-fetched this session (9 sources, 2026-08-19 → 2026-08-25 window): HIGH — byte-verified against live source bytes today.
- Vendor facts carried unchanged from `PER-OEM-BIOS-GAP.md` and not re-fetched this session (Dell RBAC/Graph API detail, Lenovo Commercial Vantage detail, DCU/DCDM/BCU currency table): MEDIUM — inherited `SOURCED`/`RELAYED` labels, not independently re-verified today.
- U-3 (HP Endorsement Key loss): LOW/honest-absence — exhaustively searched (developer portal, three separate pages, one forum thread attempted and blocked), genuinely undocumented by HP as far as this research can determine.

**Research date:** 2026-08-25
**Valid until:** 7 days for the freshly re-fetched vendor pages (fast-moving KB content, several show active revision history); 30 days for the corpus/governance mechanics (stable, validator-code-derived facts unlikely to change mid-milestone).
