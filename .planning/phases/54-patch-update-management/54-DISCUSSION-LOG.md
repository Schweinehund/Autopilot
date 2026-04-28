# Phase 54: Patch & Update Management - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-28
**Phase:** 54-patch-update-management
**Areas discussed:** GA-1 (00-overview scope shape), GA-2 (cross-platform routing pattern), GA-3 (PATCH-06 iOS retrofit target), GA-4 (deadline/deprecation callout shape)
**Methodology:** Adversarial review (Finder / Adversary / Referee scored pattern) — 12 agents across 4 gray areas (4 Finder + 4 Adversary + 4 Referee, dispatched in 3 sequential parallel waves) per project owner's invocation `For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning`.

---

## GA-1: 00-overview.md scope shape

**Question:** What scope shape should `docs/operations/patch-management/00-overview.md` have? Phase 53's 00-overview was Windows-content concept hub for one platform; Phase 54 spans 4 platforms.

| Option | Description | Selected |
|--------|-------------|----------|
| 1A | Pure cross-platform comparison summary table (1-row-per-platform with mechanism / state / deadlines / cross-link columns); minimal prose; ~80-150 lines | |
| 1B | Pure index/router (one paragraph per platform with cross-link only; minimal content); ~40-80 lines | |
| 1C | Concept-terminology hub (defines deferral vs enforcement vs cadence; PITFALL-9 ring disambiguation H2 lives here; cross-platform context elsewhere); ~150-250 lines | |
| 1D | Hybrid (concept terminology section + cross-platform comparison table + per-platform routing); ~200-350 lines | ✓ |

**Defect scoring (Finder):** 1A=26, 1B=25, 1C=15, 1D=12.
**Adversary disproves on 1D:** F-1D-02 (table-shape collision; categorically different shapes), F-1D-03 (PITFALL-13 token-density misapplied), F-1D-05 (REQ traceability is anti-scope-creep firewall) — net +7 disprove credit.
**Referee verification:** F-1D-02 verified via direct read of `operations/00-index.md` (2-column "Guide | Covers" file→description) vs Phase 54 cross-platform comparison (N-column concept × platform matrix) — categorically different. F-1D-03 verified via `check-phase-53.mjs:391` (V-53-25 scans TBD/TODO/FIXME/XXX/PLACEHOLDER, NOT "deprecated"); 53-CONTEXT line 53 explicitly defers PITFALL-13 lazy-add. F-1D-05 verified via REQUIREMENTS lines 161-168 — zero PATCH-NN mapped to 00-overview.md.

**User's choice (via adversarial-review):** **1D (Hybrid)**
**Surviving defect score:** 5 points (F-1D-01 MED shape-drift + F-1D-04 LOW validator overhead + F-1D-06 LOW two-surface coordination)
**Notes:** Plan author for 54-01 must implement: (a) cross-platform comparison table (4 platforms × 5+ concept rows); (b) PITFALL-9 ring-disambiguation H2 with mutual-exclusion narrative; (c) deferral-vs-enforcement terminology section; (d) routing cross-links to 01-04. Size budget 200-350 lines. NEGATIVE regression-guard: NO Hotpatch/VBS/MEETS_STRONG_INTEGRITY substantive content (REQ traceability firewall via V-54-29).

---

## GA-2: Cross-platform routing pattern across per-platform files (01-04)

**Question:** Each per-platform file (01-windows / 02-macos / 03-ios / 04-android) is single-platform. Should they carry cross-platform routing inline, or only via centralized 00-overview?

| Option | Description | Selected |
|--------|-------------|----------|
| 2A | Phase 53 D-08 inheritance: inline `> **Platform applicability:**` blockquote at TOP of every file with full cross-link routing to other platforms' files (analog of REQ-COMG-04 shape) | |
| 2B | NO inline routing; all cross-platform routing centralized in 00-overview only; per-platform files have no platform applicability blockquote | |
| 2C | Hybrid: simple `> **Platform:** X` blockquote at top of each file + back-link to 00-overview ("see Operations Index for cross-platform comparison") | |
| 2D | Phase 51 D-08 platform-gate banner pattern (rejected in Phase 53 D-08 for admin audience; revisit for Phase 54) | |
| 2B-prime | **Refinement of 2B + 2C:** reuse Phase 53 D-08 `> **Platform applicability:**` token verbatim on each per-platform file (NOT bare-noun `> **Platform:**`); blockquote contains brief platform identifier + back-link to 00-overview + sub-bullets to sibling files (pointer-routing only; no full cross-platform comparison content) | ✓ |

