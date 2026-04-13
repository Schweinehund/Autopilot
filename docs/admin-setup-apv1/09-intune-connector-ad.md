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

The Intune Connector for Active Directory is required for hybrid Entra join deployments. The connector creates Active Directory computer objects on behalf of Autopilot devices during enrollment — without it, hybrid join fails silently at OOBE without a clear error on the device.

This is a standalone guide because it serves two deployment modes: [User-Driven](06-user-driven.md) (hybrid join option) and [Pre-Provisioning](07-pre-provisioning.md) (hybrid join option). Self-deploying mode does not support hybrid join and does not use the connector.

> **CRITICAL: Connector Version Gate**
>
> Connector versions older than **6.2501.2000.5** are **deprecated and can no longer process enrollment requests**. This enforcement began in late June 2025 and is already in effect.
>
> The old connector must be **manually uninstalled** before installing the updated version — there is no automatic update path.
>
> Current recommended version: **6.2504.2001.8** (switched from Internet Explorer WebBrowser to WebView2/Edge — IE Enhanced Security Configuration no longer needs to be disabled with this version or newer).

## Prerequisites

- Windows Server 2016 or later
- .NET Framework 4.7.2 or later
- Local administrator rights on the target server for installation
- Rights to create `msDs-ManagedServiceAccount` objects in the Managed Service Accounts container in Active Directory
- Intune Administrator account (used only during installation — not stored or required afterward)
- Network connectivity from the server to Intune service endpoints
- One connector maximum per server
- One connector per Active Directory domain (multiple connectors per domain are supported for redundancy)

## Steps

### Step 1: Check for an existing connector

If upgrading from a connector version older than 6.2501.2000.5, **uninstall the existing connector first** via **Programs and Features** (Control Panel) before proceeding. There is no in-place upgrade path.

