---
phase: 18
slug: stale-cross-reference-cleanup
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-13
---

# Phase 18 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual verification + grep |
| **Config file** | None — no test framework needed |
| **Quick run command** | `grep -rn "coming in Phase 16\|Phase 15\|decision-flowchart" docs/` |
| **Full suite command** | See Per-Task Verification Map below (5 grep commands) |
| **Estimated runtime** | ~2 seconds |

---

## Sampling Rate

- **After every task commit:** Run `grep -rn "coming in Phase 16\|Phase 15\|decision-flowchart" docs/`
- **After every plan wave:** Run all 5 verification commands from the Per-Task Verification Map
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 2 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 18-01-01 | 01 | 1 | TROU-01, NAVG-02 | — | N/A | smoke | `grep "06-apv2-device-preparation.md" docs/error-codes/00-index.md` | Yes | ⬜ pending |
| 18-01-02 | 01 | 1 | TROU-01 | — | N/A | smoke | `grep "coming in Phase 16" docs/admin-setup-apv2/*.md` (expect 0 matches) | Yes | ⬜ pending |
| 18-01-03 | 01 | 1 | TROU-01 | — | N/A | smoke | `grep "Phase 15" docs/lifecycle-apv2/03-automatic-mode.md` (expect 0 matches) | Yes | ⬜ pending |
| 18-01-04 | 01 | 1 | NAVG-02 | — | N/A | smoke | `grep "decision-flowchart" docs/admin-setup-apv1/00-overview.md` (expect 0 matches) | Yes | ⬜ pending |
| 18-01-05 | 01 | 1 | NAVG-02 | — | N/A | smoke | `grep "lifecycle-apv2/00-overview.md" docs/index.md` (expect 1 match) | Yes | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test framework installation required — grep against source files is sufficient for this documentation-only phase.

---

## Manual-Only Verifications

All phase behaviors have automated verification via grep commands.

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 2s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
