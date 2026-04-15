# Phase 24: macOS Troubleshooting - Context

**Gathered:** 2026-04-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver macOS L1 triage decision tree, L1 runbooks for top enrollment failure scenarios (portal-only actions), L2 log collection guide, and L2 diagnostic runbooks — enabling L1 and L2 support staff to independently triage and resolve macOS enrollment and management failures using platform-appropriate tools.

</domain>

<decisions>
## Implementation Decisions

### Folder Placement
- **D-01:** Place all macOS troubleshooting files inside the existing `docs/decision-trees/`, `docs/l1-runbooks/`, and `docs/l2-runbooks/` folders using numbered continuation. macOS triage tree starts at `06-*` in `decision-trees/`, L1 runbooks start at `10-*` in `l1-runbooks/`, L2 runbooks start at `10-*` in `l2-runbooks/`. This follows ARCHITECTURE.md Pattern 5 (Numbering Continuation) and the established APv2 precedent where APv2 files (06-09 in l1-runbooks, 06-08 in l2-runbooks) coexist alongside APv1 files.
- **D-02:** Do NOT create separate `l1-runbooks-macos/`, `l2-runbooks-macos/`, or `troubleshooting-macos/` folders. The content-type folders (`decision-trees/`, `l1-runbooks/`, `l2-runbooks/`) are scoped by content type and audience, not by platform. Phase 22 established this pattern when it placed `macos-commands.md` and `macos-log-paths.md` inside the existing `docs/reference/` folder.
- **D-03:** Update `l1-runbooks/00-index.md` and `l2-runbooks/00-index.md` with new "## macOS ADE Runbooks" sections, following the same section-header pattern used for APv1/APv2 separation. Add `platform: all` frontmatter to index files. ARCHITECTURE.md rates these as LOW-priority modifications.

### Triage Tree Design (MTRO-01)
- **D-04:** Create a standalone `docs/decision-trees/06-macos-triage.md` file. This follows the APv2 precedent where `04-apv2-triage.md` was created as a separate file rather than integrated into `00-initial-triage.md`. The macOS tree is a self-contained Mermaid decision tree with "Did Setup Assistant complete?" as the root decision node.
- **D-05:** Do NOT integrate the macOS triage tree into `00-initial-triage.md`. The Windows tree is `applies_to: APv1` with Windows-specific routing (network → registration → deployment mode → symptoms). macOS has different routing logic (Setup Assistant → enrollment status → symptom).
- **D-06:** Add a one-line cross-reference banner to `00-initial-triage.md` directing macOS users to the macOS tree, following the existing APv2 banner pattern (line 7: "For Device Preparation (APv2), see [APv2 triage](04-apv2-triage.md)").
- **D-07:** The tree must route to the correct scripted runbook within 3 decision steps from "Did Setup Assistant complete?" per Success Criteria #1.

### L1 Failure Scenario Coverage (MTRO-02)
- **D-08:** Create 6 L1 runbooks covering all macOS failure categories identified in Phase 23's config-failures reverse-lookup table (`docs/admin-setup-macos/06-config-failures.md`), plus the Company Portal / Conditional Access gap identified during adversarial review:
  1. **Device not appearing in Intune** — ABM Configuration Failures (device not in ABM, wrong MDM server, expired ADE token, enrollment profile not assigned before power-on)
  2. **Setup Assistant stuck or failed** — Enrollment Profile Failures (authentication method wrong, Await Configuration misconfigured, locked enrollment, Setup Assistant screen issues)
  3. **Configuration profile not applied** — Configuration Profile Failures (Wi-Fi SSID mismatch, firewall blocking MDM, FileVault without escrow, certificate missing)
  4. **App not installed** — App Deployment Failures (DMG wrapping, PKG detection, VPP token/license issues, size limits)
  5. **Compliance failure / access blocked** — Compliance Policy Failures + Conditional Access chicken-and-egg (SIP disabled, OS version mismatch, password timing gap, CA blocking non-compliant device)
  6. **Company Portal sign-in failure** — ADE Lifecycle Stage 6 failures (Company Portal not deployed, user skips sign-in, Entra registration incomplete, CA blocks resource access)
- **D-09:** All L1 runbooks use portal-only actions (ABM + Intune admin center). Zero Terminal commands per MTRO-02. Follow the established L1 runbook pattern: frontmatter, version gate, prerequisites, numbered steps, "Say to user" callouts, escalation criteria.
- **D-10:** Use the established branching pattern (as in `02-esp-stuck-or-failed.md`) when a runbook covers multiple sub-scenarios. Each execution path stays under 15 steps per the project convention.

