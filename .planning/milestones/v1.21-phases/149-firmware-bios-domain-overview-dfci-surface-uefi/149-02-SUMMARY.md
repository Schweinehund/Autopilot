---
phase: 149-firmware-bios-domain-overview-dfci-surface-uefi
plan: 02
subsystem: docs
tags: [glossary, dfci, bios, uefi, terminology, requirements-ledger, premise-amendment]

requires:
  - phase: 149-firmware-bios-domain-overview-dfci-surface-uefi
    provides: "149-01 established the corpus voice for DFCI's certificate trust chain, per-setting reporting and reimage survival in docs/operations/firmware-bios/01-windows-dfci.md; the glossary definitions restate that voice rather than inventing a second one"
provides:
  - "docs/_glossary.md defines the milestone's four firmware/BIOS terms — DFCI, UEFI CSP, BIOS password, BIOS configuration and other settings — under the existing ## Hardware H2"
  - "Four Alphabetical Index entries in alphabetical position, the index still one physical line"
  - "One ## Version History row naming Phase 149, the four terms, the section and the index update"
  - "A reciprocal > See also: from DFCI to #secure-boot and #uefi-csp, reconciling the new terms against the existing ### Secure Boot entry (D-61)"
  - "STATE.md:327's roadmap-LOCKED 'which glossary receives the new terminology' flag DISCHARGED at Phase 149 after two prior deferrals"
  - ".planning/REQUIREMENTS.md carries the [AMENDED 2026-08-24] note retiring BIOS-04's and ROADMAP SC#4's falsified three-registration-path premise"
affects: [150-per-oem-bios-guides, 151-recipes, 152-registry-nav-wiring, 153-harness]

actuals:
  tokens: 3682
  tasks: 3
  commits: 2

tech-stack:
  added: []
  patterns:
    - "Glossary additive edit = four coordinated writes in one commit: the H3 entries, one Alphabetical Index entry per term inserted in alphabetical position on the single physical line, one Version History row at the top of the data rows, and front matter left byte-unchanged"
    - "A glossary see-also blockquote must be a single non-adjacent `>` line: C17 #12 joins CONSECUTIVE `>` lines with a space and caps the joined span at 200 chars after stripping the `> ` prefix"
    - "A wave-sibling's files are never link targets from a file this plan edits — the outbound direction would dangle under one commit ordering; only inbound links to anchors that exist at HEAD are safe (D-28)"
    - "A falsified requirement premise is amended in place with a bracketed **[AMENDED <date>]** marker on the requirement's own bullet, matching the file's existing **[OWNER-RULED]** / **[SUPERSEDED by]** marker convention, and the downstream ROADMAP Success Criterion is NAMED rather than edited"

key-files:
  created: []
  modified:
    - docs/_glossary.md
    - .planning/REQUIREMENTS.md

key-decisions:
  - "## Hardware, not ## Security, receives all four terms — every one names a firmware surface or a configuration object rather than a security control, and a single insertion point keeps the diff to one contiguous block. D-61 left this to discretion; ### Secure Boot stays where it is under ## Security and its body is not rewritten."
  - "The DFCI definition is written in the corpus's own voice with zero quotation marks — the certificate-trust-chain / per-setting-reporting / survives-reimage triad is the shipped wording of docs/operations/firmware-bios/01-windows-dfci.md, not a quotation of the research ledger's STACK.md:599 sentence (D-37, D-52). That ledger sentence also contains 'auto-enrols', a British form D-59 bars."
  - "The see-also uses `--` rather than an em dash so the physical line measures 180 BYTES, not 180 characters — C17 #12's cap is length-based and awk's `length` is byte-based on this host, so a multi-byte dash narrows the real margin invisibly."
  - "BIOS-02 and BIOS-04 were NOT flipped to Complete: `requirements.ready-ids` returned 0/2 because sibling plans 03/04/05 in this phase also declare them and have no SUMMARY yet (#2388's shared-ID gate). Correct behavior, recorded so it is not read as an omission."
  - "The ROADMAP Success Criterion 4 text is deliberately left unedited — D-05 scopes the amendment to .planning/REQUIREMENTS.md, and `git diff .planning/ROADMAP.md` shows no Success Criterion change."

patterns-established:
  - "Discharging a roadmap-LOCKED discuss-phase flag: name the STATE.md coordinate that locked it, name the phases that deferred it, record the disposition and its ground in the SUMMARY, and record the reversed deferral grounds so no later phase re-imports them"

