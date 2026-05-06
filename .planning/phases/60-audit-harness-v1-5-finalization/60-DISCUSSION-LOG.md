# Phase 60: Audit Harness v1.5 Finalization - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in 60-CONTEXT.md — this log preserves the alternatives considered + adversarial-review scoring.

**Date:** 2026-05-06
**Phase:** 60-audit-harness-v1-5-finalization
**Areas discussed:** C11 promotion mechanism, C13 triage disposition, C12 scope expansion shape, C9 + AUDIT-07 carry-over scope
**Methodology:** User invoked `/gsd-discuss-phase 60 --chain` and explicitly requested adversarial-review (finder/adversary/referee) per option per gray area. Single round of multi-select gray-area selection (all 4 selected) → adversarial review → user lock-in.

---

## C11 Promotion Mechanism (GA1)

| Option | Description | Selected |
|--------|-------------|----------|
| 1A | file:line allowlist only — c11_ops_exemptions[] mirrors c7_knox_allowlist; pin all 6 Autopatch lines; lazy-add as Phase 53-56 ops content lands; do NOT expand patterns. Cleanest path; minimal change. | |
| 1B | pattern refinement only — proximity-window negation symmetric to C1 SafetyNet (200-char window of /successor\|deprecated\|disambiguation\|mutual-exclusion/i). No allowlist additions. | ✓ |
| 1C | hybrid — refine + retain allowlist for residual edges + expand patterns to cover SCCM bare / AMAPI sunset / Ubuntu 20.04 EOL. | |
| 1D | pattern expansion + file:line allowlist — pursue AUDIT-03 literal scope (expand patterns to actually catch DDM/Ubuntu/AMAPI cases) PLUS file:line allowlist. Most thorough; biggest scope. | |

**User's choice:** Option 1B (Referee pick; user locked all 4 picks).

