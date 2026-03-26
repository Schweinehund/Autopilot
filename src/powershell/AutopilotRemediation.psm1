# AutopilotRemediation.psm1
# Automated remediation functions for common Autopilot issues

<#
.SYNOPSIS
    Clears and re-registers device for Autopilot
.DESCRIPTION
    Removes local Autopilot registration and triggers re-registration
#>
function Reset-AutopilotRegistration {
    [CmdletBinding(SupportsShouldProcess)]
    param(
        [switch]$Force
    )

    if ($PSCmdlet.ShouldProcess("Autopilot Registration", "Reset")) {
        Write-Verbose "Clearing Autopilot registry keys..."

        $regPaths = @(
            "HKLM:\SOFTWARE\Microsoft\Provisioning\Diagnostics\Autopilot",
            "HKLM:\SOFTWARE\Microsoft\Provisioning\AutopilotSettings"
        )

        foreach ($path in $regPaths) {
            if (Test-Path $path) {
                Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
            }
        }

        Write-Output "Autopilot registration cleared. Reboot required to re-register."
    }
}

<#
.SYNOPSIS
    Clears TPM and prepares for re-attestation
#>
function Reset-TPMForAutopilot {
    [CmdletBinding(SupportsShouldProcess)]
    param()

    if ($PSCmdlet.ShouldProcess("TPM", "Clear")) {
        try {
            Clear-Tpm -Force
            Write-Output "TPM cleared successfully. Reboot required."
        }
        catch {
            Write-Error "Failed to clear TPM: $_"
        }
    }
}

<#
.SYNOPSIS
    Fixes common network connectivity issues blocking Autopilot
#>
function Repair-AutopilotConnectivity {
    [CmdletBinding()]
    param()

    Write-Verbose "Checking proxy settings..."

    # Clear WinHTTP proxy
    netsh winhttp reset proxy

    # Flush DNS
    ipconfig /flushdns

    # Reset Winsock
    netsh winsock reset

    Write-Output "Network settings reset. Testing connectivity..."
    Test-AutopilotConnectivity
}

<#
.SYNOPSIS
    Restarts enrollment process for stuck ESP
#>
function Restart-EnrollmentStatusPage {
    [CmdletBinding(SupportsShouldProcess)]
    param()

    if ($PSCmdlet.ShouldProcess("Enrollment Status Page", "Restart")) {
        # Kill ESP related processes
        Get-Process -Name "EnrollmentUX" -ErrorAction SilentlyContinue | Stop-Process -Force

        # Clear ESP state
        $espPath = "HKLM:\SOFTWARE\Microsoft\Enrollments"
        if (Test-Path $espPath) {
            Get-ChildItem -Path $espPath | ForEach-Object {
                $espStatus = Join-Path $_.PSPath "FirstSync"
                if (Test-Path $espStatus) {
                    Remove-Item -Path $espStatus -Force -ErrorAction SilentlyContinue
                }
            }
        }

        Write-Output "ESP state cleared. Triggering sync..."

        # Trigger MDM sync
        $syncPath = "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\MDM"
        if (Test-Path $syncPath) {
            Get-ScheduledTask -TaskPath "\Microsoft\Windows\EnterpriseMgmt\*" | Start-ScheduledTask
        }
    }
}

<#
.SYNOPSIS
    Removes device from Autopilot completely (for re-imaging scenarios)
#>
function Remove-AutopilotDevice {
    [CmdletBinding(SupportsShouldProcess)]
    param(
        [switch]$IncludeMDM
    )

    if ($PSCmdlet.ShouldProcess("Autopilot Device", "Remove")) {
        # Clear Autopilot
        Reset-AutopilotRegistration -Force

        if ($IncludeMDM) {
            Write-Verbose "Removing MDM enrollment..."

            $enrollments = Get-ChildItem "HKLM:\SOFTWARE\Microsoft\Enrollments" -ErrorAction SilentlyContinue
            foreach ($enrollment in $enrollments) {
                Remove-Item -Path $enrollment.PSPath -Recurse -Force -ErrorAction SilentlyContinue
            }
        }

        Write-Output "Device removed from Autopilot. Clean reboot recommended."
    }
}

Export-ModuleMember -Function @(
    'Reset-AutopilotRegistration',
    'Reset-TPMForAutopilot',
    'Repair-AutopilotConnectivity',
    'Restart-EnrollmentStatusPage',
    'Remove-AutopilotDevice'
)
