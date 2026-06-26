---
gsd_state_version: 1.0
milestone: v1.12
milestone_name: macOS MDM-Migration Verification Closure
status: verifying
last_updated: "2026-06-26T23:37:58.274Z"
last_activity: 2026-06-26
progress:
  total_phases: 2
  completed_phases: 2
  total_plans: 5
  completed_plans: 5
  percent: 100
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-26 after v1.11 milestone)

**Core value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices — including Apple-platform single sign-on (macOS Platform SSO + Kerberos SSO + programmatic Platform Credential management), end-to-end PSSO provisioning, and Kandji/Iru→Intune MDM migration — through Microsoft Intune / Entra ID without escalating to engineering.
**Current focus:** Phase 95 — harness-lineage-bump-terminal-re-audit-milestone-close

## Current Position

Phase: 95 (harness-lineage-bump-terminal-re-audit-milestone-close) — COMPLETE
Plan: 4 of 4 — COMPLETE
Status: Phase complete — ready for verification
Last activity: 2026-06-26

## v1.12 Phase Dependency Summary

```
Phase 94 (Post-Migration Verification Content Closure)
  |       MIGV-01, MIGV-02, MIGV-03
  |       MODIFIED (surgical patches to existing file only — no new files):
  |         - docs/macos-lifecycle/02-mdm-migration-psso.md
  |           * MIGV-01: addendum to post-migration verification steps OR pre-migration
  |             readiness-checklist sidebar — full-confidence, Microsoft Learn verified —
  |             whether Intune requires config beyond ADE token assignment for
  |             profile-based enrollment resulting from OS-26 in-place migration;
  |             last_verified/review_by stamps required
  |           * MIGV-02: confirm-or-correct Iru console device-deletion UI path
  |             (checked against support.iru.io); confirm secret-retrieval pre-flight
  |             still required; both "Kandji" and "Iru" names remain for searchability
  |           * MIGV-03: explicit MEDIUM-confidence callout on supervision status —
  |             most-likely behavior + sources; pilot recommendation (`profiles status`
  |             / `profiles list` before-and-after); NO claim PSSO key survives
  |             (Apple authoritative: re-registration always required); NOT a flat
  |             assertion; NOT an author-unrunnable procedure; last_verified/review_by
  |       POSSIBLY MODIFIED (only if MIGV-01 answer affects triage):
  |         - docs/l2-runbooks/30-macos-mdm-migration-failure.md
  |       Research flags (must be resolved at plan time — NOT pre-blocked):
  |         - MIGV-01: Microsoft Learn — current profile-based enrollment config
  |           requirement for Intune after OS-26 in-place ABM migration (is ADE token
  |           assignment alone sufficient, or is additional config required?)
  |         - MIGV-02: support.iru.io / current Iru support portal — device-deletion
  |           UI path post-rebrand (Oct 2025); confirm Activation Lock bypass +
  |           FileVault key secret-retrieval pre-flight still required
  |         - MIGV-03: best-available sources on supervision preservation after
  |           OS-26 in-place migration (Apple MDM protocol spec, developer forums,
  |           community reports — pilot-test recommended but cannot be author-run)
  |       HARD CONSTRAINTS:
  |         - MIGV-03 ships as MEDIUM-confidence callout ONLY (adversarial-review
  |           verdict 1-A / 3-iii — locked; NOT a flat assertion, NOT an
  |           author-unrunnable procedure)
  |         - MIGV-01 documented at full confidence ONLY after Microsoft Learn
  |           verification (not assumed)
  |         - All OS-26-gated additions carry last_verified/review_by stamps
  |           (90-day cycle per guide 07 ADE-section precedent)
  |         - DO NOT bundle CI-3 Managed-Apple-ID→Account rename (byte-unchanged
  |           hazard, adversarial-review ruled out-of-scope)
  |         - DO NOT edit nav-hub files (docs/index.md, common-issues.md,
  |           quick-ref-l2.md, decision-trees/06-macos-triage.md) — guide 02 is
  |           already navigation-wired from v1.11; no new files, no nav-last phase
  |         - DO NOT add new files — v1.12 patches the single existing guide 02 only
  |
  v
Phase 95 (Harness Lineage Bump + Terminal Re-Audit + Milestone Close — MUST BE LAST)
          HARN-01, HARN-02, HARN-03
          V111 (v1.11 close-gate SHA — candidate 919b23b; CONFIRM with
            `git log --grep="close-gate" --grep="v1.11" --all-match -1` on authoring day)
            pinned in _lib/frozen-at-close.mjs BEFORE any check-phase-94.mjs is authored
          Atom 1 (3 files indivisible — HARN-01):

            - v1.12-milestone-audit.mjs (Path-A from v1.11, C1-C16 inherited)
            - v1.12-audit-allowlist.json (sidecar repointed)
            - BASELINE_16 freshness comment in regenerate-supervision-pins.mjs
          Atom 2 (indivisible set — HARN-02):

            - check-phase-94.mjs + check-phase-95.mjs (per-phase validators;
              chain-apex CHAIN_PHASES=[48..94] (47 entries), CHAIN_SKIP=new Set([]))

            - _lib/frozen-at-close.mjs V111 entry (v1.11 close-gate SHA)
            - audit-harness-v1.12-integrity.yml (9th parallel CI coexistence workflow;
              predecessors v1.4-v1.11 byte-unchanged)
          3-axis terminal re-audit (HARN-03):

            - Axis 1: fresh git clone --no-hardlinks into $env:TEMP\v1.12-audit-<rand>
            - Axis 2: cross-OS Linux GHA (BOTH chain validators authoritative per D-03 corrected —
              Linux GHA authoritative given WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..94])

            - Axis 3: fresh zero-context sub-agent
            - cross-OS PASS/FAIL/SKIP EXACT MATCH required
          Close-gate: v1.12-MILESTONE-AUDIT.md + v1.12-DEFERRED-CLEANUP.md +
            4-doc traceability closure (6/6 Validated)
          Predecessor v1.4-v1.11 frozen surfaces BYTE-UNCHANGED invariant
```

