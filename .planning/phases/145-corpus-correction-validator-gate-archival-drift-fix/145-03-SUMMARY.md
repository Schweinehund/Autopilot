---
phase: 145-corpus-correction-validator-gate-archival-drift-fix
plan: 03
subsystem: docs
tags: [autopilot, windows, wufb, autopatch, hotpatch, corpus-correction, validator-gate]

# Dependency graph
requires:
  - phase: 145-02
    provides: the `**Source:**` citation-line shape and the plan-03 handoff (this file was the only
      one still carrying every FIX-01/02/04/07/10 correction)
provides:
  - "docs/operations/patch-management/01-windows-wufb-rings.md corrected in place: current
    Autopatch default rings, WUfB/Autopatch containment position, current product name, current
    Hotpatch behavior, dated evidence, re-stamped freshness window"
  - "the last corpus-wide `Autopatch rings` plural anti-pattern hit is now down to exactly one
    (the self-kept Disambiguation H2) — Success Criterion 2 fully discharged"
affects: [146-driver-firmware-stub-and-move]

actuals:
  tokens: 3900
  tasks: 1
  commits: 1

tech-stack:
  added: []
  patterns:
    - "Attribution rewrite for a future-dated correction: state the corrected claim as fact, restate
      the corpus's own superseded framing as an attributed subordinate clause ('this guide
      previously described...'), keep every pinned literal inside the true sentence."
    - "Ring-qualifier discipline: every 'ring' token needs 'WUfB deployment', 'Autopatch', 'Update',
      or 'deployment' within ~40 chars before it — verified live against V-54-11, not assumed."

key-files:
  created: []
  modified:
    - docs/operations/patch-management/01-windows-wufb-rings.md

key-decisions:
  - "Singularised every Autopatch-cohort reference (D-13) instead of inserting an allowlisted C11
    keyword, so the plural anti-pattern is structurally gone rather than merely tolerated."
  - "Kept the PITFALL-9 label on both the disambiguation blockquote and the migration-step
    paragraph, per D-55, while replacing the exclusivity claim with the containment position."
  - "Placed the Windows 11 Pro literal on its own unbroken line (not wrapped mid-phrase) after a
    first pass line-wrapped 'Windows 11' and 'Pro' across two lines, which silently defeated the
    literal-presence grep — caught by re-running the acceptance checks before commit."

requirements-completed: [FIX-01, FIX-02, FIX-04, FIX-07, FIX-10]

coverage:
  - id: D1
    description: "Autopatch default rings corrected to Test and Last at all 3 cohort-naming sites
      (opening sentence, promotion sequence, migration-step parenthetical); First/Fast/Broad
      falsified naming removed"
    requirement: "FIX-01"
    verification:
      - kind: unit
        ref: "grep -cE '\\b(First|Fast)\\b' 01-windows-wufb-rings.md == 0; grep -nE '\\bBroad\\b' | grep -vc 'Broad WUfB deployment ring' == 0"
        status: pass
    human_judgment: false
  - id: D2
    description: "WUfB/Autopatch exclusivity claim replaced with the first-party containment
      position (Autopatch group contains an Update rings policy; consequence is loss of direct
      authorship) across the intro pointer, the PITFALL-9 blockquote, its follow-on paragraph, and
      the migration-step prose; PITFALL-9 label retained"
    requirement: "FIX-02"
    verification:
      - kind: unit
        ref: "grep -ciE 'mutually exclusive|mutual-exclusion|mutual exclusion' == 0; grep -c PITFALL-9 == 4"
        status: pass
    human_judgment: false
  - id: D3
    description: "Product renamed to Windows Update client policies in body prose; WUfB deployment
      ring compound, H1, anchor-owning H2, and filename left untouched"
    requirement: "FIX-04"
    verification:
      - kind: unit
        ref: "check-phase-54 V-54-11 PASS (ring qualifiers intact after rename); git diff shows no
          heading/anchor/filename changes"
        status: pass
    human_judgment: false
  - id: D4
    description: "Hotpatch section rewritten by attribution: default-on for eligible devices, two
      configuration levels (tenant default + per-policy override), Arm64 supported with CHPE
      disabled (HotPatchRestrictions=1), VBS required; corpus's May 2026/April 2026 single-toggle
      framing restated as this guide's own prior position, not fact; Windows 11 Pro exclusion
      retained and flagged unconfirmed in prose"
    requirement: "FIX-07"
    verification:
      - kind: unit
        ref: "check-phase-54 V-54-12 PASS (May 2026/VBS/default/opt-out all present); grep -c
          'HotPatchRestrictions=1' == 1; grep -c 'Windows 11 Pro' == 1"
        status: pass
    human_judgment: false
  - id: D5
    description: "5 dated **Source:** evidence lines added for the corrected claims; frontmatter
      last_verified/review_by re-stamped to a 60-day window"
    requirement: "FIX-10"
    verification:
      - kind: unit
        ref: "grep -c '^\\*\\*Source:\\*\\* \\[' == 5; (review_by - last_verified).days == 60 and
          last_verified == today"
        status: pass
    human_judgment: false

