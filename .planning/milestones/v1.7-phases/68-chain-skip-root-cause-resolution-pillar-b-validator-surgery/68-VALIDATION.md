---
phase: 68
slug: chain-skip-root-cause-resolution-pillar-b-validator-surgery
status: draft
nyquist_compliant: false
wave_0_complete: true
created: 2026-05-26
---

# Phase 68 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> **Note:** Phase 68 inverts the usual pattern — the validators ARE the deliverables AND the test harness. Wave 0 is COMPLETE by construction (existing chain validators cover all CHAIN-01/02/03 requirements; no new test scaffolding required).

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Custom Node.js validator harness (`check-phase-NN.mjs` per-phase + `v1.5-milestone-audit.mjs` / `v1.6-milestone-audit.mjs` aggregates + `regenerate-supervision-pins.mjs --self-test` helper-level test) |
| **Config file** | None — validators are self-contained `.mjs` files |
| **Quick run command (per validator)** | `node scripts/validation/check-phase-NN.mjs` |
| **Full suite command (chain sweep)** | `for /l %i in (48,1,66) do node scripts/validation/check-phase-%i.mjs` (cmd.exe) or `48..66 \| % { node "scripts/validation/check-phase-$_.mjs" }` (PowerShell) |
| **Estimated runtime** | ~30-60 seconds (19 validators × ~2s avg) |

---

## Sampling Rate

- **After every task commit:** Run the per-validator command for the touched validator(s) (table below)
- **After every plan wave:** Run chain sweep across `check-phase-{48..66}.mjs`
- **Before Plan 68-05 close-gate:** Full chain + `v1.5-milestone-audit.mjs` + `v1.6-milestone-audit.mjs` + `regenerate-supervision-pins.mjs --self-test` ALL exit 0
- **Max feedback latency:** ~60 seconds (full chain) / ~2-5s per validator

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 68-01-01 | 01 | 1 | CHAIN-01 | — | check-phase-51 readFile() normalizes CRLF; 25/25 PASS preserved | unit | `node scripts/validation/check-phase-51.mjs` | ✅ | ⬜ pending |
| 68-01-02 | 01 | 1 | CHAIN-01 | — | check-phase-58 readFile() normalizes CRLF; 26/26 PASS preserved | unit | `node scripts/validation/check-phase-58.mjs` | ✅ | ⬜ pending |
| 68-02-01 | 02 | 1 | CHAIN-02 | V14 | New `scripts/validation/_lib/archive-path.mjs` exports `resolveArchivedPhasePath(suffix[, milestoneRoots])` with no path-traversal vector (static-string input only) | unit | `node -e "import('./scripts/validation/_lib/archive-path.mjs').then(m => console.log(m.resolveArchivedPhasePath('48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md')))"` | ❌ W0 (helper created here) | ⬜ pending |
| 68-02-02 | 02 | 1 | CHAIN-02 | — | check-phase-48 uses helper for V-48-05; 7/7 PASS | unit | `node scripts/validation/check-phase-48.mjs` | ✅ | ⬜ pending |
| 68-02-03 | 02 | 1 | CHAIN-02 | — | check-phase-60 uses helper for V-60-08/24/25; 25/25 PASS | unit | `node scripts/validation/check-phase-60.mjs` | ✅ | ⬜ pending |
| 68-02-04 | 02 | 1 | CHAIN-02 | — | check-phase-31 silent-swallow bug closed; V-31-21/24 still PASS | unit (STRETCH) | `node scripts/validation/check-phase-31.mjs` | ✅ | ⬜ pending |
| 68-02-05 | 02 | 1 | CHAIN-02 | — | check-phase-62 + check-phase-63 helper applied for v1.6-archived ANCHOR_INVENTORY paths | unit | `node scripts/validation/check-phase-62.mjs ; node scripts/validation/check-phase-63.mjs` | ✅ | ⬜ pending |
| 68-02-06 | 02 | 1 | CHAIN-02 | — | regenerate-supervision-pins.mjs BASELINE_9 coords {79,81,181,198}→{80,82,182,199}; parseAllowlist() repointed v1.5→v1.6 sidecar | unit (self-test) | `node scripts/validation/regenerate-supervision-pins.mjs --self-test` | ✅ | ⬜ pending |
| 68-02-07 | 02 | 1 | CHAIN-02 | — | v1.5-audit-allowlist.json broad-rebase: supervision_exemptions[] + c7_knox_allowlist[] + cope_banned_phrases[] coords shifted +1 for `_glossary-android.md` entries | integration | `node scripts/validation/v1.5-milestone-audit.mjs` (12/12 PASS, C2+C7+C9 included) | ✅ | ⬜ pending |
| 68-03-01 | 03 | 2 | CHAIN-03 | — | check-phase-{60,61} cascade-pass after 68-01+68-02+68-04 | integration | `node scripts/validation/check-phase-60.mjs && node scripts/validation/check-phase-61.mjs` | ✅ | ⬜ pending |
| 68-03-02 | 03 | 2 | CHAIN-03 | — | ATOMIC CHAIN_SKIP removal across check-phase-{62..66} (5 files in one commit) | integration | `node scripts/validation/check-phase-62.mjs && node scripts/validation/check-phase-63.mjs && node scripts/validation/check-phase-64.mjs && node scripts/validation/check-phase-65.mjs && node scripts/validation/check-phase-66.mjs` | ✅ | ⬜ pending |
| 68-03-03 | 03 | 2 | CHAIN-03 | — | Full chain check-phase-{48..66} exits 0; 0 SKIPPED reported | end-to-end | `48..66 \| % { node "scripts/validation/check-phase-$_.mjs" }` | ✅ | ⬜ pending |
| 68-04-01 | 04 | 1 | (V-61-19/20) | — | MILESTONES.md lines 3-71 deleted (cdcce23 garbage v1.5 H2 entry); correct entry at new line 1+ preserved | unit | `grep -c "^## v1.5" .planning/MILESTONES.md` returns 1 | ✅ | ⬜ pending |
| 68-04-02 | 04 | 1 | (V-61-19/20) | — | check-phase-61 V-61-19 + V-61-20 PASS after deletion | unit | `node scripts/validation/check-phase-61.mjs` | ✅ | ⬜ pending |
| 68-05-01 | 05 | 3 | (close-gate) | — | Full chain check-phase-{48..66} ALL PASS, 0 FAIL, 0 SKIPPED | end-to-end | full chain command above | ✅ | ⬜ pending |
| 68-05-02 | 05 | 3 | (close-gate) | — | v1.5-milestone-audit.mjs 12/12 PASS in fully-blocking mode | end-to-end | `node scripts/validation/v1.5-milestone-audit.mjs` | ✅ | ⬜ pending |
| 68-05-03 | 05 | 3 | (close-gate) | — | v1.6-milestone-audit.mjs 15/15 PASS in fully-blocking mode | end-to-end | `node scripts/validation/v1.6-milestone-audit.mjs` | ✅ | ⬜ pending |
| 68-05-04 | 05 | 3 | (close-gate) | — | regenerate-supervision-pins.mjs --self-test exits 0 | end-to-end | self-test command above | ✅ | ⬜ pending |
| 68-05-05 | 05 | 3 | (close-gate) | — | 68-VERIFICATION.md authored with SC#1-5 checklist + Atomic-Commit SHA Record + Discoveries + Phase 69 Readiness Signal | doc | `test -f 68-VERIFICATION.md && grep -c "^## " 68-VERIFICATION.md` ≥ 6 | ❌ W0 (created here) | ⬜ pending |
| 68-05-06 | 05 | 3 | (close-gate) | — | v1.7-DEFERRED-CLEANUP.md stub created with cdcce23 line item + check-phase-31 closure note | doc | `test -f .planning/milestones/v1.7-DEFERRED-CLEANUP.md && grep -c "cdcce23" .planning/milestones/v1.7-DEFERRED-CLEANUP.md` ≥ 1 | ❌ W0 (created here) | ⬜ pending |
| 68-05-07 | 05 | 3 | (close-gate) | — | PROJECT.md + REQUIREMENTS.md CHAIN-01/02/03 flipped Active→Validated with closing commit SHAs | doc | `grep -c "CHAIN-0[123].*Validated" .planning/REQUIREMENTS.md` ≥ 3 | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [x] `scripts/validation/check-phase-{31,48,51,58,60,61,62,63,64,65,66}.mjs` — all 11 affected chain validators exist
- [x] `scripts/validation/v1.5-milestone-audit.mjs` + `scripts/validation/v1.6-milestone-audit.mjs` — milestone harnesses exist
- [x] `scripts/validation/regenerate-supervision-pins.mjs` — pin helper exists
- [x] `scripts/validation/v1.5-audit-allowlist.json` + `scripts/validation/v1.6-audit-allowlist.json` — both sidecars exist
- [x] Node v24.15.0 + `node:fs` + `node:path` ESM imports available (verified)

