# Phase 4: L1 Decision Trees - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Mermaid flowcharts for structured L1 Service Desk triage with explicit terminal states. Four decision trees route agents to a resolution or escalation point without ambiguity. Does not include scripted runbook procedures (Phase 5) or technical investigation guides (Phase 6).

</domain>

<decisions>
## Implementation Decisions

### Tree Structure & Relationships
- Hub-and-spoke model: Initial triage tree (L1DT-01) is the single entry point, routing to 3 scenario trees (ESP, Profile, TPM)
- All trees use TD (top-down) Mermaid direction for consistent hierarchical flow
- Routing-level granularity: 5-10 decision nodes per tree — trees route to outcomes, runbooks instruct on how to fix
- Each scenario tree has a validation gate at entry with a "Return to Triage" escape if agent is in the wrong tree
- Triage tree includes catch-all branches: network failure, device not in portal, OOBE crash/other — not just the 3 dedicated scenarios
- Deployment mode question (user-driven / pre-provisioning / self-deploying) appears after network gate as an early branch
- Single path for both new and re-enrolling devices — no split by device history
- No "quick wins" gate (reboot check) in triage — reboot guidance belongs in resolved terminal nodes where appropriate
- Mermaid `click` syntax links triage routing nodes to scenario tree files (degrades gracefully in non-interactive renderers)

### Network Reachability Gate
- Two-step check: (1) "Can device reach any website?" (general internet), (2) "Can device reach login.microsoftonline.com?" (Autopilot-specific)
- General internet failure → Escalate Infrastructure (physical/proxy issue)
- Autopilot endpoints blocked → Escalate Infrastructure (firewall rule)
- Browser-based check: L1 opens browser on device, navigates to login.microsoftonline.com — no PowerShell

### Triage Routing (after network gate + mode selection)
1. Network fails general gate → Escalate: No connectivity
2. Network fails Autopilot endpoint gate → Escalate: Firewall/proxy
3. Device not in Autopilot portal → Check hash status, then Escalate L2
4. ESP stuck or error → ESP tree (01-esp-failure.md)
5. No profile assigned → Profile tree (02-profile-assignment.md)
6. TPM/provisioning error → TPM tree (03-tpm-attestation.md)
7. OOBE crash/other → Basic checks, Escalate L2

### ESP Tree Specifics
- Primary branch: "Does ESP show an error code?" — separates error-code-lookup path from stuck/timeout path
- Stuck path branches on device vs user phase, then duration thresholds
- Phase identification via screen content: "Setting up your device..." = device phase, "Setting up for [username]..." = user phase, "Can't tell" = escalate with both noted

### Profile Assignment Tree Specifics
- Assumes device IS in Autopilot portal (triage routes "not in portal" separately)
- Branches: profile assigned? → correct profile? → applied to device? / In correct group? → wait or add to group

### TPM Attestation Tree Specifics
- Covers both pre-provisioning AND self-deploying TPM failures (same L1 triage path)
- Includes basic BIOS checks L1 can perform: "Is TPM enabled in BIOS?", "Is TPM version 2.0?"
- TPM disabled in BIOS → Resolved: Enable TPM (most common L1-fixable TPM issue)
- TPM not 2.0 → Escalate: Hardware
- After BIOS checks, routes to error code lookup in TPM error table

### Retry Logic
- Linear retry pattern — no loop arrows in Mermaid (avoids spaghetti diagrams)
- Retry nodes are sequential: action → "Resolved?" → Yes: Resolved / No: Escalate L2
- Every retry-resolved terminal has a fail path to escalation

### Terminal States
- Three terminal categories enforced: Resolved (green), Escalate to L2 (red), Escalate to Infrastructure/Network (orange)
- Mermaid classDef color-coding: `resolved fill:#28a745,color:#fff`, `escalateL2 fill:#dc3545,color:#fff`, `escalateInfra fill:#fd7e14,color:#fff`
- Shape by type: diamonds for decisions, rectangles for actions/routing, rounded rectangles for terminal states
- Short keyword edge labels (1-3 words) — detail in nodes, not edges

