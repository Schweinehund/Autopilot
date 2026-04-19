---
phase: 32
plan: "05"
subsystem: docs-navigation
tags: [index, docs-hub, ios, role-based, nav-02]
requirements: [NAV-02]
dependency_graph:
  requires:
    - "32-00 (iOS L1 runbook index anchor `#ios-l1-runbooks` shipped)"
    - "32-01 (validation harness available)"
    - "32-02 (Cross-Platform References iOS entries + frontmatter bump + platform coverage blockquote)"
    - "Phase 31 l2-runbooks/00-index.md iOS section with anchor `#ios-l2-runbooks`"
    - "Phase 26-29 admin-setup-ios/ 10 files"
    - "Phase 26 ios-lifecycle/00-enrollment-overview.md + 01-ade-lifecycle.md"
    - "Phase 30 decision-trees/07-ios-triage.md"
    - "Phase 31 l2-runbooks/14-ios-log-collection.md"
  provides:
    - "docs/index.md `## iOS/iPadOS Provisioning` H2 with L1/L2/Admin Setup subsections"
    - "docs/index.md Choose Your Platform third entry (#iosipados-provisioning)"
    - "trilateral H1 narrative (Windows + macOS + iOS/iPadOS)"
  affects:
    - "docs/index.md"
tech_stack:
  added: []
  patterns:
    - "Phase 25 D-20 role-based L1/L2/Admin Setup table structure mirroring macOS Provisioning section"
    - "D-26 start-here routing: ios-lifecycle/00-enrollment-overview.md as L1-table first row"
key_files:
  created: []
  modified:
    - "docs/index.md"
decisions:
  - "Used actual on-disk filename `admin-setup-ios/02-abm-token.md` (W4 fix — not `02-abm-ade-token.md`)"
  - "Admin Setup table used 3-row bundle grouping (ADE prereqs / Config-App-Compliance / BYOD-MAM) per plan pattern to keep table compact"
  - "L2 subsection table: 5 rows (Enrollment Path Overview review + ADE Lifecycle + Log Collection + L2 Runbooks + L2 Quick-Ref)"
  - "L1 subsection table: 4 rows (Enrollment Path Overview start-here + Triage Tree + L1 Runbooks + L1 Quick-Ref) matching macOS L1 row-count"
metrics:
  duration_minutes: 7
  completed_date: 2026-04-17
  tasks_executed: 2
  files_created: 0
  files_modified: 1
---

# Phase 32 Plan 05: index.md iOS/iPadOS Provisioning Section Summary

Added `## iOS/iPadOS Provisioning` H2 section with L1/L2/Admin Setup role-based subsections to `docs/index.md`, plus Choose Your Platform third entry and trilateral H1 narrative framing (NAV-02 index.md scope).

## What Was Built

### Task 1 — Choose Your Platform third entry + trilateral H1 narrative

**File:** `docs/index.md` (lines 14, 16-21)

- **H1 narrative (line 14)** rewritten from bilateral ("Windows Autopilot and macOS ADE deployments") to trilateral ("Windows Autopilot, macOS ADE, and iOS/iPadOS Intune provisioning deployments") per D-28.
- **Choose Your Platform list (lines 18-21)** extended from 3 entries (Windows + macOS + Cross-Platform References) to 4 entries with iOS/iPadOS Provisioning inserted as the third entry (between macOS and Cross-Platform References) per D-26.
- Pre-existing Windows and macOS entries untouched. Cross-Platform References entry preserved.

### Task 2 — iOS/iPadOS Provisioning H2 section + Version History

**File:** `docs/index.md` (lines 128-163)

- Inserted new `## iOS/iPadOS Provisioning` H2 between the macOS section's horizontal rule (line 127) and the `## Cross-Platform References` H2 (now line 166) per D-26.
- **Intro paragraph** links to `_glossary-macos.md` (Apple Provisioning Glossary) and `ios-lifecycle/00-enrollment-overview.md` (start-here).
- **Service Desk (L1) subsection:** 4 rows
  - iOS Enrollment Path Overview (start-here per D-26)
  - iOS Triage Decision Tree (`decision-trees/07-ios-triage.md`)
  - iOS L1 Runbooks (`l1-runbooks/00-index.md#ios-l1-runbooks`)
  - L1 Quick-Reference Card (`quick-ref-l1.md#iosipados-quick-reference` — forward reference to Wave 3 Plan 32-06)
- **Desktop Engineering (L2) subsection:** 5 rows
  - iOS Enrollment Path Overview (review)
  - iOS ADE Lifecycle (`ios-lifecycle/01-ade-lifecycle.md`)
  - iOS Log Collection Guide (`l2-runbooks/14-ios-log-collection.md`)
  - iOS L2 Runbooks (`l2-runbooks/00-index.md#ios-l2-runbooks`)
  - L2 Quick-Reference Card (`quick-ref-l2.md#iosipados-quick-reference` — forward reference to Wave 3 Plan 32-07)
- **Admin Setup subsection:** 6 rows using 3-row-bundle grouping per plan pattern
  - iOS Admin Setup Overview (`admin-setup-ios/00-overview.md`)
  - iOS ADE Lifecycle review row
  - 3 corporate ADE prerequisites bundle: APNs + ABM/ADE Token + ADE Enrollment Profile
  - 3 config/apps/compliance bundle: Configuration Profiles + App Deployment + Compliance Policy
  - 3 BYOD/MAM bundle: Device Enrollment + User Enrollment + MAM-WE App Protection
  - iOS Capability Matrix (`reference/ios-capability-matrix.md`)
