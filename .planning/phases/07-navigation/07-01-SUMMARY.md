---
phase: 07-navigation
plan: "01"
subsystem: docs
tags: [navigation, index, master-index, common-issues, role-based]
dependency_graph:
  requires: [06-l2-runbooks, 05-l1-runbooks, 04-l1-decision-trees, 03-error-codes, 02-lifecycle, 01-foundation]
  provides: [docs/index.md, docs/common-issues.md]
  affects: [docs/index.md, docs/common-issues.md]
tech_stack:
  added: []
  patterns: [role-based navigation, symptom-to-runbook routing, audience-separated tables]
key_files:
  created: [docs/index.md]
  modified: [docs/common-issues.md]
decisions:
  - "docs/index.md uses audience: both with three distinct H2 sections; shared resources appear only once in Shared References per D-04"
  - "common-issues.md transformed to pure navigation index per D-09; only Device Renamed section retains inline content per D-11"
  - "Network connectivity in common-issues.md correctly routes to Infrastructure/Network team, not L2 Desktop Engineering"
metrics:
  duration: "2 minutes"
  completed: 2026-03-23
  tasks_completed: 2
  files_changed: 2
---

# Phase 07 Plan 01: Master Index and Common Issues Transformation Summary

Role-based master documentation entry point (docs/index.md) and transformed common-issues.md navigation index that routes symptoms to L1/L2 runbooks with no inline troubleshooting content.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Create master documentation index (docs/index.md) | 63bdff7 | docs/index.md (created) |
| 2 | Transform common-issues.md into navigation index | d34a354 | docs/common-issues.md (rewritten) |

## What Was Built

### Task 1: docs/index.md

New root-level master index providing role-separated navigation:

- **Service Desk (L1) section:** Links to 4 decision trees, L1 runbooks index, and L1 quick-reference card
- **Desktop Engineering (L2) section:** Links to L2 runbooks index, log collection guide, PowerShell reference, registry paths, network endpoints, and L2 quick-reference card
- **Shared References section:** Lists glossary, error code index, lifecycle overview, APv1 vs APv2, and common issues index — each resource appears once only (not duplicated across role sections per D-04)

File follows established conventions: YAML frontmatter with `audience: both`, version gate banner, first-mention glossary linking, and version history table at bottom. All links use relative paths from docs/ root with no `../` prefix.

### Task 2: docs/common-issues.md

Existing 200-line inline troubleshooting page rewritten as a pure navigation index:

- All 8 issue categories preserved as H2 headers per D-10
- Each category reduced to: one-line symptom description + L1 runbook link + L2 runbook link
- All inline PowerShell commands, diagnostic steps, root cause lists, and remediation blocks removed per D-09
- Device Renamed section retained as 3-4 line inline tip per D-11 (no runbook counterpart exists)
- Network connectivity category routes to Infrastructure/Network team, not L2 (consistent with l1-runbooks/04-network-connectivity.md and STATE.md decision)
- Frontmatter updated to `audience: all` per D-12

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None — both files are complete navigation indexes with no stub content. Linked files for quick-ref-l1.md and quick-ref-l2.md are created in Plan 07-02.

## Self-Check: PASSED

- FOUND: docs/index.md
- FOUND: docs/common-issues.md
- FOUND commit: 63bdff7 (feat(07-01): create master documentation index)
- FOUND commit: d34a354 (feat(07-01): transform common-issues.md into pure navigation index)
