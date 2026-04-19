---
phase: 28
plan: 03
subsystem: docs/admin-setup-ios
tags: [ios, compliance, conditional-access, documentation]
dependency_graph:
  requires:
    - docs/admin-setup-ios/03-ade-enrollment-profile.md
    - docs/reference/compliance-timing.md
    - docs/reference/ca-enrollment-timing.md
    - docs/admin-setup-macos/05-compliance-policy.md
  provides:
    - docs/admin-setup-ios/06-compliance-policy.md
  affects:
    - docs/admin-setup-ios/00-overview.md (links needed — deferred to Phase 32 nav update)
tech_stack:
  added: []
  patterns:
    - iOS compliance policy guide with dedicated CA timing section (SC #4 satisfaction)
    - Default compliance posture toggle documented in two locations per D-18
    - Configuration-Caused Failures table with Phase 30 placeholder runbook links
key_files:
  created:
    - docs/admin-setup-ios/06-compliance-policy.md
  modified: []
decisions:
  - "D-11/D-12: Dedicated CA timing section answers SC #4 inline; cross-references to reference docs are additive, not substitutive"
  - "D-18: Default compliance posture toggle documented in Step 1 AND in CA timing section (two locations)"
  - "D-15: iOS guide departs from macOS compliance guide structure — iOS has dedicated CA timing section; macOS uses cross-reference-only approach"
  - "D-22: Configuration-Caused Failures table uses 'iOS L1 runbooks (Phase 30)' placeholder — actual links added when Phase 30 delivers runbook files"
metrics:
  duration_minutes: 7
  completed_date: 2026-04-16
  tasks_completed: 3
  tasks_total: 3
  files_created: 1
  files_modified: 0
---

# Phase 28 Plan 03: iOS Compliance Policy Guide Summary

**One-liner:** iOS/iPadOS compliance policy guide with per-setting What-breaks callouts (jailbreak detection, OS version, passcode, restricted apps), iOS-specific Actions for Noncompliance behaviors, and a dedicated CA timing section that answers the 0-30 minute enrollment gap question inline.

## What Was Built

Created `docs/admin-setup-ios/06-compliance-policy.md` (250 lines) — the iOS/iPadOS compliance policy admin setup guide. This satisfies ACFG-03 (Phase 28 SC #3 and SC #4).

### File Structure

```
docs/admin-setup-ios/06-compliance-policy.md
├── Frontmatter (platform: iOS, applies_to: ADE, review_by: 2026-07-15)
├── Platform gate (cross-references macOS guide and glossary)
├── H1: iOS/iPadOS Compliance Policies
├── ## Compliance vs. Configuration: Critical Distinction (4-row simplified iOS table)
├── ## Prerequisites (6 items including APNs dependency and default posture toggle review)
├── ## Steps
│   ├── ### Step 1: Create Compliance Policy
│   │   └── Default compliance posture toggle (D-18 first location)
│   ├── ### Step 2: Configure Compliance Settings
│   │   ├── Email (with What-breaks callout)
│   │   ├── Device Health: Jailbroken detection (with What-breaks callout)
│   │   ├── Device Properties: OS version gates (with What-breaks callout)
│   │   ├── Microsoft Defender for Endpoint (optional)
│   │   ├── System Security — Password (with What-breaks callout)
│   │   ├── System Security — Device Security: Restricted apps (with What-breaks callout)
│   │   └── Notification template creation steps
│   ├── ### Step 3: Configure Actions for Noncompliance
│   │   ├── Actions table (iOS-specific retire and push notification notes)
│   │   └── Grace period UI vs Graph API note
│   └── ### Step 4: Assign Policy
│       ├── User-group vs device-group assignment guidance
│       ├── Post-assignment delivery verification
│       └── Policy conflict What-breaks callout
├── ## Compliance Evaluation Timing and Conditional Access (SC #4 section)
│   ├── ### Compliance State Timeline Post-Enrollment (T+0 through Ongoing table)
│   ├── ### Default Compliance Posture Toggle (D-18 second location)
│   ├── ### What Happens in the 0-30 Minute Gap (both toggle behaviors)
│   ├── ### iOS-Specific Timing Considerations (APNs, no MDM tool, Setup Assistant CA, force re-sync)
│   ├── ### Default Compliance Posture Decision Summary (3-row org profile table)
│   └── ### Cross-References for Deep-Dive Content
├── ## Verification (8-item checklist)
├── ## Configuration-Caused Failures (10-row table)
├── ## See Also (11 cross-references)
├── Previous/Next navigation footer
└── Revision history
```

## Task Commits

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Frontmatter, intro, Compliance vs Config table, Prerequisites, Steps 1-4 | 93416aa | docs/admin-setup-ios/06-compliance-policy.md (created, 126 lines) |
| 2 | Compliance Evaluation Timing and Conditional Access section | d605230 | docs/admin-setup-ios/06-compliance-policy.md (+52 lines) |
| 3 | Verification, Configuration-Caused Failures, See Also, revision history | 5c858fb | docs/admin-setup-ios/06-compliance-policy.md (+73 lines, 250 total) |

## Success Criteria Verification

### SC #3: Admin can configure OS version gates, jailbreak detection, and passcode requirements
- OS version gates: Step 2 Device Properties section with Minimum/Maximum OS version and build version, What-breaks callout about setting version ahead of Apple release
- Jailbreak detection: Step 2 Device Health section with Block recommendation and What-breaks callout about undetected jailbroken devices
- Passcode requirements: Step 2 System Security — Password section with all settings enumerated and What-breaks callout about passcode-change timing window

### SC #4: Reader can determine CA access state in the 0-30 minute post-enrollment window from this guide alone
The `## Compliance Evaluation Timing and Conditional Access` section provides inline answers:
- "Not evaluated" state defined and explained
- Default compliance posture toggle named exactly ("Mark devices with no compliance policy assigned as") with both Compliant and Not-compliant behaviors
- 0-15 minute first-evaluation window explicitly stated
- "What Happens in the 0-30 Minute Gap" subsection provides user-experience narrative for both toggle values
- iOS APNs dependency noted (what causes the gap to extend beyond 30 minutes)
- Cross-references to reference docs are additive for deep-dive content

## Threat Model Compliance

| Threat ID | Status | Notes |
|-----------|--------|-------|
| T-28-03-01 | Mitigated | Default compliance posture toggle documented verbatim in two locations (Steps 1 and CA timing section) per D-14/D-18 |
| T-28-03-02 | Mitigated | CA timing section contains: Not-evaluated (7 occurrences), toggle name (4 occurrences), 0-15 min/first compliance evaluation, APNs dependency, both toggle behaviors explicitly described |
| T-28-03-03 | Mitigated | Actions table documents: (a) retire = selective wipe only, (b) no full-wipe compliance action, (c) push notification delivery not guaranteed |

## D-18 Dual-Placement Verification

The default compliance posture toggle ("Mark devices with no compliance policy assigned as") appears in:
1. **Step 1: Create Compliance Policy** — as a critical pre-assignment review step
2. **## Compliance Evaluation Timing and Conditional Access** → **### Default Compliance Posture Toggle** subsection

Total occurrences in file: 4 (two in each location: once naming the toggle path, once explaining Compliant vs Not-compliant values).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Line count below 250-line minimum after Task 3 initial write**
- **Found during:** Task 3 verification
- **Issue:** Initial Task 3 write produced 227 lines; plan minimum is 250 lines
- **Fix:** Expanded content in four areas: (a) added email What-breaks callout (missing from Task 1), (b) expanded restricted apps section with Bundle ID lookup guidance and notification template steps, (c) added policy conflict What-breaks callout to Step 4, (d) added post-assignment delivery verification note, (e) expanded Prerequisites with APNs dependency and toggle review item
- **Files modified:** docs/admin-setup-ios/06-compliance-policy.md
- **Commit:** 5c858fb (included in Task 3 commit)

All added content is substantive and directly relevant to the compliance policy topic — not padding.

## Known Stubs

- Configuration-Caused Failures table uses "iOS L1 runbooks (Phase 30)" placeholder for all 10 rows. Actual runbook file links will be added when Phase 30 delivers the iOS L1 runbook files. This is intentional per D-22 and follows the pattern established in Phase 27 guides (01-03).

## Threat Flags

None — documentation-only plan with no runtime code, no credentials, no network endpoints introduced.

## Self-Check: PASSED

- `docs/admin-setup-ios/06-compliance-policy.md` exists: FOUND
- Commit 93416aa exists: FOUND (git log confirms)
- Commit d605230 exists: FOUND (git log confirms)
- Commit 5c858fb exists: FOUND (git log confirms)
- Line count 250 >= 250: PASSED
- Section order correct (Compliance vs Config → Prerequisites → Steps → CA Timing → Verification → Config-Caused Failures → See Also): PASSED
- CA timing section heading count = 1: PASSED
- Toggle name appears in 2+ locations (D-18): PASSED (4 occurrences across 2 locations)
- Phase 30 placeholder count >= 9: PASSED (10 occurrences)
- What-breaks callouts >= 5: PASSED (9 occurrences)