duration: 25min
completed: 2026-08-19
status: complete
---

# Phase 145 Plan 03: Windows WUfB/Autopatch/Hotpatch corpus correction Summary

**Corrected `01-windows-wufb-rings.md` in place against the phase's most hostile assertion set — the
bare-`ring` qualifier NEGATIVE and the C11 plural anti-pattern — landing FIX-01, FIX-02, FIX-04,
FIX-07 and FIX-10 in one commit with `check-phase-54` staying at 32/32 throughout.**

## Performance

- **Duration:** 25 min
- **Tasks:** 1/1 completed
- **Files modified:** 1

## Accomplishments

- Autopatch default rings corrected from the falsified `Test/First/Fast/Broad` four-cohort naming
  to the current `Test` and `Last` rings, at all three sweep sites, with every reference
  singularised rather than kept plural.
- WUfB/Autopatch exclusivity claim ("mutually exclusive... cannot coexist") replaced everywhere in
  the file with the first-party containment position — an Autopatch group *contains* an Update
  rings policy and the device loses direct authorship rather than being excluded — while the
  PITFALL-9 label survived every rewritten site.
- Product renamed to "Windows Update client policies" in body prose (2 sites), with the coined
  `WUfB deployment ring` compound, the H1, the anchor-owning `## WUfB Deployment Rings` H2, and the
  filename all left untouched.
- Hotpatch section rewritten by attribution: default-on for eligible devices, two configuration
  levels (tenant-wide default + per-policy override), Arm64 support with CHPE disabled
  (`HotPatchRestrictions=1`), VBS required. The corpus's own May 2026/April 2026 single-toggle
  framing is now presented as this guide's prior position, not as fact. The Windows 11 Pro exclusion
  is retained and flagged unconfirmed in prose, never resolved to yes/no.
- 5 dated `**Source:**` evidence lines added (Autopatch groups overview ×2, WUfB client policies
  rename source, Hotpatch updates, Configure hotpatch); frontmatter re-stamped
  `last_verified: 2026-08-19` / `review_by: 2026-10-18` (exactly 60 days).
- Combined with plans 01/02, the corpus-wide `\bAutopatch rings\b` case-insensitive hit count is now
  exactly 1 (the self-kept `## Windows Autopatch Rings (Disambiguation)` heading) — Success
  Criterion 2 fully discharged.

## Task Commits

Each task was committed atomically:

1. **Task 1: The 01-windows-wufb-rings.md correction atom — FIX-01 + FIX-02 + FIX-04 + FIX-07 +
   FIX-10, one commit** - `da97de2a` (fix)

_No plan-metadata commit was made per this run's `sequential_execution` instructions (executor
runs directly on `master`, no worktree)._

## Files Created/Modified

- `docs/operations/patch-management/01-windows-wufb-rings.md` - Autopatch cohort naming, WUfB/
  Autopatch containment position, product rename, Hotpatch attribution rewrite, evidence lines,
  frontmatter freshness re-stamp. Driver/firmware section (`:155-208`, dual-scan pitfall) left
  entirely untouched for Phase 146.

## Decisions Made

- Singularised every Autopatch-cohort mention (never inserted an allowlisted C11 keyword) so the
  plural anti-pattern is structurally absent rather than merely tolerated by a nearby keeper — per
  D-13.
- Retained `PITFALL-9` on both the blockquote and the migration-step paragraph while replacing the
  exclusivity claim with the containment position — per D-55.
- Kept the Autopatch disambiguation H2 (`## Windows Autopatch Rings (Disambiguation)`) completely
  untouched, including its parenthetical, per D-42/D-54 — it is the sole surviving plural hit and
  is self-kept by that parenthetical.
