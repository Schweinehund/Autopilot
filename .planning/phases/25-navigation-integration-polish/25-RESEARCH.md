# Phase 25: Navigation Integration & Polish - Research

**Researched:** 2026-04-15
**Domain:** Documentation navigation, cross-platform routing, Markdown link architecture
**Confidence:** HIGH

## Summary

Phase 25 is a pure documentation wiring and polish phase. No new conceptual content is created -- every routing target already exists from Phases 20-24. The work consists of three distinct operations: (1) adding macOS ADE failure scenarios and cross-reference banners to `docs/common-issues.md`, (2) appending macOS quick-reference sections to `docs/quick-ref-l1.md` and `docs/quick-ref-l2.md`, and (3) performing a reachability audit to verify every Phase 20-24 file is accessible from `docs/index.md` within two navigation clicks.

All patterns are established and proven. The APv2 sections added in prior phases serve as exact structural templates for the macOS additions. The cross-reference banner pattern from `docs/decision-trees/00-initial-triage.md` (line 9) and `docs/decision-trees/06-macos-triage.md` (line 9) provides the exact syntax. The "Choose Your Platform" anchor pattern from `docs/index.md` (lines 17-20) provides the template for `common-issues.md`.

**Primary recommendation:** Execute as two sequential operations -- (1) file modifications for NAVX-02 and NAVX-03, then (2) reachability audit with gap fixes -- since the audit must verify the changes made in operation 1.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Use a hybrid approach: add a new `## macOS ADE Failure Scenarios` section at the bottom of `docs/common-issues.md` with its own symptom categories routing to macOS L1 and L2 runbooks, PLUS one-line cross-reference banners in shared Windows symptom categories pointing to the corresponding macOS section entry (e.g., "For macOS, see [macOS: Device Not Appearing](#device-not-appearing-in-intune)").
- **D-02:** Add a "Choose Your Platform" anchor-link section at the top of `common-issues.md` (matching the pattern in `docs/index.md` lines 17-20) with links to `#windows-autopilot-issues` and `#macos-ade-failure-scenarios`. This addresses macOS discoverability without requiring users to scroll past all Windows content.
- **D-03:** Change the H1 title from "Common Windows Autopilot Issues" to a cross-platform title (e.g., "Common Provisioning Issues" or "Common Autopilot & ADE Issues"). Update the framework banner to reflect both platforms.
- **D-04:** Update the `platform:` frontmatter from implicit Windows to `platform: all` since the file now covers both platforms.
- **D-05:** The macOS section should cover the 6 failure scenarios matching the L1 runbooks created in Phase 24: device not appearing, Setup Assistant failure, profile not applied, app not installed, compliance/access blocked, Company Portal sign-in failure. Each entry gets a symptom description + L1 runbook link + L2 runbook link (where applicable).
- **D-06:** Cross-reference banners follow the established one-line pattern from `docs/decision-trees/00-initial-triage.md` line 9: `> **macOS:** For macOS ADE troubleshooting, see [macOS ADE Triage](06-macos-triage.md).` Apply to shared symptom categories only (device registration, profile issues, app install, compliance) -- not to Windows-only categories (TPM, ESP, hybrid join).
- **D-07:** Append a `## macOS ADE Quick Reference` section to the bottom of `docs/quick-ref-l1.md`, matching how APv2 was appended. Content includes: macOS top checks (3-5 items using ABM portal + Intune admin center actions), macOS escalation triggers, macOS decision tree link, and macOS L1 runbook links.
- **D-08:** Append a `## macOS ADE Quick Reference` section to the bottom of `docs/quick-ref-l2.md`, matching how APv2 was appended. Content includes: IntuneMacODC collection command, key Terminal diagnostic commands (from `docs/reference/macos-commands.md`), critical log paths (from `docs/reference/macos-log-paths.md`), key diagnostic checks, and macOS L2 investigation runbook links.
- **D-09:** Update `platform:` frontmatter on both quick-ref cards from implicit Windows to `platform: all`.
- **D-10:** Add an anchor heading (e.g., `## macOS ADE Quick Reference`) so that `docs/index.md` macOS sections can link directly to the macOS portion of each card via fragment anchor.
- **D-11:** Perform an exhaustive file-by-file audit of every user-facing documentation file created in Phases 20-24. For each file, verify it is reachable from `docs/index.md` within 2 navigation clicks. Fix any gaps found.
- **D-12:** Exclude template files (`_templates/*.md`) and planning artifacts from the audit -- these are not user-facing documentation.
- **D-13:** The audit should produce a checklist in the plan or execution log documenting each file's reachability path (e.g., "index.md > admin-setup-macos/00-overview.md > 01-abm-configuration.md = 2 clicks").
- **D-14:** All navigation files use section-level platform separation. macOS content lives in macOS-labeled sections. Windows content lives in Windows-labeled sections. No macOS troubleshooting steps, Terminal commands, or diagnostic procedures appear within Windows sections and vice versa.
- **D-15:** One-line cross-reference banners are permitted at the top of each platform section to route users to the other platform. These are routing mechanisms, not content contamination. This follows the established pattern in `docs/decision-trees/00-initial-triage.md` (line 9) and `docs/decision-trees/06-macos-triage.md`.
- **D-16:** Cross-reference banners are bidirectional: Windows sections get "For macOS, see [link]" and macOS sections get "For Windows, see [link]" -- consistent with the symmetric pattern already in the decision tree files.

