# Stack Research

**Domain:** Cross-platform provisioning documentation (Windows Autopilot + macOS ADE/ABM via Intune) -- extending existing Markdown-first, multi-tier documentation suite
**Researched:** 2026-04-13
**Confidence:** HIGH (reference sources, structural patterns); MEDIUM (macOS-specific troubleshooting depth)

## Scope

This stack research covers ONLY what is new or changed for v1.2. The existing documentation tooling stack (Markdown/CommonMark, Mermaid, MkDocs Material, Pandoc, markdownlint-cli2) is validated and unchanged. See prior STACK.md (2026-03-10) for those decisions.

v1.2 "stack" is primarily about **reference sources**, **documentation structural patterns**, and **templates** -- not new software dependencies.

---

## Reference Source Stack

Authoritative sources needed to write accurate documentation for v1.2 features. Organized by content area.

### macOS ABM/ADE through Intune

| Source | URL | Content Covered | Confidence |
|--------|-----|-----------------|------------|
| Microsoft Learn: macOS ADE setup | https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-enrollment-program-enroll-macos | ADE token creation, enrollment profile, Setup Assistant screens, sync, distribution | HIGH |
| Microsoft Learn: macOS enrollment guide | https://learn.microsoft.com/en-us/intune/device-enrollment/apple/guide-macos | Enrollment method comparison (BYOD vs ADE vs Direct), admin/user task breakdowns | HIGH |
| Microsoft Learn: macOS deployment guide | https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-platform-macos | Full macOS management lifecycle (enrollment, compliance, config profiles, apps, remote actions) | HIGH |
| Microsoft Learn: macOS compliance settings | https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-mac-os | Compliance policy categories (health, properties, system security), FileVault, firewall, Gatekeeper | HIGH |
| Microsoft Learn: Platform SSO for macOS | https://learn.microsoft.com/en-us/intune/intune-service/configuration/platform-sso-macos | Settings catalog PSSO configuration, authentication methods, Entra ID integration | HIGH |
| Microsoft Learn: macOS unmanaged PKG apps | https://learn.microsoft.com/en-us/intune/intune-service/apps/macos-unmanaged-pkg | PKG deployment, size limits (2 GB), code signing requirements | HIGH |
| Apple: Use products on enterprise networks | https://support.apple.com/en-us/101555 | Network endpoints/ports required for ABM, ADE, MDM enrollment, APNs | HIGH |
| Apple: ABM requirements | https://support.apple.com/guide/apple-business-manager/axm6d9dc7acf/web | ABM program requirements, verification, Apple ID management | HIGH |
| Apple: Automated Device Enrollment | https://support.apple.com/en-us/102300 | Apple-side ADE concepts, device assignment, supervision | HIGH |
| Apple: Setup Assistant management | https://support.apple.com/en-mide/guide/deployment/depdeff4a547/web | Setup Assistant screen behavior, skip keys reference | HIGH |
| Microsoft Tech Community: macOS app types | https://techcommunity.microsoft.com/blog/intunecustomersuccess/understanding-application-types-in-microsoft-intune-for-macos/4373987 | DMG vs PKG vs VPP/Apps and Books comparison | MEDIUM |
| IntuneMacAdmins community | https://www.intunemacadmins.com/ | Community guides, scripts, troubleshooting patterns for macOS Intune | MEDIUM |
| IntuneBrew documentation | https://docs.intunebrew.com/ | App packaging best practices, common deployment issues | MEDIUM |

### macOS Troubleshooting (L1/L2)

| Source | URL | Content Covered | Confidence |
|--------|-----|-----------------|------------|
| Microsoft Learn: Troubleshoot enrollment | https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-enrollment/troubleshoot-device-enrollment-in-intune | Cross-platform enrollment troubleshooting, macOS-specific sections | HIGH |
| Microsoft Tech Community: macOS agent troubleshooting | https://techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-troubleshooting-microsoft-intune-management-agent-on-macos/4431810 | IME agent logs, daemon logs, diagnostic commands | HIGH |
| GitHub: IntuneMacODC tool | https://github.com/markstan/IntuneMacODC | Official Microsoft log collection tool for macOS Intune troubleshooting | HIGH |
| IntuneBrew: macOS app deployment troubleshooting | https://docs.intunebrew.com/docs/Troubleshooting-Common-macOS-App-Deployment-Issues-in-Intune | Common app deployment failures, IME log analysis | MEDIUM |

