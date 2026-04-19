# Windows Autopilot & macOS Provisioning Documentation Suite

## What This Is

A comprehensive diagnostic toolkit and documentation suite for Windows Autopilot and macOS ADE deployments through Microsoft Intune. Combines PowerShell modules for local diagnostics, a Python FastAPI backend for orchestration, a React frontend for visualization, and tiered operational documentation that IT Service Desk (L1), Desktop Engineering (L2), and Intune Admin teams can use to troubleshoot and configure deployments across both platforms.

## Core Value

IT teams can independently provision, troubleshoot, and manage Windows, macOS, and iOS/iPadOS devices through Intune without escalating to engineering — covering APv1, APv2, macOS ADE, and iOS/iPadOS enrollment frameworks with role-appropriate documentation.

## Current State

**v1.3 shipped 2026-04-19.** Four milestones complete — 33 phases, 106 plans, 118 documentation files shipped across Windows Autopilot, macOS ADE, and iOS/iPadOS. v1.4 Android Enterprise enrollment documentation starting 2026-04-19 — mirrors v1.3 iOS shape (overview + admin + L1/L2), continuing phase numbering from Phase 34.

### What's been built
- 118 markdown documentation files in `docs/` spanning Windows APv1/APv2, macOS ADE, and iOS/iPadOS
- Complete APv1 lifecycle documentation with integrated troubleshooting (v1.0)
- APv2 lifecycle, failure catalog, L1/L2 decision trees and runbooks (v1.1)
- APv1 and APv2 admin setup guides with per-setting "what breaks" callouts (v1.1)
- Cross-platform foundation: platform taxonomy, Windows-vs-macOS comparison, macOS glossary, macOS admin template (v1.2)
- Windows operational completeness: device lifecycle, infrastructure prerequisites, ESP/app deployment, security/compliance, migration scenarios, monitoring/operations (v1.2)
- macOS ADE lifecycle (7-stage), Terminal commands reference, log paths reference, network endpoints (v1.2)
- macOS admin setup suite: ABM, enrollment profiles, configuration profiles, app deployment, compliance, capability matrix (v1.2)
- macOS L1/L2 troubleshooting: triage decision tree, 6 L1 runbooks, 4 L2 runbooks (v1.2)
- Cross-platform navigation: platform selectors, quick-reference cards with macOS sections, 44-file reachability verified (v1.2)
- Navigation hub with role-based entry points, glossary, bidirectional cross-references (v1.0 + v1.1 + v1.2)
- iOS/iPadOS enrollment path overview (4-path comparison, supervision axis) and ADE lifecycle (7-stage) (v1.3)
- iOS/iPadOS admin setup: APNs certificate, ABM/ADE token (macOS cross-references), ADE enrollment profile with supervised-only callout pattern (v1.3)
- iOS/iPadOS admin setup — configuration profiles (Wi-Fi, VPN, email, device restrictions, certificates, home screen), app deployment (VPP device/user, LOB, silent-install), compliance policy (OS version, jailbreak, passcode, CA timing) with 🔒 supervised-only callouts per setting (v1.3)
- iOS/iPadOS admin setup BYOD/MAM — overview rewrite for all paths (ADE + Device Enrollment + User Enrollment + MAM-WE), Device Enrollment guide (Company Portal + web-based, capabilities-without-supervision table), account-driven User Enrollment guide with 7 privacy-limit callouts and profile-UE deprecation section, standalone MAM-WE app protection guide (three-level data protection, dual-targeting, selective wipe) (v1.3)
- iOS/iPadOS L1 triage runbooks — 6 L1 scenario runbooks (APNs expired, ADE not starting, enrollment restriction blocking, license invalid, device cap reached, compliance blocked) + iOS triage decision tree (v1.3)
- iOS/iPadOS L2 investigation runbooks — 4 L2 runbooks (log collection, ADE token & profile delivery, app install failure, compliance & CA timing) + 00-index.md iOS L2 section + D-22 placeholder retrofit across 9 files closing cross-phase links from Phase 30 (v1.3)
- Code scaffolding across all three tiers (PowerShell, Python, React) — not yet integrated

<details>
<summary>Previous Milestone: v1.3 iOS/iPadOS Provisioning Documentation</summary>

**Shipped:** 2026-04-19 | **Phases:** 26-33 | **Plans:** 44

