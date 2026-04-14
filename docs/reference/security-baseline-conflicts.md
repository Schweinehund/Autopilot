---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: admin
platform: Windows
---

> **Version gate:** This guide covers security baseline conflicts that affect both APv1 and APv2 Autopilot deployments.

# Security Baseline Interactions with Autopilot Provisioning

Security baselines applied too early in the Autopilot provisioning flow can block enrollment or silently skip critical settings. The Enrollment Status Page (ESP) does not distinguish "setting applied" from "setting failed silently" — admins often see "Some settings could not be applied" with no indication of which baseline setting caused it.

## Known Conflict Areas

| Security Feature | Conflict with Autopilot | Timing Issue | Mitigation |
|-----------------|------------------------|--------------|-----------|
| **BitLocker CSP** | BitLocker policy "kicks in too late" — may not apply during ESP device phase | Policy received but encryption starts after ESP completes | Use a separate BitLocker configuration profile targeted to the device group, not the security baseline. This ensures BitLocker is configured independently of baseline application order. |
| **LAPS (Local Admin Password Solution)** | LAPS policy not applied until user phase begins | Device phase completes without LAPS-managed local admin password | Accept the timing gap, OR use pre-provisioning mode where the technician phase applies LAPS during the device phase |
| **AppLocker / WDAC (Windows Defender Application Control)** | Can block the Intune Management Extension (IME) process itself | IME blocked = all Win32 app installs fail during ESP | Always add IME processes to the allow list: `Microsoft.Management.Services.IntuneWindowsAgent.exe`, `IntuneWindowsAgent.exe` |
| **Reboot Policies (forced restart, maintenance window)** | Immediate reboot setting conflicts with ESP flow | ESP interrupted by forced reboot — restarts from scratch or fails | Defer reboots until post-ESP using maintenance windows. Set reboot grace period to at least 120 minutes. |

---

## KB5065848 Known Issue (2025)

Windows devices may get stuck on the "Identifying" screen during Autopilot and BitLocker may not apply correctly. This is a known issue tracked in **KB5065848**.

- **Symptoms:** Device stuck at "Identifying your device" during OOBE; BitLocker not applied post-enrollment even when a BitLocker policy is assigned.
- **Mitigation:** Ensure the KB5065848 fix is included in the Windows image, or allow Windows Update to apply it during ESP (requires internet access during ESP and a Windows Update policy that does not defer feature/quality updates).
- **Status:** Documented in Microsoft Learn Known Issues for Windows Autopilot. Monitor the Windows release health dashboard for resolution status.

> **Admin Note:** If devices are stuck at "Identifying your device" and BitLocker shows as not encrypted post-enrollment, check the Windows build version against the KB5065848 fix before investigating other causes.

---

## General Guidance

- **Apply security baselines AFTER successful enrollment**, not as part of the initial ESP blocking configuration. Baseline application as a blocking ESP requirement multiplies the chance that one setting will interrupt the ESP flow.

- **Use Intune configuration profiles for individual security settings** (BitLocker, Firewall, Windows Defender settings) rather than monolithic security baselines during initial deployment. Individual profiles can be targeted, sequenced, and troubleshot independently. A baseline applies as a unit — one conflicting setting blocks the entire baseline.

- **Test every security baseline change with a pilot Autopilot deployment** before fleet-wide rollout. A baseline that works correctly on an already-enrolled device may behave differently on a device going through first-run OOBE.

> **What breaks if misconfigured:** A security baseline applied during ESP enables a setting that requires a reboot or blocks IME. ESP either fails or loops. The admin sees "Some settings could not be applied" in the ESP failure summary but cannot determine which baseline setting caused the failure from the ESP UI alone. Log collection from `mdmdiagnosticstool.exe` is required to identify the conflicting setting.

---

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|-----------------|---------|---------|
| WDAC policy blocks IME | Win32 apps fail to install during ESP; ESP times out | Add `IntuneWindowsAgent.exe` and `Microsoft.Management.Services.IntuneWindowsAgent.exe` to WDAC allow list |
| Forced reboot in baseline | ESP interrupted; deployment restarts from scratch or fails | Defer reboots 120+ minutes post-ESP using maintenance windows |
| BitLocker via security baseline only | BitLocker not applied; device shows non-compliant post-enrollment | Use a separate BitLocker configuration profile targeted to device group |
| LAPS via baseline | LAPS not applied during device phase; local admin has no managed password until user phase | Accept timing gap or use pre-provisioning mode |

---

## See Also

- [Conditional Access Enrollment Timing](ca-enrollment-timing.md) — Compliance policy chicken-and-egg problem
- [Compliance Policy Timing](compliance-timing.md) — Evaluation schedule, grace periods, state transitions
- [Stage 4: ESP](../lifecycle/04-esp.md) — Enrollment Status Page flow and configuration
- [APv1 Configuration-Caused Failures](../admin-setup-apv1/10-config-failures.md) — Full reverse-lookup table for configuration mistakes
