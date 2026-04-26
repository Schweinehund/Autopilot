---
gsd_state_version: 1.0
milestone: v1.5
milestone_name: Linux Platform, Operational Depth & Cross-Platform Cleanup
status: defining_requirements
stopped_at: v1.5 milestone started 2026-04-26 — gathering requirements
last_updated: "2026-04-26T00:00:00.000Z"
last_activity: 2026-04-26
progress:
  total_phases: 0
  completed_phases: 0
  total_plans: 0
  completed_plans: 0
  percent: 0
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-26)

**Core value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices through Intune without escalating to engineering — and operate them at depth (co-management, patching, app lifecycle, drift/migration) once enrolled
**Current focus:** v1.5 milestone — three-pillar (cleanup + Linux + ops depth) — defining requirements

## Current Position

Phase: Not started (defining requirements)
Plan: —
Status: Defining requirements
Last activity: 2026-04-26 — Milestone v1.5 started

**Phase numbering:** continues from Phase 47 → v1.5 spans Phases 48+ (estimated 12-15 phases, ~65-80 plans)

## Performance Metrics

**Velocity across milestones:**

- v1.0: 10 phases, 24 plans — shipped 2026-04-10
- v1.1: 9 phases, 18 plans — shipped 2026-04-13
- v1.2: 6 phases, 20 plans — shipped 2026-04-15
- v1.3: 8 phases, 44 plans — shipped 2026-04-19
- v1.4: 9 phases, 40 plans — shipped 2026-04-24
- v1.4.1: 5 phases, 33 plans — shipped 2026-04-25

**Totals (through v1.4.1):** 47 phases, 179 plans, 179 documentation files across Windows APv1/APv2, macOS ADE, iOS/iPadOS, and Android Enterprise (Knox + 5-OEM AOSP + COPE complete).

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table. All v1.0–v1.4.1 decisions validated with outcomes.

**Patterns carried forward into v1.5:**

- Tiered doc structure (L1 / L2 / Admin) is canonical — applies to Linux too
- Per-platform glossary file (`_glossary-{platform}.md`) — `_glossary-linux.md` to be added in v1.5
- Capability matrix per platform — `linux-capability-matrix.md` to be added; existing per-platform matrices update for ops-depth content
- Audit harness file-versioning lineage — `v1.4-milestone-audit.mjs` → `v1.4.1-milestone-audit.mjs` → `v1.5-milestone-audit.mjs` (Path A copy + additive extensions; preserves predecessor reproducibility)
- Sidecar `scripts/validation/v1.X-audit-allowlist.json` co-location with harness
- 60-day `last_verified` rule (Phase 34 D-14)
- Validator-as-deliverable: per-phase `check-phase-NN.mjs` ships alongside content
- Verification-during-execution: every phase produces `VERIFICATION.md` BEFORE downstream phases consume it (v1.2 retro lesson)
- Traceability updates in commit workflow, not deferred to milestone audit (v1.2 retro lesson)
- TBD scanning post-execution checklist (v1.2 retro lesson)
- Append-only H2-block contract on shared files (capability matrix, Mermaid, glossary index) when phases parallelize (v1.4 Phase 42 D-03 precedent)
- Cross-Platform Equivalences pattern in capability matrices (v1.4 introduced for Android; extends naturally to 4-platform comparison doc and Linux capability matrix)

### Pending Todos

- Run optional research (4 parallel gsd-project-researcher agents on Stack / Features / Architecture / Pitfalls) for v1.5 — Linux Intune client, ops-depth domains, broken-link sweep tooling
- Define REQUIREMENTS.md with REQ-IDs across pillar categories (CLEAN-, LIN-, COMG-, PATCH-, APP-, DRIFT-, AUDIT-)
- Spawn gsd-roadmapper to derive phases (estimated 12-15 phases starting at 48)

### Out-of-band carry-overs from v1.4.1 close

- `regenerate-supervision-pins.mjs --self-test` had pre-existing FAIL flagged at v1.4.1 close (stale BASELINE_9 vs Phase 44+ file coordinates); v1.4.1-milestone-audit.mjs C2 PASS was authoritative. v1.5 audit-tooling phase should refresh self-test baselines.
- iOS/macOS/Windows admin templates `last_verified` were intentionally NOT normalized in v1.4.1 (Android-scope lock per Phase 43-v1-4-cleanup-audit-harness-fix Plan 43-05 D-25); v1.5 cross-platform broken-link sweep / freshness audit should sweep these into 60-day cycle.

### Blockers/Concerns

- **Linux Intune client surface area unknowns** — Microsoft Intune Linux client supports a narrower feature set than Windows / macOS / iOS / Android (no native CA, web-app-CA only; script-based app delivery; no MSI/MSIX/.pkg analog). Research / discuss-phase must clarify exact GA capabilities for Ubuntu 20.04 / 22.04 / 24.04 LTS.
- **Ops-depth × 4-platform matrix risk** — 4 ops domains × 4 platforms = 16 cells. Per-domain phase split needed; co-management is Windows-led (macOS/iOS/Android contextual notes only); patch management is genuinely 4-way. Roadmapper to derive phase shape.
- **DEFER-08 4-platform comparison structural risk** — capability comparison must be a structural reference doc, not an opinion piece. Single source of truth means existing per-platform capability matrices need cross-link reciprocity, not duplication.
- **Audit harness extension drift** — `v1.5-milestone-audit.mjs` adds Linux platform coverage + 4 new ops-domain checks. Token list grows substantially; informational-first grace period pattern (v1.4.1 D-29 lineage) recommended for new checks.

## Session Continuity

Last session: 2026-04-26 (v1.5 milestone start)
Stopped at: PROJECT.md + STATE.md updated; about to run research decision + define requirements + spawn roadmapper
Next action: continue `/gsd-new-milestone` workflow → research decision (Step 8) → REQUIREMENTS.md (Step 9) → ROADMAP.md (Step 10)