requirements-completed: []

coverage:
  - id: D1
    description: "Four new terms exist as plain `### ` H3 entries under the existing `## Hardware` H2, with plain GitHub slugs and no {#id} override"
    requirement: "BIOS-02"
    verification:
      - kind: other
        ref: "grep -c on all four exact `^### <heading>$` literals returns 1 each; `awk '/^## Hardware$/,/^## Network$/' | grep -cE` on the four returns 4; `grep -c '{#'` returns 0"
        status: pass
    human_judgment: false
  - id: D2
    description: "No new heading contains an ampersand or a spaced slash (either produces a double hyphen in the slug)"
    verification:
      - kind: other
        ref: "grep -nE '^### .*( / |&)' docs/_glossary.md returns nothing (empty)"
        status: pass
    human_judgment: false
  - id: D3
    description: "Four Alphabetical Index entries inserted in alphabetical position, index still exactly one physical line"
    verification:
      - kind: other
        ref: "grep -c on all four `[Term](#anchor)` literals returns >=1 each; `awk '/^## Alphabetical Index$/{f=1;next} f&&NF{print;exit}' | wc -l` returns 1"
        status: pass
    human_judgment: false
  - id: D4
    description: "Exactly one new Version History row, naming Phase 149, the four terms, the section and the index update"
    verification:
      - kind: other
        ref: "git diff docs/_glossary.md | grep -c '^+| 20' returns 1"
        status: pass
    human_judgment: false
  - id: D5
    description: "Front matter byte-unchanged — the 90-day cycle (last_verified 2026-06-29 / review_by 2026-09-27) is not 'corrected' to the milestone's 60"
    verification:
      - kind: other
        ref: "git diff docs/_glossary.md | grep -E '^[-+](last_verified|review_by|doc_id|status):' returns nothing"
        status: pass
    human_judgment: false
  - id: D6
    description: "Reciprocal see-also from DFCI to #secure-boot and #uefi-csp, at most 200 chars, and no glossary entry links to docs/operations/firmware-bios/"
    verification:
      - kind: other
        ref: "the `> See also:` line immediately following the DFCI body contains (#secure-boot) and measures 180 bytes; grep -c 'operations/firmware-bios' docs/_glossary.md returns 0"
        status: pass
    human_judgment: false
  - id: D7
    description: "BIOS-04's falsified count amended on the record with four channels, the qualifying gate and the APv2 case, and ROADMAP SC#4 named but not edited"
    requirement: "BIOS-04"
    verification:
      - kind: other
        ref: "grep -c 'AMENDED' = 1 (on the BIOS-04 bullet); Partner Center / OEM direct registration / Get-WindowsAutopilotInfo all present; docs/lifecycle/01-hardware-hash.md and docs/admin-setup-apv2/00-overview.md cited by full relative path; 'OEM **or a Microsoft CSP partner**' present; 'ROADMAP Phase-149 **Success Criterion 4**' present; `git diff .planning/ROADMAP.md` empty"
        status: pass
    human_judgment: true
    rationale: "The greps prove every required literal is present and that the ROADMAP is untouched. Whether the amendment prose actually retires the premise for a future verifier grading SC#4 — rather than merely sitting next to it — is a judgment no grep can settle."
  - id: D8
    description: "The negative literal check-phase-54 validator 21 live-reads is not introduced"
    verification:
      - kind: other
        ref: "grep -c '05-compliance-policy.md' .planning/REQUIREMENTS.md returns 0; check-phase-54 32 passed, 0 failed"
        status: pass
    human_judgment: false
  - id: D9
    description: "Every binding gate green after both commits, plus the apex"
    verification:
      - kind: other
        ref: "check-phase-49 22/0/0; check-phase-54 32/0/0; c17-eee-contract 234 files 0 violations all 13 assertions 0; check-phase-144 101 PASS 0 FAIL 0 SKIPPED; check-nav-hub-links 0/0/0; v1.20-milestone-audit 16/0/0"
        status: pass
    human_judgment: false

duration: 4 min
completed: 2026-08-24
status: complete
---

# Phase 149 Plan 02: Glossary Terminology and the SC#4 Premise Amendment Summary