### Resolved Terminals
- Include brief action phrase (under 8 words): "Resolved: Enable TPM in BIOS", "Resolved: Reboot, retry OOBE"
- Forward-link to Phase 5 L1 Runbooks with "(available after Phase 5)" annotation in Resolution & Next Steps table

### Escalation Terminals
- Keyed escalation data table below each diagram (not in-node text — keeps diagrams clean)
- Table columns: ID | Scenario | Collect | See Also
- L2 escalation collects: device serial, error code, deployment mode, timestamp + scenario-specific items
- Infrastructure escalation collects: device IP/subnet, proxy configured, which endpoint failed, browser error, Wi-Fi or ethernet
- Distinct checklists for L2 vs infrastructure teams
- Forward-link to Phase 6 L2 Runbooks with "(Phase 6)" annotation in See Also column
- No severity/urgency indicators — L2 triages based on scenario and data collected

### Error Code Integration
- Error-code-lookup nodes link to the specific category file (not master index): ESP tree → 03-esp-enrollment.md, TPM tree → 02-tpm-attestation.md, Profile tree → 01-mdm-enrollment.md
- Triage "unknown error" branch links to master index (00-index.md) as fallback
- "Follow L1 Action column" as terminal — error table handles retry/escalation logic per error
- Error code not found in table → immediate Escalate L2 (no generic steps)

### Decision Node Content
- Checks limited to portal + screen observable: Intune portal status, device screen text, browser test, BIOS settings
- No PowerShell, registry, or log references (L1 constraint)
- Binary yes/no phrasing for decision diamonds; multi-option "What...?" only for category selection (mode, symptom)
- Multi-option nodes include "Don't know" branch routing to safe default (collect data, escalate)
- User/symptom language in node text ("Is device stuck on loading screen?") not technical jargon ("Is ESP in device phase timeout?")
- Companion "How to Check" table below diagram keyed by node ID — provides "where to look" guidance
- Companion "Resolution & Next Steps" table keyed by resolved node ID — provides runbook forward-links

### Node ID Convention
- 2-letter tree prefix + type letter + number
- Tree prefixes: TR=Triage, ES=ESP, PR=Profile, TP=TPM
- Type letters: D=Decision, A=Action, R=Resolved, E=Escalate
- Example: TRD1, ESE2, TPR1 — unique across all files, referenceable in tickets

### File Organization
- 4 files in `docs/decision-trees/`:
  - `00-initial-triage.md` — Hub document with legend, "How to Use" section, scenario tree links (L1DT-01)
  - `01-esp-failure.md` — ESP failure triage (L1DT-02)
  - `02-profile-assignment.md` — Profile assignment failure triage (L1DT-03)
  - `03-tpm-attestation.md` — TPM attestation failure triage for pre-prov and self-deploying (L1DT-04)

### File Structure (per tree file)
Custom structure — not based on L1 or L2 templates:
1. YAML frontmatter (`last_verified`, `review_by`, `applies_to: APv1`, `audience: L1`)
2. Version gate banner
3. Title + brief intro (2-3 sentences)
4. Decision Tree (Mermaid diagram)
5. How to Check table (keyed to decision nodes)
6. Escalation Data table (keyed to escalation terminals)
7. Resolution & Next Steps table (keyed to resolved terminals)
8. Navigation
9. Version History

### Triage Hub Document (00-initial-triage.md)
Additional sections before the diagram:
- "How to Use These Trees" (2-3 sentences: start here, follow branches)
- Legend table (shape meanings + color meanings)
- Scenario Trees list with links to all 3 scenario files
- APv2 note: "These trees cover Autopilot (classic). For Device Preparation, see apv1-vs-apv2.md."

