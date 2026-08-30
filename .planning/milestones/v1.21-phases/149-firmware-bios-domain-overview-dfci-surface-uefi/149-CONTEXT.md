# Phase 149: Firmware/BIOS Domain — Overview, DFCI & Surface UEFI - Context

**Gathered:** 2026-08-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Two new documents found the `docs/operations/firmware-bios/` domain: `00-overview.md` (BIOS-01, plus
BIOS-02's disjointness statement and the domain-boundary H2) and `01-windows-dfci.md` (BIOS-02's DFCI
half, BIOS-03, BIOS-04, BIOS-11). Both are ops-class — no `doc_id`, no registry row, no C17 gate.
`docs/_glossary.md` receives this milestone's firmware/BIOS terminology per the owner ruling in D-06.

**Not this phase:** the three per-OEM guides and `docs/reference/firmware-oem-matrix.md` (150); Recipe #5
(151); **any registry row, filename-map row, canary bump, ops-index row or nav-hub wiring** (152, one
atomic commit); the harness close (153). No edits to `docs/operations/patch-management/**` — 148 D-52
spent `00-overview.md`'s **fourth and last** content touch (`148-CONTEXT.md:433`, heading `### 00-overview.md
— touch 4 of 4`) — nor to `docs/index.md`, `docs/operations/00-index.md`, `docs/decision-trees/**`,
`docs/admin-setup-apv1/**`, `docs/admin-setup-apv2/**`, `docs/lifecycle/**`, `docs/reference/**` or
`scripts/**`.

**Blast radius is NOT zero.** `ROADMAP.md:185` calls this phase *"pure new authoring"*; that is true of
`docs/` minus the glossary. This phase also edits `docs/_glossary.md` (D-06), `.planning/REQUIREMENTS.md`
(the SC#4 amendment in D-05, the traceability rows, the deferred entries), `.planning/ROADMAP.md` (the
phase checkbox and Plans line) and `.planning/STATE.md`. `V-54-21` live-reads `[REQ, ROAD]` with a
**negative** literal assertion — `PROJECT.md` names this `LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01`,
the one still-unremediated live-reading exposure — and `V-54-27` walks `.planning/` as well as `docs/`,
so it binds every PLAN file this phase writes.

</domain>

<decisions>
## Implementation Decisions

Produced by `/grill-me` (**72 sub-questions** expanded from the 8 selected gray areas) then adjudicated by
`/adversarial-review` (6 parallel Finders → Adversary → Referee). **159 raw findings, 118 after dedup, 8
disproved, 110 confirmed, 103 net distinct after 7 merge edges** — 20 CRITICAL. The Referee upheld all 7
Adversary disproofs, **overturned one Adversary confirmation** (D-70), rejected 2 of the Adversary's 7
netting pairs, found 2 double-counts the Adversary missed, and surfaced **four defects all eight prior
agents missed** (D-05's fourth channel, D-06's locked flag, D-13, D-22).

**The draft's self-assessment was inversely calibrated, exactly as in Phase 148.** The two decisions it
flagged as riskiest were its two soundest. Its most confident sentences were its defective ones — *"read
C1-1 again"*, *"a **bounded** list of five"*, *"Match the sibling contract **exactly**"*, *"**everything**
… the phase's biggest asset"*. And the real failure repeated: **requirement clauses with zero decisions**
went unflagged — BIOS-01's HP and Lenovo custody halves, BIOS-11's third clause, and both barred phrasings.

**Every coordinate below was measured at HEAD `56f0ffda`. Re-measure at plan time — never transcribe.**
Phase 146's coordinates went stale inside Phase 146; Phase 147's callout census went stale the instant 147
shipped; and `STATE.md:30`'s own scoping baseline is stale today (D-19).

### HEAD baselines — carry into the PLAN

Re-run independently at `56f0ffda`: apex `check-phase-144` **101/0/0** · `check-nav-hub-links` **0 hub /
0 corpus-link** · `c17-eee-contract` **234 files, 0 violations, all 13 assertions 0** · `check-phase-54`
**32/0/0** · `check-phase-59` **36/0/0** · `v1.20-milestone-audit` **16/0**.

- **D-01:** `[MEASURED]` **the apex subsumes all five other gates** — `check-phase-144.mjs:65-69` chains
  54 and 59, `check-phase-143.mjs:78-98` reaches `check-nav-hub-links` via `V-143-CORPUSRUN`, and
  `V-144-AUDIT-HARNESS` covers `v1.20-milestone-audit` + C17. Run the five individually only to localise a
  failure. `ls scripts/validation/check-phase-14*` stops at **144**: Phases 145-148 authored no validator,
  and per-milestone validators are deferred to **HARN-04** in Phase 153.

### Owner rulings

- **D-02:** **[OWNER-RULED 2026-08-24]** **The fetch list grows by two vendor sources so SC#1 is
  writable.** `ROADMAP.md:180` SC#1 requires HP = *"HP's cloud vault outside the tenant"* and Lenovo =
  *"the only vendor whose signing key can live under the customer's own RBAC, logging and rotation"*.
  `[MEASURED]` **neither had a fetch item and neither had a decision** — `grep -ci "cloud vault"` and
  `"Key Vault"` on the draft both returned **0**. The HP quote's only source is a **2022** PDF
  (`PER-OEM-BIOS-GAP.md:457`, *"Version 1.2.0, September 27, 2022"*) and the Lenovo superlative rests on
  `PER-OEM-BIOS-GAP.md:365`, graded **`PREMISE` — "Lenovo does not say it."** Fetch the HP Connect User
  Guide and the Lenovo CDRT blog so each custody position carries a real `**Source:**` line. **Use the
  browser-User-Agent method** (D-27). This also de-risks Phase 150, which re-fetches the same pages under
  BIOS-07/BIOS-09.
  — **Reversibility:** reversible — a later phase can strengthen the sourcing additively.
- **D-05:** **[OWNER-RULED 2026-08-24]** **Four registration channels are documented, plus an explicit
  APv2 statement, and SC#4's premise is amended on the record.** BIOS-04 and SC#4 assert `[MEASURED]`
  *"this corpus teaches **three** registration paths."* That is falsified by two separate corpus files:
  1. `[MEASURED]` `docs/lifecycle/01-hardware-hash.md:55-62`'s `### Import Methods` table carries **four**
     rows — CSV upload · OEM direct registration · PowerShell (`Get-WindowsAutopilotInfo`) · **Partner
     Center / CSP partner** (*"CSP submits on behalf of customer tenant"*). Learn's own gate
     (`PITFALLS.md:194`) reads *"through an OEM **or a Microsoft CSP partner** registration"* — so the
     fourth channel **qualifies**, and the corpus already documents it.
  2. `[MEASURED]` `docs/admin-setup-apv2/**` registers devices with **no Autopilot registration at all**
     (`04-corporate-identifiers.md:51` uses a `manufacturer,model,serial_number` CSV;
     `00-overview.md:31-32` states APv1 registration must be *removed* for APv2 to work). No Autopilot
     registration → no external attestation → **no DFCI, ever**.
  Write the gate as Learn states it (OEM **or CSP-partner** qualifies; both manual paths disqualify), map
  all four channels, and add the APv2 statement. File a `REQUIREMENTS.md` amendment recording that SC#4's
  "three" was measured against one file only. **The draft's `[MEASURED]` three-count is `[CORRECTED]`.**
  — **Reversibility:** one-way once shipped — a service-desk reader acting on a wrong eligibility gate
  buys hardware that cannot be managed, and the CSP-purchase case is common.
- **D-06:** **[OWNER-RULED 2026-08-24]** **`docs/_glossary.md` receives the DFCI terminology in this
  phase.** `[MEASURED]` `STATE.md:327`, under *"Named decisions (LOCKED at roadmap 2026-08-19)"*, names
  **"which glossary receives the new terminology (149/152)"** as a **Phase-149** discuss-phase gray area,
  and `PROJECT.md:31` names **DFCI first** among the terms this milestone adds. Phases 147 and 148 both
  deferred the identical flag; a third deferral leaves a roadmap-locked decision and a milestone scope
  statement stale. The draft's three grounds for deferring were **all defective** (D-71). The real,
  measured cost is small: **only 4 validators name `docs/_glossary.md`** (`check-phase-{49,59,62,121}.mjs`,
  10 mentions total), **none constrains adding an entry**, and no validator asserts an H3 count. The
  actual work is a `## Alphabetical Index` row (`:31`), a `## Version History` row (`:279`, Phase-75
  precedent at `:285`), and C17 conformance on the new entry.
  — **Reversibility:** reversible — entries are additive; the Version History row records the change.

### Falsified rows in the draft — do NOT inherit these

Recorded so a planner reading any earlier artifact does not re-import them.

- **D-07:** `[REVERSED]` **`CPU and IO virtualization` has NO Disabled value, so DFCI cannot be the
  mechanism that disables VBS.** `[MEASURED]` `STACK.md:176`: *"**CPU and IO virtualization** (Not
  configured / **Enabled** only — **no Disabled value**)"*. The draft recommended shipping *"Disabling CPU
  and IO virtualization via DFCI removes the virtualization support that VBS and Credential Guard depend
  on"* — an impossible operation — and annotated the contradiction instead of reversing it. **Ship the
  inverse**: DFCI cannot turn virtualization off; the VBS exposure lives in firmware settings set outside
  DFCI. See D-14 for the half that does ship.
- **D-08:** `[REVERSED]` **the Surface model-gated "reports noncompliant" consequence is FABRICATED.**
  `[MEASURED]` `STACK.md:121-122` states support gaps only; `grep -n "noncompliant" STACK.md` returns
  exactly `:186` (the category-vs-granular loop) and `:187` (the boot-vs-network-adapter conflict) —
  different mechanisms. The draft invented the behavior and called it *"the operationally useful half"*.
- **D-09:** `[CORRECTED]` **"no BIOS-NN clause mentions Surface" is FALSE.** `REQUIREMENTS.md:73`
  (BIOS-03) verbatim names *"**Microsoft Surface**"* among the nine. Only the Success-Criterion half is
  true. The surviving ground for bounding Surface is `REQUIREMENTS.md:164`'s Out-of-Scope bar on
  **per-model matrices**, which reaches a Surface eligible-model table directly.
- **D-10:** `[CORRECTED]` **`V-54-08` cannot be broken by a table row, and neither `V-54-08` nor `V-54-29`
  can see this phase's files.** `148-CONTEXT.md:112-118` (D-13) measured a wrapped **data** row at 32/0/0;
  only a wrapped **header** row fails. `check-phase-54.mjs:129` runs `readFile(OV)` and `:496` likewise —
  both are scoped to `patch-management/00-overview.md`. `V-54-11` (`:173-177`) reads only `WIN`. **No URL
  or table this phase writes can flip any of the three.** The real one-physical-line rule is 147 D-34's.
- **D-11:** `[CORRECTED]` **the `&` slug mechanism.** `check-nav-hub-links.mjs:121-126` (`githubSlug`)
  strips `[^a-z0-9 _-]` **in place** then maps each remaining space to one hyphen, never collapsing —
  so `## Firmware & BIOS Governance` → `firmware--bios-governance`, a **double hyphen**, not a silent
  drop. The draft stated this correctly for ` / ` (D-24) and incorrectly for ` & `.
- **D-12:** `[CORRECTED]` **the anchor contract is hand-authored short `<a id>` values, not heading
  slugs.** `[MEASURED]` `05:52 what-intune-can-and-cannot-do` · `06:379 oem-catalog-firmware` ·
  `07:36 what-autopatch-is-and-is-not` · `07:71 enrollment-prerequisites` · `08:53
  m365-apps-update-channels`. 147 D-69 states the rule. The checker unions explicit ids with heading slugs
  (`:158-172`), so raw-slug ids are not *broken* — they are off-convention, and Q9.4 would have handed
  them to Phase 151 as the contract.
- **D-13:** `[CORRECTED — nobody caught this until the Referee's fresh read]` **the "oldest source" claim
  is false at the scope both `ROADMAP.md:187` and `STATE.md:564` assert.** They say *"the oldest source in
  the **whole set**"*. `[MEASURED]` `STACK.md:770` cites `waas-manage-updates-wufb` at `ms.date`
  **2024-05-16**, older than `configure-bios-windows`'s **2024-06-06**. Write *"the oldest source in the
  **Pillar-A** set"* and record the governing artifacts' overclaim. This is **148 D-11 replayed against
  the same counter-source** — the draft cited D-11 as a cautionary tale and committed its error.
- **D-14:** `[CORRECTED]` **the VBS→Hotpatch hop IS first-party sourced.** `PITFALLS.md:288` (C1-5)
  carries the Autopatch FAQ (`ms.date` 2026-05-28) verbatim: *"Devices might be temporarily ineligible
  because the devices don't have Virtualization-based Security (VBS) enabled and running."* The draft
  truncated the chain on a false premise about its own research. Ship the full chain, on the corrected
  mechanism from D-07, and hand C1-5's *"OS features gated by this setting"* matrix column to Phase 150.
- **D-15:** `[CORRECTED]` **`FEATURES.md:303` opens *"New glossary terminology is confirmed needed."***
  The draft quoted only that line's closing ⚠ re-measure warning. Superseded by D-06 regardless.
- **D-16:** `[CORRECTED]` **`STACK.md:70` does not carry the `UEFI`/`BIOS` counts** (it carries
  DFCI/SEMM/Sure Admin/Dell Command = 0 and "282 markdown files"). Those counts are `STATE.md:30`.
  And `STACK.md:206` is the HP-Connect owner-ruling bullet, **not** a British-spelling site (D-28).
- **D-17:** `[CORRECTED]` **`#driver-firmware-policy` lives in `01`, not `06`.** `[MEASURED]`
  `01-windows-wufb-rings.md:170` is `<a id="driver-firmware-policy"></a>`; `06`'s eight ids are
  `what-this-policy-does`, `approval-modes`, `approval-workflow`, `deferral-deadline-behavior`,
  `oem-catalog-firmware`, `driver-update-reporting`, `configmgr-coexistence`, `unsupported-callouts`.
  The draft's *"`06` … and **its** `#driver-firmware-policy` anchor at `01:170`"* prints the right
  coordinate under a wrong antecedent — the 148 D-05 defect class in the sentence citing 148 D-05.
- **D-18:** `[CORRECTED]` **line endings.** `[MEASURED]` `git ls-files --eol
  docs/operations/patch-management/`: worktree `00`–`04` are **all** `w/crlf`, `05`–`08` **all** `w/lf`.
  The memory-sourced *"`01` is CRLF while its siblings are LF"* is wrong. New files are born LF; since
  this phase's only existing-file `docs/` edit is `_glossary.md`, check that file's ending before any
  string replacement — a mismatch is a **silent zero-match**.
- **D-19:** `[CORRECTED]` **the greenfield hard constraint is not literally true, and the research counts
  are stale.** `STATE.md:157` says *"zero corpus occurrences of every term"*. `[MEASURED]` at HEAD:
  `DFCI` = **0** · `SEMM` = **0** · `Sure Admin` = **0** · `UEFI` = **3** · `BIOS` = **52** occurrences /
  **38** lines. `STATE.md:30` records `UEFI` = 2 and `BIOS` = 37 — stale in both metrics measured
  like-for-like. **Locate all three `UEFI` hits before writing** (`decision-trees/03-tpm-attestation.md:59`,
  `patch-management/06:429`, `_glossary.md:203`); `06:429` — *"without requiring the **BIOS/UEFI** to be
  unlocked"* — is a live in-corpus firmware/BIOS claim inside the *update* domain and is the seam D-20
  exists to state. **Beware the metric trap:** research counts used `grep … | wc -l` (lines); an `-o`
  occurrence count is not comparable.

### File shape, numbering and commit order

- **D-20:** **TWO files: `00-overview.md` and `01-windows-dfci.md`.** Surface folds into `01` as a
  section (D-30). `[MEASURED]` `ARCHITECTURE.md:112-117` maps six files including a standalone
  `02-surface-uefi.md` — but that file is **advisory research**, `ARCHITECTURE.md:697` (OQ-5) records the
  numbering as an **open question**, `REQUIREMENTS.md:71-81` names exactly one firmware-bios file, and
  `STATE.md:322` (BIOS-SPLIT) enumerates *content* scope that two files satisfy. A third file would rest
  on zero requirement clauses and zero Success Criteria.
  — **Reversibility:** reversible — a standalone Surface file can be added additively in 150 or later;
  nothing downstream is pinned to the count. `ARCHITECTURE.md:293` explicitly bars its own N from becoming
  a literal (*"The `10` above is a scope estimate and MUST NOT become the literal"*), and INT-03 requires
  every canary be computed from the registry after rows land.
- **D-21:** **Phase 150's guides become `02-dell-*`, `03-hp-*`, `04-lenovo-*`.** `[MEASURED]` all four
  existing ops domains are gap-free from 00 (`co-management` 4, `patch-management` 9, `app-lifecycle` 5,
  `drift-migration` 5), and `grep -rln "firmware-bios" scripts/` = **0**, so no validator pins any name.
- **D-22:** **The LOCKED `DISCUSS-PHASE-FLAGS` naming/numbering item is DISCHARGED here, explicitly.**
  `STATE.md:327` names *"firmware/BIOS domain naming and file numbering (149)"* under *"Named decisions
  (LOCKED at roadmap 2026-08-19)"*, and `ARCHITECTURE.md:697` lists `firmware-bios/` vs
  `firmware-governance/` vs `bios-management/`. Ruling: **`firmware-bios/`**, because BIOS-01 states the
  path literally and requirement text is the authority. Record the disposition — do not leave a locked
  flag silently unaddressed, which is what the draft did.
- **D-23:** **H1s: `# Firmware and BIOS Governance` and `# Device Firmware Configuration Interface
  (DFCI)`.** Write **`and`**, never `&`, in every H1 and H2 — `[MEASURED]` all 38 sibling H2s use "and",
  and the `&` slug is a double hyphen (D-11). `[MEASURED]` zero Title collisions across the 225 registry
  rows; **check `docs/_registry/RE-index.md`, not `filename-map.md`** — the latter's header is `| Doc ID |
  Path | Output Filename |` with no Title column (`build-filename-map.mjs:4-5`: *"the Title column is the
  sole source of truth, D-07"*). Re-check at plan time against 150/151's planned Titles; per 147 D-70 a
  *resolvable* Title collision silently renames the whole colliding group's `.docx` outputs.
- **D-24:** **H2 skeletons — the anchor count is the contract, not the H2 count.** `[MEASURED]` all four
  siblings are 10 H2 / 8 own-line anchors / 0 fences / 0 Version History, but **no validator counts H2s**
  in this directory (D-31), so do not pad or truncate. Anchors = H2 − 2 (`## Related Resources` and
  `## External References` unanchored). **Ids are hand-authored short forms** per D-12.

  `00-overview.md` — 9 H2s / 7 anchors:
  ```
  ## Who Holds the BIOS Secret                        BIOS-01 (the routing spine)
  ## The Two Native Intune BIOS Surfaces              BIOS-02 (disjoint; owns .cctk / 2 MB / Dell-only)
  ## Choosing a Path                                  BIOS-01 (routing; no links to 150 — D-26)
  ## What This Domain Does Not Own                    TPM / Secure Boot / BitLocker / updates (D-36..D-39)
  ## Before You Start                                 BIOS-11 bricking quote (D-33) + pointer to 01
  ## Unsupported and Anti-Feature Callouts            pinned corpus literal (148 D-24)
  ## Related Resources
  ## External References
  ```
  That is 8; the ninth is `## Where This Domain Fits` only if the seam prose (D-20/D-39) does not sit
  naturally under `## What This Domain Does Not Own`. **Do not invent a `## Reporting and Verification`
  H2** — no requirement or SC backs it.

  `01-windows-dfci.md` — 12 H2s / 10 anchors:
  ```
  ## What DFCI Is                                     BIOS-02 (UEFI CSP, per-setting reporting, cert chain)
  ## Prerequisites and Disqualifiers                  BIOS-04 (the three-part gate; four channels — D-05)
  ## OEM Support                                      BIOS-03 (nine + pending + the conflict) — D-25
  ## Surface Eligibility                              D-30 (bounded)
  ## The Settings Surface                             D-32 (categories only + the three traps)
  ## Bricking and Irreversible Configuration          BIOS-11 (the DFCI warning + SC#5 clause 3 — D-34)
  ## Retiring a Device                                BIOS-11 (ordered runbook)
  ## Reusing a Device                                 BIOS-11 (the distinct sequence)
  ## Recovering a Device Locked in the Wrong Order    D-35 (deliberate over-delivery, ground stated)
  ## Unsupported and Anti-Feature Callouts
  ## Related Resources
  ## External References
  ```
- **D-25:** **BIOS-03 lives WHOLLY in `01`'s `## OEM Support`. The overview gets a table cell and a
  pointer, nothing more.** `[CORRECTED]` the draft assigned BIOS-03 to both files via three questions
  giving three different answers, which would either duplicate a load-bearing first-party quote across two
  files — the `146-REVIEW.md` WR-01 cross-page evidence-line defect — or drop it between them. More
  broadly: **the draft landed four of five requirements in a file it simultaneously insisted was "a
  routing hub, not a guide."** The overview carries **BIOS-01**, BIOS-02's disjointness statement and its
  Dell-template mechanics, and BIOS-11's Dell-template bricking quote (D-33). Everything else is `01`'s.
- **D-26:** **ZERO outbound links to any `docs/operations/firmware-bios/02|03|04-*.md`.** The overview
  routes by **naming** each vendor and its custody position in prose and in a table; Phase 150 adds the
  links when it authors the targets. `[MEASURED]` `check-nav-hub-links.mjs:7-8` confirms no baseline,
  allowlist, ratchet or expected-failure list; 148 D-65 measured four dangling links = 4 corpus-link
  failures = apex **100/1** via `V-144-CHAIN-143 → V-143-CORPUSRUN`; 147 D-48 measured one = one. BIOS-01's
  verb is *"routes"*, which prose satisfies, and SC#1 requires no links. **Hand the link-adding forward to
  Phase 150 explicitly** (D-42) — INT-04 is scoped to `docs/index.md` and `docs/operations/00-index.md`
  only, so 152 will not pick it up by default.
  Outbound links that ARE written (all targets `[MEASURED]` live): `../patch-management/06-windows-driver-firmware-updates.md`,
  `../../decision-trees/03-tpm-attestation.md`, `../../admin-setup-apv1/01-hardware-hash-upload.md`,
  `../../lifecycle/01-hardware-hash.md`, `../../_glossary.md`.
- **D-27:** **Write RELATIVE paths, computed from the source file.** `check-nav-hub-links.mjs:288`
  (`resolveLinkTarget`) resolves relative to the source, and `[MEASURED]` 69 `../../` links already exist
  under `docs/operations/`. The draft never wrote one correct relative path. **And never write bare `01`**
  — this phase's own file is `01-windows-dfci.md` while the draft used `01` throughout to mean
  `patch-management/01-windows-wufb-rings.md`. Always write the full relative path.
- **D-28:** **ONE commit, both files.** `[CORRECTED]` the draft's two-commit / guide-first ordering is
  **void**: with D-29's bidirectional links, guide-first strands `01`→`00` exactly as overview-first
  strands `00`→`01`. The argument is symmetric. A live probe confirmed the failure shape
  (`-- target file not found`, 2 corpus-link failures). **Plan the remediation round in** — 148 D-66
  measured that *neither* predecessor finished in the number of plans it started with.
- **D-29:** **The two files cross-link each other, both directions**, including the
  `> **Platform applicability:**` blockquote's link back to the overview, which `[MEASURED]` every sibling
  carries at its own line 12-15 (`05:12`, `06:12`, `07:14`, `08:13`). Safe because D-28 lands both together.
- **D-30:** **Frontmatter: `platform: Windows`, `applies_to: APv1`, `audience: admin`, no `doc_id`.**
  `[NEW — a ninth gray area nobody named]` `applies_to` is a **substantive claim here, not housekeeping**:
  DFCI's central gate is hardware-hash Autopilot registration, an APv1 construct;
  `admin-setup-apv2/00-overview.md:31` states APv1 registration must be *removed* for APv2 to work; and
  `[MEASURED]` both DFCI-adjacent neighbours carry `applies_to: APv1` (`RE-077`, `RE-210`). `applies_to:
  all` would assert DFCI reaches APv2 fleets, which D-05 establishes it cannot. `last_verified` = actual
  execution date, `review_by` = that **plus 60 by arithmetic** (147 D-62 / 148 D-70 — never mirror a
  sibling's stamps). Note honestly that `[MEASURED]` **nothing enforces the 60-day interval on these
  files**: `V-54-07` is `PATCH_FILES`-scoped (`check-phase-54.mjs:35`) and the audit's C5/C10 tests are
  Android/Linux path-enumerated (`v1.20-milestone-audit.mjs:152, 202`).
- **D-31:** **A `> **Platform applicability:**` blockquote in both files, full lexicon.** `V-54-27` is a
  corpus-wide negative on a line-start `> **Platform:**` walking `docs/` **and** `.planning/` — it binds
  these files and every PLAN file. Zero code fences (`[MEASURED]` all four siblings = 0). No Version
  History (`[MEASURED]` all four = 0) — but `docs/_glossary.md` **does** get one (D-06).

### Surface, the settings surface and the traps

- **D-32:** **Surface is BOUNDED, and the bound is stated on the record.** Ships: the prerequisite floor
  (Windows 11, or Windows 10 1809+; Autopilot-registered; commercial SKUs), the **"self-registered devices
  never get DFCI"** rule, the disapplied-settings Note quoted verbatim **with its leading `Disable`**
  (*"CPU and IO virtualization, **Disable Boot from network adapters**, Windows Platform Binary Table
  (WPBT), NFC, and SD card."* — and say which page you quote, because `ref-dfci-settings-windows`'s display
  name is the unprefixed **Boot from network adapters**), and one sentence that model eligibility carries
  per-model and per-processor exclusions, routing to the vendor page. **Does not ship:** the eligible-model
  table or a model-gated-settings table — `REQUIREMENTS.md:164` bars **per-model matrices** literally.
  **Dispose of `STACK.md:113` and `:120` by name** (*"a real, enumerable model list"* / *"worth a table in
  the guide"*) rather than leaving a live research instruction standing. The phase title's "Surface UEFI"
  is a deliberate over-delivery bound, recorded here so a verifier does not read it as a gap.
- **D-33:** **The Surface removal path ships with an EXPLICIT ordering warning.** `[MEASURED]`
  `STACK.md:124`'s Surface factory-new path (Retire/Wipe → **delete the Autopilot registration** → wired
  Internet via a Surface-branded Ethernet adapter → UEFI → **Management > Configure > Refresh from
  Network**) performs, at step 2, the exact operation `PITFALLS.md` C1-2 defines as the destructive
  mistake — *"wipe a device, and delete the Windows Autopilot record **before** unlocking"* — which
  PITFALLS calls *"the single highest-consequence item in the milestone — it destroys hardware value."*
  The default retire sequence stays **unlock via the profile → wipe → delete the Autopilot record last**.
  The two must not sit adjacent without the warning. **No validator can catch this.**
  — **Reversibility:** one-way in the field — a reader who follows the Surface order on a non-Surface DFCI
  fleet bricks the device beyond Intune's reach.
- **D-34:** **SEMM: say nothing. No mention, no "legacy", no routing table.** `[MEASURED]`
  `REQUIREMENTS.md`'s `## Future Requirements` ("Deferred beyond v1.21, with triggers") already carries
  *"**SEMM current status** — `[UNVERIFIED]`. No 'SEMM vs DFCI' routing table may ship until this
  resolves."* It is a **milestone-level deferral** with no BIOS-NN clause and no Phase-149 SC. `SEMM` = 0
  corpus occurrences, so there is no claim to reconcile. Introducing the term to caveat it manufactures the
  ambiguity the deferral exists to avoid.
- **D-35:** **The settings surface ships as CATEGORIES ONLY plus the three traps — but say so honestly,
  because roughly ten setting names ship anyway.** `[CORRECTED]` the draft's "no settings table" was
  illusory: D-32 quotes five names, the trap-1 worked example names Radios/Wi-Fi/granular radios, the
  retire runbook names two more, and D-36 names WPBT and Simultaneous multithreading. The rule is
  **durable consequence ships; high-churn enumerable data routes out** — state it as a named rule so a
  verifier can check it. `[CORRECTED]` the Out-of-Scope bullet does **not** reach
  `ref-dfci-settings-windows`: `REQUIREMENTS.md:164`'s trailing sentence scopes it to *"they do not rewrite
  vendor manuals"*, and this is a Microsoft Intune policy reference. The real precedent is
  **148 D-45, which SHIPPED a bounded six-row table plus a link-not-copy pointer** — and warned about
  omitting the row an adjacent decision required, which is the trap here.
  — **Reversibility:** reversible — a fuller table is additive; nothing in 150/151/152 depends on the
  absence, though Phase 151's decision points and BIOS-12's matrix column both consume setting names.
- **D-36:** **All THREE interaction traps ship** — `[MEASURED]` `STACK.md:184` records the research's own
  *"(the original draft said 'two' and then listed three)"* correction. (1) The category-vs-granular
  conflict loop, with Learn's worked example as a **numbered list, not a code fence** (148 D-48). (2) The
  boot/port trap — ship **both halves**: the compliance conflict (*Boot from external media* Disabled also
  disables network-adapter boot; combining with *Boot from network adapters = Enabled* makes one
  noncompliant) **and** the recovery consequence. (3) Radios = Disabled requires a wired connection or the
  device becomes unmanageable. **Trap 1 goes under `## The Settings Surface` as a callout, not under
  `## Unsupported and Anti-Feature Callouts`** — `[MEASURED]` every sibling instance of that H2 carries
  documented first-party *absences* (`06:664-700`, `07:392-418`), and a user-caused misconfiguration is
  neither unsupported nor an anti-feature. **Trap 2 needs TWO `**Source:**` lines** — its SSD case comes
  from the Surface guide, and D-45's scope rule bars one line spanning two pages.
- **D-37:** **No string ships inside quotation marks unless it was read from the live page at plan time.**
  `[MEASURED]` the draft rendered `STACK.md:187` and `:186` — both **unquoted researcher prose** — as
  italicised first-party verbatim (*"may require physically opening the device and replacing the hardware
  storage"*), and asked for a "verbatim" reproduction of a paraphrase that has no quoted form. SC#5 and
  BIOS-11 grade on quotation fidelity and D-46 concedes the verifier is the only gate.

### The two bricking warnings, and BIOS-11's third clause

- **D-38:** **There are TWO first-party bricking warnings on TWO pages, and they go in different files.**
  The overview quotes `configure-bios-windows`'s Warning — *"BIOS configuration changes can impact device
  functionality and operability, **including the ability to boot or access Bitlocker encrypted drives**"*
  (`STACK.md:144`) — because that is the page describing the **Dell template** surface the overview
  introduces, and it is the quote `REQUIREMENTS.md:81` (BIOS-11) names. `01` quotes
  `configure-dfci-windows`'s distinct warning — *"Configuring and assigning DFCI profiles can lock the
  device beyond repair"* (`STACK.md:97`). **One quote per file, each with its own `**Source:**` line.**
  `[CORRECTED]` the draft gave three contradictory homes for the single requirement-bearing quote in the
  phase (Q4.6 "pointer", Q4.7 "quotes", Q1.6 "warnings" plural in `01`).
- **D-39:** `[NEW — SC#5's third clause had ZERO decisions]` **Deleting the profile OR removing the device
  from the assigned group does not remove settings or re-enable the UEFI menus** — its own sentence under
  `## Bricking and Irreversible Configuration`, quoted from `configure-dfci-windows`. `[MEASURED]`
  `grep -ci "group assignment"` on the draft = **0**. Source string at `FEATURES.md:68`. Note that
  *"delete the profile"* is the common instinct and is exactly the wrong move (`PITFALLS.md:240`).
- **D-40:** **Retire, Reuse and Recover stay THREE separate H2s.** BIOS-11 requires retire and reuse be
  *"documented as **distinct**"*, and the discriminator must be written, not just implied
  (`FEATURES.md:68`: Reuse = wipe but **do not** remove the Autopilot record; Retire = unlock first, then
  wipe, then delete the record). **`## Recovering a Device Locked in the Wrong Order` is a deliberate
  over-delivery** — no BIOS-NN clause and no SC covers it — shipped because it is the highest-value
  content in the phase and `STACK.md:96` sources it. Record the ground, exactly as D-32 does for Surface,
  or a verifier asks the same question.

### The domain boundary

- **D-41:** **`## What This Domain Does Not Own` cross-links FOUR owners, not one.** `[CORRECTED]` the
  draft named TPM only. Measured corpus ownership: **TPM 2.0** = 31 occurrences / 12 files; **Secure Boot**
  = 4 / **2 files** — and `[MEASURED]` **zero occurrences in `decision-trees/03-tpm-attestation.md`**, so
  the draft's single cross-link routed Secure Boot nowhere; **BitLocker** = **82 / 19 files**, ~2.6× TPM,
  and the only one of the three named inside BIOS-11's own quote, which the draft never measured at all.
  Targets: TPM → `../../decision-trees/03-tpm-attestation.md`; **Secure Boot → `../../_glossary.md#secure-boot`**
  (`:201`, defined at `:203` as *"A UEFI firmware feature that verifies the bootloader's digital
  signature"* — and **linking is not editing**); BitLocker → `../../reference/security-baseline-conflicts.md`;
  **firmware *updates* → `../patch-management/06-windows-driver-firmware-updates.md`**.
- **D-42:** **State the updates-vs-configuration seam explicitly.** `PER-OEM-BIOS-GAP.md:372` heads a
  whole section *"keep these axes separate"*. `06` has "Firmware" in its filename and this domain has
  "firmware" in its directory name; without one sentence they read as duplicates. The live evidence is
  `06:429` — *"without requiring the **BIOS/UEFI** to be unlocked"* (D-19). **No edits to `06`.**
- **D-43:** **Write the TPM/Secure-Boot absence as an ENUMERATION FACT, never as a sourced absence.**
  `[CORRECTED]` no first-party sentence says *"DFCI cannot set TPM or Secure Boot."* Correct shape: *"the
  DFCI settings reference enumerates eight categories; neither TPM nor Secure Boot appears among them"*,
  with the `**Source:**` line on the **enumeration**. The draft's *"state that as an absence, **sourced**"*
  contradicts its own attribution rule and is an argument from silence.
- **D-44:** **`docs/admin-setup-apv1/01-hardware-hash-upload.md` is cross-linked, never edited — and the
  INBOUND link is handed to Phase 152 by name.** `PITFALLS.md:212` prescribes the link *in the DFCI
  guide pointing back at* that file (*"if you registered via Path 2 or Path 3, DFCI is not available to
  you"*), which is `01`'s to write. But `PITFALLS.md:949`'s acceptance row asks for the **inbound**
  direction, and `[MEASURED]` INT-04 (`REQUIREMENTS.md:99`) is scoped to `docs/index.md` and
  `docs/operations/00-index.md` **only** — so without an explicit hand-off the link is nobody's job. 148
  D-44 is the precedent for recording exactly this. `[CORRECTED]` the draft's C17 argument for declining
  the edit is **invented**: `c17-eee-contract.mjs:5-6` enrolls a file iff it has a `doc_id` and lives under
  `docs/`, so `RE-077` is *already* enrolled and already in the 234-file baseline; and **zero validators in
  `scripts/validation/` reference the file at all**. The real grounds are staleness
  (`last_verified: 2026-04-13 / review_by: 2026-07-12`, past due, in the 217-of-271 population parked at
  `REQUIREMENTS.md:139`) and scope. **Link the FILE, not a heading anchor** — but note `[MEASURED]` all
  three Path slugs are clean (`path-1-oem-delivery`, `path-2-csv-bulk-import`,
  `path-3-powershell-script-get-windowsautopilotinfo`), computed against the repo's own `githubSlug`, so
  if the per-path pinpoint SC#4 turns on is wanted, probe the anchor and use it.
- **D-45:** **`decision-trees/03-tpm-attestation.md` is the chosen TPM target, with its mismatch
  recorded.** `[MEASURED]` `doc_id: RE-210`, `doc_type: Reference`, `applies_to: APv1`, **`audience: L1`**,
  `review_by: 2026-06-18` — **66 days past due, worse than the file D-44 declines on staleness grounds**.
  The corpus owns TPM in **three** places (also `docs/error-codes/02-tpm-attestation.md` and
  `docs/l2-runbooks/03-tpm-attestation.md`). Chosen because it is the triage root a reader is routed to
  elsewhere; record that an `audience: admin` reader lands on an L1 artifact, and that `FEATURES.md:283`'s
  staleness-propagation warning applies.

### The research pass

- **D-46:** **A bounded fetch list of SEVEN, every item graded.** `[CORRECTED]` the draft listed five and
  graded **one**; 148 D-58's recorded failure was grading four of eight.

  | # | Target | On failure |
  |---|---|---|
  | (a) | `autopilot/dfci-management` (`ms.date` 2025-03-25 / `updated_at` 2026-04-14) — the **nine**-OEM list, *"Other OEMs are pending."*, the 24H2 Pro known issue + KB5046740, and `managedDevice/deviceFirmwareConfigurationInterfaceManaged` | **BLOCKS SC#3 and SC#4** — escalate |
  | (b) | `intune/device-configuration/templates/configure-dfci-windows` (2026-06-23 / 2026-07-01) — prerequisites, reboot model, retire/reuse/recover, *"lock the device beyond repair"*, SC#5 clause 3 | **BLOCKS SC#5** — escalate |
  | (c) | `intune/device-configuration/templates/configure-bios-windows` (**2024-06-06** / 2026-07-01) — the six-OEM list, the Dell template + `.cctk` + 2 MB + Dell-only, the Bitlocker Warning, Graph + RBAC, the subscription-end trap | **BLOCKS SC#2 and SC#5** — escalate |
  | (d) | `intune/device-configuration/templates/ref-dfci-settings-windows` (2026-06-23 / 2026-07-01) — the eight categories, the three traps, the "Enabled only" value set | Blocks D-35/D-36, **not an SC** — ship the categories from (c)'s comparison table and state the reduction |
  | (e) | `surface/surface-manage-dfci-guide` (`ms.date` 2026-07-14; **no `updated_at` on record — capture it**) — Surface prerequisites, the disapplied-settings Note, the removal path | Non-blocking — Surface is bounded (D-32); drop the section and state the absence |
  | (f) | **HP Connect User Guide** (D-02) — the cloud-vault custody sentence | **BLOCKS SC#1's HP clause** — escalate |
  | (g) | **Lenovo CDRT ThinkDeploy blog** (2025-11-04) (D-02) — Azure Key Vault signing custody | **BLOCKS SC#1's Lenovo clause** — escalate; the *"only vendor"* superlative is `PREMISE` and may not ship unsourced |

  **The one-OEM Project Mu variant IS fetched** (`microsoft.github.io`, source bytes trivially
  retrievable) — `[CORRECTED]` the draft excluded it while simultaneously requiring it, and
  `REQUIREMENTS.md:73` names the one-OEM variant explicitly.
- **D-47:** `[CORRECTED]` **the six-OEM list is BLOCKING for SC#3, not non-blocking.** Delete the draft's
  *"drop the count and keep the conflict"* escape hatch — SC#3 and BIOS-03 both require *"the six-OEM and
  one-OEM variants … recorded as a documented conflict"*, so dropping the count fails the criterion on the
  draft's own stated discriminator.
- **D-48:** **Write the nine OEM names into the PLAN, verbatim, from `PITFALLS.md:200`:** *Acer. Asus.
  Dynabook. Fujitsu. Microsoft Surface. Panasonic. VAIO. Samsung. NEC.* `[MEASURED]` the draft never
  enumerated them (`Dynabook` = 0 occurrences) — handing a planner "nine OEMs" with no names, while the
  *"the six"* decoy is live on `configure-bios-windows` to fill the vacuum.
- **D-49:** **A runnable grep for the BARRED PHRASINGS in the PLAN's acceptance criteria.** `[NEW — this
  had ZERO decisions]` `REQUIREMENTS.md:73`, `ROADMAP.md:230` and `STATE.md:169` all bar *"The six"* and
  *"most business OEMs"*. Carry `grep -rniE "the six|most business OEMs" docs/operations/firmware-bios/`
  = 0. (The hyphenated label *"six-OEM"* is the requirement's own wording and is not barred.)
- **D-50:** **Retrieval is `curl` + tag-strip + literal grep, with a browser User-Agent.**
  `PER-OEM-BIOS-GAP.md:31-40` records `curl -A "Mozilla/5.0 …"` turning a 403 into a 200 and calls it
  *"the single most important methodological finding in this pass"* — live, not theoretical, because
  D-02's HP source is the property that 403'd. `gh api` is the Canonical-specific precedent (148 D-59);
  `windows-itpro-docs` is not publicly readable on any branch (`146-RESEARCH.md:101`) and (a) historically
  lives there, so read `<meta name="original_content_git_url">` first and **write the contingency down**
  — (a), (e), (f) and (g) are all first-time docsets for this project. Per user memory, fetch **source
  bytes**; a WebFetch answer is not evidence.
- **D-51:** **Record `ms.date` AND `updated_at` beside every quote.** `[CORRECTED]` the draft's
  `**Source:** … (updated YYYY-MM-DD)` shape carries only the fresh date, which would render
  `configure-bios-windows` as `(updated 2026-07-01)` and make the two-year staleness this whole area
  exists to surface **invisible in the shipped document**. 148 D-59 requires both.
- **D-52:** **Apply the milestone's `[DIRECT]` / `[RELAYED]` quotation gate.** `PER-OEM-BIOS-GAP.md:20-27`:
  *"This milestone has already shipped **two fabricated citations** … **Re-verify before quoting in a
  shipped document.**"* The draft never mentioned the system, and then permitted shipping quotes from the
  research file on fetch failure. **Nothing ships from the research file inside quotation marks** (D-37).
- **D-53:** **Pin every quote by its surrounding heading, never by grep hit. Five decoys, both classes.**
  (1) `configure-bios-windows` carries a DFCI column with the **narrower six-OEM list** — a `DFCI` grep on
  that page returns exactly the conclusion BIOS-03 bars. (2) `configure-dfci-windows` **never uses the
  string "UEFI CSP"**; that string is on `ref-dfci-settings-windows` and in (c)'s comparison table
  (`STACK.md:77`). (3) (b)'s own step heading is **"Step 2 - Create an Enrollment State Page profile"** —
  *State*, not *Status*; use **ESP / Enrollment Status Page** as the product name but never present that
  phrase as a verbatim quote from that page. (4) *"as a blocking app"* is **NOT on the page** and was
  added by an earlier draft (`STACK.md:162`) — the one already-committed fabrication in this set.
  (5) The **Dell-only** fact has two first-party strings on one page — *"Currently, only Dell is
  supported"* (`FEATURES.md:66`) and *"Dell / Possibly more in the future"* (`STACK.md:152`) — so a
  re-fetch finding one and not the other is a location difference, not a page change. Plus 148 D-61's
  **stale-revision class**, which the draft dropped entirely.
- **D-54:** **URLs: use the `device-configuration/templates/` canonical paths.** `[MEASURED]`
  `STACK.md:585-588` records the old `intune/intune-service/configuration/…` path for (b) as a live **301**
  (not a 404, and `STACK.md:838` records that a blanket "all 404" claim was reproducibly false), while the
  old paths for (c) and (d) are genuine **404s**. A 200-only link checker passes a redirect silently.
- **D-55:** **The verifier re-fetches and diffs, and the PLAN says so.** `[MEASURED]` 145's verifier
  fetched 7 live URLs with zero fabrications; 146 recorded 8 pages / 36 verbatim strings diffed; 147
  recorded 8 pages / zero fabrications. `grep -rn "Source:" scripts/` = **0** — **no validator parses
  evidence lines**, so the verifier is the only gate that can catch a fabricated quote, and this phase
  quotes **seven** pages.

### Sourcing, gates and prose discipline

- **D-56:** **Evidence lines follow `06`'s pattern**: one standalone, line-start
  `**Source:** [Article title](url) (ms.date YYYY-MM-DD, updated YYYY-MM-DD)` paragraph per quoted or
  corrected claim, **after** the claim, never inside a leading blockquote (145 D-07), never an inline
  parenthetical (145 D-01). **One Source line may cover one blockquote of contiguous quotes from ONE page;
  it may NEVER span claims from different pages** (147 D-21). `[MEASURED]` `06` ships 64 such lines, `05`
  11, `07` 24, `08` 23. This phase carries the milestone's heaviest multi-page load — seven pages, and
  three sections (BIOS-03's three-list conflict, D-38's two warnings, D-36's trap 2) that each mix pages
  inside one topic. `146-REVIEW.md` WR-01 is exactly this defect.
- **D-57:** `[CORRECTED]` **THREE gates genuinely bind this phase, not zero.** The draft claimed *"all six
  gates read green whether these files are correct, wrong, or largely empty"* and called it *"stronger
  here"* than 148 D-68. A live probe disproved it: a bare `> **Platform:**` + a dangling link + a bad
  anchor + `System Center` + `Autopatch rings` produced `check-nav-hub-links: 2 corpus-link failures`,
  `V-54-27 FAIL`, `C11 FAIL (2 hits)`, `check-phase-54: 31/1`, `v1.20-audit: 15/1`. The **near-empty** half
  is true. The three that bind: **`check-nav-hub-links`** (target existence + anchor resolution, no
  allowlist), **`V-54-27`** (corpus-wide, walks `.planning/` too), and **C11** via
  `v1.20-milestone-audit.mjs:585`'s live `walkMd('docs')`. C17 also binds `docs/_glossary.md` under D-06.
  Everything else rides on the acceptance criteria.
- **D-58:** **C11 discipline.** `[MEASURED]` the four fallback patterns at
  `v1.20-milestone-audit.mjs:574-579` are `\bSystem Center\b`, `\bSCCM\b[^.]*\bIntune\b`,
  `\bAutopatch rings\b`, `\bSafetyNet\b[^.]*\bcompliance\b`, and `ALLOWLIST.c11_ops_patterns` is **not
  defined in the sidecar**, so the fallback runs. Write **`Configuration Manager`**, never `SCCM` or
  `System Center`; singular **`Autopatch ring`** if Autopatch is mentioned. **C11 strips nothing** — no
  frontmatter, no fences, no link targets — so URL text is scanned, though only against those four
  patterns; none of this phase's Learn URLs matches one. **Verify by running the audit, never by reading
  the keyword list**, and note per user memory that C11 lives only in the milestone audit — a
  `check-phase-54` pass is not evidence of C11 cleanliness.
- **D-59:** **American spelling everywhere, with a grep that actually catches the risk.** `[CORRECTED]`
  the draft's `grep -rn "enrolment\|licence\|behaviour\|organisation"` **cannot match the forms it itself
  names**. Carry:
  `grep -rniE "enrolment|enrols|enrolling\b|licence|behaviour|organisation|programme|labelled|honour|catalogue|recognise|analyse" docs/operations/firmware-bios/`
  = 0. `[MEASURED]` the live transcription risks are `STACK.md:599` — *"Certificate-based, per-setting
  reporting, survives reimage, **auto-enrols** during Autopilot"*, the single most transcribable DFCI
  sentence in the research — plus `STACK.md:81` (*"enrols"*), `PITFALLS.md:180` (*"**programme**"*,
  *"enrols"*). British-form counts per research file: STACK 41, SUMMARY 15, FEATURES 13, PITFALLS 11.
  **The grill draft itself wrote "honouring", "labelled" and "enrolment."** The reason is mechanical: an
  H2 becomes a slug Phase 151 must match byte-for-byte (146 D-39 / 148 D-16).
- **D-60:** **Every prose negative carries a runnable grep in the PLAN's acceptance criteria** (147 D-68).
  The set here: D-34 (no `SEMM`), D-49 (barred phrasings), D-59 (American spelling), D-31 (zero code
  fences), D-37 (no research-file string inside quotation marks), D-43 (no "DFCI cannot set TPM" as a
  first-party claim), D-58 (`Configuration Manager`). `146-REVIEW.md` WR-06 found a CONTEXT prose rule
  broken **four times** inside `06`'s own prose, invisible to seven green gates.

### The glossary work (D-06)

- **D-61:** **Terms and placement.** `[MEASURED]` all are 0 corpus occurrences today: `DFCI` /
  `Device Firmware Configuration Interface`, `UEFI CSP`, `BIOS password`, `BIOS configuration and other
  settings`. Candidate H2 homes are `## Security` (`:189`, which already holds `### Secure Boot` at `:201`)
  and `## Hardware` (`:109`, which holds `### TPM` at `:137`). **Reconcile against those two existing
  entries** — `### Secure Boot`'s body already says *"A UEFI firmware feature…"*, and D-41 links to it.
- **D-62:** **Anchor slugs: plain GitHub slugs, no `{#id}` overrides.** A heading containing ` / `
  produces a **double hyphen**, so write `### Device Firmware Configuration Interface (DFCI)`, never
  `### DFCI / Device Firmware Configuration Interface`.
- **D-63:** **Three mechanical obligations, all measured.** (1) An `## Alphabetical Index` row per new
  term (`:31` — the Phase-75 precedent at `:285` records *"Alphabetical Index updated"*). (2) A
  `## Version History` row (`:279`). (3) C17 conformance — the file is `doc_id: RE-184`, `status: Approved`
  and is one of the 234 in the green baseline, so the new entry inherits all 13 assertions, including the
  **≤200-character cap on every top-level blockquote** (C17 #12) if a `> See also:` line is added.
  `[MEASURED]` **no validator asserts an H3 count**, but `check-phase-49.mjs:288-317` (`V-49-19`) loads
  `_glossary.md`'s H3 term set for a Linux-glossary collision audit — run `check-phase-49` after the edit.
  `_glossary.md`'s cycle is **90 days** (`last_verified: 2026-06-29 / review_by: 2026-09-27`), not the
  milestone's 60 — do not "correct" it.
- **D-64:** **Phase 150's vendor terms (`Sure Admin`, `Think BIOS Config`) are NOT added here.** They are
  handed to 150 (D-65) so the glossary is touched once per phase, not twice.

### Contracts handed forward

- **D-65:** **To Phase 150:** the full hand-authored anchor-id list of both files; **the fetch record for
  (c), (f) and (g)**, including the Graph `hardwarePasswordDetails` (note: **Graph *beta***, per
  `FEATURES.md` A-4 — the draft dropped that word), both RBAC paths, `Policy and Profile manager`, the
  subscription-end trap and the no-existing-BIOS-password prerequisite, all of which are **150's**
  requirements (BIOS-10, BIOS-09, BIOS-06) sourced from pages this phase fetches; the `02/03/04`
  numbering (D-21); **the ruling that the overview's outbound links to the OEM guides are 150's to add**
  (D-26); the `and`-not-`&` convention; C1-5's *"OS features gated by this setting"* matrix column (D-14);
  the `Sure Admin` / `Think BIOS Config` glossary terms (D-64); and a **falsification clause** — if 150's
  re-fetch corrects a custody position, **150 owns the correction to 149's overview**, and 150's CONTEXT
  must diff against 149's shipped claims. `[NEW — nobody owned this]` HP's portal 403'd and the Lenovo
  superlative is `PREMISE`, so the risk is live.
- **D-66:** **To Phase 152:** registry rows and filename-map rows for both files (**no `doc_id`**);
  ops-index rows and the Firmware H2; the `docs/index.md` Operations entry; **the inbound link from
  `admin-setup-apv1/01-hardware-hash-upload.md` to `01`'s prerequisites** (D-44 — INT-04 does not reach it,
  so it must be named); and the `and`-not-`&` convention for the ops-index H2. **Hand forward the RULE,
  never a number** — INT-03 requires the canary be computed from the registry after rows land, and
  `ARCHITECTURE.md:293` bars its own estimate from becoming a literal. `[MEASURED]` **zero of the 225
  registry rows is an `operations/` path**, and `parseRegistry` keys on `| RE-NNN |` rows, so "a registry
  row with no document identifier" is **unprecedented across all 225** — Phase 152's own Research flag
  already mandates the scratch-row publish-bundle probe, and D-23's Titles enter the collision space at
  that moment. **`## Patch Management` is the only barred literal heading on record** (`PITFALLS.md:646`,
  `V-54-28`); INT-04's *"barred literal heading"* for Firmware is **undefined in ROADMAP, REQUIREMENTS and
  STATE** — flag it, do not guess.
- **D-67:** **To Phase 153 (HARN-04):** a needle-spec for `check-phase-149.mjs`. Content phases hand off a
  needle-spec and never author validators. `[MEASURED]` `grep -rln "firmware-bios" scripts/` = **0**.
  Suggested needles: both files exist; the nine OEM names present; *"Other OEMs are pending."* present;
  the barred phrasings absent; both bricking quotes present in their assigned files; the four registration
  channels named.
- **D-68:** **Accepted inconsistencies, recorded so the verifier and code review do not surface them as
  new defects** (147 D-49's instrument): `ROADMAP.md:185`'s *"none in the existing corpus"* blast-radius
  claim is now inaccurate (D-06 edits `_glossary.md`); `STATE.md:157`'s greenfield constraint is
  imprecise (D-19); `docs/operations/00-index.md:32`'s *"4-platform comparison hub"* stays stale and
  unowned; `ARCHITECTURE.md:329` still calls `V-59-14` a live read when it is `readAtV15Close`
  (`check-phase-59.mjs:446-473`).
- **D-69:** If execution spans midnight, all files take the date of **commit 1** (146 D-70, 147 D-72).

### Process notes carried from the review

- **D-70:** `[REVERSED — the Referee overturned both the Finder and the Adversary]` **148's "touch 4 of 4"
  citation is CORRECT.** `148-CONTEXT.md:433` is a section heading reading verbatim
  `### 00-overview.md — touch 4 of 4`, immediately above D-52. A Finder read D-52's body (*"Four edit
  sites"*), concluded the draft had conflated two quantities, and the Adversary confirmed without opening
  the file. **Read four lines up before calling a citation wrong.**
- **D-71:** `[REVERSED]` **all three of the draft's grounds for deferring the glossary were defective** —
  recorded so no later phase re-imports them. (1) *"No v1.21 requirement covers it"* — the wrong test;
  `STATE.md:327` is a LOCKED roadmap decision and `PROJECT.md:31` a milestone scope statement, neither of
  which the draft read. (2) *"the most heavily pinned Reference file in the corpus"* — **false**: measured
  validator mentions are `quick-ref-l1.md` **130**, `common-issues.md` **120**, `_glossary-android.md`
  **63**, `_glossary.md` **10**; and the "14+ validators" figure was a substring grep catching the five
  platform glossaries. (3) the *"zero-margin freshness hazard"* — the framing 147 D-47 already measured as
  **falsified** (*"C10 computes an interval and never reads today's date"*, proved by a live probe).
- **D-72:** **Citations use full relative paths.** `[MEASURED]` `find . -name ARCHITECTURE.md` returns
  **15** paths, including five archived `milestones/v1.N-research/` copies — a bare filename is genuinely
  ambiguous, not merely informal.

### Claude's Discretion

Prose wording throughout. The exact H2 names except `## Unsupported and Anti-Feature Callouts` (the pinned
corpus literal, 148 D-24). The hand-authored anchor-id strings, provided they follow D-12's short-form
convention. Which article titles are chosen for `**Source:**` lines. Whether the overview lands at 8 or 9
H2s (D-24). Which `_glossary.md` H2 section receives the DFCI entries, between `## Security` and
`## Hardware` (D-61). The order of edits within the single commit. The exact phrasing of the seam
statements in D-42 and the bound statements in D-32 and D-40, provided each names what it defers to.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Governing artifacts
- `.planning/ROADMAP.md` §Phase 149 (`:173-190`) — goal, **five** Success Criteria, blast radius (now
  inaccurate, D-68), research flag (overclaimed, D-13); also §Phase 150 (`:192-205`), §Phase 151 SC#2 and
  §Phase 152 SC#3/SC#4 (`:233-234`) for the hand-offs, and `:210` for the link-checker no-baseline sentence
- `.planning/REQUIREMENTS.md` — BIOS-01..BIOS-04 and BIOS-11 read **clause by clause** (`:71-74`, `:81`);
  BIOS-05..BIOS-10, BIOS-12 (`:75-82`) for the 150 hand-off; INT-01..INT-06 (`:96-101`) — note **INT-04
  is scoped to two index files only** (D-44); `:139` (the parked past-due population); `:164` (`## Out of
  Scope` — the per-model-matrices bar and its vendor-manual scoping sentence, D-35);
  `## Future Requirements` (the SEMM deferral, D-34)
- `.planning/STATE.md` — the Phase 149 block (`:152-171`) and its three hard constraints; `:30` (the
  scoping baseline, **stale**, D-19); `:157` (the greenfield constraint, imprecise); `:322` (BIOS-SPLIT);
  **`:327` (the LOCKED `DISCUSS-PHASE-FLAGS` entry naming BOTH the naming/numbering item and the glossary
  item as Phase-149 decisions — D-22, D-06)**; `:564` (the "whole set" overclaim, D-13)
- `.planning/PROJECT.md` — **`:31` (the milestone scope statement naming DFCI first among added
  terminology, D-06)**; the `LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01` note (D-00/blast radius)

### Prior phase context
- `.planning/phases/148-application-update-management-winget-routing/148-CONTEXT.md` — **`:433` (the
  "touch 4 of 4" heading, D-70)**, D-01, D-11 (the oldest-source trap, D-13), D-13 (`V-54-08` presence-only,
  D-10), D-16 (American spelling), D-24 (the callouts literal), **D-45 (the bounded table + pointer, D-35)**,
  D-52, D-56, D-58 (bounded-fetch grading, D-46), D-59 (retrieval + **dual dates**, D-50/D-51), D-60, D-61
  (decoys, **both classes**, D-53), D-62, D-63/D-64 (the evidence-line contract and its SCOPE rule, D-56),
  D-65, D-66, D-68 (the gate-blindness claim this phase **corrects**, D-57), D-69, D-71, D-73
- `.planning/phases/147-linux-update-delivery/147-CONTEXT.md` — D-21 (the Source-line SCOPE rule), D-34
  (one physical line per row), **D-47 (the falsified glossary freshness ground, D-71)**, D-48 (dangling-link
  behavior and the no-direction-concept correction), D-49 (the accepted-inconsistency instrument), D-62,
  D-68 (every prose negative needs a grep), D-69 (the `<a id>` anchor contract, D-12), D-70 (the Title
  collision hazard, D-23)
- `.planning/phases/146-windows-driver-firmware-update-depth/146-CONTEXT.md` — D-06/D-07 (sealing `01`),
  D-39 (American spelling and **why**), D-70, D-72
- `.planning/phases/146-windows-driver-firmware-update-depth/146-REVIEW.md` — WR-01 (Source-line scope),
  WR-06 (a CONTEXT rule broken four times, invisible to seven green gates)
- `.planning/phases/146-windows-driver-firmware-update-depth/146-RESEARCH.md` `:97-101` —
  **`windows-itpro-docs` is not publicly readable; read `<meta name="original_content_git_url">`**
- `.planning/phases/147-linux-update-delivery/147-VERIFICATION.md` `:85`, `:150` — the curl + tag-strip
  method, 8 pages, zero fabrications
- `.planning/phases/145-corpus-correction-validator-gate-archival-drift-fix/145-CONTEXT.md` — D-01, D-07
  (evidence-line placement), **D-08 (superseded/derived claims attributed to the corpus, never to
  Microsoft — D-43)**
- `.planning/phases/145-*/145-VERIFICATION.md` `:99` — settings-catalog tables render client-side

### Research (advisory ledger — REQUIREMENTS.md and ROADMAP.md govern)
- `.planning/research/STACK.md` §"Core Technologies — Pillar A" `:66-210` — **A-1** (`:72-85`, the DFCI
  profile, the UEFI-CSP attribution trap at `:77`, the *State*-not-*Status* trap at `:80`, the 301 at
  `:85`), **A-2** (`:87-97`, persistence, the retire/reuse/recover sequences, the DFCI bricking warning),
  **A-3** (`:99-111`, the three OEM lists and the `:109` Project-Mu correction), **A-4** (`:113-125`,
  Surface — and `:123`'s `Disable` prefix), **A-5** (`:127-134`, SEMM), **A-6** (`:136-167`, the Dell
  template, `:144`'s Bitlocker Warning, `:152`'s "Dell / Possibly more", `:162`'s *"as a blocking app"*
  fabrication), **A-7** (`:169-188`, the eight categories, `:175`'s display-name divergence, `:176`'s
  Enabled-only value set, `:184-188`'s three traps), A-8 (`:190-207`); `:585-588` (the URL probe table),
  `:752-770` (Sources — **`:770` carries the 2024-05-16 counter-source, D-13**), `:821-840` (Corrections)
- `.planning/research/PITFALLS.md` — **C1-1** (`:178-215`: the registration gate at `:194`, the corpus
  path table at `:184-190`, the nine names verbatim at `:200`, the 24H2 known issue at `:203-210`, the
  prescribed three-part gate and cross-link at `:211-212`), **C1-2** (`:220-242`, the irreversible retire
  order — **D-33**), **C1-3** (`:248-258`, the conflict loop and *"a callout, not a table cell"*), **C1-5**
  (`:288-290`, the `[SOURCED]` VBS quote and the prescribed matrix column — D-14/D-65), `:646` (the only
  barred literal heading on record), `:879-880`, `:905`, `:936`, `:949` (the acceptance row asking for the
  inbound link — D-44)
- `.planning/research/FEATURES.md` — `:65-72` (Pillar-A rows A-1..A-7; **`:66`'s A-9 Dell-only string**;
  `:68`'s SC#5-clause-3 verbatim — D-39; `:72`'s Secure-Boot/TPM instruction — D-41), `:149` (X-4, the
  `managedDevice/` Graph property), `:240` (D-4, the Effectively-irreversible recipe decision point),
  `:283` (staleness propagation — D-45), **`:303` (*"New glossary terminology is confirmed needed"*)**,
  `:407` (the three sole-source claims and the currency risk), `:415-425` (Sources), `:452-453`
  (zero-count table, `UEFI` row **stale**)
- `.planning/research/PER-OEM-BIOS-GAP.md` — **`:20-43` (the `[DIRECT]`/`[RELAYED]` quotation gate, the
  two shipped fabrications, and `:31-40`'s browser-User-Agent method — D-50/D-52)**, `:241` (HP's
  cloud-vault sentence), `:319`/`:321`/**`:365` (Lenovo's Key Vault position and the `PREMISE` grading of
  the superlative — D-02)**, `:372` (the updates-vs-configuration seam — D-42), `:451-480` (Sources,
  including the 2022 and 2019 HP documents — D-13)
- `.planning/research/ARCHITECTURE.md` — `:112-117` (the six-file map, **advisory**), `:87`/`:291`/**`:293`
  (which bars its own N from becoming a literal — D-20/D-66)**, `:329` (stale `V-59-14` description),
  `:330` (the ops-index H2 proposal), `:459`, **`:697` (OQ-5, the numbering recorded as an open question)**

### Validators and pipeline
- `scripts/validation/check-nav-hub-links.mjs` — `:7-8` (**no baseline, allowlist or ratchet**),
  `:121-127` (`githubSlug` — the `&` and ` / ` double-hyphen mechanism, D-11/D-62), `:142-143` and
  `:158-172` (the anchor set is the **union** of explicit `<a id>` values and heading slugs, D-12),
  `:288-290` (`resolveLinkTarget`, source-relative — D-27)
- `scripts/validation/check-phase-54.mjs` — `:23`/`:35` (`OV`, `WIN`, `PATCH_FILES` — the scoping that
  makes D-10 true), `:129` (`V-54-08`), `:173-177` (`V-54-11`), `:346-359` (**`V-54-21`, the live
  `[REQ, ROAD]` read with a negative assertion**), `:437-480` (`V-54-27`, corpus-wide over `docs/` **and**
  `.planning/`), `:494-509` (`V-54-29`)
- `scripts/validation/v1.20-milestone-audit.mjs` — `:574-579` (the four C11 fallback patterns), `:585`
  (live `walkMd('docs')` — the one audit that reaches these files)
- `scripts/validation/c17-eee-contract.mjs` — `:5-6` (enrolled iff `doc_id` + under `docs/` — D-44),
  `:523-537` (the walk); 13 assertions, incl. #12's 200-char blockquote cap (D-63)
- `scripts/validation/check-phase-49.mjs` — `:288-317` (`V-49-19` loads `_glossary.md`'s H3 term set —
  run after the D-06 edit)
- `scripts/validation/check-phase-59.mjs` — `:429-445` (`V-59-13`, **subset** check), `:446-473`
  (`V-59-14`, **frozen** `readAtV15Close`)
- `scripts/validation/check-phase-144.mjs` — the apex; `:65-69` (chains 54/59);
  `check-phase-143.mjs:78-98` (`V-143-CORPUSRUN`, how a dangling link reaches the apex)
- `scripts/pipeline/build-filename-map.mjs` `:4-5` (**`docs/_registry/RE-index.md`'s Title column is the
  sole source of truth** — D-23) and `:283`; `scripts/pipeline/build-publish-bundle.mjs` `:520-523` — the
  two canaries, counting different sets (all rows vs `Approved`-only), equal at 225 only because every row
  is Approved

### Edit targets
- `docs/operations/firmware-bios/00-overview.md` — new
- `docs/operations/firmware-bios/01-windows-dfci.md` — new
- `docs/_glossary.md` — **new terms + Alphabetical Index rows + a Version History row** (D-06, D-61..D-63)
- `.planning/REQUIREMENTS.md` — the SC#4 premise amendment (D-05), traceability rows, deferred entries

### Corpus cross-linked, never edited
- `docs/operations/patch-management/06-windows-driver-firmware-updates.md` — the updates-vs-configuration
  seam (D-42); `:429` carries a live BIOS/UEFI claim (D-19); ids `oem-catalog-firmware` (`:379`),
  `driver-update-reporting` (`:455`); the structural precedent (10 H2 / 8 anchors / 0 fences / 64 Source lines)
- `docs/operations/patch-management/01-windows-wufb-rings.md` — `#hotpatch` (`:119`),
  `#driver-firmware-policy` (`:170` — **in `01`, not `06`**, D-17); sealed by Phase 146