### Claude's Discretion
- Exact wording of the cross-platform H1 title for common-issues.md
- Exact macOS symptom descriptions in common-issues.md (should reflect macOS-native terminology)
- Which Windows symptom categories get cross-reference banners (use judgment on symptom overlap)
- Exact macOS top checks and escalation triggers for the L1 quick-ref card
- Selection and ordering of Terminal commands and log paths for the L2 quick-ref card
- How to structure the reachability audit checklist (inline in plan vs separate artifact)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAVX-02 | Cross-platform common-issues.md routing macOS scenarios to macOS runbooks and Windows scenarios to Windows runbooks without cross-contamination | Decisions D-01 through D-06, D-14 through D-16 specify the hybrid approach: new macOS section + cross-reference banners. All 6 macOS L1 runbooks (10-15) and 4 macOS L2 runbooks (10-13) exist as routing targets. Cross-reference banner pattern verified in 00-initial-triage.md line 9. |
| NAVX-03 | Updated L1 and L2 quick-reference cards with macOS sections (Terminal commands, log paths, key diagnostic checks) | Decisions D-07 through D-10 specify appending macOS sections matching APv2 pattern. Source content verified: macos-commands.md has 6 command references, macos-log-paths.md has 9 log path entries. APv2 section structure in both quick-ref cards provides exact template. |
</phase_requirements>

## Standard Stack

This phase involves only Markdown file editing. No libraries, packages, or tools are required.

### Tools Used
| Tool | Purpose | Why Standard |
|------|---------|--------------|
| Markdown | Documentation format | Project convention; all docs are .md |
| YAML frontmatter | Metadata (platform, audience, dates) | Established pattern across all docs files |
| Mermaid (optional) | Flow diagrams | Used in admin-setup-macos/00-overview.md; not needed for Phase 25 |

## Architecture Patterns

### File Modification Map

Four existing files are modified. No new files are created.

```
docs/
├── common-issues.md          # MODIFY: add platform selector, macOS section, cross-ref banners, update title/frontmatter
├── quick-ref-l1.md           # MODIFY: append macOS section, update frontmatter
├── quick-ref-l2.md           # MODIFY: append macOS section, update frontmatter
└── index.md                  # MODIFY: add quick-ref macOS fragment anchors to macOS L1/L2 tables
```

### Pattern 1: Platform Section Appending (APv2 Template)

**What:** Add a new `## macOS ADE` section at the bottom of an existing file, separated by `---`, following how APv2 was appended.

**When to use:** For quick-ref-l1.md and quick-ref-l2.md (D-07, D-08).

**Template from quick-ref-l1.md (APv2 section, lines 50-79):**

```markdown
---

## APv2 Quick Reference

**Framework:** APv2 (Device Preparation)

### Top 3 Checks

1. **Check name** -- Description
2. **Check name** -- Description
3. **Check name** -- Description

### APv2 Escalation Triggers

- Condition --> **Escalate L2** (collect: data items)
- Condition --> **Check** using [runbook link](path)

### APv2 Decision Tree

- [APv2 Device Preparation Triage](decision-trees/04-apv2-triage.md) -- start here

### APv2 Runbooks

- [Runbook Name](l1-runbooks/06-file.md)
```

The macOS section follows this exact structure with macOS-specific content.

### Pattern 2: Cross-Reference Banners

**What:** One-line blockquote redirecting users to the other platform's equivalent section.

**When to use:** In shared symptom categories of common-issues.md (D-06, D-15, D-16).

**Verified pattern from `docs/decision-trees/00-initial-triage.md` line 9:**

```markdown
> **macOS:** For macOS ADE troubleshooting, see [macOS ADE Triage](06-macos-triage.md).
```

