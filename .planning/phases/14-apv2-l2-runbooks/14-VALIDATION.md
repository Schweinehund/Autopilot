---
phase: 14
slug: apv2-l2-runbooks
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-04-12
---

# Phase 14 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | grep/file-existence checks (documentation project — no runtime tests) |
| **Config file** | none |
| **Quick run command** | `ls docs/l2-runbooks/06-apv2-log-collection.md docs/l2-runbooks/07-apv2-event-ids.md docs/l2-runbooks/08-apv2-deployment-report.md 2>/dev/null` |
| **Full suite command** | `grep -l "applies_to: APv2" docs/l2-runbooks/0[6-8]*.md && grep -c "APv2" docs/l2-runbooks/00-index.md` |
| **Estimated runtime** | ~1 second |

---

## Sampling Rate

- **After every task commit:** Verify target file exists and contains required sections
- **After every plan wave:** Run full suite command + cross-reference link validation
- **Before `/gsd-verify-work`:** All files exist, frontmatter correct, links resolve
- **Max feedback latency:** 2 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 14-01-01 | 01 | 1 | TROU-04 | — | N/A | file-check | `test -f docs/l2-runbooks/06-apv2-log-collection.md` | ❌ W0 | ⬜ pending |
| 14-01-02 | 01 | 1 | TROU-04 | — | N/A | grep | `grep -q "MDM Diagnostic Tool" docs/l2-runbooks/06-apv2-log-collection.md` | ❌ W0 | ⬜ pending |
| 14-01-03 | 01 | 1 | TROU-04 | — | N/A | grep | `grep -q "BootstrapperAgent" docs/l2-runbooks/06-apv2-log-collection.md` | ❌ W0 | ⬜ pending |
| 14-02-01 | 01 | 1 | TROU-04 | — | N/A | file-check | `test -f docs/l2-runbooks/07-apv2-event-ids.md` | ❌ W0 | ⬜ pending |
| 14-02-02 | 01 | 1 | TROU-04 | — | N/A | grep | `grep -q "MEDIUM" docs/l2-runbooks/07-apv2-event-ids.md` | ❌ W0 | ⬜ pending |
| 14-03-01 | 02 | 1 | TROU-05 | — | N/A | file-check | `test -f docs/l2-runbooks/08-apv2-deployment-report.md` | ❌ W0 | ⬜ pending |
| 14-03-02 | 02 | 1 | TROU-05 | — | N/A | grep | `grep -q "Intune admin center" docs/l2-runbooks/08-apv2-deployment-report.md` | ❌ W0 | ⬜ pending |
| 14-04-01 | 01 | 1 | TROU-04 | — | N/A | grep | `grep -q "APv2" docs/l2-runbooks/00-index.md` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements — documentation files validated via grep/file-existence checks.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Cross-reference links resolve | TROU-04, TROU-05 | Relative markdown links validated by reading target | Click each `../` link in new files, verify target exists |
| Triage block matches Phase 13 escalation criteria | TROU-04 | Content accuracy vs L1 runbook data | Compare triage block data list against L1 runbook escalation sections |
| Deployment report status values are complete | TROU-05 | Accuracy vs live Intune portal | Compare table against Microsoft Learn docs |

---

## Validation Sign-Off

- [x] All tasks have automated verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 2s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
