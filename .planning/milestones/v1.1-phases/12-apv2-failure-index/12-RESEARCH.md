# Phase 12: APv2 Failure Index - Research

**Researched:** 2026-04-11
**Domain:** Windows Autopilot Device Preparation (APv2) failure catalog — documentation authoring
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01:** Organize failures by deployment phase (matching the 10-step flow from Phase 11). Sections: Enrollment Failures (Steps 2-3), IME Failures (Step 4), App Installation Failures (Steps 7-9), Script Failures (Step 8), Post-Deployment Issues.

**D-02:** Each failure scenario entry uses the Symptom-Cause-Action format: **Symptom** (what the user/admin observes), **Probable Cause** (why it happens), **Quick Check** (portal-only verification path), **Runbook** (forward reference to L1/L2 guide). No inline resolution steps — runbooks handle that.

**D-03:** Add a separate `## APv2 Failure Scenarios` section BELOW the existing hex-code Quick Lookup table in `00-index.md`. The APv2 table uses different columns: Scenario | Symptom | Phase | Category (no hex Code column). Rename the existing table header to `## Quick Lookup (APv1)` and add a `**Framework:** APv1 (classic)` label. APv2 section gets `**Framework:** APv2 (Device Preparation)` label.

**D-04:** Add `06-apv2-device-preparation.md` to the Categories section in `00-index.md` alongside the existing 5 category files.

**D-05:** Update `00-index.md` frontmatter from `applies_to: APv1` to `applies_to: both` since it now covers both frameworks.

**D-06:** Cover the core 8-10 scenarios that map to documented failure points in the APv2 deployment flow:
  1. Deployment experience never launched (no Device Preparation policy matched)
  2. APv1 profile took precedence (ESP appeared instead of APv2 flow)
  3. Entra join failed
  4. Intune enrollment failed
  5. IME install failed
  6. LOB/M365 app install failed
  7. PowerShell script execution failed
  8. Win32/Store/Enterprise App Catalog app install failed
  9. Deployment timed out (overall)
  10. Wrong apps/policies applied (post-deployment)

**D-07:** Phase 14 (L2 runbooks) can expand the catalog with additional edge-case scenarios if needed.

**D-08:** Use forward reference text (not markdown links) for runbook references that point to Phase 13/14 content. Example: `**Runbook:** L1 runbook: APv2 deployment not launched (Phase 13)`. No broken links.

**D-09:** Apply version gate blockquote headers and See Also footers consistent with Phase 11 pattern.

**D-10:** New file `docs/error-codes/06-apv2-device-preparation.md` uses `applies_to: APv2`, `audience: both`. Updated `00-index.md` uses `applies_to: both`.

**D-11:** Follow the 90-day review cycle (`last_verified` / `review_by`) established in Phase 11.

### Claude's Discretion

- Exact wording of symptom descriptions and probable causes (as long as they match Microsoft Learn terminology)
- Ordering of scenarios within each deployment phase group
- Whether to include a Mermaid diagram in the catalog file showing failure points (optional)
- Column widths and formatting details in the index table

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| TROU-01 | Technician can look up APv2 failure scenarios by symptom (scenario-based index, not hex codes) | `06-apv2-device-preparation.md` catalog organized by deployment phase with Symptom as primary lookup axis; each entry has Symptom, Probable Cause, Quick Check, forward Runbook reference |
| NAVG-02 | Error code master index includes APv2 failure scenarios section | `00-index.md` gains `## APv2 Failure Scenarios` table with Scenario/Symptom/Phase/Category columns; existing table relabeled APv1; frontmatter updated to `applies_to: both` |
</phase_requirements>

---

## Summary

Phase 12 delivers two file changes: a new APv2 failure catalog (`docs/error-codes/06-apv2-device-preparation.md`) and targeted modifications to the master error index (`docs/error-codes/00-index.md`). This is a documentation-authoring phase — there is no new code to write, no libraries to install, and no third-party tooling to evaluate.

