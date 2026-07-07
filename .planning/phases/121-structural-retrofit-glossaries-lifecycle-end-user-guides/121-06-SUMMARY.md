---
phase: 121-structural-retrofit-glossaries-lifecycle-end-user-guides
plan: 06
subsystem: docs
tags: [eee-retrofit, c17, lifecycle, apv2, end-user-guides, markdown]

# Dependency graph
requires:
  - phase: 121-01
    provides: RE-index.md doc_id map + registry Approved flips for RE-175/176 and the lifecycle Guide IDs (RE-185..206)
provides:
  - 6 remaining Mermaid-free lifecycle files (lifecycle/{01,02,05}, lifecycle-apv2/{00,01,03}) EEE-retrofitted to Guide, Status Approved, platform: Windows injected
  - 2 end-user guides (RE-175 android-work-profile-setup, RE-176 linux-intune-portal-enrollment) retrofitted with real EEE frontmatter (doc_id/status/owner/doc_type) per D-07 — not just the registry flip from 121-01
  - Completes the 13-file Mermaid-free lifecycle set (with 121-05); closes RETRO-09
affects: [122-decision-trees-carved-mermaid, 123-nav-hub-retrofit]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "retrofit-structural.mjs --dry-run then --write, verifying doc_id/platform resolution before touching any file"
    - "Word-preserving Transform A blockquote splits: replicate C17's exact join-then-measure grouping algorithm (strip '>' prefix, join consecutive lines with a single space) before deciding where to split, rather than trusting a naive per-line length check"
    - "Word-set multiset diff (git HEAD vs working tree, '>' prefix stripped) as the reformat-only proof, run both after Task 1 (fork + Summary authoring) and after Task 2 (blockquote splitting)"

key-files:
  created: []
  modified:
    - docs/lifecycle/01-hardware-hash.md
    - docs/lifecycle/02-profile-assignment.md
    - docs/lifecycle/05-post-enrollment.md
    - docs/lifecycle-apv2/00-overview.md
    - docs/lifecycle-apv2/01-prerequisites.md
    - docs/lifecycle-apv2/03-automatic-mode.md
    - docs/end-user-guides/android-work-profile-setup.md
    - docs/end-user-guides/linux-intune-portal-enrollment.md
    - .planning/REQUIREMENTS.md

key-decisions:
  - "Confirmed registry doc_id mapping (RE-193/194/197, RE-198/199/201, RE-175/176) matches plan expectations via dry-run before writing any file"
  - "Word-preserving Transform A used for all 15 over-200-char blockquote groups across the 8 files; no Transform B (de-blockquote) needed since none of the callouts contained embedded code fences or unsplittable link spans"
  - "A per-line-only length check materially undercounts C17 #12 groups — a truly-blank blockquote-continuation line ('>' with nothing after) still joins with adjacent '>' lines into one group; genuine blank (non-'>') lines are required to break a group. Caught and fixed one case (05-post-enrollment.md's L2 Note header) where a bare '>' separator line kept the header fused to the first bullet at 249 chars"
  - "RETRO-09 marked complete in REQUIREMENTS.md — both RE-175 and RE-176 now carry the full EEE retrofit; RETRO-07 correctly left Pending since it spans Phase 121 (13 Mermaid-free files, done with 121-05+121-06) + Phase 122 (9 Mermaid-bearing files, not yet started)"
  - "Version-History YYYY-MM-DD placeholder filled with 2026-07-07 (commit date) across all 8 files, per 117-02/118-04/121-05 precedent"

requirements-completed: [RETRO-09]

# Metrics
duration: 40min
completed: 2026-07-07
---

# Phase 121 Plan 06: Lifecycle + End-User Guide EEE Retrofit (Final 6 + RE-175/176) Summary

**EEE-retrofitted the final 6 Mermaid-free lifecycle files (lifecycle/{01,02,05}, lifecycle-apv2/{00,01,03}) and the 2 end-user guides (RE-175/176) to doc_type Guide, Status Approved, with 8 net-new Summaries and 15 word-preserving blockquote splits — C17 exits 0 on the full 195-file corpus.**

## Performance

- **Duration:** 40 min
- **Tasks:** 2
- **Files modified:** 8 content files + REQUIREMENTS.md

## Accomplishments
- Ran `retrofit-structural.mjs` on all 8 target files (dry-run first, then write): injected `doc_id`/`status: Approved`/`owner: Intune Admin Lead`/`doc_type: Guide` into every file's frontmatter
- The 6 keyless `docs/lifecycle/` + `docs/lifecycle-apv2/` files received `platform: Windows` injection (D1 label "Windows"); the 2 end-user guides kept their existing `platform: Android` / `platform: Linux` keys
- Authored 8 net-new ≥30-word `## Summary` sections in the correct voice per audience (admin-facing for the 6 lifecycle stage/APv2 guides; end-user voice for the 2 BYOD/Linux enrollment guides) — no existing body paragraph promoted to Summary
- Split 15 over-200-char C17 #12 blockquote groups across all 8 files using word-preserving Transform A (sentence/clause-boundary splits with a genuine blank line between resulting blockquotes)
- Confirmed none of the 8 files contains a ```mermaid fence
- Proved reformat-only via word-set multiset diff (git HEAD vs working tree, '>' prefix stripped) after both Task 1 and Task 2 — zero real words added/removed beyond the intentional Summary authoring and VH date fill
- `node scripts/validation/c17-eee-contract.mjs`: **195 files checked, 0 with violations, 0 total violations, exit 0**
- Marked RETRO-09 complete in REQUIREMENTS.md (RE-175/176 fully retrofitted — the actual EEE work D-07 required, not just the registry Approved flip from 121-01)

## Task Commits

Each task was committed atomically:

1. **Task 1: Run the fork on the 8 files and author 8 net-new Summaries (Guide doc_type)** - `93649fa` (feat)
2. **Task 2: Split over-200-char blockquotes, confirm no ```mermaid, prove C17 green + reformat-only** - `b98f2ca` (fix)

