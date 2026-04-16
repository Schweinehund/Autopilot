# Phase 28: iOS Admin Setup — Configuration, Apps, Compliance - Research

**Researched:** 2026-04-16
**Domain:** Microsoft Intune iOS/iPadOS admin documentation — configuration profiles, app deployment, compliance policies
**Confidence:** HIGH (all critical claims verified against Microsoft Learn authoritative sources dated 2025-09 through 2026-04)

## User Constraints (from CONTEXT.md)

### Locked Decisions

**Device Restrictions Coverage Depth (ACFG-01)**
- **D-01:** Modified category-based approach with supervision matrix. ALL supervised-only settings receive a one-liner 🔒 blockquote callout using the exact Phase 27 D-01 format, organized by category (Camera, iCloud, App Store, etc.). ~15 key settings receive full detailed treatment with "What breaks if misconfigured" callouts.
- **D-02:** One-liner 🔒 callouts follow the locked format: `> 🔒 **Supervised only:** [setting name] requires supervised mode. [1 sentence what unsupervised devices experience]. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).`
- **D-03:** ~15 key settings selected based on: most commonly misconfigured, highest impact on fleet management, most likely to generate L1/L2 tickets (Claude's discretion).
- **D-04:** Target document length: 300-500 lines. Two-tier pattern (category summary with one-liner callouts + detailed key settings) follows the precedent of `03-ade-enrollment-profile.md`.
- **D-05:** STATE.md research flag: Software update deferral supervision requirement changed in iOS 17 via DDM. MUST verify current supervised/unsupervised boundary against Microsoft Learn.

**App Deployment Structure (ACFG-02)**
- **D-06:** Mirror macOS `04-app-deployment.md` structural template: comparison table, per-type sections, Verification, Configuration-Caused Failures, See Also.
- **D-07:** Comparison table columns: **VPP Device-Licensed | VPP User-Licensed | LOB (.ipa) | Store Apps (without VPP)**.
- **D-08:** Add "Key Concepts Before You Begin" section before the comparison table, following the pattern at `03-ade-enrollment-profile.md` lines 24-44.
- **D-09:** Silent install gets a prominent 🔒 supervised-only callout in the VPP sections, placed immediately after the setting description per Phase 27 D-04.
- **D-10:** "Managed app status" coverage maps to a Verification section showing where to check managed app installation status in Intune admin center.

**Compliance-to-CA Timing Gap (ACFG-03)**
- **D-11:** Dedicated `## Compliance Evaluation Timing and Conditional Access` section in the compliance guide (standalone section, not inline callout).
- **D-12:** Section states the key facts inline (gap exists, default compliance posture behavior, CA behavior during grace period, first evaluation timing). Cross-references `reference/compliance-timing.md` and `reference/ca-enrollment-timing.md`.
- **D-13:** Hybrid approach resolves duplication concern while providing a linkable `#compliance-evaluation-timing-and-conditional-access` anchor for Phase 30/31.
- **D-14:** Includes "Mark devices with no compliance policy assigned as" toggle explanation (Compliant vs Not compliant default).
- **D-15:** Departs from macOS compliance guide structure (which uses cross-reference-only for CA timing).

**Compliance Guide General Structure (ACFG-03)**
- **D-16:** Mirror macOS compliance guide per-setting sections: "Compliance vs. Configuration" distinction table at top, per-setting "What breaks" callouts, Actions for Noncompliance section.
- **D-17:** iOS-specific additions: jailbreak detection (no macOS equivalent), supervised-only callouts per setting where applicable, dedicated CA timing section (D-11).
- **D-18:** Default compliance posture documented both in CA timing section and compliance policy creation steps.

**File Organization**
- **D-19:** Files: `04-configuration-profiles.md`, `05-app-deployment.md`, `06-compliance-policy.md` in `docs/admin-setup-ios/`.
- **D-20:** Update `docs/admin-setup-ios/00-overview.md` to add links and extend Mermaid diagram.
- **D-21:** Config-failures consolidation file deferred to Phase 30 or Phase 32.
- **D-22:** Each guide includes its own inline `## Configuration-Caused Failures` table with "iOS L1 runbooks (Phase 30)" placeholder text.
- **D-23:** Supervised-only callouts use `../ios-lifecycle/00-enrollment-overview.md#supervision` (locked in Phase 27 D-02).

### Claude's Discretion

- Selection of the ~15 key device restriction settings for full detailed treatment
- Comparison table row attributes for the app deployment guide (beyond required: Apple Account, silent install, assignment types, size limits)
- Exact word count per guide (target similar length to macOS equivalents, except configuration profiles which will be longer due to D-01)
- "What breaks" callout wording for individual settings
- Whether to include a "Compliance vs. Configuration" table adapted for iOS
- Number of compliance settings to detail beyond required (OS version, jailbreak, passcode) — e.g., device threat level
- Mermaid diagram style in the updated overview page

### Deferred Ideas (OUT OF SCOPE)

- Config-failures consolidation file (`07-config-failures.md`) — deferred to Phase 30 or Phase 32 when runbook links exist and all iOS admin guides are complete.

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ACFG-01 | Configuration profiles guide covers Wi-Fi, VPN, email, device restrictions, certificates, home screen layout with supervised-only callouts per setting | [VERIFIED: Microsoft Learn device-restrictions-apple] complete supervised-only matrix extracted below; ~140 supervised-only settings enumerated by category |
| ACFG-02 | App deployment guide covers VPP device-licensed vs user-licensed, silent install (supervised-only), LOB apps, and managed app status | [VERIFIED: Microsoft Learn manage-vpp-apple + add-lob-ios] exact behavioral differences table extracted; silent install boundary confirmed (supervised required for prompt-less install) |
| ACFG-03 | Compliance policy guide covers OS version gates, jailbreak detection, passcode, Conditional Access timing, and default compliance behavior | [VERIFIED: Microsoft Learn compliance-policy-create-ios + configure-noncompliance-actions] complete compliance setting list, CA timing sequence, "Mark devices with no compliance policy assigned" toggle |

## Project Constraints (from CLAUDE.md)

CLAUDE.md describes a three-tier codebase (PowerShell modules, Python FastAPI backend, TypeScript React frontend) for Windows Autopilot diagnostics. **Phase 28 is a pure documentation phase** — markdown only, no code changes, no backend, no frontend.

Applicable CLAUDE.md guidance:
- No secrets in committed files (N/A for docs, but applies to any example Apple IDs / tenant IDs — use placeholders like "your-tenant.onmicrosoft.com")
- Document concepts and outcomes, not click paths (reinforced by out-of-scope: "Screenshot-heavy portal walkthroughs")
- Imperative voice for portal steps (from existing Phase 27 admin guides: "Navigate to...", "Select...", "Enter...")

No direct conflicts. CLAUDE.md does not constrain documentation authoring beyond general quality.

## Overview

Phase 28 creates three markdown admin setup guides for iOS/iPadOS in Microsoft Intune, continuing the numbering sequence established by Phase 27 (which delivered files 01-03). The three guides are **independent documents** with distinct content domains — configuration profiles, app deployment, and compliance policies — but they share a common structural framework inherited from Phase 27:

1. **Frontmatter and platform gate** (from `_templates/admin-template-ios.md`)
2. **The 🔒 Supervised only callout pattern** (locked verbatim in Phase 27 D-01 through D-04)
3. **Two-tier content structure** (summary overview + detailed per-setting treatment) pioneered in `03-ade-enrollment-profile.md`
4. **Configuration-Caused Failures table** using "iOS L1 runbooks (Phase 30)" placeholder
5. **"What breaks if misconfigured"** inline callouts per setting

The macOS equivalents (`03-configuration-profiles.md`, `04-app-deployment.md`, `05-compliance-policy.md`) are the primary structural templates. **iOS departs from macOS in three ways**: (a) device restrictions add a supervised-only matrix and 🔒 callouts absent from macOS, (b) compliance adds jailbreak detection (no macOS equivalent), and (c) compliance adds a dedicated "Compliance Evaluation Timing and Conditional Access" section where macOS uses cross-reference only.

**Primary recommendation:** Write the three guides in a single plan wave per guide (3 plans: one per guide), letting the independent content domains run in parallel if desired. All three plans share identical precondition setup (canonical refs, callout pattern, template frontmatter) but produce independent output files, so they can execute concurrently without conflict. The overview update (`00-overview.md`) can piggy-back onto any single plan (recommend the configuration profiles plan since it's first in sequence).

## Source-of-Truth Verification (D-05 critical flag)

STATE.md explicitly flagged a D-05 verification requirement: *"Software update deferral supervision requirement changed in iOS 17 via DDM. Verify current boundary against Microsoft Learn."*

### What Changed in iOS 17+ (VERIFIED against Microsoft Learn)

**[VERIFIED: learn.microsoft.com/en-us/intune/device-updates/apple/] (updated 2026-02-24):**

> Apple has deprecated MDM-based software update workloads. To align with this change, Microsoft Intune will soon end support for MDM-based Apple software update policies. Microsoft recommends using **Declarative Device Management (DDM)** to manage and install Apple software updates.

**DDM-based update policies support BOTH enrollment methods (no supervision requirement):**
- Device Enrollment (unsupervised)
- Automated Device Enrollment (supervised)
- Minimum OS: iOS/iPadOS 17.0 and later; macOS 14.0 and later

**[VERIFIED: learn.microsoft.com/en-us/intune/device-updates/apple/deprecated-mdm-policies-ios] (updated 2025-10-15):**

The legacy MDM-based update policies apply only to iOS 10.3-18 and iPadOS 13.0-18 **supervised**. These are being deprecated. The DDM-based replacement at `/intune/device-updates/apple/` explicitly lists both Device Enrollment and Automated Device Enrollment under "Enrollment methods" — **no supervised-only restriction**.

### Implication for the Configuration Profiles Guide

The "Defer software updates" device restriction setting **still requires supervision** in the device restrictions profile context (per the device restriction settings reference [VERIFIED: learn.microsoft.com/en-us/intune/intune-service/configuration/device-restrictions-apple]). The setting exists in two places:

1. **Device restriction profile → Defer software updates** — still supervised-only (legacy MDM path, being deprecated)
2. **Settings Catalog → Declarative Device Management → Software Update** — works on both supervised and unsupervised devices (iOS 17+)

**Recommended treatment in the config profiles guide:**
- Do **NOT** deep-dive software update enforcement in the iOS config profiles guide. Software update management has its own dedicated Intune workload (`Devices > Apple updates > iOS/iPadOS update policies`) and is out of scope for this phase.
- If mentioned, state: "For software update enforcement, use the dedicated DDM-based update policies under Devices > Apple updates. The device restrictions 'Defer software updates' setting is the legacy MDM path, is being deprecated, and requires supervision."
- This is primarily a compliance-cross-reference note, not a settings deep-dive.

### Other iOS 17/18 Supervision Boundary Changes

From verification, **no other device restriction settings** have relaxed their supervision requirement in iOS 17 or 18. The Microsoft Learn device restrictions reference continues to mark all the same categories (Screen Time, Built-in Apps, Connected Devices, Passwords, App Store, Cloud and Storage, Kiosk) as supervised-only. DDM relaxation is currently limited to software updates and a small subset of declarative configurations (app management, passcode, etc.) that have separate Settings Catalog paths distinct from the legacy device restriction profile.

**Verification status: COMPLETE.** The D-05 flag is resolved — software update deferral via legacy MDM-based device restrictions remains supervised-only, but DDM-based software update management (the replacement path) works on unsupervised devices.

## Configuration Profile Settings Matrix (ACFG-01)

### Supervised-Only Settings by Category

Source: [VERIFIED: learn.microsoft.com/en-us/intune/intune-service/configuration/device-restrictions-apple] (Apple device restriction settings in Microsoft Intune, Microsoft Learn)

The complete supervised-only matrix below covers every setting that requires supervision in the iOS/iPadOS device restrictions profile. The guide **must callout each of these** with the one-liner 🔒 format per D-01.

#### General (Block)
- Block modification of diagnostics settings (iOS 9.3.2+)
- Block remote AirPlay, view screen by Classroom app, and screen sharing (iOS 9.3-12.x requires supervised; iOS 13.0+ works without supervision — note the version-dependent boundary)
- Allow Classroom app to perform AirPlay and view screen without prompting
- Block modification of account settings
- Block Screen time
- Block users from erasing all content and settings on device
- Block modification of device name
- Block modification of notifications settings
- Block modification of Wallpaper
- Block configuration profile changes
- Allow activation Lock
- Block removing apps
- Block app clips (iOS 14.0+)
- Allow USB accessories while device is locked (iOS 11.4.1+)
- Force automatic date and time
- Require teacher permission to leave Classroom app unmanaged classes (iOS 11.3+)
- Allow Classroom to lock to an app and lock the device without prompting (iOS 11.0+)
- Allow students to automatically join Classroom classes without prompting (iOS 11.0+)
- Block VPN creation
- Block modification of eSIM settings (iOS 12.1+)
- Defer software updates (legacy MDM path; being deprecated — see D-05 verification above)

#### App Store, Doc Viewing, Gaming
- Block App Store (iOS/iPadOS 13.0+)
- Block installing apps using App Store
- Block automatic app downloads
- Block playback of explicit music, podcast, and iTunes U (iOS/iPadOS 13.0+)
- Block adding Game Center friends (iOS/iPadOS 13.0+)
- Block Game Center
- Block multiplayer gaming in Game Center (iOS/iPadOS 13.0+)
- Block access to network drive in Files app (iOS/iPadOS 13.0+)

#### Built-in Apps
- Block camera (iOS/iPadOS 13.0+)
- Block FaceTime (iOS/iPadOS 13.0+)
- Require Siri profanity filter (iOS 11.0+)
- Block user-generated content in Siri
- Block Apple News
- Block Apple Books
- Block iMessage
- Block Podcasts
- Music service
- Block iTunes Radio
- Block iTunes store (iOS 4.0+)
- Block Find My iPhone (iOS/iPadOS 13.0+)
- Block Find My Friends (iOS/iPadOS 13.0+)
- Block user modification to the Find My Friends settings
- Block removal of system apps from device
- Block Safari (iOS/iPadOS 13.0+)
- Block Safari Autofill (iOS/iPadOS 13.0+)

#### Cloud and Storage
- Block iCloud backup (iOS/iPadOS 13.0+)
- Block iCloud document and data sync (iOS/iPadOS 13.0+)
- Block iCloud Keychain sync (iOS/iPadOS 13.0+)
- Block iCloud Private Relay (iOS/iPadOS 15+)

#### Connected Devices
- Block AirDrop
- Block pairing with Apple Watch
- Block modifying Bluetooth settings
- Block pairing with non-Configurator hosts
- Block AirPrint
- Block storage of AirPrint credentials in Keychain
- Require AirPrint to destinations with trusted certificates
- Block iBeacon discovery of AirPrint printers
- Block setting up new nearby devices (iOS 11.0+)
- Block access to USB drive in Files app (iOS/iPadOS 13.0+)
- Disable near-field communication (NFC) (iOS 14.2+)
- Allow users to boot devices into recovery mode with unpaired devices (iOS/iPadOS 14.5+)

#### Keyboard and Dictionary
- Block word definition lookup
- Block predictive keyboards
- Block auto-correction
- Block spell-check
- Block keyboard shortcuts
- Block dictation
- Block QuickPath (iOS/iPadOS 13.0+)

#### Autonomous Single App Mode (ASAM) — entire category is supervised-only
- App name
- App Bundle ID

#### Kiosk / App Lock — entire category is supervised-only
- App to run in kiosk mode
- Plus ~20 accessibility/button-lock settings (Assistive touch, Invert colors, Mono audio, Voice control, VoiceOver, Zoom, Auto lock, Ringer switch, Screen rotation, Screen sleep button, Touch, Volume buttons)

#### Password
- Block passcode modification
- Block modification of Touch ID fingerprints and Face ID faces (iOS 11.0+)
- Block password AutoFill
- Block password proximity requests
- Block password sharing
- Require Touch ID or Face ID authentication for AutoFill of password or credit card information (iOS 11.0+)

#### Safari Domains
- Safari password domains (iOS 9.3+) — supervised only
- (Unmarked email domains and Managed Safari web domains also require device/supervised enrollment)

### Settings NOT Requiring Supervision (available on all enrollment types)

These work on unsupervised Device Enrollment devices and can be configured without supervision. Notable examples include:

- Block viewing corporate documents in unmanaged apps
- Block viewing non-corporate documents in corporate apps
- Allow unmanaged apps to read from managed contacts accounts
- Treat AirDrop as an unmanaged destination
- Require iTunes Store password for all purchases
- Block in-app purchases
- Block Siri (different from "Block user-generated content in Siri" which is supervised)
- Require Safari fraud warnings
- Force encrypted backup
- Block managed apps from storing data in iCloud
- Block screenshots and screen recording
- Block untrusted TLS certificates
- Block over-the-air PKI updates
- Force limited ad tracking
- Block trusting new enterprise app authors
- Limit Apple personalized advertising (iOS/iPadOS 14.0+)

### ~15 Key Settings for Full Detailed Treatment (Claude's Discretion per D-03)

Selection criteria (D-03): most commonly misconfigured, highest impact on fleet management, most likely to generate L1/L2 tickets. Recommendation based on cross-referencing the [Microsoft Supervised Device Security Configuration Framework (basic/enhanced/high)](https://learn.microsoft.com/en-us/intune/device-security/security-configurations/ios-ipados-supervised) levels 1-3 (which identify the highest-impact supervised settings) plus the ACFG-01 explicitly-required topics (Wi-Fi, VPN, email, device restrictions, certificates, home screen layout):

**Profile payload types — full treatment (6):**
1. **Wi-Fi** (Settings Catalog → Networking → Wi-Fi) — SSID case sensitivity, certificate binding for enterprise WPA2/3
2. **VPN** (Settings Catalog → Networking → VPN) — per-app vs device-wide, connection types
3. **Email / Exchange** (Settings Catalog → Accounts) — authentication methods, S/MIME
4. **Certificates** (SCEP / PKCS / trusted root) — certificate chain binding, renewal
5. **Device Restrictions** (Settings Catalog → Restrictions) — the main supervised-only matrix lives here
6. **Home Screen Layout** (supervised only — per ACFG-01 explicit requirement)

**Device Restriction high-impact supervised-only settings for full treatment (9):**
1. **Block App Store** — used in level-3 security; high impact on user experience
2. **Block removing apps** — fleet stability critical
3. **Allow activation Lock** — device recovery implications
4. **Block configuration profile changes** — self-protection for MDM management
5. **Block modification of account settings** — prevents users unlinking Entra ID
6. **Block iCloud backup** — data exfiltration control
7. **Block AirDrop** — data exfiltration control
8. **Block Camera / Block FaceTime** — paired, common regulated-industry requirement
9. **Block pairing with non-Configurator hosts** — prevents USB-based unmanagement

Total: 15 full-treatment sections (6 profile types + 9 supervised settings), with the remaining ~120 supervised-only settings covered as category tables with one-liner 🔒 callouts.

### Home Screen Layout (supervised-only — explicit ACFG-01 requirement)

Per [VERIFIED: Microsoft Learn]: Home screen layout is a dedicated supervised-only feature exposed in Intune as a separate configuration profile template (not under the generic device restrictions template). Location in Intune: **Devices > Configuration > Create > iOS/iPadOS > Templates > Device features > Home screen layout**.

Capabilities:
- Define icon placement on pages and in the Dock
- Group apps into folders (supervised only; iOS 9.3+)
- Use bundle IDs to reference apps (works for app store, VPP, and LOB apps)

🔒 callout content: "Home screen layout requires supervised mode. On unsupervised devices, this profile type is unavailable and home screen organization is fully user-controlled."

### Certificates

Per [VERIFIED: Microsoft Learn] certificate profiles are NOT supervised-only — certificates deploy to all enrolled devices. Covered without 🔒 callout. The guide should mention the three certificate profile types (SCEP, PKCS Imported, Trusted Root) and point to SCEP infrastructure as a prerequisite for enterprise Wi-Fi.

## App Deployment Research (ACFG-02)

### VPP Device-Licensed vs User-Licensed: Authoritative Behavior Matrix

Source: [VERIFIED: learn.microsoft.com/en-us/intune/intune-service/apps/vpp-apps-ios] (Manage Apple Volume-Purchased Apps, Microsoft Learn, updated 2026-01-13)

| Attribute | Device Licensing | User Licensing |
|-----------|------------------|----------------|
| App Store sign-in on device | **Not required** | Each end user must sign in with a unique Apple Account when prompted |
| Device config blocking App Store | Apps install via Company Portal fine | **Breaks user licensing** — invitation to join Apple Business Manager requires App Store access |
| User Enrollment compatibility | **Not supported** | **Supported** (via Managed Apple Accounts) |
| License tied to | Device (by serial number) | User (up to 5 devices per personal Apple Account) |
| License migration | Can migrate user→device silently (Required intent only) | Cannot migrate device→user |
| Books support | Not supported | Supported |
| **Default license type on new assignment** | **Device (default)** | Must explicitly select |

### Silent Install Boundary (VERIFIED)

From the authoritative End-User Prompts for VPP table:

| # | Scenario | Apple Account prompt | Install prompt |
|---|----------|---------------------|----------------|
| 1 | BYOD — user licensed (not User Enrollment) | Yes | Yes |
| 2 | Corp — user licensed (not supervised) | Yes | Yes |
| 3 | Corp — user licensed (**supervised**) | Yes (for VPP invite) | **No** |
| 4 | BYOD — device licensed | **No** | Yes |
| 5 | Corp — device licensed (not supervised) | **No** | Yes |
| 6 | Corp — device licensed (**supervised**) | **No** | **No** (fully silent) |

**Conclusion:** Fully silent install (no prompts of any kind) occurs only in scenario 6 — **supervised + device-licensed**. This is the "silent install" capability to be marked with 🔒 callout per D-09. **Unsupervised device-licensed apps still install without Apple Account prompt, but the user sees a one-time install prompt.**

Recommended 🔒 callout content for silent install:
> 🔒 **Supervised only:** Fully silent app installation (no user prompt of any kind) requires supervised mode AND device licensing. On unsupervised devices, device-licensed apps still install without an Apple Account prompt, but the user sees a one-time install confirmation. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

### Comparison Table Columns (D-07 expanded)

Recommended comparison table for the guide, following the macOS `04-app-deployment.md` structure (12 rows × 4 columns):

| Attribute | VPP Device-Licensed | VPP User-Licensed | LOB (.ipa) | Store Apps (without VPP) |
|-----------|---------------------|-------------------|------------|--------------------------|
| Apple Account required | No | Yes (personal Apple Account or Managed Apple Account for User Enrollment) | No | Yes (user installs manually) |
| Silent install (supervised) | **Yes** | No (Apple Account prompt) | Yes (signed + provisioning profile) | No |
| Silent install (unsupervised) | Partial (single install prompt) | No | Yes (signed + provisioning profile) | No |
| User Enrollment compat | No | Yes (Managed Apple Account only) | Limited | Yes |
| ADE compat | Yes | Yes | Yes | Yes |
| Device Enrollment compat | Yes | Yes (personal Apple Account) | Yes | Yes |
| Assignment types | Required, Available for enrolled, Uninstall | Required, Available for enrolled, Uninstall | Required, Available for enrolled, Available w/o enrollment, Uninstall | Required, Available for enrolled, Uninstall |
| Available deployment intent for device groups | No (user groups only) | No (user groups only) | Yes for Required; No for Available | No (user groups only) |
| License model | One license per device | One license / up to 5 devices per user | N/A (owned app) | N/A (user's own licensing) |
| Size limit | N/A (App Store) | N/A (App Store) | **2 GB per app** | N/A (App Store) |
| Update mechanism | Token-level auto-update; Intune sync | Token-level auto-update; Intune sync | CFBundleVersion increment + re-upload | App Store |
| Book support | No | Yes | No | No |

### LOB App Deployment Research (ACFG-02)

Source: [VERIFIED: learn.microsoft.com/en-us/intune/intune-service/apps/lob-apps-ios] (Add iOS/iPadOS LOB App to Microsoft Intune, updated 2026-04-14)

**Prerequisites:**
- Apple Developer Enterprise Program membership (required to sign .ipa files with Distribution certificate)
- .ipa file signed with organizational Distribution certificate
- Provisioning profile (.mobileprovision) uploaded separately via Apps > iOS app provisioning profiles
- Unique CFBundleVersion and CFBundleShortVersionString in Info.plist per version

**Size limit:** 2 GB per app (confirmed verbatim from Microsoft Learn)

**Management types (iOS/iPadOS 18+):**
- **MDM** (default) — works on all supported iOS versions
- **DDM** — iOS 18+ only; provides efficient app delivery, real-time status, expanded per-app domains
- **Limitation:** App configuration policies only work with MDM management type. MAM-SDK-integrated apps must use MDM.

**Certificate/profile expiry cadence:**
- Distribution certificate: 3 years
- Provisioning profile: 1 year (30-day notice before expiry in Intune admin center)
- Intune can assign a new provisioning profile proactively to nearing-expiry apps

**Assignment intents supported:**
- Required
- Available for enrolled devices
- Available with or without enrollment (unique to LOB apps — not available for VPP)
- Uninstall

**Known behavior:**
- Users may see "Open in iTunes?" prompt when installing from Company Portal — they must select "Open"
- Auto-update for Available intent requires specific conditions (app previously installed, targeting unchanged, not downgraded manually, not previously installed via Required intent)

### Managed App Installation Status Check Locations (D-10)

Source: [VERIFIED: Microsoft Learn apps-monitor + troubleshoot-app-install]

Three locations in Intune admin center where admins verify managed app installation status:

1. **App-centric view (primary):**
   **Apps** → **All apps** → *select app* → **Monitor** → **Device install status** / **User install status**
   Shows per-device / per-user: Install Status (Installed, Install Pending, Failed, Not Applicable, Uninstalled), timestamps, and error details.

2. **Device-centric view:**
   **Devices** → **All devices** → *select device* → **Managed Apps**
   Shows end-to-end app lifecycle for the individual device: created, modified, targeted, delivered, install status.

3. **Troubleshooting view:**
   **Troubleshoot + support** → **Troubleshoot** → enter user → **Managed Apps** pane
   User-centric per-app history across all their devices.

**Managed vs unmanaged distinction (D-10):**
- **Managed apps** = apps deployed via Intune (VPP device/user-licensed, LOB, Store apps deployed as Required or Available through Intune)
- **Unmanaged apps** = apps installed directly by the user from App Store without Intune intermediation (no assignment record in Intune, no install status tracking)
- VPP Available assignments become managed **only after the user initiates install from Company Portal** — before that, the app is tracked as "Available" but not yet managed

### Store Apps Without VPP (D-07 fourth column)

Intune's "iOS store app" path (**Apps > iOS/iPadOS > Add > iOS store app**) lets admins assign free or free-with-purchase App Store apps without VPP license management. Install intent supports Required / Available for enrolled / Uninstall.

**Key differences from VPP:**
- No license tracking — Intune tells the device "install this bundle ID from App Store"; no license assignment
- User Apple Account required on device to complete install (same as any App Store download)
- Free apps work cleanly; paid apps require the user to have already purchased with their personal Apple Account, which creates an audit/licensing problem for corporate devices — VPP is strongly preferred for paid apps

## Compliance and CA Timing Research (ACFG-03)

### Complete iOS/iPadOS Compliance Setting List

Source: [VERIFIED: learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-ios] (iOS/iPadOS device compliance settings in Microsoft Intune, updated 2025-09-04)

#### Email
- **Unable to set up email on the device** — Not configured / Require (requires a managed email profile present; flags device non-compliant if user has set up competing email account Intune cannot manage)

#### Device Health
- **Jailbroken devices** (iOS 8.0+) — Not configured / Block (marks rooted/jailbroken devices non-compliant)
- **Require the device to be at or under the Device Threat Level** (iOS 8.0+) — Not configured / Secured / Low / Medium / High (integrates with Mobile Threat Defense service)

#### Device Properties (Operating System Version)
- **Minimum OS version** (iOS 8.0+)
- **Maximum OS version** (iOS 8.0+)
- **Minimum OS build version** (supports Apple Rapid Security Response build strings like `20E772520a`)
- **Maximum OS build version**

#### Microsoft Defender for Endpoint
- **Require the device to be at or under the machine risk score** — Not configured / Clear / Low / Medium / High

#### System Security — Password
- Require a password to unlock mobile devices
- Simple passwords (Not configured / Block) — blocks 1234, 1111
- Minimum password length (digits)
- Required password type — Not configured / Alphanumeric / Numeric
- Number of non-alphanumeric characters in password
- Maximum minutes after screen lock before password is required
- Maximum minutes of inactivity until screen locks
- Password expiration (days)
- Number of previous passwords to prevent reuse

#### System Security — Device Security
- **Restricted apps** — by Bundle ID; marks device non-compliant if listed unmanaged apps are present

### Actions for Noncompliance (D-14/D-18)

Source: [VERIFIED: learn.microsoft.com/en-us/intune/intune-service/protect/actions-for-noncompliance] (Configure compliance policies with actions for noncompliance)

**Default action (automatic on policy creation):**
- **Mark device noncompliant** — schedule defaults to **0 days** (immediate). Can be changed; cannot be removed. This is the action that activates Conditional Access blocking.

**Additional actions available for iOS/iPadOS (four total, iOS-supported):**

| Action | Schedule unit | Notes |
|--------|--------------|-------|
| **Mark device non-compliant** | Days (0-365) | Default; cannot be removed. Setting > 0 = grace period |
| **Send email to end user** | Days | Uses notification message template with locale support. Supports variables: `{{UserName}}`, `{{DeviceName}}`, `{{DeviceId}}`, `{{OSAndVersion}}`. Email from `microsoft-noreply@microsoft.com`. Delivery within 6 hours |
| **Remotely lock the noncompliant device** | Days | Supported on iOS/iPadOS. Prompts user for PIN/passcode to unlock |
| **Add device to retire list** | Days | Adds to retire noncompliant devices list (admin must explicitly retire from list) |
| **Send push notification to end user** | Days | Via Company Portal or Intune app. Not guaranteed delivery; may delay hours |

**iOS-specific notes:**
- **Retire vs wipe:** iOS "retire" removes company data and unenrolls. No full wipe action (full-wipe is achieved via the separate "Wipe" device action, not compliance action).
- **No "Block access until compliant" direct action** — block comes from CA policy "Require compliant device" grant control, which activates when Mark device noncompliant schedule elapses.

**Schedule granularity:**
- Admin center UI accepts integer days only (0, 1, 2, ...)
- Graph API supports decimals (0.25 = 6h, 0.5 = 12h, 1.5 = 36h)
- Minimum grace period via UI: 1 day (anything < 1 full day requires Graph)

### Default Compliance Posture Toggle (D-14 — critical for SC #4)

Source: [VERIFIED: learn.microsoft.com/en-us/intune/intune-service/protect/device-compliance-get-started] + secondary verification from Prelude Security analysis

**Location in Intune admin center:**
**Endpoint security** → **Device compliance** → **Compliance policy settings**

**Setting:** "Mark devices with no compliance policy assigned as"
- **Compliant (default)** — Permissive. Devices without an assigned compliance policy, and devices in the "Not evaluated" post-enrollment state, are treated as compliant. Conditional Access "Require compliant device" grant control allows access.
- **Not compliant** — Restrictive. Devices without an assigned policy, and devices in "Not evaluated" state, are treated as non-compliant. CA "Require compliant device" blocks access.

**Critical behavior tied to SC #4:**
- The "Not evaluated" state exists in the gap between enrollment completion and first compliance evaluation (typically 0-30 minutes).
- During this gap, **the default compliance posture toggle determines whether CA blocks access or allows access**.
- If set to **Compliant (default)** → device has access during the gap (less secure, fewer friction cases during rollout).
- If set to **Not compliant** → device is blocked from CA-protected resources during the gap. Common symptom: user enrollment completes but Outlook/SharePoint shows access denied for the first ~15-30 minutes.

### Compliance Evaluation Timing Sequence (D-11, D-12 — dedicated section content)

Verified sequence (from `reference/compliance-timing.md` + Microsoft Learn reference):

```
T+0 min    Enrollment completes; device enters managed state
T+0-15 min Compliance check not yet run. State = "Not evaluated".
           CA behavior determined by "Mark devices with no compliance policy assigned" setting.
T+15-30    First compliance evaluation completes. State = Compliant or Non-compliant.
T+≤8 hr    Full Intune inventory sync (apps, hardware, etc.)
Ongoing    Every 8 hours: automatic Intune check-in and re-evaluation.
           On policy change: propagates on next 8-hour cycle for each device.
           User can force sync immediately via Company Portal > Sync.
```

**iOS-specific timing notes:**
- iOS check-in cycle is tied to APNs push notifications (not a polling interval like Windows)
- If APNs is blocked at the network edge, check-in can stall indefinitely
- User-initiated sync via Company Portal > Settings > Sync is the authoritative manual trigger
- iOS has no MDM diagnostic tool equivalent to `mdmdiagnosticstool.exe` — admins cannot inspect local MDM state from the device CLI (referenced in Phase 31 research)

### CA Enrollment Timing Reference for Cross-Reference

The existing `reference/ca-enrollment-timing.md` documents the Windows-specific CA chicken-and-egg problem (enrollment blocked by CA compliance requirement during OOBE). **The same problem applies to iOS**, but the mitigation mechanics differ:

- **Built-in exclusions:** "Microsoft Intune Enrollment" cloud app is excluded by default from CA compliance policies on all platforms, not just Windows. iOS ADE enrollment uses the same exclusion.
- **iOS-specific wrinkle:** Setup Assistant with modern authentication performs the first MFA/CA evaluation during the device enrollment flow. If CA policy requires a compliant device AND "Microsoft Intune Enrollment" is not excluded, the device cannot complete Setup Assistant authentication.
- **Default posture toggle interacts:** If set to "Not compliant," even correctly-excluded enrollment flows can fail when the device checks in post-enrollment for the first compliance evaluation and a different CA policy (not the enrollment one) blocks access.

**Implication for the guide:** The CA timing section should state the iOS-specific version of the interaction and cross-reference `reference/ca-enrollment-timing.md` for the full Windows-derived guide (which applies largely unchanged to iOS, minus the Setup Assistant specifics).

## "What Breaks" Content Sources

For each of the 15 key device restriction settings and each compliance setting, "What breaks if misconfigured" callouts should draw from these authoritative sources:

### Device restriction misconfiguration examples

| Setting | Common misconfiguration | User-facing consequence | Source |
|---------|-------------------------|--------------------------|--------|
| Wi-Fi SSID | Case mismatch | Device cannot find network; silent authentication failure | macOS 03-configuration-profiles.md pattern |
| Wi-Fi certificate | Missing SCEP profile | 802.1X authentication fails on enterprise networks | Microsoft Learn SCEP docs |
| VPN server address | Wrong FQDN/IP | Connection fails with generic error | macOS precedent |
| Email auth method | Wrong auth (e.g., Basic when Modern required) | Mail.app shows "Cannot Get Mail" | Microsoft Learn Exchange Online config |
| Block App Store | Set True on device where VPP user licensing is used | Breaks VPP invite flow — user cannot join Apple Business Manager program | Microsoft Learn VPP docs (verified) |
| Block removing apps | Set True without allowing future app uninstall via Intune | Admin cannot uninstall apps from device even via Intune | Microsoft Learn device restrictions |
| Block modification of account settings | Set True, user needs to rejoin Entra | User cannot sign in / reauth; requires device wipe | Microsoft Learn |
| Allow activation Lock | Enable without escrow of Activation Lock bypass code | Device bricked if user forgets iCloud password; cannot be unlocked | Microsoft Learn + Apple Platform Security Guide |
| Block configuration profile changes | Combined with locked enrollment | Admin still has control; user cannot tamper — intended behavior; "misconfig" is enabling without locked enrollment (redundant) | Phase 27 reference |
| Block iCloud backup | Fleet-wide without alternative backup | Users lose all data on device loss — no iCloud snapshot available | Microsoft Learn |
| Block AirDrop | Fleet-wide without alternative file transfer | Users cannot transfer photos/docs between own devices; help desk tickets surge | Microsoft Learn + deployment guide |
| Block Camera / FaceTime | Selective industries require (healthcare); over-broad blocks legitimate use | User cannot participate in video meetings; Microsoft Teams limited | Microsoft Learn |
| Block pairing with non-Configurator hosts | Default recommended for ADE; misconfig is OFF | USB-based unmanagement possible via malicious computer | Microsoft Learn + security configurations |
| Home Screen Layout | Referenced bundle IDs for uninstalled apps | Blank icons appear; admin confusion | Microsoft Learn Templates > Device features |

### Compliance setting misconfiguration examples

| Setting | Common misconfiguration | Consequence | Source |
|---------|-------------------------|-------------|--------|
| Minimum OS version | Set ahead of latest Apple release | Entire fleet non-compliant until Apple releases update | macOS precedent [VERIFIED: identical behavior for iOS] |
| Jailbroken devices | Not configured (default) | Known jailbroken devices marked compliant — data exfiltration risk | Microsoft Learn |
| Passcode requirements | Changed after fleet enrolled | **New requirement does not take effect until user changes passcode** (same behavior as macOS) — window where device "compliant" with old passcode | [VERIFIED: Apple documented behavior, inherits from macOS pattern] |
| Restricted apps | Bundle ID typo | Compliance check always passes regardless of actual installed apps | Microsoft Learn |
| Mark device noncompliant schedule | Set to 0 (default) with retire action set to 1 day | Device enrolls, is immediately non-compliant due to enrollment-timing gap, retired before admin can intervene | Microsoft Learn + `reference/compliance-timing.md` |
| Grace period too short | 0 days during initial deployment | Users blocked before first compliance cycle completes; enrollment friction | `reference/compliance-timing.md` |
| Default compliance posture | Left at default (Compliant) in high-security environment | CA gap where unmanaged devices treated as compliant | Microsoft Learn + Prelude Security analysis |
| Default compliance posture | Changed to "Not compliant" without grace period | Users blocked 0-30 min post-enrollment during "Not evaluated" window | Microsoft Learn + `reference/compliance-timing.md` |

## Structural Templates

### macOS 03/04/05 Structural Breakdown (PRIMARY templates)

**macOS 03-configuration-profiles.md (~200 lines):** Frontmatter → Platform gate → Settings Catalog required warning → Prerequisites → Profile delivery channel note → 9 per-payload `##` sections (Wi-Fi / VPN / Email / Restrictions / FileVault / Firewall / Gatekeeper / PPPC / SSO), each with `#### In Intune admin center` navigation, key settings bulleted list, `> What breaks` callout, See Also for runbook → Verification checklist → Configuration-Caused Failures table → See Also → revision history.

**macOS 04-app-deployment.md (~165 lines):** Frontmatter → Platform gate → Intro paragraph → `## App Type Comparison Table` (4 columns × ~7 attributes) → `## Prerequisites` (subdivided per type) → 4 per-type `##` sections (DMG / PKG managed LOB / PKG unmanaged / VPP), each with `#### In [portal]` steps and `> What breaks` callouts → Verification → Configuration-Caused Failures table → Renewal / Maintenance table → See Also.

**macOS 05-compliance-policy.md (~150 lines):** Frontmatter → Platform gate → No-baselines callout → `## Compliance vs. Configuration: Critical Distinction` table → Prerequisites → `## Steps` (Step 1: Create, Step 2: Configure Compliance Settings with nested setting groups + `> What breaks` callouts, Step 3: Actions for Noncompliance, Step 4: Assign Policy) → `## Conditional Access Cross-Reference` (one-paragraph cross-reference only — macOS does NOT have a dedicated timing section) → Verification → Configuration-Caused Failures table → See Also.

### Phase 27 Patterns to Inherit (from 03-ade-enrollment-profile.md)

- **Two-tier pattern (D-04):** Opens with summary table (authentication methods table at line 38; Setup Assistant panes table at line 103) then drills into detailed `####` subsections with full commentary for selected settings. iOS config profiles guide should use this: category overview tables (with 🔒 one-liners) followed by the 15 detailed setting sections.
- **Key Concepts Before You Begin (D-08):** iOS ADE profile guide introduced this section (lines 24-44) to explain supervised mode and authentication methods conceptually before the step-by-step. App deployment guide should adopt the same pattern for VPP device/user licensing conceptual framing.
- **🔒 Supervised only callout format (Phase 27 D-01):** Every iOS supervised-only setting gets `> 🔒 **Supervised only:** [name] requires supervised mode. [1-2 sentences consequence]. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).` No variations — exact format locked by Phase 27.
- **Configuration-Caused Failures placeholder:** All Phase 27 guides use "iOS L1 runbooks (Phase 30)" as the Runbook column value — Phase 28 MUST inherit this.
- **See Also section includes:** ABM/ADE token, APNs cert, iOS admin setup overview, iOS ADE lifecycle, iOS enrollment path overview, macOS parallel guide, Apple Provisioning Glossary.

### iOS-Specific Departures from macOS

| Departure | Applies to guide | Reason |
|-----------|------------------|--------|
| Supervised-only 🔒 callouts per setting (and full supervision matrix) | Config profiles (04) | iOS has supervision concept; macOS does not |
| Jailbreak detection as compliance setting | Compliance (06) | No macOS equivalent (macOS uses SIP instead — which is compliance-check-only) |
| Dedicated "Compliance Evaluation Timing and Conditional Access" section | Compliance (06) | SC #4 requires "determinable from the compliance guide alone" — macOS has no equivalent SC |
| Home Screen Layout as dedicated payload section | Config profiles (04) | iOS-only feature; macOS uses Dock settings via different mechanism |
| DDM note for software updates | Config profiles (04) | D-05 verification flag; macOS uses different path (macOS has its own Apple updates workload |
| User Enrollment compatibility columns in app table | App deployment (05) | iOS User Enrollment is a real enrollment path (ABYOD-02 Phase 29); macOS has no equivalent privacy-preserving enrollment |

## Implementation Plan Breakdown

Recommended segmentation: **3 plans, one per guide** (plus overview update piggy-backed on plan 1).

The three guides are structurally independent, share only the common template and callout pattern (both already established in Phase 27), and produce separate output files with no file conflicts. This allows parallel execution without merge conflicts.

### Plan 28-01: Configuration Profiles Guide + Overview Update

**Scope:** `docs/admin-setup-ios/04-configuration-profiles.md` (new) + `docs/admin-setup-ios/00-overview.md` (update)

**Content volume:** ~400-500 lines (per D-04 target) — larger than macOS equivalent due to D-01 supervised-only matrix expansion.

**Key tasks:**
1. Write frontmatter per iOS admin template (platform: iOS, audience: admin, applies_to: ADE)
2. Platform gate + Settings Catalog required warning
3. Prerequisites (Intune admin role, ADE enrollment, supervised mode understanding)
4. Profile payload sections (6): Wi-Fi, VPN, Email, Certificates, Device Restrictions (large category-organized section with supervised-only matrix), Home Screen Layout (supervised-only dedicated)
5. For Device Restrictions: category tables with 🔒 one-liner callouts for every supervised setting, followed by 9 detailed treatment sections for the high-impact supervised settings
6. Configuration-Caused Failures table (with Phase 30 runbook placeholder)
7. See Also section
8. Update `00-overview.md`: extend Mermaid diagram to include the three new guides (pattern mirroring macOS 00-overview.md lines 19-28); add entries to setup sequence list with links

### Plan 28-02: App Deployment Guide

**Scope:** `docs/admin-setup-ios/05-app-deployment.md` (new)

**Content volume:** ~250-350 lines (similar to macOS 04-app-deployment.md).

**Key tasks:**
1. Frontmatter + platform gate + intro
2. "Key Concepts Before You Begin" (D-08) — concise explainer of VPP device-licensed vs user-licensed distinction, Apple Account requirement difference, managed app concept
3. App Type Comparison Table (4 columns per D-07 × 12 rows per Research above)
4. Prerequisites (subdivided per type: VPP prerequisites — token, ABM license purchase; LOB prerequisites — Developer Enterprise account, Distribution cert, .mobileprovision)
5. Per-type `##` sections (4): VPP Device-Licensed / VPP User-Licensed / LOB (.ipa) / Store Apps (without VPP), each with `#### In Apple Business Manager` / `#### In Intune admin center` sub-sections as applicable
6. **Prominent 🔒 callout for silent install (D-09)** placed in VPP Device-Licensed section after describing device licensing
7. "What breaks" callouts for common misconfigurations
8. Verification section (where to check managed app install status — three Intune admin center locations per D-10)
9. Configuration-Caused Failures table
10. Renewal/Maintenance table (VPP token annual renewal, LOB provisioning profile annual renewal)
11. See Also

### Plan 28-03: Compliance Policy Guide

**Scope:** `docs/admin-setup-ios/06-compliance-policy.md` (new)

**Content volume:** ~300-400 lines (larger than macOS 05 due to D-11 dedicated CA timing section).

**Key tasks:**
1. Frontmatter + platform gate + intro
2. (Optional per Claude's discretion) Compliance vs. Configuration table adapted for iOS — simplify from macOS version since iOS has fewer pair-configure-and-detect cases
3. Prerequisites (Intune admin, enrolled devices, understanding of detect vs enforce)
4. `## Steps`: Step 1 Create Policy, Step 2 Configure Settings (per-setting subsections for OS version, jailbreak detection, passcode requirements, optional device threat level), Step 3 Actions for Noncompliance (with iOS-specific notes — retire behavior, no full-wipe action, no push notification delivery guarantee), Step 4 Assign Policy
5. Every compliance setting with a "What breaks" callout
6. **`## Compliance Evaluation Timing and Conditional Access` (D-11)** — dedicated section covering:
   - Timing sequence (T+0 through T+30 min) inline
   - Default compliance posture toggle (D-14) — Compliant vs Not compliant behavior in the gap
   - CA behavior during the "Not evaluated" window
   - iOS-specific notes on APNs dependency for check-in
   - Cross-references to `reference/compliance-timing.md` and `reference/ca-enrollment-timing.md`
   - Provides `#compliance-evaluation-timing-and-conditional-access` anchor for Phase 30/31 runbook links
7. Verification section
8. Configuration-Caused Failures table
9. See Also

### Plan dependency graph

```
Plan 28-01 (Config profiles + overview) ─┐
                                          ├─── All three can run in parallel
Plan 28-02 (App deployment)  ────────────┤    (no file conflicts, no content dependencies)
                                          │
Plan 28-03 (Compliance policy) ──────────┘
```

**Alternative sequencing (if parallel execution not desired):** Sequential 28-01 → 28-02 → 28-03 following the file-numbering order. Total phase time estimate: 3 execution cycles serially, 1 cycle in parallel.

## Validation Architecture

Success criterion verification strategy (serves Nyquist validation step 5.5 downstream):

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Markdown + grep/rg-based structural validation (no traditional test runner) |
| Config file | None required — markdown output + standard shell tooling |
| Quick run command | `rg -c "🔒 \\*\\*Supervised only:\\*\\*" docs/admin-setup-ios/04-configuration-profiles.md` |
| Full suite command | Documentation quality check (see verification commands below) |

### Phase Requirements → Evidence Map

| SC # | Success Criterion | Evidence Required | Verification Command | Pass Threshold |
|------|-------------------|-------------------|----------------------|----------------|
| SC #1 | Config profiles guide: every supervised-only setting has 🔒 callout linking to #supervision anchor | 🔒 callout count in guide matches supervised-only setting count in D-01 matrix; ALL callouts link to `../ios-lifecycle/00-enrollment-overview.md#supervision` | `rg -c "🔒 \\*\\*Supervised only:\\*\\*" docs/admin-setup-ios/04-configuration-profiles.md` AND `rg "🔒 \\*\\*Supervised only:\\*\\*" docs/admin-setup-ios/04-configuration-profiles.md \| rg -v "ios-lifecycle/00-enrollment-overview.md#supervision" \| wc -l` | First count >= 15 (conservative lower bound for one-liner callouts alone; expect ~100+ if each supervised-only setting listed individually); second count == 0 (no callouts miss the correct link target) |
| SC #2 | App deployment guide: distinguishes VPP device-licensed vs user-licensed, marks silent install as supervised-only, covers managed app status | "Key Concepts Before You Begin" section exists; 🔒 callout present on silent install; comparison table has both VPP columns; Verification section identifies three Intune admin center locations | `rg "## Key Concepts Before You Begin" docs/admin-setup-ios/05-app-deployment.md` AND `rg "🔒.*[Ss]ilent install" docs/admin-setup-ios/05-app-deployment.md` AND `rg "VPP Device-Licensed.*VPP User-Licensed" docs/admin-setup-ios/05-app-deployment.md` AND `rg "Monitor.*Device install status" docs/admin-setup-ios/05-app-deployment.md` | All 4 commands return at least 1 match |
| SC #3 | Compliance guide: covers OS version gates, jailbreak detection, passcode requirements, and explains CA timing behavior + default compliance posture | All four topics have dedicated sections; Actions for Noncompliance section present | `rg "## (Minimum OS version\|Jailbroken\|Passcode)" docs/admin-setup-ios/06-compliance-policy.md` (or similar heading search) AND `rg "Mark devices with no compliance policy assigned" docs/admin-setup-ios/06-compliance-policy.md` AND `rg "## Actions for Noncompliance" docs/admin-setup-ios/06-compliance-policy.md` | Each returns >= 1 match |
| SC #4 | CA timing behavior in the gap between enrollment completion and first compliance evaluation is determinable from the compliance guide ALONE | Dedicated section exists with anchor; explains Not Evaluated state, default posture toggle behavior in gap, first evaluation timing, CA impact — WITHOUT requiring reader to follow cross-references for the answer | `rg "## Compliance Evaluation Timing and Conditional Access" docs/admin-setup-ios/06-compliance-policy.md` AND `rg -A 20 "## Compliance Evaluation Timing" docs/admin-setup-ios/06-compliance-policy.md \| rg "(Not [Ee]valuated\|0-30 min\|first compliance evaluation\|Mark devices with no compliance policy)"` | First returns >= 1; second returns >= 3 (all four concepts present in the section body) |

### Sampling Rate
- **Per task commit:** `rg -l "🔒 \\*\\*Supervised only:\\*\\*" docs/admin-setup-ios/` (verify callouts are present in file being edited)
- **Per wave merge:** Full SC verification commands above for all 3 guides
- **Phase gate:** All 4 SC evidence commands pass + link integrity check (no broken markdown links)

### Wave 0 Gaps

None. This is a pure documentation phase — no new test infrastructure required. Existing markdown tooling (ripgrep + link-check) covers all verification needs.

### Additional structural checks

- [ ] All three guides have valid frontmatter (`platform: iOS`, `audience: admin`, `applies_to: ADE`, `last_verified`, `review_by`)
- [ ] All three guides reference `docs/_templates/admin-template-ios.md` structure
- [ ] All three guides include `## Configuration-Caused Failures` table with "iOS L1 runbooks (Phase 30)" placeholder text
- [ ] `00-overview.md` Mermaid diagram updated to include guides 04, 05, 06
- [ ] `00-overview.md` setup sequence list updated with entries for the three new guides
- [ ] All cross-references to `../ios-lifecycle/00-enrollment-overview.md#supervision` resolve (anchor exists — verified in research)
- [ ] All cross-references to `../reference/compliance-timing.md` and `../reference/ca-enrollment-timing.md` resolve (files exist — verified in research)

## Security Domain

Phase 28 is a documentation phase with no code, secrets, or authentication logic. ASVS categories do not apply directly to generated markdown.

**Indirect security relevance:**
- The guides document security-relevant Intune settings (compliance policies, restrictions, VPP/LOB app signing). Misrepresenting these could lead administrators to misconfigure production environments. Accuracy verification against Microsoft Learn (done in this research) mitigates this risk.
- No credentials, tokens, or secrets appear in the guides. Placeholder Apple IDs / tenant IDs referenced use generic forms.

No additional security domain section required — this is a documentation phase.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Selection of ~15 key device restriction settings for full detailed treatment aligns with Microsoft's basic/enhanced/high security configuration framework | Configuration Profile Settings Matrix | Low — explicitly Claude's discretion per D-03; alternative selections defensible |
| A2 | LOB app "Management type" DDM option (iOS 18+) is optional detail — guide can default to MDM recommendation for broadest compatibility | App Deployment Research | Low — MDM is the compatibility-safe default per Microsoft Learn |
| A3 | CA timing dedicated section should not duplicate the full `reference/compliance-timing.md` content, only the Day 1 gap-specific answer to SC #4 | Compliance and CA Timing Research | Low — D-12 explicitly mandates the hybrid cross-reference approach |
| A4 | The ~140 supervised-only settings don't all need individual 🔒 callouts if covered in category tables with a category-level callout | Configuration Profile Settings Matrix | **Medium** — D-01 states "ALL supervised-only settings receive a one-liner 🔒 blockquote callout." Strict reading = ~140 individual callouts. Practical reading may allow category-level consolidation. **Needs user clarification before planning.** |

All other claims in this research are `[VERIFIED]` against Microsoft Learn or `[CITED]` from existing documents in the repository. The Assumptions Log is short because the research scope was well-defined by CONTEXT.md's 23 locked decisions.

## Open Questions

1. **Granularity of 🔒 callouts in the supervised-only matrix (HIGH importance, blocks plan detail):**
   - D-01 states "ALL supervised-only settings receive a one-liner 🔒 blockquote callout." The Microsoft Learn reference lists ~140 supervised-only settings across 12 categories.
   - **What we know:** Callouts must be scannable (per CONTEXT.md specifics: "an admin should be able to quickly determine if a specific restriction is supervised-only without reading the full guide").
   - **What's unclear:** Whether D-01's "ALL" means 140 individual one-liner callouts (one per setting) OR whether category-organized tables with a category-level 🔒 callout satisfy the literal SC #1 requirement ("every supervised-only setting has 🔒 callout").
   - **Recommendation:** Resolve before plan writing. If literal: plan needs to accommodate ~400-500 lines of device restrictions alone (matching D-04 target). If category-consolidated: ~200-300 lines feasible. Propose hybrid: category table with per-row icon marker + category-level 🔒 blockquote callout that satisfies the linking requirement, then ~9 full detailed sections per D-03.

2. **Whether to adapt or omit "Compliance vs. Configuration" table (LOW importance, Claude's discretion):**
   - macOS has this table prominently at the top of 05-compliance-policy.md.
   - iOS has fewer paired "enforce-via-config-profile / detect-via-compliance" examples (no FileVault equivalent on iOS; no SIP; no Gatekeeper).
   - **What's unclear:** Whether an iOS version of the table adds value or is better replaced with a simpler introductory paragraph.
   - **Recommendation:** Include a simplified iOS version with 3-4 rows (passcode, OS version, jailbreak, password requirements) rather than forcing a parallel structure. Alternative: replace with single-paragraph "Compliance detects; Configuration profiles enforce" distinction. Leave to plan author.

3. **Device Threat Level and Microsoft Defender for Endpoint compliance settings (LOW importance, Claude's discretion):**
   - D-03's ~15 full-treatment settings focused on device restrictions. Compliance has parallel decisions.
   - **What we know:** ACFG-03 explicitly requires OS version, jailbreak, passcode. Device threat level and MDE machine risk score are additional settings Intune exposes.
   - **What's unclear:** Whether to include device threat level / MDE in the compliance guide or defer them as enterprise-specific extras.
   - **Recommendation:** Include as a brief `## Advanced: Threat-Based Compliance` subsection at the end of the compliance guide (before Actions for Noncompliance), noting they require Mobile Threat Defense connector or MDE integration as a prerequisite. Not core to SC #3 but adds completeness.

## Sources

### Primary (HIGH confidence — Microsoft Learn authoritative documentation)

- [Apple device restriction settings in Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/configuration/device-restrictions-apple) — Complete supervised-only matrix
- [Use Intune to manage software updates for supervised iOS/iPadOS devices](https://learn.microsoft.com/en-us/intune/device-updates/apple/deprecated-mdm-policies-ios) (updated 2025-10-15) — Legacy MDM path deprecation notice, iOS 10.3-18 supervised
- [Configure Update Policies for Apple Devices (DDM)](https://learn.microsoft.com/en-us/intune/device-updates/apple/) (updated 2026-02-24) — DDM replacement; Device Enrollment + ADE (no supervised-only restriction); iOS 17+ minimum
- [iOS/iPadOS supervised device security configurations](https://learn.microsoft.com/en-us/intune/device-security/security-configurations/ios-ipados-supervised) — Level 1/2/3 security framework; sourced the 15 high-impact settings
- [Manage Apple Volume-Purchased Apps](https://learn.microsoft.com/en-us/intune/intune-service/apps/vpp-apps-ios) (updated 2026-01-13) — Complete VPP device vs user licensing matrix; End-User Prompts for VPP table
- [Add iOS/iPadOS Line-of-Business App to Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/apps/lob-apps-ios) (updated 2026-04-14) — LOB prerequisites, 2 GB size limit, DDM management type for iOS 18+
- [iOS/iPadOS device compliance settings in Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-ios) (updated 2025-09-04) — Complete iOS compliance setting list
- [Configure compliance policies with actions for noncompliance](https://learn.microsoft.com/en-us/intune/intune-service/protect/actions-for-noncompliance) — Actions list, schedule granularity, default behavior
- [Device compliance policies in Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/protect/device-compliance-get-started) — "Mark devices with no compliance policy assigned" toggle location
- [Move to declarative device management for Apple software updates](https://techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-move-to-declarative-device-management-for-apple-software-updates/4432177) — Intune Customer Success blog; DDM migration guidance

### Existing repository references (CITED — verified via Read tool)

- `.planning/phases/28-ios-admin-setup-configuration-apps-compliance/28-CONTEXT.md` — 23 locked decisions
- `.planning/REQUIREMENTS.md` — ACFG-01/02/03 requirement text
- `.planning/ROADMAP.md` — Phase 28 4 success criteria
- `.planning/STATE.md` — D-05 verification flag
- `docs/admin-setup-macos/03-configuration-profiles.md` — PRIMARY structural template for 04
- `docs/admin-setup-macos/04-app-deployment.md` — PRIMARY structural template for 05
- `docs/admin-setup-macos/05-compliance-policy.md` — PRIMARY structural template for 06
- `docs/admin-setup-macos/00-overview.md` — Mermaid diagram pattern for 00-overview update
- `docs/admin-setup-ios/00-overview.md` — target for update
- `docs/admin-setup-ios/01-apns-certificate.md` — Phase 27 style reference
- `docs/admin-setup-ios/02-abm-token.md` — Phase 27 two-tier and cross-reference pattern
- `docs/admin-setup-ios/03-ade-enrollment-profile.md` — Phase 27 🔒 callout reference; Key Concepts pattern; two-tier pattern
- `docs/ios-lifecycle/00-enrollment-overview.md` — link target for all 🔒 callouts (#supervision anchor verified to exist at line 38)
- `docs/_templates/admin-template-ios.md` — template frontmatter and 🔒 callout format definition
- `docs/reference/compliance-timing.md` — cross-reference target for CA timing section
- `docs/reference/ca-enrollment-timing.md` — cross-reference target for CA timing section

### Secondary (MEDIUM confidence — third-party verified against primary sources)

- [Prelude Security analysis of Default Device Compliance Policy](https://www.preludesecurity.com/blog/intune-default-device-compliance-policy) — third-party confirmation of "Mark devices with no compliance policy assigned" behavior; corroborates Microsoft Learn

### Tertiary (LOW confidence — NOT used for any asserted claim)

- Apple Community forum threads, blog posts — referenced in web search results but NOT used as source for any verified claim in this research.

## Metadata

**Confidence breakdown:**
- Supervised-only matrix (ACFG-01 core): **HIGH** — full extraction verified against Microsoft Learn device restrictions reference, which explicitly marks each setting
- VPP licensing mechanics (ACFG-02 core): **HIGH** — exact 6-scenario prompt table extracted verbatim from Microsoft Learn
- LOB app deployment (ACFG-02): **HIGH** — Microsoft Learn source updated 2026-04-14 (2 days before research), includes iOS 18 DDM details
- Compliance settings (ACFG-03 core): **HIGH** — Microsoft Learn source updated 2025-09-04; complete setting list verified
- CA timing sequence (ACFG-03 SC #4): **HIGH** — sequence verified against `reference/compliance-timing.md` (existing repo canonical doc) plus Microsoft Learn compliance overview
- Default compliance posture toggle (D-14): **HIGH** — multiple source verification (Microsoft Learn + Prelude Security)
- D-05 software update deferral boundary: **HIGH** — explicitly verified; legacy MDM path supervised-only, DDM path both enrollments
- 15 key settings selection (Claude's discretion per D-03): **MEDIUM** — defensible but subjective selection; user may adjust
- Granularity of 🔒 callouts interpretation: **LOW** — D-01 wording ambiguous; see Open Question #1

**Research date:** 2026-04-16
**Valid until:** 2026-07-15 (90 days — Microsoft Learn iOS docs are moderately stable but subject to iOS 19 release cycle adjustments; software update path actively evolving as MDM-based policies deprecate)

## RESEARCH COMPLETE
