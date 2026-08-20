# Phase 146: Windows Driver & Firmware Update Depth - Context

**Gathered:** 2026-08-19
**Status:** Ready for planning

<domain>
## Phase Boundary

`docs/operations/patch-management/06-windows-driver-firmware-updates.md` is authored as a real guide
(DRV-01..DRV-06) — approval modes, the approval workflow, the deferral/deadline asymmetry, OEM catalog
behaviour, reporting, the ConfigMgr co-existence procedure, and three documented absences — and the
driver/firmware section it is promoted out of is reduced to a stub in `01-windows-wufb-rings.md`
(DRV-07) that still holds every literal the chain pins. `00-overview.md` is touched for the second of
four times, for routing only.

**Not this phase:** the Linux guide (147), the Autopatch and app-update guides (148), the firmware/BIOS
domain (149–150), recipe #5 (151), **any registry row, filename-map row, canary bump, ops-index row or
nav-hub wiring** (152, one atomic commit), the harness close (153).

</domain>

<decisions>
## Implementation Decisions

All decisions below were produced by `/grill-me` (28 sub-questions expanded from the 4 selected gray
areas) then adjudicated by `/adversarial-review` (5 parallel Finders → Adversary → Referee; 64 raw
findings, 57 confirmed real — 6 CRITICAL / 34 MEDIUM / 17 LOW — 7 disproved). Verdicts against the
draft picks: **4 UPHOLD, 20 AMEND, 3 REVERSE**, plus 16 areas the original 28 never covered.

Every `[MEASURED]` figure here was executed at HEAD `b37e63e2` and independently re-run by at least two
agents. Figures a later pass corrected are marked `[CORRECTED]`. The Referee **overruled the Adversary
once** — see D-14.

### The founding premise the draft got wrong

- **D-01:** `[REVERSED — this was Q3.8's premise and it was false]` **`06` is NOT unvalidated.** Three
  independent Finders proved it. `v1.20-milestone-audit.mjs:585` runs C11 as
  `for (const abs of walkMd('docs'))` against a **live** walker (`:60-79`, `readdirSync`/`readFileSync`
  off `process.cwd()`). `[MEASURED]` v1.5–v1.19's identically-named `walkMd`/`readFile` resolve against
  a **frozen Map** (`FROZEN.paths.filter(...)`) and cannot see a new file — **v1.20 is the only live
  one**, and it is an apex chain member (`check-phase-144.mjs` → `V-144-AUDIT-HARNESS`). Function
  bodies were read, not call sites. — **Reversibility:** n/a, this is a fact about the harness.
- **D-02:** C11 is **four** patterns, not one: `\bSystem Center\b`, `\bSCCM\b[^.]*\bIntune\b`,
  `\bAutopatch rings\b`, `\bSafetyNet\b[^.]*\bcompliance\b`, all `gi`, scoped to all `docs/**/*.md`.
  `[MEASURED]` `v1.20-audit-allowlist.json` has **no** `c11_ops_patterns` key so the hardcoded fallback
  is in force, and `c11_ops_exemptions` is `[]`. Escape is a ±200-char window keyword:
  `successor|deprecated|historical|disambiguation|mutual-exclusion|mutually\s+exclusive|co-management|migration|transition|replacement|PITFALL-9|first-occurrence|callout|...`
- **D-03:** **DRV-06's own content trips C11.** `[MEASURED]` reproduced by two agents with probe files
  in `docs/operations/patch-management/` — *"When SCCM still controls the Windows Update workload, the
  Intune driver and firmware policy will not apply."* → C11 FAIL; *"System Center Configuration Manager
  co-existence requires..."* → C11 FAIL. Audit went **16/0 → 15/1**.
- **D-04:** **The H2 must not be `## ConfigMgr Co-existence` as drafted.** `co-existence` is **not** in
  the window-keyword list; `co-management` is. Either name the H2 so an allowlisted keyword rides
  within ±200 chars of every C11 hit in the section, or place the keyword in the adjacent prose.
  Re-verify by running the audit, never by reading the list.
- **D-05:** `V-54-27` (`check-phase-54.mjs:437-486`) is a corpus-wide NEGATIVE walking **`docs/` AND
  `.planning/`** for a line-start `> **Platform:**`. It binds `06` **and every planning artifact this
  phase writes**. Use the full lexicon `> **Platform applicability:**`. The draft's repeated framing of
  `06` as "outside `PATCH_FILES`, therefore unreachable" is true of `V-54-07`/`V-54-11`/`V-54-26` and
  **false as a general claim**.

### The `01:186-191` freeze — the phase's single highest-value finding

- **D-06:** `[REFEREE OVERRULED THE ADVERSARY]` **`01-windows-wufb-rings.md:186-191` is frozen.**
  `[MEASURED]` the file carries **two live C11 `\bSCCM\b[^.]*\bIntune\b` hits, at `:186` and `:191`,
  both inside the block SC#5 mandates retaining**. `:186` is kept by the prose word `co-management` at
  +5 chars. `:191` is kept **only** by the link path `../co-management/02-windows-workload-sliders.md`
  at `:188` sitting inside its ±200-char window. Re-wrapping `:186-189` at width 100 →
  `v1.20-milestone-audit` **15/1** while `check-phase-54` stays **32/0/0**. Deleting the
  `[Workload Slider Migration](...)` link — a plausible edit when re-routing readers to `06` — reddens
  C11 identically. — **Reversibility:** one-way within the phase — a reflow that reddens the apex is
  only findable by running the audit, and `check-phase-54` will not see it.
- **D-07:** Therefore: **every retained line in `:168-214` lands byte-identical. No re-wrap, no
  re-flow, no whitespace normalisation, no substituting `ConfigMgr` for `SCCM co-management`, no
  removing the Workload Slider Migration link.** The Adversary tested seven wrap widths against
  `check-phase-54` and got green every time — that disproof was sound on the validator it tested and
  invalid on the one it did not.
