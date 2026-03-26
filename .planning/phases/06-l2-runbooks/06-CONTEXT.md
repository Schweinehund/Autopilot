# Phase 6: L2 Runbooks - Context

**Gathered:** 2026-03-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Technical investigation guides for the five most complex Autopilot failure modes, written for Desktop Engineers (L2). Guides include registry paths, event IDs, PowerShell invocations, and remediation commands sourced from Phase 1 canonical references. Does not include L1 scripted procedures (Phase 5) or navigation indexes (Phase 7).

</domain>

<decisions>
## Implementation Decisions

### Investigation depth & resolution boundaries
- **D-01:** Remediation commands appear inline in resolution sections — L2 engineers get copy-pasteable PowerShell in context, not links to powershell-ref.md
- **D-02:** Each runbook has a per-scenario escalation ceiling defining when L2 stops and escalates:
  - ESP/Policy: escalate when root cause is Microsoft-side service issue or Intune backend bug
  - TPM: escalate when firmware update is needed (vendor-specific, beyond L2 scope)
  - Hybrid join: escalate when domain controller or AD Connect issues are confirmed (infrastructure team, not desktop)
- **D-03:** Tool References section at bottom still links to canonical reference files for full context — inline commands are the working set, references are the complete documentation

### Log collection guide scope & integration
- **D-04:** Log collection is a standalone prerequisite guide (`01-log-collection.md`) — every other runbook opens with "Before starting: collect a diagnostic package per [Log Collection Guide](01-log-collection.md)"
- **D-05:** Log collection guide covers:
  - `mdmdiagnosticstool.exe -area Autopilot -cab -out <path>` (cab is the critical artifact)
  - 4 Event Viewer exports (DeviceManagement-Enterprise-Diagnostics-Provider, Provisioning-Diagnostics-Provider, AAD/Operational, User Device Registration)
  - `Get-AutopilotLogs` as one-command alternative
  - Registry snapshot export (`reg export` for ESP tracking keys)
  - Standard naming convention for collected artifacts (shareable with Microsoft support)
- **D-06:** Individual runbooks point to which specific logs to examine — the collection guide gathers, the investigation guide interprets

### L1-to-L2 handoff structure
- **D-07:** Each L2 runbook opens with a lightweight Triage block (3-4 lines) with dual-path routing:
  - "From L1 escalation?" → list expected data from Phase 4/5 escalation checklists → skip to Step 2
  - "Starting fresh?" → begin at Step 1
- **D-08:** Phase 4 escalation node IDs (ESE2, TPE1, etc.) referenced in triage block so L2 knows which triage path the ticket came through
- **D-09:** Triage block is not a gate — L2 can work without L1 data, just starts earlier in the investigation

### File organization & numbering
- **D-10:** Directory: `docs/l2-runbooks/` — matches `docs/l1-runbooks/`, `docs/decision-trees/`, etc.
- **D-11:** Numbering maps 1:1 to requirements:
  - `00-index.md` — L2 runbook index
  - `01-log-collection.md` (L2RB-01)
  - `02-esp-deep-dive.md` (L2RB-02)
  - `03-tpm-attestation.md` (L2RB-03)
  - `04-hybrid-join.md` (L2RB-04)
  - `05-policy-conflicts.md` (L2RB-05)

### Claude's Discretion
- Number and depth of investigation steps per runbook
- Exact registry key paths to examine beyond those in registry-paths.md (research may surface additional paths)
- Specific Event IDs to call out per failure scenario
- Resolution scenario organization within each runbook
- Index file layout and when-to-use descriptions
- Cross-links between L2 runbooks (e.g., ESP runbook referencing policy conflict runbook)
- How to structure the registry snapshot export naming convention
- Whether to include Mermaid investigation flow diagrams (optional — not required)

</decisions>

<specifics>
## Specific Ideas