### L2 Diagnostic Approach (MTRO-03, MTRO-04)
- **D-11:** L2 log collection guide leads with IntuneMacODC as the primary comprehensive collection tool, with Terminal commands as secondary for granular investigation and as a fallback when IntuneMacODC cannot be downloaded. This matches MTRO-03's explicit word order ("IntuneMacODC tool and Terminal commands") and follows the Windows structural parallel (mdmdiagnosticstool.exe as Section 1 in `l2-runbooks/01-log-collection.md`).
- **D-12:** IntuneMacODC is a macOS-native diagnostic tool (bash script), NOT a "Windows pattern adapted for Mac." P10 (Pitfall) prohibits transplanting Windows-specific tools (registry, PowerShell, mdmdiagnosticstool.exe) — it does NOT prohibit Microsoft-provided macOS tools. The project's own `windows-vs-macos.md` maps IntuneMacODC as the macOS equivalent, confirming it is platform-appropriate.
- **D-13:** L2 investigation runbooks (MTRO-04) cover three areas: profile delivery investigation, app install failure diagnosis, and compliance evaluation troubleshooting. These use macOS-native diagnostics (`profiles show`, `log show`, `system_profiler`, Intune agent logs at `/Library/Logs/Microsoft/Intune/`) per MTRO-04's explicit requirement. Cross-reference `docs/reference/macos-commands.md` and `docs/reference/macos-log-paths.md` as canonical references.
- **D-14:** L2 log collection guide structure parallels the Windows guide: Section 1 (IntuneMacODC comprehensive collection), Section 2 (Terminal-based targeted commands as supplement/fallback), Section 3 (specific log paths per macOS version from `macos-log-paths.md`).

### Cross-Phase Patterns (Carried Forward)
- **D-15:** L1 templates forbid Terminal commands — portal-only actions (v1.0 convention extended to macOS).
- **D-16:** L2 templates link to canonical reference files: `docs/reference/macos-commands.md` and `docs/reference/macos-log-paths.md` (Phase 22).
- **D-17:** Resolve all `[TBD - Phase 24]` placeholder links in Phase 23 admin setup guides (`docs/admin-setup-macos/`) with actual runbook file paths.
- **D-18:** `platform: macOS` frontmatter for all new L1/L2 files. `applies_to: ADE` for the macOS-specific framework tag.
- **D-19:** Version gate blockquote: "This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [link]."

