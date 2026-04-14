---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: admin
platform: Windows
---

> **Version gate:** This guide covers deployment reporting for both APv1 and APv2. APv2 reports are in a different location than APv1 — using the wrong portal path shows no data. Always confirm which framework the device uses first.
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# Intune Deployment Reporting for Windows Autopilot

Deployment reports let admins verify provisioning outcomes, investigate failures, and track fleet health over time. Autopilot provides separate report locations for APv1 and APv2 — a common mistake is checking the wrong location and concluding no data exists.

## Prerequisites

- Intune Administrator, Policy and Profile Manager, or Read Only Operator role in Intune
- Devices enrolled in Windows Autopilot (APv1 or APv2)
- For APv2: Enrollment time grouping security group configured (see [APv2 Admin Setup Overview](../admin-setup-apv2/00-overview.md))

## Report Types

| Report | Portal Path | Framework | History | Key Details |
|--------|-------------|-----------|---------|-------------|
| Windows Autopilot deployments | Intune admin center > Devices > Monitor > Windows Autopilot deployments | APv1 | 30 days | Filterable by status; shows per-device deployment outcome |
| APv2 deployment status | Intune admin center > Devices > Monitor > Windows Autopilot device preparation deployments | APv2 | Near real-time | Download diagnostic logs for failed deployments directly from report |
| Enrollment time grouping failures | Intune admin center > Devices > Monitor > Enrollment time grouping failures | APv2 | Updated within 20 minutes of failure | Shows devices that failed to join the Enrollment Time Grouping security group |
| Group policy migration readiness | Intune admin center > Reports > Device management > Group policy analytics | Both | Persistent | Per-GPO MDM support percentage; see [GPO-to-Intune Migration](gpo-to-intune.md) |

## Understanding Deployment Status

| Status | Meaning | Admin Action |
|--------|---------|-------------|
| Successful | Device completed provisioning and passed ESP | None — healthy state |
| Failed | Error occurred during any provisioning stage | Investigate: check error code, review ESP logs, check profile assignment |
| In progress | Provisioning ongoing | Wait — check back in 60 minutes. If still "in progress" after 2 hours, likely hung |
| Abandoned | User powered off or reset device mid-provisioning | Appears in "Failed" bucket. Reattempt provisioning — this is not a configuration issue |

## Steps

### Step 1: Navigate to APv1 Deployment Report

1. Navigate to **Intune admin center** > Devices > Monitor > **Windows Autopilot deployments**.
2. Filter by date range (default: last 30 days).
3. Filter by **Status**: Failed to focus on devices requiring investigation.
4. Click an individual device to view the deployment timeline with per-phase timestamps.

   > **What breaks if misconfigured:** If you check this report for APv2 devices, you will see no data. APv2 devices report to a completely different portal location. This is a frequent source of confusion during incidents. Confirm the device framework before investigating.

### Step 2: Navigate to APv2 Deployment Report

1. Navigate to **Intune admin center** > Devices > Monitor > **Windows Autopilot device preparation deployments**.
2. Near real-time status updates (no 30-day limit concept — refreshes continuously).
3. For failed deployments: click **Download diagnostics** to retrieve the full diagnostic bundle.
4. Review the enrollment time grouping section for APv2-specific failures.

   > **What breaks if misconfigured:** Admin looks at APv1 report location for APv2 devices — sees no data. APv2 reports are in a DIFFERENT portal location. Always confirm which framework the device uses first.
   > See: [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)

### Step 3: Check Enrollment Time Grouping Failures (APv2)

1. Navigate to **Intune admin center** > Devices > Monitor > **Enrollment time grouping failures**.
2. Updated within 20 minutes of failure — shows devices that could not join the ETG security group.
3. Common causes: incorrect group configuration, Entra ID processing delays, or missing ETG group assignment to the Device Preparation policy.

### Step 4: Export Report Data

1. On any report page, click **Export**.
2. Download in CSV format: device name, serial number, status, error code, timestamps.
3. Use exported data for weekly fleet health reviews, incident tracking, or trend analysis over time.

   > **Note:** The APv1 report retains only 30 days of history. Export regularly if you need longer retention for trend tracking or compliance auditing.

## Success Rate Interpretation

Use deployment success rate as a fleet health indicator. Calculate by dividing Successful count by (Successful + Failed), excluding Abandoned:

| Success Rate | Fleet Health | Recommended Action |
|-------------|-------------|-------------------|
| Above 95% | Healthy deployment environment | Monitor regularly; no intervention needed |
| 85–95% | Investigate failures | Check for a specific device model or configuration issue affecting a subset of hardware |
| Below 85% | Systematic problem | Check network infrastructure, Entra ID configuration, or profile settings — widespread cause likely |

> **Note:** "Abandoned" deployments inflate the raw failure rate. Filter out Abandoned status when calculating the true failure rate for configuration health assessment.

## Verification

- [ ] Can access APv1 deployment report at Devices > Monitor > Windows Autopilot deployments
- [ ] Can access APv2 deployment report at Devices > Monitor > Windows Autopilot device preparation deployments
- [ ] Can export report data as CSV
- [ ] Enrollment time grouping failures report accessible for APv2 environments

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Looking at APv1 reports for APv2 devices | No deployment data visible | Navigate to APv2 report location: Devices > Monitor > Windows Autopilot device preparation deployments |
| 30-day history expired | Cannot find old deployments | Export reports regularly for long-term tracking |
| APv2 ETG group not configured | Devices appear in Enrollment time grouping failures report | See [APv2 Admin Setup Overview](../admin-setup-apv2/00-overview.md) |

## See Also

- [Drift Detection and Monitoring](drift-detection.md)
- [New Batch of Devices Workflow](new-batch-workflow.md)
- [Post-Enrollment Verification](../lifecycle/05-post-enrollment.md)
- [GPO-to-Intune Migration](gpo-to-intune.md)
