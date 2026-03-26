# Windows Autopilot Troubleshooter & Improvement Suite

A comprehensive toolkit for diagnosing, monitoring, and improving Windows Autopilot deployments.

## Overview

This project provides IT administrators with powerful tools to troubleshoot Windows Autopilot issues, monitor deployment progress, validate configurations, and apply automated remediation.

## Features

- **Real-time Diagnostics**: Inspect device enrollment status, hardware hash, and Autopilot profile assignment
- **Log Analysis**: Parse and correlate MDM, Autopilot, and Event Viewer logs to identify root causes
- **Policy Validation**: Verify Intune policies, Autopilot profiles, and ESP settings
- **Deployment Monitoring**: Track enrollment progress with detailed status reporting
- **Automated Remediation**: Apply fixes for common issues (network, TPM, enrollment blocks)
- **Web Dashboard**: Visualize deployment health, historical trends, and alerts

## Architecture

The project consists of three main layers:

1. **PowerShell Modules**: Core diagnostic and remediation scripts for local execution
2. **Python Backend**: API server for orchestration, log parsing, and data aggregation
3. **TypeScript Frontend**: Web dashboard for monitoring and reporting

## Project Structure

```
Autopilot/
├── src/
│   ├── powershell/          # PowerShell diagnostic and remediation modules
│   ├── backend/             # Python FastAPI backend
│   └── frontend/            # TypeScript React dashboard
├── tests/                   # Unit and integration tests
├── docs/                    # Documentation and runbooks
├── config/                  # Configuration templates
└── scripts/                 # Utility and setup scripts
```

## Quick Start

See [Getting Started Guide](docs/getting-started.md) for detailed setup instructions.

### Prerequisites

- Windows 10/11 (for PowerShell modules)
- PowerShell 5.1+ or PowerShell Core 7+
- Python 3.9+ (for backend)
- Node.js 18+ (for frontend)
- Microsoft Graph API permissions (DeviceManagementManagedDevices.Read.All, etc.)

### Installation

```powershell
# Clone and setup
git clone <repository-url>
cd Autopilot

# Install PowerShell modules
.\scripts\Install-Modules.ps1

# Setup Python backend
cd src\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Setup frontend
cd ..\frontend
npm install
```

### Running

```powershell
# Run diagnostics locally (PowerShell)
Import-Module .\src\powershell\AutopilotDiagnostics
Get-AutopilotDeviceStatus

# Start backend API
cd src\backend
uvicorn main:app --reload

# Start frontend dashboard
cd src\frontend
npm run dev
```

## Common Troubleshooting Scenarios

- **Device not showing in Autopilot**: Hardware hash verification and re-registration
- **ESP timeout/failure**: Policy conflict detection and ESP phase analysis
- **Profile not assigned**: Tenant validation and group membership checks
- **TPM attestation failures**: TPM status validation and clearing procedures
- **Network connectivity issues**: Proxy, firewall, and endpoint accessibility checks

## Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for development guidelines.

## License

MIT License - See [LICENSE](LICENSE) for details.
