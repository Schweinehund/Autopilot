---
phase: 11
slug: apv2-lifecycle-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-11
---

# Phase 11 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual content review + Mermaid syntax check |
| **Config file** | none |
| **Quick run command** | Open rendered Mermaid in GitHub or mermaid.live |
| **Full suite command** | Read through all 6 files checking cross-links resolve |
| **Estimated runtime** | ~60 seconds (manual review) |

---

## Sampling Rate

- **After every task commit:** Verify file exists and frontmatter is valid
- **After every plan wave:** Read all modified files, check cross-links resolve
- **Before `/gsd-verify-work`:** Full suite must be green — all files exist, all links resolve, all Mermaid renders
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 11-01-01 | 01 | 1 | LIFE-01 | — | N/A | manual | `test -f docs/lifecycle-apv2/00-overview.md` | ❌ W0 | ⬜ pending |
| 11-01-02 | 01 | 1 | LIFE-02 | — | N/A | manual | `test -f docs/lifecycle-apv2/01-prerequisites.md` | ❌ W0 | ⬜ pending |
| 11-01-03 | 01 | 1 | LIFE-01 | — | N/A | manual | `test -f docs/lifecycle-apv2/02-deployment-flow.md` | ❌ W0 | ⬜ pending |
| 11-01-04 | 01 | 1 | LIFE-04 | — | N/A | manual | `test -f docs/lifecycle-apv2/03-automatic-mode.md` | ❌ W0 | ⬜ pending |
| 11-02-01 | 02 | 1 | — | — | N/A | manual | `test -f docs/_templates/admin-template.md` | ❌ W0 | ⬜ pending |
| 11-03-01 | 03 | 1 | LIFE-03 | — | N/A | manual | `grep -l "decision flowchart" docs/apv1-vs-apv2.md` | ✅ exists | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `docs/lifecycle-apv2/` directory — create new directory for APv2 lifecycle files
- [ ] `docs/lifecycle-apv2/00-overview.md` — APv2 model explanation (LIFE-01)
- [ ] `docs/lifecycle-apv2/01-prerequisites.md` — prerequisites checklist (LIFE-02)
- [ ] `docs/lifecycle-apv2/02-deployment-flow.md` — 10-step flow with Mermaid (LIFE-01)
- [ ] `docs/lifecycle-apv2/03-automatic-mode.md` — automatic mode docs (LIFE-04)
- [ ] `docs/_templates/admin-template.md` — admin template (Phase 16 dependency)

*Existing infrastructure covers `docs/apv1-vs-apv2.md` (extend only).*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| ETG shown as central mechanism in Mermaid diagram | LIFE-01 | Mermaid content quality requires visual review | Open `02-deployment-flow.md` in GitHub preview; verify ETG node is prominent and labeled |
| APv1 deregistration is FIRST prerequisite | LIFE-02 | Ordering is semantic, not testable by existence | Read `01-prerequisites.md`; confirm item 0 is APv1 deregistration with warning callout |
| Decision flowchart logic is correct | LIFE-03 | Decision tree correctness requires domain review | Render Mermaid in `apv1-vs-apv2.md`; walk each branch against Microsoft Learn compare page |
| Preview caveats have double coverage | LIFE-04 | Top banner + inline callouts require visual check | Read `03-automatic-mode.md`; verify top blockquote AND per-section inline callouts present |
| Cross-links resolve bidirectionally | All | Link resolution requires file system context | Click every internal link in all 6 files; verify target exists and links back |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
