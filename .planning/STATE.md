---
gsd_state_version: 1.0
milestone: v1.9
milestone_name: macOS Platform SSO & Secure Enclave Authentication Documentation
status: executing
last_updated: "2026-06-21T14:59:20.482Z"
last_activity: 2026-06-21 -- Phase 77 planning complete
progress:
  total_phases: 18
  completed_phases: 2
  total_plans: 6
  completed_plans: 5
  percent: 11
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-20)

**Core value:** IT teams can independently provision, troubleshoot, and manage Apple-platform single sign-on (macOS Platform SSO + Secure Enclave) through Microsoft Intune / Entra ID without escalating to engineering.
**Current focus:** Phase 77 — auth methods deep dive

## Current Position

Phase: 77
Plan: Not started
Status: Ready to execute
Last activity: 2026-06-21 -- Phase 77 planning complete

Progress: [██████████] 100%

## v1.9 Phase Dependency Summary

```
Phase 75 (Glossary + Lifecycle Foundation + 03-stub correction)
  |       PSSO-04, SSOREF-01, SSOREF-03
  |       Foundation: glossary terms must pre-exist for all guides to link to
  |       All facts HIGH confidence; no research fetch needed at plan time
  |
  v
Phase 76 (Platform SSO Admin Setup Guide -- 07-platform-sso-setup.md)
  |       PSSO-01, PSSO-02, PSSO-03, PSSO-12
  |       + 00-overview.md Mermaid/bullet extension (07/08/09)
  |       Depends on Phase 75 (glossary terms; corrected 03-stub pointing to 07)
  |
  +--> Phase 77 (Auth Methods Deep-Dive -- 08-auth-methods-deep-dive.md)  [after 76]
  |       PSSO-05, PSSO-06, PSSO-07, PSSO-08, PSSO-09, PSSO-10, PSSO-11
  |       RESEARCH FLAG: Smart card Entra CBA detail -- fetch at plan time
  |       (may overlap Phase 78 if file sets disjoint)
  |
  +--> Phase 78 (Legacy SSO Plug-in & Migration Guide -- 09-enterprise-sso-plugin-migration.md)
  |       SSOMIG-01, SSOMIG-02, SSOMIG-03, SSOMIG-04
  |       All facts HIGH confidence
  |       (may overlap Phase 77 if file sets disjoint)
  |
  v
Phase 79 (Reference Integration -- macos-capability-matrix.md + 4-platform-comparison.md)
  |       SSOREF-02
  |       MANDATORY: pre-edit anchor inventory before any matrix edits (C12/C13 risk)
  |       Depends on Phase 77 + Phase 78 (matrix synthesizes verified facts)
  |
  v
Phase 80 (L1/L2 Runbooks -- #35, #36, #27)
  |       SSORUN-01, SSORUN-02, SSORUN-03
  |       RESEARCH FLAG: app-sso diagnose + log stream --predicate paths (LOW confidence)
  |       Depends on Phase 75 (glossary), Phase 76 (guide 07), Phase 77 (guide 08)
  |
  v
Phase 81 (Nav Hub Integration -- append-only, navigation-last)
  |       SSOREF-04
  |       Depends on Phases 75-80 (all content must exist before any hub is touched)
  |       8-edge cross-link closure checklist (SSO-E1 through SSO-E8)
  |
  v
Phase 82 (Harness Lineage Bump + Terminal Re-Audit + Milestone Close -- MUST BE LAST)
          SSOHARN-01, SSOHARN-02, SSOHARN-03, SSOHARN-04
          AP-5: V18 SHA pinned in frozen-at-close.mjs BEFORE any check-phase-NN authored
          RESEARCH FLAG: C17 cross-link check decision -- /adversarial-review at plan time
          Atom 1 (3 files): v1.9-milestone-audit.mjs + allowlist + BASELINE_13
          Atom 2: check-phase-75..82.mjs + audit-harness-v1.9-integrity.yml + V18 entry
          Predecessor v1.4/v1.4.1/v1.5/v1.6/v1.7/v1.8 frozen surfaces BYTE-UNCHANGED
```

**Requirement coverage (27/27 mapped):**

