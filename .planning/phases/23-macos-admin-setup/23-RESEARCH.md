# Phase 23: macOS Admin Setup - Research

**Researched:** 2026-04-14
**Domain:** macOS device management via Apple Business Manager + Microsoft Intune — admin guide documentation
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Create `docs/admin-setup-macos/` as the folder for all macOS admin setup guide files.
- **D-02:** Accept the naming inconsistency with Phase 22's `macos-lifecycle/`. The `admin-setup-*` prefix grouping outweighs matching the single `macos-lifecycle/` precedent.
- **D-03:** One file per MADM requirement, plus an overview and a consolidated config-failures reference. Total: 7 files in `docs/admin-setup-macos/`:
  - `00-overview.md` — setup sequence, dependency diagram, links to all guides
  - `01-abm-configuration.md` (MADM-01) — ADE token creation, device assignment, MDM server linking, renewal lifecycle (~140-180 lines)
  - `02-enrollment-profile.md` (MADM-02) — Setup Assistant screen customization, Await Configuration, per-setting what-breaks (~120-160 lines)
  - `03-configuration-profiles.md` (MADM-03) — Wi-Fi, VPN, email, restrictions, FileVault, firewall with per-setting what-breaks callouts (~250-350 lines)
  - `04-app-deployment.md` (MADM-04) — DMG, PKG, VPP/Apps and Books in a single file with H2 per type, comparison table, per-type prerequisites as H3 sub-sections (~150-200 lines)
  - `05-compliance-policy.md` (MADM-05) — SIP, FileVault, firewall, Gatekeeper, password with explicit "no Intune security baselines for macOS" callout (~120-160 lines)
  - `06-config-failures.md` — Consolidated reverse-lookup table for all macOS admin setup misconfigurations (~80-120 lines)
- **D-04:** Direct 1:1 requirement-to-file traceability.
- **D-05:** If MADM-03 exceeds 350 lines, split reactively into `03a-config-profiles-network.md` and `03b-config-profiles-security.md`.
- **D-06:** Place the capability matrix as `docs/reference/macos-capability-matrix.md`.
- **D-07:** Update `docs/reference/00-index.md` (macOS References section), `docs/index.md` Cross-Platform References table, and `docs/windows-vs-macos.md` TBD forward references.
- **D-08:** Single comprehensive file (`04-app-deployment.md`) with H2 sections per app type (DMG, PKG, VPP/Apps and Books).
- **D-09:** Per-type H3 prerequisite sub-sections under the H2 Prerequisites section (DMG/PKG vs VPP prerequisites have zero overlap).
- **D-10:** Include a comparison table near the top of `04-app-deployment.md` (DMG vs PKG vs VPP: size limits, detection rules, uninstall capabilities, assignment types).
- **D-11:** Include Renewal/Maintenance section for VPP token renewal lifecycle in `04-app-deployment.md`.
- **D-12:** VPP/Apps and Books section uses dual-portal sub-sections (ABM + Intune). DMG and PKG sections are Intune-only.
- **D-13:** All guides use `docs/_templates/admin-template-macos.md` with dual-portal structure.
- **D-14:** Per-setting "what breaks if misconfigured" callouts with cross-portal symptom visibility.
- **D-15:** Configuration-Caused Failures tables include "Portal" column.
- **D-16:** Troubleshooting runbook links use `[TBD - Phase 24]` placeholder format.
- **D-17:** `platform: macOS` frontmatter for all new files.
- **D-18:** WSEC-01 (Conditional Access enrollment timing) cross-referenced from compliance policy guide for macOS-specific patterns.

### Claude's Discretion

- Exact section headings within each guide (adapt from template as needed)
- Whether `03-configuration-profiles.md` uses H3 per profile type or groups related profiles
- Exact ordering of entries in comparison tables and config-failures reference
- Whether overview includes a Mermaid dependency diagram or a numbered list
- How to structure the `06-config-failures.md` rows — by guide or by symptom category
- Whether `00-overview.md` includes a brief "macOS vs Windows admin experience" paragraph

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MADM-01 | ABM configuration guide: ADE token creation, device assignment, MDM server linking, renewal lifecycle | ABM token creation flow, sync mechanics, renewal steps, and renewal pitfalls fully documented via official Intune docs |
| MADM-02 | macOS enrollment profile guide: Setup Assistant screen customization, Await Configuration, per-setting "what breaks" callouts | All Setup Assistant screens catalogued with OS version gates; all enrollment profile settings documented including auth methods, user affinity, locked enrollment, LAPS |
| MADM-03 | macOS configuration profile guide: Wi-Fi, VPN, email, restrictions, FileVault, firewall, Intune-specific notes | Settings catalog pathway confirmed; endpoint protection template deprecation noted; what-breaks patterns established from prior phases |
| MADM-04 | macOS app deployment guide: DMG, PKG, VPP/Apps and Books — size limits, detection rules, uninstall capabilities | Size limits verified (DMG: 8 GB, PKG managed/LOB: 2 GB, PKG unmanaged: 8 GB, VPP: no documented limit); detection rules, assignment types, and uninstall behaviors confirmed per type |
| MADM-05 | macOS compliance policy guide: SIP, FileVault, firewall, Gatekeeper, password — explicit "no security baselines" note | All compliance settings documented; security baselines confirmed Windows-only (Windows 10/11, Defender, Edge, M365 Apps, HoloLens, Windows 365); no macOS baseline exists |
| MADM-06 | Intune macOS vs Windows capability matrix: feature parity gaps across enrollment, configuration, app deployment, compliance, updates | Gap categories researched and documented; key gaps identified across all five areas per requirement |
</phase_requirements>

---

## Summary

