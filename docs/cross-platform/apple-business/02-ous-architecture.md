---
last_verified: 2026-05-21
review_by: 2026-07-20
applies_to: apple-business
audience: admin
platform: ios+macos
---

> **Platform applicability:** Apple Business Organizational Units (OUs) are the Apple-side
> delegation primitive for iOS, iPadOS, and macOS Apple-managed devices. There is no direct
> Intune-side analog (Intune scope tags are the closest Microsoft-side concept; see the
> [Apple Business Governance Glossary](../../_glossary-apple-business.md) for terminology canon
> and the [Cross-Org-Boundary Cheat Sheet (Phase 64)](18-cross-org-boundary-cheat-sheet.md)
> for the full Apple-Business-vs-Intune surface disambiguation).

# Organizational Units (OUs) Architecture

An Organizational Unit (OU) (formerly Location) is the Apple-side delegation primitive that
replaced legacy Apple Business Manager "Locations" effective 2026-04-14, when Apple Business
Manager (ABM) was rebranded as Apple Business. OUs define the boundary for device pools,
content tokens, MDM server assignments, Managed Apple Account scopes, and role assignments.
Sub-organization admins operate within the scope of one or more OUs; tenant-wide roles
(Account Holder, IT Administrator, People Administrator, Content Administrator) span all OUs.

