---
phase: 69
slug: ci-linux-hardening-pillar-c-cross-os-verification
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-26
---

# Phase 69 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Validator-as-deliverable inversion pattern (v1.3+): the deliverable file itself (the v1.7 workflow YAML) is the validation target; tests are sub-second grep assertions + integration runtime evidence (GHA workflow_dispatch + synthetic PR).

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Custom Node.js validator harness (`check-phase-NN.mjs` per-phase + `v1.6-milestone-audit.mjs` aggregate) + GitHub Actions YAML schema validation (implicit via GHA platform parse) + bash `grep`/`test` sub-second assertions |
| **Config file** | `.github/workflows/audit-harness-v1.7-integrity.yml` (the deliverable itself — Wave 0 created in Phase 69) |
| **Quick run command (per-task YAML asserts)** | `grep -q "<substring>" .github/workflows/audit-harness-v1.7-integrity.yml` + `test -f .github/workflows/audit-harness-v1.7-integrity.yml` (sub-second) |
| **Full suite command (chain sweep — Windows local)** | PowerShell: `48..66 \| % { node "scripts/validation/check-phase-$_.mjs" }` |
| **Full suite command (cross-OS — GHA Linux)** | `workflow_dispatch` of `audit-harness-v1.7-integrity.yml` on master HEAD via `gh workflow run audit-harness-v1.7-integrity.yml` |
| **Estimated runtime (Windows local chain)** | ~102s per Phase 68 TIMEOUT-01 measurement |
| **Estimated runtime (Linux GHA chain)** | Unknown — measured in Phase 69 close-gate via `::notice CHAIN_TIMING_LINUX` emission; assumption A3 = 2-3× Windows |

---

## Sampling Rate

- **After every task commit:** Run sub-second grep + test assertions on the workflow YAML (latency < 1s)
- **After every plan wave:** Full chain Windows local (`~102s`) + workflow file YAML parse via `node -e "require('js-yaml').load(require('fs').readFileSync('.github/workflows/audit-harness-v1.7-integrity.yml', 'utf8'))"` (sub-second)
- **Before `/gsd:verify-work`:** All sub-second YAML checks PASS + `workflow_dispatch` GHA run exits 0 with `::notice CHAIN_TIMING_LINUX` emission captured + synthetic-PR negative-case (exit 1) and positive-case (exit 0) GHA run URLs captured
- **Max feedback latency:** ~102s for full chain; sub-second for YAML structure assertions

---

## Per-Task Verification Map

> Plan IDs/Task IDs below are placeholder (`{N}-01-01` etc.) — plan-phase will materialize these. The MAP shows the validation contract independently of plan decomposition.

