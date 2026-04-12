# Feature Research

**Domain:** IT Operations Documentation — APv2 (Device Preparation) Coverage and Admin Setup Guides
**Researched:** 2026-04-10
**Confidence:** HIGH (primary sources: Microsoft Learn official documentation verified 2026-04-07 to 2026-04-10, Microsoft Intune requirements and known-issues pages)

---

## Context: This Is a Subsequent Milestone

v1.0 delivered full APv1 troubleshooting documentation (lifecycle, error codes, decision trees, L1 runbooks, L2 runbooks). This research scopes v1.1 only — what is *new* relative to v1.0.

**v1.0 content already delivered (DO NOT rebuild):**
- APv1 lifecycle documentation (6 stages)
- Error code index (29 entries, 5 category files)
- 4 Mermaid decision trees (initial triage, ESP, profile assignment, TPM)
- 5 L1 scripted runbooks (Service Desk safe, zero PowerShell)
- 5 L2 technical investigation guides (registry, event IDs, PowerShell refs)
- Role-based navigation (index.md, quick-ref cards)
- apv1-vs-apv2.md disambiguation page (exists, references APv2 as future work)

**v1.1 adds:**
1. APv2 lifecycle documentation
2. APv2 troubleshooting (error codes, decision trees, L1/L2 runbooks)
3. Admin setup guides for APv1
4. Admin setup guides for APv2

---

## Feature Landscape

### Table Stakes (Users Expect These)

These are features that any credible APv2 + admin setup documentation suite must have. Without them, L1/L2/admins cannot do their jobs for the new content areas.

#### Category A: APv2 Lifecycle Documentation

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| APv2 lifecycle overview — stages and flow | APv2 is a distinct provisioning flow from APv1. Teams attempting to troubleshoot without a lifecycle reference will apply APv1 logic to APv2 failures and mis-diagnose every time. | MEDIUM | APv2 has no hardware hash import, no ESP, no pre-provisioning. Flow: OOBE sign-in → Enrollment Time Grouping → Bootstrapper provisioning → app/script install → desktop. Mermaid diagram required. |
| APv2 vs APv1 — decision gate expansion | The existing apv1-vs-apv2.md covers feature comparison but does not cover troubleshooting triage. Admins arriving at a failure need to know which framework caused it before consulting any runbook. | LOW | Update existing apv1-vs-apv2.md to add triage guidance. "If ESP displays during deployment, device is NOT in APv2 mode" is the key gate. |
| APv2 prerequisites checklist — admin-facing | APv2 has unique prerequisites that cause silent failures if missed (Intune Provisioning Client service principal as group owner, enrollment time grouping, auto-enrollment, user group → device group pairing). Without a checklist, setup mistakes cause deployment failures that look like product bugs. | MEDIUM | Minimum OS: Win11 22H2+KB5035942 or Win11 23H2+KB5035942 or Win11 24H2. No APv1 profile assigned to device. Intune Provisioning Client (AppID f1346770-5b25-470b-88bd-d5744ab7952c) is owner of device group. Auto-enrollment configured. User who signs in is member of policy user group. |
| APv2 deployment modes — user-driven vs automatic | APv2 supports user-driven mode (physical devices) and automatic deployment (Windows 365 Frontline shared, preview). L1/L2 must know which mode is active to understand what failure symptoms to expect. | LOW | User-driven: user signs in during OOBE, triggers provisioning. Automatic: Windows 365 Frontline only. No pre-provisioning mode in APv2. No self-deploying mode in APv2. No hybrid join in APv2. |
| APv2 app/script deployment scope and limits | APv2 installs only apps and scripts explicitly selected in the Device Preparation policy, during OOBE. All others deploy post-desktop. Maximum 25 apps during OOBE. Apps must be System context. These constraints cause common "app not installed" failures that L1 misattributes to network or permission errors. | LOW | System context requirement is the most frequent misconfiguration. Win32, WinGet, and Enterprise App Catalog apps are skipped if Managed Installer policy is active (resolved April 2026 but may affect older tenants). |

