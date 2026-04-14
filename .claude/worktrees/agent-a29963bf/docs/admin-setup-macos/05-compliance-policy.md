---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: ADE
audience: admin
platform: macOS
---

> **Platform gate:** This guide covers macOS ADE configuration via Apple Business Manager and Intune.
> For Windows Autopilot setup, see [Windows Admin Setup Guides](../admin-setup-apv1/00-overview.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).

# macOS Compliance Policies

> **No Intune security baselines for macOS.** Intune security baselines are available only for Windows (Windows 10/11, Microsoft Defender for Endpoint, Microsoft Edge, Microsoft 365 Apps, HoloLens 2, Windows 365). macOS has zero security baselines. Admins must configure macOS security settings manually via a combination of compliance policies (detect non-compliance) and configuration profiles (enforce settings). See [Configuration Profiles](03-configuration-profiles.md) for enforcement.

## Compliance vs. Configuration: Critical Distinction

Compliance policies **detect** non-compliance. Configuration profiles **enforce** settings. Deploying a compliance policy without a corresponding configuration profile means devices will be flagged but nothing prevents the user from changing the setting.

| Action | Compliance Policy | Configuration Profile |
|--------|------------------|----------------------|
| Verify FileVault enabled | Yes | Yes (also enforces it) |
| Verify firewall enabled | Yes | Yes (also configures it) |
| Verify Gatekeeper setting | Yes | Yes (also locks it) |
| Enforce SIP | No (compliance check only) | SIP cannot be enforced via MDM -- read-only |
| Enforce encryption | No | Yes (Settings Catalog > Full Disk Encryption) |

> **What breaks if misconfigured:** If compliance policies are deployed WITHOUT corresponding configuration profiles, devices will be marked non-compliant but nothing enforces the settings. Users can change settings freely, and Conditional Access may block access unexpectedly. Symptom appears in: Intune admin center (devices non-compliant) and on device (Conditional Access blocks user if CA policies are active, but the user does not understand why).
> See: [Troubleshooting Runbook](TBD - Phase 24)

## Prerequisites

- Intune Administrator role
- Devices enrolled via ADE (see [ABM Configuration](01-abm-configuration.md) and [Enrollment Profile](02-enrollment-profile.md))
- Configuration profiles deployed for settings you want to enforce (see [Configuration Profiles](03-configuration-profiles.md))
- Understanding that compliance policies DETECT; configuration profiles ENFORCE

## Steps

### Step 1: Create Compliance Policy

#### In Intune admin center

1. Navigate to **Devices** > **Manage devices** > **Compliance** > **Create policy**.
2. Platform: **macOS**.
3. Enter a policy name and description.

### Step 2: Configure Compliance Settings

Configure settings by category. Each setting checks the device's current state and reports compliance or non-compliance to Intune.

---

#### Device Health

**Require System Integrity Protection (SIP):** Not configured / Require

> **What breaks if misconfigured:** SIP is a compliance-check-only setting. MDM CANNOT enable or disable SIP -- it is controlled only by booting to Recovery Mode and running `csrutil enable` or `csrutil disable`. The compliance policy only detects whether SIP is enabled or disabled. If SIP is required and disabled on a device, the device is non-compliant with no automated remediation. The user (or technician) must physically boot to Recovery Mode and run `csrutil enable`. Symptom appears in: Intune admin center (non-compliant status with "System Integrity Protection disabled" reason).
> See: [Troubleshooting Runbook](TBD - Phase 24)

---

#### Device Properties

| Setting | Purpose |
|---------|---------|
| Minimum OS version | Reject devices below a specific macOS version |
| Maximum OS version | Reject devices above a specific macOS version |
| Minimum OS build version | Supports Apple Rapid Security Response build strings (e.g., 14.4.1 (a)) |
| Maximum OS build version | Upper bound on build version |

> **What breaks if misconfigured:** OS version requirements that are ahead of the latest available macOS update will mark ALL devices non-compliant with no remediation path until Apple releases the update. This can affect the entire fleet simultaneously. Symptom appears in: Intune admin center (all macOS devices non-compliant for OS version).
> See: [Troubleshooting Runbook](TBD - Phase 24)

---

#### System Security -- Password

| Setting | Purpose | Values |
|---------|---------|--------|
| Require a password | Require device login password | Not configured / Require |
| Simple passwords | Allow simple patterns (e.g., 1234) | Not configured / Block |
| Minimum password length | Minimum character count | 4-16 |
| Password type | Character requirements | Numeric / Alphanumeric |
| Number of non-alphanumeric characters | Special character requirement | 0-4 |
| Maximum minutes of inactivity before password required | Screen lock timeout | 1-60 minutes |
| Password expiration (days) | Force password change interval | 1-730 days |
| Number of previous passwords to prevent reuse | History requirement | 1-24 |