- `docs/admin-setup-apv1/01-hardware-hash-upload.md` — `RE-077`, past due; `## Path 1: OEM Delivery`
  (`:41`), `## Path 2: CSV Bulk Import` (`:57`), `## Path 3: PowerShell Script (Get-WindowsAutopilotInfo)`
  (`:103`); inbound link handed to 152 (D-44)
- `docs/lifecycle/01-hardware-hash.md` `:55-62` — **the `### Import Methods` table carrying the fourth,
  qualifying channel: Partner Center / CSP partner** (D-05)
- `docs/admin-setup-apv2/00-overview.md` `:31-32`, `04-corporate-identifiers.md` `:51`, `:61` — the APv2
  disqualifier (D-05) and the pre-existing `Surface Pro 9` device-name occurrence
- `docs/decision-trees/03-tpm-attestation.md` — `RE-210`, `audience: L1`, 66 days past due (D-45)
- `docs/reference/security-baseline-conflicts.md` — the BitLocker owner (D-41)
- `docs/error-codes/02-tpm-attestation.md`, `docs/l2-runbooks/03-tpm-attestation.md` — the other two TPM
  owners, and C1-5's prescribed cross-link targets (D-45, handed to 150 with the matrix column)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/operations/patch-management/06-windows-driver-firmware-updates.md` — the closest structural
  precedent: a patch-management sibling **outside `PATCH_FILES`**, `platform: Windows`, `audience: admin`,
  60-day cycle, 10 H2s, 8 own-line hand-authored anchors, no `doc_id`, no Version History, zero code
  fences, 64 standalone `**Source:**` lines