**Reverse pattern from `docs/decision-trees/06-macos-triage.md` line 9:**

```markdown
> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Initial Triage Decision Tree](00-initial-triage.md).
```

For common-issues.md, the banner format should be:

```markdown
> **macOS:** For the macOS equivalent, see [macOS: Device Not Appearing](#device-not-appearing-in-intune).
```

### Pattern 3: Platform Selector at Top of File

**What:** Anchor-link navigation list letting users jump to their platform section.

**When to use:** For common-issues.md (D-02).

**Verified pattern from `docs/index.md` lines 17-20:**

```markdown
## Choose Your Platform

- [Windows Autopilot](#windows-autopilot) -- description
- [macOS Provisioning](#macos-provisioning) -- description
- [Cross-Platform References](#cross-platform-references) -- description
```

### Pattern 4: Frontmatter Update

**What:** Change frontmatter `platform:` field to `all` and `applies_to:` to include macOS context.

**When to use:** For all three modified files (D-04, D-09).

**Before (common-issues.md):**
```yaml
---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: all
---
```

**After:**
```yaml
---
last_verified: 2026-04-15
review_by: 2026-07-14
applies_to: both
audience: all
platform: all
---
```

### Anti-Patterns to Avoid

- **Cross-contamination:** Placing macOS Terminal commands inside Windows sections or Windows PowerShell inside macOS sections. All platform content must stay in its labeled section.
- **Inline content in banners:** Cross-reference banners must be one-line routing links, not multi-line content. They route; they don't teach.
- **Orphaned anchors:** Creating heading anchors (e.g., `#device-not-appearing-in-intune`) that don't match what cross-reference banners link to. Verify anchor IDs match.
- **Breaking existing links:** When modifying common-issues.md H1 and H2 headings, existing links from other files that point to `common-issues.md` anchors could break. Verify no external files link to renamed anchors.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Anchor ID generation | Custom anchor IDs with manual `{#id}` syntax | Default Markdown heading-to-anchor conversion | All existing files use default anchors; consistency matters |
| Cross-reference tracking | Manual link lists | grep-based audit during execution | The file set is small (44 files); automated search is sufficient |

## Common Pitfalls

### Pitfall 1: Broken Anchor Links After Heading Renames

**What goes wrong:** Renaming the H1 from "Common Windows Autopilot Issues" changes the default anchor from `#common-windows-autopilot-issues` to whatever the new title generates. Any existing file linking to the old anchor breaks silently.

**Why it happens:** Markdown generates anchors from heading text. Heading changes mean anchor changes.

**How to avoid:** Before renaming any heading, grep the entire docs/ directory for the old anchor text. Currently, `docs/index.md` line 138 links to `common-issues.md` (no anchor fragment), so the H1 rename is safe. But also check for any links to specific H2 anchors within common-issues.md.

**Warning signs:** After changes, grep for any `common-issues.md#` links in the codebase and verify they still resolve.

### Pitfall 2: Windows Symptom Categories That Overlap macOS

**What goes wrong:** Adding cross-reference banners to the wrong Windows sections, or missing shared categories.

**Why it happens:** Some failure categories are shared (device registration, profile issues, app install, compliance) while others are Windows-only (TPM, ESP, hybrid join, device rename).

**How to avoid:** The CONTEXT.md (D-06) explicitly specifies: apply banners to shared symptom categories only (device registration, profile issues, app install, compliance). Do NOT add banners to: ESP Failures, TPM Attestation Failures, Hybrid Join Failures, Device Renamed, APv2-specific sections, or Migration Issues.

**Specific mapping for cross-reference banners in common-issues.md:**

| Windows Section | Gets macOS Banner? | macOS Target |
|-----------------|-------------------|--------------|
| Device Registration Issues | YES | `#device-not-appearing-in-intune` |
| Enrollment Status Page (ESP) Failures | NO | Windows-only concept |
| Profile Assignment Issues | YES | `#configuration-profile-not-applied` |
| TPM Attestation Failures | NO | Windows-only concept |
| Network Connectivity Issues | MAYBE (judgment) | macOS has different endpoints but similar symptom |
| Policy Conflicts | NO | Windows-specific (AppLocker, DeviceLock) |
| Hybrid Join Failures | NO | Windows-only concept |
| Device Renamed but Old Name Persists | NO | Windows-only scenario |
| APv2 Failure Scenarios | NO | Different framework entirely |
| Device Reset and Lifecycle Issues | NO | Windows device operations |
| Migration Issues | NO | Windows migration scenarios |
| Security and Enrollment Issues | MAYBE (judgment) | CA enrollment timing applies cross-platform |

