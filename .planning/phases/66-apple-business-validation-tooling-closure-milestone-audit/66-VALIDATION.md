---
phase: 66
slug: apple-business-validation-tooling-closure-milestone-audit
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-24
---

# Phase 66 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Derived from `66-RESEARCH.md` §"Validation Architecture".

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Custom Node.js validators (`v1.6-milestone-audit.mjs` + `check-phase-NN.mjs` chain) — no external test framework |
| **Config file** | None — validators self-contained; sidecar at `scripts/validation/v1.6-audit-allowlist.json` |
| **Quick run command** | `node scripts/validation/check-phase-66.mjs` |
| **Full suite command** | `node scripts/validation/v1.6-milestone-audit.mjs && node scripts/validation/check-phase-62.mjs && node scripts/validation/check-phase-63.mjs && node scripts/validation/check-phase-64.mjs && node scripts/validation/check-phase-65.mjs && node scripts/validation/check-phase-66.mjs` |
| **Self-test command** | `node scripts/validation/v1.6-milestone-audit.mjs --self-test` |
| **Estimated runtime** | Quick ~5s (warm) / ~30s (cold); Full suite ~30–60s |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/validation/check-phase-66.mjs`
- **After every plan wave:** Run full suite (harness + all 5 chain validators + `--self-test`)
- **Before `/gsd:verify-work`:** Full suite must be green from a FRESH CLONE (D-03 terminal re-audit)
- **Max feedback latency:** ~5s (warm) / ~60s (cold full suite)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 66-01-01 | 01 | 1 | AUDIT-13 / AUDIT-14 | — | V-66-NN assertion menu present; CHAIN_PHASES excludes 66 | unit | `node scripts/validation/check-phase-66.mjs` (V-66-SELF, V-66-CHAIN, V-66-AUDIT) | ❌ W1 creates check-phase-66.mjs | ⬜ pending |
| 66-01-02 | 01 | 1 | AUDIT-14 (C15 staleness) | — | 24 ABAUDIT comments verified load-bearing; orphans removed | unit | `node scripts/validation/check-phase-66.mjs` (V-66-ABAUDIT-STALENESS) | ❌ W1 | ⬜ pending |
| 66-02-01 | 02 | 2 | AUDIT-14 (atomic commit) | T-66-V14 | C11 windowKeywords +6 LOCKED tokens; c13_rotting_external populated; BASELINE_10 freshness; regex-7 back-port — ALL in ONE commit | unit + grep | `node scripts/validation/v1.6-milestone-audit.mjs` (C14/C15/C16 PASS) AND `node scripts/validation/v1.6-milestone-audit.mjs --self-test` AND `git log --name-only -1 HEAD` shows 4–5 files | green at HEAD; harness exists | ⬜ pending |
| 66-02-02 | 02 | 2 | AUDIT-14 (chain green post-atomic) | — | All 5 chain validators exit 0 modulo CHAIN_SKIP {48,51,58,60,61} | unit | full suite command | ✅ chain exists | ⬜ pending |
| 66-03-01 | 03 | 3 | AUDIT-13 / AUDIT-15 (CI workflow) | T-66-V14 | `audit-harness-v1.6-integrity.yml` exists with 14 path-filter entries + 2 crons + new `rotting-external-quarterly` job; PR-blocking preserved | unit | `node scripts/validation/check-phase-66.mjs` (V-66-05) | ❌ W3 creates yml | ⬜ pending |
| 66-03-02 | 03 | 3 | AUDIT-15 (DEFERRED-CLEANUP authoring) | — | `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` exists with CI-1/CI-2/CI-3 + CHAIN_SKIP-CRLF deferred item | unit | `node scripts/validation/check-phase-66.mjs` (V-66-07) | ❌ W3 creates | ⬜ pending |
| 66-04-01 | 04 | 4 | AUDIT-15 (D-03 fresh-clone re-audit) | T-66-V14 | Fresh `gsd-executor` sub-agent spawns; `git clone --no-hardlinks` to `$env:TEMP\v1.6-audit-<rand>`; full validator chain exits 0; CHAIN_SKIP entries documented | subprocess (manual capture) | PowerShell recipe in 66-RESEARCH.md §"Code Examples" Pattern 3 | green from author-env; W4 verifies from fresh clone | ⬜ pending |
| 66-05-01 | 05 | 5 | AUDIT-15 (MILESTONE-AUDIT authoring) | — | `.planning/milestones/v1.6-MILESTONE-AUDIT.md` exists with YAML frontmatter + 39/39 + 5/5 + `performed_by` D-22-INTENT narrative | unit | `node scripts/validation/check-phase-66.mjs` (V-66-06) | ❌ W5 creates | ⬜ pending |
| 66-05-02 | 05 | 5 | AUDIT-15 (traceability closure) | — | PROJECT.md 39 reqs Active→Validated with SHA refs; ROADMAP.md 5/5 phases Complete; STATE.md milestone close | manual + grep | `grep -c '\\[x\\]' .planning/REQUIREMENTS.md` + ROADMAP table inspection | manual at W5 close | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `scripts/validation/check-phase-66.mjs` — does not yet exist; Wave 1 creates as Path-A copy from `check-phase-65.mjs`
- [ ] `.github/workflows/audit-harness-v1.6-integrity.yml` — does not yet exist; Wave 3 deliverable
- [ ] `.planning/milestones/v1.6-MILESTONE-AUDIT.md` — does not yet exist; Wave 5 deliverable
- [ ] `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` — does not yet exist; NEW artifact at Wave 3 (no v1.5 equivalent)

*All other test infrastructure (`v1.6-milestone-audit.mjs`, `check-phase-62..65.mjs`, `v1.6-audit-allowlist.json`) already exists and is green at HEAD per `65-VERIFICATION.md:117-122`.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| D-03 terminal re-audit from fresh `git clone` exits 0 with all expected PASS counts | AUDIT-15 | Requires spawning a fresh `gsd-executor` sub-agent + executing PowerShell `git clone --no-hardlinks` into `$env:TEMP\v1.6-audit-<rand>` + capturing exit codes + cleaning up clone — not reducible to a single CI command | Plan 66-04 task `<action>` block contains the exact PowerShell recipe; executor agent runs it; captures exit codes + summary lines into `v1.6-MILESTONE-AUDIT.md` `mechanical_checks` block |
| PROJECT.md 39 REQ Active→Validated flips with closing commit SHAs | AUDIT-15 / SC#5 | Requires reading post-Wave-2 commit SHAs and authoring per-REQ rows in PROJECT.md Key Decisions table — depends on Wave 2 atomic commit landing first | Plan 66-05 task uses `git log --oneline phase-66/` to enumerate SHAs; updates PROJECT.md inline |
| `c13_rotting_external` quarterly cron job actually fires + reports on schedule | AUDIT-14 / AUDIT-15 | First firing is 2026-07-01 — post-phase-close; cannot validate within Phase 66 | Document in DEFERRED-CLEANUP.md `next_review: 2026-07-01`; v1.7 milestone discuss-phase verifies first-fire artifact |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references (4 files: check-phase-66.mjs + CI yml + MILESTONE-AUDIT.md + DEFERRED-CLEANUP.md)
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s (full suite cold)
- [ ] `nyquist_compliant: true` set in frontmatter after planner approval

**Approval:** pending
