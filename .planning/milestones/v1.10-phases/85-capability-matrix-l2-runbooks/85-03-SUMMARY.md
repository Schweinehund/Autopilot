---
phase: 85
plan: "03"
subsystem: l2-runbooks
tags: [kerberos-sso, graph-api, platform-credential, runbook, macos, l2]
dependency_graph:
  requires:
    - docs/admin-setup-macos/10-kerberos-sso-extension.md   # link target + diagnostic source (#28)
    - docs/admin-setup-macos/11-graph-api-platform-credential.md  # link target link-not-copy (#29)
    - docs/l2-runbooks/27-macos-sso-investigation.md         # structural template
    - docs/l2-runbooks/10-macos-log-collection.md            # prerequisite (referenced)
  provides:
    - docs/l2-runbooks/28-macos-kerberos-sso-investigation.md   # RUN-01, SC#4
    - docs/l2-runbooks/29-macos-graph-credential-investigation.md  # RUN-02, SC#5
    - docs/l2-runbooks/00-index.md                           # #28/#29 rows in When-to-Use table
  affects:
    - docs/l2-runbooks/00-index.md
tech_stack:
  added: []
  patterns:
    - "#27 runbook template (frontmatter, platform-gate, ## Context, Track/Step, Escalation Packet, Related Resources, Version History)"
    - "Link-not-copy for guides 10/11 — no prose duplication of permissions tables or endpoint shapes"
    - "No-L1-escalation sentinel sentence (D-05)"
    - "Locked diagnostic pair: app-sso platform -s + bare klist (no app-sso diagnose, no klist -v)"
    - "platformCredentialMethods nav property (v1.0) throughout #29"
    - "Mandatory [!WARNING] for DELETE credential operation"
key_files:
  created:
    - docs/l2-runbooks/28-macos-kerberos-sso-investigation.md
    - docs/l2-runbooks/29-macos-graph-credential-investigation.md
  modified:
    - docs/l2-runbooks/00-index.md
decisions:
  - "D-04 applied: both #28 and #29 follow the 27-macos-sso-investigation.md template"
  - "D-05 applied: no L1-routing block in either runbook; no-L1-escalation sentinel sentence used"
  - "D-06 applied: bulk-audit appears as a one-paragraph out-of-scope forward note in #29 only"
  - "#28 uses Track A/B (ticket-acquisition vs PSSO-TGT integration); #29 uses single-track numbered steps (sequential enumerate→verify→delete→re-register→troubleshoot)"
  - "Cosmetic 'Not signed in' menu-bar note included in #28 Track A Step 1 (83-CONTEXT D-12)"
  - "L1 Escalation Mapping table in 00-index.md left byte-unchanged (D-05/Pitfall 7)"
metrics:
  duration: "~20 minutes"
  completed: "2026-06-23"
  tasks_completed: 3
  files_created: 2
  files_modified: 1
---

# Phase 85 Plan 03: L2 Runbooks #28 and #29 Summary

**One-liner:** Two new macOS L2 runbooks authored using the #27 template — Kerberos SSO Extension (Track A/B: ticket-acquisition + PSSO-TGT integration) and Graph Platform Credential (single-track: enumerate/verify/delete/re-register/permissions) — plus 00-index.md When-to-Use table extended with both rows.

## What Was Built

### Task 1 — Runbook #28: macOS Kerberos SSO Extension Investigation (RUN-01, SC#4)

Created `docs/l2-runbooks/28-macos-kerberos-sso-investigation.md` mirroring the #27 anatomy.

**Track A: Ticket Acquisition Failure (TGT Not Issued)**
- Step 1: `app-sso platform -s` — confirms PSSO registration and TGT state; interprets `tgt_ad` (on-prem AD TGT) vs `tgt_cloud` (Entra TGT); includes cosmetic "Not signed in" menu-bar note so a working PSSO-TGT deployment is not misread as failed
- Step 2: `klist` (bare form, version-stable) — inspects Kerberos credential cache; documents realm/KDC reachability checks (realm ALL CAPS, profile assignment, Company Portal version, network path to KDC)
- Step 3: AppSSO debug logging + sysdiagnose capture — the verified Microsoft-documented deep-dive procedure; includes explicit note that `app-sso diagnose` does not exist