> **What breaks if misconfigured:** **Admin sees:** Connector list in Intune shows two entries, or existing entry remains with old version.
> **End user sees:** Hybrid join enrollment silently fails — device completes OOBE but never joins Active Directory; IT receives ticket about device not in AD.
> **Runbook:** [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

### Step 2: Download and install the connector

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Windows enrollment** > **Windows Autopilot** > **Intune Connector for Active Directory**.
2. Select **Add** to open the download panel.
3. Download `ODJConnectorBootstrapper.exe`.
4. Run the installer on the target Windows Server.
5. When prompted, sign in with an **Intune Administrator** account. This is a one-time authentication used to register the connector — the account is not stored or used after installation.
6. The connector automatically creates a Managed Service Account (MSA) named `msaODJ#####` (five random characters appended) with the permissions required to create computer objects in Active Directory.

> **What breaks if misconfigured:** **Admin sees:** Installation fails with an "access denied" or permission error during setup wizard.
> **End user sees:** No hybrid join attempted — connector was never registered successfully.
> **Runbook:** [OOBE Failure](../l1-runbooks/05-oobe-failure.md)
>
> Note: The account used at installation must have Intune service permissions (Intune Administrator role), not just local administrator rights on the server. Local admin rights are required separately for the installer itself.

### Step 3: Verify connector status

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Windows enrollment** > **Windows Autopilot** > **Intune Connector for Active Directory**.
2. Confirm:
   - **Status:** Active (may take several minutes to appear after installation completes)
   - **Version:** `>= 6.2501.2000.5` (check the Version column in the connector list)

> **What breaks if misconfigured:** **Admin sees:** Connector shows Active status but version column shows a version older than 6.2501.2000.5.
> **End user sees:** Hybrid join silently fails — no enrollment requests are processed; device completes OOBE with Entra join only, not hybrid AD join.
> **Runbook:** [OOBE Failure](../l1-runbooks/05-oobe-failure.md)
>
> Note: A connector showing Active with an outdated version will not produce clear errors. The admin must check the version column explicitly — the connector will appear healthy while silently rejecting all hybrid join requests.

### Step 4: Configure the OU for computer object creation

By default, the connector's MSA can only create computer objects in the default **Computers** container. To place devices in a specific OU:

1. Open the following configuration file on the connector server:
   ```
   C:\Program Files\Microsoft Intune\ODJConnector\ODJConnectorEnrollmentWizard\ODJConnectorEnrollmentWizard.exe.config
   ```

2. Add the OU LDAP distinguished name to the `OrganizationalUnitsUsedForOfflineDomainJoin` key in the `<appSettings>` section:
   ```xml
   <appSettings>
     <add key="OrganizationalUnitsUsedForOfflineDomainJoin"
          value="OU=AutopilotDevices,DC=contoso,DC=com" />
   </appSettings>
   ```

3. For multiple OUs, use semicolon-separated values within a single set of quotes:
   ```
   value="OU=Site1,DC=contoso,DC=com;OU=Site2,DC=contoso,DC=com"
   ```

4. Restart the ODJ Connector Service after saving the file for changes to take effect.

> **What breaks if misconfigured:** **Admin sees:** Computer objects appear in the default Computers container instead of the intended OU.
> **End user sees:** Device joins AD successfully but may not receive correct GPOs if GPO targeting relies on the device being in a specific OU.
> **Runbook:** [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

### Step 5: Multi-domain setup (if applicable)

If your organization has multiple Active Directory domains:

- **One connector per domain:** Each connector can only process enrollment requests for the domain of the server it is installed on. Install a connector on a server joined to each target domain.
- **Multiple connectors per domain (for redundancy):** Install additional connectors on other servers in the same domain. Enrollment requests are automatically load-distributed across connectors in the same domain.
- **One connector per server maximum:** Do not install multiple connectors on the same server.

> **What breaks if misconfigured:** **Admin sees:** Hybrid join failures for devices in a domain that has no connector installed.
> **End user sees:** OOBE fails to complete hybrid join; device either stops at enrollment error or completes with Entra-only join.
> **Runbook:** [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

## Log Paths (for troubleshooting)

**Event Viewer (HIGH confidence — official Microsoft documentation):**

Navigate to: `Event Viewer > Applications and Services Logs > Microsoft > Intune > ODJConnectorService`

- Admin log: `Microsoft-Intune-ODJConnectorService/Admin`
- Operational log: `Microsoft-Intune-ODJConnectorService/Operational`

The Admin log contains errors and warnings. Check here first when hybrid join enrollment fails.

**File log (MEDIUM confidence — community-sourced, not in official Microsoft docs):**

`C:\Program Files\Microsoft Intune\ODJConnector\ODJConnectorUI\ODJConnectorUI.log`

## Verification

- [ ] Connector shows **Active** status in Intune admin center > Devices > Windows > Windows enrollment > Windows Autopilot > Intune Connector for Active Directory
- [ ] Connector version is **>= 6.2501.2000.5** (visible in the Version column)
- [ ] Event Viewer > `Microsoft-Intune-ODJConnectorService/Admin` shows no errors
- [ ] Test hybrid join deployment succeeds — device appears in both Intune Managed Devices and Active Directory Computers (or the configured OU)
- [ ] Computer object created in the correct OU (if custom OU was configured in Step 4)

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Connector version < 6.2501.2000.5 | Hybrid join silently fails; no enrollment requests processed; connector status shows Active | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Old connector not uninstalled before upgrade | Undefined behavior; enrollment requests may silently fail or go to wrong connector | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| OU not configured in ODJConnectorEnrollmentWizard.exe.config | Computer objects land in default Computers container; GPO targeting misses | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Connector installed on wrong domain server | Enrollment requests for other domains not processed; cross-domain hybrid join fails | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| IE Enhanced Security Configuration enabled (connector < 6.2504.2001.8) | Connector sign-in fails during installation; setup wizard cannot authenticate | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Installation account not Intune Administrator | Installation fails with access denied; connector not registered | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |

<details>
<summary>L2 Deep Dive: Hybrid Join Investigation</summary>

For advanced connector troubleshooting — ODJ connector internals, 0x80070774 error analysis, domain replication issues, and offline domain join blob inspection:

- [L2: Hybrid Join Investigation](../l2-runbooks/04-hybrid-join.md) — Full ODJ connector deep-dive for Desktop Engineering

</details>

## See Also

- [User-Driven Mode](06-user-driven.md) — Hybrid join configuration for user-driven deployments
- [Pre-Provisioning Mode](07-pre-provisioning.md) — Hybrid join configuration for pre-provisioning deployments
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)

---
*Next step: [Configuration-Caused Failures Reference](10-config-failures.md)*
