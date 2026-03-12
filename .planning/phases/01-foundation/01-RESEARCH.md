# Phase 1: Foundation - Research

**Researched:** 2026-03-11
**Domain:** Windows Autopilot documentation infrastructure — reference files, templates, and canonical lookup tables
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Glossary Structure (FOUND-01)**
- Organization: Grouped by concept (Enrollment, Hardware, Network, Security, Deployment Modes) with an alphabetical index at the top for quick lookup
- Definition depth: One-liner per term — single sentence, no paragraphs
- Scope: Acronyms AND process concepts (e.g., "white glove", "device phase vs user phase", "hardware hash")
- Cross-links: "See also" links to lifecycle stage docs (Phase 2) only — NOT to individual runbooks. Runbooks link TO the glossary, not vice versa. Max ~6 stable link targets per term.

**Template and Review Metadata (FOUND-05)**
- Frontmatter format: YAML-style block at top of every doc
- Fields (4 essential): `last_verified:`, `review_by:`, `applies_to:` (APv1 | APv2 | both), `audience:` (L1 | L2 | both)
- Review cadence: 90 days
- Reviewer: Role-based ("L2 Desktop Lead"), not person names
- Version gate banner: Every doc opens with: "This guide applies to Windows Autopilot (classic). For Autopilot Device Preparation, see [disambiguation page]."
- Separate L1/L2 templates:
  - L1 template structure: Prerequisites → Steps → Escalation Criteria
  - L2 template structure: Context → Investigation → Resolution → Tool References

**PowerShell Function Reference (FOUND-04)**
- Depth per function: Synopsis + parameters + one usage example
- Safety warnings: Per-function warning callout on each of the 5 remediation functions
- Source linkage: Each entry notes the source module (.psm1 file)
- Functions to document (12 total): 7 diagnostic + 5 remediation (see full list in CONTEXT.md)

**Registry Paths Reference (FOUND-02)**
- Source: Extract from existing PowerShell modules + CLAUDE.md + research
- Format: Table with path, purpose, which functions/runbooks reference it

**Network Endpoints Reference (FOUND-03)**
- Source: Extract from Test-AutopilotConnectivity + CLAUDE.md + official Microsoft docs
- Format: Table with URL, service name, purpose, test command (PowerShell and curl)

**APv1 vs APv2 Disambiguation (FOUND-06)**
- Format: Comparison table (APv1 features vs APv2 features) + "Which guide do I use?" section
- Key distinctions: Hardware hash, ESP, pre-provisioning, hybrid join (all APv1 yes / APv2 no)

### Claude's Discretion

None explicitly listed.

### Deferred Ideas (OUT OF SCOPE)

None captured during discussion.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | Glossary of Autopilot terminology (OOBE, ESP, TPM, ZTD, APv1, APv2) accessible to both L1 and L2 | Canonical term definitions researched from official Microsoft docs; concept groupings and cross-link rules defined in CONTEXT.md |
| FOUND-02 | Registry path reference documenting all Autopilot-relevant registry locations | 5 confirmed paths from codebase + 3 additional ESP paths from official Microsoft troubleshooting docs |
| FOUND-03 | Network endpoints reference with full URL list and test commands | Complete endpoint list from official Microsoft Autopilot requirements page (verified July 2025); includes TPM-specific and diagnostic upload URLs |
| FOUND-04 | PowerShell function reference for all 12 exported diagnostic/remediation functions | All 12 functions extracted directly from .psm1 source files; synopsis, parameters, and ShouldProcess annotations documented |
| FOUND-05 | L1 and L2 document templates with "Last verified" / "Review by" frontmatter | Template structure, field names, and review cadence locked in CONTEXT.md |
| FOUND-06 | APv1 vs APv2 disambiguation page clarifying which docs apply to which mode | Official Microsoft comparison table fetched and verified; 20+ feature distinctions available |
</phase_requirements>

---

## Summary

Phase 1 is a pure documentation-authoring phase. All deliverables are Markdown files that serve as shared reference infrastructure for the 6 phases that follow. Nothing in this phase touches source code. The key challenge is completeness and accuracy of the reference content — particularly the registry paths, endpoint list, and PowerShell function documentation — because downstream phases will link to these files rather than repeat facts inline.

The PowerShell source modules (`AutopilotDiagnostics.psm1` and `AutopilotRemediation.psm1`) exist and are the authoritative source for the 12 function entries in `powershell-ref.md`. All function synopses, parameters, and behavioral notes can be extracted directly from those files with no research gaps. The registry paths and network endpoints needed for the reference files are partially covered by the codebase; research has identified the complete lists from official Microsoft documentation.

