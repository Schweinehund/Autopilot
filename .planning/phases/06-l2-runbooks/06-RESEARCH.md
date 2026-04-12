# Phase 6: L2 Runbooks - Research

**Researched:** 2026-03-21
**Domain:** Windows Autopilot L2 technical investigation guides (documentation authoring)
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Investigation depth & resolution boundaries**
- D-01: Remediation commands appear inline in resolution sections — L2 engineers get copy-pasteable PowerShell in context, not links to powershell-ref.md
- D-02: Each runbook has a per-scenario escalation ceiling defining when L2 stops and escalates:
  - ESP/Policy: escalate when root cause is Microsoft-side service issue or Intune backend bug
  - TPM: escalate when firmware update is needed (vendor-specific, beyond L2 scope)
  - Hybrid join: escalate when domain controller or AD Connect issues are confirmed (infrastructure team, not desktop)
- D-03: Tool References section at bottom still links to canonical reference files for full context — inline commands are the working set, references are the complete documentation

**Log collection guide scope & integration**
- D-04: Log collection is a standalone prerequisite guide (`01-log-collection.md`) — every other runbook opens with "Before starting: collect a diagnostic package per [Log Collection Guide](01-log-collection.md)"
- D-05: Log collection guide covers:
  - `mdmdiagnosticstool.exe -area Autopilot -cab -out <path>` (cab is the critical artifact)
  - 4 Event Viewer exports (DeviceManagement-Enterprise-Diagnostics-Provider, Provisioning-Diagnostics-Provider, AAD/Operational, User Device Registration)
  - `Get-AutopilotLogs` as one-command alternative
  - Registry snapshot export (`reg export` for ESP tracking keys)
  - Standard naming convention for collected artifacts (shareable with Microsoft support)
- D-06: Individual runbooks point to which specific logs to examine — the collection guide gathers, the investigation guide interprets

**L1-to-L2 handoff structure**
- D-07: Each L2 runbook opens with a lightweight Triage block (3-4 lines) with dual-path routing:
  - "From L1 escalation?" → list expected data from Phase 4/5 escalation checklists → skip to Step 2
  - "Starting fresh?" → begin at Step 1
- D-08: Phase 4 escalation node IDs (ESE2, TPE1, etc.) referenced in triage block so L2 knows which triage path the ticket came through
- D-09: Triage block is not a gate — L2 can work without L1 data, just starts earlier in the investigation

**File organization & numbering**
- D-10: Directory: `docs/l2-runbooks/` — matches `docs/l1-runbooks/`, `docs/decision-trees/`, etc.
- D-11: Numbering maps 1:1 to requirements:
  - `00-index.md` — L2 runbook index
  - `01-log-collection.md` (L2RB-01)
  - `02-esp-deep-dive.md` (L2RB-02)
  - `03-tpm-attestation.md` (L2RB-03)
  - `04-hybrid-join.md` (L2RB-04)
  - `05-policy-conflicts.md` (L2RB-05)

### Claude's Discretion
- Number and depth of investigation steps per runbook
- Exact registry key paths to examine beyond those in registry-paths.md (research may surface additional paths)
- Specific Event IDs to call out per failure scenario
- Resolution scenario organization within each runbook
- Index file layout and when-to-use descriptions
- Cross-links between L2 runbooks (e.g., ESP runbook referencing policy conflict runbook)
- How to structure the registry snapshot export naming convention
- Whether to include Mermaid investigation flow diagrams (optional — not required)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| L2RB-01 | Log collection guide (mdmdiagnosticstool.exe, Event Viewer paths, PowerShell tools) | D-04/D-05 define exact scope; Get-AutopilotLogs function in powershell-ref.md provides the one-command alternative; all 4 event log paths documented in powershell-ref.md Event Log Sources table |
| L2RB-02 | ESP deep-dive (registry structure, device vs user phase, LOB+Win32 conflicts) | registry-paths.md has 3 ESP-specific paths (MEDIUM confidence); error-codes/03-esp-enrollment.md has policy conflict table and timeout patterns; AppWorkload.log path change (August 2024) documented |
| L2RB-03 | TPM attestation failure investigation (hardware-specific codes, firmware paths) | error-codes/02-tpm-attestation.md has 9 code rows and 5 hardware-specific sections; decision-trees/03-tpm-attestation.md has TPE1-TPE5 escalation nodes with data checklists |
| L2RB-04 | Hybrid join failure investigation (ODJ connector, domain replication, 0x80070774) | error-codes/05-hybrid-join.md has ODJ Connector version (6.2501.2000.5) and current log path; three cause rows for 0x80070774 fully documented |
| L2RB-05 | Policy conflict analysis (AppLocker CSP, DeviceLock, Security Baseline, GPO conflicts) | error-codes/03-esp-enrollment.md policy conflicts table has 6 patterns; AutoAdminLogon and PreferredAadTenantDomainName scenarios documented with registry context |
</phase_requirements>

