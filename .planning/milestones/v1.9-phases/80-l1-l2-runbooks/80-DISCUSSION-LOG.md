# Phase 80: L1/L2 Runbooks - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-21
**Phase:** 80-l1-l2-runbooks
**Areas discussed:** L2 #27 structure, Forward-link boundary, L1 Terminal model, L1 #35↔#36 boundary

**Method:** User selected all four gray areas and directed: "For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning." A three-agent scored adversarial review (Finder → Adversary → Referee) was run. Finder raised 29 flaws (100 pts, 3 CRITICAL); Adversary disproved 3 LOW flaws; Referee confirmed all 3 disproves as FALSE POSITIVE, re-affirmed all 3 CRITICALs, downgraded 2 MEDs to LOW, and declared per-area winners. Harness behavior was empirically verified (ran `node scripts/validation/v1.8-milestone-audit.mjs`). User accepted all four winners ("Lock all & chain").

---

## A — L2 #27 document structure

| Option | Description | Selected |
|--------|-------------|----------|
| A1 — Two sequential linear investigation tracks | Registration-failure track then Password-sync track, like L2 #19/#01 | ✓ |
| A2 — Mermaid decision-tree-first | 7-leaf tree routing into sub-sections, like L2 #26 | |

**User's choice:** A1 (adversarial-review winner).
**Notes:** A2 carried the only CRITICAL in the pair (A2-1): its Mermaid leaves would target the Phase-81-owned `06-macos-triage.md` SSO leaf (navigation-last violation) and import #26's "DA-9 LOCKED — 7 leaves / #26 cap" framing Phase 80 has no authority over. SSORUN-03 demands two-track investigation *depth*; #26 is a pure router that pushes depth to docs that don't exist for #27's causes. A1 must import #19's "From L1 escalation?" routing block and the macOS log-collection prerequisite handoff.

---

## B — Forward-link / navigation-last boundary

| Option | Description | Selected |
|--------|-------------|----------|
| B1 — Link only to existing artifacts | Defer the decision-tree SSO-leaf footer entirely to Phase 81 | ✓ |
| B2 — Forward-link to the SSO leaf now | Include it now (broken until Phase 81 lands it) | |

**User's choice:** B1 (adversarial-review winner).
**Notes:** Harness empirically verified to NOT crawl internal links — so a broken forward link is harness-invisible, which collapses B2's secondary flaw but does NOT cure CRITICAL B2-1: out-of-phase pre-emption of the locked navigation-last invariant (Phase 81 / SSOREF-04 owns the SSO leaf). B1 keeps in-phase #35→#27 / #36→#27 escalation edges + the existing back-to-triage footer; only the new SSO-leaf wiring waits for Phase 81.

---

## C — L1 Terminal-command interaction model

| Option | Description | Selected |
|--------|-------------|----------|
| C1 — Guided Terminal walkthrough | "Say to the user" copy-paste of `app-sso platform -s`, report output back | ✓ |
| C2 — Minimize L1 interpretation | L1 collects output, interpretation/escalation goes to L2 | |

**User's choice:** C1 (adversarial-review winner).
**Notes:** Closest call. C1 brushes the macOS-L1 "no Terminal" norm (C1-1 CRITICAL), but FALSE-POSITIVE C1-3 was overturned — the L1 index (line 81) already ships a corpus-level "terminal walkthrough as appropriate per cause" affordance that legitimizes it. Decisive: SSORUN-01/02 mandate `app-sso platform -s` as the *first* L1 step, and C2 must run that exact command anyway to collect output — inheriting C1's contract break while discarding the triage value (worst-of-both, C2-2). C1 to be scoped to the triage command only + paired with the structured "Before escalating, collect:" checklist.

---

## D — L1 #35 ↔ #36 cross-coverage boundary

| Option | Description | Selected |
|--------|-------------|----------|
| D1 — Cross-links + "start here" note | Explicit #35↔#36 links + disambiguation note | |
| D2 — Strictly independent | No cross-linking; disambiguation deferred to Phase 81 tree | ✓ |

**User's choice:** D2 (adversarial-review winner).
**Notes:** Phase 81's tracked cross-link closure set is exactly the 8 SSO-E edges, and #35↔#36 is NOT among them — D1 would add untracked cross-phase edges (D1-1) and a "start here" note that pre-empts the Phase-81 tree's disambiguation role (same navigation-last tension that sinks B2). D2's only real cost — no disambiguation during the short 80→81 window — is transient and self-heals when Phase 81 lands the SSO leaf.

## Claude's Discretion

- Exact prose of all triage steps, "Say to the user" scripts, escalation-trigger bullets, and L2 investigation narrative.
- Internal heading/anchor text; L2 #27 routing-block phrasing and track headings; L2-index escalation-table column layout.
- Research flag (resolve at plan time, NOT decided here): `app-sso diagnose` and `log stream --predicate` subsystem filter values are LOW confidence — validate against Apple developer docs before authoring L2 #27.

## Deferred Ideas

- Decision-tree SSO leaf + #35/#36 disambiguation → Phase 81 (SSOREF-04).
- All nav-hub rows (`docs/index.md`, `common-issues.md`, `quick-ref-l1/l2.md`) → Phase 81.
- v1.9 harness lineage bump + any `check-phase-80` validator → Phase 82.
