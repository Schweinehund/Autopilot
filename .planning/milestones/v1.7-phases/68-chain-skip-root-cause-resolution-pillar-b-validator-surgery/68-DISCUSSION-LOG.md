# Phase 68: CHAIN_SKIP Root-Cause Resolution (Pillar B — Validator Surgery) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-26
**Phase:** 68-chain-skip-root-cause-resolution-pillar-b-validator-surgery
**Areas discussed:** CHAIN-01 regex strategy, CHAIN-02 archive-path mechanism, CHAIN-02 self-test line-drift fix, CHAIN-03 cascade scope
**Mode:** /adversarial-review (per user memory `feedback_adversarial_review_preference`) — 4 parallel `gsd-advisor-researcher` agents in adversarial-review mode (Finder/Adversary/Referee scoring; lower = better)
**Approval shape:** Single "Approve all 4 + 5-plan layout" — no per-area renegotiation

---

## D-01: CHAIN-01 regex strategy for check-phase-51.mjs + check-phase-58.mjs

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | Surgical regex per ROADMAP letter (`\n` → `\r?\n` literal) — touches multiple regex sites per file | 16 | |
| B | Centralize CRLF normalization in `readFile()` — verbatim idiom from check-phase-48/60 + regenerate-supervision-pins (Phase 31 `ca40eb9` lineage) | **8** | ✓ |
| C | Audit-only — confirm 51 + 58 pass; document; remove from CHAIN_SKIP without source edits | 15 | |
| D | Defense-in-depth (A + B) | 14 | |

**User's choice:** Option B (winner per adversarial scoring; approved without revision)

**Notes:**
- Both validators already PASS on Windows today (51 → 25/25; 58 → 26/26) — target docs are LF (verified: `09-linux-triage.md` = 6204 bytes LF; `4-platform-capability-comparison.md` = 21785 bytes LF).
- Adversarial wedge: ROADMAP SC#1's narrow "regex updated" wording does NOT cover `check-phase-58.mjs:188`'s literal-string `c.indexOf("---\n", 4)` — Option A misses this under CRLF re-injection.
- Discovery: The user-prompted Option A regex-inventory at `check-phase-51.mjs:190-192/205-208/221-223` was WRONG — those `\n` tokens are inside `[^\n]*` NEGATED character classes, not line-ends. Option A would inject ~9 semantic-bug edits.
- SC#1 satisfied via INTENT-equivalence (Phase 67 D-04 "no active validator constrains the boundary" precedent).
- Planner caveat captured in CONTEXT.md decisions: `check-phase-68.mjs` HARNESS-03 Path-A self-verifier must use INTENT check (exit 0 + 0 CHAIN_SKIP) not literal-letter grep.

**Dossier:** `.claude/tmp/phase68-D01-advisor.md`

---

## D-02: CHAIN-02 archive-path detection mechanism

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | Try-both probe (live first, archived fallback) in-line per validator | 21 | |
| B | Helper function `resolveArchivedPhasePath()` exported from new `scripts/validation/_lib/archive-path.mjs` — reusable across 6 currently-affected validators + future Phase 70 Path-A inheritors | **9** | ✓ |
| C | Hardcode post-archival path (one-way) — smaller diff today but recurs as drift | 25 | |
| D | Read STATE.md / MILESTONES.md to detect archive state | 29 | |

**User's choice:** Option B (winner per adversarial scoring; approved without revision)

**Notes:**
- Scope is WIDER than originally framed: 6 affected validators today (check-phase-31, 48, 60-×2, 62, 63) + every future milestone-close via HARNESS-03 Path-A copy at Phase 70.
- REQUIREMENTS.md:20 literal compliance: "handles BOTH pre-archival AND post-archival" — Option C HARD-VIOLATES this.
- Auditor-independence at Phase 70 fresh-clone: Option D breaks under partial-clone or mid-edit STATE.md conditions; Option B is purely filesystem-driven.
- DRY discipline: Option A scatters 3-line logic across 6+ sites; Option B is single point of intent.
- **Bonus discovery:** Pre-existing silent-swallow data-integrity bug at `check-phase-31.mjs:32` — helper trivially fixes (caller-decides FAIL semantics instead of validator silently passing on missing file). Closed in this phase.

**Dossier:** `.claude/tmp/phase68-D02-advisor.md`

---

## D-03: CHAIN-02 self-test line-drift fix (regenerate-supervision-pins.mjs --self-test)

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | Line-number rebase of `v1.5-audit-allowlist.json` BASELINE_9 entries (literal REQUIREMENTS.md Option A) | 17 | |
| A-prime | BASELINE_9 coord rebase + sidecar lineage repoint v1.5→v1.6 (novel reframe — 2 surgical edits to one file) | **8** | ✓ |
| B | ±1 line tolerance in self-test (literal REQUIREMENTS.md Option B) | 18 | |
| C | Hybrid: rebase + ±1 tolerance | 24 | |
| D | Deep-fix classifier regex/state machine | 15 | |

**User's choice:** Option A-prime (novel reframe — winner per adversarial scoring; approved without revision)

