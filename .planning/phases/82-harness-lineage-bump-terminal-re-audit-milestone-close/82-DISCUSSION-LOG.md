# Phase 82: Harness Lineage Bump + Terminal Re-Audit + Milestone Close - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-22
**Phase:** 82-harness-lineage-bump-terminal-re-audit-milestone-close
**Areas discussed:** C17 cross-link check, Plan layout & atom scope, 3-axis re-audit set, DEFERRED + close-gate

**Method:** User selected all 4 gray areas and instructed "For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning" (per memory `feedback_adversarial_review_preference`). Resolved via 4 parallel `gsd-advisor-researcher` agents in Finder/Adversary/Referee adversarial mode (lower score = better). User approved all 4 winners in a single "Approve all 4 — write CONTEXT.md" selection. Full dossiers: `.claude/tmp/phase82-D{01,02,03,04}-advisor.md`.

---

## D-01 — C17 cross-link harness check

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | Add C17 as a named BLOCKING harness check in v1.9-milestone-audit.mjs (parallel to C16) | 9 | |
| B | No C17; keep Path-A C1-C16 verbatim (rely on Phase 81 closure + existing checks) | 7 | |
| C | Add C17 as advisory / non-blocking | 13 | |
| **D** | **Phase-scoped V-81-CROSSLINK-* assertions inside the net-new check-phase-81.mjs (NO global C17)** | **4** | ✓ |

**User's choice:** Option D (adversarial-review winner, approved).
**Notes:** 8 SSO-E edges are a phase-scoped deliverable, not a cross-milestone invariant. Verified C13 does NOT crawl internal links locally (Option B's premise false — real gap exists). Keeps v1.9-milestone-audit.mjs pristine Path-A copy, self-test 9/9. Mirrors C16-endpoints-in-check-phase-63/64/65 precedent.

---

## D-02 — Plan layout & atom scope

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | 5-plan mirror of Phase 74 (hollow scaffold plan) | 9 | |
| **B** | **4-plan layout (82-CONVENTIONS.md folds into Atom-1 plan as Wave 1)** | **4** | ✓ |
| C | 6-plan (split the 8-validator load) — violates SC#2 atom indivisibility | 12 | |
| D | 5-plan but V18 hoisted to a micro-commit — violates SC#1 Atom-1 indivisibility | 11 | |

**User's choice:** Option B (adversarial-review winner, approved).
**Notes:** Phase 74's 5th plan only existed to carry VPP-01 corpus work; v1.9 has no corpus edit. 8 net-new validators are locked into ONE indivisible Atom-2 commit (SC#2) → they enlarge a task list, not a commit count. V18=2bd79d8 bundles into Atom 1; known-past SHA = no chicken-and-egg.

---

## D-03 — 3-axis terminal re-audit set

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| **A** | **Exact Phase-74 replication, FULL grown net-new set (10 validators), 1 sub-agent for Axis 1+3** | **8** | ✓ |
| B | Chain-apex-only set (harness + check-phase-82) | 13 | |
| C | Collapse evidence into the close-gate doc (no artifact-only commit) | 15 | |
| D | Two separate sub-agents for Axis 1 / Axis 3 | 16 | |

**User's choice:** Option A (adversarial-review winner, approved).
**Notes:** Cross-OS-applicable set = 10 (v1.9-milestone-audit + check-phase-74 continuity row + 8 net-new check-phase-75..82). Net-new validators have never run on Linux; CHECK_PHASE_NESTED=1 short-circuits child counts → standalone rows for 75–81 are load-bearing. Hard gate: Atom 2 pushed to origin/master before Axis-2 GHA dispatch. Carry WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 forward (worse at chain [48..81]).

---

## D-04 — DEFERRED-CLEANUP routing + close-gate

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| **A** | **Single close-gate commit, NO Commit A, single V18 entry** | **1.8** | ✓ |
| B | Commit A (SHA-placeholder-fill) + Commit B split | 8.0 | |
| C | Hybrid split | 6.5 | |
| D | Hybrid | 5.0 | |

**User's choice:** Option A (adversarial-review winner, approved).
**Notes:** V18=2bd79d8 (verified v1.8 close-gate). ONE entry + readAtV18Close (no V18_CLOSEGATE — v1.8 closed in a single commit, atom == close-gate). No Commit A (no v1.9 artifact forward-references the close SHA; RETRO-02 centralized frozen reads). PSSO-FUT-01..04 routed (sources: Phase 77 / v1.9 scoping / v1.9 scoping / Phase 78). Discovery: pre-existing docs/v1.9-DEFERRED-CLEANUP.md — cross-link, don't delete. 27/27 reqs flip in the single close-gate commit. Phase-77 CBA / Phase-80 app-sso flags resolved in-phase (not deferrals).

---

## Claude's Discretion

- `82-CONVENTIONS.md` content (freshness/SHA matrix + locked strings: 10-validator set, V18, BASELINE_13 anchor, 8 SSO-E needles)
- Exact `$rand` charset (recommend `[0-9a-z]` 8-char) + temp-dir cleanup assertions in the Axis-1 recipe
- V-81-CROSSLINK assertion form (recommend substring class-signature, CRLF-normalized, over line-pinned)
- BASELINE_13 anchor (recommend known-PAST SHA, not the future close SHA)
- 9 vs 10 in the cross-OS set (recommend 10 with the check-phase-74 continuity row)

## Deferred Ideas

- PSSO-FUT-01..04 routed to v1.9-DEFERRED-CLEANUP.md (see D-04 table) + carried v1.8 items + execution discoveries
- Pre-existing `docs/v1.9-DEFERRED-CLEANUP.md` — converge on a single canonical location in v1.10+ (hygiene flag)
- C13 local internal-link crawl gap — consider a local internal-link crawl in a future milestone (harness hygiene flag)
- Explicitly OUT of scope: global C17 category, Commit A, V18_CLOSEGATE second entry, worktree execution, docs/* corpus edits
