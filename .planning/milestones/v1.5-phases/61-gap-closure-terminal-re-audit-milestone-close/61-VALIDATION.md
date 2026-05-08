---
phase: 61
slug: gap-closure-terminal-re-audit-milestone-close
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-07
---

# Phase 61 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution. Phase 61 is a closing/traceability phase — validation infrastructure is the existing v1.5 harness suite + per-phase chain validators, not a code-test framework.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node ESM validators (`scripts/validation/*.mjs` — file-reads-only, regex-based, no shared module per Phase 48 D-25 lineage) |
| **Config file** | `scripts/validation/v1.5-audit-allowlist.json` (sidecar) |
| **Quick run command** | `node scripts/validation/check-phase-61.mjs` (post-Plan-61-05 ship) |
| **Full suite command** | `node scripts/validation/v1.5-milestone-audit.mjs && for n in 48 49 51 52 53 54 55 56 57 58 59 60 61; do node scripts/validation/check-phase-${n}.mjs || exit 1; done && node scripts/validation/regenerate-supervision-pins.mjs --self-test` |
| **Estimated runtime** | ~30-60 seconds (full chain) |

---

## Sampling Rate

- **After every task commit:** Run the relevant `check-phase-NN.mjs` for any phase whose validators may have been touched (Plan 61-01 → re-run check-phase-53 + check-phase-60 after V-53-06+22 refresh)
- **After every plan close:** Run `node scripts/validation/v1.5-milestone-audit.mjs --verbose` to confirm 12/12 PASS preserved
- **Before Plan 61-05 close gate:** Full suite must be green (master harness exit 0 + all chain validators 48-60 exit 0 + check-phase-61.mjs exit 0 + regenerate-supervision-pins.mjs --self-test exit 0)
- **Max feedback latency:** ~60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 61-01-01 | 01 | 1 | (alignment + UX) | — | check-phase-53 V-53-06 + V-53-22 PASS post-refresh | structural | `node scripts/validation/check-phase-53.mjs` | ✅ | ⬜ pending |
| 61-01-02 | 01 | 1 | (chain regression close) | — | check-phase-60.mjs V-60-16 PASS post-refresh | structural | `node scripts/validation/check-phase-60.mjs` | ✅ | ⬜ pending |
| 61-01-03 | 01 | 1 | (UX completion) | — | docs/index.md jump-link list ≥7 bullets | structural | `grep -c "^\\- \\[" docs/index.md` (≥7 expected post-fix) | ✅ | ⬜ pending |
| 61-01-04 | 01 | 1 | (regression-guard) | — | check-phase-59.mjs all PASS post-edit | structural | `node scripts/validation/check-phase-59.mjs` | ✅ | ⬜ pending |
| 61-02-01 | 02 | 2 | (44 reqs) | — | REQUIREMENTS.md `[ ]` count == active-deferrals only | structural | `grep -c "^\\- \\[ \\]" .planning/REQUIREMENTS.md` (≤6 from §Future Requirements) | ✅ | ⬜ pending |
| 61-02-02 | 02 | 2 | (traceability) | — | All flipped reqs have inline traceability comment matching CLEAN-05 line-17 pattern | structural | `grep -E "^\\- \\[x\\] \\*\\*[A-Z]+-[0-9]+\\*\\*.*completed.*Phase" .planning/REQUIREMENTS.md \| wc -l` (≥44 expected) | ✅ | ⬜ pending |
| 61-02-03 | 02 | 2 | (ROADMAP refresh) | — | Phase 48/49/50/56 §Progress rows reflect actual completion state | structural | `grep -E "^\\| (48\\\|49\\\|50\\\|56)\\." .planning/ROADMAP.md` (Status field == Complete + completion date populated) | ✅ | ⬜ pending |
| 61-03-01 | 03 | 3 | (PROJECT.md migration) | — | All v1.5 reqs in §Validated section + closed-deferred-items subsection exists | structural | `grep -c "^### Validated" .planning/PROJECT.md` ≥1 + new "Closed Deferred Items (v1.4.1 → v1.5)" subsection present | ✅ | ⬜ pending |
| 61-04-01 | 04 | 4 | (audit doc) | — | v1.5-MILESTONE-AUDIT.md created with v1.4 frontmatter + 4 v1.5 body sections | structural | `test -f .planning/milestones/v1.5-MILESTONE-AUDIT.md && grep -c "^## " .planning/milestones/v1.5-MILESTONE-AUDIT.md` ≥4 expected | ✅ | ⬜ pending |
| 61-04-02 | 04 | 4 | (terminal re-audit) | — | Fresh-worktree harness exit 0 + 12/12 PASS + chain validators all exit 0 | structural | `node scripts/validation/v1.5-milestone-audit.mjs && echo PASS` from fresh worktree | ✅ | ⬜ pending |
| 61-04-03 | 04 | 4 | (auditor-independence) | — | Auditor agent ID distinct from Plans 61-01..03 author-agents; recorded in audit-doc body | structural | grep "Auditor-Independence Verification" .planning/milestones/v1.5-MILESTONE-AUDIT.md | ✅ | ⬜ pending |
| 61-04-04 | 04 | 4 | (AUDIT-08 flip) | — | AUDIT-08 checkbox flipped to `[x]` post-audit-doc-creation | structural | `grep "AUDIT-08.*\\[x\\]" .planning/REQUIREMENTS.md` | ✅ | ⬜ pending |
| 61-05-01 | 05 | 5 | (MILESTONES append) | — | MILESTONES.md has v1.5 entry as top section | structural | `head -3 .planning/MILESTONES.md \| grep -c "v1\\.5"` ≥1 | ✅ | ⬜ pending |
| 61-05-02 | 05 | 5 | (validator-as-deliverable) | — | check-phase-61.mjs exists + ~15-20 V-61-NN assertions | structural | `test -f scripts/validation/check-phase-61.mjs && grep -c "V-61-" scripts/validation/check-phase-61.mjs` ≥15 | ✅ | ⬜ pending |
| 61-05-03 | 05 | 5 | (close gate) | — | check-phase-61.mjs exits 0 with all V-61-NN PASS | structural | `node scripts/validation/check-phase-61.mjs` | ✅ | ⬜ pending |
| 61-05-04 | 05 | 5 | (CI registration) | — | check-phase-61.mjs slot exists in audit-harness-v1.5-integrity.yml (per RESEARCH.md Open Question 1) | structural | `grep -c "check-phase-61" .github/workflows/audit-harness-v1.5-integrity.yml` ≥1 | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing validator infrastructure covers all Phase 61 verification surfaces. No Wave 0 framework install needed — `scripts/validation/v1.5-milestone-audit.mjs` + chain validators already present.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Auditor-independence rule (Plan 61-04 fresh-worktree spawn distinct from Plans 61-01..03 author-agents) | Phase 61 SC#1 + CONTEXT D-22 | Agent identity is a process property, not file-content property; harness cannot detect agent ID | Plan 61-04 records auditor agent ID + worktree path + branch + spawn timestamp in v1.5-MILESTONE-AUDIT.md `## Auditor-Independence Verification` body section per CONTEXT D-15 |
| 3-pillar narrative completeness in v1.5-MILESTONE-AUDIT.md body | Phase 61 SC#2 + CONTEXT D-15 | Narrative quality is qualitative; harness can detect section presence but not coherence | Plan 61-04 author reviews body sections against PROJECT.md:177-202 v1.5 scope statement; check-phase-61.mjs V-61-13..16 confirms section presence only |

---

## Validation Sign-Off

- [ ] All tasks have automated structural verify (no Wave 0 needed)
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify (15 tasks, all automated)
- [ ] Wave 0 covers all MISSING references (N/A — no missing refs)
- [ ] No watch-mode flags (validators are one-shot CLI)
- [ ] Feedback latency < 60s (full chain ~30-60s; per-validator ~5s)
- [ ] `nyquist_compliant: true` set in frontmatter (flip after Plan 61-05 close gate)

**Approval:** pending
