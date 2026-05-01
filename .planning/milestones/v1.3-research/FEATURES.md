# Feature Research

**Domain:** iOS/iPadOS Intune provisioning documentation (v1.3 milestone)
**Researched:** 2026-04-15
**Confidence:** HIGH — sourced from official Microsoft Learn documentation (updated through April 2026)

---

## Context: This is a Documentation Milestone

This is not a software product feature list — it is a documentation feature list. "Features" here means: what documentation artifacts need to exist, what content each must cover, and how complex each is to produce. The downstream consumer is the roadmap author, who will assign documentation artifacts to phases.

---

## Enrollment Path Coverage (Four Paths)

The iOS/iPadOS Intune ecosystem has four distinct enrollment paths. Each requires its own lifecycle documentation and admin setup content.

### Path 1: ADE (Automated Device Enrollment)

**What it is:** Corporate-owned devices purchased through Apple Business Manager (ABM) or Apple School Manager (ASM). The MDM server assignment in ABM causes the device to enroll in Intune automatically during Setup Assistant. This is the only iOS/iPadOS enrollment path that achieves supervised mode, giving IT the deepest management control.

**Key characteristics (HIGH confidence — official Microsoft Learn):**
- Always results in supervised mode if enrollment profile has Supervised checked
- Requires ABM/ASM account and ADE token (.p7m) uploaded to Intune
- Requires active APNs certificate (shared with macOS enrollment — affects ALL Apple devices if expired)
- Authentication method choices: Setup Assistant with modern auth (recommended), Company Portal app, or Setup Assistant legacy (deprecated)
- Can enroll with user affinity (personal device assignment) or without (shared/kiosk)
- VPP device-licensed apps can install silently — no user Apple ID prompt
- Can skip Setup Assistant screens configurable in enrollment profile
- Cannot be applied to existing enrolled devices — device must be wiped first
- Supervised mode after enrollment only possible via Apple Configurator (requires physical Mac connection + device wipe)

**ABM overlap with existing macOS docs:** The ABM portal steps (MDM server, ADE token, device assignment) are identical conceptually to the macOS ABM guide at `docs/admin-setup-macos/01-abm-configuration.md`. The enrollment profile creation in Intune admin center differs between platforms (iOS vs macOS profile type). A cross-reference is warranted; a full rewrite of ABM fundamentals is not.

**iOS-specific ADE differences from macOS ADE:**
- Shared iPad (iPadOS) — multi-user managed device mode not available on macOS
- Single App Mode / Kiosk — deeper than macOS kiosk equivalent
- Three authentication method choices on iOS; macOS has two (modern/legacy)
- iOS Setup Assistant has more screen types configurable (Privacy, Location, Zoom, etc.)
- iOS has cellular/eSIM provisioning steps not present on macOS

### Path 2: Device Enrollment (Company Portal — BYOD)

**What it is:** Personal or corporate-owned devices where the user installs Company Portal and enrolls. This does NOT achieve supervised mode. MDM profile is removable by the user. Less commonly used for corporate devices in organizations with ABM.

**Key characteristics (HIGH confidence — official Microsoft Learn):**
- Not supervised — user can remove management profile at any time
- Enrolls the full device; Intune can see full app inventory, serial number, IMEI
- Web-based device enrollment variant available (iOS 15+): no Company Portal app needed, enrollment via Safari + Settings
- Enrollment restriction for personally-owned devices must be set to "Allow" for BYOD
- iOS/iPadOS device defaults to "personally owned" classification unless serial number pre-registered as corporate or enrolled via ADE
- Device limit restrictions apply (default 15 devices per user)
- Conditional Access enrollment timing applies: user may have limited access window before compliance evaluates

**Sub-variants:**
- Standard device enrollment (Company Portal app, iOS 13+)
- Web-based device enrollment (Safari + Settings, iOS 15+)
- Device enrollment via DEM (Device Enrollment Manager) account

### Path 3: User Enrollment (Account-Driven — BYOD Privacy-Preserving)

**What it is:** Apple's BYOD-specific enrollment method. Creates a separate encrypted APFS volume for work data. Intune cannot see personal apps, cannot get UDID/serial number/IMEI, and cannot factory reset the personal partition.

