# Phase 81: Nav Hub Integration - Context

**Gathered:** 2026-06-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Wire the already-shipped v1.9 Platform SSO content into every navigation hub via **append-only** edits, so admins and support staff can discover guides 07/08/09 and runbooks #35/#36/#27 from the nav hubs, and commit a checklist confirming all 8 SSO cross-link edges (SSO-E1 through SSO-E8) are present across the corpus.

**Files this phase touches (all append-only — no existing rows/nodes/edges/anchors modified):**
- `docs/index.md` — macOS Provisioning section: append one grouped row each to the Admin Setup / L1 / L2 tables
- `docs/common-issues.md` — macOS section: append SSO sign-in failure entry routing to L1 #35 / L2 #27
- `docs/quick-ref-l1.md` — macOS section: append SSO escalation triggers (Secure Enclave key error → #36; sign-in loop → #35)
- `docs/quick-ref-l2.md` — macOS section: append SSO log paths + `app-sso platform -s` attestation command
- `docs/decision-trees/06-macos-triage.md` — append SSO failure leaf (disambiguates #35 vs #36)
- `docs/macos-lifecycle/00-ade-lifecycle.md` — append E8 bullet to the "Related Guides:" list (lines 391–394)
- `.planning/phases/81-nav-hub-integration/81-CROSSLINK-CLOSURE.md` — NEW committed closure checklist (planning-dir, not corpus)

**Not in this phase:** No new content authoring (guides 07/08/09 and runbooks #35/#36/#27 already shipped in Phases 76–80). The v1.9 harness lineage bump + any `check-phase-81` validator + the 3-axis terminal re-audit + milestone close are **Phase 82**. Non-macOS authentication content is out of scope this milestone.

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via a three-agent adversarial review (Finder → Adversary → Referee, per the user's standing preference). Finder raised 29 flaws (9 CRITICAL); Adversary disproved 7 (+50, zero wrong-disproves); Referee verified the two pivotal disputes against the actual files and locked four winners. The user accepted all ("Lock all & chain").

### D1 — Decision-tree SSO leaf shape (WINNER: 1B, sub-decision node)
- **D-01: Extend `06-macos-triage.md` with a new SSO symptom edge off `MAC3` leading to ONE sub-decision diamond (`MACSSO`) that routes to two resolved leaves — L1 #35 ("Registration required" notification missing) and L1 #36 (Secure Enclave key error).** This *is* the disambiguation surface that Phase 80 D-04 deferred to the Phase-81 decision-tree SSO leaf (`80-CONTEXT.md:43-44`).
- **Rejected 1A** (single branch → #35 only): hard SC3 violation — SC3 requires routing to BOTH #35 *and* #36; drops #36 to an orphan and defeats the D-04 handoff (two CRITICALs, both confirmed real).
- **Rejected 1C** (two flat top-level MAC3 branches): viable and 3-edge-compliant, but forces the L1 tech to self-classify the symptom with no guiding question, partially re-opening the gap D-04 chartered this leaf to close.
- **Falsified Finder claim:** "1B = 4 edges, breaks the routing invariant" is a FALSE POSITIVE. Verified path `MAC1→MAC3→MACSSO→leaf` = exactly **3 edges**, within the line-59 "within 3 edges of the root" budget. The "7-leaf cap" objection is also FALSE — that cap is DA-9 LOCKED for **L2 #26's Mermaid only** (`80-CONTEXT.md:29`), not the triage tree.
- **D-01 GUARDRAIL (mandatory):** (a) edge count `MAC1→MAC3→MACSSO→leaf` must stay at **3 — do not nest deeper**; (b) apply `classDef resolved` to BOTH new leaves (cures the unstyled-terminal MEDIUM); (c) **add a matching new row pair to the Routing Verification table (lines 61–69)** so the line-59 completeness claim does not go stale (the frozen v1.8 harness will NOT catch a stale table); (d) add `click` directives for both new leaves; (e) #35 leaf must carry/preserve its onward escalation to L2 #27.

### D2 — Cross-link closure checklist: form & location (WINNER: 2B, planning-dir artifact)
- **D-02: Write the SC4 closure checklist to `.planning/phases/81-nav-hub-integration/81-CROSSLINK-CLOSURE.md` (committed).** It is a build-time *verification* artifact, not reader documentation, so it stays OUT of the `docs/` corpus.
- **Rejected 2A** (corpus-facing doc in `docs/`): pollutes the published corpus + the harness `docs/**` surface with a process artifact (CRITICAL).
- **Rejected 2C** (inline in an existing nav index): breaks append-only AND pollutes a reader-facing index (two CRITICALs).
- **Falsified Finder claim:** SC4's "present across the corpus" describes where the *edges* live, not where the *checklist* sits — FALSE POSITIVE against 2B.
- **D-02 GUARDRAIL:** enumerate all 8 edges E1–E8 **verbatim from ROADMAP line 531**, each with a source `file:line` and a resolved? checkbox; reference the checklist from the phase VERIFICATION.md so it is not author-invisible to the Phase-82 harness author.

### D3 — Edge-creation scope (WINNER: 3A, create-missing + verify-rest, bounded)
- **D-03: Phase 81 CREATES the genuinely-missing edges (E8 + the new nav-hub rows/leaf) and VERIFIES E1–E7 already landed in Phases 75–79.** E8 (`00-ade-lifecycle→07`) does NOT exist yet and is legitimately owned by this navigation-last phase.
- **Rejected 3B** (defer / backfill-flag E8): deferring E8 = an absent edge at close → fails SC4 (CRITICAL) and makes the phase goal unachievable; the "Phase 75 backfill" framing is also a misattribution (guide 07 is a Phase 76 deliverable; the lifecycle doc predates it).
- **D-03 GUARDRAIL:** (a) append E8 as ONE bullet in `00-ade-lifecycle.md`'s **"Related Guides:" list (lines 391–394)** — e.g. `- [Platform SSO Setup](../admin-setup-macos/07-platform-sso-setup.md) -- Configure macOS Platform SSO authentication` (clean append, shifts no anchors); (b) **bound the "remediate" clause** — verify E1–E7 with cited grep/line evidence per edge; if any prior-phase edge is found broken, **log it to `81-CROSSLINK-CLOSURE.md` + the deferred backlog — do NOT silently re-author prior-phase content** inside this nav-hub phase (avoids cross-phase scope creep). E7 is already present at `03-configuration-profiles.md:168`.

### D4 — index.md Admin Setup row granularity (WINNER: 4B, one grouped row naming all three)
- **D-04: Append ONE grouped row to each of the macOS Admin Setup / L1 / L2 tables in `docs/index.md`**, matching the established grouped-row house style (existing macOS tables at index.md:102–130 all use single grouped rows → overview/index, never per-item rows).
- **Rejected 4A** (three separate guide rows): breaks the grouped-row house style of the very tables SC1 names (MEDIUM, confirmed).
- **Falsified Finder claim:** "4B fails SC1's literal 'rows … 07/08/09'" is a FALSE POSITIVE — the parallel singular "(runbook #27)" under the same plural "rows" frame proves the parenthetical is a content descriptor, not a 3-row mandate.
- **D-04 GUARDRAIL:** the new Admin Setup row's "When to Use" cell **must name all three guides 07/08/09 by topic** (setup 07, auth-methods deep-dive 08, legacy SSO plug-in migration 09) so discoverability survives the grouping; the L1 row names #35 + #36, the L2 row names #27. All three are net-new rows — the existing overview/lifecycle rows are NOT modified (SC1 append-only).

### Claude's Discretion
- Exact prose wording of all appended nav entries, the SSO triage diamond's question text, escalation-trigger bullets, and "When to Use" cell copy — within the locked SC1–SC4 facts and the guardrails above.
- Exact node IDs / anchor text for the new Mermaid leaves (subject to the `classDef` + `click` + Routing-Verification-row guardrails in D-01).
- The `81-CROSSLINK-CLOSURE.md` table column layout (follow the SC4 edge enumeration).
- Plan decomposition / commit batching across the touched files (planner's call), provided the navigation-last ordering and append-only invariants hold.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope & requirements
- `.planning/ROADMAP.md` §"Phase 81: Nav Hub Integration" (~lines 523–536) — goal, depends-on (Phases 75–80), **SC1–SC4**, and the 8-edge SSO-E1..E8 definitions at ~line 531. SC4's exact edge list is the source of truth for `81-CROSSLINK-CLOSURE.md`.
- `.planning/REQUIREMENTS.md` — SSOREF-04 (the navigation-integration requirement for this phase); milestone "without escalating to engineering" goal.

### Files to edit (append-only — verified targets)
- `docs/index.md` — macOS Provisioning section; Admin Setup table at ~lines 123–130 (existing grouped row `[macOS Admin Setup Guides](admin-setup-macos/00-overview.md)` at :129), L1 table ~:104–109, L2 table ~:111–121. Append one grouped row per table (D-04).
- `docs/common-issues.md` — macOS ADE Failure Scenarios section (anchor `#macos-ade-failure-scenarios`, cross-refs at lines 9–69). Append SSO sign-in failure entry → L1 #35 / L2 #27 (SC2).
- `docs/quick-ref-l1.md` — macOS section: append SSO escalation triggers (SC2).
- `docs/quick-ref-l2.md` — macOS section: append SSO log paths + the `app-sso platform -s` attestation command verbatim (SC2).
- `docs/decision-trees/06-macos-triage.md` — Mermaid block (lines 29–55), **Routing Verification table (lines 57–69)**, `click`/`classDef`/`class` directives (lines 44–54). Append SSO leaf per D-01. **Honor the line-15 "within 3 decision steps" + line-59 "within 3 edges" invariant.**
- `docs/macos-lifecycle/00-ade-lifecycle.md` — "See Also" → **"Related Guides:" bullet list (lines ~391–394)**. Append E8 bullet per D-03.

### Edges already present (verify, do not recreate)
- `docs/admin-setup-macos/03-configuration-profiles.md:168` — E7 (`03→07`) already live: `Continue with Platform SSO setup in [07-platform-sso-setup.md](07-platform-sso-setup.md).` (added Phase 76).
- E1–E4 (07↔glossary, 07↔capability-matrix) are Phase 75–79 deliverables; E5/E6 (35↔27) are Phase-80 in-phase edges (`80-CONTEXT.md:112`). Verify each with cited evidence in the closure checklist.

### Canonical fact sources for nav-entry copy (link-not-copy — summarize + link, never duplicate)
- `docs/admin-setup-macos/07-platform-sso-setup.md` — guide 07 (`app-sso platform -s`, registration token diagnostics).
- `docs/admin-setup-macos/08-auth-methods-deep-dive.md` — guide 08 (Secure Enclave key, password-sync, smart card).
- `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` — guide 09 (legacy plug-in migration).
- `docs/l1-runbooks/35-macos-sso-sign-in-failure.md`, `docs/l1-runbooks/36-macos-secure-enclave-key.md`, `docs/l2-runbooks/27-macos-sso-investigation.md` — the runbooks the nav hubs route to.

### Prior-phase decisions this phase depends on
- `.planning/phases/80-l1-l2-runbooks/80-CONTEXT.md` — **D-04** (the #35-vs-#36 disambiguation is deferred to THIS phase's decision-tree SSO leaf; lines 43–44, 129), **D-02** (navigation-last boundary; lines 31–34), and the verified harness blind-spot (lines 88–90: no internal-link/anchor validator — broken links are harness-invisible).

### House-style / structure precedents (read before authoring)
- `docs/index.md:102–130` — the grouped-row macOS-section pattern that grounds D-04.
- `docs/decision-trees/06-macos-triage.md` whole file — Mermaid + Routing Verification + Legend + How-to-Check conventions for the SSO leaf (D-01).
- v1.6 Phase 65 + v1.5 Phase 59 — prior navigation-last hub-integration phases (append-only precedent).

### Audit harness (do not break — frozen v1.8 until Phase 82)
- `scripts/validation/v1.8-milestone-audit.mjs` — C13 only checks the broken-link allowlist sidecar count; no `docs/**` internal-link crawl. C16 checks 4 hardcoded Apple-Business endpoints (none are Phase-81 files). **Implication: every Phase-81 edge is harness-invisible — the `81-CROSSLINK-CLOSURE.md` checklist + the Routing Verification table are the ONLY safety nets.** New edits must still avoid tripping the ops-domain anti-pattern regexes (C11) and keep frontmatter conventions.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Grouped-row macOS index pattern** (`docs/index.md:102–130`) — single row → overview/index, multi-topic "When to Use" cell. Direct template for the three new Admin Setup / L1 / L2 rows (D-04).
- **macOS triage Mermaid template** (`docs/decision-trees/06-macos-triage.md`) — `MAC3` symptom fan-out + sub-decision diamonds + `classDef resolved`/`escalateL2` + `click` directives + Routing Verification table. Direct template for the SSO leaf (D-01).
- **"Related Guides:" bullet list** (`docs/macos-lifecycle/00-ade-lifecycle.md:391–394`) — clean append site for E8 (D-03).

### Established Patterns
- **navigation-last invariant** — Phase 81 (SSOREF-04) owns ALL nav-hub + decision-tree wiring; every prior phase stopped short of these files.
- **append-only** — no existing row/node/edge/anchor modified; new content is additive only (SC1–SC3 literal).
- **link-not-copy** — nav entries summarize + link to guides/runbooks; never duplicate their tables/steps.
- **3-edge / 3-step routing invariant** — `06-macos-triage.md` terminals stay within 3 edges of root; the SSO sub-decision leaf sits at exactly 3 (D-01 guardrail).
- **harness-invisible internal links** — the frozen v1.8 harness does not crawl internal links; the closure checklist + Routing Verification table substitute for tooling enforcement.

### Integration Points
- New `docs/index.md` rows → guides 07/08/09 (overview anchors) + runbooks #35/#36/#27.
- `common-issues.md` / `quick-ref-l1.md` SSO entries → L1 #35/#36; `quick-ref-l2.md` → L2 #27 + `app-sso platform -s`.
- `06-macos-triage.md` SSO leaf → L1 #35 + L1 #36 (and #35 onward → L2 #27).
- `00-ade-lifecycle.md` Related Guides bullet → guide 07 (E8).

</code_context>

<specifics>
## Specific Ideas

- The triage SSO sub-decision diamond should phrase the disambiguation as a single question distinguishing "the 'Registration required' notification never appeared" (→ #35) from "a Secure Enclave key error occurred" (→ #36) — guided question, not bare symptom labels.
- `quick-ref-l2.md` must reproduce `app-sso platform -s` **verbatim** (the SC-locked canonical attestation command; `security find-certificate` appears nowhere).
- `81-CROSSLINK-CLOSURE.md` lists E1–E8 in the exact ROADMAP-line-531 order with per-edge `file:line` evidence and a checkbox.

</specifics>

<deferred>
## Deferred Ideas

- **v1.9 harness lineage bump + `check-phase-81` validator + 3-axis terminal re-audit + milestone close** — Phase 82.
- **Any broken E1–E7 edge discovered during verification** — log to `81-CROSSLINK-CLOSURE.md` + deferred backlog; do NOT re-author prior-phase content inside this nav phase (D-03 guardrail).

None other — discussion stayed within phase scope.

</deferred>

---

*Phase: 81-nav-hub-integration*
*Context gathered: 2026-06-22*
