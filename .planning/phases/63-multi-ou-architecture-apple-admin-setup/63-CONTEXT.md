# Phase 63: Multi-OU Architecture & Apple Admin Setup - Context

**Gathered:** 2026-05-21
**Status:** Ready for planning

<domain>
## Phase Boundary

The **architecture + admin-setup layer** of v1.6 Apple Business Delegated Governance — decision frameworks and per-OU setup docs (NOT operational runbooks; those are Phase 64). Phase 63 delivers, on top of Phase 62's foundation (`00-overview.md`, `01-role-permission-model.md` 7-subgroup catalog = SOT, `02-ous-architecture.md`, `_admin-directory.md`):

- **OU-01** `03-ous-vs-custom-roles.md` — OUs-only / custom-roles-only / combined topology decision matrix with "most-permissive wins" callout (OP-4)
- **OU-02** `04-custom-role-authoring.md` — the v1.6 differentiator: a min-viable sub-org admin permission bundle (4-6 permissions), citing Phase 62's role/permission model as SOT
- **OU-03** `05-sub-org-admin-onboarding.md` — Managed Apple Account creation + role assignment + OU scoping + paired offboarding (OP-8); carries the stable, C16-gated `#which-admin-owns-this-pool` anchor
- **OU-04 / OU-05 / OU-06** — per-OU MDM server assignment, per-OU VPP content-token consolidation, and Managed Apple Account provisioning (manual / SCIM / OIDC+JIT) decision matrix — as standalone admin-setup docs (`06-`/`07-`/`08-`)
- **OU-07** `09-shared-ipad-lifecycle.md` — sessions + user provisioning + Find My disable (OP-12, HIGH)
- **OU-08** `10-apple-tv-lifecycle.md` — Configurator-only retail-purchase path + OU assignment + content-token app deployment + Conference Room Display shared-physical-space heuristic (OP-15, LOW)
- **OU-09** 3 incremental rows in `ios-capability-matrix.md` under the existing Enrollment H2 (pre-edit anchor inventory mandatory per PITFALL-6 / DA-4)
- **OU-10** `macos-capability-matrix.md` + `4-platform-capability-comparison.md` remain byte-unchanged (D-A3 invariant; preserves C12 240-cell math)

**Out of scope (Phase 64 owns):** operational runbooks `11-vpp-catalog-runbook.md` (DELEG-01), `15-mdm-server-reassign-runbook.md` (DELEG-05), `16-managed-apple-account-runbook.md` (DELEG-06) — including the operational OP-9 untouched-OU hard-bordered callout. **Out of scope (v1.7+):** the per-OU CRD partitioning *deep-dive* and sub-OU nesting at depth > 2.

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via batched `/adversarial-review` (Finder → Adversary → Referee, three independent Opus agents reading the shipped Phase 62 files + research directly). Referee scores in parentheses (lower = better). Recommendation set: **A / A / A / B**, user-approved.

### D-01: File boundary for OU-04 / OU-05 / OU-06 — standalone admin-setup docs (Option A; score A=2 / B=8 / C=5)

