# Roadmap: Windows Autopilot & macOS Provisioning Documentation Suite

## Milestones

- ✅ **v1.0 Autopilot Documentation & Troubleshooting Guides** — Phases 1-10 (shipped 2026-04-10)
- ✅ **v1.1 APv2 Documentation & Admin Setup Guides** — Phases 11-19 (shipped 2026-04-13)
- **v1.2 Cross-Platform Provisioning & Operational Gaps** — Phases 20-25 (in progress)

## Phases

<details>
<summary>v1.0 Autopilot Documentation & Troubleshooting Guides (Phases 1-10) — SHIPPED 2026-04-10</summary>

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
<summary>v1.1 APv2 Documentation & Admin Setup Guides (Phases 11-19) — SHIPPED 2026-04-13</summary>

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

### v1.2 Cross-Platform Provisioning & Operational Gaps

- [x] **Phase 20: Cross-Platform Foundation** (3 plans) — Shared glossary, terminology standards, macOS template, platform taxonomy, and navigation structure design (completed 2026-04-13)
- [ ] **Phase 21: Windows Operational Gaps** (6 plans) — Device lifecycle, infrastructure prerequisites, ESP app strategy, security/compliance, migration scenarios, and monitoring (parallelizable with Phase 22)
- [x] **Phase 22: macOS Lifecycle Foundation** (2 plans) — ADE lifecycle overview, reference files, and network endpoints (parallelizable with Phase 21) (completed 2026-04-14)
- [x] **Phase 23: macOS Admin Setup** (4 plans) — ABM configuration, enrollment profiles, configuration profiles, app deployment, compliance, and capability matrix (completed 2026-04-14)
- [ ] **Phase 24: macOS Troubleshooting** — L1 decision tree and runbooks, L2 log collection and diagnostic runbooks
- [ ] **Phase 25: Navigation Integration & Polish** — Cross-platform common-issues routing, quick-reference card updates, and final link population

## Phase Details

### Phase 20: Cross-Platform Foundation
**Goal**: Admins managing both platforms have shared terminology standards, a macOS documentation template, and a navigation structure that supports cross-platform content without Windows-centric bias
**Depends on**: Nothing (prerequisite for all other v1.2 phases)
**Requirements**: XPLAT-01, XPLAT-02, XPLAT-03, XPLAT-04, NAVX-01
**Success Criteria** (what must be TRUE):
  1. Admin can consult a platform-comparison page that maps every Windows Autopilot concept to its macOS ADE equivalent (enrollment mechanism, diagnostic tools, provisioning stages) and vice versa
  2. Admin can look up any macOS-specific term (ADE, ABM, Setup Assistant, Await Configuration, VPP, ABM token) in the glossary and find bidirectional cross-references to Windows equivalents
  3. The docs hub (index.md) presents a platform selector above role-based routing so users choose Windows or macOS before choosing their role, without breaking existing Windows navigation paths
  4. Every new macOS document uses the macOS admin template with dual-portal references (ABM + Intune admin center) and Setup Assistant replacing ESP terminology
  5. All documentation files support a `platform:` frontmatter field (Windows/macOS/all) for filtering, with existing docs defaulting to Windows without retroactive edits
**Plans**: 3 plans
Plans:
- [x] 20-01-PLAN.md — Platform frontmatter taxonomy + Windows vs macOS comparison page (XPLAT-04, XPLAT-01)
- [x] 20-02-PLAN.md — macOS glossary + macOS admin template (XPLAT-02, XPLAT-03)
- [x] 20-03-PLAN.md — Navigation hub restructure with platform selector (NAVX-01)

