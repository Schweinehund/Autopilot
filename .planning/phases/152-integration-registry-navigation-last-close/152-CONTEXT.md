# Phase 152: Integration, Registry & Navigation-Last Close - Context

**Gathered:** 2026-08-26
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase authors **zero new document content**. It makes the eleven documents authored in
Phases 146–151 reachable — registry rows, a regenerated filename map, both publish-pipeline
canaries, then navigation — and leaves the full corpus green with no accepted-violation
baseline introduced. Requirements INT-01 through INT-06.

The eleven documents, measured at HEAD by `git log --diff-filter=A --since=2026-08-19 -- docs/`:

| Path | H1 (the registry Title, verbatim) | `doc_id` on disk |
|---|---|---|
| `docs/operations/firmware-bios/00-overview.md` | Firmware and BIOS Governance | none |
| `docs/operations/firmware-bios/01-windows-dfci.md` | Device Firmware Configuration Interface (DFCI) | none |
| `docs/operations/firmware-bios/02-dell-bios-configuration.md` | Dell BIOS Configuration Through Intune | none |
| `docs/operations/firmware-bios/03-hp-bios-configuration.md` | HP BIOS Configuration Through Intune | none |
| `docs/operations/firmware-bios/04-lenovo-bios-configuration.md` | Lenovo BIOS Configuration Through Intune | none |
| `docs/operations/patch-management/05-linux-update-delivery.md` | Linux Update Delivery | none |
| `docs/operations/patch-management/06-windows-driver-firmware-updates.md` | Windows Driver and Firmware Updates | none |
| `docs/operations/patch-management/07-windows-autopatch.md` | Windows Autopatch | none |
| `docs/operations/patch-management/08-windows-app-updates.md` | Windows Application Updates | none |
| `docs/recipes/05-enterprise-update-plan.md` | Enterprise Update Plan: A Governed Update Posture for the Whole Fleet | `RE-227` |
| `docs/reference/firmware-oem-matrix.md` | Firmware OEM Capability Matrix | `RE-226` |

**Phase base SHA** `56f55307`. Every byte-unchanged assertion in this phase measures against it.

**Not in this phase.** New document prose; the `--version=v1.21` publish-bundle regeneration
(HARN-05, Phase 153); any `check-phase-NN.mjs` (HARN-04, Phase 153); retrofitting the twenty
legacy operations documents; correcting the stale hub descriptions.

</domain>

<decisions>
## Implementation Decisions

Every `[MEASURED]` row below was re-run against the repo during an adversarial review that
produced 57 confirmed findings. Nine of the reviewer's own disproofs were themselves overturned.
Where a decision reverses this session's first draft, it says so.

### Phase shape, commits and waves

- **D-01:** Exactly **two content commits**. Commit A is the registry atom; Commit B is
  navigation-last plus the four inbound links. INT-01's "one atomic unit, one commit" governs
  Commit A only; INT-04's navigation-last mandate makes the second commit compulsory, not
  discretionary. The two do not conflict and the plan must say so in INT-01's own terms.

- **D-02:** **Commit A is exactly four files** — `docs/_registry/RE-index.md`,
  `scripts/pipeline/filename-map.md`, `scripts/pipeline/build-filename-map.mjs`,
  `scripts/pipeline/build-publish-bundle.mjs`. This is byte-for-byte the shape of the precedent
  commit `f0b7aa90`.

- **D-03:** **Commit B's file list is derived, never fixed at two.** The first draft pinned it to
  the two index files and would have collided with the four inbound links (D-40..D-43), each of
  which lands in Commit B. The plan enumerates the real list before writing the commit contract.

- **D-04:** **Two commits is safe here for a reason the twin did not enjoy, and the plan states
  it.** Phase 137 needed a third commit, `c3733928`, to flip RE-224/RE-225 from `Draft` to
  `Approved`. `[MEASURED]` no flip is needed now — both enrolled documents already ship
  `status: Approved`, and the nine operations documents carry no `status:` key at all, so
  `checkDivergence` passes. A load-bearing premise held only implicitly is one the next document
  falsifies.

- **D-05:** **Four plans, four waves, strictly sequential.** Reverses the first draft's two.
  Wave 1 the registry atom; Wave 2 the publish-bundle proof in isolation; Wave 3 navigation-last;
  Wave 4 the inbound links, the terminal gates and the needle-spec handoff. The draft's two-plan
  shape put every structural edit, both hub files, the four inbound links and all terminal gates
  in one plan with no internal boundary — the phase's whole defect density. Phases 149, 150 and
  151 each used five plans for less structural surface.

- **D-06:** **Every executor prompt carries an explicit commit contract** naming its single content
  commit, the exact file list, and a prohibition on per-task commits. Phase 150's D-80 is the
  precedent — without the override the executor's default per-task commit shatters Commit A into
  four.

- **D-07:** **Wave 3 opens with a cleanliness gate that has teeth.** Assert
  `git log --oneline 56f55307..HEAD -- docs/_registry/ scripts/pipeline/` shows **exactly one**
  commit, and that `scripts/pipeline/filename-map.md` is byte-identical to its committed blob.
  A bare `git status --porcelain` is nearly a no-op after a commit — but see D-24, which makes a
  dirty `scripts/pipeline/` genuinely reachable.

### The registry atom — INT-01, INT-02, INT-03

