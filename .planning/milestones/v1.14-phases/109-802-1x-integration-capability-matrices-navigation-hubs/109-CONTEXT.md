# Phase 109: 802.1X Integration — Capability Matrices + Navigation Hubs - Context

**Gathered:** 2026-07-01
**Status:** Ready for planning

<domain>
## Phase Boundary

**Pure discoverability / navigation wiring** satisfying **DOT1X-11**. All 802.1X *content* (foundation guides, per-platform admin-setup 802.1X guides, `_glossary-network.md`, L1 runbooks #38-41, L2 runbooks #31-33, decision tree #10) already landed and committed in Phases 101–108. Phase 109 makes that content reachable from every existing entry point in the suite — it authors **no new content** (navigation-last invariant, `ROADMAP.md` SC4).

**In scope (three wiring surfaces + one gate):**
1. **Capability-matrix Network-Authentication rows** (SC1) — add one 802.1X row to the 4 per-platform matrices + the 5-platform comparison (5 files total), deriving accurate verdicts from per-platform guide content.
2. **Six nav-hub entries** (SC2) — wire entries for the new 802.1X guides / runbooks / decision tree into `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/l1-runbooks/00-index.md`, `docs/l2-runbooks/00-index.md`.
3. **Glossary see-also banners** (SC3) — confirm all existing platform glossaries point to `_glossary-network.md` (**already true** — see D-01).
4. **Navigation-last gate** (SC4) — all nav edits commit after the content files they reference are confirmed committed (content already landed in 101-108, so this is largely auto-satisfied within-phase).

**Out of scope (deferred / other phases):**
- Authoring any new content file (e.g. a standalone `windows-capability-matrix.md`) — see D-04; deferred to v1.6+ by committed corpus decision.
- Editing the decision tree's *internal* L2 links — already wired in Phase 108 (P108 D-03); the tree is NOT one of the six nav hubs.
- Restating 802.1X theory in matrices/hubs — link-not-copy, never restate (PITFALL-7).
- The three v1.13-deferred corpus accuracy nits + MDM migration walkthroughs → **Phase 110** (FIX-01/02/03, MIGF-01/02).

</domain>

<decisions>
## Implementation Decisions

**All four gray areas were resolved via a three-agent adversarial review (Finder → Adversary → Referee, Opus)** per the user's standing convention. The **Finder scored ~60** across four ref-anchored picks (all HIGH, literal anchors); the **Adversary mounted ZERO overturns and banked 0** (declining to risk −2× wrongful overturns against verified-correct picks); the **Referee independently re-verified every load-bearing anchor and upheld all four**, while correcting two factual drifts in the Finder's rationale (neither flips a pick). Unanimous convergence on **Option A** for every decision. See `109-DISCUSSION-LOG.md` for the full scored reasoning. No locked pick violates a hard constraint (navigation-last, link-not-copy, 5-state verdict lock, corpus callout vocabulary, anchor-slug discipline, literal-spec scope).

### D-01 — Glossary see-also wiring (SC3) = verify-only; SC3 is already satisfied (HIGH)
- **Verified:** all four *existing* SC3-named platform glossaries already carry the `[Network Authentication Glossary](_glossary-network.md)` see-also banner — `docs/_glossary.md:13`, `docs/_glossary-macos.md:12`, `docs/_glossary-android.md:14`, `docs/_glossary-linux.md:12` (added at foundation time). **SC3 is already TRUE.**
- **The fifth SC3-named file `_glossary-ios.md` does not exist** — iOS/iPadOS terminology is folded into `_glossary-macos.md` (`:9`: "covers Apple-platform provisioning … for macOS and iOS/iPadOS"), which already carries the banner. Treat the ROADMAP's `_glossary-ios.md` reference as **satisfied-by `_glossary-macos.md`**, not as a gap.
- **`docs/_glossary-apple-business.md` is deliberately NOT touched.** It is an ABM-*governance* glossary (`applies_to: apple-business`), not one of the five device-platform glossaries SC3 enumerates, and 802.1X has no ABM relevance. **Rejected B/C** (add a banner / reconciliation prose to it): over-delivers beyond SC3's exhaustive named set and authors content in a navigation-last phase.

### D-02 — Network-Auth row shape & verdict vocabulary = single row, reuse the corpus 5-state verdict lock (HIGH)
- **One consolidated `Network Authentication (802.1X)` row per matrix** — direct precedent: `4-platform-capability-comparison.md:44` carries "Certificate deployment (SCEP / PKCS / ACME)" as a **single row** spanning three protocols. **Rejected B** (Wi-Fi/wired × EAP-TLS/PEAP sub-rows): over-decomposes against the one-row-per-capability convention; per-platform nuance belongs in the linked source guide (link-not-copy).
- **Reuse the locked verdict vocabulary, do NOT introduce literal YES/NO/STUB cells.** `4-platform-capability-comparison.md:15` is a hard "**5-state lock**": cells use exactly one of `Supported` / `Partial` / `Not supported` / `Mode-dependent` / `n/a`. SC1's "YES/NO/STUB" (`ROADMAP.md:269`) is *conceptual status shorthand*, mapped onto the lock (STUB → the corpus gap / `Not supported` verdict, e.g. Linux script-based EAP-TLS-only, AOSP stub). **Rejected C** (literal YES/NO/STUB): directly violates the 5-state lock at `:15` and clashes with the per-platform matrices' prose-verdict style.
- **Each cell = verdict word + one hyperlink to the source per-platform matrix/guide** (link-not-copy per PITFALL-7, `4-platform-capability-comparison.md:11`) — no per-cell duplication of platform-specific prose.

### D-03 — Nav-hub entry style = fold into each hub's existing groupings; no dedicated 802.1X H2 (HIGH)
- **Route each 802.1X artifact into a pre-existing grouping by its type/platform**, matching every hub's established shape. **Verified hub shapes** (Referee-corrected — three hubs are MIXED, not purely platform-grouped): the topic H2s in `index.md` (`## Operations` `:243`, `## Cross-Platform References` `:299`), `quick-ref-l1.md` (`## Decision Trees` `:35`, `## Runbooks` `:42`), and `quick-ref-l2.md` (`## Investigation Runbooks` `:65`, etc.) are **artifact-type buckets**, not symptom/domain buckets.
- **Routing map (fold-in):** decision tree #10 → `## Decision Trees`; cross-platform L1 #31-33 / L2 investigation runbooks → `## Runbooks` / `## Investigation Runbooks`; cross-platform foundation guides → `## Cross-Platform References` / `## Operations`; per-platform 802.1X admin guides + per-platform L1 #38-41 → the existing per-platform sections. Every artifact lands in an existing section.
- **Rejected B** (dedicated "802.1X / Network Authentication" H2 in every hub): imposes uniform new top-level structure no hub uses; closer to restructuring than nav wiring. **Rejected C** (hybrid, new dedicated H2 where topic-organized): a suitable type-bucket already exists in every mixed hub, so C would mint redundant/orphan sections. SC2 (`:270`) only requires hubs to "carry entries" — fold-in satisfies that with minimal churn (favorable under navigation-last, SC4).

### D-04 — Matrix target file set = the 5 existing files, no new Windows matrix (HIGH)
- **Add the Network-Auth row to exactly 5 existing files:** `docs/reference/macos-capability-matrix.md`, `ios-capability-matrix.md`, `android-capability-matrix.md`, `linux-capability-matrix.md`, and `4-platform-capability-comparison.md` (its H1 is actually "5-Platform Capability Comparison"). **No standalone Windows matrix is authored** — `4-platform-capability-comparison.md:13`: "a dedicated `windows-capability-matrix.md` is **deferred to v1.6+**" (Windows lives as a column inside `linux-capability-matrix.md`). **Rejected B** (author new Windows matrix): scope creep contradicting the committed corpus deferral + new content in a nav-last phase. **Rejected C** (only files with a Windows column): would exclude the Android matrix (see guardrail below) and break SC1's "all five."

### Claude's Discretion (within the locked decisions)
- Exact row-insertion anchor within each of the 5 matrix files (e.g. macOS 802.1X row may join the existing `## Authentication` section at `macos-capability-matrix.md:101` or a domain table — planner's call), exact verdict-word choice per platform cell (derived from live guide content at plan time), row-label wording, and nav-entry link-text wording — all within D-02/D-03/D-04 and holding corpus conventions (`> **Label:**` callouts, NOTE/WARNING/DANGER/CRITICAL vocabulary only; 90-day freshness stamps; plain-GitHub auto-slug anchors, no `{#id}`, double-hyphen trap).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

> **Line-number note:** `ROADMAP.md` refs below verified against the live file 2026-07-01 (Phase 109 Goal, SC1 `:269`, SC2 `:270`, SC3 `:271`, SC4 nav-last, six-hub list). Live-doc line refs (`4-platform-capability-comparison.md:11/13/15/44`, glossary banner lines, hub H2 lines) verified by all three review agents 2026-07-01.

### Phase scope & requirements
- `.planning/ROADMAP.md` §"Phase 109" — Goal + **SC1** (`:269`: Network-Auth rows in the five platform matrices + the 4-platform comparison, accurate YES/NO/STUB derived from per-platform guide content), **SC2** (`:270`: six nav hubs carry entries for the new guides/runbooks/decision tree), **SC3** (`:271`: glossary see-also banners → `_glossary-network.md`), **SC4** (navigation-last invariant — nav edits commit after referenced content is committed).
- `.planning/REQUIREMENTS.md` — **DOT1X-11** (`:32`: discoverability via matrix rows + glossary see-also + nav-hub entries, all committed navigation-last after content lands).

### Capability matrices (the 5 edit targets — D-02 / D-04)
- `docs/reference/4-platform-capability-comparison.md` — the 5-platform comparison (H1 "5-Platform Capability Comparison"). **Load-bearing anchors:** `:11` (link-not-copy / PITFALL-7 — verdict word + one hyperlink per cell); `:13` (Windows-as-column; `windows-capability-matrix.md` deferred to v1.6+); `:15` (**5-state verdict lock**: Supported / Partial / Not supported / Mode-dependent / n/a); `:44` (single-row-per-capability precedent — "Certificate deployment (SCEP / PKCS / ACME)").
- `docs/reference/macos-capability-matrix.md` — Windows|macOS bilateral (`:15` header; existing `## Authentication` section `:101` re: PSSO — candidate 802.1X row home).
- `docs/reference/ios-capability-matrix.md` — Windows|macOS|iOS (`:15` header).
- `docs/reference/android-capability-matrix.md` — **mode-columned** (`:16`: COBO|COPE|BYOD|Dedicated|ZTE|AOSP), **no Windows column** — cell shape differs; see planner guardrail.
- `docs/reference/linux-capability-matrix.md` — 5-platform / Windows-bilateral source (`:17` header; hosts the Windows column other files link to).

### Nav hubs (the six edit targets — D-03) with verified shape
- `docs/index.md` — MIXED: platform H2s + topic H2s `## Operations` (`:243`), `## Cross-Platform References` (`:299`).
- `docs/quick-ref-l1.md` — MIXED: `## Decision Trees` (`:35`), `## Runbooks` (`:42`) + platform quick-ref H2s.
- `docs/quick-ref-l2.md` — MIXED: `## Log Collection` / `## Investigation Runbooks` (`:65`) + platform H2s.
- `docs/common-issues.md` — platform-grouped (symptoms nested as H3 under platform H2s `:23/:157/:249/:304`).
- `docs/l1-runbooks/00-index.md` — platform-grouped runbook catalog (APv1/APv2/macOS/iOS/Android/Linux/Apple-Business).
- `docs/l2-runbooks/00-index.md` — platform-grouped runbook catalog.

### Glossaries (SC3 — verify-only, D-01)
- `docs/_glossary-network.md` — canonical 802.1X glossary (the banner *target*; do not edit).
- `docs/_glossary.md:13`, `docs/_glossary-macos.md:12`, `docs/_glossary-android.md:14`, `docs/_glossary-linux.md:12` — **already carry** the network banner (confirm, don't re-add).
- `docs/_glossary-apple-business.md` — ABM-governance glossary, NOT SC3-named; **do not touch**.

### 802.1X content sources (the nav/matrix targets — link, never restate)
- `docs/admin-setup-8021x/{01-eap-method-overview,02-cert-delivery-foundation,03-windows,04-macos,05-ios,06-android,07-linux}.md` — per-platform 802.1X admin guides (matrix verdicts derive from these; guides are nav/matrix link targets).
- `docs/l1-runbooks/{38,39,40,41}-*.md` (per-platform L1 triage), `docs/l2-runbooks/{31,32,33}-*.md` (cross-platform L2 investigation), `docs/decision-trees/10-8021x-triage.md` — nav-hub entry targets.

### Conventions & predecessor decisions
- `.planning/phases/108-l2-runbooks-31-33-decision-tree-10/108-CONTEXT.md` — navigation-last invariant (D-03 there), link-not-copy, callout vocabulary (NOTE/WARNING/DANGER/CRITICAL only, no `IMPORTANT`), 90-day freshness stamps, plain-GitHub anchor slugs + double-hyphen trap. Confirms the decision **tree** is Phase-108 scope, not one of Phase 109's six hubs.

### Live-verify at plan time
- **Per-platform 802.1X verdict values** for each matrix cell — derive from the live `admin-setup-8021x/03-07` guide content at plan time (SC1 "deriving from per-platform guide content"), not paraphrased from memory. Map onto the 5-state lock; STUB → `Not supported`/gap verdict (Linux script-based EAP-TLS-only, AOSP stub).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`docs/reference/4-platform-capability-comparison.md`** — the canonical matrix template: 5-state verdict lock (`:15`), link-not-copy cell pattern (`:11`), single-row-per-capability precedent (`:44`). Clone the cell shape for the new 802.1X row.
- **Existing per-platform matrix column shapes** — macOS/iOS/Linux are Windows-columned; **Android is mode-columned** (COBO/COPE/BYOD/Dedicated/ZTE/AOSP). The 802.1X row adapts to each file's existing column structure.
- **Existing nav-hub type-buckets** — `## Decision Trees`, `## Runbooks`, `## Investigation Runbooks`, `## Cross-Platform References`, `## Operations` — fold-in homes for the cross-platform 802.1X artifacts (no new sections needed).
- **Existing glossary see-also banners** — already point to `_glossary-network.md`; SC3 is verify-only.

### Established Patterns
- **Navigation-last** (SC4) — content already committed in 101-108; nav edits are safe to commit; no within-phase content→nav ordering hazard beyond confirming targets exist.
- **Link-not-copy / PITFALL-7** — matrices & hubs link into guides, never restate theory.
- **5-state verdict lock** — comparison-doc cells; per-platform matrices use their own Yes/No/prose style.
- **Fold-in over new sections** — 802.1X entries slot into existing per-platform + artifact-type groupings across all six hubs.

### Integration Points
- **Edited (nav only):** 5 matrix files + 6 hub files = 11 files. **No new files. No content authored.**
- **Confirmed-not-edited:** the 4 already-bannered glossaries (verify), `_glossary-apple-business.md` (leave alone), `_glossary-network.md` (target), decision tree #10 (Phase-108 scope).

</code_context>

<specifics>
## Specific Ideas

- **One consolidated `Network Authentication (802.1X)` row** per matrix (not sub-rows), using the 5-state verdict lock — mirrors the single "Certificate deployment (SCEP/PKCS/ACME)" row at `4-platform-capability-comparison.md:44`.
- **Android matrix 802.1X cell is authored in mode-columned form** (per-mode verdicts or `Mode-dependent`), not a Windows/bilateral cell — its column structure differs from the other three matrices (`android-capability-matrix.md:16`).
- **Nav routing by artifact type:** decision tree → Decision Trees; cross-platform runbooks → Runbooks/Investigation Runbooks; cross-platform guides → Cross-Platform References/Operations; per-platform content → per-platform sections. **No dedicated 802.1X H2 in any hub.**
- **SC3 is a verification, not an authoring task** — confirm the four existing banners, map `_glossary-ios.md` → `_glossary-macos.md`, leave apple-business untouched.

</specifics>

<deferred>
## Deferred Ideas

- **Standalone `docs/reference/windows-capability-matrix.md`** — explicitly deferred to **v1.6+** by committed corpus decision (`4-platform-capability-comparison.md:13`); out of Phase 109 and out of this milestone. Windows remains a baseline column.
- **Network banner in `docs/_glossary-apple-business.md`** — considered (completeness argument) and rejected: apple-business is a governance glossary, not an SC3-named platform glossary; capture only if a future milestone decides all glossaries should cross-link the network glossary.
- **ROADMAP SC3 stale-filename cleanup** — SC3 names `_glossary-ios.md` (nonexistent). Not a Phase 109 deliverable; note for a future ROADMAP/requirements hygiene pass. Phase 109 verification maps it to `_glossary-macos.md`.
- **v1.13 corpus accuracy nits + MDM migration walkthroughs** → **Phase 110** (FIX-01/02/03, MIGF-01/02).

### Reviewed Todos (not folded)
None — no pending todos matched this phase.

</deferred>

---

*Phase: 109-802-1x-integration-capability-matrices-navigation-hubs*
*Context gathered: 2026-07-01*