#### Category B: APv2 Troubleshooting Content

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| APv2 error and failure index — L1-facing | APv2 does not use ESP error codes. Failures appear as: deployment stuck at percentage, apps showing "Skipped" in report, device not entering APv2 mode. L1 needs a symptom-based lookup that doesn't assume APv1 error codes. | MEDIUM | Key failure categories: (1) APv2 experience never launches, (2) Device not added to device group, (3) Apps/scripts not installed, (4) Deployment stuck at 100%, (5) Policy group save fails. These map to distinct root causes listed in Microsoft Learn troubleshooting FAQ (HIGH confidence). |
| APv2 L1 decision tree — initial triage | L1 cannot distinguish APv2 deployment failure from APv1 failure without a triage gate. The existing APv1 initial triage tree does not apply to APv2. | MEDIUM | Must start with: "Did the ESP display during OOBE?" → Yes = APv1 mode, wrong doc. No = APv2 mode, continue. Then: "Is the device running Win11 22H2+ with KB5035942?" → No = OS requirement not met. Yes = continue triage. |
| APv2 L1 runbook — deployment experience never launches | Single highest-volume APv2 L1 failure. Causes: wrong OS version, device registered as APv1 device (APv1 profile takes precedence), user not in user group, device group not saved in policy, auto-enrollment not configured. All are L1-verifiable checks. | MEDIUM | Maps to Microsoft Learn troubleshooting FAQ "OOBE never launches" section (HIGH confidence). L1 checks: OS version, whether device appears in Autopilot registered devices list (if yes → deregister), user group membership, device group assignment in policy. |
| APv2 L1 runbook — apps and scripts not installed | Second highest-volume APv2 L1 failure. Causes: apps not assigned to device group, apps configured as User context not System context, Managed Installer policy active. | MEDIUM | Apps showing "Skipped" in deployment report = assignment issue or context issue. Apps showing "Failed" = app packaging or dependency issue → escalate to L2. |
| APv2 L2 investigation guide — log collection | APv2 uses different log sources than APv1. APv1 used MDM enrollment event logs and ESP registry. APv2 uses the Bootstrapper event log as primary source. MDMDiagnosticsTool.exe still applies. Near-real-time deployment report in Intune admin center is the primary monitoring tool. | MEDIUM | Primary log: Bootstrapper event log (BootstrapperAgent). Secondary: MDMDiagnosticsTool.exe -area Autopilot. Tertiary: Intune deployment report (Home > Devices > Monitor > Windows Autopilot device preparation). No registry path equivalent to APv1's EnrollmentStatusTracking for APv2. |
| APv2 L2 investigation guide — group and policy configuration failures | Policy group save failures (0 groups assigned) and Intune Provisioning Client owner misconfigurations are the leading L2-level APv2 root causes. These require PowerShell to add the service principal if it doesn't appear in the Azure portal. | HIGH | Error messages: "There was a problem with the device security group." / "Failed to update security group device preparation setting." Root cause: Intune Provisioning Client (AppID f1346770-5b25-470b-88bd-d5744ab7952c) not owner of device group. In some tenants the service principal appears as "Intune Autopilot ConfidentialClient" — same AppID, different display name. PowerShell remediation required to add it if absent. |
| APv2 known issues and workarounds reference | APv2 has active known issues that cause field failures. L2 must know which failures are product bugs with workarounds vs. configuration errors requiring admin action. | LOW | Active known issues (verified 2026-04-10): (1) Managed Installer policy blocks Win32/WinGet/Enterprise App Catalog during OOBE — resolved April 2026 but affects pre-patch tenants. (2) Conflict between APv2 "Standard user" policy setting and Entra ID Local administrator settings — requires specific three-way combination to function correctly. (3) BitLocker 256-bit may fall back to 128-bit (race condition, unfixed as of research date). (4) Device stuck at 100% during OOBE — user must manually restart. (5) Log export during OOBE saves to USB with no confirmation message. (6) Windows 365 devices time out after 60 minutes — resolved February 2026. |

