---
phase: 20-cross-platform-foundation
plan: 02
subsystem: documentation
tags: [macos, glossary, template, cross-platform, ade, abm]
dependency_graph:
  requires: []
  provides:
    - docs/_glossary-macos.md (macOS provisioning glossary with 6 terms)
    - docs/_templates/admin-template-macos.md (macOS admin guide template)
    - docs/_glossary.md updated banner (cross-reference to macOS glossary)
  affects:
    - Phase 22 (macOS lifecycle docs will reference _glossary-macos.md)
    - Phase 23 (macOS admin setup guides will use admin-template-macos.md)
    - Phase 24 (macOS L1/L2 runbooks will reference _glossary-macos.md)
tech_stack:
  added: []
  patterns:
    - Bidirectional glossary cross-reference pattern (> **Windows equivalent:** callout)
    - Dual-portal step sub-sections (#### In Apple Business Manager / #### In Intune admin center)
    - platform: frontmatter field (values: Windows, macOS, all)
    - Cross-portal symptom visibility in What breaks callouts
    - Portal column in Configuration-Caused Failures table
key_files:
  created:
    - docs/_glossary-macos.md
    - docs/_templates/admin-template-macos.md
  modified:
    - docs/_glossary.md (banner line added only)
decisions:
  - "D-04: Separate _glossary-macos.md file -- not interspersed into existing Windows glossary"
  - "D-05: Bidirectional cross-reference banners in both glossary files"
  - "D-06: macOS glossary mirrors Windows glossary structure (frontmatter, index, semantic categories, callouts)"
  - "D-11: Separate admin-template-macos.md file -- not shared base with Windows template"
  - "D-12: Dual-portal step sub-sections for ABM + Intune admin center workflows"
  - "D-13: Cross-portal symptom visibility in What breaks callouts (Symptom appears in: field)"
  - "D-14: Portal column added to Configuration-Caused Failures table"
  - "D-15: Comment block updated for macOS -- full ABM/Intune navigation paths, macOS Platform Lead reviewer"
  - "D-16: Platform gate version banner linking to Windows admin guides"
  - "D-17: Runbook placeholders use [TBD - Phase 24] format"
  - "D-18: Conditional Renewal/Maintenance section with HTML comment authoring instruction"
  - "D-19: platform: all in macOS glossary; platform: macOS in macOS admin template"
  - "D-20: No applies_to field in macOS admin template (Windows-framework disambiguation only)"
metrics:
  duration: "~8 minutes"
  completed: 2026-04-13
  tasks_completed: 2
  tasks_total: 2
  files_created: 2
  files_modified: 1
---

# Phase 20 Plan 02: macOS Glossary and Admin Template Summary

**One-liner:** macOS provisioning glossary (6 terms, bidirectional Windows cross-references) and dual-portal admin guide template with ABM + Intune step sub-sections and Portal column in failures table.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create macOS provisioning glossary and add banner to Windows glossary (XPLAT-02) | 7aec294 | docs/_glossary-macos.md (created), docs/_glossary.md (1 line added) |
| 2 | Create macOS admin guide template (XPLAT-03) | 8cac721 | docs/_templates/admin-template-macos.md (created) |

## Verification Results

All 8 plan verification checks passed:

1. `grep -c "Windows equivalent" docs/_glossary-macos.md` → **6** (one per term)
2. All 6 term headings present: `### ADE`, `### ABM`, `### ABM Token`, `### Await Configuration`, `### Setup Assistant`, `### VPP`
3. `grep "_glossary-macos.md" docs/_glossary.md` → 1 match (banner line)
4. `grep -c "In Apple Business Manager" docs/_templates/admin-template-macos.md` → **2**
5. `grep -c "In Intune admin center" docs/_templates/admin-template-macos.md` → **2**
6. `grep "| Portal |" docs/_templates/admin-template-macos.md` → 1 match (4-column table header)
7. `grep "platform: macOS" docs/_templates/admin-template-macos.md` → 1 match
8. `grep "platform: all" docs/_glossary-macos.md` → 1 match

## Acceptance Criteria Verification

### Task 1 (XPLAT-02)

- [x] `docs/_glossary-macos.md` exists with valid YAML frontmatter containing `platform: all`
- [x] File contains `# macOS Provisioning Glossary` as H1
- [x] File contains `## Alphabetical Index` with pipe-delimited links to all 6 terms
- [x] File contains exactly 6 term headings: `### ADE`, `### ABM`, `### ABM Token`, `### Await Configuration`, `### Setup Assistant`, `### VPP`
- [x] Each term entry contains a `> **Windows equivalent:**` callout with a link to `_glossary.md#` (6 callouts total)
- [x] ADE entry contains "Formerly known as DEP"
- [x] ABM Token entry contains "renewed annually"
- [x] Await Configuration entry explicitly states "single hold point"
- [x] File contains `## Enrollment`, `## Device Management`, `## App Distribution` category headings
- [x] Banner blockquote links to `_glossary.md`
- [x] `docs/_glossary.md` new third banner line contains `_glossary-macos.md`
- [x] `docs/_glossary.md` has no changes other than the single added banner line

### Task 2 (XPLAT-03)

- [x] `docs/_templates/admin-template-macos.md` exists
- [x] File starts with comment block containing `MACOS ADMIN SETUP GUIDE TEMPLATE`
- [x] Comment block contains "Include full navigation paths for both ABM and Intune admin center portals"
- [x] Comment block contains "Reviewer: macOS Platform Lead"
- [x] Comment block contains "Runbook links use [TBD - Phase 24]"
- [x] Comment block contains "Include Renewal/Maintenance section ONLY when"
- [x] YAML frontmatter contains `platform: macOS` and `audience: admin`
- [x] YAML frontmatter does NOT contain `applies_to:`
- [x] Version gate blockquote contains "macOS ADE" and links to Windows admin setup guides
- [x] Steps section contains `#### In Apple Business Manager` sub-heading
- [x] Steps section contains `#### In Intune admin center` sub-heading
- [x] "What breaks" callouts mention "Symptom appears in:"
- [x] Configuration-Caused Failures table has 4 columns: Misconfiguration, Portal, Symptom, Runbook
- [x] Renewal/Maintenance section exists with HTML comment authoring instruction
- [x] See Also section links to `../windows-vs-macos.md` and `../_glossary-macos.md`

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None - this plan creates documentation templates and reference files, not data-dependent content. The `[TBD - Phase 24]` runbook placeholders are intentional and documented in D-17 (Phase 24 creates macOS troubleshooting runbooks MTRO-01 through MTRO-04).

## Self-Check: PASSED

Files confirmed to exist:
- `docs/_glossary-macos.md` -- FOUND
- `docs/_templates/admin-template-macos.md` -- FOUND
- `docs/_glossary.md` (modified) -- FOUND

Commits confirmed:
- `7aec294` -- FOUND (Task 1: macOS glossary + Windows glossary banner)
- `8cac721` -- FOUND (Task 2: macOS admin template)
