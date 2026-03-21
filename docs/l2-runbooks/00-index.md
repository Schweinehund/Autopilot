---
last_verified: 2026-03-21
review_by: 2026-06-19
applies_to: APv1
audience: L2
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# L2 Investigation Runbooks

Technical investigation guides for Desktop Engineers handling complex [Autopilot](../_glossary.md#apv1) failures that require registry access, [PowerShell](../reference/powershell-ref.md) execution, and event log analysis.

The [Log Collection Guide](01-log-collection.md) is a **prerequisite for all investigation runbooks** — collect a complete diagnostic package before beginning any investigation. Individual runbooks direct you to which specific logs and registry keys to examine once collection is complete.

## When to Use

| Runbook | When to Use | Prerequisite |
|---------|-------------|--------------|
| [Log Collection Guide](01-log-collection.md) | Before starting any L2 investigation — collect diagnostic package first (mdmdiagnosticstool cab, 4 event log exports, registry snapshot) | None |
| [ESP Deep-Dive](02-esp-deep-dive.md) | [ESP](../_glossary.md#esp) stuck, timed out, or failed with error code; device phase or user phase issues; app install conflicts during provisioning | [Log Collection Guide](01-log-collection.md) |
| [TPM Attestation Investigation](03-tpm-attestation.md) | [TPM attestation](../_glossary.md#tpm-attestation) failure during [pre-provisioning](../_glossary.md#pre-provisioning) or self-deploying mode; hardware-specific TPM errors | [Log Collection Guide](01-log-collection.md) |
| [Hybrid Join Investigation](04-hybrid-join.md) | Hybrid Azure AD join failure; [ODJ](../_glossary.md#odj) Connector errors; domain join issues (0x80070774) | [Log Collection Guide](01-log-collection.md) |
| [Policy Conflict Analysis](05-policy-conflicts.md) | Reboot loops, autologon failures, ESP hangs caused by conflicting policies (AppLocker CSP, DeviceLock, Security Baseline) | [Log Collection Guide](01-log-collection.md) |

## L1 Escalation Mapping

L2 runbooks receive escalations from L1 decision trees. Each L1 escalation terminal carries a node ID that maps to the appropriate L2 runbook:

| L1 Escalation Node IDs | Source Scenario | L2 Runbook |
|------------------------|-----------------|------------|
| ESE1, ESE2, ESE3, ESE4, ESE5 | ESP stuck, timed out, or error code during provisioning | [ESP Deep-Dive](02-esp-deep-dive.md) |
| TPE1, TPE2, TPE3, TPE4, TPE5 | TPM attestation failures during pre-provisioning or self-deploying | [TPM Attestation Investigation](03-tpm-attestation.md) |
| PRE1, PRE2, PRE3, PRE4, PRE5, PRE6 | Profile assignment failures, sync issues, group membership delays | Investigate using [ESP Deep-Dive](02-esp-deep-dive.md) or [Policy Conflict Analysis](05-policy-conflicts.md) based on symptom |
| TRE3, TRE4, TRE5, TRE6 | Initial triage escalations — select runbook based on specific symptom from escalation checklist | Use When-to-Use table above |

> **Note:** When a ticket arrives via L1 escalation, the escalation checklist from the L1 runbook specifies which data was collected. Each L2 runbook opens with a triage block that routes "from L1 escalation" paths to skip initial data collection steps.

## Related Resources

- [L1 Runbooks](../l1-runbooks/00-index.md) — scripted Service Desk procedures for the five highest-volume Autopilot failures
- [Error Code Index](../error-codes/00-index.md) — master error code lookup covering ESP, TPM, hybrid join, pre-provisioning, and profile assignment errors
- [Decision Trees](../decision-trees/00-initial-triage.md) — L1 triage flowcharts; escalation terminal IDs in these trees map to L2 runbooks above

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-03-21 | Initial version | — |
