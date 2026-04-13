# Phase 15: APv2 Admin Setup Guides - Research

**Researched:** 2026-04-12
**Domain:** Windows Autopilot Device Preparation (APv2) — admin configuration documentation
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Multi-file per admin task in `docs/admin-setup-apv2/` directory, following established project pattern.
- **D-02:** File structure:
  - `00-overview.md` — Sequencer/index file with complete setup path in order and "Next step" links.
  - `01-prerequisites-rbac.md` — APv2 prerequisites verification AND custom RBAC role creation (5 permission categories). APv1 deregistration is the FIRST prerequisite.
  - `02-etg-device-group.md` — ETG device group creation with 4-item checklist, Intune Provisioning Client AppID, and PowerShell procedure.
  - `03-device-preparation-policy.md` — Device Preparation policy configuration with per-setting "what breaks" callouts.
  - `04-corporate-identifiers.md` — Corporate identifier setup with enrollment restriction interaction subsection.
- **D-03:** Every file includes "Next step: [link to next file]" footer.
- **D-04:** Full PowerShell procedure for Intune Provisioning Client ETG ownership presented **inline and visible** — no collapsible blocks.
- **D-05:** ETG section contains: (1) 4-item checklist with AppID `f1346770-5b25-470b-88bd-d5744ab7952c`, (2) full PowerShell code block (Connect-MgGraph + Get-MgServicePrincipal/New-MgServicePrincipal + group ownership), (3) verification steps, (4) "what breaks" callout. All visible by default.
- **D-06:** Collapsible `<details>` blocks reserved for supplementary L2 content only. NOT for primary admin procedural content.
- **D-07:** Admin template dual-layer pattern: inline "what breaks if misconfigured" callouts (3 elements: admin sees / end user sees / L1 runbook link) PLUS Configuration-Caused Failures reverse-lookup table at end of each file.
- **D-08:** Callouts reference the setting's own step for fix context. L1 runbook links go to the whole runbook file.
- **D-09:** Configuration-Caused Failures table in each file covers only that file's settings.
- **D-10:** `04-corporate-identifiers.md` includes corporate identifier setup steps (supported types, how to add), verification, AND a substantive enrollment restriction interaction subsection.
- **D-11:** Enrollment restriction subsection scoped to APv2-relevant interactions only.
- **D-12:** Entra ID Local Administrator settings conflict — valid combinations table must be re-pulled from the live Microsoft known issues page at authoring time.
- **D-13:** All files use `applies_to: APv2`, `audience: admin` frontmatter with `last_verified` and `review_by` (90-day cycle).
- **D-14:** Version gate blockquote header on every file: "This guide covers Autopilot Device Preparation (APv2). For APv1 (classic), see [link]." Plus "See also" footer linking to lifecycle-apv2 docs, comparison page, and relevant L1 runbooks.
- **D-15:** Prerequisites file links back to `docs/lifecycle-apv2/01-prerequisites.md` to avoid duplication — Phase 15 prerequisites focus on admin configuration prerequisites (RBAC, licensing), not device-level prerequisites.

### Claude's Discretion

- Exact file numbering within `docs/admin-setup-apv2/`
- Exact wording of "what breaks" callouts (as long as they include all 3 template-required elements)
- PowerShell code style and comments in the ETG procedure
- Number of entries in Configuration-Caused Failures tables per file
- Whether `00-overview.md` includes a visual Mermaid setup flow diagram (optional)
- Exact structure of enrollment restriction conflict precedence rules in `04-corporate-identifiers.md`

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ASET-01 | Admin can follow step-by-step APv2 setup guide (prerequisites through Device Preparation policy) | Sequential 7-step workflow documented in official tutorial; each step has verified portal navigation paths |
| ASET-02 | Admin can configure ETG device group with correct Intune Provisioning Client ownership | Full PowerShell procedure with exact cmdlets verified from official Microsoft Learn tutorial; AppID f1346770-5b25-470b-88bd-d5744ab7952c confirmed; tenant name variation (Intune Autopilot ConfidentialClient) confirmed |
| ASET-03 | Admin can diagnose APv2 setup mistakes using per-setting troubleshooting guidance | All Device Preparation policy settings documented with misconfiguration consequences; 4 L1 runbooks exist as link targets; error-codes catalog provides cross-reference |
| ASET-04 | Admin can create custom RBAC role for APv2 administration with all five required permission categories | All 5 permission categories with exact permission names verified from official requirements page; step-by-step Intune portal procedure confirmed |
| ASET-05 | Admin can configure corporate identifiers for enrollment restriction scenarios with conflict behavior documented | Supported identifier types confirmed; portal procedure verified; enrollment restriction interaction table documented; APv2-specific behavior (blocked by personal enrollment restriction) verified |
</phase_requirements>

