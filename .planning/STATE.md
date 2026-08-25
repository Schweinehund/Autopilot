---
gsd_state_version: 1.0
milestone: v1.21
milestone_name: Enterprise Update, Driver & Firmware/BIOS Governance (Phases 145-153) — ACTIVE
current_phase: 150
current_phase_name: Per-OEM BIOS Guides & Capability Matrix
status: executing
stopped_at: Phase 150 context gathered
last_updated: "2026-08-25T23:40:29.198Z"
last_activity: 2026-08-25
last_activity_desc: Phase 149 complete, transitioned to Phase 150
state_head: c2d676142b85ffb4030a9902ed47de26949eaf8e
progress:
  total_phases: 9
  completed_phases: 5
  total_plans: 25
  completed_plans: 20
  percent: 56
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-08-18 — v1.21 scoped from a live corpus audit of update/driver/firmware/BIOS coverage)

**Core value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices through Microsoft Intune / Entra ID without escalating to engineering — and find those answers as clean, correctly-cited results in the Copilot Studio / SharePoint knowledge base. v1.21 extends that corpus from provisioning into **day-2 update governance** — the enterprise update plan across operating systems, applications, drivers, firmware and BIOS.
**Current focus:** Phase 149 — Firmware/BIOS Domain — Overview, DFCI & Surface UEFI

**Measured scoping baseline (2026-08-18, live corpus read at HEAD):** OS updates covered across 4 platforms in `docs/operations/patch-management/` (5 files); applications covered as **deployment only**, not patching (`docs/operations/app-lifecycle/`, 5 files); drivers and firmware share a single ~45-line disambiguation H2 at `docs/operations/patch-management/01-windows-wufb-rings.md:152`; **BIOS has zero management coverage** — `DFCI` = 0 occurrences corpus-wide, `UEFI` = 2 (both incidental), all 37 `BIOS` hits are TPM/serial/hardware-hash troubleshooting; `Enterprise App Catalog` = 7 occurrences, every one an ESP supported-app-type list and never a patching surface; **no configuration artifact of any kind exists** in the repository (no Graph payloads, no settings-catalog exports); all five `patch-management/` docs sit at `last_verified: 2026-04-28` / `review_by: 2026-06-27`, 52+ days past due; `patch-management/` is 4-platform while the project has been 5-platform since v1.5.

> **v1.21 BACK-ANCHOR OBLIGATION (`V120-PIN-DEFERRAL`).** v1.20 discharged `V119-PIN-DEFERRAL` and left its own successor obligation open: `_lib/frozen-at-close.mjs` carries no `V120` entry, so `v1.20-milestone-audit.mjs` still reads live HEAD. v1.21 must pin it to the v1.20 close-gate SHA `246fa3dd` and convert that harness. Recover the SHA with the subject-line pair discriminator (count=1) — **not** the dual-token `--grep --all-match` form, which returns multiple candidates because it matches on the body:
> ```
> git log --all --format="%H|%s" | awk -F'|' '$2 ~ /v1\.20/ && $2 ~ /MILESTONE CLOSE/'
> ```
> This is the same method that resolved V117, V118 and V119; regression-check it against all three before trusting the V120 result.

## Current Position

Phase: 150 (Per-OEM BIOS Guides & Capability Matrix) — READY TO EXECUTE
Plan: Not started
Status: Ready to execute
Last activity: 2026-08-25 — Phase 149 complete, transitioned to Phase 150

Progress: [████░░░░░░] 44% (4 of 9 phases; 15/15 planned plans complete)

## v1.21 Phase Dependency Summary

