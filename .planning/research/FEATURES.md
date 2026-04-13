# Feature Research

**Domain:** Cross-Platform Provisioning Documentation -- macOS ABM/ADE + Windows Autopilot Operational Gaps
**Researched:** 2026-04-13
**Confidence:** HIGH (primary sources: Microsoft Learn official documentation for macOS ADE/Intune and Windows Autopilot, verified against Apple Business Manager docs and community sources)

---

## Feature Landscape

This research covers the v1.2 milestone scope exclusively. All v1.0/v1.1 features (lifecycle docs, error codes, L1/L2 runbooks, admin setup guides, APv2 coverage) are already shipped. Dependencies on existing docs are noted where relevant.

### Table Stakes (Users Expect These)

Features that any cross-platform provisioning documentation suite must include. Missing these means the macOS coverage feels like an afterthought and the Windows operational gaps leave teams stranded post-deployment.

#### A. macOS ABM/ADE Documentation

| Feature | Why Expected | Complexity | Dependencies on Existing Docs | Notes |
|---------|--------------|------------|-------------------------------|-------|
| macOS ADE lifecycle overview (end-to-end) | Teams need the same "happy path" mental model for macOS as they have for Windows Autopilot. Without this, no macOS troubleshooting is coherent. | MEDIUM | Parallels `docs/lifecycle/00-overview.md` structure. Cross-link from index.md. | Covers: ABM device assignment -> ADE token sync -> Setup Assistant -> Await Configuration -> Company Portal registration -> Desktop. Must distinguish "with user affinity" vs "without user affinity" flows. |
| macOS admin setup guide (ABM token, enrollment profile, Setup Assistant) | Admins configuring macOS ADE for the first time need step-by-step guidance with "what breaks" callouts matching the APv1/APv2 admin setup pattern. | HIGH | Parallels `docs/admin-setup-apv1/` and `docs/admin-setup-apv2/` structure. Must match per-setting callout format. | Key settings: MDM push certificate, ADE token creation, enrollment profile (user affinity, authentication method, Await Configuration, locked enrollment, Setup Assistant screen customization, local account configuration with LAPS). Each setting needs "what breaks if misconfigured" callout. |
| macOS app deployment guide (DMG, PKG, VPP) | App deployment on macOS through Intune is fundamentally different from Windows (no ESP, different app types). Teams need a reference. | MEDIUM | New content area. Cross-reference from macOS lifecycle "post-enrollment" section. | Three app types: PKG (signed, max 8GB, must install to /Applications), DMG (simpler but limited uninstall support), VPP/Apps and Books (silent install, no Apple ID required). Must cover detection rules, assignment types (required vs available), and Intune Management Agent behavior (8hr check-in cycle). |
| macOS compliance policy reference | Compliance policies are the gate for Conditional Access. Teams need to know every available setting and recommended baseline. | LOW | New content area. Cross-reference from macOS security section. | Categories: Device Health (SIP), Device Properties (OS version, build version), System Security (password requirements, encryption/FileVault, firewall, Gatekeeper), and the critical gap: no macOS Security Baselines exist in Intune (unlike Windows). |
| macOS L1 troubleshooting guide (enrollment failures) | L1 staff receive "my Mac won't enroll" calls and need a decision tree just like Windows Autopilot. | MEDIUM | Parallels `docs/decision-trees/` and `docs/l1-runbooks/` pattern. | Top failure scenarios: ABM token expired/not synced, enrollment profile not assigned, MDM push certificate expired, Setup Assistant hangs at "Await Configuration", Company Portal not installed or outdated for modern auth, device not wiped (ADE only triggers at Setup Assistant). |
| macOS L2 troubleshooting guide (log collection, profile delivery, management agent) | L2 needs macOS-specific log paths and diagnostic commands. Cannot reuse Windows knowledge. | MEDIUM | Parallels `docs/l2-runbooks/` pattern. | Key logs: IntuneMDMDaemon*.log, IntuneMDMAgent*.log (in /Library/Logs/Microsoft/Intune/), System Preferences > Profiles for MDM profile inspection. Shell scripts run max 60 minutes. Custom attributes check every 8 hours with no on-demand option. |

#### B. Windows Autopilot Operational Gaps

