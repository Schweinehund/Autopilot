---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: admin
platform: Windows
---

> **Version gate:** This guide expands on the compliance verification in [Post-Enrollment Verification](../lifecycle/05-post-enrollment.md) with detailed timing and state transition information.

# Compliance Policy Timing and State Transitions

Compliance evaluation does not happen instantly after enrollment. New admins frequently escalate "Not evaluated" as a failure when it is expected behavior. This guide documents the normal timing window, the three distinct compliance states, grace period configuration, and the ongoing evaluation schedule.

---

## Compliance State Timeline Post-Enrollment

| Time After Enrollment | Expected State | What Is Happening | Admin Action |
|----------------------|----------------|-------------------|--------------|
| 0–15 minutes | Not evaluated | Compliance check not yet run; Intune collecting device inventory | Wait — this is normal. Do NOT escalate. |
| 15–30 minutes | Compliant or Non-compliant | First compliance evaluation completes | If Non-compliant, investigate which policy fails |
| Up to 8 hours | Final state | Full Intune inventory sync (app status, hardware inventory) | Portal now shows complete device state |

---

## The Three Compliance States

Understanding the distinction between these three states prevents unnecessary escalations.

### 1. Not Evaluated

Expected waiting state post-enrollment. The device has enrolled but compliance policies have not yet been checked. **This is NOT a failure.**

- Appears as gray or "Unknown" in the Intune portal compliance view.
- Expected duration: 0–30 minutes post-enrollment under normal conditions.
- If persisting beyond 1 hour, investigate MDM check-in cycle (device may have lost connectivity after OOBE).

### 2. Non-Compliant

Policy evaluated and the device **fails** one or more compliance requirements. This requires investigation.

- Appears as red in the Intune portal.
- To identify which setting fails: **Intune admin center** > **Devices** > **[device name]** > **Device compliance** > review individual policy results.
- Common causes post-enrollment: OS version requirement not met, BitLocker not yet applied (see [Security Baseline Conflicts](security-baseline-conflicts.md)), password requirement not satisfied.

### 3. Compliant

Policy evaluated and the device passes all requirements. This is the healthy state.

- Appears as green in the Intune portal.
- Conditional Access policies enforcing "Require compliant device" will allow access for this device.

> **Admin Note:** "Not evaluated" and "Non-compliant" both appear as non-green states in the portal. New admins frequently confuse them. Always check the timestamp — if less than 30 minutes since enrollment, "Not evaluated" is expected behavior, not a failure requiring action.

---

## Grace Period Configuration

The grace period controls how long after a "Non-compliant" evaluation result before enforcement actions trigger.

- **Minimum grace period:** 0.25 days (6 hours)
- **Recommended for new deployments:** At least 1 day

### What Happens After the Grace Period Expires

Enforcement actions that trigger after the grace period elapses (configured in Compliance policy > Actions for noncompliance):

1. Send email notification to user
2. Send push notification to Company Portal
3. Mark device as noncompliant (enables CA enforcement)
4. Remotely lock the device
5. Retire the device

Actions are ordered and each can have its own delay. The "Mark device as noncompliant" action is what activates Conditional Access blocking.

### Grace Period Configuration Steps

1. Navigate to **Intune admin center** > **Devices** > **Compliance policies** > **[Policy name]** > **Actions for noncompliance**.
2. Locate the "Mark device noncompliant" action.
3. Set **Schedule (days after noncompliance)** to at least **1** for new deployments.

> **What breaks if misconfigured:** Grace period set to 0.25 days (minimum) with "Retire" as an enforcement action. Device enrolls, evaluates as non-compliant due to a pending Windows Update, and is auto-retired 6 hours later — before an admin can intervene. The user loses access to all corporate resources. There is no undo for retirement without re-enrolling the device.

---

## Conditional Access Integration

Compliance state feeds directly into Conditional Access enforcement:

- Once "Non-compliant" state is set **after the grace period expires**, CA policies with "Require compliant device" immediately block access for that device.
- During the "Not evaluated" window (0–30 minutes post-enrollment), CA behavior depends on the **"Mark devices with no compliance policy assigned as"** setting:
  - **Compliant** — Devices without a compliance policy (or in "Not evaluated" state) are treated as compliant. Less secure but reduces enrollment friction.
  - **Not compliant** — Default. Devices without an assigned policy or in "Not evaluated" state are treated as non-compliant. Can block enrollment if a grace period is not configured.

Cross-reference: [Conditional Access Enrollment Timing](ca-enrollment-timing.md) for the enrollment-specific chicken-and-egg problem when CA and compliance policies interact during first enrollment.

---

## Compliance Evaluation Schedule (Ongoing)

| Trigger | Evaluation Timing |
|---------|------------------|
| Automatic Intune check-in | Every 8 hours |
| Manual sync by user | Immediately — user triggers from Company Portal or **Settings** > **Accounts** > **Access work or school** > **Info** > **Sync** |
| After compliance policy change | Re-evaluation within 15 minutes of next check-in (not immediate) |
| After device restart | Triggers check-in and re-evaluation |
| After OS update | Triggers check-in within 15 minutes |

> **Admin Note:** Compliance policy changes do not immediately re-evaluate all devices. The change propagates on the next 8-hour check-in cycle for each device. If you need immediate compliance re-evaluation (e.g., after remediating a non-compliant setting), ask the user to manually sync from Company Portal.

---

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|-----------------|---------|---------|
| Grace period 0 days with retire action | Device auto-retired before admin can investigate non-compliance | Set grace period to at least 1 day; remove or delay retire action |
| "No policy" marked as non-compliant (default) | All devices without an explicit compliance policy are blocked by CA "Require compliant device" | Change default to Compliant OR assign a compliance policy to all device groups |
| Conflicting compliance policies | Device flips between Compliant and Non-compliant on consecutive evaluations | Review policy assignment scope overlap in **Devices** > **Compliance policies** > **Policy assignment** |
| Grace period too short for new deployment | Users blocked before first compliance cycle completes | Set grace period to at least 1 day during initial fleet deployment |

---

## See Also

- [Conditional Access Enrollment Timing](ca-enrollment-timing.md) — CA chicken-and-egg problem during new device enrollment
- [Security Baseline Conflicts](security-baseline-conflicts.md) — Settings that cause non-compliance post-enrollment
- [Post-Enrollment Verification](../lifecycle/05-post-enrollment.md) — Stage 5 verification checklist; "Not evaluated" vs "Non-compliant" context
