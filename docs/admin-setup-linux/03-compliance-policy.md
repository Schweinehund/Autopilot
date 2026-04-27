---
last_verified: 2026-04-27
review_by: 2026-06-26
applies_to: enrollment
audience: admin
platform: Linux
---

> **Platform gate:** This guide covers configuration of Intune compliance policies for Linux devices (Ubuntu 22.04/24.04 LTS) across the 4 supported settings-catalog categories.
> For Linux provisioning terminology, see the [Linux Provisioning Glossary](../_glossary-linux.md).
> For the locked Linux management surface, see [Linux Enrollment Overview](../linux-lifecycle/00-enrollment-overview.md#supported-management-surface).

# Linux Compliance Policy — Admin Configuration

> ⚠️ **Architecture callout — compliance reporting is NOT a Conditional Access grant on Linux:** A Linux device that reports `compliant` via an Intune compliance policy does NOT receive Conditional-Access-level access grants. The CA grant control `Require device to be marked as compliant` is **not available** on Linux — the only CA enforcement path on Linux is web-app CA via Microsoft Edge for Linux 102.x+. Compliance policy on Linux is **detect-only** (it produces a compliance verdict admins can monitor and use for reporting), not enforce-grant.
>
> See [Conditional Access](05-conditional-access.md) and [Linux Capability Matrix — Conditional Access](../reference/linux-capability-matrix.md#conditional-access) for the architectural detail.

## Compliance vs. Configuration: Critical Distinction

| Action | Compliance Policy | Configuration Profile |
|--------|------------------|-----------------------|
| Verify a setting | Yes (detect-only on Linux) | n/a — Linux has no MDM configuration profile concept in Intune |
| Enforce a setting | n/a | n/a |

**Note for Linux admins:** Linux differs from Windows/macOS — there is no MDM configuration profile concept. Compliance policies are detect-only; enforcement is via custom-compliance Bash discovery scripts that REPORT a verdict (the script does not push a fix; it returns compliant/non-compliant). For tenant-side CA enforcement, see the PITFALL-2 architecture callout above and [Conditional Access](05-conditional-access.md).

## Prerequisites

- Intune Administrator role
- Linux devices enrolled and reporting healthy in Intune
- Understanding that compliance policy on Linux is detect-only (no enforcement counterpart)
- Review of [Linux Enrollment Overview](../linux-lifecycle/00-enrollment-overview.md#supported-management-surface) for the locked management surface

## Steps

### Step 1: Create the Linux Compliance Policy

#### In Intune admin center

1. Navigate to **Devices > Compliance > Policies > Create Policy**
2. Platform: **Linux**
3. Enter a policy name (e.g., `Linux-Baseline-Compliance`) and description
4. Click **Create**

### Step 2: Configure Allowed Distributions

Linux compliance policy restricts which Ubuntu LTS distributions are considered compliant. This maps to the Phase 49 prerequisite whitelist for Ubuntu 22.04 LTS and 24.04 LTS.

#### In Intune admin center

1. In the policy settings, locate **Allowed Distributions**
2. Add the supported Ubuntu LTS distributions:
   - `Ubuntu` (operator: `Equals`) with version constraints for 22.04 LTS
   - `Ubuntu` (operator: `Equals`) with version constraints for 24.04 LTS
3. Devices running an unlisted distribution or version will report non-compliant

> **What breaks if misconfigured:** If the Allowed Distribution list excludes the Ubuntu version running on your enrolled devices, those devices will immediately report non-compliant. Symptom appears in: Intune admin center (device shows non-compliant status with distribution mismatch reason).
> See: [31-linux-compliance-non-compliant.md](../l1-runbooks/31-linux-compliance-non-compliant.md)

### Step 3: Configure Custom Compliance (Bash Discovery Scripts)

Custom compliance on Linux uses admin-authored Bash discovery scripts to evaluate device state against org-defined rules. The script returns a compliance verdict; Intune surfaces compliant or non-compliant based on the script exit code and output.

**Concept-level summary (Bash deep-dive deferred to v1.5.1 LIN-DEFER-01):**
- Admin authors a Bash script that checks a specific setting (e.g., SSH configuration, antivirus status, file permissions)
- Script outputs a JSON-formatted verdict and exits 0 (compliant) or 1 (non-compliant)
- Intune delivers the script to enrolled Linux devices and evaluates the result
- The script does NOT push a fix — it reports the current compliance state

#### In Intune admin center

1. Navigate to **Devices > Linux > Compliance policies > Scripts > Add**
2. Upload the Bash discovery script and the corresponding JSON compliance rules file
3. Assign the script to your compliance policy
4. Assign the compliance policy to the target device group

> **What breaks if misconfigured:** A Bash script with a syntax error will cause compliance evaluation to fail (the script exits non-zero for reasons unrelated to the compliance check). The device may show a compliance evaluation error rather than compliant/non-compliant. Symptom appears in: Intune admin center (compliance evaluation failure, not a clean non-compliant verdict).
> See: [31-linux-compliance-non-compliant.md](../l1-runbooks/31-linux-compliance-non-compliant.md)

### Step 4: Configure Device Encryption (dm-crypt + LUKS)

Linux full-disk encryption compliance check verifies that the device storage is encrypted using dm-crypt with LUKS (Linux Unified Key Setup). This is the standard Linux full-disk encryption surface.

For terminology, see [Linux Glossary — dm-crypt](../_glossary-linux.md#dm-crypt) and [Linux Glossary — LUKS](../_glossary-linux.md#luks).

#### In Intune admin center

1. In the compliance policy settings, locate **Device Encryption**
2. Set **Require encryption of data storage on device** to **Require**
3. Intune checks that LUKS-based encryption is active on the device's storage

> **What breaks if misconfigured:** If Device Encryption is required but the device was enrolled without encryption enabled, it will report non-compliant immediately. Remediation requires re-imaging the device with encryption enabled — there is no in-place LUKS encryption path for a running system without data loss risk. Symptom appears in: Intune admin center (non-compliant for encryption).
> See: [31-linux-compliance-non-compliant.md](../l1-runbooks/31-linux-compliance-non-compliant.md)

### Step 5: Configure Password Policy

Linux compliance policy can enforce password settings including minimum length, complexity requirements, and lock interval.

#### In Intune admin center

1. In the compliance policy settings, locate **Password Policy**
2. Configure the applicable settings:
   - **Minimum password length** (recommended: 8 or more characters)
   - **Password complexity** (require non-alphanumeric characters, mixed case, etc.)
   - **Maximum minutes of inactivity before screen locks**
   - **Number of previous passwords to prevent reuse**
3. Devices that do not meet the password requirements will report non-compliant

> **What breaks if misconfigured:** Password-policy thresholds that exceed what is configured on the device baseline will cause devices to report non-compliant immediately. Symptom appears in: Intune admin center (non-compliant for password policy).
> See: [31-linux-compliance-non-compliant.md](../l1-runbooks/31-linux-compliance-non-compliant.md)

### Step 6: Configure Actions for Noncompliance

Configure what happens when a device is found non-compliant:

- **Mark device noncompliant:** Immediately or after a configurable grace period
- **Send email to end user:** Notification about the non-compliant status
- **Retire the noncompliant device** (use with caution — irreversible without re-enrollment)

### Step 7: Assign the Compliance Policy

Assign the policy to device groups or user groups as appropriate. Start with a test group containing a small set of Linux devices before broad deployment.

## Conditional Access Cross-Reference

> Compliance policy on Linux is **detect-only** — a compliant verdict does NOT automatically unlock CA grants. For the Linux Conditional Access workflow (web-app CA via Microsoft Edge for Linux 102.x+), see [Conditional Access](05-conditional-access.md). For the capability comparison, see [Linux Capability Matrix — Compliance](../reference/linux-capability-matrix.md#compliance) and [Linux Capability Matrix — Conditional Access](../reference/linux-capability-matrix.md#conditional-access).

## Verification

- [ ] Compliance policy created and saved in Intune admin center
- [ ] Policy assigned to a test group (Linux devices only)
- [ ] Test device reports a compliance verdict (compliant or non-compliant — not "evaluation pending" indefinitely)
- [ ] Non-compliant devices show specific failing settings (not just a generic non-compliant state)
- [ ] Allowed Distributions setting matches the Ubuntu LTS versions deployed in your org
- [ ] If custom-compliance Bash script used: script exits successfully and verdict is reported

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| Allowed Distribution excludes user's distro version | Intune admin center | Device reports non-compliant | [31-linux-compliance-non-compliant.md](../l1-runbooks/31-linux-compliance-non-compliant.md) |
| Custom-compliance Bash script syntax error | Intune admin center | Compliance evaluation fails (not clean non-compliant) | [31-linux-compliance-non-compliant.md](../l1-runbooks/31-linux-compliance-non-compliant.md) |
| Password-policy threshold exceeds device baseline | Intune admin center | Device reports non-compliant immediately | [31-linux-compliance-non-compliant.md](../l1-runbooks/31-linux-compliance-non-compliant.md) |
| Admin expects CA enforcement from compliance verdict | Entra portal | No CA grant — see PITFALL-2 architecture callout above | [32-linux-ca-blocking-web-access.md](../l1-runbooks/32-linux-ca-blocking-web-access.md) |

## See Also

- [Conditional Access](05-conditional-access.md)
- [Linux Capability Matrix — Compliance](../reference/linux-capability-matrix.md#compliance)
- [Linux Capability Matrix — Conditional Access](../reference/linux-capability-matrix.md#conditional-access)
- [Linux Glossary — web-app CA](../_glossary-linux.md#web-app-ca)
- (Phase 51 runbook) [31-linux-compliance-non-compliant.md](../l1-runbooks/31-linux-compliance-non-compliant.md)
- (Phase 51 runbook) [32-linux-ca-blocking-web-access.md](../l1-runbooks/32-linux-ca-blocking-web-access.md)

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-27 | Initial version — Linux compliance policy + PITFALL-2 architectural callout (Phase 50) | -- |
