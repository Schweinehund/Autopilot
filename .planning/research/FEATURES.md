# Feature Research — v1.5 Feature Landscape

**Domain:** Microsoft Intune provisioning documentation suite (5th platform + operational depth)
**Researched:** 2026-04-26
**Confidence:** HIGH (Linux Intune capabilities verified against Microsoft Learn updated 2026-04-16; co-management workloads verified against Microsoft Learn updated 2026-04-15; iOS DDM migration verified against 4sysops + Microsoft Learn August 2025 + March 2026 updates)

---

## Context: v1.5 Three-Pillar Structure

This research covers three distinct pillars, each with its own feature set:

- **Pillar 1 — Cleanup & cross-platform hardening:** DEFER-07 Android nav unification + DEFER-08 4-platform comparison + broken-link sweep
- **Pillar 2 — Linux via Intune (Ubuntu LTS):** 5th platform enrollment, compliance, CA, app delivery, L1/L2
- **Pillar 3 — Operational depth (4 existing platforms):** Co-management, patch/update management, app lifecycle automation, drift detection + tenant migration

---

## Pillar 1 — Cleanup & Cross-Platform Hardening

### Table Stakes

Features that are broken or absent in existing v1.0–v1.4.1 docs. Missing these = documentation fails users trying to find Android content.

| Feature | Why Expected | Complexity | Audience | Depends On | Notes |
|---------|--------------|------------|----------|------------|-------|
| DEFER-07: Android sections in `docs/index.md` | Android has only a stub H2 (Phase 42); Windows/macOS/iOS have full L1/L2/Admin subsections. Users landing on index.md cannot navigate Android resources | MEDIUM | All | v1.4.1 Android content complete | Must match structural depth of iOS section: L1 (triage tree + runbook index links), L2 (log collection guide + L2 runbook index links), Admin Setup (overview + per-guide links). 6–8 table rows per subsection per existing iOS pattern |
| DEFER-07: Android sections in `common-issues.md` | common-issues.md currently has Windows/macOS/iOS platform H2s but no Android H2. Platform selector bullet exists (Phase 42) but leads nowhere | MEDIUM | L1, L2 | v1.4.1 Android L1/L2 runbooks | Pattern: H2 per platform, symptom-H3 rows each with L1 and L2 runbook links. Android needs: enrollment blocked, work profile not created, device not enrolled, compliance blocked, MGP app not installed, ZTE failed, Knox enrollment failed, AOSP enrollment failed (8 symptom categories matching L1 runbooks 22–29) |
| DEFER-07: Android section in `quick-ref-l1.md` | Windows/macOS/iOS each have a dedicated quick-ref section. Android L1 responders have no equivalent | MEDIUM | L1 | v1.4.1 Android L1 triage + runbooks | Pattern: Top Checks (3–4), Escalation Triggers (4–5), Decision Tree link, Runbooks list. Android top check is mode-identification first (COBO/BYOD/Dedicated/ZTE/AOSP) per existing mode-first triage tree |
| DEFER-07: Android section in `quick-ref-l2.md` | Windows/macOS/iOS each have an L2 quick-ref section with log paths, commands, diagnostic methods | MEDIUM | L2 | v1.4.1 Android L2 runbooks | Pattern: Log collection methods (3-method Android section), Key Intune Portal Paths table, Play Integrity verdict reference, Investigation Runbooks list. Android has no CLI diagnostic tool equivalent to mdmdiagnosticstool or `profiles` |
| DEFER-08: 4-platform capability comparison document | Per-platform matrices exist (Windows/macOS/iOS/Android each have a capability matrix) but no cross-platform side-by-side reference. Admins managing mixed fleets must open 4 separate files | HIGH | Admin | All 4 existing capability matrices | Structural reference doc, NOT a duplicate of per-platform matrices. Axes: enrollment mechanism, identity (Entra join type), app delivery (format + store), compliance (settings depth), conditional access (native vs web-app only), monitoring/reporting, patching/update management. Cross-link reciprocity to per-platform matrices |
| Cross-platform broken-link sweep — intra-doc anchors | 179 markdown files accumulated across 5 milestones. Phase-based authoring creates anchor drift when headings change in later phases. iOS Phase 33 gap closure already found I-1 anchor fix and I-2 placeholder retrofit (71 rows) | HIGH | — | All 179 existing files | Categories: `[text](#anchor)` same-file anchors (most common drift site), `[text](relative-path#anchor)` cross-file anchors, glossary `see-also` cross-refs. Priority: cross-file anchors with `#anchor` fragments first (hardest to detect) → same-file anchors → text-only links |
| Cross-platform broken-link sweep — inter-doc relative paths | Relative path references like `[guide](../admin-setup-android/08-cope-full-admin.md)` can drift when files are renamed | MEDIUM | — | All 179 existing files | New file names added in v1.4.1 (COPE, Knox, per-OEM AOSP) may not have reciprocal links from older files. iOS retroactive placeholder retrofit pattern (Phase 33) is the precedent |
| Glossary cross-ref normalization | `_glossary-macos.md` has iOS see-also. `_glossary-android.md` has macOS see-also (Phase 46). Windows glossary has no cross-refs. v1.5 adds Linux — needs `_glossary-linux.md` with see-also pattern | LOW | — | v1.2 cross-platform glossary pattern | Each glossary file should have see-also entries pointing to equivalent terms in sibling glossaries |

### Differentiators

| Feature | Value Proposition | Complexity | Audience | Notes |
|---------|-------------------|------------|----------|-------|
| DEFER-08: Cross-Platform Equivalences structure in comparison doc | The v1.4 pattern of pairing equivalent mechanisms cross-platform (iOS Supervision ↔ Android Fully Managed, Apple ADE ↔ Google Zero-Touch) can be elevated to a single cross-platform comparison table. Admins managing mixed fleets can reason about parity gaps at a glance | HIGH | Admin | Must avoid duplicating per-platform matrices. Pattern: structural reference with cells that say "Windows: ring-based WUfB / macOS: DDM enforcement / iOS: DDM supervised / Android: Play-delivery + OEM-specific" — one row per domain |
| Cross-platform broken-link sweep — automated harness check | Manual sweep is possible but a `check-broken-links.mjs` validator as a v1.5 harness check (C-new) would catch future drift mechanically | MEDIUM | — | v1.4.1 harness lineage pattern (informational-first for new checks) | Depends on whether harness phase is scoped to add a new C-check for link integrity; see PITFALLS.md |

