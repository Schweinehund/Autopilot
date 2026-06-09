---
phase: 71
slug: archive-automation-root-cause-fix-pillar-a
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-06-03
---

# Phase 71 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node 20+ stdlib (no external test runner — matches `scripts/validation/*.mjs` precedent) |
| **Config file** | none — same convention as 23 existing `check-phase-NN.mjs` validators |
| **Quick run command** | `node scripts/validation/check-phase-71.mjs` |
| **Full suite command** | `for i in 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71; do node scripts/validation/check-phase-$i.mjs \|\| echo FAIL $i; done` |
| **Estimated runtime** | ~3-5s quick / ~120s full chain |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/validation/check-phase-71.mjs`
- **After Plan 71-01 commit:** Run quick + assert V-71-FIX-01/02 PASS; V-71-MILESTONES-01 + V-71-ARCHIVE02-01 expected FAIL (transient chicken-and-egg per Plan 70-05 Commit A precedent — documented in 71-01-SUMMARY.md)
- **After Plan 71-02 commit:** Run quick + assert ALL V-71-NN PASS (including V-71-MILESTONES-01 + V-71-ARCHIVE02-01 now flipping to PASS post-sweep)
- **After Plan 71-03 commit:** Run full chain `check-phase-{48..71}.mjs` ALL PASS, 0 SKIPPED, 0 FAIL
- **Before `/gsd:verify-work`:** Full chain must be green + v1.7-milestone-audit.mjs 15/15 PASS unchanged (predecessor-byte-unchanged invariant)
- **Max feedback latency:** 5 seconds for quick; 120s for full chain

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 71-01-W1 | 01 | 1 | ARCHIVE-01 | — | Vendored extractor uses anchored `\*\*One-liner:\*\*\s+` regex; captures VALUE not LABEL | unit | `node scripts/archive/extract-summary-oneliners.mjs --self-test` | ❌ W0 (Plan 71-01 creates) | ⬜ pending |
| 71-01-W2 | 01 | 2 | ARCHIVE-01 | — | 3 unit fixtures: label-not-captured / pre-write idempotency / placeholder-allowlist scan | unit | `node scripts/archive/test-extract-oneliner.mjs` | ❌ W0 (Plan 71-01 creates) | ⬜ pending |
| 71-01-W3 | 01 | 3 | ARCHIVE-01 + ARCHIVE-02 | — | check-phase-71.mjs ships with V-71-FIX-01/02 + V-71-MILESTONES-01 + V-71-ARCHIVE02-01 + V-71-CHAIN + V-71-AUDIT + V-71-SELF assertions | integration | `node scripts/validation/check-phase-71.mjs` (transient FAIL on V-71-MILESTONES-01 + V-71-ARCHIVE02-01 expected per Plan 70-05 Commit A precedent) | ❌ W0 (Plan 71-01 creates) | ⬜ pending |
| 71-01-W4 | 01 | 4 | ARCHIVE-01 | — | Atomic 3-file commit lands in ONE SHA per SC#4 + Phase 67 Plan 67-02 `55260b3` precedent | git assertion | `git log --name-only -1 HEAD \| wc -l` ≥ 3 + all 3 files in single SHA | N/A | ⬜ pending |
| 71-02-W1 | 02 | 1 | ARCHIVE-02 | — | v1.1 H2 entry in MILESTONES.md re-authored from `v1.1-MILESTONE-AUDIT.md` source-of-truth; `- Edit 1 --` line 164 residue replaced | source assertion | `grep -c "^- Edit 1 --" .planning/MILESTONES.md` returns 0 | ✅ (file exists) | ⬜ pending |
| 71-02-W2 | 02 | 1 | ARCHIVE-02 | — | v1.2 H2 entry in MILESTONES.md re-authored from `v1.2-MILESTONE-AUDIT.md` source-of-truth; lines 145-148 residue replaced | source assertion | `grep -cE "^- (One-liner:\|Commit:)" .planning/MILESTONES.md` returns 0 | ✅ (file exists) | ⬜ pending |
| 71-02-W3 | 02 | 2 | ARCHIVE-02 | — | V-71-MILESTONES-01 flips PASS post-sweep; V-71-ARCHIVE02-01 PASS | integration | `node scripts/validation/check-phase-71.mjs` exits 0 | ✅ (created Plan 71-01) | ⬜ pending |
| 71-02-W4 | 02 | 2 | ARCHIVE-02 | — | Predecessor byte-unchanged invariant: v1.4/v1.5/v1.6/v1.7 workflows + harnesses + sidecars unchanged | git assertion | `git diff <Plan 71-01 SHA> HEAD -- .github/workflows/audit-harness-v1.{4,5,6,7}-integrity.yml scripts/validation/v1.{4,5,6,7}*.{mjs,json}` returns EMPTY | N/A | ⬜ pending |
| 71-03-W1 | 03 | 1 | ARCHIVE-01 + ARCHIVE-02 | — | Full chain check-phase-{48..71}.mjs ALL PASS, 0 SKIPPED, 0 FAIL | integration | `for i in 48..71; do node scripts/validation/check-phase-$i.mjs; done` ALL exit 0 | ✅ | ⬜ pending |
| 71-03-W2 | 03 | 1 | ARCHIVE-01 + ARCHIVE-02 | — | v1.7-milestone-audit.mjs 15/15 PASS unchanged | integration | `node scripts/validation/v1.7-milestone-audit.mjs` exits 0 with 15 PASS | ✅ | ⬜ pending |
| 71-03-W3 | 03 | 2 | ARCHIVE-01 + ARCHIVE-02 | — | 71-VERIFICATION.md authored with SC#1-4 satisfaction + Plan 71-01 atomic SHA recorded (SC#4 byte-exact) | source assertion | grep `## Section D Atomic-Commit SHA Record` in 71-VERIFICATION.md returns match | N/A | ⬜ pending |
| 71-03-W4 | 03 | 3 | ARCHIVE-01 + ARCHIVE-02 | — | Traceability closure: PROJECT.md ARCHIVE-01+02 Active→Validated with closing SHAs; REQUIREMENTS.md Traceability table updated; STATE.md progress; ROADMAP.md Phase 71 row Complete | source assertion | grep "ARCHIVE-01" + "ARCHIVE-02" both appear in PROJECT.md Validated section | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `scripts/archive/extract-summary-oneliners.mjs` — NEW vendored extractor (created Plan 71-01)
- [ ] `scripts/archive/test-extract-oneliner.mjs` — NEW unit-test fixture (created Plan 71-01)
- [ ] `scripts/validation/check-phase-71.mjs` — NEW chain validator (created Plan 71-01)

