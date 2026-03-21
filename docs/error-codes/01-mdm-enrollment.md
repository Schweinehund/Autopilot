---
last_verified: 2026-03-14
review_by: 2026-06-12
applies_to: APv1
audience: both
---

> **Version gate:** This guide primarily covers Windows Autopilot (classic). APv2 differences are noted inline. For a full comparison, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# MDM Enrollment Errors (0x8018xxxx Series)

These errors occur during [OOBE](../_glossary.md#oobe) when the device attempts [MDM](../_glossary.md#mdm) enrollment with [Intune](../_glossary.md#intune). They are most commonly seen during Stage 3 of the [Autopilot lifecycle](../lifecycle/03-oobe.md).

**Phase:** Reg=Registration · OOBE=Out-of-Box Experience · ESP=Enrollment Status Page · Post=Post-enrollment
**Mode:** UD=User-Driven · PP=Pre-Provisioning · SD=Self-Deploying · All=All modes

| Code | # | Name | Phase | Mode | Cause | L1 Action | L2 Fix |
|------|---|------|-------|------|-------|-----------|--------|
| 0x8007064c | 1 | AlreadyEnrolled (Legacy) | [OOBE](../lifecycle/03-oobe.md) | All | Previous enrollment certificate still present; typically a cloned or reimaged device | Confirm device is not a clone; **Escalate** — collect: serial, error code, mode, timestamp | Remove stale enrollment cert: [`Reset-AutopilotRegistration`](../reference/powershell-ref.md#reset-autopilotregistration); check `HKLM:\SOFTWARE\Microsoft\Enrollments` via [`Get-AutopilotRegistrationState`](../reference/powershell-ref.md#get-autopilotregistrationstate) |
| 0x80180005 | 1 | DeviceNotSupported (MDM) | [OOBE](../lifecycle/03-oobe.md) | UD, PP | Autopilot profile not assigned to device before enrollment attempt | Verify device appears in Intune admin center > Devices > Windows > Enrollment > Windows Autopilot; confirm profile is assigned (no retry until profile assigned) | Check dynamic group membership and assignment filter; ensure profile assignment synced before OOBE started |
| 0x8018000a | 1 | AlreadyEnrolled (MDM) | [OOBE](../lifecycle/03-oobe.md) | All | Device already enrolled by another user or account | Check device in Intune admin center; if stale record exists, select Retire then delete the record, then retry OOBE | [`Remove-AutopilotDevice`](../reference/powershell-ref.md#remove-autopilotdevice) then re-register; check `HKLM:\SOFTWARE\Microsoft\Enrollments` for orphaned enrollment via [`Get-AutopilotRegistrationState`](../reference/powershell-ref.md#get-autopilotregistrationstate) |
| 0x80180014 | 1 | DeviceNotSupported (Intune) | [OOBE](../lifecycle/03-oobe.md) | PP, SD | Prior Intune device record not deleted before redeployment in SD/PP mode | In Intune admin center > Devices > Windows, find the device and select Unblock device (no retry until unblocked) | [`Remove-AutopilotDevice`](../reference/powershell-ref.md#remove-autopilotdevice) then re-import; see [L2 Runbooks](../l2-runbooks/00-index.md) |
| 0x80180014 | 2 | DeviceNotSupported (Intune) | [OOBE](../lifecycle/03-oobe.md) | All | Windows MDM enrollment blocked in tenant enrollment restrictions | **Escalate** — collect: serial, error code, mode, timestamp; L1 cannot modify enrollment restrictions | Intune admin center: Devices > Enrollment > Device platform restriction > Windows (MDM) > change to Allow |
| 0x80180018 | 1 | LicenseError (MDM) | [OOBE](../lifecycle/03-oobe.md) | All | Missing or invalid Intune, EMS, or M365 license on the enrolling user account | Verify user license in Microsoft 365 admin center > Active users > select user > Licenses; assign Intune/EMS/M365 license if missing (no retry — won't self-resolve without license) | Assign valid Intune license to user; verify license propagation in Entra ID; see [L2 Runbooks](../l2-runbooks/00-index.md) |
| 0x80180019 | 1 | TenantMismatch (MDM) | [OOBE](../lifecycle/03-oobe.md) | All | Device registered to a different tenant than the user authenticating during OOBE | Confirm user account domain matches the Autopilot tenant; **Escalate** — collect: serial, error code, mode, timestamp, user UPN | [`Remove-AutopilotDevice`](../reference/powershell-ref.md#remove-autopilotdevice) then re-register in correct tenant; verify tenant ID in [`HKLM:\...\AutopilotSettings`](../reference/registry-paths.md#autopilotsettings) |
| 0x80180020 | 1 | MDMDisabled (Tenant) | [OOBE](../lifecycle/03-oobe.md) | All | MDM auto-enrollment scope set to None in Microsoft Entra ID; enrollment is globally disabled | **Escalate** — collect: serial, error code, mode, timestamp; tenant-wide MDM scope change requires admin action | Entra admin center: Mobility (MDM and MAM) > Microsoft Intune > MDM user scope > change from None to All or targeted group |
| 0x80180022 | 1 | UnsupportedEdition (MDM) | [OOBE](../lifecycle/03-oobe.md) | All | Device running Windows Home edition; Intune MDM enrollment requires Pro or higher | Confirm edition via Settings > System > About; **Escalate** — collect: serial, error code, mode, timestamp, Windows edition | Upgrade device to Windows Pro or Enterprise; re-register if needed; Windows Home cannot be enrolled in Intune |
| 0x80180026 | 1 | ConflictClient (MDM) | [OOBE](../lifecycle/03-oobe.md) | UD | Intune PC software agent installed AND MDM auto-enrollment both active; enrollment conflict | **Escalate** — collect: serial, error code, mode, timestamp; dual-agent conflict requires L2 to remove legacy agent | Uninstall Intune PC software agent before MDM enrollment; only one management path supported at a time |
| 0x8018002b | 1 | UPNNonRoutable (MDM) | [OOBE](../lifecycle/03-oobe.md) | All | User UPN contains unverified or non-routable domain suffix (e.g., .local, .internal) | Verify user UPN in Microsoft 365 admin center > Active users; confirm domain suffix is verified in Entra ID (no retry until UPN corrected) | Update user UPN to use a verified routable domain; add and verify the domain in Entra admin center > Custom domain names first |

---

Prev: [Error Code Index](00-index.md) | Next: [TPM Attestation Errors](02-tpm-attestation.md)

> **APv2 Note:** The following errors in this category have also been observed in Windows Autopilot Device Preparation ([APv2](../apv1-vs-apv2.md)) deployments. For framework differences, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).
>
> - **0x80180018** — Licensing check behavior is the same in APv2 Device Preparation; a valid Intune license is required regardless of framework.
>
> All other 0x8018xxxx errors in this file apply to classic Autopilot (APv1) flows. APv2 Device Preparation uses a different enrollment path and most of these codes have not been documented by Microsoft as occurring in APv2. Verify against Device Preparation known issues before tagging additional codes.

## Version History

| Date | Change |
|------|--------|
| 2026-03-14 | Initial creation |