### Anti-Features (Out of Scope)

| Feature | Why Requested | Why Out of Scope | Alternative |
|---------|---------------|-----------------|-------------|
| External Microsoft Learn URL validation | Teams may want to flag stale MS Learn links | Microsoft Learn URLs restructure without notice (observed in Phase 32: Intune admin center "Device onboarding" reorg). Automating external URL checks creates false positives and fragile CI | Spot-check high-traffic external links manually with `last_verified` dates on affected files; flag in human review |
| Retroactive freshness normalization for all 179 files | v1.4.1 already normalized L2 runbooks 18-21 and Android admin template; remaining files are iOS/macOS/Windows | Per STATE.md note: iOS/macOS/Windows admin templates were intentionally NOT normalized in v1.4.1 (Android-scope lock per Plan 43-05 D-25). Doing all 179 files risks scope explosion | Sweep only files that failed the 60-day check as part of the broken-link sweep; do not normalize files that are still within window |

---

## Pillar 2 — Linux via Intune (Ubuntu LTS)

### Background: What Linux Intune Actually Is (HIGH confidence, verified against Microsoft Learn 2026-03-31 + 2026-04-16)

Linux management via Intune is a **narrower surface** than Windows, macOS, iOS, or Android. Key architectural constraints:

- **Enrollment mechanism:** User-initiated only. No automated/zero-touch enrollment. No bulk enrollment (DEM accounts not supported). Each device enrolled individually via the `intune-portal` deb package + Microsoft Edge.
- **Conditional access scope:** Web-app CA only via Microsoft Edge. No native app CA (Require approved client app / Require app protection policy grant controls are NOT supported for Linux in CA policies). Linux devices can satisfy device-based CA policies (compliant device required in Edge).
- **App delivery:** Script-based only (Bash scripts via Intune Scripts & Remediations platform scripts). No Win32 equivalent, no .deb managed deployment via Intune, no MSI/MSIX/.pkg analog. Intune does NOT deliver .deb packages directly.
- **Supported distros:** Ubuntu Desktop 22.04 LTS and 24.04 LTS (x86/64 only, GNOME desktop required). RHEL 9 and RHEL 10 also supported but out of v1.5 scope (Ubuntu-only per PROJECT.md). Ubuntu 20.04 support ended in August 2025 (Intune service release 2508).
- **Compliance settings:** Settings catalog only (not templated). Categories: Allowed Distributions (distro type + min/max OS version), Custom Compliance (Bash discovery scripts), Device Encryption (dm-crypt/LUKS), Password Policy (min length/lowercase/uppercase/digits/symbols). No equivalent to Windows security baseline depth or macOS configuration profile breadth.
- **Device ownership model:** Corporate-owned only in enrollment guide framing; however the deployment guide (platform-guide-linux) also mentions BYOD/personal enrollment support. The enrollment guide explicitly states "corporate-owned" and "enrollment isn't supported with personal devices." This is a documentation inconsistency that v1.5 should surface as a known caveat.
- **Agent architecture:** `intune-portal` deb package (package name confirmed). Identity Broker v2.0.2+ changed from Java-based to new architecture; update triggers automatic re-enrollment with new device IDs — admins must review device-based assignments/filters post-update.

### Table Stakes

| Feature | Why Expected | Complexity | Audience | Depends On | Notes |
|---------|--------------|------------|----------|------------|-------|
| Linux platform taxonomy + distro framework overview | IT admins need orientation to what Linux-in-Intune actually means before any setup/troubleshooting. Establishes Ubuntu 22.04/24.04 LTS scope, enrollment constraints, supported vs. not-supported features | LOW | Admin, L1, L2 | v1.2 cross-platform taxonomy pattern; `_glossary-linux.md` | Maps to iOS enrollment path overview precedent (one doc establishing the 4-path/scope framework). Linux has one enrollment path: user-initiated deb install |
| Linux glossary (`_glossary-linux.md`) | Every platform has a per-platform glossary. Linux introduces new terminology (dm-crypt, LUKS, HWE kernel, GNOME, `intune-portal` package, `intune-agent` service, Play Integrity analog = compliance policy) | LOW | All | v1.2 `_glossary-macos.md` pattern; see-also entries into Windows/Android/iOS glossaries | Linux-specific terms: dm-crypt, LUKS, HWE kernel, deb repository, GNOME desktop, systemd service, `intune-portal`, `intune-agent.timer`, `journalctl` |
| Linux admin setup — enrollment configuration | What does an admin need to do before users can enroll? (Answer: almost nothing — enrollment is auto-enabled in tenant. But need to: verify licensing, create compliance policy, configure CA policy for Edge.) Admin flow is lighter than all other platforms | MEDIUM | Admin | v1.5 taxonomy doc; existing CA enrollment timing patterns | Admin task list: (1) verify Intune + Entra P1 licensing, (2) create Linux compliance policy from settings catalog, (3) optionally configure device-based CA policy scoped to Linux, (4) communicate enrollment steps to users. No MDM server assignment (no ABM/ZT equivalent). No zero-touch path. Contrast with macOS 7-step admin setup |
| Linux compliance policy guide | Admins need to know exactly what settings they can enforce (4 categories from settings catalog). Narrower than all other platforms — this comparison must be explicit | MEDIUM | Admin | Linux admin setup; Linux compliance settings from settings catalog | Four categories: Allowed Distributions, Custom Compliance (Bash scripts), Device Encryption (LUKS/dm-crypt), Password Policy. Custom compliance scripts use POSIX-compliant shell, output JSON key-value pairs, discovery script checked vs. expected values |
| Linux end-user enrollment guide | User-flow end-to-end: (1) install Microsoft Edge 102.x+, (2) install `intune-portal` deb from packages.microsoft.com, (3) open Intune app + sign in with org account, (4) complete compliance remediation if prompted, (5) sign into Edge to access org resources | LOW | L1 | Linux taxonomy; Linux admin setup | Package install command: `sudo apt install intune-portal`. Service: `intune-agent.timer` (systemd). Post-install requires reboot. No Setup Assistant equivalent (no zero-touch). User must actively perform enrollment — CA policy is the trigger for motivation |
| Linux L1 triage decision tree | L1 responders need a Mermaid decision tree for the top Linux failure scenarios | MEDIUM | L1 | Linux L1 runbooks | Tree is simpler than Android/iOS (one enrollment path, web-app CA only). Key branches: (1) enrollment failed (package install? sign-in? compliance?), (2) device non-compliant (which category?), (3) CA blocking Edge access (device enrolled? compliant?), (4) Intune app service not running |
| Linux L1 scenario runbooks | Scripted procedures for top Linux failure scenarios | MEDIUM | L1 | Linux L1 decision tree | Likely runbooks: (L1-XX) enrollment failed — package installation error / sign-in failure / enrollment timeout; (L1-XX) compliance non-compliant — distro/version out of range / disk not encrypted / password policy not met; (L1-XX) CA blocking web-app access — device not enrolled / device not compliant / Edge not signed in; (L1-XX) agent service not running |
| Linux L2 investigation guide | L2 technical investigation methods for Linux-specific failure patterns | MEDIUM | L2 | Linux L1 runbooks | Log paths: `/var/log/` (system logs), `journalctl -u intune-agent` (agent service), `journalctl | grep intune-portal` (portal logs), `/var/log/intune-update.log` (update log), `/var/log/dpkg.log` (package installation). Service commands: `systemctl status intune-agent`, `systemctl enable --user --now intune-agent.timer`. No equivalent to mdmdiagnosticstool or IntuneMacODC |
| Linux capability matrix | Every platform has a capability matrix. Linux is the narrowest surface — this matrix communicates parity gaps vs. other platforms explicitly | MEDIUM | Admin | Linux taxonomy; existing 4-platform matrices | Axes: enrollment mechanism, identity (Entra join), app delivery, compliance depth, CA scope, monitoring/reporting, patching. Linux will show gaps in most rows vs Windows/macOS/iOS/Android. Cross-Platform Equivalences section: Linux CA (web-app only) ↔ iOS MAM-WE (no device enrollment required) — both are "compliance-lite" patterns |

