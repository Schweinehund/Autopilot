# Pester tests for AutopilotDiagnostics module

BeforeAll {
    Import-Module "$PSScriptRoot\..\src\powershell\AutopilotDiagnostics.psm1" -Force
}

Describe "Get-AutopilotDeviceStatus" {
    It "Returns device status object" {
        $status = Get-AutopilotDeviceStatus
        $status | Should -Not -BeNullOrEmpty
        $status.DeviceSerialNumber | Should -Not -BeNullOrEmpty
    }

    It "Includes all required properties" {
        $status = Get-AutopilotDeviceStatus
        $status.Keys | Should -Contain 'DeviceSerialNumber'
        $status.Keys | Should -Contain 'HardwareHash'
        $status.Keys | Should -Contain 'RegistrationState'
        $status.Keys | Should -Contain 'TPMStatus'
    }
}

Describe "Get-AutopilotRegistrationState" {
    It "Returns registration state" {
        $state = Get-AutopilotRegistrationState
        $state | Should -Not -BeNullOrEmpty
        $state.Keys | Should -Contain 'IsRegistered'
    }
}

Describe "Get-TPMStatus" {
    It "Returns TPM information" {
        $tpm = Get-TPMStatus
        $tpm | Should -Not -BeNullOrEmpty
    }
}

Describe "Test-AutopilotConnectivity" {
    It "Tests all required endpoints" {
        $connectivity = Test-AutopilotConnectivity
        $connectivity.Keys.Count | Should -BeGreaterThan 0
    }
}
