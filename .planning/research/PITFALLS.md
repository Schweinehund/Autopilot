# Pitfalls Research

**Domain:** IT Documentation — APv2 (Device Preparation) Docs + Admin Setup Guides for APv1/APv2
**Researched:** 2026-04-10
**Confidence:** HIGH (Microsoft Learn official docs April 2026 + community validation + existing v1.0 pitfall base)

---

## Scope Note

This file covers pitfalls for the v1.1 milestone: adding APv2 (Device Preparation) documentation and admin setup guides for both APv1 and APv2 to the existing v1.0 documentation suite. Pitfalls from v1.0 research that remain relevant are retained; new pitfalls specific to APv2 integration and admin setup guide content are added and marked.

---

## Critical Pitfalls

### Pitfall 1: APv1 Profile Takes Precedence — Undocumented in Coexistence Content [NEW — v1.1]

**What goes wrong:**
Documentation describes APv1 and APv2 as two parallel options admins can use side-by-side, without clearly stating that any device with an APv1 Autopilot profile registered will never see an APv2 policy, regardless of how the APv2 policy is configured. If an admin registers a device's hardware hash (APv1), that device will always follow the APv1 profile — the APv2 Device Preparation policy is silently bypassed. The troubleshooting symptom is that the APv2 OOBE experience never launches and the ESP shows instead, which L1 agents interpret as an ESP failure rather than a coexistence conflict. Official Microsoft docs confirm: "Windows Autopilot profiles take precedence over Windows Autopilot device preparation policies."

**Why it happens:**
Writers document the two frameworks correctly in isolation but gloss over coexistence behavior in admin setup guides. The natural assumption is "assign the right profile to the right device group" — the pre-registration requirement for APv1 is not treated as a conflict blocker for APv2.

**How to avoid:**
- Every APv2 admin setup guide must include an explicit prerequisite: "Verify the device is NOT registered as a Windows Autopilot (APv1) device. Use Intune > Devices > Enroll Devices > Windows Autopilot Devices to check. If registered, deregister before proceeding."
- The coexistence section of `apv1-vs-apv2.md` (which already exists) must be expanded with the deregistration procedure and a clear warning that profile precedence is silent — no error is thrown, the wrong flow simply runs
- Every APv2 troubleshooting guide must include "ESP appears during deployment" as a diagnostic symptom pointing to an APv1 registration conflict, not an ESP configuration problem
- Admin setup guides for APv2 must state upfront: APv2 does not use hardware hash registration, and if hardware hash was previously imported for a device, that import must be removed

**Warning signs:**
- APv2 OOBE (Device Preparation page) never appears; ESP shows instead
- Admin setup guide describes APv1 and APv2 as interchangeable "options" without noting the precedence rule
- Coexistence section says "both can be used" without specifying that one device can only run one at a time
- No mention of the deregistration step in the APv2 setup procedure

**Phase to address:** Phase 1 (APv2 Lifecycle Foundation) — must be the opening prerequisite of every APv2 setup guide

---

### Pitfall 2: APv2 Security Group Configuration Errors — Four Distinct Failure Modes Conflated [NEW — v1.1]

**What goes wrong:**
APv2 requires a static assigned device security group with the Intune Provisioning Client service principal (AppID: f1346770-5b25-470b-88bd-d5744ab7952c) as the group owner. Documentation that fails to cover all four failure modes sends admins into loops: (1) Intune Provisioning Client not set as group owner — policy saves but devices never join the group, (2) group changed from static to dynamic after configuration — causes ongoing membership update failures, (3) Intune Provisioning Client service principal displays as "Intune Autopilot ConfidentialClient" in some tenants — admin assumes it is the wrong service principal and skips the owner assignment, (4) the "Microsoft Entra roles can be assigned to the group" setting must be No — if Yes, the policy cannot be saved. Each failure mode produces a different symptom and a different error message, but all result in the same outcome: devices are not added to the group and policy is not applied.

**Why it happens:**
The group configuration step is documented on Microsoft Learn but spread across multiple articles. Admin setup guides that summarize the procedure compress it into "create a group and add the service principal" without capturing the exact requirements for each of the four conditions. The service principal naming inconsistency across tenants ("Intune Provisioning Client" vs. "Intune Autopilot ConfidentialClient") is a known issue that is not prominently disclosed.