**Defect scoring (Finder):** 2A=23 (REQ traceability gap + PITFALL-9 collision), 2B=12, 2C=12 (tied with 2B), 2D=21 (Phase 53 D-08 admin-audience rejection precedent).
**Adversary disproves:** F-2B-03 partial (DPO-Phase53-02 softer than Finder framed; MED→LOW; -2); F-2C-01 full disprove proposed (+3); F-2C-03 partial (D-08 implementation embeds cross-platform routing on platform-named files; MED→LOW; -2). Adversary recommended winner change to **2C** at 7 points.
**Referee verification — CRITICAL:** Adversary's claim that bare `> **Platform:**` is "member of v1.5 methodology family" was REFUTED by direct corpus scan: 28+ instances of `> **Platform <qualifier>:**` (applicability / gate / coverage / note) and ZERO instances of bare `> **Platform:**`. F-2C-01 stays at MED. 2B and 2C tied at 11 each after Referee rulings; tie-break favored 2B because mitigation is additive (add per-file blockquote using established token = 2B-prime), while 2C's surviving MED requires forking the methodology family. **2B + Phase 53 D-08 token reuse = 2B-prime.**

**User's choice (via adversarial-review):** **2B-prime (centralized routing in 00-overview + per-file `> **Platform applicability:**` blockquote with pointer-routing payload)**
**Surviving defect score:** 11 points (F-2B-01 MED + F-2B-02 MED + F-2B-03 LOW + F-2B-04 LOW + F-2B-05 LOW + F-2B-06 LOW)
**Notes:** Each per-platform file carries `> **Platform applicability:**` blockquote at line 9 (post-frontmatter). Content: brief platform identifier + back-link to `00-overview.md` + ≤3 sub-bullets pointing to other 3 sibling per-platform files. Bare `> **Platform:**` is FORBIDDEN — V-54-27 NEGATIVE regression-guard enforces.

---

## GA-3: PATCH-06 v1.3 iOS retrofit target file resolution

**Question:** ROADMAP/REQ literal `05-compliance-policy.md` is off-by-one (actual file at slot 05 is `app-deployment.md`; compliance-policy is at index 06). The supervised-only-DDM constraint may already be CORRECTLY stated in `04-configuration-profiles.md:128`. Where exactly does the PATCH-06 retrofit land?

| Option | Description | Selected |
|--------|-------------|----------|
| 3A | Retrofit `06-compliance-policy.md` (treat REQ literal as off-by-one; add positive DDM-on-unsupervised statement) | |
| 3B | Retrofit `04-configuration-profiles.md:128` only (already substantively correct; verify wording + add forward-link to new iOS lifecycle guide) | |
| 3C | Retrofit BOTH `06-compliance-policy.md` AND `04-configuration-profiles.md` (compliance gets new positive callout + config-profiles cross-links forward) | |
| 3D | Forward-link only (cross-link from 04:128 to new `03-ios-update-lifecycle.md`; NO compliance-policy edit) | |
| 3B-with-addendum | **3B refined**: retrofit `07-device-enrollment.md:35` (the actual residual supervised-only-DDM-shaped claim; off-ballot Referee resolution) + REQ/ROADMAP errata + `04-configuration-profiles.md:128` PITFALL-13 forward-link | ✓ |

