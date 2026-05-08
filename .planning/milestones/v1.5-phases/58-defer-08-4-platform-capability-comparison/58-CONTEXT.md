# Phase 58: DEFER-08 4-Platform Capability Comparison - Context

**Gathered:** 2026-04-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Build `docs/reference/4-platform-capability-comparison.md` — a single 5-platform reference doc (Win + macOS + iOS + Android + Linux) with 6 H2 sections (Enrollment, Configuration, App Deployment, Compliance, Software Updates, Conditional Access) where every non-empty cell is a hyperlink to the source per-platform matrix. Plus update the macOS / iOS / Android matrix intros to cross-reference the new doc, retrofit a `## Conditional Access` H2 into those 3 matrices to provide CA-row anchor targets, and remove the Android `<a id="deferred-4-platform-unified-capability-comparison">` footer body (preserving the anchor as a compat shim with forward-link). Phase 58 does NOT write to `docs/index.md` — that is Phase 59's responsibility.

The deliverable closes DEFER-08 / AECOMPARE-01 / CLEAN-05 and unblocks Phase 59 (hub integration) and Phase 60 (audit harness finalization with C12 promoted from informational → blocking).

</domain>

<decisions>
## Implementation Decisions

Locked via 4-gray-area adversarial review (Finder → Adversary → Referee, 2026-04-30). All disputes adjudicated; recommendations evidence-grounded against ROADMAP.md, REQUIREMENTS.md, C12 validator implementation, and prior-phase precedent.

### GA-1: Cell content shape + link granularity (winner: 1B + G2 + tier-2 CA retrofit)