**Decision:** Ship OU-04, OU-05, OU-06 as **three standalone Phase 63 admin-setup docs**:
- OU-04 → `docs/cross-platform/apple-business/06-mdm-server-assignment.md` (per-OU MDM server assignment + "Manage MDM Servers" DENY-by-default guidance per OP-1)
- OU-05 → `docs/cross-platform/apple-business/07-vpp-content-token-consolidation.md` (per-OU content-token consolidation, admin-setup framing; **points to** Phase 64's `11-vpp-catalog-runbook.md` for the operational OP-9 untouched-OU hard-bordered callout — does NOT duplicate it)
- OU-06 → `docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md` (manual / SCIM / OIDC+JIT provisioning decision matrix; cross-links to Phase 64's `16-managed-apple-account-runbook.md`)

This fills the 06/07/08 slot, preserving a clean 03–10 sequence (06/07/08 then locked 09/10).

**Rationale:** Referee score 2. Only option preserving the **D-01 (Phase 62) file-level-anchor-over-section-anchor** stability precedent and 1-requirement-1-file traceability that `check-phase-63.mjs` (validator-as-deliverable) expects. Option B was disqualified: it mutates the frozen Phase 62 file `02-ous-architecture.md` (PITFALL-6 anchor shift), demotes the OP-9 callout against that file's own line-104 deferral prose, and endangers the C16 `#which-admin-owns-this-pool` anchor by folding OU-06 into `05-sub-org-admin-onboarding.md`.

**Considered & rejected:** (B) fold into existing docs — mutates frozen Phase 62 file + destroys file-level traceability + OP-9 demotion + C16 anchor risk (CRITICAL); (C) one consolidated `06-per-ou-admin-setup.md` — 3 reqs behind one filename collapses traceability to less-stable intra-file anchors (contra D-01) + buries OP-9 + intra-file anchor instability for Phase 64 cross-links.

**Adversary correction applied:** The Finder's CI-5 anti-proliferation objections against standalone docs were overturned — **CI-5 caps L1 runbooks at ≤2 in Phase 65; it does NOT constrain Phase 63 admin-setup doc counts.**

### D-02: Custom-role min-viable bundle — single canonical bundle (Option A; score A=2 / B=6 / C=4)

**Decision:** `04-custom-role-authoring.md` ships **one canonical "Sub-Org Admin" bundle of 4-6 permissions** (singular), citing `01-role-permission-model.md` as SOT.

**Rationale:** Referee score 2. Matches OU-02 / SC#2 verbatim — "a documented min-viable sub-org admin permission bundle **(4-6 permissions)**" is explicitly singular. Option B (multiple archetypes) over-delivers against a singular requirement and collides with Phase 62's 5 preset role names (People/Content/Device Enrollment/Device API/Brand Manager → SOT ambiguity); Option C (tiered core+add-ons) reintroduces OP-1 superprivilege blur (MDM-server permission as an "optional add-on") and OP-3 Edit-without-View pairing hazards.

**Adversary correction applied:** The Finder's "must ship ≥6 reference roles" objection was overturned — **the 6-reference-role privilege-grant matrix is a Phase 62 doc-authoring artifact in `01-role-permission-model.md` (OP-1's contract), NOT a bar OU-02 must meet.**

**Considered & rejected:** (B) multiple archetypes — over-delivery + preset-name collision + multiplied OP-1/OP-2 audit surface; (C) tiered add-ons — OP-1 DENY-by-default blur + OP-3 companion-View drop hazard.

### D-03: OU-01 decision-matrix format — criteria comparison table (Option A; score A=2 / B=4 / C=5 / D=6)

**Decision:** `03-ous-vs-custom-roles.md` presents the OUs-only / custom-roles-only / combined choice as a **criteria comparison table** (rows = decision criteria, columns = 3 topologies), with the "most-permissive wins across overlapping assignments" callout (OP-4) placed **adjacent** to the matrix.

**Rationale:** Referee score 2. OU-01 / SC#1 literally requires a "decision **matrix**" — a table is the literal satisfaction. The OP-4 phrase rides in an adjacent callout (the `02-ous-architecture.md:54-59` precedent already pairs prose + callout, so the "table dilutes the OP-4 phrase check" objection fails). Option D (combined Mermaid tree + table) is penalized by the **Phase 62 D-04 anti-redundancy precedent** ("robust-but-redundant, no net benefit") + doubled anchor surface; Option B (Mermaid tree) has no natural home for the additive-scope invariant; Option C (scenario-driven) fails the literal "matrix" wording and risks incomplete 3-topology coverage.

**Adversary correction applied:** "Mermaid is a novel/risky surface" was overturned — Mermaid is an established corpus pattern (v1.4 Android / v1.5 Linux triage trees). It simply isn't the best fit for *this* matrix.

### D-04: Apple TV + Shared iPad lifecycle depth — core depth + hedge (Option B; score A=5 / B=2 / C=9)

**Decision:** `09-shared-ipad-lifecycle.md` and `10-apple-tv-lifecycle.md` ship **core depth on the documented surface + explicit "Apple does not publish" hedges + portal-verification notes** for thin areas. Specifically:
- **Full depth, NOT deferred:** OP-12 Find My disable (HIGH; mandatory pre-deployment step), shared iPad sessions + user provisioning, Configurator-only retail-purchase path, OU assignment, content-token app deployment, and the OP-15 Conference Room Display shared-physical-space *heuristic*.
- **Deferred with a tracking note:** the per-OU CRD *partitioning deep-dive* (LOW-severity OP-15, "explicitly de-prioritize") → v1.7+; sub-OU nesting at depth > 2 (unverified).

**Rationale:** Referee score 2. Uniquely calibrates effort to severity. Option A over-invests in the LOW-severity, explicitly-de-prioritized OP-15 deep-dive and risks asserting unverified depth>2 nesting. Option C (minimal stubs) is disqualified: it drops the HIGH-severity OP-12 Find My step, under-delivers the named SC#4 elements, breaks the Phase 64 Wave-B anchor dependency (Phase 64 runbooks cross-link `09-`/`10-`), and trips the PITFALLS anti-skip technical-debt guard.

**Adversary correction applied:** The Finder's "Option A publishes forbidden sub-OU nesting" was overturned for **depth ≤ 2** — `02-ous-architecture.md:46-52` authorizes depth≤2 authoring and assigns the portal verification to Phase 63 itself; only depth>2 is forbidden. And the CRD *heuristic* is a Phase 63 deliverable (per Phase 62 CONTEXT `<deferred>`), not v1.7+ — only the *deep-dive* is v1.7+.

### D-05: Cross-cutting fix — repair stale `05-vpp-catalog-consolidation` forward-reference (review byproduct)

**Decision:** Phase 63 must repair the **stale/dangling forward-reference** in the frozen Phase 62 file `docs/cross-platform/apple-business/02-ous-architecture.md:102` ("Untouched-OU Trap" section), which points to a non-existent `05-vpp-catalog-consolidation`. The real owner of the operational OP-9 untouched-OU hard-bordered callout is Phase 64's `11-vpp-catalog-runbook.md` (DELEG-01); the Phase 63 admin-setup counterpart is `07-vpp-content-token-consolidation.md` (OU-05, per D-01). Reconcile the reference accordingly as an **atomic, anchor-inventoried edit** (PITFALL-6 pre-edit anchor inventory mandatory before touching the frozen file).

**Rationale:** Surfaced by all three review agents against the shipped file. Option-independent — Phase 63 owns this fix regardless of the D-01 outcome. Leaving it dangling breaks cross-reference/link integrity.

### D-06: Cross-cutting constraint — honor depth≤2 sub-OU authoring cap (review byproduct)

**Decision:** All Phase 63 docs author OU hierarchy as **flat-by-default with optional one-level sub-OUs (depth ≤ 2)** until the Phase 63 portal-verification deferred item resolves. Carry the portal-verification note for depth>2. (Per `02-ous-architecture.md:46-52`.) If portal verification completes during Phase 63 and confirms a deeper bound, the planner may lift this cap and update `02-ous-architecture.md` §3 via an anchor-inventoried edit.

### Claude's Discretion

- Exact 4-6 permission composition of the OU-02 bundle (must respect OP-1 DENY MDM-servers, OP-2 no Account-Holder, OP-3 companion-View pairing) — researcher/planner selects from the `01-role-permission-model.md` 7-subgroup catalog.
- Exact criteria rows for the OU-01 comparison table (D-03).
- Whether the OU-05 stale-ref reconciliation (D-05) points solely at `11-vpp-catalog-runbook.md` or also references the Phase 63 `07-` admin-setup doc — planner decides during the anchor-inventoried edit.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor) MUST read these before planning or implementing.**

