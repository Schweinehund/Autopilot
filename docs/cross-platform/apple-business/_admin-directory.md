<!-- APPLE BUSINESS OU ADMIN DIRECTORY TEMPLATE
     Usage: Tenant copies this file and replaces <TENANT_FILL_IN> placeholders.
     The default upstream copy ships with placeholders ONLY.
     Per D-A8 read-only-corpus contract + T-62-A PII-exposure mitigation:
     - NEVER commit tenant-specific admin contact data to the upstream repo
     - Tenants maintain their populated copy in their own deployment fork or wiki
     - Each <TENANT_FILL_IN> below is a literal placeholder string preserved as-is upstream
-->
---
last_verified: 2026-05-21
review_by: 2026-07-20
applies_to: apple-business
audience: l1
platform: ios+macos
---

# Apple Business OU Admin Directory (Lookup Convention)

> **Tenant-fillable.** This is a CONVENTION + TEMPLATE. Each tenant populates with their own
> admin holders and delegation contacts. The default upstream copy contains `<TENANT_FILL_IN>`
> placeholders ONLY. NEVER commit tenant-specific admin data to the upstream repository per
> D-A8 read-only-corpus contract and T-62-A PII-exposure mitigation.

## Lookup Pattern

L1 staff looking up "which admin owns this device pool" SHOULD resolve via one of these backends
(in tenant preference order):

1. **AD/Entra group convention** — Security group named `apple-business-admins-{ou-slug}` whose
   members are the Account Holders / IT Administrators delegated to that OU. Resolution method:
   query AD/Entra for the group and enumerate members. This is the recommended primary backend
   for most tenants.

2. **ServiceNow / Jira CMDB** — Custom CMDB attribute `apple_business_ou_admin` on the OU
   configuration item (CI) record. Resolution method: CMDB lookup by OU slug. Used when the
   tenant maintains device inventory in a formal CMDB.

3. **Confluence / SharePoint** — Tenant-maintained admin contact page; link provided in the
   Per-OU Admin Holder Lookup table below. Resolution method: navigate to the linked page and
   locate the OU row. Used when the tenant maintains runbooks or admin pages in a wiki.

4. **No formal directory** — Email `apple-business-admins@<your-tenant>.tld` mailing list as
   fallback. Resolution method: send mail to list and await callback. This is a last-resort path;
   tenants are encouraged to adopt one of options 1–3 as a primary backend.

> **Account Holder DO-NOT-DELEGATE note:** The Account Holder role MUST NOT be delegated to a
> sub-organization admin. See [Role/Permission Model](01-role-permission-model.md#top-level-roles-4)
> for the OP-2 / DA-2 callout. L1 escalation contacts listed in this directory are Delegation
> Contacts (sub-org admins), NOT Account Holders.

## Per-OU Admin Holder Lookup

This table is **tenant-fillable**. The default upstream copy ships with one all-placeholder
row demonstrating column structure. Tenants append OU-specific rows in their fork or wiki copy.

| OU | Account Holder (Managed Apple Account) | Delegation Contact | Backend |
|---|---|---|---|
| `<TENANT_FILL_IN>` | `<TENANT_FILL_IN>` | `<TENANT_FILL_IN>` | `<TENANT_FILL_IN>` |
| `<TENANT_FILL_IN>` | `<TENANT_FILL_IN>` | `<TENANT_FILL_IN>` | `<TENANT_FILL_IN>` |

## Tenant Population Instructions

1. **Fork or clone** this file into your tenant's documentation deployment (do NOT commit
   populated copies back to the upstream repository — T-62-A PII-exposure mitigation).
2. **Choose one primary backend** from the Lookup Pattern section above (AD/Entra group
   convention recommended for most tenants).
3. **For each OU in your Apple Business tenant**, append one row to the Per-OU Admin Holder
   Lookup table with:
   - **OU**: the OU slug or display name (e.g., `retail-west`)
   - **Account Holder**: the Managed Apple Account email (e.g., `account-holder@your-tenant.tld`)
   - **Delegation Contact**: the sub-org admin or delegated IT contact for L1 escalation
   - **Backend**: which backend (1–4) was used to resolve this OU's admin lookup
4. **Periodic verification**: update `last_verified:` frontmatter when reviewing tenant data
   (60-day rule per v1.5 carry-over). Set `review_by` to `last_verified + 60 days`.

## Cross-References

- Account Holder DO-NOT-DELEGATE invariant: see [Role/Permission Model](01-role-permission-model.md#top-level-roles-4) — OP-2 / DA-2 callout
- OU scoping context: see [OUs Architecture](02-ous-architecture.md)
- L1 runbook integration (Phase 65): `docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md` will cross-link to this file's `#per-ou-admin-holder-lookup` anchor — the file-level path is the C16 stable target (Phase 65 deliverable per ABNAV-01)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-21 | Phase 62: L1 admin-directory lookup convention template (AB-07) | -- |
