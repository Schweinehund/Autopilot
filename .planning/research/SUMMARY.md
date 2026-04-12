# Project Research Summary

**Project:** Windows Autopilot Troubleshooter -- v1.1 APv2 Documentation and Admin Setup Guides
**Domain:** IT Operations Documentation -- Windows Autopilot Device Preparation (APv2) and admin setup guides for APv1 and APv2
**Researched:** 2026-04-10
**Confidence:** HIGH

## Executive Summary

v1.1 is an additive milestone extending the v1.0 documentation suite in two directions: adding Windows Autopilot Device Preparation (APv2) troubleshooting coverage and adding admin setup guides for both APv1 and APv2. APv2 is architecturally distinct from APv1 -- no hardware hash registration, no Enrollment Status Page, no pre-provisioning, no hybrid join. The two frameworks coexist in the same tenant but a device runs only one, and APv1 silently wins when both apply. This coexistence behavior is the most misunderstood aspect of APv2 adoption and must be the leading prerequisite in all APv2 setup and troubleshooting content.

The recommended approach is parallel documentation: new APv2 directories alongside existing APv1 directories, with strict version gate banners on every file. Integrating APv2 content into existing APv1 files would violate the version gate metadata pattern established across 40+ v1.0 files and produce hollow content because APv2 has no 1:1 equivalent for ESP, TPM attestation, hardware hash, or hybrid join. Admin setup guides are a new content type distinct from L1 runbooks and L2 investigation guides -- they serve Intune admins with configuration authority, not Service Desk agents -- and belong in a dedicated admin-guides/ directory with apv1/ and apv2/ subdirectories.

The primary risk is documentation drift: APv2 launched June 2024 and has changed substantially in 22 months without traditional versioned releases. App limits, supported modes, and known issue resolutions change server-side without admin action. Every APv2 document requires a 90-day review cycle with explicit last_verified frontmatter. The secondary risk is accuracy by assumption: authors familiar with APv1 will apply APv1 logic to APv2 failures, recommend diagnostic tools Microsoft explicitly states do not apply to APv2, and structure APv2 error coverage as a hex code table when APv2 failures are scenario-based.

## Key Findings

### Recommended Stack

Documentation tooling is unchanged from v1.0 (Markdown, Mermaid, MkDocs, Pandoc, markdownlint-cli2). No tooling changes are required for v1.1. The primary new research output is the authoritative source layer: Microsoft Learn pages verified 2026-04-10. Critical pages include APv2 Troubleshooting FAQ, Known Issues (updated 2026-04-10), Requirements, and the Compare page. Community sources -- Michael Niehaus (oofhours.com, Microsoft Autopilot PM) and Call4Cloud -- are the only sources covering BootstrapperAgent event IDs at L2 depth. These are MEDIUM confidence and must be cited explicitly.

**Core source authorities:**
- APv2 Troubleshooting FAQ (Microsoft Learn, 2026-04-07) -- official failure scenario catalog; basis for L1 runbooks
- APv2 Known Issues (Microsoft Learn, 2026-04-10) -- active bugs with workarounds; link to live page, do not copy inline
- APv2 User-Driven Workflow Tutorial (Microsoft Learn) -- 7-step admin setup; basis for APv2 admin guides
- APv2 Compare page (Microsoft Learn, 2026-04-07) -- definitive APv1/APv2 feature matrix; audit after each phase
- oofhours.com APv2 troubleshooting (Michael Niehaus, May 2025) -- BootstrapperAgent log guidance; MEDIUM confidence, cite explicitly

### Expected Features

**Must have (table stakes) -- APv2 troubleshooting:**
- APv2 lifecycle overview with Mermaid flow diagram (Enrollment Time Grouping as core mechanism; no ESP, no hardware hash)
- APv2 initial triage decision tree (gate: Did ESP display? Yes = APv1 mode, wrong doc)
- APv2 L1 runbook: deployment experience never launches (highest-volume APv2 failure)
- APv2 L1 runbook: apps and scripts not installed (second-highest-volume)
- APv2 L2 guide: log collection (Bootstrapper event log + Intune deployment report; MDM Diagnostic Tool does NOT apply to APv2)
- APv2 failure index organized by symptom, not hex code (APv2 has no hex code catalog)
- APv2 known issues and workarounds reference

