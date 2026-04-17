---
phase: 30-ios-l1-triage-runbooks
plan: "02"
subsystem: docs/decision-trees
tags: [ios, triage, decision-tree, l1, mermaid]
dependency_graph:
  requires: []
  provides:
    - docs/decision-trees/07-ios-triage.md
  affects:
    - docs/l1-runbooks/16-21 (back-link targets established)
tech_stack:
  added: []
  patterns:
    - Mermaid graph TD decision tree (IOS node prefix)
    - Hybrid 2-axis root visibility gate + symptom fork (D-01)
    - Structural mirror of 06-macos-triage.md (D-02)
key_files:
  created:
    - docs/decision-trees/07-ios-triage.md
  modified: []
decisions:
  - "Used PLAN interfaces Mermaid ordering for IOS2 branches (Fleetwide first) vs RESEARCH.md order (License first) — PLAN is authoritative for final artifact"
  - "Related Resources: 7 links matching PLAN interfaces spec exactly (L2 runbooks entry uses Phase 31 placeholder suffix per D-31)"
  - "Routing Verification table has 9 rows enumerating all terminals including the implicit 'Other/unclear on No-branch' (IOSE1) split out for completeness"
metrics:
  duration_minutes: 10
  completed_date: "2026-04-17"
  tasks_completed: 1
  tasks_total: 1
  files_created: 1
  files_modified: 0
---

# Phase 30 Plan 02: iOS Triage Decision Tree Summary

**One-liner:** iOS/iPadOS triage decision tree with hybrid 2-axis Mermaid graph (IOS1 visibility gate → IOS2/IOS3 symptom forks), routing L1 to 6 runbooks or L2 escalation within 2 steps.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create 07-ios-triage.md with full structure | 3892417 | docs/decision-trees/07-ios-triage.md (created, 105 lines) |

## File Metrics

- **Total line count:** 105 lines (within 90-140 target)
- **Frontmatter:** 7 lines (all 5 required fields: last_verified, review_by, applies_to, audience, platform)
- **Mermaid block:** 1 block, 3 decision-diamond nodes (IOS1/IOS2/IOS3), 9 terminal nodes (IOSR1-IOSR6 + IOSE1-IOSE3), 6 click directives

## Sections: Cloned vs Rewritten

| Section | Source | Action |
|---------|--------|--------|
| Frontmatter | 06-macos-triage.md lines 1-7 | Adapted: dates +3 days, applies_to `all`, platform `iOS` |
| Platform gate banner | 06-macos-triage.md line 9 | Rewritten: iOS wording + reciprocal macOS cross-link added |
| H1 + intro | 06-macos-triage.md lines 11-15 | Rewritten: iOS/iPadOS platform, 2 steps (not 3) |
| How to Use This Tree | 06-macos-triage.md lines 13-17 | Adapted: D-03 no-network-gate rationale updated for iOS ADE + BYOD paths |
| Legend table | 06-macos-triage.md lines 21-25 | Copied verbatim |
| Decision Tree (Mermaid) | PLAN interfaces block (from RESEARCH.md §5) | Rewritten: IOS* nodes, iOS symptom text, iOS runbook paths 16-21 |
| Routing Verification | RESEARCH.md §5 | Adapted: 9 rows (vs macOS 7), IOS1 wording, iOS runbook destinations |
| How to Check | RESEARCH.md §5 | Rewritten: IOS1/IOS2/IOS3 questions, iOS portal paths, iOS error strings |
| Escalation Data | RESEARCH.md §5 | Rewritten: 2 rows (Other/unclear + Profile/config/app Phase 31) |
| Related Resources | PLAN interfaces block | Rewritten: 7 iOS-specific links (macOS had 5) |
| Version History | 06-macos-triage.md lines 93-97 | Adapted: date 2026-04-17 |

## Mermaid Fidelity vs 30-RESEARCH.md Section 5

The PLAN's `<interfaces>` block and RESEARCH.md §5 contain slightly different branch orderings for IOS2 (PLAN: Fleetwide first; RESEARCH.md: License first). The PLAN's interfaces block is the authoritative specification and was used. The behavioral outcome is identical — all 6 branches and error-string labels are present.

**No other deviations from specified Mermaid text.** All node IDs, edge labels, click directives, classDef colors, and class assignments match the specification exactly.

## Click Target Verification (D-21 Filename Convention)

| Node | Click Target | D-21 Filename |
|------|-------------|---------------|
| IOSR1 | `../l1-runbooks/16-ios-apns-expired.md` | 16-ios-apns-expired.md |
| IOSR2 | `../l1-runbooks/17-ios-ade-not-starting.md` | 17-ios-ade-not-starting.md |
| IOSR3 | `../l1-runbooks/18-ios-enrollment-restriction-blocking.md` | 18-ios-enrollment-restriction-blocking.md |
| IOSR4 | `../l1-runbooks/19-ios-license-invalid.md` | 19-ios-license-invalid.md |
| IOSR5 | `../l1-runbooks/20-ios-device-cap-reached.md` | 20-ios-device-cap-reached.md |
| IOSR6 | `../l1-runbooks/21-ios-compliance-blocked.md` | 21-ios-compliance-blocked.md |

All 6 click targets use D-21 filenames exactly.

## Deviations from Plan

None — plan executed exactly as written. The minor IOS2 branch ordering difference between PLAN interfaces and RESEARCH.md §5 was resolved by using the PLAN's interfaces block as authoritative, which is correct by definition.

## Threat Flags

None. The file contains no real tenant IDs, device serials, or UPNs. All How-to-Check and Escalation Data rows use placeholder-style references (Settings > General > About, UPN, etc.) per T-30-02-01 mitigation. Click directives use relative paths matching D-21 convention per T-30-02-02 mitigation.

## Known Stubs

None. The triage tree has no data sources to wire — all content is static documentation. The iOS L2 Runbooks link in Related Resources intentionally points to `../l2-runbooks/00-index.md` with a Phase 31 placeholder note; this is an intentional documented forward-reference, not a stub.

## Success Criteria Verification

- [x] File `docs/decision-trees/07-ios-triage.md` exists (105 lines)
- [x] Frontmatter fields: last_verified 2026-04-17, review_by 2026-07-16, applies_to all, audience L1, platform iOS
- [x] Platform gate banner on line 9 (first body line after frontmatter)
- [x] Exactly 3 decision-diamond nodes (IOS1, IOS2, IOS3) — satisfies SC #1 5-node budget (uses 2 steps max)
- [x] Exactly 6 click directives linking IOSR1-IOSR6 to runbook files 16-21
- [x] Routing Verification table enumerates all 9 terminals (6 resolved + 3 escalate)
- [x] How to Check table has 3 rows matching IOS1/IOS2/IOS3 questions
- [x] Escalation Data table has 2 rows (Other/unclear + Profile/config/app)
- [x] Related Resources has 7 bulleted links including iOS L2 Phase 31 placeholder
- [x] Version History has 1 row with date 2026-04-17
- [x] No macOS/MAC*/APv1/APv2/TRD* leakage (grep confirmed zero matches)
- [x] macOS appears only in platform gate banner (line 9) and Related Resources (line 98)

## Self-Check: PASSED

- docs/decision-trees/07-ios-triage.md: FOUND (105 lines)
- Commit 3892417: FOUND
- All 8 required H2 sections present
- 0 legacy node ID leakage
- 6/6 click directives point to D-21 filenames
