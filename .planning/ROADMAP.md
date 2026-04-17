# Roadmap: Windows Autopilot & macOS Provisioning Documentation Suite

## Milestones

- ✅ **v1.0 Autopilot Documentation & Troubleshooting Guides** — Phases 1-10 (shipped 2026-04-10)
- ✅ **v1.1 APv2 Documentation & Admin Setup Guides** — Phases 11-19 (shipped 2026-04-13)
- ✅ **v1.2 Cross-Platform Provisioning & Operational Gaps** — Phases 20-25 (shipped 2026-04-15)
- [ ] **v1.3 iOS/iPadOS Provisioning Documentation** — Phases 26-32 (in progress)

## Phases

<details>
<summary>✅ v1.0 Autopilot Documentation & Troubleshooting Guides (Phases 1-10) — SHIPPED 2026-04-10</summary>

- [x] Phase 1: Foundation (3/3 plans) — completed 2026-03-12
- [x] Phase 2: Lifecycle (3/3 plans) — completed 2026-03-14
- [x] Phase 3: Error Codes (3/3 plans) — completed 2026-03-15
- [x] Phase 4: L1 Decision Trees (2/2 plans) — completed 2026-03-20
- [x] Phase 5: L1 Runbooks (3/3 plans) — completed 2026-03-20
- [x] Phase 6: L2 Runbooks (4/4 plans) — completed 2026-03-21
- [x] Phase 7: Navigation (2/2 plans) — completed 2026-03-23
- [x] Phase 8: Reference Anchors — gap closure (2/2 plans) — completed 2026-04-08
- [x] Phase 9: Navigation Wiring — gap closure (1/1 plans) — completed 2026-04-09
- [x] Phase 10: Navigation Polish — tech debt (1/1 plans) — completed 2026-04-10

Full details: [milestones/v1.0-ROADMAP.md](milestones/v1.0-ROADMAP.md)

</details>

<details>
<summary>✅ v1.1 APv2 Documentation & Admin Setup Guides (Phases 11-19) — SHIPPED 2026-04-13</summary>

- [x] Phase 11: APv2 Lifecycle Foundation (2/2 plans) — completed 2026-04-11
- [x] Phase 12: APv2 Failure Index (1/1 plans) — completed 2026-04-12
- [x] Phase 13: APv2 L1 Decision Trees & Runbooks (2/2 plans) — completed 2026-04-12
- [x] Phase 14: APv2 L2 Runbooks (3/3 plans) — completed 2026-04-12
- [x] Phase 15: APv2 Admin Setup Guides (2/2 plans) — completed 2026-04-12
- [x] Phase 16: APv1 Admin Setup Guides (3/3 plans) — completed 2026-04-13
- [x] Phase 17: Navigation & Hub Updates (3/3 plans) — completed 2026-04-13
- [x] Phase 18: Stale Cross-Reference Cleanup (1/1 plans) — completed 2026-04-13
- [x] Phase 19: Tracking & Verification Hygiene (1/1 plans) — completed 2026-04-13

Full details: [milestones/v1.1-ROADMAP.md](milestones/v1.1-ROADMAP.md)

</details>

<details>
<summary>✅ v1.2 Cross-Platform Provisioning & Operational Gaps (Phases 20-25) — SHIPPED 2026-04-15</summary>

- [x] Phase 20: Cross-Platform Foundation (3/3 plans) — completed 2026-04-13
- [x] Phase 21: Windows Operational Gaps (6/6 plans) — completed 2026-04-14
- [x] Phase 22: macOS Lifecycle Foundation (2/2 plans) — completed 2026-04-14
- [x] Phase 23: macOS Admin Setup (4/4 plans) — completed 2026-04-14
- [x] Phase 24: macOS Troubleshooting (3/3 plans) — completed 2026-04-15
- [x] Phase 25: Navigation Integration & Polish (2/2 plans) — completed 2026-04-15

Full details: [milestones/v1.2-ROADMAP.md](milestones/v1.2-ROADMAP.md)

</details>

### v1.3 iOS/iPadOS Provisioning Documentation

- [x] **Phase 26: iOS/iPadOS Foundation** - Enrollment path overview and ADE lifecycle: the conceptual anchor establishing enrollment types and supervision axis (completed 2026-04-16)
- [x] **Phase 27: iOS Admin Setup — Corporate ADE Path** - APNs certificate, ABM/ADE token, and ADE enrollment profile guides with supervised-only callout pattern (completed 2026-04-16)
- [x] **Phase 28: iOS Admin Setup — Configuration, Apps, Compliance** - Configuration profiles, app deployment, and compliance policy guides with per-setting supervision callouts
 (completed 2026-04-16)
