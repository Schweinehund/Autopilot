# Phase 81: Nav Hub Integration - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-22
**Phase:** 81-nav-hub-integration
**Areas discussed:** Decision-tree SSO leaf shape, Closure checklist form & location, Edge-creation scope, Index Admin Setup row granularity

**Method:** User selected all four gray areas and requested `/adversarial-review` (Finder → Adversary → Referee) to recommend the best option per area with reasoning (standing preference for gray-area picks). Finder raised 29 flaws (9 CRITICAL); Adversary disproved 7 (+50, zero wrong-disproves); Referee verified the two pivotal disputes against the actual files and locked four winners. User accepted all ("Lock all & chain").

---

## Decision-tree SSO leaf shape (06-macos-triage.md)

| Option | Description | Selected |
|--------|-------------|----------|
| 1A | Single MAC3 branch → ONE runbook (#35 only) | |
| 1B | New MAC3 branch → sub-decision diamond → #35 / #36 | ✓ |
| 1C | Two flat top-level MAC3 branches → #35, #36 | |

**User's choice:** 1B (referee winner)
**Notes:** 1A dead — dropping #36 violates SC3 + defeats Phase 80 D-04 handoff (two CRITICALs). Finder's "1B = 4 edges, breaks routing invariant" was FALSIFIED — verified `MAC1→MAC3→MACSSO→leaf` = exactly 3 edges, within the line-59 budget. The "7-leaf cap" objection also FALSIFIED (cap is L2 #26-specific, not the triage tree). 1B beats 1C because the sub-decision diamond *is* the disambiguation surface D-04 chartered; 1C forces L1 self-classification with no guiding question. Guardrail: 3-edge max, style both leaves, add matching Routing Verification table row, add click directives, preserve #35→#27 escalation.

---

## Closure checklist form & location (SC4)

| Option | Description | Selected |
|--------|-------------|----------|
| 2A | Corpus-facing markdown doc inside docs/ | |
| 2B | Planning-only artifact (.planning/phases/81-.../81-CROSSLINK-CLOSURE.md) | ✓ |
| 2C | Inline section appended to an existing nav index | |

**User's choice:** 2B (referee winner)
**Notes:** Checklist is a build-time verification artifact, not reader docs. 2A pollutes the corpus + harness surface (CRITICAL); 2C breaks append-only AND pollutes a reader-facing index (two CRITICALs). SC4's "present across the corpus" was FALSIFIED as an argument against 2B — it describes where the *edges* live, not the checklist. Guardrail: enumerate E1–E8 verbatim from ROADMAP:531 with file:line + checkbox each; reference from VERIFICATION.md.

---

## Edge-creation scope (E7 exists; E8 missing)

| Option | Description | Selected |
|--------|-------------|----------|
| 3A | Create only genuinely-missing edges (E8 + nav rows), verify the rest, log (not re-author) any broken prior edge | ✓ |
| 3B | Treat E8 as a Phase 75 backfill gap — create-but-flag, or defer | |

**User's choice:** 3A (referee winner)
**Notes:** 3B deferring E8 fails SC4 (absent edge at close) + makes phase goal unachievable (CRITICAL); "Phase 75 backfill" is a misattribution (guide 07 is a Phase 76 deliverable, lifecycle predates it). E8's append site is concrete (Related Guides list, lines 391–394). Guardrail: append E8 as one bullet; bound "remediate" — verify E1–E7 with cited evidence, LOG broken edges to the checklist/backlog rather than re-authoring prior-phase content.

---

## Index Admin Setup row granularity (SC1)

| Option | Description | Selected |
|--------|-------------|----------|
| 4A | Three separate appended rows (one per guide 07/08/09) | |
| 4B | One grouped appended row covering guides 07/08/09 | ✓ |

**User's choice:** 4B (referee winner)
**Notes:** Finder's "4B fails SC1's literal 'rows 07/08/09'" was FALSIFIED — the parallel singular "(runbook #27)" under the same plural "rows" frame proves the parenthetical is a content descriptor, not a 3-row mandate. House style is decisive: existing macOS Admin Setup / L1 / L2 tables (index.md:102–130) all use single grouped rows → overview/index. 4A breaks that pattern (MEDIUM). Guardrail: the grouped row's "When to Use" cell must name all three guides 07/08/09 by topic so discoverability survives the grouping.

---

## Claude's Discretion

- Exact prose wording of all appended nav entries, the SSO triage diamond's question text, escalation-trigger bullets, and "When to Use" cell copy (within locked SC1–SC4 + guardrails).
- Node IDs / anchor text for the new Mermaid leaves (subject to D-01 guardrails).
- `81-CROSSLINK-CLOSURE.md` column layout (follow the SC4 edge enumeration).
- Plan decomposition / commit batching across touched files (planner's call), provided navigation-last ordering + append-only hold.

## Deferred Ideas

- v1.9 harness lineage bump + `check-phase-81` validator + 3-axis terminal re-audit + milestone close — Phase 82.
- Any broken E1–E7 edge discovered during verification — log to `81-CROSSLINK-CLOSURE.md` + deferred backlog; do NOT re-author prior-phase content in this nav phase.
