---
phase: 01-foundation
plan: 02
subsystem: docs/reference
tags: [reference, registry, endpoints, powershell, canonical]
dependency_graph:
  requires: []
  provides: [docs/reference/registry-paths.md, docs/reference/endpoints.md, docs/reference/powershell-ref.md]
  affects: [all later phases that link to registry paths, endpoints, or PowerShell functions]
tech_stack:
  added: []
  patterns: [DRY canonical reference pattern — runbooks link here, never define inline]
key_files:
  created:
    - docs/reference/registry-paths.md
    - docs/reference/endpoints.md
    - docs/reference/powershell-ref.md
  modified: []
decisions:
  - "8 registry paths documented: 5 HIGH confidence (from .psm1 source) and 3 MEDIUM (from Microsoft Learn)"
  - "13 endpoints in endpoints.md (not just the 5 in Test-AutopilotConnectivity) per plan requirement"
  - "Repair-AutopilotConnectivity documented as not supporting -WhatIf — exception to the general remediation pattern"
  - "Remove-AutopilotDevice -IncludeMDM switch documented as a critical decision point with full impact description"
metrics:
  duration: "3 minutes"
  completed_date: "2026-03-12"
  tasks_completed: 2
  files_created: 3
  files_modified: 0
---

# Phase 1 Plan 2: Reference Tables Summary

Three canonical reference tables created using source-extracted data from .psm1 files and Microsoft Learn documentation, providing single-source-of-truth links for all later runbook phases.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create registry-paths.md and endpoints.md | 7bfee0a | docs/reference/registry-paths.md, docs/reference/endpoints.md |
| 2 | Create PowerShell function reference | c3d4187 | docs/reference/powershell-ref.md |

## What Was Built

**docs/reference/registry-paths.md** — 8 confirmed Autopilot registry paths organized in a table with purpose, referencing functions, and confidence level (HIGH/MEDIUM based on source). The 5 paths with HIGH confidence were extracted directly from the `.psm1` source; the 3 ESP tracking paths carry MEDIUM confidence from Microsoft Learn troubleshooting documentation.

**docs/reference/endpoints.md** — 13 network endpoints required by Windows Autopilot, including all 7 critical endpoints, 2 non-critical endpoints, and 4 conditional TPM-vendor-specific endpoints. Includes PowerShell and curl test commands. The endpoint count deliberately exceeds the 5 checked by `Test-AutopilotConnectivity` — the full list covers self-deploy, pre-provision, and hardware-vendor-specific scenarios.

**docs/reference/powershell-ref.md** — 12 exported function entries (7 diagnostic + 5 remediation) with YAML frontmatter, version gate banner, synopsis, parameters table, return value, and usage examples. Key nuances captured:
- `Repair-AutopilotConnectivity` is the only remediation function that does NOT support `-WhatIf` — documented with explicit warning
- `Remove-AutopilotDevice -IncludeMDM` is documented as a critical decision point because it determines whether MDM enrollment is preserved (omit switch) or fully stripped (include switch)
- All 4 event log sources from `Get-AutopilotLogs` listed in a dedicated section

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

Files:
- `docs/reference/registry-paths.md` — FOUND
- `docs/reference/endpoints.md` — FOUND
- `docs/reference/powershell-ref.md` — FOUND

Commits:
- `7bfee0a` — FOUND
- `c3d4187` — FOUND

## Self-Check: PASSED