Phase 23 delivers the macOS admin setup guide suite: seven markdown files covering ABM configuration, enrollment profiles, configuration profiles, app deployment, compliance policy, and a cross-platform capability matrix. This is a documentation-writing phase, not a software implementation phase. All content must follow `docs/_templates/admin-template-macos.md` with per-setting "what breaks" callouts, dual-portal structure (ABM + Intune admin center) where applicable, and `platform: macOS` frontmatter.

The technical domain is well-documented by Microsoft Learn as of April 2026. All five topic areas (ABM/ADE, enrollment profiles, configuration profiles, app deployment, compliance) have current, authoritative official documentation. The main research task was verifying the precise constraints — size limits, setting names, available options, and the critical "no Intune security baselines for macOS" fact — so that the written guides are accurate at the setting level.

**Primary recommendation:** Write against the current Microsoft Learn documentation verified in this research. All settings, limits, and behaviors documented below are HIGH confidence from official sources updated April 2026.

---

## Standard Stack

This is a documentation phase. The "stack" is the content patterns and structural conventions established in prior phases.

### Core Patterns
| Pattern | Source | Purpose | Why Standard |
|---------|---------|---------|--------------|
| macOS admin template | `docs/_templates/admin-template-macos.md` | Base structure for all 6 guide files | Mandated by D-13; provides dual-portal structure, what-breaks callouts, renewal section |
| APv1 overview pattern | `docs/admin-setup-apv1/00-overview.md` | Model for `00-overview.md` | 60-line proven structure: setup sequence + file links |
| APv1 config-failures pattern | `docs/admin-setup-apv1/10-config-failures.md` | Model for `06-config-failures.md` | 102-line reverse-lookup with H2 per topic area |
| Win32 app packaging pattern | `docs/reference/win32-app-packaging.md` | Model for `04-app-deployment.md` | 134-line single-file multi-concept guide with H2 sections |
| APv1 vs APv2 comparison | `docs/apv1-vs-apv2.md` | Model for capability matrix table format | Feature comparison table with checkboxes |

### Frontmatter Standard (all new files)
```yaml
---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: ADE
audience: admin
platform: macOS
---
```

### File Naming Convention
Sequential integers per folder: `00-overview.md`, `01-abm-configuration.md` ... `06-config-failures.md`. Capability matrix at `docs/reference/macos-capability-matrix.md` (no sequential prefix needed — reference files use descriptive names).

---

## Architecture Patterns

### Recommended Project Structure (Phase 23 output)
```
docs/
├── admin-setup-macos/          # New folder (D-01)
│   ├── 00-overview.md          # Setup sequence, dependency diagram, file links
│   ├── 01-abm-configuration.md # MADM-01
│   ├── 02-enrollment-profile.md # MADM-02
│   ├── 03-configuration-profiles.md # MADM-03 (split to 03a/03b if >350 lines)
│   ├── 04-app-deployment.md    # MADM-04
│   ├── 05-compliance-policy.md # MADM-05
│   └── 06-config-failures.md   # Consolidated reverse-lookup
└── reference/
    └── macos-capability-matrix.md # MADM-06 (D-06)
```

### Pattern 1: Per-Guide Structure (Template-Derived)
**What:** Each guide follows `admin-template-macos.md` with platform gate blockquote, Prerequisites, Steps (with dual-portal H4 sub-sections where applicable), Verification checklist, Configuration-Caused Failures table (with Portal column), and optional Renewal/Maintenance section.
**When to use:** Every MADM-01 through MADM-05 file.
**Example from template:**
```markdown
> **Platform gate:** This guide covers macOS ADE configuration via Apple Business Manager and Intune.
> For Windows Autopilot setup, see [Windows Admin Setup Guides](../admin-setup-apv1/00-overview.md).

#### In Apple Business Manager
1. Sign in to [Apple Business Manager](https://business.apple.com).
2. Navigate to **[section]** > **[sub-section]**.

   > **What breaks if misconfigured:** [Consequence. Symptom appears in: {portal}.]
   > See: [Troubleshooting Runbook Title](TBD - Phase 24)

#### In Intune admin center
1. Sign in to [Intune admin center](https://intune.microsoft.com).
```

### Pattern 2: Configuration-Caused Failures Table (Phase 20 D-14)
**What:** Every guide has a local Configuration-Caused Failures table with Portal column. `06-config-failures.md` aggregates all of these.
**Column set:** `| Misconfiguration | Portal | Symptom | Runbook |`

### Pattern 3: App Deployment Comparison Table (D-10)
**What:** `04-app-deployment.md` opens with a comparison table before H2 per-type sections.
**Structure:**
```markdown
| Attribute | DMG | PKG (Managed LOB) | PKG (Unmanaged) | VPP/Apps and Books |
|-----------|-----|-------------------|-----------------|---------------------|
| Size limit | 8 GB | 2 GB | 8 GB | N/A (App Store) |
| Wrapping required | No | No (.pkg uploaded directly) | No | No |
| Detection rule | Bundle ID + version | Bundle ID + version | Bundle ID + version | App Store ID |
| Uninstall support | Yes (Required/Available/Uninstall) | Only when "Install as managed: Yes" (macOS 11+) | No (Known Issue) | Yes (Uninstall intent + license revoke) |
| Assignment types | Required, Available, Uninstall | Required, Available for enrolled, Uninstall* | Required, Available | Required, Available for enrolled |
| Delivery channel | IME agent | MDM (managed) or IME (unmanaged) | IME agent | MDM (Apple installs) |
| Agent requirement | Yes (macOS agent 2304.039+) | No (managed); Yes (unmanaged: 2308.006+) | Yes (2308.006+) | No |
```

