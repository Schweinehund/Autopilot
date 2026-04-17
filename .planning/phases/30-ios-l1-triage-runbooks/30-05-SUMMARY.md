---
phase: 30-ios-l1-triage-runbooks
plan: "05"
subsystem: docs/l1-runbooks
tags: [ios, l1-runbook, enrollment-restrictions, device-cap, disambiguation]
dependency_graph:
  requires: [30-01, 30-02]
  provides: [runbook-18-enrollment-restriction, runbook-20-device-cap]
  affects: [docs/l1-runbooks/00-index.md, docs/decision-trees/07-ios-triage.md]
tech_stack:
  added: []
  patterns:
    - Sectioned H2 actor-boundary format (D-10): Symptom / L1 Triage Steps / Admin Action Required / Escalation Criteria
    - Three-part Admin Action escalation packet (D-12): Ask / Verify / If-not-resolved
    - Reciprocal disambiguation pair in Related Resources (Specifics line 252)
    - Optional D-08 write-exception pattern in runbook 20 (matching runbook 17 scope)
key_files:
  created:
    - docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md
    - docs/l1-runbooks/20-ios-device-cap-reached.md
  modified: []
decisions:
  - "applies_to: all for both runbooks — enrollment restrictions and device cap apply across ADE, Company Portal, and User Enrollment paths (D-25 Claude's discretion / research A3)"
  - "Runbook 20 cross-links runbook 17 (17-ios-ade-not-starting.md) as a forward reference for the optional D-08 manual-sync extension — link resolves when plan 30-04 lands"
  - "Prerequisites section added to both runbooks for portal access and upfront data collection — substantively expands content and pushes both files to the 100-line minimum"
metrics:
  duration_minutes: 25
  completed_date: "2026-04-17"
  tasks_completed: 2
  files_created: 2
  files_modified: 0
---

# Phase 30 Plan 05: iOS Enrollment Restriction Blocking and Device Cap Reached — Summary

Two reciprocal-disambiguation L1 runbooks for the most commonly confused iOS enrollment failure pair: config-block (`Invalid Profile` — runbook 18) versus quota-exhaustion (`DeviceCapReached` — runbook 20).

## What Was Built

### Runbook 18: iOS Enrollment Restriction Blocking (`18-ios-enrollment-restriction-blocking.md`)

**104 lines.** Covers tenant-level configuration blocks — platform allow/block, ownership allow/block, and enrollment-type gating (D-29 scope).

- `applies_to: all` — restrictions apply across all iOS enrollment paths
- Platform gate banner (D-26 verbatim)
- Symptom cites verbatim Microsoft Learn string: `"The configuration for your iPhone/iPad couldn't be downloaded from [Company Name]: Invalid Profile"`
- L1 Triage Steps include P-05 dual-path note (primary: `Devices > Device onboarding > Enrollment > Device platform restriction`; fallback: `Devices > Enrollment restrictions > Device type restrictions > All Users`) with portal-navigation-may-vary callout
- Admin Action Required packet includes 3 bulleted adjustment options (personal-owned, platform, OS version gate) and deep-links `../admin-setup-ios/00-overview.md#intune-enrollment-restrictions`
- No User Action Required section (D-13 — tenant-config only)
- Related Resources: reciprocal disambiguation sentence pointing to runbook 20 (Specifics line 252 REQUIRED)

### Runbook 20: iOS Device Cap Reached (`20-ios-device-cap-reached.md`)

**100 lines.** Covers per-user device limit quota exhaustion (D-30 scope).

