---
phase: 123-orphan-nav-hub-retrofit-navigation-last
plan: 03
subsystem: infra
tags: [markdown-tooling, eee-retrofit, nav-hub, c17, registry]

# Dependency graph
requires:
  - phase: 123-01-nav-hub-fork-registry-prep
    provides: scripts/pipeline/retrofit-nav-hub.mjs (proven fork) + RE-index.md rows RE-218..221
provides:
  - "docs/index.md, docs/common-issues.md, docs/quick-ref-l1.md, docs/quick-ref-l2.md -- EEE-enrolled (doc_id/status/owner/doc_type), net-new >=30-word Summary-first, all 13-plus over-length #12 callouts reflowed word-preserving"
  - "Full-corpus c17-eee-contract.mjs exits 0 (229 files checked, 0 violations) -- SC1 satisfied for the retrofit"
affects: [123-04]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Same-commit fill discipline: fork-run + Summary authoring landed in ONE commit so no [FILL-IN] placeholder ever ships (T-123-05 mitigation)"
    - "Blank-line-vs-empty-'>'-line distinction for C17 #12 grouping: a truly blank line breaks a blockquote group, an empty '>' continuation line does NOT (re-confirmed the hard way after an initial mis-edit)"

key-files:
  created: []
  modified:
    - docs/index.md
    - docs/common-issues.md
    - docs/quick-ref-l1.md
    - docs/quick-ref-l2.md

key-decisions:
  - "Ran retrofit-nav-hub.mjs (123-01 fork) against the 4 explicit nav-hub paths (never --all), confirmed via --dry-run then written for real"
  - "Authored 4 net-new >=30-word scope Summaries (platforms/frameworks + audience) matching the RE-142 exemplar shape; retained each hub's coverage blockquote (with [APv1 vs APv2]/[Windows vs macOS] links) relocated below the Summary"
  - "RESEARCH's 13-callout #12 inventory was incomplete -- 8 additional over-length blockquote groups were discovered only after enrollment made them visible to C17 for the first time (unenrolled files are silently skipped by the checker); fixed all of them since the plan's actual acceptance bar is 'C17 exits 0', not 'exactly these 13 lines'"
  - "index.md:9's 459c single-line landmine resolved via the RESEARCH-precomputed internal 3-way clause split (182c/143c/132c), byte-exact match confirmed before editing"
  - "The 2 quick-ref-l2.md ⚠️ ownership-pointer callouts (lines 320/371 pre-retrofit) de-blockquoted to bold-led normal paragraphs per D-02, rather than A-split, since every split point falls between subject-list and verb"
  - "All #12 fixes are word-preserving by construction: every A-split point is a genuine sentence/clause boundary (verified via a git-diff word-multiset check stripping '>' prefixes, zero real-word deltas); the only 'added words' in the whole diff are the intentional net-new Summary paragraphs and one net-new #11 table-prose-summary sentence"
  - "Did NOT fix the 12 pre-existing broken links (11 '../' over-escapes in quick-ref-l2.md + 1 dead anchor in common-issues.md) -- explicitly out of scope per D-01/plan constraint, deferred to 123-04's separate git-blame-attributed commit"
  - "Did NOT run the link-checker to green here -- also 123-04's job; C17 has no link/anchor assertion so this plan's SC1 proof is unaffected by the still-broken links"

requirements-completed: []  # RETRO-06 spans 123-03 (EEE+Summary+C17-green, this plan) + 123-04 (routing/link accuracy, deferred); NOT marked complete here -- see Deviations

# Metrics
duration: ~40min
completed: 2026-07-08
---

# Phase 123 Plan 03: Nav-Hub Retrofit + #12 Reflow to C17-Green Summary

**All 4 orphan nav-hubs (index.md, common-issues.md, quick-ref-l1.md, quick-ref-l2.md) EEE-enrolled with net-new Summaries and 21 word-preserving #12 callout reflows, driving the full 229-file corpus to C17-green (0 violations) -- SC1 satisfied.**

## Performance

- **Duration:** ~40 min
- **Tasks:** 2 completed
- **Files modified:** 4

