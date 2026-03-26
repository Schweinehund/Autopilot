# Install-Modules.ps1
# Setup script for PowerShell modules and dependencies

[CmdletBinding()]
param()

Write-Host "Installing required PowerShell modules..." -ForegroundColor Cyan

# Required modules
$requiredModules = @(
    'Pester',
    'PSScriptAnalyzer'
)

foreach ($module in $requiredModules) {
    if (-not (Get-Module -ListAvailable -Name $module)) {
        Write-Host "Installing $module..." -ForegroundColor Yellow
        Install-Module -Name $module -Force -Scope CurrentUser -AllowClobber
    } else {
        Write-Host "$module is already installed" -ForegroundColor Green
    }
}

Write-Host "`nImporting local modules..." -ForegroundColor Cyan

# Import local modules for testing
$modulePath = Join-Path $PSScriptRoot "..\src\powershell"

if (Test-Path $modulePath) {
    Get-ChildItem -Path $modulePath -Filter "*.psm1" | ForEach-Object {
        Write-Host "Loading $($_.Name)..." -ForegroundColor Yellow
        Import-Module $_.FullName -Force
    }
}

Write-Host "`nSetup complete!" -ForegroundColor Green
Write-Host "You can now run: Get-AutopilotDeviceStatus" -ForegroundColor Cyan
