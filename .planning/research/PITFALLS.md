# Pitfalls Research

**Domain:** Cross-Platform Provisioning Documentation (macOS ABM/ADE + Windows Autopilot Operational Gaps)
**Researched:** 2026-04-13
**Confidence:** HIGH (Microsoft Learn official docs, Apple developer documentation, community-validated issues, prior v1.0/v1.1 pitfalls research)

**Scope:** This pitfalls document covers the v1.2 milestone -- adding macOS provisioning documentation alongside existing Windows Autopilot docs, closing lifecycle/operational gaps, and writing migration guides. It supersedes the v1.0 PITFALLS.md for this milestone's planning purposes. The v1.0 pitfalls remain valid for Windows-specific content.

---

## Critical Pitfalls

### Pitfall 1: Windows-Centric Mental Model Applied to macOS Provisioning

**What goes wrong:**
Documentation writers familiar with Windows Autopilot unconsciously map Autopilot concepts onto macOS ADE. The result is macOS docs that describe ADE as "Autopilot for Mac" and use Windows terminology (ESP, hardware hash, deployment profile) where Apple/Intune uses different terms (Setup Assistant, serial number assignment, enrollment profile). Readers then expect macOS enrollment to behave like Autopilot -- waiting for an ESP-like tracking screen, expecting a hardware hash upload step, or looking for "deployment modes" that do not exist on macOS. This creates false expectations that generate support tickets.

**Why it happens:**
The existing documentation suite is 70 files of Windows Autopilot content. Writers and reviewers have internalized Windows provisioning as the default mental model. macOS ADE through Intune superficially resembles Autopilot (corporate device, zero-touch, enrolled at first boot), which makes the analogy feel natural rather than dangerous.

**How to avoid:**
- Establish a macOS terminology standard before writing any content. Key translations: "Autopilot profile" becomes "ADE enrollment profile"; "ESP" has no macOS equivalent (use "Await final configuration" for the closest analog); "hardware hash" becomes "serial number assignment in ABM"; "deployment modes" becomes "enrollment with/without user affinity"
- Every macOS document must stand alone -- never assume the reader has read the Windows docs. Cross-references to Windows concepts should be comparative ("Unlike Windows Autopilot, macOS ADE does not have...") not assumptive
- Create a cross-platform comparison page early (before any macOS guides) that explicitly maps: what exists on both platforms, what exists only on Windows, what exists only on macOS, and what looks similar but behaves differently
- Review every macOS draft with the question: "Would this confuse someone who has never used Windows Autopilot?"

**Warning signs:**
- macOS doc refers to "the Autopilot profile" when meaning the ADE enrollment profile
- macOS doc mentions "ESP" without clarifying that macOS does not have one
- macOS doc describes "hardware hash upload" when the actual mechanism is serial number assignment via ABM
- macOS troubleshooting references Windows-specific tools (Get-AutopilotDiagnostics, MDM Diagnostic Tool command-line syntax)
- macOS doc says "deployment mode" when macOS ADE has enrollment affinity settings, not modes

**Phase to address:** Phase 1 (Cross-platform foundation) -- establish terminology glossary and cross-platform comparison page before any macOS content is written

---

### Pitfall 2: macOS Documentation Written Against a Moving Target (Apple Annual OS Deprecation Cycle)

**What goes wrong:**
macOS documentation becomes incorrect within 3-6 months of publication because Apple deprecates and removes management capabilities on an annual cycle tied to WWDC and fall OS releases. The most critical current example: Apple has deprecated all legacy MDM software update commands (com.apple.SoftwareUpdate payload, MDM update commands, MDM update queries) and will completely remove them with the 2026 OS release (macOS 26 / Tahoe). Documentation that describes how to configure software updates using legacy methods will be actively harmful when macOS 26 ships -- admins following those steps will configure policies that silently do nothing.

Other confirmed deprecation/change vectors:
- Setup Assistant screens change with each macOS version (macOS 26.0 adds "Additional privacy settings"; macOS 26.1 adds "OS Showcase" and "Update completed" screens)
- The Restore screen behavior changed in macOS 15.4 (it can no longer be hidden; users get an alert instead)
- Platform SSO is now integrated into Setup Assistant as of macOS 26, changing the enrollment flow
- Apple moved to year-based OS versioning (macOS 26 instead of macOS 16), which changes how version numbers should be referenced
- Managed Apple Accounts are becoming mandatory for corporate fleets
- MDM migration without device wipes is a new capability in macOS 26

**Why it happens:**
Apple announces changes at WWDC (June), ships betas over summer, releases the OS in fall, and enforces deprecations the following year. The cycle is predictable but the documentation window is narrow. Writers who document current behavior without flagging deprecation timelines produce content that becomes incorrect on a schedule. Unlike Windows where Intune updates are incremental, Apple makes architectural changes (e.g., replacing command-based MDM with DDM) that invalidate entire categories of documentation.

**How to avoid:**
- Every macOS document must include a "Verified for macOS version" field and a "Review by" date aligned to Apple's annual release cycle (September/October of each year)
- Create a dedicated "macOS version changelog" reference page that tracks: which Setup Assistant screens exist per macOS version, which MDM capabilities are deprecated/removed per version, which Intune features require specific macOS minimum versions
- For any capability documented as "current," check Apple's deprecation announcements. If a capability is deprecated, the doc must note: "Deprecated as of [version]. Will be removed in [version]. Use [replacement] instead."
- Specifically for software updates: document DDM (Declarative Device Management) as the primary method. Do not document legacy MDM update commands at all -- they are already deprecated and documenting them invites misuse
- Structure macOS docs so that version-specific content is in clearly tagged callout blocks, not inline prose, making updates easier when versions change
- Monitor the Apple Platform Deployment Guide (support.apple.com/guide/deployment) and the Apple Developer documentation (developer.apple.com/documentation/devicemanagement) for changes after each WWDC

