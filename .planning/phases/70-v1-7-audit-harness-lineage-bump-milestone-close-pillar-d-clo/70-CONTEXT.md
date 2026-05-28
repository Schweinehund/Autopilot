# Phase 70: v1.7 Audit Harness Lineage Bump + Milestone Close (Pillar D — Close-Gate) - Context

**Gathered:** 2026-05-28
**Status:** Ready for planning

<domain>
## Phase Boundary

The **Pillar D close-gate** phase of v1.7. Bumps the audit harness lineage v1.6 → v1.7 via Path-A copy (atomic harness commit pattern: v1.5 Plan 60-08 / v1.6 Phase 62-08 / v1.6 Phase 66-02 `3a9a671` precedent), ships per-phase validators `check-phase-67..70.mjs` as deliverables, **EXTENDS** the existing `audit-harness-v1.7-integrity.yml` (already authored at Phase 69 Plan 69-01 `dd1ff08` + Fix-1 `85521bb` + Fix-2 `2d61981` — Phase 70 does **NOT** Path-A-recreate the file), runs terminal re-audit from a fresh `git clone --no-hardlinks` into `$env:TEMP\v1.7-audit-<rand>` (D-03 LOCKED — STRICTER physical isolation than worktree; reconciles D-22 INTENT with `use_worktrees:false` constraint), authors `v1.7-MILESTONE-AUDIT.md` + finalizes `v1.7-DEFERRED-CLEANUP.md`, and closes all 12 v1.7 requirements (SWEEP-01..02 + CHAIN-01..03 + CILINUX-01 + HARNESS-01..06) with closing commit SHAs across PROJECT.md / ROADMAP.md / STATE.md / REQUIREMENTS.md.

**Deliverables (exactly):**

- **HARNESS-01** — `scripts/validation/v1.7-milestone-audit.mjs` NEW (Path-A copy from `v1.6-milestone-audit.mjs`) with C1-C13 + C14/C15/C16 preserved; lineage extends `v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7`. Harness exits 0 with all 15+ checks PASS in fully-blocking mode.

- **HARNESS-02** — `scripts/validation/v1.7-audit-allowlist.json` NEW (Path-A copy from `v1.6-audit-allowlist.json`) with `c13_rotting_external` RESET for v1.7 (CI-1/CI-2 entries reflect post-SWEEP-01/SWEEP-02 state from Phase 67 commits `3fb8ca5` + `55260b3`); `c16_missing_endpoint_exemptions: []`; sidecar shape preserved; `quarterly_audit` metadata carried forward (cadence `0 8 1 1,4,7,10 *`). **BASELINE_11** freshness comment added to `scripts/validation/regenerate-supervision-pins.mjs` closing BASELINE_10 v1.6 carry-over per per-milestone AUDIT-14-equivalent contract.

- **HARNESS-03** — Per-phase validators `check-phase-67.mjs` / `check-phase-68.mjs` / `check-phase-69.mjs` / `check-phase-70.mjs` NEW (validator-as-deliverable pattern from v1.3+); each Path-A from `check-phase-66.mjs` with phase-specific V-NN-NN assertions; `CHAIN_PHASES` does NOT include the validator's own phase (V-NN-SELF guard per `check-phase-65.mjs:151` precedent). **Per-assertion-class freshness routing per D-01:** assertions touching post-close-mutable surfaces (SWEEP corpus state, milestone audit doc) use `[v1.7-frozen @ {phase_70_close_SHA}]`-aware helpers analogous to `readRequirementsAtV15Close()` / `readRoadmapAtV15Close()` (Phase 68 Plan 68-03 Task 1 `d7d7d5f` + Phase 69 Fix-2 `2d61981` precedent); assertions about live invariants (CHAIN_SKIP empty-Set, workflow YAML integrity) remain HEAD-coupled.

