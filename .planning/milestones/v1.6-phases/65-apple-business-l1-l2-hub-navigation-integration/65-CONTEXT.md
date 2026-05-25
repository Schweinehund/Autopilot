# Phase 65: Apple Business L1/L2 + Hub Navigation Integration - Context

**Gathered:** 2026-05-22
**Status:** Ready for planning

<domain>
## Phase Boundary

The **navigation-last integration layer (Wave C)** of v1.6 Apple Business Delegated Governance — the final phase that surfaces the Phase 62-64 Apple Business governance corpus to the people who consume it, plus closes the C16 4-edge cross-link integrity triangle. Phase 65 ships two new tier runbooks + 5 append-only edits to existing hub files + the C16 triangle going live, all under the navigation-files-last invariant (v1.5 Phase 57+59 precedent):

- **ABNAV-01** `docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md` — first/only v1.6 L1 runbook (CI-5 L1 cap honored at #34); compound `platform: ios+macos+shared-ipad` frontmatter (D-A5 + Phase 62 `+` separator contract); includes the `#which-admin-owns-this-pool` lookup step (cross-link to Phase 63 `05-sub-org-admin-onboarding.md`); 3-path matrix with destructive paths gated by L2 approval (OP-11); L1 #00-index appended
- **ABNAV-02** `docs/l2-runbooks/26-apple-business-permission-denied.md` — first/only v1.6 L2 runbook (#26); 7-leaf Mermaid decision tree (DA-9 7 leaves LOCKED: role-lacks-permission / OU-boundary / Apple-Business-scope / Intune-scope / federation-state / quota-limit / Account-Holder-lockout); L2 #00-index appended
- **ABNAV-03** `docs/common-issues.md` — new `## Apple Business Governance Failure Scenarios` H2 (append-only)
- **ABNAV-04** `docs/quick-ref-l1.md` — new `## Apple Business Quick Reference` H2 (append-only)
- **ABNAV-05** `docs/quick-ref-l2.md` — new `## Apple Business Quick Reference` H2 (append-only)
- **ABNAV-06** `docs/operations/00-index.md` — Apple Business as 5th sub-section alongside Co-Management / Patch / App / Drift (append-only)
- **ABNAV-07** `docs/index.md` — Apple Business as 5th sub-section under `## Operations` H2 + Cross-Platform References entries + platform-coverage banner clause appendix at line 9 (surgical edits per D-A4)
- **C16 triangle close** — 4 edges go live (l1_34 ↔ admin_12 ↔ common_issues ↔ quick_ref_l1); 4 exemptions removed atomically; `12-shared-ipad-passcode-reset.md` gains the `34-apple-business` back-link in its existing `## Cross-References` tail (`12-:187-194`) — the ONE sanctioned exception to D-A8 outside the 5 hub files, locked by the Phase 62-08 removal contract
- **check-phase-65.mjs** ships in this phase (validator-as-deliverable precedent — chain continuation from 62/63/64)

**Out of scope (Phase 66 owns):** C11 keyword extension, C15 banned-phrase refinement, BASELINE_10 refresh, terminal re-audit from fresh worktree (D-22), `v1.6-MILESTONE-AUDIT.md`, CI workflow `.yml`, `check-phase-66.mjs`. **Out of scope (locked invariant):** Intune-side RBAC / profile authoring / compliance / enrollment profile assignment (REQUIREMENTS.md:89; D-A8); the Intune-scope leaf in L2 #26 routes OUT with a C15-safe scope-boundary callout. **Out of scope (v1.7+):** dedicated "Account Holder lockout recovery" runbook (Phase 65 routes the leaf to the existing OP-2 callout in `01-role-permission-model.md:39-58`).

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via batched `/adversarial-review` (Finder → Adversary → Referee, three independent Opus agents reading the shipped Phase 62/63/64 files + validators + research directly). Scores in parentheses (lower = better, Phase 63/64 convention). Recommendation set: **B / C / C / append-only / ship-in-65**, user-approved. This is Phase 64's "mandatory-envelope + flexible-body" applied to the navigation surface: the *literal SC/requirement wording* is satisfied by **presence + scoped routing**, not by reproduction or inlining — because the C15/C16 harness assertions and the link-not-copy precedents (62 D-04, 64 D-02) penalize copying. Scope-boundary respect dominates.

### D-01: L1 #34 3-path matrix treatment — L1-scoped Path A in full + escalate B/C with cross-link (Option B; score B=2 / C=6 / A=8)

**Decision:** L1 #34 documents **Path A (Apple Business UI) in full as the L1-executable procedure**; Paths B/C appear as **escalate-to-L2 pointers** that cross-link to canonical `12-shared-ipad-passcode-reset.md` for the full matrix. The matrix is *present* (Path A executable, Paths B/C as gated escalation rows), satisfying SC#1's "3-path decision matrix with destructive paths gated by L2 approval" via presence + gating, not reproduction.

**Rationale:**
- **REQUIREMENTS.md:93 is a hard scope boundary, not a gray area:** "L1 #34 documents Path A (Apple Business UI) primary; Paths B/C documented in L2 #26 with hard L2-approval gate per OP-11 prevention." This forbids Option A (full reproduction) at the requirement level.
- **L1 read-only convention** (`docs/l1-runbooks/30-linux-enrollment-failed.md:21`): "L1 Triage Steps in this runbook are read-only checks. State-changing commands ... appear ONLY in the per-cause `### Admin Action Required` sections — they are not L1 actions." Path C (`EraseDevice`) is destructive and L2-with-approval (`12-:129-156`, OP-11); reproducing it into L1 #34 directly violates the convention.
- **Option A would import a C15 banned-phrase landmine:** `12-:116-117` carries an ABAUDIT-07-exempted "requires Intune RBAC for non-Shared-iPad devices" line (line-pair-scoped C15 exemption per `v1.6-milestone-audit.mjs:860-861`). Reproducing Path B's body into L1 #34 would require a duplicate ABAUDIT exemption for zero benefit — a new C15 landmine.
- **C16 forces the cross-link anyway** (`v1.6-milestone-audit.mjs:778` edgeMap `l1_34 → admin_12 anchor '12-shared-ipad-passcode-reset'`; line 798 `content.includes()` substring check). Option B's cross-link discharges the C16 edge as a natural byproduct.

**Considered & rejected:**
- (A) Full reproduction of all 3 paths (score 8) — violates REQUIREMENTS:93 + L1 read-only convention; reproduces destructive L2-approval-gated Path C into L1; imports C15 banned-phrase surface requiring duplicate ABAUDIT exemption.
- (C) Thin link only (score 6) — under-satisfies ABNAV-01's literal "3-path decision matrix" wording; a reader of L1 #34 cannot see the matrix at all, failing "L1 staff can use" usability. Mirrors 64 D-02's rejection of "bare pointer links under-satisfies 'carries an explicit [matrix]'."

### D-02: L2 #26 7-leaf tree leaf behavior — Hybrid (Option C; score C=2 / A=6 / B=7)

**Decision:** The 7 leaves (LOCKED by DA-9) get **per-leaf-appropriate behavior**:
- **Apple-Business-scoped leaves** (role-lacks-permission / OU-boundary / Apple-Business-scope / federation-state / quota-limit) → route via Mermaid `click` to the relevant existing doc (`01-role-permission-model.md` for role/permission + Account-Holder context; `02-ous-architecture.md` / `05-sub-org-admin-onboarding.md#which-admin-owns-this-pool` for OU-boundary; `16-managed-apple-account-runbook.md` for federation; `08-managed-apple-account-provisioning.md` for quota)
- **Intune-scope leaf** → routes OUT to Intune-side docs with a **C15-safe scope-boundary callout** (Intune RBAC is OUT OF SCOPE per REQUIREMENTS:89 + D-A8); MUST carry an `<!-- ABAUDIT-NN -->` line-pair exemption if the callout naming "Intune RBAC" / "Intune-side" trips C15 regexes (`v1.6-milestone-audit.mjs:847-856` regex 1: `/\bIntune\s+(RBAC|role...)/i`, regex 4: `/\bIntune[-\s]side\b.{0,40}\b(delegat|RBAC...)/i`)
- **Account-Holder-lockout leaf** → routes to the OP-2 "Account Holder — DO NOT DELEGATE / lockout recovery" callout at `01-role-permission-model.md:39-58` (a valid in-corpus route target; NOT inlined)

**Rationale:**
- **Corpus precedent is hybrid, not uniform.** `docs/decision-trees/07-ios-triage.md` shows BOTH route-via-`click` leaves (IOSR1-6, `:47-52`) AND inline-terminating escalation leaves (IOSE1-3, `:41-45`: "Escalate L2: Collect serial, UPN, screenshot"). The shipped house pattern IS hybrid.
- **The Intune-scope leaf cannot inline Intune remediation.** REQUIREMENTS:89 lists Intune-side RBAC as out of scope; D-A8 forbids modifying Intune content; C15 regexes at `v1.6-milestone-audit.mjs:847-856` actively forbid inline Intune-delegation prose. Pure-A (all-inline) would breach all three.
- **Pure-A also duplicates SOT.** Inlining role/permission remediation duplicates `01-role-permission-model.md`'s 7-subgroup catalog — D-04 anti-redundancy violation (`62-CONTEXT.md` D-04; `64-CONTEXT.md:43,45`).
- **Pure-B was rejected on independent grounds.** (Adversary correctly noted the Account-Holder-lockout leaf IS routable to `01-:39-58`, so it does NOT force inline — but pure-B still fails on the Intune-scope leaf, which cannot route to an *in-corpus* doc since Intune RBAC docs are out of scope. Pure-B remains unsatisfiable for ≥1 locked leaf.)

**Considered & rejected:**
- (A) All 7 leaves terminate inline (score 6) — Intune-scope leaf would inline Intune remediation → REQUIREMENTS:89 / D-A8 / C15 breach; duplicates `01-` SOT for Apple-Business leaves (D-04).
- (B) All 7 leaves route to existing doc (score 7) — Intune-scope leaf cannot route to an in-corpus Intune RBAC doc (out of scope by invariant); unsatisfiable.

### D-03: Hub append content depth — Asymmetric per file voice (Option C; score C=2 / A=5 / B=7)

**Decision:** Match each hub file's established voice; do NOT impose uniform depth:
- **`common-issues.md` `## Apple Business Governance Failure Scenarios`** → symptom→runbook routing table only (matches existing `:33-58` pure routing voice)
- **`quick-ref-l1.md` `## Apple Business Quick Reference`** → L1 passcode-reset quick-steps + escalation triggers (matches existing `:14-33` "Top 5 Checks" + escalation-triggers voice)
- **`quick-ref-l2.md` `## Apple Business Quick Reference`** → L2 permission-denied quick-triage with command/log references (matches existing `:14-61` command/event-ID depth)

**Rationale:**
- **Distinct established voices verified file-by-file** — `common-issues.md:33-58` is pure symptom→`L1:`/`L2:` routing rows; `quick-ref-l1.md:14-33` is task-checks + escalation; `quick-ref-l2.md:14-61` is log-collection commands / PowerShell / registry / event-IDs. Uniform-A under-serves quick-refs; uniform-B breaks common-issues' routing voice and duplicates runbook bodies (D-04).
- **C16 imposes ZERO uniformity cost.** Validator only checks per-file substring presence (`v1.6-milestone-audit.mjs:798` `content.includes(outbound.anchor) || content.includes(outbound.file)`). Asymmetry is validator-neutral.
- **C16 forces specific content placements regardless** — edgeMap line 780 requires `common_issues → '#apple-business-quick-reference'` substring; line 781 requires `quick_ref_l1 → '34-apple-business'` substring. C's design naturally carries these. **The slug `apple-business-quick-reference` is load-bearing — the H2 title "Apple Business Quick Reference" must slugify exactly to that.**

**Considered & rejected:**
- (A) Terse pointer rows everywhere (score 5) — under-delivers ABNAV-04/05 against the established quick-ref bar; mismatches two of three files' voices.
- (B) Richer quick-steps everywhere (score 7) — breaks common-issues.md's pure-routing voice; duplicates L1 #34 / L2 #26 procedure content (D-04); enlarges C15 banned-phrase surface across three files instead of containing it.

### D-04a: `12-` back-link form — Append to existing `## Cross-References` tail, not surgical mid-doc (score append=2 / surgical=6)

**Decision:** Add the `34-apple-business-shared-ipad-passcode-reset.md` back-link as a **new bullet inside the existing `## Cross-References` H2** at `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md:187-194`. **NOT** a surgical mid-doc edit. This is the ONE sanctioned exception to D-A8's "existing docs ZERO modifications except sanctioned sites + 5 append-only hub edits" — locked by the Phase 62-08 removal contract (62-08-PLAN:464-465): the `12-` C16 exemption sunsets in Phase 65; the `34-` back-link is added in Phase 65's own atomic commit.

**Rationale:**
- **The `## Cross-References` tail (`:187-194`) already exists** with entries to 01/09/18; adding a 4th bullet shifts NO headings/anchors, matches the doc's own established cross-ref idiom, and preserves PITFALL-6 anchor stability for the rest of `12-` (including the ABAUDIT-06/07 line-pair exemptions at `:13,:116` whose *relative* position matters for C15 line-pair logic).
- **The edit IS sanctioned, not a D-A8 breach.** `v1.6-audit-allowlist.json:82` exempts `admin_12` with `sunset_phase: "64-65"`; the locked Phase 62-08 removal contract authorizes Phase 65 to (a) add the back-link AND (b) remove the exemption in the same atomic commit. The append-only FORM minimizes PITFALL-6 anchor-shift surface against a frozen Phase 64 doc.
- **C16 will FAIL without the back-link.** `v1.6-milestone-audit.mjs:779` C16 `edgeMap.admin_12 = {file: l1_34, anchor: '34-apple-business'}`, evaluated at line 798 as `content.includes()`. The substring `34-apple-business` must appear in `12-` once the exemption is removed.

**Considered & rejected:**
- Surgical mid-doc edit (score 6) — higher PITFALL-6 anchor-shift surface against a frozen Phase 62/64 doc with line-pair-scoped ABAUDIT exemptions; no functional advantage over appending to the existing `## Cross-References` block.

### D-04b: `check-phase-65.mjs` placement — Ships IN Phase 65 (score ship-in-65=2 / defer=7)

**Decision:** `check-phase-65.mjs` ships **in this phase** (Phase 65) as a validator-as-deliverable — chain continuation from 62/63/64. Phase 66 RUNS the validator at the terminal re-audit and authors the CI workflow `.yml`; it does NOT author `check-phase-65.mjs`. ROADMAP:230 / 236 are reconciled as "the validator chain LINEAGE extends through 66; Phase 66 authors only `check-phase-66.mjs` + CI."

**Rationale:**
- **Validator-as-deliverable is per-phase and authored in-phase** — proven by the existing chain: `check-phase-62.mjs`, `check-phase-63.mjs`, `check-phase-64.mjs` all exist and shipped in their own phases. `STATE.md:103` codifies the pattern.
- **D-22 auditor-independence (`STATE.md:113,126`) requires the Phase 66 terminal re-audit be "spawned distinct from content-phase author-agents."** If Phase 66 authored `check-phase-65.mjs`, the auditor would be grading content against assertions it wrote — defeating independence. The validator MUST be authored by the content phase (65) and merely EXECUTED by the independent Phase 66 auditor.
- **`check-phase-65.mjs` scope:** Phase-65-specific structural assertions only — L1 #34 exists with compound `platform: ios+macos+shared-ipad` frontmatter (D-A5 + Phase 62 `+` separator); L2 #26 7-leaf Mermaid tree; 5 hub appends present; 4 C16 exemptions removed; the V-64-05 reconciliation landed (see action item below). Do NOT duplicate C16 logic — that lives in the harness invoked via the V-64-AUDIT subprocess pattern (`check-phase-64.mjs:316-331`).

**Considered & rejected:**
- Defer authoring to Phase 66 (score 7) — breaks the per-phase validator-as-deliverable pattern; violates D-22 auditor-independence; leaves Phase 65 with no in-phase close-gate verification (contra "Verification-during-execution" precedent, STATE.md:104).

### Claude's Discretion (planner/researcher decides)

- **Exact wording of the L2-scope-boundary callout** for the Intune-scope leaf in L2 #26 — must dodge or ABAUDIT-exempt C15 regexes 1 & 4 (`v1.6-milestone-audit.mjs:847,853`); follow the line-pair-scoped exemption discipline from `12-:116` / `06-:12`.
- **7-leaf Mermaid tree structure** — node ordering, branch decision text, `click` directive syntax (consistent with `07-ios-triage.md:47-52`). Tree shape is open; the 7 LEAF identities are LOCKED (DA-9).
- **L1 #34 "Before escalating, collect:" pattern** for the Paths B/C escalation pointers — mirror `30-linux-enrollment-failed.md:188-198` style so L1 hands off cleanly to L2 #26.
- **Hub-file append positions** — between last content H2 and `## Version History` (PITFALL-6 pre-edit anchor inventory MANDATORY before any of the 5 hub-file edits + `12-`).
- **`check-phase-65.mjs` test ID numbering** continues from `V-64-NN`; Path-A copy from `check-phase-64.mjs`.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor) MUST read these before planning or implementing.**

### Project planning (LOCKED)
- `.planning/PROJECT.md` — v1.6 milestone overview; Apple Business surface scope boundary (Intune-side RBAC OUT OF SCOPE)
- `.planning/REQUIREMENTS.md` — Phase 65 reqs **ABNAV-01 through ABNAV-07** (Pillar 4); REQUIREMENTS.md:89 (Intune-side out of scope invariant); REQUIREMENTS.md:93 (L1 #34 Path A primary; Paths B/C in L2 #26 — locked at requirement level)
- `.planning/ROADMAP.md` §216-226 — Phase 65 Goal + SC#1-5 + Wave-C navigation-last (close-gate before Phase 66 terminal re-audit)
- `.planning/ROADMAP.md` §228-236 — Phase 66 Goal + SC (Phase 66 RUNS chain validators, does NOT author check-phase-65.mjs; D-22 auditor-independence)
- `.planning/STATE.md` — D-A1..D-A10 (esp. D-A4 hub as 5th sub-section, D-A5 L1 #34 / L2 #26 + compound platform, D-A6 quick-ref H2 append, D-A8 existing docs zero modifications except sanctioned sites + 5 append-only hub edits, D-A10 navigation-last); PITFALL-6 anchor-stability invariant; D-22 auditor-independence; validator-as-deliverable pattern (STATE.md:103)

### Phase 62/63/64 decision precedents (read before authoring)
- `.planning/phases/62-apple-business-foundation-rebrand/62-CONTEXT.md` — **D-01 file-anchor>section-anchor**, **D-04 anti-redundancy/link-not-copy** — both precedents drive D-01/D-02/D-03 here
- `.planning/phases/63-multi-ou-architecture-apple-admin-setup/63-CONTEXT.md` — Phase 63 D-01..D-06; **CI-5 = L1-runbook cap (Phase 65 honors at #34)**; "literal-requirement Option A wins" precedent (the inverse of Phase 65's "presence + scoped routing wins")
- `.planning/phases/64-apple-business-delegation-runbooks/64-CONTEXT.md` — Phase 64 D-01 enforced-envelope (template for L1 #34 / L2 #26 envelopes), **D-02 self-sufficient-callout + forward-link** (template for the Intune-scope leaf treatment), D-04 destructive-gating
- `.planning/phases/62-apple-business-foundation-rebrand/62-08-PLAN.md` §457,464-465 — **locked C16 removal contract** (12- exemption sunsets Phase 65, back-link added in Phase 65's own atomic commit; the 4 endpoint exemptions sunset together)

### v1.6 research
- `.planning/research/PITFALLS.md` §DA-9 — **7 leaves locked for L2 #26** (role-lacks-permission / OU-boundary / Apple-Business-scope / Intune-scope / federation-state / quota-limit / Account-Holder-lockout); OP-2 (Account Holder DO-NOT-delegate); OP-11 (EraseDevice LAST + hard L2-approval gate)
- `.planning/research/FEATURES.md` — workflow landscape for hub routing tables
- `.planning/research/ARCHITECTURE.md` — D-A decisions

### Phase 62/63/64 deliverables — SOURCE OF TRUTH + house-style analogs (read before authoring)
- `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md` — **canonical admin-context doc L1 #34 cross-links to**; `## Cross-References` tail at `:187-194` (D-04a back-link append target); 3-path matrix (`:31-156` Path A L1-delegated / Path B L2-only with ABAUDIT-07 line-pair exemption at `:116` / Path C L2-with-approval at `:129-156`); Required Role & Permission block (`:40-65`); Verification section (`:168-198`)
- `docs/cross-platform/apple-business/01-role-permission-model.md` — **OP-2 Account-Holder-lockout route target for L2 #26 lockout leaf** (`:39-58`); 7-subgroup permission catalog (route target for role-lacks-permission leaf); Edit-without-View
- `docs/cross-platform/apple-business/05-sub-org-admin-onboarding.md` — **`#which-admin-owns-this-pool` anchor L1 #34 MUST cross-link** (ABNAV-01 + Phase 63 Wave-B gate); also OU-boundary leaf route target for L2 #26
- `docs/cross-platform/apple-business/02-ous-architecture.md` — OU-boundary leaf route target for L2 #26
- `docs/cross-platform/apple-business/16-managed-apple-account-runbook.md` — federation-state leaf route target (Phase 64 deliverable)
- `docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md` — quota-limit leaf route target (Phase 63 deliverable)

### L1/L2 runbook envelopes + decision-tree precedent
- `docs/l1-runbooks/30-linux-enrollment-failed.md` — **L1 envelope + L1 read-only convention at `:21`** (state-changing commands only in `### Admin Action Required`); "Before escalating, collect:" pattern at `:188-198` for L1 #34's Path B/C escalation pointers
- `docs/l1-runbooks/00-index.md` — index append pattern; confirms #34 is next free number
- `docs/l2-runbooks/00-index.md` — index append pattern; confirms #26 is next free number
- `docs/decision-trees/07-ios-triage.md` — **hybrid leaf precedent for L2 #26** (`:47-52` route-via-`click` leaves + `:41-45` inline-terminating escalation leaves)

### Hub files (append targets — pre-edit anchor inventory MANDATORY)
- `docs/common-issues.md:33-58` — existing symptom→L1/L2 routing voice (ABNAV-03 append target)
- `docs/quick-ref-l1.md:14-33` — existing "Top 5 Checks" + escalation-triggers voice (ABNAV-04 append target); **C16 anchor `#apple-business-quick-reference` MUST slugify exactly**
- `docs/quick-ref-l2.md:14-61` — existing command/event-ID depth (ABNAV-05 append target)
- `docs/operations/00-index.md` — 4 existing sub-sections; Apple Business as 5th (ABNAV-06)
- `docs/index.md` — `## Operations` H2 at `:233`; platform-coverage banner at `:9` (ABNAV-07 surgical edits per D-A4)

### Audit harness (active gates — content must pass + reconciliation required)
- `scripts/validation/v1.6-milestone-audit.mjs` — **C16 edgeMap at `:777-803`** (admin_12 `:779`, l1_34, common_issues, quick_ref_l1; substring check at `:798`); **C15 banned-phrase regexes at `:847-856`** (regex 1: `/\bIntune\s+(RBAC|role...)/i`, regex 4: `/\bIntune[-\s]side\b.{0,40}\b(delegat|RBAC...)/i`); **ABAUDIT line-pair exemption at `:860-861`** (exempts line `i` + `i+1` ONLY — budget one comment per banned line)
- `scripts/validation/v1.6-audit-allowlist.json:82` — `admin_12` exemption `sunset_phase: "64-65"` (Phase 65 removes); 3 more `"65"`-sunset exemptions to remove atomically (l1_34, common_issues#..., quick_ref_l1#...)
- `scripts/validation/check-phase-64.mjs:135-145` — **V-64-05 NEGATIVE assertion: `12-` must NOT contain `34-apple-business`** (true at Phase 64 close; Phase 65 MUST reconcile — see Action Item below)
- `scripts/validation/check-phase-62.mjs`, `scripts/validation/check-phase-63.mjs`, `scripts/validation/check-phase-64.mjs` — **Path-A template for `check-phase-65.mjs`** (validator-as-deliverable chain continuation); V-NN-AUDIT subprocess pattern at `check-phase-64.mjs:316-331` (do not duplicate C16 logic in check-phase-65)

### Apple-side primary sources (verify against; 60-day last_verified rule applies)
- `https://support.apple.com/guide/apple-business-manager/` — Shared iPad passcode + permission errors for L1 #34 / L2 #26

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`docs/l1-runbooks/30-linux-enrollment-failed.md` envelope** — direct template for L1 #34 (frontmatter + Platform-applicability + L1-scope read-only note at `:21`); `### Admin Action Required` per-cause pattern for the Path B/C escalation pointers; "Before escalating, collect:" pattern at `:188-198`
- **`docs/decision-trees/07-ios-triage.md`** — hybrid leaf precedent for L2 #26's 7-leaf tree (route-via-`click` AND inline escalation leaves coexist)
- **`docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md:187-194`** — existing `## Cross-References` tail; D-04a append target for the `34-apple-business` back-link
- **`docs/cross-platform/apple-business/01-role-permission-model.md:39-58`** — OP-2 Account-Holder DO-NOT-delegate callout; L2 #26 lockout-leaf route target
- **`scripts/validation/check-phase-64.mjs`** — Path-A copy source for `check-phase-65.mjs`; V-NN-AUDIT subprocess pattern (`:316-331`)
- **`docs/l1-runbooks/00-index.md` + `docs/l2-runbooks/00-index.md`** — append patterns confirmed; #34 / #26 are next free numbers

### Established Patterns
- **L1 read-only convention** — L1 docs do read-only triage; state-changing only in `### Admin Action Required` sub-sections (`30-:21`). Destructive Path C (EraseDevice) is L2-only per OP-11; L1 #34 must NOT inline it.
- **Anti-redundancy / link-not-copy (Phase 62 D-04, Phase 64 D-02)** — drives D-01 (L1-scoped, cross-link to 12-), D-02 (route leaves to existing docs, don't inline), D-03 (asymmetric — link to runbooks, don't reproduce procedures).
- **C15 line-pair-scoped ABAUDIT exemption** (`v1.6-milestone-audit.mjs:860-861`) — comment exempts ONLY line `i` + `i+1`; budget one `<!-- ABAUDIT-NN -->` per banned line. The Intune-scope leaf in L2 #26 is the highest-risk surface (regexes 1 & 4 at `:847,:853`).
- **C16 substring-presence checks** (`v1.6-milestone-audit.mjs:798` `content.includes()`) — exact substrings `34-apple-business` (in 12- + quick-ref-l1), `12-shared-ipad-passcode-reset` (in #34), `#apple-business-quick-reference` (the slug — H2 title MUST slugify to exactly that) are LOAD-BEARING. Silent edge break if reworded.
- **Compound `platform:` frontmatter via `+` separator** (Phase 62 contract; D-A5) — L1 #34 = `ios+macos+shared-ipad`. No spaces around `+`.
- **PITFALL-6 pre-edit anchor inventory MANDATORY** before editing `12-` and each of the 5 hub files (`common-issues.md` / `quick-ref-l1.md` / `quick-ref-l2.md` / `operations/00-index.md` / `docs/index.md`).
- **60-day `last_verified` rule** applies to all new Apple Business docs (L1 #34, L2 #26).
- **Validator-as-deliverable** — each phase authors its own `check-phase-NN.mjs`; Phase 66 RUNS the chain, does not AUTHOR.

### Integration Points
- **Phase 64 → Phase 65 (Wave C):** `12-shared-ipad-passcode-reset.md` is the canonical C16 admin-context doc L1 #34 cross-links to; the C16 `admin_12 ↔ l1_34` edge goes live in Phase 65.
- **Phase 63 → Phase 65:** `05-sub-org-admin-onboarding.md#which-admin-owns-this-pool` anchor is the ABNAV-01 + L2 #26 OU-boundary-leaf cross-link target (Phase 63 Wave-B gate honored).
- **Phase 65 → Phase 66:** `check-phase-65.mjs` joins the validator chain; Phase 66 terminal re-audit from a fresh worktree runs all 5 chain validators (`ROADMAP.md:236`).

### 🚨 V-64-05 ↔ C16 ATOMIC RECONCILIATION (load-bearing — planner MUST handle)
`check-phase-64.mjs:135-145` V-64-05 asserts `12-` MUST NOT contain `34-apple-business`. `v1.6-milestone-audit.mjs:779` C16 `admin_12` edge requires `12-` MUST CONTAIN `34-apple-business` once the exemption sunsets. **In the SAME atomic commit, Phase 65 MUST:**
1. Add the `34-apple-business` back-link to `12-`'s `## Cross-References` tail (`:187-194`).
2. Remove the `admin_12` entry from `v1.6-audit-allowlist.json` `c16_missing_endpoint_exemptions` (the one with `sunset_phase: "64-65"` at `:82`); also remove the 3 other `"65"`-sunset exemptions atomically (l1_34, common_issues#..., quick_ref_l1#...) — leaving any exemption masks the edge via EXEMPTED at `v1.6-milestone-audit.mjs:787-790`.
3. **Flip/retire `check-phase-64.mjs:135-145` V-64-05** — convert the NEGATIVE assertion to a POSITIVE "MUST contain `34-apple-business`" assertion, or formally retire the test with a sunset note. Without this, ROADMAP:236 "all 5 chain validators PASS" is unsatisfiable.

These three sub-actions are an INDIVISIBLE UNIT. Any partial application leaves the validator chain red.

</code_context>

<specifics>
## Specific Ideas

- **L1 #34 marquee deliverable** — Path A as the L1-executable procedure (full step-by-step in the runbook); Paths B/C as gated escalation rows in the matrix with a `Before escalating to L2, collect:` checklist (mirror `30-:188-198`) and a cross-link to canonical `12-` for the full matrix.
- **L2 #26 7-leaf tree leaf destinations (proposed by review, planner refines exact `click` syntax):**
  - role-lacks-permission → `01-role-permission-model.md` (7-subgroup catalog)
  - OU-boundary → `02-ous-architecture.md` + `05-sub-org-admin-onboarding.md#which-admin-owns-this-pool`
  - Apple-Business-scope → `01-role-permission-model.md` Edit-without-View / `18-cross-org-boundary-cheat-sheet.md` (disambiguation table)
  - Intune-scope → C15-safe scope-boundary callout routing OUT to Intune docs (ABAUDIT-exempt as needed)
  - federation-state → `16-managed-apple-account-runbook.md` (60-day federation collision section)
  - quota-limit → `08-managed-apple-account-provisioning.md`
  - Account-Holder-lockout → `01-role-permission-model.md:39-58` OP-2 callout (NOT a new doc — Phase 65 not scoped to create one)
- **`12-` back-link content** — single bullet inside the existing `## Cross-References` H2: e.g., `- **L1 runbook:** [L1 #34 — Apple Business Shared iPad Passcode Reset](../../l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md) (Path A L1-delegated entry point)` — substring `34-apple-business` MUST appear.
- **Hub-file append positions** — between last content H2 and any tail `## Version History` H2 (pre-edit anchor inventory pins this for each file).
- **`check-phase-65.mjs` scope** — L1 #34 frontmatter (compound platform); L2 #26 7-leaf tree presence; 5 hub appends present; 4 C16 exemptions removed; V-64-05 reconciled. Do NOT duplicate C16 logic.

</specifics>

<deferred>
## Deferred Ideas

- **Dedicated "Account Holder lockout recovery" runbook** → v1.7+ (Phase 65 routes the lockout leaf to the existing OP-2 callout at `01-role-permission-model.md:39-58`; ABNAV-02 ships exactly L2 #26, no companion).
- **C11 keyword extension + C15 banned-phrase refinement** → Phase 66 (validation-tooling closure phase).
- **BASELINE_10 refresh closing BASELINE_9 carry-over** → Phase 66 (AUDIT-14).
- **Terminal re-audit from fresh worktree (D-22 auditor-independence)** + **`v1.6-MILESTONE-AUDIT.md`** + **CI workflow `.yml`** + **`check-phase-66.mjs`** → Phase 66 (AUDIT-15; Phase 66 runs the chain, authors its own validator + CI).
- **Per-OU CRD partitioning deep-dive + sub-OU nesting at depth > 2** → v1.7+ (carried from Phase 63 D-04/D-06 + Phase 64 deferred ideas).
- **Inter-tenant patterns (multiple separate Apple Business accounts)** → out of v1.6 scope per PROJECT.md.

None of the above is scope creep into Phase 65 — they are downstream-phase deliverables or v1.7+ items, recorded so the planner does not pull them forward.

</deferred>

---

*Phase: 65-apple-business-l1-l2-hub-navigation-integration*
*Context gathered: 2026-05-22*