- **D-08:** **Identifier allocation is `RE-226` for the matrix and `RE-227` for Recipe #5**, both
  already claimed in frontmatter, then `RE-228` through `RE-236` for the nine operations documents
  in path order — `firmware-bios/00,01,02,03,04` then `patch-management/05,06,07,08`. Frontmatter
  is authoritative over any planning artifact. `[MEASURED]` no identifier in `RE-226`..`RE-239` is
  claimed anywhere else in the repository.
  — **Reversibility:** one-way — a shipped identifier is the `.docx` filename's provenance and the
  registry has never renumbered a row.

- **D-09:** **Allocate from `max(registry, enrolled corpus) + 1`, never from the registry maximum
  alone.** Phase 150's D-21 rule. During this deferral window the registry maximum is `RE-225`
  while the corpus already carries `RE-227`, so the registry-only method yields a collision.

- **D-10:** **All eleven rows land at `Status: Approved`.** Required by SC#1 and forced by
  mechanism — `build-publish-bundle.mjs:312` filters on it, so `Pending` would silently exclude
  them and defeat INT-02.

- **D-11:** **The `Approved` semantic exception is recorded in `## Review Notes`, not left silent.**
  The registry's own header note defines `Approved` as "EEE-retrofitted and C17-green in phases
  116–118", and the nine operations rows will be neither. The note binds nothing executable and
  describes a completed 2026-07 retrofit wave, so INT-02's dated owner ruling wins — but the
  `RE-212` entry is the standing precedent for recording exactly this class of exception, and
  without it a reviewer re-litigates nine rows.

- **D-12:** **Doc Type is `Guide` for the nine operations documents, `Reference` for the matrix,
  `Guide` for Recipe #5** — and the plan cites the rule rather than asserting the value.
  `docs/_standards/EEE-SOP-standard.md` §D-08 rule 1's directory precedence covers only
  `decision-trees/` and `*-lifecycle/`, so rule 2 governs — an executable end-to-end procedure
  takes `Runbook` or `Guide` — and resolves before rule 3's `Reference` default can fire. The
  operations index's own column header is literally `| Guide | Covers |`. Nine sibling rows agree.

- **D-13:** **Titles are the H1 verbatim, all eleven.** `[MEASURED]` this is not a new rule but a
  225/225 existing invariant — every current registry Title equals its file's H1 exactly. The
  Title column is the sole source of the `.docx` output filename, so a tidied title silently
  renames the published file and no gate catches it.

- **D-14:** **The matrix keeps its unprefixed Title.** Five of the six sibling `*matrix*` rows
  carry an `Intune: ` prefix and `Firmware OEM Capability Matrix` does not. Verbatim-H1 wins over
  the sibling pattern; record it as intentional so review does not read it as an oversight.

- **D-15:** **Rows append at the tail, inside the table, before `## Review Notes`.** Matches how
  `RE-222`..`RE-225` landed. Accept and record that `RE-226`, a `docs/reference/` path, breaks the
  historical directory-grouped block that runs `RE-142`..`RE-167`.

- **D-16:** **The filename map is regenerated by `node scripts/pipeline/build-filename-map.mjs`
  and never hand-edited.** `[MEASURED]` by execution in a scratch tree — appending the eleven rows
  and running the real generator yields `Parsed 236 registry rows -> 236 output filenames, 0
  unresolved collisions`, and the diff against the committed map is `236a237,247`: eleven pure
  additions, zero reordering, zero renames. The rename hazard that would have existed — a new
  title whose base slug collides with an existing one, flipping that group from single to
  multi-member and renaming the **incumbent** `.docx` via the D-08 disambiguator — does not fire
  for any of the eleven.

- **D-17:** **Both canary literals are bumped at four sites each, not three.** This corrects the
  first draft, which would have shipped a stale module header.
  `[MEASURED]` `build-filename-map.mjs` carries `225` at lines 274, 276, 282, 283.
  `build-publish-bundle.mjs` carries it at lines **8**, 515, 520 and 523 — line 8 is the module
  header, roughly five hundred lines outside the range the draft cited, and **no self-test catches
  a stale comment**. The precedent plan for Phase 137 names four literal sites for this canary
  including "the header comment", and `f0b7aa90`'s own commit body says "header comment, label,
  assertion".
  — **Reversibility:** costly — a missed canary is invisible until the next milestone greps it,
  which is exactly how the second canary sat red for a whole milestone.

- **D-18:** **Each canary gets a new appended provenance line, never an in-place edit of the
  existing history.** `f0b7aa90` added `bumped 223 -> 225 in Phase 137` beneath the existing
  `221 -> 223` line, and the Phase-137 plan mandated it so the next milestone can grep the ledger.
  "Bump both literals" reads as in-place and would destroy the drift ledger that let Phase 137
  detect the earlier miss.

- **D-19:** **Both canary targets are computed from the registry after the rows land, and measured
  separately.** INT-03 names the instrument verbatim — `grep -c "^| RE-"` for the all-rows canary;
  the Approved-only count for the bundle canary. Never transcribe a predicted number.

- **D-20:** **Measuring the two separately still matters even though both will read the same
  value.** They are equal today only because every row is Approved; a single non-Approved row
  silently diverges them. The deliverable is the method, not the number.

- **D-21:** **Ordering inside Commit A** — verify the allocation ceiling, append the eleven rows,
  regenerate the map, measure each canary against the set that canary actually counts, bump both
  with their provenance lines, then run both `--self-test` invocations.