The APv1 vs APv2 disambiguation page has a strong official source: the Microsoft Learn comparison page (updated March 2026) provides a 20-row feature matrix. The glossary terms are well-understood from official docs and the existing codebase context.

**Primary recommendation:** Author all 7 files in dependency order: glossary first (other files reference its terms), then registry-paths and endpoints (referenced by runbooks in later phases), then powershell-ref (referenced by L2 runbooks), then templates (needed before any L1/L2 content in later phases), then the disambiguation page.

---

## Standard Stack

This phase has no code dependencies. All deliverables are plain Markdown files. The relevant "stack" is the documentation conventions and reference data.

### File Inventory (what gets created)

| File | Requirement | Location |
|------|-------------|----------|
| `_glossary.md` | FOUND-01 | `docs/` |
| `registry-paths.md` | FOUND-02 | `docs/reference/` |
| `endpoints.md` | FOUND-03 | `docs/reference/` |
| `powershell-ref.md` | FOUND-04 | `docs/reference/` |
| `l1-template.md` | FOUND-05 | `docs/_templates/` |
| `l2-template.md` | FOUND-05 | `docs/_templates/` |
| `apv1-vs-apv2.md` | FOUND-06 | `docs/` |

### Files NOT to create or modify

| File | Reason |
|------|--------|
| `docs/common-issues.md` | Phase 7 responsibility |
| `docs/architecture.md` | Phase 7 responsibility |
| Any `src/` file | Documentation-only phase |

---

## Architecture Patterns

### Recommended Directory Structure

```
docs/
├── _glossary.md             # FOUND-01 — alpha index + concept groups
├── apv1-vs-apv2.md          # FOUND-06 — disambiguation page
├── _templates/
│   ├── l1-template.md       # FOUND-05 — L1 doc template
│   └── l2-template.md       # FOUND-05 — L2 doc template
└── reference/
    ├── registry-paths.md    # FOUND-02 — canonical registry table
    ├── endpoints.md         # FOUND-03 — canonical endpoints table
    └── powershell-ref.md    # FOUND-04 — 12 function reference
```

### Pattern 1: Frontmatter Block (all docs)

Every doc created in this phase (and every doc created in subsequent phases using the templates) begins with this YAML-style block:

```markdown
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: APv1 | APv2 | both
audience: L1 | L2 | both
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).
```

**When to use:** Every file created in Phase 1 and all subsequent phases. Templates enforce this; the version gate banner appears below the frontmatter on every doc.

### Pattern 2: Glossary Structure

```markdown
# Autopilot Glossary

## Alphabetical Index
[ESP](#esp) | [Hardware Hash](#hardware-hash) | [OOBE](#oobe) | ...

## Enrollment
### ESP
...

## Hardware
### Hardware Hash
...
```

**Concept groups:** Enrollment, Hardware, Network, Security, Deployment Modes.
**Cross-links:** "See also" points to lifecycle stage docs only (Phase 2 files). Max 6 link targets per term.

### Pattern 3: Reference Table Format

Registry paths and endpoints use consistent table format:

```markdown
| Path / URL | Service / Purpose | Referenced By | Notes |
|-----------|-------------------|---------------|-------|
```

### Pattern 4: PowerShell Function Entry

```markdown
### FunctionName
**Module:** `AutopilotDiagnostics.psm1`
**Synopsis:** [one sentence from .SYNOPSIS block]

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|

**Example:**
```powershell
FunctionName -Param value
```

> **Safety Warning** (remediation functions only): This function modifies device state.
> Test in non-production first. Supports `-WhatIf` for dry run.
```

### Pattern 5: L1 Template Structure

```markdown
---
[frontmatter]
---
[version gate banner]

# [Issue Title]

## Prerequisites
- [What L1 needs before starting]

## Steps
1. [Action]
2. [Action]

## Escalation Criteria
- Escalate to L2 if: [condition]
```

### Pattern 6: L2 Template Structure

```markdown
---
[frontmatter]
---
[version gate banner]

# [Issue Title]

## Context
[What this is and when it occurs]

## Investigation
[How to diagnose, with tool references]

## Resolution
[Steps to fix]

## Tool References
- [Link to powershell-ref.md#function-name]
- [Link to registry-paths.md#path-name]
```

### Anti-Patterns to Avoid