| Feature | Why Expected | Complexity | Dependencies on Existing Docs | Notes |
|---------|--------------|------------|-------------------------------|-------|
| Device lifecycle management (Reset, Retire, Wipe, Fresh Start, deregistration) | Existing docs end at "post-enrollment verification." Teams need to know how to re-provision, retire, and deregister devices. This is the #1 gap after initial deployment docs. | MEDIUM | Extends `docs/lifecycle/05-post-enrollment.md`. Links back to lifecycle overview. | Five distinct actions: Autopilot Reset (local + remote, preserves Entra/MDM, requires WinRE), Retire (removes company data only), Wipe (factory reset), Fresh Start (wipe + remove bloatware), Deregister (remove from Autopilot service). Each has different data preservation, Entra ID impact, and re-enrollment behavior. |
| Infrastructure prerequisites deep-dive (network, Entra ID, licensing) | Current endpoints reference covers URLs but not firewall rule format, proxy auth, licensing matrix, or Entra ID configuration requirements. | MEDIUM | Extends `docs/reference/endpoints.md`. New licensing and Entra prereqs sections. | Must cover: full URL/IP/port matrix, proxy authentication requirements (Autopilot does not support authenticated proxies well), DNS resolution requirements, licensing matrix (M365 E3/E5/F1/F3/Business Premium, Entra P1/P2, Intune), Entra ID configuration (MDM authority, enrollment restrictions, device settings). |
| App deployment + ESP integration guide | ESP failures from app conflicts are the #1 support call. Existing ESP troubleshooting covers diagnosis but not prevention through proper app packaging strategy. | HIGH | Extends `docs/lifecycle/04-esp.md` and `docs/l2-runbooks/02-esp-deep-dive.md`. | Key content: Win32 app packaging best practices (use Win32 exclusively, not MSI), install order control (blocking apps, "Selected" not "All"), timeout tuning (ESP timeout must exceed individual app timeout), app count limits (APv1 guidance: 5 or fewer required apps; APv2 allows up to 10), LOB vs Win32 conflict avoidance, post-ESP app deployment strategy. |
| Security and compliance during enrollment | Conditional Access + compliance timing during Autopilot is a known pain point. Teams need explicit guidance on what to exclude, when, and why. | HIGH | New content area. References existing policy conflict table in error codes. | Critical topics: CA exclusion for Microsoft Intune Enrollment app during registration, compliance grace period timing (device is non-compliant until enrollment completes), security baseline deployment timing (assign to device group, flows during ESP), quality update behavior during OOBE (new ESP setting for monthly security updates), FileVault/BitLocker timing. |
| Migration scenarios guide | Organizations transitioning from APv1 to APv2, from on-prem imaging to Autopilot, or from GPO to Intune need documented paths. MDT was retired January 2026. | HIGH | References `docs/apv1-vs-apv2.md` for framework comparison. New content area for migration procedures. | Three migration paths: (1) APv1-to-APv2 -- remove hardware hash requirement, use corporate identifiers, new policy structure, both run in tandem until unified; (2) On-prem imaging (MDT/SCCM) to Autopilot -- MDT retired Jan 2026, SCCM task sequence template for pre-provisioning, JSON config file differences between APv1/APv2; (3) GPO-to-Intune -- Group Policy Analytics tool in Intune (import XML, percentage-based mapping report, migrate supported settings to Settings Catalog). |
| Monitoring and operational readiness guide | Teams need to know how to monitor deployments at scale, detect registration drift, and handle new device batches. | MEDIUM | New content area. References existing deployment report content in `docs/l2-runbooks/08-apv2-deployment-report.md`. | Key content: Intune deployment status reporting (auto-fails after 4 hours), Enrollment Time Grouping failures report (GA, updates within 20 minutes), Endpoint Analytics for fleet-wide ESP timing insights, registration drift detection (devices in Autopilot but not enrolling), new-batch onboarding workflow (purchase order -> ABM/OEM upload -> profile assignment -> verification). |

#### C. Cross-Platform Navigation

| Feature | Why Expected | Complexity | Dependencies on Existing Docs | Notes |
|---------|--------------|------------|-------------------------------|-------|
| Restructured docs hub (Windows + macOS) | Current index.md is Windows-only. Adding macOS content without restructuring the hub makes it unfindable. | LOW | Modifies `docs/index.md`. Must preserve all existing Windows navigation. | Add macOS sections (L1, L2, Admin Setup) alongside Windows sections. Add platform indicator tags. Update glossary with macOS-specific terms (ADE, ABM, Setup Assistant, Await Configuration, FileVault, SIP, Gatekeeper, Platform SSO). |

---

### Differentiators (Competitive Advantage)

