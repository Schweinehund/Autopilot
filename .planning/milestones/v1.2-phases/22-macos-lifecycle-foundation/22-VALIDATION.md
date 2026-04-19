---
phase: 22
slug: macos-lifecycle-foundation
status: draft
nyquist_compliant: false
wave_0_complete: true
created: 2026-04-14
---

# Phase 22 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | none — pure documentation phase |
| **Config file** | none |
| **Quick run command** | `ls docs/macos-lifecycle/00-ade-lifecycle.md docs/reference/macos-commands.md docs/reference/macos-log-paths.md` |
| **Full suite command** | `grep -l "macOS ADE Endpoints" docs/reference/endpoints.md && ls docs/macos-lifecycle/00-ade-lifecycle.md docs/reference/macos-commands.md docs/reference/macos-log-paths.md` |
| **Estimated runtime** | ~1 second |

---

## Sampling Rate

- **After every task commit:** Run file existence check for modified files
- **After every plan wave:** Run full suite command (file existence + content grep)
- **Before `/gsd-verify-work`:** All files exist, content greps pass, manual review complete
- **Max feedback latency:** 1 second

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 22-01-01 | 01 | 1 | MLIF-01 | — | N/A | file+content | `test -f docs/macos-lifecycle/00-ade-lifecycle.md && grep -q "mermaid" docs/macos-lifecycle/00-ade-lifecycle.md` | ❌ W0 | ⬜ pending |
| 22-02-01 | 02 | 1 | MLIF-02 | — | N/A | file+content | `test -f docs/reference/macos-commands.md && grep -q "Synopsis" docs/reference/macos-commands.md` | ❌ W0 | ⬜ pending |
| 22-02-02 | 02 | 1 | MLIF-02 | — | N/A | file+content | `test -f docs/reference/macos-log-paths.md` | ❌ W0 | ⬜ pending |
| 22-03-01 | 03 | 1 | MLIF-03 | — | N/A | content | `grep -q "macOS ADE Endpoints" docs/reference/endpoints.md` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements — no test framework needed for documentation.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| 7-stage ADE narrative correctness | MLIF-01 | Content accuracy requires human review | Confirm: 7 stages present (ABM registration, ADE token sync, enrollment profile assignment, Setup Assistant, Await Configuration, Company Portal, desktop); Mermaid diagram renders; macOS-native terminology throughout |
| macOS commands accuracy | MLIF-02 | Command syntax/output accuracy requires human review | Confirm: Synopsis/Parameters/Output/Examples pattern followed per command; commands are real macOS tools |
| Log paths accuracy | MLIF-02 | Path accuracy requires human review | Confirm: table format matches registry-paths.md; paths are real macOS filesystem locations |
| Endpoint completeness | MLIF-03 | Endpoint list completeness requires human review | Confirm: Apple ADE endpoints present; shared Microsoft endpoints annotated "(shared)"; curl test commands work |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 1s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
