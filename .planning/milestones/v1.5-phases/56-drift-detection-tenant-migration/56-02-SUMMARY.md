---
phase: 56-drift-detection-tenant-migration
plan: 02
subsystem: docs
tags: [intune-remediations, powershell, drift-detection, windows, proactive-remediations, log-analytics, graph-api]

# Dependency graph
requires:
  - phase: 56-drift-detection-tenant-migration/56-01
    provides: drift-migration directory + 00-overview.md cross-platform hub (sibling cross-link targets)
  - phase: 53-co-management-operational-docs
    provides: cross-platform inline blockquote pattern + operations/00-index.md DPO contract

provides:
  - "docs/operations/drift-migration/01-windows-drift-detection.md — Windows drift detection guide (DRIFT-01 + DRIFT-02 fold)"
  - "Intune Remediations portal path + per-device status report interpretation (V-56-12 + V-56-13)"
  - "## Canonical script-authoring pattern H2 with exit-code semantics + Log Analytics surface (V-56-14)"
  - "Scope-distinction prose cross-linking registration drift (v1.2) vs configuration drift (Phase 56)"
  - "Surface-level Microsoft Graph exportJobs mention (D-23 plan-author discretion; 4 report names)"

affects:
  - "56-06 (check-phase-56.mjs validator must assert V-56-12/13/14/25/27 against this file)"
  - "56-07 (pre-commit gate runs validator; atomic commit includes this file)"
  - "Phase 58 (DEFER-08 4-platform capability comparison will consume Phase 56 anchors)"
  - "Phase 59 (Hub Navigation Integration will link to this file from ops/00-index.md)"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Windows-platform doc with multi-H2 FOLD pattern (DRIFT-01 PRIMARY + DRIFT-02 FOLD)"
    - "Scope-distinction prose: configuration drift (Phase 56) vs registration drift (v1.2 SSoT)"
    - "Exit-code-first authoring contract for Intune Remediations script pairs"

key-files:
  created:
    - "docs/operations/drift-migration/01-windows-drift-detection.md"
  modified: []

key-decisions:
  - "Intune Remediations is Windows-only at the IME layer; file scoped explicitly to Windows per Pitfall 4 framing"
  - "DRIFT-02 fold placed as ## Canonical script-authoring pattern H2 (LOCKED literal per V-56-14 + CONTEXT D-21)"
  - "Microsoft Graph exportJobs surface-level mention included per D-23 plan-author discretion (4 report names: DeviceNonCompliance, NonCompliantDevicesAndSettings, ConfigurationPolicyAggregate, SettingComplianceAggReport)"
  - "Scope-distinction blockquote placed in intro (pre-H2) to front-load registration vs configuration drift distinction"
  - "v1.2 cross-link ../../reference/drift-detection.md appears twice (scope-distinction prose + Related Resources footer) per V-56-25"

patterns-established:
  - "Windows-platform doc: frontmatter platform: Windows + Platform applicability blockquote at line 9"
  - "DRIFT-02 fold: ## Canonical script-authoring pattern H2 with detection-exit-1 + remediation-exit-0 semantics"
  - "Log Analytics surface reference pattern for L2 deep-dive on Error-state remediations"

requirements-completed: [DRIFT-01, DRIFT-02]

# Metrics
duration: 12min
completed: 2026-04-29
---

# Phase 56 Plan 02: Windows Drift Detection Summary

**Windows Intune Remediations drift detection guide with DRIFT-01 portal path + 3 status report literals + DRIFT-02 canonical script-authoring pattern (exit 1/exit 0) + Log Analytics surface + v1.2 registration-drift cross-link**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-04-29T13:10:00Z
- **Completed:** 2026-04-29T13:22:22Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Authored `docs/operations/drift-migration/01-windows-drift-detection.md` (219 lines) implementing DRIFT-01 PRIMARY + DRIFT-02 FOLD per plan specification
- All 6 V-56-NN assertions for plan 56-02 satisfied (V-56-12 portal path, V-56-13 status reports, V-56-14 H2+exit codes+Log Analytics, V-56-25 cross-link)
- Included surface-level Microsoft Graph `exportJobs` section per D-23 plan-author discretion with all 4 report names pinned
- Scope-distinction prose explicitly clarifies registration drift (v1.2 SSoT) vs configuration drift (Phase 56) per D-09 contract