- Fixed a self-caught prose-wrapping defect (see Issues Encountered) before commit rather than
  after, since `check-phase-54` is a hard gate on this file.

## Deviations from Plan

None — plan executed exactly as written across FIX-01, FIX-02, FIX-04, FIX-07 and FIX-10.

## Issues Encountered

During the first draft of the Hotpatch prerequisites bullet, the phrase "Windows 11 Pro" was
line-wrapped across two source lines ("Windows 11\n  Pro"), which silently defeated the
literal-presence grep the acceptance criteria require (`grep -c "Windows 11 Pro"` returned 0).
Caught by running the full acceptance-criteria grep sweep before committing (not just the
validator), fixed by re-wrapping the bullet so the phrase sits on one line, then re-verified
`check-phase-54` stayed 32/32 and all acceptance greps passed before the commit landed.

## Pre-edit / Post-edit Census

| Item | Pre-edit | Post-edit |
|---|---|---|
| `\bAutopatch rings\b` (case-insensitive) in this file | 3 (`:62` H2, `:65`, `:77`) | 1 (`:65` H2 only, self-kept) |
| `\bAutopatch rings\b` corpus-wide | 3 (all in this file) | 1 (all in this file) |
| Falsified cohort names (`First`/`Fast`/bare `Broad`) | 3 sites | 0 |
| `mutually exclusive` / `mutual-exclusion` / `mutual exclusion` | 3 sites | 0 |
| `PITFALL-9` literal | 3 occurrences | 4 occurrences |
| `Windows Update for Business` as product name in body prose | 2 sites | 0 (renamed; `WUfB` retained only in the deployment-ring compound and the reports carve-out sentence) |
| `**Source:**` evidence lines | 0 | 5 |

## Preservation-List Literal Census (V-54-12 + retained items)

| Literal | Present after edit |
|---|---|
| `May 2026` | 4 |
| `VBS` | 2 |
| `default` (case-insensitive) | 7 |
| `opt-out` or `April 2026` | 3 (both present) |
| `HotPatchRestrictions=1` | 1 |
| `Windows 11 Pro` | 1 |
| `dual-scan` (Phase-146-owned, untouched) | 3 |

## Evidence-Line URLs (D-01/D-03)

| Claim | URL | Backticking needed under D-03 screening? |
|---|---|---|
| FIX-01 (Autopatch default rings) | `.../windows-autopatch/deploy/windows-autopatch-groups-overview` | No — no bare `ring`/`rings` token in the slug |
| FIX-02 (containment position) | same URL as FIX-01 | No |
| FIX-04 (product rename) | `.../windows/deployment/update/waas-manage-updates-wufb` | No |
| FIX-07 (Hotpatch, primary) | `.../windows-autopatch/manage/windows-autopatch-hotpatch-updates` | No |
| FIX-07 (Hotpatch, config levels) | `.../intune/device-updates/windows/configure-hotpatch` | No |

None of the five URLs required backticking; no URL in the file (evidence lines or the pre-existing
External References section) contains a bare `ring`/`rings` token in its path.

## Frontmatter Freshness

`last_verified: 2026-08-19` (commit-landing date) / `review_by: 2026-10-18` (+60 days exactly).

## Gate Results (all run post-edit, pre-commit)

- `check-phase-54.mjs` → 32 passed, 0 failed, 0 skipped (hard gate, includes V-54-11/12/13)
- `v1.20-milestone-audit.mjs` → 16 passed, 0 failed, 0 skipped (C11 live enforcer)
- `check-phase-53.mjs` → 26 passed, 0 failed, 0 skipped
- `check-phase-57.mjs` → 26 passed, 0 failed, 0 skipped
- `check-phase-59.mjs` → 36 passed, 0 failed, 0 skipped
- `c17-eee-contract.mjs` → 234 files checked, 0 with violations, 0 total violations
- `check-nav-hub-links.mjs` → 0 hub-presence failures, 0 corpus-link failures
- `check-phase-144.mjs` (apex chain) → 101 passed, 0 failed, 0 skipped

## Commit

`da97de2a` — `fix(145-03): correct Windows WUfB/Autopatch/Hotpatch guide (FIX-01,02,04,07,10)`

## Self-Check: PASSED

- FOUND: `docs/operations/patch-management/01-windows-wufb-rings.md`
- FOUND: commit `da97de2a` in `git log --oneline --all`
