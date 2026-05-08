---
phase: 60
slug: audit-harness-v1-5-finalization
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-06
---

# Phase 60 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Phase 60 is a CALIBRATION-AND-FINALIZATION phase. Validation infrastructure = the audit harness itself + per-phase validators (check-phase-NN.mjs).

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js validators (file-reads-only `.mjs`) + npm `markdown-link-check` |
| **Config file** | `.mlc-config.json` (Phase 48 Wave 2 artifact); `package.json` for tooling versions |
| **Quick run command** | `node scripts/validation/v1.5-milestone-audit.mjs` |
| **Full suite command** | `node scripts/validation/v1.5-milestone-audit.mjs --verbose && for v in scripts/validation/check-phase-{48..60}.mjs; do node "$v" || exit 1; done && node scripts/validation/regenerate-supervision-pins.mjs --self-test` |
| **Estimated runtime** | ~25-40 seconds (harness ~5s; 13 per-phase validators ~12s; self-test ~2s; broken-link sweep ~15s if invoked) |

---

## Sampling Rate

- **After every task commit:** Run quick command (`node scripts/validation/v1.5-milestone-audit.mjs`) — should remain GREEN throughout phase execution. C9/C11/C13 informational status during early commits, blocking after the atomic harness commit.
- **After every plan wave:** Run full suite. After cluster-fix waves: assert harness still GREEN. After atomic harness commit: assert C9/C11/C12/C13 all PASS in blocking mode.
- **Before `/gsd-verify-work`:** Full suite must exit 0 from a fresh worktree (Phase 61 fresh-clone re-audit precedent).
- **Max feedback latency:** 40 seconds.

---

## Per-Task Verification Map

> Plans not yet authored at validation-strategy time. Map will be filled by planner against actual plan task IDs. Skeleton structure below shows expected coverage; planner populates Test Type + Automated Command per task.

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 60-01-01 | 01 | 1 | (calibration) | — | C9 + C11 corpus scan accurate at HEAD | unit | `cat 60-CALIBRATION.md && grep -c 'COPE\\|System Center\\|SCCM' docs/**/*.md` | ✅ existing | ⬜ pending |
| 60-NN-NN | NN | N | AUDIT-03/04/05/06/07 | — | harness GREEN in fully-blocking mode | integration | `node scripts/validation/v1.5-milestone-audit.mjs && node scripts/validation/check-phase-60.mjs` | ✅ existing | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

**Coverage rule:** Every plan task in Phase 60 (anchor-fix cluster commits, path-fix commits, atomic harness commit, validator-author commit, ROADMAP wording-fix commit) MUST have an automated verify entry — anchor-fix tasks via `node scripts/validation/v1.5-milestone-audit.mjs` (regression-guard) and check-phase-58/59 (no Phase 58/59 V-NN-NN regression); harness commit via `check-phase-60.mjs --verbose` (V-60-01..V-60-25 PASS) + harness in blocking mode; validator-author commit via running the validator + asserting it exits 0.

---

## Wave 0 Requirements

- [ ] `scripts/validation/check-phase-60.mjs` — does not exist yet; ships in Phase 60 as deliverable per AUDIT-06
- [ ] `60-CALIBRATION.md` artifact — pre-promotion C9 + C11 corpus scan; ships before atomic harness commit per CONTEXT D-27/D-28
- [ ] No new test framework installation needed — `markdown-link-check` already installed at Phase 48 Wave 2 close per `.mlc-config.json` existence
- [ ] No new npm dependencies — `markdown-link-check` is the only externally-installed dependency and is already in repo state

*Existing harness + per-phase validators (check-phase-{30,31,48-59}.mjs) cover all upstream regression-guards.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| ROADMAP SC#5 wording-fix textual contradiction surfaced in 60-VERIFICATION.md | AUDIT-06 SC#5 (per CONTEXT D-23) | Markdown text content; no automated assertion captures intent of textual change | Visual inspection: `grep -A 2 'SC#5\\|audit-harness-integrity.yml' .planning/phases/60-audit-harness-v1-5-finalization/60-VERIFICATION.md` confirms note present + `grep audit-harness-v1.5-integrity.yml .planning/ROADMAP.md` confirms wording fix landed |
| 51 anchor-fix triage decisions (rewrite-ref vs `<a id>`-shim per finding) | AUDIT-05 SC#3 (per CONTEXT D-08) | Per-finding human judgment; not algorithmically decidable | Visual inspection: each fix commit message references the inventory line + chosen mechanism |
| 5 broken-path triage decisions (re-link vs delete dead ref) | AUDIT-05 SC#3 (per CONTEXT D-09) | Per-finding human judgment; not algorithmically decidable | Visual inspection per fix commit |
| 15-entry `c13_broken_link_allowlist[]` reasons (transient_external + template_placeholder categorization) | AUDIT-05 SC#3 | Reason text is content; categorization invariants automated via JSON shape validator | JSON shape automated via check-phase-60.mjs V-60-07; reason content reviewed at PR time |

---

## Validation Sign-Off

- [ ] All tasks have automated verify or Wave 0 dependencies (planner populates after PLAN.md authored)
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify (target = harness invocation after EVERY task)
- [ ] Wave 0 covers all MISSING references (60-CALIBRATION.md created pre-atomic-commit; check-phase-60.mjs created post-atomic-commit)
- [ ] No watch-mode flags (validators are file-reads-only single-pass)
- [ ] Feedback latency < 40s
- [ ] `nyquist_compliant: true` set in frontmatter (after planner populates per-task map)

**Approval:** pending
