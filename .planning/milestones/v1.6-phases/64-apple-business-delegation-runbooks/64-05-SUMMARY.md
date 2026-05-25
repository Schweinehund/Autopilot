---
phase: 64-apple-business-delegation-runbooks
plan: "05"
subsystem: docs/cross-platform/apple-business
tags: [apple-business, disambiguation-table, c15-abaudit, deleg-08, d02-sot]
dependency_graph:
  requires: [64-01, 64-02, 64-03, 64-04]
  provides: [DELEG-08, D-02-SOT, ABAUDIT-17-through-23]
  affects: [docs/cross-platform/apple-business/11-vpp-catalog-runbook.md, docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md, docs/cross-platform/apple-business/13-device-release-runbook.md, docs/cross-platform/apple-business/14-device-transfer-runbook.md, docs/cross-platform/apple-business/15-mdm-server-reassign-runbook.md, docs/cross-platform/apple-business/16-managed-apple-account-runbook.md, docs/cross-platform/apple-business/17-audit-log-scoping-runbook.md]
tech_stack:
  added: []
  patterns: [D-01-envelope, D-02-SOT-no-self-link, ABAUDIT-line-pair-scoped, C15-disambiguation-table]
key_files:
  created:
    - docs/cross-platform/apple-business/18-cross-org-boundary-cheat-sheet.md
  modified: []
decisions:
  - "ABAUDIT-17 through ABAUDIT-23 consumed in 18- (7 exemptions total — one per C15-triggering table row)"
  - "Audit log access row required ABAUDIT-23 (regex 8: 'Intune admin center' within 60 chars of 'Apple Business' triggered unexpectedly)"
  - "18- carries no scope-boundary forward-link (IS the D-02 SOT per D-02 decision)"
  - "18- exempt from ## Required Role & Permission per V-64-08 (reference cheat-sheet, not action runbook)"
metrics:
  duration: "~25 minutes"
  completed: 2026-05-22
  tasks_completed: 1
  files_created: 1
---

# Phase 64 Plan 05: 18-cross-org-boundary-cheat-sheet.md (DELEG-08) Summary

Authored `18-cross-org-boundary-cheat-sheet.md` — the canonical Apple-Business-vs-Intune
disambiguation table (DELEG-08) with line-pair-scoped ABAUDIT-17..ABAUDIT-23 C15 exemptions.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Author 18-cross-org-boundary-cheat-sheet.md (DELEG-08) | ba71025 | docs/cross-platform/apple-business/18-cross-org-boundary-cheat-sheet.md |

## What Was Built

`18-cross-org-boundary-cheat-sheet.md` is the D-02 source-of-truth disambiguation table
that Phase 64 delegation runbooks (`11-`–`17-`) forward-link to. It contains:

**D-01 envelope (minus self-link):**
- 5-field frontmatter: `platform: ios+ipados+macos+tvos`, `last_verified: 2026-05-22`,
  `review_by: 2026-07-21`, `applies_to: apple-business`, `audience: admin`
- `> **Platform applicability:**` block (no scope-boundary forward-link — 18- IS the SOT)
- `> **Training-data notice:**` block referencing STACK §6 + C15 guard semantics
- `## Verification` H2

**9-row capability table** (`Capability | Apple Business owns | Intune owns | Integration layer`):
1. VPP catalog management
2. Shared iPad passcode reset
3. Device release from ADE
4. Cross-OU device transfer
5. MDM server reassignment
6. Managed Apple Account provisioning
7. Audit log access
8. Content token download
9. Enrollment profile assignment (Intune-side)

**Key disambiguation notes** section covering: content-token vs Apple-VPP-token label difference,
passcode reset anti-feature, author-scope vs target-scope (OP-14), and VPP + OU transfer interaction.

## ABAUDIT Exemption Registry (Plan 64-05)

**Range consumed: ABAUDIT-17 through ABAUDIT-23 (7 exemptions)**

| ABAUDIT | Line | Regex triggered | Rationale |
|---------|------|-----------------|-----------|
| ABAUDIT-17 | VPP catalog row | Regex 8 (Intune admin + content token) | "Intune admin uploads the downloaded content token" |
| ABAUDIT-18 | Shared iPad row | Regex 1 (Intune RBAC) | "requires Intune RBAC to issue MDM device commands" |
| ABAUDIT-19 | Cross-OU transfer row | Regex 4 (Intune-side + role assign context) | "Intune-side config profile assignment authority" |
| ABAUDIT-20 | Managed Apple Account row | Regex 4 (Intune-side) | "Intune-side enrollment uses the resulting Managed Apple Account" |
| ABAUDIT-21 | Content token download row | Regex 8 (Intune admin + content token) | "Intune admin uploads the downloaded token" |
| ABAUDIT-22 | Enrollment profile row | Regex 1 (Intune RBAC) | "Intune enrollment profiles...are Intune RBAC-gated" |
| ABAUDIT-23 | Audit log access row | Regex 8 (Intune admin + Apple Business) | "Intune admin center, not Apple Business portal" — discovered during automated verification |

**Prior ABAUDIT allocations for reference:** ABAUDIT-01..04 (Phase 62/63 corpus); ABAUDIT-05..16
(Plans 64-01 through 64-04, runbooks 11-17). Phase 64 total: ABAUDIT-05 through ABAUDIT-23 (19 slots).

## Verification Results

```
check-phase-64.mjs: 24/24 PASS, 0 FAIL, 5 SKIPPED (pre-existing chain failures)
  V-64-01: all 8 runbooks exist          PASS
  V-64-06: last_verified: in frontmatter PASS
  V-64-07: platform: in frontmatter      PASS
  V-64-08: ## Required Role exempt 18-   PASS
  V-64-09: ## Verification present       PASS
  V-64-10: C15 framing guard             PASS

v1.6-milestone-audit.mjs: 15/15 PASS
  C15: Intune-delegation anti-pattern guard PASS
```

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Audit log access row triggered C15 regex 8 unexpectedly**
- **Found during:** Automated verification after initial file creation
- **Issue:** The phrase "Intune admin center, not Apple Business portal" triggered C15 regex 8
  (`\bIntune\s+admin\b.{0,60}\b(Apple\s+Business|ABM|...)`). The phrase "Intune admin center"
  contains the substring "Intune admin" and "Apple Business" appears within 60 characters. This
  was not anticipated at authoring time — the row did not mention Intune RBAC/role explicitly.
- **Fix:** Added ABAUDIT-23 as a line-pair-scoped comment immediately before the Audit log
  access table row, consuming one additional exemption slot.
- **Impact:** Final ABAUDIT range is ABAUDIT-17..ABAUDIT-23 (7 exemptions instead of the
  anticipated 6). No gaps, no collisions.
- **Commit:** ba71025 (included in same commit as initial file)

## Known Stubs

None. All 9 capability rows contain substantive ownership descriptions. Cells tagged
`[CITED: training; needs live verification]` are correctly deferred per the 60-day
`last_verified` discipline, not stub placeholders.

## Threat Flags

None. No new network endpoints, auth paths, file access patterns, or schema changes introduced.
`18-` is a documentation-only reference cheat sheet.

## Self-Check

- [x] `docs/cross-platform/apple-business/18-cross-org-boundary-cheat-sheet.md` exists
- [x] Commit ba71025 exists
- [x] ABAUDIT-17..23 sequential, gap-free, no collision with ABAUDIT-01..16
- [x] check-phase-64.mjs 24/24 PASS
- [x] v1.6-milestone-audit.mjs C15 PASS

## Self-Check: PASSED
