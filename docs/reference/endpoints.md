---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: all
audience: both
platform: all
---

> **Version gate:** This endpoint list covers Windows Autopilot (v1 and v2) and macOS ADE (Automated Device Enrollment). Some endpoints are platform-specific; see section headers. Windows TPM attestation endpoints are only required for specific deployment modes or hardware.

# Network Endpoints Reference

Canonical reference for all network endpoints required by Windows Autopilot and macOS ADE. Runbooks and connectivity troubleshooting guides link here rather than listing URLs inline.

## Windows Autopilot Endpoints

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

## Windows Test Commands

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

## macOS ADE Endpoints

Network endpoints required for macOS Automated Device Enrollment (ADE) via Apple Business Manager and Intune. Shared Microsoft endpoints are annotated with (shared) -- they appear in the Windows table above and must also be accessible for macOS enrollment.

### Apple-Specific Endpoints (ADE and MDM)

| URL / Pattern | Service | Purpose | Criticality |
|---------------|---------|---------|-------------|
| `https://deviceenrollment.apple.com` | Apple DEP | ADE provisional enrollment -- initial device discovery | Critical |
| `https://iprofiles.apple.com` | Apple Enrollment Profiles | Enrollment profile download for ADE via ABM/ASM | Critical |
| `https://mdmenrollment.apple.com` | Apple MDM Enrollment | Profile uploads and device/account lookups for ADE | Critical |
| `https://*.push.apple.com` (port 443, 2197, 5223) | Apple Push Notification Service (APNs) | MDM push notifications for all ongoing management commands | Critical |
| `https://*.business.apple.com` | Apple Business Manager | Admin portal access for device assignment and token management | Required for admin |
| `https://gdmf.apple.com` | Apple Software Updates | MDM server identification of available software updates | Required for updates |
| `https://identity.apple.com` | Apple Identity | APNs certificate request portal | Required for cert renewal |
| `https://vpp.itunes.apple.com` | VPP / Apps and Books | App license operations via MDM | Required if using VPP apps |
| `https://deviceservices-external.apple.com` | MDM Services | MDM servers disable Activation Lock on managed devices | Required for Activation Lock |

> **Warning:** Apple explicitly requires that SSL/HTTPS inspection be disabled for all Apple service endpoints. SSL inspection causes ADE and APNs to fail silently. Bypass SSL inspection for all `*.apple.com` and `*.push.apple.com` domains.

### Microsoft Endpoints (shared with Windows)

| URL / Pattern | Service | Purpose | Criticality |
|---------------|---------|---------|-------------|
| `https://login.microsoftonline.com` | Entra ID | (shared) User credential validation; Entra device join | Critical |
| `https://graph.microsoft.com` / `graph.windows.net` | Microsoft Graph | (shared) Intune device management queries | Critical |
| `https://*.manage.microsoft.com` | Intune Core | (shared) MDM enrollment, check-in, policy delivery | Critical |
| `https://EnterpriseEnrollment.manage.microsoft.com` | Intune Enrollment | (shared) MDM enrollment initiation | Critical |
| `https://enterpriseregistration.windows.net` | Entra Device Registration | (shared) Device Entra registration (Company Portal sign-in) | Critical |
| `https://login.live.com` / `account.live.com` | Microsoft Account | (shared) Microsoft account services | Required |

### macOS App and Script Deployment (CDN by Region)

| Region | CDN Endpoint | Port |
|--------|-------------|------|
| North America | `macsidecar.manage.microsoft.com` | TCP 443 |
| Europe | `macsidecareu.manage.microsoft.com` | TCP 443 |
| Asia Pacific | `macsidecarap.manage.microsoft.com` | TCP 443 |

Note: The `*.azureedge.net` variants of these endpoints are migrating to `*.manage.microsoft.com` starting March 2025.

### macOS Test Commands

```bash
# Check MDM enrollment status
profiles status -type enrollment

# Test Apple ADE discovery endpoint
curl -v --max-time 5 https://deviceenrollment.apple.com

# Test Apple enrollment profile endpoint
curl -v --max-time 5 https://iprofiles.apple.com

# Test APNs (port 5223 may require specific firewall rules)
curl -v --max-time 5 https://api.push.apple.com

# Test Intune MDM endpoint
curl -v --max-time 5 https://manage.microsoft.com

# Test Entra ID authentication
curl -v --max-time 5 https://login.microsoftonline.com

# Test ABM portal
curl -v --max-time 5 https://business.apple.com
```

---

Windows endpoint list sourced from [Microsoft Learn: Windows Autopilot requirements](https://learn.microsoft.com/en-us/autopilot/requirements), updated July 2025. Apple endpoints sourced from [Apple Support HT101555](https://support.apple.com/en-us/HT101555), updated July 2025. Microsoft Intune endpoints from [Microsoft Learn: Intune network endpoints](https://learn.microsoft.com/en-us/mem/intune/fundamentals/intune-endpoints), updated March 2026.