**Key characteristics (HIGH confidence — official Microsoft Learn):**
- Requires iOS/iPadOS 15+ (account-driven, recommended) or iOS 13+ (profile-based with Company Portal, deprecated)
- Profile-based user enrollment with Company Portal is deprecated — only account-driven is recommended for new deployments
- Supervised mode NOT available
- Intune CANNOT collect: app inventory outside managed APFS volume, UDID, serial number, IMEI, phone number
- Intune CAN manage: per-app VPN (no Safari domains), Wi-Fi, device restrictions (subset), remote lock, retire, delete
- Only user-licensed VPP apps supported — device-licensed VPP not supported
- LOB apps supported; App Store managed app installation NOT supported
- Cannot switch from user enrollment to device enrollment without unenrolling and re-enrolling
- MFA via SMS/call can fail on iOS 15.5 and 15.7–16.3 (documented bug)
- Requires Microsoft Authenticator as broker app

**Critical distinction for documentation:** User enrollment limits are extensive. The documentation must clearly communicate what IT cannot do (no serial number, no UDID, no factory wipe of work partition by user, no full app inventory) to prevent admins from choosing this path for scenarios that require full device control.

### Path 4: MAM Without Enrollment (App Protection Policies Only)

**What it is:** No device enrollment. Intune manages specific apps (Microsoft 365 apps, any Intune SDK-integrated app) on personal or corporate devices without installing an MDM profile. The device is never registered with Intune — only the app's corporate identity context is managed.

**Key characteristics (HIGH confidence — official Microsoft Learn):**
- No MDM profile on device — user cannot see any management in Settings
- Requires Microsoft Authenticator broker app on iOS
- Protects app-level data: copy/paste restrictions, PIN requirement, save restrictions, selective wipe of corporate data only
- Applies to any Intune SDK-integrated app (all M365 apps, plus third-party SDK-integrated apps)
- Does NOT apply to: LOB apps without Intune SDK integration, standard App Store apps, certificates, Wi-Fi, VPN
- App protection policy data protection framework has three levels: Level 1 (basic), Level 2 (enhanced), Level 3 (high)
- MAM can coexist with MDM enrollment (e.g., apply stricter MAM policy to unenrolled devices, lighter MAM to enrolled)
- Selective wipe removes only corporate data from managed apps; personal data untouched
- Multi-identity support in M365 apps: corporate context restricted, personal context unrestricted

**Admin setup required:** App protection policies (iOS settings), VPP location token (optional, for managed app deployment), Conditional Access policy targeting unenrolled devices

---

## Supervision: The Critical Capability Dividing Line

This is the most important callout pattern for iOS/iPadOS documentation. The `> **Supervised only:**` callout should appear throughout admin setup guides wherever a setting requires ADE.

**Supervision is achieved exclusively through ADE enrollment with Supervised checkbox enabled in the enrollment profile.** After enrollment, supervision cannot be added without wiping and re-enrolling via Apple Configurator.

### Supervised-Only Capabilities (HIGH confidence — official Microsoft Learn + corroborated by multiple vendor sources)

These cannot be enforced on user enrollment, device enrollment, or MAM paths:

| Capability | Why It Matters for Docs |
|-----------|------------------------|
| Block app removal by user | Kiosk and mandatory app scenarios |
| Kiosk mode (Single App Mode / App Lock) | Dedicated/shared device scenarios |
| Silent app installation via MDM | No user prompt for required apps |
| Block iCloud backup, document sync, Keychain sync | Data governance |
| Block AirDrop | Data loss prevention |
| Block App Store | Corporate-only app management |
| Block Safari, FaceTime, camera (per-app) | Feature restriction scenarios |
| Block modification of device name, wallpaper, notifications | Standardization |
| Block VPN creation (prevent user-configured VPNs) | Network governance |
| Block passcode modification | Kiosk scenarios |
| Defer software updates (supervised + configured profile) | Staged OS update management |
| Block Screen Time modification | Child safety / compliance |
| Block configuration profile changes | MDM profile persistence |
| Require Touch ID / Face ID for AutoFill | Enhanced security |
| Block setting up new nearby devices | AirPlay / AirDrop governance |