- **D-22:** **The nine operations documents receive no `doc_id`.** INT-02's owner ruling. They are
  not C17-gated and the twenty legacy operations documents are not retrofitted.

### The publish-bundle proof — SC#3

- **D-23:** **The bundle run MUST pass `--version=v1.21.0`.** This reverses the first draft, which
  said to omit the flag. `[MEASURED]` `build-publish-bundle.mjs:40` defaults `VERSION` to
  `'v1.17'` and line 483 renames the zip unconditionally, so the drafted instruction would have
  overwritten the shipped `dist/docs-library-v1.17.zip` — 3,711,194 bytes, dated 2026-07-12 — with
  236 v1.21 documents under a v1.17 name. `v1.21.0` is legal under the zip-name pattern and stays
  distinct from HARN-05's `v1.21` artifact in Phase 153.
  — **Reversibility:** one-way — the clobbered artifact is a shipped deliverable with no source of
  truth other than the file itself.

- **D-24:** **The run is not confined to gitignored output.** `[MEASURED]` `runBatch` re-runs
  `build-filename-map.mjs` and rewrites the **tracked** `scripts/pipeline/filename-map.md`. It is
  idempotent after Commit A, so it earns no third commit — but the plan asserts byte-equality
  afterwards rather than claiming the surface was never touched.

- **D-25:** **Budget the run and pre-check its preconditions.** `[MEASURED]` roughly 1.4 seconds
  per document across 236 documents, about six minutes — past the default two-minute tool timeout
  and near the ten-minute ceiling. `convert.ps1` hard-fails on any pandoc other than exactly
  3.7.0.2; pandoc 3.7.0.2 and pwsh 7 are present on this machine. A timeout kill leaves a staging
  directory and a `.tmp` zip behind.

- **D-26:** **Assertions are computed, not transcribed** — the converted count equals the Approved
  row count read back from the run, zero conversion failures, all eleven new stems present in
  `manifest.csv`, and `guard-docx.mjs` clean.

- **D-27:** **The research flag's pre-flight is NOT already discharged, and the plan says so.**
  This reverses the first draft. INT-02's `[MEASURED]` note covers convert and guard only — it
  never ran the bundle, never exercised the filename-map coverage or parity checks, and never
  touched the manifest, which is precisely what the ROADMAP flag names. The real-row run in Wave 2
  is accepted as the discharge, and the ordering inversion is recorded rather than hidden.

- **D-28:** **The nine blank manifest `Status` cells are accepted and recorded.** `[MEASURED]`
  the manifest sources Status from the source frontmatter with an empty-string fallback, and the
  nine operations documents carry no `status:` key by INT-02's design. Adding one would drag them
  toward the retrofit INT-02 excludes. Recorded so code review does not surface it as a defect.

### The operations index — INT-04

- **D-29:** **The heading is `## Firmware and BIOS Governance`.** Corrects the first draft's
  `## Firmware and BIOS`, whose stated ground — that no sibling operations-index H2 carries
  "Governance" — is refuted by `## Apple Business Governance` three lines up in the draft's own
  list. With that reason removed, the recorded literal in the milestone architecture artifact is
  the `& `-form of this heading, and applying 149 D-66's ratified and-not-ampersand convention to
  it yields exactly this string. Slug `firmware-and-bios-governance`, no double hyphen.

- **D-30:** **The heading is appended after `## Apple Business Governance` and before
  `## Version History`.** Reverses the first draft's domain-adjacency placement, which the draft
  itself rated low-confidence. No validator asserts H2 order on this file — both readers use
  substring presence — so the choice is unforced, and appending is the only precedent (Phase 65
  appended Apple Business as the fifth section), gives the smaller diff, and preserves the
  existing one-to-one ordering mirror with the `docs/index.md` Operations sub-headings. The same
  placement rule applies to both files.

- **D-31:** **The new section carries a `| Guide | Covers |` table with six rows** — the five
  `firmware-bios/` documents plus a cross-directory row for `../reference/firmware-oem-matrix.md`.
  The Apple Business section establishes cross-directory rows on this file at five of five. The
  matrix row is beyond INT-04's literal wording and is flagged as such; it is the matrix's only
  operations-side reachability given D-38.

- **D-32:** **The Patch region grows from five rows to nine** — a decision the first draft assumed
  twice and never made, despite meticulously flagging five smaller additions. Append four rows in
  filename order after the Android row, each opening with a markdown link, each with one terse
  Covers clause matching the existing five. INT-04 and SC#4 read the singular "a Patch row";
  `REQUIREMENTS.md` resolves it in favour of four, and Phase 145's FIX-12 converted the row-count
  equality to a frozen read specifically so this growth is safe.

- **D-33:** **The stale `4-platform comparison hub` description at line 32 stays stale.**
  **[OWNER-RULED 2026-08-26]** Reverses the first draft, which proposed fixing it.
  `REQUIREMENTS.md` states that Phase 152 grows the region "without correcting the description —
  that phase is scoped to adding rows", and 149 D-68 lists this exact cell among accepted
  inconsistencies that stay stale and unowned. The draft had quoted only the trailing trigger
  clause of the deferral. Re-recorded in Deferred Ideas so the verifier and code review do not
  raise it as new.

- **D-34:** **Had that gone the other way it would have been four sites, not two** — recorded
  because the draft's own framing was wrong and a future phase will inherit it. `[MEASURED]` the
  two description cells carry **different literals**, and the lead-in sentences above both tables
  omit Linux as well. Worse, the substring `4-platform comparison hub` also occurs at two further
  operations-index rows that are **genuinely still four-platform**, so a blanket replace makes the
  corpus less accurate in two places while fixing one. There is also a real file whose name
  contains the string.

