# Phase 14: APv2 L2 Runbooks - Research

**Researched:** 2026-04-12
**Domain:** Windows Autopilot Device Preparation (APv2) — L2 log collection, BootstrapperAgent event log, Intune deployment report interpretation
**Confidence:** MEDIUM (BootstrapperAgent event IDs have no official Microsoft reference; deployment report structure is HIGH from official docs)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01: File organization** — Create 3 files in `docs/l2-runbooks/`:
- `06-apv2-log-collection.md` — APv2 log collection prerequisite (BootstrapperAgent event log export, deployment report navigation, artifact naming). Explicitly states MDM Diagnostic Tool does NOT apply to APv2.
- `07-apv2-event-ids.md` — BootstrapperAgent event ID lookup with confidence-attributed sources
- `08-apv2-deployment-report.md` — Intune APv2 deployment report interpretation (status values, phase breakdown, failure identification)

**D-02:** Update `docs/l2-runbooks/00-index.md` — add APv2 section with escalation mapping table. Update frontmatter `applies_to: APv1` to `applies_to: both`.

**D-03:** Do NOT modify existing APv1 files (01-05). APv1 files remain `applies_to: APv1` with version gates intact.

**D-04: Tiered table format in `07-apv2-event-ids.md`:**
- Top section: 8-12 key actionable event IDs with full guidance (Event ID | Description | Investigation Steps | Source)
- Bottom section: Compact reference table of remaining known IDs (Event ID | One-line description | Source link)

**D-05:** Single confidence attribution banner at section header (not per-row). Banner states: source is oofhours.com and Call4Cloud community research, confidence MEDIUM, no official Microsoft reference exists as of date.

**D-06:** Tiered structure allows clean upgrade if Microsoft publishes official reference later.

**D-07: Hybrid format in `08-apv2-deployment-report.md`:**
- Top section: Status value reference table for fast lookup (Column | Possible Values | Meaning | Action)
- Bottom section: Investigation paths per failure type by deployment phase

**D-08:** Open with "How to access the deployment report" with exact portal navigation path (Intune admin center > Devices > Monitor > Windows Autopilot device preparation deployments > select device). Self-contained.

**D-09:** Every APv2 L2 guide opens with Triage block:
- "From L1 escalation (APE1/APE2/APE3)? L1 collected [data list]. Skip to Step 2."
- "Starting fresh? Begin at Step 1."
- Step 1 is always log collection / portal state verification; Step 2+ is L2 investigation.

**D-10:** Triage block references specific APv2 escalation node IDs from `04-apv2-triage.md` (APE1, APE2, APE3) and lists exact data L1 collected per L1 runbook escalation criteria.

**D-11:** Consider updating `docs/_templates/l2-template.md` to include Triage block pattern.

**D-12:** All new files use `applies_to: APv2`, `audience: L2` frontmatter with `last_verified` and `review_by` (90-day cycle).

**D-13:** Version gate blockquote header on every file: "This guide covers Autopilot Device Preparation (APv2). For APv1 (classic), see [link]." Plus "See also" footer linking to APv1 equivalent.

**D-14:** Update forward references from `docs/error-codes/06-apv2-device-preparation.md` to real markdown links.

**D-15:** Each L2 guide's "Collect Before Escalating" section states: "No further L2 resolution available — escalate to Microsoft Premier Support with [artifact list]."

### Claude's Discretion

- Exact BootstrapperAgent event log path and export commands (PowerShell or Event Viewer)
- Exact event IDs in curated top section vs compact bottom section (8-12 is guidance)
- Exact Intune portal navigation paths (may vary by portal version)
- Wording of triage block "L1 collected" data lists (must match Phase 13 escalation criteria)
- Whether to include Mermaid diagram showing deployment report structure (optional)
- Whether `06-apv2-log-collection.md` content is substantial enough standalone or should be combined with event IDs (separate preferred, combine if < 20 lines)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| TROU-04 | L2 engineer can investigate APv2 failures using BootstrapperAgent logs and deployment reports | Research confirms BootstrapperAgent log location and collection procedure; IME log folder path verified; deployment report access path verified from official MS docs |
| TROU-05 | L2 engineer can interpret the Intune APv2 deployment report (status meanings, failure indicators) | Deployment report structure fully documented from official Microsoft Learn — all tabs, columns, and status values verified HIGH confidence |
</phase_requirements>

---

## Summary

Phase 14 delivers three L2 runbooks and an updated index for APv2 Desktop Engineers. The technical domain divides cleanly into two halves: (1) log collection and event ID reference, and (2) deployment report interpretation.

The deployment report side is well-documented by Microsoft Learn and presents no research risk. The status values, tabs, columns, and portal navigation path are all verifiable from the official `reporting-monitoring` page (updated February 2026). Implementation here is straightforward: copy the official structure into the hybrid-format guide defined by D-07.