## Summary

Phase 15 produces five Markdown documentation files in a new `docs/admin-setup-apv2/` directory. The content domain is well-defined and exhaustively covered by official Microsoft Learn documentation updated as recently as April 10, 2026. All critical technical specifics — RBAC permissions, PowerShell cmdlets, ETG AppID, Device Preparation policy settings, corporate identifier types, and the Entra ID Local Administrator conflict valid combinations — are available from HIGH-confidence official sources.

The existing project codebase provides a complete reuse foundation: `docs/_templates/admin-template.md` is the direct template for all five files; Phase 11 files demonstrate the exact frontmatter, version gate blockquote, "See also" footer, and Mermaid diagram patterns; Phase 13 L1 runbooks (06 through 09) are the link targets for all "what breaks" callouts; and the error-codes catalog at `docs/error-codes/06-apv2-device-preparation.md` provides cross-reference material. The planner does not need to design any patterns from scratch — every structural element already exists in the project.

One active known issue requires attention: the Entra ID Local Administrator settings / User account type conflict has 5 valid combinations documented on the known issues page (verified April 10, 2026). This known issue is still active (not marked resolved) and must be included in the `03-device-preparation-policy.md` "what breaks" callout for the User account type setting. The valid combinations have been captured in this research document so the implementer can author the file without re-fetching the page.

**Primary recommendation:** All five files follow the admin template directly; the 7-step Microsoft tutorial is the authoritative setup sequence; use existing Phase 11-14 files as style references for every formatting decision.

## Standard Stack

This phase produces documentation files — no software library stack applies. The relevant technical content domains are:

### Content Sources (verified HIGH confidence)

| Source | URL | Last Updated | What It Provides |
|--------|-----|--------------|-----------------|
| APv2 Requirements (RBAC, Licensing, Software, Config) | https://learn.microsoft.com/en-us/autopilot/device-preparation/requirements | 2026-04-07 | All 5 RBAC permissions; licensing; OS versions; config prerequisites |
| APv2 Tutorial Step 3 — ETG Device Group | https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-device-group | 2026-02-05 | ETG group creation; AppID; PowerShell cmdlets; service principal name variant |
| APv2 Tutorial Step 5 — Assign Apps/Scripts | https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-assign-apps-scripts | 2026-04-07 | App types; System context requirement; assignment verification steps |
| APv2 Tutorial Step 6 — Device Preparation Policy | https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-autopilot-policy | 2026-04-10 | All policy settings; timeout range; app/script limits; policy priority mechanism |
| APv2 Tutorial Step 7 — Corporate Identifiers | https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-corporate-identifier | 2026-04-07 | When required; link to add-corporate-identifiers |
| Add Corporate Identifiers (Intune) | https://learn.microsoft.com/en-us/intune/intune-service/enrollment/corporate-identifiers-add | 2026-04-09 | Windows identifier types; CSV format; portal steps; enrollment type ownership table |
| APv2 Known Issues | https://learn.microsoft.com/en-us/autopilot/device-preparation/known-issues | 2026-04-10 | Entra ID Local Admin conflict + 5 valid combinations; Managed Installer resolved; other active issues |
| APv2 Tutorial Workflow Overview | https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-workflow | 2026-02-05 | 7-step setup sequence; process summary |

### Existing Project Assets (reuse directly)