### Differentiators

| Feature | Value Proposition | Complexity | Audience | Notes |
|---------|-------------------|------------|----------|-------|
| Linux custom compliance deep-dive | Custom compliance via Bash discovery scripts is Linux's unique mechanism (not available on iOS/Android; Windows has similar via PowerShell). Documenting the script-writing pattern, JSON output format, and how to test discovery scripts gives admins a differentiating capability not visible in compliance settings UI alone | MEDIUM | Admin, L2 | Bash script format: must output JSON `{"settingName": "value"}` pairs; discovery script runs on device; Intune evaluates output against expected values configured in policy |
| Linux CA enrollment trigger scenario | Linux is the only platform where the CA policy for Microsoft Edge is the primary enrollment motivation (unlike Windows OOBE/Autopilot or iOS/macOS ADE where enrollment is required before use). Documenting the CA-driven enrollment flow explicitly helps admins understand the intended design | LOW | Admin, L1 | Matches "web-app-CA only" constraint; relevant to explaining Linux narrowness vs. Windows/macOS |
| Identity Broker v2.0.2 re-enrollment warning | The architectural change in `intune-portal` 2.0.2+ causes automatic re-enrollment creating new device IDs. Device-based CA assignments, filters, and Entra group memberships relying on old device IDs must be reviewed. This is a high-impact admin pitfall with no equivalent on other platforms | LOW | Admin | Confirmed in Microsoft Learn deployment guide 2026-03-31 |

### Anti-Features (Out of Scope — Linux Pillar)

| Feature | Why Requested | Why Out of Scope | Alternative |
|---------|---------------|-----------------|-------------|
| RHEL / Rocky / Alma / Debian / SUSE Linux docs | Some admins ask for broader distro coverage | Explicitly out of scope per PROJECT.md: "Ubuntu LTS only in v1.5 per scope decision." RHEL 9/10 technically supported by Intune but not v1.5 | Flag RHEL 9/10 Intune support as a future v1.6+ candidate in Linux taxonomy overview |
| Linux server / IoT / headless device enrollment | Admins may want to enroll Ubuntu Server or containerized workloads | Unsupported by Intune (requires GNOME graphical desktop, user must sign in) — PROJECT.md explicitly excludes | Note in Linux taxonomy: Intune Linux support is desktop-client scope only |
| Linux app deployment via deb packages | Admins want Intune to deliver .deb packages like Win32/MSI | Intune does NOT deliver .deb packages. App delivery is Bash scripts only. No Win32/LOB equivalent for Linux | Document script-based app installation pattern as the supported mechanism |
| Linux configuration profiles (beyond compliance) | Admins expect MDM configuration profiles like macOS/iOS | Linux has no configuration profile concept in Intune. Only compliance policies and custom settings via scripts | Custom settings profile (Bash scripts) is the only configuration mechanism |
| Snap-based Intune delivery | Some communities discuss snap-based agent delivery | Intune agent is delivered as a deb package (`intune-portal`) from packages.microsoft.com. No snap equivalent | Document the deb-only delivery as the authoritative installation path |

---

## Pillar 3 — Operational Depth (Existing 4 Platforms)

### Background: Per-Domain Platform Depth Summary

Before listing features, understanding the platform variance is critical:

- **Co-management:** Windows-only concept (SCCM/ConfigMgr ↔ Intune). macOS/iOS/Android get contextual "no co-management equivalent" notes with their native migration paths (macOS: Jamf→Intune; iOS/Android: MAM→MDM, legacy DA→Enterprise).
- **Patch/update management:** Genuinely 4-way. Windows: WUfB rings + driver/firmware + Windows Autopatch + hotpatch. macOS: DDM migration (critical — MDM-based software update commands deprecated in Apple OS 26). iOS: DDM migration (same issue — MDM commands deprecated; also supervised vs. unsupervised DDM behavior). Android: Play-delivery + OEM-specific (Zebra LifeGuard GA Jan 2026 via Intune integration, Samsung Knox SP, Play Integrity strong integrity change effective Oct 2026).
- **App lifecycle automation:** Windows has the most mature (Win32 supersedence chains, dependency graphs, MSIX). macOS has PKG/DMG + Installomator/Intuneomator adjacency. iOS has VPP device vs. user licensing flows. Android has Managed Google Play private-app publishing + OEMConfig.
- **Drift detection + tenant migration:** Windows has Intune Remediations (Proactive Remediation scripts), deployment report-driven compliance, co-management migration workloads. macOS/iOS/Android use compliance policy drift + Intune report. Tenant migration is M&A-driven; Windows requires BitLocker re-key; macOS/iOS requires ABM token re-issue; Android requires MGP re-binding.

