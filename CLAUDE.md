# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Windows Autopilot Troubleshooter & Improvement Suite - A three-tier diagnostic and remediation toolkit for Windows Autopilot deployments. Combines PowerShell modules for local diagnostics, Python FastAPI backend for orchestration, and TypeScript React frontend for visualization.

## Development Commands

### Initial Setup
```powershell
# Complete environment setup (run once)
.\scripts\Setup-Environment.ps1

# Install PowerShell modules only
.\scripts\Install-Modules.ps1
```

### PowerShell Module Development
```powershell
# Import modules for testing
Import-Module .\src\powershell\AutopilotDiagnostics.psm1 -Force
Import-Module .\src\powershell\AutopilotRemediation.psm1 -Force

# Run diagnostic functions locally
Get-AutopilotDeviceStatus
Get-AutopilotRegistrationState
Test-AutopilotConnectivity

# Run Pester tests
Invoke-Pester .\tests\test_diagnostics.ps1

# Analyze code quality
Invoke-ScriptAnalyzer -Path .\src\powershell -Recurse
```

### Backend Development
```powershell
# Activate virtual environment
cd src\backend
.\venv\Scripts\activate

# Run development server with hot reload
uvicorn main:app --reload

# Alternative: run with specific host/port
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# Run tests
pytest

# Run tests with coverage
pytest --cov=. --cov-report=html

# Code formatting and linting
black .
flake8 .
mypy .
```

### Frontend Development
```powershell
cd src\frontend

# Install dependencies
npm install

# Start development server (runs on port 3000, proxies /api to port 8000)
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run linter
npm run lint
```

