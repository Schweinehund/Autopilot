---
gsd_state_version: 1.0
milestone: v1.17
milestone_name: Docs-Library .docx Publish-Bundle Pipeline (SharePoint / Copilot Upload Automation)
status: executing
last_updated: "2026-07-10T21:46:57.815Z"
last_activity: 2026-07-10
progress:
  total_phases: 3
  completed_phases: 0
  total_plans: 2
  completed_plans: 1
  percent: 0
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-07-10 — v1.17 milestone scoped)

**Core value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices through Microsoft Intune / Entra ID without escalating to engineering — and find those answers as clean, correctly-cited results in the Copilot Studio / SharePoint knowledge base (grounding envelope established v1.15, extended to the remaining structural doc classes in v1.16). v1.17 delivers the publish/export capability: a single upload-ready `.docx` bundle of the entire Approved corpus, quality-gated fail-closed and auto-regenerated at milestone close.
**Current focus:** Phase 126 — publish-bundle-pipeline-guard-blocker-corpus-fixes

## Current Position

Phase: 126 (publish-bundle-pipeline-guard-blocker-corpus-fixes) — EXECUTING
Plan: 2 of 2
Status: Ready to execute
Last activity: 2026-07-10

## v1.17 Phase Dependency Summary

```
Phase 126 (Publish-Bundle Pipeline + Guard-Blocker Corpus Fixes)
  |       PUB-01, PUB-02, PUB-03, PUB-04, HYG-02, HYG-03
  |       DELIVERS:
  |         - Batch orchestrator: every RE-index Status:Approved doc (221 today)
  |             converted to .docx via convert.ps1 (pandoc 3.7.0.2 + Word ref doc +
  |             v1.16 PIPE-03 YAML-alias temp-copy fix), named from filename-map.md,
  |             flat build dir; Draft/Pending/unregistered excluded by construction
  |         - Fail-closed guard: guard-docx.mjs on EVERY .docx; non-zero exit + no zip
  |             if any doc leaks YAML / stale custom-prop / wrong heading style
  |         - HYG-02: remove stale phase_46_wave2_retrofit key from _glossary-android.md
  |             (RE-179) — closes DEFER-125-06-A; reformat-only, last_verified untouched
  |         - HYG-03: fill the 9 DEFER-121-07-A Version-History YYYY-MM-DD placeholders
  |             (2 glossaries + 7 lifecycle files) — closes DEFER-121-07-A
  |         - PUB-03: single versioned docs-library-v1.17.zip, flat, descriptive names
  |             (citation title = filename), ready for one-shot SharePoint bulk upload
  |         - PUB-04: in-zip manifest (RE-ID -> filename -> status) + registry-parity
  |             assertion (every Approved row exactly once; no missing/orphan) + count log
  |       HARD CONSTRAINTS:
  |         - FIRST phase of v1.17; builds on the EXISTING v1.15/v1.16 pipeline surface
  |             (convert.ps1, guard-docx.mjs, build-filename-map.mjs, filename-map.md)
  |         - HYG-02/HYG-03 MUST land before/with the PUB-02 fail-closed gate — else the
  |             batch fails closed on the two known pre-existing guard blockers (the two
  |             fixes are the ONLY corpus edits this milestone; all other predecessor
  |             v1.4-v1.16 frozen surfaces stay BYTE-UNCHANGED)
  |         - Build-only: NO Graph/SharePoint auth surface; owner uploads manually
  |         - Publish set = registry Status:Approved (= the SharePoint-indexed set)
  |       DISCUSS-PHASE FLAGS (resolve via /adversarial-review, NOT at roadmap):
  |         zip location + retention; manifest format + contents; batch conversion
  |         performance/resilience; HYG-03 date-fill policy; publish-set boundary confirm
  |
  v
Phase 127 (Automated Milestone-Completion Trigger)
  |       HOOK-01
  |       DELIVERS:
  |         - The publish bundle regenerates AUTOMATICALLY at milestone completion (no
  |             manual step) — closing a milestone produces/refreshes docs-library-vX.Y.zip
  |             by invoking the Phase-126 PUB pipeline
  |         - Trigger implemented under .claude/hooks/ + gitignored settings.local.json
  |             activation, mirroring the existing Jira milestone hook pattern
  |         - Graceful degradation when prerequisites (pandoc, Node) are absent; never
  |             blocks or corrupts the milestone-close flow
  |       HARD CONSTRAINTS:
  |         - BLOCKED on Phase 126 — the PUB pipeline must exist and be green before it
  |             can be auto-invoked at close
  |         - DOMINANT design gray area = the detection/invocation MECHANISM; resolved at
  |             /gsd-discuss-phase via /adversarial-review, NOT pre-decided at roadmap
  |       DISCUSS-PHASE FLAG (DOMINANT): automated-trigger detection mechanism —
  |         STATE-inspecting Stop-hook (mirrors Jira hook) vs. git post-tag/post-commit
  |         hook keyed on the vX.Y tag / MILESTONE CLOSE commit vs. folding invocation
  |         into the close-gate phase; trade-offs = visibility, gate-on-failure,
  |         Windows-local pandoc portability, not corrupting the close flow
  |
  v
Phase 128 (V116 Pin + 15th Path-A Lineage Bump + Terminal Close)
          HARN-08, HARN-09, HARN-10
          SOLE DELIVERABLE CLUSTER OF THIS PHASE — never batches with pipeline, hook,
            or content work (mirrors v1.13 Phase 100 / v1.14 Phase 112 / v1.15 Phase 119
            / v1.16 Phase 125 exactly)
          DELIVERS:

            - HARN-08: _lib/frozen-at-close.mjs V116 entry (v1.16 close-gate SHA,
              recovered via git log --all --grep dual-token positive-confirm) +
              readAtV116Close export — the MANDATORY back-anchor invariant deferred by
              v1.16 (V116-PIN-DEFERRAL); freezes the v1.16 corpus

            - HARN-09: v1.17-milestone-audit.mjs (Path-A from v1.16, C1-C17 inherited) +
              v1.17-audit-allowlist.json + BASELINE_21 + check-phase-126..NN.mjs
              validators (chain-apex CHAIN_PHASES=[48..(closephase-1)], continuing the
              [48..N-1] invariant) + audit-harness-v1.17-integrity.yml (14th parallel CI
              coexistence workflow); predecessor v1.4-v1.16 frozen surfaces BYTE-UNCHANGED
              except any predecessor content-assertion validator reading a HYG-02/03-touched
              doc at live HEAD, converted frozen-aware (readAtV116Close) as in-scope
              close-gate remediation — NO value-masking, CHAIN_SKIP empty

            - HARN-10: 3-axis terminal re-audit (fresh git clone --no-hardlinks +
              cross-OS Linux GHA authoritative for both chain validators per D-03 OS split

              + fresh zero-context sub-agent; cross-OS PASS/FAIL/SKIP EXACT MATCH) +
              single close-gate commit flipping all 10 v1.17 reqs to Validated across
              PROJECT/ROADMAP/STATE/REQUIREMENTS + v1.17-MILESTONE-AUDIT.md +
              v1.17-DEFERRED-CLEANUP.md
          HARD CONSTRAINTS:

            - BLOCKED on Phase 127 — all pipeline + auto-trigger work complete and green
              before the closing lineage bump + re-audit

            - WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 deepens to [48..(closephase-1)]; Linux GHA
              BOTH chain validators remain authoritative (D-03 OS split unchanged)
          DISCUSS-PHASE FLAG: none (closing cluster; consumes prior decisions)
```

