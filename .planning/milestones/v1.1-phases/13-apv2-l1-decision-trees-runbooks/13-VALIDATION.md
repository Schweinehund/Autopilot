---
phase: 13
slug: apv2-l1-decision-trees-runbooks
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-12
---

# Phase 13 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — documentation-only phase |
| **Config file** | None |
| **Quick run command** | `find docs/decision-trees/ docs/l1-runbooks/ -name "*.md" -newer docs/error-codes/06-apv2-device-preparation.md` |
| **Full suite command** | Manual review against checklist below |
| **Estimated runtime** | ~5 seconds (file existence + grep checks) |

---

## Sampling Rate

- **After every task commit:** Verify file exists at correct path and frontmatter is present
- **After every plan wave:** Full manual review — trace decision tree paths; verify all runbook links resolve; confirm no PowerShell/registry content in L1 files
- **Before `/gsd-verify-work`:** All new files link-check passes, all "(Phase 13)" placeholders in `06-apv2-device-preparation.md` replaced with real links

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 13-01-01 | 01 | 1 | TROU-02 | — | N/A | manual | Review `04-apv2-triage.md` Mermaid — count nodes from entry to any terminal ≤ 3 | ❌ W0 | ⬜ pending |
| 13-01-02 | 01 | 1 | TROU-02 | — | N/A | manual | Trace Mermaid `APD1 Yes` path → APv1 conflict runbook link | ❌ W0 | ⬜ pending |
| 13-01-03 | 01 | 1 | TROU-03 | — | N/A | automated | `grep -ci "powershell\|registry\|reg \|HKLM\|HKCU" docs/l1-runbooks/06-apv2-deployment-not-launched.md` (expect 0) | ❌ W0 | ⬜ pending |
| 13-01-04 | 01 | 1 | TROU-03 | — | N/A | automated | `grep -ci "powershell\|registry\|reg \|HKLM\|HKCU" docs/l1-runbooks/07-apv2-apps-not-installed.md` (expect 0) | ❌ W0 | ⬜ pending |
| 13-01-05 | 01 | 1 | TROU-03 | — | N/A | automated | `grep -ci "powershell\|registry\|reg \|HKLM\|HKCU" docs/l1-runbooks/08-apv2-apv1-conflict.md` (expect 0) | ❌ W0 | ⬜ pending |
| 13-01-06 | 01 | 1 | TROU-03 | — | N/A | automated | `grep -ci "powershell\|registry\|reg \|HKLM\|HKCU" docs/l1-runbooks/09-apv2-deployment-timeout.md` (expect 0) | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements. No test framework or fixtures needed — all validation is file existence checks and grep commands runnable once files exist.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Decision tree routes to correct runbook within 3 steps | TROU-02 | Mermaid graph traversal requires human review | Trace each entry→terminal path in `04-apv2-triage.md` diagram; count decision nodes; verify ≤ 3 |
| "Did ESP display? Yes" routes to APv1 conflict runbook | TROU-02 | Semantic link correctness | Follow `APD1 --Yes-->` path; confirm terminal links to `08-apv2-apv1-conflict.md` |
| Forward references in Phase 12 catalog updated to real links | TROU-02, TROU-03 | Link correctness in existing file | Verify no remaining "(Phase 13)" placeholders in `06-apv2-device-preparation.md`; all links resolve |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
