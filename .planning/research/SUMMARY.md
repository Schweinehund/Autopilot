# Project Research Summary

**Project:** Windows Autopilot Troubleshooting & Improvement Suite — Documentation Milestone
**Domain:** IT Operations Documentation (L1/L2 Tiered Technical Documentation, Markdown-first)
**Researched:** 2026-03-10
**Confidence:** HIGH

## Executive Summary

This milestone delivers a structured Markdown documentation suite for Windows Autopilot troubleshooting, targeting two distinct audiences: L1 Service Desk agents who follow scripted decision trees, and L2 Desktop Engineers who conduct deep technical investigation. Research confirms that the correct approach is strict physical separation of content by audience tier — not sections within a shared file — combined with a scenario-anchored information architecture rather than feature-organized documentation. The tooling stack is lightweight: Markdown (CommonMark) as the canonical source, Mermaid for embedded decision tree flowcharts, MkDocs Material for local documentation site rendering, and Pandoc for DOCX export to SharePoint. All tooling aligns with the existing Python backend environment and requires no new runtime dependencies on the production system.

The recommended build sequence establishes a shared foundation first (glossary, reference tables, PowerShell function reference), builds lifecycle content second to give both audiences a shared mental model, then constructs L1 and L2 content in parallel phases using that foundation. This ordering is dictated by feature dependencies: L1 decision trees cannot be authored until the lifecycle overview and error code lookup table exist, and L2 deep-dive guides require registry paths and log collection references to be canonical before scenario runbooks reference them.

The two critical risks are documentation drift and audience conflation. Autopilot behavior changes monthly via Microsoft Intune service updates — guides written today without explicit "Last verified" dates and review cadences will silently become incorrect within a quarter. Audience conflation (writing one document for both L1 and L2) is the single most common failure mode in IT operations documentation: it renders guides unusable for both groups. Both risks must be addressed in Phase 1 by establishing templates, metadata standards, and the two-file naming convention before any scenario content is written.

## Key Findings

### Recommended Stack

The stack is dominated by existing tooling. Markdown with Mermaid is the clear choice because it renders natively in GitHub, GitLab, and most modern wikis without a build step, and diagrams are text-based and therefore diffable. MkDocs Material (9.7.2) integrates natively with the existing Python environment and enables local site rendering with search, tabs, and native Mermaid support — no separate Mermaid npm install required. Pandoc (3.9) provides the SharePoint export path for organizations that cannot or will not access a docs site. The full stack requires zero new production dependencies; all tooling is dev-time only.

**Core technologies:**
- Markdown (CommonMark): Source format for all documentation — version-controlled, platform-agnostic, exportable
- Mermaid 11.x: Decision tree flowcharts embedded in Markdown — native GitHub/GitLab rendering, text-based and diffable
- MkDocs Material 9.7.2: Local documentation site with search and navigation — Python-based, aligns with existing backend venv
- Pandoc 3.9: DOCX/PDF export for SharePoint distribution — de-facto standard for document format conversion
- markdownlint-cli2 0.21.0: Markdown linting in CI and pre-commit — catches structural errors before merge

**What to skip:** GitBook (vendor lock-in), Sphinx (RST syntax, wrong for operational docs), draw.io/Lucidchart (binary formats, cannot be diffed), heavy CI pipeline for the first milestone.

**Key decision:** If only Markdown in `docs/` is the goal for the first milestone, MkDocs can be deferred — Mermaid renders natively in GitHub and Azure DevOps wikis without a build step. Add MkDocs when a browsable site is needed.

### Expected Features

Content research is sourced directly from Microsoft Learn official documentation (HIGH confidence, verified against the known issues page updated 2026-02-10). The feature set is well-defined and scoped to three primary deployment modes: user-driven, pre-provisioning (white glove), and hybrid Azure AD join.

