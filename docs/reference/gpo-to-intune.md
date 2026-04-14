---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: admin
platform: Windows
---

> **Version gate:** This guide covers migrating Group Policy Objects to Intune using Group Policy Analytics. Applies to both APv1 and APv2 managed devices. Devices must be Entra joined (cloud-only or hybrid) for Intune policies to apply.

# GPO-to-Intune Policy Migration Guide

Organizations transitioning from on-premises Active Directory Group Policy to Intune-managed policy use Group Policy Analytics (GPA) to assess and migrate GPO settings. This guide is organized by business outcome — what the policy achieves — rather than by GPO setting name. This reduces the mapping effort and avoids migrating settings that no longer apply in a cloud-managed environment.

## Migration Prerequisites

- GPO baseline exported as XML from Group Policy Management Console (GPMC.msc)
- XML files must use Unicode encoding — ANSI-encoded exports fail to import into GPA
- Each XML file must be under 4 MB for GPA import (split large GPO backups if needed)
- Inventory of which GPOs apply to which OUs, to determine targeting in Intune (assignment groups or Intune filters)

## Steps: Using Group Policy Analytics

### Step 1: Export GPOs as XML

1. Open **GPMC.msc** (Group Policy Management Console) on a domain controller or management workstation.
2. In the left pane, expand your domain and locate the GPO to export.
3. Right-click the GPO > **Save report**.
4. Set the format to **XML** and save to a local folder.
5. Verify the saved file opens correctly and is not ANSI-encoded (open in Notepad++ and check encoding — should be UTF-16 or UTF-8 with BOM).

Repeat for each GPO in scope.

### Step 2: Import into Group Policy Analytics

1. Navigate to **Intune admin center** > Devices > Manage devices > **Group Policy analytics**.
2. Select **Import**.
3. Upload the XML file (maximum 4 MB per file).
4. Wait for analysis to complete — typically 30–60 seconds per file.
5. Repeat for each GPO XML file.

### Step 3: Review the MDM Support Report

GPA generates a per-setting report for each imported GPO. Each setting is categorized as one of three statuses:

| GPA Status | Meaning | Action |
|------------|---------|--------|
| **Ready for migration** | A matching Intune setting exists in Settings Catalog | Migrate using the GPA "Migrate" button |
| **Not supported** | No MDM equivalent exists | Evaluate whether the outcome is still needed (see Step 5) |
| **Deprecated** | Applies to old Windows versions or a deprecated feature (e.g., IE) | Remove from migration scope |

The **MDM Support percentage** is the ratio of "Ready for migration" settings to total settings in the GPO. A high percentage means the GPO migrates cleanly. A low percentage means significant manual evaluation is needed.

### Step 4: Migrate supported settings

For settings with "Ready for migration" status:

1. In the GPA report, select the settings to migrate.
2. Select **Migrate** to create a Settings Catalog profile pre-populated with the matching Intune settings.
3. Review the auto-created profile before assigning — verify each setting value matches the GPO intent.
4. Assign the profile to the equivalent device or user group in Intune.
5. Verify the policy applies to pilot devices before expanding to production groups.

> **What breaks if sequenced incorrectly:** Admin migrates GPO settings to Intune but leaves the original GPO active in Active Directory. Both GPO and Intune apply the same settings. If the values differ, "last write wins" behavior is unpredictable — the admin cannot rely on which policy takes effect. Always remove the GPO from the OU scope (or block inheritance) AFTER confirming the Intune policy applies correctly to the target devices.

### Step 5: Handle unsupported settings

For settings with "Not supported" status, evaluate by the business outcome the setting achieves:

- **If the outcome is still needed:** Use a Custom OMA-URI profile in Intune. This requires knowledge of the corresponding [Configuration Service Provider (CSP)](https://learn.microsoft.com/en-us/windows/client-management/mdm/configuration-service-provider-reference). Advanced — involve a desktop engineer.
- **If the outcome is no longer needed:** Add to the "Do not migrate" list with a documented reason.
- **If unsure:** Leave in the "Evaluate" backlog and proceed with supported settings first.

## Outcome-Based Policy Organization

Migrate by business outcome, not by GPO setting name. The table below maps common policy outcomes to their Intune implementation.

| Business Outcome | GPO Location | Intune Implementation | Notes |
|-----------------|--------------|----------------------|-------|
| Require device encryption | Computer Config > Windows Settings > Security Settings > BitLocker | Endpoint security > Disk encryption > BitLocker profile, or Settings Catalog > BitLocker | Two implementation paths — both valid; avoid applying both simultaneously |
| Enforce password complexity | Computer Config > Windows Settings > Security Settings > Account Policies | Settings Catalog > DeviceLock settings, or Endpoint security > Account protection | User-targeted or device-targeted depending on scope |
| Control USB access | Computer Config > Administrative Templates > System > Removable Storage Access | Settings Catalog > Removable Storage settings | Block read and write separately if needed |
| Restrict Control Panel access | User Config > Administrative Templates > Control Panel | Settings Catalog > ControlPanel settings | User-targeted policy in Intune |
| Configure Windows Update behavior | Computer Config > Administrative Templates > Windows Components > Windows Update | Update rings for Windows 10/11 | Native Intune feature — no GPO equivalent needed; richer options than GPO |
| Restrict local account logon | Computer Config > Windows Settings > Security Settings > Local Policies > User Rights | Custom OMA-URI or Windows LAPS (for local admin management) | Not available in Settings Catalog — advanced configuration required |
| Apply desktop wallpaper | User Config > Administrative Templates > Desktop | Settings Catalog > Desktop policies | User-targeted in Intune |
| Configure Microsoft Edge settings | Computer Config > Administrative Templates > Microsoft Edge | Settings Catalog > Microsoft Edge settings | Most Edge GPO settings have direct Settings Catalog equivalents |

## "Do Not Migrate" List

Some GPO categories should not be migrated to Intune. They depend on on-premises infrastructure that no longer exists for cloud-managed devices, or the setting has been replaced by a native Intune feature.

| GPO Category | Why Not Migrate | Modern Alternative |
|-------------|-----------------|-------------------|
| Login scripts (logon/logoff scripts) | Scripts execute at domain logon — no domain in cloud-only environments | Intune PowerShell scripts (run once or repeatedly) or Intune Remediation scripts |
| Folder redirection | Redirects to on-premises UNC paths not accessible to cloud-only devices | OneDrive Known Folder Move (configured via Intune) |
| IE Enhanced Security Configuration | Internet Explorer is deprecated and removed from Windows 11 | Remove — no alternative needed |
| WMI filter-based GPOs | No MDM equivalent for WMI-based targeting logic | Intune filters (device property-based) or Entra ID dynamic groups |
| Environment-specific GPOs (printer mappings, drive mappings to on-prem servers) | References on-premises paths or servers not available to cloud devices | Universal Print for printers; OneDrive/SharePoint for file shares; Intune scripts for complex mappings |
| Drive mapping GPOs | Maps network drives to on-premises file servers | OneDrive, SharePoint, or Intune PowerShell script for UNC path drives |

> **Admin Note:** Attempting to migrate login scripts or folder redirection as Custom OMA-URI entries will technically succeed in Intune but fail at runtime on cloud-only devices because the scripts reference domain resources (SYSVOL, UNC paths, AD security groups) that are not reachable. These must be replaced with cloud-native alternatives before migration.

## Rollback/Recovery

Keep GPOs active in Active Directory alongside Intune policies during transition. Do not delete or disable GPOs until Intune policy application is confirmed for all target devices.

**Parallel operation model:**
- Run GPO and Intune settings in parallel during the pilot phase
- After confirming Intune policy applies correctly, block GPO inheritance or remove devices from the GPO's scope
- Delete or disable the GPO only after all devices have left the OU or scope where the GPO applies
- For cloud-only devices (Entra join, no domain): GPOs never apply; remove GPOs from scope immediately after device re-enrollment

**If Intune policy fails to apply:**
- Check policy assignment — verify the correct group is assigned
- Check device compliance — some Intune policies require a compliant device
- Check policy conflict — two Intune profiles may have conflicting settings (Intune admin center > Devices > [device] > Device configuration > conflict)
- Fall back to GPO temporarily by reversing the scope removal

## Verification

- [ ] GPA report generated for all GPOs in scope
- [ ] All "Ready for migration" settings migrated to Settings Catalog profile
- [ ] Pilot devices show Intune profile as "Succeeded" in device configuration view
- [ ] Settings verified on pilot devices (registry/PowerShell check or manual UI verification)
- [ ] "Not supported" settings evaluated — each either has a Custom OMA-URI replacement or added to "Do not migrate" list
- [ ] Original GPOs removed from pilot device OUs after Intune confirmation

## Configuration-Caused Failures

| Misconfiguration | Symptom | Resolution |
|------------------|---------|------------|
| GPO left active alongside conflicting Intune policy | Setting value unpredictable — either GPO or Intune "wins" depending on timing | Remove GPO from OU scope after confirming Intune policy applies |
| XML file ANSI-encoded | GPA import fails with encoding error | Re-export from GPMC ensuring Unicode format; use Notepad++ to verify encoding |
| XML file over 4 MB | GPA rejects import | Split GPO backup into multiple smaller XML files |
| Custom OMA-URI CSP path incorrect | Policy reports as "Error" in device configuration view | Cross-reference CSP documentation on Microsoft Learn; use Intune diagnostic logs to identify the failing URI |
| Login script migrated as Intune script — references SYSVOL | Script fails silently on cloud-only devices — domain paths not reachable | Replace with cloud-native alternative (Intune Remediation scripts with local resources) |
| "Do not migrate" setting migrated anyway | Setting applies but has no effect (e.g., folder redirection to unreachable UNC path) | Remove Intune profile and replace with modern alternative |

## See Also

- [Imaging-to-Autopilot Migration Guide](imaging-to-autopilot.md)
- [APv1-to-APv2 Migration Playbook](apv1-apv2-migration.md)
- [Configuration-Caused Failures Reference](../admin-setup-apv1/10-config-failures.md)