## Accomplishments
- Ran `retrofit-nav-hub.mjs` (--dry-run then for real) against the 4 explicit nav-hub paths, injecting `doc_id` (RE-218/219/220/221), `status: Approved`, `owner`, `doc_type: Reference`, the EEE header block, and relocating each hub's pre-H1 coverage blockquote below a new `## Summary` placeholder
- Authored 4 net-new >=30-word scope Summaries (platforms/frameworks covered + intended audience) in the same commit as the fork run -- zero `[FILL-IN]` tokens ever shipped
- Reflowed 21 over-length `#12` blockquote groups word-preserving: the 13 RESEARCH-enumerated callouts (11 A-split incl. `index.md:9`'s internal 3-way landmine + 2 de-blockquote) plus 8 additional violations that only became visible to C17 once the 4 files were enrolled (the shared "Platform coverage" intro blockquote present in all 4 hubs, and 6 pre-existing macOS/iOS/Windows cross-reference banner-pair blockquotes in `common-issues.md`)
- Added one net-new prose-summary sentence under `index.md`'s 26-row Cross-Platform References table to satisfy C17 assertion `#11` (also invisible pre-enrollment)
- Full-corpus `c17-eee-contract.mjs` now exits 0 across 229 files (up from 225 at Phase 122 close), confirming SC1

## Task Commits

Each task was committed atomically:

1. **Task 1: Run the fork on the 4 hubs + author the 4 net-new Summaries** - `15b1b20` (feat)
2. **Task 2: Hand-apply the #12 callout reflows and drive C17 to green** - `d2ea0c8` (fix)

**Plan metadata:** (this commit)

## Files Created/Modified
- `docs/index.md` - EEE-enrolled (RE-219); net-new Summary; index.md:9's 459c landmine split into 4 A-split groups; net-new #11 table-prose-summary line
- `docs/common-issues.md` - EEE-enrolled (RE-218); net-new Summary; 12 total #12 fixes (5 RESEARCH-listed A-splits + 7 previously-invisible violations, all blank-line separations of already-independent sentences)
- `docs/quick-ref-l1.md` - EEE-enrolled (RE-220); net-new Summary; 1 #12 fix (its own Platform-coverage intro blockquote, invisible to C17 pre-enrollment -- RESEARCH's "zero violations" claim for this file was based on the pre-retrofit unenrolled state)
- `docs/quick-ref-l2.md` - EEE-enrolled (RE-221); net-new Summary; 7 #12 fixes (5 RESEARCH-listed A-splits + 2 de-blockquotes + the same shared intro-blockquote fix)

## Decisions Made
See `key-decisions` in frontmatter. Most significant: RESEARCH's 13-callout #12 inventory undercounted by 8 (all invisible pre-enrollment since C17 silently skips unenrolled files) -- fixed all discovered violations rather than stopping at the plan's literal 13-line list, because the plan's actual done-criterion is "C17 exits 0 on all 4 hubs," which the 13-line list alone would not have achieved.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] RESEARCH's #12 callout inventory was incomplete -- 8 additional over-length blockquote groups discovered post-enrollment**
- **Found during:** Task 2, first full C17 scoped run after applying the 13 RESEARCH-listed reflows
- **Issue:** `c17-eee-contract.mjs` "un-enrolled files are silently skipped" -- before Task 1's fork run, none of the 4 hubs had a `doc_id`, so C17 had never actually checked their blockquotes. RESEARCH's manual audit measured only the pre-retrofit file content and missed: (a) the shared "Platform coverage" intro blockquote present in ALL 4 hubs (already a 2-line joined group exceeding 200c in `common-issues.md`, `quick-ref-l1.md`, and `quick-ref-l2.md` -- `index.md`'s copy WAS caught since it was the stated landmine), and (b) 6 pre-existing macOS/iOS/Windows cross-reference banner-pair blockquotes in `common-issues.md` that were always two consecutive `>` lines with no blank line between them.
- **Fix:** For each newly-discovered group, inserted a genuine blank line between the already-independent sentences (each half was already a complete, self-contained sentence under 200c alone) -- zero rewording, zero splitting of a single sentence, pure blank-line separation.
- **Files modified:** docs/common-issues.md (7 additional groups), docs/quick-ref-l1.md (1 group), docs/quick-ref-l2.md (1 group)
- **Verification:** Re-ran the C17 grouping algorithm as a standalone Node script against all 4 files after each fix; scoped and full-corpus `c17-eee-contract.mjs` runs both exit 0
- **Committed in:** d2ea0c8 (Task 2 commit)

**2. [Rule 1 - Bug] C17 assertion #11 (table >25 rows needs a prose summary within 5 lines) fired on `index.md`'s 26-row Cross-Platform References table**
- **Found during:** Task 2, same C17 run as above
- **Issue:** Same root cause as #1 -- this table's row count was never checked by C17 before enrollment. The table is immediately followed by a blank line then `## Version History`, with no prose line in between.
- **Fix:** Added one net-new prose sentence describing the table's scope directly after the last table row, before the blank line and `## Version History` heading (matches the Phase-118 precedent for the same assertion).
- **Files modified:** docs/index.md
- **Verification:** `c17-eee-contract.mjs` assertion #11 count dropped to 0 for index.md
- **Committed in:** d2ea0c8 (Task 2 commit)

**3. [Correction to plan's stated acceptance criterion] `docs/quick-ref-l1.md` DOES have one #12 edit, contrary to the plan's acceptance-criteria bullet "docs/quick-ref-l1.md has no #12 callout edits (it had zero violations)"**
- **Found during:** Task 2
- **Issue:** The plan (and RESEARCH before it) asserted quick-ref-l1.md had zero over-length callouts, based on reading the pre-retrofit file. Its own relocated Platform-coverage intro blockquote (2 lines, 312 chars joined) exceeds 200c and required the same blank-line fix as the other 3 hubs.
- **Fix:** Same treatment as issue #1 above (blank-line separation, zero rewording).
- **Files modified:** docs/quick-ref-l1.md
- **Verification:** C17 #12 count for quick-ref-l1.md is 0
- **Committed in:** d2ea0c8 (Task 2 commit)

---

**Total deviations:** 3 auto-fixed/corrected (all Rule 1 -- bugs in the plan's/RESEARCH's pre-enrollment measurement, not architectural changes)
**Impact on plan:** All three were necessary to satisfy the plan's own stated done-criterion ("C17 exits 0 on all 4 hubs"). No scope creep -- no link fixes, no content re-review, no #12 rewording occurred; every fix was a word-preserving blank-line separation or a single net-new prose sentence required by a distinct C17 assertion (#11).

## Requirement Completion Note

`RETRO-06`'s own text (`REQUIREMENTS.md:22`) requires BOTH "C17 exits 0 on every nav-hub file" (satisfied by this plan) AND "Routing/link tables remain accurate" (the 12 pre-existing broken links + the link-checker green-run, both explicitly deferred to 123-04 per this plan's constraints). `requirements.mark-complete RETRO-06` was run once, then reverted (REQUIREMENTS.md checkbox + traceability row restored to Pending) upon recognizing the link-accuracy half of the requirement is not yet satisfied. RETRO-06 stays Pending until 123-04 closes it — mirrors the 121-05/123-01 precedent of not completing a requirement that spans multiple plans until every plan lands.

## Issues Encountered
- Mid-Task-2, an initial attempt to split `index.md:9`'s 3-way landmine used bare `>` continuation lines (`>` with no content) as group separators. Re-read of `c17-eee-contract.mjs:393-402` confirmed an empty `>` line does NOT break a blockquote group (only a truly blank line does) -- caught before committing, corrected to genuine blank lines, re-verified via the standalone grouping script before proceeding.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 4 nav-hubs are EEE-enrolled, Summary-first, and C17-green (SC1 fully satisfied)
- The 12 pre-existing broken links (11 `../` over-escapes in quick-ref-l2.md + 1 dead anchor in common-issues.md) remain untouched, exactly as scoped -- ready for 123-04's separate git-blame-attributed fix commit
- The link-checker (`check-nav-hub-links.mjs`, per 123-02) has not yet been run to green against the final corpus -- also 123-04's job
- No blockers for 123-04

---
*Phase: 123-orphan-nav-hub-retrofit-navigation-last*
*Completed: 2026-07-08*

## Self-Check: PASSED

- FOUND: docs/index.md
- FOUND: docs/common-issues.md
- FOUND: docs/quick-ref-l1.md
- FOUND: docs/quick-ref-l2.md
- FOUND: .planning/phases/123-orphan-nav-hub-retrofit-navigation-last/123-03-SUMMARY.md
- FOUND: 15b1b20 (Task 1 commit)
- FOUND: d2ea0c8 (Task 2 commit)
- FOUND: 30a9771 (SUMMARY commit)