- **D-01:** Each non-empty cell uses **verdict word + markdown link** shape (1B). Example: `Supported — [matrix](android-capability-matrix.md#enrollment)` / `Not supported — [matrix](linux-capability-matrix.md#configuration)` / `Mode-dependent — [matrix](ios-capability-matrix.md#app-deployment)`. No 1-line caveats inside cells (1C rejected — risks SC#2 / PITFALL-7 link-not-copy violation under human review). No emoji symbols (1D rejected — accessibility concern with screen readers; renderer inconsistency).
- **D-02:** **Verdict vocabulary lock** — exactly 5 states permitted: `Supported | Partial | Not supported | Mode-dependent | n/a`. Validator regex literal-pin recommended.
- **D-03:** Link granularity = **H2 section anchor** (G2). Example: `(android-capability-matrix.md#enrollment)`. NOT file-root only (G1 — defeats CLEAN-05 scan-value); NOT row-level anchor (G3 — PITFALL-15 GFM case-sensitivity hazard, requires manual `<a id>` injection in source matrices = scope creep); NOT mixed (G4 — inconsistency cost outweighs marginal granularity gain).
- **D-04:** **MANDATORY tier-2 Conditional Access H2 retrofit.** macOS, iOS, and Android capability matrices currently lack a `## Conditional Access` H2 (only Linux has it). Phase 58 retrofits this H2 into the 3 sibling matrices in the same atomic commit as the new comparison doc. Tier-1 (link CA cells to `#compliance` with verdict acknowledgment) was rejected — Compliance H2 in macOS/iOS contains zero CA-grant content; linking there is category-mismatch and creates the same misleading-by-construction defect that disqualified option 2B (best-mode verdict). Tier-2 satisfies SC#1 ("no column empty or unacknowledged") with real anchors. Plan-author scope: ~15-30 lines of CA content per matrix, parallel to Linux matrix `## Conditional Access` H2 structure (lines 59-66 of `linux-capability-matrix.md`).

### GA-2: Multi-mode platform handling (winner: 2A — "Mode-dependent — see matrix" + link, tiered)

- **D-05:** When all enrollment modes for a platform share a verdict, use the unanimous verdict (per D-01). When modes diverge (e.g., Android Silent App Install: Supported in COBO/COPE/Dedicated/ZTE; Not supported in BYOD/AOSP), use **`Mode-dependent — [matrix](path#anchor)`** with the link landing at the appropriate H2 in the source matrix (which contains the per-mode columns inline).
- **D-06:** Best-mode verdict (2B) and most-restricted-mode verdict (2C) both rejected — both misleading by construction (admin reading the comparison doc misjudges fleet capability). Stacked sub-rows (2D) rejected — GitHub markdown table cells don't reliably render newlines/`<br>`; pipe-table parsers strip multi-line cells.
- **D-07:** **Citation correction:** Inheritance for cross-platform routing pattern is **Phase 56 D-14**, NOT D-08. (Phase 56 D-08 is "DRIFT-07 fold H2 4-platform encryption coverage"; Phase 56 D-14 is the `> **Platform applicability:**` blockquote pattern adapted from Phase 53 D-08, Phase 54 D-04, Phase 55 D-13.) Plan-author and downstream agents must cite D-14 when documenting precedent inheritance for table-cell mode-routing.

### GA-3: Windows column source (winner: 4A — `linux-capability-matrix.md` Windows column, primary; footnote-link discretion to `apv1-vs-apv2.md` for ≤3 rare rows)

- **D-08:** All Windows cells link to `linux-capability-matrix.md#<h2>` as the canonical Windows source. The Windows column in `linux-capability-matrix.md` is the most authoritative Win-bilateral capability statement the doc-suite has, and it has all 6 H2s (including Conditional Access) parallel to the comparison doc structure.
- **D-09:** **Plan-author discretion (NOT default):** for the 1-3 rows where APv1 vs APv2 divergence dominates the Windows-side story (likely candidates: hybrid Entra Join, pre-provisioning, Win10 support cutoff), the cell may carry a footnote-prose link to `docs/apv1-vs-apv2.md` IN ADDITION to the primary `linux-capability-matrix.md` link. The hybrid 4F (split target paths within Windows column) was rejected as a default — inconsistency cost (heterogeneous Windows-cell targets across rows) outweighs APv1/APv2 richness gain. Discretion is bounded: ≤3 rows total.
- **D-10:** **Comparison doc intro acknowledgment.** The new `4-platform-capability-comparison.md` opens with a short scope/sourcing note: "Windows column links target the Windows column of `linux-capability-matrix.md` (the existing Win-bilateral capability source); a dedicated `windows-capability-matrix.md` is deferred to v1.6+." This pre-empts adversarial review attacks on the asymmetric source choice and documents the deferral path.
- **D-11:** **Filename retained as `4-platform-capability-comparison.md`** despite covering 5 platforms. The "4-platform" token preserves DEFER-08 / AECOMPARE-01 traceability lineage (predates Linux scope addition in v1.5). The comparison doc title and intro use "5-platform" wording; only the filename retains the legacy "4-platform" token. Cross-references in REQUIREMENTS, ROADMAP SC#1, and the Android footer compat shim already use this filename.

### GA-4: Per-platform matrix cross-ref pattern + Android footer treatment (winner: 5C intro paragraph update + F3 footer body removed/anchor preserved/forward-link)

- **D-12:** macOS, iOS, and Android capability matrices each get a **single sentence inserted into the existing intro paragraph** (5C) cross-referencing the new comparison doc. NO banner blockquote above the intro (5B rejected). The blockquote pattern (`> **Platform applicability:**`) appears in 18 `docs/operations/` files and ZERO `docs/reference/` files — applying to capability matrices is precedent extension, not inheritance. SC#3 literal text "intro updated to cross-reference" most-literally matches a paragraph edit. Banner blockquote (5B) is structurally additive — same defect that disqualified option 5D (new H2). Recommended literal: "For a side-by-side comparison of {platform} capabilities against Windows, macOS, iOS, Android, and Linux, see [4-Platform Capability Comparison](4-platform-capability-comparison.md)." (substitute `{platform}` per matrix).
- **D-13:** **Linux matrix already has the cross-reference** (line 70 + line 112 forward-link to `4-platform-capability-comparison.md`). Phase 58 closes the `(when shipped)` hedge atomically — line 70 and line 112 wording rewritten to drop the parenthetical hedge once the comparison doc lands.
- **D-14:** **Android footer treatment (F3):** the body under `<a id="deferred-4-platform-unified-capability-comparison">` (lines 132-139 of `android-capability-matrix.md`) is **removed**; the anchor `<a id>` is **preserved as a compat shim**; the body is **replaced with single-line forward-link prose** pointing to `4-platform-capability-comparison.md`. Anchor preservation parallels Phase 45 AEAOSPFULL-09 precedent (`#deferred-full-aosp-capability-mapping` anchor preserved when body retargeted). This satisfies SC#3 verbatim ("removed and replaced with a forward-link") and protects against any external/internal inbound links to the legacy anchor. F2 (delete anchor wholesale) rejected — breaks inbound link discoverability without compensating benefit.

### Cross-cutting lock items

- **D-15:** **Pre-edit anchor inventory mandatory** before any cross-doc cell authoring or matrix intro edit. Phase 57 D-32 inheritance — produce `58-ANCHOR-INVENTORY.md` capturing all `(android|ios|macos|linux)-capability-matrix.md#<anchor>` literals before authoring comparison doc cells. PITFALL-6 + PITFALL-15 mitigation. Anchor inventory must include the 6 H2 anchors per matrix × 5 matrices = up to 30 anchor literals (allowing for the 3 retrofitted CA H2s in macOS/iOS/Android).
- **D-16:** **Atomic-commit interpretation = plan-series level** (Phase 57 DPO-Phase57-06 inheritance). Per-plan commits acceptable. Phase 58's CA H2 retrofit (3 matrices) + cross-ref intro updates (3 matrices) + Android footer treatment + new comparison doc + validator + Linux matrix hedge removal can land across a sequence of per-plan commits OR as one atomic landing — plan-author discretion based on plan structure. C12 validator promotion (informational → blocking) lands at the close of Phase 58 once the new comparison doc exists.
- **D-17:** **C12 validator scope** (per `scripts/validation/v1.5-milestone-audit.mjs:526-538` — Referee verified): C12 regex enforces hyperlink presence in non-empty cells (`/\[.+\]\(.+\)/`); does NOT enforce link-target paths, prose-length, or duplicate-content detection. SC#2 "no raw copied content" is human-review enforced, not mechanical — verdict words (e.g., "Supported", "Partial") satisfy both mechanical (link present) and human-review (no copied prose) criteria. Cells with prose caveats inside risk SC#2 human review failure; D-01 verdict-only-with-link discipline avoids this.
- **D-18:** **Validator-as-deliverable.** `scripts/validation/check-phase-58.mjs` ships alongside content (AUDIT-06 inheritance from Wave B sibling precedent: Phase 54 32 V-54-NN, Phase 55 32 V-55-NN, Phase 56 32 V-56-NN, Phase 57 26 V-57-NN). Plan-author estimate: ~24-28 V-58-NN structural assertions covering: 6 H2 sections present + 5 platform columns present + every non-empty cell contains hyperlink + verdict vocabulary lock + 3 sibling matrices CA H2 retrofit verified + Android footer body removed + Android footer anchor preserved + 3 sibling matrices intro cross-ref present + Linux matrix `(when shipped)` hedge removed + comparison doc intro Windows-source-acknowledgment present.
- **D-19:** **`last_verified` cycle = 45 days** for the new comparison doc (locked by SC#5 — shorter than per-platform matrices' 60-day cycle due to higher cross-platform drift surface).
- **D-20:** **Verification-during-execution discipline.** `58-VERIFICATION.md` produced before downstream phases (Phase 59) consume the deliverable (v1.2 retro lesson; Phase 54-57 precedent).

### Claude's Discretion

- Specific phrasing of the 5C intro cross-reference sentence (D-12) — recommended literal provided; minor wording variation per matrix is acceptable as long as the link target and `4-Platform Capability Comparison` link text are stable.
- Order of plans within Phase 58 — plan-author may interleave (e.g., CA H2 retrofit first, then comparison doc cells, then sibling intro updates, then validator) or fold parallel waves; commit atomicity at plan-series level (D-16) accommodates either.
- Specific row/feature granularity within each H2 of the comparison doc — plan-author derives from the 5 source matrices, NOT from REQUIREMENTS axes (which list 7 axes vs ROADMAP's locked 6 H2s). When in doubt, mirror the per-feature row taxonomy used in `linux-capability-matrix.md` (which already covers all 6 H2s).
- Which 1-3 rows (if any) carry the optional D-09 footnote-prose link to `apv1-vs-apv2.md` — recommended candidates: hybrid Entra Join, pre-provisioning, Win10 support cutoff. Plan-author selects based on ground-truth APv1/APv2 divergence in source matrices.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 58 scope + traceability

- `.planning/ROADMAP.md` — search for `### Phase 58:` (Phase 58 entry: Goal, Depends, Success Criteria SC#1-5, Methodology notes)
- `.planning/REQUIREMENTS.md` — `CLEAN-05` (DEFER-08 5-platform comparison doc requirement), `AUDIT-04` (C12 informational→blocking promotion gate)
- `.planning/STATE.md` — current milestone v1.5 progress

### Existing per-platform matrices (cell link targets)

- `docs/reference/linux-capability-matrix.md` — **PRIMARY Windows column source per D-08**; 6 H2s (Enrollment / Configuration / App Deployment / Compliance / Software Updates / Conditional Access); Win|Linux bilateral; line 70 + line 112 hedge removal target per D-13
- `docs/reference/macos-capability-matrix.md` — macOS column source; 5 H2s (NO Conditional Access — D-04 retrofits one)
- `docs/reference/ios-capability-matrix.md` — iOS column source; 5 H2s (NO Conditional Access — D-04 retrofits one)
- `docs/reference/android-capability-matrix.md` — Android column source; 5 H2s + Cross-Platform Equivalences H2 + footer stub anchor at line 132 (NO Conditional Access — D-04 retrofits one; D-14 footer treatment)

### Windows-supplemental references (footnote-link discretion per D-09)

- `docs/apv1-vs-apv2.md` — Windows-internal APv1 vs APv2 feature comparison (lines 16-37 table); plan-author discretion target for ≤3 rows where APv1/APv2 divergence dominates
- `docs/reference/apv1-apv2-migration.md` — APv1 → APv2 migration playbook with feature-gap matrix (alternative footnote target)
- `docs/windows-vs-macos.md` — Windows ↔ macOS terminology mapping (NOT capability — explicitly noted in `macos-capability-matrix.md` See Also as "terminology mapping (not feature parity)")

### Pattern inheritance (precedent decisions to cite correctly)

- `.planning/phases/56-drift-detection-tenant-migration/56-CONTEXT.md` §**D-14** — `> **Platform applicability:**` blockquote pattern (operations-domain only; NOT applied to reference-domain in Phase 58); D-08 is encryption coverage (DO NOT cite as cross-platform routing pattern — Finder error caught by Adversary, ruled by Referee)
- `.planning/phases/56-drift-detection-tenant-migration/56-CONTEXT.md` §D-08 — DRIFT-07 fold H2 encryption coverage (cited correctly here; for routing pattern citation use D-14 instead)
- `.planning/phases/57-defer-07-android-nav-unification/57-CONTEXT.md` §D-32 — pre-edit anchor inventory artifact mandatory before cross-doc anchor write (PITFALL-6 + PITFALL-15 mitigation)
- `.planning/phases/57-defer-07-android-nav-unification/57-CONTEXT.md` §DPO-Phase57-06 — atomic-commit interpretation reconciled at plan-series level
- `.planning/phases/55-app-lifecycle-automation/55-CONTEXT.md` §D-13 — cross-platform routing inheritance source (Phase 56 D-14 inherits from this)
- `.planning/phases/54-patch-update-management/54-CONTEXT.md` §D-04 — earlier blockquote routing precedent
- `.planning/phases/53-co-management-operational-docs/53-CONTEXT.md` §D-08 — original blockquote pattern source
- `.planning/phases/45/AEAOSPFULL-09` (Phase 45 plan precedent) — anchor preservation when stub body retargeted (`#deferred-full-aosp-capability-mapping`); F3 inheritance for D-14

### Pitfalls + methodology

- `.planning/REQUIREMENTS.md` §PITFALL-7 — link-not-copy whitelist-first pattern (hard architectural rule)
- `.planning/REQUIREMENTS.md` §PITFALL-15 — GFM anchor case-sensitivity hazard (G3 row-anchor rejection grounding)
- `.planning/REQUIREMENTS.md` §PITFALL-6 — pre-edit anchor inventory grounding
- `.planning/REQUIREMENTS.md` §PITFALL-1 — whitelist-first framing
- `.planning/REQUIREMENTS.md` §AUDIT-06 — validator-as-deliverable mandate

### Validator implementation

- `scripts/validation/v1.5-milestone-audit.mjs` lines 505-542 — C12 implementation reference (Referee-verified: regex `/\[.+\]\(.+\)/` enforces link presence only; no link-target restrictions; no prose-length checks)
- `scripts/validation/check-phase-58.mjs` — Phase 58 deliverable per D-18; ~24-28 V-58-NN structural assertions; ships in same plan-series as content per D-16

### Downstream consumers (Phases 59-61)

- ROADMAP §`### Phase 59` — Hub Navigation Integration; serialized after Phase 58; Phase 58 outputs feed Phase 59's docs/index.md edits
- ROADMAP §`### Phase 60` — Audit Harness v1.5 Finalization; C12 promotion (informational → blocking) lands here per AUDIT-04
- ROADMAP §`### Phase 61` — Terminal re-audit + close

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- **`linux-capability-matrix.md` Windows column structure** — already organized across all 6 H2s (Enrollment / Configuration / App Deployment / Compliance / Software Updates / Conditional Access). Comparison doc Windows cells reuse these H2 anchors directly. Comparison doc 6-H2 structure mirrors Linux matrix structure.
- **`linux-capability-matrix.md:71-93` Cross-Platform Equivalences H2** — provides 3-pair cross-platform attribution pattern (Linux↔macOS, Linux↔iOS, etc.) that the comparison doc may extend; plan-author may borrow the "≈" attribution syntax verbatim.
- **`scripts/validation/v1.5-milestone-audit.mjs:526-538` C12 implementation** — copy-template for `check-phase-58.mjs` V-NN-NN cell-link-presence assertions. Existing C12 already produces structurally-correct regex baseline.
- **Phase 57 `57-ANCHOR-INVENTORY.md` artifact format** — direct template for `58-ANCHOR-INVENTORY.md` per D-15. Captures anchor literals + corresponding source-matrix line numbers + GFM-slugged anchor strings.

### Established Patterns

- **Verdict vocabulary** (D-02 `Supported | Partial | Not supported | Mode-dependent | n/a`) — extracted from existing matrix cell prose: linux-matrix line 65 ("Not supported"), line 19 ("Supported"), line 31 ("Partial"); ios-matrix uses "N/A | N/A" for Private Space row (Android matrix line 75); Phase 56 D-14 uses "Mode-dependent" routing analog. New verdict for Phase 58 = synthesis of existing tokens, NOT new vocabulary.
- **Atomic single-commit landing for content + validator** (Wave B sibling precedent: Phase 54 commit `aecf014`-style, Phase 55 commit `aecf014`, Phase 56 progressive-landing across 6-7 per-plan commits, Phase 57 progressive-landing across 8 per-plan commits). Phase 58 atomicity per D-16.
- **`last_verified` 45-day cycle for cross-platform reference docs** (locked by SC#5; shorter than per-platform 60-day cycle).
- **Anchor-preservation-when-body-retargeted** (Phase 45 AEAOSPFULL-09 `#deferred-full-aosp-capability-mapping` precedent) — D-14 Android footer treatment inherits.
- **Validator-as-deliverable in same plan-series as content** (Phase 50 50-05-PLAN.md, Phase 51-57 sibling pattern) — D-18 inheritance.
- **Pre-edit anchor inventory artifact before cross-doc edits** (Phase 57 D-32 + 57-ANCHOR-INVENTORY.md) — D-15 inheritance.
- **Cross-Platform Equivalences H2 placement** (linux-matrix line 71, android-matrix line ~95) — comparison doc may include OR exclude this H2; plan-author discretion. ROADMAP SC#1 only locks 6 domain H2s, NOT a Cross-Platform Equivalences supplement.

### Integration Points

- **`docs/reference/4-platform-capability-comparison.md`** — NEW file authored by Phase 58. Filename retained from DEFER-08 traceability per D-11.
- **`docs/reference/macos-capability-matrix.md`** — Phase 58 modifies (intro cross-ref sentence per D-12, `## Conditional Access` H2 retrofit per D-04).
- **`docs/reference/ios-capability-matrix.md`** — Phase 58 modifies (intro cross-ref sentence per D-12, `## Conditional Access` H2 retrofit per D-04).
- **`docs/reference/android-capability-matrix.md`** — Phase 58 modifies (intro cross-ref sentence per D-12, `## Conditional Access` H2 retrofit per D-04, footer body removal + anchor preservation + forward-link per D-14).
- **`docs/reference/linux-capability-matrix.md`** — Phase 58 modifies (line 70 + line 112 `(when shipped)` hedge removal per D-13). NO H2 retrofit needed (already has Conditional Access H2).
- **`scripts/validation/check-phase-58.mjs`** — NEW file per D-18; same plan-series as content per D-16.
- **`scripts/validation/v1.5-milestone-audit.mjs`** — Phase 58 promotes C12 from informational → blocking once `4-platform-capability-comparison.md` exists (lands in Phase 58 close per AUDIT-04, NOT in Phase 60).
- **Hub `docs/index.md`** — NOT modified by Phase 58 (Phase 59 owns hub edits).

</code_context>

<specifics>
## Specific Ideas

- **Adversarial-review delegation:** Per user instruction, all 4 gray areas were adjudicated via Finder → Adversary → Referee scored adversarial-review pattern. Each decision (D-01 through D-20) is grounded in cited file evidence. Adversary's net score: ~+35-40 of +90 possible (4 substantive wins on D-04 tier-2 retrofit, D-07 citation correction, D-12 cross-ref pattern, plus D-17 partial). User explicitly delegated the decision-routing to the adversarial process — recommendations are locked and downstream agents (researcher, planner, executor) consume directly.
- **Recommended literal for 5C cross-reference sentence (D-12):** "For a side-by-side comparison of {platform} capabilities against Windows, macOS, iOS, Android, and Linux, see [4-Platform Capability Comparison](4-platform-capability-comparison.md)." — substitute `{platform}` per matrix (macOS / iOS / Android). Linux matrix already has equivalent prose (D-13 closes hedge).
- **Recommended verdict vocabulary regex pin (D-02):** validator literal-pin for cell-content verdict word — `(Supported|Partial|Not supported|Mode-dependent|n\/a)` — to prevent vocabulary drift over future updates.
- **Recommended Conditional Access H2 retrofit content scope (D-04):** ~15-30 lines per matrix; mirror Linux matrix `## Conditional Access` H2 structure (lines 59-66). macOS CA: device-based CA via Compliance + macOS-specific compliance settings. iOS CA: device-based CA via supervised attestation + per-app CA via MAM-WE. Android CA: device-based CA via Play Integrity attestation + per-mode CA scope variance.

</specifics>

<deferred>
## Deferred Ideas

- **Dedicated `windows-capability-matrix.md`** — deferred to v1.6+. Phase 58 explicitly defers per D-10 with intro acknowledgment in the new comparison doc. When v1.6+ creates this matrix, Phase 58's Windows column links can be retargeted with a single sed-pass; H2 anchor structure is identical (Linux matrix already has all 6 H2s; future Windows matrix mirrors).
- **Cross-Platform Equivalences supplemental H2 in 4-platform comparison doc** — plan-author discretion (not locked). ROADMAP SC#1 locks 6 domain H2s; equivalences H2 is optional add-on borrowed from linux-matrix:71-93 / android-matrix Cross-Platform Equivalences pattern.
- **Verdict vocabulary expansion to 6+ states** — defer to v1.6+ retro if 5-state vocabulary (D-02) proves insufficient in operations.
- **`apv1-vs-apv2.md` promotion to `docs/reference/`** — `apv1-vs-apv2.md` currently sits at `docs/`, not `docs/reference/`. Promotion would unify Windows-internal feature-comparison location with other capability matrices. Out of Phase 58 scope; candidate for v1.6+ cleanup phase.

### Reviewed Todos (not folded)

None — discussion stayed within phase scope. No pending todos in `.planning/todos/pending/` matched Phase 58.

</deferred>

---

*Phase: 58-defer-08-4-platform-capability-comparison*
*Context gathered: 2026-04-30*