**Defect scoring (Finder):** 3A=23, 3B=10, 3C=21, 3D=21.
**Adversary disproves on 3B:** F-3B-01 disproved (+5; addendum closes literal mismatch), F-3B-02 disproved (+1; verb satisfied by 07:35 cell edit), F-3B-03 disproved (+1; validator pins 3 coordinates), F-3B-04 disproved (+3; addendum applies). All 4 contested defects rebutted. Net +10.
**Referee verification — CRITICAL FILE-SYSTEM FINDINGS:**
- `06-compliance-policy.md` full-file scan: ZERO supervised-only-DDM claim. Line 27 only "supervised" mention is about Block App Store, NOT DDM updates. Line 25 already says "DDM-based on iOS 17+" without supervised qualifier. **No retraction needed in 06.**
- `04-configuration-profiles.md:128` already substantively correct. Forward-link addition is reader-friction reduction, NOT content retraction.
- `07-device-enrollment.md:35` cell verbatim: `| OS update enforcement (forced install deadlines via DDM or device restrictions) | **No** | Supervised-only in iOS 17+ enforcement policies. |` — **THIS is the actual residual contradiction.** Direct contradiction of PATCH-05 retraction.
- REQ literal off-by-one is 3-way replicated (REQUIREMENTS:55, REQUIREMENTS:166, ROADMAP:267).
- RETROSPECTIVE.md line 166 verbatim "Atomic same-commit forward-promise closure beats deferred retrofits. Validated 6× in v1.4.1."

**User's choice (via adversarial-review):** **3B-with-addendum (off-ballot Referee resolution: retrofit `07-device-enrollment.md:35` + REQ/ROADMAP errata + 04:128 forward-link, all same-commit-atomic with new `03-ios-update-lifecycle.md`)**
**Surviving defect score:** 0 points (all 4 contested defects rebutted; F-3B-05 + F-3B-06 are positive notations)
**Notes:** Plan author for 54-06 + 54-07 + 54-08 must:
- Edit `07-device-enrollment.md:35` cell to retract "Supervised-only in iOS 17+ enforcement policies"; replace with DDM-on-unsupervised-iOS-17+ correction + cross-link to `03-ios-update-lifecycle.md`
- Append PITFALL-13 forward-link sentence at `04-configuration-profiles.md:128` (preserve existing line byte-identical)
- Land REQ + ROADMAP errata: replace `05-compliance-policy.md` literal with `07-device-enrollment.md` at REQUIREMENTS:55, REQUIREMENTS:166, ROADMAP:267
- All in single atomic commit with new `03-ios-update-lifecycle.md` per ROADMAP:271 + v1.4.1 RETROSPECTIVE line 166 atomicity lesson

---

## GA-4: Deadline/deprecation callout shape per platform file

**Question:** Multiple time-sensitive items: macOS Apple OS 26 legacy MDM removal, iOS Aug 2025 unsupervised DDM retraction, Android MEETS_STRONG_INTEGRITY (May 2025 / Sept 30 2025 / Oct 31 2026 hard deadline), Hotpatch May 2026 default, Zebra LifeGuard Jan 2026 GA. What callout shape carries these?

| Option | Description | Selected |
|--------|-------------|----------|
| 4A | Centralized H2 "Deadlines & Cutover Dates" section per platform file (single H2 per file listing all dates as structured table) | |
| 4B | Per-occurrence inline `> ⚠️` callout at first reference of each deadline; no centralized section | |
| 4C | Three-layer callout (Phase 53 D-05 / Phase 52 D-01 inheritance) for HARD-DEADLINE items only (Android MEETS_STRONG_INTEGRITY + macOS Apple OS 26 removal); softer deadlines get standard inline callout | |
| 4D | Frontmatter `valid_as_of: YYYY-MM-DD` pin + 60-day `last_verified` only (no special callout pattern) | |
| 4A+4C-hybrid (4E) | **Hybrid:** Per-platform Deadlines H2 differentiated by content density: Windows NO H2 (Hotpatch H2 absorbs); macOS+Android YES dedicated H2; iOS single inline blockquote. Hard-deadline items (Android MEETS_STRONG_INTEGRITY Oct 2026 + macOS Apple OS 26 removal) get full Phase 53 D-05 three-layer treatment. Soft cutovers (Hotpatch May 2026, LifeGuard Jan 2026 GA, iOS Aug 2025 retraction) get single-callout treatment. | ✓ |

