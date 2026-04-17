---
phase: 30
slug: ios-l1-triage-runbooks
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-17
---

# Phase 30 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Source: `30-RESEARCH.md` Section 6 (Validation Architecture).

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Static checks — grep-based assertions, YAML parser, markdown-link-check, Mermaid CLI |
| **Config file** | None currently in repo — Wave 0 creates `scripts/validation/check-phase-30.{mjs,sh}` |
| **Quick run command** | `node scripts/validation/check-phase-30.mjs --quick` (grep assertions only; <2s) |
| **Full suite command** | `node scripts/validation/check-phase-30.mjs` (+ markdown-link-check + Mermaid syntax) |
| **Estimated runtime** | ~15 seconds full suite |

**Note:** Project CLAUDE.md documents Pester/pytest/Vitest harnesses, but none apply to markdown content. Phase 30 uses static-check validation (research Section 6 rationale).

---

## Sampling Rate

- **After every task commit:** Run `--quick` (grep checks on touched files — SC #1 node count, SC #2 banner-only integration, frontmatter keys present)
- **After every plan wave:** Run full suite (link-check + Mermaid + 71-placeholder sweep across `docs/admin-setup-ios/`)
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

Tasks are finalized during planning (step 8). Placeholder rows populated from research Section 6 "Phase Requirements → Test Map" — planner MUST map each task to exactly one row below (or flag MANUAL).

| Check | Plan | Wave | Requirement | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|-------|------|------|-------------|-----------------|-----------|-------------------|-------------|--------|
| Decision tree ≤ 5 nodes | TBD | TBD | L1TS-01 / SC #1 | N/A | grep-count | `grep -cE "^\s*IOS[0-9]+\{" docs/decision-trees/07-ios-triage.md` ≤ 5 | ❌ W0 | ⬜ pending |
| Single-branch integration (no iOS Mermaid in 00-initial-triage) | TBD | TBD | L1TS-01 / SC #2 | N/A | Mermaid-absence | `grep -cE "iOS\|iPadOS\|IOS[0-9]" <(sed -n '/```mermaid/,/```/p' docs/decision-trees/00-initial-triage.md)` → 0 | ❌ W0 | ⬜ pending |
| 6 runbooks have `## Symptom` | TBD | TBD | L1TS-02 / SC #3 | N/A | grep presence | `grep -l "^## Symptom" docs/l1-runbooks/1[6-9]-ios*.md docs/l1-runbooks/2[0-1]-ios*.md \| wc -l` = 6 | ❌ W0 | ⬜ pending |
| Only runbook 21 has `## User Action Required` | TBD | TBD | L1TS-02 / SC #4 (D-13) | N/A | grep presence | `grep -l "^## User Action Required" docs/l1-runbooks/*-ios-*.md \| wc -l` = 1 | ❌ W0 | ⬜ pending |
| All 71 placeholders resolved | TBD | TBD | D-16 forward-contract | N/A | string-absence | `grep -rn "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/` → 0 matches | ❌ W0 | ⬜ pending |
| D-18 prose retrofit done | TBD | TBD | D-18 | N/A | line-content | `sed -n '243p' docs/admin-setup-ios/07-device-enrollment.md` does NOT contain "Phase 30" or "will live" | ❌ W0 | ⬜ pending |
| 6 runbook files with D-21 naming | TBD | TBD | D-21 / L1TS-02 | N/A | file existence | `ls docs/l1-runbooks/{16,17,18,19,20,21}-ios-*.md` → all 6 present | ❌ W0 | ⬜ pending |
| 07-ios-triage.md exists | TBD | TBD | D-22 / L1TS-01 | N/A | file existence | `ls docs/decision-trees/07-ios-triage.md` | ❌ W0 | ⬜ pending |
| 00-index.md has iOS section | TBD | TBD | D-23 | N/A | H2 grep | `grep "^## iOS L1 Runbooks" docs/l1-runbooks/00-index.md` → 1 match | ❌ W0 | ⬜ pending |
| Template platform enum extended | TBD | TBD | D-24 | N/A | string grep | `grep -E "platform:\s*Windows\s*\\\|\s*macOS\s*\\\|\s*iOS\s*\\\|\s*all" docs/_templates/l1-template.md` → 1 match | ❌ W0 | ⬜ pending |
| Frontmatter per runbook (D-25) | TBD | TBD | D-25 | N/A | YAML parse | For each runbook: `last_verified`, `review_by`, `audience: L1`, `platform: iOS` present | ❌ W0 | ⬜ pending |
| Platform gate banner on all 6 runbooks | TBD | TBD | D-26 | N/A | line grep | Line 9 (or first line of body) matches `^> \*\*Platform gate:\*\*` | ❌ W0 | ⬜ pending |
| Internal links resolve | TBD | TBD | Link-integrity | N/A | markdown-link-check | `npx markdown-link-check docs/decision-trees/07-ios-triage.md docs/l1-runbooks/1[6-9]-ios-*.md docs/l1-runbooks/2[0-1]-ios-*.md` exits 0 | ❌ W0 | ⬜ pending |
| Mermaid syntax valid | TBD | TBD | 07-ios-triage.md integrity | N/A | Mermaid CLI | `npx @mermaid-js/mermaid-cli -i docs/decision-trees/07-ios-triage.md --quiet` exits 0 (fallback: manual visual review per project v1.0-v1.2 precedent if tooling unavailable) | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `scripts/validation/check-phase-30.mjs` (or `.sh`) — single command runs all 13 static checks above and exits non-zero on failure. Planner may split per-check if preferred.
- [ ] Verify `markdown-link-check` availability — add as dev dep if missing (MEDIUM priority).
- [ ] Verify `@mermaid-js/mermaid-cli` availability — if unavailable, fall back to manual visual review (LOW — project has shipped 3 prior milestones without automated Mermaid validation; this is an acceptable fallback per v1.0-v1.2 precedent).

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Runbook prose is L1-executable (actual English, not bureaucratic boilerplate) | L1TS-02 quality | Subjective — requires human read-through | Reviewer reads each runbook end-to-end and asks: "Could a new L1 hire follow this without asking questions?" — flag any step that assumes unstated context |
| Actor-boundary clarity (SC #4 literal) — no ambiguity about L1 vs Admin vs User | L1TS-02 / SC #4 | Subjective beyond section-presence grep | For each runbook, reviewer confirms every instruction lives under exactly one H2 actor heading and no heading contains cross-actor content |
| Escalation packet completeness (D-12 three-part structure) | D-12 | Subjective completeness judgment | Verify each "Admin Action Required" section has: (1) imperative "Ask the admin to..." list, (2) "Verify" confirmation steps, (3) "If admin confirms none..." handoff |
| Mermaid visual rendering quality | SC #1/#2 | Visual — static syntax check does not evaluate layout | Render 07-ios-triage.md in GitHub web UI; confirm diamonds/terminals distinguishable, classDef styling applied |
| 71-placeholder per-row target accuracy (D-17 per-row judgment) | D-17 | Semantic — grep confirms absence but not correctness of replacement | Reviewer spot-checks a sample of replaced rows (10+) against failure-mode-to-runbook mapping documented in PLAN.md |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
