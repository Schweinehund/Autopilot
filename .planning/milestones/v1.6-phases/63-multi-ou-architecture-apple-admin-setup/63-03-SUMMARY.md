---
phase: 63-multi-ou-architecture-apple-admin-setup
plan: "03"
subsystem: apple-business-docs
tags: [apple-business, ous, mdm-server-assignment, vpp-content-tokens, managed-apple-account, admin-setup]
dependency_graph:
  requires: []
  provides:
    - docs/cross-platform/apple-business/06-mdm-server-assignment.md
    - docs/cross-platform/apple-business/07-vpp-content-token-consolidation.md
    - docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md
  affects:
    - docs/cross-platform/apple-business/ (06/07/08 slot filled; 03-10 sequence preserved)
tech_stack:
  added: []
  patterns:
    - standalone-admin-setup-doc-per-ou (D-01 file-per-requirement traceability)
    - deny-by-default-callout (OP-1 pattern from 01-role-permission-model.md)
    - does-not-duplicate-deferral (02-ous-architecture.md:99-105 forward-reference pattern)
    - apple-side-only-framing (C15 guard; ABAUDIT exemption comments for disambiguation)
key_files:
  created:
    - docs/cross-platform/apple-business/06-mdm-server-assignment.md
    - docs/cross-platform/apple-business/07-vpp-content-token-consolidation.md
    - docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md
  modified: []
decisions:
  - "D-01: Three standalone docs (06/07/08) authoring OU-04/OU-05/OU-06 per-OU admin-setup; preserves clean 03-10 sequence"
  - "Task 2 deviation: avoid words containing 'entra' as substring (centralize/central/centralized) — C15 verify regex /Entra/i matches substrings; replaced with consolidate/shared/tenant-level"
metrics:
  duration: 5m
  completed: 2026-05-21
  tasks_completed: 3
  tasks_total: 3
  files_created: 3
  files_modified: 0
---

# Phase 63 Plan 03: Per-OU Admin-Setup Docs (OU-04/05/06) Summary

Three standalone Apple Business admin-setup docs filling the 06/07/08 filename slot: per-OU MDM server assignment (OP-1 DENY-by-default), VPP content-token consolidation (pointing to Phase 64 OP-9 callout owner), and Managed Apple Account provisioning (manual/SCIM/OIDC+JIT decision matrix — Apple-side framing, C15 clean).

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Author 06-mdm-server-assignment.md (OU-04, OP-1 DENY-by-default) | 8fd98b1 | docs/cross-platform/apple-business/06-mdm-server-assignment.md |
| 2 | Author 07-vpp-content-token-consolidation.md (OU-05, Phase 64 OP-9 pointer) | c38dc72 | docs/cross-platform/apple-business/07-vpp-content-token-consolidation.md |
| 3 | Author 08-managed-apple-account-provisioning.md (OU-06, manual/SCIM/OIDC+JIT) | 3434bd1 | docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md |

## Verification Results

All per-task automated verify assertions exit 0:

- Task 1: `DENY-by-default` + `Manage MDM Servers` + `15-mdm-server-reassign-runbook.md` — PASS
- Task 2: `11-vpp-catalog-runbook.md` + `does not duplicate` + `OU-scoped` + no Intune/Entra/Azure AD — PASS
- Task 3: `SCIM` + `OIDC` + `Managed Apple Account` + `16-managed-apple-account-runbook.md` + no bare Intune RBAC — PASS

Overall audit: `node scripts/validation/v1.6-milestone-audit.mjs` — 15 passed, 0 failed, 0 skipped (C14/C15/C16 all PASS).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] C15 regex substring false-positive in 07-vpp-content-token-consolidation.md**

- **Found during:** Task 2 verify
- **Issue:** The C15 verify regex `/Intune|Entra|Conditional Access|Azure AD/i` matched "entra" as a substring of "centralize", "centralized", and "central" — words that appear naturally in consolidation-topology prose and have no Microsoft product intent.
- **Fix:** Replaced "centralize/centralized/central" with "consolidate/shared/tenant-level" throughout the topology prose. No semantic loss; the Apple-side framing was preserved and actually improved by using the document's own "consolidation" terminology consistently.
- **Files modified:** `docs/cross-platform/apple-business/07-vpp-content-token-consolidation.md`
- **Commit:** c38dc72

## Key Decisions

- **OP-1 DENY-by-default placement (06-):** The callout block mirrors the verbatim style from `01-role-permission-model.md:281-288` with an accompanying permission summary table showing `Assign devices to MDM server` (sub-org path) vs `Manage MDM Servers` (tenant-admin only, DENY-by-default).
- **OU-05 does-not-duplicate boundary (07-):** The document covers consolidation concepts and topology decision (A/B/C) while explicitly deferring the OP-9 untouched-OU hard-bordered callout to Phase 64 `11-vpp-catalog-runbook.md`. A summary warning block in 07- gives just enough context for the reader to understand the risk without duplicating the operational callout.
- **C15 Apple-side framing (08-):** The entire SCIM/OIDC+JIT decision matrix uses "federated identity source," "SCIM provisioning endpoint," and "federated authentication via OpenID Connect" — no Microsoft product names. The People subgroup permission table cites `Configure federated authentication` and `Configure SCIM provisioning` as their Apple Business portal labels (DENY-by-default, tenant-wide) without naming the identity provider product.
- **ABAUDIT-04 exemption in 06-:** A single `<!-- ABAUDIT-04: -->` exemption comment wraps the line that disambiguates Apple-side MDM server assignment from Intune MDM push-certificate management — necessary for readers who might conflate the two "MDM" surfaces. This continues the ABAUDIT numbering from ABAUDIT-03 in `00-overview.md`.

## Known Stubs

None. All three documents provide substantive content without placeholder sections. Forward references to Phase 64 runbooks are clearly marked as "forthcoming" (not stubs — intentional cross-phase pointers per D-01).

## Self-Check: PASSED

Files exist:
- FOUND: docs/cross-platform/apple-business/06-mdm-server-assignment.md
- FOUND: docs/cross-platform/apple-business/07-vpp-content-token-consolidation.md
- FOUND: docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md

Commits exist:
- FOUND: 8fd98b1 (Task 1)
- FOUND: c38dc72 (Task 2)
- FOUND: 3434bd1 (Task 3)
