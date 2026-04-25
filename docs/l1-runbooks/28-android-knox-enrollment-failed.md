---
last_verified: 2026-04-25
review_by: 2026-06-24
applies_to: KME
audience: L1
platform: Android
---

> **Platform gate:** This guide covers Android enrollment/compliance troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks).

# Android Knox Mobile Enrollment Failed

L1 runbook for Knox Mobile Enrollment (KME) failures: Samsung device was expected to enroll automatically via KME but did not — device booted to consumer setup, looped back to first-time setup, or never arrived in Intune. Four L1-diagnosable causes plus Cause E (escalate-only).

**Applies to KME only (Samsung).** For non-Samsung corporate Zero-Touch enrollment failures see runbook [27 ZTE](27-android-zte-enrollment-failed.md). For non-corporate enrollment failures see ([22](22-android-enrollment-blocked.md) / [23](23-android-work-profile-not-created.md) / [24](24-android-device-not-enrolled.md) / [25](25-android-compliance-blocked.md) / [26](26-android-mgp-app-not-installed.md)).

Routed here from the [Android Triage Decision Tree](../decision-trees/08-android-triage.md) ANDR28 branch.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com) — L1 read-only
- Device serial number, IMEI, or manufacturer identifier
- Confirmation that device is Samsung manufacturer
- Portal shorthand used in this runbook:
   - **P-INTUNE** = Intune admin center Devices / Tenant admin blades
   - **P-KAP** = Knox Admin Portal (knox.samsung.com) — **admin-only**; Samsung-specific

> **L1 scope note:** Knox Admin Portal is admin-only. L1 observes Intune-side symptoms (device absence / enrollment state) and hands the packet to the admin for KAP portal actions. All Knox Admin Portal click paths in this runbook are within `## Admin Action Required` sections.

## How to Use This Runbook

Check the cause that matches your observation. Causes are independently diagnosable — you do not need to rule out prior causes. Cause ordering below reflects frequency (most common first):

- [Cause A: Samsung Knox B2B Account Approval Pending](#cause-a-b2b-account-pending) — Admin cannot sign in to Knox Admin Portal; B2B account submission still within or beyond 1-2 business day approval window
- [Cause B: Device Not in Knox Admin Portal](#cause-b-device-not-in-kap) — Reseller upload not done OR Knox Deployment App pathway not used; device serial absent from KAP Devices view
- [Cause C: KME Profile Not Assigned to Device Set](#cause-c-profile-unassigned) — Profile exists in KAP but device shows no profile assignment
- [Cause D: KME/ZT Mutual-Exclusion Conflict (Samsung)](#cause-d-kme-zt-mutex-collision) — Samsung device dual-configured in both Knox Mobile Enrollment and Zero-Touch; KME takes precedence at firmware level

If none of Causes A-D match and enrollment still fails, see [Escalation Criteria](#escalation-criteria) below for Cause E (DPC Custom JSON malformation / Knox tripped status / Knox license edge cases — admin-only investigation).
