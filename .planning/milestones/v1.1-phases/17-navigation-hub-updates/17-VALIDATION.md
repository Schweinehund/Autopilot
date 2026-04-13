---
phase: 17
slug: navigation-hub-updates
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-13
---

# Phase 17 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — pure documentation project (Markdown files only) |
| **Config file** | none |
| **Quick run command** | Manual link verification via file reads |
| **Full suite command** | Manual link audit of all 11 modified files |
| **Estimated runtime** | ~30 seconds (file reads and grep checks) |

---

## Sampling Rate

- **After every task commit:** Verify links in modified file via grep/read
- **After every plan wave:** Cross-check all files modified in wave for link consistency
- **Before `/gsd-verify-work`:** Full 11-file link audit must pass
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 17-01-01 | 01 | 1 | NAVG-01 | — | N/A | manual | `grep -c "APv2" docs/index.md` | N/A | ⬜ pending |
| 17-01-02 | 01 | 1 | NAVG-01 | — | N/A | manual | `grep "applies_to:" docs/index.md` | N/A | ⬜ pending |
| 17-02-01 | 02 | 1 | NAVG-03 | — | N/A | manual | `grep -c "l1-runbooks/0[1-5]" docs/common-issues.md` (must be 0 in APv2 section) | N/A | ⬜ pending |
| 17-03-01 | 03 | 1 | NAVG-01 | — | N/A | manual | `grep "Enrollment Time Grouping" docs/_glossary.md` | N/A | ⬜ pending |
| 17-04-01 | 04 | 2 | NAVG-04 | — | N/A | manual | `grep "lifecycle-apv2" docs/lifecycle/00-overview.md` | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements.* No test framework needed — all verification is manual link-checking and grep commands during implementation.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| APv2 sections visually distinct from APv1 in index.md | NAVG-01 | Visual layout distinction cannot be grep-verified | Read index.md, confirm APv2 sections have distinct headers and framework labels |
| 2-click navigation path from index.md to APv2 content | NAVG-01 | Path traversal requires reading linked files | Follow index.md APv2 link → confirm it reaches APv2 content page |
| No cross-contamination in common-issues.md | NAVG-03 | Must verify APv2 section has zero APv1 runbook links | Grep APv2 section for l1-runbooks/01-05 references (must find 0) |
| Bidirectional cross-references complete | NAVG-04 | Must check both directions across 11 files | Spot-check each of 6 APv1 files for APv2 back-link presence |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
