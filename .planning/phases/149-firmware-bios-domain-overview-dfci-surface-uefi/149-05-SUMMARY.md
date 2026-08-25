---
phase: 149-firmware-bios-domain-overview-dfci-surface-uefi
plan: 05
subsystem: documentation
tags: [dfci, uefi, bios, retire, reuse, recover, surface, ordering-hazard, intune]

requires:
  - phase: 149-01
    provides: "docs/operations/firmware-bios/00-overview.md as the routing hub, and 01-windows-dfci.md founded with frontmatter, the platform-applicability blockquote and the two tail-section stubs"
  - phase: 149-03
    provides: "`## Prerequisites and Disqualifiers`, `## OEM Support` and `## Surface Eligibility` in 01-windows-dfci.md"
  - phase: 149-04
    provides: "`## The Settings Surface`, the three interaction traps, the virtualization-to-update-eligibility chain and `## Bricking and Irreversible Configuration`, whose closing pointer names the three lifecycle H2s this plan authors"
provides:
  - "`## Retiring a Device` — a three-step ordered runbook (unlock through the profile, wipe, delete the Autopilot record last) with the order stated as load-bearing and the consequence of reversing steps 1 and 3 written out"
  - "`## Reusing a Device` — the discriminator written rather than implied: reuse wipes the device but does NOT remove the Autopilot record, so registration and DFCI management both survive"
  - "`## Recovering a Device Locked in the Wrong Order` — the failure condition and the refresh-from-network route, both quoted first-party, with the over-delivery ground stated on the record"
  - "The Surface removal path, shipped under the developer's `ship-with-warning` ruling, with an ordering warning 10 lines above the delete-registration step carrying all three required clauses"
  - "`## Unsupported and Anti-Feature Callouts` — three documented first-party absences (no Disabled value for platform virtualization; TPM and Secure Boot absent from the eight enumerated categories as an enumeration fact; no Microsoft list names Dell, HP or Lenovo)"
  - "`## Related Resources` and `## External References` completed; External References reconciled against all seven inline evidence-line URLs"
  - "The phase gate sweep with measured output, and the Phase 150, Phase 152 and Phase 153 hand-forward contracts"
affects: [150, 151, 152, 153]

actuals:
  tokens: 3115
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "An ordering hazard that no validator can see is enforced by an executor-run adjacency check: a script asserts the warning line precedes both the delete-record step and the unlock step and sits within 10 lines of the former"
    - "A same-file forward pointer ships as prose, never as an `#anchor` link — the phase's only anchor-bearing cross-file link is the glossary one"
    - "An approximate count in a self-describing scope rule is re-measured at the closing plan and replaced with the exact figure plus its location list"
key-files:
  created: []
  modified:
    - "docs/operations/firmware-bios/01-windows-dfci.md — +161 lines, four new anchored H2s (`retiring-a-device`, `reusing-a-device`, `recovering-locked-device`, `unsupported-callouts`) and both tail sections completed; final state 12 H2 / 10 anchors"

key-decisions:
  - "The developer ruled `ship-with-warning` on the Surface removal path. Recorded verbatim below before any prose was written"
  - "The warning ships as a bold-labelled paragraph, not a blockquote — this corpus reserves blockquotes for verbatim first-party text, and the warning is the corpus's own voice"
  - "The retire section's forward pointer to the recovery section is prose, not `](#recovering-locked-device)`. The plan's own acceptance criterion bars every anchor-bearing link in this directory except the glossary Secure Boot one, so a same-file anchor link would have failed the phase's own gate"
  - "The warning was tightened after a first draft measured 12 lines from its opening line to the delete-registration step. The criterion reads 'within 10 lines'; the block was condensed to land at exactly 10 without dropping any of the three required clauses"
  - "Plan 04's 'about a dozen' setting-name count re-measured at this revision: exactly twelve distinct names, so the prose now states twelve. The location list was also stale inside its own phase — it named this section, the Surface section and the retire sequence, but the callouts section added a fourth site, and the sentence now names all four"
  - "Only the first two sentences of the source's retire paragraph ship quoted. Its third sentence contains 'automatically re-enrolling', which matches the phase's own barred-spelling grep `enrolling\\b` (D-59) — quoting it verbatim would have taken a mandatory prose negative off zero"
  - "The recovery section's two quotations are the failure condition and the refresh-from-network route from `configure-dfci-windows`; the Surface removal steps carry their own separate Source line for `surface-manage-dfci-guide`. No Source line spans two pages (D-56)"