**Plan metadata:** (this commit) (docs: complete plan)

## Files Created/Modified
- `docs/lifecycle/01-hardware-hash.md` - Guide, Approved, RE-193, platform: Windows injected, Summary authored, 3 blockquote groups split
- `docs/lifecycle/02-profile-assignment.md` - Guide, Approved, RE-194, platform: Windows injected, Summary authored, 4 blockquote groups split
- `docs/lifecycle/05-post-enrollment.md` - Guide, Approved, RE-197, platform: Windows injected, Summary authored, 2 blockquote groups split (plus one blank-separator fix)
- `docs/lifecycle-apv2/00-overview.md` - Guide, Approved, RE-198, platform: Windows injected, Summary authored, VH section created, 1 blockquote group split
- `docs/lifecycle-apv2/01-prerequisites.md` - Guide, Approved, RE-199, platform: Windows injected, Summary authored, VH section created, 1 blockquote group split
- `docs/lifecycle-apv2/03-automatic-mode.md` - Guide, Approved, RE-201, platform: Windows injected, Summary authored, VH section created, 3 blockquote groups split
- `docs/end-user-guides/android-work-profile-setup.md` - Guide, Approved, RE-175, real EEE retrofit (D-07), Summary authored, VH section created, 1 blockquote group split
- `docs/end-user-guides/linux-intune-portal-enrollment.md` - Guide, Approved, RE-176, real EEE retrofit (D-07), Summary authored (no blockquote split needed — already ≤200 chars)
- `.planning/REQUIREMENTS.md` - RETRO-09 marked complete via `requirements.mark-complete`

## Decisions Made
- Registry doc_id mapping confirmed via `grep` against `docs/_registry/RE-index.md` before running the fork — matched plan expectations exactly (RE-193/194/197, RE-198/199/201, RE-175/176)
- Used the C17 validator's exact grouping algorithm (strip `>` prefix, join consecutive `>`-lines with a single space) rather than a naive multi-line join, since the naive approach both over- and under-counted group lengths; this caught a false negative in `05-post-enrollment.md` where a bare `>` continuation line kept the L2 Note header fused to the first bullet, and a subsequent fix (real blank line) resolved it
- Chose to keep bullet-dash markers on the first sentence of each split bullet and drop them on the continuation sentence, to visually signal "this blockquote continues the prior bullet's thought" without merging back into one over-length group
- Filled Version-History date placeholders with the actual commit date (2026-07-07) rather than leaving `YYYY-MM-DD`, matching 117-02/118-04/121-05 precedent

## Deviations from Plan

None - plan executed exactly as written. The one "L2 Note header fused to first bullet at 249 chars" issue was caught and fixed during Task 2's own verification loop (part of the planned blockquote-splitting work), not an unplanned deviation from scope.

## Issues Encountered

- The Edit tool reported "File has been modified since read" for 5 of the 8 files immediately after the fork's write pass (a filesystem/linter touch between the fork's `writeFileSync` and the prior Read). Resolved by re-reading each affected file immediately before retrying the Summary-authoring edit; no data loss, confirmed via the subsequent `[FILL-IN` grep sweep that all 8 placeholders were replaced.
- My own `sed` date-fill pass triggered "file modified externally" system reminders for all 8 files (expected side effect of using `sed` instead of the Edit tool for a uniform find-replace) — confirmed via the word-set diff that the only change was `YYYY-MM-DD` → `2026-07-07`.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- RETRO-09 fully closed (RE-175/176 real EEE retrofit complete)
- RETRO-07 remains Pending — 13 of 22 lifecycle files now C17-green (Phase 121: 121-05 + 121-06); the 9 Mermaid-bearing lifecycle files are deferred to Phase 122 per the Mermaid-policy dependency (STD-04)
- Full corpus C17-green at 195 files with 0 violations — a clean baseline for Phase 122's Mermaid-resolved retrofit work to build on
- Phase 121 (RETRO-04 glossaries + RETRO-07 partial + RETRO-09) is now complete pending any remaining wave-2 plans in this phase

---
*Phase: 121-structural-retrofit-glossaries-lifecycle-end-user-guides*
*Completed: 2026-07-07*

## Self-Check: PASSED

All 8 modified files confirmed present on disk; both task commits (93649fa, b98f2ca) confirmed in git log.