#### Category C: APv1 Admin Setup Guides

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| APv1 hardware hash registration guide — admin | v1.0 documented what hardware hash is and how to troubleshoot hash failures. v1.1 must document how an admin registers devices: OEM/CSP partner flow, PowerShell hash extraction (Get-AutopilotHardwareHash equivalent), Intune CSV import, verification steps. | MEDIUM | Three registration paths: (1) OEM pre-registration (zero effort, preferred), (2) CSP partner bulk upload via Partner Center, (3) Admin-manual via PowerShell + CSV. Key pitfall: CSV Base64 padding validation. Verification: device appears in Intune > Devices > Enrollment > Windows Autopilot > Devices with Profile Status = Assigned. |
| APv1 deployment profile configuration guide | v1.0 documented profile assignment failures. v1.1 must document how to create and configure a profile correctly: settings, their purpose, correct values, common misconfiguration traps. | MEDIUM | Key settings to document: Deployment mode (User-Driven vs Self-Deploying), Join type (Entra vs Hybrid), EULA display, Privacy settings, Hide change account options, User account type (Admin vs Standard), Allow pre-provisioned deployment (critical — must = Yes for white glove), Language/keyboard settings (require Ethernet not WiFi), Apply device name template. Pitfall: up to 350 profiles per tenant; profile priority = oldest created wins when multiple profiles target same device. |
| APv1 ESP (Enrollment Status Page) configuration guide | ESP is the most complex APv1 admin configuration and the most common source of deployment failures. v1.0 covered ESP troubleshooting. v1.1 must cover ESP configuration: device phase vs user phase, app tracking settings, timeout values, blocking behavior, Windows update setting. | HIGH | Key settings: Block device use until all apps and profiles are installed (Yes/No), Time limit, Error message display, Allow user to collect logs, Install Windows updates during OOBE (new default = Yes as of August 2025 for new profiles). Pitfall: Apps tracked by ESP must be required assignments, not available. LOB + Win32 conflict (TrustedInstaller) still applies at ESP. Max apps guidance: set realistic timeout per app count. |
| APv1 dynamic group configuration guide — Entra | Autopilot profile assignment relies on dynamic groups. Without a correctly configured dynamic group, profiles never assign to devices. | LOW | Standard dynamic rule for Autopilot devices: `(device.devicePhysicalIDs -any _ -contains "[ZTDId]")`. Must target device group not user group for deployment profile assignment. Sync delay: up to 24 hours for profile assignment after group membership is processed. |
| APv1 deployment mode setup guides | Each deployment mode has distinct setup steps. Pre-provisioning requires specific profile setting + network + TPM. Self-deploying requires TPM 2.0 + no user assignment. Hybrid join requires Intune Connector for AD. | HIGH | Three sub-topics: (1) User-driven setup (simplest — profile + group + ESP), (2) Pre-provisioning/white glove additional requirements (Allow pre-provisioned deployment = Yes; BIOS TPM enabled; network to attestation endpoint; device must not be in a non-UTC timezone), (3) Self-deploying setup (TPM 2.0 required; no user association; device compliance policies only). Hybrid join setup covered separately as it has connector infrastructure requirements. |
| APv1 app and policy assignment guide — setup context | v1.0 covered policy conflict troubleshooting. v1.1 must cover correct configuration: required vs available app assignments, targeting conventions (device group vs user group), what to track in ESP vs what deploys post-enrollment. | MEDIUM | Key decisions: Win32 apps must be Required for ESP tracking. LOB (line-of-business) and Win32 cannot install simultaneously — sequence them or use APv2. Policies targeted to devices apply at device phase; policies targeted to users apply at user phase. AppLocker, DeviceLock, Security Baseline UAC: target users, not devices, to avoid ESP failures. |

