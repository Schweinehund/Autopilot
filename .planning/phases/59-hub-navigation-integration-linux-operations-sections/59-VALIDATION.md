---
phase: 59
slug: hub-navigation-integration-linux-operations-sections
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-01
---

# Phase 59 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js + custom regex validators (`scripts/validation/check-phase-NN.mjs` lineage from Phase 48-58) |
| **Config file** | none — validators are standalone Node scripts |
| **Quick run command** | `node scripts/validation/check-phase-59.mjs` |
| **Full suite command** | `node scripts/validation/v1.5-milestone-audit.mjs --verbose` |
| **Estimated runtime** | ~3-5 seconds (file-reads + regex only; no AST parsing per CONTEXT D-27) |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/validation/check-phase-59.mjs`
- **After every plan wave:** Run `node scripts/validation/v1.5-milestone-audit.mjs --verbose`
- **Before `/gsd-verify-work`:** Full suite must be green (`v1.5-milestone-audit.mjs` exits 0; `check-phase-59.mjs` exits 0; `regenerate-supervision-pins.mjs --self-test` exits 0 per CONTEXT D-29)
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 59-01-01 | 01 | 1 | CLEAN-08 | — | Pre-edit anchor inventory captured per PITFALL-6 | structural | `test -f .planning/phases/59-*/59-ANCHOR-INVENTORY.md` | ❌ W0 | ⬜ pending |
| 59-02-01 | 02 | 2 | CLEAN-08 | — | Linux H2 + 3 sub-tables in docs/index.md per D-01..D-04 | structural | V-59-07 in `check-phase-59.mjs` | ❌ W0 | ⬜ pending |
| 59-02-02 | 02 | 2 | CLEAN-08 | — | Cross-Platform References Linux entries per D-05 | structural | V-59-08 in `check-phase-59.mjs` | ❌ W0 | ⬜ pending |
| 59-02-03 | 02 | 2 | CLEAN-08 | — | LIN-06 NOT surfaced at hub per D-06 (regression-guard) | NEGATIVE | V-59-09 in `check-phase-59.mjs` | ❌ W0 | ⬜ pending |
| 59-03-01 | 03 | 2 | CLEAN-08 | — | ops/00-index.md 4 H2 sections (Co-Mgmt + 3 new) per D-10 | structural | V-59-13 + V-59-14 in `check-phase-59.mjs` | ❌ W0 | ⬜ pending |
| 59-04-01 | 04 | 3 | CLEAN-08 | — | Operations H2 + 4 sub-H3 per D-07..D-09 | structural | V-59-10 + V-59-11 in `check-phase-59.mjs` | ❌ W0 | ⬜ pending |
| 59-04-02 | 04 | 3 | CLEAN-08 | — | NEGATIVE — no "Operational Depth" token per D-08 | NEGATIVE | V-59-12 in `check-phase-59.mjs` | ❌ W0 | ⬜ pending |
| 59-04-03 | 04 | 3 | CLEAN-08 | — | Sub-H3 cells contain hyperlinks (PITFALL-7 link-not-copy) | structural | V-59-15..18 in `check-phase-59.mjs` | ❌ W0 | ⬜ pending |
| 59-04-04 | 04 | 3 | CLEAN-08 | — | NEGATIVE — sub-table rows do NOT verbatim-paste sub-dir blockquote text | NEGATIVE | V-59-19 in `check-phase-59.mjs` | ❌ W0 | ⬜ pending |
| 59-05-01 | 05 | 2 | CLEAN-08 | — | Per-term see-also lines bidirectional reciprocity (D-19 A1+A2+A3) | structural | V-59-20..23 in `check-phase-59.mjs` | ❌ W0 | ⬜ pending |
| 59-05-02 | 05 | 2 | CLEAN-08 | — | NEGATIVE — see-also lines appended INSIDE existing `>` blockquotes | NEGATIVE | V-59-24 in `check-phase-59.mjs` | ❌ W0 | ⬜ pending |
| 59-06-01 | 06 | 2 | CLEAN-08 | — | quick-ref-l1.md Linux H2 + 4 sub-H3 per D-22 | structural | V-59-25 + V-59-27 in `check-phase-59.mjs` | ❌ W0 | ⬜ pending |
| 59-06-02 | 06 | 2 | CLEAN-08 | — | NEGATIVE — no Mode tags / distro tags per D-25 | NEGATIVE | V-59-26 in `check-phase-59.mjs` | ❌ W0 | ⬜ pending |
| 59-07-01 | 07 | 2 | CLEAN-08 | — | quick-ref-l2.md Linux H2 + 4 sub-H3 per D-23 | structural | V-59-28 in `check-phase-59.mjs` | ❌ W0 | ⬜ pending |
| 59-07-02 | 07 | 2 | CLEAN-08 | — | 3-method log-collection literals + Compliance Category Reference 4 categories | structural | V-59-29 + V-59-30 in `check-phase-59.mjs` | ❌ W0 | ⬜ pending |
| 59-07-03 | 07 | 2 | CLEAN-08 | — | NEGATIVE — PITFALL-7 firewall (no Bash syntax / cadence content) | NEGATIVE | V-59-31 in `check-phase-59.mjs` | ❌ W0 | ⬜ pending |
| 59-08-01 | 08 | 4 | CLEAN-08 | — | check-phase-59.mjs exists with 30-36 V-59-NN assertions | structural | `node scripts/validation/check-phase-59.mjs --self-test` | ❌ W0 | ⬜ pending |
| 59-09-01 | 09 | 5 | CLEAN-08 | — | Pre-commit gate (3 validators) all GREEN | integration | `node scripts/validation/check-phase-59.mjs && node scripts/validation/v1.5-milestone-audit.mjs && node scripts/validation/regenerate-supervision-pins.mjs --self-test` | ❌ W0 | ⬜ pending |
| 59-09-02 | 09 | 5 | CLEAN-08 | — | iOS/macOS/Windows/Android H2 anchor stability (regression) | NEGATIVE | V-59-32 in `check-phase-59.mjs` | ❌ W0 | ⬜ pending |
| 59-09-03 | 09 | 5 | CLEAN-08 | — | TBD/TODO/FIXME scan clean across 6 modified files | NEGATIVE | V-59-33..36 in `check-phase-59.mjs` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `scripts/validation/check-phase-59.mjs` — 30-36 V-59-NN structural assertions covering all 4 GAs (created in plan 59-08)
- [ ] `.planning/phases/59-*/59-ANCHOR-INVENTORY.md` — pre-edit anchor inventory artifact per PITFALL-6 (created in plan 59-01)
- [ ] No new framework install required — Node.js + custom regex validators inherited from Phase 48-58 lineage

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hub navigation visual coherence (Linux H2 + Operations H2 read naturally; sub-table row formatting matches Phase 57 Android pattern) | CLEAN-08 SC#1 + SC#4 | Subjective UX evaluation; structural assertions catch presence but not visual alignment | Read `docs/index.md` end-to-end after Phase 59 lands; verify Linux H2 reads parallel to Android H2 lines 167-196; verify Operations H2 sub-H3 framings have consistent voice with existing `### Device Operations` H3 at line 85 |
| Glossary collision-term matrix completeness (D-16 plan-author scope) | CLEAN-08 SC#2 | Plan-author judgment call — collision-term selection is a documented gray area; validator only checks reciprocity for selected terms | Plan 59-05 author writes explicit collision-term matrix as first plan action; reviewer confirms list covers expected ~10-18 terms (Supervision, BYOD, Work Profile, ZTE↔ADE↔Autopilot, COBO/Fully Managed, Encryption triple, Web-app-CA Linux↔iOS, etc.) |
| Operations sub-H3 1-line per-platform summary prose quality | CLEAN-08 SC#1 + PITFALL-7 | Validator V-59-19 only catches verbatim-paste tokens; subtle paraphrasing of sub-dir blockquote prose may slip through | Reviewer reads each Operations sub-H3 row's 1-line summary and confirms it summarizes the destination doc's purpose without copying multi-sentence blockquote prose |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies (3 manual-only behaviors documented above)
- [ ] Sampling continuity: every plan has at least one structural assertion (no 3 consecutive plans without automated verify)
- [ ] Wave 0 covers all MISSING references (`check-phase-59.mjs` is the only Wave 0 dependency — created in plan 59-08)
- [ ] No watch-mode flags (validators are one-shot regex scripts)
- [ ] Feedback latency < 10s (validators are file-reads + regex; no AST, no network)
- [ ] `nyquist_compliant: true` set in frontmatter (after plan-checker approval)

**Approval:** pending
