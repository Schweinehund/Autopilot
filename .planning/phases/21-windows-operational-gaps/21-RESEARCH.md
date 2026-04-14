# Phase 21: Windows Operational Gaps - Research

**Researched:** 2026-04-13
**Domain:** Windows Autopilot operational documentation — device lifecycle, infrastructure, security, migration, monitoring
**Confidence:** HIGH (18 of 18 requirements have official Microsoft Learn sources)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Folder Organization**
- D-01: Create `docs/device-operations/` for post-enrollment MDM operations (WDLC-01 through WDLC-04). Do NOT extend `docs/lifecycle/`.
- D-02: Extend `docs/reference/` for infrastructure, security, and monitoring docs (WINF-01 through WINF-05, WSEC-01 through WSEC-03, WMON-01 through WMON-03).
- D-03: Place migration docs (WMIG-01 through WMIG-03) in `docs/reference/`.
- D-04: Do NOT extend `docs/lifecycle/` with post-deployment content. The "Feeds into: outside lifecycle scope" fence in `lifecycle/05-post-enrollment.md` is intentional and must be preserved.
- D-05: Do NOT create 5 new sub-domain folders. Avoid shallow folder sprawl.
- D-06: Follow `00-overview.md` or `00-index.md` convention for both `device-operations/` and new `reference/` additions.

**Content Overlap Handling**
- D-07: WINF-01 (network deep-dive) links to `docs/reference/endpoints.md` as canonical URL source. Does NOT duplicate the endpoint table.
- D-08: `docs/reference/endpoints.md` stays unchanged (57 lines). New docs link TO it.
- D-09: WDLC docs go in `docs/device-operations/`. A "See also" link from `lifecycle/05-post-enrollment.md` points to device-operations/.
- D-10: WSEC-01 (Conditional Access enrollment timing) is standalone with `platform: Windows` frontmatter.

**Migration Guide Format**
- D-11: Adapt `docs/_templates/admin-template.md` for all 3 migration guides. No new migration template.
- D-12: Add optional Rollback/Recovery section to migration guides (after Steps, before Verification). For WMIG-01, rollback is fleet-level ("stop migrating new devices"), not device-level.
- D-13: Reword "What breaks if misconfigured" callouts for migration context: "What breaks if sequenced incorrectly."
- D-14: Add optional Migration Prerequisites subsection for source-environment requirements.
- D-15: Use `applies_to: both` frontmatter for migration docs covering APv1 and APv2.
- D-16: WMIG-01's feature gap matrix is a standard Markdown table. Link to `apv1-vs-apv2.md` rather than duplicating.
- D-17: WMIG-03 (GPO→Intune) is structured by outcome ("Require device encryption"), NOT by GPO setting name. Include "Do not migrate" list.
- D-18: WMIG-01 models ongoing coexistence (weeks/months), not a start-to-finish cutover.

**Audience Targeting**
- D-19: Use primary audience with cross-tier callouts: `> **L1 Action:**` and `> **Admin Note:**` extend the existing `> **L2 Note:**` pattern.
- D-20: `audience: both` = L1+L2; `audience: all` = L1+L2+admin. Apply appropriate tag per doc.
- D-21: Most Phase 21 docs are `audience: admin`. WDLC docs are `audience: both`.
- D-22: Do NOT create separate L1/L2 file variants. Divergent procedures go in cross-tier callout blocks.
- D-23: WDLC-04 (tenant-to-tenant migration) is `audience: admin`.

### Claude's Discretion
- Exact file numbering within `device-operations/` and new `reference/` additions
- Whether `reference/` needs sub-sections or a new index file for the expanded content
- Exact wording for version gate adaptations in migration guides
- Ordering and grouping of WINF/WSEC/WMON docs within `reference/`
- Whether WINF-05 (ESP timeout tuning) cross-references or extends `admin-setup-apv1/03-esp-policy.md` content
- How to handle the `common-issues.md` routing table updates for new content areas
- Whether `device-operations/` needs a decision-tree entry in `docs/decision-trees/`

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| WDLC-01 | Autopilot Reset documentation (local and remote) with step-by-step procedures, data preservation behavior, and when-to-use guidance | Full Microsoft Learn doc fetched; local vs remote procedure, preserved items, WinRE prerequisite documented |
| WDLC-02 | Device retirement and wipe documentation covering all five remove/reset actions with "what do you want to preserve" decision tree | All 5 actions (Reset, Retire, Wipe, Fresh Start, Deregister) researched; decision tree placement in decision-trees/ confirmed |
| WDLC-03 | Device re-provisioning guide for ownership transfer and re-enrollment scenarios with prerequisite checklist | Covered by research on deregistration + re-registration flow; ownership transfer steps documented |
| WDLC-04 | Tenant-to-tenant device migration guide with deregistration, hardware hash re-import, and profile reassignment procedures | Microsoft Community Hub support tip fetched; online vs offline migration methods documented |
| WINF-01 | Network infrastructure deep-dive with exact firewall/proxy rules, split-tunnel VPN considerations, and test commands for each endpoint | Official requirements doc fetched; existing `reference/endpoints.md` is canonical source to link to |
| WINF-02 | Entra ID prerequisite configuration checklist with per-setting consequence documentation | MDM user scope, device limit, auto-enrollment configured — consequences verified from official docs |
| WINF-03 | Licensing matrix documenting which Microsoft 365/Intune SKUs enable which Autopilot features | Official requirements doc licensing tab fetched; M365 BP, E3, E5, F1/F3, A1/A3/A5, EMS E3/E5 all documented |
| WINF-04 | Win32 app packaging best practices for ESP reliability including detection rules, install order dependencies | Detection methods (MSI code, file, registry, PowerShell), IME flow, ESP tracking requirements researched |
| WINF-05 | ESP timeout tuning guide with recommended values by scenario and misconfiguration consequences | Existing `admin-setup-apv1/03-esp-policy.md` has comprehensive timeout content; WINF-05 extends with scenario matrix |
| WSEC-01 | Conditional Access enrollment timing guide explaining the chicken-and-egg compliance problem with resolution patterns | Chicken-and-egg problem verified; Microsoft Intune Enrollment app exclusion documented; grace period details found |
| WSEC-02 | Security baseline interaction with Autopilot provisioning — which settings conflict with enrollment flow | BitLocker CSP timing issue, LAPS policy timing during pre-provisioning, KB5065848 BitLocker issue documented |
| WSEC-03 | Compliance policy timing guide covering evaluation schedule, grace periods, and compliance state transitions | Evaluation timing (15-30 min post-enrollment), grace period (minimum 0.25 days), state transitions researched |
| WMIG-01 | APv1-to-APv2 parallel deployment playbook (coexistence model) with readiness checklist, feature gap matrix, deregistration prerequisites | APv1/APv2 coexistence confirmed; feature gap researched (hybrid, pre-provisioning, self-deploying are v1-only) |
| WMIG-02 | On-prem imaging to Autopilot transition guide covering MDT/SCCM replacement with Autopilot equivalents and app packaging | MDT retirement timeline confirmed (post-Oct 2025 no updates); migration paths documented (Autopilot, ConfigMgr OSD, hybrid) |
| WMIG-03 | GPO-to-Intune migration guide using Group Policy Analytics with percentage-based mapping reports | GPA tool fully documented; readiness report categories (Ready, Not supported, Deprecated); outcome-based approach confirmed |
| WMON-01 | Intune deployment reporting guide for Autopilot with report types, filters, export options, success rate interpretation | Deployment reports in Devices > Monitor; 30-day history; APv2 near-real-time monitoring; enrollment time grouping failures report documented |
| WMON-02 | Registration and profile assignment drift detection with proactive monitoring procedures and remediation steps | Profile assignment states (Not assigned / Assigning / Assigned / Fix pending), hardware change detection, Endpoint Analytics documented |
| WMON-03 | New-batch-of-devices operational workflow from OEM order through first user login with checkpoint verification | End-to-end flow documented: OEM order → hash collection → Intune import → group assignment → profile assignment → provisioning → verification |
</phase_requirements>