### Navigation Pattern
- Hub-based: every scenario tree links back to 00-initial-triage.md
- No prev/next between scenario trees (they're not sequential)
- Triage links out to all scenario trees

### Conventions (Consistent with Phase 1/2/3)
- YAML frontmatter: `last_verified`, `review_by`, `applies_to: APv1`, `audience: L1`
- Version gate banner as first content after frontmatter
- First-mention glossary linking in companion text (not in Mermaid diagram nodes)
- Forward-links with "(available after Phase X)" annotation
- Version History table at bottom
- No screenshots — text descriptions only
- Direct second-person voice

### APv2 Handling
- Minimal: one APv2 note in triage file only — "These trees cover Autopilot (classic)"
- Link to apv1-vs-apv2.md
- No APv2 notes in scenario tree files (triage already gates this)

### Claude's Discretion
- Exact Mermaid diagram layout, edge routing, and subgraph usage
- Specific decision node questions beyond the ones discussed (e.g., exact profile assignment checks)
- Number of decision nodes per tree within the 5-10 routing-level guideline
- Exact wording of "How to Use These Trees" and intro paragraphs
- How to Check table content for nodes not specifically discussed
- Escalation data specifics beyond the base pattern established
- classDef exact hex values (the ones provided are starting points)
- Whether to use Mermaid subgraphs for visual grouping within trees

</decisions>

<specifics>
## Specific Ideas

- The hub-and-spoke model mirrors real L1 triage workflow: identify category first, then dive into scenario
- Two-step network gate catches the distinction between "no network at all" and "network works but Autopilot blocked" — different escalation teams
- Browser-based endpoint check (navigate to login.microsoftonline.com) is the most reliable L1-safe network test
- ESP phase identification via screen text ("Setting up your device..." vs "Setting up for [name]...") is the only L1-safe way to distinguish device/user phase
- Node IDs (TRD1, ESE2) should be referenceable in ticket notes so L1 can say "agent reached node ESE2" for handoff context
- Error lookup terminals defer to Phase 3 tables as source of truth — trees route, tables instruct
- Companion tables (How to Check, Escalation Data, Resolution) are keyed by node ID — same pattern for all three, creating a consistent reference system below each diagram

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/_templates/l1-template.md`: Frontmatter field reference (last_verified, review_by, applies_to, audience) — section structure NOT reused (custom structure for decision trees)
- `docs/_glossary.md`: 26 terms to link on first mention in companion text sections
- `docs/apv1-vs-apv2.md`: Link target for APv2 note in triage file
- `docs/error-codes/01-mdm-enrollment.md` through `05-hybrid-join.md`: Link targets for error code lookup terminals
- `docs/error-codes/00-index.md`: Fallback link target for "unknown error" triage branch
- `docs/lifecycle/00-overview.md`: Mermaid classDef + click pattern reference (established in Phase 2)

### Established Patterns
- YAML frontmatter with `last_verified`, `review_by`, `applies_to`, `audience` fields
- Version gate banner as first content element after frontmatter
- Forward-links with "(available after Phase X)" annotation
- First-mention glossary linking per file
- Mermaid TD direction for overview/hub diagrams (Phase 2 precedent)
- Mermaid classDef for color-coded nodes (Phase 2 precedent)
- Directory pattern: `docs/[topic]/00-overview-or-index.md` + numbered files

### Integration Points
- `docs/decision-trees/` — new subdirectory alongside `docs/lifecycle/`, `docs/error-codes/`, `docs/reference/`
- Phase 3 error code tables: decision trees link to specific category files for error lookup
- Phase 5 L1 Runbooks: forward-links from Resolution & Next Steps tables (future `docs/l1-runbooks/`)
- Phase 6 L2 Runbooks: forward-links from Escalation Data See Also column (future `docs/l2-runbooks/`)
- Phase 7 Navigation: `audience: L1` frontmatter enables role-based routing

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-l1-decision-trees*
*Context gathered: 2026-03-20*
