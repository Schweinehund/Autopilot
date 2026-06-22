# Phase 80: L1/L2 Runbooks - Context

**Gathered:** 2026-06-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Author three macOS Platform SSO troubleshooting runbooks and register them in the index files:

1. **`docs/l1-runbooks/35-macos-sso-sign-in-failure.md`** (L1, SSORUN-01) — triage "Registration required" notification not appearing despite Intune reporting Succeeded; four root causes (old Company Portal / Error 10002 legacy conflict / mistyped registration token / dismissed notification); `app-sso platform -s` as first triage step; escalation triggers to L2 #27.
2. **`docs/l1-runbooks/36-macos-secure-enclave-key.md`** (L1, SSORUN-02) — verify Secure Enclave key state and guide re-registration after key loss due to password reset; `app-sso platform -s` as verification; escalation triggers to L2 #27.
3. **`docs/l2-runbooks/27-macos-sso-investigation.md`** (L2, SSORUN-03) — investigate PSSO registration failures + Password-sync failures (sign-in logs, sysdiagnose, TLS-inspection exclusion verification, per-user-MFA / AD-bound-account checks); macOS 15.0-15.2 re-registration loop version-gated "fixed in 15.3"; `security find-certificate` absent — replaced by `app-sso platform -s` everywhere.
4. **Index updates** — new rows in `docs/l1-runbooks/00-index.md` and `docs/l2-runbooks/00-index.md`; the L2 index escalation-mapping table maps L1 #35 and L1 #36 → L2 #27.

**Not in this phase:** All navigation-hub integration — `docs/index.md` rows, `common-issues.md`, `quick-ref-l1.md`/`quick-ref-l2.md`, and the `decision-trees/06-macos-triage.md` SSO leaf — is **Phase 81 (SSOREF-04)** per the navigation-last invariant. The v1.9 harness lineage bump + any `check-phase-80` validator is Phase 82. Non-macOS authentication content is out of scope this milestone.

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via a three-agent adversarial review (Finder → Adversary → Referee) per the user's standing preference. Finder raised 29 flaws (100 pts, 3 CRITICAL); Adversary disproved 3 LOW; Referee confirmed all 3 disproves as FALSE POSITIVE, re-affirmed all 3 CRITICALs, downgraded 2 MEDs to LOW, and locked four winners. Harness behavior was empirically verified (ran `node scripts/validation/v1.8-milestone-audit.mjs` → 15 pass: a broken internal/forward link is **harness-invisible**, so area B turns on the navigation-last *invariant*, not tooling). The user accepted all ("Lock all & chain").