### Running Full Stack
```powershell
# Terminal 1: Backend
cd src\backend
.\venv\Scripts\activate
uvicorn main:app --reload

# Terminal 2: Frontend
cd src\frontend
npm run dev

# Access: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

## Architecture

### Three-Tier Design

1. **PowerShell Layer** (`src/powershell/`)
   - Direct Windows device interaction
   - Hardware hash retrieval via WMI/CIM
   - Registry inspection for Autopilot state
   - TPM validation and remediation
   - MDM diagnostic log collection
   - Event log parsing

2. **Python Backend** (`src/backend/`)
   - FastAPI REST API for orchestration
   - Microsoft Graph API integration (MSAL authentication)
   - SQLite for local data persistence
   - Async operations for concurrent diagnostics
   - PowerShell module execution bridge

3. **TypeScript Frontend** (`src/frontend/`)
   - React with Vite bundler
   - TanStack Query for data fetching and caching
   - Real-time device monitoring
   - Interactive remediation workflows
   - Recharts for analytics visualization

### Key Data Flows

**Diagnostic Flow**: Device → PowerShell Module → Backend API → Database → Frontend
**Remediation Flow**: Frontend → Backend API → PowerShell Remote Execution → Status Update
**Monitoring Flow**: Backend Scheduler → Microsoft Graph API → Change Detection → Frontend Alerts

## Core Components

### PowerShell Modules

#### AutopilotDiagnostics.psm1
- `Get-AutopilotDeviceStatus`: Comprehensive device state snapshot
- `Get-AutopilotHardwareHash`: Hardware hash from MDM_DevDetail_Ext01 WMI class
- `Get-AutopilotRegistrationState`: Registry inspection at `HKLM:\SOFTWARE\Microsoft\Provisioning\Diagnostics\Autopilot`
- `Get-AutopilotProfileAssignment`: Profile details from AutopilotSettings registry
- `Get-TPMStatus`: TPM readiness via Get-Tpm cmdlet
- `Test-AutopilotConnectivity`: Validates connectivity to required endpoints (ztd.dds.microsoft.com, cs.dds.microsoft.com, etc.)
- `Get-AutopilotLogs`: Collects MDM diagnostics and Event Viewer logs

#### AutopilotRemediation.psm1
- `Reset-AutopilotRegistration`: Clears local Autopilot state
- `Reset-TPMForAutopilot`: TPM clearing for re-attestation
- `Repair-AutopilotConnectivity`: Network stack reset (WinHTTP proxy, DNS, Winsock)
- `Restart-EnrollmentStatusPage`: ESP process restart and state clearing
- `Remove-AutopilotDevice`: Complete device removal for re-imaging

**Important**: All remediation functions use `-ShouldProcess` for safety. Always test in non-production first.

### Backend API Structure

**Endpoints**:
- `/api/devices`: Device inventory from Microsoft Graph
- `/api/devices/{device_id}`: Individual device status
- `/api/diagnostics/run`: Execute remote diagnostics via PowerShell
- `/api/diagnostics/connectivity`: Test Autopilot endpoint reachability
- `/api/logs/analyze`: Parse and correlate MDM/Event logs
- `/api/logs/events/{device_id}`: Event log retrieval
- `/api/remediation/execute`: Trigger remediation actions
- `/api/policies/validate/{device_id}`: Policy conflict detection
- `/api/monitoring/esp/{device_id}`: ESP progress tracking

**Configuration** (`config.py`):
- Azure AD credentials via environment variables (`.env` file)
- Required Graph API permissions: `DeviceManagementManagedDevices.Read.All`, `DeviceManagementConfiguration.Read.All`, `DeviceManagementServiceConfig.Read.All`
- Database URL (default SQLite, can migrate to PostgreSQL)

### Frontend Structure

- **App.tsx**: Main router with QueryClient provider
- **Routes**: Dashboard, Device Details, Diagnostics, Log Analyzer, Remediation
- **API Integration**: Axios with TanStack Query for caching and auto-refetch
- **Vite Config**: API proxy to backend on port 8000

## Windows Autopilot Context

### Common Troubleshooting Scenarios
See `docs/common-issues.md` for detailed runbooks. Key issues:
- Device not registering: Hardware hash problems or tenant mismatches
- ESP failures: App install timeouts, policy conflicts
- TPM attestation: Firmware issues, BIOS settings
- Network connectivity: Proxy/firewall blocking required endpoints
- Profile assignment: Group membership or sync delays

### Critical Registry Paths
- `HKLM:\SOFTWARE\Microsoft\Provisioning\Diagnostics\Autopilot` - Registration state
- `HKLM:\SOFTWARE\Microsoft\Provisioning\AutopilotSettings` - Assigned profile
- `HKLM:\SOFTWARE\Microsoft\Enrollments` - MDM enrollment state

### Required Network Endpoints
- `https://ztd.dds.microsoft.com` - Zero Touch Deployment
- `https://cs.dds.microsoft.com` - Configuration Service
- `https://login.microsoftonline.com` - Azure AD authentication
- `https://graph.microsoft.com` - Microsoft Graph API
- `https://enrollment.manage.microsoft.com` - Intune enrollment

### MDM Diagnostic Logs
- Tool: `mdmdiagnosticstool.exe -out <path>`
- Event Logs: `Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin`, `Microsoft-Windows-Provisioning-Diagnostics-Provider/Admin`, `Microsoft-Windows-AAD/Operational`

## Development Patterns

### Adding New Diagnostic Functions
1. Add function to appropriate PowerShell module
2. Export in `Export-ModuleMember` at bottom of module
3. Add corresponding backend API endpoint in `main.py`
4. Create frontend component for visualization
5. Add Pester test in `tests/test_diagnostics.ps1`
6. Add pytest test in `tests/test_backend.py`

### Adding New Remediation Actions
1. Implement PowerShell function with `[CmdletBinding(SupportsShouldProcess)]`
2. Add action to `valid_actions` list in `/api/remediation/execute`
3. Add frontend trigger button with confirmation dialog
4. Document in `docs/common-issues.md` with usage examples
5. Test thoroughly in isolated environment before production use