### Anti-Patterns to Avoid
- **Using personal Apple ID for ADE token:** Token becomes unrenewable when employee leaves. Always use Managed Apple ID.
- **No profile assigned before first power-on:** Device proceeds through non-managed Setup Assistant. Requires wipe to fix.
- **Mixing Ignore app version on DMG Uninstall:** When `Ignore app version: No`, both bundle ID and version must match for removal; stale version deployments silently fail to uninstall.
- **Adding non-application files to Included apps list:** Intune reports installation failure if listed items are not `.app` bundles installed to `/Applications/`.
- **Endpoint protection template for new policies:** Deprecated. Use Settings Catalog for FileVault, Firewall, and Gatekeeper configuration.
- **Compliance policy as configuration vehicle:** Compliance policies check settings; they do not enforce them. Configuration profiles (Settings Catalog) apply the settings; compliance policies verify them.

---

## Don't Hand-Roll

This is a documentation phase. "Don't hand-roll" applies to content — don't write custom prose describing things that have exact official names, steps, or values. Use official terminology.

| Problem | Don't Write | Use Instead | Why |
|---------|-------------|-------------|-----|
| ABM token download path | Invented navigation | Exact path from official docs: **Preferences > Payments and Billing > Apps and Books > Content Tokens > Download** | Terminology differs from intuitive guesses |
| Setup Assistant screens | Guessed screen list | The 23-screen reference table from official docs (see Code Examples) | Some screens are OS-version-gated; list is not obvious |
| DMG size limit | "a few GB" | "8 GB" | Exact verified limit |
| PKG (managed LOB) size limit | "8 GB" | "2 GB" | Different from PKG unmanaged (8 GB) — common confusion |
| Security baselines | "Limited baselines" | "No Intune security baselines exist for macOS" | This is binary — they do not exist for macOS |
| VPP uninstall behavior on macOS | "App is removed immediately" | "Revoked license remains usable for 30-day grace period; Uninstall intent removes app and revokes license" | macOS and iOS differ here |
| Endpoint protection configuration | "Go to Endpoint protection template" | "Use Settings Catalog — endpoint protection template is deprecated" | Template still exists but new policies use Settings Catalog |

---

## MADM-01: ABM Configuration — Verified Details

### ADE Token Creation Steps (HIGH confidence — official docs)

**In Apple Business Manager:**
1. Navigate to account profile > **Preferences** > MDM server assignments
2. Add MDM server (name is for identification only)
3. Upload Intune public key (.pem) > Save
4. Download server token (.p7m file)

**In Intune admin center:**
1. Navigate to **Devices > Enrollment > Apple tab > Enrollment program tokens > Add**
2. Download public key certificate (.pem)
3. Grant permission for Microsoft to send data to Apple
4. Upload server token (.p7m)
5. Save Apple ID used (required for annual renewal)

### Token Sync Mechanics
- **Auto-sync:** Every 24 hours (incremental)
- **Manual sync:** On-demand, rate-limited to once per 15 minutes
- **Full sync:** Once per 7 days (re-fetches entire device list)
- **Multiple tokens:** Up to 3,000 tokens per Intune tenant; each token corresponds to one MDM server in ABM

### Renewal Lifecycle
| Component | Period | Consequence of Lapse | Renewal Path |
|-----------|--------|---------------------|--------------|
| ADE token (.p7m) | Annual | New devices assigned in ABM stop appearing in Intune; existing enrolled devices unaffected | Download new token from ABM > upload to Intune |
| APNs certificate | Annual | ALL MDM communication to ALL enrolled macOS (and iOS) devices stops | Renew at **Tenant administration > Connectors and tokens > Apple push notification certificate** |
| ABM Terms acceptance | On Apple update | Apple suspends syncing until new T&C accepted in ABM | Accept in ABM portal; no Intune action needed |

### Device Assignment Pitfalls
- Device must be assigned to correct MDM server before first power-on; reassignment after enrollment requires wipe
- Non-ABM-linked resellers: devices don't appear in ABM; contact reseller or use Apple Configurator (physical access required)
- Device enrolled in another MDM: previous organization must release device in ABM before reassignment
- Wrong MDM server in multi-server organizations (test vs. production): verify in ABM **Devices > [serial] > Edit MDM Server**

---

## MADM-02: Enrollment Profile — Verified Details

### Enrollment Profile Settings (all verified from official docs)

| Setting | Options | Default (new profiles) | What Breaks |
|---------|---------|----------------------|-------------|
| User Affinity | Enroll with User Affinity / Enroll without User Affinity | — | Without affinity: Company Portal won't work; user-based CA policies don't apply |
| Authentication method (with affinity only) | Setup Assistant with modern authentication (recommended) / Setup Assistant (legacy) | Modern auth | Legacy: AD FS WS-Trust 1.3 required; incompatible with modern CA policies |
| Await final configuration | Yes / No | Yes (new profiles since late 2024) | No: users reach desktop before policies apply; compliance failures immediately after setup |
| Locked enrollment | Yes / No | — | Yes prevents user from removing management profile; cannot change after enrollment without wipe |
| Local account creation (LAPS) | Configure / Not configured | Not configured | Misconfigured username template causes account creation failure during Setup Assistant |

### Setup Assistant Screens Reference (23 screens — verified April 2026)
Screens that can be hidden or shown. OS version gate in parentheses.

