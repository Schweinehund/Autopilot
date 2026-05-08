# Phase 59: Hub Navigation Integration — Linux + Operations Sections - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-01
**Phase:** 59-hub-navigation-integration-linux-operations-sections
**Areas discussed:** GA-1 docs/index.md Linux H2 sub-table shape; GA-2 docs/index.md Operations H2 structure + position + naming + ops/00-index.md scope; GA-3 CLEAN-08 glossary see-also normalization pattern + scope + reciprocity + 5-platform framing; GA-4 Linux quick-ref-l1/l2 sections
**Methodology:** Per user instruction, all 4 gray areas adjudicated via 12-agent adversarial-review (4 Finder + 4 Adversary + 4 Referee, 3 parallel waves). Each Referee delivered scored verdicts with 2x penalties for fabricated evidence and recommended D-NN format decisions for direct CONTEXT.md transcription.

---

## GA-1 — docs/index.md Linux H2 sub-table shape

| Option | Description | Adversarial Score | Selected |
|--------|-------------|-------------------|----------|
| 1A | Pure Phase 57 Android mirror — 3 sub-tables (L1=4 / L2=4 / Admin=3); LIN-06 end-user guide → Cross-Platform References ONLY | **1** | ✓ STRONG winner |
| 1B | 3 sub-tables matching 1A, BUT fold LIN-06 end-user guide into Admin sub-table as 4th row | 26 (incl. 2x fab penalty for "ONLY platform" claim) | |
| 1C | 4 sub-tables (L1 / L2 / Admin / End-User) — break Phase 57 3-sub-table precedent | 42 | |
| 1D | 2 sub-tables — collapse L1/L2 into single "Service Desk" sub-table | 59 | |

**User's choice:** 1A (via Adversarial Referee verdict — explicitly delegated by user)
**Notes:** Pure Phase 57 mirror. ROADMAP:381 mandates "same sub-table structure as Android H2 from Phase 57"; verified Android = 3 sub-tables L1=4 / L2=4 / Admin=3. 1B carried 2x fabrication penalty for "Linux is the ONLY platform with a dedicated end-user enrollment guide" claim (verified false: `docs/end-user-guides/android-work-profile-setup.md` exists yet was deliberately excluded from Phase 57 hub surfacing). 1C and 1D both committed CRITICAL verbatim violations of SC#1 enumeration ("Service Desk L1 / Desktop Engineering L2 / Admin Setup sub-tables" — three named sub-tables). 1D's runbook-volume rationale was empirically invalid (Android L1 sub-table has 4 rows despite 8 underlying L1 runbooks; sub-table row count is independent of underlying runbook count).

---

## GA-2 — docs/index.md Operations H2 structure + position + naming + operations/00-index.md scope

| Option | Description | Adversarial Score | Selected |
|--------|-------------|-------------------|----------|
| 2A | Position after Android H2; Name "Operations"; single 4-row table; ops/00-index.md DEFERRED to Phase 60/61 | 13 | |
| 2B | Position after Android H2; Name "Operational Depth"; 4 sub-H3 with wide 5-platform-column tables; ops/00-index.md filled same-commit | 50.5 | |
| 2C | Position after Android H2; Name "Operations"; 4 sub-H3 compact (overview link + per-platform 1-line summary); ops/00-index.md MUST be completed same-commit | **0** | ✓ VERY HIGH winner |
| 2D | Position EARLIER (between platform H2s and Cross-Platform References); Name "Operations"; 4 sub-H3 compact; ops/00-index.md left as-is | 25 | |

