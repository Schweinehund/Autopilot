---
phase: 84-graph-api-doc-nual-key-table
plan: "02"
subsystem: docs/admin-setup-macos
tags: [nual, graph-api, platform-sso, surgical-edit, cross-links]
dependency_graph:
  requires: [84-01]
  provides: [NUAL-01, GRAPH-01-integration, PSSO-FUT-01-closed]
  affects:
    - docs/admin-setup-macos/08-auth-methods-deep-dive.md
    - docs/admin-setup-macos/00-overview.md
    - docs/_glossary-macos.md
tech_stack:
  added: []
  patterns:
    - "5-column consolidated NUAL Settings Catalog table with MDM plist key literals"
    - "D-15 reciprocal see-also extension (same line, semicolon-delimited)"
    - "Mermaid LR node chain extension (J --> K pattern)"
key_files:
  modified:
    - docs/admin-setup-macos/08-auth-methods-deep-dive.md
    - docs/admin-setup-macos/00-overview.md
    - docs/_glossary-macos.md
decisions:
  - "D-04: one consolidated 5-column NUAL table (not additive column, not second table)"
  - "D-05: verified plist key literals; Temporary in NewUserAuthorizationMode only; asymmetry example"
  - "D-06: surgical removal of v1.9 deferred blockquote only; no NUAL prose rewrite"
  - "D-07: extend existing Platform SSO see-also line; no new standalone term"
metrics:
  duration: "~15 minutes"
  completed: "2026-06-23"
  tasks_completed: 3
  tasks_total: 3
  files_modified: 3
---

# Phase 84 Plan 02: NUAL Key Table + Cross-Links Summary

**One-liner:** Three surgical edits — guide 08 NUAL consolidated table with verified plist key literals (`NewUserAuthorizationMode`/`UserAuthorizationMode`/`EnableCreateUserAtLogin`), `Temporary` caveat, and deferred blockquote removed (PSSO-FUT-01 closed); `00-overview.md` guide-11 K-node appended; glossary Platform SSO see-also extended with guide 11 link.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Guide 08 NUAL surgical edit — consolidate table, surface caveats, remove deferred blockquote | 75eef1c | docs/admin-setup-macos/08-auth-methods-deep-dive.md |
| 2 | 00-overview.md — add guide 11 node to Mermaid and item 11 to numbered list | f2f6a4c | docs/admin-setup-macos/00-overview.md |
| 3 | Glossary — extend Platform SSO term see-also with reciprocal guide 11 link | c96a24a | docs/_glossary-macos.md |

## What Was Built

### Task 1 — Guide 08 NUAL Edit (NUAL-01, PSSO-FUT-01 closed)

Replaced the 3-column `| Settings Catalog Setting | Type | Purpose |` table with a 5-column consolidated table:

```
| Settings Catalog Display Name | MDM plist key | Type | Allowed Values | Scope |
```

Three rows:
- `Enable Create User At Login` → `EnableCreateUserAtLogin` (Boolean; prerequisite with `UseSharedDeviceKeys: true`)
- `New User Authorization Mode` → `NewUserAuthorizationMode` (String; `Standard`, `Admin`, `Groups`, `Temporary`; one-time)
- `User Authorization Mode` → `UserAuthorizationMode` (String; `Standard`, `Admin`, `Groups`; persistent)

Added `**Notes:**` block surfacing:
- `Temporary` valid in Apple schema for `NewUserAuthorizationMode` only; not surfaced in Intune Settings Catalog UI
- `UserAuthorizationMode` does NOT accept `Temporary`
- Behavioral asymmetry: `NewUserAuthorizationMode: Admin` + `UserAuthorizationMode: Standard` → admin at first login, reverted to standard on subsequent sign-ins (admin promotion is overwritten)

Removed the v1.9 deferred-item blockquote entirely (`> **Deferred item -- MDM key literals...` through `v1.9-DEFERRED-CLEANUP.md` reference). Closes PSSO-FUT-01.

### Task 2 — 00-overview.md Guide 11 Node

Appended `J --> K[11. Graph API<br/>Platform Credential]` after the guide-10 node in the Mermaid `graph LR` block. Added numbered-list item 11 linking to `11-graph-api-platform-credential.md` with full description. Appended `Phase 84 (GRAPH-01)` version-history row.

### Task 3 — Glossary See-Also Extension

Extended the existing `> See also:` line inside the Platform SSO term's `> **Windows equivalent:**` blockquote by appending `; [Graph API: Platform Credential Management](admin-setup-macos/11-graph-api-platform-credential.md).` on the same line (D-15 convention). No new standalone term created. Appended `Phase 84 (GRAPH-02)` version-history row.

## Deviations from Plan

None — plan executed exactly as written. All three tasks completed with blast-radius discipline (D-06): no NUAL prose was rewritten, only the table and the deferred blockquote were touched; no existing Mermaid nodes or list items were altered; no new glossary terms were created.

## Known Stubs

None — all three surgical edits are complete. No placeholder text or wired-to-empty patterns introduced.

## Threat Flags

None — documentation-only edits. T-84-03 (docs-accuracy threat: Temporary in wrong row) mitigated by Task 1 acceptance-criteria verification (Temporary present only in `NewUserAuthorizationMode` row, absent from `UserAuthorizationMode` row). No new executable code or network endpoints introduced.

## Self-Check: PASSED

- `75eef1c` — docs(84-02): consolidate NUAL table... — FOUND in git log
- `f2f6a4c` — docs(84-02): add guide 11 node... — FOUND in git log
- `c96a24a` — docs(84-02): extend Platform SSO glossary term... — FOUND in git log
- `docs/admin-setup-macos/08-auth-methods-deep-dive.md` — `NewUserAuthorizationMode` present, `v1.9-DEFERRED-CLEANUP.md` absent, `Phase 84 (NUAL-01)` row present
- `docs/admin-setup-macos/00-overview.md` — `K[11. Graph API<br/>Platform Credential]` present, `J[10. Kerberos SSO<br/>Extension]` preserved, `Phase 84 (GRAPH-01)` row present
- `docs/_glossary-macos.md` — `admin-setup-macos/11-graph-api-platform-credential.md` present, `07-platform-sso-setup.md` preserved, no `### Platform Credential Graph API` standalone term, `Phase 84 (GRAPH-02)` row present