**Must have (table stakes — v1):**
- Lifecycle overview (hardware hash import through post-enrollment) — shared vocabulary without which no runbook works
- Error code lookup table covering MDM enrollment (0x8018xxxx), TPM attestation, ESP, self-deploying, pre-provisioning, hybrid join, and device registration event IDs — the highest-leverage single document
- Pre-provisioning runbook (L1 + L2 sections) — highest-escalation scenario with hardware-specific edge cases
- User-driven deployment runbook (L1 + L2 sections) — highest-volume deployment mode
- ESP troubleshooting guide (L1 decision tree + L2 registry/log detail) — appears in every deployment mode failure
- Log collection reference (mdmdiagnosticstool.exe commands, Event Viewer paths, registry paths)
- Required network endpoints reference (full list including lgmsapeweu.blob.core.windows.net)
- L1 decision trees (Mermaid flowcharts with explicit terminal states)
- L2 technical deep-dive guides (registry paths, event IDs, PowerShell function references)

**Should have (v1.x, after validation):**
- Hybrid Azure AD join runbook — distinct failure modes (ODJ connector, domain replication, 0x80070774) that warrant standalone treatment
- Policy conflict reference table — AppLocker CSP, DeviceLock, Security Baseline UAC, PreferredAadTenantDomainName, Conditional Access blocking enrollment
- Hardware-specific TPM compatibility reference — ST Micro, Nuvoton RSA-3072, Infineon SLB9672, AMD fTPM, Intel Tiger Lake fTPM known issues
- Self-deployment mode failure matrix

**Defer (v2+):**
- Interactive web-based decision trees — requires frontend milestone (explicitly deferred per PROJECT.md)
- Full PowerShell tool integration into runbooks — belongs in tooling milestone
- Windows Autopilot Device Preparation (APv2) coverage — defer until APv2 adoption is confirmed in target environment

**Anti-features to avoid:** environment-specific screenshots (stale within weeks), automated remediation scripts in L1 guides (dangerous without L2 oversight), complete replication of Microsoft Known Issues page content (creates maintenance burden and version drift).

### Architecture Approach

The documentation structure is organized into three top-level directories under `docs/`: `lifecycle/` for the end-to-end Autopilot flow narrative, `troubleshooting/` containing separate `l1-runbooks/`, `l2-runbooks/`, and `decision-trees/` subdirectories, and `reference/` for lookup tables (error codes, PowerShell functions, registry paths, network endpoints, quick-reference sheets). A shared foundation layer (`_index.md`, `_glossary.md`) provides entry points and shared terminology. Existing files (`docs/common-issues.md`, `docs/architecture.md`) are converted to navigation indexes rather than replaced.

**Major components:**
1. `docs/lifecycle/` (6 files) — End-to-end Autopilot flow; L2 mental model, L1 context; everything else depends on this
2. `docs/troubleshooting/l1-runbooks/` (5 files) — Scripted steps for Service Desk; no registry or PowerShell access required
3. `docs/troubleshooting/l2-runbooks/` (5 files) — Technical investigation guides; registry paths, event IDs, PowerShell invocations
4. `docs/troubleshooting/decision-trees/` (4 files) — Mermaid flowcharts for structured L1 triage; standalone canonical files, also embedded in L1 runbooks
5. `docs/reference/` (7+ files) — Lookup tables for error codes, PowerShell functions, registry paths, endpoints, quick-reference sheets
6. `docs/_index.md` + `docs/_glossary.md` — Role-based entry points; written last (links to everything)

**Key patterns:**
- Tiered entry points: L1 and L2 reach their content without navigating through the other tier
- Scenario-anchored cross-references: all links go to specific sections (`file.md#section`), never to file tops
- PowerShell function linking convention: every function mention links to `reference/powershell-ref.md#function-name`
- Mermaid for any decision with more than two branches; prose for L2 background context

### Critical Pitfalls

1. **APv1 vs. APv2 conflation** — Windows Autopilot Device Preparation (APv2) has no hardware hash, no ESP, no pre-provisioning, and no hybrid join. Every guide must open with an explicit version gate. Create a disambiguation page before any scenario content is written. Failure to do this produces L1 agents following inapplicable runbooks. Address in Phase 1.

2. **Single-audience documentation for both L1 and L2** — Writing one document with both registry paths and "call the user" instructions means neither audience uses it. Physical file separation by audience tier is non-negotiable. L1 guides must never reference PowerShell execution or registry access. L2 guides must not contain steps that should have happened before escalation. Address in Phase 1 by establishing the two-file convention and templates.

