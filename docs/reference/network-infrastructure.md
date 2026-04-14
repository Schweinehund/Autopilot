---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: admin
platform: Windows
---

> **Version gate:** This guide covers network requirements for both APv1 and APv2. For the endpoint URL list, see [Network Endpoints](endpoints.md). For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# Network Infrastructure Requirements for Windows Autopilot

This doc covers firewall rules, VPN configuration, and proxy settings for the endpoints required by Windows Autopilot. It does NOT duplicate the endpoint table — see [Network Endpoints](endpoints.md) for the complete list of URLs and their criticality ratings.

## Prerequisites

- Network administrator access (firewall rule changes)
- Proxy administrator access (PAC/WPAD file changes, SSL inspection policy)
- Firewall or network topology documentation for your environment

## Firewall Rules

All endpoints listed in [Network Endpoints](endpoints.md) must be reachable from the provisioning device. Three port categories apply:

### Port 80 (HTTP)

Used for: WPAD/PAC file retrieval, initial HTTP redirects to HTTPS.

> **What breaks if misconfigured:** Port 80 blocked = PAC file download fails. Device uses no proxy configuration during OOBE. If your environment requires a proxy, devices cannot resolve it and all HTTPS traffic is blocked.

### Port 443 (HTTPS)

Used for: All Autopilot enrollment traffic, Azure AD authentication, Microsoft Graph API calls, Intune MDM enrollment, and profile download.

Port 443 must be open for all critical endpoints in [Network Endpoints](endpoints.md). This is non-negotiable — Autopilot cannot operate over any other port for HTTPS traffic.

> **What breaks if misconfigured:** Any critical endpoint blocked on 443 causes enrollment failure at the step that endpoint serves. For example, `ztd.dds.microsoft.com:443` blocked = device cannot retrieve Autopilot profile. `login.microsoftonline.com:443` blocked = Entra join fails.

### UDP Port 123 (NTP)

Used for: Clock synchronization with `time.windows.com`.

> **What breaks if misconfigured:** Clock skew greater than 5 minutes blocks Kerberos and Azure AD token validation. Device reaches enrollment but authentication fails with clock-skew error. Enrollment fails silently — no useful message at OOBE.

## Split-Tunnel VPN Considerations

Autopilot must reach all required endpoints WITHOUT going through the corporate VPN. The VPN profile is not applied until after ESP completes — during OOBE there is no VPN tunnel.

**Which endpoints must be on the split-tunnel exclusion list:** All of them. Every endpoint in [Network Endpoints](endpoints.md) must be excluded from VPN tunneling.

**What happens if VPN is required for internet access:**
- Device reaches OOBE with no VPN tunnel
- Cannot route to Microsoft cloud endpoints through the VPN
- Enrollment fails at connectivity check with network connectivity error

**Recommendation:** Configure split-tunnel VPN with all Autopilot endpoints (and their underlying IP ranges) excluded. Do not use full-tunnel VPN for Autopilot-provisioned devices unless you can guarantee a pre-VPN connection path to all required endpoints before OOBE starts.

> **What breaks if misconfigured:** VPN tunnel intercepts Autopilot traffic during OOBE. Device cannot reach `ztd.dds.microsoft.com` or `login.microsoftonline.com`. Enrollment fails with network connectivity error. See: [ESP Troubleshooting](../l2-runbooks/02-esp-deep-dive.md)

### Pre-Provisioning (Technician Flow) and VPN

In pre-provisioning (technician phase), the device is provisioned at the staging location — typically corporate network with direct internet access. VPN is not involved. The user phase happens later at the user's location, where split-tunnel VPN considerations apply.

## Proxy Configuration

Proxy settings must be configured on the proxy server itself. Intune policy proxy configuration is NOT fully supported and may cause unexpected behavior during Autopilot.

### WPAD/PAC File (Recommended)

Configure a WPAD entry or PAC file URL so devices automatically discover proxy settings via DNS. The device queries `wpad.<yourdomain>` or the PAC URL during OOBE before any Intune policy applies.

> **What breaks if misconfigured:** If WPAD/PAC is not discoverable, device uses no proxy during OOBE. If your network requires a proxy to reach internet, all Autopilot traffic is blocked.

### Authenticated Proxy Limitations

OOBE runs as the SYSTEM account. The SYSTEM account has no user credentials and cannot authenticate to a proxy requiring username/password.

