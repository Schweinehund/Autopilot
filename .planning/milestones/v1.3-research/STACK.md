# Stack Research

**Domain:** iOS/iPadOS provisioning and management documentation via Microsoft Intune — extending existing Markdown-first, multi-tier documentation suite (v1.3 milestone)
**Researched:** 2026-04-15
**Confidence:** HIGH (Microsoft Learn verified current as of 2026-04-14/15); MEDIUM (iOS-specific troubleshooting depth, community patterns)

## Scope

This STACK.md covers ONLY what is new or changed for v1.3. The existing documentation tooling stack (Markdown/CommonMark, Mermaid, MkDocs Material, Pandoc, markdownlint-cli2) is validated and unchanged. The existing document infrastructure (frontmatter, templates, tiered structure) requires only iOS-specific extensions, not replacement.

v1.3 "stack" is primarily about **iOS/iPadOS-specific reference sources**, **enrollment path architecture**, **supervision state as a documentation axis**, **iOS-unique concepts absent from macOS docs**, and **new directory/template patterns** needed to match existing macOS ADE coverage parity.

---

## What ABM Docs Already Cover (Do Not Duplicate)

The v1.2 macOS ABM documentation in `docs/admin-setup-macos/01-abm-configuration.md` covers:

- ABM MDM server creation (the token link between ABM and Intune)
- Downloading and uploading the .p7m server token to Intune
- Token renewal lifecycle (annual expiry, managed Apple ID requirement)
- ABM device assignment to MDM servers
- Apple MDM push certificate creation and renewal

**These ABM fundamentals are SHARED with iOS/iPadOS.** The same ABM portal, the same MDM server object, and the same enrollment token used for macOS ADE also applies to iOS/iPadOS ADE. The iOS/iPadOS admin setup guide for ADE should reference the existing macOS ABM setup guide for the ABM-side steps and focus only on iOS-specific enrollment profile configuration.

**What is NOT already documented (iOS-specific):**
- iOS/iPadOS ADE enrollment profile creation (supervised vs unsupervised, user affinity options, authentication method choice)
- iOS/iPadOS-specific Setup Assistant screen configuration
- Device enrollment with Company Portal (BYOD MDM path)
- Web-based device enrollment (iOS 15+)
- Account-driven user enrollment (iOS 13+, work partition model)
- MAM without enrollment (app protection policies, no MDM)
- Shared iPad enrollment (Managed Apple ID federation, iPadOS only)
- Apple Configurator enrollment path
- Supervised vs unsupervised capability matrix (iOS-specific; macOS is always supervised via ADE)
- VPP/ABM app deployment for iOS (device licensing vs user licensing distinction; macOS covered different app types)
- iOS app protection policy (MAM) settings
- iOS compliance policy settings
- iOS-specific remote actions (passcode reset, activation lock disable)
- iOS log collection tools (Company Portal diagnostic upload, sysdiagnose, Console app)

---

## iOS/iPadOS Enrollment Path Architecture

This is the foundational structure for all iOS/iPadOS documentation. Every doc topic maps to one or more of these paths.

### Enrollment Method Decision Matrix

| Method | Device Ownership | Supervision | MDM Scope | User Affinity | Primary Use Case |
|--------|-----------------|-------------|-----------|---------------|-----------------|
| ADE (via ABM/ASM) | Corporate | Always supervised | Full device | With or without | Corporate-issued iPhones/iPads at scale |
| Apple Configurator | Corporate | Supervised (Setup Assistant) or unsupervised (Direct) | Full device | With or without | Small batches, ABM not available, existing devices |
| Device Enrollment (Company Portal) | Personal or Corporate | Never supervised | Full device | Required | BYOD iPhones/iPads, managed enrollment |
| Web-Based Device Enrollment | Personal | Never supervised | Full device | Required | BYOD, iOS 15+, no Company Portal app needed |
| Account-Driven User Enrollment | Personal | Never supervised | Work partition only | Required (Managed Apple ID) | BYOD, privacy-preserving, iOS 13+ |
| MAM without Enrollment | Personal | Not applicable | Apps only | Required (app sign-in) | BYOD where full MDM is unwanted |

