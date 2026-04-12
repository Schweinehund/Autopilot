# Phase 5: L1 Runbooks - Research

**Researched:** 2026-03-20
**Domain:** Technical writing — scripted service desk procedures for Windows Autopilot failures
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01:** Hybrid model — runbooks are standalone but open with a quick prerequisite checklist
**D-02:** Prerequisites section lists what the decision tree would have confirmed (e.g., "device is in Autopilot portal, network passes")
**D-03:** Tree-followers skim prerequisites in seconds; standalone users catch what they missed
**D-04:** Decision tree "Resolved" and "Resolution & Next Steps" terminals link directly to runbook files (or anchored sections within them)

**D-05:** Linear step sequences only — no if/then branching inside runbooks
**D-06:** Decision trees already narrow the scenario; runbooks execute, not re-triage
**D-07:** Where a runbook covers sub-scenarios (e.g., ESP device phase vs user phase), use labeled sections with separate numbered step sequences
**D-08:** Decision tree terminals deep-link to specific anchored sections (e.g., `01-esp.md#device-phase-steps`)

**D-09:** Detailed steps with full click-path navigation (e.g., "Open Intune admin center → Devices → Windows → Windows enrollment → Devices. Search for the device serial number.")
**D-10:** User communication scripts in blockquote callouts — tell L1 exactly what to say to the end user
**D-11:** Timing expectations included at wait steps (e.g., "This step typically takes 5-15 minutes. If longer than 20 minutes, proceed to escalation.")
**D-12:** User scripts prevent improvised explanations that set wrong expectations and cause repeat calls

**D-13:** Directory: `docs/l1-runbooks/` — matches existing `docs/decision-trees/`, `docs/error-codes/`, `docs/lifecycle/` pattern
**D-14:** Index file: `00-index.md` — landing page listing all five runbooks with one-line descriptions
**D-15:** Numbering matches L1RB requirement numbers:
  - `01-device-not-registered.md` (L1RB-01)
  - `02-esp-stuck-or-failed.md` (L1RB-02)
  - `03-profile-not-assigned.md` (L1RB-03)
  - `04-network-connectivity.md` (L1RB-04)
  - `05-oobe-failure.md` (L1RB-05)

### Claude's Discretion

- Exact prerequisites per runbook (derived from decision tree entry conditions)
- Number of steps per runbook (as many as needed for completeness)
- Specific user communication script wording
- Timing thresholds (use industry conventions and Phase 4 precedent where set — e.g., 30 min device phase, 60 min user phase)
- How many anchored sub-sections the ESP runbook needs
- Index file layout and descriptions
- Cross-links between runbooks (e.g., network runbook referenced from ESP runbook if connectivity is a factor)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| L1RB-01 | Device not in Autopilot runbook (scripted, no registry/PowerShell) | Decision tree TRE3 entry conditions; MDM enrollment error table L1 actions; Phase 2 hardware hash and registration context |
| L1RB-02 | ESP stuck or failed runbook with explicit escalation criteria | Phase 4 ESP tree terminal conditions; lifecycle/04-esp.md device/user phase breakdown; 30-min / 60-min thresholds established in Phase 4 |
| L1RB-03 | Profile not assigned runbook | Phase 4 profile tree resolution terminals (PRR1/PRR2/PRR3); lifecycle/02-profile-assignment.md dynamic vs static group timing |
| L1RB-04 | Network connectivity failure runbook | reference/endpoints.md full URL list; Phase 4 triage tree TRE1/TRE2 entry conditions |
| L1RB-05 | OOBE fails immediately runbook | Phase 4 triage tree TRA5/TRE5 entry conditions; lifecycle/03-oobe.md OOBE flow; error code tables for OOBE-phase codes |
</phase_requirements>

---

## Summary

Phase 5 produces six Markdown files: a directory index and five runbooks. The output is pure documentation — no code, no infrastructure, no schema changes. The primary research questions are (1) what content each runbook must contain given what the Phase 4 decision trees established, (2) what Intune admin center navigation paths to use for each scenario, and (3) how to structure the files to match project-established conventions.

All five runbooks share a common structural constraint: no PowerShell, no registry paths, no log file references. Every actionable step must be performable via the Intune admin center web UI or visible on the device screen. Escalation sections define the L1/L2 boundary and specify exactly what data to collect before handing off.