**Warning signs:**
- macOS doc references com.apple.SoftwareUpdate or legacy MDM update commands
- macOS doc does not specify which macOS version it was verified against
- macOS doc describes Setup Assistant screens without noting version availability (e.g., "hide the Restore screen" without noting this is not possible on macOS 15.4+)
- No review cadence aligned to Apple's annual release cycle
- macOS doc treats DDM and legacy MDM as equal options rather than noting DDM as the required path forward

**Phase to address:** Phase 1 (Cross-platform foundation) -- establish the version-gating metadata standard for macOS before writing content. Revisit all macOS content in a dedicated review phase after Apple's fall OS release.

---

### Pitfall 3: Assuming Intune macOS Feature Parity with Windows

**What goes wrong:**
Documentation implies macOS can do everything Windows can through Intune, leading admins to attempt configurations that do not exist, fail silently, or require workarounds. Key feature gaps that cause real problems when undocumented:

- **App deployment**: macOS PKG apps cannot be natively uninstalled through Intune (unlike Win32 apps). PKG files must be flat packages, signed with Apple Developer ID Installer certificate, install to /Applications, and be under 2 GB. DMG apps support uninstall but require full disk access permission for updates/deletes. There is no equivalent to Win32 app detection rules or return codes -- macOS uses a simpler install/uninstall model.
- **Compliance policies**: macOS cannot enforce OS version requirements at enrollment time (unlike Windows enrollment restrictions). OS version compliance can only be evaluated after enrollment. The Defender for Endpoint integration is less granular on macOS than Windows.
- **Configuration profiles**: macOS does not allow MDM control of certain settings (e.g., Bluetooth cannot be disabled via configuration profile -- requires a custom shell script). Many macOS configurations require custom profiles via Settings Catalog or .mobileconfig XML, not the guided UI available for Windows.
- **Software updates**: macOS now requires DDM for software update management. The Windows "Update rings" and "Feature update policies" model has no direct macOS equivalent.
- **Security baselines**: There is no macOS security baseline equivalent to the Windows security baselines in Intune. macOS security hardening is done through individual configuration profiles and shell scripts, often referencing CIS or NIST benchmarks manually.
- **Enrollment experience**: macOS has no ESP equivalent. "Await final configuration" holds the user at Setup Assistant but provides no progress tracking or app installation visibility.

**Why it happens:**
Intune is a single admin console for both platforms, which creates an expectation of feature parity. Microsoft's marketing emphasizes "manage all your devices from one place," which is true for the management plane but misleading for capability depth. Windows-experienced admins naturally expect the same knobs to exist for macOS.

**How to avoid:**
- Create a "macOS vs. Windows capability matrix" as a reference page. For each major capability area (enrollment, compliance, configuration, app deployment, updates, security), state what is available on each platform and what is not. This is the most important cross-platform reference document.
- Every macOS admin setup guide must document what IS available, not what the admin might expect from Windows experience. If a Windows-equivalent capability does not exist on macOS, say so explicitly with the recommended workaround (e.g., "macOS does not have security baselines. Use CIS Benchmark configuration profiles instead.")
- macOS app deployment guides must call out the PKG vs. DMG distinction, the uninstall limitations, the 2 GB size limit, and the signing requirements. Do not assume the admin has read Windows Win32 app deployment docs.
- Document shell script-based workarounds as a first-class pattern on macOS. Unlike Windows where most configurations are GUI-driven in Intune, macOS administration frequently requires custom scripts.

**Warning signs:**
- macOS admin guide says "configure compliance to block enrollment for devices below minimum OS version" (not possible on macOS)
- macOS guide references "security baselines" without noting they do not exist for macOS
- macOS app deployment guide does not mention the uninstall limitation for PKG apps
- macOS guide does not mention shell scripts as a primary configuration mechanism
- A capability matrix comparing Windows and macOS does not exist

**Phase to address:** Phase 2 (macOS admin setup guides) -- the capability matrix must exist before or alongside the first macOS admin guide. Each macOS admin guide must be reviewed against the matrix.

---

### Pitfall 4: Cross-Platform Navigation That Routes Users to the Wrong Platform's Docs

**What goes wrong:**
The navigation hub (docs/index.md) becomes a confusing menu of Windows and macOS links without clear platform separation. L1 agents troubleshooting a macOS enrollment failure open a Windows Autopilot runbook because the link titles are similar ("Enrollment Failure" could mean either platform). Admins setting up macOS ADE click through to Windows Autopilot profile configuration because the section headers say "Deployment Profiles" without platform qualification. Every wrong-platform click wastes 2-5 minutes and erodes trust in the documentation.

**Why it happens:**
The existing index.md is organized by audience (L1, L2, Admin) and framework (APv1, APv2). Adding macOS creates a third axis (platform) that does not fit cleanly into the existing two-axis structure. Writers add macOS links into existing sections rather than restructuring. The result is a flat list where platform identity is buried in link text rather than being a primary navigation axis.

**How to avoid:**
- Restructure the navigation hub with platform as the top-level axis: "Windows Provisioning" and "macOS Provisioning" as primary sections, with audience (L1/L2/Admin) as the secondary axis within each platform section. Include a "Cross-Platform References" section for shared content (glossary, capability matrix, compliance/CA policies)
- Every link title must include the platform: "[macOS] ADE Enrollment Failure" not "Enrollment Failure". Every section header must include the platform: "macOS Admin Setup" not "Admin Setup"
- Add a platform selector prompt at the top of the index: "Which platform are you troubleshooting? [Windows] [macOS]" with clear routing
- File naming convention must include the platform: `macos-ade-enrollment-profile.md` not `enrollment-profile.md`. The existing Windows docs already use platform-implicit names; macOS docs must be platform-explicit
- Test the navigation with someone unfamiliar with the docs -- can they find the correct macOS troubleshooting guide within 30 seconds?