```
Phase 145 (Corpus Correction, Validator Gate & Archival-Drift Fix)
  |       FIX-01..FIX-12
  |       DELIVERS:
  |         - The E-a..E-k content corrections across the five
  |             patch-management docs, each with a per-claim evidence line
  |             citing a source dated AFTER the event it describes
  |         - review_by minus last_verified <= 60 days on all five,
  |             computed by arithmetic (never the corpus +90 default)
  |         - Ubuntu 22.04 -> 24.04/26.04 LTS + RHEL 9/10 across 64
  |             occurrences in 25 md files PLUS an SVG REGENERATION
  |         - check-phase-59's ops-index read converted to a frozen read
  |             (the row-count equality stops barring future guides)
  |         - docs/_glossary-linux.md:157 fixed BY INLINING THE SUBSTANCE
  |       HARD CONSTRAINTS:
  |         - C11 ORDERING IS LOAD-BEARING: substitute an allowlisted
  |             keyword into 00-overview.md:76-87 FIRST, then remove the
  |             mutual-exclusivity wording — same commit, that order
  |         - The FIX-01 sweep must key on First + Fast + Broad, NOT the
  |             comma-and string, or it misses 2 of the 4 sites
  |         - Pinned literals are literal-presence tests, not claim
  |             endorsements: use the attribution pattern (state what the
  |             corpus asserted, place the correction beside it)
  |         - Hotpatch/VBS/integrity-verdict tokens stay OUT of
  |             00-overview.md body prose
  |         - FIX-11 CANNOT BE DEFERRED — without it, archiving v1.21's
  |             own research at close re-reddens the apex AFTER the
  |             close-gate apex was measured green, and nobody re-runs it
  |       RESEARCH FLAG: the two UNVERIFIED dated deadlines (Android
  |         2026-10-31; Apple's unpublished Intune end-of-support date)
  |
  +--> soft (quality) --> Phase 146, Phase 147
  |
  +--> REAL (ops-index row count 5 -> 9) --> Phase 152
  v
Phase 146 (Windows Driver & Firmware Update Depth)
  |       DRV-01..DRV-07
  |       DELIVERS:
  |         - 06-windows-driver-firmware-updates.md as a real guide
  |         - The deferral/deadline asymmetry, verbatim-sourced
  |         - Three absences: no rollback; no Autopilot application while
  |             unapproved CRITICAL drivers still land; destructive
  |             Automatic-to-Manual switch
  |         - The ConfigMgr co-existence procedure (modern DisableDualScan
  |             replacement) with its undefined-state warning
  |         - Stub-and-move: 01-windows-wufb-rings.md keeps the H2, the
  |             anchor, the NOT-a-ring disambiguation and ALL dual-scan
  |       HARD CONSTRAINTS:
  |         - ONLY phase in v1.21 that edits 01-windows-wufb-rings.md.
  |             Keep the surgery isolated; landing it after 148 means the
  |             bare-ring negative must be cleared twice
  |         - A CLEAN promotion (delete the H2) takes the chain RED
  |         - Prefer singular "Autopatch ring" (the regex is plural-only)
  |         - Touches 00-overview.md (2 of 4)
  |       RESEARCH FLAG: none — fully first-party. Re-fetch the two
  |         search-summary rows before quoting them.
  |
  +--> REAL (cross-links the promoted guide + the anchor) --> Phase 148
  v
Phase 147 (Linux Update Delivery)
  |       LNX-01..LNX-04
  |       DELIVERS:
  |         - 05-linux-update-delivery.md: no native Intune Linux update
  |             policy; Bash platform script; compliance + CA as
  |             ATTESTATION, not enforcement
  |         - The root-context hazard (Root + Every 15 minutes + no
  |             documented run-time cap) as the primary pitfall
  |         - unattended-upgrades' FOUR enabled origins + reboot detection
  |         - Ubuntu Pro / Livepatch as a Canonical-side entitlement
  |       HARD CONSTRAINTS:
  |         - The 5-minute cap belongs to compliance discovery scripts, a
  |             DIFFERENT surface — do not attribute it here
  |         - 00-overview.md (3 of 4): APPEND a Linux column; a 5-platform
  |             rewrite that drops one of the four pinned literals is red
  |         - The overview's frontmatter platform value stays
  |             cross-platform; never add Linux to it
  |       RESEARCH FLAG: none — small, fully documented surface
  |
  v
Phase 148 (Application Update Management & WinGet Routing)
  |       APP-01..APP-06
  |       DELIVERS:
  |         - 07-windows-autopatch.md (enrolment, Test/Last, app updates,
  |             reporting) — CROSS-LINKS co-management/03 and the
  |             disambiguation anchor, re-authors neither
  |         - Autopatch entitlement documented as necessary but NOT
  |             sufficient for Hotpatch (the two licence lists differ)
  |         - 08-windows-app-updates.md: M365 channels + Enterprise App
  |             Management (reachability gates as hard as the licence,
  |             all eight limitations, and the ESP/DPP POSITIVE)
  |         - WinGet as ROUTING AND HARDENING, not a patching guide
  |       HARD CONSTRAINTS:
  |         - co-management/03 carries a positive prerequisite pin AND a
  |             negative barring an applicability blockquote, plus a
  |             60-day cycle rule — cross-link, never trim to "see the
  |             new guide"
  |         - 00-overview.md (4 of 4, last content touch)
  |       RESEARCH FLAG: the Intune-side M365 Apps update policy surface
  |         was NEVER fetched; post-July-2026 SAEC cadence is unverified
  |         and Microsoft's own page is internally inconsistent; is the
  |         Win32 Store app type still in preview?
  |
  v
Phase 149 (Firmware/BIOS Domain — Overview, DFCI & Surface UEFI)
  |       BIOS-01, BIOS-02, BIOS-03, BIOS-04, BIOS-11
  |       DELIVERS:
  |         - firmware-bios/00-overview.md routing by SECRET CUSTODY
  |             (Dell = Intune holds; HP = HP cloud vault; Lenovo = you)
  |         - BOTH native Intune BIOS surfaces, named as DISJOINT
  |         - The NINE-OEM DFCI list + "Other OEMs are pending." + the
  |             six/one-OEM conflict recorded, and DFCI presented as
  |             UNAVAILABLE on Dell/HP/Lenovo, not declined
  |         - DFCI's disqualifying prerequisites: 2 of this corpus's 3
  |             registration paths disqualify; the 24H2 Pro known issue
  |         - The bricking quote + retire vs reuse as DISTINCT sequences
  |       HARD CONSTRAINTS:
  |         - Greenfield: zero corpus occurrences of every term, so no
  |             reconciliation and no existing-file blast radius
  |         - Intune-delivery-shaped and link-not-copy
  |         - "The six" and "most business OEMs" are barred phrasings
  |       RESEARCH FLAG: the oldest source in the whole set is the SOLE
  |         source for three load-bearing claims here — re-fetch first
  |
  v
Phase 150 (Per-OEM BIOS Guides & Capability Matrix)
  |       BIOS-05, BIOS-06, BIOS-07, BIOS-08, BIOS-09, BIOS-10, BIOS-12
  |       DELIVERS:
  |         - Dell / HP / Lenovo guides at ONE identical five-section
  |             shape (Delivery / Authentication / Scope / Prerequisites /
  |             Recovery) so the matrix is a transposition, not a second
  |             artefact that drifts
  |         - The inverted-prerequisite pair (Dell wants a virgin BIOS;
  |             Lenovo needs a provisioned one)
  |         - HP Connect as a VENDOR CONNECTOR, not a Win32 agent, with
  |             its cloud-vault custody quoted against Dell's no-customer-
  |             data statement
  |         - The ThinkCentre fork stated, not papered over
  |         - Lose-the-plane-lose-the-secret for both vendors, fleet-first
  |         - Password custody scope (two retrieval options, distinct
  |             roles, readable AFTER the device leaves management)
  |         - docs/reference/firmware-oem-matrix.md, C17-green
  |       HARD CONSTRAINTS:
  |         - The matrix's REGISTRY ROW IS NOT LANDED HERE (Phase 152).
  |             Landing it here leaves both canaries red for 3 phases
  |         - No BIOS token tables, no vendor cmdlet syntax reference,
  |             no per-model matrices
  |         - Every Recovery H2 is PRESENT even where the vendor is
  |             silent — state the silence, do not fill it with unsourced
  |             industry expectation
  |       RESEARCH FLAG: THREE UNVERIFIED recovery gaps (Lenovo lost
  |         supervisor password, Lenovo lost certificate private key, HP
  |         Endorsement Key loss). Recovery is the most-used content for
  |         this audience; shipping it as a gap undercuts the guides.
  |
  +----> REAL (recipe cites all four domains) ----+
  |                                               |
  |     Phases 146 + 147 + 148 also feed ---------+
  v                                               v
Phase 151 (Recipe #5 — The Enterprise Update Plan)
  |       RCP-01..RCP-05
  |       DELIVERS:
  |         - docs/recipes/05-* as the corpus's FIRST configuration
  |             artifact of any kind
  |         - Nine decision points with reversibility ratings (one
  |             Destructive, one Effectively irreversible), the two most
  |             consequential written on the CORRECTED positions
  |         - A platform-applicability marker per decision point, >= 3
  |             marked Windows-only
  |         - A truthful Rollback/Recovery section: largely absences,
  |             including the DEFAULT M365 channel having none at all
  |         - The recipe-template divergence RESOLVED on the record
  |       HARD CONSTRAINTS:
  |         - The link checker has NO baseline, allowlist, ratchet or
  |             expected-failure list — a link to a not-yet-written doc
  |             is immediate red, which is why this phase is 6th
  |         - FALSIFIED, do not sequence on: the capability-matrix
  |             relabel gating this phase; the template mandating the
  |             Rollback heading. Recipes 01/02 are NOT non-compliant.
  |       RESEARCH FLAG: none external. One open decision for discuss-
  |         phase: promote the section into the template, or record why
  |         it stays a 2-of-4 divergence.
  |
  v
Phase 152 (Integration, Registry & Navigation-Last Close)
  |       INT-01..INT-06
  |       DELIVERS:
  |         - ONE COMMIT: every new registry row at Status: Approved +
  |             filename-map REGENERATED by its generator + BOTH canary
  |             literals bumped
  |         - Canary targets COMPUTED FROM THE REGISTRY after the rows
  |             land, measured separately (the two count different sets)
  |         - Operations docs get registry + filename-map rows and no
  |             document identifier; they reach the publish bundle
  |             without being C17-gated; the 20 legacy ops docs are NOT
  |             retrofitted
  |         - Navigation wired LAST on both index surfaces
  |         - Recipe #5 hub coverage added in a SUCCESSOR validator
  |         - Full-corpus C17 + link checker green, no accepted-violation
  |             baseline introduced
  |       HARD CONSTRAINTS:
  |         - ALL registry work is ONE phase, ONE commit. Content phases
  |             author documents and never touch the registry. Splitting
  |             this leaves both self-tests red across three phases.
  |         - NEVER hard-code the canary from a document count — that is
  |             exactly how the Approved-row canary sat red for a whole
  |             milestone
  |         - The quick-nav assertion requires EXACTLY ONE matching line
  |             — append a fragment, never split it
  |         - The Firmware H2 must not be the barred literal heading
  |         - Never edit the frozen hub validator; add additively
  |       RESEARCH FLAG: none. One 30-second pre-plan verification: run
  |         the publish bundle end to end against a scratch row pointing
  |         at an unenrolled operations file.
  |
  v
Phase 153 (Harness Close — V120 Pin, C17 Residue & 19th Path-A Bump)
          HARN-01..HARN-06
          DELIVERS:

            - V120 pin INSERTED BEFORE the V14 entry (proved by
                executing the assertion — appending FAILS a check that
                sits inside the apex chain) + both frozen-read exports,
                proven end to end by a real frozen read

            - All FIVE C17-bearing harnesses converted SIMULTANEOUSLY
                via the cwd swap; the contract validator stays
                byte-unchanged and the existence guard stays live

            - 19th Path-A lineage bump + sidecar + BASELINE +
                check-phase-145..152 + the apex, CHAIN range GENERATED
                BY ARITHMETIC, never transcribed (CHAIN_END = 152)

            - The 18th CI workflow BORN with full fetch depth; publish
                bundle regenerated at this milestone's version

            - 3-axis terminal re-audit at ONE shared SHA, all workflows
                dispatched, SKIPS READ AS GAPS from job-level output
          HARD CONSTRAINTS:

            - Always the FINAL phase; never batches with content work.
                Also true by dependency: the apex chains [48..N-1], which
                cannot be authored until the last content phase is fixed

            - Predecessor frozen surfaces byte-unchanged; a later
                validator can pin an earlier one's exact call-site
                string — grep before editing any frozen line

            - Archival drift is a recurring close blocker: scan
                nested-fail children before the push
          RESEARCH FLAG: none — ratified precedent commit exists and the
            pin-placement branch was proved by execution.
```

## v1.21 Requirement Coverage (58/58 mapped — roadmap created 2026-08-19)

