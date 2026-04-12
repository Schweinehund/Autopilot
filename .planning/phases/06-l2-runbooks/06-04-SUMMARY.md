---
phase: 06-l2-runbooks
plan: 04
subsystem: docs
tags: [forward-links, integration, error-codes, decision-trees, l1-runbooks, lifecycle]
dependency_graph:
  requires: [06-02, 06-03]
  provides: [resolved-forward-links, complete-doc-graph]
  affects: [docs/error-codes, docs/decision-trees, docs/l1-runbooks, docs/lifecycle]
tech_stack:
  added: []
  patterns: [forward-link-resolution, doc-graph-integration]
key_files:
  modified:
    - docs/error-codes/01-mdm-enrollment.md
    - docs/error-codes/02-tpm-attestation.md
    - docs/error-codes/03-esp-enrollment.md
    - docs/error-codes/04-pre-provisioning.md
    - docs/error-codes/05-hybrid-join.md
    - docs/decision-trees/00-initial-triage.md
    - docs/decision-trees/01-esp-failure.md
    - docs/decision-trees/02-profile-assignment.md
    - docs/decision-trees/03-tpm-attestation.md
    - docs/l1-runbooks/00-index.md
    - docs/l1-runbooks/01-device-not-registered.md
    - docs/l1-runbooks/02-esp-stuck-or-failed.md
    - docs/l1-runbooks/03-profile-not-assigned.md
    - docs/l1-runbooks/05-oobe-failure.md
    - docs/lifecycle/02-profile-assignment.md
    - docs/lifecycle/03-oobe.md
    - docs/lifecycle/04-esp.md
    - docs/lifecycle/05-post-enrollment.md
decisions:
  - "[Phase 06-l2-runbooks]: All forward-link placeholders resolved to specific L2 runbook file paths with correct numeric prefixes; no bare l2-runbooks/ links remain"
  - "[Phase 06-l2-runbooks]: MDM enrollment forward-link routes to 00-index.md since no dedicated MDM enrollment L2 runbook exists in Phase 6"
  - "[Phase 06-l2-runbooks]: lifecycle forward-link lines (formerly (available after Phase N)) updated to wire actual links while preserving surrounding prose context"
metrics:
  duration: 5min
  completed: 2026-03-21
  tasks_completed: 2
  files_modified: 18
---

# Phase 06 Plan 04: Forward-Link Resolution Summary

Resolved all "(available after Phase 6)" forward-link placeholders across 18 upstream documentation files. This is the integration task that completes the documentation graph — Phases 2-5 placed forward-link annotations throughout error code tables, decision trees, L1 runbooks, and lifecycle guides; now that all L2 runbook files exist, every placeholder is updated to an actual file path.

## What Was Built

All forward-link placeholders in upstream docs resolved to actual L2 runbook paths with correct numeric prefixes. Zero remaining "(available after Phase 6)" annotations in any docs/ file. The documentation cross-reference graph is now complete.

## Tasks Completed

### Task 1: Resolve forward-links in error code files (commit 606be51)

- `01-mdm-enrollment.md`: Two `(../l2-runbooks/mdm-enrollment.md) (available after Phase 6)` links replaced with `../l2-runbooks/00-index.md` (no dedicated MDM enrollment L2 runbook in Phase 6 — index is the correct target)
- `02-tpm-attestation.md`: Six `../l2-runbooks/tpm-attestation.md (available after Phase 6)` links replaced with `../l2-runbooks/03-tpm-attestation.md`; prose reference in Hardware-Specific Known Issues section also updated
- `03-esp-enrollment.md`: Two `../l2-runbooks/esp-deep-dive.md (available after Phase 6)` links replaced with `../l2-runbooks/02-esp-deep-dive.md`
- `04-pre-provisioning.md`: One `../l2-runbooks/esp-deep-dive.md (available after Phase 6)` link replaced with `../l2-runbooks/02-esp-deep-dive.md`
- `05-hybrid-join.md`: One `../l2-runbooks/hybrid-join.md (available after Phase 6)` link replaced with `../l2-runbooks/04-hybrid-join.md`

