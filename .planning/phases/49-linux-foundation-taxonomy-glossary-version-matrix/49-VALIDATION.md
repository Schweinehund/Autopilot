---
phase: 49
slug: linux-foundation-taxonomy-glossary-version-matrix
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-26
---

# Phase 49 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js inline validators (`check-phase-49.mjs`) + v1.5 milestone harness (`v1.5-milestone-audit.mjs`) — no external test framework; markdown-link-check (npm) for C13 |
| **Config file** | `.mlc-config.json` (Phase 48 deliverable) for markdown-link-check; `scripts/validation/v1.5-audit-allowlist.json` sidecar for harness |
| **Quick run command** | `node scripts/validation/check-phase-49.mjs` |
| **Full suite command** | `node scripts/validation/check-phase-49.mjs && node scripts/validation/v1.5-milestone-audit.mjs && node scripts/validation/regenerate-supervision-pins.mjs --self-test` |
| **Estimated runtime** | ~3-5 seconds (file-reads-only validators; no network calls) |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/validation/check-phase-49.mjs` (validator-as-deliverable contract per AUDIT-06)
- **After commit-1 (foundation):** Run full suite WITHOUT reciprocal-string check (`check-phase-49.mjs --skip-reciprocal`)
- **After commit-2 (reciprocal appends):** Run full suite WITH reciprocal-string check + `regenerate-supervision-pins.mjs --self-test`
- **Before `/gsd-verify-work`:** Full suite must be green; `v1.5-milestone-audit.mjs --verbose` PASS on C1-C10 blocking + C11-C13 informational PASS or accepted-noise
- **Max feedback latency:** 10 seconds (file-reads-only; no network)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 49-01-01 | 01 | 1 | LIN-01 | — | Whitelist H2 + Out-of-Scope H2 + Enrollment Constraints H2 + Cross-platform bridge subsection present | structural | `node scripts/validation/check-phase-49.mjs --skip-reciprocal` (V-49-02..V-49-06) | ❌ W0 | ⬜ pending |
| 49-02-01 | 02 | 1 | LIN-01 | — | Version matrix has 3 rows × 5 cols; Ubuntu 20.04 EOS H3 + Non-version Breakpoints H3 present | structural | `node scripts/validation/check-phase-49.mjs --skip-reciprocal` (V-49-09..V-49-12) | ❌ W0 | ⬜ pending |
| 49-03-01 | 03 | 1 | LIN-02 | — | Glossary has 5 H2 categories + ~20 native terms + 9 absent-concept entries + per-term cross-platform notes on collision-risk terms | structural + collision audit | `node scripts/validation/check-phase-49.mjs --skip-reciprocal` (V-49-13..V-49-19) | ❌ W0 | ⬜ pending |
| 49-04-01 | 04 | 2 | LIN-01, LIN-02 | — | check-phase-49.mjs implemented (22 checks); ROADMAP SC#4 + REQUIREMENTS LIN-02 traceability corrected | structural + script integrity | `node scripts/validation/check-phase-49.mjs --skip-reciprocal` exit 0 | ❌ W0 | ⬜ pending |
| 49-04-02 | 04 | 2 | LIN-01, LIN-02 | — | All 3 new Linux files have `platform: Linux` + 60-day `last_verified`/`review_by` frontmatter | C10 frontmatter (harness) | `node scripts/validation/v1.5-milestone-audit.mjs` (C10 PASS) | ❌ W0 | ⬜ pending |
| 49-05-01 | 05 | 3 | LIN-02 | — | 3 reciprocal append strings present in `_glossary.md`, `_glossary-android.md`, `_glossary-macos.md` top platform-coverage blockquotes | string-presence | `node scripts/validation/check-phase-49.mjs` (V-49-20, V-49-21, V-49-22) | ❌ W0 | ⬜ pending |
| 49-05-02 | 05 | 3 | LIN-02 | — | Pin coordinate refresh: `regenerate-supervision-pins.mjs --self-test` exits 0 post-commit | pin integrity | `node scripts/validation/regenerate-supervision-pins.mjs --self-test` (exit 0) | ❌ W0 | ⬜ pending |
| 49-05-03 | 05 | 3 | LIN-01, LIN-02 | — | VERIFICATION.md authored documenting whitelist text + matrix dump + collision audit results | doc presence | `test -f .planning/phases/49-*/49-VERIFICATION.md` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

**Wave layout:**
- **Wave 1 (parallel):** Plans 01 (enrollment overview), 02 (prerequisites + matrix), 03 (glossary) — disjoint files; can author concurrently
- **Wave 2 (after Wave 1):** Plan 04 (validator + ROADMAP/REQUIREMENTS edits + commit-1 verify) — needs all 3 new docs to exist for validator structural assertions to pass
- **Wave 3 (after Wave 2):** Plan 05 (reciprocal appends + pin refresh + commit-2 + VERIFICATION.md) — sequential; touches existing pinned files

---

## Wave 0 Requirements

- [ ] `scripts/validation/check-phase-49.mjs` — NEW validator (22 checks per RESEARCH.md §3); file-reads-only inline regex; mirrors `check-phase-30.mjs` / `check-phase-31.mjs` style per Phase 48 D-25
- [ ] `scripts/validation/v1.5-milestone-audit.mjs` — DEPENDENCY from Phase 48 (must exist; Phase 48 D-23 wave-1 deliverable). Phase 49 docs validated against this harness for C10 blocking.
- [ ] `scripts/validation/v1.5-audit-allowlist.json` — DEPENDENCY from Phase 48 (sidecar; pin-coord refresh in Phase 49 commit-2 may add `supervision_exemptions[]` updates if `_glossary-android.md` line shifts occur)
- [ ] `.github/workflows/audit-harness-v1.5-integrity.yml` — DEPENDENCY from Phase 48 (Phase 49 validator gets registered per Phase 48 D-18 lazy-skip pattern)
- [ ] markdown-link-check (npm) installed — DEPENDENCY from Phase 48 (C13 informational broken-link check)

**Phase 48 dependency check:** Before Phase 49 begins, verify Phase 48 VERIFICATION.md exists and v1.5 harness is operational. Per ROADMAP §Phase 49 line 166: "Depends on: Phase 48 (broken-link inventory available; harness running)."

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| BYOD `> ⚠️ Known caveat` blockquote text content quality (matches LIN-01 1c FOLD intent surfacing the Microsoft Learn enrollment-framing inconsistency) | LIN-01 | Validator checks blockquote PRESENCE, not semantic correctness of caveat text | Reviewer reads `00-enrollment-overview.md` Enrollment Constraints H3; verifies caveat text references Microsoft Learn BYOD-vs-corporate-owned framing inconsistency per LIN-01 wording |
| Cross-platform bridge subsection (D-05/D-06) carries explicit "the mapping is partial" framing for each platform analog (Windows / macOS / Android) | LIN-01 | Validator checks subsection PRESENCE (V-49-04), not partial-mapping discipline content | Reviewer reads "For Admins Familiar with..." subsection; verifies each platform analog includes "the mapping is partial" or equivalent disclaimer; verifies no PITFALL-1 / PITFALL-2 framing leakage (no "Linux CA is similar to iOS CA"-style claims) |
| Linux 20+ native term DEFINITIONS are accurate (not just present) | LIN-02 | Validator checks term PRESENCE in glossary (V-49-15), not definition correctness | Reviewer reads `_glossary-linux.md`; verifies each definition matches RESEARCH.md §5 canonical text or Microsoft Learn current source; flags any LOW/MEDIUM-confidence entries needing live verification |
| 9 absent-concept callout entries actually redirect to correct cross-platform glossary anchors | LIN-02 | Validator checks H3 PRESENCE (V-49-17), not link target validity | Reviewer reads "Cross-Platform Collisions" H2 entries; verifies each callout-only entry contains a markdown link to the correct sibling glossary anchor (e.g., `[Supervision in Apple Glossary](_glossary-macos.md#supervision)`) |
| Identity Broker H3 content (Non-version Breakpoints) sources from Microsoft Learn HIGH-confidence research | LIN-01 | Validator checks H3 PRESENCE (V-49-12), not source attribution | Reviewer reads `01-linux-prerequisites.md#non-version-breakpoints`; verifies content matches RESEARCH.md §5 Identity Broker entry (HIGH confidence MS Learn 2026-03-31); cites source URL inline |
| Live-environment verification of `intune-portal` deb package version (deferred per RESEARCH §10 Risk 1) | LIN-02 (glossary entry) | Cannot run `apt info intune-portal` without Ubuntu 22.04/24.04 environment | Executor runs `apt info intune-portal` on a current Ubuntu install at execution time; updates glossary entry with verified version + `last_verified` date; if not feasible, retains `[verify-on-current-Ubuntu]` marker per CD-05 |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify (V-49-01 through V-49-22) or Wave 0 dependencies (Phase 48 harness availability)
- [x] Sampling continuity: every commit triggers check-phase-49.mjs; no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references (Phase 48 harness + sidecar + CI yml + markdown-link-check)
- [x] No watch-mode flags (validators are file-reads-only one-shot)
- [x] Feedback latency < 10s (file-reads-only; no network calls)
- [ ] `nyquist_compliant: true` set in frontmatter (TODO: flip after planner integrates this VALIDATION.md into all 5 plans)

**Approval:** pending — flip to approved YYYY-MM-DD after planner confirms each plan's tasks reference the V-49-NN check IDs.

---

## Validation Coverage Summary (per Success Criteria)

| ROADMAP SC# | Criterion | V-49-NN Coverage | Pass Condition |
|---|---|---|---|
| SC#1 | Whitelist H2 + Out-of-Scope callout + BYOD caveat block | V-49-02, V-49-03, V-49-05, V-49-06 | All 4 PASS in check-phase-49.mjs |
| SC#2 | Version matrix with GA/HWE columns + 3 distro rows | V-49-09, V-49-10 | Both PASS in check-phase-49.mjs |
| SC#3 | Glossary with collision audit | V-49-13, V-49-19 | Both PASS in check-phase-49.mjs |
| SC#4 | Reciprocal Linux see-also in 3 existing glossaries | V-49-20, V-49-21, V-49-22 | All 3 PASS in check-phase-49.mjs (post-commit-2) |
| SC#5 | All Phase 49 files have `platform: Linux` + 60d cycle frontmatter | V-49-18 + C10 (harness) | check-phase-49.mjs V-49-18 PASS + v1.5-milestone-audit.mjs C10 PASS |

100% SC coverage by automated tests. Manual verifications cover semantic content quality (definition accuracy, partial-mapping discipline, source attribution) per the table above.

---

## Independence Check

- check-phase-49.mjs is FILE-READS-ONLY (no shared module per Phase 48 D-25); cannot be defeated by the executor stubbing dependencies
- v1.5-milestone-audit.mjs is the independent harness owned by Phase 48; cannot be modified by Phase 49 (Path A FROZEN-marker discipline)
- regenerate-supervision-pins.mjs --self-test compares baseline pin coordinates to current file state; deterministic; cannot be defeated by partial commits

The validation strategy is independent of the implementation in three ways: (a) different file (validator vs content); (b) different process (Node validator vs markdown content); (c) different ownership (Phase 48 harness vs Phase 49 content).