Delivered iOS/iPadOS enrollment framework (4-path overview, ADE lifecycle), admin setup suite with supervised-only callouts, BYOD & MAM paths (Device Enrollment, account-driven User Enrollment, standalone MAM-WE), L1 triage + 6 scenario runbooks, L2 investigation runbooks using iOS-native methods (Mac+cable sysdiagnose, AssistiveTouch sysdiagnose), cross-platform navigation integration with iOS sections, and Phase 33 milestone audit gap closure (re-audit passed 18/18).

</details>

<details>
<summary>Previous Milestone: v1.2 Cross-Platform Provisioning & Operational Gaps</summary>

**Shipped:** 2026-04-15 | **Phases:** 20-25 | **Plans:** 20

Delivered cross-platform foundation (taxonomy, glossary, templates), Windows operational completeness (device lifecycle, infrastructure, security, migration, monitoring), macOS ADE lifecycle documentation, macOS admin setup guides, macOS L1/L2 troubleshooting, and cross-platform navigation integration.

</details>

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
- ✓ Cross-platform foundation (taxonomy, glossary, templates, platform selector) — v1.2
- ✓ Windows device lifecycle operations (reset, retire/wipe, re-provisioning, tenant migration) — v1.2
- ✓ Infrastructure prerequisites (network, Entra ID, licensing, Win32 apps, ESP timeout) — v1.2
- ✓ Security & compliance during enrollment (CA timing, baselines, compliance) — v1.2
- ✓ Migration scenarios (APv1→APv2, imaging→Autopilot, GPO→Intune) — v1.2
- ✓ Monitoring & operations (deployment reporting, drift detection, new-batch workflow) — v1.2
- ✓ macOS ADE lifecycle documentation (7-stage pipeline) — v1.2
- ✓ macOS admin setup guides (ABM, enrollment, config profiles, apps, compliance) — v1.2
- ✓ macOS capability matrix (feature parity gaps across 5 domains) — v1.2
- ✓ macOS L1/L2 troubleshooting (decision tree, 10 runbooks) — v1.2
- ✓ Cross-platform navigation integration (common-issues routing, quick-ref cards) — v1.2
- ✓ iOS/iPadOS configuration profiles guide (Wi-Fi, VPN, email, device restrictions with category-level supervised-only callouts, certificates, home screen layout) — Phase 28 / v1.3
- ✓ iOS/iPadOS app deployment guide (VPP device/user licensing, LOB, Store apps; silent install supervised-only callouts; managed app status verification) — Phase 28 / v1.3
- ✓ iOS/iPadOS compliance policy guide (OS version, jailbreak, passcode, CA timing, default compliance posture) — Phase 28 / v1.3

## Current Milestone: v1.4 Android Enterprise Enrollment Documentation

**Goal:** Comprehensive Android Enterprise provisioning and management documentation through Microsoft Intune — covering Zero-Touch corporate enrollment, Fully Managed devices, BYOD Work Profile, kiosk/dedicated devices, and basic AOSP management — with tiered troubleshooting at parity with v1.0-v1.3 platform coverage.

