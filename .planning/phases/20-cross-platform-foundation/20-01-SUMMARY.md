---
phase: 20-cross-platform-foundation
plan: "01"
subsystem: documentation
tags: [cross-platform, frontmatter, taxonomy, comparison-page, XPLAT-01, XPLAT-04]
dependency_graph:
  requires: []
  provides:
    - docs/windows-vs-macos.md
    - platform: frontmatter field in all three templates
  affects:
    - docs/_templates/admin-template.md
    - docs/_templates/l1-template.md
    - docs/_templates/l2-template.md
tech_stack:
  added: []
  patterns:
    - "platform: frontmatter field (Windows | macOS | all) added to all doc templates"
    - "Platform comparison page pattern (mirrors apv1-vs-apv2.md) established for cross-platform docs"
key_files:
  created:
    - docs/windows-vs-macos.md
  modified:
    - docs/_templates/admin-template.md
    - docs/_templates/l1-template.md
    - docs/_templates/l2-template.md
decisions:
  - "platform: field added after audience: in frontmatter of all three templates, with authoring instruction in comment block"
  - "windows-vs-macos.md scoped to terminology/enrollment/diagnostics only (no feature parity per D-03)"
  - "Cross-references use existing _glossary.md# and _glossary-macos.md# anchor pattern"
metrics:
  duration: "~15 minutes"
  completed: "2026-04-13"
  tasks_completed: 2
  tasks_total: 2
  files_created: 1
  files_modified: 3
---

# Phase 20 Plan 01: Platform Frontmatter Taxonomy and Concept Comparison Page Summary

**One-liner:** Platform frontmatter taxonomy (`platform: Windows | macOS | all`) added to all three doc templates, and a 14-row concept comparison page mapping Windows Autopilot to macOS ADE terminology was created at `docs/windows-vs-macos.md`.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add platform frontmatter field to all three existing templates (XPLAT-04) | c0a4956 | docs/_templates/admin-template.md, docs/_templates/l1-template.md, docs/_templates/l2-template.md |
| 2 | Create Windows vs macOS concept comparison page (XPLAT-01) | 5a669aa | docs/windows-vs-macos.md |

## What Was Built

### Task 1: Platform Frontmatter Taxonomy (XPLAT-04)

Added `platform: Windows | macOS | all` to the YAML frontmatter block of all three existing templates:

- `docs/_templates/admin-template.md` — field added after `audience: admin`
- `docs/_templates/l1-template.md` — field added after `audience: L1`
- `docs/_templates/l2-template.md` — field added after `audience: L2`

Each template's comment block also received the authoring instruction: `Set platform to Windows, macOS, or all`. The `applies_to:` field is unchanged in all three files (still `APv1 | APv2 | both`). No other lines were modified.

### Task 2: Windows vs macOS Concept Comparison Page (XPLAT-01)

Created `docs/windows-vs-macos.md` following the structural pattern of `docs/apv1-vs-apv2.md`. The file contains:

- YAML frontmatter with `platform: all`, `audience: all`, `applies_to: both`
- Platform coverage version gate banner (referencing Phase 23 Capability Matrix as TBD)
- H1: "Windows Autopilot vs macOS ADE: Concept Comparison"
- Introductory paragraph clarifying scope (terminology/workflow, not feature parity)
- `## Concept Comparison` section with 14-row table (columns: Concept, Windows Autopilot, macOS ADE, Notes)
- `## Diagnostic Tools` section with 4-row table (columns: Task, Windows, macOS)
- `## Which Platform Am I Troubleshooting?` decision guidance with bullet indicators for each platform
- `## See Also` section linking to both glossaries, apv1-vs-apv2.md, and Phase 23 TBD
- Version history footer table

Cross-references use the established `_glossary.md#anchor` and `_glossary-macos.md#anchor` pattern (3 refs to Windows glossary, 4 refs to macOS glossary).

## Verification Results

| Check | Result |
|-------|--------|
| `platform:` count >= 1 in each template | PASS (1 each) |
| `applies_to:` unchanged in all templates | PASS (APv1 \| APv2 \| both) |
| `windows-vs-macos.md` exists with `platform: all` | PASS |
| Pipe count in comparison page >= 20 | PASS (25) |
| At least one `_glossary.md#` reference | PASS (3) |
| At least one `_glossary-macos.md#` reference | PASS (4) |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

- `_glossary-macos.md` is referenced by `windows-vs-macos.md` but does not yet exist (created in Plan 02, same wave). Links will be valid after Plan 02 executes.
- `[Capability Matrix](TBD - Phase 23)` is a placeholder link (intentional per plan, resolved in Phase 23).
- `[Documentation Hub](index.md)` links to index.md which is restructured in Plan 03.

These stubs are intentional and documented in the plan's threat model. They do not prevent this plan's goal from being achieved.

## Self-Check: PASSED

- [x] `docs/windows-vs-macos.md` exists at correct worktree path
- [x] `docs/_templates/admin-template.md` modified with platform field
- [x] `docs/_templates/l1-template.md` modified with platform field
- [x] `docs/_templates/l2-template.md` modified with platform field
- [x] Commit c0a4956 exists (Task 1)
- [x] Commit 5a669aa exists (Task 2)