| Phase | Requirements | Count |
|-------|-------------|-------|
| 145 | FIX-01, FIX-02, FIX-03, FIX-04, FIX-05, FIX-06, FIX-07, FIX-08, FIX-09, FIX-10, FIX-11, FIX-12 | 12 |
| 146 | DRV-01, DRV-02, DRV-03, DRV-04, DRV-05, DRV-06, DRV-07 | 7 |
| 147 | LNX-01, LNX-02, LNX-03, LNX-04 | 4 |
| 148 | APP-01, APP-02, APP-03, APP-04, APP-05, APP-06 | 6 |
| 149 | BIOS-01, BIOS-02, BIOS-03, BIOS-04, BIOS-11 | 5 |
| 150 | BIOS-05, BIOS-06, BIOS-07, BIOS-08, BIOS-09, BIOS-10, BIOS-12 | 7 |
| 151 | RCP-01, RCP-02, RCP-03, RCP-04, RCP-05 | 5 |
| 152 | INT-01, INT-02, INT-03, INT-04, INT-05, INT-06 | 6 |
| 153 | HARN-01, HARN-02, HARN-03, HARN-04, HARN-05, HARN-06 | 6 |
| **Total** | **58/58 mapped (0 orphaned, 0 duplicated)** | **58** |

**Sequential-on-main-tree execution** per `.planning/config.json` `use_worktrees:false` (durable user constraint). Phase numbering continues from v1.20 (closed at Phase 144) → v1.21 spans Phases 145-153.

**Named decisions (LOCKED at roadmap 2026-08-19):**

- PHASE-COUNT: 9 phases (145-153), following the research-backed and adversarially-reviewed build order in `research/SUMMARY.md` section D verbatim. `config.json` sets no `granularity` key, so the default is standard (4-6); the divergence to 9 is deliberate and is justified by 58 requirements across 8 categories plus two non-negotiable sequencing constraints. Comparable shape is v1.14 (12 phases) rather than v1.19 (4).
- BIOS-SPLIT: Pillar A split 149/150 along the research's suggested seam — 149 = the domain overview + the two native Intune surfaces + DFCI + Surface UEFI (BIOS-01/02/03/04/11); 150 = the three per-OEM guides + the reference matrix (BIOS-05..10, BIOS-12). BIOS-11 (bricking quote + retire-vs-reuse) rides 149 because both are DFCI-surface facts; BIOS-10 (password custody / RBAC) rides 150 because it is the Dell secret-custody path the per-OEM guide owns.
- REGISTRY-ATOMICITY: every registry row, the filename-map regeneration and both canary bumps are INT-01/02/03 in Phase 152, one commit. BIOS-12's matrix is authored in 150 and its registry row lands in 152. Content phases never touch the registry.
- HARNESS-PHASE: Phase 153 is the sole deliverable of the closing cluster (mirrors v1.13 Phase 100 / v1.14 112 / v1.15 119 / v1.16 125 / v1.17 128 / v1.18 134 / v1.19 138 / v1.20 144). Also forced by dependency: the apex chains `[48..N-1]`.
- FIX-FIRST: FIX-01..12 land in Phase 145, the first phase, because every other content phase edits at least one of the five patch-management docs — correcting first means one dated re-stamp per file instead of five phases each re-touching frontmatter and each independently risking the 60-day trap.
- DEPENDENCY-CORRECTIONS-HONOURED: the roadmap does NOT sequence on the three falsified edges (capability-matrix relabel gating the recipe; template mandating the rollback heading; Pillar H urgent on C17 volume). 145→147 is recorded as a soft preference; the real edge 145→152 is recorded as real.
- DISCUSS-PHASE-FLAGS: gray areas are NOT resolved at roadmap — deferred to `/gsd-discuss-phase` + `/adversarial-review` per project convention. Named: the recipe-template promotion decision (151); firmware/BIOS domain naming and file numbering (149); which glossary receives the new terminology (149/152); whether `v1.20-milestone-audit.mjs` is a sixth convertible C17 site (153); the DCU-vs-Autopatch driver-policy conflict, which has no first-party adjudication and is a gray area rather than guidance (146).

## Performance Metrics

**Velocity across milestones:**

- v1.0: 10 phases, 24 plans — shipped 2026-04-10
- v1.1: 9 phases, 18 plans — shipped 2026-04-13
- v1.2: 6 phases, 20 plans — shipped 2026-04-15
- v1.3: 8 phases, 44 plans — shipped 2026-04-19
- v1.4: 9 phases, 40 plans — shipped 2026-04-24
- v1.4.1: 5 phases, 33 plans — shipped 2026-04-25
- v1.5: 14 phases, 101 plans — shipped 2026-05-07
- v1.6: 5 phases (62-66), 30 plans — shipped 2026-05-25
- v1.7: 4 phases (67-70), 15 plans — shipped 2026-05-29
- v1.8: 4 phases (71-74), 13 plans — shipped 2026-06-08
- v1.9: 8 phases (75-82), 19 plans — shipped 2026-06-22
- v1.10: 6 phases (83-88), 16 plans — shipped 2026-06-24
- v1.11: 5 phases (89-93), 13 plans — shipped 2026-06-26
- v1.12: 2 phases (94-95), 5 plans — shipped 2026-06-26
- v1.13: 5 phases (96-100), 14 plans — shipped 2026-06-29
- v1.14: 12 phases (101-112), 38 plans — shipped 2026-07-02
- v1.15: 7 phases (113-119), 40 plans — shipped 2026-07-06
- v1.16: 6 phases (120-125), 38 plans — shipped 2026-07-10
- v1.17: 3 phases (126-128), 11 plans — shipped 2026-07-11
- v1.18: 6 phases (129-134), 17 plans — shipped 2026-07-20
- v1.19: 4 phases (135-138), 12 plans — shipped 2026-08-04
- v1.20: 6 phases (139-144), 44 plans — shipped 2026-08-18
- v1.21: 9 phases (145-153) — roadmap created 2026-08-19, not yet planned

**Per-Plan Metrics (v1.19, most recent shipped milestone):**

| Plan | Duration | Tasks | Files |
|------|----------|-------|-------|
| Phase 135 P01 | 12min | 3 tasks | 6 files |
| Phase 135 P02 | 38min | 4 tasks | 1 files |
| Phase 136 P01 | 45min | 3 tasks | 2 files |
| Phase 136 P02 | 55min | 4 tasks | 1 files |
| Phase 137 P01 | 4min | 4 tasks | 9 files |
| Phase 137 P02 | 4min | 3 tasks | 2 files |
| Phase 138 P01 | 3min | 2 tasks | 1 files |
| Phase 138 P02 | 4min | 2 tasks | 3 files |
| Phase 138 P03 | 20min | 3 tasks | 5 files |
| Phase 138 P04 | 25min | 3 tasks | 0 files |
| Phase 138 P05 | 20min | 2 tasks | 1 files |
| Phase 138 P06 | 35min | 3 tasks | 7 files |
| Phase 139 P01 | 16min | 3 tasks | 8 files |
| Phase 139 P02 | 8min | 3 tasks | 2 files |
| Phase 139 P03 | 25min | 2 tasks | 5 files |
| Phase 139 P04 | 63min | 2 tasks | 3 files |
| Phase 139 P05 | 15min | 2 tasks | 17 files |
| Phase 139 P06 | 25min | 2 tasks | 1 files |
| Phase 140 P01 | 30min | 2 tasks | 3 files |
| Phase 140 P02 | 97min | 4 tasks | 3 files |
| Phase 140 P03 | 20min | 3 tasks | 8 files |
| Phase 140 P04 | 20min | 3 tasks | 9 files |
| Phase 140 P05 | 25min | 3 tasks | 2 files |
| Phase 141 P01 | 15min | 2 tasks | 5 files |
| Phase 141 P02 | 35min | 2 tasks | 2 files |
| Phase 141 P03 | ~50min | 3 tasks | 5 files |
| Phase 141 P04 | 65min | 4 tasks | 9 files |
| Phase 141 P05 | ~90min | 2 tasks | 3 files |
| Phase 141 P06 | ~45min | 2 tasks | 4 files |
| Phase 142 P01 | ~25min | 3 tasks | 7 files |
| Phase 142 P02 | ~9min | 2 tasks | 1 files |
| Phase 142 P03 | 25min | 3 tasks | 2 files |
| Phase 142 P04 | 26min | 3 tasks | 2 files |
| Phase 142 P05 | 35min | 2 tasks | 2 files |
| Phase 142 P06 | 45 min | 2 tasks | 1 files |
| Phase 143 P01 | 35min | 2 tasks | 4 files |
| Phase 143 P02 | ~40min | 3 tasks | 6 files |
| Phase 143 P09 | ~3h | 3 tasks | 35 files |
| Phase 143 P03 | 45min | 3 tasks | 16 files |
| Phase 143 P04 | ~20min | 3 tasks | 8 files |
| Phase 143 P05 | ~25min | 2 tasks | 13 files |
| Phase 143 P06 | 20min | 3 tasks | 3 files |
| Phase 143 P07 | ~45min | 3 tasks | 11 files |
| Phase 143 P08 | ~35min | 2 tasks | 3 files |
| Phase 144 P01 | 5min | 2 tasks | 2 files |
| Phase 144 P02 | 13min | 3 tasks | 5 files |
| Phase 144 P03 | ~50min | 3 tasks | 3 files |
| Phase 144 P04 | ~35min | 3 tasks | 3 files |
| Phase 144 P05 | ~40min | 2 tasks | 2 files |
| Phase 144 P06 | ~5min | 3 tasks | 5 files |
| Phase 144 P07 | 35m | 3 tasks | 2 files |
| Phase 144 P08 | 45min | 3 tasks | 5 files |
| Phase 144 P09 | ~30min | 2 tasks | 2 files |
| Phase 144 P10 | ~30min | 2 tasks | 1 files |
| Phase 144 P11 | 45min | 2 tasks | 2 files |
| Phase 144 P12 | 15min | 3 tasks | 5 files |
| Phase 145 P01 | 12min | 2 tasks | 2 files |
| Phase 145 P02 | 20min | 1 tasks | 1 files |
| Phase 145 P04 | 35min | 3 tasks | 4 files |
| Phase 145 P05 | 25min | 2 tasks | 32 files |
| Phase 145 P03 | 25min | 1 tasks | 1 files |
| Phase 147 P01 | 75 min | 3 tasks | 1 files |
| Phase 147 P02 | 35 min | 3 tasks | 3 files |
| Phase 148 P01 | ~50min | 4 tasks | 2 files |
| Phase 148 P02 | ~45min | 4 tasks | 2 files |
| Phase 148 P03 | ~55min | 3 tasks | 2 files |
| Phase 148 P04 | 8 min | 2 tasks | 1 files |
| Phase 148 P05 | 25min | 3 tasks | 2 files |
| Phase 149 P01 | 33 min | 3 tasks | 2 files |
| Phase 149 P02 | 4 min | 3 tasks | 2 files |
| Phase 149 P03 | 34 min | 3 tasks | 1 files |
| Phase 149 P04 | 32 min | 3 tasks | 1 files |
| Phase 149 P05 | 1h 5m | 3 tasks | 1 files |

