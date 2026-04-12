# Phase 5: L1 Runbooks - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Scripted Service Desk procedures for the five highest-volume Autopilot failure scenarios. L1 agents follow step-by-step instructions to resolution or escalation. No registry access, no PowerShell execution, no log file references. Does not include technical investigation guides (Phase 6) or navigation indexes (Phase 7).

</domain>

<decisions>
## Implementation Decisions

### Runbook-to-tree handoff
- **D-01:** Hybrid model — runbooks are standalone but open with a quick prerequisite checklist
- **D-02:** Prerequisites section lists what the decision tree would have confirmed (e.g., "device is in Autopilot portal, network passes")
- **D-03:** Tree-followers skim prerequisites in seconds; standalone users catch what they missed
- **D-04:** Decision tree "Resolved" and "Resolution & Next Steps" terminals link directly to runbook files (or anchored sections within them)

### Branching within runbooks
- **D-05:** Linear step sequences only — no if/then branching inside runbooks
- **D-06:** Decision trees already narrow the scenario; runbooks execute, not re-triage
- **D-07:** Where a runbook covers sub-scenarios (e.g., ESP device phase vs user phase), use labeled sections with separate numbered step sequences
- **D-08:** Decision tree terminals deep-link to specific anchored sections (e.g., `01-esp.md#device-phase-steps`)

### Step verbosity and user communication
- **D-09:** Detailed steps with full click-path navigation (e.g., "Open Intune admin center → Devices → Windows → Windows enrollment → Devices. Search for the device serial number.")
- **D-10:** User communication scripts in blockquote callouts — tell L1 exactly what to say to the end user
- **D-11:** Timing expectations included at wait steps (e.g., "This step typically takes 5-15 minutes. If longer than 20 minutes, proceed to escalation.")
- **D-12:** User scripts prevent improvised explanations that set wrong expectations and cause repeat calls

### File organization
- **D-13:** Directory: `docs/l1-runbooks/` — matches existing `docs/decision-trees/`, `docs/error-codes/`, `docs/lifecycle/` pattern
- **D-14:** Index file: `00-index.md` — landing page listing all five runbooks with one-line descriptions
- **D-15:** Numbering matches L1RB requirement numbers:
  - `01-device-not-registered.md` (L1RB-01)
  - `02-esp-stuck-or-failed.md` (L1RB-02)
  - `03-profile-not-assigned.md` (L1RB-03)
  - `04-network-connectivity.md` (L1RB-04)
  - `05-oobe-failure.md` (L1RB-05)

### Claude's Discretion
- Exact prerequisites per runbook (derived from decision tree entry conditions)
- Number of steps per runbook (as many as needed for completeness)
- Specific user communication script wording
- Timing thresholds (use industry conventions and Phase 4 precedent where set — e.g., 30 min device phase, 60 min user phase)
- How many anchored sub-sections the ESP runbook needs
- Index file layout and descriptions
- Cross-links between runbooks (e.g., network runbook referenced from ESP runbook if connectivity is a factor)

</decisions>

<specifics>
## Specific Ideas

- Blockquote callouts for user scripts keep them visually distinct from action steps — L1 agents can spot them instantly
- Timing expectations are critical because the #1 L1 mistake is escalating too early (ESP "stuck" at 8 minutes when device phase normally takes 20)
- Prerequisites section serves double duty: quick-check for tree-followers, catch-up for standalone users
- Decision trees route, runbooks instruct — clean separation of concerns

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Runbook structure
- `docs/_templates/l1-template.md` — L1 runbook template with Prerequisites → Steps → Escalation Criteria structure; enforces no-PowerShell/no-registry constraint

### Decision tree integration
- `docs/decision-trees/00-initial-triage.md` — Hub document; "Resolution & Next Steps" table contains forward-links to Phase 5 runbooks
- `docs/decision-trees/01-esp-failure.md` — ESP tree terminals that link to `02-esp-stuck-or-failed.md`
- `docs/decision-trees/02-profile-assignment.md` — Profile tree terminals that link to `03-profile-not-assigned.md`
- `docs/decision-trees/03-tpm-attestation.md` — TPM tree terminals; TPM-specific scenarios escalate to L2, but some resolved terminals may reference runbooks

### Error code tables (referenced from runbook steps, not duplicated)
- `docs/error-codes/00-index.md` — Master error code index for "look up error code" steps
- `docs/error-codes/01-mdm-enrollment.md` — MDM enrollment errors referenced from device-not-registered runbook
- `docs/error-codes/03-esp-enrollment.md` — ESP errors referenced from ESP runbook

### Lifecycle context (for accurate step descriptions)
- `docs/lifecycle/04-esp.md` — ESP device/user phase breakdown; informs ESP runbook section structure
- `docs/lifecycle/02-profile-assignment.md` — Profile assignment flow; informs profile runbook steps

### Foundation references
- `docs/_glossary.md` — Terms to link on first mention per file
- `docs/apv1-vs-apv2.md` — Link target for version gate banner
- `docs/reference/endpoints.md` — Network endpoints referenced from network connectivity runbook

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/_templates/l1-template.md`: Direct starting point — copy and fill for each runbook
- `docs/_glossary.md`: 26 terms; link on first mention per runbook file
- `docs/apv1-vs-apv2.md`: Version gate banner link target
- `docs/error-codes/`: All 5 category files available as "look up error code" link targets
- `docs/decision-trees/`: All 4 files have forward-link placeholders to Phase 5 runbooks

### Established Patterns
- YAML frontmatter: `last_verified`, `review_by`, `applies_to`, `audience: L1`
- Version gate banner as first content after frontmatter
- First-mention glossary linking per file
- Directory pattern: `docs/[topic]/00-index-or-overview.md` + numbered files
- Forward-links with "(available after Phase X)" annotation — Phase 4 trees use "(available after Phase 5)" which will be resolved when runbooks ship
- No screenshots — text descriptions with UI element names
- Direct second-person imperative voice

### Integration Points
- `docs/l1-runbooks/` — new subdirectory alongside existing `docs/` subdirectories
- Phase 4 decision trees: update forward-links from "(available after Phase 5)" to actual file paths
- Phase 6 L2 Runbooks: escalation sections will forward-link to `docs/l2-runbooks/` with "(available after Phase 6)" annotation
- Phase 7 Navigation: `audience: L1` frontmatter enables role-based routing; index file feeds into master navigation

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-l1-runbooks*
*Context gathered: 2026-03-20*
