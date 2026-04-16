---
phase: 27-ios-admin-setup-corporate-ade-path
plan: "02"
subsystem: docs
tags: [ios, admin-setup, apns, abm, ade-token, cross-reference]
dependency_graph:
  requires:
    - docs/_templates/admin-template-ios.md (from 27-01)
    - docs/admin-setup-ios/00-overview.md (from 27-01)
    - docs/admin-setup-macos/01-abm-configuration.md (cross-reference target)
  provides:
    - docs/admin-setup-ios/01-apns-certificate.md
    - docs/admin-setup-ios/02-abm-token.md
  affects:
    - docs/admin-setup-ios/03-ade-enrollment-profile.md (not yet created — prerequisite link in 02)
    - docs/admin-setup-ios/00-overview.md (forward links to 01 and 02 now resolved)
tech_stack:
  added: []
  patterns:
    - cross-reference strategy (D-05/D-06/D-07): macOS guide as single source of truth for shared portal steps
    - What breaks if misconfigured callouts with portal + symptom specificity
    - APNs renew-not-replace as highest-severity callout pattern
    - iOS-specific difference inline annotation per cross-referenced step
key_files:
  created:
    - docs/admin-setup-ios/01-apns-certificate.md
    - docs/admin-setup-ios/02-abm-token.md
  modified: []
decisions:
  - APNs guide scoped to creation, renewal, and cross-platform expiry impact only (no troubleshooting per D-10)
  - Renew-not-replace rule is the most prominent What breaks callout in the entire guide (D-09)
  - ABM token guide uses 4 cross-reference links to macOS ABM guide steps — no macOS portal click-paths duplicated (D-06)
  - iOS-specific difference stated for each of the 4 steps, including "None" for Step 1 (D-07)
  - Token Limits table added at discretion — verified facts from RESEARCH.md, not in macOS guide
metrics:
  duration: ~12 minutes
  completed: 2026-04-16
  tasks_completed: 2
  files_created: 2
  files_modified: 0
---

# Phase 27 Plan 02: APNs Certificate and ABM/ADE Token Guides Summary

APNs certificate guide (creation, renewal, cross-platform expiry warning) and ABM/ADE token guide (structured cross-reference to macOS ABM guide with iOS-specific differences inline), establishing the two infrastructure prerequisite guides for iOS/iPadOS corporate ADE setup.

## What Was Built

**Task 1: APNs Certificate Guide** (`docs/admin-setup-ios/01-apns-certificate.md`)

Created following the iOS admin template structure with:
- `platform: iOS`, `last_verified: 2026-04-16`, `applies_to: ADE` frontmatter
- Platform gate blockquote linking to macOS overview, glossary, and portal navigation note
- Introductory paragraph establishing APNs as shared cross-platform infrastructure (iOS + iPadOS + macOS)
- Prerequisites with company email address Apple ID requirement and "What breaks" callout for personal Apple ID use
- 3-step creation process: CSR download from Intune, certificate creation at Apple Push Certificates Portal, upload to Intune
- "What breaks if misconfigured" callouts on wrong CSR and wrong Apple ID scenarios
- Renewal section with **renew-not-replace rule as highest-severity callout** — creating a new certificate breaks ALL enrolled Apple devices simultaneously
- Renewal steps clearly separated into portals (Intune admin center > Apple Push Certificates Portal > Intune admin center)
- Additional "What breaks" callout for wrong Apple ID at renewal time
- Verification checklist (4 items)
- Configuration-Caused Failures table (5 rows)
- Renewal/Maintenance table with annual 365-day cycle and immediate ALL-devices consequence
- See Also with link to 02-abm-token.md and Next step footer

**Task 2: ABM/ADE Token Guide** (`docs/admin-setup-ios/02-abm-token.md`)

Created using structured cross-reference strategy (D-05/D-06/D-07) with:
- `platform: iOS`, `last_verified: 2026-04-16`, `applies_to: ADE` frontmatter
- Platform gate blockquote and introductory paragraph identifying macOS cross-reference approach
- Apple School Manager (ASM) acknowledged as functionally identical to ABM in one sentence
- Prerequisites with APNs certificate as prerequisite #1 linking to 01-apns-certificate.md
- "What breaks if misconfigured" callout for personal Apple ID on token creation
- "How iOS ADE Token Setup Differs from macOS" comparison table: device type filter, platform selection, 12h vs 24h delta sync, IMEI lookup
- 4 steps each using structured cross-reference pattern (D-05):
  - Step 1: Cross-reference to macOS Step 1; iOS-specific difference = None (explicitly stated per D-07)
  - Step 2: Cross-reference to macOS Step 2; iOS-specific difference = naming convention for separate MDM servers
  - Step 3: Cross-reference to macOS Step 3; iOS-specific difference = select iOS/iPadOS platform
  - Step 4: Cross-reference to macOS Step 4; iOS-specific difference = iPhone/iPad filter + IMEI lookup
- "What breaks" callout for device assigned after first power-on
- Token Sync Mechanics table: 12h delta (faster than macOS 24h), 15min manual rate limit, 7-day full sync
- Token Limits table: 1,000 profiles/token, 200,000 devices/profile, 2,000 tokens/tenant
- Verification checklist (5 items including Platform shows iOS/iPadOS check)
- Configuration-Caused Failures table (5 rows)
- Renewal/Maintenance table (ADE token annual + ABM Terms of Service ad-hoc)
- See Also with link to 01-apns-certificate.md and Next step footer to 03-ade-enrollment-profile.md

## Decisions Made

1. **Renew-not-replace callout format:** Used the "What breaks if misconfigured" blockquote convention with bold emphasis on "NEW", "renewing", "ALL", and "Always renew. Never create new." — the single most prominent callout in the guide, per D-09.
2. **Token Limits table:** Added at discretion (not in macOS ABM guide, not explicitly required by plan) — includes verified limits from RESEARCH.md (1,000 profiles/token, 200,000 devices/profile, 2,000 tokens/tenant). Adds value for admins planning multi-platform deployments.
3. **Step 1 iOS difference as "None":** Explicitly stated per D-07 ("If the macOS ABM guide section has no iOS-specific differences, a single sentence with the cross-reference link is sufficient"). "None" is stated clearly rather than omitting the difference section entirely.
4. **ABM token renewal steps in Renewal/Maintenance table:** Provided as inline text in the table rather than linking to a separate section — renewal is simpler than APNs (no Apple portal visit required) and fits in the table cell.
5. **6 cross-reference links to macOS ABM guide:** One per step (Steps 1-4) plus comparison table title link and See Also link — 4 are the step-level links required by acceptance criteria.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

- **Link to `03-ade-enrollment-profile.md`** in both guides: Forward reference to guide created in Plan 03. Intentional — the file does not exist yet but the link is correct per D-12 dependency chain and overview sequence. Plan 03 resolves this stub.
- **Runbook links:** Configuration-Caused Failures tables reference "iOS L1 runbooks (Phase 30)" as plain text, not links. These runbooks do not exist yet — they are created in Phase 30. This is consistent with the iOS admin template comment and the pattern established in 27-01 guides.

## Self-Check: PASSED

| Item | Status |
|------|--------|
| docs/admin-setup-ios/01-apns-certificate.md | FOUND |
| docs/admin-setup-ios/02-abm-token.md | FOUND |
| .planning/phases/27-ios-admin-setup-corporate-ade-path/27-02-SUMMARY.md | FOUND |
| Commit 8536ab7 (Task 1: APNs certificate) | FOUND |
| Commit 62808f3 (Task 2: ABM/ADE token) | FOUND |