- `05-linux-update-delivery.md` (484 lines / 11 Source lines), `07-windows-autopatch.md` (435 / 24),
  `08-windows-app-updates.md` (424 / 23) — three more instances of the identical 10/8/0/0 shape
- `docs/_glossary.md` `:285` — the Phase-75 precedent for adding a term: *"added `### Entra ID SSO` term
  (Security section) and a reciprocal `> See also:` … **Alphabetical Index updated**"*
- `02-macos-update-enforcement.md:27` — the citation shape for a source with a missing date field (D-46e)

### Established Patterns
- Anchors are **hand-authored short `<a id>` values distinct from the heading slug**, one per H2 except
  `## Related Resources` and `## External References`; the checker unions them with heading slugs
- Evidence lines are a `>` blockquote plus a **standalone, line-start `**Source:**` paragraph** after the
  claim, one page per line
- Absences live under `## Unsupported and Anti-Feature Callouts` with **bold sub-labels**; no new
  `PITFALL-N` identifiers (that namespace is a per-milestone research ledger)
- Content phases author documents; registry rows, filename-map rows, canaries, ops-index rows and
  navigation are Phase 152's single atomic commit
- American spelling in every heading and every line of prose — H2s become slugs the link checker matches
  byte-for-byte
- `` ../../ `` relative links are well-precedented under `docs/operations/` (69 instances)

