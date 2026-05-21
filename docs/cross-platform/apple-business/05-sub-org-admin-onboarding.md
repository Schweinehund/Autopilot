---
last_verified: 2026-05-21
review_by: 2026-07-20
applies_to: apple-business
audience: admin
platform: ios+macos
---

> **Platform applicability:** Sub-org admin onboarding in Apple Business covers the Apple-side
> steps for creating a Managed Apple Account, assigning a custom role, and scoping that role to
> one or more Organizational Units (OUs). This document covers the Apple Business side only.
> See the [Apple Business Governance Glossary](../../_glossary-apple-business.md) for terminology
> canon (Managed Apple Account, Organizational Unit, custom role, sub-org admin).

> **Training-data notice:** Managed Apple Account creation steps and portal navigation labels in
> this document are authored from AI training knowledge of Apple Business Manager permissions as of
> the pre-2026-04-14 rebrand, cross-referenced against `01-role-permission-model.md` (Phase 62
> SOT). All portal-label references are marked `[CITED: training; needs live verification]`
> pending live portal verification. Re-verification target: within 60 days of 2026-05-21
> (by 2026-07-20). This notice is removed once the live scrape is completed and steps are
> verified verbatim against the Apple portal.

# Sub-Org Admin Onboarding (OU-03)

This document covers the full lifecycle for a sub-organization admin within Apple Business:
account creation, custom role assignment, OU scoping, and paired offboarding (OP-8). It
implements requirement OU-03 of the v1.6 Apple Business Delegated Governance milestone.

**Purpose:** Tenant-level admins use this runbook to provision a sub-org admin end-to-end —
from creating their Managed Apple Account through assigning the canonical Sub-Org Admin role
bundle (see [04-custom-role-authoring.md](04-custom-role-authoring.md)) to the correct OU scope
— and to reverse that provisioning cleanly at offboarding.

---

