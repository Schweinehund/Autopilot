---
gsd_state_version: 1.0
milestone: v1.20
milestone_name: Frozen-Aware CI Remediation & Chain-Validator Debt Closure
current_phase: 140
current_phase_name: Frozen-Aware Harness Conversion
status: executing
stopped_at: Phase 140 context gathered
last_updated: "2026-08-06T21:13:28.870Z"
last_activity: 2026-08-05
last_activity_desc: Phase 139 complete, transitioned to Phase 140
progress:
  total_phases: 2
  completed_phases: 1
  total_plans: 11
  completed_plans: 6
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-08-04 — v1.20 scoped via `/grill-me` + `/adversarial-review`)

**Core value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices through Microsoft Intune / Entra ID without escalating to engineering — and find those answers as clean, correctly-cited results in the Copilot Studio / SharePoint knowledge base. v1.20 protects that corpus by repairing the validator chain and CI harness lineage that guards it.
**Current focus:** Phase 139 — governance-carve-fetch-depth-retrofit-shallow-job-repair

> **v1.20 BACK-ANCHOR RECOVERY (Phase 144 / HARN-17).** The V119 pin needs the v1.19 close-gate SHA `a7bda73e23efc5e3f9607c3fef37abf8ec4030aa`. Recover it with the subject-line pair discriminator (count=1) — **not** the dual-token `--grep --all-match` form, which returns multiple candidates because it matches on the body:
> ```
> git log --all --format="%H|%s" | awk -F'|' '$2 ~ /v1\.19/ && $2 ~ /MILESTONE CLOSE/'
> ```
> This is the same method that resolved V118 and V117; regression-check it against both before trusting the V119 result.

## Current Position

Phase: 140 — Frozen-Aware Harness Conversion
Plan: Not started
Status: Ready to execute
Last activity: 2026-08-05 — Phase 139 complete, transitioned to Phase 140

Progress: [██████████] 100%

## v1.20 Phase Dependency Summary

