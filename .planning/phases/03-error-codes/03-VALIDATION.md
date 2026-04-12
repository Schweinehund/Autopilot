---
phase: 3
slug: error-codes
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-14
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — documentation phase (Markdown content) |
| **Config file** | N/A |
| **Quick run command** | N/A — no automated test for Markdown content |
| **Full suite command** | N/A |
| **Estimated runtime** | N/A |

---

## Sampling Rate

- **After every task commit:** Manual review — verify table structure, column count, link syntax
- **After every plan wave:** Manual review — verify cross-references, escalation keywords, mode tags
- **Before `/gsd:verify-work`:** Full content review must confirm all success criteria
- **Max feedback latency:** N/A — documentation phase

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| TBD | 01 | 1 | ERRC-01 | manual | N/A — visual inspection of 00-index.md | ❌ W0 | ⬜ pending |
| TBD | 01 | 1 | ERRC-02 | manual | N/A — content review of 01-mdm-enrollment.md | ❌ W0 | ⬜ pending |
| TBD | 01 | 1 | ERRC-03 | manual | N/A — content review of 02-tpm-attestation.md | ❌ W0 | ⬜ pending |
| TBD | 01 | 1 | ERRC-04 | manual | N/A — content review of 03-esp-enrollment.md | ❌ W0 | ⬜ pending |
| TBD | 01 | 1 | ERRC-05 | manual | N/A — content review of 04-pre-provisioning.md | ❌ W0 | ⬜ pending |
| TBD | 01 | 1 | ERRC-06 | manual | N/A — content review of 05-hybrid-join.md | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `docs/error-codes/` directory — create alongside `docs/lifecycle/`
- [ ] All 6 files — new content, no prior files exist

*No automated test infrastructure gaps — this phase is documentation-only.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| 00-index.md has Code, Name, Mode, Category columns | ERRC-01 | Documentation content — no executable assertions | Visually confirm table columns match spec |
| 01-mdm-enrollment.md has multi-cause rows for 0x80180014 | ERRC-02 | Multi-cause row structure is a content pattern | Confirm rows 1 and 2 exist with different causes and L1 actions |
| 02-tpm-attestation.md mentions all 5 hardware vendors | ERRC-03 | Hardware vendor coverage is content completeness | Grep for ST Micro, Nuvoton, Infineon, AMD fTPM, Intel Tiger Lake |
| 03-esp-enrollment.md includes policy conflict table | ERRC-04 | Policy conflict content correctness | Verify AppLocker, DeviceLock, Security Baseline entries present |
| 04-pre-provisioning.md combines PP and SD errors | ERRC-05 | File organization decision | Confirm both PP and SD mode tags appear in Mode column |
| 05-hybrid-join.md maps all 6 event IDs | ERRC-06 | Event ID completeness | Confirm Event 807, 809, 815, 908, 171, 172 all present |
| Every error row has escalation criteria | All | Escalation keyword presence | Grep for **Escalate** or retry guidance in every L1 Action cell |
| All files have YAML frontmatter | All | Convention compliance | Confirm last_verified, review_by, applies_to, audience fields |
| Cross-reference rows link to primary entry | ERRC-01 | Cross-category consistency | Verify TPM codes in 04-pre-provisioning.md link to 02-tpm-attestation.md |

---

## Validation Sign-Off

- [ ] All tasks have manual verification criteria documented
- [ ] Sampling continuity: manual review after each task commit
- [ ] Wave 0 covers directory creation and file stubs
- [ ] No watch-mode flags
- [ ] Feedback latency: N/A (documentation phase)
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
