---
phase: 07-navigation
plan: 02
subsystem: documentation
tags: [quick-reference, l1, l2, cheat-sheet, autopilot]

requires:
  - phase: 05-l1-runbooks
    provides: L1 runbook escalation criteria and runbook structure
  - phase: 06-l2-runbooks
    provides: L2 investigation procedures, log collection commands, registry paths
  - phase: 04-l1-decision-trees
    provides: Decision tree structure and node routing

provides:
  - L1 one-screen cheat sheet with top 5 checks and escalation triggers (docs/quick-ref-l1.md)
  - L2 copy-pasteable cheat sheet with commands, paths, and event IDs (docs/quick-ref-l2.md)

affects: [navigation, index, onboarding]

tech-stack:
  added: []
  patterns:
    - "Quick-reference cards are standalone print-and-pin artifacts; L1 cards never include registry/PowerShell, L2 cards include literal copy-pasteable values"
    - "All links from docs/ root — no ../ prefix on any link in these files"

key-files:
  created:
    - docs/quick-ref-l1.md
    - docs/quick-ref-l2.md
  modified: []

key-decisions:
  - "L1 card has no PowerShell or registry content — these are L2 scope; strict audience separation enforced"
  - "L2 card contains literal copy-pasteable strings for all commands, log paths, and registry paths — descriptions alone are insufficient"
  - "Infrastructure/Network team is the explicit escalation target for network failures from L1, not L2 — matches Phase 05 decision"

patterns-established:
  - "Pattern: Quick-reference card format — frontmatter + version gate + numbered checks + bullet triggers + one-line resource links"

requirements-completed: [NAV-02, NAV-03]

duration: 3min
completed: 2026-03-23
---

# Phase 07 Plan 02: Quick-Reference Cards Summary

**Created L1 monitor-taped cheat sheet and L2 terminal-tab copy-pasteable reference covering the full Autopilot troubleshooting toolkit.**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-23T13:18:11Z
- **Completed:** 2026-03-23T13:21:11Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Created `docs/quick-ref-l1.md` — one-screen L1 cheat sheet with top 5 checks as a numbered checklist, 8 escalation trigger bullets with explicit Infrastructure/Network routing for network failures, links to all 4 decision trees and all 5 L1 runbooks; no PowerShell or registry content; 44 content lines (under 60 limit)
- Created `docs/quick-ref-l2.md` — copy-pasteable L2 reference with exact mdmdiagnosticstool.exe command, 6 PowerShell diagnostic functions with exact syntax, 4 literal Event Viewer log path strings, 4 registry paths with when-to-use context, event IDs grouped by scenario (807, 908, 809, 815, 171, 172), links to all 5 L2 runbooks and reference files
- Both cards use YAML frontmatter per D-08, version gate banners, and correct docs/-root-relative links (no `../`)

## Task Commits

1. **Task 1: Create L1 quick-reference card** - `7d016c2` (feat)
2. **Task 2: Create L2 quick-reference card** - `b592190` (feat)

**Plan metadata:** _(see final commit)_

## Files Created/Modified

- `docs/quick-ref-l1.md` — L1 one-screen cheat sheet: top 5 checks, escalation triggers, resource links
- `docs/quick-ref-l2.md` — L2 copy-pasteable reference: mdmdiagnosticstool, PowerShell commands, log paths, registry paths, event IDs

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None — both cards contain literal values and real resource links with no placeholder content.