#### Category D: APv2 Admin Setup Guides

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| APv2 prerequisites and tenant configuration guide | APv2 has more configuration prerequisites than APv1 and they fail silently. An admin setup guide documenting every prerequisite in order prevents the most common deployment failures before they occur. | MEDIUM | Step-by-step prerequisites: (1) Verify OS version on devices (Win11 22H2+KB5035942 minimum), (2) Configure Microsoft Entra automatic enrollment (MDM scope = All or specific group), (3) Verify users have Entra join permissions, (4) Ensure no APv1 profile assigned to target devices (APv1 takes precedence), (5) Assign required licenses to users. |
| APv2 device group setup guide — Enrollment Time Grouping | The Enrollment Time Grouping device group is the most unique APv2 configuration requirement with no APv1 equivalent. Setting it up incorrectly (wrong group type, missing service principal owner) is the #1 APv2 admin error. | HIGH | Group type must be: Assigned (not dynamic). "Microsoft Entra roles can be assigned to the group" must = No. Intune Provisioning Client (AppID f1346770-5b25-470b-88bd-d5744ab7952c) must be added as owner — this is done via PowerShell or Entra portal. In some tenants the service principal displays as "Intune Autopilot ConfidentialClient" — same AppID, use it. Verification: device group appears as owner in Entra group settings. |
| APv2 user group setup guide | APv2 policies are deployed to a user group (not a device group). Only users in the user group trigger APv2 provisioning when they sign into a device during OOBE. Misconfiguration = APv2 experience never launches. | LOW | Can be any Entra user group (assigned or dynamic). Group must be assigned to the APv2 policy. Nested groups not supported. Test by verifying signing-in user is a direct member of the group. |
| APv2 Device Preparation policy creation guide | The Device Preparation policy is the single admin configuration object that replaces APv1's separate profile + ESP + profile assignment chain. It is the new admin mental model for APv2. | MEDIUM | Policy settings to document: Deployment mode (User-Driven), Join type (Entra join only — hybrid not supported), User account type (Standard vs Administrator — note the Entra ID Local administrator settings conflict), Device group (Enrollment Time Grouping group), Minutes allowed before failure (default 60), Apps to install during OOBE (max 25, must be assigned to device group, must be System context), Scripts to run during OOBE. Navigation: Intune admin center > Devices > Enrollment > Windows enrollment > Device preparation policies. |
| APv2 RBAC permissions guide for admins | APv2 administration requires specific RBAC permissions not present in standard Intune Administrator role. Without correct permissions, admin cannot save device group assignment to policy or assign policy to user group. | LOW | Required custom role permissions: Device configurations (Read, Delete, Assign, Create, Update), Enrollment programs (Enrollment time device membership assignment), Managed apps (Read), Mobile apps (Read), Organization (Read). Temporary additional requirement (may be resolved): Device configurations — Assign. Guide should include: how to create custom role, how to assign it, and verification steps. |
| APv2 app and script configuration guide | APv2 app deployment has different rules than APv1. System context, selection in policy, assignment to device group — all three must be correct simultaneously. Missing any one causes apps to show "Skipped" or "Failed" in the deployment report. | MEDIUM | App requirements: (1) Must be assigned to the device group (Enrollment Time Grouping group), (2) Must be configured to install in System context (not User context — no user is signed in during OOBE), (3) Must be selected in the APv2 Device Preparation policy, (4) Only Win32, WinGet, and Enterprise App Catalog app types supported during OOBE. LOB and Win32 can co-deploy in APv2 (this is an APv2 advantage over APv1). Maximum 25 apps selected in policy. |
| APv2 monitoring and reporting guide | APv2 includes near-real-time deployment monitoring not available in APv1. Admins need to know how to use it and what each status means, especially when resolving L2 escalations. | LOW | Report location: Intune admin center > Devices > Monitor > Windows Autopilot device preparation. Fields: Device details, Profile name and version, Deployment status, Apps with status (Installed/Skipped/Failed), Scripts with status. Data retention: 28 days. Diagnostics collection URL: lgmsapeweu.blob.core.windows.net must be reachable. |

---

### Differentiators (Competitive Advantage)

Features that distinguish this documentation suite beyond what copying Microsoft Learn pages achieves.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Side-by-side APv1/APv2 admin setup comparison | Teams migrating from APv1 to APv2 need to understand what changes in their setup workflow, not just what APv2 is. A mapped comparison (hardware hash registration → no equivalent; ESP config → Device Preparation policy; dynamic device group → assigned device group with service principal) reduces migration confusion. | LOW | Builds on existing apv1-vs-apv2.md. Adds admin-action mapping column to existing feature comparison table. |
| APv2 "failure mode → config check" reference | APv2 failures are configuration-caused more often than APv1 failures. A reverse-lookup table (symptom → which config step was missed) is more actionable than Microsoft's per-topic documentation. | MEDIUM | Maps: "APv2 experience never launches" → 5 config checks in order. "Apps show Skipped" → 3 config checks. "Device group shows 0 groups assigned" → Intune Provisioning Client service principal check. "Deployment fails on Windows 365" → 60-minute timeout known issue. |
| Admin setup troubleshooting callouts embedded in setup guides | Configuration mistakes made during setup cause deployment failures that look like device or network problems. Embedding "If this step fails" callouts at each setup step prevents L2 escalations caused by admin error. | LOW | Pattern: Each setup step ends with a "Verify" sub-step and a "If verify fails" callout pointing to the relevant L1/L2 runbook section. |
| Intune Provisioning Client service principal setup — explicit PowerShell | This is the single most common APv2 admin error and Microsoft's guidance buries it in prerequisites. A standalone, clearly titled procedure (add service principal to device group) with exact PowerShell commands reduces setup failures significantly. | LOW | Exact PowerShell commands are documented in Microsoft Learn tutorial (HIGH confidence). Extract and consolidate into an easily findable callout in the device group setup guide. |
| APv1 admin setup → deployment failure cross-reference | Admin setup mistakes are the root cause of many APv1 failures already documented in v1.0 runbooks. Cross-referencing setup guides to existing troubleshooting content ("Misconfiguring this setting causes ESP Stuck — see L2 runbook 02") bridges the two content areas and makes the full v1.0+v1.1 suite more cohesive. | LOW | Structural linking only — no new content required. Adds a "Configuration mistake impact" column or callout block to each APv1 admin setup section. |