**Recommended banners (4 total):**
1. Device Registration Issues -> macOS device not appearing
2. Profile Assignment Issues -> macOS profile not applied
3. Network Connectivity Issues -> left to discretion (weak overlap)
4. Security and Enrollment Issues -> left to discretion (CA timing is cross-platform but content is Windows-focused)

### Pitfall 3: Quick-Ref Card Content Exceeds "Quick Reference" Scope

**What goes wrong:** The macOS section in quick-ref cards becomes too detailed, duplicating content from the full reference files.

**Why it happens:** `macos-commands.md` has 6 commands with full syntax and `macos-log-paths.md` has 9 paths. Including everything defeats the "quick reference" purpose.

**How to avoid:** Follow the APv2 pattern -- the APv2 section in `quick-ref-l2.md` includes only the log collection command, one event log path, and key event ID ranges. For macOS L2, include: IntuneMacODC command, top 3 Terminal commands (`profiles status`, `log show`, `system_profiler`), and the 3 most critical log paths. Link to full references for everything else.

### Pitfall 4: Missing index.md Updates for Quick-Ref Fragment Anchors

**What goes wrong:** Quick-ref cards get macOS sections with proper anchors, but index.md's macOS L1 and L2 tables don't link to them. Users in the macOS section of index.md can't find the quick-ref cards.

**Why it happens:** The index.md macOS L1 and L2 tables were populated in Phase 24 but didn't include quick-ref links because the macOS sections didn't exist yet.

**How to avoid:** After adding the macOS sections to quick-ref cards, add rows to the macOS L1 and L2 tables in index.md linking to `quick-ref-l1.md#macos-ade-quick-reference` and `quick-ref-l2.md#macos-ade-quick-reference`.

**Current state verified:** index.md macOS L1 table (lines 100-104) has no quick-ref link. macOS L2 table (lines 108-115) has no quick-ref link. Windows tables at lines 37 and 63 DO link to the quick-ref cards. This is the gap to fix.

### Pitfall 5: Reachability Audit Miscounting Clicks

**What goes wrong:** Counting a file as "reachable in 2 clicks" when it actually requires 3 clicks, or miscounting because the first click from index.md is counted as click 0.

**Why it happens:** Ambiguity in what "2 clicks" means (2 clicks starting from index.md means you land on page 3 in the chain).

**How to avoid:** Define clearly: index.md is the starting point (click 0). First click lands on page 1. Second click lands on page 2. A file at page 2 depth is "2 clicks away." For example: index.md -> reference/00-index.md (1 click) -> ca-enrollment-timing.md (2 clicks) = PASS.

## Code Examples

### Example 1: common-issues.md Platform Selector (D-02)

Insert after the frontmatter block and framework banner, before the current H1:

```markdown
## Choose Your Platform

- [Windows Autopilot Issues](#windows-autopilot-issues) -- Windows device provisioning failures (APv1 and APv2)
- [macOS ADE Failure Scenarios](#macos-ade-failure-scenarios) -- macOS enrollment and management failures
```

Note: The existing H1 "Common Windows Autopilot Issues" must be changed (D-03). The `#windows-autopilot-issues` anchor will need to match a new H2 heading that groups all Windows content.

### Example 2: Cross-Reference Banner in Device Registration Section (D-06)

```markdown
## Device Registration Issues

> **macOS:** For macOS device not appearing in Intune, see [macOS: Device Not Appearing](#device-not-appearing-in-intune).

Device serial number not appearing in the [Autopilot](_glossary.md#autopilot) portal after [OOBE](_glossary.md#oobe).
```

### Example 3: macOS Section in common-issues.md (D-01, D-05)

