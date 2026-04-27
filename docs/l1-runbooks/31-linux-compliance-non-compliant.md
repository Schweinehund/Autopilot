---
last_verified: 2026-04-27
review_by: 2026-06-26
applies_to: all
audience: L1
platform: Linux
---

> **Platform gate:** This guide covers Linux Intune client troubleshooting (Ubuntu 22.04/24.04 LTS). For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks). For Android, see [Android L1 Runbooks](00-index.md#android-l1-runbooks).

# Linux Compliance Non-Compliant

L1 runbook for Linux endpoints (Ubuntu 22.04/24.04 LTS) where compliance evaluation is reporting `Not compliant`. Four distinct causes are diagnosed independently:

- **Cause A:** Distro version out of supported range (not Ubuntu 22.04 or 24.04 LTS)
- **Cause B:** Disk not encrypted (LUKS/dm-crypt absent)
- **Cause C:** Password policy not met (passwd not set or complexity insufficient)
- **Cause D:** Custom-compliance Bash discovery script reporting non-compliant

Routed here from the [Linux Triage Decision Tree](../decision-trees/09-linux-triage.md) LINR31 branch.

> **L1 scope note:** L1 Triage Steps in this runbook are read-only checks. State-changing remediation (kernel upgrade, LUKS rewrap, password change, custom-script update) appears ONLY in the per-cause `### Admin Action Required` sections. Causes A/B/C are portal-first per Phase 51 D-15 — the L1 starts in Intune > P-09 to read the failing setting; user-side terminal commands are informational diagnostic only.

## Prerequisites

- Access to Intune admin center (`https://intune.microsoft.com`) with Help Desk Operator or Read Only Operator role (read-only for compliance data)
- Device serial number or User UPN
- For per-setting compliance behavior, see [Linux Compliance Policy Admin Guide](../admin-setup-linux/03-compliance-policy.md).
- Portal shorthand used in this runbook:
   - **P-09** = `Devices > All devices > [device] > Device compliance` (compliance state view; per-setting failing-list visible here)
   - **P-COMP** = the Linux compliance policy assigned to the user's group (found via `Endpoint security > Device compliance > [policy name]`)

## How to Use This Runbook

Check the cause that matches the failing setting visible in P-09. Causes are independently diagnosable — you do not need to rule out prior causes.

- [Cause A: Distro Version Out of Range](#cause-a-distro-version-out-of-range) — failing setting references "Minimum Linux version" or "Supported distribution"
- [Cause B: Disk Not Encrypted](#cause-b-disk-not-encrypted) — failing setting references "Encryption of data storage on device" or "Disk encryption"
- [Cause C: Password Policy Not Met](#cause-c-password-policy-not-met) — failing setting references "Require a password" or "Minimum password length"
- [Cause D: Custom-Compliance Failure](#cause-d-custom-compliance-failure) — failing setting references a custom compliance script or detection by name

If none matches, proceed directly to [Escalation Criteria](#escalation-criteria).

Common ticket phrasings: "my device shows non-compliant," "Intune says my Linux laptop isn't allowed," "compliance policy says my disk isn't encrypted," "my custom compliance script keeps failing."

---

## Cause A: Distro Version Out of Range {#cause-a-distro-version-out-of-range}

> See [Ubuntu LTS](../_glossary-linux.md#ubuntu-lts) for the supported distribution baseline; [GA kernel](../_glossary-linux.md#ga-kernel) and [HWE kernel](../_glossary-linux.md#hwe-kernel) for the kernel-channel distinction; [Linux compliance settings](../_glossary-linux.md#linux-compliance-settings) for the per-setting catalog.

**Entry condition:** P-09 shows compliance state "Not compliant" with a failing setting referencing the Linux distro version (e.g., "Minimum Linux version: Ubuntu 22.04; Device version: 20.04") or "Supported distribution" mismatch.

### Symptom

- P-09 failing setting: "Minimum Linux version" or "Supported distribution"
- Device runs an unsupported Ubuntu version (anything other than 22.04 or 24.04 LTS) OR a non-Ubuntu distro
- User may report "I'm on the latest Ubuntu but Intune says it's not supported" — the user may be on a non-LTS interim release

### L1 Triage Steps

1. > **Say to the user:** "Let me confirm which Linux version your device is running. Please open Terminal and type: `lsb_release -a`. Read me the Description and Release lines."
2. Compare against the supported baseline (Ubuntu 22.04 LTS or Ubuntu 24.04 LTS). Interim releases (23.04, 23.10, etc.) and non-Ubuntu distros are not supported.
3. Ask the user to also run `cat /etc/os-release` if `lsb_release` is not installed (some minimal Ubuntu cloud images omit `lsb_release`).
4. Ask the user to read me their kernel version: `uname -r`. Note whether the kernel suffix indicates GA (e.g., `5.15.0-generic`) or HWE (e.g., `6.8.0-generic` on 22.04 = HWE channel) — this disambiguates kernel-channel-specific compliance failures.

### Admin Action Required

**Ask the admin to:**

- Confirm the user's device is intended to run a supported Ubuntu LTS version (22.04 or 24.04). If the device is on an interim release or a non-Ubuntu distro, the only remediation is migration to a supported LTS.
- If the user is on 22.04 GA but the policy requires the HWE kernel channel (or vice versa), advise the kernel channel switch via `apt install linux-generic-hwe-22.04` (HWE) or kernel-pinning rollback (GA) — this is admin-executed, not L1.
- Review the assigned compliance policy (P-COMP) in Intune for the actual minimum version requirement.

**Verify:**

- After the user upgrades to a supported LTS or switches kernel channels: P-09 transitions to "Compliant" within the next compliance evaluation cycle (approximately 15–30 minutes after device check-in).

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

### Escalation (within Cause A)

- User cannot migrate distro version (hardware locked to interim release, or organizational policy blocks LTS upgrade)
- Compliance policy minimum cannot be lowered to accommodate the device

---

## Cause B: Disk Not Encrypted {#cause-b-disk-not-encrypted}

> See [LUKS](../_glossary-linux.md#luks) for the encryption framework; [dm-crypt](../_glossary-linux.md#dm-crypt) for the kernel mapper backing LUKS; [Linux compliance settings](../_glossary-linux.md#linux-compliance-settings) for the per-setting catalog.

**Entry condition:** P-09 shows "Not compliant" with a failing setting referencing disk encryption (e.g., "Encryption of data storage on device" or "Disk encryption").

### Symptom

- P-09 failing setting: "Encryption of data storage on device" or "Disk encryption"
- Device's root or home filesystem is not LUKS/dm-crypt encrypted
- User may report "I never set up disk encryption" or "I picked the no-encryption option at install"

### L1 Triage Steps

1. > **Say to the user:** "I'll start by reading the Intune compliance setting that flagged your device. While I do that, you can confirm encryption status on your end."
2. Open P-09 and confirm the failing setting is a disk-encryption check. This cause is portal-first — the authoritative signal is P-09's failing-setting label, not user-side filesystem inspection.
3. (Optional, informational) Ask the user to run `lsblk -f` and look for `crypto_LUKS` in the FSTYPE column on their root or home partition. If absent, the disk is not LUKS-encrypted — confirms the portal signal.
4. Note that LUKS cannot be added in-place to an existing unencrypted root filesystem without a full disk migration (typically a reinstall) — this drives the escalation path.

### Admin Action Required

**Ask the admin to:**

- Review the assigned compliance policy (P-COMP) and confirm whether disk encryption is required for the user's group.
- If encryption is required and the device is not encrypted, schedule a full-device reinstall with the LUKS option enabled at install time (Ubuntu installer offers "Encrypt the new Ubuntu installation for security" at the partitioning step).
- Coordinate with the user on data backup before reinstall — LUKS rewrap on an existing root is a non-trivial migration, not an L1 action.

**Verify:**

- After the user's device is reinstalled with LUKS enabled and re-enrolled: P-09 transitions to "Compliant" within the next compliance evaluation cycle.

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

### Escalation (within Cause B)

- User cannot reinstall (data preservation requirement without backup, or hardware-locked installer)
- Disk encryption is enabled (LUKS volumes visible in `lsblk -f`) but P-09 still flags the setting as failing — indicates a detection mismatch; route to L2

---

## Cause C: Password Policy Not Met {#cause-c-password-policy-not-met}

> See [Linux compliance settings](../_glossary-linux.md#linux-compliance-settings) for the per-setting catalog.

**Entry condition:** P-09 shows "Not compliant" with a failing setting referencing password policy (e.g., "Require a password to unlock device" or "Minimum password length").

### Symptom

- P-09 failing settings include one or more of: "Require a password to unlock device," "Minimum password length," "Password complexity"
- User may have set a passwordless login (no `passwd` set) or a passcode below the policy minimum

### L1 Triage Steps

1. > **Say to the user:** "I'm checking the password requirement that your device is failing. Please open Terminal and type: `passwd --status`. Read me the second field — it will be `P` if a password is set, `NP` if not, or `L` if locked."
2. This cause is portal-first — the authoritative signal is P-09's failing-setting label. The user-side `passwd --status` is informational and confirms whether a passwd entry exists at all.
3. If the second field is `NP` or `L`, the user has no working password — this is the upstream cause.
4. If the field is `P` but P-09 still flags the password setting, the password is set but does not meet the policy length/complexity minimum.

### Admin Action Required

**Ask the admin to:**

- Review the assigned compliance policy (P-COMP) for the password-policy length and complexity requirements.
- Coordinate with the user to set or update their account password to meet the policy minimum (the user runs `passwd` interactively at their own terminal — this is a user action, not admin-executed).
- If the user's account legitimately uses passwordless login (kiosk-style scenarios), determine whether the compliance policy must enforce passwords for this user's group or whether a different policy assignment is appropriate.

**Verify:**

- After the user sets a compliant password: P-09 transitions to "Compliant" within the next compliance evaluation cycle (approximately 15–30 minutes after device check-in).

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

### Escalation (within Cause C)

- User sets a compliant password (per their own report) but P-09 continues to flag the setting after 60 minutes
- Password policy requirement cannot be relaxed, but the user's role legitimately requires passwordless login (kiosk-style)

---

## Cause D: Custom-Compliance Failure {#cause-d-custom-compliance-failure}

> See [/var/log/intune-update.log](../_glossary-linux.md#varlogintune-updatelog) for the custom-compliance script log path; [journalctl](../_glossary-linux.md#journalctl) for the systemd journal reader; [Linux compliance settings](../_glossary-linux.md#linux-compliance-settings) for the per-setting catalog.

**Entry condition:** P-09 shows "Not compliant" with a failing setting that references a custom compliance script or detection name (admin-defined Bash discovery script reporting `not compliant`).

### Symptom

- P-09 failing setting references a custom-compliance detection by name (admin-configured)
- Standard distro/encryption/password settings are passing — only the custom script is failing
- User may not know what the custom script checks; the admin must consult the script source

### L1 Triage Steps

1. > **Say to the user:** "Your device has a custom compliance check that's reporting non-compliant. Let me look at the local log for that check. Please open Terminal and type: `cat /var/log/intune-update.log | tail -50`. Read me any line that includes the word 'compliance' or 'fail'."
2. Per [/var/log/intune-update.log](../_glossary-linux.md#varlogintune-updatelog) — LOW-MEDIUM confidence path; not all custom scripts log here.
3. If the log path returns no compliance entries, ask the user to also run `journalctl --user | grep intune-update` for journal-side custom-script entries.
4. Note the custom-detection name shown in P-09 — the admin will need this to locate the source script.

### Admin Action Required

**Ask the admin to:**

- Locate the custom-compliance Bash discovery script source by the detection name shown in P-09 (admin-defined).
- Review the script's exit-code logic and the conditions it checks. If the script's environmental assumption is incorrect (e.g., it checks for a file path that varies by Ubuntu release), update the script to handle the device's actual configuration.
- Test the corrected script on a representative device before re-deploying.

**Verify:**

- After the corrected script is re-deployed and the device next checks in: P-09 transitions to "Compliant" within the next compliance evaluation cycle. Confirm via `cat /var/log/intune-update.log | tail -20` showing the script's most recent execution succeeded.

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

### Escalation (within Cause D)

- Script logic is correct but the device's actual state genuinely does not meet the check — root cause is the device, not the script (route by what the check verifies)
- Multiple users on the same device model show identical custom-check failures — indicates a deployment-wide state regression
- Admin cannot identify the script source from the detection name shown in P-09

---

## Escalation Criteria

(Overall — applies across all four causes.)

Escalate to L2 (per Phase 30 D-12 three-part escalation packet). See [Phase 52 L2 Linux Compliance Investigation] (forthcoming).

Escalate to L2 if:

- Cause A: distro version cannot be migrated AND policy cannot be relaxed
- Cause B: device is encrypted but P-09 still flags the encryption setting (detection mismatch)
- Cause C: user sets a compliant password but P-09 continues to flag the setting after 60 minutes
- Cause D: custom-script source cannot be identified from the P-09 detection name
- Observation does not cleanly match any single cause (multiple failing settings or ambiguous compliance state)

**Before escalating, collect:**

- Device serial number
- Distro + version (`lsb_release -a` output)
- Kernel + GA-vs-HWE (`uname -r`)
- User UPN
- `dpkg -l intune-portal` output
- `journalctl --user --since "1 day ago"` snapshot (or `cat /var/log/intune-update.log | tail -50` for Cause D)
- Screenshot of P-09 with failing-settings list visible
- Compliance policy name and ID (P-COMP) assigned to the user's group
- Which Cause (A/B/C/D) most closely matches the observation
- Timestamp of the most recent compliance evaluation

---

[Back to Linux Triage](../decision-trees/09-linux-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-27 | Initial version (Phase 51 — 4-cause runbook: Distro Version / Disk Encryption / Password Policy / Custom-Compliance) | -- |