| Screen | Min OS | Notes |
|--------|--------|-------|
| Location Services | macOS 10.11 | |
| Restore | macOS 10.9-15.3 | macOS 15.4+: cannot be hidden; user gets alert instead |
| Apple ID | macOS 10.9 | |
| Terms and conditions | macOS 10.9 | |
| Touch ID and Face ID | macOS 10.12.4 | |
| Apple Pay | macOS 10.12.4 | |
| Siri | macOS 10.12 | |
| Diagnostics Data | macOS 10.9 | |
| Display Tone | macOS 10.13.6 | |
| FileVault | macOS 10.10 | |
| iCloud Diagnostics | macOS 10.12.4 | |
| Registration | macOS 10.9 | |
| iCloud Storage | macOS 10.13.4 | |
| Appearance | macOS 10.14 | |
| Screen Time | macOS 10.15 | |
| Privacy | macOS 10.13.4 | |
| Accessibility | macOS 11 | Hiding blocks VoiceOver on supported devices |
| Auto unlock with Apple Watch | macOS 12.0 | |
| Terms of Address | macOS 13.0 | |
| Wallpaper | macOS 14.1 | |
| Lockdown mode | macOS 14.0 | |
| Intelligence | macOS 15.0 | |
| App Store | macOS 11.1 | |
| Software update | macOS 15.4 | |
| Additional privacy settings | macOS 26.0 | |
| OS Showcase | macOS 26.1 | |
| Update completed | macOS 26.1 | |
| Get started | macOS 15.0 | |

**Key pitfall for guide:** The Restore screen (macOS 15.4+) cannot be hidden — hiding it has no effect and users receive an alert. This requires a what-breaks callout.

---

## MADM-03: Configuration Profiles — Verified Details

### Configuration Surface (Settings Catalog — recommended approach)

All macOS configuration profiles should be created via the **Settings Catalog** in Intune (Devices > Manage devices > Configuration > Create > New policy > Settings catalog). The older endpoint protection template is deprecated for new policies.

| Profile Type | Settings Catalog Path | Key Settings |
|-------------|----------------------|--------------|
| Wi-Fi | Networking > Wi-Fi | SSID, Security type, Certificate |
| VPN | Networking > VPN | VPN type, server, authentication |
| Email | Accounts > Email | Email server, auth, S/MIME |
| Restrictions | Restrictions | App Store, Handoff, Screen capture, etc. |
| FileVault | Full Disk Encryption | Enable FileVault, recovery key escrow to Intune |
| Firewall | Networking > Firewall + Security > Security preferences | Application firewall, stealth mode, block incoming |
| Gatekeeper | System Policy > System Policy Control + System Policy Managed | Allow identified developer, Enable assessment, Disable override |
| PPPC (Privacy) | Privacy > Privacy Preferences Policy Control | Per-app privacy permissions |
| Extensible SSO | Authentication > Extensible Single Sign On (SSO) | Enterprise SSO plug-in or Platform SSO |

### FileVault Notes
- **Two surfaces:** Configuration profile (enforce FileVault via Settings Catalog) AND compliance policy (verify FileVault enabled)
- **Recovery key escrow:** Configure escrow to Intune so admins can retrieve recovery keys for device recovery
- **FileVault compliance:** If not enforced via configuration profile but compliance policy requires it, user sees prompt after reaching desktop; device marked non-compliant until enabled

### Configuration Profile Delivery Channel
Configuration profiles are delivered via the **MDM channel (APNs)**, NOT the IME agent. This matters for troubleshooting: if a profile fails to deliver, check APNs connectivity, not the IME agent.

---

## MADM-04: App Deployment — Verified Details (HIGH confidence)

### DMG Apps
- **Size limit:** 8 GB
- **Agent requirement:** Intune Management Extension (macOS agent 2304.039+ for updates)
- **Wrapping:** None required; upload `.dmg` directly
- **Detection:** Bundle ID + build number (Included apps list); first app in list used for reporting
- **Assignment types:** Required, Available, Uninstall
- **Uninstall behavior:** Removes app from `/Applications/`; `Ignore app version: No` requires both bundle ID + version match for uninstall
- **Limitation:** App not automatically removed from device on device retirement — must be explicitly uninstalled first

### PKG (Managed LOB — Line-of-Business)
- **Size limit:** 2 GB (different from unmanaged PKG)
- **Wrapping:** None — upload `.pkg` directly (`.intunemac` wrapping removed August 2022)
- **Signing requirement:** Must be signed with "Developer ID Installer" certificate from Apple Developer account
- **Agent requirement:** None for managed LOB (uses MDM channel, not IME)
- **Assignment types:** Required, Available for enrolled devices, Uninstall
- **Uninstall behavior:** Only available when "Install as managed: Yes" is set AND macOS 11+ (single app, installs to `/Applications/`)
- **Detection:** Bundle ID + build number via "Included apps" list
- **Payload requirement:** `.pkg` must contain a payload (packages without payload attempt to reinstall continuously)

### PKG (Unmanaged — via IME)
- **Size limit:** 8 GB
- **Agent requirement:** Intune Management Extension version 2308.006+
- **Wrapping:** None — upload `.pkg` directly
- **Signing:** Signed OR unsigned packages supported (key distinction from managed LOB)
- **Assignment types:** Required, Available (no Uninstall intent — Known Issue)
- **Uninstall behavior:** Not supported — Known Issue; "Uninstall assignment type isn't available"
- **Supports:** Non-flat packages, component packages, unsigned packages, packages without payload, packages installing outside `/Applications/`, custom packages with scripts
- **Pre/post-install scripts:** Supported (agent 2309.007+ required); pre-install failure blocks installation

### VPP / Apps and Books
- **Size limit:** N/A — apps hosted on App Store; file size not relevant
- **Prerequisites:** ABM account, VPP location token uploaded to Intune, purchased licenses in ABM
- **Token:** Annual renewal; up to 3,000 tokens per tenant; one token per Intune tenant (cannot share between tenants)
- **License types:** Device licensing (recommended — no Apple ID sign-in required) or User licensing
- **Assignment types:** Required, Available for enrolled devices
- **Uninstall behavior:** Assign as Uninstall intent → app removed AND license revoked; macOS-specific: revoked license remains usable for 30-day grace period (Apple policy); license revoke without Uninstall intent leaves app installed
- **Delivery:** Apple installs the app (Intune tells Apple which license to assign to which device — IME not involved)
- **Available deployment intent:** Only user groups support Available intent for VPP (not device groups)
- **Auto-update:** Configurable per-token and per-app assignment; updates delivered when device checks in
- **Dual-portal flow:** Purchase in ABM > download location token from ABM > upload token to Intune > sync > assign apps