### Integration Points
- The two files cross-link each other and land in **one commit** (D-28/D-29)
- Five outbound links to existing files (D-26), all `[MEASURED]` live; **zero** links to Phase-150 targets
- The hand-authored anchor ids become the cross-link contract Phase 151's Recipe #5 consumes and cannot
  author for itself — `FEATURES.md:240` rates D-4 (which BIOS/firmware surface?) **Effectively
  irreversible**, and Phase 151 SC#2 requires one such decision point
- `docs/_glossary.md` gains entries that D-41 links to from the new overview — the only existing `docs/`
  file this phase edits

</code_context>

<specifics>
## Specific Ideas

The owner ruled three gray areas, and the through-line is the opposite of Phase 148's: **where 148 chose
scope discipline over local correctness, 149 chose evidential completeness over minimal scope.** All three
rulings grow the phase — two extra vendor fetches so SC#1 is writable rather than asserted (D-02); a fourth
registration channel plus an APv2 statement plus a requirement amendment rather than a literal reading of a
falsified `[MEASURED]` count (D-05); and discharging a roadmap-locked glossary flag now rather than
deferring it a third time (D-06). The common test the owner applied: **a Success Criterion that cannot be
sourced, or a gate premise that has been measured false, is not something a phase may ship around.**

The counterpart lesson from the review is the same one 148 recorded, and it recurred despite being
recorded: the draft's confidence was inversely correlated with its accuracy. Its two self-flagged risks
were its two best decisions. Its four most emphatic sentences were all defective. And the failure mode it
was explicitly built to avoid — requirement clauses carrying zero decisions — happened again, in the
phase's *first* Success Criterion. The instrument that caught it was not self-assessment but a
requirement-clause coverage matrix built by an agent whose only job was to read BIOS-01..BIOS-11 clause by
clause against the draft. **Run that matrix every phase; the draft cannot grade itself.**

