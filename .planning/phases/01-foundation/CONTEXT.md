# Phase 1 Context: Foundation

**Phase:** 1 — Foundation
**Created:** 2026-03-11
**Requirements:** FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06

## Decisions

### Glossary Structure (FOUND-01)

- **Organization:** Grouped by concept (Enrollment, Hardware, Network, Security, Deployment Modes) with an alphabetical index at the top for quick lookup
- **Definition depth:** One-liner per term — single sentence, no paragraphs
- **Scope:** Acronyms AND process concepts (e.g., "white glove", "device phase vs user phase", "hardware hash")
- **Cross-links:** "See also" links to lifecycle stage docs (Phase 2) only — NOT to individual runbooks. Runbooks link TO the glossary, not vice versa. Max ~6 stable link targets per term.
- **Rationale:** L1 agents arriving with an unknown term use the alpha index. New hires learning the domain read by concept group. One-liners keep it scannable; lifecycle docs provide context.

### Template & Review Metadata (FOUND-05)

- **Frontmatter format:** YAML-style block at top of every doc
- **Fields (4 essential):**
  - `last_verified:` — Date doc was last confirmed accurate
  - `review_by:` — Date of next scheduled review (last_verified + 90 days)
  - `applies_to:` — `APv1` | `APv2` | `both`
  - `audience:` — `L1` | `L2` | `both`
- **Review cadence:** 90 days (quarterly — balances freshness with maintenance burden)
- **Reviewer:** Role-based ("L2 Desktop Lead"), not person names
- **Version gate banner:** Every doc opens with: "This guide applies to Windows Autopilot (classic). For Autopilot Device Preparation, see [disambiguation page]."
- **Separate L1/L2 templates:**
  - L1 template structure: Prerequisites → Steps → Escalation Criteria
  - L2 template structure: Context → Investigation → Resolution → Tool References

### PowerShell Function Reference (FOUND-04)

- **Depth per function:** Synopsis + parameters + one usage example
- **Safety warnings:** Per-function warning callout on each of the 5 remediation functions: "This function modifies device state. Test in non-production first. Uses -WhatIf for dry run."
- **Source linkage:** Reference doc is the field guide; source `.psm1` files are authoritative. Each entry notes the source module.
- **Functions to document (12 total):**
  - Diagnostic (7): Get-AutopilotDeviceStatus, Get-AutopilotHardwareHash, Get-AutopilotRegistrationState, Get-AutopilotProfileAssignment, Get-TPMStatus, Test-AutopilotConnectivity, Get-AutopilotLogs
  - Remediation (5): Reset-AutopilotRegistration, Reset-TPMForAutopilot, Repair-AutopilotConnectivity, Restart-EnrollmentStatusPage, Remove-AutopilotDevice

### Registry Paths Reference (FOUND-02)

- **Source:** Extract from existing PowerShell modules + CLAUDE.md + research
- **Known paths from codebase:**
  - `HKLM:\SOFTWARE\Microsoft\Provisioning\Diagnostics\Autopilot` — Registration state
  - `HKLM:\SOFTWARE\Microsoft\Provisioning\AutopilotSettings` — Assigned profile
  - `HKLM:\SOFTWARE\Microsoft\Enrollments` — MDM enrollment state
  - `HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\MDM` — MDM sync
  - `HKLM:\SOFTWARE\Microsoft\Windows\Autopilot\EnrollmentStatusTracking` — ESP state (from research)
- **Format:** Table with path, purpose, which functions/runbooks reference it

### Network Endpoints Reference (FOUND-03)

- **Source:** Extract from Test-AutopilotConnectivity + CLAUDE.md + research
- **Known endpoints from codebase (5):** ztd.dds.microsoft.com, cs.dds.microsoft.com, login.microsoftonline.com, graph.microsoft.com, enrollment.manage.microsoft.com
- **Additional from research:** lgmsapeweu.blob.core.windows.net
- **Format:** Table with URL, service name, purpose, test command (PowerShell and curl)

### APv1 vs APv2 Disambiguation (FOUND-06)

- **Format:** Comparison table (APv1 features vs APv2 features) + "Which guide do I use?" section
- **Key distinctions to highlight:** Hardware hash (APv1 yes / APv2 no), ESP (APv1 yes / APv2 no), pre-provisioning (APv1 yes / APv2 no), hybrid join (APv1 yes / APv2 no)
- **Purpose:** Prevent L1/L2 from following wrong troubleshooting path

## Code Context

### Reusable Assets

| Asset | Location | How Phase 1 Uses It |
|-------|----------|---------------------|
| Diagnostic function synopses | `src/powershell/AutopilotDiagnostics.psm1` | Direct source for powershell-ref.md — extract synopsis, params, examples |
| Remediation function synopses | `src/powershell/AutopilotRemediation.psm1` | Direct source for powershell-ref.md — extract synopsis, params, ShouldProcess notes |
| Endpoint list | `Test-AutopilotConnectivity` (line 120-126) | Seed endpoints.md — augment with research findings |
| Registry paths | Multiple functions across both modules | Seed registry-paths.md — augment with ESP paths from research |
| Event log sources | `Get-AutopilotLogs` (line 161-165) | Include in reference docs as log collection targets |
| Existing common-issues.md | `docs/common-issues.md` | Do NOT modify in Phase 1 — Phase 7 converts this to nav index |
| Existing architecture.md | `docs/architecture.md` | Do NOT modify in Phase 1 — Phase 7 adds cross-links |

### Files to Create

| File | Requirement |
|------|-------------|
| `docs/_glossary.md` | FOUND-01 |
| `docs/reference/registry-paths.md` | FOUND-02 |
| `docs/reference/endpoints.md` | FOUND-03 |
| `docs/reference/powershell-ref.md` | FOUND-04 |
| `docs/_templates/l1-template.md` | FOUND-05 |
| `docs/_templates/l2-template.md` | FOUND-05 |
| `docs/apv1-vs-apv2.md` | FOUND-06 |

### Files NOT to Modify

- `docs/common-issues.md` — Phase 7 responsibility
- `docs/architecture.md` — Phase 7 responsibility
- Any source code files — this is a documentation-only phase

## Deferred Ideas

None captured during discussion.

## Open Questions for Research/Planning

- Full list of Autopilot-relevant registry paths beyond what's in the codebase (research can expand)
- Complete network endpoint list with any endpoints missing from the codebase (research identified lgmsapeweu.blob.core.windows.net)
- Canonical list of Autopilot terms to include in glossary (derive from research FEATURES.md error inventory + lifecycle stages)