```
Phase 139 (Governance CARVE + fetch-depth Retrofit + Shallow-Job Repair)
  |       GOV-01, GOV-02, SWEEP-01, SWEEP-02, SWEEP-03, SWEEP-04
  |       DELIVERS:
  |         - One named milestone-scoped CARVE: file allowlist (frozen
  |             harnesses + workflows + the 9 Pillar-C files) + byte-
  |             unchanged gate on everything off-list + grep-before-edit +
  |             regression-gate discipline (GOV-01/02)
  |         - fetch-depth: 0 on all checkouts in the 3 depth-1 workflows
  |             (base 4 / v1.5 18 / v1.6 10), proven by a dispatched run
  |             where a frozen git show succeeds where it previously threw
  |             fatal: invalid object name (SWEEP-01)
  |         - The 11 already-frozen-aware validators sitting in previously-
  |             shallow jobs proven to read successfully in CI (SWEEP-02)
  |         - check-phase-49.mjs:264/:297 + check-phase-51.mjs:31 fail loud
  |             instead of silently returning null/"" (SWEEP-03)
  |         - _lib/frozen-at-close.mjs gains lsTreeAtClose() enumeration API
  |             (SWEEP-04)
  |       HARD CONSTRAINTS:
  |         - FIRST phase of v1.20; GOV-01's allowlist + byte-unchanged gate
  |             govern every edit in Phases 139-143, not just this phase's
  |         - Zero-margin hazard: both glossaries sit at exactly 90 days
  |             against a >90 test — never edit either glossary's metadata
  |             anywhere in this milestone
  |         - Without this phase, SWEEP-05 converts 9 clean two-assertion
  |             failures into hard crashes
  |       DISCUSS-PHASE FLAGS: exact lsTreeAtClose() API shape (return type,
  |         error semantics, per-milestone-reader vs. SHA-parameter form)
  |
  v
Phase 140 (Frozen-Aware Harness Conversion)
  |       SWEEP-05, SWEEP-06, SWEEP-07, SWEEP-08
  |       DELIVERS:
  |         - Every vX.Y-milestone-audit.mjs (v1.4-v1.19) reads its own
  |             corpus at its own close SHA instead of live HEAD, resolving
  |             the frozen-vs-evolved C5/C10 60d-vs-90d mismatch (SWEEP-05)
  |         - check-phase-60.mjs's subprocess re-run measured inside its
  |             60s timeout across all 282 in-scope .md files (SWEEP-06)
  |         - v1.4 TEMPLATE-SENTINEL assertion gets a named remedy distinct
  |             from frozen-awareness (readAtV14Close returns byte-identical
  |             content; the assertion was never green at v1.4's own close)
  |             (SWEEP-07)
  |         - V14 pin: explicit SHA choice + recorded rationale (SWEEP-08)
  |       HARD CONSTRAINTS:
  |         - Corpus edits authorized but expected near-zero — requires
  |             proof the document is wrong, not merely that a frozen
  |             assertion disagrees with it
  |         - check-phase-30/31 are v1.3-era; the V14 pin here does NOT
  |             serve them (see Phase 142)
  |       DISCUSS-PHASE FLAGS: SWEEP-07's TEMPLATE-SENTINEL remedy (design
  |         fork); V14 SHA choice (b5cf529 vs 671f72a — 34s apart, NOT
  |         equivalent, latter predates the ROADMAP/REQUIREMENTS archive
  |         commit)
  |
  v
Phase 141 (Standalone-RED Validator Set — Chain Members Green)
  |       RED-01, RED-02, RED-03
  |       DELIVERS:
  |         - v1.5-v1.13 C5/C10 freshness assertions pass with zero glossary
  |             edits, via the Phase-140 frozen-aware conversion (RED-01 —
  |             the TRUE prerequisite for 60/61/62-66, not the self-test)
  |         - regenerate-supervision-pins.mjs --self-test exits 0 via a
  |             corrected classifier context window (backward-only scan
  |             misses the iOS token 2 lines after the heading); v1.7
  |             fixture byte-unchanged, classifier NOT relaxed (RED-02)
  |         - check-phase-48/60/61/62/63/64/65/66 all exit 0 standalone,
  |             cascade classes cleared as a consequence (RED-03)
  |       HARD CONSTRAINTS:
  |         - check-phase-61.mjs alone carries 3 of 4 root-cause classes —
  |             RED-01+RED-02 alone will NOT clear 62-66's CHAIN-* legs;
  |             those clear only once 48/60/61 are each independently green
  |         - Class (d) (30/31 pre-chain content drift) is NOT addressed
  |             here — see Phase 142
  |       DISCUSS-PHASE FLAGS: none dominant (RED-02 method already ruled —
  |         classifier investigation, not allowlist edit or relaxation)
  |
  v
Phase 142 (Archival-Path Fix, Chain Adoption & Cold-Clone Threshold)
  |       RED-04, RED-05, RED-06, RED-07, NEST-01
  |       DELIVERS:
  |         - check-phase-30.mjs exits 0 standalone (Mermaid-conversion
  |             assertion + l1-template.md literal mismatch) (RED-04)
  |         - check-phase-31.mjs exits 0 standalone incl. V-31-23 via
  |             resolveArchivedPhasePath(..., ['v1.3-phases']) (RED-05)
  |         - check-phase-30/31 adopted into the apex CHAIN_PHASES array,
  |             ~+0.35s cost on a ~17s apex under CHECK_PHASE_NESTED
  |             (RED-06)
  |         - check-phase-68.mjs's V-68-04/V-68-08 regression guard still
  |             passes after the check-phase-31 edit (RED-07)
  |         - Cold-clone apex cost measured on Windows with a stated method
  |             + threshold + "if over threshold then mechanism X" rule,
  |             distinct from the healthy within-apex curve (NEST-01)
  |       HARD CONSTRAINTS:
  |         - check-phase-68.mjs:97-115 (V-68-04) and :166-176 (V-68-08) are
  |             in every apex chain — grep both before editing
  |             check-phase-31.mjs
  |       DISCUSS-PHASE FLAGS: whether RED-04/05 need a separate v1.3 pin
  |         (V14 from Phase 140 does not serve v1.3-era validators); the
  |         NEST-01 threshold value
  |
  v
Phase 143 (Link Coverage & Fence-Mask Unification)
  |       LINK-01, LINK-02, LINK-03, LINK-04, LINK-05, LINK-06
  |       DELIVERS:
  |         - computeAnchorSetFromContent recognises HTML <a id> anchors;
  |             failures drop from measured 271 to measured 70 (LINK-01)
  |         - Corpus-wide relative-link + anchor checker across docs/
  |             (excl. docs/_templates/, masking inline code spans), exits
  |             0 with NO accepted-violation baseline (LINK-02, LINK-04)
  |         - All 13 genuine broken links fixed (11 in
  |             docs/_glossary-macos.md, 2 in docs/admin-setup-ios/)
  |             (LINK-03)
  |         - Fence-mask unified across all 15 call sites in 9 files incl.
  |             both c17 sites (:158 open, :166 close), ^ {0,3} rule covers
  |             the measured 74 indented fences (LINK-05)
  |         - c17 identical file/violation counts before and after, sampled
  |             proof no suppressed violation hides (LINK-06)
  |       HARD CONSTRAINTS:
  |         - LINK-01 MUST precede LINK-02/04 — running the checker first
  |             would freeze 201 of 271 anchor failures as a false,
  |             permanently-accepted baseline
  |         - LINK-06 same phase as LINK-05 (before/after regression gate)
  |         - convert.ps1's fence mask is hygiene only (governs an ephemeral
  |             temp-copy nav-footer rewrite, not .docx code rendering)
  |       DISCUSS-PHASE FLAGS: none dominant (ordering + no-baseline rule
  |         already settled by requirement text)
  |
  v
Phase 144 (V119 Pin + 18th Path-A Lineage Bump + Terminal Close)
          HARN-17, HARN-18, HARN-19
          SOLE DELIVERABLE CLUSTER OF THIS PHASE — never batches with other
            work (mirrors Phase 100/112/119/125/128/134/138 exactly)
          DELIVERS:

            - HARN-17: _lib/frozen-at-close.mjs V119 entry (a7bda73e...,
              subject-line pair discriminator, count=1) + readAtV119Close
              export

            - HARN-18: v1.20-milestone-audit.mjs (Path-A from v1.19, C1-C17
              inherited) + v1.20-audit-allowlist.json + BASELINE_24 +
              check-phase-139..NN.mjs (apex CHAIN_PHASES generated by
              arithmetic, never transcribed, accounting for RED-06's
              addition of check-phase-30/31) + 17th CI coexistence
              workflow born with fetch-depth: 0

            - HARN-19: 3-axis terminal re-audit (fresh clone + cross-OS
              Linux GHA + fresh zero-context reproduction, EXACT MATCH) +
              all 17 audit-harness-* workflows dispatched (gh workflow run
              --ref master) and confirmed green from job-level JSON + publish
              bundle regenerated --version=v1.20 + SINGLE close-gate commit
              flipping all 27 v1.20 requirements to Validated +
              ACCEPTED-STANDALONE-CI-RED and ACCEPTED-SCOPED-RED DELETED
              from the backlog (not carried a 7th milestone)
          HARD CONSTRAINTS:

            - BLOCKED on Phases 139-143 ALL complete and green

            - Workflows fire on pull_request + schedule + workflow_dispatch
              only — a push fires nothing; evidence must be job-level JSON,
              not the checks-UI colour (a green run is compatible with a
              cron-skipped job or a continue-on-error advisory job)
          DISCUSS-PHASE FLAG: none (closing cluster; consumes prior
            decisions)
```