The BootstrapperAgent event log side requires careful handling. No official Microsoft documentation exists for BootstrapperAgent event IDs. The log itself is a real, accessible component — community sources (Patch My PC, Call4Cloud) confirm it exists, is written by the IME's BootstrapperAgent component, and is the primary APv2 investigation tool replacing MDMDiagnosticsTool. The critical explicit statement that MDM Diagnostic Tool does NOT apply to APv2 is supported by multiple community sources and must appear prominently in `06-apv2-log-collection.md`. The event ID catalog must be authored with MEDIUM confidence attribution per D-05.

The L1-to-L2 handoff structure is already fully defined by Phase 13 outputs. The triage block content for each guide is directly readable from the existing L1 runbook escalation criteria sections and the APv2 triage tree node IDs (APE1, APE2, APE3).

**Primary recommendation:** Write all three new files by building on the exact patterns established in APv1 L2 guides (especially `02-esp-deep-dive.md`), adapting content for APv2 log sources, and applying the MEDIUM-confidence attribution banner to the event ID section as locked in D-05.

---

## Standard Stack

This phase produces Markdown documentation — no software libraries. The "stack" is the established document structure from the existing codebase.

### Document Patterns In Use

| Pattern | Source | Purpose |
|---------|--------|---------|
| Frontmatter block | All Phase 11-13 files | `last_verified`, `review_by`, `applies_to`, `audience` |
| Version gate blockquote | All Phase 11-13 files | Framework scope declaration at file top |
| Triage block | APv1 L2 guides 02-05 | L1 escalation vs fresh-start routing |
| Value interpretation table | `02-esp-deep-dive.md` | Embedded within investigation steps |
| Escalation Ceiling section | `02-esp-deep-dive.md` | Defines L2 resolution limit, escalation artifact list |
| 90-day review cycle | Phase 11-13 established | `review_by = last_verified + 90 days` |
| One-topic-per-file | Phase 12, 13 pattern | Separate files for each distinct topic |
| "See also" footer | All L2 guides | Cross-links to equivalent APv1 guide and comparison page |

### Files Being Created

| File | Pattern Source | Key Difference From APv1 Equivalent |
|------|---------------|--------------------------------------|
| `06-apv2-log-collection.md` | `01-log-collection.md` (APv1) | No MDMDiagnosticsTool; uses BootstrapperAgent event log + IME log folder instead |
| `07-apv2-event-ids.md` | No APv1 equivalent | New format: tiered table with confidence banner; community sources only |
| `08-apv2-deployment-report.md` | `02-esp-deep-dive.md` (APv1, closest analog) | Portal-based interpretation (no registry/PowerShell); deployment report is APv2's equivalent of ESP registry keys |

### Files Being Updated

| File | Change |
|------|--------|
| `docs/l2-runbooks/00-index.md` | Add APv2 section; update frontmatter to `applies_to: both`; add APE1/APE2/APE3 escalation mapping rows |
| `docs/error-codes/06-apv2-device-preparation.md` | Replace "Phase 14" placeholder text with real markdown links to new L2 runbook files |
| `docs/_templates/l2-template.md` | Optional: add Triage block to template (per D-11) |

---

## Architecture Patterns

### L2 Investigation Structure (Established)

Every L2 guide follows this structure — confirmed by reading `02-esp-deep-dive.md`:

```
Frontmatter
Version gate blockquote
# Title
## Triage block
  - From L1 escalation (node IDs)? L1 collected [list]. Skip to Step 2.
  - Starting fresh? Begin at Step 1.
## Investigation
  ### Step 1: Log collection / portal state (if starting fresh)
  ### Step 2: [Primary investigation action]
  [Value interpretation tables embedded in steps]
## Resolution
  ### Scenario A: [Root cause]
  ### Scenario B: [Alternative root cause]
## Escalation Ceiling
  [What to collect, "No further L2 resolution — escalate to Microsoft Premier Support"]
## Tool References / See Also
## Version History
```

### Triage Block Content — What L1 Collected Per Escalation Node

Read directly from Phase 13 L1 runbooks' "Before escalating, collect" sections:

| APv2 L2 Escalation Node | L1 Runbook | L1 Collected Data |
|--------------------------|------------|-------------------|
| APE1 — Entra join failed | `04-apv2-triage.md` (escalation data table) | Deployment report (screenshot/export), Entra join error details from Phase column, device serial number, signing-in user UPN, Entra device settings screenshot |
| APE2 — Enrollment failed | `04-apv2-triage.md` | Intune device enrollment status, signing-in user UPN and license assignment screenshot, MDM scope configuration screenshot, device serial number |
| APE3 — IME or infrastructure failure | `04-apv2-triage.md` | Full deployment report with phase breakdown (screenshot/export), device serial number, network information (Wi-Fi/ethernet, proxy), timestamp of failure |

