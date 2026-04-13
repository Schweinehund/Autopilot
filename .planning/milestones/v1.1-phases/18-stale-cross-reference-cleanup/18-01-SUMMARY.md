---
phase: 18-stale-cross-reference-cleanup
plan: 01
subsystem: documentation
tags: [cross-references, navigation, editorial-cleanup]
dependency_graph:
  requires: []
  provides: [stale-reference-cleanup, apv2-note-link, apv1-version-gates, apv2-lifecycle-index-entry]
  affects: [docs/error-codes/00-index.md, docs/admin-setup-apv2/*.md, docs/lifecycle-apv2/03-automatic-mode.md, docs/admin-setup-apv1/00-overview.md, docs/index.md]
tech_stack:
  added: []
  patterns: [version-gate-link-pattern, shared-references-table-pattern]
key_files:
  created: []
  modified:
    - docs/error-codes/00-index.md
    - docs/admin-setup-apv2/00-overview.md
    - docs/admin-setup-apv2/01-prerequisites-rbac.md
    - docs/admin-setup-apv2/02-etg-device-group.md
    - docs/admin-setup-apv2/03-device-preparation-policy.md
    - docs/admin-setup-apv2/04-corporate-identifiers.md
    - docs/lifecycle-apv2/03-automatic-mode.md
    - docs/admin-setup-apv1/00-overview.md
    - docs/index.md
decisions: []
metrics:
  duration: 3min
  completed: "2026-04-13T15:24:15Z"
  tasks: 2
  files: 9
---

# Phase 18 Plan 01: Stale Cross-Reference Cleanup Summary

Fixed all stale cross-references, broken anchors, and missing navigation links across 9 documentation files -- 10 discrete text edits replacing Phase 15/16 placeholders with valid Markdown links, fixing one broken anchor, and adding the APv2 Lifecycle Overview to the index.

## Completed Tasks

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Fix error-codes APv2 Note link and replace all 5 APv2 admin version gate placeholders | dad0a2b | docs/error-codes/00-index.md, docs/admin-setup-apv2/00-overview.md, docs/admin-setup-apv2/01-prerequisites-rbac.md, docs/admin-setup-apv2/02-etg-device-group.md, docs/admin-setup-apv2/03-device-preparation-policy.md, docs/admin-setup-apv2/04-corporate-identifiers.md |
| 2 | Fix lifecycle automatic mode Phase 15 references, APv1 overview broken anchor, and add APv2 lifecycle to index Shared References | 96eb9ba | docs/lifecycle-apv2/03-automatic-mode.md, docs/admin-setup-apv1/00-overview.md, docs/index.md |

## Changes Made

### Task 1: Error-codes APv2 Note and version gate placeholders (6 files)

**Edit 1 -- docs/error-codes/00-index.md:** Replaced generic "check the APv2 Notes section at the bottom of each category page" text in the APv2 Note blockquote with a direct link to the APv2 Device Preparation Failure Catalog (`06-apv2-device-preparation.md`). Closes TROU-01 and NAVG-02.

**Edits 2-6 -- docs/admin-setup-apv2/00-04:** Replaced `[APv1 Admin Setup Guides -- coming in Phase 16]` (invalid Markdown -- renders as plain text) with `[APv1 Admin Setup Guides](../admin-setup-apv1/00-overview.md)` (valid link) in the version gate blockquote of all 5 APv2 admin setup files.

### Task 2: Phase 15 placeholders, broken anchor, and index entry (3 files)

**Edit 1 -- docs/lifecycle-apv2/03-automatic-mode.md (2 locations):** Replaced "APv2 Admin Setup Guide (Phase 15)" and "APv2 Admin Setup Guide (planned for Phase 15)" with linked references to `../admin-setup-apv2/00-overview.md`.

**Edit 2 -- docs/admin-setup-apv1/00-overview.md:** Fixed broken anchor `#decision-flowchart` to `#which-guide-do-i-use` (the actual GFM-generated anchor for the "Which Guide Do I Use?" heading in apv1-vs-apv2.md).

**Edit 3 -- docs/index.md:** Added "APv2 Lifecycle Overview" row to the Shared References table, linking to `lifecycle-apv2/00-overview.md` with description of APv2 deployment model, ETG mechanism, and automatic mode.

## Verification Results

All 5 verification checks passed plus a full sweep:

1. `grep "06-apv2-device-preparation.md" docs/error-codes/00-index.md` -- 1 match (APv2 Note with direct link)
2. `grep "coming in Phase 16" docs/admin-setup-apv2/*.md` -- 0 matches
3. `grep "Phase 15" docs/lifecycle-apv2/03-automatic-mode.md` -- 0 matches
4. `grep "decision-flowchart" docs/admin-setup-apv1/00-overview.md` -- 0 matches
5. `grep "lifecycle-apv2/00-overview.md" docs/index.md` -- 1 match in Shared References table
6. `grep -rn "coming in Phase 16|Phase 15|decision-flowchart" docs/` -- 0 matches (full sweep clean)

## Deviations from Plan

None -- plan executed exactly as written.

## Known Stubs

None -- all links point to existing files with real content.

## Self-Check: PASSED

- All 9 modified files exist on disk
- Commit dad0a2b found in git log
- Commit 96eb9ba found in git log