### Unsupervised Capabilities (Available Without Supervision)

- Basic Wi-Fi, VPN (whole-device), email profiles
- Device restrictions (limited subset — password, screen time reporting only)
- Compliance policy evaluation
- App protection policies
- Per-app VPN (user enrollment)
- Company Portal app functions (retire, sync, rename)
- Certificate delivery (SCEP, PKCS — device enrollment only)

---

## Admin Setup Guides Needed

These are the documentation artifacts that constitute "admin setup guides" for iOS/iPadOS. Complexity estimates are based on content scope versus equivalent macOS guides.

### 1. APNs Certificate Guide

**Scope:** Create and renew the Apple MDM Push Notification certificate. Required before any iOS/iPadOS device can enroll.

**Overlap with existing docs:** The macOS ABM guide (`docs/admin-setup-macos/01-abm-configuration.md`) references APNs as a prerequisite and documents renewal in its renewal table. The iOS guide should be a standalone guide covering the full APNs setup steps and linking to the macOS guide for the renewal reminder (APNs certificate affects ALL Apple devices — iOS and macOS — if it expires).

**Key callout:** APNs expiry causes ALL enrolled iOS/iPadOS and macOS MDM communication to stop immediately. This is higher severity than ADE token expiry (which only affects new device syncing). This callout must appear prominently.

**Complexity:** LOW — narrow scope, well-defined steps, few decision branches.

### 2. ABM Configuration / ADE Token Guide (iOS)

**Scope:** Creating the ADE token for iOS enrollment, assigning iOS devices to the MDM server, setting up ABM for iOS device procurement, token sync mechanics.

**Overlap with existing macOS ABM guide:** The portal steps (ABM side) are 90% identical. The Intune admin center navigation differs slightly (iOS vs macOS profile type). The recommended approach is to write a companion iOS ABM guide that cross-references the macOS guide for shared ABM concepts, then documents iOS-specific differences (eSIM, cellular provisioning, Shared iPad assignment).

**Complexity:** LOW-MEDIUM — most content maps to macOS guide; iOS-specific additions are incremental.

### 3. Enrollment Profile Configuration Guide (iOS/iPadOS)

**Scope:** ADE enrollment profile creation including: supervised vs unsupervised setting, user affinity options, authentication method (modern vs legacy), Await Configuration, locked enrollment, Setup Assistant screen customization, Shared iPad settings.

**Key differences from macOS enrollment profile guide:**
- Three authentication methods (macOS has two)
- Supervised checkbox (macOS supervision is implicit with ADE, not a separate checkbox)
- Setup Assistant has different screen types (Privacy, Location, Zoom, SIM Setup, Screen Time, etc.)
- Shared iPad (iPadOS) is an iOS-only concept — no macOS equivalent
- Locked enrollment callout: same risk as macOS (cannot remove MDM profile) but even more critical for supervised corporate devices

**Complexity:** MEDIUM — supervised callout pattern throughout, more decision branches than macOS equivalent.

### 4. Configuration Profiles Guide (iOS/iPadOS)

**Scope:** Deploying configuration profiles for: Wi-Fi, VPN (whole-device and per-app), email, device restrictions (with supervised-only callouts), certificate profiles (SCEP/PKCS), home screen layout, notifications, single-sign-on extension.

**Supervised-only callout volume:** This guide has the highest density of supervised-only callouts of any admin setup guide. Nearly every restrictions setting requires specifying supervision status.

**iOS-only profile types with no macOS equivalent:**
- Home screen layout (Springboard customization)
- Notification restrictions per-app
- Single App Mode / Kiosk profile
- Managed Domains
- Content filtering (web content filter)
- AirPrint

**Complexity:** HIGH — large number of settings, extensive supervised-only callouts, several iOS-only profile types.

### 5. App Deployment Guide (iOS/iPadOS)

**Scope:** VPP/Apps and Books setup, location token upload, device-licensed vs user-licensed apps, required vs available deployment, LOB app deployment, App Store apps, silent installation on supervised devices.