**The roadmap-LOCKED glossary flag discharged after two deferrals — DFCI, UEFI CSP, BIOS password and BIOS configuration and other settings added under `## Hardware` with index rows, a version-history row and a reciprocal see-also to Secure Boot — plus BIOS-04's falsified three-registration-path count amended on the record with all four channels, the OEM-or-CSP-partner gate and the APv2 no-registration case.**

## Performance

- **Duration:** 4 min
- **Started:** 2026-08-25T02:49:36Z
- **Completed:** 2026-08-25T02:53:45Z
- **Tasks:** 3
- **Files modified:** 2

## Accomplishments

- **Four terms landed under `## Hardware`.** `### BIOS configuration and other settings` (the Dell-only Templates profile type, `.cctk`, 2 MB limit, disjoint from DFCI), `### BIOS password` (custody as the routing discriminator), `### Device Firmware Configuration Interface (DFCI)` (the firmware layer below the OS, certificate trust chain, per-setting reporting, reimage survival, and the OEM-or-CSP-partner registration gate), `### UEFI CSP` (the configuration service provider DFCI settings use). All four slugs are plain GitHub slugs; zero `{#id}` overrides in the file.
- **Index, history and reciprocity, all in one commit.** Four `[Term](#anchor)` entries in alphabetical position on the single physical `## Alphabetical Index` line; one `## Version History` row at the top of the data rows in the file's `| Date | Change | Author |` shape with author `--`; one `> See also:` from the DFCI entry to `[Secure Boot](#secure-boot)` and `[UEFI CSP](#uefi-csp)` — D-61's reconciliation against the two existing entries, with `### Secure Boot`'s body left untouched.
- **BIOS-04 amended, not worked around.** The `**[AMENDED 2026-08-24]**` note on the BIOS-04 bullet names the four `### Import Methods` rows at `docs/lifecycle/01-hardware-hash.md`, states the eligibility gate as the first-party source states it (an OEM **or a Microsoft CSP partner** registration qualifies; both manual channels disqualify), names the APv2 no-registration case at `docs/admin-setup-apv2/00-overview.md`, and names ROADMAP Phase-149 Success Criterion 4 as carrying the same retired count. The ROADMAP text itself is untouched.
- **Two deferred entries filed** in `## Future Requirements`: CSP-partner Autopilot registration as a documented admin-setup path, and a standalone Surface UEFI document (D-20 folds it into `01-windows-dfci.md` for now).

## Task Commits

1. **Task 1: Add the four firmware terms to the glossary** — `8e5070d9` (docs)
2. **Task 2: File the registration-path premise amendment in REQUIREMENTS.md** — `5dc088f5` (docs)
3. **Task 3: Gate sweep for the glossary and planning-ledger edits** — no commit. Every prose negative returned zero on first run and every gate was already green, so there was nothing to fix. Its deliverable is the measured record below.

## Files Modified

- `docs/_glossary.md` — +20 / −1 lines. Four `### ` entries appended to the end of the `## Hardware` section (which now holds 14 H3s, up from 10), the `## Alphabetical Index` line grown from 1,323 to 1,561 bytes and still one physical line, one Version History row. Front matter byte-unchanged. File remains LF (`git ls-files --eol` → `w/lf`); the `core.autocrlf=true` warning git prints on every write to this repo is cosmetic and the diff carries no line-ending churn (20 insertions, 1 deletion, not 305).
- `.planning/REQUIREMENTS.md` — the `**[AMENDED 2026-08-24]**` clause appended to the BIOS-04 bullet, and two entries added to `## Future Requirements`. No checkbox flipped; no traceability row added (see deviation 2).

## must_haves — per-truth disposition

