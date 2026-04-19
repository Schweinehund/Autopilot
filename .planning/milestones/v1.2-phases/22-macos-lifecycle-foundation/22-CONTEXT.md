# Phase 22: macOS Lifecycle Foundation - Context

**Gathered:** 2026-04-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver the macOS ADE lifecycle narrative (all 7 stages with flow diagram), macOS diagnostic reference files (Terminal commands, log paths, configuration profile locations), and macOS network endpoints reference — giving admins and technicians the foundational macOS content that Phase 23 (admin setup) and Phase 24 (troubleshooting) build on.

</domain>

<decisions>
## Implementation Decisions

### Folder Placement
- **D-01:** Create a new `docs/macos-lifecycle/` folder for Phase 22 macOS lifecycle content. This is a dedicated folder parallel to `docs/lifecycle/` (Windows APv1) and `docs/lifecycle-apv2/` (Windows APv2), keeping platform separation at the folder level.
- **D-02:** Do NOT create a `docs/macos/` umbrella folder. Phase 20 established macOS artifacts alongside their Windows counterparts (`_glossary-macos.md` next to `_glossary.md`, `admin-template-macos.md` next to `admin-template.md`). A platform silo would break this precedent and the content-type organizational paradigm.
- **D-03:** Do NOT extend `docs/lifecycle/` with macOS content. D-04 from Phase 21 explicitly fences lifecycle/ as the Windows Autopilot 5-stage deployment pipeline. The scope fence is preserved.
- **D-04:** MLIF-02 reference files (`macos-commands.md`, `macos-log-paths.md`) go in `docs/reference/`, NOT in `docs/macos-lifecycle/`. Reference content belongs in the reference folder regardless of platform.
- **D-05:** MLIF-03 macOS endpoints go into `docs/reference/endpoints.md` as a new section, NOT as a separate file. See D-10 below.

### Lifecycle Narrative Style (MLIF-01)
- **D-06:** Use a single comprehensive narrative file (`docs/macos-lifecycle/00-ade-lifecycle.md`) covering all 7 ADE stages sequentially. Do NOT mirror the Windows multi-file stage-by-stage pattern. Rationale: macOS ADE is a single linear pipeline with no deployment mode branching (unlike Windows which has user-driven, pre-provisioning, and self-deploying modes). A single narrative satisfies the MLIF-01 "complete narrative" requirement directly.
- **D-07:** Include a Mermaid flow diagram at the top of the lifecycle narrative showing the 7-stage sequential pipeline. Each stage gets its own H2 section within the single file.
- **D-08:** D-10 from Phase 20 ("3 role-based sub-sections: L1, L2, Admin") governs `docs/index.md` hub navigation routing, NOT lifecycle document internal structure. The lifecycle narrative uses whatever section headings best serve the content (e.g., "What Happens / Behind the Scenes / What Can Go Wrong" per the Windows stage pattern).
- **D-09:** Estimated file size: 400-600 lines with TOC. This is acceptable — `docs/reference/powershell-ref.md` is already 346 lines and functions well.

### Reference File Scope (MLIF-02)
- **D-10:** Create two separate reference files mirroring the Windows pattern:
  - `docs/reference/macos-commands.md` — Terminal diagnostic commands (equivalent of `powershell-ref.md`). Documents OS-shipped tools (`profiles`, `log show`, `system_profiler`, `defaults read`, IntuneMacODC) with Synopsis, Parameters, Expected Output, and Examples sections.
  - `docs/reference/macos-log-paths.md` — Log paths and configuration profile filesystem locations (equivalent of `registry-paths.md`). Documents Intune agent logs, Company Portal logs, unified log subsystems, and MDM-delivered `.mobileconfig` payload paths.
- **D-11:** `macos-commands.md` documents OS-shipped tools, not project-owned code. The structural pattern mirrors `powershell-ref.md` (Synopsis, Parameters, Returns/Output, Examples) but the version gate and staleness model differ — macOS commands change with OS releases, not project commits. Include `last_verified` with the macOS version tested against.
- **D-12:** `macos-log-paths.md` includes macOS version annotations where paths differ across versions (e.g., unified log subsystems introduced in macOS 10.12). Use inline version notes per row, matching the `registry-paths.md` table format.
- **D-13:** `profiles show` command AND its output interpretation both go in `macos-commands.md`, following the powershell-ref.md pattern where each function documents Returns and Examples.
- **D-14:** Update `docs/reference/00-index.md` to change `platform: Windows` to `platform: all` and add a macOS References section listing the two new files.

### Network Endpoints (MLIF-03)
- **D-15:** Extend `docs/reference/endpoints.md` with a `## macOS ADE Endpoints` section below the existing Windows content. Do NOT create a separate `endpoints-macos.md` file. This follows ARCHITECTURE.md Pattern 2 ("Shared References, Platform-Specific Sections") and avoids Anti-Pattern 3 ("Duplicating Shared Endpoints").
- **D-16:** Phase 21 D-08 ("endpoints.md stays unchanged") was a Phase 21 execution constraint scoped to Windows operational gap work. It is NOT a permanent prohibition. ARCHITECTURE.md explicitly plans endpoints.md extension with macOS content.
- **D-17:** Shared Microsoft endpoints (login.microsoftonline.com, graph.microsoft.com, manage.microsoft.com) appear in the macOS section with "(shared)" labels per ARCHITECTURE.md's worked example. No duplication of the Windows table — the macOS section only lists macOS-required endpoints with shared ones annotated.
- **D-18:** macOS test commands use `curl` and macOS-native tools (not PowerShell). Add a macOS-specific test commands subsection below the macOS endpoint table, parallel to the existing Windows test commands subsection.
- **D-19:** Update the H1 title from "Autopilot Network Endpoints Reference" to a platform-neutral title (e.g., "Network Endpoints Reference"). All 15+ inbound links use file paths, not heading anchors, so this is safe.
- **D-20:** Update `applies_to:` frontmatter (currently incorrectly set to `both`) — change to reflect actual content scope. Add `platform: all` to indicate cross-platform coverage.

