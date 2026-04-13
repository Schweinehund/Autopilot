---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: APv1
audience: admin
---

> **Version gate:** This guide covers Windows Autopilot (classic).
> For Autopilot Device Preparation (APv2), see [APv2 Admin Setup Guides](../admin-setup-apv2/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# APv1 Admin Setup: Complete Configuration Guide

This guide walks Intune administrators through configuring a complete Windows Autopilot (classic) deployment from scratch. The setup must be completed in order — each step depends on the previous one being complete and correct.

> **Consider APv2:** Microsoft recommends Autopilot Device Preparation (APv2) for new deployments when requirements are met. See [APv1 vs APv2 Comparison](../apv1-vs-apv2.md) and the [decision flowchart](../apv1-vs-apv2.md#decision-flowchart) to determine if APv2 fits your scenario. **Important:** If a device has both APv1 and APv2 registrations, APv1 silently wins — the device enters the APv1 ESP flow with no error shown.

## Setup Sequence

Complete these steps in order. Each guide includes a verification checklist and a "What breaks if misconfigured" callout for every configurable setting.

```mermaid
graph LR
  A[1. Hardware<br/>Hash Upload] --> B[2. Deployment<br/>Profile]
  B --> C[3. ESP<br/>Policy]
  C --> D[4. Dynamic<br/>Groups]
  D --> E[5. Deployment<br/>Modes]
  E --> F[6-8. Mode<br/>Config]
  F --> G[9. Intune<br/>Connector]
  G --> H[10. Config<br/>Failures]
```

1. **[Hardware Hash Upload](01-hardware-hash-upload.md)** — Register devices with Windows Autopilot using OEM delivery, CSV bulk import, or PowerShell script. Includes a decision tree to choose the correct path for your scenario.

2. **[Deployment Profile](02-deployment-profile.md)** — Create and configure the Autopilot deployment profile with all OOBE settings. Every configurable setting includes a "what breaks" callout and profile conflict resolution guidance.

3. **[Enrollment Status Page (ESP) Policy](03-esp-policy.md)** — Configure the ESP policy with timeout values, app tracking list, and the critical Windows quality update setting. Includes hybrid join timeout implications and the LOB + Win32 app mixing warning.

4. **[Dynamic Device Groups](04-dynamic-groups.md)** — Create the dynamic Entra ID device group using the ZTDId membership rule. Covers sync delay expectations and profile conflict resolution between multiple profiles.

5. **[Deployment Modes Overview](05-deployment-modes-overview.md)** — Compare all three APv1 deployment modes (User-Driven, Pre-Provisioning, Self-Deploying) with prerequisites, use cases, and mode selection guidance.

6. **[User-Driven Mode](06-user-driven.md)** — Full configuration guide for user-driven deployment including hybrid Entra join setup and Intune Connector cross-reference.

7. **[Pre-Provisioning Mode](07-pre-provisioning.md)** — Full configuration guide for pre-provisioning (white glove/technician) mode. Covers TPM 2.0 prerequisite and the Win+F12 trigger sequence.

8. **[Self-Deploying Mode](08-self-deploying.md)** — Full configuration guide for self-deploying mode. Covers the mandatory TPM 2.0 and wired ethernet prerequisites and no-user-affinity implications.

9. **[Intune Connector for Active Directory](09-intune-connector-ad.md)** — Install and configure the Intune Connector for AD required for hybrid Entra join in user-driven and pre-provisioning modes. Includes the connector version gate and current log path.

10. **[Configuration-Caused Failures Reference](10-config-failures.md)** — Consolidated reverse-lookup table of all APv1 configuration mistakes across all guide files, linking to both the relevant guide and the v1.0 troubleshooting runbook.

## See Also

- [APv1 Lifecycle Overview](../lifecycle/00-overview.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)
- [APv2 Admin Setup Guides](../admin-setup-apv2/00-overview.md)

---
*Next step: [Hardware Hash Upload](01-hardware-hash-upload.md)*
