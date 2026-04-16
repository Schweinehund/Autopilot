---
phase: 24
slug: macos-troubleshooting
status: approved
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-14
---

# Phase 24 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual markdown verification (no code tests — documentation phase) |
| **Config file** | none |
| **Quick run command** | `grep -r "TBD" docs/decision-trees/06-*.md docs/l1-runbooks/1[0-5]-*.md docs/l2-runbooks/1[0-3]-*.md 2>/dev/null` |
| **Full suite command** | `bash -c 'echo "=== Broken Links ===" && grep -rn "\[TBD" docs/ 2>/dev/null; echo "=== Missing Files ===" && for f in docs/decision-trees/06-macos-triage.md docs/l1-runbooks/10-*.md docs/l2-runbooks/10-*.md; do test -f "$f" || echo "MISSING: $f"; done; echo "=== Frontmatter ===" && grep -L "^platform:" docs/decision-trees/06-*.md docs/l1-runbooks/1[0-5]-*.md docs/l2-runbooks/1[0-3]-*.md 2>/dev/null'` |
| **Estimated runtime** | ~2 seconds |

---

## Sampling Rate

- **After every task commit:** Run quick run command (check for TBD placeholders)
- **After every plan wave:** Run full suite command
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 2 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 24-01-01 | 01 | 1 | MTRO-01 | — | N/A | file-check | `test -f docs/decision-trees/06-macos-triage.md` | ✅ | ✅ green |
| 24-01-02 | 01 | 1 | MTRO-02 | — | N/A | file-check | `ls docs/l1-runbooks/1[0-5]-*.md 2>/dev/null \| wc -l` | ✅ | ✅ green |
| 24-02-01 | 02 | 1 | MTRO-03 | — | N/A | file-check | `test -f docs/l2-runbooks/10-macos-log-collection.md` | ✅ | ✅ green |
| 24-02-02 | 02 | 1 | MTRO-04 | — | N/A | file-check | `ls docs/l2-runbooks/1[1-3]-*.md 2>/dev/null \| wc -l` | ✅ | ✅ green |
| 24-03-01 | 03 | 2 | MTRO-02 | — | N/A | grep-check | `grep -c "TBD - Phase 24" docs/admin-setup-macos/06-config-failures.md` | ✅ | ✅ green |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements. This is a documentation-only phase — no test framework installation needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Triage tree routes to correct runbook within 3 steps | MTRO-01 | Mermaid diagram logic requires human trace | Trace each leaf node from root "Did Setup Assistant complete?" — count decision steps ≤ 3 |
| L1 runbooks contain zero Terminal commands | MTRO-02 | Requires semantic review of all steps | grep for backtick code blocks containing Terminal/shell commands in L1 runbooks |
| L2 diagnostics use macOS-native tools only | MTRO-04 | Requires domain knowledge to verify | Confirm no references to PowerShell, registry, mdmdiagnosticstool.exe in L2 macOS runbooks |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 2s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-04-15

---

## Validation Audit 2026-04-15

| Metric | Count |
|--------|-------|
| Gaps found | 0 |
| Resolved | 5 (all pending → green) |
| Escalated | 0 |

**Notes:** Retroactive audit. All 5 automated checks pass: triage decision tree exists, 6 L1 runbooks present, L2 log collection guide exists, 3 L2 investigation runbooks present, zero remaining "TBD - Phase 24" placeholders in config-failures.md. Manual checks also verified: 0 Terminal commands in L1 runbooks, 0 Windows tool references in macOS L2 runbooks.

_Audited: 2026-04-15_