```markdown
---

## macOS ADE Failure Scenarios

> **Windows:** For Windows Autopilot issues, see [Windows Autopilot Issues](#windows-autopilot-issues).

**Platform:** macOS ADE (Automated Device Enrollment)

Symptom-based index routing to the appropriate macOS L1 and L2 runbooks. Start with the [macOS ADE Triage Decision Tree](decision-trees/06-macos-triage.md) to identify the failure scenario.

### Device Not Appearing in Intune

Mac serial number not found in Intune admin center after ADE enrollment attempt.

- **L1:** [Device Not Appearing](l1-runbooks/10-macos-device-not-appearing.md)
- **L2:** [macOS Log Collection](l2-runbooks/10-macos-log-collection.md) + case-by-case investigation

### Setup Assistant Stuck or Failed

Setup Assistant authentication failure, Await Configuration stuck, or network connectivity issue during enrollment.

- **L1:** [Setup Assistant Failed](l1-runbooks/11-macos-setup-assistant-failed.md)
- **L2:** [macOS Log Collection](l2-runbooks/10-macos-log-collection.md) + [Profile Delivery Investigation](l2-runbooks/11-macos-profile-delivery.md)

### Configuration Profile Not Applied

Expected configuration (Wi-Fi, VPN, FileVault, restrictions) missing after enrollment.

- **L1:** [Profile Not Applied](l1-runbooks/12-macos-profile-not-applied.md)
- **L2:** [Profile Delivery Investigation](l2-runbooks/11-macos-profile-delivery.md)

### App Not Installed

DMG, PKG, or VPP app not installed or showing failed status after enrollment.

- **L1:** [App Not Installed](l1-runbooks/13-macos-app-not-installed.md)
- **L2:** [App Install Failure Diagnosis](l2-runbooks/12-macos-app-install.md)

### Compliance Failure or Access Blocked

Device non-compliant in Intune or user cannot access Microsoft 365 resources despite enrollment.

- **L1:** [Compliance / Access Blocked](l1-runbooks/14-macos-compliance-access-blocked.md)
- **L2:** [Compliance Evaluation Investigation](l2-runbooks/13-macos-compliance.md)

### Company Portal Sign-In Failure

Company Portal not available, sign-in failing, or Entra registration incomplete.

- **L1:** [Company Portal Sign-In](l1-runbooks/15-macos-company-portal-sign-in.md)
- **L2:** [Compliance Evaluation Investigation](l2-runbooks/13-macos-compliance.md) (for Entra registration issues)
```

### Example 4: macOS L1 Quick-Reference Section (D-07)

```markdown
---

## macOS ADE Quick Reference

**Platform:** macOS ADE (Automated Device Enrollment)

### Top Checks

1. **Device in ABM?** -- Apple Business Manager > Devices -- search by serial number, verify MDM server assignment shows your Intune MDM server name
2. **Device in Intune?** -- Intune admin center > Devices > macOS -- search by serial number, check enrollment status
3. **Enrollment profile assigned?** -- Intune > Devices > Enrollment > Apple > Enrollment program tokens > [token] > Profiles -- verify profile is assigned to the device
4. **Compliance state?** -- Intune > Devices > macOS > [device] > Device compliance -- check for "Compliant" or review non-compliant settings

### macOS Escalation Triggers

- Serial in ABM but device not in Intune after 24 hours --> **Escalate L2** (collect: serial number, ABM MDM server assignment screenshot, Intune enrollment status)
- Setup Assistant stuck or authentication failure after one retry --> **Escalate L2** (collect: serial number, screenshot of error, macOS version)
- Configuration profile not applied after 4-hour sync wait and manual sync --> **Escalate L2** (collect: serial number, expected profile name, Intune device compliance screenshot)
- App showing "Failed" in Intune after reinstall attempt --> **Escalate L2** (collect: app name, app type, Intune app install status screenshot)
- Device non-compliant but user believes settings are correct --> **Escalate L2** (collect: non-compliant setting names, device serial)

### macOS Decision Tree

- [macOS ADE Triage](decision-trees/06-macos-triage.md) -- start here for macOS ADE failures

### macOS Runbooks

- [Device Not Appearing](l1-runbooks/10-macos-device-not-appearing.md)
- [Setup Assistant Failed](l1-runbooks/11-macos-setup-assistant-failed.md)
- [Profile Not Applied](l1-runbooks/12-macos-profile-not-applied.md)
- [App Not Installed](l1-runbooks/13-macos-app-not-installed.md)
- [Compliance / Access Blocked](l1-runbooks/14-macos-compliance-access-blocked.md)
- [Company Portal Sign-In](l1-runbooks/15-macos-company-portal-sign-in.md)
```

### Example 5: macOS L2 Quick-Reference Section (D-08)

```markdown
---

## macOS ADE Quick Reference

**Platform:** macOS ADE (Automated Device Enrollment)

### macOS Log Collection

Download and run IntuneMacODC:
```bash
curl -L https://aka.ms/IntuneMacODC -o IntuneMacODC.sh
chmod u+x ./IntuneMacODC.sh
sudo ./IntuneMacODC.sh
```

### Key Terminal Commands

```bash
# Check MDM enrollment status
profiles status -type enrollment

# List installed configuration profiles
sudo profiles show

# Query MDM events from last hour
log show --predicate 'subsystem == "com.apple.ManagedClient"' --info --last 1h