| # | Truth | How satisfied |
|---|---|---|
| 1 | Four new terms as `### ` H3 entries under one existing topical H2 [D-06, D-61] | All four are contiguous at the end of `## Hardware` (`:109`), between it and `## Network`. `grep -c '^### <literal>$'` returns **1** for each of the four; `awk '/^## Hardware$/,/^## Network$/' \| grep -cE` on the four alternatives returns **4** |
| 2 | Matching `[Term](#anchor)` entry per term in alphabetical position on the single-line index [D-63] | `[BIOS configuration and other settings]` and `[BIOS password]` between `[Autopilot Reset]` and `[BootstrapperAgent]`; `[Device Firmware Configuration Interface (DFCI)]` between `[Corporate identifiers]` and `[Device phase]`; `[UEFI CSP]` between `[TPM attestation]` and `[User phase]`. `awk '/^## Alphabetical Index$/{f=1;next} f&&NF{print;exit}' \| wc -l` returns **1** |
| 3 | Exactly one new `## Version History` row naming Phase 149, the terms, the section, the index update [D-63] | `git diff docs/_glossary.md \| grep -c '^+\| 20'` returns **1**. Row: `\| 2026-08-24 \| Phase 149 (BIOS-02 / BIOS-04): added ... terms (Hardware section) with a reciprocal \`> See also:\` from DFCI to Secure Boot and UEFI CSP; Alphabetical Index updated \| -- \|` |
| 4 | Front matter unchanged — 90-day cycle preserved [D-63] | `git diff docs/_glossary.md \| grep -E '^[-+](last_verified\|review_by\|doc_id\|status):'` returns **nothing**. `last_verified: 2026-06-29` / `review_by: 2026-09-27` stand |
| 5 | Plain GitHub slugs, no `{#id}`, no ampersand, no spaced slash [D-11, D-62] | `grep -c '{#' docs/_glossary.md` returns **0** (whole file). `grep -nE '^### .*( / \|&)'` returns **nothing**. Slugs: `bios-configuration-and-other-settings`, `bios-password`, `device-firmware-configuration-interface-dfci`, `uefi-csp` — each resolved by `check-nav-hub-links` (0 unresolved anchors) |
| 6 | REQUIREMENTS.md records the one-file measurement, the fourth channel with its corpus coordinate, and the APv2 case [SC#4, BIOS-04, D-05] | The amendment states the count "was measured against one corpus file only and is falsified by two others"; names **Partner Center** with its coordinate `docs/lifecycle/01-hardware-hash.md`'s `### Import Methods` table and its *Who Initiates* cell reading CSP partner; and names the APv2 case citing `docs/admin-setup-apv2/00-overview.md` (APv1 registration must be removed) and `04-corporate-identifiers.md` (manufacturer/model/serial CSV) |
| 7 | The eligibility gate stated as the first-party source states it [BIOS-04, D-05] | "requires external attestation of the device's commercial acquisition through an OEM **or a Microsoft CSP partner** registration to Windows Autopilot — so **two** channels qualify ... and the **two** manual channels disqualify ... rather than one qualifying against two disqualifying". Written as prose in the ledger's own voice, **outside quotation marks**, so no first-party attribution can be misread as a verbatim capture |
| 8 | `check-phase-49.mjs` exits 0 after the glossary edit [D-63] | **22 passed, 0 failed, 0 skipped**, exit 0. `V-49-19` loads this file's H3 term set for the Linux-glossary collision audit; the four new terms collide with nothing |
| 9 | `c17-eee-contract.mjs` exits 0 with zero violations [D-63] | **234 files checked, 0 with violations, 0 total violations**; all 13 assertion counters at 0, including `#12=0`. The new `> See also:` measures **180 bytes** against the 200 cap and is a standalone blockquote, not adjacent to another `>` line (assertion 12 joins consecutive `>` lines before measuring — verified at `c17-eee-contract.mjs:391-408`) |

## Measured gate results

Run at HEAD `5dc088f5` after both commits. Counts measured this session, never transcribed (D-19):

| Gate | Result |
|---|---|
| `node scripts/validation/check-phase-144.mjs` (**the apex**) | **101 PASS, 0 FAIL, 0 SKIPPED (total checks: 101)** — exit 0 |
| `node scripts/validation/check-phase-49.mjs` | **22 passed, 0 failed, 0 skipped** — exit 0 |
| `node scripts/validation/check-phase-54.mjs` | **32 passed, 0 failed, 0 skipped** — exit 0 (validators 21 and 27 both live-read `.planning/REQUIREMENTS.md`) |
| `node scripts/validation/c17-eee-contract.mjs` | **234 files checked, 0 with violations, 0 total violations**; `#1=0 #2=0 #3=0 #4=0 #5=0 #6=0 #7=0 #8=0 #9=0 #10=0 #11=0 #12=0 #13=0` — exit 0 |
| `node scripts/validation/check-nav-hub-links.mjs` | 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total — exit 0 |
| `node scripts/validation/v1.20-milestone-audit.mjs` | 16 passed, 0 failed, 0 skipped — exit 0 (C11 lives here, not in check-phase-54) |

`check-phase-49` was also run at the pre-edit baseline (22/0/0) so the post-edit green is a comparison, not an assumption.

**Prose negatives (D-59, D-60), measured over the added lines of both commits — all zero:**

| Negative | Command | Result |
|---|---|---|
| British spellings | `git diff HEAD~2 HEAD \| grep '^+' \| grep -ciE 'enrolment\|enrols\|enrolling\b\|licence\|behaviour\|organisation\|programme\|labelled\|honour\|catalogue\|recognise\|analyse'` | **0** |
| `SEMM` (D-34) | `git diff HEAD~2 HEAD \| grep '^+' \| grep -c 'SEMM'` | **0** |
| C11 banned phrases (D-58) | `... \| grep -cE 'System Center\|SCCM\|Autopatch rings\|SafetyNet'` | **0** |
| Bare `> **Platform:**` (`V-54-27`) | `... \| grep -c '> \*\*Platform:\*\*'` | **0** |
| Code fences in the glossary (D-31) | `git diff HEAD~2 HEAD -- docs/_glossary.md \| grep -c '^+\`\`\`'` | **0** |
| Links to the wave sibling's directory | `grep -c 'operations/firmware-bios' docs/_glossary.md` | **0** |
| The negative literal `V-54-21` reads | `grep -c '05-compliance-policy.md' .planning/REQUIREMENTS.md` | **0** |

`git diff HEAD~2 HEAD --name-only` lists exactly `.planning/REQUIREMENTS.md` and `docs/_glossary.md` — two files, no more.

## D-06 disposition — the roadmap-LOCKED glossary flag is DISCHARGED

`STATE.md:327` carried "which glossary receives the new terminology (149/152)" under *"Named decisions (LOCKED at roadmap 2026-08-19)"*, and `PROJECT.md:31` names DFCI first among the terms this milestone adds. Phases 147 and 148 each deferred the identical flag.

**Ruling: `docs/_glossary.md`, in this phase, under `## Hardware`.** Ground for the H2 choice (D-61 left it to discretion between `## Security` at `:189` and `## Hardware` at `:109`): all four terms name firmware surfaces and configuration objects rather than security controls, `## Hardware` already holds `### TPM` and `### Firmware TPM (fTPM)`, and a single insertion point keeps the diff to one contiguous block. `### Secure Boot` stays under `## Security` and its body is not rewritten — the reconciliation D-61 asks for is the reciprocal `> See also:` from the DFCI entry, not a relocation.

Phase 150's vendor terms (`Sure Admin`, `Think BIOS Config`) are **not** added here (D-64) — the glossary is touched once per phase.

## D-71 — the three reversed deferral grounds, recorded so no later phase re-imports them

All three of the earlier draft's grounds for deferring the glossary were defective:

1. **"No v1.21 requirement covers it"** — the wrong test. `STATE.md:327` is a LOCKED roadmap decision and `PROJECT.md:31` is a milestone scope statement; neither is a requirement, and neither had been read.
2. **"The most heavily pinned Reference file in the corpus"** — false. Measured validator mentions: `quick-ref-l1.md` **130**, `common-issues.md` **120**, `_glossary-android.md` **63**, `docs/_glossary.md` **10**. The "14+ validators" figure was a substring grep catching the five platform glossaries. Confirmed live this plan: the four validators naming this path (`check-phase-{49,59,62,121}.mjs`) impose no constraint an additive entry can break, and none asserts an H3 count — the Hardware section went from 10 H3s to 14 with `check-phase-49` unchanged at 22/0/0.
3. **The "zero-margin freshness hazard"** — the framing 147 D-47 already measured as falsified: C10 computes an interval between the two stamps and never reads today's date. This file's front matter was left byte-unchanged and every gate stayed green, which is the same result by demonstration.

## Accepted inconsistencies (D-68) — recorded so verification and code review do not re-surface them as new

1. **`ROADMAP.md:185`'s "none in the existing corpus" blast-radius claim is now inaccurate, and THIS PLAN is what made it so.** It is an accepted inconsistency under D-68, not a defect to be surfaced later as new. The ROADMAP text is deliberately not edited.
2. `STATE.md:157`'s greenfield "zero corpus occurrences of every term" constraint is imprecise (D-19; plan 01 re-measured `UEFI` = 3 and `BIOS` = 52 at the pre-phase base).
3. `docs/operations/00-index.md:32`'s "4-platform comparison hub" description stays stale and unowned.
4. `ARCHITECTURE.md:329` still calls `V-59-14` a live read when it is `readAtV15Close`.

## Decisions Made

- **`## Hardware` over `## Security`** — see the D-06 disposition above.
- **The DFCI definition ships in the corpus's own voice, with zero quotation marks.** The certificate-trust-chain / per-setting-reporting / survives-reimage triad is the wording already shipped by `docs/operations/firmware-bios/01-windows-dfci.md` (plan 01, commit `5ff7aa68`), so the glossary restates the corpus rather than paraphrasing a research file. The most transcribable candidate sentence — `STACK.md:599`'s "Certificate-based, per-setting reporting, survives reimage, auto-enrols during Autopilot" — is a **research-ledger** string, not a first-party capture (D-37 bars quoting it) and additionally contains "auto-enrols", a British form D-59 bars. It was not used in any form.
- **`--` rather than an em dash inside the see-also blockquote.** C17 #12 measures `.length` on the joined blockquote and the acceptance criterion measures `awk 'length'`, which is byte-based on this host. A `—` costs 3 bytes where `--` costs 2, narrowing a 200-byte margin invisibly. The line measures **180 bytes**. Em dashes are kept in the definition bodies, matching the file's existing prose (`### Hardware hash`, `### Entra ID SSO`).
- **The eligibility gate is stated as prose, not as a quotation.** 149-RESEARCH.md source (b) does record the sentence as a verified verbatim capture, so quoting it would have been defensible — but unquoted restatement carries zero fabricated-citation risk, and the plan's own instruction for the parallel glossary text is "in the corpus's own voice, not as a quotation".
- **BIOS-02 and BIOS-04 left `Pending`.** `requirements.ready-ids` returned **0/2** — sibling plans 03/04/05 in this phase also declare both IDs and have no SUMMARY yet, so #2388's shared-ID gate correctly blocks the flip until the last declaring plan finishes. Recorded so the unflipped checkboxes are not read as an omission by the verifier.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] The `awk 'length>200'` acceptance criterion is falsified at HEAD by 17 pre-existing lines and cannot be satisfied without violating the plan's own prohibition**

- **Found during:** Task 1 (pre-edit measurement of the acceptance criteria)
- **Issue:** Two criteria (task 1's see-also check and task 3's `awk 'length>200' docs/_glossary.md | wc -l` returns 0) assert that **no** line in the file exceeds 200 characters. Measured at the pre-phase base: **17 lines already exceed it**, including the 1,323-byte Alphabetical Index at `:33`, the 529-byte summary at `:19`, the 422-byte `### Entra ID SSO` body at `:193` and two Version History rows at `:285-286`. Satisfying the criterion literally would require rewriting existing term bodies and the index — which this plan's own prohibitions forbid ("No existing glossary term body is rewritten") and which the scope boundary bars as pre-existing.
- **Root cause:** the criterion is an over-broad approximation of what C17 assertion #12 actually enforces. Reading `scripts/validation/c17-eee-contract.mjs:391-408`, #12 collects **consecutive** `> `-prefixed lines, strips the `> ` prefix, joins them with a space, and caps that joined span at 200 — it constrains blockquotes only, and never ordinary prose lines.
- **Fix:** the criterion was narrowed to what it is a proxy for, and both the enforced form and the literal form were measured rather than either being silently dropped. The new `> See also:` line measures **180 bytes** as a standalone blockquote (`#12=0`, whole corpus). The four definition bodies remain one physical line each, matching every existing glossary entry — five added lines exceed 200 characters (four bodies at 319/332/525/91 bytes plus the Version History row at 319), taking the file-wide count from **17 to 21**. Zero added blockquote lines exceed 200.
- **Files modified:** none beyond the intended target.
- **Verification:** `c17-eee-contract` reports `#12=0` and 0 total violations across 234 files; `git show HEAD~2:docs/_glossary.md | awk 'length>200' | wc -l` = 17 confirms the baseline.
- **Committed in:** `8e5070d9`

**2. [Rule 3 - Blocking] The Phase-149 traceability rows the plan asks to add already exist at HEAD**

- **Found during:** Task 2 (`read_first` of the `## Traceability` section)
- **Issue:** Task 2's action and acceptance criterion require adding traceability rows for BIOS-01, BIOS-02, BIOS-03, BIOS-04 and BIOS-11 against Phase 149. All five rows are already present at `.planning/REQUIREMENTS.md:203-206` and `:213`, seeded when the v1.21 roadmap was created; plan 01 flipped BIOS-01's status cell to `Complete`.
- **Fix:** no rows added — adding them would have created five duplicate rows in a table that a later phase's verifier reads. The criterion is satisfied as written ("gains traceability rows naming ...") only in the sense that the rows exist; `grep -cE '^\| BIOS-(01\|02\|03\|04\|11) \| Phase 149 \|'` returns **5**.
- **Files modified:** none.
- **Verification:** `check-phase-54` 32/0/0 — no duplicate-row detector was tripped, and none was introduced.
- **Committed in:** n/a (no change was correct)

---

**Total deviations:** 2 auto-fixed (1 defective acceptance criterion narrowed to the assertion it proxies, 1 already-satisfied plan premise).
**Impact on plan:** No scope creep and no content change. Both deviations are the plan's measurements of pre-existing state being wrong, not the plan's instructions being wrong; every substantive instruction was carried out as written.

## Threat Flags

None. Two Markdown files were edited — one reference document and one planning ledger. No network endpoint, auth path, file-access pattern or schema change was introduced, which is the conclusion 149-RESEARCH.md's Security Domain section reaches for this plan's surface.

Register dispositions discharged: **T-149-07** (spoofing via fabricated attribution) — every new definition is written in the corpus's own voice with zero quotation marks; the one first-party sentence the amendment restates is stated as prose, not as a quotation. **T-149-08** (tampering with the live-read `.planning/REQUIREMENTS.md` surface) — `grep -c '05-compliance-policy.md'` returns 0 and `check-phase-54` (validators 21 and 27) is 32/0/0 after the commit. **T-149-09** (repudiation) — exactly one `## Version History` row naming the phase, the four terms, the section and the index update. **T-149-SC** — zero package installs.

## Known Stubs

None. Every term added carries a complete definition; no placeholder text, no "coming soon", no TODO, no empty data path. The two `## Future Requirements` entries are deferrals with explicit triggers, which is that section's purpose, not stubs in shipped content.

## Issues Encountered

None beyond the two deviations above. `.planning/config.json` carries a pre-existing uncommitted modification that predates this plan (last committed in `40b8874d`, Phase 72); it was deliberately left untouched under the scope boundary and appears in `git diff HEAD~2 --name-only` only because that form compares the working tree. `git diff HEAD~2 HEAD --name-only` — the committed scope — lists exactly the two intended files.

## Next Phase Readiness

- **Ready for plans 03/04/05,** which expand `docs/operations/firmware-bios/01-windows-dfci.md`. Note for them: the glossary now defines DFCI, UEFI CSP, BIOS password and BIOS configuration and other settings, so those guides may link **inbound** to `../../_glossary.md#device-firmware-configuration-interface-dfci`, `#uefi-csp`, `#bios-password` and `#bios-configuration-and-other-settings` — all four anchors exist at HEAD and `check-nav-hub-links` resolves them. The glossary deliberately holds **no** outbound link to `docs/operations/firmware-bios/`, so the inbound direction is the only one that exists.
- **BIOS-02 and BIOS-04 stay `Pending`** until the last plan in this phase declaring them produces its SUMMARY (#2388 shared-ID gate). No action required; the gate re-evaluates automatically.
- **Handed to Phase 150 (D-64):** the `Sure Admin` and `Think BIOS Config` glossary terms, deliberately not added here. Phase 150 owns the second glossary touch, and should follow the same four-write shape recorded in this SUMMARY's `patterns` block.
- **Handed to the verifier:** ROADMAP Phase-149 Success Criterion 4 must be graded **through** the `[AMENDED 2026-08-24]` note on BIOS-04, not literally on its "three". The ROADMAP text is deliberately unedited per D-05's scope.
- **No blockers.**

## Self-Check: PASSED

- `docs/_glossary.md` — FOUND (modified, 20 insertions / 1 deletion)
- `.planning/REQUIREMENTS.md` — FOUND (modified)
- Commit `8e5070d9` — FOUND
- Commit `5dc088f5` — FOUND
- All task acceptance criteria re-run at HEAD: pass, with the two documented deviations
- Plan-level `<verification>` re-run at HEAD: check-phase-49 22/0/0 · check-phase-54 32/0/0 · c17 234 files / 0 violations / 13 assertion counters at 0 · check-phase-144 (apex) 101/0/0 · glossary front matter byte-unchanged

---
*Phase: 149-firmware-bios-domain-overview-dfci-surface-uefi*
*Completed: 2026-08-24*