The domain is Windows Autopilot Device Preparation (APv2) failure taxonomy. The key design challenge is that APv2 failures do NOT have hex error codes — they are observed as behavioral symptoms (deployment experience never launched, ESP appeared instead of APv2 flow, app shows "Skipped" in the report, deployment timed out). This means the catalog must be organized by symptom, not by code. Microsoft Learn's official troubleshooting FAQ and reporting/monitoring documentation confirm this symptom-first model and supply the canonical terminology and probable causes for each core scenario.

The 10 scenarios in D-06 are verified against both the Phase 11 deployment flow (`02-deployment-flow.md`) and Microsoft Learn's official troubleshooting FAQ (`learn.microsoft.com/en-us/autopilot/device-preparation/troubleshooting-faq`, verified April 2026). Each scenario maps to an identifiable failure point in the deployment flow. Two scenarios merit special attention: the APv1 precedence scenario (D-06 #2) is documented as a "silent failure" — the device deploys via APv1 ESP with no error shown — and the app "Skipped" status in the deployment report has two distinct causes (not assigned to device group vs. Managed Installer policy active), which should be split into separate entries in the catalog.

**Primary recommendation:** Author 10 scenario entries in the catalog, organized into four sections matching the deployment flow, with the APv1-precedence scenario prominently called out as a silent failure. Forward references to Phase 13 runbooks use plain text, not markdown links.

---

## Standard Stack

This phase has no software dependencies. It is a Markdown documentation authoring phase only.

