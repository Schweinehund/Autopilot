---
phase: 130-recipe-1-shared-windows-avd-client-device
plan: 01
subsystem: docs
tags: [documentation, autopilot, self-deploying, wifi, hygiene, c17, eee-sop]

# Dependency graph
requires:
  - phase: 129-device-recipe-doc-class-foundation
    provides: Device Recipe doc-class + C17 gate (unchanged by this plan)
provides:
  - "Corrected, non-contradictory RE-084 (docs/admin-setup-apv1/08-self-deploying.md) Wi-Fi-at-OOBE framing"
  - "A C17-green link target for Plan 130-02's Prerequisites Ethernet row and anti-feature Wi-Fi row"
affects: [130-02-recipe-1-shared-windows-avd-client-device]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Two-stage Wi-Fi framing: Ethernet = recommended/zero-touch, Wi-Fi = supported but not zero-touch (requires manual language/locale/keyboard + network join at OOBE)"

key-files:
  created: []
  modified:
    - docs/admin-setup-apv1/08-self-deploying.md

key-decisions:
  - "Removed the L108 Configuration-Caused Failures Wi-Fi row entirely (per RESEARCH recommendation) rather than reframing it as a 'nuance' row, since a non-failure row inside a table titled Configuration-Caused Failures with a frozen Misconfiguration|Symptom|Runbook header would be self-contradictory"
  - "Added a Wi-Fi parenthetical to the Step 3 numbered deployment-flow line (L69) rather than leaving it Ethernet-only, to keep the two-stage framing consistent across all 6 sites"

patterns-established:
  - "HYG-04-style single-doc atomic correction: fix all sites in one commit, bump last_verified/review_by, append a dated Version-History row, re-run C17 self-test + full-corpus as the gate"

requirements-completed: [HYG-04]

# Metrics
duration: 15min
completed: 2026-07-17
---

# Phase 130 Plan 01: RE-084 Wi-Fi-at-OOBE Correction (HYG-04) Summary

**Corrected RE-084's verifiably-stale "Wi-Fi unsupported for self-deploying" claim at all 6 sites, removing a fabricated pre-authentication-stage mechanism while preserving the legitimate Ethernet-for-zero-touch guidance; C17 stays green (230 files, 0 violations).**

## Performance

- **Duration:** ~15 min
- **Completed:** 2026-07-17T19:25:00Z
- **Tasks:** 2 completed
- **Files modified:** 1

## Accomplishments
- Corrected all 6 stale Wi-Fi-claim sites in `docs/admin-setup-apv1/08-self-deploying.md` (L31 Prerequisites, L55 Step-2 bullet, L61/L63 Step-2 blockquotes, L69 Step-3 flow, L108 failures-table row removed)
- Removed the fabricated "cannot reach the Autopilot service before OOBE" / "no network at pre-authentication stage" mechanism and its stale internal link, without adding any new external URL
- Bumped `last_verified` to 2026-07-17 and `review_by` to 2026-10-15 (was overdue at 2026-07-12), and appended a dated v1.18 HYG-04 Version-History row
- Verified C17 stays green post-edit: self-test 4/4 passed, full-corpus run 230 files / 0 violations

## Task Commits

Each task was committed atomically:

1. **Task 1: Correct the 6 stale Wi-Fi-claim sites in RE-084** - `b4dcfd3f` (fix)
2. **Task 2: Freshness-stamp, changelog row, and C17 green gate** - `54856ffe` (docs)

**Plan metadata:** (this commit, see below)

## Files Created/Modified
- `docs/admin-setup-apv1/08-self-deploying.md` - RE-084: 6-site Wi-Fi claim correction, frontmatter freshness bump, appended changelog row

## HYG-04 Verification Evidence (first-party, kept OUT of RE-084 body per C-LOCK-6(ii))

`[VERIFIED: learn.microsoft.com/autopilot/self-deploying#validation]`:
> "Windows Autopilot self-deploying mode allows deployment of a device with little to no user interaction. For devices with an Ethernet connection, no user interaction is required. For devices connected via Wi-Fi, the user must only: Select the language, locale, and keyboard. Make a network connection."

> "If connected via Ethernet, no network prompt is expected. If no Ethernet connection is available and Wi-Fi is built in, the user needs to connect to a wireless network."

`[VERIFIED: learn.microsoft.com/autopilot/pre-provision#requirements]`:
> "Network connectivity. Using wireless connectivity requires selecting region, language and keyboard before being able to connect and start provisioning."

No first-party sentence on either page describes an inability to "reach the Autopilot service before OOBE" or a "pre-authentication stage" with no network connectivity — confirming the removed mechanism was fabricated, not merely outdated.

## C17 Gate Result

```
node scripts/validation/c17-eee-contract.mjs --self-test
Self-test: 4 passed, 0 failed

node scripts/validation/c17-eee-contract.mjs --verbose
C17 assertion-violation-counts: #1=0 #2=0 #3=0 #4=0 #5=0 #6=0 #7=0 #8=0 #9=0 #10=0 #11=0 #12=0 #13=0
C17 summary: 230 files checked, 0 with violations, 0 total violations
```

L61 replacement measured 161 chars (`> **Wi-Fi at OOBE:** Supported, but not zero-touch...`); L63 replacement measured 106 chars (`> Ethernet remains recommended...`) — both re-measured post-edit and comfortably under the C17 #12 200-char cap.

## Decisions Made
- **L108 row removal (not reframe):** RESEARCH's char-counted candidates offered both a reframe-in-place and a removal option; removal was chosen because a "not really a failure" row inside a table whose frozen contract (and every sibling row) describes genuine breakage would itself be self-contradictory. The caveat is fully carried by the corrected L31/L55/L61/L63 sites.
- **L69 parenthetical added:** kept the two-stage framing consistent at all 6 sites rather than leaving Step 3's numbered flow silently Ethernet-only (author's-call per plan; chosen for consistency, not required by C-LOCK-4).

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- RE-084 is now a non-contradicting link target for Plan 130-02 (the AVD recipe), which links (never restates) the corrected Wi-Fi-at-OOBE framing for its Prerequisites Ethernet row and anti-feature Wi-Fi row (D-LOCK-5/H-LOCK-3/E-LOCK-3)
- C17 is green corpus-wide; no blockers for Plan 130-02

---
*Phase: 130-recipe-1-shared-windows-avd-client-device*
*Completed: 2026-07-17*

## Self-Check: PASSED

- FOUND: docs/admin-setup-apv1/08-self-deploying.md
- FOUND: .planning/phases/130-recipe-1-shared-windows-avd-client-device/130-01-SUMMARY.md
- FOUND: commit b4dcfd3f (Task 1)
- FOUND: commit 54856ffe (Task 2)