## v1.12 Requirement Coverage (6/6 mapped; 6/6 Validated — CLOSED)

| Phase | Requirements | Count |
|-------|-------------|-------|
| 94 | MIGV-01, MIGV-02, MIGV-03 | 3 |
| 95 | HARN-01, HARN-02, HARN-03 | 3 |

**Sequential-on-main-tree execution** per `.planning/config.json` `use_worktrees:false` (durable per memory `project_execphase_sequential.md`). Phase 95 terminal re-audit uses fresh `git clone --no-hardlinks` into `$env:TEMP\v1.12-audit-<rand>` (D-03 LOCKED — same mechanism as v1.6–v1.11 precedent). Linux GHA BOTH chain validators are authoritative (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..94]; D-03 corrected OS split applied).

**Named decisions (LOCKED at roadmap 2026-06-26):**

- PHASE-COUNT: 2 phases (94-95) — content closure (94) + harness/close (95); no navigation-last phase (guide 02 already wired in v1.11)
- MIGV-03-FRAMING: MEDIUM-confidence callout + pilot recommendation only (adversarial-review verdict 3-iii — locked; NOT flat assertion, NOT author-unrunnable procedure)
- MIGV-01-CONFIDENCE: Full confidence ONLY after Microsoft Learn verification on authoring day
- CI-3-DEFERRED: Managed-Apple-ID→Account rename remains deferred (adversarial-review ruled byte-unchanged-hazard + motivated scope-padding)
- SCOPE-LOCKED: v1.12 patches guide 02 only; no new files; no new hub entries; no tooling refactors bundled
- HARNESS-LINEAGE: 10th Path-A milestone (v1.4→v1.12); BASELINE_16; V111 pin; 9th CI workflow

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
- v1.11: 5 phases (89-93), 13 plans — shipped 2026-06-26
- **v1.12 (in progress): 2 phases (94-95), plan count TBD**

## Accumulated Context

### Decisions

**v1.12 roadmap decisions (LOCKED 2026-06-26):**

