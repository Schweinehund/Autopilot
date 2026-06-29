---
phase: 98-guide-07-comprehensive-pass
plan: "01"
subsystem: docs/admin-setup-macos
tags: [documentation, platform-sso, acc-03, ts-02, d-03, d-04]
dependency_graph:
  requires: []
  provides: [ACC-03-VPP-fix, TS-02-ADE-prerequisites-augmented, D-03-A1A2-pointer, D-04-stamp-bump]
  affects: [docs/admin-setup-macos/07-platform-sso-setup.md]
tech_stack:
  added: []
  patterns: [surgical-doc-edit, augment-not-duplicate, slug-discipline]
key_files:
  created: []
  modified:
    - docs/admin-setup-macos/07-platform-sso-setup.md
decisions:
  - D-03 honored — A1/A2 equivalence pointer placed in Advanced section body prose only; no heading renamed
  - TS-02 user-license row framed as standard Intune requirement (Pitfall 5) not A2-exclusive per CONTEXT.md
  - Three net-new rows added to existing ADE Path Prerequisites table — no duplicate table created (D-01)
metrics:
  duration: "4m"
  completed: "2026-06-29"
  tasks_completed: 2
  files_modified: 1
---

# Phase 98 Plan 01: ACC-03 VPP fix + TS-02 ADE Prerequisites augmentation Summary

ACC-03 VPP removal (macOS CP is always LOB/PKG), Step 2 callout reworded to separate install target from assignment target, and three net-new TS-02 rows added to the existing ADE Path Prerequisites table with A1/A2 equivalence pointer and D-04 lockstep stamp bump.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | ACC-03 — Remove VPP Company Portal option and reword Step 2 deploy callout | ac7b282 | docs/admin-setup-macos/07-platform-sso-setup.md |
| 2 | TS-02 — Augment ADE Prerequisites table, add A1/A2 pointer, bump line-311 stamp | 3581df0 | docs/admin-setup-macos/07-platform-sso-setup.md |

## What Was Done

### Task 1 — ACC-03

- **Line 126:** Removed `VPP from Apps and Books or as a` from the Company Portal deploy instruction. The line now reads "Deploy via Intune as a managed app (DMG/PKG line-of-business app)" — correctly reflecting that macOS CP is always LOB/PKG (VPP/Apps-and-Books applies to iOS/iPadOS CP only, as verified in guide 01 line 172).
- **Lines 129–134 callout:** Rewrote the "Deploy to the device" callout to explicitly label **install target** (the device — where the Enterprise SSO plug-in must reside) and **assignment target** (user group for user-affinity fleets, device group for shared/userless Macs). The existing Step 4 and Advanced section cross-references are preserved.

### Task 2 — TS-02 + D-03 + D-04

- **Three net-new rows** added to the existing `### ADE Path Prerequisites` table (augment-not-duplicate per D-01):
  - `User license` — active Microsoft Intune license required; framed as standard Intune prerequisite, commonly overlooked as an A2 failure point (Pitfall 5 — not presented as A2-exclusive)
  - `Company Portal Included apps` — only `com.microsoft.CompanyPortalMac` in the LOB app's App bundle ID list (VERIFIED via Microsoft Learn configure-platform-sso-during-enrollment.md)
  - `Enrollment profile device targeting` — ABM device/serial assignment bridged to Intune user-group assignment by user affinity (ASSUMED standard ADE behavior, framed accordingly)
- **A1/A2 equivalence pointer** added in Advanced section body prose immediately after the provenance stamp blockquote, linking to `../macos-lifecycle/01-psso-provisioning-walkthrough.md#which-path-is-right-for-you` (D-03 — body prose only, no heading touched)
- **Lockstep stamp bump** (D-04): Advanced section per-section stamp updated `last_verified: 2026-06-20 → 2026-06-29` and `review_by: 2026-09-20 → 2026-09-29` (+3-month/same-day-of-month invariant preserved)

## Deviations from Plan

None — plan executed exactly as written. Both [ASSUMED] claims (Intune-licensed user; enrollment-profile device-serial bridged by user affinity) were framed per Pitfall 5 and standard ADE behavior as specified by CONTEXT.md.

## Acceptance Criteria Verification

| Criterion | Status |
|-----------|--------|
| "VPP from Apps and Books" removed — zero occurrences | PASS |
| Step 2 deploy bullet describes CP as LOB/PKG managed app | PASS |
| "Deploy to the device" callout contains "install target" + "device" wording AND "assignment target" split (user group / device group) | PASS |
| ADE Path Prerequisites table contains `com.microsoft.CompanyPortalMac` Included-apps row | PASS |
| Table contains User license row and enrollment-profile device-targeting row (three net-new rows total) | PASS |
| Exactly one occurrence of `01-psso-provisioning-walkthrough.md#which-path-is-right-for-you` | PASS (count=1) |
| `## Advanced / Optional: ADE-during-Setup-Assistant` heading byte-identical | PASS |
| `last_verified: 2026-06-29` and `review_by: 2026-09-29` present | PASS |
| No second A2-requirements table (no `### ADE Company Portal Requirements`) | PASS |
| All four critical H2 headings byte-identical (slug discipline) | PASS |

## Known Stubs

None — all content is wired. The three new table rows contain their final values; no placeholder text or TODO items.

## Threat Flags

None — pure markdown documentation edit. No network endpoints, auth paths, file access patterns, or schema changes introduced.

## Self-Check: PASSED

- docs/admin-setup-macos/07-platform-sso-setup.md — FOUND
- .planning/phases/98-guide-07-comprehensive-pass/98-01-SUMMARY.md — FOUND
- Commit ac7b282 (Task 1) — FOUND
- Commit 3581df0 (Task 2) — FOUND
