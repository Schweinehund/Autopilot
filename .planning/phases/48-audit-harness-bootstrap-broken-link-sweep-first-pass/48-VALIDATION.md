---
phase: 48
slug: audit-harness-bootstrap-broken-link-sweep-first-pass
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-26
---

# Phase 48 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Source: 48-RESEARCH.md §Validation Architecture (extracted by /gsd-plan-phase orchestrator).

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | check-phase-48.mjs (custom harness; no external test framework) |
| **Config file** | none — self-contained Node ESM modules |
| **Quick run command** | `node scripts/validation/check-phase-48.mjs` |
| **Full suite command** | `node scripts/validation/v1.5-milestone-audit.mjs --verbose` |
| **Estimated runtime** | ~5–8 seconds (file-reads-only; no network) |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/validation/v1.5-milestone-audit.mjs`
- **After every plan wave:** Run `node scripts/validation/v1.5-milestone-audit.mjs --verbose && node scripts/validation/regenerate-supervision-pins.mjs --self-test`
- **Before `/gsd-verify-work`:** Full suite must exit 0 AND `check-phase-48.mjs` must exit 0
- **Max feedback latency:** ~10 seconds (no compilation; pure Node ESM execution)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 48-01-01 | 01 | 1 | AUDIT-01 | — | N/A (docs-engineering tooling; no auth/input flows) | file-exists | `test -f scripts/validation/v1.5-milestone-audit.mjs` | ❌ W0 | ⬜ pending |
| 48-01-02 | 01 | 1 | AUDIT-01 | — | N/A | file-exists | `test -f scripts/validation/v1.5-audit-allowlist.json && jq . scripts/validation/v1.5-audit-allowlist.json` | ❌ W0 | ⬜ pending |
| 48-01-03 | 01 | 1 | AUDIT-07 | — | N/A | integration | `node scripts/validation/regenerate-supervision-pins.mjs --self-test` | ✅ exists, currently FAILs | ⬜ pending |
| 48-02-01 | 02 | 1 | AUDIT-02 | — | N/A | unit (harness check) | `node scripts/validation/v1.5-milestone-audit.mjs --verbose 2>&1 \| grep -E "C10.*PASS"` | ❌ W0 | ⬜ pending |
| 48-03-01 | 03 | 1 | AUDIT-03 | — | N/A | unit (harness check) | `node scripts/validation/v1.5-milestone-audit.mjs --verbose 2>&1 \| grep -E "C11.*PASS"` | ❌ W0 | ⬜ pending |
| 48-03-02 | 03 | 1 | AUDIT-04 | — | N/A | unit (harness check) | `node scripts/validation/v1.5-milestone-audit.mjs --verbose 2>&1 \| grep -E "C12.*PASS"` | ❌ W0 | ⬜ pending |
| 48-03-03 | 03 | 1 | AUDIT-05 | — | N/A | unit (harness check) | `node scripts/validation/v1.5-milestone-audit.mjs --verbose 2>&1 \| grep -E "C13.*PASS"` | ❌ W0 | ⬜ pending |
| 48-04-01 | 04 | 1 | — (D-04/D-05 graduate decision) | — | N/A | unit (harness check) | `node scripts/validation/v1.5-milestone-audit.mjs --verbose 2>&1 \| grep -E "C6.*PASS\\\|C7.*PASS"` | ❌ W0 | ⬜ pending |
| 48-05-01 | 05 | 1 | AUDIT-06 | — | N/A | file-exists + run | `node scripts/validation/check-phase-48.mjs` | ❌ W0 | ⬜ pending |
| 48-06-01 | 06 | 1 | AUDIT-06 | — | N/A | file-exists | `test -f .github/workflows/audit-harness-v1.5-integrity.yml` | ❌ W0 | ⬜ pending |
| 48-06-02 | 06 | 1 | — (D-21 pre-commit advisory) | — | N/A | file-exists | `test -f scripts/validation/pre-commit-advisory.sh` | ❌ W0 | ⬜ pending |
| 48-07-01 | 07 | 2 | AUDIT-05/CLEAN-07 | — | N/A | file-exists | `test -f .mlc-config.json && jq . .mlc-config.json` | ❌ W0 | ⬜ pending |
| 48-08-01 | 08 | 2 | CLEAN-06 | — | N/A | command-output | `grep -rn "#[A-Z]" docs/ \| wc -l` (capture count to inventory) | ✅ grep available | ⬜ pending |
| 48-09-01 | 09 | 2 | CLEAN-06 + CLEAN-07 | — | N/A | command-output | `npx markdown-link-check@3.14.2 --config .mlc-config.json docs/**/*.md` (capture findings) | ❌ W0 (needs config) | ⬜ pending |
| 48-10-01 | 10 | 2 | AUDIT-08 | — | N/A | file-content | `grep -E "## Category [ABC]" .planning/phases/48-*/48-VERIFICATION-broken-links.md` | ❌ W0 | ⬜ pending |
| 48-11-01 | 11 | 2 | (terminal sanity) | — | N/A | integration | `node scripts/validation/v1.5-milestone-audit.mjs --verbose && echo OK` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `scripts/validation/v1.5-milestone-audit.mjs` — Path A copy of v1.4.1 + new C10/C11/C12/C13 checks (AUDIT-01..05)
- [ ] `scripts/validation/v1.5-audit-allowlist.json` — sidecar; inherits v1.4.1 verbatim, refresh pin coords, schema version + provenance updated (AUDIT-01)
- [ ] `scripts/validation/check-phase-48.mjs` — phase validator; asserts AUDIT-01..08 deliverables exist + parse + harness exits 0 (AUDIT-06)
- [ ] `.mlc-config.json` — markdown-link-check config; redirect-following; Microsoft Learn ignore patterns; aliveStatusCodes 200/206/3xx (AUDIT-05/CLEAN-07)
- [ ] `.planning/phases/48-*/48-VERIFICATION-broken-links.md` — categorized inventory (Category A/B/C; pre-existing-vs-new) (AUDIT-08/CLEAN-06/CLEAN-07)
- [ ] `.github/workflows/audit-harness-v1.5-integrity.yml` — CI workflow; new file parallel to frozen v1.4.1 yml (AUDIT-06)
- [ ] `scripts/validation/pre-commit-advisory.sh` — tracked reference copy of pre-commit hook (D-20/D-21)
- [ ] BASELINE_9 array refresh in `regenerate-supervision-pins.mjs` line 390 (AUDIT-07)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Pre-commit hook installed in `.git/hooks/pre-commit` | D-21 | `.git/hooks/` is per-clone (gitignored); installation is operator action | After cloning, run `cp scripts/validation/pre-commit-advisory.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit`; verify `git commit` on a staged pinned-file edit emits advisory output without blocking |
| Broken-link inventory category triage decisions | AUDIT-08 | Category triage (A pre-existing v1.0–v1.4.1 / A new) requires human judgment; Phase 48 produces inventory only, Phase 60 second-pass triages | Review `48-VERIFICATION-broken-links.md` after sweep; confirm A/B/C taxonomy applied; triage column intentionally left empty |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter (after planner generates plans aligned with this map)

**Approval:** pending — flips to approved after gsd-plan-checker validates Dimension 8 coverage