### Project planning (LOCKED)
- `.planning/PROJECT.md` — v1.6 milestone overview, Apple Business surface scope boundaries (Intune-side RBAC OUT OF SCOPE)
- `.planning/REQUIREMENTS.md` — Phase 63 reqs **OU-01 through OU-10** (Pillar 2); note exact wording: OU-02 "(4-6 permissions)" singular, OU-01 "decision matrix", OU-09 "3 new rows", OU-10 immutability
- `.planning/ROADMAP.md` — Phase 63 Goal + Success Criteria SC#1-5 + Phase 64 runbook ownership + **Wave B dependency** (Phase 64 opens after `05-...#which-admin-owns-this-pool` + `09-` + `10-` anchors land)
- `.planning/STATE.md` — D-A1 through D-A10 architectural decisions; v1.6 phase dependency summary

### v1.6 research
- `.planning/research/SUMMARY.md` — terminology canon (OU vs Locations, content tokens, Managed Apple Account)
- `.planning/research/STACK.md` — Apple-side surfaces (2026 terminology) + Intune-side verbatim labels
- `.planning/research/FEATURES.md` — workflow landscape + anti-features
- `.planning/research/ARCHITECTURE.md` — D-A decisions (incl. Mermaid path-selector precedent, D-A3 immutability)
- `.planning/research/PITFALLS.md` — **OP-1** (Manage MDM Servers DENY-by-default), **OP-2** (Account Holder never delegated), **OP-3** (Edit-without-View dependency table), **OP-4** (most-permissive-wins phrase check), **OP-8** (offboarding auto-revoke), **OP-9** (untouched-OU — operational callout owned by Phase 64), **OP-12** (Find My, HIGH), **OP-15** (Apple TV CRD, LOW — explicitly de-prioritize); **CI-5** scope = L1-runbook cap (Phase 65), NOT a Phase 63 doc-count rule