The Phase 4 decision trees provide precise entry conditions for each runbook. The runbooks do not re-triage — they execute the path the tree already narrowed. This separation is locked by D-05/D-06 and is the critical design principle for all five files.

**Primary recommendation:** Copy `docs/_templates/l1-template.md` as the structural starting point for each runbook. The template already enforces the no-PowerShell/no-registry constraint and provides the Prerequisites → Steps → Escalation Criteria skeleton. Adapt each section from the corresponding Phase 4 decision tree terminals and Phase 2/3 reference material.

---

## Standard Stack

This phase produces Markdown documentation only. No software libraries or package installations are involved.

### File Conventions (Project-Established, HIGH Confidence)

| Convention | Value | Source |
|------------|-------|--------|
| YAML frontmatter fields | `last_verified`, `review_by` (last_verified + 90 days), `applies_to`, `audience` | `docs/_templates/l1-template.md` |
| Version gate banner | First content block after frontmatter — links to `../apv1-vs-apv2.md` | All Phase 1–4 docs |
| Audience value | `L1` for all runbooks | `docs/_templates/l1-template.md` |
| `applies_to` value | `APv1` (runbooks cover classic Autopilot only; APv2 has no ESP and different registration flow) | `docs/decision-trees/` all four files |
| Voice | Direct second-person imperative ("Open the Intune admin center") | All Phase 1–4 L1 docs |
| First-mention glossary links | Link every Autopilot term on its first appearance per file | Phase 2/3/4 established pattern |
| No screenshots | Text descriptions with UI element names in bold | REQUIREMENTS.md Out of Scope |
| Navigation pattern | Index file + numbered files; no prev/next within runbooks | `docs/decision-trees/` pattern |
| Cross-links to phase-future content | Use "(available after Phase 6)" annotation for L2 runbook links | All Phase 4 tree files |

---

## Architecture Patterns

### Recommended Directory Structure

```
docs/
└── l1-runbooks/
    ├── 00-index.md                   (L1RB hub — lists all 5 runbooks)
    ├── 01-device-not-registered.md   (L1RB-01)
    ├── 02-esp-stuck-or-failed.md     (L1RB-02)
    ├── 03-profile-not-assigned.md    (L1RB-03)
    ├── 04-network-connectivity.md    (L1RB-04)
    └── 05-oobe-failure.md            (L1RB-05)
```

Alongside existing: `docs/decision-trees/`, `docs/error-codes/`, `docs/lifecycle/`, `docs/reference/`

### Pattern 1: Runbook Template Structure

**What:** Each runbook follows the `l1-template.md` skeleton exactly — YAML frontmatter, version gate banner, Prerequisites, Steps, Escalation Criteria.

**When to use:** All five runbooks.

**Template structure** (from `docs/_templates/l1-template.md`):
```markdown
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: APv1
audience: L1
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# [Issue Title]

## Prerequisites
- [What the L1 agent needs before starting]
- [Information to collect from the user]

## Steps
1. [Imperative action with full click-path]
2. ...

## Escalation Criteria
Escalate to L2 if:
- [Condition]

**Before escalating, collect:**
- [Data item]
```

### Pattern 2: Sub-Sectioned Runbook (ESP Only)

**What:** Where one scenario splits into two distinct execution paths (device phase vs user phase), use H2 section headers with anchor IDs to create separate numbered step sequences.

**When to use:** `02-esp-stuck-or-failed.md` only (locked decision D-07).

**Structure:**
```markdown
## Device Phase Steps {#device-phase-steps}

Entry condition: ESP shows "Setting up your device..." stuck over 30 minutes

1. ...

## User Phase Steps {#user-phase-steps}

Entry condition: ESP shows "Setting up for [username]..." stuck over 60 minutes

1. ...
```

Decision tree terminals deep-link to each section anchor (D-08).

### Pattern 3: User Communication Script Callouts

**What:** Blockquote blocks containing exact scripts for L1 agents to read aloud or relay to the end user.

**When to use:** Every runbook — at minimum at the opening (set expectations) and at any wait step.

**Example pattern:**
```markdown
> **Say to the user:** "I am going to check your device registration in our management system.
> This should only take a few minutes. Please stay on the line while I look into this."
```

