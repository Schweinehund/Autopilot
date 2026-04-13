# Phase 15: APv2 Admin Setup Guides - Context

**Gathered:** 2026-04-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Intune admins can configure a complete APv2 (Device Preparation) deployment from scratch, including prerequisites verification, custom RBAC role creation, Enrollment Time Grouping device group setup, Device Preparation policy configuration, and corporate identifier management with enrollment restriction interaction. This phase delivers admin setup guides only -- no L1/L2 runbooks (Phases 13-14), no APv1 admin guides (Phase 16), no navigation hub updates (Phase 17).

</domain>

<decisions>
## Implementation Decisions

### Guide Organization
- **D-01:** Multi-file per admin task in a new `docs/admin-setup-apv2/` directory, following the established project pattern (lifecycle-apv2 has 4 files, l1-runbooks has 10, l2-runbooks has 9). Each file uses the admin template pattern.
- **D-02:** File structure:
  - `00-overview.md` -- Sequencer/index file listing the complete setup path in order with "Next step" links. Satisfies success criterion 1 ("without leaving the guide") by treating the numbered file set as the guide with clear sequential navigation.
  - `01-prerequisites-rbac.md` -- APv2 prerequisites verification AND custom RBAC role creation (5 permission categories). RBAC positioned as prerequisite before any setup step per criterion 4. APv1 deregistration is the FIRST prerequisite per STATE.md decision.
  - `02-etg-device-group.md` -- Enrollment Time Grouping device group creation with 4-item checklist, Intune Provisioning Client AppID, and PowerShell procedure.
  - `03-device-preparation-policy.md` -- Device Preparation policy configuration with per-setting "what breaks" callouts.
  - `04-corporate-identifiers.md` -- Corporate identifier setup with enrollment restriction interaction subsection.
- **D-03:** Every file includes "Next step: [link to next file]" footer to maintain sequential flow across files. The `00-overview.md` serves as the reading-order reference if an admin enters at any file.

### ETG Configuration Depth
- **D-04:** Full PowerShell procedure for adding the Intune Provisioning Client as ETG device group owner presented **inline and visible** in `02-etg-device-group.md`. No collapsible blocks, no separate script files. Admin audience expects PowerShell.
- **D-05:** ETG section contains: (1) 4-item checklist with the Intune Provisioning Client AppID `f1346770-5b25-470b-88bd-d5744ab7952c`, (2) full PowerShell code block for Connect-MgGraph + Get-MgServicePrincipal + New-MgGroupOwnerByRef with module version noted, (3) verification steps, (4) "what breaks if misconfigured" callout. All visible by default per criterion 2's "explicitly states" requirement.
- **D-06:** Collapsible `<details>` blocks remain reserved for supplementary L2 content only (project precedent from lifecycle-apv2/00-overview.md and 02-deployment-flow.md). NOT used for primary admin-audience procedural content.

### Troubleshooting Integration
- **D-07:** Follow admin template dual-layer pattern exactly: inline "what breaks if misconfigured" callouts per setting (3 elements: what admin sees, what end user sees, link to L1 runbook) PLUS consolidated Configuration-Caused Failures reverse-lookup table at end of each guide file.
- **D-08:** Callouts reference the setting's own step for fix context (e.g., "re-check Step 3 above") rather than duplicating fix instructions. L1 runbook links go to the whole runbook file (L1 runbooks use numbered steps, not per-misconfiguration section anchors).
- **D-09:** Configuration-Caused Failures table in each file covers only that file's settings. Per-file tables stay focused and scannable (unlike a single monolithic table spanning all topics).

### Corporate Identifiers Scope
- **D-10:** `04-corporate-identifiers.md` includes: (1) corporate identifier setup steps (supported types, how to add in Intune portal), (2) verification, AND (3) a substantive enrollment restriction interaction subsection covering: when corporate identifiers are needed for APv2, how enrollment restrictions interact with APv2 ETG enrollment, and conflict precedence rules.
- **D-11:** The enrollment restriction subsection is scoped to APv2-relevant interactions only -- not a full enrollment restrictions guide. Covers enough to satisfy criterion 5 ("enrollment restriction conflict behavior explicitly documented") without over-scoping into platform-specific restriction behavior unrelated to APv2.
- **D-12:** Entra ID Local Administrator settings conflict -- valid combinations table must be re-pulled from the live Microsoft known issues page at authoring time per STATE.md pending todo.

### Frontmatter & Cross-Linking
- **D-13:** All files use `applies_to: APv2`, `audience: admin` frontmatter with `last_verified` and `review_by` (90-day cycle) per established pattern.
- **D-14:** Version gate blockquote header on every file: "This guide covers Autopilot Device Preparation (APv2). For APv1 (classic), see [link]." Plus "See also" footer linking to lifecycle-apv2 docs, comparison page, and relevant L1 runbooks.
- **D-15:** Prerequisites file links back to `docs/lifecycle-apv2/01-prerequisites.md` (lifecycle prerequisites) to avoid duplication -- Phase 15 prerequisites focus on admin configuration prerequisites (RBAC, licensing), not device-level prerequisites already covered in Phase 11.

