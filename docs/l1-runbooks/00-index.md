---
last_verified: 2026-03-20
review_by: 2026-06-18
applies_to: APv1
audience: L1
---

> **Version gate:** This guide covers Windows Autopilot (classic). For Device Preparation (APv2), see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# L1 Runbooks

Scripted procedures for the five highest-volume [Autopilot](../_glossary.md#autopilot) failure scenarios. Each runbook provides step-by-step instructions for Service Desk agents with no registry access, no PowerShell execution, and no log file analysis required. Start with the [Initial Triage Decision Tree](../decision-trees/00-initial-triage.md) to identify which runbook applies, or select directly from the list below.

## Runbooks

| # | Runbook | When to Use |
|---|---------|-------------|
| 1 | [Device Not Registered](01-device-not-registered.md) | Device serial number not found in the Autopilot portal |
| 2 | [ESP Stuck or Failed](02-esp-stuck-or-failed.md) | Enrollment Status Page is stuck, timed out, or showed an error code |
| 3 | [Profile Not Assigned](03-profile-not-assigned.md) | Device is registered but has no deployment profile or the wrong profile |
| 4 | [Network Connectivity Failure](04-network-connectivity.md) | Device cannot reach required Autopilot endpoints |
| 5 | [OOBE Fails Immediately](05-oobe-failure.md) | Device crashes, freezes, or fails before reaching ESP |

## Scope

These runbooks cover [Windows Autopilot](../_glossary.md#autopilot) classic (APv1) deployments only. For scenarios not covered here, or when a runbook's escalation criteria are met, escalate to L2 with the data collection checklist provided in each runbook.

## TPM Attestation Note

> **Note:** There is no L1 runbook for TPM attestation failures. TPM issues that are not resolved by enabling TPM in BIOS require L2 investigation. See [L2 Runbooks](../l2-runbooks/) (available after Phase 6).

## Related Resources

- [Initial Triage Decision Tree](../decision-trees/00-initial-triage.md) — Start here to identify the failure scenario
- [ESP Failure Decision Tree](../decision-trees/01-esp-failure.md) — Detailed ESP triage flowchart
- [Profile Assignment Decision Tree](../decision-trees/02-profile-assignment.md) — Profile assignment triage flowchart
- [Master Error Code Index](../error-codes/00-index.md) — Look up any error code
- [Autopilot Glossary](../_glossary.md) — Term definitions

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-03-20 | Initial version | — |
