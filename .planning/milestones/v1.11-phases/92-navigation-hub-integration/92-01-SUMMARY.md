---
phase: 92-navigation-hub-integration
plan: "01"
subsystem: documentation-navigation
tags: [navigation, macos, mdm-migration, psso, documentation, nav-last]
dependency_graph:
  requires: [89-01, 90-01, 90-02, 91-01, 91-02, 91-03]
  provides: [NAV-01]
  affects: [docs/index.md, docs/common-issues.md, docs/quick-ref-l2.md, docs/decision-trees/06-macos-triage.md]
tech_stack:
  added: []
  patterns: [link-not-copy, navigation-last, single-atomic-commit, anchor-cross-reference]
key_files:
  modified:
    - docs/index.md
    - docs/common-issues.md
    - docs/quick-ref-l2.md
    - docs/decision-trees/06-macos-triage.md
decisions:
  - "D-01: 01+02 walkthrough rows added to both L1 and L2 macOS tables; #30 added to L2 table only; Admin Setup unchanged"
  - "D-02: Two new ### symptom subsections appended after Kerberos block inside macOS section; verbatim L1 escalate line reused"
  - "D-03: Link-not-copy for existing app-sso/profiles commands; only two net-new commands in bash block"
  - "D-04: MACE3 leaf off MAC3 with migration-prompt label; MAC1 exception clause for deadline-lockout routing (sleeper flaw 4.2 fix)"
  - "D-05: Single atomic commit after content-existence + anchor-resolution verification"
metrics:
  duration: "4m 42s"
  completed: "2026-06-25"
  tasks_completed: 5
  files_modified: 4
---

# Phase 92 Plan 01: Navigation Hub Integration Summary

**One-liner:** Single-commit navigation wiring of PSSO provisioning walkthrough (01), MDM migration walkthrough (02), and L2 runbook #30 into all four top-level hub files with mandatory MAC1 deadline-lockout routing fix (sleeper flaw 4.2) and link-not-copy cross-references throughout.

## What Was Built

Wired three already-committed v1.11 content files into four navigation hub files so every new macOS migration surface is reachable from every applicable hub. Delivered as a single atomic commit (`dbced8a`) after D-05 pre-commit verification confirmed all content files exist at HEAD and all link paths/anchors resolve.

### docs/index.md (D-01)

- Added `macOS PSSO Provisioning Walkthrough` row (→ 01) to both Service Desk (L1) and Desktop Engineering (L2) macOS tables
- Added `macOS MDM Migration Walkthrough (Kandji/Iru → Intune)` row (→ 02) to both L1 and L2 tables
- Added `macOS MDM Migration Failure Runbook` row (→ #30) to L2 table only, with "When to Use" cell naming all three tracks (A: deadline lockout, B: profile-not-delivered, C: PSSO re-registration stuck)
- Admin Setup table left unchanged per D-01; existing `00-ade-lifecycle.md` rows byte-unchanged (anti-rename)

### docs/common-issues.md (D-02)

- Added `### MDM Migration Failure (Kandji/Iru → Intune)` symptom block after the Kerberos section (inside `## macOS ADE Failure Scenarios`), with full-screen deadline-lockout symptom description, verbatim `No L1 runbook — escalate to L2` line, and L2 #30 link
- Added `### Platform SSO Re-Registration Failure (Post-Migration)` block with two `**L2:**` bullets linking to L2 #27 and L2 #30 (Track C qualifier); states PSSO re-registration is always required; no same-tenant key-survival assertion

### docs/quick-ref-l2.md (D-03)

- Added `#### MDM Migration Diagnostics` block (sibling to existing `####` blocks) before `### macOS Investigation Runbooks`; bash fence contains only the two net-new commands (`ls /Library/Kandji/` and `sw_vers -productVersion`); cross-references `profiles status -type enrollment` and `app-sso platform -s` by anchor only (link-not-copy)
- Appended `macOS MDM Migration Failure` runbook bullet (→ #30) with Track A/B/C note

### docs/decision-trees/06-macos-triage.md (D-04 + sleeper flaw 4.2 fix)

Six sub-edits applied atomically:
- A: `MAC3 -->|"MDM migration / non-dismissible migration prompt"| MACE3(["Escalate to L2: MDM Migration Failure"])` node added after last MACSSO arm
- B: `click MACE3 "../l2-runbooks/30-macos-mdm-migration-failure.md"` directive added
- C: `class MACE1,MACE2,MACE3 escalateL2` amended (MACE3 renders red)
- D: MAC1 "How to Check" cell appended with exception clause routing deadline-lockout devices as MAC1 = Yes → MACE3 (not MAC2) — mandatory fix for confirmed sleeper flaw 4.2
- E: Routing Verification table row added for MDM migration deadline prompt path
- F: Version History row added (2026-06-25, Phase 92, NAV-01)

3-edge invariant preserved: MAC1 → MAC3 → MACE3 = 2 edges from root.

## Commit

| Hash | Message | Files |
|------|---------|-------|
| `dbced8a` | `docs(phase-92): nav-hub integration — wire 01/02/30 into index/common-issues/quick-ref/triage (NAV-01)` | docs/index.md, docs/common-issues.md, docs/quick-ref-l2.md, docs/decision-trees/06-macos-triage.md |

## Deviations from Plan

None — plan executed exactly as written. All five locked decisions (D-01 through D-05) implemented per specification. The D-05 single-atomic-commit shape was honored: Tasks 1-4 made edits without committing; Task 5 ran verification then made one commit touching exactly the 4 hub files.

**Note on Task 3 verification:** The `grep -c "app-sso platform -s"` returned 3 rather than the expected 1 (the verification script in the plan expected 1). The 3 occurrences are: (1) the original code block at line 185, (2) the new backtick inline cross-reference in the migration-diagnostics list bullet, and (3) the existing Version History entry at line 404. The acceptance criterion is satisfied: `app-sso platform -s` was NOT duplicated into a new bash code block — the new block cross-references it by anchor per the link-not-copy requirement. The version history entry was pre-existing.

## Known Stubs

None. All four hub file edits contain real content linking to confirmed-existing target files. No placeholder text, no hardcoded empty values, no mock data.

## Threat Flags

No new trust-boundary surface introduced. All edits are static internal Markdown cross-reference links. T-92-01 (dead link / dangling anchor) was fully mitigated by D-05 pre-commit verification (all targets confirmed at HEAD; all paths and anchors confirmed to resolve before commit).

## Self-Check: PASSED

- docs/index.md: modified and committed (dbced8a) ✓
- docs/common-issues.md: modified and committed (dbced8a) ✓
- docs/quick-ref-l2.md: modified and committed (dbced8a) ✓
- docs/decision-trees/06-macos-triage.md: modified and committed (dbced8a) ✓
- Content files 01/02/#30/#27 confirmed at HEAD before commit ✓
- `git show --stat HEAD` shows exactly 4 hub files (4 files changed, 44 insertions, 2 deletions) ✓
- No content file, validator, or blob-pin file included in commit ✓