**Notes:**
- **Reframes the FAIL at root.** Empirical issue is NOT corpus drift — it's a **sidecar-target staleness bug**. The helper reads v1.5 (pre-Phase-62-07) but v1.6 sidecar already carries +1-rebased coords from Phase 66-02 atomic harness commit `3a9a671`.
- Resolution = 2 surgical edits to ONE file (`regenerate-supervision-pins.mjs`): refresh BASELINE_9 `_glossary-android.md` coord entries `{79, 81, 181, 198}` → `{80, 82, 182, 199}` + repoint `parseAllowlist()` from v1.5 to v1.6 sidecar (line 422).
- Honors helper author's anti-tolerance directive: "do NOT relax the helper to silence the diff" (line 499). We **tighten via lineage repoint**, not relax via tolerance window.
- Line-80 `### Supervision` Tier-2 hit absorbed via v1.6 sidecar's pinned-Tier-2 `~` marker (helper's own anti-tolerance exception doctrine at lines 472-476).
- ROADMAP SC#5 validator-only-commit ✓; auditor-independence ✓ (v1.5 sidecar untouched for self-test purposes; v1.5 sidecar's `supervision_exemptions[]` separately rebased in same Plan 68-02 commit for V-60-23 per D-04 expansion).
- Phase 70 HARNESS-02 BASELINE_11 refresh carry-forward = 1-line repoint to v1.7 sidecar at that future commit.

**Dossier:** `.claude/tmp/phase68-D03-advisor.md`

---

## D-04: CHAIN-03 cascade scope (for check-phase-60.mjs + check-phase-61.mjs)

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | Pure cascade only — assume 60/61 auto-pass after 48 fix | not winner | |
| B | Cascade + restore archived artifacts to live `.planning/phases/...` paths | not winner | |
| C | Cascade + apply Gray Area D-02 archive-aware mechanism to check-phase-{60,61} | not winner | |
| D | Cascade + path update + MILESTONES.md content restoration in same plan | not winner | |
| E | Cascade + path update + MILESTONES.md remediation as separately-classified plan (4-plan split + close-gate = 5 plans) | **10** | ✓ |

**User's choice:** Option E (winner per adversarial scoring; approved without revision)

**Notes:**
- **"Corpus" definition resolved empirically.** 4 independent sources (`REQUIREMENTS.md:4`, `:48`, `ROADMAP.md:283`, `STATE.md:145`) all use "corpus" = `docs/*`. `.planning/MILESTONES.md` is planning doc, NOT corpus. SC#5 "no out-of-band corpus edits" does NOT block the MILESTONES.md edit.
- **Critical discovery:** V-61-19 / V-61-20 are NOT content gaps — they are a **corpus defect**. Commit `cdcce23` (2026-05-07 archive automation) inserted a SECOND, GARBAGE v1.5 H2 entry at MILESTONES.md lines 3-70 above the correct entry at lines 73-92. Validator's `indexOf('## v1.5 ')` returns garbage entry → FAIL. **Fix = surgical DELETE lines 3-71; zero content authoring.**
- **V-60-23 root cause expanded:** Distinct from CHAIN-01/02 literal scope — `v1.5-milestone-audit.mjs` exit 1 caused by `supervision_exemptions[]` line-number drift in `v1.5-audit-allowlist.json` (entries reference `:16/49/122/202`; corpus tokens now at `:17/50/123/203` post commits `fc38b8a` + `62f345b`). Coord rebase added to Plan 68-02 wave 4.
- Atomic-commit topology preserved for CHAIN-03 specifically (ROADMAP SC#4 hard-locks single atomic commit). Plans 68-01/02/04/05 are per-requirement boundaries (Phase 67 D-04 score E=7 precedent inherited).
- `cdcce23` archive-script defect itself flagged for `v1.7-DEFERRED-CLEANUP.md` at Phase 70 HARNESS-06 close — out of Phase 68 scope.

**Final plan-and-commit layout (5 plans):**
- Plan 68-01: CHAIN-01 (readFile centralization in 51 + 58)
- Plan 68-02: CHAIN-02 (archive-path helper + self-test repoint + v1.5 sidecar coord rebase)
- Plan 68-03: CHAIN-03 (cascade verify + ATOMIC CHAIN_SKIP removal across 5 v1.6 validators)
- Plan 68-04: MILESTONES.md cdcce23 garbage-entry DELETE (separated for topological clarity)
- Plan 68-05: Close-gate (full chain green + 68-VERIFICATION.md + traceability)

**Dossier:** `.claude/tmp/phase68-D04-advisor.md`

---

## Claude's Discretion

Captured in CONTEXT.md `<decisions>` Claude's Discretion subsection:
- Exact line numbers within `check-phase-31.mjs:32` silent-swallow bug fix
- Exact `_glossary-android.md` coord entries to rebase in v1.5-audit-allowlist.json `supervision_exemptions[]` for V-60-23
- Whether Plan 68-01 is single 2-file commit OR two single-file commits
- Whether `check-phase-66.mjs` CHAIN_SKIP line is `:73` or different (planner greps to confirm at Plan 68-03 wave 2)
- Whether to grep check-phase-62 + 63 for additional hardcoded `.planning/phases/...` paths
- Whether cdcce23 root-cause investigation is single v1.7-DEFERRED-CLEANUP.md line item OR more elaborate deferred-issue artifact

## Deferred Ideas

- **cdcce23 archive-script garbage-insert root cause** — Plan 68-04 deletes symptom; investigation deferred to `v1.7-DEFERRED-CLEANUP.md` at Phase 70 HARNESS-06 close. Phase 70 v1.7 milestone-archival may re-trigger same defect — Plan 70 author audits `.planning/MILESTONES.md` post-archival.
- **Helper indirection precedent under `scripts/validation/_lib/`** — first shared validator helper introduced. v1.8+ may formalize helper-style guide.
- **Per-entry sidecar coord drift detection** — v1.8+ may introduce automated diff job that flags coord drift before it lands in CHAIN_SKIP.
- **Defense-in-depth sweep of `indexOf("\n", ...)` literal-string usages** — v1.8+ may sweep all `scripts/validation/*.mjs` for the CRLF risk now defended by Plan 68-01.