Additionally, the four L1 runbooks each have their own "Before escalating, collect" lists that feed into L2. These are the relevant L1-originating escalations beyond APE1/APE2/APE3:

| L1 Runbook | Escalation to L2 Triggers | L1 Collected |
|------------|---------------------------|--------------|
| `06-apv2-deployment-not-launched.md` | All portal checks clear but deployment did not launch | Serial, OS version/build, policy name+groups, MDM scope, Entra join setting, corporate identifier status |
| `07-apv2-apps-not-installed.md` | App Failed with correct context+ETG; any script Failed; multiple Skipped despite correct assignment | Serial, device name, app/script status list, per-app context+ETG status, Managed Installer status, deployment report screenshots |
| `08-apv2-apv1-conflict.md` | No APv1 registration found but ESP appeared | Serial, APv1 registration status, profile name, screen screenshot |
| `09-apv2-deployment-timeout.md` | Timeout value adequate but timeout still occurs; retry after adjustment still times out | Serial, device name, timeout value, app/script count, app statuses at timeout, Cloud PC status, deployment date |

### Deployment Report Structure (Official — HIGH Confidence)

Source: Microsoft Learn `reporting-monitoring` page, updated February 2026.

**Portal navigation:** Intune admin center > Devices > Monitor > Windows Autopilot device preparation deployments > [select device under Device name]

**Main list columns:**

| Column | Values | Failure Indicator |
|--------|--------|-------------------|
| Device name | Device name (clickable) | — |
| Enrollment date | Date/time | — |
| Deployment status | In progress / Success / Failed | **Failed** = investigate |
| Phase | Policy installation / Script installation / App installation | Phase where failure occurred |
| Serial number | Hardware serial | — |
| Deployment time | Duration / "In progress" | — |
| UPN | Signing-in user | — |

**Device deployment details pane — three sections:**

**1. Device section:**

| Field | Description |
|-------|-------------|
| Device name | Clickable — goes to device details in Intune |
| Deployment status | In progress / Success / Failed |
| Device ID | Intune device ID |
| Microsoft Entra device ID | Entra device ID |
| Serial number | Hardware serial |
| Deployment policy | Policy name applied |
| Policy version | Version number (increments on each save) |
| OS version | Windows version during deployment |

**2. Apps tab:**

| Status | Meaning | Action |
|--------|---------|--------|
| Installed | App deployed successfully | None |
| In progress | App currently installing | Wait or check if stalled |
| Skipped | App selected in policy but not assigned to device group, or app not applicable to device | Check ETG assignment; check Managed Installer policy (resolved April 2026) |
| Failed | App failed to install | Check BootstrapperAgent log and IME logs |

**3. Scripts tab:**

| Status | Meaning | Action |
|--------|---------|--------|
| Installed | Script ran successfully | None |
| In progress | Script currently running | Wait |
| Skipped | Script selected in policy but not assigned to device group | Check ETG assignment |
| Failed | Script failed to run | Check BootstrapperAgent log and IME logs for exit code |

**Phase column values** (failure phase identification):

| Phase | What It Covers | Failure Means |
|-------|----------------|---------------|
| Policy installation | Initial setup + LOB/M365 app installation (Steps 2-7 of deployment flow) | Entra join, enrollment, IME install, or LOB/M365 app failure |
| Script installation | PowerShell scripts (Step 8) | A script failed or timed out |
| App installation | Win32, Store, EAC apps (Step 9) | A Win32/Store/EAC app failed |

---

## APv2 Log Collection — What L2 Uses Instead of MDMDiagnosticsTool

### Critical Distinction: MDM Diagnostic Tool Does NOT Apply to APv2

**Confidence: MEDIUM** — Supported by multiple community sources (Patch My PC, oofhours.com); no Microsoft official statement found, but consistent across all APv2 troubleshooting guides reviewed.

- `mdmdiagnosticstool.exe -area Autopilot -cab` is designed for APv1 (classic Autopilot) and the ESP flow.
- `Get-WindowsAutopilotDiagnostics.ps1` is similarly APv1-focused.
- For APv2, the diagnostics are in two places: (1) the BootstrapperAgent event log and (2) the IME log folder.
- The "Export logs" button displayed on-device during a failed APv2 deployment saves logs automatically to the first USB drive (known issue: no success/failure message displayed — documented in Microsoft Learn known issues, added January 2025).
- Intune also auto-collects diagnostics on failure, accessible via Device diagnostics in the Intune admin center under the affected device.

### BootstrapperAgent Event Log

**Confidence: MEDIUM** — Path and behavior described by community sources (Patch My PC APv2 troubleshooting guide, Call4Cloud APv2 technical flow). No official Microsoft documentation for this specific log or its event IDs.

