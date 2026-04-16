---
phase: 26-ios-ipados-foundation
plan: "02"
subsystem: documentation
tags: [ios, ipados, ade, lifecycle, supervision, mdm, apns]
dependency_graph:
  requires:
    - 26-01 (enrollment path overview with supervision concept)
    - docs/macos-lifecycle/00-ade-lifecycle.md (structural template)
    - docs/_glossary-macos.md (terminology references)
  provides:
    - docs/ios-lifecycle/01-ade-lifecycle.md (7-stage iOS ADE lifecycle)
  affects:
    - Phase 27 (admin setup guides reference stage names from this doc)
    - Phase 30-31 (L1/L2 runbooks reference enrollment stages)
tech_stack:
  added: []
  patterns:
    - 7-stage lifecycle narrative with 4 subsections per stage (What the Admin Sees / What Happens / Behind the Scenes / Watch Out For)
    - Supervision preamble before Stage 1 as conceptual anchor
    - iOS-specific Setup Assistant pane enumeration (Touch ID/Face ID, Screen Time, Emergency SOS, etc.)
    - Single-channel APNs-only MDM management narrative (no IME)
    - VPP device-licensed Company Portal deployment pattern
key_files:
  created:
    - docs/ios-lifecycle/01-ade-lifecycle.md
  modified: []
decisions:
  - "Stage 2 delta sync interval set to 12h for iOS (macOS uses 24h) — verified against Microsoft Learn iOS ADE documentation"
  - "ACME certificate threshold stated as iOS 16.0+ / iPadOS 16.1+ (macOS uses 13.1+) per D-11"
  - "Stage 7 written as single-channel APNs-only with explicit statement that there is no iOS IME equivalent per D-07"
  - "Stage 6 Company Portal documented as VPP device-licensed App Store app — no DMG/PKG deployment per D-09"
  - "Supervision section placed as dedicated preamble before Stage 1 with enrollment-time constraint and full device erase language per D-06/D-12/D-13"
  - "iOS-specific Setup Assistant panes enumerated in Stage 4 Behind the Scenes (Touch ID/Face ID, Apple Pay, Screen Time, SIM Setup, Emergency SOS, Action button, Apple Intelligence, Camera button, Web content filtering) per D-08"
metrics:
  duration_seconds: 427
  completed_date: "2026-04-16"
  tasks_completed: 2
  tasks_total: 2
  files_created: 1
  files_modified: 0
  lines_written: 404
---

# Phase 26 Plan 02: iOS ADE Lifecycle Document Summary

**One-liner:** 7-stage iOS/iPadOS ADE lifecycle narrative with supervision preamble, iOS-specific Setup Assistant panes, APNs-only Stage 7 (no IME), and VPP-deployed Company Portal — mirroring macOS 7-stage format with all iOS-specific adaptations applied.

## What Was Built

Created `docs/ios-lifecycle/01-ade-lifecycle.md` — a 404-line, self-contained document covering the complete iOS/iPadOS ADE enrollment pipeline from ABM device registration through home screen delivery and ongoing MDM management.

The document mirrors the macOS ADE lifecycle 7-stage format (established in v1.2) while applying six deliberate iOS-specific adaptations:

1. **Supervision preamble** — Dedicated section before Stage 1 explaining what supervision is, that it is set at enrollment time, and that changing it requires a full device erase (not selective wipe). Includes Settings > General > About verification and forward-reference to supervised-only callout pattern.

2. **Stage 2 sync interval** — 12-hour delta sync for iOS (not 24h as in macOS). Verified against Microsoft Learn iOS ADE documentation.

3. **Stage 4 Setup Assistant panes** — iOS-specific panes enumerated (Touch ID/Face ID, Apple Pay, Screen Time, SIM Setup, Emergency SOS, Action button, Apple Intelligence, Camera button, Web content filtering). macOS panes (FileVault, Migration Assistant) are absent.

4. **Stage 4 ACME threshold** — iOS 16.0+ / iPadOS 16.1+ (macOS uses 13.1+).

5. **Stage 6 Company Portal** — Deployed as VPP device-licensed App Store app via Apps and Books in ABM. Explicit Do NOT deploy from App Store / Do NOT deploy as DMG or PKG.

6. **Stage 7 single-channel management** — APNs-only MDM. Explicit statement that there is no Intune Management Extension equivalent on iOS. No shell scripts, no DMG/PKG app deployment, no direct filesystem inspection. L2 diagnostic methods documented as Company Portal log upload, MDM diagnostic report, and Mac+cable sysdiagnose.

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 | `087e2ab` | Create iOS ADE lifecycle stages 1-4 with supervision preamble |
| Task 2 | `ef3a83e` | Complete iOS ADE lifecycle stages 5-7 and closing sections |

## Verification Results

All plan acceptance criteria satisfied:

- File exists at `docs/ios-lifecycle/01-ade-lifecycle.md` (404 lines, exceeds 300 minimum)
- Frontmatter: `platform: iOS`, `applies_to: ADE`, `audience: all`
- Version gate links to `00-enrollment-overview.md`, `../macos-lifecycle/00-ade-lifecycle.md`, `../_glossary-macos.md`
- Supervision section precedes Stage 1 with "full device erase" phrase (3 occurrences)
- Supervision section contains `Settings > General > About` verification
- Supervision section contains "supervised-only callout pattern" forward reference
- Mermaid pipeline diagram with 7 stages and conditional User Affinity branch
- Stage Summary Table has 7 rows with iOS-specific values (12h sync, VPP, single MDM channel)
- All 7 stages present with exactly 4 subsections each (7 × 4 = 28 subsections verified)
- Stage 2 states 12h delta sync interval (not 24h)
- Stage 4 lists iOS-specific panes including Touch ID/Face ID, Apple Pay, Screen Time, SIM Setup, Emergency SOS, Action button, Apple Intelligence, Camera button
- Stage 4 states ACME threshold as iOS 16.0+ / iPadOS 16.1+
- Stage 4 lists key endpoints: deviceenrollment.apple.com, iprofiles.apple.com, mdmenrollment.apple.com
- Stage 5 states apps NOT included during hold and iOS 13+ requirement
- Stage 6 describes Company Portal as VPP App Store app; "Do NOT deploy Company Portal by asking users to download it from the App Store"
- Stage 7 describes single-channel APNs-only MDM; explicitly states no IME equivalent on iOS
- Stage 7 states APNs certificate is shared across all Apple platforms
- See Also links to `00-enrollment-overview.md` and `../macos-lifecycle/00-ade-lifecycle.md`
- Zero macOS-specific content: no FileVault, no Migration Assistant, no 24h sync, no 13.1+ ACME threshold
- IME references only appear in explicit-absence context ("no equivalent", "There is no second management channel")

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — the document contains no placeholder content. All stages have substantive technical content with no hardcoded empty values, placeholder text, or unresolved TODO items.

## Self-Check: PASSED

- File exists: `docs/ios-lifecycle/01-ade-lifecycle.md` — FOUND
- Commit `087e2ab` exists — FOUND
- Commit `ef3a83e` exists — FOUND