patterns-established:
  - "Pattern: warning-before-steps — a hazardous vendor sequence is introduced by a sentence instructing the reader to read the warning first, then the warning, then the steps; the reader cannot reach step 2 without passing the warning"
  - "Pattern: executor-authored adjacency check — where no repository validator can see the property a one-way decision turns on, the executor writes and runs the check itself and records its output"

requirements-completed: [BIOS-11]

coverage:
  - id: D1
    description: "Retire and reuse ship as two distinct H2s with a written discriminator"
    requirement: "BIOS-11"
    verification:
      - kind: other
        ref: "grep -c '^<a id=\"retiring-a-device\"></a>' => 1; grep -c '^<a id=\"reusing-a-device\"></a>' => 1; the reuse section contains 'reuse wipes the device but does **not** remove the Autopilot record' and names retiring 3 times"
        status: pass
    human_judgment: false
  - id: D2
    description: "The retire sequence is stated in its correct order with the order presented as load-bearing"
    requirement: "BIOS-11"
    verification:
      - kind: other
        ref: "awk over the retire span | grep -E '^[0-9]+\\. ' => 3 steps, unlock first, delete Autopilot record last; prose reads 'the order is load-bearing rather than incidental'"
        status: pass
    human_judgment: false
  - id: D3
    description: "The Surface removal path ships with an adjacent ordering warning carrying all three required clauses"
    verification:
      - kind: other
        ref: "executor adjacency script: warning line 469, delete-registration step 479, unlock step 483 => distance 10, warning precedes both; all three clause greps True"
        status: pass
    human_judgment: false
  - id: D4
    description: "The recovery section ships with its over-delivery ground stated on the record"
    verification:
      - kind: other
        ref: "'No requirement clause and no success criterion for this domain's initial delivery covers a recovery runbook' followed by the two grounds"
        status: pass
    human_judgment: false
  - id: D5
    description: "Both files stand at their contracted H2 and anchor counts with zero fences and no version-history section"
    verification:
      - kind: other
        ref: "01: 12 H2 / 10 anchors; 00: 9 H2 / 7 anchors; grep -rc '^```' => 0 both; grep -rn '^## Version History' => 0"
        status: pass
    human_judgment: false
  - id: D6
    description: "The phase gate sweep is green, apex included"
    verification:
      - kind: other
        ref: "check-phase-144.mjs => 101 PASS, 0 FAIL, 0 SKIPPED, exit 0"
        status: pass
    human_judgment: false

duration: 1h 5m
completed: 2026-08-25
---

# Phase 149 Plan 05: Close the DFCI Guide — Lifecycle, Callouts, Tail Sections and Hand-Forwards Summary

The DFCI guide closes with the device lifecycle as three distinct sections — retire, reuse and
recover — the Surface removal path shipped under an explicit ordering warning, the callouts H2, both
tail sections reconciled against every evidence line in the file, and the three cross-phase contracts
recorded.

## The Checkpoint Ruling, Recorded Verbatim

**Task 0** was a `checkpoint:decision` rated one-way in the field: how does the Surface DFCI removal
path ship, given that its own step order deletes the Autopilot registration before the device is
unlocked?

The ruling, selected by the human at the orchestrator's gate on 2026-08-24:

> **ship-with-warning**

Attribution: the orchestrator's human gate, 2026-08-24. Recorded here before any prose was written.

What the ruling required, and what shipped against each clause:

