# Stack Research

**Domain:** Microsoft Intune documentation suite — v1.5 additions (Linux platform + operational depth + cross-platform cleanup)
**Researched:** 2026-04-26
**Confidence:** HIGH for Microsoft-official items (verified against learn.microsoft.com, GitHub releases, updated April 2026); MEDIUM for community tooling patterns; LOW where noted

---

## 1. Linux Intune Client Tooling

### Package Name and Distribution Format

**Package:** `intune-portal` (deb)
**Distribution:** APT repository at `https://packages.microsoft.com/ubuntu/<version>/prod/`
**Format:** deb only — no snap package exists or is planned. Microsoft explicitly avoids snap due to enterprise immaturity.
**Install command:** `sudo apt install intune-portal`
**Remove + purge:** `sudo apt remove intune-portal && sudo apt purge intune-portal`

**Sample install script:** https://go.microsoft.com/fwlink/?linkid=2358529 (GitHub-hosted, reviewed before use)

Source: https://learn.microsoft.com/en-us/intune/intune-service/user-help/microsoft-intune-app-linux (updated 2026-04-08) — HIGH confidence

### Supported Ubuntu LTS Versions (GA as of 2026-04)

| Ubuntu Version | Support Status | Notes |
|---------------|---------------|-------|
| 24.04 LTS (Noble) | **GA — supported** | Added Dec 2024; x86/64 only; physical, Azure VM, or Hyper-V |
| 22.04 LTS (Jammy) | **GA — supported** | x86/64 only; physical, Azure VM, or Hyper-V |
| 20.04 LTS (Focal) | **Dropped** | Removed in Intune 2508 service release (August 2025) |

**Scope for v1.5 docs:** Document 22.04 and 24.04 as the supported pair. Flag 20.04 as end-of-support in the Linux glossary.

GNOME desktop environment required — automatically included with Ubuntu Desktop; Ubuntu Server not supported.

Source: https://learn.microsoft.com/en-us/intune/user-help/enrollment/enroll-linux (updated 2026-04-08); https://learn.microsoft.com/en-us/intune/fundamentals/platform-guide-linux (updated 2026-04-16) — HIGH confidence

### Enrollment Type

Linux enrollment is corporate-owned OR personal/BYOD — no forced corporate-only gate. However: no bulk enrollment; no DEM account support; no userless/kiosk mode; one-device-per-user login required.

Key gotcha: **Identity Broker v2.0.2+** (included in current `intune-portal` package) introduces a major architectural change from the prior Java-based broker. When devices update to this version, Intune **automatically re-registers the device and creates new Intune device IDs and Entra device IDs**. Admins must review device-based assignments, filters, and Entra group memberships that rely on device IDs post-upgrade.

### Agent CLI and Service Names

`intune-portal` is a GUI app (GNOME), not a pure CLI agent. Background sync uses:
- **`intune-agent.timer`** (systemd user timer) — triggers periodic check-ins
- **`microsoft-identity-broker`** (systemd service) — handles Entra ID registration

Diagnostic commands:
```bash
# View intune-agent check-in logs
journalctl | grep intune-agent

# View full service journal (identity broker errors)
journalctl -xe --unit microsoft-identity-broker

# Check intune-agent timer status
systemctl --user status intune-agent.timer

# Verify intune-portal package is installed and version
dpkg -l intune-portal

# APT dependency check
apt depends intune-portal
```

Source: Community troubleshooting (HIGH confidence for commands; MEDIUM confidence for service unit names — not explicitly documented on Microsoft Learn as of 2026-04)

### Log Paths

| Path | What it Contains |
|------|-----------------|
| `journalctl -u microsoft-identity-broker` | Entra device registration events |
| `journalctl | grep intune-agent` | Intune check-in/reporting events |
| `/var/log/dpkg.log` | Package installation history |
| `/var/opt/microsoft/mdatp/` | MDE (if co-installed with Defender) — not intune-portal itself |

**Critical gap:** Microsoft Learn does not document a dedicated `/var/log/microsoft/intune/` path for `intune-portal` on Ubuntu (as opposed to RHEL with MDE). The primary diagnostic surface is the systemd journal. This is a known documentation gap and should be flagged as LOW confidence in v1.5 L2 docs with a freshness review note.

### Compliance Settings Available on Linux

