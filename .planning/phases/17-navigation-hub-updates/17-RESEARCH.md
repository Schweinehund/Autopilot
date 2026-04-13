# Phase 17: Navigation & Hub Updates - Research

**Researched:** 2026-04-13
**Domain:** Markdown documentation hub wiring — navigation, cross-referencing, glossary extension
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Index Page Layout**
- D-01: Add distinct APv2 subsections under each audience role (L1, L2) in `docs/index.md`. APv2 sections are visually separated with clear framework labels (`## Service Desk (L1) -- APv2` or similar) to satisfy success criterion 1 ("APv2 sections visually distinct from APv1 sections").
- D-02: Add a new top-level `## Admin Setup` section between Desktop Engineering (L2) and Shared References. Contains links to both APv1 admin setup guides (`docs/admin-setup-apv1/00-overview.md`) and APv2 admin setup guides (`docs/admin-setup-apv2/00-overview.md`) with clear framework labels. Admin is a new audience role introduced by v1.1.
- D-03: Update `index.md` frontmatter from `applies_to: APv1` to `applies_to: both`. Update or remove the version gate blockquote to reflect that the index now covers both frameworks.

**Common Issues Routing**
- D-04: Add a separate `## APv2 Failure Scenarios` section BELOW existing APv1 symptom categories in `docs/common-issues.md`. Each APv2 entry routes to APv2 L1 and L2 runbooks only -- no cross-contamination with APv1 runbooks.
- D-05: Add a brief "Not sure which framework?" pointer near the top of the page linking to `docs/apv1-vs-apv2.md` for users who don't know which framework their device is using.
- D-06: Follow the pattern established by the error-codes master index (Phase 12 D-03): existing APv1 section gets a `**Framework:** APv1 (classic)` label, new section gets `**Framework:** APv2 (Device Preparation)` label.
- D-07: Update `common-issues.md` frontmatter from `applies_to: APv1` to `applies_to: both`.

**Glossary APv2 Terms**
- D-08: Perform a full APv2 term audit across all Phase 11-16 output files. Add every APv2-specific term used in the documentation that is not yet in `docs/_glossary.md`. Minimum required terms per success criterion 2: Enrollment Time Grouping (ETG), BootstrapperAgent, Device Preparation policy. Additional candidates to scan for: Intune Management Extension (IME), corporate identifiers, Intune Provisioning Client, and any other terms introduced in admin setup guides.
- D-09: Use inline "See also" links for bidirectional cross-references between APv1 and APv2 equivalent terms. Example: the ESP entry gets "APv2 note: APv2 does not use ESP. See [Enrollment Time Grouping](#enrollment-time-grouping)." and the ETG entry gets "APv1 equivalent: [ESP](#esp) (different mechanism -- ETG replaces ESP's role in APv2)."
- D-10: Organize new APv2 terms within the existing category sections (Enrollment, Hardware, Deployment Modes, etc.) to maintain alphabetical/topical grouping. Add new categories only if APv2 introduces a concept that doesn't fit existing groups.
- D-11: Update the glossary version gate and alphabetical index to reflect new entries. Remove the Phase 3 placeholder note at the bottom of the file.

**Cross-Reference Scope**
- D-12: Update hub files (index.md, glossary, common-issues.md, error-codes/00-index.md, quick-ref cards) AND add APv2 back-links to APv1 files that have direct APv2 counterparts. This satisfies success criterion 4 ("every APv1 document that has an APv2 equivalent references it").
- D-13: APv1 files requiring APv2 back-link updates:
  - `docs/lifecycle/00-overview.md` -- link to `docs/lifecycle-apv2/00-overview.md`
  - `docs/l1-runbooks/00-index.md` -- add APv2 section linking to APv2 L1 runbooks (06-09)
  - `docs/l2-runbooks/00-index.md` -- already updated in Phase 14 (verify only)
  - `docs/decision-trees/00-initial-triage.md` -- link to `docs/decision-trees/04-apv2-triage.md`
  - `docs/quick-ref-l1.md` and `docs/quick-ref-l2.md` -- add APv2 quick-reference entries or "See also" links
- D-14: Do NOT perform a full audit of every file in `docs/` -- scope is limited to hub files and APv1 files with direct APv2 equivalents. Individual runbook files (e.g., `02-esp-deep-dive.md`) don't need APv2 links unless they have a direct counterpart.
- D-15: All updated files get their `last_verified` and `review_by` frontmatter dates refreshed.

