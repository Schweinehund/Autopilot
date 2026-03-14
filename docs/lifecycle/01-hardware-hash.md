---
last_verified: 2026-03-14
review_by: 2026-06-12
applies_to: both
audience: both
---

> **Version gate:** This guide primarily covers Windows Autopilot (classic). APv2 (Device Preparation) differences are noted inline. For a full comparison, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# Stage 1: Hardware Hash Import and Device Registration

## Context

Stage 1 of 5. This is the entry point for every [APv1](../_glossary.md#apv1) deployment: before a device can receive an Autopilot profile or progress through [OOBE](../_glossary.md#oobe), it must be registered in the Autopilot service using its [hardware hash](../_glossary.md#hardware-hash).

The hardware hash is a 4K-byte device fingerprint derived from hardware identifiers. The [ZTD](../_glossary.md#ztd) service uses this fingerprint to uniquely identify the physical device and associate it with a tenant and profile.

**Depends on:** Azure AD tenant configured; Intune licenses assigned; appropriate Graph API permissions in place.

**Feeds into:** Stage 2 — Profile Assignment.

---

## What the Admin Sees

You manage device registration in the Intune portal at **Devices > Enrollment > Windows Autopilot > Devices**. The Devices blade shows a table of registered devices with columns for Serial Number, Manufacturer, Model, Profile Status, and Group Tag.

When you upload a CSV file, the portal presents a file picker followed by an upload confirmation. Newly uploaded devices appear with "Not assigned" profile status until group membership is evaluated and a profile is assigned (Stage 2). Devices registered directly by OEMs appear here automatically — you do not need to perform an upload for OEM-registered hardware.

---

## What Happens

1. **Hash generated on device.** The hardware hash is collected from the device via the `MDM_DevDetail_Ext01` WMI class. This happens either at the factory (OEM registration), during OS setup (PowerShell collection), or on a running device before deployment.

2. **Hash uploaded via one of four methods.** You or the OEM submits the hash to the Autopilot service using one of the methods described in the table below.

3. **ZTD service creates a ZTDID.** The Autopilot service processes the upload and assigns the device a [ZTDID](../_glossary.md#ztdid) (Zero Touch Device ID) — its unique identifier within the service.

4. **Device is registered and ready for profile.** The device now appears in the Autopilot Devices list in Intune. Group Tag and Assigned User can be set at this point. Profile assignment begins when the device's Azure AD object joins the appropriate group (Stage 2).

### Import Methods

| Method | Who Initiates | How | Best For |
|---|---|---|---|
| CSV upload | Admin | Export hash with `Get-WindowsAutopilotInfo`, upload in Intune portal | Small batches, existing devices |
| OEM direct registration | OEM partner | OEM submits hash at factory via Microsoft API | New hardware at scale |
| PowerShell (Get-WindowsAutopilotInfo) | Admin or technician | Run script on device, outputs hash directly to Intune or CSV | IT-managed re-registration |
| Partner Center | CSP partner | CSP submits on behalf of customer tenant | Managed service scenarios |

---

## Behind the Scenes

> **L2 Note:**
>
> - The ZTD service (`ztd.dds.microsoft.com`) receives the device hardware data and creates the ZTDID by hashing the submitted device identifiers against the tenant.
> - Hash data originates from the `MDM_DevDetail_Ext01` WMI class on the device; specifically the `DeviceHardwareData` property.
> - After the hash upload, the ZTD service creates an Azure AD device object for the device (if one does not already exist) and marks it as an Autopilot device.
> - The Autopilot registration registry key (`HKLM:\SOFTWARE\Microsoft\Provisioning\Diagnostics\Autopilot`) is **not** populated at import time. It is populated later, when the device downloads its Autopilot profile during OOBE (Stage 3). See [registry-paths.md](../reference/registry-paths.md) for the full path reference.
> - ZTDID assignment is tenant-scoped — the same device can be de-registered from one tenant and re-registered in another, but the hash changes if hardware changes occur.

---

## Success Indicators

- Device appears in the Autopilot Devices list in Intune (Devices > Enrollment > Windows Autopilot > Devices)
- ZTDID is assigned (visible in device detail pane)
- No "Duplicate device record" error during upload
- Profile Status column shows "Not assigned" (awaiting group evaluation) or a profile name

---

## Failure Indicators

- **Hash not recognized:** Device does not appear after upload. Common causes: hash extracted before sysprep completion, unsupported hardware.
- **Duplicate device record:** Device already registered — either in this tenant or a previous one. Must be removed before re-registration.
- **Tenant mismatch:** Device registered to a different tenant. Requires removal from prior tenant before import.
- **Upload validation error:** CSV format incorrect; see Microsoft Learn for the correct column headers.

Error code reference: (available after Phase 3)
Remediation runbooks: (available after Phase 5)

---

## Typical Timeline

- **CSV upload processing:** Seconds to minutes for small batches; up to 15 minutes for large uploads.
- **OEM registration visibility:** Typically appears within minutes of device manufacture, but Azure AD object creation and group membership evaluation adds additional time.
- **Group membership propagation:** Up to 15 minutes after device object creation before dynamic group rules evaluate. Allow extra time for complex dynamic group queries in large tenants.

---

## Watch Out For

- **Stale device records on re-registration.** If a device was previously registered under the same or different tenant, the old record must be deleted before re-importing. Attempting to import a hash that already exists in the service produces a duplicate record error.
- **Hash from wrong image state.** Hardware hash must be captured from the final hardware configuration — after any hardware changes, BIOS updates, or physical component replacements. A hash from a pre-sysprep state or from a different hardware configuration will not match the shipping device.
- **Tenant mismatch.** Devices registered to a former employer's tenant or a previous MDM tenant cannot be enrolled into a new tenant without removal from the original tenant first. Check the device detail in Intune to see if a `CloudAssignedTenantId` is already present.

---

## Tool References

- [`Get-AutopilotHardwareHash`](../reference/powershell-ref.md#get-autopilothardwarehash) — Retrieves the device hardware hash via CIM from `MDM_DevDetail_Ext01`. Use to collect hash locally before CSV export.
- [`Get-AutopilotRegistrationState`](../reference/powershell-ref.md#get-autopilotregistrationstate) — Checks registration state from registry and WMI. Useful after OOBE to confirm the device received its profile (registry key populated at profile download, not at import).

**Further Reading:**

- [Microsoft Learn: Add devices to Windows Autopilot](https://learn.microsoft.com/en-us/autopilot/add-devices)
- [Microsoft Learn: Manually register devices with Windows Autopilot](https://learn.microsoft.com/en-us/autopilot/manual-registration)

> **APv2 Note:** Windows Autopilot Device Preparation does not require hardware hash pre-staging. Devices register automatically at OOBE based on tenant-level policy without prior import steps. No CSV upload or OEM pre-registration is required. See [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md) and the [Microsoft Learn Device Preparation overview](https://learn.microsoft.com/en-us/autopilot/device-preparation/overview) for details.

---

## Navigation

Previous: [Lifecycle Overview](00-overview.md) | Next: [Stage 2: Profile Assignment](02-profile-assignment.md)

---

## Version History

| Date | Change |
|------|--------|
| 2026-03-14 | Initial version |
