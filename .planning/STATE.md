---
gsd_state_version: 1.0
milestone: v1.10
milestone_name: macOS Platform SSO Follow-ons — Kerberos, Graph API & NUAL
status: planning
last_updated: "2026-06-23T23:24:44.541Z"
last_activity: 2026-06-23
progress:
  total_phases: 6
  completed_phases: 3
  total_plans: 8
  completed_plans: 8
  percent: 50
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-22)

**Core value:** IT teams can independently provision, troubleshoot, and manage Apple-platform single sign-on (macOS Platform SSO + Kerberos SSO + programmatic Platform Credential management) through Microsoft Intune / Entra ID without escalating to engineering.
**Current focus:** Phase 86 — chain health pass

## Current Position

Phase: 86
Plan: Not started
Status: Ready to plan
Last activity: 2026-06-23

## v1.10 Phase Dependency Summary

```
Phase 83 (Kerberos SSO Extension Guide)
  |       KRB-01, KRB-02, KRB-03, KRB-04
  |       New 10-kerberos-sso-extension.md + guide 09 surgical edit (one sentence)
  |       + 00-overview.md guide 10 node + glossary Kerberos SSO Extension entry
  |       MUST AVOID: wrong identifier (K-1), wrong payload type Redirect vs Credential (K-5),
  |                   any nav-hub edits (DI-1)
  |       Research flag: verify app-sso kerberos subcommand surface at plan time;
  |                      default to app-sso platform -s + klist
  |
  v
Phase 84 (Graph API Platform Credential Doc + NUAL Key Table)
  |       GRAPH-01, GRAPH-02, NUAL-01
  |       New 11-graph-api-platform-credential.md (Option A: docs/admin-setup-macos/)
  |       + guide 08 NUAL surgical edit (replace deferred-item blockquote with key literal table)
  |       + 00-overview.md guide 11 node + glossary Platform Credential extension
  |       MUST AVOID: G-2 ([!WARNING] on DELETE is mandatory), no nav-hub edits (DI-1)
  |       Research flag (pre-task, not blocker):
  |         - Verify Intune Settings Catalog NUAL display names vs Apple schema key names
  |         - Confirm least-privilege delete scope (UserAuthMethod-PlatformCred.ReadWrite
  |           vs UserAuthenticationMethod.ReadWrite) against live permissions reference
  |
  v
Phase 85 (Capability Matrix + L2 Runbooks)
  |       REF-01, REF-02, RUN-01, RUN-02
  |       Pre-edit anchor inventory FIRST (committed artifact, PITFALL-6 / DA-4 convention)
  |       macos-capability-matrix.md Kerberos row + ATOMIC V-63-08 hash update (same commit)
  |       4-platform-capability-comparison.md macOS cells update (link-not-copy)
  |       L2 #28 (28-macos-kerberos-sso-investigation.md) + L2 #29 (29-macos-graph-credential-investigation.md)
  |       l2-runbooks/00-index.md extended (rows 28/29 + escalation mapping) — internal hub only
  |       MUST AVOID: DI-2 (matrix + V-63-08 NEVER split commits), no top-level nav hubs (DI-1)
  |
  v
Phase 86 (Chain Health Pass)
  |       CHAIN-01, CHAIN-02
  |       DEDICATED phase before harness lineage bump — no CHAIN_SKIP masking (DI-3)
  |       Convert 10 legacy HEAD-coupled FAILs in check-phase-{58,59,60,61,62,63,64,65,66,73}.mjs
  |         to frozen-aware reads via _lib/frozen-at-close.mjs helpers
  |       Restore/regenerate 73-RETRO-INVENTORY.md
  |       Full chain (48..82) exits 0 FAIL / 0 SKIPPED on Windows local AND Linux GHA (EXACT MATCH)
  |       MUST NOT fold into Atom 2 of Phase 88 (Anti-Pattern 5 from ARCHITECTURE.md)
  |
  v
Phase 87 (Navigation Hub Integration — NAVIGATION-LAST)
  |       REF-03
  |       All content from Phases 83-85 must be committed before ANY nav-hub edit
  |       docs/index.md: guide 10/11 admin setup rows + L2 #28/#29 desktop engineering rows
  |       docs/common-issues.md: Kerberos escalation entry
  |       docs/quick-ref-l2.md: app-sso platform -s + klist commands
  |       docs/l2-runbooks/00-index.md: rows 28/29 (also touched in Phase 85 as internal hub — 
  |         top-level index.md and common-issues.md strictly navigation-last)
  |       docs/decision-trees/06-macos-triage.md: Kerberos leaf node → L2 #28
  |
  v
Phase 88 (Harness Lineage Bump + Terminal Re-Audit + Milestone Close — MUST BE LAST)
          HARN-01, HARN-02, HARN-03
          V19 (v1.9 close-gate SHA) pinned in _lib/frozen-at-close.mjs BEFORE any
            check-phase-83.mjs is authored (hard ordering constraint)
          Atom 1 (3 files indivisible): v1.10-milestone-audit.mjs (Path-A from v1.9, C1-C16)

            + v1.10-audit-allowlist.json + BASELINE_14 in regenerate-supervision-pins.mjs
          Atom 2 (indivisible set): check-phase-83..88.mjs + audit-harness-v1.10-integrity.yml
            (7th parallel coexistence CI workflow) + _lib/frozen-at-close.mjs V19 entry
          3-axis terminal re-audit: Axis 1 fresh git clone --no-hardlinks +
            Axis 2 cross-OS Linux GHA + Axis 3 fresh zero-context sub-agent;
            cross-OS PASS/FAIL/SKIP EXACT MATCH required
          Close-gate: v1.10-MILESTONE-AUDIT.md + v1.10-DEFERRED-CLEANUP.md +
            4-doc traceability closure (17/17 Validated)
          Predecessor v1.4-v1.9 frozen surfaces BYTE-UNCHANGED invariant
```