### Windows Autopilot Operational Gaps

| Source | URL | Content Covered | Confidence |
|--------|-----|-----------------|------------|
| Microsoft Learn: Autopilot Reset | https://learn.microsoft.com/en-us/autopilot/windows-autopilot-reset | Local vs remote reset, data preservation, WinRE requirement, troubleshooting | HIGH |
| Microsoft Learn: Autopilot Reset overview (tutorial) | https://learn.microsoft.com/en-us/autopilot/tutorial/reset/autopilot-reset-overview | Step-by-step reset tutorials (local and remote) | HIGH |
| Microsoft Learn: What's new in Autopilot | https://learn.microsoft.com/en-us/autopilot/whats-new | Recent changes: Jan 2026 quality update ESP setting, pre-provisioning behavior changes | HIGH |
| Microsoft Learn: GPO migration to Intune | https://learn.microsoft.com/en-us/intune/intune-service/configuration/group-policy-analytics-migrate | Group Policy Analytics import, analysis, and migration to Settings Catalog | HIGH |
| Microsoft Learn: Intune reports | https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/reports | Deployment reporting, enrollment time grouping failures report, monitoring capabilities | HIGH |
| Microsoft Learn: APv2 reporting | https://learn.microsoft.com/en-us/autopilot/device-preparation/reporting-monitoring | APv2-specific deployment report, status tracking | HIGH |
| Call4Cloud: Autopilot app install delay | https://call4cloud.nl/autopilot-delay-apps-installation/ | ESP app install ordering, post-ESP installation patterns | MEDIUM |
| Call4Cloud: ESP stuck on identifying apps | https://call4cloud.nl/autopilot-stuck-on-identifying-apps-esp/ | ESP timeout troubleshooting, Win32 app detection issues | MEDIUM |
| oofhours.com: APv2 developments | https://oofhours.com/2025/05/30/speaking-of-apv2/ | APv2 adoption status, HAADJ support, pre-provisioning in APv2 | MEDIUM |
| Patch My PC: Required app 60-minute wait | https://patchmypc.com/blog/why-do-required-apps-wait-60-minutes-after-autopilot-enrollment/ | Win32 app check-in timing (3,600,000 ms hardcoded), ESP behavior | MEDIUM |
| ctrlshiftenter.cloud: CA and enrollment | https://www.ctrlshiftenter.cloud/2025/10/12/should-you-exclude-microsoft-intune-enrollment-from-your-compliance-cap-or-not/ | Conditional Access policy exclusions during Intune enrollment | MEDIUM |

---

## Documentation Structure Additions

### New Directory Structure

The existing `docs/` tree needs these additions for v1.2:

```
docs/
  macos/                          # NEW: macOS platform root
    00-overview.md                 # macOS provisioning overview (ADE lifecycle, enrollment methods)
    admin-setup/                   # NEW: macOS admin setup guides
      00-overview.md               # Prerequisites, ABM setup, MDM push cert
      01-abm-enrollment-token.md   # ABM token + MDM server creation
      02-enrollment-profile.md     # ADE enrollment profile config
      03-configuration-profiles.md # Settings catalog, custom profiles, PSSO
      04-app-deployment.md         # PKG, DMG, VPP/Apps and Books
      05-compliance-security.md    # Compliance policies, FileVault, firewall, Gatekeeper
    l1-runbooks/                   # NEW: macOS L1 troubleshooting
      00-index.md                  # macOS L1 runbook index
      01-enrollment-failure.md     # Profile installation failed, MDM push cert expired
      02-app-not-installed.md      # App deployment failures (PKG/DMG/VPP)
      03-compliance-not-met.md     # Device marked noncompliant
    l2-runbooks/                   # NEW: macOS L2 troubleshooting
      00-index.md                  # macOS L2 runbook index
      01-log-collection.md         # IntuneMacODC, Company Portal logs, Terminal commands
      02-enrollment-investigation.md  # MDM profile delivery, ADE sync issues
      03-app-deployment-debug.md   # IME logs, PKG install failures, VPP sync
    reference/                     # NEW: macOS reference
      log-paths.md                 # macOS Intune log file locations
      network-endpoints.md         # Apple + Microsoft network requirements for macOS
      terminal-commands.md         # Diagnostic terminal commands for L2
  lifecycle/                       # EXISTING: add lifecycle gap content
    05-reset-reprovisioning.md     # NEW: Autopilot Reset (local + remote), re-provisioning
    06-retirement-migration.md     # NEW: Device retirement, tenant migration
  operations/                      # NEW: Operational readiness content
    infrastructure-prereqs.md      # Network/firewall rules, Entra ID prereqs, licensing matrix
    app-deployment-esp.md          # Win32 packaging for ESP, install order, timeout tuning
    security-compliance.md         # Conditional Access, baselines, compliance timing during enrollment
    migration-scenarios.md         # APv1-to-APv2, imaging-to-Autopilot, GPO-to-Intune mapping
    monitoring-reporting.md        # Deployment reports, registration drift, new-batch workflow
  index.md                         # MODIFIED: Add macOS sections, cross-platform navigation
  _glossary.md                     # MODIFIED: Add macOS terms (ABM, ADE, PSSO, VPP, etc.)
  _templates/                      # MODIFIED: Add macOS template variant
    admin-template-macos.md        # NEW: macOS admin template (Apple portal paths, not Intune-only)
```

### Frontmatter Changes

The existing `applies_to` field uses values: `APv1`, `APv2`, `both`. For cross-platform support, extend to include:

| Value | Meaning |
|-------|---------|
| `APv1` | Windows Autopilot v1 (classic) only |
| `APv2` | Windows Autopilot Device Preparation only |
| `both` | Both Windows APv1 and APv2 |
| `macOS` | macOS ADE/ABM through Intune only |
| `all` | All platforms (Windows + macOS) -- use for shared concepts |

Add a new `platform` field to disambiguate operating system from provisioning framework:

```yaml
---
last_verified: 2026-04-15
review_by: 2026-07-14
applies_to: macOS
platform: macOS
audience: admin
---
```

**Rationale:** `applies_to: both` currently means "both APv1 and APv2" (both Windows). Adding `platform` prevents ambiguity when `applies_to: both` might be misread as "both platforms." Existing Windows docs do NOT need retroactive changes -- `platform` defaults to `windows` when absent.

### Template: macOS Admin Guide

A macOS-specific admin template is needed because:

1. Portal paths differ: macOS admin guides reference **both** Apple Business Manager portal AND Intune admin center (Windows guides reference only Intune).
2. "What breaks" callouts need macOS-specific symptoms (e.g., "Profile installation failed" vs Windows ESP errors).
3. Setup Assistant screen configuration replaces ESP configuration in macOS context.
4. No pre-provisioning concept exists in macOS ADE -- the deployment is always user-initiated or zero-touch to Setup Assistant.

The template should extend the existing admin-template.md pattern, adding:
- Dual portal navigation (ABM + Intune)
- Apple-specific prerequisite callouts (Apple MDM push certificate, enrollment token renewal)
- macOS Setup Assistant screen configuration section

### Template: macOS L1 Runbook

Adapt existing L1 template with these macOS-specific constraints:
- No PowerShell commands (macOS uses Terminal)
- L1 macOS troubleshooting is portal-based (Intune admin center device view, Company Portal status)
- Escalation criteria reference macOS-specific signals (MDM profile status in System Settings, Company Portal diagnostic report)

### Template: macOS L2 Runbook