## Task Commits

1. **Task 1: Author 01-windows-drift-detection.md + SUMMARY** — committed together per progressive landing pattern

**Plan metadata:** (see final commit hash below)

## Files Created/Modified

- `docs/operations/drift-migration/01-windows-drift-detection.md` — Windows drift detection guide: DRIFT-01 Intune Remediations (portal path + configuration steps + per-device status report) + DRIFT-02 fold (## Canonical script-authoring pattern with detection/remediation script examples + Log Analytics surface) + Graph exportJobs L2 callout + v1.2 scope-distinction cross-link

## Decisions Made

- Included Microsoft Graph `exportJobs` section as plan-author discretion (CONTEXT D-23) — the 4 report names provide concrete L2 triage context for fleet-wide drift analysis beyond per-device status reports
- Scope-distinction blockquote (`> **Scope distinction:**`) placed in intro prose before the first H2 to front-load the registration vs configuration drift distinction, improving discoverability for admins arriving via search
- v1.2 cross-link `../../reference/drift-detection.md` appears in both scope-distinction blockquote (body) and Related Resources footer — satisfies V-56-25 cleanly with two occurrences

## Deviations from Plan

None — plan executed exactly as written. The Microsoft Graph exportJobs section was explicitly anticipated as "plan-author discretion" per CONTEXT D-23 and included because the 4 report names (`DeviceNonCompliance`, `NonCompliantDevicesAndSettings`, `ConfigurationPolicyAggregate`, `SettingComplianceAggReport`) provide concrete L2 investigation value.

## V-56-NN Assertion Results

| Assertion | Status | Detail |
|-----------|--------|--------|
| V-56-02 | PASS | File exists at `docs/operations/drift-migration/01-windows-drift-detection.md` |
| V-56-07 | PASS | `platform: Windows`, `audience: admin`, `last_verified: 2026-04-29`, `review_by: 2026-06-28`, `applies_to: all` |
| V-56-12 | PASS | `Devices > Manage devices > Scripts and remediations > Remediation scripts` present |
| V-56-13 | PASS | `No issues detected` (4×), `Issues fixed` (7×), `Error` (9×) all present |
| V-56-14 | PASS | `## Canonical script-authoring pattern` H2 at line 92; `exit 1` (11×), `exit 0` (11×), `Log Analytics` (9×) |
| V-56-25 | PASS | `../../reference/drift-detection.md` present (2 occurrences) |
| V-56-27 | PASS | `> **Platform applicability:**` blockquote at line 9 (well within first 50 body lines) |
| V-56-28 | PASS | NEGATIVE: zero occurrences of bare `> **Platform:**` |
| V-56-32 | PASS | NEGATIVE: zero TBD/TODO/FIXME/XXX/PLACEHOLDER tokens |

## Issues Encountered

None.

## Known Stubs

None — all content is substantive. The Graph `exportJobs` section names specific report names verified at Microsoft Learn 2026. No placeholder prose.

## Threat Flags

None — documentation-only phase; no new network endpoints, auth paths, file access patterns, or schema changes.

## Next Phase Readiness

- `01-windows-drift-detection.md` is ready for the 56-06 validator (check-phase-56.mjs) to assert V-56-12/13/14/25/27 against
- All sibling cross-link targets (`02-macos-drift-detection.md`, `03-ios-android-drift-detection.md`, `04-tenant-migration-runbook.md`) referenced in Related Resources — these will be created by plans 56-03/04/05 and will resolve at the 56-07 atomic commit gate per D-22

---
*Phase: 56-drift-detection-tenant-migration*
*Completed: 2026-04-29*
