---
phase: 64-apple-business-delegation-runbooks
plan: 03
subsystem: documentation
tags: [apple-business, delegation, runbooks, mdm, device-management, vpp, ou-transfer]

# Dependency graph
requires:
  - phase: 64-apple-business-delegation-runbooks
    provides: Wave-1 locked conventions (64-CONVENTIONS.md), hard-callout strings, ABAUDIT registry starting at ABAUDIT-05

provides:
  - "14-device-transfer-runbook.md: DELEG-04 cross-OU transfer runbook with OP-5 hard-callout (no L2-approval gate), 4-cell impact matrix, pre-transfer dependency checklist, Apple TV cross-link"
  - "15-mdm-server-reassign-runbook.md: DELEG-05 single MDM-server reassignment runbook with OS-version eligibility matrix, Sub-H2 A (legacy factory erase), Sub-H2 B (OS-26+ in-place migration), differential 04- citation"

affects: [64-04, 64-05, 18-cross-org-boundary-cheat-sheet, check-phase-64]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "D-04 Refined-C: hard ⛔ callout on destructive paths (14-), light Note tier on informational runbooks (15-)"
    - "ABAUDIT line-pair exemptions for Intune-disambiguation rows in impact matrices"
    - "Single-file anti-proliferation: DELEG-05 consolidates two OS paths into one runbook with 2 sub-H2s"

key-files:
  created:
    - docs/cross-platform/apple-business/14-device-transfer-runbook.md
    - docs/cross-platform/apple-business/15-mdm-server-reassign-runbook.md
  modified: []

key-decisions:
  - "14- cites 01-role-permission-model.md only (D-03 — 'Reassign devices between OUs' is not in Sub-Org Admin bundle; no 04- cite)"
  - "15- cites BOTH 01- AND 04- (D-03 differential — 'Assign devices to MDM server' maps to Sub-Org Admin bundle, mirroring 06-)"
  - "15- uses light Note tier (not ⛔ hard callout) — MDM server reassignment is not a single destructive action (D-04 Refined-C)"
  - "ABAUDIT-11 through ABAUDIT-14 consumed; 64-04/64-05 continue from ABAUDIT-15"

patterns-established:
  - "Pattern: OS-version eligibility matrix table (iOS/iPadOS/macOS/tvOS rows) — established in 15- for mixed-OS fleet decisions"
  - "Pattern: 4-cell impact matrix with ABAUDIT exemptions for Intune-disambiguation rows"

requirements-completed: [DELEG-04, DELEG-05]

# Metrics
duration: 25min
completed: 2026-05-22
---

# Phase 64 Plan 03: Matrix-Heavy Operational Runbooks Summary

**Cross-OU device transfer runbook (14-) with OP-5 4-cell impact matrix and Apple TV cross-link; single MDM-server reassignment runbook (15-) with OS-26+ in-place vs legacy factory-erase eligibility matrix and 2 sub-H2s**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-05-22T00:00:00Z
- **Completed:** 2026-05-22
- **Tasks:** 2
- **Files created:** 2

## Accomplishments

- Authored `14-device-transfer-runbook.md` (DELEG-04): OP-5 hard-bordered callout (exact locked string, no L2-approval gate), 4-cell impact matrix (VPP BREAKS / enrollment profile does NOT follow / Intune config profiles survive / audit entry logged), pre-transfer dependency checklist, Apple TV cross-link to `10-apple-tv-lifecycle.md`
- Authored `15-mdm-server-reassign-runbook.md` (DELEG-05): single file honoring SC#3/CI-5 anti-proliferation, OS-version eligibility matrix (iOS/iPadOS/macOS/tvOS 26+ → in-place Sub-H2 B; ≤ 25 → factory erase Sub-H2 A), mixed-OS fleet two-wave note, VPP content-token 30-day re-upload warning
- All ABAUDIT numbers ABAUDIT-11 through ABAUDIT-14 consumed; next plan starts at ABAUDIT-15
- Inline validation checks passed: `14- OK`, `15- OK`, V-64-ANTIPROLIFERATION PASS, V-64-AUDIT PASS (C15 gate)

## Task Commits

1. **Task 1: Author 14-device-transfer-runbook.md (DELEG-04)** — `3802665` (docs)
2. **Task 2: Author 15-mdm-server-reassign-runbook.md (DELEG-05)** — `cae78df` (docs)

