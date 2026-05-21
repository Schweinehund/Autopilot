---
last_verified: 2026-05-21
review_by: 2026-07-20
applies_to: apple-business
audience: admin
platform: ios+macos
---

> **Platform applicability:** This document covers the Apple Business role and permission model
> for iOS, iPadOS, and macOS devices managed through Apple Business. For the Apple Business
> terminology glossary (including rebrand mappings), see the
> [Apple Business Governance Glossary](../../_glossary-apple-business.md).
> For Organizational Units (OUs) scoping, see [02-ous-architecture.md](02-ous-architecture.md).

> **Training-data notice:** The per-permission catalog in this document (Section 3 onward) is
> authored from AI training knowledge of Apple Business Manager permissions as of the pre-2026-04-14
> rebrand, cross-referenced against RESEARCH.md §1 seed data and 62-SCRAPE-PREP.md. All permission
> rows are marked `[CITED: training; needs live verification]` pending a live browser scrape of
> `https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web`.
> Re-verification target: within 60 days of 2026-05-21 (by 2026-07-20). This notice is removed
> once the live scrape is completed and rows are verified verbatim against the Apple portal.

# Apple Business Role and Permission Model

This document is the canonical reference for the Apple Business role and permission model. It
covers the four top-level roles, the five preset custom roles, and the full per-permission catalog
across the seven in-scope subgroups. It also documents the Edit-without-View dependency table
required to prevent blank-UI symptoms when authoring custom roles.

