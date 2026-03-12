---
last_verified: 2026-03-11
review_by: 2026-06-09
applies_to: APv1
audience: L2
---

> **Version gate:** This reference documents functions exported from the `AutopilotDiagnostics.psm1` and `AutopilotRemediation.psm1` modules. The source `.psm1` files are authoritative; verify this document against source when adding or modifying functions.

# PowerShell Function Reference

Field guide to the 12 exported functions in the Autopilot diagnostic and remediation modules. The source `.psm1` files are authoritative; this reference provides synopsis, parameters, and usage examples.

---

## Diagnostic Functions (AutopilotDiagnostics.psm1)

### Get-AutopilotDeviceStatus

**Module:** `AutopilotDiagnostics.psm1`
**Synopsis:** Gets the current Autopilot device registration status — a comprehensive snapshot combining hardware hash, registration state, profile assignment, TPM status, and network connectivity.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| *(none)* | — | — | No parameters |

**Returns:** Hashtable with keys: `DeviceSerialNumber`, `HardwareHash`, `RegistrationState`, `ProfileAssignment`, `TPMStatus`, `NetworkConnectivity`

**Example:**
```powershell
$status = Get-AutopilotDeviceStatus
$status.RegistrationState.IsRegistered
$status.TPMStatus.TpmReady
```

---

### Get-AutopilotHardwareHash

**Module:** `AutopilotDiagnostics.psm1`
**Synopsis:** Retrieves the device hardware hash via CIM from the `MDM_DevDetail_Ext01` class.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| *(none)* | — | — | No parameters |

**Returns:** String (`DeviceHardwareData` value) or `$null` if unavailable. Returns `$null` on CIM query failure (warning written to host).

**Example:**
```powershell
$hash = Get-AutopilotHardwareHash
if ($null -eq $hash) { Write-Warning "Hardware hash unavailable — device may not be Autopilot-capable" }
```

---

### Get-AutopilotRegistrationState

**Module:** `AutopilotDiagnostics.psm1`
**Synopsis:** Checks Autopilot registration state from registry and WMI.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| *(none)* | — | — | No parameters |

**Returns:** Hashtable. If registered: `IsRegistered = $true`, `CloudAssignedTenantId`, `CloudAssignedTenantDomain`, `DeploymentProfileName`. If not registered: `IsRegistered = $false`.

**Registry path read:** `HKLM:\SOFTWARE\Microsoft\Provisioning\Diagnostics\Autopilot` (see [registry-paths.md](registry-paths.md))

**Example:**
```powershell
$state = Get-AutopilotRegistrationState
if ($state.IsRegistered) {
    Write-Host "Registered to tenant: $($state.CloudAssignedTenantDomain)"
}
```

---

### Get-AutopilotProfileAssignment

**Module:** `AutopilotDiagnostics.psm1`
**Synopsis:** Gets assigned Autopilot profile details from the registry.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| *(none)* | — | — | No parameters |

**Returns:** Registry property object (`Get-ItemProperty` output) or `$null` if no profile is assigned.

**Registry path read:** `HKLM:\SOFTWARE\Microsoft\Provisioning\AutopilotSettings` (see [registry-paths.md](registry-paths.md))

**Example:**
```powershell
$profile = Get-AutopilotProfileAssignment
if ($null -eq $profile) { Write-Warning "No Autopilot profile assigned" }
```

---

### Get-TPMStatus

**Module:** `AutopilotDiagnostics.psm1`
**Synopsis:** Checks TPM status and attestation capability via `Get-Tpm`.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| *(none)* | — | — | No parameters |

**Returns:** Hashtable with keys: `TpmPresent`, `TpmReady`, `TpmEnabled`, `TpmActivated`, `TpmOwned`. On error, returns `@{ Error = <message> }`.

**Example:**
```powershell
$tpm = Get-TPMStatus
if (-not $tpm.TpmReady) { Write-Warning "TPM not ready — self-deploy and pre-provision modes will fail" }
```

---

### Test-AutopilotConnectivity

**Module:** `AutopilotDiagnostics.psm1`
**Synopsis:** Tests connectivity to 5 required Autopilot endpoints.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| *(none)* | — | — | No parameters |

**Returns:** Hashtable mapping each URL to a status string. Reachable: `"Reachable (Status: 200)"`. Unreachable: `"Failed: <exception message>"`.

**Endpoints tested:** `ztd.dds.microsoft.com`, `cs.dds.microsoft.com`, `login.microsoftonline.com`, `graph.microsoft.com`, `enrollment.manage.microsoft.com`. For the full 13-endpoint list, see [endpoints.md](endpoints.md).

**Example:**
```powershell
$results = Test-AutopilotConnectivity
$results.GetEnumerator() | Where-Object { $_.Value -like "Failed*" }
```

---

### Get-AutopilotLogs

**Module:** `AutopilotDiagnostics.psm1`
**Synopsis:** Collects all Autopilot-related logs for analysis — MDM diagnostics HTML report plus four event log `.evtx` exports.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `-OutputPath` | String | No | Directory to write logs. Default: `$env:TEMP\AutopilotLogs` |

**Returns:** String — the resolved output path where logs were written.

**Example:**
```powershell
# Collect to default temp location
$logPath = Get-AutopilotLogs

# Collect to a specific share for remote review
$logPath = Get-AutopilotLogs -OutputPath "\\fileserver\autopilot-logs\$env:COMPUTERNAME"
```

---

## Remediation Functions (AutopilotRemediation.psm1)

