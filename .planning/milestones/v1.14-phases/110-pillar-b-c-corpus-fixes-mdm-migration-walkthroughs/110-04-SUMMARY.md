---
phase: 110-pillar-b-c-corpus-fixes-mdm-migration-walkthroughs
plan: "04"
subsystem: docs/ios-lifecycle
tags: [navigation, ios, mdm-migration, nav-hub, MIGF-01]
dependency_graph:
  requires: ["110-02"]
  provides: [MIGF-01-discoverability]
  affects: [docs/index.md, docs/ios-lifecycle/00-enrollment-overview.md]
tech_stack:
  added: []
  patterns: [navigation-last, link-not-copy, append-only-nav]
key_files:
  created: []
  modified:
    - docs/index.md
    - docs/ios-lifecycle/00-enrollment-overview.md
decisions:
  - "iOS migration walkthrough placed in L2 Desktop Engineering table adjacent to iOS ADE Lifecycle row (line ~167), mirroring macOS pattern and honouring ONE-row acceptance constraint"
  - "See Also bullet inserted second in 00-enrollment-overview.md list, between ADE Lifecycle and macOS ADE Lifecycle, preserving logical ordering"
metrics:
  duration: "< 5m"
  completed: "2026-07-01"
  tasks_completed: 1
  files_modified: 2
---

# Phase 110 Plan 04: iOS Migration Walkthrough Nav-Hub Wiring Summary

**One-liner:** Wired `docs/ios-lifecycle/02-mdm-migration.md` into the iOS/iPadOS Provisioning L2 Desktop Engineering table in `docs/index.md` and the See Also section of `docs/ios-lifecycle/00-enrollment-overview.md` to complete MIGF-01 discoverability.

## What Was Built

Navigation-last wiring for the iOS/iPadOS MDM Migration Walkthrough (MIGF-01) committed in plan 110-02. Two append-only edits to existing nav hubs:

1. **`docs/index.md`** — new table row in the iOS/iPadOS Provisioning > Desktop Engineering (L2) table, immediately after the iOS ADE Lifecycle row (line 167):
   `[iOS/iPadOS MDM Migration Walkthrough (Kandji/Iru → Intune)](ios-lifecycle/02-mdm-migration.md)` with description covering the in-place ABM Deadline path (iOS/iPadOS 26+) and pre-26 wipe pointer.

2. **`docs/ios-lifecycle/00-enrollment-overview.md`** — new See Also bullet:
   `[iOS/iPadOS MDM Migration Walkthrough](02-mdm-migration.md) -- for migrating an already-ADE-enrolled fleet from Kandji/Iru to Intune (in-place, iOS/iPadOS 26+)`

## Tasks

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add iOS migration walkthrough entries to index.md and enrollment-overview See Also | cf6aa5c | docs/index.md, docs/ios-lifecycle/00-enrollment-overview.md |

## Acceptance Criteria Results

- `grep -c "ios-lifecycle/02-mdm-migration.md" docs/index.md` == **1** ✓
- New row is inside the "## iOS/iPadOS Provisioning" section (not macOS section) ✓
- `grep -c "02-mdm-migration.md" docs/ios-lifecycle/00-enrollment-overview.md` == **1** ✓
- `docs/ios-lifecycle/02-mdm-migration.md` exists on disk (target of both links resolves) ✓
- FIX-01 macOS L1 Runbooks row ("9 macOS L1 runbooks — 6 ADE plus 3 Platform SSO; see row below") byte-unchanged ✓

## Navigation-Last Invariant

This plan's commit `cf6aa5c` post-dates the 110-02 content commit that created `docs/ios-lifecycle/02-mdm-migration.md`. Navigation-last invariant satisfied.

## Deviations from Plan

None — plan executed exactly as written. The one-row placement is in the L2 Desktop Engineering table adjacent to the iOS ADE Lifecycle row (~:167), matching the plan's explicit direction and the `grep -c == 1` acceptance criterion.

## Threat Flags

None. Only Markdown nav links added; no executable code, no new files, no runtime input.

## Self-Check: PASSED

- `docs/index.md` modified with exactly one new row: CONFIRMED via `grep -c` == 1
- `docs/ios-lifecycle/00-enrollment-overview.md` modified with exactly one new bullet: CONFIRMED via `grep -c` == 1
- `docs/ios-lifecycle/02-mdm-migration.md` exists: CONFIRMED
- Commit cf6aa5c exists: CONFIRMED
- FIX-01 macOS row unchanged at line 110: CONFIRMED
