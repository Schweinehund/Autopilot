---
gsd_state_version: 1.0
milestone: v1.6
milestone_name: Apple Business Delegated Governance & Multi-Org Operations
status: verifying
stopped_at: Phase 63 context gathered
last_updated: "2026-05-21T20:59:15.103Z"
last_activity: 2026-05-21
progress:
  total_phases: 5
  completed_phases: 2
  total_plans: 14
  completed_plans: 14
  percent: 40
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-20)

**Core value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices through Intune without escalating to engineering — and now, internal organizations can manage their own Apple device pools (VPP catalogs, shared iPad passcode resets, device releases, MDM server assignments, account provisioning, device transfers, audit access, shared iPad / Apple TV lifecycle) without escalating to a central tenant admin
**Current focus:** Phase 63 — Multi-OU Architecture & Apple Admin Setup

## Current Position

Phase: 63 (Multi-OU Architecture & Apple Admin Setup) — EXECUTING
Plan: 6 of 6
Status: Phase complete — ready for verification
Last activity: 2026-05-21

```
Progress: [██████████] 100%
Phases:   62 63 64 65 66
Status:   .  .  .  .  .
          (. = not started, X = complete)
```

**Phase numbering:** v1.6 spans Phases 62–66 (continues from v1.5 close at Phase 61; no `--reset-phase-numbers`)

## v1.6 Phase Dependency Summary

```
Phase 62 (Foundation + harness scaffold — critical-path bottleneck, 11 pitfalls gate here)
  → Phase 63 (Multi-OU Architecture & Admin Setup)
    │       (Phase 63 anchors `05-...md#which-admin-owns-this-pool`,
    │        `09-shared-ipad-lifecycle.md`, `10-apple-tv-lifecycle.md` unlock Wave B)
    ├─ Wave B concurrent ─→ Phase 64 (Delegation Runbooks)
    │                       (file-disjoint after Phase 63 anchors land)
    ↓
   Phase 65 (L1/L2 + Hub Navigation Integration — NAVIGATION-LAST)
    ↓
   Phase 66 (Validation Tooling Closure + Terminal Re-Audit from FRESH WORKTREE)
```

## Performance Metrics

**Velocity across milestones:**

- v1.0: 10 phases, 24 plans — shipped 2026-04-10
- v1.1: 9 phases, 18 plans — shipped 2026-04-13
- v1.2: 6 phases, 20 plans — shipped 2026-04-15
- v1.3: 8 phases, 44 plans — shipped 2026-04-19
- v1.4: 9 phases, 40 plans — shipped 2026-04-24
- v1.4.1: 5 phases, 33 plans — shipped 2026-04-25
- v1.5: 14 phases, 101 plans — shipped 2026-05-07
- **v1.6: 5 phases (62-66), TBD plans — started 2026-05-20**

**Totals (through v1.5):** 61 phases, 280 plans, ~230 documentation files across Windows APv1/APv2, macOS ADE, iOS/iPadOS, Android Enterprise, and Linux (Ubuntu LTS).

**v1.6 scope:** ~18 new documentation files (1 glossary + 11 cross-platform/apple-business/ governance files + 2 L1/L2 runbooks + harness + per-phase validators + CI workflow + milestone audit doc + deferred-cleanup tracking artifact) + 5 modified hub files + 3 canonical rebrand-callout edits.

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table. All v1.0–v1.5 decisions validated with outcomes.

**v1.6 architectural decisions (research-attributed; see research/ARCHITECTURE.md):**

- **D-A1** Directory placement → NEW `docs/cross-platform/apple-business/` tree (hybrid Option d) — modeled on v1.5 `docs/operations/`; NOT a 6th platform
- **D-A2** Glossary architecture → Split (Option c) — NEW `_glossary-apple-business.md` + reciprocal banner lines to 4 existing glossaries¹

  ¹ `_glossary-macos.md` covers macOS + iOS/iPadOS per its line-9 header — single Apple glossary, not separate macOS/iOS files. Count corrected from "5" to "4" during Phase 62 execution per D-05.

- **D-A3** Capability matrix changes → 3 incremental rows in `ios-capability-matrix.md` only; `macos-capability-matrix.md` UNCHANGED; `4-platform-capability-comparison.md` UNCHANGED (preserves C12 240-cell math + D-13/D-18 sibling-anchor-pin contract)
- **D-A4** Hub navigation → Apple Business as 5th sub-section under existing `## Operations` H2
- **D-A5** L1/L2 numbering + frontmatter → L1 #34 first v1.6 runbook; L2 #26 first v1.6 runbook; NEW compound-platform frontmatter `platform: ios+macos[+shared-ipad|+apple-tv]` with `+` separator parsing required in harness
- **D-A6** Quick-ref placement → Append new `## Apple Business Quick Reference` H2 to both `quick-ref-l1.md` and `quick-ref-l2.md`
- **D-A7** Apple TV + Shared iPad → first-class admin workflows inside `cross-platform/apple-business/` tree
- **D-A8** Cross-link contract → v1.6 NEW docs link OUT to existing docs freely (read-only); existing docs receive ZERO modifications EXCEPT 3 sanctioned canonical sites + 5 append-only hub edits
- **D-A9** Audit harness C14/C15/C16 → Path-A copy v1.5→v1.6; C14 rebrand-statement at 3 canonical sites (BLOCKING); C15 Intune-delegation anti-pattern guard (BLOCKING); C16 L1 #34 cross-link integrity triangle (BLOCKING); all blocking-from-start
- **D-A10** Phase build order → OUs before custom roles; custom roles before delegation runbooks; glossary before admin guides; admin guides before L1/L2; capability matrix rows before hub nav; navigation files LAST (v1.5 Phase 57+59 precedent); audit harness scaffolds at Phase 62 with C14-C16 functional from Phase 1

