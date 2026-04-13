---
last_verified: 2026-04-11
review_by: 2026-07-10
applies_to: APv2
audience: admin
---

> **Version gate:** This guide covers Windows Autopilot Device Preparation (APv2).
> For Windows Autopilot (classic), see [Autopilot Lifecycle Overview](../lifecycle/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# APv2 Prerequisites Checklist

ALL prerequisites below must be met before attempting an APv2 Device Preparation deployment. If any prerequisite is missing, the deployment will fail silently or produce unclear errors that are difficult to diagnose after the fact. Work through this checklist in order — prerequisite 0 is the most critical and must be completed first.

> **Warning:** If the device is registered as a Windows Autopilot device, the APv1 profile will take
> precedence over this APv2 policy — silently. Complete prerequisite 0 before any other step.

## Checklist

- [ ] **0. Deregister device from Windows Autopilot (APv1)**
  - **Where to check:** Intune admin center > Devices > Windows > Windows enrollment > Devices
  - **What to do:** Search by serial number. If the device appears in the list, it is registered with APv1. Select the device > Delete.
  - **What happens if skipped:** Device deploys via APv1 ESP instead of APv2 — no error shown. The APv1 profile silently takes precedence over the APv2 Device Preparation policy. The admin sees ESP behavior and assumes APv2 is broken, when in fact APv1 is running.

- [ ] **1. Windows 11 OS version gate**
  - **Where to check:** Device spec sheet or `winver` command on the device
  - **Minimum versions:**
    - Windows 11 24H2 or later (no KB required)
    - Windows 11 23H2 with KB5035942 or later
    - Windows 11 22H2 with KB5035942 or later
    - April 2024 or later OEM media includes the required KB
  - **Supported editions:** Pro, Pro Education, Pro for Workstations, Enterprise, Education, Enterprise LTSC
  - **What happens if missing:** APv2 Device Preparation policy is ignored. The device enrolls in Intune without APv2 configuration — no error is displayed during OOBE. Windows 10 is NOT supported for APv2.

- [ ] **2. Microsoft Entra automatic enrollment configured**
  - **Where to check:** Entra admin center > Mobility (MDM and WIP) > Microsoft Intune > MDM user scope
  - **What to do:** MDM user scope must be set to "Some" or "All" (not "None"). If set to "Some", ensure the enrolling user is in the included group.
  - **What happens if missing:** Device cannot auto-enroll in Intune during OOBE. The APv2 deployment fails at the enrollment step because the device never reaches Intune management.

- [ ] **3. First user has Microsoft Entra join permissions**
  - **Where to check:** Entra admin center > Devices > Device settings > Users may join devices to Microsoft Entra
  - **What to do:** Ensure the setting is "All" or the enrolling user/group is included in the allowed list.
  - **What happens if missing:** User cannot join the device to Entra ID during OOBE. Enrollment fails at the Entra join step with an access denied error.

- [ ] **4. Licensing (one of the following)**
  - **Where to check:** Microsoft 365 admin center > Users > Active users > select user > Licenses
  - **Valid licenses:**
    - Microsoft 365 Business Premium
    - Microsoft 365 F1 or F3
    - Microsoft 365 Academic A1, A3, or A5
    - Microsoft 365 Enterprise E3 or E5
    - Enterprise Mobility + Security E3 or E5
    - Intune for Education
    - Microsoft Entra ID P1/P2 + Microsoft Intune subscription
  - **What happens if missing:** Intune enrollment may succeed but the APv2 Device Preparation policy may not apply. Behavior is inconsistent — some deployments appear to work while others fail without clear error messages.

- [ ] **5. Network connectivity**
  - **Where to check:** Network/firewall configuration
  - **Required:**
    - DNS resolution for internet names
    - Port 80 (HTTP), 443 (HTTPS), 123 (UDP/NTP) open outbound
    - Key URLs: `login.live.com`, Microsoft Entra ID endpoints, Intune endpoints, `lgmsapeweu.blob.core.windows.net` (diagnostic upload), `time.windows.com` (UDP 123), `*.msftconnecttest.com` (NCSI)
  - **Not supported during OOBE:**
    - Smart card / certificate-based authentication
    - Intune policy-based proxy configuration for privileged access deployments
  - **What happens if missing:** Device cannot reach enrollment or deployment service endpoints. OOBE hangs at the network connection step or fails at enrollment with a generic network error.
  - **Full endpoint list:** See [Network Endpoints Reference](../reference/endpoints.md)

- [ ] **6. RBAC permissions for APv2 administrator**
  - **Where to check:** Intune admin center > Tenant administration > Roles
  - **Required permission categories (5):**
    - Device configurations: Read, Delete, Assign, Create, Update
    - Enrollment programs: Enrollment time device membership assignment
    - Managed apps: Read
    - Mobile apps: Read
    - Organization: Read
  - **What happens if missing:** Admin cannot create or assign Device Preparation policies. The "Enrollment time device membership assignment" permission is specifically required for ETG — without it, the admin can create a policy but the device will not be added to the security group at enrollment time. The failure is silent from the device side.

## See Also

- [APv2 Overview](00-overview.md)
- [APv2 Deployment Flow](02-deployment-flow.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)
- [APv1 Lifecycle Overview](../lifecycle/00-overview.md)

---

*Prerequisites sourced from [Microsoft Learn -- APv2 Requirements](https://learn.microsoft.com/en-us/autopilot/device-preparation/requirements), verified April 2026.*
