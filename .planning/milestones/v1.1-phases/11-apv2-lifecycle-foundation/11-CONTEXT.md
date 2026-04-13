# Phase 11: APv2 Lifecycle Foundation - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Admins can understand the complete APv2 deployment model, verify prerequisites, and make an informed APv1 vs APv2 selection decision. This phase delivers lifecycle documentation only — no troubleshooting runbooks, error codes, or admin setup walkthroughs (those are Phases 12-16).

</domain>

<decisions>
## Implementation Decisions

### Document Structure
- **D-01:** Create a separate `docs/lifecycle-apv2/` folder parallel to `docs/lifecycle/`. APv2 has a fundamentally different flow (no hardware hash, no ESP, Enrollment Time Grouping instead of pre-staging) — mixing frameworks in one folder would require confusing version gates on every section.
- **D-02:** Four files in `docs/lifecycle-apv2/`: `00-overview.md` (APv2 model explanation), `01-prerequisites.md` (standalone checklist), `02-deployment-flow.md` (10-step process with Mermaid diagram), `03-automatic-mode.md` (Windows 365 automatic deployment with preview caveats).
- **D-03:** Create `docs/_templates/admin-template.md` in this phase. ROADMAP Phase 16 depends on "admin-template.md established in Phase 11". Follows v1.0 pattern where Phase 1 created L1/L2 templates before content phases.

### APv2 Flow Diagram
- **D-04:** Use the two-level Mermaid diagram pattern established in Phase 2 — Level 1: linear 10-step happy path; Level 2: color-coded failure points at each step.
- **D-05:** Enrollment Time Grouping (ETG) must be shown as the central mechanism in the diagram, distinct from APv1's ESP flow. This directly fulfills Success Criterion #1.

### Prerequisites Format
- **D-06:** Actionable checklist format — each prerequisite as a checkbox item with: what to check, where to check it (Intune portal path or PowerShell command), and what happens if it's missing.
- **D-07:** APv1 deregistration requirement must be the FIRST prerequisite with a warning callout. Per STATE.md decision: "APv1 silently wins when both apply" — this is the #1 gotcha for APv2 setup.

### Comparison Update
- **D-08:** Extend existing `docs/apv1-vs-apv2.md` (do not replace). Keep the current feature comparison table. Add two new sections: (1) migration guidance with high-level steps and forward references to Phase 15 (APv2 Admin Setup), and (2) a Mermaid decision flowchart for "which framework should I use?"
- **D-09:** Migration guidance stays high-level — numbered considerations and forward references. Phase 11 orients admins; Phase 15 handles the actual configuration walkthrough.

### Automatic Mode Caveats
- **D-10:** Top banner blockquote at the top of `03-automatic-mode.md` stating preview status and Windows 365 scope, PLUS per-section inline callouts on any specific behavior that's preview-only. Double coverage ensures readers who jump via anchor links still see warnings.

### Cross-Linking Strategy
- **D-11:** Every APv2 lifecycle file gets a version gate blockquote header ("This guide covers APv2. For APv1, see [link]") AND a "See also" footer section linking to the APv1 equivalent and the comparison page. Pre-builds the bidirectional linking Phase 17 requires (NAVG-04).

### Audience Targeting
- **D-12:** Primary audience is Intune admins (frontmatter `audience: admin`). L2-level technical details (registry paths, event log references) included in collapsible/expandable blocks. L1 agents don't choose which framework to deploy — this content is admin-facing.

### Source Strategy
- **D-13:** Microsoft Learn is the authoritative primary source for the 10-step deployment flow. Community sources (oofhours.com, Call4Cloud) supplement gaps only, with MEDIUM confidence attribution. Consistent with the sourcing approach already established for Phase 14 BootstrapperAgent event IDs.

### Claude's Discretion
- File naming within `docs/lifecycle-apv2/` (numbering convention, slug format)
- Exact Mermaid node labels and color scheme for failure points
- Admin template structure (section headings, placeholder content) — as long as it includes per-setting "what breaks" callout pattern for Phases 15-16
- Collapsible block syntax (HTML details/summary vs other approach)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Documentation (read for patterns and cross-linking)
- `docs/lifecycle/00-overview.md` — Established lifecycle overview pattern with two-level Mermaid diagrams
- `docs/apv1-vs-apv2.md` — Current APv1 vs APv2 comparison table (being extended, not replaced)
- `docs/_templates/l1-template.md` — L1 template pattern (reference for admin template design)
- `docs/_templates/l2-template.md` — L2 template pattern (reference for admin template design)
- `docs/_glossary.md` — Existing glossary with APv1 terms (APv2 terms added in Phase 17)

### Project Context
- `.planning/REQUIREMENTS.md` — LIFE-01 through LIFE-04 requirements for this phase
- `.planning/ROADMAP.md` — Phase 11 success criteria and dependency relationships
- `.planning/STATE.md` — Accumulated decisions including APv1 deregistration precedence rule and sourcing strategy

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/lifecycle/` folder structure — Pattern for organizing lifecycle stage files (numbered, with overview as 00)
- `docs/apv1-vs-apv2.md` — Existing comparison page with feature table, version gate header, and audience metadata in frontmatter
- `docs/_templates/l1-template.md` and `l2-template.md` — Template pattern with frontmatter, version gate, numbered steps, and escalation sections

### Established Patterns
- **Frontmatter**: `last_verified`, `review_by` (90-day cycle), `applies_to` (APv1/APv2/both), `audience` (L1/L2/both/admin)
- **Version gate**: Blockquote at top of every file identifying which framework the doc covers
- **Two-level Mermaid**: Level 1 happy path with deployment mode branches + Level 2 color-coded failure points
- **Cross-linking**: Internal markdown links using relative paths from file location

### Integration Points
- `docs/index.md` — Hub file that will need APv2 lifecycle links (Phase 17)
- `docs/common-issues.md` — Will route to APv2 content (Phase 17)
- Phase 12 depends on this phase's lifecycle docs to reference "normal behavior" when describing failures

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches within the decisions above.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 11-apv2-lifecycle-foundation*
*Context gathered: 2026-04-10*
