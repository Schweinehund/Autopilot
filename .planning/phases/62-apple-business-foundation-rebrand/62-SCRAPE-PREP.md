# Phase 62 Per-Permission Catalog Scrape Preparation

**Prepared:** 2026-05-21
**Consumed by:** Plan 62-04 (`01-role-permission-model.md` authoring task)
**Purpose:** Deterministic input list + row schema so the 1-hour manual scrape against
Apple's JS-rendered permission sub-pages produces canonical, machine-checkable output.

## In-Scope Subgroups (7) per D-02

| # | Subgroup | Apple Portal Path | Estimated Row Count | OP-1/OP-3 Flags |
|---|----------|-------------------|---------------------|-----------------|
| 1 | Basic Organization | Apple Business portal → Access Management → Roles → Basic Organization | 3-5 | Accept T&S = DENY-by-default |
| 2 | Organization Access | ...Access Management → Roles → Organization Access | 7-9 | Delete OUs / Assign roles = DENY-by-default |
| 3 | API+OAuth | ...Access Management → Roles → API+OAuth | 2-3 | Revoke = DENY-by-default |
| 4 | People | ...Access Management → Roles → People | 6-8 | Reset Shared iPad passcode = conditionally-grant (OP-11) |
| 5 | Devices | ...Access Management → Roles → Devices | 8-10 | Manage MDM Servers = DENY-by-default (OP-1 CRITICAL) |
| 6 | AppleCare | ...Access Management → Roles → AppleCare | 2 | N/A |
| 7 | Apps & Books | ...Access Management → Roles → Apps & Books | 7-8 | Download content tokens = conditionally-grant |

Estimated total rows: ~35-45 (RESEARCH.md §1 estimate: ~50; Plan 62-04 catalog size).

## Out-of-Scope Subgroups (Brand-related per D-02)

These subgroups are EXCLUDED from the Phase 62 catalog per D-02; `01-role-permission-model.md`
ships a pointer "see Apple official docs at `axm97dd59159`" and the omitted subgroups are
logged in `c13_rotting_external` sidecar (Plan 62-08).

- Brand Manager subgroup (any Marketing/Brand-related permissions Apple groups separately)

## 7-Column Row Schema (mandatory for every scraped permission)

```
| subgroup | permission_name | scope | edit_vs_view | op1_whitelist_relevance | op3_dependency_notes | apple_url_anchor |
```

- **subgroup**: one of the 7 in-scope subgroups (exact label from above table)
- **permission_name**: VERBATIM Apple portal label (do NOT paraphrase; if Apple uses "Manage MDM Servers" do not write "MDM Server Management")
- **scope**: {OU-scoped | tenant-wide | device-level | user-level}
- **edit_vs_view**: {View-only | Edit | Edit+View (paired) | Standalone | Edit+bundle (for superprivileges like Manage MDM Servers)}
- **op1_whitelist_relevance**: {DENY-by-default | conditionally-grant | always-grant} — OP-1 flag
- **op3_dependency_notes**: companion View permission required for non-blank UI (blank if Standalone); e.g., "Requires 'View Devices'"
- **apple_url_anchor**: Apple article ID (`axm97dd59159`, etc.) or `portal-only` if no static URL

## Apple URL Inputs

Root page (table of subgroup links):
- https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web

Sub-pages are navigated FROM the root; their URLs are JS-routed and may not have stable
deep-link anchors. Where Apple has assigned a stable `axm*` article ID, capture it in the
`apple_url_anchor` column; otherwise record `portal-only`.

## Known Cross-Subgroup Dependencies (Edit-without-View; OP-3 prevention)

Seed pairs from RESEARCH.md §1; manual scrape must verify and EXTEND if Apple lists additional pairs:

| Edit permission | Required companion View | Blank-UI symptom |
|----------------|------------------------|-----------------|
| Assign devices to MDM server | View Devices (Devices subgroup) | Devices tab shows empty list |
| Release devices | View Devices | Devices tab shows empty list |
| Assign content (device-licensed) | View content tokens (Apps & Books) | Apps & Books tab shows empty |
| Reclaim licenses | View purchase history (Apps & Books) | Can't see what to reclaim |
| Edit Managed Apple Accounts | View users (Organization Access) | People tab shows empty |
| Edit OUs | View OUs (Organization Access) | OU list shows empty |
| Configure SCIM provisioning | View federated auth status (Organization Access) | Federation settings blank |

## Scrape Execution Notes (for Plan 62-04 executor)

1. Open the root page in a real browser (NOT WebFetch — pages are JS-rendered).
2. Sign in to Apple Business portal with read-only credentials if available; if not, the
   public Apple Business User Guide also exposes the per-permission tables (lower fidelity
   but acceptable as fallback).
3. For each of the 7 subgroups, transcribe ALL permissions into the 7-column schema.
4. For "Manage MDM Servers" specifically — flag as DENY-by-default with OP-1 superprivilege
   note (bundles Add MDM server / Edit MDM server / Assign devices to MDM server / Download
   MDM server token; Apple does NOT separately gate these in the UI per OP-1).
5. For Brand-related subgroups encountered during navigation, do NOT scrape; instead, log
   the URL/subgroup name in a tail section "Brand-related subgroups (deferred per D-02)"
   for inclusion in `c13_rotting_external` sidecar.

## Output Location

The scraped rows land in `docs/cross-platform/apple-business/01-role-permission-model.md`
H2 subgroup sections (Plan 62-04 Task 02). The Edit-without-View dependency table lands in
the same file (Plan 62-04 Task 03).

---
*Scrape preparation finalized: 2026-05-21*
