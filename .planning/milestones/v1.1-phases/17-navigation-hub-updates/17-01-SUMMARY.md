---
phase: 17-navigation-hub-updates
plan: "01"
subsystem: docs
tags: [documentation, navigation, hub, apv2, index, common-issues, error-codes]

# Dependency graph
requires:
  - phase: 13-apv2-l1-runbooks
    provides: APv2 L1 runbooks (06-09) and triage decision tree that hub now links to
  - phase: 14-apv2-l2-runbooks
    provides: APv2 L2 runbooks (06-08) that hub now links to
  - phase: 15-apv2-admin-setup
    provides: APv2 admin setup guides (admin-setup-apv2/) that index now links to
  - phase: 16-apv1-admin-setup
    provides: APv1 admin setup guides (admin-setup-apv1/) that index now links to
provides:
  - docs/index.md with APv2 L1/L2 subsections, Admin Setup section, dual-framework frontmatter
  - docs/common-issues.md with APv2 Failure Scenarios section routing exclusively to APv2 runbooks
  - docs/error-codes/00-index.md with updated dual-framework frontmatter and version gate
affects: [17-02, 17-03, all navigation users of index.md and common-issues.md]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Hub restructure: split single-audience sections into APv1/APv2 subsections with framework labels"
    - "Framework label pattern: **Framework:** APv1 (classic) / **Framework:** APv2 (Device Preparation)"
    - "Dual-framework version gate: Framework coverage blockquote replacing single-framework Version gate"
    - "APv2 symptom routing: separate section below APv1 content, linking exclusively to APv2 runbooks"

key-files:
  created: []
  modified:
    - docs/index.md
    - docs/common-issues.md
    - docs/error-codes/00-index.md

key-decisions:
  - "Split index.md L1 and L2 sections into APv1/APv2 subsections rather than adding APv2 as a single blob at the bottom — makes each audience's path self-contained"
  - "Admin Setup section placed between L2 and Shared References, no framework label on the heading itself since it contains both frameworks"
  - "common-issues.md APv2 section appended below existing APv1 content with horizontal rule separator — preserves existing APv1 navigation intact"
  - "Framework disambiguation pointer added near top of common-issues.md to help users who don't know which framework applies"

patterns-established:
  - "Pattern: hub files that cover both frameworks use applies_to: both + dual-framework version gate blockquote"
  - "Pattern: APv2 symptom entries link ONLY to APv2 runbooks (06-09 L1, 06-08 L2) — zero cross-contamination with APv1 runbooks"

requirements-completed: [NAVG-01, NAVG-03]

# Metrics
duration: 6min
completed: 2026-04-13
---

# Phase 17 Plan 01: Navigation Hub Updates Summary

**Three primary hub files restructured with APv2 navigation paths, framework labels, and Admin audience section — L1/L2/Admin can reach APv2 content from index.md in one click**

## Performance

- **Duration:** ~6 min
- **Started:** 2026-04-13T14:23:29Z
- **Completed:** 2026-04-13T14:29:33Z
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments

- index.md restructured: L1 and L2 sections each split into APv1/APv2 subsections with framework labels, new Admin Setup section linking to both admin guide sets
- common-issues.md extended: APv2 Failure Scenarios section with 4 symptom entries routing exclusively to APv2 runbooks, framework disambiguation pointer, framework labels on both sections
- error-codes/00-index.md updated: frontmatter changed to applies_to: both, dual-framework version gate, existing APv2 Note preserved

## Task Commits

1. **Task 1: Restructure docs/index.md with APv2 sections and Admin audience** - `0a9c96b` (feat)
2. **Task 2: Add APv2 failure routing to docs/common-issues.md** - `5c317dc` (feat)
3. **Task 3: Update docs/error-codes/00-index.md frontmatter and framework labels** - `a3aeddb` (chore)

## Files Created/Modified

- `docs/index.md` - Restructured with APv2 L1/L2 subsections, Admin Setup section, dual-framework frontmatter and version gate
- `docs/common-issues.md` - Added APv2 Failure Scenarios section (4 symptom entries), framework labels, disambiguation pointer, updated frontmatter
- `docs/error-codes/00-index.md` - Updated frontmatter (applies_to: both, refreshed dates) and dual-framework version gate; existing APv2 Note preserved

## Decisions Made

- Split L1 and L2 sections into APv1/APv2 subsections rather than appending APv2 as a separate block at the bottom of the page — each audience role now has a self-contained navigation path
- Admin Setup section placed between L2 APv2 and Shared References with no framework label on the heading itself, since the section inherently contains both frameworks in its table
- Horizontal rule separator used between APv1 symptom categories and APv2 Failure Scenarios section in common-issues.md for clear visual break
- Framework disambiguation pointer added near top of common-issues.md (per D-05) to guide users who don't know which framework they're on

## Deviations from Plan

None — plan executed exactly as written. All three tasks matched the specified structure, content, and acceptance criteria precisely.

## Issues Encountered

- Worktree had its own docs/ directory separate from the main repo docs/. Initial writes went to the main repo path instead of the worktree path. Corrected by writing to the worktree-relative paths.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All three hub files now have APv2 navigation paths and dual-framework frontmatter
- index.md provides one-click access to APv2 triage tree, all APv2 L1/L2 runbooks, and both admin setup guide sets
- common-issues.md APv2 section routes exclusively to APv2 runbooks — no cross-contamination verified
- Ready for Phase 17 Plan 02 (back-links to APv1 files) and Plan 03 (glossary extension)

## Known Stubs

None — all links in modified files point to verified existing files.

## Self-Check: PASSED

- docs/index.md: FOUND
- docs/common-issues.md: FOUND
- docs/error-codes/00-index.md: FOUND
- .planning/phases/17-navigation-hub-updates/17-01-SUMMARY.md: FOUND
- commit 0a9c96b (Task 1): FOUND
- commit 5c317dc (Task 2): FOUND
- commit a3aeddb (Task 3): FOUND

---
*Phase: 17-navigation-hub-updates*
*Completed: 2026-04-13*