## Accumulated Context

### Decisions

**v1.21 roadmap decisions (LOCKED 2026-08-19):** see "Named decisions" above. *(v1.20's are archived in `.planning/milestones/v1.20-ROADMAP.md`.)*

**Carried-forward durable architectural decisions (from v1.14–v1.19):**

- Sequential-on-main-tree per `use_worktrees:false`; atomic harness commits (Atom 1 + Atom 2); frozen-aware via `_lib/frozen-at-close.mjs`; non-current-milestone predecessor frozen surfaces BYTE-UNCHANGED except explicitly-scoped exceptions (D-00a doctrine) — v1.20 is the milestone that finally converts the broad predecessor cohort, per its own GOV-01 CARVE, not a blanket exception
- WINDOWS-CLONE-DEEPNEST-TIMEOUT-01: Linux GHA BOTH chain validators authoritative (D-03 corrected OS split, held v1.12–v1.19); the within-apex curve is healthy (~17s, 93/0/0 at HEAD) — v1.20's NEST-01 (Phase 142) is the COLD-CLONE curve specifically, kept distinct per `v1.19-DEFERRED-CLEANUP.md:252`'s explicit non-collapse rule. **[DISCHARGED, D-15]** The `~17s`, 93/0/0 figure above is CORRECT and grandfathered by `141-EVIDENCE.md:276-281` — not amended, only discharged as satisfied.
- Adversarial-review invoked at discuss-phase for gray-area scoping decisions (per user memory `feedback_adversarial_review_preference.md`)
- V117/V118 pin recovery precedent (carries to V119, Phase 144): recover the close-gate SHA via the subject-line pair discriminator `git log --all --format="%H|%s" | awk -F'|' '$2 ~ /vX\.Y/ && $2 ~ /MILESTONE CLOSE/'`, count=1 — NOT the dual-token `--grep --all-match` form, which returns multiple candidates
- A later check-phase-N validator can pin an earlier check-phase's EXACT call-site string verbatim — grep before editing any frozen validator line (memory `reference_frozen_callsite_pinning.md`); this is the literal shape of GOV-02 and the RED-07/check-phase-68 guard
- Archival-drift close blocker: `complete-milestone` archiving `.planning/phases/NNN/` can break predecessor check-phase validators reading hardcoded `phases/` paths — scan nested-fail children pre-push at Phase 144's close-gate (recurs every close per memory `reference_archival_drift_close_blocker.md`)
- `.planning/REQUIREMENTS.md` must not be deleted at milestone close — `check-phase-54.mjs` live-reads it outside the frozen-at-close mechanism (memory `reference_complete_milestone_keep_requirements.md`)

*(Full v1.0–v1.19 execution-decision logs are archived in `.planning/milestones/vX.Y-MILESTONE-AUDIT.md` and `.planning/MILESTONES.md`.)*

- [Phase ?]: D-09 amendment check needs a genesis-commit exemption (git show --name-status 'A' / working-tree '??') so the bootstrap commit landing CARVE+gate+ledger together does not self-trip the amendment rule
- [Phase ?]: Pre-existing untracked docs/graphify-out/ cache pollution (unrelated skill output) blocked carve-gate.mjs verification; fixed via one .gitignore line, not a frozen-surface edit
- [Phase ?]: SWEEP-04 landed: lsTreeAtClose + 16 convenience exports + frozenCause (six-pattern classifier, cause at FRONT of err.message) + --self-test (6/6, incl. real file:// shallow-clone arm) added to _lib/frozen-at-close.mjs; D-42 blast-radius gate confirmed zero drift across all 21 real importers and the full apex (93/0/0)
- [Phase ?]: SWEEP-03 landed: four fail-loud frozen-read sites (check-phase-49.mjs V-49-18/19/21, check-phase-51.mjs readTreeFrozen) delete their inline try/catch so the throw propagates to the runner's outer catch; proven end-to-end by a real file:// shallow-clone negative harness (7/7 assertions) and a D-42 region-scoped V-68-01 gate
- [Phase ?]: Verification-method note: bare check-phase-68.mjs has pre-existing 24 PASS/9 FAIL (standalone-red chain members 48/60-66, Phase 141-142 scope) unrelated to this plan's edit -- use CHECK_PHASE_NESTED=1 to confirm V-68-01/10/11
- [Phase ?]: Phase 139 Plan 04: converted V-69-08/V-70-17 to frozen-to-frozen blob comparison (D-18/D-19/D-20/D-22), proven immune to a dirty edit on any of the three SWEEP-01 workflows -- unblocks Plan 05's fetch-depth retrofit
- [Phase ?]: Phase 139 Plan 05: swept all 97 previously-shallow checkouts across 16 workflows to fetch-depth:0 (182/182 deep, adjacency-verified), added .github/workflows/** to the base paths filter (D-17), and added one dependency-free frozen-read-probe job per workflow (D-24, no needs:) exercising a real readAtV15Close + lsTreeAtV15Close(34 entries) -- landed as one D-41 atom-5 commit; check-phase-66/69/70 (nested) and the top-level apex all green
- [Phase ?]: 139-06: Owner pre-authorized push+dispatch in advance; Task 2's blocking checkpoint still honored as a real gate (halted, no self-approval) — orchestrator independently re-verified origin/master, branch head, and all 16 frozen-read-probe conclusions before approving
- [Phase ?]: 139-06: Branch phase-139-atom-5 kept (not deleted) until Phase 144 close audit, per owner instruction
- [Phase ?]: 139-06: Recorded (not fixed) a job-name filter trap in the plan's own verify command — .jobs[].name is the display name, not the YAML job key frozen-read-probe; flagged for Phase 144 close audit
- [Phase ?]: 140-01: Scope amendments (D-13/D-14 v1.4-v1.18 range, D-09 SC#2 evidence path, D-26 SC#3 skip-vs-pass reconciliation) landed alone as the D-30 amendment-first prerequisite; GOV-02 pre-edit census confirmed zero exact-line-index pins across 13 validators
- [Phase ?]: 140-01: Recorded (not fixed) an environment limitation — frozen-at-close.mjs --self-test measures 5/6 PASS on this machine (shallow-clone assertion times out against a slow git object store, confirmed via git count-objects -v exceeding 100s), same hazard class as WINDOWS-CLONE-DEEPNEST-TIMEOUT-01/NEST-01, out of Phase 140 scope
- [Phase ?]: 140-02: V14 pinned to 0b3be9ab with full rationale (rejected candidates b5cf529/671f72a recorded, not deleted); readManyAtClose/createFrozenCorpusReader batched-reader library layer built and proven byte-identical to readAtClose; v1.4 tracer harness fully converted + SWEEP-07 sentinel backport landed, 5/0/0; measured correction to RESEARCH.md D-18 (v1.4 frozen scope 26 vs 33 live files, not identical)
- [Phase ?]: v1.4.1 discovered fully green (8/0/0) after conversion — undetermined going in per plan, recorded as measured not assumed
- [Phase ?]: Treated plan's literal 'grep -c audit-allowlist.json returns 0' acceptance text as testing the wrong shape; verified sidecar literal byte-identical across the diff instead, matching Plan 02's own tracer precedent
- [Phase ?]: Phase 140 Plan 04: converted the final 8 of 16 in-scope harnesses (v1.11-v1.18); Family C remainder (v1.11-v1.14) fully green, Family D (v1.15-v1.18) converts 4 of 5 chokepoints with the C17 contract-presence guard deliberately left live-HEAD, owned by Phase 143; sixteen-of-sixteen completeness confirmed, v1.19 untouched; SWEEP-05 correctly stays Pending (spans Phase 140+144 per its own amended text)
- [Phase ?]: 140-05: SWEEP-06 evidenced on the non-apex path (sixteen wall-clock figures under budget + V-60-23 verbatim PASS); apex is structurally blind to this criterion (D-09 NESTED-guard short-circuit)
- [Phase ?]: 140-05: Corrected 140-CONTEXT.md D-18's 'identical sets' claim -- measured per-harness coverage delta widens from 2 dropped files at v1.18 to 115 at v1.4
- [Phase ?]: 140-05: Stop-hook (.claude/hooks/v1.20-carve-gate.cjs) hardened to fail open with a diagnostic on any unparseable gate result rather than emit a hard-block message on a passing tree; enforcement semantics (D-10) unchanged
- [Phase ?]: 140-05: SWEEP-05/SWEEP-06 left Pending in REQUIREMENTS.md -- both span Phase 140 and Phase 144 (v1.19 harness conversion), flip together at Phase 144 close
- [Phase ?]: 140-05: Owner approved phase close -- all four checkpoint items (budget evidence, three discovered harness outcomes, coverage-delta table, C17-deferred-to-143 limitation) accepted as framed, incl. the warm-cache-only measurement gap
- [Phase ?]: 141-01: Applied [SUCCESS-CRITERION AMENDMENT, D-28] bracket marker to SC#2/SC#4/SWEEP-09/Discuss-phase-flags, annotating and superseding rather than deleting original wording
- [Phase ?]: 141-01: SC#1 marked [DISCHARGED, D-29] rather than amended-as-false — satisfied, not falsified, preserving evidence the ratified ordering was correct
- [Phase ?]: 141-01: CARVE Category 5 header count corrected fifteen->sixteen only after confirming zero grep hits on the literal phrase across scripts/ and .github/
- [Phase ?]: 141-02: Rebased all 9 BASELINE_9 coordinates to live descendants (re-verified against live content, not the research file, per D-31); recorded the cobo.md 1-to-2 cardinality change honestly rather than claiming a bijection; classify() and v1.7-audit-allowlist.json byte-unchanged; self-test and bare check-phase-48/60/61 all green; nested pre-SWEEP-09 baselines recorded for check-phase-68/70 (12/0/21, 23/0/28) for Plan 03/Phase 142
- [Phase ?]: 141-03: SWEEP-09 lands 13 sites (check-phase-61 reader delegation + 12 chicken-and-egg call-sites in 68/70); check-phase-67's 7 sites deferred to Phase 144 per D-12. Discovered check-phase-70's nested tally diverges post-edit (23/5/23 vs pre-edit 23/0/28) -- 5 sites read documents genuinely absent at aa6de68 (authored later in Plan 70-05); recorded as the new RED-07 baseline for Phase 142, not silently reconciled, per the plan's own flagged_assumptions license.
- [Phase ?]: 141-04: Halted Task 1 per its own halt instruction on non-zero-FAIL bare check-phase-68 (926520ms/exit1); owner ratified Task 1a scope extension aligning check-phase-68/69/70's subEnv to unconditional CHECK_PHASE_NESTED propagation (14-validator precedent), dropping the bare floor to 42633ms/exit0 (33/0/0) -- new Phase-142 RED-07 baseline
- [Phase ?]: 141-04: Landed D-17 chain-spawn timeout raises (check-phase-66.mjs:318, check-phase-67.mjs:261, 300000->1800000ms) and enabled if:always() on all 29 CI fan-out jobs across audit-harness-v1.5/6/7-integrity.yml; sized check-phase-67's job cap to 60min (derived, unaffected by Task 1a) while leaving check-phase-68/69/70 at their existing 15min (now sufficient post-Task-1a, owner-ratified departure from the plan's original blanket-raise acceptance text)
- [Phase ?]: 141-05: RED-01 nine-harness evidence re-executed this session (v1.5=12/0/0, v1.6-v1.13=15/0/0 each), zero glossary edits; RED-03 form (a) 141-sweep.ps1 ascending bare sweep of check-phase-{48,60,61,62,63,64,65,66} all exit 0/0-FAIL/non-zero-PASS warm-cache, form (b) check-phase-66.mjs --verbose all 18 V-66-CHAIN-N (48-65) PASS in composition; false-green trap + grandfather clause + Phase-142 handoff written into 141-EVIDENCE.md
- [Phase ?]: 141-06: First-ever CI fan-out dispatched at shared SHA 275bbad1 (owner pre-authorized 99-commit push publishing Phases 139-141 + all 16 workflow dispatch); all 41 jobs across 3 runs green (2 legitimate rotting-external-quarterly schedule-guard skips, zero content/timeout/environment reds); all 23 check-phase-NN validators including first-ever CI execution of check-phase-67 pass with 0 FAIL
- [Phase ?]: 141-06: SWEEP-09 flipped Pending->Complete on the strength of the CI-Linux confirmation of the 13 landed reader-site fixes (check-phase-61 34/0/0, check-phase-68 33/0/0, check-phase-70 51/0/0 bare/standalone, first-ever measurement for -70); RED-01/02/03 already Complete from Plan 05. No requirement set to Validated -- reserved for Phase 144's single close-gate commit per D-30
- [Phase ?]: 142-01: Commit message must never literally quote v1.20-CARVE.md in prose — git show --name-only HEAD includes the message body, and the plan's own CARVE-exclusion check greps that combined output
- [Phase ?]: 142-01: markdown table separator rows need a space after each leading pipe (| --- | not |---|) when a downstream grep -c '^| ' acceptance check counts the separator as a row
- [Phase ?]: 142-02: Commit message names CARVE/check-phase-138 but never spells out the literal amended-file path, applying Plan 01's lesson that git show --name-only prints message-then-files
- [Phase ?]: 142-02: Rationale comment above the new check-phase-138.mjs glob line repeats the filename literally once (matching the check-phase-67.mjs precedent), satisfying the plan's grep -c == 2 acceptance criterion by design
- [Phase ?]: V-30-01's row-count leg carries the anti-vacuity weight for RED-04 (D-04) — the token-count leg alone would pass with the Routing Verification table deleted
- [Phase ?]: V-30-10's root cause is 600eabd6 (Phase 40-01, v1.4 Android enum addition), not Phase 114 D-07 (D-06)
- [Phase ?]: V-31-29 required BOTH the wc -l metric fix AND the documented-target band re-derivation (+31 EEE-retrofit delta, then re-applied +/-15%-per-endpoint rule) -- RESEARCH.md's originally-recommended KNOWN_EXCEPTION/continue exemption was rejected as vacuous (D-24)
- [Phase ?]: V-31-23 needs its own resolveArchivedPhasePath call site (not a reuse of parseInventory()'s) and a presence-only content anchor (never uniqueness) replacing the brittle lines[181] index, since the target prose relocated during Phase 122's EEE reorganization but is byte-identical (D-20/D-21/D-22/D-23)
- [Phase ?]: RED-06: CHAIN_EXTRA=[30,31] sidecar adopts check-phase-30/31 into apex chain, excluded from arithmetic span guards (D-11); apex flips 93->95 PASS
- [Phase ?]: NEST-01: cold-clone/warm ratio measured at 1.333x (22720ms/17044ms, n=3 each, full-depth clone), well under the 8x fail threshold — PASS
- [Phase ?]: 143-01: D-29 seven-surface SC amendment + CARVE Category 10 (63-path anchor-remedy roster, D-32/D-38) landed as two separate commits per D-31; reconciled a premature D-28 marker on the Discuss-phase-flags line (from an earlier plan-authoring commit) by appending a D-29 cross-reference rather than overwriting
- [Phase ?]: 143-02: D-38 owner ruling recorded (convert all 87 {#id} overrides, not just 22 targets) and evidence artifact opened; GitHub anchor model landed as a net deletion + one <a id> matchAll addition, proved end-to-end on the 0x80180014 tracer; docs/_templates/ exclusion + inline-code masking narrowed the corpus scan to 274 files/6252 links/13 broken file targets; a Rule-1 deviation converted 2 hub-linked {#id} headings early to keep the hub-scope scan green (2 of D-38's 87, Plan 09 does the remaining 85)
- [Phase ?]: 143-09: D-38 all-87 {#id}-to-<a id> conversion landed (85 this plan + 2 Plan 02 early); discovered+fixed check-phase-51/52/54.mjs validator conflicts (2 CARVE Category 5 amendments, D-09); cleaned up 47 pre-existing duplicate anchors; measured zero-regression dry-run (74->50 pairs, 0 added), apex 95/0/0
- [Phase ?]: 143-03: Located every Task 2 edit by link text/target, not the plan's cited pre-conversion line numbers -- one citation was already stale relative to the plan's own projection
- [Phase ?]: 143-03: Two admin-setup-macos self-links (K-1/K-5) confirmed to target a bold-lead blockquote, not a heading -- degraded to plain text instead of an empty () link target
- [Phase ?]: 143-03: LINK-04 NOT marked complete -- it is a multi-plan requirement (also in Plans 04/05/06 frontmatter) discharged only when the corpus-wide checker exits 0; 49 broken anchors remain after this plan
- [Phase ?]: 143-04: Measured the live 49-broken-anchor dry-run directly rather than reconstructing from prior plans' narrative figures -- 38-pair/49-link split reconciles the 51/67 post-conversion invariant exactly
- [Phase ?]: 143-04: All 4 contested D-05 pairs confirmed against live files this session (entra/edit-without-view-dependency-table->Class B via rule 1, byod->Class B via exclusion 2, aosp remains Class D)
- [Phase ?]: 143-05: All 8 Class-B pairs (13 links) rewritten source-side to heading-derived true GitHub slugs, each re-confirmed live against the target heading before editing
- [Phase ?]: 143-05: Dry-run reaches 0 broken file targets / 0 broken anchors / 0 total; 51-pair/67-link post-conversion ledger built and closed (D 12/16, C 31/38, B 8/13), reconciling to the 77-pair/132-link original defect census
- [Phase ?]: 143-05: Recorded (not chased) a measured 6250 vs carried 6252 relative-link discrepancy per D-36 -- file count matches exactly, this plan's edits confirmed link-count-neutral
- [Phase ?]: GOV-02 row appended pre-edit-census-only (row modeled on Plan 09's precedent) to satisfy both the append-before-edit rule and the append-only ledger discipline
- [Phase ?]: checkOutboundLinks per-link loop retired entirely (not kept redundant); checkInboundLinks now covers the hubs' outbound links as corpus-wide source
- [Phase ?]: Summary line buckets reworded to hub-presence/corpus-link while keeping the check-nav-hub-links summary: prefix byte-identical for Phase 144's needle-spec
- [Phase ?]: 143-07: All 15 fence-mask sites unified under ^ {0,3} CommonMark rule (14 JS + 1 PowerShell tightening); LINK-06's four legs measured (46/0/0 mask-diff, 0 Summary hits); D-20 out-of-census residual routed to Plan 08
- [Phase ?]: 143-07: Compressed provenance comments from 3-line to plan-specified one-line form in a self-caught follow-up commit (e9a505be)
- [Phase ?]: 143-08: Corrected D-25's stated 10-of-16 zero-docs-path-filter workflow figure to a measured 13-of-16 (D-36 discipline); needle-spec + 3 DEFERRED-CLEANUP rows route the check-phase-143.mjs hand-off to Phase 144, decoupled via HARN-19's sub-second spot-check
- [Phase ?]: 144-01: Category 11 amendment landed alone-and-first with 10 literal paths (no glob), pattern-level proof recorded in new 144-EVIDENCE.md ledger
- [Phase ?]: 144-02: V119 pinned as the abbreviated form 'a7bda73e' between V118 and V14 (V14 stays last); readAtV119Close/lsTreeAtV119Close exported; the one carved :10-13 comment correction landed alongside (D-31)
- [Phase ?]: 144-02: v1.19-milestone-audit.mjs converted to frozen-aware reads via createFrozenCorpusReader('V119', ...) following the v1.18-converted exemplar literally; C17 leg stays live-HEAD (5-of-5 residue, SWEEP-05 D-02 amendment)
- [Phase ?]: 144-02: SWEEP-06 measured, not inferred -- seventeenth harness median 1,260ms across 3 runs, 4.75x faster than Phase 140's slowest-of-sixteen (4,177ms), 97.9% headroom under the 60,000ms check-phase-60.mjs budget
- [Phase ?]: 144-03: Landed check-phase-67.mjs's remaining 10 fail-loud sites (7 return flips + 3 accumulator restructures V-67-01/03/06), verified the 7-plus-3 classification empirically against real aa6de68 content, proved both fix classes with a scratchpad negative harness outside the working tree; check-phase-73's four-literal pin and apex-138 (95/0/0) both confirmed green; HARN-18 stays Pending per D-24 single-close-gate-flip rule
- [Phase ?]: check-phase-140.mjs glob-matches the harness directory at runtime rather than hard-coding a file list, so the 17th harness's filename never appears contiguously in source while still counting toward the lower bound
- [Phase ?]: check-phase-141.mjs pins measured occurrence counts (9/2/11) rather than estimated ones after the leaf's own first standalone run caught a miscount
- [Phase ?]: check-phase-142.mjs hosts the NEST-01 cold-clone ratio threshold as its own literal since 142-EVIDENCE.md is off-limits to leaf runtime reads (D-15)
- [Phase ?]: Both new leaves scope required-ABSENT substring scans to non-comment code lines after the target files' own explanatory headers tripped false FAILs
- [Phase ?]: 144-06: Copy source for the 18th harness is v1.19's pre-conversion form (git show at the commit before Plan 02's frozen-aware conversion), so the new generation reads its own live corpus rather than v1.19's frozen one
- [Phase ?]: 144-06: c13_rotting_external recursive-vs-naive trap measured directly: naive top-level-arrays-only walk (skipping the object) finds 16 distinct docs/ files; recursing into its 3 nested arrays reaches the true 33
- [Phase ?]: 144-06: BASELINE_24 appended at the chronological end of the comment chain (after the Phase 141 addendum), not immediately after BASELINE_23's own forward-reference line, matching the file's established append order
- [Phase ?]: CHAIN_EXTRA disjointness guard declared immediately after CHAIN_EXTRA itself, grouped with but structurally distinct from the three CHAIN_PHASES-only guards that precede it
- [Phase ?]: Archive-root token 'v1.20-phases' asserted as a bare literal-string constant passed to the resolver, satisfying both the grep acceptance criterion and the D-15 replacement guardrail
- [Phase ?]: 144-08: followed 144-PATTERNS.md's verbatim five-entry paths: filter over PLAN.md's stated six-entry acceptance criterion (documented conflict, arithmetic reconciled in 144-EVIDENCE.md)
- [Phase ?]: 144-09: Ten standalone-red validators re-run fresh at HEAD (all exit 0), Class-1 archival-drift static census confirms zero survivors reading phases 139-144, working-tree hygiene ruled out-of-scope, freshness pre-flight fresh (139 ahead / 0 behind), phase-139-atom-5 audited and left untouched -- halted at the owner push/dispatch/branch-disposition checkpoint
- [Phase ?]: 144-10: D-22 remediation round recorded in full (first dispatch 32aaae63 16/17 green, v1.20 failed 3 jobs one root cause check-nav-hub-links.mjs self-test case G host-dependent fixture, fix 2858c0b5, second dispatch 2858c0b5 17/17 green -- the one round D-22 authorizes, succeeded)
- [Phase ?]: 144-10: Corrected pre-task briefing's 16 pin-helper-advisory figure to a measured 17 (one per workflow incl. base) per D-36 measure-don't-carry discipline
- [Phase ?]: 144-10: Axis-3 obtained as a disclosed same-host independent-clone proxy (no agent-dispatch primitive in this session's toolset), following the exact v1.19 Plan 138-04 honesty precedent -- routed to the Task 3 human checkpoint for an explicit call on whether it satisfies HARN-19's Axis-3 bar
- [Phase ?]: Split the milestone close across two plans: 144-11 authors the audit + absorb-and-append deferred-cleanup record, 144-12 lands the atomic 28-requirement flip
- [Phase ?]: Recorded a fourth Axis-3 measurement (genuinely dispatched context-independent agent, apex leg incomplete, owner-attributed to WINDOWS-CLONE-DEEPNEST-TIMEOUT-01) directly in v1.20-MILESTONE-AUDIT.md per the plan's supplied evidence
- [Phase ?]: Closed CARVE-1 and C17-VS-PIPELINE-FENCE-MASK-DIVERGENCE in v1.20-DEFERRED-CLEANUP.md Part C, each with its residue named as a distinct open item rather than double-booked
- [Phase ?]: 144-12: Publish bundle regenerated with explicit --version=v1.20 before the close-gate flip, per D-29 ordering
- [Phase ?]: 144-12: Single atomic close-gate commit flipped all 28 v1.20 requirements to Validated across PROJECT/ROADMAP/STATE/REQUIREMENTS, corrected SWEEP-06/SWEEP-09 traceability cells to two-phase form, removed both accepted-red watch items from STATE.md
- [Phase ?]: 144-12: Post-close-gate apex confirmed 100/0/1 (correct pre-144-VERIFICATION.md triple), check-phase-54 exits 0 after the rewrite, recorded as a separate non-gate commit
- [Phase ?]: V-59-14 converted to a frozen v1.5-close read (readAtV15Close); V-59-02/13/34 stay live per D-34
- [Phase ?]: co-management/03 Autopatch ring parenthetical corrected to (Test and Last), five-word swap only per D-50
- [Phase ?]: 145-02: Singularised all three live "Autopatch rings" C11 hits to zero (D-13) rather than substituting an allowlisted keyword
- [Phase ?]: 145-02: Deleted the standalone mutual-exclusion paragraph outright (D-51) rather than rewording it, since it was the sole C11 keeper for the L83 plural hit
- [Phase ?]: 145-02: Combined FIX-01 (cohort names) and FIX-02 (containment position) into one rewritten Autopatch-ring bullet with a single shared Source citation, since both facts come from the same first-party page
- [Phase ?]: 145-02: Retained the coined WUfB deployment ring compound verbatim; normalised bare WUfB ring(s) shorthand into that compound rather than fully renaming, and left the [Windows WUfB Rings] link label + sibling filename untouched per D-42
- [Phase ?]: 145-02: OfferPrograms recategorised (never deleted) at both sites as a Beta-dictionary beta-enrolment key per D-52
- [Phase ?]: 145-04: rewrote every downstream restatement of the macOS Apple-OS-26 timing (not just the primary blockquote) to avoid internal contradiction after the two-stage correction
- [Phase ?]: 145-04: FIX-04's rename is a no-op in 02-macos/03-ios/04-android — the WUfB census's 2 tokens per file are link-label text, out of D-42 scope
- [Phase ?]: 145-04: Android Oct 31 2026 date re-fetch reproduced the exact quote; used direct citation (D-25 superseded) not the attribution fallback
- [Phase ?]: FIX-11: CI-3 had zero surviving corpus occurrences after stripping .planning/ paths; inlined its substance from archived v1.6 PITFALLS.md (commit 78be4743) into the glossary's Terminology Usage Notes
- [Phase ?]: FIX-09: check-phase-49.mjs's V-49-10 hard-pinned the superseded Ubuntu 20.04/22.04/24.04 version list; updated the pin in the same commit per the file's own documented same-commit-validator-update convention
- [Phase ?]: Singularised every Autopatch-cohort reference instead of inserting an allowlisted C11 keyword, so the plural anti-pattern is structurally gone rather than merely tolerated (D-13)
- [Phase ?]: Kept the PITFALL-9 label on both the disambiguation blockquote and the migration-step paragraph while replacing the exclusivity claim with the containment position (D-55)
- [Phase 147]: 147-01: LIN-DEFER-01 NOT discharged by Phase 147 — the v1.5 Bash custom-compliance deep-dive promise stays open (D-43)
- [Phase 147]: 147-01: STACK.md:478 flagged for correction — incomplete Ubuntu Pro figures (missing 50-machine community tier and 15-year Legacy tier) and wrong verification target for the attach command (D-16, D-17)
- [Phase 147]: 147-01: sibling routing blockquotes in 01/02/03/04 now silently omit Linux — knowingly accepted, blast radius locks edits to 00-overview.md only (D-49)
- [Phase 147]: Related Resources gains the Linux entry LAST: the list's 01,06,02,03,04 order is Windows-adjacency, not file number, and Linux has no Windows adjacency to dock against
- [Phase 147]: The 00-overview.md conditional date re-stamp FIRED — commit 1 landed 2026-08-21, so both stamps advanced together to 2026-08-21 / 2026-10-20, interval 60 by arithmetic
- [Phase 147]: Windows Deferral mechanism table cell left stale against the corrected D-73 prose — accepted add-alongside debt, one table row deep; promote only if a phase must answer which deferral applies from the table
- [Phase 148]: Squashed the four task-level commits into one final commit to satisfy the plan's D-65 single-commit contract and its literal git-log acceptance criterion — GSD executor protocol mandates atomic per-task commits, but the plan's own acceptance criteria require git log -1 to show exactly the two files_modified paths; reconciled via git reset --soft after all task-level criteria passed individually
- [Phase 148]: Reached the Autopilot device-preparation quotes via the public MicrosoftDocs/memdocs GitHub repo directory listing rather than guessing a Learn slug — The device-preparation doc tree is public (unlike the -pr repos the rest of this phase's pages sit in); cross-verified against the live rendered Learn page
- [Phase 148]: Plan 148-02: shipped 08-windows-app-updates.md in a single authoring pass with one commit (D-65 contract); omitted PerpetualVL2021 from the channel table with a covering sentence; re-fetched WinGet Configuration and add-microsoft-store live, confirming preview status and closing the last PREMISE row.
- [Phase 148]: Squashed plan 03's Task 1 commit plus Task 2/3 changes into one final docs(148): commit, matching D-65's commit-3-of-3 contract — Task 1 was first committed standalone with a mis-scoped message; git reset --soft to pre-plan HEAD and recommit combined all three tasks' work into the phase's established single-commit-per-plan convention
- [Phase 148]: Documented (not silently fixed) two stale acceptance-criteria baselines in 148-03-PLAN.md rather than altering pre-existing, out-of-scope 00-overview.md content — The plan's banned-substring and negative-battery counts assumed a pre-edit baseline of 0/1 that the actual file (carrying prior-phase content) does not have; forcing the counts down would require rewording table/prose this plan is explicitly barred from touching
- [Phase 148]: Cadence-conflict citation gap closed: copied 08:96's Source line verbatim after re-confirming both quotes and the rendered date live — 148-VERIFICATION.md found APP-03's two quotes uncited; the fix was a single additive Source line, not a re-plan
- [Phase 148]: Removed the unsupported settings-count comparison clause rather than re-citing it — No Microsoft Learn page supports the claim; a replacement citation would add a new URL/link-check surface for a claim no reader acts on (148-05, matches 148-REVIEW.md CR-01)
- [Phase 148]: Filed WR-01/WR-02/WR-04 to REQUIREMENTS.md backlog instead of editing 00-overview.md — 00-overview.md is prohibited from being opened by this plan; each bullet carries measured coordinates, an authoring commit and a Trigger (148-05)
- [Phase 149]: D-22 discharged: the firmware/BIOS directory is firmware-bios/ — BIOS-01 states the path literally and requirement text is the authority over advisory architecture research; firmware-governance/ and bios-management/ declined
- [Phase 149]: The Lenovo RBAC/logging/rotation comparison ships as labelled corpus inference, never as a Lenovo attribution — 149-RESEARCH.md Pitfall 8 confirms zero hits for only vendor, RBAC, logging and rotation on both fetched Lenovo pages; attributing it would be this milestone's third fabricated citation
- [Phase 149]: Both firmware-bios files landed in ONE commit so the bidirectional cross-link never dangled — D-28: with reciprocal links, either commit ordering strands one direction and takes check-nav-hub-links to a corpus-link failure
- [Phase 149]: Checkpoint ruling four-channel: all four Autopilot registration channels classified against DFCI's eligibility gate (CSV upload and Get-WindowsAutopilotInfo -Online disqualify; OEM direct and Partner Center / CSP partner qualify), plus the explicit APv2 no-DFCI statement — Human gate 2026-08-24 confirming D-05's owner ruling; the three-path reading would tell a CSP-purchase reader DFCI is unavailable when the source says it is available, and that failure mode is unrecoverable hardware spend
- [Phase 149]: The six-OEM staleness superlative ships scoped as the oldest Microsoft Learn page cited in this guide, not as D-13's internal Pillar-A label — Pillar has zero occurrences anywhere in docs/ and is undefined for the reader; the shipped scope is narrower than the barred milestone-wide claim and independently checkable against the guide's own five Learn citations
- [Phase 149]: The ship-or-route rule's honest count ships as 'about a dozen' after measuring 11 distinct setting names in the file, not the plan's 'roughly ten'
- [Phase 149]: Trap 1's evidence line cites configure-dfci-windows — the live fetch located the Conflicts section and the allow-only-Wi-Fi worked example there, not on ref-dfci-settings-windows
- [Phase 149]: The boot-and-port generic recovery Warning is on ref-dfci-settings-windows (same page as the compliance half), so it joins that blockquote; the Surface replace-the-SSD case takes the second evidence line
- [Phase 149]: All four page fetches returned HTTP 200, so both strings the plan allowed to ship unquoted ship quoted instead

### Plan-Time Research Flags (not blockers — resolve at each phase's plan time)

- **Phase 145 (FIX-05, FIX-08): the two UNVERIFIED dated deadlines.** The Android 2026-10-31 date is not on the page it is attributed to and was not found by three targeted searches including a literal-string search; Apple's Intune end-of-support date is not published at all (the article carries a banner with no date). Each needs a first-party citation before restatement, or a rewrite of the surrounding prose that retains every pinned literal.
- **Phase 148 (APP-03, APP-05): three unfetched or unstable surfaces.** The Intune-side Microsoft 365 Apps update policy surface (settings-catalog / Cloud Policy path and exact setting names) was **never fetched**. The post-July-2026 Semi-Annual channel cadence is unverified and Microsoft's own page is internally inconsistent (announcement in future tense, comparison table still at pre-change values). Re-check whether Win32 Store apps have left preview and whether the two recommended App-Installer policies have reached the settings catalog.
- **Phases 149-150 (BIOS-05, BIOS-09): three recovery gaps, all UNVERIFIED.** Lenovo lost-supervisor-password recovery (no first-party statement located), Lenovo lost-certificate-private-key recovery (page fetched, explicitly silent), and HP Endorsement-Key loss (premise only, no documented escape hatch). Recovery is the most-used content for a service-desk audience — ship it as an explicit "not documented by the vendor; escalate to vendor support" statement, never as an omitted heading and never as unsourced industry expectation. Also open: is HP Connect reachable from Intune's partner-portal entry point as Dell is, and does a post-2022 HP Connect user guide exist? The oldest source in the entire set is the sole source for three load-bearing Phase-149 claims — re-fetch it first.
- **Skip a research pass on Phases 146, 147, 152 and 153** — all four are either fully first-party sourced (146, 147, including their documented silences) or ride well-worn repo precedent with a ratified precedent commit (152, 153).
- **Phase 151** needs no external research pass — it synthesises content authored in 146-150 — but carries one open design decision (promote `## Rollback/Recovery` into the recipe template, or record why it stays a tracked 2-of-4 divergence).

### Pending Todos

None yet for v1.21. Per-phase gray areas are tracked in ROADMAP.md's phase details and in the DISCUSS-PHASE-FLAGS decision above; resolve them via `/gsd-discuss-phase` + `/adversarial-review` per project convention.

### Blockers/Concerns

No open blockers. v1.20 shipped clean: 28/28 Validated, apex 101/0/0 measured four times, zero archival drift, both accepted-red dispositions deleted, tag pushed. v1.21 durable watch items:

- **`docs/operations/patch-management/00-overview.md` is the likeliest source of a mid-execution remediation round.** It is touched by Phases 145, 146, 147 **and** 148, and carries five live pins on an apex chain member. Phases 145-147 have landed; **Phase 148 is the final content touch**, and the 4-platform table is now a 5-platform table, so re-read the live pins before editing rather than reasoning from the 4-column shape. Its 4-platform table regex survives *appending* a Linux column but not a 5-platform rewrite that drops one of the four pinned literals; its frontmatter platform value stays `cross-platform`; and its body prose is barred from carrying the hotpatch, VBS and Android-integrity tokens.
- **The C11 keyword-substitution ordering is a same-commit ordering constraint, not a preference.** `00-overview.md:78` is kept green **solely** by the mutual-exclusivity word pair the milestone is removing. Substitute an allowlisted keyword into the window first, then remove the wording — in that order, in the same commit.
- **FIX-11 cannot be deferred.** The glossary link into `.planning/research/` re-breaks the moment v1.21's own research is archived at close — *after* the close-gate apex has been measured green, and nobody re-runs the apex after archival. Re-pointing at an archived copy does not work; inlining the substance is the only viable fix.
- **Both publish-bundle canaries count different sets** (all registry rows versus Approved-only) and are equal today only because every row is Approved. Compute both from the registry after the rows land; never hard-code a number derived from a document count.
- **`.planning/REQUIREMENTS.md` must not be deleted at milestone close** — `check-phase-54.mjs` live-reads it outside the frozen-at-close mechanism, and it also live-reads `.planning/ROADMAP.md` with a negative literal assertion. Broad corpus edits return this milestone, which re-activates that exposure.
- **Glossary zero-margin hazard is live.** Both glossaries sat at exactly 90 days against a `>90` test at the v1.20 close, and v1.21 adds terminology. Re-measure glossary metadata at plan time; do not assume the margin still holds. Note the narrowed scope: only one workflow reads glossary metadata live — the "six workflows" figure belongs to C17, which is triggered by content, not metadata.
- **Zero line-shifting edits to the pinned capability matrices** — prefer cell-value edits over structural edits; line-shifting `android-capability-matrix.md` is the known prior pin hazard.
- **Skips are gaps, not passes.** Every job in the C17-bearing workflows depends on the harness job, so a harness failure produces one visible red plus a fan-out of silent skips. Read job-level output, never the top-level run colour, and never read CI while the remote is behind — workflows fire on pull request, schedule and dispatch only.

## Session Continuity

Last session: 2026-08-25T22:14:59.892Z
Stopped at: Phase 150 context gathered
Resume file: .planning/phases/150-per-oem-bios-guides-capability-matrix/150-CONTEXT.md
Next action: `/gsd-discuss-phase 148` (or `/gsd-plan-phase 148`)

## Operator Next Steps

- **Phase 148 is next.** Phases 145-147 have shipped (corpus corrections + frozen-read conversion + archival-drift fix; driver/firmware depth; Linux update delivery). Phase 148 is the **last content touch on `docs/operations/patch-management/00-overview.md`** and carries the milestone’s largest open research flag — the Intune-side M365 Apps update policy surface was never fetched, the post-July-2026 SAEC cadence is unverified against an internally inconsistent first-party page, and the Win32 Store app type’s preview status is unconfirmed. Resolve those at plan time, not in prose.
- v1.21 **picks up** from `.planning/milestones/v1.20-DEFERRED-CLEANUP.md`: `V120-PIN-DEFERRAL` and `C17-FROZEN-AWARE-RESIDUE-V15-V19`, both landing in Phase 153.
- v1.21 **does not pick up** and still carries forward: `FENCE-AXIS-02`, the out-of-census divergent fence-handling sites, the unowned `check-phase-30/31` tooling residue, `check-phase-66`'s timeout margin, the non-nested standalone-chain wall-clock cost, `V-132-HUBSNOTWIRED-REGEX-BROKEN` (Phase 152 works *around* it additively rather than fixing it), `RECIPE-OUTBOUND-LINK-COVERAGE`, `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01`, and the trigger-gated content items (`CI-3`, MTPSSO, KRBFUT, AOSP-wired 802.1X, Cloud PKI, `SHARED-TAXONOMY-DOC` — whose trigger is a third *lockdown* recipe and does not fire on Recipe #5).
- `ROLLBACK-RECOVERY-DIVERGENCE-COUNT` **fires this milestone** — Recipe #5 needs the slot, which is the divergence's own recorded trigger. RCP-05 owns the resolution in Phase 151.
- **The corpus-wide past-due population goes to backlog, not to this milestone.** 217 of the 271 files carrying both date stamps are past their `review_by`, worst 71 days, and no validator compares `review_by` to the current date — every rule constrains the interval between the two stamps. Pillar E is scoped to the five patch-management files plus whatever else v1.21 modifies.
- `.planning/seeds/SEED-001` is still stale-but-open (its macOS PSSO content shipped in v1.13 while the file reads `status: planted`). Not folded into v1.21; close it separately.
