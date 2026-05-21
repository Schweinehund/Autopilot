---
last_verified: 2026-05-21
review_by: 2026-07-20
applies_to: apple-business
audience: admin
platform: ios+macos
---

> **Platform applicability:** Custom roles in Apple Business are the Apple-side mechanism for
> granting per-permission capabilities to sub-organization admins, scoped to one or more
> Organizational Units (OUs). This document covers Apple Business custom role authoring only.
> See the [Apple Business Governance Glossary](../../_glossary-apple-business.md) for
> terminology canon.

> **Training-data notice:** The permission bundle composition in this document is authored
> from AI training knowledge of Apple Business Manager permissions as of the pre-2026-04-14
> rebrand, cross-referenced against `01-role-permission-model.md` (Phase 62 SOT). All
> permission rows in the Sub-Org Admin bundle are marked
> `[CITED: training; needs live verification]` pending a live browser scrape of
> `https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web`.
> Re-verification target: within 60 days of 2026-05-21 (by 2026-07-20). This notice is
> removed once the live scrape is completed and bundle composition is verified verbatim
> against the Apple portal.

# Custom Role Authoring: Sub-Org Admin Bundle

This document cites `01-role-permission-model.md` as the source of truth for the
7-subgroup permission catalog used to compose the canonical Sub-Org Admin permission bundle.
All permission names used in this document are verbatim from
[01-role-permission-model.md](01-role-permission-model.md).

**Purpose:** An admin at the tenant level authors ONE canonical "Sub-Org Admin" custom role
bundle and assigns it (scoped to the target OU) to each sub-organization admin. This role
represents the minimum-viable delegation surface for a sub-org admin to manage devices,
content, and user accounts within their assigned Organizational Unit.

---