### VPP Token Renewal Steps
1. In ABM: **Preferences > Payments and Billing > Apps and Books > Content Tokens > Download** (new token)
2. In Intune admin center: **Tenant administration > Connectors and tokens > Apple VPP tokens > [token] > Edit > Upload new token**

---

## MADM-05: Compliance Policy — Verified Details (HIGH confidence)

### No Security Baselines for macOS — Confirmed
Official Intune security baselines available as of April 2026:
- Security Baseline for Windows 10 and later (multiple versions)
- Microsoft Defender for Endpoint baseline
- Microsoft 365 Apps for Enterprise baseline
- Microsoft Edge baseline
- HoloLens 2 baselines (standard and advanced)
- Windows 365 Security Baseline

**macOS: zero security baselines.** This is the most important callout for MADM-05. Admins must configure macOS security settings manually via compliance policies and configuration profiles.

### Complete macOS Compliance Policy Settings (verified from official docs)

**Device Health:**
- Require System Integrity Protection (SIP): Not configured / Require

**Device Properties:**
- Minimum OS version
- Maximum OS version
- Minimum OS build version (supports Apple Rapid Security Response build strings)
- Maximum OS build version

**Password:**
- Require a password to unlock devices: Not configured / Require
- Simple passwords: Not configured / Block
- Minimum password length
- Password type: Numeric / Alphanumeric
- Number of non-alphanumeric characters
- Maximum minutes of inactivity before password is required
- Password expiration (days)
- Number of previous passwords to prevent reuse

> **Password compliance note:** When password requirement changes, it does NOT take effect until next time user changes their password. Device remains compliant with old password until then.

**Encryption:**
- Require encryption of data storage on device: Not configured / Require (FileVault check)

**Firewall (Device Security):**
- Firewall: Not configured / Enable
- Incoming connections: Not configured / Block
- Stealth Mode: Not configured / Enable

**Gatekeeper:**
- Allow apps downloaded from: Not configured / Mac App Store / Mac App Store and identified developers / Anywhere

> **Note:** Compliance policy checks current Gatekeeper setting but does NOT enforce it. A configuration profile (Settings Catalog > System Policy) is required to enforce Gatekeeper. The compliance policy marks device non-compliant if user changes Gatekeeper to a less restrictive setting.

### Compliance vs. Configuration Distinction (critical for guide)
| Action | Compliance Policy | Configuration Profile |
|--------|------------------|----------------------|
| Verify FileVault enabled | Yes | Yes (also enforces it) |
| Verify firewall enabled | Yes | Yes (also configures it) |
| Verify Gatekeeper setting | Yes | Yes (also locks it) |
| Enforce SIP | No (compliance check only) | SIP cannot be enforced via MDM — read-only |
| Enforce encryption | No | Yes (Settings Catalog > Full Disk Encryption) |

**SIP-specific note:** System Integrity Protection (SIP) is a compliance-check-only setting in Intune. MDM cannot enable or disable SIP — it is controlled only by booting to Recovery Mode. The compliance policy only detects whether SIP is enabled or disabled.

---

## MADM-06: Capability Matrix — Research Findings

### Enrollment
| Feature | Windows | macOS |
|---------|---------|-------|
| Zero-touch enrollment method | Autopilot (hardware hash to Intune) | ADE via ABM (serial number to ABM) |
| Hardware identity | 4KB hardware hash | Serial number |
| Enrollment types | User-driven, Pre-provisioning, Self-deploying, Hybrid Entra join | ADE with user affinity, ADE without user affinity |
| Pre-provisioning (White Glove) | Yes (APv1 only) | No |
| Self-deploying/kiosk enrollment | Yes (APv1) | Partially (ADE without user affinity) |
| Hybrid domain join | Yes (APv1 + Intune Connector) | No |
| Enrollment Status Page equivalent | ESP (device phase + user phase, itemized) | Await Configuration (single lock, generic progress) |
| ESP timeout configuration | Yes (admin-configurable) | No (no enforced timeout) |
| Dynamic enrollment groups | Yes (ZTDId attribute) | Yes (enrollmentProfileName attribute) |
| Re-enrollment fires blocking screen | Yes (every enrollment) | No (first enrollment only) |

### Configuration
| Feature | Windows | macOS |
|---------|---------|-------|
| Security baselines | Yes (Windows 10/11, Defender, Edge, M365) | No |
| Settings Catalog | Yes | Yes |
| Custom OMA-URI | Yes | No (uses custom profile with plist payload) |
| BitLocker / FileVault | BitLocker (MDM) | FileVault (MDM) |
| Registry inspection via MDM | Yes | No (plist/defaults system) |
| PPPC (Privacy Preferences) | N/A | Yes (macOS only) |
| Platform SSO | No | Yes (macOS 14+ via Settings Catalog) |
| Kernel Extension policy | No | Yes (macOS-only KEXT management) |
| Declarative Device Management (DDM) | No | Yes (macOS 14+, preferred for software updates) |

