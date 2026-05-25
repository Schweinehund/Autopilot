---
phase: 64-apple-business-delegation-runbooks
plan: "04"
subsystem: docs/cross-platform/apple-business
tags: [apple-business, managed-apple-account, scim, oidc, audit-logs, runbook, deleg-06, deleg-07]
dependency_graph:
  requires: [64-01]
  provides: [DELEG-06, DELEG-07]
  affects: [docs/cross-platform/apple-business/16-managed-apple-account-runbook.md, docs/cross-platform/apple-business/17-audit-log-scoping-runbook.md]
tech_stack:
  added: []
  patterns: [D-01 runbook envelope, D-02 scope-boundary callout, D-03 Required Role & Permission, D-04 light-Note tier, ABAUDIT C15 exemption]
key_files:
  created:
    - docs/cross-platform/apple-business/16-managed-apple-account-runbook.md
    - docs/cross-platform/apple-business/17-audit-log-scoping-runbook.md
  modified: []
decisions:
  - SCIM renewal window tagged [ASSUMED] with axm526a05814 as authoritative (per RESEARCH open-question resolution)
  - Apple audit log retention SLA not stated — Note explicitly states Apple does not publish; monthly SIEM export recommended
  - Recovery-if-60-day-window-missed tagged [ASSUMED — Apple Enterprise Support; needs live verification]
  - ABAUDIT-15 allocated to 16- C15 disambiguation; ABAUDIT-16 allocated to 17- C15 disambiguation
metrics:
  duration: ~35 minutes
  completed: 2026-05-22
  tasks_completed: 2
  files_created: 2
---

# Phase 64 Plan 04: Identity and Observability Runbooks Summary

Two identity-and-observability runbooks shipped: `16-` covers Managed Apple Account provisioning across three paths (manual, SCIM from Entra, OIDC+JIT) with the OP-7 60-day federation collision sub-section and SCIM token renewal cadence; `17-` documents the audit log scoping model with author/target-scope semantics (OP-14), SIEM export pattern (OP-13), and the "no public REST API" anti-feature.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Author 16-managed-apple-account-runbook.md (DELEG-06) | 36000ca | docs/cross-platform/apple-business/16-managed-apple-account-runbook.md |
| 2 | Author 17-audit-log-scoping-runbook.md (DELEG-07) | 9639574 | docs/cross-platform/apple-business/17-audit-log-scoping-runbook.md |

## What Was Built

### 16-managed-apple-account-runbook.md (DELEG-06)

Operational counterpart to `08-managed-apple-account-provisioning.md`. Covers the three provisioning paths:

- **Path A (manual):** Step-by-step manual account creation via Users > Add Account; one-time password delivery; credential handoff to user.
- **Path B (SCIM from Entra):** SCIM endpoint configuration, token generation, Entra gallery app setup, attribute mapping, group scope; SCIM token renewal cadence (1-year validity, ~60-day renewal notice [ASSUMED], 4-day transfer window) with renewal procedure steps.
- **Path C (OIDC+JIT):** OIDC federation configuration, ssf.manage/ssf.read scopes, JIT account creation on first sign-in.

Includes SCIM-vs-OIDC decision criteria table, SCIM-manual-roaming conflict anti-pattern Note, and the `## 60-Day Federation Collision Resolution` sub-section (OP-7) with:
- Pre-federation preflight (conflicting Apple ID count check)
- User-comms 60-day notice template
- Resolution paths (user renames vs admin force-federates)
- Recovery-if-window-missed tagged [ASSUMED — Apple Enterprise Support; needs live verification]

Back-references `08-managed-apple-account-provisioning.md` for setup prerequisites. D-03 block cites `01-` People/Organization Access subgroup only — does NOT cite `04-` (people-management permissions are not in the Sub-Org Admin bundle).

### 17-audit-log-scoping-runbook.md (DELEG-07)

Audit log access and scoping runbook documenting the UI-only audit surface and its limitations:

- **Activity log access:** sidebar navigation, filter dimensions (Category, Event, Status, Date range), Download Logs export.
- **Author-scope vs target-scope H2 (OP-14):** Explains audit entries are scoped to the AUTHOR's OU, not the TARGET resource's OU. Ghost-device example: OU-A admin transfers device to OU-B; OU-B admin does not see the inbound transfer; resolution requires tenant IT administrator tenant-wide query.
- **SIEM export pattern (OP-13):** At-least-monthly export recommended; Note explicitly states Apple does NOT publish a retention SLA (no number stated); cross-OU SIEM completeness note (OU-scoped export covers only author-scope events).
- **No Public REST API anti-feature section:** Explicitly states audit log access is UI-only; automation request table with redirect to Apple Feedback Assistant; distinction between the Apple Business Device API (device management surface) and audit log access.

D-03 block cites `01-` Logs/Activity permission group only — does NOT cite `04-`.

## ABAUDIT Numbers Consumed (Plan 64-04)

| Number | File | Line exempted | C15 trigger |
|--------|------|---------------|-------------|
| ABAUDIT-15 | 16-managed-apple-account-runbook.md | Line distinguishing Intune enrollment as downstream consumer (not provisioning authority) | C15 regex 4 |
| ABAUDIT-16 | 17-audit-log-scoping-runbook.md | Line distinguishing Intune audit logs/compliance reports from Apple Business Activity logs | C15 regex 4 |

**Next available ABAUDIT number:** ABAUDIT-17

Plans 64-05 (18-cross-org-boundary-cheat-sheet.md) is expected to consume ABAUDIT-17 through approximately ABAUDIT-24+ (disambiguation table rows). Plan 64-05 continues from ABAUDIT-17.

## Deviations from Plan

None — plan executed exactly as written.

Both files honor the D-01 envelope, D-02 scope-boundary callout (with forward link to `18-`), D-03 Required Role & Permission block (citing `01-` only; no `04-` cite), and the D-04 Refined-C light Note tier (no `⛔` hard callout). ABAUDIT exemptions placed correctly as line-pair-scoped comments. The C15 guard (v1.6-milestone-audit.mjs) passes for both files.

## Verification Results

```
node scripts/validation/check-phase-64.mjs --verbose
V-64-08: PASS -- 7/7 action runbooks (11-17) contain ## Required Role & Permission
v1.6-milestone-audit.mjs: PASS -- 15 checks, 0 failed

node -e "..." → 16- OK
node -e "..." → 17- OK
```

Remaining failures in check-phase-64.mjs (V-64-01, V-64-06, V-64-07, V-64-09, V-64-10) are exclusively due to the missing `18-cross-org-boundary-cheat-sheet.md` (Plan 64-05 deliverable). All 16-/17-specific assertions pass.

## Known Stubs

None — no placeholder text or hardcoded empty values. All uncertainty is explicitly tagged `[ASSUMED]` or `[CITED: training; needs live verification]` per the 60-day re-verification discipline.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. This is documentation-only.

| Flag | File | Description |
|------|------|-------------|
| T-64-11 mitigated | 16-managed-apple-account-runbook.md | SCIM/OIDC federation prose framed as Apple-Business-side config; ABAUDIT-15 exempts C15 false-positive |
| T-64-12 mitigated | 17-audit-log-scoping-runbook.md | Explicit Note that Apple does NOT publish a retention SLA; no number stated |
| T-64-13 mitigated | 16-managed-apple-account-runbook.md | SCIM renewal window tagged [ASSUMED] with axm526a05814 as authoritative |

## Self-Check: PASSED

- `docs/cross-platform/apple-business/16-managed-apple-account-runbook.md` — FOUND
- `docs/cross-platform/apple-business/17-audit-log-scoping-runbook.md` — FOUND
- Commit 36000ca — FOUND (16-)
- Commit 9639574 — FOUND (17-)
