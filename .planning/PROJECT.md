# Windows Autopilot Troubleshooter & Documentation Suite

## What This Is

A comprehensive diagnostic toolkit and documentation suite for Windows Autopilot deployments. Combines PowerShell modules for local diagnostics, a Python FastAPI backend for orchestration, a React frontend for visualization, and — critically — tiered operational documentation that IT Service Desk (L1) and Desktop Engineering (L2) teams can use to troubleshoot Autopilot failures from device registration through to user desktop.

## Core Value

IT teams can independently diagnose and resolve Autopilot deployment failures without escalating to engineering — covering both pre-provisioning (white glove) and user-driven modes.

## Current Milestone: v1.1 APv2 Documentation & Admin Setup Guides

**Phase 17 complete (2026-04-13):** Navigation & Hub Updates — All hub files (index.md, common-issues.md, error-codes index), glossary, runbook indexes, decision tree, lifecycle overview, and quick-ref cards updated with APv2 sections, framework labels, and bidirectional cross-references. Milestone v1.1 complete.

**All v1.1 phases complete.** Seven phases delivered APv2 lifecycle, failure index, L1/L2 decision trees and runbooks, APv2 and APv1 admin setup guides, and navigation updates.

## Previous Milestone: v1.0 Autopilot Documentation & Troubleshooting Guides

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

- [x] End-to-end Autopilot lifecycle documentation — Validated in Phase 02: lifecycle
- [x] Pre-provisioning flow troubleshooting guides — Validated in Phase 02/05/06
- [x] User-driven flow troubleshooting guides — Validated in Phase 02/05/06
- [x] Error code lookup tables — Validated in Phase 03: error-codes
- [x] Scenario runbooks (TPM, ESP, network, hybrid join, profile assignment) — Validated in Phase 05/06
- [x] L1 Service Desk decision trees — Validated in Phase 04: l1-decision-trees
- [x] L1 scenario runbooks (top 5 failures) — Validated in Phase 05: l1-runbooks
- [x] L2 Desktop team technical guides — Validated in Phase 06: l2-runbooks
- [x] Navigation indexes and quick-reference cards — Validated in Phase 07: navigation

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
| Documentation-first milestone | IT teams need troubleshooting guides before tooling is complete | Delivered — all 7 phases complete |
| Tiered doc structure (L1/L2) | Different skill levels need different formats | Delivered — role-based navigation via docs/index.md |
| Generic over environment-specific | Broader applicability, teams add local details | Delivered — no tenant-specific content |
| Markdown in docs/ | Version-controlled, exportable to any wiki platform | Delivered — 35+ markdown files in docs/ |

---
*Last updated: 2026-03-23 after Phase 07 (Navigation) completion — v1.0 milestone complete*
