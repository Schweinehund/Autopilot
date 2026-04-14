---
phase: 21
slug: windows-operational-gaps
status: approved
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-13
---

# Phase 21 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual verification + grep/file-existence checks |
| **Config file** | none — documentation-only phase |
| **Quick run command** | `ls docs/device-operations/ docs/reference/ && echo "files exist"` |
| **Full suite command** | `grep -rl "platform: Windows" docs/device-operations/ docs/reference/ | wc -l` |
| **Estimated runtime** | ~2 seconds |

---

## Sampling Rate

- **After every task commit:** Run quick file-existence check
- **After every plan wave:** Run full suite (frontmatter + cross-reference validation)
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 21-01-01 | 01 | 1 | WDLC-01 | — | N/A | file-check | `test -f docs/device-operations/01-autopilot-reset.md` | ❌ W0 | ⬜ pending |
| 21-01-02 | 01 | 1 | WDLC-02 | — | N/A | file-check | `test -f docs/device-operations/02-retire-wipe.md` | ❌ W0 | ⬜ pending |
| 21-01-03 | 01 | 1 | WDLC-03 | — | N/A | file-check | `test -f docs/device-operations/03-re-provisioning.md` | ❌ W0 | ⬜ pending |
| 21-01-04 | 01 | 1 | WDLC-04 | — | N/A | file-check | `test -f docs/device-operations/04-tenant-migration.md` | ❌ W0 | ⬜ pending |
| 21-02-01 | 02 | 1 | WINF-01 | — | N/A | grep | `grep -l "platform: Windows" docs/reference/network-infrastructure.md` | ❌ W0 | ⬜ pending |
| 21-02-02 | 02 | 1 | WINF-02 | — | N/A | grep | `grep -l "Entra ID" docs/reference/entra-prerequisites.md` | ❌ W0 | ⬜ pending |
| 21-02-03 | 02 | 1 | WINF-03 | — | N/A | grep | `grep -l "licensing" docs/reference/licensing-matrix.md` | ❌ W0 | ⬜ pending |
| 21-02-04 | 02 | 1 | WINF-04 | — | N/A | grep | `grep -l "Win32" docs/reference/win32-app-packaging.md` | ❌ W0 | ⬜ pending |
| 21-02-05 | 02 | 1 | WINF-05 | — | N/A | grep | `grep -l "ESP" docs/reference/esp-timeout-tuning.md` | ❌ W0 | ⬜ pending |
| 21-03-01 | 03 | 1 | WSEC-01 | — | N/A | grep | `grep -l "Conditional Access" docs/reference/ca-enrollment-timing.md` | ❌ W0 | ⬜ pending |
| 21-03-02 | 03 | 1 | WSEC-02 | — | N/A | grep | `grep -l "security baseline" docs/reference/security-baseline-conflicts.md` | ❌ W0 | ⬜ pending |
| 21-03-03 | 03 | 1 | WSEC-03 | — | N/A | grep | `grep -l "compliance" docs/reference/compliance-timing.md` | ❌ W0 | ⬜ pending |
| 21-04-01 | 04 | 1 | WMIG-01 | — | N/A | grep | `grep -l "APv1" docs/reference/apv1-apv2-migration.md` | ❌ W0 | ⬜ pending |
| 21-04-02 | 04 | 1 | WMIG-02 | — | N/A | grep | `grep -l "imaging" docs/reference/imaging-to-autopilot.md` | ❌ W0 | ⬜ pending |
| 21-04-03 | 04 | 1 | WMIG-03 | — | N/A | grep | `grep -l "GPO" docs/reference/gpo-to-intune.md` | ❌ W0 | ⬜ pending |
| 21-05-01 | 05 | 1 | WMON-01 | — | N/A | grep | `grep -l "deployment report" docs/reference/deployment-reporting.md` | ❌ W0 | ⬜ pending |
| 21-05-02 | 05 | 1 | WMON-02 | — | N/A | grep | `grep -l "drift" docs/reference/drift-detection.md` | ❌ W0 | ⬜ pending |
| 21-05-03 | 05 | 1 | WMON-03 | — | N/A | grep | `grep -l "new batch" docs/reference/new-batch-workflow.md` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `docs/device-operations/` directory — create folder structure
- [ ] `docs/device-operations/00-overview.md` — overview/index per D-06 convention

*Existing infrastructure covers test framework requirements — documentation-only phase uses file-existence and grep checks.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Cross-references resolve correctly | All | Link targets may not exist until full wave completes | After each wave, click-test all relative links in new docs |
| Decision tree routing accuracy | WDLC-02 | Logic flow requires human judgment verification | Walk through tree with 3 test scenarios |
| Navigation hub accessibility | All | Two-click reachability from index.md | Verify each new doc reachable from index.md in ≤2 clicks |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-04-13
