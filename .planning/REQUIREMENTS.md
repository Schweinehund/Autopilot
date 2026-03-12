# Requirements: Windows Autopilot Documentation Suite

**Defined:** 2026-03-10
**Core Value:** IT teams can independently diagnose and resolve Autopilot deployment failures

## v1 Requirements

Requirements for milestone v1.0. Each maps to roadmap phases.

### Foundation

- [ ] **FOUND-01**: Glossary of Autopilot terminology (OOBE, ESP, TPM, ZTD, APv1, APv2) accessible to both L1 and L2
- [ ] **FOUND-02**: Registry path reference documenting all Autopilot-relevant registry locations
- [ ] **FOUND-03**: Network endpoints reference with full URL list and test commands
- [ ] **FOUND-04**: PowerShell function reference for all 12 exported diagnostic/remediation functions
- [x] **FOUND-05**: L1 and L2 document templates with "Last verified" / "Review by" frontmatter
- [ ] **FOUND-06**: APv1 vs APv2 disambiguation page clarifying which docs apply to which mode

### Lifecycle

- [ ] **LIFE-01**: End-to-end Autopilot lifecycle overview with flow diagram (hardware hash → desktop)
- [ ] **LIFE-02**: Hardware hash import and device registration stage guide
- [ ] **LIFE-03**: Autopilot profile assignment stage guide
- [ ] **LIFE-04**: OOBE and deployment mode selection stage guide (user-driven + pre-provisioning)
- [ ] **LIFE-05**: Enrollment Status Page (ESP) stage guide covering device and user phases
- [ ] **LIFE-06**: Post-enrollment verification and handoff stage guide

### Error Codes

- [ ] **ERRC-01**: Master error code lookup table with deployment-mode tagging and phase-of-failure grouping
- [ ] **ERRC-02**: MDM enrollment errors section (0x8018xxxx series) with multi-cause handling
- [ ] **ERRC-03**: TPM attestation errors section with hardware-specific notes
- [ ] **ERRC-04**: ESP and enrollment errors section
- [ ] **ERRC-05**: Pre-provisioning and self-deploying mode errors section
- [ ] **ERRC-06**: Hybrid join and device registration errors section with event ID mapping

### L1 Decision Trees

- [ ] **L1DT-01**: Initial triage decision tree (Mermaid) with network reachability gate
- [ ] **L1DT-02**: ESP failure decision tree with device vs user phase branching
- [ ] **L1DT-03**: Profile assignment failure decision tree
- [ ] **L1DT-04**: TPM attestation failure decision tree for pre-provisioning

### L1 Runbooks

- [ ] **L1RB-01**: Device not in Autopilot runbook (scripted, no registry/PowerShell)
- [ ] **L1RB-02**: ESP stuck or failed runbook with explicit escalation criteria
- [ ] **L1RB-03**: Profile not assigned runbook
- [ ] **L1RB-04**: Network connectivity failure runbook
- [ ] **L1RB-05**: OOBE fails immediately runbook

### L2 Runbooks

- [ ] **L2RB-01**: Log collection guide (mdmdiagnosticstool.exe, Event Viewer paths, PowerShell tools)
- [ ] **L2RB-02**: ESP deep-dive (registry structure, device vs user phase, LOB+Win32 conflicts)
- [ ] **L2RB-03**: TPM attestation failure investigation (hardware-specific codes, firmware paths)
- [ ] **L2RB-04**: Hybrid join failure investigation (ODJ connector, domain replication, 0x80070774)
- [ ] **L2RB-05**: Policy conflict analysis (AppLocker CSP, DeviceLock, Security Baseline, GPO conflicts)

### Navigation

- [ ] **NAV-01**: Master index with role-based entry points (L1 path / L2 path)
- [ ] **NAV-02**: L1 quick-reference card (top checks, escalation triggers)
- [ ] **NAV-03**: L2 quick-reference card (PowerShell commands, log paths, event IDs)
- [ ] **NAV-04**: Updated common-issues.md as navigation index linking to runbooks

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Tooling Integration

- **TOOL-01**: Interactive web-based decision trees (requires frontend milestone)
- **TOOL-02**: Full PowerShell tool integration into runbooks with executable examples
- **TOOL-03**: MkDocs site generation with search and tabbed content

### Extended Coverage

- **EXT-01**: Windows Autopilot Device Preparation (APv2) full documentation
- **EXT-02**: Self-deploying mode detailed runbook (standalone)
- **EXT-03**: Hardware-specific TPM compatibility matrix with firmware versions

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Environment-specific screenshots | Stale within weeks of Microsoft UI updates; use text descriptions with element names |
| Automated remediation scripts in L1 guides | L1 running PowerShell against production devices without L2 oversight causes data loss and re-registration loops |
| Complete replication of Microsoft Known Issues page | Creates maintenance burden and version drift; reference by URL instead |
| Tenant-specific configuration docs | Violates generic constraint; teams customize locally via "Customization Notes" sections |
| Real-time error dashboards | Frontend UI deferred to future milestone |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Pending |
| FOUND-05 | Phase 1 | Complete |
| FOUND-06 | Phase 1 | Pending |
| LIFE-01 | Phase 2 | Pending |
| LIFE-02 | Phase 2 | Pending |
| LIFE-03 | Phase 2 | Pending |
| LIFE-04 | Phase 2 | Pending |
| LIFE-05 | Phase 2 | Pending |
| LIFE-06 | Phase 2 | Pending |
| ERRC-01 | Phase 3 | Pending |
| ERRC-02 | Phase 3 | Pending |
| ERRC-03 | Phase 3 | Pending |
| ERRC-04 | Phase 3 | Pending |
| ERRC-05 | Phase 3 | Pending |
| ERRC-06 | Phase 3 | Pending |
| L1DT-01 | Phase 4 | Pending |
| L1DT-02 | Phase 4 | Pending |
| L1DT-03 | Phase 4 | Pending |
| L1DT-04 | Phase 4 | Pending |
| L1RB-01 | Phase 5 | Pending |
| L1RB-02 | Phase 5 | Pending |
| L1RB-03 | Phase 5 | Pending |
| L1RB-04 | Phase 5 | Pending |
| L1RB-05 | Phase 5 | Pending |
| L2RB-01 | Phase 6 | Pending |
| L2RB-02 | Phase 6 | Pending |
| L2RB-03 | Phase 6 | Pending |
| L2RB-04 | Phase 6 | Pending |
| L2RB-05 | Phase 6 | Pending |
| NAV-01 | Phase 7 | Pending |
| NAV-02 | Phase 7 | Pending |
| NAV-03 | Phase 7 | Pending |
| NAV-04 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 36 total
- Mapped to phases: 36
- Unmapped: 0

---
*Requirements defined: 2026-03-10*
*Last updated: 2026-03-10 — traceability populated after roadmap creation*
