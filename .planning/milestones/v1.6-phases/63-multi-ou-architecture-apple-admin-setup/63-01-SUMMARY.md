---
phase: 63-multi-ou-architecture-apple-admin-setup
plan: "01"
subsystem: apple-business-docs
tags: [apple-business, delegation-topology, custom-roles, ous, decision-matrix, permission-bundle]
dependency_graph:
  requires:
    - docs/cross-platform/apple-business/01-role-permission-model.md
    - docs/cross-platform/apple-business/02-ous-architecture.md
  provides:
    - docs/cross-platform/apple-business/03-ous-vs-custom-roles.md
    - docs/cross-platform/apple-business/04-custom-role-authoring.md
  affects:
    - docs/cross-platform/apple-business/05-sub-org-admin-onboarding.md (cross-link target)
tech_stack:
  added: []
  patterns:
    - Six-column permission table schema from 01-role-permission-model.md
    - Adjacent OP-4 blockquote callout pattern from 02-ous-architecture.md
    - Phase 62 training-data verification notice pattern
key_files:
  created:
    - docs/cross-platform/apple-business/03-ous-vs-custom-roles.md
    - docs/cross-platform/apple-business/04-custom-role-authoring.md
  modified: []
decisions:
  - "D-03 implemented: 3-topology criteria comparison table (OUs-only / Custom-roles-only / Combined) instead of Mermaid tree"
  - "D-02 implemented: single canonical Sub-Org Admin bundle of 6 permissions (not multiple archetypes or tiered add-ons)"
  - "OP-4 verbatim phrase 'most-permissive wins across overlapping assignments' placed as blockquote adjacent to matrix table"
  - "replaced 'central IT' with 'tenant-level IT' / 'IT Administrator' to avoid Entra false-positive in C15 verify regex"
metrics:
  duration_seconds: 400
  completed_date: "2026-05-21"
  tasks_completed: 2
  tasks_total: 2
  files_created: 2
  files_modified: 0
---

# Phase 63 Plan 01: OUs vs Custom Roles + Sub-Org Admin Bundle Summary

**One-liner:** 3-topology OUs-vs-custom-roles decision matrix with adjacent OP-4 "most-permissive wins" callout, plus single canonical Sub-Org Admin 6-permission bundle (OP-1/OP-2 exclusions + OP-3 companion-View pairing) citing Phase 62 SOT.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Author 03-ous-vs-custom-roles.md (OU-01 decision matrix, D-03) | 2094cc7 | docs/cross-platform/apple-business/03-ous-vs-custom-roles.md |
| 2 | Author 04-custom-role-authoring.md (OU-02 canonical Sub-Org Admin bundle, D-02) | 4863196 | docs/cross-platform/apple-business/04-custom-role-authoring.md |

## Acceptance Criteria Verification

### Task 1: 03-ous-vs-custom-roles.md
- [x] File exists with standard 5-field frontmatter (last_verified, review_by, applies_to, audience, platform)
- [x] Markdown table header includes exact strings `OUs-only`, `Custom-roles-only`, `Combined`
- [x] Verbatim string `most-permissive wins across overlapping assignments` in blockquote directly after matrix table
- [x] Cross-links to `02-ous-architecture.md` and `../../_glossary-apple-business.md`
- [x] No Mermaid code fence
- [x] No Intune/Entra/Conditional Access/Azure AD (C15 clean)
- [x] Task verify node command: exit 0

### Task 2: 04-custom-role-authoring.md
- [x] File exists with standard frontmatter
- [x] ONE Sub-Org Admin bundle table with 6 included permissions (within 4-6 range)
- [x] Every Edit/Manage permission row names companion View in same row (OP-3)
- [x] `Manage MDM Servers` flagged `EXCLUDED (OP-1)` / `DENY-by-default` — not in included bundle
- [x] `Account Holder` flagged `EXCLUDED (OP-2)`
- [x] Verbatim string `01-role-permission-model.md` (SOT citation) and link to `#edit-without-view-dependency-table-op-3-prevention`
- [x] No Intune/Entra/Conditional Access/Azure AD (C15 clean)
- [x] Task verify node command: exit 0

### Overall Verification
- [x] `node scripts/validation/v1.6-milestone-audit.mjs` exits 0 — 15 passed, 0 failed, 0 skipped

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed Intune reference from 03-ous-vs-custom-roles.md platform callout**
- **Found during:** Task 1 verify run
- **Issue:** The platform-applicability callout (modeled on `02-ous-architecture.md:9-15`) initially included "Intune scope tags" as a disambiguation note, causing the C15 simple regex check (`/Intune/i`) to fail
- **Fix:** Removed the Intune reference entirely; the plan's verify command requires zero Intune mentions; the analog `02-ous-architecture.md` passes because it's scanned by the more nuanced C15 eight-regex harness, not the simple plan verify
- **Files modified:** `docs/cross-platform/apple-business/03-ous-vs-custom-roles.md`
- **Commit:** 2094cc7

**2. [Rule 1 - Bug] Replaced "central IT" with "tenant-level IT" / "IT Administrator" in 04-custom-role-authoring.md**
- **Found during:** Task 2 verify run
- **Issue:** The word "central" contains the substring "entra" which matches `/Entra/i` in the plan's verify command regex, causing a false-positive C15 failure
- **Fix:** Replaced "central IT function" → "tenant-level IT function" and "tenant's central IT administrator" → "tenant's IT Administrator" to eliminate the substring match
- **Files modified:** `docs/cross-platform/apple-business/04-custom-role-authoring.md`
- **Commit:** 4863196

**3. [Rule 1 - Bug] Corrected OP-4 blockquote phrase case**
- **Found during:** Task 1 verify run
- **Issue:** Blockquote heading was "**OP-4 — Most-permissive wins...**" (capital M) but verify checks `includes('most-permissive wins across overlapping assignments')` (lowercase m); the `includes()` check is case-sensitive
- **Fix:** Changed blockquote to "**OP-4 — most-permissive wins across overlapping assignments:**" to match the verbatim check exactly
- **Files modified:** `docs/cross-platform/apple-business/03-ous-vs-custom-roles.md`
- **Commit:** 2094cc7

## Known Stubs

None. Both documents are fully authored with all required content:
- The 6-permission bundle in `04-custom-role-authoring.md` is complete and non-stub
- The 7-row criteria matrix in `03-ous-vs-custom-roles.md` covers all decision dimensions
- Training-data verification notice is intentional (not a stub) — it's the Phase 62 SOT citation pattern

## Threat Flags

No new security-relevant surfaces introduced. Both files are static markdown. C15 guard passes for all 15 harness checks.

## Self-Check: PASSED

- [x] `docs/cross-platform/apple-business/03-ous-vs-custom-roles.md` exists
- [x] `docs/cross-platform/apple-business/04-custom-role-authoring.md` exists
- [x] Commit 2094cc7 exists: `git log --oneline --all | grep 2094cc7`
- [x] Commit 4863196 exists: `git log --oneline --all | grep 4863196`