## Summary

Phase 6 produces six documentation files in `docs/l2-runbooks/`: an index and five investigation guides for Desktop Engineers. Unlike the L1 runbooks that forbid PowerShell and registry references, L2 guides are differentiated precisely by including copy-pasteable PowerShell commands inline and providing registry-level investigation steps. The canonical reference files from Phase 1 (registry-paths.md, powershell-ref.md, endpoints.md) and error code tables from Phase 3 (02-tpm-attestation.md, 03-esp-enrollment.md, 05-hybrid-join.md) are the primary source material — L2 runbooks interpret and orchestrate this content for investigation workflows, not duplicate it.

All upstream canonical content is already written and verified. The primary authoring task is assembling investigation sequences from existing error code tables, escalation node data from Phase 4 decision trees, and escalation checklists from Phase 5 L1 runbooks — then adding L2-only investigation depth: specific Event IDs, registry read steps, PowerShell diagnostic invocations, and inline remediation commands. Two known state blockers from STATE.md apply at authoring time: (1) ODJ Connector log path change (June 2025 / connector version 6.2501.2000.5) is already resolved in error-codes/05-hybrid-join.md — use current path `Applications and Services Logs > Microsoft > Intune > ODJConnectorService`; (2) policy names for L2RB-05 must be validated against the current Microsoft 365 Security Baseline at authoring time.

The forward-link pattern "(available after Phase 6)" appears throughout Phase 3 error code files and Phase 4 decision trees. Phase 6 resolves all these forward-links — the planner must include a task that updates every "(available after Phase 6)" placeholder in those upstream files to actual file paths once the L2 runbook files are created.

**Primary recommendation:** Author all six files in dependency order — log collection first (prerequisite for all others), then the four investigation runbooks, then the index. Include inline forward-link resolution as a final task.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Markdown | — | Document format | Established project convention; all upstream files use Markdown |
| YAML frontmatter | — | Metadata (last_verified, review_by, applies_to, audience) | Pattern set in Phase 1 templates; all existing docs use it |
| Mermaid | — | Optional flow diagrams | Used in Phase 4 decision trees; Claude's discretion whether to add to L2 runbooks |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Phase 1 reference files | — | Link targets for registry paths, PS functions, endpoints | Every runbook Tool References section |
| Phase 3 error code tables | — | Error code lookup link targets | L2RB-02, -03, -04, -05 |
| Phase 4 decision trees | — | Escalation node IDs for triage blocks | Triage blocks in L2RB-02, -03, -04, -05 |

## Architecture Patterns

### Recommended Project Structure

```
docs/l2-runbooks/
├── 00-index.md          # When-to-use table for all 5 runbooks
├── 01-log-collection.md # L2RB-01 — prerequisite for all other runbooks
├── 02-esp-deep-dive.md  # L2RB-02 — ESP registry + app conflict investigation
├── 03-tpm-attestation.md # L2RB-03 — hardware-specific TPM failure investigation
├── 04-hybrid-join.md    # L2RB-04 — ODJ connector + domain join investigation
└── 05-policy-conflicts.md # L2RB-05 — AppLocker CSP, DeviceLock, Security Baseline
```

### Pattern 1: L2 Template Structure

**What:** Every L2 runbook follows the template from `docs/_templates/l2-template.md`: YAML frontmatter → version gate banner → title → Context → Investigation (numbered steps) → Resolution (per-scenario) → Tool References.

**When to use:** All six files in `docs/l2-runbooks/`.

