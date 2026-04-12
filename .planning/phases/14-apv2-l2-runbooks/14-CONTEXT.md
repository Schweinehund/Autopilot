# Phase 14: APv2 L2 Runbooks - Context

**Gathered:** 2026-04-12
**Status:** Ready for planning

<domain>
## Phase Boundary

L2 Desktop Engineers can collect APv2-specific logs and interpret the Intune deployment report to diagnose failures that L1 cannot resolve. This phase delivers an APv2 log collection guide, a BootstrapperAgent event ID reference, and a deployment report interpretation guide. No L1 content (Phase 13), no admin setup guides (Phases 15-16), no navigation hub updates (Phase 17).

</domain>

<decisions>
## Implementation Decisions

### File Organization
- **D-01:** Create 3 separate files in `docs/l2-runbooks/`, continuing the one-topic-per-file pattern established by APv1 L2 guides (01-05):
  - `06-apv2-log-collection.md` — APv2 log collection prerequisite (BootstrapperAgent event log export, deployment report navigation path, artifact naming convention). Explicitly states MDM Diagnostic Tool does NOT apply to APv2.
  - `07-apv2-event-ids.md` — BootstrapperAgent event ID lookup with confidence-attributed sources
  - `08-apv2-deployment-report.md` — Intune APv2 deployment report interpretation (status values, phase breakdown, failure identification)
- **D-02:** Update `docs/l2-runbooks/00-index.md` to add an APv2 section with escalation mapping table (matching APv1 pattern). Update frontmatter from `applies_to: APv1` to `applies_to: both`.
- **D-03:** Do NOT extend or modify existing APv1 files (01-05). APv1 files remain `applies_to: APv1` with their existing version gates intact. Framework separation is maintained.

### BootstrapperAgent Event ID Presentation
- **D-04:** Use a tiered table format in `07-apv2-event-ids.md`:
  - **Top section:** 8-12 key actionable event IDs with full guidance (Event ID | Description | Investigation Steps | Source). These are the IDs that indicate specific failures with clear next actions (deployment failure, app/script failure, timeout, enrollment errors).
  - **Bottom section:** Compact reference table of all remaining known IDs (Event ID | One-line description | Source link). For informational IDs (deployment started, step completed, sync initiated) and rare error IDs where the action is "collect logs and escalate."
- **D-05:** Single confidence attribution banner at the section header rather than per-row confidence markers. Banner states: source is oofhours.com and Call4Cloud community research, confidence is MEDIUM, no official Microsoft reference exists as of [date], links to pending todo for Microsoft guidance check.
- **D-06:** If Microsoft publishes an official BootstrapperAgent event ID reference before authoring, the tiered structure allows clean upgrade: re-source top section to HIGH confidence, replace bottom section with link to official reference.

### Deployment Report Guide Format
- **D-07:** Use hybrid format in `08-apv2-deployment-report.md`:
  - **Top section:** Status value reference table for fast lookup (Column | Possible Values | Meaning | Action). Covers every field/tab in the deployment report. Directly satisfies success criterion #3.
  - **Bottom section:** Investigation paths per failure type organized by deployment phase (Entra join failed, enrollment failed, app install failed, script failed, timeout). Same multi-scenario resolution pattern as existing APv1 L2 guides.
- **D-08:** Open with a short "How to access the deployment report" section with exact portal navigation path (Intune admin center > Devices > Monitor > Windows Autopilot device preparation deployments > select device). Self-contained — L2 doesn't need to look elsewhere to find the report.

### L1-to-L2 Handoff Pattern
- **D-09:** Every APv2 L2 guide opens with a Triage block matching the existing APv1 L2 pattern:
  - "From L1 escalation (APE1/APE2/APE3)? L1 collected [data list]. Skip to Step 2."
  - "Starting fresh? Begin at Step 1."
  - Step 1 is always log collection / portal state verification. Step 2+ begins L2-specific investigation.
- **D-10:** Triage block references specific APv2 escalation node IDs from Phase 13's triage tree (`04-apv2-triage.md`) and lists the exact data L1 collected per the L1 runbook escalation criteria sections.
- **D-11:** Consider updating `docs/_templates/l2-template.md` to include the Triage block pattern, since all 4 APv1 L2 guides use it but the template currently omits it.

### Frontmatter & Cross-Linking
- **D-12:** All new files use `applies_to: APv2`, `audience: L2` frontmatter with `last_verified` and `review_by` (90-day cycle) per established pattern.
- **D-13:** Version gate blockquote header on every file: "This guide covers Autopilot Device Preparation (APv2). For APv1 (classic), see [link]." Plus "See also" footer linking to APv1 equivalent L2 guide and comparison page.
- **D-14:** Update forward references from Phase 12 failure catalog (`06-apv2-device-preparation.md`) to real markdown links pointing to L2 runbook files created in this phase.
- **D-15:** Each L2 guide's "Collect Before Escalating" section (escalation ceiling) should state clearly: "No further L2 resolution available — escalate to Microsoft Premier Support with [artifact list]."

