# Phase 25: Navigation Integration & Polish - Context

**Gathered:** 2026-04-15
**Status:** Ready for planning

<domain>
## Phase Boundary

Users on any platform can find the correct documentation within two clicks from the hub, with macOS content fully integrated into existing navigation structures and quick-reference materials. This phase wires macOS scenarios into common-issues.md routing, updates L1 and L2 quick-reference cards with macOS sections, and verifies every Phase 20-24 file is reachable from the docs hub.

</domain>

<decisions>
## Implementation Decisions

### Common-Issues macOS Routing (NAVX-02)
- **D-01:** Use a hybrid approach: add a new `## macOS ADE Failure Scenarios` section at the bottom of `docs/common-issues.md` with its own symptom categories routing to macOS L1 and L2 runbooks, PLUS one-line cross-reference banners in shared Windows symptom categories pointing to the corresponding macOS section entry (e.g., "For macOS, see [macOS: Device Not Appearing](#device-not-appearing-in-intune)").
- **D-02:** Add a "Choose Your Platform" anchor-link section at the top of `common-issues.md` (matching the pattern in `docs/index.md` lines 17-20) with links to `#windows-autopilot-issues` and `#macos-ade-failure-scenarios`. This addresses macOS discoverability without requiring users to scroll past all Windows content.
- **D-03:** Change the H1 title from "Common Windows Autopilot Issues" to a cross-platform title (e.g., "Common Provisioning Issues" or "Common Autopilot & ADE Issues"). Update the framework banner to reflect both platforms.
- **D-04:** Update the `platform:` frontmatter from implicit Windows to `platform: all` since the file now covers both platforms.
- **D-05:** The macOS section should cover the 6 failure scenarios matching the L1 runbooks created in Phase 24: device not appearing, Setup Assistant failure, profile not applied, app not installed, compliance/access blocked, Company Portal sign-in failure. Each entry gets a symptom description + L1 runbook link + L2 runbook link (where applicable).
- **D-06:** Cross-reference banners follow the established one-line pattern from `docs/decision-trees/00-initial-triage.md` line 9: `> **macOS:** For macOS ADE troubleshooting, see [macOS ADE Triage](06-macos-triage.md).` Apply to shared symptom categories only (device registration, profile issues, app install, compliance) — not to Windows-only categories (TPM, ESP, hybrid join).

### Quick-Reference Card macOS Sections (NAVX-03)
- **D-07:** Append a `## macOS ADE Quick Reference` section to the bottom of `docs/quick-ref-l1.md`, matching how APv2 was appended. Content includes: macOS top checks (3-5 items using ABM portal + Intune admin center actions), macOS escalation triggers, macOS decision tree link, and macOS L1 runbook links.
- **D-08:** Append a `## macOS ADE Quick Reference` section to the bottom of `docs/quick-ref-l2.md`, matching how APv2 was appended. Content includes: IntuneMacODC collection command, key Terminal diagnostic commands (from `docs/reference/macos-commands.md`), critical log paths (from `docs/reference/macos-log-paths.md`), key diagnostic checks, and macOS L2 investigation runbook links.
- **D-09:** Update `platform:` frontmatter on both quick-ref cards from implicit Windows to `platform: all`.
- **D-10:** Add an anchor heading (e.g., `## macOS ADE Quick Reference`) so that `docs/index.md` macOS sections can link directly to the macOS portion of each card via fragment anchor.

### Reachability Audit (Success Criteria #3)
- **D-11:** Perform an exhaustive file-by-file audit of every user-facing documentation file created in Phases 20-24. For each file, verify it is reachable from `docs/index.md` within 2 navigation clicks. Fix any gaps found.
- **D-12:** Exclude template files (`_templates/*.md`) and planning artifacts from the audit — these are not user-facing documentation.
- **D-13:** The audit should produce a checklist in the plan or execution log documenting each file's reachability path (e.g., "index.md > admin-setup-macos/00-overview.md > 01-abm-configuration.md = 2 clicks").

### Cross-Contamination Guardrails (NAVX-02)
- **D-14:** All navigation files use section-level platform separation. macOS content lives in macOS-labeled sections. Windows content lives in Windows-labeled sections. No macOS troubleshooting steps, Terminal commands, or diagnostic procedures appear within Windows sections and vice versa.
- **D-15:** One-line cross-reference banners are permitted at the top of each platform section to route users to the other platform. These are routing mechanisms, not content contamination. This follows the established pattern in `docs/decision-trees/00-initial-triage.md` (line 9) and `docs/decision-trees/06-macos-triage.md`.
- **D-16:** Cross-reference banners are bidirectional: Windows sections get "For macOS, see [link]" and macOS sections get "For Windows, see [link]" — consistent with the symmetric pattern already in the decision tree files.

### Claude's Discretion
- Exact wording of the cross-platform H1 title for common-issues.md
- Exact macOS symptom descriptions in common-issues.md (should reflect macOS-native terminology)
- Which Windows symptom categories get cross-reference banners (use judgment on symptom overlap)
- Exact macOS top checks and escalation triggers for the L1 quick-ref card
- Selection and ordering of Terminal commands and log paths for the L2 quick-ref card
- How to structure the reachability audit checklist (inline in plan vs separate artifact)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Navigation Files to Modify
- `docs/common-issues.md` — Current Windows-only symptom routing index; add macOS section, platform selector, cross-ref banners
- `docs/quick-ref-l1.md` — Current L1 quick-reference card (APv1 + APv2); append macOS section
- `docs/quick-ref-l2.md` — Current L2 quick-reference card (APv1 + APv2); append macOS section
- `docs/index.md` — Docs hub; verify all Phase 20-24 links are populated, add quick-ref macOS anchors

