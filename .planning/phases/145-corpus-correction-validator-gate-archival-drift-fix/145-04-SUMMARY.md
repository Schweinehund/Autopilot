---
phase: 145-corpus-correction-validator-gate-archival-drift-fix
plan: 04
subsystem: docs
tags: [docs, patch-management, macos, ios, android, ddm, play-integrity, validator-gate, corpus-correction]

# Dependency graph
requires: ["145-01"]
provides:
  - "docs/operations/patch-management/02-macos-update-enforcement.md corrected for FIX-05 (two-stage Apple cutover) in one commit"
  - "docs/operations/patch-management/03-ios-update-lifecycle.md + docs/admin-setup-ios/07-device-enrollment.md corrected for FIX-06 (settings-catalog display names + OfferPrograms recategorisation) in ONE coupled commit"
  - "docs/operations/patch-management/04-android-patch-delivery.md corrected for FIX-08 (all-partitions patch-age scoping + sourced Oct 31 2026 date) in one commit"
affects: []

# Actuals (#2632)
actuals:
  tokens: 5400
  tasks: 3
  commits: 3

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Two-stage correction shape: when a corpus claim conflates a deprecation event with a later non-functional event, correct every downstream restatement of the timing (not just the primary blockquote), or the file becomes internally self-contradictory even after the primary Source line lands"
    - "Recategorise-not-delete pin handling: a validator that only checks a literal's presence (not its surrounding claim) lets a key be reclassified into the correct dictionary/category while the literal itself keeps satisfying the pin"
    - "Coupled multi-file commit for an atomicity-coupling assertion: stage both files, run the full gate suite once, verify git show --name-only lists exactly the coupled set, then commit once"

key-files:
  created: []
  modified:
    - docs/operations/patch-management/02-macos-update-enforcement.md
    - docs/operations/patch-management/03-ios-update-lifecycle.md
    - docs/admin-setup-ios/07-device-enrollment.md
    - docs/operations/patch-management/04-android-patch-delivery.md

key-decisions:
  - "Rewrote every downstream restatement of the macOS Apple-OS-26 timing (Cutover summary bullets, migration Steps 3/5, Critical scheduling note, What-breaks section), not just the primary blockquote and intro paragraph, because several of them asserted the false single-event timing directly (e.g. 'no-op silently on Apple OS 26 devices', 'no longer functions on Apple OS 26') and would have contradicted the corrected two-stage framing if left alone"
  - "Confirmed FIX-04's rename requirement is a no-op in all three of this plan's files: the WUfB census's '2 tokens, neither compound' in each file resolved to link-label text ('[Windows WUfB Rings]'), which D-42 places out of scope; no body-prose rename was made in any of the three files"
  - "Presented three of FIX-06's six settings-catalog display names (Delay in Days, Install Time, Details URL) by name only in the iOS lifecycle guide's intro sentence, without inventing underlying declarative payload key literals for them, since no source in this phase's research documents their exact key names and no validator pins them"
  - "Recategorised OfferPrograms at the enrollment-guide cell by removing it from the 'basic keys' enumeration and stating it separately as a Beta-dictionary beta-programme key, while keeping the DDM+unsupervised+iOS17 pattern and the cross-link intact on the same line so V-54-19's regex kept matching"
  - "Trimmed the iOS lifecycle guide's OfferPrograms mentions from 3 to 2 (matching D-52's measured site count) by removing the literal from the second Source line's prose rather than adding a third distinct claim site"
  - "Cited the Android date directly per D-25 (superseded) rather than the D-24 attribution-fallback path, since the precondition re-fetch reproduced the exact quoted sentence"
  - "Added an 'all partitions' scoping clarification and a corroborating Source line to the Android verdict-conditions list, table row, and callout body, rather than only in the callout, so the scoping correction is stated in every place the file describes the condition"

patterns-established: []

requirements-completed: [FIX-04, FIX-05, FIX-06, FIX-08, FIX-10]