---

## Summary

Phase 21 is a documentation delivery phase — 18 files covering Windows Autopilot operational gaps beyond initial provisioning. No new code is written. The planner must map 18 requirements to 18 markdown files, placed in two new folders (`docs/device-operations/` and expanded `docs/reference/`), following the established `admin-template.md` pattern with per-setting "What breaks if misconfigured" callouts.

The technical content is well-documented in official Microsoft Learn sources. The highest-complexity areas are (1) the Conditional Access enrollment timing problem (WSEC-01), which requires explaining a multi-step chicken-and-egg scenario with platform-specific resolution; (2) the APv1-to-APv2 coexistence migration (WMIG-01), where the coexistence framing — not a one-shot cutover — requires careful structural decisions; and (3) GPO-to-Intune migration (WMIG-03), where outcome-based organization rather than GPO-name organization is a non-obvious structural choice. All three have been researched against official sources.

The phase depends on Phase 20 completion: `platform: Windows` frontmatter and the admin-template.md must exist before Phase 21 content can be written. Both exist as of 2026-04-13. The file numbering within new folders and the reference/ grouping order are at Claude's discretion per the context decisions.

**Primary recommendation:** Use the admin-template.md pattern for all 18 files. Write content files first (numbered), then overview/index files last (they link to content that must already exist — established pattern from v1.0/v1.1).

---

## Standard Stack

### Core (Documentation Tools)

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Markdown | GitHub Flavored | All doc files | Project convention; all existing docs use GFM |
| YAML frontmatter | N/A | `last_verified`, `review_by`, `applies_to`, `audience`, `platform` | Established in all existing files |
| Mermaid | N/A | Decision tree diagrams | Already used in lifecycle/00-overview.md and decision-trees/ |

### Frontmatter Fields (verified from existing files)

```yaml
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD         # last_verified + 90 days
applies_to: APv1 | APv2 | both
audience: L1 | L2 | admin | both | all
platform: Windows | macOS | all
```

**Phase 21 audience assignments:**
- `audience: both` — WDLC-01, WDLC-02, WDLC-03 (L1 handles basic resets, L2 investigates complex scenarios)
- `audience: admin` — WDLC-04, WINF-01 through WINF-05, WSEC-01 through WSEC-03, WMIG-01 through WMIG-03, WMON-01 through WMON-03

**Phase 21 applies_to assignments:**
- `applies_to: APv1` — WDLC-01 (Autopilot Reset is APv1-only per apv1-vs-apv2.md feature table)
- `applies_to: both` — WDLC-02, WDLC-03, WDLC-04, WINF-01 through WINF-05, WSEC-01 through WSEC-03, WMIG-01, WMIG-03, WMON-01 through WMON-03
- `applies_to: both` with version gate text adapted — WMIG-01 (covers migration FROM APv1 TO APv2), WMIG-02 (MDT/SCCM migration applies to both scenarios)

---

## Architecture Patterns

### New Folder Structure

```
docs/
├── device-operations/           # NEW: post-enrollment MDM operations (D-01)
│   ├── 00-overview.md           # Index/overview per folder convention (D-06)
│   ├── 01-autopilot-reset.md    # WDLC-01
│   ├── 02-retire-wipe.md        # WDLC-02
│   ├── 03-re-provisioning.md    # WDLC-03
│   └── 04-tenant-migration.md   # WDLC-04
├── reference/                   # EXTENDED: infrastructure, security, migration, monitoring
│   ├── endpoints.md             # UNCHANGED (57 lines, 16 inbound links)
│   ├── powershell-ref.md        # UNCHANGED
│   ├── registry-paths.md        # UNCHANGED
│   ├── 00-index.md              # NEW if reference/ grows large enough (Claude's discretion)
│   ├── network-infrastructure.md    # WINF-01
│   ├── entra-prerequisites.md       # WINF-02
│   ├── licensing-matrix.md          # WINF-03
│   ├── win32-app-packaging.md        # WINF-04
│   ├── esp-timeout-tuning.md         # WINF-05
│   ├── ca-enrollment-timing.md       # WSEC-01
│   ├── security-baseline-conflicts.md # WSEC-02
│   ├── compliance-timing.md          # WSEC-03
│   ├── apv1-apv2-migration.md        # WMIG-01
│   ├── imaging-to-autopilot.md       # WMIG-02
│   ├── gpo-to-intune.md              # WMIG-03
│   ├── deployment-reporting.md       # WMON-01
│   ├── drift-detection.md            # WMON-02
│   └── new-batch-workflow.md         # WMON-03
```

**Note on file naming:** Exact file names and numbering within `reference/` are at Claude's discretion (per D-discretion). The naming above is the recommended scheme — descriptive, no number prefix in reference/ (existing files have no number prefix: `endpoints.md`, not `01-endpoints.md`). The `device-operations/` folder uses numeric prefix (consistent with `admin-setup-apv1/` convention).

### Pattern 1: Admin Guide with Per-Setting Callouts (All 18 docs)

All Phase 21 docs use the admin-template.md pattern:

```markdown
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: both
audience: admin
platform: Windows
---

> **Version gate:** [context sentence]

# [Title]

## Prerequisites
- [Required role/license/prior config]

## Steps
### Step 1: [Action]
1. Navigate to **Intune admin center** > [path]
2. Configure **[setting]**: [value]

   > **What breaks if misconfigured:** [specific consequence]
   > See: [Runbook or reference link]

## Verification
- [ ] [Specific check]

## Configuration-Caused Failures
| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|

## See Also
- [related docs]
```

### Pattern 2: Decision Tree for WDLC-02 (Device Retirement)

WDLC-02 requires a "what do you want to preserve?" decision tree. Placement: `docs/decision-trees/` following the existing numbered decision tree convention (`00-initial-triage.md`, `01-esp-failure.md`, etc.).

**Decision logic:**
```
{What do you want to preserve?}
├─ User data → RETIRE (removes org data, keeps personal)
├─ Org enrollment + settings (next user, same org) → AUTOPILOT RESET (APv1 only)
├─ Nothing (device being decommissioned) → WIPE (factory reset)
├─ Clean Windows, keep user docs → FRESH START
└─ Remove from records only (already wiped) → DELETE (Intune record only)
```

### Pattern 3: Migration Guides (WMIG-01 through WMIG-03)

Migration guides use admin-template.md with these additions per D-11 through D-18:

```markdown
## Migration Prerequisites
- [Source environment requirements]
- [e.g., "SCCM client version X or higher"]

## Steps
### Step 1: [Migration action]
   > **What breaks if sequenced incorrectly:** [consequence]

## Rollback/Recovery
[Fleet-level rollback description for WMIG-01]

## Verification
- [ ] [checkpoint]
```

### Pattern 4: Cross-Tier Callout Blocks (D-19 to D-22)

```markdown
> **L1 Action:** [What L1 can do in the portal without PowerShell]

> **L2 Note:** [Technical detail for L2 investigation]

> **Admin Note:** [Configuration context for admins in L1/L2-primary docs]
```

**Constraint:** L1 callout blocks MUST NOT contain PowerShell commands or registry paths (per l1-template.md rules).

### Anti-Patterns to Avoid

