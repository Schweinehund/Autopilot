---
phase: 64
slug: apple-business-delegation-runbooks
status: approved
nyquist_compliant: true
wave_0_complete: false
created: 2026-05-22
---

# Phase 64 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> This is a DOCUMENTATION phase — "tests" are structural assertions in the
> `check-phase-64.mjs` validator-as-deliverable plus the active milestone-audit
> C15/C16 corpus-integrity gates. No application runtime.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js ESM validator (`scripts/validation/check-phase-64.mjs`) — Path-A copy from `check-phase-63.mjs` |
| **Config file** | none — standalone script; milestone harness `v1.6-milestone-audit.mjs` already active since Phase 62 |
| **Quick run command** | `node scripts/validation/check-phase-64.mjs` |
| **Full suite command** | `node scripts/validation/v1.6-milestone-audit.mjs && node scripts/validation/check-phase-64.mjs` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** `node scripts/validation/check-phase-64.mjs`
- **After every plan wave:** `node scripts/validation/v1.6-milestone-audit.mjs && node scripts/validation/check-phase-64.mjs`
- **Before `/gsd:verify-work`:** Full suite green (all check-phase-64 assertions PASS + C14/C15/C16 PASS)
- **Max feedback latency:** ~5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 64-01-01 | 01 | 1 | (harness) | — | check-phase-64.mjs scaffolds DELEG-01..08 assertions | structural | `node scripts/validation/check-phase-64.mjs` | ❌ W1 | ⬜ pending |
| 64-01-02 | 01 | 1 | (convention) | — | hard-bordered callout exact-string + ABAUDIT-05 registry committed | structural exact-string | `node scripts/validation/check-phase-64.mjs` | ❌ W1 | ⬜ pending |
| 64-02-01 | 02 | 2 | DELEG-01 | — | `11-` exists; OP-9 hard-bordered callout exact string; license-count 0.1% verify | structural exact-string | `node scripts/validation/check-phase-64.mjs` | ❌ W1 | ⬜ pending |
| 64-02-02 | 02 | 2 | DELEG-02 | OP-11 | `12-` exists; Path A→B→C order; OP-11 hard callout; NO `34-apple-business` ref | structural section-order + negative | `node scripts/validation/check-phase-64.mjs` | ❌ W1 | ⬜ pending |
| 64-02-03 | 02 | 2 | DELEG-03 | OP-6 | `13-` exists; hard callout "release ≠ removal" + 30-day | structural | `node scripts/validation/check-phase-64.mjs` | ❌ W1 | ⬜ pending |
| 64-02-04 | 02 | 2 | DELEG-04 | OP-5 | `14-` exists; hard callout; 4-cell impact matrix + dependency checklist | structural | `node scripts/validation/check-phase-64.mjs` | ❌ W1 | ⬜ pending |
| 64-02-05 | 02 | 2 | DELEG-05 | — | `15-` exists; EXACTLY ONE file (no `15b-`); OS-eligibility matrix; 2 sub-H2s | anti-proliferation | `node scripts/validation/check-phase-64.mjs` | ❌ W1 | ⬜ pending |
| 64-02-06 | 02 | 2 | DELEG-06 | OP-7 | `16-` exists; manual+SCIM+OIDC+JIT; 60-day federation collision sub-H2 | structural | `node scripts/validation/check-phase-64.mjs` | ❌ W1 | ⬜ pending |
| 64-02-07 | 02 | 2 | DELEG-07 | OP-13/14 | `17-` exists; author/target scope; SIEM export; no-public-REST-API anti-feature | structural | `node scripts/validation/check-phase-64.mjs` | ❌ W1 | ⬜ pending |
| 64-02-08 | 02 | 2 | DELEG-08 | — | `18-` exists; disambiguation table; ABAUDIT exemptions (one per banned line) | structural + C15 | `node scripts/validation/v1.6-milestone-audit.mjs` | Harness | ⬜ pending |
| 64-02-ALL | 02 | 2 | All 8 | — | envelope: `last_verified:` + `platform:` frontmatter + `## Verification` H2 (all 8); `## Required Role & Permission` H2 (action runbooks `11-`–`17-` ONLY; `18-` cheat-sheet exempt) | structural section-slice | `node scripts/validation/check-phase-64.mjs` | ❌ W1 | ⬜ pending |
| 64-03-01 | 03 | 3 | All | — | full suite green: check-phase-64 all PASS + C14/C15/C16 PASS | corpus-integrity | `node scripts/validation/v1.6-milestone-audit.mjs && node scripts/validation/check-phase-64.mjs` | ❌ W1 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky · ❌ W1 = file created in Wave 1*
*(Task IDs are indicative; the planner finalizes the exact plan/task decomposition.)*

---

## Wave 0 Requirements

- [ ] `scripts/validation/check-phase-64.mjs` — Path-A copy from `check-phase-63.mjs`; extend with DELEG-01..08 deliverable assertions, the envelope greps (frontmatter + `## Required Role & Permission` + `## Verification`), the OP-9/OP-11 hard-bordered-callout exact-string asserts, the `12-` negative `34-apple-business` assertion, and the `15-` anti-proliferation (exactly-one-file) check. Built in Wave 1 (the milestone harness `v1.6-milestone-audit.mjs` itself already exists and is active).

*The validator is a phase deliverable, not pre-existing infrastructure — hence it is the Wave 1 gate that all Wave 2 runbook tasks validate against.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Apple Business portal navigation paths are accurate to 2026 UI | DELEG-01/02/06 | Apple does not publish stable deep-link paths; AI-authored from training data | Each runbook tags portal-path claims with a training-data notice + `last_verified` date; human verifies in live portal within the 60-day window (NOT a harness gate) |
| Operational procedure correctness (e.g. Path B ClearPasscode does NOT reset Shared iPad partition passcode) | DELEG-02 | Semantic accuracy of the documented behavior cannot be asserted by a structural grep | Reviewer confirms against Apple Support docs; flagged as the highest-stakes claim in `12-` |

---

## Validation Sign-Off

- [x] All tasks have an `<automated>` verify (check-phase-64.mjs) or Wave 1 dependency
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 1 builds `check-phase-64.mjs` covering all DELEG-01..08 + envelope + exact-string assertions
- [x] No watch-mode flags
- [x] Feedback latency < 5s
- [x] `nyquist_compliant: true` set in frontmatter (after planner maps every task)

**Approval:** approved 2026-05-22