Note: No external test framework install required — Node 20+ stdlib only, matching the 23 existing `check-phase-NN.mjs` precedent. `scripts/archive/` joins `scripts/validation/_lib/` (Phase 68) as the second `_lib/`-class subtree.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| v1.1 + v1.2 H2 re-authored content reads as coherent narrative (not just placeholder-token-free) | ARCHIVE-02 | Subjective bullet-quality assessment requires human reviewer of `v1.1-MILESTONE-AUDIT.md` + `v1.2-MILESTONE-AUDIT.md` source-of-truth derivation | Read Plan 71-02 commit diff against `v1.1-MILESTONE-AUDIT.md` + `v1.2-MILESTONE-AUDIT.md` to confirm bullets accurately reflect milestone accomplishments |
| Vendored extractor regex matches ALL legitimate SUMMARY.md inline-bold-label patterns (no false negatives) | ARCHIVE-01 | Edge cases like markdown-link labels `**[One-liner:](anchor)**` or multi-line headers may exist; planner verifies with grep-pass over all 97 SUMMARY.md files at Plan 71-01 Wave 1 | `find .planning/milestones -name "*-SUMMARY.md" -exec grep -L "\*\*One-liner:\*\* " {} \;` returns empty (every SUMMARY has matchable pattern); manual review of any exceptions |
| Phase 74 HARNESS-12 pre-write integration | ARCHIVE-01 | Cross-phase coordination — Phase 74 plan-phase must add Wave-1 invocation of vendored extractor before `/gsd:complete-milestone v1.8` | Phase 74 plan author reads 71-CONTEXT.md "Coordination flag for Phase 74" + 71-RESEARCH.md cross-plan coordination section; Plan 74-NN includes the pre-write task |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies (mapped above)
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify (Plan 71-01 W3 + 71-02 W3 + 71-03 W1 all run check-phase-71.mjs)
- [ ] Wave 0 covers all MISSING references (3 NEW files created by Plan 71-01)
- [ ] No watch-mode flags (all commands one-shot)
- [ ] Feedback latency < 5s for quick / < 120s for full chain
- [ ] `nyquist_compliant: true` set in frontmatter (TODO after Wave 0 complete)

**Approval:** pending