**Must have (table stakes) -- admin setup guides:**
- APv2 prerequisites and tenant configuration guide (OS version gates, auto-enrollment, APv1 deregistration requirement)
- APv2 device group setup guide: Enrollment Time Grouping (assigned group type + Intune Provisioning Client as owner, AppID f1346770-5b25-470b-88bd-d5744ab7952c)
- APv2 Device Preparation policy creation guide
- APv2 app and script configuration guide (System context requirement, 25-app limit)
- APv2 RBAC permissions guide (5-category custom role; built-in Intune Administrator insufficient)
- APv1 deployment profile configuration guide (settings, values, misconfiguration traps)
- APv1 ESP configuration guide (timeout values, app tracking, Windows update setting)
- APv1 hardware hash registration guide (3 paths: OEM, CSP, admin manual)
- APv1 dynamic group configuration guide (ZTDId rule, sync delay, profile conflict resolution)
- APv1 deployment mode setup guides (user-driven, pre-provisioning, self-deploying)

**Should have (differentiators):**
- Side-by-side APv1/APv2 admin action mapping (hardware hash to no equivalent; ESP to Device Preparation policy)
- APv2 failure mode to config check reverse-lookup table
- Embedded if-this-step-fails callouts in admin setup guides linking to relevant runbooks
- Explicit PowerShell procedure for adding Intune Provisioning Client service principal to device group
- Cross-reference from APv1 admin setup mistakes to existing v1.0 troubleshooting runbooks

**Defer (explicitly out of scope):**
- APv2 pre-provisioning runbook -- feature does not exist in APv2
- APv2 hybrid join guide -- feature does not exist in APv2 (Entra join only)
- APv2 self-deploying mode for physical devices -- feature does not exist in APv2
- APv2 hex error code table -- APv2 uses scenario-based failures, not hex codes
- Windows 10 APv2 guide -- APv2 requires Windows 11; Windows 10 is explicitly unsupported
- APv2 quick-reference card -- defer until runbooks establish most common admin actions

### Architecture Approach

The v1.0 docs/ tree established parallel-directory structure with version gate banners on every file. v1.1 extends this pattern strictly. New APv2 content goes into new parallel directories (apv2-lifecycle/, apv2-decision-trees/, apv2-l1-runbooks/, apv2-l2-runbooks/). Admin setup guides go into admin-guides/ with apv1/ and apv2/ subdirectories. Six existing files require selective modification: index.md, apv1-vs-apv2.md, common-issues.md, _glossary.md, error-codes/00-index.md, reference/endpoints.md.

**Major components:**
1. apv2-lifecycle/ (5 files) -- APv2 stages, prerequisites, Enrollment Time Grouping, OOBE experience, post-enrollment; foundation all subsequent APv2 content depends on
2. apv2-decision-trees/ + apv2-l1-runbooks/ + apv2-l2-runbooks/ (9 files) -- self-contained APv2 troubleshooting layer; escalation path must not cross into APv1 L2 content
3. error-codes/06-apv2-device-preparation.md -- scenario-based failure catalog, no hex table; one file added to existing directory
4. admin-guides/ (14 files: 1 index, 6 APv1 guides, 6 APv2 guides, plus admin-template.md in _templates/) -- new content type for Intune admins
5. Navigation hub updates (4 modified files) -- written last after all content they link to exists

### Critical Pitfalls

1. **APv1 profile takes precedence over APv2 policy, silently, with no error thrown** -- Any device with APv1 hardware hash registration always runs APv1 ESP flow. APv2 OOBE page never appears. Every APv2 admin setup guide must open with a deregistration prerequisite; every APv2 runbook must include ESP-appears-unexpectedly as differential diagnosis for APv1 registration conflict.