Rationale (D-12): scripts prevent improvised explanations that set wrong expectations and cause repeat calls.

### Pattern 4: Timed Wait Steps

**What:** Numbered steps that involve waiting include explicit timing guidance and a threshold trigger for escalation.

**When to use:** Any step where the agent must wait for a portal sync, a reboot, or a provisioning process.

**Example pattern:**
```markdown
5. Wait for the profile status to update. This typically takes 5–15 minutes. If the status has
   not changed after 30 minutes, do not continue — proceed to Escalation Criteria.
```

Timing values are pulled from Phase 4 decision trees (30-minute device phase, 60-minute user phase) and from `docs/lifecycle/02-profile-assignment.md` (5–15 minutes for dynamic group evaluation, up to 24 hours for complex rules in large tenants).

### Pattern 5: Intune Portal Navigation Paths

**What:** Full click-path navigation for every Intune action, written as a chain of bold UI elements.

**When to use:** Every step that requires opening the Intune admin center.

**Established navigation patterns from Phase 4 trees:**

| Action | Navigation Path |
|--------|----------------|
| Find device in Autopilot portal | Intune admin center > **Devices** > **Windows** > **Enrollment** > **Windows Autopilot devices** > search by serial number |
| Check profile assignment | Intune admin center > **Devices** > **Enrollment** > **Windows Autopilot** > **Deployment Profiles** > [profile name] > **Assignments** |
| Check group membership | Intune admin center > **Groups** > search group name > **Members** |
| Check MDM enrollment status | Intune admin center > **Devices** > **Windows** > find device > **Overview** |
| Unblock device (0x80180014) | Intune admin center > **Devices** > **Windows** > find device > **Unblock device** |
| Retire stale enrollment (0x8018000a) | Intune admin center > find device > **Retire** then delete record |
| Check Intune sync trigger | Intune admin center > device record > **Sync** |
| Check user license | Microsoft 365 admin center > **Active users** > select user > **Licenses** |

### Anti-Patterns to Avoid

- **Including PowerShell commands in steps:** Template explicitly forbids this. Even `Test-AutopilotConnectivity` must not appear in an L1 runbook — reference the network endpoints page for URL-level guidance only.
- **Including registry paths in steps:** Forbidden by template and project requirements. Registry content exists only in `docs/reference/registry-paths.md` (L2 audience).
- **Referencing log files or event viewer:** L1 agents do not open Event Viewer. Log analysis is L2 scope.
- **If/then branching inside step sequences:** Locked by D-05. Where scenarios differ, use separate labeled sections (D-07).
- **Duplicating error code tables:** Runbooks reference error code files by link; they do not repeat table content inline.
- **Linking to L2 runbooks from steps:** L2 links belong only in Escalation Criteria sections, not in steps.
- **Omitting timing guidance on wait steps:** Missing timing is the primary cause of L1 premature escalation (noted in CONTEXT.md specifics).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Autopilot terminology | Define terms inline | Link to `docs/_glossary.md` on first mention | Glossary is the canonical source; definitions in runbooks create version drift |
| Error code details | Copy error table rows into runbooks | Link to `docs/error-codes/` category files | Error codes are maintained in one place; runbooks stay thin |
| Network endpoint URLs | List URLs inline in network runbook | Link to `docs/reference/endpoints.md` | Endpoints file is maintained as canonical; inline lists go stale |
| APv1/APv2 mode explanations | Re-explain mode differences | Link to `docs/apv1-vs-apv2.md` via version gate banner | Already exists; duplication creates maintenance burden |
| ESP phase explanations | Re-explain device vs user phase | Link to `docs/lifecycle/04-esp.md` for L1-accessible context | ESP lifecycle guide already covers this at appropriate depth |
| Escalation data lists | Create new collect-lists | Pull from Phase 4 decision tree Escalation Data tables | Trees define canonical collect lists; runbooks should match |

**Key insight:** Runbooks are execution guides, not knowledge bases. Every piece of reference knowledge already exists in Phases 1–4 output. Runbooks link to that material; they do not re-author it.

---

## Common Pitfalls

### Pitfall 1: Timing Mismatch Between Trees and Runbooks

**What goes wrong:** The runbook specifies a different wait threshold than the decision tree that routes into it. L1 agents get conflicting guidance.