> **What breaks if misconfigured:** When password requirements change, the new requirement does NOT take effect until the next time the user changes their password. The device remains compliant with the old password until then. This creates a window where the device technically meets the old policy but not the new one -- and the device reports as compliant during this window. Symptom appears in: Intune admin center (device may show compliant despite not meeting new password requirements until user changes password).
> See: [Troubleshooting Runbook](TBD - Phase 24)

---

#### System Security -- Encryption

**Require encryption of data storage on device:** Not configured / Require

This setting checks whether FileVault is enabled. It does NOT enable FileVault -- that requires a configuration profile.

> Pair with FileVault configuration profile to enforce encryption. See [Configuration Profiles > FileVault](03-configuration-profiles.md#filevault-disk-encryption).

---

#### System Security -- Device Security (Firewall)

| Setting | Purpose | Values |
|---------|---------|--------|
| Firewall | Application firewall enabled | Not configured / Enable |
| Incoming connections | Block non-essential incoming connections | Not configured / Block |
| Stealth Mode | Device does not respond to probe requests | Not configured / Enable |

> Pair with firewall configuration profile to enforce these settings. See [Configuration Profiles > Firewall](03-configuration-profiles.md#firewall).

---

#### Gatekeeper

**Allow apps downloaded from:** Not configured / Mac App Store / Mac App Store and identified developers / Anywhere

> **What breaks if misconfigured:** The compliance policy checks the current Gatekeeper setting but does NOT enforce it. A configuration profile (Settings Catalog > System Policy) is required to prevent users from changing the setting. Without the configuration profile, if the compliance policy is set to "Mac App Store" and a user overrides Gatekeeper to "Anywhere," the device becomes non-compliant immediately. Symptom appears in: Intune admin center (non-compliant for Gatekeeper) and device (Conditional Access blocks access if CA policy is active).
> See: [Troubleshooting Runbook](TBD - Phase 24)

### Step 3: Configure Actions for Noncompliance

After configuring compliance settings, define what happens when a device is non-compliant:

| Action | Purpose | Timing |
|--------|---------|--------|
| Mark device noncompliant | Device reported as non-compliant in Intune | Immediately or after grace period (days) |
| Send email to end user | Notify user of non-compliance | Configurable schedule |
| Remotely lock the noncompliant device | Lock device requiring password to unlock | After specified days |
| Retire the noncompliant device | Remove corporate data from device | After specified days |

> **Recommendation:** Configure a grace period (3-7 days) before marking devices non-compliant. This allows time for configuration profiles to apply after enrollment and avoids marking newly enrolled devices as immediately non-compliant.

### Step 4: Assign Policy

Assign the compliance policy to device groups or user groups. Device group assignment evaluates compliance on all devices in the group. User group assignment evaluates compliance on all devices owned by users in the group.

## Conditional Access Cross-Reference

> For macOS-specific Conditional Access enrollment timing considerations (the chicken-and-egg problem where devices are non-compliant during enrollment because compliance policies evaluate before configuration profiles have fully applied), see [Conditional Access Enrollment Timing](../reference/ca-enrollment-timing.md). This is a cross-platform issue documented in detail with Windows and macOS resolution patterns.

## Verification

- [ ] Compliance policy shows assigned devices in Intune admin center at Devices > Compliance > [policy] > Device status
- [ ] Device compliance status visible at Devices > [device] > Compliance
- [ ] Non-compliant devices show specific failing settings (not just "Non-compliant" -- the individual setting causing the failure is listed)
- [ ] Grace period configured matches organizational policy
- [ ] Each compliance setting has a corresponding configuration profile enforcing it (except SIP, which is compliance-check-only)

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| Compliance policy without enforcement config profile | Intune | Devices non-compliant but settings not enforced; users can change freely | [TBD - Phase 24] |
| SIP required but disabled on device | Intune | Non-compliant with no MDM remediation; user must boot to Recovery Mode | [TBD - Phase 24] |
| OS version requirement ahead of available update | Intune | Entire fleet non-compliant until Apple releases update | [TBD - Phase 24] |
| Password change timing gap | Intune | Device appears compliant with old password until user changes it | [TBD - Phase 24] |
| Gatekeeper compliance without config profile | Intune | Users can override Gatekeeper; compliance detects but cannot prevent | [TBD - Phase 24] |

## See Also

- [Configuration Profiles](03-configuration-profiles.md) -- enforcement counterpart to compliance detection
- [ABM Configuration](01-abm-configuration.md)
- [Enrollment Profile](02-enrollment-profile.md)
- [Conditional Access Enrollment Timing](../reference/ca-enrollment-timing.md) -- WSEC-01 cross-reference
- [Capability Matrix](../reference/macos-capability-matrix.md)
- [macOS ADE Lifecycle Overview](../macos-lifecycle/00-ade-lifecycle.md)
- [macOS Provisioning Glossary](../_glossary-macos.md)