- **HARNESS-04** — `.github/workflows/audit-harness-v1.7-integrity.yml` **MODIFIED** (NOT recreated — file already exists post-Phase-69 Plan 69-01 `dd1ff08`). Extensions: (a) path-filter swap v1.6 → v1.7-scoped surfaces (`scripts/validation/v1.7-*` + any v1.7 docs surface + workflow self-reference); **REMOVE** `docs/decision-trees/09-linux-triage.md` from path-filter (Phase-69-SC#5-evidence-only entry per Phase 69 D-04 sub-decision (a)); (b) **PRESERVE** `fetch-depth: 0` on `linux-chain-ubuntu-latest` checkout step (FETCH-DEPTH-01 inheritance contract from Phase 69 Fix-1 `85521bb`); (c) repoint `parse` + `path-match` + `harness-run` jobs from `v1.6-audit-allowlist.json` / `v1.6-milestone-audit.mjs` → v1.7 lineage; (d) add 2 crons (weekly bitrot `0 8 * * 1` + quarterly `rotting-external-quarterly` `0 8 1 1,4,7,10 *`); (e) extend `linux-chain-ubuntu-latest` chain-67..70 from skip-if-missing stubs to active `node` invocations as the 4 validators land via HARNESS-03; (f) add `pin-helper-advisory` job bound to `v1.7-audit-allowlist.json` (retains `continue-on-error: true` per D-A9 inheritance); (g) coexists with v1.4/v1.5/v1.6 workflows BYTE-UNCHANGED.

- **HARNESS-05** — Terminal re-audit from fresh `git clone --no-hardlinks` into `$env:TEMP\v1.7-audit-<rand>` via fresh `gsd-executor` sub-agent (v1.6 Phase 66-04 commit `489edca` mechanism precedent; D-22 INTENT via D-03 mechanism — STRICTER physical isolation than worktree; reconciles `use_worktrees:false` constraint). Runs `v1.7-milestone-audit.mjs` + full chain `check-phase-{48..70}.mjs` locally. **Mandatory parallel evidence axis per D-03:** GHA `workflow_dispatch` on `audit-harness-v1.7-integrity.yml` at master HEAD post-Phase-70-close-commit captures run URL + ubuntu-latest job log showing chain-67..70 actively running (not skip-if-missing) + per-validator PASS counts + Linux wall-clock timing. 3-axis stacking explicit: (1) fresh-clone D-03 + (2) fresh sub-agent D-22 + (3) cross-OS Linux GHA CILINUX-01. Clone removed post-audit with zero orphan temp dirs.

- **HARNESS-06** — `.planning/milestones/v1.7-MILESTONE-AUDIT.md` NEW (Path-A from `v1.6-MILESTONE-AUDIT.md` 344-line template — full v1.6 depth maintained per D-04 audit-doc-symmetry; prose tightens naturally to 12-req vs 39-req corpus). Confirms all checks PASS, 12/12 v1.7 requirements closed with closing commit SHAs, and 4-phase scope (67-70) delivered. Documents 3 Phase 69 cross-OS discoveries (FETCH-DEPTH-01 + SCOPE-GAP-61 + D-04-OVERSPEC-01 — all CLOSED in v1.7-DEFERRED-CLEANUP.md) + 2 latent meta-bugs deferred to v1.8+ (CHAIN-WRAPPER-01 + ARCHIVE-01 cdcce23 root-cause). `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` finalized carrying CI-3 (Managed Apple ID, 45 occurrences / 16 files) + Multi-tenant Apple Business + Apple Business Device API + per-OU CRD + Account Holder runbook + ASM forward to v1.8+. **Traceability closure across 4 docs:** PROJECT.md (12 v1.7 reqs Active → Validated with closing SHAs) + ROADMAP.md (Progress table 4/4 phases Complete) + STATE.md (milestone close recorded; v1.8+ entry-state readiness) + REQUIREMENTS.md (Traceability table fully populated).

**Out of scope (Phase 70 explicitly does NOT own):**

- v1.7 milestone archival itself — `/gsd-complete-milestone` skill territory, NOT HARNESS-06 (per D-03 ruling + ARCHIVE-01 entry wording "archive automation runs"). HARNESS-06 ships milestone-audit + deferred-cleanup + traceability; archival happens via separate skill invocation post-Phase-70-close.
- ARCHIVE-01 recurrence-check (cdcce23 archive-script defect) — deferred to `/gsd-complete-milestone` invocation per D-03 ruling. The 1-line `git diff HEAD~1 HEAD -- .planning/MILESTONES.md` runbook entry belongs at the archival invocation site, not inside HARNESS-06.
- ARCHIVE-01 root-cause investigation (archive-script source audit) — explicit v1.8+ scope per `v1.7-DEFERRED-CLEANUP.md:23-25` ("DO NOT mask via deletion — investigate the script").
- CHAIN-WRAPPER-01 root-cause investigation (`check-phase-66.mjs:313` stderr-only chain-apex wrapper) — explicit v1.8+ scope per `v1.7-DEFERRED-CLEANUP.md:144-178`.
- Retrospective audit of HEAD-coupled assertions across `check-phase-{48..66}.mjs` per HARNESS-FORWARD-01 — explicit v1.8+ scope per `v1.7-DEFERRED-CLEANUP.md:42-52` + SCOPE-GAP-61 retrospective recommendation; D-01 Option D was REJECTED to preserve this v1.8+ boundary.
- New C-checks beyond v1.6 inheritance (C1-C16 inherited verbatim per REQUIREMENTS.md:69 Out-of-Scope table).
- Any corpus (`docs/*`) edits — v1.7 cleanup + tooling milestone, not content milestone (per REQUIREMENTS.md:67 + STATE.md:96 "No new documentation files").
- Modifications to v1.4/v1.5/v1.6 workflow YAML files — predecessor-byte-unchanged invariant per REQUIREMENTS.md:36 + ROADMAP.md:355 + STATE.md anti-regression invariants (lines 125-134).
- BASELINE refresh beyond BASELINE_11 — BASELINE_10 closed; BASELINE_11 freshness comment is the contract; v1.8+ refreshes BASELINE_12 at next milestone close.
- CI-3 Managed Apple ID corpus rename (45 occurrences / 16 files) — explicit v1.8+ deferral per REQUIREMENTS.md:48 + STATE.md:110 (trigger condition not met as of 2026-04-30 Intune portal refresh).
- Worktree-based execution (`use_worktrees:false` durable per `.planning/config.json:7` + memory `project_execphase_sequential.md`).

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via parallel `/adversarial-review`-style scoring (Finder argues FOR each option, Adversary argues AGAINST, Referee picks winner) dispatched as 4 parallel `gsd-advisor-researcher` agents in adversarial-review mode (per user memory `feedback_adversarial_review_preference`; matches Phase 69 69-CONTEXT.md precedent). Each agent read the relevant REQUIREMENTS/ROADMAP/STATE sections + prior CONTEXT.md files + scripts/validation source files directly. Scores in parentheses (lower = better, matching the v1.6/v1.7 convention from 68-CONTEXT.md / 69-CONTEXT.md). All four recommendations user-approved without revision via single `Approve all 4` selection.

### D-01: HARNESS-03 per-phase validator scope — Option C (Phase-specific freshness rules per assertion class) (score **C=9** / A=13 / B=13 / D=16)

**Decision:** Each `check-phase-67..70.mjs` is Path-A from `check-phase-66.mjs` BUT applies per-assertion-class freshness routing (NOT uniform HEAD-coupled, NOT uniform frozen-aware):

| Assertion class | Freshness routing | Mechanism |
|---|---|---|
| **SWEEP corpus state** (Phase 67 SWEEP-01/02 deliverable artifacts) | `[v1.7-frozen @ {phase_70_close_SHA}]`-aware | Via `readCorpusAtV17Close()` helper analogous to `readRequirementsAtV15Close()` / `readRoadmapAtV15Close()` |
| **CHAIN_SKIP empty-Set** (Phase 68 CHAIN-03 invariant) | HEAD-coupled | Permanent invariant per `7b635ca`; never expected to drift |
| **Workflow YAML integrity** (Phase 69 CILINUX-01 + Phase 70 HARNESS-04 deliverable) | HEAD-coupled | Live contract — readers must see current state, not frozen snapshot |
| **Milestone audit doc** (Phase 70 HARNESS-06 `v1.7-MILESTONE-AUDIT.md`) | `[v1.7-frozen @ {phase_70_close_SHA}]`-aware | Doc IS the milestone artifact; frozen at Phase 70 close SHA |
| **Per-phase verification artifacts** (`6N-VERIFICATION.md` files) | `[v1.7-frozen @ {phase_70_close_SHA}]`-aware | Authored at each phase close; immutable thereafter |
| **REQUIREMENTS.md / ROADMAP.md planning-doc reads** | `[v1.7-frozen @ {phase_70_close_SHA}]`-aware | Direct SCOPE-GAP-61-class surface; explicit per HARNESS-FORWARD-01 |

**Concrete deliverable per validator (download-and-execute by planner/executor; do NOT renegotiate at plan-phase):**

- **`check-phase-67.mjs`** — V-67-01..NN assertions about SWEEP-01 ABM URL refs (4 URLs / 4 files; sidecar `c13_rotting_external.ci_1_abm_urls` post-revalidation state) + SWEEP-02 VPP location token rename (6 occurrences / 2 files; sidecar `c13_rotting_external.ci_2_vpp_location_token` post-rename state) + corpus Version History row presence + glossary cross-references → ALL **v1.7-frozen-aware** (SWEEP corpus state)
- **`check-phase-68.mjs`** — V-68-01..NN assertions about CHAIN_SKIP empty-Set across check-phase-62..66.mjs + readFile() CRLF normalization presence in check-phase-{51,58}.mjs + `_lib/archive-path.mjs` helper existence + 5 call-site replacements + BASELINE_9 +1 banner shift in regenerate-supervision-pins.mjs + parseAllowlist v1.5→v1.6 lineage repoint → MIXED (CHAIN_SKIP empty-Set = HEAD invariant; archive-path helper + readFile() centralization = HEAD source-of-truth; BASELINE_9 banner = v1.7-frozen since BASELINE_10/11 refresh-then-archive)
- **`check-phase-69.mjs`** — V-69-01..NN assertions about `audit-harness-v1.7-integrity.yml` existence + 4 jobs (parse + path-match + harness-run + linux-chain-ubuntu-latest) + `core.autocrlf false` + `fetch-depth: 0` on linux-chain checkout + `continue-on-error: false` PR-blocking + `node-version: '20'` + `::notice title=CHAIN_TIMING_LINUX::` emission + skip-if-missing stubs for 67-70 (at Phase 69 close; check-phase-70 may need to acknowledge HARNESS-04 has since extended these to active invocations) → MIXED (Phase 69 close-state = v1.7-frozen-aware; current workflow YAML = HEAD for cross-OS verification axis)
- **`check-phase-70.mjs`** — V-70-01..NN assertions about: HARNESS-01 `v1.7-milestone-audit.mjs` existence + lineage docstring + C1-C16 inheritance + BASELINE_11 freshness comment in regenerate-supervision-pins.mjs + HARNESS-02 `v1.7-audit-allowlist.json` shape + `c13_rotting_external` reset state + `quarterly_audit` cadence + HARNESS-03 check-phase-67..70.mjs existence + V-NN-SELF guard + HARNESS-04 workflow YAML post-EXTEND state (path-filter v1.7-scoped + 2 crons + pin-helper-advisory + chain-67..70 active invocations + 09-linux-triage.md REMOVED) + HARNESS-05 terminal re-audit artifact `70-04-AUDIT-RESULTS.md` existence + HARNESS-06 `v1.7-MILESTONE-AUDIT.md` + `v1.7-DEFERRED-CLEANUP.md` finalized + PROJECT.md/ROADMAP.md/STATE.md/REQUIREMENTS.md traceability closure → MIXED (live deliverable assertions = HEAD; planning-doc reads + audit doc + per-phase verification artifacts = v1.7-frozen-aware via `{phase_70_close_SHA}` placeholder, chicken-and-egg-resolved at Plan 70-05 close-gate substitution per Phase 68 Plan 68-05 / Phase 69 Plan 69-02 precedent)

**V-NN-SELF guard:** Each `check-phase-NN.mjs` CHAIN_PHASES Set must NOT include its own phase number (per `check-phase-65.mjs:151` precedent). `check-phase-67.mjs` CHAIN_PHASES = {48..66}; `check-phase-68.mjs` CHAIN_PHASES = {48..67}; `check-phase-69.mjs` CHAIN_PHASES = {48..68}; `check-phase-70.mjs` CHAIN_PHASES = {48..69}.

**Per-V-NN-NN freshness matrix authored as Plan 70-01 Wave 1 deliverable** — explicit per-assertion table (4 phases × ~4-10 assertions = ~16-40 row table in `70-CONVENTIONS.md`) converts classifier-risk into a reviewed artifact BEFORE plan-phase authoring begins. Plan author MUST reference this matrix when scaffolding V-NN-NN assertions in Wave 3.

**Rationale:**

- **Path-A source itself uses per-assertion routing** — `check-phase-61.mjs` post-`d7d7d5f` (Plan 68-03 Task 1) + post-`2d61981` (Phase 69 Fix-2) is a per-assertion-class router: V-61-01..04 + V-61-05..08 are v1.5-frozen-aware (REQUIREMENTS.md / ROADMAP.md reads), V-61-CHAIN + V-61-AUDIT remain HEAD-coupled. Option C literal-copies this design; Options A/B/D diverge from it.
- **Honors HARNESS-FORWARD-01 surgically** — captures SCOPE-GAP-61-class prevention for assertions actually exposed to post-close drift (planning-doc reads, milestone audit doc, per-phase VERIFICATION.md) without pulling forward the explicit v1.8+ retrospective audit of check-phase-{48..66}.mjs (which Option D would force into Phase 70 scope).
- **HEAD-coupled where HEAD-coupled belongs** — CHAIN_SKIP empty-Set is a permanent invariant declared evergreen by Phase 68 `7b635ca`; workflow YAML integrity is a live contract (the very thing CILINUX-01 cross-OS-verifies); freezing these would defeat their semantics.
- **Plan-phase decision surface absorbed into Wave 1** — `70-CONVENTIONS.md` per-assertion freshness matrix (Plan 70-01 deliverable) means Wave 3 plan author makes ZERO classification decisions during HARNESS-03 validator authoring — they execute the matrix.
- **Forward bridge preserved** — `v1.7-DEFERRED-CLEANUP.md` SCOPE-GAP-61 §"Retrospective audit recommendation (v1.8+)" stays unchanged; Option C does not preclude the v1.8+ retrospective audit, it sequences it correctly per Phase 69 close-gate decision.

### D-02: Atomic-commit composition — Option C (Two-atomic split: harness-core / validator+CI surface) (score **C=10** / B=13 / D=14 / A=18)

**Decision:** Two atomic commits at two natural cleavage planes:

**Atom 1: Harness-core ATOMIC commit** (mirrors v1.6 Phase 66-02 `3a9a671` 3-file scope LITERALLY):
- `scripts/validation/v1.7-milestone-audit.mjs` NEW (HARNESS-01)
- `scripts/validation/v1.7-audit-allowlist.json` NEW (HARNESS-02)
- `scripts/validation/regenerate-supervision-pins.mjs` MODIFIED (BASELINE_11 freshness comment per HARNESS-02 contract)

**Atom 2: Validator+CI surface ATOMIC commit** (chain-validator topology + CI-execution-graph indivisibility):
- `scripts/validation/check-phase-67.mjs` NEW
- `scripts/validation/check-phase-68.mjs` NEW
- `scripts/validation/check-phase-69.mjs` NEW
- `scripts/validation/check-phase-70.mjs` NEW
- `.github/workflows/audit-harness-v1.7-integrity.yml` MODIFIED (HARNESS-04 EXTEND: path-filter v1.7-scoped + REMOVE 09-linux-triage.md + 2 crons + pin-helper-advisory + chain-67..70 active node invocations + parse/path-match/harness-run repoint v1.6→v1.7)

**Mapping to Wave plans (per D-04):**
- Atom 1 = Wave 2 Plan 70-02 commit
- Atom 2 = Wave 3 Plan 70-03 commit

**Pre-commit dry-run protocol (inherits Phase 66-02 D-01 5-step pattern):**

1. Stage Atom 1 — run `node scripts/validation/v1.7-milestone-audit.mjs && node scripts/validation/regenerate-supervision-pins.mjs --self-test` → require green → commit Atom 1
2. Stage Atom 2 — run full chain `check-phase-{48..70}.mjs` locally (Atom 1 must already be on HEAD so v1.7-milestone-audit.mjs exists for chain-66 cascade) → require all green with zero CHAIN_SKIP → commit Atom 2
3. If any validator reds in step 2, fold the reconciling file into the OWNING atom (NOT across atoms) before re-running from step 1 of that atom

**Rationale:**

- **Sharpest reading of dual-precedent stack** — Phase 66-02 `3a9a671` 3-file harness-core atomic + Phase 68 `7b635ca` 5-validator chain-topology atomic are TWO distinct atomic-commit precedents in STATE.md:108-109. Option C honors BOTH at their natural cleavage planes rather than collapsing (A) or fragmenting (B/D).
- **Literal Phase 66-02 scope preserved in Atom 1** — milestone-audit.mjs + audit-allowlist.json + BASELINE_NN regenerate-supervision-pins.mjs = EXACTLY the 3-file scope STATE.md:108 locks. Option A inflates scope to 8+ files; Option D fragments it across 4-6 commits.
- **Chain-validator topology indivisibility preserved in Atom 2** — check-phase-67..70 + workflow YAML's chain-67..70 active-node invocation form a single CI-execution-graph atom; splitting them creates RED intermediate states. Option B (4-way validator split) fails this; Option D fails this via V-70-NN chicken-and-egg.
- **Bisect-ability optimal at 2 intervals** — Post-close regression collapses binary-search to "harness-core OR consumer-surface"; strictly better than Option A's one giant interval, only marginally worse than B/D's finer granularity (which fail the topology criterion).
- **HARNESS-04's YAML-as-MODIFICATION vs HARNESS-01/02-as-NEW asymmetry absorbed** — Atom 2 naturally bundles the workflow YAML EXTENSION alongside its dependent validators (same epistemic class: CI surface; same revert semantics).
- **v1.8+ retrospective readability** — Two named atoms ("harness-core-v1.7" + "validator-CI-surface-v1.7") yield cleaner `git log --oneline` than 6+ per-validator commits (B) or one opaque 8+-file mega-commit (A). Future v1.8 milestone-close author Path-A-copies a comprehensible 2-step pattern.

### D-03: HARNESS-05 terminal re-audit mechanics + ARCHIVE-01 timing — Option B (3-axis mandatory stacking + ARCHIVE-01 deferred to `/gsd-complete-milestone`) (score **B=10** / A=11 / C=12 / D=14)

**Decision:** HARNESS-05 close-gate requires BOTH evidence axes (mandatory parallel):

**Axis 1 (local fresh-clone — D-03 LOCKED mechanism):**
- Fresh `gsd-executor` sub-agent spawned distinct from Plans 70-01..70-04 author-agents (D-22 INTENT)
- Fresh `git clone --no-hardlinks https://github.com/<repo> $env:TEMP\v1.7-audit-<rand>` (separate `.git/` — STRICTER than worktree per v1.6 Phase 66-04 precedent `489edca`)
- `cd` into temp clone; run `node scripts/validation/v1.7-milestone-audit.mjs --verbose` → require exit 0 + all 15+ checks PASS
- Run full chain `node scripts/validation/check-phase-70.mjs --verbose` (chain-apex; recursively spawns check-phase-{48..69}) → require exit 0 + 0 SKIPPED
- Capture exit codes + summary lines into `70-04-AUDIT-RESULTS.md` (mirror Phase 66-04 `66-04-AUDIT-RESULTS.md` shape)
- Remove temp clone post-audit (`Remove-Item -Recurse -Force $env:TEMP\v1.7-audit-<rand>`); zero orphan temp dirs

**Axis 2 (cross-OS Linux GHA — CILINUX-01 axis from Phase 69):**
- After Atom 2 (Wave 3 Plan 70-03) lands on master, trigger `workflow_dispatch` on `.github/workflows/audit-harness-v1.7-integrity.yml` at master HEAD via `gh workflow run audit-harness-v1.7-integrity.yml --ref master`
- Capture GHA run URL + ubuntu-latest job log tail
- Verify: chain-67..70 jobs actively run (NOT skip-if-missing — Atom 2 lands the validators); all 4 jobs (parse + path-match + harness-run + linux-chain-ubuntu-latest) exit 0; chain-apex reports 32 PASS / 0 FAIL / 0 SKIPPED (28 v1.6-baseline + 4 v1.7-new validators) on ubuntu-latest
- Embed run URL + summary into `70-04-AUDIT-RESULTS.md` Section B.2 (Linux cross-OS evidence)

**3-axis stacking explicit:** (1) fresh-clone D-03 + (2) fresh sub-agent D-22 + (3) cross-OS Linux GHA CILINUX-01 — operationalizes the 3-axis independence elevation declared in STATE.md:111 at the literal close-gate moment.

**ARCHIVE-01 disposition:** **DEFERRED** to `/gsd-complete-milestone` skill invocation post-Phase-70-close. Rationale: ARCHIVE-01 entry's own wording (`v1.7-DEFERRED-CLEANUP.md:21` "Plan 70 author MUST run `git diff HEAD~1 HEAD -- .planning/MILESTONES.md` immediately after the archive automation runs") locates the diff-check at the archival invocation site, NOT inside HARNESS-06's milestone-audit-authoring scope. The 1-line runbook diff-check belongs in the `/gsd-complete-milestone` skill's post-archival verification step. Phase 70 ships the requirement; the skill executes the verification.

**Rationale:**

- **STATE.md:111 explicit elevation** — "three independence axes now stack at terminal re-audit"; Option B is the only option that operationally stacks all three at the close-gate moment.
- **GHA workflow_dispatch cost empirically negligible** — Phase 69 measured ~56s Linux runtime (TIMEOUT-01 CLOSED with 32× headroom vs 1800s job cap); no real complexity penalty for mandating it.
- **Phase 66-04 precedent is MECHANISM precedent, not AXIS precedent** — D-03 fresh-clone mechanism carries forward verbatim; CILINUX-01 is an ADDITIVE axis that didn't exist at v1.6 close. Stacking ≠ infidelity.
- **ARCHIVE-01 skill-boundary preservation** — ARCHIVE-01 entry's own wording locates the diff-check at the archival invocation site; conflating it into HARNESS-06 over-scopes Phase 70 (REQUIREMENTS.md:40 HARNESS-06 deliverables list does NOT include archival invocation). Phase 70's contract is milestone-audit doc + deferred-cleanup + traceability, NOT archival mechanics.
- **Independence-rigor is the highest-weight criterion for a close-gate re-audit** — Option B wins criterion 1 outright; +1 complexity vs Option A is a fair trade for +2 rigor.
- **v1.8+ deferral boundaries preserved cleanly** — ARCHIVE-01 root-cause investigation explicitly stays out of Phase 70 (no fork to v1.8+ surgery), matching `v1.7-DEFERRED-CLEANUP.md:23-25` "DO NOT mask via deletion — investigate the script" deferred-cleanup contract.

### D-04: Plan structure + audit doc depth — Option D (Wave-based 5-plan with explicit Wave 1..5 frontmatter + full v1.6 audit doc depth) (score **D=6** / A=10 / C=16 / B=22)

**Decision:** 5-plan structure with explicit `wave: 1..5` frontmatter + `depends_on: [70-NN]` linear chaining (verbatim match to Phase 66 plan-frontmatter mechanism observed in 66-01..66-05). `v1.7-MILESTONE-AUDIT.md` maintains full v1.6 (344-line) depth — prose tightens naturally to 12-req corpus.

**Plan layout (locked):**

| Wave | Plan | Scope | Deliverables | Commit |
|---|---|---|---|---|
| **Wave 1** | **70-01-PLAN.md** | Scaffold + Conventions + per-assertion freshness matrix | `check-phase-70.mjs` Path-A scaffold (V-NN-SELF guard: CHAIN_PHASES = {48..69}) + `70-CONVENTIONS.md` (per-V-NN-NN freshness routing matrix per D-01) + `70-ANCHOR-INVENTORY.md` (only if any anchor surfaces touched — likely empty for Pillar D) + v1.5-frozen-aware pattern carry-forward documentation (HARNESS-FORWARD-01 closure note) | Single Wave-1 scaffold commit |
| **Wave 2** | **70-02-PLAN.md** | ATOMIC harness-core (per D-02 Atom 1) | HARNESS-01 (`v1.7-milestone-audit.mjs` NEW) + HARNESS-02 (`v1.7-audit-allowlist.json` NEW + `regenerate-supervision-pins.mjs` BASELINE_11) | **Atom 1** — ONE atomic commit per D-02 (3 files indivisible per Phase 66-02 `3a9a671` precedent) |
| **Wave 3** | **70-03-PLAN.md** | HARNESS-03 validators + HARNESS-04 workflow EXTEND (per D-02 Atom 2) | check-phase-67/68/69/70.mjs NEW + `audit-harness-v1.7-integrity.yml` EXTEND (REMOVE 09-linux-triage.md from path-filter + path-filter v1.7-scoped + 2 crons + pin-helper-advisory + chain-67..70 active invocations + parse/path-match/harness-run v1.6→v1.7 repoint; PRESERVE fetch-depth:0 per FETCH-DEPTH-01 inheritance) | **Atom 2** — ONE atomic commit per D-02 (4 validators + 1 workflow YAML; CI-execution-graph indivisibility) |
| **Wave 4** | **70-04-PLAN.md** | HARNESS-05 terminal re-audit (per D-03 3-axis) | Axis 1 (local fresh-clone via fresh gsd-executor + `$env:TEMP\v1.7-audit-<rand>`) + Axis 2 (GHA workflow_dispatch on master HEAD post-Wave-3) + `70-04-AUDIT-RESULTS.md` artifact + clone removal | Single Wave-4 audit-results commit (no source-file edits; only the audit-results artifact) |
| **Wave 5** | **70-05-PLAN.md** | HARNESS-06 milestone close + traceability | `v1.7-MILESTONE-AUDIT.md` NEW (Path-A from v1.6, full depth) + `v1.7-DEFERRED-CLEANUP.md` FINALIZE (extend with v1.6 carry-overs + Phase 69 discoveries final dispositions) + PROJECT.md/ROADMAP.md/STATE.md/REQUIREMENTS.md traceability closure (12/12 v1.7 reqs Active→Validated with closing SHAs) + `{phase_70_close_SHA}` placeholder fill in check-phase-NN.mjs frozen-aware refs (chicken-and-egg-resolved via Plan 70-05 Commit A: placeholder fill; Commit B: close-gate per Plan 68-05 / 69-02 precedent) | Wave-5 close-gate commits (2 commits: A = SHA placeholder fill; B = close-gate) |

**Plan frontmatter convention (mirror Phase 66 verbatim):**
```yaml
---
phase: 70
plan: 70-NN
wave: N
title: <descriptive title>
depends_on: [70-(N-1)]  # except 70-01 which has no deps
---
```

**v1.7-MILESTONE-AUDIT.md depth (Path-A from v1.6, full depth maintained):**

| Section | v1.6 source | v1.7 application |
|---|---|---|
| Frontmatter + audit status | `v1.6-MILESTONE-AUDIT.md:1-15` | `status: passed` post-Wave-4 close-gate; 12/12 reqs closed |
| Executive Summary | v1.6:17-45 | 4-phase scope (67-70) + 12 reqs closed + 3-axis independence achieved |
| Auditor-Independence Verification | v1.6:47-90 | **Expanded to 3 axes** (fresh-clone + fresh sub-agent + cross-OS Linux GHA); Wave-4 evidence embedded with both axis run URLs |
| Methodology Highlights | v1.6:92-145 | Path-A inheritance + per-assertion freshness routing (D-01) + two-atomic split (D-02) + 3-axis stacking (D-03) + Wave-based execution (D-04) |
| Per-Phase Verification Table | v1.6:147-180 | 4 rows: Phase 67/68/69/70 with VERIFICATION.md cross-refs + closing SHAs |
| Per-Requirement Closure | v1.6:182-230 | 12 rows: SWEEP-01/02 + CHAIN-01/02/03 + CILINUX-01 + HARNESS-01..06 with closing SHAs |
| **NEW (v1.7-specific): Discoveries Surfaced During Execution** | (not in v1.6 template) | Phase 69 3 cross-OS discoveries (FETCH-DEPTH-01 CLOSED + SCOPE-GAP-61 CLOSED + D-04-OVERSPEC-01 ACKNOWLEDGED) + 2 latent meta-bugs deferred to v1.8+ (CHAIN-WRAPPER-01 + ARCHIVE-01 root-cause) — cross-reference to phase VERIFICATION.md §E sections + v1.7-DEFERRED-CLEANUP.md entries |
| Command Verification Table | v1.6:232-280 | Audit command reproducibility table (run from temp clone + workflow_dispatch run URL) |
| Sign-off + Forward-pointer | v1.6:282-344 | v1.7 closed; v1.8+ entry-state ready; CI-3 + 5 deferrals enumerated with v1.8+ trigger conditions |

**Rationale:**

- **Phase 66 frontmatter empirically wave-tagged** — 66-01..66-05 confirmed `wave: N` + `depends_on: [66-(N-1)]` chaining (66-01 line 5 / 66-02 line 5 / etc.). Option D matches verbatim; Option A is same plan-count but loses the explicit wave label.
- **D-02 ATOMIC boundary protected as Wave 2 + Wave 3** — naming the waves "ATOMIC HARNESS-01+02+BASELINE_11" (Atom 1 / Wave 2) + "ATOMIC HARNESS-03 validators + HARNESS-04 workflow EXTEND" (Atom 2 / Wave 3) makes indivisibility a NAMED architectural feature. Option B shatters this; Option C bundles validators+workflow but loses the dedicated scaffold/conventions surface.
- **Wave 1 absorbs HARNESS-FORWARD-01 carry-forward + 3 Phase 69 discoveries** — dedicated scaffold plan captures the v1.5-frozen-aware pattern + per-assertion freshness matrix (D-01) before plan-phase authoring; Option C's 4-plan compaction loses this dedicated surface.
- **Plan-count precedent dominates corpus-size delta** — Phase 66 (39 reqs) + Phase 61 (5 reqs) both shipped in 5 plans; close-gate plan count is INSENSITIVE to req count because the deliverable topology (scaffold → atomic-harness → workflow-YAML → fresh-clone re-audit → milestone-close) is constant. Option B's "right-sizing" fails the precedent test.
- **Audit-doc full v1.6 depth survives 3.25× corpus shrinkage** — v1.4 audit = 470 lines, v1.5 = 250, v1.6 = 344; empirical variance already 1.9×; another ~30% shrink for 12-req v1.7 is natural, not "padding." Full Methodology Highlights + Auditor-Independence Verification (expanded to 3 axes) + Command Verification Table sections are STRUCTURAL, required for traceability symmetry across v1.4..v1.7.
- **Sequential-on-main-tree discipline honored** — `depends_on: [70-(N-1)]` linear chaining matches `project_execphase_sequential.md` user-memory constraint + `.planning/config.json:7 use_worktrees:false`. No wave-parallelism implied; Wave designators document execution ORDER, not concurrency.

### Claude's Discretion

- **D-01 per-V-NN-NN freshness matrix authoring** — Plan 70-01 Wave-1 author writes the ~16-40 row table in `70-CONVENTIONS.md` based on the four-validator scope outlined in D-01 table. Specific V-NN-NN numbering (V-67-01..V-70-NN) is plan-author's tactical choice within the per-assertion-class framework.
- **70-04-AUDIT-RESULTS.md section shape** — mirror Phase 66-04 `66-04-AUDIT-RESULTS.md` verbatim with one addition: a B.2 Linux cross-OS evidence section (axis 2 per D-03). Plan 70-04 author may adjust section headers for clarity.
- **Plan 70-05 chicken-and-egg resolution** — `{phase_70_close_SHA}` placeholder in check-phase-NN.mjs frozen-aware refs follows Plan 68-05 / 69-02 precedent Option (a): leave literal placeholder until close-gate commit lands; recover via `git log --all --grep="70-05"`. Plan 70-05 author may opt for Option (b) two-commit pattern (Commit A: placeholder fill; Commit B: close-gate) — recommend (b) for cleaner audit-doc citation symmetry with v1.6 Phase 66-05 Plan 66-05-PLAN.md ATOMIC TRIO precedent.
- **Wave 4 axis 2 GHA workflow_dispatch invocation timing** — must occur AFTER Wave 3 Atom 2 lands on master (so chain-67..70 are active not skip-if-missing). Plan 70-04 author may choose to invoke immediately at Wave-4 start (chain-cascade still recent) OR after `70-CONVENTIONS.md` per-V-NN-NN spot-check is complete. Recommend immediate at Wave-4 start.
- **v1.7-MILESTONE-AUDIT.md NEW "Discoveries Surfaced During Execution" section** — not in v1.6 template but justified by v1.7's tooling-milestone nature surfacing 3 architectural discoveries (FETCH-DEPTH-01 + SCOPE-GAP-61 + D-04-OVERSPEC-01) + 2 latent meta-bugs (CHAIN-WRAPPER-01 + ARCHIVE-01). Plan 70-05 author should treat this as a v1.7-specific addition that future v1.8+ milestone audits MAY adopt as template feature if their phases also surface architectural discoveries.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (gsd-phase-researcher, gsd-planner, gsd-executor) MUST read these before planning or implementing.**

### Phase scope + requirements
- `.planning/REQUIREMENTS.md` §"Pillar D — v1.7 Audit Harness Lineage Bump" (lines 28-40) — HARNESS-01..06 binding contracts; lineage `v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7`; BASELINE_11 closes BASELINE_10; sidecar shape; quarterly_audit metadata; PR-blocking per D-A9; coexists with v1.4/v1.5/v1.6 workflows
- `.planning/REQUIREMENTS.md` line 78-100 — Traceability table (12/12 v1.7 reqs; HARNESS-01..06 Pending → Validated at Phase 70 close)
- `.planning/REQUIREMENTS.md` lines 42-58 — v1.8+ Deferrals (carry-forward to v1.7-DEFERRED-CLEANUP.md at HARNESS-06)
- `.planning/REQUIREMENTS.md` lines 59-72 — Out-of-Scope table (anti-regression invariants Phase 70 MUST preserve)
- `.planning/ROADMAP.md` lines 363-374 — Phase 70 full goal + SC#1-5 + 6 requirements mapping
- `.planning/ROADMAP.md` line 451 — Phase 70 Progress row (0/TBD → 5/5 Complete at HARNESS-06 close)
- `.planning/STATE.md` lines 100-119 — v1.7 architectural decisions (sequential-on-main-tree + fresh-clone D-03 LOCKED + atomic harness commit pattern + atomic CHAIN_SKIP removal + CI-Linux as 3rd independence axis + CI-3 v1.8+ deferral)
- `.planning/STATE.md` lines 137-173 — Pending Todos (Plan 70 authoring tactical notes) + Phase 69 Decisions (HARNESS-04 forward-coordination flags; fetch-depth:0 inheritance; 09-linux-triage.md REMOVE)

### Prior phase decisions (locked — do not re-litigate)
- `.planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-CONTEXT.md` — D-01 (Version History row + last_verified bump per file) + D-04 (per-requirement plan structure with atomic-within-plan commits — informs D-02 splitting precedent rejection in Phase 70)
- `.planning/phases/68-chain-skip-root-cause-resolution-pillar-b-validator-surgery/68-CONTEXT.md` — D-01 (CHAIN-01 readFile centralization — Phase 70 V-68-NN asserts on its presence) + D-02 (CHAIN-02 archive-path helper `_lib/archive-path.mjs` — Phase 70 V-68-NN asserts on existence + 5 call-sites) + D-04 (atomic 5-validator CHAIN_SKIP removal — reinforces Phase 70 Atom 2 chain-topology indivisibility)
- `.planning/phases/69-ci-linux-hardening-pillar-c-cross-os-verification/69-CONTEXT.md` — D-01 (workflow YAML staging strategy — Phase 70 EXTENDS this file, does NOT recreate) + D-02 (chain scope `{48..70}` skip-if-missing → active invocations as validators land) + D-03 (4-job topology parse + path-match + harness-run + linux-chain-ubuntu-latest) + D-04 (SC#5 reframe per D-04-OVERSPEC-01 acknowledged)
- `.planning/phases/69-ci-linux-hardening-pillar-c-cross-os-verification/69-VERIFICATION.md` §Section E — 3 architectural discoveries documented (FETCH-DEPTH-01 + SCOPE-GAP-61 + D-04-OVERSPEC-01); Section F — forward-pointer to Phase 70 (HARNESS-04 inheritance of fetch-depth:0 + REMOVE 09-linux-triage.md)
- `.planning/milestones/v1.6-phases/66-apple-business-validation-tooling-closure-milestone-audit/66-CONTEXT.md` — D-01 (Phase 66-02 AUDIT-14 atomic harness commit 3-file scope — Phase 70 Atom 1 literal compliance) + D-03 (Phase 66-04 fresh-worktree mechanics — Phase 70 HARNESS-05 Axis 1 mechanism precedent)
- `.planning/milestones/v1.6-phases/66-apple-business-validation-tooling-closure-milestone-audit/66-01-PLAN.md..66-05-PLAN.md` — Wave 1..5 frontmatter precedent (`wave: N` + `depends_on: [66-(N-1)]`); Phase 70 plan frontmatter mirrors verbatim

### Deferred-cleanup carry-forward (HARNESS-06 finalize source)
- `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` — ALL entries (ARCHIVE-01 + ARCHIVE-02 + HARNESS-FORWARD-01 + TIMEOUT-01 CLOSED + FETCH-DEPTH-01 CLOSED + SCOPE-GAP-61 CLOSED + D-04-OVERSPEC-01 ACKNOWLEDGED + CHAIN-WRAPPER-01 DEFERRED + CHAIN-31 CLOSED + Carry-forward from v1.6-DEFERRED-CLEANUP.md) — HARNESS-06 Plan 70-05 finalizes with v1.6 carry-overs added
- `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` — v1.6 carry-forward source (CI-3 + Multi-tenant Apple Business + Apple Business Device API + per-OU CRD + Account Holder runbook + ASM)

### Path-A source files (Phase 70 HARNESS-01..04 templates)
- `scripts/validation/v1.6-milestone-audit.mjs` — HARNESS-01 Path-A source (C1-C16 inheritance template; BASELINE comment location)
- `scripts/validation/v1.6-audit-allowlist.json` — HARNESS-02 Path-A source (sidecar shape: `supervision_exemptions[]` + `c13_rotting_external` + `c16_missing_endpoint_exemptions` + `quarterly_audit` metadata)
- `scripts/validation/regenerate-supervision-pins.mjs` — HARNESS-02 BASELINE_11 freshness comment target (BASELINE_10 line — Phase 70 increments)
- `scripts/validation/check-phase-66.mjs` — HARNESS-03 Path-A source for check-phase-67..70.mjs; V-NN-SELF guard line 151 precedent; chain-apex wrapper line 313 (CHAIN-WRAPPER-01 latent meta-bug — DO NOT FIX in Phase 70, deferred to v1.8+ per scope discipline)
- `scripts/validation/check-phase-61.mjs` — Per-assertion-class freshness routing exemplar (V-61-01..08 v1.5-frozen-aware via `readRequirementsAtV15Close()` + `readRoadmapAtV15Close()`; V-61-CHAIN + V-61-AUDIT HEAD-coupled); Phase 70 HARNESS-03 mirrors this dual-mode design per D-01
- `scripts/validation/_lib/archive-path.mjs` — Phase 68 CHAIN-02 helper (Phase 70 V-68-NN assertion target: helper existence + 5 call-site replacements)
- `.github/workflows/audit-harness-v1.7-integrity.yml` — HARNESS-04 EXTEND target (NOT Path-A-recreate — file exists at HEAD post-Phase-69 Plan 69-01 `dd1ff08` + Fix-1 `85521bb` + Fix-2 `2d61981`)
- `.github/workflows/audit-harness-v1.6-integrity.yml` — HARNESS-04 source for jobs NOT yet present in v1.7 file (2 crons + pin-helper-advisory + rotting-external-quarterly cron job) — BYTE-UNCHANGED invariant (Phase 70 reads from it but does NOT modify)
- `.planning/milestones/v1.6-MILESTONE-AUDIT.md` — HARNESS-06 Path-A template (344 lines; full depth — Phase 70 maintains per D-04)

### Predecessor workflow invariants (BYTE-UNCHANGED — do NOT edit)
- `.github/workflows/audit-harness-integrity.yml` (v1.4) — BYTE-UNCHANGED invariant
- `.github/workflows/audit-harness-v1.5-integrity.yml` — BYTE-UNCHANGED invariant
- `.github/workflows/audit-harness-v1.6-integrity.yml` — BYTE-UNCHANGED invariant

### Convention + project context
- `.planning/PROJECT.md` §"Current Milestone: v1.7" — Pillar D contract; atomic harness commit pattern; sequential-on-main-tree; auditor-independence axes; CI-3 v1.8+ deferral rationale
- `.planning/config.json` line 7 — `use_worktrees: false` (durable per memory `project_execphase_sequential.md`)
- `CLAUDE.md` — project structure overview (not load-bearing for Phase 70 since HARNESS-01..06 are scripts/validation/ + .github/workflows/ + .planning/, not PowerShell/Python/React)

### Pattern precedents
- **Atomic harness commit pattern** — v1.5 Plan 60-08 + v1.6 Phase 62-08 + v1.6 Phase 66-02 `3a9a671` (3-file indivisible: milestone-audit.mjs + audit-allowlist.json + BASELINE bump in regenerate-supervision-pins.mjs)
- **Atomic chain-topology commit pattern** — v1.6 Phase 66-02 + v1.7 Phase 68 `7b635ca` (multi-validator-file ATOMIC for chain-validator indivisibility)
- **Fresh `git clone --no-hardlinks` D-03 LOCKED mechanism** — v1.6 Phase 66-04 `489edca` (fresh `gsd-executor` sub-agent + `$env:TEMP\<milestone>-audit-<rand>`; STRICTER than worktree)
- **v1.5-frozen-aware (now v1.N-frozen-aware) per-assertion helper pattern** — Phase 68 Plan 68-03 Task 1 `d7d7d5f` (`readRequirementsAtV15Close()`) + Phase 69 Fix-2 `2d61981` (`readRoadmapAtV15Close()`)
- **Chicken-and-egg SHA placeholder resolution** — Plan 68-05 Commit A `3814bee` (SHA-placeholder fill from prior atomic) + Plan 69-02 close-gate (literal `{69_02_SHA}` placeholder per Option (a)); Phase 70 Plan 70-05 follows two-commit Option (b) per D-04 recommendation
- **Wave 1..5 plan frontmatter** — Phase 66 verbatim (`wave: N` + `depends_on: [66-(N-1)]`)
- **`if [ -f scripts/validation/check-phase-NN.mjs ]; then ...; else echo "skip per Phase 42 D-31"; fi` idiom** — Phase 70 HARNESS-04 REMOVES the for-loop stubs (replaces with active `node` invocations as check-phase-67..70 land)
- **`continue-on-error: false` PR-blocking per D-A9** — Phase 43 + Phase 48 precedent; v1.7 inherits (only `pin-helper-advisory` retains `continue-on-error: true`)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- **`scripts/validation/v1.6-milestone-audit.mjs`** — HARNESS-01 Path-A source; C1-C16 inheritance template; ~15 checks; Phase 70 produces v1.7-milestone-audit.mjs by literal file-copy + lineage docstring update (`v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7`) + BASELINE_11 freshness comment update.
- **`scripts/validation/v1.6-audit-allowlist.json`** — HARNESS-02 Path-A source; sidecar shape (`supervision_exemptions[]` + `c13_rotting_external` + `c16_missing_endpoint_exemptions` + `quarterly_audit` metadata) carried forward verbatim; `c13_rotting_external` RESET to post-SWEEP-01/02 state from Phase 67 (`ci_1_abm_urls` revalidated entries from `3fb8ca5`; `ci_2_vpp_location_token` post-rename state from `55260b3`).
- **`scripts/validation/check-phase-66.mjs`** — HARNESS-03 Path-A source for all 4 v1.7 validators; chain-apex pattern (recursively spawns check-phase-{48..65} via `execFileSync` with `timeout: 300000`); V-NN-SELF guard at line 151 (`CHAIN_PHASES` Set excluding self).
- **`scripts/validation/check-phase-61.mjs`** — Per-assertion-class freshness routing exemplar (post-`d7d7d5f` + post-`2d61981`); V-61-01..08 v1.5-frozen-aware via `readRequirementsAtV15Close()` / `readRoadmapAtV15Close()` helpers; V-61-CHAIN / V-61-AUDIT HEAD-coupled — Phase 70 HARNESS-03 mirrors dual-mode design per D-01.
- **`scripts/validation/_lib/archive-path.mjs`** — Phase 68 CHAIN-02 helper (handles `.planning/phases/NN-...` ↔ `.planning/milestones/<version>-phases/NN-...` cross-archival path resolution); Phase 70 check-phase-67..70.mjs inherit usage transparently via chain-apex.
- **`.github/workflows/audit-harness-v1.7-integrity.yml`** — HARNESS-04 EXTEND target (file exists post-Phase-69; Phase 70 modifies — does NOT recreate). Current state: 4 jobs (parse + path-match + harness-run + linux-chain-ubuntu-latest) with v1.6 sidecar/harness references + skip-if-missing stubs for 67-70 + transitional path-filter including `docs/decision-trees/09-linux-triage.md`.
- **`.github/workflows/audit-harness-v1.6-integrity.yml`** — Source for v1.7 file extensions not yet present: 2 crons (weekly bitrot + quarterly rotting-external) + pin-helper-advisory job + rotting-external-quarterly cron job pattern.
- **`.planning/milestones/v1.6-MILESTONE-AUDIT.md`** — HARNESS-06 Path-A template; full 344-line depth (Executive Summary + Auditor-Independence Verification + Methodology Highlights + Per-Phase Verification Table + Per-Requirement Closure + Command Verification Table + Sign-off).
- **`.planning/milestones/v1.7-DEFERRED-CLEANUP.md`** — Already-authored stub (Phase 68 close + Phase 69 extension); HARNESS-06 Plan 70-05 finalizes by adding v1.6 carry-overs + final dispositions for any Phase 70-discovered items.

### Established Patterns

- **Atomic harness commit pattern (Phase 66-02 `3a9a671` precedent)** — milestone-audit.mjs + audit-allowlist.json + regenerate-supervision-pins.mjs BASELINE bump = 3 files in ONE SHA. Phase 70 Atom 1 (Wave 2 Plan 70-02 commit) honors literal 3-file scope per D-02.
- **Atomic chain-topology commit pattern (Phase 66-02 + Phase 68 `7b635ca` precedent)** — multi-validator-file changes that affect chain-validator topology MUST land in ONE SHA. Phase 70 Atom 2 (Wave 3 Plan 70-03 commit) = 4 validators + workflow YAML EXTEND per D-02.
- **D-03 LOCKED fresh-clone mechanism (Phase 66-04 `489edca` precedent)** — fresh `gsd-executor` sub-agent + fresh `git clone --no-hardlinks` into `$env:TEMP\<milestone>-audit-<rand>` for terminal re-audit auditor-independence. Phase 70 HARNESS-05 Axis 1 inherits verbatim per D-03.
- **CILINUX-01 cross-OS axis (Phase 69 precedent)** — `workflow_dispatch` on master HEAD + ubuntu-latest job log capture as new auditor-independence axis. Phase 70 HARNESS-05 Axis 2 operationalizes per D-03.
- **Per-assertion-class freshness routing (Phase 68 Plan 68-03 Task 1 + Phase 69 Fix-2 precedent)** — frozen-aware helpers (`readRequirementsAtV15Close` / `readRoadmapAtV15Close`) for planning-doc reads + HEAD-coupled for live invariants. Phase 70 HARNESS-03 mirrors per D-01.
- **V-NN-SELF guard (check-phase-65.mjs:151 precedent)** — `CHAIN_PHASES` Set excludes own phase to prevent self-recursion. Phase 70 check-phase-67..70.mjs each apply per D-01.
- **Predecessor-byte-unchanged invariant** — v1.4/v1.5/v1.6 workflow YAML files are FROZEN; Phase 70 adds NO modifications. Verified via `git diff` at Wave 5 close-gate.
- **Append-only contract on hub files** — Phase 70 makes ZERO hub edits (cleanup + tooling milestone, not content); STATE.md:130 invariant honored automatically.
- **Two-commit chicken-and-egg resolution (Plan 70-05)** — `{phase_70_close_SHA}` placeholder fill via Commit A + close-gate via Commit B per D-04 Claude's Discretion recommendation (cleaner than literal placeholder per Plan 69-02 Option (a)).
- **Sequential-on-main-tree execution** — `.planning/config.json:7 use_worktrees:false` durable per memory `project_execphase_sequential.md`; Phase 70 inherits — Wave 1..5 execute strictly sequentially with `depends_on: [70-(N-1)]` chaining.
- **Wave 1..5 plan frontmatter (Phase 66 precedent)** — `wave: N` + `depends_on: [70-(N-1)]` YAML keys; Phase 70 mirrors verbatim per D-04.

### Integration Points

- **HARNESS-04 forward-coordination from Phase 69 (CRITICAL — locked at Phase 69 close):**
  1. EXTEND existing `audit-harness-v1.7-integrity.yml` (do NOT recreate the file — Phase 69 already authored it)
  2. PRESERVE `fetch-depth: 0` on `linux-chain-ubuntu-latest` checkout step (FETCH-DEPTH-01 inheritance from Phase 69 Fix-1 `85521bb`)
  3. REMOVE `docs/decision-trees/09-linux-triage.md` from `on.pull_request.paths` (Phase-69-SC#5-evidence-only entry per Phase 69 D-04 sub-decision (a))
  4. Path-filter rewrite to v1.7-scoped surface (replace transitional with `scripts/validation/v1.7-*` + any v1.7 docs surface + workflow self-reference)
  5. Add 2 crons (weekly bitrot `0 8 * * 1` + quarterly rotting-external `0 8 1 1,4,7,10 *`)
  6. Repoint `parse` job → `scripts/validation/v1.7-audit-allowlist.json`
  7. Repoint `path-match` job → verifies `scripts/validation/v1.7-milestone-audit.mjs` references its sidecar
  8. Repoint `harness-run` job → `node scripts/validation/v1.7-milestone-audit.mjs --verbose`
  9. Extend chain-apex job's skip-if-missing stubs to active `node scripts/validation/check-phase-NN.mjs` invocations for phases 67-70 (drop for-loop)
  10. Add `pin-helper-advisory` job bound to v1.7 sidecar (retains `continue-on-error: true` per D-A9)
  11. Add `rotting-external-quarterly` job (Path-A from v1.6 workflow lines 156-188)

- **HARNESS-FORWARD-01 carry-forward closure (Wave 1):**
  - 70-CONVENTIONS.md documents the per-V-NN-NN freshness routing matrix per D-01
  - Plan 70-05 close-gate updates v1.7-DEFERRED-CLEANUP.md HARNESS-FORWARD-01 entry status: applied-to-check-phase-67..70.mjs; retrospective audit of check-phase-{48..66}.mjs REMAINS deferred to v1.8+
  - SCOPE-GAP-61 entry remains CLOSED (Phase 69 closure)
  - CHAIN-WRAPPER-01 entry status: still DEFERRED to v1.8+ (Phase 70 does NOT fix the chain-apex wrapper stderr-only capture; out-of-scope per D-03 ARCHIVE-01 ruling logic — same skill-boundary discipline)

- **ARCHIVE-01 / cdcce23 recurrence handoff to `/gsd-complete-milestone`:**
  - HARNESS-06 Plan 70-05 closes Phase 70 — but does NOT invoke milestone archival
  - Post-Phase-70 close: user invokes `/gsd-complete-milestone v1.7` (separate skill)
  - That skill's post-archival step MUST run `git diff HEAD~1 HEAD -- .planning/MILESTONES.md` to detect cdcce23-class recurrence
  - If recurrence detected: file follow-up issue with archive-script root-cause analysis; DO NOT mask via deletion (per ARCHIVE-01 entry explicit guidance)
  - Phase 70 hand-off documented in HARNESS-06 v1.7-MILESTONE-AUDIT.md Sign-off section under "Post-close hand-off to /gsd-complete-milestone"

- **3-axis auditor-independence stacking at HARNESS-05 (D-03):**
  - Axis 1 = fresh-clone D-03 + fresh sub-agent D-22 (local Windows)
  - Axis 2 = cross-OS Linux GHA `workflow_dispatch` post-Wave-3-commit
  - Both axes evidence captured in `70-04-AUDIT-RESULTS.md` (Section B.1 local + Section B.2 GHA Linux)
  - v1.7-MILESTONE-AUDIT.md Auditor-Independence Verification section embeds both run summaries with cross-references

- **Plan 70-05 chicken-and-egg two-commit resolution (D-04 Claude's Discretion):**
  - **Commit A:** Substitute `{phase_70_close_SHA}` placeholders in `check-phase-67/68/69/70.mjs` frozen-aware refs with the actual SHA of Atom 2 commit (Wave 3 Plan 70-03) — this is the milestone-close anchor SHA for v1.7-frozen-aware reads
  - **Commit B:** Close-gate — v1.7-MILESTONE-AUDIT.md NEW + v1.7-DEFERRED-CLEANUP.md FINALIZE + traceability closure across 4 docs (PROJECT.md + ROADMAP.md + STATE.md + REQUIREMENTS.md) + `70-VERIFICATION.md` NEW close-gate report
  - Recovery: `git log --all --grep="70-05"` finds both commits

</code_context>

<specifics>
## Specific Ideas

- **Atom 1 (Wave 2) commit message pattern** — `feat(70-02): ATOMIC v1.7 harness lineage bump (HARNESS-01/02 + BASELINE_11)` mirroring v1.6 Phase 66-02 commit message style
- **Atom 2 (Wave 3) commit message pattern** — `feat(70-03): ATOMIC v1.7 validator+CI surface (HARNESS-03 check-phase-67..70 + HARNESS-04 workflow EXTEND)`
- **Plan 70-04 `$env:TEMP\v1.7-audit-<rand>` random-suffix pattern** — Use PowerShell `[System.IO.Path]::GetRandomFileName()` or `New-Guid` for the `<rand>` suffix per Phase 66-04 mechanism; document the actual chosen suffix in `70-04-AUDIT-RESULTS.md` for reproducibility
- **Plan 70-04 cleanup `Remove-Item -Recurse -Force`** — execute via fresh gsd-executor sub-agent context (not main session) to preserve auditor-independence at cleanup site too
- **Plan 70-04 Axis 2 GHA invocation** — `gh workflow run audit-harness-v1.7-integrity.yml --ref master` from main session after Atom 2 lands; capture run URL via `gh run list --workflow=audit-harness-v1.7-integrity.yml --limit=1 --json url,status,conclusion`
- **BASELINE_11 freshness comment format** — Mirror BASELINE_10 comment exactly: `// BASELINE_11: v1.7 close 2026-MM-DD (closes BASELINE_10 from v1.6 close 2026-05-25)` per `regenerate-supervision-pins.mjs` BASELINE_N comment-block convention
- **`70-CONVENTIONS.md` per-V-NN-NN freshness routing matrix** — 4 phases × ~4-10 assertions = ~16-40 rows; columns: V-NN-NN identifier / Assertion class / Freshness routing (HEAD or `[v1.7-frozen @ {phase_70_close_SHA}]`) / Mechanism (helper function name or direct read) / Rationale (1-line)
- **`v1.7-MILESTONE-AUDIT.md` NEW section "Discoveries Surfaced During Execution"** — 5 entries: FETCH-DEPTH-01 CLOSED + SCOPE-GAP-61 CLOSED + D-04-OVERSPEC-01 ACKNOWLEDGED + CHAIN-WRAPPER-01 DEFERRED + ARCHIVE-01 root-cause DEFERRED; each entry: identifier + 1-line summary + closure status + cross-link to phase VERIFICATION.md §E + cross-link to v1.7-DEFERRED-CLEANUP.md entry
- **Plan-folder naming** — `.planning/phases/70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo/` (existing init-resolved slug; do not rename)
- **V-NN-NN numbering convention** — Per Path-A from check-phase-66.mjs: V-67-01..V-67-NN / V-68-01..V-68-NN / V-69-01..V-69-NN / V-70-01..V-70-NN; SELF-guard NOT a V-NN-NN assertion but a CHAIN_PHASES Set composition rule
- **`workflow_dispatch` evidence-capture cadence** — Run ONCE at Wave-4 start (after Atom 2 lands); chain-apex result + ubuntu-latest job log + `::notice title=CHAIN_TIMING_LINUX::` emission captured. Re-run NOT required unless Plan 70-05 Commit A reveals chain-apex regression (defensive only)

</specifics>

<deferred>
## Deferred Ideas

- **ARCHIVE-01 cdcce23 archive-script root-cause investigation** — Routed to v1.8+ per `v1.7-DEFERRED-CLEANUP.md:14-25` + D-03 ruling. Plan 70-05 HARNESS-06 v1.7-MILESTONE-AUDIT.md Sign-off section documents the post-close hand-off to `/gsd-complete-milestone` skill (which runs `git diff HEAD~1 HEAD -- .planning/MILESTONES.md` post-archival to detect recurrence).
- **CHAIN-WRAPPER-01 chain-apex wrapper stderr-only capture fix** — `scripts/validation/check-phase-66.mjs:313` fix deferred to v1.8+ per `v1.7-DEFERRED-CLEANUP.md:144-178` + D-03 scope discipline. CHAIN-WRAPPER-01 entry status remains DEFERRED.
- **Retrospective audit of HEAD-coupled assertions across `check-phase-{48..66}.mjs`** — Per HARNESS-FORWARD-01 + SCOPE-GAP-61 retrospective recommendation; explicit v1.8+ scope per `v1.7-DEFERRED-CLEANUP.md:42-52` + `:94-115`. D-01 Option D REJECTED to preserve this v1.8+ boundary. Plan 70-05 close-gate updates HARNESS-FORWARD-01 status: applied-to-check-phase-67..70.mjs; retrospective audit REMAINS deferred to v1.8+.
- **CI-3 Managed Apple ID → Managed Apple Account corpus-wide rename (45 occurrences / 16 files)** — Routed forward in v1.7-DEFERRED-CLEANUP.md per REQUIREMENTS.md:48 + STATE.md:110. Trigger condition: Microsoft Intune adopts the rebrand portal-side. Sweeping prematurely creates term-mismatch with admin's portal experience.
- **3 additional VPP-location-token sites in `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` (lines 115, 149, 155)** — Discovered during Phase 67 SWEEP-02 execution; out of Phase 67 calibrated 6-occurrence scope per REQUIREMENTS.md:14 + 67-CONTEXT.md. Defer to v1.8+ Pillar A-equivalent sweep. v1.7-MILESTONE-AUDIT.md "Discoveries Surfaced During Execution" section documents disposition.
- **Multi-tenant Apple Business surfaces** — v1.6 Q2 explicit scope-out per REQUIREMENTS.md:49; v1.7 inherits. Deferred indefinitely unless multi-org-account scenarios surface.
- **Apple Business Device API documentation** — Apple has not yet published developer.apple.com landing; acknowledge-but-do-not-document-deeply per REQUIREMENTS.md:50. Sweep when Apple publishes.
- **Per-OU Conference Room Display deep-dive** — Apple deployment guides thin on per-OU partitioning per REQUIREMENTS.md:51; tracker only — no acute customer demand.
- **Account Holder lockout dedicated recovery runbook** — Currently handled as 7-leaf branch in L2 #26 decision tree per Phase 65 D-02 hybrid; promote to standalone runbook IF customer support escalations surface per REQUIREMENTS.md:52.
- **Apple School Manager (ASM) education-specific surfaces** — Outside enterprise scope per REQUIREMENTS.md:53; defer to v1.8+ only if education-tenant scope opens.
- **BASELINE_12 freshness refresh** — v1.8+ next milestone close (BASELINE_11 closes BASELINE_10 at Phase 70; v1.8 milestone close refreshes BASELINE_12).
- **`v1.7-audit-allowlist.json` `c13_rotting_external` quarterly cron first-fire 2026-07-01** — If Phase 70 execution completes BEFORE 2026-07-01 (likely — current date 2026-05-28), the v1.7 quarterly cron first-fires under the v1.7 workflow file (no manual verification at Phase 70 close; cron job artifact captured at first natural fire). v1.7-MILESTONE-AUDIT.md notes this forward-coordination.
- **v1.7-specific "Discoveries Surfaced During Execution" section in v1.7-MILESTONE-AUDIT.md as template feature for v1.8+** — Plan 70-05 author's Claude's Discretion per D-04. v1.8+ milestone-audit-doc Path-A authors MAY adopt this section IF their phases also surface architectural discoveries; treat as v1.7 innovation, not mandatory template inheritance.

</deferred>

---

*Phase: 70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo*
*Context gathered: 2026-05-28*