### Claude's Discretion
- Exact file numbering within `docs/admin-setup-apv2/` (numbering convention proposed above is guidance)
- Exact wording of "what breaks" callouts (as long as they include all 3 template-required elements)
- PowerShell code style and comments in the ETG procedure
- Number of entries in Configuration-Caused Failures tables per file
- Whether `00-overview.md` includes a visual Mermaid setup flow diagram (optional)
- Exact structure of enrollment restriction conflict precedence rules in `04-corporate-identifiers.md`

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Admin Template (format and structure)
- `docs/_templates/admin-template.md` -- Admin guide template with Prerequisites, Steps, Verification, Configuration-Caused Failures table, and per-setting "what breaks" callout pattern. All Phase 15 files follow this template.

### Phase 11 Output (lifecycle context and prerequisites)
- `docs/lifecycle-apv2/00-overview.md` -- APv2 model overview with ETG explanation. Admin guides reference this for lifecycle context.
- `docs/lifecycle-apv2/01-prerequisites.md` -- APv2 prerequisites checklist (device-level). Phase 15 prerequisites focus on admin-level config prerequisites to avoid duplication.
- `docs/lifecycle-apv2/02-deployment-flow.md` -- 10-step deployment flow. Admin guides reference step numbers when explaining "what breaks" consequences.

### Phase 13 Output (L1 runbooks for "what breaks" links)
- `docs/l1-runbooks/06-apv2-deployment-not-launched.md` -- L1 runbook covering deployment-not-launched scenario. Phase 15 "what breaks" callouts link here for Device Preparation policy and ETG misconfigurations.
- `docs/l1-runbooks/07-apv2-apps-not-installed.md` -- L1 runbook for app/script install failures. Phase 15 links here for app assignment and script misconfigurations.
- `docs/l1-runbooks/08-apv2-apv1-conflict.md` -- L1 runbook for APv1 registration conflict. Phase 15 links here for the "APv1 deregistration required" prerequisite callout.
- `docs/l1-runbooks/09-apv2-deployment-timeout.md` -- L1 runbook for deployment timeout. Phase 15 links here for timeout-related misconfigurations.
- `docs/l1-runbooks/00-index.md` -- L1 runbook index with APv2 section.

### Phase 12 Output (failure catalog for cross-referencing)
- `docs/error-codes/06-apv2-device-preparation.md` -- APv2 failure catalog with 10 scenarios. Phase 15 "what breaks" callouts may cross-reference specific failure scenarios.

### Existing Comparison Page
- `docs/apv1-vs-apv2.md` -- APv1 vs APv2 comparison with migration guidance. Phase 15 "See also" footers link here.

### Project Context
- `.planning/REQUIREMENTS.md` -- ASET-01 through ASET-05 requirements for this phase
- `.planning/ROADMAP.md` -- Phase 15 success criteria and dependency relationships
- `.planning/STATE.md` -- Pending todo: re-verify Entra ID Local Administrator settings conflict at authoring time

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/_templates/admin-template.md` -- Direct template for all Phase 15 files. Copy and fill.
- `docs/lifecycle-apv2/` folder structure -- Pattern for organizing numbered files with 00-overview index
- Phase 11-14 frontmatter pattern -- `last_verified`, `review_by`, `applies_to`, `audience` fields ready to reuse
- Version gate blockquote pattern -- Copy from any Phase 11-14 file and adapt for admin audience

### Established Patterns
- **Multi-file per topic:** Every content area uses separate numbered files (lifecycle, runbooks, error codes). Phase 15 follows this.
- **00-index/overview:** Every multi-file directory starts with a 00-* sequencer file.
- **Admin template structure:** Prerequisites → Steps (with "what breaks" per setting) → Verification → Configuration-Caused Failures table → See Also
- **`<details>` blocks:** Reserved for supplementary L2 content only. NOT for primary admin procedures.
- **Cross-linking:** Internal relative paths using `../` navigation. "Next step" and "See also" footers.

### Integration Points
- `docs/index.md` -- Hub file needs APv2 admin guide links (Phase 17 responsibility, not Phase 15)
- `docs/l1-runbooks/` -- Phase 15 "what breaks" callouts link TO these runbooks
- `docs/error-codes/06-apv2-device-preparation.md` -- Phase 15 may cross-reference specific failure scenarios
- Phase 16 depends on Phase 15 patterns for APv1 admin guide consistency

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

*Phase: 15-apv2-admin-setup-guides*
*Context gathered: 2026-04-12*