### Table Stakes — Co-Management (SCCM ↔ Intune)

| Feature | Why Expected | Complexity | Audience | Depends On | Notes |
|---------|--------------|------------|----------|------------|-------|
| Co-management overview + workload model | Admins migrating SCCM-managed Windows fleets to Intune need a conceptual anchor for the workload slider model before making any changes | MEDIUM | Admin | v1.2 Windows device lifecycle + migration content | 7 workloads verified: Compliance Policies, Windows Update Policies, Resource Access (deprecated in ConfigMgr 2203), Endpoint Protection, Device Configuration, Office Click-to-Run Apps, Client Apps. Switching Device Configuration workload implicitly switches Resource Access + Endpoint Protection |
| Workload slider migration sequence | Admins need a recommended migration order (low-risk first: Compliance → Resource Access → WU → Endpoint Protection → Device Config → Apps) | MEDIUM | Admin | Co-management overview | Standard community best practice: start with Compliance (read-only audit mode, no enforcement change), then move to Device Configuration after pilot. Apps last (heaviest lift — Win32 repackaging required). Aligns with v1.2 Windows migration content (APv1→APv2, imaging→Autopilot, GPO→Intune) |
| Tenant attach vs. full co-management distinction | Tenant attach (device sync + remote actions from Intune portal, no workload switching) is often confused with co-management (workload sliders active). Admins in staged migrations need to know the difference | LOW | Admin | Co-management overview | Tenant attach: admins can see ConfigMgr devices in Intune admin center + run remote actions. Full co-management: workload sliders enabled. Two different concepts with different prerequisites |
| Platform notes for non-Windows admins (macOS/iOS/Android) | macOS admins migrating from Jamf, iOS/Android admins moving from legacy DA or 3rd-party MDM need to know "there is no co-management for your platform — here's the equivalent" | LOW | Admin | v1.2 macOS content; v1.3 iOS content; v1.4 Android content | macOS: no SCCM equivalent; migration from Jamf is MDM-transfer via ABM. iOS/Android: no co-management equivalent; BYOD path migration from MAM to MDM is the closest analog. Note these as callouts in co-management doc |

### Differentiators — Co-Management

| Feature | Value Proposition | Complexity | Audience | Notes |
|---------|-------------------|------------|----------|-------|
| Windows Autopatch co-management prerequisite | Windows Autopatch requires Device Configuration AND Office Click-to-Run workloads fully moved to Intune. Documenting this as a migration gate prevents admins from enabling Autopatch prematurely | LOW | Admin | v1.2 Windows update content + co-management overview | Source: Microsoft Learn co-management workloads doc (verified 2026-04-15): "To use Windows Autopatch with these devices, this workload must be moved to Intune" |
| Pilot collection per workload pattern | Admins can use different pilot collections per workload — more granular than switching all at once. Documents the pilot collection strategy as a risk mitigation technique | LOW | Admin | Co-management workload overview | Each workload slider has a "Pilot" (collection-scoped) vs. "Intune" (all devices) setting. Pilot collection pattern aligns with ring-based patching philosophy |

### Table Stakes — Patch & Update Management

| Feature | Why Expected | Complexity | Audience | Depends On | Notes |
|---------|--------------|------------|----------|------------|-------|
| Windows: WUfB rings guide | Ring-based deferral (pilot → early adopters → broad) is the standard Windows enterprise patching pattern. Admins expect this to be documented clearly | MEDIUM | Admin, L2 | v1.2 Windows monitoring/operations content | Update rings control: deferral periods (quality/feature), deadline enforcement, restart behavior, user experience. Windows Autopatch provides automated ring management if co-management workload moved. Hotpatch GA for Windows 11 Enterprise 24H2+ (default from May 2026, requires VBS) |
| Windows: Driver and firmware via WUfB | Driver/firmware updates via Windows Update for Business (separate from quality/feature updates) are frequently misconfigured. Admins need explicit guidance on enabling driver updates without causing fleet-wide regressions | MEDIUM | Admin, L2 | Windows WUfB rings guide | Driver updates enabled/disabled per ring. Common pitfall: enabling driver updates in Intune while SCCM co-management still controls WU workload (dual-scan source conflict) |
| macOS: Update enforcement with DDM (CRITICAL) | Apple deprecated legacy MDM software update commands (ScheduleOSUpdate / OSUpdateStatus) in Apple OS 26. Organizations still using MDM-based policies WILL LOSE update management capability within 12 months. Migration to DDM is urgent | HIGH | Admin, L2 | v1.2 macOS admin setup content | DDM: `softwareupdate.enforcement.specific` declaration. Device autonomously applies updates to meet deadline. Intune admin center: Devices > Manage updates > Apple updates > Create policy (DDM-based). Previous forceDelayedSoftwareUpdates MDM key still functional on macOS 14 and earlier. macOS Recovery Lock management added in March 2026 Intune release |
| iOS: Update enforcement with DDM | Same DDM migration applies to iOS/iPadOS. Legacy MDM update commands deprecated in iOS 26/iPadOS 26. Basic DDM update keys now work on unsupervised devices (TargetOSVersion, TargetBuildVersion, TargetLocalDateTime, OfferPrograms) | HIGH | Admin, L2 | v1.3 iOS admin setup content | Supervised vs. unsupervised DDM behavior difference: supervised devices have additional control over update timing enforcement. Unsupervised devices can use basic DDM update keys since August 2025. This is a significant change from the prior "supervised-only" enforcement model |
| Android: Play-delivery patch policy | Android patch delivery is primarily via Google Play updates. Admins need to understand how to configure minimum security patch level in compliance + how Play Integrity strong integrity verdict now requires security patch ≤12 months old (effective Oct 2026) | MEDIUM | Admin, L2 | v1.4 Android compliance content | Play Integrity strong integrity change: Google updated definition in May 2025 for Android 13+ — requires hardware-backed security signals + security patch <12 months old. Intune enforcement deadline: Oct 31, 2026. Compliance policy: "Minimum security patch level" setting is the mitigation |
| Android: OEM-specific firmware management (Zebra LifeGuard) | Zebra devices in enterprise fleets need firmware managed separately from Play-delivery updates. Zebra LifeGuard OTA integration with Intune became GA in January 2026 | MEDIUM | Admin, L2 | v1.4.1 Zebra AOSP content + Android capability matrix | Zebra LifeGuard OTA: Intune manages creation/monitoring of deployments via Zebra API. Separate from Play-delivery updates. Configure in Intune admin center: Device updates > Android FOTA. Samsung KSP (Knox Service Plugin) for Samsung-specific patch windows is the analogous Samsung mechanism |