### Phase 21: Windows Operational Gaps
**Goal**: Admins can manage the complete Windows device lifecycle beyond initial provisioning, configure infrastructure prerequisites correctly, deploy apps through ESP reliably, apply security policies without breaking enrollment, plan migrations between frameworks, and monitor deployment health proactively
**Depends on**: Phase 20 (platform taxonomy and glossary must exist; Windows content uses `platform: Windows` frontmatter)
**Requirements**: WDLC-01, WDLC-02, WDLC-03, WDLC-04, WINF-01, WINF-02, WINF-03, WINF-04, WINF-05, WSEC-01, WSEC-02, WSEC-03, WMIG-01, WMIG-02, WMIG-03, WMON-01, WMON-02, WMON-03
**Success Criteria** (what must be TRUE):
  1. Admin can follow step-by-step procedures for Autopilot Reset (local and remote), device retirement, wipe, and tenant-to-tenant migration, and can use a decision tree to choose the right action based on what they want to preserve
  2. Admin can verify network/firewall readiness using documented test commands for every required endpoint, configure Entra ID prerequisites with per-setting consequence documentation, and determine which Autopilot features their licensing SKU enables
  3. Admin can package Win32 apps for ESP reliability with documented detection rules and install order dependencies, and tune ESP timeouts using recommended values by scenario with misconfiguration consequences documented
  4. Admin can configure Conditional Access and compliance policies during enrollment without causing enrollment loops, with the chicken-and-egg compliance timing problem explained and resolved for Windows
  5. Admin can plan an APv1-to-APv2 parallel deployment using a readiness checklist with blockers identified, migrate from on-prem imaging to Autopilot with app packaging guidance, and translate GPO policies to Intune using outcome-based mapping (not 1:1)
**Plans**: 6 plans
Plans:
- [ ] 21-01-PLAN.md — Device lifecycle operations: reset, retire/wipe, re-provisioning, tenant migration + decision tree (WDLC-01, WDLC-02, WDLC-03, WDLC-04)
- [ ] 21-02-PLAN.md — Infrastructure prerequisites: network, Entra ID, licensing, Win32 apps, ESP timeout (WINF-01, WINF-02, WINF-03, WINF-04, WINF-05)
- [ ] 21-03-PLAN.md — Security and compliance: CA enrollment timing, baseline conflicts, compliance timing (WSEC-01, WSEC-02, WSEC-03)
- [ ] 21-04-PLAN.md — Migration scenarios: APv1-to-APv2, imaging-to-Autopilot, GPO-to-Intune (WMIG-01, WMIG-02, WMIG-03)
- [ ] 21-05-PLAN.md — Monitoring and operations: deployment reporting, drift detection, new-batch workflow (WMON-01, WMON-02, WMON-03)
- [ ] 21-06-PLAN.md — Navigation integration: reference index, docs hub, common-issues, lifecycle link, glossary (all requirements)

### Phase 22: macOS Lifecycle Foundation
**Goal**: Admins and technicians understand the complete macOS ADE enrollment journey from ABM registration through desktop delivery, and have reference materials for macOS-native diagnostics
**Depends on**: Phase 20 (glossary terms, platform-comparison page, and macOS template must exist before lifecycle content is written)
**Requirements**: MLIF-01, MLIF-02, MLIF-03
**Success Criteria** (what must be TRUE):
  1. Admin can read a complete macOS ADE lifecycle narrative covering all 7 stages (ABM registration, ADE token sync, enrollment profile assignment, Setup Assistant, Await Configuration, Company Portal, desktop) with a flow diagram using macOS-native terminology throughout
  2. Technician can look up macOS log paths, Terminal diagnostic commands, and key configuration profile locations in a dedicated reference file (the macOS equivalent of the Windows PowerShell/registry reference)
  3. Admin can find all Apple and Microsoft network endpoints required for ADE enrollment in a single reference with test commands for each endpoint
**Plans**: 2 plans
Plans:
- [x] 22-01-PLAN.md — macOS ADE lifecycle narrative with 7-stage pipeline and Mermaid diagram (MLIF-01)
- [x] 22-02-PLAN.md — macOS reference files (commands, log paths), endpoints extension, and navigation updates (MLIF-02, MLIF-03)