**Warning signs:**
- macOS links are interleaved with Windows links in the same table
- Link titles do not include the platform name
- An L1 agent looking at a macOS enrollment failure lands on a Windows ESP troubleshooting page
- File names are ambiguous across platforms (e.g., both `enrollment-failure.md` for Windows and macOS)
- No "which platform?" routing at the top of the index

**Phase to address:** Phase 1 (Cross-platform foundation) -- navigation restructure must happen before macOS content is added, or the index becomes a disorganized list that requires a second restructure later.

---

### Pitfall 5: ABM/ADE Token and Certificate Lifecycle Documented as a One-Time Setup

**What goes wrong:**
macOS admin setup guides describe the ABM token creation and Apple MDM Push certificate creation as one-time setup tasks. In reality, both require annual renewal, and failure to renew causes silent enrollment failures:

- The Apple MDM Push certificate expires after one year. If it lapses, all enrolled macOS devices lose management silently -- they do not unenroll, but Intune can no longer push policies, apps, or commands to them. Re-enrollment requires device wipe.
- The ABM server token also requires annual renewal. If it lapses, Intune stops syncing new devices from ABM, and the 403 "T_C_NOT_SIGNED" error appears when Apple updates its Terms and Conditions (which happened in April 2025 and can happen again at any time).
- The ABM token must be renewed using the same Apple ID that created it. If that person leaves the organization and the Apple ID is lost, recovery requires Apple Support intervention.

**Why it happens:**
Setup guides naturally focus on the initial configuration workflow. Renewal is a different workflow that happens a year later, when no one remembers the original setup. The Apple ID ownership problem is invisible at setup time -- it only surfaces during renewal when the original admin is gone.

**How to avoid:**
- Every macOS admin setup guide that creates a token or certificate must include a "Renewal and Lifecycle" section immediately after the setup steps, not as an appendix
- Document the renewal workflow with the same step-by-step detail as the initial setup
- Include explicit warnings about Apple ID ownership: "Record the Apple ID used to create this token. This same Apple ID must be used for all future renewals. Ensure this is a shared/service account, not a personal account. If the Apple ID is lost, contact Apple Support."
- Document the consequences of lapsed tokens/certificates with specific symptoms: "If the MDM Push certificate expires, enrolled devices will stop receiving policy updates within 24 hours. New devices will fail enrollment. Resolution requires certificate renewal and device re-enrollment."
- Include the ABM Terms and Conditions acceptance requirement: "When Apple updates its Terms and Conditions, the ABM administrator must log in and accept them. Failure to do so causes a 403 T_C_NOT_SIGNED error in Intune."
- Recommend a calendar reminder (document the specific calendar entry to create) for 30 days before certificate/token expiration

**Warning signs:**
- macOS setup guide has no "Renewal" section
- No mention of Apple ID ownership risk
- No mention of ABM Terms and Conditions acceptance requirement
- Token/certificate lifecycle is described only in a "troubleshooting" section rather than proactively in setup
- No mention of consequences for lapsed certificates

**Phase to address:** Phase 2 (macOS admin setup guides) -- renewal lifecycle must be part of every setup guide, not a separate troubleshooting topic discovered later.

---

### Pitfall 6: Migration Guides That Present APv1-to-APv2 as a Simple Cutover

**What goes wrong:**
Migration documentation presents the transition from APv1 to APv2 as a feature upgrade: "switch from Autopilot profiles to Device Preparation policies." In reality, APv2 is architecturally different and does not support several APv1 capabilities. Teams that follow a "cutover" migration plan discover mid-deployment that:

- APv2 does not support pre-provisioning (white glove) -- organizations relying on pre-provisioning cannot migrate those devices
- APv2 does not support self-deploying mode -- kiosk/shared device scenarios have no APv2 path
- APv2 does not support hybrid Entra join -- organizations with on-premises AD dependency cannot use APv2 for those devices
- APv2 is Windows 11 only -- Windows 10 devices cannot migrate
- APv2 has no ESP -- the entire app installation tracking mechanism is different (blocking desktop access vs. progress screen)
- Hardware hashes registered for APv1 must be deregistered before APv2 can take over -- APv1 profiles take precedence. Failing to deregister causes devices to continue enrolling via APv1
- APv2 branding behavior is different -- organization logo/branding does not appear during OOBE because APv2 gets its profile after login, not before
- APv2 app/script tracking is fundamentally different from ESP tracking

**Why it happens:**
Microsoft positions APv2 as the successor to APv1, which creates an expectation that migration is a natural upgrade path. The "compare" documentation lists differences but does not frame them as migration blockers. Writers who have not personally attempted the migration assume the differences are cosmetic.

**How to avoid:**
- Open the migration guide with a "Migration Readiness Checklist" that identifies which devices CAN and CANNOT migrate. The checklist must cover: OS version (Windows 11 required), join type (Entra join only), deployment mode (user-driven only), pre-provisioning dependency (blocker if yes), self-deploying dependency (blocker if yes)
- Frame the migration as a "parallel deployment" not a "cutover" -- APv1 and APv2 will coexist for most organizations. The guide should describe how to run both simultaneously
- Document the hardware hash deregistration requirement as step 1 of any migration: "Devices with registered hardware hashes will always use APv1. You must deregister the hardware hash in Intune before the device can enroll via APv2."
- Include a "What changes for the user" section: no branding during OOBE, no ESP progress screen, different post-login experience
- Include a "What changes for L1/L2" section: different troubleshooting steps, different log locations, different error patterns
- The migration guide must explicitly state which scenarios have no APv2 migration path and what the recommended approach is (typically: remain on APv1)

