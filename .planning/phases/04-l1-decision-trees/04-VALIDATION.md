---
phase: 4
slug: l1-decision-trees
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-20
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual review (docs-only phase — no executable code) |
| **Config file** | none |
| **Quick run command** | `grep -c "graph TD" docs/decision-trees/*.md` |
| **Full suite command** | `bash -c 'for f in docs/decision-trees/*.md; do echo "=== $f ==="; grep -c "graph TD" "$f"; grep -cE ":::resolved\|:::escalateL2\|:::escalateInfra" "$f"; done'` |
| **Estimated runtime** | ~2 seconds |

---

## Sampling Rate

- **After every task commit:** Run quick run command (verify Mermaid graph present)
- **After every plan wave:** Run full suite command (verify terminal node classification)
- **Before `/gsd:verify-work`:** Full suite must show all files with correct terminal categories
- **Max feedback latency:** 2 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | L1DT-01 | grep | `grep "graph TD" docs/decision-trees/00-initial-triage.md` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 1 | L1DT-02 | grep | `grep -cE ":::resolved\|:::escalateL2\|:::escalateInfra" docs/decision-trees/00-initial-triage.md` | ❌ W0 | ⬜ pending |
| 04-02-01 | 02 | 1 | L1DT-03 | grep | `grep "graph TD" docs/decision-trees/01-esp-failure.md` | ❌ W0 | ⬜ pending |
| 04-03-01 | 03 | 1 | L1DT-04 | grep | `grep "graph TD" docs/decision-trees/02-profile-assignment.md` | ❌ W0 | ⬜ pending |
| 04-04-01 | 04 | 1 | L1DT-04 | grep | `grep "graph TD" docs/decision-trees/03-tpm-attestation.md` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. This phase produces Markdown files only — no test framework needed.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Network gate is first decision in every tree | L1DT-01 | Semantic ordering requires human judgment | Open each .md file; confirm first diamond after intro is network check |
| Exactly 3 terminal categories per tree | L1DT-02 | classDef assignment correctness needs visual check | Enumerate all terminal nodes; confirm each uses resolved/escalateL2/escalateInfra |
| ESP tree distinguishes device vs user phase without registry | L1DT-02 | Semantic content check | Read ESP tree; confirm phase identification uses screen text, not PowerShell/registry |
| Mermaid renders in GitHub | L1DT-03 | Requires GitHub rendering environment | Push to branch; open each file in GitHub web UI; confirm flowchart renders |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 2s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
