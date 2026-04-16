# Windows Autopilot Troubleshooter & Documentation Suite

## What This Is

A comprehensive diagnostic toolkit and documentation suite for Windows Autopilot deployments. Combines PowerShell modules for local diagnostics, a Python FastAPI backend for orchestration, a React frontend for visualization, and — critically — tiered operational documentation that IT Service Desk (L1), Desktop Engineering (L2), and Intune Admin teams can use to troubleshoot and configure Autopilot deployments covering both APv1 and APv2 frameworks.

## Core Value

IT teams can independently diagnose and resolve Autopilot deployment failures without escalating to engineering — covering both APv1 (pre-provisioning, user-driven, self-deploying) and APv2 (Device Preparation) modes. Admins can configure deployments end-to-end using step-by-step setup guides with embedded misconfiguration warnings.

## Current Milestone: v1.2 Cross-Platform Provisioning & Operational Gaps

**Goal:** Extend the documentation suite to cover macOS provisioning via ABM/ADE through Intune, and close all significant Windows Autopilot documentation gaps from device lifecycle through operational readiness.

**Target features:**
- Device lifecycle beyond initial provisioning (Autopilot Reset, re-provisioning, retirement, tenant migration)
- Pre-provisioning infrastructure deep-dive (network rules, Entra ID prereqs, licensing matrix)
- App deployment integration (Win32 packaging for ESP, install order, timeout tuning)
- Security & compliance during enrollment (Conditional Access, security baselines, compliance timing)
- Migration scenarios (APv1→APv2, on-prem imaging transition, GPO→Intune mapping)
- Monitoring & operational readiness (deployment reporting, registration drift, new-batch workflow)
- macOS provisioning via Apple Business Manager / Automated Device Enrollment through Intune
- macOS admin setup, app deployment, compliance, and L1/L2 troubleshooting
- Cross-platform navigation updates (docs hub restructured for Windows + macOS)

## Current State

**Phase 25 complete 2026-04-16.** v1.2 milestone complete — all 6 phases shipped.

### What's been built
- Complete APv1 lifecycle documentation with integrated troubleshooting (v1.0)
- APv2 lifecycle, failure catalog, L1/L2 decision trees and runbooks (v1.1)
- APv1 and APv2 admin setup guides with per-setting "what breaks" callouts (v1.1)
- Navigation hub with role-based entry points, glossary, bidirectional cross-references (v1.0 + v1.1)
- Error code lookup tables with framework tagging (APv1/APv2) (v1.0 + v1.1)
- Cross-platform foundation: platform frontmatter taxonomy, Windows vs macOS comparison page, macOS glossary with bidirectional cross-references, macOS admin template with dual-portal structure, navigation hub restructured with platform selector (v1.2 Phase 20)
- Device lifecycle operations (Autopilot Reset, retire/wipe, re-provisioning, tenant migration), pre-provisioning infrastructure references, app deployment/ESP integration, security/compliance enrollment, migration scenarios (APv1→APv2, imaging→Autopilot, GPO→Intune), monitoring/operational readiness (v1.2 Phase 21)
- macOS ADE lifecycle narrative (7-stage pipeline with Mermaid diagram), Terminal commands reference, log paths reference, network endpoints extended with macOS ADE section, navigation hub updated with macOS content links (v1.2 Phase 22)
- macOS admin setup guides (ABM, enrollment profiles, configuration profiles, app deployment, compliance policies, configuration-caused failures) (v1.2 Phase 23)
- macOS L1/L2 troubleshooting: triage decision tree, 6 L1 runbooks, 4 L2 investigation runbooks (v1.2 Phase 24)
- Cross-platform navigation integration: common-issues.md platform selector with macOS section, quick-reference cards with macOS ADE sections, index.md fragment anchors, 44-file reachability audit passed (v1.2 Phase 25)

<details>
<summary>Previous Milestone: v1.1 APv2 Documentation & Admin Setup Guides</summary>

**Shipped:** 2026-04-13 | **Phases:** 11-19 | **Plans:** 18

Delivered APv2 lifecycle documentation, scenario-based failure catalog, L1/L2 decision trees and runbooks, complete APv2 and APv1 admin setup guides, navigation hub updates with APv2 terminology, and cross-reference cleanup.

</details>

<details>
<summary>Previous Milestone: v1.0 Autopilot Documentation & Troubleshooting Guides</summary>

