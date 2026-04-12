# Roadmap: Windows Autopilot Documentation Suite

## Milestones

- ✅ **v1.0 Autopilot Documentation & Troubleshooting Guides** — Phases 1-10 (shipped 2026-04-10)
- **v1.1 APv2 Documentation & Admin Setup Guides** — Phases 11-17 (in progress)

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

### v1.1 APv2 Documentation & Admin Setup Guides

- [x] **Phase 11: APv2 Lifecycle Foundation** — APv2 deployment flow, prerequisites, comparison with APv1, and automatic mode (completed 2026-04-11)
- [x] **Phase 12: APv2 Failure Index** — Scenario-based failure catalog and updated master error code index with APv2 section (completed 2026-04-12)
- [ ] **Phase 13: APv2 L1 Decision Trees & Runbooks** — Initial triage tree and scripted L1 runbooks for top APv2 failure scenarios
- [ ] **Phase 14: APv2 L2 Runbooks** — BootstrapperAgent log collection and Intune deployment report analysis guides
- [ ] **Phase 15: APv2 Admin Setup Guides** — Step-by-step APv2 configuration from prerequisites through Device Preparation policy
- [ ] **Phase 16: APv1 Admin Setup Guides** — Hardware hash upload, profile, ESP, dynamic groups, and deployment mode configuration
- [ ] **Phase 17: Navigation & Hub Updates** — Updated index, error index, glossary, common-issues, and cross-references

## Phase Details

### Phase 11: APv2 Lifecycle Foundation
**Goal**: Admins can understand the complete APv2 deployment model, verify prerequisites, and make an informed APv1 vs APv2 selection decision
**Depends on**: Nothing (foundation phase for all v1.1 APv2 content)
**Requirements**: LIFE-01, LIFE-02, LIFE-03, LIFE-04
**Success Criteria** (what must be TRUE):
  1. Admin can read a complete APv2 10-step deployment flow with a Mermaid diagram showing Enrollment Time Grouping as the core mechanism, distinct from APv1 ESP flow
  2. Admin can find and apply the APv2 prerequisites checklist (OS version gate, licensing, auto-enrollment, APv1 deregistration requirement) before attempting any configuration
  3. Admin can consult an updated APv1 vs APv2 comparison document to select the right framework and understand migration implications
  4. Admin can find APv2 automatic mode (Windows 365) documentation with preview-status caveats clearly stated
**Plans:** 2/2 plans complete
Plans:
- [x] 11-01-PLAN.md — APv2 overview, prerequisites checklist, and admin guide template
- [x] 11-02-PLAN.md — Deployment flow with Mermaid diagrams, automatic mode, and comparison page extension

### Phase 12: APv2 Failure Index
**Goal**: Technicians have a scenario-based APv2 failure catalog they can search by symptom, and the master error index acknowledges the APv2 framework
**Depends on**: Phase 11 (lifecycle foundation must exist before failure scenarios can reference normal behavior)
**Requirements**: TROU-01, NAVG-02
**Success Criteria** (what must be TRUE):
  1. Technician can look up any APv2 failure scenario by symptom description (e.g. "deployment experience never launched", "apps not installed") without needing a hex error code
  2. The master error code index (error-codes/00-index.md) has an APv2 section with a Framework column distinguishing APv1 and APv2 entries
  3. The APv2 failure catalog file (error-codes/06-apv2-device-preparation.md) contains no hex code tables — all failures are organized by symptom and scenario
**Plans:** 1/1 plans complete
Plans:
- [x] 12-01-PLAN.md — APv2 failure catalog (10 scenarios) and master index APv2 section

### Phase 13: APv2 L1 Decision Trees & Runbooks
**Goal**: L1 Service Desk agents can independently triage and handle the most common APv2 deployment failures using only browser/portal actions
**Depends on**: Phase 12 (runbooks link to specific failure scenarios in the index)
**Requirements**: TROU-02, TROU-03
**Success Criteria** (what must be TRUE):
  1. L1 agent can enter an APv2 triage decision tree, answer "Did ESP display?" as the first gate (yes = APv1 mode, wrong doc), and be routed to the correct runbook within 3 decision steps
  2. L1 agent can follow a scripted runbook for "deployment experience never launched" using only Intune portal actions, with zero PowerShell or registry steps
  3. L1 agent can follow a scripted runbook for "apps and scripts not installed" using only Intune portal actions, with zero PowerShell or registry steps
  4. L1 agent can identify when an APv2 symptom is actually an APv1 registration conflict (ESP appeared unexpectedly) and route to the APv1 doc set
**Plans:** 2 plans
Plans:
- [ ] 13-01-PLAN.md — APv2 triage decision tree, APv1 conflict runbook, and existing file updates (initial triage cross-ref, L1 index, Phase 12 forward references)
- [ ] 13-02-PLAN.md — Deployment not launched, apps not installed, and deployment timeout L1 runbooks