### Claude's Discretion
- Exact section headings within each lifecycle stage (adapt from Windows "What Happens / Behind the Scenes" or create macOS-appropriate headings)
- Number of H2 sections in the lifecycle narrative (7 stage sections + intro + summary, or merge conceptually thin stages like "ADE token sync" with "enrollment profile assignment")
- Whether `macos-log-paths.md` uses a pure table format (like `registry-paths.md`) or includes brief explanatory paragraphs between sections
- Exact ordering of entries within each reference file
- How to handle the `00-index.md` subsection grouping for the two new macOS reference files

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Patterns (read for structural consistency)
- `docs/lifecycle/00-overview.md` — Windows lifecycle overview with Mermaid flow diagram; structural pattern for macOS lifecycle narrative (adapt, don't copy)
- `docs/lifecycle/01-hardware-hash.md` — Windows stage doc internal structure (What Admin Sees / What Happens / Behind the Scenes); adapt headings for macOS
- `docs/reference/powershell-ref.md` — 346-line reference file with Synopsis/Parameters/Returns/Example pattern; model for `macos-commands.md`
- `docs/reference/registry-paths.md` — 24-line table-based reference; model for `macos-log-paths.md`
- `docs/reference/endpoints.md` — Current 57-line Windows endpoint table; extend with macOS section per D-15
- `docs/reference/00-index.md` — Reference index to update with macOS entries per D-14
- `docs/_templates/admin-template-macos.md` — macOS admin template with dual-portal structure; lifecycle doc should cross-reference
- `docs/_glossary-macos.md` — macOS glossary with 6 terms; lifecycle doc should link to glossary entries
- `docs/windows-vs-macos.md` — Platform comparison page with diagnostic tools table; lifecycle doc should cross-reference

### Requirements
- `.planning/REQUIREMENTS.md` — MLIF-01, MLIF-02, MLIF-03 requirements with acceptance criteria

### Prior Phase Context
- `.planning/phases/20-cross-platform-foundation/20-CONTEXT.md` — Platform frontmatter taxonomy, template decisions, navigation restructure decisions (especially D-10 scope clarification)
- `.planning/phases/21-windows-operational-gaps/21-CONTEXT.md` — Folder organization decisions, content overlap handling, reference/ expansion patterns

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/lifecycle/00-overview.md`: Mermaid flow diagram pattern with stage summary table — adapt for 7-stage macOS ADE pipeline
- `docs/reference/powershell-ref.md`: Synopsis/Parameters/Returns/Example pattern for 12 functions — reuse structure for macOS Terminal commands
- `docs/reference/registry-paths.md`: 8-row table format for registry paths — reuse for macOS log paths and config profile locations
- `docs/reference/endpoints.md`: URL/Service/Purpose/Criticality table with test commands section — extend with macOS section

### Established Patterns
- **Frontmatter**: `last_verified`, `review_by` (90-day cycle), `applies_to`, `audience`, `platform` — all new docs use this
- **Cross-references**: Relative markdown links; 98+ cross-file glossary references using `_glossary-macos.md#anchor` pattern
- **Version gate**: Freetext blockquote at top of each doc; adapt for macOS: "This guide covers macOS ADE via Apple Business Manager and Intune"
- **Folder convention**: `00-overview.md` or `00-index.md` pattern in multi-file folders; lifecycle narrative uses `00-ade-lifecycle.md` as single entry point

### Integration Points
- `docs/index.md` lines 94-117: macOS Provisioning section with L1/L2/Admin sub-sections — add lifecycle doc links to all three role sections
- `docs/reference/00-index.md`: Update platform tag, add macOS References section
- `docs/reference/endpoints.md`: Add macOS ADE endpoints section below existing content
- `docs/_glossary-macos.md`: May need additional terms as lifecycle content reveals gaps (lifecycle doc author should flag missing terms)
- `docs/windows-vs-macos.md`: Diagnostic Tools table already maps key macOS commands — lifecycle doc can cross-reference

</code_context>

<specifics>
## Specific Ideas

- All 4 decisions validated through adversarial review (Finder/Adversary/Referee pattern, 12 agents total, 3 per area)
- D-08 clarification: D-10 from Phase 20 governs `index.md` hub navigation only, NOT lifecycle document internals — this was a key finding that dismissed multiple false criticals
- D-16 clarification: Phase 21 D-08 was a phase-scoped execution constraint, not a permanent architectural prohibition — ARCHITECTURE.md Pattern 2 supersedes for macOS integration work
- macOS ADE lifecycle is a single linear pipeline (no branching like Windows deployment modes) — single file is structurally appropriate
- The `_glossary-macos.md` has only 6 terms currently; lifecycle narrative may reference additional terms that need glossary entries — flag during implementation

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 22-macos-lifecycle-foundation*
*Context gathered: 2026-04-14*
