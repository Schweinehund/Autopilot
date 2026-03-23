# Phase 7: Navigation - Research

**Researched:** 2026-03-23
**Domain:** Markdown documentation navigation artifacts — master index, quick-reference cards, navigation index transformation
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Master index structure (NAV-01)**
- D-01: Single file `docs/index.md` — the root entry point for the entire docs/ directory
- D-02: Two H2 sections (`## Service Desk (L1)` and `## Desktop Engineering (L2)`) with link tables — no side-by-side columns (markdown column layouts break across renderers)
- D-03: Minimal shared content before the role split: title, one-sentence purpose line, "Choose your path below" prompt — no background prose
- D-04: Third `## Shared References` section at the bottom for glossary, error code index, lifecycle overview, and APv1-vs-APv2 — shared resources listed once, not duplicated in both role sections

**Quick-reference card content density (NAV-02, NAV-03)**
- D-05: Standalone files at docs root: `docs/quick-ref-l1.md` and `docs/quick-ref-l2.md` — print-and-pin cheat sheets, not embedded in the master index
- D-06: L1 card contains: top 5 checks as a numbered checklist, escalation triggers as a compact bullet list, one-line links to each decision tree and runbook, no prose — every line is actionable
- D-07: L2 card contains actual values, not just links: `mdmdiagnosticstool.exe` command with exact flags, top 5-6 PowerShell diagnostic commands with exact syntax, 4 Event Viewer log paths as literal strings, top 3-4 registry paths, top event IDs grouped by scenario, links to full runbooks at the bottom
- D-08: Both cards use standard YAML frontmatter (`last_verified`, `review_by`, `audience`) matching all other docs

**common-issues.md transformation (NAV-04)**
- D-09: Pure navigation index — remove all inline diagnostic/remediation content; runbooks are now authoritative
- D-10: Keep existing issue categories as H2 headers; reduce each to: one-line symptom description, L1 runbook link, L2 runbook link
- D-11: "Device Renamed" section has no corresponding runbook — keep as a 3-4 line inline tip (sync delay, not worth a full runbook)
- D-12: Frontmatter uses `audience: all` — this is a symptom-based router for both roles; master index links to it from Shared References

### Claude's Discretion
- Exact wording of the master index role descriptions
- Which 5 checks appear on the L1 card (use the most common ticket-resolving checks)
- Which PowerShell commands and event IDs make the L2 card cut (use frequency of appearance in L2 runbooks as the filter)
- Order of issue categories in the transformed common-issues.md
- Whether to add a "How to use this documentation" one-liner in the master index
- Cross-links between quick-reference cards and the master index

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAV-01 | Master index with role-based entry points (L1 path / L2 path) | D-01 through D-04 define exact structure; existing `00-index.md` files in l1-runbooks/ and l2-runbooks/ are the downstream link targets |
| NAV-02 | L1 quick-reference card (top checks, escalation triggers) | Escalation criteria extracted from all 5 L1 runbooks; top 5 checks identified by cross-runbook frequency; card must fit one screen |
| NAV-03 | L2 quick-reference card (PowerShell commands, log paths, event IDs) | Content sourced from powershell-ref.md (12 functions), l2-runbooks/01-log-collection.md (mdmdiagnosticstool.exe command), registry-paths.md (8 paths), powershell-ref.md event log table; L2 runbook frequency determines cut |
| NAV-04 | Updated common-issues.md as navigation index linking to runbooks | Existing file fully read; 8 issue categories identified; "Device Renamed" section confirmed no runbook counterpart; transformation plan verified against D-09 through D-12 |
</phase_requirements>

---

## Summary

Phase 7 produces four documentation artifacts: one new file (docs/index.md), two new files (docs/quick-ref-l1.md and docs/quick-ref-l2.md), and one transformed file (docs/common-issues.md). All decisions are locked in CONTEXT.md. This phase requires no library research — it is a documentation assembly task that draws content exclusively from files produced in Phases 1-6.

The primary research task is content extraction: identifying which items from existing files belong on each quick-reference card, verifying all link targets exist and have correct relative paths, and understanding the full structure of common-issues.md before its transformation. All source files have been read and verified. Every link target named in CONTEXT.md exists in the repository.