- **Inline path definitions:** Never define a registry path inside a runbook. Always link to `registry-paths.md`.
- **Inline endpoint lists:** Never list required endpoints inside a runbook. Always link to `endpoints.md`.
- **Inline function documentation:** Never document a PowerShell function in a runbook. Always link to `powershell-ref.md`.
- **Person names in reviewer fields:** Use role names only ("L2 Desktop Lead") so templates don't become stale when personnel change.
- **Runbooks linking back to glossary from glossary:** Glossary links forward to lifecycle docs (Phase 2). Runbooks link to the glossary. Never circular.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| APv1 vs APv2 feature matrix | Custom comparison notes scattered in runbooks | Single `apv1-vs-apv2.md` canonical page | Microsoft's official feature comparison table is comprehensive and stable; one canonical source prevents drift |
| Registry path lookup | Repeating paths in each runbook | `docs/reference/registry-paths.md` | 5+ runbooks reference the same 8 paths; inline repetition causes divergence when paths change |
| Endpoint list | Repeating URLs in connectivity runbooks | `docs/reference/endpoints.md` | Official Microsoft endpoint list has 10+ service URLs; every runbook that tests connectivity needs the same complete list |
| Function signature docs | Repeating parameters in each runbook | `docs/reference/powershell-ref.md` | 12 functions referenced across 10+ future docs; centralized reference prevents parameter drift |
| Frontmatter validation | Custom checks in each doc | Template files in `docs/_templates/` | Templates enforce the 4 required fields consistently |

**Key insight:** Every reference file created in Phase 1 is a "don't repeat yourself" contract for the entire documentation suite. Later phases fail their goals if they inline content that belongs in a canonical reference.

---

## Reference Data: Registry Paths

Confirmed registry paths from PowerShell module source + official Microsoft ESP troubleshooting documentation.

| Registry Path | Purpose | Source Functions | Confidence |
|---------------|---------|-----------------|------------|
| `HKLM:\SOFTWARE\Microsoft\Provisioning\Diagnostics\Autopilot` | Registration state — CloudAssignedTenantId, TenantDomain, DeploymentProfileName | `Get-AutopilotRegistrationState`, `Reset-AutopilotRegistration` | HIGH (extracted from .psm1) |
| `HKLM:\SOFTWARE\Microsoft\Provisioning\AutopilotSettings` | Assigned Autopilot profile details | `Get-AutopilotProfileAssignment`, `Reset-AutopilotRegistration` | HIGH (extracted from .psm1) |
| `HKLM:\SOFTWARE\Microsoft\Enrollments` | MDM enrollment state; subkeys per enrollment GUID | `Restart-EnrollmentStatusPage`, `Remove-AutopilotDevice` | HIGH (extracted from .psm1) |
| `HKLM:\SOFTWARE\Microsoft\Enrollments\{GUID}\FirstSync` | ESP device phase completion tracking; IsServerProvisioningDone | `Restart-EnrollmentStatusPage` | HIGH (Microsoft Learn ESP troubleshoot doc) |
| `HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\MDM` | MDM sync scheduling; used to trigger EnterpriseMgmt scheduled tasks | `Restart-EnrollmentStatusPage` | HIGH (extracted from .psm1) |
| `HKLM:\SOFTWARE\Microsoft\Windows\Autopilot\EnrollmentStatusTracking` | ESP tracking info root; ESPTrackingInfo subkeys | Referenced by Phase 2+ docs | HIGH (Microsoft Learn ESP troubleshoot doc) |
| `HKLM:\SOFTWARE\Microsoft\Windows\Autopilot\EnrollmentStatusTracking\ESPTrackingInfo\Diagnostics\ExpectedPolicies` | Policies expected to apply during ESP device phase | L2 ESP investigation | MEDIUM (Microsoft Learn ESP troubleshoot doc) |
| `HKLM:\SOFTWARE\Microsoft\Windows\Autopilot\EnrollmentStatusTracking\ESPTrackingInfo\Diagnostics\Sidecar` | Win32 app installation status during ESP | L2 ESP investigation | MEDIUM (Microsoft Learn ESP troubleshoot doc) |

---

## Reference Data: Network Endpoints

Complete endpoint list from official Microsoft Autopilot requirements page (last updated July 2025, confirmed current as of February 2026).

### Required Endpoints (must not be blocked)