### Differentiators — Patch & Update Management

| Feature | Value Proposition | Complexity | Audience | Notes |
|---------|-------------------|------------|----------|-------|
| Cross-platform update management comparison table | Admins managing mixed fleets need a single reference showing: Windows (WUfB rings/Autopatch/hotpatch), macOS (DDM deadlines), iOS (DDM supervised vs. unsupervised), Android (Play-delivery + OEM FOTA). Single table in ops-depth update doc prevents repeated platform-hopping | MEDIUM | Admin | Logically belongs in Pillar 1 DEFER-08 comparison doc, OR as a callout in each platform's patch section |
| Windows hotpatch guidance | Hotpatch (security patches applied without reboot) becomes default for Windows 11 Enterprise 24H2+ from May 2026. Documenting requirements (VBS enabled, 24H2+, Enterprise SKU) and how to opt out prevents unexpected behavior changes | LOW | Admin | Windows WUfB content | New Intune admin center toggle: opt-out of hotpatch for all eligible devices (available from April 2026). Admins should understand the reboot reduction impact on compliance reporting |
| iOS unsupervised DDM update clarification | Prior to August 2025, iOS update enforcement was supervised-only. DDM now extends to unsupervised devices for basic update keys. This changes L2 investigation methodology (previously "unsupervised = can't enforce" was the answer) | LOW | L2, Admin | v1.3 iOS compliance content (supervised-only callout pattern must be updated) | This is a RETRACTION of a supervised-only callout in existing v1.3 iOS content — the compliance policy section and update guidance need a targeted update |

### Table Stakes — App Lifecycle Automation

| Feature | Why Expected | Complexity | Audience | Depends On | Notes |
|---------|--------------|------------|----------|------------|-------|
| Windows: Win32 supersedence chains guide | Win32 app supersedence (replace/update a previous version) is a standard Intune app lifecycle operation. Admins managing dozens of Win32 apps need the supersedence + dependency graph model explained clearly | MEDIUM | Admin, L2 | v1.2 Windows app deployment content | Supersedence limit: max 10 superseding apps per app. Supersedence ≠ dependency (cannot interchange). Replace vs. Update option: enable "uninstall previous version" for Replace, disable for Update. Targeting required on superseding app for supersedence to activate |
| Windows: .intunewin packaging at scale | Converting Win32 applications to .intunewin format and managing packaging pipeline for large app catalogs is a recurring admin task | MEDIUM | Admin | Windows Win32 supersedence | Win32ContentPrepTool for .intunewin creation. Detection rules (MSI product code, file, registry, custom script). Return codes for success/failure. Common pattern: custom detection script via PowerShell for complex apps |
| macOS: PKG/DMG app lifecycle guide | macOS app delivery via Intune supports: LOB PKG (flat package, Apple Developer ID Installer cert, signed), unmanaged PKG (via Intune agent, non-LOB), DMG (via Intune agent, mounts and copies .app to /Applications), Microsoft 365 apps (native VPP/managed), Store apps (Mac App Store via Apple Business Manager). Each type has different prerequisites | MEDIUM | Admin, L2 | v1.2 macOS app deployment content | Intuneomator (Swift-based, wraps Installomator) bridges gap between Installomator open-source library and Intune for automated macOS app lifecycle. Not officially supported but community-standard. Munki coexistence pattern documented at Automatica blog (2026-01) |
| iOS: VPP device-licensing vs user-licensing flows | VPP (Volume Purchase Program) app licensing has two models: device-assigned (license tied to device — no Apple ID required, silent install on supervised) vs. user-assigned (license tied to user — requires Apple ID, user must accept). Admins need to understand when each model applies and how to move licenses | MEDIUM | Admin, L2 | v1.3 iOS app deployment content | Device-licensing: preferred for corporate supervised. User-licensing: required for User Enrollment (BYOD). License reclamation: retire/wipe device returns device license; remove app returns user license. Silent install only on supervised (device-licensed) |
| Android: Managed Google Play private-app publishing | Enterprise apps not on public Play Store must be published as private apps in Managed Google Play console. Admins need the upload → approval → assignment workflow | MEDIUM | Admin | v1.4 Android BYOD/COBO admin content | Two publishing paths: (1) direct APK upload to MGP private track (for internal apps), (2) using MGP web app publishing for web clip shortcuts. AMAPI (Android Management API) note: custom apps go through Google Play custom app API as of 2024+ |
| Android: OEMConfig app delivery | OEMConfig apps allow Intune admins to configure OEM-specific settings beyond Android Management API scope. Zebra OEMConfig (WS50) and similar devices require Intune-APK side-loading or OEMConfig profiles | MEDIUM | Admin, L2 | v1.4.1 Zebra AOSP content | Zebra WS50: OEMConfig installed via Intune APK (not Managed Google Play). Documented in existing `10-aosp-zebra.md` — but operational lifecycle (update, revoke, troubleshoot) not yet documented |

### Differentiators — App Lifecycle Automation

| Feature | Value Proposition | Complexity | Audience | Notes |
|---------|-------------------|------------|----------|-------|
| Win32 dependency graph documentation | App dependencies (A requires B to be installed first) are distinct from supersedence. Documenting dependency chains (e.g., .NET runtime required before LOB app) prevents silent install failures | MEDIUM | Admin, L2 | Dependency: max 100 dependencies per app. Dependencies apply recursively. Circular dependencies blocked by Intune but can occur if admin misconfigures |
| macOS Installomator/Intuneomator adjacency callout | Many macOS Intune environments use Installomator (community tool) or Intuneomator (Swift wrapper) to automate PKG sourcing and packaging. A callout that acknowledges this community pattern (without endorsing as officially supported) provides realistic operational guidance | LOW | Admin | Confidence: MEDIUM (community practice, not Microsoft-documented). Analogous to Munki coexistence pattern |