**Warning signs:**
- Migration guide does not include a readiness checklist
- Migration guide says "switch to APv2" without mentioning coexistence
- No mention of hardware hash deregistration as a prerequisite
- Pre-provisioning, self-deploying, and hybrid join are not listed as migration blockers
- Windows 10 is not mentioned as incompatible with APv2
- Guide presents APv2 as a complete replacement rather than a parallel option

**Phase to address:** Phase 4 (Migration scenarios) -- this is the defining constraint of the APv1-to-APv2 migration guide. Must be addressed at the outline stage, not discovered during writing.

---

### Pitfall 7: GPO-to-Intune Migration Guide That Aims for 100% Parity

**What goes wrong:**
Migration documentation from on-premises imaging to cloud provisioning includes a "GPO to Intune policy mapping" that attempts to replicate every Group Policy setting in Intune configuration profiles. This creates three problems:

1. Many GPO settings have no Intune equivalent (they control on-premises infrastructure: mapped drives via logon scripts, printer deployment via Print Management, software deployment via GPSI, network location awareness policies). Documenting these as "no equivalent" without providing the cloud-native alternative leaves admins stuck.
2. Some GPO settings should not be migrated because they enforce legacy practices (IE settings, desktop wallpaper via GP, screensaver timeout via GP when Conditional Access + compliance can achieve the same outcome more reliably)
3. Intune's Group Policy Analytics tool imports GPOs and shows which settings are available, but admins mistake "available in Intune" for "should be migrated." The tool does not recommend; it only maps.

**Why it happens:**
"Lift and shift" is the path of least resistance. Admins under migration pressure want to replicate what they have, not redesign their policy set. Documentation that provides a 1:1 mapping table validates this approach. The real value is in guiding admins to rethink their policies for cloud-native management, but this requires more nuanced documentation.

**How to avoid:**
- Open the GPO migration guide with a clear principle: "The goal is not 100% GPO parity. The goal is equivalent security outcomes using cloud-native controls."
- Structure the guide by outcome (e.g., "Require device encryption" or "Enforce password complexity") not by GPO setting name. For each outcome, show the recommended Intune approach, which may differ from the GPO approach.
- Include a "Do not migrate" list: GPO settings that are obsolete, environment-specific, or better served by Conditional Access + compliance policies
- Document the Group Policy Analytics tool as a discovery aid, not a migration plan: "Use GP Analytics to inventory what you have. Then use this guide to determine what to migrate and how."
- For settings with no Intune equivalent, document the cloud-native alternative (e.g., mapped drives via GPO become OneDrive Known Folder Move + SharePoint; printer deployment via GPO becomes Universal Print)
- Include a "Test before rollout" section: "Assign migrated policies to a test group first. Never assign to All Users or All Devices."

**Warning signs:**
- Migration guide has a two-column table (GPO Setting | Intune Setting) without a "Should you migrate this?" column
- Guide aims for 100% setting coverage
- No "Do not migrate" recommendations
- No mention of Group Policy Analytics as a discovery tool (or presents it as a migration tool)
- Cloud-native alternatives are not offered for settings without Intune equivalents

**Phase to address:** Phase 4 (Migration scenarios) -- the GPO migration guide must be outcome-based from the outline stage.

---

### Pitfall 8: Device Lifecycle Documentation That Only Covers the Happy Path (Initial Provisioning)

**What goes wrong:**
Lifecycle documentation ends at "device enrolled and user is at desktop." The operational reality includes: device re-provisioning after hardware repair, Autopilot Reset (local and remote) for device reassignment, device retirement and data wipe, tenant-to-tenant device migration, and handling devices that fall out of compliance post-enrollment. When these scenarios are undocumented, L2 teams improvise -- often with destructive actions (full device wipe when Autopilot Reset would suffice, or manual device record deletion that orphans the Entra object).

Specific gaps that cause real incidents:
- **Autopilot Reset** has different behavior for local vs. remote execution. Remote reset does not start immediately -- it waits for the device's next Intune check-in. If the device is offline, the reset never fires. Admins who expect immediate reset power off the device, thinking reset failed, which can corrupt the OS.
- **Device retirement** in Intune vs. device deletion -- "Retire" removes corporate data but leaves personal data; "Wipe" factory resets; "Delete" removes the Intune record but does not touch the device. Admins confuse these regularly.
- **WinRE requirement**: Remote Autopilot Reset requires Windows Recovery Environment to be correctly configured. If WinRE is disabled or damaged (common after large Windows updates), the reset fails silently.

**Why it happens:**
Documentation projects naturally prioritize the deployment flow because it is the most visible and most frequently used workflow. Lifecycle operations (reset, retire, migrate) happen less frequently and are spread across different Intune admin center locations, making them easy to overlook. Each lifecycle operation also has prerequisites and failure modes that are less well-documented in Microsoft Learn than the initial deployment flow.

**How to avoid:**
- Structure lifecycle documentation as a full cycle, not a funnel: Provision --> Manage --> Reset/Reprovision --> Retire. Each stage gets its own section with the same level of detail as initial provisioning.
- Document Autopilot Reset as two separate guides (local and remote) with explicit prerequisites: WinRE must be enabled, device must be online for remote reset, DisableAutomaticReDeploymentCredentials CSP must be configured for local reset
- Create a "Device State Transitions" reference that maps every Intune action (Retire, Wipe, Delete, Autopilot Reset, Fresh Start) to its effect on the device, Intune record, Entra object, and Autopilot registration. This prevents the "I deleted the device record and now the hardware hash is orphaned" incident.
- Document the difference between Retire, Wipe, and Delete as a decision tree, not a table -- L2 needs to know which action to take based on the scenario, not just what each action does

