# Phase 122: Structural Retrofit — Decision-Trees, Carved-Mermaid Files & the 9 Mermaid-bearing lifecycle docs - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-07
**Phase:** 122-structural-retrofit-decision-trees-carved-mermaid-files
**Areas discussed:** Leaf-parity verification, Non-decision diagram shapes, Fork + idempotency guard, Registry & doc_type roster

**Resolution method:** All four gray areas were resolved via **`/adversarial-review`** at the user's explicit request ("For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning"). Each area ran a **Proponent → Adversary → Referee** panel of three *separate* Opus agents, each grounded in the live repo (workflow `wf_d79b6f81-c08`, 12 agents, 816k subagent tokens, 0 errors). The Proponent argued the pre-stated recommendation; the Adversary attacked it and argued the strongest competitor; the neutral Referee ruled (free to overrule). Two referees overruled the pre-stated recommendation on grounded evidence.

Two factual questions were resolved by the orchestrator *before* the panels ran, so agents argued against ground truth: (1) the RETRO-08 carved-mermaid **double-count** — verified all 9 admin-setup Mermaid files (incl. RE-128) are already registry-Pending, so carved-mermaid = 10 unique (9 + RE-147), grand total = 30; (2) the exact Mermaid corpus (`grep -rl '^```mermaid' docs/` → 30 files).

---

## Leaf-parity verification (GA-1)

The #1 silent-content-loss surface: STD-04 D-04 says a green C17 run cannot attest leaf-completeness (no diagram parser).

| Option | Description | Selected |
|--------|-------------|----------|
| A — Self-check only | Author captures leaf count, annotates `LOCKED — N`, self-verifies. Cheapest. | |
| B — Independent verification, ALL 30 | Separate agent per file re-derives node/leaf/edge set from pre-122 Mermaid bytes, diffs vs. converted table. | ✓ (referee ruling) |
| C — Risk-tiered gating (pre-stated rec) | Self-check all + independent verification only on high-complexity files; spot-check the rest. | ⚖️ OVERRULED |

**Ruling:** **Option B** — uniform coverage (all 30, no file skipped), *tiered depth* (branch-heavy → full adversarial re-derivation; branchless → lightweight count-and-label diff). Read-only `git show` diffs, sequential/batched. HIGH confidence.
**Why the overrule:** the adversary empirically tested the complexity-triage Option C would gate on and found it wrong on the exact properties it sorts — `lifecycle/04-esp.md` undercounted 7 edges→"3"; `lifecycle-apv2/02-deployment-flow.md`'s second diagram + 5 dashed failure-edges missed. "You cannot use an unverified gate to suppress the verification that catches the gate's own errors." B-over-C marginal cost ≈ 14 near-zero read-only diffs. Cost objection against B (fragile fan-out) was a strawman — these agents run no validator and no checkout.
**Riders carried into CONTEXT D-01:** semantic-paraphrase check; multi-block/subgraph enumeration; stale-diagram-prose grep; capture before the fork injects the envelope.

---

## Non-decision diagram shapes (GA-2)

STD-04 D-03 names decision-graph→table and sequence→numbered-list, but several targets are linear/mixed/multi-block/subgraph/failure-map diagrams.

| Option | Description | Selected |
|--------|-------------|----------|
| A — Uniform table everywhere | Force `Scenario\|Leaf\|Resolution` on every diagram. | ✗ (jointly rejected) |
| B — Shape-by-type (pre-stated rec) | Add "ordered numbered stage list" as a third shape; count diamonds to classify. | ⚖️ OVERRULED |
| C — Bright-line + amendments | `{...}` decision node? Yes→table, No→stage list. Per-block. + 2 new shapes + ordinal columns. | ✓ (referee ruling) |

**Ruling:** **Option C bright-line spine + 3 amendments.** HIGH confidence.
**Why the overrule:** B's "count-the-diamonds self-classifies" is fuzzy and misfired on its own example (`decision-trees/05` is a verified 4-diamond decision tree, not linear); an ordinal-column table preserves order as well as a list (proven by shipped `10-8021x` `Path|Step 1|Step 2`); B's nested-list mechanism structurally cannot hold reconvergence/merge edges on branch-dominant files — the exact D-04 loss. Amendments: (1) classify per Mermaid block; (2) `Stage|Failure Mode` table for failure-maps + grouped sub-lists for subgraph partitions; (3) drop the literal `Scenario|Leaf|Resolution` wording, use diagram-fitted ordinal columns + container-neutral `LOCKED — N`.

---

## Fork + idempotency guard (GA-3, DEFER-121-07-B)

Division of labor between the human conversion and the pipeline envelope-injection, plus closing DEFER-121-07-B.

| Option | Description | Selected |
|--------|-------------|----------|
| A — Two-step + hardened fork (pre-stated rec) | Hand-author conversion, then forked pipeline injects envelope; add guards. | ✓ direction / ⚖️ specifics overruled |
| B — Pipeline strips/tabulates Mermaid | Mechanical strip. Fabricates parity — dead. | ✗ |
| C — Single hand pass, no fork | Loses the fail-closed join-on-Path doc_id injection — dead. | ✗ |

**Ruling:** **Option A direction UPHELD**, two of three specifics **OVERRULED**. HIGH confidence.
**Specific overrules:** (1) the guard that matters is a fail-closed `^```mermaid`-absence **body precondition** (the fork must DELETE `MERMAID_DEFERRED_PATHS` to enroll these files) — the doc_id idempotency guard stays but must ERROR not skip; (2) **DROP "restore CRLF"** — all 30 targets are CRLF but Phase 121 LF-normalized their directory siblings, so restoring CRLF fractures EOL and voids the byte-proof → keep LF-normalize, WONTFIX WR-01-in-fork. Added: multi-class router + keyless-Windows fail-closed guard; three-step decision-tree sequence (convert → mint rows → run fork); fold in DEFER-121-07-A real-date VH fill.

---

## Registry & doc_type roster (GA-4)

| Option | Description | Selected |
|--------|-------------|----------|
| 05-device-lifecycle → Reference (pre-stated rec) | Directory precedence over `-lifecycle` filename. | ✓ upheld |
| 05-device-lifecycle → Guide | Treat by filename. | ✗ |
| All 11 decision-trees → Reference, RE-207…217 path order | Sequential append from max 206. | ✓ upheld |

**Ruling:** **UPHELD** (only referee with no dissent). HIGH confidence. All 11 decision-trees → Reference (incl. 05 = RE-212), mint RE-207…217 from verified-contiguous max 206 in path order; the other 19 flip Pending→Approved minting nothing. Roster of 30 confirmed, carved-mermaid = 10, no double-count.
**Riders:** admin-setup `doc_type` is unpinned and router-emitted (not C17-checked) — planner must make it an explicit router ruling; record the 05 directory-precedence rationale at RE-212's row; RE-numbers are not load-bearing (row *existence* before `buildDocIdMap()` is).

---

## Cross-ruling conflict adjudicated

GA-4's RIDER-1 said "fold in WR-01 (CRLF-write restore)"; GA-3's referee — after inspecting on-disk EOL state and the byte-proof mechanics — ruled **keep LF-normalize, WONTFIX the CRLF restore**. Adjudicated in favor of GA-3 (deeper grounded inspection: restoring CRLF would fracture EOL within `lifecycle/` and `lifecycle-apv2/` where Phase 121 already wrote LF). Recorded explicitly in CONTEXT D-03 so the planner sees it was decided, not overlooked.

## Claude's Discretion

- Exact prose of each net-new `## Summary` (≥30 words).
- Plan/wave decomposition (batching the 30 files by class; interleaving convert/verify/enroll) — front-load the 11 decision-trees.
- The high-complexity threshold routing a file to full-re-derivation vs. lightweight-diff (coverage fixed at all 30; only depth varies).

## Deferred Ideas

- Optional C17 hardening (`VALID_DOC_TYPES` + registry↔frontmatter cross-check) — future HARN/STD lever.
- Whole-class enrollment of `operations/` / `device-operations/` / `cross-platform/apple-business/` → v1.17+.
- A diagram-aware C17 leaf-parity parser — would retire the D-01 manual verification pass; out of the frozen-harness envelope.
