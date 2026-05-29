# Phase 69: CI-Linux Hardening (Pillar C — Cross-OS Verification) - Context

**Gathered:** 2026-05-26
**Status:** Ready for planning

<domain>
## Phase Boundary

The **Pillar C cross-OS verification** phase of v1.7. Adds an `ubuntu-latest` GitHub Actions runner job that executes the validator chain `check-phase-{48..70}.mjs` + `v1.6-milestone-audit.mjs` on Linux LF line endings — proving the Phase 68 CRLF regex fixes (CHAIN-01 readFile centralization) hold on Linux AND catching CRLF-style regressions in CI before they hit local Windows development. PR-blocking. Coexists with v1.4/v1.5/v1.6 workflow files (zero modifications to predecessors per REQUIREMENTS.md:26 + ROADMAP SC#4 + the "v1.5 frozen the moment v1.6 shipped" lineage convention).

**Deliverables (exactly):**

- **CILINUX-01** — New file `.github/workflows/audit-harness-v1.7-integrity.yml` shipped as a Phase-69-scoped SKELETON containing ONLY:
  - `name: Audit Harness v1.7 Integrity`
  - `on.pull_request.paths:` transitional surface — `['scripts/validation/check-phase-*.mjs', '.github/workflows/audit-harness-v1.7-integrity.yml', '.planning/REQUIREMENTS.md']` (Phase 70 HARNESS-04(a) rewrites this to v1.7-scoped paths once `v1.7-audit-allowlist.json` + v1.7 corpus surface exist)
  - `on.workflow_dispatch: {}` (required for D-04 SC#5 baseline trigger)
  - `on.schedule:` **OMITTED in Phase 69** — both crons (weekly bitrot + quarterly rotting-external) are Phase 70 HARNESS-04(b) deliverables; firing them in Phase 69 would target a non-existent `v1.7-audit-allowlist.json`
  - 4 jobs per D-03 Option C hybrid topology: `parse` (validates `v1.6-audit-allowlist.json` until v1.7 sidecar lands at HARNESS-02) + `path-match` (verifies `v1.6-milestone-audit.mjs` references its sidecar) + `harness-run` (runs `v1.6-milestone-audit.mjs` per REQUIREMENTS.md:26 "+ v1.x-milestone-audit.mjs") + `linux-chain-ubuntu-latest` (single chain-apex job invoking `check-phase-66.mjs` recursively)
  - **`linux-chain-ubuntu-latest` job MUST:**
    - Set `git config --global core.autocrlf false` BEFORE `actions/checkout@v4` (LF-fidelity contract — without this, `.gitattributes` interactions can mix endings on GHA Linux runners, defeating the CRLF-regression-catch purpose)
    - `runs-on: ubuntu-latest`; `continue-on-error: false` per D-A9 inheritance; `timeout-minutes: 30` (safety budget over 300s × 19 phases worst-case per Phase 68 TIMEOUT-01)
    - `actions/setup-node@v4` with `node-version: '20'` (matches v1.5/v1.6 idiom)
    - Use the canonical `if [ -f scripts/validation/check-phase-NN.mjs ]; then node ...; else echo "skip per Phase 42 D-31"; fi` skip-if-missing pattern for phases 67-70 (per D-02 Option B — Phase 70 HARNESS-03 lands the validators, which auto-activate then)
    - Wrap the chain-apex invocation with wall-clock measurement: `START=$(date +%s); node scripts/validation/check-phase-66.mjs --verbose; END=$(date +%s); echo "::notice title=CHAIN_TIMING_LINUX::Full chain wall-clock: $((END-START))s (Windows reference: ~102s; subprocess timeout: 300s)"` — answers Phase 68 TIMEOUT-01 Discovery #2 open question on ubuntu-latest runner speed vs 300s subprocess budget
  - `pin-helper-advisory` job **NOT forward-copied** in Phase 69 (it's v1.6-sidecar-coupled; Phase 70 HARNESS-04(d) carries it forward bound to v1.7 sidecar)

- **69-VERIFICATION.md** (Plan 69-NN close-gate) — Mirrors 68-VERIFICATION.md section shape (A goal narrative + B commands+evidence with 4 subsections per D-04 Option D: B.1 workflow_dispatch GHA run URL + B.2 synthetic-PR negative case GHA URL + B.3 synthetic-PR positive case GHA URL + B.4 Windows-local exit-0 spot-check + per-validator PASS-count diff table Windows-vs-Linux + C SC#1-5 satisfaction mapping + D atomic commit SHA record + E discoveries + F forward-pointer to Phase 70 + G sign-off)

- **D-04 SC#5 verification evidence** — Two-tier proof (Option D):
  1. **`workflow_dispatch` baseline on master HEAD** post-workflow-file commit — captures GHA run URL + ubuntu-latest job log tail showing PASS counts + Linux wall-clock timing (answers TIMEOUT-01)
  2. **Synthetic CRLF-injection PR** — branch + commit that uses `unix2dos` to flip line endings on `docs/decision-trees/09-linux-triage.md` (a Phase 68 CHAIN-01 hardened surface — already exists in v1.6 path-filter coverage; CRLF injection MUST pass JSON/YAML linters); verifies Linux CI exits 1 with the regression caught by check-phase-51 (the CHAIN-01-hardened validator that reads this doc); revert commit verifies Linux CI exits 0 post-revert; PR closed-without-merge → zero master tree churn; only the workflow file commit on master is a Phase 69 deliverable artifact
  3. **Synthetic PR target file must be in the Phase 69 workflow's path-filter** — `docs/decision-trees/09-linux-triage.md` is NOT in the Phase 69 transitional path-filter (`scripts/validation/check-phase-*.mjs` + workflow self-ref + REQUIREMENTS.md). Two resolution paths: (a) add `docs/decision-trees/09-linux-triage.md` to Phase 69 path-filter as a SC#5-evidence-only surface (then Phase 70 HARNESS-04(a) rewrites it out); or (b) inject CRLF into a file already in the transitional path-filter, e.g., a check-phase-*.mjs comment block (lower realism but no path-filter expansion needed). **Planner decides at Plan 69-NN authoring.**

- **Traceability** — PROJECT.md CILINUX-01 Active→Validated flip with closing commit SHA at Phase 69 close; REQUIREMENTS.md:84 Pending→Complete; STATE.md frontmatter + Performance Metrics + Pending Todos updated; ROADMAP.md Phase 69 row Pending→Complete

**Out of scope (Phase 69 owns nothing else):**
- v1.7 audit-harness lineage bump itself (Phase 70 Pillar D — HARNESS-01..06)
- Per-phase validators `check-phase-67..70.mjs` (Phase 70 HARNESS-03 — Phase 69 only adds them as skip-if-missing stubs in the workflow YAML)
- `v1.7-audit-allowlist.json` sidecar creation (Phase 70 HARNESS-02)
- `v1.7-milestone-audit.mjs` Path-A copy (Phase 70 HARNESS-01)
- Both crons (weekly bitrot + quarterly rotting-external) — Phase 70 HARNESS-04(b)
- `pin-helper-advisory` job migration to v1.7 sidecar — Phase 70 HARNESS-04(d)
- Modifications to existing workflow files (`audit-harness-integrity.yml` v1.4 / `audit-harness-v1.5-integrity.yml` / `audit-harness-v1.6-integrity.yml`) per REQUIREMENTS.md:26 + ROADMAP SC#4 ("predecessor byte-unchanged" invariant)
- Any corpus (`docs/*`) edits — Phase 67 already cleaned the surgical surface; Phase 69 only adds a NEW workflow file + (if D-04 sub-decision (a) chosen) one path-filter entry
- Any worktree-based execution (`use_worktrees:false` durable per `.planning/config.json:7` + memory `project_execphase_sequential.md`)
- Any new C-checks beyond v1.6 inheritance — v1.7 inherits C1-C16 from v1.6 per REQUIREMENTS.md Out-of-Scope table
- Investigation of `cdcce23` archive-script defect itself (deferred to v1.8+ per v1.7-DEFERRED-CLEANUP.md ARCHIVE-01)

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via parallel `/adversarial-review`-style scoring (Finder argues FOR each option, Adversary argues AGAINST, Referee picks winner) dispatched as 4 parallel `gsd-advisor-researcher` agents in adversarial-review mode (per user memory `feedback_adversarial_review_preference`). Each agent read the relevant ROADMAP/REQUIREMENTS/STATE sections + 68-CONTEXT.md + the v1.5/v1.6 workflow source files directly. Scores in parentheses (lower = better, matching the v1.6/v1.7 convention inherited from 68-CONTEXT.md). All four recommendations user-approved without revision via single `Approve all 4` selection.

### D-01: Staging strategy — Option B (new `audit-harness-v1.7-integrity.yml` skeleton; Phase 70 HARNESS-04 extends) (score **B=7** / A=14 / C=18)

**Decision:** Phase 69 authors a new file `.github/workflows/audit-harness-v1.7-integrity.yml` containing ONLY the Phase 69-scoped skeleton (4 jobs + transitional path-filter + workflow_dispatch; no crons; no pin-helper-advisory). v1.6 workflow remains BYTE-UNCHANGED. Phase 70 HARNESS-04 Path-A copies the v1.6 jobs INTO this existing file (rewriting path-filter to v1.7-scoped surface + adding both crons + adding pin-helper-advisory bound to v1.7 sidecar + extending chain to actively run check-phase-67..70.mjs as those validators land via HARNESS-03).

**Concrete file boundary (download-and-execute by planner/executor; do NOT renegotiate at plan-phase):**

| Phase 69 deliverable | Phase 70 HARNESS-04 deliverable |
|---|---|
| `name: Audit Harness v1.7 Integrity` | (unchanged) |
| `on.pull_request.paths:` transitional surface (`scripts/validation/check-phase-*.mjs` + workflow self-ref + `.planning/REQUIREMENTS.md` + optionally one D-04-SC#5-evidence file per D-04 sub-decision (a)) | Rewrite to v1.7-scoped: `scripts/validation/v1.7-*` + any v1.7 docs surface |
| `on.workflow_dispatch: {}` | (unchanged) |
| `on.schedule:` OMITTED | Add 2 crons: weekly bitrot `0 8 * * 1` + quarterly rotting-external `0 8 1 1,4,7,10 *` |
| `parse` job (validates v1.6 sidecar JSON until v1.7 sidecar lands) | Repoint to `v1.7-audit-allowlist.json` |
| `path-match` job (verifies v1.6-milestone-audit references its sidecar) | Repoint to v1.7 lineage |
| `harness-run` job (runs `v1.6-milestone-audit.mjs`) | Repoint to `v1.7-milestone-audit.mjs` |
| `linux-chain-ubuntu-latest` job (chain-apex `check-phase-66.mjs`) | Extend to include check-phase-67..70.mjs as actively-running (drop skip-if-missing stubs) |
| (no pin-helper-advisory) | Add pin-helper-advisory bound to v1.7 sidecar |

**Rationale:**

- **REQUIREMENTS.md:36 literal compliance:** HARNESS-04 already locks the destination — "Composes with CILINUX-01: the v1.7 workflow includes the new ubuntu-latest runner job." Option A (stage in v1.6) puts the job in the wrong file and forces Phase 70 to either migrate (creating churn) or leave it orphaned in v1.6.
- **Predecessor-unchanged invariant honored:** ROADMAP.md:347 "zero modifications to predecessors"; ROADMAP.md:355 SC#4 "byte-unchanged"; REQUIREMENTS.md:26 "no modifications to older workflow files." Option B is the ONLY option that satisfies all three letters simultaneously.
- **Auditor-independent phase split:** Phase 69 owns the cross-OS axis (new file with linux-chain job); Phase 70 owns the lineage bump (file extension). Each phase has a clean, separately-revertible commit boundary.
- **Phase 68 atomic-commit precedent supports skeleton-then-fill:** `3a9a671` (v1.6 atomic harness commit) shipped a coherent partial state finalized later; `7b635ca` (Phase 68 CHAIN_SKIP atomic) used the same "ship correctness now, fill SHA placeholders later" pattern. The v1.7 workflow file is the same shape — coherent skeleton in Phase 69, fully populated at Phase 70.

**Subtle gotchas captured for plan-phase:**

- `git config --global core.autocrlf false` MUST be set in the workflow BEFORE `actions/checkout@v4`. Without this, `.gitattributes` interactions on the GHA Linux runner can mix line endings, defeating the LF-fidelity contract.
- The transitional path-filter does NOT include v1.6 docs surface — v1.6 doc-only PRs will not fire the Linux job between Phase 69 close and Phase 70 close. This is acceptable per scope split; the workflow_dispatch trigger + Phase 69 SC#5 synthetic-PR evidence provide the cross-OS verification at Phase 69 close.
- Crons deliberately omitted — adding the weekly cron pre-v1.7-allowlist would fire a job whose `parse` step references `v1.6-audit-allowlist.json` (transitional), not v1.7. Leave bitrot-checking to Phase 70 HARNESS-04(b).
- `pin-helper-advisory` deliberately omitted in Phase 69 — it reads `scripts/validation/v1.6-audit-allowlist.json` via the regenerate-supervision-pins helper (which Phase 68 CHAIN-02 already repointed). Carrying it forward to v1.7 sidecar belongs in HARNESS-04(d) atomic with v1.7 sidecar creation.

### D-02: Chain scope on Linux — Option B (`check-phase-{48..70}.mjs` with skip-if-missing pattern; strict upper bound at 70) (score **B=1** / A=3 / C=5)

**Decision:** The `linux-chain-ubuntu-latest` job (after harness-run completes) invokes the chain via the chain-apex `check-phase-66.mjs` (per D-03), then ALSO emits skip-if-missing stubs for phases 67-70 using the canonical v1.5/v1.6 idiom:

```yaml
- name: check-phase-67..70 skip-if-missing stubs
  run: |
    for i in 67 68 69 70; do
      if [ -f scripts/validation/check-phase-$i.mjs ]; then
        node scripts/validation/check-phase-$i.mjs
      else
        echo "check-phase-$i.mjs not present -- skipping (graceful degradation per Phase 42 D-31)"
      fi
    done
```

Phase 70 HARNESS-03 lands check-phase-67..70.mjs, which auto-activate from skip-echo to active node invocation. Phase 70 HARNESS-04 then trims the skip-if-missing stubs to direct `node` invocations (drift cleanup).

**Concrete bound:** Strict `{48..70}`. Do NOT future-proof beyond 70 (v1.8+ is explicitly deferred per REQUIREMENTS.md:42; v1.5 stopped at 61, v1.6 stopped at 66 — same discipline applies).

**Rationale:**

- **REQUIREMENTS.md is binding contract; ROADMAP is planning artifact.** When they diverge, REQUIREMENTS wins. REQUIREMENTS.md:26 says `check-phase-{48..70}.mjs + v1.x-milestone-audit.mjs`; ROADMAP SC#1 says `{48..66}` (which is "current chain as of Phase 68 close"). The workflow file is forward-compatible scaffolding.
- **Canonical idiom precedent:** 24+ prior `if [ -f ...]; then ...; else echo "skip per Phase 42 D-31"; fi` stanzas exist across `audit-harness-v1.5-integrity.yml` (14 stanzas for phases 48-61) and `audit-harness-v1.6-integrity.yml` (5 stanzas for phases 62-66). This is the project's already-converged canonical answer to "validator topology spans phase boundaries." Option A would be a regression.
- **SC#3 ("NO CHAIN_SKIP entries reported") is satisfied:** SC#3 refers to the in-validator `CHAIN_SKIP` Set (now empty post-Phase-68 `7b635ca`), NOT workflow job-step skip-echoes. The 4 skip-if-missing stubs print "skip" and exit 0 — they do not contribute to the validator-level CHAIN_SKIP topology.
- **Phase 70 HARNESS-04 becomes pure copy-then-trim work** — drop skip-if-missing stubs as validators land. No new authoring.

### D-03: Job topology — Option C (hybrid: parse + path-match + harness-run + chain-apex job) (score **C=1** / B=2 / D=3 / A=4)

**Decision:** 4 jobs in the v1.7 workflow file (Phase 69 skeleton):

1. **`parse`** — validates `scripts/validation/v1.6-audit-allowlist.json` (transitional — Phase 70 HARNESS-02 + HARNESS-04 repoints to v1.7 sidecar)
2. **`path-match`** — verifies `scripts/validation/v1.6-milestone-audit.mjs` references its sidecar (transitional — Phase 70 repoints to v1.7 lineage)
3. **`harness-run`** — runs `node scripts/validation/v1.6-milestone-audit.mjs --verbose` per REQUIREMENTS.md:26 "+ v1.x-milestone-audit.mjs" (transitional — Phase 70 repoints to v1.7-milestone-audit.mjs)
4. **`linux-chain-ubuntu-latest`** — `needs: harness-run`; single ubuntu-latest job invoking `node scripts/validation/check-phase-66.mjs --verbose` (chain-apex; recursively spawns check-phase-{48..65} via execFileSync internally per Phase 68 post-CHAIN-03 design) + skip-if-missing stubs for phases 67-70 (per D-02 Option B); wraps invocation with wall-clock measurement emitting `::notice title=CHAIN_TIMING_LINUX::Full chain wall-clock: ${N}s (Windows reference: ~102s; subprocess timeout: 300s)`

**Rationale:**

- **Post-Phase-68 CHAIN-03, `check-phase-66.mjs` IS the chain apex** — it spawns `check-phase-{48..65}` via `execFileSync` with `timeout: 300000` internally. Option A's 19 parallel sister jobs would be 18-redundant compute (each sister job re-spawns the chain partially); each sister job also re-runs setup-node and checkout, multiplying GHA runner-minute cost.
- **v1.5/v1.6 per-validator topology pre-dates CHAIN-03.** Those workflows were authored when each validator was independent (no recursive spawn). Post-CHAIN-03, mirroring that topology is structurally dishonest — it pretends Phase 69 is another milestone audit (v1.6's job, frozen). Phase 69's stated purpose is **cross-OS LF verification**, not lineage audit.
- **Option C composes the v1.6-pattern harness-run + parse + path-match (idiom-preserving for the harness slice) with a SINGLE chain-apex job (post-CHAIN-03-aware for the chain slice).** This is the structurally honest design.
- **Timing instrumentation answers TIMEOUT-01 Discovery #2:** Phase 68 measured check-phase-65 standalone at ~102s on Windows with 300s subprocess timeout (3× headroom). Linux first-run timing is unknown. The `::notice` emission becomes the forward-coordination data point for Phase 70 HARNESS-04 — if Linux wall-clock exceeds ~150s (50% of 300s budget), v1.7-DEFERRED-CLEANUP.md TIMEOUT-01 flag escalates to a v1.8+ subprocess-timeout-architecture review.
- **`timeout-minutes: 30`** on the `linux-chain-ubuntu-latest` job — safety budget over 300s × 19 phases worst-case (= 5700s = 95min), but realistically check-phase-66 recursive run on Windows takes ~102s, so Linux even at 2× would be ~204s; 30min job-level timeout is 9× empirical headroom.

### D-04: SC#5 verification proof — Option D (synthetic CRLF-injection PR + workflow_dispatch baseline) (score **D=1** / A=2 / C=3 / B=4)

**Decision:** Two-tier evidence capture for SC#5 close-gate:

1. **`workflow_dispatch` baseline on master HEAD** — fire the new workflow manually post-commit; capture GHA run URL + ubuntu-latest job log tail showing per-validator PASS counts + total runtime. This is the cross-OS baseline (Windows local run vs Linux GHA run, both on master HEAD; same SHA, two operating systems). Answers Phase 68 TIMEOUT-01 Discovery #2.
2. **Synthetic CRLF-injection PR (negative + positive on one PR)** — author a throwaway branch + PR that:
   - **Negative case:** uses `unix2dos` to flip line endings on a single .md file currently in the Phase 69 workflow's path-filter (target file decided at plan-phase per D-04 sub-decision (a)-vs-(b) below); verifies Linux CI exits **1** with the regression caught by check-phase-51 (the CHAIN-01-hardened validator that reads `docs/decision-trees/09-linux-triage.md`) OR check-phase-58 (the other CHAIN-01-hardened validator that reads `docs/reference/4-platform-capability-comparison.md`)
   - **Positive case:** revert commit on the same branch verifies Linux CI exits **0** post-revert
   - **PR closed-without-merge** → zero master tree churn; only the workflow file commit on master is a Phase 69 deliverable artifact
   - **Branch deleted post-evidence** so it doesn't contaminate the v1.7 reflog (branch deletion is harmless; PR closure preserves GHA run URLs as permanent evidence)

**D-04 sub-decision deferred to plan-phase:** The synthetic PR target file must be in the Phase 69 workflow's path-filter for the PR push to trigger the new linux-chain job. Two paths:

- **(a) Add `docs/decision-trees/09-linux-triage.md` to Phase 69 path-filter as a SC#5-evidence-only surface** — Phase 70 HARNESS-04(a) rewrites path-filter out as part of v1.7-scoping. Pro: realistic CRLF injection target (Phase 68 CHAIN-01 hardened surface — testing the actual fix). Con: temporary path-filter entry in Phase 69 workflow file that Phase 70 must remove.
- **(b) Inject CRLF into a file already in transitional path-filter** — e.g., add CRLF to a comment block in `scripts/validation/check-phase-51.mjs` (the path-filter ALREADY includes `scripts/validation/check-phase-*.mjs`). Pro: no path-filter expansion needed. Con: lower realism (validator source file, not corpus); risk of CRLF injection in validator JavaScript breaking the validator itself BEFORE the chain validation surfaces the regression in the doc.

**Plan-phase resolution:** Plan author should pick (a) for evidence-quality + realism, ground-truthed against Phase 70 HARNESS-04(a) path-filter rewrite contract. If (a) chosen, Phase 70 HARNESS-04 planner gets explicit handoff: "remove `docs/decision-trees/09-linux-triage.md` from path-filter; replaced by v1.7-scoped paths."

**Rationale:**

- **SC#5 literal wording allows "synthetic or real"** (ROADMAP.md:356 explicit). Option B (wait for real PR) is async-blocking — STATE.md shows zero PRs since Phase 67 close; v1.7 is tooling milestone with no expected corpus PRs.
- **Option C alone (workflow_dispatch) fails SC#5 letter "on a representative PR"** — workflow_dispatch bypasses path-filter trigger, which is the very mechanism PR-blocking exists for.
- **Option D adds workflow_dispatch as a baseline self-proof for free** — and the timing data from workflow_dispatch on master HEAD answers Phase 68 TIMEOUT-01 Discovery #2 (ubuntu-latest runner speed vs 300s subprocess budget).
- **Throwaway-commit hygiene preserved** by closing synthetic PR unmerged + deleting the branch.

**69-VERIFICATION.md evidence shape (mirror 68-VERIFICATION.md):**

| Section | Content |
|---|---|
| A — Goal achievement narrative | Cross-OS reproducibility verified on master HEAD + on synthetic CRLF regression+revert |
| B.1 — workflow_dispatch baseline | GHA run URL + per-validator PASS counts + total runtime (the TIMEOUT-01 data point) |
| B.2 — Synthetic PR negative case | Branch + commit SHA of CRLF injection + GHA run URL showing exit 1 + which validator caught it (check-phase-51 or -58) |
| B.3 — Synthetic PR positive case | Revert commit SHA + GHA run URL showing exit 0 post-revert |
| B.4 — Windows local vs Linux PASS-count diff table | Per-validator (48..66, plus 67-70 skip-echo) Windows-vs-Linux comparison; expect identical PASS counts per SC#5 |
| C — SC#1-5 satisfaction mapping | SC#1 cites B.1; SC#2 cites workflow file YAML (`continue-on-error: false`); SC#3 cites B.1 log showing 0 SKIPPED in CHAIN_SKIP; SC#4 cites `git diff` showing v1.4/v1.5/v1.6 workflow files byte-unchanged; SC#5 cites B.2+B.3+B.4 |
| D — Atomic commit SHA record | Workflow file commit SHA on master; synthetic PR closure URL |
| E — Discoveries | Linux runtime delta vs Windows; timeout headroom margin observed; any path-filter surprises during synthetic PR test |
| F — Forward-pointer to Phase 70 | HARNESS-04 inherits linux-chain job verbatim; HARNESS-03 self-verifier already INTENT-verified per Phase 68 §F |
| G — Sign-off | Phase 69 (Pillar C) CLOSED; CILINUX-01 Active→Validated traceability flipped |

### Claude's Discretion

- **D-04 sub-decision (a) vs (b)** — Plan-phase plan author decides synthetic PR target file based on path-filter trade-off. Recommendation in this CONTEXT: pick (a) for evidence realism; couple with Phase 70 HARNESS-04(a) handoff note.
- **`harness-run` step name + Node version stanza** — copy verbatim from v1.6 workflow lines 65-74 (canonical idiom).
- **Skip-if-missing echo string** — use literal `"check-phase-$i.mjs not present -- skipping (graceful degradation per Phase 42 D-31)"` per v1.5/v1.6 precedent (do not paraphrase the attribution).
- **`::notice` emission format** — recommend `::notice title=CHAIN_TIMING_LINUX::Full chain wall-clock: ${N}s (Windows reference: ~102s; subprocess timeout: 300s)`. If executor prefers GHA step-summary append (`>> $GITHUB_STEP_SUMMARY`), that's equivalent in evidence-capture quality — pick whichever surfaces better in the Actions UI for SC#5 evidence capture.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (gsd-phase-researcher, gsd-planner, gsd-executor) MUST read these before planning or implementing.**

### Phase scope + requirements
- `.planning/REQUIREMENTS.md` §"Pillar C — CI-Linux Hardening" (line 24-26) — CILINUX-01 binding contract: `check-phase-{48..70}.mjs + v1.x-milestone-audit.mjs` on Linux LF; PR-blocking; coexists with v1.4/v1.5/v1.6
- `.planning/REQUIREMENTS.md` §"Pillar D" line 36 — HARNESS-04 destination contract: "Composes with CILINUX-01: the v1.7 workflow includes the new ubuntu-latest runner job"
- `.planning/REQUIREMENTS.md` line 84 — CILINUX-01 traceability row Pending (flips to Complete at Phase 69 close)
- `.planning/ROADMAP.md` line 345-358 — Phase 69 full goal + SC#1-5 + staging-strategy gray-area annotation
- `.planning/ROADMAP.md` line 360-365 — Phase 70 dependency: "CI workflow file must exist for HARNESS-04 to extend with v1.7-specific bits"
- `.planning/STATE.md` line 137-165 — Pending todos (Phase 69 plan authoring; staging strategy gray area; first-run timing measurement to validate 300s headroom)

### Prior phase decisions (locked — do not re-litigate)
- `.planning/phases/68-chain-skip-root-cause-resolution-pillar-b-validator-surgery/68-CONTEXT.md` D-01 (CHAIN-01 readFile centralization — defines the CRLF surface Phase 69 cross-OS-verifies)
- `.planning/phases/68-chain-skip-root-cause-resolution-pillar-b-validator-surgery/68-CONTEXT.md` D-04 (atomic-commit pattern — Phase 69's workflow-file commit is a single non-atomic commit since it's a NEW file, not coordinated cross-file edits)
- `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` TIMEOUT-01 — Phase 68 subprocess timeout 60s→300s discovery; Phase 69 first-run timing measurement is forward-coordination flag pickup
- `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` HARNESS-FORWARD-01 — v1.5-frozen-aware validator pattern; Phase 70 HARNESS-03 carries forward, NOT Phase 69 (Phase 69 ships YAML, not validators)

### Workflow files (Path-A reference + predecessor invariant target)
- `.github/workflows/audit-harness-integrity.yml` — v1.4 (BYTE-UNCHANGED invariant; do not edit)
- `.github/workflows/audit-harness-v1.5-integrity.yml` — canonical pattern source (lines 7-21 path-filter shape; lines 23-29 parse job idiom; lines 43-56 path-match job idiom; lines 58-67 harness-run job idiom; lines 69-291 skip-if-missing stanzas; lines 293-309 pin-helper-advisory idiom) — BYTE-UNCHANGED invariant
- `.github/workflows/audit-harness-v1.6-integrity.yml` — most recent Path-A source (lines 7-28 with 2 crons + rotting-external addition; lines 156-188 rotting-external-quarterly job pattern — Phase 70 HARNESS-04(b) will Path-A this) — BYTE-UNCHANGED invariant

### Validator source (chain-apex target)
- `scripts/validation/check-phase-66.mjs` — chain apex (recursively spawns check-phase-{48..65} via execFileSync with `timeout: 300000` after Phase 68 CHAIN-03); Phase 69's `linux-chain-ubuntu-latest` job invokes this as the single chain-runner
- `scripts/validation/check-phase-51.mjs` line 14-18 + `scripts/validation/check-phase-58.mjs` line 18-22 — CRLF-hardened readFile (Phase 68 CHAIN-01 `36a753d`); the surface Phase 69 cross-OS-verifies
- `scripts/validation/v1.6-milestone-audit.mjs` — `harness-run` job target (transitional; Phase 70 HARNESS-04 repoints to v1.7-milestone-audit.mjs)
- `scripts/validation/v1.6-audit-allowlist.json` — `parse` job target (transitional; Phase 70 repoints)

### Convention + project context
- `.planning/PROJECT.md` §"Current Milestone: v1.7" + §"v1.7 architectural decisions" — sequential-on-main-tree (`use_worktrees:false`), atomic harness commit pattern, CI-Linux as new auditor-independence axis
- `CLAUDE.md` — project structure overview (not load-bearing for Phase 69 since CILINUX-01 is CI workflow YAML, not PowerShell/Python/React code)

### Pattern precedents (Phase 42 D-31 + Phase 43 D-14 + Phase 48 D-22)
- The literal echo string `"check-phase-NN.mjs not present -- skipping (graceful degradation per Phase 42 D-31)"` is the canonical attribution for skip-if-missing stubs across v1.5/v1.6 workflows. Phase 69 reuses verbatim (do not paraphrase the attribution).
- `continue-on-error: true` for `pin-helper-advisory` per Phase 43 D-14 + Phase 48 D-22 — Phase 69 does NOT include this job; Phase 70 HARNESS-04(d) does.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- **v1.5/v1.6 workflow file structure** — Phase 69 skeleton follows the canonical 4-job shape (parse + path-match + harness-run + per-validator-or-chain) verbatim. The new file is a SUBSET of v1.6 workflow (4 jobs vs 9+); Phase 70 extends to full superset.
- **`scripts/validation/check-phase-66.mjs` chain-apex** — single entry point that recursively spawns the full chain via `execFileSync` with 300s subprocess timeout. Phase 69's `linux-chain-ubuntu-latest` job is a single-step invocation of this script.
- **`scripts/validation/v1.6-milestone-audit.mjs` + `v1.6-audit-allowlist.json` sidecar** — transitionally referenced by Phase 69's parse/path-match/harness-run jobs until Phase 70 HARNESS-01/02 ship v1.7 lineage replacements. The repoint at HARNESS-04 is a per-file 1-line edit.
- **`if [ -f scripts/validation/check-phase-NN.mjs ]; then ...; else echo "skip per Phase 42 D-31"; fi` idiom** — 24+ prior occurrences across v1.5/v1.6 workflows; Phase 69 emits 4 new instances (phases 67-70).

### Established Patterns

- **Predecessor-unchanged invariant** — once a milestone ships, its workflow files are FROZEN. Subsequent milestones add new files (v1.5→v1.6 added `audit-harness-v1.6-integrity.yml`; v1.6→v1.7 will add `audit-harness-v1.7-integrity.yml`). Phase 69 respects this verbatim.
- **Path-filter triggers on PR + workflow_dispatch on demand** — every milestone workflow uses this dual-trigger pattern. Phase 69 follows.
- **`needs: harness-run` dependency** — parse → path-match → harness-run → per-validator/chain jobs. Phase 69 follows.
- **Node 20 + setup-node@v4 + checkout@v4** — current pinned versions across all workflows. Phase 69 inherits.
- **Atomic-commit precedent for non-trivial workflow file authoring** — even though Phase 69 is a NEW file (not coordinated cross-file edits), the commit should bundle file creation + any one-line predecessor reference (e.g., a comment in another file pointing to the new file) as a single atomic SHA. Phase 69 does NOT modify predecessors → single non-atomic commit suffices for file creation alone.

### Integration Points

- **Phase 70 HARNESS-04 forward-coordination (CRITICAL handoff):**
  1. Path-A copy v1.6 workflow JOBS into existing `audit-harness-v1.7-integrity.yml` (do NOT recreate the file)
  2. Path-filter rewrite to v1.7-scoped surface — transitional filter from Phase 69 is REPLACED, not appended
  3. Add 2 crons (weekly bitrot `0 8 * * 1` + quarterly rotting-external `0 8 1 1,4,7,10 *`)
  4. Extend chain-apex job's skip-if-missing stubs to active `node` invocations as check-phase-67..70.mjs land via HARNESS-03 (drop the for-loop stubs; add explicit `node scripts/validation/check-phase-NN.mjs` per phase)
  5. Bump `harness-run` to invoke `v1.7-milestone-audit.mjs` (after HARNESS-01 ships it)
  6. Repoint `parse` + `path-match` to `v1.7-audit-allowlist.json` (after HARNESS-02 ships it)
  7. Add `pin-helper-advisory` job bound to v1.7 sidecar
  8. **If D-04 sub-decision (a) chosen in Phase 69:** remove `docs/decision-trees/09-linux-triage.md` from path-filter (it was a Phase-69-SC#5-evidence-only entry)

- **TIMEOUT-01 measurement feedback loop:** Phase 69's `::notice CHAIN_TIMING_LINUX` emission is the input to Phase 70 HARNESS-04's timeout-budget review. If Linux first-run > ~150s (50% of 300s budget), escalate v1.7-DEFERRED-CLEANUP.md TIMEOUT-01 from "discovery flag" to "v1.8+ subprocess-timeout-architecture review."

- **D-22 / D-03 auditor-independence axis stacking:** Phase 69 introduces the THIRD auditor-independence axis (separate OS) on top of D-03 fresh-clone + D-22 fresh sub-agent. Phase 70 HARNESS-05 terminal re-audit stacks all three at v1.7 close (per Phase 68 §G discoveries).

</code_context>

<specifics>
## Specific Ideas

- **`::notice title=CHAIN_TIMING_LINUX::Full chain wall-clock: ${N}s (Windows reference: ~102s; subprocess timeout: 300s)`** — exact format for D-03 timing emission (surfaces in GHA Actions UI summary as a notice annotation)
- **`docs/decision-trees/09-linux-triage.md`** — recommended synthetic CRLF target file per D-04 sub-decision (a); Phase 68 CHAIN-01 hardened surface; check-phase-51 reads it
- **`unix2dos`** — recommended tool for CRLF injection (deterministic; reversible via `dos2unix`; passes JSON/YAML linters when applied to .md files)
- **`actions/checkout@v4` + `actions/setup-node@v4` with `node-version: '20'`** — pin versions verbatim from v1.6 workflow
- **`timeout-minutes: 30`** at the `linux-chain-ubuntu-latest` job level — 9× empirical headroom over chain-apex runtime
- **D-A9 inheritance** — `continue-on-error: false` for `linux-chain-ubuntu-latest`, `harness-run`, `parse`, `path-match` (all PR-blocking)
- **Branch naming for synthetic PR (D-04):** recommend `phase-69/sc5-crlf-evidence` (matches Phase 68 plan naming pattern); branch deleted after evidence captured

</specifics>

<deferred>
## Deferred Ideas

- **`pin-helper-advisory` job migration to v1.7 sidecar** — Phase 70 HARNESS-04(d)
- **`v1.7-audit-allowlist.json` sidecar authoring** — Phase 70 HARNESS-02
- **`v1.7-milestone-audit.mjs` Path-A copy from v1.6** — Phase 70 HARNESS-01
- **Per-phase validators `check-phase-67..70.mjs`** — Phase 70 HARNESS-03 (Phase 69 only adds skip-if-missing stubs in YAML)
- **Both crons (weekly bitrot + quarterly rotting-external)** — Phase 70 HARNESS-04(b)
- **Path-filter rewrite to v1.7-scoped surface** — Phase 70 HARNESS-04(a) (Phase 69 uses transitional surface)
- **`cdcce23` archive-script garbage-insert root cause audit** — v1.7-DEFERRED-CLEANUP.md ARCHIVE-01; Phase 70 HARNESS-06 audits recurrence post-archival; root-cause fix deferred to v1.8+
- **Subprocess-timeout architecture review (if Linux runtime > 150s)** — v1.7-DEFERRED-CLEANUP.md TIMEOUT-01 escalation path; deferred to v1.8+ if Phase 69 timing measurement triggers
- **Pin-helper-advisory `--report` + `--self-test` integration in v1.7 workflow** — Phase 70 HARNESS-04(d)

</deferred>

---

*Phase: 69-CI-Linux Hardening (Pillar C — Cross-OS Verification)*
*Context gathered: 2026-05-26*