**Warning signs:**
- Lifecycle documentation ends at "device enrolled" with no coverage of reset, retire, or re-provision
- Autopilot Reset is documented as a single flow without distinguishing local vs. remote
- No mention of WinRE as a prerequisite for remote Autopilot Reset
- Retire/Wipe/Delete are documented in a table without a decision tree for choosing between them
- No coverage of what happens to the Autopilot registration when a device is wiped vs. retired vs. deleted

**Phase to address:** Phase 3 (Device lifecycle and operational gaps) -- lifecycle documentation must cover the full cycle from the outline stage, not bolt on post-deployment topics as an afterthought.

---

### Pitfall 9: Cross-Platform Documentation That Creates Duplicate Maintenance Burden

**What goes wrong:**
Writers create parallel documentation structures for Windows and macOS that duplicate shared content: compliance policy concepts, Conditional Access integration, Entra ID registration, license requirements, and network endpoint requirements. When Microsoft changes Conditional Access behavior, someone must update both the Windows and macOS versions. Invariably, only one gets updated, and the other drifts. After two update cycles, the Windows and macOS docs contradict each other on shared topics.

**Why it happens:**
Platform-separated documentation feels cleaner to navigate. Writers copy the Windows structure for macOS and fill in platform-specific content, but also copy shared concepts because the macOS doc "needs to be complete." This creates a hidden maintenance burden that is invisible at authoring time.

**How to avoid:**
- Identify shared content that applies to both platforms: Conditional Access, compliance policy concepts, Entra ID registration flow, license requirements, general Intune navigation patterns
- Create platform-neutral reference pages for shared content. Both Windows and macOS guides link to these pages rather than duplicating the content. Examples: "Conditional Access for Device Enrollment" (covers both platforms), "License Requirements for Device Provisioning" (covers both platforms)
- Platform-specific guides contain only platform-specific content and link to shared references for common concepts
- Establish a content ownership rule: shared references have a single owner; platform-specific guides have platform-specific owners. During quarterly review, shared references are reviewed once (not once per platform)
- Use the existing template pattern from v1.0: factual reference pages (endpoints, registry paths, error codes) are single-source; scenario guides reference them rather than duplicating

**Warning signs:**
- The same Conditional Access configuration steps appear in both Windows and macOS admin guides
- License requirements are described differently in Windows and macOS setup guides
- A shared concept (e.g., Entra device registration) is explained in three different places
- After a Microsoft change, the Windows guide is updated but the macOS guide still shows old behavior

**Phase to address:** Phase 1 (Cross-platform foundation) -- identify shared content and create reference pages before writing platform-specific guides. This architectural decision must precede content creation.

---

### Pitfall 10: macOS Troubleshooting Guides That Use Windows Diagnostic Patterns

**What goes wrong:**
macOS L1/L2 troubleshooting guides are structured like Windows guides: "check the registry," "run Get-AutopilotDiagnostics," "look at the ESP status," "collect MDM diagnostics with mdmdiagnosticstool.exe." None of these work on macOS. macOS has a completely different diagnostic toolkit:

- No registry -- macOS uses plists (`defaults read`) and MDM profile inspection (`profiles show -type enrollment`)
- No PowerShell (natively) -- macOS diagnostics use Terminal with bash/zsh commands, `system_profiler`, `profiles`, `log show`
- No ESP -- enrollment status is tracked through Setup Assistant and the Intune Management Agent log
- No MDM Diagnostic Tool -- macOS diagnostic data is collected through `sysdiagnose` or individual log streams
- Different log locations: Intune Management Agent logs at `/Library/Logs/Microsoft/Intune/`, Company Portal logs, system.log
- Different error patterns: macOS enrollment failures often surface as MDM profile delivery failures, Company Portal authentication errors, or ABM sync delays -- not the hex-code error screens that Windows shows

**Why it happens:**
Writers and L2 engineers know Windows diagnostic workflows. They attempt to create macOS equivalents by finding "the macOS version of" each Windows tool. But macOS diagnostics are architecturally different, not just differently named. The L1/L2 audience split also works differently -- macOS L1 troubleshooting is more limited because there is no OOBE command prompt (Shift+F10 equivalent) and less on-device diagnostic capability during enrollment.

**How to avoid:**
- Build macOS troubleshooting guides from macOS-native diagnostic workflows, not by translating Windows guides
- Create a macOS diagnostic reference page (equivalent to the Windows L2 quick-reference card) that covers: `profiles show -type enrollment` for enrollment status, `log show --predicate 'subsystem == "com.apple.ManagedClient"'` for MDM activity, Intune Management Agent log location, Company Portal log collection, `sudo profiles renew -type enrollment` for re-enrollment trigger
- macOS L1 guides must acknowledge that on-device diagnostics during Setup Assistant are extremely limited compared to Windows. Most macOS L1 troubleshooting is done from the Intune admin portal, not on the device.
- macOS L2 guides should reference Terminal commands, not PowerShell. Include the actual commands with expected output, not abstract descriptions.
- Document the key difference in error visibility: Windows shows hex error codes on screen; macOS enrollment failures often present as a generic "enrollment failed" or the device simply does not appear in Intune with no user-visible error

**Warning signs:**
- macOS troubleshooting guide references registry paths, PowerShell, or MDM Diagnostic Tool
- macOS L1 guide assumes Shift+F10 or command prompt access during enrollment
- macOS guide describes error codes in the same hex-code format used for Windows
- macOS diagnostic reference does not include Terminal commands
- macOS L2 guide does not mention `/Library/Logs/Microsoft/Intune/` or `profiles` command

