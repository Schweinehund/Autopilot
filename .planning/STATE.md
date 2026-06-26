---
gsd_state_version: 1.0
milestone: v1.11
milestone_name: macOS PSSO End-to-End Provisioning & MDM Migration
status: planning
last_updated: "2026-06-26T02:29:39.688Z"
last_activity: 2026-06-25
progress:
  total_phases: 5
  completed_phases: 4
  total_plans: 9
  completed_plans: 9
  percent: 80
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-24)

**Core value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices — including Apple-platform single sign-on (macOS Platform SSO + Kerberos SSO + programmatic Platform Credential management) — through Microsoft Intune / Entra ID without escalating to engineering.
**Current focus:** Phase 93 — harness lineage bump + terminal re audit + milestone close

## Current Position

Phase: 93
Plan: Not started
Status: Ready to plan
Last activity: 2026-06-25

```
Phase 89-93 Progress: [████████░░] 80%
Phases: 4/5 complete
```

## v1.11 Phase Dependency Summary

```
Phase 89 (PSSO Provisioning Walkthrough — Pillar A)
  |       PROV-01, PROV-02, PROV-03, PROV-04
  |       NEW: docs/macos-lifecycle/01-psso-provisioning-walkthrough.md
  |       MODIFIED (content-phase, NOT nav-last):
  |         - docs/macos-lifecycle/00-ade-lifecycle.md — See Also cross-link
  |         - docs/admin-setup-macos/07-platform-sso-setup.md — See Also cross-link
  |         - docs/admin-setup-macos/02-enrollment-profile.md — See Also cross-link
  |       Research flags (verify on authoring day):
  |         - ADE-during-Setup-Assistant GA status + CP 5.2604.0 LOB floor
  |           against current Microsoft Learn (not late-2025 community posts)
  |         - macOS 26 final GA confirmation; add last_verified stamps
  |       MUST AVOID: any nav-hub edits (docs/index.md, common-issues.md,
  |                   quick-ref-l2.md, decision-trees/06-macos-triage.md);
  |                   duplicating guide 00/02/07 content inline (link-not-copy);
  |                   editing guide 00/02/07 for content additions (frozen for v1.11);
  |                   omitting last_verified/review_by on macOS-26-gated sections
  |
  v
Phase 90 (MDM Migration Walkthrough + L2 Runbook #30 — Pillar B)
  |       MIG-01, MIG-02, MIG-03, MIG-04, RUN-01
  |       NEW: docs/macos-lifecycle/02-mdm-migration-psso.md
  |       NEW: docs/l2-runbooks/30-macos-mdm-migration-failure.md
  |       MODIFIED (content-phase, NOT nav-last):
  |         - docs/l2-runbooks/00-index.md — append #30 row (internal hub)
  |         - docs/l2-runbooks/27-macos-sso-investigation.md — See Also cross-link
  |       Research flags (verify at plan time — HIGH open gaps):
  |         - Intune profile-based-enrollment config for migrated macOS 26 devices
  |           (Apple says result is profile-based; unclear if Intune needs config
  |           beyond ADE token assignment — verify before stating as fact)
  |         - Current Iru console device-deletion steps post-rebrand
  |           (support.kandji.io; Iru blog)
  |         - Supervision status preserved post-migration — MEDIUM confidence;
  |           pilot-device verification required before stating as fact
  |         - One-time reset for pre-26-ABM-enrolled devices — MEDIUM confidence;
  |           document with confidence callout, recommend pilot test
  |       KEY FACTS (firm, verified):
  |         - PSSO re-registration ALWAYS required post-migration (Apple authoritative)
  |         - OS-26 migration IS genuine unenroll+reenroll (NOT profile-swap)
  |         - ACME cert IS reissued on genuine re-enrollment
  |         - profiles renew is NOT a shortcut for ADE-enrolled Kandji devices
  |         - VPP token must be revoked in Kandji/Iru BEFORE upload to Intune
  |         - Pre-migration OS gate check required (macOS 26 hard gate)
  |         - Sync lag: up to 24h auto-sync; 15-min manual rate limit; 7-day full cooldown
  |       MUST AVOID: nav-hub files; duplicating guide 00/02/07 inline;
  |                   stating PSSO key survives migration (Apple authoritative: never);
  |                   stating supervision preserved (MEDIUM confidence only);
  |                   using profiles renew as pre-26 shortcut for ADE devices
  |
  v
Phase 91 (Glossary + Capability Matrix — Pillar C content portion)
  |       REF-01, REF-02
  |       MODIFIED:
  |         - docs/_glossary-macos.md — MDM Migration, Assign Device Management,
  |                                      Deadline, Kandji→Iru rebrand note
  |         - docs/_glossary.md — reciprocal see-also
  |         - docs/reference/macos-capability-matrix.md — migration row
  |           ATOMIC with check-phase-63.mjs V-63-08 hash update
  |           (baseline: 73f16378197223378a8507a6751c763902de58db — verify on authoring day)
  |           Pre-edit anchor inventory artifact FIRST (Phase 85 Plan 85-01 precedent)
  |         - docs/reference/4-platform-capability-comparison.md — macOS migration cells
  |           ATOMIC with equivalent blob-hash update
  |       MUST AVOID: editing capability matrix without same-commit V-63-08 hash update;
  |                   adding cross-links in matrix to guide files that don't yet exist
  |
  v
Phase 92 (Navigation Hub Integration — NAVIGATION-LAST)
  |       NAV-01
  |       NAVIGATION-LAST: ALL content from Phases 89-91 MUST be confirmed committed
  |       before ANY nav-hub edit is committed (DA-3 invariant)
  |       MODIFIED (all nav-last):
  |         - docs/index.md
  |         - docs/common-issues.md
  |         - docs/quick-ref-l2.md
  |         - docs/decision-trees/06-macos-triage.md
  |       MUST AVOID: committing any nav-hub edit before verifying content files exist
  |
  v
Phase 93 (Harness Lineage Bump + Terminal Re-Audit + Milestone Close — MUST BE LAST)
          HARN-01, HARN-02, HARN-03
          V110 (v1.10 close-gate SHA a3617e9) pinned in _lib/frozen-at-close.mjs BEFORE
            any check-phase-89.mjs is authored (hard ordering constraint)
          Atom 1 (3 files indivisible): v1.11-milestone-audit.mjs (Path-A from v1.10, C1-C16)

            + v1.11-audit-allowlist.json + BASELINE_15 in regenerate-supervision-pins.mjs
          Atom 2 (indivisible set): check-phase-89..93.mjs + audit-harness-v1.11-integrity.yml
            (8th parallel coexistence CI workflow) + _lib/frozen-at-close.mjs V110 entry
          3-axis terminal re-audit: Axis 1 fresh git clone --no-hardlinks +
            Axis 2 cross-OS Linux GHA + Axis 3 fresh zero-context sub-agent;
            cross-OS PASS/FAIL/SKIP EXACT MATCH required
          Close-gate: v1.11-MILESTONE-AUDIT.md + v1.11-DEFERRED-CLEANUP.md +
            4-doc traceability closure (15/15 Validated)
          Predecessor v1.4-v1.10 frozen surfaces BYTE-UNCHANGED invariant
```