3. **Error code tables without deployment-mode context** — The same error code (e.g., 0x80180014) has different root causes and fixes depending on deployment mode. Tables with a single "Fix" column sorted numerically produce wrong L1 actions. Every code row must include: deployment mode, failure phase, root cause(s) with conditions, and per-cause fix. Address in Phase 3 (Error Code Lookup Tables).

4. **Network prerequisite checks buried or absent** — A large share of Autopilot failures are network-related (proxy, TLS inspection, captive portal, domain controller unreachable for hybrid join). Every L1 decision tree must open with a network reachability gate before any other branch. The full endpoint list must be a standalone reference document. Address in Phase 2.

5. **No review cadence or "Last verified" metadata** — Microsoft changes Intune monthly. Guides without explicit review dates silently become incorrect. Every guide must include "Last verified:" and "Review by:" dates in frontmatter. Establish this standard in Phase 1 templates; it cannot be retrofitted cheaply.

6. **Pre-provisioning treated as an edge case** — Pre-provisioning has distinct failure modes at the technician-to-user phase seam (TPM attestation codes 0x81039001/0x81039023/0x81039024, LAPS policy timing, autologon GPO conflicts, LOB+Win32 app mixing in ESP). It must be a first-class deliverable with its own runbook, not a subsection of self-deploying. Address in Phase 2.

7. **Flowcharts without explicit terminal states** — Decision trees with "retry" loops and "contact support" leaf nodes cause L1 agents to loop indefinitely and potentially worsen device state with repeated destructive actions. Every flowchart must have three terminal categories: Resolved, Escalate to L2 (with data collection checklist), Escalate to infrastructure/network. Address in Phase 4.

## Implications for Roadmap

Based on the dependency graph from FEATURES.md and the build order from ARCHITECTURE.md, combined with pitfall-to-phase mapping from PITFALLS.md, the following phase structure is recommended:

### Phase 1: Foundation and Standards

**Rationale:** All other content depends on shared terminology, templates, and reference tables sourced directly from the existing PowerShell modules. The two-file audience convention and metadata standards must be established before any scenario content is written — retrofitting these is high-cost. APv1/APv2 version taxonomy must be established before any troubleshooting content references a deployment mode.

**Delivers:**
- `docs/_glossary.md` — shared terminology (OOBE, ESP, TPM, ZTD, APv1, APv2)
- `docs/reference/registry-paths.md` — all paths from AutopilotDiagnostics.psm1 and AutopilotRemediation.psm1
- `docs/reference/endpoints.md` — full network endpoint list (including lgmsapeweu.blob.core.windows.net)
- `docs/reference/powershell-ref.md` — all 12 exported functions (7 diagnostic, 5 remediation) with ShouldProcess notes
- L1/L2 document templates with "Last verified" / "Review by" frontmatter and version gate header
- APv1 vs. APv2 disambiguation page

**Features addressed:** Log collection reference, required network endpoints reference (foundational), PowerShell function reference
**Pitfalls addressed:** APv1/APv2 conflation (Pitfall 1), audience conflation (Pitfall 4), no review cadence (Pitfall 8)

### Phase 2: Lifecycle Documentation

**Rationale:** Lifecycle docs provide the mental model that makes troubleshooting logical. L1 decision trees cannot be written until the lifecycle flow is documented — L1 agents cannot use a decision tree that branches on "ESP failure" if they do not know what ESP is. L2 engineers need the lifecycle to understand what should happen before diagnosing why it did not.

**Delivers:**
- `docs/lifecycle/00-overview.md` — full Autopilot flow diagram (Mermaid) + narrative
- `docs/lifecycle/01-hardware-hash-import.md` through `05-post-enrollment.md`

**Features addressed:** End-to-end lifecycle overview (table stakes)
**Pitfalls addressed:** Audience conflation (narrative tone differs per section); pre-provisioning treated as edge case (lifecycle explicitly shows technician flow as a distinct path)

### Phase 3: Error Code Reference

**Rationale:** The error code lookup table is the single highest-leverage document. Every scenario runbook references it. It must exist before L1 and L2 runbooks are written, so runbooks can link to specific error sections rather than explaining codes inline. The full error inventory is already researched (FEATURES.md) — this phase executes it with correct multi-cause, phase-grouped structure.

