# Setup-Environment.ps1
# Complete environment setup for the Autopilot project

[CmdletBinding()]
param()

Write-Host "===== Windows Autopilot Troubleshooter - Environment Setup =====" -ForegroundColor Cyan

# Check prerequisites
Write-Host "`nChecking prerequisites..." -ForegroundColor Yellow

# Check PowerShell version
$psVersion = $PSVersionTable.PSVersion
Write-Host "PowerShell version: $psVersion"
if ($psVersion.Major -lt 5) {
    Write-Error "PowerShell 5.1 or higher required"
    exit 1
}

# Check Python
try {
    $pythonVersion = python --version 2>&1
    Write-Host "Python: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Warning "Python not found. Install Python 3.9+ for backend development"
}

# Check Node.js
try {
    $nodeVersion = node --version 2>&1
    Write-Host "Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Warning "Node.js not found. Install Node.js 18+ for frontend development"
}

# Create directory structure
Write-Host "`nCreating directory structure..." -ForegroundColor Yellow
$directories = @(
    "data",
    "logs",
    "config",
    "docs"
)

foreach ($dir in $directories) {
    $path = Join-Path $PSScriptRoot "..\$dir"
    if (-not (Test-Path $path)) {
        New-Item -Path $path -ItemType Directory -Force | Out-Null
        Write-Host "Created: $dir" -ForegroundColor Green
    }
}

# Install PowerShell modules
Write-Host "`nInstalling PowerShell modules..." -ForegroundColor Yellow
& "$PSScriptRoot\Install-Modules.ps1"

# Setup Python backend
if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "`nSetting up Python backend..." -ForegroundColor Yellow
    $backendPath = Join-Path $PSScriptRoot "..\src\backend"

    if (Test-Path $backendPath) {
        Push-Location $backendPath

        if (-not (Test-Path "venv")) {
            Write-Host "Creating Python virtual environment..." -ForegroundColor Yellow
            python -m venv venv
        }

        Write-Host "Installing Python dependencies..." -ForegroundColor Yellow
        & ".\venv\Scripts\python.exe" -m pip install -r requirements.txt

        Pop-Location
        Write-Host "Backend setup complete" -ForegroundColor Green
    }
}

# Setup frontend
if (Get-Command npm -ErrorAction SilentlyContinue) {
    Write-Host "`nSetting up frontend..." -ForegroundColor Yellow
    $frontendPath = Join-Path $PSScriptRoot "..\src\frontend"

    if (Test-Path $frontendPath) {
        Push-Location $frontendPath
        Write-Host "Installing Node.js dependencies..." -ForegroundColor Yellow
        npm install
        Pop-Location
        Write-Host "Frontend setup complete" -ForegroundColor Green
    }
}

Write-Host "`n===== Setup Complete! =====" -ForegroundColor Cyan
Write-Host @"

Next steps:
1. Configure Azure AD app registration and update .env file
2. Run diagnostics: Import-Module .\src\powershell\AutopilotDiagnostics.psm1
3. Start backend: cd src\backend && .\venv\Scripts\activate && uvicorn main:app --reload
4. Start frontend: cd src\frontend && npm run dev

"@ -ForegroundColor Yellow