### A — L2 #27 document structure (WINNER: A1, two linear investigation tracks)
- **D-01: Structure L2 #27 as two sequential linear investigation tracks** — a Registration-failure track and a Password-sync-failure track — modeled on the linear L2 investigation analog `docs/l2-runbooks/19-android-enrollment-investigation.md` (NOT the `#26` Mermaid-router model).
- **D-01a (cure A1-1):** Import L2 #19's **"From L1 escalation?" routing block** near the top so an escalated ticket can jump straight to the matching track instead of scrolling past the other.
- **D-01b (cure A1-4):** Open with the **macOS log-collection prerequisite handoff** to `docs/l2-runbooks/10-macos-log-collection.md` (the "gather diagnostics first" invariant every L2 runbook honors).
- **Rejected A2** (Mermaid decision-tree-first like #26): owns the only CRIT in the pair (A2-1) — its leaves would target the **Phase-81-owned** `06-macos-triage.md` SSO leaf (navigation-last violation) and would import #26's "DA-9 LOCKED — 7 leaves / #26 cap, Phase 65 CI-5 invariant" framing that Phase 80 has no authority over. Also: SSORUN-03 demands two-track **investigation depth** (sign-in logs, sysdiagnose, TLS exclusions, MFA/AD causes) — content a linear doc carries inline; #26 is a pure router that pushes depth to other docs that, for #27's causes, do not exist (A2-2, A2-3).

### B — Forward-link / navigation-last boundary (WINNER: B1, existing-artifact links only)
- **D-02: Runbooks link ONLY to artifacts that exist at Phase-80 commit time** — guides `07`/`08` (link-not-copy), each runbook's own back-to-triage footer to `../decision-trees/06-macos-triage.md`, and the in-phase escalation edges below. **Defer the new decision-tree SSO-leaf link to Phase 81.**
- **D-02a (in-phase edges — MANDATORY, guards B1-2):** `35-…` and `36-…` MUST each contain a `→ 27-macos-sso-investigation.md` escalation link, and L2 #27 MUST carry the reciprocal back-references (SC4 / Phase-81 edges E5 `35→27`, E6 `27→35`). Do NOT over-defer these — only the *new SSO leaf* wiring waits for Phase 81. The standard `[Back to macOS ADE Triage](../decision-trees/06-macos-triage.md)` footer (present on every macOS L1 runbook #10–15) is kept; it points at the existing tree even though the SSO leaf is not added until Phase 81.
- **Rejected B2** (forward-link to the not-yet-existing SSO leaf now): CRIT B2-1 — out-of-phase pre-emption of the **navigation-last invariant** (Phase 81 / SSOREF-04 owns the `06-macos-triage.md` SSO leaf). Harness-invisible (verified) so it would *ship silently broken*, plus it hard-codes an unspecified Phase-81 anchor slug (B2-3) and creates a dangling half-edge (B2-4).

### C — L1 Terminal-command interaction model (WINNER: C1, guided Terminal walkthrough)
- **D-03: Walk the user through `app-sso platform -s` in Terminal** using the existing "Say to the user" guided-conversation pattern, then have them report the output back to L1. This honors SSORUN-01/02, which mandate `app-sso platform -s` as the **first** L1 triage/verification step.
- **D-03a (scope / bound C1-2 + C2-4):** Scope the Terminal step to the `app-sso platform -s` triage only; reproduce the command **verbatim** (it is the SC-locked canonical command, replacing `security find-certificate`); pair it with the standard structured **"Before escalating, collect:"** checklist so L1 *collects and pattern-matches against documented states* rather than deep-interpreting raw output.
- **Precedent that legitimizes the new Terminal step (overturns FALSE-POSITIVE C1-3):** `docs/l1-runbooks/00-index.md:81` already ships a corpus-level affordance — L1 runbooks may use a *"terminal walkthrough as appropriate per cause"* (currently used by Linux L1 #30–33). PSSO device-side key state is exactly such a CLI-only cause.
- **Rejected C2** (minimize L1 interpretation / escalate to L2): worst-of-both (C2-2, MED) — C2 *still* requires L1 to run `app-sso platform -s` to collect escalation output, so it inherits the same "L1 runs Terminal" novelty as C1 **while discarding** the triage value SC1/SC2 promise (C2-1), and raises escalation volume against the milestone "without escalating to engineering" goal (C2-3).

### D — L1 #35 ↔ #36 cross-coverage boundary (WINNER: D2, strictly independent)
- **D-04: Keep `35-…` and `36-…` strictly independent** — no `#35↔#36` cross-links and no "start here" disambiguation note inside the runbooks. Disambiguation between "registration not appearing" (#35) and "Secure Enclave key failure" (#36) is **explicitly deferred to the Phase-81 decision-tree SSO leaf (SSOREF-04)**, which owns that routing job — the gap is intentional, not an oversight.
- **Rationale:** Phase 81's tracked cross-link closure set is exactly the 8 SSO-E edges (SSO-E1..E8) and **`#35↔#36` is not among them** — D1 would add untracked cross-phase edges (D1-1, MED) and a "start here" note that pre-empts the Phase-81 tree's disambiguation role (D1-2), the same navigation-last tension that sinks B2. D2's only real cost — no disambiguation surface during the short Phase 80→81 window (D2-1) — is transient and self-heals the moment Phase 81 lands the SSO leaf.

### Claude's Discretion
- Exact prose wording of all triage steps, "Say to the user" scripts, escalation-trigger bullets, and the L2 investigation narrative — within the locked SC1–SC4 facts.
- Internal heading/anchor text within each runbook (subject to the corpus frontmatter + house-style conventions).
- Exact phrasing of the L2 #27 "From L1 escalation?" routing block and the two track headings.
- The L2-index escalation-mapping table's exact column layout (follow the existing `00-index.md` table conventions).
- **Research flag (resolve at plan time, do NOT decide here):** `app-sso diagnose` command and `log stream --predicate` subsystem filter values for the L2 #27 deep-dive are LOW confidence — validate against Apple developer documentation before authoring (ROADMAP research flag, line 502/206).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope & requirements
- `.planning/ROADMAP.md` §"Phase 80: L1/L2 Runbooks" (~lines 498–511) — goal, depends-on (Phases 75/76/77), the LOW-confidence research flag (line 502), SC1–SC4.
- `.planning/ROADMAP.md` §"Phase 81: Nav Hub Integration" (~lines 513–522) — confirms the decision-tree SSO leaf + all nav hubs are Phase-81-owned (grounds D-02 / D-04); the 8-edge closure set (SSO-E1..E8) at line 515.
- `.planning/REQUIREMENTS.md` — SSORUN-01 (line 44), SSORUN-02 (line 45), SSORUN-03 (line 46); SSOREF-04 = Phase 81 (line 53); milestone "without escalating to engineering" goal (line 4).

### Files to create (verified absent — next available numbers)
- `docs/l1-runbooks/35-macos-sso-sign-in-failure.md` — **CREATE** (L1 #34 is the current max).
- `docs/l1-runbooks/36-macos-secure-enclave-key.md` — **CREATE**.
- `docs/l2-runbooks/27-macos-sso-investigation.md` — **CREATE** (L2 #26 is the current max).

### Files to edit (index rows — SC4)
- `docs/l1-runbooks/00-index.md` — add rows for #35/#36 under the **macOS ADE Runbooks** section (table at ~lines 40–47). Note the index intro (line 13) currently promises "no PowerShell execution… no log file analysis"; the row copy + runbook scope must stay consistent with the line-81 "terminal walkthrough as appropriate per cause" affordance.
- `docs/l2-runbooks/00-index.md` — add a row for #27 AND extend/add the **escalation-mapping table** so L1 #35 and L1 #36 → L2 #27.

### Canonical fact sources (link-not-copy — summarize + link, do NOT duplicate)
- `docs/admin-setup-macos/07-platform-sso-setup.md` — `app-sso platform -s`, registration token diagnostics (runbooks reference these; Phase 76 deliverable).
- `docs/admin-setup-macos/08-auth-methods-deep-dive.md` — Secure Enclave key behavior, password-sync failure modes (L2 #27 references these; Phase 77 deliverable).
- `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` — Error 10002 / legacy plug-in conflict context (Phase 78), relevant to L1 #35 root-cause #2.

### House-style / structure precedents (read before authoring)
- `docs/l1-runbooks/15-macos-company-portal-sign-in.md` — the closest L1 macOS analog: frontmatter, platform-gate blockquote, "Say to the user" steps, Escalation Criteria + "Before escalating, collect:" checklist, back-to-triage footer, Version History table.
- `docs/l1-runbooks/00-index.md:13` (audience promise) and `:81` (the "terminal walkthrough as appropriate per cause" affordance that legitimizes C1).
- `docs/l2-runbooks/19-android-enrollment-investigation.md` — the linear multi-track L2 **investigation** analog (D-01): note the "From L1 escalation?" routing block (~line 19) and the mandatory log-collection prerequisite (~line 17).
- `docs/l2-runbooks/10-macos-log-collection.md` — the macOS L2 log-collection prerequisite L2 #27 must hand off to (D-01b).
- `docs/l2-runbooks/26-apple-business-permission-denied.md` — the Mermaid-router model that was **rejected** for #27 (A2); read only to understand why it is the wrong template here.
- `docs/decision-trees/06-macos-triage.md` — verified to currently have NO SSO leaf (grounds B1/D2). Do NOT edit this file in Phase 80.

### Audit harness (do not break — frozen v1.8 until Phase 82)
- `scripts/validation/v1.8-milestone-audit.mjs` — **VERIFIED**: C13 (~lines 668–679) only asserts the broken-link allowlist sidecar has 15 entries (6 transient_external + 9 template_placeholder); it does NOT crawl `docs/**` for link targets. C16 (~lines 762–807) checks only 4 hardcoded Apple-Business endpoints (none are Phase-80 files). No harness check parses internal relative links or anchors. Implication: a broken/forward link is harness-invisible — which is *why* B1 (not the harness) governs the navigation-last decision. New Phase-80 files must still avoid tripping the ops-domain anti-pattern regexes (C11) and keep frontmatter conventions.
- `.github/workflows/audit-harness-v1.8-integrity.yml` — the only markdown-link-check job (`rotting-external-quarterly`) is quarterly-cron + external-URL-only + empty population; it does not gate push/PR on internal links.

### Prior-phase decisions this phase depends on
- Phases 75 (glossary), 76 (guide 07), 77 (guide 08), 78 (guide 09), 79 (capability matrix) are all verified Complete — their facts are the canonical sources these runbooks summarize/link.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **L1 macOS runbook template** (`15-macos-company-portal-sign-in.md`) — frontmatter (`last_verified`/`review_by`/`applies_to`/`audience: L1`/`platform: macOS`), platform-gate blockquote, numbered "Say to the user" steps, **Escalation Criteria** + structured "Before escalating, collect:" checklist, back-to-triage footer, Version History table. Direct template for #35/#36.
- **L2 linear investigation template** (`19-android-enrollment-investigation.md`) — "From L1 escalation?" routing block + log-collection prerequisite + pattern-per-failure-mode sections. Direct template for #27's two tracks (D-01).
- **L2 escalation-mapping table** (`l2-runbooks/00-index.md`) — existing format to extend for the L1 #35/#36 → L2 #27 mapping (SC4).

### Established Patterns
- **link-not-copy** — runbooks summarize + link to guides 07/08/09; never duplicate their tables/steps (Phase 76–79 discipline).
- **navigation-last invariant** — Phase 81 (SSOREF-04) owns ALL nav-hub + decision-tree wiring; Phase 80 stops at the 3 runbooks + their 2 index rows + in-phase escalation edges. Grounds B1 and D2.
- **"Terminal walkthrough as appropriate per cause"** — the L1 index already sanctions cause-gated L1 Terminal steps (`00-index.md:81`); legitimizes C1's guided `app-sso platform -s` step despite the macOS-L1 portal-first norm.
- **`app-sso platform -s` is canonical** — replaces `security find-certificate` everywhere (SC3-locked); reproduce verbatim.
- **Gather-first** — every L2 runbook opens by handing off to its platform log-collection guide; #27 → `10-macos-log-collection.md`.

### Integration Points
- `35-…` and `36-…` → escalate to `27-macos-sso-investigation.md` (E5); `27-…` back-references `35`/`36` (E6) — all three are Phase-80 deliverables, so these edges land in-phase.
- The deferred edges — `06-macos-triage.md` SSO leaf, `docs/index.md` rows, `common-issues.md`, `quick-ref-l1/l2.md` — are wired by Phase 81; Phase 80 must NOT touch those files.

</code_context>

<specifics>
## Specific Ideas

- L2 #27 internal narrative ordering: Registration-failure track first, then Password-sync-failure track (matches SC3 enumeration order).
- The macOS 15.0-15.2 re-registration loop must be presented as a **version-gated callout** noting "fixed in 15.3" (SC3).
- `security find-certificate` must appear NOWHERE in the new runbooks (SC3 explicit) — `app-sso platform -s` is the sole device-side state command.

</specifics>

<deferred>
## Deferred Ideas

- **Decision-tree SSO leaf + #35/#36 disambiguation** — belongs to Phase 81 (SSOREF-04), navigation-last. The transient "no disambiguation during 80→81 gap" cost of choosing D2 is accepted and self-heals when Phase 81 lands.
- **All nav-hub rows** (`docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`) — Phase 81.
- **v1.9 harness lineage bump + any `check-phase-80` validator** — Phase 82.

</deferred>

---

*Phase: 80-l1-l2-runbooks*
*Context gathered: 2026-06-21*