## v1.20 Requirement Coverage (27/27 mapped — roadmap created 2026-08-04)

| Phase | Requirements | Count |
|-------|-------------|-------|
| 139 | GOV-01, GOV-02, SWEEP-01, SWEEP-02, SWEEP-03, SWEEP-04 | 6 |
| 140 | SWEEP-05, SWEEP-06, SWEEP-07, SWEEP-08 | 4 |
| 141 | RED-01, RED-02, RED-03 | 3 |
| 142 | RED-04, RED-05, RED-06, RED-07, NEST-01 | 5 |
| 143 | LINK-01, LINK-02, LINK-03, LINK-04, LINK-05, LINK-06 | 6 |
| 144 | HARN-17, HARN-18, HARN-19 | 3 |
| **Total** | **27/27 mapped (0 orphaned)** | **27** |

**Sequential-on-main-tree execution** per `.planning/config.json` `use_worktrees:false` (durable per memory `project_execphase_sequential.md`). Phase numbering continues from v1.19 (closed at Phase 138) → v1.20 starts at Phase 139.

**Named decisions (LOCKED at roadmap 2026-08-04):**

- PHASE-COUNT: 6 phases (139-144), sized against v1.16's shape (6 phases/38 plans) per the roadmapping brief's explicit sizing note — NOT compressed to v1.19's 4-phase shape, NOT inflated beyond what the 27 requirements + hard sequencing constraints justify.
- PILLAR-A-SPLIT: Pillar A (SWEEP-01..08, the CARVE-1 discharge) split across Phase 139 (fetch-depth retrofit + shallow-job repair + enumeration API — the prerequisite half) and Phase 140 (the actual frozen-aware harness conversion + sentinel remedy + V14 pin — the conversion half), matching the hard sequencing constraint that SWEEP-01/04 must precede SWEEP-05.
- GOV-FIRST: GOV-01/02 land in Phase 139 (the first phase) per the explicit hard constraint that cross-cutting governance must authorize and guard every subsequent frozen-surface edit in the milestone.
- RED-SPLIT: RED-01..07 (Pillar B) split across Phase 141 (the 8 already-in-chain members: 48/60/61/62-66) and Phase 142 (the 2 orphaned members 30/31 + their formal chain-adoption action + the check-phase-68 regression guard), reflecting that 30/31 sit structurally outside CHAIN_PHASES today and need an explicit "adopt" action distinct from "fix a chain member already inside the chain."
- NEST-FOLD: NEST-01 (cold-clone cost) folded into Phase 142 rather than given its own phase (single-requirement-phase anti-pattern) — it is tightly coupled to the same chain-apex machinery Phase 142 already touches (RED-06's chain-adoption changes the apex's member count).
- LINK-AS-ONE-PILLAR: LINK-01..06 (Pillar C) kept as one phase (143) rather than split, matching PROJECT.md's own single-pillar framing and avoiding a thin fence-mask-only phase (2 requirements).
- HARNESS-PHASE: Phase 144 is the sole deliverable of the closing cluster — the harness lineage bump NEVER batches with other work (mirrors v1.13 Phase 100 / v1.14 Phase 112 / v1.15 Phase 119 / v1.16 Phase 125 / v1.17 Phase 128 / v1.18 Phase 134 / v1.19 Phase 138).
- DISCUSS-PHASE-FLAGS: the 5 named design forks from the roadmapping brief are NOT resolved at roadmap — deferred to `/gsd-discuss-phase` + `/adversarial-review` per project convention: `lsTreeAtClose()` API shape (Phase 139); SWEEP-07 TEMPLATE-SENTINEL remedy + V14 SHA choice (Phase 140); v1.3 pin need for RED-04/05 + NEST-01 threshold value (Phase 142).

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
- v1.17: 3 phases (126-128), 11 plans — shipped 2026-07-11
- v1.18: 6 phases (129-134), 17 plans — shipped 2026-07-20
- v1.19: 4 phases (135-138), 12 plans — shipped 2026-08-04
- v1.20: 6 phases (139-144) — roadmap created 2026-08-04, not yet planned

