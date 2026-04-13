---
phase: 16
slug: apv1-admin-setup-guides
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-13
---

# Phase 16 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual documentation review — no automated test framework applicable |
| **Config file** | None — documentation phase |
| **Quick run command** | `ls docs/admin-setup-apv1/*.md | wc -l` (expect 11) |
| **Full suite command** | Verify all cross-links resolve and all "what breaks" callouts have 3 elements |
| **Estimated runtime** | ~5 seconds (file existence check) |

---

## Sampling Rate

- **After every task commit:** Run `ls docs/admin-setup-apv1/*.md | wc -l`
- **After every plan wave:** Verify all cross-links resolve in created files
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 16-01-01 | 01 | 1 | ADMN-01 | — | N/A | manual | `test -f docs/admin-setup-apv1/00-overview.md` | ❌ W0 | ⬜ pending |
| 16-01-02 | 01 | 1 | ADMN-01 | — | N/A | manual | `test -f docs/admin-setup-apv1/01-hardware-hash-upload.md` | ❌ W0 | ⬜ pending |
| 16-01-03 | 01 | 1 | ADMN-02 | — | N/A | manual | `test -f docs/admin-setup-apv1/02-deployment-profile.md` | ❌ W0 | ⬜ pending |
| 16-01-04 | 01 | 1 | ADMN-03 | — | N/A | manual | `test -f docs/admin-setup-apv1/03-esp-policy.md` | ❌ W0 | ⬜ pending |
| 16-01-05 | 01 | 1 | ADMN-04 | — | N/A | manual | `test -f docs/admin-setup-apv1/04-dynamic-groups.md` | ❌ W0 | ⬜ pending |
| 16-02-01 | 02 | 1 | ADMN-05 | — | N/A | manual | `test -f docs/admin-setup-apv1/05-deployment-modes-overview.md` | ❌ W0 | ⬜ pending |
| 16-02-02 | 02 | 1 | ADMN-05 | — | N/A | manual | `test -f docs/admin-setup-apv1/06-user-driven.md` | ❌ W0 | ⬜ pending |
| 16-02-03 | 02 | 1 | ADMN-05 | — | N/A | manual | `test -f docs/admin-setup-apv1/07-pre-provisioning.md` | ❌ W0 | ⬜ pending |
| 16-02-04 | 02 | 1 | ADMN-05 | — | N/A | manual | `test -f docs/admin-setup-apv1/08-self-deploying.md` | ❌ W0 | ⬜ pending |
| 16-02-05 | 02 | 1 | ADMN-07 | — | N/A | manual | `test -f docs/admin-setup-apv1/09-intune-connector-ad.md` | ❌ W0 | ⬜ pending |
| 16-02-06 | 02 | 1 | ADMN-06 | — | N/A | manual | `test -f docs/admin-setup-apv1/10-config-failures.md` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `docs/admin-setup-apv1/` directory — create directory for all 11 files
- [ ] All 11 files created as part of execution plans

*Existing infrastructure covers all phase requirements — no test framework needed for documentation phase.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hardware hash decision tree routes to correct path | ADMN-01 | Mermaid diagram correctness requires visual review | Open 01-hardware-hash-upload.md, verify flowchart has 3 terminal nodes (OEM, CSV, PowerShell) |
| "What breaks" callouts have all 3 elements | ADMN-02, ADMN-03 | Requires reading prose content | grep for "Admin sees:" and "End user sees:" and "Runbook:" in each file |
| Cross-links resolve to existing files | All | Relative path resolution | grep for `](../` links, verify targets exist |
| Version gate header present on all files | D-17, D-18 | Template compliance | grep for "This guide covers Windows Autopilot (classic)" in all 11 files |
| Config-failures table entries link to L1 runbooks | ADMN-06 | Link target validation | grep for `l1-runbooks/0` in 10-config-failures.md |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
