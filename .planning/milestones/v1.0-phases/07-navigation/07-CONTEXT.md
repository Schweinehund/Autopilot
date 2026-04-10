# Phase 7: Navigation - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Master index, quick-reference cards, and navigation indexes that give L1 and L2 audiences role-specific entry points to all documentation. Written last because it links to everything produced in Phases 1-6. Does not create new troubleshooting content — only navigation and summary artifacts.

</domain>

<decisions>
## Implementation Decisions

### Master index structure (NAV-01)
- **D-01:** Single file `docs/index.md` — the root entry point for the entire docs/ directory
- **D-02:** Two H2 sections (`## Service Desk (L1)` and `## Desktop Engineering (L2)`) with link tables — no side-by-side columns (markdown column layouts break across renderers)
- **D-03:** Minimal shared content before the role split: title, one-sentence purpose line, "Choose your path below" prompt — no background prose
- **D-04:** Third `## Shared References` section at the bottom for glossary, error code index, lifecycle overview, and APv1-vs-APv2 — shared resources listed once, not duplicated in both role sections

### Quick-reference card content density (NAV-02, NAV-03)
- **D-05:** Standalone files at docs root: `docs/quick-ref-l1.md` and `docs/quick-ref-l2.md` — print-and-pin cheat sheets, not embedded in the master index
- **D-06:** L1 card contains:
  - Top 5 checks as a numbered checklist (device in portal? profile assigned? endpoints reachable? ESP past expected time? error code in lookup table?)
  - Escalation triggers as a compact bullet list (extracted from runbook escalation criteria)
  - One-line links to each decision tree and runbook
  - No prose, no context paragraphs — every line is actionable
- **D-07:** L2 card contains actual values, not just links:
  - `mdmdiagnosticstool.exe` command with exact flags (copy-pasteable)
  - Top 5-6 PowerShell diagnostic commands with exact syntax
  - 4 Event Viewer log paths as literal strings
  - Top 3-4 registry paths (ESP tracking keys, Autopilot state)
  - Top event IDs grouped by scenario (5-6 most diagnostic)
  - Links to full runbooks at the bottom
- **D-08:** Both cards use standard YAML frontmatter (`last_verified`, `review_by`, `audience`) matching all other docs

### common-issues.md transformation (NAV-04)
- **D-09:** Pure navigation index — remove all inline diagnostic/remediation content; runbooks are now authoritative
- **D-10:** Keep existing issue categories as H2 headers; reduce each to: one-line symptom description, L1 runbook link, L2 runbook link
- **D-11:** "Device Renamed" section has no corresponding runbook — keep as a 3-4 line inline tip (sync delay, not worth a full runbook)
- **D-12:** Frontmatter uses `audience: all` — this is a symptom-based router for both roles; master index links to it from Shared References

### Claude's Discretion
- Exact wording of the master index role descriptions
- Which 5 checks appear on the L1 card (use the most common ticket-resolving checks)
- Which PowerShell commands and event IDs make the L2 card cut (use frequency of appearance in L2 runbooks as the filter)
- Order of issue categories in the transformed common-issues.md
- Whether to add a "How to use this documentation" one-liner in the master index
- Cross-links between quick-reference cards and the master index

</decisions>

<specifics>
## Specific Ideas

- L1 agents tape quick-reference cards to their monitors — the card must be useful at arm's length, not as a reading exercise
- L2 engineers keep the card in a second terminal tab mid-investigation — copy-pasteable commands are the point
- common-issues.md is likely bookmarked by existing users — preserve the issue category names so no one gets lost after the transformation
- Master index routes, it does not educate — lifecycle docs exist for background context

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing navigation files (integration points)
- `docs/l1-runbooks/00-index.md` — L1 runbook index; master index L1 section links here
- `docs/l2-runbooks/00-index.md` — L2 runbook index with escalation mapping table; master index L2 section links here
- `docs/error-codes/00-index.md` — Master error code lookup; shared references section
- `docs/lifecycle/00-overview.md` — Lifecycle hub document; shared references section
- `docs/decision-trees/00-initial-triage.md` — L1 triage entry point; L1 section and L1 quick-ref card link here

### Content sourced for quick-reference cards
- `docs/reference/powershell-ref.md` — 12 functions; L2 card extracts top 5-6 diagnostic commands
- `docs/reference/registry-paths.md` — 8 registry paths; L2 card extracts top 3-4
- `docs/reference/endpoints.md` — 13 endpoints with test commands; L2 card may reference connectivity test
- `docs/l1-runbooks/01-device-not-registered.md` through `05-oobe-failure.md` — Escalation criteria sections feed L1 card triggers
- `docs/l2-runbooks/01-log-collection.md` — Log collection commands feed L2 card

### Foundation references
- `docs/_glossary.md` — 26 terms; link on first mention per new file
- `docs/apv1-vs-apv2.md` — Version gate banner link target for new files
- `docs/_templates/l1-template.md` — L1 frontmatter pattern (quick-ref-l1.md follows this)
- `docs/_templates/l2-template.md` — L2 frontmatter pattern (quick-ref-l2.md follows this)

### File to transform
- `docs/common-issues.md` — Current standalone troubleshooting page; D-09 through D-12 define the transformation

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/l1-runbooks/00-index.md`: Table format with When-to-Use column — master index L1 section can mirror this pattern
- `docs/l2-runbooks/00-index.md`: Escalation mapping table — master index L2 section can reference this
- `docs/_templates/l1-template.md` and `docs/_templates/l2-template.md`: Frontmatter patterns for new files
- `docs/_glossary.md`: 26 terms; first-mention linking applies to all 4 new/modified files

### Established Patterns
- YAML frontmatter: `last_verified`, `review_by`, `applies_to: APv1`, `audience: L1|L2`
- Version gate banner as first content after frontmatter
- First-mention glossary linking per file
- Directory pattern: `docs/[topic]/00-index.md` + numbered files
- Table-based navigation with When-to-Use or description columns
- Direct second-person imperative voice
- No screenshots — text descriptions with UI element names
- Version History table at bottom of each file

### Integration Points
- `docs/index.md` — new file; becomes the root entry point for the entire docs/ directory
- `docs/quick-ref-l1.md` — new file at docs root (not in a subdirectory)
- `docs/quick-ref-l2.md` — new file at docs root (not in a subdirectory)
- `docs/common-issues.md` — existing file; transformed in place (content replaced, not appended)
- All existing `00-index.md` files in subdirectories remain unchanged — master index links to them

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 07-navigation*
*Context gathered: 2026-03-23*