**Key iOS-specific content:**
- VPP location token (same as macOS — shared ABM) but iOS has both device-licensed and user-licensed with different behaviors
- Device-licensed apps: no Apple ID prompt, silent on supervised devices
- User-licensed apps: requires Apple ID, can be used across up to 5 devices
- User enrollment compatibility: only user-licensed VPP supported (device-licensed does NOT work on user enrollment)
- Silent app installation: supervised-only (unsupervised devices show install prompt)
- Managed App Status reporting for deployment tracking

**Overlap with macOS app deployment guide:** VPP/location token upload is identical. The license type behaviors differ (macOS device-licensed vs iOS device-licensed differ slightly in user experience).

**Complexity:** MEDIUM — VPP mechanics well-established, key callouts on supervision and user enrollment compatibility.

### 6. Compliance Policy Guide (iOS/iPadOS)

**Scope:** Creating iOS/iPadOS compliance policies: OS version requirements (minimum/maximum), jailbreak detection, passcode requirements, device threat level, Conditional Access integration timing.

**Key iOS-specific content:**
- iOS/iPadOS supports jailbreak detection (Intune checks via heuristics)
- No equivalent of Windows security baselines for iOS
- Three major iOS versions supported by Apple at any time — OS version management is ongoing
- Compliance evaluation timing and Conditional Access interaction (common pain point)
- Default compliance policy behavior: devices with no policy assigned become "Not compliant" after grace period

**Overlap with macOS compliance guide:** Structure mirrors macOS compliance guide but iOS-specific settings differ (no SIP, FileVault, Gatekeeper equivalents; has jailbreak detection instead).

**Complexity:** LOW-MEDIUM — well-documented settings, main complexity is Conditional Access timing callout.

### 7. App Protection Policies Guide (iOS/iPadOS) — MAM-Specific

**Scope:** Creating iOS/iPadOS app protection policies: data protection settings (copy/paste, save-to restrictions, open-in restrictions), access requirements (PIN, biometric, timeout), conditional launch settings (jailbreak check, OS version, app version), assignment targeting (enrolled vs unenrolled).

**This guide has no macOS or Windows Autopilot equivalent in the existing suite.** It is entirely new content.

**Key content areas:**
- Three data protection levels (Microsoft framework: Level 1/2/3)
- Targeting: all devices vs unenrolled only vs enrolled only
- iOS-specific: share extension encryption behavior, Universal Links handling, PIN sharing across same-publisher apps
- Selective wipe vs full device wipe distinction
- Coexistence with MDM: when to use MAM-only vs MAM+MDM

**Complexity:** HIGH — new content category, complex policy interactions, no existing template to follow.

### 8. BYOD / User Enrollment Setup Guide

**Scope:** Configuring account-driven user enrollment for BYOD scenarios, enrollment profile creation for BYOD, what to communicate to users, limitation callouts for IT.

**Key limitation callouts:**
- No UDID/serial number collection
- No full device wipe (admin cannot reset personal partition)
- User can factory reset personal partition (admin cannot prevent)
- Cannot switch from user enrollment to device enrollment without unenrolling
- App installed before user enrollment profile is applied is NOT managed by that profile (Outlook pre-install trap)
- Only user-licensed VPP supported

**Complexity:** MEDIUM — significant limitation surface to document, no macOS equivalent.

---

## Table Stakes, Differentiators, Anti-Features

