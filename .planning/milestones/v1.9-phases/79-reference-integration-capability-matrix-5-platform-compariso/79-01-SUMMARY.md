---
phase: 79-reference-integration-capability-matrix-5-platform-compariso
plan: "01"
subsystem: reference-docs
tags: [macos, psso, platform-sso, capability-matrix, comparison-doc, ssoref-02, documentation, anchor-inventory]
dependency_graph:
  requires: [phase-77-auth-methods-deep-dive, phase-78-legacy-sso-plugin-migration-guide]
  provides: [macos-matrix-authentication-section, comparison-sso-section, anchor-inventory]
  affects: [docs/reference/macos-capability-matrix.md, docs/reference/4-platform-capability-comparison.md]
tech_stack:
  added: []
  patterns: [link-not-copy, anchor-inventory-first, atomic-commit-c13, uppercase-na-c12-exempt]
key_files:
  created:
    - .planning/phases/79-reference-integration-capability-matrix-5-platform-compariso/79-ANCHOR-INVENTORY.md
  modified:
    - docs/reference/macos-capability-matrix.md
    - docs/reference/4-platform-capability-comparison.md
decisions:
  - "X1: Edited Platform SSO cell (line 38) text only -- the ## Configuration heading and #configuration anchor preserved"
  - "X2: Non-macOS SSO cells use bare uppercase N/A (C12-exempt per audit.mjs:643); no sibling #authentication anchor exists"
  - "X3: macOS comparison cell uses SC2-verbatim string exactly as locked -- (macOS 14+) parenthetical preserved"
  - "A1: Seven-row ## Authentication section in Feature|Windows|macOS shape; Windows cells are terse scope markers"
  - "B2+P1: ## Authentication inserted before ## See Also (after ## Key Gaps Summary)"
  - "C1: New ## Single Sign-On as the 7th H2 after ## Conditional Access; six C12-named H2s preserved"
  - "D1: 79-ANCHOR-INVENTORY.md committed alone as commit 1 before any content edit"
  - "Commit ordering: anchor-inventory (fe01abc) precedes content commit (624da88)"
metrics:
  duration_minutes: 20
  tasks_completed: 3
  tasks_total: 3
  files_created: 1
  files_modified: 2
  completed_date: 2026-06-21
requirements_closed: [SSOREF-02]
---

# Phase 79 Plan 01: Reference Integration — Capability Matrix & 5-Platform Comparison Summary

**One-liner:** Added seven-row `## Authentication` section to the macOS capability matrix and a `## Single Sign-On` section to the 5-platform comparison, wiring macOS PSSO auth facts (from guides 08/09) via link-not-copy architecture, behind a mandatory pre-edit anchor inventory committed first.

## What Was Built

Three deliverables across two commits:

**Commit 1 (fe01abc) — Pre-edit anchor inventory:**
- `.planning/phases/79-reference-integration-capability-matrix-5-platform-compariso/79-ANCHOR-INVENTORY.md` (39 lines): records all 8 pre-edit H2 slugs for each reference file, documents the two planned additions (`#authentication` and `#single-sign-on`), and includes a Superset Assertion proving no pre-edit anchor will be removed or renamed. Committed alone before any content edit (ROADMAP SC2 hard prerequisite / D-04 / D1).

**Commit 2 (624da88) — Atomic content edit:**

`docs/reference/macos-capability-matrix.md` (3 changes):
1. Front-matter: `last_verified: 2026-06-21` / `review_by: 2026-09-21` (DS-2 90-day cadence reset)
2. X1 cell edit (line 38, `## Configuration` Platform SSO row): macOS cell gains `— see [Authentication](#authentication)` suffix; the `## Configuration` heading and `#configuration` anchor are untouched
3. New `## Authentication` section (7 rows) inserted before `## See Also`:
   - Auth methods: Secure Enclave key (Microsoft-recommended), Password sync, Smart card — links guide 08
   - Hardware gate: T2 chip (Intel 2018-2020) or Apple Silicon (M1+) for Secure Enclave method
   - macOS version floor: macOS 14.0 Sonoma (recommended floor) — links guide 08 for macOS 13 detail
   - Entra ID licensing: no P1/P2 for PSSO itself — links guide 08 for CA-integration nuance
   - NUAL: Supported macOS 14+; Shared Device Keys login-window account creation
   - Passkey/FIDO2: Supported via Platform Credential, Secure Enclave method only
   - Hybrid Entra join: **Not supported** (explicit anti-feature row — never silently omitted)
   - All Windows cells: `n/a — not covered in this matrix` (scope markers, not invented facts)
4. Version-History row appended (date 2026-06-21, Author `--`)

