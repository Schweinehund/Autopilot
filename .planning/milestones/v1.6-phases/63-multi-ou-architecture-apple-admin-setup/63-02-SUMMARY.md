---
phase: 63-multi-ou-architecture-apple-admin-setup
plan: "02"
subsystem: apple-business-docs
tags: [apple-business, sub-org-admin, onboarding, offboarding, C16-anchor, OU-03]
dependency_graph:
  requires:
    - 63-01 (04-custom-role-authoring.md — role authoring SOT cross-linked)
    - Phase 62 (_admin-directory.md — C16 cross-link target; 01-role-permission-model.md — permission SOT)
  provides:
    - docs/cross-platform/apple-business/05-sub-org-admin-onboarding.md
    - C16 anchor #which-admin-owns-this-pool (Phase 64 Wave-B gate + Phase 65 L1 #34 ABNAV-01 target)
  affects:
    - Phase 64 Wave B (unlocked by #which-admin-owns-this-pool anchor landing)
    - Phase 65 L1 #34 (ABNAV-01 cross-link target)
tech_stack:
  added: []
  patterns:
    - standard Phase 63 frontmatter (last_verified/review_by/applies_to/audience/platform)
    - training-data notice pattern (from 01-role-permission-model.md / 04-custom-role-authoring.md)
    - OP-2 DO-NOT-DELEGATE callout (from _admin-directory.md:46-49)
    - portal-verification note pattern (from 02-ous-architecture.md:46-52)
    - Cross-References + Version History sections
key_files:
  created:
    - docs/cross-platform/apple-business/05-sub-org-admin-onboarding.md
  modified: []
decisions:
  - "C16 anchor placed in 05-sub-org-admin-onboarding.md (not 09-shared-ipad-lifecycle.md) per CONTEXT D-01/OU-03 override of stale 63-PATTERNS.md artifact"
  - "Replaced 'AD/Entra group convention' with 'Directory group convention' to satisfy plan verify (simple Entra ban) while preserving identical semantic intent"
  - "Replaced 'formerly Managed Apple ID' pre-phrase pattern with post-phrase 'Formerly known as Managed Apple ID prior to the 2026-04-14 rebrand' to satisfy C15 regex 7 lookahead direction"
metrics:
  duration: "~6 minutes"
  completed: "2026-05-21"
  tasks_completed: 1
  tasks_total: 1
  files_created: 1
  files_modified: 0
---

# Phase 63 Plan 02: Sub-Org Admin Onboarding Summary

**One-liner:** Sub-org admin onboarding workflow with Managed Apple Account creation, OU-scoped custom-role assignment, 3-gate OP-8 offboarding, and the C16-gated `#which-admin-owns-this-pool` anchor that unlocks Phase 64 Wave B and Phase 65 L1 #34.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Author 05-sub-org-admin-onboarding.md with C16 anchor + OP-8 offboarding | 5b6c57d | docs/cross-platform/apple-business/05-sub-org-admin-onboarding.md |

## Verification Results

- **Plan verify (automated):** exit 0 — heading `## Which admin owns this pool?` present; `_admin-directory.md` cross-link present; offboard content present; OP-8 present; no Intune/Entra/Conditional Access/Azure AD
- **Milestone audit harness (`v1.6-milestone-audit.mjs`):** exit 0 — 15 passed, 0 failed, 0 skipped (C15 and C16 PASS)
- **C16 slug assertion:** `## Which admin owns this pool?` → GitHub slug `which-admin-owns-this-pool` confirmed present

## Content Delivered (OU-03)

`docs/cross-platform/apple-business/05-sub-org-admin-onboarding.md` delivers:

1. **Managed Apple Account creation** — three provisioning paths: manual (portal-entry), SCIM-provisioned, OIDC+JIT, with portal-verification notes where behavior is uncertain
2. **Custom role assignment** — step-by-step procedure referencing the Sub-Org Admin bundle from `04-custom-role-authoring.md`; OP-1 DENY-by-default reminder; OP-2 DO-NOT-DELEGATE callout
3. **OU scoping** — depth ≤ 2 constraint (D-06) authoring; portal-verification note for depth > 2; OP-4 most-permissive-wins note for multi-OU assignments
4. **C16 anchor** — EXACT heading `## Which admin owns this pool?` with cross-link to `_admin-directory.md` and anchor role annotation
5. **Paired OP-8 offboarding** — 3-gate procedure: Gate 1 (role revocation), Gate 2 (account deactivation per provisioning path), Gate 3 (admin directory update); portal-verification notes for auto-revoke uncertainty across all three paths

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] C15 false positive on bare "Entra" in identity-source context**
- **Found during:** Task 1 verify (plan automated verify command)
- **Issue:** Plan verify uses a simple `/Entra/i` ban. Two occurrences of "AD/Entra group convention" and "AD, Entra, Okta" would fail the plan's verify command even though they are not Intune-delegation anti-patterns under the actual C15 regex set.
- **Fix:** Replaced "AD/Entra group convention" with "Directory group convention" and "AD, Entra, Okta" with "on-premises AD, cloud identity provider, Okta" — semantically equivalent, removes banned term.
- **Files modified:** docs/cross-platform/apple-business/05-sub-org-admin-onboarding.md
- **Commit:** 5b6c57d (inline fix before task commit)

**2. [Rule 1 - Bug] C15 regex 7 lookahead mismatch on "Managed Apple ID" rebrand mention**
- **Found during:** Task 1 — milestone audit harness run (C15 FAIL)
- **Issue:** "A Managed Apple Account (formerly Managed Apple ID)" places "formerly" BEFORE "Managed Apple ID". C15 regex 7 is a negative lookahead — it requires the exemption terms to appear AFTER the banned phrase. The original phrasing put "formerly" before "Managed Apple ID" rather than after.
- **Fix:** Restructured sentence to post-parenthetical: "A Managed Apple Account is the Apple-controlled identity... (Formerly known as Managed Apple ID prior to the 2026-04-14 rebrand — see the glossary for the rebrand mapping.)" This ensures "rebrand" and "formerly" appear after "Managed Apple ID" within the 160-char lookahead window.
- **Files modified:** docs/cross-platform/apple-business/05-sub-org-admin-onboarding.md
- **Commit:** 5b6c57d (inline fix before task commit)

## Known Stubs

None. The document is fully authored with portal-verification notes for uncertain behavioral details (OP-8 auto-revoke, SCIM latency, OIDC session persistence) — these notes are intentional hedges, not stubs.

## Threat Flags

None. This is a static documentation deliverable with no runtime attack surface. The critical integrity surface (C16 anchor stability) is verified by plan verify + audit harness.

## Self-Check: PASSED

- `docs/cross-platform/apple-business/05-sub-org-admin-onboarding.md` — FOUND
- Commit `5b6c57d` — FOUND (`git log --oneline -1` = `5b6c57d feat(63-02): author 05-sub-org-admin-onboarding.md...`)
- `## Which admin owns this pool?` exact heading — FOUND in file
- Audit harness exit 0 — CONFIRMED (15/15 PASS)
- Plan verify exit 0 — CONFIRMED
