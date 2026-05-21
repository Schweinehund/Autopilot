---
last_verified: 2026-05-21
review_by: 2026-07-20
applies_to: apple-business
audience: admin
platform: ios+macos
---

> **Platform applicability:** This document covers Managed Apple Account provisioning on the
> Apple Business side — how user identities are created and managed within Apple Business for
> use with Apple-managed devices. Federation framing in this document describes the Apple
> Business federated identity configuration surface, not the identity provider's internal
> delegation model. See the
> [Apple Business Governance Glossary](../../_glossary-apple-business.md) for terminology canon.

# Managed Apple Account Provisioning (OU-06)

A Managed Apple Account is the Apple-owned identity credential assigned to each user in an
Apple Business tenant. Managed Apple Accounts are required for Shared iPad user sessions,
per-user app license assignments (user-licensed content), and federated sign-in workflows.
Each Managed Apple Account is OU-scoped: its permissions and app license assignments apply
within the OU to which it belongs.

Sub-organization admins provision and manage Managed Apple Accounts within their OU scope
using permissions from the People subgroup in Apple Business. The provisioning method —
manual portal entry, SCIM directory sync, or OIDC federated sign-in with just-in-time account
creation — determines how accounts are created and how user identity attributes are maintained.

> **Training-data notice:** Managed Apple Account provisioning UI labels, SCIM endpoint
> behavior, and OIDC federation step sequences are authored from AI training knowledge of
> Apple Business portal behavior, cross-referenced against research/PITFALLS.md OP-8 and
> `01-role-permission-model.md` People subgroup. Steps are marked
> `[CITED: training; needs live verification]` pending live portal verification.
> Re-verification target: within 60 days of 2026-05-21 (by 2026-07-20).

## Provisioning Method Decision Matrix

Choose the provisioning method that matches your organization's identity management maturity
and operational requirements.

1. **Manual (Apple Business web portal entry)**
   - **When:** Small OU with fewer than 50 users; no existing directory sync infrastructure;
     one-time bulk import or pilot deployment; identity provider does not support SCIM or OIDC.
   - **Tradeoff:** Lowest setup complexity — no federation configuration required. Not scalable:
     each Managed Apple Account is created individually in the Apple Business portal by a sub-org
     admin with `Create Managed Apple Accounts` permission. Account attributes (name, email,
     department) must be updated manually; no automated lifecycle management. Suitable for small
     or stable user populations.

2. **SCIM (directory-synced provisioning)**
   - **When:** Organization has an existing SCIM-capable identity provider with a provisioning
     connector for Apple Business. User lifecycle (create, update, deactivate) is managed in
     the identity provider and synced automatically to Apple Business via the SCIM provisioning
     endpoint. Recommended for tenants with 50+ users or frequent onboarding/offboarding cycles.
   - **Tradeoff:** Automates account lifecycle management — attribute changes in the identity
     provider propagate to Managed Apple Accounts without manual Apple Business portal entry.
     Requires SCIM configuration on both the identity provider side (outbound provisioning
     connector) and the Apple Business side (`Configure SCIM provisioning` permission,
     tenant-wide, DENY-by-default — requires tenant IT administrator). Sub-org admins with
     OU-scoped permissions can create and edit Managed Apple Accounts within their OU; they
     cannot configure the tenant-wide SCIM provisioning endpoint.

3. **OIDC + JIT (federated sign-in with just-in-time account creation)**
   - **When:** Organization uses federated authentication via OpenID Connect (OIDC). Users
     sign in to Apple Business with their federated identity source credentials; Apple Business
     creates a Managed Apple Account automatically on first sign-in (just-in-time provisioning).
     Recommended when the organization prioritizes single sign-on user experience and the
     identity source is OIDC-capable.
   - **Tradeoff:** Best end-user experience — users authenticate with existing credentials;
     no separate Managed Apple Account password to manage. Requires OIDC federation configuration
     in Apple Business (`Configure federated authentication` permission, tenant-wide,
     DENY-by-default — requires tenant IT administrator). JIT account creation means Managed
     Apple Accounts are not pre-provisioned; the account exists only after the user's first
     federated sign-in. Attribute mapping (display name, email, OU assignment) is governed
     by the identity claim payload from the federated identity source.