### Anti-Features — App Lifecycle Automation

| Feature | Why Requested | Why Out of Scope | Alternative |
|---------|---------------|-----------------|-------------|
| Samsung E-FOTA firmware management | Admins with Samsung COBO fleets ask about E-FOTA | Explicitly excluded from v1.4 scope (orthogonal to Intune enrollment). E-FOTA is Samsung-proprietary firmware management, separate from Managed Google Play delivery | Note E-FOTA exclusion in Android app lifecycle section with redirect to Samsung Knox documentation |
| iOS App Store private app distribution (non-VPP) | Developers ask about ad-hoc / TestFlight / enterprise in-house distribution | TestFlight and ad-hoc distribution bypass Intune MDM delivery entirely. Enterprise in-house requires Apple Developer Enterprise Program, separate from Intune VPP | Document Intune VPP device/user licensing as the supported mechanism; note Apple's distribution alternatives are outside Intune scope |

### Table Stakes — Drift Detection + Tenant Migration

| Feature | Why Expected | Complexity | Audience | Depends On | Notes |
|---------|--------------|------------|----------|------------|-------|
| Windows: Intune Remediations for configuration drift | Intune Remediations (Proactive Remediations) = detection + remediation Bash/PowerShell script pairs that run on schedule. This is the primary drift-detection mechanism for Windows. Admins need to understand the detect-fix-report loop | MEDIUM | Admin, L2 | v1.2 Windows monitoring/operations content | Portal path: Devices > Manage devices > Scripts and remediations > Remediation scripts. Reports: per-device status (No issues detected / Issues fixed / Error). Output limited in portal; full script output visible via Log Analytics. Windows Enterprise/Pro/Education only (not Home). Requires Intune + Entra joined or hybrid joined |
| Cross-platform: Deployment-report-driven compliance drift | Intune compliance reports show devices that drift from compliant to non-compliant over time. This deployment-report-driven drift detection pattern is shared across Windows/macOS/iOS/Android (differs per platform in what causes drift) | MEDIUM | Admin, L2 | All 4 existing platform compliance docs | Intune admin center: Devices > Monitor > Device compliance. Per-platform drift scenarios: Windows (policy conflict / app install regression), macOS (profile revocation), iOS (jailbreak detection / OS downgrade), Android (Play Integrity verdict change) |
| Windows: Tenant-to-tenant migration runbook | M&A scenarios require migrating Intune-managed Windows devices between tenants. BitLocker re-keying is the critical complication | HIGH | Admin | v1.2 Windows device lifecycle + migration content | BitLocker re-key approach: source tenant must escrow existing recovery key to target Entra ID via PowerShell script (scheduled task post-migration). Alternative: decrypt → re-encrypt post-Intune enrollment in target tenant (data risk window). Third-party tools: Quest On Demand Migration provides automated BitLocker re-key scripting. Key challenge: Autopilot registration in source tenant must be removed before re-registration in target |
| macOS/iOS: Tenant-to-tenant migration runbook | M&A scenarios require migrating ABM-enrolled macOS/iOS devices between tenants. ABM token re-issue is the critical complication | HIGH | Admin | v1.2 macOS admin setup; v1.3 iOS admin setup | ABM token re-issue: cannot transfer an MDM server assignment from Tenant A to Tenant B directly. Device must be released from ABM MDM assignment in Tenant A, then re-assigned to Tenant B MDM server. For devices still in use, this requires a wipe + re-enrollment. ADE-enrolled devices without Await Configuration disabled will re-enroll to old MDM server without proper ABM assignment |
| Android: Tenant-to-tenant migration (MGP re-binding) | M&A scenarios for Android Enterprise require Managed Google Play re-binding to target Intune tenant | HIGH | Admin | v1.4 Android admin setup; v1.4 MGP binding guide | MGP binding is tenant-specific: cannot transfer binding between Intune tenants. Must: (1) disconnect from source tenant MGP, (2) bind new MGP account (or existing corporate Google account) to target Intune tenant, (3) re-approve all apps, (4) re-provision devices (factory reset + re-enrollment for corporate-owned; work profile re-creation for BYOD). ZTE devices: re-upload to Zero-Touch portal with target tenant credentials |

### Differentiators — Drift Detection + Tenant Migration

| Feature | Value Proposition | Complexity | Audience | Notes |
|---------|-------------------|------------|----------|-------|
| Cross-platform BitLocker/FileVault/Android encryption drift patterns | Per-platform encryption drift scenarios in a single reference: Windows (BitLocker re-key after tenant migration, key escrowed to wrong tenant), macOS (FileVault escrow not updated after re-enrollment), iOS (no device-level encryption management beyond compliance check), Android (LUKS encryption not available; AOSP has different dm-crypt behavior) | MEDIUM | Admin, L2 | Conceptually belongs in tenant migration runbook section |
| Intune Remediations script authoring pattern | The detect-fix-remediate pattern is reusable across Windows fleet. Documenting a canonical script structure (detection returns exit 1 / remediation returns exit 0, portal report interpretation) gives L2 engineers a reusable pattern | MEDIUM | L2 | Requires: Windows Enterprise/Pro/Edu + Intune + Entra joined or hybrid. NOT available on macOS/iOS/Android (Remediations is Windows-only) |

### Anti-Features — Drift + Tenant Migration

| Feature | Why Requested | Why Out of Scope | Alternative |
|---------|---------------|-----------------|-------------|
| Full SCCM-to-Intune migration playbook (replace v1.2 docs) | Admins want a comprehensive guide replacing v1.2 imaging→Autopilot and GPO→Intune migration docs | v1.2 already covers imaging→Autopilot and GPO→Intune. Co-management is the delta in v1.5 — not a full rewrite | Ops-depth co-management guide is additive to v1.2 migration content; cross-link via forward/backward references |
| Cross-tenant device license migration | Azure AD device licenses (Intune per-device) must be re-assigned in M&A | This is a licensing/procurement operation, not an Intune provisioning operation. Out of documentation scope | Note in tenant migration runbook that licensing changes are required; link to Microsoft licensing documentation |

---

## Pillar 4 — Validation Tooling

### Table Stakes