Categories available in the Intune Settings Catalog for Linux compliance:
- **Allowed Distributions** — min/max OS version per distro type
- **Custom Compliance** — Bash script-based (write your own assertions)
- **Device Encryption** — dm-crypt/LUKS; Intune recognizes any dm-crypt subsystem encryption; `/boot` and `/boot/efi` are excluded from the encryption requirement
- **Password Policy** — min length, min uppercase, min lowercase, min symbols, min digits

**What is NOT available:** App configuration profiles, MDM-pushed app deployment, Declarative Device Management, hardware attestation, certificate profiles, per-app VPN, SCEP, PKCS.

**Conditional Access scope on Linux:** Web-app CA only via Microsoft Edge (version 102.x+). No native-app CA. No Intune-pushed VPN or Wi-Fi profiles. This is the defining constraint for all v1.5 Linux CA documentation.

Source: https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-linux-settings (updated 2026-04-16); https://learn.microsoft.com/en-us/intune/fundamentals/platform-guide-linux — HIGH confidence

### App Delivery on Linux

No MSI, MSIX, .pkg, .deb push from Intune. Script-based only via shell scripts assigned as device configuration. Custom compliance scripts (Bash) are the primary ops mechanism for verifying app state. This is fundamental to the Linux admin guide structure: admins deploy apps via other means (APT, snap, manual) and use Intune only for compliance gating and CA.

---

## 2. Co-Management (SCCM ↔ Intune)

### ConfigMgr Current Branch Versions (as of 2026-04)

| Version | Released | Support End | Notes |
|---------|----------|-------------|-------|
| **CB 2503** | April 23, 2025 | Oct 2026 | Current latest; security-fix focused release (230+ bug fixes, no new features per Microsoft Secure Future Initiative) |
| CB 2409 | Nov 18, 2024 | May 2026 | Prior release; still in support |
| CB 2403 | April 2024 | Oct 2025 | Approaching end of support |

**For v1.5 docs:** Reference CB 2503 as current. Note 18-month support lifecycle per version.

Source: https://learn.microsoft.com/en-us/intune/configmgr/hotfix/2503/31909343; https://www.prajwal.org/sccm-2503-upgrade-new-features-and-hotfixes/ — HIGH confidence

### Co-Management Workload Sliders

Seven workloads available, each independently slideable from ConfigMgr to Intune (or to Pilot Collection → then fully to Intune):

| Workload | Notes |
|----------|-------|
| Compliance Policies | Defines device compliance for CA |
| Windows Update Policies | Required before Windows Autopatch can be used |
| Resource Access Policies | **Deprecated since CB 2203** — slider mandated to Intune in CB 2403; upgrade blocked if old policies present |
| Endpoint Protection | Defender suite + BitLocker + Firewall; also part of Device Configuration |
| Device Configuration | Settings catalog policies; switching also moves Resource Access + Endpoint Protection |
| Office Click-to-Run Apps | M365 Apps management; moves to Company Portal from Software Center |
| Client Apps (Mobile Apps) | Win32 apps + PowerShell scripts; moves app source to Company Portal |

**Pilot Collection pattern:** Each workload slider has three states — `Configuration Manager`, `Pilot Intune` (scoped to a specified collection), `Intune`. Pilot Collection is the documented stage-gating mechanism. Microsoft recommends ring-based collection design: lab → pilot → production.

**Windows Autopatch dependency:** Windows Update Policies AND Device Configuration workloads must both be moved to Intune before Windows Autopatch can manage devices.

**Tenant Attach vs Co-management:** Tenant Attach (enabled via Administration > Cloud Services > Cloud Attach in ConfigMgr console) surfaces ConfigMgr devices in the Intune admin center (shows "ConfigMgr" in Managed By column) without requiring co-management enrollment. Upload cycle: every 15 minutes; appearance in admin center: additional 5-10 minutes.

Source: https://learn.microsoft.com/en-us/intune/configmgr/comanage/workloads (updated 2026-04-15); https://learn.microsoft.com/en-us/intune/configmgr/tenant-attach/device-sync-actions — HIGH confidence

---

## 3. Patch and Update Management

### Windows Update for Business (WUfB)

**Ring topology — standard Intune model:**

| Ring | Quality Deferral | Feature Deferral | Audience |
|------|-----------------|-----------------|----------|
| Test/Lab | 0 days | 0 days | 1-5% lab devices |
| Pilot | 7 days | 30 days | ~10% early adopters |
| Broad/Production | 14-30 days | 90-180 days | General fleet |