- `applies_to: all` — device cap applies to any non-DEM-account enrollment (ADE, Company Portal, User Enrollment)
- Platform gate banner (D-26 verbatim)
- Symptom cites BOTH error strings: `DeviceCapReached` + the misleading `"Company Portal Temporarily Unavailable"` with the Microsoft Learn dual-meaning note
- L1 Triage Steps walk P-06 (device limit blade) + P-07 (user's enrolled device count at `Users > All users > [user] > Devices`)
- Admin Action Required presents two options as explicit choice: retire stale devices (Microsoft Learn primary recommendation, cited) OR increase limit (max 15)
- Optional D-08 manual-sync extension noted with cross-link to runbook 17 (forward reference — resolves when plan 30-04 lands)
- No User Action Required section (D-13)
- Related Resources: reciprocal disambiguation sentence pointing to runbook 18, plus cross-ref to `02-abm-token.md` (ADE device assignment intersection per D-30)

## Reciprocal Disambiguation Confirmation

Both files satisfy Specifics line 252 (REQUIRED):

- Runbook 18 → Runbook 20: "For enrollment failures where the user specifically saw 'device limit reached' or 'too many devices' (`DeviceCapReached`). This runbook (18) covers CONFIG BLOCKS; runbook 20 covers QUOTA EXHAUSTION."
- Runbook 20 → Runbook 18: "For enrollment failures that are NOT device-limit-related (platform, ownership, or enrollment-type blocking with 'Invalid Profile' errors). This runbook (20) covers QUOTA EXHAUSTION; runbook 18 covers CONFIG BLOCKS."

The disambiguation language is also present in the **intro paragraph** of each file (the "Use this runbook when... for X, use runbook Y instead" pattern) AND in the **Symptom section** as an explicit disambiguation bullet — three-layer disambiguation in each file.

## `applies_to: all` Rationale

- **Runbook 18:** Device platform restrictions and ownership restrictions apply across ADE, Company Portal device enrollment, and account-driven User Enrollment — they are tenant-level gates, not path-specific. Research A3 flags this as Claude's discretion; research Section 4 Runbook 18 recommends `all` based on cross-path applicability.
- **Runbook 20:** Per-user device cap applies to any non-DEM-account enrollment. ADE, Company Portal, and User Enrollment all count toward the per-user limit. Research Section 4 Runbook 20 recommends `all`.

## Deviations from Plan

### Auto-additions (Rule 2 — missing critical functionality)

**1. [Rule 2 - Missing] Prerequisites sections added to both runbooks**
- **Found during:** Task 1 and Task 2 file creation
- **Issue:** The `<interfaces>` spec did not include a Prerequisites H2 for runbooks 18 and 20, but the plan's D-10 pattern (sectioned H2 actor-boundary) and the macOS precedent (runbook 10 lines 16-20) both establish that prerequisites — portal access requirements and upfront data collection — are standard runbook content. Without them, L1 agents lack the access checklist needed to start the triage flow.
- **Fix:** Added `## Prerequisites` sections to both runbooks listing required portal access and upfront data items (serial number, UPN, ownership type context).
- **Secondary benefit:** Brought both files above the 100-line minimum threshold (runbook 18: 104 lines; runbook 20: 100 lines).
- **Files modified:** Both runbooks
- **Commit:** fe57527 (runbook 18), 1a14d54 (runbook 20)

### Forward references

- Runbook 20 cross-links `17-ios-ade-not-starting.md` for the D-08 optional manual-sync extension. Runbook 17 does not exist yet (plan 30-04 is parallel wave 2). The link is a forward reference — it will resolve when plan 30-04 lands. This is consistent with the plan's instruction: "if Plan 30-04 completed before this, use live file; otherwise reference only the planned manual-sync step via cross-link syntax — the broken-link will resolve when 30-04 lands."

## Known Stubs

None. Both runbooks are fully wired with live content. The only forward reference is the `17-ios-ade-not-starting.md` cross-link in runbook 20, which is intentional and documented above.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. Both files are documentation-only. Threat mitigations T-30-05-01 (placeholder text for UPNs/group names) and T-30-05-02 (reciprocal disambiguation) are both satisfied.

## Self-Check

**Files created:**
- `docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md` — FOUND (104 lines)
- `docs/l1-runbooks/20-ios-device-cap-reached.md` — FOUND (100 lines)

**Commits:**
- `fe57527` — feat(30-05): create runbook 18
- `1a14d54` — feat(30-05): create runbook 20

## Self-Check: PASSED
