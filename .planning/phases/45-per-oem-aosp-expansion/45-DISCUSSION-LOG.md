# Phase 45: Per-OEM AOSP Expansion — Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in 45-CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-25
**Phase:** 45-per-oem-aosp-expansion
**Method:** 4-area 3-agent adversarial review (Finder / Adversary / Referee × 4 gray areas; 12 agents in 3 parallel waves)
**Areas discussed:** Per-OEM doc shape (GA1); Meta Horizon strategy (GA2); OEM matrix shape (GA3); L1/L2 runbook split (GA4)

---

## Gray Area 1 — Per-OEM Admin Doc Shape

| Option | Description | Selected |
|--------|-------------|----------|
| 1A | Uniform 10-H2 skeleton for all 5 per-OEM docs (Scope and Status / Hardware Scope / Prerequisites and Licensing / Enrollment Method / Step 0 (HTML-comment-subtract if no portal) / Step 1 / Step 2 / Verification / Common Failures / See Also + Changelog). Audit-friendly mechanical whitelist. | |
| 1B | Hybrid: 8 fixed core H2s + per-OEM REQUIRED add-on H2s (RealWear `Wi-Fi QR Embedding Walkthrough`; Zebra `OEMConfig APK Push`; Meta Quest `Meta for Work Portal Setup` + `Meta Horizon Subscription Status`; Pico optional Business Suite; HTC none). | ✓ |
| 1C | Fully OEM-shaped with universal floor (Scope and Status, Hardware Scope, PITFALL-7 framing, frontmatter, Changelog). Everything else is author's call. | |

**Adversarial-review Finder/Adversary/Referee scoring:**
- 1A: 3 CRIT / 8 MED / 6 LOW = weighted 76 (Finder) → after Referee: 2 CRIT / 7 MED / 6 LOW = weighted 61
- 1B: 2 CRIT / 8 MED / 6 LOW = weighted 66 (Finder) → after Referee: 1 CRIT / 5 MED / 5 LOW = weighted 40 ← WINNER
- 1C: 3 CRIT / 7 MED / 7 LOW = weighted 72 (Finder) → after Referee: 2 CRIT / 5 MED / 7 LOW = weighted 52

