# Phase 20: Cross-Platform Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-13
**Phase:** 20-cross-platform-foundation
**Areas discussed:** Platform comparison page, Glossary integration, Navigation restructure, macOS admin template
**Method:** Adversarial review (Finder/Adversary/Referee pattern) for all 4 areas

---

## Platform Comparison Page (XPLAT-01)

| Option | Description | Selected |
|--------|-------------|----------|
| A: Single feature table | Table-based concept mapping matching apv1-vs-apv2.md pattern, with Diagnostic Tools subsection below | **Selected** |
| B: Stage-by-stage lifecycle flow | Side-by-side provisioning stage comparison | |
| C: Concept-mapping hybrid | Quick-ref table + detailed sections | |

**User's choice:** Option A — Single feature table with diagnostic tools subsection
**Notes:** Adversarial review confirmed 0 critical, 1 medium, 2 low issues for Option A vs 1 critical for B (lifecycle stages don't map) and scope-boundary risk for C. The existing apv1-vs-apv2.md proves the table pattern works. Medium issue (diagnostic tools don't fit cells) solved by adding subsection.

---

## Glossary Integration (XPLAT-02)

| Option | Description | Selected |
|--------|-------------|----------|
| A: Interspersed | macOS terms mixed into existing categories | |
| B: Platform-labeled sections | ### Windows / ### macOS within each category | |
| C: Separate macOS glossary file | New _glossary-macos.md with cross-links | **Selected** |

**User's choice:** Option C — Separate macOS glossary file
**Notes:** Adversarial review confirmed Option C has fewest issues (1 medium, 1 low). Zero risk to existing 98 inbound links. Option A had category mismatch (macOS terms don't fit Windows categories). Option B had critical anchor collision from repeated headings.

---

## Navigation Restructure (NAVX-01)

| Option | Description | Selected |
|--------|-------------|----------|
| A: Single index.md with platform headings | ## Windows / ## macOS headings with anchor selector at top | **Selected** |
| B: Separate platform landing pages | Split into platform chooser + platform-specific index files | |
| C: Anchor-based selector | Same as A but described as "selector" | |

**User's choice:** Option A — Single index.md with platform headings
**Notes:** Adversarial review confirmed Option A has 0 critical/high/medium issues. Anchor slugs derive from heading text not level, so demoting ## to ### preserves all existing anchors. Option B breaks all 30+ relative links and all bookmarks (violates constraint). Option C is functionally identical to A.

---

## macOS Admin Template (XPLAT-03)

| Option | Description | Selected |
|--------|-------------|----------|
| A: Minimal divergence | Same structure, swap ESP→Setup Assistant, add ABM paths | |
| B: Moderate divergence | "In ABM"/"In Intune" sub-sections, renewal section, portal-specific verification | **Selected** |
| C: Shared base + extensions | base-admin-template.md + platform-specific extensions | |

**User's choice:** Option B — Moderate divergence with portal-scoped sections
**Notes:** Adversarial review confirmed Option B has 0 critical issues vs 1 critical for A (dual-portal can't fit single-portal format) and 2 critical for C (unenforced inheritance + cognitive overhead). Project already maintains 3 templates without drift. Portal switches are real context switches matching what admins do.

---

## Claude's Discretion

- Exact H1 title wording for index.md
- macOS glossary category organization
- Comparison table row ordering
- Introductory paragraph in comparison page

## Deferred Ideas

None — discussion stayed within phase scope.
