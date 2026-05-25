---
phase: 62
plan: 62-05
subsystem: apple-business-docs
tags: [ous-architecture, concept-doc, ab-04, delegation-primitive, locations-migration]
requires: [62-01, 62-02, 62-03]
provides: [AB-04-ous-concept-doc]
affects: [phase-63-ous-vs-custom-roles, phase-64-mdm-server-reassign]
tech-stack:
  added: []
  patterns: [concept-doc-with-platform-blockquote, 5-row-scoping-table, forward-ref-pattern]
key-files:
  created:
    - docs/cross-platform/apple-business/02-ous-architecture.md
  modified: []
decisions:
  - "Flat-by-default OU hierarchy documented; max nesting depth deferred to Phase 63 portal verification"
  - "Most-permissive-wins overlapping assignment callout added for Phase 63 OU-01 use"
  - "T-62-C Apple article axme0f8659ec cited in Content tokens row; tracked in c13_rotting_external"
metrics:
  duration: 129s
  completed: 2026-05-21
  tasks_completed: 2
  files_created: 1
---

# Phase 62 Plan 05: OUs Architecture Concept Doc Summary

## One-liner

OUs concept doc with flat-by-default hierarchy rules, most-permissive-wins callout, automatic Locations→OUs migration framing, and 5-resource + audit-log OU scoping table (AB-04).

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 62-05-01 | Create 02-ous-architecture.md (frontmatter + blockquote + H1 + Hierarchy Rules + Locations→OUs) | 74060b7 | docs/cross-platform/apple-business/02-ous-architecture.md |
| 62-05-02 | Append OU Scope Coverage table (5+1 rows) + Cross-References + Version History | 74060b7 | docs/cross-platform/apple-business/02-ous-architecture.md |

Both tasks committed atomically in a single commit (74060b7) since the entire file was authored in one pass.

## Deliverable Detail

### `docs/cross-platform/apple-business/02-ous-architecture.md`

**Line count:** 147 (within 80–150 target)

**Sections delivered:**

1. **Frontmatter** — `last_verified: 2026-05-21`, `review_by: 2026-07-20`, `applies_to: apple-business`, `audience: admin`, `platform: ios+macos`

2. **Platform-applicability blockquote** — Verbatim from plan interfaces: Apple Business OUs are the Apple-side delegation primitive; no direct Intune-side analog; Intune scope tags are the closest Microsoft-side concept.

3. **H1: Organizational Units (OUs) Architecture** — Intro defines OU as the delegation primitive that replaced ABM "Locations" effective 2026-04-14; cross-links to glossary rebrand-mapping table at `#rebrand-mapping-table`.

4. **H2: Hierarchy Rules** — Four numbered rules:
   - Flat-by-default (single tier)
   - Optional sub-OUs (depth=2; legacy ABM precedent)
   - Deferred verification — max nesting depth (Phase 63 portal verification; treat as flat-by-default with optional one-level sub-OUs for v1.6)
   - Most-permissive wins across overlapping assignments (forward-ref to Phase 63 `03-ous-vs-custom-roles.md`)
   - Note: Apple does not publish a maximum OU count per tenant

5. **H2: Locations to OUs Migration Framing** — Three sub-sections:
   - Conceptual continuity (same delegation primitive role; terminology-only change)
   - Automatic tenant migration on 2026-04-14 (all 5 resource types transferred automatically; no admin intervention required)
   - Untouched-OU trap (OP-9 forward-ref to Phase 63 VPP catalog consolidation runbook; not duplicated here)

6. **H2: OU Scope Coverage** — 6-row table:
   | Resource | OU-scoped? |
   |----------|-----------|
   | Devices | Yes |
   | Content tokens | Yes (Apple article `axme0f8659ec`; T-62-C) |
   | MDM servers | Yes |
   | Managed Apple Accounts | Yes |
   | Role assignments | Yes |
   | Audit logs | Partial |