**Adversary disprovals upheld by Referee:** F-1A-CRIT-03 (Phase 47 harness is informational-first per D-29; doesn't mechanically reject) → downgraded to LOW; F-1A-MED-07 (bundled `See Also + Changelog` is notational); F-1A-LOW-01 (frontmatter ≠ H2 conflation); F-1B-CRIT-02 (AEAOSPFULL-03 itself says "optional"; 1B faithfully mirrors); F-1B-MED-02 (sibling pattern DOES enforce sequence per Phase 39 D-11); F-1B-MED-06 (notational); F-1B-MED-08 (locking shape on doc-not-yet-existing IS planning workflow); F-1C-CRIT-03 (C6/C7/C9 are content-regex not H2-shape) → downgraded to LOW; F-1C-MED-02 (adversarial review per gray area, not per-OEM); F-1C-MED-07 (AEINTEG-01 targets matrix/Mermaid/glossary, not per-OEM doc shape); F-1C-LOW-01 (frontmatter conflation).

**User's choice:** Option 1B selected by adversarial-review winner picking (lowest CRIT count + lowest weighted total).
**Notes (Referee implementation directive):** Expanded the 8-H2 core to 11-H2 baseline (added `## Renewal / Maintenance` + `## What Breaks Summary` + `## Changelog` as separate H2s) to restore sibling parity verified across `02:214 / 03:218 / 05:249 / 07:193`. Override on F-1B-CRIT-01: Meta Quest `## Meta Horizon Subscription Status` add-on is REQUIRED REGARDLESS of Meta Horizon alive-status per AEAOSPFULL-05 wind-down callout contract. Step-numbered H3 children (`### Step 0 — ...`, `### Step 1 — ...`) inside `## Provisioning Steps` resolve F-1B-MED-07 Step 0 omission per Phase 44 D-02 sibling pattern.

---

## Gray Area 2 — Meta Horizon Strategy for `13-aosp-meta-quest.md`

| Option | Description | Selected |
|--------|-------------|----------|
| 2A | Author Meta Quest doc as already-wound-down (Intune-direct only + historical context); skips plan-time re-verification; bets on community-sourced 2026-02-20 wind-down date being correct. | |
| 2B | Plan-time re-verification gate (Phase 39 D-22 reapplied). Verified DISCONTINUED → 2A-style flow; Verified ALIVE → dual-path with Feb 20 callout; Unresolvable → MEDIUM-marker safe-default to dual-path. | ✓ |
| 2C | Author flexibly with single `## Enrollment Path` H2 placeholder; structure determined at W1 from research findings. | |

**Adversarial-review Finder/Adversary/Referee scoring:**
- 2A: 4 CRIT / 6 MED / 4 LOW = weighted 74 (Finder) → after Referee: 4 CRIT / 5 MED / 4 LOW = weighted 69
- 2B: 0 CRIT / 4 MED / 7 LOW = weighted 27 (Finder) → after Referee: 0 CRIT / 2 MED / 8 LOW = weighted 18 ← WINNER
- 2C: 2 CRIT / 6 MED / 7 LOW = weighted 57 (Finder) → after Referee: 1 CRIT / 7 MED / 7 LOW = weighted 52

**Adversary disprovals upheld by Referee:** F-2A-MED-01 (C9 banned-phrase check is COPE-scoped per REQUIREMENTS.md AEINTEG-02; "DISCONTINUED" not in COPE banned list; not applicable to Meta Horizon); F-2B-MED-01 (Phase 39 D-22 protocol allows MEDIUM-marker fallback when unresolvable; no actual paralysis); F-2B-MED-02 (downgraded to LOW — branching at plan time is mutually exclusive; only one structure ships); F-2B-MED-03 (D-22 mandates authoritative-source verification, not same MEDIUM-source re-use); F-2C-CRIT-02 (downgraded to MED — single placeholder H2 doesn't strictly preclude additional H2s).

**User's choice:** Option 2B selected by adversarial-review winner picking (0 CRIT decisive; lowest weighted at 18).
**Notes (Referee implementation directive):** Branch-resolution rule prescribes bias-safe ALIVE skeleton when researcher cannot conclusively determine wind-down status; same-source MEDIUM community re-confirmation is INSUFFICIENT per Phase 39 D-22. Locked deliverables (4-portal pattern, Meta Horizon subscription requirement, regional restrictions per model, Feb 20 2026 callout, PITFALL-7 carry-forward) preserved across all branches per AEAOSPFULL-05. Meta-for-Work approval gate rendered as `### Step 0 — Meta for Work account approval (<latency>)` H3 inside `## Provisioning Steps` (not standalone H2 — fits 11-H2 contract from D-01) per Phase 44 D-02 wait-gate precedent. One-off 30-day re-verify trigger for the wind-down assertion in addition to standard 60-day cycle.

---

## Gray Area 3 — `aosp-oem-matrix.md` Shape

| Option | Description | Selected |
|--------|-------------|----------|
| 3A | Single wide table (5 OEMs × 6+ columns: Devices / Enrollment Method / Vendor Portal / License Tier / Wi-Fi Embed / Intune AOSP Mode). Plus subsidiary `## Source Attribution`, `## See Also`, `## Changelog`. PITFALL-7 in `## Scope`. | |
| 3B | Multiple narrow tables grouped by capability — `## Hardware Scope` / `## Enrollment Method and Wi-Fi Embedding` / `## Vendor Portals and Licensing` / `## Intune AOSP Mode`. | ✓ |
| 3C | OEM-as-row with capability-tag columns + `## Tag Vocabulary` H2 explaining each tag. | |

**Adversarial-review Finder/Adversary/Referee scoring:**
- 3A: 3 CRIT / 5 MED / 5 LOW = weighted 60 (Finder) → after Referee: 1 CRIT / 3 MED / 6 LOW = weighted 25
- 3B: 3 CRIT / 5 MED / 6 LOW = weighted 61 (Finder) → after Referee: 0 CRIT / 1 MED / 6 LOW = weighted 9 ← WINNER
- 3C: 4 CRIT / 5 MED / 7 LOW = weighted 72 (Finder) → after Referee: 4 CRIT / 5 MED / 6 LOW = weighted 61

**Adversary disprovals upheld by Referee:** F-3A-CRIT-01 (downgraded — AEAOSPFULL-06 dimensions are examples not closed enumeration; Devices column inherent to OEM-row matrix); F-3A-CRIT-03 (AEAOSPFULL-09 only requires file-link not section anchor); F-3A-MED-04 (PITFALL-7 internal-contradiction claim is hand-wavy without mechanism); F-3A-MED-03 (downgraded to LOW — Markdown handles wide tables); F-3A-LOW-04 (frontmatter padding); F-3B-CRIT-01 **DECISIVE** (Anti-Pattern 1 is about CROSS-DOC duplication not within-doc table cardinality; sibling Android matrix verified to use 5 sub-tables under 5 H2s); F-3B-CRIT-02 (anchor target only requires file-link); F-3B-CRIT-03 **DECISIVE** ("table" wording is descriptive of artifact-type not normative singular-cardinality; sibling Android matrix is "the matrix" while containing 5 sub-tables); F-3B-MED-02 (4 H2 anchors normal Markdown; sibling Android matrix has 5 H2 sub-table anchors with no maintenance issue); F-3B-MED-03 (downgraded entirely — sub-tables-by-capability-H2 actually MATCHES sibling pattern); F-3B-MED-01 (downgraded to LOW); F-3B-MED-05 (downgraded to LOW — C3 word-count check scoped to `06-aosp-stub.md` not new dedicated matrix); F-3B-LOW-01 (Hardware Scope inherent); F-3B-LOW-06 (frontmatter padding); F-3C-CRIT-04 not upheld (Referee sustained — `## Tag Vocabulary` H2 IS the new invariant requiring net-new governance infrastructure); F-3C-MED-03 (anchor target only requires file-link); F-3C-LOW-06 (frontmatter padding).

**User's choice:** Option 3B selected by adversarial-review winner picking (0 CRIT decisive after Adversary disprovals upheld; matches verified sibling Android/iOS/macOS multi-sub-table pattern).
**Notes (Referee implementation directive):** Four `## H2` sub-tables in fixed order: `## Hardware Scope` / `## Enrollment Method and Wi-Fi Embedding` / `## Vendor Portals and Licensing` / `## Intune AOSP Mode`. All 5 AEAOSPFULL-06 dimensions appear as named columns (no prose-Notes column anywhere — D-08 carry-forward). Single `## Scope` H2 at top carries PITFALL-7 framing once. Meta Horizon volatility via reference-style footnotes (Markdown `[^meta-volatility]`), NOT inline cell prose. Source-confidence markers OUTSIDE tables in `## Source Attribution` section. Cell-value rules: `Yes` / `No` / `REQUIRED` / `OPTIONAL` / `N/A` / `Plan 1` / `Plan 2` / `Suite` literal strings; NO `+` notation. Use `## Version History` (NOT `## Changelog`) per sibling matrix convention.

---

## Gray Area 4 — L1/L2 Runbook Split + Triage Tree Integration

| Option | Description | Selected |
|--------|-------------|----------|
| 4A | Single AOSP runbook 29 organized BY OEM (Cause A: RealWear ... Cause E: Meta Quest); each Cause has D-10 + D-12 inside; cross-links to admin guides 09-13. Triage tree: AND1 → ANDR29 (one click target). | ✓ |
| 4B | Symptom-routed runbook 29 (Cause A: Wi-Fi-step hang; Cause B: OEMConfig APK push; Cause C: wrong AOSP mode; Cause D: vendor-portal handoff; Cause E: generic AOSP QR enrollment). Cross-links to per-OEM admin guides for OEM mechanics. | |
| 4C | OEM-first then symptom — Mermaid AND1 → AOSP → AND6 (NEW: "Which OEM?") → 5 OEM-specific terminal nodes; L1 runbook 29 is OEM-routing-only (no D-10/D-12). | |

**Adversarial-review Finder/Adversary/Referee scoring:**
- 4A: 3 CRIT / 5 MED / 3 LOW = weighted 58 (Finder) → after Referee: 0 CRIT / 7 MED / 3 LOW = weighted 24 ← WINNER (tiebreaker)
- 4B: 2 CRIT / 5 MED / 3 LOW = weighted 48 (Finder) → after Referee: 0 CRIT / 7 MED / 3 LOW = weighted 24
- 4C: 4 CRIT / 5 MED / 3 LOW = weighted 68 (Finder) → after Referee: 3 CRIT / 6 MED / 3 LOW = weighted 51

**Adversary disprovals upheld by Referee:** F-4A-CRIT-01 (downgraded to MED — Knox runbook 28 OEM-scoped + Cause D cross-OEM pivot; precedent not airtight); F-4A-CRIT-02 (Cause E "escalate-only" slot is structurally extensible — 4A could add aggregate `## Escalation Criteria` H2 mirroring 27/28 exactly); F-4A-CRIT-03 (downgraded to MED — triage tree already routes by MODE first; AOSP at AND1 IS OEM-class signal); F-4A-MED-04 (Adversary's length math correct — runbook 28 is 234 lines verified, 4A extrapolates ~280-310 not "400+"); F-4B-CRIT-01 (downgraded to MED — Cause D parenthetical "Meta Horizon if alive" is fixable framing); F-4B-CRIT-02 (downgraded to MED — parentheticals are fixable framing); F-4C-CRIT-04 (downgraded to MED — anchor mismatch is contingent on GA1 winner H2 name).

**4C eliminated by 3 standing CRITs:** self-acknowledged Phase 40 D-05 LOCK violation (terminal nodes within 2 decision steps of root); D-10/D-12 LOCK violation (OEM-routing-only L1 runbook has no actor-boundary or escalation packet); ROADMAP SC#4 singular-click-link wording violation (`ROADMAP.md:160` "ANDE1 → ANDR29 resolved node with click-link" — singular).

**4A vs 4B tied at 0 CRIT / 24 weighted.** Tiebreaker resolved on:
1. Sibling-pattern fit: runbook 28 establishes that L1 runbooks CAN be scope-narrow; 4A's OEM-scoped Causes are a closer analog
2. ROADMAP SC#4 cross-link cleanness: 4A's per-OEM Cause structure naturally produces per-OEM cross-links in both L1 and L2 (one Cause → one admin guide); 4B's symptom-routing requires multi-OEM cross-links per Cause
3. F-4B-MED-03 unrebutted: symptom-routing forces multi-Cause-row entries for the same OEM (Zebra under Cause A AND B), which sibling runbooks never do

**User's choice:** Option 4A selected by adversarial-review winner picking (tiebreaker on sibling-pattern fit + cross-link cleanness + unrebutted 4B duplication flaw).
**Notes (Referee implementation directive):** Departure rationales required in `45-PLAN.md`: (a) 5-OEM Cause partitioning vs sibling 4-failure-class precedent; (b) in-runbook OEM-identification step vs sibling no-pre-Cause-routing precedent. Cause E aggregate handling: NOT named "Cause F" but rendered as unnamed `## Escalation Criteria` H2 mirroring `27:206-234` and `28:190-225` exactly. Triage tree edit: single ANDR29 terminal (preserves Phase 40 D-05 LOCK + ROADMAP SC#4 verbatim wording); single Routing Verification table row update (`08-android-triage.md:100` "AOSP all paths" entry rewritten); NO new AND6 decision node. OEM identification is L1's first action INSIDE runbook 29 via `## How to Use This Runbook` H2 mirroring `27:30-39` structure.

---

## Claude's Discretion (per 45-CONTEXT.md decisions)

- Exact word counts within approximate envelopes
- Exact prose for PITFALL-7 framing pairings (per-claim discipline locked; phrasing is author's)
- Mermaid diagram inclusion in any per-OEM admin doc (e.g., RealWear Wi-Fi-QR-payload generation flow)
- `## See Also` cross-link composition
- Footnote text composition in `aosp-oem-matrix.md` per D-14
- Per-OEM `## Common Failures` H2 internal structure (table vs bullets vs sub-H3s)
- Frontmatter `applies_to` value for runbook 29 / 23 (`AOSP` is natural)
- Wave 2 `06-aosp-stub.md` collapse timing (planner can shift earlier if decoupled)

## Deferred Ideas

- DigiLens, Lenovo, Vuzix per-OEM AOSP coverage — v1.5+ (not in REQUIREMENTS.md scope)
- AOSP user-associated vs userless mode admin-guide-level disambiguation — v1.5 backlog
- AOSP harness mechanical checks (C7-equivalent for AOSP terms) — Phase 47 owns
- Vendor-proprietary MDM (ArborXR / ManageXR / Ivanti / Omnissa) deep coverage — Out of Scope locked
- Zebra MX schema deep documentation — Out of Scope locked
- Knox tablet / wearable / Galaxy XR per-OEM variants — future milestone
- 4-platform unified capability comparison (DEFER-08 / AECOMPARE-01) — v1.5
- Cross-platform nav unification (DEFER-07 / AENAVUNIFY-04) — v1.5
- Wi-Fi-embed QR generator UI walkthrough beyond Intune admin center steps — author's call per plan-time research
- Mermaid diagram in per-OEM admin docs — Claude's discretion

## Reviewed Todos (not folded)

None — `gsd-tools todo match-phase 45` returned 0 pending todos at discussion time (2026-04-25T05:42:56Z).

---

*Phase: 45-per-oem-aosp-expansion*
*Discussion logged: 2026-04-25*
*Method: 4-area 3-agent adversarial review (12 agents in 3 parallel waves) — winners 1B / 2B / 3B / 4A*
