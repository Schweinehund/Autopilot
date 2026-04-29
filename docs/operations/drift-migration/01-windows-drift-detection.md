---
last_verified: 2026-04-29
review_by: 2026-06-28
applies_to: all
audience: admin
platform: Windows
---

> **Platform applicability:** This guide is Windows-specific (Intune Remediations / Proactive
> Remediations detect+remediate script pairs + canonical script-authoring pattern). For the
> cross-platform overview, see [Drift Detection Overview](00-overview.md).
> **macOS:** See [macOS Drift Detection](02-macos-drift-detection.md).
> **iOS/Android:** See [iOS + Android Drift Detection](03-ios-android-drift-detection.md).
> **Tenant migration:** See [Tenant Migration Runbook](04-tenant-migration-runbook.md).

# Windows Drift Detection: Intune Remediations + Canonical Script-Authoring Pattern

This guide is Windows-specific. **Intune Remediations** (formerly Proactive Remediations) is a
Microsoft Endpoint Manager / Intune surface that runs detect+remediate script pairs on
Windows-managed devices on a schedule. Despite the "Bash/PowerShell" framing in some
requirement narratives, Intune Remediations is currently **Windows-only** at the Intune
Management Extension layer. macOS shell-script monitoring is a different surface (Intune
Settings Catalog macOS shell scripts); see
[macOS Drift Detection](02-macos-drift-detection.md). There is no native Intune Remediations
equivalent on iOS or Android.

For the cross-platform compliance drift overview, see
[Drift Detection Overview](00-overview.md). For tenant-to-tenant migration (a separate scope),
see [Tenant Migration Runbook](04-tenant-migration-runbook.md).

> **Scope distinction:** This guide covers **configuration** drift via Intune Remediations
> (PowerShell detect+remediate script pairs that run on schedule on Windows-managed devices).
> For Autopilot **registration** drift (profile assignment states: Not assigned / Assigning /
> Assigned / Fix pending — a different drift class entirely), see
> [Registration Drift Detection](../../reference/drift-detection.md). The two scopes are
> orthogonal: a device may be properly registered (no registration drift) yet drift in
> configuration (an admin-installed app gets uninstalled by the user, a setting was overridden
> locally), or the reverse.

## Intune Remediations Configuration

Intune Remediations is configured in the Intune admin center at:

**Portal path:** `Devices > Manage devices > Scripts and remediations > Remediation scripts`

(As of February 2026, this surface is also exposed in the single-device view under
**Tools + reports** for per-device run-status inspection.)

A remediation consists of two PowerShell scripts:

- **Detection script** — Runs on schedule under SYSTEM context (or per-user context if
  toggled). Returns `exit 1` if drift is detected (the remediation script will then run);
  returns `exit 0` if the device is compliant (no remediation needed). Any other exit code (or
  exception) is reported as `Error`.
- **Remediation script** — Runs only when the detection script returned `exit 1`. Returns
  `exit 0` on success (reported as `Issues fixed`); non-zero on failure (reported as `Error`).

### Configuration steps

1. In the Intune admin center, navigate to the portal path above.
2. Click **Create** to start a new remediation script pair.
3. **Basics**: name, description, publisher.
4. **Settings**:
   - Upload the detection script (`.ps1` file).
   - Upload the remediation script (`.ps1` file).
   - **Run this script using the logged-on credentials**: No (default; SYSTEM context) or Yes
     (per-user context).
   - **Enforce script signature check**: Yes (recommended for production; SHA256-signed scripts).
   - **Run script in 64-bit PowerShell host**: Yes (default; recommended for compatibility with
     modern PowerShell modules).
5. **Scope tags**: optional admin-scoping.
6. **Assignments**: target Entra security groups containing devices (or All devices / All users).
7. **Schedule**: choose run frequency (typically Hourly or Daily).
8. **Review + create**.

### Per-device status report interpretation

After a remediation runs on a device, the per-device status report shows one of three states
(verified at Microsoft Learn 2026):

| Status                  | Meaning                                                            |
|-------------------------|--------------------------------------------------------------------|
| `No issues detected`    | Detection script returned `exit 0`. No remediation needed.         |
| `Issues fixed`          | Detection returned `exit 1`; remediation returned `exit 0`. Drift was found and successfully remediated on the next scheduled run. |
| `Error`                 | Detection or remediation returned an unexpected non-zero exit code OR threw an unhandled exception. Investigate via Log Analytics. |

The portal report shows the summary status only. The detection and remediation script
**output** (stdout written via `Write-Output`) is captured by Intune and forwarded to a Log
Analytics workspace if the Intune-Log-Analytics connector is configured. See the next section
for canonical script-authoring patterns and the Log Analytics surface for L2-level investigation.

## Canonical script-authoring pattern {#canonical-script-authoring}

The canonical Intune Remediations script-authoring pattern is intentionally minimalist: two
PowerShell scripts, exit-code semantics, and stdout output captured for L2 investigation.

### Detection script semantics

A detection script returns:

- `exit 0` — Device is compliant; reported as `No issues detected`. The remediation script does
  NOT run.
- `exit 1` — Drift detected; the remediation script will run on the next interval. After
  successful remediation, the device's status will be reported as `Issues fixed`.
- Any other exit code (or unhandled exception) — Reported as `Error`. Inspect the Log Analytics
  full-output surface to determine the failure mode.