### App Deployment
| Feature | Windows | macOS |
|---------|---------|-------|
| Primary formats | Win32 (.intunewin), MSI, MSIX, Store | DMG, PKG (managed/unmanaged), VPP |
| App wrapping tool | IntuneWinAppUtil.exe | None required (upload .dmg or .pkg directly) |
| Microsoft Store integration | Yes (Windows Package Manager) | No (App Store via VPP/ABM only) |
| Advanced detection rules (registry, PS) | Yes | No (bundle ID + version only for DMG/PKG) |
| Dependency declarations | Yes | No |
| Install order control | Yes (dependency chains) | No explicit ordering |
| Supersedence | Yes | No |
| Max app size (non-store) | 30 GB (Win32) | 8 GB (DMG/unmanaged PKG), 2 GB (managed PKG) |
| Uninstall from device on retirement | Yes (configured) | No (app remains after device retirement) |

### Compliance
| Feature | Windows | macOS |
|---------|---------|-------|
| Security baselines | Yes | No |
| Compliance settings | Extensive (Defender, BitLocker, firewall, encryption, password, etc.) | Limited (SIP, FileVault, firewall, Gatekeeper, password) |
| Attestation | TPM-based | N/A |
| SIP enforcement via MDM | N/A | Read-only compliance check only (cannot enforce SIP) |
| Custom compliance scripts | Yes (PowerShell) | Yes (Shell scripts via IME) |
| Userless device compliance | Yes | Not supported (per official docs: "Device compliance evaluation is not supported for userless macOS devices") |
| Grace period after non-compliance | Yes (configurable) | Yes (configurable) |

### Software Updates
| Feature | Windows | macOS |
|---------|---------|-------|
| Update management method | Windows Update for Business (Autopilot phase: "Install quality updates" in ESP) | DDM-based (macOS 14+, recommended) or MDM update policy (macOS 13 and older) |
| Force OS version | Yes | Yes (DDM or MDM policy) |
| Update deadline enforcement | Yes | Yes (DDM) |
| Deferral control | Yes (0-30 days) | Yes (0-30 days via Restrictions + DDM) |
| Windows Update for Business equivalent | Yes (native) | DDM Software Update payload (macOS 14+) |
| "Update Only" app deployment | Yes (Win32 supersedence) | No (documented gap — Intune cannot do macOS "Update Only" app deployments) |

---

## Common Pitfalls

### Pitfall 1: ADE Token Created with Personal Apple ID
**What goes wrong:** Token cannot be renewed after employee who created it leaves; management gap during renewal process.
**Why it happens:** Personal Apple ID is convenient for initial setup.
**How to avoid:** Always create ADE token with a Managed Apple ID tied to a shared organizational role (e.g., intune-admin@company.com in ABM).
**Warning signs:** ABM shows token owner as individual employee email rather than shared/role account.

### Pitfall 2: No Enrollment Profile Assigned Before Device Power-On
**What goes wrong:** Device boots through standard (non-managed) Setup Assistant without MDM enrollment. Requires factory wipe to fix.
**Why it happens:** Device was assigned to ABM MDM server but enrollment profile was not yet assigned in Intune.
**How to avoid:** Set a default enrollment profile on the ADE token immediately after token creation. All synced devices then receive a profile automatically.
**Warning signs:** Device completed Setup Assistant but does not appear in Intune Devices > macOS.

### Pitfall 3: Managed vs. Unmanaged PKG Confusion (Size Limit)
**What goes wrong:** Admin uses managed LOB app type for a large PKG (>2 GB) and upload fails; or uses unmanaged type for a signed single-app PKG unnecessarily, losing Uninstall assignment.
**Why it happens:** Two PKG deployment paths with different limits and capabilities; documentation not always clear on the distinction.
**How to avoid:** Decision tree: Does the PKG meet all four managed LOB requirements (component/single package, no bundle/DMG, signed with Developer ID Installer, has payload, installs to /Applications/)? If yes AND you need Uninstall support on macOS 11+, use managed LOB (2 GB limit). Otherwise, use unmanaged PKG (8 GB limit, no Uninstall).
**Warning signs:** Upload error mentioning file size for managed LOB; or Uninstall assignment type not appearing in managed LOB app.

### Pitfall 4: Compliance Policy Without Enforcement Profile
**What goes wrong:** Compliance policy marks devices non-compliant for firewall/Gatekeeper/FileVault, but nothing actually enforces those settings — users can change them and remain non-compliant indefinitely.
**Why it happens:** Compliance policies detect; they do not configure. Admins assume compliance policy will force settings.
**How to avoid:** Pair every compliance policy setting with a corresponding configuration profile (Settings Catalog) that enforces the setting. Compliance policy = monitoring; configuration profile = enforcement.
**Warning signs:** Devices are non-compliant for firewall but there is no configuration profile deploying firewall settings.

### Pitfall 5: Endpoint Protection Template for New macOS Configuration Profiles
**What goes wrong:** Admin creates new macOS FileVault/Firewall/Gatekeeper configuration via the old Endpoint protection template (deprecated). Template still exists but is stale.
**Why it happens:** Endpoint protection template used to be the primary path; muscle memory from Windows management.
**How to avoid:** Use Settings Catalog for all new macOS configuration profiles. Navigate to Devices > Manage devices > Configuration > Create > New policy > Settings catalog.
**Warning signs:** Profile created via "Templates > Endpoint protection" instead of Settings Catalog.

### Pitfall 6: VPP Available Intent Assigned to Device Groups
**What goes wrong:** VPP app assigned as Available to a device group. App does not appear in Company Portal for users.
**Why it happens:** Available deployment intent for VPP apps only works with user groups, not device groups (official limitation).
**How to avoid:** Assign VPP apps as Available only to user groups. Use Required for device groups.
**Warning signs:** VPP app visible in Intune assignments but not appearing in Company Portal on device.