> **Critical (OP-2 / DA-2): Account Holder — DO NOT DELEGATE**
>
> The **Account Holder** role MUST NOT be delegated to any sub-organization admin, any
> individual employee, or any non-canonical managed account. Account Holder is the
> tenant-level Apple Business owner with irrevocable lockout-recovery authority. It is the
> only role that can re-accept Apple Terms of Service, transfer Account Holder status, manage
> federation root, and recover lost IT Administrator passwords at the tenant level.
>
> Custom roles for sub-org admins MUST be built from preset roles and per-permission grants.
> NEVER elevate a sub-org admin to Account Holder.
>
> See [01-role-permission-model.md — OP-2 DO-NOT-DELEGATE callout](01-role-permission-model.md#top-level-roles-4)
> and PITFALLS.md OP-2 for the full lockout-recovery rationale.

**Account Holder: ❌ EXCLUDED (OP-2)** — singleton tenant role, structurally non-delegable.
Never appears in any custom role bundle.

---

## Sub-Org Admin Bundle (Canonical — 6 Permissions)

The following table defines the ONE canonical Sub-Org Admin permission bundle. This bundle
is designed as the minimum-viable set: 3 Edit/Manage permissions paired with their 3
required companion View permissions (OP-3), covering device assignment, content-token
visibility, and Managed Apple Account creation within the sub-org admin's assigned OU.

The bundle is **singular** — there are no tiered add-ons or alternative archetypes. Admins
who need additional capabilities must be elevated via the IT Administrator top-level role
(tenant-wide) or via an Account-Holder-reviewed custom role expansion, not through the
Sub-Org Admin bundle.

| Permission | Scope | Edit / View | OP-1 flag | OP-3 companion View | Apple anchor |
|---|---|---|---|---|---|
| View Devices | OU-scoped | View-only | always-grant | — | axm97dd59159 |
| Assign devices to MDM server | OU-scoped | Edit | conditionally-grant | View Devices | axm97dd59159 |
| View content tokens | OU-scoped | View-only | always-grant | — | axme0f8659ec |
| Assign content (device-licensed) | OU-scoped | Edit | conditionally-grant | View content tokens | axme0f8659ec |
| View users | OU-scoped | View-only | always-grant | — | axm97dd59159 |
| Create Managed Apple Accounts | OU-scoped | Edit | conditionally-grant | View users | axm97dd59159 |

[CITED: training; needs live verification — see training-data notice above]

**Bundle summary:** 6 permissions total (3 Edit + 3 View companion). All Edit permissions
are OU-scoped (conditionally-grant). No tenant-wide or DENY-by-default permissions are
included. Bundle is within the 4–6 permission range specified by OU-02.

**OP-3 pairing (Edit-without-View prevention):** Every Edit permission in this bundle is
paired with its required companion View permission in the same bundle. Granting an Edit
permission without its companion View causes blank-UI symptoms. For the full Edit-without-View
dependency table, see
[01-role-permission-model.md — Edit-without-View Dependency Table (OP-3 Prevention)](01-role-permission-model.md#edit-without-view-dependency-table-op-3-prevention).
Do NOT assign "Assign devices to MDM server" without "View Devices", nor "Assign content
(device-licensed)" without "View content tokens", nor "Create Managed Apple Accounts" without
"View users".

---

## Explicitly Excluded Permissions

The following permissions are excluded from the Sub-Org Admin bundle and must NEVER be
added without an Account-Holder-level review:

| Permission | Exclusion | Reason |
|---|---|---|
| Manage MDM Servers | ❌ EXCLUDED (OP-1) | Superprivilege — DENY-by-default; bundles four actions including "Add MDM server" (dangerous) |
| Account Holder | ❌ EXCLUDED (OP-2) | Singleton tenant role; structurally non-delegable; irrevocable lockout-recovery authority |
| Manage content token location | ❌ EXCLUDED | tenant-wide; DENY-by-default; inadvertently moving a content token between OUs breaks app license assignments for the source OU |
| Delete Managed Apple Accounts | ❌ EXCLUDED | DENY-by-default; destructive; inappropriate for min-viable sub-org admin scope |
| Reassign devices between OUs | ❌ EXCLUDED | tenant-wide; DENY-by-default; cross-OU device pool mutation is a tenant-level IT function |

---

> **"Manage MDM Servers" — DENY-by-default (OP-1 superprivilege):**
>
> "Manage MDM Servers" in the Devices subgroup is a superprivilege that bundles four actions
> Apple does not separately gate in their UI:
> (a) Add MDM server — creates a competing MDM server entry (the dangerous action)
> (b) Edit MDM server — modifies name/token of an existing server
> (c) Assign devices to MDM server — the legitimate sub-org admin action
> (d) Download MDM server token — retrieves the .p7m token for MDM push certificate pairing
>
> Sub-org admins legitimately need (c) but should never have (a). Since Apple bundles all four
> under one permission toggle, the **DENY-by-default** contract applies: "Manage MDM Servers"
> MUST be denied in all non-Account-Holder reference roles unless explicitly reviewed and
> approved by the tenant's IT Administrator. If sub-org admins need device-to-MDM-server
> assignment, the "Assign devices to MDM server" permission (included in the Sub-Org Admin
> bundle above) provides this capability through the narrower grant — NOT through "Manage MDM
> Servers".
>
> Source: [01-role-permission-model.md — OP-1 Superprivilege Explainer](01-role-permission-model.md)
> and PITFALLS.md OP-1 — whitelist-first invariant.

---

## How to Author the Custom Role in Apple Business

1. **Sign in** to the Apple Business portal as Account Holder or IT Administrator.
2. Navigate to **Settings → Roles**.
3. Select **Custom Roles** and choose **Create Role**.
4. Name the role (for example, "Sub-Org Admin — v1.6").
5. Enable only the six permissions listed in the Sub-Org Admin Bundle table above.
6. Verify that "Manage MDM Servers" remains **off** (DENY-by-default per OP-1).
7. Save the role.
8. Assign the role to the target admin, scoped to the target OU. See
   [05-sub-org-admin-onboarding.md](05-sub-org-admin-onboarding.md) for the full
   onboarding procedure including OU scoping and paired offboarding (OP-8).

> **Note:** The portal UI labels and toggle names may differ from the verbatim permission
> names in this document pending live verification (see training-data notice). If a portal
> label does not match, cross-reference the Apple anchor ID (axm97dd59159 for most Devices
> and People permissions; axme0f8659ec for Apps & Books permissions).

---

## Delegation Topology Context

This bundle is designed for the **Combined topology** (OUs + custom roles) described in
[03-ous-vs-custom-roles.md](03-ous-vs-custom-roles.md). In an OUs-only topology, organizations
use preset roles (Device Enrollment Manager, Content Manager, People Manager) and do not
author custom bundles. The Sub-Org Admin bundle is the custom-role equivalent that replaces
two or three preset role assignments with a single, auditable permission bundle.

For the topology selection criteria and the OP-4 "most-permissive wins across overlapping
assignments" invariant that governs cross-OU permissions, see
[03-ous-vs-custom-roles.md](03-ous-vs-custom-roles.md).

---

## Cross-References

- **Permission catalog (SOT):** [01-role-permission-model.md](01-role-permission-model.md)
  — 7-subgroup per-permission catalog; DENY-by-default flags; OP-1 superprivilege explainer;
  OP-2 Account Holder DO-NOT-DELEGATE callout;
  [Edit-without-View Dependency Table (OP-3 Prevention)](01-role-permission-model.md#edit-without-view-dependency-table-op-3-prevention)
- **Delegation topology decision:** [03-ous-vs-custom-roles.md](03-ous-vs-custom-roles.md)
  — when to use custom roles vs. OUs-only vs. combined topology (OU-01, Phase 63)
- **OU architecture:** [02-ous-architecture.md](02-ous-architecture.md) — OU scope coverage;
  depth ≤ 2 constraint (D-06); OP-4 "most-permissive wins" additive-scope invariant
- **Sub-org admin onboarding:** [05-sub-org-admin-onboarding.md](05-sub-org-admin-onboarding.md)
  — role assignment, OU scoping, paired offboarding (OU-03, Phase 63)
- **MDM server assignment:** [06-mdm-server-assignment.md](06-mdm-server-assignment.md)
  — per-OU MDM server assignment procedure; OP-1 DENY-by-default guidance (OU-04, Phase 63)
- **Glossary:** [Apple Business Governance Glossary](../../_glossary-apple-business.md) —
  custom role, preset role, Organizational Unit, sub-org admin terminology canon

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-21 | Phase 63 plan 63-01: initial authoring — canonical Sub-Org Admin 6-permission bundle (3 Edit + 3 View, OP-3 paired); OP-1 "Manage MDM Servers" DENY-by-default exclusion; OP-2 Account Holder exclusion; SOT citation to 01-role-permission-model.md; authoring procedure; topology context (OU-02, D-02) | -- |
