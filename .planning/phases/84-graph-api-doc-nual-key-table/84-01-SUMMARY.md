---
phase: 84-graph-api-doc-nual-key-table
plan: "01"
subsystem: docs/admin-setup-macos
tags: [graph-api, platform-credential, macos, psso, documentation]
dependency_graph:
  requires: []
  provides:
    - docs/admin-setup-macos/11-graph-api-platform-credential.md
  affects:
    - docs/admin-setup-macos/00-overview.md (Phase 84 plan 03 — guide 11 node)
    - docs/_glossary-macos.md (Phase 84 plan 03 — Platform SSO see-also)
tech_stack:
  added: []
  patterns:
    - Hybrid suite-anchor + operations-reference body (guide 10 precedent)
    - GFM [!WARNING] callout for destructive Graph API operations
    - HTTP-primary + PowerShell SDK co-equal companion documentation pattern
key_files:
  created:
    - docs/admin-setup-macos/11-graph-api-platform-credential.md
  modified: []
decisions:
  - "D-01 (hybrid shape): Guide 11 uses mandatory suite anchors (frontmatter, Platform-gate, Prerequisites, Verification, See Also, version-history) with an operations-reference body — mirrors guide 10 hybrid precedent"
  - "D-03 (HTTP primary): HTTP is the primary/canonical surface; PowerShell SDK is required co-equal companion for each operation"
  - "D-08 (endpoint reconciliation): All three operations use platformCredentialMethods as the URL navigation property — platformCredentialAuthenticationMethod is the resource type name only"
  - "D-09 (permissions matrix): Verified least-privilege scopes — read: UserAuthMethod-PlatformCred.Read (delegated) / UserAuthMethod-PlatformCred.Read.All (application); delete: UserAuthenticationMethod.ReadWrite (delegated) / UserAuthenticationMethod.ReadWrite.All (application)"
metrics:
  duration: "194 seconds (~3 minutes)"
  completed_date: "2026-06-23"
  tasks_completed: 3
  files_changed: 1
---

# Phase 84 Plan 01: Graph API Platform Credential Guide Summary

**One-liner:** Graph v1.0 `platformCredentialAuthenticationMethod` operations-reference (List/Get/Delete with HTTP + PowerShell SDK, permissions matrix, WARNING callout, leaver/offboarding automation pattern with mandatory dry-run).

## What Was Built

Created the new hybrid suite-anchored operations-reference guide `docs/admin-setup-macos/11-graph-api-platform-credential.md` (guide 11) covering programmatic management of macOS Secure Enclave Platform Credentials via Microsoft Graph v1.0.

### Guide Structure

The guide follows the hybrid suite-anchor + operations-reference body shape (D-01), mirroring the guide 10 precedent from Phase 83:

1. **Frontmatter** — `last_verified: 2026-06-23`, `review_by: 2026-09-23`, `applies_to: ADE`, `audience: admin`, `platform: macOS`
2. **Platform-gate header** — links to guide 07 (Platform SSO Setup) and macOS Glossary
3. **What This Guide Is NOT** — explicitly states no Create/Update operation exists; credentials are device-initiated only
4. **Resource Reference** — properties table (`id`, `displayName`, `createdDateTime`, `keyStrength`, `platform`) and `device` relationship
5. **Operations** — List/Get/Delete with HTTP-primary + PowerShell SDK co-equal companions
   - `### Delete a Platform Credential` carries the mandatory `> [!WARNING]` callout (T-84-01 mitigation)
6. **Permissions** — two-tier matrix (read vs delete; delegated vs application; Entra roles; MFA note; national-cloud availability including 21Vianet)
7. **Leaver / Offboarding Automation Pattern** — enumerate → dry-run → confirm sequence; mandatory `-WhatIf` gate; forward cross-link to runbook #29
8. **Prerequisites** — Platform SSO (guide 07), Secure Enclave method (guide 08), Graph permissions, `Install-Module Microsoft.Graph.Identity.SignIns`
9. **Verification** — read-only `Get-MgUserAuthenticationPlatformCredentialMethod` pre-delete check
10. **See Also** — links to guides 07/08, glossary anchors, Microsoft Learn resource/operation pages, runbook #29
11. **Version-history table** — `Phase 84 (GRAPH-01/GRAPH-02)` row

### Key Correctness Points (D-08 / D-09)

- All three HTTP operations use `platformCredentialMethods` as the URL navigation property — the prior PITFALLS.md DELETE form (`authentication/platformCredentialAuthenticationMethod/{id}`) was incorrect and is NOT present in this guide
- No `/beta/` endpoint references anywhere in the file
- Permissions matrix uses verified least-privilege scopes from live Microsoft Learn (2025-11-08/13 dates)
- `[!WARNING]` callout states: severs the Entra binding (forces PSSO re-registration) AND does NOT remote-erase the Secure Enclave key
- Leaver automation pattern includes mandatory `-WhatIf` dry-run; no bulk-audit examples (deferred to Phase 85 RUN-02 runbook #29)

## Commits

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1-3 | Scaffold + Operations + Completion (complete guide authored in single pass) | 672e5d3 | docs/admin-setup-macos/11-graph-api-platform-credential.md (created, 286 lines) |

## Deviations from Plan

### None — plan executed exactly as specified

All three tasks' acceptance criteria pass. The guide was written in full in a single authoring pass (Task 1 commit), which satisfies all three task scopes simultaneously. No acceptance criteria required separate commits — the verification checks confirm all content is present.

**Anti-patterns confirmed absent:**
- No `authentication/platformCredentialAuthenticationMethod/` URL segment (D-08 compliance verified)
- No `/beta/` endpoint references
- No bulk-audit examples (deferred to Phase 85)
- No Create/Update operations documented

## Known Stubs

None. The forward cross-link to `29-macos-graph-credential-investigation.md` references a Phase 85 deliverable that does not yet exist — this is intentional and documented as an out-of-scope deferred item per 84-CONTEXT.md.

## Threat Flags

No new threat surface introduced. This is a documentation-only deliverable. The threat register mitigations are implemented:

- **T-84-01 (Tampering — destructive DELETE):** Mitigated by mandatory `> [!WARNING]` callout in `### Delete a Platform Credential` and mandatory `-WhatIf` dry-run gate in the leaver automation pattern.
- **T-84-02 (Information disclosure — over-privilege):** Mitigated by verified least-privilege scopes in the Permissions matrix; explicit note that Global Reader is NOT sufficient for delete.

## Self-Check: PASSED

- FOUND: `docs/admin-setup-macos/11-graph-api-platform-credential.md`
- FOUND: commit `672e5d3`
- FOUND: `.planning/phases/84-graph-api-doc-nual-key-table/84-01-SUMMARY.md`