| Ruling clause | Shipped |
|---|---|
| The Surface DFCI removal path DOES ship | Four ordered steps in the vendor's order under `## Recovering a Device Locked in the Wrong Order` |
| (a) the vendor order deletes the Autopilot registration BEFORE the device is unlocked | *"Its second step removes the registration and its fourth step is the unlock"* |
| (b) the default DFCI retire sequence is the INVERSE — unlock via the profile, then wipe, then delete the Autopilot record LAST | *"the exact inverse of the default retire sequence above, which unlocks through the profile, then wipes, then deletes the record last. That default stays the default for every DFCI fleet, Surface included."* |
| (c) the Surface order is NOT safe on a non-Surface DFCI fleet, because Surface's `Management > Configure > Refresh from Network` UEFI command is what makes it recoverable and the other eight supported OEMs do not have it | *"recoverable only because Surface's own UEFI menu carries the refresh-from-network command; the other eight supported manufacturers have no equivalent on record, so applying this order to a non-Surface DFCI fleet leaves the firmware locked beyond Intune's reach"* |
| The delete-record step and the unlock step never sit adjacent without the warning between them | Enforced by an executor-run adjacency check (below), because no validator in this repository can see ordering |
| Task 2's four Surface-specific acceptance criteria remain in force | All four measured PASS |
| 12 H2 / 10 anchors unaffected by the ruling | Final state 12 / 10 |

### The adjacency check, run by the executor

No repository validator can see a wrong ordering, so the check is the executor's. Run against the
committed file:

```
warning line [469] delete [479] unlock [483]
warning->delete distance: 10 PASS
warning precedes both steps: True
deletes-before-unlock True
not-safe-non-surface True
default-is-inverse True
```

A first draft of the warning measured 12 lines from its opening line to the delete-registration step.
It was condensed to exactly 10 without dropping any of the three clauses, then re-measured.

## Accomplishments

**Task 1 — retire and reuse as two distinct sections** (`b56c5cf1`)

`## Retiring a Device` ships a three-step ordered list — unlock through the DFCI profile, wipe or
retire in Intune, delete the Autopilot record last — with the order stated as load-bearing rather
than incidental and the reason given per step (each step removes an instrument the previous one
depended on). Two verbatim strings from `configure-dfci-windows` ship in one blockquote under one
evidence line. The consequence of reversing steps 1 and 3 is written out: once the record is gone,
Intune has no device left to address, so the profile that would unlock the firmware cannot reach it.

`## Reusing a Device` ships the vendor's own reuse paragraph verbatim and then states the
discriminator in the corpus's voice: reuse wipes the device but does **not** remove the Autopilot
record, so the registration survives the wipe and DFCI management survives with it; retiring does the
opposite on both counts. The section closes with the test a reader can apply — the presence or
absence of the Autopilot record at the end decides which sequence was actually performed.

**Task 2 — the recovery section and the Surface removal path** (`cf9db13b`)

`## Recovering a Device Locked in the Wrong Order` opens on the situation the previous two sections
exist to prevent, quotes the failure condition and the refresh-from-network route from
`configure-dfci-windows`, and warns that recovery restores access to the menus but not the settings —
a recovered device carries the same firmware configuration it was locked with, and the refresh is a
physical operation at the device rather than a console action.

The Surface removal path then ships per the ruling: an introduction telling the reader to read the
warning before the steps, the warning, the four vendor steps as an ordered list, and a Source line
for the Surface guide alone. The over-delivery ground is stated on the record in the same shape the
Surface section states its bound.

**Task 3 — the close** (`f1d5113e`)

`## Unsupported and Anti-Feature Callouts` ships byte-identical to the four `patch-management/05-08`
instances, carrying three documented first-party absences: platform virtualization has no Disabled
value so DFCI can switch it on and structurally cannot switch it off; neither TPM nor Secure Boot
appears among the eight enumerated categories, written as an enumeration fact with the Source line on
the enumeration (D-43) and with an explicit instruction not to read the absence as a first-party
claim; and no Microsoft list of DFCI manufacturers names Dell, HP or Lenovo, so DFCI is unavailable
there rather than declined. The category conflict loop and the boot-and-port trap stayed under the
settings surface — they are user-caused misconfigurations, not absences (D-36).

Both tail sections completed. `## External References` was three URLs short of the file's own
citations at plan start; it now reconciles exactly, 7 inline evidence-line URLs to 7 listed entries,
verified by a set-difference script rather than by eye.

## Measured Output