**If your proxy requires authentication:** You must either:
1. Bypass proxy authentication for Autopilot endpoints (allowlist by destination URL or IP range)
2. Allow anonymous/unauthenticated access for the Autopilot endpoint set
3. Use certificate-based proxy authentication (machine certificate, not user certificate)

> **What breaks if misconfigured:** Authenticated proxy blocks SYSTEM account traffic during OOBE. Device hangs at "Identifying your device" screen. No error is shown to the user — the screen appears frozen. See: [ESP Troubleshooting](../l2-runbooks/02-esp-deep-dive.md)

### SSL Inspection

If your proxy performs SSL inspection (HTTPS decryption and re-encryption), certificates for Microsoft endpoints must be trusted on the provisioning device.

During OOBE, the device uses the Windows built-in certificate store — not a custom certificate deployed via Intune. Custom CA certificates from Intune policy are not available until after enrollment completes.

> **What breaks if misconfigured:** SSL inspection with an untrusted CA cert causes certificate validation errors on HTTPS connections. Device sees "unable to connect" errors at login.microsoftonline.com or ztd.dds.microsoft.com. Enrollment fails.

**Options for SSL inspection:**
- Deploy the proxy CA cert via a provisioning package (PPKG) loaded at OOBE
- Bypass SSL inspection for Microsoft cloud endpoints (recommended)
- Use a Microsoft-trusted CA for your proxy (validates against built-in Windows trust store)

## Test Commands

See [Network Endpoints](endpoints.md) for the full test command list including the built-in `Test-AutopilotConnectivity` function. The following supplementary tests validate specific infrastructure components:

### DNS Resolution

```powershell
# Verify DNS can resolve core Autopilot endpoints
Resolve-DnsName ztd.dds.microsoft.com
Resolve-DnsName cs.dds.microsoft.com
Resolve-DnsName login.microsoftonline.com
```

If these return no result or a private IP address, DNS is either broken or being redirected (split DNS misconfiguration).

### Port Connectivity

```powershell
# Test port 443 reachability for core endpoints
Test-NetConnection -ComputerName ztd.dds.microsoft.com -Port 443
Test-NetConnection -ComputerName cs.dds.microsoft.com -Port 443
Test-NetConnection -ComputerName login.microsoftonline.com -Port 443
Test-NetConnection -ComputerName enrollment.manage.microsoft.com -Port 443
```

`TcpTestSucceeded : True` = port open. `False` = firewall blocking.

### HTTPS Response

```powershell
# Verify HTTPS responds (not just port open)
Invoke-WebRequest -Uri https://cs.dds.microsoft.com -UseBasicParsing -TimeoutSec 5
Invoke-WebRequest -Uri https://ztd.dds.microsoft.com -UseBasicParsing -TimeoutSec 5
```

A 4xx or 5xx HTTP response is acceptable — it means the endpoint is reachable. A connection error or SSL error indicates a firewall or proxy issue.

### NTP

```powershell
# Verify NTP time synchronization
w32tm /stripchart /computer:time.windows.com /samples:3
```

### Proxy Detection

```powershell
# Check current system proxy configuration (run on the provisioning device)
netsh winhttp show proxy
```

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|-----------------|---------|---------|
| Port 443 blocked for ztd.dds.microsoft.com | Device cannot retrieve Autopilot profile; enrollment fails at "Identifying your device" | [Network Troubleshooting](../l2-runbooks/01-network-connectivity.md) |
| Port 443 blocked for login.microsoftonline.com | Entra join fails; no sign-in prompt appears | [Network Troubleshooting](../l2-runbooks/01-network-connectivity.md) |
| NTP blocked (UDP 123) | Clock skew error; Azure AD token validation fails | [Network Troubleshooting](../l2-runbooks/01-network-connectivity.md) |
| VPN required but no split-tunnel exclusions | No connectivity during OOBE; enrollment fails at connectivity check | [Network Troubleshooting](../l2-runbooks/01-network-connectivity.md) |
| Authenticated proxy during OOBE | Device hangs at "Identifying your device" — SYSTEM account cannot authenticate | [ESP Troubleshooting](../l2-runbooks/02-esp-deep-dive.md) |
| SSL inspection with untrusted CA | Certificate validation errors; HTTPS connections fail for all Microsoft endpoints | [Network Troubleshooting](../l2-runbooks/01-network-connectivity.md) |

## See Also

- [Network Endpoints](endpoints.md) — Canonical endpoint URL table with test commands
- [APv1 Admin Setup Overview](../admin-setup-apv1/00-overview.md)
- [OOBE Stage](../lifecycle/03-oobe.md)
