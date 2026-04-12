---
phase: 06-l2-runbooks
plan: 03
subsystem: documentation
tags: [l2-runbooks, autopilot, tpm-attestation, hybrid-join, odj-connector, hardware-chipsets, powershell]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: powershell-ref.md, registry-paths.md, l2-template.md, glossary
  - phase: 03-error-codes
    provides: error-codes/02-tpm-attestation.md (9 error code rows, 5 hardware sections), error-codes/05-hybrid-join.md (3 cause rows for 0x80070774, ODJ Connector notes)
  - phase: 04-l1-decision-trees
    provides: decision-trees/03-tpm-attestation.md (TPE1-TPE5 escalation nodes)
  - phase: 06-plan-01
    provides: docs/l2-runbooks/01-log-collection.md (prerequisite referenced in both runbooks)
provides:
  - docs/l2-runbooks/03-tpm-attestation.md — TPM attestation hardware-specific investigation with all 5 chipsets
  - docs/l2-runbooks/04-hybrid-join.md — Hybrid join investigation with ODJ Connector and 0x80070774 three-cause handling
affects: [06-04, 06-05, 07-navigation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Hardware-specific chipset identification via ManufacturerId CIM value — maps numeric ID to AMD/ST Micro/Nuvoton/Infineon/Intel"
    - "Escalation ceiling pattern: L2 identifies, OEM/vendor resolves — firmware updates are out of L2 scope"
    - "ODJ Connector log path versioning: current vs legacy path with explicit do-not-use warning"
    - "Three-cause 0x80070774 pattern: each cause documented as separate scenario with distinct fix steps"

key-files:
  created:
    - docs/l2-runbooks/03-tpm-attestation.md
    - docs/l2-runbooks/04-hybrid-join.md
  modified: []

key-decisions:
  - "TPM runbook escalates at firmware update boundary per D-02: L2 identifies chipset and error code; OEM/vendor handles firmware update"
  - "Hybrid join runbook documents current ODJ Connector log path (Microsoft > Intune > ODJConnectorService) with explicit legacy path do-not-use guidance — log path changed with connector v6.2501.2000.5 January 2025"
  - "0x80070774 split into three distinct scenarios with separate fix steps: profile misconfiguration (Scenario A), wrong domain (Scenario B), OU permissions (Scenario C)"
  - "ManufacturerId table in TPM runbook maps numeric values to chipset manufacturers, avoiding dependency on BIOS string parsing"

requirements-completed: [L2RB-03, L2RB-04]

# Metrics
duration: 7min
completed: 2026-03-21
---

# Phase 6 Plan 3: TPM Attestation and Hybrid Join L2 Investigation Guides Summary

**Hardware-specific TPM attestation investigation covering 5 chipsets (AMD fTPM, ST Micro RSA cert, Nuvoton RSA-3072, Infineon EK cert, Intel Tiger Lake) and hybrid join investigation with ODJ Connector version gate and three distinct 0x80070774 resolution paths**

## Performance

- **Duration:** ~7 min
- **Started:** 2026-03-21T14:00:00Z
- **Completed:** 2026-03-21T14:07:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Created `docs/l2-runbooks/03-tpm-attestation.md` covering L2RB-03: TPM status checks (Get-TPMStatus, Get-CimInstance Win32_Tpm), ManufacturerId-based chipset identification for all 5 hardware-specific chipsets, 8 resolution scenarios, Reset-TPMForAutopilot with -WhatIf dry run, escalation ceiling at firmware update boundary, and Tool References linking to powershell-ref.md, registry-paths.md, and error-codes/02-tpm-attestation.md
- Created `docs/l2-runbooks/04-hybrid-join.md` covering L2RB-04: ODJ Connector version verification (minimum 6.2501.2000.5), current log path with legacy path warning, three separate 0x80070774 scenarios (profile misconfiguration, wrong domain, OU permissions), domain controller reachability checks, and escalation ceiling at DC/AD Connect boundary

## Task Commits

1. **Task 1: Create TPM attestation investigation guide** - `9b781c0` (feat)
2. **Task 2: Create hybrid join investigation guide** - `2ba7511` (feat)

## Files Created/Modified

- `docs/l2-runbooks/03-tpm-attestation.md` — L2RB-03 TPM attestation hardware-specific investigation guide
- `docs/l2-runbooks/04-hybrid-join.md` — L2RB-04 hybrid join investigation guide with ODJ Connector and 0x80070774 three-cause handling

## Decisions Made

- TPM runbook escalates at firmware update boundary: L2 identifies the chipset and error code; OEM/vendor handles the firmware update. This is the explicit ceiling between Desktop Engineering and vendor support. L2 does not document or perform firmware updates.
- ManufacturerId mapping table provides numeric-to-manufacturer translation because BIOS string values are OEM-specific and unreliable, while CIM ManufacturerId values are standardized.
- Hybrid join runbook documents current ODJ Connector log path as primary investigation location with an explicit "do not use" callout for the legacy path — this prevents investigations from stalling on a log location that receives no entries in current connector versions.
- 0x80070774 documented as three separate resolution scenarios rather than a single section because each cause (profile, domain, OU) has an entirely distinct fix that does not overlap with the others.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `docs/l2-runbooks/03-tpm-attestation.md` and `docs/l2-runbooks/04-hybrid-join.md` created
- Plans 06-04 and 06-05 (ESP and Policy Conflict runbooks) can reference the established L2 runbook patterns
- Phase 07 navigation will link to all completed L2 runbooks

---
*Phase: 06-l2-runbooks*
*Completed: 2026-03-21*