The key implementation risk is link correctness: docs/index.md sits at the docs/ root and links to subdirectory files using paths like `l1-runbooks/00-index.md` — the same relative path convention used throughout the project. Both quick-reference cards also sit at the docs/ root, so they use the same path prefix pattern. The common-issues.md file already exists at docs/common-issues.md and will be rewritten in place.

**Primary recommendation:** Treat this phase as four discrete authoring tasks, one per NAV requirement, each with known inputs and outputs. The content for each artifact is fully deterministic from the source files read during research.

---

## Standard Stack

This phase produces Markdown documentation files only. There is no code library stack.

### Established Conventions (from Phases 1-6)

| Element | Pattern | Source |
|---------|---------|--------|
| YAML frontmatter | `last_verified`, `review_by`, `applies_to`, `audience` fields | `docs/_templates/l1-template.md`, `docs/_templates/l2-template.md` |
| Version gate banner | `> **Version gate:** This guide applies to Windows Autopilot (classic). For Device Preparation (APv2), see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).` | All existing docs |
| Navigation tables | `| # | Title | When to Use |` three-column format | `docs/l1-runbooks/00-index.md` |
| Link convention | Relative paths from current file location | All existing docs |
| Version History table | Bottom of each file, `| Date | Change | Author |` | All existing docs |
| Glossary linking | First mention of each Autopilot term links to `_glossary.md#term` | All existing docs |
| Voice | Direct second-person imperative | All existing docs |
| No screenshots | Text descriptions with UI element names only | Project constraint |

### Frontmatter Values for New Files

| File | `audience` | `applies_to` |
|------|-----------|--------------|
| `docs/index.md` | `both` (or `all`) | `APv1` |
| `docs/quick-ref-l1.md` | `L1` | `APv1` |
| `docs/quick-ref-l2.md` | `L2` | `APv1` |
| `docs/common-issues.md` (transformed) | `all` | `APv1` |

Note: D-12 specifies `audience: all` for common-issues.md. The `all` value has been used in existing docs (`docs/error-codes/00-index.md` uses `audience: both`). Use `all` to match D-12 literally — this is acceptable variance from the `both` seen elsewhere.

---

## Architecture Patterns

### Recommended File Structure (Phase 7 outputs)

```
docs/
├── index.md                  # NEW — master entry point, root of docs/
├── quick-ref-l1.md           # NEW — L1 cheat sheet at docs root
├── quick-ref-l2.md           # NEW — L2 cheat sheet at docs root
├── common-issues.md          # TRANSFORM — rewrite in place
├── l1-runbooks/
│   └── 00-index.md           # UNCHANGED — linked from master index L1 section
├── l2-runbooks/
│   └── 00-index.md           # UNCHANGED — linked from master index L2 section
├── decision-trees/
│   └── 00-initial-triage.md  # UNCHANGED — linked from L1 section and L1 card
├── error-codes/
│   └── 00-index.md           # UNCHANGED — linked from Shared References
├── lifecycle/
│   └── 00-overview.md        # UNCHANGED — linked from Shared References
├── _glossary.md              # UNCHANGED — linked from Shared References
└── apv1-vs-apv2.md           # UNCHANGED — linked from Shared References
```

### Pattern 1: Master Index (docs/index.md)

**What:** Single root file with three H2 sections — L1, L2, Shared References. No content prose before the role split beyond title and a one-sentence prompt.

**Structure:**
```markdown
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: APv1
audience: both
---

# Windows Autopilot Documentation

Troubleshooting and investigation guides for Windows Autopilot deployments. Choose your path below.

## Service Desk (L1)

[link table — When-to-Use column pattern]

## Desktop Engineering (L2)

[link table — When-to-Use column pattern]

## Shared References

[link table — both audiences]
```

**Link targets from docs/index.md (all relative to docs/):**