**User's choice:** 2C (via Adversarial Referee verdict)
**Notes:** All 4 of 2C's alleged defects were disproven by direct file evidence (GFM produces distinct anchors so no H3 collision with line-85 Device Operations; line-214 points to reference/00-index.md so no operations/ duplication; sub-dir blockquotes are 9-12 lines while hub-row 1-line summaries are not duplication; "moderate validator complexity" is the expected baseline per Phase 56-58 V-NN counts). 2A and 2D both DEFER ops/00-index.md amendment despite the explicit DPO-Phase56-01 hand-off chain (Phase 56-VERIFICATION:192/229 verbatim "Phase 59 owns hub integration" / "Phase 59 amends it"; Phase 60 = harness finalization, Phase 61 = milestone close, NEITHER owns ops-index amendment). Adversary received 2x penalty for incorrect PITFALL-7-disproof on 2B-4 (PITFALL-7 architectural intent applies to comparison-style cells regardless of doc location per Phase 58 D-17 referee verification) and incorrect process-defect rejection on 2D-1/2D-2 (append-only H2-block contract LOCKS H2 ordering at ROADMAP:379; "EARLIER" violates this — mechanical defect, not process artifact). 2B's "Operational Depth" naming violated SC#1 verbatim ("Operations H2 section") by substituting the PROJECT.md PILLAR-3 milestone-narrative term.

---

## GA-3 — CLEAN-08 glossary see-also normalization pattern + scope + reciprocity + 5-platform framing

| Option | Description | Adversarial Score | Selected |
|--------|-------------|-------------------|----------|
| 3A | Top-N collision terms only (~6-12 terms); `**See also:**` line at end of entry; bidirectional reciprocity validator-enforced; 4-file = 5-platform-equivalent; existing `> Cross-platform note` blockquotes UNTOUCHED | 13.5 (incl. Adversary 2x fab penalty for AST-parsing claim) | |
| 3B | Every term with cross-platform analog (~25-40 terms); REPLACES existing blockquotes | 31 | |
| 3C | New `### See Also` H3 per glossary collecting cross-platform-equivalent terms in bottom-of-glossary table | 11 | |
| 3D | Spin out separate `_glossary-ios.md` (5 files = 5 platforms literal); `**See also:**` lines per collision term | 40 | |
| 3E | Top-N collision terms; pattern = inline links INSIDE existing `> Cross-platform note` blockquotes (smallest footprint); soft-contract reciprocity | **4.5** | ✓ HIGH winner |

**User's choice:** 3E (via Adversarial Referee verdict)
**Notes:** 3E piggybacks on the existing dominant blockquote pattern (Android 23 `> **Cross-platform note:**`, macOS 11 `> **Windows equivalent:**`, Linux 10 `> **Cross-platform note:**`) instead of inventing new structural surface. The "soft-contract" weakness was downgraded to LOW because Phase 59's own check-phase-59.mjs validator IS the rescue path (AUDIT-06 each-phase-owns-its-own-validator architecture; no Phase 60 dependency required per D-19). 3D loses catastrophically (40 pts) on the architectural reversal of REQUIREMENTS:144 ("iOS terminology lives inside `_glossary-macos.md`"); spinning out `_glossary-ios.md` would require re-pointing 81 anchor references across 35 files PLUS splitting 7 of 11 Apple H3 entries that are inherently dual-platform (Account-Driven UE, ADE, Supervision, ABM, ABM Token, APNs, VPP — verified by reading entry text). 3B loses second-worst (31) by destroying ~33 prose blockquotes containing irreplaceable disambiguation context (e.g., COBO line 90 "Mapping is partial — do not conflate", APNs line 70 "Critical cross-platform blast radius" callout). Adversary received 2x penalty for fabricated "validators use AST/markdown-link parsing" claim — verified false: every check-phase-NN.mjs uses `fs.readFileSync` + regex only, no markdown AST anywhere in scripts/validation/.

---

## GA-4 — Linux quick-ref-l1/l2 sections (REFEREE FLIPPED Finder's pick)

| Option | Description | Adversarial Score | Selected |
|--------|-------------|-------------------|----------|
| 4A | Pure Phase 57 Android mirror — 4 sub-H3 in L1 + 4 sub-H3 in L2; drop Mode-tag prefixes; L2 sub-H3 #3 = 4-row Linux Compliance Category Reference replacing Android Play Integrity Verdict Reference slot | **3** | ✓ HIGH winner (Referee FLIP) |
| 4B | Mirror Phase 57 + substitute distro-tag prefixes [22.04]/[24.04]/[All] in L1 Top Checks; L2 same as 4A | 15 | |
| 4C | Mirror Phase 57 but reduce L2 to 3 sub-H3 (drop verdict-equivalent slot due to alleged PITFALL-7 violation); L1 unchanged 4 sub-H3 | 6 | |
| 4D | Both L1 and L2 trimmed to 3 sub-H3 (L1 drops Decision Tree sub-H3); justification "thin runbook surface" | 22 | |

