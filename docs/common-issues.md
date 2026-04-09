---
last_verified: 2026-03-23
review_by: 2026-06-21
applies_to: APv1
audience: all
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](apv1-vs-apv2.md).

# Common Windows Autopilot Issues

Symptom-based index routing to the appropriate L1 and L2 runbooks.

## Device Registration Issues

Device serial number not appearing in the [Autopilot](_glossary.md#autopilot) portal after [OOBE](_glossary.md#oobe).

- **L1:** [Device Not Registered](l1-runbooks/01-device-not-registered.md)
- **L2:** [L2 Runbook Index](l2-runbooks/00-index.md) — select runbook based on escalation checklist

## Enrollment Status Page (ESP) Failures

[ESP](_glossary.md#esp) stuck, timed out, or displaying "Something went wrong" error.

- **L1:** [ESP Stuck or Failed](l1-runbooks/02-esp-stuck-or-failed.md)
- **L2:** [ESP Deep-Dive](l2-runbooks/02-esp-deep-dive.md)

## OOBE Failures

Device stuck on [OOBE](_glossary.md#oobe) screen, blank screen during setup, or setup loops back to the beginning.

- **L1:** [OOBE Failure](l1-runbooks/05-oobe-failure.md)
- **L2:** [L2 Runbook Index](l2-runbooks/00-index.md) — select runbook based on escalation checklist

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

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-03-23 | Transformed from inline troubleshooting guide to navigation index | — |
