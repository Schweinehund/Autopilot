# Windows Autopilot Troubleshooter & Documentation Suite

## What This Is

A comprehensive diagnostic toolkit and documentation suite for Windows Autopilot deployments. Combines PowerShell modules for local diagnostics, a Python FastAPI backend for orchestration, a React frontend for visualization, and — critically — tiered operational documentation that IT Service Desk (L1) and Desktop Engineering (L2) teams can use to troubleshoot Autopilot failures from device registration through to user desktop.

## Core Value

IT teams can independently diagnose and resolve Autopilot deployment failures without escalating to engineering — covering both pre-provisioning (white glove) and user-driven modes.

## Current Milestone: v1.0 Autopilot Documentation & Troubleshooting Guides

**Goal:** Deliver end-to-end documentation covering the full Autopilot lifecycle with integrated troubleshooting, tiered for L1 Service Desk and L2 Desktop teams.

**Target features:**
- Full lifecycle documentation (hardware hash import → profile assignment → OOBE → ESP → working desktop)
- Pre-provisioning (white glove/technician) flow documentation and troubleshooting
- User-driven flow documentation and troubleshooting
- Error code lookup tables (searchable: error → cause → fix)
- Scenario runbooks for complex issues (TPM Attestation, ESP failures, network, hybrid join)
- L1 decision trees and flowcharts for Service Desk
- L2 deep-dive technical guides for Desktop teams (registry, logs, PowerShell)

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ PowerShell diagnostic module (AutopilotDiagnostics.psm1) — scaffolded
- ✓ PowerShell remediation module (AutopilotRemediation.psm1) — scaffolded
- ✓ FastAPI backend skeleton — scaffolded
- ✓ React frontend scaffold — scaffolded

### Active

<!-- Current scope. Building toward these. -->

- [ ] End-to-end Autopilot lifecycle documentation
- [ ] Pre-provisioning flow troubleshooting guides
- [ ] User-driven flow troubleshooting guides
- [ ] Error code lookup tables
- [ ] Scenario runbooks (TPM, ESP, network, hybrid join, profile assignment)
- [x] L1 Service Desk decision trees — Validated in Phase 04: l1-decision-trees
- [x] L1 scenario runbooks (top 5 failures) — Validated in Phase 05: l1-runbooks
- [ ] L2 Desktop team technical guides

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Environment-specific configurations — docs are generic, teams customize locally
- Frontend UI implementation — deferred to future milestone
- Backend API integration with Graph — deferred to future milestone
- Automated remediation workflows — deferred to future milestone

## Context

- Project has existing code scaffolding across all three tiers (PowerShell, Python, React)
- Documentation is the immediate priority because IT teams need it now
- Both pre-provisioning (technician/white glove) and user-driven deployment modes in use
- Docs will live in `docs/` as markdown, structured for easy export to SharePoint/Confluence
- Common pain points: TPM Attestation failures, ESP timeouts, network connectivity, hybrid join issues

## Constraints

- **Format**: Markdown files suitable for git versioning and wiki export
- **Audience**: Must be usable by L1 (scripted, decision-tree) and L2 (technical, investigative) separately
- **Coverage**: Generic Microsoft Autopilot guidance — not tied to a specific tenant or environment
- **Accuracy**: Must reflect current Windows Autopilot behavior (Windows 10/11, Intune)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Documentation-first milestone | IT teams need troubleshooting guides before tooling is complete | — Pending |
| Tiered doc structure (L1/L2) | Different skill levels need different formats | — Pending |
| Generic over environment-specific | Broader applicability, teams add local details | — Pending |
| Markdown in docs/ | Version-controlled, exportable to any wiki platform | — Pending |

---
*Last updated: 2026-03-20 after Phase 05 (L1 Runbooks) completion*