**Per-Plan Metrics (v1.19, most recent shipped milestone):**

| Plan | Duration | Tasks | Files |
|------|----------|-------|-------|
| Phase 135 P01 | 12min | 3 tasks | 6 files |
| Phase 135 P02 | 38min | 4 tasks | 1 files |
| Phase 136 P01 | 45min | 3 tasks | 2 files |
| Phase 136 P02 | 55min | 4 tasks | 1 files |
| Phase 137 P01 | 4min | 4 tasks | 9 files |
| Phase 137 P02 | 4min | 3 tasks | 2 files |
| Phase 138 P01 | 3min | 2 tasks | 1 files |
| Phase 138 P02 | 4min | 2 tasks | 3 files |
| Phase 138 P03 | 20min | 3 tasks | 5 files |
| Phase 138 P04 | 25min | 3 tasks | 0 files |
| Phase 138 P05 | 20min | 2 tasks | 1 files |
| Phase 138 P06 | 35min | 3 tasks | 7 files |
| Phase 139 P01 | 16min | 3 tasks | 8 files |
| Phase 139 P02 | 8min | 3 tasks | 2 files |
| Phase 139 P03 | 25min | 2 tasks | 5 files |
| Phase 139 P04 | 63min | 2 tasks | 3 files |
| Phase 139 P05 | 15min | 2 tasks | 17 files |
| Phase 139 P06 | 25min | 2 tasks | 1 files |

## Accumulated Context

### Decisions

**v1.20 roadmap decisions (LOCKED 2026-08-04):** see "Named decisions" above.

**Carried-forward durable architectural decisions (from v1.14–v1.19):**

