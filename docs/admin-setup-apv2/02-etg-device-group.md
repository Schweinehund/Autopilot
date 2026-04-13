---
last_verified: 2026-04-12
review_by: 2026-07-11
applies_to: APv2
audience: admin
---

> **Version gate:** This guide covers Autopilot Device Preparation (APv2).
> For Windows Autopilot (classic), see [APv1 Admin Setup Guides -- coming in Phase 16].
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# APv2 Setup Step 2: Enrollment Time Grouping Device Group

The Enrollment Time Grouping (ETG) device group is the core mechanism that makes APv2 work. When a user authenticates during OOBE, the Intune Provisioning Client service principal automatically adds the device to this group -- triggering immediate delivery of apps, scripts, and policies without dynamic group evaluation delays. For a full explanation of how ETG works in the APv2 model, see [ETG: The Core Mechanism](../lifecycle-apv2/00-overview.md#enrollment-time-grouping----the-core-mechanism).

## Prerequisites

- Step 1 complete: [Prerequisites and RBAC Role](01-prerequisites-rbac.md)
- Microsoft Graph PowerShell modules available: `Microsoft.Graph.Authentication` and `Microsoft.Graph.Applications` (required for the service principal setup in Step 2, Option B)
- **Global Administrator** or **Application Administrator** role in Entra ID (required for the PowerShell consent step)

## Steps

### Step 1: Create the ETG security group

1. Navigate to **Azure portal** > **Microsoft Entra ID** > **Groups** > **New group**.
2. Configure all 4 required settings using this checklist. Every setting matters -- incorrect values cause silent ETG failures:

   | Setting | Required Value | Common Mistake |
   |---------|----------------|----------------|
   | Group type | **Security** | Not Microsoft 365 -- M365 groups are not supported for ETG |
   | Membership type | **Assigned** | Not Dynamic -- ETG requires assigned membership; dynamic groups prevent the Intune Provisioning Client from adding devices |
   | Microsoft Entra roles can be assigned to the group | **No** | Role-assignable groups have a different lifecycle and cannot be used for ETG |
   | Owner | Intune Provisioning Client (AppID: `f1346770-5b25-470b-88bd-d5744ab7952c`) | Added in Step 2 below -- must be set for the group to function |

3. Enter a group name (e.g., "APv2-ETG-Devices") and an optional description.
4. Do not add any members at this time. The Intune Provisioning Client will add devices automatically at enrollment time.
5. Select **Create**.

   > **What breaks if misconfigured:** **Admin sees:** Group appears in Entra ID and can be selected in the Device Preparation policy wizard without any error.
   > **End user sees:** OOBE completes, but the Device Preparation experience never launches -- the device is never added to the ETG group, so no apps or policies from the policy are delivered.
   > **Runbook:** [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md)

### Step 2: Add the Intune Provisioning Client as group owner

The Intune Provisioning Client service principal (AppID: `f1346770-5b25-470b-88bd-d5744ab7952c`) **must** be an owner of the ETG device group. Without this ownership, the service principal cannot add devices to the group at enrollment time. The service principal is also displayed as **"Intune Autopilot ConfidentialClient"** in some tenants -- both names refer to the same object; verify by AppID if unsure.

**Option A: Add via Entra ID portal**

1. Navigate to **Azure portal** > **Microsoft Entra ID** > **Groups** > select the ETG group created in Step 1.
2. Select **Owners** > **Add owners**.
3. Search for "Intune Provisioning Client" or "Intune Autopilot ConfidentialClient".
4. Select the service principal and confirm.

   > **Note:** If the service principal does not appear in search results, it does not yet exist in your tenant. Use Option B (PowerShell) to add it.

**Option B: Add via PowerShell (required if service principal is not in your tenant)**

Use this procedure if the service principal is not found in the portal owner picker, or to automate setup across multiple tenants.

```powershell
# Source: https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-device-group
# Required modules
Install-Module Microsoft.Graph.Authentication -Scope CurrentUser
Install-Module Microsoft.Graph.Applications -Scope CurrentUser

# Connect with required scope
Connect-MgGraph -Scopes "Application.ReadWrite.All"
# Accept the "Permissions requested" consent window when prompted
# Check "Consent on behalf of your organization" if this is for the whole tenant

# Create the Intune Provisioning Client service principal in your tenant
New-MgServicePrincipal -AppId f1346770-5b25-470b-88bd-d5744ab7952c
```

**Expected results after running `New-MgServicePrincipal`:**

- **Success:** Command returns a service principal object with the AppId (`f1346770-5b25-470b-88bd-d5744ab7952c`) and DisplayName ("Intune Provisioning Client" or "Intune Autopilot ConfidentialClient").
- **`Status: 409 (Conflict)` with `Request_MultipleObjectsWithSameKeyValue`:** The service principal already exists in your tenant. No action needed -- proceed directly to adding it as the ETG group owner below.
- **`Status: 403 (Forbidden)` with `Authorization_RequestDenied`:** Insufficient permissions. Verify the account running this command has the Global Administrator or Application Administrator role, and that the "Consent on behalf of your organization" checkbox was checked in the consent prompt.

After the service principal exists in your tenant, add it as the ETG group owner:

```powershell
# Get the Intune Provisioning Client service principal object
$sp = Get-MgServicePrincipal -Filter "AppId eq 'f1346770-5b25-470b-88bd-d5744ab7952c'"

# Get the ETG group (replace with your actual group name)
$group = Get-MgGroup -Filter "DisplayName eq 'APv2-ETG-Devices'"

# Add the service principal as group owner
New-MgGroupOwnerByRef -GroupId $group.Id -BodyParameter @{
    "@odata.id" = "https://graph.microsoft.com/v1.0/serviceprincipals/$($sp.Id)"
}
```

**Verification:** Navigate to the ETG group in the Entra ID portal > select the group > **Owners**. The Intune Provisioning Client (AppID `f1346770-5b25-470b-88bd-d5744ab7952c`) should appear in the owners list.

   > **What breaks if misconfigured:** **Admin sees:** Device Preparation policy is created and assigned to both groups without error. The deployment report shows "Not started" for all enrolling devices.
   > **End user sees:** OOBE completes to the desktop without the Device Preparation experience ever appearing. Apps selected in the policy are not installed. No error is shown at any point.
   > **Runbook:** [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md)

### Step 3: Assign apps and scripts to the ETG device group

Apps and PowerShell scripts that should install during APv2 enrollment must be **both** selected in the Device Preparation policy (Step 3 of this setup) **and** assigned to the ETG device group with the correct settings. The assignment and the policy selection are two separate actions in the Intune portal -- one without the other results in apps showing "Skipped" in the deployment report.

**Assign managed applications:**

1. Navigate to **Intune admin center** > **Apps** > **All apps**.
2. Select each app to include in the APv2 deployment.
3. Select **Properties** > **Edit** (next to Assignments).
4. Under **Required**, select **Add group** and choose the ETG device group.
5. Set **Install context** to **Device (System)**.
6. Save the assignment.
7. Repeat for all required apps. The Device Preparation policy supports up to 25 apps (limit raised from 10 on January 30, 2026).

   **Supported app types:** LOB (.msi/.intunewin), Win32, Microsoft Store (WinGet), Microsoft 365 apps, Enterprise App Catalog.

   > **What breaks if misconfigured:** **Admin sees:** Apps show "Skipped" status in the APv2 deployment report, or no app status entries appear at all.
   > **End user sees:** Device Preparation experience appears during OOBE but apps are not installed. Desktop appears without the expected applications.
   > **Runbook:** [Apps Not Installed](../l1-runbooks/07-apv2-apps-not-installed.md)

**Assign PowerShell scripts:**

1. Navigate to **Intune admin center** > **Devices** > **Scripts and remediations** > **Platform scripts**.
2. Select each script to include.
3. Under **Assignments**, add the ETG device group.
4. In script properties, ensure **Run this script using the logged on credentials** is set to **No** (runs in SYSTEM context).
5. Save. The Device Preparation policy supports up to 10 scripts.

   > **What breaks if misconfigured:** **Admin sees:** Scripts do not appear in the APv2 deployment report, or appear with "Failed" status.
   > **End user sees:** Device Preparation experience completes but scripts have not run. Configuration dependent on the script is missing from the device.
   > **Runbook:** [Apps Not Installed](../l1-runbooks/07-apv2-apps-not-installed.md)

## Verification

- [ ] ETG security group exists in Entra ID with Group type = **Security** and Membership type = **Assigned**
- [ ] "Microsoft Entra roles can be assigned to the group" is set to **No** on the ETG group
- [ ] Intune Provisioning Client (AppID `f1346770-5b25-470b-88bd-d5744ab7952c`) appears in the group's **Owners** list (not just Members)
- [ ] All required apps are assigned to the ETG device group with **Required** intent and **Device (System)** install context
- [ ] All required PowerShell scripts are assigned to the ETG device group with "Run this script using the logged on credentials" = **No**

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Group type set to Microsoft 365 instead of Security | ETG membership assignment fails silently; devices never added to group | [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md) |
| Membership type set to Dynamic instead of Assigned | Intune Provisioning Client cannot add devices at enrollment time | [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md) |
| Intune Provisioning Client not added as group owner | Devices not added to ETG group; Device Preparation experience never launches | [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md) |
| Apps not assigned to ETG group (only selected in Device Preparation policy) | Apps show "Skipped" in deployment report | [Apps Not Installed](../l1-runbooks/07-apv2-apps-not-installed.md) |
| App install context set to User instead of Device (System) | Apps fail during OOBE -- no signed-in user is available at that stage | [Apps Not Installed](../l1-runbooks/07-apv2-apps-not-installed.md) |
| Script "Run this script using the logged on credentials" set to Yes | Script fails -- no logged-on user is available during OOBE | [Apps Not Installed](../l1-runbooks/07-apv2-apps-not-installed.md) |

## See Also

- [ETG Mechanism Explained](../lifecycle-apv2/00-overview.md#enrollment-time-grouping----the-core-mechanism)
- [APv2 Deployment Flow](../lifecycle-apv2/02-deployment-flow.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)
- [APv2 Failure Catalog](../error-codes/06-apv2-device-preparation.md)

---
*Next step: [Device Preparation Policy](03-device-preparation-policy.md)*