## Files Created/Modified

- `docs/cross-platform/apple-business/14-device-transfer-runbook.md` — cross-OU device transfer runbook; OP-5 hard callout; 4-cell impact matrix; pre-transfer checklist; Apple TV cross-link
- `docs/cross-platform/apple-business/15-mdm-server-reassign-runbook.md` — single MDM server reassignment runbook; OS eligibility matrix; Sub-H2 A (legacy) + Sub-H2 B (OS-26+); differential 04- citation

## ABAUDIT Numbers Consumed (IMPORTANT for 64-04/64-05)

| ABAUDIT | File | Rationale |
|---------|------|-----------|
| ABAUDIT-11 | 14-device-transfer-runbook.md line 11 | Platform applicability: Apple-side OU transfer vs Intune device management (C15 regex 4) |
| ABAUDIT-12 | 14-device-transfer-runbook.md (OP-5 callout impact table) | "Intune config profiles survive" row — Intune is assignment authority (C15 regex 4) |
| ABAUDIT-13 | 14-device-transfer-runbook.md (detailed impact table) | Expanded Intune config profiles row in Impact Matrix — Detailed Explanation section (C15 regex 4) |
| ABAUDIT-14 | 15-mdm-server-reassign-runbook.md line 11 | Platform applicability: Apple-side MDM assignment vs Intune MDM cert/enrollment (C15 regex 4) |

**Next available ABAUDIT number: ABAUDIT-15**

## Decisions Made

- `14-` cites `01-role-permission-model.md` only for Required Role & Permission. "Reassign devices between OUs" is a tenant-wide DENY-by-default permission, not in the Sub-Org Admin bundle documented in `04-` — citing `04-` here would be misleading (D-03 differential rule applied correctly).
- `15-` cites BOTH `01-` and `04-` for Required Role & Permission. "Assign devices to MDM server" is in the Sub-Org Admin bundle (exactly as `06-mdm-server-assignment.md` does) — this is the D-03 differential case where the permission maps to the bundle.
- `15-` uses the light `> **Note:**` tier instead of a `⛔` hard callout. MDM server reassignment is an informational multi-path runbook, not a single destructive action — D-04 Refined-C specifies hard callout only for single destructive paths (OP-5 in `14-`, OP-6 in `13-`, OP-9 in `11-`, OP-11 in `12-` Path C).

## Deviations from Plan

None — plan executed exactly as written.

## Threat Surface Scan

No new security-relevant surfaces introduced. Both files are documentation-only. The T-64-08 mitigation (ABAUDIT comments on "Intune config profiles survive" rows) was applied as specified in the threat register. The T-64-09 mitigation (no 15b- proliferation) was verified by check-phase-64 V-64-ANTIPROLIFERATION PASS.

## Known Stubs

- Portal navigation labels throughout both runbooks are tagged `[CITED: training; needs live verification]` per the 60-day discipline. These are intentional pending-verification stubs, not functional stubs. No data-wiring or rendering is involved (documentation only).

## Issues Encountered

None.

## Validator Results (Post-Authoring)

```
V-64-ANTIPROLIFERATION: PASS (no 15b- or 15-mdm-server-reassign-2 proliferation)
V-64-AUDIT: PASS (v1.6-milestone-audit.mjs — C15 framing guard passes for 14- and 15-)
14- inline check: PASS
15- inline check: PASS
```

Remaining V-64-01 / V-64-06..10 FAILs are for 16-, 17-, 18- (not yet authored — 64-04 and 64-05 deliverables).

## Next Phase Readiness

- `14-` and `15-` are complete and cross-linked to each other and to `10-`, `13-`, `06-`, `01-`, `04-`, `18-`
- ABAUDIT-15 is the next available number for plans 64-04 and 64-05
- `18-cross-org-boundary-cheat-sheet.md` (DELEG-08, highest ABAUDIT density) is the expected major ABAUDIT consumer in subsequent plans

---
*Phase: 64-apple-business-delegation-runbooks*
*Completed: 2026-05-22*

## Self-Check: PASSED

- `docs/cross-platform/apple-business/14-device-transfer-runbook.md` — FOUND
- `docs/cross-platform/apple-business/15-mdm-server-reassign-runbook.md` — FOUND
- Commit `3802665` — FOUND
- Commit `cae78df` — FOUND