> **Note (D-06 sub-OU depth):** SCIM provisioning and OIDC federation are configured at the
> tenant level. Sub-OU membership assignment within SCIM provisioning is `[CITED: training;
> needs live verification]` for depth > 1. For v1.6, treat per-OU Managed Apple Account
> scoping as flat-by-default with optional one-level sub-OUs (depth ≤ 2) pending Phase 63
> portal verification.

## People Subgroup Permissions (Per-OU Operations)

| Permission | Scope | OP-1 flag | Sub-org admin? |
|------------|-------|-----------|----------------|
| View users | OU-scoped | always-grant | Yes |
| Create Managed Apple Accounts | OU-scoped | conditionally-grant | Yes (manual path) |
| Edit Managed Apple Accounts | OU-scoped | conditionally-grant | Yes |
| Delete Managed Apple Accounts | OU-scoped | DENY-by-default | No — escalate to tenant IT administrator |
| Reset Managed Apple Account passwords | OU-scoped | conditionally-grant | Yes |
| Reset Shared iPad passcode | OU-scoped | conditionally-grant (OP-11) | Yes (see 09-shared-ipad-lifecycle.md) |
| Configure federated authentication | tenant-wide | DENY-by-default | No — requires tenant IT administrator |
| Configure SCIM provisioning | tenant-wide | DENY-by-default | No — requires tenant IT administrator |

Source: `01-role-permission-model.md` People subgroup (lines 239-244) and Organization Access
subgroup (lines 205-206).

## Provisioning Path Decision Summary

| Factor | Manual | SCIM | OIDC + JIT |
|--------|--------|------|------------|
| Scale | Small (< 50 users) | Medium–Large (50+) | Any (single sign-on focus) |
| Lifecycle automation | None | Full (create/update/deactivate) | Partial (create on first sign-in) |
| Tenant IT setup required | No | Yes (SCIM endpoint config) | Yes (OIDC federation config) |
| Sub-org admin self-service | Yes (Create/Edit) | Attribute changes via identity source | Account exists after first sign-in |
| Password management | Managed Apple Account password | Identity provider password | Identity provider password (federated) |
| Pre-provisioning required | Yes (manual entry) | Yes (sync before first use) | No (JIT on first sign-in) |

## Operational Runbook (Phase 64 Forward Reference)

This admin-setup document provides the provisioning method decision matrix and permission
reference for sub-org admin planning. The operational procedure for Managed Apple Account
lifecycle management — bulk creation, SCIM sync troubleshooting, OIDC federation setup, and
account deactivation — is owned by the Phase 64 operational runbook:

The Phase 64 Managed Apple Account management runbook (`16-managed-apple-account-runbook.md`,
forthcoming) carries the operational account-management procedures for all three provisioning
paths. This admin-setup doc does not duplicate that procedure — refer to Phase 64 for the
operational runbook.

## Cross-References

- Permission catalog: [01-role-permission-model.md](01-role-permission-model.md) — People subgroup
  (lines 239-244); Organization Access subgroup — federated authentication + SCIM provisioning
  permissions (lines 205-206)
- OU architecture: [02-ous-architecture.md](02-ous-architecture.md) — Managed Apple Accounts
  row in OU Scope Coverage table; depth ≤ 2 sub-OU cap (D-06)
- Sub-org admin onboarding: [05-sub-org-admin-onboarding.md](05-sub-org-admin-onboarding.md) —
  Managed Apple Account creation for the sub-org admin themselves; `#which-admin-owns-this-pool`
  anchor
- VPP content tokens: [07-vpp-content-token-consolidation.md](07-vpp-content-token-consolidation.md) —
  user-licensed app assignment requires per-OU Managed Apple Accounts (OU-05)
- Shared iPad lifecycle: [09-shared-ipad-lifecycle.md](09-shared-ipad-lifecycle.md) — Shared iPad
  session user provisioning requires Managed Apple Accounts (OU-07)
- Operational runbook: [16-managed-apple-account-runbook.md](16-managed-apple-account-runbook.md)
  (Phase 64 deliverable, DELEG-06) — full account lifecycle operational procedure
- Glossary: [Apple Business Governance Glossary](../../_glossary-apple-business.md) — Managed
  Apple Account, federated identity, SCIM, OIDC, OU-scoped terminology canon

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-21 | Phase 63: Managed Apple Account provisioning admin-setup doc — manual/SCIM/OIDC+JIT decision matrix; People subgroup permission reference; Phase 64 forward reference (OU-06) | -- |
