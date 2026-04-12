---
phase: 12-apv2-failure-index
plan: "01"
subsystem: documentation
tags: [apv2, error-codes, failure-catalog, symptom-lookup, index]
dependency_graph:
  requires: [docs/lifecycle-apv2/02-deployment-flow.md, docs/lifecycle-apv2/01-prerequisites.md]
  provides: [docs/error-codes/06-apv2-device-preparation.md, docs/error-codes/00-index.md (APv2 section)]
  affects: [docs/error-codes/00-index.md]
tech_stack:
  added: []
  patterns: [symptom-cause-action entry format, forward-reference plain text for unreleased runbooks, 90-day review cycle frontmatter]
key_files:
  created:
    - docs/error-codes/06-apv2-device-preparation.md
  modified:
    - docs/error-codes/00-index.md
decisions:
  - "APv2 failure catalog uses no hex codes -- symptoms are the primary lookup axis, organized by deployment phase step numbers"
  - "APv1 precedence scenario documented as silent failure with callout blockquote to prevent misdiagnosis"
  - "Win32/Store/EAC Skipped status documents both root causes (ETG assignment and Managed Installer policy) per RESEARCH.md Pitfall 2"
  - "Runbook forward references use plain text with (Phase 13)/(Phase 14) annotations, not markdown links, to avoid broken links"
metrics:
  duration: "4 min"
  completed: "2026-04-11"
  tasks_completed: 2
  files_changed: 2
---

# Phase 12 Plan 01: APv2 Failure Index Summary

APv2 symptom-based failure catalog with 10 scenarios across 5 deployment phase sections, plus master error index updated with separate APv2 section and APv1/APv2 framework labeling.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create APv2 failure catalog with 10 scenario entries | 6290a8b | docs/error-codes/06-apv2-device-preparation.md (created) |
| 2 | Update master error code index with APv2 section | f04282b | docs/error-codes/00-index.md (modified) |

## What Was Built

### Task 1: APv2 Failure Catalog

New file `docs/error-codes/06-apv2-device-preparation.md` with:

- Frontmatter: `applies_to: APv2`, `audience: both`, `last_verified: 2026-04-11`, `review_by: 2026-07-10`
- Version gate blockquote referencing error code index and APv1 vs APv2 comparison
- Introductory paragraph explaining symptom-based organization and no-inline-resolution-steps policy
- 5 deployment phase sections with 10 scenario entries total:
  - **Enrollment Failures (Steps 2-3):** Deployment experience never launched, APv1 profile took precedence, Entra join failed, Intune enrollment failed
  - **IME Failures (Step 4):** IME install failed
  - **App Installation Failures (Steps 7-9):** LOB or M365 app install failed, Win32/Store/EAC app install failed, Deployment timed out
  - **Script Failures (Step 8):** PowerShell script execution failed
  - **Post-Deployment Issues (Step 10+):** Wrong apps or policies applied
- Every entry follows Symptom / Probable Cause / Quick Check / Runbook format
- APv1 precedence scenario includes explicit silent failure callout blockquote
- Win32/Store/EAC scenario documents both Skipped causes: ETG assignment and Managed Installer policy
- Zero hex codes; all runbook references use plain text with (Phase 13) or (Phase 14) phase annotation
- See Also footer and Version History table

### Task 2: Master Error Index Updates

Modified `docs/error-codes/00-index.md` with five targeted changes:

1. Frontmatter: `applies_to: APv1` changed to `applies_to: both`; dates updated to 2026-04-11/2026-07-10
2. Categories section: new line added for `06-apv2-device-preparation.md`
3. Quick Lookup section: renamed `## Quick Lookup (APv1)` with `**Framework:** APv1 (classic)` label
4. New `## APv2 Failure Scenarios` section after No-Code ESP Failures with `**Framework:** APv2 (Device Preparation)` label, intro text, and 10-row table (Scenario / Symptom / Phase / Category columns, all deep links to catalog anchors)
5. Old `> **APv2 Note:**` blockquote removed (superseded by new section)
6. Closing navigation line updated to reference both APv1 Quick Lookup and APv2 scenario table
7. Version History updated with 2026-04-11 entry

## Verification Results

- `06-apv2-device-preparation.md` exists: PASS
- Exactly 10 `### ` level-3 headings: PASS (confirmed 10)
- No hex codes (`0x80`): PASS
- All 4 fields (Symptom/Probable Cause/Quick Check/Runbook) in every scenario: PASS
- Silent failure callout in APv1 precedence scenario: PASS
- All 10 runbook references contain `(Phase 13)` or `(Phase 14)`: PASS (10 annotations confirmed)
- `00-index.md` frontmatter `applies_to: both`: PASS
- `## Quick Lookup (APv1)` heading present: PASS
- `**Framework:** APv1 (classic)` label present: PASS
- `## APv2 Failure Scenarios` section present: PASS
- `**Framework:** APv2 (Device Preparation)` label present: PASS
- APv2 table has 10 deep-link rows: PASS (confirmed 10)
- Old `> **APv2 Note:**` blockquote removed: PASS
- `06-apv2-device-preparation.md` in Categories section: PASS
- Version History `2026-04-11` entry: PASS
- Full suite check: PASS

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None - all content is fully wired. Runbook forward references are intentional plain-text annotations (not stubs) per D-08; Phase 13/14 runbook files will be created in those phases.

## Self-Check: PASSED

- FOUND: docs/error-codes/06-apv2-device-preparation.md
- FOUND: docs/error-codes/00-index.md
- FOUND: .planning/phases/12-apv2-failure-index/12-01-SUMMARY.md
- FOUND: commit 6290a8b (Task 1)
- FOUND: commit f04282b (Task 2)