**Phase to address:** Phase 5 (macOS L1/L2 troubleshooting) -- build from macOS-native diagnostics, not by adapting Windows guides.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term documentation problems in a cross-platform suite.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Copy Windows doc structure for macOS and fill in macOS content | Faster initial authoring, familiar structure for reviewers | macOS docs inherit Windows assumptions (ESP references, error code format, deployment modes). Requires retrofitting when reviewers catch the mismatches. | Never -- start with macOS-native structure |
| Write macOS docs now and add version annotations later | Ships content faster | macOS docs become incorrect within 6 months when Apple changes Setup Assistant screens or deprecates MDM commands. Retrofitting version notes across all docs is slower than adding them during initial writing. | Never -- version metadata must be present from first draft |
| Duplicate shared content (Conditional Access, licensing) into each platform's guides | Each guide is self-contained, easier to write | Creates a maintenance burden that guarantees drift between platforms within two quarters. | Acceptable only for very small amounts of context-setting text (1-2 sentences). Never for procedures or configuration steps. |
| Skip the cross-platform capability matrix | Saves time upfront; each platform's docs can "stand alone" | Every macOS admin guide must independently call out Windows feature gaps, leading to inconsistent coverage and missed gaps. The matrix is the single source of truth for "what is different." | Never -- the matrix is a prerequisite for all macOS admin content |
| Write migration guides as feature comparisons rather than workflow guides | Easier to organize, parallels Microsoft's comparison pages | Admins cannot execute a migration from a comparison table. They need step-by-step workflows with decision points and rollback procedures. | Never for the primary migration guide. Acceptable as a supplementary reference. |
| Defer macOS glossary entries | Fewer files to create initially | Every macOS doc must independently define terms, or readers encounter undefined Apple-specific terminology (ABM, ADE, VPP, Apps and Books, Managed Apple ID, Setup Assistant). | Never -- extend the glossary before writing macOS content |

---

## Integration Gotchas

Common mistakes when integrating macOS documentation with the existing Windows documentation suite and external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Apple Business Manager (ABM) | Treating ABM setup as equivalent to Windows hardware hash import. ABM has a token lifecycle, Apple ID ownership requirement, and Terms & Conditions acceptance cycle that have no Windows parallel. | Document ABM as its own workflow with renewal, Apple ID governance, and T&C acceptance as first-class topics. |
| Intune admin portal navigation | Documenting portal paths that serve both platforms without noting which platform the path applies to. "Devices > Enrollment" leads to different sub-pages for Windows vs. macOS. | Always specify the full navigation path including the platform-specific tab or filter: "Devices > Enrollment > Apple tab > Enrollment program tokens." |
| Glossary cross-references | Adding macOS terms to the existing glossary without noting which platform they apply to, creating confusion (e.g., "enrollment profile" means different things for Windows Autopilot vs. macOS ADE). | Every glossary entry must be platform-tagged. Terms that exist on both platforms with different meanings get separate entries (e.g., "Enrollment Profile (Windows)" and "Enrollment Profile (macOS ADE)"). |
| VPP / Apps and Books | Assuming macOS app deployment through VPP works like Windows Store app deployment. VPP token expiration, license reclamation, and country-specific availability have no Windows equivalent. | Document VPP as a macOS-specific app distribution mechanism with its own lifecycle, token management, and limitations. |
| Microsoft Learn cross-links | Linking to Microsoft Learn macOS pages using the old URL structure. Microsoft reorganized Intune docs under `/intune/intune-service/` and `/intune/device-enrollment/apple/` paths. | Use the current URL structure. Verify all macOS Microsoft Learn links before publishing. Set a review cadence for link validity. |
| DDM (Declarative Device Management) | Treating DDM as a macOS-only concern. DDM is Apple's cross-platform management framework for iOS/iPadOS/macOS/tvOS/visionOS, and Intune's implementation affects all Apple platforms. | Document DDM in a shared Apple management reference, not buried in macOS-specific guides. |

---

## Performance Traps

In the documentation domain, "performance" means navigation efficiency and maintenance scalability as the doc suite grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Flat navigation with platform interleaving | Users cannot find the correct platform's guide within 30 seconds. They open the wrong guide, realize it is for the other platform, back-navigate, and try again. | Platform-first navigation structure with clear visual separation. | Immediately upon adding the first macOS doc to a Windows-structured index. |
| No platform indicator in file names | File names like `enrollment-failure.md` or `admin-setup.md` are ambiguous. Contributors create conflicting files; link references break. | Naming convention: `macos-ade-enrollment-profile.md`, `windows-apv1-esp-troubleshooting.md`. | When the second macOS file is created and naming conflicts start. |
| Single glossary without platform tags | L1 agents look up "deployment profile" and get the Windows definition when they need the macOS definition. | Platform-tagged glossary entries. Shared terms with different platform meanings get separate entries. | When the first macOS term conflicts with an existing Windows term. |
| Review cadence assumes Windows-only update frequency | Windows docs are reviewed quarterly against Intune monthly updates. macOS docs need an additional review aligned to Apple's annual OS release cycle (September-October) and WWDC announcements (June). | Dual review cadence: quarterly for Intune changes (both platforms), annually post-WWDC for Apple-specific changes (macOS). | After the first Apple OS release that changes Setup Assistant screens or deprecates an MDM capability. |
| Cross-platform references embedded inline | A macOS guide says "similar to Windows Autopilot ESP, macOS uses Await Final Configuration." When ESP behavior changes, both the Windows ESP guide AND every macOS guide that references it need updating. | Cross-platform comparisons live in a single comparison page. Platform-specific guides link to it rather than embedding comparisons inline. | After the first behavioral change to either platform that affects a cross-reference. |

