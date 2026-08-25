---
phase: 149-firmware-bios-domain-overview-dfci-surface-uefi
plan: 01
subsystem: docs
tags: [dfci, bios, uefi, firmware, intune, dell, hp, lenovo, azure-key-vault]

requires:
  - phase: 146-windows-driver-firmware-update-depth
    provides: docs/operations/patch-management/06-windows-driver-firmware-updates.md — the exact structural analog (frontmatter, platform-applicability blockquote, anchor/H2 pairing, Source-line placement) and the updates half of the updates-versus-configuration seam
provides:
  - "docs/operations/firmware-bios/ domain founded — the corpus's first firmware/BIOS configuration domain"
  - "00-overview.md complete at 9 H2s / 7 hand-authored anchors — BIOS-01 custody routing, BIOS-02 disjointness + Dell .cctk/2 MB mechanics, BIOS-11's Dell-template bricking quote"
  - "01-windows-dfci.md seeded — frontmatter, blockquote, H1, ## What DFCI Is (BIOS-02's DFCI half), both tail sections"
  - "Bidirectional 00 <-> 01 cross-links landed in ONE commit so neither direction ever dangled"
  - "Two-date **Source:** line convention (ms.date + updated) established for this domain"
affects: [150-per-oem-bios-guides, 151-recipes, 152-registry-nav-wiring, 153-harness]

actuals:
  tokens: 4504
  tasks: 3
  commits: 2

tech-stack:
  added: []
  patterns:
    - "Two-date evidence line: **Source:** [Title](url) (ms.date YYYY-MM-DD, updated YYYY-MM-DD), standalone line-start paragraph after the claim, one page per line (D-51/D-56)"
    - "Missing-date evidence line for non-Learn sources: (Version X, published YYYY-MM-DD) / (published YYYY-MM-DD)"
    - "Comparative claims with no first-party source ship as explicitly-labelled corpus inference, outside quotation marks and outside the vendor **Source:** line (D-37/D-52)"
    - "Absence claims ship as enumeration facts with the **Source:** line on the enumeration, never as a sourced absence (D-43)"

key-files:
  created:
    - docs/operations/firmware-bios/00-overview.md
    - docs/operations/firmware-bios/01-windows-dfci.md
  modified: []

key-decisions:
  - "D-22 DISCHARGED: the directory is firmware-bios/, chosen over firmware-governance/ and bios-management/ because BIOS-01 states the path literally and requirement text is the authority"
  - "The Lenovo RBAC/logging/rotation comparison ships as this corpus's own inference from Azure Key Vault platform behavior, never as a Lenovo attribution — RESEARCH Pitfall 8 confirms zero hits for all three terms on both fetched Lenovo pages"
  - "Both files landed in ONE commit (5ff7aa68) so the bidirectional cross-link never dangled in either direction"
  - "review_by computed by arithmetic at execution time (2026-08-24 + 60 = 2026-10-23), never mirrored from a sibling"
  - "Execution crossed midnight UTC; per D-69 both files carry the date of commit 1 (2026-08-24)"

patterns-established:
  - "Custody-first routing: a firmware/BIOS domain overview routes by who holds the secret, not by tool"
  - "One load-bearing first-party quote per file — the Dell-template bricking Warning lives only in 00-overview.md, the DFCI warning is reserved for 01-windows-dfci.md (D-38)"

requirements-completed: [BIOS-01, BIOS-02, BIOS-11]