### Table Stakes (Users Expect These)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| iOS/iPadOS lifecycle overview document (ADE path) | ADE is the primary corporate enrollment path; parity with existing macOS lifecycle doc required | MEDIUM | Single-file narrative format matching macOS ADE lifecycle doc |
| APNs certificate setup guide | Prerequisite for ALL iOS/iPadOS enrollment; L1 will hit APNs-related errors immediately | LOW | Overlaps with macOS renewal section; standalone guide needed |
| ADE admin setup guide (ABM + enrollment profile) | Primary enrollment path for corporate iOS; mirrors macOS equivalent | MEDIUM | Cross-reference macOS ABM guide for shared concepts |
| Configuration profiles guide with supervised-only callouts | Admins need to know which restrictions require supervision before deploying | HIGH | Dense supervised-only callout surface |
| App deployment guide (VPP/Apps and Books) | iOS is heavily app-centric; VPP is standard practice for corporate apps | MEDIUM | Device-licensed vs user-licensed distinction critical |
| Compliance policy guide | Required for Conditional Access gating on iOS devices | LOW-MEDIUM | CA timing callout is most complex part |
| L1 decision tree for iOS enrollment failures | L1 Service Desk needs scripted triage — APNs, restrictions, license, token errors | MEDIUM | Mirrors macOS triage decision tree format |
| L1 runbooks for top iOS enrollment failures | APNs expired, ADE not starting, Company Portal unavailable, enrollment restriction blocking, user license invalid | MEDIUM | 5–6 runbooks; mirrors macOS L1 runbook format |
| L2 runbook: iOS log collection | L2 needs log collection procedure for iOS | MEDIUM | Different from macOS/Windows: iOS uses MDM diagnostic report + Console app |
| Supervised vs unsupervised capability reference | Admins constantly ask "can I do X on a non-supervised device?" — a reference table answers this | LOW | Inline callout pattern + standalone reference section |
| iOS/iPadOS glossary additions or extensions | New terminology (Supervision, ADE, User Enrollment, MAM, APNs, VPP, Shared iPad) | LOW | Extends existing `_glossary-macos.md` or adds to main `_glossary.md` |
| Navigation integration | iOS/iPadOS must appear in platform selector, index, and quick-reference cards | LOW | Mirrors macOS navigation integration work from v1.2 |

### Differentiators (Value Beyond Parity)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Enrollment path selection guide | Admins frequently choose the wrong path; a decision guide (ADE vs Device vs User vs MAM) saves re-enrollment pain | MEDIUM | No direct macOS or Windows equivalent; iOS has 4 paths vs macOS's 1 |
| App protection policies guide (MAM) | Entirely new content category; no existing template; fills a genuine gap in the suite | HIGH | Level 1/2/3 framework, iOS-specific behaviors (share extension, Universal Links), coexistence with MDM |
| BYOD/User enrollment setup guide with limitation callouts | Admins need explicit documentation of what they CANNOT do in user enrollment mode to avoid choosing it inappropriately | MEDIUM | Privacy-preserving enrollment limitations are frequently misunderstood |
| Per-setting supervised-only callouts throughout all admin guides | Consistent with existing "what breaks" callout pattern; high density on iOS because supervision boundary is sharp | Embedded | Pattern already established; execution is content-heavy |
| Shared iPad documentation | Relevant for education/shared-device scenarios; no macOS equivalent | LOW-MEDIUM | Can be a section within enrollment profile guide rather than standalone |

### Anti-Features (Do Not Build)

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Separate "iOS vs iPadOS differences" guide | The differences between iPhone and iPad management in Intune are minimal (Shared iPad is iPadOS-only; most restrictions apply to both); a dedicated guide creates navigation overhead for marginal value | Note iPadOS-specific items (Shared iPad) inline with callouts in the relevant guides |
| Apple Configurator 2 deep-dive guide | AC2 is a niche recovery/lab enrollment path; the primary audience is enterprise admins with ABM access; documenting AC2 in depth displaces more impactful content | One-paragraph "existing devices without ABM" callout in the ADE guide pointing to Apple's documentation |
| Apple School Manager (ASM) parallel guides | ASM is functionally identical to ABM for MDM purposes; the audience (education IT vs enterprise IT) differs; maintaining parallel guides creates drift | Acknowledge ASM = ABM for MDM purposes in the ABM guide; note ASM exists for education |
| iOS-specific monitoring and operations guide | The existing `docs/reference/deployment-reporting.md` and `docs/reference/drift-detection.md` cover operational patterns generically; iOS doesn't add fundamentally new operational concepts | Reference existing Windows/macOS operational docs; add iOS-specific Managed Device Insights notes inline |
| MAM for Android documentation in this milestone | Android MAM is a different policy set with different SDK behavior; combining iOS and Android MAM documentation creates confusion | Scope this milestone to iOS/iPadOS MAM only; Android MAM is a future milestone |

---

## Feature Dependencies