| Phase | Requirements | Count |
|-------|-------------|-------|
| 75 | PSSO-04, SSOREF-01, SSOREF-03 | 3 |
| 76 | PSSO-01, PSSO-02, PSSO-03, PSSO-12 | 4 |
| 77 | PSSO-05, PSSO-06, PSSO-07, PSSO-08, PSSO-09, PSSO-10, PSSO-11 | 7 |
| 78 | SSOMIG-01, SSOMIG-02, SSOMIG-03, SSOMIG-04 | 4 |
| 79 | SSOREF-02 | 1 |
| 80 | SSORUN-01, SSORUN-02, SSORUN-03 | 3 |
| 81 | SSOREF-04 | 1 |
| 82 | SSOHARN-01, SSOHARN-02, SSOHARN-03, SSOHARN-04 | 4 |

**Sequential-on-main-tree execution** per `.planning/config.json` `use_worktrees:false` (durable per memory `project_execphase_sequential.md`). Phase 82 terminal re-audit uses fresh `git clone --no-hardlinks` into `$env:TEMP\v1.9-audit-<rand>` (D-03 LOCKED -- same mechanism as v1.6/v1.7/v1.8 precedent).

## Performance Metrics

**Velocity across milestones:**

- v1.0: 10 phases, 24 plans — shipped 2026-04-10
- v1.1: 9 phases, 18 plans — shipped 2026-04-13
- v1.2: 6 phases, 20 plans — shipped 2026-04-15
- v1.3: 8 phases, 44 plans — shipped 2026-04-19
- v1.4: 9 phases, 40 plans — shipped 2026-04-24
- v1.4.1: 5 phases, 33 plans — shipped 2026-04-25
- v1.5: 14 phases, 101 plans — shipped 2026-05-07
- v1.6: 5 phases (62-66), 30 plans — shipped 2026-05-25
- v1.7: 4 phases (67-70), 15 plans — shipped 2026-05-29
- v1.8: 4 phases (71-74), 13 plans — shipped 2026-06-08
- **v1.9 (planning): 8 phases (75-82), plan count TBD**

## Accumulated Context

### Decisions

**v1.9 adversarial-review decisions (LOCKED 2026-06-20):**

- D1 Touch ID biometric policy: Option A — full subsection in guide 08, adjacent to Secure Enclave method
- D2 Passkey/FIDO2: Option A — advanced section in guide 08, adjacent to Secure Enclave method
- D3 NUAL: Option B — document behavior; `NewUserAuthorizationMode` key omitted + tracked in v1.9-DEFERRED-CLEANUP.md
- D4 ADE-during-Setup-Assistant: Option B — advanced/optional path with macOS-26-first branch; post-enrollment default

**Durable architectural decisions (v1.7/v1.8 carry-forward):**

- Sequential-on-main-tree per `use_worktrees:false`; atomic harness commit (Atom 1 + Atom 2); frozen-aware via `_lib/frozen-at-close.mjs`; navigation-last invariant; pre-edit anchor inventory before matrix edits; predecessor frozen surfaces BYTE-UNCHANGED
- [Phase ?]: D-01 (75-01): Platform SSO only gets Windows equivalent blockquote; Secure Enclave and Enterprise SSO Plug-in use standalone see-also
- [Phase ?]: D-03 (75-01): Created ### Entra ID SSO in _glossary.md to resolve XC-1 — term had zero occurrences before Phase 75; now a stable anchor contract for Phases 76-81

### Pending Todos

None yet.

### Blockers/Concerns

Research flags for plan-phase resolution (not blockers — known gaps):

- Phase 77: Entra CBA walk-through for Smart card (MEDIUM confidence) — fetch CBA guide at plan time
- Phase 80: `app-sso diagnose` / `log stream --predicate` filter values (LOW confidence) — validate at plan time
- Phase 82: C17 cross-link check decision — /adversarial-review at plan time

## Session Continuity

Last session: 2026-06-21T14:35:27.321Z
Stopped at: Phase 77 context gathered
Resume file: .planning/phases/77-auth-methods-deep-dive/77-CONTEXT.md

## Performance Metrics

| Phase | Plan | Duration | Notes |
|-------|------|----------|-------|
| Phase 75 P01 | 4min | 2 tasks | 2 files |
| Phase 75 P03 | 6min | 1 tasks | 1 files |