- **D-35:** **INT-04's "barred literal heading" for Firmware is vacuously satisfied, and the plan
  records the measurement rather than guessing.** The barred-heading class on this file has exactly
  three members, each a negative naming the **short** form of a section a later phase would add —
  `## Patch Management`, `## App Lifecycle`, and `## Drift Detection` / `## Tenant Migration`.
  None concerns Firmware. Two corrections travel with this: it supersedes 149 D-66's claim that
  `## Patch Management` is "the only barred literal heading on record", and D-66's cited
  coordinate is dead — the file is `.planning/research/PITFALLS.md`, not `.planning/PITFALLS.md`.
  The natural literal for a Phase-153 negative would be `## Firmware`.

- **D-36:** **A Version History row at the top of the table**, dated at execution, naming both
  edits and the requirement identifier, Author cell `--`. The table is reverse-chronological.
  Two TBD-token scans bind this file outside Version History, not one — the draft named only one
  of them.

- **D-37:** **The operations-index frontmatter is not re-stamped** — right answer in the first
  draft, fabricated justification. The draft claimed no validator pins its dates. `[MEASURED]`
  `V-53-06` in `check-phase-53.mjs` is a **live** read, this file is in its `CONTENT_FILES`, and
  it asserts non-empty `platform:` and `audience:`, well-formed date stamps, and a
  `review_by` minus `last_verified` interval of at most sixty days — and the file sits at
  **exactly sixty days, zero margin**. Not re-stamping is safe; the standing constraint is that
  any future re-stamp must keep that window at sixty days or fewer.

### `docs/index.md` — INT-04

- **D-38:** **SC#4's "an Operations entry" is a new `### Firmware and BIOS Governance` sub-heading**
  with a lead-in sentence and a `| Resource | Description |` table, placed to mirror D-30.

- **D-39:** **Three rows in that table** — the domain overview, the DFCI guide, and the Dell guide.
  The existing Operations sub-tables are curated samples, not exhaustive, and Phase 65's Apple
  Business section shipped exactly three.

- **D-40:** **`docs/index.md` is C17-enrolled and the operations index is not.** Never stated in
  the draft. Commit B therefore edits one file bound by all thirteen C17 assertions and one bound
  by none, and every gate reasoning must distinguish them.

- **D-41:** **The Patch sub-table gains exactly one row, for Linux update delivery.**
  **[OWNER-RULED 2026-08-26]** The draft's stated reason is withdrawn: "closes the only
  representation gap" is false, because that table shows Overview, Windows and Android, leaving
  macOS and iOS equally unrepresented. The honest ground is that Linux is the one platform with a
  shipped guide and zero presence anywhere in the master hub's Operations block.

- **D-42:** **A recipes table row for Recipe #5**, appended after the `RE-225` row in filename
  order, mirroring `b694254f`. The description cell is written fresh and must not imply a device
  end state.

- **D-43:** **The quick-nav edit is line 38 only, and line 39 is left alone.** This corrects the
  draft's largest single error. `[MEASURED]` the direct structural precedent — Phase 65's
  `f4399195`, which added an Operations sub-heading exactly as this phase does — amended the
  platform-coverage banner blockquote, inserted the sub-heading with a three-row table, appended
  two Cross-Platform References rows, and **deliberately did not touch the Operations quick-nav
  bullet**. That bullet has therefore been missing Apple Business since 2026-05-22 by ratified
  precedent. The draft named the site Phase 65 left alone and missed the site it amended.

- **D-44:** **The operational-domain clause is appended to the banner blockquote at line 23, never
  line 21.** `[MEASURED]` under C17 assertion 12's own measurement rules — which strip the
  blockquote marker and join only **consecutive** marker runs, and lines 21, 23, 25 and 27 are four
  separate paragraphs — line 21 measures 182 stripped characters against a 200-character cap,
  leaving eighteen characters of headroom, and any realistic clause reds C17 there. Line 23
  measures 143 and has fifty-seven. Line 23 is also the semantically correct target: line 21 is the
  platform-provisioning list, line 23 is the operational-domain enumeration.
  — **Reversibility:** reversible, but the failure is a hard C17 red on an enrolled file, so the
  line choice is a plan-time constant, not an executor judgement call.

- **D-45:** **The recipes quick-nav fragment is `enterprise update plan`**, lowercase, matching the
  existing list's style.

- **D-46:** **The bullet's lead-in prose is amended** to read "End-to-end provisioning and
  governance recipes with embedded admin decision points". Recipe #5 is a governance recipe, and
  the parenthetical is otherwise a device-end-state list that it does not belong to.
  `[MEASURED]` safe — the bullet assertion anchors at line start and then tests only the recipe-03
  and recipe-04 fragments on the isolated line, and no validator anywhere pins the lead-in prose.

- **D-47:** **A `docs/index.md` Version History row**, placed at the top. Right answer in the
  draft, invented evidence: `[MEASURED]` Phase 81 was rows-only and Phase 99 a single cell edit,
  and both received rows. The real pattern is that essentially every edit gets a row and Phase 137
  is the outlier. The table is not strictly sorted, so top placement is convention rather than a
  sort invariant.

