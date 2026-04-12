---
phase: 6
slug: l2-runbooks
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-21
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — phase produces only Markdown documentation |
| **Config file** | N/A |
| **Quick run command** | N/A |
| **Full suite command** | N/A |
| **Estimated runtime** | N/A |

---

## Sampling Rate

- **After every task commit:** Manual review of file against requirement success criteria
- **After every plan wave:** Full checklist review against all 5 L2RB requirements
- **Before `/gsd:verify-work`:** All 6 files created, all forward-links resolved, all success criteria met
- **Max feedback latency:** N/A (documentation phase)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 06-01-01 | 01 | 1 | L2RB-01 | manual review | N/A — documentation review | ❌ W0 | ⬜ pending |
| 06-02-01 | 02 | 1 | L2RB-02 | manual review | N/A — documentation review | ❌ W0 | ⬜ pending |
| 06-03-01 | 03 | 1 | L2RB-03 | manual review | N/A — documentation review | ❌ W0 | ⬜ pending |
| 06-04-01 | 04 | 1 | L2RB-04 | manual review | N/A — documentation review | ❌ W0 | ⬜ pending |
| 06-05-01 | 05 | 1 | L2RB-05 | link audit | N/A — manual check for `../reference/` links | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements — no automated test framework needed for documentation-only phase.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Log collection guide covers all 5 D-05 items | L2RB-01 | Documentation content review | Verify mdmdiagnosticstool, 4 Event Viewer exports, Get-AutopilotLogs, registry snapshot, naming convention |
| ESP deep-dive documents device/user phase registry separately | L2RB-02 | Documentation content review | Verify separate sections for device phase and user phase registry keys, LOB+Win32 conflict indicators |
| TPM runbook has hardware-specific error codes with firmware paths | L2RB-03 | Documentation content review | Verify chipset-specific error codes and firmware update paths per affected chipset |
| Hybrid join covers ODJ Connector prerequisites and 0x80070774 | L2RB-04 | Documentation content review | Verify ODJ Connector version 6.2501.2000.5, prerequisite list, 0x80070774 failure mode |
| All L2 runbooks link to Phase 1 refs, no inline duplication | L2RB-05 | Link audit | Grep for `../reference/` links in each runbook; grep for duplicated registry paths |

---

## Validation Sign-Off

- [ ] All tasks have manual verify criteria defined
- [ ] Sampling continuity: every task has explicit review checklist
- [ ] Wave 0: N/A — documentation phase
- [ ] No watch-mode flags
- [ ] Feedback latency: N/A
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