> **Safety note:** Four of the five remediation functions support `-WhatIf` via `SupportsShouldProcess`. Always test in a non-production environment first. `Repair-AutopilotConnectivity` is the exception — see its entry.

---

### Reset-AutopilotRegistration

**Module:** `AutopilotRemediation.psm1`
**Synopsis:** Clears and re-registers device for Autopilot by removing local registration registry keys.

> **Warning:** This function modifies device state. Test in non-production first. Supports `-WhatIf` for dry run.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `-Force` | Switch | No | Bypasses confirmation prompt in non-interactive sessions |

**ShouldProcess:** Yes — supports `-WhatIf` and `-Confirm`

**Removes:** `HKLM:\SOFTWARE\Microsoft\Provisioning\Diagnostics\Autopilot` and `HKLM:\SOFTWARE\Microsoft\Provisioning\AutopilotSettings`

**Example:**
```powershell
# Dry run — shows what would be removed
Reset-AutopilotRegistration -WhatIf

# Execute with confirmation prompt
Reset-AutopilotRegistration

# Execute without prompt (e.g., in a script)
Reset-AutopilotRegistration -Force
```

---

### Reset-TPMForAutopilot

**Module:** `AutopilotRemediation.psm1`
**Synopsis:** Clears TPM and prepares for re-attestation via `Clear-Tpm -Force`.

> **Warning:** This function modifies device state. Test in non-production first. Supports `-WhatIf` for dry run.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| *(none)* | — | — | No parameters |

**ShouldProcess:** Yes — supports `-WhatIf` and `-Confirm`

**Example:**
```powershell
# Dry run
Reset-TPMForAutopilot -WhatIf

# Execute (requires reboot after)
Reset-TPMForAutopilot
```

---

### Repair-AutopilotConnectivity

**Module:** `AutopilotRemediation.psm1`
**Synopsis:** Fixes common network connectivity issues blocking Autopilot by resetting WinHTTP proxy, flushing DNS cache, and resetting Winsock.

> **Warning:** This function modifies network state (WinHTTP proxy, DNS cache, Winsock). It does NOT support `-WhatIf`. Test in non-production first.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| *(none)* | — | — | No parameters |

**ShouldProcess:** No — changes are applied immediately without confirmation

**Operations performed:**
1. `netsh winhttp reset proxy` — clears machine-level WinHTTP proxy
2. `ipconfig /flushdns` — flushes DNS resolver cache
3. `netsh winsock reset` — resets Winsock catalog (requires reboot to take full effect)
4. Calls `Test-AutopilotConnectivity` to verify results

**Example:**
```powershell
# No -WhatIf available — runs immediately
Repair-AutopilotConnectivity
```

---

### Restart-EnrollmentStatusPage

**Module:** `AutopilotRemediation.psm1`
**Synopsis:** Restarts enrollment process for a stuck ESP by stopping the enrollment UX process, clearing FirstSync registry keys, and triggering EnterpriseMgmt scheduled tasks.

> **Warning:** This function modifies device state. Test in non-production first. Supports `-WhatIf` for dry run.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| *(none)* | — | — | No parameters |

**ShouldProcess:** Yes — supports `-WhatIf` and `-Confirm`

**Operations performed:**
1. Stops `EnrollmentUX` process
2. Removes `FirstSync` subkeys under `HKLM:\SOFTWARE\Microsoft\Enrollments\{GUID}\`
3. Starts all scheduled tasks under `\Microsoft\Windows\EnterpriseMgmt\`

**Example:**
```powershell
# Dry run
Restart-EnrollmentStatusPage -WhatIf

# Execute
Restart-EnrollmentStatusPage
```

---

### Remove-AutopilotDevice

**Module:** `AutopilotRemediation.psm1`
**Synopsis:** Removes device from Autopilot completely — intended for re-imaging scenarios.

> **Warning:** This function modifies device state. Test in non-production first. Supports `-WhatIf` for dry run.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `-IncludeMDM` | Switch | No | **Critical decision point:** when specified, ALL enrollment keys under `HKLM:\SOFTWARE\Microsoft\Enrollments` are deleted in addition to Autopilot registration keys. Without this switch, MDM enrollment remains intact and the device can re-enroll without re-imaging. With this switch, the device is fully stripped — a clean reboot is required before re-enrollment. |

**ShouldProcess:** Yes — supports `-WhatIf` and `-Confirm`

**Operations performed:**
1. Calls `Reset-AutopilotRegistration -Force` (clears Autopilot registry keys)
2. If `-IncludeMDM`: removes all subkeys under `HKLM:\SOFTWARE\Microsoft\Enrollments`

**Example:**
```powershell
# Dry run — see what would be removed (without MDM)
Remove-AutopilotDevice -WhatIf

# Remove Autopilot registration only (MDM enrollment preserved)
Remove-AutopilotDevice

# Full removal — Autopilot + all MDM enrollment data
Remove-AutopilotDevice -IncludeMDM

# Full removal without confirmation prompt
Remove-AutopilotDevice -IncludeMDM -Force
```

---

## Event Log Sources

The following event logs are collected by `Get-AutopilotLogs` and are the primary sources for Autopilot and enrollment diagnostics:

| Event Log | Primary Content |
|-----------|----------------|
| `Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin` | MDM enrollment events, policy application results, sync status |
| `Microsoft-Windows-Provisioning-Diagnostics-Provider/Admin` | OOBE and provisioning events, Autopilot profile application |
| `Microsoft-Windows-AAD/Operational` | Azure AD join events, token acquisition, device registration |
| `Microsoft-Windows-User Device Registration/Admin` | Device registration operations, workplace join, hybrid join events |