**How to avoid:**
- Admin setup guides for APv2 must include a group configuration checklist covering all four conditions in sequence: (a) group type is Assigned (not Dynamic), (b) "Microsoft Entra roles can be assigned to the group" is No, (c) Intune Provisioning Client (or Intune Autopilot ConfidentialClient) with AppID f1346770-5b25-470b-88bd-d5744ab7952c is set as owner, (d) the service principal exists in the tenant (instructions to add via PowerShell if missing)
- Document the service principal naming ambiguity explicitly: "The service principal may appear as either 'Intune Provisioning Client' or 'Intune Autopilot ConfidentialClient' — both are correct as long as the AppID is f1346770-5b25-470b-88bd-d5744ab7952c"
- Include the policy UI bug warning: during editing, the Applications and Scripts tabs may display incorrect content (a known issue documented April 2026) — the view is incorrect, the configuration applied to devices is not affected
- Static vs. dynamic group change is destructive — admin setup guides must warn that changing group type after initial configuration can cause deployment failures

**Warning signs:**
- Admin setup guide describes group creation without specifying Assigned (not Dynamic) type
- Service principal AppID is not included — only the display name "Intune Provisioning Client"
- Policy saves but shows "0 groups assigned" (symptom of owner not set correctly)
- No mention of the service principal naming inconsistency across tenants

**Phase to address:** Phase 2 (APv2 Admin Setup Guide) — group configuration must be a checklist, not a narrative paragraph

---

### Pitfall 3: APv2 App Deployment Requirements Understated — System Context and App Limit Are Non-Obvious [NEW — v1.1]

**What goes wrong:**
APv2 supports up to 25 apps during OOBE (increased from 10 in January 2026). All apps must be assigned in System context — if any app is configured for User context, it will be skipped during OOBE with no error visible to the admin, and the deployment report shows them as "Skipped." The Managed Installer policy adds another silent failure mode: when active for a tenant (always active for Education/Windows 11 SE), Win32, Microsoft Store, and Enterprise App Catalog apps are not delivered during OOBE — they install post-desktop. This was a known issue from October 2024 through April 2026, when it was resolved. Documentation written before April 2026 describing this as a known limitation is now out of date.

A further accuracy risk: the Managed Installer issue was listed as unresolved on the known issues page until April 10, 2026. Any documentation written before that date that describes Managed Installer policy as blocking OOBE app delivery is now incorrect for current tenants.

**Why it happens:**
System context requirement is easily missed because most app deployments default to User context in Intune. The 25-app limit increase was silent to many admins who never subscribed to the What's New RSS feed. Managed Installer policy is an obscure tenant-wide setting many admins did not know they had enabled.

**How to avoid:**
- Admin setup guides for APv2 app assignment must include a callout: "All apps assigned in the Device Preparation policy must be configured for System context. Apps configured for User context are silently skipped during OOBE."
- Include verification steps: how to check the app context setting in Intune for Win32 apps (detection rules > install behavior > System)
- Document the 25-app limit (current as of January 2026) and note that exceeding it silently drops additional apps
- Add a Managed Installer policy note: if the tenant is Education or uses Windows 11 SE, Managed Installer is active — verify this is no longer blocking OOBE delivery (resolved April 2026) and upgrade note: check KB/IME version before trusting this resolution
- For all "Skipped" app reports, include a diagnosis flowchart: (1) Is app assigned to the device group? (2) Is app set to System context? (3) Is Managed Installer policy active?

**Warning signs:**
- Admin setup guide shows app assignment steps without mentioning install context
- App limit documented as 10 (pre-January 2026 content that has not been updated)
- Managed Installer policy interaction not documented in APv2 app troubleshooting

**Phase to address:** Phase 2 (APv2 Admin Setup Guide) and Phase 3 (APv2 Error Codes and Runbooks)

---

### Pitfall 4: APv2 OS Version Gating Is Stricter Than APv1 — Frequently Omitted in Setup Guides [NEW — v1.1]

