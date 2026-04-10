# Phase 2: Lifecycle - Context

**Gathered:** 2026-03-13
**Status:** Ready for planning

<domain>
## Phase Boundary

End-to-end Autopilot lifecycle documentation across all six deployment stages (hardware hash import through post-enrollment verification). Delivers a shared mental model for both L1 and L2 audiences before any troubleshooting content is written. Does not include troubleshooting procedures (Phases 4-6) or navigation indexes (Phase 7).

</domain>

<decisions>
## Implementation Decisions

### Audience & File Structure
- Shared docs for both L1 and L2 audiences — lifecycle is factual, not troubleshooting, so the L1/L2 split doesn't apply yet
- Use L2 template as base with adapted section headings (Context, What Happens, etc.)
- Light "L2 Note" blockquote callouts for technical pointers (registry paths, event IDs) — not full L2 sections
- Files live in `docs/lifecycle/` subfolder
- 6 files total: `00-overview.md` + 5 stage guides (`01` through `05`)
- OOBE guide covers user-driven, pre-provisioning, and self-deploying as sections within one file
- Sequential prev/next navigation links at bottom of each stage guide
- "How to Use This Guide" reader guide in overview only
- Actor summary table in overview (Stage → Primary Actor → What Happens)
- Prerequisites checklist in overview (tenant, licenses, profile, network, registration)
- Related Documentation section in overview linking to all Phase 1 assets + architecture.md

### Standardized 11-Section Stage Guide Structure
Every stage guide follows this order:
1. Context (what + when + "Depends on" / "Feeds into" dependency notes)
2. What the User Sees / What the Admin Sees (adaptive heading per stage)
3. What Happens (3-8 numbered steps with 1-2 sentence explanations each)
4. Behind the Scenes (L2 Note callout — 3-5 bullets on API/service interactions)
5. Success Indicators (checklist with checkmarks)
6. Failure Indicators (checklist with X marks + forward-links to Phase 3 error codes and Phase 5-6 runbooks as placeholders)
7. Typical Timeline (1-2 line timing note with variability caveat)
8. Watch Out For (2-3 bullet points of common misconfigurations)
9. Tool References (stage-specific PowerShell function links + Further Reading with Microsoft Learn URLs)
10. Navigation (prev/next links)
11. Version History (date + change table)

### Diagrams
- Overview: two-level Mermaid approach — happy path diagram (TD direction) + failure points diagram with color-coded nodes (red fail, green ok, amber decision via classDef)
- Overview happy path shows all 3 deployment modes (user-driven, pre-provisioning, self-deploying) with reseal+ship node for pre-provisioning
- Stage-specific Mermaid diagrams for OOBE (diverge/reconverge pattern for 3 paths) and ESP (sequential subgraph with device phase / user phase boundary) only — other stages use bullet lists
- Stage-internal diagrams use LR direction
- Consistent node naming convention: S1-S5 for stages, F_xxx for failures, M for mode decision
- Clickable nodes linking to stage guide files (Mermaid `click` syntax — degrades gracefully)

### APv1 vs APv2 Handling
- APv1 is primary content; APv2 callouts as blockquotes (`> **APv2 Note:**`) in stages 1-4 where behavior differs
- No APv2 callout needed for post-enrollment (stage 5) — similar enough
- APv2 callouts include Microsoft Learn links to Device Preparation docs
- Updated version gate banner: "This guide primarily covers Windows Autopilot (classic). APv2 (Device Preparation) differences are noted inline."
- Overview diagram is APv1 only; text note below links to apv1-vs-apv2.md for APv2 flow
- Frontmatter `applies_to: both` since guides reference both frameworks

### Writing Style
- Direct, second-person voice ("You upload the CSV")
- 500-800 words per stage guide; overview 800-1200 words
- OOBE and ESP guides may run 600-900 words (more complex)
- First-mention glossary linking per file (link IS the signal, no italic/bold on terms)
- Fenced code blocks with `powershell` tag for commands; inline backticks for registry paths
- Standard Markdown blockquotes for all callouts (L2 Note, APv2 Note, Watch Out For) — no GitHub-specific admonition syntax
- Text descriptions of screens with element names — no screenshots (per Out of Scope constraint)

### Stage-Specific Depth
- Hardware hash guide: all 4 import methods (CSV, OEM, PowerShell, Partner Center) briefly described
- Profile assignment guide: dynamic vs static group assignment comparison with timing notes
- ESP guide: app type tracking table (Win32, LOB, Store required/available, scripts, certificates) + timeout behavior
- Post-enrollment guide: verification checklist for confirming successful deployment end-to-end

### Edge Cases (Brief Notes Only)
- Co-management: brief note in ESP stage only (app tracking differences)
- Hybrid join: brief note in profile assignment and OOBE stages (domain controller requirement)
- Re-registration: Watch Out For item in hardware hash stage (stale device records)
- Autopilot Reset: brief note in OOBE stage (re-enters at Stage 3, skips hash import)
- ESP context: brief note distinguishing OOBE ESP vs post-enrollment ESP behavior

### Maintenance
- 90-day review_by frontmatter cycle from Phase 1 templates
- Version History table at bottom of each file (after navigation, section 11)
- Supplement existing docs (architecture.md, common-issues.md) with cross-links — no replacement

### Claude's Discretion
- Exact Mermaid diagram node layout and edge labels
- Specific Microsoft Learn URLs to include in Further Reading and APv2 callouts
- Which PowerShell functions to feature in each stage's Tool References
- Exact wording of success/failure indicator items
- Number and specific content of Watch Out For bullets per stage
- Whether to include additional sub-steps within the numbered process steps

</decisions>

<specifics>
## Specific Ideas

- Stage guides should feel like a guided walkthrough — "here's what's happening and why" not "here's how to configure it"
- The ESP app type table is critical context that L1 agents rarely understand — prioritize clarity there
- Forward-links to Phase 3/5/6 content should include "(available after Phase X)" annotation so readers know the link target doesn't exist yet
- The overview's two-level diagram approach mirrors how deployment pipelines are commonly visualized — happy path first, then failure complexity

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/_templates/l2-template.md`: Base template for stage guides — adapt section headings but keep frontmatter structure and version gate banner
- `docs/_glossary.md`: 26 terms to link to on first mention per file
- `docs/apv1-vs-apv2.md`: Canonical source for APv2 callout links and version gate references
- `docs/reference/powershell-ref.md`: 12 function entries to link from Tool References sections
- `docs/reference/registry-paths.md`: 8 paths to reference in L2 Note callouts
- `docs/reference/endpoints.md`: 13 endpoints to reference in Behind the Scenes sections

### Established Patterns
- YAML frontmatter with `last_verified`, `review_by`, `applies_to`, `audience` fields
- Version gate banner as first content element after frontmatter
- Relative links to Phase 1 reference files (never inline definitions)
- Blockquote callouts for supplementary information

### Integration Points
- `docs/lifecycle/` — new subfolder alongside existing `docs/reference/` and `docs/_templates/`
- Overview links to `docs/architecture.md` for system design context
- Forward-links to future `docs/error-codes/`, `docs/l1-runbooks/`, `docs/l2-runbooks/` directories

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-lifecycle*
*Context gathered: 2026-03-13*
