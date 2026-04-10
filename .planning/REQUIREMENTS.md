# Requirements: Windows Autopilot Troubleshooter & Documentation Suite

**Defined:** 2026-04-10
**Core Value:** IT teams can independently diagnose and resolve Autopilot deployment failures without escalating to engineering

## v1.1 Requirements

Requirements for milestone v1.1: APv2 Documentation & Admin Setup Guides. Each maps to roadmap phases.

### APv2 Lifecycle

- [ ] **LIFE-01**: Admin can find a complete APv2 deployment flow overview (10-step process, how it differs from APv1)
- [ ] **LIFE-02**: Admin can verify APv2 prerequisites (OS version, licensing, Intune config, networking)
- [ ] **LIFE-03**: Admin can use updated APv1 vs APv2 comparison with actionable guidance (when to use which, migration steps)
- [ ] **LIFE-04**: Admin can find APv2 automatic mode documentation (Windows 365 deployment, preview status noted)

### APv2 Troubleshooting

- [ ] **TROU-01**: Technician can look up APv2 failure scenarios by symptom (scenario-based index, not hex codes)
- [ ] **TROU-02**: L1 agent can follow APv2 decision tree to identify failure type and route to correct runbook
- [ ] **TROU-03**: L1 agent can follow scripted APv2 runbooks (zero PowerShell, portal-only actions)
- [ ] **TROU-04**: L2 engineer can investigate APv2 failures using BootstrapperAgent logs and deployment reports
- [ ] **TROU-05**: L2 engineer can interpret the Intune APv2 deployment report (status meanings, failure indicators)

### APv2 Admin Setup

- [ ] **ASET-01**: Admin can follow step-by-step APv2 setup guide (prerequisites through Device Preparation policy)
- [ ] **ASET-02**: Admin can configure Enrollment Time Grouping device group with correct Intune Provisioning Client ownership
- [ ] **ASET-03**: Admin can diagnose APv2 setup mistakes using per-setting troubleshooting guidance
- [ ] **ASET-04**: Admin can create custom RBAC role for APv2 administration
- [ ] **ASET-05**: Admin can configure corporate identifiers for enrollment restriction scenarios

### APv1 Admin Setup

- [ ] **ADMN-01**: Admin can follow step-by-step hardware hash upload process (OEM, CSV, PowerShell script)
- [ ] **ADMN-02**: Admin can configure Autopilot deployment profiles (OOBE settings, deployment modes)
- [ ] **ADMN-03**: Admin can configure ESP policies (app/policy tracking, timeout settings, error handling)
- [ ] **ADMN-04**: Admin can create dynamic device groups for Autopilot targeting
- [ ] **ADMN-05**: Admin can select and configure deployment modes (user-driven, pre-provisioning, self-deploying)
- [ ] **ADMN-06**: Admin can identify configuration-caused failures from per-setting "what breaks" warnings
- [ ] **ADMN-07**: Admin can set up Intune Connector for AD for hybrid join deployments

### Navigation & Integration

- [ ] **NAVG-01**: All audiences can navigate to APv2 content from updated index.md hub
- [ ] **NAVG-02**: Error code master index includes APv2 failure scenarios section
- [ ] **NAVG-03**: Glossary and common-issues.md updated with APv2 terminology and routing
- [ ] **NAVG-04**: Cross-references between APv2 and APv1 content are bidirectional and accurate

## Future Requirements (v1.2)

### macOS Provisioning

- **MCOS-01**: Full macOS provisioning lifecycle documentation (Apple ADE/ABM via Intune)
- **MCOS-02**: macOS L1/L2 tiered troubleshooting runbooks
- **MCOS-03**: macOS admin setup guides
- **MCOS-04**: Intune gap analysis for macOS with platform tool recommendations

### Linux Provisioning

- **LINX-01**: Full Linux provisioning lifecycle documentation (Intune enrollment)
- **LINX-02**: Linux L1/L2 tiered troubleshooting runbooks
- **LINX-03**: Linux admin setup guides
- **LINX-04**: Intune gap analysis for Linux with platform tool recommendations

## Out of Scope

| Feature | Reason |
|---------|--------|
| APv2 pre-provisioning | Experimental/unconfirmed in official Microsoft Learn docs; defer until GA |
| Frontend UI implementation | Deferred to future tooling milestone |
| Backend API integration | Deferred to future tooling milestone |
| Automated remediation workflows | Deferred to future tooling milestone |
| MkDocs site generation | Deferred to future milestone |
| Interactive web decision trees | Deferred to future milestone |
| Environment-specific configurations | Docs are generic; teams customize locally |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| LIFE-01 | Phase 11 | Pending |
| LIFE-02 | Phase 11 | Pending |
| LIFE-03 | Phase 11 | Pending |
| LIFE-04 | Phase 11 | Pending |
| TROU-01 | Phase 12 | Pending |
| TROU-02 | Phase 13 | Pending |
| TROU-03 | Phase 13 | Pending |
| TROU-04 | Phase 14 | Pending |
| TROU-05 | Phase 14 | Pending |
| ASET-01 | Phase 15 | Pending |
| ASET-02 | Phase 15 | Pending |
| ASET-03 | Phase 15 | Pending |
| ASET-04 | Phase 15 | Pending |
| ASET-05 | Phase 15 | Pending |
| ADMN-01 | Phase 16 | Pending |
| ADMN-02 | Phase 16 | Pending |
| ADMN-03 | Phase 16 | Pending |
| ADMN-04 | Phase 16 | Pending |
| ADMN-05 | Phase 16 | Pending |
| ADMN-06 | Phase 16 | Pending |
| ADMN-07 | Phase 16 | Pending |
| NAVG-01 | Phase 17 | Pending |
| NAVG-02 | Phase 12 | Pending |
| NAVG-03 | Phase 17 | Pending |
| NAVG-04 | Phase 17 | Pending |

**Coverage:**
- v1.1 requirements: 25 total
- Mapped to phases: 25
- Unmapped: 0

---
*Requirements defined: 2026-04-10*
*Last updated: 2026-04-10 after roadmap creation — all 25 requirements mapped to phases 11-17*
