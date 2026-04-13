---
last_verified: 2026-04-12
review_by: 2026-07-11
applies_to: APv2
audience: admin
---

> **Version gate:** This guide covers Autopilot Device Preparation (APv2).
> For Windows Autopilot (classic), see [APv1 Admin Setup Guides](../admin-setup-apv1/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# APv2 Setup Step 1: Prerequisites and RBAC Role

Before configuring any APv2 objects in Intune, verify each prerequisite and create the custom RBAC role. Skipping these steps causes silent failures during deployment -- devices enroll without the APv2 experience or admins receive "Access denied" errors when creating policies.

## Prerequisites

Complete in order. Item 0 is the most critical -- if APv1 and APv2 registrations both exist for the same device, APv1 silently wins every time.

0. **APv1 Deregistration** -- If any target devices are currently registered with Windows Autopilot (APv1 classic), they **must** be deregistered before any APv2 configuration. APv1 takes precedence silently -- the device enters the APv1 ESP flow instead of the APv2 Device Preparation experience with no error shown at any point. See [APv1 Registration Conflict Runbook](../l1-runbooks/08-apv2-apv1-conflict.md) for diagnosis and deregistration steps.

1. **Licensing** -- Microsoft Intune Plan 1 or equivalent (included in Microsoft 365 E3/E5, EMS E3/E5, Microsoft 365 Business Premium, Intune standalone). APv2 Device Preparation requires Intune enrollment authority for the enrolling user.

2. **Intune auto-enrollment** -- MDM auto-enrollment must be configured in Entra ID: **Azure portal** > **Microsoft Entra ID** > **Mobility (MDM and WIP)** > **Microsoft Intune**. MDM user scope must be set to **All** or **Some** (covering the enrolling user). Without this, devices will not auto-enroll into Intune during OOBE -- the APv2 deployment will fail at the enrollment step.

3. **Entra ID device join permissions** -- Targeted users must be allowed to join devices to Microsoft Entra ID: **Azure portal** > **Microsoft Entra ID** > **Devices** > **Device settings** > **Users may join devices to Microsoft Entra ID**. Set to **All** or ensure enrolling users are included in the allowed group. Without this, the Entra join step during OOBE fails with an access denied error.

4. **Device-level prerequisites** -- For OS version (Windows 11 22H2+ minimum), networking endpoints, and hardware requirements, see [APv2 Prerequisites Checklist](../lifecycle-apv2/01-prerequisites.md). This guide covers admin configuration prerequisites only -- device readiness is documented separately to avoid duplication.

## Steps

### Step 1: Verify APv1 deregistration status

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Windows enrollment** > **Devices** (under the Windows Autopilot Deployment Program section).
2. Search for target device serial numbers.
3. If any target devices appear in this list, they have active APv1 registrations. Select each device and choose **Delete** to deregister before proceeding.

   > **What breaks if misconfigured:** **Admin sees:** Device appears to enroll normally into Intune with no error.
   > **End user sees:** Enrollment Status Page (ESP) appears during OOBE instead of the APv2 Device Preparation experience -- the wrong deployment flow runs silently with no indication anything is wrong.
   > **Runbook:** [APv1 Registration Conflict](../l1-runbooks/08-apv2-apv1-conflict.md)

4. Verify the target devices no longer appear in the device list. Proceed only when the list is clear of target devices.

### Step 2: Verify Intune auto-enrollment configuration

1. Navigate to **Azure portal** > **Microsoft Entra ID** > **Mobility (MDM and WIP)** > **Microsoft Intune**.
2. Confirm **MDM user scope** is set to **All** or **Some**.
3. If set to **Some**, confirm the enrolling users are members of the included group.

   > **What breaks if misconfigured:** **Admin sees:** No immediate error -- the misconfiguration is only visible at enrollment time.
   > **End user sees:** OOBE completes through the Entra join step but then hangs or fails -- the device does not enroll into Intune and never receives the APv2 Device Preparation policy.
   > **Runbook:** [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md)

### Step 3: Verify Entra ID device join permissions

1. Navigate to **Azure portal** > **Microsoft Entra ID** > **Devices** > **Device settings**.
2. Under **Users may join devices to Microsoft Entra ID**, confirm the setting is **All** or that enrolling users are in the selected group.

   > **What breaks if misconfigured:** **Admin sees:** Enrollment attempt logged in Entra sign-in logs with error code 530003 or similar.
   > **End user sees:** OOBE fails at the "Setting up your device" step with an access denied or "Something went wrong" message. The device cannot join Entra ID and APv2 never runs.
   > **Runbook:** [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md)

### Step 4: Create custom RBAC role for APv2 administration

The custom RBAC role must be created before attempting to configure any APv2 objects. The built-in Intune Service Administrator role includes these permissions, but organizations using least-privilege administration require a custom role scoped to APv2.

1. Navigate to **Intune admin center** > **Tenant administration** > **Roles** > **Create**.
2. Select **Intune role**.
3. Enter a name (e.g., "APv2 Device Preparation Administrator") and a description.
4. Configure the following 5 permission categories. All other permissions not listed below should remain at the default (No):

   **Category 1: Device configurations**

   | Permission | Value |
   |------------|-------|
   | Read | Yes |
   | Delete | Yes |
   | Assign | Yes |
   | Create | Yes |
   | Update | Yes |

   **Category 2: Enrollment programs**

   | Permission | Value |
   |------------|-------|
   | Enrollment time device membership assignment | Yes |
   | (All other enrollment program permissions) | No |

   > **What breaks if misconfigured:** **Admin sees:** The Device Preparation policy wizard completes without error, but the policy has no effect -- the device is never added to the ETG security group at enrollment time.
   > **End user sees:** OOBE may complete normally, but the Device Preparation experience does not launch. Apps selected in the policy are not installed during OOBE.
   > **Runbook:** [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md)

   **Category 3: Managed apps**

   | Permission | Value |
   |------------|-------|
   | Read | Yes |
   | (All other managed app permissions) | No |

   **Category 4: Mobile apps**

   | Permission | Value |
   |------------|-------|
   | Read | Yes |
   | (All other mobile app permissions) | No |

   **Category 5: Organization**

   | Permission | Value |
   |------------|-------|
   | Read | Yes |
   | (All other organization permissions) | No |

5. Select **Next** to proceed to **Scope tags**. Configure scope tags as needed for your organization.
6. Select **Next** to proceed to **Assignments**. Select **Add groups** and add the security group containing APv2 administrators.
7. Select **Next** to review, then select **Create** to save the role.

   > **What breaks if misconfigured:** **Admin sees:** "Access denied" or "Insufficient permissions" error when navigating to Device preparation policies, or when attempting to create a policy.
   > **End user sees:** Deployment never launches because the policy was not created or not assigned due to admin errors during setup.
   > **Runbook:** [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md)

## Verification

- [ ] No target devices appear in the APv1 device list at Intune admin center > Devices > Windows > Windows enrollment > Devices
- [ ] Intune MDM user scope is set to All or Some (covering enrolling users) at Azure portal > Microsoft Entra ID > Mobility (MDM and WIP) > Microsoft Intune
- [ ] Users may join devices to Microsoft Entra ID is set to All or includes enrolling users at Azure portal > Microsoft Entra ID > Devices > Device settings
- [ ] Custom RBAC role exists in Intune admin center > Tenant administration > Roles with all 5 permission categories configured as specified
- [ ] RBAC role is assigned to the security group containing APv2 administrators
- [ ] Admin can navigate to **Intune admin center** > **Devices** > **Windows** > **Windows enrollment** > **Device preparation policies** without receiving an "Access denied" error

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| APv1 registration not removed before APv2 setup | ESP appears during OOBE instead of Device Preparation experience; APv1 profile runs silently | [APv1 Registration Conflict](../l1-runbooks/08-apv2-apv1-conflict.md) |
| RBAC role missing "Enrollment time device membership assignment" | Policy wizard completes but device is never added to ETG group; Device Preparation experience does not launch | [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md) |
| RBAC role missing "Device configurations" permissions (Read/Create) | Admin receives "Access denied" when creating Device Preparation policy | [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md) |
| MDM auto-enrollment not configured (scope = None) | Device joins Entra ID but does not enroll in Intune; APv2 policy is never delivered | [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md) |
| Entra ID device join not permitted for enrolling user | OOBE fails at "Setting up your device" step with access denied error | [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md) |

## See Also

- [APv2 Prerequisites Checklist (device-level)](../lifecycle-apv2/01-prerequisites.md)
- [APv2 Overview](../lifecycle-apv2/00-overview.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)
- [APv2 Failure Catalog](../error-codes/06-apv2-device-preparation.md)

---
*Next step: [Enrollment Time Grouping Device Group](02-etg-device-group.md)*
