# AutopilotDiagnostics.psm1
# Core diagnostic functions for Windows Autopilot troubleshooting

<#
.SYNOPSIS
    Gets the current Autopilot device registration status
.DESCRIPTION
    Retrieves device hardware hash, registration state, and profile assignment
#>
function Get-AutopilotDeviceStatus {
    [CmdletBinding()]
    param()

    $status = @{
        DeviceSerialNumber = (Get-WmiObject Win32_BIOS).SerialNumber
        HardwareHash = Get-AutopilotHardwareHash
        RegistrationState = Get-AutopilotRegistrationState
        ProfileAssignment = Get-AutopilotProfileAssignment
        TPMStatus = Get-TPMStatus
        NetworkConnectivity = Test-AutopilotConnectivity
    }

    return $status
}

<#
.SYNOPSIS
    Retrieves the device hardware hash
#>
function Get-AutopilotHardwareHash {
    [CmdletBinding()]
    param()

    try {
        $session = New-CimSession
        $devDetail = (Get-CimInstance -CimSession $session -Namespace root/cimv2/mdm/dmmap -Class MDM_DevDetail_Ext01 -Filter "InstanceID='Ext' AND ParentID='./DevDetail'")

        if ($devDetail) {
            return $devDetail.DeviceHardwareData
        }
        return $null
    }
    catch {
        Write-Warning "Failed to retrieve hardware hash: $_"
        return $null
    }
}

<#
.SYNOPSIS
    Checks Autopilot registration state from registry and WMI
#>
function Get-AutopilotRegistrationState {
    [CmdletBinding()]
    param()

    $regPath = "HKLM:\SOFTWARE\Microsoft\Provisioning\Diagnostics\Autopilot"

    if (Test-Path $regPath) {
        $autopilotInfo = Get-ItemProperty -Path $regPath -ErrorAction SilentlyContinue
        return @{
            IsRegistered = $true
            CloudAssignedTenantId = $autopilotInfo.CloudAssignedTenantId
            CloudAssignedTenantDomain = $autopilotInfo.CloudAssignedTenantDomain
            DeploymentProfileName = $autopilotInfo.DeploymentProfileName
        }
    }

    return @{ IsRegistered = $false }
}

<#
.SYNOPSIS
    Gets assigned Autopilot profile details
#>
function Get-AutopilotProfileAssignment {
    [CmdletBinding()]
    param()

    $regPath = "HKLM:\SOFTWARE\Microsoft\Provisioning\AutopilotSettings"

    if (Test-Path $regPath) {
        return Get-ItemProperty -Path $regPath -ErrorAction SilentlyContinue
    }

    return $null
}

<#
.SYNOPSIS
    Checks TPM status and attestation capability
#>
function Get-TPMStatus {
    [CmdletBinding()]
    param()

    try {
        $tpm = Get-Tpm
        return @{
            TpmPresent = $tpm.TpmPresent
            TpmReady = $tpm.TpmReady
            TpmEnabled = $tpm.TpmEnabled
            TpmActivated = $tpm.TpmActivated
            TpmOwned = $tpm.TpmOwned
        }
    }
    catch {
        return @{ Error = $_.Exception.Message }
    }
}

<#
.SYNOPSIS
    Tests connectivity to required Autopilot endpoints
#>
function Test-AutopilotConnectivity {
    [CmdletBinding()]
    param()

    $endpoints = @(
        "https://ztd.dds.microsoft.com",
        "https://cs.dds.microsoft.com",
        "https://login.microsoftonline.com",
        "https://graph.microsoft.com",
        "https://enrollment.manage.microsoft.com"
    )

    $results = @{}
    foreach ($endpoint in $endpoints) {
        try {
            $response = Invoke-WebRequest -Uri $endpoint -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
            $results[$endpoint] = "Reachable (Status: $($response.StatusCode))"
        }
        catch {
            $results[$endpoint] = "Failed: $($_.Exception.Message)"
        }
    }

    return $results
}

<#
.SYNOPSIS
    Collects all Autopilot-related logs for analysis
#>
function Get-AutopilotLogs {
    [CmdletBinding()]
    param(
        [string]$OutputPath = "$env:TEMP\AutopilotLogs"
    )

    if (-not (Test-Path $OutputPath)) {
        New-Item -Path $OutputPath -ItemType Directory -Force | Out-Null
    }

    # MDM Diagnostic logs
    $mdmDiagPath = "$OutputPath\MDMDiagnostics.html"
    mdmdiagnosticstool.exe -out $mdmDiagPath

    # Event logs
    $eventLogs = @(
        "Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin",
        "Microsoft-Windows-Provisioning-Diagnostics-Provider/Admin",
        "Microsoft-Windows-AAD/Operational",
        "Microsoft-Windows-User Device Registration/Admin"
    )

    foreach ($logName in $eventLogs) {
        $safeName = $logName -replace '[/\\]', '_'
        $logPath = "$OutputPath\$safeName.evtx"
        try {
            wevtutil epl $logName $logPath
        }
        catch {
            Write-Warning "Failed to export log $logName"
        }
    }

    Write-Output "Logs collected at: $OutputPath"
    return $OutputPath
}

Export-ModuleMember -Function @(
    'Get-AutopilotDeviceStatus',
    'Get-AutopilotHardwareHash',
    'Get-AutopilotRegistrationState',
    'Get-AutopilotProfileAssignment',
    'Get-TPMStatus',
    'Test-AutopilotConnectivity',
    'Get-AutopilotLogs'
)
