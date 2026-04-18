# Requirements: Windows Autopilot & macOS Provisioning Documentation Suite

**Defined:** 2026-04-16
**Core Value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, and iOS/iPadOS devices through Intune without escalating to engineering

## v1.3 Requirements

Requirements for iOS/iPadOS provisioning documentation. Each maps to roadmap phases.

### Lifecycle

- [x] **LIFE-01**: Enrollment path overview covers all 4 paths (ADE, device enrollment, user enrollment, MAM-WE) with comparison table and selection guidance
- [x] **LIFE-02**: iOS/iPadOS ADE lifecycle document covers supervised corporate enrollment end-to-end (Setup Assistant through post-enrollment)

### Admin Setup — Corporate

- [x] **ACORP-01**: APNs certificate guide covers creation, renewal, and cross-platform expiry impact warning
- [x] **ACORP-02**: ABM/ADE token guide covers iOS token setup with cross-reference to macOS ABM guide for shared portal steps
- [x] **ACORP-03**: ADE enrollment profile guide covers supervised mode, authentication methods, Setup Assistant customization, and locked enrollment with supervised-only callout pattern

### Admin Setup — Configuration

- [x] **ACFG-01**: Configuration profiles guide covers Wi-Fi, VPN, email, device restrictions, certificates, home screen layout with supervised-only callouts per setting
- [x] **ACFG-02**: App deployment guide covers VPP device-licensed vs user-licensed, silent install (supervised-only), LOB apps, and managed app status
- [x] **ACFG-03**: Compliance policy guide covers OS version gates, jailbreak detection, passcode, Conditional Access timing, and default compliance behavior

### Admin Setup — BYOD & MAM

- [x] **ABYOD-01**: Device enrollment guide covers Company Portal and web-based enrollment for personal/corporate devices without ABM
- [x] **ABYOD-02**: User enrollment guide covers account-driven enrollment (BYOD privacy-preserving) with explicit limitation callouts on what IT cannot see or do
- [x] **ABYOD-03**: App protection policies guide covers MAM-WE three-level data protection framework, targeting (enrolled vs unenrolled), iOS-specific behaviors, and selective wipe

### L1 Troubleshooting

- [x] **L1TS-01**: iOS triage decision tree routes L1 agents through enrollment, compliance, and app deployment failures
- [x] **L1TS-02**: L1 runbooks cover top 6 iOS failure scenarios (APNs expired, ADE not starting, enrollment restriction blocking, license invalid, device cap reached, compliance blocked)

### L2 Investigation

- [x] **L2TS-01**: iOS log collection runbook covers Company Portal log upload, MDM diagnostic report, and Mac+cable sysdiagnose procedure
- [x] **L2TS-02**: L2 investigation runbooks cover ADE token/profile delivery, app install failures, and compliance/CA timing issues

### Navigation & References

- [x] **NAV-01**: iOS glossary additions extend existing glossary with supervision, MAM, user enrollment, APNs, and iOS-specific terms
- [x] **NAV-02**: Platform selector, index.md, common-issues.md, and quick-ref cards updated with iOS/iPadOS sections
- [x] **NAV-03**: iOS capability matrix documents feature parity gaps across iOS vs macOS vs Windows

## Future Requirements

Deferred to future release. Tracked but not in current roadmap.

### Shared iPad

- **SIPAD-01**: Shared iPad deep-dive covering multi-user partitions, Managed Apple ID requirements, and iPadOS-only constraints

### Additional Troubleshooting

- **ADDTS-01**: iOS MAM-specific L1/L2 troubleshooting runbooks (selective wipe failures, PIN loop, app protection not applying)
- **ADDTS-02**: L2 runbook for ADE token delivery deep-dive (Graph API token GUID extraction)

### Other Platforms

- **PLAT-01**: Android enrollment and MAM documentation
- **PLAT-02**: Apple School Manager (ASM) parallel coverage
- **PLAT-03**: Apple Configurator 2 detailed guide

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| iOS vs iPadOS separate guides | Differences are minimal (Shared iPad is iPadOS-only); inline callouts sufficient |
| Apple Configurator 2 deep-dive | Niche recovery/lab path; one-paragraph callout in ADE guide sufficient |
| Apple School Manager parallel guides | Functionally identical to ABM for MDM; acknowledge in ABM guide |
| iOS monitoring and operations guide | Existing deployment-reporting.md and drift-detection.md cover patterns generically |
| Android MAM documentation | Different policy set and SDK behavior; separate future milestone |
| Screenshot-heavy portal walkthroughs | Portal UI changes frequently; document concepts and outcomes, not click paths |
| Linux device enrollment | Intune Linux support is limited |
| ChromeOS management | Different management platform (Google Admin) |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| LIFE-01 | Phase 26 | Complete |
| LIFE-02 | Phase 26 | Complete |
| ACORP-01 | Phase 27 | Complete |
| ACORP-02 | Phase 27 | Complete |
| ACORP-03 | Phase 27 | Complete |
| ACFG-01 | Phase 28 | Complete |
| ACFG-02 | Phase 28 | Complete |
| ACFG-03 | Phase 28 | Complete |
| ABYOD-01 | Phase 29 | Complete |
| ABYOD-02 | Phase 29 | Complete |
| ABYOD-03 | Phase 29 | Complete |
| L1TS-01 | Phase 33 (gap closure) | Complete |
| L1TS-02 | Phase 33 (gap closure) | Complete |
| L2TS-01 | Phase 31 | Complete |
| L2TS-02 | Phase 31 | Complete |
| NAV-01 | Phase 32 | Complete |
| NAV-02 | Phase 32 | Complete |
| NAV-03 | Phase 32 | Complete |

**Coverage:**
- v1.3 requirements: 18 total
- Mapped to phases: 18
- Unmapped: 0
- Complete: 18

---
*Requirements defined: 2026-04-16*
*Last updated: 2026-04-18 — Phase 33 gap closure complete. L1TS-01/L1TS-02 SATISFIED via Phase 30 verification (30-VERIFICATION.md). Integration caveats I-1 (01-ade-lifecycle.md:364 anchor drift) and I-2 (71 admin-setup-ios placeholders) closed by Phase 33 Plans 33-01 and 33-02 respectively. v1.3 milestone: 18/18 requirements complete.*