| Task ID (placeholder) | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 69-NN-01 | NN | 1 | CILINUX-01 | T-69-WORKFLOW-INJECTION | No `${{ github.event.* }}` interpolation in `run:` blocks | unit (YAML structure) | `! grep -E '\$\{\{\s*github\.event\.' .github/workflows/audit-harness-v1.7-integrity.yml` | ❌ W0 (deliverable) | ⬜ pending |
| 69-NN-02 | NN | 1 | CILINUX-01 | — | New workflow file exists with ≥ 4 jobs | unit (file existence + YAML structure) | `test -f .github/workflows/audit-harness-v1.7-integrity.yml && [ $(grep -c "^  [a-z][a-z-]*:$" .github/workflows/audit-harness-v1.7-integrity.yml) -ge 4 ]` | ❌ W0 | ⬜ pending |
| 69-NN-03 | NN | 1 | CILINUX-01 | — | `git config --global core.autocrlf false` precedes `actions/checkout@v4` in `linux-chain-ubuntu-latest` job | unit (YAML structure ordering) | `awk '/linux-chain-ubuntu-latest:/,/^[^ ]/' .github/workflows/audit-harness-v1.7-integrity.yml \| grep -n -E 'autocrlf\|actions/checkout@v4'` (verify autocrlf line number < checkout line number) | ❌ W0 | ⬜ pending |
| 69-NN-04 | NN | 1 | CILINUX-01 | — | `linux-chain-ubuntu-latest` job invokes `check-phase-66.mjs --verbose` | unit (YAML structure) | `grep -q "check-phase-66.mjs --verbose" .github/workflows/audit-harness-v1.7-integrity.yml` | ❌ W0 | ⬜ pending |
| 69-NN-05 | NN | 1 | CILINUX-01 | — | `::notice CHAIN_TIMING_LINUX` emission present in chain-apex step | unit (YAML structure) | `grep -q "CHAIN_TIMING_LINUX" .github/workflows/audit-harness-v1.7-integrity.yml` | ❌ W0 | ⬜ pending |
| 69-NN-06 | NN | 1 | CILINUX-01 | — | `timeout-minutes: 30` declared on `linux-chain-ubuntu-latest` job | unit (YAML structure) | `grep -q "timeout-minutes: 30" .github/workflows/audit-harness-v1.7-integrity.yml` | ❌ W0 | ⬜ pending |
| 69-NN-07 | NN | 1 | CILINUX-01 | — | Skip-if-missing stubs for phases 67-70 present (per D-02 canonical idiom) | unit (YAML structure) | `grep -qE "for i in 67 68 69 70\|check-phase-67.*present" .github/workflows/audit-harness-v1.7-integrity.yml` | ❌ W0 | ⬜ pending |
| 69-NN-08 | NN | 1 | CILINUX-01 | — | NO `on.schedule:` crons in Phase 69 file (negative assertion per CONTEXT) | unit (YAML structure — negative) | `! grep -E "^[[:space:]]*schedule:" .github/workflows/audit-harness-v1.7-integrity.yml` | ❌ W0 | ⬜ pending |
| 69-NN-09 | NN | 1 | CILINUX-01 | — | NO `pin-helper-advisory` job in Phase 69 file (negative assertion per CONTEXT) | unit (YAML structure — negative) | `! grep -q "pin-helper-advisory" .github/workflows/audit-harness-v1.7-integrity.yml` | ❌ W0 | ⬜ pending |
| 69-NN-10 | NN | 1 | CILINUX-01 | T-69-PREDECESSOR-DRIFT | Predecessor workflow files BYTE-UNCHANGED post-Phase-69 commit | unit (git-level diff) | `git diff $PRE_69_SHA HEAD -- .github/workflows/audit-harness-integrity.yml .github/workflows/audit-harness-v1.5-integrity.yml .github/workflows/audit-harness-v1.6-integrity.yml \| wc -l` returns 0 | ✅ (existing) | ⬜ pending |
| 69-NN-11 | NN | 2 | CILINUX-01 (SC#5 B.1) | — | `workflow_dispatch` baseline on master HEAD exits 0 + emits `::notice CHAIN_TIMING_LINUX` | integration (GHA runtime) | `gh workflow run audit-harness-v1.7-integrity.yml --ref master && gh run watch --exit-status` + capture run URL + grep log for `CHAIN_TIMING_LINUX` | runtime (Phase 69 close) | ⬜ pending |
| 69-NN-12 | NN | 2 | CILINUX-01 (SC#5 B.2) | — | Synthetic CRLF PR exits 1 with check-phase-51 catching regression | integration (GHA runtime) | Push synthetic PR branch with `unix2dos docs/decision-trees/09-linux-triage.md` injection; capture GHA run URL showing exit 1 + grep for `check-phase-51 FAIL` | runtime | ⬜ pending |
| 69-NN-13 | NN | 2 | CILINUX-01 (SC#5 B.3) | — | Revert commit on synthetic PR branch exits 0 | integration (GHA runtime) | Push `dos2unix` revert commit; capture GHA run URL showing exit 0 | runtime | ⬜ pending |
| 69-NN-14 | NN | 2 | CILINUX-01 (SC#5 B.4) | — | Windows vs Linux per-validator PASS counts identical (48..66; 67-70 skip-echo) | integration (cross-OS diff) | Capture local Windows chain output; capture Linux GHA chain output; diff PASS counts per validator | runtime | ⬜ pending |
| 69-NN-15 | NN | 2 | CILINUX-01 | — | 69-VERIFICATION.md authored with sections A-G mirroring 68-VERIFICATION.md | unit (file existence + heading inventory) | `test -f .planning/phases/69-ci-linux-hardening-pillar-c-cross-os-verification/69-VERIFICATION.md && grep -cE "^## Section [A-G]" .planning/phases/69-ci-linux-hardening-pillar-c-cross-os-verification/69-VERIFICATION.md` ≥ 7 | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `.github/workflows/audit-harness-v1.7-integrity.yml` — Phase 69's primary deliverable; created in Plan 69-NN Wave 1
- [ ] `69-VERIFICATION.md` — created by Phase 69 close-gate plan
- [ ] Synthetic PR branch `phase-69/sc5-crlf-evidence` — created during Phase 69 close-gate execution; deleted after evidence captured
- [ ] `dos2unix` installed on ubuntu-24.04 runner — `sudo apt-get install -y dos2unix` step injected ONLY in synthetic-PR-branch's workflow (NOT in master's workflow file)
- [x] `check-phase-{48..66}.mjs` chain (existing post-Phase-68 `7b635ca`)
- [x] `v1.6-milestone-audit.mjs` + `v1.6-audit-allowlist.json` (existing)
- [x] `actions/checkout@v4`, `actions/setup-node@v4` GHA marketplace references (always available)
- [x] `gh` CLI for `gh workflow run` + `gh run watch --exit-status` (assumed available on developer machines; if not, fall back to GitHub web UI)

**Wave 0 is mostly NEW-DELIVERABLE-AUTHORED-IN-PHASE-69, not pre-existing scaffolding.** The phase ships its own validation target (the YAML file) along with the validation tests (Windows local chain + GHA workflow_dispatch + synthetic PR). This is the validator-as-deliverable inversion pattern from v1.3+.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| GHA run URL capture for SC#5 B.1/B.2/B.3 evidence | CILINUX-01 SC#5 | URLs are runtime artifacts from GHA — not derivable from static analysis | After workflow_dispatch + synthetic PR push, copy permalink URLs from GitHub Actions UI (or `gh run list --workflow=audit-harness-v1.7-integrity.yml --limit=3 --json url`) into 69-VERIFICATION.md §B.1/B.2/B.3 |
| Synthetic-PR closure-without-merge | CILINUX-01 SC#5 + zero master-tree-churn invariant | PR closure is a human-decision GitHub UI action | Author closes PR via "Close pull request" button (NOT "Merge"); deletes `phase-69/sc5-crlf-evidence` branch after evidence captured |
| Linux runtime > 1500s timeout escalation decision | CILINUX-01 (forward-coordination) | If chain runtime > 1500s, requires human decision: bump `timeout-minutes: 30 → 60` OR escalate TIMEOUT-01 to v1.8+ subprocess-timeout-architecture review | Compare measured Linux runtime from `::notice CHAIN_TIMING_LINUX` against 1500s threshold; document decision in `v1.7-DEFERRED-CLEANUP.md` TIMEOUT-01 entry |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references (4 NEW items: workflow YAML + 69-VERIFICATION.md + synthetic PR branch + dos2unix install step)
- [ ] No watch-mode flags (chain runs are exit-code-deterministic per Phase 68 close)
- [ ] Feedback latency < 102s for Windows full-chain; < 1500s threshold for Linux GHA full-chain (A3 monitoring)
- [ ] `nyquist_compliant: true` set in frontmatter (flip from `false` after Phase 69 close-gate plan verifies all 15 tasks PASS)

**Approval:** pending
