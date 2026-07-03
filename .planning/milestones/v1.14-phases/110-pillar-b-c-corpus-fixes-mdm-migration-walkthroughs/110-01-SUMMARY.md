---
phase: 110-pillar-b-c-corpus-fixes-mdm-migration-walkthroughs
plan: "01"
subsystem: docs
tags: [markdown, corpus-fix, l1-runbooks, macos, platform-sso]

# Dependency graph
requires:
  - phase: 109-802-1x-integration-capability-matrices-navigation-hubs
    provides: Phase 109 nav edits shifted line anchors in index.md/quick-ref-l1.md/common-issues.md — drift table in D-04 required
provides:
  - Corrected macOS L1 runbook count (9 = 6 ADE + 3 PSSO) in docs/index.md
  - L1 "Use runbook" framing for #36 Secure Enclave trigger in docs/quick-ref-l1.md
  - Inserted L1 #36 bullet between L1 #37 and L2 #27 in docs/common-issues.md User-Locked-Out block
affects:
  - Phase 112 audit harness (allowlist tracks line offsets in these files)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "DRY count reword: 'see row below' pointer avoids re-enumerating PSSO runbooks already listed in the adjacent row"
    - "Semantic anchor targeting: use content signals not stale line numbers (D-04 drift table)"

key-files:
  created: []
  modified:
    - docs/index.md
    - docs/quick-ref-l1.md
    - docs/common-issues.md

key-decisions:
  - "FIX-01 count is 9 (6 ADE + 3 PSSO); 802.1X runbooks #38-41 excluded (separate H2, cross-platform)"
  - "FIX-01 reword uses 'see row below' DRY pointer — no enumeration of #35/#36/#37 (row :112 already lists them)"
  - "FIX-03 inserted in User-Locked-Out block only — Post-Migration block untouched (scope boundary)"

patterns-established:
  - "Stale-anchor pattern: always read live file before editing; REQUIREMENTS.md/ROADMAP.md anchor line numbers drift after corpus edits"

requirements-completed: [FIX-01, FIX-02, FIX-03]

# Metrics
duration: 4min
completed: 2026-07-01
---

# Phase 110 Plan 01: Corpus Fixes (FIX-01/02/03) Summary

**Three surgical single-line/single-bullet corpus fixes: macOS L1 runbook count corrected to 9, #36 Secure Enclave trigger reworded to L1 "Use runbook" framing, and mandatory #36 PSSO re-registration step inserted between L1 #37 and L2 #27 in the User-Locked-Out block.**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-07-01T22:06:00Z
- **Completed:** 2026-07-01T22:09:50Z
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments

- FIX-01: `docs/index.md` macOS L1 Runbooks row now correctly states "9 macOS L1 runbooks — 6 ADE plus 3 Platform SSO; see row below" (was "(6 runbooks: device, Setup Assistant, profiles, apps, compliance, Company Portal)")
- FIX-02: `docs/quick-ref-l1.md` #36 trigger now uses L1 "Use [Platform SSO — Secure Enclave Key Loss] runbook** first" pattern matching siblings #35/:107 and #37/:108 (was "Escalate L2 via ...")
- FIX-03: `docs/common-issues.md` User-Locked-Out block now carries L1 #36 mandatory PSSO re-registration step between L1 #37 and L2 #27; adjacent Post-Migration block untouched

## Task Commits

Each task was committed atomically:

1. **Task 1: FIX-01 — correct macOS L1 runbook count in docs/index.md** - `bb27e5d` (fix)
2. **Task 2: FIX-02 — reword #36 trigger to L1 "try this first" in docs/quick-ref-l1.md** - `ea38f58` (fix)
3. **Task 3: FIX-03 — insert L1 #36 bullet in User-Locked-Out block of docs/common-issues.md** - `e44e310` (fix)

## Files Created/Modified

- `docs/index.md` — macOS L1 Runbooks row: count updated from 6 to 9 with DRY "see row below" pointer
- `docs/quick-ref-l1.md` — #36 escalation trigger: "Escalate L2 via" changed to "Use ... runbook** first"
- `docs/common-issues.md` — User-Locked-Out block: L1 #36 bullet inserted between L1 #37 and L2 #27

## Decisions Made

- FIX-01 count: 9 (not 13) because 802.1X runbooks #38-41 live under a separate `## 802.1X L1 Runbooks` H2 and are cross-platform. The `## macOS ADE Runbooks` H2 contains #10-15 (ADE) + #35/#36/#37 (PSSO) = 9.
- FIX-01 phrasing: "see row below" DRY pointer avoids re-listing #35/#36/#37 which the adjacent :112 PSSO row already enumerates.
- FIX-03 scope: inserted only in the "macOS Local Password: User Locked Out" block; the "Platform SSO Re-Registration Failure (Post-Migration)" block was intentionally not touched — #36 after password reset does not fit that block's trigger (scope creep avoided).

## Deviations from Plan

None — plan executed exactly as written. All three live anchors matched the D-04 drift table predictions exactly.

## Issues Encountered

None. All edits were surgical single-line / single-bullet operations against live-verified anchors.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- FIX-01/02/03 (SC1/SC2/SC3) satisfied; Phase 110 Plan 02 (MIGF-01: iOS migration walkthrough) ready to execute
- No blockers

---
*Phase: 110-pillar-b-c-corpus-fixes-mdm-migration-walkthroughs*
*Completed: 2026-07-01*
