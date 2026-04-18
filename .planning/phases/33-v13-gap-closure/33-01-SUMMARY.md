---
phase: 33-v13-gap-closure
plan: "01"
subsystem: docs/ios-lifecycle
tags: [anchor-fix, ios-lifecycle, l2-runbooks, gap-closure]
dependency_graph:
  requires: []
  provides: [LIFE-02]
  affects: [docs/ios-lifecycle/01-ade-lifecycle.md]
tech_stack:
  added: []
  patterns: [single-line anchor fragment substitution]
key_files:
  modified:
    - docs/ios-lifecycle/01-ade-lifecycle.md
decisions:
  - "Link text 'Mac+cable sysdiagnose' preserved verbatim — only the anchor fragment changed, consistent with how Plan 32-09 handled quick-ref-l2.md"
metrics:
  duration: "< 2 minutes"
  completed: "2026-04-18T17:41:59Z"
  tasks_completed: 1
  files_changed: 1
---

# Phase 33 Plan 01: ADE Lifecycle Anchor Fix Summary

Single-character-level anchor fragment fix: replaced stale `#section-3-mac-cable-sysdiagnose` with `#section-3-sysdiagnose-trigger-and-file-export` on line 364 of `docs/ios-lifecycle/01-ade-lifecycle.md`, restoring the L2 handoff link broken by the Phase 32-09 Section 3 heading rename.

## What Was Done

**Task 1: Fix I-1 anchor fragment on line 364 of 01-ade-lifecycle.md**

Applied a single-substring replacement on line 364. No other content was changed.

### Line 364 — BEFORE

```
  - For advanced investigation: [Mac+cable sysdiagnose](../l2-runbooks/14-ios-log-collection.md#section-3-mac-cable-sysdiagnose) -- see also [ADE Token & Profile Delivery Investigation](../l2-runbooks/15-ios-ade-token-profile.md) for Pattern A-D token-sync context
```

### Line 364 — AFTER

```
  - For advanced investigation: [Mac+cable sysdiagnose](../l2-runbooks/14-ios-log-collection.md#section-3-sysdiagnose-trigger-and-file-export) -- see also [ADE Token & Profile Delivery Investigation](../l2-runbooks/15-ios-ade-token-profile.md) for Pattern A-D token-sync context
```

Change: exact substring `#section-3-mac-cable-sysdiagnose` → `#section-3-sysdiagnose-trigger-and-file-export`. All other text on the line is byte-identical.

## Acceptance Criteria Results

| Check | Command | Result |
|-------|---------|--------|
| Stale anchor eliminated from file | `grep -c "#section-3-mac-cable-sysdiagnose" docs/ios-lifecycle/01-ade-lifecycle.md` | **0** |
| New anchor present in file | `grep -c "#section-3-sysdiagnose-trigger-and-file-export" docs/ios-lifecycle/01-ade-lifecycle.md` | **1** |
| No stale anchor anywhere in docs/ | `grep -rn "#section-3-mac-cable-sysdiagnose" docs/` | **(empty — 0 matches)** |
| Link text preserved | `sed -n '364p' ... | grep -c "Mac+cable sysdiagnose"` | **1** |
| Single-line diff | `git diff --stat docs/ios-lifecycle/01-ade-lifecycle.md` | **1 file, 1 insertion(+), 1 deletion(-)** |
| Target heading exists | `grep -c "^## Section 3: Sysdiagnose Trigger and File Export" docs/l2-runbooks/14-ios-log-collection.md` | **1** (line 104) |

## Stale Slug — Before and After Counts

| Location | Count Before (per audit) | Count After |
|----------|--------------------------|-------------|
| `docs/ios-lifecycle/01-ade-lifecycle.md` | 1 | 0 |
| `docs/` (all files) | 1 | **0** |

This was the only remaining occurrence of the stale slug per the v1.3-MILESTONE-AUDIT.md I-1 entry.

## Commit

| Hash | Message | Files |
|------|---------|-------|
| `0aa07bf` | `docs(33): fix I-1 anchor drift in 01-ade-lifecycle.md:364` | `docs/ios-lifecycle/01-ade-lifecycle.md` |

## Target File Confirmation

`docs/l2-runbooks/14-ios-log-collection.md` contains `## Section 3: Sysdiagnose Trigger and File Export` at line 104. The fixed anchor now resolves correctly to this heading. The heading was renamed in Phase 32 Plan 32-09; the sibling reference in `docs/quick-ref-l2.md` was updated atomically with that rename; this occurrence in `01-ade-lifecycle.md` was the only missed instance.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None.

## Threat Flags

None — anchor-fragment substitution in public documentation introduces no new security surface.

## Self-Check: PASSED

- [x] `docs/ios-lifecycle/01-ade-lifecycle.md` exists and contains the new anchor slug
- [x] Commit `0aa07bf` exists in git log
- [x] Zero stale slug occurrences in `docs/` (repo-wide grep returned empty)
- [x] Diff is exactly 1 insertion + 1 deletion (single-line change confirmed)
