# Phase 66: Apple Business Validation Tooling Closure + Milestone Audit - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-24
**Phase:** 66-apple-business-validation-tooling-closure-milestone-audit
**Areas discussed:** AUDIT-14 atomic-commit scope, C15 refinement scope, Terminal re-audit fresh-worktree mechanics, CI workflow trigger surface
**Mode:** `--chain` (interactive discuss, then auto-advance to plan-phase + execute-phase)
**Resolution method:** 4 parallel `gsd-advisor-researcher` agents, each running adversarial-review-style scoring (Finder argues FOR, Adversary argues AGAINST, Referee picks winner) per user's standing preference (`feedback_adversarial_review_preference` memory). User accepted all 4 recommendations without revision via "Accept all 4 + write CONTEXT" gate.

---

## AUDIT-14 atomic-commit scope

| Option | Description | Score (lower=better) | Selected |
|--------|-------------|----------------------|----------|
| A. One atomic harness commit | All 5 sub-actions (C11 keyword extension + C15 regex back-port + BASELINE_10 refresh + c13_rotting_external population + check-phase-66.mjs assertions) in ONE indivisible commit; v1.5 Plan 60-08 / Phase 62-08 precedent | **1** | ✓ |
| B. Per-action commits with close-gate | 5 sequential commits + 1 close-gate verification commit; narrow review surface per commit | 5 | |
| C. Two-commit split (engine vs data) | (1) regex/engine changes atomic; (2) sidecar+allowlist atomic; separates engine refinement from data population | 3 | |

**User's choice:** A (via "Accept all 4")
**Notes:** Decisive evidence was Phase 65's V-62-SIDECAR cascade at `65-VERIFICATION.md:255-261` — a planned 3-file atomic commit had to grow to 4 files mid-execution because cross-validator dependencies emerged at commit time. AUDIT-14 has the same cross-state topology. Per advisor: "the lesson encoded in that deviation note is exactly: when validators and validated content share state, you cannot split commits without staging a RED chain window." Plan must budget for a 5th reconciliation file discovered during pre-commit dry-run.

---

## C15 banned-phrase refinement scope

| Option | Description | Score (lower=better) | Selected |
|--------|-------------|----------------------|----------|
| A. Audit existing 18- exemptions for staleness only | Walk all 24 ABAUDIT comments; verify each next-line still triggers a C15 regex; remove orphans; add V-66-ABAUDIT-STALENESS validator; NARROW reading of "refined" | **2** | ✓ |
| B. Sweep Phase 62-65 deliverables + add new regexes | Add regexes for compound patterns; BROAD reading of "refined" | 9 | |
| C. Both A and B | Comprehensive on paper | 8 | |

**User's choice:** A (via "Accept all 4")
**Notes:** Advisor's offline regex test against the shipped corpus found zero in-scope phrasings that currently trigger an unexempted match. All 47 banned-phrase-shape Intune mentions are either ABAUDIT-exempted (24 exemptions / 11 files, 7 in 18- per Phase 64 D-08) or out-of-window. Adding new regexes would retroactively flag PASS content (e.g., `00-overview.md:29`, `02-ous-architecture.md:14`), forcing new ABAUDITs outside 18- — direct D-04 anti-redundancy + Phase 64 D-08 SOT-host contract violation. **Bonus advisor finding folded into the same atomic commit:** back-port `v1.6-milestone-audit.mjs:854` synthetic regex 7 to match `:725` production (negative-lookahead exclusion `personal|Apple\s+Business|scopes|ABM|account` not yet in synthetic) — keeps `--self-test` honest; this is the ONE actual harness change that survives adversarial scrutiny.

---

## Terminal re-audit fresh-worktree mechanics

| Option | Description | Score (lower=better) | Selected |
|--------|-------------|----------------------|----------|
| A. Worktree per D-22 literal | `git worktree add` matching v1.5 Phase 61 precedent | 8 | |
| B. Fresh-clone in temp dir as worktree substitute | `git clone --no-hardlinks D:\claude\Autopilot $env:TEMP\v1.6-audit-<rand>` spawned by fresh `gsd-executor` sub-agent; STRICTER physical isolation than worktree (separate .git/) | **3** | ✓ |
| C. Logical-only (different agent on main tree) | Fresh sub-agent on main tree; decision-independence without physical isolation | 5 | |
| D. Worktree-first with documented fallback | Try worktree, document failure, fall back to B or C | 6 | |

