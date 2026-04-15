---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: L2
platform: all
---

> **Version gate:** This index covers both Windows Autopilot (classic/APv1) and Autopilot Device Preparation (APv2) L2 runbooks.
> APv1 runbooks are listed first, followed by APv2 runbooks.
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

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

---

## APv2 (Autopilot Device Preparation) Runbooks

> **Version gate:** The runbooks below cover Windows Autopilot Device Preparation (APv2).
> For APv1 (classic Autopilot) runbooks, see the tables above.

The [APv2 Log Collection Guide](06-apv2-log-collection.md) is a **prerequisite for all APv2 investigation runbooks** -- collect BootstrapperAgent event log and IME logs before beginning any investigation. The deployment report in the Intune admin center is the APv2 equivalent of registry-based ESP investigation.

### When to Use

| Runbook | When to Use | Prerequisite |
|---------|-------------|--------------|
| [APv2 Log Collection Guide](06-apv2-log-collection.md) | Before starting any APv2 L2 investigation -- collect BootstrapperAgent log and IME logs | None |
| [APv2 Event ID Reference](07-apv2-event-ids.md) | Looking up BootstrapperAgent event IDs to identify failure type | [APv2 Log Collection](06-apv2-log-collection.md) |
| [APv2 Deployment Report Guide](08-apv2-deployment-report.md) | Interpreting the Intune APv2 deployment report -- status values, phase breakdown, failure identification | [APv2 Log Collection](06-apv2-log-collection.md) |

### APv2 L1 Escalation Mapping

| L1 Escalation Node IDs | Source Scenario | L2 Runbook |
|------------------------|-----------------|------------|
| APE1 | Entra join failed | [APv2 Deployment Report Guide](08-apv2-deployment-report.md) |
| APE2 | Enrollment failed | [APv2 Deployment Report Guide](08-apv2-deployment-report.md) |
| APE3 | IME or infrastructure failure | [APv2 Deployment Report Guide](08-apv2-deployment-report.md) + [APv2 Event ID Reference](07-apv2-event-ids.md) |

> **Note:** When a ticket arrives via L1 escalation, the escalation checklist from the L1 runbook specifies which data was collected. Each APv2 L2 runbook opens with a triage block that routes "from L1 escalation" paths to skip initial data collection steps.

---

## macOS ADE Runbooks

> **Version gate:** The runbooks below cover macOS Automated Device Enrollment (ADE) via Intune.
> For Windows Autopilot runbooks, see the tables above.

The [macOS Log Collection Guide](10-macos-log-collection.md) is a **prerequisite for all macOS L2 investigation runbooks** -- collect IntuneMacODC diagnostic package and targeted Terminal artifacts before beginning any investigation.

### When to Use

| Runbook | When to Use | Prerequisite |
|---------|-------------|--------------|
| [macOS Log Collection Guide](10-macos-log-collection.md) | Before starting any macOS L2 investigation -- collect IntuneMacODC zip and Terminal diagnostic outputs | None |
| [Profile Delivery Investigation](11-macos-profile-delivery.md) | Configuration profile not delivered, showing error/conflict, or not taking effect on device | [macOS Log Collection](10-macos-log-collection.md) |
| [App Install Failure Diagnosis](12-macos-app-install.md) | DMG, PKG, or VPP app not installing, showing failed status, or continuous reinstall loop | [macOS Log Collection](10-macos-log-collection.md) |
| [Compliance Evaluation Investigation](13-macos-compliance.md) | Device non-compliant, compliance not evaluating, or Conditional Access blocking despite compliance | [macOS Log Collection](10-macos-log-collection.md) |

### macOS L1 Escalation Mapping

| L1 Runbook Source | L2 Runbook |
|-------------------|------------|
| Setup Assistant / Enrollment issues | [Profile Delivery Investigation](11-macos-profile-delivery.md) for profile-related escalation; general enrollment issues reviewed case-by-case |
| Configuration profile not applied | [Profile Delivery Investigation](11-macos-profile-delivery.md) |
| App not installed | [App Install Failure Diagnosis](12-macos-app-install.md) |
| Compliance / access blocked | [Compliance Evaluation Investigation](13-macos-compliance.md) |
| Company Portal sign-in failure | [Compliance Evaluation Investigation](13-macos-compliance.md) for Entra registration issues |

> **Note:** When a ticket arrives via macOS L1 escalation, the escalation checklist from the L1 runbook specifies: serial number, macOS version, Intune device status screenshot, and description of steps attempted. Each macOS L2 runbook opens with a triage block that routes "from L1 escalation" paths to skip initial data collection steps.

## Related Resources

- [L1 Runbooks](../l1-runbooks/00-index.md) — scripted Service Desk procedures for the five highest-volume Autopilot failures
- [Error Code Index](../error-codes/00-index.md) — master error code lookup covering ESP, TPM, hybrid join, pre-provisioning, and profile assignment errors
- [Decision Trees](../decision-trees/00-initial-triage.md) — L1 triage flowcharts; escalation terminal IDs in these trees map to L2 runbooks above
- [APv2 Failure Catalog](../error-codes/06-apv2-device-preparation.md) — symptom-based APv2 failure index organized by deployment phase
- [APv2 Triage Decision Tree](../decision-trees/04-apv2-triage.md) — APv2 L1 triage flowchart; APE1/APE2/APE3 escalation nodes map to APv2 L2 runbooks above
- [macOS ADE Triage Decision Tree](../decision-trees/06-macos-triage.md) -- macOS L1 triage flowchart
- [macOS Terminal Commands Reference](../reference/macos-commands.md) -- canonical macOS diagnostic command reference
- [macOS Log Paths Reference](../reference/macos-log-paths.md) -- macOS log path and configuration profile locations

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Added macOS ADE runbook section | -- |
| 2026-04-13 | Added APv2 runbook section (restored after accidental revert) | -- |
| 2026-03-21 | Initial version | — |