**Requirement coverage (15/15 mapped; 0/15 Validated — v1.11 IN PROGRESS):**

| Phase | Requirements | Count |
|-------|-------------|-------|
| 89 | PROV-01, PROV-02, PROV-03, PROV-04 | 4 |
| 90 | MIG-01, MIG-02, MIG-03, MIG-04, RUN-01 | 5 |
| 91 | REF-01, REF-02 | 2 |
| 92 | NAV-01 | 1 |
| 93 | HARN-01, HARN-02, HARN-03 | 3 |

**Sequential-on-main-tree execution** per `.planning/config.json` `use_worktrees:false` (durable per memory `project_execphase_sequential.md`). Phase 93 terminal re-audit uses fresh `git clone --no-hardlinks` into `$env:TEMP\v1.11-audit-<rand>` (D-03 LOCKED — same mechanism as v1.6/v1.7/v1.8/v1.9/v1.10 precedent).

**Named decisions (LOCKED at roadmap 2026-06-24):**

- SCENARIO-DOC-LOCATION: `docs/macos-lifecycle/` (not `admin-setup-macos/`; multi-role journey docs go in `*-lifecycle/` per cross-platform parallelism; iOS/Android analog confirmed)
- MIGRATION-WALKTHROUGH-NUMBERING: `01-psso-provisioning-walkthrough.md`, `02-mdm-migration-psso.md` (following `00-ade-lifecycle.md` existing file)
- L2-RUNBOOK-NUMBER: #30 (`docs/l2-runbooks/30-macos-mdm-migration-failure.md`; global sequential; last = #29)
- PSSO-SURVIVAL: PSSO re-registration ALWAYS required post-migration — Apple authoritative ("MDM unenrollment = IdP unregistration"); same-tenant key-survival hypothesis NOT documented (LOW confidence, no authoritative source)
- MIGRATION-MECHANISM: OS-26 path is genuine unenroll+reenroll (NOT profile-swap); Intune result is profile-based enrollment; ACME cert reissued
- PHASE-COUNT: 5 phases (89-93) per research SUMMARY recommended sequence; confirmed by dependency analysis

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
- v1.10: 6 phases (83-88), 16 plans — shipped 2026-06-24
- **v1.11 (in progress): 5 phases (89-93), plan count TBD**

## Accumulated Context

### Decisions

**v1.11 roadmap decisions (LOCKED 2026-06-24):**

- Pillar A provisioning: two delivery paths in one doc (standard post-enrollment + ADE-during-SA macOS 26+); both in `01-psso-provisioning-walkthrough.md`
- Pillar B migration: two paths in one doc (OS-26 in-place + pre-26 fallback) + dedicated L2 runbook #30
- Pillar C nav: capability-matrix + glossary in Phase 91; nav-hubs strictly Phase 92 (navigation-last invariant)
- Pillar D harness: Phase 93 is LAST; Atom 1 + Atom 2 two-atomic-commit pattern per v1.10 Phase 88 precedent
- Research-summary proposed 5-phase sequence (89-93) ADOPTED as-is; dependency analysis confirms no reordering needed