### Phase 14: APv2 L2 Runbooks
**Goal**: L2 Desktop Engineers can collect APv2-specific logs and interpret the Intune deployment report to diagnose failures that L1 cannot resolve
**Depends on**: Phase 13 (L2 escalation paths reference L1 triage outcomes; L2 runbooks link to L1 trees)
**Requirements**: TROU-04, TROU-05
**Success Criteria** (what must be TRUE):
  1. L2 engineer can follow a step-by-step log collection guide for APv2 failures that explicitly states MDM Diagnostic Tool does not apply to APv2 and directs to BootstrapperAgent event log instead
  2. L2 engineer can look up BootstrapperAgent event IDs with confidence-attributed source citations (MEDIUM confidence — oofhours.com, Call4Cloud) for any entries lacking an official Microsoft reference
  3. L2 engineer can read the Intune APv2 deployment report, interpret each status value, and identify which status indicates a failure requiring investigation
**Plans**: TBD

### Phase 15: APv2 Admin Setup Guides
**Goal**: Intune admins can configure a complete APv2 deployment from scratch, including the Enrollment Time Grouping device group, Device Preparation policy, RBAC role, and corporate identifiers
**Depends on**: Phase 11 (lifecycle and prerequisites must be established before setup guide references them); Phase 13 (setup guides forward-reference L1 runbooks for per-setting failure callouts)
**Requirements**: ASET-01, ASET-02, ASET-03, ASET-04, ASET-05
**Success Criteria** (what must be TRUE):
  1. Admin can follow a sequential APv2 setup guide from prerequisites through Device Preparation policy creation without leaving the guide to find missing information
  2. Admin can configure the Enrollment Time Grouping device group correctly using a 4-item checklist that explicitly states the Intune Provisioning Client AppID (f1346770-5b25-470b-88bd-d5744ab7952c) and the PowerShell procedure for adding it as group owner
  3. Admin can diagnose any APv2 setup mistake using per-setting "what breaks if misconfigured" callouts embedded in the setup guide itself, with links to the relevant L1 runbook
  4. Admin can create a custom RBAC role for APv2 administration with all five required permission categories listed as a prerequisite before any setup step
  5. Admin can configure corporate identifiers for enrollment restriction scenarios with enrollment restriction conflict behavior explicitly documented
**Plans**: TBD

### Phase 16: APv1 Admin Setup Guides
**Goal**: Intune admins can configure a complete APv1 deployment — hardware hash registration, deployment profiles, ESP policies, dynamic groups, and deployment modes — with configuration-caused failure chains documented at each step
**Depends on**: Phase 11 (admin-template.md established in Phase 11 provides the guide format for all admin guides)
**Requirements**: ADMN-01, ADMN-02, ADMN-03, ADMN-04, ADMN-05, ADMN-06, ADMN-07
**Success Criteria** (what must be TRUE):
  1. Admin can follow the hardware hash upload guide covering all three paths (OEM delivery, CSV bulk import, PowerShell script) and know which path applies to their scenario
  2. Admin can configure a deployment profile with correct OOBE settings and read per-setting "what breaks" warnings for each configurable option
  3. Admin can configure an ESP policy with recommended timeout values (device and user phase), app tracking list, and Windows Update setting, with misconfiguration consequences documented per setting
  4. Admin can create a dynamic device group using the correct ZTDId membership rule with sync delay expectations and profile conflict resolution guidance included
  5. Admin can select and configure any of the three APv1 deployment modes (user-driven, pre-provisioning, self-deploying) with mode-specific prerequisites and known limitations documented
  6. Admin can look up any configuration mistake from a "configuration-caused failures" reverse-lookup table that links to the relevant v1.0 troubleshooting runbook
  7. Admin can set up the Intune Connector for AD for hybrid join deployments with connector version gate and current log path documented
**Plans**: TBD

### Phase 17: Navigation & Hub Updates
**Goal**: All audiences can discover and navigate the full v1.1 content set from the documentation hub, with APv2 terminology integrated into shared reference files
**Depends on**: Phases 11-16 (hub files written last after all content they link to exists)
**Requirements**: NAVG-01, NAVG-03, NAVG-04
**Success Criteria** (what must be TRUE):
  1. Any audience (L1, L2, admin) can navigate to APv2 content from index.md within two clicks, with APv2 sections visually distinct from APv1 sections
  2. Glossary (_glossary.md) contains APv2-specific terms (Enrollment Time Grouping, BootstrapperAgent, Device Preparation policy) with bidirectional cross-references to APv1 equivalents where they exist
  3. common-issues.md routes APv2 failure scenarios to APv2 runbooks and APv1 failure scenarios to APv1 runbooks without cross-contamination
  4. Every APv2 document that references an APv1 concept links back to the APv1 document, and every APv1 document that has an APv2 equivalent references it — bidirectional cross-referencing verified
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
| 11. APv2 Lifecycle Foundation | v1.1 | 2/2 | Complete    | 2026-04-11 |
| 12. APv2 Failure Index | v1.1 | 1/1 | Complete    | 2026-04-12 |
| 13. APv2 L1 Decision Trees & Runbooks | v1.1 | 0/2 | Planned | - |
| 14. APv2 L2 Runbooks | v1.1 | 0/? | Not started | - |
| 15. APv2 Admin Setup Guides | v1.1 | 0/? | Not started | - |
| 16. APv1 Admin Setup Guides | v1.1 | 0/? | Not started | - |
| 17. Navigation & Hub Updates | v1.1 | 0/? | Not started | - |