**What is known:**
- The BootstrapperAgent is a component of the Intune Management Extension (IME) that orchestrates APv2 provisioning.
- The log is automatically enabled/registered when IME installs. It can be manually pre-registered via wevtutil before enrollment if you want to capture early events.
- The log is in the Windows Event Viewer structure under a provider registered by the IME installer.
- Community sources consistently describe it as the "go-to source" for APv2 provisioning troubleshooting — logging provisioning steps, progress states, and errors.
- The log captures: provisioning state transitions, service provider queries, app installation requests, script execution attempts, timeout events, enrollment failures.

**What is NOT definitively known (research finding):**
- The exact full Event Viewer path (e.g., `Applications and Services Logs\Microsoft\Windows\IntuneManagementExtension\BootstrapperAgent`) cannot be confirmed from official documentation. Community sources describe the log by name but do not consistently state the full path.
- The specific event ID numbers have no official Microsoft reference. No authoritative list of APv2 BootstrapperAgent event IDs was found in any source (Microsoft, oofhours.com, Call4Cloud, Patch My PC, or other community blogs).

**Recommended approach for `07-apv2-event-ids.md`:** Apply D-05 as designed — the tiered table with MEDIUM confidence banner citing oofhours.com and Call4Cloud as sources, with explicit note that no official Microsoft reference exists. The exact event IDs in the guide will be drawn from community research and should be clearly attributed. The planner should mark this content as requiring validation against an actual APv2 deployment before publication.

**Export command (Community-sourced, MEDIUM confidence):**

```powershell
# Build filename prefix
$serial = (Get-WmiObject -Class Win32_BIOS).SerialNumber
$date = Get-Date -Format "yyyy-MM-dd"
$prefix = "$date`_$serial"

