---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: admin
platform: Windows
---

> **Version gate:** This guide covers monitoring Autopilot registration and profile assignment health for both APv1 and APv2.
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# Registration and Profile Assignment Drift Detection

Autopilot deployments can silently drift out of a healthy state after initial registration. Profile assignments can become "Not assigned," hardware changes trigger "Fix pending" states, and stale registrations accumulate. Proactive monitoring catches these issues before devices reach OOBE in a broken state.

## Prerequisites

- Intune Administrator or Policy and Profile Manager role
- Regular access to the Intune admin center (minimum weekly review cadence)
- For APv1: familiarity with ZTDId dynamic group membership rules (see [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md))
- For APv2: Enrollment Time Grouping security group configured

## Profile Assignment States

| State | Meaning | Expected Duration | Admin Action |
|-------|---------|-------------------|-------------|
| Not assigned | Device registered but no profile matched | Investigate immediately | Check group membership; verify dynamic group rule syntax (APv1: ZTDId-based, APv2: corporate identifiers) |
| Assigning | Profile match found, assignment in progress | Up to 30 minutes | Wait. If still "Assigning" after 30 minutes, investigate group sync delays. |
| Assigned | Normal healthy state | Permanent (until deregistered) | None — device is correctly configured |
| Fix pending | Hardware change detected on device; Intune attempting to re-register | Hours to days | If persists >24 hours: check if device hardware hash changed (motherboard/drive replacement). May need to deregister and re-register. |

> **What breaks if misconfigured:** Dynamic group rule has a typo in the ZTDId attribute name (for example, `device.physicalIds -any _ -eq "[ZTDid]"` — note wrong casing). Devices never match the group. Profile stays "Not assigned." Devices go through manual OOBE instead of Autopilot.
> See: [Dynamic Device Groups for Autopilot](../admin-setup-apv1/04-dynamic-groups.md)

## Proactive Monitoring Procedures

### Weekly Check: Profile Assignment Status

1. Navigate to **Intune admin center** > Devices > Windows enrollment > **Devices**.
2. Sort by the **Profile status** column.
3. Filter for **Not assigned** and **Fix pending**.
4. For each affected device: check group membership, verify profile target groups, confirm ZTDId rule syntax for APv1 or corporate identifiers for APv2.

### Weekly Check: Enrollment Anomalies

1. Navigate to deployment reports (see [Deployment Reporting](deployment-reporting.md)).
2. Filter for failures in the last 7 days.
3. Group by error code to identify patterns.
4. Check if the failure pattern correlates with a recent policy or group rule change.

### Monthly Check: Stale Registrations

1. Export the device list from **Intune admin center** > Devices > Windows enrollment > **Devices**.
2. Compare against your active device inventory (serial numbers).
3. Devices in the Autopilot registry but not in active inventory = stale records.
4. Deregister stale devices to prevent ghost profile assignments and to keep registration counts accurate for capacity planning.

## Remediation Steps

| Issue | Remediation |
|-------|-------------|
| Profile not assigned after 30 minutes | Check group membership; verify ZTDId rule syntax for APv1 or corporate identifiers for APv2; force group sync in Entra ID |
| Fix pending for >24 hours | Deregister device from Autopilot; re-collect hardware hash; re-register; reassign to target group |
| Assigning stuck >1 hour | Check Intune service health; retry by removing and re-adding device to the target Autopilot group |
| Multiple devices suddenly "Not assigned" | Check if the dynamic group rule was recently modified; check Entra ID group processing health dashboard |

## Proactive Tools

- **Intune Endpoint Analytics:** Device health scores, setup times, and common issues across the fleet. Path: Intune admin center > Reports > **Endpoint analytics**.
- **Scheduled CSV exports:** Export device list with profile assignment status weekly for trend tracking. Compare week-over-week to catch slow drift before it becomes an incident.
- **Intune built-in reports:** ESP progress tracking per device (Devices > Monitor). Useful for catching stuck in-progress provisioning sessions.

## Verification

- [ ] Weekly profile assignment status check completed with no "Not assigned" or "Fix pending" items outstanding
- [ ] Monthly stale registration check completed and deregistrations performed as needed
- [ ] Endpoint Analytics dashboard reviewed for fleet-wide enrollment health trends

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| ZTDId rule syntax error | All devices show "Not assigned" profile status | Check and correct dynamic group rule; see [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md) |
| Azure AD Premium license missing | Dynamic group membership silently does not evaluate | [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md) |
| Hardware change not handled | Device stuck in "Fix pending" for multiple days | Deregister device, re-collect hardware hash, re-register |
| Stale registrations in tenant | Ghost profile assignments; unexpected device targeting | Monthly cleanup: export and compare against active inventory |

## See Also

- [Deployment Reporting](deployment-reporting.md)
- [New Batch of Devices Workflow](new-batch-workflow.md)
- [Dynamic Device Groups for Autopilot](../admin-setup-apv1/04-dynamic-groups.md)
- [Profile Assignment Lifecycle Stage](../lifecycle/02-profile-assignment.md)