**Patterns carried forward into v1.6:**

- Tiered doc structure (L1 / L2 / Admin) — applies to Apple Business L1 #34 + L2 #26 + admin-context `12-shared-ipad-passcode-reset.md`
- Per-platform glossary file (`_glossary-{platform}.md`) — `_glossary-apple-business.md` is the 6th glossary node (split architecture per D-A2)
- Audit harness file-versioning lineage — `v1.5-milestone-audit.mjs` → `v1.6-milestone-audit.mjs` (Path A copy + additive C14/C15/C16; preserves predecessor reproducibility)
- Sidecar `scripts/validation/v1.6-audit-allowlist.json` co-located with harness
- 60-day `last_verified` rule applies to all Apple Business docs (45-day for `4-platform-capability-comparison.md` doc per v1.5 Phase 58 D-19; that file remains UNCHANGED in v1.6 per D-A3)
- Validator-as-deliverable — per-phase `check-phase-62.mjs..check-phase-66.mjs` ship alongside content
- Verification-during-execution — every phase produces VERIFICATION.md BEFORE downstream phases consume it (v1.2 retro lesson)
- Traceability updates in commit workflow, not deferred to milestone audit (v1.2 retro lesson)
- TBD scanning post-execution checklist (v1.2 retro lesson)
- Append-only H2-block contract on shared files when phases parallelize (v1.4 Phase 42 D-03)
- PITFALL-6 anchor-stability surface — pre-edit anchor inventory artifact mandatory before any edit to existing capability matrices or hub files
- PITFALL-7 whitelist-first pattern — Phase 62 custom-role authoring guide applies whitelist-first to "Manage MDM Servers" privilege (DENY-by-default per OP-1)
- Navigation-files-last — Phase 65 executes after Phases 62-64 content phases (mirrors v1.5 Phase 57+59 precedent)
- Wave-based parallel execution — Wave A (Phase 62 sequential, critical-path bottleneck); Wave B (Phase 63 + first half of Phase 64 file-disjoint after Phase 63 anchors land); Wave C (Phases 65 + 66 sequential close-gate)
- Atomic-harness-commit pattern — Phase 62 audit harness landing inherits v1.5 Plan 60-08 atomic-commit contract (C14/C15/C16 + sidecar + new `c13_rotting_external` category + BASELINE_10 refresh + `+` separator parsing all land in ONE commit)
- Auditor-independence via fresh worktree — Phase 66 terminal re-audit spawned distinct from content-phase author-agents (v1.5 D-22 / Phase 61 Plan 61-04 precedent)
- Informational-then-blocking promotion ladder OPT-OUT for v1.6 — C14/C15/C16 are blocking from Phase 1 (per D-A9); no informational grace period (different from v1.5 C11/C12/C13 pattern)

**Anti-regression invariants inherited from v1.0-v1.5 (must be preserved by every v1.6 phase):**