**User's choice:** B (via "Accept all 4")
**Notes:** Reconciles user's standing memory note `project_execphase_sequential.md` (worktree lifecycle unreliable on Windows; `.planning/config.json` `use_worktrees:false` proven stable across Phase 64 + Phase 65) with D-22's INTENT (per `65-CONTEXT.md:95`: prevent "auditor grading content against assertions it wrote" — threat model is agent-context-carryover, not worktree-specific). Fresh `git clone` is STRICTER physical isolation than worktrees (separate `.git/` vs shared) AND bypasses the user-documented worktree-lifecycle hazard. `performed_by` field in `v1.6-MILESTONE-AUDIT.md` documents both divergence-from-literal-D-22 AND satisfaction-of-intent. CHAIN_SKIP {48, 51, 58, 60, 61} remain suppressed (same Windows host → same CRLF behavior); resolution deferred to v1.7 CI-Linux job per new entry in `v1.6-DEFERRED-CLEANUP.md`.

---

## CI workflow trigger surface

| Option | Description | Score (lower=better) | Selected |
|--------|-------------|----------------------|----------|
| A. Single workflow + quarterly cron addition | Path-A verbatim copy of v1.5 yml; tight v1.6-scoped path-filter; add 2nd cron for c13_rotting_external; new `rotting-external-quarterly` job gated by schedule `if:`; PR-blocking | **2** | ✓ |
| B. Two separate workflows | (1) PR-blocker + weekly cron; (2) standalone quarterly bitrot workflow | 3 | |
| C. Broader path-filter inheritance | Include `docs/admin-setup-{ios,macos}/**`; catches cross-milestone edits | 4 | |
| D. Advisory-only mode | `continue-on-error: true` on harness-run; gentler rollout | 5 (eliminated) | |

**User's choice:** A (via "Accept all 4")
**Notes:** Option D eliminated by D-A9 (`STATE.md:93` — C14/C15/C16 blocking-from-start) + ROADMAP:241 "fully-blocking mode." Option A wins on (a) literal Path-A from v1.5 per AUDIT-13 contract, (b) ROADMAP:239 "quarterly audit **job**" singular wording favors one-workflow over splitting, (c) tight path-filter avoids alarm-fatigue on unrelated v1.0-v1.5 PRs while weekly cron is the safety net (5-day max drift). 14-entry path-filter list enumerated in CONTEXT.md D-04. Coexists with `audit-harness-integrity.yml` (v1.4) and `audit-harness-v1.5-integrity.yml` (v1.5) — do NOT modify older files. Hub-file inclusion (`common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `operations/00-index.md`, `docs/index.md`) is intentional — v1.7+ Linux edits MUST trigger v1.6 audit to catch ABNAV append-only contract regressions.

---

## Claude's Discretion (planner/researcher decides)

- Exact CI-1/CI-2/CI-3 enumeration content for `c13_rotting_external` population (~30 ABM URLs + 2 specific VPP-location-token lines + corpus-wide Managed-Apple-ID refs); PITFALLS.md:615-668 is source-of-truth
- Exact synthetic regex-7 back-port text (copy production line 725 negative-lookahead verbatim to line 854)
- Plan wave structure for Phase 66 (recommended 5-wave: W1 scaffold + ABAUDIT walk → W2 AUDIT-14 atomic commit → W3 CI workflow + DEFERRED-CLEANUP → W4 fresh-clone terminal re-audit → W5 MILESTONE-AUDIT + traceability closure)
- `v1.6-MILESTONE-AUDIT.md` body structure (follow `v1.5-MILESTONE-AUDIT.md` verbatim; deferred_items block cross-links to v1.6-DEFERRED-CLEANUP.md)
- `v1.6-DEFERRED-CLEANUP.md` body structure (one section per CI-N candidate with file paths + line refs + trigger-to-sweep; section for CHAIN_SKIP-CRLF deferred-CI-Linux item)
- `check-phase-66.mjs` V-66-NN test ID numbering (continues from V-65-NN); CHAIN_PHASES array does NOT include 66 per V-NN-SELF pattern at `check-phase-65.mjs:151`

---

## Deferred Ideas

- CI-1 (~30 ABM URL refs corpus sweep) → v1.7+ via `v1.6-DEFERRED-CLEANUP.md`
- CI-2 (2 VPP-location-token surgical line renames) → v1.7+ via `v1.6-DEFERRED-CLEANUP.md`
- CI-3 (Managed-Apple-ID corpus-wide rename) → v1.7+ via `v1.6-DEFERRED-CLEANUP.md` (contingent on Intune adopting rebrand)
- CHAIN_SKIP {48, 51, 58, 60, 61} resolution via CI-Linux job → v1.7+ via `v1.6-DEFERRED-CLEANUP.md` (NEW deferred item from D-03 advisor finding; addresses Section K:439 aspirational expectation)
- Worktree-lifecycle remediation on Windows → out of v1.6 scope (user's standing constraint is durable)
- Multi-tenant Apple Business + Apple Business Device API documentation + per-OU CRD deep-dive + dedicated Account Holder lockout recovery runbook → v1.7+ (carried from Phases 63-65)

---

*Discussion log generated: 2026-05-24*
*Phase 66 ready for `/gsd-plan-phase 66 --chain` auto-advance.*