**Durable architectural decisions (carried forward from v1.10):**

- Sequential-on-main-tree per `use_worktrees:false`; atomic harness commit (Atom 1 + Atom 2); frozen-aware via `_lib/frozen-at-close.mjs`; navigation-last invariant; pre-edit anchor inventory before matrix edits; predecessor frozen surfaces BYTE-UNCHANGED
- V-63-08 blob hash in check-phase-63.mjs must be updated atomically with any macos-capability-matrix.md change (PITFALL DA-5)
- Predecessor guides 00/02/07 are FROZEN for v1.11 (content additions in new files only; reciprocal See Also cross-links are permitted as append-only edits)
- Link-not-copy architecture: scenario guides stitch the journey but do NOT inline guide 00/02/07 prose
- Per-section `last_verified`/`review_by` stamps required on all macOS-26-gated sections (90-day review cycle per guide 07 ADE section precedent)
- [Phase ?]: D-01/D-02/D-04: Shared pre-flight hard-fork; Stage 9 migration-delta-only PSSO re-registration; vendor-neutral Kandji/Iru authoring with both names
- [Phase ?]: D-03 executed: L2 #30 Track C link-not-copies to L2 #27 for PSSO registration-failure investigation (no inline duplication)
- [Phase ?]: RUN-01 satisfied: 30-macos-mdm-migration-failure.md authored with three parallel tracks, L2 #10 prereq cross-link, ABM admin recovery in MEDIUM-confidence callouts, no same-tenant key-survival claim
- [Phase ?]: Pre-edit blob hashes re-measured 2026-06-24: V-63-08 (73f16378) and V-63-09 (2314ede7) confirmed unchanged; macos-capability-matrix.md has no ## Version History heading

### Pending Todos

- At Phase 89 plan time: verify ADE-during-Setup-Assistant GA status + Company Portal 5.2604.0 LOB floor against current Microsoft Learn (not late-2025 community sources)
- At Phase 89 plan time: verify macOS 26 final GA date; apply `last_verified: <authoring-day>` / `review_by: <authoring-day+90>` stamps on all OS-26-gated sections
- At Phase 90 plan time: resolve HIGH open gap — Intune profile-based-enrollment config requirement for OS-26-migrated macOS devices (Apple says result is profile-based; verify if Intune needs explicit config beyond ADE token assignment)
- At Phase 90 plan time: verify Iru console post-rebrand device-deletion steps (support.kandji.io)
- At Phase 90 plan time: supervision-status preserved post-migration — pilot-device test before stating as fact (MEDIUM confidence; Apple support guide silent on this)
- At Phase 91 plan time: verify V-63-08 current baseline (`git hash-object docs/reference/macos-capability-matrix.md`) on authoring day before any matrix edit
- At Phase 91 plan time: confirm blob-hash variable name for `4-platform-capability-comparison.md` in the governing `check-phase-NN.mjs` validator before editing
- At Phase 93 plan time: confirm V110 = v1.10 close-gate SHA `a3617e9` (`git log --grep="close-gate" --grep="v1.10" --all-match -1`)

### Blockers/Concerns

Execution-time checks (not blockers — must be addressed within specified phases):

- Phase 89: ADE-during-Setup-Assistant GA + CP 5.2604.0 verification on authoring day (DA-1 pitfall)
- Phase 90: HIGH confidence gap — Intune profile-based-enrollment config for migrated macOS 26 devices
- Phase 90: MEDIUM confidence — Iru console device-deletion steps; supervision post-migration status
- Phase 91: V-63-08 blob-hash current value must be measured on authoring day (not from research, which cites `73f16378...` as a point-in-time snapshot)

## Session Continuity

Last session: 2026-06-26T02:29:39.659Z
Stopped at: Phase 93 context gathered
Resume file: .planning/phases/93-harness-lineage-bump-terminal-re-audit-milestone-close/93-CONTEXT.md
Next action: `/gsd-plan-phase 89`

## Operator Next Steps

- Plan Phase 89: `/gsd-plan-phase 89`

## Performance Metrics

| Phase | Plan | Duration | Notes |
|-------|------|----------|-------|
| (v1.11 phases not yet started) | — | — | — |
| Phase 89 P01 | 339s | 2 tasks | 1 files |
| Phase 90 P01 | 23m | 2 tasks | 1 files |
| Phase 90-mdm-migration-walkthrough-l2-runbook-30 P02 | 5m | 2 tasks | 1 files |
| Phase 91 P01 | 8m | 2 tasks | 2 files |
| Phase 91 P02 | 4m | 1 tasks | 1 files |
| Phase 91 P03 | 5m | 1 tasks | 3 files |
| Phase 92 P01 | 4m 42s | 5 tasks | 4 files | nav-hub integration, single atomic commit |