# Output all profile data
system_profiler SPConfigurationProfileDataType

# Verify Intune agent running
pgrep -il "^IntuneMdm"
```

### Critical Log Paths

| Path | Purpose |
|------|---------|
| `/Library/Logs/Microsoft/Intune/IntuneMDMDaemon*.log` | Intune daemon -- PKG/DMG installs, scripts, policy |
| `~/Library/Logs/Microsoft/Intune/IntuneMDMAgent*.log` | Intune agent -- user-context scripts, user policy |
| `/Library/Logs/Microsoft/Intune/CompanyPortal*.log` | Company Portal enrollment, registration, compliance |

Unified log subsystems: `com.apple.ManagedClient` (profile events), `com.apple.ManagedClient.cloudconfigurationd` (ADE enrollment)

Full reference: [macOS Terminal Commands](reference/macos-commands.md) | [macOS Log Paths](reference/macos-log-paths.md)

### macOS Investigation Runbooks

- [macOS Log Collection Guide](l2-runbooks/10-macos-log-collection.md) -- prerequisite for all macOS investigations
- [Profile Delivery Investigation](l2-runbooks/11-macos-profile-delivery.md)
- [App Install Failure Diagnosis](l2-runbooks/12-macos-app-install.md)
- [Compliance Evaluation Investigation](l2-runbooks/13-macos-compliance.md)
```

## Reachability Audit: Pre-Research

### Complete File Inventory (Phases 20-24)

44 user-facing documentation files were created across Phases 20-24. Template files are excluded per D-12.

### Current Reachability Analysis

**REACHABLE in 1 click from index.md (direct link):**

