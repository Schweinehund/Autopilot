---
doc_id: RE-209
status: Approved
owner: Intune Admin Lead
doc_type: Reference
platform: Windows
last_verified: 2026-03-20
review_by: 2026-06-18
applies_to: APv1
audience: L1
---

**Platform:** Windows · **Doc Type:** Reference · **Doc ID:** RE-209 · **Status:** Approved

# Profile Assignment Failure Decision Tree

## Summary

Reference decision table for Windows Autopilot (classic APv1) profile-assignment triage. Gates on portal registration, then branches on whether a profile is assigned, whether the device is in the correct assignment group, and whether the assigned profile is correct and applied, routing each outcome to a Resolved state or an L2 escalation point with data to collect.

> **Version gate:** This guide covers Windows Autopilot (classic). For Device Preparation (APv2), see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

Use this tree to triage cases where an [Autopilot](../_glossary.md#autopilot) profile is not assigned or the wrong profile is applied to a device. It assumes the device is already registered in the Autopilot portal — if the device does not appear in the portal at all, return to initial triage. Every branch ends at a Resolved outcome or an escalation point with data to collect before handing off.

## Decision Tree

**LOCKED — 35 (nodes + labeled edges)** — 19 nodes + 16 labeled edges (plus 2 unlabeled continuation edges), independently re-derived from the pre-conversion decision graph (`git show 71be4ab`). The tree is grouped below into three stages that mirror the graph's own branch structure; each `Yes`/`No`/`Don't know` answer column is one of the graph's labeled edges — no row collapses more than one incoming edge.

### Stage 1: Registration & Assignment Gate (PRD1 → PRD2)

| Step | Question | Answer | Result |
|------|----------|--------|--------|
| 1 | Is the device registered in the Autopilot portal? (PRD1) | No | Return to Initial Triage (PRR0) |
| 1 | Is the device registered in the Autopilot portal? (PRD1) | Yes | Continue to Step 2 |
| 2 | Is an Autopilot profile assigned to the device? (PRD2) | Yes | Continue to Step 4 (correct-profile check) |
| 2 | Is an Autopilot profile assigned to the device? (PRD2) | No | Continue to Step 3 (correct-group check) |

### Stage 2: Group Membership Branch (PRD3 → PRD4)

| Step | Question | Answer | Result |
|------|----------|--------|--------|
| 3 | Is the device in the correct group for profile assignment? (PRD3) | No | Add device to the correct group (PRA1) → continue to Step 3b |
| 3 | Is the device in the correct group for profile assignment? (PRD3) | Yes - in correct group | Escalate L2: In correct group but profile not assigning (PRE2) |
| 3 | Is the device in the correct group for profile assignment? (PRD3) | Don't know | Escalate L2: Cannot verify group membership - collect details (PRE3) |
| 3b | Wait 30 minutes - is profile now assigned? (PRD4) | Yes | Resolved: Profile assigned after group correction (PRR1) |
| 3b | Wait 30 minutes - is profile now assigned? (PRD4) | No | Escalate L2: Profile still not assigned after group fix (PRE1) |

### Stage 3: Correct-Profile Branch (PRD5 → PRD6 → PRD7)

| Step | Question | Answer | Result |
|------|----------|--------|--------|
| 4 | Is it the correct profile for this device type? (PRD5) | Yes | Continue to Step 5 (applied check) |
| 4 | Is it the correct profile for this device type? (PRD5) | No - wrong profile | Escalate L2: Wrong profile assigned - admin correction needed (PRE4) |
| 4 | Is it the correct profile for this device type? (PRD5) | Don't know | Escalate L2: Cannot verify correct profile - collect details (PRE6) |
| 5 | Has the profile been applied to the device? (PRD6) | Yes | Resolved: Profile correctly assigned and applied (PRR3) |
| 5 | Has the profile been applied to the device? (PRD6) | No - status is Pending | Reboot device and wait for sync (PRA2) → continue to Step 5b |
| 5b | Is profile now applied? (PRD7) | Yes | Resolved: Profile applied after sync (PRR2) |
| 5b | Is profile now applied? (PRD7) | No | Escalate L2: Profile assigned but not applying to device (PRE5) |

## How to Check

| Node | Check | Where to Look |
|------|-------|---------------|
| PRD1 | Is the device registered in the Autopilot portal? | Intune admin center > Devices > Windows > Enrollment > Windows Autopilot devices > search by serial number. If the device appears with a status, answer Yes. If not found, answer No and return to initial triage. |
| PRD2 | Is an Autopilot profile assigned to the device? | In the device's Autopilot record: check the Profile column or open the device detail. If a profile name is shown, answer Yes. If the field is blank or shows "Not assigned," answer No. |
| PRD3 | Is the device in the correct group for profile assignment? | Intune admin center > Groups > search for the Autopilot deployment group. Open the group and check Members. If the device's serial or Entra ID object is listed, answer Yes. If not listed, answer No. If you are unsure which group the profile targets, answer Don't know. |
| PRD5 | Is it the correct profile for this device type? | Compare the profile name shown on the device Autopilot record to the expected profile for this device type (for example, "Autopilot-LaptopStandard" vs "Autopilot-Kiosk"). If the names match what IT configured for this device, answer Yes. If the names do not match or you are unsure what the correct profile should be, answer Don't know. |
| PRD6 | Has the profile been applied to the device? | On the device Autopilot record or in the Intune device overview, check the profile deployment status. "Applied" means the profile has been pushed to the device. "Pending" or no status means the profile has not yet synced. |

## Escalation Data

| ID | Scenario | Collect | See Also |
|----|----------|---------|----------|
| PRE1 | Profile still not assigned after adding to correct group | Device serial number, group name the device was added to, timestamp of group change, deployment mode, current profile status in portal | [MDM Enrollment Errors](../error-codes/01-mdm-enrollment.md) (see 0x80180005 — DeviceNotSupported); [L2 Runbooks](../l2-runbooks/00-index.md) |
| PRE2 | Device in correct group but profile not assigning | Device serial number, group name, profile name expected, timestamp, deployment mode | [MDM Enrollment Errors](../error-codes/01-mdm-enrollment.md); [L2 Runbooks](../l2-runbooks/00-index.md) |
| PRE3 | Cannot verify group membership | Device serial number, profile name shown (if any), deployment mode, timestamp | [L2 Runbooks](../l2-runbooks/00-index.md) |
| PRE4 | Wrong profile assigned to device | Device serial number, profile name currently assigned, expected profile name, deployment mode, timestamp | [L2 Runbooks](../l2-runbooks/00-index.md) |
| PRE5 | Profile assigned but not applying to device | Device serial number, profile name assigned, current profile status (Pending/Failed), deployment mode, timestamp | [MDM Enrollment Errors](../error-codes/01-mdm-enrollment.md); [L2 Runbooks](../l2-runbooks/00-index.md) |
| PRE6 | Cannot verify correct profile | Device serial number, profile name currently assigned, deployment mode, device type or role (laptop/kiosk/shared), timestamp | [L2 Runbooks](../l2-runbooks/00-index.md) |

## Resolution & Next Steps

| ID | Resolution | Next Steps |
|----|-----------|------------|
| PRR1 | Profile assigned after adding device to correct group | Proceed with OOBE or retry enrollment. Monitor in Intune portal to confirm profile applies during provisioning. See [L1 Profile Runbook](../l1-runbooks/03-profile-not-assigned.md). |
| PRR2 | Profile applied after device sync | Proceed with OOBE or retry enrollment. Confirm the correct profile name is shown as Applied before proceeding. See [L1 Profile Runbook](../l1-runbooks/03-profile-not-assigned.md). |
| PRR3 | Profile correctly assigned and applied | No further action required for profile. If device still fails provisioning, return to initial triage to identify the new failure mode. See [L1 Profile Runbook](../l1-runbooks/03-profile-not-assigned.md). |

---

[Back to Initial Triage](00-initial-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-08 | v1.16 EEE reformat — content not re-reviewed | — |
| 2026-07-08 | Phase 122 plan 03: converted Mermaid decision graph to 3 grouped C17-compliant decision tables (LOCKED — 35, nodes + labeled edges); removed the mermaid fence; all 7 decision points preserved as explicit table rows across the 3 stages. | -- |
| 2026-03-20 | Initial version | — |