**Scope:** This document covers only the seven in-scope permission subgroups defined in D-02:
Basic Organization, Organization Access, API+OAuth, People, Devices, AppleCare, and Apps & Books.
Brand-related permissions are explicitly excluded — see [Brand-Related Subgroups (excluded per D-02)](#brand-related-subgroups-excluded-per-d-02).

**Downstream consumer:** Phase 63 `04-custom-role-authoring.md` cites this document as the source
of truth for building the minimum-viable sub-org admin permission bundle template.

---

> **Critical (OP-2 / DA-2): Account Holder — DO NOT DELEGATE**
>
> The **Account Holder** role MUST NOT be delegated to any sub-organization admin, any individual
> employee, or any non-canonical managed account. The Account Holder is the tenant-level Apple
> Business owner with **irrevocable lockout-recovery authority**. It is the only role that can:
>
> - Re-accept Apple Terms of Service (blocking org-level governance if overdue)
> - Transfer Account Holder status (requires current holder's active consent — no Apple-side override)
> - Manage federation root (SCIM, federated authentication configuration)
> - Recover lost IT Administrator passwords at the tenant level
>
> Delegating Account Holder to a sub-org admin, a personal Apple ID, or a departing employee's
> account creates an Account Holder lockout vulnerability. Once locked out, recovery requires an
> Apple Enterprise Support paid ticket and identity verification — there is no self-service path.
>
> **Prevention contract:** Custom roles for sub-org admins MUST be built from preset roles and
> per-permission grants. NEVER elevate a sub-org admin to Account Holder.
>
> See also: PITFALLS.md OP-2 (Account Holder lockout) and DA-2 (rebrand inconsistency risk from
> Account Holder handoff during Apple Business Manager → Apple Business transition period).

---

## Top-Level Roles (4)

Apple Business ships four built-in top-level roles. These are tenant-wide and cannot be scoped to
a specific Organizational Unit. For OU-scoped delegation, use preset custom roles (see
[Preset Custom Roles (5)](#preset-custom-roles-5)).

1. **Account Holder** — The single tenant-level owner of the Apple Business organization. DO NOT
   DELEGATE (see callout above). Holds irrevocable lockout-recovery authority and is the only
   identity Apple recognizes for Terms of Service acceptance, Account Holder transfer, and
   federation root management. Must be a Managed Apple Account on the organization's verified
   domain — never a personal Apple ID.

2. **IT Administrator** — Mid-tier role with broad device, content, and people scope across the
   entire tenant. Can manage devices, MDM servers, content tokens, user accounts, and
   organizational settings. Appropriate for central IT operations staff who administer the
   entire fleet. Does NOT hold Account Holder lockout-recovery authority.

3. **People Administrator** — People and account scope at the tenant-wide level. Can create,
   edit, and delete Managed Apple Accounts, reset passwords, and manage user-to-OU assignments.
   Does not have device management or content token authority. Appropriate for HR or identity
   management teams operating at tenant scope.

4. **Content Administrator** — Content and VPP (Volume Purchase Program) scope at the
   tenant-wide level. Can manage content tokens, purchase apps, and assign app licenses across
   OUs. Does not have device or people management authority. Appropriate for procurement or
   app management teams operating at tenant scope.

---

## Preset Custom Roles (5)

Preset custom roles are Apple-defined starting points for OU-scoped delegation. Unlike the
four top-level roles, preset custom roles are assigned per-OU — a user may hold a different
preset role in different OUs. Apple Business ships five preset custom roles; organizations can
also create fully custom roles from individual permission toggles.

For OU scoping rules and the "most-permissive wins" additive-scope invariant, see
[02-ous-architecture.md](02-ous-architecture.md).

1. **People Manager** — Preset; per-OU people scope. Can create, edit, and delete Managed Apple
   Accounts within an assigned OU; can reset account passwords within the OU scope. Formerly
   a built-in role in Apple Business Manager (pre-2026-04-14). Appropriate for OU-local HR or
   help-desk staff who manage user accounts in a single business unit.

2. **Content Manager** — Preset; per-OU content scope. Can manage content tokens, purchase apps,
   and assign content licenses within the assigned OU. Cannot create devices or manage device
   assignments. Appropriate for per-department app procurement staff.

3. **Device Enrollment Manager** — Preset; per-OU enrollment scope. Can assign devices to MDM
   servers, manage device enrollment, and manage device records within the assigned OU. NOTE:
   The "Manage MDM Servers" superprivilege is NOT included in this preset by default — see
   [Devices](#devices) subgroup and OP-1 DENY-by-default contract below.

4. **Device API Manager** — Preset; Apple Business Device API scope. This preset role is
   associated with the Apple Business Device API (a new API surface introduced alongside the
   Apple Business rebrand). Apple has not yet published a developer.apple.com landing page for
   this API as of 2026-05-21. **v1.6 policy: acknowledge but do not document deeply.** Full
   Device API Manager coverage is deferred to v1.7+ per CONTEXT.md `<deferred>` (Apple has not
   published the developer-facing documentation surface). If this role is encountered in your
   Apple Business portal, treat it as requiring Account Holder or IT Administrator authorization
   before granting to any sub-org admin.

5. **Brand Manager** — Preset; brand and marketing content scope. **Permissions in this
   subgroup are EXCLUDED from the Phase 62 catalog per D-02.** For Brand Manager permission
   details, see Apple's official documentation at
   `https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web`.
   Brand-related permission URLs encountered during catalog authoring are logged in the
   `c13_rotting_external` sidecar (Plan 62-08) for quarterly rotation audit.

---

## Per-Permission Catalog

This section provides the full canonical per-permission catalog across the seven in-scope
subgroups defined in D-02. Each permission is documented using the following six-column schema
(the `subgroup` column is implicit — the H3 heading IS the subgroup label):

| Permission | Scope | Edit / View | OP-1 flag | OP-3 companion View | Apple anchor |
|------------|-------|-------------|-----------|---------------------|--------------|

Column definitions:
- **Permission**: Verbatim Apple portal label (or training-knowledge best-effort marked `[CITED: training]`)
- **Scope**: `OU-scoped` | `tenant-wide` | `device-level` | `user-level`
- **Edit / View**: `View-only` | `Edit` | `Edit+View (paired)` | `Standalone` | `Edit+bundle`
- **OP-1 flag**: `DENY-by-default` | `conditionally-grant` | `always-grant`
- **OP-3 companion View**: companion View permission required for non-blank UI; `—` if standalone
- **Apple anchor**: Apple article ID (`axm*`) or `portal-only`

> **OP-1 Superprivilege Explainer — "Manage MDM Servers":**
>
> "Manage MDM Servers" in the Devices subgroup is a superprivilege that bundles four actions
> Apple does not separately gate in their UI:
> (a) Add MDM server — creates a competing MDM server entry (the dangerous action)
> (b) Edit MDM server — modifies name/token of an existing server
> (c) Assign devices to MDM server — the legitimate sub-org admin action
> (d) Download MDM server token — retrieves the .p7m token for Intune MDM push certificate pairing
>
> Sub-org admins legitimately need (c) but should never have (a). Since Apple bundles all four
> under one permission toggle, the **DENY-by-default** contract applies: "Manage MDM Servers"
> MUST be denied in all non-Account-Holder reference roles unless explicitly reviewed and approved
> by the tenant's central IT administrator. If sub-org admins need device-to-MDM-server assignment,
> the Device Enrollment Manager preset role provides this capability through the narrower
> "Assign devices to MDM server" permission — not through "Manage MDM Servers".
>
> Source: PITFALLS.md OP-1 — whitelist-first invariant.

---

### Basic Organization

Permissions governing organizational profile and Terms of Service management.

[CITED: training; needs live verification — scrape `axm97dd59159` sub-page for verbatim labels]

| Permission | Scope | Edit / View | OP-1 flag | OP-3 companion View | Apple anchor |
|------------|-------|-------------|-----------|---------------------|--------------|
| View organization profile | tenant-wide | View-only | always-grant | — | axm97dd59159 |
| Edit organization profile | tenant-wide | Edit | always-grant | View organization profile | axm97dd59159 |
| Accept Terms of Service | tenant-wide | Standalone | DENY-by-default | — | axm97dd59159 |
| Manage federation settings | tenant-wide | Edit | DENY-by-default | View organization profile | axm97dd59159 |

> **Note:** "Accept Terms of Service" is DENY-by-default because only the Account Holder should
> be accepting Apple Business Terms of Service updates. Delegating this to a sub-org admin risks
> an unreviewed T&C acceptance that binds the organization legally.

---

### Organization Access

Permissions governing organizational units, user access, and federated authentication
configuration.

[CITED: training; needs live verification — scrape `axm97dd59159` sub-page for verbatim labels]

| Permission | Scope | Edit / View | OP-1 flag | OP-3 companion View | Apple anchor |
|------------|-------|-------------|-----------|---------------------|--------------|
| View users | OU-scoped | View-only | always-grant | — | axm97dd59159 |
| Edit Managed Apple Accounts | OU-scoped | Edit | conditionally-grant | View users | axm97dd59159 |
| Delete Managed Apple Accounts | OU-scoped | Edit | DENY-by-default | View users | axm97dd59159 |
| View OUs | tenant-wide | View-only | always-grant | — | axm97dd59159 |
| Create/Edit OUs | tenant-wide | Edit | DENY-by-default | View OUs | axm97dd59159 |
| Delete OUs | tenant-wide | Edit | DENY-by-default | View OUs | axm97dd59159 |
| Assign roles | tenant-wide | Edit | DENY-by-default | View users | axm97dd59159 |
| Configure federated authentication | tenant-wide | Edit | DENY-by-default | View users | axm97dd59159 |
| Configure SCIM provisioning | tenant-wide | Edit | DENY-by-default | View federated auth status | axm97dd59159 |

> **Note:** "Delete OUs" and "Assign roles" are DENY-by-default. A sub-org admin deleting an OU
> or reassigning roles at the tenant level could disrupt all scoped-to-OU custom roles and their
> associated device pool assignments.

---

### API+OAuth

Permissions governing Apple Business API token generation and revocation.

[CITED: training; needs live verification — scrape `axm97dd59159` sub-page for verbatim labels]

| Permission | Scope | Edit / View | OP-1 flag | OP-3 companion View | Apple anchor |
|------------|-------|-------------|-----------|---------------------|--------------|
| Generate Apple Business API tokens | tenant-wide | Edit | conditionally-grant | — | portal-only |
| Revoke API tokens | tenant-wide | Edit | DENY-by-default | — | portal-only |

> **Note:** API token generation is conditionally-grant (Device API Manager preset role uses it).
> Revocation is DENY-by-default because revoking an active API token can break automated device
> enrollment pipelines that depend on the token.

---

### People

Permissions governing Managed Apple Account lifecycle and Shared iPad passcode management.

[CITED: training; needs live verification — scrape `axm97dd59159` sub-page for verbatim labels]

| Permission | Scope | Edit / View | OP-1 flag | OP-3 companion View | Apple anchor |
|------------|-------|-------------|-----------|---------------------|--------------|
| View users | OU-scoped | View-only | always-grant | — | axm97dd59159 |
| Create Managed Apple Accounts | OU-scoped | Edit | conditionally-grant | View users | axm97dd59159 |
| Edit Managed Apple Accounts | OU-scoped | Edit | conditionally-grant | View users | axm97dd59159 |
| Delete Managed Apple Accounts | OU-scoped | Edit | DENY-by-default | View users | axm97dd59159 |
| Reset Managed Apple Account passwords | OU-scoped | Edit | conditionally-grant | View users | axm97dd59159 |
| Reset Shared iPad passcode | OU-scoped | Edit | conditionally-grant (OP-11) | View users | axm97dd59159 |
| Configure default username format | tenant-wide | Edit | DENY-by-default | — | portal-only |

> **OP-11 — Reset Shared iPad passcode (conditionally-grant):**
> This permission controls the ability to reset the passcode on a Shared iPad device partition.
> It is conditionally-grant (not always-deny) because L1 help-desk staff in Shared iPad
> deployments legitimately need this capability per-OU. However, it MUST be paired with the
> companion View permission. Without "View users", the People tab shows an empty list and the
> reset action cannot be targeted.
>
> WARNING: Do not confuse "Reset Shared iPad passcode" (resets a per-user passcode on a Shared
> iPad partition) with Intune's "Wipe" or "Retire" device actions (which perform a full device
> erase). The Apple Business action is non-destructive at the device level; it only clears the
> user's temporary session passcode on the Shared iPad. See PITFALLS.md OP-11 + OP-12 for the
> three-path decision matrix and Find My pre-check.

---

### Devices

Permissions governing device management, MDM server assignment, and device supplier management.

[CITED: training; needs live verification — scrape `axm97dd59159` sub-page for verbatim labels]

| Permission | Scope | Edit / View | OP-1 flag | OP-3 companion View | Apple anchor |
|------------|-------|-------------|-----------|---------------------|--------------|
| View Devices | OU-scoped | View-only | always-grant | — | axm97dd59159 |
| Add devices manually | OU-scoped | Edit | conditionally-grant | View Devices | axm97dd59159 |
| Assign devices to MDM server | OU-scoped | Edit | conditionally-grant | View Devices | axm97dd59159 |
| Reassign devices between OUs | tenant-wide | Edit | DENY-by-default | View Devices | axm97dd59159 |
| Release devices | OU-scoped | Edit | conditionally-grant | View Devices | axm97dd59159 |
| Unassign devices from MDM server | OU-scoped | Edit | DENY-by-default | View Devices | axm97dd59159 |
| Manage MDM Servers | tenant-wide | Edit+bundle | **DENY-by-default (OP-1)** | View Devices | axm97dd59159 |
| Manage device suppliers | tenant-wide | Edit | DENY-by-default | — | portal-only |
| Upload devices via Apple Configurator | OU-scoped | Edit | conditionally-grant | View Devices | axm97dd59159 |
| Manage Activation Lock Bypass | OU-scoped | Edit | conditionally-grant | View Devices | axm97dd59159 |

> **"Manage MDM Servers" — DENY-by-default (OP-1 superprivilege):**
> This permission bundles four actions (Add / Edit / Assign / Download MDM server token).
> Sub-org admins who need to assign devices to an MDM server should be granted
> "Assign devices to MDM server" (through the Device Enrollment Manager preset), NOT
> "Manage MDM Servers". Granting "Manage MDM Servers" to a non-Account-Holder role allows
> creation of competing MDM servers, which routes new devices to the wrong tenant.
> See OP-1 superprivilege explainer above.

---

### AppleCare

Permissions governing AppleCare entitlement visibility and repair request submission.

[CITED: training; needs live verification — scrape `axm97dd59159` sub-page for verbatim labels]

| Permission | Scope | Edit / View | OP-1 flag | OP-3 companion View | Apple anchor |
|------------|-------|-------------|-----------|---------------------|--------------|
| View AppleCare entitlements | OU-scoped | View-only | always-grant | — | portal-only |
| Submit AppleCare repair requests | OU-scoped | Edit | conditionally-grant | View AppleCare entitlements | portal-only |

---

### Apps & Books

Permissions governing content token management, app purchasing, and license assignment.

[CITED: training; needs live verification — scrape `axm97dd59159` sub-page for verbatim labels]

| Permission | Scope | Edit / View | OP-1 flag | OP-3 companion View | Apple anchor |
|------------|-------|-------------|-----------|---------------------|--------------|
| View content tokens | OU-scoped | View-only | always-grant | — | axme0f8659ec |
| Download content tokens | OU-scoped | Edit | conditionally-grant | View content tokens | axme0f8659ec |
| Purchase apps and books | OU-scoped | Edit | conditionally-grant | View content tokens | axme0f8659ec |
| Assign content (device-licensed) | OU-scoped | Edit | conditionally-grant | View content tokens | axme0f8659ec |
| Assign content (user-licensed) | OU-scoped | Edit | conditionally-grant | View content tokens | axme0f8659ec |
| Reclaim licenses | OU-scoped | Edit | conditionally-grant | View purchase history | axme0f8659ec |
| View purchase history | OU-scoped | View-only | always-grant | — | axme0f8659ec |
| Manage content token location | tenant-wide | Edit | DENY-by-default | View content tokens | axme0f8659ec |

> **Content token scope:** Each content token is OU-scoped. An admin with "Download content
> tokens" in OU-A cannot download the token for OU-B. The "Manage content token location" permission
> controls which OU a token is associated with — this is tenant-wide and DENY-by-default because
> inadvertently moving a token between OUs breaks existing app license assignments for the source OU.

---

### Brand-Related Subgroups (excluded per D-02)

Brand-related permissions (Brand Manager preset role subgroup) are explicitly excluded from this
Phase 62 catalog per D-02. The Brand Manager permission set covers brand asset management,
marketing content distribution, and Apple Business storefront customization.

For Brand Manager permission details, see Apple's official documentation:
`https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web`

**Brand-related URLs encountered during catalog authoring (logged for Plan 62-08 `c13_rotting_external`):**
- Brand Manager sub-page: not scraped per D-02 exclusion; URL pattern follows Apple Business User
  Guide sub-page convention at `support.apple.com/guide/apple-business-manager/` with `axm*` IDs.

---

## Edit-without-View Dependency Table (OP-3 Prevention)

When authoring custom roles, NEVER grant an Edit permission without also granting its required
companion View permission. Apple Business models Edit and View as independent toggles — granting
Edit without View causes the admin's UI to show an empty list (they cannot read the target
resources), resulting in "my permissions aren't working" support tickets.

The table below maps each Edit permission to its required companion View permission and the
specific blank-UI symptom that results from the missing View grant.

| Edit permission | Required companion View | Subgroup (Edit) | Subgroup (View) | Blank-UI symptom |
|----------------|------------------------|-----------------|-----------------|------------------|
| Assign devices to MDM server | View Devices | Devices | Devices | Devices tab shows empty list |
| Release devices | View Devices | Devices | Devices | Devices tab shows empty list |
| Assign content (device-licensed) | View content tokens | Apps & Books | Apps & Books | Apps & Books tab shows empty |
| Assign content (user-licensed) | View content tokens | Apps & Books | Apps & Books | Apps & Books tab shows empty |
| Reclaim licenses | View purchase history | Apps & Books | Apps & Books | Can't see licenses to reclaim |
| Edit Managed Apple Accounts | View users | Organization Access | Organization Access | People tab shows empty |
| Create/Edit OUs | View OUs | Organization Access | Organization Access | OU list shows empty |
| Configure SCIM provisioning | View federated auth status | Organization Access | Organization Access | Federation settings blank |
| Submit AppleCare repair requests | View AppleCare entitlements | AppleCare | AppleCare | AppleCare tab shows no devices |
| Purchase apps and books | View content tokens | Apps & Books | Apps & Books | Apps & Books tab shows empty |

> **Phase 63 cross-reference:** When authoring the `04-custom-role-authoring.md` minimum-viable
> sub-org admin permission bundle template (Phase 63), every Edit permission included in the bundle
> MUST have its companion View permission from the table above also included in the bundle. A bundle
> that grants only the Edit half of a dependency pair will produce blank-UI symptoms for the admin
> it is assigned to. Verify each bundle against this table before committing the template.

---

## Apple Business Device API — Acknowledgment

Apple introduced the Device API Manager preset role alongside the April 2026 Apple Business
rebrand. This API surface is intended to allow programmatic device management operations through
a formal Apple-published API. As of 2026-05-21, Apple has not published a developer.apple.com
landing page, reference documentation, or SDK for the Apple Business Device API. The Device API
Manager preset role is visible in the Apple Business portal but its permission surface is not
publicly documented.

**v1.6 policy:** Acknowledge existence; do not document deeply. Full coverage is deferred to
v1.7+ pending Apple publishing the developer-facing documentation. Operators encountering Device
API Manager in their portal should treat it as requiring Account Holder or IT Administrator
review before granting. Monitor `developer.apple.com` and `developer.apple.com/apple-business/`
for future documentation landing.

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-21 | Phase 62 plan 62-04: initial authoring — 4 top-level roles + 5 preset custom roles + 7-subgroup per-permission catalog (training-knowledge best-effort, 43 permission rows across 7 subgroups) + 10-row Edit-without-View dependency table. Live scrape verification pending by 2026-07-20. | -- |