**Why it happens:** Runbooks authored independently from the tree that feeds them.

**How to avoid:** Pull all timing values from Phase 4 tree "How to Check" tables. Established values: 30 minutes for device phase (ESD5), 60 minutes for user phase (ESD7). Profile assignment sync: 5–15 minutes for simple dynamic groups, up to 24 hours for complex rules (from `lifecycle/02-profile-assignment.md`).

**Warning signs:** A timing value in a runbook that does not appear in the corresponding Phase 4 tree.

### Pitfall 2: Broken Forward-Links from Phase 4 Trees

**What goes wrong:** Phase 4 trees contain "(available after Phase 5)" placeholder links. When Phase 5 ships, those links must be updated to real paths. If not updated, agents following tree → runbook links get 404s.

**Why it happens:** Forward-link updates not tracked as explicit tasks.

**How to avoid:** Include explicit tasks in the plan to update each Phase 4 forward-link. Affected links are in:
- `docs/decision-trees/00-initial-triage.md` — TRR1 Resolution & Next Steps
- `docs/decision-trees/01-esp-failure.md` — ESR1, ESR2, ESR3, ESR4, ESR5 Resolution & Next Steps
- `docs/decision-trees/02-profile-assignment.md` — PRR1, PRR2, PRR3 Resolution & Next Steps
- `docs/decision-trees/03-tpm-attestation.md` — TPR1, TPR2, TPR3 Resolution & Next Steps

**Warning signs:** Any `(available after Phase 5)` remaining in `docs/decision-trees/` after Phase 5 completion.

### Pitfall 3: Escalation Criteria Not Matching Tree Escalation Nodes

**What goes wrong:** Runbook escalation criteria diverge from the corresponding escalation data defined in Phase 4 trees. L1 collects different data than L2 expects.

**Why it happens:** Runbooks authored without cross-referencing Phase 4 Escalation Data tables.

**How to avoid:** For each runbook, map the tree's escalation nodes and copy their "Collect" column verbatim as the starting point for the runbook's "Before escalating, collect" list. Trees: `ESE4/ESE5` for ESP, `PRE1-PRE6` for profile, `TRE3` for device registration, `TRE1/TRE2` for network, `TRE5` for OOBE failure.

### Pitfall 4: Including Technical Content in L1 Steps

**What goes wrong:** A step that "sounds simple" actually requires registry access or PowerShell. Example: "Verify the AutopilotSettings key was written" — this is L2.

**Why it happens:** Author has L2 knowledge and defaults to technical verification steps.

**How to avoid:** Before finalizing each step, ask: "Can an L1 agent with Intune portal access and device screen visibility perform this?" If the answer requires opening a command prompt, regedit, or Event Viewer, the step is out of scope.

**Warning signs:** Any step that includes terms like "run," "execute," "check the registry," "look at the log," or "open command prompt."

### Pitfall 5: Prerequisites Too Vague to Be Actionable

**What goes wrong:** Prerequisites list items like "network connectivity confirmed" without specifying how to confirm it, leaving standalone users (D-03) without a usable check.

**Why it happens:** Prerequisites drafted quickly without considering standalone user entry path.

**How to avoid:** Each prerequisite should include a one-line check ("Verified: navigate to https://login.microsoftonline.com from a browser on the device — page loads without error"). For portal-access prerequisites, name the specific portal and what to open.

### Pitfall 6: User Communication Scripts Missing at Wait Steps

**What goes wrong:** L1 agents fill silence with improvised explanations during wait steps. Users receive inaccurate timeline predictions, call back before resolution, and the ticket re-enters the queue.

**Why it happens:** Author focuses on technical actions and omits communication guidance.

**How to avoid:** Every wait step of more than 2 minutes needs an accompanying blockquote with an explicit user script. Include realistic time estimates drawn from Phase 4 tree timing guidance.

---

## Per-Runbook Content Research

This section documents what is already established about each runbook's content from prior phase output.

### L1RB-01: Device Not Registered (`01-device-not-registered.md`)

**Entry condition from Phase 4:** Device serial number not found in Intune admin center > Devices > Windows > Enrollment > Windows Autopilot devices (TRD4 = No → TRA1 → TRE3).