```
APNs Certificate
    └──required by──> ADE Enrollment
    └──required by──> Device Enrollment
    └──required by──> User Enrollment
    (NOT required by MAM Without Enrollment)

ABM Configuration / ADE Token
    └──required by──> ADE Enrollment Profile
    └──required by──> ADE Lifecycle Documentation

ADE Enrollment Profile
    └──required by──> ADE Lifecycle Documentation
    └──enables──> Supervised Mode
    └──enables──> Supervised-Only Callouts in Config Profiles Guide

Supervised Mode Callout Pattern
    └──embedded in──> Configuration Profiles Guide
    └──embedded in──> App Deployment Guide
    └──embedded in──> Enrollment Profile Guide

VPP Location Token (from ABM)
    └──required by──> App Deployment Guide (device-licensed apps)
    └──enables──> Silent App Installation (supervised only)

Enrollment Path Selection Guide
    └──informs──> ADE Guide
    └──informs──> Device Enrollment Guide
    └──informs──> User Enrollment Guide
    └──informs──> MAM Guide

Compliance Policy Guide
    └──depends on──> Enrollment Path (scope of what can be evaluated differs by path)
    └──feeds into──> L1 Runbook: Compliance Access Blocked

L1 Decision Tree
    └──depends on──> all enrollment path guides (content must exist first)
    └──links to──> L1 Runbooks

iOS Glossary
    └──required by──> all iOS admin guides (terminology consistency)
```

### Dependency Notes

**APNs certificate is a cross-platform blocker:** If it expires, ALL enrolled iOS/iPadOS AND macOS MDM communication stops. The iOS APNs guide must cross-reference the macOS ABM renewal table. L1 troubleshooting docs must recognize APNs as the "nuclear" failure mode.

**Supervised mode gates a large portion of configuration profiles content:** The configuration profiles guide cannot be written without the supervised-only callout pattern being established first, because nearly every restrictions setting requires that distinction.

**Enrollment path selection must precede lifecycle documentation:** Without clear path selection criteria, the lifecycle docs have no coherent framing. Recommended approach: brief enrollment path overview in the lifecycle overview document before breaking into ADE-specific depth.

**MAM documentation is independent from MDM enrollment documentation:** App protection policies do not require any enrollment path. They can be assigned to users regardless of device enrollment state. This independence means the MAM guide can be written in parallel with, but after, the enrollment path guides.

---

## MVP Definition

### Launch With (v1.3 scope)

These are required for parity with the existing macOS and Windows coverage:

- [ ] Enrollment path overview — coverage of all 4 paths with selection guidance (ADE, device, user, MAM)
- [ ] iOS/iPadOS lifecycle document (ADE path — the primary corporate path)
- [ ] APNs certificate admin guide
- [ ] ADE setup guides (ABM + enrollment profile) — cross-reference macOS ABM guide for shared steps
- [ ] Configuration profiles guide with supervised-only callouts
- [ ] App deployment guide (VPP device-licensed + user-licensed)
- [ ] Compliance policy guide
- [ ] App protection policies guide (MAM) — new content category
- [ ] BYOD/User enrollment guide with limitation callouts
- [ ] L1 triage decision tree for iOS enrollment
- [ ] L1 runbooks: top 5–6 failure scenarios
- [ ] L2 runbook: iOS log collection
- [ ] Supervised vs unsupervised capability reference (inline callouts + reference table)
- [ ] iOS glossary additions
- [ ] Navigation integration (platform selector, index, quick-reference cards)

### Add After Validation (v1.x)

- [ ] Shared iPad deep-dive (if education/shared-device scenarios are validated as in-scope)
- [ ] L2 runbook: ADE token and profile delivery deep-dive
- [ ] iOS MAM L1/L2 troubleshooting runbooks (selective wipe failures, PIN loop, app protection not applying)
- [ ] iOS-specific capability matrix (iOS vs macOS vs Windows feature parity)

### Future Consideration (v2+)

