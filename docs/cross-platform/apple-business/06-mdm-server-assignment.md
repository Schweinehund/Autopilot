---
last_verified: 2026-05-21
review_by: 2026-07-20
applies_to: apple-business
audience: admin
platform: ios+macos
---

> **Platform applicability:** This document covers Apple Business per-OU MDM server assignment —
> the Apple-side configuration that determines which MDM server receives newly added devices within
> each Organizational Unit. This is distinct from Intune MDM push-certificate management, which
> is an Intune-side operation outside the Apple Business permission surface. See the
> [Apple Business Governance Glossary](../../_glossary-apple-business.md) for terminology canon.

# MDM Server Assignment (Per-OU Setup)

Each Organizational Unit (OU) in Apple Business has a designated default MDM server. Newly
added devices — whether enrolled via Automated Device Enrollment (ADE), uploaded via Apple
Configurator, or added manually — are automatically assigned to that OU's default MDM server.
This per-OU assignment is the foundation for device routing: the Apple Business portal routes
enrollment traffic to the MDM server specified at the OU level.

Sub-organization admins configure the per-OU default MDM server assignment during OU setup.
They do this through the narrower OU-scoped permission `Assign devices to MDM server` — NOT
through the superprivilege `Manage MDM Servers`, which is reserved for the tenant's central
IT administrator (see OP-1 DENY-by-default callout below).

> **Training-data notice:** MDM server assignment UI labels and step sequences are authored
> from AI training knowledge of Apple Business portal behavior as of the pre-2026-04-14
> rebrand, cross-referenced against research/PITFALLS.md OP-1. Steps are marked
> `[CITED: training; needs live verification]` pending a live portal scrape.
> Re-verification target: within 60 days of 2026-05-21 (by 2026-07-20).

## OP-1 DENY-by-default: "Manage MDM Servers" is Reserved for Tenant Admins

> **"Manage MDM Servers" — DENY-by-default (OP-1 superprivilege):**
> This permission bundles four actions (Add / Edit / Assign / Download MDM server token).
> Sub-org admins who need to assign devices to an MDM server should be granted
> "Assign devices to MDM server" via the canonical Sub-Org Admin custom role bundle
> (see [04-custom-role-authoring.md](04-custom-role-authoring.md)), NOT "Manage MDM Servers".
> In OUs-only topologies, the Device Enrollment Manager preset provides equivalent capability.
> Granting "Manage MDM Servers" to a non-Account-Holder role allows creation of competing
> MDM servers, which routes new devices to the wrong tenant.
>
> Source: `01-role-permission-model.md` line 276 — `Manage MDM Servers | tenant-wide | Edit+bundle | DENY-by-default (OP-1) | View Devices`

**Summary:**

| Permission | Who holds it | Scope | Permitted for sub-org admin? |
|------------|-------------|-------|------------------------------|
| Assign devices to MDM server | Sub-org admin (OU-scoped) | OU-scoped | Yes — via Sub-Org Admin custom role bundle (Combined topology; see [04-custom-role-authoring.md](04-custom-role-authoring.md)) or Device Enrollment Manager preset (OUs-only topology) |
| Manage MDM Servers | Tenant IT administrator / Account Holder only | tenant-wide | **DENY-by-default (OP-1)** |

Sub-org admins are granted `Assign devices to MDM server` (OU-scoped, conditionally-grant).
They are explicitly denied `Manage MDM Servers` (tenant-wide, DENY-by-default).

## Per-OU MDM Server Assignment Procedure

The following procedure covers setting the default MDM server for an OU. Sub-org admins
complete this setup when a new OU is created or when the default server assignment must
change (for the operational reassignment runbook, see Cross-References).

| Step | Action | Who | Notes |
|------|--------|-----|-------|
| 1 | Sign in to Apple Business portal with a Managed Apple Account that holds `Assign devices to MDM server` for the target OU | Sub-org admin | Account Holder credentials are NOT required — OP-2 constraint |
| 2 | Navigate to **Organizational Units** and select the target OU | Sub-org admin | `[CITED: training; needs live verification]` |
| 3 | Under the OU's **Device Management** settings, locate **Default MDM Server** | Sub-org admin | The dropdown lists only MDM servers the tenant has registered |
| 4 | Select the MDM server from the dropdown | Sub-org admin | If the desired server is absent, escalate to a tenant IT administrator — only the tenant admin can add servers via `Manage MDM Servers` |
| 5 | Save the assignment | Sub-org admin | Newly added devices enroll to this server automatically |
| 6 | Verify enrollment routing by adding a test device and confirming it appears in the expected MDM server's device list | Sub-org admin | Enrollment propagation may take several minutes |

> **Note:** The MDM server list shown to sub-org admins contains only servers already registered
> by a tenant IT administrator. Sub-org admins cannot add, edit, or remove MDM servers from this
> list — those actions require `Manage MDM Servers` (DENY-by-default, OP-1). If the required
> MDM server is missing from the dropdown, the sub-org admin must raise an escalation to a
> central IT administrator.

## Device Assignment Cascade

When a device is transferred between OUs, the MDM server assignment follows the destination OU's
default, not the source OU's server. Sub-org admins should confirm the destination OU's MDM
server is correctly configured before initiating any cross-OU device transfer.

| OU Hierarchy depth | Behavior |
|--------------------|----------|
| Flat (depth = 1) | Each OU has its own default MDM server; no inheritance |
| Sub-OU (depth ≤ 2) | Sub-OU inherits the parent OU's MDM server unless explicitly overridden `[CITED: training; needs live verification]` |
| Depth > 2 | Not yet verified — treat as flat-by-default until Phase 63 portal verification resolves (D-06) |

## Operational Reassignment Runbook (Phase 64 Forward Reference)

This admin-setup document covers the initial per-OU MDM server configuration. The operational
procedure for reassigning devices across MDM servers (bulk transfers, OU migrations, MDM server
retirement) is owned by the Phase 64 operational runbook:

The Phase 64 MDM Server Reassignment runbook (`15-mdm-server-reassign-runbook.md`, forthcoming)
carries the operational procedure for cross-OU MDM server transfers and device pool migrations.
This admin-setup doc does not duplicate that procedure — refer to Phase 64 for the operational
runbook.

## Cross-References

- Permission catalog: [01-role-permission-model.md](01-role-permission-model.md) — Devices subgroup
  permission table; OP-1 DENY-by-default callout (line 276); `Assign devices to MDM server` (line 272)
- OU architecture: [02-ous-architecture.md](02-ous-architecture.md) — OU scope coverage table;
  MDM servers row
- Custom role authoring: [04-custom-role-authoring.md](04-custom-role-authoring.md) — min-viable
  sub-org admin bundle; Device Enrollment Manager preset
- Sub-org admin onboarding: [05-sub-org-admin-onboarding.md](05-sub-org-admin-onboarding.md) —
  role assignment + OU scoping procedure for new sub-org admins
- Operational runbook: [15-mdm-server-reassign-runbook.md](15-mdm-server-reassign-runbook.md)
  (Phase 64 deliverable) — bulk device transfer + MDM server migration operational procedure
- Glossary: [Apple Business Governance Glossary](../../_glossary-apple-business.md) — MDM server,
  Organizational Unit, content token, Managed Apple Account terminology canon

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-21 | Phase 63: per-OU MDM server assignment admin-setup doc — OP-1 DENY-by-default callout; procedure table; Phase 64 forward reference (OU-04) | -- |
