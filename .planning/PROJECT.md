# Windows Autopilot Troubleshooter & Documentation Suite

## What This Is

A comprehensive diagnostic toolkit and documentation suite for Windows Autopilot deployments. Combines PowerShell modules for local diagnostics, a Python FastAPI backend for orchestration, a React frontend for visualization, and — critically — tiered operational documentation that IT Service Desk (L1) and Desktop Engineering (L2) teams can use to troubleshoot Autopilot failures from device registration through to user desktop.

## Core Value

IT teams can independently diagnose and resolve Autopilot deployment failures without escalating to engineering — covering both pre-provisioning (white glove) and user-driven modes.

## Current State

**v1.0 shipped 2026-04-10.** 10 phases, 26 plans, 36 requirements — all verified.

Delivered:
- 40+ markdown documentation files in `docs/`
- 4,238 lines of structured troubleshooting content
- Full Autopilot lifecycle documentation (6 stages, 3 deployment modes)
- Master error code index (29 entries across 5 category files)
- 4 L1 Mermaid decision trees with network reachability gates
- 5 L1 scripted runbooks (zero PowerShell/registry — Service Desk safe)
- 5 L2 technical investigation guides (registry, event IDs, PowerShell refs)
- Role-based navigation (index.md, quick-ref cards, common-issues index)
- Full cross-phase wiring verified (8/8 integration checks, 80/80 must-haves)

## Requirements

### Validated

- ✓ PowerShell diagnostic module (AutopilotDiagnostics.psm1) — scaffolded
- ✓ PowerShell remediation module (AutopilotRemediation.psm1) — scaffolded
- ✓ FastAPI backend skeleton — scaffolded
- ✓ React frontend scaffold — scaffolded
- ✓ End-to-end Autopilot lifecycle documentation — v1.0
- ✓ Pre-provisioning flow troubleshooting guides — v1.0
- ✓ User-driven flow troubleshooting guides — v1.0
- ✓ Error code lookup tables — v1.0
- ✓ Scenario runbooks (TPM, ESP, network, hybrid join, profile assignment) — v1.0
- ✓ L1 Service Desk decision trees — v1.0
- ✓ L1 scenario runbooks (top 5 failures) — v1.0
- ✓ L2 Desktop team technical guides — v1.0
- ✓ Navigation indexes and quick-reference cards — v1.0

### Active

<!-- Next milestone scope — define with /gsd-new-milestone -->

### Out of Scope

- Environment-specific configurations — docs are generic, teams customize locally
- Frontend UI implementation — deferred to future milestone
- Backend API integration with Graph — deferred to future milestone
- Automated remediation workflows — deferred to future milestone

## Context

- v1.0 milestone complete — full documentation suite shipped
- Project has existing code scaffolding across all three tiers (PowerShell, Python, React)
- Docs live in `docs/` as markdown, structured for easy export to SharePoint/Confluence
- Tech stack for tooling (future): PowerShell 5.1+, Python 3.10+ (FastAPI), React 18+ (Vite)
- v2 candidates: interactive web decision trees, MkDocs site generation, APv2 full docs

## Constraints

- **Format**: Markdown files suitable for git versioning and wiki export
- **Audience**: Must be usable by L1 (scripted, decision-tree) and L2 (technical, investigative) separately
- **Coverage**: Generic Microsoft Autopilot guidance — not tied to a specific tenant or environment
- **Accuracy**: Must reflect current Windows Autopilot behavior (Windows 10/11, Intune)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Documentation-first milestone | IT teams need troubleshooting guides before tooling is complete | ✓ Delivered — 10 phases, 36 requirements |
| Tiered doc structure (L1/L2) | Different skill levels need different formats | ✓ Delivered — role-based navigation via docs/index.md |
| Generic over environment-specific | Broader applicability, teams add local details | ✓ Delivered — no tenant-specific content |
| Markdown in docs/ | Version-controlled, exportable to any wiki platform | ✓ Delivered — 40+ markdown files |
| Gap closure via audit cycles | Catch cross-phase wiring issues after initial content | ✓ Delivered — 3 audits, 3 closure phases (8-10) |
| Pre-provisioning as primary term | "White glove" deprecated by Microsoft | ✓ Delivered — consistent terminology throughout |

---
*Last updated: 2026-04-10 after v1.0 milestone shipped*
