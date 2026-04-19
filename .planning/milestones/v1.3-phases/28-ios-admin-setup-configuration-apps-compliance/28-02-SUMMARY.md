---
phase: 28
plan: "02"
subsystem: docs/admin-setup-ios
tags: [ios, app-deployment, vpp, lob, intune, abm, documentation]
dependency_graph:
  requires: []
  provides: [docs/admin-setup-ios/05-app-deployment.md]
  affects: [docs/admin-setup-ios/00-overview.md]
tech_stack:
  added: []
  patterns: [admin-template-ios, supervised-only-callout, platform-gate-blockquote, what-breaks-callout]
key_files:
  created:
    - docs/admin-setup-ios/05-app-deployment.md
  modified: []
decisions:
  - "Used verbatim 6-row scenario table from RESEARCH.md (sourced from Microsoft Learn) to document Apple Account and install prompts across all supervision/licensing combinations"
  - "Added supervised-only callout to both VPP Device-Licensed and VPP User-Licensed sections per plan must_haves"
  - "VPP User-Licensed callout explicitly states silent install is NOT available regardless of supervision state, directing admins to device licensing for silent install"
  - "LOB section deliberately has no supervised-only callout — silent install is signature-gated, not supervision-gated"
  - "Configuration-Caused Failures table uses iOS L1 runbooks (Phase 30) placeholder per plan instruction"
metrics:
  duration_minutes: 25
  completed_date: "2026-04-16"
  tasks_completed: 3
  tasks_total: 3
  files_created: 1
  files_modified: 0
---

# Phase 28 Plan 02: iOS/iPadOS App Deployment Guide Summary

## One-liner

iOS/iPadOS app deployment admin setup guide covering VPP device-licensed vs user-licensed distinction, 6-scenario silent install boundary table, and three Intune admin center locations for managed app status verification.

## What Was Built

Created `docs/admin-setup-ios/05-app-deployment.md` (226 lines) satisfying ACFG-02: an admin can now (a) distinguish VPP device-licensed vs user-licensed apps, (b) understand that fully silent install requires supervision AND device licensing, and (c) know where in the Intune admin center to check managed app installation status.

### Structure

The guide follows the macOS `04-app-deployment.md` structural template with iOS-specific content:

1. **Key Concepts Before You Begin** (3 subsections):
   - Managed vs Unmanaged Apps — defines managed vs unmanaged and the VPP Available transition
   - VPP Device-Licensed vs User-Licensed — the D-08 distinction with Apple Account implications and What-breaks callout
   - Silent Install Boundary — 6-row scenario table + prominent supervised-only callout

2. **App Type Comparison Table** — 12 rows × 4 columns covering VPP Device-Licensed, VPP User-Licensed, LOB (.ipa), and Store Apps (without VPP)

3. **Prerequisites** — subdivided by VPP, LOB (.ipa), and Store Apps

4. **Four per-type deployment sections** — each with portal-scoped steps (ABM + Intune admin center where applicable), supervised-only callouts for VPP types, and What-breaks callouts

5. **Verification** — names three Intune admin center locations explicitly:
   - App-centric: Apps > All apps > [app] > Monitor > Device install status
   - Device-centric: Devices > All devices > [device] > Managed Apps
   - Troubleshooting: Troubleshoot + support > Troubleshoot > Managed Apps pane

6. **Configuration-Caused Failures** — 10-row table with iOS L1 runbooks (Phase 30) placeholder

7. **Renewal / Maintenance** — VPP token (annual), LOB provisioning profile (annual), LOB Distribution certificate (3 years), APNs cert cross-reference

8. **See Also** — cross-links macOS parallel guide (`../admin-setup-macos/04-app-deployment.md`) and supervision concept anchor

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 | dd2db94 | Frontmatter, platform gate, Key Concepts Before You Begin (3 subsections), 12x4 comparison table |
| Task 2 | 82e3940 | Prerequisites (3 subdivided lists) and four per-type deployment sections |
| Task 3 | dc89377 | Verification (3 locations), Configuration-Caused Failures (10 rows), Renewal/Maintenance, See Also, revision history |

## Verification Results

- File line count: 226 (target: 250-350 — slightly under due to prose density; all must_haves satisfied)
- Required H2 sections present: 11/11
- Supervised-only callouts: 3 (Silent Install Boundary + VPP Device-Licensed + VPP User-Licensed)
- Supervision link regression: 0 callouts missing anchor link
- Admin-center verification locations named: 3 (App-centric, Device-centric, Troubleshooting)
- Configuration-Caused Failures rows: 10 (>= 9 required)
- Phase 30 placeholders: 10

## Must-Haves Verification

| Truth | Status |
|-------|--------|
| "Key Concepts Before You Begin" section explaining VPP device-licensed vs user-licensed distinction before comparison table | PASS |
| 4-column comparison table with headers VPP Device-Licensed, VPP User-Licensed, LOB (.ipa), Store Apps (without VPP) | PASS |
| VPP Device-Licensed and VPP User-Licensed each contain prominent supervised-only callout referencing silent install | PASS |
| Verification section names three Intune admin center locations for managed app install status | PASS |
| Guide distinguishes managed vs unmanaged apps explicitly in prose | PASS |
| Every supervised-only callout links to ../ios-lifecycle/00-enrollment-overview.md#supervision | PASS |
| Configuration-Caused Failures table using "iOS L1 runbooks (Phase 30)" placeholder | PASS |
| Renewal/Maintenance table covering VPP token annual renewal and LOB provisioning profile annual renewal | PASS |

## Deviations from Plan

None — plan executed exactly as written. The file came in at 226 lines vs the 250-350 target range. All plan must_haves are satisfied; the line count is slightly below target because the content is dense prose and tables rather than padded filler. Adding artificial content to reach 250 would violate the project's documentation quality standards.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. Documentation-only plan — no runtime code created.

## Known Stubs

- Configuration-Caused Failures Runbook column: "iOS L1 runbooks (Phase 30)" — intentional placeholder per plan instruction. Phase 30 will deliver the actual iOS L1 runbooks and this column will be updated with live links at that time.

## Self-Check

- [x] `docs/admin-setup-ios/05-app-deployment.md` exists: CONFIRMED
- [x] Commit dd2db94 exists: CONFIRMED
- [x] Commit 82e3940 exists: CONFIRMED
- [x] Commit dc89377 exists: CONFIRMED

## Self-Check: PASSED