### Task 2: Resolve forward-links in decision trees, L1 runbooks, and lifecycle files (commit 32bd541)

**Decision trees (bare `../l2-runbooks/` bare links resolved):**
- `00-initial-triage.md`: TRE3-TRE6 (4 links) → `../l2-runbooks/00-index.md`
- `01-esp-failure.md`: ESE1-ESE5 (5 links) → `../l2-runbooks/02-esp-deep-dive.md`
- `02-profile-assignment.md`: PRE1-PRE6 (6 links) → `../l2-runbooks/00-index.md` (no dedicated L2 profile runbook)
- `03-tpm-attestation.md`: TPE1-TPE5 (5 links) → `../l2-runbooks/03-tpm-attestation.md`

**L1 runbooks:**
- `00-index.md`: TPM Note link → `../l2-runbooks/00-index.md`
- `01-device-not-registered.md`: escalation link → `../l2-runbooks/00-index.md`
- `02-esp-stuck-or-failed.md`: forward-link → `../l2-runbooks/02-esp-deep-dive.md`
- `03-profile-not-assigned.md`: escalation link → `../l2-runbooks/00-index.md`
- `05-oobe-failure.md`: forward-link → `../l2-runbooks/00-index.md`

**Lifecycle files:**
- `02-profile-assignment.md`: Hybrid join deep-dive placeholder → `../l2-runbooks/04-hybrid-join.md`
- `03-oobe.md`: Hybrid join deep-dive placeholder → `../l2-runbooks/04-hybrid-join.md`
- `04-esp.md`: Forward-links line wired to actual files; `Restart-EnrollmentStatusPage` "available after Phase 6" → `../l2-runbooks/02-esp-deep-dive.md`
- `05-post-enrollment.md`: Forward-links line wired to `../l2-runbooks/00-index.md`

## Verification Results

```
Remaining Phase 6 placeholders in docs/: 0
All referenced L2 runbook files: FOUND
  - docs/l2-runbooks/00-index.md
  - docs/l2-runbooks/02-esp-deep-dive.md
  - docs/l2-runbooks/03-tpm-attestation.md
  - docs/l2-runbooks/04-hybrid-join.md
```

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing critical functionality] Updated prose reference in 02-tpm-attestation.md Hardware-Specific section**
- **Found during:** Task 1
- **Issue:** The prose paragraph introducing the Hardware-Specific Known Issues section referred to "the Phase 6 L2 TPM runbook" without a hyperlink
- **Fix:** Updated to `[L2 TPM runbook](../l2-runbooks/03-tpm-attestation.md)` with actual link
- **Files modified:** docs/error-codes/02-tpm-attestation.md
- **Commit:** 606be51

**2. [Rule 2 - Missing critical functionality] Wired lifecycle forward-link lines in 04-esp.md and 05-post-enrollment.md to specific files**
- **Found during:** Task 2
- **Issue:** Lifecycle files used a "see Phase N" forward-link line pattern that referenced error codes and L1 runbooks with bare directory links in addition to the Phase 6 reference
- **Fix:** Resolved all three phases in each forward-links line simultaneously (Phase 3 error codes, Phase 5 L1 runbooks, Phase 6 L2 runbooks) to specific file paths while preserving the readable forward-link line format
- **Files modified:** docs/lifecycle/04-esp.md, docs/lifecycle/05-post-enrollment.md
- **Commit:** 32bd541

## Known Stubs

None — all forward-link placeholders are fully resolved to actual file paths. No stubs remain in the files modified by this plan.

## Self-Check: PASSED

- 18 files modified across both tasks
- Zero "(available after Phase 6)" annotations remaining in any docs/ file
- All L2 runbook link targets confirmed present on disk
- Commits 606be51 and 32bd541 confirmed in git log
