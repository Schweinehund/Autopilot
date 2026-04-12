---
phase: 1
slug: foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-11
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual review + structural checklist (docs-only phase) |
| **Config file** | none |
| **Quick run command** | `ls docs/_glossary.md docs/apv1-vs-apv2.md docs/reference/ docs/_templates/` |
| **Full suite command** | `bash -c 'for f in docs/_glossary.md docs/apv1-vs-apv2.md docs/reference/registry-paths.md docs/reference/endpoints.md docs/reference/powershell-ref.md docs/_templates/l1-template.md docs/_templates/l2-template.md; do test -f "$f" && echo "✅ $f" || echo "❌ $f"; done'` |
| **Estimated runtime** | ~2 seconds |

---

## Sampling Rate

- **After every task commit:** Run quick run command (verify created files exist)
- **After every plan wave:** Run full suite command
- **Before `/gsd:verify-work`:** Full suite must show all 7 files ✅
- **Max feedback latency:** 2 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | FOUND-01 | structural | `test -f docs/_glossary.md && grep -c "^### " docs/_glossary.md` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 1 | FOUND-02 | structural | `test -f docs/reference/registry-paths.md && grep -c "HKLM" docs/reference/registry-paths.md` | ❌ W0 | ⬜ pending |
| 1-01-03 | 01 | 1 | FOUND-03 | structural | `test -f docs/reference/endpoints.md && grep -c "https://" docs/reference/endpoints.md` | ❌ W0 | ⬜ pending |
| 1-01-04 | 01 | 1 | FOUND-04 | structural | `test -f docs/reference/powershell-ref.md && grep -c "^### " docs/reference/powershell-ref.md` | ❌ W0 | ⬜ pending |
| 1-02-01 | 02 | 1 | FOUND-05 | structural | `test -f docs/_templates/l1-template.md && grep -c "last_verified:" docs/_templates/l1-template.md` | ❌ W0 | ⬜ pending |
| 1-02-02 | 02 | 1 | FOUND-05 | structural | `test -f docs/_templates/l2-template.md && grep -c "last_verified:" docs/_templates/l2-template.md` | ❌ W0 | ⬜ pending |
| 1-03-01 | 03 | 1 | FOUND-06 | structural | `test -f docs/apv1-vs-apv2.md && grep -c "APv1" docs/apv1-vs-apv2.md` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `docs/reference/` directory — must be created before reference files
- [ ] `docs/_templates/` directory — must be created before template files

*Existing infrastructure covers remaining requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Glossary terms are accurate and one-liner only | FOUND-01 | Content accuracy cannot be machine-verified | Review each term definition for correctness and single-sentence constraint |
| Each endpoint has a working test command | FOUND-03 | Commands reference live services | Spot-check 3 test commands against actual connectivity |
| Remediation functions have safety warnings | FOUND-04 | Warning content quality is subjective | Verify 4 remediation functions (Reset-Autopilot, Reset-TPM, Restart-ESP, Remove-Device) have callout blocks |
| Templates enforce correct frontmatter fields | FOUND-05 | Template usability is subjective | Create a new doc from each template and verify all 4 frontmatter fields are present |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 2s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
