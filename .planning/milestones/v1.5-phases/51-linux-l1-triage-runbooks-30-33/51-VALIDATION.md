---
phase: 51
slug: linux-l1-triage-runbooks-30-33
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-27
---

# Phase 51 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution. This phase produces documentation files (Markdown decision tree + 4 L1 runbooks + 2 hub appends) and 1 Node.js validator (`check-phase-51.mjs`). The validation framework is the validator itself plus the v1.5 milestone audit harness — there are no unit-test runners involved.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js (no test runner — validators are vanilla `.mjs` scripts that exit 0 / 1) |
| **Config file** | none — validators are self-contained per Phase 48 D-25 file-reads-only / no-shared-module |
| **Quick run command** | `node scripts/validation/check-phase-51.mjs` |
| **Full suite command** | `node scripts/validation/v1.5-milestone-audit.mjs --verbose` |
| **Estimated runtime** | ~5-10 seconds (file-read + regex pass; no network, no compilation) |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/validation/check-phase-51.mjs` — should exit 0
- **After every plan wave:** Run `node scripts/validation/v1.5-milestone-audit.mjs --verbose` — expect C1-C12 PASS, C13 informational
- **Before `/gsd-verify-work`:** Both validators green; `node scripts/validation/regenerate-supervision-pins.mjs --self-test` exits 0 (regression-prevention; no Phase 51 pin-coord modification expected)
- **Max feedback latency:** ~10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 51-01-01 | 01 | 1 | LIN-07 | — / — | Mermaid 4-branch tree present + click directives + escalation node + tree-level CA disambiguation | structural | `node scripts/validation/check-phase-51.mjs` (V-51-06..11) | ❌ W0 | ⬜ pending |
| 51-02-01 | 02 | 1 | LIN-08 | — / — | Anchor-indexed 3 causes + DPO-01 cross-link + terminal walkthrough across all 3 causes | structural | `node scripts/validation/check-phase-51.mjs` (V-51-12..16) | ❌ W0 | ⬜ pending |
| 51-03-01 | 03 | 1 | LIN-09 | — / — | Anchor-indexed 4 causes + portal-first for distro/encryption/password + terminal for custom-compliance | structural | `node scripts/validation/check-phase-51.mjs` (V-51-13) | ❌ W0 | ⬜ pending |
| 51-04-01 | 04 | 1 | LIN-10 | — / — | Anchor-indexed 3 causes + PITFALL-2 positive + negative assertions + DPO-02 cross-link | structural | `node scripts/validation/check-phase-51.mjs` (V-51-14, V-51-17, V-51-18, V-51-19) | ❌ W0 | ⬜ pending |
| 51-05-01 | 05 | 1 | LIN-11 | — / — | Single-cause Runbook 22-style + read-vs-write apt distinction + terminal-only diagnostic surface | structural | `node scripts/validation/check-phase-51.mjs` (V-51-15, V-51-20) | ❌ W0 | ⬜ pending |
| 51-06-01 | 06 | 1 | AUDIT-06 | — / — | check-phase-51.mjs implements 22-26 V-51-NN structural assertions per Phase 48 D-25 file-reads-only pattern | structural | `node scripts/validation/check-phase-51.mjs` exits 0 | ❌ W0 | ⬜ pending |
| 51-07-01 | 07 | 2 | (SC#4) | — / — | 00-index.md Linux H2 appended after Android section (line 76+); 4-row table mirroring lines 67-76 | structural | `node scripts/validation/check-phase-51.mjs` (V-51-21) | ❌ W0 | ⬜ pending |
| 51-07-02 | 07 | 2 | (SC#4) | — / — | 00-initial-triage.md Linux entries appended at lines 11, 40, 122, 133, 138 (5 positions) per Phase 49/50 banner pattern | structural | `node scripts/validation/check-phase-51.mjs` (V-51-22) | ❌ W0 | ⬜ pending |
| 51-08-01 | 08 | 3 | (gate) | — / — | All 5 SCs satisfied; v1.5-milestone-audit.mjs exits 0 (C1-C12 PASS); regenerate-supervision-pins.mjs --self-test exits 0 | structural | `node scripts/validation/v1.5-milestone-audit.mjs --verbose` exits 0 | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

**Note:** The "File Exists" column shows `❌ W0` because the validator + content files don't exist until Wave 1 commits ship them. After Wave 1 commits, the field flips to ✅ for executor-side verification.

---

## Wave 0 Requirements

- [ ] `scripts/validation/check-phase-51.mjs` — full-scope validator with 22-26 V-51-NN structural assertions per CONTEXT.md D-19 (file-reads-only / regex-based per Phase 48 D-25 + Phase 49 D-26)
- [ ] `docs/decision-trees/09-linux-triage.md` — Mermaid 4-branch tree per CONTEXT.md D-01..D-08 (whitelist-first; Don't-Know escalation; tree-level CA disambiguation)
- [ ] `docs/l1-runbooks/30-linux-enrollment-failed.md` — anchor-indexed 3-cause runbook (LIN-08; DPO-01 cross-link)
- [ ] `docs/l1-runbooks/31-linux-compliance-non-compliant.md` — anchor-indexed 4-cause runbook (LIN-09)
- [ ] `docs/l1-runbooks/32-linux-ca-blocking-web-access.md` — anchor-indexed 3-cause runbook (LIN-10; DPO-02 cross-link; PITFALL-2 layered defense)
- [ ] `docs/l1-runbooks/33-linux-agent-service-failure.md` — single-cause Runbook 22-style (LIN-11; terminal-walkthrough; read-vs-write apt distinction)
- [ ] `docs/l1-runbooks/00-index.md` — append-only `## Linux L1 Runbooks` H2 + 4-row table after line 76
- [ ] `docs/decision-trees/00-initial-triage.md` — append-only Linux entries at 5 line positions