- C12 240-cell math (6 H2 × 5 platform cols × 48 rows) preserved — no 7th H2 added to `4-platform-capability-comparison.md` (OU-10 requirement)
- D-13/D-18 sibling-anchor-pin contract preserved across 4 sibling matrices — `macos-capability-matrix.md` + `4-platform-capability-comparison.md` remain byte-unchanged in v1.6
- PITFALL-6 pre-edit anchor inventory mandatory before any edit to existing capability matrices, glossaries, or hub files (OU-09 / DA-4)
- Append-only contract on existing hub files (`docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/operations/00-index.md`) — pre-existing H2 anchors byte-identical pre/post (v1.5 Phase 57 V-57-25 NEGATIVE regression-guard precedent)
- Q5(b) no-corpus-sweep — exactly 3 canonical rebrand-callout sites (AB-05); existing ~30 ABM references in v1.0-v1.5 corpus remain unchanged
- Single MDM Reassign runbook with OS-version sub-H2s (DELEG-05) — not 2 runbooks (CI-5 anti-proliferation)
- L1 runbook count capped at 1 in v1.6 (#34); L2 capped at 1 (#26); navigation files modified LAST in Phase 65
- BASELINE_9 v1.5 carry-over MUST be closed by AUDIT-14 (BASELINE_10 refresh at Phase 66)
- Auditor-independence at terminal re-audit (fresh worktree spawn per v1.5 D-22)

### Pending Todos

- Plan Phase 62 via `/gsd-plan-phase 62` (Apple Business Foundation & Rebrand — critical-path bottleneck; 11 pitfalls gate here)
- Phase 62 phase-research likely needed for: per-permission enumeration (Apple's 11 subgroup permission sub-pages manual scrape ~1 hour effort) + Apple Business audit log retention SLA + cross-OU audit visibility 3×3 matrix + Apple TV Conference Room Display mode delegation specifics + Apple Business Device API public surface (mark UNKNOWN if Apple hasn't published developer.apple.com landing by Phase 62 execution time)
- After Phase 62 closes: Wave B execution — Phase 63 + first half of Phase 64 in parallel (after Phase 63 anchors `05-...md#which-admin-owns-this-pool` + `09-shared-ipad-lifecycle.md` + `10-apple-tv-lifecycle.md` land)
- After Phases 62-64 close: Phase 65 (NAVIGATION-LAST sequential)
- After Phase 65 closes: Phase 66 (terminal re-audit from FRESH WORKTREE — auditor-independence per v1.5 D-22)

### Out-of-band carry-overs from v1.5 close

- BASELINE_9 was refreshed at Phase 60 close (commit `c2abdd4`); BASELINE_10 refresh is AUDIT-14 contract at Phase 66 close (Path-A inheritance pattern)
- Existing ~30 ABM references in v1.0-v1.5 corpus remain unchanged per Q5(b) no-corpus-sweep contract — tracked as CI-1/CI-2/CI-3 rotting-reference candidates for v1.7+ via new `c13_rotting_external` sidecar category landing at Phase 62 in atomic harness commit
- Existing v1.0-v1.5 corpus uses "Apple Business Manager" / "Managed Apple ID" / "VPP location token" / "Locations" — v1.6 docs use NEW terminology (Apple Business / Managed Apple Account / content token / Organizational Units); bidirectional reciprocity in Phase 62 glossary mitigates author confusion
- Intune-side label "Apple VPP tokens" UNCHANGED in Microsoft Intune portal as of 2026-04-30 tutorial refresh — v1.6 docs preserve Intune's verbatim labels when citing Intune-side handshake paths

### Blockers/Concerns

- None blocking at roadmap creation. Concerns identified in research:
  - Per-permission table enumeration — Apple's 11 subgroup permission sub-pages JS-rendered, not WebFetch-extractable; manual scrape required at Phase 62 (~1 hour effort)
  - Audit log retention SLA — Apple does not publish; Phase 62 must validate against live tenant OR document "Apple does not publish — configure periodic SIEM export for compliance >1 year" hedge in `17-audit-log-scoping-runbook.md`
  - Cross-OU audit visibility 3×3 matrix not single-source documented — Phase 62 phase-research deliverable
  - Apple Business Device API public surface — Apple has not yet published developer.apple.com landing; acknowledge-but-do-not-document-deeply in `01-role-permission-model.md`

## Session Continuity

Last session: 2026-05-21T20:59:15.081Z
Stopped at: Phase 63 context gathered
Resume file: None
Next action: `/gsd-plan-phase 62` — Apple Business Foundation & Rebrand