- **D-48:** **No `docs/index.md` row for the firmware OEM matrix.** Reverses the first draft, whose
  premise was false. `[MEASURED]` four of the eight `docs/reference/` matrix and comparison files
  are absent from `docs/index.md` entirely — including `aosp-oem-matrix.md`, the other OEM matrix
  and the precedent Phase 150 chose for this one. The precedent for an OEM matrix is absence.
  D-31's operations-index row gives it reachability.

- **D-49:** **The must-remain-stable anchor rule binds this file.** Phase 65's commit records it
  by name for the Operations and Cross-Platform References anchors. No H2 rename.

- **D-50:** **Every new row's link target and fragment must resolve.** The operations index is not
  one of the four registered nav hubs, so its rows are policed by the corpus-wide
  target-existence and anchor-resolution scan rather than by the hub roster.

### Inbound link wiring — owner-ruled in scope

**[OWNER-RULED 2026-08-26]** All four land in this phase. Each was deferred by its own phase
**specifically because Phase 152 owns it**, and the first draft dropped three of them entirely.

- **D-51:** **The reciprocal firmware link.** From `docs/operations/patch-management/06-windows-driver-firmware-updates.md`
  back into `docs/operations/firmware-bios/`. This was added to Phase 149's summary by the
  orchestrator after the phase verifier found it in **no phase's inheritance**, and review finding
  WR-07 made its deferral conditional on recording all four touch points so the navigation phase
  would inherit a checklist rather than a guess. The companion site `01-windows-wufb-rings.md` is
  deferred explicitly if its pins bind — on the record, not by omission.

- **D-52:** **The app-lifecycle return link.** From `docs/operations/app-lifecycle/00-overview.md`
  to `08-windows-app-updates.md`. Phase 148 declined to edit that directory on the explicit basis
  that inbound links are Phase 152's, and its D-73 names them verbatim. Today `08` links out and
  nothing links in.

- **D-53:** **The apv2 WinGet link.** `docs/admin-setup-apv2/02-etg-device-group.md`'s bare
  unlinked "Microsoft Store (WinGet)" gains a link to `08`'s reconciliation section. Phase 148
  logged it as an accepted gap with the inbound wiring handed here. The third site in
  `03-device-preparation-policy.md` stays on the backlog per that phase's D-64.

- **D-54:** **The apv1 hardware-hash link.** From `docs/admin-setup-apv1/01-hardware-hash-upload.md`
  to the DFCI guide's prerequisites. Phase 149 handed this forward **by name** because INT-04's
  enumeration does not reach it. Two corrections travel with it. The literal was genuinely
  unresolved between two prior decisions — one rules "link the file, not a heading anchor" but
  governs links **into** that file, while the hand-forward describes this outbound link as going
  to the prerequisites; the target is the DFCI guide's prerequisites-and-disqualifiers heading.
  And it is not "one line": that file is `RE-077`, C17-enrolled, carries its own See Also and
  Version History sections, and is past its review date, so the plan decides the host section and
  whether a history row lands.

- **D-55:** **Phase 148's D-73 handed forward a class, not two files** — "all inbound nav-hub
  wiring". D-51 through D-54 are that class as currently known; the plan does not treat INT-04's
  two-file enumeration as the boundary.

- **D-56:** **Guide-level back-links to Recipe #5 stay deferred.** Phase 151's D-67 already ruled
  it, recipes 03 and 04 carry line-count pins, and it is genuinely unowned. Re-recorded below.

### The successor validator — INT-05

- **D-57:** **Phase 152 authors zero validators and hands a fully pre-specified needle-spec to
  Phase 153.** **[OWNER-RULED 2026-08-26]** The precedent is unanimous across three milestones —
  `check-phase-129`..`133` from Phase 134, `135`..`137` from Phase 138, `139`..`143` and the apex
  from Phase 144 — and v1.19's Phase 137, this phase's exact structural twin, committed the
  handoff rather than the validator. HARN-04 assigns `check-phase-145`..`152` and the apex to
  Phase 153 with a chain range generated by arithmetic.

- **D-58:** **A third option existed and is recorded as declined, not overlooked.** The first
  draft presented a false binary. `[MEASURED]` `c17-eee-contract.mjs` was authored in a v1.15
  **content** phase and `check-nav-hub-links.mjs` in a v1.16 **navigation-content** phase — a
  navigation validator authored inside the navigation phase, the exact analog of what SC#5 asks.
  Neither is a `check-phase-NN` leaf, so neither sits inside HARN-04's atom, and either would
  satisfy SC#5's literal "authored additively" with no owner ratification at all. Declined
  because Phase 153's leaf would duplicate it.

- **D-59:** **SC#5 is discharged as two obligations, explicitly, never silently.** The content
  precondition lands here — the three troubleshooting hubs stay unwired to `recipes/05-`, the
  master hub carries the table row and the quick-nav fragment, the frozen validator is
  byte-unchanged, and C17 and the link checker both exit 0. The enforcement is handed forward.

- **D-60:** **Byte-unchanged is proved against the phase base, not the working tree.** Use
  `git diff --quiet 56f55307 -- <path>` or a blob-SHA pin. A bare `git diff --stat` reports only
  the unstaged tree at one instant, so a validator edited and committed mid-phase would show
  clean. SC#5's subject is the recipe-hub validator alone; asserting the Phase-137 one too is
  strictly stronger and is labelled as extra.

