---
last_verified: 2026-04-27
review_by: 2026-06-26
applies_to: all
audience: L1
platform: Linux
---

> **Platform gate:** This guide covers Linux Intune client troubleshooting (Ubuntu 22.04/24.04 LTS). For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks). For Android, see [Android L1 Runbooks](00-index.md#android-l1-runbooks).

# Linux Enrollment Failed

L1 runbook for Linux endpoints (Ubuntu 22.04/24.04 LTS) where Intune enrollment did not complete. Three distinct causes are diagnosed independently:

- **Cause A:** Package install failure (`intune-portal` deb did not install or is in error state)
- **Cause B:** Sign-in failure (Microsoft Identity Broker authentication did not complete)
- **Cause C:** Enrollment timeout (`intune-agent.timer` did not check in within the expected window)

Routed here from the [Linux Triage Decision Tree](../decision-trees/09-linux-triage.md) LINR30 branch.

> **L1 scope note:** L1 Triage Steps in this runbook are read-only checks. State-changing commands (`sudo apt install`, package reinstall, service restart) appear ONLY in the per-cause `### Admin Action Required` sections — they are not L1 actions.

## Prerequisites

- Access to Intune admin center (`https://intune.microsoft.com`) with Help Desk Operator or Read Only Operator role (read-only for enrollment status)
- Device serial number or User UPN
- Terminal access on the affected Linux device (the user runs read-only commands; sudo is admin-only — see per-cause `### Admin Action Required`)
- For end-user enrollment walkthrough referenced from Cause C, see [Linux Intune Portal Enrollment — Enroll your device](../end-user-guides/linux-intune-portal-enrollment.md#enroll-your-device).
- Portal shorthand used in this runbook:
   - **P-09** = `Devices > All devices > [device] > Overview` (device enrollment state view)
   - **P-08** = `Devices > Enrollment > Linux` (tenant-wide Linux enrollment configuration)

## How to Use This Runbook

Check the cause that matches your observation. Causes are independently diagnosable — you do not need to rule out prior causes.

- [Cause A: Package Install Failure](#cause-a-package-install) — `apt list --installed | grep intune-portal` empty OR `dpkg -l intune-portal` shows non-`ii` status
- [Cause B: Sign-In Failure (Microsoft Identity Broker)](#cause-b-sign-in-failure) — Identity Broker authentication did not complete; user sees sign-in prompt repeatedly or auth timeout
- [Cause C: Enrollment Timeout (`intune-agent.timer`)](#cause-c-enrollment-timeout) — `systemctl --user list-timers intune-agent.timer` shows `-` for NEXT or last activation > 1 hour ago

If none matches, proceed directly to [Escalation Criteria](#escalation-criteria).

Common ticket phrasings: "intune-portal won't install," "the sign-in keeps looping," "I enrolled but my device never shows up."

---

## Cause A: Package Install Failure {#cause-a-package-install}

> See [intune-portal (package)](../_glossary-linux.md#intune-portal-package) for the package definition; [/var/log/dpkg.log](../_glossary-linux.md#varlogdpkglog) for the install-event log path; [APT repository](../_glossary-linux.md#apt-repository) for the packages.microsoft.com source; [dpkg](../_glossary-linux.md#dpkg) for the package manager itself.

**Entry condition:** `apt list --installed | grep intune-portal` returns empty OR `dpkg -l intune-portal` shows a status other than `ii` (e.g., `un`, `iU`, `iF`).

### Symptom

- User reports they tried to install Intune on their Linux device but the install did not complete
- `apt list --installed | grep intune-portal` returns empty (no installed entry)
- `dpkg -l intune-portal` shows package in non-`ii` state — typical: `un` (unknown / not installed), `iU` (install pending), `iF` (install failed during configure)

### L1 Triage Steps

1. > **Say to the user:** "Let me check whether the Intune client package is installed on your device. Please open Terminal and type: `apt list --installed | grep intune-portal`. Read me the output."
2. If the output is empty, the package is not installed — ask the user to also run `cat /var/log/dpkg.log | grep intune` (or `cat /var/log/dpkg.log | tail -50` for a broader window) to surface what happened on the last install attempt.
3. If the output shows non-`ii` state, ask the user to read me the full line from `dpkg -l intune-portal`.
4. Cross-reference [/var/log/dpkg.log](../_glossary-linux.md#varlogdpkglog) for the install-event log path; LOW-MEDIUM confidence per Phase 49 attestation.

### Admin Action Required

**Ask the admin to:**

- Reinstall the `intune-portal` package via `sudo apt install intune-portal` after confirming the [packages.microsoft.com](../_glossary-linux.md#packagesmicrosoftcom) APT repository is reachable from the device's network.
- If the device is behind a proxy or firewall, verify that `https://packages.microsoft.com` is reachable.

**Verify:**

- After reinstall: `apt list --installed | grep intune-portal` returns a single line `intune-portal/jammy,now 2.0.X amd64 [installed]` (Ubuntu 22.04) or `intune-portal/noble,now 2.0.X amd64 [installed]` (Ubuntu 24.04).

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

### Escalation (within Cause A)

- Reinstall succeeds but enrollment still does not complete (Cause B or C may apply next)
- packages.microsoft.com unreachable from the device's network despite the user being on the corporate network — escalate to Network team for proxy/firewall review

---

## Cause B: Sign-In Failure (Microsoft Identity Broker) {#cause-b-sign-in-failure}

> See [microsoft-identity-broker](../_glossary-linux.md#microsoft-identity-broker) for the system-scope authentication broker; [Identity Broker](../_glossary-linux.md#identity-broker) for the broader cross-platform concept; [journalctl](../_glossary-linux.md#journalctl) for the systemd journal reader.

**Entry condition:** Package is installed (`dpkg -l intune-portal` shows `ii`) but the user cannot complete sign-in — the work-account prompt loops, times out, or returns an authentication error.

### Symptom

- User reports the Intune sign-in prompt opens repeatedly without completing
- User sees an authentication timeout or "could not sign in" message
- `microsoft-identity-broker` system service is running but the auth handshake never reports success

### L1 Triage Steps

1. > **Say to the user:** "Let me check the sign-in service that handles your Intune authentication. Please open Terminal and type: `journalctl -u microsoft-identity-broker --since \"1 hour ago\"`. Read me the last 10 lines."
2. **NOTE:** `microsoft-identity-broker` is a system-scope service (not user-scope), so the command does NOT use `--user`. If the output is empty or "no entries," ask the user to retry with `sudo journalctl -u microsoft-identity-broker --since "1 hour ago"` — system-scope journals may require root for full visibility on some Ubuntu installs (acceptable per D-18 carve-out for root-only journals).
3. Filter the user-scope journal for sign-in references: `journalctl --user | grep -iE "broker|signin|sign-in"`. Document any failure messages or repeated authentication attempts.
4. Confirm the system-scope service is at least running: `systemctl status microsoft-identity-broker` (no `--user`, no `sudo`). Expected: `Active: active (running)`. If `inactive` or `failed`, the service has stopped — admin action required.

### Admin Action Required

**Ask the admin to:**

- Restart the system-scope broker service: `sudo systemctl restart microsoft-identity-broker`. Wait 30 seconds, then verify `systemctl status microsoft-identity-broker` returns `active (running)`.
- Confirm the user's account is licensed for Intune in Entra (the broker rejects accounts without a valid Intune license assignment).
- If the user is on a corporate network with conditional sign-in policies, verify the Linux platform is allowed for the user's identity.
- For broader broker troubleshooting, see [Linux Intune Agent Admin Setup](../admin-setup-linux/01-intune-linux-agent.md).

**Verify:**

- After restart: ask the user to retry sign-in from the Intune client. Check `journalctl -u microsoft-identity-broker --since "5 minutes ago"` for a successful authentication entry.

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

### Escalation (within Cause B)

- Broker service restarts cleanly but the user's sign-in still loops after retry
- Broker journal shows no sign-in attempt despite the user reporting they retried — indicates a client-side wiring issue
- Multiple users on the same device model fail authentication in the same pattern

---

## Cause C: Enrollment Timeout (`intune-agent.timer`) {#cause-c-enrollment-timeout}

> See [intune-agent.timer](../_glossary-linux.md#intune-agenttimer) for the user-scope check-in timer; [systemd](../_glossary-linux.md#systemd) for the unit framework; [journalctl](../_glossary-linux.md#journalctl) for the journal reader.

**Entry condition:** Package is installed AND sign-in completed, but `systemctl --user list-timers intune-agent.timer` shows `-` for NEXT (timer not scheduled) OR last activation > 1 hour ago AND device still not visible in Intune.

### Symptom

- User completed the [enrollment walkthrough](../end-user-guides/linux-intune-portal-enrollment.md#enroll-your-device) but their device does not appear in Intune > Devices > All devices (Linux platform filter)
- `systemctl --user list-timers intune-agent.timer` shows `-` for NEXT column or a stale "PASSED" timestamp
- `journalctl --user -u intune-agent.timer --since "1 hour ago"` shows no fresh check-in attempts

### L1 Triage Steps

1. > **Say to the user:** "Let me check whether the Intune check-in timer is scheduled to run on your device. Please open Terminal and type: `systemctl --user list-timers intune-agent.timer`. Read me the NEXT column for that line."
2. If the NEXT column shows `-`, the timer has no scheduled next-run — confirm by also asking the user to run `systemctl --user status intune-agent.timer` and read me the `Active:` line. Expected when healthy: `Active: active (waiting)`.
3. Ask the user to run `journalctl --user -u intune-agent.timer --since "1 hour ago"` and read me the last 10 lines. Look for activation entries or absence of expected check-in messages.
4. Confirm the package is still installed: `apt list --installed | grep intune-portal`. If empty, the upstream cause is package removal — route to [Cause A](#cause-a-package-install) instead.

### Admin Action Required

**Ask the admin to:**

- Restart the user-scope timer (no sudo on `--user` units): `systemctl --user start intune-agent.timer`. If the timer was in a failed state, run `systemctl --user reset-failed intune-agent.timer` first.
- Confirm the user-scope systemd manager is running for the user (a logged-out user has no user-scope systemd; the user must be logged in for the timer to fire).
- For broader timer troubleshooting, see [Linux Intune Agent Admin Setup](../admin-setup-linux/01-intune-linux-agent.md).

**Verify:**

- After restart: `systemctl --user is-active intune-agent.timer` returns `active`. Within approximately 30 minutes the device should appear in Intune admin center > Devices > All devices with an updated last-check-in timestamp.

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

### Escalation (within Cause C)

- Timer restarts cleanly but no check-in occurs within 60 minutes
- Timer is `active (waiting)` but device still does not appear in Intune after 60 minutes (the timer is firing but the agent is not communicating with Intune)
- The symptom matches Runbook 33 instead (timer is in `failed` state rather than missing-schedule) — route to [Runbook 33](33-linux-agent-service-failure.md)

---

## Escalation Criteria

(Overall — applies across all three causes.)

Escalate to L2 (per Phase 30 D-12 three-part escalation packet). See [Phase 52 L2 Linux Enrollment Investigation] (forthcoming).

Escalate to L2 if:

- Cause A: reinstall succeeds but enrollment still fails after 30 minutes
- Cause B: Microsoft Identity Broker logs show no sign-in attempt despite user retrying
- Cause C: `intune-agent.timer` is active but no check-in occurs within 60 minutes
- Observation does not cleanly match any single cause (multiple failing signals across A/B/C)

**Before escalating, collect:**

- Device serial number
- Distro + version (`lsb_release -a` output)
- Kernel + GA-vs-HWE (`uname -r`)
- User UPN
- `dpkg -l intune-portal` output
- `journalctl --user --since "1 day ago"` snapshot (or `journalctl -u microsoft-identity-broker --since "1 day ago"` for Cause B)
- Which Cause (A/B/C) most closely matches the observation
- Timestamp of the failed enrollment attempt
- User actions attempted (if any) and the outcome

---

[Back to Linux Triage](../decision-trees/09-linux-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-27 | Initial version (Phase 51 — 3-cause runbook: Package Install / Sign-In Failure / Enrollment Timeout) | -- |