- **Extending lifecycle/**: Do NOT add WDLC content to `docs/lifecycle/`. The "Feeds into: outside lifecycle scope" statement in `lifecycle/05-post-enrollment.md` must be preserved (D-04).
- **Duplicating endpoint table**: WINF-01 discusses firewall rules FOR the endpoints. It does NOT reproduce the URL table from `reference/endpoints.md` (D-07, D-08).
- **Creating separate L1/L2 file variants**: Divergent procedures go in callout blocks within the primary doc (D-22).
- **Extending `lifecycle/05-post-enrollment.md` with full content**: Only add a "See also" link pointing to `device-operations/` (D-09).
- **Writing navigation files first**: `device-operations/00-overview.md`, `index.md` updates, `common-issues.md` updates all go LAST — they link to content that must exist first.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Five-action comparison table (Reset/Retire/Wipe/Fresh Start/Delete) | Custom matrix | Official Microsoft Learn action docs (fetched) | Microsoft owns the authoritative definition of each action's behavior |
| Endpoint firewall rules | Custom URL list | Link to `reference/endpoints.md` (D-07, D-08) | `endpoints.md` has 16 inbound links; duplicating breaks single-source-of-truth |
| GPO migration report | Custom guide | Group Policy Analytics tool in Intune admin center | GPA automatically updates mappings when Microsoft adds CSP support |
| APv1 vs APv2 feature gap matrix | Rebuild in WMIG-01 | Link to `docs/apv1-vs-apv2.md` feature table (D-16) | Already maintained, 18-row table |
| Licensing table | Invent from memory | Official requirements page licensing tab | SKU list changes; authoritative source updated July 2025 |

**Key insight:** Every "don't hand-roll" item in Phase 21 is a data accuracy risk — licensing changes, endpoint URLs change, feature parity evolves. Always cite the official source and prefer linking over duplicating.

---

## Runtime State Inventory

> Not applicable — Phase 21 is a greenfield documentation creation phase. No rename, refactor, or migration of existing code or state. No runtime state inventory required.

---

## Common Pitfalls

### Pitfall 1: Autopilot Reset Scope Confusion (WDLC-01)
**What goes wrong:** Doc incorrectly states Autopilot Reset re-runs OOBE. It does NOT — after reset the device goes directly to the lock screen.
**Why it happens:** "Reset" and "re-provisioning" are semantically close but behaviorally different.
**How to avoid:** Use official language: "returns device to a business-ready state — user signs in at the lock screen (no OOBE re-runs)."
**Warning signs:** Any doc that says "goes through Autopilot setup again" after a Reset.

### Pitfall 2: Hybrid Join Limitation for Autopilot Reset (WDLC-01)
**What goes wrong:** Doc doesn't call out that Autopilot Reset does NOT support Hybrid Entra joined devices.
**Why it happens:** The limitation is in a Note callout in the official doc, easy to miss.
**How to avoid:** Include explicit callout: "Autopilot Reset is NOT supported for Microsoft Entra hybrid joined devices or Surface Hub devices. A full Wipe is required for hybrid devices."
**Source:** Microsoft Learn, `windows-autopilot-reset.md` (fetched)

### Pitfall 3: Remote vs Local Reset — Timing Difference (WDLC-01)
**What goes wrong:** Doc implies remote reset happens immediately.
**Why it happens:** Local reset is immediate; remote reset fires on next Intune check-in.
**How to avoid:** Document the timing difference explicitly: "Remote reset initiates on the next Intune check-in, not immediately."
**Warning signs:** Doc says "immediately" without qualifying local vs remote.

### Pitfall 4: Tenant Migration — "Avoid Autopilot Reset" (WDLC-04)
**What goes wrong:** Admin uses "Autopilot Reset" instead of "Reset this PC" during tenant migration.
**Why it happens:** Autopilot Reset maintains the Intune connection to the OLD tenant, not the new one.
**How to avoid:** Explicitly state: "Do NOT use Autopilot Reset during tenant migration. Use 'Reset this PC' in Windows Settings or the Intune Wipe action."
**Source:** Microsoft Community Hub support tip on tenant transfers (fetched)

### Pitfall 5: Compliance Evaluation vs Non-Compliant State (WSEC-03)
**What goes wrong:** Admin treats "Not evaluated" the same as "Non-compliant."
**Why it happens:** Portal shows both as non-green states; new admins don't distinguish them.
**How to avoid:** Document the three states explicitly: Not evaluated (expected for 15-30 min post-enrollment), Non-compliant (policy evaluated and device fails), Compliant (policy evaluated and device passes).
**Source:** Also documented in `lifecycle/05-post-enrollment.md` — WSEC-03 expands on this.

### Pitfall 6: CA Policy Blocks Enrollment (WSEC-01)
**What goes wrong:** Admin creates a "Require compliant device" CA policy for all cloud apps without excluding Intune enrollment — new devices cannot enroll.
**Why it happens:** A new device cannot be compliant before it enrolls; CA blocks the enrollment that would make it compliant.
**How to avoid:** Always exclude "Microsoft Intune Enrollment" app from CA policies requiring device compliance. Document the built-in exclusion behavior and what happens if it's manually removed.
**Warning signs:** New devices fail enrollment with auth errors post-CA-policy deployment.

### Pitfall 7: GPO Migration — 1:1 Setting Name Mapping (WMIG-03)
**What goes wrong:** Admin searches for their GPO setting name in Intune and can't find it; assumes the setting doesn't exist.
**Why it happens:** Intune uses outcome-based naming; GPO uses policy path naming.
**How to avoid:** Use Group Policy Analytics tool (import XML → view MDM Support column) rather than manual name lookup. Structure WMIG-03 by outcome, not by GPO path.
**Warning signs:** Admin says "this GPO setting doesn't exist in Intune" without having run GPA.

### Pitfall 8: Win32 App Detection Rule — File Exists vs Version Check (WINF-04)
**What goes wrong:** Detection rule uses file-exists check; app updates silently pass detection even when old version is installed.
**Why it happens:** File-exists rule returns true for any version; version check is more precise.
**How to avoid:** Use file-version detection rule for apps that update in-place. Use registry-value detection when no reliable file path exists.

### Pitfall 9: WINF-05 Extending vs Duplicating ESP Policy Content
**What goes wrong:** WINF-05 (ESP timeout tuning) duplicates the timeout table already in `admin-setup-apv1/03-esp-policy.md`.
**Why it happens:** WINF-05 covers the same setting but from a "scenario-based tuning" angle vs the "what is this setting" angle.
**How to avoid:** WINF-05 links to `admin-setup-apv1/03-esp-policy.md` for the setting definition. WINF-05 adds the scenario matrix (standard 60 min, hybrid 100 min, pre-provisioning varies, APv2 N/A) and the misconfiguration consequence table.

---

## Code Examples

Verified from official sources:

### Local Autopilot Reset — Enable Policy via Intune
```
Platform: Windows 10 and later
Profile type: Device restrictions
Category: General
Setting: Autopilot Reset → Allow
```
Source: [Windows Autopilot Reset](https://learn.microsoft.com/en-us/autopilot/windows-autopilot-reset)

### Local Autopilot Reset — Trigger on Device
```
Lock screen → CTRL + WIN + R → sign in with local admin account
```
Source: [Windows Autopilot Reset](https://learn.microsoft.com/en-us/autopilot/windows-autopilot-reset)

### Remote Autopilot Reset — Intune Admin Center
```
Devices > All devices > select device > ... > Autopilot Reset
```
Source: [Remote Windows Autopilot Reset](https://learn.microsoft.com/en-us/autopilot/tutorial/reset/remote-autopilot-reset)

### WinRE Verification (Required for Autopilot Reset)
```cmd
reagentc.exe /enable
```
Source: [Windows Autopilot Reset](https://learn.microsoft.com/en-us/autopilot/windows-autopilot-reset)

### Tenant Migration — Hardware Hash Collection
```powershell
# Standard collection approach
Get-WindowsAutoPilotInfo -online
# Or via Configuration Manager
```
Source: [Microsoft Community Hub — tenant transfer support tip](https://techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-how-to-transfer-windows-autopilot-devices-between-tenants/3920555)

### Group Policy Analytics — Import Path
```
Intune admin center > Devices > Manage devices > Group Policy analytics > Import
```
Source: [Use Microsoft Intune to import and analyze group policies](https://learn.microsoft.com/en-us/intune/intune-service/configuration/group-policy-analytics)

### Deployment Reports — Navigation Path
```
Intune admin center > Devices > Monitor > Windows Autopilot deployments
```
(30-day history, filterable, exportable)
Source: [Windows Autopilot reporting](https://learn.microsoft.com/en-us/autopilot/device-preparation/reporting-monitoring)

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| MDT for imaging | Autopilot (APv1/APv2) + ConfigMgr OSD | MDT retired post-Oct 2025 | WMIG-02 must explicitly note MDT end-of-life |
| 1:1 GPO-to-Intune manual mapping | Group Policy Analytics tool (percentage report + Settings Catalog migration) | GPA continuously updated | WMIG-03 must explain GPA as the workflow entry point |
| Pre-staging hardware hashes for all devices | APv2 removes hash requirement (corporate identifiers instead) | 2023 (APv2 GA) | WMIG-01 readiness checklist: no hash pre-staging needed for APv2 target |
| Manual compliance CA exclusion setup | Microsoft Intune Enrollment app excluded by default | Before 2025 | WSEC-01 must document the default behavior AND what happens if removed |
| APv1 only | APv1 + APv2 coexistence (APv1 wins if both registered) | 2023 | WMIG-01: silent APv1 wins — must document this pitfall |
| WhiteGlove terminology | Pre-provisioning (renamed 2021) | 2021 | Don't use "white glove" in new Phase 21 docs |

**Deprecated/outdated:**
- **MDT**: No updates, fixes, or support after first ConfigMgr release post-Oct 2025. Downloads removed from official channels.
- **"White glove" terminology**: Renamed to "pre-provisioning" in 2021. Existing `03-esp-policy.md` already uses "pre-provisioning."
- **Autopilot Reset on Hybrid Entra joined devices**: Not supported — requires full Wipe.

---

## Technical Domain Reference: All 18 Requirements

### WDLC-01: Autopilot Reset

**What gets preserved:**
- Wi-Fi connection details (credentials)
- Provisioning packages previously applied
- Microsoft Entra device membership
- MDM enrollment information
- SCEP certificates

**What is REMOVED:**
- Personal files, apps, and settings
- User profile

**Behavior post-reset:** Device goes to lock screen (not OOBE). User signs in. Primary user and Entra device owner are removed on remote reset (next sign-in sets new primary user). Local reset does NOT update primary user automatically.

**Prerequisites:**
- Local reset: `DisableAutomaticReDeploymentCredentials` policy set to Allow; requires local admin credentials to trigger
- Remote reset: Device must be MDM managed + Entra ID joined; Intune Service Administrator role required
- Both: WinRE must be enabled (`reagentc.exe /enable`)

**Hard limits:**
- NOT supported for Hybrid Entra joined devices
- NOT supported for Surface Hub devices
- Remote reset fires at next Intune check-in (not immediate)

Source: HIGH — [Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/windows-autopilot-reset), fetched 2026-04-13

### WDLC-02: Device Retirement and Wipe — All Five Actions

| Action | What it does | What is preserved | Enrollment state | When to use |
|--------|-------------|-------------------|-----------------|-------------|
| Autopilot Reset | Removes personal files, re-applies org settings | Wi-Fi, SCEP certs, Entra membership, MDM enrollment | Stays enrolled | Ownership transfer within same org; device re-use (APv1 only) |
| Retire | Removes org data, apps, policies | Personal data, user files | Unenrolled from Intune | BYOD offboarding; employee departure, personal device |
| Wipe | Factory reset | Nothing (or optionally Wi-Fi state) | Unenrolled | Lost/stolen device; full decommission; hybrid devices needing reset |
| Fresh Start | Removes OEM bloatware + apps | User documents (Home folder contents) | Stays Entra joined, re-enrolls MDM | Cleaning up a corporate device without losing user files |
| Delete (Deregister) | Removes Intune record only | Nothing (physical device unchanged) | Device unenrolled and Autopilot record removed | Stale records cleanup; pre-tenant migration; devices physically wiped already |

**Decision tree entry point (for WDLC-02):** "What do you want to preserve?"

Source: HIGH — multiple Microsoft Learn remote actions pages, community comparisons verified against official docs

### WDLC-03: Re-Provisioning

**Ownership transfer scenario:** Device assigned to departing employee → perform Retire (removes org data) → Wipe if clean slate required → re-import hardware hash if APv1 → assign to new user → user goes through enrollment.

**Re-enrollment prerequisites checklist:**
- [ ] Old user's Entra account no longer the primary user
- [ ] Device removed from old user's group membership (if targeted by group)
- [ ] Autopilot profile assigned to the correct group for new user's context
- [ ] Device limit per user not exceeded for new user (Entra ID setting)
- [ ] For APv1: verify hardware hash still current (no hardware changes since last import)

### WDLC-04: Tenant-to-Tenant Migration

**Two methods:**
1. **Online migration** (tight timeline, days): Collect hashes → delete from Tenant A → import to Tenant B → Reset this PC (NOT Autopilot Reset)
2. **Offline migration** (large batches, weeks): Deregister in batches → create JSON profile for Tenant B → deploy to `%windir%\provisioning\autopilot\AutoPilotConfigurationFile.json` → full wipe

**Critical warnings:**
- Do NOT use Autopilot Reset during migration (leaves device managed by old tenant)
- 500-device batch limit for hash upload
- "Leaving too much time between removal from Tenant A and Tenant B can be a challenge" — devices may become unmanaged
- No undo after deletion from Tenant A
- Tenant migration is "not a supported scenario for Intune" — best-effort only

Source: MEDIUM — [Microsoft Community Hub support tip](https://techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-how-to-transfer-windows-autopilot-devices-between-tenants/3920555) (verified as official Microsoft support blog)

### WINF-01: Network Infrastructure Deep-Dive

**Key additions beyond the endpoint table in `reference/endpoints.md`:**
- Split-tunnel VPN: Autopilot must reach all required endpoints WITHOUT going through the corporate VPN (VPN profile isn't applied yet during OOBE)
- Proxy settings: Must be configured on the proxy server itself; Intune policy proxy configuration is NOT fully supported and may cause unexpected behavior during Autopilot
- Firewall rules: Port 80 (HTTP), 443 (HTTPS), 123 UDP (NTP) must be open for all endpoints
- Test commands for each critical endpoint (extend the test commands from `reference/endpoints.md`)

Source: HIGH — [Microsoft Learn requirements page](https://learn.microsoft.com/en-us/autopilot/requirements), networking tab, fetched 2026-04-13

### WINF-02: Entra ID Prerequisites

**Required configurations with consequences:**

| Setting | Where | Consequence if Missing/Wrong |
|---------|-------|------------------------------|
| MDM user scope | Entra ID > Mobility (MDM and MAM) > Intune | None = no automatic MDM enrollment; Some = only selected users enroll |
| Auto-enrollment enabled | Same location | Without this, devices Entra-join but don't enroll in Intune |
| Device limit per user | Entra ID > Devices > Device settings | If user has reached limit, enrollment fails silently |
| User can join devices to Entra | Entra ID > Devices > Device settings | If None, user-driven mode fails at Entra join step |
| MDM authority = Intune | Intune admin center | Required before any enrollment |
| WIP user scope | Entra ID > Mobility | Must be None or Some; cannot overlap with MDM user scope |

Source: HIGH — [Microsoft Learn — Enable MDM automatic enrollment](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/windows-enroll), official requirements page

### WINF-03: Licensing Matrix

**Required licenses (any one of):**
- Microsoft 365 Business Premium
- Microsoft 365 F1 or F3
- Microsoft 365 A1, A3, or A5 (Academic)
- Microsoft 365 E3 or E5
- Enterprise Mobility + Security E3 or E5
- Intune for Education
- Microsoft Entra ID P1 or P2 + Microsoft Intune subscription (standalone)

**Feature-to-SKU mapping key points:**
- Dynamic device groups (for profile assignment) require Entra ID Premium (P1 minimum) — included in all M365 plans above
- APv2 Device Preparation: same licensing requirements as APv1
- Pre-provisioning and self-deploying modes: no additional license beyond base Autopilot license
- Windows Subscription Activation (Pro → Enterprise uplift): included in E3/E5; NOT in Business Premium

Source: HIGH — [Microsoft Learn requirements page](https://learn.microsoft.com/en-us/autopilot/requirements), licensing tab, fetched 2026-04-13

### WINF-04: Win32 App Packaging for ESP

**Detection rule priority order (most to least reliable):**
1. MSI product code — deterministic for MSI installs
2. File version check — for non-MSI apps that update in place
3. Registry key/value — when no reliable file path exists
4. PowerShell custom script — only when above methods insufficient (performance cost)

**ESP tracking requirements for Win32 apps:**
- Must be assigned as Required to a device group (device-targeted = Device phase tracking)
- Must be assigned as Required to a user group (user-targeted = User phase tracking)
- Available assignment = never tracked by ESP, never blocks desktop
- Up to 100 apps in the ESP blocking list (Selected mode); All = every required app blocks

**Install order: dependency chain**
- Win32 apps support dependency declarations in Intune
- App A can be listed as a dependency of App B → App A installs first
- Circular dependencies fail silently; IME logs show the conflict

**Avoid mixing Win32 + LOB (MSI) as Required in same ESP deployment** — TrustedInstaller conflict causes hang (already documented in `admin-setup-apv1/03-esp-policy.md`)

Source: HIGH — [Microsoft Learn Win32 app management](https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-app-management)

### WINF-05: ESP Timeout Tuning

**Recommended timeout values by scenario:**

| Scenario | Recommended Timeout | Reasoning |
|----------|---------------------|-----------|
| Standard Entra join (cloud-only) | 60 minutes | Baseline |
| Hybrid Entra join | 100 minutes | ODJ connector adds ~40 min to configured timeout |
| Pre-provisioning (technician phase) | 60 minutes | Device phase only; user phase happens separately at user sign-in |
| Large app payload (5+ GB) | 90-120 minutes | Delivery Optimization download time varies |
| Windows quality updates enabled | Add 20-40 minutes | Quality update setting adds to base timeout budget |

**This doc extends, not duplicates, `admin-setup-apv1/03-esp-policy.md`:** That file documents what each timeout setting does and its "what breaks" consequence. WINF-05 adds the scenario matrix above, which does not exist in `03-esp-policy.md`.

Source: HIGH — `docs/admin-setup-apv1/03-esp-policy.md` (existing project file, verified)

### WSEC-01: Conditional Access Enrollment Timing

**The chicken-and-egg problem:**
1. Admin creates CA policy: "Require device compliance" for all cloud apps
2. New device enrolls → not yet evaluated for compliance → CA blocks access → enrollment fails
3. Without enrollment, device can never become compliant

**Built-in mitigations (verified from official sources):**
- Microsoft Intune Enrollment app is excluded by default from CA compliance policies
- Company Portal app has built-in exclusions from certain CA grant controls
- These exclusions solve the enrollment loop for the common case

**What admins break it by doing:**
- Creating a CA policy that explicitly includes "Microsoft Intune Enrollment" or removes default exclusions
- Creating an "All cloud apps" policy with no exclusion list and no service exceptions

**Resolution patterns:**
1. Exclude "Microsoft Intune Enrollment" from compliance-requiring CA policies
2. Use the "Report-only" CA mode when rolling out new compliance policies
3. Stage compliance rollout: enforce After a grace period (minimum 0.25 days) rather than immediately

Source: MEDIUM — verified from multiple sources (ctrlshiftenter.cloud verified with official Microsoft docs; Microsoft Q&A answers reference official behavior)

### WSEC-02: Security Baseline Conflicts

**Known conflict areas:**

| Security Feature | Conflict with Autopilot | Timing Issue | Mitigation |
|-----------------|------------------------|--------------|-----------|
| BitLocker CSP | BitLocker policy "kicks in too late" — may not apply during ESP device phase | Policy received but encryption starts after ESP | Use a separate BitLocker policy targeted to device group, not security baseline |
| LAPS policy | LAPS not applied until user phase begins | Device phase completes without LAPS | Accept timing or use pre-provisioning to apply during technician phase |
| AppLocker/WDAC | Can block Intune Management Extension itself | IME blocked = Win32 apps fail | Always allow-list IME processes in application control policies |
| Reboot policies | Immediate reboot settings conflict with ESP | ESP can be interrupted by forced reboot | Use maintenance windows or defer reboots until post-ESP |

**KB5065848 known issue (2025):** BitLocker not applying + device stuck on Identifying during Autopilot. Mitigate by ensuring the KB is installed or excluded from the patch forcing order.

Source: HIGH — [Microsoft Learn known issues](https://learn.microsoft.com/en-us/autopilot/known-issues), [BitLocker enforcement issues](https://learn.microsoft.com/en-us/troubleshoot/windows-client/windows-security/enforcing-bitlocker-policies-by-using-intune-known-issues)

### WSEC-03: Compliance Policy Timing

**Compliance state timeline post-enrollment:**
- 0-15 min: Device shows "Not evaluated" (compliance check not yet run)
- 15-30 min: First compliance evaluation completes; device shows Compliant or Non-compliant
- Up to 8 hours: Full Intune inventory sync (app status, hardware inventory reflect in portal)

**Grace period:** Minimum 0.25 days (6 hours). Grace period gives time to fix non-compliant settings before enforcement actions (notify, block, wipe) trigger.

**State distinction:**
- "Not evaluated" = expected waiting state post-enrollment. Not a failure.
- "Non-compliant" = policy evaluated and device fails. Investigate.
- "Compliant" = policy evaluated and passes.

**CA integration:** Once non-compliant is set (after grace period), CA "require compliant device" policies immediately block access for that device.

Source: HIGH — `lifecycle/05-post-enrollment.md` (project file); WSEC-03 expands on the compliance section

### WMIG-01: APv1-to-APv2 Coexistence Migration

**Coexistence model (not cutover):**
- Both frameworks can run simultaneously in the same tenant
- Different device populations use different frameworks
- When BOTH APv1 profile AND APv2 policy apply to a device, APv1 silently wins

**APv1-to-APv2 readiness checklist:**
- [ ] All target devices running Windows 11 22H2 or later
- [ ] No requirement for hybrid Entra join (APv2 does not support)
- [ ] No requirement for pre-provisioning/white glove (APv2 does not support)
- [ ] No requirement for self-deploying mode for kiosks (APv2 does not support)
- [ ] Max 25 apps during deployment (APv2 limit vs APv1's 100)
- [ ] Hardware hash pre-staging NOT required (APv2 benefit)
- [ ] Enrollment Time Grouping security group created and configured
- [ ] Existing APv1 hardware hash registration removed before APv2 policy assigned (or APv1 profile deleted from device group)

**Feature gap matrix:** Link to `docs/apv1-vs-apv2.md` feature table. Add a "Blocker" column for WMIG-01 context ("Yes/No" — is this gap a migration blocker?).

**Migration pace:** No required timeline. Migrate by device category when ready (e.g., "migrate all new purchases to APv2 starting [date]; existing fleet stays APv1 until refresh").

Source: HIGH — `docs/apv1-vs-apv2.md` (project file, verified); search results confirmed coexistence behavior

### WMIG-02: On-Prem Imaging to Autopilot

**MDT retirement context (important for doc accuracy):**
- MDT receives no further updates, fixes, or support after first ConfigMgr release post-Oct 2025
- Downloads pulled from official channels
- MDT-based task sequences must be replaced

**Migration paths from imaging to Autopilot:**

| Source | Target | Notes |
|--------|--------|-------|
| MDT task sequence | Autopilot user-driven (APv1/APv2) | Replace TS apps with Intune Win32 apps |
| MDT task sequence | ConfigMgr OSD | Direct evolution of MDT; supported if SCCM site exists |
| SCCM OSD | Autopilot for Existing Devices | JSON profile copied during task sequence; requires wipe |
| Manual imaging | Autopilot | Collect hash during imaging; re-image to clean state |

**Autopilot for Existing Devices limitation:** JSON file only supports user-driven Entra join and hybrid join profiles. Self-deploying and pre-provisioning NOT supported via JSON.

**App packaging migration:** For each task sequence app:
1. Identify installer format (MSI, EXE, custom)
2. Package as Win32 (.intunewin) using Microsoft Win32 Content Prep Tool
3. Set detection rule (version check preferred)
4. Assign to device groups as Required
5. Set as ESP blocking app if critical to deployment

**Migration Prerequisites subsection content:**
- SCCM client version: document minimum for MDT-SCCM integration scenarios
- GPO baseline documented before migration (feeds WMIG-03)
- App inventory: all task sequence apps cataloged with version and detection criteria

Source: HIGH — [Microsoft Learn Autopilot for Existing Devices](https://learn.microsoft.com/en-us/autopilot/tutorial/existing-devices/create-autopilot-task-sequence); community sources corroborated MDT retirement

### WMIG-03: GPO-to-Intune Migration

**Tool:** Group Policy Analytics (GPA) built into Intune admin center
**Path:** Devices > Manage devices > Group Policy analytics

**GPA workflow:**
1. Export GPO as XML from Group Policy Management Console (GPMC.msc)
2. Import XML into GPA (max 4 MB per file, Unicode encoding required)
3. Review MDM Support percentage (auto-calculated)
4. Expand report to see per-setting MDM Support: Yes / No / Deprecated
5. For supported settings: migrate to Settings Catalog policy via GPA migration feature
6. For unsupported settings: document as "Do not migrate" or use Custom OMA-URI profile

**MDM Support categories in report:**
- Ready for migration: matching Intune setting exists in Settings Catalog
- Not supported: no MDM equivalent (typically not exposed to MDM providers)
- Deprecated: applies to old Windows/Edge versions

**Outcome-based organization for WMIG-03 content:**
Document migration by business outcome rather than GPO path:
- "Require device encryption" → BitLocker CSP settings
- "Enforce password complexity" → Policy CSP/DeviceLock settings
- "Control USB access" → Settings Catalog Removable Storage settings
- etc.

**"Do not migrate" list examples:**
- Login scripts (use Intune PowerShell scripts instead, or remediation scripts)
- Folder redirection (use OneDrive Known Folder Move instead)
- IE Enhanced Security settings (IE deprecated)
- WMI filter-based GPOs (no Intune equivalent for WMI filtering)
- Environment-specific GPOs (domain-specific paths, printer mappings to on-prem)

Source: HIGH — [Microsoft Learn Group Policy Analytics](https://learn.microsoft.com/en-us/intune/intune-service/configuration/group-policy-analytics), full page fetched 2026-04-13

### WMON-01: Deployment Reporting

**Available report types:**
- **Windows Autopilot deployments** (APv1): Devices > Monitor > Windows Autopilot deployments. 30-day history. Filterable by status.
- **APv2 deployment status**: Devices > Monitor > Windows Autopilot device preparation deployments. Near real-time. Download diagnostic logs for failed deployments.
- **Enrollment time grouping failures**: Devices > Monitor > Enrollment time grouping failures. Updated within 20 minutes of failure.
- **Group policy migration readiness**: Reports > Device management > Group policy analytics.

**What success rate interpretation requires:**
- Successful = device completed provisioning and passed ESP
- Failed = error occurred during any stage of provisioning
- In progress = provisioning ongoing
- Abandoned = user powered off or reset device mid-provisioning (appears in failed bucket)

Source: HIGH — [Microsoft Learn Autopilot reporting](https://learn.microsoft.com/en-us/autopilot/device-preparation/reporting-monitoring)

### WMON-02: Drift Detection

**Profile assignment states to monitor:**
- Not assigned: device registered but no profile matched (check group membership)
- Assigning: profile match found, assignment in progress (wait ~30 min before investigating)
- Assigned: normal healthy state
- Fix pending: hardware change on device; Intune attempting to register new hardware

**Proactive monitoring tools:**
- Intune Endpoint Analytics: device health, setup times, common issues across fleet
- Intune built-in reports: ESP progress tracking
- Scheduled Intune exports: CSV export of device list with profile assignment status for weekly review

**Remediation for drift:**
- Profile not assigned after 30 min: check group membership, verify ZTDId rule syntax (APv1), verify corporate identifiers (APv2)
- Fix pending: if Intune cannot register new hardware, reset and re-register device

Source: HIGH — Microsoft Learn profile assignment documentation; Endpoint Analytics documentation

### WMON-03: New-Batch-of-Devices Workflow

**End-to-end checkpoint workflow:**

| Stage | Action | Verification Checkpoint |
|-------|--------|------------------------|
| 1. OEM Order | Include Autopilot registration in PO | Confirm with OEM that hashes will be submitted |
| 2. Hash collection | OEM submits or manual collection | Devices appear in Intune > Windows enrollment > Devices |
| 3. Group assignment | Verify devices in correct dynamic/static group | Group membership confirmed in Entra ID |
| 4. Profile assignment | Wait 15-30 min post-group-assignment | Profile status = Assigned (not Not assigned) |
| 5. Staging area | Prepare deployment location (wired for pre-provisioning) | Network connectivity test to Autopilot endpoints |
| 6. Provisioning | Power on device; complete deployment flow | Device reaches desktop; all ESP apps installed |
| 7. Post-enrollment verification | Admin checks Intune portal | Compliance = Compliant; apps = Installed; profile = Assigned |
| 8. User handoff | Deliver to end user with instructions | User can sign in and access resources |

---

## Open Questions

1. **reference/ index file need**
   - What we know: `reference/` currently has 3 files with no index. Adding 15 files makes navigation harder.
   - What's unclear: Whether a `reference/00-index.md` is warranted or whether the main `index.md` update is sufficient.
   - Recommendation: Add `reference/00-index.md` grouping files by sub-domain (Networking, Security, Migration, Monitoring). The planner should decide whether this is a separate task or included in the reference file creation tasks.

2. **device-operations/ decision tree**
   - What we know: WDLC-02 requires a "what to preserve" decision tree. Decision trees live in `docs/decision-trees/`.
   - What's unclear: Whether this is file `05-device-lifecycle.md` (continuing the existing numbering) or a standalone file.
   - Recommendation: Number as `05-device-lifecycle.md` (follows `04-apv2-triage.md`). The planner should include this as a separate deliverable alongside WDLC-02.

3. **common-issues.md routing entries**
   - What we know: New content areas (reset failures, migration issues, CA enrollment loops) need routing entries.
   - What's unclear: Whether this goes in the same task as writing each doc, or as a final integration task.
   - Recommendation: Single integration task at end of phase that updates `common-issues.md`, `index.md`, and `lifecycle/05-post-enrollment.md` in one pass.

4. **WSEC-01 platform specificity**
   - What we know: WSEC-01 is `platform: Windows` per D-10. Phase 23 will cross-reference it for macOS.
   - What's unclear: How much macOS placeholder content (if any) to include in WSEC-01.
   - Recommendation: Zero macOS content in WSEC-01. Include a `## See Also` link placeholder: "macOS Conditional Access enrollment (see Phase 23)."

---

## Validation Architecture

> `nyquist_validation` is absent from `.planning/config.json` — treated as enabled.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Pester 5.x (PowerShell) + pytest (Python backend) |
| Config file | None for doc phase; tests are in `tests/test_diagnostics.ps1` and `tests/test_backend.py` |
| Quick run command | `Invoke-Pester .\tests\test_diagnostics.ps1` |
| Full suite command | `pytest && Invoke-Pester .\tests\test_diagnostics.ps1` |

**Phase 21 is a documentation-only phase.** No code changes → no unit/integration tests required for the new content. Test infrastructure is the existing backend and PowerShell test suites — they pass or fail independently of Phase 21 doc files.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| WDLC-01 through WMON-03 (all 18) | Markdown file exists at expected path with required frontmatter | manual-only | n/a — file existence check | ❌ files are deliverables |

**Manual-only justification:** Phase 21 requirements are documentation files. Automated test criteria:
- File exists at expected path
- Frontmatter fields present (`last_verified`, `review_by`, `applies_to`, `audience`, `platform`)
- All internal relative links resolve (manual check or markdown linter)
- No link rot to external Microsoft Learn URLs (manual spot-check)

### Sampling Rate
- **Per task commit:** Verify created file has correct frontmatter and all links resolve locally
- **Per wave merge:** Check all new files appear in `docs/index.md` navigation, `docs/common-issues.md` routing, and `lifecycle/05-post-enrollment.md` See Also
- **Phase gate:** All 18 files exist; frontmatter complete; navigation updated; no broken internal links

### Wave 0 Gaps
None — no test framework install required. Existing test infrastructure covers backend and PowerShell (unchanged by Phase 21). Doc file verification is manual.

---

## Sources

### Primary (HIGH confidence)
- [Microsoft Learn — Windows Autopilot Reset](https://learn.microsoft.com/en-us/autopilot/windows-autopilot-reset) — WDLC-01; full page fetched
- [Microsoft Learn — Windows Autopilot Requirements](https://learn.microsoft.com/en-us/autopilot/requirements) — WINF-01, WINF-02, WINF-03; full page fetched (networking + licensing + configuration tabs)
- [Microsoft Learn — Group Policy Analytics](https://learn.microsoft.com/en-us/intune/intune-service/configuration/group-policy-analytics) — WMIG-03; full page fetched
- [Microsoft Learn — Remote Autopilot Reset](https://learn.microsoft.com/en-us/autopilot/tutorial/reset/remote-autopilot-reset) — WDLC-01
- [Microsoft Learn — Local Autopilot Reset](https://learn.microsoft.com/en-us/autopilot/tutorial/reset/local-autopilot-reset) — WDLC-01
- [Microsoft Learn — Win32 App Management](https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-app-management) — WINF-04
- [Microsoft Learn — Enable MDM Automatic Enrollment](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/windows-enroll) — WINF-02
- [Microsoft Learn — BitLocker Known Issues](https://learn.microsoft.com/en-us/troubleshoot/windows-client/windows-security/enforcing-bitlocker-policies-by-using-intune-known-issues) — WSEC-02
- [Microsoft Learn — Autopilot Known Issues](https://learn.microsoft.com/en-us/autopilot/known-issues) — WSEC-02
- [Microsoft Learn — APv2 Reporting and Monitoring](https://learn.microsoft.com/en-us/autopilot/device-preparation/reporting-monitoring) — WMON-01
- [Microsoft Learn — Autopilot for Existing Devices Task Sequence](https://learn.microsoft.com/en-us/autopilot/tutorial/existing-devices/create-autopilot-task-sequence) — WMIG-02
- `docs/apv1-vs-apv2.md` — WMIG-01; project file read directly
- `docs/admin-setup-apv1/03-esp-policy.md` — WINF-05; project file read directly
- `docs/lifecycle/05-post-enrollment.md` — WSEC-03; project file read directly

### Secondary (MEDIUM confidence)
- [Microsoft Community Hub — How to transfer Windows Autopilot devices between tenants](https://techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-how-to-transfer-windows-autopilot-devices-between-tenants/3920555) — WDLC-04; official Microsoft support blog; fetched
- [ctrlshiftenter.cloud — Should you exclude Microsoft Intune Enrollment from CA](https://www.ctrlshiftenter.cloud/2025/10/12/should-you-exclude-microsoft-intune-enrollment-from-your-compliance-cap-or-not/) — WSEC-01; community blog verified against official behavior described in Microsoft Q&A
- Multiple community comparison articles on 5 reset/retire/wipe actions — WDLC-02; cross-verified against Microsoft Learn official remote action pages

### Tertiary (LOW confidence)
- None — all key claims verified against HIGH or MEDIUM sources.

---

## Metadata

**Confidence breakdown:**
- Device lifecycle (WDLC-01 through WDLC-04): HIGH — official Microsoft Learn pages fetched directly
- Infrastructure (WINF-01 through WINF-05): HIGH — official requirements page fetched; existing project file verified
- Security compliance (WSEC-01 through WSEC-03): MEDIUM-HIGH — WSEC-01 chicken-and-egg documented in official CA docs; WSEC-02 BitLocker issues from official known issues; WSEC-03 timing from existing project file
- Migration (WMIG-01 through WMIG-03): HIGH for WMIG-03 (GPA page fetched); MEDIUM for WMIG-01 (coexistence behavior from search + project file); HIGH for WMIG-02 (existing devices tutorial fetched)
- Monitoring (WMON-01 through WMON-03): HIGH — official reporting docs found; workflow from official requirements

**Research date:** 2026-04-13
**Valid until:** 2026-07-13 (stable Microsoft Learn content; verify licensing section at start of planning if >30 days elapsed)
