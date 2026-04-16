---
last_verified: 2026-04-15
review_by: 2026-07-14
applies_to: both
audience: L1
platform: all
---

> **Platform coverage:** This card covers Windows Autopilot (classic/APv1), Autopilot Device Preparation (APv2), and macOS ADE.
> Sections are labeled by platform/framework. See [APv1 vs APv2](apv1-vs-apv2.md) for Windows framework selection or [Windows vs macOS](windows-vs-macos.md) for cross-platform.

# L1 Quick-Reference Card

## Top 5 Checks

**Framework:** APv1 (classic)

1. **Device in portal?** — Intune > Devices > Windows > Enrollment > [Windows Autopilot](_glossary.md#autopilot) devices — search by serial number
2. **Profile assigned?** — Same portal page, Profile column shows "Assigned" (not blank or "Not assigned")
3. **Endpoints reachable?** — From device browser, navigate to `https://login.microsoftonline.com` — page loads without error
4. **[ESP](_glossary.md#esp) past expected time?** — Device phase: >30 min stuck. User phase: >60 min stuck.
5. **Error code on screen?** — Look up in [Error Code Index](error-codes/00-index.md)

## Escalation Triggers

- Serial confirmed correct, device not in portal → **Escalate L2** (collect: serial number, hardware hash screenshot, tenant ID)
- ESP stuck at same point after one restart AND over time threshold → **Escalate L2** (collect: error code if visible, screenshot, time elapsed)
- Error code not in lookup table or L1 action did not resolve → **Escalate L2** (collect: exact error code, screenshot)
- Device in correct group, profile still not assigned after 30 min → **Escalate L2** (collect: device serial, group name, expected profile name)
- Wrong profile assigned → **Escalate L2** (collect: current profile name, expected profile name)
- Cannot reach login.microsoftonline.com or Autopilot endpoints → **Escalate Infrastructure/Network** (NOT L2)
- OOBE fails a second time with same symptoms → **Escalate L2** (collect: exact error, screenshot, number of attempts)
- Blue screen or Windows recovery mode → **Escalate L2** (collect: stop code if visible, device model)

## Decision Trees

- [Initial Triage](decision-trees/00-initial-triage.md) — start here
- [ESP Failure](decision-trees/01-esp-failure.md)
- [Profile Assignment](decision-trees/02-profile-assignment.md)
- [TPM Attestation](decision-trees/03-tpm-attestation.md)

## Runbooks

- [Device Not Registered](l1-runbooks/01-device-not-registered.md)
- [ESP Stuck or Failed](l1-runbooks/02-esp-stuck-or-failed.md)
- [Profile Not Assigned](l1-runbooks/03-profile-not-assigned.md)
- [Network Connectivity Failure](l1-runbooks/04-network-connectivity.md)
- [OOBE Fails Immediately](l1-runbooks/05-oobe-failure.md)
- [Error Code Index](error-codes/00-index.md)

---

## APv2 Quick Reference

**Framework:** APv2 (Device Preparation)

### Top 3 Checks

1. **Device Preparation experience appeared?** -- After OOBE sign-in, the deployment experience screen should launch automatically. If the desktop appeared instead, the device may not be targeted by a Device Preparation policy.
2. **Apps and scripts installing?** -- During the deployment experience, apps and scripts should show progress. If items show as "Failed" or "Skipped," check the Device Preparation policy configuration in Intune.
3. **Deployment report status?** -- Intune admin center > Devices > Monitor > Device preparation deployments -- check the device's deployment status for errors.

### APv2 Escalation Triggers

- Desktop appeared instead of deployment experience after OOBE sign-in --> **Escalate L2** (collect: device serial, Intune deployment report screenshot)
- ESP appeared instead of deployment experience --> **Check for APv1 registration conflict** using [APv1 Conflict runbook](l1-runbooks/08-apv2-apv1-conflict.md)
- Deployment experience timed out --> **Escalate L2** (collect: device serial, deployment report, time elapsed)
- Apps showing "Failed" or "Skipped" in deployment experience --> **Escalate L2** (collect: app names, deployment report screenshot)

### APv2 Decision Tree

- [APv2 Device Preparation Triage](decision-trees/04-apv2-triage.md) -- start here for APv2 failures

### APv2 Runbooks

- [Deployment Not Launched](l1-runbooks/06-apv2-deployment-not-launched.md)
- [Apps Not Installed](l1-runbooks/07-apv2-apps-not-installed.md)
- [APv1 Registration Conflict](l1-runbooks/08-apv2-apv1-conflict.md)
- [Deployment Timeout](l1-runbooks/09-apv2-deployment-timeout.md)

---

## macOS ADE Quick Reference

**Platform:** macOS ADE (Automated Device Enrollment)

### Top Checks

1. **Device in ABM?** -- Apple Business Manager > Devices -- search by serial number, verify MDM server assignment shows your Intune MDM server name
2. **Device in Intune?** -- Intune admin center > Devices > macOS -- search by serial number, check enrollment status
3. **Enrollment profile assigned?** -- Intune > Devices > Enrollment > Apple > Enrollment program tokens > [token] > Profiles -- verify profile is assigned to the device
4. **Compliance state?** -- Intune > Devices > macOS > [device] > Device compliance -- check for "Compliant" or review non-compliant settings

### macOS Escalation Triggers

- Serial in ABM but device not in Intune after 24 hours --> **Escalate L2** (collect: serial number, ABM MDM server assignment screenshot, Intune enrollment status)
- Setup Assistant stuck or authentication failure after one retry --> **Escalate L2** (collect: serial number, screenshot of error, macOS version)
- Configuration profile not applied after 4-hour sync wait and manual sync --> **Escalate L2** (collect: serial number, expected profile name, Intune device compliance screenshot)
- App showing "Failed" in Intune after reinstall attempt --> **Escalate L2** (collect: app name, app type, Intune app install status screenshot)
- Device non-compliant but user believes settings are correct --> **Escalate L2** (collect: non-compliant setting names, device serial)

### macOS Decision Tree

- [macOS ADE Triage](decision-trees/06-macos-triage.md) -- start here for macOS ADE failures

### macOS Runbooks

- [Device Not Appearing](l1-runbooks/10-macos-device-not-appearing.md)
- [Setup Assistant Failed](l1-runbooks/11-macos-setup-assistant-failed.md)
- [Profile Not Applied](l1-runbooks/12-macos-profile-not-applied.md)
- [App Not Installed](l1-runbooks/13-macos-app-not-installed.md)
- [Compliance / Access Blocked](l1-runbooks/14-macos-compliance-access-blocked.md)
- [Company Portal Sign-In](l1-runbooks/15-macos-company-portal-sign-in.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-15 | Added macOS ADE Quick Reference section with top checks, escalation triggers, and runbook links | -- |
| 2026-04-13 | Added APv2 quick-reference section | -- |
| 2026-03-23 | Initial version | — |