- **D-08:** **`node scripts/validation/v1.20-milestone-audit.mjs` joins the per-commit gate** alongside
  `check-phase-54.mjs`, on every commit touching `01` or `06`. `check-phase-54` alone is measurably
  blind to this failure mode. Baseline **16/0**.

### Stub anatomy (DRV-07)

- **D-09:** `[CORRECTED]` the measured anatomy of `01`, superseding both the draft and
  `ARCHITECTURE.md:166` (which pins `:151-152` and calls the file "already 214 lines" — **17 lines
  stale**, the delta being Phase 145's FIX-07 Hotpatch expansion). File is **231 lines**. Anchor `:168`,
  H2 `:169`, section ends `:214`, `## Related Resources` at `:215` = **47 lines**.

  | Block | Measured | Disposition |
  |---|---|---|
  | anchor + H2 | `:168-169` | RETAIN byte-identical |
  | movable substance | `:171-178` (**8 lines**, not 9 — `:179` is blank) | MOVE to `06` |
  | "This is NOT a ring" disambiguation | **`:180-184`** (not `:181-185`) | RETAIN byte-identical |
  | dual-scan section | `:186-213` (`:214` blank) | RETAIN byte-identical — see D-06 |

  Retained = **38 lines**, not the draft's "~34" (`34 + 9 = 43 ≠ 47` did not close).
- **D-10:** `[CORRECTED]` `:180` is the line carrying `**This is NOT a ring** — neither a WUfB
  deployment ring nor an Autopatch ring. Treating`. That literal is what SC#5 and DRV-07 name as a
  keep-set member and **it exists only on `:180`** — the draft's `:181-185` would have dropped it.
  `[MEASURED]` the consequence is a **requirement** failure, not a validator one: deleting `:171-180`
  leaves `check-phase-54` at **32/0/0** (`:180`'s ring token leaves with the line, and `:181` opens
  with a self-qualified "a WUfB deployment ring"). The Finder's claimed `V-54-11` red was disproved.
- **D-11:** **The H2 string stays byte-identical: `## Driver and Firmware Update Policy`.** DRV-07's
  "shortened" governs the **section**, not the heading. Authority — and this is what the draft failed
  to cite: `ROADMAP.md:102` (SC#5, what a verifier actually checks) **omits the word "shortened"
  entirely**, and `ARCHITECTURE.md:166` (the provenance of DRV-07's wording) reads *"a shortened stub
  H2 ... that **retains** the anchor, the 'this is NOT a ring' disambiguation, and the whole dual-scan
  section"* — a heading string cannot *retain* a section. `[DISPROVED — do not reuse]` the draft's two
  stated reasons: shortening carries **zero** regex risk (`V-54-13` is a disjunction and
  `## Driver and Firmware Updates`, `## Driver and Firmware`, `## Driver/Firmware Policy` all PASS),
  and D-42's anchor-slug rationale does not transfer (the driver H2 does not own its anchor — the
  own-line `<a id="driver-firmware-policy"></a>` is at `:168`, with `[MEASURED]` **1** occurrence in
  `docs/`, the definition itself).
- **D-12:** **The DRV-07 reading goes into a PLAN task acceptance criterion, not only this log.**
  DRV-07's checkbox is flipped against requirement **text** at close; a decision record is not a gate.
- **D-13:** The Intune blade path (`:174-176`) moves to `06`. The stub keeps *what this is and what it
  is not*; `06` keeps *how to configure it*.
- **D-14:** `[CORRECTED]` `:172-173` — *"A driver/firmware policy is not part of any WUfB deployment
  ring or any Autopatch ring; it is a discrete update policy surface"* — **is also a "this is NOT a
  ring" disambiguation**, and it sits inside the movable block. DRV-07 pins the disambiguation without
  line coordinates. Ruling: the `:180-184` block satisfies the pin; `:172-173` moves with the rest and
  is re-expressed in `06`. Recorded because the narrowing was undefended in the draft.
- **D-15:** The stub forward-links to `06` twice: one callout under the H2, one `## Related Resources`
  bullet. Both are in-domain sibling links, not nav-hub wiring — `[MEASURED]` `check-nav-hub-links.mjs`
  has a 4-file hub roster and **no general orphan detection**, so navigation-last (152) is not
  violated. **The callout must not be inserted between `:186` and `:191`** (D-06).

### `V-54-11` and the link-target trap

- **D-16:** `[AMENDED]` the rule is **not** "no `ring` token in any *sentence* added to `01`". It is
  **no `ring`/`rings` token in any added byte, including link targets and `**Source:**` URLs.**
  `[MEASURED]` reproduced three times independently: appending a
  `.../waas-deployment-rings-windows-updates` or `...#deployment-rings` target takes `check-phase-54`
  **32/0 → 31/1**; backticking the URL restores **32/0**. This is locked decision **145 D-03** and the
  draft's rule as worded did not bind it. **146 is the only phase in v1.21 that edits this file — if
  D-03 does not ride along, it dies here.**
- **D-17:** `[DISPROVED — do not act on it]` the draft's claim that *"Using Update Ring policies in
  Intune for Quality or Feature Updates requires you to move the Windows Update workload to Intune"*
  would need qualifying in `01`. `[MEASURED]` inserted verbatim → **32 passed, 0 failed**.
  `check-phase-54.mjs:197` tests `before.trim()` against
  `/(WUfB deployment|Autopatch|Update|deployment)\s*$/i`, and `...Using Update` matches the bare
  `Update` alternative. Ship it verbatim in `06`; the hazard model was wrong.
- **D-18:** `[DISPROVED]` the reflow hazard **on `check-phase-54`**: `:197` trims the newline before
  `:199`'s newline-hostile `[^\n]{0,30}$` can matter. Seven wrap widths → 32/0/0 every time, and
  `:186-214` contains **zero** `\bring` tokens (the only "ring" substring is inside `during`). The
  byte-identical rule survives on C11 grounds alone (D-06), not on `V-54-11` grounds.
- **D-19:** `[CORRECTED]` the C11 keeper mechanism in `01`: the surviving `\bAutopatch rings\b` hit is
  the **H2 at `:65`** (Phase 145 added 3 lines above D-54's `:62`), and its keeper `Disambiguation` is
  **intra-line, at hit-offset +16** — *in* its own line, not *on* its own line. Because the keeper is
  intra-line, **no insertion anywhere in the file can evict it**, which is the actual reason D-54's
  36-character cliff is dead. Do not reword the `(Disambiguation)` parenthetical.

### The stale C11 map — **[OWNER-RULED 2026-08-19]**

- **D-20:** **`REQUIREMENTS.md:128`'s C11 row is corrected in this phase**, and the correction is also
  added to the milestone-close cleanup list beside Phase 145's deferred `V-54-18` row clarification.
  `[CORRECTED]` the row is at **`:128`, not `:135`** (`:135` is `## Future Requirements`). It still
  asserts *"`00-overview.md:78` is kept green **solely** by the `mutually`/`exclusive` pair ...
  `01-windows-wufb-rings.md:77` is the safe one, independently green via its own `PITFALL-9` literal."*
  `[MEASURED]` **both coordinates are phantoms** — there is exactly **one** case-insensitive
  `\bAutopatch rings\b` hit corpus-wide, `01:65`; `00-overview.md` has **zero**. This is the document
  the planner is contractually bound to, and Phase 145's CONTEXT-only correction did not reach it.
- **D-21:** The corrected row must also record the **`:186`/`:191` `\bSCCM\b[^.]*\bIntune\b` keeper
  map** (D-06) — the four-pattern reality, not just the plural-Autopatch one.
- **D-22:** `REQUIREMENTS.md` is itself inside `V-54-27`'s walk. Editing it is safe (no
  `> **Platform:**` involved) but the edit runs the same gate as everything else.

### Dual-scan, ConfigMgr and the closed enumeration

- **D-23:** DRV-06's four-step procedure lands in **`06`**, under its own H2 (named per D-04).
  `[UPHELD]` SC#4 names no file and SC#5 is a pure non-deletion obligation, so both are satisfiable
  simultaneously. **The draft's rationale is replaced**: it quoted only C1-6's parenthetical and never
  rebutted the sentence that actually conflicts (*"Add the four-step procedure as a named co-existence
  path..."*). Correct reason: *"SC#4 assigns the procedure to the new-guide criteria; C1-6's 'amend in
  place' governs the existing prose only."*
- **D-24:** **[OWNER-RULED 2026-08-19]** `01:200`'s closed enumeration is repaired: change
  `**Mitigation options (pick one):**` → `**Mitigation options:**` and **add a fourth item** as a
  one-line pointer to `06`'s ConfigMgr co-existence section. Without this the phase manufactures a
  corpus self-contradiction — `01` asserting "pick one" of a three-item list that first-party
  documentation says is incomplete, while `06` documents the fourth answer. **Both edits land inside
  the D-06 frozen zone**, so they are append/substitute-in-place only, and the commit gates on the
  v1.20 audit. — **Reversibility:** reversible.
- **D-25:** Mitigation option 3 (`DisableDualScan = 1`) is re-labelled **deprecated in place**, with
  **a `**Source:**` line** citing the Windows Autopatch FAQ (`ms.date 2026-05-28`). `[CORRECTED]` the
  draft authored a corrected first-party claim into `01` with **no evidence line**, violating 145 D-01
  while applying D-01 to `06`. Any `ring`-bearing slug in that URL is backticked (D-16).
- **D-26:** `[CORRECTED]` **DRV-06 and PITFALLS C1-6 attach the withdrawn phrase to different
  mitigations.** DRV-06's *"the legacy mitigation"* reads as option 3 (C1-6 itself calls option 3 "the
  legacy lever"); C1-6 attaches *"the only Autopatch-compatible answer"* to **mitigation 1**. **Ruling:
  C1-6 governs.** The claim is `[MEASURED]` absent from `docs/` (0 hits) and is discharged by not
  authoring it — **do not** write a "the corpus previously asserted X" attribution for a phantom.
- **D-27:** `[DISPROVED — do not act on it]` a Finder claimed `01:203` (*"This is the strategic fix and
  aligns with Autopatch readiness"*) is the semantic carrier of the withdrawn claim. It is not: it
  asserts **preference**, which C1-6 explicitly **confirms**; it asserts no **exclusivity**, the only
  half C1-6 withdraws. Decisively, C1-6's fourth answer leaves the workload on ConfigMgr — precisely
  *not* Autopatch-ready — so `:203`'s claim survives the correction untouched. Recorded so a later
  agent does not re-derive the false coupling.
- **D-28:** The four-step procedure is **elided in-repo** and must be re-read from source before
  quoting. `[MEASURED]` step 2 ends `...get them ready for management...`; step 3 ends
  `...using the [Specify source for specific classes of Windows Updates policy]...` **and that link
  target is recorded nowhere in the repo**; steps 5–6 are paraphrased, not quoted. Reconstructing
  elided text from memory is fabrication.
- **D-29:** The Windows 10 / Windows 11 scoping note ships **verbatim** as a `*Note:*` block adjacent
  to the procedure with its own `**Source:**` line — C1-6 already renders it quoted, so verbatim is
  available. The procedure is Windows-11-only; Windows 10 gets "move the workload, or Pilot with a
  collection".
- **D-30:** Optional steps 5 and 6 ship as one sentence using **the source's own wording**
  (*"prerequisites for Windows Update reports"*). `[CORRECTED]` the draft's "get empty reporting" is an
  inference beyond the source, and step 4 already says "Enable data collection in Intune", so
  additive-vs-duplicative is unknown until the re-fetch.
- **D-31:** The *"undefined and unpredictable device state"* warning is a **verbatim blockquote
  attached to step 3** with a `**Source:**` line. `[UPHELD]` — C1-6 calls it "the warning that makes
  this a Class-1 pitfall rather than a recipe".

### `06`'s shape

- **D-32:** Filename `06-windows-driver-firmware-updates.md`. **Do not renumber**, despite `05-`
  not existing until Phase 147. `[MEASURED]` no validator enumerates the directory (the five paths are
  hardcoded constants at `check-phase-54.mjs:23-27`, `PATCH_FILES` at `:35`). This ruling is what
  discharges `ROADMAP.md:127`'s Phase-148 dependency on a stable filename.
- **D-33:** **No `doc_id`, no C17 enrollment.** `[MEASURED]` `c17-eee-contract.mjs:5, :526-537` gates
  enrollment on a `doc_id` frontmatter key and `grep -rl "^doc_id:" docs/operations/` returns **0**.
  Independently supported by `EEE-SOP-standard.md:325-330` — `docs/operations/` is outside Phase-1 and
  *"enrolled by directory, never cherry-picked by filename"*. C17 baseline **234 files / 0 violations**
  and this phase does not move it.
- **D-34:** Frontmatter matches the five sibling fields exactly — `last_verified`, `review_by`,
  `applies_to: all` (uniform across all five siblings), `audience`, `platform: Windows` — with
  `review_by = last_verified + 60` by arithmetic (145 D-06). "Match the sibling shape" means **those
  five fields only**; it is not licence to add `doc_id` (D-33) nor to copy `01`'s blockquote content
  (D-35).
- **D-35:** The Platform-applicability blockquote uses the **full** lexicon
  `> **Platform applicability:**` (D-05). It must **not** be "same shape as `01`" in content — `01`'s
  blockquote is a list of sibling links, and `06` may not link forward (D-36).
- **D-36:** **`06` links only to `00-`, `01-`, `02-`, `03-`, `04-` and existing `docs/` targets.**
  Links to `05-` (147), `07-`/`08-` (148) and the firmware/BIOS guides (149/150) are those phases' to
  add. `[MEASURED]` reproduced — a probe linking `05-linux-update-delivery.md` gives *"target file not
  found"*, **2 corpus-link failures**, and `check-nav-hub-links.mjs:6-8` states verbatim it runs *"with
  NO accepted-violation baseline, allowlist, ratchet file or expected-failure list of any kind"*.
  Baseline **0/0**.
- **D-37:** `[AMENDED]` the H2 skeleton:
  ```
  ## What This Policy Does                  DRV-01
  ## Approval Modes                         DRV-01
  ## The Approval Workflow                  DRV-01, DRV-03 (incl. B-5 "pause is best effort")
  ## Deferral and Deadline Behavior         DRV-02 + AF-6 ranges   [American spelling]
  ## OEM Catalog and Firmware Delivery      DRV-01, X-7
  ## Reporting                              DRV-01                 [no B-row exists — D-47]
  ## <ConfigMgr co-existence, named per D-04>  DRV-06
  ## Unsupported and Anti-Feature Callouts  DRV-03, DRV-04, DRV-05, B-8, B-10, AF-9
  ## Related Resources
  ## External References
  ```
- **D-38:** `[CORRECTED]` `## Limitations and Absences` was **invented**. `[MEASURED]`
  `grep -rn "^## .*Limitation\|^## .*Absence" docs/` = **0**, while
  `## Unsupported and Anti-Feature Callouts` exists in all four recipes **and**
  `docs/_templates/recipe-template.md:98`, and AF-9's own instruction names *"the driver guide's
  **Unsupported callout**"*. Use the corpus convention.
- **D-39:** `[CORRECTED]` **American spelling.** `[MEASURED]` `behaviour` = 4 occurrences in one file
  against 216 `behavior`, and **zero** British-spelled headings exist. The H2 becomes a GitHub slug
  that inbound links must match byte-for-byte, and `check-nav-hub-links.mjs` hard-fails an anchor miss.
- **D-40:** `[DELETE THE CLAIM]` "one-to-one onto DRV-01..06, so verifier traceability is mechanical"
  is **false on the draft's own table** — DRV-01 maps to five sections, DRV-03 and DRV-05 to two each,
  and B-3 is itself split. Telling the verifier to expect a bijection it will not find is worse than
  saying nothing.
- **D-41:** Absences are presented as **bold sub-labels inside one section — no new `PITFALL-N`
  identifiers.** `[CORRECTED]` the draft's rationale was wrong: `PITFALL-5`, `-8` and `-13` have zero
  prose occurrences **because they are live NEGATIVE regression guards** (`check-phase-49.mjs:288`,
  `check-phase-53.mjs:156`, `check-phase-51.mjs:292`) — zero occurrences *is* the assertion, not
  evidence of retirement. `PITFALL-13` exists, so the ceiling is not 10 and minting `PITFALL-11` lands
  inside an in-use range. Correct reason: **the identifier namespace is per-milestone research-ledger,
  and three apparently-free numbers are pinned by NEGATIVE guards.** Precedent for the bold-sub-label
  form is one line away at `01:186` (`**Dual-scan source conflict pitfall:**`).
- **D-42:** DRV-04 (no driver policies during Autopilot, **and** unapproved critical drivers still
  install) is the **first** item in the callouts section **and** gets a one-line warning near the top of
  the guide. Both halves always together. `[UPHELD]` — highest-value Class-1 pitfall on an Autopilot
  corpus.
- **D-43:** `[REVERSED]` the ring-discipline rule for `06`. The draft's grounds (*"editorial, not
  defensive"*) are false — `06` is defended by C11 (D-01), `V-54-27` (D-05) and the link checker
  (D-36). And the rule itself would ship a falsehood: DRV-03's **required verbatim**
  (`PITFALLS.md:345`) reads *"use **deployment rings** to limit driver installation..."* and F-5's
  reads *"may vary between **rings**"* — both bare. **Corrected rule:** (a) verbatim quotes are
  **never re-qualified** — they ship exactly as sourced, inside blockquotes; (b) in the guide's own
  prose, qualify every `ring` as `WUfB deployment ring` or `Autopatch ring`, singular preferred;
  (c) **do not coin `driver deployment ring`** — `[MEASURED]` it appears in **no** first-party quote
  (one hit repo-wide: `FEATURES.md:80`, a researcher's row title); (d) the one hard constraint is
  C11's plural `\bAutopatch rings\b`, corpus-wide, and it applies to `06`.
- **D-44:** **[OWNER-RULED 2026-08-19]** **FIX-04's naming rule is carried into `06`.** Phase 145's
  D-39 scoped the `Windows Update client policies` rename to the five existing files; `06` is a sixth
  file in that domain with no rule attached, and it is the largest new body of Windows update prose in
  the milestone. `[CORRECTED]` the "70:1" framing is misleading — of 78 `WUfB` matches in the domain,
  **52 are the deliberately-retained `WUfB deployment` compound** and 12 are `WUfB Rings` labels; bare
  product-name uses number roughly a dozen. Retain the compound (D-39's ruling), use the current
  product name in prose.
- **D-45:** **[OWNER-RULED 2026-08-19]** **AF-9's Unsupported callout is in scope.** `FEATURES.md:170`
  names both content and location: manual driver packaging / `.inf` sideloading / driver injection into
  images is out of band, and driver policies only surface *"driver updates that are currently published
  to Windows Update"*. Absent from the draft entirely.
- **D-46:** B-5's *"If it can't halt the installation, the update completes its installation"* —
  pause is **best effort** — lands in `## The Approval Workflow`. It has no home in the draft skeleton
  and it is what makes DRV-03's rollback-absence story honest.

### Sourcing

- **D-47:** `[REVERSED]` the search-summary identification. `ROADMAP.md:105` says two **rows**;
  `FEATURES.md:11` names them **B-5, AF-6 and X-3**, and X-3 is resolved at `:426`. The two live rows
  are **B-5 and AF-6 — both Phase 146 content, both on `configure-driver-update-policy`**. **AF-6 never
  appeared in the draft at all**, yet its `driver deferral 0–30d` range is already shipped at
  `00-overview.md:87` and is exactly what `## Deferral and Deadline Behavior` restates. AF-6 also
  carries the standing **"generic, not tenant-specific"** constraint — carry it into the guide.
- **D-48:** `[REVERSED]` `update-enterprise-supersedence` is **not** Phase 148's. `[MEASURED]`
  `grep -in "supersed" .planning/REQUIREMENTS.md .planning/ROADMAP.md` → **zero hits**; Phase 148's
  research flag names three re-fetches, none of them supersedence. It is out of scope for 146 with
  **no forward assignment** — record it as an unowned research-ledger item.
- **D-49:** Two sourcing obligations the draft had no coverage for: **re-open `driver-updates-faq`**
  because the four-step procedure is elided in-repo (D-28); and record the **Windows Autopatch FAQ**
  (`ms.date 2026-05-28`) and the **`wufb-wsus` scan-source page** as DRV-06's real sources — neither
  appears in the FEATURES Sources table the draft treated as authoritative.
- **D-50:** **[OWNER-RULED 2026-08-19]** `[REVERSED]` **if the re-fetch fails, the phase blocks and
  escalates to the owner. It does not ship.** `[CORRECTED]` both drafted fallbacks were unsafe. Branch
  1 rested on a guess — `grep -rn "never be Declined" .planning/` returns **exactly one hit**, the B-5
  search-summary cell itself, and `PITFALLS.md` quotes `driver-updates-faq` at length in C1-6 and C1-7
  without ever mentioning Declined. Branch 2 was worse: DRV-03 **and** SC#3 both mandate the
  constraint's **presence**, so "ships as a stated absence" **fails the phase**. Permitted alternative:
  a different first-party page that carries the claim, attributed to that page. Never an unsourced
  assertion. — **Reversibility:** one-way — a fabricated or absent DRV-03 constraint is a close-gate
  failure discovered late.
- **D-51:** Re-fetch discipline is 145 D-27's: record the query trail, fetch the page, record
  `ms.date`, quote verbatim, and **the orchestrator re-confirms rather than accepting the researcher's
  word**. That discipline is what made Phase 145's Android result trustworthy.
- **D-52:** `[MEASURED]` two claims have **no named source**: **B-10** (Extension / Plug-and-Play
  drivers, required verbatim by DRV-05) appears in **no** `Used for` cell of the Sources table; and
  **DRV-01's `reporting`** maps to **no B-row at all**. Both go on the re-fetch list. B-1's provenance
  is `windows-autopatch-manage-driver-and-firmware-updates` (`ms.date 2025-03-31`) per `FEATURES.md:422`
  — no re-fetch needed.
- **D-53:** **Verbatim contract for the verifier (DRV-02 / SC#2):** every first-party quote ships as a
  `>` blockquote with a `**Source:**` line carrying the URL and the `ms.date` observed at fetch time;
  the verifier re-fetches the named pages and diffs the quoted strings. This is the Phase-145 precedent
  (7 live URLs, zero fabrications). Write it into the PLAN.
- **D-54:** `[MEASURED]` `01` carries **zero** `**Source:**` lines between `:168` and `:214` (they sit
  at `:38`, `:74`, `:99`, `:165`, `:166`). **The move is thin in lines but not in sourcing work** —
  every claim landing in `06` needs an evidence line authored from scratch under 145 D-01. Say so on
  the record; "9 movable lines" understates the task.

### `00-overview.md` (touch 2 of 4)

- **D-55:** **[OWNER-RULED 2026-08-19]** **Three edit sites, not two.** `:154` routes readers wanting
  *"driver and firmware approval workflows"* to what will be a stub, and `:211-213` describes `01` as
  carrying *"the driver/firmware update policy surface"* — **both become false after the move**, and
  the draft's "do not touch what is green" would have preserved both.
  1. Append the cross-link sentence to the Ring-Terminology driver bullet at **`:88`** — `[CORRECTED]`
     the bullet is **`:84-88`**, not `:85-90`; `:89` is blank and **`:90` is a `**Source:**` line**
     (`:92`, `:94` are two more). Appending at `:90` orphans a Phase-145 citation and breaks D-51's
     shape.
  2. Add a new routing bullet after `:154` **and** amend `:153-154` so it no longer routes
     driver/firmware readers to the stub.
  3. Amend `:211-213`'s Related-Resources description.
- **D-56:** The leading Platform-applicability blockquote (`:9-19`) needs **no** change — its Windows
  line names only *"ring topology and Autopatch disambiguation"*, both in the retained set.
- **D-57:** **No new row in the 4-platform comparison table** (`:49-55`). It is concept-keyed across
  four platforms and a driver/firmware row would be Windows-only; Phase 147's blast radius permits
  appending a **column** only, so a new row would silently become 147's problem and `V-54-08` tolerates
  either. The new routing bullet carries the reader instead.
- **D-58:** `[CORRECTED]` `V-54-09`'s window analysis. `[MEASURED]` `## Ring Terminology` H2 at byte
  4667 (`:64`); the 1500-byte window ends at byte 6167 ≈ `:83`; `WUfB deployment ring` at 4757 (`:66`)
  and `Autopatch ring` at 4786 (`:67`); the driver bullet begins at byte **6233 — 66 bytes past the
  window boundary**. Correct reason: **the edit site is outside the window entirely, so appending
  cannot evict either token.** The draft's line numbers and its eviction mechanism were both wrong;
  the conclusion was right by accident. Re-measure at plan time.

### Stamping, commits and gates

- **D-59:** `[CORRECTED]` the re-stamp instruction is **conditional and probably a no-op**.
  `[MEASURED]` all five files read `last_verified: 2026-08-19 / review_by: 2026-10-18` — **exactly 60
  days, the ceiling of a `> 60` test, with zero slack**. Rule: *if the execution date differs from
  2026-08-19, re-stamp `last_verified` to the actual execution date **and recompute
  `review_by = last_verified + 60` by arithmetic in the same commit**. If it does not differ, the
  instruction is a deliberate no-op — say so, do not manufacture a diff.*
- **D-60:** `[MEASURED]` **the freshness gate protects nothing in the direction that matters.**
  `check-phase-54.mjs:113-117` is `if (days > 60)` only — advancing `last_verified` without moving
  `review_by` drives `days` **negative** and **PASSES**. Corroborated by FEATURES E-6: no validator
  compares `review_by` to today. Never advance one stamp without the other.
- **D-61:** **Three commits, this order, these gates:**
  1. Create `06-...md` — gate on `v1.20-milestone-audit.mjs` (**16/0**) **and**
     `check-nav-hub-links.mjs` (**0/0**). No forward links (D-36).
  2. `01` stub surgery + enumeration repair + conditional re-stamp — gate on `check-phase-54.mjs`
     (**32/0/0**) **and** `v1.20-milestone-audit.mjs` (**16/0**). Retained lines byte-identical (D-07).
  3. `00-overview.md` three edits + conditional re-stamp — gate on all three.
- **D-62:** `[CORRECTED]` **commit 1 is the riskiest, not the safest.** The draft called it *"nothing
  can break"*; it is precisely the commit that puts new prose under C11's live `walkMd('docs')` and
  `06`'s outbound links into a corpus-wide checker with no allowlist.
- **D-63:** Carry these HEAD baselines in the PLAN so a regression is visible, and **run the apex once
  before commit 1 and once after commit 3**: apex `check-phase-144` **101/0/0** (~18–22s),
  `v1.20-milestone-audit` **16/0**, `c17-eee-contract` **234/0**, `check-nav-hub-links` **0/0**,
  `check-phase-54` **32/0/0**, `build-publish-bundle --self-test` **15/0**,
  `build-filename-map --self-test` **8/0**.
- **D-64:** **Phase 146 lands NO registry row, NO filename-map row and NO canary bump.** INT-02 reads
  as an obligation (*"new `docs/operations/**` documents receive registry rows and filename-map
  rows"*); INT-01 assigns it to Phase 152 as one atomic unit. `[MEASURED]` verified safe: both canaries
  **parse `docs/_registry/RE-index.md`** (`build-filename-map.mjs:277-286`;
  `build-publish-bundle.mjs:517-524`) rather than walking the filesystem, so an unregistered `06`
  moves neither. A planner obeying INT-02 literally would take both self-tests to 225-vs-226 **RED**.
- **D-65:** **No `## Version History` in `06`.** `[MEASURED]` 249 of 282 `docs/**/*.md` carry it, but
  only 2 of 20 under `docs/operations/` and **none** of the five patch files. Domain convention wins
  and the file is unenrolled. INT-04's Version-History **row** in `docs/operations/00-index.md` is
  separately Phase 152's. `146` stays off the ops index entirely — `V-59-14` is a frozen read since
  Phase 145's FIX-12, so growth is safe but is 152's to land.

### Contracts handed forward

- **D-66:** `06` carries **one own-line `<a id="..."></a>` anchor per H2 that anything links to**, and
  those anchor ids are **the stable contract Phase 148 may cross-link**. `[MEASURED]` sibling `<a id=`
  counts: 00=1, 01=4, 02=2, 03=1, 04=4. Heading slugs alone are the fragile option (D-39).
- **D-67:** `06`'s H1 is **`# Windows Driver and Firmware Updates`** — distinct from every existing
  registry Title and from `01`'s `# Windows WUfB Rings + Hotpatch + Driver/Firmware`. The H1 becomes
  the Phase-152 registry `Title`, which `build-filename-map.mjs:4` treats as *"the sole source of truth
  (D-07)"* with an unresolved collision a hard exit 1 (`:145`, `:175`).
- **D-68:** **No diagram or decision tree in `06`.** FEATURES requests none, and a Mermaid fence would
  block any future C17 enrollment (C17 #1).
- **D-69:** `06`'s `## External References` **duplicates freely** against the siblings' existing
  sections. `[MEASURED]` `check-nav-hub-links.mjs:242`'s `resolveLinkTarget` returns **null for
  `http(s)`**, so **no tool verifies those URLs** — the orchestrator confirms each Learn URL manually
  during the D-51 re-fetch pass.
- **D-70:** `06`'s `last_verified` is the actual execution date; if execution spans midnight, all three
  files take the date of **commit 1**.
- **D-71:** Windows-version applicability: state in one sentence that the **policy surface** is not
  Windows-11-only and that **only the ConfigMgr co-existence procedure** carries the Windows-11
  restriction. `applies_to` frontmatter is **not** a gap — all five siblings are uniformly
  `applies_to: all`.

### Claude's Discretion

Prose wording throughout, the exact article titles chosen for `**Source:**` lines, the precise H2 name
satisfying D-04's keyword constraint, the wording of the fourth mitigation item (D-24), and the order of
edits within each commit. **All byte offsets, line numbers and hit maps are to be re-measured at plan
time, never transcribed from this document** — the review found systematic off-by-one/two drift in the
draft (`:181-185`→`:180-184`, `:171-179`→`:171-178`, `:85-90`→`:84-88`, `:200-212`→`:200-210`,
`:213-214`→`:212-213`, `REQUIREMENTS :135`→`:128`, `ARCHITECTURE :146`→`:166`), the same defect class
Phase 145 recorded.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Governing artifacts
- `.planning/REQUIREMENTS.md` — DRV-01..DRV-07 (`:41-47`); the **"Validator Constraints on Requirement
  Text"** table; **`:128`'s C11 row, which D-20 corrects in this phase**; INT-01/INT-02/INT-03 (the
  Phase-152 registry atom, D-64)
- `.planning/ROADMAP.md` — Phase 146 Goal / SC#1-5 (**`:102` is SC#5 and omits "shortened"**, D-11) /
  Blast radius / Research flag; Phase 148's dependency at `:127` (D-32, D-66); Phase 152 SC#1-5
- `.planning/STATE.md` — v1.21 phase dependency summary; the V120 back-anchor obligation
- `.planning/phases/145-corpus-correction-validator-gate-archival-drift-fix/145-CONTEXT.md` —
  **D-01/D-02** (`**Source:**` convention), **D-03** (the `V-54-11` link-target trap, D-16 here),
  **D-06** (60-day arithmetic), **D-21** (the ownership restatement), **D-27** (re-fetch discipline),
  **D-39** (FIX-04 scope, D-44 here), **D-42** (anchor-slug rationale — does **not** transfer, D-11),
  **D-54** (the C11 map this phase supersedes, D-19)

### Validators that gate this phase
- `scripts/validation/check-phase-54.mjs` — `V-54-07` (`:113-117`, the `> 60` one-sided test, D-60),
  `V-54-08` (`:127`), `V-54-09` (`:145-159`, the 1500-byte window, D-58), `V-54-11` (`:173-213`,
  the bare-`ring` NEGATIVE — **strips headings and inline code, NOT link targets**),
  `V-54-13` (`:229-242`, the driver/firmware H2 + `dual-scan` disjunction), `V-54-26` (`:421`),
  **`V-54-27` (`:437-486`, corpus-wide over `docs/` AND `.planning/`, D-05)**, `V-54-29`, `V-54-30`
- **`scripts/validation/v1.20-milestone-audit.mjs`** — **`:585` C11's live `walkMd('docs')`**;
  `:60-79` the live walker; `:574-579` the four hardcoded patterns; the ±200-char `windowKeywords`
  regex. **The only live C11 enforcer, and an apex chain member.** Baseline **16/0**
- `scripts/validation/v1.20-audit-allowlist.json` — no `c11_ops_patterns` key, `c11_ops_exemptions: []`
- `scripts/validation/check-nav-hub-links.mjs` — `:6-8` (no baseline/allowlist/ratchet of any kind),
  `:33-41` (the 4-hub roster, no orphan detection), `:242` (`http(s)` targets unverified, D-69)
- `scripts/validation/check-phase-144.mjs` — the apex, **101/0/0**
- `scripts/validation/c17-eee-contract.mjs` — `:5`, `:526-537` (`doc_id`-gated enrollment, D-33);
  **234/0**
- `scripts/validation/check-phase-59.mjs:449` — `V-59-14` reads `readAtV15Close`, so ops-index growth
  is 152's and is safe
- `scripts/validation/check-phase-53.mjs` — `V-53-10` names `PITFALL-8`; V-53-13..17/23 pin
  `co-management/02` (D-72's out-of-scope ruling)
- `scripts/validation/check-phase-49.mjs:288` (`PITFALL-5`), `check-phase-51.mjs:292` (`PITFALL-13`) —
  the NEGATIVE guards that make the identifier namespace unsafe to mint into (D-41)
- `scripts/build-filename-map.mjs` — `:4` (Title is sole source of truth, D-67), `:145`/`:175`
  (collision = hard exit 1), `:277-286` (canary parses the registry, D-64). `--self-test` **8/0**
- `scripts/build-publish-bundle.mjs` — `:517-524` (Approved-filtered canary, D-64). `--self-test`
  **15/0**

### Research (content sources)
- `.planning/research/FEATURES.md` — rows **B-1..B-11** (the guide's substance), **X-7** (firmware via
  Windows Update vs OEM catalog + the availability lag), **AF-5**, **AF-6** (`:167` — the ranges,
  search-summary-tainted per D-47, plus the "generic, not tenant-specific" constraint), **AF-9**
  (`:170` — the Unsupported callout, D-45), **F-5** (`:137` — bare `rings` verbatim, D-43); `:11` (the
  corrected quotation guarantee and the B-5/AF-6/X-3 row list); `:421-430` (the Sources table and its
  search-summary declaration); `:422` (B-1's provenance, D-52)
- `.planning/research/PITFALLS.md` — **C1-6** (`:296-345`, the ConfigMgr co-existence procedure, its
  elisions, the Windows-10 note and the undefined-state warning); **C1-7** (`:345`, DRV-03's required
  verbatim *"use deployment rings to limit driver installation"*); `:645` (V-54-27 binds planning
  artifacts)
- `.planning/research/ARCHITECTURE.md` — **`:166`** the Pillar B promotion recommendation (**D-11's
  authority**); `:170-171` the anchor measurement. ⚠ **its `01:151-152` coordinates and "already 214
  lines" are 17 lines stale** — D-09 supersedes

### Edit targets
- `docs/operations/patch-management/06-windows-driver-firmware-updates.md` — **NEW**
- `docs/operations/patch-management/01-windows-wufb-rings.md` — §`:168-214` (D-09); **§`:186-191`
  frozen** (D-06); §`:200` enumeration repair (D-24); §`:207-210` option-3 deprecation (D-25)
- `docs/operations/patch-management/00-overview.md` — §`:88`, §`:153-154`, §`:211-213` (D-55)
- `.planning/REQUIREMENTS.md` §`:128` (D-20)

### Citation-convention precedents
- `docs/admin-setup-macos/10-kerberos-sso-extension.md` §`:156` — the canonical
  `**Source:** [title](url) (updated YYYY-MM-DD)` shape
- `docs/operations/patch-management/01-windows-wufb-rings.md` §`:186` —
  `**Dual-scan source conflict pitfall:**`, the bold-sub-label precedent (D-41)
- `docs/_templates/recipe-template.md` §`:98` — `## Unsupported and Anti-Feature Callouts` (D-38)

### Review artifacts (this session)
- `146-DISCUSSION-LOG.md` — the full grill + adversarial-review chain, with per-question verdicts

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **The `**Source:**` citation line** — an existing corpus convention (145 D-01), not one to design.
  `06` will be the most citation-dense file in the directory.
- **`## Unsupported and Anti-Feature Callouts`** — an existing heading in all four recipes and the
  recipe template. Do not invent a seventh spelling (D-38).
- **The five sibling frontmatter fields** — uniform across all five patch-management files, including
  `applies_to: all` even on Windows-only `01`.
- **`01:186`'s `**Dual-scan source conflict pitfall:**`** — the bold-sub-label pattern D-41 adopts.

### Established Patterns
- **A pin is a literal-presence test, not a claim-endorsement test** (145). What makes the stub-and-move
  possible: `V-54-13` requires a driver+firmware H2 and the `dual-scan` literal, and both survive a
  section that has been reduced to a stub.
- **Frozen helpers shadow live names.** The single most consequential finding this session (D-01) turned
  on reading `walkMd`/`readFile` **function bodies** in v1.5/v1.15/v1.18/v1.19/v1.20 rather than
  grepping call sites. A call-site count produced the wrong answer for an earlier milestone and would
  have produced it again here.
- **Keyword-window keepers can live in a link path, not just prose** (D-06). `01:191`'s C11 hit is held
  green by `../co-management/02-windows-workload-sliders.md`. Nothing in the file signals this.

### Integration Points
- `06` is a leaf: nothing links to it until this phase's own `01` and `00-overview.md` edits land, and
  nothing else may link to it until Phases 148/152.
- `06`'s H2 anchor ids are Phase 148's cross-link contract (D-66); its H1 is Phase 152's registry Title
  (D-67).
- `docs/operations/co-management/02-windows-workload-sliders.md` is reached from `01:188` and is
  **read-only for this phase** (D-72).

</code_context>

<specifics>
## Specific Ideas

- The owner's standing preference for maximum thoroughness was exercised in full: all 4 gray areas
  selected, `/grill-me` expanding them to 28 sub-questions, `/adversarial-review` (5 parallel Finders →
  Adversary → Referee) adjudicating every one. **3 draft picks were reversed and 20 amended**, and the
  draft's founding premise — that the new guide was unvalidated — was falsified by three independent
  agents.
- **The Referee overruled the Adversary once, and that overrule is the most valuable output of the
  session.** The Adversary disproved the "no re-wrap" rule by testing seven wrap widths against
  `check-phase-54` — correctly. It never ran the same test against the validator it had itself just
  confirmed was live. The Referee did, and found `01:186-191` is held green by a link path (D-06).
  **A disproof is only as wide as the gate it was run against.**
- The instruction the owner should see repeated to the executor: **re-measure every line number at plan
  time.** Seven distinct coordinate errors were found in the draft, in exactly the pattern Phase 145
  recorded.

</specifics>

<deferred>
## Deferred Ideas

- **D-72 — `docs/operations/co-management/02-windows-workload-sliders.md`.** `[OWNER-RULED 2026-08-19]`
  **Cross-link only, do not edit.** `01:188` routes readers there, and `:110`'s *"After moving this
  workload, ConfigMgr software updates must be disabled..."* reads oddly once `06` documents a
  supported no-move path — though `[MEASURED]` it describes a post-move consequence rather than
  claiming the move is mandatory, so the staleness is mild. **No v1.21 phase owns this file** and it
  carries six live `check-phase-53` pins (V-53-13/14/15/16/17/23). **Trigger:** the first phase that
  edits it for another reason, or a corpus-hygiene milestone.
- **`update-enterprise-supersedence` re-fetch** — unowned. `[MEASURED]` no phase in v1.21 carries the
  obligation (D-48). **Trigger:** whichever phase first quotes app-supersedence content.
- **`REQUIREMENTS.md`'s `V-54-18` row clarification** — carried from Phase 145; joined at close by
  D-20's C11-row correction.
- **A `review_by < today` freshness gate** — carried; `[MEASURED]` the existing test is one-sided
  (`days > 60`) and no validator compares either stamp to today (D-60).
- **`## Version History` in `docs/operations/`** — 2 of 20 files carry it against 249 of 282
  corpus-wide. A domain-wide ruling belongs to a hygiene milestone, not here (D-65).
- **C17 enrollment of the ~20 legacy `docs/operations/` documents** — out of scope per INT-02 and
  `EEE-SOP-standard.md:325-330` (*"enrolled by directory, never cherry-picked by filename"*).
- **An automated gate for `http(s)` link targets** — `[MEASURED]` `check-nav-hub-links.mjs:242` returns
  null for them, so no tool verifies any Learn URL in the corpus (D-69). **Trigger:** the next
  tooling-debt phase.

</deferred>

---

*Phase: 146-Windows Driver & Firmware Update Depth*
*Context gathered: 2026-08-19*
