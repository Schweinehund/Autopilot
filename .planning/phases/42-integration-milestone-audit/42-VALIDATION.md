---
phase: 42
slug: integration-milestone-audit
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-24
---

# Phase 42 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Phase 42 is docs + a Node audit harness. Primary validation is the Node harness itself (`scripts/validation/v1.4-milestone-audit.mjs`) + grep-based structural assertions.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node 22.x built-in (no test runner required — assertion-style stdout) |
| **Config file** | none — harness is self-contained ESM script |
| **Quick run command** | `node scripts/validation/v1.4-milestone-audit.mjs` |
| **Full suite command** | `node scripts/validation/v1.4-milestone-audit.mjs --verbose` |
| **Estimated runtime** | ~3 seconds (file I/O across ~25 Android docs) |

Secondary grep-based assertions for surgical edits:
- `grep -n "Android Enterprise Provisioning" docs/index.md` (AEAUDIT-02 bullet verification)
- `grep -n "_glossary-android.md" docs/_glossary-macos.md` (AEAUDIT-03 line-10 extension verification)
- `grep -c "## " docs/reference/android-capability-matrix.md` (H2 count matches D-15 locked ordering)

---

## Sampling Rate

- **After every task commit:** Run the file-specific grep assertion for that plan (e.g., after Plan 42-02 commits `docs/index.md`, run the grep verifying the new bullet + H2 + table row)
- **After Wave 1 completes (content plans):** Run `node scripts/validation/v1.4-milestone-audit.mjs --verbose` — must be 5/5 PASS
- **Before `/gsd-verify-work`:** Full audit harness green + audit doc artifact present
- **Max feedback latency:** 3 seconds per harness run; <1 second per individual grep

---

## Per-Task Verification Map

*Task IDs here are placeholders; planner fills exact IDs. Each plan will have its own per-task verify map. This table documents the phase-gate assertions every plan must satisfy.*

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | Status |
|---------|------|------|-------------|-----------|-------------------|--------|
| 42-01-01 | 01 capability matrix | 1 | AEAUDIT-01 | structural grep | `grep -c "^## " docs/reference/android-capability-matrix.md` (expect ≥7 per D-15) | ⬜ pending |
| 42-01-02 | 01 capability matrix | 1 | AEAUDIT-01 | structural grep | `grep -c "Cross-Platform Equivalences" docs/reference/android-capability-matrix.md` (expect 1) | ⬜ pending |
| 42-01-03 | 01 capability matrix | 1 | AEAUDIT-01 | frontmatter check | `grep -E "^review_by: " docs/reference/android-capability-matrix.md` + 60-day-cycle math | ⬜ pending |
| 42-01-04 | 01 capability matrix | 1 | AEAUDIT-04 C2 | supervision-regex check | `node scripts/validation/v1.4-milestone-audit.mjs --check C2` | ⬜ pending |
| 42-02-01 | 02 index.md stub | 1 | AEAUDIT-02 | insertion check | `grep -n "Android Enterprise Provisioning" docs/index.md` (expect ≥3: bullet + H2 + table row) | ⬜ pending |
| 42-02-02 | 02 index.md stub | 1 | AEAUDIT-02 | no-touch guard | `git diff --stat docs/index.md` shows only additions in expected regions | ⬜ pending |
| 42-03-01 | 03 glossary see-also | 1 | AEAUDIT-03 | line-10 extension | `sed -n '10p' docs/_glossary-macos.md \| grep "_glossary-android.md"` | ⬜ pending |
| 42-03-02 | 03 glossary see-also | 1 | AEAUDIT-03 | line-count unchanged | Original 2-line blockquote preserved — total line count unchanged from pre-edit +0 | ⬜ pending |
| 42-04-01 | 04 harness + allow-list | 1 | AEAUDIT-04 | smoke test | `node scripts/validation/v1.4-milestone-audit.mjs` exits 0 and emits 5 check lines | ⬜ pending |
| 42-04-02 | 04 harness + allow-list | 1 | AEAUDIT-04 | allow-list shape | `node -e "JSON.parse(require('fs').readFileSync('.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json'))"` | ⬜ pending |
| 42-04-03 | 04 harness + allow-list | 1 | AEAUDIT-04 | pin verification | For each supervision_exemptions entry, `sed -n "${line}p" ${file} \| grep -qiE "supervis"` | ⬜ pending |
| 42-05-01 | 05 audit run + doc | 2 | AEAUDIT-04, SC#5 | audit doc exists | `test -f .planning/milestones/v1.4-MILESTONE-AUDIT.md` | ⬜ pending |
| 42-05-02 | 05 audit run + doc | 2 | SC#5 | frontmatter shape | Frontmatter keys present: `milestone`, `status`, `scores`, `mechanical_checks`, `performed_by`, `deferred_items` | ⬜ pending |
| 42-05-03 | 05 audit run + doc | 2 | SC#5 | subagent independence | `performed_by` field names a subagent distinct from AEAUDIT-01/02/03 authors (D-02) | ⬜ pending |
| 42-06-01 | 06 REQUIREMENTS sync | 2 | all | traceability flip | `grep "AEAUDIT-0" .planning/REQUIREMENTS.md \| grep -c "\[x\]"` equals 4 when audit status=passed; `grep -c "\[x\]"` for AEAUDIT-01/02/03 equals 3 when status=gaps_found | ⬜ pending |
| 42-07-01 | 07 ROADMAP fix | 1 | D-06 | Plans-table rewrite | `grep -c "41-0[0-9]-PLAN.md" .planning/ROADMAP.md` between Phase 42 bounds = 0 (copy-paste bug removed) | ⬜ pending |
| 42-07-02 | 07 ROADMAP fix | 1 | D-06 | Plans-table present | Phase 42 section lists `42-0N-PLAN.md` entries matching the actual plan roster | ⬜ pending |

---

## Wave 0 Requirements

- [ ] `scripts/validation/v1.4-milestone-audit.mjs` — Node harness does not exist; Wave 1 Plan 04 creates it. No pre-installation needed (Node is already in repo per check-phase-30.mjs/check-phase-31.mjs precedent).
- [ ] `.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json` — sidecar does not exist; Wave 1 Plan 04 creates it alongside the harness.

*Existing infrastructure covers all other phase requirements. Node 22.x already available; grep/git already present.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Capability matrix prose readability | AEAUDIT-01 / SC#1 | Prose fidelity cannot be grep-verified | Read `docs/reference/android-capability-matrix.md` end-to-end; verify 3 paired Cross-Platform Equivalences rows match D-11 exact pair order and each pair attributes platform explicitly (D-12 rule) |
| Audit doc executive summary | SC#5 | Summary accuracy against scores cannot be grep-verified | Read `.planning/milestones/v1.4-MILESTONE-AUDIT.md` executive summary; verify it matches the `scores:` YAML block and `mechanical_checks:` results |
| Deferral footers (KME / AOSP / 4-platform) | D-14 | Prose wording defends scope against AECOMPARE-01 encroachment | Read matrix deferral footer section; verify 3 deferral callouts present with PROJECT.md-aligned wording |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify (Phase 42 has grep verify on every task)
- [ ] Wave 0 covers all MISSING references (harness + sidecar JSON — both created in Wave 1 Plan 04)
- [ ] No watch-mode flags (harness is one-shot)
- [ ] Feedback latency < 3s (harness runtime measured at ~3s for ~25 Android docs)
- [ ] `nyquist_compliant: true` set in frontmatter (flip after plan-checker approval)

**Approval:** pending