| Feature | Why Expected | Complexity | Audience | Depends On | Notes |
|---------|--------------|------------|----------|------------|-------|
| `v1.5-milestone-audit.mjs` harness | Established pattern from v1.4/v1.4.1 — every milestone ships a versioned audit harness. v1.5 must extend the lineage | MEDIUM | — | v1.4.1 harness + sidecar; STATE.md harness carry-forward notes | New checks needed: Linux platform file presence (taxonomy + glossary + capability matrix + L1 + L2 + admin setup), ops-domain content presence (co-mgmt doc, patch guides per platform, app lifecycle guides, drift/tenant migration docs), DEFER-07 Android nav unification completion (Android sections in index.md + common-issues + quick-refs), DEFER-08 4-platform comparison doc structural validation. Existing C1-C9 checks carried forward; new checks at C10+ informational-first |
| Per-phase `check-phase-NN.mjs` validators | v1.3+ pattern: validator ships alongside content phase. Continues v1.5 | LOW | — | v1.4.1 validator-as-deliverable pattern | Each new v1.5 phase produces its own `check-phase-NN.mjs`. Orchestrator registers in CI workflow |

### Differentiators

| Feature | Value Proposition | Complexity | Audience | Notes |
|---------|-------------------|------------|----------|-------|
| `regenerate-supervision-pins.mjs` self-test baseline refresh | Per STATE.md out-of-band carry-over: self-test has stale BASELINE_9 vs Phase 44+ file coordinates. v1.5 audit phase should refresh baselines | LOW | — | v1.4.1 `regenerate-supervision-pins.mjs` helper |

---

## Feature Dependencies

```
Linux taxonomy + distro framework
    └──required-before──> Linux glossary
    └──required-before──> Linux admin setup (enrollment config)
                              └──required-before──> Linux compliance policy guide
                              └──required-before──> Linux end-user enrollment guide
                                                        └──required-before──> Linux L1 runbooks
                                                                                  └──required-before──> Linux L2 investigation
    └──required-before──> Linux capability matrix (synthesizes all Linux features)

DEFER-07 Android nav unification
    └──requires──> All v1.4.1 Android content (already shipped)
    └──required-before──> DEFER-08 4-platform comparison doc
                              └──requires──> All 4 existing platform capability matrices (already shipped)
                              └──requires──> Linux capability matrix

Co-management overview
    └──requires──> v1.2 Windows migration content (already shipped)
    └──required-before──> Patch/update management (WUfB rings co-mgmt prerequisite callout)

Patch/update management guides (per platform)
    └──requires──> v1.2 macOS admin setup (already shipped)
    └──requires──> v1.3 iOS compliance + admin setup (already shipped)
    └──requires──> v1.4 Android compliance content (already shipped)
    └──important──> iOS DDM update change requires targeted RETRACTION of supervised-only callout in v1.3 iOS compliance guide

App lifecycle automation
    └──requires──> v1.2 Windows app deployment content (already shipped)
    └──requires──> v1.3 iOS VPP content (already shipped)
    └──requires──> v1.4 Android MGP content (already shipped)
    └──iOS VPP device-licensing guide ──enhances──> v1.3 iOS app deployment (additive)

Drift detection guides
    └──requires──> v1.2 Windows monitoring/operations (already shipped)

Tenant migration runbooks
    └──requires──> v1.2 Windows device lifecycle (already shipped)
    └──requires──> v1.2 macOS admin setup (already shipped)
    └──requires──> v1.4 Android MGP binding guide (already shipped)
    └──Windows tenant migration ──depends-on──> Co-management overview (BitLocker + Endpoint Protection workload)

v1.5 audit harness
    └──requires──> v1.4.1 harness + sidecar (already shipped)
    └──requires-all-content-before──> Terminal re-audit pass (last v1.5 phase)
```

---

## Feature Prioritization Matrix

| Feature | Audience Value | Complexity | Priority | Pillar |
|---------|---------------|------------|----------|--------|
| DEFER-07 Android nav unification (index + common-issues + quick-refs) | HIGH — existing users cannot navigate Android content | MEDIUM | P1 | Cleanup |
| DEFER-08 4-platform comparison doc | HIGH — mixed-fleet admins have no cross-platform reference | HIGH | P1 | Cleanup |
| Linux platform taxonomy + distro framework overview | HIGH — foundation for all Linux content | LOW | P1 | Linux |
| Linux admin setup (enrollment config + compliance policy) | HIGH — admins must do this before users can enroll | MEDIUM | P1 | Linux |
| Linux end-user enrollment guide | HIGH — no zero-touch; user-driven required | LOW | P1 | Linux |
| Linux L1 triage + runbooks | HIGH — L1 helpdesk blocked without this | MEDIUM | P1 | Linux |
| Linux L2 investigation guide | HIGH — L2 investigation requires log paths + service commands | MEDIUM | P1 | Linux |
| Linux capability matrix | MEDIUM — contextualizes Linux narrowness for admins | MEDIUM | P1 | Linux |
| Linux glossary | MEDIUM — terminology foundation | LOW | P1 | Linux |
| macOS DDM update management (URGENT migration) | HIGH — deprecated commands in Apple OS 26; urgent doc update | HIGH | P1 | Ops-depth |
| iOS DDM update management + unsupervised DDM clarification | HIGH — same DDM migration timeline as macOS | HIGH | P1 | Ops-depth |
| Co-management overview + workload slider guide | HIGH — SCCM→Intune migration is common enterprise scenario | MEDIUM | P1 | Ops-depth |
| Windows WUfB rings + hotpatch guide | HIGH — standard Windows patching expectation | MEDIUM | P1 | Ops-depth |
| Android patch management (Play Integrity + Zebra LifeGuard) | HIGH — Play Integrity strong integrity Oct 2026 deadline | MEDIUM | P1 | Ops-depth |
| Cross-platform broken-link sweep | MEDIUM — documentation integrity | HIGH | P1 | Cleanup |
| Win32 supersedence + dependency graph | MEDIUM — app lifecycle is common admin task | MEDIUM | P2 | Ops-depth |
| macOS PKG/DMG app lifecycle | MEDIUM — macOS app ops | MEDIUM | P2 | Ops-depth |
| iOS VPP device vs. user licensing flows | MEDIUM — VPP lifecycle is ongoing admin task | MEDIUM | P2 | Ops-depth |
| Android MGP private-app publishing | MEDIUM — enterprise app ops | MEDIUM | P2 | Ops-depth |
| Windows: Intune Remediations for drift detection | MEDIUM — proactive ops capability | MEDIUM | P2 | Ops-depth |
| Windows tenant-to-tenant migration + BitLocker re-key | MEDIUM — M&A scenario | HIGH | P2 | Ops-depth |
| macOS/iOS tenant migration (ABM token re-issue) | MEDIUM — M&A scenario | HIGH | P2 | Ops-depth |
| Android tenant migration (MGP re-binding) | MEDIUM — M&A scenario | HIGH | P2 | Ops-depth |
| Cross-platform deployment-report-driven compliance drift | LOW-MEDIUM — ops maturity | MEDIUM | P2 | Ops-depth |
| v1.5 audit harness + per-phase validators | HIGH process — maintains CI discipline | MEDIUM | P1 | Tooling |
| `regenerate-supervision-pins.mjs` self-test baseline refresh | LOW — carry-over debt | LOW | P3 | Tooling |
| Linux custom compliance Bash script deep-dive | MEDIUM — advanced admin | MEDIUM | P3 | Linux |