**Delivers:**
- `docs/reference/error-codes.md` — master error lookup table with deployment mode, failure phase, multi-cause entries, per-cause fixes, and escalation conditions
- Covers: MDM enrollment (0x8018xxxx), TPM attestation, ESP, self-deploying, pre-provisioning, hybrid join, device registration event IDs (807, 809, 815, 908, 171, 172)

**Features addressed:** Error code lookup table (P1), self-deployment failure matrix subset, event ID reference
**Pitfalls addressed:** Error code tables without context columns (Pitfall 2), Windows version differences (codes tagged with applicable OS versions)

### Phase 4: L1 Decision Trees

**Rationale:** L1 decision trees are the primary usability deliverable for Service Desk. They depend on the lifecycle overview (Phase 2) and the error code table (Phase 3). They must be built before L1 runbooks because runbooks embed or link to the trees. Network reachability gates must open every tree (addressing Pitfall 5). Terminal states (Resolved / Escalate L2 / Escalate Network) must be explicit in every tree (addressing Pitfall 6).

**Delivers:**
- `docs/troubleshooting/decision-trees/l1-initial-triage.md` — first call: registered? connectivity? profile?
- `docs/troubleshooting/decision-trees/esp-failure-tree.md` — device phase vs. user phase branching
- `docs/troubleshooting/decision-trees/profile-assignment-tree.md` — group? sync? tenant? profile config?
- `docs/troubleshooting/decision-trees/tpm-attestation-tree.md` — BIOS? firmware? ownership? Secure Boot?

**Features addressed:** L1 decision trees (P1)
**Pitfalls addressed:** Flowcharts without terminal states (Pitfall 6), network pre-checks absent (Pitfall 5), destructive actions in L1 flowcharts (Security Pitfalls)

### Phase 5: L1 Scenario Runbooks

**Rationale:** L1 runbooks are the scripted procedure layer for Service Desk. They depend on the decision trees (Phase 4) and the error code table (Phase 3). They must be strictly L1-scoped: no registry access, no PowerShell execution, escalation triggers with explicit data collection checklists. Each runbook starts with "Start here: check X first" — no background context before the first action.

**Delivers:**
- `docs/troubleshooting/l1-runbooks/device-not-in-autopilot.md`
- `docs/troubleshooting/l1-runbooks/esp-stuck-or-failed.md`
- `docs/troubleshooting/l1-runbooks/profile-not-assigned.md`
- `docs/troubleshooting/l1-runbooks/network-connectivity.md`
- `docs/troubleshooting/l1-runbooks/oobe-fails-immediately.md`

**Features addressed:** User-driven deployment runbook (L1 section), ESP troubleshooting guide (L1 section), pre-provisioning runbook (L1 section)
**Pitfalls addressed:** Single-audience docs (L1-only content), no prerequisite checklists (every runbook starts with prerequisites)

### Phase 6: L2 Deep-Dive Runbooks

**Rationale:** L2 runbooks require the full foundation (Phases 1-3) and the PowerShell function reference. They are independent of the L1 runbooks but must exist before the documentation suite is complete. Pre-provisioning and hybrid join receive first-class standalone treatment here — not subsections of other modes.

**Delivers:**
- `docs/troubleshooting/l2-runbooks/log-collection-guide.md` — mdmdiagnosticstool.exe, Get-AutopilotLogs, Event Viewer paths
- `docs/troubleshooting/l2-runbooks/esp-deep-dive.md` — ESP registry structure, device vs. user phase investigation, LOB+Win32 conflict, Teams MSI conflict
- `docs/troubleshooting/l2-runbooks/tpm-attestation-failure.md` — hardware-specific codes, firmware update paths
- `docs/troubleshooting/l2-runbooks/hybrid-join-failure.md` — connector prerequisites, ODJ blob flow, 0x80070774, connector version 6.2501.2000.5+
- `docs/troubleshooting/l2-runbooks/policy-conflict-analysis.md` — AppLocker CSP, DeviceLock, Security Baseline UAC, GPO conflicts

