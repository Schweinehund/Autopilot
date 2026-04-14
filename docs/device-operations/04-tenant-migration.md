---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: admin
platform: Windows
---

> **Version gate:** Tenant migration is not a formally supported Intune scenario — this is a best-effort process documented from official Microsoft support guidance. Microsoft does not provide automated tooling for tenant-to-tenant device migration. Test the process in a non-production environment before executing at scale.

# Tenant-to-Tenant Device Migration

Tenant migration moves Windows Autopilot-registered devices from one Microsoft 365 tenant (Tenant A) to another (Tenant B). This is required when organizations merge, split, or are acquired. The process involves deregistering devices from Tenant A's Autopilot service, removing MDM enrollment, and re-registering hardware hashes into Tenant B.

> **Critical warnings — read before proceeding:**
>
> - **Do NOT use Autopilot Reset during tenant migration.** Autopilot Reset leaves the device managed by the old tenant. Use "Reset this PC" in Windows Settings or the Intune Wipe action instead.
> - **500-device batch limit** for hardware hash uploads into Intune. Large migrations must be broken into batches of 500 or fewer.
> - **No undo after deletion from Tenant A.** Once a device is deregistered from Tenant A, the process must complete. Incomplete migrations leave devices unmanaged.
> - **Time is critical.** Leaving too much time between removal from Tenant A and import to Tenant B results in unmanaged devices in the field. Plan batch timing carefully.

---

## Prerequisites

- Admin rights in both Tenant A (source) and Tenant B (destination) Intune environments
- Intune Service Administrator or Global Administrator role in each tenant
- Hardware hash collection method available (see below)
- Tenant B: Autopilot deployment profile (APv1) or Device Preparation policy (APv2) pre-configured and ready to assign
- Tenant B: Required licenses assigned to the migration target user accounts

### Migration Prerequisites

- Inventory of all devices being migrated (serial numbers, assigned users, current profiles)
- Tenant B user accounts created and licensed before devices are re-registered
- Tenant B groups and policies configured and tested with a pilot batch before full migration
- Network endpoints for both tenants reachable from devices during transition period. See [Network Endpoints Reference](../reference/endpoints.md).

---

## Method 1: Online Migration (Tight Timeline — Days)

Use this method for smaller batches (under 500 devices) when migration must complete within days. Devices must be accessible (turned on and network-connected) during the process.

### Step 1: Collect Hardware Hashes from Tenant A Devices

Collect hardware hashes before deregistering devices. Once a device is wiped, the hash must be collected again from the running OS.

```powershell
# Collect hardware hash and save to CSV (run on each device or via remote session)
Install-Script -Name Get-WindowsAutoPilotInfo -Force
Get-WindowsAutoPilotInfo -online -OutputFile C:\Temp\device-hashes.csv
```

Alternative for bulk collection via Microsoft Configuration Manager:
- Run the Autopilot hardware hash collection task sequence against all target devices.

### Step 2: Delete Devices from Tenant A

For each device being migrated:

1. In Tenant A **Intune admin center**, navigate to **Devices** > **All devices**.
2. Select the device and choose **Delete** to remove the Intune enrollment record.
3. Navigate to **Devices** > **Windows** > **Enrollment** > **Windows Autopilot devices**.
4. Search by serial number, select the device, and choose **Delete** to remove the Autopilot registration.

> **What breaks if sequenced incorrectly:** Deleting the Autopilot registration before collecting the hardware hash means you must re-collect the hash from the device's running OS. Do not delete from Tenant A until hashes are confirmed collected and saved.

### Step 3: Reset Devices

On each device, perform a full OS reset using one of:

- **Windows Settings**: Settings > System > Recovery > **Reset this PC** > Remove everything
- **Intune Wipe action**: Intune admin center > Devices > All devices > device > **Wipe** (with no enrollment retention)

> **Do NOT use Autopilot Reset.** Autopilot Reset re-applies the Tenant A configuration and leaves the device bound to Tenant A's Autopilot service.

### Step 4: Import Hardware Hashes into Tenant B

1. In Tenant B **Intune admin center**, navigate to **Devices** > **Windows** > **Enrollment** > **Windows Autopilot devices**.
2. Select **Import**.
3. Upload the CSV file collected in Step 1.
4. Wait for import to complete (up to 15 minutes for large files). Refresh to verify devices appear.