- **D-61:** **The needle-spec covers both hub files and the filename map, not just the master
  hub.** The draft ported a one-file validator to a two-file phase. Required needles: the master
  hub's table row linking Recipe #5; the single quick-nav bullet line tested **in isolation**
  rather than by whole-file substring, because a whole-file test false-matches two lines above it;
  the three troubleshooting hubs not referencing `recipes/05-`; the self-reference guard; a
  **filename-map needle**, whose omission would be a straight regression against the twin, which
  carries one; and operations-index needles for the new heading, the four Patch rows and the
  Version History row, plus a master-hub needle for the new sub-heading.

- **D-62:** **Needle literals are transcribed, never composed at execution time** — except the
  canary equality, which INT-03 requires be computed. These are different objects and the rules do
  not conflict.

- **D-63:** **The handoff is recorded on both surfaces.** `[MEASURED]` the precedent commit touched
  `STATE.md` only, one line, while the resulting validator's header cites both the plan summary and
  the STATE entry. A needle-spec living only in a summary is not on the surface a Phase-153 planner
  reads.

### Corpus greenness and the no-baseline rule — INT-06

- **D-64:** **No edit to `scripts/validation/v1.20-audit-allowlist.json`, at all.** INT-06 had
  **zero decisions** in the first draft — one of the phase's six requirements. `[MEASURED]` that
  file carries 73 line-pinned exemptions plus **two empty buckets** whose names are the reflex fix
  for the two failure classes this phase can actually cause. Filling either is precisely what
  INT-06 forbids, and HARN-03 assigns the allowlist bump to Phase 153. The terminal assertion is
  that the file is byte-unchanged from `56f55307`.
  — **Reversibility:** one-way in practice — an accepted-violation entry outlives the milestone
  that added it, which is why the link checker's own header bars the class outright.

- **D-65:** **A prose constraint on every new hub cell, heading, lead-in and history line.** The
  milestone audit walks `docs/` **live** with four case-insensitive patterns, cleared only by a
  disambiguation keyword within a 200-character window. The reachable one is the adjacent phrase
  formed by `Autopatch` followed by `rings`. `[MEASURED]` there is exactly one corpus hit, the
  disambiguation heading in the WUfB rings guide, green only by its own intra-line keyword. The
  live exposure is this phase's description cell for the Autopatch guide, which is *about* groups
  and rings — write "Autopatch groups and the Test and Last deployment rings" instead. The same
  bar applies to `System Center`, to `SCCM` near `Intune`, and to `SafetyNet` near `compliance`;
  the cheapest defence is to write `Configuration Manager`. A red here must be fixed in the prose,
  never in the allowlist.
  **Note on how this was established:** the adversarial reviewer disproved this finding using a
  case-sensitive grep against a pattern the code compiles case-insensitively — the identical error
  it had convicted a finder of two findings earlier. The referee overturned it.

- **D-66:** **A planning-artifact constraint.** One corpus-wide negative scans `.planning/` as
  well as `docs/` for a bare platform-applicability blockquote token outside code fences. This
  phase's own CONTEXT and plan files are in scope; quote the forbidden form only inside a fence.

- **D-67:** **The terminal gate set is three, not two.** Full-corpus C17, the link checker, and
  **the apex `node scripts/validation/check-phase-144.mjs` measured at 101 pass, 0 fail, 0
  skipped**, run after the last commit. The draft named only the first two. `[MEASURED]` the apex
  is 101/0/0 at HEAD, and it is the only gate that executes the milestone audit and therefore the
  live corpus walk in D-65.

- **D-68:** **The expected post-phase C17 count is 236 files, 0 violations, unchanged.** This is
  the cheapest observable proving no operations document accidentally acquired a `doc_id` — that
  is, that INT-02 held. Label it distinctly from the post-phase registry row count, which is also
  236; the collision is live and will confuse a reviewer.

- **D-69:** **A byte-unchanged assertion over the eleven authored documents**, against `56f55307`.
  Phases 150 and 151 both closed on explicit proofs. Only the registry, the two hub files and the
  four inbound-link host files may change.

- **D-70:** **The link checker admits no baseline by construction** — its own header states it
  exits 0 only on zero failures with no allowlist, ratchet or expected-failure list of any kind.
  Every failure it reports is fixed in the content.

### Superseded artifacts and recorded dispositions

- **D-71:** **`.planning/research/ARCHITECTURE.md` is superseded on four specific points, by name.**
  It is still cited by this milestone's phase contexts, so a planner reads it first. It states
  twelve new registry rows where there are eleven; it assigns `RE-226` and `RE-227` to the
  **opposite** documents from their frontmatter; it records the ampersand form of the two new
  headings, which D-29 supersedes; and it still describes the operations-index row-count equality
  as a live read and a blocker, which Phase 145's FIX-12 retired.

- **D-72:** **Phase 151's hand-forward prescribes three registry fields that do not exist.** The
  table has five columns. The extra fields are silently dropped and the drop is recorded.

- **D-73:** **The twenty legacy operations documents stay unregistered, and the measured
  consequence is recorded rather than suppressed.** Registering them is out of scope — INT-02 and
  SC#3 both scope to **new** documents and the legacy twenty are parked in a future hygiene
  milestone. But the first draft filed the asymmetry as a note telling the verifier not to look.
  `[MEASURED]` the eleven new documents link out to **nine** unregistered operations documents,
  five of them to the patch-management overview alone, so the published bundle ships new documents
  whose most-cited routing hub is not in the library. The bundle rewrites no links, so this is a
  content-completeness fact, not a broken-anchor one. Record the number and the nine paths.