- **Version History row** added at top of history table: `2026-04-17 | Phase 32: added iOS/iPadOS Provisioning section (L1/L2/Admin Setup subsections) + Choose Your Platform third entry + trilateral H1 narrative | -- |`

## iOS Provisioning H2 Structure (subsection row counts)

| Subsection | Rows | Exceeds Must-Have? |
|------------|------|--------------------|
| Service Desk (L1) | 4 | Meets (must-have ≥4 per plan must_haves truth #2) |
| Desktop Engineering (L2) | 5 | Exceeds (must-have ≥3 per plan must_haves truth #3) |
| Admin Setup | 6 | Meets (must-have ≥6 per plan must_haves truth #4) |

All 10 admin-setup-ios filenames referenced:
- `00-overview.md`, `01-apns-certificate.md`, `02-abm-token.md` (W4 compliance — NOT `02-abm-ade-token.md`), `03-ade-enrollment-profile.md`, `04-configuration-profiles.md`, `05-app-deployment.md`, `06-compliance-policy.md`, `07-device-enrollment.md`, `08-user-enrollment.md`, `09-mam-app-protection.md`

## Filename Corrections Applied to Admin Setup Table

None — the plan's specified filenames matched on-disk filenames exactly after the W4 fix (`02-abm-token.md`, not `02-abm-ade-token.md`). Directory listing of `docs/admin-setup-ios/` confirmed all 10 files present before insertion.

## Acceptance Criteria Verification

| Check | Expected | Actual | Status |
|-------|----------|--------|--------|
| `grep -c "^## iOS/iPadOS Provisioning" docs/index.md` | 1 | 1 | PASS |
| iOS section H3 subsections | 3 | 3 (Service Desk, Desktop Engineering, Admin Setup) | PASS |
| `grep -c "admin-setup-ios/02-abm-token.md"` | 1 | 1 | PASS (W4) |
| `grep -c "admin-setup-ios/02-abm-ade-token.md"` | 0 | 0 | PASS (W4) |
| `grep -c "ios-lifecycle/00-enrollment-overview.md"` | ≥2 | 4 | PASS |
| All 10 admin-setup-ios filenames referenced | 10 | 10 | PASS |
| `l1-runbooks/00-index.md#ios-l1-runbooks` anchor link | 1 | 1 | PASS |
| `l2-runbooks/00-index.md#ios-l2-runbooks` anchor link | 1 | 1 | PASS |
| Choose Your Platform iOS entry | 1 | 1 | PASS |
| `link-check.sh docs/index.md` | exit 0 OR expected forward-reference warnings | 2 warnings (both to `#iosipados-quick-reference` in quick-ref-l1/l2 — expected pre-Wave-3) | EXPECTED (see below) |

## Link Check Output (Expected Forward-Reference Warnings)

`link-check.sh` flagged 2 warnings:
- `docs/index.md:141 -> docs/quick-ref-l1.md#iosipados-quick-reference (anchor not found)`
- `docs/index.md:151 -> docs/quick-ref-l2.md#iosipados-quick-reference (anchor not found)`

**Both are EXPECTED pre-Wave-3 forward references** per plan context explicit instruction: "Plans 32-06 and 32-07 haven't shipped yet — these anchors will be created in Wave 3. Plan 32-05 links to them forward; link-check.sh will warn until Wave 3 completes. This is expected."

Plan 32-08 (Wave 4 validation) will re-run link-check after Wave 3 completes; these warnings will resolve automatically without additional edits.

All other anchor targets verified present:
- `#ios-l1-runbooks` in `docs/l1-runbooks/00-index.md` (shipped by Plan 32-00)
- `#ios-l2-runbooks` in `docs/l2-runbooks/00-index.md` (shipped by Phase 31)
- All 10 admin-setup-ios files on disk
- All iOS lifecycle, decision-tree, and L2 log-collection files on disk

## Regression Check

- macOS Provisioning section (lines 94-126) UNCHANGED — verified by reading section post-edit.
- Pre-existing Windows Autopilot sections (lines 24-91) UNCHANGED.
- Cross-Platform References table (lines 166-183) UNCHANGED except preserves Plan 02's iOS rows at lines 182-183 (iOS Enrollment Path Overview + iOS Capability Matrix).
- Frontmatter (lines 1-7) UNCHANGED — Plan 02 had already bumped `last_verified: 2026-04-17` and `review_by: 2026-07-16`.
- Platform coverage blockquote (line 9) UNCHANGED — Plan 02 had already updated to trilateral phrasing.
- All pre-existing links in index.md remain valid (SC #4 regression preserved).

## Deviations from Plan

None — plan executed exactly as written. W4 fix (`02-abm-token.md`) was already baked into the plan's Admin Setup table; directory listing confirmed the actual filename matches.

## Auth Gates

None encountered.

## Known Stubs

None — no placeholder text or empty rendering in this plan's edits. All table rows point to on-disk files or intentionally forward-referenced anchors documented above.

## Self-Check: PASSED

- [x] `docs/index.md` exists and contains `## iOS/iPadOS Provisioning` H2 (line 130)
- [x] 3 iOS subsections (Service Desk, Desktop Engineering, Admin Setup) present
- [x] Choose Your Platform iOS entry at line 20
- [x] H1 narrative updated to trilateral framing at line 14
- [x] Version History row added for this plan
- [x] No macOS or Windows section regressions
- [x] W4 compliance: `02-abm-token.md` (not `02-abm-ade-token.md`)
- [x] Commit for this plan will be recorded separately (single commit per plan commit spec)