coverage:
  - id: D1
    description: "00-overview.md names Dell, HP and Lenovo and states each one's BIOS-secret custody position, each under its own standalone two-date **Source:** line"
    requirement: "BIOS-01"
    verification:
      - kind: other
        ref: "grep -c on the three verbatim literals + grep -c '^\\*\\*Source:\\*\\* ' returns 3 in 00-overview.md, every one carrying a date parenthetical"
        status: pass
    human_judgment: false
  - id: D2
    description: "The Lenovo comparative claim ships as inference, not attribution — outside quotation marks and not under the Lenovo **Source:** line"
    requirement: "BIOS-01"
    verification:
      - kind: other
        ref: "grep -n 'RBAC|role-based access control' docs/operations/firmware-bios/00-overview.md — hit at :65, Lenovo Source line at :62 (after, not before), zero quotation marks on the matching line"
        status: pass
    human_judgment: true
    rationale: "must_haves marks this truth verification: backstop — whether prose reads as inference rather than attribution is a judgment a grep cannot settle. The grep proves position and absence of quotation marks; a human must confirm the wording actually reads as the corpus's own inference."
  - id: D3
    description: "Both native Intune BIOS surfaces named and stated disjoint, with the Dell-only Templates surface carrying its .cctk file type and 2 MB threshold quoted verbatim"
    requirement: "BIOS-02"
    verification:
      - kind: other
        ref: "grep -c 'For Dell, upload the Dell Client Configuration Tool Kit file (.cctk). The file size limit is 2 MB.' returns 1"
        status: pass
    human_judgment: false
  - id: D4
    description: "BIOS-11's Dell-template Bitlocker bricking Warning quoted verbatim in 00-overview.md and nowhere else in the domain"
    requirement: "BIOS-11"
    verification:
      - kind: other
        ref: "grep -c on the verbatim Warning returns 1 in 00-overview.md; grep -c 'lock the device beyond repair' returns 0 in 00-overview.md"
        status: pass
    human_judgment: false
  - id: D5
    description: "01-windows-dfci.md seeded with frontmatter, platform-applicability blockquote, H1, ## What DFCI Is and both tail sections; UEFI CSP attributed only to the two pages that carry the string"
    requirement: "BIOS-02"
    verification:
      - kind: other
        ref: "grep -c 'These settings use the UEFI CSP.' and 'Through UEFI CSP using the DFCI layer, which is isolated from the OS' both return 1, each under its own **Source:** line"
        status: pass
    human_judgment: false
  - id: D6
    description: "Domain boundary cross-links four distinct owners (TPM, Secure Boot, BitLocker, firmware updates) using source-relative paths, and the TPM/Secure-Boot absence is written as an enumeration fact"
    verification:
      - kind: other
        ref: "grep -c on all four relative paths returns >=1 each; all eight DFCI category names present; grep -niE 'DFCI (cannot|can.t|does not|doesn.t) (set|configure|manage) (TPM|Secure Boot)' returns 0"
        status: pass
    human_judgment: false
  - id: D7
    description: "All gates green after the files landed"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-144.mjs — 101 PASS, 0 FAIL, 0 SKIPPED"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-nav-hub-links.mjs — 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-54.mjs — 32 passed, 0 failed, 0 skipped"
        status: pass
      - kind: other
        ref: "node scripts/validation/v1.20-milestone-audit.mjs — 16 passed, 0 failed, 0 skipped"
        status: pass
    human_judgment: false

duration: 33 min
completed: 2026-08-24
status: complete
---

# Phase 149 Plan 01: Firmware and BIOS Domain Foundation Summary

**`docs/operations/firmware-bios/` founded with a custody-first routing overview — Dell/Intune, HP/cloud-vault, Lenovo/customer-held Azure Key Vault — plus a seeded DFCI guide, both landed in one commit so the bidirectional cross-link never dangled.**

## Performance

- **Duration:** 33 min
- **Started:** 2026-08-25T02:08:00Z
- **Completed:** 2026-08-25T02:41:00Z
- **Tasks:** 3
- **Files created:** 2

## Accomplishments

