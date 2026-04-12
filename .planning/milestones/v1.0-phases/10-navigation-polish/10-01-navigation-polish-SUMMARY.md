---
phase: 10-navigation-polish
plan: "01"
subsystem: docs-navigation
tags: [navigation, l1-runbooks, l2-runbooks, escalation, quick-ref, tech-debt]
dependency_graph:
  requires: []
  provides: [specific-l2-escalation-links, quick-ref-footers, hardware-hash-entry, error-code-cross-ref]
  affects: [docs/l1-runbooks, docs/l2-runbooks, docs/common-issues.md]
tech_stack:
  added: []
  patterns: [symptom-based-routing, mandatory-first-step-escalation, keyword-searchable-index-entry]
key_files:
  created: []
  modified:
    - docs/l1-runbooks/01-device-not-registered.md
    - docs/l1-runbooks/02-esp-stuck-or-failed.md
    - docs/l1-runbooks/03-profile-not-assigned.md
    - docs/l1-runbooks/04-network-connectivity.md
    - docs/l1-runbooks/05-oobe-failure.md
    - docs/l2-runbooks/01-log-collection.md
    - docs/l2-runbooks/02-esp-deep-dive.md
    - docs/l2-runbooks/03-tpm-attestation.md
    - docs/l2-runbooks/04-hybrid-join.md
    - docs/l2-runbooks/05-policy-conflicts.md
    - docs/common-issues.md
decisions:
  - "[NAV-02] Quick-ref footer inserted before final --- separator in each runbook to preserve existing nav links"
  - "[L1RB-01] device-not-registered escalation routes to log-collection first, then hybrid-join if applicable, with generic index as fallback"
  - "[L1RB-03] profile-not-assigned escalation uses symptom-based routing: ESP hangs to ESP Deep-Dive, policy conflicts to Policy Conflict Analysis"
  - "[L1RB-05] OOBE escalation explicitly names log-collection as mandatory first step before investigation routing"
  - "[L2RB-01] Error Code Index added to Tool References in log-collection guide (not inline content)"
  - "[NAV-04] Hardware Hash Issues inserted as standalone H2 between Device Registration and ESP sections in common-issues.md"
metrics:
  duration: "7 minutes"
  completed_date: "2026-04-10"
  tasks_completed: 6
  files_modified: 11
requirements_closed: [L1RB-01, L1RB-03, L1RB-05, L2RB-01, NAV-02, NAV-04]
---

# Phase 10 Plan 01: Navigation Polish Summary

**One-liner:** Specific L2 escalation targets, symptom-based routing, quick-ref footers on all 9 runbooks, hardware hash standalone entry, and error-code cross-reference added — closing all 6 v1.0 tech-debt navigation gaps.

## What Was Built

Six tech-debt items from the v1.0 re-audit were resolved across 11 documentation files:

1. **L1RB-01 — Specific L2 escalation in device-not-registered:** Replaced the generic "See L2 Runbooks" line with a structured escalation path naming `01-log-collection.md` as the first step and `04-hybrid-join.md` as the condition-specific target.

2. **L1RB-03 — Symptom-based routing in profile-not-assigned:** Replaced the generic index link with a three-bullet routing block: ESP hangs to ESP Deep-Dive, policy conflicts to Policy Conflict Analysis, everything else to the L2 index.

3. **L1RB-05 — Log-collection as mandatory first step in OOBE escalation:** Replaced the generic L2 forward-link with explicit language naming `01-log-collection.md` as the mandatory first step before investigation routing.

4. **L2RB-01 — Error-code cross-reference in log-collection guide:** Added Error Code Index link to the Tool References section, creating a reverse navigation path from collected log artifacts to error code tables.

5. **NAV-04 — Standalone Hardware Hash entry in common-issues.md:** Inserted a new H2 section between Device Registration Issues and ESP Failures, creating a keyword-searchable entry with L1/L2 routing for hardware hash issues.