| Asset | Path | What to Reuse |
|-------|------|---------------|
| Admin template | `docs/_templates/admin-template.md` | Copy for all 5 files; fill in placeholders |
| ETG explanation | `docs/lifecycle-apv2/00-overview.md` | ETG overview paragraph; AppID citation |
| Prerequisites (device-level) | `docs/lifecycle-apv2/01-prerequisites.md` | Link target from `01-prerequisites-rbac.md` to avoid duplication |
| Deployment flow step numbers | `docs/lifecycle-apv2/02-deployment-flow.md` | Step references in "what breaks" consequences |
| L1 runbook: deployment not launched | `docs/l1-runbooks/06-apv2-deployment-not-launched.md` | Link target for ETG and policy misconfiguration callouts |
| L1 runbook: apps not installed | `docs/l1-runbooks/07-apv2-apps-not-installed.md` | Link target for app assignment and install context callouts |
| L1 runbook: APv1 conflict | `docs/l1-runbooks/08-apv2-apv1-conflict.md` | Link target for APv1 deregistration prerequisite callout |
| L1 runbook: deployment timeout | `docs/l1-runbooks/09-apv2-deployment-timeout.md` | Link target for timeout setting misconfiguration callout |
| APv2 failure catalog | `docs/error-codes/06-apv2-device-preparation.md` | Cross-reference for "what breaks" entries |
| APv1 vs APv2 comparison | `docs/apv1-vs-apv2.md` | "See also" footer link in all 5 files |

## Architecture Patterns

### Required Project Structure

```
docs/
└── admin-setup-apv2/              # New directory (Phase 15 creates it)
    ├── 00-overview.md             # Index/sequencer with numbered setup path and "Next step" links
    ├── 01-prerequisites-rbac.md   # Prerequisites (APv1 deregister first) + RBAC role creation
    ├── 02-etg-device-group.md     # ETG group setup with 4-item checklist + inline PowerShell
    ├── 03-device-preparation-policy.md  # Policy creation with per-setting "what breaks" callouts
    └── 04-corporate-identifiers.md     # Corporate identifiers + enrollment restriction interaction
```

### Pattern 1: Admin Template Structure (mandatory for all 5 files)

**What:** Every file follows the `docs/_templates/admin-template.md` structure exactly.

**Structure:**
```markdown
---
last_verified: 2026-04-12
review_by: 2026-07-11
applies_to: APv2
audience: admin
---

> **Version gate:** This guide covers Autopilot Device Preparation (APv2).
> For Windows Autopilot (classic), see [APv1 Admin Setup Guides](../admin-setup-apv1/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# [File Title]

## Prerequisites
[Prerequisites section]

## Steps
[Numbered steps with "what breaks" callouts per configurable setting]

## Verification
[Checklist of verification steps]

## Configuration-Caused Failures
[Reverse-lookup table: Misconfiguration | Symptom | Runbook]

## See Also
[Links to lifecycle-apv2 docs, comparison page, L1 runbooks]

---
*Next step: [Link to next file in sequence]*
```

**When to use:** All 5 Phase 15 files without exception.

### Pattern 2: "What Breaks" Callout (3 required elements)

**What:** Every configurable setting gets an inline callout with exactly 3 elements.

**Example structure:**
```markdown
> **What breaks if misconfigured:** **Admin sees:** [what appears in portal/report].
> **End user sees:** [what happens on the device during OOBE].
> **Runbook:** [L1 Runbook Title](../l1-runbooks/XX-filename.md)
```

**When to use:** Immediately after each configurable setting in the Steps section. Required for every setting — not optional.

### Pattern 3: Configuration-Caused Failures Table (end of each file)

**What:** Reverse-lookup table at the end of each file covering only that file's settings.

**Structure:**
```markdown
## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| [Setting X wrong value] | [Admin/user observable result] | [Link] |
```

**When to use:** End of every file. Scope limited to settings configured in that file.

### Pattern 4: Sequential Navigation Footer

**What:** Every file ends with a "Next step" link to the next file.

**Example:**
```markdown
---
*Next step: [Configure ETG Device Group](02-etg-device-group.md)*
```

**00-overview.md** serves as the entry point if an admin arrives at any file — it lists all 5 files in order with a brief description of each.

### Pattern 5: Inline PowerShell (ETG file only)

**What:** Full PowerShell procedure visible in the body of `02-etg-device-group.md`, not in a `<details>` block.

**When to use:** The ETG file specifically. This is a project rule exception — `<details>` blocks are reserved for supplementary L2 content only, but PowerShell is primary admin content here per D-04/D-05.

### Anti-Patterns to Avoid