- **BIOS-01 routing spine.** `## Who Holds the BIOS Secret` carries a three-row custody table plus per-vendor prose: Dell (Intune holds it, in your tenant), HP (HP's cloud vault, outside your tenant), Lenovo (you hold it, as an encrypted INI file or a private key in your own Azure Key Vault). Three separate two-date `**Source:**` lines, one page each.
- **BIOS-02 disjointness.** `## The Two Native Intune BIOS Surfaces` names DFCI and the Dell-only "BIOS configuration and other settings" Templates policy, states plainly that they share no device, and ships the `.cctk` / 2 MB threshold verbatim.
- **BIOS-11's Dell-template half.** `## Before You Start` quotes the Bitlocker bricking Warning verbatim, once, and points at `01-windows-dfci.md` for DFCI's own distinct warning rather than restating it (D-38's one-quote-per-file rule).
- **Four-owner domain boundary.** TPM, Secure Boot, BitLocker and firmware updates each cross-linked to their real owner by source-relative path; the TPM/Secure-Boot absence written as an enumeration over the eight DFCI setting categories with the `**Source:**` line on the enumeration.
- **`01-windows-dfci.md` seeded** with frontmatter, blockquote, H1, `## What DFCI Is` and both tail sections — 3 H2s / 1 anchor at this plan's boundary, expanding to 12/10 across plans 03/04/05.

## Task Commits

1. **Task 1 (tracer): Found the domain end to end — both files, one commit** — `5ff7aa68` (feat)
2. **Task 2: Author the remaining six sections of the routing overview** — `5b8cafae` (feat)
3. **Task 3: Prose-negative sweep and the full gate run** — no commit; all eight prose negatives returned zero on first run, so there was nothing to fix. Its deliverable is the measured record in this SUMMARY.

## Files Created/Modified

- `docs/operations/firmware-bios/00-overview.md` — the domain routing hub. 9 H2s / 7 hand-authored anchors / 0 fences / no version-history section. Anchors in order: `who-holds-the-secret`, `native-bios-surfaces`, `choosing-a-path`, `domain-boundary`, `updates-vs-configuration`, `before-you-start`, `unsupported-callouts`. `## Related Resources` and `## External References` unanchored.
- `docs/operations/firmware-bios/01-windows-dfci.md` — the DFCI guide, seeded. 3 H2s / 1 anchor (`what-dfci-is`) at this plan's boundary.

## must_haves — per-truth disposition

| # | Truth | How satisfied |
|---|---|---|
| 1 | Dell/HP/Lenovo custody stated | `## Who Holds the BIOS Secret` table + three prose blocks; grep of all three verbatim literals returns 1 each |
| 2 | HP verbatim sentence under its own **Source:** line | `Passwords are managed by HP Connect and stored in a cloud vault.` at :51, `**Source:**` HP Connect User Guide at :54 (Version 1.2.0, published 2022-09-27) |
| 3 | Lenovo verbatim Key Vault sentence under its own **Source:** line | Lenovo CDRT sentence at :59, `**Source:**` at :62 (published 2025-11-04) |
| 4 | Lenovo superlative as inference, never attribution (`verification: backstop`) | Comparative paragraph sits AFTER the Lenovo `**Source:**` line (:64-69), contains no quotation marks, and explicitly names itself as this corpus's inference from Azure Key Vault platform behavior while stating that Lenovo makes no such claim and the cited post uses none of the three terms |
| 5 | Both native surfaces named and stated disjoint | `## The Two Native Intune BIOS Surfaces`, closing paragraph states no device qualifies for both |
| 6 | Dell-only file type + exact 2 MB threshold quoted verbatim | `For Dell, upload the Dell Client Configuration Tool Kit file (.cctk). The file size limit is 2 MB.` — unrounded, unrestated |
| 7 | Bricking quote in 00 only, one per file | `grep -c` on the Bitlocker Warning = 1 in `00-overview.md`; `grep -c 'lock the device beyond repair'` = 0 in `00-overview.md` |
| 8 | `review_by` = `last_verified` + exactly 60 days by arithmetic | 2026-08-24 + 60 = 2026-10-23. Shown: Aug 24→31 is 7 days, Aug 31→Sep 30 is 30 (37), Sep 30→Oct 23 is 23 (60). Cross-checked with `date -d "2026-08-24 +60 days" +%F` = 2026-10-23. Both files carry it; neither mirrors a sibling |
| 9 | Four owners cross-linked, source-relative | `../../decision-trees/03-tpm-attestation.md`, `../../_glossary.md#secure-boot`, `../../reference/security-baseline-conflicts.md`, `../patch-management/06-windows-driver-firmware-updates.md` — all resolve (nav-hub-links 0 failures) |
| 10 | TPM/Secure-Boot absence as enumeration fact | All eight category names present on a single sentence, `**Source:**` line on the enumeration citing `ref-dfci-settings-windows`; the forbidden first-party-negation grep returns 0 |
| 11 | `check-nav-hub-links` 0/0 after the landing commit | `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total` — run after `5ff7aa68` and again after `5b8cafae` |

## Measured gate results

Run at HEAD after both commits. Counts measured, not transcribed (D-19):

| Gate | Result |
|---|---|
| `node scripts/validation/check-phase-144.mjs` (the apex) | **101 PASS, 0 FAIL, 0 SKIPPED (total checks: 101)** — exit 0 |
| `node scripts/validation/check-nav-hub-links.mjs` | 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total — exit 0 |
| `node scripts/validation/check-phase-54.mjs` | 32 passed, 0 failed, 0 skipped — exit 0 |
| `node scripts/validation/v1.20-milestone-audit.mjs` | 16 passed, 0 failed, 0 skipped — exit 0 |

All eight prose negatives returned zero on first run: `SEMM` 0 · barred phrasings 0 · British spellings 0 · code fences 0 (both files) · `## Version History` 0 · C11 phrases 0 · bare `> **Platform:**` 0 · links to `02-`/`03-`/`04-` targets 0.

## Re-measured corpus counts (D-19)

Measured with `git grep` at two SHAs, both metrics reported because a line count and an occurrence count are not comparable — the metric trap D-19 records:

| Term | At pre-phase base `81d26d9d` | At HEAD after this plan |
|---|---|---|
| `UEFI` in `docs/**/*.md` | 3 occurrences / 3 lines | 9 occurrences / 9 lines |
| `BIOS` in `docs/**/*.md` | 52 occurrences / 38 lines | 110 occurrences / 88 lines |

The base measurements reproduce D-19's corrected figures exactly, confirming that `STATE.md:157`'s "zero corpus occurrences of every term" greenfield constraint was already imprecise before this phase touched anything.

## Accepted inconsistencies (D-68) — recorded so verification and code review do not re-surface them

1. `ROADMAP.md:185`'s "none in the existing corpus" blast-radius claim is inaccurate — plan 02 of this phase edits `docs/_glossary.md`.
2. `STATE.md:157`'s greenfield constraint is imprecise — re-measured at HEAD base, `UEFI` = 3 occurrences and `BIOS` = 52 occurrences, not zero (see table above).
3. `docs/operations/00-index.md:32`'s "4-platform comparison hub" description stays stale and unowned; no requirement in this phase assigns it.
4. `ARCHITECTURE.md:329` still calls `V-59-14` a live read when it in fact reads at a frozen close SHA (`readAtV15Close`, `check-phase-59.mjs:446-473`).

## D-22 disposition — LOCKED naming and numbering flag discharged

`STATE.md:327` carried "firmware/BIOS domain naming and file numbering (149)" as a LOCKED named decision, with `ARCHITECTURE.md:697` listing three candidates. **Ruling: `firmware-bios/`.** Ground: `REQUIREMENTS.md` BIOS-01 states the path literally, and requirement text is the authority over advisory architecture research. The alternatives `firmware-governance/` and `bios-management/` are declined. File numbering follows D-21: `00-overview.md` and `01-windows-dfci.md` now, with `02-`/`03-`/`04-` reserved for Phase 150's per-OEM guides — reserved by convention only, with zero stub files and zero outbound links written to them (D-26).

## Decisions Made

- **Precondition satisfied without a re-fetch.** Today is 2026-08-24, on or before 149-RESEARCH.md's 2026-09-23 staleness deadline, and the research pass fetched all seven sources as raw bytes the same day. Every quoted string in both files traces to a raw-byte capture in 149-RESEARCH.md section Sources. No re-fetch was performed and none was required.
- **Tracer feedback gate.** After committing `5ff7aa68` the tracer's `<verify>` was re-run end to end at HEAD (`check-nav-hub-links` 0/0/0, `check-phase-54` 32/0/0) before any expansion task began. The plan is `autonomous: true` with zero checkpoint tasks and the orchestrator's success criteria require all 3 tasks, so the gate was discharged by measurement rather than by returning a checkpoint. Recorded here explicitly so the judgment is visible rather than silent.
- **Midnight crossing (D-69).** Task 1 committed on 2026-08-24 local; the SUMMARY was written after 2026-08-25T00:00Z. Both files carry `last_verified: 2026-08-24`, the date of commit 1, per D-69.
- **`applies_to: APv1`, not `all`** (D-30) — DFCI's central gate is hardware-hash Autopilot registration, an APv1 construct.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] `Boot Options` was split across a line wrap, breaking the literal grep**

- **Found during:** Task 2 (acceptance-criteria verification)
- **Issue:** The eight-category enumeration wrapped between `Boot` and `Options`, so `grep -c "Boot Options"` returned 0 while the other seven names returned 1. The acceptance criterion requires all eight names to appear, and more importantly a category name broken across a newline is invisible to any future reader or validator grepping for it — exactly the class of defect the phase-specific traps warn about.
- **Fix:** Reflowed the sentence so `Boot Options` sits intact on one physical line, moving `Radios,` up to the previous line. Prose content unchanged.
- **Files modified:** `docs/operations/firmware-bios/00-overview.md`
- **Verification:** All eight category names now return 1; `check-nav-hub-links` and `v1.20-milestone-audit` re-run green.
- **Committed in:** `5b8cafae` (Task 2 commit — caught before the commit, not after)

**2. [Rule 1 - Bug] Removed an unsourced superlative from the custody-section intro**

- **Found during:** Task 2 (reviewing task 1's committed prose against the phase's no-fabrication discipline)
- **Issue:** Task 1's `## Who Holds the BIOS Secret` opened with "Three manufacturers dominate the commercial Windows fleet" — a market-share claim with no source anywhere in 149-RESEARCH.md. In a phase whose entire discipline is that unsourced assertions must not read as fact, an unsourced dominance claim is the same defect class as the Lenovo superlative the plan explicitly guards against.
- **Fix:** Rewritten to "Dell, HP and Lenovo each answer the custody question differently." — states only what the section actually demonstrates.
- **Files modified:** `docs/operations/firmware-bios/00-overview.md`
- **Verification:** Prose reads clean; no gate could have caught this (a validator cannot see wrong prose — D-60's whole premise).
- **Committed in:** `5b8cafae`

**3. [Rule 3 - Blocking] Bash heredoc could not carry the full task-2 payload**

- **Found during:** Task 2 (writing the six new sections)
- **Issue:** A single `cat > file <<'EOF'` carrying the whole rewritten overview failed with `unexpected EOF while looking for matching '` and wrote nothing. The file was verified unchanged (85 lines, clean tree) before retrying.
- **Fix:** Split the new content into five smaller appended chunks in a temp file, then spliced it in ahead of `## Related Resources` with `head -n`. No retry of the oversized call.
- **Files modified:** none beyond the intended target.
- **Verification:** `wc -l` and the anchor/H2 map confirmed correct structure; zero CR bytes; `git ls-files --eol` shows `w/lf`.
- **Committed in:** `5b8cafae`

---

**Total deviations:** 3 auto-fixed (2 prose-accuracy bugs, 1 tooling blocker)
**Impact on plan:** No scope creep. Both prose fixes are corrections to this plan's own output, caught inside the plan; the tooling workaround changed nothing about the shipped content.

## Threat Flags

None. Every file created is static Markdown under `docs/operations/firmware-bios/`. No new network endpoint, auth path, file-access pattern or schema change was introduced. T-149-01 (spoofing via quoted strings) was mitigated as planned: every quoted string traces to a raw-byte capture in 149-RESEARCH.md, and the one unsourceable comparative claim ships as labelled inference. T-149-03 (repudiation) mitigated: five two-date `**Source:**` lines, one page each.

## Known Stubs

None. `01-windows-dfci.md` is deliberately partial — this plan seeds it and plans 03/04/05 author its remaining nine H2s — but every section that exists is complete, sourced and readable on its own. No placeholder text, no "coming soon", no empty data paths.

## Issues Encountered

None beyond the three deviations above.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- **Ready for plan 02** (the `docs/_glossary.md` terminology edit). Note for that plan: check `docs/_glossary.md`'s line endings before any string replacement — a mismatch is a silent zero-match (D-18).
- **Ready for plans 03/04/05**, which expand `01-windows-dfci.md` to 12 H2s / 10 anchors. The anchors still to be authored there: `dfci-prerequisites`, `dfci-oem-support`, `surface-eligibility`, `dfci-settings-surface`, `bricking-irreversible`, `retiring-a-device`, `reusing-a-device`, `recovering-locked-device`, `unsupported-callouts`.
- **Reserved for later plans, not used here:** the `configure-dfci-windows` bricking quote ("lock the device beyond repair") belongs to `01-windows-dfci.md` only, and `ref-dfci-settings-windows` carries a second, stronger bricking sentence that needs its own `**Source:**` line if used (149-RESEARCH.md flagged finding 1).
- **Handed to Phase 150 (D-26):** the outbound links from `00-overview.md` to `02-dell-*`, `03-hp-*` and `04-lenovo-*`. None exist yet, by design; Phase 150 adds them when it authors the targets.
- **Handed to Phase 152 (D-66):** registry rows, filename-map rows, canary bumps, ops-index rows and `docs/index.md` wiring for both new files. Neither file carries a `doc_id`.
- **No blockers.**

## Self-Check: PASSED

- `docs/operations/firmware-bios/00-overview.md` — FOUND
- `docs/operations/firmware-bios/01-windows-dfci.md` — FOUND
- Commit `5ff7aa68` — FOUND
- Commit `5b8cafae` — FOUND
- All task acceptance criteria re-run at HEAD: pass
- Plan-level `<verification>` re-run at HEAD: apex 101/0/0, nav-hub-links 0/0, check-phase-54 32/0, milestone audit 16/0, all eight prose negatives zero

---
*Phase: 149-firmware-bios-domain-overview-dfci-surface-uefi*
*Completed: 2026-08-24*