- [ ] Android enrollment documentation (different MDM platform behavior)
- [ ] Apple School Manager (ASM) coverage
- [ ] Apple Configurator 2 detailed guide

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| ADE lifecycle overview (iOS) | HIGH | MEDIUM | P1 |
| APNs certificate guide | HIGH | LOW | P1 |
| ADE admin setup (ABM + enrollment profile) | HIGH | MEDIUM | P1 |
| Configuration profiles guide | HIGH | HIGH | P1 |
| App deployment guide (VPP) | HIGH | MEDIUM | P1 |
| Compliance policy guide | HIGH | LOW-MEDIUM | P1 |
| App protection policies guide (MAM) | HIGH | HIGH | P1 |
| BYOD/User enrollment guide | HIGH | MEDIUM | P1 |
| L1 decision tree | HIGH | MEDIUM | P1 |
| L1 runbooks (5–6 scenarios) | HIGH | MEDIUM | P1 |
| Supervised vs unsupervised reference | HIGH | LOW | P1 |
| Enrollment path selection guide | HIGH | MEDIUM | P1 |
| iOS glossary extensions | MEDIUM | LOW | P1 |
| Navigation integration | MEDIUM | LOW | P1 |
| L2 log collection runbook | MEDIUM | MEDIUM | P2 |
| Shared iPad documentation | LOW-MEDIUM | MEDIUM | P2 |
| iOS capability matrix | MEDIUM | MEDIUM | P2 |

---

## Supervised vs Unsupervised Callout Pattern

The existing `> **APv1 only:**` and `> **APv2 only:**` callout pattern in Windows docs, and the `> **Platform gate:**` pattern in macOS docs, establishes the precedent. For iOS/iPadOS, the callout should be:

```markdown
> **Supervised only:** [Setting name] requires supervised mode.
> Supervised mode is only available via ADE enrollment with the Supervised
> option enabled in the enrollment profile. This setting has no effect on
> devices enrolled via device enrollment, user enrollment, or MAM.
```

This callout applies to approximately 30–40 settings across the configuration profiles guide alone. The documentation must either:
1. Apply inline callouts per setting (high fidelity, high volume), or
2. Provide a consolidated supervised-only reference section with a pointer at the start of each guide (lower fidelity, more maintainable)

Recommended approach for v1.3: inline callouts for the highest-impact settings (kiosk, blocking app removal, blocking iCloud backup, deferring updates, blocking App Store), consolidated reference table for the full list.

---

## ABM Overlap Analysis

**Existing macOS guide:** `docs/admin-setup-macos/01-abm-configuration.md`
Covers: ABM portal setup, ADE token creation (5 steps), device assignment, token sync mechanics, renewal lifecycle.

**iOS guide needs:**
- Same 5-step ADE token creation flow (identical portal steps)
- Same device assignment in ABM (identical)
- Same token sync mechanics (identical)
- DIFFERENT: iOS devices have cellular/eSIM provisioning options in ABM
- DIFFERENT: iOS enrollment profile creation in Intune admin center is under iOS/iPadOS, not macOS
- DIFFERENT: Shared iPad assignment requires additional ABM configuration (Managed Apple IDs)

**Recommended approach:** Write an iOS ADE admin guide that opens with:
> "The ABM portal steps to create an ADE token are identical to the macOS ADE process. If you have already completed [macOS ABM Configuration](../admin-setup-macos/01-abm-configuration.md), you can reuse the same MDM server and token. This guide covers iOS/iPadOS-specific enrollment profile configuration."

This avoids duplicating 80% of the content while remaining navigable for iOS-first readers.

---

## L1/L2 Troubleshooting Scenarios

### Most Common L1 Scenarios (scripted, portal-resolvable)

| Scenario | Trigger | L1 Action |
|----------|---------|-----------|
| APNs certificate expired | All iOS enrollment fails; error "NoEnrollmentPolicy" or "APNSCertificateNotValid" | Escalate to admin immediately — L1 cannot renew APNs |
| ADE token expired / sync error | New ADE devices not appearing in Intune | Check token status in admin center; accept Apple T&C if applicable; escalate if token shows "Invalid" |
| Enrollment restriction blocking iOS | Error "Invalid Profile: couldn't be downloaded" | Check enrollment restrictions; verify iOS/iPadOS is set to Allow |
| User license invalid | Error "UserLicenseTypeInvalid" or "User Name Not Recognized" | Verify Intune license assigned in M365 admin center |
| Device cap reached | Error "DeviceCapReached" | User must unenroll another device; or DEM account needed |
| Company Portal outdated/corrupted | Company Portal error on device | Remove Company Portal, reinstall from App Store |
| ADE enrollment not starting | Device powers on, no Setup Assistant enrollment prompts | Profile created before token; edit/re-save profile; trigger sync |
| ADE stuck at user login | MFA blocking ADE (legacy auth method) | Switch enrollment profile to Setup Assistant with modern auth |
| Profile not assigned after ADE sync | Device appears in Intune but has no enrollment profile | Assign profile to device in admin center; trigger sync |
| Compliance block / access denied | User cannot access email/apps after enrollment | Check compliance policy status; verify CA policy assignment |

