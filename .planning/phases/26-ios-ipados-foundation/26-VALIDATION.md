---
phase: 26
slug: ios-ipados-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-16
---

# Phase 26 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual review (documentation phase — no automated test framework) |
| **Config file** | None — documentation quality validated by success criteria review |
| **Quick run command** | Manual: Open file, read against SC #1-4 checklist |
| **Full suite command** | Manual: Cross-reference all four success criteria and verify anchor targets exist |
| **Estimated runtime** | ~5 minutes per document (manual review) |

---

## Sampling Rate

- **After every task commit:** Read completed document section against its specific success criteria (SC #1-4)
- **After every plan wave:** Full two-document review against all four success criteria
- **Before `/gsd-verify-work`:** Both LIFE-01 and LIFE-02 satisfy all four success criteria
- **Max feedback latency:** N/A (manual review — no automated pipeline)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 26-01-01 | 01 | 1 | LIFE-01 | — | N/A | manual | Verify `docs/ios-lifecycle/00-enrollment-overview.md` exists with frontmatter `platform: iOS` | ❌ W0 | ⬜ pending |
| 26-01-02 | 01 | 1 | LIFE-01 | — | N/A | manual | Verify 5-column comparison table with all 4 enrollment paths as rows | ❌ W0 | ⬜ pending |
| 26-01-03 | 01 | 1 | LIFE-01 | — | N/A | manual | Verify MAM-WE visual separation (horizontal rule or distinct subsection) with "no device enrollment" statement | ❌ W0 | ⬜ pending |
| 26-01-04 | 01 | 1 | LIFE-01 | — | N/A | manual | Verify Supervision dedicated section with enrollment-time constraint and "full device erase" language | ❌ W0 | ⬜ pending |
| 26-01-05 | 01 | 1 | LIFE-01 | — | N/A | manual | Verify per-path `###` anchor headings (#ade, #device-enrollment, #user-enrollment, #mam-we) | ❌ W0 | ⬜ pending |
| 26-02-01 | 02 | 1 | LIFE-02 | — | N/A | manual | Verify `docs/ios-lifecycle/01-ade-lifecycle.md` exists with frontmatter `platform: iOS`, `applies_to: ADE` | ❌ W0 | ⬜ pending |
| 26-02-02 | 02 | 1 | LIFE-02 | — | N/A | manual | Verify 7 stages with 4 subsections each (What the Admin Sees, What Happens, Behind the Scenes, Watch Out For) | ❌ W0 | ⬜ pending |
| 26-02-03 | 02 | 1 | LIFE-02 | — | N/A | manual | Verify Supervision preamble section before Stage 1 with "full device erase" and enrollment-time constraint | ❌ W0 | ⬜ pending |
| 26-02-04 | 02 | 1 | LIFE-02 | — | N/A | manual | Verify Stage 4 uses iOS-specific Setup Assistant panes (Touch ID/Face ID, Screen Time, etc.) — no FileVault | ❌ W0 | ⬜ pending |
| 26-02-05 | 02 | 1 | LIFE-02 | — | N/A | manual | Verify Stage 6 describes Company Portal as VPP App Store app — no DMG/PKG references | ❌ W0 | ⬜ pending |
| 26-02-06 | 02 | 1 | LIFE-02 | — | N/A | manual | Verify Stage 7 describes APNs-only management — no IME, no shell scripts, no dual-channel table | ❌ W0 | ⬜ pending |
| 26-02-07 | 02 | 1 | LIFE-02 | — | N/A | manual | Verify ACME certificate threshold states iOS 16+ (not 13.1+) | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `docs/ios-lifecycle/` directory — must be created (does not yet exist)
- [ ] `docs/ios-lifecycle/00-enrollment-overview.md` — LIFE-01 deliverable
- [ ] `docs/ios-lifecycle/01-ade-lifecycle.md` — LIFE-02 deliverable

*No test infrastructure gaps — this phase produces documentation only; validation is manual review against success criteria.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| SC #1: Admin understands all four enrollment paths from one document | LIFE-01 | Comprehension test — cannot be automated | Read `00-enrollment-overview.md` as target audience; confirm 4-path matrix, supervision column, use case column present |
| SC #2: New team member describes each ADE stage without external sources | LIFE-02 | Self-containment test — requires human judgment | Read `01-ade-lifecycle.md` as a new team member; attempt to describe each stage; verify no external consultation needed |
| SC #3: Supervision constraint stated explicitly | LIFE-01, LIFE-02 | Language verification — specific phrasing required | Locate Supervision sections in both docs; verify "full device erase" (not "wipe"), enrollment-time constraint, Settings > General > About verification |
| SC #4: MAM-WE identified as app-layer model with no device enrollment | LIFE-01 | Separation and clarity test | Verify MAM-WE has distinct visual separation and explicitly states "no device enrollment" |

---

## Validation Sign-Off

- [ ] All tasks have manual verify steps defined
- [ ] Sampling continuity: manual review after each task commit
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5 minutes per document
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
