---
phase: 05-l1-runbooks
plan: 01
subsystem: documentation
tags: [l1-runbooks, autopilot, service-desk, intune, troubleshooting]

# Dependency graph
requires:
  - phase: 04-l1-decision-trees
    provides: decision tree escalation nodes (TRE3, TRE1/TRE2, PRE1) with exact collect lists
  - phase: 02-lifecycle
    provides: profile assignment timing table (dynamic vs static, 5-15 min / up to 24h)
  - phase: 03-error-codes
    provides: MDM enrollment error code file linked from device-not-registered runbook
provides:
  - docs/l1-runbooks/01-device-not-registered.md — scripted runbook for device not in Autopilot portal
  - docs/l1-runbooks/03-profile-not-assigned.md — scripted runbook for profile not assigned with group fix
  - docs/l1-runbooks/04-network-connectivity.md — browser-only connectivity runbook escalating to Infrastructure/Network
affects: [06-l2-runbooks, 07-navigation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "L1 runbook pattern: YAML frontmatter + version gate banner + Prerequisites + Steps (numbered, imperative) + Escalation Criteria with collect list"
    - "User communication scripts in blockquote callouts labeled 'Say to the user'"
    - "Timing guidance embedded in wait steps (static 1-5 min, dynamic 5-15 min / up to 24h)"
    - "No PowerShell, registry paths, or log file references in L1 files"
    - "Escalation routing: network failures go to Infrastructure/Network, not L2"

key-files:
  created:
    - docs/l1-runbooks/01-device-not-registered.md
    - docs/l1-runbooks/03-profile-not-assigned.md
    - docs/l1-runbooks/04-network-connectivity.md
  modified: []

key-decisions:
  - "Network connectivity runbook escalates to Infrastructure/Network team, not L2 — per TRE1/TRE2 routing in initial triage tree"
  - "Shift+F10 command prompt at OOBE is documented as L1 exception for browser access only — no scripting involved"
  - "Timing values for profile assignment: static 1-5 min, dynamic 5-15 min / up to 24h sourced from lifecycle/02-profile-assignment.md"
  - "Collect lists in all three runbooks match verbatim data from Phase 4 decision tree escalation nodes"

patterns-established:
  - "L1 runbook pattern: Prerequisites → numbered Steps → Escalation Criteria with Before escalating collect list"
  - "User scripts always in blockquote callout with 'Say to the user' label"
  - "No L2-audience content (no PowerShell, HKLM, registry, event logs) in any L1 file"
  - "Canonical references linked, not duplicated (e.g., endpoints.md linked, not pasted)"

requirements-completed: [L1RB-01, L1RB-03, L1RB-04]

# Metrics
duration: 4min
completed: 2026-03-20
---

# Phase 5 Plan 01: L1 Runbooks (Device Not Registered, Profile Not Assigned, Network Connectivity) Summary

**Three L1 scripted runbooks using browser-only Intune portal click-paths, user communication scripts, and escalation collect lists matching Phase 4 decision tree data**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-03-20T21:38:56Z
- **Completed:** 2026-03-20T21:42:53Z
- **Tasks:** 2 completed
- **Files modified:** 3 created

## Accomplishments

- Created `docs/l1-runbooks/01-device-not-registered.md` with serial number search procedure, hardware hash import history check, and TRE3-matching escalation collect list
- Created `docs/l1-runbooks/03-profile-not-assigned.md` with group membership check, static vs dynamic group timing guidance (1-5 min / 5-15 min / up to 24h), and PRE1-matching escalation collect list
- Created `docs/l1-runbooks/04-network-connectivity.md` with browser-only endpoint checks, Shift+F10 exception note, and Infrastructure/Network escalation routing (not L2)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create device-not-registered and profile-not-assigned runbooks** - `5d8da95` (feat)
2. **Task 2: Create network connectivity failure runbook** - `c187a9d` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified

- `docs/l1-runbooks/01-device-not-registered.md` — L1 scripted runbook: device not found in Autopilot portal
- `docs/l1-runbooks/03-profile-not-assigned.md` — L1 scripted runbook: profile not assigned, group membership fix
- `docs/l1-runbooks/04-network-connectivity.md` — L1 scripted runbook: browser connectivity checks, Infrastructure/Network escalation

## Decisions Made

- **Network failures escalate to Infrastructure/Network, not L2** — matches TRE1/TRE2 routing nodes in the initial triage tree. L2 engineers are not the correct team for firewall/proxy/NTP issues.
- **Shift+F10 documented as browser-access exception** — this is the only L1 exception to the "no command prompt" rule; the note explicitly clarifies it is browser-only.
- **Collect lists copied verbatim from Phase 4 decision tree escalation nodes** — TRE3 for device not registered, PRE1 for profile not assigned, TRE1/TRE2 for network failures.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed "PowerShell" word from network connectivity runbook note**
- **Found during:** Task 2 verification
- **Issue:** A note in step 2 used the word "PowerShell" in context "this does NOT involve PowerShell" — the acceptance criteria requires 0 occurrences of the word regardless of context
- **Fix:** Reworded the note to "This is a browser-only check — no scripted diagnostics are run"
- **Files modified:** docs/l1-runbooks/04-network-connectivity.md
- **Verification:** `grep -cE "(PowerShell)" docs/l1-runbooks/04-network-connectivity.md` returns 0
- **Committed in:** c187a9d (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - wording fix to meet acceptance criteria)
**Impact on plan:** Single word replacement, no content change.

## Issues Encountered

None — plan executed as specified with one minor wording deviation caught during verification.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Three L1 runbooks are ready for use by Service Desk teams
- Phase 5 Plan 02 (ESP failure and TPM attestation runbooks) can now proceed
- All three runbooks link correctly to Phase 4 decision trees and Phase 1/2/3 reference files

## Known Stubs

None — all three runbooks are fully wired with real content, correct timing values, and accurate escalation data.

---

*Phase: 05-l1-runbooks*
*Completed: 2026-03-20*
