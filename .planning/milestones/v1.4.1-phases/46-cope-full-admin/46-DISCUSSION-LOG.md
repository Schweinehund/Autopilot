# Phase 46: COPE Full Admin — Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in 46-CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-25
**Phase:** 46-cope-full-admin
**Areas discussed:** GA1 (H2 skeleton), GA2 (Android 15 Private Space callout), GA3 (COPE-vs-COBO decision matrix), GA4 (Knox/KME forward-link + capability matrix column placement + COBO migration text)
**Method:** 4-area 3-agent adversarial review (Finder / Adversary / Referee × 4 gray areas; 12 agents in 3 parallel waves of 4) per Phase 39/44/45 precedent.

---

## GA1 — H2 Skeleton for `08-cope-full-admin.md`

### Options presented (Wave 1 input)

| Option | Description | Selected |
|--------|-------------|----------|
| 1A | Mirror COBO 1:1 (originally framed as 15 H2s; Finder corrected to 11 actual COBO H2s) | ✓ (after Wave 3 synthesis with GA2) |
| 1B | Phase 45 11-H2 baseline (Scope and Status / Hardware Scope / Prerequisites / Enrollment Method / Provisioning Steps / Verification / Common Failures / Renewal-Maintenance / What Breaks / See Also / Changelog) | |
| 1C | Hybrid 17-18 H2s (COBO baseline + COPE-distinctive add-ons: COPE-vs-COBO matrix + Android 15 Private Space + WPCO Mechanics) | |
| 1D | Mirror COBO + 1 distinctive add-on H2 (Android 15 Private Space) = 12 H2s (proposed by Adversary; selected by GA1 Referee) | (overridden by GA1+GA2 synthesis) |
| 1E | Mirror COBO + 2 distinctive add-on H2s (Private Space + Decision Matrix) = 13 H2s (proposed by Adversary) | |

### Wave 1 Finder findings

- **1A:** 3 CRITs (premise miscount of 15→11; inconsistent enumeration; buries Private Space as H3). Strengths: maximum SC#1 compliance if baseline corrected; lowest sibling-departure cost.
- **1B:** 4 CRITs (Phase 45 baseline is per-OEM-AOSP-specific; no slot for COPE Migration Note; "Hardware Scope" makes no sense for hardware-agnostic COPE; no slot for Android 15 FRP/Private Space).
- **1C:** 2 CRITs (H2 count exceeds all shipped siblings; "WPCO Mechanics as own H2" is category error). Strengths: best SC#2 fit if H2 promotion is mandatory.

### Wave 2 Adversary verdicts

- F-1A-CRIT-02 DEFENDED — COBO already has `## COPE Migration Note` H2 (line 58); 1:1 mirror REPURPOSES the slot rather than adding a non-COBO H2.
- F-1C-CRIT-01 DISPROVEN — Knox ships 15 H2s; 1C's 17-18 only exceeds Knox by 2-3 (defensible with sibling-departure rationale per Phase 45 D-22 precedent).
- New options proposed: 1D (12 H2s, +1 add-on for Private Space), 1E (13 H2s, +2 add-ons).
- Net axis: fidelity-to-sibling vs novelty-prominence (NOT H2 count).

### Wave 3 Referee decision

**Initial winner: Option 1D (12 H2s).** Rationale: SC#2 "NEW for v1.4.1" qualifier carries reader-discoverability intent; Private Space deserves H2 promotion; sibling-departure rationale (Phase 45 D-22 precedent) absorbs the +1 H2.

**Synthesized winner (post GA1+GA2 reconciliation): True 1:1 mirror of COBO (11 H2s).** GA2's single-source-of-truth pattern (BYOD line 167 + version matrix already own Private Space content) eliminates the need for own-H2 Private Space treatment. The one-line `> ⚠️` callout in Key Concepts (per GA2 D-08) satisfies SC#2 via D-02 interpretation lock. Final H2 count matches COBO exactly; zero sibling-departure rationale required.

**User's choice:** Synthesized 1A (true 1:1 mirror, 11 H2s with one-line Private Space callout in Key Concepts).
**Notes:** Cross-area conflict between GA1 Referee's Option 1D selection and GA2 Referee's SSOT pattern resolved in favor of GA2 (single-source-of-truth eliminates drift surface; honest asymmetry — FRP gets H2 because it has admin actions, Private Space gets one-line callout because it has none).

---

## GA2 — Android 15 Private Space Callout

### Options presented (Wave 1 input)

