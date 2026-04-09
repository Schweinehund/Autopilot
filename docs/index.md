---
last_verified: 2026-03-23
review_by: 2026-06-21
applies_to: APv1
audience: both
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](apv1-vs-apv2.md).

# Windows Autopilot Documentation

Troubleshooting and investigation guides for [Windows Autopilot](_glossary.md#autopilot) deployments. Choose your path below.

## Service Desk (L1)

| Resource | When to Use |
|----------|-------------|
| [Initial Triage Decision Tree](decision-trees/00-initial-triage.md) | Start here — identifies the failure scenario and routes to the correct runbook |
| [ESP Failure Decision Tree](decision-trees/01-esp-failure.md) | Enrollment Status Page stuck, timed out, or showing an error code |
| [Profile Assignment Decision Tree](decision-trees/02-profile-assignment.md) | Device registered but no profile assigned or wrong profile |
| [TPM Attestation Decision Tree](decision-trees/03-tpm-attestation.md) | Pre-provisioning [TPM](_glossary.md#tpm) attestation failure |
| [L1 Runbooks](l1-runbooks/00-index.md) | Scripted procedures for the five highest-volume failure scenarios |
| [L1 Quick-Reference Card](quick-ref-l1.md) | One-page cheat sheet — top checks and escalation triggers |

## Desktop Engineering (L2)

| Resource | When to Use |
|----------|-------------|
| [L2 Investigation Runbooks](l2-runbooks/00-index.md) | Technical investigation guides with registry, PowerShell, and event log analysis |
| [Log Collection Guide](l2-runbooks/01-log-collection.md) | Prerequisite for all L2 investigations — collect diagnostic package first |
| [PowerShell Reference](reference/powershell-ref.md) | All 12 diagnostic and remediation functions with syntax and examples |
| [Registry Paths](reference/registry-paths.md) | Autopilot-relevant registry locations with confidence ratings |
| [Network Endpoints](reference/endpoints.md) | Required endpoints with test commands |
| [L2 Quick-Reference Card](quick-ref-l2.md) | One-page cheat sheet — commands, log paths, event IDs |

## Shared References

| Resource | Description |
|----------|-------------|
| [Autopilot Glossary](_glossary.md) | Terminology definitions ([OOBE](_glossary.md#oobe), [ESP](_glossary.md#esp), TPM, ZTD, APv1, APv2) |
| [Error Code Index](error-codes/00-index.md) | Master error code lookup with deployment-mode tagging |
| [Lifecycle Overview](lifecycle/00-overview.md) | End-to-end deployment sequence with flow diagrams |
| [APv1 vs APv2](apv1-vs-apv2.md) | Framework selection — which docs apply to which mode |
| [Common Issues Index](common-issues.md) | Symptom-based router to L1 and L2 runbooks |
| [System Architecture](architecture.md) | Three-tier design overview (PowerShell modules, FastAPI backend, React frontend) |

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-03-23 | Initial version | — |