**User's choice:** 4A (via Adversarial Referee verdict — Referee FLIPPED Finder's initial 4C pick)
**Notes:** This is the only GA where Referee disagreed with Finder. Pivotal defect was 4A-D1 (alleged PITFALL-7 violation by Linux Compliance Category Reference table). Adversary's reframing was upheld by Referee: Phase 57 D-22..D-25 verbatim ENDORSE the 3-row pointer table with cross-link as the canonical PITFALL-7-COMPLIANT shape (verified at quick-ref-l2.md:261-271 Android Play Integrity Verdict Reference); a 4-row Linux Compliance Category Reference (Category | 1-line role | cross-link to admin-setup-linux/03-compliance-policy.md anchor) mirrors this EXACT endorsed shape, not the violation. Finder conflated "having a table" with "duplicating verdict meaning." Even before PITFALL-7 reframing, 4C carries an unavoidable SC#4 "matching structural depth" violation (3-sub-H3 L2 vs iOS/Android 4-sub-H3); 4A satisfies SC#4 verbatim. 4D loses 22 pts on dual L1+L2 four-part-lock violations + LINCA disambiguation removal (verified at 09-linux-triage.md:34 LINCA diamond + line 50 pitfallCallout class — non-trivial PITFALL-2 routing). 4B's distro-tag substitution is vacuous (intune-portal behaves identically across 22.04/24.04 LTS for L1 Top Checks).

Both Finder and Adversary fabricated minor evidence on Linux compliance category count (Finder said 5; Adversary said "frontmatter-vs-body contradiction"). REQUIREMENTS:27 LIN-04 + admin-setup-linux/03-compliance-policy.md:9 frontmatter both authoritatively state **4 categories** (Allowed Distributions / Custom Compliance / Device Encryption / Password Policy). 4A's "4-row" claim is the SSoT-correct count.

---

## Claude's Discretion

- Specific phrasing of the 1-sentence sub-H3 framings under Operations H2 (recommended literals provided in CONTEXT specifics)
- Specific row counts in Operations sub-tables (bounded 1-3 rows per sub-H3)
- Selection of which 1-2 rows per Operations sub-H3 link to per-platform deep guides vs only sub-dir overview
- Order of plans within Phase 59 (8-9 plan decomposition is a recommendation; plan-author may interleave)
- Specific phrasing of 1-line "role" descriptions in Linux Compliance Category Reference
- Selection of which Intune admin center portal paths to include in Key Intune Portal Paths (Linux L2) sub-H3 (3-5 rows)
- Whether to update `_glossary-macos.md` H1 framing for iOS-coverage clarity (informational, not required)
- Whether to add an additional Cross-Platform References row pointing to `operations/00-index.md` (informational, not required)

## Deferred Ideas

- Dedicated `windows-capability-matrix.md` (already deferred to v1.6+ per Phase 58 D-10)
- Phase 60 promotion of see-also reciprocity check (Phase 59 own validator suffices)
- `_glossary-ios.md` spinout (REJECTED in GA-3 3D=40pts loser; architectural reversal of REQUIREMENTS:144)
- Surfacing end-user enrollment guides at hub level (Phase 57 + D-06 Linux end-user guide exclusion)
- macOS `> Cross-platform note:` blockquote shape normalization (preserve Phase 23-24 mature prose; v1.6+ cleanup)
- Operations H2 platform-applicability blockquotes per sub-H3 (use 1-sentence framings; bounded budget)
- Common-issues.md Linux section (out-of-scope per ROADMAP Phase 59 SCs; v1.6+ candidate)
