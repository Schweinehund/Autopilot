---
phase: 96-surgical-conflict-fixes
plan: 02
subsystem: docs
tags: [macos, l1-runbook, company-portal, user-affinity, ade, acc-04]

# Dependency graph
requires:
  - phase: 96-surgical-conflict-fixes
    provides: Phase 96 context and research (ACC-04 verbatim line quotes)
provides:
  - L1 runbook 15 step 4 corrected to user-group assignment for user-affinity devices
  - Freshness stamps bumped to 2026-06-28 / 2026-09-28
  - Phase 96 version-history row added
affects: [96-surgical-conflict-fixes, phase-100-harness]

# Tech tracking
tech-stack:
  added: []
  patterns: [surgical-prose-edit, +3-month-stamp-invariant, version-history-most-recent-first]

key-files:
  created: []
  modified:
    - docs/l1-runbooks/15-macos-company-portal-sign-in.md

key-decisions:
  - "Two exact phrasing replacements used so verification greps are deterministic: 'for this user's group' and 'to the user group'"
  - "review_by recomputed fresh from edit date (2026-06-28 + 3 months = 2026-09-28), not carried forward from pre-existing 07-13 offset"

patterns-established:
  - "Edit A/B/C pattern: prose correction first, frontmatter second, version-history third"

requirements-completed: [ACC-04]

# Metrics
duration: 5min
completed: 2026-06-28
---

# Phase 96 Plan 02: macOS Company Portal Sign-In Runbook (ACC-04) Summary

**L1 runbook 15 step 4 remediation corrected from device-group to user-group assignment for user-affinity ADE devices, with freshness stamps bumped and Phase 96 version-history row added**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-06-28T00:00:00Z
- **Completed:** 2026-06-28
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Corrected step 4 "for this device's group" → "for this user's group" (ACC-04, Edit A, occurrence 1)
- Corrected step 4 "to the device group" → "to the user group" (ACC-04, Edit A, occurrence 2)
- Bumped `last_verified: 2026-04-14` → `2026-06-28` and `review_by: 2026-07-13` → `2026-09-28` (Edit B; +3-month invariant preserved)
- Added Phase 96 version-history row above initial-version row (Edit C; most-recent-first)
- Automated verification chain printed PASS for all 7 acceptance criteria

## Task Commits

Each task was committed atomically:

1. **Task 1: Correct step-4 group type to user group, bump stamps, add version-history row** - `5c6c2f0` (fix)

**Plan metadata:** (to be added in final metadata commit)

## Files Created/Modified

- `docs/l1-runbooks/15-macos-company-portal-sign-in.md` — step 4 user-group phrasing corrected, frontmatter stamps bumped, Phase 96 version-history row added

## Decisions Made

- Used exact phrasings "for this user's group" and "to the user group" as specified in the plan's critical guardrails, so verification greps are deterministic.
- review_by recomputed fresh from edit date (2026-06-28 + 3 months = 2026-09-28) rather than carrying forward the pre-existing 07-13 off-by-one; plan explicitly called this out.
- Navigation path ("**Apps** > **macOS** > Company Portal > **Properties** > **Assignments**") and escalation cross-reference left unchanged — only the two group-type noun phrases were altered.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- ACC-04 satisfied; L1 technicians following runbook 15 will now correctly check the user-group assignment for user-affinity devices.
- Phase 96 plan 03 (glossary GLOS-01 Kandji-Iru 3-URL correction) is unblocked.

---
*Phase: 96-surgical-conflict-fixes*
*Completed: 2026-06-28*