**Example (from `docs/_templates/l2-template.md`):**
```markdown
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: APv1
audience: L2
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# [Issue Title]

## Context
[Background for an L2 engineer who may not have seen this failure.]

## Triage
**From L1 escalation ([ESE4](../decision-trees/01-esp-failure.md#escalation-data))?**
Expected data: serial, deployment mode, timestamp, ESP phase, time-on-ESP. Skip to Step 2.

**Starting fresh?** Begin at Step 1.

## Investigation
### Step 1: Collect diagnostic package
Before starting: collect a diagnostic package per [Log Collection Guide](01-log-collection.md).

### Step 2: [Investigation action]
[Diagnostic steps with registry reads, event ID checks, PowerShell invocations.]

## Resolution
### Scenario A: [Root cause]
[Inline copy-pasteable PowerShell commands — D-01.]

### Escalation Ceiling
[Per D-02: when L2 stops and escalates — specific trigger condition.]

## Tool References
- [PowerShell function](../reference/powershell-ref.md#function-name) — [context]
- [Registry paths](../reference/registry-paths.md) — [which paths]
```

### Pattern 2: Dual-Path Triage Block

**What:** Every investigation runbook (not the log collection guide or index) opens with a 3-4 line triage block that references specific Phase 4 escalation node IDs and states what data L1 already collected.

**When to use:** L2RB-02 through L2RB-05.

**Example (ESP runbook):**
```markdown
## Triage

**From L1 escalation ([ESE1](../decision-trees/01-esp-failure.md#escalation-data), [ESE2](../decision-trees/01-esp-failure.md#escalation-data), [ESE4](../decision-trees/01-esp-failure.md#escalation-data), or [ESE5](../decision-trees/01-esp-failure.md#escalation-data))?**
L1 collected: serial, deployment mode, timestamp, ESP phase, time spent on ESP before/after reboot, app name shown on ESP screen.
Skip to Step 2 — the diagnostic package is Step 1.

**Starting fresh?** Begin at Step 1: collect a diagnostic package per [Log Collection Guide](01-log-collection.md).
```

### Pattern 3: Log Collection Naming Convention

**What:** Standard artifact naming for the diagnostic package — enables sharing with Microsoft Premier Support without reformatting.

**When to use:** L2RB-01 (log collection guide) — define the convention; all other runbooks reference it.