| URL / Pattern | Service | Purpose | Criticality |
|--------------|---------|---------|-------------|
| `https://ztd.dds.microsoft.com` | Autopilot Deployment Service | Device registration lookup; ZTD profile download | Critical — blocks deployment if unavailable |
| `https://cs.dds.microsoft.com` | Autopilot Configuration Service | Configuration data for deployment service | Critical |
| `https://login.live.com` | Windows Activation | Device activation during OOBE | Critical |
| `https://login.microsoftonline.com` | Microsoft Entra ID | User credential validation; device join | Critical |
| `https://graph.microsoft.com` | Microsoft Graph API | Intune device management queries | Critical |
| `https://enrollment.manage.microsoft.com` | Intune Enrollment | MDM enrollment initiation | Critical |
| `lgmsapeweu.blob.core.windows.net` | Autopilot Diagnostics Upload | Automatic diagnostic data upload from client | Non-critical (process continues if blocked) |
| `*.msftconnecttest.com` | NCSI (Network Connection Status) | Internet connectivity detection | Non-critical (process continues if blocked) |
| `*.microsoftaik.azure.net` | TPM Attestation | TPM certificate validation for self-deploying and pre-provisioning | Required for self-deploy/pre-provision only |
| `https://ekop.intel.com/ekcertservice` | Intel Firmware TPM | EK certificate retrieval (Intel firmware TPM only) | Required if using Intel firmware TPM |
| `https://ekcert.spserv.microsoft.com/EKCertificate/GetEKCertificate/v1` | Qualcomm Firmware TPM | EK certificate retrieval (Qualcomm firmware TPM only) | Required if using Qualcomm firmware TPM |
| `https://ftpm.amd.com/pki/aia` | AMD Firmware TPM | EK certificate retrieval (AMD firmware TPM only) | Required if using AMD firmware TPM |
| `time.windows.com` UDP/123 | NTP | Clock synchronization; certificate validation depends on correct time | Critical |

### Test Commands

PowerShell:
```powershell
# Test-AutopilotConnectivity (covers the 5 core endpoints)
Test-AutopilotConnectivity

# Manual single-endpoint test
Invoke-WebRequest -Uri "https://ztd.dds.microsoft.com" -UseBasicParsing -TimeoutSec 5

# Test NTP
w32tm /stripchart /computer:time.windows.com /samples:3
```

Curl (for use when PowerShell is not available):
```bash
curl -v --max-time 5 https://ztd.dds.microsoft.com
curl -v --max-time 5 https://cs.dds.microsoft.com
```

---

## Reference Data: APv1 vs APv2 Feature Comparison

