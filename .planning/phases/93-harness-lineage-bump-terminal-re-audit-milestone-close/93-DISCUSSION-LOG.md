# Phase 93: Harness Lineage Bump + Terminal Re-Audit + Milestone Close - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-25
**Phase:** 93-harness-lineage-bump-terminal-re-audit-milestone-close
**Areas discussed:** Validator content, Plan & atom layout, 3-axis re-audit set, Close-gate & cleanup
**Resolution method:** `/adversarial-review` — 4 parallel `gsd-advisor-researcher` agents (Finder FOR / Adversary AGAINST / Referee scores; lower = better). User instruction: "For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning." User approved all 4 in one selection.

---

## Gray-area selection

| Option | Description | Selected |
|--------|-------------|----------|
| Validator content (GA-1 / D-01) | What assertions check-phase-89..92 carry beyond Path-A skeleton | ✓ |
| Plan & atom layout (GA-2 / D-02) | Plan count + atom→commit mapping | ✓ |
| 3-axis re-audit set (GA-3 / D-03) | Cross-OS validator set + deep-nest mitigation | ✓ |
| Close-gate & cleanup (GA-4 / D-04) | V110 entry, DEFERRED-CLEANUP, pre-close-audit reconciliation, cruft | ✓ |

**User's choice:** All 4 + "use /adversarial-review to recommend the best one."
**Method choice:** Adversarial-review (Recommended).

---

## D-01 — Per-phase validator content

| Option | Description | Selected |
|--------|-------------|----------|
| A — Rich per-phase assertions | Each validator hard-asserts its phase's deliverables | |
| B — Minimal Path-A skeleton | Existence + chain only; defer to C-categories/CI | |
| C — Concentrate cross-link net in check-phase-92 | 89/90/91 lightweight; 92 carries V-92-CROSSLINK-E1..E8 | ✓ |
| D — New global C17 category | Strong-reject (ROADMAP locks C1–C16) | |

**Scores (lower=better):** C=3 / B=5 / A=8 / D=12.
**Notes:** Re-applies Phase 82 D-01. C13 doesn't crawl links locally; harness is blind to Phase 92 edges. check-phase-91 DEFERS V-63-08/09 to check-phase-63 (already owns them, updated by Phase 91 commit `7039630`). Dossier: `.claude/tmp/phase93-D01-advisor.md`.

---

## D-02 — Plan & atom layout

| Option | Description | Selected |
|--------|-------------|----------|
| A — 4-plan / 5-commit | Phase 82 + Phase 88 lineage skeleton | ✓ |
| B — 3-plan | Fold conventions into Atom-1 header | |
| C — 5-plan | Separate conventions + re-audit + close-gate | |
| D — Hoist V110 to micro-commit | Violates atom indivisibility | |

**Scores (lower=better):** A=3 / B=9 / C=12 / D=14.
**Notes:** Phase 82 AND Phase 88 shipped this verbatim — ratified invariant. Load-bearing correction: V110 lands in **Atom 2** (per ROADMAP SC#2 + HARN-02), not Atom 1. Atom 1 = 3 files, Atom 2 = 7 files, both revert-isolated. Dossier: `.claude/tmp/phase93-D02-advisor.md`.

---

## D-03 — 3-axis terminal re-audit set

| Option | Description | Selected |
|--------|-------------|----------|
| A — Full grown set (7 rows) | milestone-audit + check-phase-88 continuity + 89..93 | ✓ |
| B — Apex-only | Hides 89-92 behind nested short-circuit | |
| C — Minimal 6 | Drops the check-phase-88 continuity row | |
| D — Two sub-agents for Axis 1 & 3 | Phase 82 scored 16 — one dispatch covers both | |

**Scores (lower=better):** A=7 / C=11 / B=14 / D=16.
**Notes:** `CHECK_PHASE_NESTED=1` hides children behind the apex → net-new 89-92 need standalone cross-OS rows. Deep-nest HARDENED: apex-93 count is Linux-GHA sole-authoritative (the timeout actually fired at [48..87] in v1.10; chain now [48..92]). Dossier: `.claude/tmp/phase93-D03-advisor.md`.

---

## D-04 — Close-gate + cleanup (4 sub-decisions)

| Sub-decision | Winner | Score |
|--------------|--------|-------|
| 1. V110 entry + Commit A | Single V110 entry, no Commit A, no _CLOSEGATE | A=1.8 (vs D=5.0/C=6.5/B=8.0) |
| 2. DEFERRED-CLEANUP routing | Canonical `.planning/milestones/`; carry v1.10 + add v1.11 | 1.5 |
| 3. Pre-close-audit reconciliation | Cross-link the stray; defer deletion to /gsd-complete-milestone | A=1.8 (vs C=5.5/B=7.0) |
| 4. Working-tree cruft | Leave untouched (out of scope) | A=1.5 (vs C=5.0/B=6.5) |

**Notes:** grep proof = no v1.11 artifact forward-refs its close SHA → no Commit A. v1.10 deleted its stray pre-close audit via archive commit `3888555` (numstat `0 138`) — Phase 93 mirrors the boundary. Close-gate = ONE indivisible 7-file commit. Dossier: `.claude/tmp/phase93-D04-advisor.md`.

---

## Claude's Discretion

- `93-CONVENTIONS.md` content (SHA matrix + locked strings)
- Exact `$rand` charset + temp-dir cleanup assertions in the Axis-1 recipe
- V-92-CROSSLINK assertion form (substring class-signature; confirm 8 needles vs `92-VERIFICATION.md`)
- BASELINE_15 anchor (known-PAST SHA)
- V110 = `a3617e9` re-confirmation on authoring day

## Deferred Ideas

- Routed to `v1.11-DEFERRED-CLEANUP.md`: Intune profile-enroll gap, Iru deletion steps, supervision-post-migration (Phase 90); `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` (depth → [48..92]); all carried v1.10 items.
- Stray pre-close `.planning/v1.11-MILESTONE-AUDIT.md` → cross-link now, delete at `/gsd-complete-milestone`.
- Working-tree cruft → flag for hygiene pass, not this phase.