---

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Tenant-specific admin setup screenshots | Teams want step-by-step screenshots matching their Intune admin center | Microsoft updates the Intune UI frequently. Screenshots become stale within weeks and create maintenance debt disproportionate to their value. Per project constraint: docs must be generic. | Document UI navigation as prose with element names (e.g., "Select Device preparation policies under Windows Autopilot"). Reference Microsoft Learn tutorial URLs where screenshots are maintained by Microsoft. |
| APv2 pre-provisioning runbook | Pre-provisioning is familiar to APv1 teams; they ask for APv2 equivalent | APv2 does not support pre-provisioning mode. There is no technician phase in APv2. Building a pre-provisioning runbook for APv2 would document a non-existent feature and confuse teams. | Document explicitly in apv1-vs-apv2.md disambiguation: "APv2 does not support pre-provisioning. If pre-provisioning is required, use APv1." |
| APv2 hybrid join setup guide | Hybrid join is common in APv1; teams assume APv2 equivalent exists | APv2 does not support hybrid Entra join. Microsoft Entra join only. Hybrid join requirement means the team cannot use APv2. | Document explicitly in apv1-vs-apv2.md disambiguation: "APv2 supports Microsoft Entra join only. Hybrid join requires APv1." Note: oofhours.com (May 2025) describes an experimental APv2+HAADJ configuration but this is not officially documented by Microsoft and should not be included in production documentation. |
| APv2 self-deploying mode guide | Self-deploying is common for kiosk deployments in APv1 | APv2 does not support self-deploying mode for physical devices. Automatic deployment exists but is Windows 365 Frontline only and in preview. Documenting self-deploying for APv2 would mislead field teams deploying physical kiosks. | Document explicitly: "Kiosk/shared device deployments require APv1 self-deploying mode or Windows 365 Frontline (preview) with APv2 automatic deployment." |
| Complete APv2 error code hex table | APv1 error code table (29 entries) is popular; teams assume APv2 equivalent exists | APv2 does not use the same hex error code system as APv1. Failures in APv2 appear as: deployment report status (Skipped/Failed), stuck percentage, or "experience never launches." Forcing APv2 failures into APv1 error code format would be incorrect and mislead diagnosis. | Build APv2 failure index organized by symptom not error code. Map each symptom to root causes and configuration checks. |
| Windows 10 APv2 setup guide | Teams have mixed Win10/Win11 fleets and want APv2 guidance for both | APv2 requires Windows 11, version 22H2 or later with KB5035942. Windows 10 is not supported. Building a Win10 APv2 guide documents a non-functional scenario. | Clarify in prerequisites: "APv2 requires Windows 11. Windows 10 devices must use APv1." |

---

## Feature Dependencies

```
[APv2 Lifecycle Overview]
    └──required by──> [APv2 L1 Decision Tree]
    └──required by──> [APv2 L1 Runbooks]
    └──required by──> [APv2 L2 Investigation Guides]

[APv2 Admin Setup Guides — Prerequisites]
    └──required by──> [APv2 Device Group Setup Guide]
    └──required by──> [APv2 Device Preparation Policy Guide]
    └──required by──> [APv2 App/Script Configuration Guide]

[APv2 Device Group Setup Guide]
    └──required by──> [APv2 Device Preparation Policy Guide]
    (Device group must exist before it can be assigned to policy)

[APv2 User Group Setup Guide]
    └──required by──> [APv2 Device Preparation Policy Guide]
    (User group must exist before policy assignment)

[APv2 Device Preparation Policy Guide]
    └──required by──> [APv2 App/Script Configuration Guide]
    (Policy must exist before app selection makes sense)

[APv1 Admin Setup — Profile Configuration]
    └──enhances──> [v1.0 L1 Runbook 03 — Profile Not Assigned]
    └──enhances──> [v1.0 L2 Runbook 05 — Policy Conflicts]
    (Existing troubleshooting docs become more complete when admin setup guides
     cross-reference what misconfiguration causes each failure)

[APv1 Admin Setup — ESP Configuration]
    └──enhances──> [v1.0 L1 Runbook 02 — ESP Stuck or Failed]
    └──enhances──> [v1.0 L2 Runbook 02 — ESP Deep-Dive]

[APv1 Admin Setup — Dynamic Groups]
    └──enhances──> [v1.0 L1 Runbook 03 — Profile Not Assigned]

[APv2 Known Issues Reference]
    └──enhances──> [APv2 L1 Runbooks] (L1 checks known issue list before escalating)
    └──enhances──> [APv2 L2 Investigation Guides]

[APv2 Monitoring Guide]
    └──enhances──> [APv2 L2 Investigation Guides]
    (Deployment report is primary APv2 diagnostic tool)
```

