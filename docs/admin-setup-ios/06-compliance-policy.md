---
last_verified: 2026-04-16
review_by: 2026-07-15
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

> **What breaks if misconfigured:** Typos in a Bundle ID (e.g., `com.twitter.twitter` vs `com.atebits.Tweetie2` for X/Twitter after rename) cause the compliance check to silently pass regardless of actual installed apps. Symptom appears in: Intune admin center (restricted-apps compliance passes for all devices despite app being present).

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
