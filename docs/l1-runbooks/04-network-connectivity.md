---
last_verified: 2026-03-20
review_by: 2026-06-18
applies_to: APv1
audience: L1
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# Network Connectivity Failure

Use this runbook when a device cannot reach the services required for [Autopilot](../_glossary.md#autopilot) provisioning. It covers browser-based connectivity checks, user communication, and escalation to the Infrastructure/Network team with the correct data.

> **Note:** Network connectivity failures escalate to the **Infrastructure/Network team**, NOT to L2 engineering. See Escalation Criteria below.

## Prerequisites

- Physical access to or screen-sharing with the affected device
- Device is powered on and at the [OOBE](../_glossary.md#oobe) screen (or can open a browser)
- Knowledge of the physical location and network connection type (Wi-Fi or Ethernet)

## Steps

1. > **Say to the user:** "I need to check a few websites from your device to determine if it can reach the services we need. I'll walk you through opening a browser and visiting some addresses."

2. Open a web browser on the device:
   - If at the OOBE screen, press **Shift+F10** to open a command prompt (if available), then type `start msedge` to launch Edge.
   - If Shift+F10 is disabled by policy or the command prompt does not appear, ask the user to connect the device to a known-working network with internet access and retry OOBE. If Shift+F10 is blocked, skip browser checks (steps 3–5) and proceed directly to step 7.

   > **Note:** Opening a command prompt via Shift+F10 at OOBE is the standard method for accessing a browser during setup. This is a browser-only check — no scripted diagnostics are run.

3. Navigate to **https://login.microsoftonline.com** in the browser. Expected result: the Microsoft sign-in page loads. If the page does not load, note the exact error message shown (for example: connection refused, certificate error, timeout, proxy authentication required).

4. Navigate to **https://ztd.dds.microsoft.com** in the browser. Expected result: the page loads without a connection error (a blank page or a JSON response is normal). If the connection fails, note the error message.

5. Navigate to **https://graph.microsoft.com** in the browser. Expected result: the page loads or returns a JSON response (both confirm reachability). If the connection fails, note the error message.

6. Check the device clock: look at the time displayed on the device. If the clock is incorrect by more than 5 minutes, [Azure AD](../_glossary.md#hybrid-join) token validation will fail — the device should sync its clock to `time.windows.com` automatically when connected to the internet. If the clock is wrong and no internet is available, note this as a contributing factor.

7. Ask the user: "Are you connected via Wi-Fi or Ethernet? Is a VPN running? Are you on a corporate network, guest network, or personal network?" Record the answers.

8. If only Wi-Fi was tested and connectivity checks failed: ask the user to try a wired Ethernet connection if available. Some networks apply different restrictions to Wi-Fi and wired connections.

9. > **Say to the user:** "Your device cannot reach the services needed for automatic setup. This is a network configuration issue that our infrastructure team will need to resolve. I'm going to transfer this to them with the details I've collected."

10. For the full list of endpoints that must be reachable during Autopilot provisioning, see [Autopilot Network Endpoints](../reference/endpoints.md). Do not paste or list individual URLs in tickets — reference that page directly.

## Escalation Criteria

> **Important:** Network connectivity failures escalate to the **Infrastructure/Network team**, NOT to L2 engineering.

Escalate to Infrastructure/Network if:

- Device cannot reach https://login.microsoftonline.com (indicates no internet access, or an authentication proxy is blocking traffic)
- Device can reach general internet sites but not Autopilot-specific endpoints (indicates a firewall or proxy rule is blocking specific URLs)
- Device clock is incorrect and cannot sync (indicates NTP is blocked)
- All browser checks pass but [OOBE](../_glossary.md#oobe) still fails to connect (possible TLS inspection or certificate substitution issue)

**Before escalating, collect:**

- Device IP address and subnet (visible in **Settings** > **Network** if accessible, or from the command prompt using `ipconfig`)
- Whether Wi-Fi or Ethernet is in use
- Proxy configured (yes / no / unknown)
- Browser error message shown for each failed endpoint (copy the exact text)
- Physical location of device (building, floor, network zone)
- Which specific endpoint(s) failed (from steps 3–5)
- Whether the device clock is correct

For endpoint-specific firewall rule requirements, see [Autopilot Network Endpoints](../reference/endpoints.md).

**Quick Reference:** [L1 Quick-Reference Card](../quick-ref-l1.md)

---

[Back to Initial Triage](../decision-trees/00-initial-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-03-20 | Initial version | — |