**Critical documentation axis:** Supervision state determines which configuration profile restrictions and remote actions are available. Every iOS admin guide must mark supervised-only settings with a `🔒 Supervised only` callout (matching the project's established callout pattern from PROJECT.md milestone context).

### Authentication Method Sub-Decision (ADE Only)

ADE enrollment profiles require choosing one authentication method. This determines the enrollment user experience and Entra ID registration behavior:

| Authentication Method | Entra Registration | MFA Support | Company Portal Required | Recommended |
|----------------------|-------------------|-------------|------------------------|-------------|
| Setup Assistant with modern authentication | Full (after CP sign-in) | Yes | Auto-installed (VPP) | YES — primary recommendation |
| Company Portal app | Full (on CP sign-in) | Yes | Required, installed before use | YES — when device must be locked until enrolled |
| Setup Assistant (legacy) | None (unless CP manually added) | No | Optional | NO — deprecated, no modern auth |

**Note for docs:** Q2 CY2026 infrastructure migration will reorganize authentication methods in the Intune admin center UI. Existing profiles are unaffected; new profile creation UI will change. Document the current UI while flagging the upcoming change.

---

## Supervision State as a Documentation Axis

Supervision is the single most important iOS/iPadOS management concept absent from macOS ADE (where all ADE-enrolled devices are always supervised). iOS documentation must address supervision explicitly throughout.

### How Supervision Is Established

- **ADE enrollment:** Check "Supervised" in the enrollment profile Device Management Settings — the **only** way to achieve supervision without a factory reset
- **Apple Configurator:** USB-connected to Mac running Apple Configurator 2 — **requires device wipe**
- **Retroactive supervision is impossible:** Enrolling an existing device via Device Enrollment or User Enrollment cannot add supervision without a wipe

### Supervised-Only Capabilities (Must Be Documented With 🔒 Callout)

**Configuration profile restrictions (supervised only):**
- Block App Store entirely / block individual app installs
- Kiosk/Single App Mode (ASAM — Autonomous Single App Mode)
- Block AirDrop, restrict Bluetooth configuration
- Prevent device name/wallpaper/notification modification
- Block VPN creation, block eSIM modification
- Defer software updates (OS update control via MDM)
- Block user-initiated factory reset ("Erase All Content and Settings")
- Block configuration profile removal
- Block specific built-in apps (Safari, iMessage, Camera, FaceTime, Podcasts, etc.)
- Silent app installation (no user Apple ID prompt for device-licensed VPP apps)
- Block removal of system apps
- Keyboard behavior: block dictation, QuickPath, autocorrect, spellcheck, predictive

**Remote actions (supervised only):**
- Disable Activation Lock (requires supervision at enrollment)
- Restart device remotely

**Software update control:**
- OS update scheduling/deferral only works on supervised devices (MDM-managed updates)
- Unsupervised: users control their own OS updates regardless of policy

### Unsupervised Managed Device Capabilities

Even without supervision, enrolled devices receive:
- Compliance policies (passcode, OS version, jailbreak detection, threat level)
- VPN profiles, Wi-Fi profiles, certificate profiles
- Email profiles
- App protection policies (MAM)
- Required and available app deployment (with user prompts)
- Remote lock, passcode reset/remove, wipe, retire

---

## Reference Source Stack

### iOS/iPadOS Enrollment

| Source | URL | Content Covered | Confidence |
|--------|-----|-----------------|------------|
| Microsoft Learn: iOS/iPadOS enrollment guide | https://learn.microsoft.com/en-us/intune/device-enrollment/apple/guide-ios-ipados | All enrollment method comparison tables, admin/user task breakdowns, authentication method decision guide | HIGH — updated 2026-04-14 |
| Microsoft Learn: ADE setup for iOS/iPadOS | https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-enrollment-program-enroll-ios | Full ADE enrollment profile creation, authentication method configuration, VPP Company Portal install, user affinity options | HIGH |
| Microsoft Learn: iOS/iPadOS deployment guide | https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-platform-ios-ipados | Full management lifecycle (enrollment, compliance, config, apps, remote actions, authentication) | HIGH — updated 2026-04-15 |
| Microsoft Learn: Account-driven user enrollment | https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-account-driven-user | Account-driven user enrollment setup, work partition model, Managed Apple ID requirement | HIGH |
| Microsoft Learn: Shared iPad setup | https://learn.microsoft.com/en-us/intune/device-enrollment/apple/shared-ipad | Shared iPad provisioning, Managed Apple ID federation with Entra ID, multi-user iPad configuration | HIGH |
| Microsoft Learn: Supervised mode | https://learn.microsoft.com/en-us/intune/device-enrollment/apple/enable-supervised-mode | How supervision is enabled at enrollment vs retroactively via Apple Configurator, identification | HIGH — updated 2026-04-14 |
| Microsoft Learn: Troubleshoot iOS enrollment errors | https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-enrollment/troubleshoot-ios-enrollment-errors | Error messages, MFA issues, license failures, profile installation failures, DeviceCapReached | HIGH — updated 2025-03-31 |
| Microsoft Learn: Device stuck in enrollment | https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-enrollment/device-stuck-in-enrollment | ADE device stuck at Setup Assistant, token expiry causes, resolution steps | HIGH |
| Microsoft Tech Community: New ADE enrollment policies experience | https://techcommunity.microsoft.com/blog/intunecustomersuccess/new-iosipados-and-macos-ade-enrollment-policies-experience/4393531 | Q2 CY2026 new ADE infrastructure: reorganized auth methods, no auto Company Portal, Apple-deprecated settings removed | MEDIUM — product blog |

### iOS/iPadOS Configuration Profiles

| Source | URL | Content Covered | Confidence |
|--------|-----|-----------------|------------|
| Microsoft Learn: iOS/iPadOS device restrictions | https://learn.microsoft.com/en-us/intune/intune-service/configuration/device-restrictions-apple | Full device restriction settings catalog — which are supervised-only vs all enrolled | HIGH |
| Microsoft Learn: iOS/iPadOS device features | https://learn.microsoft.com/en-us/intune/intune-service/configuration/device-features-apple | AirPrint, Home Screen layout, lock screen message, notification settings, Single Sign-on, web content filter | HIGH |
| Microsoft Learn: Wi-Fi settings iOS/iPadOS | https://learn.microsoft.com/en-us/intune/intune-service/configuration/wi-fi-settings-ios | Wi-Fi profile configuration, enterprise WPA2-Enterprise settings | HIGH |
| Microsoft Learn: Device profiles overview | https://learn.microsoft.com/en-us/intune/intune-service/configuration/device-profiles | All profile types available across platforms — confirms iOS/iPadOS supported profile types | HIGH |
| Microsoft Learn: Supervised device security configurations | https://learn.microsoft.com/en-us/intune/intune-service/protect/ios-ipados-supervised-device-security-configurations | Microsoft's recommended security baselines for supervised iOS/iPadOS (Zero Trust tiers: basic/enhanced/high security) | HIGH — updated 2025-09-04 |
| Microsoft Learn: Personal device security configurations | https://learn.microsoft.com/en-us/intune/intune-service/protect/ios-ipados-personal-device-security-configurations | Recommended security baselines for unsupervised/BYOD iOS/iPadOS | HIGH |

### iOS/iPadOS Compliance Policies

| Source | URL | Content Covered | Confidence |
|--------|-----|-----------------|------------|
| Microsoft Learn: iOS/iPadOS compliance settings | https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-ios-ipados-settings | All compliance categories: Email, Device Health (jailbreak, threat level), Device Properties (OS version/build), Microsoft Defender, System Security (password), restricted apps | HIGH — updated 2026-04-15 |
| Microsoft Learn: iOS/iPadOS compliance security configurations | https://learn.microsoft.com/en-us/intune/intune-service/protect/ios-ipados-device-compliance-security-configurations | Microsoft-recommended compliance configurations for corporate enrolled devices | HIGH |
| Microsoft Learn: Create compliance policy | https://learn.microsoft.com/en-us/intune/intune-service/protect/create-compliance-policy | Step-by-step compliance policy creation, platform selection, assignment | HIGH |

### iOS/iPadOS App Deployment

| Source | URL | Content Covered | Confidence |
|--------|-----|-----------------|------------|
| Microsoft Learn: Manage Apple VPP/ABM apps | https://learn.microsoft.com/en-us/intune/app-management/deployment/manage-vpp-apple | Location tokens (VPP), device vs user licensing, license migration rules, automatic updates, end-user prompts by scenario, iOS vs macOS license revocation differences | HIGH — updated 2026-04-14 |
| Microsoft Learn: Add iOS/iPadOS store apps | https://learn.microsoft.com/en-us/intune/intune-service/apps/store-app-ios | Adding App Store apps without VPP | HIGH |
| Microsoft Learn: Add iOS/iPadOS LOB apps | https://learn.microsoft.com/en-us/intune/intune-service/apps/lob-apps-ios | Line-of-business app (.ipa) deployment, provisioning profiles | HIGH |
| Microsoft Learn: App provisioning profiles | https://learn.microsoft.com/en-us/intune/app-management/deployment/manage-provisioning-profiles-ios | iOS app certificate expiry prevention via Intune provisioning profiles | HIGH |
| Microsoft Learn: iOS/iPadOS MAM app protection policy settings | https://learn.microsoft.com/en-us/intune/app-management/protection/ref-settings-ios | Full MAM policy settings: data protection (transfer, save-as, cut/copy/paste, encryption), functionality (notifications, web content, printing), access requirements (PIN, biometrics), conditional launch | HIGH — updated 2026-04-15 |
| Microsoft Learn: MAM without enrollment guide | https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-enrollment-mamwe | MAM-WE setup, broker app requirement (Authenticator for iOS), scope, limitations | HIGH |
| Microsoft Learn: App protection policy overview | https://learn.microsoft.com/en-us/intune/intune-service/apps/app-protection-policy | APP/MAM concepts, enrolled vs unenrolled device behavior, selective wipe | HIGH |

### iOS/iPadOS Diagnostics and Log Collection

| Source | URL | Content Covered | Confidence |
|--------|-----|-----------------|------------|
| Microsoft Learn: Collect logs from iOS (Company Portal) | https://learn.microsoft.com/en-us/intune/user-help/diagnostics/collect-logs-ios | User-initiated log collection via Company Portal shake gesture or More tab, incident ID generation, Authenticator log collection | HIGH |
| Microsoft Learn: Retrieve iOS app logs | https://learn.microsoft.com/en-us/intune/intune-service/user-help/retrieve-ios-app-logs | Console app (Mac + cable) log collection for deep app diagnostics | HIGH |
| Microsoft Learn: App protection policy logs | https://learn.microsoft.com/en-us/intune/app-management/protection/troubleshoot-protection-logs | MAM log collection via Microsoft Edge for iOS, reviewing protection policy application | HIGH |
| Microsoft Learn: Troubleshoot device enrollment | https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-enrollment/troubleshoot-device-enrollment-in-intune | Cross-platform enrollment troubleshooting, including iOS-specific sections | HIGH |

### Remote Actions (iOS/iPadOS)

| Source | URL | Content Covered | Confidence |
|--------|-----|-----------------|------------|
| Microsoft Learn: Remote device actions | https://learn.microsoft.com/en-us/intune/device-management/actions/ | Full remote actions reference: wipe, retire, remote lock, reset passcode, remove passcode, disable activation lock (supervised only), locate device | HIGH |
| Microsoft Learn: Reset passcode | https://learn.microsoft.com/en-us/intune/intune-service/remote-actions/device-passcode-reset | iOS passcode reset behavior (removes passcode; user sets new one) | HIGH |
| Microsoft Learn: Disable Activation Lock | https://learn.microsoft.com/en-us/intune/intune-service/remote-actions/device-activation-lock-disable | Supervised device only; bypass activation lock without touching device | HIGH |

---

## iOS-Specific Concepts That Need Documentation (Not in Existing Docs)

### 1. Supervision State (New Concept for iOS docs)

macOS ADE devices are always supervised — this distinction doesn't exist in existing docs. iOS requires explicit documentation:
- How supervision is set at enrollment (ADE checkbox)
- How to verify supervision state on-device (Settings banner)
- What capabilities are gated behind supervision
- What happens if a device is enrolled without supervision that later requires supervised features (answer: must wipe and re-enroll via ADE with supervised enabled)

### 2. MAM Without Enrollment (New Concept)

No equivalent exists in Windows or macOS documentation. MAM-WE is an iOS/iPadOS-specific enrollment path covering:
- App protection policies applied without MDM enrollment
- Microsoft Authenticator as required broker on iOS
- Which Microsoft apps support MAM SDK (Outlook, Teams, Edge, Office apps, OneDrive)
- Data protection settings (cut/copy/paste, save-as, backup block, transfer to other apps)
- Access requirements (PIN, biometrics, work account credentials)
- Conditional launch (jailbreak detection, OS version gate, offline grace period)
- Limitations: no LOB app support, no certificate-based Wi-Fi/VPN, no device compliance evaluation

### 3. Account-Driven User Enrollment (New Concept)

No equivalent in Windows or macOS:
- Work partition model (managed partition separate from personal)
- Managed Apple ID requirement (must have ABM with Entra federation or manually provisioned Managed Apple IDs)
- Limitations vs device enrollment: cannot switch back to device enrollment without unenroll+re-enroll; device-licensed VPP apps not supported
- Privacy implications: IT cannot see personal partition; admin cannot wipe personal data; user can wipe work partition

### 4. VPP/ABM App Licensing Modes (iOS-Specific Nuance)

macOS VPP docs focus on DMG/PKG vs VPP. iOS VPP adds a critical licensing dimension:

| License Type | iOS/iPadOS | Requires Apple Account | Silent Install (Supervised) |
|-------------|-----------|----------------------|---------------------------|
| Device-licensed | Supported | No | Yes (supervised, no prompt) |
| User-licensed | Supported | Yes (personal Apple Account) | No (user prompted) |
| User Enrollment | User-licensed only | Managed Apple Account | No |

**Key difference from macOS:** macOS VPP license revocation leaves app usable for 30 days. iOS VPP license revocation is immediate (app cannot be updated; stays installed until manually removed or Uninstall assignment is pushed).

### 5. Shared iPad (iPad-Only)

iPad-specific concept with no iPhone equivalent:
- Requires: supervised iPad, ADE enrollment without user affinity, Managed Apple ID federation in ABM/Entra
- Use case: shared devices (kiosks, frontline workers, education)
- Each user signs in with their Managed Apple ID; personal data cached per user
- Admin can configure storage quotas, maximum cached users, guest access
- Policy behavior: policies apply to device, not individual users

### 6. iOS Diagnostic Tools vs Windows/macOS Equivalents

| Platform | Primary Diagnostic Tool | What It Collects | How Triggered |
|----------|------------------------|-----------------|---------------|
| Windows | mdmdiagnosticstool.exe | MDM logs, event logs, registry state | Command line (admin) |
| macOS | IntuneMacODC | Intune agent logs, MDM profile state, app install logs | Script (L2) |
| iOS | Company Portal (shake/More tab) | Intune enrollment logs, app install logs, MDM command history | User action (shake or menu) |
| iOS (deep) | sysdiagnose + Console app (Mac+cable) | System-level MDM, SSO, network logs | Physical connection to Mac |
| iOS (MAM) | Microsoft Edge diagnostic upload | App protection policy logs, MAM SDK state | In-app action |

**Key difference:** iOS has NO equivalent to mdmdiagnosticstool.exe. L1 and L2 iOS troubleshooting relies on Company Portal log uploads, Intune portal device state, and portal-driven remote actions. Deep log collection (sysdiagnose) requires a Mac with a cable — a physical access requirement with no remote equivalent.

---

## Directory Structure Additions for v1.3

Extend the existing `docs/` tree to add iOS/iPadOS:

```
docs/
  ios/                                  # NEW: iOS/iPadOS platform root
    00-overview.md                      # iOS/iPadOS provisioning overview (enrollment paths, supervision explained)
    admin-setup/                        # NEW: iOS/iPadOS admin setup guides
      00-overview.md                    # Prerequisites, MDM push cert, ABM reference, supervision decision
      01-ade-enrollment-profile.md      # ADE enrollment profile (references macOS ABM setup; iOS-specific profile options)
      02-device-enrollment.md           # BYOD Device Enrollment (Company Portal, Web-based)
      03-user-enrollment.md             # Account-Driven User Enrollment (work partition, Managed Apple IDs)
      04-mam-without-enrollment.md      # MAM-WE setup (app protection policies, no MDM)
      05-configuration-profiles.md      # Config profile types, supervised-only callouts
      06-app-deployment.md              # VPP/ABM apps (device vs user licensing), LOB, store apps
      07-compliance-policy.md           # Compliance policy settings, jailbreak detection, OS version gates
      08-config-failures.md             # Admin misconfiguration consequences (mirrors macOS 06-config-failures.md)
    l1-runbooks/                        # NEW: iOS/iPadOS L1 troubleshooting
      00-index.md                       # iOS/iPadOS L1 runbook index + triage decision tree
      01-enrollment-failure.md          # ADE stuck at Setup Assistant, profile install failed
      02-app-not-installed.md           # VPP app not appearing, LOB install failure
      03-compliance-not-met.md          # Device marked noncompliant (passcode, jailbreak, OS version)
      04-mam-policy-not-applied.md      # App protection policy not applying (BYOD/MAM-WE scenario)
    l2-runbooks/                        # NEW: iOS/iPadOS L2 troubleshooting
      00-index.md                       # iOS/iPadOS L2 runbook index
      01-log-collection.md              # Company Portal logs, sysdiagnose, Console app, MAM Edge logs
      02-enrollment-investigation.md    # ADE token/profile sync, MDM profile delivery verification
      03-app-deployment-debug.md        # VPP sync, license assignment, LOB provisioning profile expiry
      04-supervision-verification.md    # Confirming supervision state, escalation for re-enrollment
    reference/                          # NEW: iOS/iPadOS reference
      enrollment-paths.md               # Matrix of all enrollment methods with decision guide
      supervision-capability-matrix.md  # Full supervised vs unsupervised feature comparison
      network-endpoints.md              # Apple + Microsoft network requirements for iOS/iPadOS
      mam-supported-apps.md             # Microsoft apps supporting Intune MAM SDK
```

---

## Frontmatter Extension for iOS/iPadOS

Extend existing `applies_to` and `platform` fields established in v1.2:

```yaml
---
last_verified: 2026-04-15
review_by: 2026-07-14
applies_to: iOS
platform: iOS
audience: admin
---
```

Add `iOS` as a valid value alongside existing `APv1`, `APv2`, `both`, `macOS`, `all`.

For content covering both iOS and iPadOS (which is most iOS/iPadOS content), `iOS` is the correct value — iPadOS is a fork of iOS and shares all Intune management behaviors documented here, with the Shared iPad feature being the only iPadOS-only exception.

For Shared iPad content specifically:
```yaml
applies_to: iPadOS
platform: iPadOS
```

---

## Template Additions for v1.3

### Template: iOS/iPadOS Admin Guide

Extend the existing macOS admin template pattern with iOS-specific requirements:

**Key differences from macOS admin template:**
1. Supervision state callout required at the top of every guide (what enrollment path is assumed, whether supervised is required)
2. `🔒 Supervised only` inline callout for supervised-only settings (same pattern as proposed in PROJECT.md)
3. No Setup Assistant deferral equivalent to macOS — iOS ADE uses similar Setup Assistant but with different screen set
4. MAM-WE guides require no portal steps at Devices level — entirely within Apps > App protection policies
5. User Enrollment guides require Managed Apple ID prerequisite callout (ABM Entra federation or manual Managed Apple IDs)

**Standard callout pattern to introduce:**
```markdown
> **🔒 Supervised only:** This setting is only available on devices enrolled via ADE
> with supervision enabled. Unsupervised devices ignore this profile entry.
> See: [Supervision Capability Matrix](../reference/supervision-capability-matrix.md)
```

### Template: iOS/iPadOS L1 Runbook

Adapt existing macOS L1 template:
- Portal-only troubleshooting (Intune admin center device hardware, compliance, configuration state)
- Supervision state check: "Check device hardware view for 'Supervised: Yes/No' — determines escalation path"
- Log collection: L1 can trigger Company Portal log upload via Intune portal remote action OR instruct user to shake device in Company Portal
- No PowerShell, no Terminal — iOS is entirely portal-based at L1

### Template: iOS/iPadOS L2 Runbook

Adapt existing macOS L2 template:
- No terminal commands (iOS is not accessible via SSH/shell)
- Log collection requires either Company Portal upload (remote) or physical Mac + cable (sysdiagnose)
- Key data to collect: device enrollment date, MDM profile installed state, last check-in, compliance status, Intune portal device action history
- MAM troubleshooting requires Microsoft Edge diagnostic upload + app protection policy logs in Intune portal

---

## Glossary Additions for v1.3

New terms to add to `docs/_glossary.md`:

| Term | Definition Context | Platform Label |
|------|--------------------|----------------|
| Supervised (iOS) | Apple device management mode enabling full MDM control; only achieved at enrollment via ADE or post-enrollment via Apple Configurator (requires device wipe); distinct from macOS where ADE always supervises | iOS |
| ADE (iOS) | Same mechanism as macOS ADE but enrollment profile options differ; iOS adds supervision checkbox, user affinity, and authentication method selection | iOS |
| MAM (Mobile Application Management) | App-level data protection without device enrollment; iOS implementation uses Intune App SDK or App Wrapping Tool; requires Microsoft Authenticator as broker on iOS | iOS |
| MAM-WE (MAM Without Enrollment) | MAM app protection policies applied to unenrolled devices; protects corporate data in Microsoft apps without MDM control | iOS |
| App Protection Policy | Intune policy controlling data transfer, save behavior, cut/copy/paste, encryption, and access requirements for MAM-enrolled apps | iOS (also Android) |
| User Enrollment | Apple enrollment method creating a managed work partition on personal iOS devices; requires Managed Apple ID; limits admin visibility to work partition only | iOS |
| Account-Driven User Enrollment | Current implementation of User Enrollment; initiated from device Settings app using work/school account sign-in | iOS |
| Managed Apple ID | Apple ID provisioned and controlled by the organization via Apple Business Manager; required for User Enrollment and Shared iPad sign-in | iOS |
| Shared iPad | iPadOS feature enabling multi-user iPad where each user signs in with a Managed Apple ID; data cached per-user; requires supervised enrollment without user affinity | iPadOS |
| Device Licensing (VPP) | App license assigned to device identifier; allows silent app installation on supervised devices without user Apple ID; default for new VPP assignments | iOS |
| User Licensing (VPP) | App license assigned to user Apple Account; requires user Apple ID; one license covers up to 5 devices; required for User Enrollment | iOS |
| Activation Lock | Apple anti-theft feature; disabled remotely only on supervised devices via Intune remote action | iOS |
| sysdiagnose | iOS system diagnostic log bundle; collected by key combination on device + transferred via Mac Console app (cable required); used for deep MDM/network troubleshooting | iOS |
| Company Portal (iOS) | Intune management app for iOS/iPadOS; available from App Store; primary log collection and enrollment interface for BYOD devices | iOS |
| Apple Configurator | Mac application for USB-based iOS device enrollment; used for small batches, existing devices, or when ABM is unavailable | iOS |
| ASAM (Autonomous Single App Mode) | Supervised-only iOS feature locking device to a single app (kiosk mode); configured via configuration profile | iOS |

---

## iOS-Specific Configuration Profile Types

These are the profile types documented admins need to configure. Organize `05-configuration-profiles.md` around these categories:

| Profile Type | Available To | Key Settings | Supervision Required |
|--------------|-------------|--------------|---------------------|
| Device Restrictions | All enrolled | Password, camera block (basic), iCloud restrictions, app data separation | Partial — advanced restrictions require supervision |
| Device Features | All enrolled | AirPrint, lock screen message, Single Sign-on, home screen layout, notifications, web content filter | No |
| Wi-Fi | All enrolled | SSID, WPA2/Enterprise, certificates for Wi-Fi authentication | No |
| VPN | All enrolled (per-app VPN: device and user enrollment) | VPN server, authentication, split tunneling, per-app VPN | No |
| Email | All enrolled | Exchange ActiveSync config, S/MIME | No |
| Certificates (SCEP/PKCS/Trusted Root) | All enrolled | Identity certificates for Wi-Fi, VPN, email authentication | No |
| Device Restrictions (supervised) | Supervised only | App Store block, Kiosk/ASAM, AirDrop block, Bluetooth config block, software update deferral, MDM profile removal block | Yes |
| Kiosk/Single App Mode | Supervised only | App bundle ID, accessibility options, volume/screen lock controls | Yes |
| Software Updates | Supervised only | Defer major/minor OS updates, forced install schedule | Yes |
| Custom (XML payload) | All enrolled | Any Apple MDM payload not exposed in Intune UI | Depends on payload |

---

## iOS/iPadOS Compliance Policy Settings

Complete reference for `07-compliance-policy.md`. All settings verified against Microsoft Learn (updated 2026-04-15):

### Category: Email
- Require managed email profile on device (marks noncompliant if unmanaged email account exists)

### Category: Device Health
- Jailbroken devices: Not configured (default) / Block
- Device threat level: Secured / Low / Medium / High (integrates with MTD connector)

### Category: Device Properties
- Minimum OS version (major.minor)
- Maximum OS version
- Minimum OS build version (for Rapid Security Response updates: enter supplemental build e.g. `20E772520a`)
- Maximum OS build version

### Category: Microsoft Defender for Endpoint
- Machine risk score threshold: Clear / Low / Medium / High

### Category: System Security — Password
- Require password to unlock
- Block simple passwords
- Minimum password length
- Required password type: Not configured / Alphanumeric / Numeric
- Number of non-alphanumeric characters
- Maximum minutes after screen lock before password required
- Maximum minutes of inactivity until screen locks
- Password expiration (days)
- Number of previous passwords to prevent reuse

### Category: Device Security
- Restricted apps (by bundle ID — marks device noncompliant if restricted app is installed; applies to unmanaged apps only)

**No supervised-only compliance settings** — compliance policy settings apply equally to supervised and unsupervised enrolled devices.

---

## iOS/iPadOS MAM (App Protection Policy) Settings Summary

For `04-mam-without-enrollment.md` and cross-reference in `06-app-deployment.md`. Settings organized as they appear in Intune admin center:

### Data Protection (Data Transfer)
- Backup org data to iTunes and iCloud: Allow / Block
- Send org data to other apps: All apps / None / Policy managed apps / Policy managed with OS sharing / Policy managed with Open-In filtering
- Receive data from other apps: All apps / None / Policy managed apps / All apps with incoming org data
- Save copies of org data / allowed services (OneDrive, SharePoint, Box, Photo Library, local storage, iManage, Egnyte)
- Restrict cut, copy, paste: Any app / Policy managed apps / Policy managed with paste-in / Blocked
- iOS-specific: Third-party keyboards block (iOS only; requires Intune SDK 12.0.16+)
- iOS-specific: Screen capture block (requires SDK 19.7.12+)
- iOS-specific: Genmoji block, Writing Tools block (Apple Intelligence features; requires SDK 19.7.12+)

### Data Protection (Encryption)
- Encrypt org data: Require (default) — uses iOS device-level encryption + AES-256 via APP SDK

### Data Protection (Functionality)
- Sync policy managed app data with native apps or add-ins
- Printing org data
- Restrict web content transfer: Any app / Microsoft Edge / Unmanaged browser
- Org data notifications: Allow / Block / Block org data (iOS-specific: affects lock screen notifications)

### Access Requirements
- PIN for access: Require (default)
- PIN type: Numeric / Passcode
- Touch ID instead of PIN (iOS 8+)
- Face ID instead of PIN (iOS 11+)
- Work or school account credentials for access

### Conditional Launch
- Min/Max OS version (Warn / Block access / Wipe data)
- Max PIN attempts
- Offline grace period (Block access in minutes; Wipe data in days)
- Jailbroken/rooted devices (Block access / Wipe data)
- Disabled account
- Min app version
- Min SDK version
- Device model(s) allowlist/blocklist
- Max allowed device threat level (MTD integration)

---

## iOS/iPadOS Remote Actions

Document in L2 runbooks and admin overview. Key iOS-specific actions:

| Action | Supervised Required | Effect | Notes |
|--------|---------------------|--------|-------|
| Wipe | No | Factory reset, removes all data | Corporate devices only |
| Retire | No | Removes MDM profile, returns to user control | BYOD-friendly offboarding |
| Remote Lock | No | Locks device, requires PIN to unlock | Sets a 6-digit recovery PIN |
| Reset Passcode | No | Removes device passcode; user sets new one | iOS removes passcode (different from Android which sets a temporary one) |
| Remove Passcode | No | Removes passcode; user set a new one in Settings | Used when user locked out |
| Disable Activation Lock | Yes | Bypasses Apple Activation Lock without device interaction | Requires supervision established at enrollment |
| Restart | Yes | Remote device restart | Supervised only |
| Locate Device | Yes (for non-lost mode) | Shows device location | Supervised for silent location; all enrolled for user-acknowledged |

**Note for docs:** Wipe/Retire/Delete take precedence over all other pending actions in Intune.

---

## What NOT to Add

| Avoid | Why | What to Do Instead |
|-------|-----|-------------------|
| Separate iOS glossary file | v1.2 decision: single glossary with platform labels | Add iOS terms to `docs/_glossary.md` with `(iOS)` or `(iPadOS)` labels |
| Apple School Manager (ASM) deep docs | Out of scope — same enrollment mechanism as ABM; education-specific features beyond provisioning are out of scope | Note that ASM works identically to ABM for enrollment; link to Apple education docs |
| Third-party MDM (Jamf/MobileIron) comparison | Out of scope — suite covers Intune only | Add single note in iOS overview that docs assume Intune as MDM |
| iOS error code tables | iOS/iPadOS ADE/enrollment errors are message-based, not hex code-based (unlike Windows Autopilot) | Use symptom-based decision trees (same pattern as APv2 failure catalog) |
| Android enrollment documentation | Different platform entirely | Note Android is out of scope; different enrollment patterns, different MAM behavior |
| mdmdiagnosticstool equivalent commands | No CLI tool exists for iOS diagnostic collection | Document Company Portal log upload + sysdiagnose (Mac+cable) as the iOS equivalent |
| Tenant-specific ABM org details | Same constraint as all existing docs | Document the process; teams add their specific account details locally |
| Detailed Apple Configurator USB provisioning steps | Niche use case; complex; different from ADE at scale | Document Apple Configurator as an enrollment option with reference to Apple's official Apple Configurator 2 user guide |
| iOS MDM migration steps (iOS/iPadOS 26 feature) | New capability arriving with iOS 26; document when GA | Note upcoming MDM migration capability in overview as coming feature |

---

## Cross-Reference Pattern for iOS/iPadOS Docs

### Reference existing macOS ABM docs (do not re-document)

Every iOS/iPadOS ADE admin guide should reference macOS ABM configuration:

```markdown
> **ABM Prerequisites:** This guide assumes an Apple Business Manager MDM server token
> is already configured and linked to Intune. If not yet configured, see
> [ABM Configuration for Automated Device Enrollment](../../admin-setup-macos/01-abm-configuration.md).
> The ABM setup steps are identical for iOS/iPadOS and macOS.
```

### Reference Windows and macOS parallels

```markdown
> **Cross-platform note:** iOS/iPadOS ADE is conceptually equivalent to macOS ADE
> and Windows Autopilot — all three achieve zero-touch enrollment. Key differences:
> iOS ADE adds the supervised/unsupervised distinction that macOS and Windows do not require.
> See [Platform Comparison](../../windows-vs-macos.md).
```

### Supervision callout pattern (establish consistently)

```markdown
> **🔒 Supervised only:** [Setting name] is only available on devices enrolled via ADE
> with the Supervised checkbox enabled. Devices enrolled via Device Enrollment,
> User Enrollment, or ADE without supervision cannot use this setting.
```

---

## Version and Compatibility Notes

| Area | Current Requirement | Notes |
|------|--------------------|----- |
| Minimum iOS for Intune MAM/Company Portal | iOS 17 required after iOS/iPadOS 26 GA | Currently iOS 16+ supported; update docs when iOS 26 releases (expected WWDC 2025) |
| Minimum iOS for ADE | iOS 8+ (all current devices qualify) | Not a practical documentation concern |
| Web-based device enrollment | iOS 15+ | Note this in Device Enrollment guide as a prerequisite |
| Account-driven user enrollment | iOS 13+ | Note this in User Enrollment guide as a prerequisite |
| ADE new infrastructure | Q2 CY2026 | Create enrollment profile guide with current UI; add callout noting Q2 CY2026 UI change |
| ACME protocol for enrollment | In development as of 2026 | New certificate enrollment protocol for iOS/iPadOS; note as upcoming in certificate profiles section |

---

## Sources

- Microsoft Learn: iOS/iPadOS enrollment guide — https://learn.microsoft.com/en-us/intune/device-enrollment/apple/guide-ios-ipados — HIGH confidence, updated 2026-04-14, primary enrollment path reference
- Microsoft Learn: iOS/iPadOS deployment guide — https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-platform-ios-ipados — HIGH confidence, full management lifecycle
- Microsoft Learn: iOS/iPadOS compliance settings — https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-ios-ipados-settings — HIGH confidence, updated 2026-04-15
- Microsoft Learn: iOS/iPadOS device restrictions — https://learn.microsoft.com/en-us/intune/intune-service/configuration/device-restrictions-apple — HIGH confidence, supervised vs unsupervised distinction
- Microsoft Learn: iOS/iPadOS app protection policy settings — https://learn.microsoft.com/en-us/intune/app-management/protection/ref-settings-ios — HIGH confidence, updated 2026-04-15
- Microsoft Learn: Manage Apple VPP/ABM apps — https://learn.microsoft.com/en-us/intune/app-management/deployment/manage-vpp-apple — HIGH confidence, updated 2026-04-14, device vs user licensing
- Microsoft Learn: Supervised mode — https://learn.microsoft.com/en-us/intune/device-enrollment/apple/enable-supervised-mode — HIGH confidence, updated 2026-04-14
- Microsoft Learn: Collect logs from iOS — https://learn.microsoft.com/en-us/intune/user-help/diagnostics/collect-logs-ios — HIGH confidence
- Microsoft Learn: ADE setup for iOS/iPadOS — https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-enrollment-program-enroll-ios — HIGH confidence
- Microsoft Tech Community: New ADE enrollment policies experience — https://techcommunity.microsoft.com/blog/intunecustomersuccess/new-iosipados-and-macos-ade-enrollment-policies-experience/4393531 — MEDIUM confidence, product blog, confirms Q2 CY2026 UI change
- Microsoft Learn: Troubleshoot iOS enrollment errors — https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-enrollment/troubleshoot-ios-enrollment-errors — HIGH confidence

---
*Stack research for: v1.3 iOS/iPadOS Provisioning Documentation (Intune)*
*Researched: 2026-04-15*