For the canonical rebrand-mapping table that records the Location → OU rename alongside all
other 2026-04-14 term changes, see
[Apple Business Governance Glossary — Rebrand Mapping Table](../../_glossary-apple-business.md#rebrand-mapping-table).

For the per-term glossary definition of Organizational Unit, OU Scope, and Sub-OU, see
[Apple Business Governance Glossary — Organizational Unit](../../_glossary-apple-business.md#organizational-unit).

## Hierarchy Rules

Apple Business OUs follow a flat-by-default model:

1. **Flat by default.** The standard Apple Business OU layout is a single tier — all OUs
   are siblings under the tenant root with no mandatory parent–child relationship. Most
   organizations operate with a flat OU list (one OU per business unit, region, or device
   class) and no nesting.

2. **Optional sub-OUs.** Legacy Apple Business Manager (pre-2026-04-14) supported one level
   of nesting (depth = 2: parent OU + child sub-OU). Apple's documentation as of the
   2026-04-14 GA release is ambiguous on whether deeper nesting (depth > 2) is supported
   under the new Apple Business platform.

3. **Deferred verification — max nesting depth.** Definitive confirmation of the maximum
   supported OU nesting depth requires portal verification. This verification is deferred to
   Phase 63 (per planning `<deferred>` item: "OU sub-OU nesting depth — Phase 63 portal
   verification"). For v1.6 authoring purposes, treat the OU hierarchy as
   **flat-by-default with optional one-level sub-OUs (depth ≤ 2)**. Do not publish deeper
   nesting assumptions in downstream runbooks until Phase 63 portal verification resolves
   this gap.

4. **Most-permissive wins across overlapping OU assignments.** When an admin holds custom
   role assignments in multiple OUs that have overlapping device scopes (for example, during
   a device transfer in progress), the most permissive applicable permission set applies.
   This behavior is relevant for Phase 63 OU-01 delegation topology decisions — see
   [03-ous-vs-custom-roles.md](03-ous-vs-custom-roles.md) (Phase 63 deliverable) for the
   full decision matrix.

> **Note:** Apple does not publish a maximum OU count per tenant. Plans that assume a specific
> OU count ceiling should be treated as unverified until Apple publishes guidance or Phase 63
> portal verification provides empirical bounds.

## Locations to OUs Migration Framing

### Conceptual Continuity

Legacy ABM Locations and new Apple Business OUs serve the same delegation primitive role:
they group a device pool and scope admin permissions to that pool. The structural function is
unchanged — only the terminology and (potentially) nesting semantics differ. Administrators
familiar with Locations can treat OUs as a direct conceptual successor.

The rebrand event itself (Apple Business Manager → Apple Business; Location → Organizational
Unit) is recorded in the
[Apple Business Governance Glossary — Rebrand Mapping Table](../../_glossary-apple-business.md#rebrand-mapping-table).
That table is the single source of truth for the rebrand event. This document describes
architectural behavior, not rebrand history.

### Automatic Tenant Migration (2026-04-14)

Apple migrated all existing Locations to OUs automatically on 2026-04-14. Tenant admins
were not required to perform any manual migration steps. Pre-existing per-Location data
transferred to the corresponding OU without admin intervention:

- Devices assigned to a Location transferred to the corresponding OU's device pool.
- Content tokens (formerly VPP location tokens) associated with a Location transferred to
  the corresponding OU.
- MDM server assignments for a Location transferred to the corresponding OU.
- Managed Apple Account scopes (formerly Managed Apple ID scopes) for a Location were
  remapped to the corresponding OU scope.
- Custom role assignments scoped to a Location were remapped to the corresponding OU.

No data loss or reassignment was required by tenants. Admins who log in post-migration see
OUs where Locations previously appeared.

### Untouched-OU Trap (Cross-OU Content Token Migration)

The "untouched-OU trap" applies when a tenant consolidates device pools across OUs and
needs to migrate content tokens from a source OU to a destination OU. Content tokens are
OU-scoped and are NOT automatically transferred when devices move between OUs. The
The Phase 63 admin-setup doc `07-vpp-content-token-consolidation.md` (OU-05) covers
per-OU content-token consolidation concepts. The Phase 64 operational runbook
`11-vpp-catalog-runbook.md` (DELEG-01) carries the OP-9 untouched-OU hard-bordered callout
covering cross-OU content-token migration scenarios. This concept doc does not duplicate
that callout — refer to Phase 63 `07-vpp-content-token-consolidation.md` for admin-setup
guidance and Phase 64 `11-vpp-catalog-runbook.md` for the operational procedure.

## OU Scope Coverage

The following resources are OU-scoped in Apple Business. Custom roles assigned to a sub-org
admin restrict access to one OU's instance of each resource; cross-OU access requires either
a top-level role (IT Administrator / People Administrator / Content Administrator) or
purpose-built cross-OU custom roles (Phase 63 `04-custom-role-authoring.md` deliverable).

| Resource | OU-scoped? | Notes |
|----------|-----------|-------|
| Devices | Yes | Per-OU device pool; reassignment via MDM server transfer (see `15-mdm-server-reassign-runbook.md` Phase 64) |
| Content tokens | Yes | Per-OU token; 1-year validity; OU-scoped allocation per Apple Business article `axme0f8659ec` |
| MDM servers | Yes | One MDM server per OU; assignment cascade through device transfers |
| Managed Apple Accounts | Yes | Per-OU account scope; federation per-OU; SCIM provisioning per-OU |
| Role assignments | Yes | Custom roles scoped to specific OU |
| Audit logs | Partial | Cross-OU visibility — definitive 3×3 visibility matrix deferred to Phase 64 `17-audit-log-scoping-runbook.md` |

## Cross-References

- Glossary: [Organizational Unit](../../_glossary-apple-business.md#organizational-unit),
  [OU Scope](../../_glossary-apple-business.md#ou-scope),
  [Sub-OU](../../_glossary-apple-business.md#sub-ou)
- Rebrand mapping: [Rebrand Mapping Table](../../_glossary-apple-business.md#rebrand-mapping-table)
  — Location → OU rename event + all other 2026-04-14 term changes
- Role/permission model: [01-role-permission-model.md](01-role-permission-model.md) —
  Edit OUs / View OUs Edit-without-View pair (OP-3); top-level vs. custom role scoping
- L1 admin-directory lookup convention: [_admin-directory.md](_admin-directory.md) —
  per-OU admin holder lookup pattern for L1 staff
- Delegation topology decisions: [03-ous-vs-custom-roles.md](03-ous-vs-custom-roles.md)
  (Phase 63 deliverable) — OU hierarchy vs. custom-role design decision matrix
- MDM server OU reassignment: [15-mdm-server-reassign-runbook.md](15-mdm-server-reassign-runbook.md)
  (Phase 64 deliverable) — per-OU MDM server semantics + content-token-per-OU allocation
- Cross-OU audit visibility: [17-audit-log-scoping-runbook.md](17-audit-log-scoping-runbook.md)
  (Phase 64 deliverable) — 3×3 audit log visibility matrix
- Apple-Business-vs-Intune disambiguation: [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md)
  (Phase 64 deliverable) — full surface comparison

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-21 | Phase 62: OUs concept doc — hierarchy rules + 5-row scoping table + Locations→OUs migration framing (AB-04) | -- |
