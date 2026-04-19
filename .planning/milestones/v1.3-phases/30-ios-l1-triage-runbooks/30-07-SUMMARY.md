---
phase: 30-ios-l1-triage-runbooks
plan: "07"
subsystem: docs/l1-runbooks
tags: [ios, l1-runbook, compliance, conditional-access, multi-cause]
dependency_graph:
  requires: [30-01, 30-02]
  provides: [runbook-21-ios-compliance-blocked]
  affects: [docs/l1-runbooks/21-ios-compliance-blocked.md]
tech_stack:
  added: []
  patterns: [multi-cause-H2-layout, pandoc-anchors, actor-boundary-H3, user-action-required-H2]
key_files:
  created:
    - docs/l1-runbooks/21-ios-compliance-blocked.md
  modified: []
decisions:
  - "File-scope ## User Action Required H2 placed after three Causes but before overall ## Escalation Criteria — satisfies Check 4 (grep -l '^## User Action Required' finds exactly runbook 21) while D-10 actor-boundary H3 sections inside each cause cover per-cause user actions"
  - "Cause B per-device sync framed as OPTIONAL with D-08 extension note and macOS runbook 12 precedent cross-link — not promoted to required step"
  - "Cause C omits User Action Required H3 entirely (admin-only fix) per plan action constraint and macOS runbook 11 omission pattern"
metrics:
  duration: "12 minutes"
  completed: "2026-04-17"
  tasks_completed: 1
  tasks_total: 1
  files_created: 1
  files_modified: 0
---

# Phase 30 Plan 07: iOS Compliance Blocked Runbook Summary

**One-liner:** Multi-cause L1 runbook (CA gap / policy mismatch / default posture) with sub-navigator, Pandoc anchors, jailbreak Security-team escalation, and the only file-scope User Action Required H2 in the phase.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create 21-ios-compliance-blocked.md with multi-cause sub-structure and User Action Required section | 7723f3c | docs/l1-runbooks/21-ios-compliance-blocked.md (created, 191 lines) |

## Verification Results

All done-criteria checks pass for runbook 21:

| Check | Command | Expected | Actual |
|-------|---------|----------|--------|
| Cause A/B/C H2 count | `grep -c "^## Cause [ABC]:"` | 3 | 3 |
| User Action Required H2 | `grep -c "^## User Action Required"` | 1 | 1 |
| How to Use This Runbook | `grep -c "^## How to Use This Runbook"` | 1 | 1 |
| CA timing anchor | `grep -c "compliance-evaluation-timing-and-conditional-access"` | >=1 | 2 |
| jailbreak mentions | `grep -ci "jailbroken\|jailbreak"` | >=2 | 5 |
| Security team | `grep -c "Security team"` | >=1 | 3 |
| APNs runbook cross-ref | `grep -c "16-ios-apns-expired.md"` | >=1 | 1 |
| Line count | `wc -l` | 180-280 | 191 |

Validator check-phase-30.mjs --quick: Check 4 (Exactly 1 runbook has `## User Action Required`) flips to PASS. Checks 3, 7, 11, 12 remain FAIL because runbooks 16-20 are out of scope for this plan (wave 2 parallel plans 30-02 through 30-06). Those checks require all 6 runbooks to exist.

## Structure Verification

- **"How to Use This Runbook"** sub-navigator present immediately after intro, before first Cause H2 (macOS runbook 11 pattern)
- **Pandoc anchors:** `{#cause-a-ca-gap}`, `{#cause-b-policy-mismatch}`, `{#cause-c-default-posture}` — match sub-navigator `#` links exactly
- **Cause A nested H3:** Symptom / L1 Triage Steps / User Action Required / Admin Action Required / Escalation (within Cause A)
- **Cause B nested H3:** Symptom / L1 Triage Steps / User Action Required / Admin Action Required / Escalation (within Cause B) — jailbreak -> Security team IMMEDIATE path explicitly present
- **Cause C nested H3:** Symptom / L1 Triage Steps / Admin Action Required / Escalation (within Cause C) — User Action Required H3 OMITTED (Cause C is admin-only per plan action constraint)
- **File-scope ## User Action Required H2:** Present after Cause C, before ## Escalation Criteria — consolidates cross-cause user-action summary
- **Cause A deep-link:** `../admin-setup-ios/06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access` — Phase 28 D-11 anchor verified present
- **Cause C deep-link:** `../admin-setup-ios/06-compliance-policy.md` — Phase 28 D-14 default-posture reference

## Deviations from Plan

None - plan executed exactly as written. The interfaces block in the plan specified the full content verbatim, and the file was written to match that specification with all structural requirements satisfied.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. This plan creates a markdown documentation file only.

## Self-Check

### Created files exist:
- FOUND: docs/l1-runbooks/21-ios-compliance-blocked.md

### Commits exist:
- FOUND: 7723f3c

## Self-Check: PASSED
