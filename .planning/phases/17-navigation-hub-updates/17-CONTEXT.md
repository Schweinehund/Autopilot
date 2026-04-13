# Phase 17: Navigation & Hub Updates - Context

**Gathered:** 2026-04-13
**Status:** Ready for planning

<domain>
## Phase Boundary

All audiences (L1, L2, admin) can discover and navigate the full v1.1 content set from the documentation hub, with APv2 terminology integrated into shared reference files and bidirectional cross-references verified between APv1 and APv2 documents. This phase updates existing hub/navigation files only -- no new troubleshooting content, no new admin guides, no new runbooks (those are Phases 11-16).

</domain>

<decisions>
## Implementation Decisions

### Index Page Layout
- **D-01:** Add distinct APv2 subsections under each audience role (L1, L2) in `docs/index.md`. APv2 sections are visually separated with clear framework labels (`## Service Desk (L1) -- APv2` or similar) to satisfy success criterion 1 ("APv2 sections visually distinct from APv1 sections").
- **D-02:** Add a new top-level `## Admin Setup` section between Desktop Engineering (L2) and Shared References. Contains links to both APv1 admin setup guides (`docs/admin-setup-apv1/00-overview.md`) and APv2 admin setup guides (`docs/admin-setup-apv2/00-overview.md`) with clear framework labels. Admin is a new audience role introduced by v1.1.
- **D-03:** Update `index.md` frontmatter from `applies_to: APv1` to `applies_to: both`. Update or remove the version gate blockquote to reflect that the index now covers both frameworks.

### Common Issues Routing
- **D-04:** Add a separate `## APv2 Failure Scenarios` section BELOW existing APv1 symptom categories in `docs/common-issues.md`. Each APv2 entry routes to APv2 L1 and L2 runbooks only -- no cross-contamination with APv1 runbooks.
- **D-05:** Add a brief "Not sure which framework?" pointer near the top of the page linking to `docs/apv1-vs-apv2.md` for users who don't know which framework their device is using.
- **D-06:** Follow the pattern established by the error-codes master index (Phase 12 D-03): existing APv1 section gets a `**Framework:** APv1 (classic)` label, new section gets `**Framework:** APv2 (Device Preparation)` label.
- **D-07:** Update `common-issues.md` frontmatter from `applies_to: APv1` to `applies_to: both`.

### Glossary APv2 Terms
- **D-08:** Perform a full APv2 term audit across all Phase 11-16 output files. Add every APv2-specific term used in the documentation that is not yet in `docs/_glossary.md`. Minimum required terms per success criterion 2: Enrollment Time Grouping (ETG), BootstrapperAgent, Device Preparation policy. Additional candidates to scan for: Intune Management Extension (IME), corporate identifiers, Intune Provisioning Client, and any other terms introduced in admin setup guides.
- **D-09:** Use inline "See also" links for bidirectional cross-references between APv1 and APv2 equivalent terms. Example: the ESP entry gets "APv2 note: APv2 does not use ESP. See [Enrollment Time Grouping](#enrollment-time-grouping)." and the ETG entry gets "APv1 equivalent: [ESP](#esp) (different mechanism -- ETG replaces ESP's role in APv2)."
- **D-10:** Organize new APv2 terms within the existing category sections (Enrollment, Hardware, Deployment Modes, etc.) to maintain alphabetical/topical grouping. Add new categories only if APv2 introduces a concept that doesn't fit existing groups.
- **D-11:** Update the glossary version gate and alphabetical index to reflect new entries. Remove the Phase 3 placeholder note at the bottom of the file.

### Cross-Reference Scope
- **D-12:** Update hub files (index.md, glossary, common-issues.md, error-codes/00-index.md, quick-ref cards) AND add APv2 back-links to APv1 files that have direct APv2 counterparts. This satisfies success criterion 4 ("every APv1 document that has an APv2 equivalent references it").
- **D-13:** APv1 files requiring APv2 back-link updates:
  - `docs/lifecycle/00-overview.md` -- link to `docs/lifecycle-apv2/00-overview.md`
  - `docs/l1-runbooks/00-index.md` -- add APv2 section linking to APv2 L1 runbooks (06-09)
  - `docs/l2-runbooks/00-index.md` -- already updated in Phase 14 (verify only)
  - `docs/decision-trees/00-initial-triage.md` -- link to `docs/decision-trees/04-apv2-triage.md`
  - `docs/quick-ref-l1.md` and `docs/quick-ref-l2.md` -- add APv2 quick-reference entries or "See also" links
- **D-14:** Do NOT perform a full audit of every file in `docs/` -- scope is limited to hub files and APv1 files with direct APv2 equivalents. Individual runbook files (e.g., `02-esp-deep-dive.md`) don't need APv2 links unless they have a direct counterpart.
- **D-15:** All updated files get their `last_verified` and `review_by` frontmatter dates refreshed.

