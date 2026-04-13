---
phase: 20-cross-platform-foundation
plan: "03"
subsystem: docs
tags: [navigation, cross-platform, index, macos, windows-autopilot]

requires:
  - phase: 20-01
    provides: docs/windows-vs-macos.md (concept comparison page)
  - phase: 20-02
    provides: docs/_glossary-macos.md (macOS provisioning glossary)

provides:
  - Restructured docs/index.md with platform selector at top (Choose Your Platform)
  - Windows Autopilot H2 section grouping all existing role-based subsections
  - macOS Provisioning H2 section with L1/L2/Admin placeholder subsections
  - Cross-Platform References section linking to both glossaries and comparison page
  - platform: all frontmatter field on index.md

affects: [20-04, 20-05, 21, 22, 23, 24, 25]

tech-stack:
  added: []
  patterns:
    - "Platform selector pattern: Choose Your Platform anchor-link section above all platform headings"
    - "TBD placeholder pattern: plain text rows with (TBD - Phase NN) notation, no broken links"
    - "macOS role sections have no framework split (L1/L2/Admin only, not L1-APv1/L1-APv2)"

key-files:
  created: []
  modified:
    - docs/index.md

key-decisions:
  - "Heading text preserved verbatim when demoting H2 to H3 -- anchor slugs are generated from text, not level"
  - "macOS placeholder rows use plain text (no Markdown links) to avoid broken links to non-existent files"
  - "Cross-Platform References replaces Shared References -- expanded with macOS glossary and comparison page"

patterns-established:
  - "Navigation hub restructure pattern: platform selector -> platform H2 sections -> cross-platform section"
  - "Placeholder TBD rows: plain text resource name + (TBD - Phase NN) in When to Use column"

requirements-completed: [NAVX-01]

duration: 5min
completed: 2026-04-13
---

# Phase 20 Plan 03: Cross-Platform Navigation Hub Summary

**docs/index.md restructured as a dual-platform navigation hub with Choose Your Platform selector, Windows Autopilot and macOS Provisioning H2 sections, and a Cross-Platform References section linking all Phase 20 artifacts**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-13T21:30:00Z
- **Completed:** 2026-04-13T21:35:00Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Added `platform: all` frontmatter field and updated banner to cover both Windows Autopilot and macOS ADE
- Changed H1 to platform-neutral "Device Provisioning Documentation" and added Choose Your Platform anchor-link selector
- Moved all existing Windows sections under `## Windows Autopilot`, demoting H2 headings to H3 with exact text preservation
- Added `## macOS Provisioning` section with L1, L2, and Admin sub-sections using plain-text TBD placeholder rows
- Replaced "Shared References" with `## Cross-Platform References` linking to `_glossary.md`, `_glossary-macos.md`, and `windows-vs-macos.md`

## Task Commits

1. **Task 1: Restructure index.md with platform headings and cross-platform navigation (NAVX-01)** - `257f7fe` (feat)

**Plan metadata:** (to be committed with this SUMMARY)

## Files Created/Modified

- `docs/index.md` - Restructured navigation hub with platform selector, Windows and macOS platform sections, Cross-Platform References

## Decisions Made

- Heading text preserved verbatim when demoting H2 to H3 so all existing anchor slugs remain valid (D-07)
- macOS placeholder rows use plain text without Markdown links to avoid broken links before Phase 23/24 content exists (D-17)
- Cross-Platform References section expanded beyond original Shared References to include both glossaries and the comparison page

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

No issues. Pre-check of `grep -rn "index.md#" docs/` confirmed no other files reference anchors on `docs/index.md` itself (only `l2-runbooks/00-index.md#` and `l1-runbooks/00-index.md#` anchors in other files, which are unaffected).

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- docs/index.md is now the complete cross-platform navigation hub for Phase 20
- macOS Provisioning placeholders (TBD - Phase 23 and Phase 24) are wired and waiting for content
- Cross-Platform References section already links to all three Phase 20 artifacts (comparison page, Windows glossary, macOS glossary)
- Phase 25 (navigation finalization) will update the TBD placeholder rows once Phase 23/24 content exists

## Self-Check

### Files exist

- `docs/index.md` - EXISTS (written and verified with grep)
- `.planning/phases/20-cross-platform-foundation/20-03-SUMMARY.md` - this file

### Commits exist

- `257f7fe` - feat(20-03): restructure index.md with platform selector and cross-platform navigation (NAVX-01) - EXISTS

## Self-Check: PASSED

---
*Phase: 20-cross-platform-foundation*
*Completed: 2026-04-13*