**Target features (in scope):**
- Android Enterprise enrollment path overview + ownership/management axis (mirroring iOS supervision axis)
- Android Enterprise prerequisites: Managed Google Play binding, tri-portal admin template (Intune + Managed Google Play + Zero-Touch portal)
- Zero-Touch Enrollment (corporate ADE-equivalent) admin + L1/L2 content
- Fully Managed device (COBO) admin + L1/L2 content, with COPE migration/deprecation note
- BYOD Work Profile on Personally-Owned devices — admin + end-user self-service + L2 content (tier-inversion acknowledged)
- Dedicated devices (kiosk/COSU) admin + L1/L2 content
- AOSP device management — admin + triage (user-associated/userless covered as stub, full coverage deferred)
- Android version fragmentation matrix (min OS per enrollment mode)
- Provisioning-method axis matrix (NFC, QR, DPC identifier afw#setup, Zero-Touch)

**Deferrals (tracked for future milestones):**
- Knox Mobile Enrollment → defer to v1.4.1 (paid Knox license gating, Samsung-specific, velocity compression)
- AOSP user-associated/userless full coverage → stub only in v1.4; full coverage v1.4.1 once OEM matrix firms
- Cross-platform nav integration (backport Android into docs/index, common-issues, quick-refs) → post-v1.4 unification task to avoid v1.0-v1.3 regression
- COPE full admin path → covered as migration/deprecation note inside COBO doc (Google trajectory is WPCO)
- 4-platform comparison document → defer to v1.5 or standalone deliverable

### Active

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Environment-specific configurations — docs are generic, teams customize locally
- Frontend UI implementation — deferred to future milestone
- Backend API integration with Graph — deferred to future milestone
- Automated remediation workflows — deferred to future milestone
- Linux device enrollment — Intune Linux support is limited
- ChromeOS management — different management platform (Google Admin)
- Android TV / Android Auto / Wear OS — specialized device classes, not Intune enrollment scope (v1.4 exclusion)
- Android Device Administrator (DA) legacy mode — deprecated since Android 10 for new enrollments (v1.4 exclusion)
- Samsung E-FOTA firmware management — orthogonal to Intune enrollment (v1.4 exclusion)
- Localization / non-English content — consistent with v1.0-v1.3 English-only policy

## Context

- 118 markdown files in `docs/` covering APv1, APv2, macOS ADE, and iOS/iPadOS enrollment frameworks (v1.4 Android coverage adds to this)
- Three audiences served: L1 Service Desk (scripted), L2 Desktop Engineering (technical), Intune Admins (configuration)
- Three platforms shipped through v1.3: Windows Autopilot, macOS ADE, iOS/iPadOS. Android Enterprise adds a fourth in v1.4.
- Code scaffolding exists across all three tiers (PowerShell, Python, React) but is not yet integrated
- Docs structured for easy export to SharePoint/Confluence
- v1.4 introduces tri-portal admin template pattern (Intune + Managed Google Play + Zero-Touch portal) — first deviation from dual-portal pattern established in v1.2 macOS

## Constraints

- **Format**: Markdown files suitable for git versioning and wiki export
- **Audience**: Must be usable by L1 (scripted, decision-tree), L2 (technical, investigative), and Admins (step-by-step) separately
- **Coverage**: Generic Microsoft Intune provisioning guidance (Windows + macOS) — not tied to a specific tenant or environment
- **Accuracy**: Must reflect current Windows Autopilot (Windows 10/11) and macOS ADE behavior through Intune

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Documentation-first milestone | IT teams need troubleshooting guides before tooling is complete | ✓ Good — v1.0 complete |
| Tiered doc structure (L1/L2/Admin) | Different skill levels need different formats | ✓ Good — role-based navigation via docs/index.md |
| Generic over environment-specific | Broader applicability, teams add local details | ✓ Good — no tenant-specific content |
| Markdown in docs/ | Version-controlled, exportable to any wiki platform | ✓ Good — 116 markdown files in docs/ |
| Scenario-based APv2 failure catalog | APv2 has no hex error codes; symptom-based lookup is more useful | ✓ Good — 10 scenarios in v1.1 |
| Per-setting "what breaks" callouts | Admins need to understand misconfiguration consequences at config time | ✓ Good — embedded in all admin setup guides (Windows + macOS) |
| Confidence-attributed citations | Community sources (oofhours, Call4Cloud) used where Microsoft docs lack coverage | ✓ Good — MEDIUM confidence clearly labeled |
| Cross-platform foundation before content | Shared glossary, templates, taxonomy must exist before platform-specific docs | ✓ Good — Phase 20 prerequisite enforced |
| Platform frontmatter defaults to Windows | Avoids retroactive edits to 70+ existing docs | ✓ Good — zero v1.0/v1.1 files modified |
| macOS dual-portal template | ABM + Intune admin center steps in every macOS admin guide | ✓ Good — consistent pattern across 5 guides |
| APv1→APv2 as coexistence, not cutover | Reflects real-world mixed environments | ✓ Good — readiness checklist with blockers |
| Phases 21/22 parallelizable | Windows gaps and macOS lifecycle have zero cross-dependencies | ✓ Good — saved time in execution |
| v1.4 scope trimmed via adversarial review | Referee pattern identified Knox ME, COPE full path, AOSP user-modes full path, and cross-platform nav integration as over-scope for one milestone | Trimmed scope deferred with explicit tracking — pending |
| Knox Mobile Enrollment deferred to v1.4.1 | Paid Knox license tier gating + Samsung-specific + velocity compression on top of 3x surface vs iOS | Stub planned in overview; full coverage v1.4.1 — pending |
| Tri-portal admin template for Android | Intune + Managed Google Play + Zero-Touch portal is canonical flow; dual-portal template from v1.2/v1.3 insufficient | Template design as Phase 1 prereq before runbook phases — pending |
| v1.4 cross-platform nav deferred post-milestone | Backport regression risk against v1.0-v1.3 archived/live docs; separate unification task safer | Post-v1.4 nav-unification task — pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-19 — v1.4 Android Enterprise milestone started; scope trimmed via adversarial review (Knox ME / COPE full path / AOSP user-modes / cross-platform nav deferred)*
