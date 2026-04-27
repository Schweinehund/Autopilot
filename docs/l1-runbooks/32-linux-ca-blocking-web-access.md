---
last_verified: 2026-04-27
review_by: 2026-06-26
applies_to: all
audience: L1
platform: Linux
---

> **Platform gate:** This guide covers Linux Intune client troubleshooting (Ubuntu 22.04/24.04 LTS). For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks). For Android, see [Android L1 Runbooks](00-index.md#android-l1-runbooks).

# Linux CA Blocking Web-App Access

L1 runbook for Linux endpoints where a user is blocked from accessing Microsoft 365 web applications in Microsoft Edge for Linux due to a Conditional Access (CA) policy. Three distinct causes are diagnosed independently:

- **Cause A:** Device is not enrolled in Intune at all (CA evaluation has nothing to check)
- **Cause B:** Device is enrolled but reports non-compliant
- **Cause C:** Device is enrolled and compliant, but Edge for Linux is not signed in with the user's work account

Routed here from the [Linux Triage Decision Tree](../decision-trees/09-linux-triage.md) LINR32 branch (via the LINCA disambiguation node).

> ⚠️ **Architecture: Linux is web-app CA only.** Device-level CA (the grant tied to compliance state) is not supported on Linux — only web-app sign-in via Edge for Linux 102.x+ is enforceable. See [Linux Capability Matrix — Conditional Access](../reference/linux-capability-matrix.md#conditional-access) for the full architectural detail.

> **L1 scope note:** This runbook is portal-only across all three causes. L1 inspects state in Intune and Entra; user-side terminal commands are not used here. State-changing remediation (compliance re-evaluation, CA policy adjustment, Edge re-sign-in) is admin-driven or user-driven per cause.

## Prerequisites

- Access to Intune admin center (`https://intune.microsoft.com`) with Help Desk Operator or Read Only Operator role (read-only)
- Access to Entra admin center (`https://entra.microsoft.com`) Sign-in logs with Reports Reader role (read-only)
- Device serial number or User UPN
- Portal shorthand used in this runbook:
   - **P-09** = `Devices > All devices > [device] > Overview` and `> Device compliance` (enrollment + compliance state view)
   - **P-CA-LOG** = `Entra > Monitoring > Sign-in logs` (filter by user UPN; the Conditional Access tab on a sign-in row shows which CA policy applied)

## How to Use This Runbook

Check the cause that matches your observation. Causes are ordered from "device not present at all" to "user-side sign-in" — work through them in order or jump to the matching cause.

- [Cause A: Not Enrolled](#cause-a-not-enrolled) — device serial does not appear in Intune > All devices (Linux filter)
- [Cause B: Non-Compliant](#cause-b-non-compliant) — device appears in Intune but compliance state shows "Not compliant"
- [Cause C: Edge Not Signed In](#cause-c-edge-not-signed-in) — device enrolled + compliant but user is not signed into Edge for Linux with their work account

If none matches, proceed directly to [Escalation Criteria](#escalation-criteria).

Common ticket phrasings: "Edge says my device isn't allowed," "I can't sign in to Outlook on the web," "Microsoft 365 in the browser keeps blocking me."

---

## Cause A: Not Enrolled {#cause-a-not-enrolled}

> See [web-app CA](../_glossary-linux.md#web-app-ca) for the architectural definition; [MS Edge for Linux](../_glossary-linux.md#ms-edge-for-linux) for the supported browser.

**Entry condition:** Intune > Devices > All devices (Linux platform filter) does NOT show the user's device serial.

### Symptom

- User reports they are blocked accessing M365 in Edge for Linux
- Intune > Devices > All devices (Linux filter) does not list the user's device
- P-CA-LOG sign-in entry shows a CA policy block reason referencing "device not registered" or "compliant device required"

### L1 Triage Steps

1. > **Say to the user:** "I'll check whether your device is registered in Intune. Stay on the line — I'll have an answer in a moment."
2. Open Intune > Devices > All devices and filter by platform = Linux. Search for the user's device serial number or UPN.
3. If the serial does not appear: the device has never enrolled. The CA policy is correctly blocking because there is no compliant device to evaluate.
4. Open P-CA-LOG and locate the user's most recent failed sign-in. Open the Conditional Access tab on that sign-in row to confirm which CA policy fired the block.
5. **Hand-off:** If the device is not enrolled, the upstream remediation is enrollment itself — route to [Runbook 30: Linux Enrollment Failed](30-linux-enrollment-failed.md) to diagnose why enrollment did not complete.

### Admin Action Required

**Ask the admin to:**

- Coordinate with the user on completing enrollment per [Runbook 30: Linux Enrollment Failed](30-linux-enrollment-failed.md). The CA block on web-app access will resolve automatically once the device is enrolled and compliant.
- Verify the CA policy assignment scope — confirm the user's group is in scope for a CA policy that requires a compliant device for M365 web-app access.

**Verify:**

- After the user's device successfully enrolls and reports compliant in P-09: the user retries Edge sign-in to M365 web apps; the CA policy permits access.

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

### Escalation (within Cause A)

- User cannot complete enrollment per Runbook 30 (route to L2 via that runbook's escalation path)
- Device shows as enrolled in Intune but P-CA-LOG still blocks under "device not registered" — indicates a CA evaluation lag or token issue

---

## Cause B: Non-Compliant {#cause-b-non-compliant}

> See [web-app CA](../_glossary-linux.md#web-app-ca) for the architectural definition; [Linux compliance settings](../_glossary-linux.md#linux-compliance-settings) for the per-setting catalog.

**Entry condition:** Device appears in Intune but P-09 shows compliance state "Not compliant."

### Symptom

- User is blocked in Edge for M365 web apps
- Intune > Devices > All devices shows the device, but P-09 shows "Not compliant" with at least one failing setting
- P-CA-LOG block reason references "device not compliant" or "compliant device required"

### L1 Triage Steps

1. > **Say to the user:** "Your device is enrolled but Intune is reporting it as not compliant. I'll figure out which setting is failing."
2. Open P-09 for the device. Note the failing-settings list (the compliance evaluation surfaces each failing setting by name).
3. Open P-CA-LOG and confirm the most recent block reason is "device not compliant" (vs "device not registered" — that would route to Cause A).
4. **Hand-off:** Match the failing setting against the four causes in [Runbook 31: Linux Compliance Non-Compliant](31-linux-compliance-non-compliant.md) — distro version, disk encryption, password policy, or custom compliance — and route accordingly.

### Admin Action Required

**Ask the admin to:**

- Coordinate with the user on the compliance remediation per [Runbook 31](31-linux-compliance-non-compliant.md) (the matching cause for the failing setting).
- Once the failing setting is resolved and the device next checks in, the compliance state will transition to "Compliant" within the standard evaluation cycle (approximately 15–30 minutes).

**Verify:**

- After remediation: P-09 shows "Compliant"; the user retries M365 web-app access in Edge for Linux; CA permits access.

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

### Escalation (within Cause B)

- Compliance state remains "Not compliant" after the matching Runbook 31 cause is fully remediated (route to L2 via Runbook 31's escalation path)
- P-09 shows "Compliant" but P-CA-LOG still blocks under "device not compliant" — indicates a CA token-cache lag (try forcing a sign-out and back in to Edge first)

---

## Cause C: Edge Not Signed In {#cause-c-edge-not-signed-in}

> See [MS Edge for Linux](../_glossary-linux.md#ms-edge-for-linux) for the supported browser version baseline; [Identity Broker](../_glossary-linux.md#identity-broker) for the cross-platform sign-in concept.

**Entry condition:** Device appears in Intune AND P-09 shows compliance state "Compliant," but the user is still blocked accessing M365 web apps in Edge.

### Symptom

- Device is enrolled and compliant in Intune
- User reports the M365 web app block is still occurring
- P-CA-LOG block reason may reference "user not signed in" or "no work-account session"

### L1 Triage Steps

1. > **Say to the user:** "Your device is in good standing with Intune. The block is likely coming from Edge itself — let me check the browser session."
2. Confirm in P-09 that the device is enrolled AND compliant. If either is false, route to Cause A or Cause B.
3. Open P-CA-LOG and confirm the block reason references the user's session, not the device — typically "user not signed in" or a session-token failure rather than a device-state failure.
4. Ask the user to open Edge for Linux, click their profile avatar in the top-right corner, and confirm whether their work account is shown as signed in. If not, the user must sign in with their work account in Edge — the device-side CA evaluation is fine, but the browser-side session is missing.
5. Confirm the user's Edge for Linux version is 102.x or later (`Settings > About Microsoft Edge`). Earlier versions of Edge for Linux do not support the work-account web-app sign-in path.

### Admin Action Required

**Ask the admin to:**

- Verify the Edge for Linux version is supported (102.x+). Older versions cannot fulfill the web-app CA flow.
- Confirm the user's account is licensed for the M365 web app the user is trying to access (Outlook on the web, SharePoint, Teams web client). A missing license can present as a CA block.
- For broader CA policy review, see [Linux Conditional Access Admin Guide](../admin-setup-linux/05-conditional-access.md).

**Verify:**

- After the user signs into Edge for Linux with their work account: M365 web-app access succeeds; P-CA-LOG shows the next sign-in entry as "Success" with the matching CA policy applied.

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

### Escalation (within Cause C)

- User signs into Edge with the work account but the block persists — indicates a token-cache or session-state issue
- Edge for Linux version is below 102.x AND cannot be upgraded on the user's distro — escalate for distro/Edge compatibility review

---

## Escalation Criteria

(Overall — applies across all three causes.)

Escalate to L2 (per Phase 30 D-12 three-part escalation packet). See [Phase 52 L2 Linux CA Investigation] (forthcoming).

Escalate to L2 if:

- Cause A: enrollment cannot complete per Runbook 30
- Cause B: compliance failing setting cannot be remediated per Runbook 31
- Cause C: user signs into Edge with the work account and Edge is on a supported version, but the block persists
- P-CA-LOG block reason does not match any of the three causes (atypical CA policy block)

**Before escalating, collect:**

- Device serial number
- User UPN
- Distro + version (`lsb_release -a` output) and kernel (`uname -r`)
- Edge for Linux version (`microsoft-edge --version`)
- P-09 enrollment + compliance state screenshots
- P-CA-LOG sign-in entry screenshot showing the CA policy block reason
- Which Cause (A/B/C) most closely matches the observation
- Timestamp of the failed M365 web-app access attempt
- User actions attempted (if any) and the outcome

---

[Back to Linux Triage](../decision-trees/09-linux-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-27 | Initial version (Phase 51 — 3-cause runbook: Not Enrolled / Non-Compliant / Edge Not Signed In; PITFALL-2 architectural callout paraphrased per defect 4C-1 / V-51-19 mitigation) | -- |