- **Collapsible primary content:** Do not put the ETG PowerShell, RBAC steps, or any primary admin procedure inside `<details>` blocks. Reserved for L2 supplementary content only (project rule per D-06).
- **Monolithic guide:** Do not consolidate all ASET requirements into one file. Five separate files per D-02.
- **Duplicating device-level prerequisites:** `01-prerequisites-rbac.md` links to `docs/lifecycle-apv2/01-prerequisites.md` rather than repeating device OS, networking, and licensing prerequisites already documented there. Phase 15 prerequisites cover admin-level prerequisites only (RBAC, APv1 deregistration check).
- **Missing the 3-element callout:** Callouts with only a symptom description and no runbook link fail the template requirement.
- **Cross-file Configuration-Caused Failures tables:** Each file's table covers only its own settings.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Admin template format | Custom structure | `docs/_templates/admin-template.md` | Template already encodes dual-layer pattern, frontmatter, version gate |
| ETG explanation | Write new ETG copy | Reference/link to `docs/lifecycle-apv2/00-overview.md` | Already written in Phase 11 |
| Device-level prerequisites | Duplicate prerequisites | Link to `docs/lifecycle-apv2/01-prerequisites.md` | Already written in Phase 11; D-15 prohibits duplication |
| "What breaks" link targets | New runbook stubs | Link to existing L1 runbooks 06-09 | All four target runbooks exist on disk from Phase 13 |
| PowerShell for service principal | Custom cmdlet research | Use exact cmdlets from official tutorial | `New-MgServicePrincipal`, `Connect-MgGraph -Scopes "Application.ReadWrite.All"` verified from official source |

**Key insight:** The majority of Phase 15 content is assembly work — pulling verified technical specifics from official sources into the admin template structure. No novel documentation patterns need to be invented.

## Common Pitfalls

### Pitfall 1: ETG Group Type

**What goes wrong:** Admin creates a dynamic group instead of an assigned security group.
**Why it happens:** Dynamic groups are more common for Intune targeting; the ETG requirement for an assigned group is a specific APv2 requirement.
**How to avoid:** The `02-etg-device-group.md` guide must state the group type requirement (assigned security group) before the creation steps begin, not buried in a note after.
**Warning signs:** If the policy shows "0 groups assigned" even after correct setup — this was a known issue resolved in July 2024 but worth noting as a workaround scenario.

### Pitfall 2: Intune Provisioning Client Not Available as Owner

**What goes wrong:** Admin searches for "Intune Provisioning Client" in the Add owners pane and finds nothing.
**Why it happens:** The service principal may not exist in the tenant yet, or the tenant displays it as "Intune Autopilot ConfidentialClient."
**How to avoid:** The `02-etg-device-group.md` guide must document both the name variant AND the PowerShell procedure to add the service principal if it does not appear. The name variant note must appear at the exact point of the owner selection step, not in a separate section.
**Warning signs:** Searching for "f1346770" in the Add owners pane returns no results.

### Pitfall 3: Apps/Scripts Not Assigned to ETG Group

**What goes wrong:** Admin selects apps in the Device Preparation policy but never assigns them to the ETG device group. Apps show "Skipped" in the deployment report.
**Why it happens:** The policy and the app assignment are two separate steps in the Intune portal with no automatic linkage or warning.
**How to avoid:** The `03-device-preparation-policy.md` guide must include a callout at the Apps/Scripts configuration step referencing the prior requirement to assign apps to the ETG group. The prerequisite and the policy step are in different guides (ETG group guide handles assignment), so the callout serves as a cross-file reminder.
**Warning signs:** Apps selected in policy show Skipped status in deployment report despite being in the policy.

### Pitfall 4: App Install Context Set to User

**What goes wrong:** Apps fail during OOBE because they are configured with User install context.
**Why it happens:** User install context is the default for many app types; admins may not realize OOBE has no signed-in user.
**How to avoid:** The `03-device-preparation-policy.md` Apps section must state the System context requirement explicitly with a "what breaks" callout. The same applies to PowerShell scripts (Run this script using the logged on credentials = No).
**Warning signs:** Apps show Failed status in deployment report; LOB apps or Win32 apps do not install during OOBE.

### Pitfall 5: Entra ID Local Administrator Settings Conflict

