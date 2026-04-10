---
phase: 04-l1-decision-trees
plan: "02"
subsystem: docs/decision-trees
tags: [decision-tree, triage, l1, mermaid, hub-document]
dependency_graph:
  requires: [04-01]
  provides: [docs/decision-trees/00-initial-triage.md]
  affects: [docs/decision-trees/01-esp-failure.md, docs/decision-trees/02-profile-assignment.md, docs/decision-trees/03-tpm-attestation.md]
tech_stack:
  added: []
  patterns: [hub-and-spoke-triage, mermaid-click-directives, TR-node-prefix]
key_files:
  created: [docs/decision-trees/00-initial-triage.md]
  modified: []
decisions:
  - "Triage hub opens with two-step network gate (TRD1 general internet, TRD2 login.microsoftonline.com) before any scenario routing — matches CONTEXT.md locked decisions"
  - "Deployment mode branch (TRD3) placed immediately after network gate as early classifier per CONTEXT.md"
  - "TRD5 uses six-option symptom branch routing to all 3 scenario trees plus error code lookup, OOBE crash, and don't-know escalation paths"
  - "Infrastructure escalations (TRE1, TRE2) use escalateInfra class; L2 escalations (TRE3-TRE6) use escalateL2 class — distinct orange/red visual separation"
  - "All 18 TR-prefixed node IDs are globally unique with no collision against ES/PR/TP prefixes from Plan 01"
metrics:
  duration: "2 minutes"
  completed: "2026-03-20"
  tasks_completed: 1
  files_created: 1
---

# Phase 4 Plan 02: Initial Triage Decision Tree Hub Summary

## One-Liner

Hub triage tree with two-step network gate, deployment mode branch, and click-linked routing to all 3 scenario trees (TR-prefix node IDs, 7 routing paths).

## What Was Built

`docs/decision-trees/00-initial-triage.md` — the single L1 entry point for all Autopilot troubleshooting. The file contains:

- YAML frontmatter with `last_verified: 2026-03-20`, `review_by: 2026-06-18`, `applies_to: APv1`, `audience: L1`
- Version gate banner linking to APv1 vs APv2 disambiguation
- "How to Use These Trees" section (2-3 sentences)
- APv2 note callout
- Legend table mapping Mermaid shapes and colors to their meanings
- Scenario Trees list linking to all 3 scenario files
- Mermaid `graph TD` decision tree with 18 TR-prefixed nodes implementing all 7 CONTEXT.md routing paths
- Three `click` directives routing TRA2/TRA3/TRA4 to the scenario tree files
- All three terminal classDef declarations (`resolved`, `escalateL2`, `escalateInfra`) with color-coded class assignments
- How to Check table (6 entries, nodes TRD1-TRD6)
- Escalation Data table (6 entries, TRE1-TRE6) with distinct L2 vs infrastructure collect checklists
- Resolution & Next Steps table (TRR1) with Phase 5 forward-link annotation
- Navigation section linking to all 3 scenario trees
- Version History table

## Tasks Completed

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Create initial triage decision tree hub | e68cb0f | docs/decision-trees/00-initial-triage.md |

## Decisions Made

1. **Triage network gate sequence**: TRD1 checks general internet reachability; TRD2 checks login.microsoftonline.com specifically. Failure at TRD1 routes to infrastructure (no network at all); failure at TRD2 routes to infrastructure (firewall/proxy blocking Autopilot endpoints). These are different escalation teams and different fixes.

2. **Deployment mode placement**: TRD3 (deployment mode) placed immediately after the network gate before device registration check. Mode is noted for escalation data but all paths converge at TRD4 — mode does not change the L1 routing logic, only the escalation context.

3. **Six-option TRD5 symptom branch**: Covers all 7 CONTEXT.md routing paths: ESP (TRA2), Profile (TRA3), TPM (TRA4), error code lookup (TRD6), OOBE crash (TRA5→TRE5), and don't-know (TRE6). Multi-option node with "Don't know" safe default matches CONTEXT.md decision node content rules.

4. **Error code branch (TRD6)**: Resolves at TRR1 with link to Master Error Code Index rather than a specific category file — triage cannot know which category the unknown code belongs to, so the index is the correct fallback.

5. **Node ID completeness**: 6 decision nodes (TRD1-TRD6), 5 action nodes (TRA1-TRA5), 1 resolved terminal (TRR1), 6 escalation terminals (TRE1-TRE6) = 18 unique TR-prefixed IDs covering the full triage flow.

## Deviations from Plan

None — plan executed exactly as written. The file structure, node IDs, click directives, classDef declarations, and companion tables all match the plan specification.

## Known Stubs

None. All links are functional:
- Click directives point to files that exist: `01-esp-failure.md`, `02-profile-assignment.md`, `03-tpm-attestation.md`
- Error code fallback links to `../error-codes/00-index.md` (exists)
- Forward-links to `../l1-runbooks/` and `../l2-runbooks/` are annotated with "(available after Phase 5)" and "(available after Phase 6)" respectively — intentional future references, not broken stubs

## Self-Check: PASSED

- FOUND: `docs/decision-trees/00-initial-triage.md`
- FOUND: commit `e68cb0f`
