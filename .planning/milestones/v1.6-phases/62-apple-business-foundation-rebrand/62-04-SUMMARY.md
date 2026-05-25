---
phase: 62
plan: 62-04
subsystem: docs/cross-platform/apple-business
tags: [apple-business, ab-02, ab-03, op-1, op-2, op-3, op-11, role-permission-model, edit-without-view]
dependency_graph:
  requires: [62-01, 62-02, 62-03]
  provides: [docs/cross-platform/apple-business/01-role-permission-model.md]
  affects: [Phase 63 04-custom-role-authoring.md, Plan 62-08 c13_rotting_external, Phase 65 L1-34]
tech_stack:
  added: []
  patterns: [60-day-review-cycle, ios+macos-platform-compound, op-1-deny-by-default, op-3-edit-without-view, op-11-conditionally-grant]
key_files:
  created: [docs/cross-platform/apple-business/01-role-permission-model.md]
  modified: []
decisions:
  - "Best-effort training-knowledge catalog with explicit [CITED: training; needs live verification] markers on all permission rows — live scrape deferred to 60-day re-verification window (by 2026-07-20)"
  - "10-row Edit-without-View dependency table (7 seed pairs from SCRAPE-PREP.md + 3 additional: Assign content user-licensed, Submit AppleCare requests, Purchase apps)"
  - "Apple Business Device API acknowledged-but-not-documented-deeply per CONTEXT.md deferred; Device API Manager preset role present in roles section with explicit v1.7+ note"
metrics:
  duration: 480s
  completed: 2026-05-21
  tasks_completed: 3
  files_created: 1
---

# Phase 62 Plan 04: Role/Permission Model + 7-Subgroup Catalog + Edit-without-View Table Summary

**One-liner:** Apple Business canonical role/permission model with Account Holder DO-NOT-DELEGATE callout (OP-2), 4 top-level roles, 5 preset custom roles, 43-row best-effort per-permission catalog across 7 in-scope subgroups with OP-1/OP-3/OP-11 flags, and 10-row Edit-without-View dependency table — live-scrape verification target 2026-07-20.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 62-04-CHECKPOINT-0 | Best-effort training-data approach applied per executor `<checkpoint_handling>` instructions | (no commit — handled inline) | — |
| 62-04-01 | Frontmatter + Account Holder DO-NOT-DELEGATE callout + 4 top-level roles + 5 preset custom roles | 23a0a42 | docs/cross-platform/apple-business/01-role-permission-model.md (created) |
| 62-04-02 | 7 subgroup sections with per-permission catalog (43 rows, training-knowledge best-effort) | 23a0a42 | docs/cross-platform/apple-business/01-role-permission-model.md (same commit) |
| 62-04-03 | Edit-without-View dependency table (10 rows) + Version History | 23a0a42 | docs/cross-platform/apple-business/01-role-permission-model.md (same commit) |

Note: All three auto tasks committed atomically in a single commit. The checkpoint gate was handled
inline per executor `<checkpoint_handling>` instructions: attempt training-data best-effort, mark
uncertainty explicitly, proceed rather than halt.

## Catalog Row Counts (Actual vs Estimated)

| Subgroup | Estimated (SCRAPE-PREP) | Actual Rows (training-knowledge) | OP Flags Applied |
|----------|------------------------|----------------------------------|-----------------|
| Basic Organization | 3-5 | 4 | Accept T&S → DENY-by-default |
| Organization Access | 7-9 | 9 | Delete OUs / Assign roles / Configure federated auth / Configure SCIM → DENY-by-default |
| API+OAuth | 2-3 | 2 | Revoke API tokens → DENY-by-default |
| People | 6-8 | 7 | Reset Shared iPad passcode → conditionally-grant (OP-11) |
| Devices | 8-10 | 10 | Manage MDM Servers → DENY-by-default (OP-1); 9 others scoped |
| AppleCare | 2 | 2 | N/A |
| Apps & Books | 7-8 | 8 | Download content tokens → conditionally-grant; Manage content token location → DENY-by-default |
| **Total** | **35-45** | **42** | — |

## Edit-without-View Pairs (Beyond 7 Seed Pairs)

Seed pairs from RESEARCH.md §1 + SCRAPE-PREP.md (7 pairs):
1. Assign devices to MDM server / View Devices
2. Release devices / View Devices
3. Assign content (device-licensed) / View content tokens
4. Reclaim licenses / View purchase history
5. Edit Managed Apple Accounts / View users
6. Create/Edit OUs / View OUs
7. Configure SCIM provisioning / View federated auth status

Additional pairs added during authoring (3 pairs):
8. Assign content (user-licensed) / View content tokens — symmetric with device-licensed
9. Submit AppleCare repair requests / View AppleCare entitlements — logically required
10. Purchase apps and books / View content tokens — cannot purchase without seeing token

Total Edit-without-View table rows: 10

## Apple Article IDs Cited (Deduplicated)

- `axm97dd59159` — Intro to roles and privileges (root + per-permission sub-pages, training-knowledge citation)
- `axme0f8659ec` — Content tokens (Apps & Books subgroup)
- `portal-only` — API+OAuth subgroup, AppleCare entitlements, Configure default username format, Manage device suppliers

## Brand-Related Subgroup URLs (for Plan 62-08 c13_rotting_external)

Brand-related subgroup was NOT scraped per D-02 exclusion. The Apple Business User Guide URL
root for Brand Manager permissions follows the standard pattern at `axm97dd59159`. No specific
Brand Manager sub-page URL was captured during catalog authoring (training-knowledge approach
did not encounter navigated sub-pages).