# Export BootstrapperAgent event log
# Note: Log name must be verified on a device with IME installed
# Community sources indicate it's registered under the IME ETW provider
wevtutil epl "Microsoft-Windows-IntuneManagementExtension/BootstrapperAgent" "$prefix`_bootstrapper.evtx"
```

> **Authoring note:** The log name `Microsoft-Windows-IntuneManagementExtension/BootstrapperAgent` is the most commonly referenced path in community sources but should be verified on a device with IME installed before finalizing the runbook. Run `wevtutil el | findstr -i bootstrapper` to discover the exact registered name.

### IME Log Folder (Official — HIGH Confidence)

Source: Microsoft Learn `intune-management-extension` page, updated March 2026.

**Path:** `C:\ProgramData\Microsoft\IntuneManagementExtension\Logs`

| Log File | Primary Content |
|----------|----------------|
| `IntuneManagementExtension.log` | Main log: check-ins, policy requests, policy processing, reporting |
| `AgentExecutor.log` | PowerShell script execution tracking |
| `AppWorkload.log` | Win32 app deployment activities — primary source for app failure investigation |
| `AppActionProcessor.log` | App detection and applicability checks |
| `ClientHealth.log` | IME health status |

For APv2 investigations, `AppWorkload.log` is the primary source for app install failures (same log used in APv1 ESP investigation — established in Phase 06 L2 runbook pattern). `AgentExecutor.log` covers script failures.

### Artifact Naming Convention (Following Established Pattern)

The APv1 log collection guide (`01-log-collection.md`) established `YYYY-MM-DD_SerialNumber_descriptor` naming. Apply the same pattern for APv2:

| Artifact | Filename Pattern |
|----------|-----------------|
| BootstrapperAgent event log | `YYYY-MM-DD_SerialNumber_bootstrapper.evtx` |
| IME main log | `YYYY-MM-DD_SerialNumber_ime-main.log` |
| AppWorkload log | `YYYY-MM-DD_SerialNumber_appworkload.log` |
| AgentExecutor log | `YYYY-MM-DD_SerialNumber_agentexecutor.log` |
| Deployment report export | `YYYY-MM-DD_SerialNumber_deployment-report.png` (screenshot) |

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Event ID lookup table for BootstrapperAgent | Custom research from scratch | Community sources (oofhours.com, Call4Cloud) with explicit MEDIUM confidence attribution | These sources have done the hands-on investigation; attribute and cite rather than re-research from zero |
| Deployment report status definitions | Custom interpretation | Official Microsoft Learn `reporting-monitoring` page (HIGH confidence) | Microsoft defines the status values — direct source is authoritative |
| Log export commands | Custom PowerShell | `wevtutil epl` syntax (same as APv1 log collection guide pattern) | Consistency with established L2 guide pattern; same tool used in `01-log-collection.md` |
| L1 collected data lists | Re-read L1 runbooks | Read directly from Phase 13 escalation criteria sections (already verified above in research) | Phase 13 is the ground truth; don't interpret, copy |

---

## Common Pitfalls

### Pitfall 1: Asserting MDM Diagnostic Tool Applies to APv2
**What goes wrong:** L2 engineer runs `mdmdiagnosticstool.exe -area Autopilot -cab` expecting APv2 diagnostic data and gets a mostly empty or APv1-scoped output.
**Why it happens:** MDMDiagnosticsTool was built for APv1/ESP flow. The tool name sounds universal. The APv2 BootstrapperAgent log is a separate channel entirely.
**How to avoid:** `06-apv2-log-collection.md` must have an explicit callout in the opening context — not buried in a footnote. Wording should be unambiguous: "MDM Diagnostic Tool does not capture APv2 BootstrapperAgent data. Do not use it for APv2 investigations."
**Warning signs:** L2 collects a .cab file but finds no bootstrapper or device preparation data inside.

### Pitfall 2: Confusing APv2 Deployment Status "Skipped" With "Not Required"
**What goes wrong:** L2 or L1 sees "Skipped" in the Apps tab and treats it as a benign or optional state, not investigating further.
**Why it happens:** "Skipped" sounds like the app was passed over intentionally. In APv2, it means the app was selected in the policy but was not delivered — indicating a configuration gap.
**How to avoid:** `08-apv2-deployment-report.md` status table must explicitly state: "Skipped = configuration gap; treat with same urgency as Failed." This is also documented in the L1 runbook `07-apv2-apps-not-installed.md` for L1 engineers.
**Warning signs:** Deployment report shows multiple Skipped entries with no further investigation initiated.

### Pitfall 3: Conflating APv1 Event IDs With APv2 BootstrapperAgent Event IDs
**What goes wrong:** L2 looks up event IDs from the `ModernDeployment-Diagnostics-Provider/Autopilot` log (the APv1 event log) and applies them to APv2 BootstrapperAgent events.
**Why it happens:** The two logs coexist on the same device. The APv1 event IDs (100-172, 807-908) are documented by Microsoft; the APv2 BootstrapperAgent IDs are not. An L2 who finds a documented event ID may assume it applies to APv2.
**How to avoid:** `07-apv2-event-ids.md` must open with a clear scope statement: "These event IDs are from the BootstrapperAgent log (APv2). They are different from the APv1 event IDs in ModernDeployment-Diagnostics-Provider/Autopilot." Include a "not applicable to APv2" callout for common APv1 IDs.
**Warning signs:** L2 reports finding "event ID 100 — APv2 profile not found" — this is an APv1 event.

### Pitfall 4: Triage Block Missing Exact L1 Node IDs
**What goes wrong:** Triage block says "from L1 escalation" without specifying the node IDs (APE1/APE2/APE3), leaving L2 unable to verify the escalation path or know which data L1 already collected.
**Why it happens:** Planner might write a generic triage block without reading the Phase 13 triage tree outputs.
**How to avoid:** Each triage block must name the specific APE node IDs. The data collected lists must be copied verbatim from the L1 runbook escalation criteria — verified above in research.
**Warning signs:** Triage block reads "From L1 escalation?" without specifying which escalation node.

### Pitfall 5: Phase Column Mis-Mapping in Deployment Report Guide
**What goes wrong:** Guide says "Policy installation phase = Entra join failure" without acknowledging that the Policy installation phase covers Steps 2-7 (a wide range including Entra join, enrollment, IME install, and LOB/M365 app installation).
**Why it happens:** The Phase column value is coarse-grained. "Policy installation" sounds like it only covers policy delivery, not app installation.
**How to avoid:** The phase breakdown in `08-apv2-deployment-report.md` must map each Phase value to the specific deployment flow steps it covers (using step numbers from `docs/lifecycle-apv2/02-deployment-flow.md`). See Architecture Patterns section above.
**Warning signs:** Guide uses "Policy installation" to mean only Entra join/enrollment, omitting LOB/M365 app failures.

---

## Code Examples

### Deployment Report Portal Navigation (Verified from Official Docs)

```
Intune admin center (https://intune.microsoft.com)
  > Devices
  > Monitor
  > Windows Autopilot device preparation deployments
  [List view: Device name | Enrollment date | Deployment status | Phase | Serial number | Deployment time | UPN]
  > Select device name
  > Device deployment details pane
    > Device (section)
    > Apps (tab)
    > Scripts (tab)
```

### BootstrapperAgent Log Export (Community-Sourced, MEDIUM Confidence)

```powershell
# Step 1: Verify the registered log name on this device
# Run from an elevated PowerShell session
wevtutil el | Where-Object { $_ -like "*Bootstrapper*" -or $_ -like "*IME*" }

# Step 2: Build naming prefix
$serial = (Get-WmiObject -Class Win32_BIOS).SerialNumber
$date = Get-Date -Format "yyyy-MM-dd"
$prefix = "$date`_$serial"

# Step 3: Export BootstrapperAgent event log
# Replace log name below with actual name confirmed in Step 1
wevtutil epl "Microsoft-Windows-IntuneManagementExtension/BootstrapperAgent" "$prefix`_bootstrapper.evtx"
```

### IME Log Folder Collection

```powershell
$serial = (Get-WmiObject -Class Win32_BIOS).SerialNumber
$date = Get-Date -Format "yyyy-MM-dd"
$prefix = "$date`_$serial"
$dest = "C:\Temp\APv2Diag"
New-Item -ItemType Directory -Path $dest -Force | Out-Null

$src = "C:\ProgramData\Microsoft\IntuneManagementExtension\Logs"
Copy-Item "$src\IntuneManagementExtension.log" "$dest\$prefix`_ime-main.log"
Copy-Item "$src\AppWorkload.log" "$dest\$prefix`_appworkload.log"
Copy-Item "$src\AgentExecutor.log" "$dest\$prefix`_agentexecutor.log"
```

### wevtutil Log Name Discovery (If Exact Path Is Unknown)

```powershell
# List all registered event log providers containing "Bootstrapper" or "Intune"
wevtutil el | Where-Object { $_ -match "Bootstrapper|IntuneManagement" }
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| MDMDiagnosticsTool for all Autopilot log collection | BootstrapperAgent event log + IME logs for APv2; MDMDiagnosticsTool remains valid for APv1 only | APv2 GA (May 2024) | L2 must know which tool applies to which framework |
| AppWorkload.log didn't exist | AppWorkload.log is primary app install log (IME) | August 2024 | This was already documented in Phase 06 APv1 L2 guides; same log applies for APv2 IME-driven app installs |
| Win32/Store/EAC apps skipped when Managed Installer active | Known issue — resolved April 2026 | April 2026 | L2 can stop investigating Managed Installer as active issue for tenants on current service version; note in deployment report guide as resolved |
| Windows 365 device timeout ignored configured value (60-min hardcoded) | Resolved February 2026 | February 2026 | L2 investigating W365 timeouts on recent deployments should not suspect this issue |
| Deployment experience stuck at 100% with no error | Known issue — fix in progress | June 2024 (unfixed as of research date) | L2 should document this as a known state: manual device restart may be needed |

**Deprecated/outdated for APv2:**
- `mdmdiagnosticstool.exe -area Autopilot`: APv1 only, does not capture BootstrapperAgent data
- `Get-WindowsAutopilotDiagnostics.ps1`: APv1 only
- ESP registry investigation pattern (`EnrollmentStatusTracking`, `FirstSync`, `Sidecar` keys): APv1 only — APv2 does not use ESP and these keys do not apply

---

## Cross-Link Update Map

The following files require updates in addition to creating the three new L2 runbooks:

### `docs/error-codes/06-apv2-device-preparation.md` — Forward Reference Updates

| Current Placeholder Text | Replace With |
|--------------------------|--------------|
| "See L2 runbooks (Phase 14)" (Entra join failed entry) | `[APv2 Log Collection](../l2-runbooks/06-apv2-log-collection.md)` and `[APv2 Deployment Report](../l2-runbooks/08-apv2-deployment-report.md)` |
| "See L2 runbooks (Phase 14)" (Intune enrollment failed entry) | `[APv2 Log Collection](../l2-runbooks/06-apv2-log-collection.md)` and `[APv2 Deployment Report](../l2-runbooks/08-apv2-deployment-report.md)` |
| "L2 runbook: APv2 IME installation failure investigation (Phase 14)" | `[APv2 Deployment Report](../l2-runbooks/08-apv2-deployment-report.md)` |
| "L2 runbook: APv2 PowerShell script failure investigation (Phase 14)" | `[APv2 Event IDs](../l2-runbooks/07-apv2-event-ids.md)` and `[APv2 Deployment Report](../l2-runbooks/08-apv2-deployment-report.md)` |
| "L2 runbook: APv2 post-deployment configuration analysis (Phase 14)" | `[APv2 Deployment Report](../l2-runbooks/08-apv2-deployment-report.md)` |

### `docs/l2-runbooks/00-index.md` — APv2 Section to Add

New section after existing APv1 content:

```markdown
## APv2 (Autopilot Device Preparation) Runbooks

| Runbook | When to Use | Prerequisite |
|---------|-------------|--------------|
| [APv2 Log Collection Guide](06-apv2-log-collection.md) | Before starting any APv2 L2 investigation — collect BootstrapperAgent log and IME logs | None |
| [APv2 Event ID Reference](07-apv2-event-ids.md) | Looking up BootstrapperAgent event IDs to identify failure type | [APv2 Log Collection](06-apv2-log-collection.md) |
| [APv2 Deployment Report Guide](08-apv2-deployment-report.md) | Interpreting the Intune APv2 deployment report — status values, phase breakdown, failure identification | [APv2 Log Collection](06-apv2-log-collection.md) |
```

APv2 escalation mapping table rows to add:

| L1 Escalation Node IDs | Source Scenario | L2 Runbook |
|------------------------|-----------------|------------|
| APE1 | Entra join failed | [APv2 Deployment Report Guide](08-apv2-deployment-report.md) |
| APE2 | Enrollment failed | [APv2 Deployment Report Guide](08-apv2-deployment-report.md) |
| APE3 | IME or infrastructure failure | [APv2 Deployment Report Guide](08-apv2-deployment-report.md) + [APv2 Event ID Reference](07-apv2-event-ids.md) |

### L1 Runbooks — Forward References to Update

| L1 Runbook | Current Text | Replace With |
|------------|-------------|--------------|
| `06-apv2-deployment-not-launched.md` | "L2 runbooks index (Phase 14 -- to be created)" | `[APv2 L2 Runbooks](../l2-runbooks/00-index.md#apv2-autopilot-device-preparation-runbooks)` |
| `07-apv2-apps-not-installed.md` | "L2 runbooks index (Phase 14 -- to be created)" | `[APv2 L2 Runbooks](../l2-runbooks/00-index.md#apv2-autopilot-device-preparation-runbooks)` |
| `08-apv2-apv1-conflict.md` | "L2 runbooks index (Phase 14 -- to be created)" | `[APv2 L2 Runbooks](../l2-runbooks/00-index.md#apv2-autopilot-device-preparation-runbooks)` |
| `09-apv2-deployment-timeout.md` | "L2 runbooks index (Phase 14 -- to be created)" | `[APv2 L2 Runbooks](../l2-runbooks/00-index.md#apv2-autopilot-device-preparation-runbooks)` |

---

## Pending Check (Carry Forward From STATE.md)

> **From STATE.md Pending Todos:** "Check for any Microsoft BootstrapperAgent event ID guidance published after 2026-04-10 before Phase 14 authoring."

Research conducted 2026-04-12 found no new official Microsoft BootstrapperAgent event ID documentation. The situation is unchanged from the original research decision: MEDIUM confidence attribution to oofhours.com and Call4Cloud is required. This check should be repeated at actual authoring time.

---

## Open Questions

1. **Exact BootstrapperAgent event log path**
   - What we know: The log exists, is written by IME's BootstrapperAgent component, is accessible in Event Viewer, and can be exported with wevtutil. Community sources describe it by name but not by consistent full path.
   - What's unclear: The exact provider registration name (`Microsoft-Windows-IntuneManagementExtension/BootstrapperAgent` is the most commonly referenced form but unconfirmed against official docs).
   - Recommendation: The author should verify the exact name by running `wevtutil el | findstr -i bootstrapper` on a device with IME installed before writing the export command in `06-apv2-log-collection.md`. Include the discovery command in the guide as Step 0 to make it self-correcting.

2. **Specific BootstrapperAgent event IDs for curated top section**
   - What we know: No official list exists. Community blogs reference the log generically without publishing a numbered event ID catalog.
   - What's unclear: Which event IDs map to specific failures (deployment failure, app failure, script failure, Entra join error, enrollment error, timeout).
   - Recommendation: The author needs hands-on access to the log from a failed APv2 deployment, or must draw from community blog screenshots and descriptions. The tiered table format (D-04) accommodates partial knowledge: actionable IDs in top section, informational IDs in compact bottom section. The MEDIUM confidence banner (D-05) is the correct mitigation. This is a known constraint, not a blocker.

3. **Whether `06-apv2-log-collection.md` is substantial enough as a standalone file**
   - What we know: The APv1 equivalent (`01-log-collection.md`) is 126 lines covering four sections plus artifact naming. APv2 log collection has fewer steps (no MDMDiagnosticsTool, no registry snapshot) but includes the BootstrapperAgent export procedure, IME log folder copy, and the important negative statement about MDMDiagnosticsTool.
   - What's unclear: Whether the APv2 content reaches the "substantial enough" threshold defined in Claude's Discretion (above 20 lines).
   - Recommendation: The author will have enough content for a standalone file: (1) explicit MDMDiagnosticsTool exclusion statement, (2) BootstrapperAgent export with discovery command, (3) IME log folder collection, (4) Intune portal diagnostic collection, (5) artifact naming convention. Estimate 50-70 lines — well above the combine threshold.

---

## Validation Architecture

> `nyquist_validation` key absent from `.planning/config.json` — but this is a documentation-only phase producing Markdown files. There is no software test infrastructure to run. All verification is content review against success criteria, not automated testing.

**Verification approach for this phase:** The existing project uses `/gsd:verify-work` for manual content review against success criteria. The three success criteria from the phase definition map directly to the guide structure:

| Success Criterion | Verified By |
|------------------|-------------|
| L2 can follow step-by-step log collection guide that explicitly states MDM Diagnostic Tool does not apply | `06-apv2-log-collection.md` opens with explicit statement; guide completes without referencing MDMDiagnosticsTool |
| L2 can look up BootstrapperAgent event IDs with confidence-attributed source citations | `07-apv2-event-ids.md` has MEDIUM confidence banner citing oofhours.com and Call4Cloud; tiered table format |
| L2 can read deployment report, interpret status values, and identify failure indicators | `08-apv2-deployment-report.md` has status value reference table covering all tabs and fields |

---

## Sources

### Primary (HIGH Confidence)

- Microsoft Learn: `reporting-monitoring` — Windows Autopilot device preparation reporting and monitoring (updated February 2026). Used for: deployment report structure, all status values (Installed/In progress/Skipped/Failed for Apps and Scripts tabs), portal navigation path, Phase column values, Device section fields. URL: https://learn.microsoft.com/en-us/autopilot/device-preparation/reporting-monitoring

- Microsoft Learn: `known-issues` — Windows Autopilot device preparation known issues (updated April 2026). Used for: Managed Installer resolution status (resolved April 2026), Windows 365 timeout resolution (resolved February 2026), Export logs behavior (no success/failure feedback). URL: https://learn.microsoft.com/en-us/autopilot/device-preparation/known-issues

- Microsoft Learn: `intune-management-extension` — Understand Microsoft Intune Management Extension (updated March 2026). Used for: IME log folder path (`C:\ProgramData\Microsoft\IntuneManagementExtension\Logs`), individual log file names and descriptions. URL: https://learn.microsoft.com/en-us/intune/intune-service/apps/intune-management-extension

- Existing codebase: `docs/l2-runbooks/02-esp-deep-dive.md` — APv1 L2 guide. Used for: establishing L2 guide structure, triage block pattern, value interpretation table pattern, escalation ceiling section pattern.

- Existing codebase: `docs/decision-trees/04-apv2-triage.md` — APv2 triage tree (Phase 13 output). Used for: APE1/APE2/APE3 escalation node IDs and exact data collection lists.

- Existing codebase: `docs/l1-runbooks/06-09*.md` — APv2 L1 runbooks (Phase 13 output). Used for: escalation criteria content, "Before escalating, collect" data lists for triage block construction.

### Secondary (MEDIUM Confidence)

- Patch My PC blog: "Troubleshooting Autopilot Device Preparation (AP-DP)". Used for: confirmation that MDMDiagnosticsTool does not apply to APv2, BootstrapperAgent log existence and role. URL: https://patchmypc.com/blog/ultimate-guide-troubleshoot-windows-autopilot/

- Call4Cloud: "Autopilot Device Preparation | Technical Flow | APv2". Used for: BootstrapperAgent log behavior, registry paths for provisioning state. URL: https://call4cloud.nl/autopilot-device-preparation-flow-apv2/

- oofhours.com: "Next-generation Autopilot Troubleshooting" (May 2025). Used for: confirmation that APv2 troubleshooting uses IME/BootstrapperAgent logs, not APv1 diagnostic tools. URL: https://oofhours.com/2025/05/01/next-generation-autopilot-troubleshooting/

- Microsoft Learn: `troubleshooting-faq` — Windows Autopilot troubleshooting FAQ (updated April 2026). Used for: APv1 event IDs (100-172, 807-908) from `ModernDeployment-Diagnostics-Provider/Autopilot` — documented to confirm they are APv1 only and should NOT be confused with APv2 BootstrapperAgent event IDs. URL: https://learn.microsoft.com/en-us/autopilot/troubleshooting-faq

### Tertiary (LOW Confidence — Flag for Validation)

- BootstrapperAgent event log exact provider name (`Microsoft-Windows-IntuneManagementExtension/BootstrapperAgent`): reconstructed from community source descriptions, not confirmed against official Microsoft documentation or actual device inspection. Must be verified before authoring `06-apv2-log-collection.md`.

- Specific BootstrapperAgent event ID numbers: no authoritative source found. Content for `07-apv2-event-ids.md` top section (curated 8-12 IDs) requires either (a) hands-on device investigation, (b) community blog screenshot analysis, or (c) explicit flagging in the guide that specific IDs are not yet enumerated and must be added during authoring.

---

## Metadata

**Confidence breakdown:**
- Deployment report structure: HIGH — directly sourced from Microsoft Learn official documentation, updated February 2026
- MDMDiagnosticsTool exclusion: MEDIUM — consistent across multiple community sources, no official Microsoft negative statement found
- BootstrapperAgent log path: LOW-MEDIUM — community sources confirm existence and role; exact provider registration name unverified
- BootstrapperAgent event IDs: LOW — no official Microsoft reference; community blogs describe behavior but do not publish a numbered ID catalog
- L1 triage handoff data: HIGH — read directly from Phase 13 output files in the codebase
- IME log folder path: HIGH — official Microsoft Learn documentation

**Research date:** 2026-04-12
**Valid until:** 2026-07-11 (90-day cycle matching phase file review schedule); re-verify BootstrapperAgent event ID guidance monthly as Microsoft may publish official documentation
