---
phase: 70
slug: v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-28
---

# Phase 70 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Derived from `70-RESEARCH.md` §"Validation Architecture" and `70-CONTEXT.md` D-01..D-04 locked decisions.
> Mirrors Phase 66 `66-VALIDATION.md` shape (v1.6 close-gate precedent); v1.7 lineage adjustments inline.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Custom Node.js validators (`v1.7-milestone-audit.mjs` + `check-phase-NN.mjs` chain) — no external test framework |
| **Config file** | None — validators self-contained; sidecar at `scripts/validation/v1.7-audit-allowlist.json` (Wave 2 deliverable) |
| **Quick run command** | `node scripts/validation/check-phase-70.mjs` (Wave 3 active; Wave 1 stub) |
| **Full suite command** | `node scripts/validation/v1.7-milestone-audit.mjs && node scripts/validation/check-phase-67.mjs && node scripts/validation/check-phase-68.mjs && node scripts/validation/check-phase-69.mjs && node scripts/validation/check-phase-70.mjs` |
| **Self-test command** | `node scripts/validation/v1.7-milestone-audit.mjs --self-test` + `node scripts/validation/regenerate-supervision-pins.mjs --self-test` |
| **Cross-OS verification** | `gh workflow run audit-harness-v1.7-integrity.yml --ref master` (Wave 4 Axis 2 — D-03 mandatory 3-axis stacking) |
| **Terminal re-audit** | Fresh `git clone --no-hardlinks` into `$env:TEMP\v1.7-audit-<rand>` via fresh `gsd-executor` sub-agent (Wave 4 Axis 1 — D-03 LOCKED mechanism; Phase 66-04 `489edca` precedent) |
| **Estimated runtime** | Quick ~5s (warm) / ~30s (cold); Full suite ~60–120s; Linux GHA ~56s reference per Phase 69 TIMEOUT-01 closure |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/validation/check-phase-70.mjs` (or appropriate per-phase validator within the touched surface)
- **After Wave 2 commit (Atom 1):** Run `node scripts/validation/v1.7-milestone-audit.mjs && node scripts/validation/v1.7-milestone-audit.mjs --self-test && node scripts/validation/regenerate-supervision-pins.mjs --self-test` — all exit 0
- **After Wave 3 commit (Atom 2):** Run full suite (above) + verify zero CHAIN_SKIP entries across check-phase-{48..70}.mjs
- **After Wave 4 (terminal re-audit):** Capture `70-04-AUDIT-RESULTS.md` with BOTH Axis 1 (local fresh-clone) AND Axis 2 (GHA workflow_dispatch run URL) evidence
- **Before `/gsd:verify-work`:** Full suite must be green from a FRESH CLONE (D-03 terminal re-audit) AND GHA Linux ubuntu-latest workflow_dispatch exit 0 (CILINUX-01 cross-OS axis)
- **Max feedback latency:** ~5s (warm) / ~120s (cold full suite Windows) / ~56s (Linux GHA reference)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 70-01-01 | 01 | 1 | HARNESS-03 (scaffold) | — | `check-phase-70.mjs` Path-A from check-phase-66.mjs; V-NN-SELF guard: CHAIN_PHASES = {48..69}; assertion stubs scaffolded per D-01 freshness matrix | unit | `node scripts/validation/check-phase-70.mjs` (V-70-SELF / V-70-CHAIN exits 0 on stub) | ❌ W1 creates | ⬜ pending |
| 70-01-02 | 01 | 1 | HARNESS-03 (conventions) | — | `70-CONVENTIONS.md` exists with per-V-NN-NN freshness matrix (~16-40 rows: V-67/68/69/70-NN identifier + assertion class + freshness routing HEAD-or-v1.7-frozen-aware + mechanism + 1-line rationale per D-01 table) | unit | `test -f .planning/phases/70-.../70-CONVENTIONS.md` AND `grep -cE 'V-(67\|68\|69\|70)-' 70-CONVENTIONS.md` >= 16 | ❌ W1 creates | ⬜ pending |
| 70-02-01 | 02 | 2 | HARNESS-01 (v1.7-milestone-audit.mjs) | T-70-V14 | Path-A copy from `v1.6-milestone-audit.mjs`; lineage docstring `v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7`; C1-C16 inheritance preserved; harness exits 0 with all 15+ checks PASS in fully-blocking mode | unit + grep | `node scripts/validation/v1.7-milestone-audit.mjs` AND `grep -c '^function check' scripts/validation/v1.7-milestone-audit.mjs` matches v1.6 baseline | ❌ W2 creates | ⬜ pending |
| 70-02-02 | 02 | 2 | HARNESS-02 (v1.7-audit-allowlist.json) | — | Path-A copy from `v1.6-audit-allowlist.json`; `c13_rotting_external.ci_1_abm_urls` reset to 4 entries post-revalidation 2026-05-26 (Phase 67 Plan 67-01 `3fb8ca5` state); `c13_rotting_external.ci_2_vpp_location_token` 6 entries with `resolved_2026_05_26:true` (Phase 67 Plan 67-02 `55260b3` state); `c16_missing_endpoint_exemptions: []`; `quarterly_audit` metadata `0 8 1 1,4,7,10 *` carried forward | unit + JSON parse | `node -e "JSON.parse(require('fs').readFileSync('scripts/validation/v1.7-audit-allowlist.json','utf8'))"` exits 0 + shape assertions on supervision_exemptions/c13_rotting_external/c16_missing_endpoint_exemptions/quarterly_audit | ❌ W2 creates | ⬜ pending |
| 70-02-03 | 02 | 2 | HARNESS-02 (BASELINE_11 + parseAllowlist repoint) | — | BASELINE_11 freshness comment added to `regenerate-supervision-pins.mjs` (closes BASELINE_10 v1.6 carry-over); `parseAllowlist('scripts/validation/v1.6-audit-allowlist.json')` 4 call-sites at lines 290/336/431/433 repointed to v1.7 sidecar | unit + grep | `node scripts/validation/regenerate-supervision-pins.mjs --self-test` exits 0 AND `grep -c "v1.6-audit-allowlist.json" scripts/validation/regenerate-supervision-pins.mjs` == 0 AND `grep -c "v1.7-audit-allowlist.json" scripts/validation/regenerate-supervision-pins.mjs` == 4 AND `grep "BASELINE_11" scripts/validation/regenerate-supervision-pins.mjs` returns non-empty | ❌ W2 modifies existing | ⬜ pending |
| 70-02-ATOMIC | 02 | 2 | HARNESS-01 + HARNESS-02 + BASELINE_11 (Atom 1 indivisibility) | T-70-V14 | ALL 3 files (`v1.7-milestone-audit.mjs` NEW + `v1.7-audit-allowlist.json` NEW + `regenerate-supervision-pins.mjs` BASELINE_11 + parseAllowlist repoint) land in ONE git SHA per Phase 66-02 `3a9a671` precedent (D-02 Atom 1) | atomic-commit assertion | `git log -1 HEAD --name-only` shows EXACTLY 3 files; harness self-test green at HEAD | ❌ W2 commit | ⬜ pending |
| 70-03-01 | 03 | 3 | HARNESS-03 (check-phase-67.mjs) | — | Path-A from check-phase-66.mjs; CHAIN_PHASES = {48..66} (excludes 67-70 self-guard); V-67-NN assertions about SWEEP-01 ABM URL refs (4 URLs / 4 files) + SWEEP-02 VPP token rename (6 occurrences / 2 files) + sidecar state + Version History rows — ALL v1.7-frozen-aware per D-01 | unit | `node scripts/validation/check-phase-67.mjs` exits 0; CHAIN_PHASES verified by grep | ❌ W3 creates | ⬜ pending |
| 70-03-02 | 03 | 3 | HARNESS-03 (check-phase-68.mjs) | — | Path-A from check-phase-66.mjs; CHAIN_PHASES = {48..67}; V-68-NN MIXED routing per D-01: CHAIN_SKIP empty-Set (HEAD) + readFile() CRLF normalization in check-phase-{51,58}.mjs (HEAD) + `_lib/archive-path.mjs` existence (HEAD) + 5 call-site replacements (HEAD) + BASELINE_9 +1 banner shift (v1.7-frozen) + parseAllowlist v1.5→v1.6 lineage repoint (HEAD) | unit | `node scripts/validation/check-phase-68.mjs` exits 0 | ❌ W3 creates | ⬜ pending |
| 70-03-03 | 03 | 3 | HARNESS-03 (check-phase-69.mjs) | — | Path-A from check-phase-66.mjs; CHAIN_PHASES = {48..68}; V-69-NN MIXED routing: workflow YAML 4 jobs structure + core.autocrlf false + fetch-depth:0 + continue-on-error:false + node-version:'20' + `::notice CHAIN_TIMING_LINUX` (Phase 69 close-state = v1.7-frozen-aware per D-01); HEAD reads acknowledge post-Phase-70 HARNESS-04 EXTEND evolution | unit | `node scripts/validation/check-phase-69.mjs` exits 0 | ❌ W3 creates | ⬜ pending |
| 70-03-04 | 03 | 3 | HARNESS-03 (check-phase-70.mjs full) | — | Wave 1 stub upgraded to full V-70-NN assertion set: HARNESS-01..06 deliverable existence + lineage docstring + BASELINE_11 + sidecar shape + V-NN-SELF guard + workflow YAML post-EXTEND state + terminal re-audit artifact + milestone audit + deferred-cleanup + traceability — MIXED routing per D-01 (~30 assertions) | unit | `node scripts/validation/check-phase-70.mjs` exits 0; V-70-SELF / V-70-CHAIN guards intact | ⚠ W1 stub exists; W3 fills | ⬜ pending |
| 70-03-05 | 03 | 3 | HARNESS-04 (workflow YAML EXTEND) | T-70-V14 | `.github/workflows/audit-harness-v1.7-integrity.yml` EXTENDED (NOT recreated): (a) REMOVE `docs/decision-trees/09-linux-triage.md` from path-filter + v1.7-scoped surfaces; (b) PRESERVE `fetch-depth: 0` on linux-chain-ubuntu-latest (FETCH-DEPTH-01 inheritance); (c) parse/path-match/harness-run repoint v1.6→v1.7; (d) 2 crons added; (e) chain-67..70 active node invocations; (f) pin-helper-advisory job v1.7-bound; (g) rotting-external-quarterly job added | unit + grep | `grep -c "v1.6-" .github/workflows/audit-harness-v1.7-integrity.yml` == 0 (after Wave 3); `grep -c "v1.7-" .github/workflows/audit-harness-v1.7-integrity.yml` >= 3; `grep "09-linux-triage.md" .github/workflows/audit-harness-v1.7-integrity.yml` returns empty; `grep "fetch-depth: 0" .github/workflows/audit-harness-v1.7-integrity.yml` returns non-empty | ⚠ exists post-Phase-69; W3 modifies | ⬜ pending |
| 70-03-ATOMIC | 03 | 3 | HARNESS-03 + HARNESS-04 (Atom 2 chain-validator + CI surface indivisibility) | T-70-V14 | ALL 5 files (check-phase-67/68/69/70.mjs NEW + audit-harness-v1.7-integrity.yml MODIFIED) land in ONE git SHA per D-02 Atom 2 + Phase 68 `7b635ca` chain-topology atomic precedent | atomic-commit assertion + full suite | `git log -1 HEAD --name-only` shows EXACTLY 5 files; full suite green; chain-{48..70} zero CHAIN_SKIP; predecessor v1.4/v1.5/v1.6 workflows byte-unchanged via `git diff` | ❌ W3 commit | ⬜ pending |
| 70-03-PRED | 03 | 3 | Anti-regression (predecessor workflow byte-unchanged) | — | Predecessor workflow YAML files v1.4 + v1.5 + v1.6 byte-unchanged across all Phase 70 commits | unit | `git diff <pre-phase-70-base>..HEAD -- .github/workflows/audit-harness-integrity.yml .github/workflows/audit-harness-v1.5-integrity.yml .github/workflows/audit-harness-v1.6-integrity.yml` returns EMPTY | ✅ baseline | ⬜ pending |
| 70-04-01 | 04 | 4 | HARNESS-05 (Axis 1 — local fresh-clone) | T-70-V14 | Fresh `gsd-executor` sub-agent spawns; `git clone --no-hardlinks` to `$env:TEMP\v1.7-audit-<rand>`; full validator chain check-phase-{48..70}.mjs + v1.7-milestone-audit.mjs exit 0 with zero CHAIN_SKIP; clone removed post-audit (zero orphan temp dirs); per Phase 66-04 `489edca` mechanism precedent | subprocess (manual capture) | PowerShell recipe documented in 70-04-PLAN.md; exit codes + summary captured in `70-04-AUDIT-RESULTS.md` §B.1 | green from author-env; W4 verifies from fresh clone | ⬜ pending |
| 70-04-02 | 04 | 4 | HARNESS-05 (Axis 2 — cross-OS Linux GHA) | T-70-V14 | After Atom 2 (Wave 3) lands on master, `gh workflow run audit-harness-v1.7-integrity.yml --ref master` triggered; chain-67..70 jobs actively run (NOT skip-if-missing); all 4 jobs exit 0; chain-apex reports 32 PASS / 0 FAIL / 0 SKIPPED on ubuntu-latest; run URL captured | subprocess (gh CLI) + manual | `gh run list --workflow=audit-harness-v1.7-integrity.yml --limit=1 --json url,status,conclusion` shows status=completed conclusion=success; embedded in `70-04-AUDIT-RESULTS.md` §B.2 | ⚠ requires Wave-3 commit on master | ⬜ pending |
| 70-05-01 | 05 | 5 | HARNESS-06 (chicken-and-egg Commit A — SHA placeholder fill) | — | `{phase_70_close_SHA}` placeholders in check-phase-67/68/69/70.mjs frozen-aware refs substituted with Atom 2 commit SHA from Wave 3 (or Wave-5 self-anchor SHA per Plan 70-05 author's tactical choice) | unit + grep | `grep -c '{phase_70_close_SHA}' scripts/validation/check-phase-7?.mjs` == 0 after Commit A; commit includes only check-phase-67..70.mjs files | ⚠ Wave 5 Commit A | ⬜ pending |
| 70-05-02 | 05 | 5 | HARNESS-06 (v1.7-MILESTONE-AUDIT.md) | — | `.planning/milestones/v1.7-MILESTONE-AUDIT.md` exists with YAML frontmatter `status: passed` + 12/12 v1.7 reqs closed + 4-phase scope (67-70) delivered + 3-axis Auditor-Independence Verification section + Methodology Highlights + Command Verification Table + NEW "Discoveries Surfaced During Execution" section (FETCH-DEPTH-01 + SCOPE-GAP-61 + D-04-OVERSPEC-01 + CHAIN-WRAPPER-01 + ARCHIVE-01) | unit + grep | `test -f .planning/milestones/v1.7-MILESTONE-AUDIT.md`; `grep -c "status: passed" .planning/milestones/v1.7-MILESTONE-AUDIT.md` >= 1; `grep -cE 'HARNESS-(0[1-6])' .planning/milestones/v1.7-MILESTONE-AUDIT.md` >= 6 | ❌ W5 creates | ⬜ pending |
| 70-05-03 | 05 | 5 | HARNESS-06 (v1.7-DEFERRED-CLEANUP.md finalize) | — | `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` extended with v1.6 carry-overs (CI-3 + Multi-tenant Apple Business + Apple Business Device API + per-OU CRD + Account Holder runbook + ASM) + Phase 69 final dispositions (FETCH-DEPTH-01 CLOSED + SCOPE-GAP-61 CLOSED + D-04-OVERSPEC-01 ACKNOWLEDGED + CHAIN-WRAPPER-01 DEFERRED + ARCHIVE-01 root-cause DEFERRED) + ARCHIVE-01 hand-off to `/gsd-complete-milestone` documented | unit + grep | `grep -cE '(CI-3|CHAIN-WRAPPER-01|ARCHIVE-01)' .planning/milestones/v1.7-DEFERRED-CLEANUP.md` >= 3 | ⚠ stub exists; W5 finalizes | ⬜ pending |
| 70-05-04 | 05 | 5 | HARNESS-06 (traceability closure 4-doc) | — | PROJECT.md 12 v1.7 reqs (SWEEP-01..02 + CHAIN-01..03 + CILINUX-01 + HARNESS-01..06) Active→Validated with closing SHAs; ROADMAP.md Phase 70 row "Complete" + Progress 4/4; STATE.md milestone close recorded; REQUIREMENTS.md Traceability table fully populated (all 12 status=Complete) | manual + grep | `grep -c "HARNESS-0[1-6].*Complete" .planning/REQUIREMENTS.md` >= 6; ROADMAP.md row inspection; STATE.md frontmatter `milestone: v1.7` + `status: complete` | ❌ W5 traceability commit | ⬜ pending |
| 70-05-05 | 05 | 5 | Close-gate verification (70-VERIFICATION.md) | — | `70-VERIFICATION.md` NEW close-gate report mirroring 66/68/69-VERIFICATION.md shape: A (goal narrative) + B (commands+evidence) + C (SC#1-5 satisfaction) + D (atomic-commit SHA record both atoms) + E (discoveries) + F (forward-pointer to /gsd-complete-milestone) + G (sign-off) | unit + grep | `test -f .planning/phases/70-.../70-VERIFICATION.md`; `grep -cE '^## (Section [A-G]\|A\.\|B\.)' .planning/phases/70-.../70-VERIFICATION.md` >= 7 | ❌ W5 creates | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠ partial / dependent*

---

## Wave 0 Requirements

- [ ] `scripts/validation/v1.7-milestone-audit.mjs` — does not yet exist; Wave 2 creates as Path-A copy from `v1.6-milestone-audit.mjs`
- [ ] `scripts/validation/v1.7-audit-allowlist.json` — does not yet exist; Wave 2 creates as Path-A from v1.6 sidecar with c13 reset
- [ ] `scripts/validation/check-phase-67.mjs` — does not yet exist; Wave 3 creates
- [ ] `scripts/validation/check-phase-68.mjs` — does not yet exist; Wave 3 creates
- [ ] `scripts/validation/check-phase-69.mjs` — does not yet exist; Wave 3 creates
- [ ] `scripts/validation/check-phase-70.mjs` — does not yet exist; Wave 1 creates as scaffold/stub + Wave 3 fills with full V-70-NN assertion set
- [ ] `.planning/milestones/v1.7-MILESTONE-AUDIT.md` — does not yet exist; Wave 5 creates
- [ ] `70-CONVENTIONS.md` — does not yet exist; Wave 1 creates with per-V-NN-NN freshness matrix per D-01
- [ ] `70-04-AUDIT-RESULTS.md` — does not yet exist; Wave 4 creates with both axis evidence per D-03
- [ ] `70-VERIFICATION.md` — does not yet exist; Wave 5 creates as close-gate report

**Pre-existing infrastructure (no Wave 0 install needed):**
- ✅ Node.js validator framework (custom .mjs scripts; no external test framework)
- ✅ `scripts/validation/v1.6-milestone-audit.mjs` (Path-A source for HARNESS-01)
- ✅ `scripts/validation/v1.6-audit-allowlist.json` (Path-A source for HARNESS-02)
- ✅ `scripts/validation/check-phase-66.mjs` (Path-A source for HARNESS-03 — chain-apex + V-NN-SELF guard pattern)
- ✅ `scripts/validation/check-phase-61.mjs` (per-assertion-class freshness routing exemplar — post-`d7d7d5f` + post-`2d61981`)
- ✅ `scripts/validation/_lib/archive-path.mjs` (Phase 68 CHAIN-02 helper — V-68-NN assertion target)
- ✅ `scripts/validation/regenerate-supervision-pins.mjs` (BASELINE_NN + parseAllowlist host — Wave 2 modifies BASELINE_11 + 4 parseAllowlist sites)
- ✅ `.github/workflows/audit-harness-v1.7-integrity.yml` (EXTEND target post-Phase-69 Plan 69-01 `dd1ff08` + Fix-1 `85521bb` + Fix-2 `2d61981`)
- ✅ `.github/workflows/audit-harness-v1.6-integrity.yml` (source for missing jobs: 2 crons + pin-helper-advisory + rotting-external-quarterly — BYTE-UNCHANGED invariant during Wave 3 EXTEND)
- ✅ `.planning/milestones/v1.6-MILESTONE-AUDIT.md` (Path-A template for HARNESS-06 — 344-line full depth)
- ✅ `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` (already-authored stub Phase 68 close + Phase 69 extension; Wave 5 finalizes)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Auditor-independence at fresh-clone re-audit (zero context-carryover from Plans 70-01..70-04 author-agents) | HARNESS-05 Axis 1 | Subprocess execution + fresh gsd-executor sub-agent boundary cannot be auto-asserted from main session; verification requires inspection of the subagent's response text + git clone exit codes captured into 70-04-AUDIT-RESULTS.md | Wave 4 Plan 70-04: (1) spawn fresh `gsd-executor` sub-agent via Task tool; (2) sub-agent runs PowerShell recipe (clone + cd + node invocations + cleanup); (3) sub-agent returns exit codes + summary text; (4) main session validates + embeds into `70-04-AUDIT-RESULTS.md` §B.1 |
| GHA workflow_dispatch run URL capture + cross-OS PASS-count match | HARNESS-05 Axis 2 | GHA run URL must be captured externally via `gh run list`; PASS-count match is observational (32 PASS / 0 FAIL / 0 SKIPPED on ubuntu-latest matching Windows local) | Wave 4 Plan 70-04: (1) `gh workflow run audit-harness-v1.7-integrity.yml --ref master`; (2) wait for completion via `gh run watch` or `gh run list --limit=1 --json status,conclusion,url`; (3) capture run URL + ubuntu-latest job log tail; (4) embed in `70-04-AUDIT-RESULTS.md` §B.2 |
| v1.7-MILESTONE-AUDIT.md narrative quality (Methodology Highlights + Discoveries section prose) | HARNESS-06 | Doc authoring inherently manual — Path-A template provides structure, but per-section prose adaptation to v1.7 12-req scope vs v1.6 39-req scope requires human-style judgment | Wave 5 Plan 70-05: Path-A copy v1.6-MILESTONE-AUDIT.md template; tighten prose section-by-section; NEW "Discoveries Surfaced During Execution" 5-entry section per D-04 Claude's Discretion; cross-reference 66/68/69-VERIFICATION.md §E entries verbatim |
| ARCHIVE-01 recurrence-check post-archival | (Out-of-scope Phase 70 per D-03; deferred to `/gsd-complete-milestone`) | Diff-check belongs at archival invocation site per ARCHIVE-01 entry wording; Phase 70 ships only the hand-off documentation in v1.7-MILESTONE-AUDIT.md Sign-off section | Post-Phase-70-close: user invokes `/gsd-complete-milestone v1.7`; that skill MUST run `git diff HEAD~1 HEAD -- .planning/MILESTONES.md` immediately after archival completes; if cdcce23-class recurrence detected: file follow-up issue, do NOT mask via deletion |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies (Wave 1 + Wave 4 + Wave 5 manual verifications are inherently subprocess/narrative work, captured in Manual-Only table above)
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify (verified — every Wave has automated assertions; Wave 4 + Wave 5 manual items have unit/grep companions)
- [ ] Wave 0 covers all MISSING references (10 files identified; all created in Waves 1-5)
- [ ] No watch-mode flags (validator chain is one-shot)
- [ ] Feedback latency < 120s (Quick ~5s; Full ~60-120s; Linux GHA ~56s reference)
- [ ] `nyquist_compliant: true` set in frontmatter (pending Wave 5 close-gate sign-off)

**Approval:** pending (will flip to `approved 2026-MM-DD` at Wave 5 close-gate per `gsd-verifier` `70-VERIFICATION.md` sign-off)

---

*Validation strategy authored: 2026-05-28*
*Derived from: 70-CONTEXT.md (D-01..D-04 locked decisions) + 70-RESEARCH.md (HARNESS-01..06 tactical specs) + 66-VALIDATION.md (Phase 66 v1.6 close-gate precedent)*
