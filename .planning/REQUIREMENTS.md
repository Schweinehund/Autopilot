# Requirements: Windows Autopilot & macOS Provisioning Documentation Suite

**Defined:** 2026-04-13
**Core Value:** IT teams can independently provision, troubleshoot, and manage Windows and macOS devices through Intune without escalating to engineering

## v1.2 Requirements

Requirements for milestone v1.2 Cross-Platform Provisioning & Operational Gaps.

### Cross-Platform Foundation

- [ ] **XPLAT-01**: Platform-comparison page mapping Windows Autopilot concepts to macOS ADE equivalents (terminology, enrollment mechanisms, diagnostic tools) for admins managing both platforms
- [ ] **XPLAT-02**: Glossary expanded with macOS-specific terms (Automated Device Enrollment, Apple Business Manager, Setup Assistant, Await Configuration, VPP, ABM token) with bidirectional cross-references to Windows equivalents
- [ ] **XPLAT-03**: macOS admin guide template adapted from existing admin-template.md with dual-portal references (ABM + Intune admin center) and Setup Assistant configuration replacing ESP
- [ ] **XPLAT-04**: Frontmatter taxonomy extended with `platform:` field (Windows/macOS/all) for cross-platform filtering without breaking existing docs

### Windows Device Lifecycle

- [ ] **WDLC-01**: Autopilot Reset documentation (local and remote) with step-by-step procedures, data preservation behavior, and when-to-use guidance
- [ ] **WDLC-02**: Device retirement and wipe documentation covering all five remove/reset actions (Reset, Retire, Wipe, Fresh Start, Deregister) with a "what do you want to preserve" decision tree
- [ ] **WDLC-03**: Device re-provisioning guide for ownership transfer and re-enrollment scenarios with prerequisite checklist
- [ ] **WDLC-04**: Tenant-to-tenant device migration guide with deregistration, hardware hash re-import, and profile reassignment procedures

### Windows Infrastructure & ESP

- [ ] **WINF-01**: Network infrastructure deep-dive with exact firewall/proxy rules, split-tunnel VPN considerations for remote provisioning, and test commands for each endpoint
- [ ] **WINF-02**: Entra ID prerequisite configuration checklist for Autopilot (auto-enrollment, MDM authority, device limit, user scope) with per-setting consequence documentation
- [ ] **WINF-03**: Licensing matrix documenting which Microsoft 365/Intune SKUs enable which Autopilot features (APv1 modes, APv2, Reset, pre-provisioning)
- [ ] **WINF-04**: Win32 app packaging best practices for ESP reliability including detection rules, install order dependencies, and app tracking list optimization
- [ ] **WINF-05**: ESP timeout tuning guide with recommended values by scenario (device-phase apps, user-phase apps, mixed workloads) and misconfiguration consequences

### Windows Security & Compliance

- [ ] **WSEC-01**: Conditional Access enrollment timing guide explaining the non-compliant-at-enrollment chicken-and-egg problem with platform-specific resolution patterns (Windows and macOS)
- [ ] **WSEC-02**: Security baseline interaction with Autopilot provisioning documenting which baseline settings conflict with enrollment flow and mitigation strategies
- [ ] **WSEC-03**: Compliance policy timing guide covering evaluation schedule, grace periods, and how compliance state transitions interact with Conditional Access during and after provisioning

### Windows Migration

- [ ] **WMIG-01**: APv1-to-APv2 parallel deployment playbook framed as coexistence (not cutover) with readiness checklist, feature gap matrix, and deregistration prerequisites
- [ ] **WMIG-02**: On-prem imaging to Autopilot transition guide covering MDT/SCCM task sequence replacement with Autopilot equivalents and app packaging migration
- [ ] **WMIG-03**: GPO-to-Intune migration guide using Group Policy Analytics with percentage-based mapping reports and outcome-based policy translation (not 1:1 mapping)

### Windows Monitoring & Operations

- [ ] **WMON-01**: Intune deployment reporting guide for Autopilot with report types, filters, export options, and success rate interpretation
- [ ] **WMON-02**: Registration and profile assignment drift detection guide with proactive monitoring procedures and remediation steps
- [ ] **WMON-03**: New-batch-of-devices operational workflow documenting the end-to-end process from OEM order through first user login with checkpoint verification at each stage

### macOS Lifecycle

- [ ] **MLIF-01**: macOS ADE lifecycle overview documenting all 7 stages (ABM registration → ADE token sync → enrollment profile assignment → Setup Assistant → Await Configuration → Company Portal → desktop) with flow diagram
- [ ] **MLIF-02**: macOS reference files for log paths, Terminal diagnostic commands, and key configuration profile locations (macOS equivalent of Windows registry/PowerShell references)
- [ ] **MLIF-03**: macOS network endpoints reference listing all Apple and Microsoft URLs required for ADE enrollment with test commands

### macOS Admin Setup

