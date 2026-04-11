# Phase 12: APv2 Failure Index - Context

**Gathered:** 2026-04-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Technicians have a scenario-based APv2 failure catalog they can search by symptom, and the master error code index acknowledges the APv2 framework. This phase delivers the failure catalog and index update only — no L1 runbooks (Phase 13), no L2 investigation guides (Phase 14), no admin setup content (Phases 15-16).

</domain>

<decisions>
## Implementation Decisions

### Failure Catalog Structure
- **D-01:** Organize failures by deployment phase (matching the 10-step flow from Phase 11). Sections: Enrollment Failures (Steps 2-3), IME Failures (Step 4), App Installation Failures (Steps 7-9), Script Failures (Step 8), Post-Deployment Issues. This creates a natural mapping between the deployment flow doc and the failure catalog.
- **D-02:** Each failure scenario entry uses the Symptom-Cause-Action format: **Symptom** (what the user/admin observes), **Probable Cause** (why it happens), **Quick Check** (portal-only verification path), **Runbook** (forward reference to L1/L2 guide). No inline resolution steps — runbooks handle that.

### Master Index Integration
- **D-03:** Add a separate `## APv2 Failure Scenarios` section BELOW the existing hex-code Quick Lookup table in `00-index.md`. The APv2 table uses different columns: Scenario | Symptom | Phase | Category (no hex Code column). Rename the existing table header to `## Quick Lookup (APv1)` and add a `**Framework:** APv1 (classic)` label. APv2 section gets `**Framework:** APv2 (Device Preparation)` label.
- **D-04:** Add `06-apv2-device-preparation.md` to the Categories section in `00-index.md` alongside the existing 5 category files.
- **D-05:** Update `00-index.md` frontmatter from `applies_to: APv1` to `applies_to: both` since it now covers both frameworks.

### Failure Scenario Scope
- **D-06:** Cover the core 8-10 scenarios that map to documented failure points in the APv2 deployment flow. These are the scenarios with identifiable failure status labels in the Intune deployment report:
  1. Deployment experience never launched (no Device Preparation policy matched)
  2. APv1 profile took precedence (ESP appeared instead of APv2 flow)
  3. Entra join failed
  4. Intune enrollment failed
  5. IME install failed
  6. LOB/M365 app install failed
  7. PowerShell script execution failed
  8. Win32/Store/Enterprise App Catalog app install failed
  9. Deployment timed out (overall)
  10. Wrong apps/policies applied (post-deployment)
- **D-07:** Phase 14 (L2 runbooks) can expand the catalog with additional edge-case scenarios if needed. Phase 12 establishes the structure and covers the core set.

### Cross-Linking Strategy
- **D-08:** Use forward reference text (not markdown links) for runbook references that point to Phase 13/14 content. Example: `**Runbook:** L1 runbook: APv2 deployment not launched (Phase 13)`. No broken links, no dead-end clicks. Phase 13/14 executors update these to real links when they create the runbook files.
- **D-09:** Apply version gate blockquote headers and See Also footers to the new catalog file, consistent with Phase 11 pattern (D-11 from Phase 11 context).

### Frontmatter and Metadata
- **D-10:** New file `docs/error-codes/06-apv2-device-preparation.md` uses `applies_to: APv2`, `audience: both` (technicians at both L1 and L2 use the failure catalog). Updated `00-index.md` uses `applies_to: both`.
- **D-11:** Follow the 90-day review cycle (`last_verified` / `review_by`) established in Phase 11.

### Claude's Discretion
- Exact wording of symptom descriptions and probable causes (as long as they match Microsoft Learn terminology)
- Ordering of scenarios within each deployment phase group
- Whether to include a Mermaid diagram in the catalog file showing failure points (optional — the deployment flow doc already has this)
- Column widths and formatting details in the index table

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 11 Output (read for cross-linking and content)
- `docs/lifecycle-apv2/02-deployment-flow.md` — 10-step deployment flow with failure points at each step. Failure entries in the catalog must reference the same step numbers.
- `docs/lifecycle-apv2/00-overview.md` — APv2 model overview. Catalog entries may reference ETG mechanism for enrollment-phase failures.
- `docs/lifecycle-apv2/01-prerequisites.md` — Prerequisites checklist. Some failure scenarios trace back to missing prerequisites.

### Existing Error Code Structure (read for patterns)
- `docs/error-codes/00-index.md` — Master error code index being extended. Read current structure to understand what's being modified.
- `docs/error-codes/01-mdm-enrollment.md` — Example category file pattern (hex code entries with L1 Action and L2 Fix sections). APv2 catalog uses different structure but same conventions.

### Project Context
- `.planning/REQUIREMENTS.md` — TROU-01 and NAVG-02 requirements for this phase
- `.planning/ROADMAP.md` — Phase 12 success criteria and dependency on Phase 11
- `.planning/phases/11-apv2-lifecycle-foundation/11-CONTEXT.md` — Phase 11 decisions (version gate pattern, cross-linking strategy, source strategy)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/error-codes/` folder — 5 existing APv1 category files plus master index. New file (06) slots in numerically.
- Phase 11 frontmatter pattern — `last_verified`, `review_by`, `applies_to`, `audience` fields established and ready to reuse.
- Version gate blockquote pattern — Copy from any Phase 11 file and adapt.

### Established Patterns
- **Error index structure:** Categories section with numbered links → Quick Lookup table with hex codes → No-Code ESP section. APv2 section adds after existing content.
- **Category file structure:** Frontmatter → version gate → title → per-error headings with L1 Action / L2 Fix subsections. APv2 catalog adapts this to Symptom / Probable Cause / Quick Check / Runbook.
- **Cross-linking:** Internal relative paths. Forward references use plain text with phase number annotation when target doesn't exist yet.

### Integration Points
- `docs/error-codes/00-index.md` — Being modified (new APv2 section, frontmatter update, existing table relabeled)
- Phase 13 depends on this catalog for runbook forward references
- Phase 14 depends on this catalog for L2 investigation guide forward references

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

*Phase: 12-apv2-failure-index*
*Context gathered: 2026-04-11*
