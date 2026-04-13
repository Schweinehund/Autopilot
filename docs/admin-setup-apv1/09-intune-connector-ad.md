---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: APv1
audience: admin
---

> **Version gate:** This guide covers Windows Autopilot (classic).
> For Autopilot Device Preparation (APv2), see [APv2 Admin Setup Guides](../admin-setup-apv2/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# Intune Connector for Active Directory

The Intune Connector for Active Directory is required for hybrid Entra join deployments. The connector creates Active Directory computer objects on behalf of Autopilot devices during enrollment. This is a standalone guide because it serves two deployment modes -- [User-Driven](06-user-driven.md) and [Pre-Provisioning](07-pre-provisioning.md). Self-deploying mode does not support hybrid join and does not use the connector.

> [!CAUTION]
> **CRITICAL: Connector Version Gate**
>
> Connector versions older than **6.2501.2000.5** are **deprecated and can no longer process enrollment requests** (enforcement began late June 2025).
>
> The old connector must be **manually uninstalled** before installing the updated version -- there is no automatic update path.
>
> Current recommended version: **6.2504.2001.8** (switched from Internet Explorer WebBrowser control to WebView2/Edge -- IE Enhanced Security Configuration no longer needs to be disabled on the server).

## Prerequisites

- Windows Server 2016 or later
- .NET Framework 4.7.2 or later
- Local administrator rights on the target server for installation
- Rights to create `msDs-ManagedServiceAccount` objects in the Managed Service Accounts container in Active Directory
- Intune Administrator account (temporary -- used only during installation, not stored)
- Network connectivity from the server to Intune service endpoints
- One connector maximum per server
- One connector per Active Directory domain (multiple connectors per domain supported for redundancy)

## Steps

### Step 1: Check for Existing Connector

If upgrading from an older connector version: **uninstall the existing connector first** via Programs and Features. There is no in-place upgrade path.

> **What breaks if misconfigured:** Installing the new connector over an existing old connector results in undefined behavior. Enrollment requests may silently fail with no error visible to the admin. See: [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

### Step 2: Download and Install Connector

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Windows enrollment** > **Windows Autopilot** > **Intune Connector for Active Directory** > **Add**.
2. Download `ODJConnectorBootstrapper.exe`.
3. Run the installer on the target Windows Server.
4. Sign in with an **Intune Administrator** account when prompted. This is a one-time authentication -- the account is not stored or used after setup.
5. The connector automatically creates a Managed Service Account (MSA) named `msaODJ#####` (five random characters) with the necessary permissions.

> **What breaks if misconfigured:** Using a non-Intune-Administrator account causes installation to fail with an access denied error. The account needs Intune service permissions, not just local admin rights on the server.

### Step 3: Verify Connector Status

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Windows enrollment** > **Windows Autopilot** > **Intune Connector for Active Directory**.
2. Confirm:
   - Connector status: **Active** (may take several minutes to appear after installation)
   - Connector version: **>= 6.2501.2000.5** (required minimum)

> **What breaks if misconfigured:** Connector shows Active but the version is too old -- enrollment requests are silently rejected. Hybrid join fails with no clear error on the device side. Admin must check the connector version explicitly in the version column. See: [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

### Step 4: Configure OU for Computer Object Creation

By default, the connector's MSA can only create computer objects in the **Computers** container. To specify a custom OU:

1. Open `C:\Program Files\Microsoft Intune\ODJConnector\ODJConnectorEnrollmentWizard\ODJConnectorEnrollmentWizard.exe.config`
2. Add the OU LDAP distinguished name to the `OrganizationalUnitsUsedForOfflineDomainJoin` key:

```xml
<appSettings>
  <add key="OrganizationalUnitsUsedForOfflineDomainJoin"
       value="OU=AutopilotDevices,DC=contoso,DC=com" />
</appSettings>
```

For multiple OUs, use semicolon-separated values within one set of quotes:

```xml
<add key="OrganizationalUnitsUsedForOfflineDomainJoin"
     value="OU=Site1,DC=contoso,DC=com;OU=Site2,DC=contoso,DC=com" />
```

> **What breaks if misconfigured:** OU not configured means computer objects land in the default Computers container. This may violate organizational OU policies and GPO targeting. Admin sees devices in the wrong OU. See: [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

### Step 5: Multi-Domain Setup (If Applicable)

- **One connector per domain** -- connectors can only process requests for their own domain
- **Multiple connectors per domain** for redundancy -- load-distributes automatically
- Install additional connectors on servers joined to each target domain

> **What breaks if misconfigured:** Connector installed on a server in the wrong domain means requests for other domains are not processed. Hybrid join fails for devices targeting those domains. See: [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

## Log Paths

**Event Viewer:**
- `Event Viewer` > `Applications and Services Logs` > `Microsoft` > `Intune` > `ODJConnectorService`
- Admin log: `Microsoft-Intune-ODJConnectorService/Admin`
- Operational log: `Microsoft-Intune-ODJConnectorService/Operational`

**File log (MEDIUM confidence -- community-sourced):**
- `C:\Program Files\Microsoft Intune\ODJConnector\ODJConnectorUI\ODJConnectorUI.log`

## Verification

- [ ] Connector shows **Active** status in Intune admin center
- [ ] Connector version is **>= 6.2501.2000.5** (check the version column in the connector list)
- [ ] Event Viewer > ODJConnectorService > Admin log shows no errors
- [ ] Test hybrid join deployment succeeds -- device appears in both Intune and AD
- [ ] Computer object created in the correct OU (if custom OU configured)

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Connector version < 6.2501.2000.5 | Hybrid join silently fails; no enrollment requests processed | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Old connector not uninstalled before upgrade | Undefined behavior; enrollment may silently fail | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| OU not configured in ODJConnectorEnrollmentWizard.exe.config | Computer objects land in default Computers container | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Connector installed on wrong domain server | Requests for other domains not processed | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| IE Enhanced Security Config enabled (connector < 6.2504.2001.8) | Connector sign-in fails during installation | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |

<details>
<summary>L2 Deep Dive: Hybrid Join Investigation</summary>

For ODJ connector deep-dive troubleshooting, 0x80070774 error analysis, domain replication issues, and connector payload inspection, see [L2: Hybrid Join Investigation](../l2-runbooks/04-hybrid-join.md).

</details>

## See Also

- [User-Driven Mode](06-user-driven.md)
- [Pre-Provisioning Mode](07-pre-provisioning.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)

---
*Next step: [Configuration-Caused Failures Reference](10-config-failures.md)*