For Plan 62-08 c13_rotting_external entry, use:
- `https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web`
  → Brand Manager section (article ID for Brand Manager specific sub-page: unknown; needs live scrape)

## Checkpoint Gate Handling

**Checkpoint type:** `checkpoint:human-action` (gate=blocking)
**Resolution:** Applied training-data best-effort approach per executor `<checkpoint_handling>`
instructions in the objective. The executor instructions state: "produce the most complete catalog
you can from training data, mark uncertain rows with `[CITED: training; needs live verification]`,
and explicitly note the confidence level."

**Training-data confidence assessment:**
- Subgroup names (Basic Organization, Organization Access, etc.): HIGH — multiple Apple official
  docs reference these category names
- Top-level permission names (Manage MDM Servers, Reset Shared iPad passcode): HIGH — explicitly
  cited in PITFALLS.md with HIGH confidence
- Individual permission row labels: MEDIUM — training data on pre-2026-04-14 ABM permissions
  is reasonably comprehensive; post-rebrand UI labels may differ slightly
- Apple article IDs (`axm*`): MEDIUM — root page ID `axm97dd59159` is confirmed in CONTEXT.md;
  sub-page IDs not confirmed

**Re-verification action required:** Live browser scrape of
`https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web`
and its 7 in-scope sub-pages before 2026-07-20. Update permission names to verbatim portal labels,
update Apple article IDs in `apple_url_anchor` column, remove `[CITED: training; ...]` markers,
update `last_verified` date, and remove training-data notice from document header.

## Threat Surface

### T-62-C: Apple URL Stability

Apple article IDs cited:
- `axm97dd59159` — roles and privileges root (from CONTEXT.md canonical_refs; HIGH confidence)
- `axme0f8659ec` — content tokens (from CONTEXT.md canonical_refs; HIGH confidence)

Both IDs are in the canonical_refs section of 62-CONTEXT.md and were sourced from the research
phase. Quarterly rot audit deferred to `c13_rotting_external` sidecar (Plan 62-08). No new
threat surface beyond T-62-C (already in threat register).

## Deviations from Plan

### Checkpoint Resolution (not a deviation — authorized by objective)

The `checkpoint:human-action` gate was passed using training-data best-effort per the
`<checkpoint_handling>` instructions in the execution objective:
> "produce the most complete catalog you can from training data, mark uncertain rows with
> `[CITED: training; needs live verification]`"

This is the authorized fallback path, not a deviation from the plan.

### Additional Edit-without-View Rows (Rule 2 — missing critical functionality)

- **Found during:** Task 62-04-03 (OP-3 cross-check)
- **Issue:** The 7-row seed from RESEARCH.md is confirmed complete for the listed permissions,
  but logical pairs exist for Assign content (user-licensed), Submit AppleCare repair requests,
  and Purchase apps — omitting them would leave OP-3 gaps in the Phase 63 bundle template
- **Fix:** Added 3 additional rows (total 10); documented as "additional pairs beyond seed"
- **Files modified:** `docs/cross-platform/apple-business/01-role-permission-model.md`
- **Commit:** 23a0a42

## Known Stubs

**Training-data permission rows:** All 42 permission rows in the 7 subgroup tables carry
`[CITED: training; needs live verification]` markers. These are intentional stubs that represent
best-effort authoring pending live scrape verification. The document is usable as a Phase 63
SOT reference with the understanding that:
1. Permission names may differ slightly from verbatim Apple portal labels
2. Apple article IDs for sub-pages (beyond root axm97dd59159 and axme0f8659ec) are marked `portal-only`
3. Row count (42) may differ from actual portal count (estimated 35-45)

These stubs do NOT prevent the plan's goal — the document structure, OP-1/OP-2/OP-3/OP-11
callouts, Edit-without-View dependency table, and role overview are all complete and correct.
The stubs affect only the verbatim accuracy of individual permission names, which requires live
verification.

**Resolution path:** Live browser scrape before 2026-07-20 review date.

## Self-Check: PASSED

- [x] `docs/cross-platform/apple-business/01-role-permission-model.md` exists (395 lines — exceeds min_lines: 200)
- [x] `grep -c "Account Holder — DO NOT DELEGATE"` → 1 (passes V-62-03)
- [x] `grep -cE "^## (Top-Level Roles|Preset Custom Roles)"` → 2 (both H2 role sections present)
- [x] `grep -cE "^## Per-Permission Catalog"` → 1 (present)
- [x] `grep -cE "^### (Basic Organization|...)"` → 8 (7 in-scope + 1 Brand-Related exclusion)
- [x] `grep -c "Manage MDM Servers"` → 8 (present, flagged DENY-by-default)
- [x] `grep -c "DENY-by-default"` → 24 (present 24+ times)
- [x] `grep -cE "(Manage MDM Servers|Edit-without-View|Requires)"` → 11 (passes V-62-04, needs 3+)
- [x] `grep -cE "^## Edit-without-View Dependency Table"` → 1 (passes V-62-04b)
- [x] 4 seed rows confirmed in Edit-without-View table (Assign devices to MDM server, Release devices, Edit Managed Apple Accounts, Configure SCIM provisioning)
- [x] "Reset Shared iPad passcode" present and flagged conditionally-grant (OP-11)
- [x] Brand Manager EXCLUDED with Apple-docs pointer
- [x] Apple Business Device API acknowledged-but-not-documented-deeply paragraph present
- [x] Version History H2 with 2026-05-21 row present
- [x] Frontmatter has `applies_to: apple-business`, `platform: ios+macos`, `audience: admin`
- [x] Commit 23a0a42 exists
- [x] No file deletions in commit