**Features addressed:** Pre-provisioning runbook (L2 section), ESP troubleshooting guide (L2 section), L2 technical deep-dive guides (P1), hybrid join runbook (P2), policy conflict reference (P2)
**Pitfalls addressed:** Pre-provisioning treated as edge case (Pitfall 3), ESP device/user phase conflation (Pitfall 10), hybrid join complexity underestimated (Pitfall 9)

### Phase 7: Entry Points and Navigation Completion

**Rationale:** The master index and quick-reference sheets are written last because they link to everything else. Writing them before content exists produces placeholder-filled indexes that never get updated. Converting existing files (common-issues.md, architecture.md) to navigation indexes completes the migration.

**Delivers:**
- `docs/_index.md` — role-based entry point (L1 path / L2 path)
- `docs/reference/quick-ref/l1-quick-ref.md` — top 5 checks, top 3 escalation triggers
- `docs/reference/quick-ref/l2-quick-ref.md` — PowerShell commands, log paths, event IDs
- `docs/reference/quick-ref/log-locations.md` — all log locations in one place
- Updated `docs/common-issues.md` — navigation index (content migrated to runbooks)
- Updated `docs/architecture.md` — add cross-links to reference/ and L2 runbooks

**Features addressed:** All navigation and discoverability; quick-reference cheat sheets
**Pitfalls addressed:** Orphaned content without navigation (scenario-anchored cross-references throughout)

### Phase Ordering Rationale

- **Foundation before content:** Reference tables (registry paths, endpoints, PowerShell functions) are sourced directly from the existing codebase — they require no research, only transcription. Building them first means every subsequent phase can link to canonical references rather than repeating information inline.
- **Lifecycle before troubleshooting:** The lifecycle overview is the prerequisite for L1 decision trees. L1 agents cannot triage "ESP failure" without knowing what ESP is. L2 engineers cannot diagnose deviation without knowing the expected path.
- **Error codes before runbooks:** Runbooks that cannot link to the error code table must define errors inline, creating duplicate content that drifts out of sync. Error codes as a standalone reference is the single-source-of-truth pattern from ARCHITECTURE.md.
- **Decision trees before L1 runbooks:** L1 runbooks embed or link to decision trees. Authoring the tree structure first ensures runbooks reference consistent triage logic.
- **L1 and L2 runbooks sequenced separately:** L1 runbooks (Phase 5) and L2 runbooks (Phase 6) are independent once the foundation is established. They can be parallelized if authoring resources allow.
- **Index last:** `_index.md` links to everything. It cannot be authoritative until every file it links to exists.

### Research Flags

Phases likely needing deeper research or validation during planning:

- **Phase 6 (L2 Hybrid Join Runbook):** The ODJ Connector behavior changed in June 2025 (new MSA-based service account). Connector log paths changed. The current correct path and version 6.2501.2000.5 behavior should be validated against the live Microsoft Learn connector documentation before the runbook is written.
- **Phase 6 (L2 Policy Conflict Analysis):** The full policy conflict matrix requires validation against current Microsoft 365 Security Baseline versions. Policy names and registry keys may have changed since the research date.
- **Phase 3 (Error Codes — APv2 tagging):** Windows Autopilot Device Preparation error behavior is less thoroughly documented in public sources. Codes that appear in both APv1 and APv2 need verification before tagging.

Phases with standard patterns (research-phase not required):

- **Phase 1 (Foundation):** Reference content sourced directly from existing codebase files — no external research needed, direct transcription.
- **Phase 2 (Lifecycle):** Microsoft Learn lifecycle documentation is comprehensive and HIGH confidence. Standard narrative documentation task.
- **Phase 4 (L1 Decision Trees):** Mermaid flowchart authoring is well-understood. Decision logic comes from researched runbook content. No external research needed.
- **Phase 7 (Entry Points):** Pure navigation and cross-linking. No domain research needed.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All tool versions verified against official package registries as of 2026-03-10. MkDocs Material 9.7.2, Mermaid 11.13.0, Pandoc 3.9, markdownlint-cli2 0.21.0 all confirmed current. |
| Features | HIGH | Primary source is Microsoft Learn official documentation verified against the known issues page updated 2026-02-10. Error code inventory is comprehensive and verified. |
| Architecture | HIGH | Derived from direct inspection of existing codebase (docs/, src/powershell/) and established documentation architecture patterns. No inference required. |
| Pitfalls | HIGH | Sourced from Microsoft Learn official FAQ and known issues (updated February 2026), community validation from multiple independent sources. Breaking changes confirmed against What's New changelog. |