**Wave 0 is COMPLETE by construction.** Phase 68 is validator surgery — the deliverables ARE the new helper file + edits to existing validators. The existing chain harness is the test framework. No new test scaffolding required.

**Items requiring Wave 0 creation IN Phase 68 plans (not in W0 dependencies):**
- `scripts/validation/_lib/archive-path.mjs` — new helper file (created by Plan 68-02 Wave 1)
- `68-VERIFICATION.md` — created by Plan 68-05
- `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` — stub created by Plan 68-05

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual review of MILESTONES.md post-delete | (V-61-19/20) | The garbage entry detection is structural (duplicate `## v1.5` H2), but visual inspection of `sed -n '1,30p' .planning/MILESTONES.md` confirms the correct entry remains first H2 with intact Methodology highlights + DEFER-07/08 citations | Run: `head -30 .planning/MILESTONES.md` — confirm single `## v1.5 Linux Platform...` H2; "Methodology highlights" appears in same block; "DEFER-07" + "DEFER-08" both cited |
| cdcce23 garbage-insert root cause investigation | (deferred) | Investigating the archive-script defect itself requires diff against `gsd-complete-milestone` skill source — out of Phase 68 scope, deferred to v1.7-DEFERRED-CLEANUP.md | Plan 68-05 author authors deferred line item; Phase 70 v1.7 archival audits MILESTONES.md post-archive |

*All Phase 68 deliverable verifications are automated. Manual items are post-phase forensics (cdcce23 root cause) or visual sanity (MILESTONES.md deletion).*

---

## Validation Sign-Off

- [x] All tasks have automated verify (the chain validators ARE the automation)
- [x] Sampling continuity: no 3 consecutive tasks without automated verify (every task has its own validator)
- [x] Wave 0 covers all MISSING references (3 created within plans; rest exist)
- [x] No watch-mode flags (validators are single-shot subprocess invocations)
- [x] Feedback latency < 60s (per-validator ~2-5s; full chain ~60s)
- [ ] `nyquist_compliant: true` set in frontmatter (flip at Plan 68-05 close-gate after full chain green)

**Approval:** pending (auto-approved at Plan 68-05 close-gate when full chain exits 0 across 19 validators + 2 milestone audits + 1 self-test)