```powershell
# Detection script — returns exit 1 if drift detected, exit 0 if not
# This script runs under SYSTEM context via Intune Management Extension on schedule.

try {
    $expected = "C:\Program Files\CompanyApp\version.txt"
    if (-not (Test-Path $expected)) {
        Write-Output "Drift detected: version.txt missing"
        exit 1     # Drift found; remediation will run
    }
    $version = Get-Content $expected -Raw
    if ($version.Trim() -ne "2.0.5") {
        Write-Output "Drift detected: version mismatch (found $version)"
        exit 1
    }
    Write-Output "No issues detected"
    exit 0     # Compliant; no remediation needed
}
catch {
    Write-Output "Detection script error: $($_.Exception.Message)"
    exit 1
}
```

### Remediation script semantics

A remediation script returns:

- `exit 0` — Remediation succeeded; reported as `Issues fixed`.
- Non-zero exit code (or unhandled exception) — Reported as `Error`. Inspect the Log Analytics
  full-output surface to determine the failure mode.

```powershell
# Remediation script — returns exit 0 on success, non-zero on failure
# Runs only when detection script returned exit 1.

try {
    $installer = "\\share\CompanyApp-2.0.5.msi"
    Start-Process msiexec.exe -ArgumentList "/i `"$installer`" /quiet /norestart" -Wait -NoNewWindow
    Write-Output "Issues fixed: CompanyApp upgraded to 2.0.5"
    exit 0     # Reported as "Issues fixed" in Intune
}
catch {
    Write-Output "Remediation failed: $($_.Exception.Message)"
    exit 1     # Reported as "Error" in Intune
}
```

### Log Analytics surface

The full stdout from `Write-Output` lines is captured per-device per-run and forwarded to the
configured **Log Analytics** workspace if the Intune-Log-Analytics connector is enabled. Use
Log Analytics for L2 deep-dive on `Error`-state remediation runs:

- Query the `IntuneAuditLogs` and `IntuneRemediations` tables for full script output and
  per-device run history.
- Correlate run timestamps across detection and remediation invocations.
- Filter by `RemediationName` and `DeviceId` for per-device drilldown.

The portal per-device status report shows summary status only. For investigations beyond the
summary state, Log Analytics is the canonical surface.

### Authoring guidelines

- **Exit-code-first** — Treat `exit 1` / `exit 0` as the contract; treat `Write-Output` as
  human-readable supporting evidence. Admins reading the per-device status report will see only
  the three summary states (`No issues detected` / `Issues fixed` / `Error`); detailed prose
  output is for Log Analytics investigation.
- **Idempotent remediations** — Remediation scripts may run multiple times if the detection
  script continues to flag drift. Author idempotent operations (use `Test-Path` before file
  writes; check service state before `Start-Service`).
- **Bounded execution time** — Intune enforces a 60-minute per-script execution cap. Keep
  detection scripts under 30 seconds; remediations may take longer but should fail fast on
  irrecoverable conditions.
- **Signed scripts in production** — SHA256-signed PowerShell scripts are recommended; unsigned
  scripts require `Bypass` execution policy override at the per-script setting level (less
  secure).

## Microsoft Graph Compliance Reports {#graph-compliance-reports}

For fleet-wide drift signal analysis beyond the per-device status report, Microsoft Graph
`exportJobs` exposes compliance reports that can be pulled programmatically or consumed via
Power BI. The relevant report names for Windows configuration drift investigation (verified at
Microsoft Learn 2026):

- `DeviceNonCompliance` — devices currently in a non-compliant state per compliance policy
- `NonCompliantDevicesAndSettings` — per-device, per-setting non-compliance breakdown
- `ConfigurationPolicyAggregate` — aggregate compliance across configuration policies
- `SettingComplianceAggReport` — per-setting compliance aggregate across the fleet

These reports are generated asynchronously: POST a request to
`/deviceManagement/reports/exportJobs` with the report name, then poll for the download URL.
This surface is useful for L2-level triage when the Intune portal per-device status report
shows `Error` states across multiple devices without a clear common pattern. For the full
`exportJobs` API reference, see the Microsoft Graph deviceManagement reports documentation
listed in External References.

## Related Resources

- [Drift Detection Overview](00-overview.md) — Cross-platform compliance drift hub
- [macOS Drift Detection](02-macos-drift-detection.md) — macOS sibling
- [iOS + Android Drift Detection](03-ios-android-drift-detection.md) — iOS jailbreak / OS downgrade + Android Play Integrity
- [Tenant Migration Runbook](04-tenant-migration-runbook.md) — Cross-platform tenant migration (MEDIUM confidence)
- [Registration Drift Detection](../../reference/drift-detection.md) — v1.2 SSoT — Autopilot registration drift (scope-distinct from configuration drift covered here)
- [Patch & Update Management Overview](../patch-management/00-overview.md) — Sibling ops-domain (Phase 54)
- [App Lifecycle Automation Overview](../app-lifecycle/00-overview.md) — Sibling ops-domain (Phase 55)

## External References

- [Use Remediations to detect and fix support issues (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-management/tools/deploy-remediations) — DRIFT-01 portal path + status report semantics
- [Microsoft Graph deviceManagement reports (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/reports-export-graph-available-reports) — `exportJobs` reports for fleet-level drift signals
- [Operations Documentation Index](../00-index.md) — Cross-reference only; Phase 56 does NOT amend the operations index per the Phase 59 ROADMAP entry