**Overall confidence:** HIGH

### Gaps to Address

- **APv2 error behavior documentation:** Windows Autopilot Device Preparation error codes and behavior are less thoroughly documented than classic Autopilot. During Phase 3 (error codes), verify each code's applicability to APv2 against the Microsoft Learn Device Preparation known issues page before tagging rows.
- **Policy conflict baseline versions:** The policy conflict table in FEATURES.md is comprehensive but not pinned to a specific Microsoft 365 Security Baseline version. During Phase 6 authoring, verify current Security Baseline settings against the Intune Security Baseline release notes.
- **ODJ Connector current log path:** PITFALLS.md notes the log path changed in a recent update. The correct current path (`Applications and Services Logs > Microsoft > Intune > ODJConnectorService`) is documented but should be re-verified at Phase 6 authoring time against the live Microsoft Learn connector troubleshooting page.
- **Pandoc export testing:** The stack recommends Pandoc for SharePoint DOCX export. If SharePoint is a target distribution channel, test the Mermaid → DOCX export pipeline before committing to it — Mermaid diagrams in DOCX require manual PNG export as Pandoc cannot render Mermaid to DOCX natively.

## Sources

### Primary (HIGH confidence)
- [Windows Autopilot troubleshooting FAQ — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/troubleshooting-faq) — Updated 2026-02-05. Error codes, event IDs, registry paths.
- [Windows Autopilot known issues — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/known-issues) — Updated 2026-02-10. TPM attestation codes, hybrid join timeout, self-deployment errors.
- [Troubleshoot the Enrollment Status Page — Microsoft Learn](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-enrollment/understand-troubleshoot-esp) — Updated 2025-07-14. ESP registry structure, log collection.
- [mkdocs-material PyPI](https://pypi.org/project/mkdocs-material/) — Version 9.7.2, Insiders features now free.
- [mermaid npm page](https://www.npmjs.com/package/mermaid) — Version 11.13.0 confirmed current.
- [Pandoc releases](https://pandoc.org/releases.html) — Version 3.9 confirmed current.
- Existing codebase: `src/powershell/AutopilotDiagnostics.psm1`, `src/powershell/AutopilotRemediation.psm1` — All 12 exported functions catalogued.

### Secondary (MEDIUM confidence)
- [TPM Attestation Failures — Patch My PC blog](https://patchmypc.com/blog/tpm-attestation-failures-windows-autopilot/) — 0x800705b4 timeout context in pre-provisioning.
- [TPM Attestation EKRSA3072 failure — Patch Tuesday blog](https://patchtuesday.com/blog/tech-blog/tpm-attestation-ekrsa3072-windows-autopilot-0x81039001/) — ST Micro / Nuvoton RSA-3072 hardware-specific context.
- [Autopilot Hybrid Azure AD Join Breakpoints — MDM Tech Space](https://joymalya.com/autopilot-hybrid-azure-ad-join-breakpoints/) — Hybrid join failure analysis.
- [A Tale of Two Autopilots — FlowDevs](https://www.flowdevs.io/post/a-tale-of-two-autopilots) — APv1 vs. APv2 architecture comparison.
- [mark (kovetskiy/mark) GitHub](https://github.com/kovetskiy/mark) — Confluence sync tool, community-supported.

### Tertiary (LOW confidence / single source)
- [APv2 and pre-provisioning — Out of Office Hours](https://oofhours.com/2025/05/30/apv2-and-pre-provisioning-we-can-do-that-too/) — APv2 pre-provisioning status (not officially documented by Microsoft).
- Community-validated issue: White Glove keyboard language preset failure — [GitHub MicrosoftDocs/memdocs issue #1285](https://github.com/MicrosoftDocs/memdocs/issues/1285).

---
*Research completed: 2026-03-10*
*Ready for roadmap: yes*
