---
phase: 30-ios-l1-triage-runbooks
plan: "03"
subsystem: docs/l1-runbooks
tags: [ios, l1-runbook, apns, tenant-config, escalation]
dependency_graph:
  requires: [30-01, 30-02]
  provides: [docs/l1-runbooks/16-ios-apns-expired.md]
  affects: [docs/l1-runbooks/00-index.md, docs/decision-trees/07-ios-triage.md]
tech_stack:
  added: []
  patterns: [D-10 sectioned H2 actor-boundary, D-12 three-part Admin Action packet]
key_files:
  created:
    - docs/l1-runbooks/16-ios-apns-expired.md
  modified: []
decisions:
  - D-10 sectioned actor-boundary format applied (no Prerequisites H2; actor separation via section headings)
  - D-13 User Action Required omitted entirely (not N/A placeholder)
  - D-27 cross-platform blast-radius sentence leads Symptom section
metrics:
  duration: ~10 minutes
  completed: 2026-04-17
  tasks_completed: 1
  files_changed: 1
---

# Phase 30 Plan 03: iOS APNs Expired L1 Runbook Summary

Single L1 runbook for APNs certificate expired — highest-impact iOS failure affecting all enrolled iOS, iPadOS, and macOS devices simultaneously, using the D-10 sectioned actor-boundary format with a detect-and-escalate scope.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create 16-ios-apns-expired.md with D-10 format | 5fa446b | docs/l1-runbooks/16-ios-apns-expired.md |

## File Details

**docs/l1-runbooks/16-ios-apns-expired.md**
- **Line count:** 102 lines (within 100-180 target per CONTEXT Specifics line 249)
- **Frontmatter:** `last_verified: 2026-04-17`, `review_by: 2026-07-16`, `applies_to: all`, `audience: L1`, `platform: iOS` (5 fields — D-25 locked values)
- **Platform gate banner:** Line 9 (D-26 verbatim)

## D-10 Compliance (4 H2 Sections)

| H2 Section | Present | Actor |
|-----------|---------|-------|
| ## Symptom | Yes | L1 reads |
| ## L1 Triage Steps | Yes | L1 executes |
| ## Admin Action Required | Yes | L1 documents; admin executes |
| ## Escalation Criteria | Yes | L1 escalates |
| ## User Action Required | ABSENT (correct per D-13) | n/a |

## D-13 Compliance

No `## User Action Required` H2 is present. The section is entirely omitted (not a placeholder). Runbook 16 is tenant-config only.

## Key Content Verified

- D-27 blast-radius sentence: "This failure affects ALL enrolled iOS, iPadOS, AND macOS devices in the tenant simultaneously. APNs is shared infrastructure — one expired certificate stops MDM communication to every Apple device." — leads the Symptom section.
- All 3 Microsoft Learn error strings cited: `APNSCertificateNotValid`, `NoEnrollmentPolicy`, `AccountNotOnboarded`
- D-11 back-link to `07-ios-triage.md` IOSR1 "Fleetwide outage (all Apple devices affected)" branch — present in Symptom section
- D-12 three-part Admin Action packet: "Ask the admin to:", "Verify:", "If the admin confirms none of the above applies:" — present
- Deep-link to `../admin-setup-ios/01-apns-certificate.md#renewal` — present (anchor exists at file line 60)
- D-15 Escalation Criteria: "Escalate to L2 if:" + "Before escalating, collect:" — present
- D-27 macOS APNs gap note deferred to v1.4 — present in closing block
- `[Back to iOS Triage](../decision-trees/07-ios-triage.md)` footer — present
- Version History table with 2026-04-17 row — present

## Validator Check Status (this file's contributions)

| Check | Status | Notes |
|-------|--------|-------|
| Check 3 (Symptom H2) | Contributes 1 of 6 | 16 no longer in missing list |
| Check 4 (User Action Required = 0 for runbook 16) | PASS | Correctly absent |
| Check 7 (file 16 exists) | PASS | File at correct path |
| Check 11 (frontmatter) | PASS | All 5 fields correct |
| Check 12 (Platform gate line ≤ 12) | PASS | Banner on line 9 |

## Deviations from Plan

None — plan executed exactly as written. All interfaces block content used verbatim or near-verbatim. No structural changes required.

## Known Stubs

None — all cross-references link to existing files. The L2 runbooks link includes "(Phase 31)" marker per the approved deferred-placeholder pattern established in Phase 30 Deferred section.

## Threat Flags

No new security-relevant surface introduced. File contains only placeholder strings per T-30-03-01 mitigation (`user@domain.com`, `it-apple-id@company.com` patterns were not needed in this runbook — the APNs runbook references the Apple ID from the portal pane, not from examples). T-30-03-02 portal path verified against RESEARCH.md P-01 (navigation callout included).

## Self-Check: PASSED

- [x] `docs/l1-runbooks/16-ios-apns-expired.md` exists
- [x] Commit 5fa446b exists in git log
- [x] No untracked files remain
- [x] No STATE.md or ROADMAP.md modifications made
