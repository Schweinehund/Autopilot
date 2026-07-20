# Phase 134: V117 Pin + 16th Path-A Lineage Bump + Terminal Close - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-19
**Phase:** 134-V117 Pin + 16th Path-A Lineage Bump + Terminal Close
**Areas discussed:** Windows deep-nest axis, Validator scope & apex, DEFERRED-CLEANUP scope, Close-PR cascade disposition

**Method:** User selected all 4 gray areas and requested `/adversarial-review` to recommend the best option per area with reasoning. Resolution via scored Finder (187 pts, 32 risks) → Adversary (+45, 8 risks disproved) → Referee (final calibration).

---

## Windows deep-nest axis (of the 3-axis terminal re-audit)

| Option | Description | Selected |
|--------|-------------|----------|
| A — Mandatory-PASS | Windows fresh-clone axis must finish within timeout or close blocks | |
| B — Advisory + documented-timeout | Linux GHA (both chain validators) + zero-context subagent authoritative per D-03; win32 timeout accepted, non-blocking | ✓ |
| C — Windows shallow run | audit-harness only, skip deep chain recursion | |

**User's choice:** B (Referee recommendation)
**Notes:** A disqualified — makes a known recurring win32 timeout a hard close-blocker (contradicts D-03) + forces a frozen apex/harness edit (HARN-12 collision). C disqualified — no clean shallow lever (NESTED skips both chain AND harness), vacuous exact-match, skips win32-divergent frozen-read/archival paths. B's "really 2-axis" objection was disproved: HARN-13 itself names Linux authoritative for both chain validators. Guardrail: document the timeout explicitly (not silent); subagent must run off-host.

---

## Validator scope & apex

| Option | Description | Selected |
|--------|-------------|----------|
| A — 129..134, apex=134 | 6 validators, range [48..133], self-inclusive per 128 precedent | ✓ |
| B — 129..133, apex=133 | 5 validators, range [48..132], no self-validator for phase 134 | |

**User's choice:** A (Referee recommendation)
**Notes:** B carries two CRIT defects — ships Phase 134 with no validator (under-delivers HARN-12) and is forward-incompatible with v1.19 (expects apex=134). A's scariest risks were all disproved: 86-entry off-by-one caught by fail-loud module-load asserts; V-134-AUDIT skip-pass is the intended graceful-skip; no retro-authoring problem (129-133 dirs live at close, archival is a later separate step). Surviving A risks are mitigable guardrails: route all 6 VERIFICATION reads through archive-path.mjs; resolver-null must fail-loud not skip-pass (the `['v1.16-phases']` root is a fragile guess); preserve HARN-11 dual-token subject-line verification for V117; CHAIN_SKIP===0 + interior-dedup.

---

## DEFERRED-CLEANUP scope

| Option | Description | Selected |
|--------|-------------|----------|
| A — CARVE-1 + CARVE-2 + constrained sweep | Log both carve-outs, log-only zero fixes, exact-ID sweep with frozen-exclusion | ✓ (scoped) |
| B — Minimal (CARVE-1 only) | Log only CARVE-1 | |

**User's choice:** A, scoped log-only (Referee recommendation)
**Notes:** B fatally under-scoped — drops CARVE-2, but 133-CONTEXT requires both carve-outs logged; TOOL-05's original O(n²) wording would survive unqualified. A trimmed to log-only avoids the CONFIRMED sweep→fix + double-book risks. DEFER-119-A re-listing optional (D-05 objection disproved — satisfied by the Phase-133 plan). Guardrails: log-only (zero fixes); exact-ID sweep against frozen-deferral exclusion list; give CARVE-1 a tracked home.

---

## Close-PR cascade disposition

| Option | Description | Selected |
|--------|-------------|----------|
| A — Expect all-green, any RED blocks | TOOL-04 greened the 11 predecessors; treat any RED as blocking regression | |
| B — Expect green, criteria-gated fallback | Retain ACCEPTED-STANDALONE-CI-RED, valid IFF harness-only + zero chain failures + current-milestone green | ✓ |

**User's choice:** B (Referee recommendation)
**Notes:** A disqualified by a CRIT deadlock — CARVE-1 root unresolved (frozen predecessor harnesses run vs live HEAD), so the close-gate can legitimately produce an expected predecessor RED; with no escape hatch it deadlocks the close. B retains the established Class-B fallback. Guardrails: apply the IFF criteria exactly; `gh run view --json jobs` machine-verify (never eyeball); enumerate workflows fresh (catch the new 15th); confirm apex=134 ran+passed BEFORE invoking the fallback (coupled to GA-2 — the "current-milestone green" criterion rides the new apex).

---

## Claude's Discretion

- Internal structure of the 6 new `check-phase-*.mjs` validators (within the [48..N-1] / SELF / NESTED / archive-path invariants).
- Exact `v1.18-audit-allowlist.json` line-pin deltas (Path-A from v1.17; count/identity unchanged, confirmed against live corpus).

## Deferred Ideas

- `readAtClose` adoption across the 13 milestone-audit harnesses + regenerate-supervision-pins.mjs — permanent CARVE-1 fix, future dedicated tooling milestone.
- V118 back-anchor pin — successor milestone (v1.19) per back-anchor rule; out of scope.
