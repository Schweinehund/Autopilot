---
phase: 05-l1-runbooks
plan: 03
subsystem: docs/l1-runbooks, docs/decision-trees
tags: [l1-runbooks, decision-trees, index, forward-links]
dependency_graph:
  requires: [05-01, 05-02]
  provides: [l1-runbook-index, resolved-decision-tree-links]
  affects: [docs/decision-trees/00-initial-triage.md, docs/decision-trees/01-esp-failure.md, docs/decision-trees/02-profile-assignment.md, docs/decision-trees/03-tpm-attestation.md]
tech_stack:
  added: []
  patterns: [runbook-index-pattern, decision-tree-deep-link-pattern]
key_files:
  created:
    - docs/l1-runbooks/00-index.md
  modified:
    - docs/decision-trees/00-initial-triage.md
    - docs/decision-trees/01-esp-failure.md
    - docs/decision-trees/02-profile-assignment.md
    - docs/decision-trees/03-tpm-attestation.md
decisions:
  - "[Phase 05-l1-runbooks]: Index uses table format with When-to-Use column as primary navigation aid for L1 agents"
  - "[Phase 05-l1-runbooks]: TPM tree terminals redirect to index with explicit L2 escalation guidance — no dedicated L1 TPM runbook"
  - "[Phase 05-l1-runbooks]: ESP tree uses anchor deep-links (#error-code-steps, #device-phase-steps, #user-phase-steps) per D-08"
metrics:
  duration: 5 minutes
  completed_date: 2026-03-20
  tasks_completed: 1
  files_modified: 5
---

# Phase 05 Plan 03: L1 Runbook Index and Decision Tree Forward-Link Resolution Summary

L1 runbook index created at `docs/l1-runbooks/00-index.md` listing all five runbooks, and all 12 "(available after Phase 5)" placeholders replaced with actual file paths and anchor deep-links across the four Phase 4 decision tree files.

## What Was Built

### New File: `docs/l1-runbooks/00-index.md`

Landing page for the L1 runbooks directory. Contains:
- YAML frontmatter with `last_verified: 2026-03-20`, `audience: L1`, `applies_to: APv1`
- Version gate banner
- Intro paragraph with link to Initial Triage Decision Tree
- Runbook table with all five runbooks and one-line "When to Use" descriptions
- Scope section (APv1 only)
- TPM Attestation Note explaining no dedicated L1 TPM runbook exists and pointing to L2
- Related Resources section linking all relevant decision trees and the error code index

### Updated: Four Decision Tree Files

All 12 "(available after Phase 5)" placeholders resolved:

| File | Rows Updated | Link Target |
|------|-------------|-------------|
| `00-initial-triage.md` | TRR1 | `l1-runbooks/00-index.md` |
| `01-esp-failure.md` | ESR1–ESR5 | `l1-runbooks/02-esp-stuck-or-failed.md` with anchors |
| `02-profile-assignment.md` | PRR1–PRR3 | `l1-runbooks/03-profile-not-assigned.md` |
| `03-tpm-attestation.md` | TPR1–TPR3 | `l1-runbooks/00-index.md` with L2 escalation note |

ESP tree uses anchor deep-links:
- ESR1 → `#error-code-steps`
- ESR2, ESR5 → `#device-phase-steps`
- ESR3, ESR4 → `#user-phase-steps`

## Decisions Made

- Index uses a table with "When to Use" column rather than a bulleted list — provides at-a-glance routing for L1 agents who may not know the exact scenario name
- TPM tree terminals (TPR1–TPR3) redirect to the index with explicit "escalate to L2" guidance rather than a dedicated TPM runbook, consistent with the RESEARCH.md finding that all non-trivial TPM scenarios are L2 by design
- All four decision tree files changed only in the specific Resolution table cells containing the placeholder text — no other content modified

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Prerequisite runbook files 04 and 05 did not exist**

- **Found during:** Task 1 (pre-read phase)
- **Issue:** Plans 05-01 and 05-02 (wave 1) had not been executed, so `04-network-connectivity.md` and `05-oobe-failure.md` were missing. All five runbooks must exist before the index can list them. Files 01, 02, and 03 were already created by a prior partial execution.
- **Fix:** Created `04-network-connectivity.md` and `05-oobe-failure.md` per the specifications in their respective plans (05-01 and 05-02). Both files follow the l1-template.md skeleton exactly.
- **Files modified:** `docs/l1-runbooks/04-network-connectivity.md` (created), `docs/l1-runbooks/05-oobe-failure.md` (created)
- **Note:** These files were committed as part of task 1 since they are prerequisites for the index content.

## Known Stubs

None — all runbook links in the index resolve to actual files that exist on disk.

## Self-Check: PASSED

- docs/l1-runbooks/00-index.md — FOUND
- docs/decision-trees/00-initial-triage.md — FOUND
- docs/decision-trees/01-esp-failure.md — FOUND
- docs/decision-trees/02-profile-assignment.md — FOUND
- docs/decision-trees/03-tpm-attestation.md — FOUND
- Commit 31ffc0d — FOUND
