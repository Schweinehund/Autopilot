---
phase: "114-eee-standard-templates-doc-id-registry-metadata-rules"
plan: "03"
subsystem: "docs/_templates"
tags: ["eee", "templates", "conformance", "d-07", "d-06", "std-02"]
dependency_graph:
  requires: ["114-02"]
  provides: ["STD-02 — all 7 templates born-EEE-conformant; C17 will exit 0 on all templates at Phase 115 SC3"]
  affects: ["Phase 115 C17 validator scope", "Phases 116-118 corpus retrofit (new docs inherit correct scaffolding)"]
tech_stack:
  added: []
  patterns: ["TEMPLATE-SENTINEL (1970-01-01) for harness freshness bypass", "D-07 pipe-list fix (platform: all + HTML-comment guidance)", "D3-A structure (block → H1 → ## Summary → gate blockquote)"]
key_files:
  created:
    - docs/_templates/reference-template.md
  modified:
    - docs/_templates/admin-template.md
    - docs/_templates/l1-template.md
    - docs/_templates/l2-template.md
    - docs/_templates/admin-template-android.md
    - docs/_templates/admin-template-ios.md
    - docs/_templates/admin-template-macos.md
decisions:
  - "D-07 applied: pipe-list platform placeholders replaced with platform: all in 3 templates; HTML comment guidance placed in existing comment block header (not inline YAML) to keep platform value cleanly parseable by YAML and prevent | characters on the platform: line"
  - "D3-A structure enforced: Version/Platform gate blockquotes relocated from pre-H1 position to after ## Summary in all templates where they appeared before H1 (admin/l1/l2/ios/macos)"
  - "TEMPLATE-SENTINEL applied to ios/macos admin templates (previously YYYY-MM-DD placeholder; android already had sentinel)"
  - "D-06: reference-template.md created with Phase-118 table-remediation rule (>25 rows → prose summary within 5 lines); RCA template deferred"
metrics:
  duration_minutes: 5
  completed_date: "2026-07-04"
  tasks_completed: 2
  files_modified: 6
  files_created: 1
---

# Phase 114 Plan 03: EEE Template Conformance Summary

All 7 `docs/_templates/*.md` files are now born-EEE-conformant per the EEE-SOP-standard.md spec: 4 required frontmatter keys added, TEMPLATE-SENTINEL applied, D-07 pipe-list fix applied, single-line EEE header block added, `## Summary` as first H2, and D3-A structure invariant enforced throughout. The new `reference-template.md` (D-06) scaffolds Phase-118 table-remediation conventions. Phase 115 C17 will exit 0 on all 7 templates at SC3.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Fix + conform 3 pipe-list templates (admin, l1, l2) | b90775d | admin-template.md, l1-template.md, l2-template.md |
| 2 | Conform 3 concrete-platform templates + author reference-template.md | 37db306 | admin-template-android.md, admin-template-ios.md, admin-template-macos.md, reference-template.md (NEW) |

## What Was Built

### Task 1 — D-07 fix + EEE keys on 3 pipe-list templates

For `admin-template.md`, `l1-template.md`, and `l2-template.md`:

- **D-07 fix:** `platform: Windows | macOS | all` and `platform: Windows | macOS | iOS | Android | all` replaced with `platform: all` — the only D1-mapped value applicable for a generic template. Platform choice guidance moved to the HTML comment block header (not inline YAML to avoid `|` on the `platform:` line).
- **4 new keys:** `doc_id: RE-[FILL-IN]`, `status: Draft`, `owner: [FILL-IN]`, `doc_type: Guide` (admin) or `doc_type: Runbook` (l1, l2) — inserted in order before `platform:`.
- **TEMPLATE-SENTINEL:** `last_verified: 1970-01-01 # TEMPLATE-SENTINEL` — harness skips freshness checks on sentinel date.
- **EEE block:** `**Platform:** All Platforms · **Doc Type:** [Guide|Runbook] · **Doc ID:** RE-[NNN] · **Status:** Draft` added immediately after frontmatter close.
- **`## Summary` as first H2:** Added after H1 with ≥30-word placeholder (runbooks: read-only scope / escalation guardrail banner; admin guide: scope + audience + framework/platform statement).
- **Version gate relocation:** `> **Version gate:**` blockquote relocated from its pre-H1 position to after `## Summary` (D3-A structure: block → H1 → ## Summary → gate blockquote → sections).
- **HTML comment header updated** in all 3 templates with D1 map guidance, sentinel instructions, doc_id registry reference, and owner-promotes-to-Approved rule.

### Task 2 — 4 EEE keys on 3 concrete-platform templates + new reference-template.md

For `admin-template-android.md`, `admin-template-ios.md`, `admin-template-macos.md`:

- **4 new keys:** `doc_id: RE-[FILL-IN]`, `status: Draft`, `owner: [FILL-IN]`, `doc_type: Guide` — inserted before `platform:`.
- **Platform values unchanged:** `Android` / `iOS` / `macOS` — already D1-mappable; no D-07 fix applied.
- **TEMPLATE-SENTINEL:** Applied to ios/macos (previously `YYYY-MM-DD`); android already had sentinel.
- **EEE block:** `**Platform:** [Android|iOS|macOS] · **Doc Type:** Guide · **Doc ID:** RE-[NNN] · **Status:** Draft` added immediately after frontmatter close.
- **`## Summary` as first H2:** Inserted after H1 with ≥30-word platform-specific placeholder.
- **Platform gate relocation (ios/macos):** `> **Platform gate:**` blockquote was before H1; relocated to after `## Summary` (D3-A invariant). Android template already had it after H1; ## Summary inserted before the blockquote.
- **HTML comment header updated** with sentinel, doc_id, and owner-promotes-to-Approved instructions.

For `docs/_templates/reference-template.md` (NEW — D-06):

- HTML comment header with Phase-118 table-remediation rule: tables >25 rows require a `> **Table summary:**` prose blockquote within 5 lines of the closing delimiter.
- Frontmatter: `last_verified: 1970-01-01 # TEMPLATE-SENTINEL`, `doc_type: Reference`, `platform: all` (D1-mapped), `status: Draft`, `doc_id: RE-[FILL-IN]`, `owner: [FILL-IN]`.
- EEE block: `**Platform:** All Platforms · **Doc Type:** Reference · **Doc ID:** RE-[NNN] · **Status:** Draft`.
- `## Summary` as first H2 with ≥30-word placeholder.
- Demonstration table section with `> **Table summary:**` blockquote pattern example.
- `## See Also` section.
- No Mermaid fences rule documented.
- **No `rca-template.md` created** — RCA deferred to v1.16 per D-06.

## Verification — SC3

```
grep "^platform:" docs/_templates/*.md shows:
  admin-template.md:      platform: all
  admin-template-android: platform: Android
  admin-template-ios:     platform: iOS
  admin-template-macos:   platform: macOS
  l1-template.md:         platform: all
  l2-template.md:         platform: all
  reference-template.md:  platform: all

All 7 values resolve in D1 map. No pipe-list | on any platform: line.
All 7 templates carry: doc_id, status: Draft, owner, doc_type, TEMPLATE-SENTINEL, EEE block, ## Summary-first.
owner is absent from all 7 EEE blocks (D-01 enforced).
reference-template.md: exists, doc_type=Reference, table-remediation guidance present (4 matches for "25 rows").
rca-template.md: absent (RCA deferred per D-06).
```

## Deviations from Plan

### Auto-decisions (within-task judgment)

**1. Platform choice comment — YAML comment approach in header block, not inline**
- **Found during:** Task 1 implementation
- **Issue:** The PATTERNS document showed `platform: all   <!-- choose: Windows|... -->` inline, but this would make the YAML value `all   <!-- choose: ...-->` (not `all`) and the `|` characters in the comment would appear on the `platform:` frontmatter line — failing the acceptance criteria check `grep "^platform:" ... | grep -v "|"`.
- **Decision:** Guidance for choosing a platform value was incorporated into the existing HTML comment block at the top of each template, where it is visible to template authors without polluting the YAML value or the `platform:` line. This matches the same pattern used in `admin-template-android.md` for its platform-specific rules.
- **Files modified:** admin-template.md, l1-template.md, l2-template.md (HTML comment blocks), and all 4 templates in Task 2.

## Known Stubs

All `[FILL-IN]` and `YYYY-MM-DD` placeholders in templates are **intentional scaffolding**, not stubs. Template files are authoring scaffolds, not corpus documents. The TEMPLATE-SENTINEL on `last_verified` ensures harness validators skip these files. All placeholders will be replaced by authors at doc-creation time per the HTML comment instructions and the EEE-SOP-standard.md guidance.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes. All files are static markdown templates.

## Self-Check: PASSED

- `docs/_templates/reference-template.md` — FOUND
- `docs/_templates/admin-template.md` — FOUND (modified, platform: all)
- Commit `b90775d` — FOUND (Task 1: 3 pipe-list templates)
- Commit `37db306` — FOUND (Task 2: 3 platform-specific + reference)
- All 7 EEE blocks present and verified
- All 7 platform values resolve in D1 map — no pipe-list `|` remaining