| File | Link in index.md |
|------|-------------------|
| `docs/_glossary-macos.md` | Line 132 |
| `docs/windows-vs-macos.md` | Lines 10, 133 |
| `docs/macos-lifecycle/00-ade-lifecycle.md` | Lines 96, 102, 110, 121 |
| `docs/decision-trees/06-macos-triage.md` | Line 103 |
| `docs/decision-trees/05-device-lifecycle.md` | Line 90 |
| `docs/device-operations/00-overview.md` | Line 89 |
| `docs/admin-setup-macos/00-overview.md` | Line 123 |
| `docs/reference/00-index.md` | Lines 139, 140, 141 |
| `docs/reference/macos-capability-matrix.md` | Line 142 |
| `docs/reference/macos-commands.md` | Line 111 |
| `docs/reference/macos-log-paths.md` | Line 112 |
| `docs/l1-runbooks/00-index.md` | Line 104 (with #macos-ade-runbooks anchor) |
| `docs/l2-runbooks/00-index.md` | Line 115 (with #macos-ade-runbooks anchor) |
| `docs/l2-runbooks/10-macos-log-collection.md` | Line 114 |
| `docs/common-issues.md` | Line 138 |

**REACHABLE in 2 clicks from index.md (via intermediate page):**

| File | Path (index.md -> intermediate -> target) |
|------|---------------------------------------------|
| `docs/admin-setup-macos/01-abm-configuration.md` | index.md -> admin-setup-macos/00-overview.md -> 01-abm-configuration.md |
| `docs/admin-setup-macos/02-enrollment-profile.md` | index.md -> admin-setup-macos/00-overview.md -> 02-enrollment-profile.md |
| `docs/admin-setup-macos/03-configuration-profiles.md` | index.md -> admin-setup-macos/00-overview.md -> 03-configuration-profiles.md |
| `docs/admin-setup-macos/04-app-deployment.md` | index.md -> admin-setup-macos/00-overview.md -> 04-app-deployment.md |
| `docs/admin-setup-macos/05-compliance-policy.md` | index.md -> admin-setup-macos/00-overview.md -> 05-compliance-policy.md |
| `docs/admin-setup-macos/06-config-failures.md` | index.md -> admin-setup-macos/00-overview.md -> 06-config-failures.md |
| `docs/device-operations/01-autopilot-reset.md` | index.md -> device-operations/00-overview.md -> 01-autopilot-reset.md |
| `docs/device-operations/02-retire-wipe.md` | index.md -> device-operations/00-overview.md -> 02-retire-wipe.md |
| `docs/device-operations/03-re-provisioning.md` | index.md -> device-operations/00-overview.md -> 03-re-provisioning.md |
| `docs/device-operations/04-tenant-migration.md` | index.md -> device-operations/00-overview.md -> 04-tenant-migration.md |
| `docs/l1-runbooks/10-macos-device-not-appearing.md` | index.md -> l1-runbooks/00-index.md -> 10-macos-device-not-appearing.md |
| `docs/l1-runbooks/11-macos-setup-assistant-failed.md` | index.md -> l1-runbooks/00-index.md -> 11-macos-setup-assistant-failed.md |
| `docs/l1-runbooks/12-macos-profile-not-applied.md` | index.md -> l1-runbooks/00-index.md -> 12-macos-profile-not-applied.md |
| `docs/l1-runbooks/13-macos-app-not-installed.md` | index.md -> l1-runbooks/00-index.md -> 13-macos-app-not-installed.md |
| `docs/l1-runbooks/14-macos-compliance-access-blocked.md` | index.md -> l1-runbooks/00-index.md -> 14-macos-compliance-access-blocked.md |
| `docs/l1-runbooks/15-macos-company-portal-sign-in.md` | index.md -> l1-runbooks/00-index.md -> 15-macos-company-portal-sign-in.md |
| `docs/l2-runbooks/11-macos-profile-delivery.md` | index.md -> l2-runbooks/00-index.md -> 11-macos-profile-delivery.md |
| `docs/l2-runbooks/12-macos-app-install.md` | index.md -> l2-runbooks/00-index.md -> 12-macos-app-install.md |
| `docs/l2-runbooks/13-macos-compliance.md` | index.md -> l2-runbooks/00-index.md -> 13-macos-compliance.md |
| `docs/reference/apv1-apv2-migration.md` | index.md -> reference/00-index.md -> apv1-apv2-migration.md |
| `docs/reference/ca-enrollment-timing.md` | index.md -> reference/00-index.md -> ca-enrollment-timing.md (also: index.md -> common-issues.md -> ca-enrollment-timing.md) |
| `docs/reference/compliance-timing.md` | index.md -> reference/00-index.md -> compliance-timing.md |
| `docs/reference/deployment-reporting.md` | index.md -> reference/00-index.md -> deployment-reporting.md |
| `docs/reference/drift-detection.md` | index.md -> reference/00-index.md -> drift-detection.md |
| `docs/reference/entra-prerequisites.md` | index.md -> reference/00-index.md -> entra-prerequisites.md |
| `docs/reference/esp-timeout-tuning.md` | index.md -> reference/00-index.md -> esp-timeout-tuning.md |
| `docs/reference/gpo-to-intune.md` | index.md -> reference/00-index.md -> gpo-to-intune.md |
| `docs/reference/imaging-to-autopilot.md` | index.md -> reference/00-index.md -> imaging-to-autopilot.md |
| `docs/reference/licensing-matrix.md` | index.md -> reference/00-index.md -> licensing-matrix.md |
| `docs/reference/network-infrastructure.md` | index.md -> reference/00-index.md -> network-infrastructure.md |
| `docs/reference/new-batch-workflow.md` | index.md -> reference/00-index.md -> new-batch-workflow.md |
| `docs/reference/security-baseline-conflicts.md` | index.md -> reference/00-index.md -> security-baseline-conflicts.md |
| `docs/reference/win32-app-packaging.md` | index.md -> reference/00-index.md -> win32-app-packaging.md |

**GAPS IDENTIFIED (require fixing in Phase 25):**

| Gap | Issue | Fix |
|-----|-------|-----|
| Quick-ref macOS anchors in index.md | index.md macOS L1 table (lines 100-104) has no link to `quick-ref-l1.md#macos-ade-quick-reference`. macOS L2 table (lines 108-115) has no link to `quick-ref-l2.md#macos-ade-quick-reference`. | Add quick-ref card rows to macOS L1 and L2 tables in index.md after macOS sections are added to quick-ref cards. |

**VERDICT:** All 44 files are currently reachable within 2 clicks. The only gap is the missing quick-ref card links in the macOS sections of index.md, which will be created as part of the D-10 work. No existing files are orphaned.

## Structural Details for Implementation

### common-issues.md Modification Plan

The file has the following structure that must be preserved/extended:

1. **Frontmatter** (lines 1-6) -- update `platform: all`
2. **Framework banner** (lines 8-9) -- update to mention macOS ADE
3. **H1 title** (line 11) -- rename to cross-platform title
4. **"Not sure which framework?"** note (line 13) -- update to include macOS path
5. **Symptom index text** (lines 15-16) -- currently says "APv1 (classic)", needs platform label
6. **Windows APv1 sections** (lines 19-73) -- add cross-ref banners to 2-4 shared categories
7. **APv2 section** (lines 76-107) -- no changes needed
8. **Device Reset section** (lines 109-115) -- no changes needed
9. **Migration section** (lines 117-122) -- no changes needed
10. **Security section** (lines 124-131) -- may get a cross-ref banner (discretion)
11. **NEW: Platform selector** -- insert after framework banner, before content
12. **NEW: macOS ADE Failure Scenarios section** -- append after Security section, before Version History
13. **Version History** (lines 133-138) -- add new entry

**Heading architecture for anchor resolution:**

The current structure uses `##` for all symptom categories. Per D-02, the platform selector links to `#windows-autopilot-issues` and `#macos-ade-failure-scenarios`. This means either:
- Option A: Wrap all Windows content under a new `## Windows Autopilot Issues` heading, or
- Option B: Use the existing content as-is and let the platform selector link to the first Windows H2.

**Recommendation:** Option A -- add a `## Windows Autopilot Issues` heading above the first symptom category. This creates a clean anchor target and mirrors the pattern in index.md where Windows and macOS are peer-level H2 headings. The existing `##` symptom categories become `###` under this parent heading. However, this changes many heading levels. The simpler approach is to keep the existing structure and make the platform selector link to the first visible section (e.g., a hidden anchor `<a id="windows-autopilot-issues"></a>` above "Device Registration Issues").

**Final recommendation:** Use an HTML anchor tag `<a id="windows-autopilot-issues"></a>` before the first Windows section to avoid restructuring all existing heading levels. The macOS section already uses `## macOS ADE Failure Scenarios` as its H2, which auto-generates the correct anchor.

### quick-ref-l1.md Modification Plan

1. **Frontmatter** (lines 1-6) -- add `platform: all`
2. **Framework banner** (lines 8-9) -- update to mention macOS ADE
3. **Existing content** (lines 11-79) -- no changes
4. **NEW: macOS section** -- append after line 79 with `---` separator

### quick-ref-l2.md Modification Plan

1. **Frontmatter** (lines 1-6) -- add `platform: all`
2. **Framework banner** (lines 8-9) -- update to mention macOS ADE
3. **Existing content** (lines 11-128) -- no changes
4. **NEW: macOS section** -- append after line 128 with `---` separator

### index.md Modification Plan

1. **macOS L1 table** (around lines 100-104) -- add row: `| [L1 Quick-Reference Card](quick-ref-l1.md#macos-ade-quick-reference) | One-page cheat sheet -- macOS top checks and escalation triggers |`
2. **macOS L2 table** (around lines 108-115) -- add row: `| [L2 Quick-Reference Card](quick-ref-l2.md#macos-ade-quick-reference) | One-page cheat sheet -- macOS Terminal commands, log paths, investigation runbooks |`

## Open Questions

1. **Network Connectivity cross-reference banner (discretion)**
   - What we know: macOS has different required endpoints (Apple URLs for ADE). The symptom "cannot reach endpoints" exists on both platforms but the resolution is completely different.
   - What's unclear: Whether a cross-reference banner in the Network Connectivity section adds value or creates confusion.
   - Recommendation: Skip the banner. The macOS section has its own symptom categories. Network issues on macOS manifest as "device not appearing" or "Setup Assistant failed," not as a standalone network symptom. The L1 runbooks already handle routing.

2. **Security and Enrollment cross-reference banner (discretion)**
   - What we know: `reference/ca-enrollment-timing.md` explicitly covers both Windows and macOS (WSEC-01).
   - What's unclear: Whether the common-issues.md Security section should get a macOS banner since the routing targets are admin-level reference docs, not L1/L2 runbooks.
   - Recommendation: Skip. The Security section routes to admin reference docs, not L1/L2 runbooks. macOS compliance issues are covered in the new macOS section. Adding a banner here would be routing to a different audience level (admin vs L1).

## Sources

### Primary (HIGH confidence)
- Direct file inspection of all 44 Phase 20-24 files in `docs/` directory
- Direct file inspection of all 4 target files (`common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `index.md`)
- Direct file inspection of pattern source files (`00-initial-triage.md`, `06-macos-triage.md`)
- Git history for Phase 20-24 file creation audit

### Secondary (MEDIUM confidence)
- None needed -- this is purely internal documentation structure work

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no external dependencies, pure Markdown editing
- Architecture: HIGH -- all patterns verified by direct inspection of existing files
- Pitfalls: HIGH -- all anchor links and cross-references verified by grep against codebase
- Reachability audit: HIGH -- exhaustive file-by-file tracing completed with evidence

**Research date:** 2026-04-15
**Valid until:** 2026-05-15 (stable -- documentation structure changes only with new phases)