### Phase 62 deliverables — SOURCE OF TRUTH (read before authoring Phase 63 docs)
- `docs/cross-platform/apple-business/01-role-permission-model.md` — **7-subgroup permission catalog = SOT for OU-02**; per-permission DENY-by-default flags (incl. Manage MDM Servers, line ~276); Edit-without-View dependency table (lines ~343-370); 5 preset custom roles
- `docs/cross-platform/apple-business/02-ous-architecture.md` — OU scope-coverage table; **depth≤2 sub-OU cap (lines 46-52, D-06)**; "most-permissive wins" prose (lines 54-59, D-03 precedent); **stale `05-vpp-catalog-consolidation` ref at line 102 (D-05 fix target)**
- `docs/cross-platform/apple-business/00-overview.md` — style-guide HTML-comment convention; rebrand callout site #1
- `docs/cross-platform/apple-business/_admin-directory.md` — C16 cross-link target for `05-...#which-admin-owns-this-pool`
- `docs/cross-platform/apple-business/_glossary-apple-business.md` — terminology canon; first-mention parenthetical convention
- `.planning/phases/62-apple-business-foundation-rebrand/62-CONTEXT.md` — **D-01 (file-anchor > section-anchor)** + **D-04 (anti-redundancy)** precedents that drive D-01/D-03 here

### Capability matrices (OU-09 / OU-10)
- `docs/reference/ios-capability-matrix.md` — OU-09 appends 3 rows under existing Enrollment H2 (line 13); **pre-edit anchor inventory mandatory (PITFALL-6 / DA-4)**
- `docs/reference/macos-capability-matrix.md` — **UNCHANGED (OU-10 / D-A3)**
- `docs/reference/4-platform-capability-comparison.md` — **UNCHANGED (OU-10 / D-A3; preserves C12 240-cell math)**

### Apple-side primary sources (OU-06 federation/SCIM + content tokens)
- `https://support.apple.com/guide/apple-business-manager/manage-content-tokens-axme0f8659ec/web` — per-OU content-token semantics (OU-05)
- `https://support.apple.com/guide/apple-business-manager/intro-to-federated-authentication-axmb19317543/web` — federated auth (OU-06 SCIM/OIDC+JIT context)

### Intune-side verbatim labels (preserve, do not rename — C15 guard active)
- `https://learn.microsoft.com/en-us/intune/app-management/deployment/manage-vpp-apple` — "Apple VPP tokens" label UNCHANGED in Intune

### Phase 64 / Phase 65 cross-link targets (forward references from Phase 63 docs)
- `docs/cross-platform/apple-business/11-vpp-catalog-runbook.md` (Phase 64, DELEG-01) — owns operational OP-9 callout; OU-05 doc points here
- `docs/cross-platform/apple-business/15-mdm-server-reassign-runbook.md` (Phase 64, DELEG-05) — OU-04 doc cross-links
- `docs/cross-platform/apple-business/16-managed-apple-account-runbook.md` (Phase 64, DELEG-06) — OU-06 doc cross-links

### Audit harness (active gates — content must pass)
- `scripts/validation/v1.6-milestone-audit.mjs` — C14/C15/C16 active from Phase 62; C15 = Intune-delegation banned-phrase guard (scans all v1.6 docs)
- `scripts/validation/check-phase-62.mjs` — Path-A template for `check-phase-63.mjs` (validator-as-deliverable)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`01-role-permission-model.md` 7-subgroup catalog** — direct SOT cite target for the OU-02 bundle (D-02); already enumerates DENY-by-default flags + Edit-without-View pairs.
- **`02-ous-architecture.md` OU scope-coverage table + "most-permissive wins" prose** — template for D-03's adjacent callout and source for OU-04/05/06 per-OU scoping framing.
- **`00-overview.md` style-guide HTML-comment convention** — applies to any allowlist exemptions (though exemption blocks land in Phase 64).
- **`_admin-directory.md`** — already-shipped C16 cross-link target; OU-03's `#which-admin-owns-this-pool` anchor links to it.
- **`check-phase-62.mjs`** — Path-A copy source for `check-phase-63.mjs` (extend with OU-01..OU-10 deliverable assertions + OU-10 byte-unchanged guard).