> **500-device batch limit:** If migrating more than 500 devices, split the CSV into batches of 500 or fewer and import sequentially.

### Step 5: Assign Profile and User

1. Verify the imported devices are in the correct Entra group in Tenant B for Autopilot profile assignment.
2. In Tenant B, navigate to **Devices** > **Enrollment** > **Windows Autopilot deployment profiles**.
3. Verify the profile is assigned to the group containing the migrated devices.
4. Allow up to 15 minutes for profile assignment to reflect in the Autopilot devices list.

### Step 6: Provision Devices

Devices boot to OOBE and provision under Tenant B's Autopilot profile. Users sign in with their Tenant B credentials.

---

## Method 2: Offline Migration (Large Batches — Weeks)

Use this method for large fleets (500+ devices) or when migration occurs over an extended period (weeks) with devices staged in waves.

### Step 1: Deregister in Batches from Tenant A

Deregister devices from Tenant A's Autopilot service in batches. Timing the deregistration in sync with device collection waves minimizes the unmanaged window.

### Step 2: Collect Hardware Hashes

Collect hardware hashes during deregistration batches. Store hash CSV files securely — they contain device identifiers.

### Step 3: Create Tenant B Autopilot Configuration File (Offline Profile)

Export the Tenant B Autopilot profile as a JSON configuration file. This allows devices to receive Tenant B Autopilot configuration without an internet connection to complete registration first.

1. In Tenant B **Intune admin center**, navigate to the Autopilot deployment profile.
2. Export the profile JSON.
3. Name the file `AutoPilotConfigurationFile.json`.

### Step 4: Deploy Configuration File to Devices

Before wiping devices (or as part of the wipe process), deploy the Tenant B configuration file to each device:

- File path: `%windir%\provisioning\autopilot\AutoPilotConfigurationFile.json`

This file is applied during OOBE, allowing the device to pull Tenant B configuration even before the hardware hash import is complete in Tenant B.

### Step 5: Full Wipe and Re-provision

Wipe each device using Intune Wipe or "Reset this PC." Devices boot to OOBE and apply the `AutoPilotConfigurationFile.json` configuration for Tenant B.

### Step 6: Import Hashes into Tenant B (Concurrent)

Import hardware hash batches into Tenant B as devices are wiped and re-provisioned. The offline configuration file bridges the gap during the import window.

---

## Verification

- [ ] All devices removed from Tenant A Autopilot device list (Devices > Enrollment > Windows Autopilot devices — serial numbers no longer appear)
- [ ] All devices appear in Tenant B Autopilot device list with correct profile assignment
- [ ] Pilot batch devices successfully completed OOBE under Tenant B profile
- [ ] Users can sign in with Tenant B credentials
- [ ] Apps assigned in Tenant B are installing (check Intune device app status)
- [ ] No devices remain in Tenant A Intune enrollment (or remaining devices are intentional holdbacks)

---

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Autopilot Reset used instead of Wipe | Device re-provisions to Tenant A configuration; Tenant B profile never applies | Wipe the device completely; re-import hash into Tenant B |
| Hash not collected before deletion from Tenant A | Device must be booted to OS to re-collect hash; if already wiped, hash must be collected from fresh OS install | Boot device, re-run `Get-WindowsAutoPilotInfo`, re-import to Tenant B |
| Over 500 devices in single hash import batch | Import fails or times out | Split into 500-device batches; import sequentially |
| Tenant B profile not assigned to correct group | OOBE completes without Autopilot profile applying | Verify device in correct Entra group; verify profile targeting |
| User account not in Tenant B before device provision | User signs in at OOBE, receives error; device lands in a non-user-assigned state | Create Tenant B accounts and assign licenses before provisioning |
| `AutoPilotConfigurationFile.json` in wrong path | Offline profile not applied at OOBE | Verify file is at exactly `%windir%\provisioning\autopilot\AutoPilotConfigurationFile.json` |

---

## See Also

- [Retire, Wipe, and Removal Actions](02-retire-wipe.md) — Delete and Wipe action procedures
- [Network Endpoints Reference](../reference/endpoints.md) — Required endpoints for both source and destination tenants
- [APv1 Hardware Hash Upload](../admin-setup-apv1/01-hardware-hash-upload.md) — Hash collection and import procedures for Tenant B

---

## Version History

| Date | Change |
|------|--------|
| 2026-04-13 | Initial version |