**What L1 can do (no PowerShell, no registry):**
1. Verify search was performed correctly (exact serial number, not partial match)
2. Check if a hardware hash import was previously initiated
3. Confirm the serial number matches the device label/BIOS
4. In Intune portal: navigate to Windows Autopilot devices and search
5. If the device was meant to be OEM-registered, confirm OEM registration status via the Autopilot portal

**L1 cannot do:** Re-import the hardware hash (requires PowerShell and L2 execution). This is the primary escalation path.

**Escalation collect list (from TRE3):** Device serial number, device make and model, deployment mode, whether hardware hash was previously imported (yes/no/unknown), timestamp, screenshot of Autopilot devices search showing no results.

**L2 forward-link:** `docs/l2-runbooks/` (available after Phase 6)

**Error code cross-reference:** MDM enrollment errors `01-mdm-enrollment.md` — codes that appear when a device is not registered include Event 807 (ZtdDeviceIsNotRegistered) and Event 815 (ZtdDeviceHasNoAssignedProfile).

### L1RB-02: ESP Stuck or Failed (`02-esp-stuck-or-failed.md`)

**Entry conditions from Phase 4:** Routed from ESP tree resolution terminals ESR2/ESR3 (reboot resolved issue — monitor) or ESR4/ESR5 (still within time window — wait). Also linked from ESR1 (error code found — follow L1 action).

**Sub-sections required (D-07/D-08):**
1. `#device-phase-steps` — "Setting up your device..." stuck, reboot performed, now monitoring
2. `#user-phase-steps` — "Setting up for [username]..." stuck, reboot performed, now monitoring
3. Optional: `#error-code-steps` — received an error code from the ESP error table, now executing L1 action

**Key timing from Phase 4 / lifecycle/04-esp.md:**
- Device phase normal range: 15–45 minutes
- User phase normal range: 5–15 minutes
- Device phase concern threshold: 30 minutes (ESD5)
- User phase concern threshold: 60 minutes (ESD7)
- Default ESP timeout: 60 minutes (configurable to 120 min)
- Check-back intervals: every 10 min for device phase, every 15 min for user phase (from Phase 4 ESR4/ESR5)

**L1 actions available:** Monitor the Intune portal device overview for enrollment state change; check which app name is shown on the ESP screen; communicate timing expectations to user.

**App type context (from lifecycle/04-esp.md):** Only "required" apps block ESP. Available apps do not. This is the most frequent source of user confusion and an important user communication point.

**Escalation collect list (from ESE4/ESE5):** Device serial number, deployment mode, timestamp, ESP phase (device or user), time spent on ESP before and after reboot, username used during enrollment (user phase only).

### L1RB-03: Profile Not Assigned (`03-profile-not-assigned.md`)

**Entry conditions from Phase 4:** Routed from profile tree resolution terminals PRR1 (group fixed, monitor), PRR2 (reboot fixed, monitor), PRR3 (already correctly assigned).

**L1 actions available:**
1. Verify device appears in Autopilot portal
2. Check profile assignment status in Autopilot device record
3. Add device to correct Azure AD group (static group — PRR1 path)
4. Trigger Intune sync on device (from device record → Sync button)
5. Reboot device and wait for sync (PRR2 path)

**Key timing (from lifecycle/02-profile-assignment.md):**
- Static group: assignment available within minutes
- Dynamic group simple rules: 5–15 minutes
- Dynamic group complex rules (large tenant): up to 24 hours
- This timing gap (dynamic group evaluation delay) is the #1 cause of "device registered but no profile at OOBE"

**Important L1 limitation:** If the device is in the correct group but the profile is still not assigning, L1 cannot diagnose further — this requires L2 to examine assignment filters and Graph API propagation.

**Escalation collect list (from PRE1):** Device serial number, group name the device was added to, timestamp of group change, deployment mode, current profile status in portal.

### L1RB-04: Network Connectivity Failure (`04-network-connectivity.md`)

**Entry conditions from Phase 4:** Routed from initial triage escalation nodes TRE1 (no network connectivity) and TRE2 (Autopilot endpoints blocked). This runbook covers what L1 can do before handing to infrastructure.

**Key constraint:** L1 cannot run `Test-AutopilotConnectivity` (PowerShell). L1 can only use the browser to test reachability.

