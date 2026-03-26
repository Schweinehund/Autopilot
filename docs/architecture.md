# System Architecture

## Overview

The Windows Autopilot Troubleshooter is a three-tier application designed to diagnose, monitor, and remediate Windows Autopilot deployment issues.

## Architecture Layers

### 1. PowerShell Modules (Client/Local Execution Layer)

**Location**: `src/powershell/`

**Purpose**: Direct interaction with Windows devices for diagnostics and remediation

**Key Modules**:
- `AutopilotDiagnostics.psm1`: Device status inspection, log collection, connectivity tests
- `AutopilotRemediation.psm1`: Automated fixes for common issues

**Execution Context**: Runs locally on Windows devices or remote via PowerShell remoting

**Key Functions**:
- Hardware hash retrieval from WMI/CIM
- Registry inspection for Autopilot state
- TPM status validation
- Network connectivity testing to required endpoints
- MDM diagnostic log collection
- Event log export and parsing

### 2. Python Backend (Orchestration & API Layer)

**Location**: `src/backend/`

**Technology**: FastAPI, SQLAlchemy, MSAL

**Purpose**: Central orchestration, Microsoft Graph integration, data persistence

**Key Components**:

#### API Endpoints (`main.py`)
- `/api/devices`: Device inventory from Intune
- `/api/diagnostics/run`: Execute remote diagnostics
- `/api/logs/analyze`: Log parsing and correlation
- `/api/remediation/execute`: Trigger remediation workflows
- `/api/policies/validate`: Policy conflict detection
- `/api/monitoring/esp`: ESP progress tracking

#### Microsoft Graph Integration
- Device management queries
- Policy and profile retrieval
- Compliance status checks
- Autopilot profile assignments

#### Data Storage
- SQLite database for logs and historical data
- JSON configuration files
- CSV exports for reporting

### 3. TypeScript Frontend (Visualization Layer)

**Location**: `src/frontend/`

**Technology**: React, Vite, TanStack Query, Recharts

**Purpose**: Real-time monitoring dashboard and administrative interface

**Key Features**:
- Device status overview with health indicators
- Real-time ESP progress monitoring
- Log viewer with filtering and search
- Remediation workflow triggers
- Historical trend analysis
- Alert notifications

## Data Flow

### Diagnostic Flow
```
Device (Windows)
  → PowerShell Module (local execution)
  → Results collected
  → Posted to Backend API
  → Stored in database
  → Retrieved by Frontend
  → Displayed to administrator
```

### Remediation Flow
```
Administrator (Frontend)
  → Selects remediation action
  → Request sent to Backend API
  → Backend validates request
  → PowerShell module executed remotely or via agent
  → Results returned to Backend
  → Status updated in Frontend
```

### Monitoring Flow
```
Backend scheduler (periodic)
  → Queries Microsoft Graph API
  → Retrieves device enrollment status
  → Compares with previous state
  → Detects changes/issues
  → Triggers alerts if needed
  → Updates Frontend via WebSocket/polling
```

## Key Integrations

### Microsoft Graph API
- **Endpoint**: `https://graph.microsoft.com/v1.0`
- **Authentication**: MSAL with client credentials flow
- **Required Permissions**:
  - `DeviceManagementManagedDevices.Read.All`
  - `DeviceManagementConfiguration.Read.All`
  - `DeviceManagementServiceConfig.Read.All`

### Windows Autopilot Endpoints
- `https://ztd.dds.microsoft.com` - Zero Touch Deployment service
- `https://cs.dds.microsoft.com` - Configuration service
- `https://enrollment.manage.microsoft.com` - Intune enrollment

## Security Considerations

1. **Authentication**: Azure AD app registration with certificate-based auth (production)
2. **Least Privilege**: Read-only access to device data; write access only for remediation
3. **Audit Logging**: All remediation actions logged with user attribution
4. **Secrets Management**: Environment variables for credentials, no hardcoded secrets
5. **API Security**: CORS restrictions, rate limiting, input validation

## Scalability

- **Horizontal Scaling**: Backend API can run multiple instances behind load balancer
- **Database**: Can migrate from SQLite to PostgreSQL/SQL Server for enterprise scale
- **Caching**: TanStack Query for frontend caching; Redis for backend caching (future)
- **Async Processing**: FastAPI's async capabilities for concurrent operations

## Error Handling

1. **PowerShell Layer**: Try-catch with detailed error messages, fallback to safe defaults
2. **Backend Layer**: FastAPI exception handlers, structured error responses
3. **Frontend Layer**: Error boundaries, user-friendly error messages, retry mechanisms

## Monitoring & Observability

- **Logging**: Structured logging with correlation IDs
- **Health Checks**: `/health` endpoint for uptime monitoring
- **Metrics**: Response times, error rates, device status distribution (future: Prometheus)
