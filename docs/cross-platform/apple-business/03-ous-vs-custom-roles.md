---
last_verified: 2026-05-21
review_by: 2026-07-20
applies_to: apple-business
audience: admin
platform: ios+macos
---

> **Platform applicability:** Apple Business Organizational Units (OUs) and custom roles are
> Apple-side delegation primitives for iOS, iPadOS, and macOS Apple-managed devices. The
> topology decision described in this document — OUs-only, custom-roles-only, or combined —
> applies entirely within the Apple Business portal. See the
> [Apple Business Governance Glossary](../../_glossary-apple-business.md) for terminology
> canon (Organizational Unit, custom role, sub-org admin).

# OUs vs. Custom Roles: Delegation Topology Decision Matrix

This document helps Apple Business admins choose the right delegation topology for their
organization. Three topologies are available: OUs-only, custom-roles-only, and combined. The
matrix below compares them across key decision criteria to guide the initial architecture
choice.

**Prerequisite reading:**

- [02-ous-architecture.md](02-ous-architecture.md) — OU hierarchy rules, scope coverage table,
  and the "most-permissive wins" additive-scope invariant (Phase 62 SOT)
- [01-role-permission-model.md](01-role-permission-model.md) — per-permission catalog and
  Edit-without-View dependency table (SOT for custom role authoring)
- [04-custom-role-authoring.md](04-custom-role-authoring.md) — canonical Sub-Org Admin
  permission bundle template (Phase 63)

---

## Topology Overview

Before comparing, a brief definition of each topology:

- **OUs-only:** Delegate by assigning the same preset custom role (for example, Device Enrollment
  Manager or Content Manager) to admins in different OUs. The OU boundary controls scope; all
  sub-org admins within an OU hold equivalent preset permissions.

- **Custom-roles-only:** Create bespoke per-role permission bundles and assign them to admins at
  the tenant level or across OUs without relying on OU membership for scope differentiation.

- **Combined:** Use OUs to partition device pools and content tokens (the OU-scoped resources
  from [02-ous-architecture.md](02-ous-architecture.md)), AND use custom roles to control
  which specific actions each admin can perform within the OU. This is the recommended topology
  for organizations that need both resource-pool isolation and fine-grained action control.

---

## Criteria Comparison Table

| Decision criterion | OUs-only | Custom-roles-only | Combined |
|---|---|---|---|
| **Partitions which devices/content an admin sees** | Yes — OU boundary is the device-pool and content-token fence | No — admin sees resources based on role scope, not OU | Yes — OU provides the pool boundary; role provides the action filter |
| **Partitions which actions an admin can perform** | Partially — preset roles restrict actions, but all admins in an OU share the same preset | Yes — custom permissions control each action independently | Yes — fine-grained action control per custom role, scoped to the OU |
| **Setup overhead** | Low — assign a preset role + OU; no custom role authoring required | High — must author and maintain custom permission bundles; no built-in OU pooling | Medium — OU creation (low overhead) plus custom role authoring (one-time bundle) |
| **Cross-OU access for an admin** | Requires assigning the admin to multiple OUs (additive scope; see OP-4 note below) | Requires explicit tenant-wide role grant or multi-OU custom role assignment | Requires assigning to multiple OUs; OP-4 additive scope still applies |
| **Admin action granularity** | Preset-level only (5 preset roles: People Manager, Content Manager, Device Enrollment Manager, Device API Manager, Brand Manager) | Per-permission — any combination from the 7-subgroup catalog in [01-role-permission-model.md](01-role-permission-model.md) | Per-permission within OU scope — highest granularity |
| **OU hierarchy depth supported** | Flat-by-default; optional sub-OUs at depth ≤ 2 (D-06; see [02-ous-architecture.md](02-ous-architecture.md)) | Not dependent on OU hierarchy | Same depth constraint as OUs-only (D-06) |
| **Best fit** | Organizations with uniform action requirements per business unit — all admins in a unit need the same preset capability set | Organizations with heterogeneous action requirements but no need for strict device-pool isolation per admin | Organizations with both device-pool isolation requirements AND heterogeneous action requirements — the recommended default for new Apple Business delegated governance deployments |

> **OP-4 — most-permissive wins across overlapping assignments:** When an admin holds custom
> role assignments in multiple OUs that have overlapping device scopes (for example, during a
> device transfer in progress), the most permissive applicable permission set applies. This is
> an additive-scope invariant: assigning an admin to an additional OU can only increase their
> effective permissions, never restrict them. Plan cross-OU assignments accordingly. For the
> authoritative prose and architecture context, see
> [02-ous-architecture.md — Hierarchy Rules §4](02-ous-architecture.md).

---

## Topology Selection Guide

Use this decision path to select a starting topology:

1. **Does your organization need strict device-pool isolation between business units?**
   - **Yes** → OU partitioning is required. Go to step 2.
   - **No** → Custom-roles-only may be sufficient if action differentiation is the primary need.

2. **Do different admins within the same OU need different action capabilities?**
   - **Yes** → Combined topology — use OUs for pool isolation, custom roles for action control.
   - **No** → OUs-only with preset roles may be sufficient.

3. **Is setup simplicity the primary constraint?**
   - **Yes** → OUs-only with preset roles minimizes authoring overhead.
   - **No** → Invest in custom role authoring per [04-custom-role-authoring.md](04-custom-role-authoring.md).

**Recommended default for new deployments:** Combined topology. OUs provide device-pool and
content-token isolation (non-negotiable for multi-business-unit organizations); custom roles
provide the per-action DENY-by-default safety that prevents superprivilege grants (OP-1:
"Manage MDM Servers").

---

## Sub-OU Depth Constraint (D-06)

All three topologies are subject to the D-06 depth constraint: author OU hierarchy as
**flat-by-default with optional one-level sub-OUs (depth ≤ 2)** until Phase 63 portal
verification confirms deeper nesting support. Do not design topology plans that assume
depth > 2. See [02-ous-architecture.md — Hierarchy Rules §3](02-ous-architecture.md) for
the deferred verification context.

---

## Cross-References

- **OU hierarchy rules and scope coverage:** [02-ous-architecture.md](02-ous-architecture.md)
  — flat-by-default model, depth ≤ 2 constraint, Locations → OUs migration, OU scope coverage
  table, OP-4 "most-permissive wins" authoritative prose
- **Permission catalog (SOT):** [01-role-permission-model.md](01-role-permission-model.md)
  — 4 top-level roles, 5 preset custom roles, 7-subgroup per-permission catalog,
  Edit-without-View dependency table (OP-3)
- **Custom role authoring:** [04-custom-role-authoring.md](04-custom-role-authoring.md)
  — canonical Sub-Org Admin 4–6 permission bundle template (OU-02, Phase 63)
- **Sub-org admin onboarding:** [05-sub-org-admin-onboarding.md](05-sub-org-admin-onboarding.md)
  — admin creation, role assignment, OU scoping, paired offboarding (OU-03, Phase 63)
- **Glossary:** [Apple Business Governance Glossary](../../_glossary-apple-business.md) —
  Organizational Unit, OU Scope, Sub-OU, custom role, preset role terminology canon

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-21 | Phase 63 plan 63-01: initial authoring — 3-topology criteria comparison table (OUs-only / Custom-roles-only / Combined) + adjacent OP-4 "most-permissive wins" callout + topology selection guide (OU-01, D-03) | -- |
