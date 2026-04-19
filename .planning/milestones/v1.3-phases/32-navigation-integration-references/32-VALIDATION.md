---
phase: 32
slug: navigation-integration-references
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-17
---

# Phase 32 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Phase 32 is pure documentation with no code execution — validation is served by link-integrity validation and reachability auditing rather than unit/integration tests.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Shell + grep/awk/find (no external test runner) |
| **Config file** | None |
| **Quick run command** | `bash .planning/phases/32-navigation-integration-references/validation/link-check.sh <changed-file>` |
| **Full suite command** | `bash .planning/phases/32-navigation-integration-references/validation/run-all.sh` (invokes link-check + anchor-collision + reachability-audit) |
| **Estimated runtime** | ~5 seconds single-file check; ~30-60 seconds full suite |

---

## Sampling Rate

- **After every task commit:** Run `link-check.sh <changed-file>` (single-file link + anchor validity)
- **After every plan wave:** Run `run-all.sh` (full triad: link-check all docs/ + anchor-collision + reachability-audit)
- **Before `/gsd-verify-work`:** Full suite must return exit 0 + manual spot-check (open index.md in rendered preview, click through to 3 random iOS files, confirm ≤2-click arrival)
- **Max feedback latency:** 60 seconds (full suite)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 32-00-01 | 00 | 0 | Wave 0 infra | — | N/A | infra | `test -x .planning/phases/32-navigation-integration-references/validation/link-check.sh` | ❌ W0 | ⬜ pending |
| 32-00-02 | 00 | 0 | Wave 0 infra | — | N/A | infra | `test -x .planning/phases/32-navigation-integration-references/validation/anchor-collision.sh` | ❌ W0 | ⬜ pending |
| 32-00-03 | 00 | 0 | Wave 0 infra | — | N/A | infra | `test -x .planning/phases/32-navigation-integration-references/validation/reachability-audit.sh` | ❌ W0 | ⬜ pending |
| 32-00-04 | 00 | 0 | Phase 30 W3 baseline | — | N/A | baseline | `grep -c "iOS\|iPadOS" docs/decision-trees/00-initial-triage.md docs/l1-runbooks/00-index.md` → planner decides escalate/absorb based on result | ❌ W0 | ⬜ pending |
| 32-01-01 | 01 | 1 | NAV-01 | — | N/A | link-resolution | `grep -cE "^### (Supervision\|Account-Driven User Enrollment\|APNs\|Jailbreak Detection\|MAM-WE)" docs/_glossary-macos.md` → expect 5 | ❌ W0 | ⬜ pending |
| 32-01-02 | 01 | 1 | NAV-01 | — | N/A | content-check | `grep -cE "\[[^]]+\]\(#" docs/_glossary-macos.md` → expect ≥11 (Alphabetical Index) | ❌ W0 | ⬜ pending |
| 32-01-03 | 01 | 1 | NAV-01 | T-32-01 | PII-safe portal paths | content-check | `grep -cE "https://[^)]+\.microsoft\.com/[a-f0-9]{8}-" docs/_glossary-macos.md` → expect 0 (no tenant-specific IDs) | ❌ W0 | ⬜ pending |
| 32-02-01 | 02 | 1 | NAV-03 | — | N/A | file-existence | `test -f docs/reference/ios-capability-matrix.md` | ❌ W0 | ⬜ pending |
| 32-02-02 | 02 | 1 | NAV-03 | — | N/A | structure-check | `grep -c "^## " docs/reference/ios-capability-matrix.md` → expect ≥6 (5 domains + Key Gaps) | ❌ W0 | ⬜ pending |
| 32-02-03 | 02 | 1 | NAV-03 SC #3 | — | N/A | content-check | `grep -cE "\| Feature \| Windows \| macOS \| iOS \|" docs/reference/ios-capability-matrix.md` → expect ≥5 (trilateral header in each domain) | ❌ W0 | ⬜ pending |
| 32-02-04 | 02 | 1 | NAV-03 | — | N/A | link-resolution | `grep -c "reference/ios-capability-matrix.md" docs/index.md docs/reference/00-index.md` → expect ≥2 | ❌ W0 | ⬜ pending |
| 32-03-01 | 03 | 1 | placeholder retrofit | — | N/A | content-check | `grep -c "Phase 32 NAV-01" docs/decision-trees/07-ios-triage.md` → expect 0 (placeholder resolved) | ❌ W0 | ⬜ pending |
| 32-04-01 | 04 | 2 | NAV-02 | — | N/A | anchor-existence | `grep -cE "^## iOS/iPadOS Failure Scenarios" docs/common-issues.md` → expect 1 | ❌ W0 | ⬜ pending |
| 32-04-02 | 04 | 2 | NAV-02 | — | N/A | link-resolution | `grep -cE "l1-runbooks/(16\|17\|18\|19\|20\|21)-ios-" docs/common-issues.md` → expect ≥6 | ❌ W0 | ⬜ pending |
| 32-04-03 | 04 | 2 | SC #4 regression | — | N/A | regression-check | Post-edit: all pre-existing Windows/macOS fragment anchors still resolve (via link-check.sh --regression flag) | ❌ W0 | ⬜ pending |
| 32-04-04 | 04 | 2 | anchor disambiguation | — | N/A | anchor-collision | `anchor-collision.sh docs/common-issues.md` → exit 0 (no duplicate heading anchors post-iOS-prefix pattern) | ❌ W0 | ⬜ pending |
| 32-05-01 | 05 | 2 | NAV-02 | — | N/A | structure-check | `awk '/## iOS\/iPadOS Provisioning/,/^---/' docs/index.md \| grep -c "^### "` → expect 3 (L1/L2/Admin Setup subsections) | ❌ W0 | ⬜ pending |
| 32-05-02 | 05 | 2 | NAV-02 | — | N/A | link-resolution | Each iOS subsection table has ≥3 link targets per D-26 | ❌ W0 | ⬜ pending |
| 32-05-03 | 05 | 2 | SC #4 regression | — | N/A | regression-check | All pre-existing index.md links resolve post-edit | ❌ W0 | ⬜ pending |
| 32-06-01 | 06 | 3 | NAV-02 | — | N/A | anchor-existence | `grep -cE "^## iOS/iPadOS Quick Reference" docs/quick-ref-l1.md` → expect 1 | ❌ W0 | ⬜ pending |
| 32-06-02 | 06 | 3 | NAV-02 | — | N/A | content-check | quick-ref-l1.md iOS Top Checks section has exactly 4 numbered items per D-30 | ❌ W0 | ⬜ pending |
| 32-07-01 | 07 | 3 | NAV-02 | — | N/A | anchor-existence | `grep -cE "^## iOS/iPadOS Quick Reference" docs/quick-ref-l2.md` → expect 1 | ❌ W0 | ⬜ pending |
| 32-07-02 | 07 | 3 | NAV-02 | — | N/A | structure-check | quick-ref-l2.md iOS section contains 3 tables (Diagnostic Data, Portal Paths, Sysdiagnose Triggers) per D-31 | ❌ W0 | ⬜ pending |
| 32-07-03 | 07 | 3 | research-flag mitigation | — | N/A | content-check | quick-ref-l2.md iOS section has ≥3 "verify per Phase 30 D-32 / Phase 31 D-XX" footnote markers per D-32 | ❌ W0 | ⬜ pending |
| 32-08-01 | 08 | 4 | SC #4 reachability | — | N/A | reachability-audit | `reachability-audit.sh` → every iOS file (~25 files) reaches depth ≤2 from index.md | ❌ W0 | ⬜ pending |
| 32-08-02 | 08 | 4 | SC #4 regression | — | N/A | reachability-audit | All pre-existing Phase 20-25 files still reach expected depth (no regressions) | ❌ W0 | ⬜ pending |
| 32-08-03 | 08 | 4 | link integrity | — | N/A | link-check | `link-check.sh docs/` → exit 0 (all cross-file links and fragment anchors resolve) | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `.planning/phases/32-navigation-integration-references/validation/link-check.sh` — markdown link + anchor validity script (recursive grep-based; verifies both file target and fragment anchor existence)
- [ ] `.planning/phases/32-navigation-integration-references/validation/anchor-collision.sh` — duplicate heading detection (flags ambiguous-anchor risk in common-issues.md)
- [ ] `.planning/phases/32-navigation-integration-references/validation/reachability-audit.sh` — BFS depth-from-index reporter (emits `file | depth | path-taken` for every .md in docs/)
- [ ] `.planning/phases/32-navigation-integration-references/validation/run-all.sh` — full-suite orchestrator invoking all three scripts
- [ ] `.planning/phases/32-navigation-integration-references/validation/expected-reachability.txt` — fixture listing all 25+ iOS files with expected depth ≤2 from index.md
- [ ] **Phase 30 Wave 3 baseline verification** — grep confirm state of `docs/decision-trees/00-initial-triage.md` and `docs/l1-runbooks/00-index.md`; planner escalates or absorbs per finding
- [ ] Framework install: `grep`, `awk`, `find` — already present in bash environment; no install needed

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Rendered-markdown visual inspection of capability matrix | NAV-03 SC #3 scannability | Table rendering quality cannot be checked by grep | Open `docs/reference/ios-capability-matrix.md` in GitHub preview or VS Code; confirm tables render without column wrap/overflow on 80-char terminals |
| Apple-parity framing preamble readability | D-06 | Subjective clarity assessment | Human reader confirms 2-4 sentence preamble reads naturally and correctly signals iOS↔macOS framing intent |
| Portal-path currency verification | inherited Phase 30 D-32 / Phase 31 D-31 flags | Portal UI may shift between research and execution | Manual browse of Intune admin center paths embedded in quick-ref-l2.md during plan-time verification window |
| Sysdiagnose trigger currency | inherited Phase 31 D-30 flag | Apple device/OS-version variations | Manual verification against current Apple Developer documentation at plan-time |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter after Wave 0 completion
- [ ] Manual verifications completed during execute-phase (not deferred past /gsd-verify-work)

**Approval:** pending
