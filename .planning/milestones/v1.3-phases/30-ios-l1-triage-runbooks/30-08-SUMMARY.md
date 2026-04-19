---
phase: 30-ios-l1-triage-runbooks
plan: "08"
subsystem: docs/navigation
tags: [ios, navigation, decision-tree, l1-runbooks, wave-3]
dependency_graph:
  requires: [30-02, 30-03, 30-04, 30-05, 30-06, 30-07]
  provides: [ios-navigation-entry-points]
  affects: [docs/decision-trees/00-initial-triage.md, docs/l1-runbooks/00-index.md]
tech_stack:
  added: []
  patterns: [surgical-markdown-edit, additive-nav-integration]
key_files:
  modified:
    - docs/decision-trees/00-initial-triage.md
    - docs/l1-runbooks/00-index.md
decisions:
  - "Added MAM-WE advisory note to 00-index.md (optional per Claude's discretion) — fits naturally between iOS section and Scope, mirrors TPM Attestation Note pattern"
  - "macOS parity See Also entry added alongside iOS entry in 00-initial-triage.md — macOS banner has existed since 2026-04-14 but never had a See Also entry; closing parity gap is consistent with plan intent"
metrics:
  duration: "~10 minutes"
  completed: "2026-04-17"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 2
---

# Phase 30 Plan 08: Navigation Integration Summary

iOS/iPadOS navigation entry points surgically added to both shared navigation files — banner in initial-triage and full iOS L1 Runbooks section in the index, with zero modifications to the Mermaid decision tree (D-05 enforced).

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add iOS banner and navigation refs to 00-initial-triage.md | 3d21436 | docs/decision-trees/00-initial-triage.md |
| 2 | Add iOS L1 Runbooks section to 00-index.md | 90ea48e | docs/l1-runbooks/00-index.md |

## Insertion Points — docs/decision-trees/00-initial-triage.md (5 total)

1. **Frontmatter bump** — `last_verified: 2026-04-13` → `2026-04-17`; `review_by: 2026-07-12` → `2026-07-16`
2. **iOS banner (line 10)** — `> **iOS/iPadOS:** For iOS/iPadOS troubleshooting, see [iOS Triage](07-ios-triage.md).` inserted after macOS banner (D-04 verbatim wording)
3. **Scenario Trees list** — `- [iOS Triage](07-ios-triage.md) — iOS/iPadOS failure routing` appended after APv2 entry
4. **See Also footer** — Two entries appended after APv2 entry: iOS Triage + macOS ADE Triage (parity restoration — macOS banner existed since 2026-04-14 with no See Also entry)
5. **Bottom Scenario Trees footer** — `- [iOS Triage](07-ios-triage.md)` appended
6. **Version History** — `| 2026-04-17 | Added iOS/iPadOS triage cross-reference banner | -- |` inserted above 2026-04-14 row

**D-05 Compliance — Mermaid block UNCHANGED:** Zero modifications inside the ```mermaid ... ``` fence (lines 40-82). No IOS1/IOS2/IOS3 nodes added. TRD1-TRD6 IDs unchanged. `applies_to: APv1` unchanged.

## Insertion Points — docs/l1-runbooks/00-index.md (4-5 total)

1. **Frontmatter bump** — `last_verified: 2026-04-13` → `2026-04-17`; `review_by: 2026-07-12` → `2026-07-16`
2. **iOS L1 Runbooks section** — New H2 `## iOS L1 Runbooks` inserted after macOS ADE Runbooks (line 47), before Scope (line 49). Contains intro paragraph + 3-column table with 6 rows (runbooks 16-21)
3. **MAM-WE Note (iOS)** — INCLUDED (optional per Claude's discretion). Added between iOS L1 Runbooks section and Scope. Mirrors the existing TPM Attestation Note pattern cleanly. Defers MAM-WE failures to ADDTS-01 future milestone.
4. **Related Resources** — `- [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) -- iOS/iPadOS failure routing` appended after macOS entry
5. **Version History** — `| 2026-04-17 | Added iOS L1 runbook section (runbooks 16-21) | -- |` inserted above 2026-04-14 row

## Deviations from Plan

### Auto-applied improvements

**1. [Rule 2 - Missing parity] macOS See Also entry in 00-initial-triage.md**
- **Found during:** Task 1
- **Issue:** macOS banner (line 9) existed since 2026-04-14 but had no corresponding See Also footer entry, creating an inconsistency. Plan noted this explicitly as a "parity restoration" and authorized it.
- **Fix:** Added `- [macOS ADE Triage](06-macos-triage.md) -- For macOS ADE (Intune-managed) deployment failures` alongside the iOS See Also entry
- **Files modified:** docs/decision-trees/00-initial-triage.md
- **Commit:** 3d21436

**2. [Claude's discretion] MAM-WE advisory note included in 00-index.md**
- **Decision:** Included. The note fits cleanly between the new iOS section and `## Scope`, mirrors the TPM Attestation Note pattern exactly, and provides useful deferral context for agents who look for MAM-WE runbooks.
- **Files modified:** docs/l1-runbooks/00-index.md
- **Commit:** 90ea48e

**3. [Rule 2 - Scope text update] 00-index.md Scope section**
- **Issue:** Scope paragraph said "APv1 (classic Autopilot), APv2 (Device Preparation), and macOS ADE deployments" — omitted iOS after adding an iOS section.
- **Fix:** Updated to "APv1 (classic Autopilot), APv2 (Device Preparation), macOS ADE, and iOS/iPadOS deployments"
- **Files modified:** docs/l1-runbooks/00-index.md
- **Commit:** 90ea48e

## Validator Results

`node scripts/validation/check-phase-30.mjs --quick` — 10 passed, 2 failed, 1 skipped

- Check 2 (Single-branch integration — no iOS in Mermaid of 00-initial-triage.md): **PASS**
- Check 9 (00-index.md contains ## iOS L1 Runbooks): **PASS**
- Checks 5, 6 (pre-existing failures in docs/admin-setup-ios/ files): out of scope for this plan — not regressions from 30-08 changes

## Known Stubs

None — both files contain live links to existing Wave 2 runbook files (16-21) and the Wave 1 triage tree (07-ios-triage.md). All navigation targets verified to exist in the worktree.

## Threat Flags

None — both edits are additive documentation changes with no new network endpoints, auth paths, file access patterns, or schema changes.

## Self-Check: PASSED

- docs/decision-trees/00-initial-triage.md exists and modified: FOUND
- docs/l1-runbooks/00-index.md exists and modified: FOUND
- Commit 3d21436 exists: FOUND
- Commit 90ea48e exists: FOUND
- Check 2 PASS: CONFIRMED
- Check 9 PASS: CONFIRMED
- Mermaid block unchanged: CONFIRMED (grep IOS1|IOS2|IOS3 = 0)
