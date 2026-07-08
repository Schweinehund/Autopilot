---
doc_id: RE-076
status: Approved
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: APv1
audience: admin
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-076 · **Status:** Approved

# APv1 Admin Setup: Complete Configuration Guide

## Summary

This guide is the index for the complete APv1 (Windows Autopilot classic) admin configuration sequence, spanning hardware hash upload through deployment profile, ESP policy, dynamic groups, deployment mode selection, connector installation, and the configuration-failures reverse-lookup reference. It is intended for Intune administrators standing up or auditing an APv1 deployment from scratch, and each linked stage must be completed in order since later steps depend on earlier ones being correctly configured.

> **Version gate:** This guide covers Windows Autopilot (classic).
> For Autopilot Device Preparation (APv2), see [APv2 Admin Setup Guides](../admin-setup-apv2/00-overview.md).

> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

This guide walks Intune administrators through configuring a complete Windows Autopilot (classic) deployment from scratch. The setup must be completed in order -- each step depends on the previous one being correct. If you are starting a new deployment and are unsure which framework to use, see the [APv1 vs APv2 decision flowchart](../apv1-vs-apv2.md#which-guide-do-i-use) before proceeding.

> **Consider APv2:** Microsoft recommends Autopilot Device Preparation (APv2) for new deployments when requirements are met.

> See [APv1 vs APv2 Comparison](../apv1-vs-apv2.md) and the [decision flowchart](../apv1-vs-apv2.md#which-guide-do-i-use) to determine if APv2 fits your scenario.

> **Important:** If a device has both APv1 and APv2 registrations, APv1 silently wins -- the device enters the APv1 ESP flow with no error shown.

## Setup Sequence

Complete these steps in order. Each guide includes a verification checklist and a "What breaks if misconfigured" callout for every configurable setting.

(LOCKED — 8 nodes + labeled edges: chained sequence, no diamonds)

1. Hardware Hash Upload
2. Deployment Profile
3. ESP Policy
4. Dynamic Groups
5. Deployment Modes
6. Mode Config (steps 6-8)
7. Intune Connector
8. Config Failures

Full detail for each stage:

1. **[Hardware Hash Upload](01-hardware-hash-upload.md)** -- Register devices by uploading hardware hashes via OEM delivery, CSV bulk import, or PowerShell script. This must be complete before any profile can be assigned.

2. **[Deployment Profile](02-deployment-profile.md)** -- Create and configure the Autopilot deployment profile with OOBE settings, join type, and user account type.

3. **[Enrollment Status Page Policy](03-esp-policy.md)** -- Configure the ESP to control app installation tracking, timeout behavior, and the new Windows quality update setting.

4. **[Dynamic Device Groups](04-dynamic-groups.md)** -- Create Entra ID dynamic device groups using ZTDId membership rules for profile and policy targeting.

5. **[Deployment Modes Overview](05-deployment-modes-overview.md)** -- Compare all three APv1 deployment modes (user-driven, pre-provisioning, self-deploying) and select the right one for your scenario.

6. **[User-Driven Mode](06-user-driven.md)** -- Full configuration guide for user-driven deployments including hybrid Entra join setup.

7. **[Pre-Provisioning Mode](07-pre-provisioning.md)** -- Full configuration guide for pre-provisioning (white glove) deployments with TPM 2.0 and wired ethernet requirements.

8. **[Self-Deploying Mode](08-self-deploying.md)** -- Full configuration guide for self-deploying (kiosk/shared) deployments with no user affinity.

9. **[Intune Connector for Active Directory](09-intune-connector-ad.md)** -- Install and configure the connector required for hybrid Entra join deployments.

10. **[Configuration-Caused Failures Reference](10-config-failures.md)** -- Consolidated reverse-lookup table of all APv1 configuration mistakes with links to guide files and troubleshooting runbooks.

## See Also

- [APv1 Lifecycle Overview](../lifecycle/00-overview.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)
- [APv2 Admin Setup Guides](../admin-setup-apv2/00-overview.md)

---
*Next step: [Hardware Hash Upload](01-hardware-hash-upload.md)*

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-08 | v1.16 EEE reformat — content not re-reviewed | — |