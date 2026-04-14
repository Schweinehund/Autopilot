---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: admin
platform: Windows
---

> **Version gate:** This guide extends the ESP configuration in [ESP Policy Configuration](../admin-setup-apv1/03-esp-policy.md) with scenario-specific timeout recommendations. For ESP setting definitions, blocking app list configuration, and "What breaks" callouts for each ESP setting, see that guide first. This guide covers the timeout value decision only.

# ESP Timeout Tuning Guide

The ESP timeout is the most frequently misconfigured ESP setting. The default 60-minute timeout is sufficient for simple cloud-only deployments but fails for hybrid join, large app payloads, or deployments with Windows quality updates enabled. This guide provides scenario-based recommendations and a calculation formula.

## Prerequisites

- Intune Administrator role
- ESP profile already created (see [ESP Policy Configuration](../admin-setup-apv1/03-esp-policy.md))
- Estimated app install times from test deployments (or initial best-guess values)

## Recommended Timeout Values by Scenario

Each scenario has a recommended timeout and the specific failure that occurs if the default 60-minute timeout is used.

| Scenario | Recommended Timeout | Default | Reasoning |
|----------|---------------------|---------|-----------|
| Standard Entra join (cloud-only) | 60 minutes | 60 min | Baseline — sufficient for 5-10 typical Win32 apps on a fast connection |
| Hybrid Entra join | 100 minutes | 60 min | ODJ connector adds ~40 min to configured timeout; 60 min default is almost always insufficient |
| Pre-provisioning (technician phase) | 60 minutes | 60 min | Device phase only; user phase runs separately at first user sign-in |
| Large app payload (5+ GB total) | 90-120 minutes | 60 min | Delivery Optimization download time varies by connection speed; 5 GB at 10 Mbps = ~70 min download alone |
| Windows quality updates enabled during ESP | Base timeout + 20-40 minutes | N/A | Quality update download + install consumes part of the timeout budget; cumulative with app install time |
| APv2 (Device Preparation) | Not configurable — fixed at 60 min | 60 min | APv2 does not expose a configurable ESP timeout. Plan app payload to complete within 60 minutes. |

### Scenario: Hybrid Entra Join

> **What breaks at default 60 min:** The ODJ (Offline Domain Join) connector takes 40+ minutes to create the AD computer object and synchronize it to Entra ID. With only 20 minutes remaining after ODJ completes, app installs cannot finish. ESP times out. Device appears "not configured" to the user — they reach the desktop with missing apps and no domain-joined state.

Set to **100 minutes** minimum for hybrid join. If your app payload takes longer than 60 minutes, add the app install time on top of the 40-minute ODJ overhead.

### Scenario: Windows Quality Updates Enabled

> **What breaks without adding buffer:** Quality update download and install consumes part of the timeout budget. For a cumulative update (e.g., monthly rollup ~500 MB-2 GB), the update itself takes 20-40 minutes depending on disk speed and restart time. No time budget remains for app installs. ESP times out after update completes — all app installs are marked failed.

Add 20-40 minutes to the base timeout whenever "Install Windows quality updates" is enabled in the ESP profile. See [ESP Policy Configuration](../admin-setup-apv1/03-esp-policy.md) for the quality update setting details.

### Scenario: APv2 (Device Preparation)

APv2 does not expose the ESP timeout as a configurable setting. The timeout is fixed at 60 minutes. If your app payload cannot complete within 60 minutes, split apps into two groups:
1. Essential apps required before desktop access (Required + device group, tracked by ESP)
2. Additional apps that can install after desktop access (Required + user group, or post-enrollment)

## Timeout Calculation Formula

Use this formula to determine the recommended timeout for your specific environment:

```
Recommended timeout =
  (Hybrid ODJ overhead: 0 min for cloud-only, 40 min for hybrid)
  + (Estimated total app install time)
  + (Quality update buffer: 0 min if disabled, 20-40 min if enabled)
  + (Safety margin: 15 min)
```

**Example — hybrid join with apps and quality updates:**
- Hybrid ODJ overhead: 40 min
- App install time (measured from test run): 35 min
- Quality updates enabled: 30 min (estimated)
- Safety margin: 15 min
- **Recommended timeout: 120 minutes**

**Measuring app install time:** Run a test provisioning with verbose logging. Check the IME log at `C:\ProgramData\Microsoft\IntuneManagementExtension\Logs\IntuneManagementExtension.log` for per-app install timestamps. Sum the durations for all Required apps.

## Misconfiguration Consequences

| Timeout Setting | Too Low | Too High | Sweet Spot |
|----------------|---------|----------|------------|
| Device phase timeout | Apps don't finish installing; ESP fails and shows timeout error; user sees error or must reset | User waits unnecessarily at ESP screen; provisioning appears "stuck" even though it's working | Measured app install time + Hybrid ODJ offset (if applicable) + 15 min buffer |
| User phase timeout | User-assigned apps don't finish; user reaches desktop with missing apps silently | User stares at ESP screen longer than needed | Measured user app install time + 10 min buffer |
| Overall timeout | Entire deployment marked failed; device may be in partial state | Masks actual install failures — admin doesn't see the deployment fail in time to investigate | Sum of device and user phase estimated times + 10 min |

## Adjusting the Timeout After Initial Deployment

When you observe ESP timeouts in the deployment report:

1. Navigate to **Intune admin center** > **Devices** > **Monitor** > **Enrollment failures** — filter by "Timeout" error.
2. Check the actual provisioning time from device logs or deployment reports.
3. Recalculate using the formula above.
4. Navigate to **Intune admin center** > **Devices** > **Enrollment** > **Windows** > **Windows Autopilot** > **Enrollment Status Page** > select the profile > **Properties** > **Edit** > adjust timeout.

> **What breaks if adjusted too aggressively low:** Reducing timeout to match only successful deployments leaves no margin for slower devices or network conditions. A temporarily slow connection causes legitimate deployments to fail. Maintain a minimum 15-minute buffer above your measured install time.

## See Also

- [ESP Policy Configuration](../admin-setup-apv1/03-esp-policy.md) — ESP settings definitions, blocking app list, all "What breaks" callouts
- [Win32 App Packaging](win32-app-packaging.md) — Detection rules, dependencies, install order
- [ESP Lifecycle Stage](../lifecycle/04-esp.md)