**What goes wrong:**
APv2 requires Windows 11 22H2 or later, with a specific KB prerequisite (KB5035942) for 22H2 and 23H2. Windows 10 is not supported. Devices shipped by OEMs may not have the required KB applied if the OEM's image was built before April 2024. Installation media dated before April 2024 also lacks the required KB. Admin setup guides that omit this prerequisite cause admins to configure APv2 policies, ship devices, and then experience deployments where the APv2 OOBE never launches — because the device does not meet the software prerequisite. The symptom is indistinguishable from the APv1 precedence conflict (Pitfall 1) without examining the OS version and KB state.

**Why it happens:**
APv1 was historically much more permissive about OS version requirements. Writers carry over the assumption that "any recent Windows" works. The KB prerequisite is a non-obvious requirement — it is documented but not prominent.

**How to avoid:**
- Every APv2 admin setup guide must open with a software prerequisites section: Windows 11 22H2 or later, with KB5035942 for 22H2/23H2 builds
- Include a practical verification step for OEM-shipped devices: check build number and KB state via Settings > Windows Update > Update History before attempting APv2 deployment
- Note that Windows 365 Cloud PC images in the gallery include the required updates, but custom images require explicit verification
- Explicitly state Windows 10 is not supported and will not receive the Device Preparation experience — even if the device is assigned to an APv2 policy

**Warning signs:**
- APv2 setup guide has no OS version prerequisites section
- Prerequisites section mentions "Windows 11" without specifying the 22H2 minimum and KB5035942 requirement
- Guide does not address OEM-shipped device KB verification

**Phase to address:** Phase 1 (APv2 Lifecycle Foundation) — prerequisites must gate all subsequent setup and troubleshooting content

---

### Pitfall 5: Entra Local Administrator Setting Conflict — Silent Provisioning Skip [NEW — v1.1]

**What goes wrong:**
There is a documented conflict between the APv2 policy "User account type" setting and the Microsoft Entra ID "Local administrator settings" (under Entra ID > Devices > Devices settings). Specific combinations cause provisioning to be silently skipped — the user reaches the desktop without any apps or scripts installed, with no error displayed. The conflict is not surfaced in the Intune admin center. Admin setup guides that do not document the correct setting combinations leave admins unable to diagnose why devices are reaching the desktop without completing provisioning.

The three safe configurations for "standard user" outcome and two for "administrator user" outcome are documented in Microsoft's known issues page, but the interaction between two independent settings (one in Entra ID, one in Intune) is not obvious and is frequently missed during setup.

**Why it happens:**
The two settings live in different admin portals (Entra ID admin center vs. Intune admin center). Admins configuring APv2 focus on the Intune policy and do not examine the Entra ID device settings. The conflict is only documented in the APv2 known issues page, not in the setup tutorial itself.

**How to avoid:**
- Admin setup guides for APv2 must include a cross-portal settings table showing the three valid standard-user combinations and two valid administrator combinations
- Include the diagnostic: if devices reach desktop without installing assigned apps, check Entra ID > Devices > Devices settings > Local administrator settings — this interaction is the most likely cause of a "provisioning skipped" failure with no error
- Add a "before you deploy" verification step: confirm Entra ID Local administrator settings match your APv2 policy intent
- APv2 troubleshooting runbooks must include "provisioning skipped with no error" as a symptom with this as the primary differential diagnosis

**Warning signs:**
- APv2 admin setup guide focuses only on Intune policy settings, with no Entra ID portal configuration steps
- Troubleshooting content for "device reaches desktop without completing setup" does not exist or sends admins to check app assignments first
- No cross-portal settings table in the setup guide

**Phase to address:** Phase 2 (APv2 Admin Setup Guide) and Phase 3 (APv2 Error Codes)

---

### Pitfall 6: Admin Setup Guides for APv1 Omit the Configuration-Caused Failure Chain [NEW — v1.1]

**What goes wrong:**
Admin setup guides document how to configure Autopilot profiles, ESP, and dynamic groups in Intune. They do not document what downstream failures specific configuration choices cause. Examples: (1) ESP timeout set too low causes deployment failures that L1 diagnoses as app install failures — the real cause is the timeout, and it is configurable, (2) APv1 profile assigned to All Devices group instead of a targeted Autopilot Devices dynamic group causes every device in the tenant to receive Autopilot behavior, breaking standard OOBE for non-Autopilot devices, (3) "Skip AD connectivity check" enabled in the Autopilot profile breaks hybrid join deployments that require domain controller reachability, (4) multiple Autopilot profiles with conflicting settings assigned to overlapping groups — Microsoft resolves conflicts by assigning the oldest-created profile, which is non-obvious and produces unpredictable results.