One process finding worth carrying: the Referee overturned a Finder *and* the Adversary on the same item
(D-70) because both reasoned from a decision body without reading the section heading four lines above it.
Two independent agents sharing one wrong premise is not corroboration.

</specifics>

<deferred>
## Deferred Ideas

- **A standalone `docs/operations/firmware-bios/02-surface-uefi.md`** — `ARCHITECTURE.md:113` maps one;
  D-20 folds Surface into `01` because a separate file would carry zero requirement clauses and zero
  Success Criteria. Additive later at the cost of renumbering (D-21). Trigger: a requirement that gives
  Surface UEFI its own scope.
- **The full DFCI settings table and the Surface eligible-model / model-gated-settings tables** — bounded
  out by D-32 and D-35 (`REQUIREMENTS.md:164` bars per-model matrices; the rest is high-churn). Trigger:
  Phase 151's Recipe #5 or BIOS-12's matrix column needing setting-level detail the categories cannot
  supply.
- **SEMM's current status** — already parked at `REQUIREMENTS.md`'s `## Future Requirements` as
  `[UNVERIFIED]`, with *"No 'SEMM vs DFCI' routing table may ship until this resolves."* No v1.21 phase
  owns it (D-34).
- **The three `[UNVERIFIED]` recovery gaps** (Lenovo lost supervisor password, Lenovo lost certificate
  private key, HP Endorsement Key loss) — Phase 150's research flag, not this phase's.
