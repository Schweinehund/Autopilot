---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: admin
platform: Windows
---

> **Version gate:** This workflow applies to both APv1 and APv2 device onboarding. Framework-specific differences are noted inline.
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# New Batch of Devices: End-to-End Operational Workflow

When a new batch of devices arrives, there is a specific sequence of steps that must be completed in order. Skipping or reordering stages — particularly powering on devices before group membership is confirmed — results in devices going through standard Windows OOBE instead of the Autopilot experience.

## Prerequisites

- Intune Administrator or Policy and Profile Manager role
- Autopilot profile already created and configured (see [APv1 Admin Setup Overview](../admin-setup-apv1/00-overview.md) or [APv2 Admin Setup Overview](../admin-setup-apv2/00-overview.md))
- Network infrastructure verified for the deployment location (see [Network Infrastructure](network-infrastructure.md))
- All required apps packaged and assigned (see [Win32 App Packaging](win32-app-packaging.md))
- Licensing confirmed for batch size (see [Licensing Matrix](licensing-matrix.md))

## End-to-End Checkpoint Workflow

| Stage | Action | Verification Checkpoint | Troubleshooting |
|-------|--------|------------------------|-----------------|
| 1. OEM Order | Include Autopilot registration in the purchase order | Confirm with OEM that hardware hashes will be submitted to your tenant | If OEM does not support Autopilot registration, plan for manual hash collection post-delivery |
| 2. Hash Collection | OEM submits hashes OR manual collection with `Get-WindowsAutoPilotInfo` | Devices appear in Intune > Devices > Windows enrollment > Devices (allow 24–48 hours for OEM submission) | If devices do not appear: verify OEM submitted to the correct tenant ID; check for duplicate serial numbers |
| 3. Group Assignment | Add devices to target Autopilot group (dynamic or static) | Group membership confirmed in Entra ID > Groups > [group] > Members | If dynamic group: verify rule matches device attributes; allow 15–30 minutes for processing |
| 4. Profile Assignment | Wait for Intune to assign the Autopilot profile | Profile status = "Assigned" in Intune > Devices > Windows enrollment > Devices (wait 15–30 minutes post-group-assignment) | If "Not assigned" after 30 minutes: see [Drift Detection](drift-detection.md) |
| 5. Staging Area | Prepare deployment location; connect devices to wired network (required for pre-provisioning) | Network connectivity test: `Test-NetConnection -ComputerName ztd.dds.microsoft.com -Port 443` passes | If fails: check firewall rules per [Network Infrastructure](network-infrastructure.md) |
| 6. Provisioning | Power on device; complete Autopilot deployment flow | Device reaches desktop; ESP shows "All apps installed" | If ESP fails: see [ESP Deep Dive](../l2-runbooks/02-esp-deep-dive.md) |
| 7. Post-Enrollment Verification | Admin verifies in Intune portal | Compliance = Compliant (allow 15–30 minutes); Apps = Installed; Profile = Assigned | If non-compliant: see [Compliance Timing](compliance-timing.md) |
| 8. User Handoff | Deliver device to end user with first-login instructions | User can sign in and access corporate resources (email, Teams, SharePoint) | If access blocked: check Conditional Access per [CA Enrollment Timing](ca-enrollment-timing.md) |

> **Critical sequence note:** Do NOT power on devices (Stage 6) before Profile Assignment is confirmed (Stage 4). A device that reaches OOBE before the profile is assigned will go through standard Windows setup instead of Autopilot. If this happens, the device must be reset before Autopilot can run.

## Pre-Batch Checklist

Complete all items before ordering or receiving a new batch:

- [ ] Autopilot profile exists and is assigned to the correct group
- [ ] All required apps are packaged and assigned as Required (see [Win32 App Packaging](win32-app-packaging.md))
- [ ] ESP timeout configured for expected app install workload (see [ESP Timeout Tuning](esp-timeout-tuning.md))
- [ ] Network infrastructure verified for the deployment location (see [Network Infrastructure](network-infrastructure.md))
- [ ] Entra ID prerequisites confirmed (see [Entra Prerequisites](entra-prerequisites.md))
- [ ] Licensing sufficient for batch size (see [Licensing Matrix](licensing-matrix.md))
- [ ] Compliance and CA policies tested to not block enrollment (see [CA Enrollment Timing](ca-enrollment-timing.md))
- [ ] For APv1: dynamic group ZTDId rule tested with at least one device before full batch
- [ ] For APv2: Enrollment Time Grouping security group configured and assigned to Device Preparation policy

## Post-Batch Review

After all devices in the batch are provisioned:

1. Check the deployment report: success rate should be above 95% (see [Deployment Reporting](deployment-reporting.md)).
2. Verify all devices show "Assigned" profile status (see [Drift Detection](drift-detection.md)).
3. Verify compliance status for all batch devices (allow 30 minutes post-deployment before checking).
4. Document any failures with error codes for process improvement.
5. Update your device inventory spreadsheet or CMDB with the new device records.

## Framework-Specific Notes

**APv1 (Windows Autopilot classic):**
- Hardware hash required before registration; OEM or manual collection with `Get-WindowsAutoPilotInfo`
- Dynamic group membership rule uses ZTDId attribute (see [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md))
- Pre-provisioning (Technician Phase) requires wired network at staging area

**APv2 (Windows Autopilot Device Preparation):**
- Corporate device identifiers used instead of hardware hash for some scenarios
- Enrollment Time Grouping security group must be configured before provisioning begins
- Check Enrollment Time Grouping Failures report after batch provisioning (Devices > Monitor)

## Verification

- [ ] All devices in batch show profile status "Assigned" before powering on
- [ ] Batch success rate above 95% confirmed in deployment report
- [ ] All devices compliant in Intune after post-enrollment window
- [ ] User handoff completed with first-login documentation provided

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Devices powered on before profile assigned | Standard Windows OOBE instead of Autopilot | Reset device; confirm profile status = Assigned before next attempt |
| OEM hash submitted to wrong tenant | Devices never appear in Intune enrollment > Devices | Verify tenant ID with OEM; re-submit hashes |
| ESP timeout too short for app workload | ESP fails with timeout error; device not fully provisioned | See [ESP Timeout Tuning](esp-timeout-tuning.md) |
| Dynamic group rule not evaluated before provisioning | No profile assigned; standard OOBE runs | Wait for group evaluation (up to 30 min); see [Drift Detection](drift-detection.md) |
| CA policy blocks newly enrolled device | User cannot access resources after provisioning | See [CA Enrollment Timing](ca-enrollment-timing.md) |

## See Also

- [Deployment Reporting](deployment-reporting.md)
- [Drift Detection and Monitoring](drift-detection.md)
- [Network Infrastructure](network-infrastructure.md)
- [Entra Prerequisites](entra-prerequisites.md)
- [Licensing Matrix](licensing-matrix.md)
- [APv1 Admin Setup Overview](../admin-setup-apv1/00-overview.md)
