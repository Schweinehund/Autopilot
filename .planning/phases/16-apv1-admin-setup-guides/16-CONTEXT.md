# Phase 16: APv1 Admin Setup Guides - Context

**Gathered:** 2026-04-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Intune admins can configure a complete APv1 (classic) deployment -- hardware hash registration, deployment profiles, ESP policies, dynamic groups, deployment modes, and Intune Connector for AD -- with configuration-caused failure chains documented at each step. This phase delivers APv1 admin setup guides only -- no APv2 content (Phase 15), no L1/L2 runbooks (Phases 4-6, 13-14), no navigation hub updates (Phase 17).

</domain>

<decisions>
## Implementation Decisions

### Guide Organization & File Structure
- **D-01:** Multi-file in a new `docs/admin-setup-apv1/` directory parallel to `docs/admin-setup-apv2/`. Each file uses the admin template pattern. 11 files total, numbered sequentially:
  - `00-overview.md` -- Sequencer/index listing the complete setup path in order with "Next step" links. Includes a single "Consider APv2" callout (see D-14).
  - `01-hardware-hash-upload.md` -- Hardware hash registration covering all 3 paths (OEM, CSV, PowerShell) with decision tree at top.
  - `02-deployment-profile.md` -- Deployment profile with OOBE settings and per-setting "what breaks" warnings.
  - `03-esp-policy.md` -- ESP policy with recommended timeout values, app tracking list, Windows Update setting.
  - `04-dynamic-groups.md` -- Dynamic device group with ZTDId membership rule, sync delay expectations, profile conflict resolution.
  - `05-deployment-modes-overview.md` -- Comparison table of all 3 modes, mode selection guidance, common OOBE profile settings shared across modes. Links to mode-specific files.
  - `06-user-driven.md` -- User-driven mode: full admin-template treatment with hybrid join subsection cross-referencing Intune Connector.
  - `07-pre-provisioning.md` -- Pre-provisioning mode: full admin-template treatment, TPM 2.0 prerequisite, Intune Connector cross-reference for hybrid join.
  - `08-self-deploying.md` -- Self-deploying mode: full admin-template treatment, TPM 2.0 + wired ethernet prerequisites, no user affinity callout.
  - `09-intune-connector-ad.md` -- Intune Connector for AD: standalone guide with connector version gate and current log path (success criterion 7).
  - `10-config-failures.md` -- Cross-cutting configuration-caused failures reverse-lookup table linking to v1.0 troubleshooting runbooks.
- **D-02:** Every file includes "Next step: [link to next file]" footer to maintain sequential flow. The `00-overview.md` serves as the reading-order reference if an admin enters at any file.
- **D-03:** The `10-config-failures.md` reverse-lookup table is a standalone first-class reference artifact, independently linkable from runbooks and other docs. NOT embedded in the overview.

### Hardware Hash Upload Paths
- **D-04:** Decision tree/flowchart at the top of `01-hardware-hash-upload.md` helping the admin determine which path applies to their scenario.
- **D-05:** Depth weighted by complexity/error surface:
  - **PowerShell script** (Get-WindowsAutopilotInfo): Full depth -- most hands-on, most error-prone. Dense "what breaks" callouts covering execution policy blocks, missing NuGet provider, Graph auth errors, stale hashes from reimaged devices.
  - **CSV bulk import**: Moderate depth -- export mechanics, formatting pitfalls (encoding, column headers, duplicate serial numbers), Intune portal upload steps.
  - **OEM delivery**: Minimal depth -- admin's role is verification only (confirm hashes appear in Intune, troubleshoot if missing). 3-5 verification steps, not a fabricated 15-step walkthrough.
- **D-06:** All three paths still get admin-template treatment (Prerequisites, Steps, Verification, "what breaks" callouts) but section length varies proportionally.