- [x] **Phase 29: iOS Admin Setup — BYOD & MAM** - Device enrollment, account-driven user enrollment, and MAM without enrollment (standalone) guides (completed 2026-04-17)
- [ ] **Phase 30: iOS L1 Triage & Runbooks** - iOS triage decision tree and 6 L1 runbooks for top failure scenarios
- [ ] **Phase 31: iOS L2 Investigation** - Log collection runbook and 3 investigation runbooks for ADE, app installs, and compliance
- [ ] **Phase 32: Navigation Integration & References** - Glossary additions, navigation file updates, and iOS capability matrix

## Phase Details

### Phase 26: iOS/iPadOS Foundation
**Goal**: IT teams have a single authoritative reference that correctly defines all iOS/iPadOS enrollment paths, the supervision state boundary, and iOS-specific terminology before any admin setup content is written
**Depends on**: Phase 20 (Cross-Platform Foundation — shared glossary template and frontmatter schema)
**Requirements**: LIFE-01, LIFE-02
**Success Criteria** (what must be TRUE):
  1. An admin can read one document and understand all four enrollment paths (ADE, Device Enrollment, User Enrollment, MAM-WE) with a comparison table showing management scope, supervision state, and appropriate use case for each
  2. A new team member reading the ADE lifecycle document can describe each stage of supervised corporate enrollment from Setup Assistant to post-enrollment without consulting external sources
  3. The distinction between supervised and unsupervised management capabilities is stated explicitly with the consequence that supervision is set at enrollment time and cannot be added retroactively without a wipe
  4. The enrollment path overview clearly identifies MAM-WE as an app-layer model with no device enrollment, separate from MDM paths
**Plans:** 2/2 plans complete
Plans:
- [x] 26-01-PLAN.md — iOS enrollment path overview with 4-path comparison table and supervision section
- [x] 26-02-PLAN.md — iOS ADE lifecycle document (7 stages, 4 subsections each) mirroring macOS format

### Phase 27: iOS Admin Setup — Corporate ADE Path
**Goal**: An Intune admin can configure all three corporate ADE prerequisites — APNs certificate, ABM/ADE token, and ADE enrollment profile — using iOS-specific guides that cross-reference the macOS ABM guide for shared portal steps rather than duplicating them
**Depends on**: Phase 26 (enrollment type matrix and supervision concept must exist before enrollment profile guide references them)
**Requirements**: ACORP-01, ACORP-02, ACORP-03
**Success Criteria** (what must be TRUE):
  1. An admin following the APNs certificate guide can create a new certificate and understands the renew-not-replace rule and cross-platform expiry impact (one expired APNs certificate breaks ALL iOS/iPadOS MDM communication)
  2. An admin following the ABM/ADE token guide can configure the iOS enrollment token using a cross-reference to the shared macOS ABM guide for portal steps, with only iOS-specific differences documented inline
  3. An admin following the ADE enrollment profile guide can configure supervised mode, select an authentication method, customize Setup Assistant panes, and enable locked enrollment — with every supervised-only setting marked with the established 🔒 callout pattern
  4. The supervised-only callout pattern (blockquote format: "🔒 Supervised only: [feature] requires supervised mode...") is formally established in this phase and consistent across all three guides
**Plans:** 3/3 plans complete
Plans:
- [x] 27-01-PLAN.md — iOS admin template and admin setup overview page
- [x] 27-02-PLAN.md — APNs certificate guide and ABM/ADE token guide
- [x] 27-03-PLAN.md — ADE enrollment profile guide with supervised-only callouts

### Phase 28: iOS Admin Setup — Configuration, Apps, Compliance
**Goal**: An Intune admin can configure iOS/iPadOS configuration profiles, app deployment, and compliance policies with a clear understanding of which capabilities require supervision — with every supervised-only setting explicitly marked
**Depends on**: Phase 27 (supervised mode established in ADE enrollment profile guide; supervision callout pattern defined)
**Requirements**: ACFG-01, ACFG-02, ACFG-03
**Success Criteria** (what must be TRUE):
  1. An admin reading the configuration profiles guide can identify which of the documented settings (Wi-Fi, VPN, email, device restrictions, certificates, home screen layout) require supervised mode, because each supervised-only setting has the 🔒 callout linking back to the ADE enrollment profile guide
  2. An admin reading the app deployment guide understands the distinction between VPP device-licensed and user-licensed apps, knows that silent install requires supervision, and can check managed app installation status in Intune
  3. An admin reading the compliance policy guide can configure OS version gates, jailbreak detection, and passcode requirements, and understands Conditional Access timing behavior and the default compliance posture for newly enrolled devices
  4. A reader can determine from the compliance guide alone what happens to a device's CA access state in the window between enrollment completion and first compliance evaluation
