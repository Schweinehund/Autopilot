---
last_verified: 2026-03-11
review_by: 2026-06-09
applies_to: both
audience: both
---

> **Version gate:** This endpoint list applies to both Windows Autopilot v1 and v2 (Device Preparation). Some TPM attestation endpoints are only required for specific deployment modes or hardware. See the Criticality column for details.

# Autopilot Network Endpoints Reference

Canonical reference for all network endpoints required by Windows Autopilot. Runbooks and connectivity troubleshooting guides link here rather than listing URLs inline.

## Required Endpoints

| URL / Pattern | Service | Purpose | Criticality |
|---------------|---------|---------|-------------|
| `https://ztd.dds.microsoft.com` | Autopilot Deployment Service | Device registration lookup; ZTD profile download | Critical |
| `https://cs.dds.microsoft.com` | Autopilot Configuration Service | Configuration data | Critical |
| `https://login.live.com` | Windows Activation | Device activation during OOBE | Critical |
| `https://login.microsoftonline.com` | Microsoft Entra ID | User credential validation; device join | Critical |
| `https://graph.microsoft.com` | Microsoft Graph API | Intune device management queries | Critical |
| `https://enrollment.manage.microsoft.com` | Intune Enrollment | MDM enrollment initiation | Critical |
| `time.windows.com` (UDP/123) | NTP | Clock synchronization — skew >5 min blocks Kerberos and Azure AD token validation | Critical |
| `lgmsapeweu.blob.core.windows.net` | Autopilot Diagnostics Upload | Automatic diagnostic data upload | Non-critical |
| `*.msftconnecttest.com` | NCSI | Internet connectivity detection | Non-critical |
| `*.microsoftaik.azure.net` | TPM Attestation | TPM certificate validation | Required for self-deploy/pre-provision only |
| `https://ekop.intel.com/ekcertservice` | Intel Firmware TPM | EK cert retrieval (Intel fTPM) | Required if using Intel fTPM |
| `https://ekcert.spserv.microsoft.com/EKCertificate/GetEKCertificate/v1` | Qualcomm Firmware TPM | EK cert retrieval (Qualcomm fTPM) | Required if using Qualcomm fTPM |
| `https://ftpm.amd.com/pki/aia` | AMD Firmware TPM | EK cert retrieval (AMD fTPM) | Required if using AMD fTPM |

## Test Commands

### PowerShell

```powershell
# Run built-in connectivity test (covers 5 core endpoints)
Test-AutopilotConnectivity

# Manual single-endpoint test
Invoke-WebRequest -Uri "https://ztd.dds.microsoft.com" -UseBasicParsing -TimeoutSec 5

# Test NTP
w32tm /stripchart /computer:time.windows.com /samples:3
```

### Curl (when PowerShell unavailable)

```bash
curl -v --max-time 5 https://ztd.dds.microsoft.com
curl -v --max-time 5 https://cs.dds.microsoft.com
```

---

Endpoint list sourced from [Microsoft Learn: Windows Autopilot requirements](https://learn.microsoft.com/en-us/autopilot/requirements), updated July 2025.
