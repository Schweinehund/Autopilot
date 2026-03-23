---
phase: 07
slug: navigation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-23
---

# Phase 07 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Shell commands (grep, test -f, wc) — documentation phase, no code test framework |
| **Config file** | none |
| **Quick run command** | `test -f docs/index.md && test -f docs/quick-ref-l1.md && test -f docs/quick-ref-l2.md && echo PASS` |
| **Full suite command** | `bash -c 'for f in docs/index.md docs/quick-ref-l1.md docs/quick-ref-l2.md docs/common-issues.md; do test -f "$f" && echo "OK: $f" || echo "MISSING: $f"; done'` |
| **Estimated runtime** | ~1 second |

---

## Sampling Rate

- **After every task commit:** Run quick run command (verify files created)
- **After every plan wave:** Run full suite + link verification
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 2 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 07-01-01 | 01 | 1 | NAV-01 | file+content | `grep -l "Service Desk" docs/index.md && grep -l "Desktop Engineering" docs/index.md` | ❌ W0 | ⬜ pending |
| 07-01-02 | 01 | 1 | NAV-04 | file+content | `grep -c "l1-runbooks/" docs/common-issues.md && ! grep -q "powershell" docs/common-issues.md` | ✅ | ⬜ pending |
| 07-02-01 | 02 | 1 | NAV-02 | file+content | `test -f docs/quick-ref-l1.md && grep -q "audience: L1" docs/quick-ref-l1.md` | ❌ W0 | ⬜ pending |
| 07-02-02 | 02 | 1 | NAV-03 | file+content | `test -f docs/quick-ref-l2.md && grep -q "audience: L2" docs/quick-ref-l2.md` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements — documentation files only, no test framework needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| L1 quick-ref fits on one screen | NAV-02 | Line count is a proxy but screen rendering varies | Count lines in quick-ref-l1.md — should be under 60 lines of content |
| Master index L1 section has no L2 content | NAV-01 | Requires semantic review | Read L1 section — no registry paths, PowerShell commands, or log file references |
| Master index L2 section has no L1 content | NAV-01 | Requires semantic review | Read L2 section — no scripted steps, user communication scripts, or portal click-paths |
| All links in common-issues.md resolve | NAV-04 | Relative link validation | Check each markdown link target exists as a file |

*If none: "All phase behaviors have automated verification."*

---

## Validation Sign-Off

- [ ] All tasks have automated verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 2s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