2. **APv2 device group has four distinct failure modes that appear identical** -- (1) group type Dynamic not Assigned, (2) role-assignable group setting Yes, (3) Intune Provisioning Client not set as group owner, (4) service principal displays as Intune Autopilot ConfidentialClient in some tenants (same AppID: f1346770-5b25-470b-88bd-d5744ab7952c, different display name). All four produce 0-groups-assigned symptom. Admin setup guide must be a 4-item checklist with AppID stated explicitly.

3. **APv2 app deployment has three simultaneous requirements that fail silently** -- Apps must be (1) assigned to device group, (2) configured for System context, and (3) selected in Device Preparation policy. Any one missing causes Skipped in deployment report with no user-facing error. Troubleshooting content needs a diagnostic flowchart checking all three conditions in order.

4. **APv2 RBAC differs from APv1 -- built-in Intune Administrator is insufficient** -- Enrollment time device membership assignment permission is APv2-unique. List all five custom role permission categories as first prerequisite in every APv2 admin setup guide.

5. **APv2 documentation accuracy degrades rapidly without a review cadence** -- App limit changed 10 to 25 (January 2026); Managed Installer blocking resolved (April 2026); Enterprise App Catalog added (June 2025). Enforce 90-day review cycle, last_verified frontmatter, link to live Microsoft Learn pages for volatile facts.

## Implications for Roadmap

The ARCHITECTURE.md build order maps directly to documentation phases. Each layer depends on the previous. APv1 admin guides can be authored in parallel with APv2 admin guides once the admin template exists.

### Phase 1: APv2 Lifecycle Foundation
**Rationale:** All APv2 troubleshooting content depends on lifecycle docs. Pitfalls 1, 4, 5, 7, 8, and 10 (from PITFALLS.md) must be addressed here to prevent propagation into all subsequent phases.
**Delivers:** 5 lifecycle docs (apv2-lifecycle/), admin template (_templates/admin-template.md), APv2 glossary terms, OS version prerequisites with KB5035942 requirement, APv1 deregistration prerequisite, 90-day review cadence metadata
**Addresses:** APv2 lifecycle overview, APv2 prerequisites checklist, APv2 deployment modes
**Avoids:** APv1 precedence conflict undocumented, OS version gating omitted, accuracy drift, progress UI percentage misrepresented as milestone-based
**Research flag:** Standard patterns -- APv2 lifecycle stages fully documented in Microsoft Learn; no phase research needed

### Phase 2: APv2 Error Codes and Failure Index
**Rationale:** Failure index must exist before decision trees and runbooks can link to it. APv2 error content is scenario-based -- one new file in existing error-codes/ directory plus Framework column added to master index.
**Delivers:** error-codes/06-apv2-device-preparation.md (scenario-based failure catalog), updated error-codes/00-index.md with APv2 section and Framework column
**Addresses:** APv2 failure index (must-have); hex code table for APv2 explicitly avoided
**Avoids:** APv2 codes added to APv1 tables without framework tagging
**Research flag:** Standard patterns -- failure modes fully documented in Microsoft Learn troubleshooting FAQ

### Phase 3: APv2 Decision Trees and L1 Runbooks
**Rationale:** Decision trees depend on lifecycle (Phase 1) and error codes (Phase 2). L1 runbooks depend on decision trees. APv2 L1 escalation must never cross into APv1 L2 content.
**Delivers:** 2 decision trees (apv2-decision-trees/), 4 L1 runbook files (apv2-l1-runbooks/)
**Addresses:** APv2 initial triage decision tree, APv2 L1 deployment never launches runbook, APv2 L1 apps not installed runbook
**Avoids:** APv1 diagnostic tools referenced in APv2 content, APv1 decision trees used for APv2 triage
**Research flag:** Standard patterns -- L1 check sequences directly derivable from Microsoft Learn troubleshooting FAQ

