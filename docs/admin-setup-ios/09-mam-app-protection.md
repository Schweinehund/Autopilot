---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: mam-we
audience: admin
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS Microsoft Intune app protection policies (MAM Without Enrollment — MAM-WE). MAM-WE protects work data inside SDK-integrated apps without enrolling the device in Intune MDM.
> For iOS/iPadOS enrollment (MDM) setup, see [iOS/iPadOS Admin Setup Overview](00-overview.md) — optional context, not required to follow this guide.
> For iOS/iPadOS enrollment terminology, see the [Apple Provisioning Glossary](../_glossary-macos.md).
> Portal navigation may vary by Intune admin center version. See [Overview](00-overview.md#portal-navigation-note) for details.

# iOS MAM-WE App Protection Policies

Microsoft Intune app protection policies protect work data within SDK-integrated apps without enrolling the device in Intune MDM. This is called MAM Without Enrollment (MAM-WE). On iOS, MAM-WE applies to apps like Outlook, Teams, and Microsoft Edge that integrate the Intune App SDK. The device is not enrolled; no MDM profile is installed; IT has no device-level management capability. Policy controls apply only within managed apps and govern how work data can move into, out of, and within those apps.

Although this guide lives alongside MDM enrollment guides, MAM-WE is an app-layer protection model that does not require — and is not paired with — device enrollment. Everything you need to configure MAM-WE is in this guide; you do not need to read any MDM enrollment guide first.

## Key Concepts Before You Begin

### What MAM-WE Is — and What It Is Not

MAM-WE is an **app-layer data protection model**. Microsoft Intune publishes app protection policies that the Intune App SDK, embedded inside participating apps (Outlook, Teams, Edge, Microsoft 365 apps, third-party SDK-integrated apps), enforces locally on the device. The policies govern:

- **Data ingress** — How work data enters a managed app (for example, "paste work content into this managed app but not into a personal app").
- **Data egress** — How work data leaves a managed app (for example, "do not allow Save As to personal locations").
- **Access controls** — Whether the app requires a work-account PIN before opening.
- **Device conditions** — Policy responses to jailbreak detection, OS-version gates, or other device-state signals reported by the SDK.

MAM-WE is NOT:

- A device enrollment mechanism (the device is never enrolled in Intune MDM).
- An MDM profile installation (no profile is delivered to the device).
- A full-device configuration model (only managed apps are governed; personal apps are untouched).
- A guarantee against all data loss (a determined user who owns a jailbroken device can extract data; MAM-WE is a reasonable-compensating-control, not a high-assurance model).

### MAM-WE Requires the Intune App SDK

Only apps that have integrated the Intune App SDK can be governed by MAM-WE policies. For Microsoft-published apps (Outlook, Teams, Edge, Microsoft 365 suite, Authenticator, OneDrive, etc.), SDK integration is built in — the apps are MAM-capable out of the box. For third-party apps, the developer must integrate the SDK and publish a MAM-capable build. Apps without SDK integration cannot be governed by app protection policies regardless of which policies target the user.

### The Three-Level Data Protection Framework

Microsoft groups app protection policy settings into three preset levels that correspond to increasingly restrictive data-protection postures:

- **Level 1 — Enterprise Basic Data Protection** — Minimum recommended settings; typical for casual enterprise use with no regulatory requirement.
- **Level 2 — Enterprise Enhanced Data Protection** — Recommended default for BYOD and typical enterprise users; blocks data leakage to personal apps while remaining usable.
- **Level 3 — Enterprise High Data Protection** — Strictest settings; typical for regulated industries (finance, healthcare) where misconfiguration carries compliance consequences.

This guide covers all three levels. Level 1 is summarized; Levels 2 and 3 get detailed treatment with What Breaks If Misconfigured callouts because their misconfiguration has the greatest operational consequence.

### Enrolled vs Unenrolled Targeting

MAM-WE policies can target iOS devices in two modes, set per policy:

- **Unenrolled (MAM-WE)** — Device is not enrolled in Intune MDM. Policy applies based on the Entra work account signed into the managed app. This is the mode implied by "MAM-WE" and is the primary focus of this guide.
- **Enrolled (MAM-over-MDM)** — Device is also enrolled in Intune MDM. Policy applies to managed apps on the enrolled device.

Both modes use the same policy definition and the same SDK enforcement. They differ in how the device and user are identified and what additional management surface exists on the device. Most organizations target one mode per user segment; some target both for mixed fleets transitioning between models.

## Prerequisites

- **Microsoft Intune Plan 1** (or higher) subscription with app protection policy licensing.
- **Microsoft Entra ID** — Users must have Entra work accounts with Intune license assigned.
- **MAM-capable apps** available to end users — Microsoft Authenticator, Outlook, Teams, Edge, or third-party SDK-integrated apps distributed via the App Store or VPP. Users must sign into these apps with their work account for policy to apply.
- **Intune Administrator role** — Or a custom RBAC role with app-protection-policy management permissions.
- **iOS 15 or later recommended** (verify current minimum against Microsoft Learn `app-protection-policies` at time of writing — some settings require newer iOS versions).

MAM-WE does **not** require an APNs certificate, ABM token, or MDM enrollment profile. The device is never enrolled in Intune MDM.

## Three-Level Data Protection Framework (Summary)

The table below summarizes the three preset levels against the attributes that most commonly affect policy-choice decisions. Use this as the starting point when choosing a level for a user segment; detailed Level 2 and Level 3 policy-setting inventories follow later in this guide. For the full Level 1 setting inventory, see Microsoft Learn [App protection data protection framework](https://learn.microsoft.com/mem/intune/apps/app-protection-framework).

| Attribute | Level 1 — Basic | Level 2 — Enhanced | Level 3 — High |
|-----------|-----------------|---------------------|-----------------|
| **Typical use case** | Casual enterprise use; no regulatory requirement | BYOD default; typical enterprise | Regulated industries; high-sensitivity data |
| **Work-account PIN required** | Yes (simple PIN, 4 digits) | Yes (stronger PIN, numeric complexity) | Yes (biometric + passcode, timed re-authentication) |
| **Data egress to personal apps** | Restricted (prompt on copy/paste) | Blocked (policy-managed apps only) | Blocked (managed apps only) + managed keyboard |
| **Data ingress from personal apps** | Allowed | Restricted | Blocked |
| **Save As to personal locations** | Allowed | Blocked | Blocked |
| **Jailbreak detection response** | Warn | Block + wipe managed data | Block + wipe managed data |
| **Minimum iOS version gate** | None | Yes (configurable) | Yes (stricter) |
| **Additional iOS-specific controls** | None | Clipboard restrictions | Clipboard + keyboard + screen capture restrictions |

For complete iOS setting inventories at each level, see the sections below. Level 1 is documented in full on Microsoft Learn (linked above); this guide covers Level 2 and Level 3 in detail because their misconfiguration has the greatest operational consequence.

## Targeting: Enrolled vs Unenrolled Devices

Every app protection policy in Intune has a **Target to** setting that determines which device mode receives the policy. Choose the mode that matches your user segment's management posture.

### Comparison

| Attribute | Unenrolled (MAM-WE) | Enrolled (MAM-over-MDM) |
|-----------|---------------------|--------------------------|
| Device state | Not enrolled in Intune MDM | Enrolled in Intune MDM (Device Enrollment, User Enrollment, or ADE) |
| User identifier | Entra work account signed into managed app | Entra work account + MDM enrollment identifier |
| Assignment UX | Assigned to user groups; applies when user signs into managed app | Assigned to user or device groups; applies at app launch on enrolled device |
| Typical scenario | BYOD without device enrollment; contractor/contingent workforce | Corporate fleet where both device-level and app-level control are desired |

### Decision Guidance

- **Use unenrolled (MAM-WE) targeting** when users own the device and the organization prefers not to enroll the device — common for BYOD scenarios, contractor access, and privacy-sensitive use cases.
- **Use enrolled (MAM-over-MDM) targeting** when users enroll via corporate ADE, Device Enrollment, or User Enrollment, AND the organization wants to enforce app-layer controls in addition to device-layer controls.
- **Target both modes** with separate policies (same settings, two `Target to` values) when the user segment has mixed device-state — some users enroll their devices, others use MAM-WE only.

Do not target both modes with a single policy using overlapping device groups — conflicting policies resolve via Intune's policy-conflict rules and may apply unexpectedly. Create two separate policy objects with distinct Target-to modes instead.

## Creating a MAM-WE Policy

App protection policies are created in the Intune admin center. A single policy object combines platform (iOS/iPadOS), target-to mode (unenrolled or enrolled), app list, and setting values across the three policy areas (Data Protection, Access Requirements, Conditional Launch). The procedure below is the canonical portal flow for an iOS/iPadOS MAM-WE policy; individual setting values come from the Level 1/2/3 sections later in this guide.

### Portal Navigation

1. Sign in to the [Intune admin center](https://intune.microsoft.com).
2. Navigate to **Apps** > **App protection policies** > **+ Create policy** > **iOS/iPadOS**.

### Basics

Enter a descriptive policy name that encodes the level, target mode, and user segment — for example, `iOS MAM-WE L2 BYOD — Marketing` or `iOS MAM-over-MDM L3 — Finance`. Include an optional description recording the policy's intent and the level preset it maps to. Naming convention matters because a production tenant typically hosts multiple app protection policies and the policy list view surfaces only name and modified-date columns.

### Apps

Select the managed apps the policy governs. Three scoping choices are available:

- **All apps** — Every MAM-capable app currently in the Microsoft-published list, plus any third-party SDK-integrated apps surfaced to the tenant. Simplest to maintain; recommended default.
- **Core Microsoft apps** — Outlook, Teams, Word, Excel, PowerPoint, OneNote, OneDrive, Edge, Microsoft 365 (Office). Use when the policy should govern Microsoft's first-party workspace only.
- **Select custom apps** — Manually curated list. Use when specific apps must be excluded (e.g., Teams policy differs from Outlook policy) or when third-party SDK-integrated apps are being piloted.

Apps selected here MUST be MAM-capable (SDK-integrated); non-MAM-capable apps appearing in the tenant's app catalog cannot be selected.

### Target to

Set **Target to** to either **All app types** (both unenrolled and enrolled devices) or a specific mode. For the clean unenrolled MAM-WE pattern, select the unenrolled-devices-only scope. For the dual-targeting pattern (D-26), create two policies with identical settings, one per target mode.

### Data Protection, Access Requirements, Conditional Launch

Configure the three setting groups per the Level 1, Level 2, or Level 3 preset being implemented. Section values for Level 2 and Level 3 are documented verbatim later in this guide; Level 1 values are documented in full on Microsoft Learn [App protection data protection framework](https://learn.microsoft.com/mem/intune/apps/app-protection-framework).

### Assignments

Assign to Entra user groups (MAM-WE assignments are user-scoped, not device-scoped — a single user with multiple iOS devices receives the policy across all of them). Include and Exclude groups are both available; exclusion overrides inclusion for users who are members of both.

### Review and create

Verify the policy's summary screen reflects the intended level and mode. After create, the policy appears under **Apps** > **App protection policies** and begins propagating at the next managed-app launch-time policy check-in (typical latency: 0-15 minutes online).

## Selective Wipe

Selective wipe removes managed app data and corporate accounts from iOS devices protected by MAM-WE policies. Unlike MDM device wipe (which resets the device to factory state), MAM-WE selective wipe removes only managed app data and corporate accounts. The personal side of the device, personal apps, and personal data are not affected.

### Trigger Sources

Selective wipe can be initiated by three sources:

- **Admin-initiated via Intune** — Administrators trigger wipe from **Apps** > **App selective wipe** in Intune admin center. Used for employee offboarding, lost-device scenarios, and explicit revocation of corporate access.
- **User-initiated via Company Portal** — End users can initiate selective wipe on their own managed apps from the Company Portal app (if installed). Used when a user voluntarily removes corporate access from a personal device.
- **Policy-conditional** — Selective wipe fires automatically when the device fails policy conditions: for example, when Level 2 or Level 3 policies detect jailbreak or when the Entra work account is disabled, the SDK triggers wipe of managed data in the affected apps.

### Wipe Scope

Selective wipe removes:

- Managed app data cached or stored inside SDK-integrated apps (Outlook mailbox cache, Teams chat cache, Edge work-profile bookmarks, etc.)
- Corporate accounts signed into managed apps (Entra work-account sign-in is cleared)
- Managed-app local policy state (next app launch re-downloads policy)

Selective wipe does NOT remove:

- Managed apps themselves (the Outlook / Teams / Edge apps remain installed)
- Personal apps, personal app data, or personal iCloud content
- The device itself — the device remains usable for personal purposes

### Verification Steps

- [ ] After admin-initiated wipe, check **Apps** > **App selective wipe** in Intune admin center — the targeted user's row shows state **Successful** within 30 minutes of the wipe request, provided the device checks in with Apple Push Notification service.
- [ ] On the device, open a managed app (for example, Outlook) — the app launches with no corporate account signed in; the app's data cache is cleared.
- [ ] Personal apps continue to function normally; personal data is unaffected.

### iOS-Specific Selective Wipe Considerations

- **APNs dependency** — Selective wipe waits on the managed app's next launch-time policy check-in, which is initiated via Apple Push Notification service. If APNs is blocked at the network edge (firewall, proxy), wipe propagation stalls until the user opens the app while online.
- **App must be installed and signed-in** — Wipe only succeeds on apps that have the Intune App SDK active and the user signed in. If a user signs out of all managed apps before wipe arrives, the wipe completes successfully with no data to remove (the account is already gone).
- **Per-app wipe granularity** — Selective wipe removes data from all managed apps for the targeted user; per-app selective wipe (wipe Outlook but not Teams) is not available on iOS.

## Level 2 — Enterprise Enhanced Data Protection (Detail)

Level 2 is the recommended default for BYOD and typical enterprise users. It blocks data leakage to personal apps while remaining usable for day-to-day work. Verify current iOS setting inventory against Microsoft Learn `app-protection-framework` at time of writing — Microsoft periodically adds and removes settings.

### iOS Level 2 Setting Inventory

| Setting Category | Setting | Recommended Value |
|------------------|---------|-------------------|
| **Data Transfer** | Send org data to other apps | Policy managed apps |
| **Data Transfer** | Receive data from other apps | Policy managed apps |
| **Data Transfer** | Save copies of org data | Block (OneDrive for Business and SharePoint exceptions allowed) |
| **Data Transfer** | Transfer telecommunication data to | Any phone app |
| **Data Transfer** | Restrict cut, copy, paste with other apps | Policy managed apps with paste-in |
| **Access Requirements** | Work or school account credentials for access | Require |
| **Access Requirements** | PIN for access | Require |
| **Access Requirements** | PIN type | Numeric |
| **Access Requirements** | Simple PIN | Block |
| **Access Requirements** | Select minimum PIN length | 6 |
| **Access Requirements** | Fingerprint/Face ID instead of PIN | Allow |
| **Access Requirements** | Override fingerprint with PIN after timeout | Require |
| **Conditional Launch** | Max PIN attempts | 5; Reset PIN |
| **Conditional Launch** | Offline grace period | 720 minutes |
| **Conditional Launch** | Jailbroken/rooted devices | Block access |
| **Conditional Launch** | Min OS version | iOS 15.0 |
| **iOS-Specific Controls** | Third-party keyboards | Block in work context |
| **iOS-Specific Controls** | Screen capture and Apple AirPrint of work data | Block |
| **iOS-Specific Controls** | Managed pasteboard (Intune-managed clipboard) | Enable |

> **What breaks if misconfigured:** Setting "Send org data to other apps" to "All apps" instead of "Policy managed apps" allows users to share work content into personal app destinations (personal mail, personal messaging, non-managed cloud storage). The result is a Level 2 policy that functionally reverts to a more permissive posture than Level 1 while still being labelled Enhanced. Symptom appears in: no portal-visible symptom (the policy evaluates as "applied"); only visible via audit-log analysis of data-sharing events or end-user reports of unexpected data flow.

> **What breaks if misconfigured:** Setting "Jailbroken/rooted devices" to "Warn" instead of "Block access" allows SDK-integrated apps to continue serving work data on a jailbroken device. Level 2 policy semantics expect data access to be blocked on jailbroken devices — a warn-only posture is a compliance gap for organizations claiming Level 2 compliance. Symptom appears in: Intune admin center (device compliance status remains Compliant if no separate compliance policy blocks jailbreak); device-side symptom is simply continued access.

## Level 3 — Enterprise High Data Protection (Detail)

Level 3 is the strictest preset and targets regulated industries where misconfiguration carries compliance consequences (finance, healthcare, government). Settings that permit personal-app interop in Levels 1 and 2 are blocked here; additional iOS-specific controls (managed keyboard, stricter timeout) are activated. Verify current iOS setting inventory against Microsoft Learn `app-protection-framework` at time of writing.

### iOS Level 3 Setting Inventory

| Setting Category | Setting | Recommended Value |
|------------------|---------|-------------------|
| **Data Transfer** | Send org data to other apps | Policy managed apps (no personal exceptions) |
| **Data Transfer** | Receive data from other apps | Policy managed apps (no personal exceptions) |
| **Data Transfer** | Save copies of org data | Block (no exceptions) |
| **Data Transfer** | Transfer telecommunication data to | None (block work-data-initiated phone calls to personal dialer) |
| **Data Transfer** | Restrict cut, copy, paste with other apps | Blocked (no paste-in from personal clipboard) |
| **Access Requirements** | PIN type | Numeric Complex (no sequential/repeated digits) OR Passcode (alphanumeric) |
| **Access Requirements** | Simple PIN | Block |
| **Access Requirements** | Select minimum PIN length | 8 |
| **Access Requirements** | Allow biometric instead of PIN | Allow (with periodic PIN re-challenge per Override timeout) |
| **Access Requirements** | Override biometric with PIN after timeout | Require (configure short timeout) |
| **Conditional Launch** | Max PIN attempts | 5; Wipe data |
| **Conditional Launch** | Offline grace period | 30 minutes |
| **Conditional Launch** | Jailbroken/rooted devices | Block access + Wipe data |
| **Conditional Launch** | Min OS version | iOS 16.0 (or tenant-specific higher baseline) |
| **Conditional Launch** | Max iOS version allowed | Optional; set to block devices on pre-release iOS builds |
| **Conditional Launch** | Threat protection level | Low |
| **iOS-Specific Controls** | Third-party keyboards | Block always (not just in work context) |
| **iOS-Specific Controls** | Managed pasteboard | Enable (strict — block system-wide paste) |
| **iOS-Specific Controls** | Screen capture and AirPrint of work data | Block |
| **iOS-Specific Controls** | Screen-recording detection | Enable (notify policy action on detection) |

> **What breaks if misconfigured:** Setting "Max PIN attempts" action to "Reset PIN" (Level 2 default) instead of "Wipe data" on a Level 3 policy invalidates the Level 3 compliance posture. Level 3 expects that repeated failed PIN attempts result in wipe of managed app data — a PIN-reset-only response leaves corporate data accessible on devices where PIN brute-force has been attempted. Symptom appears in: no portal-visible symptom on configuration; compliance-audit-time only.

> **What breaks if misconfigured:** Setting "Offline grace period" to a Level 2 default (720 minutes / 12 hours) on a Level 3 policy allows managed apps to remain usable for 12 hours after losing network connectivity to Intune. Level 3 expects strict online-verification of policy state; 30-minute offline grace is the recommended baseline. Symptom appears in: device (managed apps continue working offline longer than policy intent); Intune admin center shows the policy as applied but does not flag the configuration-vs-intent gap.

## iOS-Specific Behaviors

App protection policy enforcement on iOS depends on behaviors and controls specific to the Apple platform. This section covers the iOS-specific integrations and their implications for policy design.

### Intune App SDK Integration

Policy enforcement requires that the managed app has integrated the Intune App SDK. Microsoft-published apps (Outlook, Teams, Edge, Microsoft 365 apps, Authenticator, OneDrive, Loop) ship with SDK integration. Third-party apps require explicit SDK integration by the app developer; without SDK integration, the app cannot be governed by an MAM-WE policy regardless of which policy targets the user. Verify the MAM-capable app list at Microsoft Learn `approved-mam-capable-apps` at time of writing.

### Keyboard Restrictions

Level 2 and Level 3 policies can block third-party keyboards in the work context. On iOS devices, third-party keyboards (for example, SwiftKey, Grammarly keyboard) can intercept keystrokes system-wide if the user grants full-access permission. Blocking third-party keyboards in the work context prevents keystroke exfiltration from managed apps. Level 3 extends this to a system-wide block.

### Clipboard and Copy-Paste Controls

The Intune App SDK on iOS implements a managed clipboard ("managed pasteboard") that isolates cut/copy/paste operations inside managed apps from the system clipboard used by personal apps. Policy settings control:

- **Cut/copy from work to personal** — Blocked by Level 2 and Level 3.
- **Paste from personal to work** — Allowed by Level 2 (via paste-in), blocked by Level 3.
- **Paste-in source filtering** — Level 2 may allow paste-in from personal clipboard; Level 3 requires paste-in source to be policy-managed.

### Managed Open In

iOS enforces a system-level boundary called Managed Open In that governs which apps can open documents from which sources. Intune App Protection settings integrate with Managed Open In to ensure that "Open in..." actions from managed apps route only to other managed apps — a user cannot share a work document from Outlook into a personal app by tapping Open In. This boundary is the iOS-native enforcement mechanism that the Data Transfer policy settings leverage.

### iOS-Version-Dependent Features

Some policy settings require newer iOS versions to enforce correctly. Screen-recording detection, Genmoji/Writing Tools controls, and managed pasteboard enhancements have iOS version minimums. Verify each setting's iOS version requirement against Microsoft Learn at policy-design time; targeting a policy at a device on an iOS version below the setting's minimum may cause the setting to silently no-op.

### Interaction with Device-Level Privacy Features

iOS surfaces user-facing privacy controls (App Tracking Transparency, iCloud Private Relay, Hide My Email, advanced data protection) that the SDK cannot override. A user who enables iCloud Private Relay does not break MAM-WE policy enforcement — the SDK continues to protect managed app data as configured — but apps that depend on IP-origin detection may behave differently. Treat these as device-side variables that MAM-WE policy does not control and cannot disable. For organizations that require these features be disabled, Device Enrollment or User Enrollment (MDM) is required; MAM-WE does not have device-level reach.

### Managed App Configuration (App Config Policies)

Complementing app protection policies, Intune supports **App Configuration Policies** for iOS — a separate policy object that delivers app-specific configuration values (server URLs, tenant identifiers, feature flags) into managed apps. App Configuration policies do not enforce data protection; they pre-configure the app's in-app settings. A complete MAM-WE deployment typically pairs an app protection policy (this guide) with an app configuration policy for apps that support it (Outlook connection-profile pre-population is a common example). Configuration policies are out of scope for this guide but are worth cross-referencing during deployment design.

## Policy Propagation and Conflict Resolution

MAM-WE policy delivery is pull-based from the managed app, not push-based from Intune to the device. The SDK in each managed app performs a policy check-in at app launch and on a periodic in-session cadence. Understanding this cadence is essential for troubleshooting "policy not applied" reports.

### Propagation Timeline

| Event | Typical Latency | What Triggers It |
|-------|-----------------|------------------|
| Policy created or modified in Intune | Immediate (tenant-side only) | Admin saves policy |
| First delivery to a user's managed app | 0-15 minutes after next app launch | User launches or foregrounds the app |
| In-session policy refresh | Every 30 minutes while app is active | SDK internal timer |
| Full re-evaluation on sign-in change | Immediate on account switch | User signs in or signs out of the work account |

If a user has the app open continuously for longer than 30 minutes, policy changes land on the in-session refresh cycle. If the user closes the app, the next launch triggers an immediate re-evaluation.

### Conflict Resolution Rules

When multiple MAM-WE policies target the same user with overlapping app scope, Intune evaluates the policies and applies the most restrictive value per setting. A user in two groups — one assigned a Level 2 policy, another assigned a Level 3 policy — receives a per-setting merge that skews toward Level 3 (stricter wins for most settings). Exceptions:

- **PIN type mismatch** — If one policy specifies Numeric and another specifies Passcode, Passcode wins (stricter).
- **Min OS version mismatch** — The highest specified minimum wins.
- **Offline grace period** — The shortest specified period wins.

The merged result may not match any single configured policy, making conflict resolution a common source of "I configured X but the device shows Y" reports. To avoid this, design policy assignments so that a given user-plus-app pair is targeted by exactly one policy.

### Sign-in and Registration Dependency

For MAM-WE policies to apply, the user MUST sign into the managed app with their Entra work account. Policies do NOT apply based on device identifier or physical device possession — they apply to the Entra identity signed into the SDK-integrated app. A user who installs Outlook but only signs in with a personal Outlook.com account receives no MAM-WE policy on that app. The policy activates immediately when the same user adds their work account to the app.

## Verification

- [ ] Policy appears in **Apps** > **App protection policies** in Intune admin center with the expected assignment groups and Target to mode (unenrolled or enrolled)
- [ ] End user opens a managed app (for example, Outlook) and signs in with their work account — the app prompts for the configured PIN or biometric per policy
- [ ] Attempting to copy/paste from a managed app into a personal app behaves per policy (blocked at Level 2; blocked with no fallback at Level 3)
- [ ] Jailbreak-detection response fires on a jailbroken test device (block access at Level 2; block + wipe at Level 3)
- [ ] Selective wipe can be triggered from **Apps** > **App selective wipe** and succeeds within 30 minutes for an online device

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| App protection policy assigned to a non-MAM-capable app | Intune | Policy shows as assigned but does not apply on device; users see no PIN prompt and no restrictions | iOS L1 runbooks (Phase 30) |
| User not assigned Intune license | Intune / Entra | Managed app signs in with work account but policy does not enforce; no PIN prompt | iOS L1 runbooks (Phase 30) |
| Min OS version gate set higher than tenant device fleet | Intune | Users on older iOS versions are blocked from using managed apps with generic "device does not meet requirements" | iOS L1 runbooks (Phase 30) |
| Offline grace period set too short for typical field use | Intune | Managed apps repeatedly lock out field workers with marginal connectivity; increased help-desk load | iOS L1 runbooks (Phase 30) |
| Conflicting policies target the same user via overlapping groups | Intune | Policy resolution applies unexpected settings; end-user symptom is inconsistent PIN complexity or data-transfer behavior | iOS L1 runbooks (Phase 30) |
| Selective wipe initiated but device offline; wipe stalls | Intune | Wipe shows "Pending" for >24 hours; managed apps on device continue to function until next APNs-triggered launch | iOS L1 runbooks (Phase 30) |
| Jailbroken-device response set to Warn on a Level 3 policy | Intune | Jailbroken devices continue receiving managed app data; compliance posture gap | iOS L1 runbooks (Phase 30) |

## See Also

- Microsoft Learn — [App protection data protection framework](https://learn.microsoft.com/mem/intune/apps/app-protection-framework) — Level 1 complete setting inventory and level-selection guidance
- Microsoft Learn — [How to create and assign app protection policies](https://learn.microsoft.com/mem/intune/apps/app-protection-policies) — step-by-step policy creation in Intune admin center
- Microsoft Learn — [Approved MAM-capable apps](https://learn.microsoft.com/mem/intune/apps/apps-supported-intune-apps) — current list of SDK-integrated apps
- [iOS/iPadOS Admin Setup Overview](00-overview.md) — Optional: path router for all iOS admin setup paths
- [Apple Provisioning Glossary](../_glossary-macos.md) — Managed Apple ID, MAM, and related terms

For related MDM enrollment context (not required to use MAM-WE):

- [Device Enrollment](07-device-enrollment.md) — BYOD enrollment via Intune MDM
- [User Enrollment](08-user-enrollment.md) — Privacy-preserving account-driven enrollment

---
*Previous: [User Enrollment](08-user-enrollment.md) | [Back to Overview](00-overview.md)*

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Initial version — iOS MAM-WE app protection policies standalone guide covering three-level data protection framework, dual-targeting, selective wipe, and iOS-specific behaviors | -- |