### Microsoft Graph Integration
Use MSAL for authentication with client credentials flow:
```python
from msal import ConfidentialClientApplication
app = ConfidentialClientApplication(client_id, client_credential, authority)
token = app.acquire_token_for_client(scopes=["https://graph.microsoft.com/.default"])
```

### Error Handling
- PowerShell: Use `try-catch` with `-ErrorAction SilentlyContinue` for non-critical operations
- Backend: FastAPI HTTPException with appropriate status codes
- Frontend: React error boundaries and TanStack Query error states

## Testing Strategy

### PowerShell
- Pester 5.x for unit tests
- Mock external dependencies (WMI, Registry)
- Test both success and failure paths
- Use `-WhatIf` for remediation tests

### Backend
- pytest with TestClient for API testing
- Mock Microsoft Graph API responses
- Test authentication flows separately
- Coverage target: 80%+

### Frontend
- Vitest for component testing
- Mock API calls with MSW (Mock Service Worker)
- Test user interactions and error states

## Configuration

### Environment Variables (.env)
```
TENANT_ID=your-tenant-id
CLIENT_ID=your-app-registration-client-id
CLIENT_SECRET=your-client-secret
DATABASE_URL=sqlite:///./data/autopilot.db
LOG_LEVEL=INFO
```

### Azure AD App Registration
Required API permissions:
- Microsoft Graph → Application permissions → `DeviceManagementManagedDevices.Read.All`
- Microsoft Graph → Application permissions → `DeviceManagementConfiguration.Read.All`
- Microsoft Graph → Application permissions → `DeviceManagementServiceConfig.Read.All`

Admin consent required for all permissions.

## Common Development Tasks

### Running Single Test
```powershell
# PowerShell
Invoke-Pester -Path .\tests\test_diagnostics.ps1 -TestName "Get-AutopilotDeviceStatus"

# Python
pytest tests/test_backend.py::test_run_diagnostics -v
```

### Debugging PowerShell Modules
```powershell
# Enable verbose output
$VerbosePreference = "Continue"
Get-AutopilotDeviceStatus

# Step through with debugger
Set-PSBreakpoint -Script .\src\powershell\AutopilotDiagnostics.psm1 -Line 25
```

### Viewing API Documentation
Start backend server and navigate to: `http://localhost:8000/docs` (Swagger UI) or `http://localhost:8000/redoc` (ReDoc)

### Database Migrations (Future)
When switching to PostgreSQL:
```bash
alembic revision --autogenerate -m "description"
alembic upgrade head
```

## Project Structure
```
Autopilot/
├── src/
│   ├── powershell/          # PowerShell modules (.psm1)
│   ├── backend/             # Python FastAPI app
│   │   ├── main.py          # API endpoints
│   │   ├── config.py        # Settings management
│   │   └── requirements.txt # Python dependencies
│   └── frontend/            # TypeScript React app
│       ├── src/             # React components
│       ├── package.json     # Node dependencies
│       └── vite.config.ts   # Vite configuration
├── tests/                   # Pester and pytest tests
├── scripts/                 # Setup and utility scripts
├── docs/                    # Architecture and troubleshooting docs
├── data/                    # SQLite database (gitignored)
├── logs/                    # Application logs (gitignored)
└── config/                  # Configuration templates
```

## Security Notes

- Never commit `.env` file or any credentials
- Use certificate-based auth for production Azure AD apps
- All remediation actions require explicit user confirmation
- Audit log all administrative actions with user attribution
- Follow principle of least privilege for Graph API permissions
- Validate all user inputs in API endpoints
- Use HTTPS in production for all communications

## Performance Considerations

- PowerShell: Use CIM sessions over WMI for better performance
- Backend: Leverage FastAPI's async capabilities for I/O operations
- Frontend: TanStack Query caches API responses, configure stale time appropriately
- Database: Index frequently queried fields (device_id, serial_number, timestamp)
- For large deployments (1000+ devices), consider PostgreSQL and Redis caching