**Why it happens:**
Admin setup guides are written from the "happy path" perspective. Each setting is explained in isolation. The downstream failure modes are documented only in troubleshooting guides — which are separate documents. Admins configuring a new environment follow the setup guide, not the troubleshooting guide, so they miss the warnings.

**How to avoid:**
- Every admin setup guide must include a "Configuration choices that cause downstream failures" section, not just a "how to configure" section
- For each major setting (ESP timeout, group assignment scope, profile conflict resolution, "skip AD connectivity check"), document: what happens if misconfigured, what the symptom looks like to L1, and how to verify the setting is correct before deployment
- APv1 admin setup guide must include an explicit warning: assign Autopilot profiles to a targeted Autopilot Devices dynamic group (using the `(device.devicePhysicalIds -any _ -eq "[ZTDId]")` dynamic rule), never to All Devices
- ESP timeout guidance must include a minimum recommended timeout with the rationale: "40-60 minutes is a common baseline; adjust upward if your required app list includes Microsoft 365 or large Win32 apps"
- Profile conflict resolution must be documented: oldest-created profile wins; the admin must verify priority order in Intune to avoid unintended profile assignment

**Warning signs:**
- Admin setup guide has no section on what goes wrong when settings are misconfigured
- Group assignment section shows "All Devices" as the assignment target without a warning
- ESP timeout section does not provide a recommended range
- No mention of profile conflict resolution behavior

**Phase to address:** Phase 4 (APv1 Admin Setup Guides) — configuration-caused failures are the defining content difference between a setup guide and a marketing tutorial

---

### Pitfall 7: APv2 Accuracy Risk from Rapid Feature Evolution [NEW — v1.1]