**Track B: PSSO-TGT Integration Failure (`usePlatformSSOTGT`)**
- Step 1: Verify macOS 14.6+ floor and Company Portal 5.2408.0+
- Step 2: Verify `usePlatformSSOTGT: true` in the Kerberos `.mobileconfig`; covers K-1 and K-5 pitfalls via link-not-copy to guide 10
- Step 3: Confirm PSSO registration precedes Kerberos profile delivery (ordering rule)

**Locks observed:** No `app-sso diagnose` anywhere; no `klist -v`; no "From L1 escalation?" routing block; `10-kerberos-sso-extension.md` linked as guide for Verification and Configuration-Caused Failures.

### Task 2 — Runbook #29: macOS Graph Platform Credential Investigation (RUN-02, SC#5)

Created `docs/l2-runbooks/29-macos-graph-credential-investigation.md` as a single-track numbered-step runbook.

- Step 1: Enumerate — `GET .../platformCredentialMethods` (read-only pre-check)
- Step 2: Verify — `GET .../platformCredentialMethods/{id}?$expand=device` — property verification (platform, keyStrength, displayName, createdDateTime)
- Step 3: Delete — `DELETE .../platformCredentialMethods/{id}` — mandatory `[!WARNING]` block (severs Entra binding, forces PSSO re-registration, does NOT erase SE key); mandatory `-WhatIf` dry-run gate
- Step 4: Verify re-registration — `app-sso platform -s` + fresh Graph List call to confirm new credential record
- Step 5: Permission/role troubleshooting — read vs delete scope distinction, delegated vs application, national-cloud; link-not-copy to guide 11 §Permissions (no permissions table inlined)

**Bulk-audit deferred** as a one-paragraph out-of-scope note (D-06) referencing guide 11's leaver/offboarding automation pattern.

**Locks observed:** Every Graph URL uses `platformCredentialMethods` nav property; no `platformCredentialAuthenticationMethod/` URL path segment; `[!WARNING]` present on DELETE; guide 11 permissions link-not-copy; no "From L1 escalation?" block.

### Task 3 — 00-index.md When-to-Use Table Extended

Added two rows to the macOS ADE Runbooks "When to Use" table in `docs/l2-runbooks/00-index.md`, after the existing #27 Platform SSO Investigation row:

| Row | When to Use | Prerequisite |
|-----|-------------|--------------|
| Kerberos SSO Investigation (#28) | Kerberos TGT not acquired, realm/KDC unreachable, or PSSO-TGT integration failure (`usePlatformSSOTGT`) | macOS Log Collection |
| Graph Credential Investigation (#29) | Platform Credential not appearing in Graph, delete-and-re-register flow, or permission/scope errors on `platformCredentialMethods` | macOS Log Collection |

The `### macOS L1 Escalation Mapping` table was NOT modified (D-05/Pitfall 7 — no L1 Kerberos or L1 Graph runbook exists).

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. Both runbooks are self-contained operational documents with no placeholder content or hardcoded empty values. Log collection links to the existing `10-macos-log-collection.md` prerequisite. All guide cross-links target existing shipped files (guides 10 and 11, runbook 27, L1 runbooks 35/36).

## Threat Flags

No new security-relevant surface introduced. This plan authors documentation-only markdown files (two new runbooks + one index table edit). The runbooks document security-relevant procedures (Graph API DELETE, Kerberos TGT management) but implementing the security controls is the responsibility of guides 10 and 11 (shipped in Phases 83/84). No new network endpoints, auth paths, file access patterns, or schema changes were introduced.

## Commits

| Task | Commit | Message |
|------|--------|---------|
| Task 1 — Runbook #28 | 5853b4c | feat(85-03): author L2 runbook #28 macOS Kerberos SSO Extension investigation (RUN-01, SC#4) |
| Task 2 — Runbook #29 | 1d4a14d | feat(85-03): author L2 runbook #29 macOS Graph Platform Credential investigation (RUN-02, SC#5) |
| Task 3 — 00-index.md | 92605dd | feat(85-03): extend 00-index.md macOS ADE Runbooks When-to-Use table with #28/#29 rows (D-05) |

## Self-Check: PASSED

| Check | Result |
|-------|--------|
| `28-macos-kerberos-sso-investigation.md` exists (190 lines, min 60) | FOUND |
| `29-macos-graph-credential-investigation.md` exists (191 lines, min 60) | FOUND |
| Commit 5853b4c exists | FOUND |
| Commit 1d4a14d exists | FOUND |
| Commit 92605dd exists | FOUND |