- **`docs/operations/00-index.md:32`'s stale "4-platform comparison hub" description** — INT-04 scopes
  Phase 152 to *adding* rows, not correcting descriptions. Unowned by every phase in the milestone; carried
  from 148's deferred list, now compounded because Phase 152 takes that region to nine rows.
- **`ROADMAP.md:185`'s and `STATE.md:157`'s inaccurate greenfield/blast-radius statements** — D-06 makes
  the first false and D-19 makes the second imprecise. Recorded as accepted inconsistencies (D-68) rather
  than corrected, because no requirement owns roadmap prose. Trigger: the milestone-close audit.
- **`ROADMAP.md:187`'s and `STATE.md:564`'s "oldest source in the whole set" overclaim** — falsified by
  `STACK.md:770` (D-13). Same instrument as above.
- **`ARCHITECTURE.md:329`'s stale `V-59-14` "live read" description** — the read is frozen
  (`readAtV15Close`). A planner reading ARCHITECTURE re-derives the wrong answer. Research-ledger
  correction, not corpus.
- **`REQUIREMENTS.md:152`'s self-referential grep claim** — it asserts
  `grep -rn "_glossary-windows" .planning/REQUIREMENTS.md` returns zero hits, but the line contains the
  string, so the measured count is **1**. Same defect class as the planning-ledger citations already on
  the backlog.
- **The corpus-wide past-due population** — 217 of 271 files, parked at `REQUIREMENTS.md:139`.
  `admin-setup-apv1/01-hardware-hash-upload.md` (43+ days) and `decision-trees/03-tpm-attestation.md`
  (66+ days) are both in it, and this phase links into both (D-44, D-45).
- **CSP-partner Autopilot registration as a documented path** — `docs/lifecycle/01-hardware-hash.md:62`
  has a table row; nothing else in the Windows corpus covers it, and Learn names it as a *qualifying*
  DFCI channel. D-05 documents it as a channel; a fuller treatment belongs to an admin-setup phase.

</deferred>

---

*Phase: 149-Firmware/BIOS Domain — Overview, DFCI & Surface UEFI*
*Context gathered: 2026-08-24*