- Sequential-on-main-tree per `use_worktrees:false`; atomic harness commits (Atom 1 + Atom 2); frozen-aware via `_lib/frozen-at-close.mjs`; non-current-milestone predecessor frozen surfaces BYTE-UNCHANGED except explicitly-scoped exceptions (D-00a doctrine) — v1.20 is the milestone that finally converts the broad predecessor cohort, per its own GOV-01 CARVE, not a blanket exception
- WINDOWS-CLONE-DEEPNEST-TIMEOUT-01: Linux GHA BOTH chain validators authoritative (D-03 corrected OS split, held v1.12–v1.19); the within-apex curve is healthy (~17s, 93/0/0 at HEAD) — v1.20's NEST-01 (Phase 142) is the COLD-CLONE curve specifically, kept distinct per `v1.19-DEFERRED-CLEANUP.md:252`'s explicit non-collapse rule
- Adversarial-review invoked at discuss-phase for gray-area scoping decisions (per user memory `feedback_adversarial_review_preference.md`)
- V117/V118 pin recovery precedent (carries to V119, Phase 144): recover the close-gate SHA via the subject-line pair discriminator `git log --all --format="%H|%s" | awk -F'|' '$2 ~ /vX\.Y/ && $2 ~ /MILESTONE CLOSE/'`, count=1 — NOT the dual-token `--grep --all-match` form, which returns multiple candidates
- A later check-phase-N validator can pin an earlier check-phase's EXACT call-site string verbatim — grep before editing any frozen validator line (memory `reference_frozen_callsite_pinning.md`); this is the literal shape of GOV-02 and the RED-07/check-phase-68 guard
- Archival-drift close blocker: `complete-milestone` archiving `.planning/phases/NNN/` can break predecessor check-phase validators reading hardcoded `phases/` paths — scan nested-fail children pre-push at Phase 144's close-gate (recurs every close per memory `reference_archival_drift_close_blocker.md`)
- `.planning/REQUIREMENTS.md` must not be deleted at milestone close — `check-phase-54.mjs` live-reads it outside the frozen-at-close mechanism (memory `reference_complete_milestone_keep_requirements.md`)

*(Full v1.0–v1.19 execution-decision logs are archived in `.planning/milestones/vX.Y-MILESTONE-AUDIT.md` and `.planning/MILESTONES.md`.)*