- Quality update deferral: 0-30 days
- Feature update deferral: 0-365 days
- Pause: up to 35 days; auto-expires after maximum

**Driver and Firmware via WUfB (GA):**
- Requires Windows E3/E5/A3/A5 or Microsoft 365 Business Premium license
- Managed via "Driver Update Profile" in Intune (separate from Update Ring policy)
- If WUfB Ring allows driver updates without a Driver Update Profile, drivers update automatically via Windows Update without granular admin control
- With Driver Update Profile: admins review, approve, or pause specific driver updates before deployment
- Built on Windows Update for Business deployment service (WUfB-DS); devices sync daily

Source: https://learn.microsoft.com/en-us/intune/intune-service/protect/windows-10-update-rings; https://learn.microsoft.com/en-us/intune/device-updates/windows/update-ring-policy-settings — HIGH confidence

### macOS Software Update (Critical 2025-2026 Change)

**Legacy MDM commands are deprecated and will be fully removed with macOS 26 (2025-2026 cycle):**

Deprecated items (DO NOT document as current):
- `com.apple.SoftwareUpdate` MDM payload
- `forceDelayedSoftwareUpdates` restriction
- MDM-based `ScheduleOSUpdate` command
- MDM update queries

**Current canonical approach: Declarative Device Management (DDM)**

Setting to use in Intune Settings Catalog: **"Software Update Enforce Latest"** (DDM-based)

For update deferral, Intune still surfaces:
- `Force Delayed Software Updates` (MDM restriction) — delays visibility
- `Force Delayed App Software Updates` — delays non-OS updates (XProtect, Safari)

However, for enforcement (requiring a specific version by a specific deadline), DDM is the only forward-compatible method as of 2025.

**For v1.5 docs:** The existing macOS update enforcement documentation must distinguish between deferral (MDM restriction still functional) and enforcement (DDM required). Flag `forceDelayedSoftwareUpdates` as deprecated-for-enforcement with a callout pointing to DDM path.

Source: https://learn.microsoft.com/en-us/intune/device-updates/apple/software-updates-macos; https://learn.microsoft.com/en-us/intune/device-updates/apple/software-updates-guide-macos; https://macadifference.net/2025/04/08/intune-macos-enforcing-software-updates.html — HIGH confidence (confirmed from multiple sources)

### iOS/iPadOS Software Update

**Same DDM transition applies:**
- Legacy MDM supervised-only update commands deprecated alongside macOS equivalents
- **DDM update enforcement now works on unsupervised devices** (iOS/iPadOS 17+): basic DDM keys (TargetOSVersion, TargetBuildVersion, TargetLocalDateTime, OfferPrograms) are available without supervision
- This removes the hard supervised-vs-unsupervised boundary for update enforcement that existed in v1.3 docs
- Full enforcement behavior (forced install prompt cycle) is identical on supervised and unsupervised devices when DDM policy applies

**For v1.5 ops-depth docs:** The iOS update management guide must document the DDM enforcement path and note that the supervised-only constraint on update enforcement is removed for iOS 17+. Existing v1.3 admin setup docs should receive a callout noting DDM availability.

Source: https://learn.microsoft.com/en-us/intune/device-updates/apple/deprecated-mdm-policies-ios; https://learn.microsoft.com/en-us/intune/device-updates/apple/software-updates-guide-ios-ipados — HIGH confidence

### Android Patch Delivery — Play Integrity Impact

**Breaking change enforced September 30, 2025:**

Google's MEETS_STRONG_INTEGRITY verdict now requires (for Android 13+):
- Hardware-backed security signals (hardware attestation)
- Security patch released within the past 12 months (all partitions: OS + vendor)

Microsoft Intune enforces these requirements from September 30, 2025 onward. Devices failing to meet MEETS_STRONG_INTEGRITY on Android 13+ will not satisfy Intune compliance policies configured with "Play Integrity" checks at Strong tier.

**Compliance policy guidance for v1.5:**
- Set `Minimum security patch level` to a date no more than 12 months old (YYYY-MM-DD format)
- This aligns with the MEETS_STRONG_INTEGRITY security-patch recency requirement
- OEM-specific delays (Samsung Knox Service Platform, Zebra LifeGuard) can cause late patches — these devices may transiently fail compliance until OEM pushes the update

