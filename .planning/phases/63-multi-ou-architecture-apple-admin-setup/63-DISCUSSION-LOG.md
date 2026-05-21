# Phase 63: Multi-OU Architecture & Apple Admin Setup - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-21
**Phase:** 63-multi-ou-architecture-apple-admin-setup
**Areas discussed:** P63↔P64 file boundary (OU-04/05/06), Custom-role bundle (OU-02), Decision-matrix format (OU-01), Apple TV + Shared iPad depth (OU-07/08)
**Method:** All four areas resolved via batched `/adversarial-review` (Finder → Adversary → Referee, three independent Opus agents). User directed: "for each choice in each of the areas, use /adversarial-review to recommend the best one and provide reasoning." Referee scores shown (lower = better).

---

## Area 1 — P63↔P64 file boundary (OU-04 / OU-05 / OU-06)

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | 3 standalone admin-setup docs (06-mdm-server-assignment / 07-vpp-content-token-consolidation / 08-managed-apple-account-provisioning); ops deferred to Phase 64 runbooks 11/15/16 | 2 | ✓ |
| B | Fold OU-04/05 into 02-ous-architecture.md + OU-06 into 05-sub-org-admin-onboarding.md; no new files | 8 | |
| C | One consolidated 06-per-ou-admin-setup.md with 3 H2 sections | 5 | |

**User's choice:** Option A (via adversarial-review recommendation, approved).
**Notes:** B disqualified — mutates frozen Phase 62 file (PITFALL-6), demotes OP-9 callout against 02-ous:104 prose, endangers C16 `#which-admin-owns-this-pool` anchor. C collapses traceability to less-stable intra-file anchors (contra Phase 62 D-01). Adversary overturned the Finder's CI-5 objections against A: **CI-5 is an L1-runbook cap (Phase 65), not a Phase 63 doc-count rule.**

---

## Area 2 — Custom-role min-viable bundle (OU-02)

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | Single canonical "Sub-Org Admin" bundle of 4-6 permissions | 2 | ✓ |
| B | Multiple role archetypes (Device Manager / Content Manager / Full Sub-Org Admin) | 6 | |
| C | Tiered single bundle: core 4-permission base + optional add-ons | 4 | |

**User's choice:** Option A (via adversarial-review recommendation, approved).
**Notes:** Matches OU-02 verbatim — "(4-6 permissions)" is singular. B over-delivers + collides with Phase 62's 5 preset role names. C reintroduces OP-1 superprivilege blur + OP-3 companion-View hazards. Adversary overturned the Finder's "must ship ≥6 reference roles" objection: **that 6-role matrix is a Phase 62 artifact in 01-role-permission-model.md, not OU-02's bar.**

---

## Area 3 — Decision-matrix format (OU-01)

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | Criteria comparison table (rows=criteria, cols=3 topologies) | 2 | ✓ |
| B | Mermaid decision tree | 4 | |
| C | Scenario-driven (3-4 named scenarios → topology) | 5 | |
| D | Combined: Mermaid tree routing into comparison table | 6 | |

**User's choice:** Option A (via adversarial-review recommendation, approved).
**Notes:** OU-01 literally requires a "decision matrix" — a table is the literal satisfaction; OP-4 "most-permissive wins" callout rides adjacent (02-ous:54-59 precedent). D penalized by Phase 62 D-04 anti-redundancy precedent. Adversary overturned "Mermaid = novel/risky surface" (it is an established v1.4/v1.5 corpus pattern) — Mermaid simply has no natural home for the additive-scope invariant.

---

## Area 4 — Apple TV + Shared iPad lifecycle depth (OU-07 / OU-08)

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A | Full depth incl. per-OU CRD deep-dive + sub-OU nesting, hedge inline | 5 | |
| B | Core depth on documented surface + "Apple does not publish" hedge + portal-verification note; deep CRD/depth>2 deferred to v1.7 | 2 | ✓ |
| C | Minimal lifecycle stubs covering only SC#4 + cross-link needs | 9 | |

**User's choice:** Option B (via adversarial-review recommendation, approved).
**Notes:** B calibrates effort to severity — fully delivers HIGH OP-12 (Find My) + all OU-08 elements; defers LOW OP-15 deep-dive + unverified depth>2. C disqualified (drops OP-12, under-delivers SC#4, breaks Phase 64 Wave-B anchor dependency, trips anti-skip guard). Adversary overturned Finder's "A publishes forbidden sub-OU nesting" for depth≤2 (02-ous:46-52 authorizes depth≤2 + Phase 63 owns the verification) and corrected the "CRD = v1.7+ deferred" mislabel (the heuristic is a Phase 63 deliverable; only the deep-dive is v1.7+).

---

## Claude's Discretion

- Exact 4-6 permission composition of the OU-02 bundle (respecting OP-1/OP-2/OP-3).
- Exact criteria rows for the OU-01 comparison table.
- Whether the D-05 stale-ref reconciliation points solely at 11-vpp-catalog-runbook.md or also at 07-vpp-content-token-consolidation.md.

## Deferred Ideas

- Per-OU Conference Room Display partitioning deep-dive → v1.7+.
- Sub-OU nesting at depth > 2 → after Phase 63 portal verification.
- Cross-OU audit visibility 3×3 matrix → Phase 64 (17-audit-log-scoping-runbook.md).
- OP-8 federated-admin offboarding auto-revoke determination → portal verification alongside sub-OU check.

## Cross-cutting fixes surfaced by the review (Phase 63 owns regardless)

- D-05: Repair stale `05-vpp-catalog-consolidation` forward-reference at 02-ous-architecture.md:102 (anchor-inventoried edit).
- D-06: Honor depth≤2 sub-OU authoring cap until portal verification resolves.