| Option | Placement / Tone / Specificity | Selected |
|--------|--------------------------------|----------|
| 2A | Top-of-doc Scope-and-Status ⚠️ blockquote, terse 2-3 lines, link-only | |
| 2B | Own H2 between FRP and What Breaks Summary, ⚠️ admin-must-know tone, 5-8 lines | (Finder picked, Adversary disproved) |
| 2C | Inline H3 within Key Concepts, neutral feature documentation | |
| 2D | Own H2 with cross-platform iOS 18 Hidden Apps comparison, full 15-25 lines | |
| 2E | (Adversary-proposed) Glossary-anchored single-source-of-truth + COPE doc one-line forward-link | ✓ (combined with 2G) |
| 2F | (Adversary-proposed) Shared-explainer doc | (rejected — premature abstraction) |
| 2G | (Adversary-proposed) Hybrid: glossary + version-matrix breakpoint sub-section | ✓ (combined with 2E) |

### Wave 1 Finder findings

- **2A:** 2 CRITs (Scope-and-Status H2 venue collision; lossy SC#2 audit-grep).
- **2B:** ZERO CRITs declared by Finder — sibling Android 15 FRP H2 precedent at `03-fully-managed-cobo.md:168-195` matches exactly.
- **2C:** 3 CRITs (H3 buried inside Key Concepts is not a "callout" per local pattern; neutral tone contradicts admin-action signal; breaks sibling pattern).
- **2D:** 1 CRIT (cross-platform PRIMARY tone is pattern violation), 6 MEDs.

### Wave 2 Adversary verdicts (CRITICAL DISCOVERY)

Adversary surfaced existing project context Finder missed:
- `04-byod-work-profile.md:167` ALREADY contains: *"Android 15 introduced 'private space' as a personal-side feature; Intune does not manage private space content or visibility..."*
- `03-android-version-matrix.md:30` ALREADY has BYOD row entry: *"Android 15: Private Space unsupported"*

This invalidated Finder's "2B has zero CRITs" verdict. EVERY option above implicitly proposes a 3rd touchpoint without addressing single-source-of-truth (Pitfall 1: drift surface). 2B specifically: cargo-culting the FRP H2 fails because FRP has admin-actions/Intune-controls/What-Breaks rows and Private Space has NONE; would force fake "N/A" What-Breaks row that breaks the established pattern.

Adversary proposed 2E (glossary single-source) + 2G (version-matrix breakpoint) as the principled answer.

### Wave 3 Referee decision

**Winner: Option 2E+2G** (Glossary canonical entry + version-matrix breakpoint sub-section + one-line `> ⚠️` callout in COPE Key Concepts).

Tone framing locked: "user-controlled hidden profile partition on the personal side that Intune cannot manage." Rejected: "data-exfiltration vector" (FUD). Rejected: "personal-side feature" alone (admin-relevance understated).

**User's choice:** 2E+2G synthesis with BYOD line 167 retrofit IN-SCOPE for Phase 46 atomic same-commit. Capability matrix gets Private Space row across ALL Android columns as `N/A¹` with shared footnote (NOT COPE-only).
**Notes:** SC#2 "callout is present" interpretation locked at "a `> ⚠️` blockquote with forward-links satisfies"; the body of the callout does NOT have to live in COPE doc body. Precedent: `03-fully-managed-cobo.md:162` Samsung-admins callout is exactly this shape.

---

## GA3 — COPE-vs-COBO Decision Matrix Shape

### Options presented (Wave 1 input)

| Option | Shape | Selected |
|--------|-------|----------|
| 3A | Text decision tree (5-8 narrative bullets) | |
| 3B | 2-column Use-case → Mode table | |
| 3C | Full multi-row 4-mode comparison (5-7 rows × COBO/COPE/WPCO/BYOD) | (Adversary proposed re-scoping) |
| 3D | Hybrid: tree + table | |
| 3E | (Adversary-proposed) Compact 2-axis matrix (2 rows × 4 cols) | |
| 3F | (Adversary-proposed) 3-column corporate-only matrix (5 rows × COBO/COPE-WPCO; drops BYOD) | ✓ |

### Wave 1 Finder findings

- **3A:** 2 CRITs (SC#1 "matrix" wording isn't a tree; alleged duplication with `00-overview.md` Mermaid).
- **3B:** 1 CRIT (2-cols too thin for "matrix"); 6 MEDs (row-count creep, banned-phrase risk, weak cross-link, multi-mode-cell handling).
- **3C:** 2 CRITs (duplicates capability-matrix Enrollment H2 rows; BYOD column scope-misframing); 7 MEDs.
- **3D:** 2 CRITs (inherits 3C duplication; doubles maintenance).

### Wave 2 Adversary verdicts

- F-3A-CRIT-02 (Mermaid duplication) DISPROVEN — `00-overview.md` Mermaid is a setup-sequence flowchart (which guide to read), not a mode-decision tree (which mode to pick). Different artifact class.
- F-3A-CRIT-01 STRENGTHENED — sibling corpus uniformly maps "matrix" → tabular ≥3 cols (capability-matrix, aosp-oem-matrix, version-matrix all multi-col tables).
- F-3C-CRIT-01 STRENGTHENED — verified rows {provisioning methods, min Android, FRP behavior} ARE in `android-capability-matrix.md` Enrollment H2; 3C survives only if re-scoped to COPE-distinctive rows.
- F-3C-CRIT-02 DEMOTED to MED — BYOD is legitimate decision-point neighbor.
- New options: 3E (compact 2-axis) and 3F (3-col corporate-only with Knox-compatibility row).

### Wave 3 Referee decision

**Winner: Option 3F (3-col corporate-only matrix, 5 rows × 3 cols).**

Specification:
- **Lives in:** `docs/admin-setup-android/08-cope-full-admin.md` H2 anchor `#cope-vs-cobo-decision` (NOT a new shared file).
- **Columns:** `Decision factor` | `COBO (Fully Managed)` | `COPE (WPCO / Corp-Owned Work Profile)`
- **Rows (5):** Personal apps on the device / Profile boundary model / Android version floor for new provisioning / Samsung KME compatibility / Recommended for net-new in 2026
- **Knox row:** affirms KME→WPCO compatibility (no false-pin); cell phrasing makes WPCO-equivalence visible.
- **Banned-phrase guard:** positive-framing rule — recommend WPCO as the *provisioning name* per current Google guidance, never as a *replacement* for COPE.

**User's choice:** 3F (3-col corporate-only matrix, 5 rows). Migration story dropped as a row (belongs in `## COPE Migration Note` H2 narrative, not in the matrix).
**Notes:** SC#1 literal "matrix" requires tabular ≥3 cols per sibling corpus convention. WPCO-equivalence (per glossary `:75-77`) collapses what would otherwise be separate WPCO column into the COPE/WPCO single column header.

---

## GA4 — Knox/KME Forward-Link + Capability Matrix Column Placement + COBO Migration Text

### Options presented (Wave 1 input)

Composite gray area with 3 sub-decisions (α / β / γ).

| Option | α (Knox callout) | β (column placement) | γ (COBO migration text) | Selected |
|--------|------------------|----------------------|--------------------------|----------|
| 4A | α1 (parallel ⚠️ Samsung-admins callout) | β1 (between COBO and BYOD) | γ1 (preserve + append forward-link) | |
| 4B | α2 (no Samsung callout) | β3 (append after AOSP) | γ2 (full section replacement with 2-line redirect) | |
| 4C | α1 | β1 | γ3 (sentence-scoped trim of line 64 only) | ✓ (refined with WPCO-equivalence clarification) |
| 4D | α3 (light Knox cross-link in Prerequisites only) | β2 (between BYOD and Dedicated) | γ1 | |
| 4E | (Adversary-proposed) α2 + β1 + γ3 | | | (rejected — breaks Phase 44 reciprocal-pin discipline) |

### Wave 1 Finder findings

- **4A:** 2 CRITs (γ1 violates AECOPE-03 verbatim "REPLACE" verb; α1 alleged false-pin).
- **4B:** 3 CRITs (γ2 eliminates source-attribution + verification HTML comment; γ2 self-contradiction; β3 puts COPE after AOSP "stub").
- **4C:** 1 CRIT (alleged α1 false-pin).
- **4D:** 3 CRITs (γ1 violates "REPLACE"; α3 same false-pin; β2 grouping rationale rests on COPE/WPCO name-mode mismatch).
- Cross-option observation: α2+βX+γ3 combination genuinely missing.

### Wave 2 Adversary verdicts (CRITICAL DISPROVE)

Most consequential disprove: Finding B (α1 = false-pin) DISPROVEN. Evidence:
- `_glossary-android.md:71`: "WPCO, **formerly COPE**"
- `_glossary-android.md:75-77`: "WPCO is the **successor pattern to COPE** — same 'corporate device with personal-use partition' shape"
- `_glossary-android.md:98`: "KME provisions Samsung devices into ... COBO / Dedicated / **WPCO** modes"
- `07-knox-mobile-enrollment.md:16, 61, 72`: KME EMM profile mode dropdown explicitly offers WPCO

Conclusion: WPCO and COPE are project-canonical equivalents. KME provisions into WPCO. A forward-link from COPE doc to KME doc is operationally accurate for Samsung readers, NOT a false pin. Adversary recommended reframing α1 callout to explicitly note WPCO-equivalence.

Other strengthens:
- AECOPE-03 verbatim REPLACE verb is sentence-scoped (γ3 best satisfies; γ1 appends; γ2 over-replaces and strips verification HTML comment).
- β1 wins ownership×scope ordering vs `android-capability-matrix.md:15` column header order.
- Cross-Platform Equivalences section is 2-col iOS↔Android pairing, NOT per-mode-column extension; column add does NOT mechanically require new paired rows.
- Phase 44 reciprocal-pin discipline requires Samsung pin in any new corporate-owned-mode admin doc.

### Wave 3 Referee decision

**Winner: Option 4C-refined (α1-WPCO + β1 + γ3).**

- **α1 callout (Samsung-admins) with WPCO-equivalence clarification** placed under `### Zero-Touch` H3 of `## Provisioning method choice`, mirroring `03-fully-managed-cobo.md:162`. Includes verbatim sentence: "KME provisions Samsung corporate-owned-with-work-profile devices into the **WPCO** mode in the Knox EMM profile dropdown — WPCO is Google's modern terminology for the same deployment shape this guide calls COPE."
- **β1 column placement:** insert COPE between COBO and BYOD. New order: COBO | COPE | BYOD | Dedicated | ZTE | AOSP. All 5 capability H2 sub-tables receive COPE column in same atomic commit.
- **γ3 sentence-scoped trim:** replace ONLY line 64 of `03-fully-managed-cobo.md`. Lines 58-63 (WPCO-direction paragraph) and 65-66 (verification HTML comment with `last_verified: 2026-04-21`) PRESERVED.
- **Cross-Platform Equivalences:** ZERO new paired rows for COPE (WPCO has no iOS/macOS/Windows analog per glossary `:79`).
- **Atomic same-commit:** AECOPE-01 + -02 + -03 + -04 + BYOD line 167 retrofit + version-matrix breakpoint H3 = ONE commit per D-23.

**User's choice:** 4C-refined.
**Notes:** Phase 44 reciprocal-pin discipline EXTENDED to COPE/WPCO admin doc as third Samsung-admin reading-path node (after COBO `:162` and KME doc `:14`). WPCO-equivalence clarification converts the binary include/exclude pin debate into a phrasing precision deliverable.

---

## Claude's Discretion

The following items were deferred to the planner per `46-CONTEXT.md` Claude's Discretion section:
- H3 sub-skeleton inside each H2 (planner inspects COBO H3s and proposes COPE-equivalents).
- Anchor IDs for new H2/H3s not covered by D-07 (planner picks following sibling convention).
- `## See Also` link list contents (planner enumerates per AECOPE-02/03/04 cross-references).
- `## Changelog` initial entry wording (planner discretion within v1.4.1 release entry shape).
- `## What Breaks Summary` entry count and ordering (planner maps COPE-specific failure modes).
- `## Provisioning method choice` decision-matrix table format (planner picks placement per D-05 reconciliation).
- Exact word counts within ~2000-3000 envelope.
- Frontmatter `last_verified` date (set at execute time).

## Deferred Ideas

- **Audit harness C9 banned-phrase check sidecar JSON** — Phase 47 AEINTEG-02 owns; Phase 46 enforcement at-author-time only.
- **L1/L2 runbooks for COPE-specific failure modes** — REQUIREMENTS.md AECOPE-01..04 omits runbooks; route to v1.5 if needed.
- **4-platform unified capability comparison doc** — DEFER-08 / AECOMPARE-01, routed to v1.5.
- **Cross-platform nav unification** — DEFER-07 / AENAVUNIFY-04, routed to v1.5.
- **WPCO-as-separate-glossary-entry distinction** — corpus already collapses COPE↔WPCO; out of scope for any future phase.
- **Same-phase shared-file `cope-vs-cobo-decision.md`** — D-14 explicitly REJECTED in favor of in-doc H2.
- **Cross-platform analog row in capability matrix for COPE/WPCO** — D-22 NO new paired row; WPCO has no iOS/macOS/Windows analog.
- **What-Breaks Summary table row for Private Space** — D-08 REJECTS (no admin lever to break).

---

*Audit trail generated: 2026-04-25*
*Method: 4-area 3-agent adversarial review (12 agents in 3 parallel waves of 4)*
*Final per-area winners: GA1=1A-true-mirror (synthesized) / GA2=2E+2G / GA3=3F / GA4=4C-refined*