## v1.17 Requirement Coverage (10/10 mapped — Pending)

| Phase | Requirements | Count |
|-------|-------------|-------|
| 126 | PUB-01, PUB-02, PUB-03, PUB-04, HYG-02, HYG-03 | 6 |
| 127 | HOOK-01 | 1 |
| 128 | HARN-08, HARN-09, HARN-10 | 3 |
| **Total** | **10/10 mapped (0 orphaned)** | **10** |

**Sequential-on-main-tree execution** per `.planning/config.json` `use_worktrees:false` (durable per memory `project_execphase_sequential.md`). Phase numbering continues from v1.16 (closed at Phase 125) → v1.17 starts at Phase 126.

**Named decisions (LOCKED at roadmap 2026-07-10):**

- PHASE-COUNT: 3 phases (126-128) — a tight tooling/pipeline shape (mirrors v1.12's compact 2-phase footprint at +1 for the isolated HOOK gray area). Derived from natural delivery boundaries: pipeline+guard-fix hero cluster (126) → auto-trigger (127) → harness+close (128). NOT padded — the corpus is frozen except the 2 guard-motivated HYG fixes.
- PUB-HYG-FOLD: HYG-02 + HYG-03 land WITH the PUB pipeline in Phase 126 (not their own phase) BECAUSE the PUB-02 fail-closed guard gate trips on exactly these two known pre-existing blockers — folding the fixes in is what makes the batch guard clean end-to-end. One coherent delivery boundary: "run the pipeline → get a clean zip."
- HOOK-ISOLATED: HOOK-01 is its own phase (127) — it DEPENDS on the PUB pipeline existing (126) and carries the DOMINANT automated-trigger gray area; isolating it keeps the hero pipeline cluster (126) free of the unresolved mechanism decision.
- HARNESS-PHASE: Phase 128 is the sole deliverable of the closing cluster — the harness lineage bump NEVER batches with pipeline/hook/content work (mirrors v1.13 Phase 100 / v1.14 Phase 112 / v1.15 Phase 119 / v1.16 Phase 125).
- V116-PIN-MANDATORY: Phase 128 adds the `V116` frozen-at-close pin deferred by the v1.16 close (`V116-PIN-DEFERRAL`) — the mandatory back-anchor invariant that freezes the v1.16 corpus.
- HARNESS-LINEAGE: 15th Path-A milestone (v1.4→v1.17); BASELINE_21; V116 pin; 14th CI workflow; CHAIN_PHASES=[48..(closephase-1)] (continuing the [48..N-1] invariant; exact entry count locked at close-gate per closephase).
- DISCUSS-PHASE-FLAGS: the 6 gray-area flags from REQUIREMENTS.md are NOT resolved at roadmap — deferred to `/gsd-discuss-phase` per project convention (dominant: HOOK-01 automated-trigger detection mechanism; plus zip location/retention, manifest format, batch perf/resilience, HYG-03 date policy, publish-set boundary).

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
- v1.12: 2 phases (94-95), 5 plans — shipped 2026-06-26
- v1.13: 5 phases (96-100), 14 plans — shipped 2026-06-29
- v1.14: 12 phases (101-112), 38 plans — shipped 2026-07-02
- v1.15: 7 phases (113-119), 40 plans — shipped 2026-07-06
- v1.16: 6 phases (120-125), 38 plans — shipped 2026-07-10
- v1.17: 3 phases (126-128), TBD plans — in progress

## Accumulated Context

### Decisions

**v1.17 roadmap decisions (LOCKED 2026-07-10):** see "Named decisions" above.

**Carried-forward durable architectural decisions (from v1.14–v1.16):**

- Sequential-on-main-tree per `use_worktrees:false`; atomic harness commits (Atom 1 + Atom 2); frozen-aware via `_lib/frozen-at-close.mjs`; non-current-milestone predecessor frozen surfaces BYTE-UNCHANGED
- WINDOWS-CLONE-DEEPNEST-TIMEOUT-01: Linux GHA BOTH chain validators authoritative (D-03 corrected OS split, held v1.12–v1.16); depth deepens each milestone
- Adversarial-review invoked at discuss-phase for gray-area scoping decisions (per user memory `feedback_adversarial_review_preference.md`)
- Per-section `last_verified`/`review_by` freshness stamps do NOT reset on reformat-only edits (v1.15 D2/META-04 rule — governs the HYG-03 date-fill)
- V115 pin recovery precedent: recover the close-gate SHA via the SAME dual-token positive-confirmation `git log --all --grep` method used for V114 at 119-01 / V115 at 125-01 (a naive `--grep` returns the wrong follow-up commit — DO NOT trust it)
- Pipeline surface established v1.15/v1.16: `convert.ps1` version-guards pandoc 3.7.0.2 (PATH-then-LOCALAPPDATA resolution); the PIPE-03 nav-footer YAML-alias fix is an ephemeral-temp-copy preprocess in `convert.ps1`; `guard-docx.mjs` runs YAML-LEAK on decompressed `extractBodyText()` output + a lenient CUSTOM-PROPS check (9-key EEE set); `build-filename-map.mjs` derives descriptive `.docx` names from RE-index Title (D-05 slug, D-08 fail-closed collision); `filename-map.md` is a committed 3-col markdown table (221 rows)
- Empirical PIPE-02 findings carried forward: Copilot citation title = the `.docx` filename; `Status: Draft` is a label not a retrieval gate; only `.docx` is indexed; pandoc promotes non-standard YAML keys to invisible Word custom properties (validates the EEE body-text header-block architecture)

*(Full v1.0–v1.16 execution-decision logs are archived in `.planning/milestones/vX.Y-MILESTONE-AUDIT.md` and `.planning/MILESTONES.md`.)*

- [Phase 126]: HYG-02 scope expanded to all 5 files sharing the identical stale phase_46_wave2_retrofit key (requirement text named only 1) — PUB-02 fail-closed batch gate never produces a zip until all 5 are fixed; RESEARCH Pitfall 1 confirmed the identical defect on 4 siblings
- [Phase 126]: HYG-03 executed strictly verify-only per D-08/D-09 — No corpus-wide YYYY-MM-DD gate added; scoped to the 9 named DEFER-121-07-A files only, confirmed pure no-op (already fixed in commit 9031056)

### Plan-Time Research Flags (not blockers — resolve at each phase's plan time)

- Phase 126 (PUB-01): confirm the exact current Approved count (221 today) + that every Approved RE-index row resolves to a `filename-map.md` output name before wiring the batch; confirm the convert.ps1 `-OutputDocx` param path (proven end-to-end on RE-002 at v1.16 124-02)
- Phase 126 (PUB-02): resolve batch performance/resilience (sequential vs. parallel; per-doc failure isolation vs. fail-fast) at discuss-phase — ties directly to the fail-closed contract
- Phase 126 (HYG-02): confirm `_glossary-android.md` (RE-179) still carries the `phase_46_wave2_retrofit` key at plan time; the v1.16 125-02 sidecar already had to repoint C2/C7/C9 pins for this file — coordinate so the HYG-02 edit and any predecessor validator reading it are reconciled at the Phase-128 close-gate
- Phase 126 (HYG-03): enumerate the exact 9 DEFER-121-07-A files (2 glossaries from 121-04 + 7 lifecycle files from 121-05) and decide the date-fill policy at discuss-phase (per-file original reformat commit date vs. single v1.17 date vs. `last_verified`); confirm no freshness-clock reset
- Phase 127 (HOOK-01): resolve the DOMINANT automated-trigger mechanism via `/adversarial-review` BEFORE implementation; inspect the existing Jira milestone Stop-hook under `.claude/hooks/` + gitignored `settings.local.json` as the pattern reference (per memory `project_jira_milestone_hook.md`); confirm graceful-degradation test approach (absent pandoc/Node)
- Phase 128 (HARN-08): recover the V116 SHA via the SAME dual-token positive-confirmation `git log --all --grep` method used for V114/V115 (candidate close-gate commit `3dd2512` per v1.16 STATE — must be positively confirmed, not assumed)
- Phase 128 (HARN-09): run the FULL predecessor chain BEFORE authoring the close-gate (not just the immediate apexes) per `LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01`; scope which predecessor validators read the HYG-touched docs and need frozen-aware conversion at plan time; confirm the exact CHAIN_PHASES entry count for closephase

### Pending Todos

- At Phase 126 plan time: run `/gsd-discuss-phase 126` + `/adversarial-review` on zip location/retention, manifest format, batch perf/resilience, HYG-03 date policy, and publish-set boundary before implementation
- At Phase 127 plan time: run `/adversarial-review` (Finder/Adversary/Referee) on the automated-trigger detection mechanism (DOMINANT gray area) before implementing the hook
- At Phase 128 plan time: confirm V116 SHA via positive-confirmation grep; run the FULL predecessor chain before authoring the close-gate; scope frozen-aware conversion for any predecessor validator reading the HYG-02/03-touched docs

### Blockers/Concerns

At roadmap stage. Execution-time watch items (not blockers — address within specified phases):

- Phase 126: HYG-02/HYG-03 MUST precede or accompany the PUB-02 fail-closed gate — if the guard runs before the two known blockers are fixed, the batch fails closed on pre-existing debt and no zip is produced
- Phase 126: registry-parity assertion (PUB-04) is the guard against a silent partial bundle — every Approved row exactly once, no missing/orphan; log the count
- Phase 127: the auto-trigger MUST degrade gracefully and MUST NOT block/corrupt the milestone-close flow — Windows-local pandoc portability is a real hazard; this is why the mechanism is a discuss-phase gray area, not a roadmap decision
- Phase 128: the HYG-02/03 content edits are the ONLY non-frozen corpus changes this milestone — any predecessor content-assertion validator reading those docs at live HEAD must be converted frozen-aware (`readAtV116Close`) as in-scope close-gate remediation (NO value-masking, CHAIN_SKIP empty); scope this at plan time, not late at close (the v1.15 119-05 / v1.16 125-05 two-round remediations are the cautionary precedent)
- Phase 128: WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 deepens again; Linux GHA BOTH chain validators remain authoritative (D-03 OS split unchanged)

## Session Continuity

Last session: 2026-07-10T21:46:57.800Z
Stopped at: Completed 126-01-PLAN.md
Resume file: None
Next action: Run `/gsd-plan-phase 126` to plan the Publish-Bundle Pipeline + Guard-Blocker Corpus Fixes phase. Run `/gsd-discuss-phase 126` first if resolving the Phase-126 gray areas (zip location, manifest format, batch resilience, HYG-03 date policy, publish-set boundary) before planning.

## Operator Next Steps

- Plan Phase 126 with `/gsd-plan-phase 126`
- (Optional) resolve Phase-126 gray areas first via `/gsd-discuss-phase 126` + `/adversarial-review`

## Performance Metrics

| Phase | Plan | Duration | Notes |
|-------|------|----------|-------|
| (v1.17 phases not yet started) | — | — | — |
| Phase 126 P01 | 4min | 3 tasks | 6 files |