### Deployment Modes Organization
- **D-07:** Separate file per deployment mode (3 files) plus a lightweight overview/comparison file and a standalone Intune Connector file. 5 files total for this section (05-09).
- **D-08:** `05-deployment-modes-overview.md` contains: comparison table (prerequisites, use cases, limitations per mode), mode selection guidance, and common OOBE profile settings shared across all modes. Links to mode-specific files for detailed configuration.
- **D-09:** Each mode file (06, 07, 08) gets full admin-template treatment: own Prerequisites, Steps, Verification, Configuration-Caused Failures table. Mode-specific prerequisites are prominent (TPM 2.0 for pre-provisioning and self-deploying, wired ethernet mandatory for self-deploying).
- **D-10:** `09-intune-connector-ad.md` is standalone because it serves two modes (user-driven + pre-provisioning) and has its own distinct prerequisites (connector version gate, log path). Referenced from 06 and 07 for hybrid join scenarios.

### APv1 Positioning Relative to APv2
- **D-11:** Single "Consider APv2" callout in `00-overview.md` only (2-3 sentences: Microsoft recommends APv2 for new deployments when requirements are met, link to comparison page + decision flowchart, note "APv1 silently wins" gotcha).
- **D-12:** Individual guide files (01-10) stay purely APv1-focused with zero APv2 content beyond the standard version gate header and "See Also" footer link to the comparison page.
- **D-13:** This matches the APv2 guides' pattern -- APv2 guides do not embed APv1 equivalents either. Symmetrical treatment preserves both guide sets as clean, focused configuration docs.

### Troubleshooting Integration
- **D-14:** Follow admin template dual-layer pattern exactly: inline "what breaks if misconfigured" callouts per setting (3 elements: what admin sees, what end user sees, link to L1 runbook) PLUS per-file Configuration-Caused Failures table at end of each guide file (files 01-09).
- **D-15:** Per-file tables cover only that file's settings, staying focused and scannable (Phase 15 D-09 precedent). The consolidated reverse-lookup table in `10-config-failures.md` aggregates ALL configuration mistakes across all files with links back to both the relevant guide file and the v1.0 troubleshooting runbook.
- **D-16:** "What breaks" callouts link to v1.0 L1 runbooks (01-05) for APv1 failure scenarios. L2 runbooks cross-referenced in `<details>` blocks for supplementary depth.

### Frontmatter & Cross-Linking
- **D-17:** All files use `applies_to: APv1`, `audience: admin` frontmatter with `last_verified` and `review_by` (90-day cycle) per established pattern.
- **D-18:** Version gate blockquote header on every file: "This guide covers Windows Autopilot (classic). For APv2 (Device Preparation), see [link to APv2 counterpart]." Plus "See also" footer linking to APv1 lifecycle docs, comparison page, and relevant L1 runbooks.

### Claude's Discretion
- Exact wording of "what breaks" callouts (as long as they include all 3 template-required elements)
- PowerShell code style and comments in hardware hash upload procedures
- Number of entries in per-file Configuration-Caused Failures tables
- Exact Mermaid decision tree syntax for hardware hash path selection and mode selection
- Whether `05-deployment-modes-overview.md` includes a visual Mermaid comparison diagram (optional)
- Exact structure of the "Consider APv2" callout in overview (as long as it includes comparison page link and "APv1 silently wins" note)
- Whether common OOBE settings in `05-deployment-modes-overview.md` are duplicated or linked from `02-deployment-profile.md`

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Admin Template (format and structure)
- `docs/_templates/admin-template.md` -- Admin guide template with Prerequisites, Steps, Verification, Configuration-Caused Failures table, and per-setting "what breaks" callout pattern. All Phase 16 files follow this template.

### Phase 15 Output (APv2 counterpart for structural parity)
- `docs/admin-setup-apv2/00-overview.md` -- APv2 admin overview/sequencer pattern. Phase 16 mirrors this structure for APv1.
- `docs/admin-setup-apv2/01-prerequisites-rbac.md` -- APv2 prerequisites pattern. Reference for Phase 16's admin-level prerequisite formatting.