Adapt existing L2 template with:
- Terminal commands instead of PowerShell
- macOS log paths (~/Library/Logs/Microsoft/Intune/, /Library/Logs/Microsoft/Intune/)
- Reference to IntuneMacODC tool instead of mdmdiagnosticstool.exe
- Apple System Profiler references for hardware/enrollment verification

---

## Glossary Additions

New terms needed in `_glossary.md` for v1.2:

| Term | Definition Context |
|------|-------------------|
| ABM (Apple Business Manager) | Apple's portal for purchasing, managing, and assigning devices to MDM |
| ADE (Automated Device Enrollment) | Apple's zero-touch enrollment mechanism (formerly DEP) |
| DEP (Device Enrollment Program) | Deprecated name for ADE; redirect to ADE |
| Apple MDM Push Certificate | Required certificate for any Apple device management through Intune |
| Enrollment Program Token | Token (.p7m) connecting Intune to ABM/ASM for device sync |
| Setup Assistant | macOS first-run experience (equivalent context to Windows OOBE) |
| VPP (Volume Purchase Program) | Apple's app licensing mechanism via ABM/ASM (now "Apps and Books") |
| Apps and Books | Current name for VPP in Apple Business Manager |
| PSSO (Platform SSO) | macOS single sign-on using Entra ID via Secure Enclave |
| FileVault | macOS full-disk encryption (equivalent context to BitLocker) |
| Gatekeeper | macOS app execution policy (controls which apps can run) |
| Supervision | Apple device management mode enabling full MDM control |
| User Affinity | Device-to-user association during enrollment |
| Company Portal (macOS) | Intune management app for macOS (not in App Store; manual install or admin-deployed) |
| IntuneMacODC | Microsoft's macOS diagnostic log collection tool |
| IME (Intune Management Extension) | Agent handling Win32/script deployment on Windows; also referenced for macOS app management |
| Autopilot Reset | Windows Autopilot device reset (local or remote) preserving Entra ID and MDM enrollment |
| Group Policy Analytics | Intune tool for analyzing GPO-to-Intune migration readiness |
| Settings Catalog | Intune's comprehensive configuration profile type (both Windows and macOS) |

---

## Cross-Platform Navigation Pattern

### Index.md Restructure

The current `docs/index.md` is organized by audience tier (L1/L2/Admin) with APv1/APv2 subsections. For v1.2, restructure to platform-first, then audience:

```markdown
# Provisioning Documentation

## Windows Autopilot
### Service Desk (L1) -- APv1
### Service Desk (L1) -- APv2
### Desktop Engineering (L2) -- APv1
### Desktop Engineering (L2) -- APv2
### Admin Setup
### Operations  <!-- NEW -->

## macOS Provisioning  <!-- NEW -->
### Service Desk (L1)
### Desktop Engineering (L2)
### Admin Setup

## Cross-Platform References  <!-- NEW: replaces current "Shared References" -->
### Glossary
### Error Codes (Windows)
### Lifecycle Overviews
### APv1 vs APv2 (Windows)
```

**Rationale:** Platform-first navigation prevents macOS users from wading through Windows-only content and vice versa. The existing audience-first pattern works within each platform section.

### Cross-Reference Pattern

Every macOS admin guide should include a "Windows equivalent" callout where applicable:

```markdown
> **Windows equivalent:** This macOS ADE enrollment profile is conceptually similar to
> a Windows Autopilot deployment profile. See [APv1 Deployment Profiles](../admin-setup-apv1/03-deployment-profiles.md).
```

Every Windows operational doc should note when macOS has a parallel concept:

```markdown
> **macOS parallel:** For macOS compliance policy setup, see [macOS Compliance & Security](../macos/admin-setup/05-compliance-security.md).
```

---

## What NOT to Add