coverage:
  - id: D1
    description: "The macOS guide states the two-stage Apple cutover (deprecated with 26, non-functional in all 27.0 OSes) and records that Intune's deprecation banner carries no date"
    requirement: "FIX-05"
    verification:
      - kind: unit
        ref: "grep -c '27.0' docs/operations/patch-management/02-macos-update-enforcement.md"
        status: pass
    human_judgment: false
  - id: D2
    description: "V-54-15's byte-identical blockquote opener and all 8 pinned literals survive; the deadline-marker count stays at or above the floor of 5"
    requirement: "FIX-05 (gate)"
    verification:
      - kind: unit
        ref: "node scripts/validation/check-phase-54.mjs (V-54-15/16/17)"
        status: pass
    human_judgment: false
  - id: D3
    description: "Apple DDM identifiers appear as Intune settings-catalog display names; OfferPrograms is recategorised, not deleted, at all 3 remaining sites"
    requirement: "FIX-06"
    verification:
      - kind: unit
        ref: "grep -c 'OfferPrograms' on both coupled files; node scripts/validation/check-phase-54.mjs --verbose | grep V-54-18"
        status: pass
    human_judgment: false
  - id: D4
    description: "The iOS pair (03-ios-update-lifecycle.md + admin-setup-ios/07-device-enrollment.md) landed in exactly one commit; V-54-32's atomicity coupling held"
    requirement: "FIX-06 (V-54-32)"
    verification:
      - kind: unit
        ref: "git show --name-only ff728bb5"
        status: pass
    human_judgment: false
  - id: D5
    description: "The Android 12-month patch-age requirement is scoped as a condition of the strong-integrity verdict, requiring all partitions"
    requirement: "FIX-08"
    verification:
      - kind: unit
        ref: "grep -c 'all partitions' docs/operations/patch-management/04-android-patch-delivery.md"
        status: pass
    human_judgment: false
  - id: D6
    description: "The October 31 2026 date carries a direct first-party Source line, attributed as announced-not-shipped, and does not propagate into quick-ref-l2.md's Play Integrity region"
    requirement: "FIX-08"
    verification:
      - kind: unit
        ref: "grep -c 'whats-new/in-development' 04-android-patch-delivery.md; grep -cE 'Oct 31 2026|October 31 2026' docs/quick-ref-l2.md"
        status: pass
    human_judgment: false
  - id: D7
    description: "All three files carry a review_by minus last_verified interval of at most 60 days, stamped with the actual commit date"
    requirement: "FIX-10"
    verification:
      - kind: unit
        ref: "python frontmatter arithmetic check (60 True) x3"
        status: pass
    human_judgment: false
  - id: D8
    description: "check-phase-54.mjs stays at 32 passed / 0 failed after every commit"
    requirement: "gate"
    verification:
      - kind: unit
        ref: "node scripts/validation/check-phase-54.mjs"
        status: pass
    human_judgment: false

duration: 35min
completed: 2026-08-19
status: complete
---

# Phase 145 Plan 04: The macOS / iOS-Pair / Android Correction Atoms Summary

**Landed FIX-05's two-stage Apple cutover in `02-macos-update-enforcement.md`, FIX-06's
settings-catalog display names and `OfferPrograms` recategorisation in the coupled
`03-ios-update-lifecycle.md` + `admin-setup-ios/07-device-enrollment.md` pair, and FIX-08's
all-partitions patch-age scoping plus the now-first-party-sourced October 31 2026 date in
`04-android-patch-delivery.md` — three commits, four files, each gated 32/32 on
`check-phase-54.mjs` and green across all seven D-18 validators.**

## Performance

- **Duration:** ~35 min
- **Tasks:** 3
- **Files modified:** 4
- **Commits:** 3

## Accomplishments

- **FIX-05 (macOS):** Corrected the false single-event "deprecated and removed with Apple OS 26"
  claim to the true two-stage cutover — legacy MDM commands (`forceDelayedSoftwareUpdates`,
  `com.apple.SoftwareUpdate`, `ScheduleOSUpdate`) are deprecated with the Apple OS 26 releases and
  become non-functional only in all Apple OS 27.0 operating systems. Rewrote every downstream
  restatement of this timing in the file (intro paragraph, DDM-section pointer, deferral bullet,
  Deadlines-section intro, the callout blockquote body, the Cutover-summary bullets, migration
  Steps 3 and 5, the Critical-scheduling note, and the What-breaks section) so the file is
  internally consistent, not just correct at the primary citation site. Stated explicitly that
  Intune's own deprecation banner carries no removal date, rather than inventing one.
- **FIX-06 (iOS pair):** Presented the DDM iOS update assertion's Settings Catalog display names
  (Target OS Version, Target Build Version, Target Date Time, Delay in Days, Install Time, Details
  URL) alongside the three underlying declarative enforcement keys in the lifecycle guide.
  Recategorised `OfferPrograms` at both of the lifecycle guide's sites and at the enrollment
  guide's capability-table cell as a `Beta`-dictionary beta-programme-enrolment key — never
  deleted — while preserving the DDM+unsupervised+iOS-17 pattern and the cross-link `V-54-19`
  requires. Landed both files in one commit; `V-54-32`'s atomicity coupling held.