---

## Security Mistakes

Documentation-specific security issues for the cross-platform domain.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Publishing the ABM Apple ID in documentation examples | ABM Apple IDs have administrative access to device assignments. Exposure enables social engineering against Apple Support for account recovery. | Use placeholder: `<ABM-ADMIN-APPLE-ID>`. Note that this must be a Managed Apple ID, not a personal account. |
| macOS admin guides that include `sudo` commands without explaining the privilege level | L1 agents attempt `sudo profiles renew -type enrollment` without understanding it requires local admin credentials, which L1 may not have. | Every macOS Terminal command must be tagged with the required privilege level: `[requires local admin]` or `[standard user]`. |
| Documenting FileVault recovery key retrieval without noting the Intune role requirement | Personal recovery keys in Intune require specific RBAC permissions. Guides that say "look up the FileVault key in Intune" without noting the role requirement lead to unauthorized access attempts or access denials at critical moments. | Specify the Intune role required for FileVault key retrieval. Note that this is an audited action. |
| GPO-to-Intune migration guides that do not flag security-sensitive policy changes | Migrating a GPO that enforced on-prem-only Conditional Access to Intune cloud-based CA without adjusting scope can either lock users out or remove protections. | Migration guide must flag every security-affecting policy change and require explicit admin review before migration. |
| Cross-platform compliance docs that assume identical conditional access behavior | macOS compliance evaluation timing differs from Windows. A device can access resources briefly before compliance is evaluated post-enrollment. | Document the compliance evaluation timing gap on macOS. Note that this differs from Windows where enrollment restrictions can block pre-enrollment. |

---

## UX Pitfalls

User experience of the documentation itself in a cross-platform context.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| macOS guides written for Windows-experienced admins only | macOS-first admins (common in design/creative departments) cannot follow guides that assume Windows Intune knowledge. | Write macOS guides as standalone docs. Use "If you are familiar with Windows Autopilot..." callouts for optional context, not required knowledge. |
| Single decision tree for "enrollment failure" covering both platforms | L1 agent must navigate through platform-identification questions before reaching the actual troubleshooting steps, adding 2-3 minutes to every triage. | Separate decision trees per platform. The initial triage tree routes to the platform-specific tree as step 1. |
| Migration guides without rollback procedures | Admin follows APv1-to-APv2 migration steps, discovers APv2 does not support their deployment mode (e.g., pre-provisioning), and has no documented path back to APv1. | Every migration guide must include a "Rollback" section: how to revert each step if the migration does not work for the target device population. |
| macOS troubleshooting guides with no screenshots or expected-output examples | macOS Terminal output is unfamiliar to Windows-trained L2 engineers. Without expected output examples, they cannot verify whether their command succeeded. | Include expected Terminal output for every diagnostic command. Show both success and failure output. |
| Lifecycle docs that do not specify "which guide to use when" | Admin needs to re-provision a device and does not know whether to use Autopilot Reset, Wipe, or Fresh Start. They read all three guides before deciding. | Create a "Device Re-provisioning Decision Tree" that routes to the correct guide based on scenario: reassignment to new user, same user hardware repair, compliance remediation, device retirement. |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces in the v1.2 milestone.