### Phase 4: APv2 L2 Runbooks
**Rationale:** APv2 L2 covers Bootstrapper event log, Intune deployment report, and USB log export. BootstrapperAgent event ID coverage requires community sources -- the one MEDIUM confidence area. Can be authored in parallel with Phase 3 after Phase 2 completes.
**Delivers:** 3 L2 guide files (apv2-l2-runbooks/)
**Addresses:** APv2 L2 log collection guide, APv2 L2 deployment report analysis guide
**Avoids:** MDM Diagnostic Tool referenced as applicable to APv2 (explicitly documented by Microsoft as not applicable)
**Research flag:** Needs attention -- BootstrapperAgent event ID catalog has no official Microsoft reference; cite oofhours.com and Call4Cloud as MEDIUM confidence

### Phase 5: APv2 Admin Setup Guides
**Rationale:** Admin guides reference lifecycle docs and forward-reference L1 runbooks. Group configuration (Enrollment Time Grouping) is highest-complexity step with four distinct failure modes. Prerequisites and RBAC must be covered before group and policy creation steps.
**Delivers:** 6 APv2 admin guides (admin-guides/apv2/) covering prerequisites, device group, user group, app/script assignment, policy creation, and setup troubleshooting
**Addresses:** All APv2 admin setup must-have features; differentiators: embedded failure callouts, explicit Intune Provisioning Client PowerShell procedure
**Avoids:** RBAC omitted, group configuration failure modes conflated, app system context understated, Entra ID local admin conflict undocumented
**Research flag:** Mostly standard patterns; Entra ID Local administrator settings conflict valid combinations must be re-verified against live known issues page at authoring time

### Phase 6: APv1 Admin Setup Guides
**Rationale:** Independent of APv2 phases 3-5; can be authored in parallel with Phase 5 after Phase 1 establishes the admin template. Configuration-caused failure chains are the primary differentiator.
**Delivers:** 6 APv1 admin guides (admin-guides/apv1/) covering profile configuration, ESP policies, dynamic groups, OOBE customization, deployment modes, setup troubleshooting
**Addresses:** All APv1 admin setup must-have features; differentiator: configuration-caused failure chain in every guide
**Avoids:** Admin guides missing failure chains, white glove as primary term instead of pre-provisioning, ESP timeout without recommended range
**Research flag:** Standard patterns -- APv1 profile and ESP settings complete in Microsoft Learn; no phase research needed

### Phase 7: Navigation and Hub Updates
**Rationale:** Hub files written last after all content they link to exists. Established v1.0 pattern.
**Delivers:** 4 modified existing files (index.md, apv1-vs-apv2.md, common-issues.md, _glossary.md)
**Avoids:** apv1-vs-apv2.md not updated with new features (documented integration gotcha from PITFALLS.md)
**Research flag:** No research needed -- structural linking only

### Phase Ordering Rationale

- APv2 lifecycle foundation must be Phase 1 because every subsequent APv2 document references it for baseline behavior
- Error codes must precede decision trees and runbooks because runbooks link to specific failure scenarios
- Decision trees must precede L1 runbooks because L1 runbooks embed or link to tree sections
- APv1 admin guides (Phase 6) are independent of APv2 phases 3-5 and can be parallelized with Phase 5 once admin template from Phase 1 exists
- Hub updates are always last

### Research Flags

Phases needing additional research or careful sourcing during execution:
- **Phase 4 (APv2 L2 Runbooks):** BootstrapperAgent event ID catalog has no official Microsoft reference. Must cite oofhours.com (Michael Niehaus) and Call4Cloud as MEDIUM confidence. Check for any Microsoft event ID guidance published after 2026-04-10.
- **Phase 5 (APv2 Admin Setup):** Entra ID Local administrator settings conflict valid combinations must be re-verified against live known issues page at authoring time.