- Two-phase structure adopted (content closure Phase 94 + harness/close Phase 95); navigation-last phase not required because guide 02 is already nav-wired from v1.11
- MIGV-01/02/03 grouped into single Phase 94 — all three edit the same file, are a tight thematic cluster (post-migration verification), and can proceed together once plan-time research resolves the open gaps
- Phase 95 mirrors v1.11 Phase 93 exactly: Atom 1 (v1.12-milestone-audit.mjs + allowlist + BASELINE_16) → Atom 2 (check-phase-94..95.mjs + V111 pin + 9th CI workflow) → HARN-03 (3-axis re-audit + close artifacts)
- Adversarial-review verdict preserved: 1-A / 2-A / 3-iii — supervision as MEDIUM-confidence callout; full Path-A close; no CI-3 bundling

**Durable architectural decisions (carried forward from v1.11):**

- Sequential-on-main-tree per `use_worktrees:false`; atomic harness commit (Atom 1 + Atom 2); frozen-aware via `_lib/frozen-at-close.mjs`; predecessor frozen surfaces BYTE-UNCHANGED
- Per-section `last_verified`/`review_by` stamps required on all OS-26-gated additions (90-day review cycle)
- Link-not-copy architecture preserved (guide 02 references guides 00/01/07 for PSSO; no inline duplication)
- V-63-08 blob hash in check-phase-63.mjs: v1.12 does NOT edit `macos-capability-matrix.md` (no matrix update needed); no blob-hash concern for this milestone
- Guide 01 (psso-provisioning-walkthrough.md) and the nav-hub files are FROZEN for v1.12

### Pending Todos

- At Phase 94 plan time: Microsoft Learn verification — does Intune require config beyond ADE token assignment when OS-26 in-place ABM migration yields profile-based enrollment? Document at full confidence only after verification (MIGV-01)
- At Phase 94 plan time: support.iru.io / Iru support portal — confirm current post-rebrand device-deletion UI path; confirm or correct guide 02 Kandji/Iru source-side section (MIGV-02)
- At Phase 94 plan time: best-available sources on supervision status post-OS-26-in-place migration — collect and assess; frame as MEDIUM-confidence callout only (MIGV-03)
- Phase 95 COMPLETED: V111 = 919b23b confirmed (v1.11 close-gate `docs(93-04)`)
- Phase 95 COMPLETED: CHAIN_PHASES=[48..94] (47 entries) — CONFIRMED per D-01 apex correction (corrects roadmap-locked [48..93] off-by-one; [48..N-1] triple-confirmed invariant)

### Blockers/Concerns

Execution-time checks (not blockers — must be addressed within specified phases):

- Phase 94: MIGV-01 — answer only at full confidence after Microsoft Learn verification; do not document as assumed
- Phase 94: MIGV-02 — Iru console UI may have changed post-rebrand; verify against live support.iru.io
- Phase 94: MIGV-03 — MEDIUM confidence only; adversarial-review verdict 3-iii is LOCKED; any attempt to ship as flat assertion violates the locked scope decision
- Phase 95 RESOLVED: WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..94] — mitigated by D-03 corrected OS split (Linux GHA BOTH chain validators authoritative); carried in v1.12-DEFERRED-CLEANUP.md

## Session Continuity

Last session: 2026-06-26T23:37:58.261Z
Stopped at: Phase 95 Plan 95-04 close-gate — v1.12 MILESTONE CLOSED
Resume file: None
Next action: `/gsd-complete-milestone v1.12`

## Operator Next Steps

- Run `/gsd-complete-milestone v1.12` to archive phase dirs, clean cruft, and close Jira story

## Performance Metrics

| Phase | Plan | Duration | Notes |
|-------|------|----------|-------|
| (v1.12 phases not yet started) | — | — | — |
| Phase 94 P01 | 25m | 2 tasks | 1 files |
| Phase 95 P01 | 690 | 2 tasks | 4 files |
| Phase 95 P03 | 20 | 3 tasks | 1 files |
| Phase 95 P95-04 | 25 minutes | 2 tasks | 7 files |