### Most Common L2 Scenarios (investigative, log collection required)

| Scenario | L2 Focus |
|----------|---------|
| ADE token sync failure requiring Graph API | When portal retry and T&C acceptance fail; token GUID extraction via Graph |
| XPC_TYPE_ERROR / network connection failure | ADE device cannot reach Apple ADE endpoints; network/proxy investigation |
| WS-Trust 1.3 not enabled | Legacy auth ADE failure; requires AD FS investigation |
| Government cloud redirect issue | Company Portal Cloud setting misconfiguration; L2 must guide user through manual cloud selection |
| iOS MDM log collection | Using MDM diagnostic report (Settings > Privacy > Analytics & Improvements) and Xcode Organizer / Console app; profiling enrollment failures |
| App protection policy not applying | Verifying user is in correct security group; checking Intune SDK version compatibility; verifying broker app (Authenticator) installed |
| Managed app status investigation | Why a required VPP app is not installing; license exhaustion, Apple Account prompt blocking, supervised state mismatch |
| Compliance timing / Conditional Access loop | Device enrolled but still blocked; CA evaluation delay; MDM enrollment not complete before CA evaluated |

---

## Sources

- [iOS/iPadOS enrollment guide — Microsoft Learn](https://learn.microsoft.com/en-us/mem/intune/enrollment/ios-enroll) — updated 2025-06-09 (HIGH confidence)
- [ADE setup for iOS/iPadOS — Microsoft Learn](https://learn.microsoft.com/en-us/mem/intune/enrollment/device-enrollment-program-enroll-ios) — updated 2025-12-02 (HIGH confidence)
- [Apple User Enrollment overview — Microsoft Learn](https://learn.microsoft.com/en-us/mem/intune/enrollment/ios-user-enrollment-supported-actions) — updated 2024-08-19 (HIGH confidence)
- [MAM for unenrolled devices — Microsoft Learn](https://learn.microsoft.com/en-us/mem/intune/fundamentals/deployment-guide-enrollment-mamwe) — updated 2024-04-22 (HIGH confidence)
- [App Protection Policies overview — Microsoft Learn](https://learn.microsoft.com/en-us/mem/intune/apps/app-protection-policy) — updated 2025-11-18 (HIGH confidence)
- [iOS device restrictions (supervised-only list) — Microsoft Learn](https://learn.microsoft.com/en-us/mem/intune/configuration/device-restrictions-ios) — current (HIGH confidence)
- [Turn on iOS/iPadOS supervised mode — Microsoft Learn](https://learn.microsoft.com/en-us/intune/device-enrollment/apple/enable-supervised-mode) — updated 2025-04-07 (HIGH confidence)
- [Troubleshoot iOS enrollment errors — Microsoft Learn](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-enrollment/troubleshoot-ios-enrollment-errors) — updated 2025-03-31 (HIGH confidence)
- [Enrollment restrictions overview — Microsoft Learn](https://learn.microsoft.com/en-us/mem/intune/enrollment/enrollment-restrictions-set) — updated 2025-12-04 (HIGH confidence)
- [Apple VPP / Apps and Books — Microsoft Learn](https://learn.microsoft.com/en-us/mem/intune/apps/vpp-apps-ios) — updated 2026-01-13 (HIGH confidence)
- [Apple MDM Push Certificate — Microsoft Learn](https://learn.microsoft.com/en-us/mem/intune/enrollment/apple-mdm-push-certificate-get) — updated 2025-05-12 (HIGH confidence)

---

*Feature research for: iOS/iPadOS Intune provisioning documentation (v1.3 milestone)*
*Researched: 2026-04-15*
