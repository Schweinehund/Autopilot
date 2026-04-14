---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: admin
platform: Windows
---

> **Version gate:** Licensing requirements are the same for APv1 and APv2. For feature differences between frameworks, see [APv1 vs APv2](../apv1-vs-apv2.md).

# Autopilot Licensing Requirements

Autopilot requires both Microsoft Intune and Entra ID P1 (formerly Azure AD Premium P1). These are included together in all Microsoft 365 bundles and Enterprise Mobility + Security suites. A user missing either entitlement will Entra-join successfully but MDM enrollment will fail silently.

> **What breaks if misconfigured:** User assigned a license without Intune entitlement. Auto-enrollment to MDM fails silently. Device joins Entra but MDM policies never apply. Admin sees "Managed by: None" in device properties.

## Required Licenses

Any one license from the table below satisfies the minimum requirements. Each license includes both Intune and Entra ID P1.

| License | Includes Intune | Includes Entra P1 | Autopilot Supported | Notes |
|---------|-----------------|--------------------|--------------------|-------|
| Microsoft 365 Business Premium | Yes | Yes | Yes | SMB SKU (up to 300 users); no Windows Subscription Activation |
| Microsoft 365 F1 | Yes (limited) | Yes | Yes | Frontline workers; browser-based apps only; limited app deployment |
| Microsoft 365 F3 | Yes | Yes | Yes | Frontline workers; full Intune; desktop apps included |
| Microsoft 365 E3 | Yes | Yes | Yes | Includes Windows Subscription Activation (Pro→Enterprise upgrade) |
| Microsoft 365 E5 | Yes | Yes | Yes | Adds Microsoft Defender for Endpoint Plan 2 to E3 |
| Microsoft 365 A1 | Yes | Yes | Yes | Academic; A1 is free tier for qualifying institutions |
| Microsoft 365 A3 | Yes | Yes | Yes | Academic; equivalent to E3 for education |
| Microsoft 365 A5 | Yes | Yes | Yes | Academic; equivalent to E5 for education |
| EMS E3 | Yes | Yes | Yes | Standalone (no Microsoft 365 apps); add-on option |
| EMS E5 | Yes | Yes | Yes | Adds Microsoft Defender for Identity and Cloud App Security to EMS E3 |
| Intune for Education | Yes | Yes | Yes | Education-specific; bundled with School Data Sync |
| Entra ID P1 + Intune standalone | Combined | Yes (Entra P1) | Yes | A la carte; assign both licenses per user |

**Minimum combination (a la carte):** Entra ID P1 + Microsoft Intune Plan 1 (standalone). Both must be assigned to the provisioning user.

## Feature-to-License Mapping

Some Autopilot features require licenses beyond the base requirement. Verify your SKU covers the features you plan to deploy.

| Feature | Minimum License | Notes |
|---------|-----------------|-------|
| Autopilot user-driven mode | Any license in table above | Base capability |
| Autopilot pre-provisioning (technician phase) | Any license in table above | APv1 only; no additional license |
| Autopilot self-deploying mode | Any license in table above | APv1 only; no additional license |
| APv2 (Device Preparation) | Any license in table above | Same licensing as APv1 |
| Autopilot Reset | Any license in table above | APv1 only; no additional license |
| Dynamic device groups | Entra ID P1 (included in all above) | Required for automatic profile assignment by group membership |
| Windows Subscription Activation (Pro→Enterprise) | Microsoft 365 E3, E5, or A3/A5 | NOT available in Business Premium or F-series; manual OS upgrade required without this |
| Microsoft Defender for Endpoint (P2) | Microsoft 365 E5 or Defender for Endpoint standalone | Defender P1 included in M365 Business Premium |
| Endpoint Analytics (Intune suite) | Intune Plan 2 or Microsoft Intune Suite add-on | Optional; required for advanced deployment reporting |

> **What breaks if missing Windows Subscription Activation:** Devices provisioned with Windows 10/11 Pro remain on Pro SKU after Autopilot enrollment. Enterprise-only policies (AppLocker, Credential Guard, etc.) do not apply. Users see "Windows 11 Pro" in Settings instead of "Windows 11 Enterprise."

## License Assignment Verification

Before running Autopilot provisioning, verify each user account has the correct license assigned:

```powershell
# Check license assignment for a user (requires Microsoft Graph PowerShell module)
Get-MgUserLicenseDetail -UserId "user@contoso.com" | Select-Object SkuPartNumber
```

Expected output includes at minimum: a SKU containing `INTUNE` and `AAD_PREMIUM` (Entra P1).

From Intune admin center: Navigate to **Intune admin center** > **Users** > select user > **Licenses** — verify Intune and Entra ID P1 appear in the assigned licenses list.

## See Also

- [Entra ID Prerequisite Configuration](entra-prerequisites.md)
- [APv1 vs APv2](../apv1-vs-apv2.md)
- [APv1 Admin Setup Overview](../admin-setup-apv1/00-overview.md)
