---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: ADE
audience: admin
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS ADE configuration via Apple Business Manager and Intune.
> For macOS compliance policy, see [macOS Compliance Policies](../admin-setup-macos/05-compliance-policy.md).
> For iOS/iPadOS enrollment terminology, see the [Apple Provisioning Glossary](../_glossary-macos.md).
> Portal navigation may vary by Intune admin center version. See [Overview](00-overview.md#portal-navigation-note) for details.

# iOS/iPadOS Compliance Policies

Compliance policies DETECT non-compliance and report status to Intune and Conditional Access. Configuration profiles ENFORCE settings and prevent user deviation. Unlike Windows, Intune has no security baselines for iOS/iPadOS — admins must configure compliance manually. This guide covers the required compliance settings (OS version gates, jailbreak detection, passcode requirements) plus iOS-specific behavior around Actions for Noncompliance and Conditional Access timing. A dedicated section below answers the question of what happens to CA access state in the window between enrollment completion and first compliance evaluation — the question can be answered from this guide alone without following cross-references.

## Compliance vs. Configuration: Critical Distinction

Compliance policies DETECT non-compliance and report status. Configuration profiles ENFORCE settings and prevent user deviation. Most iOS compliance settings have no paired "enforce via config profile" equivalent — iOS relies on App Store curation, OS integrity, and Apple-signed restrictions rather than MDM-enforced low-level controls. The four most commonly-paired settings are:

| Action | Compliance Policy | Configuration Profile |
|--------|------------------|----------------------|
| Verify device is not jailbroken | Yes (Jailbroken devices = Block) | N/A — iOS has no MDM-enforceable anti-jailbreak primitive; Apple's code signing and Secure Enclave are the enforcement mechanism |
| Verify OS version meets minimum | Yes (Minimum OS version) | Partial — software update policies under **Devices > Apple updates > iOS/iPadOS update policies** can enforce upgrades (DDM-based on iOS 17+) |
| Verify passcode meets requirements | Yes (Password settings) | Yes — passcode requirements in configuration profile (Settings Catalog > Restrictions or Passcode) enforce the rules at passcode-change time |
| Verify restricted apps are not installed | Yes (Restricted apps by Bundle ID) | Partial — "Block App Store" and "Block installing apps" in configuration profile (supervised-only) prevent the install in the first place |

> **What breaks if misconfigured:** If compliance policies are deployed without corresponding configuration profiles (where pairing is possible), devices will be marked non-compliant but nothing prevents the user from changing settings. For passcode requirements specifically, changes to the compliance setting do NOT take effect until the user next changes their passcode — the device may show as compliant with the old passcode until then. Symptom appears in: Intune admin center (devices non-compliant) and on device (Conditional Access blocks access if CA policies are active).

## Prerequisites

- Intune Administrator role
- Devices enrolled in Intune (any path: ADE, Device Enrollment, User Enrollment, or MAM-WE)
- Understanding that compliance detects; configuration enforces (see [Configuration Profiles](04-configuration-profiles.md))
- Conditional Access policies configured (if compliance status should gate access to corporate resources)
- APNs certificate active and valid — compliance check-in on iOS/iPadOS depends on APNs; an expired certificate breaks compliance re-evaluation for all managed iOS/iPadOS devices (see [APNs Certificate](01-apns-certificate.md))
- Default compliance posture toggle reviewed before deployment (**Endpoint security** > **Device compliance** > **Compliance policy settings** > **Mark devices with no compliance policy assigned as**) — this single tenant-wide setting determines CA behavior for all devices not yet evaluated, including newly enrolled devices in the 0-30 minute window after enrollment

## Steps

### Step 1: Create Compliance Policy

#### In Intune admin center

1. Navigate to **Devices** > **Manage devices** > **Compliance** > **Create policy**.
2. Platform: **iOS/iPadOS**.
3. Enter policy name and description.

Before assigning compliance policies, review the **default compliance posture** toggle at **Endpoint security** > **Device compliance** > **Compliance policy settings** > **Mark devices with no compliance policy assigned as**:

- **Compliant** (Intune default) — Permissive. Devices without an assigned policy and devices in the "Not evaluated" state are treated as compliant. CA "Require compliant device" grants access.
- **Not compliant** — Restrictive. Devices without an assigned policy and devices in "Not evaluated" state are treated as non-compliant. CA "Require compliant device" blocks access.

This toggle is the single most impactful setting for Day 1 device experience and interacts directly with Conditional Access timing behavior described in [Compliance Evaluation Timing and Conditional Access](#compliance-evaluation-timing-and-conditional-access).

> **What breaks if misconfigured:** Leaving the toggle at "Compliant" (the default) in a high-security environment means unmanaged devices and devices without assigned compliance policies are treated as compliant — CA's "Require compliant device" grants them access. Conversely, setting the toggle to "Not compliant" without a configured grace period means users are blocked from CA-protected resources for the 0-30 minutes between enrollment completion and first compliance evaluation — common help-desk complaint pattern during rollouts. Symptom appears in: device (Outlook/SharePoint/Teams shows access denied immediately after enrollment) and Intune admin center (device shows "Not evaluated" state).

### Step 2: Configure Compliance Settings

**Email:**

- **Unable to set up email on the device**: Not configured / Require (flags device non-compliant if user has set up a competing email account Intune cannot manage; requires a managed email profile present via configuration profile)

> **What breaks if misconfigured:** If "Unable to set up email on the device" is set to Require without a managed email configuration profile deployed, the device will always be flagged non-compliant — there is no system email profile to detect. Deploy an email configuration profile (Settings Catalog > Mail > Account) before enabling this compliance setting. Symptom appears in: Intune admin center (all devices non-compliant for email setting despite no user-configured email conflict) and device (CA blocks access until email profile is present).

**Device Health:**

- **Jailbroken devices** (iOS 8.0+): Not configured / **Block** (recommended for corporate fleets)

> **What breaks if misconfigured:** Leaving jailbroken detection at "Not configured" allows known jailbroken/rooted devices to be treated as compliant — these devices can bypass app sandboxing, extract protected data, and are classified as high risk by Apple Platform Security. Symptom appears in: Intune admin center (compliance reports show known-jailbroken serial numbers as compliant) and risk exposure (data exfiltration paths open on rooted devices).

- **Require device to be at or under Device Threat Level** (optional, requires MDE or Mobile Threat Defense connector): Not configured / Secured / Low / Medium / High

**Device Properties (Operating System Version):**

- **Minimum OS version** (iOS 8.0+)
- **Maximum OS version**
- **Minimum OS build version** — supports Apple Rapid Security Response build strings like `20E772520a`
- **Maximum OS build version**

> **What breaks if misconfigured:** Setting a Minimum OS version ahead of the latest Apple release marks the entire fleet non-compliant with no remediation path until Apple ships the required version — users cannot manually "update to a release that does not exist yet." Symptom appears in: Intune admin center (entire fleet non-compliant) and device (update available prompts with no eligible update). Mitigation: always set Minimum OS to the version Apple currently ships; update it after testing each point release.

**Microsoft Defender for Endpoint (optional):**

- **Require the device to be at or under the machine risk score**: Not configured / Clear / Low / Medium / High

**System Security — Password:**

- Require a password to unlock mobile devices: Not configured / Require
- Simple passwords (blocks 1234, 1111): Not configured / Block
- Minimum password length (digits)
- Required password type: Not configured / Alphanumeric / Numeric
- Number of non-alphanumeric characters
- Maximum minutes after screen lock before password is required
- Maximum minutes of inactivity until screen locks
- Password expiration (days)
- Number of previous passwords to prevent reuse

> **What breaks if misconfigured:** When password requirements change, the NEW requirement does not take effect on already-enrolled devices until the user next changes their passcode. The device remains compliant with the old passcode until then. This means there is a window where the device technically meets the old policy but not the new one. Symptom appears in: Intune admin center (device shows compliant despite not meeting new password requirements). Mitigation: pair compliance password settings with a forced passcode change via configuration profile Passcode settings to close the window.

**System Security — Device Security:**

- **Restricted apps** — list by Bundle ID; marks device non-compliant if listed unmanaged apps are installed

The Restricted apps compliance setting checks for the presence of specific apps by Bundle ID. An app is treated as "restricted" only if it is installed as an **unmanaged** app — apps deployed through Intune (VPP or LOB) are not flagged even if they share the same Bundle ID. This distinction matters when an admin wants to prevent a consumer-side-loaded version of an app that is also centrally deployed through VPP.

To find an app's Bundle ID: search the Apple App Store web listing for the app — the Bundle ID appears in the URL (`https://apps.apple.com/us/app/APP-NAME/id<id>`) — or use a third-party lookup tool. Bundle IDs are case-sensitive.

> **What breaks if misconfigured:** Typos in a Bundle ID (e.g., `com.twitter.twitter` vs `com.atebits.Tweetie2` for X/Twitter after rename) cause the compliance check to silently pass regardless of actual installed apps. Symptom appears in: Intune admin center (restricted-apps compliance passes for all devices despite app being present). Verify Bundle IDs against the App Store listing before deploying. Note that app publishers can rename their Bundle ID after acquisition — review the list during each major iOS update cycle.

#### Notification Message Templates for Send Email Action

Before configuring the Send email action in Step 3, create a notification message template:

1. Navigate to **Endpoint security** > **Device compliance** > **Notifications**.
2. Select **Create notification**.
3. Enter a subject and body using supported variables: `{{UserName}}`, `{{DeviceName}}`, `{{DeviceId}}`, `{{OSAndVersion}}`.
4. Save the template — it becomes available when configuring the Send email action in the compliance policy.

### Step 3: Configure Actions for Noncompliance

When a device is found non-compliant, Intune can trigger one or more actions. The **Mark device non-compliant** action is created automatically on every compliance policy and cannot be removed — it is the action that activates Conditional Access blocking. Setting its schedule greater than 0 days creates a grace period before CA begins blocking.

| Action | Schedule unit | iOS-specific notes |
|--------|--------------|--------------------|
| **Mark device non-compliant** | Days (0-365) | Default action; cannot be removed. Setting > 0 days creates a grace period. |
| **Send email to end user** | Days | Uses notification message template; supports variables `{{UserName}}`, `{{DeviceName}}`, `{{DeviceId}}`, `{{OSAndVersion}}`. Delivery within 6 hours. |
| **Remotely lock the noncompliant device** | Days | Supported on iOS/iPadOS; user sees PIN/passcode prompt to unlock. |
| **Add device to retire list** | Days | iOS retire removes company data and unenrolls the device (selective wipe of corporate data). There is no full-device-wipe compliance action — full wipe is a separate device action. |
| **Send push notification to end user** | Days | Delivered via Company Portal or Intune app; **delivery is not guaranteed** and may be delayed hours. |

Schedule granularity via the admin center UI is whole days only (0, 1, 2, ...). The Graph API supports decimal values (0.25 = 6 hours, 0.5 = 12 hours), but the admin-center minimum grace period is 1 full day.

> **What breaks if misconfigured:** Setting Mark-device-non-compliant schedule to 0 days combined with a Retire action at 1 day means a newly-enrolled device hitting the "Not evaluated" compliance state gap (see [Compliance Evaluation Timing and Conditional Access](#compliance-evaluation-timing-and-conditional-access)) can be retired before the admin has time to intervene if the default compliance posture is set to "Not compliant." Mitigation: use a grace period of at least 1 day and verify default compliance posture behavior before deploying Retire actions. Symptom appears in: Intune admin center (devices retired within 24 hours of enrollment with no human review).

### Step 4: Assign Policy

1. In the policy's **Assignments** page, choose **Included groups** (user groups or device groups).
2. Optionally choose **Excluded groups** for devices that should be exempt.
3. Review and create.

User-group-assigned policies apply to every device the user signs into. Device-group-assigned policies apply regardless of user. For corporate-owned ADE devices, device-group assignment is typical.

After assignment, allow up to 30 minutes for the policy to reach devices. Compliance evaluation begins at the next APNs-triggered check-in. To confirm delivery, navigate to **Devices** > **All devices** > **[device name]** > **Device compliance** and verify the policy appears in the list with a state of "Not evaluated" (expected during the 0-30 minute post-enrollment window) or "Compliant"/"Non-compliant" after first evaluation.

> **What breaks if misconfigured:** If multiple compliance policies are assigned to the same device with conflicting requirements (e.g., two policies with different minimum OS versions), Intune evaluates all assigned policies and the device must satisfy all of them to be considered compliant. The device shows as non-compliant if it fails any single policy. Review assignment scope overlap in **Devices** > **Manage devices** > **Compliance** > **[policy name]** > **Device status** to identify which policy is causing non-compliance. Symptom appears in: Intune admin center (device non-compliant but the failing policy is not the one the admin expects).

## Compliance Evaluation Timing and Conditional Access

Compliance evaluation does not happen instantly after enrollment. During the window between enrollment completion and the first compliance evaluation — typically 0-30 minutes — a device's compliance state is "Not evaluated." How Conditional Access treats devices in this state is governed by a single Intune tenant setting: the **default compliance posture toggle**. This section documents the timing sequence, the toggle's behavior in the gap, and iOS-specific considerations.

### Compliance State Timeline Post-Enrollment

| Time after enrollment | Compliance state | What is happening | Conditional Access behavior |
|-----------------------|------------------|-------------------|------------------------------|
| T+0 min | Managed, no compliance record | Device has just completed enrollment; Intune has not yet evaluated it | Determined by the **default compliance posture toggle** (see below) |
| T+0-15 min | Not evaluated | Compliance check scheduled; Intune is collecting device inventory over APNs | Same as T+0 — determined by the default compliance posture toggle |
| T+15-30 min | Compliant or Non-compliant | First compliance evaluation completes | CA "Require compliant device" now evaluates against the actual state |
| T+up to 8 hr | Compliant or Non-compliant (state stable) | Full Intune inventory sync (apps, hardware, restricted apps check) | No change unless inventory reveals a new violation |
| Ongoing | Re-evaluated on 8-hour check-in cycle | Automatic check-in via APNs; policy changes propagate on next cycle | Updated continuously; users can force sync immediately via Company Portal > Sync |

### Default Compliance Posture Toggle

**Location in Intune admin center:** **Endpoint security** > **Device compliance** > **Compliance policy settings** > **Mark devices with no compliance policy assigned as**.

This setting has exactly two values, and its interpretation applies to both (a) devices without any compliance policy assigned and (b) devices in the "Not evaluated" transient state during the 0-30 minute post-enrollment window:

- **Compliant (Intune default)** — Permissive. Devices without assigned policy and devices in Not-evaluated state are treated as **compliant**. Conditional Access "Require compliant device" grants access during the gap. Recommended for rollout environments where enrollment friction is a concern and the fleet-level risk from the 0-30 minute window is acceptable.
- **Not compliant** — Restrictive. Devices without assigned policy and devices in Not-evaluated state are treated as **non-compliant**. Conditional Access "Require compliant device" blocks access during the gap. Recommended for regulated / high-security environments where any unmanaged device contact with corporate resources is unacceptable — but requires user-communication and grace-period planning to avoid help-desk escalations during rollout.

### What Happens in the 0-30 Minute Gap

The answer depends entirely on the toggle:

- **Toggle = Compliant (default):** The user completes enrollment, reaches the home screen, opens Outlook or Teams, and sign-in succeeds. CA sees the device as compliant because no policy has evaluated it yet; access is granted. If a policy later evaluates to Non-compliant, CA blocks access going forward — but the 0-30 minute window provided transparent access.
- **Toggle = Not compliant:** The user completes enrollment, reaches the home screen, opens Outlook or Teams, and sign-in **fails** with a "Your device does not meet your organization's policy" message. The user waits 0-30 minutes for the first compliance evaluation to complete (or triggers **Company Portal > Sync** manually). If the device is compliant, access is then granted; if non-compliant, the user sees a remediation screen with links to the specific failing setting.

### iOS-Specific Timing Considerations

- **APNs dependency:** iOS compliance check-in is initiated by Apple Push Notification service, not by a polling schedule. If APNs is blocked at the network edge (firewall, proxy, captive portal) the 0-15 minute evaluation can stall indefinitely. Verify APNs endpoint reachability if the Not-evaluated state persists beyond 30 minutes. See [APNs Certificate](01-apns-certificate.md).
- **No MDM diagnostic tool on iOS:** Unlike Windows, iOS has no `mdmdiagnosticstool.exe` equivalent. L2 diagnosis of a stuck compliance state uses [iOS Log Collection](../l2-runbooks/14-ios-log-collection.md) (three methods: MDM diagnostic report, Company Portal upload, Mac+cable sysdiagnose) followed by [Compliance & CA Timing Investigation](../l2-runbooks/17-ios-compliance-ca-timing.md).
- **Setup Assistant CA interaction:** For ADE enrollments using Setup Assistant with modern authentication, CA evaluation occurs during Setup Assistant sign-in, before enrollment completes. If a CA policy requires a compliant device AND the "Microsoft Intune Enrollment" cloud app is not excluded from that policy, the device cannot complete Setup Assistant. The "Microsoft Intune Enrollment" cloud app is excluded by default across platforms — verify the exclusion remains in place before adjusting CA policies.
- **User can force re-sync:** On the device, **Settings** > **General** > **VPN & Device Management** > [management profile] > **Sync** triggers an immediate MDM check-in. Alternatively, users can use Company Portal > **Settings** > **Sync**. This is the only user-actionable escalation path from a stuck Not-evaluated state.

### Default Compliance Posture Decision Summary

| Organizational profile | Recommended toggle | Rationale |
|------------------------|---------------------|-----------|
| Rolling out ADE to an existing fleet | **Compliant** (default) | Reduces help-desk tickets during rollout; 0-30 min exposure window accepted as transient |
| Regulated industry / high-security | **Not compliant** | Blocks unmanaged devices from CA-protected resources even transiently; plan user communication for the 0-30 minute gap |
| Mixed fleet with sensitive subset | **Not compliant** + per-app CA policies with explicit compliance-bypass groups | Granular control with documented exceptions |

### Cross-References for Deep-Dive Content

The timing sequence and mitigation patterns above are sufficient to determine CA behavior during the 0-30 minute window for any iOS enrollment path. For cross-platform timing mechanics, edge cases (e.g., sync failures, Ongoing-state stuck conditions), and the full Windows/macOS/iOS chicken-and-egg enrollment-vs-CA analysis, see:

- [Compliance Policy Timing](../reference/compliance-timing.md) — cross-platform timing state transitions, state definitions, 8-hour sync cycle, grace period configuration
- [Conditional Access Enrollment Timing](../reference/ca-enrollment-timing.md) — chicken-and-egg problem, "Microsoft Intune Enrollment" cloud app exclusion, platform-specific resolution patterns

## Verification

- [ ] Compliance policy appears under Devices > Manage devices > Compliance with assigned device count
- [ ] Device compliance status visible at Devices > All devices > [device] > **Device compliance** tab
- [ ] Non-compliant devices show specific failing settings (not just "non-compliant") — click the failing setting for remediation guidance
- [ ] Grace period under Mark device non-compliant matches organizational policy (> 0 days recommended for rollout)
- [ ] Default compliance posture toggle (Mark devices with no compliance policy assigned as) matches organizational security posture — default Compliant for rollout, Not compliant for regulated environments
- [ ] Conditional Access policies using "Require compliant device" grant control enumerate the devices this compliance policy targets
- [ ] Newly-enrolled test device transitions from Not evaluated to Compliant within 30 minutes (APNs reachable)
- [ ] Jailbroken detection is set to Block (not "Not configured") for corporate-fleet compliance policies

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| Minimum OS version set ahead of latest Apple release | Intune | Entire fleet non-compliant until Apple ships the required version | iOS L1 runbooks (Phase 30) |
| Jailbroken detection left at "Not configured" | Intune | Known jailbroken devices treated as compliant; data exfiltration risk open | iOS L1 runbooks (Phase 30) |
| Password compliance changed on already-enrolled fleet | Intune | Device remains compliant with old passcode until user next changes passcode | iOS L1 runbooks (Phase 30) |
| Restricted apps list contains Bundle ID typo | Intune | Compliance check silently passes regardless of installed apps | iOS L1 runbooks (Phase 30) |
| Mark device non-compliant = 0 days with Retire action = 1 day | Intune | Devices retired within 24 hours during Not-evaluated gap; no time for admin intervention | iOS L1 runbooks (Phase 30) |
| Default compliance posture = "Not compliant" without grace period | Intune | Users blocked from CA-protected resources 0-30 min post-enrollment; help desk escalations during rollout | iOS L1 runbooks (Phase 30) |
| Default compliance posture = "Compliant" in high-security environment | Intune | Unmanaged devices and "Not evaluated" devices granted CA access; audit finding | iOS L1 runbooks (Phase 30) |
| APNs blocked at network edge | Intune | Compliance state stuck at "Not evaluated" indefinitely; CA behavior depends on default posture toggle | iOS L1 runbooks (Phase 30) |
| CA "Require compliant device" without "Microsoft Intune Enrollment" cloud app exclusion | Entra | ADE Setup Assistant cannot complete sign-in; chicken-and-egg enrollment block | iOS L1 runbooks (Phase 30) |
| Compliance policy assigned with no corresponding configuration profile where pairing is possible (e.g., passcode) | Intune | Devices marked non-compliant but no enforcement mechanism present | iOS L1 runbooks (Phase 30) |

## See Also

- [Configuration Profiles](04-configuration-profiles.md) — enforcement counterpart to compliance detection
- [App Deployment](05-app-deployment.md) — managed app status and Restricted apps compliance
- [ADE Enrollment Profile](03-ade-enrollment-profile.md)
- [APNs Certificate](01-apns-certificate.md) — APNs is required for iOS compliance check-in
- [iOS/iPadOS Admin Setup Overview](00-overview.md)
- [iOS/iPadOS Enrollment Path Overview](../ios-lifecycle/00-enrollment-overview.md)
- [iOS/iPadOS ADE Lifecycle](../ios-lifecycle/01-ade-lifecycle.md)
- [Compliance Policy Timing](../reference/compliance-timing.md) — cross-platform timing mechanics deep-dive
- [Conditional Access Enrollment Timing](../reference/ca-enrollment-timing.md) — chicken-and-egg problem deep-dive
- [macOS Compliance Policies](../admin-setup-macos/05-compliance-policy.md) — parallel macOS guide (note: macOS has no dedicated CA timing section; iOS added it per ACFG-03 SC #4)
- [Apple Provisioning Glossary](../_glossary-macos.md)

---
*Previous: [App Deployment](05-app-deployment.md) | [Back to Overview](00-overview.md)*

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Resolved Phase 31 L2 cross-references (D-23 prose rewrite) | -- |
| 2026-04-16 | Initial version — iOS/iPadOS compliance policy guide with simplified Compliance vs. Configuration table, per-setting What-breaks callouts (jailbreak detection, OS version, passcode, restricted apps), iOS-specific Actions for Noncompliance behaviors, and dedicated Compliance Evaluation Timing and Conditional Access section covering default posture toggle, 0-30 min gap behavior, and iOS APNs considerations (answers SC #4 from the guide alone) | -- |

<!-- Review scheduled: 2026-07-15. Verify against Microsoft Learn iOS/iPadOS compliance policy reference for any new settings added in iOS 18/19. Confirm DDM software update boundary remains as documented (iOS 17+). -->
