---
last_verified: 2026-03-11
review_by: 2026-06-09
applies_to: both
audience: both
---

> **Version gate:** This guide applies to Windows Autopilot (classic). For Autopilot Device Preparation, see below.

# APv1 vs APv2: Which Autopilot Are You Troubleshooting?

Microsoft now maintains two distinct Autopilot frameworks: Windows Autopilot (APv1, the original classic framework) and Windows Autopilot Device Preparation (APv2, introduced for Windows 11). This page helps you determine which framework applies to your deployment so you follow the correct troubleshooting documentation. When in doubt, check whether hardware hash pre-staging was required to set up the device — that alone identifies APv1.

## Feature Comparison

| Feature | APv1 (Windows Autopilot) | APv2 (Device Preparation) |
|---------|--------------------------|--------------------------|
| Hardware hash registration required | Yes | No |
| Enrollment Status Page (ESP) | Yes (configured separately) | No (integrated into policy) |
| Pre-provisioning (white glove) | Yes | No |
| Self-deploying mode | Yes | No |
| Hybrid Entra join | Yes | No |
| Windows 10 support | Yes | No (Windows 11 only, 22H2+) |
| User-driven mode | Yes | Yes |
| Automatic deployment | No | Yes |
| Microsoft Entra join | Yes | Yes |
| GCCH / DoD environments | No | Yes |
| Win32 + LOB apps in same deployment | No | Yes |
| Near real-time monitoring | No | Yes |
| Max apps during OOBE | 100 | 25 |
| Device naming template | Yes | Yes (as of 2025) |
| Autopilot Reset support | Yes | No |
| HoloLens support | Yes | No |
| Teams Meeting Room support | Yes | No |
| Simpler admin configuration | No | Yes |
| Extensive OOBE customization | Yes | No |
| Blocks desktop until user config applied | Yes | No |

## Which Guide Do I Use?

**Use APv1 (Windows Autopilot) docs if:**
- You require pre-provisioning (white glove) before device delivery
- You need hybrid Entra join (simultaneous on-premises AD + Azure AD join)
- You need self-deploying mode for kiosks or shared/userless devices
- You are deploying to Windows 10 devices
- You require Autopilot Reset to re-provision already-deployed devices
- You are provisioning HoloLens or Teams Meeting Room devices

**Use APv2 (Device Preparation) docs if:**
- You want no hardware hash pre-staging (enroll devices without prior registration)
- You require GCCH or DoD cloud environment support
- You need Win32 apps and LOB apps to install in the same deployment
- You want near real-time deployment monitoring
- Your environment is Windows 11 22H2 or later (cloud-native, no on-premises AD)

**Note:** Both frameworks cannot run on the same device simultaneously. If both an APv1 profile and an APv2 policy exist in the tenant, the APv1 profile takes precedence.

## Important Notes

- "Extensive OOBE customization" (custom branding, skip screens, custom error messages) is APv1-only; APv2 offers limited OOBE customization.
- APv1 blocks the Windows desktop until device-targeted configuration is fully applied; APv2 does not block desktop access in the same way.
- This documentation suite primarily covers APv1 (classic). APv2-specific content is noted where applicable and will be expanded in a future documentation phase.

---

*Feature comparison sourced from [Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/compare), updated April 2025.*