- **D-74:** **No `docs/reference/00-index.md` row for the matrix.** `[MEASURED]` four of seven
  reference matrices have no row there, including the OEM sibling, so absence is the status quo
  rather than a defect; and that index is not a registered nav hub, so omission cannot redden the
  link checker. Phase 150 handed this forward as a disposition to record either way — this is the
  record.

- **D-75:** **Requirement-row status flips and the roadmap checkbox are not this phase's
  decisions.** The milestone close-gate flips requirement rows in one commit and the execute-phase
  machinery advances the roadmap and state.

### Claude's Discretion

- Exact Covers-clause wording for the ten new hub rows, subject to D-65's prose constraint.
- Placement of the inbound links within their host files' sections, subject to D-54.
- Whether `01-windows-wufb-rings.md` receives the D-51 companion link, decided at plan time
  against its pins and recorded either way.
- The precise task decomposition inside each of the four waves.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Governing requirements and scope
- `.planning/ROADMAP.md` — the Phase 152 section: goal, dependencies, the five Success Criteria,
  blast radius and the research flag. Also the Phase 153 section, which owns everything this phase
  hands forward.
- `.planning/REQUIREMENTS.md` — INT-01 through INT-06 in full; HARN-03, HARN-04 and HARN-05 for
  the Phase-153 boundary; the Validator Constraints table; Future Requirements, which carries the
  stale-description deferral D-33 relies on; Out of Scope, which parks the legacy twenty.
- `.planning/STATE.md` — the Plan-Time Research Flags block is one of the two surfaces the D-63
  needle-spec handoff must land on.
- `.planning/research/ARCHITECTURE.md` — **superseded on four points by D-71.** Read D-71 before
  trusting any Phase-152 row in it.
- `.planning/research/PITFALLS.md` — note the path; a prior phase cited it at a location that does
  not exist.

### Predecessor hand-forwards this phase consumes
- `.planning/phases/145-corpus-correction-validator-gate-archival-drift-fix/145-CONTEXT.md` —
  D-38, recorded *for* Phase 152: the six validators that read the operations index and the
  naming constraints they impose.
- `.planning/phases/148-application-update-management-winget-routing/148-CONTEXT.md` — D-35, D-44
  and D-73, the source of D-52, D-53 and D-55.
- `.planning/phases/149-firmware-bios-domain-overview-dfci-surface-uefi/149-CONTEXT.md` — D-44 and
  D-66, the source of D-54, D-29's and-not-ampersand convention, and the undefined barred-heading
  flag D-35 closes; D-68's accepted inconsistencies, which D-33 relies on.
- `.planning/phases/149-firmware-bios-domain-overview-dfci-surface-uefi/149-05-SUMMARY.md` —
  item 4b and review finding WR-07, the source of D-51. This is the item every draft missed.
- `.planning/phases/150-per-oem-bios-guides-capability-matrix/150-CONTEXT.md` — D-20, D-21, D-22.
- `.planning/phases/150-per-oem-bios-guides-capability-matrix/150-04-SUMMARY.md` and `150-05-SUMMARY.md` —
  the "Phase 152 hand-forward" sections.
- `.planning/phases/151-recipe-5-the-enterprise-update-plan/151-CONTEXT.md` — D-67, D-70, D-75.
- `.planning/phases/151-recipe-5-the-enterprise-update-plan/151-05-SUMMARY.md` — the four-part
  hand-forward; note D-72, three of its prescribed registry fields do not exist.

### The registry and publish pipeline
- `docs/_registry/RE-index.md` — the five-column table; the header note on `Status` semantics that
  D-11 addresses; `## Review Notes` and the `RE-212` precedent.
- `scripts/pipeline/build-filename-map.mjs` — the slug function, the collision resolver, the
  registry parser, and canary 1 at the four sites D-17 names.
- `scripts/pipeline/build-publish-bundle.mjs` — the Approved filter, the divergence guard, the
  manifest writer that D-28 addresses, the version default that D-23 addresses, and canary 2 at
  the four sites D-17 names.
- `scripts/pipeline/filename-map.md` — the regenerated artifact. Note the path: it is under
  `scripts/pipeline/`, not `docs/_registry/`.
- `scripts/pipeline/convert.ps1` — the exact pandoc version pin D-25 names.
- `scripts/pipeline/README.md` — pipeline contracts.

### Gates that bind this phase
- `scripts/validation/check-phase-144.mjs` — the apex, D-67's terminal gate, 101/0/0 at HEAD.
- `scripts/validation/v1.20-milestone-audit.mjs` — the live corpus walk and the four patterns
  D-65 constrains.
- `scripts/validation/v1.20-audit-allowlist.json` — D-64 bars every edit to this file.
- `scripts/validation/c17-eee-contract.mjs` — the thirteen assertions; assertion 12's
  blockquote measurement rules, which D-44 depends on.
- `scripts/validation/check-nav-hub-links.mjs` — the corpus-wide link and anchor checker, its
  no-baseline header, its hub roster, and the slug model behind D-29.
- `scripts/validation/check-phase-53.mjs` — the live frontmatter gate D-37 corrects the draft on.
- `scripts/validation/check-phase-54.mjs` — the first barred-heading negative and the
  planning-artifact scan D-66 names.
- `scripts/validation/check-phase-55.mjs` and `check-phase-56.mjs` — the other two barred-heading
  negatives behind D-35.