**Requirement coverage (17/17 mapped; 0/17 Validated — execution pending):**

| Phase | Requirements | Count |
|-------|-------------|-------|
| 83 | KRB-01, KRB-02, KRB-03, KRB-04 | 4 |
| 84 | GRAPH-01, GRAPH-02, NUAL-01 | 3 |
| 85 | REF-01, REF-02, RUN-01, RUN-02 | 4 |
| 86 | CHAIN-01, CHAIN-02 | 2 |
| 87 | REF-03 | 1 |
| 88 | HARN-01, HARN-02, HARN-03 | 3 |

**Sequential-on-main-tree execution** per `.planning/config.json` `use_worktrees:false` (durable per memory `project_execphase_sequential.md`). Phase 88 terminal re-audit uses fresh `git clone --no-hardlinks` into `$env:TEMP\v1.10-audit-<rand>` (D-03 LOCKED — same mechanism as v1.6/v1.7/v1.8/v1.9 precedent).

**Named decisions (LOCKED at requirements 2026-06-22):**

- KERBEROS-GUIDE-LOCATION: `docs/admin-setup-macos/10-kerberos-sso-extension.md` (mandated by PSSO-FUT-04 backlog item and guide 09's existing forward-reference)
- GRAPH-API-PLACEMENT: Option A — `docs/admin-setup-macos/11-graph-api-platform-credential.md` (keeps complete macOS Platform SSO documentation surface in one numbered sequence 07-11; confirmed by adversarial-review)
- CHAIN-HEALTH-DECISION: dedicated Phase 86 before harness lineage bump (Option A per ARCHITECTURE.md; no CHAIN_SKIP masking)
- NUAL-KEY-LITERALS: verified from Apple `com.apple.extensiblesso` schema — `NewUserAuthorizationMode` + `UserAuthorizationMode` + `EnableCreateUserAtLogin`; `Temporary` value noted but not surfaced in Intune UI
- MULTITENANT-PSSO: DEFERRED to its own architectural milestone (PSSO-FUT-03 explicitly out of scope)

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
- v1.9: 8 phases (75-82), 19 plans — shipped 2026-06-22
- **v1.10 (in progress): 6 phases (83-88), ~17 plans TBD**

## Accumulated Context

### Decisions

**v1.10 adversarial-review decisions (LOCKED 2026-06-22):**

- Area 1 Kerberos: Option A — standalone `10-kerberos-sso-extension.md` guide + cross-links + glossary + matrix + L2 runbook
- Area 2 Graph API: Option A — dedicated `11-graph-api-platform-credential.md` doc (Option A placement) + L2 troubleshooting; Graph API confirmed GA in v1.0
- Area 3 Multi-tenant PSSO: DEFERRED to own architectural milestone (net-new architecture; breaks single-feature-content-milestone convention)
- Area 4 NUAL: Option A — minimal verify + document verified key literals in guide 08; PSSO-FUT-01 closed (key literals confirmed from Apple schema)
- Chain-health: dedicated Phase 86 before harness lineage bump; no CHAIN_SKIP masking (PRE-EXISTING-CHAIN-RED-AT-HEAD-01 resolved in-milestone)

**Durable architectural decisions (carried forward from v1.9):**

- Sequential-on-main-tree per `use_worktrees:false`; atomic harness commit (Atom 1 + Atom 2); frozen-aware via `_lib/frozen-at-close.mjs`; navigation-last invariant; pre-edit anchor inventory before matrix edits; predecessor frozen surfaces BYTE-UNCHANGED
- V-63-08 blob hash in check-phase-63.mjs must be updated atomically with any macos-capability-matrix.md change (PITFALL DI-2)
- `> [!WARNING]` callout required for destructive Graph API DELETE operation (PITFALL G-2)
- Wrong Kerberos extension identifier (K-1) and wrong payload type (K-5) are critical pitfalls — every profile example must use `com.apple.AppSSOKerberos.KerberosExtension` and `Type: Credential`

### Pending Todos

- Identify v1.9 close-gate SHA (V19) before Phase 88 Atom 2 authoring: `git log --all --grep="close-gate" --grep="v1.9" --all-match -1`
- At Phase 84 plan time: verify Intune Settings Catalog NUAL display names vs Apple schema; confirm least-privilege Graph delete scope against live permissions reference
- At Phase 83 plan time: verify `app-sso kerberos` subcommand surface against macOS 14.6+ man page before incorporating beyond `app-sso platform -s` + `klist`

### Blockers/Concerns

Execution-time checks (not blockers — must be addressed within specified phases):

- Phase 83: `app-sso kerberos` subcommand verification (MEDIUM confidence; default to `app-sso platform -s` + `klist`)
- Phase 84: NUAL Settings Catalog display-name second-pass (confirm display names match Apple schema key names; document divergence if any)
- Phase 84: Graph API delete permission least-privilege scope resolution (`UserAuthMethod-PlatformCred.ReadWrite` vs `UserAuthenticationMethod.ReadWrite`)
- Phase 83: Azure Files Cloud-Kerberos GA status check at guide 10 execution time (verify still preview; document accordingly)

## Session Continuity

Last session: 2026-06-23T23:24:44.529Z
Stopped at: Phase 86 context gathered
Resume file: .planning/phases/86-chain-health-pass/86-CONTEXT.md
Next action: `/gsd-plan-phase 83`

## Operator Next Steps

- Run `/gsd-plan-phase 83` to begin Phase 83 planning

## Performance Metrics

| Phase | Plan | Duration | Notes |
|-------|------|----------|-------|
| Phase 83-kerberos-sso-extension-guide P03 | 277 | 3 tasks | 3 files |
| Phase 83 P02 | 15m | 3 tasks | 1 files |
| Phase 84 P02 | 15m | 3 tasks | 3 files |
| Phase 85 P01 | 10m | 3 tasks | 3 files |
| Phase 85 P03 | 20m | 3 tasks | 3 files |