**For v1.5 ops-depth docs:** The patch management section for Android must document the post-September 2025 MEETS_STRONG_INTEGRITY gate and explain that patch delivery timelines differ by OEM, particularly Samsung (Knox Security Patch = monthly) and Zebra (LifeGuard = quarterly cadence for most devices).

Source: https://techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-changes-to-google-play-strong-integrity-for-android-13-or-above/4435130 (July 2025) — HIGH confidence (official Microsoft TechCommunity support blog)

---

## 4. App Lifecycle Tooling

### Win32 Packaging — Microsoft Win32 Content Prep Tool

**Current version:** v1.8.7 (released August 13, 2024)
**Download:** https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool/releases
**Output format:** `.intunewin` (encrypted ZIP with detection metadata)
**Key v1.8.7 changes:** SHA256 FIPS-compliant algorithms, silent mode support, crash-fix in logging

**Supersedence and dependency chains (current capability):**
- Maximum 10 apps per supersedence/dependency subgraph
- Supersedence and dependency relationships can now coexist in the same app subgraph (post-2023 improvement)
- Conflict resolution: IME enforces supersedence intent when conflicts arise
- Supersedence only works between Win32 apps (cannot mix Win32 with LOB/MSIX in a supersedence chain)
- MSIX apps do NOT support supersedence; use version replacement in the same app entry instead

**For v1.5 docs:** Win32 supersedence+dependency guide should document the 10-node maximum, the combined-relationship capability, and the MSIX vs Win32 distinction.

Source: https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool/releases; https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-supersedence — HIGH confidence

### MSIX Packaging

MSIX apps are uploaded to Intune as Line-of-Business apps (not Win32). Intune reads MSIX manifest metadata automatically. Version updates: replace the file in the existing app entry — Intune detects version change and pushes delta on next sync. No supersedence option exists for MSIX.

All MSIX packages must be signed (Developer ID certificate); unsigned MSIX will not install even via MDM.

### macOS App Deployment Pipeline

Three Intune-native methods:

| Method | File Type | Signing Required | Use Case |
|--------|-----------|-----------------|----------|
| Managed LOB `.pkg` | `.pkg` | Yes — Developer ID Installer | Signed commercial apps |
| Unmanaged PKG with scripts | `.pkg` | No | Unsigned or payload-less packages |
| DMG | `.dmg` | No | Apps distributed as disk images |

For unmanaged PKG: requires `intune-mdm-agent` version 2309.007 or later; supports pre-install and post-install shell scripts.