Every figure below was produced by running the command at the commit it describes. None is
transcribed from the plan.

| Gate | Measured result |
|---|---|
| `node scripts/validation/check-phase-144.mjs` (apex) | **101 PASS, 0 FAIL, 0 SKIPPED** (total checks: 101), exit 0 |
| `node scripts/validation/check-nav-hub-links.mjs` | 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total |
| `node scripts/validation/check-phase-49.mjs` | 22 passed, 0 failed, 0 skipped |
| `node scripts/validation/c17-eee-contract.mjs` | 234 files checked, 0 with violations, 0 total violations (#1–#13 all 0) |
| `node scripts/validation/check-phase-54.mjs` | 32 passed, 0 failed, 0 skipped |
| `node scripts/validation/v1.20-milestone-audit.mjs` | 16 passed, 0 failed, 0 skipped |

**Structure (D-24 contract):**

| File | H2 | Anchors |
|---|---|---|
| `docs/operations/firmware-bios/00-overview.md` | 9 | 7 (untouched by this plan) |
| `docs/operations/firmware-bios/01-windows-dfci.md` | 12 | 10 |

`## Related Resources` and `## External References` are unanchored in both files (verified by
inspecting the line preceding each heading — blank in all four cases).

**Prose negatives, all measured across `docs/operations/firmware-bios/` at final HEAD:**

| Negative | Count |
|---|---|
| `SEMM` | 0 |
| `the six($\|[^-])\|most business OEMs` | 0 |
| British spelling set (`enrolment\|enrols\|enrolling\b\|licence\|behaviour\|organisation\|programme\|labelled\|honour\|catalogue\|recognise\|analyse`) | 0 |
| Code fences (`^```) | 0 in both files |
| `^## Version History` | 0 |
| `System Center\|SCCM\|Autopatch rings` | 0 |
| `^> **Platform:**` | 0 |
| Links to `02-`/`03-`/`04-` | 0 |
| `DFCI (cannot\|can't\|does not\|doesn't) (set\|configure\|manage) (TPM\|Secure Boot)` | 0 |
| Anchor-bearing links other than `_glossary.md#secure-boot` | 0 |

**Untouched surfaces:** `git status --porcelain docs/_registry/ docs/index.md
docs/operations/00-index.md scripts/` returns 0 lines. No registry row, filename-map row, canary
bump, ops-index row, `docs/index.md` entry or validator script was written.

**Re-measured counts:**

- Distinct DFCI setting display names in `01-windows-dfci.md`: **12** — CPU and IO virtualization,
  Boot from network adapters, Windows Platform Binary Table (WPBT), NFC, SD card, Microphones and
  speakers, Radios (Bluetooth, Wi-Fi, NFC, etc.), Microphones, Wi-Fi, Boot from external media
  (USB, SD), USB type A, and the twelfth added by this plan's retire runbook, Allow local user to
  change UEFI (BIOS) settings. Plan 04 predicted the twelfth and it landed; the prose now states
  twelve rather than "about a dozen".
- Corpus term counts, with the metric trap named (D-68): `DFCI` = **142 occurrences across 3 files**
  under `docs/`; `UEFI` = **32 occurrences across 5 files**. An occurrence count (`grep -o | wc -l`)
  and a line count (`grep -c`) are not comparable quantities; both figures above are occurrence
  counts, and any later comparison must use the same instrument.

## Source Fidelity

Both pages quoted by this plan were re-fetched as raw bytes this session with a browser User-Agent,
both HTTP 200, tag-stripped and literal-grepped before anything shipped inside quotation marks:

| Page | Fetch | `ms.date` / `updated_at` from `<meta>` |
|---|---|---|
| `configure-dfci-windows` | HTTP 200, 62201 bytes | 2026-06-23 / 2026-07-01 |
| `surface-manage-dfci-guide` | HTTP 200, 70053 bytes | 2026-07-14 / 2026-07-14 |

Every shipped quotation grepped `1` against its tag-stripped capture: the two retire sentences, the
reuse paragraph (verified against the tagless HTML, since the source paragraph carries inline link
and bold markup), the two recovery sentences, and the literal
`Management > Configure > Refresh from Network`. Nothing was carried forward from the research file
inside quotation marks (D-37, D-52).

## Hand-Forward Contract — To Phase 150 (Per-OEM BIOS Guides & Capability Matrix)

**1. The complete hand-authored anchor-id contract of both files** (final, measured at this HEAD):

- `docs/operations/firmware-bios/00-overview.md` — `who-holds-the-secret`, `native-bios-surfaces`,
  `choosing-a-path`, `domain-boundary`, `updates-vs-configuration`, `before-you-start`,
  `unsupported-callouts`. Note that `updates-vs-configuration` sits above the H2
  `## Where This Domain Fits` — the id and the heading text deliberately differ, and the id is the
  contract.
- `docs/operations/firmware-bios/01-windows-dfci.md` — `what-dfci-is`, `dfci-prerequisites`,
  `dfci-oem-support`, `surface-eligibility`, `dfci-settings-surface`, `bricking-irreversible`,
  `retiring-a-device`, `reusing-a-device`, `recovering-locked-device`, `unsupported-callouts`.

These are hand-authored short ids, not heading slugs. Phase 151's recipe consumes them; do not
recompute them from the headings.

**2. The fetch record.** All seven pages were fetched as raw bytes this phase with
`curl -A "Mozilla/5.0 ..."`, the method `PER-OEM-BIOS-GAP.md:31-40` calls the single most important
methodological finding in the pass. Items 150 owns and this phase sourced:

- **The BIOS-configuration page** (`configure-bios-windows`, `ms.date` 2024-06-06 / `updated_at`
  2026-07-01) carries the Graph password-details endpoint
  `https://graph.microsoft.com/beta/deviceManagement/hardwarePasswordDetails` — **beta**, and the
  word beta is load-bearing; the subscription-end trap (if the tenant's Intune subscription ends
  there is no way to read or retrieve BIOS passwords and the only option is to contact the OEM); the
  no-existing-BIOS-password prerequisite; and the Dell-only strings, which have **two** first-party
  forms on the one page, so a re-fetch finding one and not the other is a location difference, not a
  page change.
- **Both role-based access-control retrieval paths** and the minimum role required to author the
  policy (`Policy and Profile manager`).
- **The HP Connect User Guide** (PDF, 57 pages, Version 1.2.0, September 27, 2022) — passwords are
  managed by HP Connect and stored in a cloud vault; deactivation starts a 30-day countdown after
  which all policies and secrets are permanently deleted.
- **The Lenovo CDRT post** (November 4, 2025) — the Azure Key Vault mechanism, quoted; and the
  measured absence of `only vendor`, `RBAC`, `logging` and `rotation` from both fetched Lenovo pages.
  Bonus for BIOS-08: ThinkCentre desktops are not currently supported due to an incompatible WMI
  BIOS Interface implementation.

**3. The `02-` / `03-` / `04-` numbering** (D-21): `02-dell-*`, `03-hp-*`, `04-lenovo-*`.

**4. The overview's outbound links to the per-OEM guides are 150's to add, not this phase's** (D-26).
This phase wrote zero links to `02-`, `03-` or `04-` targets and routes by naming each vendor in
prose and in a table. INT-04 is scoped to `docs/index.md` and `docs/operations/00-index.md` only, so
Phase 152 will not pick these up by default either — they are 150's.

**5. Write `and`, never an ampersand,** in every H1 and H2 (D-23). Check
`docs/_registry/RE-index.md` for Title collisions, not `filename-map.md`, whose header carries no
Title column.

**6. The matrix column naming which operating-system features are gated by the virtualization
setting** (D-14). This phase established the causal direction: DFCI can switch platform
virtualization on and structurally cannot switch it off, so the exposure never lives in a DFCI
profile.

**7. The two vendor glossary terms deliberately not added here** (D-64): `Sure Admin` and
`Think BIOS Config`. The glossary is touched once per phase.

**8. Falsification clause.** If 150's re-fetch corrects a custody position, **150 owns the correction
to this phase's overview**, and 150's context must diff against this phase's shipped claims. The risk
is live, not theoretical: HP's portal returned a 403 before the browser User-Agent method was
applied, and the Lenovo comparative claim ships as this milestone's own inference rather than as a
Lenovo statement.

## Hand-Forward Contract — To Phase 152 (Integration, Registry & Navigation-Last Close)

**1. Registry rows and filename-map rows for both new files, with no document identifier.**

**2. Ops-index rows and the Firmware H2** in `docs/operations/00-index.md`, written with `and`, never
an ampersand.

**3. The `docs/index.md` Operations entry** for the new domain.

**4. The inbound link from `docs/admin-setup-apv1/01-hardware-hash-upload.md` back to this file's
prerequisites section.** This phase wrote the outbound direction only. INT-04 is scoped to two index
files and does not reach that file, so without this named hand-off the inbound link is nobody's job
(D-44). This plan did not edit that file.

**5. Hand forward the rule, never a number.** INT-03 requires the canary target be computed from the
registry after the rows land; `ARCHITECTURE.md:293` bars its own estimate from becoming a literal.
Do not carry any count from this summary into the canary.

**Two live risks flagged, not guessed:**

- **Zero of the existing registry rows is an `operations/` path, and the registry parser keys on the
  document identifier** (`| RE-NNN |` rows). A row with no identifier is unprecedented across all
  existing rows. Phase 152's own research flag already mandates the scratch-row publish-bundle probe;
  run it before committing the rows, and remember there are **two** registry canaries in this
  repository, not one — `build-publish-bundle.mjs` carries its own Approved-row canary.
- **The barred literal heading INT-04 names for Firmware is undefined** in the roadmap, the
  requirements document and the state file. Flag it; do not guess. The one barred literal heading on
  record is the patch-management one.

## Hand-Forward Contract — To Phase 153 (Harness Close)

A needle-spec for `check-phase-149.mjs`. Content phases hand off a needle-spec and never author
validators; `grep -rln "firmware-bios" scripts/` returns **0** at this HEAD, so no validator pins any
name in this directory yet.

Suggested needles:

1. Both files exist at `docs/operations/firmware-bios/00-overview.md` and
   `docs/operations/firmware-bios/01-windows-dfci.md`.
2. All nine OEM names are present in `01`: Acer, Asus, Dynabook, Fujitsu, Microsoft Surface,
   Panasonic, VAIO, Samsung, NEC.
3. The pending sentence is present in `01`.
4. The barred phrasings are absent across the directory.
5. Both bricking quotes are present **in their assigned files** and neither is duplicated across
   them: the DFCI lock-beyond-repair warning in `01`, the Dell-template boot-and-BitLocker warning in
   `00`.
6. The four registration channels are named in `01`.
7. The anchor counts hold at **7** for `00-overview.md` and **10** for `01-windows-dfci.md`.
8. Additionally recommended by this plan, since no existing gate can see it: the ordering warning line
   precedes both the delete-registration step and the `Management > Configure > Refresh from Network`
   step in `01`. This is the phase's one-way property, and today it is guarded only by an
   executor-run check that does not survive into CI.

## Accepted Inconsistencies (D-68)

Recorded so a verifier and code review do not surface them as new defects:

- `ROADMAP.md:185`'s *"none in the existing corpus"* blast-radius claim is now inaccurate, because
  D-06 edits `docs/_glossary.md`.
- `STATE.md:157`'s greenfield constraint is imprecise (D-19).
- `docs/operations/00-index.md:32`'s *"4-platform comparison hub"* stays stale and unowned.
- `ARCHITECTURE.md:329` still calls `V-59-14` a live read when it is `readAtV15Close`.
- Execution crossed midnight UTC between the content commits and this summary. Per D-69 both files
  keep `last_verified: 2026-08-24`, the date of the phase's first commit, and are not restamped.

## Deviations from Plan

**1. [Rule 1 - Bug] The plan's own prose would have shipped a link its own acceptance criterion bars**

- **Found during:** Task 1
- **Issue:** The retire section's forward pointer was first authored as
  `[Recovering a Device Locked in the Wrong Order](#recovering-locked-device)`. Task 3's acceptance
  criterion requires `grep -rnE '\]\([^)]*#' docs/operations/firmware-bios/ | grep -v
  '_glossary.md#secure-boot'` to return nothing — which bars same-file anchor links too, not only
  cross-file ones.
- **Fix:** The pointer ships as prose naming the next section. Caught before the task-1 commit.
- **Files modified:** `docs/operations/firmware-bios/01-windows-dfci.md`
- **Verification:** the anchor-link grep returns 0 at final HEAD.
- **Commit:** `b56c5cf1`

**2. [Rule 1 - Bug] A verbatim quotation would have broken the phase's barred-spelling grep**

- **Found during:** Task 1
- **Issue:** The source's retire paragraph ends *"...prevents the device from automatically
  re-enrolling when it reboots."* The phase's mandatory American-spelling grep includes
  `enrolling\b`, which that string matches; shipping the full paragraph verbatim would have taken a
  required prose negative off zero.
- **Fix:** Only the first two sentences of that paragraph ship quoted — a contiguous verbatim prefix,
  grepped `1` against the live capture. The dropped clause's meaning ships as the corpus's own prose
  in step 3 of the runbook (*"what stops the device returning to management on its next reboot"*).
- **Files modified:** `docs/operations/firmware-bios/01-windows-dfci.md`
- **Verification:** British-spelling grep returns 0 across the directory.
- **Commit:** `b56c5cf1`

**3. [Rule 1 - Bug] The first warning draft missed the adjacency criterion by two lines**

- **Found during:** Task 2
- **Issue:** The executor-run adjacency check measured 12 lines from the warning's opening line to
  the delete-registration step; the criterion is 10.
- **Fix:** The warning was condensed to exactly 10 lines of separation with all three required
  clauses re-verified by grep afterward.
- **Files modified:** `docs/operations/firmware-bios/01-windows-dfci.md`
- **Verification:** adjacency script output recorded above.
- **Commit:** `cf9db13b`

**4. [Rule 2 - Missing critical] Plan 04's setting-name location list went stale inside its own phase**

- **Found during:** Task 3
- **Issue:** The ship-or-route rule's honest-consequence sentence named three sites where setting
  names appear. The callouts section this plan added is a fourth, and the count moved from "about a
  dozen" to a measurable twelve.
- **Fix:** The sentence now states twelve, marks the figure as counted at this revision, and names
  all four sites.
- **Files modified:** `docs/operations/firmware-bios/01-windows-dfci.md`
- **Verification:** 12 distinct names confirmed by an explicit membership script.
- **Commit:** `f1d5113e`

**Total deviations:** 4 auto-fixed (3 Rule 1, 1 Rule 2). **Impact:** none on scope; all four were
caught before or during the commit that introduced the affected prose.

## Authentication Gates

None.

## Issues Encountered

None.

## Known Stubs

None. Every section this plan authored ships complete, sourced content.

## Threat Flags

None. This plan authored static Markdown with no application code, no authentication surface, no user
input handling and no data storage. T-149-25 (the retire/removal ordering, rated `high`, disposed
`mitigate`) is mitigated as planned: the blocking checkpoint forced an explicit human ruling, and the
ordering warning is verified by the executor-run adjacency check recorded above. T-149-27
(cross-phase contract provenance) is mitigated by the three labelled hand-forward sections above.

## Next Phase Readiness

Phase 149's content work is complete. Both files stand at their contracted structure, the apex is
green at 101/0/0, and the Phase 150, 152 and 153 contracts are on the record. Ready for phase
verification.

## Self-Check: PASSED

- `docs/operations/firmware-bios/01-windows-dfci.md` exists on disk: FOUND
- `docs/operations/firmware-bios/00-overview.md` exists on disk: FOUND
- Commit `b56c5cf1` (task 1): FOUND
- Commit `cf9db13b` (task 2): FOUND
- Commit `f1d5113e` (task 3): FOUND
- All task acceptance criteria re-run at final HEAD: PASS
- Plan-level verification block re-run at final HEAD: PASS (apex 101/0/0; nav-hub 0/0; check-phase-54
  32/0; milestone audit 16/0; C17 234 files/0 violations; check-phase-49 22/0)