### Pitfall 7: APNs Certificate Lapse (Silent Fleet-Wide Failure)
**What goes wrong:** APNs certificate expires and ALL MDM communication stops for ALL macOS (and iOS) devices in the tenant — not just new enrollments.
**Why it happens:** APNs certificate renewal is separate from ADE token renewal; easy to miss with two separate annual renewals.
**How to avoid:** Set calendar reminders for both certificates 30 days before expiration. Check both at Tenant administration > Connectors and tokens.
**Warning signs:** All devices simultaneously lose MDM check-in; Intune shows devices as "not checking in."

---

## Code Examples

### macOS ADE Token Creation (Summary)
```
Source: https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-macos

In Intune admin center:
  Devices > Enrollment > Apple > Enrollment program tokens > Add
  → Download public key (.pem)
  → Grant permission to send data to Apple

In Apple Business Manager:
  Account profile > Preferences > MDM Server Assignments > Add MDM Server
  → Upload public key (.pem) → Download server token (.p7m)

Back in Intune:
  → Upload server token (.p7m)
  → Save Managed Apple ID
```

### macOS Compliance Policy Creation
```
Source: https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-mac-os

Intune admin center:
  Devices > Manage devices > Compliance > Create policy
  → Platform: macOS
  
Settings available:
  Device Health: Require SIP
  System Security > Password: (7 settings)
  System Security > Encryption: Require FileVault
  System Security > Device Security: Firewall (3 settings)
  System Security > Gatekeeper: App source policy (4 options)
```

### Settings Catalog Navigation for macOS Security
```
Source: https://learn.microsoft.com/en-us/intune/solutions/end-to-end-guides/macos-endpoints-get-started

FileVault enforcement:
  Devices > Manage devices > Configuration > Create > Settings catalog
  > Full Disk Encryption

Firewall configuration:
  Devices > Manage devices > Configuration > Create > Settings catalog
  > Networking > Firewall
  > Security > Security preferences

Gatekeeper enforcement:
  Devices > Manage devices > Configuration > Create > Settings catalog
  > System Policy > System Policy Control  (Allow Identified Developer: True, Enable Assessment: True)
  > System Policy > System Policy Managed  (Disable Override: True)

Software Updates (macOS 14+, recommended):
  Devices > Manage devices > Configuration > Create > Settings catalog
  > Declarative Device Management > Software Update
```