**L1 actions available (browser-only checks):**
1. Navigate to https://login.microsoftonline.com — verify page loads
2. Navigate to https://ztd.dds.microsoft.com — verify no certificate error or connection refused
3. Navigate to https://graph.microsoft.com — verify reachability
4. Check proxy configuration: ask user what network they're on; ask if VPN is active
5. Check clock: if OS clock is wrong by more than 5 minutes, Azure AD token validation fails (NTP dependency — time.windows.com)
6. Try wired Ethernet if only Wi-Fi was tested

**Canonical endpoint list:** All steps link to `docs/reference/endpoints.md` for the full URL list rather than embedding URLs inline.

**Critical information for user script:** Network failures at OOBE cannot be self-remediated by the user — the device must be connected to a network that allows the required endpoints. L1 should set this expectation clearly.

**Escalation collect list (from TRE1/TRE2):** Device IP address and subnet, whether Wi-Fi or Ethernet is in use, proxy configured (yes/no), browser error message shown, physical location of device, which endpoint failed.

**Escalate to:** Infrastructure/Network team (not L2 engineering — this is a network team handoff).

### L1RB-05: OOBE Fails Immediately (`05-oobe-failure.md`)

**Entry condition from Phase 4:** Routed from initial triage TRA5 (device crashed, froze, or behaved in a way not covered by other trees) → TRE5. This runbook is intentionally thin because OOBE failures without a specific error code pattern are almost always L2.

**What "OOBE fails immediately" covers:**
- Device crashes before presenting an Azure AD sign-in prompt
- OOBE freezes at an early screen (language, keyboard, or network selection)
- Device reboots to BSOD or recovery environment
- OOBE completes standard setup (no Autopilot customization — profile not loaded)
- Any OOBE failure that is not covered by ESP, Profile Assignment, or Network runbooks

**L1 actions available:**
1. Confirm device serial number against Autopilot portal (verify it is registered)
2. Confirm network connectivity (link to network runbook)
3. Confirm deployment mode expected — ask stakeholder what mode should be running
4. Document exactly what appears on screen in sequence (write it down, take a photo)
5. Perform a single power cycle and retry
6. If OOBE presents standard Windows setup (no company branding): confirm no Autopilot profile is assigned (link to profile runbook) — this may be a misroute

**Escalation collect list (from TRE5):** Device serial number, deployment mode, timestamp, detailed description of what appeared on screen, sequence of events leading to failure, screenshot if available.

**Important note on scope:** This runbook should be short and direct to escalation. OOBE failures not covered by the other four runbooks are essentially always L2 investigation territory. The value of this runbook is giving L1 a clean escalation data collection checklist and a single retry path rather than improvising.

---

## Integration Points

### Forward-Links to Update in Phase 4 Files

After Phase 5 ships, the following "(available after Phase 5)" placeholders must be resolved:

| File | Node IDs | Current Placeholder | Target |
|------|----------|--------------------|---------|
| `docs/decision-trees/00-initial-triage.md` | TRR1 | `See [L1 Runbooks](../l1-runbooks/) (available after Phase 5)` | `See [L1 Runbooks](../l1-runbooks/00-index.md)` |
| `docs/decision-trees/01-esp-failure.md` | ESR1 | `See [L1 ESP Runbook](../l1-runbooks/) (available after Phase 5)` | `See [L1 ESP Runbook](../l1-runbooks/02-esp-stuck-or-failed.md)` |
| `docs/decision-trees/01-esp-failure.md` | ESR2 | same | same |
| `docs/decision-trees/01-esp-failure.md` | ESR3 | same | same |
| `docs/decision-trees/01-esp-failure.md` | ESR4 | same | same |
| `docs/decision-trees/01-esp-failure.md` | ESR5 | same | same |
| `docs/decision-trees/02-profile-assignment.md` | PRR1 | `See [L1 Profile Runbook](../l1-runbooks/) (available after Phase 5)` | `See [L1 Profile Runbook](../l1-runbooks/03-profile-not-assigned.md)` |
| `docs/decision-trees/02-profile-assignment.md` | PRR2 | same | same |
| `docs/decision-trees/02-profile-assignment.md` | PRR3 | same | same |
| `docs/decision-trees/03-tpm-attestation.md` | TPR1 | `See [L1 TPM Runbook](../l1-runbooks/) (available after Phase 5)` | Note: TPM resolution is L2. Update link to point to `00-index.md` or remove |
| `docs/decision-trees/03-tpm-attestation.md` | TPR2 | same | same |
| `docs/decision-trees/03-tpm-attestation.md` | TPR3 | same | same |