- [ ] **Cross-platform index:** Often missing a platform selector at the top -- verify that a user can identify their platform and reach the correct section within two clicks
- [ ] **macOS glossary entries:** Often missing Apple-specific terms -- verify ABM, ADE, VPP, Apps and Books, Managed Apple ID, Setup Assistant, DDM, FileVault, System Preferences/System Settings, Profiles command are all defined
- [ ] **macOS admin setup guide:** Often missing the token/certificate renewal section -- verify that MDM Push certificate renewal, ABM token renewal, and Apple ID governance are documented with the same detail as initial setup
- [ ] **macOS capability matrix:** Often missing the "not available" entries -- verify that every capability that exists on Windows but not macOS is explicitly listed as "not available on macOS" with the recommended alternative
- [ ] **APv1-to-APv2 migration guide:** Often missing the readiness checklist -- verify that pre-provisioning, self-deploying, hybrid join, and Windows 10 are listed as migration blockers
- [ ] **GPO-to-Intune guide:** Often missing the "do not migrate" list -- verify that obsolete/environment-specific GPO settings are explicitly called out with cloud-native alternatives
- [ ] **Device lifecycle docs:** Often missing the Retire/Wipe/Delete distinction -- verify a decision tree exists that routes admins to the correct action based on scenario
- [ ] **Autopilot Reset guide:** Often missing the WinRE prerequisite -- verify that both local and remote reset docs mention WinRE enablement as step 1
- [ ] **macOS troubleshooting guide:** Often missing Terminal command expected output -- verify every diagnostic command includes both success and failure output examples
- [ ] **Shared reference pages:** Often missing platform tags on shared content -- verify that Conditional Access, compliance, and licensing references specify which platform differences exist
- [ ] **macOS version annotations:** Often missing macOS version requirements -- verify every Setup Assistant screen, DDM configuration, and LAPS setting specifies the minimum macOS version
- [ ] **DDM documentation:** Often missing the deprecation timeline -- verify that legacy MDM update commands are documented as deprecated with the removal timeline (macOS 26)

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Windows terminology in macOS docs | MEDIUM | Audit all macOS docs for Windows-specific terms. Create a find-replace list (ESP -> Await Final Configuration, hardware hash -> serial number assignment, deployment profile -> enrollment profile). Review each replacement in context. |
| macOS docs outdated by Apple OS release | MEDIUM | After each September OS release, run a focused review of all macOS docs against Apple's release notes and updated Apple Platform Deployment guide. Update version annotations, Setup Assistant screen lists, and deprecated capability notes. |
| Intune feature gap documented as available on macOS | LOW | Point fix: add "not available on macOS" note with workaround. Update capability matrix. Notify L1/L2 teams of correction. |
| Navigation confusion across platforms | HIGH | Requires index restructure with platform-first organization. All file names must be updated with platform prefixes. All internal links must be updated. Communicate new structure to all teams. |
| Duplicate shared content has drifted between platforms | MEDIUM | Identify all instances of duplicated content. Consolidate into shared reference pages. Update both platform guides to link to shared pages. Remove duplicate content. |
| APv1-to-APv2 migration guide missing blockers | LOW | Add readiness checklist to the top of the migration guide. Each blocker gets a one-line entry with link to the detailed explanation. Low-cost additive change. |
| ABM token lapsed due to undocumented renewal | HIGH (for the admin, not the docs) | The documentation fix is low-cost: add renewal section. But the admin must now renew the token, re-accept Apple T&Cs, and potentially re-enroll devices if the MDM Push cert also lapsed. Document the recovery procedure alongside the prevention. |
| macOS troubleshooting uses Windows diagnostic tools | MEDIUM | Replace all Windows tool references with macOS equivalents. Must be reviewed by someone with macOS admin experience to verify Terminal commands and log paths are correct. |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Windows mental model applied to macOS (P1) | Phase 1: Cross-platform foundation | Terminology standard exists; every macOS doc reviewed for Windows term contamination |
| Apple annual deprecation cycle (P2) | Phase 1: Cross-platform foundation (standards) + Phase 6: Review phase post-WWDC | Every macOS doc has version annotation; DDM documented as primary; legacy MDM commands not documented |
| Intune macOS feature parity assumption (P3) | Phase 2: macOS admin setup | Capability matrix exists and is referenced by every macOS admin guide |
| Cross-platform navigation routing (P4) | Phase 1: Cross-platform foundation | Index restructured with platform-first navigation; tested with unfamiliar user |
| ABM token lifecycle (P5) | Phase 2: macOS admin setup | Every setup guide includes renewal section with Apple ID governance warning |
| APv1-to-APv2 migration as cutover (P6) | Phase 4: Migration scenarios | Migration guide opens with readiness checklist; coexistence documented |
| GPO-to-Intune 100% parity (P7) | Phase 4: Migration scenarios | Guide is outcome-based; includes "do not migrate" list |
| Lifecycle docs ending at provisioning (P8) | Phase 3: Device lifecycle | Full cycle documented: Provision -> Manage -> Reset -> Retire; decision tree for device actions |
| Cross-platform duplicate content (P9) | Phase 1: Cross-platform foundation | Shared reference pages identified and created before platform-specific writing begins |
| macOS troubleshooting using Windows patterns (P10) | Phase 5: macOS L1/L2 troubleshooting | macOS guides use macOS-native diagnostics; no Windows tool references |

---

## Sources

- [Set up automated device enrollment (ADE) for macOS - Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-enrollment-program-enroll-macos) (updated 2026-04-09)
- [macOS device enrollment guide for Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-enrollment-macos)
- [macOS & iOS 26 for Enterprise: DDM, Deployment, and the Intel Mac Sunset](https://intuneirl.com/macos-ios-26-for-enterprise-ddm-deployment-and-the-intel-mac-sunset/)
- [New iOS/iPadOS and macOS ADE enrollment policies experience](https://techcommunity.microsoft.com/blog/intunecustomersuccess/new-iosipados-and-macos-ade-enrollment-policies-experience/4393531)
- [Apple Business Manager release notes](https://support.apple.com/en-us/103273)
- [Support tip: Move to declarative device management for Apple software updates](https://techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-move-to-declarative-device-management-for-apple-software-updates/4432177)
- [Understanding application types in Microsoft Intune for macOS](https://techcommunity.microsoft.com/blog/intunecustomersuccess/understanding-application-types-in-microsoft-intune-for-macos/4373987)
- [macOS device compliance settings in Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-mac-os)
- [Windows Autopilot Reset](https://learn.microsoft.com/en-us/autopilot/windows-autopilot-reset)
- [Remote Windows Autopilot Reset in Intune](https://learn.microsoft.com/en-us/autopilot/tutorial/reset/remote-autopilot-reset)
- [Compare Windows Autopilot device preparation and Windows Autopilot](https://learn.microsoft.com/en-us/autopilot/device-preparation/compare)
- [WWDC 2025: Key MDM and Security Updates for Enterprise](https://www.jamf.com/blog/wwdc25-key-takeaways-for-commercial-organizations/)
- [Apple Platform Deployment guide](https://support.apple.com/guide/deployment/)
- [Migrate your imported group policy to a policy in Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/configuration/group-policy-analytics-migrate)
- [Group Policy Analytics: A Practical GPO to Intune Guide](https://thedeploymentguy.co.uk/group-policy-analytics-intune-migration/)
- [Autopilot v1 or Autopilot v2? A Strategic Guide](https://joymalya.com/autopilot-v1-or-autopilot-v2-a-strategic-guide-to-modern-windows-provisioning/)
- [Windows Autopilot V1 vs. V2: differences and new features](https://www.softtailor.de/en/blog/windows-autopilot-v1-vs-v2)
- [Intune Support Team on X: ABM Terms and Conditions update April 2025](https://x.com/IntuneSuppTeam/status/1909551872735686985)
- [Overview of the Microsoft Intune MDM lifecycle](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/device-lifecycle)
- v1.0/v1.1 PITFALLS.md research (2026-03-10) -- prior pitfalls for Windows-only documentation remain valid

---
*Pitfalls research for: Cross-Platform Provisioning Documentation (macOS ABM/ADE + Windows Autopilot Operational Gaps)*
*Researched: 2026-04-13*
