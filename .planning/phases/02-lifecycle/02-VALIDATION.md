---
phase: 2
slug: lifecycle
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-14
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual review + structural checklist |
| **Config file** | None |
| **Quick run command** | `ls docs/lifecycle/` |
| **Full suite command** | Verify all 6 files exist with correct frontmatter, correct section order, glossary links on first mention |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `ls docs/lifecycle/`
- **After every plan wave:** Manual section-order review against locked 11-section structure
- **Before `/gsd:verify-work`:** Full suite must be green — all 6 files present, frontmatter valid, no inline glossary definitions
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 0 | LIFE-01 | structural | `test -d docs/lifecycle && echo OK` | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 1 | LIFE-02 | structural | `test -f docs/lifecycle/01-hardware-hash.md && grep -c '## Version History' docs/lifecycle/01-hardware-hash.md` | ❌ W0 | ⬜ pending |
| 02-02-02 | 02 | 1 | LIFE-03 | structural | `test -f docs/lifecycle/02-profile-assignment.md && grep -c 'dynamic' docs/lifecycle/02-profile-assignment.md` | ❌ W0 | ⬜ pending |
| 02-02-03 | 02 | 1 | LIFE-04 | structural | `test -f docs/lifecycle/03-oobe.md && grep -c '## Pre-Provisioning' docs/lifecycle/03-oobe.md` | ❌ W0 | ⬜ pending |
| 02-02-04 | 02 | 1 | LIFE-05 | structural | `test -f docs/lifecycle/04-esp.md && grep -c 'Win32' docs/lifecycle/04-esp.md` | ❌ W0 | ⬜ pending |
| 02-02-05 | 02 | 1 | LIFE-06 | structural | `test -f docs/lifecycle/05-post-enrollment.md && grep -c '\- \[ \]' docs/lifecycle/05-post-enrollment.md` | ❌ W0 | ⬜ pending |
| 02-03-01 | 03 | 2 | LIFE-01 | structural | `test -f docs/lifecycle/00-overview.md && grep -c 'mermaid' docs/lifecycle/00-overview.md` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `docs/lifecycle/` — directory must be created before any file authoring tasks

*No test framework install needed — all validation is structural file inspection.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Mermaid diagram shows user-driven, pre-provisioning, and self-deploying as distinct paths | LIFE-01 | Semantic content review | Open overview, verify diagram contains 3 distinct path nodes |
| Hardware hash guide covers all 4 import methods (CSV, OEM, PowerShell, Partner Center) | LIFE-02 | Semantic content review | Read section, confirm all 4 methods named |
| ESP guide separates device phase from user phase clearly | LIFE-05 | Semantic content review | Read guide, confirm both phases documented with distinct boundaries |
| Pre-provisioning is a first-class peer section, not a subsection | LIFE-04 | Heading level review | Verify `## Pre-Provisioning` exists at same heading level as user-driven |
| All glossary terms linked on first mention only | All | Cross-reference check | Compare against `docs/_glossary.md` term list |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