- [ ] **MADM-01**: Apple Business Manager configuration guide for ADE token creation, device assignment, and MDM server linking with renewal lifecycle documentation
- [ ] **MADM-02**: macOS enrollment profile configuration guide with Setup Assistant screen customization and Await Configuration settings with per-setting "what breaks" callouts
- [ ] **MADM-03**: macOS configuration profile guide covering key management areas (Wi-Fi, VPN, email, restrictions, FileVault, firewall) with Intune-specific implementation notes
- [ ] **MADM-04**: macOS app deployment guide covering all three types (DMG, PKG, VPP/Apps and Books) with size limits, detection rules, and uninstall capabilities documented per type
- [ ] **MADM-05**: macOS compliance policy guide documenting available settings (SIP, FileVault, firewall, Gatekeeper, password) with explicit note that no Intune security baselines exist for macOS
- [ ] **MADM-06**: Intune macOS vs Windows capability matrix documenting feature parity gaps across enrollment, configuration, app deployment, compliance, and updates

### macOS Troubleshooting

- [ ] **MTRO-01**: macOS L1 triage decision tree using symptom-based routing (not error codes) with "Did Setup Assistant complete?" as first gate, routed to scripted runbooks
- [ ] **MTRO-02**: macOS L1 runbooks for top enrollment failure scenarios using only ABM portal and Intune admin center actions (zero Terminal commands)
- [ ] **MTRO-03**: macOS L2 log collection guide using IntuneMacODC tool and Terminal commands with log path reference for each macOS version
- [ ] **MTRO-04**: macOS L2 runbooks for profile delivery investigation, app install failure diagnosis, and compliance evaluation troubleshooting using macOS-native diagnostics

### Navigation Integration

- [ ] **NAVX-01**: Platform-first index.md restructure with platform selector above role-based routing (platform → role → framework) supporting Windows and macOS paths
- [ ] **NAVX-02**: Cross-platform common-issues.md routing macOS scenarios to macOS runbooks and Windows scenarios to Windows runbooks without cross-contamination
- [ ] **NAVX-03**: Updated L1 and L2 quick-reference cards with macOS sections (Terminal commands, log paths, key diagnostic checks)

## Future Requirements

Deferred to future releases. Tracked but not in current roadmap.

### Tooling Integration

- **TOOL-01**: Interactive web-based decision trees (requires frontend milestone)
- **TOOL-02**: Full PowerShell tool integration into runbooks with executable examples
- **TOOL-03**: MkDocs site generation with search and tabbed content

### Extended Coverage

- **EXT-01**: Self-deploying mode detailed standalone runbook
- **EXT-02**: Hardware-specific TPM compatibility matrix with firmware versions
- **EXT-03**: macOS Platform SSO standalone guide (pending adoption data)
- **EXT-04**: Post-WWDC 2026 macOS management changes review

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Environment-specific screenshots | Stale within weeks of vendor UI updates; use text descriptions with element names |
| Automated remediation scripts in L1 guides | L1 running scripts against production devices without L2 oversight causes data loss |
| Complete replication of vendor Known Issues pages | Creates maintenance burden and version drift; reference by URL instead |
| Tenant-specific configuration docs | Violates generic constraint; teams customize locally |
| Real-time error dashboards | Frontend UI deferred to future milestone |
| iOS/iPadOS provisioning | Platform not in scope for v1.2; add in future milestone if needed |
| Linux device enrollment | Intune Linux support is limited; defer until feature parity improves |
| ChromeOS management | Different management platform (Google Admin); out of project scope |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| XPLAT-01 | Phase 20 | Pending |
| XPLAT-02 | Phase 20 | Pending |
| XPLAT-03 | Phase 20 | Pending |
| XPLAT-04 | Phase 20 | Pending |
| NAVX-01 | Phase 20 | Pending |
| WDLC-01 | Phase 21 | Pending |
| WDLC-02 | Phase 21 | Pending |
| WDLC-03 | Phase 21 | Pending |
| WDLC-04 | Phase 21 | Pending |
| WINF-01 | Phase 21 | Pending |
| WINF-02 | Phase 21 | Pending |
| WINF-03 | Phase 21 | Pending |
| WINF-04 | Phase 21 | Pending |
| WINF-05 | Phase 21 | Pending |
| WSEC-01 | Phase 21 | Pending |
| WSEC-02 | Phase 21 | Pending |
| WSEC-03 | Phase 21 | Pending |
| WMIG-01 | Phase 21 | Pending |
| WMIG-02 | Phase 21 | Pending |
| WMIG-03 | Phase 21 | Pending |
| WMON-01 | Phase 21 | Pending |
| WMON-02 | Phase 21 | Pending |
| WMON-03 | Phase 21 | Pending |
| MLIF-01 | Phase 22 | Pending |
| MLIF-02 | Phase 22 | Pending |
| MLIF-03 | Phase 22 | Pending |
| MADM-01 | Phase 23 | Pending |
| MADM-02 | Phase 23 | Pending |
| MADM-03 | Phase 23 | Pending |
| MADM-04 | Phase 23 | Pending |
| MADM-05 | Phase 23 | Pending |
| MADM-06 | Phase 23 | Pending |
| MTRO-01 | Phase 24 | Pending |
| MTRO-02 | Phase 24 | Pending |
| MTRO-03 | Phase 24 | Pending |
| MTRO-04 | Phase 24 | Pending |
| NAVX-02 | Phase 25 | Pending |
| NAVX-03 | Phase 25 | Pending |

**Coverage:**
- v1.2 requirements: 38 total
- Mapped to phases: 38
- Unmapped: 0

---
*Requirements defined: 2026-04-13*
*Last updated: 2026-04-13 — traceability populated after roadmap creation*
