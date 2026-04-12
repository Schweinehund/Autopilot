---
phase: 04-l1-decision-trees
plan: 01
subsystem: docs/decision-trees
tags: [decision-tree, l1, esp, profile-assignment, tpm, mermaid]
dependency_graph:
  requires:
    - docs/error-codes/03-esp-enrollment.md
    - docs/error-codes/01-mdm-enrollment.md
    - docs/error-codes/02-tpm-attestation.md
    - docs/_glossary.md
  provides:
    - docs/decision-trees/01-esp-failure.md
    - docs/decision-trees/02-profile-assignment.md
    - docs/decision-trees/03-tpm-attestation.md
  affects:
    - docs/decision-trees/00-initial-triage.md (Plan 02 will link to all three files)
tech_stack:
  added: []
  patterns:
    - Mermaid TD flowchart with classDef terminal color-coding
    - Node ID prefix convention (ES/PR/TP + D/A/R/E + number)
    - Companion tables keyed by node ID (How to Check, Escalation Data, Resolution)
    - Linear retry pattern (action -> check -> resolved or escalate)
    - Forward-links with Phase 5 and Phase 6 annotations
key_files:
  created:
    - docs/decision-trees/01-esp-failure.md
    - docs/decision-trees/02-profile-assignment.md
    - docs/decision-trees/03-tpm-attestation.md
  modified: []
decisions:
  - "ESP phase identification uses screen text only ('Setting up your device...' = device, 'Setting up for [name]...' = user) — no registry or PowerShell"
  - "Profile tree links to 01-mdm-enrollment.md in escalation data See Also column (PRE1, PRE2, PRE5) rather than as a decision-tree error lookup node — profile tree has no error code branch"
  - "TPM tree uses escalateL2 (not escalateInfra) for hardware replacement scenario (TPE2) — hardware replacement is an L2/procurement issue, not an infrastructure network issue"
  - "Duration thresholds documented as industry convention: 30 min for device phase, 60 min for user phase — flagged in How to Check table as dependent on configured ESP timeout"
metrics:
  duration: 5 minutes
  completed: 2026-03-20
  tasks: 2
  files: 3
---

# Phase 4 Plan 1: L1 Decision Trees — Scenario Trees Summary

Three scenario-specific L1 decision trees built as Mermaid TD flowcharts with ES/PR/TP node prefixes, three terminal classDefs, and companion How to Check / Escalation Data / Resolution tables for each.

## What Was Built

### Task 1: ESP Failure Decision Tree (01-esp-failure.md)

Triage tree for Enrollment Status Page failures with two primary paths:

1. **Error code path**: ESD2 branches on whether an error code is visible. If readable, ESA1 routes to the ESP error table (`../error-codes/03-esp-enrollment.md`). If not found in the table, escalates to L2.

2. **Stuck/timeout path**: ESD4 identifies the ESP phase from screen text. Device phase (30 min threshold) and user phase (60 min threshold) each have linear retry sequences: reboot -> check if ESP proceeded -> Resolved or Escalate L2.

Validation gate ESD1 routes non-ESP failures back to initial triage. All 5 escalation terminals (ESE1-ESE5) use escalateL2 class.

### Task 2: Profile Assignment and TPM Attestation Trees

**02-profile-assignment.md** — PRD1 validation gate requires device to be in Autopilot portal. Then branches on:
- Profile assigned? → No: check group membership → add to group or escalate
- Profile correct? → No or unknown: escalate L2
- Profile applied? → No: reboot and sync retry → Resolved or escalate L2
- Yes to all three: PRR3 Resolved immediately

**03-tpm-attestation.md** — TPD1 validation gate confirms pre-provisioning or self-deploying TPM failure. Then:
- TPD2: BIOS TPM enabled? → No: enable and retry provisioning (TPR1 or TPE1)
- TPD4: TPM version 2.0? → No: escalate L2 hardware (TPE2)
- TPD5: Error code visible? → Yes: look up in TPM error table; No: power off/retry (TPR3 or TPE4)

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written.

### Implementation Notes

1. **Profile tree link to 01-mdm-enrollment.md**: The plan's `key_links` frontmatter required a link from the profile tree to `../error-codes/01-mdm-enrollment.md`. The profile tree branch logic has no error code lookup node (unlike ESP and TPM trees), so the link was placed in the Escalation Data table See Also column for PRE1, PRE2, and PRE5 — the escalation scenarios most likely to involve MDM enrollment error codes.

2. **ESR0 and TPR0 and PRR0 return terminals**: Return-to-triage terminal nodes are classed as `resolved` (green) since they represent correct routing rather than an error state. This keeps the diagram unambiguous — the triage hub will have its own styling.

## Known Stubs

None — all files are complete standalone documents. Forward-links to `../l1-runbooks/` (Phase 5) and `../l2-runbooks/` (Phase 6) are annotated with "(available after Phase 5/6)" per the established pattern and are not stubs.

## Self-Check: PASSED

Files confirmed to exist:
- docs/decision-trees/01-esp-failure.md — FOUND
- docs/decision-trees/02-profile-assignment.md — FOUND
- docs/decision-trees/03-tpm-attestation.md — FOUND

Commits confirmed:
- a79efd5: feat(04-01): create ESP failure L1 decision tree
- 773dfa8: feat(04-01): create Profile assignment and TPM attestation L1 decision trees