### Phase 23: macOS Admin Setup
**Goal**: Admins can configure macOS device management end-to-end through Intune and ABM using step-by-step guides with per-setting misconfiguration callouts, and understand where macOS capabilities differ from Windows
**Depends on**: Phase 22 (lifecycle provides context for admin guide cross-references and misconfiguration consequence explanations)
**Requirements**: MADM-01, MADM-02, MADM-03, MADM-04, MADM-05, MADM-06
**Success Criteria** (what must be TRUE):
  1. Admin can configure ABM for ADE token creation, device assignment, and MDM server linking, with renewal lifecycle documentation that prevents silent management failures from lapsed certificates
  2. Admin can configure macOS enrollment profiles with Setup Assistant screen customization and Await Configuration settings, with per-setting "what breaks" callouts matching the proven Windows admin guide pattern
  3. Admin can deploy macOS apps using all three methods (DMG, PKG, VPP/Apps and Books) with documented size limits, detection rules, and uninstall capabilities per type
  4. Admin can configure macOS compliance policies (SIP, FileVault, firewall, Gatekeeper, password) with explicit documentation that no Intune security baselines exist for macOS
  5. Admin can consult a capability matrix showing feature parity gaps between macOS and Windows across enrollment, configuration, app deployment, compliance, and updates
**Plans**: 4 plans
Plans:
- [x] 23-01-PLAN.md — ABM configuration guide and enrollment profile guide (MADM-01, MADM-02)
- [x] 23-02-PLAN.md — Configuration profiles guide and compliance policy guide (MADM-03, MADM-05)
- [x] 23-03-PLAN.md — App deployment guide and capability matrix (MADM-04, MADM-06)
- [x] 23-04-PLAN.md — Overview, config-failures reference, and navigation updates (all requirements)

### Phase 24: macOS Troubleshooting
**Goal**: L1 and L2 support staff can independently triage and resolve macOS enrollment and management failures using platform-appropriate tools (portal actions for L1, Terminal diagnostics for L2)
**Depends on**: Phase 23 (admin setup guides inform failure scenarios; app deployment and compliance context needed for troubleshooting)
**Requirements**: MTRO-01, MTRO-02, MTRO-03, MTRO-04
**Success Criteria** (what must be TRUE):
  1. L1 agent can enter a macOS triage decision tree using "Did Setup Assistant complete?" as the first gate, and be routed to the correct scripted runbook within 3 decision steps
  2. L1 agent can follow runbooks for top macOS enrollment failure scenarios using only ABM portal and Intune admin center actions, with zero Terminal commands required
  3. L2 technician can collect macOS diagnostic logs using IntuneMacODC and Terminal commands, with log path references for each macOS version
  4. L2 technician can investigate profile delivery failures, app install failures, and compliance evaluation issues using macOS-native diagnostics (not Windows patterns adapted for Mac)
**Plans**: TBD

### Phase 25: Navigation Integration & Polish
**Goal**: Users on any platform can find the correct documentation within two clicks from the hub, with macOS content fully integrated into existing navigation structures and quick-reference materials
**Depends on**: Phases 21, 22, 23, 24 (all content must exist before final navigation links are populated)
**Requirements**: NAVX-02, NAVX-03
**Success Criteria** (what must be TRUE):
  1. common-issues.md routes macOS scenarios to macOS runbooks and Windows scenarios to Windows runbooks without cross-contamination between platforms
  2. L1 and L2 quick-reference cards include macOS sections with Terminal commands, log paths, and key diagnostic checks alongside existing Windows content
  3. Every new documentation file created in Phases 20-24 is reachable from the docs hub (index.md) within two navigation clicks
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
| 20. Cross-Platform Foundation | v1.2 | 3/3 | Complete    | 2026-04-13 |
| 21. Windows Operational Gaps | v1.2 | 0/6 | Not started | - |
| 22. macOS Lifecycle Foundation | v1.2 | 2/2 | Complete    | 2026-04-14 |
| 23. macOS Admin Setup | v1.2 | 4/4 | Complete    | 2026-04-14 |
| 24. macOS Troubleshooting | v1.2 | 0/? | Not started | - |
| 25. Navigation Integration & Polish | v1.2 | 0/? | Not started | - |