**Plans:** 3/3 plans complete
Plans:
- [x] 28-01-PLAN.md — iOS configuration profiles guide (Wi-Fi, VPN, email, certificates, device restrictions with category-level supervised-only callouts, home screen layout) + overview update
- [x] 28-02-PLAN.md — iOS app deployment guide (VPP device/user licensing, LOB, Store apps; silent install supervised-only callouts; managed app status verification)
- [x] 28-03-PLAN.md — iOS compliance policy guide (OS version, jailbreak, passcode, Actions for Noncompliance, dedicated CA timing section answering SC #4)

### Phase 29: iOS Admin Setup — BYOD & MAM
**Goal**: An admin or user can understand and configure all non-ADE iOS enrollment paths — Company Portal device enrollment, account-driven user enrollment, and MAM without enrollment — with explicit documentation of what IT cannot see or control on personally-owned devices
**Depends on**: Phase 27 (corporate ADE path established; BYOD guides can now clearly contrast against supervised management scope)
**Requirements**: ABYOD-01, ABYOD-02, ABYOD-03
**Success Criteria** (what must be TRUE):
  1. An admin reading the device enrollment guide understands both Company Portal and web-based enrollment flows for personal and corporate devices without ABM, including what management capabilities are available without supervision
  2. An admin or end user reading the account-driven user enrollment guide understands what IT can and cannot see or do on a personally-owned device — the privacy limitations are stated as explicit callouts, not buried in prose
  3. The MAM-WE app protection policies guide is a standalone document that does not require reading any MDM enrollment guide to understand — it covers the three-level data protection framework, targeting enrolled vs unenrolled devices, iOS-specific behaviors, and selective wipe
  4. A reader can determine from the MAM-WE guide alone whether MAM-WE requires the device to be enrolled in Intune MDM (it does not) and what the wipe scope is (managed app data only, not the device)
**Plans:** 5/5 plans complete
Plans:
- [x] 29-01-PLAN.md — Extend iOS admin template with PRIVACY-LIMIT CALLOUT PATTERN comment block (D-05)
- [x] 29-02-PLAN.md — Restructure admin-setup-ios/00-overview.md for all iOS paths (applies_to: all, branching Mermaid, shared Intune Enrollment Restrictions section, split prereqs — D-06/07/08/09)
- [x] 29-03-PLAN.md — Device Enrollment guide (07-device-enrollment.md) with Capabilities Available Without Supervision table, Company Portal + web-based flows, ownership-flag section (ABYOD-01)
- [x] 29-04-PLAN.md — Account-Driven User Enrollment guide (08-user-enrollment.md) with hybrid privacy-callout pattern covering all 7 D-20 boundaries (ABYOD-02)
- [x] 29-05-PLAN.md — MAM-WE App Protection Policies guide (09-mam-app-protection.md) — standalone, three-level framework, dual-targeting, Selective Wipe section (ABYOD-03)


### Phase 30: iOS L1 Triage & Runbooks
**Goal**: An L1 service desk agent has a structured decision tree and six scenario runbooks to resolve the most common iOS enrollment, compliance, and app deployment failures without escalating to L2
**Depends on**: Phase 27, Phase 28, Phase 29 (admin setup guides must exist and have stable file paths before runbooks can link to them)
**Requirements**: L1TS-01, L1TS-02
**Success Criteria** (what must be TRUE):
  1. An L1 agent starting the iOS triage decision tree with any of the three common symptom categories (enrollment failure, compliance blocked, app not available) reaches a resolution step or an explicit L2 escalation point within 5 decision nodes
  2. The triage tree routes iOS failures to the iOS-specific tree (decision-trees/07-ios-triage.md) via a single branch in the initial triage file — it does not embed iOS decision logic in the Windows triage flow
  3. For each of the 6 documented failure scenarios (APNs expired, ADE not starting, enrollment restriction blocking, license invalid, device cap reached, compliance blocked), a runbook exists with a symptom description, L1-executable steps, and an explicit escalation trigger
  4. An L1 agent following any runbook can identify whether the failure requires an admin action in Intune admin center vs a user action on the device, with no ambiguity about who does what
**Plans:** 7/10 plans executed
Plans:
- [x] 30-01-PLAN.md — L1 template extension (D-24 platform enum) + Phase 30 validation harness scaffold (Wave 1)
- [x] 30-02-PLAN.md — iOS Triage Decision Tree (07-ios-triage.md) with Mermaid + Routing Verification + How to Check + Escalation Data (Wave 1)
- [x] 30-03-PLAN.md — Runbook 16 (iOS APNs Certificate Expired) — cross-platform blast-radius (Wave 2)
- [x] 30-04-PLAN.md — Runbook 17 (iOS ADE Not Starting) — three failure signatures + D-08 manual-sync write exception (Wave 2)
- [x] 30-05-PLAN.md — Runbooks 18 + 20 (Enrollment Restriction Blocking + Device Cap Reached) — reciprocal disambiguation (Wave 2)
- [x] 30-06-PLAN.md — Runbook 19 (iOS License Invalid) — dual-manifestation + second-portal prerequisite flag (Wave 2)
- [x] 30-07-PLAN.md — Runbook 21 (iOS Compliance Blocked) — multi-cause A/B/C with User Action Required (Wave 2)
- [ ] 30-08-PLAN.md — Navigation integration: 00-initial-triage.md banner + 00-index.md iOS section (Wave 3)
- [ ] 30-09-PLAN.md — 9-file admin-setup-ios retrofit: 71 placeholder resolutions + 1 prose line + 9 metadata bumps (atomic commit D-20; Wave 3)
- [ ] 30-10-PLAN.md — Final validation gate + manual verifications + human checkpoint (Wave 4)

### Phase 31: iOS L2 Investigation
**Goal**: An L2 engineer has the log collection procedures and investigation runbooks to diagnose ADE token/profile delivery failures, app install failures, and compliance/CA timing issues — using iOS-native methods (Company Portal upload, MDM diagnostic report, Mac+cable sysdiagnose) since no CLI diagnostic tool exists on iOS
**Depends on**: Phase 30 (L1 runbooks exist and L2 runbooks reference L1 escalation paths and decision points)
**Requirements**: L2TS-01, L2TS-02
**Success Criteria** (what must be TRUE):
  1. An L2 engineer can follow the log collection runbook to obtain diagnostic data using any of three methods — Company Portal log upload, MDM diagnostic report from Intune admin center, or Mac+cable sysdiagnose procedure — with clear guidance on which method yields which type of data
  2. The log collection runbook explicitly states there is no iOS equivalent to mdmdiagnosticstool.exe, so an L2 engineer arriving from Windows experience understands the tool landscape immediately
  3. An L2 engineer investigating an ADE token or profile delivery failure has a runbook with specific indicators to check (token sync status, profile assignment state, enrollment profile GUID) and known failure patterns with resolution steps
  4. An L2 engineer investigating app install or compliance/CA timing failures can use the runbooks to distinguish between configuration errors, timing issues, and genuine defects requiring Microsoft support escalation
**Plans:** 2/7 plans executed
Plans:
- [x] 31-01-PLAN.md — Wave 0: validation harness + expected-d23.txt fixture + placeholder-inventory.json snapshot + L2 template enum edit + emoji policy audit
- [x] 31-02-PLAN.md — Wave 1: runbook 14 (iOS log collection) with D-02 preamble + D-03 decision matrix + D-05 sysdiagnose + T-31-01/02 PII/egress callouts
- [ ] 31-03-PLAN.md — Wave 2: runbook 15 (ADE token & profile delivery) with D-07 hybrid structure + Pattern A-D + D-09 Graph API READ-ONLY preamble + D-10 triple-portal prereq
- [ ] 31-04-PLAN.md — Wave 2 (parallel): runbook 16 (app install) with three-class disambiguation [CONFIG]/[TIMING]/[DEFECT] + D-13 MAM advisory cross-ref
- [ ] 31-05-PLAN.md — Wave 3: runbook 17 (compliance & CA timing) with D-14 hybrid axis + D-15 Pareto + D-16 Not-evaluated terminal state + D-17 L1 handoff
- [ ] 31-06-PLAN.md — Wave 4: 00-index.md iOS L2 section injection (D-20 When-to-Use + L1 Escalation Mapping + D-21 MAM advisory)
- [ ] 31-07-PLAN.md — Wave 5: D-22 placeholder retrofit across 9 files in 4 atomic commits per D-24 + D-23 prose rewrite at line 182

### Phase 32: Navigation Integration & References
**Goal**: iOS/iPadOS content is reachable from every shared navigation entry point — the hub index, common issues routing, quick-reference cards, and capability matrix — so users do not need to know the file paths to find iOS documentation
**Depends on**: Phases 26-31 (all content phases complete; file paths stable)
**Requirements**: NAV-01, NAV-02, NAV-03
**Success Criteria** (what must be TRUE):
  1. The shared glossary (_glossary-macos.md) contains definitions for iOS-specific terms (supervision, MAM-WE, APNs, account-driven user enrollment, VPP, and jailbreak detection) that did not exist in prior milestones
  2. A user arriving at index.md, common-issues.md, quick-ref-l1.md, or quick-ref-l2.md finds an iOS/iPadOS section with direct links to relevant iOS documents — no iOS content is reachable only via directory browsing
  3. The iOS capability matrix (reference/ios-capability-matrix.md) documents feature parity gaps across iOS, macOS, and Windows in a scannable table format, allowing an admin to answer "can iOS do X" without reading three separate platform guides
  4. All navigation updates are injected into existing shared files (not full rewrites) and all pre-existing links in those files remain valid after iOS sections are added
**Plans**: TBD

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Foundation | v1.0 | 3/3 | Complete | 2026-03-12 |
| 2. Lifecycle | v1.0 | 3/3 | Complete | 2026-03-14 |
| 3. Error Codes | v1.0 | 3/3 | Complete | 2026-03-15 |
| 4. L1 Decision Trees | v1.0 | 2/2 | Complete | 2026-03-20 |
| 5. L1 Runbooks | v1.0 | 3/3 | Complete | 2026-03-20 |
| 6. L2 Runbooks | v1.0 | 4/4 | Complete | 2026-03-21 |
| 7. Navigation | v1.0 | 2/2 | Complete | 2026-03-23 |
| 8. Reference Anchors | v1.0 | 2/2 | Complete | 2026-04-08 |
| 9. Navigation Wiring | v1.0 | 1/1 | Complete | 2026-04-09 |
| 10. Navigation Polish | v1.0 | 1/1 | Complete | 2026-04-10 |
| 11. APv2 Lifecycle Foundation | v1.1 | 2/2 | Complete | 2026-04-11 |
| 12. APv2 Failure Index | v1.1 | 1/1 | Complete | 2026-04-12 |
| 13. APv2 L1 Decision Trees & Runbooks | v1.1 | 2/2 | Complete | 2026-04-12 |
| 14. APv2 L2 Runbooks | v1.1 | 3/3 | Complete | 2026-04-12 |
| 15. APv2 Admin Setup Guides | v1.1 | 2/2 | Complete | 2026-04-12 |
| 16. APv1 Admin Setup Guides | v1.1 | 3/3 | Complete | 2026-04-13 |
| 17. Navigation & Hub Updates | v1.1 | 3/3 | Complete | 2026-04-13 |
| 18. Stale Cross-Reference Cleanup | v1.1 | 1/1 | Complete | 2026-04-13 |
| 19. Tracking & Verification Hygiene | v1.1 | 1/1 | Complete | 2026-04-13 |
| 20. Cross-Platform Foundation | v1.2 | 3/3 | Complete | 2026-04-13 |
| 21. Windows Operational Gaps | v1.2 | 6/6 | Complete | 2026-04-14 |
| 22. macOS Lifecycle Foundation | v1.2 | 2/2 | Complete | 2026-04-14 |
| 23. macOS Admin Setup | v1.2 | 4/4 | Complete | 2026-04-14 |
| 24. macOS Troubleshooting | v1.2 | 3/3 | Complete | 2026-04-15 |
| 25. Navigation Integration & Polish | v1.2 | 2/2 | Complete | 2026-04-15 |
| 26. iOS/iPadOS Foundation | v1.3 | 2/2 | Complete    | 2026-04-16 |
| 27. iOS Admin Setup — Corporate ADE Path | v1.3 | 3/3 | Complete    | 2026-04-16 |
| 28. iOS Admin Setup — Configuration, Apps, Compliance | v1.3 | 3/3 | Complete    | 2026-04-17 |
| 29. iOS Admin Setup — BYOD & MAM | v1.3 | 5/5 | Complete    | 2026-04-17 |
| 30. iOS L1 Triage & Runbooks | v1.3 | 7/10 | In Progress|  |
| 31. iOS L2 Investigation | v1.3 | 2/7 | In Progress|  |
| 32. Navigation Integration & References | v1.3 | 0/TBD | Not started | - |