*If none: "Existing infrastructure covers all phase requirements."* — N/A; Phase 51 ships net-new files + 2 append-only edits.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Mermaid renders correctly with 4 click directives navigating to runbooks | SC#1 | Markdown viewer-side rendering varies (GitHub vs VSCode preview vs SharePoint export); regex-based validator can't simulate viewer rendering | After commit, open `docs/decision-trees/09-linux-triage.md` on GitHub Web UI; verify Mermaid renders; click each of the 4 click directives; verify navigation to correct runbook |
| L1 responder can navigate the tree → Runbook 32 in ≤2 decision steps for CA-blocking-Edge symptom | SC#1 | Routing-verification table is a structural artifact but the actual L1 mental traversal is procedural | Author follows the tree as if they were L1 responder reading "User cannot access Microsoft 365 in Edge for Linux" symptom; verify they reach Runbook 32 in 1 decision step (root → CA branch with PITFALL-2 callout) |
| Runbook 32 content does NOT inadvertently bait L1 toward device-CA path even when V-51-19 negative-assertion passes | SC#3 | V-51-19 is a literal-string negative-assertion; doesn't catch semantic drift (e.g., paraphrased device-CA prose that uses different words) | Author re-reads Runbook 32 after authoring; confirms no implicit hint that "device compliance" is also a fix path; if any ambiguous prose is found, sharpen wording in same commit |
| Anchor `#enroll-your-device` in `docs/end-user-guides/linux-intune-portal-enrollment.md` resolves correctly when Runbook 30 deep-links it (DPO-01) | LIN-08 | GFM auto-anchor case sensitivity + special-character stripping (PITFALL-15) | Author runs `grep "^## Enroll your device" docs/end-user-guides/linux-intune-portal-enrollment.md`; if H2 wording differs (e.g., "Enroll Your Device" vs "Enroll your device"), update Runbook 30 cross-link to match actual GFM slug |

---

## Validation Sign-Off

- [ ] All tasks have automated verify (`check-phase-51.mjs` covers 22-26 V-51-NN structural assertions; v1.5 milestone audit covers C1-C12 cross-cutting)
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify (each of the 8 tasks above has a structural assertion)
- [ ] Wave 0 covers all MISSING references — all 8 deliverables enumerated above
- [ ] No watch-mode flags — validators run once and exit (no `node --watch` etc.)
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter (after sign-off)

**Approval:** pending