### Existing Patterns (read for structural consistency)
- `docs/decision-trees/00-initial-triage.md` — Cross-reference banner pattern at line 9 (macOS redirect)
- `docs/decision-trees/06-macos-triage.md` — Reverse cross-reference banner pattern (Windows redirect)
- `docs/index.md` lines 17-20 — "Choose Your Platform" anchor-link section pattern to replicate in common-issues.md

### macOS Content (read for routing targets)
- `docs/l1-runbooks/10-macos-device-not-appearing.md` through `docs/l1-runbooks/15-macos-company-portal-sign-in.md` — 6 macOS L1 runbooks (routing targets for common-issues.md)
- `docs/l2-runbooks/10-macos-log-collection.md` through `docs/l2-runbooks/13-macos-compliance.md` — 4 macOS L2 runbooks (routing targets for common-issues.md)
- `docs/decision-trees/06-macos-triage.md` — macOS triage tree (link from L1 quick-ref)
- `docs/reference/macos-commands.md` — Terminal diagnostic commands (content for L2 quick-ref)
- `docs/reference/macos-log-paths.md` — Log paths and config profile locations (content for L2 quick-ref)
- `docs/l1-runbooks/00-index.md` — L1 runbook index with macOS ADE section (verify links)
- `docs/l2-runbooks/00-index.md` — L2 runbook index with macOS ADE section (verify links)

### Cross-Platform Content (verify reachability)
- `docs/windows-vs-macos.md` — Platform comparison page
- `docs/_glossary-macos.md` — macOS glossary
- `docs/macos-lifecycle/00-ade-lifecycle.md` — macOS ADE lifecycle overview
- `docs/admin-setup-macos/00-overview.md` — macOS admin setup overview (gateway to 01-06)
- `docs/reference/macos-capability-matrix.md` — Feature parity comparison

### Architecture and Requirements
- `docs/ARCHITECTURE.md` — Project architectural blueprint (navigation patterns, file placement conventions)
- `.planning/REQUIREMENTS.md` — NAVX-02 and NAVX-03 requirements with acceptance criteria

### Prior Phase Context
- `.planning/phases/20-cross-platform-foundation/20-CONTEXT.md` — Navigation restructure decisions (D-07/D-08/D-09/D-10), platform frontmatter taxonomy
- `.planning/phases/24-macos-troubleshooting/24-CONTEXT.md` — Folder placement (D-01/D-02), triage tree design (D-04/D-06), L1/L2 content decisions

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/common-issues.md` APv2 section (lines 76-131): Pattern for adding a new platform section — framework header, symptom categories, L1/L2 routing links
- `docs/quick-ref-l1.md` APv2 section (lines 52-79): Pattern for appending platform section — top checks, escalation triggers, decision tree, runbook links
- `docs/quick-ref-l2.md` APv2 section (lines 77-128): Pattern for appending platform section — log collection commands, event viewer paths, event IDs, investigation runbooks
- `docs/index.md` "Choose Your Platform" section (lines 17-20): Anchor-link navigation pattern to replicate in common-issues.md

### Established Patterns
- **Cross-reference banners**: One-line `> **macOS:**` or `> **Windows:**` blockquote with link to other platform's equivalent (established in Phase 24 decision trees)
- **Platform selector**: Anchor-link list at top of page directing users to platform sections (established in Phase 20 index.md restructure)
- **Section-based platform separation**: macOS and Windows content in separate `##`-level sections within the same file (index.md, l1-runbooks/00-index.md, l2-runbooks/00-index.md)
- **Frontmatter**: `platform: all` for cross-platform files; update existing files from implicit Windows to `platform: all`

### Integration Points
- `docs/common-issues.md` — Add platform selector, macOS section, cross-ref banners, update title and frontmatter
- `docs/quick-ref-l1.md` — Append macOS section, update frontmatter
- `docs/quick-ref-l2.md` — Append macOS section, update frontmatter
- `docs/index.md` — Add fragment-anchor links to macOS quick-ref sections, verify all Phase 20-24 links populated

</code_context>

<specifics>
## Specific Ideas

- All 4 decisions validated through adversarial review (Finder/Adversary/Referee pattern, 3 agents). 63 issues evaluated, 45 confirmed, 18 false positives eliminated. Recommendations survived adversarial challenge with high confidence.
- The hybrid approach for common-issues.md was selected because it scored lowest in confirmed issues (7 points) compared to separate-only (16 points) and symptom-integrated (32 points). The cross-reference banner pattern from `00-initial-triage.md` is proven and accepted.
- The "Choose Your Platform" selector at the top of common-issues.md directly addresses the Referee's downgraded but confirmed GA4-A-2 issue (no platform disambiguation at entry point).

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 25-navigation-integration-polish*
*Context gathered: 2026-04-15*