| Section | Link | Target File | Exists? |
|---------|------|-------------|---------|
| L1 | Initial Triage Decision Tree | `decision-trees/00-initial-triage.md` | YES |
| L1 | ESP Failure Decision Tree | `decision-trees/01-esp-failure.md` | YES |
| L1 | Profile Assignment Decision Tree | `decision-trees/02-profile-assignment.md` | YES |
| L1 | TPM Attestation Decision Tree | `decision-trees/03-tpm-attestation.md` | YES |
| L1 | L1 Runbooks Index | `l1-runbooks/00-index.md` | YES |
| L1 | Quick-Reference Card (L1) | `quick-ref-l1.md` | NEW (created this phase) |
| L2 | L2 Runbooks Index | `l2-runbooks/00-index.md` | YES |
| L2 | Log Collection Guide | `l2-runbooks/01-log-collection.md` | YES |
| L2 | PowerShell Reference | `reference/powershell-ref.md` | YES |
| L2 | Registry Paths | `reference/registry-paths.md` | YES |
| L2 | Network Endpoints | `reference/endpoints.md` | YES |
| L2 | Quick-Reference Card (L2) | `quick-ref-l2.md` | NEW (created this phase) |
| Shared | Autopilot Glossary | `_glossary.md` | YES |
| Shared | Error Code Index | `error-codes/00-index.md` | YES |
| Shared | Lifecycle Overview | `lifecycle/00-overview.md` | YES |
| Shared | APv1 vs APv2 | `apv1-vs-apv2.md` | YES |
| Shared | Common Issues Index | `common-issues.md` | YES (transformed) |

### Pattern 2: L1 Quick-Reference Card (docs/quick-ref-l1.md)

**What:** One-screen cheat sheet with three blocks: top 5 checks (numbered checklist), escalation triggers (bullet list), and links to all L1 resources.

**Content sourced from:**
- Top 5 checks: synthesized from the most common ticket-resolution actions across the 5 L1 runbooks and the initial triage tree
- Escalation triggers: extracted verbatim from `## Escalation Criteria` sections of all 5 L1 runbooks