**What goes wrong:**
APv2 launched in June 2024 and has changed substantially in 22 months. Features added, limits changed, known issues resolved, and behaviors modified without a traditional version release:
- App limit: 10 apps at launch → 25 apps (January 2026)
- Enterprise App Catalog apps: not supported at launch → supported (June 2025)
- Automatic mode for Windows 365: not available at launch → added (April 2025 for shared mode, November 2025 for dedicated mode)
- Managed Installer policy blocking OOBE app delivery: known issue October 2024 → resolved April 2026
- Monthly security update installation during OOBE: announced September 2025, immediately delayed, still no timeline as of April 2026
- Windows quality updates section in ESP troubleshooting docs explicitly notes it does NOT apply to APv2 (APv2 doesn't use ESP) — this cross-contamination from APv1 docs is an active accuracy risk

Documentation written at any point in this timeline may be obsolete. There is no stable APv2 feature set to write to — the Intune service changes the behavior of APv2 without any admin action or device update.

**Why it happens:**
Cloud-native service means Microsoft can change APv2 behavior server-side. There is no "APv2 version 1.3 release notes" — changes appear in the Intune monthly release notes and the What's New page, but the APv2 docs on Learn are updated asynchronously and sometimes lag the actual behavior change.

**How to avoid:**
- Every APv2 document must have a "Last verified" date in frontmatter and a "Review by" date no more than 90 days out (shorter than APv1's 6-month cycle, because APv2 is changing faster)
- Subscribe to the APv2 What's New RSS feed (`https://learn.microsoft.com/api/search/rss?search=%22News+and+resources+about+the+latest+updates+of+Windows+Autopilot+device+preparation%22&locale=en-us`) and the Known Issues RSS feed — link both in the docs repo README as required review sources
- For facts with a known change history (app limit, supported modes, known issues), link to the Microsoft Learn page rather than stating the value inline — this defers to an authoritative live source rather than creating a second source that will drift
- Call out features announced but not yet delivered: as of April 2026, monthly security update installation during OOBE was announced in September 2025 and then delayed with no revised timeline — documents describing this as available are wrong
- Flag APv1 docs that reference ESP settings applicable to "Autopilot" generically — verify each one does not bleed into APv2 troubleshooting where ESP does not exist

**Warning signs:**
- APv2 document states app limit of 10 (pre-January 2026 content)
- APv2 document describes monthly security update OOBE installation as available (announced but not delivered as of April 2026)
- No "Last verified" date on any APv2 document
- APv2 troubleshooting guide references ESP settings

**Phase to address:** Phase 1 (APv2 Lifecycle Foundation) — accuracy metadata and review cadence must be established before any APv2 content is written

---

### Pitfall 8: Treating APv1 Treating "White Glove" as Deprecated When the Term Alone Was Deprecated [EXISTING — v1.0, refined]

**What goes wrong:**
Microsoft deprecated the term "white glove" in favor of "pre-provisioning." The feature itself is not deprecated — pre-provisioning (APv1 technician flow) is still fully supported and remains the only option for pre-staged device preparation in APv1. Documentation that says "white glove is deprecated" without the qualifier that only the name changed confuses admins who need to use pre-provisioning and cannot find documentation for it. The APv2 addition amplifies this: APv2 does not support pre-provisioning at all. An admin reading "white glove is deprecated" may incorrectly conclude that they should switch to APv2 for pre-provisioning scenarios — APv2 cannot meet this need.

**How to avoid:**
- Admin setup guides must use "pre-provisioning" exclusively, with a footnote: "Previously called 'white glove' — the term was deprecated but the feature remains supported in APv1"
- Explicitly document that APv2 does not support pre-provisioning — this must appear in the APv2 admin setup guide as a scope limitation, not a footnote
- In the `apv1-vs-apv2.md` disambiguation page (already exists), verify the pre-provisioning row is clear: APv1 Yes, APv2 No

**Warning signs:**
- Admin setup guide for APv2 implies pre-provisioning can be configured
- APv1 pre-provisioning guide uses "white glove" as the primary term
- Disambiguation page does not explicitly state APv2 has no pre-provisioning support

**Phase to address:** Phase 1 (APv2 Lifecycle Foundation) and Phase 4 (APv1 Admin Setup Guides)

---

### Pitfall 9: RBAC Requirements for APv2 Different from APv1 — Admin Setup Guides Assume Same Role [NEW — v1.1]

**What goes wrong:**
APv2 requires a specific custom RBAC role with five permission categories: Device configurations (Read, Delete, Assign, Create, Update), Enrollment programs (Enrollment time device membership assignment), Managed apps (Read), Mobile apps (Read), Organization (Read). The "Intune Administrator" built-in role does not automatically include "Enrollment time device membership assignment" for APv2 policy assignment. Admins following APv1 setup conventions (where the Intune Administrator role suffices for most operations) find they cannot assign APv2 policies to user groups — the error message is "You do not have permission to save these assignments." Admin setup guides that do not specify the exact RBAC requirements upfront cause admins to escalate what is a simple permissions issue.

There was also a temporary known issue (resolved July 2024) requiring "Device configurations — Assign" as an additional permission. Documentation written during that period that was never updated may still describe this temporary workaround as a requirement.

**How to avoid:**
- Every APv2 admin setup guide must include a prerequisites section with the exact RBAC permissions required, listing all five permission categories
- Provide step-by-step instructions for creating the custom role (the Microsoft Learn tutorial covers this and should be linked, not duplicated)
- Note that built-in roles (Intune Administrator) may not suffice for APv2 policy assignment — custom role creation may be required
- Check for outdated content referencing the temporary "Device configurations — Assign" workaround (resolved July 2024) and remove it

**Warning signs:**
- APv2 admin setup guide says "requires Intune Administrator role" without specifying the custom role requirements
- Admin cannot save APv2 policy group assignments — RBAC error is the most common cause
- RBAC section references the temporary July 2024 workaround

**Phase to address:** Phase 2 (APv2 Admin Setup Guide) — RBAC is a Day 1 prerequisite for the admin

---

### Pitfall 10: APv2 Progress UI Accuracy — Documentation Should Not Reproduce Misleading Behavior [NEW — v1.1]

**What goes wrong:**
APv2's device preparation OOBE page shows a progress percentage. The percentage does not reflect actual progress — it marks the passage of time, not the completion of specific provisioning steps. If documentation describes or implies the percentage as a meaningful progress indicator (e.g., "when the progress reaches 100%, deployment is complete"), it misleads admins and L1 agents who use it for deployment monitoring. There is a known issue where devices get stuck at 100% and require a manual restart — a documented known issue that must appear in troubleshooting content. Community sources confirm: "the percentages only mark the passage of time and the UI went from providing too much information in the older ESP to not enough useful information in APv2."

**How to avoid:**
- Lifecycle documentation describing the APv2 OOBE experience must explicitly note: "The progress percentage shown during device preparation does not reflect specific installation milestones — it is time-based"
- Include the "stuck at 100%" known issue in troubleshooting content: if the screen is frozen at 100% with no activity, the user must manually restart the device
- Do not draw decision trees that branch based on progress percentage values — use observable events (screen transitions, error messages, timeout messages) instead
- Compare explicitly to APv1 ESP: APv1 ESP showed discrete stages (Device setup, Account setup) with specific app names — APv2 does not provide this granularity. This is a documented difference, not a bug to be resolved.

**Warning signs:**
- Lifecycle documentation calls the APv2 progress percentage "real-time progress"
- Troubleshooting guide does not include "stuck at 100%" as a known issue
- Decision tree branches on percentage values rather than visible events

**Phase to address:** Phase 1 (APv2 Lifecycle Foundation) and Phase 3 (APv2 Runbooks)

---

### Pitfall 11: Treating APv1 as a Single Product When It Is Now Two [EXISTING — v1.0, retained]

**What goes wrong:**
Documentation written as if "Windows Autopilot" is one thing. APv2 has no hardware hash registration, no ESP, no hybrid join support, no pre-provisioning, and no self-deploying mode. An L1 agent following a classic Autopilot runbook on an APv2 deployment will chase phantom problems.

**How to avoid:**
- Open every guide with an explicit version gate
- Use the existing `apv1-vs-apv2.md` disambiguation page as the canonical routing document — update it with any new v1.1 content additions
- Never write shared error code tables without tagging which product each code applies to

**Warning signs:**
- Guide mentions "hardware hash upload" and "Enrollment Status Page" without a version qualifier
- APv2 error codes appear in the existing APv1 error code tables without tagging

**Phase to address:** Phase 1 (APv2 Lifecycle Foundation)

---

### Pitfall 12: Error Code Tables Without Context Columns [EXISTING — v1.0, retained for APv2 extension]

**What goes wrong:**
Same-code, multiple-cause problems. In APv2, new error codes appear in the bootstrapper/IME event log that do not exist in APv1 sources. If APv2 error codes are added to the existing APv1 error code tables without context tagging, the tables become unusable — L1 cannot determine if a code applies to their deployment mode.

**How to avoid:**
- Extend the existing error code tables with APv2-specific codes, adding a "Framework" column (APv1 / APv2 / Both)
- APv2 error codes surface in the Bootstrapper event log (not the standard Windows event log or the MDM Diagnostic Tool) — this is a fundamentally different diagnostic source that must be documented before L2 can use it
- The deployment status report in Intune is near-real-time for APv2 — for APv2 failures, admins should consult the report before examining event logs

**Phase to address:** Phase 3 (APv2 Error Codes)

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term documentation problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Single shared doc for L1 and L2 | Faster to write one document | L1 skips technical steps, L2 ignores scripted flows | Never |
| Copy APv2 behavior from blog posts without verifying against Microsoft Learn | Fast content | APv2 is evolving rapidly — blog posts written at launch are frequently wrong today | Never — always verify against current Learn docs |
| Write APv2 app limit as a fixed number inline | Simple | Limit increased from 10 to 25 in January 2026 and may change again — inline numbers drift | Acceptable only if paired with a "Last verified" date |
| Omit "Last verified" dates | Saves time | APv2 docs are especially vulnerable to staleness — 90-day review cycle is required | Never for APv2 content |
| Write admin setup guides as step-by-step without configuration-caused failure warnings | Simpler to write | Admins follow steps, make silent misconfigurations, and cannot diagnose the downstream failures | Never — failure chains are the difference between setup docs and useful setup docs |
| Add APv2 error codes to existing APv1 tables without framework tagging | Faster to populate | L1 cannot determine if a code applies to their deployment mode | Never |
| Use the term "white glove" | Familiar to some admins | Deprecated term; causes confusion with APv2 scope when readers conclude "white glove is gone" | Never — use "pre-provisioning" |

---

## Integration Gotchas

Common mistakes when integrating APv2 documentation with existing APv1 content and external systems.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Existing `apv1-vs-apv2.md` page | Adding new APv2 features without updating the comparison table | Review the comparison table against Microsoft Learn compare page (updated April 2026) after every phase of APv2 content is written |
| Existing APv1 error code tables | Adding APv2 codes to the same table without a framework column | Add "Framework" column (APv1 / APv2 / Both) before any APv2 codes are entered |
| Existing L1 runbooks | Failing to add "Does Not Apply to APv2" notes to APv1-specific steps | Audit every existing L1 runbook for ESP-specific steps and add scope notes |
| Intune deployment status report | Pointing APv2 troubleshooting at MDM Diagnostic Tool (APv1 tool) | APv2 troubleshooting goes to the Intune deployment status report first, then Bootstrapper event log — MDM Diagnostic Tool is APv1 |
| SharePoint/Confluence export | Mermaid decision trees not rendering | Test export format for target wiki before creating new Mermaid diagrams in APv2 content |
| Microsoft Learn APv2 What's New RSS | Not subscribing | The What's New RSS feed is the only reliable way to catch APv2 behavior changes — include it in the docs repo README as a required review source |
| Entra ID admin center cross-references | Documenting only Intune admin center steps for APv2 setup | APv2 requires configuration in both portals — Entra ID (local administrator settings, automatic enrollment) and Intune (policy, group) — both must be covered |

---

## "Looks Done But Isn't" Checklist

- [ ] **APv2 Admin Setup Guide:** Often missing the APv1 deregistration prerequisite — verify "device must not be registered as an APv1 device" appears before any APv2 configuration steps
- [ ] **APv2 Group Configuration:** Often missing AppID for Intune Provisioning Client (f1346770-5b25-470b-88bd-d5744ab7952c) — verify AppID appears alongside display name to handle the naming inconsistency across tenants
- [ ] **APv2 App Assignment:** Often missing System context requirement — verify every app assignment step includes the install context setting and its implications
- [ ] **APv2 OS Prerequisites:** Often missing KB5035942 requirement for 22H2/23H2 — verify prerequisites section includes build-specific KB requirements
- [ ] **APv2 RBAC:** Often missing "Enrollment time device membership assignment" permission — verify the five-category custom role requirements are listed, not just "Intune Administrator"
- [ ] **Entra ID Local Admin Setting:** Often absent from APv2 setup guide — verify cross-portal settings table appears with the five valid configuration combinations
- [ ] **APv2 Documents:** Often missing "Last verified" date — verify 90-day review cycle metadata is in every APv2 document's frontmatter
- [ ] **APv1 Admin Setup Guides:** Often missing configuration-caused failure chain — verify each major configurable setting has a "what goes wrong if misconfigured" note
- [ ] **APv1 Pre-provisioning Guide:** Often using "white glove" as primary term — verify "pre-provisioning" is used throughout with a footnote only for the deprecated term
- [ ] **APv2 Troubleshooting Runbooks:** Often missing "provisioning skipped with no error" symptom — verify Entra ID local admin setting conflict appears in the differential diagnosis
- [ ] **APv2 Progress UI:** Often described as real-time progress — verify lifecycle docs call out the time-based (not milestone-based) nature of the percentage
- [ ] **APv2 vs. APv1 Disambiguation Page:** Often not updated when new APv2 features ship — verify `apv1-vs-apv2.md` is updated after each documentation phase closes

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| APv1 precedence conflict undocumented — admins report APv2 never launches | MEDIUM | Add prerequisite to APv2 setup guide, add "ESP appears unexpectedly" symptom to APv2 troubleshooting, notify L1 teams |
| APv2 group configuration failures undocumented | MEDIUM | Add checklist to setup guide, audit existing group configuration content for the four failure modes |
| App context requirement missing from setup guide | LOW | Add System context callout to app assignment section; add "Skipped" diagnostic flowchart to troubleshooting |
| APv2 docs written with wrong app limit (10 instead of 25) | LOW | Point fix: update count, update "Last verified" date |
| Managed Installer policy described as still blocking OOBE delivery | LOW | Point fix: update to "resolved April 2026", add IME version check note |
| Entra ID local admin conflict not in troubleshooting | MEDIUM | Add "provisioning skipped, no error" symptom tree with cross-portal settings table |
| APv2 accuracy drift — features described incorrectly | HIGH if widespread, LOW if isolated | Establish 90-day review cycle, subscribe to RSS feeds, run quarterly audit against Learn changelog |
| Admin setup guides document steps without failure chain warnings | MEDIUM | Add "configuration-caused failures" section to each setup guide — additive, does not invalidate existing content |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| APv1 precedence conflict undocumented | Phase 1: APv2 Lifecycle Foundation | Every APv2 setup guide opens with APv1 deregistration prerequisite |
| APv2 group security configuration errors | Phase 2: APv2 Admin Setup Guide | Group configuration is a checklist with all four failure modes covered |
| APv2 app system context and limit accuracy | Phase 2: APv2 Admin Setup Guide + Phase 3: APv2 Runbooks | App assignment steps include context requirement; "Skipped" diagnostic is documented |
| APv2 OS version gating omitted | Phase 1: APv2 Lifecycle Foundation | Prerequisites section in all APv2 docs includes 22H2 minimum and KB5035942 |
| Entra ID local admin conflict undocumented | Phase 2: APv2 Admin Setup Guide | Cross-portal settings table appears in setup guide; "no error, reached desktop" symptom in runbooks |
| APv1 admin setup guides missing failure chains | Phase 4: APv1 Admin Setup Guides | Each setup guide has a "configuration-caused failures" section |
| APv2 accuracy risk from rapid evolution | Phase 1: APv2 Lifecycle Foundation | 90-day review cadence, RSS subscriptions, and "Last verified" metadata established before any APv2 content is written |
| "White glove" vs. "pre-provisioning" confusion | Phase 1: APv2 Lifecycle Foundation + Phase 4: APv1 Admin Setup Guides | "Pre-provisioning" used throughout; disambiguation page updated |
| APv2 RBAC requirements omitted | Phase 2: APv2 Admin Setup Guide | Five-category custom role requirements listed as Day 1 prerequisite |
| APv2 progress UI misrepresented | Phase 1: APv2 Lifecycle Foundation | Lifecycle docs explicitly note time-based progress percentage |
| APv2 codes added to APv1 error tables without tagging | Phase 3: APv2 Error Codes | Framework column added to error tables before any APv2 codes are entered |
| `apv1-vs-apv2.md` not updated with new features | End of each documentation phase | Comparison table audited against Learn docs before each phase closes |

---

## Sources

- [Compare Windows Autopilot device preparation and Windows Autopilot — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/compare) (updated April 2026)
- [Windows Autopilot device preparation known issues — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/known-issues) (updated April 10, 2026)
- [Windows Autopilot device preparation requirements — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/requirements)
- [What's new in Windows Autopilot device preparation — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/whats-new) (updated April 10, 2026)
- [Windows Autopilot device preparation troubleshooting FAQ — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/troubleshooting-faq)
- [Windows Autopilot troubleshooting FAQ — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/troubleshooting-faq)
- [Windows Autopilot v2: Is it faster? It depends — Out of Office Hours](https://oofhours.com/2025/02/10/windows-autopilot-v2-is-it-faster-it-depends/) (February 2025)
- [Autopilot Device Preparation — APv2 — Call4Cloud](https://call4cloud.nl/autopilot-device-preparation-v2-apv2/)
- [Windows Autopilot V1 vs. V2 differences — SoftTailor](https://www.softtailor.de/en/blog/windows-autopilot-v1-vs-v2)
- [Deep dive into Windows Autopilot device preparation — Microsoft Tech Community](https://techcommunity.microsoft.com/blog/intunecustomersuccess/deep-dive-into-windows-autopilot-device-preparation-how-to-deploy-and-when-to-us/4455341)
- [Troubleshooting Autopilot Device Preparation — Patch My PC](https://patchmypc.com/blog/ultimate-guide-troubleshoot-windows-autopilot/)

---
*Pitfalls research for: APv2 Documentation + Admin Setup Guides (v1.1 milestone)*
*Researched: 2026-04-10*
