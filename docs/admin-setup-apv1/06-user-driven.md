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

User-Driven is the most common Windows Autopilot deployment mode. The end user authenticates during OOBE and the device completes enrollment with user affinity — the device is associated with the user who signed in. This mode works for both Entra-joined and Hybrid Entra-joined deployments.

## Prerequisites

- Deployment profile created with **Deployment mode** set to **User-Driven** (see [Deployment Profile](02-deployment-profile.md))
- ESP policy configured and assigned to the target device group (see [ESP Policy](03-esp-policy.md))
- Dynamic device group configured and confirmed to contain target devices (see [Dynamic Groups](04-dynamic-groups.md))
- **For Entra join:** no additional prerequisites beyond the above
- **For Hybrid Entra join:** Intune Connector for Active Directory installed, active, and version ≥ 6.2501.2000.5 (see [Intune Connector](09-intune-connector-ad.md))

## Steps

### Step 1: Verify deployment profile settings for User-Driven

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Enrollment** > **Windows enrollment** > **Windows Autopilot** > **Deployment Profiles**.
2. Select the profile assigned to your target device group.
3. Confirm **Deployment mode**: **User-Driven**.
4. Confirm **Join to Microsoft Entra ID as**: **Microsoft Entra joined** or **Hybrid Microsoft Entra joined** as appropriate for your environment.

   > **What breaks if misconfigured:** **Admin sees:** No immediate error. Support tickets report devices enrolling incorrectly or OOBE presenting in an unexpected mode.
   > **End user sees:** Wrong deployment mode — for example, Self-Deploying OOBE (no user prompt) or an error if mode prerequisites are not met.
   > **Runbook:** [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

### Step 2: Configure join type

**Entra join path:**
- No additional configuration beyond the deployment profile and ESP policy.
- The device joins directly to Microsoft Entra ID during OOBE when the user authenticates.
- User account type (Administrator or Standard User) is set in the deployment profile.

**Hybrid Entra join path:**

Hybrid Entra join requires the Intune Connector for Active Directory to be installed and operational on a domain-joined Windows Server in your on-premises environment.

1. Verify the connector is installed and shows **Active** in Intune admin center > Devices > Windows > Enrollment > Windows Autopilot > **Intune Connector for Active Directory**.
2. Confirm connector version is **≥ 6.2501.2000.5** — older versions cannot process enrollment requests and will silently fail (see [Intune Connector](09-intune-connector-ad.md)).
3. Confirm the OU for computer object creation is configured in the connector settings.
4. In your ESP policy, set the **timeout to at least 100 minutes** — hybrid Entra join adds approximately 40 minutes to the configured timeout because the connector must create the AD computer object before enrollment proceeds.

   > **What breaks if misconfigured:** **Admin sees:** Device appears in Intune as enrolled (MDM enrolled) but not joined to Active Directory. No ODJ blob delivered to the device.
   > **End user sees:** ESP times out or completes, but device is not domain-joined; group policy and on-premises resources are unavailable.
   > **Runbook:** [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

   > **What breaks if connector version is too old:** **Admin sees:** Connector shows as "Active" in Intune but hybrid join enrollments fail with no clear error. Support tickets report domain join failures.
   > **End user sees:** ESP timeout — device does not complete enrollment. Standard desktop reached without domain join.
   > **Runbook:** [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

### Step 3: End user experience walkthrough

Understanding what your users will see helps you prepare end-user communications and support scripts:

1. Device powers on and connects to the network (ethernet or Wi-Fi — both supported for User-Driven mode).
2. Region and keyboard selection screens appear (skipped if pre-configured in the deployment profile).
3. **"Let's set things up for work or school"** prompt appears — this is the Autopilot-branded OOBE screen confirming the profile was received.
4. User enters their organizational email address and password (or completes MFA if required by Conditional Access).
5. **Device phase of ESP** begins: device configuration, required apps, certificates, and policies install.
6. **User phase of ESP** begins: user-specific apps and policies apply.
7. Desktop is reached — device is enrolled, joined, and configured.

   > **What breaks if misconfigured:** **Admin sees:** Reports that step 3 shows standard Windows OOBE ("Let's start with region. Is this right?") instead of the Autopilot-branded prompt.
   > **End user sees:** Standard Windows setup — not Autopilot-guided. Device may not enroll in Intune or apply policies.
   > **Runbook:** [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md)

## Verification

- [ ] Test device powers on and shows Autopilot-branded OOBE ("set things up for work or school") rather than standard Windows setup
- [ ] User can authenticate and proceed through the device phase and user phase of ESP without timeout errors
- [ ] Device appears in **Intune admin center** > **Devices** > **All devices** as enrolled with correct user affinity (primary user assigned)
- [ ] For hybrid join: device appears in **Active Directory Users and Computers** in the correct OU

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Deployment mode set to wrong value in profile | Device presents wrong OOBE flow or fails enrollment | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Hybrid Entra join without Intune Connector installed | Device enrolls in MDM but not joined to AD; domain resources unavailable | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Connector version < 6.2501.2000.5 | Connector shows Active but hybrid join silently fails; no ODJ blob delivered | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| ESP timeout too low for hybrid join (< 100 minutes) | ESP times out consistently for hybrid deployments; ~40 minutes past configured limit | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Profile not assigned — dynamic group not evaluated | Standard Windows OOBE instead of Autopilot; no profile received | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| User not licensed for Intune | OOBE completes but device does not enroll; Intune enrollment fails silently | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |

<details>
<summary>L2: Hybrid Join — deeper investigation</summary>

For in-depth troubleshooting of Intune Connector issues, ODJ blob delivery failures, and Active Directory computer object creation problems, see the L2 runbook:

[L2: Hybrid Join Investigation](../l2-runbooks/04-hybrid-join.md)

This covers: connector log analysis (`Event Viewer > Applications and Services Logs > Microsoft > Intune > ODJConnectorService`), ODJ blob diagnostic steps, and OU permission troubleshooting.

</details>

## See Also

- [OOBE lifecycle stage](../lifecycle/03-oobe.md) — end-to-end OOBE and ESP flow
- [Deployment Modes Overview](05-deployment-modes-overview.md) — compare all three modes
- [Intune Connector for Active Directory](09-intune-connector-ad.md) — required for hybrid Entra join
- [APv1 vs APv2](../apv1-vs-apv2.md) — framework comparison and selection guide

---

*Next step: [Pre-Provisioning Mode](07-pre-provisioning.md)*