### Frontmatter & Metadata
- **D-16:** All updated hub files use `applies_to: both` and `audience: all` (or the most inclusive audience value). Consistent with Phase 12's index update pattern.

### Claude's Discretion
- Exact wording of APv2 section headers in index.md (as long as they're visually distinct from APv1 sections)
- Number and selection of additional APv2 glossary terms beyond the 3 required minimums
- Whether quick-ref cards get inline APv2 additions or just "See also" links
- Ordering of APv2 entries within common-issues.md APv2 section
- Whether to add a "Framework disambiguation" pointer to the top of index.md alongside the existing version gate

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Hub Files Being Updated (read current state)
- `docs/index.md` -- Master documentation index being restructured. Read for current L1/L2/Shared structure.
- `docs/_glossary.md` -- Glossary being extended with APv2 terms. Read for current term list and formatting pattern.
- `docs/common-issues.md` -- Symptom router being extended. Read for current symptom categories and link pattern.
- `docs/error-codes/00-index.md` -- Already has APv2 section (Phase 12). Read for framework label pattern to replicate.

### APv1 Files Needing Back-Links (read for current state)
- `docs/lifecycle/00-overview.md` -- APv1 lifecycle overview, needs APv2 equivalent link
- `docs/l1-runbooks/00-index.md` -- L1 runbook index, needs APv2 section
- `docs/l2-runbooks/00-index.md` -- L2 runbook index, verify APv2 section from Phase 14
- `docs/decision-trees/00-initial-triage.md` -- Initial triage tree, needs APv2 triage link
- `docs/quick-ref-l1.md` -- L1 quick-ref card, needs APv2 entries
- `docs/quick-ref-l2.md` -- L2 quick-ref card, needs APv2 entries

### APv2 Content Being Linked To (verify paths exist)
- `docs/lifecycle-apv2/` -- 4 files (Phase 11 output)
- `docs/admin-setup-apv2/` -- 5 files (Phase 15 output)
- `docs/admin-setup-apv1/` -- 11 files (Phase 16 output)
- `docs/error-codes/06-apv2-device-preparation.md` -- APv2 failure catalog (Phase 12)
- `docs/l1-runbooks/06-apv2-deployment-not-launched.md` through `09-apv2-deployment-timeout.md` -- APv2 L1 runbooks (Phase 13)
- `docs/l2-runbooks/06-apv2-log-collection.md` through `08-apv2-deployment-report.md` -- APv2 L2 runbooks (Phase 14)
- `docs/decision-trees/04-apv2-triage.md` -- APv2 triage decision tree (Phase 13)
- `docs/apv1-vs-apv2.md` -- Comparison/disambiguation page (Phases 1 + 11)

### Prior Phase Context (patterns to follow)
- `.planning/phases/12-apv2-failure-index/12-CONTEXT.md` -- Phase 12 D-03: pattern for adding APv2 section to existing index file with framework labels
- `.planning/phases/11-apv2-lifecycle-foundation/11-CONTEXT.md` -- Phase 11 D-11: version gate + "See also" footer pattern

### Project Context
- `.planning/ROADMAP.md` -- Phase 17 success criteria (NAVG-01, NAVG-03, NAVG-04)
- `.planning/STATE.md` -- Accumulated decisions and pending todos

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/error-codes/00-index.md` -- Already-implemented APv2 section pattern with framework labels. Direct template for common-issues.md and index.md updates.
- Phase 11-16 version gate blockquote pattern -- Copy for any files that need framework identification headers.
- Glossary entry format -- Existing entries with inline links and "See also" cross-references.

### Established Patterns
- **Framework labels:** `**Framework:** APv1 (classic)` and `**Framework:** APv2 (Device Preparation)` -- established in Phase 12 error-codes index.
- **Version gate blockquote:** `> **Version gate:** This guide applies to [framework]. For [other], see [link].` -- on every Phase 11-16 file.
- **"See also" footer:** Links to equivalent doc in other framework + comparison page -- on every Phase 11-16 file.
- **Frontmatter:** `last_verified`, `review_by` (90-day), `applies_to`, `audience` -- consistent across all docs.

### Integration Points
- `docs/index.md` -- Central hub that all other docs link back to
- `docs/apv1-vs-apv2.md` -- Framework disambiguation page referenced from multiple hubs
- Phase 13 output (L1 runbooks, decision tree) -- verify these files exist before linking

</code_context>

<specifics>
## Specific Ideas

No specific requirements -- open to standard approaches within the decisions above.

</specifics>

<deferred>
## Deferred Ideas

None -- discussion stayed within phase scope.

</deferred>

---

*Phase: 17-navigation-hub-updates*
*Context gathered: 2026-04-13*