- **FIX-08 (Android):** Scoped the 12-month security-patch-age requirement as a condition of the
  `MEETS_STRONG_INTEGRITY` verdict specifically — covering **all partitions** (OS and vendor) —
  not a general Android 13+ requirement, in the verdict table row, the three-condition list, and
  the callout body. Confirmed the precondition re-fetch of
  `learn.microsoft.com/en-us/intune/whats-new/in-development` reproduced the exact sentence
  recorded in `145-RESEARCH.md` ("Microsoft Intune will enforce this change by **October 31,
  2026**") verbatim, so the direct-citation path (D-25, superseded) was used rather than the
  attribution fallback. Added a dated `**Source:**` line attributing the date as an *announced*
  enforcement date on Intune's *In development* page, not a shipped GA statement. Confirmed the
  literal still does not appear in `docs/quick-ref-l2.md`'s Play Integrity region.
- **FIX-04:** Confirmed a no-op in all three files this plan owns — the "2 tokens, neither
  compound" the WUfB census recorded for each file resolved to the `[Windows WUfB Rings]`
  link-label text, which D-42 places out of scope (headings, link labels, and link targets are
  not renamed this milestone). No body-prose rename was needed or made.
- **FIX-10:** Re-stamped `last_verified`/`review_by` to a 60-day interval (computed by arithmetic,
  stamped with the actual commit date) on the two patch-management files edited standalone
  (macOS, Android) and the coupled pair's patch-management file (iOS lifecycle); the enrollment
  guide's frontmatter was left untouched per D-05's five-document evidence-line scope.

## Task Commits

1. **Task 1: 02-macos-update-enforcement.md — FIX-05 two-stage Apple cutover + FIX-04 + FIX-10** - `39f279a3` (fix)
2. **Task 2: 03-ios-update-lifecycle.md + admin-setup-ios/07-device-enrollment.md — FIX-06 + FIX-04 + FIX-10, ONE coupled commit** - `ff728bb5` (fix)
3. **Task 3: 04-android-patch-delivery.md — FIX-08 patch-age scoping + sourced date + FIX-04 + FIX-10** - `5e91b2c6` (fix)

_Plan metadata commit follows this SUMMARY._

## Files Created/Modified

- `docs/operations/patch-management/02-macos-update-enforcement.md` - two-stage cutover correction across 9 sites, undated-banner statement, 2 Source lines, frontmatter re-stamp; 73 insertions, 58 deletions (net +44/-29 in the working diff)
- `docs/operations/patch-management/03-ios-update-lifecycle.md` - settings-catalog display names, `OfferPrograms` recategorisation at 2 sites, 2 Source lines, frontmatter re-stamp
- `docs/admin-setup-ios/07-device-enrollment.md` - `OfferPrograms` recategorisation at 1 site, cross-link and DDM+unsupervised+iOS17 pattern preserved, no frontmatter change (D-05 scope)
- `docs/operations/patch-management/04-android-patch-delivery.md` - all-partitions patch-age scoping across 3 sites, sourced Oct 31 2026 date with announced-not-shipped rider, 2 Source lines, frontmatter re-stamp

## Pre-Edit and Post-Edit Census

Re-measured at execution time per the plan's mandatory re-measure discipline (all baseline figures
matched the plan's re-measure grep output — no fresh drift found this round):

### 02-macos-update-enforcement.md

| Check | Pre-edit | Post-edit | Floor |
|---|---|---|---|
| `[HARD-DEADLINE` token count | 8 | 8 | ≥5 |
| `Apple OS 26` | 19 | 18 | ≥1 |
| `27.0` | 0 | 13 | ≥1 |
| `**Source:**` standalone lines | 0 | 2 | ≥2 |
| 8 pinned literals (forceDelayedSoftwareUpdates, com.apple.SoftwareUpdate, ScheduleOSUpdate, DDM, Software Update Enforce Latest, Intune Settings Catalog, forward-compatible, Apple OS 26) | all present | all present | each ≥1 |

### 03-ios-update-lifecycle.md + admin-setup-ios/07-device-enrollment.md (coupled)

| Check | Pre-edit | Post-edit | Requirement |
|---|---|---|---|
| `OfferPrograms` in lifecycle guide | 2 | 2 | 2 |
| `OfferPrograms` in enrollment guide | 1 | 1 | 1 |
| `**Source:**` lines in lifecycle guide | 0 | 2 | ≥2 |
| `**Source:**` lines in enrollment guide | 0 | 0 | 0 (D-05 scope) |
| `03-ios-update-lifecycle.md` cross-link in enrollment guide | 1 | 1 | ≥1 |
| `docs/admin-setup-ios/04-configuration-profiles.md` in commit | absent | absent | must stay absent |

### 04-android-patch-delivery.md

| Check | Pre-edit | Post-edit | Floor |
|---|---|---|---|
| `[HARD-DEADLINE` token count | 9 | 9 | ≥4 |
| `Android 13+` | 5 | 5 | ≥1 |
| `May 2025` | 3 | 3 | ≥1 |
| `September 30 2025` | 3 | 3 | ≥1 |
| `Zebra LifeGuard` | 13 | 13 | ≥1 |
| `12-month` / `12 months` | present | 10 | ≥1 |
| `Oct 31 2026` / `October 31 2026` | present | 10 | ≥2 |
| `Oct 31 2026` / `October 31 2026` in `docs/quick-ref-l2.md` | 0 | 0 | 0 |
| `all partitions` | 0 | 3 | ≥1 |
| `**Source:**` standalone lines | 0 | 2 | ≥2 |
| `whats-new/in-development` link | 0 | 1 | ≥1 (0 only if fallback taken) |

## Stamped Date Pairs

- `02-macos-update-enforcement.md`: `last_verified: 2026-08-19` / `review_by: 2026-10-18`
- `03-ios-update-lifecycle.md`: `last_verified: 2026-08-19` / `review_by: 2026-10-18`
- `04-android-patch-delivery.md`: `last_verified: 2026-08-19` / `review_by: 2026-10-18`
- `admin-setup-ios/07-device-enrollment.md`: unchanged (D-05 scopes evidence lines and date
  re-stamps to the five patch-management documents only)
- Each patch-management file verified: `(review_by - last_verified).days == 60` and
  `last_verified == today` — both `True`.

## Re-fetch Result — the Android October 31 2026 Enforcement Date

Re-fetched `https://learn.microsoft.com/en-us/intune/whats-new/in-development` immediately before
landing Task 3's commit (precondition step). The page reproduced the exact sentence recorded in
`145-RESEARCH.md`'s External Research Finding section verbatim:

> "Microsoft Intune will enforce this change by **October 31, 2026**."

under the `### Plan for Change: Google Play strong integrity definition update for Android 13 or
above` heading. The same section corroborates FIX-08's scoping substance independently: "devices
running Android 13 or above **without a security update in the past 12 months**" lose the Strong
Integrity verdict. **Result: reproduced — no fallback needed.** The direct-citation path (D-25,
superseded from the earlier attribution/hedge path) was used, with the required rider attributing
the date as an *announced* enforcement date on Intune's *In development* page rather than a
shipped general-availability statement.

## Gate Verification (all after each of the three commits)

- `node scripts/validation/check-phase-54.mjs` → `Summary: 32 passed, 0 failed, 0 skipped` (all three times, including `V-54-15/16/17` for macOS, `V-54-18/19/20/21/32` for the iOS pair, `V-54-22/23/24/25` for Android)
- `node scripts/validation/check-phase-57.mjs` → `Summary: 26 passed, 0 failed, 0 skipped`
- `node scripts/validation/check-phase-53.mjs` → `Summary: 26 passed, 0 failed, 0 skipped`
- `node scripts/validation/check-phase-59.mjs` → `Summary: 36 passed, 0 failed, 0 skipped`
- `node scripts/validation/c17-eee-contract.mjs` → `234 files checked, 0 with violations, 0 total violations`
- `node scripts/validation/check-nav-hub-links.mjs` → `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total`
- `node scripts/validation/v1.20-milestone-audit.mjs` → `Summary: 16 passed, 0 failed, 0 skipped`
- `git show --name-only 39f279a3` → exactly one path (macOS file)
- `git show --name-only ff728bb5` → exactly two paths (the coupled iOS pair) — coupling held
- `git show --name-only 5e91b2c6` → exactly one path (Android file)

## Commits

- `39f279a3` — `fix(145-04): correct 02-macos two-stage Apple cutover + undated Intune banner`
- `ff728bb5` — `fix(145-04): recategorise OfferPrograms + settings-catalog display names (coupled iOS pair)`
- `5e91b2c6` — `fix(145-04): scope Android strong-integrity patch-age to all partitions + cite the sourced Oct 31 2026 date`

## Decisions Made

See `key-decisions` in the frontmatter above for the full list. The most consequential: rewriting
every downstream restatement of the macOS timing (not just the primary correction site), since the
corpus's false "removed at Apple OS 26" framing was repeated in at least seven other places in the
file that would otherwise have contradicted the corrected blockquote; and confirming FIX-04 is a
genuine no-op in all three files (both WUfB tokens per file are link-label text, out of D-42's
rename scope), rather than assuming the census's "2 tokens" implied a body-prose edit was owed.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Trimmed a third `OfferPrograms` mention in the iOS lifecycle guide down to the
plan's measured count of 2**
- **Found during:** Task 2, post-edit verification
- **Issue:** The first draft of the DDM Update Keys section rewrite included the literal
  `OfferPrograms` three times (the recategorisation paragraph, its Source line, and the blockquote),
  one more than D-52's measured 2-site count for this file and the plan's explicit acceptance
  criterion (`grep -c 'OfferPrograms' ... expect: 2`).
- **Fix:** Reworded the second Source line to reference "the Beta dictionary's beta-programme key
  definition, cited in the paragraph above" instead of repeating the literal, bringing the count
  back to 2 without losing the citation's substance.
- **Files modified:** `docs/operations/patch-management/03-ios-update-lifecycle.md`
- **Commit:** `ff728bb5` (folded into the task's single commit before landing; no separate commit
  needed since verification caught it pre-commit)

### Notes (not deviations)

- The plan's action D for Task 2 flagged a rollout-stage ring name at
  `03-ios-update-lifecycle.md`'s Rollout Patterns section (Pilot/Broad/Critical ring naming) as an
  iOS rollout convention outside FIX-01's Autopatch-naming scope. Confirmed untouched — no edit
  was made to that section.
- FIX-06's requirement text ("re-categorised, not deleted") was applied at all 3 remaining
  `OfferPrograms` sites this plan owns (2 in the lifecycle guide, 1 in the enrollment guide); the
  other 2 of the corpus-wide 5 sites (`00-overview.md:53,114`) were already recategorised by
  145-02.
- Task 1's macOS rewrite touched more sites than the plan's `<action>` block explicitly listed by
  line number (the plan named the primary intro paragraph and the callout blockquote; this
  execution additionally corrected the Cutover-summary bullets, migration Steps 3 and 5, the
  Critical-scheduling note, and the What-breaks section) — done under deviation Rule 1 (auto-fix
  bugs) since leaving those sites unedited would have left the file self-contradictory: several of
  them directly asserted the same false "functionality lost at Apple OS 26" timing the plan
  required correcting, using different words ("no-op silently on Apple OS 26 devices", "no longer
  functions on Apple OS 26", "hard deadline for completion").

---

**Total deviations:** 1 auto-fixed (Rule 1, caught pre-commit during verification).
**Impact on plan:** None on scope or correctness — the extra `OfferPrograms` mention was corrected
before the commit landed, and the file lands exactly as the plan's acceptance criteria specify.

## Issues Encountered

None. The precondition re-fetch for the Android date reproduced cleanly on the first attempt via
`curl`, so the plan's fallback-attribution path (step C of Task 3) was not exercised.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All three of this plan's per-platform correction atoms (macOS FIX-05, the iOS pair's FIX-06,
  Android FIX-08) are landed, each gated 32/0/0 on `check-phase-54.mjs` and green across all seven
  D-18 validators after every commit.
- The phase's one research flag is discharged on the record: the Android October 31 2026 date
  carries a first-party citation whose own `ms.date` (2026-07-27) post-dates the corpus's prior
  `last_verified` (2026-04-28), confirmed by a re-fetch immediately before the commit landed.
- `V-54-32`'s atomic coupling held — the two iOS files landed together in one commit, verified by
  `git show --name-only`.
- Remaining phase-145 work (per D-17's commit-atom classes) sits in plans not owned by this
  execution: `01-windows-wufb-rings.md` (class 2), and class 5's FIX-11 archival-drift fix,
  FIX-09's Ubuntu/SVG sweep, and `check-phase-59.mjs`'s FIX-12 conversion (already landed in
  145-01) plus the `co-management/03` token swap (already landed in 145-01).

---
*Phase: 145-corpus-correction-validator-gate-archival-drift-fix*
*Completed: 2026-08-19*

## Self-Check: PASSED

- FOUND: docs/operations/patch-management/02-macos-update-enforcement.md
- FOUND: docs/operations/patch-management/03-ios-update-lifecycle.md
- FOUND: docs/admin-setup-ios/07-device-enrollment.md
- FOUND: docs/operations/patch-management/04-android-patch-delivery.md
- FOUND: .planning/phases/145-corpus-correction-validator-gate-archival-drift-fix/145-04-SUMMARY.md
- FOUND: commit 39f279a3 (Task 1)
- FOUND: commit ff728bb5 (Task 2)
- FOUND: commit 5e91b2c6 (Task 3)