**What goes wrong:** Provisioning is skipped and users reach the desktop without apps installed, or user account type does not match intent.
**Why it happens:** Active known issue (as of April 2026) — not all combinations of Device Preparation policy "User account type" and Entra ID "Local administrator settings" are supported.
**How to avoid:** The `03-device-preparation-policy.md` User account type setting must include the valid combinations table and a note that this is an active known issue. The valid combinations are documented in the research findings below.
**Warning signs:** Device Preparation screen is skipped; user reaches desktop without expected apps.

### Pitfall 6: Corporate Identifiers Required but Not Added

**What goes wrong:** APv2 deployment does not launch because the enrollment restriction requires corporate identifiers and the device's identifier is not on file.
**Why it happens:** Corporate identifiers are optional when no enrollment restrictions block personal devices. Admins who add enrollment restrictions after setup often miss this linkage.
**How to avoid:** `04-corporate-identifiers.md` must begin with a clear "when required" conditional: corporate identifiers are only needed if enrollment restrictions block personal device enrollments. The enrollment restriction interaction subsection must explain the precedence rule: enrollment restriction evaluated before Device Preparation policy; blocked personal device = deployment never launches.
**Warning signs:** APv2 deployment not launched; L1 runbook 06 step 13 checks corporate identifiers as a root cause.

### Pitfall 7: Wrong Group Selected in Policy (Device Group vs User Group Confusion)

**What goes wrong:** Admin selects the user group in the Device group page or the device group in the Assignments (user group) page of the policy.
**Why it happens:** The policy creation wizard has separate pages for device group and user group, and the names can be similar.
**How to avoid:** `03-device-preparation-policy.md` must include an explicit warning at each page of the wizard about which type of group belongs where.
**Warning signs:** Policy exists but deployment never launches; no matching policy found for enrolling user.

## Code Examples

### ETG Device Group: PowerShell to Add Intune Provisioning Client Service Principal

The following procedure is required when the service principal does not appear in the Intune portal owner picker. Both modules are required.

```powershell
# Source: https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-device-group
# Required modules
Install-Module Microsoft.Graph.Authentication
Install-Module Microsoft.Graph.Applications

# Connect with required scope
Connect-MgGraph -Scopes "Application.ReadWrite.All"
# Accept the "Permissions requested" window and check "Consent on behalf of your organization"

# Add the Intune Provisioning Client service principal
New-MgServicePrincipal -AppID f1346770-5b25-470b-88bd-d5744ab7952c
```

**Expected errors to document:**
- `Status: 409 (Conflict)` with `Request_MultipleObjectsWithSameKeyValue` = service principal already exists; no action needed.
- `Status: 403 (Forbidden)` with `Authorization_RequestDenied` = insufficient permissions; verify the account has Global Admin or Application Administrator role and that consent was accepted.

### ETG Device Group: Portal Creation Checklist (4 items per D-05)

The ETG device group checklist in `02-etg-device-group.md` must verify all 4 items:

1. **Group type:** Security (not Microsoft 365)
2. **Membership type:** Assigned (not Dynamic)
3. **Microsoft Entra roles can be assigned to the group:** No
4. **Owner:** Intune Provisioning Client with AppID `f1346770-5b25-470b-88bd-d5744ab7952c` (also displayed as "Intune Autopilot ConfidentialClient" in some tenants — both are correct if AppID matches)

### RBAC Custom Role: All 5 Permission Categories with Exact Permissions

```
Source: https://learn.microsoft.com/en-us/autopilot/device-preparation/requirements (RBAC tab)

1. Device configurations
   - Read: Yes
   - Delete: Yes
   - Assign: Yes
   - Create: Yes
   - Update: Yes
   (View Reports: No — leave at default)

2. Enrollment programs
   - Enrollment time device membership assignment: Yes
   (All other permissions: No — leave at defaults)

3. Managed apps
   - Read: Yes
   (All other permissions: No)

4. Mobile apps
   - Read: Yes
   (All other permissions: No)

5. Organization
   - Read: Yes
   (All other permissions: No)
```

**Portal navigation:** Intune admin center > Tenant administration > Roles > Create > Intune role

### Device Preparation Policy: Configuration Settings Reference