> **Critical (OP-2 / DA-2): Account Holder — DO NOT DELEGATE**
>
> The **Account Holder** role MUST NOT be delegated to a sub-organization admin. Account Holder
> is the tenant-level Apple Business owner with irrevocable lockout-recovery authority. It is the
> only role that can re-accept Apple Terms of Service, transfer Account Holder status, manage
> federation root, and recover lost IT Administrator passwords at the tenant level.
>
> Sub-org admins receive custom roles scoped to their OU. They must NEVER be elevated to Account
> Holder status.
>
> See [Role/Permission Model](01-role-permission-model.md#top-level-roles-4) for the OP-2 / DA-2
> callout. L1 escalation contacts in the [Admin Directory](_admin-directory.md) are Delegation
> Contacts (sub-org admins), NOT Account Holders.

---

## Onboarding Overview

Sub-org admin onboarding consists of three sequential gates:

1. **Managed Apple Account creation** — provision the identity in Apple Business
2. **Custom role assignment** — bind the canonical Sub-Org Admin bundle to the account
3. **OU scoping** — restrict the role assignment to the target Organizational Unit(s)

All three steps are performed by a tenant-level Account Holder or IT Administrator. The sub-org
admin does not self-provision.

---

## Step 1: Managed Apple Account Creation

A Managed Apple Account is the Apple-controlled identity used by sub-org admins to authenticate
to the Apple Business portal and to access OU-scoped resources. (Formerly known as Managed Apple
ID prior to the 2026-04-14 rebrand — see the glossary for the rebrand mapping.)

### 1a. Manual creation (portal-entry method)

1. Sign in to the Apple Business portal as Account Holder or IT Administrator.
   [CITED: training; needs live verification]
2. Navigate to **People** (formerly Users).
3. Select **Add Person** (or the portal-equivalent create action).
4. Enter the sub-org admin's:
   - **Name** (display name as it will appear in the portal)
   - **Managed Apple Account email** — typically `{firstname}.{lastname}@{tenant-domain}` per
     your tenant's naming convention. The `@{tenant-domain}` must match the domain claimed and
     verified by your Apple Business tenant.
5. Leave the account type as the **default** (do not assign IT Administrator at creation).
   The Sub-Org Admin role bundle with OU scoping is applied in Step 2–3. If you set
   IT Administrator here, the custom role in Step 2 is redundant — the account will already
   have tenant-wide admin privileges, which violates the minimum-viable delegation principle.
6. Save the account. Apple sends an activation email to the Managed Apple Account address.

> **Note:** If your tenant uses federated authentication (SCIM provisioning or OIDC + JIT),
> Managed Apple Accounts are created automatically by the identity source — skip Step 1 and
> proceed to Step 2. See [08-managed-apple-account-provisioning.md](08-managed-apple-account-provisioning.md)
> for the provisioning-path decision matrix.

### 1b. SCIM-provisioned creation

If the tenant uses SCIM provisioning (directory-synced), the Managed Apple Account is created
automatically when the upstream directory pushes the user into the SCIM-connected Apple Business
OU. The Account Holder or IT Administrator must still complete Steps 2 and 3 (role assignment
and OU scoping) unless SCIM role mapping is configured.

> **Portal verification note (OP-8 / SCIM):** Whether SCIM role-assignment auto-propagates the
> custom role bundle at account creation time or requires a manual portal step is pending portal
> verification. Until confirmed, treat role assignment (Step 2) as a mandatory manual step
> regardless of provisioning path.

### 1c. OIDC + JIT creation

If the tenant uses OIDC + just-in-time (JIT) provisioning, the Managed Apple Account is created
on first federated sign-in. The Account Holder or IT Administrator must pre-configure the custom
role assignment (Steps 2 and 3) before the sub-org admin's first sign-in to ensure correct
OU-scoped access on arrival.

---

## Step 2: Custom Role Assignment

After the Managed Apple Account exists (manually created, SCIM-provisioned, or pre-created for
OIDC + JIT), assign the canonical Sub-Org Admin permission bundle:

1. In the Apple Business portal, navigate to **Settings → Roles → Custom Roles**.
   [CITED: training; needs live verification]
2. Locate the **"Sub-Org Admin — v1.6"** custom role (or your tenant's named equivalent).
   If this role does not yet exist, author it first using
   [04-custom-role-authoring.md](04-custom-role-authoring.md).
3. Select **Assign Role** (or the portal-equivalent assignment action).
4. Search for and select the Managed Apple Account created in Step 1.
5. **Do NOT save yet** — proceed to Step 3 to scope the assignment to a specific OU before saving.

> **OP-1 DENY-by-default reminder:** Confirm that the "Sub-Org Admin — v1.6" custom role does
> NOT include "Manage MDM Servers". If it does, the role was misconfigured — stop and correct it
> before assigning. See [04-custom-role-authoring.md](04-custom-role-authoring.md) and the
> [OP-1 explainer in 01-role-permission-model.md](01-role-permission-model.md).

---

## Step 3: OU Scoping

OU scoping restricts the custom role assignment to a specific Organizational Unit's device pool,
content tokens, and Managed Apple Account scope. Without OU scoping, the role assignment
defaults to tenant-wide (IT Administrator equivalent), which violates the minimum-viable
delegation principle.

### Sub-OU hierarchy constraint (D-06)

Apple Business OUs are **flat-by-default** with optional one-level sub-OUs (depth ≤ 2). All
Phase 63 documentation authors sub-OU assignments at depth ≤ 2 only.

> **Portal verification note (depth > 2):** Whether Apple Business supports OU nesting deeper
> than one sub-level (depth > 2) is pending portal verification deferred to Phase 63. Until
> confirmed, do not publish or configure sub-OU assignments deeper than one parent–child level.
> See [02-ous-architecture.md — Hierarchy Rules](02-ous-architecture.md) (Hierarchy Rule 3) for
> the depth-deferred-verification context.

### Scoping procedure

1. In the custom role assignment dialog (continued from Step 2), locate the **OU scope** or
   **Location** selector. [CITED: training; needs live verification]
2. Select the target OU (and optionally a child sub-OU at depth ≤ 2) from the dropdown or list.
3. If the sub-org admin should cover multiple OUs, add each OU scope individually.

   > **OP-4 note — most-permissive wins:** When a sub-org admin holds role assignments in
   > multiple OUs with overlapping device scopes, the most permissive applicable permission set
   > applies across that overlap. Assign multi-OU scopes deliberately and document rationale in
   > your tenant's admin directory. See [02-ous-architecture.md — Hierarchy Rules](02-ous-architecture.md)
   > and [03-ous-vs-custom-roles.md](03-ous-vs-custom-roles.md) for the OP-4 topology context.

4. Save the role assignment. The sub-org admin's access is now restricted to the selected OU(s).

### Verification after onboarding

After saving, verify the assignment by checking:

- The sub-org admin appears in the **People** list with the custom role badge.
- Navigating to the target OU's device pool shows only that OU's devices when signed in as the
  sub-org admin account (test using an incognito window or separate browser session).
- "Manage MDM Servers" is absent from the sub-org admin's effective permissions (OP-1 check).

---

## Which admin owns this pool?

> **C16 anchor — Phase 64 Wave-B gate and Phase 65 L1 #34 cross-link target.** This section
> heading produces the GitHub slug `#which-admin-owns-this-pool`. The Phase 64 Wave-B unlock
> depends on this anchor being present and stable. Phase 65 L1 #34 (ABNAV-01) cross-links
> directly to this heading. Do NOT rename, move, or reformat this heading.

When L1 staff or a tenant admin need to identify who owns a specific Apple Business device pool
(OU), use the [Apple Business OU Admin Directory](_admin-directory.md) as the per-OU admin
ownership lookup target.

The admin directory provides four resolution backends (in tenant preference order):

1. Directory group convention (`apple-business-admins-{ou-slug}`)
2. ServiceNow / Jira CMDB (`apple_business_ou_admin` attribute)
3. Confluence / SharePoint tenant-maintained admin contact page
4. Email fallback (`apple-business-admins@<your-tenant>.tld`)

**Canonical lookup path for L1 staff:** Navigate to [_admin-directory.md](_admin-directory.md)
and follow the Lookup Pattern section to identify the Account Holder and Delegation Contact
(sub-org admin) for the OU that owns the device pool in question.

**Updating the admin directory at onboarding:** After completing Steps 1–3 above, the tenant
admin MUST update the [Admin Directory](_admin-directory.md) Per-OU Admin Holder Lookup table
with the new sub-org admin's contact information and the backend used to resolve this OU's
ownership. The admin directory is the cross-OU ownership record; it does not self-update.

---

## Offboarding (OP-8 Paired Offboarding)

Offboarding a sub-org admin should be performed promptly at role change or departure. The
offboarding steps mirror the onboarding paths (manual / SCIM / OIDC + JIT) and must complete
all three gates: role revocation, account deactivation, and admin directory update.

### Gate 1: Role revocation (custom role unassignment)

**Manual / SCIM / OIDC + JIT (all paths):**

1. Sign in to the Apple Business portal as Account Holder or IT Administrator.
2. Navigate to **Settings → Roles → Custom Roles → "Sub-Org Admin — v1.6"** (or your tenant
   equivalent). [CITED: training; needs live verification]
3. Locate the sub-org admin's role assignment entry.
4. Select **Remove Assignment** (or the portal-equivalent revocation action) for each OU the
   admin was scoped to.
5. Save. The sub-org admin loses OU-scoped access immediately.

> **OP-8 portal-verification note — auto-revoke behavior:** Whether Apple Business automatically
> revokes custom role assignments when a Managed Apple Account is deactivated (Step 2 below) is
> pending portal verification. Until confirmed, treat role revocation (Step 1) as a mandatory
> explicit gate — do NOT rely on deactivation to cascade revocation. If portal verification
> confirms auto-revoke, this note will be updated and Step 1 may be marked "optional if
> deactivation is performed first."

### Gate 2: Account deactivation or removal

Choose the deactivation method matching the provisioning path used at onboarding:

**Manual (portal-entry):**
1. Navigate to **People** in the Apple Business portal.
2. Locate the sub-org admin's Managed Apple Account.
3. Select **Deactivate** (preferred over Delete — preserves audit trail) or **Delete** if your
   tenant's data-retention policy requires full removal.
4. Confirm the action. Deactivated accounts cannot authenticate but remain visible in audit logs.

**SCIM-provisioned:**
1. Remove or deactivate the upstream directory user object in your identity source (on-premises
   AD, cloud identity provider, Okta, or equivalent).
2. Wait for the SCIM sync cycle to propagate the deactivation to Apple Business.
3. Verify in the Apple Business portal that the account status is Deactivated.

> **OP-8 portal-verification note — SCIM offboarding latency:** Whether Apple Business
> immediately deactivates SCIM-provisioned accounts upon SCIM DELETE/deactivate push (or
> introduces a sync-cycle delay) is pending portal verification. Until confirmed, treat
> deactivation as potentially asynchronous and verify portal status before closing the
> offboarding ticket.

**OIDC + JIT:**
1. Revoke the federated identity source binding in your IdP (disable/remove the user's
   federated account association with the Apple Business federation configuration).
2. The sub-org admin will be unable to authenticate on next sign-in attempt.
3. Verify by attempting a sign-in as the offboarded account (incognito) — confirm redirect
   fails at the IdP or Apple Business rejects the JIT claim.

> **OP-8 portal-verification note — OIDC + JIT offboarding:** Whether Apple Business invalidates
> existing OIDC sessions on IdP-side revocation (or requires a session expiry timeout) is pending
> portal verification. Where session persistence is a concern, combine IdP revocation with manual
> portal account deactivation (see Manual path above) as a belt-and-suspenders measure.

### Gate 3: Admin directory update

After completing Gates 1 and 2:

1. Open [_admin-directory.md](_admin-directory.md) in your tenant's documentation deployment.
2. Locate the offboarded admin's row in the Per-OU Admin Holder Lookup table.
3. Update the Delegation Contact to the replacement sub-org admin (if known) or mark as
   `<VACANT — reassignment pending>` until a replacement is provisioned.
4. Record the offboarding date in the backend column or in a tenant change-log note.

**The admin directory is the ownership record.** Leaving it stale after offboarding creates
L1 escalation dead-ends and violates the OU ownership visibility contract that the
`#which-admin-owns-this-pool` section above establishes.

---

## OU Scoping Reference

For OU architecture context, the depth ≤ 2 constraint rationale, and the OU Scope Coverage
table (which resources are OU-scoped vs. tenant-wide), see:
[02-ous-architecture.md](02-ous-architecture.md).

Sub-org admins are scoped to one OU's instance of:
- Devices (OU device pool)
- Content tokens (OU-scoped VPP token)
- Managed Apple Accounts (OU creation scope)
- Role assignments (OU-restricted custom role)

Tenant-wide resources (MDM server list, Account Holder authority, cross-OU audit logs) remain
outside sub-org admin scope and require IT Administrator or Account Holder intervention.

---

## Cross-References

- **Role/Permission Model (SOT):** [01-role-permission-model.md](01-role-permission-model.md)
  — 7-subgroup permission catalog; OP-1 DENY-by-default (Manage MDM Servers); OP-2 Account
  Holder DO-NOT-DELEGATE; OP-3 Edit-without-View dependency table
- **Custom role authoring:** [04-custom-role-authoring.md](04-custom-role-authoring.md)
  — how to compose the canonical Sub-Org Admin bundle; role creation procedure; OP-1/OP-2/OP-3
  guards (OU-02, Phase 63)
- **OU architecture:** [02-ous-architecture.md](02-ous-architecture.md)
  — OU hierarchy rules; depth ≤ 2 constraint (D-06); OP-4 "most-permissive wins" additive-scope
  invariant; OU scope coverage table
- **Topology decision matrix:** [03-ous-vs-custom-roles.md](03-ous-vs-custom-roles.md)
  — when to use OUs-only vs. custom-roles-only vs. combined topology (OU-01, Phase 63)
- **Managed Apple Account provisioning decision matrix:** [08-managed-apple-account-provisioning.md](08-managed-apple-account-provisioning.md)
  — manual vs. SCIM vs. OIDC + JIT provisioning path selection (OU-06, Phase 63)
- **Admin directory (C16 cross-link target):** [_admin-directory.md](_admin-directory.md)
  — per-OU admin ownership lookup convention; update required at onboarding and offboarding
- **L1 runbook integration (Phase 65):** `docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md`
  — will cross-link to this file's `#which-admin-owns-this-pool` anchor (C16, Phase 65 ABNAV-01)
- **Glossary:** [Apple Business Governance Glossary](../../_glossary-apple-business.md)
  — Managed Apple Account, Organizational Unit, custom role, sub-org admin terminology canon

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-21 | Phase 63 plan 63-02: initial authoring — Managed Apple Account creation (manual/SCIM/OIDC+JIT), custom role assignment (OP-1/OP-2 guards), OU scoping (depth ≤ 2 per D-06), C16-gated `#which-admin-owns-this-pool` anchor, paired OP-8 offboarding (3-gate: revoke/deactivate/admin-directory), portal-verification notes for OP-8 auto-revoke uncertainty (OU-03, Phase 63) | -- |