| Avoid | Why | What to Do Instead |
|-------|-----|-------------------|
| Separate macOS glossary file | Fragments terminology; readers shouldn't need to check two glossaries | Add macOS terms to existing `_glossary.md` with `(macOS)` labels where platform-specific |
| macOS error code tables | macOS ADE enrollment doesn't have a standardized error code catalog like Windows Autopilot; failures are symptom-based | Use symptom-based L1 decision trees (same pattern as APv2 failure catalog) |
| Jamf/Kandji/Mosyle comparison docs | Out of scope; this suite covers Intune management only | Note in overview that docs assume Intune as the MDM; link to Microsoft's enrollment method comparison |
| iOS/iPadOS documentation | Different device form factor and enrollment patterns; would inflate scope significantly | Explicitly mark as out of scope; note that ADE concepts overlap but device-specific guides differ |
| macOS shell scripts in L1 runbooks | L1 audience is portal-only; Terminal commands violate L1 constraints | Keep Terminal commands in L2 runbooks only; L1 uses Intune portal and Company Portal actions |
| New software dependencies | The existing tooling stack (Markdown, Mermaid, MkDocs, markdownlint) handles macOS docs identically to Windows docs | No new tools needed; Mermaid decision trees work for macOS L1 triage too |
| Environment-specific ABM account details | Same constraint as Windows docs: generic guidance, teams customize locally | Document the process, not the specific tenant/ABM org values |

---

## Stack Patterns by Content Area

### For macOS admin setup guides:

- Use the macOS admin template (dual-portal paths: ABM + Intune)
- Include Apple MDM push certificate renewal as a prerequisite callout in every guide
- Reference Apple support articles for ABM-side steps; Intune docs for admin center steps
- Include Setup Assistant screen configuration table (show/hide options per macOS version)
- Mark enrollment token renewal (annual) as a "What breaks" callout

### For macOS L1 runbooks:

- Portal-only troubleshooting (Intune admin center device view, Company Portal status)
- Symptom-based triage (no error code tables -- macOS doesn't have standardized codes like Windows)
- Mermaid decision tree for initial triage (enrollment failed vs. app not installed vs. noncompliant)
- Escalation criteria: "If the MDM profile shows as not installed in System Settings > Privacy & Security > Profiles, escalate to L2"

### For macOS L2 runbooks:

- Terminal commands for log collection and diagnostics
- Key log paths documented in reference file
- IntuneMacODC as primary collection tool
- System Profiler (`system_profiler SPHardwareDataType`, `profiles show -type enrollment`) for device verification

### For Windows operational gaps:

- Use existing admin-template.md and l2-template.md (no new templates needed)
- Place lifecycle content (reset, retirement) in existing `docs/lifecycle/` directory
- Create new `docs/operations/` directory for infrastructure, ESP tuning, security, migration, monitoring
- Tag all new Windows docs with existing frontmatter conventions (applies_to: APv1/APv2/both)

### For cross-platform navigation:

- Update `index.md` to platform-first structure
- Add platform filter callout at top of index: "Choose your platform: [Windows Autopilot](#windows-autopilot) | [macOS Provisioning](#macos-provisioning)"
- Add macOS terms to `_glossary.md` with platform labels
- Add cross-reference callouts between platform equivalents

---

## Key Reference URLs by Feature

### Device Lifecycle (Windows gaps)

| Feature | Primary Source | Secondary Source |
|---------|---------------|-----------------|
| Autopilot Reset (local) | https://learn.microsoft.com/en-us/autopilot/tutorial/reset/local-autopilot-reset | https://learn.microsoft.com/en-us/autopilot/windows-autopilot-reset |
| Autopilot Reset (remote) | https://learn.microsoft.com/en-us/autopilot/tutorial/reset/remote-autopilot-reset | -- |
| Device retirement/wipe | https://whackasstech.com/microsoft/msintune/what-is-retire-wipe-delete-fresh-start-autopilot-reset-in-microsoft-intune/ | Microsoft Learn Intune device actions docs |
| Tenant migration | Community sources (MEDIUM confidence) | No single authoritative Microsoft doc exists |

### Infrastructure & ESP (Windows gaps)

| Feature | Primary Source | Secondary Source |
|---------|---------------|-----------------|
| ESP app install ordering | https://patchmypc.com/blog/why-do-required-apps-wait-60-minutes-after-autopilot-enrollment/ | https://call4cloud.nl/autopilot-stuck-on-identifying-apps-esp/ |
| Win32 app ESP timeout | Microsoft Learn ESP configuration reference | https://call4cloud.nl/autopilot-delay-apps-installation/ |
| Network/firewall requirements | Microsoft Learn Intune network endpoints | Apple support (101555) for macOS endpoints |
| Licensing matrix | Microsoft Learn Intune licensing docs | -- |

### Migration Scenarios (Windows gaps)

| Feature | Primary Source | Secondary Source |
|---------|---------------|-----------------|
| APv1 to APv2 | https://oofhours.com/2025/05/30/speaking-of-apv2/ | https://call4cloud.nl/autopilot-device-preparation-v2-apv2/ |
| GPO to Intune | https://learn.microsoft.com/en-us/intune/intune-service/configuration/group-policy-analytics-migrate | https://thedeploymentguy.co.uk/group-policy-analytics-intune-migration/ |
| MDT retirement | https://learn.microsoft.com/en-us/troubleshoot/mem/configmgr/mdt/mdt-retirement | -- |
| On-prem imaging to Autopilot | Community sources (MEDIUM confidence) | -- |

### Monitoring & Reporting (Windows gaps)

| Feature | Primary Source | Secondary Source |
|---------|---------------|-----------------|
| Autopilot deployment report | https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/reports | -- |
| APv2 deployment report | https://learn.microsoft.com/en-us/autopilot/device-preparation/reporting-monitoring | -- |
| ETG failures report | Intune admin center: Devices > Monitor > Enrollment time grouping failures | -- |

---

## Installation

No new software dependencies. The existing stack handles v1.2:

```bash
# No changes needed. Existing tools:
# - Markdown (source format)
# - Mermaid (diagrams, decision trees -- works for macOS triage trees too)
# - MkDocs Material (if building site)
# - markdownlint-cli2 (linting)
# - Pandoc (export)

# The only "installation" is creating the new directory structure:
mkdir -p docs/macos/admin-setup
mkdir -p docs/macos/l1-runbooks
mkdir -p docs/macos/l2-runbooks
mkdir -p docs/macos/reference
mkdir -p docs/operations
```

---

## Sources

- Microsoft Learn: macOS ADE setup (updated 2026-04-09) -- HIGH confidence, primary source for all macOS ADE admin guides
- Microsoft Learn: macOS enrollment guide (updated 2026-04-09) -- HIGH confidence, enrollment method comparison
- Microsoft Learn: macOS deployment guide (updated 2026-04-09) -- HIGH confidence, full macOS management lifecycle
- Microsoft Learn: Windows Autopilot Reset (updated 2026-04-07) -- HIGH confidence, local/remote reset procedures
- Microsoft Learn: GPO migration to Intune -- HIGH confidence, Group Policy Analytics workflow
- Microsoft Learn: Intune reports -- HIGH confidence, deployment reporting and monitoring
- Apple Support: Enterprise network requirements (https://support.apple.com/en-us/101555) -- HIGH confidence, network endpoints
- Apple Support: ABM requirements -- HIGH confidence, program prerequisites
- oofhours.com (Michael Niehaus) -- MEDIUM confidence, community expert on Autopilot internals
- call4cloud.nl (Rudy Ooms) -- MEDIUM confidence, community expert on Intune/Autopilot deep dives
- IntuneMacAdmins (https://www.intunemacadmins.com/) -- MEDIUM confidence, community-driven macOS Intune knowledge base
- IntuneBrew docs (https://docs.intunebrew.com/) -- MEDIUM confidence, macOS app packaging best practices
- Patch My PC blog -- MEDIUM confidence, Win32 app timing behavior verified against Microsoft docs

---
*Stack research for: v1.2 Cross-Platform Provisioning & Operational Gaps (macOS ABM/ADE + Windows operational documentation)*
*Researched: 2026-04-13*