7. **H2: Cross-References** — Links to:
   - `_glossary-apple-business.md#organizational-unit` (clean H3 slug per D-04)
   - `_glossary-apple-business.md#ou-scope`
   - `_glossary-apple-business.md#sub-ou`
   - `_glossary-apple-business.md#rebrand-mapping-table`
   - `01-role-permission-model.md` (OP-3 Edit-without-View pair)
   - `_admin-directory.md` (per-OU admin holder lookup)
   - Forward refs: `03-ous-vs-custom-roles.md` (Phase 63), `15-mdm-server-reassign-runbook.md` (Phase 64), `17-audit-log-scoping-runbook.md` (Phase 64), `18-cross-org-boundary-cheat-sheet.md` (Phase 64)

8. **H2: Version History** — Single row: 2026-05-21, Phase 62 AB-04

## Forward References Documented (for Plan 62-08 sidecar exemption tracking)

The following forward-reference paths from `docs/cross-platform/apple-business/02-ous-architecture.md` point to files that do not yet exist. Per the plan's forward-link contract, Plan 62-08's `check-phase-62.mjs` will NOT enforce link existence for these (they are exempted per the same pattern as `c16_missing_endpoint_exemptions`):

| Forward-ref path | Target phase | Deliverable ID |
|-----------------|-------------|----------------|
| `03-ous-vs-custom-roles.md` | Phase 63 | OU-01 / delegation topology decision matrix |
| `15-mdm-server-reassign-runbook.md` | Phase 64 | MDM server OU reassignment runbook |
| `17-audit-log-scoping-runbook.md` | Phase 64 | 3×3 audit log visibility matrix |
| `18-cross-org-boundary-cheat-sheet.md` | Phase 64 | Apple-Business-vs-Intune surface disambiguation |
| `05-vpp-catalog-consolidation` | Phase 63 | Untouched-OU / OP-9 hard-bordered callout |

## Scoping Table Row List (for Plan 62-08 check-phase-62.mjs assertions)

Exact row patterns matched by plan verification regex `^\| (Devices|Content tokens|MDM servers|Managed Apple Accounts|Role assignments|Audit logs) \|`:

1. `| Devices | Yes | ...`
2. `| Content tokens | Yes | ...`
3. `| MDM servers | Yes | ...`
4. `| Managed Apple Accounts | Yes | ...`
5. `| Role assignments | Yes | ...`
6. `| Audit logs | Partial | ...`

## D-A3 Invariant Check

Zero modifications to `docs/reference/ios-capability-matrix.md`, `docs/reference/macos-capability-matrix.md`, or `docs/reference/4-platform-capability-comparison.md`. D-A3 invariant honored.

## Threat Flags

| Flag | File | Description |
|------|------|-------------|
| T-62-C | docs/cross-platform/apple-business/02-ous-architecture.md | Apple article `axme0f8659ec` cited in Content tokens row; URL rot tracked in `c13_rotting_external` (Plan 62-08) |

## Deviations from Plan

None — plan executed exactly as written. Both tasks authored in a single file creation pass and committed atomically. The plan permitted this since Task 62-05-02 is purely additive content to the same file.

## Self-Check: PASSED

- [x] `docs/cross-platform/apple-business/02-ous-architecture.md` exists
- [x] Commit 74060b7 exists in git log
- [x] H1 "Organizational Units" present (grep count: 1)
- [x] H2 "Hierarchy Rules" present
- [x] H2 "Locations" (→ "Locations to OUs Migration Framing") present
- [x] H2 "OU Scope Coverage" present (grep count: 1)
- [x] All 6 scoping table rows present (grep count: 6)
- [x] `_glossary-apple-business.md#organizational-unit` cross-link present (grep count: 2)
- [x] Apple article `axme0f8659ec` cited (T-62-C compliance)
- [x] 147 lines (within 80–150 target)
- [x] Zero modifications to capability matrices (D-A3 invariant honored)
