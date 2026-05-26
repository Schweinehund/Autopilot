---
gsd_state_version: 1.0
milestone: v1.7
milestone_name: Deferred Backlog Closure + Validator Chain Hardening
status: executing
stopped_at: Phase 67 context gathered
last_updated: "2026-05-26T15:53:28.435Z"
last_activity: 2026-05-26 -- Phase 67 planning complete
progress:
  total_phases: 9
  completed_phases: 0
  total_plans: 3
  completed_plans: 0
  percent: 0
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-25)

**Core value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices through Intune without escalating to engineering — and now, internal organizations can manage their own Apple device pools (VPP catalogs, shared iPad passcode resets, device releases, MDM server assignments, account provisioning, device transfers, audit access, shared iPad / Apple TV lifecycle) without escalating to a central tenant admin
**Current focus:** v1.7 entry-phase — Phase 67 (Corpus Surgical Sweeps, Pillar A)

## Current Position

Phase: 67 (not started — roadmap authored 2026-05-26)
Plan: —
Status: Ready to execute
Last activity: 2026-05-26 -- Phase 67 planning complete

## v1.7 Phase Dependency Summary

```
Phase 67 (Pillar A — Corpus Surgical Sweeps)
  │       SWEEP-01 (CI-1 ABM URLs, 4 files) + SWEEP-02 (CI-2 VPP location token, 2 files)
  │       Lowest-risk warm-up: 6 surgical edits total; establishes v1.7 pattern
  │       (atomic small edits + Version History rows + chain validator re-runs)
  ↓
Phase 68 (Pillar B — CHAIN_SKIP Root-Cause Resolution)
  │       CHAIN-01 (CRLF regex `\n` → `\r?\n` in check-phase-{51,58}.mjs)
  │       CHAIN-02 (archive-path detection in check-phase-48.mjs +
  │                 line-number drift in regenerate-supervision-pins.mjs --self-test)
  │       CHAIN-03 (cascade fixes to check-phase-{60,61}.mjs +
  │                 ATOMIC CHAIN_SKIP removal across check-phase-62..66.mjs)
  │       Modifies 7 validator files; atomic-commit pattern preserves chain
  │       indivisibility (precedent: v1.6 Phase 66-02 commit 3a9a671)
  ↓
Phase 69 (Pillar C — CI-Linux Hardening)
  │       CILINUX-01 (new ubuntu-latest runner job; full chain on LF line endings)
  │       Depends on Phase 68: CHAIN_SKIP must already be removed so the new
  │       Linux job sees a clean chain; coexists with v1.4/v1.5/v1.6 workflows
  ↓
Phase 70 (Pillar D — v1.7 Harness Lineage Bump + Milestone Close)
          HARNESS-01 (v1.7-milestone-audit.mjs Path-A from v1.6, C1-C16 inherited)
          HARNESS-02 (v1.7-audit-allowlist.json + BASELINE_11)
          HARNESS-03 (check-phase-67..70.mjs validator-as-deliverable)
          HARNESS-04 (audit-harness-v1.7-integrity.yml; composes with Phase 69)
          HARNESS-05 (terminal re-audit from fresh git clone --no-hardlinks
                      per D-03 LOCKED; STRICTER than worktree; reconciles
                      D-22 INTENT with use_worktrees:false)
          HARNESS-06 (v1.7-MILESTONE-AUDIT.md + v1.7-DEFERRED-CLEANUP.md +
                      traceability closure across PROJECT/ROADMAP/STATE/REQUIREMENTS)
          Atomic harness commit pattern (v1.5 Plan 60-08 / v1.6 Phase 62-08 +
          Phase 66-02 precedent)
```

**Wave designation map:**

- **Wave A (sequential — corpus warm-up):** Phase 67 — lowest-risk, establishes v1.7 pattern
- **Wave B (sequential — validator surgery):** Phase 68 — modifies 7 validator files in atomic chunks (CHAIN-01/02/03 each potentially landing as own commit, with the final CHAIN_SKIP removal across check-phase-62..66.mjs forced atomic)
- **Wave C (sequential close-gate):** Phase 69 (CI-Linux confirms green chain) → Phase 70 (harness lineage bump + terminal re-audit + milestone close)

**Sequential-on-main-tree execution** per `.planning/config.json` `use_worktrees:false` (durable per memory `project_execphase_sequential.md`). Phase 70 terminal re-audit uses fresh `git clone --no-hardlinks` into `$env:TEMP\v1.7-audit-<rand>` (D-03 LOCKED — same mechanism as v1.6 Phase 66-04).

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
- **v1.7 (planning): 4 phases (67-70), 12-18 plans estimated, ~1 week elapsed time target**

**Totals (through v1.6):** 66 phases, 310 plans, ~248 documentation files across Windows APv1/APv2, macOS ADE, iOS/iPadOS, Android Enterprise, Linux (Ubuntu LTS), and Apple Business Delegated Governance (OUs + custom roles + delegation runbooks).