| Asset | Version | Purpose |
|-------|---------|---------|
| Markdown (.md) with YAML frontmatter | — | File format for all content |
| Mermaid (embedded in Markdown) | — | Optional failure-point diagram (Claude's discretion) |

**No npm, pip, or PowerShell packages are required for this phase.**

---

## Architecture Patterns

### File Structure

Two files are touched in this phase:

```
docs/error-codes/
├── 00-index.md          MODIFIED — APv2 section added, frontmatter updated, Quick Lookup relabeled
├── 01-mdm-enrollment.md  (unchanged)
├── 02-tpm-attestation.md (unchanged)
├── 03-esp-enrollment.md  (unchanged)
├── 04-pre-provisioning.md(unchanged)
├── 05-hybrid-join.md     (unchanged)
└── 06-apv2-device-preparation.md  NEW — APv2 failure catalog
```

### Pattern 1: New Catalog File Frontmatter

Consistent with Phase 11 pattern (verified from `docs/lifecycle-apv2/02-deployment-flow.md`):

```yaml
---
last_verified: 2026-04-11
review_by: 2026-07-10
applies_to: APv2
audience: both
---
```

`audience: both` because L1 technicians and L2 engineers both use the failure catalog.

### Pattern 2: Version Gate Blockquote

Copy from any Phase 11 file and adapt. The catalog file should use:

```markdown
> **Version gate:** This guide covers Windows Autopilot Device Preparation (APv2) failure scenarios.
> These failures are identified by symptom and deployment phase — not hex error codes.
> For APv1 (classic Autopilot) error codes, see [Error Code Index](00-index.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).
```

### Pattern 3: Scenario Entry Format (D-02)

Each entry follows a consistent four-field structure. No inline resolution steps.

```markdown
### [Scenario name matching deployment flow terminology]

**Symptom:** [What the user/admin observes — observable behavior, not internal cause]

**Probable Cause:** [Why this happens — root cause using Microsoft Learn terminology]

**Quick Check:** [Portal-only verification steps a technician can do without PowerShell or device access]

**Runbook:** L1 runbook: [descriptive name] (Phase 13)
```

### Pattern 4: Deployment Phase Section Headers

Sections match the 10-step deployment flow from `02-deployment-flow.md`. The four section headers for the catalog file are:

```markdown
## Enrollment Failures (Steps 2–3)
## IME Failures (Step 4)
## App Installation Failures (Steps 7–9)
## Script Failures (Step 8)
## Post-Deployment Issues (Step 10+)
```

### Pattern 5: 00-index.md Modifications

Three targeted changes to `00-index.md`:

**Change 1 — Frontmatter:** `applies_to: APv1` → `applies_to: both`

**Change 2 — Quick Lookup section relabeling:**
```markdown
## Quick Lookup (APv1)

**Framework:** APv1 (classic)

**Mode:** UD=User-Driven · PP=Pre-Provisioning · SD=Self-Deploying · All=All modes

| Code | Name | Mode | Category |
```

**Change 3 — New APv2 section (appended after No-Code ESP Failures section):**
```markdown
## APv2 Failure Scenarios

**Framework:** APv2 (Device Preparation)

Failures in APv2 are identified by symptom and deployment phase — not hex error codes.
Full catalog: [APv2 Device Preparation Failures](06-apv2-device-preparation.md)

| Scenario | Symptom | Phase | Category |
|----------|---------|-------|----------|
| Deployment experience never launched | APv2 UI never appeared; standard OOBE or ESP showed instead | Steps 1–2 | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#deployment-experience-never-launched) |
| APv1 profile took precedence | ESP screen appeared during OOBE; no APv2 progress screen | Step 3 | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#apv1-profile-took-precedence) |
| Entra join failed | Deployment failed during Entra join; portal shows failed status at Policy installation phase | Step 3 | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#entra-join-failed) |
| Intune enrollment failed | Device enrolled in Entra but not visible in Intune, or enrollment error shown | Step 3 | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#intune-enrollment-failed) |
| IME install failed | Deployment fails before any apps install; report shows failure at Policy installation phase | Step 4 | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#ime-install-failed) |
| LOB or M365 app install failed | Specific app shows Failed in deployment report Apps tab | Step 7 | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#lob-or-m365-app-install-failed) |
| PowerShell script execution failed | Script shows Failed in deployment report Scripts tab | Step 8 | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#powershell-script-execution-failed) |
| Win32, Store, or EAC app install failed | Win32/Store/EAC app shows Failed or Skipped in deployment report | Step 9 | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#win32-store-or-eac-app-install-failed) |
| Deployment timed out | Deployment fails with timeout; portal shows Failed status | Steps 7–9 | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#deployment-timed-out) |
| Wrong apps or policies applied | User reaches desktop but expected apps missing or unexpected policies applied | Step 10+ | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#wrong-apps-or-policies-applied) |
```

**Change 4 — Categories section:** Add new line:
```markdown
- [APv2 Device Preparation Failures](06-apv2-device-preparation.md) — Symptom-based failure catalog for APv2 deployments
```

### Anti-Patterns to Avoid

- **Inline resolution steps in catalog entries:** The catalog is a lookup index, not a runbook. Resolution steps go in Phase 13/14 runbooks.
- **Broken markdown links for Phase 13/14 runbooks:** Use forward reference plain text (D-08) until those files exist.
- **Hex code columns in the APv2 table:** APv2 failures have no hex codes. The APv2 index table must use Scenario/Symptom/Phase/Category.
- **Mixing APv1 and APv2 entries in the Quick Lookup table:** The existing table must be kept separate and relabeled; do not add APv2 entries to it.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead |
|---------|-------------|-------------|
| APv2 failure terminology | Custom failure names | Microsoft Learn canonical names from troubleshooting-faq.yml and reporting-monitoring.md |
| Deployment report column names | Paraphrased names | Exact names from Microsoft Learn: "Policy installation", "Script installation", "App installation", "Installed", "Skipped", "Failed" |
| Deployment phase mapping | Arbitrary phase groupings | 10-step flow step numbers from `02-deployment-flow.md` (already authoritative in the repo) |

**Key insight:** Every symptom description in the catalog MUST use exact Microsoft Learn/Intune portal terminology so technicians can match what they see in the portal to what they read in the catalog.

---

## Scenario Content: Verified Findings per Entry

This section documents the researched probable causes and Quick Check paths for each of the 10 D-06 scenarios. These are the facts the implementer needs — they should not be re-researched.

### Scenario 1: Deployment experience never launched

**Source:** Microsoft Learn troubleshooting-faq.yml (HIGH confidence, verified April 2026)

**Probable causes (in order of commonality):**
1. OS version below minimum — Windows 11 22H2 without KB5035942, or Windows 10. Device enrolls in Intune without APv2 configuration; no error shown.
2. Windows automatic Intune enrollment (MDM scope) not configured.
3. User signing in during OOBE is not a member of the user group specified in the Device Preparation policy.
4. No device group selected in the Device Preparation policy (policy saved without device group).
5. Corporate identifiers required but not added for the device.
6. Users not allowed to join devices to Microsoft Entra ID.

**Quick Check portal path:** Intune admin center > Devices > Windows > Enrollment > Device preparation policies — verify policy exists, has user group assigned, has device group assigned. Check OS version via OEM spec sheet.

---

### Scenario 2: APv1 profile took precedence

**Source:** Microsoft Learn troubleshooting-faq.yml and `01-prerequisites.md` (HIGH confidence)

**Key fact:** This is a SILENT failure. The device runs APv1 ESP with no error. The admin sees ESP behavior and may assume APv2 is broken.

**Probable cause:** Device is registered as a Windows Autopilot device (APv1), or a Windows Autopilot profile is assigned to the device. APv1 profiles always take precedence over APv2 Device Preparation policies.

**Quick Check portal path:** Intune admin center > Devices > Windows > Windows enrollment > Devices — search by serial number. If device appears, it is registered for APv1. Also check Autopilot Deployment Profiles for any assignment to the device.

---

### Scenario 3: Entra join failed

**Source:** `02-deployment-flow.md` Step 3 (HIGH confidence, Phase 11 output)

**Probable causes:**
1. User lacks Microsoft Entra join permissions (Entra admin center > Devices > Device settings > Users may join devices to Microsoft Entra).
2. MDM auto-enrollment scope set to None or user not in included group.
3. ETG security group not configured correctly (Intune Provisioning Client not set as owner).

**Quick Check portal path:** Intune admin center > Devices > Monitor > Windows Autopilot device preparation deployments — check deployment status. Entra admin center > Devices > Device settings — verify join permissions.

---

### Scenario 4: Intune enrollment failed

**Source:** `02-deployment-flow.md` Step 3, `01-prerequisites.md` Prerequisite #2 (HIGH confidence)

**Probable causes:**
1. MDM auto-enrollment scope is None in Entra admin center (Mobility > Microsoft Intune > MDM user scope).
2. Missing required license on the enrolling user account (MDM enrollment requires Intune license).

**Quick Check portal path:** Entra admin center > Mobility (MDM and WIP) > Microsoft Intune > MDM user scope. Microsoft 365 admin center > Active users > select user > Licenses.

---

### Scenario 5: IME install failed

**Source:** `02-deployment-flow.md` Step 4 (HIGH confidence)

**Probable cause:** Network connectivity issue preventing IME download, or transient Intune service availability issue.

**Key fact:** IME must install before any Win32 apps or PowerShell scripts can be delivered. IME failure blocks all subsequent app/script installation and will cause the overall deployment to fail.

**Quick Check portal path:** Intune admin center > Devices > Monitor > Windows Autopilot device preparation deployments > select device > deployment details. Check Phase column — if shows "Policy installation" at failure, IME likely failed before reaching app installation phases.

---

### Scenario 6: LOB or M365 app install failed

**Source:** `02-deployment-flow.md` Step 7, Microsoft Learn reporting-monitoring.md (HIGH confidence)

**Probable causes:**
1. App packaging error or content delivery issue.
2. App configured to install in User context instead of System context (apps must run in SYSTEM context during OOBE when no user is signed in).
3. App shows "Skipped" — app selected in Device Preparation policy but NOT assigned to the ETG device group.

**Deployment report signals:** Apps tab in deployment details shows individual app status: Installed / In progress / Skipped / Failed.

**Quick Check portal path:** Intune admin center > Devices > Monitor > Windows Autopilot device preparation deployments > select device > Apps tab. For "Skipped" apps: verify app is assigned to the ETG device group (Intune admin center > Apps > select app > Assignments).

---

### Scenario 7: PowerShell script execution failed

**Source:** `02-deployment-flow.md` Step 8, Microsoft Learn reporting-monitoring.md (HIGH confidence)

**Probable causes:**
1. Script exits with non-zero exit code.
2. Script throws an unhandled exception.
3. Script times out.
4. Script configured to run in User context instead of System context (must be SYSTEM during OOBE).
5. Script shows "Skipped" — selected in Device Preparation policy but not assigned to the ETG device group.

**Key fact:** Script failures cause the entire APv2 deployment to fail.

**Deployment report signals:** Scripts tab in deployment details shows: Installed / In progress / Skipped / Failed.

**Quick Check portal path:** Intune admin center > Devices > Monitor > Windows Autopilot device preparation deployments > select device > Scripts tab. For "Skipped" scripts: verify script is assigned to the ETG device group.

---

### Scenario 8: Win32, Store, or EAC app install failed

**Source:** `02-deployment-flow.md` Step 9, Microsoft Learn reporting-monitoring.md, known-issues.md (HIGH confidence)

**Probable causes:**
1. App packaging/detection rule error.
2. Microsoft Store connectivity issue.
3. App configured in User context instead of System context.
4. App shows "Skipped" due to Managed Installer policy active for the tenant — known issue resolved April 2026. If Managed Installer policy was active before April 2026 fix, Win32/Store/EAC apps were skipped during OOBE and installed post-desktop.

**Key fact:** The "Skipped" status for Win32/Store/EAC apps has two distinct causes: (a) app not assigned to ETG device group, or (b) Managed Installer policy was active (now resolved). A technician seeing "Skipped" must check both.

**Quick Check portal path:** Intune admin center > Devices > Monitor > Windows Autopilot device preparation deployments > select device > Apps tab. Check Managed Installer policy status: Intune admin center > Endpoint security > App control for business.

---

### Scenario 9: Deployment timed out

**Source:** `02-deployment-flow.md`, Microsoft Learn known-issues.md (HIGH confidence)

**Probable causes:**
1. Overall timeout value too low for the number of apps/scripts selected in the Device Preparation policy.
2. Known issue (resolved February 2026): Windows 365 devices ignored the configured timeout value and used a hardcoded 60-minute limit.
3. Large number of apps or slow network causing installation to exceed the timeout.

**Deployment report signal:** Deployment status shows "Failed"; deployment time column reflects when the timeout occurred.

**Quick Check portal path:** Intune admin center > Enrollment > Device preparation policies > select policy — check "Minutes allowed before device preparation fails" setting. Review total app count and expected install times.

---

### Scenario 10: Wrong apps or policies applied (post-deployment)

**Source:** `02-deployment-flow.md` Steps 5-6, 10, `00-overview.md` (HIGH confidence)

**Probable causes:**
1. Local administrator setting conflict between Device Preparation policy "User account type" and Entra ID "Local administrator settings" — known issue (still active as of April 2026). See known-issues.md for valid combinations.
2. Apps assigned to the ETG device group but NOT selected in the Device Preparation policy install after the user reaches the desktop (background sync), not during OOBE — this is expected APv2 behavior, not a failure.
3. MDM policy conflicts from policies assigned to the ETG device group causing unexpected behavior.
4. Multiple Device Preparation policies targeting the same user group — wrong priority wins.

**Quick Check portal path:** Intune admin center > Devices > Windows > Enrollment > Device preparation policies — verify priority order. Entra admin center > Devices > Device settings > Local administrator settings — verify against known valid combinations. Intune admin center > deployment details for device — check which policy version was applied.

---

## Common Pitfalls

### Pitfall 1: APv1 Precedence Is a Silent Failure

**What goes wrong:** Implementer documents this as "an error occurs" or implies something visible happens. In reality, the device silently runs APv1 instead of APv2 with no error message shown anywhere.

**Why it happens:** Microsoft documentation describes APv1 profiles as taking "precedence" — the word "silently" is in the Phase 11 prerequisite file but not in all Microsoft Learn docs.

**How to avoid:** The Symptom field for Scenario 2 MUST state that ESP appeared (a positive observable sign), not that "an error occurred." The Quick Check tells the technician to look for the device in the APv1 registration list.

**Warning signs:** If a technician reports "APv2 isn't working and showing an error" but can also see ESP — that's not a failure, it's APv1 running.

### Pitfall 2: "Skipped" Status Has Two Different Root Causes

**What goes wrong:** Documenting "Skipped" as a single scenario with a single cause. In practice there are two causes with different Quick Check paths and different runbooks.

**Why it happens:** The deployment report uses the same "Skipped" status for both (a) app not assigned to ETG device group, and (b) Managed Installer policy blocked delivery.

**How to avoid:** For Scenario 8 (Win32/Store/EAC), the Probable Cause field must list both causes explicitly. The Quick Check must include both verification paths.

**Warning signs:** Technician verifies app IS assigned to ETG device group but status is still "Skipped" — points to Managed Installer policy cause.

### Pitfall 3: App/Script "System Context" Requirement

**What goes wrong:** Documenting app install failures without mentioning the System context requirement. Technician escalates to L2 before checking this.

**Why it happens:** The System context requirement is documented in the Microsoft Learn troubleshooting FAQ but it is not prominently featured in the deployment overview.

**How to avoid:** System context verification should appear in the Quick Check for all app and script failure scenarios.

### Pitfall 4: Forward References That Look Like Dead Links

**What goes wrong:** Writing forward references as markdown links (e.g., `[L1 runbook](../l1-runbooks/apv2-deployment.md)`) to files that do not yet exist. Markdown renderers show these as broken links.

**Why it happens:** Natural instinct to link when cross-referencing.

**How to avoid:** Per D-08, all Phase 13/14 runbook references must be plain text with phase annotation: `**Runbook:** L1 runbook: APv2 deployment not launched (Phase 13)`.

### Pitfall 5: 00-index.md Version History Entry

**What goes wrong:** Forgetting to add a Version History entry when modifying `00-index.md`.

**Why it happens:** `00-index.md` has a Version History table that the existing APv1 files also have. It must be kept current.

**How to avoid:** Add a version history row: `| 2026-04-11 | Added APv2 Failure Scenarios section and 06-apv2-device-preparation.md category |`

---

## Code Examples

### Scenario Entry Template (Symptom-Cause-Action)

```markdown
### Deployment experience never launched

**Symptom:** The Windows Autopilot Device Preparation progress screen never appeared during
OOBE. The device either completed standard OOBE without any managed deployment, or displayed
the Enrollment Status Page (ESP) instead.

**Probable Cause:** One or more of the following conditions prevented the Device Preparation
policy from activating: OS version below minimum requirement (Windows 11 22H2 without
KB5035942 or earlier), Windows automatic Intune enrollment not configured, the signing-in
user is not a member of the user group assigned to the Device Preparation policy, no device
group is selected in the Device Preparation policy, or users are not permitted to join devices
to Microsoft Entra ID.

**Quick Check:** Intune admin center > Devices > Windows > Enrollment > Device preparation
policies — verify the policy exists, has a user group assigned, and has a device group
selected. Confirm the signing-in user is a member of that user group. Verify OS version
meets minimum requirements.

**Runbook:** L1 runbook: APv2 deployment experience never launched (Phase 13)
```

### APv2 Index Table Format

```markdown
## APv2 Failure Scenarios

**Framework:** APv2 (Device Preparation)

Failures in APv2 are identified by symptom and deployment phase — not hex error codes.
Full catalog: [APv2 Device Preparation Failures](06-apv2-device-preparation.md)

| Scenario | Symptom | Phase | Category |
|----------|---------|-------|----------|
| Deployment experience never launched | APv2 progress screen never appeared; standard OOBE or ESP showed instead | Steps 1–2 | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#deployment-experience-never-launched) |
```

### See Also Footer Pattern (from Phase 11)

```markdown
## See Also

- [Error Code Index](00-index.md)
- [APv2 Deployment Flow (10-Step Process)](../lifecycle-apv2/02-deployment-flow.md)
- [APv2 Prerequisites Checklist](../lifecycle-apv2/01-prerequisites.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| APv2 known issue: Win32/Store/EAC skipped when Managed Installer active | Resolved — apps now deliver during OOBE even with Managed Installer | April 2026 | Catalog should note this as resolved; Quick Check still includes Managed Installer verification for tenants that had this issue before resolution |
| APv2 known issue: Windows 365 deployments always timeout at 60 min | Resolved — configured timeout value is now respected | February 2026 | Catalog should note this as resolved; still relevant for tenants that experienced it |
| APv2 app limit: 10 apps per Device Preparation policy | Raised to 25 apps per policy | January 30, 2026 | Timeout scenarios are less likely to hit app count limits; if technician sees "max apps" reference in older documentation, 25 is the current limit |

**Active known issues (as of April 2026, unresolved):**
- **Entra ID Local administrator settings conflict** with Device Preparation policy "Standard user" setting: specific valid combinations documented in known-issues.md. Still active — Scenario 10 Quick Check must reference this.
- **Log export during OOBE shows no result** (cosmetic — logs ARE saved to USB; user just doesn't see a confirmation).
- **Apps/Scripts tabs display incorrect data when editing APv2 policy** (Intune UI only; actual configuration applied is correct).

---

## Open Questions

1. **Mermaid diagram in the catalog file**
   - What we know: Phase 11's `02-deployment-flow.md` already has a Level 2 failure-point diagram showing the same failure categories.
   - What's unclear: Whether duplicating this diagram in the catalog adds clarity or creates maintenance burden.
   - Recommendation: Claude's discretion — omit to avoid duplication, and reference the deployment flow doc's diagram via a link instead. The index table in `00-index.md` serves as the visual overview.

2. **Scenario 4 (Intune enrollment failed) vs Scenario 3 (Entra join failed) distinction**
   - What we know: Both fail at Step 3 in the deployment flow. The deployment report Phase column shows "Policy installation" for both.
   - What's unclear: Whether the Intune admin center portal shows a distinct status that lets a technician tell the difference before escalating.
   - Recommendation: Keep as two separate entries. The distinction is visible from the Entra admin center (device joined or not) vs Intune admin center (device enrolled or not). A device can Entra-join but fail MDM enrollment; the two portals show different states.

---

## Validation Architecture

The `.planning/config.json` does not set `workflow.nyquist_validation` to `false` (the key is absent). However, this is a pure documentation phase — all deliverables are Markdown files. There are no test files, test frameworks, or automated commands applicable. The verification criterion is human review of file content against the success criteria in CONTEXT.md.

**Verification approach (no automated tests):**
- Success Criterion 1: Search catalog file for any of the D-06 scenario names and confirm each has Symptom, Probable Cause, Quick Check, Runbook fields.
- Success Criterion 2: Open `00-index.md` and confirm `## APv2 Failure Scenarios` section exists with Framework label and correct columns.
- Success Criterion 3: Confirm `06-apv2-device-preparation.md` contains no hex code tables.

---

## Sources

### Primary (HIGH confidence)
- `https://learn.microsoft.com/en-us/autopilot/device-preparation/troubleshooting-faq` — All 10 scenario probable causes and Quick Check portal paths; verified April 2026 (page updated 2026-04-07)
- `https://learn.microsoft.com/en-us/autopilot/device-preparation/reporting-monitoring` — Exact deployment report column names, Phase values (Policy installation / Script installation / App installation), and App/Script status values (Installed / In progress / Skipped / Failed); verified April 2026 (page updated 2026-02-05)
- `https://learn.microsoft.com/en-us/autopilot/device-preparation/known-issues` — Active and resolved known issues; verified April 2026 (page updated 2026-04-10)
- `docs/lifecycle-apv2/02-deployment-flow.md` — 10-step flow with failure points; Phase 11 output; authoritative step number mapping
- `docs/lifecycle-apv2/01-prerequisites.md` — APv1 deregistration as first prerequisite; silent precedence behavior
- `docs/error-codes/00-index.md` — Existing index structure; frontmatter, Quick Lookup table format, Version History pattern
- `docs/error-codes/01-mdm-enrollment.md` — Category file pattern for frontmatter, version gate, and footer structure

### Secondary (MEDIUM confidence)
- WebSearch result pointing to `patchmypc.com` and `call4cloud.nl` for community APv2 troubleshooting content — not used directly; Microsoft Learn sources sufficient for all 10 scenarios

---

## Metadata

**Confidence breakdown:**
- Scenario content (10 entries): HIGH — Every probable cause and Quick Check path is verified against Microsoft Learn official documentation updated April 2026
- 00-index.md modification pattern: HIGH — Existing file structure read directly; changes are additive only
- Forward reference format: HIGH — D-08 decision is explicit; pattern already used in Phase 11 files
- Known issue statuses: HIGH — Pulled directly from known-issues.md updated April 10, 2026

**Research date:** 2026-04-11
**Valid until:** 2026-07-11 (90 days — matches 90-day review cycle established in Phase 11)