**Adversarial-review scoring:**
- 1A: 31 points (CRIT: AUDIT-03 incomplete patterns DISPROVED; SC#1 enumeration DISPROVED; LOW: lazy-add posture DISPROVED. Net: 1 MED schema asymmetry + 1 MED narrow calibration baseline = 10 points real)
- 1B: 31 points (CRIT: PITFALL-13 false-negative re-introduction CONFIRMED [describes current code; 1B fixes]; CRIT: asymmetric-to-C1 claim CONFIRMED [also describes current code; 1B fixes]; MED: JS lookbehind DISPROVED; MED: calibration sample narrow CONFIRMED; LOW: PITFALL-9 hardcoding via D-08 DISPROVED. Net: 0 unavoidable real CRITs; 1B's design FIXES the current-code CRITs)
- 1C: 16 points (MED: scope-balloon DISPROVED; MED: Ubuntu-20.04 inversion CONFIRMED; MED: SCCM-bare conflicts Phase 53 CONFIRMED; LOW: bundling CONFIRMED. Net: 11 points real)
- 1D: 30 points (CRIT: max scope-balloon DISPROVED; CRIT: Phase 61 unblock-readiness DISPROVED; MED: c11_ops_patterns[] redundancy CONFIRMED; MED: schema migration DISPROVED. Net: 5 points real)

**Notes:** Adversary's strongest disproves were on 1A.CRIT-1 + 1A.CRIT-2 (Finder conflated SC#1 exemption-targets with AUDIT-03 pattern-targets) and 1D.CRIT-1 + 1D.CRIT-2 (scope-balloon misread of expand-and-protect mandate). Referee picked 1B because its CRITs describe the *current* C11 code state, not 1B's design — 1B is the code change that fixes them. 1B aligns with Phase 48 D-06 promotion contract and AUDIT-03's PITFALL-13 reference. Implementation directive captured in 60-CONTEXT.md D-01..D-05.

---

## C13 Triage Disposition (GA2)

| Option | Description | Selected |
|--------|-------------|----------|
| 2A | fix-everything-now — Phase 60 fixes 51 anchors + 5 paths; allowlists 6 externals + 9 stubs; 0 deferred. C13 promotes with 0 residual fails. Largest Phase 60 scope. | ✓ |
| 2B | allowlist-everything — populate c13_broken_link_allowlist[] with all 75 findings as 'pre-existing-acknowledged-debt'. No content edits in Phase 60. | |
| 2C | hybrid — fix 51 anchors + allowlist 9 stubs + 6 externals + push 5 broken paths to Phase 61. 51 fixed + 24 closed; 5 deferred. | |
| 2D | fix-anchors-only-defer-rest — 51 fixed; 24 deferred to Phase 61. SC#3 only partially delivered. | |

**User's choice:** Option 2A.

**Adversarial-review scoring:**
- 2A: 30 points (CRIT: massive scope-balloon CONFIRMED [justified by SC#3]; CRIT: PITFALL-12 line-shift cascade DISPROVED [only 1 of 51 in pinned territory]; MED: attribution destroyed CONFIRMED; MED: AUDIT-08 validate-not-fix CONFIRMED. Net: 20 points real but justified by SC#3)
- 2B: 40 points (CRIT: AUDIT-05 transient-only literal-scope CONFIRMED; CRIT: CLEAN-06/07 not closed CONFIRMED; CRIT: Phase 61 hollow re-audit CONFIRMED; MED: sidecar size explosion CONFIRMED; MED: D-15 rejection precedent DISPROVED. Net: 35 points real, all unavoidable)
- 2C: 30 points (CRIT: defers 5 paths to terminal close CONFIRMED; CRIT: PITFALL-12 line-shift on 51 anchors DISPROVED; MED: hybrid hides defer cost CONFIRMED; MED: promote-to-blocking interaction CONFIRMED. Net: 20 points real with unavoidable defer-to-terminal-close issue)
- 2D: 30 points (CRIT: SC#3 requires A+B clears CONFIRMED; CRIT: C13 cannot promote with 24 broken CONFIRMED; MED: partial SC delivery admitted; MED: Phase 61 has no SC slot CONFIRMED. Net: 30 points real, unavoidable)

**Notes:** Adversary's 2A.CRIT-2 / 2C.CRIT-2 PITFALL-12 disprove was load-bearing for the 2A pick — Finder feared 51-anchor edits would cascade against 23-pin supervision_exemptions, but verification shows only `_glossary-android.md:16` falls in pinned territory (50/51 anchors are in non-sidecar files). 2A scope-balloon is real but uniquely justified by ROADMAP:399 SC#3 literal text mandating Phase 60 *clears* the inventory. Implementation directives captured in 60-CONTEXT.md D-06..D-12.

---

## C12 Scope Expansion Shape (GA3)

| Option | Description | Selected |
|--------|-------------|----------|
| 3A | enumerate H2 count >=6 only — no name pinning. Minimal change; flexible. | |
| 3B | assert specific H2 names — verbatim regex per H2 (Enrollment / Configuration / App Deployment / Compliance / Software Updates / Conditional Access). Tighter contract. | ✓ |
| 3C | 3B + sibling-matrix #conditional-access regression-guard (4 sibling matrices). Mirrors V-58-22 NEGATIVE regression-guard. | |
| 3D | 3C + per-row data-cell column-count assertion. Locks Plan 58-06 extractor invariants. | |

**User's choice:** Option 3B.

**Adversarial-review scoring:**
- 3A: 26 points (CRIT: SC#2 mandates names not count DISPROVED [Adversary literal reading correct; Referee downgraded to MED on implicit Phase 58 D-04 enumeration]; CRIT: Plan 58-06 cell-shape regression DISPROVED [3A doesn't touch cell-shape]; MED: no rename regression-guard CONFIRMED; LOW: trivially passes today CONFIRMED. Net: 6 points real)
- 3B: 12 points (MED: brittle to copy edits CONFIRMED; MED: no sibling-matrix coverage DISPROVED [V-58-25 covers]; LOW: no col-count CONFIRMED; LOW: ordering risk DISPROVED. Net: 7 points real, manageable)
- 3C: 11 points (MED: V-58-25 duplicates CONFIRMED; MED: scope-creep into siblings CONFIRMED; LOW: append-only contract risk CONFIRMED. Net: 11 points real, all unavoidable)
- 3D: 30 points (CRIT: max scope-balloon CONFIRMED; CRIT: Plan 58-06 already-shipped redundancy CONFIRMED; MED: PITFALL-12 240-cell exposure DISPROVED [runtime check, no pin coords]; MED: beyond AUDIT-04 scope CONFIRMED. Net: 25 points real)

**Notes:** Adversary's 3B.MED-2 + 3C.MED-1 disproves were load-bearing (V-58-25 in `check-phase-58.mjs` already covers sibling-matrix retrofit guard, freeing C12 to scope to 4-platform-comparison.md only). Brittleness to copy edits in 3B is mitigated by anchoring on the slug rather than heading prose. Implementation directives in 60-CONTEXT.md D-13..D-16.

---

## C9 + AUDIT-07 Carry-Over (GA4)

| Option | Description | Selected |
|--------|-------------|----------|
| 4A | promote C9 + close AUDIT-07 — atomic harness commit covers all 3 promotions (C9, C11, C13) + BASELINE_9 refresh. Most ambitious; honors Phase 48 D-06 + lifts v1.4.1 carry-over. | ✓ |
| 4B | promote C9 only; AUDIT-07 to Phase 61 — defer BASELINE_9 because pin-coordinate authoring is not pure audit-harness scope. | |
| 4C | AUDIT-07 only; C9 stays informational — close BASELINE_9 in Phase 60; document C9 as 'Phase 48 D-06 carry-over' for v1.6. | |
| 4D | punt both to Phase 61 — keep Phase 60 narrowly scoped to AUDIT-03/04/05/06. | |

**User's choice:** Option 4A.

**Adversarial-review scoring:**
- 4A: 30 points (CRIT: Phase 48 D-06 mandates Phase 53/54 corpus validation CONFIRMED; CRIT: no c9_exemptions[] mechanism CONFIRMED [implementation directive, not blocker]; MED: BASELINE_9 vs sidecar drift DISPROVED [BASELINE_9 by-design 9-pin baseline; not count-equality contract]; MED: atomic-commit cascade CONFIRMED. Net: 25 points real, but framed as implementation directives Phase 60 plan executes)
- 4B: 25 points (CRIT: same C9 missing-allowlist as 4A CONFIRMED; CRIT: Phase 61 has no AUDIT-07 SC slot CONFIRMED; MED: carry-overs into terminal close CONFIRMED. Net: 25 points real, all unavoidable for AUDIT-07-homeless reason)
- 4C: 11 points (MED: D-06 promotion-ladder broken CONFIRMED; MED: v1.6+ inherits never-graduated check CONFIRMED; LOW: smallest scope CONFIRMED. Net: 11 points real)
- 4D: 35 points (CRIT: AUDIT-07 punt homeless CONFIRMED; CRIT: C9 punt vs SC#1 PITFALL-13 DISPROVED [Adversary correctly distinguished C9 COPE from C11 ops-domain]; CRIT: carry-overs survive v1.5 close CONFIRMED; MED: Phase 61 fresh-clone exit-0 risk CONFIRMED. Net: 25 points real, all unavoidable)

**Notes:** Adversary's 4B.CRIT-2 + 4D.CRIT-1 (AUDIT-07 has no Phase 61 SC slot — homeless if punted) was the load-bearing argument for 4A. Phase 61 SC list in ROADMAP:408-413 has 5 close-out items; none accommodate AUDIT-07 carry-over fix work. Adversary's 4D.CRIT-2 disprove (C9 ≠ C11 in PITFALL-13 scope) corrected a category error. 4A's CRITs are genuine implementation directives (must add `c9_exemptions[]` mechanism + run Phase 53/54/55/56 corpus scan + refresh BASELINE_9 atomically) — Referee accepted that the OPTION is correct; the EXECUTOR must satisfy them. Implementation directives in 60-CONTEXT.md D-17..D-20 + D-27..D-28.

---

## Claude's Discretion

User-locked picks were 1B / 2A / 3B / 4A directly per adversarial-review recommendation. No "you decide" deferrals on the gray areas themselves. Per-finding triage details (anchor-fix mechanism, broken-path disposition, BASELINE_9 refresh implementation, ROADMAP SC#5 wording-fix commit timing, C11 proximity-window keyword tuning) deferred to Phase 60 plan-author per 60-CONTEXT.md "Claude's Discretion" subsection.

## Deferred Ideas

Captured in 60-CONTEXT.md `<deferred>` block:
- C11 pattern expansion (SCCM-bare / AMAPI / Ubuntu-EOL) — v1.6+
- `c11_ops_exemptions[]` lazy population — v1.6+
- `c9_exemptions[]` lazy expansion — post-Phase-60 future content
- Sibling-matrix `#conditional-access` regression-guard duplication in C12 — v1.6+ if check-phase-58.mjs retired
- Per-row data-cell column-count assertion in C12 — v1.6+
- Pre-commit hook hard-block for pin-drift — v1.6+
- `broken_link_external_allowlist[]` array — explicitly rejected per Phase 48 D-15
- `audit-harness-v1.5-integrity.yml` archive lifecycle at v1.6 — backlog
- iOS/macOS/Windows admin template `last_verified` normalization — v1.6+
- "Choose Your Platform" Linux + Operations bullets in docs/index.md — Phase 61 or v1.6 (per pre-existing TODO)
- ROADMAP SC#5 wording fix — Phase 60 plan author decides timing (atomic with harness OR separate commit OR Phase 61 batch)
