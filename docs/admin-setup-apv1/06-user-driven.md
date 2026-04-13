---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: APv1
audience: admin
---

> **Version gate:** This guide covers Windows Autopilot (classic).
> For Autopilot Device Preparation (APv2), see [APv2 Admin Setup Guides](../admin-setup-apv2/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# User-Driven Mode Configuration

User-driven is the most common APv1 deployment mode. The end user authenticates during OOBE, and the device completes enrollment with user affinity. Supports both Entra join and hybrid Entra join.

## Prerequisites

- Deployment profile created with Deployment mode = **User-Driven** (see [Deployment Profile](02-deployment-profile.md))
- ESP policy configured and assigned (see [ESP Policy](03-esp-policy.md))
- Dynamic device group configured and verified (see [Dynamic Groups](04-dynamic-groups.md))
- For Entra join: no additional prerequisites beyond the above
- For hybrid Entra join: Intune Connector for Active Directory installed and active (see [Intune Connector](09-intune-connector-ad.md))

## Steps

### Step 1: Verify Deployment Profile Settings

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Enrollment** > **Windows Autopilot** > **Deployment Profiles** > [profile name].
2. Confirm:
   - Deployment mode: **User-Driven**
   - Join type: **Microsoft Entra joined** OR **Hybrid Microsoft Entra joined**

> **What breaks if misconfigured:** Wrong deployment mode selected causes the user to see a different OOBE flow than expected. Self-deploying mode removes user affinity entirely. See: [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

### Step 2: Configure Join Type

**Entra join path:**
- No additional configuration beyond the deployment profile and ESP
- Device joins directly to Entra ID during OOBE
- Simpler setup, no on-premises infrastructure dependency

**Hybrid Entra join path:**
- Intune Connector for Active Directory must be installed, active, and version **>= 6.2501.2000.5** (see [Intune Connector](09-intune-connector-ad.md))
- OU for computer object creation must be configured in the connector settings
- ESP timeout must account for **+40 minutes** connector processing delay (see [ESP Policy](03-esp-policy.md))

> **What breaks if misconfigured:** Connector not installed or version too old causes hybrid join to fail silently. Admin sees device enrolled in Intune but not joined to AD. End user sees ESP timeout after extended wait. See: [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

### Step 3: End User Experience

What the end user sees during a user-driven deployment:

1. Device powers on, connects to network (ethernet or Wi-Fi)
2. Region and keyboard selection (if not pre-configured in profile)
3. "Let's set things up for work or school" prompt appears (Autopilot branding)
4. User enters their organizational email and password
5. Device phase of ESP begins (device setup, apps, policies)
6. User phase of ESP begins (user-specific apps, policies)
7. Desktop reached -- device is enrolled and ready

> **What breaks if misconfigured:** If step 3 shows standard Windows OOBE instead of Autopilot branding, the profile is not assigned. Check dynamic group membership and profile status before re-imaging. See: [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md)

## Verification

- [ ] Test device powers on and shows Autopilot-branded OOBE (not standard Windows setup)
- [ ] User can authenticate and proceed through both ESP phases
- [ ] Device appears in Intune as enrolled with correct user affinity
- [ ] For hybrid join: device appears in Active Directory in the correct OU
- [ ] For hybrid join: Intune Connector shows Active status with version >= 6.2501.2000.5

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Wrong deployment mode selected | OOBE flow doesn't match expectations | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Hybrid join without Intune Connector | Join fails silently during OOBE | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Intune Connector version too old | Enrollment requests silently rejected | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| ESP timeout too low for hybrid join | ESP times out during AD object creation | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Profile not assigned (group not evaluated) | Standard OOBE instead of Autopilot | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| User not licensed for Intune | Enrollment fails with licensing error | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |

<details>
<summary>L2 Deep Dive: Hybrid Join Investigation</summary>

For detailed connector troubleshooting, ODJ payload analysis, 0x80070774 error investigation, and domain replication issues, see [L2: Hybrid Join Investigation](../l2-runbooks/04-hybrid-join.md).

</details>

## See Also

- [OOBE Lifecycle Stage](../lifecycle/03-oobe.md)
- [Deployment Modes Overview](05-deployment-modes-overview.md)
- [Intune Connector for Active Directory](09-intune-connector-ad.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)

---
*Next step: [Pre-Provisioning Mode](07-pre-provisioning.md)*
