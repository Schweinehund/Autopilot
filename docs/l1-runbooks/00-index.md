---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: L1
---

> **Version gate:** This index covers L1 runbooks for both Windows Autopilot (classic/APv1) and Autopilot Device Preparation (APv2).

# L1 Runbooks

Scripted procedures for the five highest-volume [Autopilot](../_glossary.md#autopilot) failure scenarios. Each runbook provides step-by-step instructions for Service Desk agents with no registry access, no PowerShell execution, and no log file analysis required. Start with the [Initial Triage Decision Tree](../decision-trees/00-initial-triage.md) to identify which runbook applies, or select directly from the list below.

## APv1 Runbooks

| # | Runbook | When to Use |
|---|---------|-------------|
| 1 | [Device Not Registered](01-device-not-registered.md) | Device serial number not found in the Autopilot portal |
| 2 | [ESP Stuck or Failed](02-esp-stuck-or-failed.md) | Enrollment Status Page is stuck, timed out, or showed an error code |
| 3 | [Profile Not Assigned](03-profile-not-assigned.md) | Device is registered but has no deployment profile or the wrong profile |
| 4 | [Network Connectivity Failure](04-network-connectivity.md) | Device cannot reach required Autopilot endpoints |
| 5 | [OOBE Fails Immediately](05-oobe-failure.md) | Device crashes, freezes, or fails before reaching ESP |

## APv2 Runbooks

Scripted procedures for APv2 Device Preparation failure scenarios. Each runbook provides portal-only instructions. Start with the [APv2 Triage Decision Tree](../decision-trees/04-apv2-triage.md) to identify which runbook applies.

| # | Runbook | When to Use |
|---|---------|-------------|
| 6 | [Deployment Not Launched](06-apv2-deployment-not-launched.md) | Device completed OOBE but Device Preparation screen never appeared |
| 7 | [Apps Not Installed](07-apv2-apps-not-installed.md) | Device Preparation completed but apps or scripts are missing or failed |
| 8 | [APv1 Registration Conflict](08-apv2-apv1-conflict.md) | ESP appeared instead of Device Preparation screen |
| 9 | [Deployment Timeout](09-apv2-deployment-timeout.md) | Device Preparation deployment timed out before completing |

## Scope

This index covers L1 runbooks for both APv1 (classic Autopilot) and APv2 (Device Preparation) deployments. For scenarios not covered here, or when a runbook's escalation criteria are met, escalate to L2 with the data collection checklist provided in each runbook.

## TPM Attestation Note

> **Note:** There is no L1 runbook for TPM attestation failures. TPM issues that are not resolved by enabling TPM in BIOS require L2 investigation. See [L2 Runbooks](../l2-runbooks/00-index.md).

## Related Resources

- [Initial Triage Decision Tree](../decision-trees/00-initial-triage.md) — Start here to identify the failure scenario
- [APv2 Triage Decision Tree](../decision-trees/04-apv2-triage.md) -- APv2 failure routing
- [ESP Failure Decision Tree](../decision-trees/01-esp-failure.md) — Detailed ESP triage flowchart
- [Profile Assignment Decision Tree](../decision-trees/02-profile-assignment.md) — Profile assignment triage flowchart
- [Master Error Code Index](../error-codes/00-index.md) — Look up any error code
- [Autopilot Glossary](../_glossary.md) — Term definitions

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-13 | Added APv2 runbook section (restored after accidental revert) | -- |
| 2026-03-20 | Initial version | — |
