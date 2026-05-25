# Phase 64: Apple Business Delegation Runbooks - Context

**Gathered:** 2026-05-22
**Status:** Ready for planning

<domain>
## Phase Boundary

The **operational runbook layer** of v1.6 Apple Business Delegated Governance — 8 admin-context "how-to" docs (`11-` … `18-`) for the Apple-Business-owned delegated actions, sitting on top of Phase 62's foundation and Phase 63's architecture + admin-setup docs. Phase 64 delivers, file-disjoint after Phase 63's `05-...#which-admin-owns-this-pool` + `09-shared-ipad-lifecycle.md` + `10-apple-tv-lifecycle.md` anchors land (Wave B):

- **DELEG-01** `11-vpp-catalog-runbook.md` — VPP catalog claim + transfer + buy + payment-scoping; owns the operational **OP-9 untouched-OU hard-bordered callout** + post-migration license-count verification within 0.1%
- **DELEG-02** `12-shared-ipad-passcode-reset.md` — **canonical admin-context doc** (C16 gate target Phase 65 L1 #34 cross-links to); 3-path decision matrix: Path A = Apple Business UI / L1-delegated / ordered FIRST, Path B = MDM ClearPasscode / L2-only, Path C = MDM EraseDevice / L2-with-approval (OP-11)
- **DELEG-03** `13-device-release-runbook.md` — "release ≠ removal" soft-delete semantics + 30-day provisional-period callout (OP-6)
- **DELEG-04** `14-device-transfer-runbook.md` — cross-OU transfer with 4-cell impact matrix (VPP license / enrollment profile / Intune config profile / audit entry) + pre-transfer dependency checklist (OP-5)
- **DELEG-05** `15-mdm-server-reassign-runbook.md` — **SINGLE** runbook (CI-5/SC#3 anti-proliferation: exactly 1, not 2), OS-version eligibility matrix (iOS 26 / iPadOS 26 / macOS 26 / tvOS 26+ → in-place migration; legacy → factory erase), 2 sub-H2s consolidating FEATURES Workflow 5.3 split
- **DELEG-06** `16-managed-apple-account-runbook.md` — manual + SCIM + OIDC+JIT provisioning, 60-day federation collision resolution sub-section (OP-7), SCIM token renewal cadence
- **DELEG-07** `17-audit-log-scoping-runbook.md` — author-scope vs target-scope semantics (OP-14), SIEM export pattern (OP-13), "no public REST API" anti-feature documentation
- **DELEG-08** `18-cross-org-boundary-cheat-sheet.md` — Apple-Business-vs-Intune-vs-integration disambiguation table; harbors C15 anti-pattern allowlist exemptions in HTML comments

**Out of scope (Intune surface — MDM concern):** Intune-side RBAC / profile authoring / compliance / enrollment-profile assignment. Each delegation runbook carries an explicit Apple-Business-vs-Intune scope-boundary callout. **Out of scope (Phase 65 owns):** L1 #34 + L2 #26 + hub-navigation integration (common-issues / quick-ref / operations index / docs/index.md) — NAVIGATION-LAST. **Out of scope (v1.7+):** per-OU CRD partitioning deep-dive; sub-OU nesting at depth > 2.

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via batched `/adversarial-review` (Finder → Adversary → Referee, three independent Opus agents reading the shipped Phase 62/63 files + research + validators directly). Scores in parentheses (lower = better, Phase 63 `A=2/B=8` convention). Recommendation set: **C / C / C / Refined-C**, user-approved. This is the inverse of Phase 63's A/A/A/B — Phase 63's gray areas were about *where content lives* (literal-requirement Option A won); Phase 64's are about keeping 8 heterogeneous runbooks *consistent* (mandatory-envelope + right-sized hybrids win).

### D-01: Runbook template uniformity — enforced envelope + flexible body (Option C; score A=5 / B=9 / C=2)

**Decision:** All 8 runbooks (`11-`…`18-`) share a **mandatory ENVELOPE** that `check-phase-64.mjs` enforces, with the **BODY flexible** per action:
- **Envelope (enforced):** 5-field frontmatter (`last_verified` / `review_by` / `applies_to` / `audience` / `platform`) + `> **Platform applicability:**` scope blockquote + `> **Training-data notice:**` block + a `## Verification` section + the Apple-Business-vs-Intune scope-boundary callout (D-02) + a `## Required Role & Permission` block (D-03).
- **Body (flexible):** shaped by each requirement — `11-` license-verify steps, `12-` 3-path decision matrix, `15-` OS-eligibility matrix, `17-` author/target-scope model, `18-` disambiguation table.

**Rationale:** This is *already* the shipped house style — verified in `06-mdm-server-assignment.md:1-14` and `08-managed-apple-account-provisioning.md:1-14` (identical headers, divergent bodies). Pure-A (single fixed skeleton) would force a "Rollback" H2 onto `17-` which has none (D-04-class poor-fit smell). Pure-B is validator-hostile and defeats Wave-B parallel-authoring consistency. The envelope is greppable by the validator (proven by `check-phase-63.mjs` V-63-06 section-slice + V-63-03 exact-string assertions); semantic bodies are not.

**Considered & rejected:** (A) single fixed skeleton — misfits the bespoke bodies the reqs LOCK; (B) per-action bespoke, no skeleton — validator-hostile, no structural regularity, orphans the envelope C15/C16 depend on.

### D-02: Scope-boundary callout source-of-truth — self-sufficient one-liner + forward link (Option C; score A=6 / B=8 / C=2)

**Decision:** Each delegation runbook carries a **self-sufficient one-line Apple-Business-vs-Intune scope-boundary callout** (states the boundary so the runbook stands alone) **+ a forward link to `18-cross-org-boundary-cheat-sheet.md`**. `18-` remains the canonical **disambiguation-TABLE SOT** (DELEG-08) without being copied into runbooks.

**Rationale:** ROADMAP SC#5 requires *every delegation runbook carries an explicit Apple-Business-vs-Intune scope-boundary callout* — Option A's bare pointer-to-`18-` under-satisfies "carries an explicit callout" (a reader of `13-` would have to leave the doc to learn the boundary). Option B (full self-contained prose ×8) is the **D-04 anti-redundancy violation** (8 copies drift apart + multiply the C15 banned-phrase regex surface 8×). C matches the live precedent verbatim: `07-vpp-content-token-consolidation.md:128-132` carries a self-sufficient "Untouched-OU trap summary" blockquote that states the hazard inline AND forward-points to `11-`.

**Considered & rejected:** (A) `18-` SOT + bare pointer links — under-satisfies SC#5 "carries an explicit callout"; (B) full self-contained prose per runbook — D-04 redundancy + 8× C15 regex landmine surface.

### D-03: Required-permission precondition block — standardized block, conditional bundle ref (Option C; score A=6 / B=7 / C=2)

**Decision:** Each runbook opens with a standardized **`## Required Role & Permission`** block citing `01-role-permission-model.md` (SOT) + the OU-scope, **always**; cite the Phase 63 `04-custom-role-authoring.md` Sub-Org Admin bundle **only where the action's permission maps to that bundle** (as `06-` does for `Assign devices to MDM server`).

**Rationale:** Differential citation is verified house style — `06-mdm-server-assignment.md:41,52,108` cites `04-` because the MDM-server permission is the bundle headline grant, while `08-managed-apple-account-provisioning.md` cites the People-subgroup permissions in `01-` directly and does NOT drag in `04-`. Option B (full block — permission + `04-` bundle + OU-scope + OP-1/2/3 in *every* runbook) forces a spurious `04-` cite into `13-/14-/17-` where the permission isn't in the bundle (D-02-class over-delivery). Option A (name-only) drops the OU-scope + OP-1 (DENY MDM-servers) / OP-2 (never Account-Holder) / OP-3 (Edit-needs-companion-View) point-of-use safety reminders `06-` deliberately surfaces inline.

**Considered & rejected:** (A) name permission only — drops OU-scope + OP-1/2/3 safety context; (B) full block everywhere — over-delivery + manufactured `04-` coupling + redundancy.

### D-04: Destructive-action gating — Refined-C: uniform HARD callout, path-specific gate clause (overturned both pure-A and pure-C)

**Decision:** A **uniform HARD-bordered callout on EVERY destructive path** — but the **"⛔ L2 approval required" gate clause appears ONLY on `12-` Path C (EraseDevice)**:
- `12-` Path C (EraseDevice) → hard callout **WITH** the L2-approval gate (OP-11 / SC#1); ordered LAST in the 3-path matrix.
- `13-` release → hard callout, body = OP-6 "release ≠ removal + 30-day provisional" warning — **NO** L2-approval gate.
- `14-` transfer → hard callout, body = OP-5 4-cell impact matrix + pre-transfer dependency checklist — **NO** L2-approval gate.

**Rationale:** Neither agent's literal option was correct. The Finder's pure-C ("lighter `> **Note:**` tier for reversible `13-/14-`") **under-warns**: OP-5 (transfer) and OP-6 (release) are **both HIGH severity** in PITFALLS with real data/license impact (OP-6 "release ≠ removal" soft-delete + >30-day serial re-appearance; OP-5 VPP licenses may STOP working on transfer). `09-shared-ipad-lifecycle.md:43-68` already escalates HIGH-severity risks (OP-12) to a hard "Critical … MANDATORY … blocking" callout **regardless of preventability** — so HIGH-severity destructive actions earn hard callouts. The Adversary's pure-A ("uniform *L2-approval-required* callout") **over-gates**: ROADMAP SC#1 attaches L2-approval to **exactly one path** (EraseDevice); DELEG-03/DELEG-04 + SC#2 impose **no** approval gate on release/transfer (their prevention strategies are impact matrices + pre-action checklists, not approval gates). **Principle: uniform callout *strength*, path-specific *gate text*. Do not conflate "destructive/HIGH-impact warning" with "L2-approval gate."**

**Considered & rejected:** (A) uniform "L2 approval required" callout across all — fabricates an approval gate on `13-/14-` not in the requirements; (B) per-runbook bespoke inline warnings — unmatchable by validator, OP-11 EraseDevice gate could silently weaken; (C as literally worded) lighter-Note tier for `13-/14-` — under-warns two HIGH-severity data-impact actions.

### Claude's Discretion

- The exact **hard-bordered callout convention** (the term is forward-referenced 5× in shipped docs — `02-:104`, `07-:121/124/131/144` — but NO real boxed callout exists yet; Phase 64 is the FIRST to realize it, in `11-` OP-9 and `12-` OP-11). Planner/researcher DEFINES the convention (e.g. blockquote with a bold `⛔`/`Critical` prefix line, or a `═`-rule) and `check-phase-64.mjs` asserts its exact string.
- Exact criteria rows for the `15-` OS-version eligibility matrix and the `14-` 4-cell impact matrix.
- Exact `## Required Role & Permission` block layout (table vs prose) — must respect OP-1/OP-2/OP-3.
- Sequential ABAUDIT comment numbering (continues from `ABAUDIT-04` shipped in `06-`).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor) MUST read these before planning or implementing.**

### Project planning (LOCKED)
- `.planning/PROJECT.md` — v1.6 milestone overview; Apple Business surface scope boundary (Intune-side RBAC OUT OF SCOPE); each runbook carries scope-boundary callout
- `.planning/REQUIREMENTS.md` — Phase 64 reqs **DELEG-01 through DELEG-08** (Pillar 3); note exact wording (Path A/B/C gating, "release ≠ removal", 4-cell matrix, single MDM-reassign runbook, manual+SCIM+OIDC+JIT)
- `.planning/ROADMAP.md` §198-209 — Phase 64 Goal + Success Criteria **SC#1-5** + **Wave B dependency** (Phase 64 opens after Phase 63 `05-...#which-admin-owns-this-pool` + `09-` + `10-` anchors land)
- `.planning/STATE.md` — D-A1..D-A10 architectural decisions; v1.6 phase dependency summary

### Phase 62 / 63 decision precedents (read before authoring)
- `.planning/phases/62-apple-business-foundation-rebrand/62-CONTEXT.md` — **D-01 (file-anchor > section-anchor)** + **D-04 (anti-redundancy / link-not-copy)** origin precedents that drive D-01/D-02/D-03 here
- `.planning/phases/63-multi-ou-architecture-apple-admin-setup/63-CONTEXT.md` — Phase 63 D-01..D-06; **CI-5 = L1-runbook cap ONLY (Phase 65), NOT a doc-count rule**; D-05 stale-ref repair pattern (analog for Phase 64 cross-cutting items)
- `.planning/phases/62-apple-business-foundation-rebrand/62-08-PLAN.md` §457,464-465 — **locked C16 removal contract** (the 4 endpoint exemptions, incl. `12-`, sunset in **Phase 65**, removed in Phase 65's own atomic commit); `+` compound-platform separator contract

### v1.6 research
- `.planning/research/PITFALLS.md` — **OP-5** (device transfer, HIGH — dependency checklist), **OP-6** (release ≠ removal, HIGH — 30-day soft-delete), **OP-7** (federation collision, 60-day), **OP-9** (untouched-OU hard-bordered callout, HIGH — owned by `11-`), **OP-11** (EraseDevice LAST + hard L2-approval gate; Path B "requires Intune RBAC"), **OP-13** (SIEM export), **OP-14** (audit author/target scope); **CI-5** = L1-runbook cap (Phase 65), NOT a Phase 64 doc-count rule
- `.planning/research/FEATURES.md` — workflow landscape incl. Workflow 5.3 MDM-reassign split that DELEG-05 consolidates into ONE runbook; anti-features ("no public REST API")
- `.planning/research/ARCHITECTURE.md` — D-A decisions (Mermaid precedent, D-A3 immutability)
- `.planning/research/STACK.md` — Apple-side surfaces (2026 terminology) + Intune-side verbatim labels (preserve, do not rename — C15 guard)
- `.planning/research/SUMMARY.md` — terminology canon (OU vs Locations, content tokens, Managed Apple Account)

### Phase 62/63 deliverables — SOURCE OF TRUTH + house-style analogs (read before authoring)
- `docs/cross-platform/apple-business/01-role-permission-model.md` — **7-subgroup permission catalog = SOT for D-03 Required-Permission blocks**; per-permission DENY-by-default flags (Manage MDM Servers ~line 276); Edit-without-View dependency table (~343-370); 5 preset custom roles
- `docs/cross-platform/apple-business/02-ous-architecture.md` — "most-permissive wins" precedent; **forward-refs the OP-9 hard-bordered callout at ~line 104** (one of the 2 inbound refs `11-` must satisfy)
- `docs/cross-platform/apple-business/06-mdm-server-assignment.md` — **closest envelope+flexible-body analog (D-01)**; `> **Platform applicability:**` (line 9) + `> **Training-data notice:**` + `<!-- ABAUDIT-04: ... C15 ... exemption -->` (line 12, the line-pair-scoped exemption convention) + differential `04-` bundle citation (D-03)
- `docs/cross-platform/apple-business/07-vpp-content-token-consolidation.md` — **D-02 self-sufficient-callout + forward-pointer precedent (lines 128-132)**; **forward-refs the OP-9 hard-bordered callout (~lines 117-144)** (2nd inbound ref `11-` must satisfy); `08-`'s admin-setup counterpart to `11-`
- `docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md` — admin-setup counterpart to `16-`; cross-links forward to `16-`; differential `04-` omission (D-03)
- `docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md` — **D-04 two-tier callout precedent**: hard "Critical (OP-12) … MANDATORY … blocking" callout (lines 43-68) vs lighter `> **Note:**` blockquotes (98/119/180/220); compound `platform: ios+shared-ipad` frontmatter (line 6)
- `docs/cross-platform/apple-business/10-apple-tv-lifecycle.md` — Wave-B cross-link target for Apple-TV-touching runbooks (`14-`)
- `docs/cross-platform/apple-business/05-sub-org-admin-onboarding.md` — `#which-admin-owns-this-pool` anchor (Phase 63 Wave-B gate; runbooks may cross-link)
- `docs/cross-platform/apple-business/00-overview.md` — style-guide HTML-comment convention (line ~75 "line(s)" wording is a doc-vs-code mismatch — see ABAUDIT note below); rebrand callout site #1

### Audit harness (active gates — content must pass)
- `scripts/validation/v1.6-milestone-audit.mjs` — **C15** (banned-phrase guard, regex ~719; ABAUDIT exemption ~733-739 is **line-pair-scoped: comment exempts only line i + i+1**); **C16** (cross-link triangle, edgeMap admin_12/l1_34 ~777-803 — `12-` exempted until Phase 65); auto-scopes to `11-`…`18-` the moment they land
- `scripts/validation/v1.6-audit-allowlist.json` — sidecar; `12-` exemption `sunset_phase: "64-65"` (~line 82); ABAUDIT exemptions
- `scripts/validation/check-phase-62.mjs` / `check-phase-63.mjs` — **Path-A template for `check-phase-64.mjs`** (validator-as-deliverable); V-63-03 exact-string + V-63-06 section-slice show what structural assertions are feasible

### Apple-side primary sources (verify against; 60-day last_verified rule applies)
- `https://support.apple.com/guide/apple-business-manager/` — VPP/content-token, device release/transfer, MDM server, federated auth (SCIM/OIDC+JIT) primary docs for DELEG-01..07
### Intune-side verbatim labels (preserve, do not rename — C15 guard active)
- `https://learn.microsoft.com/en-us/intune/app-management/deployment/manage-vpp-apple` — "Apple VPP tokens" label UNCHANGED in Intune

### Phase 65 cross-link target (forward reference — but NOT yet linked from `12-`)
- `docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md` (Phase 65) — C16 edge `admin_12 ↔ l1_34`; **per the locked removal contract, `12-` should NOT carry the `34-` back-link in Phase 64** (exemption sunsets Phase 65)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`06-mdm-server-assignment.md` envelope** — direct template for the D-01 enforced envelope (frontmatter + Platform-applicability + Training-data-notice blockquotes) and the D-03 differential `04-` citation pattern.
- **`07-vpp-content-token-consolidation.md:128-132`** — direct template for the D-02 self-sufficient-callout + forward-pointer pattern; also the admin-setup counterpart that `11-` completes (it forward-points to `11-`'s OP-9 callout).
- **`08-managed-apple-account-provisioning.md`** — admin-setup counterpart `16-` cross-links to; `09-`/`10-` lifecycle docs are Wave-B cross-link targets for `12-`/`14-`.
- **`09-shared-ipad-lifecycle.md:43-68`** — two-tier callout precedent (hard Critical vs light Note) that D-04 formalizes.
- **`check-phase-63.mjs`** — Path-A copy source for `check-phase-64.mjs`; extend with DELEG-01..08 deliverable assertions + envelope-presence greps + the OP-9/OP-11 hard-callout exact-string asserts.

### Established Patterns
- **File-per-deliverable + file-level anchors (Phase 62 D-01)** — 8 standalone runbooks `11-`…`18-`; stable cross-link targets.
- **Anti-redundancy / link-not-copy (Phase 62 D-04)** — drives D-02 (link to `18-`, don't copy) and D-03 (conditional `04-` ref).
- **C15 Intune-delegation banned-phrase guard** — active; `12-` Path B ("requires Intune RBAC") + `18-` disambiguation table are the highest-risk surfaces. **ABAUDIT exemption is line-pair-scoped — budget ONE `ABAUDIT-##` comment per banned line, not per block** (`18-` table = one per row).
- **CI-5 = L1-runbook cap (Phase 65)** — does NOT constrain Phase 64's 8 docs. Phase 64's only count invariant is SC#3 "exactly 1 MDM-reassign runbook."
- **Compound `platform:` frontmatter via `+` separator** — Phase 62 contract; `12-` = `ios+macos+shared-ipad`, `15-` spans tvOS (`ios+ipados+macos+tvos`). No spaces around `+`.
- **60-day `last_verified` rule** — applies to all new Apple Business docs.
- **PITFALL-6 pre-edit anchor inventory** — MANDATORY if any frozen Phase 62/63 file is touched.

### Integration Points
- **Phase 63 → Phase 64 (Wave B):** `09-`/`10-`/`05-...#which-admin-owns-this-pool` anchors must exist; `06-/07-/08-` admin-setup docs cross-link forward to runbooks `15-/11-/16-`.
- **Phase 64 → Phase 65:** `12-shared-ipad-passcode-reset.md` is the canonical C16 admin-context doc Phase 65 L1 #34 cross-links to (edge goes live when Phase 65 removes the `12-` exemption).
- **Phase 64 → Phase 66:** `check-phase-64.mjs` joins the validator chain verified at the terminal re-audit.

</code_context>

<specifics>
## Specific Ideas

- **Hard-bordered callout is FIRST realized here.** "Hard-bordered callout" is forward-referenced 5× in shipped docs but never realized — the corpus renders all callouts as plain markdown blockquotes with bold severity labels. `11-` (OP-9) and `12-` (OP-11) are the first real instances; the planner must DEFINE the convention and have `check-phase-64.mjs` assert its exact string.
- **`12-` Path ordering is locked:** Path A (Apple Business UI / L1-delegated) FIRST → Path B (MDM ClearPasscode / L2-only) → Path C (MDM EraseDevice / L2-with-approval) LAST (OP-11).
- **`15-` is exactly ONE runbook** consolidating FEATURES Workflow 5.3's split into 2 sub-H2s (SC#3 anti-proliferation).
- **`17-` documents an anti-feature:** "no public REST API" for audit-log access (OP-13/OP-14 author-scope vs target-scope semantics + SIEM export pattern).

</specifics>

<deferred>
## Deferred Ideas

- **Per-OU CRD partitioning deep-dive** + sub-OU nesting at depth > 2 → v1.7+ (carried from Phase 63 D-04/D-06).
- **L1 #34 + L2 #26 + hub-navigation integration** (common-issues / quick-ref-l1/l2 / operations index / docs/index.md) → **Phase 65** (NAVIGATION-LAST). The C16 `admin_12 ↔ l1_34` edge goes live there.

None of the above is scope creep into Phase 64 — they are downstream-phase deliverables, recorded so the planner does not pull them forward.

</deferred>

---

*Phase: 64-apple-business-delegation-runbooks*
*Context gathered: 2026-05-22*
