---
last_verified: 2026-04-12
review_by: 2026-07-11
applies_to: APv2
audience: L2
---

> **Version gate:** This guide covers Autopilot Device Preparation (APv2) deployment report interpretation. For Windows Autopilot (classic) ESP investigation, see [ESP Deep-Dive](02-esp-deep-dive.md).

# APv2 Deployment Report Interpretation

## Triage

**From L1 escalation ([APE1](../decision-trees/04-apv2-triage.md), [APE2](../decision-trees/04-apv2-triage.md), or [APE3](../decision-trees/04-apv2-triage.md))?**
L1 collected data per [Escalation Data table](../decision-trees/04-apv2-triage.md#escalation-data). Skip to Step 2.

**Starting fresh?** Begin at Step 1.

## How to Access the Deployment Report

Exact portal navigation path -- self-contained so L2 does not need to look elsewhere:

```
Intune admin center (https://intune.microsoft.com)
  > Devices
  > Monitor
  > Windows Autopilot device preparation deployments
  > Select the device under Device name
```

---

## Investigation

### Step 1: Collect logs

Before starting: collect a diagnostic package per the [APv2 Log Collection Guide](06-apv2-log-collection.md). This provides the BootstrapperAgent event log, IME logs, and deployment report screenshot needed for all subsequent investigation steps.

### Step 2: Review deployment report status values

Use the reference tables below to interpret every field in the deployment report. Identify the failure indicator, then proceed to the investigation path that matches the failure type (Step 3).

---

## Status Value Reference Tables

### Main List Columns

| Column | Possible Values | Meaning | Action |
|--------|----------------|---------|--------|
| Device name | Device name (clickable) | Links to device details in Intune | Click for full device record |
| Enrollment date | Date/time | When OOBE enrollment occurred | Use for timeline correlation |
| Deployment status | In progress / Success / Failed | Overall deployment outcome | **Failed** = investigate; In progress = check if stalled |
| Phase | Policy installation / Script installation / App installation | Phase where failure occurred or deployment is currently executing | See Phase Breakdown below for step mapping |
| Serial number | Hardware serial | Device identifier | Use for cross-referencing with L1 escalation data |
| Deployment time | Duration or "In progress" | Total elapsed deployment time | Compare against configured timeout |
| UPN | Signing-in user | User who initiated OOBE | Use for license and group membership checks |

### Device Section Fields

| Field | Description | Action |
|-------|-------------|--------|
| Device name | Clickable -- goes to device details | Check device properties, compliance, installed apps |
| Deployment status | In progress / Success / Failed | Same as main list -- confirms overall result |
| Device ID | Intune device ID | Use for Graph API queries or support tickets |
| Microsoft Entra device ID | Entra device ID | Use for Entra join verification |
| Serial number | Hardware serial | Cross-reference with physical device |
| Deployment policy | Policy name applied | Verify correct policy was targeted |
| Policy version | Version number (increments on each save) | Check if policy was modified after deployment |
| OS version | Windows version during deployment | Verify meets minimum APv2 requirements (Windows 11 22H2 + KB5035942) |

### Apps Tab Statuses

| Status | Meaning | Action |
|--------|---------|--------|
| Installed | App deployed successfully | None |
| In progress | App currently installing | Wait or investigate if stalled past expected duration |
| Skipped | App selected in policy but not assigned to ETG device group, or app not applicable | **Treat as configuration gap -- investigate with same urgency as Failed.** Check ETG group assignment. If ETG assignment correct: check Managed Installer policy (resolved April 2026). See [APv2 Apps Not Installed](../l1-runbooks/07-apv2-apps-not-installed.md). |
| Failed | App failed to install | Check [BootstrapperAgent log](07-apv2-event-ids.md) and IME AppWorkload.log. See [APv2 Log Collection](06-apv2-log-collection.md). |

> **Skipped is not optional.** "Skipped" means the app was selected in the Device Preparation policy
> but was NOT delivered to the device. This is a configuration gap, not a benign skip.
> Investigate every Skipped entry: verify ETG group assignment, check Managed Installer policy status.

### Scripts Tab Statuses

| Status | Meaning | Action |
|--------|---------|--------|
| Installed | Script ran successfully | None |
| In progress | Script currently running | Wait |
| Skipped | Script selected in policy but not assigned to ETG device group | Check ETG assignment |
| Failed | Script failed to run | Check [BootstrapperAgent log](07-apv2-event-ids.md) and IME AgentExecutor.log for exit code. See [APv2 Log Collection](06-apv2-log-collection.md). |

### Phase Breakdown

Map each Phase value to deployment flow step numbers from [APv2 Deployment Flow](../lifecycle-apv2/02-deployment-flow.md):

| Phase Value | Deployment Flow Steps Covered | What It Includes | Failure Means |
|-------------|------------------------------|------------------|---------------|
| Policy installation | Steps 2-7 (Entra join, enrollment, IME install, standard user, MDM sync, LOB/M365 apps) | Widest phase -- covers everything from Entra join through LOB/M365 app delivery | Entra join failure, enrollment failure, IME installation failure, OR LOB/M365 app failure. Check deployment details to narrow. |
| Script installation | Step 8 (PowerShell scripts) | Platform script execution | A script failed to run or timed out. Check Scripts tab for specific failure. |
| App installation | Step 9 (Win32, Store, EAC apps) | Win32 app, Store app, and Enterprise App Catalog app installation | A Win32/Store/EAC app failed to install. Check Apps tab for specific failure. |

> **Note:** The Policy installation phase is coarse-grained. It covers Steps 2-7 of the deployment flow, which includes Entra join, Intune enrollment, IME installation, AND LOB/M365 app installation. A failure in this phase requires examining the deployment details and logs to determine which specific step failed. Do not assume "Policy installation" means only policy delivery.

---

### Step 3: Follow investigation path by failure type

Based on the deployment report status values identified in Step 2, follow the matching investigation path below.

## Investigation Paths by Failure Type

### Entra Join Failed (Phase: Policy installation)

**Indicators:** Deployment status Failed, Phase shows Policy installation, no Apps/Scripts tab entries populated.

**Investigation:**

1. **Check Entra device settings:** Navigate to Entra admin center (https://entra.microsoft.com) > Devices > Device settings > "Users may join devices to Microsoft Entra" -- verify the signing-in user is included in the allowed scope.

2. **Check ETG group ownership:** Verify the Intune Provisioning Client (AppID: `f1346770-5b25-470b-88bd-d5744ab7952c`) is listed as an owner of the Enrollment Time Grouping (ETG) security group configured in the Device Preparation policy.

3. **Check MDM auto-enrollment scope:** Navigate to Entra admin center > Mobility > Microsoft Intune -- verify the MDM user scope includes the signing-in user.

**Resolution:** Fix the identified configuration gap and retry deployment. The most common cause is the signing-in user lacking Entra join permissions or the ETG group missing the Intune Provisioning Client as owner.

### Enrollment Failed (Phase: Policy installation)

**Indicators:** Deployment status Failed, Phase shows Policy installation, device appears in Entra but not in Intune.

**Investigation:**

1. **Check MDM scope:** Navigate to Entra admin center (https://entra.microsoft.com) > Mobility > Microsoft Intune -- MDM user scope must include the enrolling user (set to All or a group containing the user).

2. **Check license:** Navigate to Microsoft 365 admin center (https://admin.microsoft.com) > Active users > select user > Licenses -- verify an Intune-capable license is assigned (Microsoft 365 E3/E5, EMS E3/E5, or standalone Intune license).

3. **Check enrollment restrictions:** Navigate to Intune admin center > Devices > Enrollment restrictions -- verify no blocking restriction applies to the user or device platform.

**Resolution:** Assign the missing license or correct MDM scope, then retry deployment.

### App Install Failed (Phase: App installation or Policy installation)

**Indicators:** One or more apps show Failed in the Apps tab.

**Investigation:**

1. Note the failed app name and status from the Apps tab.

2. Collect AppWorkload.log per [APv2 Log Collection Guide](06-apv2-log-collection.md) Step 3.

3. Search AppWorkload.log for the app name -- look for exit codes, error messages, detection rule failures.

4. Check app installation context (System vs User) in Intune admin center > Apps > All apps > select the app > Properties. APv2 OOBE requires System context.

5. If install context is User: this is the cause -- APv2 deployment runs in SYSTEM context during OOBE and cannot install User-context apps.

**Resolution:** Change app install context to System, fix detection rules, or repackage the application.

### Script Failed (Phase: Script installation)

**Indicators:** One or more scripts show Failed in the Scripts tab.

**Investigation:**

1. Note the failed script name from the Scripts tab.

2. Collect AgentExecutor.log per [APv2 Log Collection Guide](06-apv2-log-collection.md) Step 3.

3. Search AgentExecutor.log for the script name -- look for exit codes and error output.

4. Check script run-as-account (System vs User) in Intune admin center > Devices > Scripts and remediations > Platform scripts > select the script.

**Resolution:** Fix the script error, change execution context to System if needed, or adjust exit code handling in the script configuration.

### Deployment Timeout

**Indicators:** Deployment status Failed, deployment time matches or exceeds the configured timeout value.

**Investigation:**

1. **Check timeout configuration:** Navigate to Intune admin center > Devices > Windows > Enrollment > Device preparation policies > select policy > "Minutes allowed before device preparation fails."

2. **Count total apps + scripts:** Review the total number of apps and scripts assigned to the policy. Each adds to the deployment time.

3. **Review stalled items:** Check the Apps and Scripts tabs for items still showing In progress at the time of timeout.

4. **Windows 365 devices:** For Cloud PC deployments, check if the deployment predates the February 2026 fix for the hardcoded 60-minute timeout. Deployments after February 2026 respect the configured timeout value.

**Resolution:** Increase the timeout value, reduce the app/script count, optimize app packaging for faster install times, or split apps across multiple policies.

### Deployment Stuck at 100% (Known Issue)

**Indicators:** Deployment progress shows 100% but does not transition to the "Required setup complete" screen. No error is displayed.

**Status:** Known issue as of June 2024 -- fix in progress as of research date (2026-04-12). This is a Microsoft-side issue.

**Workaround:** Manual device restart may allow the deployment to complete. If the restart does not resolve the issue, collect full diagnostics per [APv2 Log Collection Guide](06-apv2-log-collection.md) and escalate.

---

## Escalation Ceiling

If investigation using the deployment report and BootstrapperAgent logs does not identify a resolvable root cause, or if the deployment report shows an error state not covered by the scenarios above, escalate to Microsoft Premier Support with:

- Deployment report screenshot/export
- BootstrapperAgent `.evtx` export
- IME logs (ime-main, appworkload, agentexecutor)
- Device serial number
- Entra device ID
- Signing-in user UPN
- The specific status values observed (deployment status, phase, app/script statuses)

No further L2 resolution available.

---

## See Also

- [APv2 Log Collection Guide](06-apv2-log-collection.md) -- prerequisite log collection for all APv2 L2 investigations
- [APv2 Event ID Reference](07-apv2-event-ids.md) -- BootstrapperAgent event ID lookup for APv2 provisioning events
- [APv2 Failure Catalog](../error-codes/06-apv2-device-preparation.md) -- symptom-based failure scenarios with root cause analysis
- [ESP Deep-Dive](02-esp-deep-dive.md) -- APv1 (classic) ESP investigation for comparison
- [APv1 vs APv2](../apv1-vs-apv2.md) -- framework comparison and selection guidance
- [APv2 Deployment Flow](../lifecycle-apv2/02-deployment-flow.md) -- 10-step deployment process with step numbers referenced in Phase Breakdown

---

## Version History

| Date | Change |
|------|--------|
| 2026-04-12 | Initial version -- deployment report interpretation with status tables, phase breakdown, five investigation paths, known issues |
