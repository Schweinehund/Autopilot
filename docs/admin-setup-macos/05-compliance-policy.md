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

| Action | Compliance Policy | Configuration Profile |
|--------|------------------|----------------------|
| Verify FileVault enabled | Yes | Yes (also enforces it) |
| Verify firewall enabled | Yes | Yes (also configures it) |
| Verify Gatekeeper setting | Yes | Yes (also locks it) |
| Enforce SIP | No (compliance check only) | SIP cannot be enforced via MDM -- read-only |
| Enforce encryption | No | Yes (Settings Catalog > Full Disk Encryption) |

> **What breaks if misconfigured:** If compliance policies are deployed WITHOUT corresponding configuration profiles, devices will be marked non-compliant but nothing enforces the settings. Users can change settings freely, and Conditional Access may block access. Symptom appears in: Intune admin center (devices non-compliant) and on device (Conditional Access blocks user if CA policies are active).
> See: [Compliance / Access Blocked](../l1-runbooks/14-macos-compliance-access-blocked.md)

## Prerequisites

- Intune Administrator role
- Devices enrolled via ADE
- Configuration profiles deployed for settings you want to enforce (see [Configuration Profiles](03-configuration-profiles.md))
- Understanding that compliance policies DETECT; configuration profiles ENFORCE

## Steps

### Step 1: Create Compliance Policy

#### In Intune admin center

1. Navigate to **Devices** > **Manage devices** > **Compliance** > **Create policy**.
2. Platform: **macOS**.
3. Enter a policy name and description.

### Step 2: Configure Compliance Settings

**Device Health:**

- **Require System Integrity Protection (SIP):** Not configured / Require

> **What breaks if misconfigured:** SIP is a compliance-check-only setting. MDM CANNOT enable or disable SIP -- it is controlled only by booting to Recovery Mode. If required and SIP is disabled, the device is non-compliant with no automated remediation. User must boot to Recovery Mode and run `csrutil enable`. Symptom appears in: Intune admin center (non-compliant status with "SIP disabled" reason).
> See: [Compliance / Access Blocked](../l1-runbooks/14-macos-compliance-access-blocked.md)

**Device Properties:**

- Minimum OS version
- Maximum OS version
- Minimum OS build version (supports Apple Rapid Security Response build strings)
- Maximum OS build version

> **What breaks if misconfigured:** OS version requirements that are ahead of the latest available macOS update will mark ALL devices non-compliant with no remediation path until Apple releases the update. Symptom appears in: Intune admin center (entire fleet non-compliant).
> See: [Compliance / Access Blocked](../l1-runbooks/14-macos-compliance-access-blocked.md)

**System Security -- Password:**

- Require a password: Not configured / Require
- Simple passwords: Not configured / Block
- Minimum password length
- Password type: Numeric / Alphanumeric
- Number of non-alphanumeric characters
- Maximum minutes of inactivity before password required
- Password expiration (days)
- Number of previous passwords to prevent reuse

> **What breaks if misconfigured:** When password requirements change, the new requirement does NOT take effect until the next time the user changes their password. The device remains compliant with the old password until then. This means there is a window where the device technically meets the old policy but not the new one. Symptom appears in: Intune admin center (device may show compliant despite not meeting new password requirements until user changes password).
> See: [Compliance / Access Blocked](../l1-runbooks/14-macos-compliance-access-blocked.md)

**System Security -- Encryption:**

- Require encryption of data storage on device: Not configured / Require (checks FileVault status)

> Pair with FileVault configuration profile to enforce. See [Configuration Profiles > FileVault](03-configuration-profiles.md#filevault-disk-encryption).

**System Security -- Device Security (Firewall):**

- Firewall: Not configured / Enable
- Incoming connections: Not configured / Block
- Stealth Mode: Not configured / Enable

> Pair with firewall configuration profile to enforce. See [Configuration Profiles > Firewall](03-configuration-profiles.md#firewall).

**Gatekeeper:**

- Allow apps downloaded from: Not configured / Mac App Store / Mac App Store and identified developers / Anywhere

> **What breaks if misconfigured:** Compliance policy checks current Gatekeeper setting but does NOT enforce it. A configuration profile (Settings Catalog > System Policy) is required to prevent users from changing the setting. If set to "Mac App Store" and user overrides to "Anywhere" without a config profile enforcing it, device becomes non-compliant immediately. Symptom appears in: Intune admin center (non-compliant for Gatekeeper) and device (Conditional Access blocks access if CA policy active).
> See: [Compliance / Access Blocked](../l1-runbooks/14-macos-compliance-access-blocked.md)

### Step 3: Configure Actions for Noncompliance

Configure what happens when a device is found non-compliant:

- **Mark device noncompliant:** Immediately or after a grace period (configurable in days)
- **Send email to end user:** Notification about non-compliance
- **Remotely lock the noncompliant device**
- **Retire the noncompliant device**

### Step 4: Assign Policy

Assign to device groups or user groups as appropriate.

## Conditional Access Cross-Reference

> For macOS-specific Conditional Access enrollment timing considerations (the chicken-and-egg problem where devices are non-compliant during enrollment), see [Conditional Access Enrollment Timing](../reference/ca-enrollment-timing.md). This is a cross-platform issue documented in detail with Windows and macOS resolution patterns.

## Verification

- [ ] Compliance policy shows assigned devices in Intune admin center
- [ ] Device compliance status visible at Devices > [device] > Compliance
- [ ] Non-compliant devices show specific failing settings (not just "non-compliant")
- [ ] Grace period configured matches organizational policy
- [ ] Each compliance setting has a corresponding configuration profile enforcing it

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| Compliance policy without enforcement config profile | Intune | Devices non-compliant but settings not enforced; users can change freely | [Compliance / Access Blocked](../l1-runbooks/14-macos-compliance-access-blocked.md) |
| SIP required but disabled on device | Intune | Non-compliant with no MDM remediation; user must boot to Recovery Mode | [Compliance / Access Blocked](../l1-runbooks/14-macos-compliance-access-blocked.md) |
| OS version requirement ahead of available update | Intune | Entire fleet non-compliant until Apple releases update | [Compliance / Access Blocked](../l1-runbooks/14-macos-compliance-access-blocked.md) |
| Password change timing gap | Intune | Device appears compliant with old password until user changes it | [Compliance / Access Blocked](../l1-runbooks/14-macos-compliance-access-blocked.md) |
| Gatekeeper compliance without config profile | Intune | Users can override Gatekeeper; compliance detects but cannot prevent | [Compliance / Access Blocked](../l1-runbooks/14-macos-compliance-access-blocked.md) |

## See Also

- [Configuration Profiles](03-configuration-profiles.md) -- enforcement counterpart to compliance detection
- [ABM Configuration](01-abm-configuration.md)
- [Conditional Access Enrollment Timing](../reference/ca-enrollment-timing.md) -- WSEC-01 cross-reference
- [Capability Matrix](../reference/macos-capability-matrix.md)
- [macOS ADE Lifecycle Overview](../macos-lifecycle/00-ade-lifecycle.md)

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Resolved Phase 24 runbook links | -- |
| 2026-04-14 | Initial version -- compliance policies with no-security-baselines callout, detect vs enforce distinction, all settings | -- |