**Top 5 Checks for L1 Card (research finding — Claude's discretion):**

Derived from cross-runbook frequency and the initial triage tree decision nodes:

1. Is the device serial number in the Autopilot portal? (Intune > Devices > Windows > Enrollment > Windows Autopilot devices) — resolves device-not-registered tickets
2. Is a deployment profile assigned? (Portal shows "Assigned" in the Profile column) — resolves profile-not-assigned tickets
3. Can the device reach login.microsoftonline.com? (Browser test from the device) — routes network failures
4. Is ESP past the expected time? (>30 min device phase; >60 min user phase) — routes ESP escalations
5. Is there an error code on screen? (Look up in error-codes/00-index.md) — routes error-code-specific actions

Rationale: These 5 checks directly map to the TRD1-TRD6 decision nodes in the initial triage tree and cover the entry conditions for all 5 L1 runbooks.

**Escalation Triggers for L1 Card (extracted from runbooks):**

- Serial confirmed correct, device not in portal → Escalate L2 (01-device-not-registered)
- ESP stuck at same point after one restart AND over time threshold → Escalate L2 (02-esp-stuck)
- Error code not in error table, or L1 action did not resolve → Escalate L2 (02-esp-stuck)
- Device in correct group, profile still not assigned after 30 min → Escalate L2 (03-profile-not-assigned)
- Wrong profile assigned → Escalate L2 (03-profile-not-assigned)
- Cannot reach login.microsoftonline.com or Autopilot endpoints → Escalate Infrastructure/Network (NOT L2) (04-network)
- OOBE fails second time with same symptoms → Escalate L2 (05-oobe)
- Blue screen or Windows recovery mode → Escalate L2 (05-oobe)

**Links block for L1 card:**
- [Initial Triage Tree](decision-trees/00-initial-triage.md)
- [ESP Failure Tree](decision-trees/01-esp-failure.md)
- [Profile Assignment Tree](decision-trees/02-profile-assignment.md)
- [TPM Attestation Tree](decision-trees/03-tpm-attestation.md)
- [Device Not Registered](l1-runbooks/01-device-not-registered.md)
- [ESP Stuck or Failed](l1-runbooks/02-esp-stuck-or-failed.md)
- [Profile Not Assigned](l1-runbooks/03-profile-not-assigned.md)
- [Network Connectivity Failure](l1-runbooks/04-network-connectivity.md)
- [OOBE Fails Immediately](l1-runbooks/05-oobe-failure.md)
- [Error Code Index](error-codes/00-index.md)

### Pattern 3: L2 Quick-Reference Card (docs/quick-ref-l2.md)

**What:** Copy-pasteable cheat sheet with exact command strings, log paths, registry paths, and event IDs. No prose.

**Content sourced from powershell-ref.md and l2-runbooks/01-log-collection.md:**

**mdmdiagnosticstool.exe command (exact, from log-collection guide):**
```
mdmdiagnosticstool.exe -area Autopilot -cab -out C:\Temp\AutopilotDiag
```

**Top 5-6 PowerShell diagnostic commands (frequency in L2 runbooks determines cut):**

All 7 diagnostic functions exist in powershell-ref.md. Ranking by diagnostic utility and L2 runbook appearance:

| Rank | Command | Why it makes the cut |
|------|---------|---------------------|
| 1 | `Get-AutopilotDeviceStatus` | Comprehensive snapshot — covers hash, registration, profile, TPM, network in one call |
| 2 | `Get-AutopilotRegistrationState` | Tenant ID and profile name confirmation — used in device-not-registered and profile investigations |
| 3 | `Get-TPMStatus` | TPM readiness check — used in TPM attestation and pre-provisioning investigations |
| 4 | `Test-AutopilotConnectivity` | Endpoint reachability test — used in network and log-collection investigations |
| 5 | `Get-AutopilotLogs -OutputPath "C:\Temp\AutopilotDiag\$env:COMPUTERNAME"` | One-command log collection — used as alternative to mdmdiagnosticstool |
| 6 | `Get-AutopilotHardwareHash` | Hardware hash retrieval — used when device-not-registered is the symptom |

**4 Event Viewer log paths (exact strings, from powershell-ref.md event log table):**
1. `Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin`
2. `Microsoft-Windows-Provisioning-Diagnostics-Provider/Admin`
3. `Microsoft-Windows-AAD/Operational`
4. `Microsoft-Windows-User Device Registration/Admin`

**Top 3-4 registry paths (from registry-paths.md, ranked by investigation frequency):**

| Rank | Path | When to use |
|------|------|------------|
| 1 | `HKLM:\SOFTWARE\Microsoft\Provisioning\Diagnostics\Autopilot` | Registration state: TenantId, TenantDomain, ProfileName |
| 2 | `HKLM:\SOFTWARE\Microsoft\Provisioning\AutopilotSettings` | Profile assignment details |
| 3 | `HKLM:\SOFTWARE\Microsoft\Enrollments\{GUID}\FirstSync` | ESP device phase tracking (IsServerProvisioningDone) |
| 4 | `HKLM:\SOFTWARE\Microsoft\Windows\Autopilot\EnrollmentStatusTracking` | ESP root — parent of all ESP diagnostic data |

**Top event IDs grouped by scenario (from error-codes/00-index.md and l2-runbooks):**

| Scenario | Event IDs |
|---------|----------|
| Device registration | Event 807 (ZtdDeviceIsNotRegistered), Event 908 (SerialNumberMismatch) |
| Profile assignment | Event 809 (profile deleted), Event 815 (profile not assigned) |
| TPM attestation | Event 171 (TPMIdentityFailed), Event 172 (AutopilotProfileUnavailable) |
| ESP/enrollment | 0x81036501 (MDMInfoNotFound), 0x81036502 (AppInstallFailure) |

**Registry snapshot command (from log-collection guide):**
```
reg export "HKLM\SOFTWARE\Microsoft\Windows\Autopilot\EnrollmentStatusTracking" "%prefix%_esp-registry.reg" /y
```

### Pattern 4: common-issues.md Transformation (NAV-04)

**Current state (fully read):** 8 issue categories, each with Symptoms/Root Causes/Diagnostic Steps/Remediation content blocks. Total ~200 lines with inline PowerShell commands that duplicate runbook content.

**Issue categories to preserve as H2 headers (D-10):**
1. Device Registration Issues
2. Enrollment Status Page (ESP) Failures
3. Profile Assignment Issues
4. TPM Attestation Failures
5. Network Connectivity Issues
6. Policy Conflicts
7. Hybrid Join Failures
8. Device Renamed but Old Name Persists

**Transformation per category (D-09, D-10):**

Each category (1-7) becomes:
```markdown
## [Category Name]

[One-line symptom description]

- L1: [L1 runbook link]
- L2: [L2 runbook link]
```

Category 8 (Device Renamed) — no runbook counterpart. Per D-11: keep as 3-4 line inline tip.

**L1/L2 runbook mapping per category:**

| Category | L1 Runbook | L2 Runbook |
|---------|-----------|-----------|
| Device Registration Issues | `l1-runbooks/01-device-not-registered.md` | `l2-runbooks/00-index.md` (no dedicated L2 runbook) |
| ESP Failures | `l1-runbooks/02-esp-stuck-or-failed.md` | `l2-runbooks/02-esp-deep-dive.md` |
| Profile Assignment Issues | `l1-runbooks/03-profile-not-assigned.md` | `l2-runbooks/00-index.md` (no dedicated profile L2 runbook) |
| TPM Attestation Failures | `l1-runbooks/00-index.md#tpm-attestation-note` | `l2-runbooks/03-tpm-attestation.md` |
| Network Connectivity Issues | `l1-runbooks/04-network-connectivity.md` | Infrastructure/Network team (not L2) |
| Policy Conflicts | `l1-runbooks/02-esp-stuck-or-failed.md` | `l2-runbooks/05-policy-conflicts.md` |
| Hybrid Join Failures | `l1-runbooks/00-index.md` | `l2-runbooks/04-hybrid-join.md` |

Note: "Device Not Registered" and "Profile Assignment Issues" have no dedicated L2 runbook. The l2-runbooks index (00-index.md) is the appropriate L2 link — it contains the escalation mapping table.

Note: "Network Connectivity Issues" escalates to Infrastructure/Network, not L2 engineering (per l1-runbooks/04-network-connectivity.md explicit note and STATE.md decision). The L2 link should reflect this with a note, or link to the L1 runbook for escalation guidance.

Note: "Policy Conflicts" symptom maps to L2 policy conflict runbook. For L1, the ESP stuck runbook is the closest entry point (policy conflicts manifest as ESP failures from the L1 perspective).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Navigation tables | Custom multi-column layouts | Standard Markdown tables (two or three columns) | D-02 explicitly bans multi-column layouts — they break across renderers |
| Quick-reference content | New content synthesis from scratch | Extract directly from existing Phase 1-6 files | Content is already written and verified; re-writing creates drift |
| Link paths | Path guessing or hardcoded absolute paths | Relative paths following established project conventions | All existing docs use relative paths; consistency prevents broken links |
| Frontmatter fields | New field names | Existing `last_verified`, `review_by`, `applies_to`, `audience` fields only | D-08 requires matching existing docs |
| Version gate banner | Custom wording | Copy the established banner pattern verbatim, adjust as needed | Consistency — deviating creates maintenance burden |

**Key insight:** All content for this phase already exists in source files. The implementation task is extraction, formatting, and linking — not authoring new technical content.

---

## Common Pitfalls

### Pitfall 1: Wrong Relative Path Prefix

**What goes wrong:** Links from `docs/index.md` use `../` prefix (parent directory escaping), but index.md is already at the docs/ root — there is no parent to escape to within the docs tree.

**Why it happens:** L2 runbooks and reference files use `../` to navigate back to docs/ from subdirectories. A planner copying that pattern into index.md produces broken links.

**How to avoid:** Files at the docs/ root (`index.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `common-issues.md`) link to subdirectory content using the subdirectory prefix directly — e.g., `l1-runbooks/00-index.md`, not `../l1-runbooks/00-index.md`.

**Warning signs:** Any link starting with `../` in `docs/index.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, or `docs/common-issues.md`.

### Pitfall 2: common-issues.md Retaining Inline Content

**What goes wrong:** Transformation leaves behind PowerShell commands, diagnostic steps, or remediation blocks — the file becomes a hybrid navigation-index/runbook rather than a pure index.

**Why it happens:** D-09 says "remove all inline diagnostic/remediation content" — but the Category 8 exception (D-11: keep 3-4 line inline tip) creates a temptation to be lenient with other categories.

**How to avoid:** Apply the D-11 exception only to "Device Renamed but Old Name Persists". All other categories: one-line symptom, L1 link, L2 link — nothing else.

**Warning signs:** Any `\`\`\`powershell` block, `**Diagnostic Steps**` heading, or `**Root Causes**` heading in the transformed file (except the "Device Renamed" tip).

### Pitfall 3: Duplicating Shared References in Both Role Sections

**What goes wrong:** Master index includes glossary, error code index, and lifecycle links in both the L1 and L2 sections instead of a single Shared References section at the bottom.

**Why it happens:** D-04 exists specifically because the first instinct is to list everything in both sections for completeness.

**How to avoid:** Follow D-04 strictly: shared resources (glossary, error code index, lifecycle overview, APv1-vs-APv2) appear only once in `## Shared References`. The L1 section links to L1-specific files only; L2 section links to L2-specific files only.

**Warning signs:** `_glossary.md` or `error-codes/00-index.md` appearing in both the L1 and L2 sections of index.md.

### Pitfall 4: L1 Card Containing Context Prose

**What goes wrong:** Quick-ref-l1.md grows explanatory paragraphs, background context, or inline descriptions that make it longer than one screen.

**Why it happens:** The escalation triggers in L1 runbooks include brief explanatory context. Copying them verbatim imports that prose.

**How to avoid:** D-06 says "no prose, no context paragraphs — every line is actionable." Escalation triggers should be bullet fragments, not sentences. The card is designed to be taped to a monitor — arm's-length readability is the test.

**Warning signs:** Any paragraph longer than one line in quick-ref-l1.md outside of the links block.

### Pitfall 5: Network Connectivity Escalation Misattributed to L2

**What goes wrong:** common-issues.md transformation (or master index) points network connectivity failures to L2 runbooks.

**Why it happens:** Five of six issue categories in common-issues.md map to L2 engineering runbooks. Network connectivity is the exception.

**How to avoid:** Network connectivity failures escalate to Infrastructure/Network team, not L2 engineering. This is stated explicitly in `docs/l1-runbooks/04-network-connectivity.md` and confirmed in STATE.md decisions. The common-issues.md network section should reflect this routing.

**Warning signs:** `l2-runbooks/` link appearing for the Network Connectivity Issues category.

---

## Code Examples

Verified patterns from existing project files:

### YAML Frontmatter (from docs/_templates/l1-template.md)
```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: APv1
audience: L1
---
```

### Version Gate Banner (established pattern across all docs)
```markdown
> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).
```

Note: Files at docs/ root use `apv1-vs-apv2.md` (no `../` prefix).

### Navigation Table Pattern (from docs/l1-runbooks/00-index.md)
```markdown
| # | Runbook | When to Use |
|---|---------|-------------|
| 1 | [Device Not Registered](01-device-not-registered.md) | Device serial number not found in the Autopilot portal |
```

### Version History Table (established pattern)
```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-03-23 | Initial version | — |
```

### mdmdiagnosticstool.exe Command (from docs/l2-runbooks/01-log-collection.md)
```
mdmdiagnosticstool.exe -area Autopilot -cab -out C:\Temp\AutopilotDiag
```

### Event Log Export Commands (from docs/l2-runbooks/01-log-collection.md)
```powershell
wevtutil epl "Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin" "$prefix_mdm-admin.evtx"
wevtutil epl "Microsoft-Windows-Provisioning-Diagnostics-Provider/Admin" "$prefix_provisioning.evtx"
wevtutil epl "Microsoft-Windows-AAD/Operational" "$prefix_aad.evtx"
wevtutil epl "Microsoft-Windows-User Device Registration/Admin" "$prefix_user-device-reg.evtx"
```

---

## Validation Architecture

The test infrastructure in this project covers Python backend tests (`tests/test_backend.py` with pytest) and PowerShell module tests (`tests/test_diagnostics.ps1` with Pester). Neither framework applies to Markdown documentation files — the NAV requirements are document existence and link correctness requirements, not code behavior requirements.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Manual verification (no automated Markdown link checker detected in project) |
| Config file | None |
| Quick run command | Visual inspection of generated files |
| Full suite command | `Invoke-Pester .\tests\test_diagnostics.ps1` (PowerShell) / `pytest tests/test_backend.py` (Python) — neither covers NAV requirements |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-01 | `docs/index.md` exists with L1, L2, and Shared References sections | manual | Visual inspection | Wave 0 |
| NAV-01 | All links in index.md resolve to existing files | manual | Visual inspection | Wave 0 |
| NAV-02 | `docs/quick-ref-l1.md` fits one screen with top checks and escalation triggers | manual | Visual inspection | Wave 0 |
| NAV-03 | `docs/quick-ref-l2.md` contains exact-syntax commands, log paths, registry paths | manual | Visual inspection | Wave 0 |
| NAV-04 | `docs/common-issues.md` has no inline diagnostic/remediation content except "Device Renamed" tip | manual | Visual inspection | Wave 0 |

### Wave 0 Gaps
- No automated link checker exists — all validation is visual inspection
- No Markdown linting configured — rely on established patterns

*(No test framework changes required for this phase — documentation-only phase, existing test infrastructure does not cover NAV requirements.)*

---

## Open Questions

1. **common-issues.md: No dedicated L2 runbook for "Device Registration Issues"**
   - What we know: The l2-runbooks index (00-index.md) handles device-not-registered escalations; there is no `l2-runbooks/01-device-not-registered.md` equivalent
   - What's unclear: Whether to link to the l2-runbooks index or to a specific escalation section
   - Recommendation: Link to `l2-runbooks/00-index.md` — the escalation mapping table there explains the L2 routing

2. **common-issues.md: "Profile Assignment Issues" L2 link**
   - What we know: L2 investigates profile assignment issues via ESP or policy conflict runbooks depending on symptom (per l2-runbooks/00-index.md PRE1-PRE6 routing)
   - What's unclear: Whether to link to l2-runbooks/00-index.md or a specific runbook
   - Recommendation: Link to `l2-runbooks/00-index.md` with the note that L2 selects runbook based on symptom

3. **master index: Whether "How to use this documentation" one-liner is needed**
   - What we know: This is Claude's discretion (per CONTEXT.md)
   - What's unclear: Whether a one-liner improves usability without adding prose
   - Recommendation: Include it — a single sentence ("Start with Initial Triage if you have an active failure; use the role-specific index below if you're exploring.") meets the "minimal shared content" requirement of D-03 without becoming background prose

---

## Sources

### Primary (HIGH confidence)
- `docs/_templates/l1-template.md` — Frontmatter pattern for L1 files
- `docs/_templates/l2-template.md` — Frontmatter pattern for L2 files
- `docs/l1-runbooks/00-index.md` — L1 index structure and navigation table pattern
- `docs/l2-runbooks/00-index.md` — L2 index structure and escalation mapping table
- `docs/l1-runbooks/01-device-not-registered.md` through `05-oobe-failure.md` — Escalation criteria for L1 card
- `docs/l2-runbooks/01-log-collection.md` — mdmdiagnosticstool.exe command and event log export commands
- `docs/reference/powershell-ref.md` — 12 PowerShell functions with exact syntax and event log paths
- `docs/reference/registry-paths.md` — 8 registry paths with confidence ratings
- `docs/error-codes/00-index.md` — Event IDs and error codes for L2 card
- `docs/common-issues.md` — Full content of file to be transformed; 8 categories confirmed
- `docs/decision-trees/00-initial-triage.md` — L1 triage entry point; confirms top 5 checks for L1 card
- `.planning/phases/07-navigation/07-CONTEXT.md` — All locked decisions (D-01 through D-12)
- `.planning/STATE.md` — Confirmed network connectivity escalates to Infrastructure/Network, not L2

### Secondary (MEDIUM confidence)
- None required — all critical decisions are locked in CONTEXT.md with no alternatives to evaluate

---

## Metadata

**Confidence breakdown:**
- Locked decisions: HIGH — CONTEXT.md fully specified D-01 through D-12
- Link target verification: HIGH — all named link targets confirmed to exist in repository
- Content extraction (L1 card top checks): HIGH — derived directly from initial triage tree decision nodes TRD1-TRD6
- Content extraction (L2 card commands): HIGH — extracted verbatim from Phase 1 and Phase 6 source files
- common-issues.md mapping: HIGH — file fully read; all 8 categories confirmed; runbook mapping verified

**Research date:** 2026-03-23
**Valid until:** 2026-06-23 (stable documentation domain — 90 days)