### App Comparison Table (verified values for 04-app-deployment.md)
```
Source: 
  DMG: https://learn.microsoft.com/en-us/intune/app-management/deployment/add-dmg-macos
  PKG managed: https://learn.microsoft.com/en-us/intune/app-management/deployment/add-lob-macos
  PKG unmanaged: https://learn.microsoft.com/en-us/intune/app-management/deployment/add-unmanaged-pkg-macos
  VPP: https://learn.microsoft.com/en-us/intune/app-management/deployment/manage-vpp-apple

DMG: 8 GB max | Bundle ID detection | Required/Available/Uninstall | IME agent 2304.039+
PKG (managed LOB): 2 GB max | Bundle ID detection | Required/Available/Uninstall* | No agent (MDM channel)
PKG (unmanaged): 8 GB max | Bundle ID detection | Required/Available (no Uninstall) | IME agent 2308.006+
VPP: N/A | App Store ID | Required/Available (user groups) | No agent (Apple installs)

*PKG managed LOB Uninstall: only when "Install as managed: Yes" AND macOS 11+
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Upload .intunemac wrapped files for macOS LOB PKG apps | Upload .pkg files directly | August 2022 | No wrapping tool needed for PKG; .intunemac upload removed from admin center |
| Endpoint protection template for macOS security profiles | Settings Catalog for all new profiles | 2023-2024 | Template still exists for existing profiles but no new templates should be created |
| SCEP-based identity certificates during ADE | ACME protocol certificates | macOS 13.1 | Handled automatically; more robust certificate validation |
| MDM-based software update policies (macOS 13 and older path) | Declarative Device Management (DDM) software updates (macOS 14+ recommended) | macOS 14 (2023) | DDM provides better enforcement and deadline control |
| VPP (legacy Volume Purchase Program) | Apps and Books in Apple Business Manager | 2020 onwards | Legacy VPP tokens still work but ABM "location tokens" are the current mechanism |
| Setup Assistant (legacy) auth method | Setup Assistant with modern authentication | Late 2024 (now default) | Modern auth is now the default for new enrollment profiles; legacy not recommended |

**Deprecated/outdated:**
- `.intunemac` wrapper: removed from Intune admin center August 2022 — do not reference in guides
- Endpoint protection template: deprecated for new macOS policies — guides must direct to Settings Catalog
- Setup Assistant (legacy) auth: still available but not recommended — guide should call out modern auth as default

---

## Open Questions

1. **Await Configuration behavior on re-enrollment**
   - What we know: Official docs state "does not fire on re-enrollment" — supported in existing lifecycle doc
   - What's unclear: Edge case behavior when device is wiped vs. management profile removed and re-enrolled
   - Recommendation: Use the documented behavior; note the "wipe required to re-trigger" pattern in the enrollment profile guide

2. **MADM-03 line count for configuration profiles**
   - What we know: Wi-Fi, VPN, email, restrictions, FileVault, firewall = 6 profile types with Settings Catalog paths and what-breaks callouts
   - What's unclear: Whether reactive split (D-05) will be needed before or during writing
   - Recommendation: Start with single file; planner should create a single MADM-03 task with note that split is reactive if >350 lines

3. **macOS LAPS inclusion in MADM-01 or MADM-02**
   - What we know: LAPS is configured in the enrollment profile (MADM-02 scope), but relates to ongoing admin account management (lifecycle/operations concern)
   - What's unclear: Depth of coverage appropriate for admin setup vs. lifecycle doc
   - Recommendation: Brief mention in MADM-02 enrollment profile guide with link to official LAPS configuration docs; not a deep dive

---

## Validation Architecture

> Note: `workflow.nyquist_validation` not set in `.planning/config.json` — treating as enabled per protocol. However, this is a **documentation-only phase** (markdown file creation, no code). All "tests" are structural/content verification rather than automated test runners.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Manual verification (no automated test runner — documentation phase) |
| Config file | N/A |
| Quick run command | File existence + frontmatter check (manual) |
| Full suite command | Cross-reference link verification (manual) |

### Phase Requirements → Verification Map
| Req ID | Behavior | Test Type | Verification Method | File Exists? |
|--------|----------|-----------|---------------------|-------------|
| MADM-01 | ABM config guide exists with renewal section | manual | Confirm `01-abm-configuration.md` has Renewal/Maintenance table | No — Wave 0 |
| MADM-02 | Enrollment profile guide has all 23 Setup Assistant screens | manual | Count screens in guide vs. reference table | No — Wave 0 |
| MADM-03 | Configuration profiles guide has 6 profile types with what-breaks | manual | Verify each of Wi-Fi/VPN/email/restrictions/FileVault/firewall has callout | No — Wave 0 |
| MADM-04 | App deployment guide has comparison table + 3 H2 sections | manual | Verify table at top; DMG/PKG/VPP H2 headers present | No — Wave 0 |
| MADM-05 | Compliance guide has "no security baselines" callout | manual | Ctrl+F for "no" and "security baseline" in file | No — Wave 0 |
| MADM-06 | Capability matrix has 5 domains | manual | Verify Enrollment/Configuration/App/Compliance/Updates H2 sections | No — Wave 0 |

### Wave 0 Gaps
All 7 output files are new (no existing files to verify against):
- [ ] `docs/admin-setup-macos/00-overview.md`
- [ ] `docs/admin-setup-macos/01-abm-configuration.md`
- [ ] `docs/admin-setup-macos/02-enrollment-profile.md`
- [ ] `docs/admin-setup-macos/03-configuration-profiles.md`
- [ ] `docs/admin-setup-macos/04-app-deployment.md`
- [ ] `docs/admin-setup-macos/05-compliance-policy.md`
- [ ] `docs/admin-setup-macos/06-config-failures.md`
- [ ] `docs/reference/macos-capability-matrix.md`
- [ ] Navigation updates: `docs/index.md`, `docs/reference/00-index.md`, `docs/windows-vs-macos.md`

---

## Sources

### Primary (HIGH confidence)
- `https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-macos` — ADE token creation, enrollment profile settings, Setup Assistant screen reference (27 screens), Await Configuration behavior, LAPS; updated 2025-12-02, verified 2026-04-14
- `https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-mac-os` — Complete macOS compliance policy settings (SIP, password, FileVault, firewall, Gatekeeper); updated 2025-09-05
- `https://learn.microsoft.com/en-us/intune/app-management/deployment/add-dmg-macos` — DMG app size limit (8 GB), detection rules, assignment types, uninstall; updated 2024-07-12, live April 2026
- `https://learn.microsoft.com/en-us/intune/app-management/deployment/add-lob-macos` — Managed PKG size limit (2 GB), signing requirement, "Install as managed" for Uninstall; updated 2025-06-12
- `https://learn.microsoft.com/en-us/intune/app-management/deployment/add-unmanaged-pkg-macos` — Unmanaged PKG size limit (8 GB), agent requirement (2308.006+), Uninstall not available (Known Issue); updated 2024-07-12
- `https://learn.microsoft.com/en-us/intune/app-management/deployment/manage-vpp-apple` — VPP token mechanics, license types (device/user), assignment types, macOS uninstall behavior (30-day grace period), token renewal steps; updated 2026-01-13
- `https://learn.microsoft.com/en-us/intune/intune-service/protect/security-baselines` — Security baselines: Windows-only (Windows 10/11, Defender, Edge, M365 Apps, HoloLens, Windows 365); no macOS baseline; updated 2026-04-03
- `https://learn.microsoft.com/en-us/intune/solutions/end-to-end-guides/macos-endpoints-get-started` — Settings Catalog paths for FileVault/Firewall/Gatekeeper, software updates (DDM macOS 14+, MDM macOS 13-), app deployment overview; updated 2026-01-22

### Secondary (MEDIUM confidence)
- Existing project content (`docs/macos-lifecycle/00-ade-lifecycle.md`) — ADE pipeline stages, token sync mechanics, Await Configuration behavior, APNs renewal consequences; written 2026-04-14 by this project

### Tertiary (LOW confidence)
- None — all critical facts verified against official Microsoft Learn documentation.

---

## Metadata

**Confidence breakdown:**
- Standard stack (template patterns): HIGH — all templates exist in repo and were read directly
- Architecture (file structure): HIGH — locked decisions from CONTEXT.md, all verified
- MADM-01 ABM details: HIGH — official Microsoft Learn docs, updated April 2026
- MADM-02 Setup Assistant screens: HIGH — full screen reference table from official docs
- MADM-03 Configuration profiles: HIGH — Settings Catalog paths from official docs
- MADM-04 App deployment limits: HIGH — size limits, detection rules, assignment types all verified per type
- MADM-05 Compliance settings: HIGH — complete settings list from official docs
- MADM-06 Capability matrix: HIGH for confirmed gaps; MEDIUM for completeness (gap list is representative, not exhaustive)
- No security baselines for macOS: HIGH — security baselines doc explicitly lists all available baselines; macOS not present

**Research date:** 2026-04-14
**Valid until:** 2026-07-14 (90-day window; Intune documentation changes frequently — re-verify Setup Assistant screens and app size limits before writing if more than 30 days have passed)
