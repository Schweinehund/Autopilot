---
phase: 12
slug: apv2-failure-index
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-11
---

# Phase 12 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual verification (documentation phase — no code tests) |
| **Config file** | none |
| **Quick run command** | `grep -c "^##" docs/error-codes/06-apv2-device-preparation.md` |
| **Full suite command** | `bash -c 'test -f docs/error-codes/06-apv2-device-preparation.md && grep -q "APv2" docs/error-codes/00-index.md && echo PASS || echo FAIL'` |
| **Estimated runtime** | ~1 seconds |

---

## Sampling Rate

- **After every task commit:** Run `grep -c "^##" docs/error-codes/06-apv2-device-preparation.md`
- **After every plan wave:** Run full suite command
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 2 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 12-01-01 | 01 | 1 | TROU-01 | — | N/A | content | `grep -q "Symptom" docs/error-codes/06-apv2-device-preparation.md` | ❌ W0 | ⬜ pending |
| 12-01-02 | 01 | 1 | NAVG-02 | — | N/A | content | `grep -q "APv2 Failure Scenarios" docs/error-codes/00-index.md` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `docs/error-codes/06-apv2-device-preparation.md` — new file created with failure catalog structure

*Existing infrastructure covers index file — only new catalog file needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Symptom descriptions match Microsoft Learn terminology | TROU-01 | Semantic accuracy check | Compare each symptom against Microsoft Learn troubleshooting FAQ |
| Forward references use correct Phase 13/14 annotation | TROU-01 | Cross-phase consistency | Verify runbook references mention correct phase numbers |
| No hex code tables in APv2 catalog | TROU-01 | Structural constraint | Scan file for hex patterns like `0x8...` — must find none |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 2s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