6. **NAV-02 — Quick-ref footer links on all runbooks:** Added `**Quick Reference:** [L1 Quick-Reference Card](../quick-ref-l1.md)` to all 5 L1 runbooks and `**Quick Reference:** [L2 Quick-Reference Card](../quick-ref-l2.md)` to all 4 L2 investigation runbooks (9 files total). Log-collection guide was intentionally excluded — it is a reference, not a consumer of one.

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 (L1RB-01) | 01f5b13 | Make device-not-registered escalation specific |
| Restore (deviation) | 7acaf04 | Restore planning phase files lost during worktree reset |
| Task 2 (L1RB-03) | c89aa5d | Make profile-not-assigned escalation symptom-based |
| Task 3 (L1RB-05) | 9f44bd5 | Add log-collection as mandatory first step in OOBE escalation |
| Task 4 (L2RB-01) | a598144 | Add error-code cross-reference to log-collection guide |
| Task 5 (NAV-04) | 14c98b4 | Add standalone Hardware Hash entry to common-issues.md |
| Task 6 (NAV-02) | 5f137be | Add quick-ref footer links to all L1 and L2 runbooks |

## Verification Results

All 6 success criteria passed:

- SC1: `grep "01-log-collection.md" docs/l1-runbooks/01-device-not-registered.md` — PASS
- SC1: `grep "04-hybrid-join.md" docs/l1-runbooks/01-device-not-registered.md` — PASS
- SC2: `grep "02-esp-deep-dive.md" docs/l1-runbooks/03-profile-not-assigned.md` — PASS
- SC2: `grep "05-policy-conflicts.md" docs/l1-runbooks/03-profile-not-assigned.md` — PASS
- SC3: `grep "01-log-collection.md" docs/l1-runbooks/05-oobe-failure.md` (contains "first") — PASS
- SC4: `grep "error-codes/00-index.md" docs/l2-runbooks/01-log-collection.md` — PASS
- SC5: `grep "## Hardware Hash" docs/common-issues.md` — PASS
- SC6: L1 quick-ref: 5/5 files; L2 quick-ref: 4/4 files — PASS

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Restored planning phase files deleted by worktree reset**
- **Found during:** Setup (before Task 1)
- **Issue:** `git reset --soft` onto the base commit staged phases 08, 09, and 10 planning files for deletion because they existed in the base but not in the HEAD commit of this worktree. The first task commit inadvertently deleted them.
- **Fix:** Restored all 10 affected files from git history using `git show 2886d28:<path>` and committed them immediately after Task 1.
- **Files modified:** `.planning/phases/08-reference-anchors/` (5 files), `.planning/phases/09-navigation-wiring/` (3 files), `.planning/phases/10-navigation-polish/10-01-navigation-polish-PLAN.md`, `.planning/v1.0-MILESTONE-AUDIT.md`
- **Commit:** 7acaf04

## Known Stubs

None. All links point to existing files. `quick-ref-l1.md` and `quick-ref-l2.md` are pre-existing files created in Phase 7.

## Self-Check: PASSED

Files verified:
- `docs/l1-runbooks/01-device-not-registered.md` — contains 01-log-collection.md and 04-hybrid-join.md links
- `docs/l1-runbooks/03-profile-not-assigned.md` — contains 02-esp-deep-dive.md and 05-policy-conflicts.md links
- `docs/l1-runbooks/05-oobe-failure.md` — contains 01-log-collection.md with "first"
- `docs/l2-runbooks/01-log-collection.md` — contains error-codes/00-index.md link
- `docs/common-issues.md` — contains "## Hardware Hash Issues" H2 section
- Quick-ref footers: 5/5 L1 runbooks, 4/4 L2 investigation runbooks

Commits verified present in git log:
- 01f5b13, 7acaf04, c89aa5d, 9f44bd5, a598144, 14c98b4, 5f137be