**Defect scoring (Finder):** 4A=10, 4B=16 (Phase 53 D-05 inheritance violation for Android hard deadline), 4C=12, 4D=19 (SC#2/3/4 violations + validator-impossible + PATCH-02 H2 conflict).
**Adversary disproves on 4A:** F-4A-02 disproved (+3; SC#2 verb is "understands" not "every-occurrence-adjacent"), F-4A-03 disproved (+3; PATCH-02 Hotpatch H2 doesn't prevent additional H2s; Phase 53 D-05 endorses content-repetition across layers), F-4A-05 partial (+1; trivial cost). Cross-check on 4C: F-4C-02 disproved (+3; Phase 53 D-05 reused Phase 52 D-01 same-shape with no collision objection — same-shape across phases is endorsed precedent), F-4C-04 partial (+1; 12-18 V-NN below Phase 52/53 floor of 22-26). Net +11.
**Referee ruling:** F-4A-02 disprove sustained. F-4A-03 PARTIALLY confirmed (Windows redundancy real because PATCH-02 Hotpatch H2 already absorbs Windows soft cutovers May 2026 + April 2026 by REQ design). F-4C-02 + F-4C-04 disproves sustained. **Final: 4A+4C-hybrid (4E)** — differentiated per-file H2 + three-layer for hard-deadline items only.

**User's choice (via adversarial-review):** **4A+4C-hybrid (4E)**
**Surviving defect score:** ~3.5 points
**Notes:** Per-file decision matrix (D-12):
- `01-windows-wufb-rings.md`: NO Deadlines H2 (Hotpatch H2 absorbs)
- `02-macos-update-enforcement.md`: YES dedicated `## Deadlines & Cutover Dates` H2 + Apple OS 26 removal three-layer (Layer 1 cell `**[HARD-DEADLINE]**` + Layer 2 `> ⚠️ **Hard deadline (Apple OS 26):**` blockquote + Layer 3 ≥2 inline reminders)
- `03-ios-update-lifecycle.md`: NO H2 (single inline `> ⚠️` blockquote at supervised-only retraction site)
- `04-android-patch-delivery.md`: YES dedicated `## Deadlines & Cutover Dates` H2 + MEETS_STRONG_INTEGRITY Oct 2026 three-layer + LifeGuard Jan 2026 GA + Samsung KSP as table rows (soft cutovers; no three-layer)
- Frontmatter `valid_as_of` SKIP (reuse `last_verified` 60-day cycle per Phase 49+ lineage)
- PITFALL-13 allowlist seeding DEFERRED per Phase 48 D-15 + Phase 53 D-06 YAGNI inheritance

---

## Claude's Discretion (CD-NN items)

- CD-01: 00-overview platform-tag (recommended `cross-platform`)
- CD-02: per-file blockquote sub-bullet wording
- CD-03: cross-platform comparison table column count (4-platform × 5+ rows minimum)
- CD-04: Mermaid diagram in 00-overview (optional)
- CD-05: PITFALL-9 ring-disambiguation H2 placement order in 00-overview
- CD-06: macOS Apple OS 26 Layer 2 blockquote exact wording
- CD-07: Android MEETS_STRONG_INTEGRITY Layer 2 blockquote exact wording
- CD-08: Cross-platform pointer rows in macOS/Android Deadlines H2s
- CD-09: 07-device-enrollment.md:35 cell post-edit exact wording
- CD-10: 03-ios-update-lifecycle.md `> ⚠️` blockquote framing
- CD-11: 00-overview audience tag (admin vs admin,L2)

## Deferred Ideas

- `c10_ops_allowlist[]` / `c11_patch_deadline_allowlist[]` sidecar entries — Phase 60 lazy-add
- Mermaid diagrams in 00-overview — author discretion
- Phase 58 Software Updates row consumes Phase 54 anchors (link-not-copy per PITFALL-7)
- Phase 55 APP-04 + Phase 56 DRIFT-02 cross-references
- Phase 59 hub navigation (Phase 59 ownership; Phase 54 untouched)
- Phase 60 CI registration of `check-phase-54.mjs`
- CD-12 PITFALL-9 plural-form ring qualifier discipline (recommended: require literal `WUfB deployment ring(s)`)