**Frontmatter & Metadata**
- D-16: All updated hub files use `applies_to: both` and `audience: all` (or the most inclusive audience value). Consistent with Phase 12's index update pattern.

### Claude's Discretion
- Exact wording of APv2 section headers in index.md (as long as they're visually distinct from APv1 sections)
- Number and selection of additional APv2 glossary terms beyond the 3 required minimums
- Whether quick-ref cards get inline APv2 additions or just "See also" links
- Ordering of APv2 entries within common-issues.md APv2 section
- Whether to add a "Framework disambiguation" pointer to the top of index.md alongside the existing version gate

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAVG-01 | Any audience (L1, L2, admin) can navigate to APv2 content from index.md within two clicks, with APv2 sections visually distinct from APv1 sections | Decisions D-01, D-02, D-03 directly address this; index.md current structure is fully mapped |
| NAVG-03 | common-issues.md routes APv2 failure scenarios to APv2 runbooks and APv1 failure scenarios to APv1 runbooks without cross-contamination | Decisions D-04 through D-07 directly address this; all 4 APv2 L1 runbooks verified to exist |
| NAVG-04 | Every APv2 document that references an APv1 concept links back to the APv1 document, and every APv1 document that has an APv2 equivalent references it — bidirectional cross-referencing verified | Decisions D-12 through D-15 address this; current state of each APv1 file is mapped in this research |
</phase_requirements>

---

## Summary

Phase 17 is a pure hub-wiring phase. All APv2 content from Phases 11-16 is verified to exist on disk. The work is entirely about updating existing navigation and reference files to link to that content and integrate APv2 terminology. No new troubleshooting content is written.

The scope is well-defined by sixteen locked decisions covering four work streams: (1) index.md restructure for three audiences, (2) common-issues.md APv2 routing section, (3) glossary APv2 term additions with bidirectional cross-references, and (4) APv2 back-link updates to six specific APv1 files.

**Critical discovery:** D-13 states "verify only" for `docs/l2-runbooks/00-index.md` (Phase 14 was supposed to have updated it). Reading the file reveals Phase 14 did NOT add an APv2 section — the file still has `applies_to: APv1` and lists only the five APv1 runbooks. This file needs a new APv2 section, not just verification. The planner must treat this as a full update task, not a verify-only task.

**Primary recommendation:** Execute the four work streams as four separate plan waves, verifying all target paths exist before writing links. The l2-runbooks/00-index.md status (full update needed, not just verify) should be reflected in the plan.

---

## Current State of Files Being Modified

### Hub Files (must rewrite / extend)

#### `docs/index.md`
- Current: `applies_to: APv1`, version gate says "classic only"
- Current structure: L1 section (6 resources), L2 section (6 resources), Shared References (5 resources)
- No Admin section; no APv2 subsections under L1 or L2
- Required changes per decisions: add APv2 L1 subsection, add APv2 L2 subsection, add Admin Setup section (linking to both admin-setup-apv1/00-overview.md and admin-setup-apv2/00-overview.md), update frontmatter and version gate

#### `docs/_glossary.md`
- Current: `applies_to: both` (already correct), version gate still says "classic only"
- Current alphabetical index: 26 terms listed, all APv1/shared
- Current categories: Enrollment, Hardware, Network, Security, Deployment Modes
- Footer note: "This glossary covers structural and process terms. Error-code-specific terms will be added in Phase 3." — must be removed (D-11)
- Several inline comments reference Phase 2 path resolution — should be cleaned up
- Required additions: minimum 3 terms (ETG, BootstrapperAgent, Device Preparation policy), plus additional APv2 terms identified in audit below

#### `docs/common-issues.md`
- Current: `applies_to: APv1`, version gate says "classic only"
- Current structure: 7 APv1 symptom categories, each with L1 and L2 runbook links
- No APv2 section; no "which framework" pointer
- Required changes per decisions: add framework disambiguation pointer near top (D-05), add `**Framework:** APv1 (classic)` label to existing section (D-06), add `## APv2 Failure Scenarios` section below (D-04), update frontmatter (D-07)

#### `docs/error-codes/00-index.md`
- Current: already has APv2 note at bottom linking to `06-apv2-device-preparation.md` (Phase 12 work)
- This file is the template/pattern source for framework labels in other files
- The current APv2 note is informal (not a labeled section with `**Framework:**` headers)
- Scope per D-12: update this file as part of hub updates — minimal change needed (the APv2 section already exists)

### APv1 Files Needing Back-Links (D-13)

#### `docs/lifecycle/00-overview.md`
- Current: has "Related Documentation" section at bottom
- Has a note in the Level 1 diagram: "This diagram shows the APv1 (classic) flow. For the APv2 (Device Preparation) flow, see APv1 vs APv2."
- Needs explicit link to `docs/lifecycle-apv2/00-overview.md` (currently only links to apv1-vs-apv2.md)
- Required: add lifecycle-apv2/00-overview.md to Related Documentation section

#### `docs/l1-runbooks/00-index.md`
- Current: `applies_to: APv1`, version gate says "classic only"
- Current structure: table of 5 APv1 runbooks, Scope note, TPM Attestation Note, Related Resources
- No APv2 section at all
- Required: add APv2 section linking to runbooks 06-09 (`06-apv2-deployment-not-launched.md`, `07-apv2-apps-not-installed.md`, `08-apv2-apv1-conflict.md`, `09-apv2-deployment-timeout.md`)

#### `docs/l2-runbooks/00-index.md`
- Current: `applies_to: APv1`, version gate says "classic only"
- Current structure: When-to-Use table (5 APv1 runbooks), L1 Escalation Mapping table, Related Resources
- **FINDING: Phase 14 did NOT add an APv2 section.** D-13 says "verify only" but this file needs a full update. The plan must add an APv2 section with links to `06-apv2-log-collection.md`, `07-apv2-event-ids.md`, and `08-apv2-deployment-report.md`.

#### `docs/decision-trees/00-initial-triage.md`
- Current: `applies_to: APv1`, two notes saying "these decision trees cover APv1 only, for APv2 see apv1-vs-apv2.md"
- Current Scenario Trees section lists 3 APv1 trees only
- Required: link to `docs/decision-trees/04-apv2-triage.md` in the Scenario Trees section

#### `docs/quick-ref-l1.md`
- Current: `applies_to: APv1`, version gate says "classic only"
- Current structure: Top 5 Checks (APv1), Escalation Triggers (APv1), Decision Trees (3 APv1), Runbooks (5 APv1)
- Required: APv2 entries or "See also" links (Claude's discretion on inline vs. "See also" approach)

#### `docs/quick-ref-l2.md`
- Current: `applies_to: APv1`, version gate says "classic only"
- Current structure: Log Collection commands, PowerShell commands, Event Viewer paths, Registry Paths, Key Event IDs, Investigation Runbooks
- Required: APv2 entries or "See also" links (Claude's discretion on inline vs. "See also" approach)
- Note: APv2 uses different log collection approach (BootstrapperAgent log, IME log folder) — cannot share the same mdmdiagnosticstool.exe commands

---

## APv2 Content Verified to Exist (Target Link Paths)

All Phase 11-16 output verified on disk:

| Directory | Files Present | Phase |
|-----------|---------------|-------|
| `docs/lifecycle-apv2/` | 4 files: 00-overview.md, 01-prerequisites.md, 02-deployment-flow.md, 03-automatic-mode.md | Phase 11 |
| `docs/admin-setup-apv2/` | 5 files: 00-overview.md through 04-corporate-identifiers.md | Phase 15 |
| `docs/admin-setup-apv1/` | 11 files: 00-overview.md through 10-config-failures.md | Phase 16 |
| `docs/error-codes/06-apv2-device-preparation.md` | Exists | Phase 12 |
| `docs/l1-runbooks/06-09` (APv2) | 4 files: 06-apv2-deployment-not-launched.md, 07-apv2-apps-not-installed.md, 08-apv2-apv1-conflict.md, 09-apv2-deployment-timeout.md | Phase 13 |
| `docs/l2-runbooks/06-08` (APv2) | 3 files: 06-apv2-log-collection.md, 07-apv2-event-ids.md, 08-apv2-deployment-report.md | Phase 14 |
| `docs/decision-trees/04-apv2-triage.md` | Exists | Phase 13 |
| `docs/apv1-vs-apv2.md` | Exists | Phase 1+11 |

---

## Glossary Term Audit

Full scan of all Phase 11-16 output files to identify APv2-specific terms not yet in `docs/_glossary.md`:

### Required Minimums (from CONTEXT.md D-08 and success criterion 2)

| Term | Definition Context | APv1 Equivalent for Bidirectional Link |
|------|-------------------|----------------------------------------|
| Enrollment Time Grouping (ETG) | Core APv2 mechanism — replaces hardware hash pre-staging and ESP. Two-phase model: admin creates security group owned by Intune Provisioning Client; at enrollment time, device is added to group automatically. | Replaces both hardware hash registration (APv1 pre-staging) and ESP (policy/app delivery tracking). Cross-reference: [Hardware hash](#hardware-hash) and [ESP](#esp) |
| BootstrapperAgent | Component of IME that orchestrates APv2 provisioning on-device. Writes events to `Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin`. Different from APv1 event IDs (100-172, 807-908). | No direct APv1 equivalent. Cross-reference: [APv2](#apv2) |
| Device Preparation policy | The central APv2 configuration object in Intune — defines deployment settings, OOBE experience, apps and scripts to install during enrollment, and ETG device group reference. | APv1 equivalent: Autopilot deployment profile. Cross-reference: [APv1](#apv1) profile concept |

### Additional Candidates (audit-confirmed used across multiple Phase 11-16 files)

| Term | Used In | APv1 Equivalent |
|------|---------|-----------------|
| Intune Provisioning Client | admin-setup-apv2/00-overview.md, 02-etg-device-group.md, error-codes/06-apv2-device-preparation.md | No equivalent — APv2-specific service principal (AppID: f1346770-5b25-470b-88bd-d5744ab7952c) that adds devices to ETG group |
| Intune Management Extension (IME) | lifecycle-apv2/03-automatic-mode.md, l2-runbooks/06-apv2-log-collection.md, 07-apv2-event-ids.md | No direct APv1 equivalent; APv1 uses mdmdiagnosticstool.exe for log collection |
| Corporate identifiers | admin-setup-apv2/04-corporate-identifiers.md, error-codes/06-apv2-device-preparation.md | APv1 equivalent: hardware hash (both identify devices as corporate-owned at enrollment) |

### Terms That Do NOT Need New Glossary Entries
These already exist in `_glossary.md` or are adequately covered by existing entries:
- OOBE (exists)
- ESP (exists — needs APv2 "See also" note added per D-09, not a new entry)
- MDM enrollment (exists)
- TPM (exists)
- Hardware hash (exists — needs APv2 "See also" note for corporate identifiers)
- APv1, APv2 (exist — entries adequate, may need minor expansion)

### Alphabetical Index Impact
Current index has 26 terms. Phase 17 adds approximately 5-6 new terms. Updated index will have ~31-32 entries. New terms slot into existing categories:
- Enrollment category: Enrollment Time Grouping (ETG), BootstrapperAgent, Intune Management Extension (IME), Intune Provisioning Client
- Deployment Modes/Hardware category: Device Preparation policy, corporate identifiers

---

## Architecture Patterns

### Pattern 1: Framework Label Pattern (from Phase 12 error-codes index)
**What:** Bolt on a `**Framework:** APv1 (classic)` label to existing APv1 sections when adding new APv2 sections to the same file.
**When to use:** Any shared file that now covers both frameworks (index.md, common-issues.md, glossary).
**Example (from error-codes/00-index.md):**
```markdown
> **APv2 Note:** For APv2 (Device Preparation) error coverage, check the APv2 Notes section at the bottom of each category page. For framework differences, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).
```
The preferred form established in Phase 12 context D-03 is the inline label: `**Framework:** APv1 (classic)` and `**Framework:** APv2 (Device Preparation)`.

### Pattern 2: Version Gate Update for Dual-Framework Files
**What:** Replace framework-specific version gate blockquote with a dual-framework gate.
**Current (single-framework):**
```markdown
> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](apv1-vs-apv2.md).
```
**Updated (dual-framework):**
```markdown
> **Framework coverage:** This guide covers both Windows Autopilot (classic) and Autopilot Device Preparation (APv2).
> APv1 and APv2 sections are labeled throughout. Not sure which applies? See [APv1 vs APv2](apv1-vs-apv2.md).
```
Exact wording is Claude's discretion; the pattern is to signal dual coverage and point to the disambiguation page.

### Pattern 3: "See also" Bidirectional Footer (from Phase 11 D-11)
**What:** Inline "See also" note on a term pointing to its counterpart in the other framework.
**When to use:** Any glossary term that has a functional equivalent or replacement in the other framework.
**Example form (from 17-CONTEXT.md D-09):**
- On ESP entry: "APv2 note: APv2 does not use ESP. See [Enrollment Time Grouping](#enrollment-time-grouping)."
- On ETG entry: "APv1 equivalent: [ESP](#esp) (different mechanism — ETG replaces ESP's role in APv2)."

### Pattern 4: APv2 Subsection Addition Below Existing APv1 Content
**What:** Add APv2 content as a clearly labeled section below the existing APv1 content. Do not intermix.
**When to use:** common-issues.md, l1-runbooks/00-index.md, l2-runbooks/00-index.md, quick-ref cards.
**Structure:**
```markdown
## APv1 Section Title
**Framework:** APv1 (classic)
[existing content unchanged]

---

## APv2 Section Title
**Framework:** APv2 (Device Preparation)
[new APv2 content]
```

### Pattern 5: Frontmatter Update for Dual-Framework Files
**What:** Change frontmatter from single-framework to dual-framework values.
**Standard update:**
```yaml
applies_to: both    # was: APv1
audience: all       # was: L1, L2, or other single audience value
last_verified: 2026-04-13
review_by: 2026-07-12   # 90-day from verification date
```

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| New disambiguation logic | Custom "which framework" decision flow in common-issues.md | Single pointer link to `apv1-vs-apv2.md` | That page is already the canonical disambiguation source; duplicating logic creates maintenance burden |
| APv2 error code table | Inline error table in common-issues.md | Link to `error-codes/06-apv2-device-preparation.md` | Phase 12 already built the complete APv2 failure catalog; common-issues.md is a router, not a reference |
| New glossary category | Ad-hoc "APv2 Concepts" category | Fit new terms into existing categories (Enrollment, Deployment Modes) | D-10 explicitly prohibits new categories unless no existing category fits |

---

## Common Pitfalls

### Pitfall 1: Treating l2-runbooks/00-index.md as Already Updated
**What goes wrong:** D-13 says "verify only" for this file (Phase 14 was supposed to update it). Planner treats it as done. The file is NOT updated — it still has APv1-only content.
**Why it happens:** The CONTEXT.md note about Phase 14 was written based on what Phase 14 was supposed to do, not what it actually did.
**How to avoid:** The plan must include a full update task for l2-runbooks/00-index.md, not a verify task. Add APv2 section with links to 06-apv2-log-collection.md, 07-apv2-event-ids.md, 08-apv2-deployment-report.md.

### Pitfall 2: Cross-Contaminating APv2 Runbook Links with APv1 Content in common-issues.md
**What goes wrong:** An APv2 symptom entry in common-issues.md links to an APv1 runbook (or vice versa), breaking D-04's "no cross-contamination" requirement.
**Why it happens:** Some symptoms look similar (e.g., "apps not installed" exists in both APv1 ESP and APv2 Device Preparation). Writer links to the more familiar APv1 runbook.
**How to avoid:** APv2 section entries must only reference: `l1-runbooks/06-09` (APv2) and `l2-runbooks/06-08` (APv2). Zero links to APv1 runbooks 01-05 in the APv2 section.

### Pitfall 3: Stale Review Dates on Updated Files
**What goes wrong:** Updated files inherit the old `review_by` date from the original file, causing them to appear overdue immediately.
**Why it happens:** Editor updates content but forgets to refresh frontmatter.
**How to avoid:** Every file touched in this phase MUST get `last_verified: 2026-04-13` and `review_by: 2026-07-12` (90 days out, per established pattern).

### Pitfall 4: Glossary Alphabetical Index Out of Sync with New Entries
**What goes wrong:** New APv2 terms are added to the glossary body but not added to the alphabetical index at the top of `_glossary.md`.
**Why it happens:** The index is a separate section from the entries; easy to forget on a file with 30+ terms.
**How to avoid:** The plan task for the glossary must explicitly include updating both (a) the alphabetical index links and (b) the term entries. Verify count before and after.

### Pitfall 5: Version Gate on _glossary.md Still Says "Classic Only"
**What goes wrong:** The glossary's current version gate blockquote says "This guide applies to Windows Autopilot (classic)" even though `applies_to: both` is already in the frontmatter. This inconsistency persists after Phase 17 if the gate blockquote is not updated.
**Why it happens:** The frontmatter was set to `both` in Phase 1, but the blockquote text was never updated.
**How to avoid:** Update the version gate blockquote in _glossary.md to match the dual-framework framing (Pattern 2 above).

### Pitfall 6: Quick-Ref L2 Card APv2 Log Collection — Different Tool
**What goes wrong:** APv2 entries in quick-ref-l2.md use `mdmdiagnosticstool.exe`, which does NOT apply to APv2.
**Why it happens:** The L2 quick-ref card currently prominently features that command for APv1; a writer might add an APv2 "See also" row below the same command block.
**How to avoid:** APv2 log collection uses (1) BootstrapperAgent event log and (2) IME log folder. If adding inline APv2 content to quick-ref-l2.md, use a clearly labeled separate APv2 block. The existing mdmdiagnosticstool command must NOT appear in the APv2 section.

---

## File Inventory: Complete Change List

This is the authoritative list of every file this phase must modify. Cross-check against the plan to ensure nothing is missed.

### Hub files (5 files)
1. `docs/index.md` — restructure with APv2 subsections + Admin section + frontmatter
2. `docs/_glossary.md` — add ~6 APv2 terms + alphabetical index update + version gate fix + remove Phase 3 note
3. `docs/common-issues.md` — add APv2 section + framework labels + disambiguation pointer + frontmatter
4. `docs/error-codes/00-index.md` — minimal update (APv2 note already exists; verify framework labels are consistent)
5. (quick-ref cards covered under APv1 files section)

### APv1 files with APv2 back-links (6 files)
6. `docs/lifecycle/00-overview.md` — add lifecycle-apv2/00-overview.md to Related Documentation
7. `docs/l1-runbooks/00-index.md` — add APv2 section with links to runbooks 06-09
8. `docs/l2-runbooks/00-index.md` — add APv2 section with links to runbooks 06-08 (NOT verify-only — Phase 14 did not do this)
9. `docs/decision-trees/00-initial-triage.md` — add APv2 triage link in Scenario Trees section
10. `docs/quick-ref-l1.md` — APv2 entries or "See also" links (Claude's discretion)
11. `docs/quick-ref-l2.md` — APv2 entries or "See also" links, caution on log tool difference

**Total: 11 files modified.**

---

## Validation Architecture

The project has no automated test framework (`nyquist_validation` key is absent from config.json, treating as enabled, but there are no test files — this is a pure documentation project). All verification is manual link-checking.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | How to Verify |
|--------|----------|-----------|---------------|
| NAVG-01 | L1/L2/admin can reach APv2 content in ≤2 clicks from index.md | Manual link walk | Open index.md, follow one link to an APv2 section, follow one link from there to actual APv2 content |
| NAVG-01 | APv2 sections visually distinct from APv1 sections in index.md | Manual review | Visual inspection: APv2 sections have distinct headers and framework labels |
| NAVG-03 | APv2 common-issues entries link only to APv2 runbooks 06-09 / 06-08 | Manual link audit | Check every link in APv2 Failure Scenarios section — none should reference l1-runbooks/01-05 or l2-runbooks/01-05 |
| NAVG-04 | Every APv1 file with APv2 equivalent has back-link | Manual spot check | Check each of the 6 APv1 files in the change list for presence of APv2 link |
| NAVG-04 | Every APv2 file that references APv1 concept links back | Scope-limited check | Per D-14, this is scoped to hub files and direct counterparts only — individual runbooks not audited |

### Wave 0 Gaps
None — no test framework needed for documentation; all verification is manual link-checking during implementation.

---

## Sources

### Primary (HIGH confidence)
- Direct file reads of all 11 target files — current state fully mapped
- Direct file reads of all Phase 11-16 output files — APv2 terminology extracted from authoritative source files

### Secondary (MEDIUM confidence)
- `.planning/phases/17-navigation-hub-updates/17-CONTEXT.md` — locked decisions, canonical refs, patterns
- `.planning/STATE.md` — accumulated context and pending todos

### No external research required
This phase is entirely internal to the project. All required information is available from reading the existing files. No library documentation, no API references, no external standards apply.

---

## Metadata

**Confidence breakdown:**
- File inventory: HIGH — all target files read, paths verified, current state documented
- Glossary term audit: HIGH — terms extracted directly from Phase 11-16 output files
- Pattern reuse: HIGH — patterns read from actual established files (error-codes/00-index.md, Phase 11-16 frontmatter)
- l2-runbooks/00-index.md status: HIGH — file read, confirmed Phase 14 did not add APv2 section

**Research date:** 2026-04-13
**Valid until:** 2026-07-12 (90 days, stable documentation domain)