---

## Audience Tier Breakdown

| Feature Group | L1 (Scripted) | L2 (Technical) | Admin (Config) |
|---------------|--------------|----------------|---------------|
| DEFER-07 Android nav | Uses new runbook links in quick-ref + common-issues | Uses new L2 runbook links | Sees complete Android hub coverage |
| DEFER-08 comparison doc | — | Reference | Primary audience |
| Linux enrollment flow | Runs end-user enrollment steps, basic triage | Log collection, agent service checks | Sets up compliance + CA policies |
| Linux compliance | Recognizes non-compliant state categories | Interprets settings catalog compliance evaluation | Configures 4-category compliance policy |
| Linux CA (web-app) | Knows to confirm Edge is signed in | Checks Entra CA policy assignment + device compliance | Creates device-based CA policy scoped to Linux |
| Linux L1 triage | Primary audience — decision tree + runbooks | — | — |
| Linux L2 investigation | — | Primary audience — log paths + service commands | — |
| Co-management | — | Monitors workload switch status, investigates dual-authority conflicts | Primary audience — workload slider migration |
| Patch/update management | Recognizes update compliance failures | Investigates WUfB dual-scan conflicts, DDM status | Primary audience — configures update rings/DDM |
| App lifecycle automation | — | Investigates install failures, checks dependency chains | Primary audience — packaging + publishing |
| Drift detection | — | Runs Remediations scripts, interprets reports | Configures Remediations script pairs |
| Tenant migration | — | Executes migration scripts (BitLocker re-key, device re-enrollment) | Primary audience — plans migration sequence |

---

## Sources

- Microsoft Learn: Linux device enrollment guide — `https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-enrollment-linux` (updated 2026-04-16, verified 2026-04-26, HIGH confidence)
- Microsoft Learn: Linux deployment guide — `https://learn.microsoft.com/en-us/intune/fundamentals/platform-guide-linux` (updated 2026-04-16, HIGH confidence)
- Microsoft Learn: Linux compliance settings — `https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-linux` (updated 2025-08-15, HIGH confidence)
- Microsoft Learn: Enroll a Linux device in Intune — `https://learn.microsoft.com/en-us/intune/user-help/enrollment/enroll-linux` (updated 2026-04-08, HIGH confidence)
- Microsoft Learn: Get the Microsoft Intune app for Linux — `https://learn.microsoft.com/en-us/intune/intune-service/user-help/microsoft-intune-app-linux` (updated 2026-04-08, HIGH confidence)
- Microsoft Learn: Co-management workloads — `https://learn.microsoft.com/en-us/intune/configmgr/comanage/workloads` (updated 2026-04-15, HIGH confidence)
- Microsoft Learn: Zebra LifeGuard OTA Integration — `https://learn.microsoft.com/en-us/intune/device-updates/android/zebra-lifeguard-ota-integration` (GA January 2026, HIGH confidence)
- Microsoft Learn: iOS software updates (deprecated MDM policies) — `https://learn.microsoft.com/en-us/intune/device-updates/apple/deprecated-mdm-policies-ios` (HIGH confidence for deprecation timeline)
- Microsoft Learn: macOS software updates — `https://learn.microsoft.com/en-us/intune/device-updates/apple/software-updates-macos` (HIGH confidence)
- Microsoft Learn: Win32 app supersedence — `https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-supersedence` (HIGH confidence)
- Microsoft TechCommunity: Play Integrity strong integrity change May 2025 — `https://techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-changes-to-google-play-strong-integrity-for-android-13-or-above/4435130` (HIGH confidence)
- 4sysops: Intune March 2026 release — `https://4sysops.com/archives/microsoft-intune-march-2026-hotpatch-by-default-macos-recovery-lock-apple-ddm/` (MEDIUM confidence — community verified against official release notes)
- IntuneIRL: macOS/iOS DDM migration urgency — `https://intuneirl.com/macos-ios-26-for-enterprise-ddm-deployment-and-the-intel-mac-sunset/` (MEDIUM confidence — community blog, aligns with Apple WWDC 2025 deprecation announcement)
- jannikreinhard.com: Linux Bash script deployment with Intune — `https://jannikreinhard.com/2023/04/16/creating-and-configuring-bash-scripts-for-ubuntu-devices-in-intune/` (MEDIUM confidence — community verified against Microsoft Learn custom settings Linux doc)
- BluetechGreen: SCCM to Intune migration checklist 2026 — `https://bluetechgreen.com/blog/2026-02-05-sccm-to-intune-migration-checklist.html` (MEDIUM confidence — community, consistent with Microsoft Learn workloads doc)
- OSDSune: Migrate BitLocker keys to Entra ID — `https://www.osdsune.com/home/blog/microsoft-intune/how-to-migrate-bitlocker-key-s-from-all-fixed-drives-to-microsoft-entra-id.` (MEDIUM confidence — community PowerShell approach)
- Quest On Demand Migration: BitLocker cleanup — `https://support.quest.com/technical-documents/on-demand-migration/current/active-directory-intune--autopilot-and-bitlocker-cleanup-quick-start-guide` (MEDIUM confidence — third-party tool vendor doc)

---

*Feature research for: Microsoft Intune provisioning documentation suite — v1.5 (Linux + ops-depth + cleanup)*
*Researched: 2026-04-26*