### Dependency Notes

- **APv2 lifecycle overview must precede all APv2 troubleshooting content.** Teams cannot use a decision tree for "APv2 experience never launches" unless they understand what the APv2 experience looks like when it does launch. The lifecycle overview establishes this baseline.
- **APv2 device group setup must precede policy creation.** The Device Preparation policy requires a pre-existing device group with the Intune Provisioning Client service principal as owner. Creating the policy before the group is set up correctly is the #1 APv2 admin failure path.
- **APv1 admin setup guides are independent of APv2 content** but enhance v1.0 troubleshooting docs. They should cross-reference existing v1.0 runbooks rather than duplicate them.
- **APv2 RBAC guide is a prerequisite for APv2 admin setup.** An admin without the correct RBAC role cannot save the device group to the policy, causing a "0 groups assigned" failure that looks like a product bug.

---

## MVP Definition (v1.1 Scope)

### Launch With (v1.1 required)

Content without which v1.1 does not deliver on its stated goal.

- [ ] **APv2 lifecycle overview with Mermaid flow diagram** — Without this, no APv2 troubleshooting content is usable. Teams must understand the APv2 flow before they can use a decision tree or runbook.
- [ ] **APv2 L1 decision tree — initial triage** — Gate that separates APv2 from APv1 failures. The key branch: "Did ESP display?" → Yes = APv1, wrong tree. This prevents L1 from applying APv1 runbooks to APv2 failures.
- [ ] **APv2 L1 runbook — deployment experience never launches** — Highest-volume APv2 L1 call. All causes are L1-verifiable (OS version, device group, user group, auto-enrollment). Fully scriptable for Service Desk.
- [ ] **APv2 L1 runbook — apps not installed or show Skipped** — Second highest-volume APv2 L1 call. L1 can verify app assignment, context, and policy selection before escalating to L2.
- [ ] **APv2 L2 investigation guide — log collection** — Bootstrapper event log and Intune deployment report are the APv2 equivalents of MDM diagnostic logs in APv1. L2 cannot investigate without knowing where to look.
- [ ] **APv2 L2 investigation guide — group and policy configuration failures** — The Intune Provisioning Client service principal issue is the dominant APv2 L2 failure. Requires PowerShell, beyond L1 scope.
- [ ] **APv2 admin setup guide — prerequisites and tenant configuration** — Prevents setup failures before they become deployment failures.
- [ ] **APv2 admin setup guide — device group setup (Enrollment Time Grouping)** — The most unique and most error-prone APv2 configuration step. Must include PowerShell commands for adding Intune Provisioning Client as group owner.
- [ ] **APv2 admin setup guide — Device Preparation policy creation** — The central APv2 admin configuration object. Must document all settings and their correct values.
- [ ] **APv1 admin setup guide — hardware hash registration** — L1/L2 v1.0 troubleshooting docs reference admin-side actions (upload hash, verify assignment) without documenting the admin setup side. Closes the gap.
- [ ] **APv1 admin setup guide — deployment profile configuration** — Must include all OOBE settings, correct values, and cross-references to failure modes they prevent.
- [ ] **APv1 admin setup guide — ESP configuration** — Most complex APv1 admin configuration. Must include timeout guidance, app tracking rules, Windows Update setting (new August 2025 default).

### Add After Validation (v1.1 follow-on)

Add if v1.1 core generates feedback identifying gaps.

- [ ] **APv2 admin setup guide — RBAC permissions** — Important but admins who lack RBAC see an error message; they do not silently fail. Escalation path is clear. Defer if scope is tight.
- [ ] **APv2 admin setup guide — app and script configuration detail** — The Device Preparation policy guide covers app selection at a high level. A dedicated deeper guide (System context verification, dependency handling, Managed Installer policy interaction) adds value but can follow initial release.
- [ ] **APv2 monitoring and reporting guide** — The deployment report is powerful but not required to troubleshoot; L2 investigation guides can reference it without a standalone guide.
- [ ] **APv1 admin setup guide — deployment mode details (pre-provisioning, self-deploying)** — User-driven setup is covered in MVP. Pre-provisioning and self-deploying setup are less common and require more detail. Add after user-driven admin guide is validated.
- [ ] **APv1 admin setup guide — dynamic group configuration** — Short content. Worth including in MVP if scope allows. Defer if it doesn't.

### Future Consideration (v2+)

Defer until the v1.1 content is validated in use.

