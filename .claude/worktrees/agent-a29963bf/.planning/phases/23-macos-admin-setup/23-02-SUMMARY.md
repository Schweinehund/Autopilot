---
phase: 23-macos-admin-setup
plan: "02"
subsystem: docs
tags: [intune, macos, configuration-profiles, compliance-policies, settings-catalog, filevault, gatekeeper, sip]

# Dependency graph
requires:
  - phase: 22-macos-lifecycle-foundation
    provides: macOS ADE lifecycle narrative, glossary, reference files
  - phase: 20-cross-platform-foundation
    provides: macOS admin template, platform frontmatter taxonomy
provides:
  - "macOS configuration profiles guide covering 9 profile types with Settings Catalog paths"
  - "macOS compliance policy guide with all compliance settings and no-security-baselines callout"
  - "Compliance vs configuration distinction documentation (detect vs enforce)"
affects: [23-macos-admin-setup, 24-macos-troubleshooting]

# Tech tracking
tech-stack:
  added: []
  patterns: [settings-catalog-navigation-paths, dual-surface-documentation, compliance-vs-configuration-pairing]

key-files:
  created:
    - docs/admin-setup-macos/03-configuration-profiles.md
    - docs/admin-setup-macos/05-compliance-policy.md
  modified: []

key-decisions:
  - "Used H2 sections per profile type for maximum clarity (9 profile types including PPPC and Extensible SSO)"
  - "FileVault and firewall documented as dual-surface settings requiring both config profile and compliance policy"
  - "SIP documented as compliance-check-only with explicit cannot-be-enforced-via-MDM callout"

patterns-established:
  - "Settings Catalog path pattern: Devices > Manage devices > Configuration > Create > New policy > Settings catalog > [Category] > [Setting]"
  - "Dual-surface documentation: settings with both config profile and compliance policy get explicit pairing notes in both guides"
  - "What-breaks callouts include cross-portal symptom visibility (where the misconfiguration occurs vs where the symptom manifests)"

requirements-completed: [MADM-03, MADM-05]

# Metrics
duration: 5min
completed: 2026-04-14
---

# Phase 23 Plan 02: Configuration Profiles & Compliance Policies Summary

**macOS configuration profiles guide (9 profile types with Settings Catalog paths) and compliance policy guide with explicit no-security-baselines callout and compliance-vs-configuration distinction**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-14T21:51:20Z
- **Completed:** 2026-04-14T21:56:13Z
- **Tasks:** 2
- **Files created:** 2

## Accomplishments
- Configuration profiles guide covering Wi-Fi, VPN, Email, Restrictions, FileVault, Firewall, Gatekeeper, PPPC, and Extensible SSO with Settings Catalog navigation paths
- Compliance policy guide documenting all macOS compliance settings with explicit "No Intune security baselines for macOS" callout
- Compliance vs Configuration distinction table clarifying detect (compliance) vs enforce (configuration profile) for FileVault, firewall, Gatekeeper, SIP, and encryption
- 19 total "what breaks if misconfigured" callouts across both guides (14 in config profiles, 5 in compliance)
- Bidirectional cross-references between guides for enforce/detect pairing
- WSEC-01 cross-reference to ca-enrollment-timing.md per D-18

## Task Commits

Each task was committed atomically:

1. **Task 1: Create macOS configuration profiles guide (MADM-03)** - `27dcf2f` (feat)
2. **Task 2: Create macOS compliance policy guide (MADM-05)** - `b61aadf` (feat)

## Files Created/Modified
- `docs/admin-setup-macos/03-configuration-profiles.md` - Configuration profiles guide with 9 profile types, Settings Catalog paths, what-breaks callouts, and Configuration-Caused Failures table (251 lines)
- `docs/admin-setup-macos/05-compliance-policy.md` - Compliance policy guide with all settings, no-baselines callout, compliance vs config distinction, and WSEC-01 cross-reference (172 lines)

## Decisions Made
- Used H2 sections per profile type (9 total) rather than grouping related profiles -- maximizes navigability
- Documented FileVault and firewall as dual-surface settings requiring both configuration profile and compliance policy with explicit pairing notes in both guides
- Documented SIP as compliance-check-only with explicit note that MDM cannot enable/disable SIP
- Included PPPC and Extensible SSO as additional profile types beyond the plan's minimum 6
- Endpoint protection template deprecation noted prominently at top of configuration profiles guide

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Configuration profiles and compliance policy guides complete
- Ready for plans 03 and 04 (app deployment, overview, config failures, capability matrix)
- `[TBD - Phase 24]` runbook links in both files await macOS troubleshooting phase

## Self-Check: PASSED

- [x] docs/admin-setup-macos/03-configuration-profiles.md exists
- [x] docs/admin-setup-macos/05-compliance-policy.md exists
- [x] .planning/phases/23-macos-admin-setup/23-02-SUMMARY.md exists
- [x] Commit 27dcf2f exists
- [x] Commit b61aadf exists

---
*Phase: 23-macos-admin-setup*
*Completed: 2026-04-14*