- Inline PowerShell commands are the key differentiator from L1 — L2 engineers need working commands, not portal click-paths
- Log collection as standalone prerequisite mirrors how L2 actually works: gather everything first, then investigate
- Dual-path triage block respects both escalation workflow and direct-assignment workflow without adding weight
- Per-runbook escalation ceiling prevents scope creep into infrastructure or vendor territory
- Standard artifact naming convention enables L2 to share diagnostic packages with Microsoft Premier Support without reformatting

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### L2 template and conventions
- `docs/_templates/l2-template.md` — L2 investigation guide template: Context → Investigation → Resolution → Tool References structure
- `docs/_glossary.md` — 26 terms; link on first mention per runbook file
- `docs/apv1-vs-apv2.md` — Version gate banner link target

### Phase 1 reference files (link to, don't duplicate)
- `docs/reference/registry-paths.md` — 8 registry paths including ESP tracking keys; L2 runbooks reference these
- `docs/reference/powershell-ref.md` — 12 functions (7 diagnostic, 5 remediation) with parameters, examples, and safety notes
- `docs/reference/endpoints.md` — 13 endpoints with test commands; referenced from connectivity-related investigation steps

### Phase 3 error code tables (source of truth for error codes)
- `docs/error-codes/02-tpm-attestation.md` — TPM error codes with hardware-specific notes; L2RB-03 references these
- `docs/error-codes/03-esp-enrollment.md` — ESP error codes; L2RB-02 references these
- `docs/error-codes/05-hybrid-join.md` — Hybrid join error codes with event ID mapping; L2RB-04 references these
- `docs/error-codes/00-index.md` — Master index for cross-referencing

### Phase 4 decision trees (escalation terminal mapping)
- `docs/decision-trees/01-esp-failure.md` — ESP escalation terminals (ESE* nodes) with data collection checklists
- `docs/decision-trees/02-profile-assignment.md` — Profile escalation terminals (PRE* nodes)
- `docs/decision-trees/03-tpm-attestation.md` — TPM escalation terminals (TPE* nodes)
- `docs/decision-trees/00-initial-triage.md` — Hub escalation terminals (TRE* nodes)

### Phase 5 L1 runbooks (escalation criteria sections)
- `docs/l1-runbooks/02-esp-stuck-or-failed.md` — ESP escalation criteria; maps to L2RB-02 entry point
- `docs/l1-runbooks/01-device-not-registered.md` — Device registration escalation; informs L2RB-03/04 triage blocks

### Blockers from STATE.md
- ODJ Connector log paths changed June 2025 — verify current path at authoring time for L2RB-04
- Validate policy names against current Microsoft 365 Security Baseline for L2RB-05

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/_templates/l2-template.md`: Direct starting point — copy and fill for each runbook
- `docs/_glossary.md`: 26 terms; link on first mention per runbook file
- `docs/reference/registry-paths.md`: 8 paths including 3 ESP-specific (MEDIUM confidence) — verify and expand during research
- `docs/reference/powershell-ref.md`: All 12 functions documented with parameters and examples — inline commands in runbooks should match these signatures
- `docs/reference/endpoints.md`: 13 endpoints with PowerShell and curl test commands
- `docs/error-codes/`: All 6 files available as error code lookup link targets
- `docs/l1-runbooks/`: Escalation criteria sections define what data L1 collects before handoff

### Established Patterns
- YAML frontmatter: `last_verified`, `review_by`, `applies_to: APv1`, `audience: L2`
- Version gate banner as first content after frontmatter
- First-mention glossary linking per file
- Directory pattern: `docs/[topic]/00-index.md` + numbered files
- Forward-links with "(available after Phase X)" annotation — Phase 4/5 use "(Phase 6)" which will be resolved when L2 runbooks ship
- No screenshots — text descriptions with UI element names
- Direct second-person imperative voice

### Integration Points
- `docs/l2-runbooks/` — new subdirectory alongside existing `docs/` subdirectories
- Phase 4 decision trees: update forward-links from "(Phase 6)" to actual file paths in See Also columns
- Phase 5 L1 runbooks: escalation sections may reference L2 runbooks once they exist
- Phase 7 Navigation: `audience: L2` frontmatter enables role-based routing; index file feeds into master navigation

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 06-l2-runbooks*
*Context gathered: 2026-03-21*