**Recommended convention (Claude's discretion — D-05 specifies content, not names):**
```
YYYY-MM-DD_<SerialNumber>_autopilot-diag.cab    # mdmdiagnosticstool output
YYYY-MM-DD_<SerialNumber>_mdm-admin.evtx        # DeviceManagement-Enterprise-Diagnostics-Provider
YYYY-MM-DD_<SerialNumber>_provisioning.evtx     # Provisioning-Diagnostics-Provider
YYYY-MM-DD_<SerialNumber>_aad.evtx              # AAD/Operational
YYYY-MM-DD_<SerialNumber>_user-device-reg.evtx  # User Device Registration
YYYY-MM-DD_<SerialNumber>_esp-registry.reg      # reg export output
```

### Pattern 4: Inline Remediation in Resolution Sections

**What:** Per D-01, PowerShell remediation commands appear in the Resolution section body — not as links to powershell-ref.md. The Tool References section at the bottom still links to the reference files for the full function signature.

**When to use:** All investigation runbooks (L2RB-02 through L2RB-05).

**Example:**
```powershell
# Resolution Scenario A: ESP stuck due to stale FirstSync keys
# Restart enrollment (device phase only — confirm with L2 Lead before running)
Restart-EnrollmentStatusPage -WhatIf    # dry run first
Restart-EnrollmentStatusPage            # execute after confirming output
```

### Anti-Patterns to Avoid

- **Defining registry paths inline without linking to registry-paths.md:** L2 runbooks should read paths from registry-paths.md via link, then show the PowerShell command to read that path. Don't redefine the path meaning — link to the reference.
- **Mixing L1 portal-click steps with L2 registry steps:** L2 runbooks may mention portal context but investigation steps are PowerShell/registry-based, not click-path instructions.
- **Duplicating error code table rows:** L2RB-02 through -05 reference the error code files by link; they don't reproduce the code-cause-fix table rows inline.
- **Leaving forward-links unresolved:** Every "(available after Phase 6)" annotation in upstream files must be resolved to an actual path. This is a required task in Phase 6 execution.
- **Applying remediation commands without -WhatIf first:** L2 runbook resolution sections should show the -WhatIf dry run before the live command, matching the safety pattern in powershell-ref.md.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| ESP registry path definitions | Redocument paths inline | Link to `docs/reference/registry-paths.md` | Canonical reference already has 8 verified paths including 3 ESP-specific entries |
| PowerShell function signatures | Restate parameters inline | Link to `docs/reference/powershell-ref.md` | All 12 functions fully documented with parameters, examples, safety notes |
| Network endpoint lists | Restate URLs inline | Link to `docs/reference/endpoints.md` | 13 endpoints with test commands already verified |
| Error code cause/fix tables | Reproduce rows inline | Link to Phase 3 error code files | Six category files already authored; duplicating creates maintenance split |
| Glossary term definitions | Define terms inline | First-mention link to `docs/_glossary.md` | 26 terms defined; inline definitions diverge from canonical |

**Key insight:** Phase 6 is an orchestration layer — it assembles investigation sequences from already-authored reference content, adds investigation workflow (step ordering, escalation ceilings, triage blocks) and L2-only diagnostic commands. Building custom solutions for problems already solved in Phases 1-4 creates maintenance overhead.

## Common Pitfalls

### Pitfall 1: AppWorkload.log path vs legacy IntuneManagementExtension.log

**What goes wrong:** L2RB-02 references the wrong IME log file for app installation failures.
**Why it happens:** Documentation historically pointed to `IntuneManagementExtension.log`. Microsoft changed the primary log to `AppWorkload.log` in August 2024.
**How to avoid:** Use `C:\ProgramData\Microsoft\IntuneManagementExtension\Logs\AppWorkload.log` as the primary app install log reference. `IntuneManagementExtension.log` still exists but is no longer the primary source.
**Warning signs:** If investigation steps for 0x81036502 reference `IntuneManagementExtension.log` as the primary log, flag for correction.
**Source:** Documented in error-codes/03-esp-enrollment.md (HIGH confidence — verified in canonical error code file).

### Pitfall 2: ODJ Connector log path (legacy vs current)

**What goes wrong:** L2RB-04 references the legacy ODJ Connector log path that no longer receives entries in current connector versions.
**Why it happens:** Log path changed with connector version 6.2501.2000.5 (January 2025). Legacy path `Applications and Services Logs > ODJ Connector Service` is still present but stale.
**How to avoid:** Always use `Applications and Services Logs > Microsoft > Intune > ODJConnectorService` as the current path. Add explicit "do not use" note for legacy path. Verify connector version is 6.2501.2000.5 or later as a prerequisite step.
**Warning signs:** Any reference to `ODJ Connector Service` (without `Microsoft > Intune` prefix) is the legacy path.
**Source:** Documented in error-codes/05-hybrid-join.md with explicit minimum version (HIGH confidence).

### Pitfall 3: 0x80070774 has three distinct causes — don't collapse them

**What goes wrong:** L2RB-04 treats 0x80070774 as a single scenario when it has three distinct root causes requiring different fixes.
**Why it happens:** The error code looks like a simple "domain controller not found" but the cause branches into profile misconfiguration, connector domain mismatch, and OU permission issues.
**How to avoid:** Document three separate Resolution scenarios for 0x80070774:
  - Scenario A: "Assign user" feature active in hybrid profile (profile fix)
  - Scenario B: ODJ Connector installed in wrong domain (connector reinstall)
  - Scenario C: Connector service account lacks OU permissions (AD permissions fix)
**Warning signs:** A runbook with a single 0x80070774 resolution path.
**Source:** error-codes/05-hybrid-join.md rows 0x80070774 #1, #2, #3 (HIGH confidence).

### Pitfall 4: Security Baseline policy conflict validation needed at authoring time

**What goes wrong:** L2RB-05 references Security Baseline policy names that have changed in newer Microsoft 365 Security Baseline releases.
**Why it happens:** Microsoft releases updated Security Baselines; policy names and settings change between versions.
**How to avoid:** At authoring time, validate policy names (VBS settings, UAC settings, DeviceLock settings) against the current Microsoft 365 Security Baseline version. This is a STATE.md blocker — flagged explicitly.
**Warning signs:** Policy names referencing deprecated settings names from older baseline versions.
**Source:** STATE.md blocker entry (MEDIUM confidence — requires verification at authoring time).

### Pitfall 5: ESP tracking registry keys need mdmdiagnosticstool cab, not manual export

**What goes wrong:** L2RB-02 instructs L2 to manually export ESP tracking keys when the diagnostic cab already contains them.
**Why it happens:** L2 engineers may attempt manual registry inspection without collecting the diagnostic package first.
**How to avoid:** Establish log collection as Step 1 in every investigation runbook. Note which data comes from the cab vs what requires live registry reads (live reads are for when the device is still in-flight on ESP; post-failure analysis uses the cab).
**Warning signs:** Investigation steps that start at registry reads without mentioning the diagnostic package.

### Pitfall 6: TPM hardware-specific sections must not be prescriptive beyond L2 scope

**What goes wrong:** L2RB-03 documents firmware update procedures for OEM chipsets — but per D-02, firmware updates are the escalation ceiling for L2.
**Why it happens:** The error code table lists chipset-specific remediation; it's tempting to include the OEM firmware update steps in the runbook body.
**How to avoid:** L2RB-03 investigation steps lead to identifying the chipset and error code. Resolution sections say "contact OEM support for firmware update" and escalate — they do not document the firmware update procedure itself. The error-codes/02-tpm-attestation.md hardware-specific section is the reference, not a to-do list.
**Source:** D-02 (locked decision) + error-codes/02-tpm-attestation.md "Hardware-Specific Known Issues" section caveat.

## Code Examples

Verified patterns from existing project files:

### Log Collection — mdmdiagnosticstool.exe (L2RB-01)
```powershell
# Source: CONTEXT.md D-05
# Create diagnostic package — cab is the critical artifact for Microsoft support
mdmdiagnosticstool.exe -area Autopilot -cab -out C:\Temp\AutopilotDiag

# One-command alternative using project PowerShell module
# Source: docs/reference/powershell-ref.md#get-autopilotlogs
$logPath = Get-AutopilotLogs -OutputPath "C:\Temp\AutopilotDiag\$env:COMPUTERNAME"
```

### Log Collection — Event Viewer exports (L2RB-01)
```powershell
# Source: docs/reference/powershell-ref.md (Event Log Sources table)
# 4 required exports
$serial = (Get-WmiObject -Class Win32_BIOS).SerialNumber
$date = Get-Date -Format "yyyy-MM-dd"
$prefix = "$date`_$serial"

wevtutil epl "Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin" "$prefix`_mdm-admin.evtx"
wevtutil epl "Microsoft-Windows-Provisioning-Diagnostics-Provider/Admin" "$prefix`_provisioning.evtx"
wevtutil epl "Microsoft-Windows-AAD/Operational" "$prefix`_aad.evtx"
wevtutil epl "Microsoft-Windows-User Device Registration/Admin" "$prefix`_user-device-reg.evtx"
```

### Log Collection — ESP registry snapshot (L2RB-01)
```powershell
# Source: docs/reference/registry-paths.md (ESP tracking keys)
# Export ESP tracking root for post-incident analysis
$serial = (Get-WmiObject -Class Win32_BIOS).SerialNumber
$date = Get-Date -Format "yyyy-MM-dd"
reg export "HKLM\SOFTWARE\Microsoft\Windows\Autopilot\EnrollmentStatusTracking" `
    "$date`_$serial`_esp-registry.reg" /y
```

### ESP Investigation — Reading expected policies (L2RB-02)
```powershell
# Source: docs/reference/registry-paths.md (MEDIUM confidence — Microsoft Learn)
# Read policies the device is waiting for during device phase
$espPolicies = "HKLM:\SOFTWARE\Microsoft\Windows\Autopilot\EnrollmentStatusTracking\ESPTrackingInfo\Diagnostics\ExpectedPolicies"
Get-Item -Path $espPolicies -ErrorAction SilentlyContinue

# Read Win32 app install status (Sidecar subkeys)
$sidecar = "HKLM:\SOFTWARE\Microsoft\Windows\Autopilot\EnrollmentStatusTracking\ESPTrackingInfo\Diagnostics\Sidecar"
Get-ChildItem -Path $sidecar -ErrorAction SilentlyContinue | Select-Object Name, PSChildName
```

### ESP Investigation — App install log (L2RB-02)
```powershell
# Source: error-codes/03-esp-enrollment.md — AppWorkload.log (August 2024 change)
# Primary app install log (not IntuneManagementExtension.log)
$appLog = "C:\ProgramData\Microsoft\IntuneManagementExtension\Logs\AppWorkload.log"
Get-Content $appLog -Tail 100 | Select-String -Pattern "error|fail|0x8" -CaseSensitive:$false
```

### ESP Investigation — FirstSync registry check (L2RB-02)
```powershell
# Source: docs/reference/registry-paths.md (HIGH confidence — from .psm1 source)
# Check ESP device phase completion status per enrollment GUID
$enrollments = Get-ChildItem "HKLM:\SOFTWARE\Microsoft\Enrollments" -ErrorAction SilentlyContinue
foreach ($enrollment in $enrollments) {
    $firstSync = Get-ItemProperty -Path "$($enrollment.PSPath)\FirstSync" -ErrorAction SilentlyContinue
    if ($firstSync) {
        [PSCustomObject]@{
            EnrollmentGUID = $enrollment.PSChildName
            IsServerProvisioningDone = $firstSync.IsServerProvisioningDone
        }
    }
}
```

### TPM Investigation — Status check (L2RB-03)
```powershell
# Source: docs/reference/powershell-ref.md#get-tpmstatus
$tpm = Get-TPMStatus
$tpm | Format-List
# Key values: TpmPresent, TpmReady, TpmEnabled, TpmActivated, TpmOwned

# Get TPM manufacturer and version from WMI for chipset identification
Get-CimInstance -Namespace "root\cimv2\security\microsofttpm" -ClassName Win32_Tpm |
    Select-Object IsEnabled_InitialValue, IsActivated_InitialValue, ManufacturerId, ManufacturerVersion, SpecVersion
```

### TPM Remediation — Clear TPM (L2RB-03)
```powershell
# Source: docs/reference/powershell-ref.md#reset-tpmforautopilot
# Requires reboot after execution
Reset-TPMForAutopilot -WhatIf   # dry run first
Reset-TPMForAutopilot            # execute — confirm device will reboot after
```

### Hybrid Join Investigation — ODJ Connector version check (L2RB-04)
```powershell
# Source: error-codes/05-hybrid-join.md (minimum version 6.2501.2000.5)
# Check connector version before investigating hybrid join failures
Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Intune Connector for AD" -ErrorAction SilentlyContinue |
    Select-Object DisplayVersion, InstallDate

# Check current log path (post-6.2501.2000.5)
# Event Viewer: Applications and Services Logs > Microsoft > Intune > ODJConnectorService
# PowerShell equivalent:
Get-WinEvent -LogName "Microsoft-Intune-ODJConnectorService/Operational" -MaxEvents 50 -ErrorAction SilentlyContinue
```

### Policy Conflict Investigation — AutoAdminLogon check (L2RB-05)
```powershell
# Source: error-codes/03-esp-enrollment.md policy conflicts table
# Check if AutoAdminLogon is being set to 0 (breaks Autopilot autologon)
$winlogon = "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon"
Get-ItemProperty -Path $winlogon -Name AutoAdminLogon -ErrorAction SilentlyContinue

# Check Provisioning registry for additional autologon-related values
Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Provisioning\Diagnostics\Autopilot" -ErrorAction SilentlyContinue
```

### Full Device Status Snapshot (for any L2 runbook opening)
```powershell
# Source: docs/reference/powershell-ref.md#get-autopilotdevicestatus
# Comprehensive first-look — run at start of any investigation
$status = Get-AutopilotDeviceStatus
$status.RegistrationState | Format-List
$status.TPMStatus | Format-List
$status.NetworkConnectivity | Format-Table
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `IntuneManagementExtension.log` as primary app install log | `AppWorkload.log` as primary log | August 2024 | L2RB-02 must reference AppWorkload.log, not IME log |
| `ODJ Connector Service` event log path | `Microsoft > Intune > ODJConnectorService` path | January 2025 (connector v6.2501.2000.5) | L2RB-04 must use new path; old path receives no entries |
| WMI for hardware hash retrieval | CIM sessions via `MDM_DevDetail_Ext01` | Project convention | Get-AutopilotHardwareHash uses CIM — consistent with CLAUDE.md guidance |

**Deprecated/outdated:**
- Legacy ODJ Connector log path `Applications and Services Logs > ODJ Connector Service`: do not reference in L2RB-04; explicit "do not use" note required per error-codes/05-hybrid-join.md
- `IntuneManagementExtension.log` as primary app install log: reference only for legacy context if needed; AppWorkload.log is the primary source post-August 2024

## Forward-Link Resolution (Integration Task)

Phase 6 resolves forward-link annotations placed in upstream files by earlier phases. This is a required integration task distinct from authoring the new runbook files.

**Files containing "(available after Phase 6)" annotations that must be updated:**

| File | Location | Current Text | Resolved Path |
|------|----------|--------------|---------------|
| `docs/error-codes/02-tpm-attestation.md` | L2 Fix column (multiple rows) | `../l2-runbooks/tpm-attestation.md` (available after Phase 6) | `../l2-runbooks/03-tpm-attestation.md` |
| `docs/error-codes/03-esp-enrollment.md` | L2 Fix column | `../l2-runbooks/esp-deep-dive.md` (available after Phase 6) | `../l2-runbooks/02-esp-deep-dive.md` |
| `docs/error-codes/05-hybrid-join.md` | ODJ Connector Notes section | `../l2-runbooks/hybrid-join.md` (available after Phase 6) | `../l2-runbooks/04-hybrid-join.md` |
| `docs/decision-trees/01-esp-failure.md` | Escalation Data See Also column (ESE1-ESE5) | `../l2-runbooks/` (available after Phase 6) | `../l2-runbooks/02-esp-deep-dive.md` |
| `docs/decision-trees/03-tpm-attestation.md` | Escalation Data See Also column (TPE1-TPE5) | `../l2-runbooks/` (available after Phase 6) | `../l2-runbooks/03-tpm-attestation.md` |
| `docs/l1-runbooks/02-esp-stuck-or-failed.md` | L2 forward-link in Escalation Criteria | `../l2-runbooks/` (available after Phase 6) | `../l2-runbooks/02-esp-deep-dive.md` |

**Note:** error-codes/02-tpm-attestation.md already uses the path `../l2-runbooks/tpm-attestation.md` (without the `03-` prefix). The correct resolved path is `../l2-runbooks/03-tpm-attestation.md` per the locked D-11 numbering. Update to include the numeric prefix.

## Open Questions

1. **Exact AppWorkload.log subfile structure for Win32 vs LOB app failures**
   - What we know: AppWorkload.log is the primary log post-August 2024; IME log is legacy
   - What's unclear: Whether Win32 and LOB app failures produce distinguishably different log entries in AppWorkload.log that L2RB-02 should call out by pattern
   - Recommendation: Author L2RB-02 with the general AppWorkload.log path and a grep pattern for error|fail|0x8; note that Sidecar registry subkeys provide per-app status as a complementary signal

2. **Current Microsoft 365 Security Baseline version and policy names**
   - What we know: STATE.md flags this as a blocker — policy names must be validated at authoring time
   - What's unclear: Which specific VBS and UAC policy setting names are in the current baseline that conflict with Autopilot autologon
   - Recommendation: The implementing agent for L2RB-05 must check the current M365 Security Baseline documentation at authoring time; do not use policy names from older baseline versions

3. **ODJ Connector registry path for version detection**
   - What we know: Connector version 6.2501.2000.5 is the minimum; the log path changed with this version
   - What's unclear: The exact registry key path to read for connector version (`HKLM:\SOFTWARE\Microsoft\Intune Connector for AD` is a plausible path but marked LOW confidence — not verified against connector installer)
   - Recommendation: Flag this registry path check as LOW confidence; include the PowerShell alternative and note that the Event Viewer log existence itself confirms version

4. **Mermaid investigation flow diagrams**
   - What we know: Claude's discretion whether to include per CONTEXT.md; Phase 4 uses Mermaid for decision trees
   - What's unclear: Whether adding flow diagrams to L2 runbooks would improve or add noise at this stage
   - Recommendation: Omit Mermaid diagrams from L2 runbooks — the numbered step structure is sufficient and Mermaid is best suited to branching decision trees, not linear investigation sequences. L2 runbooks are investigation guides, not decision trees.

## Validation Architecture

> `workflow.nyquist_validation` is not present in `.planning/config.json` — treat as enabled.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None — phase produces only Markdown documentation |
| Config file | N/A |
| Quick run command | N/A |
| Full suite command | N/A |

**Note:** Phase 6 produces only Markdown documentation files. There is no automated test framework applicable. Validation is by content review against requirements.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| L2RB-01 | Log collection guide covers all 5 D-05 items | manual review | N/A — documentation review | ❌ Wave 0 |
| L2RB-02 | ESP deep-dive documents registry structure for device/user phase separately, including LOB+Win32 conflict indicators | manual review | N/A | ❌ Wave 0 |
| L2RB-03 | TPM runbook documents hardware-specific error codes with firmware update paths per chipset | manual review | N/A | ❌ Wave 0 |
| L2RB-04 | Hybrid join runbook covers ODJ Connector prerequisites, failure modes including 0x80070774, and current connector version | manual review | N/A | ❌ Wave 0 |
| L2RB-05 | Every L2 runbook links to Phase 1 reference files rather than duplicating inline | link audit | N/A — manual check for "(../reference/" links | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** Manual review of file against requirement success criteria
- **Per wave merge:** Full checklist review against all 5 L2RB requirements
- **Phase gate:** All 6 files created, all forward-links resolved, all success criteria met before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `docs/l2-runbooks/` directory — does not exist yet; create before authoring any runbook files
- [ ] All 6 runbook files — authored in Wave 1
- [ ] Forward-link resolution in upstream files — final integration task

*(No test framework gaps — documentation phase, no automated tests applicable)*

## Sources

### Primary (HIGH confidence)
- `docs/_templates/l2-template.md` — L2 template structure; Context → Investigation → Resolution → Tool References
- `docs/reference/registry-paths.md` — 8 paths; 5 HIGH confidence from .psm1, 3 MEDIUM from Microsoft Learn
- `docs/reference/powershell-ref.md` — All 12 functions with parameters, examples, safety notes; Event Log Sources table
- `docs/reference/endpoints.md` — 13 endpoints verified against Microsoft Learn July 2025
- `docs/error-codes/02-tpm-attestation.md` — 9 TPM error code rows; 5 hardware-specific sections
- `docs/error-codes/03-esp-enrollment.md` — 3 coded errors; 6 policy conflict patterns; 3 timeout scenarios
- `docs/error-codes/05-hybrid-join.md` — 6 event ID rows; 3 cause rows for 0x80070774; ODJ Connector version documented
- `docs/decision-trees/01-esp-failure.md` — ESE1-ESE5 escalation nodes with data checklists
- `docs/decision-trees/03-tpm-attestation.md` — TPE1-TPE5 escalation nodes with data checklists
- `docs/l1-runbooks/02-esp-stuck-or-failed.md` — ESP escalation criteria; expected L1 data
- `.planning/phases/06-l2-runbooks/06-CONTEXT.md` — All locked decisions D-01 through D-11

### Secondary (MEDIUM confidence)
- `docs/reference/registry-paths.md` — 3 ESP tracking paths are MEDIUM confidence (Microsoft Learn source, not extracted from .psm1)
- STATE.md — Security Baseline policy name validation flagged as blocker; requires verification at authoring time

### Tertiary (LOW confidence)
- ODJ Connector registry path for version detection (`HKLM:\SOFTWARE\Microsoft\Intune Connector for AD`) — plausible but not verified against connector installer documentation; flag for validation in L2RB-04 authoring

## Metadata

**Confidence breakdown:**
- Standard stack (template/file structure): HIGH — all patterns established by Phases 1-5 with verified examples
- Architecture (runbook content): HIGH — all canonical source files exist and were read directly
- Pitfalls: HIGH for AppWorkload.log and ODJ Connector path (verified in canonical files); MEDIUM for Security Baseline policy names (unverified, flagged as blocker)
- Forward-link resolution map: HIGH — forward-link text extracted from actual file content

**Research date:** 2026-03-21
**Valid until:** 2026-06-21 (90 days — stable documentation domain; ODJ Connector and Security Baseline items may change with Microsoft updates, re-verify at authoring time)
