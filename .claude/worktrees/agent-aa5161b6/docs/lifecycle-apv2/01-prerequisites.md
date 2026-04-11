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

ALL prerequisites below must be met before attempting an APv2 deployment. If any prerequisite is missing, the deployment will fail silently or produce unclear errors. Work through this checklist in order -- prerequisite 0 is the most critical and must be completed before any other step.

> **Warning:** If the device is registered as a Windows Autopilot device, the APv1 profile will take
> precedence over this APv2 policy -- silently. Complete prerequisite 0 before any other step.

- [ ] **0. Deregister device from Windows Autopilot (APv1)**
  - **Where to check:** Intune admin center > Devices > Windows > Windows enrollment > Devices
  - **What to do:** Search by serial number. If found, select > Delete.
  - **What happens if skipped:** Device deploys via APv1 ESP instead of APv2 -- no error shown. The APv1 profile silently takes precedence.

- [ ] **1. Windows 11 OS version gate**
  - **Where to check:** Device spec sheet or `winver` command on device
  - **Minimum versions:** Windows 11 24H2 or later (no KB required); Windows 11 23H2 with KB5035942 or later; Windows 11 22H2 with KB5035942 or later. April 2024 media includes the required KB.
  - **What happens if missing:** APv2 Device Preparation policy is ignored; device enrolls without APv2 configuration. Windows 10 is NOT supported.

- [ ] **2. Microsoft Entra automatic enrollment configured**
  - **Where to check:** Entra admin center > Mobility (MDM and WIP) > Microsoft Intune > MDM user scope
  - **What to do:** MDM user scope must be set to "Some" or "All" (not "None").
  - **What happens if missing:** Device cannot auto-enroll in Intune during OOBE; APv2 deployment fails at enrollment step.

- [ ] **3. First user has Microsoft Entra join permissions**
  - **Where to check:** Entra admin center > Devices > Device settings > Users may join devices to Microsoft Entra
  - **What to do:** Ensure the setting is "All" or the user/group is included.
  - **What happens if missing:** User cannot join the device to Entra ID during OOBE; enrollment fails.

- [ ] **4. Licensing (one of the following)**
  - **Where to check:** Microsoft 365 admin center > Users > Active users > select user > Licenses
  - **Valid licenses:** Microsoft 365 Business Premium; Microsoft 365 F1 or F3; Microsoft 365 Academic A1, A3, or A5; Microsoft 365 Enterprise E3 or E5; Enterprise Mobility + Security E3 or E5; Intune for Education; Microsoft Entra ID P1/P2 + Microsoft Intune subscription.
  - **What happens if missing:** Intune enrollment succeeds but APv2 policy may not apply; behavior is inconsistent.

- [ ] **5. Network connectivity**
  - **Where to check:** Network/firewall configuration
  - **Required:** DNS resolution for internet names; Ports 80 (HTTP), 443 (HTTPS), 123 (UDP/NTP) open; Key URLs: `login.live.com`, Microsoft Entra ID endpoints, Intune endpoints, `lgmsapeweu.blob.core.windows.net` (diagnostic upload), `time.windows.com` (UDP 123), `*.msftconnecttest.com` (NCSI).
  - **Not supported during OOBE:** Smart card / certificate-based authentication; Intune policy-based proxy configuration for privileged access deployments.
  - **What happens if missing:** Device cannot reach enrollment or deployment service endpoints; OOBE hangs or fails at network step.
  - **Full endpoint list:** See [Network Endpoints Reference](../reference/endpoints.md)

- [ ] **6. RBAC permissions for APv2 administrator**
  - **Where to check:** Intune admin center > Tenant administration > Roles
  - **Required permission categories (5):** Device configurations (Read, Delete, Assign, Create, Update); Enrollment programs (Enrollment time device membership assignment); Managed apps (Read); Mobile apps (Read); Organization (Read).
  - **What happens if missing:** Admin cannot create or assign Device Preparation policies; enrollment time group assignment fails silently.

## See Also

- [APv2 Overview](00-overview.md)
- [APv2 Deployment Flow](02-deployment-flow.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)
- [APv1 Lifecycle Overview](../lifecycle/00-overview.md)

---

*Prerequisites sourced from [Microsoft Learn -- APv2 Requirements](https://learn.microsoft.com/en-us/autopilot/device-preparation/requirements), verified April 2026.*