- [ ] **Interactive web-based decision trees** — Frontend work, explicitly deferred to future milestone per PROJECT.md.
- [ ] **APv2 Windows 365 automatic deployment guide** — Windows 365 Frontline automatic mode is in preview. Document only after it reaches GA and stabilizes.
- [ ] **APv2 GCCH/DoD specific guidance** — Government cloud has additional requirements. Document after non-government APv2 docs are stable.
- [ ] **macOS / Linux provisioning coverage** — Planned for v1.2 milestone, not v1.1.

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| APv2 lifecycle overview + flow diagram | HIGH | MEDIUM | P1 |
| APv2 L1 decision tree — initial triage | HIGH | MEDIUM | P1 |
| APv2 L1 runbook — experience never launches | HIGH | MEDIUM | P1 |
| APv2 L1 runbook — apps not installed / Skipped | HIGH | MEDIUM | P1 |
| APv2 L2 guide — log collection (Bootstrapper + report) | HIGH | LOW | P1 |
| APv2 L2 guide — group and policy config failures | HIGH | HIGH | P1 |
| APv2 admin setup — prerequisites and tenant config | HIGH | LOW | P1 |
| APv2 admin setup — device group (Enrollment Time Grouping) | HIGH | MEDIUM | P1 |
| APv2 admin setup — Device Preparation policy | HIGH | MEDIUM | P1 |
| APv1 admin setup — hardware hash registration | HIGH | MEDIUM | P1 |
| APv1 admin setup — deployment profile configuration | HIGH | MEDIUM | P1 |
| APv1 admin setup — ESP configuration | HIGH | HIGH | P1 |
| APv2 known issues and workarounds reference | MEDIUM | LOW | P1 |
| APv2 admin setup — RBAC permissions | MEDIUM | LOW | P2 |
| APv2 admin setup — app and script configuration | MEDIUM | MEDIUM | P2 |
| APv2 monitoring and reporting guide | MEDIUM | LOW | P2 |
| APv1 admin setup — dynamic group configuration | MEDIUM | LOW | P2 |
| APv1 admin setup — deployment mode details (PP/SD) | MEDIUM | HIGH | P2 |
| APv1/APv2 side-by-side admin setup comparison | LOW | LOW | P2 |
| APv2 Windows 365 automatic deployment guide | LOW | MEDIUM | P3 |

**Priority key:**
- P1: Must have for v1.1 launch — L1/L2/admins blocked without it
- P2: Should have — reduces escalations and setup errors significantly
- P3: Nice to have — deferred to v2+ or after validation

---

## Document Structure Map

How the new content maps to the existing docs/ directory structure.

```
docs/
├── apv1-vs-apv2.md              [EXISTS — update triage guidance section]
├── lifecycle/
│   └── apv2-overview.md         [NEW — APv2 lifecycle stages, Mermaid diagram]
├── decision-trees/
│   └── 04-apv2-initial-triage.md [NEW — APv2 initial triage tree]
├── l1-runbooks/
│   ├── 06-apv2-not-launching.md  [NEW]
│   └── 07-apv2-apps-skipped.md   [NEW]
├── l2-runbooks/
│   ├── 06-apv2-log-collection.md  [NEW]
│   └── 07-apv2-group-policy-failures.md [NEW]
├── admin-setup/                  [NEW directory]
│   ├── 00-index.md               [NEW — admin setup navigation]
│   ├── apv1-hardware-hash.md     [NEW]
│   ├── apv1-deployment-profile.md [NEW]
│   ├── apv1-esp-configuration.md  [NEW]
│   ├── apv1-dynamic-groups.md     [NEW — P2, may defer]
│   ├── apv2-prerequisites.md      [NEW]
│   ├── apv2-device-group.md       [NEW — Enrollment Time Grouping]
│   ├── apv2-user-group.md         [NEW — P2, may consolidate with policy guide]
│   ├── apv2-policy-creation.md    [NEW — Device Preparation policy]
│   └── apv2-app-configuration.md  [NEW — P2]
└── reference/
    └── apv2-known-issues.md       [NEW — known issues and workarounds]
```

**Dependency on v1.0 content:** Admin setup guides cross-reference existing v1.0 runbooks (l1-runbooks/, l2-runbooks/, error-codes/) with inline links. No v1.0 content is modified except apv1-vs-apv2.md.

---

## APv2 Failure Index (Equivalent of v1.0 Error Code Inventory)

APv2 failures are symptom-based not hex-code-based. This is the definitive scope for APv2 troubleshooting content. All entries verified against Microsoft Learn troubleshooting FAQ and known issues page (HIGH confidence, verified 2026-04-10).