**v1.7 anticipated scope:** ~6 corpus surgical edits (Phase 67) + ~7 validator file modifications (Phase 68) + ~1 new CI workflow job (Phase 69) + ~10 harness lineage files (Phase 70 — v1.7-milestone-audit.mjs + v1.7-audit-allowlist.json + check-phase-67..70.mjs + audit-harness-v1.7-integrity.yml + v1.7-MILESTONE-AUDIT.md + v1.7-DEFERRED-CLEANUP.md + traceability updates). No new documentation files (cleanup + tooling milestone, not content milestone).

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table. All v1.0–v1.6 decisions validated with outcomes.

**v1.7 architectural decisions (durable):**

- **Sequential-on-main-tree execution** — `.planning/config.json:7` `use_worktrees:false` is durable per memory `project_execphase_sequential.md`. v1.7 inherits this constraint from v1.6.
- **Fresh-clone D-03 LOCKED mechanism** — Phase 70 terminal re-audit uses fresh `git clone --no-hardlinks` into `$env:TEMP\v1.7-audit-<rand>` per the D-03 mechanism established at v1.6 Phase 66-04 (commit `489edca`). STRICTER physical isolation than worktree precedent (separate `.git/` via `--no-hardlinks` rather than shared); reconciles D-22 INTENT with `use_worktrees:false` constraint.
- **Atomic harness commit pattern** — Pillar D lineage bump (Phase 70) follows v1.5 Plan 60-08 / v1.6 Phase 62-08 / v1.6 Phase 66-02 atomic-commit precedent. The 3-file indivisible commit (milestone-audit.mjs + audit-allowlist.json + regenerate-supervision-pins.mjs BASELINE refresh) lands as ONE commit to preserve atomicity.
- **Atomic CHAIN_SKIP removal** — Phase 68 CHAIN-03 forces the 5-entry CHAIN_SKIP removal across `check-phase-62..66.mjs` as ONE indivisible commit to preserve chain-validator topology indivisibility per the same atomic-commit logic as the v1.6 Phase 66-02 harness commit.
- **CI-3 (Managed Apple ID) DEFERRED to v1.8+** — Trigger condition (Microsoft Intune portal adopts rebrand) not met as of 2026-04-30 tutorial refresh per `STATE.md:141` notation. Sweeping the 45 occurrences across 16 files now would create term-mismatch with admin's actual portal experience. CI-3 routes from `v1.6-DEFERRED-CLEANUP.md` → `v1.7-DEFERRED-CLEANUP.md` at Phase 70 close.
- **CI-Linux as new auditor-independence axis** — Phase 69 introduces a new dimension to auditor-independence beyond fresh-clone (D-03) and fresh-sub-agent (D-22): separate OS (Linux LF line endings) running on separate host process (GitHub Actions ubuntu-latest runner). Three independence axes now stack at terminal re-audit.

**Patterns carried forward into v1.7:**