**Installomator adjacency:** Installomator (https://github.com/Installomator/Installomator) is an open-source shell script framework that downloads and installs ~1000+ macOS apps from their official sources. Used in conjunction with Intune shell script deployment (assign as shell script to device group) as an alternative to packaging. Community-standard pattern; not Microsoft-official. Use when: app updates frequently and packaging overhead is undesirable.

**Munki adjacency:** Munki (https://github.com/munki/munki) is an enterprise macOS software management system. Integration pattern (2025): Intune as MDM authority for enrollment/compliance/CA + Munki as dedicated software deployment layer (handles LOB, auto-updates, Intel vs Apple silicon binary selection). Replaces need for Jamf-specific software deployment features. Relevant for orgs already using Munki who are migrating from Jamf to Intune.

**For v1.5 docs:** macOS app lifecycle section should document all three Intune-native methods, flag Installomator as the community standard for recurring app updates, and note Munki as the full-replacement pattern for Jamf migrations.

Source: https://learn.microsoft.com/en-us/intune/intune-service/apps/lob-apps-macos; https://learn.microsoft.com/en-us/intune/intune-service/apps/macos-unmanaged-pkg; https://learn.microsoft.com/en-us/intune/intune-service/apps/lob-apps-macos-dmg — HIGH confidence

### iOS VPP App Licensing

Two license types:

| Type | Assignment | Apple ID Required | Silent Install | Use For |
|------|-----------|------------------|---------------|---------|
| Device license | Assigned to device | No | Yes | Supervised + shared/kiosk devices; preferred default |
| User license | Assigned to user (1 license = up to 5 devices) | Yes (personal or Managed Apple ID) | Requires App Store sign-in | User Enrollment only |

**Post-2025 default change:** New VPP app assignments now default to "device" license type. Existing assignments unchanged.

Source: https://learn.microsoft.com/en-us/intune/app-management/deployment/manage-vpp-apple — HIGH confidence

### Android Managed Google Play — Private App Publishing

Two paths:
1. **Intune admin center direct upload** (recommended): APK + title only; no Google Developer Account required; live in ~10 minutes; max 15 uploads per day (including web clips)
2. **Google Play Console**: Full developer account required; enables advanced metadata (icons, screenshots, descriptions), staged rollout, multiple tracks

**Constraint:** App package name must be globally unique in Google Play — not just within your tenant. Duplicate package names cause "Upload a new APK file with a different package name" error.

Source: https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-add-android-for-work — HIGH confidence

---

## 5. Drift Detection and Tenant Migration Tooling

### Microsoft Graph API — Deployment Reports and Drift Queries

**Endpoint:** `https://graph.microsoft.com/beta/deviceManagement/reports/exportJobs`
**Format:** POST body with `reportName`, optional `filter`, optional `select`, optional `format` (csv/json)
**Status polling:** GET to the returned export job ID until `status: 'complete'`

Key report names for drift detection workflows:

| Report Name | Purpose |
|-------------|---------|
| `DeviceCompliance` | Overall compliance state per device |
| `DeviceNonCompliance` | Filtered non-compliant devices only |
| `NonCompliantDevicesAndSettings` | Which specific settings are out of compliance |
| `DevicesWithoutCompliancePolicy` | Devices with no compliance assignment |
| `ConfigurationPolicyAggregate` / `V3` | Aggregate pass/fail per configuration policy |
| `DeviceAssignmentStatusByConfigurationPolicy` / `V3` | Per-device policy assignment status |
| `PerSettingDeviceSummaryByConfigurationPolicy` | Per-setting compliance across devices |
| `SettingComplianceAggReport` / `V3` | Setting-level drift aggregate |
| `FeatureUpdateDeviceState` | Feature update deployment status |
| `QualityUpdateDeviceStatusByPolicy` | Quality update status per policy |
| `DriverUpdatePolicyStatusSummary` | Driver update deployment state |

**For v1.5 docs:** The drift detection guide should document the `exportJobs` endpoint pattern and key report names above. The roadmap's drift-detection phase should use these as the reference surface for per-platform drift query examples (Windows: ConfigurationPolicyAggregate; macOS: equivalent settings-catalog report; iOS/Android: compliance reports).

Source: https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/reports-export-graph-available-reports; https://learn.microsoft.com/en-us/graph/intune-concept-overview — HIGH confidence

### Tenant-to-Tenant Migration Posture

**Microsoft's official position:** Tenant-to-tenant device migration is **not a supported Intune scenario**. The recommended path is unenroll from source tenant + re-enroll in destination tenant. Device reset/wipe may be required depending on join type.

**Per-platform specifics for v1.5 migration runbooks:**

| Platform | Migration Challenge | Documented Resolution |
|----------|--------------------|-----------------------|
| Windows | BitLocker recovery keys stored in source Entra ID; keys don't transfer to destination tenant | Trigger BitLocker key rotation in Intune (Devices > select device > BitLocker Key Rotation) before unenroll; new key escrows to destination after re-enrollment. Also: ConfigMgr co-managed devices need workload slider assessment before migration. |
| macOS/iOS | ABM ADE token is tenant-scoped; a location token can only be used with ONE Intune tenant at a time | Must re-issue ADE token from Apple Business Manager for destination tenant. APNs push certificate is also tenant-scoped — new APNs cert needed in destination. |
| iOS VPP | App licenses assigned to source tenant Apple ID association | Re-assign VPP token to destination Intune tenant from ABM; existing device license assignments must be re-created. |
| Android | MGP binding is tenant-scoped; one binding per Managed Google Play account | Must disconnect MGP from source Intune tenant and re-bind to destination. All app deployments, policies, and assignments must be recreated. Enrolled devices need factory reset + re-enrollment. |

**Export/import tooling:** Microsoft Graph scripts exist (PowerShell) to export and import selected policy types between tenants. Not all policy types are supported (notably: certificate profiles must be manually recreated). No official first-party migration tool.

Source: https://learn.microsoft.com/en-us/answers/questions/2149662/tenant-to-tenant-migration-with-intune-devices; https://learn.microsoft.com/en-us/answers/questions/1499138/migrate-mobile-devices-to-a-different-intune-tenan; https://techcommunity.microsoft.com/blog/coreinfrastructureandsecurityblog/migrating-bitlocker-recovery-key-management-from-configmgr-to-intune-a-practical/4414948 — MEDIUM confidence (Q&A and community sources; no single authoritative Microsoft Learn tenant migration guide exists)

---

## 6. Broken-Link Sweep Tooling

### Recommended Tool: `markdown-link-check` (npm)

**Why:** Pure Node ESM compatible; integrates directly into existing `.mjs` audit harness pattern; can be called from a `check-phase-NN.mjs` script or from the milestone audit harness; supports ignore patterns for false positives.

**Package:** `markdown-link-check` on npm (tcort/markdown-link-check on GitHub)
**Current status (2025):** Healthy maintenance cadence; scanned for vulnerabilities — no issues; JUnit reporter available for CI integration.
**Install:** `npm install -D markdown-link-check`

**Usage pattern for audit harness integration:**
```bash
# Check a single file
markdown-link-check docs/index.md

# Check with config (ignore patterns, timeout, retry)
markdown-link-check --config .mlc-config.json docs/index.md

# Recursive — pipe from find (used in CI)
find docs -name "*.md" | xargs markdown-link-check --print-summary

# JUnit output for CI
markdown-link-check --reporters default,junit docs/index.md
```

**Config file (`.mlc-config.json`) for this repo:**
```json
{
  "ignorePatterns": [
    { "pattern": "^#" },
    { "pattern": "localhost" }
  ],
  "timeout": "20s",
  "retryOn429": true,
  "retryCount": 2,
  "concurrentFileCheck": 5
}
```

**Anchor checking:** `markdown-link-check` checks anchor links (`#section-name`) within the same file and across files if the target file exists. This is the primary need for the 179-file sweep (broken `#anchor` references after sections were renamed in v1.4.x edits).

**Integration with existing audit harness:** Add as a new check in `v1.5-milestone-audit.mjs`. Pattern: C10 = broken-anchor sweep across `docs/` tree. Use informational-first (D-29 grace pattern) on first harness run; promote to blocking after sweep phase completes.

### Alternative: `lychee` (Rust-based)

**When to prefer lychee over markdown-link-check:**
- Need to check external URLs at scale (lychee is async/stream-based, much faster for live URL checks)
- Need GitHub Actions integration via `lycheeverse/lychee-action`
- v0.23.0 is the default in the GitHub Action

**For this project:** External URL checking is lower priority than internal anchor checking. `markdown-link-check` is the better fit for the 179-file internal-link sweep because it integrates natively into the Node ESM audit harness without adding a Rust binary dependency to the CI environment.

Source: https://github.com/tcort/markdown-link-check; https://github.com/lycheeverse/lychee-action; https://www.npmjs.com/package/markdown-link-check — MEDIUM confidence (npm registry health; no Context7 ID for this library)

---

## 7. 4-Platform Capability Comparison Document

### Structural Pattern

No single Microsoft Learn document exists that does a 4-platform capability matrix — Microsoft organizes documentation per-platform. The existing per-platform capability matrices in this suite (`windows-capability-matrix.md`, `macos-capability-matrix.md`, `ios-capability-matrix.md`, `android-capability-matrix.md`) serve as the per-platform source of truth. DEFER-08 calls for a cross-platform synthesis document.

**Recommended structure (based on v1.4 Cross-Platform Equivalences pattern + industry documentation patterns):**

```markdown
# Cross-Platform Capability Comparison

## Enrollment
| Feature | Windows | macOS | iOS/iPadOS | Android |
|---------|---------|-------|-----------|---------|

## Identity and Conditional Access
## App Delivery
## Compliance Settings
## Update Management
## Monitoring and Reporting
## Platform-Specific Constraints
```

**Pattern precedent in existing suite:** The `android-capability-matrix.md` Cross-Platform Equivalences section (3 paired rows) established the pattern for bridging platform-specific terminology. The 4-platform doc extends this to a full matrix, using each per-platform capability matrix as the row source of truth.

**Anti-pattern to avoid:** Do NOT duplicate setting-by-setting details from per-platform matrices. The 4-platform doc should reference per-platform docs (with anchors), not duplicate them. Its value is navigability and gap identification, not duplication.

Source: Derived from project history and industry documentation patterns — MEDIUM confidence

---

## 8. Audit Harness Extension — v1.5 Checks

### New Token Categories for Linux Platform (C4 extension)

Add to existing C4 token regex list in `v1.5-milestone-audit.mjs`:
```
linux_platform_tokens = [
  "intune-portal", "intune_portal",
  "Ubuntu", "ubuntu",
  "22.04", "24.04",
  "LTS",
  "LUKS", "dm-crypt",
  "journalctl", "systemd",
  "microsoft-identity-broker",
  "GNOME",
  "deb", "apt"
]
```

### New Ops-Domain Checks (informational-first per D-29 pattern)

| Check ID | Check Name | Pattern | Grace |
|----------|-----------|---------|-------|
| C10 | Broken-anchor sweep | `markdown-link-check` across `docs/` — check all `[text](#anchor)` links resolve | Informational first; promote to blocking after sweep phase |
| C11 | Deprecated-MDM-command anti-pattern | Detect `forceDelayedSoftwareUpdates`, `ScheduleOSUpdate`, `com.apple.SoftwareUpdate` MDM payload in docs without a DDM-migration callout | Informational |
| C12 | SafetyNet anti-pattern (inherited from v1.4) | Detect `SafetyNet` without `deprecated` qualifier — already in v1.4.1 harness; extend to ops-domain docs | Already blocking in C5; verify ops-depth docs inherit coverage |
| C13 | Ubuntu 20.04 anti-pattern | Detect `20.04` in Linux docs without an end-of-support callout | Informational |
| C14 | Co-management workload anti-pattern | Detect "Resource Access" workload documented as active without a CB 2203 deprecation note | Informational |

### Sidecar Allowlist (`v1.5-audit-allowlist.json`)

New allowlist entries needed:
- macOS/iOS DDM migration callout prose that legitimately references deprecated MDM commands in a "deprecated since" context
- Any cross-platform comparison doc that lists `forceDelayedSoftwareUpdates` in a "legacy approach" column

### Path A Copy Pattern (Confirmed for v1.5)

`v1.5-milestone-audit.mjs` = copy of `v1.4.1-milestone-audit.mjs` + additive extensions. Predecessor must remain reproducible (no in-place mutation). Sidecar `scripts/validation/v1.5-audit-allowlist.json` co-located alongside harness.

`regenerate-supervision-pins.mjs` self-test baselines need refresh in the audit-tooling phase — flagged as carry-over from v1.4.1 close.

---

## What NOT to Build in v1.5

| Avoid | Why | Scope Decision |
|-------|-----|---------------|
| Ubuntu 20.04 LTS support documentation | Dropped from Intune in August 2025 (Intune 2508 service release) | Document as end-of-support; point admins to upgrade path |
| RHEL / Rocky / Alma / Debian / SUSE / Fedora | Explicitly out of scope per PROJECT.md scope decision | Ubuntu LTS only in v1.5; v1.6 candidate |
| Linux server / IoT | Out of scope per PROJECT.md | Desktop client only |
| Snap-based intune-portal | Does not exist; Microsoft uses deb only | Do not document snap as an option |
| Android Device Administrator legacy mode | Deprecated since Android 10; explicitly excluded v1.4 | Preserve v1.4 exclusion |
| Samsung E-FOTA | Orthogonal to Intune enrollment | Excluded since v1.4 |
| ChromeOS | Different management platform | Excluded v1.0-v1.5 |
| Code scaffolding tiers (PowerShell/FastAPI/React) | Remain dormant per v1.5 scope decision | No v1.5 work on src/ |
| Intune-native Linux app push (deb/snap packages) | Not a supported Intune feature — no MDM app push for Linux | Script-based compliance is the limit; document honestly |
| forceDelayedSoftwareUpdates as current enforcement | Deprecated with macOS/iOS 26; removed in 2026 | Document as legacy-only; DDM is current |

---

## Version Reference Summary

| Technology | Version / State as of 2026-04 | Source Confidence |
|-----------|------------------------------|-------------------|
| `intune-portal` (Ubuntu deb) | Current; no explicit version pinned in docs | HIGH |
| Ubuntu 22.04 LTS | Supported | HIGH |
| Ubuntu 24.04 LTS | Supported (added Dec 2024) | HIGH |
| Ubuntu 20.04 LTS | **Dropped August 2025** | HIGH |
| ConfigMgr CB 2503 | Current branch (Apr 23, 2025) | HIGH |
| ConfigMgr CB 2409 | Prior release; still in support | HIGH |
| Win32 Content Prep Tool | v1.8.7 (Aug 13, 2024) | HIGH |
| macOS DDM enforcement | Current canonical (legacy MDM commands deprecated/removed) | HIGH |
| iOS DDM update enforcement | Available unsupervised iOS 17+ (removes supervised-only gate) | HIGH |
| Android MEETS_STRONG_INTEGRITY enforcement | Google enforced May 2025; Intune enforced Sep 30, 2025 | HIGH |
| Microsoft Edge (Linux CA requirement) | v102.x+ required | HIGH |
| `markdown-link-check` npm | Healthy (no specific version pinned — check npm at implementation time) | MEDIUM |
| lychee link checker | v0.23.0 (GitHub Action default) | MEDIUM |
| Graph `exportJobs` endpoint | `/beta/deviceManagement/reports/exportJobs` | HIGH |
| Intune tenant-to-tenant migration | Not officially supported; re-enrollment required | MEDIUM |

---

## Sources

- https://learn.microsoft.com/en-us/intune/intune-service/user-help/microsoft-intune-app-linux (updated 2026-04-08) — Linux package name, uninstall commands
- https://learn.microsoft.com/en-us/intune/fundamentals/platform-guide-linux (updated 2026-04-16) — Linux enrollment, compliance settings, CA scope
- https://learn.microsoft.com/en-us/intune/user-help/enrollment/enroll-linux (updated 2026-04-08) — Linux supported versions, enrollment process
- https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-linux-settings (updated 2026-04-16) — Linux compliance settings categories (Allowed Distributions, Custom Compliance, Device Encryption, Password Policy)
- https://learn.microsoft.com/en-us/intune/device-enrollment/guide-linux (updated 2026-04-16) — Linux enrollment types, constraints
- https://learn.microsoft.com/en-us/intune/configmgr/comanage/workloads (updated 2026-04-15) — Co-management workload list and slider behavior
- https://learn.microsoft.com/en-us/intune/configmgr/tenant-attach/device-sync-actions — Tenant attach setup and sync cadence
- https://learn.microsoft.com/en-us/intune/configmgr/hotfix/2503/31909343 — ConfigMgr CB 2503 summary
- https://learn.microsoft.com/en-us/intune/intune-service/protect/windows-10-update-rings — WUfB ring policy settings
- https://learn.microsoft.com/en-us/intune/device-updates/windows/update-ring-policy-settings — Quality/feature deferral values
- https://learn.microsoft.com/en-us/intune/device-updates/apple/software-updates-macos — macOS update policy (DDM transition)
- https://learn.microsoft.com/en-us/intune/device-updates/apple/software-updates-guide-macos — macOS update admin checklist
- https://learn.microsoft.com/en-us/intune/device-updates/apple/deprecated-mdm-policies-ios — iOS deprecated MDM update commands
- https://learn.microsoft.com/en-us/intune/device-updates/apple/software-updates-guide-ios-ipados — iOS update admin checklist
- https://techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-changes-to-google-play-strong-integrity-for-android-13-or-above/4435130 — Android MEETS_STRONG_INTEGRITY enforcement timeline
- https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool/releases — Win32 Content Prep Tool v1.8.7
- https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-supersedence — Win32 supersedence and dependency
- https://learn.microsoft.com/en-us/intune/intune-service/apps/lob-apps-macos — macOS LOB .pkg deployment
- https://learn.microsoft.com/en-us/intune/intune-service/apps/macos-unmanaged-pkg — macOS unmanaged PKG + scripts
- https://learn.microsoft.com/en-us/intune/intune-service/apps/lob-apps-macos-dmg — macOS DMG deployment
- https://learn.microsoft.com/en-us/intune/app-management/deployment/manage-vpp-apple — iOS VPP device vs user licensing
- https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-add-android-for-work — Android MGP private app publishing
- https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/reports-export-graph-available-reports — Graph API report names for drift detection
- https://learn.microsoft.com/en-us/answers/questions/2149662/tenant-to-tenant-migration-with-intune-devices — Tenant migration posture (MEDIUM confidence — Q&A)
- https://github.com/tcort/markdown-link-check — markdown-link-check npm tool
- https://github.com/lycheeverse/lychee — lychee Rust link checker
- https://github.com/lycheeverse/lychee-action — lychee GitHub Action (v0.23.0 default)
- Community sources (4sysops, mikemdm.de, macadifference.net, intuneirl.com) — DDM enforcement patterns, macOS/iOS deprecation timelines — MEDIUM confidence

---
*Stack research for: Windows Autopilot & Intune Documentation Suite v1.5*
*Researched: 2026-04-26*