Features that make this documentation suite genuinely better than reading Microsoft Learn pages directly. These build on the tiered L1/L2/Admin pattern already validated in v1.0/v1.1.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Unified cross-platform provisioning vocabulary | Most orgs manage both Windows and macOS but use different terminology for equivalent concepts. A cross-platform glossary mapping (e.g., ESP <-> Await Configuration, Autopilot Profile <-> Enrollment Profile, Hardware Hash <-> ABM Serial) prevents confusion and enables cross-training. | LOW | Extend existing `_glossary.md` with macOS terms and add explicit "Windows equivalent" / "macOS equivalent" cross-references. |
| macOS "what breaks" callouts in admin setup | The APv1/APv2 admin setup guides' per-setting callouts were the most praised feature in v1.1. Replicating this pattern for macOS ADE settings (authentication method, Await Configuration, locked enrollment, LAPS) gives admins the same safety net. | MEDIUM | This is the proven differentiator. Microsoft Learn describes settings; our docs describe what breaks when each setting is wrong. |
| Side-by-side Windows/macOS provisioning comparison | Organizations with mixed fleets need a single reference comparing provisioning lifecycles, app deployment models, compliance capabilities, and troubleshooting approaches across platforms. No Microsoft doc provides this. | MEDIUM | Not a feature-by-feature comparison but a "what's the macOS equivalent of X" operational reference. Covers lifecycle stages, admin console paths, log locations, reset/wipe procedures. |
| Device lifecycle decision tree (Reset vs Retire vs Wipe vs Deregister) | Five different "remove/reset" actions confuse everyone. A decision tree with "What do you want to preserve?" branching is more useful than five separate pages. | LOW | Single decision tree document. L1 uses it to recommend the right action; L2 uses it to execute. Covers data preservation, Entra state, re-enrollment path for each action. |
| Migration readiness checklist (on-prem to cloud-native) | GPO-to-Intune migration is not a single step but a multi-week project. A phased checklist (audit GPOs -> run Policy Analytics -> migrate supported -> test -> cut over) is more actionable than Microsoft's tool documentation. | MEDIUM | Combines Group Policy Analytics tool usage, Settings Catalog migration, and validation steps into an operational checklist. Includes the 4MB file size limit for GPO XML export. |
| ESP app strategy planner | Instead of just troubleshooting ESP failures, provide a proactive planning reference: how many apps, which types, what timeout values, blocking vs non-blocking. Prevents the problem rather than diagnosing it. | MEDIUM | Builds on existing ESP troubleshooting. Adds: app count recommendation table (by scenario), timeout calculation guidance, blocking app selection criteria, post-ESP deployment pattern for non-critical apps. |
| Platform SSO setup guidance for macOS | Platform SSO (PSSO) is the macOS equivalent of Windows Hello for Business. It is new (macOS 13+), complex to configure, and critical for passwordless adoption. Most orgs skip it because setup documentation is fragmented across multiple Microsoft Learn pages. | MEDIUM | Consolidated setup guide covering: Secure Enclave key (recommended), smart card, and password authentication methods. Requires Company Portal 5.2404.0+, macOS 13+. Integration with Conditional Access and compliance. |
| Conditional Access enrollment timing guide | The interaction between CA policies, compliance evaluation, and enrollment timing is the most misunderstood area in Autopilot/ADE. A timing diagram showing "device is non-compliant from enrollment start until policy evaluation completes" with explicit "exclude these apps during this window" guidance prevents enrollment loops. | HIGH | Covers both Windows and macOS enrollment timing. Windows: exclude Microsoft Intune Enrollment from compliance CA. macOS: Company Portal must complete Entra registration before CA evaluates. Common mistake: requiring compliant device before device can become compliant. |

