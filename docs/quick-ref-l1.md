---
last_verified: 2026-03-23
review_by: 2026-06-21
applies_to: APv1
audience: L1
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](apv1-vs-apv2.md).

# L1 Quick-Reference Card

## Top 5 Checks

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

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-03-23 | Initial version | — |