Note on TPM tree: The TPR1/TPR2/TPR3 terminals reference L1 runbooks but there is no dedicated TPM runbook in Phase 5 (TPM scenarios are L2 by design per Phase 4 decisions). The link targets should be updated to `00-index.md` with a note that TPM scenarios not resolved by BIOS changes escalate to L2.

### Forward-Links from Phase 5 to Phase 6

Each runbook's Escalation Criteria section should link forward to L2 runbooks with "(available after Phase 6)" annotation, matching the pattern established in Phase 4.

---

## Code Examples

### YAML Frontmatter (exact values for Phase 5 files)

```yaml
---
last_verified: 2026-03-20
review_by: 2026-06-18
applies_to: APv1
audience: L1
---
```

`review_by` = `last_verified` + 90 days = 2026-06-18 (matching Phase 4 convention exactly).

### Version Gate Banner

```markdown
> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).
```

### Blockquote User Script Pattern

```markdown
> **Say to the user:** "I can see your device is currently being set up by our IT system. This
> process typically takes 20 to 30 minutes. I will check in with you in 15 minutes to confirm
> progress. If anything changes on the screen, please let me know."
```

### Timed Wait Step Pattern

```markdown
4. Wait for the profile status to update in the portal. Refresh the page every 5 minutes.
   This typically takes 5–15 minutes for static groups and up to 30 minutes for dynamic groups.
   If status has not changed after 30 minutes, do not continue — proceed to Escalation Criteria below.
```

### Escalation Criteria Section Pattern

```markdown
## Escalation Criteria

Escalate to L2 if:
- Profile status has not changed after 30 minutes following group membership correction
- Device is in the correct group but profile is still not assigning
- The wrong profile is assigned (requires admin correction, not L1 scope)
- You cannot determine which group the profile targets

**Before escalating, collect:**
- Device serial number
- Group name the device was added to (or group name it was already in)
- Timestamp when group change was made
- Deployment mode (user-driven, pre-provisioning, or self-deploying)
- Current profile status shown in the Autopilot device record (screenshot if possible)
- Any error messages visible in the portal
```

### Intune Click-Path Navigation

```markdown
1. Open the Intune admin center (https://intune.microsoft.com).
2. Navigate to **Devices** > **Windows** > **Enrollment** > **Windows Autopilot devices**.
3. In the search box, type the device serial number exactly as it appears on the device label.
4. If the device appears in the results, it is registered. If no results appear, the device is
   not registered — proceed to Escalation Criteria.
```

### Anchor Section Header (ESP Sub-Sections)

