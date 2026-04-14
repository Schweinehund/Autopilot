---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: all
platform: Windows
---

# Reference Documentation

Technical reference documents for Windows Autopilot configuration, security, migration, and monitoring. For the deployment pipeline, see [Autopilot Lifecycle Overview](../lifecycle/00-overview.md). For post-deployment operations, see [Device Operations](../device-operations/00-overview.md).

## Existing References

- [Network Endpoints](endpoints.md) — Required URLs for Autopilot connectivity with test commands
- [PowerShell Reference](powershell-ref.md) — PowerShell cmdlets for Autopilot diagnostics and remediation
- [Registry Paths](registry-paths.md) — Key registry locations for Autopilot state inspection

## Infrastructure Prerequisites

- [Network Infrastructure](network-infrastructure.md) — Firewall rules, VPN split-tunnel, proxy configuration for Autopilot (WINF-01)
- [Entra ID Prerequisites](entra-prerequisites.md) — Required Entra ID settings with per-setting consequence documentation (WINF-02)
- [Licensing Matrix](licensing-matrix.md) — Which SKUs enable which Autopilot features (WINF-03)
- [Win32 App Packaging](win32-app-packaging.md) — Detection rules, install order, ESP tracking for reliable app deployment (WINF-04)
- [ESP Timeout Tuning](esp-timeout-tuning.md) — Scenario-based timeout recommendations (WINF-05)

## Security and Compliance

- [Conditional Access Enrollment Timing](ca-enrollment-timing.md) — The compliance chicken-and-egg problem and resolution (WSEC-01)
- [Security Baseline Conflicts](security-baseline-conflicts.md) — Which baseline settings conflict with Autopilot enrollment (WSEC-02)
- [Compliance Policy Timing](compliance-timing.md) — Evaluation schedule, grace periods, state transitions (WSEC-03)

## Migration Guides

- [APv1-to-APv2 Migration](apv1-apv2-migration.md) — Coexistence playbook with readiness checklist (WMIG-01)
- [Imaging to Autopilot](imaging-to-autopilot.md) — MDT/SCCM to Autopilot transition guide (WMIG-02)
- [GPO to Intune](gpo-to-intune.md) — Group Policy Analytics workflow with outcome-based mapping (WMIG-03)

## Monitoring and Operations

- [Deployment Reporting](deployment-reporting.md) — Intune report types, success rate interpretation (WMON-01)
- [Drift Detection](drift-detection.md) — Profile assignment monitoring and remediation (WMON-02)
- [New Batch Workflow](new-batch-workflow.md) — End-to-end device onboarding with checkpoint verification (WMON-03)

---

## Version History

| Date | Change |
|------|--------|
| 2026-04-13 | Initial version — organizes all Phase 21 reference files by sub-domain |
