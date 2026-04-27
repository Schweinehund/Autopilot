---
last_verified: 2026-04-27
review_by: 2026-06-26
applies_to: all
audience: L1
platform: Linux
---

> **Platform gate:** This guide covers Linux Intune client troubleshooting (Ubuntu 22.04/24.04 LTS). For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks). For Android, see [Android L1 Runbooks](00-index.md#android-l1-runbooks).

# Linux Intune Agent Service Failure

L1 runbook for Linux endpoints (Ubuntu 22.04/24.04 LTS) where the Intune agent service (`intune-agent.timer`) is not running or not checking in. The `intune-portal` deb package may still be installed; this runbook covers the case where the package is present but the systemd timer is inactive, failed, or never firing.

## Symptom

One or more of the following:

- User reports their Linux device "stopped checking in" or "fell off Intune"
- Admin-visible in Intune: device last-check-in timestamp is more than 24 hours old despite the user reporting the device is powered on
- `systemctl --user status intune-agent.timer` shows `Active: inactive (dead)` or `Active: failed` instead of `Active: active (waiting)`
- Common ticket phrasings: "my device hasn't checked in," "Intune says my device is offline but I'm using it now," "the agent is broken." [MEDIUM: community ticket phrasing survey, last_verified 2026-04-27]

Routed here from the [Linux Triage Decision Tree](../decision-trees/09-linux-triage.md) LINR33 branch.

> **Disambiguation:** If the device never enrolled (no `intune-portal` deb installed at all), see [Runbook 30: Linux Enrollment Failed](30-linux-enrollment-failed.md) instead. If the timer is running but compliance evaluation is reporting non-compliant, see [Runbook 31: Linux Compliance Non-Compliant](31-linux-compliance-non-compliant.md).

## L1 Triage Steps

L1 Triage Steps are read-only checks. L1 does NOT modify any service state — that is an admin action (see [Admin Action Required](#admin-action-required) below).

> See [intune-agent.timer](../_glossary-linux.md#intune-agenttimer) for the user-scope check-in timer; [systemd](../_glossary-linux.md#systemd) for the unit framework; [journalctl](../_glossary-linux.md#journalctl) for the journal reader; [intune-portal (package)](../_glossary-linux.md#intune-portal-package) for the deb package supplying the unit; [dpkg](../_glossary-linux.md#dpkg) for the package status query.

1. > **Say to the user:** "Let me check whether the Intune agent timer is running on your device. Please open Terminal and type: `systemctl --user status intune-agent.timer`. Read me the output."

2. If the output shows `Active: active (waiting)` and `Loaded: loaded`, the timer is healthy — escalate to a different runbook (the symptom may be misclassified). See the **Disambiguation** note near the top of this runbook.

3. If the output shows `Active: inactive (dead)` or `Active: failed`, ask the user to also run `systemctl --user is-enabled intune-agent.timer` and read me the output. Expected: `enabled` (timer set to start at boot) or `static` (timer wired to another service). If `disabled`, the timer was explicitly stopped — admin action required.

4. Ask the user to run `systemctl --user list-timers intune-agent.timer` (still user-scope, no sudo). Read me the NEXT column. If the column shows `-`, the timer has no scheduled next-run — confirms the failure pattern.

5. Collect `journalctl --user -u intune-agent.timer --since "1 hour ago"` output (or `--since "1 day ago"` for broader scope). Document any failure messages or the absence of expected check-in messages.

6. Confirm the `intune-portal` package is still installed: `apt list --installed | grep intune-portal`. If empty (deb removed), the upstream cause is package removal — route to [Runbook 30](30-linux-enrollment-failed.md) instead.

7. Collect the following observed state for the escalation packet:
   - Output of `systemctl --user status intune-agent.timer`
   - Output of `systemctl --user is-enabled intune-agent.timer`
   - Output of `systemctl --user list-timers intune-agent.timer`
   - Output of `journalctl --user -u intune-agent.timer --since "1 day ago"`
   - User's UPN
   - Device serial number
   - Distro + version (`lsb_release -a`) + kernel (`uname -r`)

## Admin Action Required

L1 documents and hands this packet to the Intune administrator. L1 does not execute any of the following actions.

**Ask the admin to:**

- Restart the user-scope timer: `systemctl --user start intune-agent.timer` (NO sudo — `--user` units do not take sudo). If the timer is `static` or wired to another unit, the admin should restart that parent unit instead.
- If the timer is in a `failed` state, run `systemctl --user reset-failed intune-agent.timer` and then `systemctl --user start intune-agent.timer`.
- If the upstream cause is package corruption: `sudo apt install --reinstall intune-portal` (this DOES use sudo because `apt install` is system-scope) and then verify the timer with `systemctl --user is-active intune-agent.timer` — expected `active`.
- For broader troubleshooting, see [Linux Intune Agent Admin Setup](../admin-setup-linux/01-intune-linux-agent.md) for the canonical service-health verification procedure.

**Verify:**

- After admin actions: `systemctl --user is-active intune-agent.timer` returns `active`. Within approximately 30 minutes the device should appear back in Intune admin center > Devices > All devices with an updated last-check-in timestamp.

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

## Escalation Criteria

Escalate to L2 (per Phase 30 D-12 three-part escalation packet). See [Phase 52 L2 Linux Agent Investigation] (forthcoming).

Escalate to L2 if:

- Timer restarts but immediately re-enters `failed` state within minutes
- Timer is `active (waiting)` but no check-in occurs within 60 minutes (the timer is firing but the agent is not communicating with Intune)
- Reinstall succeeds but the timer is still inactive after reinstall
- Multiple users on the same device model show the same failure pattern (likely an OS image / OEM regression — L2 investigation required)

**Before escalating, collect:**

- Device serial number
- Distro + version (`lsb_release -a`) + kernel (`uname -r`)
- User UPN
- Output of `systemctl --user status intune-agent.timer` (immediately after the failed restart attempt)
- Output of `journalctl --user -u intune-agent.timer --since "1 day ago"`
- `dpkg -l intune-portal` output
- Timestamp of the last successful check-in (from Intune admin center)
- Timestamp of the failed restart attempt

---

[Back to Linux Triage](../decision-trees/09-linux-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-27 | Initial version (Phase 51 — Linux Intune agent service failure single-cause L1 runbook) | -- |