### Claude's Discretion
- Exact BootstrapperAgent event log path and export commands (PowerShell or Event Viewer instructions)
- Exact event IDs to include in the curated top section vs compact bottom section (8-12 key IDs is guidance, not prescriptive)
- Exact Intune portal navigation paths (may vary slightly by portal version)
- Wording of triage block "L1 collected" data lists (as long as they match Phase 13 escalation criteria)
- Whether to include a Mermaid diagram showing the deployment report structure (optional)
- Whether `06-apv2-log-collection.md` content is substantial enough standalone or should be combined with event IDs (author's judgment — separate files preferred but combine if log collection is truly < 20 lines)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 13 Output (direct dependency — L2 picks up from L1 escalation)
- `docs/decision-trees/04-apv2-triage.md` — APv2 triage tree with 3 L2 escalation nodes (APE1, APE2, APE3). L2 triage blocks must reference these node IDs.
- `docs/l1-runbooks/06-apv2-deployment-not-launched.md` — L1 runbook with escalation criteria defining what L1 collects before L2 handoff
- `docs/l1-runbooks/07-apv2-apps-not-installed.md` — L1 runbook with escalation criteria
- `docs/l1-runbooks/08-apv2-apv1-conflict.md` — L1 runbook with escalation criteria
- `docs/l1-runbooks/09-apv2-deployment-timeout.md` — L1 runbook with escalation criteria

### Phase 12 Output (failure catalog with forward references to update)
- `docs/error-codes/06-apv2-device-preparation.md` — APv2 failure catalog with 10 scenarios. Forward references to L2 runbooks must be updated to real markdown links.

### Existing L2 Patterns (read for format, structure, tone, triage block pattern)
- `docs/l2-runbooks/00-index.md` — APv1 L2 index with escalation mapping table. Being updated with APv2 section.
- `docs/l2-runbooks/01-log-collection.md` — APv1 log collection prerequisite guide. Pattern for APv2 log collection (but different tools/sources).
- `docs/l2-runbooks/02-esp-deep-dive.md` — Exemplar L2 guide with triage block, value interpretation tables embedded in investigation steps, multi-scenario resolutions.
- `docs/_templates/l2-template.md` — L2 template (note: does NOT include triage block, but all implemented L2 guides use one).

### Phase 11 Output (lifecycle context)
- `docs/lifecycle-apv2/02-deployment-flow.md` — 10-step deployment flow. L2 guides reference step numbers when identifying failure points.
- `docs/lifecycle-apv2/01-prerequisites.md` — Prerequisites checklist. Some L2 investigations trace back to missing prerequisites.

### Project Context
- `.planning/REQUIREMENTS.md` — TROU-04 and TROU-05 requirements for this phase
- `.planning/ROADMAP.md` — Phase 14 success criteria, dependencies, and goal
- `.planning/STATE.md` — BootstrapperAgent event ID sourcing decision, pending todos for Microsoft guidance check

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/l2-runbooks/` — 5 existing APv1 L2 guides with established triage block, investigation steps, value tables, and resolution scenario patterns
- Phase 11/12/13 frontmatter pattern — `last_verified`, `review_by`, `applies_to`, `audience` fields ready to reuse
- Version gate blockquote pattern — Copy from any Phase 11-13 file and adapt for APv2 L2
- Triage block pattern — Copy from any APv1 L2 guide (02-05) and adapt escalation node IDs to APv2 (APE1/APE2/APE3)

### Established Patterns
- **L2 investigation structure:** Frontmatter → version gate → title → Triage block (L1 escalation path + fresh start path) → Context → Investigation Steps (numbered, with embedded value tables) → Resolution Scenarios → Escalation Ceiling → Tool References
- **Value interpretation tables:** Embedded within investigation steps (e.g., FirstSync table in 02-esp-deep-dive.md, ManufacturerId table in 03-tpm-attestation.md). APv2 deployment report guide follows this same micro-pattern.
- **Cross-linking:** Internal relative paths using `../` navigation. Glossary terms linked on first mention per file.
- **Escalation mapping:** `00-index.md` has a table mapping L1 escalation node IDs to specific L2 runbook files

### Integration Points
- `docs/l2-runbooks/00-index.md` — Needs APv2 section added, frontmatter updated to `applies_to: both`, escalation mapping table extended with APv2 nodes
- `docs/error-codes/06-apv2-device-preparation.md` — Forward references to L2 runbooks must be updated to real markdown links
- `docs/_templates/l2-template.md` — Consider adding triage block pattern to align template with actual practice
- Phase 15 depends on this phase for "configuration-caused failure" reverse-lookup references

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

*Phase: 14-apv2-l2-runbooks*
*Context gathered: 2026-04-12*