**Shipped:** 2026-04-10 | **Phases:** 1-10 | **Plans:** 24

Delivered end-to-end APv1 lifecycle documentation, error code lookup tables, L1 decision trees and runbooks, L2 technical guides, and navigation indexes.

</details>

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

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
- ✓ APv2 lifecycle and prerequisites documentation — v1.1
- ✓ APv2 failure catalog (scenario-based, symptom-searchable) — v1.1
- ✓ APv2 L1 triage decision tree and portal-only runbooks — v1.1
- ✓ APv2 L2 log collection and deployment report interpretation — v1.1
- ✓ APv2 admin setup guides (ETG, Device Preparation, RBAC, corporate identifiers) — v1.1
- ✓ APv1 admin setup guides (hardware hash, profiles, ESP, groups, deployment modes) — v1.1
- ✓ Bidirectional APv1/APv2 cross-referencing and glossary — v1.1
- ✓ Windows Autopilot Reset documentation (local and remote reset, re-provisioning, retirement) — v1.2
- ✓ Pre-provisioning infrastructure deep-dive (network/firewall rules, Entra ID prereqs, licensing matrix) — v1.2
- ✓ App deployment integration with ESP (Win32 packaging, install order, timeout tuning) — v1.2
- ✓ Security & compliance during enrollment (Conditional Access, baselines, compliance timing) — v1.2
- ✓ Migration scenarios (APv1→APv2, on-prem imaging→Autopilot, GPO→Intune mapping) — v1.2
- ✓ Monitoring & operational readiness (deployment reporting, drift detection, new-batch workflow) — v1.2
- ✓ macOS ABM/ADE lifecycle documentation through Intune — v1.2
- ✓ macOS admin setup guides (ABM configuration, enrollment profiles, configuration profiles) — v1.2
- ✓ macOS app deployment (DMG, PKG, VPP/Apps and Books) — v1.2
- ✓ macOS compliance and security policies — v1.2
- ✓ macOS L1/L2 troubleshooting (enrollment failures, profile delivery, app install issues) — v1.2
- ✓ Cross-platform navigation hub restructure (Windows + macOS) — v1.2

### Active

<!-- No active requirements — v1.2 complete -->

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Environment-specific configurations — docs are generic, teams customize locally
- Frontend UI implementation — deferred to future milestone
- Backend API integration with Graph — deferred to future milestone
- Automated remediation workflows — deferred to future milestone

## Context

- 70 markdown files in `docs/` covering both APv1 and APv2 frameworks
- Three audiences served: L1 Service Desk (scripted), L2 Desktop Engineering (technical), Intune Admins (configuration)
- Code scaffolding exists across all three tiers (PowerShell, Python, React) but is not yet integrated
- Docs structured for easy export to SharePoint/Confluence

## Constraints

- **Format**: Markdown files suitable for git versioning and wiki export
- **Audience**: Must be usable by L1 (scripted, decision-tree), L2 (technical, investigative), and Admins (step-by-step) separately
- **Coverage**: Generic Microsoft Intune provisioning guidance (Windows + macOS) — not tied to a specific tenant or environment
- **Accuracy**: Must reflect current Windows Autopilot (Windows 10/11) and macOS ADE behavior through Intune

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Documentation-first milestone | IT teams need troubleshooting guides before tooling is complete | Delivered — v1.0 complete |
| Tiered doc structure (L1/L2/Admin) | Different skill levels need different formats | Delivered — role-based navigation via docs/index.md |
| Generic over environment-specific | Broader applicability, teams add local details | Delivered — no tenant-specific content |
| Markdown in docs/ | Version-controlled, exportable to any wiki platform | Delivered — 70 markdown files in docs/ |
| Scenario-based APv2 failure catalog | APv2 has no hex error codes; symptom-based lookup is more useful | Delivered — 10 scenarios in v1.1 |
| Per-setting "what breaks" callouts | Admins need to understand misconfiguration consequences at config time | Delivered — embedded in all admin setup guides |
| Confidence-attributed citations | Community sources (oofhours, Call4Cloud) used where Microsoft docs lack coverage | Delivered — MEDIUM confidence clearly labeled |

---
*Last updated: 2026-04-16 after Phase 25 (Navigation Integration & Polish) completed — v1.2 milestone complete*
