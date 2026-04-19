---
phase: 27-ios-admin-setup-corporate-ade-path
plan: "03"
subsystem: docs
tags: [ios, admin-setup, ade, enrollment-profile, supervised-only, acorp-03]
dependency_graph:
  requires:
    - docs/_templates/admin-template-ios.md (Plan 01)
    - docs/admin-setup-ios/00-overview.md (Plan 01)
    - docs/ios-lifecycle/00-enrollment-overview.md (Phase 26 — #supervision anchor)
    - docs/ios-lifecycle/01-ade-lifecycle.md (Phase 26 — Stage 3/4 context)
  provides:
    - docs/admin-setup-ios/03-ade-enrollment-profile.md
  affects:
    - docs/admin-setup-ios/02-abm-token.md (prerequisite link target — forward reference)
    - Phase 28-32 iOS guides (inherit supervised-only callout pattern from this guide)
tech_stack:
  added: []
  patterns:
    - supervised-only callout pattern (D-01) — first real-world application, 2 instances
    - enrollment settings table with Corporate ADE Recommendation column
    - Setup Assistant panes table with iOS-specific panes and deprecated panes note
    - concepts-and-outcomes documentation style (D-17 — no click-paths)
key_files:
  created:
    - docs/admin-setup-ios/03-ade-enrollment-profile.md
  modified: []
decisions:
  - Exactly 2 supervised-only callouts placed on supervised mode and locked enrollment settings per D-03/D-04
  - Both callouts link to ios-lifecycle/00-enrollment-overview.md#supervision per D-02
  - No Renewal/Maintenance section — enrollment profiles have no renewable component
  - Authentication methods table documents all 3 options with modern auth as recommended and Company Portal as being phased out
  - D-17 concept-based approach: enrollment settings described by purpose and outcome, not UI click-paths
  - 30-day removal window note for non-ABM-purchased devices included under locked enrollment
metrics:
  duration: ~10 minutes
  completed: 2026-04-16
  tasks_completed: 1
  files_created: 1
  files_modified: 0
---

# Phase 27 Plan 03: ADE Enrollment Profile Guide Summary

ADE enrollment profile configuration guide for iOS/iPadOS corporate ADE deployments, establishing the supervised-only callout pattern in practice with supervised mode, authentication methods, Setup Assistant pane customization, locked enrollment, user affinity, and await final configuration — all documented as concepts and outcomes per D-17.

## What Was Built

**Task 1: ADE Enrollment Profile Guide** (`docs/admin-setup-ios/03-ade-enrollment-profile.md`)

Created the ADE enrollment profile configuration guide (ACORP-03) following the iOS admin template structure with:

- `platform: iOS`, `last_verified: 2026-04-16`, `applies_to: ADE` frontmatter
- Platform gate blockquote referencing macOS enrollment profile guide, glossary, and overview portal navigation note
- Introductory paragraph explaining this is the final step in the ADE prerequisite chain (APNs > ABM token > enrollment profile) and that the profile must be assigned before first power-on
- Prerequisites section linking to `02-abm-token.md`, `01-apns-certificate.md`, and noting Intune Administrator role requirement
- `## Key Concepts Before You Begin` section covering supervised mode (iOS 13+ auto-supervision, reason to set explicitly) and authentication methods table (3 options, modern auth recommended)
- Authentication methods What breaks callout for legacy method incompatibility with Conditional Access
- 4-step guide: Create profile, Configure enrollment settings, Configure Setup Assistant panes, Assign profile
- Enrollment settings table with 6 settings (User Affinity, Authentication method, Supervised, Locked enrollment, Await final configuration, Device name template) and Corporate ADE Recommendation column
- Per-setting detail sections with What breaks callouts for each configurable setting
- **2 supervised-only callouts** using exact D-01 format with lock emoji blockquote:
  1. On **supervised mode** — explains supervised capabilities and consequence of enrolling without supervision
  2. On **locked enrollment** — explains that locked enrollment requires supervised mode and that unsupervised devices can remove management profile
- Both callouts link to `../ios-lifecycle/00-enrollment-overview.md#supervision`
- 30-day removal window note for non-ABM-purchased devices (Apple Configurator-added) under locked enrollment
- Setup Assistant panes table: 28 rows covering all iOS/iPadOS-specific panes with min versions, recommendations, and notes
- Deprecated panes note: Zoom (iOS 17), Display Tone (iOS 15), Device to Device Migration (iOS 13+)
- What breaks note clarifying pane configuration is cosmetic only
- Step 4 assign profile section with default profile recommendation and What breaks for unassigned profiles
- Verification checklist with 9 items covering all critical settings
- Configuration-Caused Failures table with 6 rows
- No Renewal/Maintenance section (enrollment profiles have no renewable component)
- See Also section with 7 links including ABM token, APNs certificate, overview, ADE lifecycle, enrollment overview, macOS enrollment profile, and glossary
- Changelog footer

## Decisions Made

1. **Exactly 2 supervised-only callouts:** Only supervised mode and locked enrollment receive the D-01 callout. User affinity, authentication method, await final configuration, and device name template are all available regardless of supervision state — no callout on those.
2. **Callout placement (D-04 compliance):** Both callouts placed immediately after the setting description paragraph, before any configuration steps or What breaks callout for that setting.
3. **No Renewal/Maintenance section:** Enrollment profiles are not renewable components. The template specifies this section should be omitted when not applicable. Omitted per template instructions.
4. **Concepts-and-outcomes approach (D-17):** Step 1 creates the profile with a note about UI navigation variation. No UI click-paths for profile creation given the Q2 CY2026 navigation redesign in progress.
5. **Authentication methods table in Key Concepts:** Placed before the steps so admins understand the choice before reaching the configuration step. The What breaks callout for legacy auth placed in Key Concepts section where the methods are introduced.
6. **28-row Setup Assistant panes table:** Full iOS/iPadOS pane list from RESEARCH.md including iOS 26.0+ panes (Multitasking, OS Showcase), with deprecated panes documented in a separate note below the table rather than mixed into the table rows.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

- Link to `docs/admin-setup-ios/02-abm-token.md` in Prerequisites and See Also is a forward reference — that file is created in Plan 02 of this phase. The link is intentional and will resolve when Plan 02 completes.
- Configuration-Caused Failures table references "iOS L1 runbooks (Phase 30)" — Phase 30 L1 runbooks do not yet exist. This is intentional and consistent with the macOS admin guides that reference runbooks created in later phases.

## Self-Check: PASSED

| Item | Status |
|------|--------|
| docs/admin-setup-ios/03-ade-enrollment-profile.md | FOUND |
| Commit 49ec6a7 (Task 1) | FOUND |
| platform: iOS in frontmatter | FOUND |
| last_verified: 2026-04-16 | FOUND |
| Supervised only callout count = 2 | VERIFIED (grep -c returns 2) |
| Both callouts link to ios-lifecycle/00-enrollment-overview.md#supervision | VERIFIED (grep -c returns 3 — 2 in callouts + 1 in Key Concepts) |
| Authentication methods table covers all 3 options | FOUND |
| Setup Assistant panes table | FOUND (28 rows) |
| Deprecated panes note (Zoom iOS 17, Display Tone iOS 15) | FOUND |
| 30-day removal window note | FOUND |
| Verification checklist | FOUND (9 items) |
| Configuration-Caused Failures table (6 rows) | FOUND |
| No Renewal/Maintenance section | VERIFIED (grep returns no results) |
| No exact click-paths for profile creation | VERIFIED (note about navigation variation, no step-by-step portal path) |
| No platform: macOS | VERIFIED |
| Link to 02-abm-token.md as prerequisite | FOUND |
| Link to ios-lifecycle/01-ade-lifecycle.md in See Also | FOUND |
| .planning/phases/27-ios-admin-setup-corporate-ade-path/27-03-SUMMARY.md | FOUND |