`docs/reference/4-platform-capability-comparison.md` (3 changes):
1. Front-matter: `last_verified: 2026-06-21` / `review_by: 2026-09-21` (stale 2026-06-15 cleared)
2. New `## Single Sign-On` section (7th H2) inserted after `## Conditional Access`, before `## See Also`:
   - One data row: "OS-integrated SSO (Platform SSO)"
   - macOS cell: `Supported (macOS 14+) — [matrix](macos-capability-matrix.md#authentication)` (X3 SC2-verbatim)
   - Windows/iOS/Android/Linux cells: bare uppercase `N/A` (X2, C12-exempt per audit.mjs:643)
   - Scope footnote (blockquote): non-macOS auth not covered; N/A reflects deliberate scope
3. Version-History row appended (date 2026-06-21, Author `--`)

## Verification Results

- `node scripts/validation/v1.8-milestone-audit.mjs`: **15/15 PASS** (C12 + C13 both green)
- Commit order: anchor-inventory commit (fe01abc) precedes content commit (624da88) — confirmed by `git log --oneline -3`
- Atomic content commit: `git diff HEAD~1 --name-only` shows both `docs/reference/macos-capability-matrix.md` and `docs/reference/4-platform-capability-comparison.md` in commit 624da88
- `## Configuration` heading at line 28 preserved; `#configuration` anchor stable
- Matrix H2s post-edit: Enrollment, Configuration, App Deployment, Compliance, Software Updates, Conditional Access, Key Gaps Summary, **Authentication**, See Also (9 total; 8 pre-edit + 1 added)
- Comparison H2s post-edit: Enrollment, Configuration, App Deployment, Compliance, Software Updates, Conditional Access, **Single Sign-On**, See Also, Version History (9 total; 8 pre-edit + 1 added)
- All six C12-named H2s present in comparison doc; 7th (`## Single Sign-On`) is explicitly allowed
- X1 grep: `| Platform SSO | No | Yes (macOS 14+ via Settings Catalog) — see [Authentication](#authentication) |` present
- X3 grep: `Supported (macOS 14+) — [matrix](macos-capability-matrix.md#authentication)` present (verbatim)
- X2: non-macOS SSO cells are bare uppercase `N/A` (confirmed)
- No "v1.9" in reader-facing content (confirmed)
- "not covered in this matrix" appears 8 times (7 Authentication Windows cells + 1 pre-existing line 84)
- Hybrid Entra join "Not supported" row present

## Task Verification Sentinels

- INVENTORY_OK: printed (Task 1)
- MATRIX_OK: printed (Task 2)
- COMPARISON_OK: printed (Task 3)

## Commits

| # | Hash | Message | Files |
|---|------|---------|-------|
| 1 | fe01abc | docs(79): pre-edit anchor inventory for reference integration | 79-ANCHOR-INVENTORY.md |
| 2 | 624da88 | docs(79): integrate macOS PSSO auth into matrix + comparison (SSOREF-02) | macos-capability-matrix.md, 4-platform-capability-comparison.md |

## Deviations from Plan

None — plan executed exactly as written. All locked decisions (A1, B2+P1, C1, D1, X1, X2, X3) applied precisely. Commit ordering honored: inventory commit 1 precedes atomic content commit 2. No architectural changes required.

## Known Stubs

None. All 7 Authentication rows carry factual prose content sourced from guides 08/09 (Phases 77-78, both verified Complete). The `N/A` cells in the SSO section are not stubs — they are deliberate scope markers for non-macOS platforms (X2 / REQUIREMENTS:89), documented with a footnote.

## Threat Flags

No new security-relevant surface introduced. This is a pure documentation phase (two Markdown reference files edited, one planning artifact created). No network endpoints, auth paths, file access patterns, or schema changes at trust boundaries. The published-guidance threat register from the plan's threat_model was fully mitigated:
- T-79-01 (C12 wrong cell): mitigated by uppercase N/A + SC2-verbatim macOS cell
- T-79-02 (C13 broken link): mitigated by atomic commit
- T-79-03 (anchor drift): mitigated by anchor inventory + cell-text-only X1 edit
- T-79-04 (stale PSSO statement): mitigated by X1 adding #authentication back-reference
- T-79-05 (commit ordering): mitigated by two-commit sequence (inventory first)

## Self-Check

Files exist:
- [x] `.planning/phases/79-reference-integration-capability-matrix-5-platform-compariso/79-ANCHOR-INVENTORY.md`
- [x] `docs/reference/macos-capability-matrix.md` (modified)
- [x] `docs/reference/4-platform-capability-comparison.md` (modified)

Commits exist:
- [x] fe01abc (anchor inventory)
- [x] 624da88 (content edits, atomic)

## Self-Check: PASSED
