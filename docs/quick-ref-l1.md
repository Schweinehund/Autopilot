---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: L1
---

> **Framework coverage:** This card covers both Windows Autopilot (classic/APv1) and Autopilot Device Preparation (APv2).
> APv1 and APv2 sections are labeled. See [APv1 vs APv2](apv1-vs-apv2.md) for framework selection.

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

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-13 | Added APv2 quick-reference section | -- |
| 2026-03-23 | Initial version | — |