### Established Patterns
- **File-per-deliverable + file-level anchors (Phase 62 D-01)** — drives D-01 standalone-docs decision; gives stable cross-link targets for Phase 64 Wave B.
- **Anti-redundancy (Phase 62 D-04)** — drives D-03 (reject combined tree+table).
- **PITFALL-6 pre-edit anchor inventory** — MANDATORY before editing `ios-capability-matrix.md` (OU-09) and before the D-05 edit to frozen `02-ous-architecture.md`.
- **CI-5 anti-proliferation = L1-runbook cap (Phase 65), NOT a Phase 63 doc-count rule** — clarified during review; do not let it suppress standalone admin-setup docs.
- **C15 Intune-delegation banned-phrase guard** — active; OU-06 SCIM/OIDC+JIT prose is the highest-risk surface — keep federation framing on the Apple Business side.
- **60-day `last_verified` rule** — applies to all new Apple Business docs.

### Integration Points
- **Phase 63 → Phase 64 (Wave B):** `09-shared-ipad-lifecycle.md` + `10-apple-tv-lifecycle.md` + `05-...#which-admin-owns-this-pool` anchors must land for Phase 64 runbook authoring to begin in parallel. OU-04/05/06 docs cross-link to Phase 64 runbooks 15/11/16.
- **Phase 63 → Phase 65:** `05-sub-org-admin-onboarding.md#which-admin-owns-this-pool` is the C16 4-edge triangle gate target for Phase 65 L1 #34.
- **Phase 63 → Phase 66:** `check-phase-63.mjs` joins the validator chain verified at the terminal re-audit.

</code_context>

<specifics>
## Specific Ideas

- **OU-04/05/06 filenames (D-01):** `06-mdm-server-assignment.md`, `07-vpp-content-token-consolidation.md`, `08-managed-apple-account-provisioning.md` — fills the 06/07/08 gap before locked `09-`/`10-`.
- **OU-05 ↔ Phase 64 boundary (D-01/D-05):** the OP-9 untouched-OU **hard-bordered** callout is OWNED by Phase 64's `11-vpp-catalog-runbook.md`; the Phase 63 `07-` doc covers per-OU consolidation concepts + points to it (mirrors `02-ous-architecture.md:104` "does not duplicate that callout" pattern).
- **OU-02 bundle guardrails (D-02):** Manage MDM Servers DENY-by-default (OP-1); Account Holder transfer privilege never present (OP-2); every Edit permission ships with its companion View per the Edit-without-View table (OP-3); cite `01-role-permission-model.md` as SOT; stay within 4-6 permissions.
- **OU-01 matrix (D-03):** 3 topology columns (OUs-only / custom-roles-only / combined); "most-permissive wins across overlapping assignments" callout adjacent; cross-link back to `02-ous-architecture.md:54-59`.
- **OU-07/08 depth (D-04):** Find My disable (OP-12) is a fully-documented mandatory pre-deployment step — NOT hedged; OP-15 CRD heuristic shipped, per-OU CRD deep-dive deferred to v1.7+ with a tracking note in `v1.6-DEFERRED-CLEANUP.md`.
- **OU-09 (capability matrix):** 3 rows under existing Enrollment H2 — Apple TV management / Shared iPad sessions / Apple Business delegation surface; capture pre-edit anchor inventory artifact first.
- **D-05 stale-ref fix:** anchor-inventory `02-ous-architecture.md` before editing line 102; reconcile `05-vpp-catalog-consolidation` → `11-vpp-catalog-runbook.md` (Phase 64) and/or `07-vpp-content-token-consolidation.md` (Phase 63).

</specifics>

<deferred>
## Deferred Ideas

- **Per-OU Conference Room Display partitioning deep-dive** — LOW-severity OP-15; Phase 63 ships only the shared-physical-space heuristic. Full per-OU CRD delegation specifics → v1.7+ (log to `v1.6-DEFERRED-CLEANUP.md`).
- **Sub-OU nesting at depth > 2** — unverified by Apple's GA docs; authored only after Phase 63 portal verification confirms a bound. Until then, depth ≤ 2 only (D-06).
- **Cross-OU audit visibility 3×3 matrix** — Phase 64 `17-audit-log-scoping-runbook.md` deliverable (not Phase 63).
- **OP-8 federated-admin offboarding auto-revoke vs stuck-state determination** — the offboarding section in `05-sub-org-admin-onboarding.md` documents the paired offboarding; definitive auto-revoke behavior may need portal verification alongside the sub-OU check.

### Reviewed Todos (not folded)
None — no `.planning/todos/` entries matched Phase 63 scope during cross-reference.

</deferred>

---

*Phase: 63-multi-ou-architecture-apple-admin-setup*
*Context gathered: 2026-05-21*
