---
phase: 96-surgical-conflict-fixes
plan: 01
subsystem: documentation
tags: [macos, ade-lifecycle, company-portal, platform-sso, vpp, pkg-lob, intune-management-extension]

# Dependency graph
requires: []
provides:
  - "docs/macos-lifecycle/00-ade-lifecycle.md with corrected Stage-6 PKG/LOB prose (never VPP), corrected Stage-4 static user group, bumped freshness stamps, and Phase 96 version-history row"
affects: [phase-97, phase-98, phase-100]

# Tech tracking
tech-stack:
  added: []
  patterns: []

key-files:
  created: []
  modified:
    - docs/macos-lifecycle/00-ade-lifecycle.md

key-decisions:
  - "Inline prose rewrite (not callout addition) for Stage-6 VPP claims — line 326 already carries the never-VPP explanation, adding another note would triplicate it (D-01)"
  - "Removed VPP Glossary Quick Reference row outright — after the prose rewrite VPP is no longer legitimately used in this guide, making the Stage 6 'First Appears' claim false (D-02)"
  - "Silent-installation rationale reattributed to Intune Management Extension (IME), not VPP licensing — correct causal chain for PKG/LOB deployments on macOS"
  - "Static user group (not device group) for SSO extension Settings Catalog profile — SSO extension delivers via user affinity on user-affinity ADE devices (D-05)"
  - "Bumped last_verified to 2026-06-28, review_by to 2026-09-28 — preserves +3-month same-day-of-month invariant (D-03)"

patterns-established: []

requirements-completed: [ACC-01, ACC-02]

# Metrics
duration: 8min
completed: 2026-06-28
---

# Phase 96 Plan 01: Surgical Conflict Fixes (guide 00) Summary

**Stage-6 Company Portal corrected from false VPP/Apps-and-Books claim to PKG/LOB-via-IME, orphaned VPP glossary row removed, and Stage-4 SSO-extension policy group type corrected from device to user in 00-ade-lifecycle.md**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-06-28T00:00:00Z (approx)
- **Completed:** 2026-06-28
- **Tasks:** 2 of 2
- **Files modified:** 1

## Accomplishments

- Rewrote Stage-6 "What Happens" step 1 (line 309): Company Portal deployment now stated as PKG (LOB or unmanaged macOS PKG) via Intune with silent install attributed to the Intune Management Extension; `[VPP]` inline link removed
- Rewrote Stage-6 "Behind the Scenes" first bullet (line 319): removed the false "recommended method is through VPP" premise; PKG/LOB is now stated as the macOS method
- Removed orphaned VPP Glossary Quick Reference table row (line 411) — VPP no longer legitimately appears in this guide after the prose rewrite
- Corrected Stage-4 "Watch Out For" bullet (line 250): "static device group" changed to "static user group" for the SSO extension Settings Catalog profile (user-affinity ADE devices target users, not devices)
- Bumped frontmatter: `last_verified: 2026-06-28`, `review_by: 2026-09-28`
- Added Phase 96 version-history row (most-recent-first)

## Task Commits

Each task was committed atomically:

1. **Task 1: Rewrite Stage-6 VPP claims to PKG/LOB, remove orphaned VPP quick-ref row** - `38c3850` (docs)
2. **Task 2: Correct Stage-4 user group, bump stamps, add Phase 96 version-history row** - `7756f16` (docs)

## Files Created/Modified

- `docs/macos-lifecycle/00-ade-lifecycle.md` — Stage-6 lines 309/319 rewritten to PKG/LOB/IME; VPP quick-ref row (line 411) removed; Stage-4 line 250 device→user group; frontmatter stamps bumped; Phase 96 version-history row added

## Decisions Made

- Inline rewrite chosen over a word-swap: line 319 was built on a false premise ("recommended method is through VPP") that could not be corrected with a simple word substitution — the full sentence structure was rewritten
- No new "never via VPP" callout added at lines 309/319 — line 326 (untouched) already carries that explanation; adding another instance would triplicate the message (RESEARCH Pitfall 1)
- IME named explicitly as the silent-install mechanism — VPP license-managed silent install is an iOS/iPadOS-only pattern; on macOS, the Intune Management Extension achieves silent PKG deployment

## Deviations from Plan

None — plan executed exactly as written. All three edits in Task 1 and all three edits in Task 2 matched the verbatim RESEARCH.md text precisely. Both automated verify chains printed PASS before commit.

## Issues Encountered

None.

## User Setup Required

None — documentation-only edits, no external service configuration required.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes. Documentation-only edit — no application-security surface introduced.

## Self-Check

- `docs/macos-lifecycle/00-ade-lifecycle.md` exists and was modified: CONFIRMED
- Task 1 commit `38c3850` exists: CONFIRMED (git log)
- Task 2 commit `7756f16` exists: CONFIRMED (git log)
- Automated verify chains: both printed PASS before respective commits

## Self-Check: PASSED

## Next Phase Readiness

- ACC-01 and ACC-02 requirements satisfied for guide 00
- Phase 97 (Enrollment & FileVault Depth Formalization — guides 02/03) can proceed independently
- Phase 96 plan 02 (ACC-04 runbook 15 correction) and plan 03 (GLOS-01 glossary Kandji-Iru 3-URL) remain in this phase

---
*Phase: 96-surgical-conflict-fixes*
*Completed: 2026-06-28*
