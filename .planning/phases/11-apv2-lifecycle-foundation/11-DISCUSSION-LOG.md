# Phase 11: APv2 Lifecycle Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-10
**Phase:** 11-apv2-lifecycle-foundation
**Areas discussed:** Document structure, APv2 flow diagram, Prerequisites format, Comparison update, Automatic mode caveats, Cross-linking strategy, Audience targeting, 10-step flow source

---

## Document Structure

### Q1: Where should APv2 lifecycle files live?

| Option | Description | Selected |
|--------|-------------|----------|
| Separate docs/lifecycle-apv2/ folder | New folder parallel to docs/lifecycle/. Keeps each framework's narrative clean. | ✓ |
| Extend existing docs/lifecycle/ folder | Add APv2 files alongside APv1 files. Simpler structure but risks framework confusion. | |
| Inline APv2 sections in existing files | Add APv2 content as sections within existing lifecycle files. Longest files, highest confusion risk. | |

**User's choice:** Separate docs/lifecycle-apv2/ folder
**Notes:** None

### Q2: How many files should the APv2 lifecycle folder contain?

| Option | Description | Selected |
|--------|-------------|----------|
| 4 files: overview + prerequisites + flow + automatic mode | Maps 1:1 to LIFE-01 through LIFE-04. Clean, focused files. | ✓ |
| 3 files: overview (with prereqs inline) + flow + automatic mode | Fewer files but overview becomes long. | |
| 2 files: comprehensive guide + automatic mode | One large file. Simpler but harder to navigate. | |

**User's choice:** 4 files
**Notes:** None

### Q3: Should Phase 11 create an admin-template.md?

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, create docs/_templates/admin-template.md | Fulfills Phase 16 dependency. Follows v1.0 pattern. | ✓ |
| Defer to Phase 15 | Create when first needed. Risk: ad-hoc creation. | |

**User's choice:** Yes, create admin template
**Notes:** None

---

## APv2 Flow Diagram

### Q4: How should the APv2 deployment flow diagram be structured?

| Option | Description | Selected |
|--------|-------------|----------|
| Two-level Mermaid (happy path + failure points) | Follows established v1.0 pattern from Phase 2. Consistent with existing lifecycle docs. | ✓ |
| Single detailed Mermaid diagram | More compact but busier. Breaks established pattern. | |
| Flowchart with decision branches | Decision-tree style for both modes. More complex. | |

**User's choice:** Two-level Mermaid
**Notes:** None

### Q5: What should the diagram emphasize as the core differentiator?

| Option | Description | Selected |
|--------|-------------|----------|
| Enrollment Time Grouping as the central mechanism | ETG is the pivotal step. Aligns with Success Criterion #1. | ✓ |
| No-hardware-hash enrollment as the key difference | Simpler narrative but ETG is more architecturally significant. | |
| Side-by-side APv1/APv2 swim lanes | Visually powerful but complex. May belong in comparison doc. | |

**User's choice:** Enrollment Time Grouping as central mechanism
**Notes:** None

---

## Prerequisites Format

### Q6: How should the APv2 prerequisites checklist be formatted?

| Option | Description | Selected |
|--------|-------------|----------|
| Actionable checklist with verification steps | Checkbox items with what/where/consequence. Matches admin audience. | ✓ |
| Table format (requirement / how to verify / consequence) | Clean but harder to use as physical checklist. | |
| Narrative with inline callouts | More readable but harder to scan. | |

**User's choice:** Actionable checklist with verification steps
**Notes:** None

### Q7: APv1 deregistration requirement placement?

| Option | Description | Selected |
|--------|-------------|----------|
| First prerequisite with warning callout | #1 gotcha. APv1 silently wins when both apply. | ✓ |
| Include but not first | Among other prerequisites in logical order. | |
| Separate 'Migration from APv1' section | Risks being missed by admins who don't think they're migrating. | |

**User's choice:** First prerequisite with warning callout
**Notes:** None

---

## Comparison Update

### Q8: How should apv1-vs-apv2.md be updated?

| Option | Description | Selected |
|--------|-------------|----------|
| Extend with migration guidance + decision flowchart | Keep existing table. Add migration guidance and decision flowchart. Fulfills LIFE-03. | ✓ |
| Update table only | Refresh table. Doesn't add actionable guidance LIFE-03 requires. | |
| Replace with comprehensive new document | Rewrite from scratch. Risks breaking existing cross-links. | |

**User's choice:** Extend with migration guidance + decision flowchart
**Notes:** None

### Q9: How detailed should migration guidance be?

| Option | Description | Selected |
|--------|-------------|----------|
| High-level steps + forward references | Key considerations with forward refs to Phase 15. Phase 11 orients, Phase 15 configures. | ✓ |
| Detailed step-by-step migration procedure | Full walkthrough. Overlaps with Phase 15. | |
| Just a migration considerations list | Bullet list. May not meet LIFE-03 actionable guidance bar. | |

**User's choice:** High-level steps + forward references
**Notes:** None

---

## Automatic Mode Caveats

### Q10: How should preview-status warnings appear?

| Option | Description | Selected |
|--------|-------------|----------|
| Top banner + per-section inline warnings | Double coverage. Matches Microsoft Learn preview pattern. | ✓ |
| Top banner only | Clean but readers who jump via anchor may miss it. | |
| Separate 'Preview Limitations' section at end | Consolidated but buried at bottom. | |

**User's choice:** Top banner + per-section inline warnings
**Notes:** None

---

## Cross-Linking Strategy

### Q11: How should APv2 docs cross-link to APv1 content?

| Option | Description | Selected |
|--------|-------------|----------|
| Version gate header + 'See also' footer | Follows existing pattern. Pre-builds Phase 17 bidirectional links (NAVG-04). | ✓ |
| Version gate header only | Minimal. Doesn't help readers who finish and want to compare. | |
| Inline links throughout text | More contextual but harder to maintain. | |

**User's choice:** Version gate header + 'See also' footer
**Notes:** None

---

## Audience Targeting

### Q12: Who is the primary audience for APv2 lifecycle docs?

| Option | Description | Selected |
|--------|-------------|----------|
| Admin audience with L2 callouts | Phase 11 goal says "Admins can understand..." L2 details in collapsible blocks. | ✓ |
| Both audiences equally (L1+L2) | Same as v1.0 but Phase 11 is admin-facing. L1 agents don't choose frameworks. | |
| Admin-only, no L2 callouts | Pure admin focus. Loses L2 utility. | |

**User's choice:** Admin audience with L2 callouts
**Notes:** None

---

## 10-Step Flow Source

### Q13: How should the researcher source the APv2 deployment flow?

| Option | Description | Selected |
|--------|-------------|----------|
| Microsoft Learn primary, community for gaps with attribution | Consistent with Phase 14 sourcing approach. MEDIUM confidence for community sources. | ✓ |
| Microsoft Learn only | Most authoritative but may leave gaps. | |
| Any credible source equally | Faster but undermines trust hierarchy. | |

**User's choice:** Microsoft Learn primary, community with MEDIUM confidence attribution
**Notes:** None

---

## Claude's Discretion

- File naming within docs/lifecycle-apv2/ (numbering convention, slug format)
- Exact Mermaid node labels and color scheme for failure points
- Admin template structure (section headings, placeholder content)
- Collapsible block syntax (HTML details/summary vs other approach)

## Deferred Ideas

None — discussion stayed within phase scope.