```
Source: https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-autopilot-policy

Deployment settings:
- Deployment mode: User-driven (fixed for this tutorial)
- Deployment type: Single user (fixed)
- Join type: Microsoft Entra joined (fixed for Entra join scenario)
- User account type: Standard User | Administrator (toggle — admin choice)

Out-of-box experience settings:
- Minutes allowed before showing installation error: integer 15–720 (default implied: 60)
- Custom error message: optional text shown to end user on failure
- Allow users to skip setup after multiple attempts: Yes | No
  (Yes adds "Continue anyway" button alongside Retry)
- Show link to diagnostics: Yes | No
  (Yes shows diagnostic log export link on failure page)

Apps section:
- Up to 25 managed applications (limit raised from 10 on January 30, 2026)
- Supported types: LOB, Win32, Microsoft Store (WinGet only), Microsoft 365, Enterprise App Catalog
- REQUIREMENT: Apps must be assigned to the ETG device group with Required assignment and Device (System) context
- REQUIREMENT: Apps must be selected here AND assigned to ETG group — both steps required

Scripts section:
- Up to 10 PowerShell scripts
- REQUIREMENT: Scripts must be assigned to the ETG device group
- REQUIREMENT: "Run this script using the logged on credentials" must be set to No (= System context)

Policy priority:
- Multiple policies targeting the same user group: highest priority policy (lowest priority number) wins
- Priority is managed by drag-and-drop in the Device preparation policies list
```

### Corporate Identifiers: Windows-Specific Requirements

```
Source: https://learn.microsoft.com/en-us/intune/intune-service/enrollment/corporate-identifiers-add

Windows supported identifier type: Manufacturer, model, and serial number (combined)
- Serial number only: NOT supported for Windows 11 (only for Android/iOS)
- IMEI: NOT supported for Windows

CSV format: manufacturer,model,serial_number (no header row)
Example: Microsoft,surface 5,01234567890123

Minimum Windows version for corporate identifiers:
- Windows 11 22H2 with KB5035942 (OS Build 22621.3374) or later

Portal navigation: Intune admin center > Devices > Enrollment > Corporate device identifiers tab > Add > Upload CSV file
Identifier type selection: "Manufacturer, model, and serial number (Windows only)"

Manual entry: NOT available for Windows identifiers (CSV file required)
Maximum per CSV file: 5,000 rows or 5 MB (whichever comes first)
Maximum CSV files for Windows: 10 files; use PowerShell or Graph API for larger volumes
```

### Enrollment Restriction Interaction: APv2 Ownership Table (relevant rows)

From the `corporate-identifiers-add` page (verified 2026-04-09):

| Windows enrollment type | Without corporate identifiers | With corporate identifiers |
|-------------------------|-------------------------------|---------------------------|
| APv2 Device Preparation profile | Corporate, but **blocked by personal enrollment restriction** | Personal, unless defined by corporate identifiers |

**Implication for admins:** If the organization has an enrollment restriction that blocks personal device enrollment:
- Device enrolling via APv2 without a corporate identifier = blocked (enrollment restriction treats it as personal)
- Device enrolling via APv2 WITH a matching corporate identifier = allowed (treated as corporate-owned at enrollment time)
- After enrollment, corporate identifiers only affect state at enrollment time — not permanently

**Conflict precedence rule:** Enrollment restrictions are evaluated before the Device Preparation policy. A blocked enrollment means the Device Preparation experience never launches. This is why the L1 runbook 06 (deployment not launched) checks corporate identifiers as step 13.

### Entra ID Local Administrator Settings — Valid Combinations (Active Known Issue, April 2026)

