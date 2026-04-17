---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: all
audience: L2
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).

# iOS Compliance & CA Timing Investigation

## Triage

**From L1 escalation?** L1 runbook 21 classified the failure as Cause A / B / C. Skip to the matching "Per-Cause Deep-Dive" section below. The "Investigation by Axis" section is the starting point for fresh investigations where L1 did not narrow the cause.

## Context

**Scope:** L2 investigation of iOS device compliance failures (Non-compliant, Not evaluated, or CA-blocked-despite-compliant) and Conditional Access timing issues. The runbook covers the first-evaluation window post-enrollment, the tenant-level Default compliance posture toggle, per-setting compliance failures (OS version, jailbreak, passcode, restricted apps), and the APNs-blocked terminal state.

**L1 → L2 handoff:** L1 runbook 21 narrows every iOS compliance/CA block to one of three causes:

- **Cause A** — first-evaluation window / timing (enrollment completed < 30 min ago; state "Not evaluated").
- **Cause B** — policy mismatch (OS version, jailbreak, passcode, restricted apps).
- **Cause C** — Default compliance posture = Not compliant combined with APNs-blocked or stuck check-in state.

**Structure choice (D-14 hybrid):** This runbook has two top-level sections. `## Investigation by Axis` (SC #4 literal — configuration errors / timing issues / genuine defects) is the starting point for fresh investigations where the cause is not yet known. `## Per-Cause Deep-Dive` (Cause A / B / C matching L1 runbook 21) is the direct handoff target for L1-routed tickets — skip straight to the matching cause sub-section.

**Pareto emphasis (D-15):** The CA timing + Default posture sub-sections are expanded (roughly 50% of the file) because together they account for the majority of observed iOS compliance escalations. The remaining Cause B settings — jailbreak, OS version, passcode, restricted apps — get compact sub-sections with deep-links to the authoritative admin-setup-ios configuration reference.

**Before starting:** collect a diagnostic package per [iOS Log Collection Guide](14-ios-log-collection.md). Tier 1 (MDM diagnostic report) is sufficient for most Cause A/B investigations; Tier 3 (Mac+cable sysdiagnose) is required for Cause C terminal-state APNs investigation.

## Investigation by Axis

SC #4 axes. Rule out [CONFIG] first (most common); then [TIMING] (requires waiting, not action); then declare [DEFECT] (Microsoft Support escalation).

### Configuration Errors [CONFIG]

Covers Cause B (policy mismatch) and Cause C (Default posture).

- **Cause B matches:** policy mismatch — OS version / jailbreak / passcode / restricted apps. The per-device compliance pane lists at least one failing setting. See `### Cause B:` in the Per-Cause Deep-Dive below for per-setting indicators and resolution.
- **Cause C matches:** the tenant Default posture toggle is set to Not compliant AND the device has no compliance policy assigned (or the assigned policy is stuck evaluating). See `### Cause C:` in the Per-Cause Deep-Dive below.

### Timing Issues [TIMING]

Covers Cause A.

- **Cause A matches:** the first-evaluation window is still open — enrollment completed < 30 min ago AND compliance state is Not evaluated. A Company Portal Sync followed by 15-30 min of waiting usually resolves it without any action.
- See `### Cause A:` in the Per-Cause Deep-Dive below for the specific 0-30 minute mechanics and the decision point at the 30-minute mark.

### Genuine Defects [DEFECT]

Cross-cuts all three causes — a [DEFECT] declaration is the output of a [CONFIG]/[TIMING] investigation that reached its ceiling, not an independent starting branch.

- **Not evaluated stuck indefinitely (APNs-blocked)** — state is Not evaluated > 30 min AND APNs endpoints unreachable from the device network. See the "Not evaluated" Terminal State sub-section in the Per-Cause Deep-Dive.
- **Jailbreak detection false-positive** — device is verifiably NOT jailbroken (no sideloaded apps, factory iOS, current version) but the jailbreak compliance setting persistently fails. See `#### Jailbreak` in the Per-Cause Deep-Dive.
- **OS version gate anomaly** — device reports compliant on passcode and jailbreak but the OS version setting reads as mismatch despite the user having completed the required update. See `#### OS Version` in the Per-Cause Deep-Dive.

**Escalation criteria:** all [CONFIG] investigations ruled out (no failing settings; Default posture verified); all [TIMING] windows exceeded (> 30 min for Cause A; > 8 hours since last check-in for Cause C); APNs reachability tested from the device network. At that point, collect the Microsoft Support defect data package per the `### "Not evaluated" Terminal State` sub-section in the Per-Cause Deep-Dive.

## Per-Cause Deep-Dive

### Cause A: First-Evaluation Window (timing axis)

**Scope:** The 0-30 minute first-evaluation window post-enrollment. Compliance state is expected to transition from Not evaluated → Compliant/Non-compliant within 30 minutes of the device's first check-in after a policy is assigned.

**Indicator:**

- User completes ADE enrollment; home screen appears.
- User opens Outlook/Teams within 0-30 minutes; sign-in fails with "Your device does not meet your organization's policy."
- Intune admin center > Devices > [device] > Compliance shows **Not evaluated**.

**Investigation steps:**

1. Check tenant Default posture: **Endpoint security** > **Device compliance** > **Compliance policy settings** > "Mark devices with no compliance policy assigned as" — is it **Not compliant**? If so, devices without an assigned policy (and devices in the transient Not-evaluated state) will be blocked by CA "Require compliant device" during the window.
2. Check per-device compliance: **Devices** > [device] > **Compliance** — is the state Not evaluated? Compare enrollment completion timestamp (from Overview) against the current time: is the delta < 30 min?
3. Trigger **Company Portal** > **Sync** on the device (or Intune remote Sync from the admin center).
4. Wait up to 30 minutes; recheck the per-device compliance state.

**Resolution:**

- State transitions to Compliant: timing gap was the sole cause; no action needed except user communication ("you can retry access now").
- State remains Not evaluated > 30 min with Default posture = Not compliant: proceed to `### Cause C:` below.
- State transitions to Non-compliant with one or more failing settings listed: proceed to `### Cause B:` below.

**Cross-link:** [Compliance Evaluation Timing and Conditional Access](../admin-setup-ios/06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access) — Phase 28 D-11 anchor (verified live at line 149 of the admin guide).

### Cause B: Policy Mismatch — OS Version / Jailbreak / Passcode / Restricted Apps (config axis + defects)

**Scope:** Device does not meet a specific compliance setting. Pareto coverage per D-15 — one investigation step common to every Cause B sub-setting, then compact per-setting sub-sections.

**Investigation step (common to all Cause B sub-settings):**

1. Intune admin center > **Devices** > [device] > **Compliance** > [policy name] > expand the policy to see PER-SETTING pass/fail detail.
2. Identify which setting is failing. Match against the sub-sections below.

**[TIMING sub-bullet]** If Intune admin center shows a compliance policy modification in the last hour AND the device has not checked in since the modification, this is [TIMING]: wait for the next APNs-triggered check-in (up to 8 hours, or sooner if user triggers Company Portal Sync). Do not attempt per-setting remediation until the device has evaluated the new policy version.

#### OS Version [CONFIG]

- **Indicator:** Device runs iOS version < policy minimum. Per-setting view shows "OS version" as the failing row.
- **Resolution:** User updates via **Settings** > **General** > **Software Update**. If device hardware cannot reach the policy's minimum version, either adjust the compliance policy minimum OR move the device to a lower-tier compliance policy group.
- **Cross-link:** [OS version compliance setting in Step 2](../admin-setup-ios/06-compliance-policy.md#step-2-configure-compliance-settings) (see "Device Properties (Operating System Version)").

#### Jailbreak [CONFIG] + [DEFECT] fallback

- **Indicator:** Device is compliant on all other settings; only the jailbreak setting fails. Device is NOT actually jailbroken (user is a regular corporate employee; no sideloaded apps; factory iOS).
- **Typical cause:** Compromised APNs push delaying the jailbreak-detection signal OR an outdated iOS version missing a jailbreak-detection signature update.
- **Resolution:** Verify actual jailbreak state on device (**Settings** > **General** > **About** — no unauthorized kernel info). Update iOS to the current release; compliance re-evaluates on next check-in.
- **[DEFECT] fallback:** If the updated OS still reports jailbreak on a verified non-jailbroken device → escalate to **Microsoft Support** (false-positives are real and tracked; cite the Apple Platform Security jailbreak-detection reference in the ticket).
- **Cross-link:** [Jailbreak compliance setting in Step 2](../admin-setup-ios/06-compliance-policy.md#step-2-configure-compliance-settings) (see "Device Health").

#### Passcode [CONFIG]

- **Indicator:** Device has no passcode OR passcode complexity does not meet the policy (length, non-alphanumeric characters, required type).
- **Resolution:** User sets or changes passcode via **Settings** > **Face ID & Passcode** (or **Touch ID & Passcode** on older devices) to meet the policy complexity. Compliance state updates on the next check-in (user can trigger Company Portal Sync to accelerate).
- **Cross-link:** [Passcode compliance settings in Step 2](../admin-setup-ios/06-compliance-policy.md#step-2-configure-compliance-settings) (see "System Security — Password").

#### Restricted Apps by Bundle ID [CONFIG]

- **Indicator:** Policy lists a restricted app by Bundle ID; device has the app installed OR Intune reports the device as non-compliant despite the app not being present on the device.
- **Typical cause:** Bundle ID mismatch in the compliance policy (App Store Bundle ID vs an LOB Bundle ID variant; post-acquisition rename of a publisher's Bundle ID).
- **Resolution:** Admin verifies the exact Bundle ID via ABM or App Store listing → updates the compliance policy with the correct Bundle ID → saves → waits for next device check-in.
- **Cross-link:** [Restricted apps compliance setting in Step 2](../admin-setup-ios/06-compliance-policy.md#step-2-configure-compliance-settings) (see "System Security — Device Security").

### Cause C: Default Compliance Posture Stuck (config axis + genuine-defect APNs-blocked)

**Scope:** Device remains in Not evaluated state > 30 minutes (beyond the Cause A first-evaluation window). Distinguishes from Cause A by the elapsed time — once the 30-minute window closes without a state transition, the investigation shifts from "timing gap" to "check-in/APNs path issue."

**Indicator:**

- Enrollment completed > 30 min ago (possibly hours or days).
- Device compliance state still **Not evaluated** in Intune admin center.
- User sign-in to any CA-protected resource is blocked.

**Investigation steps:**

1. Verify the device has checked in since enrollment: **Devices** > [device] > **Overview** > "Last check-in" field — if > 8 hours old, proceed to trigger a Sync.
2. Trigger Intune remote **Sync** (or have the user open Company Portal > Settings > Sync); wait 30 min; recheck the compliance state.
3. If still Not evaluated after Sync + wait: verify APNs reachability from the device network. On the device: **Settings** > **General** > **VPN & Device Management** > [management profile] > **More Details** — does the "Last management action" timestamp update after the Sync trigger? If not, APNs is not reaching the device.
4. Verify tenant-wide APNs certificate: **Tenant administration** > **Connectors and tokens** > **Apple push notification certificate** — confirm not expired and not revoked.
5. If all of the above pass: collect a sysdiagnose via the iOS Log Collection Guide Tier 3 procedure → examine `kernel.log` for `apsd` or `identityservicesd` connection failures to `*.push.apple.com` / `courier.push.apple.com`.

**Resolution:**

- **Network path fix:** whitelist Apple APNs endpoints at the firewall/proxy. Apple authoritative endpoint reference: `https://support.apple.com/HT203609`.
- **If network path is confirmed open and APNs cert is valid** → proceed to `### "Not evaluated" Terminal State` below for the Microsoft Support escalation data package.

### "Not evaluated" Terminal State (cross-cutting [DEFECT] — D-16)

**Scope:** APNs-blocked-at-network-edge leads to an indefinite Not-evaluated compliance state. Content overlap with Cause C §Default posture stuck is intentional by design — "stuck" is a timing/config investigation; "terminal" is a network/cert investigation with **Microsoft Support escalation** as its output.

**Cross-platform APNs blast radius (Phase 27 D-11 reference):** A single expired Apple Push Notification certificate breaks MDM communication for **all Apple platforms simultaneously** (iOS, iPadOS, macOS). An APNs-blocked-at-edge observation on one iOS device is often a symptom of a broader tenant-level APNs cert issue — verify the APNs cert state FIRST (step 4 in Cause C) before committing to per-device network-path troubleshooting.

**Microsoft Support escalation data (D-16 required data collection):**

- APNs tenant ID / Apple ID from the APNs cert pane (**Intune admin center** > **Tenant administration** > **Connectors and tokens** > **Apple push notification certificate** > "Apple ID" field).
- APNs cert expiry timestamp (same pane).
- Network-path evidence: sysdiagnose `kernel.log` excerpt showing `apsd` connection failures to `*.push.apple.com` / `courier.push.apple.com`, collected per [iOS Log Collection Guide](14-ios-log-collection.md) Tier 3 procedure.
- Date range of Not-evaluated persistence (first observed → latest verified) — document the first L1 ticket timestamp and the most recent verified check.
- Device serial number + iOS version + device model.
- Escalation path: open the case under "Microsoft Intune" > "Device compliance" category; attach sysdiagnose with PII redaction per the log collection guide Tier 3 callout.

**Terminal-state decision flow (quick reference):**

| Observation | Next action |
|-------------|-------------|
| Last check-in > 8 hours old AND Sync did not update timestamp | Network-path investigation (firewall/proxy blocking `*.push.apple.com`) |
| Last check-in recent but compliance state never transitions | APNs cert check (tenant-wide) + sysdiagnose `apsd` review |
| APNs cert valid + network open + sysdiagnose clean | Microsoft Support escalation with full data package above |
| Multiple Apple devices (iOS + macOS) affected simultaneously | Tenant-level APNs cert issue — verify cert first; do not open per-device tickets |

**Do not escalate to Microsoft Support without:** (a) confirmed Default posture value, (b) confirmed device Last check-in timestamp, (c) APNs cert state from the Intune pane, and (d) at least one sysdiagnose collection attempt. Missing any of these four elements will cause the support case to be returned for additional data.

## Related Resources

- [iOS Log Collection Guide](14-ios-log-collection.md) — prerequisite diagnostic package collection (Tier 1 for Cause A/B; Tier 3 for Cause C / Not-evaluated terminal state).
- [iOS Compliance Policy Admin Guide](../admin-setup-ios/06-compliance-policy.md) — authoritative admin-side policy configuration reference (all Cause B settings are configured here).
- [Compliance Evaluation Timing and Conditional Access](../admin-setup-ios/06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access) — Phase 28 D-11 authoritative timing reference (Cause A deep-link).
- [iOS L1 Runbook 21 (Compliance Blocked)](../l1-runbooks/21-ios-compliance-blocked.md) — L1 triage with the Cause A/B/C classification that drives the L1→L2 handoff to this runbook.
- [ADE Token & Profile Delivery Investigation](15-ios-ade-token-profile.md) — if the APNs issue is part of a broader enrollment failure (Pattern C: profile assigned but device never received it via APNs push).

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Initial version — iOS compliance & CA timing investigation | -- |
