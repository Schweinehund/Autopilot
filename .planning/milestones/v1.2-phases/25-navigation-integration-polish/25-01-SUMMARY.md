---
phase: 25-navigation-integration-polish
plan: 01
subsystem: documentation
tags: [navigation, cross-platform, macOS, ADE, quick-reference, common-issues]

# Dependency graph
requires:
  - phase: 24-macos-troubleshooting
    provides: "6 macOS L1 runbooks (10-15), 4 macOS L2 runbooks (10-13), macOS triage decision tree"
  - phase: 22-macos-lifecycle-foundation
    provides: "macOS ADE lifecycle docs, Terminal commands reference, log paths reference"
provides:
  - "Cross-platform common-issues.md with platform selector, Windows section, and macOS ADE section"
  - "L1 quick-reference card with macOS ADE top checks, escalation triggers, and runbook links"
  - "L2 quick-reference card with macOS log collection commands, Terminal diagnostics, and investigation runbooks"
affects: [25-02-reachability-audit, docs/index.md]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Section-based platform separation: macOS and Windows content in separate H2 sections within the same file"
    - "Bidirectional cross-reference banners: Windows sections get macOS redirect, macOS sections get Windows redirect"
    - "Platform selector at top of multi-platform navigation files with anchor links to each section"

key-files:
  created: []
  modified:
    - docs/common-issues.md
    - docs/quick-ref-l1.md
    - docs/quick-ref-l2.md

key-decisions:
  - "Hybrid approach for common-issues.md: new macOS section appended + cross-reference banners in shared Windows symptom categories (device registration, profile assignment, network, security)"
  - "APv2 sections demoted from H2 to H3 under the new Windows Autopilot Issues H2, maintaining document hierarchy"
  - "Cross-reference banners applied selectively: only to symptom categories with macOS equivalents (device registration, profile, network, security); NOT to Windows-only categories (ESP, TPM, hybrid join, policy conflicts)"
  - "platform: all frontmatter applied to all three files"

patterns-established:
  - "Choose Your Platform selector: anchor-link list at top of cross-platform files routing users to their platform section"
  - "Bidirectional cross-reference banners: one-line blockquote in each platform section pointing to the other platform's equivalent"
  - "Quick-ref card extension: macOS section appended after APv2 section following the same structural template (checks, escalation triggers, decision tree, runbooks)"

requirements-completed: [NAVX-02, NAVX-03]

# Metrics
duration: 4min
completed: 2026-04-15
---

# Phase 25 Plan 01: Navigation Integration — Cross-Platform Routing Summary

**Cross-platform symptom routing wired into common-issues.md, quick-ref-l1.md, and quick-ref-l2.md with macOS ADE sections, platform selectors, and bidirectional cross-reference banners**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-16T00:50:13Z
- **Completed:** 2026-04-16T00:54:00Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Added "Choose Your Platform" selector, `## Windows Autopilot Issues` H2, and `## macOS ADE Failure Scenarios` section to common-issues.md — all 6 macOS L1 and 4 macOS L2 runbooks are now reachable from the routing index
- Added `## macOS ADE Quick Reference` section to quick-ref-l1.md with 4 top checks, 5 escalation triggers, decision tree link, and 6 L1 runbook links
- Added `## macOS ADE Quick Reference` section to quick-ref-l2.md with IntuneMacODC command, 5 Terminal diagnostic commands, 3 critical log paths, and 4 L2 investigation runbook links
- Updated `platform: all` frontmatter on all three files; zero cross-contamination between platform sections verified

## Task Commits

Each task was committed atomically:

1. **Task 1: Add macOS platform selector, cross-reference banners, and macOS ADE section to common-issues.md** - `76c78c9` (feat)
2. **Task 2: Append macOS ADE sections to L1 and L2 quick-reference cards** - `4bbbbed` (feat)

**Plan metadata:** (pending final commit)

## Files Created/Modified

- `docs/common-issues.md` - Renamed H1 to "Common Provisioning Issues", added platform selector, wrapped Windows content under new H2, added cross-reference banners in 4 shared categories, appended macOS ADE section with 6 failure scenarios, updated Version History and frontmatter
- `docs/quick-ref-l1.md` - Updated frontmatter and framework banner, appended macOS ADE Quick Reference section with checks/escalation/tree/runbooks
- `docs/quick-ref-l2.md` - Updated frontmatter and framework banner, appended macOS ADE Quick Reference section with log collection commands, Terminal diagnostics, log paths table, and investigation runbooks

## Decisions Made

- APv2 failure scenarios section in common-issues.md was demoted from H2 to H3 (under `## Windows Autopilot Issues`). This maintains clean document hierarchy — APv2 is a Windows sub-framework, not a peer platform to macOS.
- Cross-reference banners added to Device Registration Issues, Profile Assignment Issues, Network Connectivity Issues, and Security and Enrollment Issues — the four categories with meaningful macOS parallels. ESP Failures, TPM Attestation, Policy Conflicts, Hybrid Join, Device Renamed, APv2 sections, Device Reset, and Migration Issues received no banners (Windows-specific).

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All three navigation files now cover Windows + macOS with clean platform separation
- Plan 02 (reachability audit) can proceed to verify every Phase 20-24 file is reachable from docs/index.md within two clicks
- The macOS quick-ref fragment anchors (`#macos-ade-quick-reference`) are now in place for docs/index.md to link to directly

---
*Phase: 25-navigation-integration-polish*
*Completed: 2026-04-15*
