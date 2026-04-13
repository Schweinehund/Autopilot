---
phase: 15
slug: apv2-admin-setup-guides
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-12
---

# Phase 15 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | N/A — documentation phase, no executable code |
| **Config file** | None applicable |
| **Quick run command** | Manual review of each file against admin-template.md |
| **Full suite command** | Manual review of all 5 files + link verification |
| **Estimated runtime** | ~5 minutes (manual walkthrough) |

---

## Sampling Rate

- **After every task commit:** Verify file follows admin-template.md structure
- **After every plan wave:** Review all files produced in wave for cross-file consistency
- **Before `/gsd-verify-work`:** Full manual checklist below must be green
- **Max feedback latency:** N/A — manual verification

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 15-01-01 | 01 | 1 | ASET-01 | — | N/A | manual | `grep -l "Next step" docs/admin-setup-apv2/00-overview.md` | ❌ W0 | ⬜ pending |
| 15-01-02 | 01 | 1 | ASET-04 | — | N/A | manual | `grep -c "permission" docs/admin-setup-apv2/01-prerequisites-rbac.md` | ❌ W0 | ⬜ pending |
| 15-02-01 | 02 | 1 | ASET-02 | — | N/A | manual | `grep "f1346770" docs/admin-setup-apv2/02-etg-device-group.md` | ❌ W0 | ⬜ pending |
| 15-03-01 | 03 | 2 | ASET-03 | — | N/A | manual | `grep -c "What breaks" docs/admin-setup-apv2/03-device-preparation-policy.md` | ❌ W0 | ⬜ pending |
| 15-04-01 | 04 | 2 | ASET-05 | — | N/A | manual | `grep "enrollment restriction" docs/admin-setup-apv2/04-corporate-identifiers.md` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements. No test framework needed — documentation phase.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Sequential guide completeness | ASET-01 | Requires human walkthrough of guide flow | Follow 00-overview through 04-corporate-identifiers; verify no missing information gaps |
| ETG 4-item checklist accuracy | ASET-02 | Technical content correctness requires domain review | Verify AppID, group type, membership type, owner in checklist |
| All settings have 3-element callouts | ASET-03 | Requires reading each setting's callout structure | Check every configurable setting has admin-sees, user-sees, runbook-link |
| RBAC 5 categories before setup | ASET-04 | Requires verifying section ordering | Confirm RBAC section precedes any setup steps |
| Enrollment restriction interaction | ASET-05 | Requires domain knowledge to verify accuracy | Review conflict precedence rules and APv2 ownership table |

---

## Validation Sign-Off

- [ ] All tasks have manual verification criteria
- [ ] Sampling continuity: manual review after each wave
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency: immediate (manual review per commit)
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