- Audit harness file-versioning lineage — `v1.6-milestone-audit.mjs` → `v1.7-milestone-audit.mjs` (Path-A copy + additive if any; preserves predecessor reproducibility)
- Sidecar `scripts/validation/v1.7-audit-allowlist.json` co-located with harness
- Validator-as-deliverable — per-phase `check-phase-67.mjs..check-phase-70.mjs` ship alongside content (or alongside validator surgery in Phase 68's case)
- Verification-during-execution — every phase produces VERIFICATION.md BEFORE downstream phases consume it (v1.2 retro lesson)
- Traceability updates in commit workflow, not deferred to milestone audit (v1.2 retro lesson)
- TBD scanning post-execution checklist (v1.2 retro lesson)
- Auditor-independence via fresh sub-agent + fresh git clone — Phase 70 terminal re-audit spawned distinct from content-phase author-agents (v1.6 Phase 66-04 precedent)
- Atomic-harness-commit pattern — Phase 70 audit harness landing inherits v1.5 Plan 60-08 / v1.6 Phase 62-08 / v1.6 Phase 66-02 atomic-commit contract
- Sequential-on-main-tree per `use_worktrees:false` durable user constraint

**Anti-regression invariants inherited from v1.0-v1.6 (must be preserved by every v1.7 phase):**

- C12 240-cell math (6 H2 × 5 platform cols × 48 rows) preserved — no edits to `4-platform-capability-comparison.md` in v1.7
- D-13/D-18 sibling-anchor-pin contract preserved across 4 sibling matrices — `macos-capability-matrix.md` + `4-platform-capability-comparison.md` remain byte-unchanged in v1.7
- PITFALL-6 pre-edit anchor inventory mandatory before any edit to existing capability matrices, glossaries, or hub files (applies to Phase 67 SWEEP-01/02 since edits touch `_glossary-macos.md` and admin-setup docs)
- Append-only contract on existing hub files (`docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/operations/00-index.md`, `docs/index.md`) — v1.7 makes NO hub edits (cleanup + tooling milestone)
- L1 runbook count NOT changed in v1.7 (v1.6 added #34; v1.7 makes no runbook additions)
- L2 runbook count NOT changed in v1.7 (v1.6 added #26; v1.7 makes no runbook additions)
- Auditor-independence at terminal re-audit (fresh clone per v1.6 D-03)
- BASELINE_10 v1.6 carry-over MUST be closed by Phase 70 HARNESS-02 (BASELINE_11 refresh)

### Pending Todos

- Phase 67 plan authoring — read `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` CI-1 + CI-2 enumerated tables; verify SWEEP-01 URL state against live Apple; surgical edits + Version History rows + sidecar c13_rotting_external update; chain validator re-runs
- Phase 68 plan authoring — read `scripts/validation/check-phase-64.mjs:65-73` documented root causes; sequence CHAIN-01 (CRLF) → CHAIN-02 (archive-path + line drift) → CHAIN-03 (cascade + atomic CHAIN_SKIP removal); atomic-commit pattern per Phase 66-02 precedent
- Phase 69 plan authoring — staging strategy for ubuntu-latest job (extend v1.6 workflow transitionally OR stage directly into Phase 70 v1.7 workflow); verify cross-OS reproducibility on representative PR
- Phase 70 plan authoring — Path-A copy v1.6 → v1.7 (milestone-audit.mjs + audit-allowlist.json + check-phase-67..70.mjs); CI workflow `audit-harness-v1.7-integrity.yml`; terminal re-audit via fresh gsd-executor + fresh git clone --no-hardlinks; v1.7-MILESTONE-AUDIT.md + v1.7-DEFERRED-CLEANUP.md authoring; traceability closure
- `audit-harness-v1.6-integrity.yml` `rotting-external-quarterly` job first-fires 2026-07-01 — Phase 67 can verify first-fire artifact if execution lands after that date

### Out-of-band carry-overs from v1.6 close

- BASELINE_10 was refreshed at Phase 66-02 (commit `3a9a671`); BASELINE_11 refresh is HARNESS-02 contract at Phase 70 close (Path-A inheritance pattern continues)
- CHAIN_SKIP {48, 51, 58, 60, 61} entries remain in `check-phase-62..66.mjs` arrays as of v1.6 close — Pillar B Phase 68 removes them atomically
- Existing v1.0-v1.5 corpus uses "Apple Business Manager" / "Managed Apple ID" / "VPP location token" / "Locations" — v1.6 docs use NEW terminology; v1.7 Phase 67 SWEEP-02 closes VPP location token (6 occurrences / 2 files); CI-3 Managed Apple ID (45 occurrences / 16 files) DEFERRED to v1.8+ pending Intune portal rebrand adoption
- Intune-side label "Apple VPP tokens" UNCHANGED in Microsoft Intune portal as of 2026-04-30 tutorial refresh — Phase 67 SWEEP-02 surgically renames to "content token" with PITFALLS:657 first-mention-per-H2 compound form ("content token (formerly VPP location token; still labeled 'Apple VPP token' in Intune portal)") on first mention
- Quarterly rotting-external cron job (`0 8 1 1,4,7,10 *`) next first-fires 2026-07-01 — Phase 67 SWEEP-01 should refresh the c13_rotting_external entries to match whatever URL state Apple publishes by that date

### Blockers/Concerns

- None blocking at roadmap creation. Concerns surfaced during requirements drafting:
  - **CRLF regex root-cause investigation depth** — `check-phase-64.mjs:65-73` documents the root causes but the actual line-number-drift fix in `regenerate-supervision-pins.mjs --self-test` requires choosing between two approaches (rebase line numbers in `v1.5-audit-allowlist.json` vs add ±1 tolerance to self-test) — plan-phase 68 may need a small spike to determine which is robust
  - **CI-Linux job staging strategy** — Phase 69 must decide whether to extend v1.6 workflow transitionally (catches v1.6 chain on Linux) or stage directly into Phase 70 v1.7 workflow (cleaner separation but later activation) — plan-phase 69 decides
  - **First-fire artifact timing** — Quarterly cron first-fires 2026-07-01; if v1.7 execution completes before that date, Phase 67 SWEEP-01 cannot use the cron's automated drift report as a signal — must rely on manual URL checks (which is the original SWEEP-01 contract anyway, so not blocking)

## Session Continuity

Last session: 2026-05-26T15:13:23.576Z
Stopped at: Phase 67 context gathered
Resume file: .planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-CONTEXT.md
Next action: `/gsd-plan-phase 67` to author Phase 67 plans (Corpus Surgical Sweeps — Pillar A)