- `scripts/validation/check-phase-59.mjs` — the operations-index and master-hub assertions; the
  frozen row-count equality; the link-per-row checks on every Operations sub-table.
- `scripts/validation/check-phase-65.mjs` — the Apple Business assertions that constrain D-30.
- `scripts/validation/check-phase-132.mjs` — **frozen, byte-unchanged.** The filename-map needle
  D-61 restores comes from here.
- `scripts/validation/check-phase-137.mjs` — the needle-spec template D-61 extends; its
  line-scoped bullet check and its own header comment on why whole-file matching fails.

### Files this phase edits
- `docs/index.md` — C17-enrolled as `RE-219`; lines 21 and 23 for D-44; line 38 for D-43 and D-45;
  the Operations sub-headings; the recipes table; Version History.
- `docs/operations/00-index.md` — not C17-enrolled; the Patch table for D-32; the new section for
  D-29 through D-31; Version History for D-36; frontmatter for D-37.
- `docs/operations/patch-management/06-windows-driver-firmware-updates.md` — D-51.
- `docs/operations/app-lifecycle/00-overview.md` — D-52.
- `docs/admin-setup-apv2/02-etg-device-group.md` — D-53.
- `docs/admin-setup-apv1/01-hardware-hash-upload.md` — D-54; C17-enrolled as `RE-077`.
- `docs/operations/firmware-bios/01-windows-dfci.md` — D-54's link target; read-only here.

### Standards
- `docs/_standards/EEE-SOP-standard.md` — §D-08's classification rules, which D-12 cites.

### Precedent commits
- `f0b7aa90` — the registry atom, the four-file shape D-02 copies, and the provenance-line
  convention D-18 restores.
- `b694254f` — the navigation commit and its WR-01 rationale for landing both surfaces together.
- `c3733928` — the flip commit D-04 explains the absence of.
- `5f48a829` — the needle-spec handoff surface D-63 corrects.
- `f4399195` — Phase 65, the direct structural analog behind D-30, D-39, D-43 and D-49.
- `17d6ad35`, `63bb0665` — leaf validators authored in the close phase, the D-57 precedent.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- The registry atom is a four-file edit with an exact precedent commit to copy.
- `build-filename-map.mjs` is the only writer of the filename map and is proven idempotent and
  append-only for this change set.
- `check-phase-137.mjs` is a complete, working template for the needle-spec — including the
  line-scoped bullet check and the header comment explaining why a whole-file substring test
  false-matches.
- Phase 65's commit is a working template for adding an Operations sub-heading to both hub files.

### Established Patterns
- Content phases never author `check-phase-NN.mjs`; the close phase does.
- Registry rows append at the tail; the map sorts numerically, so new rows land last.
- Canary bumps append a provenance line rather than editing the previous one.
- Navigation lands last, after the registry knows the documents exist.
- Registry Titles equal their file's H1 exactly — a 225/225 invariant.
- Both hub files' section orders mirror each other one-to-one.

### Integration Points
- The registry is the publish gate: the Approved filter is what puts a document in the bundle.
- The operations index is read by six validators; the master hub by ten plus the link checker
  plus seventeen milestone audits.
- The apex is the only gate that runs the milestone audit, and therefore the only one that runs
  the live corpus walk behind D-65.

</code_context>

<specifics>
## Specific Ideas

- The owner asked for a full grill pass and an adversarial evaluation of every question before any
  decision was locked. That produced 84 raw findings, 57 confirmed after adversarial challenge and
  referee calibration, and 13 decisions the first draft never asked about. Nine of the adversary's
  own disproofs were overturned — including the corpus-walk finding, which it dismissed with a
  case-sensitive grep against a case-insensitive pattern.
- Nine decisions below reverse this session's first draft outright. Three of them — the version
  flag, the blockquote line and the canary site count — would each have shipped a real defect.

</specifics>

<deferred>
## Deferred Ideas

- **The stale hub descriptions.** Both index descriptions of the patch-management overview still
  read "4-platform" for a domain that has been five-platform since Phase 147, and the lead-in
  sentences above both tables omit Linux. Four sites, two distinct literals, and two adjacent rows
  that are genuinely still four-platform and must not be swept. **[OWNER-RULED 2026-08-26]** out of
  this phase, per the standing requirement text. Trigger: a corpus-hygiene milestone.
- **Guide-level back-links from the operations guides and recipes 01–04 to Recipe #5** — Phase 151
  D-67; recipes 03 and 04 carry line-count pins.
- **The Operations quick-nav bullet's stale enumeration.** It lists four domains while the section
  carries five sub-headings, and will carry six after this phase. Missing Apple Business since
  2026-05-22 by ratified precedent, so D-43 leaves it alone rather than half-fixing it. Trigger:
  the same corpus-hygiene milestone.
- **Registering the twenty legacy operations documents.** Out of scope per INT-02 and SC#3.
  D-73 records the measured reachability consequence. Trigger: a corpus-hygiene milestone.
- **A `docs/reference/00-index.md` row for the firmware OEM matrix** — D-74 records the
  disposition as declined; four of seven matrices have no row.
- **Re-stamping the operations index and the apv1 hardware-hash guide.** Both past due. Part of the
  corpus-wide past-due population, which no validator tests against the current date.
- **The third WinGet site** in `03-device-preparation-policy.md`, per Phase 148's D-64.

</deferred>

---

*Phase: 152-integration-registry-navigation-last-close*
*Context gathered: 2026-08-26*