```markdown
## Device Phase Steps {#device-phase-steps}

**When to use this section:** ESP showed "Setting up your device..." and was stuck for more
than 30 minutes. You have already rebooted the device (per the ESP decision tree) and
provisioning resumed.

1. ...
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Inline URL lists in runbooks | All endpoints in `docs/reference/endpoints.md`, linked by reference | Endpoints change; single-source maintenance |
| "Check the logs" as an L1 step | Logs are L2 only; L1 steps use portal UI exclusively | Prevents L1 from attempting log analysis without training |
| "Pre-whitelist before OOBE" note about dynamic groups | Explicit timing table in `lifecycle/02-profile-assignment.md` (5–15 min simple, up to 24h complex) | Runbooks can cite real numbers rather than vague guidance |
| ESP timeout described as "60 minutes" | Configurable 60–120 minutes; default 60 min; device phase 30-min concern threshold distinct from overall timeout | Correct escalation timing prevents premature L2 escalation |

---

## Open Questions

1. **TPM tree L1 runbook links**
   - What we know: TPR1/TPR2/TPR3 in `03-tpm-attestation.md` link to an L1 TPM runbook "(available after Phase 5)". No L1RB-XX requirement covers TPM.
   - What's unclear: Should these update to `00-index.md` (directing to L2) or should they be removed?
   - Recommendation: Update TPR1/TPR2/TPR3 links to point to `docs/l1-runbooks/00-index.md` with a note in that index that TPM scenarios not resolved by BIOS changes escalate directly to L2. The index will clarify scope coverage.

2. **OOBE runbook scope boundary**
   - What we know: OOBE failure is genuinely thin L1 territory. The Phase 4 tree routes most OOBE symptoms to immediate L2 escalation.
   - What's unclear: How many steps can legitimately appear before escalation to avoid the runbook being only 3 steps long?
   - Recommendation: Structure `05-oobe-failure.md` with a prerequisite check (network connectivity, registration confirmed), a single retry step (power cycle), and a misroute check (was this actually a profile assignment issue?). This gives L1 a complete procedure even if the most common outcome is escalation.

---

## Validation Architecture

Phase 5 produces Markdown documentation with no code components. There is no test framework to run.

The validation equivalent for documentation is a structural review checklist applied per file:

| Check | Method | Applied When |
|-------|--------|--------------|
| No PowerShell commands present | Text search for `powershell`, `cmdlet`, `Invoke-`, `Get-`, `Set-` | Before each file is marked complete |
| No registry paths present | Text search for `HKLM`, `HKCU`, `regedit` | Before each file is marked complete |
| No log file references | Text search for `.log`, `Event Viewer`, `eventvwr` | Before each file is marked complete |
| YAML frontmatter present and complete | Visual check of file header | Before each file is marked complete |
| Version gate banner present | Visual check of first content block | Before each file is marked complete |
| All glossary terms linked on first mention | Check first occurrence of: ESP, OOBE, MDM, TPM, hardware hash, Autopilot, pre-provisioning, ZTD | Before each file is marked complete |
| Escalation Criteria section present | Visual check | All runbooks |
| "Before escalating, collect" list present | Visual check | All runbooks |
| Timing guidance on all wait steps | Review each numbered step involving waiting | All runbooks |
| User communication script on wait > 2 min | Review each wait step | All runbooks |
| Forward-links to Phase 4 trees updated | Check each "(available after Phase 5)" placeholder in decision-trees/ | After all runbooks are complete |

---

## Sources

### Primary (HIGH Confidence)

- `docs/_templates/l1-template.md` — Authoritative runbook structure and constraint rules (no-PowerShell, no-registry)
- `docs/decision-trees/00-initial-triage.md` — Entry conditions, escalation data, resolution terminals for all five scenarios
- `docs/decision-trees/01-esp-failure.md` — ESP tree terminals, timing thresholds, escalation collect lists
- `docs/decision-trees/02-profile-assignment.md` — Profile tree terminals, escalation collect lists
- `docs/decision-trees/03-tpm-attestation.md` — TPM tree terminals, L1 TPM link placeholders
- `docs/lifecycle/04-esp.md` — Device/user phase structure, app type tracking table, timing ranges
- `docs/lifecycle/02-profile-assignment.md` — Dynamic vs static group timing table
- `docs/lifecycle/03-oobe.md` — OOBE deployment mode paths
- `docs/reference/endpoints.md` — All 13 Autopilot network endpoints with criticality ratings
- `docs/error-codes/00-index.md` — Master error code index, quick lookup table
- `docs/error-codes/01-mdm-enrollment.md` — MDM enrollment error L1 actions (device registration scenario)
- `docs/error-codes/03-esp-enrollment.md` — ESP error L1 actions, policy conflict patterns
- `docs/_glossary.md` — 26 terms requiring first-mention links per file
- `docs/apv1-vs-apv2.md` — Version gate banner link target

### Secondary (MEDIUM Confidence)

- `docs/common-issues.md` — Existing common issues doc that will eventually be updated (Phase 7 scope); not referenced by runbooks

---

## Metadata

**Confidence breakdown:**
- Runbook structure and conventions: HIGH — template and Phase 1–4 patterns fully established
- Per-runbook content (steps): HIGH — Phase 4 trees and Phase 2/3 reference material provide all content inputs
- Timing values: HIGH — established by Phase 4 decisions (30-min device, 60-min user) and lifecycle docs
- Intune navigation paths: HIGH — established in Phase 4 How-to-Check tables
- Forward-link update requirements: HIGH — all Phase 4 placeholder links inventoried from file review

**Research date:** 2026-03-20
**Valid until:** 2026-06-18 (matches 90-day review cycle for this documentation suite)