---

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| macOS shell script library | "Give us ready-to-deploy scripts for common macOS management tasks" | Shell scripts in docs become untested, unversioned artifacts. Microsoft maintains [shell-intune-samples](https://github.com/microsoft/shell-intune-samples) on GitHub which is actively maintained. Duplicating creates version drift. | Link to Microsoft's shell-intune-samples repo. Document how to deploy shell scripts via Intune (prerequisites, agent behavior, 60-second timeout, 8-hour check-in). Do not include scripts in docs. |
| Complete GPO-to-Intune mapping table | "Map every GPO setting to its Intune equivalent" | There are thousands of GPO settings. Most have no 1:1 Intune equivalent. A static mapping table is immediately outdated. Intune's Group Policy Analytics tool does this dynamically. | Document how to use Group Policy Analytics (export GPO as XML < 4MB, import, read percentage-based mapping report, migrate supported settings). The tool is the mapping table. |
| macOS Security Baselines documentation | "Document recommended security baseline for macOS in Intune like Windows baselines" | Microsoft does not provide macOS Security Baselines in Intune (unlike Windows). Creating our own baseline prescribes security policy, which is environment-specific and out of scope per project constraints. | Document the gap: "No macOS Security Baselines exist in Intune as of April 2026." Reference CIS macOS Benchmarks and NIST SP 800-219 as external sources teams can use to build their own compliance policies. Document available Intune compliance settings (SIP, FileVault, firewall, Gatekeeper, password) so teams can build from those. |
| Autopilot Reset automation scripts | "Auto-reset devices that fail enrollment" | Automated reset without human judgment causes re-enrollment loops, potential data loss, and masks root-cause issues. The existing remediation functions already require -WhatIf confirmation. | Document Autopilot Reset (local and remote) procedures for L2 with explicit pre-conditions: "Only reset after confirming the failure is not caused by a configuration error that will recur." |
| Exhaustive macOS version compatibility matrix | "List every macOS version and what Intune features it supports" | Apple deprecates rapidly. macOS 26 is already removing legacy MDM software update commands. A static matrix is outdated within one release cycle. | Document minimum supported versions for key features (ADE: macOS 10.9+, Platform SSO: macOS 13+, ACME certificates: macOS 13.1+, Await Configuration: macOS 10.11+, LAPS: macOS 12+) and link to Apple's deprecation schedule. |
| Tenant-specific ABM/Intune integration walkthrough | "Show our exact ABM portal and Intune admin center" | Same anti-feature as v1.0: environment-specific screenshots become stale. ABM and Intune admin center UIs change quarterly. | Use text-based procedures with UI element names. Reference Microsoft Learn screenshots by URL. Include "Customization Notes" sections where teams can insert their ABM organization name, MDM server name, and token renewal schedule. |

---

## Feature Dependencies

```
[macOS ADE Lifecycle Overview]
    +--requires--> [Cross-Platform Navigation Hub Update]
    +--requires--> [Glossary Update (macOS terms)]

[macOS Admin Setup Guide]
    +--requires--> [macOS ADE Lifecycle Overview] (admins need to understand the flow before configuring it)

[macOS App Deployment Guide]
    +--requires--> [macOS ADE Lifecycle Overview] (app deployment is post-enrollment)
    +--requires--> [macOS Admin Setup Guide] (VPP token setup is in admin guide)

[macOS Compliance/Security Guide]
    +--requires--> [macOS ADE Lifecycle Overview]
    +--enhances--> [macOS App Deployment Guide] (compliance gates app access)

[macOS L1 Troubleshooting]
    +--requires--> [macOS ADE Lifecycle Overview]
    +--requires--> [macOS Admin Setup Guide] (L1 must understand what was configured)

[macOS L2 Troubleshooting]
    +--requires--> [macOS L1 Troubleshooting] (L2 picks up where L1 escalates)
    +--requires--> [macOS App Deployment Guide] (app install failures need app knowledge)

[Device Lifecycle Management (Reset/Retire/Wipe)]
    +--requires--> [Existing lifecycle docs] (extends post-enrollment)
    +--enhances--> [Existing L2 runbooks] (links from remediation guidance)

[Infrastructure Prerequisites Deep-Dive]
    +--extends--> [Existing endpoints reference]
    +--enhances--> [Existing admin setup guides] (licensing prereqs)

[App Deployment + ESP Integration]
    +--extends--> [Existing ESP troubleshooting]
    +--enhances--> [Existing admin setup guides] (ESP configuration)

[Security/Compliance During Enrollment]
    +--requires--> [Infrastructure Prerequisites] (licensing, Entra config)
    +--enhances--> [Existing policy conflict table]
    +--enhances--> [macOS Compliance/Security Guide] (cross-platform CA guidance)

[Migration Scenarios]
    +--requires--> [Existing APv1 vs APv2 comparison]
    +--requires--> [Infrastructure Prerequisites] (migration needs prereqs documented)

[Monitoring/Operational Readiness]
    +--extends--> [Existing APv2 deployment report guide]
    +--enhances--> [Device Lifecycle Management] (monitoring feeds into lifecycle decisions)

[Cross-Platform Navigation Hub]
    +--modifies--> [Existing docs/index.md]
    +--requires--> [All macOS content] (cannot restructure hub without content to link)

[Platform SSO Guide] --conflicts--> [macOS Admin Setup Guide] (could be inline or standalone)
    Decision: Include as a section within macOS Admin Setup, not standalone.
    Rationale: Platform SSO is a configuration step, not a separate workflow.
```

### Dependency Notes

- **macOS ADE Lifecycle Overview is the foundation:** Every other macOS document depends on it. Must be written first. Parallels how the Windows lifecycle overview was the first v1.0 deliverable.
- **Cross-Platform Navigation Hub must be updated last:** It links to all new content. Cannot be finalized until all macOS and Windows operational docs exist. However, the hub structure should be designed first to ensure consistent naming.
- **Security/Compliance spans both platforms:** The Conditional Access enrollment timing guidance applies to both Windows Autopilot and macOS ADE. Write as a single cross-platform document rather than duplicating in both platform sections.
- **Migration Scenarios depend on Infrastructure Prerequisites:** You cannot document "migrate from GPO to Intune" without first documenting the Intune infrastructure requirements that must be in place before migration.
- **Platform SSO belongs inside Admin Setup, not standalone:** Including it as a separate document creates navigation confusion. It is a configuration step within the macOS provisioning setup flow, similar to how Windows Hello for Business would be referenced within Windows admin setup.

---

## MVP Definition

### Phase 1: macOS Foundation + Highest-Impact Windows Gaps

The minimum to make macOS documentation usable and close the most painful Windows gaps.

- [ ] **macOS ADE Lifecycle Overview** -- Foundation for all macOS docs. Without this, nothing else makes sense.
- [ ] **macOS Admin Setup Guide (ABM, enrollment profile, Setup Assistant)** -- Admins need to configure before anything else works.
- [ ] **Device Lifecycle Management (Reset/Retire/Wipe/Deregister)** -- The #1 Windows operational gap. Teams hit this daily.
- [ ] **Cross-Platform Glossary Update** -- Prerequisite for cross-platform comprehension. Low effort, high impact.

### Phase 2: macOS Operational Docs + Windows ESP/Infrastructure

- [ ] **macOS App Deployment Guide** -- Required before macOS L1/L2 troubleshooting can cover app failures.
- [ ] **macOS Compliance/Security Guide** -- Required before Conditional Access guidance makes sense.
- [ ] **Infrastructure Prerequisites Deep-Dive** -- Closes the "what do we need before Autopilot" gap.
- [ ] **App Deployment + ESP Integration Guide** -- Prevents the most common ESP failures proactively.

### Phase 3: Troubleshooting + Advanced Operational

- [ ] **macOS L1 Troubleshooting Guide** -- Requires lifecycle + admin setup + app deployment knowledge.
- [ ] **macOS L2 Troubleshooting Guide** -- Requires L1 guide as escalation foundation.
- [ ] **Security/Compliance During Enrollment (cross-platform)** -- Complex topic, requires both platforms' foundations.
- [ ] **Migration Scenarios Guide** -- Requires infrastructure prereqs. Teams rarely migrate urgently.

### Phase 4: Monitoring + Navigation + Differentiators

- [ ] **Monitoring/Operational Readiness Guide** -- Enhances operational maturity. Not blocking for daily work.
- [ ] **Cross-Platform Navigation Hub Restructure** -- Must be last, links to everything.
- [ ] **Side-by-Side Platform Comparison** -- Differentiator. Valuable but not blocking.
- [ ] **Platform SSO Guide (within Admin Setup)** -- Advanced topic. Not needed for initial macOS rollout.

### Future Consideration (v1.3+)

- [ ] **Interactive cross-platform decision trees** -- Requires frontend work (deferred per project constraints).
- [ ] **Automated compliance reporting dashboards** -- Tooling milestone, not documentation.
- [ ] **macOS shell script library** -- Link to Microsoft's repo instead. Not documentation scope.

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority | Platform |
|---------|------------|---------------------|----------|----------|
| macOS ADE Lifecycle Overview | HIGH | MEDIUM | P1 | macOS |
| macOS Admin Setup Guide | HIGH | HIGH | P1 | macOS |
| Device Lifecycle Management (Reset/Retire/Wipe) | HIGH | MEDIUM | P1 | Windows |
| Cross-Platform Glossary Update | MEDIUM | LOW | P1 | Both |
| macOS App Deployment Guide | HIGH | MEDIUM | P1 | macOS |
| macOS Compliance/Security Guide | HIGH | LOW | P1 | macOS |
| Infrastructure Prerequisites Deep-Dive | HIGH | MEDIUM | P1 | Windows |
| App Deployment + ESP Integration Guide | HIGH | HIGH | P1 | Windows |
| macOS L1 Troubleshooting Guide | HIGH | MEDIUM | P1 | macOS |
| macOS L2 Troubleshooting Guide | HIGH | MEDIUM | P1 | macOS |
| Security/Compliance During Enrollment | HIGH | HIGH | P1 | Both |
| Migration Scenarios Guide | MEDIUM | HIGH | P2 | Windows |
| Monitoring/Operational Readiness Guide | MEDIUM | MEDIUM | P2 | Windows |
| Cross-Platform Navigation Hub Restructure | HIGH | LOW | P1 | Both |
| Side-by-Side Platform Comparison | MEDIUM | MEDIUM | P2 | Both |
| Platform SSO Guide | MEDIUM | MEDIUM | P2 | macOS |
| Device Lifecycle Decision Tree | MEDIUM | LOW | P2 | Windows |
| ESP App Strategy Planner | MEDIUM | MEDIUM | P2 | Windows |
| Migration Readiness Checklist | MEDIUM | MEDIUM | P2 | Windows |
| CA Enrollment Timing Diagram | HIGH | HIGH | P2 | Both |

**Priority key:**
- P1: Must have for v1.2 -- required for cross-platform coverage and closing critical Windows gaps
- P2: Should have -- improves operational maturity and differentiates the suite
- P3: Nice to have -- deferred to future milestone

---

## Detailed Feature Specifications

### macOS ADE Lifecycle (Key Content Areas)

The macOS provisioning lifecycle has seven stages (vs five for Windows Autopilot):

1. **ABM Device Registration** -- Device purchased through Apple channel or manually added via serial/order number. Assigned to MDM server (Intune) in ABM portal.
2. **ADE Token Sync** -- Intune syncs with ABM every 24 hours (manual sync available, rate-limited to every 15 minutes). Full sync max once per 7 days. Devices appear in Intune with serial numbers.
3. **Enrollment Profile Assignment** -- Admin assigns macOS enrollment profile to device (or sets default profile). Profile defines: user affinity, authentication method, Await Configuration, locked enrollment, Setup Assistant screens.
4. **Setup Assistant** -- Device powers on, user connects to network, Setup Assistant runs. Customizable screens (22+ options from Location Services through Apple Intelligence). Authentication via modern auth (recommended) or legacy Setup Assistant.
5. **Await Configuration** -- If enabled (default for new profiles), device pauses after Setup Assistant while Intune deploys configuration profiles. Users see "Awaiting final configuration" screen. Most devices complete within 15 minutes. No enforced time limit.
6. **Company Portal Registration** -- For devices with user affinity using modern auth: user must sign into Company Portal to complete Entra registration, enable Conditional Access evaluation, and gain access to protected resources.
7. **Desktop + Ongoing Management** -- Device reaches desktop. Intune Management Agent checks in every 8 hours for policy/script updates. ACME certificates used for management profile (macOS 13.1+).

### macOS Admin Setup (Key Settings with "What Breaks" Pattern)

| Setting | Options | Recommended | What Breaks If Wrong |
|---------|---------|-------------|----------------------|
| User Affinity | With / Without | With (for personal devices) | Without: Company Portal does not work, user-targeted apps/policies do not apply, compliance evaluation not supported for userless macOS devices |
| Authentication Method | Setup Assistant with Modern Auth / Legacy | Modern Auth | Legacy: no Conditional Access evaluation, no Entra registration via Company Portal, ADFS WS-Trust 1.3 endpoint required |
| Await Configuration | Yes / No | Yes | No: user reaches desktop before policies install, security gap between enrollment and policy application, FileVault may not enable before user accesses device |
| Locked Enrollment | Yes / No | Yes (corporate) | No: user can remove MDM profile via System Preferences > Profiles, effectively unenrolling from management |
| MDM Push Certificate | Valid / Expired | Valid (renew annually) | Expired: ALL macOS/iOS enrollment fails across tenant, not just new devices |
| ADE Token | Valid / Expired | Valid (renew annually) | Expired: new device syncs fail, existing enrolled devices unaffected but new purchases do not appear |
| LAPS (Local Admin) | Configured / Not | Configured | Not configured: no centralized admin password management, local admin password unknown after provisioning |

### Windows Device Lifecycle Actions (Comparison Matrix)

| Action | Data Preserved | Entra State | MDM State | Re-enrollment | Use When |
|--------|---------------|-------------|-----------|---------------|----------|
| Autopilot Reset (Local) | Wi-Fi, provisioning packages, Entra membership, MDM enrollment, SCEP certs | Preserved | Preserved | Automatic (MDM sync) | Re-provisioning for next user on shared device |
| Autopilot Reset (Remote) | Same as local | Preserved (primary user cleared) | Preserved | Automatic | Remote re-provisioning, user does not need to be present |
| Retire | Personal data preserved | Removed from Intune view | Unenrolled | Manual re-enrollment | BYOD offboarding, keeping personal data |
| Wipe | Nothing preserved | Depends on settings | Removed | Full re-enrollment required | Device repurpose, security incident, RMA |
| Fresh Start | Optional user data retention | Preserved | Re-enrolls automatically | Automatic | Remove OEM bloatware, clean slate with enrollment preserved |
| Deregister | N/A (removes Autopilot record) | Unaffected | Unaffected | Must re-register hardware hash | Permanently removing device from Autopilot service |

### macOS Compliance Settings (Available in Intune)

| Category | Setting | Description | Notes |
|----------|---------|-------------|-------|
| Device Health | System Integrity Protection | Requires SIP enabled | macOS-specific, no Windows equivalent |
| Device Properties | Minimum/Maximum OS Version | Block devices below/above version | Same concept as Windows |
| Device Properties | Min/Max OS Build Version | Granular build-level control | Supports Apple Rapid Security Response versions |
| System Security | Password required | Require password to unlock | Standard |
| System Security | Simple passwords | Block simple passwords (1234, 1111) | |
| System Security | Min password length | Minimum characters | |
| System Security | Password type | Numeric or Alphanumeric | |
| System Security | Non-alphanumeric characters | Minimum special characters | |
| System Security | Inactivity before password | Lock timeout | |
| System Security | Password expiration | Days until forced change | Change only takes effect at next password change |
| System Security | Previous passwords reuse | History count | |
| Encryption | Data storage encryption | Requires FileVault | macOS equivalent of BitLocker |
| Device Security | Firewall | Enable/disable macOS firewall | |
| Device Security | Incoming connections | Block all except required services | |
| Device Security | Stealth mode | Prevent response to probing | |
| Device Security | Gatekeeper | App source restrictions | Mac App Store only, or Mac App Store + identified developers, or Anywhere |

**Critical gap:** No macOS Security Baselines in Intune. Organizations must build compliance policies manually using the settings above, referencing CIS macOS Benchmarks or NIST guidance externally.

---

## Document Type Reference (v1.2 Additions)

| Document Type | Audience | Format | Platform | Purpose |
|---------------|----------|--------|----------|---------|
| Lifecycle Overview | L1 + L2 + Admin | Prose + numbered steps + diagram | macOS | macOS ADE happy path reference |
| Admin Setup Guide | Admin | Step-by-step + per-setting callout tables | macOS | macOS configuration in ABM + Intune |
| App Deployment Guide | Admin + L2 | Reference tables + procedures | macOS | PKG/DMG/VPP deployment through Intune |
| Compliance Reference | Admin | Setting tables + recommendations | macOS | Available compliance settings and gap documentation |
| L1 Decision Tree | L1 | Markdown flowchart | macOS | macOS enrollment failure triage |
| L2 Investigation Guide | L2 | Prose + commands + log paths | macOS | macOS log collection and diagnosis |
| Device Lifecycle Guide | L1 + L2 | Decision tree + action comparison table | Windows | Reset vs Retire vs Wipe vs Deregister |
| Infrastructure Guide | Admin + L2 | Reference tables + checklists | Windows | Network, licensing, Entra prereqs |
| ESP App Strategy Guide | Admin | Planning tables + best practices | Windows | Proactive ESP failure prevention |
| Enrollment Security Guide | Admin + L2 | Timing diagrams + CA configuration | Both | Conditional Access and compliance during enrollment |
| Migration Guide | Admin + L2 | Checklists + procedures | Windows | APv1->APv2, GPO->Intune, imaging->Autopilot |
| Monitoring Guide | Admin | Reporting reference + procedures | Windows | Deployment reporting, drift detection, batch workflow |
| Platform Comparison | All | Side-by-side tables | Both | Windows/macOS provisioning equivalences |

---

## Sources

### macOS ADE/Intune (HIGH Confidence)
- [Set up automated device enrollment for macOS -- Microsoft Learn](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-enrollment-program-enroll-macos) -- Updated 2026-04-09. Primary source for ADE lifecycle, enrollment profile settings, Setup Assistant screens.
- [macOS device enrollment guide -- Microsoft Learn](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-enrollment-macos) -- Enrollment method comparison and recommendations.
- [macOS compliance settings -- Microsoft Learn](https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-mac-os) -- Updated 2025-10-10. Complete compliance setting reference.
- [Configure Platform SSO for macOS -- Microsoft Learn](https://learn.microsoft.com/en-us/intune/intune-service/configuration/platform-sso-macos) -- Platform SSO configuration via Settings Catalog.
- [Apple ADE devices don't auto-enroll -- Microsoft Learn](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-enrollment/apple-dep-device-fails-auto-enrollment) -- ADE enrollment failure troubleshooting.
- [Understanding macOS application types -- Microsoft Community Hub](https://techcommunity.microsoft.com/blog/intunecustomersuccess/understanding-application-types-in-microsoft-intune-for-macos/4373987) -- PKG, DMG, VPP app type comparison.
- [New ADE enrollment policies experience -- Microsoft Community Hub](https://techcommunity.microsoft.com/blog/intunecustomersuccess/new-iosipados-and-macos-ade-enrollment-policies-experience/4393531) -- 2025 ADE policy UI updates.
- [Troubleshooting Intune management agent on macOS -- Microsoft Community Hub](https://techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-troubleshooting-microsoft-intune-management-agent-on-macos/4431810) -- Agent logs and diagnostics.
- [Shell scripts on macOS -- Microsoft Learn](https://learn.microsoft.com/en-us/intune/intune-service/apps/macos-shell-scripts) -- Script deployment, 60-minute timeout, 8-hour check-in.

### Windows Autopilot Operational (HIGH Confidence)
- [Windows Autopilot Reset -- Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/windows-autopilot-reset) -- Updated 2026-04-07. Local/remote reset, WinRE requirement, data preservation details.
- [Windows Autopilot requirements -- Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/requirements) -- Infrastructure prerequisites, licensing, network.
- [Remote device action: Wipe -- Microsoft Learn](https://learn.microsoft.com/en-us/intune/intune-service/remote-actions/device-wipe) -- Wipe vs Retire vs Fresh Start comparison.
- [Group Policy Analytics -- Microsoft Learn](https://learn.microsoft.com/en-us/intune/intune-service/configuration/group-policy-analytics) -- GPO import, analysis, and migration to Settings Catalog.
- [APv2 reporting and monitoring -- Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/reporting-monitoring) -- Deployment status reporting.
- [Windows Autopilot device preparation requirements -- Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/requirements) -- APv2 prerequisites and app limits.

### Windows Autopilot Operational (MEDIUM Confidence -- Community)
- [Autopilot Reset vs Remote Wipe -- Patch My PC](https://patchmypc.com/blog/windows-autopilot-reset-vs-remote-wipe/) -- Practical comparison of reset actions.
- [Intune Remote Wipe/Reset/Fresh Start/Retire -- call4cloud.nl](https://call4cloud.nl/intune-remote-wipe-reset-fresh-start-retire/) -- Detailed action comparison with screenshots.
- [CA compliance exclusion during enrollment -- ctrlshiftenter.cloud](https://www.ctrlshiftenter.cloud/2025/10/12/should-you-exclude-microsoft-intune-enrollment-from-your-compliance-cap-or-not/) -- Conditional Access timing analysis.
- [Windows Autopilot best practices 2026 -- goworkwize.com](https://www.goworkwize.com/blog/windows-autopilot-best-practices) -- ESP app count, timeout tuning.
- [Offboarding devices from Intune/Entra/Autopilot -- Ugur Koc](https://ugurkoc.de/offboarding-devices-from-intune-azure-ad-and-autopilot/) -- Complete deregistration procedure.
- [Group Policy Analytics practical guide -- thedeploymentguy.co.uk](https://thedeploymentguy.co.uk/group-policy-analytics-intune-migration/) -- Step-by-step GPO migration walkthrough.
- [APv2 pre-provisioning -- oofhours.com](https://oofhours.com/2025/05/30/apv2-and-pre-provisioning-we-can-do-that-too/) -- APv2 pre-provisioning capability details.

### macOS Security (MEDIUM Confidence)
- [macOS security with Intune -- allthingscloud.blog](https://allthingscloud.blog/macos-security-with-intune-from-basics-to-bulletproof/) -- Comprehensive security configuration walkthrough.
- [Managing macOS security and compliance -- burgerhout.org](https://www.burgerhout.org/managing-macos-security-and-compliance-in-intune/) -- Compliance policy best practices.
- [macOS Zero Trust Assessment -- Microsoft](https://microsoft.github.io/zerotrustassessment/docs/workshop-guidance/devices/RMD_macOS_02_%20Apple%20Business%20Manager) -- ABM/ASM guidance within Zero Trust framework.

---

*Feature research for: Cross-Platform Provisioning Documentation -- macOS ABM/ADE + Windows Autopilot Operational Gaps*
*Researched: 2026-04-13*
