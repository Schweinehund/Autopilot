---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: all
---

> **Framework coverage:** This guide covers both Windows Autopilot (classic/APv1) and Autopilot Device Preparation (APv2) issues.
> APv1 and APv2 sections are labeled separately. Not sure which applies? See [APv1 vs APv2](apv1-vs-apv2.md).

# Common Windows Autopilot Issues

> **Not sure which framework?** If you don't know whether the device is using APv1 (classic) or APv2 (Device Preparation), see [APv1 vs APv2](apv1-vs-apv2.md) to identify the framework before selecting a runbook.

Symptom-based index routing to the appropriate L1 and L2 runbooks.

**Framework:** APv1 (classic)

## Device Registration Issues

Device serial number not appearing in the [Autopilot](_glossary.md#autopilot) portal after [OOBE](_glossary.md#oobe).

- **L1:** [Device Not Registered](l1-runbooks/01-device-not-registered.md)
- **L2:** [L2 Runbook Index](l2-runbooks/00-index.md) — select runbook based on escalation checklist

## Enrollment Status Page (ESP) Failures

[ESP](_glossary.md#esp) stuck, timed out, or displaying "Something went wrong" error.

- **L1:** [ESP Stuck or Failed](l1-runbooks/02-esp-stuck-or-failed.md)
- **L2:** [ESP Deep-Dive](l2-runbooks/02-esp-deep-dive.md)

## Profile Assignment Issues

Device goes through manual setup instead of Autopilot, or wrong profile assigned.

- **L1:** [Profile Not Assigned](l1-runbooks/03-profile-not-assigned.md)
- **L2:** [L2 Runbook Index](l2-runbooks/00-index.md) — L2 selects runbook based on symptom

## TPM Attestation Failures

TPM attestation fails during pre-provisioning or self-deploying mode.

- **L1:** [L1 Runbook Index](l1-runbooks/00-index.md#tpm-attestation-note) — no L1 runbook; escalate to L2
- **L2:** [TPM Attestation Investigation](l2-runbooks/03-tpm-attestation.md)

## Network Connectivity Issues

Device cannot reach required Autopilot endpoints; timeouts during enrollment.

- **L1:** [Network Connectivity Failure](l1-runbooks/04-network-connectivity.md)
- **Escalation:** Infrastructure/Network team (not L2 Desktop Engineering)

## Policy Conflicts

Reboot loops, autologon failures, or ESP hangs caused by conflicting policies.

- **L1:** [ESP Stuck or Failed](l1-runbooks/02-esp-stuck-or-failed.md) — policy conflicts manifest as ESP failures at L1
- **L2:** [Policy Conflict Analysis](l2-runbooks/05-policy-conflicts.md)

## Hybrid Join Failures

Device not appearing in both on-premises AD and Azure AD after Autopilot provisioning.

- **L1:** [L1 Runbook Index](l1-runbooks/00-index.md) — escalate to L2 with domain details
- **L2:** [Hybrid Join Investigation](l2-runbooks/04-hybrid-join.md)

## Device Renamed but Old Name Persists

Old device name shows in Intune or Azure AD after Autopilot rename.

> **Tip:** This is typically a sync delay — allow up to 24 hours for the name to propagate through Azure AD Connect and Intune. If the naming template in the Autopilot profile is correct and 24 hours have passed, force a device sync from the Intune portal.

---

## APv2 Failure Scenarios

**Framework:** APv2 (Device Preparation)

### Deployment Experience Never Launched

Device completed OOBE and reached the desktop, but the APv2 Device Preparation deployment experience never appeared.

- **L1:** [Deployment Not Launched](l1-runbooks/06-apv2-deployment-not-launched.md)
- **L2:** [APv2 Log Collection](l2-runbooks/06-apv2-log-collection.md) + [APv2 Deployment Report](l2-runbooks/08-apv2-deployment-report.md)

### Apps or Scripts Not Installed

Device Preparation deployment completed but required apps or scripts are missing, failed to install, or were skipped.

- **L1:** [Apps Not Installed](l1-runbooks/07-apv2-apps-not-installed.md)
- **L2:** [APv2 Log Collection](l2-runbooks/06-apv2-log-collection.md) + [APv2 Event ID Reference](l2-runbooks/07-apv2-event-ids.md)

### ESP Appeared Instead of Device Preparation

The Enrollment Status Page (ESP) appeared during OOBE instead of the APv2 Device Preparation experience, indicating an APv1 registration conflict.

- **L1:** [APv1 Registration Conflict](l1-runbooks/08-apv2-apv1-conflict.md)
- **L2:** [APv2 Log Collection](l2-runbooks/06-apv2-log-collection.md) + [APv2 Deployment Report](l2-runbooks/08-apv2-deployment-report.md)

### Deployment Timed Out

Device Preparation deployment started but timed out before all apps and scripts completed installation.

- **L1:** [Deployment Timeout](l1-runbooks/09-apv2-deployment-timeout.md)
- **L2:** [APv2 Log Collection](l2-runbooks/06-apv2-log-collection.md) + [APv2 Event ID Reference](l2-runbooks/07-apv2-event-ids.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-13 | Added APv2 Failure Scenarios section with framework labels | — |
| 2026-03-23 | Transformed from inline troubleshooting guide to navigation index | — |