From official Microsoft Learn comparison page (https://learn.microsoft.com/en-us/autopilot/device-preparation/compare), updated April 2025, current as of March 2026.

| Feature | APv1 (Windows Autopilot) | APv2 (Device Preparation) |
|---------|--------------------------|--------------------------|
| Hardware hash registration required | Yes | No |
| Enrollment Status Page (ESP) | Yes (configured separately) | No (integrated into policy) |
| Pre-provisioning (white glove) | Yes | No |
| Self-deploying mode | Yes | No |
| Hybrid Entra join | Yes | No |
| Windows 10 support | Yes | No (Windows 11 only, 22H2+) |
| User-driven mode | Yes | Yes |
| Automatic deployment | No | Yes |
| Microsoft Entra join | Yes | Yes |
| GCCH / DoD environments | No | Yes |
| Win32 + LOB apps in same deployment | No | Yes |
| Near real-time monitoring | No | Yes |
| Max apps during OOBE | 100 | 25 |
| Device naming template | Yes | Yes (as of 2025) |
| Autopilot Reset support | Yes | No |
| HoloLens support | Yes | No |
| Teams Meeting Room support | Yes | No |
| Simpler admin configuration | No | Yes |
| Extensive OOBE customization | Yes | No |
| Blocks desktop until user config applied | Yes | No |

**Decision guide for disambiguation page:** Use APv1 if you need pre-provisioning, hybrid join, self-deploying, or Windows 10. Use APv2 if you want no hardware hash pre-staging, GCCH/DoD support, or need Win32+LOB in same deployment. Both cannot run on same device simultaneously; APv1 profile takes precedence.

---

## Reference Data: Glossary Term Candidates

Confirmed terms for `_glossary.md` organized by concept group. All definitions sourced from official Microsoft docs and codebase context.

### Enrollment Group
| Term | One-liner definition |
|------|---------------------|
| OOBE | Out-of-Box Experience — the first-run setup screens a device presents after power-on, before a user profile exists. |
| ESP | Enrollment Status Page — the progress screen during Autopilot provisioning that blocks desktop access until required apps and policies are applied (APv1 only). |
| MDM | Mobile Device Management — the protocol and service (Intune) used to push policies, apps, and configuration to enrolled devices. |
| MDM enrollment | The process by which a device registers itself with the MDM service and begins receiving policies. |
| FirstSync | The ESP device-phase checkpoint tracked at `HKLM:\...\Enrollments\{GUID}\FirstSync` that signals server provisioning is complete. |
| Autopilot Reset | An APv1 feature that re-runs the OOBE provisioning flow on an already-deployed device without re-imaging. |

### Hardware Group
| Term | One-liner definition |
|------|---------------------|
| Hardware hash | A 4K-byte device fingerprint derived from hardware identifiers, used by APv1 to match a physical device to its Autopilot profile before OOBE. |
| ZTD | Zero Touch Deployment — Microsoft's internal codename for Windows Autopilot; also the prefix for the deployment service endpoint (`ztd.dds.microsoft.com`) and device identifier (ZTDID). |
| ZTDID | Zero Touch Device ID — the unique identifier assigned to a device when it is registered in the Autopilot service. |
| TPM | Trusted Platform Module — the hardware security chip that stores cryptographic keys and performs attestation; required for self-deploying and pre-provisioning modes. |
| TPM attestation | The process by which a device proves its TPM identity to Microsoft's attestation service during pre-provisioning. |
| Firmware TPM (fTPM) | A TPM implemented in processor firmware (Intel, AMD, Qualcomm) rather than a discrete chip; requires manufacturer certificate retrieval on first use. |

### Network Group
| Term | One-liner definition |
|------|---------------------|
| WinHTTP proxy | The system-level HTTP proxy configuration used by Windows services during OOBE (before user-level proxy settings apply). |
| NCSI | Network Connection Status Indicator — the Windows component that tests internet reachability via `*.msftconnecttest.com`. |

### Security Group
| Term | One-liner definition |
|------|---------------------|
| Secure Boot | A UEFI firmware feature that verifies the bootloader's digital signature, required for TPM attestation. |
| SCP | Service Connection Point — an Active Directory object that tells Azure AD Connect which tenant to use for hybrid join. |

### Deployment Modes Group
| Term | One-liner definition |
|------|---------------------|
| APv1 | Windows Autopilot (classic) — the original deployment framework requiring hardware hash pre-staging and supporting all deployment modes. |
| APv2 | Windows Autopilot Device Preparation — the newer framework (Windows 11 22H2+) that removes hardware hash requirements and simplifies provisioning. |
| User-driven mode | An Autopilot deployment mode where the end user signs in with their Azure AD credentials during OOBE to trigger provisioning. |
| Self-deploying mode | An APv1 deployment mode for userless devices (kiosks, shared devices) that provisions using TPM attestation with no user interaction. |
| Pre-provisioning | An APv1 deployment mode (formerly "white glove") where a technician or OEM pre-stages device-side provisioning before shipping to the end user. |
| White glove | The deprecated name for pre-provisioning; renamed in 2021. |
| Hybrid join | An Azure AD join type where the device is simultaneously joined to on-premises Active Directory and registered in Azure AD. |
| ODJ | Offline Domain Join — the mechanism used during hybrid Autopilot to join a device to on-premises AD without requiring direct DC connectivity during OOBE. |
| Device phase | The first half of ESP that applies device-targeted apps and policies before any user logs in. |
| User phase | The second half of ESP (after user login) that applies user-targeted apps and policies. |

---

## Reference Data: PowerShell Function Signatures

Extracted directly from source modules. Authoritative — do not infer from CLAUDE.md alone.

### Diagnostic Functions (AutopilotDiagnostics.psm1)

| Function | Synopsis | Parameters | Returns |
|----------|---------|------------|---------|
| `Get-AutopilotDeviceStatus` | Gets comprehensive device state snapshot | None | Hashtable: SerialNumber, HardwareHash, RegistrationState, ProfileAssignment, TPMStatus, NetworkConnectivity |
| `Get-AutopilotHardwareHash` | Retrieves device hardware hash via CIM | None | String (DeviceHardwareData) or null |
| `Get-AutopilotRegistrationState` | Checks Autopilot registration from registry | None | Hashtable: IsRegistered, CloudAssignedTenantId, CloudAssignedTenantDomain, DeploymentProfileName |
| `Get-AutopilotProfileAssignment` | Gets assigned Autopilot profile details from registry | None | Registry property object or null |
| `Get-TPMStatus` | Checks TPM status and attestation capability | None | Hashtable: TpmPresent, TpmReady, TpmEnabled, TpmActivated, TpmOwned |
| `Test-AutopilotConnectivity` | Tests connectivity to 5 required Autopilot endpoints | None | Hashtable: URL → "Reachable (Status: NNN)" or "Failed: message" |
| `Get-AutopilotLogs` | Collects MDM diagnostics and Event Viewer logs | `-OutputPath` [string, default `$env:TEMP\AutopilotLogs`] | String (output path) |

### Remediation Functions (AutopilotRemediation.psm1)

All remediation functions support `-WhatIf` via `SupportsShouldProcess` (except `Repair-AutopilotConnectivity`).

| Function | Synopsis | Parameters | ShouldProcess | What it modifies |
|----------|---------|------------|--------------|-----------------|
| `Reset-AutopilotRegistration` | Clears and re-registers device for Autopilot | `-Force` [switch] | Yes | Removes `Diagnostics\Autopilot` and `AutopilotSettings` registry keys |
| `Reset-TPMForAutopilot` | Clears TPM and prepares for re-attestation | None | Yes | Calls `Clear-Tpm -Force` |
| `Repair-AutopilotConnectivity` | Fixes network issues blocking Autopilot | None | No | Resets WinHTTP proxy, flushes DNS, resets Winsock |
| `Restart-EnrollmentStatusPage` | Restarts enrollment process for stuck ESP | None | Yes | Stops EnrollmentUX process; removes FirstSync keys; triggers EnterpriseMgmt scheduled tasks |
| `Remove-AutopilotDevice` | Removes device from Autopilot completely | `-IncludeMDM` [switch] | Yes | Calls `Reset-AutopilotRegistration`; optionally removes all enrollment keys |

### Event Log Sources (from Get-AutopilotLogs)

| Log Name | Purpose |
|----------|---------|
| `Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin` | MDM enrollment and policy application events |
| `Microsoft-Windows-Provisioning-Diagnostics-Provider/Admin` | Autopilot provisioning flow events |
| `Microsoft-Windows-AAD/Operational` | Azure AD join and authentication events |
| `Microsoft-Windows-User Device Registration/Admin` | Device registration events |

---

## Common Pitfalls

### Pitfall 1: Missing `docs/reference/` directory

**What goes wrong:** Planner creates tasks for `registry-paths.md` and `endpoints.md` without accounting for the `reference/` subdirectory not existing.
**Why it happens:** The `docs/` directory currently has only two files (`architecture.md`, `common-issues.md`) and no subdirectories.
**How to avoid:** Wave 0 must create `docs/reference/` and `docs/_templates/` directories before authoring tasks run.
**Warning signs:** Task creates file at `docs/registry-paths.md` instead of `docs/reference/registry-paths.md`.

### Pitfall 2: Incomplete endpoint list — codebase only has 5 of 13+ required endpoints

**What goes wrong:** `endpoints.md` is seeded only from `Test-AutopilotConnectivity` source (5 endpoints), missing TPM attestation URLs, NTP, NCSI, and diagnostic upload endpoint.
**Why it happens:** The PowerShell function tests only the core 5 enrollment endpoints; the full requirements list is in Microsoft Learn documentation.
**How to avoid:** `endpoints.md` must be authored from the research data in this document, not from the PowerShell source alone.
**Warning signs:** `endpoints.md` table has exactly 5 rows.

### Pitfall 3: Repair-AutopilotConnectivity lacks ShouldProcess

**What goes wrong:** `powershell-ref.md` marks all 5 remediation functions with the safety warning, but `Repair-AutopilotConnectivity` does not actually have `SupportsShouldProcess` in the source.
**Why it happens:** The function modifies system state (proxy, DNS, Winsock) but was not written with `SupportsShouldProcess`.
**How to avoid:** The safety warning for `Repair-AutopilotConnectivity` should note it modifies network state but does NOT support `-WhatIf`. The other 4 remediation functions do support `-WhatIf`.
**Warning signs:** Reference doc states `Repair-AutopilotConnectivity -WhatIf` is supported.

### Pitfall 4: White glove terminology

**What goes wrong:** Glossary and reference docs use "white glove" as the primary term.
**Why it happens:** The term is still widely used in the community and in older Microsoft documentation.
**How to avoid:** Primary term in the glossary should be "pre-provisioning" with a cross-reference entry under "white glove" pointing to it. Microsoft officially renamed the feature in 2021.
**Warning signs:** Glossary has an entry titled "White Glove" with no note about the rename.

### Pitfall 5: `Remove-AutopilotDevice` confusion — `-IncludeMDM` is undocumented in CLAUDE.md

**What goes wrong:** powershell-ref.md documents only the existence of the function but omits the `-IncludeMDM` switch, which is the critical decision point for whether enrollment keys are also removed.
**Why it happens:** CLAUDE.md describes the function by name only; the parameter is only visible in the .psm1 source.
**How to avoid:** Extract all parameters from source, not from CLAUDE.md. The `-IncludeMDM` switch is significant and must be documented.

### Pitfall 6: `docs/_templates/` is a non-standard directory name

**What goes wrong:** Tooling or conventions treat `_` prefix as "private" and exclude from navigation.
**Why it happens:** Some static site generators (Jekyll, MkDocs) treat underscore-prefixed directories as excluded from builds.
**How to avoid:** This is acceptable for Phase 1 because there is no MkDocs site yet (TOOL-03 is a v2 requirement). If MkDocs is added in a future phase, the `_templates/` exclusion behavior may need to be configured. Document this as a known future consideration.

---

## Code Examples

### Frontmatter Block (verified pattern from CONTEXT.md decisions)

```markdown
---
last_verified: 2026-03-11
review_by: 2026-06-09
applies_to: APv1
audience: L1
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).
```

### PowerShell Function Entry (verified from .psm1 source)

```markdown
### Get-AutopilotRegistrationState
**Module:** `AutopilotDiagnostics.psm1`
**Synopsis:** Checks Autopilot registration state from registry and WMI.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| (none) | — | — | — |

**Returns:** Hashtable with `IsRegistered` (bool), `CloudAssignedTenantId`, `CloudAssignedTenantDomain`, `DeploymentProfileName`. Returns `@{ IsRegistered = $false }` if registry key absent.

**Example:**
```powershell
$state = Get-AutopilotRegistrationState
if ($state.IsRegistered) {
    Write-Output "Tenant: $($state.CloudAssignedTenantDomain)"
}
```
```

### Registry Table Row (pattern for registry-paths.md)

```markdown
| `HKLM:\SOFTWARE\Microsoft\Provisioning\Diagnostics\Autopilot` | Registration state (TenantId, TenantDomain, ProfileName) | `Get-AutopilotRegistrationState`, `Reset-AutopilotRegistration` |
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| "White glove" pre-provisioning terminology | "Pre-provisioning" (renamed) | 2021 | Glossary must use pre-provisioning as primary term |
| Hardware hash required for all Autopilot | APv2 removes hardware hash requirement | 2024 (GA for Windows 11 22H2+) | Disambiguation page is essential; L1 agents may follow wrong path |
| Single ESP phase | Device phase + User phase (separate registry tracking) | Long-standing, but now well-documented | ESP reference doc needs both phases |
| Autopilot deployment report (batch, non-realtime) | APv2 has near-realtime deployment reports | 2024 | Note in disambiguation page |

**Deprecated / outdated:**
- "White glove": Replaced by "pre-provisioning" in all official docs since 2021. Still in community use; glossary must cross-reference.
- APv1 as the only option: APv2 is now a viable alternative for cloud-native Windows 11 deployments. All Phase 1 reference docs must apply the APv1/APv2 distinction.

---

## Open Questions

1. **Are there additional registry paths in the PowerShell modules not yet identified?**
   - What we know: 8 paths confirmed from codebase + official docs
   - What's unclear: There may be additional paths referenced in the backend `main.py` or frontend that feed into the tools but were not surfaced in the PowerShell modules
   - Recommendation: Planner should add a task to scan `src/backend/main.py` for any registry path strings before finalizing `registry-paths.md`

2. **Which terms from later phases (ERRC, L1DT) should be included in the glossary at Phase 1?**
   - What we know: The glossary is created in Phase 1 but referenced by Phases 2-7
   - What's unclear: Terms like error-code-specific acronyms (e.g., 0x8004FE33 meaning) may need to be added as Phase 3 runs
   - Recommendation: Phase 1 glossary covers structural/process terms only. Later phases can add terms via a defined extension pattern. Document this in the glossary file header.

3. **`Repair-AutopilotConnectivity` missing ShouldProcess — intentional or oversight?**
   - What we know: 4 of 5 remediation functions have `SupportsShouldProcess`; `Repair-AutopilotConnectivity` does not
   - What's unclear: Whether this is an intentional design choice or a gap
   - Recommendation: Document accurately in `powershell-ref.md` ("does not support -WhatIf"); flag as a potential code quality issue for a future code phase

---

## Validation Architecture

The `.planning/config.json` does not contain `workflow.nyquist_validation: false` (the key is absent), so this section is included.

### Test Framework

This phase produces only Markdown documentation files. There are no code artifacts to test with a conventional test framework. "Validation" for this phase is structural correctness of the documentation.

| Property | Value |
|----------|-------|
| Framework | Manual review + structural checklist |
| Config file | None |
| Quick run command | `ls docs/_glossary.md docs/apv1-vs-apv2.md docs/reference/ docs/_templates/` |
| Full suite command | Verify all 7 files exist with correct frontmatter fields |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Verification Method | File Exists? |
|--------|----------|-----------|--------------------|----|
| FOUND-01 | `_glossary.md` exists with alphabetical index and 5 concept groups | structural | File present + grep for `## Alphabetical Index` | Wave 0 creates |
| FOUND-01 | At least 20 terms defined, each one-liner only | structural | Manual review — no term entry spans more than one sentence | Wave 0 creates |
| FOUND-02 | `registry-paths.md` exists with all 8 confirmed paths | structural | File present + row count ≥ 8 | Wave 0 creates |
| FOUND-03 | `endpoints.md` exists with all 13 service entries | structural | File present + row count ≥ 13 | Wave 0 creates |
| FOUND-03 | Each endpoint has test command | structural | Manual review — no endpoint row missing test command | Wave 0 creates |
| FOUND-04 | `powershell-ref.md` exists with all 12 functions | structural | File present + exactly 12 `###` function heading entries | Wave 0 creates |
| FOUND-04 | Each remediation function has safety warning | structural | Manual review — 4 functions (Reset-Autopilot, Reset-TPM, Restart-ESP, Remove-Device) have warning callout | Wave 0 creates |
| FOUND-05 | `l1-template.md` exists with Prerequisites/Steps/Escalation sections | structural | File present + grep for `## Prerequisites`, `## Steps`, `## Escalation Criteria` | Wave 0 creates |
| FOUND-05 | `l2-template.md` exists with Context/Investigation/Resolution/Tool sections | structural | File present + grep for `## Context`, `## Investigation`, `## Resolution`, `## Tool References` | Wave 0 creates |
| FOUND-05 | Both templates contain all 4 required frontmatter fields | structural | Grep for `last_verified:`, `review_by:`, `applies_to:`, `audience:` in each template | Wave 0 creates |
| FOUND-06 | `apv1-vs-apv2.md` exists with comparison table and decision guide | structural | File present + grep for comparison table header | Wave 0 creates |

### Wave 0 Gaps

- [ ] `docs/reference/` directory does not exist — must be created before reference files
- [ ] `docs/_templates/` directory does not exist — must be created before template files
- [ ] No automated test runner needed — all validation is structural file inspection

---

## Sources

### Primary (HIGH confidence)
- `D:\claude\Autopilot\src\powershell\AutopilotDiagnostics.psm1` — All 7 diagnostic function signatures, parameters, registry paths, event log names, endpoint list
- `D:\claude\Autopilot\src\powershell\AutopilotRemediation.psm1` — All 5 remediation function signatures, ShouldProcess behavior, registry modifications
- [Microsoft Learn: Windows Autopilot requirements](https://learn.microsoft.com/en-us/autopilot/requirements) — Complete network endpoints list, updated July 2025, confirmed current February 2026
- [Microsoft Learn: Compare Windows Autopilot device preparation and Windows Autopilot](https://learn.microsoft.com/en-us/autopilot/device-preparation/compare) — Official APv1 vs APv2 feature comparison table, updated April 2025, confirmed current March 2026

### Secondary (MEDIUM confidence)
- [Microsoft Learn: Troubleshoot the Enrollment Status Page](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-enrollment/understand-troubleshoot-esp) — ESP registry paths (`EnrollmentStatusTracking`, `FirstSync` subkeys)
- `D:\claude\Autopilot\CLAUDE.md` — Project-specific registry paths and endpoint overview (cross-verified against .psm1 source)

### Tertiary (LOW confidence)
- None — all claims in this document are verified against HIGH or MEDIUM sources.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — this phase has no code dependencies; all file formats are plain Markdown
- Architecture: HIGH — file locations and structure locked in CONTEXT.md; directory structure confirmed against existing `docs/` layout
- Registry paths: HIGH (codebase-sourced) / MEDIUM (ESP paths from Microsoft Learn troubleshooting docs)
- Network endpoints: HIGH — verified from official Microsoft requirements page (July 2025)
- PowerShell function signatures: HIGH — extracted directly from .psm1 source files
- APv1 vs APv2 comparison: HIGH — verified from official Microsoft Learn comparison page (April 2025)
- Glossary term definitions: HIGH — sourced from official Microsoft documentation and codebase
- Pitfalls: HIGH — derived from direct source inspection (ShouldProcess gap, parameter gaps, directory gaps)

**Research date:** 2026-03-11
**Valid until:** 2026-06-11 (90 days — stable domain; endpoint list changes infrequently, APv2 feature set is evolving but comparison table is authoritative)