```
Source: https://learn.microsoft.com/en-us/autopilot/device-preparation/known-issues
Date verified: April 10, 2026
Status: STILL ACTIVE (not marked resolved)

This is an active known issue. The following combinations must be documented in
03-device-preparation-policy.md for the "User account type" setting callout.

FOR STANDARD USER RESULT (user is non-admin on device):
Option 1: Entra ID Local Admin = None  +  Device Prep policy User account type = Administrator
Option 2: Entra ID Local Admin = Selected (non-admin users excluded)  +  Device Prep policy = Administrator
Option 3: Entra ID Local Admin = All  +  Device Prep policy User account type = Standard User

FOR ADMINISTRATOR RESULT (user is admin on device):
Option 1: Entra ID Local Admin = All  +  Device Prep policy User account type = Administrator
Option 2: Entra ID Local Admin = Selected (user is selected)  +  Device Prep policy = Administrator

WHAT BREAKS: When Entra ID Local Admin = Selected or None AND Device Prep policy = Standard User:
- Provisioning is skipped
- User reaches desktop WITHOUT expected apps installed
- No error shown during OOBE

Entra ID path: Azure portal > Microsoft Entra ID > Manage | Devices > Manage | Devices settings > Local administrator settings
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Max 10 apps in Device Preparation policy | Max 25 apps | January 30, 2026 | Guides must cite 25, not 10 |
| Windows 365 deployments ignored timeout setting (60-min hardcoded) | Resolved — configured timeout respected | February 2026 | Guides note this issue as resolved |
| Managed Installer policy caused Win32/Store/EAC apps to skip during OOBE | Resolved — apps install during OOBE | April 2026 | Guides note as resolved; L1 runbook 07 still references as a diagnostic check for pre-April deployments |
| APv1 RBAC "Device configurations > Assign" was a temporary workaround requirement | No longer needed (resolved July 2024) | July 2024 | Do NOT include the temporary workaround permission; use the current 5-category list |

**Deprecated/outdated:**
- The temporary RBAC workaround (Device configurations > Assign) was required June 2024 only. Current RBAC table from the requirements page is authoritative — do not reference the workaround.
- "Intune Autopilot ConfidentialClient" is an alternate display name only, not a deprecated object. Both names refer to AppID f1346770-5b25-470b-88bd-d5744ab7952c.

## Open Questions

1. **Entra ID Local Administrator settings valid combinations — re-verify at authoring time**
   - What we know: Verified April 10, 2026 from the known issues page. Five valid combinations documented above.
   - What's unclear: Whether Microsoft will update or resolve this known issue before Phase 15 authoring begins.
   - Recommendation: The implementer should re-fetch the known issues page before writing `03-device-preparation-policy.md` to confirm the table has not changed. The STATE.md pending todo captures this obligation.

2. **Whether `00-overview.md` includes a Mermaid setup flow diagram**
   - What we know: Lifecycle-apv2/00-overview.md and 02-deployment-flow.md use Mermaid diagrams. Claude's Discretion allows this for the overview.
   - What's unclear: Whether a visual setup sequence adds value for admin audience vs just the numbered file list.
   - Recommendation: Include a simple linear Mermaid diagram showing the 5 files as sequential steps (box-to-box, no branching). Keeps the pattern consistent with existing project files and provides quick visual orientation.

3. **Phase 16 (APv1 Admin Guides) naming — `docs/admin-setup-apv1/` assumed**
   - What we know: Phase 15 creates `docs/admin-setup-apv2/` and `01-prerequisites-rbac.md` version gate links to "APv1 Admin Setup Guides."
   - What's unclear: The Phase 16 directory name has not been decided yet.
   - Recommendation: Use a placeholder link comment (e.g., `[APv1 Admin Setup Guides — coming in Phase 16]`) in version gate blockquotes for Phase 15 files. Phase 17 will finalize navigation wiring.

## Validation Architecture

Note: `workflow.nyquist_validation` is not set in `.planning/config.json`. The key is absent — treating as enabled.

However, Phase 15 produces Markdown documentation files exclusively. There is no code, no functions, no APIs, and no executable components. Automated test validation (pytest, Vitest, Pester) does not apply to this phase.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | N/A — documentation phase, no executable code |
| Config file | None applicable |
| Quick run command | Manual review of each file against template |
| Full suite command | Manual review of all 5 files + link verification |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ASET-01 | Sequential guide completeness (prerequisite → policy, no missing info) | Manual review | N/A — human walkthrough required | ❌ No automated check |
| ASET-02 | ETG checklist includes AppID, PowerShell procedure, verification | Manual review | N/A | ❌ No automated check |
| ASET-03 | Every configurable setting has 3-element "what breaks" callout | Manual review | N/A | ❌ No automated check |
| ASET-04 | RBAC section lists all 5 categories before any setup step | Manual review | N/A | ❌ No automated check |
| ASET-05 | Corporate identifiers guide includes enrollment restriction interaction | Manual review | N/A | ❌ No automated check |

### Manual Verification Checklist (for /gsd:verify-work)

The planner should generate a manual verification checklist task as the final wave. Items to check:

- [ ] `00-overview.md` lists all 5 files with sequential navigation and "Next step" links
- [ ] `01-prerequisites-rbac.md` places APv1 deregistration as prerequisite 0 (first item)
- [ ] `01-prerequisites-rbac.md` lists all 5 RBAC permission categories before any setup step
- [ ] `02-etg-device-group.md` 4-item checklist includes AppID `f1346770-5b25-470b-88bd-d5744ab7952c`
- [ ] `02-etg-device-group.md` PowerShell procedure is inline (not in `<details>` block)
- [ ] `03-device-preparation-policy.md` every configurable setting has a "what breaks" callout with all 3 elements
- [ ] `03-device-preparation-policy.md` User account type callout includes valid combinations table
- [ ] `04-corporate-identifiers.md` states when corporate identifiers are required (conditional on enrollment restrictions)
- [ ] `04-corporate-identifiers.md` includes enrollment restriction interaction subsection with conflict precedence
- [ ] All files use `applies_to: APv2`, `audience: admin`, `last_verified`, `review_by` frontmatter
- [ ] All files have version gate blockquote and "See also" footer
- [ ] All L1 runbook links resolve to existing files (06, 07, 08, 09)
- [ ] No `<details>` blocks contain primary admin procedural content

### Wave 0 Gaps

None — this is a documentation phase. No test infrastructure is needed. No framework install required.

## Sources

### Primary (HIGH confidence)

- https://learn.microsoft.com/en-us/autopilot/device-preparation/requirements — RBAC permissions (all 5 categories), licensing, software requirements. Updated 2026-04-07.
- https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-device-group — ETG group creation, PowerShell cmdlets, AppID, service principal name variant. Updated 2026-02-05.
- https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-autopilot-policy — All Device Preparation policy settings, timeout range (15–720), app/script limits (25/10), policy priority. Updated 2026-04-10.
- https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-assign-apps-scripts — App types, System context requirement, assignment steps. Updated 2026-04-07.
- https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-corporate-identifier — When corporate identifiers are required. Updated 2026-04-07.
- https://learn.microsoft.com/en-us/intune/intune-service/enrollment/corporate-identifiers-add — Windows identifier types, CSV format, portal navigation, enrollment type ownership table. Updated 2026-04-09.
- https://learn.microsoft.com/en-us/autopilot/device-preparation/known-issues — Entra ID Local Admin conflict (active, 5 valid combinations), Managed Installer resolved April 2026, Windows 365 timeout resolved February 2026. Updated 2026-04-10.
- https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-workflow — 7-step workflow overview. Updated 2026-02-05.
- `docs/_templates/admin-template.md` — Admin guide template (project file, verified present)
- `docs/lifecycle-apv2/` — All 4 Phase 11 output files (verified present)
- `docs/l1-runbooks/06-09-apv2-*.md` — All 4 target runbooks (verified present)
- `docs/error-codes/06-apv2-device-preparation.md` — APv2 failure catalog (verified present)

### Secondary (MEDIUM confidence)

None — all critical claims verified against official Microsoft Learn sources.

### Tertiary (LOW confidence)

None — no WebSearch-only findings included.

## Metadata

**Confidence breakdown:**

- Standard stack / content sources: HIGH — all verified from official Microsoft Learn pages updated within 7 days of research date
- Architecture (file structure): HIGH — locked decisions in CONTEXT.md, consistent with verified existing project patterns
- Technical specifics (RBAC, AppID, cmdlets, settings): HIGH — directly quoted from official tutorial pages
- Known issue (Local Admin conflict): HIGH — verified from known issues page updated April 10, 2026; marked as still active
- Corporate identifier enrollment restriction interaction: HIGH — verified from corporate-identifiers-add page with explicit APv2 row in ownership table
- Pitfalls: HIGH — derived from official known issues page and tutorial warnings

**Research date:** 2026-04-12
**Valid until:** 2026-07-12 (90-day review cycle, consistent with project frontmatter pattern). The Entra ID Local Administrator settings conflict known issue should be re-checked at authoring time regardless of review cycle.
