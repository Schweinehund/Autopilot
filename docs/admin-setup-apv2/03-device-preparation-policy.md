---
last_verified: 2026-04-12
review_by: 2026-07-11
applies_to: APv2
audience: admin
---

> **Version gate:** This guide covers Autopilot Device Preparation (APv2).
> For Windows Autopilot (classic), see [APv1 Admin Setup Guides](../admin-setup-apv1/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# APv2 Setup Step 3: Device Preparation Policy

The Device Preparation policy is the central APv2 configuration object. It defines the deployment settings, OOBE experience, and the apps and scripts to install during enrollment. This guide walks through creating the policy step by step, with troubleshooting guidance for each configurable setting.

## Prerequisites

- Step 1 complete: [Prerequisites and RBAC Role](01-prerequisites-rbac.md)
- Step 2 complete: [ETG Device Group](02-etg-device-group.md) with apps and scripts assigned to the ETG device group before creating this policy
- Custom RBAC role or Global Administrator permissions in Intune

## Steps

### Step 1: Create a new Device Preparation policy

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Windows enrollment** > **Device preparation policies**.
2. Select **Create**.
3. Enter a policy name (for example, "APv2 User-Driven Entra Join") and an optional description.

### Step 2: Configure deployment settings

#### Deployment mode

1. Set **Deployment mode** to **User-driven**.

   > **What breaks if misconfigured:** **Admin sees:** User-driven is currently the only available option for physical devices -- no misconfiguration is possible.
   > **End user sees:** N/A.
   > **Runbook:** [APv2 Deployment Flow](../lifecycle-apv2/02-deployment-flow.md)

#### Join type

2. Set **Join type** to **Microsoft Entra joined**.

   > **What breaks if misconfigured:** **Admin sees:** This is a fixed choice for Entra-joined deployments -- selecting a different option applies a different configuration path outside the scope of this guide.
   > **End user sees:** N/A for Entra join.
   > **Runbook:** [APv2 Overview](../lifecycle-apv2/00-overview.md)

#### User account type

3. Set **User account type** to **Standard User** or **Administrator** based on your organization's requirements.

   > **Active known issue (April 2026):** The User account type setting interacts with the Entra ID Local administrator settings. Not all combinations produce the expected result. The following table documents the valid combinations:
   >
   > **For Standard User result** (user is non-admin on device):
   >
   > | Entra ID Local Admin Setting | Device Prep Policy User Account Type | Result |
   > |------------------------------|--------------------------------------|--------|
   > | None | Administrator | Standard User |
   > | Selected (non-admin users excluded) | Administrator | Standard User |
   > | All | Standard User | Standard User |
   >
   > **For Administrator result** (user is admin on device):
   >
   > | Entra ID Local Admin Setting | Device Prep Policy User Account Type | Result |
   > |------------------------------|--------------------------------------|--------|
   > | All | Administrator | Administrator |
   > | Selected (user is selected) | Administrator | Administrator |
   >
   > **Entra ID path:** Azure portal > Microsoft Entra ID > Manage | Devices > Manage | Device settings > Local administrator settings

   > **What breaks if misconfigured:** **Admin sees:** Deployment report shows success, but user account type does not match intent.
   > **End user sees:** If Entra ID Local Admin = Selected or None AND Device Prep policy = Standard User: provisioning is skipped entirely. The user reaches the desktop WITHOUT expected apps installed, and no error is shown during OOBE.
   > **Runbook:** [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md)

### Step 3: Configure device group

1. Select **Add device group**.
2. Choose the ETG device group created in Step 2 of the setup sequence ([ETG Device Group](02-etg-device-group.md)).

   > **Warning:** Select the **device** group here, not a user group. The Device group page requires the ETG security group. The Assignments page (Step 7) requires the user group. Selecting the wrong group type is a common misconfiguration -- see the Configuration-Caused Failures table below.

   > **What breaks if misconfigured:** **Admin sees:** Policy shows "0 devices" or an unexpected group name in the Device group field.
   > **End user sees:** Deployment never launches -- no matching policy is found for the enrolling device.
   > **Runbook:** [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md)

### Step 4: Configure out-of-box experience settings

#### Timeout value

1. Set **Minutes allowed before showing installation error** to a value between **15** and **720**.
   - Recommended: **60** minutes for standard deployments.
   - Increase this value if your app set is large. With up to 25 apps per policy, complex deployments may need 90-120 minutes or more.

   > **What breaks if misconfigured:** **Admin sees:** Deployment report shows "Deployment timed out" status.
   > **End user sees:** An error screen appears during OOBE after the timeout elapses, with a Retry button and (if configured) a "Continue anyway" option.
   > **Runbook:** [Deployment Timeout](../l1-runbooks/09-apv2-deployment-timeout.md)

#### Custom error message

2. Enter an optional **Custom error message** to display to end users on failure (for example, "Contact IT Help Desk at ext. 1234 or helpdesk@contoso.com").

   > **What breaks if misconfigured:** **Admin sees:** No failure -- this is a policy choice. An empty field shows the default Intune error message on failure.
   > **End user sees:** If left empty, users see the generic Intune failure message with no contact information.
   > **Runbook:** N/A -- this setting affects user experience, not deployment success.

#### Allow skip

3. Set **Allow users to skip setup after multiple attempts** to **Yes** or **No**.
   - **Yes**: Adds a "Continue anyway" button alongside Retry on the error screen. The user can proceed to the desktop with incomplete setup.
   - **No**: The user can only Retry or contact support. The device is blocked until deployment succeeds or an admin intervenes.

   > **What breaks if misconfigured:** **Admin sees:** No deployment failure -- this is an intentional policy choice, not a misconfiguration.
   > **End user sees:** If set to Yes: user may bypass incomplete setup and work with missing apps or policies. If set to No: user is blocked at the error screen until deployment succeeds.
   > **Runbook:** [Deployment Timeout](../l1-runbooks/09-apv2-deployment-timeout.md)

#### Show link to diagnostics

4. Set **Show link to diagnostics** to **Yes** or **No**.
   - **Yes**: Shows a diagnostic log export link on the failure page, useful for L2 troubleshooting.
   - **No**: No diagnostic link is shown.

   > **What breaks if misconfigured:** **Admin sees:** No deployment failure. If set to No, logs are not accessible from the failure screen.
   > **End user sees:** If set to Yes, a diagnostic export option appears on the error screen.
   > **Runbook:** N/A -- this setting affects log accessibility, not deployment success.

### Step 5: Configure apps

1. Select **Add apps** to choose up to **25** managed applications to install during OOBE.
2. Supported app types: LOB (line-of-business), Win32, Microsoft Store (WinGet only), Microsoft 365, Enterprise App Catalog.

   > **Requirement:** Every app selected here MUST also be assigned to the ETG device group with **Required** assignment intent and **Device (System)** install context. The policy selection and the app assignment are two separate steps -- both are required. See [ETG Device Group -- Step 3: Assign Apps and Scripts](02-etg-device-group.md) for the assignment procedure.

   > **What breaks if misconfigured:** **Admin sees:** Apps show "Skipped" status in the deployment report (if not assigned to ETG group) or "Failed" status (if install context is User instead of Device/System).
   > **End user sees:** Device Preparation experience completes but expected apps are missing from the desktop.
   > **Runbook:** [Apps Not Installed](../l1-runbooks/07-apv2-apps-not-installed.md)

### Step 6: Configure scripts

1. Select **Add scripts** to choose up to **10** PowerShell scripts to run during OOBE.

   > **Requirement:** Every script selected here MUST also be assigned to the ETG device group. The script setting "Run this script using the logged on credentials" MUST be set to **No** (runs as System context). There is no signed-in user during OOBE.

   > **What breaks if misconfigured:** **Admin sees:** Scripts do not appear in the deployment report or show "Failed" status.
   > **End user sees:** Expected device configurations from the scripts are not applied. Subsequent app installs that depend on script output may also fail.
   > **Runbook:** [Apps Not Installed](../l1-runbooks/07-apv2-apps-not-installed.md)

### Step 7: Configure assignments (user group)

1. Under **Assignments**, select **Add group**.
2. Choose the **user security group** containing the users who should receive this APv2 deployment.

   > **Warning:** Select the **user** group here, not the ETG device group. The Assignments page targets which users trigger APv2 deployment at sign-in. The Device group page (Step 3) targets the ETG device group for group membership assignment. Mixing these up prevents policy matching at enrollment time.

   > **What breaks if misconfigured:** **Admin sees:** Policy exists but no users are targeted. The deployment report shows no entries for affected devices.
   > **End user sees:** Deployment never launches during OOBE. The user proceeds to the desktop without any Device Preparation experience.
   > **Runbook:** [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md)

### Step 8: Review and create

1. Review all settings on the summary page.
2. Select **Create**.

**Policy priority note:** If multiple Device Preparation policies target the same user group, the highest priority policy (lowest priority number) wins. Manage priority by drag-and-drop in the Device preparation policies list at **Intune admin center** > **Devices** > **Windows** > **Windows enrollment** > **Device preparation policies**.

> **What breaks if misconfigured:** **Admin sees:** Policy exists with correct settings, but wrong policy is applied to specific users.
> **End user sees:** Unexpected settings applied during OOBE -- wrong apps, wrong account type, wrong timeout.
> **Runbook:** [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md)

## Verification

- [ ] Device Preparation policy appears in the Device preparation policies list
- [ ] Policy shows the correct ETG device group in the Device group field
- [ ] Policy shows the correct user group in the Assignments field
- [ ] Timeout value is set appropriately for the app set (minimum 60 minutes for standard deployments)
- [ ] All required apps appear in the policy's Apps section (up to 25)
- [ ] All required scripts appear in the policy's Scripts section (up to 10)
- [ ] Entra ID Local administrator settings match a valid combination from the table above for the desired User account type result

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| User account type + Entra ID Local Admin in unsupported combination (Selected or None + Standard User) | Provisioning skipped; user reaches desktop without apps; no error shown | [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md) |
| Wrong group in Device group field (user group selected instead of ETG device group) | Deployment never launches; no matching policy found for enrolling device | [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md) |
| Wrong group in Assignments field (ETG device group selected instead of user group) | No users targeted; deployment report shows no entries | [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md) |
| Timeout value too low for app set size | Deployment times out before all apps install | [Deployment Timeout](../l1-runbooks/09-apv2-deployment-timeout.md) |
| Apps selected in policy but not assigned to ETG device group | Apps show "Skipped" in deployment report | [Apps Not Installed](../l1-runbooks/07-apv2-apps-not-installed.md) |
| App install context set to User instead of Device (System) | Apps fail during OOBE; "Failed" in deployment report | [Apps Not Installed](../l1-runbooks/07-apv2-apps-not-installed.md) |
| Script "Run as logged on credentials" set to Yes | Script fails during OOBE; no logged-on user available | [Apps Not Installed](../l1-runbooks/07-apv2-apps-not-installed.md) |
| Multiple policies targeting same user group with incorrect priority order | Wrong policy applied; unexpected settings during OOBE | [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md) |

## See Also

- [APv2 Deployment Flow](../lifecycle-apv2/02-deployment-flow.md)
- [APv2 Failure Catalog](../error-codes/06-apv2-device-preparation.md)
- [ETG Device Group Setup](02-etg-device-group.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)
- [APv2 Known Issues](https://learn.microsoft.com/en-us/autopilot/device-preparation/known-issues)

---
*Next step: [Corporate Identifiers](04-corporate-identifiers.md)*
