# Phase 20: Cross-Platform Foundation - Context

**Gathered:** 2026-04-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver shared terminology standards, a macOS documentation template, platform taxonomy (frontmatter), and a navigation structure that supports cross-platform content — enabling all subsequent macOS and Windows operational gap phases (21-25) to build on a consistent foundation.

</domain>

<decisions>
## Implementation Decisions

### Platform Comparison Page (XPLAT-01)
- **D-01:** Use a single feature table format, matching the existing `docs/apv1-vs-apv2.md` pattern. Concept rows map Windows Autopilot terms to macOS ADE equivalents without implying false equivalence — "N/A" or descriptive text where concepts are platform-exclusive.
- **D-02:** Add a short "Diagnostic Tools" subsection below the main comparison table for tool/command comparisons that don't fit table cells (e.g., `mdmdiagnosticstool.exe` vs `sudo profiles show`). This avoids bloating the table while covering the XPLAT-01 requirement for diagnostic tool mapping.
- **D-03:** Scope the comparison to terminology, enrollment mechanisms, provisioning stages, and diagnostic tools. Do NOT duplicate the feature parity matrix (MADM-06, Phase 23) which covers Intune capability gaps.

### Glossary Integration (XPLAT-02)
- **D-04:** Create a separate `docs/_glossary-macos.md` file for macOS-specific terms (ADE, ABM, Setup Assistant, Await Configuration, VPP, ABM token). Do NOT intersperse macOS terms into the existing `docs/_glossary.md`.
- **D-05:** Each glossary file cross-links to the other using standard Markdown links (same mechanism as the existing 98 cross-file glossary references). Add a header banner in each file directing users to the other platform's glossary.
- **D-06:** The macOS glossary follows the same structural pattern as the Windows glossary: frontmatter, alphabetical index, semantic categories, and bidirectional cross-reference callouts (e.g., `> **Windows equivalent:** [ESP](_glossary.md#esp)`).

### Navigation Restructure (NAVX-01)
- **D-07:** Keep everything in a single `docs/index.md` file. Add `## Windows Autopilot` and `## macOS Provisioning` platform headings. Existing role-based tables (L1-APv1, L1-APv2, L2-APv1, L2-APv2, Admin) move under the Windows heading without changing their heading text (preserves all existing anchor slugs).
- **D-08:** Add a "Choose Your Platform" anchor-link section at the very top of the page, above the platform headings. This satisfies the NAVX-01 "platform selector above role-based routing" requirement.
- **D-09:** Change the H1 title from "Windows Autopilot Documentation" to a platform-neutral title (e.g., "Device Provisioning Documentation" or "Autopilot & macOS ADE Documentation").
- **D-10:** macOS sections under `## macOS Provisioning` will have 3 role-based sub-sections (L1, L2, Admin) with no framework split (macOS has only ADE, no APv1/APv2 equivalent). This structural asymmetry between platforms is intentional and reflects the domain.

### macOS Admin Template (XPLAT-03)
- **D-11:** Create a new `docs/_templates/admin-template-macos.md` as a separate file — moderate divergence from the Windows template. Do NOT use a shared base + extensions pattern (Markdown has no inheritance enforcement).
- **D-12:** Steps section uses portal-scoped sub-sections: `#### In Apple Business Manager` and `#### In Intune admin center` within each step, reflecting the genuine dual-portal workflow macOS admins perform.
- **D-13:** "What breaks if misconfigured" callouts include cross-portal symptom visibility — specify which portal the misconfiguration occurs in AND where the symptom manifests (may be different portals).
- **D-14:** Configuration-Caused Failures table adds a "Portal" column: `Misconfiguration | Portal | Symptom | Runbook`.
- **D-15:** Comment block updated for macOS: "Include full navigation paths for both ABM and Intune admin center portals" and "Reviewer: macOS Platform Lead" (or equivalent role).
- **D-16:** Version gate pattern reused for platform disambiguation: "This guide covers macOS ADE via ABM. For Windows Autopilot, see [link]."
- **D-17:** Runbook links use placeholder format (`[TBD - Phase 24]`) since macOS troubleshooting runbooks (MTRO-01 through MTRO-04) are created in Phase 24.
- **D-18:** Renewal/Maintenance section scope: include only when the guide's subject has a renewable component (ADE token, APNs certificate). Otherwise omit the section. Authors decide per-guide, not per-template.

### Platform Frontmatter Taxonomy (XPLAT-04)
- **D-19:** Add `platform:` field to frontmatter supporting values: `Windows`, `macOS`, `all`. Existing docs default to `Windows` without retroactive edits (per STATE.md decision). New cross-platform docs (glossary, comparison page, index) use `platform: all`.
- **D-20:** The `applies_to:` field retains its existing meaning (APv1/APv2/both) for Windows framework disambiguation. The new `platform:` field is a separate, orthogonal dimension.

### Claude's Discretion
- Exact wording for the H1 title change in index.md
- Semantic category names for the macOS glossary (can mirror Windows categories where they apply, or create macOS-specific ones)
- Ordering of rows in the platform comparison table
- Whether to include a brief introductory paragraph in the comparison page before the table

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Patterns (read for structural consistency)
- `docs/apv1-vs-apv2.md` — Comparison table pattern to replicate for XPLAT-01
- `docs/_glossary.md` — Glossary structure to mirror for macOS glossary (XPLAT-02)
- `docs/_templates/admin-template.md` — Base pattern that macOS template adapts from (XPLAT-03)
- `docs/index.md` — Current navigation hub to restructure in-place (NAVX-01)
- `docs/_templates/l1-template.md` — L1 template for reference on audience separation patterns
- `docs/_templates/l2-template.md` — L2 template for reference on audience separation patterns

### Requirements
- `.planning/REQUIREMENTS.md` — XPLAT-01 through XPLAT-04 and NAVX-01 requirements with acceptance criteria

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/apv1-vs-apv2.md`: Feature comparison table format with 18 rows, "Which Guide Do I Use?" decision section below — reuse this exact structure for the platform comparison page
- `docs/_glossary.md`: 32 terms in 5 semantic categories with alphabetical pipe-delimited index at top and `> **APv2 note:**` callout pattern — mirror this for macOS glossary with `> **Windows equivalent:**` callouts
- `docs/_templates/admin-template.md`: 69-line template with frontmatter, version gate, Prerequisites, Steps with "What breaks" callouts, Verification checklist, Config-Caused Failures table, See Also — adapt for macOS with portal-scoped modifications

### Established Patterns
- **Frontmatter**: `last_verified`, `review_by` (90-day cycle), `applies_to`, `audience` — all new docs follow this; add `platform:` field
- **Cross-references**: `_glossary.md#anchor` pattern used in 98 places across 33 docs — macOS glossary uses same pattern with `_glossary-macos.md#anchor`
- **Audience tagging**: L1/L2/admin/both/all — reference pages use `audience: both` or `audience: all`
- **Version gate callouts**: Every doc opens with a framework/version disambiguation banner

### Integration Points
- `docs/index.md` line 12: H1 title change from "Windows Autopilot Documentation" to platform-neutral
- `docs/index.md` Shared References section (lines 72-81): becomes "Cross-Platform References" including both glossaries, both comparison pages, and shared reference files
- `docs/_glossary.md` banner (line 8-9): add note about macOS glossary for readers seeking macOS terms

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. The adversarial review evaluated 3 options per area using a Finder/Adversary/Referee pattern to identify the lowest-risk approach for each decision.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 20-cross-platform-foundation*
*Context gathered: 2026-04-13*