| Symptom | Root Cause Category | L1 or L2 | Resolution Path |
|---------|---------------------|-----------|-----------------|
| APv2 OOBE experience never launches | OS version below minimum | L1 | Verify Win11 22H2+KB5035942; check OEM media date |
| APv2 OOBE experience never launches | Device registered as APv1 device (APv1 profile takes precedence) | L1 | Check Autopilot registered devices in Intune; deregister if present |
| APv2 OOBE experience never launches | User not in user group assigned to APv2 policy | L1 | Verify user group membership in Entra |
| APv2 OOBE experience never launches | Device group not saved in policy (0 groups assigned) | L2 | Verify Intune Provisioning Client service principal as group owner |
| APv2 OOBE experience never launches | Auto-enrollment not configured | L1/L2 | Verify MDM scope in Entra > Mobility (MDM and WIP) |
| APv2 OOBE experience never launches | Corporate identifier required but not added | L1 | Add device serial number/manufacturer/model to Intune corporate identifiers |
| Apps show "Skipped" in deployment report | Apps not assigned to device group | L1 | Verify app assignment to Enrollment Time Grouping device group |
| Apps show "Skipped" in deployment report | Apps configured as User context not System context | L1/L2 | Reconfigure app to System context installation |
| Apps show "Skipped" in deployment report | Managed Installer policy active (pre-April 2026 tenants) | L2 | Known issue; apps deploy post-desktop. Verify patch status. |
| Apps show "Failed" in deployment report | App packaging or dependency error | L2 | Check app packaging; review Bootstrapper event log |
| Device not added to device group | Intune Provisioning Client not group owner | L2 | Add service principal via PowerShell; AppID: f1346770-5b25-470b-88bd-d5744ab7952c |
| Device not added to device group | Group type is dynamic instead of assigned | L2 | Recreate group as assigned type |
| Device not added to device group | Group has "Entra roles assignable" = Yes | L2 | Recreate group with this setting = No |
| Policy group save fails ("0 groups assigned") | Intune Provisioning Client not group owner | L2 | Same as above; may display as "Intune Autopilot ConfidentialClient" in some tenants |
| Deployment stuck at 100% | Known APv2 issue | L1 | User must manually restart device |
| User lands on desktop without apps installed | Entra ID Local administrator conflict with APv2 Standard user policy | L2 | Verify three-way settings combination (Entra Local admin settings + APv2 user account type); see known issues |
| BitLocker 256-bit not applying | Known race condition in APv2 | L2 | Known unfixed issue; do not deploy APv2 for environments requiring 256-bit BitLocker until resolved |
| Multiple APv2 policies — wrong one applied | Policy priority misconfigured | L2 | Adjust priority order in Intune; highest priority = smallest number in Priority column |
| Log export during OOBE saves without confirmation | Known issue — USB save without dialog | L1 | Expected behavior; verify USB drive connected; check USB drive root for log file |

---

## Sources

- [Overview of Windows Autopilot device preparation — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/overview) — Updated 2026-04-07. HIGH confidence. Primary APv2 overview, Enrollment Time Grouping, capabilities.
- [Windows Autopilot device preparation requirements — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/requirements) — Updated 2026-04-07. HIGH confidence. OS requirements, networking, licensing, configuration steps, RBAC permissions.
- [Windows Autopilot device preparation troubleshooting FAQ — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/troubleshooting-faq) — Updated 2026-04-07. HIGH confidence. All APv2 failure scenarios and resolution steps.
- [Windows Autopilot device preparation known issues — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/known-issues) — Updated 2026-04-10. HIGH confidence. All current known issues with dates and workarounds.
- [Configure Windows Autopilot profiles — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/profiles) — Updated 2026-02-05. HIGH confidence. APv1 deployment profile settings, creation steps, profile priority behavior.
- [Set up the Enrollment Status Page — Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/windows-enrollment-status) — HIGH confidence. ESP configuration settings including August 2025 Windows Update default change.
- [Windows Autopilot device preparation FAQ — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/faq) — HIGH confidence. Supported scenarios, deployment modes, limitations.
- [APv2 and pre-provisioning — Out of Office Hours](https://oofhours.com/2025/05/30/apv2-and-pre-provisioning-we-can-do-that-too/) — MEDIUM confidence. Community documentation of experimental APv2+HAADJ configuration. NOT recommended for production docs — included only to confirm this is unofficial/experimental.
- [Windows Autopilot Best Practices 2026 — GoWorkwize](https://www.goworkwize.com/blog/windows-autopilot-best-practices) — LOW confidence. WebSearch only. General best practices context.

---

*Feature research for: APv2 Documentation and Admin Setup Guides (v1.1 milestone)*
*Researched: 2026-04-10*