### Phase 11 Output (lifecycle context)
- `docs/lifecycle-apv2/00-overview.md` -- APv2 model overview with ETG explanation. Pattern reference for overview file structure.

### APv1 Lifecycle Docs (content being referenced)
- `docs/lifecycle/00-overview.md` -- APv1 lifecycle overview with two-level Mermaid diagrams. Phase 16 guides reference this for lifecycle context.
- `docs/lifecycle/01-hardware-hash.md` -- Hardware hash import stage guide. Phase 16's `01-hardware-hash-upload.md` covers admin setup; lifecycle doc covers the stage explanation.
- `docs/lifecycle/02-profile-assignment.md` -- Profile assignment stage. Phase 16's `02-deployment-profile.md` covers admin configuration.
- `docs/lifecycle/03-oobe.md` -- OOBE and deployment modes. Phase 16's mode files cover admin configuration per mode.
- `docs/lifecycle/04-esp.md` -- ESP stage guide. Phase 16's `03-esp-policy.md` covers admin ESP policy configuration.

### L1 Runbooks (targets for "what breaks" links)
- `docs/l1-runbooks/01-device-not-registered.md` -- For hardware hash upload failures
- `docs/l1-runbooks/02-esp-stuck-or-failed.md` -- For ESP policy misconfigurations
- `docs/l1-runbooks/03-profile-not-assigned.md` -- For deployment profile and dynamic group issues
- `docs/l1-runbooks/04-network-connectivity.md` -- For connectivity-related failures
- `docs/l1-runbooks/05-oobe-failure.md` -- For deployment mode and OOBE failures
- `docs/l1-runbooks/00-index.md` -- L1 runbook index

### Existing Comparison Page
- `docs/apv1-vs-apv2.md` -- APv1 vs APv2 comparison with decision flowchart. Phase 16 overview links here; version gate headers link here.

### Project Context
- `.planning/REQUIREMENTS.md` -- ADMN-01 through ADMN-07 requirements for this phase
- `.planning/ROADMAP.md` -- Phase 16 success criteria and dependency relationships

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/_templates/admin-template.md` -- Direct template for all Phase 16 files. Copy and fill.
- `docs/admin-setup-apv2/` folder structure -- Pattern for organizing numbered files with 00-overview index (5 files, ~150-200 lines each)
- Phase 11-15 frontmatter pattern -- `last_verified`, `review_by`, `applies_to`, `audience` fields ready to reuse
- Version gate blockquote pattern -- Copy from any Phase 11-15 file and adapt for APv1

### Established Patterns
- **Multi-file per topic:** Every content area uses separate numbered files (lifecycle, runbooks, error codes, admin-setup-apv2). Phase 16 follows this.
- **00-overview/index:** Every multi-file directory starts with a 00-* sequencer file.
- **Admin template structure:** Prerequisites -> Steps (with "what breaks" per setting) -> Verification -> Configuration-Caused Failures table -> See Also
- **`<details>` blocks:** Reserved for supplementary L2 content only. NOT for primary admin procedures (Phase 15 D-06 precedent).
- **Cross-linking:** Internal relative paths using `../` navigation. "Next step" and "See also" footers.
- **Density band:** APv2 admin files average 143-201 lines per content file. Phase 16 should target similar density.

### Integration Points
- `docs/index.md` -- Hub file needs APv1 admin guide links (Phase 17 responsibility, not Phase 16)
- `docs/l1-runbooks/` -- Phase 16 "what breaks" callouts link TO these runbooks
- `docs/common-issues.md` -- Will route to APv1 admin content (Phase 17 responsibility)
- Phase 17 depends on Phase 16 output for navigation hub updates

</code_context>

<specifics>
## Specific Ideas

No specific requirements -- open to standard approaches within the decisions above.

</specifics>

<deferred>
## Deferred Ideas

None -- discussion stayed within phase scope.

</deferred>

---

*Phase: 16-apv1-admin-setup-guides*
*Context gathered: 2026-04-13*
