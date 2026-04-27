---
last_verified: 2026-04-27
review_by: 2026-06-26
applies_to: enrollment
audience: admin
platform: Linux
---

> **Platform gate:** This guide covers admin-side configuration of Linux device enrollment in Intune (license verification, optional CA scoping). Linux enrollment on Ubuntu 22.04/24.04 LTS is user-initiated only; there is no admin-driven push enrollment.
> For end-user enrollment steps (install Edge, install intune-portal deb, sign in), see [Linux Intune Portal Enrollment](../end-user-guides/linux-intune-portal-enrollment.md).
> For Linux provisioning terminology, see the [Linux Provisioning Glossary](../_glossary-linux.md).

# Linux Enrollment Profile — Admin Configuration

This guide covers admin-side configuration required to enable Linux device enrollment in Intune: licensing verification, optional user-affinity scoping via enrollment restrictions, and optional Conditional Access scoping.

> **For end users:** Personal-device or self-enrolling users follow [Linux Intune Portal Enrollment](../end-user-guides/linux-intune-portal-enrollment.md). This guide covers admin-side enrollment configuration only.

## Prerequisites

- Intune license assigned to user (Microsoft Intune Plan 1, EMS E3/E5, or M365 with Intune)
- Microsoft Entra ID P1 minimum (P2 if risk-based Conditional Access policies will scope to Linux devices)
- Ubuntu 22.04 LTS or 24.04 LTS target hosts with GNOME desktop environment
- Microsoft Edge for Linux 102.x+ available (required for web-app CA; see [Conditional Access](05-conditional-access.md))
- Intune Linux Agent (`intune-portal` deb) installed on device before enrollment (see [Intune Linux Agent](01-intune-linux-agent.md))

## Steps

### Step 1: Verify Intune + Entra licensing

#### In Intune admin center

1. Navigate to **Tenant administration** > **Microsoft Intune licenses**.
2. Confirm the test user has an active Intune license (Microsoft Intune Plan 1, EMS E3/E5, or M365 with Intune).
3. For CA-scoping in Step 3, confirm Entra ID P1 (P2 for risk-based CA).

> **What breaks if misconfigured:** Without an Intune license assigned, the user cannot complete sign-in in the Intune Portal app — enrollment fails at the Intune sign-in step.
> Symptom appears in: Intune Portal app on device (sign-in error).
> See: [Linux Enrollment Failed](../l1-runbooks/30-linux-enrollment-failed.md)

### Step 2: (Optional) Configure user-affinity scoping via enrollment restrictions

#### In Intune admin center

1. Navigate to **Devices** > **Enrollment** > **Enrollment device platform restrictions**.
2. Select or create a restriction policy for **Linux**.
3. To restrict enrollment to specific user groups:
   - Set **Platform** to **Linux**.
   - Set **Minimum OS version** and **Maximum OS version** as required (e.g., minimum 22.04).
   - Assign the restriction policy to the target user group.
4. Note: Linux enrollment is user-initiated only; there is no Autopilot-style admin-driven push enrollment profile for Linux.

> **What breaks if misconfigured:** If an enrollment restriction policy blocks the user (e.g., wrong OS version range or user not in assigned group), the user cannot complete enrollment — the Intune Portal app returns an enrollment-blocked error.
> Symptom appears in: Intune Portal app on device (enrollment blocked at sign-in).
> See: [Linux Enrollment Failed](../l1-runbooks/30-linux-enrollment-failed.md)

### Step 3: (Optional) Scope a Conditional Access policy to Linux

#### In Entra portal

1. Navigate to **Microsoft Entra ID** > **Protection** > **Conditional Access** > **Policies**.
2. Create or edit a CA policy. Under **Cloud apps or actions**, select the target apps (e.g., Microsoft 365 apps, or specific web apps accessed via Edge).
3. Under **Conditions** > **Device platforms**, select **Linux**.
4. Under **Grant**, do NOT use **Require device to be marked as compliant** — this grant condition is not available for Linux devices. Use **Require multi-factor authentication** or other available grant controls.

   > **What breaks if misconfigured:** Selecting **Require device to be marked as compliant** as the grant control on a CA policy targeting Linux will block all Linux device access — Linux does not support device-level CA grant enforcement. Use web-app CA via Edge instead.
   > See: [Conditional Access](05-conditional-access.md) — web-app CA via Edge architectural callout.
   > See: [Linux CA Blocking Web Access](../l1-runbooks/32-linux-ca-blocking-web-access.md)

5. Assign the policy to the target user group.

## Verification

- [ ] Target user has an active Intune license visible in **Tenant administration** > **Microsoft Intune licenses**
- [ ] Enrollment restriction policy (if configured) is saved and shows the Linux platform with correct OS version range
- [ ] Enrollment restriction policy (if configured) is assigned to the correct user group
- [ ] CA policy (if configured) is saved and shows **Linux** as a targeted device platform
- [ ] CA policy (if configured) does NOT use **Require device to be marked as compliant** grant for Linux
- [ ] After a test user completes enrollment, the device appears in **Devices** > **Linux** in Intune admin center

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| User missing Intune license | Intune admin center | Sign-in fails in Intune Portal app on device | [30-linux-enrollment-failed.md](../l1-runbooks/30-linux-enrollment-failed.md) |
| Enrollment restriction blocks user | Intune admin center | Enrollment blocked at sign-in in Intune Portal app | [30-linux-enrollment-failed.md](../l1-runbooks/30-linux-enrollment-failed.md) |
| CA policy uses device-compliance grant on Linux | Entra portal | All Linux device web-app access denied via Edge | [32-linux-ca-blocking-web-access.md](../l1-runbooks/32-linux-ca-blocking-web-access.md) |
| CA policy excludes Linux but org expects coverage | Entra portal | Edge web-app access granted without expected CA controls | [32-linux-ca-blocking-web-access.md](../l1-runbooks/32-linux-ca-blocking-web-access.md) |

## See Also

- [Intune Linux Agent](01-intune-linux-agent.md) — install the intune-portal deb
- [Compliance Policy](03-compliance-policy.md)
- [Conditional Access](05-conditional-access.md) — web-app CA via Edge
- [Linux Capability Matrix](../reference/linux-capability-matrix.md)
- [Linux Intune Portal Enrollment (end-user guide)](../end-user-guides/linux-intune-portal-enrollment.md)
- [Linux Prerequisites](../linux-lifecycle/01-linux-prerequisites.md)

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-27 | Initial version — Linux enrollment profile admin configuration (Phase 50) | -- |