Phases with established patterns (no phase research needed):
- **Phase 1:** APv2 lifecycle stages, prerequisites, and deployment modes fully documented in Microsoft Learn
- **Phase 2:** APv2 failure scenarios fully documented in Microsoft Learn troubleshooting FAQ
- **Phase 3:** L1 check sequences derivable directly from troubleshooting FAQ
- **Phase 6:** APv1 profile and ESP settings complete in Microsoft Learn
- **Phase 7:** Structural linking only

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Documentation tooling unchanged from v1.0; all source authorities verified against live Microsoft Learn pages 2026-04-10 |
| Features | HIGH | Must-have and defer lists derived directly from what Microsoft Learn documents APv2 supports and explicitly does not support |
| Architecture | HIGH | Existing 40+ file v1.0 structure directly inspected; structural decisions derive from version gate semantics validated against real content |
| Pitfalls | HIGH | 11 of 12 pitfalls from Microsoft Learn official docs; BootstrapperAgent event ID coverage is the one MEDIUM area |

**Overall confidence:** HIGH

### Gaps to Address

- **BootstrapperAgent event ID catalog:** No official Microsoft reference exists. Phase 4 must use oofhours.com and Call4Cloud with explicit MEDIUM confidence attribution. If Microsoft publishes an official reference before Phase 4, substitute it.
- **Entra ID Local administrator settings conflict -- valid combinations table:** Known issues page (2026-04-10) documents the conflict but valid combinations must be re-pulled from the live page at Phase 5 authoring time, as the page is actively maintained.
- **APv2 Windows 365 automatic deployment mode scope:** Two sub-modes (shared, dedicated) are in preview. Confirm before Phase 1 whether W365 Frontline is in target customer scope; if not, scope Phase 1 to user-driven only.
- **APv2 What's New RSS subscription:** Must be established in project README before any APv2 content is authored, as capability changes may occur during the authoring window.

## Sources

### Primary (HIGH confidence -- verified 2026-04-10)
- https://learn.microsoft.com/en-us/autopilot/device-preparation/overview -- updated 2026-04-07
- https://learn.microsoft.com/en-us/autopilot/device-preparation/requirements -- updated 2026-04-07
- https://learn.microsoft.com/en-us/autopilot/device-preparation/troubleshooting-faq -- updated 2026-04-07; primary basis for L1 runbooks and failure index
- https://learn.microsoft.com/en-us/autopilot/device-preparation/known-issues -- updated 2026-04-10; active bugs and workarounds
- https://learn.microsoft.com/en-us/autopilot/device-preparation/compare -- updated 2026-04-07; definitive APv1/APv2 feature matrix
- https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-workflow -- 7-step admin setup basis
- https://learn.microsoft.com/en-us/autopilot/device-preparation/reporting-monitoring -- updated 2026-02-05
- https://learn.microsoft.com/en-us/autopilot/profiles -- complete APv1 profile settings reference
- https://learn.microsoft.com/en-us/intune/intune-service/enrollment/windows-enrollment-status -- updated 2026-04-09
- Existing codebase: docs/ directory -- all 40+ v1.0 files directly inspected (2026-04-10)

### Secondary (MEDIUM confidence -- community-authored, credible sources)
- https://oofhours.com/2025/05/01/next-generation-autopilot-troubleshooting/ -- Michael Niehaus (Microsoft Autopilot PM); primary source for BootstrapperAgent log guidance
- https://call4cloud.nl/autopilot-device-preparation-flow-apv2/ -- BootstrapperAgent diagrams and event log references
- https://patchmypc.com/blog/ultimate-guide-troubleshoot-windows-autopilot/ -- BootstrapperAgent log locations

### Tertiary (verify at authoring time)
- APv2 What's New RSS: https://learn.microsoft.com/api/search/rss?search=Windows+Autopilot+device+preparation&locale=en-us -- subscribe before Phase 1 authoring begins

---
*Research completed: 2026-04-10*
*Ready for roadmap: yes*