- [Phase ?]: D-09 amendment check needs a genesis-commit exemption (git show --name-status 'A' / working-tree '??') so the bootstrap commit landing CARVE+gate+ledger together does not self-trip the amendment rule
- [Phase ?]: Pre-existing untracked docs/graphify-out/ cache pollution (unrelated skill output) blocked carve-gate.mjs verification; fixed via one .gitignore line, not a frozen-surface edit
- [Phase ?]: SWEEP-04 landed: lsTreeAtClose + 16 convenience exports + frozenCause (six-pattern classifier, cause at FRONT of err.message) + --self-test (6/6, incl. real file:// shallow-clone arm) added to _lib/frozen-at-close.mjs; D-42 blast-radius gate confirmed zero drift across all 21 real importers and the full apex (93/0/0)
- [Phase ?]: SWEEP-03 landed: four fail-loud frozen-read sites (check-phase-49.mjs V-49-18/19/21, check-phase-51.mjs readTreeFrozen) delete their inline try/catch so the throw propagates to the runner's outer catch; proven end-to-end by a real file:// shallow-clone negative harness (7/7 assertions) and a D-42 region-scoped V-68-01 gate
- [Phase ?]: Verification-method note: bare check-phase-68.mjs has pre-existing 24 PASS/9 FAIL (standalone-red chain members 48/60-66, Phase 141-142 scope) unrelated to this plan's edit -- use CHECK_PHASE_NESTED=1 to confirm V-68-01/10/11
- [Phase ?]: Phase 139 Plan 04: converted V-69-08/V-70-17 to frozen-to-frozen blob comparison (D-18/D-19/D-20/D-22), proven immune to a dirty edit on any of the three SWEEP-01 workflows -- unblocks Plan 05's fetch-depth retrofit
- [Phase ?]: Phase 139 Plan 05: swept all 97 previously-shallow checkouts across 16 workflows to fetch-depth:0 (182/182 deep, adjacency-verified), added .github/workflows/** to the base paths filter (D-17), and added one dependency-free frozen-read-probe job per workflow (D-24, no needs:) exercising a real readAtV15Close + lsTreeAtV15Close(34 entries) -- landed as one D-41 atom-5 commit; check-phase-66/69/70 (nested) and the top-level apex all green
- [Phase ?]: 139-06: Owner pre-authorized push+dispatch in advance; Task 2's blocking checkpoint still honored as a real gate (halted, no self-approval) — orchestrator independently re-verified origin/master, branch head, and all 16 frozen-read-probe conclusions before approving
- [Phase ?]: 139-06: Branch phase-139-atom-5 kept (not deleted) until Phase 144 close audit, per owner instruction
- [Phase ?]: 139-06: Recorded (not fixed) a job-name filter trap in the plan's own verify command — .jobs[].name is the display name, not the YAML job key frozen-read-probe; flagged for Phase 144 close audit

### Plan-Time Research Flags (not blockers — resolve at each phase's plan time)

- Phase 139 (SWEEP-04): finalize `lsTreeAtClose()`'s exact signature and error semantics before any harness in Phase 140 depends on it — a shape change mid-milestone would ripple through 16 harness conversions
- Phase 140 (SWEEP-08): recover/confirm the V14 SHA choice with the same subject-line-discipline used for V117/V118/V119 — `b5cf529` and `671f72a` are 34 seconds apart and NOT interchangeable
- Phase 141 (RED-02): re-verify the classifier fix does not require touching `v1.7-audit-allowlist.json:12-15` — those four pins already match live byte-for-byte; a frozen-aware read here would create a NEW mismatch (`:80` vs. pinned `:145`)
- Phase 142 (RED-06): after adopting check-phase-30/31 into `CHAIN_PHASES`, re-run `check-phase-68.mjs` directly (not just as part of the apex) to catch a V-68-04/V-68-08 regression before it surfaces downstream
- Phase 144 (HARN-19): dispatch each of the 17 workflows individually via `gh workflow run --ref master` and read job-level JSON — never trust the checks-UI top-level colour, and never read CI while the remote is behind

### Pending Todos

None yet for v1.20. Discuss-phase gray areas to resolve per phase are tracked in ROADMAP.md's per-phase "Discuss-phase flags" (5 named design forks: `lsTreeAtClose()` API shape, SWEEP-07 remedy, V14 SHA choice, v1.3 pin need for RED-04/05, NEST-01 threshold value).

### Blockers/Concerns

No open blockers. v1.19 closed clean: 17/17 Validated, both audits passed, apex 93/0/0, zero archival drift. v1.20 durable watch items:

- **`.planning/REQUIREMENTS.md` must not be deleted at any milestone close** — `check-phase-54.mjs:30,349,568` live-reads it outside the frozen-at-close mechanism, so `git rm` takes the whole apex chain red.
- The recipe-01 zero-edit guard applies corpus-wide and permanently — `check-phase-130.mjs:64,67` pins `docs/recipes/01-shared-windows-avd-client.md`'s Step 5a/5b headings as literal strings inside every apex chain.
- Zero line-shifting edits to `docs/_glossary-android.md` / `docs/reference/android-capability-matrix.md` — 365 and 139 pin coordinates across 16 frozen sidecars; v1.20's SWEEP/RED work must not touch these files.
- **CARVE-1 / `FROZEN-AWARE-ADOPTION-SWEEP-01` is IN SCOPE this milestone** for the first time since it was first carried at v1.8 — Phases 139-140 are its discharge. GOV-01's CARVE is the explicit authorization boundary.
- The ten-member standalone-RED validator set `{30,31,48,60..66}` is IN SCOPE this milestone (Phases 141-142) — the `ACCEPTED-SCOPED-RED` disposition is being closed, not carried forward.
- `ACCEPTED-STANDALONE-CI-RED` and `ACCEPTED-SCOPED-RED` must be DELETED from the backlog at Phase 144 close, not carried a seventh milestone — this is the milestone bar per REQUIREMENTS.md.
- WINDOWS-CLONE-DEEPNEST-TIMEOUT-01's cold-clone leg gets a falsifiable threshold at Phase 142 (NEST-01); the within-apex curve stays healthy and is not re-collapsed with it.
- Workflows fire on `pull_request` + schedule + `workflow_dispatch` only — a push to `master` fires nothing. Axis-2 needs an explicit `gh workflow run --ref master`, and CI must never be read while the remote is behind.

## Session Continuity

Last session: 2026-08-06T20:16:35.280Z
Stopped at: Phase 140 context gathered
Resume file: .planning/phases/140-frozen-aware-harness-conversion/140-CONTEXT.md
Next action: `/gsd-discuss-phase 139`

## Operator Next Steps

- Review the v1.20 ROADMAP.md phase structure and approve or request revision
- Start Phase 139 with `/gsd-discuss-phase 139`