### Claude's Discretion
- Exact file numbering within each folder (starting at 06 for decision-trees, 10 for l1-runbooks and l2-runbooks, per ARCHITECTURE.md)
- Whether L2 investigation runbooks are 2 files (profile+compliance combined, app separate) or 3 files (one per MTRO-04 area)
- How to structure the L2 log collection guide's macOS-version-specific paths (inline table vs subsections)
- Whether `06-config-failures.md` `[TBD - Phase 24]` links point to individual runbook files or to the L1 index with section anchors
- Exact branching structure within each L1 runbook (which sub-scenarios get branches)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Troubleshooting Patterns (read for structural consistency)
- `docs/decision-trees/00-initial-triage.md` — Windows APv1 initial triage tree with Mermaid diagram; structural pattern for macOS triage tree (adapt, don't copy)
- `docs/decision-trees/04-apv2-triage.md` — APv2 triage tree as separate file; direct precedent for standalone macOS triage tree
- `docs/l1-runbooks/00-index.md` — L1 runbook index with APv1/APv2 sections; add macOS ADE section
- `docs/l1-runbooks/01-device-not-registered.md` — Windows L1 runbook pattern (portal-only actions, "Say to user" callouts, escalation criteria); model for macOS L1 runbooks
- `docs/l1-runbooks/02-esp-stuck-or-failed.md` — Multi-mode L1 runbook with branching pattern; model for runbooks covering multiple sub-scenarios
- `docs/l2-runbooks/00-index.md` — L2 runbook index; add macOS ADE section
- `docs/l2-runbooks/01-log-collection.md` — Windows L2 log collection guide (mdmdiagnosticstool.exe first, manual exports second); structural model for macOS L2 log collection
- `docs/l2-runbooks/02-esp-deep-dive.md` — Windows L2 investigation runbook pattern; model for macOS L2 investigation runbooks

### macOS Content (read for cross-referencing)
- `docs/macos-lifecycle/00-ade-lifecycle.md` — macOS ADE 7-stage lifecycle; Stage 6 (Company Portal) is critical for runbook #5 and #6
- `docs/admin-setup-macos/06-config-failures.md` — Consolidated config-caused failures reverse-lookup table; defines the 5 failure categories that map to L1 runbooks
- `docs/admin-setup-macos/01-abm-configuration.md` — ABM config guide; informs L1 runbook #1 failure scenarios
- `docs/admin-setup-macos/02-enrollment-profile.md` — Enrollment profile guide; informs L1 runbook #2 failure scenarios
- `docs/admin-setup-macos/03-configuration-profiles.md` — Config profiles guide; informs L1 runbook #3 failure scenarios
- `docs/admin-setup-macos/04-app-deployment.md` — App deployment guide; informs L1 runbook #4 failure scenarios
- `docs/admin-setup-macos/05-compliance-policy.md` — Compliance policy guide with CA cross-reference; informs L1 runbook #5
- `docs/reference/macos-commands.md` — macOS Terminal commands reference (L2 canonical reference)
- `docs/reference/macos-log-paths.md` — macOS log paths and config profile filesystem locations (L2 canonical reference)
- `docs/reference/endpoints.md` — Network endpoints reference with macOS ADE section
- `docs/_glossary-macos.md` — macOS glossary with bidirectional cross-references

### Architecture and Navigation
- `docs/ARCHITECTURE.md` — Project architectural blueprint; Pattern 5 (Numbering Continuation) defines file placement
- `docs/index.md` — Navigation hub; macOS L1/L2 sections have TBD placeholders to update
- `docs/windows-vs-macos.md` — Platform comparison page; diagnostic tools mapping confirms IntuneMacODC as macOS-native

### Requirements
- `.planning/REQUIREMENTS.md` — MTRO-01 through MTRO-04 requirements with acceptance criteria

### Prior Phase Context
- `.planning/phases/20-cross-platform-foundation/20-CONTEXT.md` — Platform frontmatter taxonomy (D-19/D-20), navigation restructure (D-07/D-10), macOS template decisions
- `.planning/phases/22-macos-lifecycle-foundation/22-CONTEXT.md` — Lifecycle folder placement, reference file patterns, endpoint extension decisions
- `.planning/phases/23-macos-admin-setup/23-CONTEXT.md` — Admin setup guide organization, config-failures reverse-lookup table, `[TBD - Phase 24]` placeholder convention

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/decision-trees/04-apv2-triage.md`: Standalone triage tree with Mermaid diagram, version gate, cross-references — direct template for `06-macos-triage.md`
- `docs/l1-runbooks/01-device-not-registered.md`: 58-line L1 runbook with portal-only steps, "Say to user" callouts, escalation criteria — template for macOS L1 runbooks
- `docs/l1-runbooks/02-esp-stuck-or-failed.md`: 142-line multi-mode runbook with branching (3 sub-scenarios, 8 steps per path) — branching pattern for complex macOS runbooks
- `docs/l2-runbooks/01-log-collection.md`: Windows L2 log collection with mdmdiagnosticstool.exe as primary, Event Viewer secondary — structural model for macOS IntuneMacODC-first guide
- `docs/admin-setup-macos/06-config-failures.md`: 5-category config-failures table with `[TBD - Phase 24]` links — defines the failure categories L1 runbooks must cover

### Established Patterns
- **Frontmatter**: `last_verified`, `review_by` (90-day cycle), `applies_to`, `audience`, `platform` — all new docs use this
- **L1 convention**: Portal-only actions, "Say to user" script callouts, explicit escalation criteria with data collection checklist
- **L2 convention**: "Gather everything first, then investigate" principle; L2 runbooks open with prerequisite to collect diagnostic package
- **Cross-references**: Relative markdown links; `_glossary-macos.md#anchor` pattern for glossary terms
- **Version gate**: Freetext blockquote at top for platform disambiguation
- **File numbering**: Sequential integers; macOS continues after last Windows/APv2 file

### Integration Points
- `docs/index.md` lines 99-115: macOS L1 and L2 sections with TBD placeholders → update with links to new files
- `docs/l1-runbooks/00-index.md`: Add "## macOS ADE Runbooks" section with 6 runbook entries
- `docs/l2-runbooks/00-index.md`: Add "## macOS ADE Runbooks" section with L2 runbook entries
- `docs/decision-trees/00-initial-triage.md`: Add one-line macOS cross-reference banner (following APv2 banner pattern)
- `docs/admin-setup-macos/06-config-failures.md`: Resolve all `[TBD - Phase 24]` placeholder links with actual runbook file paths
- `docs/admin-setup-macos/01-05`: Resolve any `[TBD - Phase 24]` runbook links in individual admin guides

</code_context>

<specifics>
## Specific Ideas

- All 4 decisions validated through adversarial review (Finder/Adversary/Referee pattern, 12 agents total, 3 per area)
- ARCHITECTURE.md was the decisive evidence for folder placement — it explicitly plans macOS files inside existing `l1-runbooks/`, `l2-runbooks/`, `decision-trees/` with numbered continuation (Pattern 5). The Finder initially recommended separate folders but the Adversary and Referee overruled based on the architectural blueprint.
- IntuneMacODC-first was initially rejected by the Finder (who argued it was a "Windows pattern adapted for Mac") but the Adversary proved that P10 prohibits Windows-specific tools (registry, PowerShell, mdmdiagnosticstool.exe), NOT Microsoft-provided macOS-native tools. The Referee confirmed based on MTRO-03's explicit word order.
- The 6-runbook set emerged from combining the Finder's Option A (5 scenario-specific) with the cross-cutting gap analysis that identified the Company Portal / Conditional Access scenario as a missing high-volume failure category.
- Network connectivity troubleshooting is handled within the "Setup Assistant stuck/failed" runbook via branching, rather than a separate runbook — macOS has fewer endpoint dependencies than Windows Autopilot.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 24-macos-troubleshooting*
*Context gathered: 2026-04-14*
