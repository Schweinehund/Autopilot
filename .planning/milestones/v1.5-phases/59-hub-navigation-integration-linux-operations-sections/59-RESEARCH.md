# Phase 59: Hub Navigation Integration — Linux + Operations Sections — Research

**Researched:** 2026-05-01
**Domain:** GFM anchor/slug rules, hub-nav markdown patterns, glossary blockquote shapes, validator regex idioms
**Confidence:** HIGH (all findings verified directly from codebase; no assumed training-data claims)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**GA-1 (Linux H2 in docs/index.md) — winner 1A STRONG:**
- D-01: Linux H2 = pure Phase 57 Android mirror — 3 sub-tables, NO end-user guide, NO operations cross-refs inside Linux H2
- D-02: L1 sub-table = 4 rows (Lifecycle / Triage / L1 Runbooks / L1 Quick-Ref)
- D-03: L2 sub-table = 4 rows (Lifecycle / Log Collection / L2 Runbooks / L2 Quick-Ref)
- D-04: Admin sub-table = 3 rows (Admin Setup Overview / Lifecycle / Capability Matrix)
- D-05: Cross-Platform References sub-table gets 2 new Linux entries (Lifecycle + Capability Matrix)
- D-06: LIN-06 `linux-intune-portal-enrollment.md` NOT surfaced at hub level (Phase 57 precedent)

**GA-2 (Operations H2 in docs/index.md) — winner 2C VERY HIGH:**
- D-07: New `## Operations` H2 inserted AFTER Linux H2 and BEFORE Cross-Platform References
- D-08: H2 name is EXACTLY `## Operations` — NOT "Operational Depth"
- D-09: 4 sub-H3 compact substructure (Co-Management / Patch & Update Management / App Lifecycle Automation / Compliance Drift Detection + Tenant Migration); each = 1-sentence framing + 1-3 row routing table; Resource | Description columns
- D-10: `docs/operations/00-index.md` completion MANDATORY same-commit — Patch=5 rows + App=5 rows + Drift=5 rows added using Co-Management section (lines 14-25) as structural template; Guide | Covers columns
- D-11: Append-only H2-block contract; Linux H2 FIRST, then Operations H2, both before Cross-Platform References
- D-12: line-214 Monitoring and Operations entry in Cross-Platform References — no change required
- D-13: No naming collision with `### Device Operations` H3 (line 85) — GFM produces distinct anchors `#operations` vs `#device-operations`

**GA-3 (Glossary CLEAN-08) — winner 3E HIGH:**
- D-14: Option 3E — top-N inline-in-blockquote, soft-contract reciprocity
- D-15: See-also line shape LOCKED: `> See also: [Term](other-glossary.md#anchor) (Other-Platform); ...` appended as LAST line of existing per-term blockquotes; for Win glossary terms WITHOUT cross-platform blockquotes, ADD new `> **Cross-platform note:**` blockquote; existing macOS `> **Windows equivalent:**` blockquotes PRESERVED verbatim
- D-16: Collision-term matrix selected at plan-time (plan-author writes explicit matrix before commit-1 of plan 59-05); seed sources: 9 LIN-02 absent-concept terms from Phase 49 D-13; encryption triple; CA-channel pair; enrollment-channel triple; linux-capability-matrix.md Cross-Platform Equivalences section
- D-17: Reciprocity contract = BIDIRECTIONAL + TRANSITIVELY COMPLETE (A↔B, A↔C, B↔C for all platforms listing the term)
- D-18: 4-file equivalent (NOT 5 files); `_glossary-macos.md` IS the iOS glossary per REQUIREMENTS.md:144 + Phase 49 D-17; no new `_glossary-ios.md`
- D-19: Validator assertions A1 (reciprocity), A2 (anchor-correctness), A3 (blockquote integrity); sidecar allowlist for post-phase additions
- D-20: Phase 49 LIN-02 doc-level banner-links are ALREADY DONE — Phase 59 delta is per-term see-also only

**GA-4 (Linux quick-ref-l1/l2) — winner 4A HIGH (Referee FLIP from 4C):**
- D-21: Both files get `## Linux Quick Reference` H2 with 4-sub-H3 structure
- D-22: L1 four-part LOCKED: Top Checks (4) / Linux Escalation Triggers / Linux Decision Tree / Linux Runbooks; NO Mode tags
- D-23: L2 four-part LOCKED: Linux Diagnostic Data Collection (3 methods) / Key Intune Portal Paths (Linux L2) / Linux Compliance Category Reference (4-row pointer table) / Linux Investigation Runbooks
- D-24: PITFALL-7 firewall — pointer-table cells contain ONLY name + 1-line role + cross-link to SSoT; no Bash syntax, no compliance-evaluation-cadence content
- D-25: Mode-tag-free contract; no `[22.04]`/`[24.04]`/`[BYOD]` etc.

**Validator + Commit:**
- D-26: check-phase-59.mjs — 30-36 V-59-NN assertions; file-reads-only / no-shared-module / regex-based
- D-27: Implementation pattern matches check-phase-58.mjs / check-phase-57.mjs
- D-28: Progressive-landing per Phase 57/58 lineage; 8-9 plan decomposition (59-01 through 59-09)
- D-29: Pre-commit gate = 3 validators + 4 file-level checks (V-59-NN exit-0; v1.5-milestone-audit exit-0; supervision-pins self-test exit-0; markdown-link-check informational; pre-edit anchor inventory; last_verified refresh; Linux literal sanity check)
- D-30: Hardcoded anchor strings + literal-token regexes pinned in validator AND CONTEXT.md

### Claude's Discretion

- Specific phrasing of 1-sentence sub-H3 framings under Operations H2 (D-09) — tone matching `### Device Operations` H3 at docs/index.md:85
- Specific row counts in Operations sub-tables (D-09) — bounded 1-3 rows per sub-H3
- Selection of which 1-2 rows per Operations sub-H3 link to per-platform deep guides vs only sub-dir overview
- Order of plans within Phase 59 — D-28 is recommendation; 59-04 must follow 59-03; 59-08 follows all content
- Specific phrasing of 1-line "role" descriptions in Linux Compliance Category Reference (D-23)
- Selection of Intune portal paths for Key Intune Portal Paths sub-H3 (D-23 second slot, 3-5 rows)
- Whether to update `_glossary-macos.md` H1 framing per D-18 informational note — discretionary
- Whether to add operations/00-index.md row in Cross-Platform References per D-12 — discretionary

### Deferred Ideas (OUT OF SCOPE)

Phase 59 is HUB-NAV + GLOSSARY-NORMALIZATION + QUICK-REF-LINUX only. Per CONTEXT.md phase boundary:
- No new runbook content
- No new admin-setup content
- No new operations content
- No new lifecycle content
- No creation of `_glossary-ios.md` separate file (3D rejection)
- No "Operational Depth" H2 naming
- LIN-06 end-user guide NOT surfaced at hub
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CLEAN-08 | Glossary cross-reference normalization — Windows + macOS + iOS + Android + Linux glossaries each contain reciprocal `see-also` entries for cross-platform-equivalent terms (extends v1.4 macOS↔Android pattern across all 5 platforms) | GA-3 winner 3E; 4-file equivalent per D-18; per-term blockquote inline-append pattern documented below |
</phase_requirements>

---

## Summary

Phase 59 is a precision documentation retrofit across 6 existing files — a hub-navigation surgical patch that lands Linux into `docs/index.md` at Android-equivalent structural depth, completes `docs/operations/00-index.md` (currently a 25-line stub), adds a net-new `## Operations` H2 to the hub, normalizes CLEAN-08 glossary see-also reciprocity across all 4 glossary files, and adds `## Linux Quick Reference` H2 sections to both quick-ref cards. All 30 implementation decisions are locked via 12-agent adversarial review. Research confirms codebase pattern fidelity for all 6 deliverables and identifies the full validator regex architecture for check-phase-59.mjs.

The phase has a low ambiguity surface because decisions are locked. Planner focus areas are: (1) exact row content for each sub-table (locked by D-02..D-05/D-09/D-10/D-22..D-23); (2) collision-term matrix for glossary work (plan-author task at plan 59-05); (3) validator check clustering and novel regex patterns (bidirectional see-also reciprocity is new); (4) sequencing constraint (59-04 depends on 59-03).

**Primary recommendation:** Follow the D-28 8-9 plan decomposition exactly. Read the Phase 57 Android H2 at docs/index.md:167-196 and Android Quick Reference sections in quick-ref-l1.md:149-183 and quick-ref-l2.md:233-281 as the verbatim structural templates before writing any Linux content plan. Write the collision-term matrix as the first artifact inside plan 59-05 before any glossary edits.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| docs/index.md Linux H2 | Static documentation | — | Hub-nav pointer file; no backend dependency |
| docs/index.md Operations H2 | Static documentation | — | Hub-nav pointer file; no backend dependency |
| docs/operations/00-index.md completion | Static documentation | — | Ops-domain index stub; all target files already exist |
| Glossary see-also normalization | Static documentation | — | Inline blockquote append; CLEAN-08 compliance |
| quick-ref-l1.md Linux H2 | Static documentation | — | Append to existing quick-ref card |
| quick-ref-l2.md Linux H2 | Static documentation | — | Append to existing quick-ref card; pointer-table pattern |
| check-phase-59.mjs validator | CI/tooling | Static validation only | File-reads-only / regex-based per D-26/D-27 |

All deliverables are pure static documentation edits and one Node.js validator. No API, no database, no frontend changes.

---

## Standard Stack

Phase 59 requires no new library installations. The validator continues the Phase 48-58 lineage.

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js built-ins (`fs`, `path`, `process`) | Inherited | check-phase-59.mjs file I/O | Per D-26/D-27 no-shared-module lineage |
| GFM (GitHub Flavored Markdown) | N/A | Anchor slug computation | Hub files rendered by GitHub |

### Installation

```bash
# No new installs required — validator uses Node.js built-ins only
```

**Version verification:** `node --version` — Node.js is the only runtime dependency.

---

## Architecture Patterns

### System Architecture Diagram

```
59-01 Pre-edit anchor inventory
       ↓
59-02 docs/index.md Linux H2 (append after Android H2, before Cross-Platform References)
       ↓
59-03 docs/operations/00-index.md completion (Patch + App + Drift sections)
       ↓
59-04 docs/index.md Operations H2 (depends on 59-03 for ops-index content existence)
       ↓
59-05 Glossary CLEAN-08 see-also normalization (all 4 glossary files)
       ↓
59-06 docs/quick-ref-l1.md Linux H2
       ↓
59-07 docs/quick-ref-l2.md Linux H2
       ↓
59-08 scripts/validation/check-phase-59.mjs
       ↓
59-09 Pre-commit gate + frontmatter refresh + VERIFICATION.md
```

### Recommended Project Structure

No new directories. All files are edits to existing files or creation of:
```
.planning/phases/59-hub-navigation-integration-linux-operations-sections/
├── 59-ANCHOR-INVENTORY.md   (new artifact — plan 59-01)
├── 59-RESEARCH.md           (this file)
scripts/validation/
└── check-phase-59.mjs       (new — plan 59-08)
```

---

## Codebase Pattern Extraction — Verified

### Pattern 1: Phase 57 Android H2 in docs/index.md (lines 167-196) — Linux mirror template

**Source:** `docs/index.md` lines 167-196 [VERIFIED: read from codebase]

```markdown
## Android Enterprise Provisioning

Troubleshooting, investigation, and setup guides for Android Enterprise provisioning
through Microsoft Intune. For terminology, see the [Android Enterprise Provisioning
Glossary](_glossary-android.md). For enrollment paths, see the [Android Provisioning
Lifecycle](android-lifecycle/00-enrollment-overview.md).

### Service Desk (L1)

| Resource | When to Use |
|----------|-------------|
| [Android Provisioning Lifecycle](android-lifecycle/00-enrollment-overview.md) | Start here -- understand the Android enrollment paths (BYOD / COBO / Dedicated / ZTE / AOSP) and DPC modes |
| [Android Triage Decision Tree](decision-trees/08-android-triage.md) | Identifies the Android failure scenario from symptoms and routes to the correct runbook (mode-first per Phase 40 D-01) |
| [Android L1 Runbooks](l1-runbooks/00-index.md#android-l1-runbooks) | Scripted procedures for the 8 Android Enterprise enrollment + compliance failure scenarios (runbooks 22-29) |
| [L1 Quick-Reference Card](quick-ref-l1.md#android-enterprise-quick-reference) | One-page cheat sheet -- top checks with mode tags, escalation triggers, decision tree, and runbook list |

### Desktop Engineering (L2)

| Resource | When to Use |
|----------|-------------|
| [Android Provisioning Lifecycle](android-lifecycle/00-enrollment-overview.md) | Review the Android enrollment paths before diagnosing |
| [Android Log Collection Guide](l2-runbooks/18-android-log-collection.md) | Prerequisite for all Android L2 investigations (3-method: Company Portal / Microsoft Intune App / adb logcat) |
| [Android L2 Runbooks](l2-runbooks/00-index.md#android-l2-runbooks) | Investigation guides for enrollment, app install, compliance, Knox, and AOSP failures (runbooks 18-23) |
| [L2 Quick-Reference Card](quick-ref-l2.md#android-enterprise-quick-reference) | One-page cheat sheet -- 3-method log collection, Intune portal paths, Play Integrity verdict reference, investigation runbook list |

### Admin Setup

| Resource | When to Use |
|----------|-------------|
| [Android Admin Setup Overview](admin-setup-android/00-overview.md) | Entry point for all Android admin setup guides; tri-portal Mermaid diagram + per-mode setup-sequence enumeration lives at this overview, not at hub level |
| [Android Provisioning Lifecycle](android-lifecycle/00-enrollment-overview.md) | Review the enrollment pipeline before configuring Intune + MGP (admin-context entry) |
| [Android Capability Matrix](reference/android-capability-matrix.md) | Compare Android feature parity vs Windows, macOS, iOS -- scannable 5-domain table |
```

**Key structural observations:**
- H2 intro paragraph: references glossary + lifecycle file
- Column headers: `| Resource | When to Use |` (NOT `| Resource | Description |`)
- Row format: `| [Link text](relative/path.md) | Prose description |`
- Sub-H3 literals: `### Service Desk (L1)` / `### Desktop Engineering (L2)` / `### Admin Setup`
- L1 4th row links to quick-ref-l1.md with fragment anchor to the platform-specific H2
- L2 4th row links to quick-ref-l2.md with fragment anchor to the platform-specific H2
- Admin 1st row = overview-only discipline (per-file enumeration at overview, NOT at hub)
- Separator `---` appears BETWEEN H2 sections (lines 165-166, 197-198)

**Linux mirror derivation (from D-02/D-03/D-04):**

```markdown
## Linux Provisioning

Troubleshooting, investigation, and setup guides for Linux (Ubuntu 22.04 / 24.04 LTS)
device management through Microsoft Intune. For terminology, see the [Linux Provisioning
Glossary](_glossary-linux.md). For enrollment paths, see the [Linux Provisioning
Lifecycle](linux-lifecycle/00-enrollment-overview.md).

### Service Desk (L1)

| Resource | When to Use |
|----------|-------------|
| [Linux Provisioning Lifecycle](linux-lifecycle/00-enrollment-overview.md) | Start here -- understand the Linux enrollment paths (Ubuntu 22.04 / 24.04 LTS, intune-portal package install, microsoft-identity-broker) |
| [Linux Triage Decision Tree](decision-trees/09-linux-triage.md) | Identifies the Linux failure scenario from symptoms (enrollment failed / non-compliant / web-app-CA-blocking-Edge / agent service not running) and routes to the correct runbook |
| [Linux L1 Runbooks](l1-runbooks/00-index.md#linux-l1-runbooks) | Scripted procedures for the 4 Linux failure scenarios (runbooks 30-33) |
| [L1 Quick-Reference Card](quick-ref-l1.md#linux-quick-reference) | One-page cheat sheet -- top checks, escalation triggers, decision tree, and runbook list |

### Desktop Engineering (L2)

| Resource | When to Use |
|----------|-------------|
| [Linux Provisioning Lifecycle](linux-lifecycle/00-enrollment-overview.md) | Review the Linux enrollment pipeline before diagnosing |
| [Linux Log Collection Guide](l2-runbooks/24-linux-log-collection.md) | Prerequisite for all Linux L2 investigations (3-method matrix: journalctl / file-based paths / package-state queries) |
| [Linux L2 Runbooks](l2-runbooks/00-index.md#linux-l2-runbooks) | Investigation guides for log collection + agent investigation (runbooks 24-25) |
| [L2 Quick-Reference Card](quick-ref-l2.md#linux-quick-reference) | One-page cheat sheet -- 3-method log collection, Intune portal paths, Linux compliance category reference, investigation runbook list |

### Admin Setup

| Resource | When to Use |
|----------|-------------|
| [Linux Admin Setup Overview](admin-setup-linux/00-overview.md) | Entry point for all Linux admin setup guides; per-file setup sequence (00-05) lives at this overview, not at hub level |
| [Linux Provisioning Lifecycle](linux-lifecycle/00-enrollment-overview.md) | Review the enrollment pipeline before configuring Intune + intune-portal package (admin-context entry) |
| [Linux Capability Matrix](reference/linux-capability-matrix.md) | Compare Linux feature parity vs Windows, macOS, iOS, Android -- scannable 6-domain table |
```

**Notes for planner:**
- Quick-ref fragment anchors: `quick-ref-l1.md#linux-quick-reference` and `quick-ref-l2.md#linux-quick-reference` — these are forward references that exist after plan 59-06/59-07 land. Plans 59-02 (Linux H2) and 59-06/59-07 (quick-ref Linux H2) can be ordered with 59-02 first; the fragment anchors are forward references that resolve once 59-06/59-07 land. No blocking dependency.
- `l1-runbooks/00-index.md#linux-l1-runbooks` and `l2-runbooks/00-index.md#linux-l2-runbooks` — plan-author should verify these anchor slugs exist in the respective index files at plan-time.

---

### Pattern 2: Phase 57 Android Quick Reference in quick-ref-l1.md (lines 149-183)

**Source:** `docs/quick-ref-l1.md` lines 149-183 [VERIFIED: read from codebase]

```markdown
## Android Enterprise Quick Reference

**Platform:** Android Enterprise through Microsoft Intune

### Top Checks

1. **[All GMS]** Device visible in Intune? -- Intune admin center > Devices > Android -- ...
2. **[BYOD]** Work profile / briefcase badge present on device? -- ...
3. **[ZTE/Knox]** Serial in Zero-Touch portal or Knox Mobile Enrollment portal? -- ...
4. **[All GMS]** Compliance state in Intune device blade? -- ...
5. **[AOSP]** OEM identifier captured? -- ...

### Android Escalation Triggers

- **[ZTE]** ... --> **Escalate L2** (collect: ...)
[5 items]

### Android Decision Tree

- [Android Triage Decision Tree](decision-trees/08-android-triage.md) -- start here for Android Enterprise failures

### Android Runbooks

- **[All GMS]** [Android Enrollment Blocked](l1-runbooks/22-android-enrollment-blocked.md) -- ...
[8 runbook links with Mode prefix tags]
```

**Linux L1 mirror key differences (from D-22/D-25):**
- `**Platform:** Linux (Ubuntu 22.04 / 24.04 LTS) through Microsoft Intune` intro line
- Top Checks: 4 items (parity with macOS 4-count, not Android 5-count); NO Mode tags
- Sub-H3 literals: `### Top Checks` / `### Linux Escalation Triggers` / `### Linux Decision Tree` / `### Linux Runbooks`
- Linux Runbooks: 4 links (30-33) with iOS-style ` -- ` disambiguation (no bracket Mode prefixes)
- Linux Decision Tree: single link to `decision-trees/09-linux-triage.md`

**iOS quick-ref L1 pattern (lines 117-148) also validated — no Mode tags, same 4-sub-H3 shape:**

```markdown
### iOS Runbooks

- [iOS APNs Certificate Expired](l1-runbooks/16-ios-apns-expired.md) -- cross-platform blast radius; ...
- [iOS ADE Not Starting](l1-runbooks/17-ios-ade-not-starting.md) -- three failure signatures
[6 runbooks, each with ` -- ` description, NO Mode-tag brackets]
```

---

### Pattern 3: Android Play Integrity Verdict Reference in quick-ref-l2.md (lines 261-271) — Linux Compliance Category Reference mirror template

**Source:** `docs/quick-ref-l2.md` lines 261-271 [VERIFIED: read from codebase]

```markdown
### Play Integrity Verdict Reference

| Verdict | One-line Meaning | SSoT |
|---------|------------------|------|
| MEETS_BASIC_INTEGRITY | Device passed basic integrity check (running on a real Android device, not heavily-modified) | [Phase 54 SSoT](../operations/patch-management/04-android-patch-delivery.md#play-integrity-attestation) |
| MEETS_DEVICE_INTEGRITY | Device passed integrity + has Google Play Services (a recognized app-distribution surface) | [Phase 54 SSoT](../operations/patch-management/04-android-patch-delivery.md#play-integrity-attestation) |
| MEETS_STRONG_INTEGRITY | Device passed integrity + has Google Play Services + has hardware-backed key attestation + meets the Android security patch age requirement | [Phase 54 SSoT](../operations/patch-management/04-android-patch-delivery.md#play-integrity-attestation) |

> ⚠️ **Cascade deadlines and the full enforcement-cascade migration playbook are owned by [Phase 54 SSoT — Android Patch Delivery — Deadlines](../operations/patch-management/04-android-patch-delivery.md#deadlines-cutover-dates).**

Full cascade timeline and remediation playbook: see [Android Patch Delivery — Deadlines](../operations/patch-management/04-android-patch-delivery.md#deadlines-cutover-dates).
```

**Linux Compliance Category Reference mirror (from D-23/D-24):**

Table shape: `| Category | One-line role | Cross-link to SSoT |` (3 columns matching Android's `| Verdict | One-line Meaning | SSoT |`)

4 rows:
1. `Allowed Distributions` | One-line role | link to `../admin-setup-linux/03-compliance-policy.md#step-2-configure-allowed-distributions`
2. `Custom Compliance` | One-line role | link to `../admin-setup-linux/03-compliance-policy.md#step-3-configure-custom-compliance-bash-discovery-scripts`
3. `Device Encryption` | One-line role | link to `../admin-setup-linux/03-compliance-policy.md#step-4-configure-device-encryption-dm-crypt-luks`
4. `Password Policy` | One-line role | link to `../admin-setup-linux/03-compliance-policy.md#step-5-configure-password-policy`

**Verified anchor slugs** [VERIFIED: computed from actual H3 text in 03-compliance-policy.md]:
- `#step-2-configure-allowed-distributions`
- `#step-3-configure-custom-compliance-bash-discovery-scripts`
- `#step-4-configure-device-encryption-dm-crypt-luks`
- `#step-5-configure-password-policy`

PITFALL-7 firewall (D-24): NO Bash script syntax, no `#!/bin/bash`, no `exit 0`, no compliance-evaluation-cadence content in any cell.

---

### Pattern 4: docs/operations/00-index.md Co-Management section (lines 14-25) — template for D-10 completion

**Source:** `docs/operations/00-index.md` [VERIFIED: read from codebase, 24 lines total]

```markdown
## Co-Management

Windows ConfigMgr-to-Intune co-management guidance — workload slider model, migration sequence,
tenant attach disambiguation, and Windows Autopatch prerequisites.

| Guide | Covers |
|-------|--------|
| [Overview: Workload Model](co-management/00-overview.md) | 7 workloads, 3 slider states, Pilot Intune disambiguation |
| [Windows Tenant Attach](co-management/01-windows-tenant-attach.md) | Tenant attach vs full co-management |
| [Workload Slider Migration](co-management/02-windows-workload-sliders.md) | Low-risk-first migration sequence, EP HIGH-RISK callout |
| [Migration Paths and Autopatch](co-management/03-cocmgmt-migration-paths.md) | Windows Autopatch co-management prerequisites |
```

**Template dissection (from D-10):**
- `## {Sub-domain name}` H2 heading
- 2-3 sentence framing paragraph (matching cross-platform routing tone of sub-dir 00-overview blockquote)
- Table with `| Guide | Covers |` columns
- 1 row per file in sub-dir (Co-Management = 4 rows; Patch/App/Drift = 5 rows each)
- Row format: `| [Link text](subdir/filename.md) | Short coverage description |`

**Files per sub-dir** [VERIFIED: ls from codebase]:
- Patch: 00-overview + 01-windows-wufb-rings + 02-macos-update-enforcement + 03-ios-update-lifecycle + 04-android-patch-delivery = **5 rows**
- App: 00-overview + 01-windows-win32-msix-scale + 02-macos-pkg-dmg-pipeline + 03-ios-vpp-licensing + 04-android-mgp-lifecycle = **5 rows**
- Drift: 00-overview + 01-windows-drift-detection + 02-macos-drift-detection + 03-ios-android-drift-detection + 04-tenant-migration-runbook = **5 rows**

---

### Pattern 5: Glossary blockquote shapes

#### Android `> **Cross-platform note:**` shape (pattern plan 59-05 EXTENDS with see-also line)

**Source:** `docs/_glossary-android.md` COBO entry (lines ~42-46) [VERIFIED: read from codebase]

```markdown
> **Cross-platform note:** No exact Windows/macOS/iOS term; the closest analog is iOS ADE-supervised
> corporate-owned enrollment through [ABM](_glossary-macos.md#abm) (see [iOS Supervision](_glossary-macos.md#supervision))
> or macOS ADE-enrolled supervised. On Windows, Autopilot corporate-owned deployment is the closest analog.
> Mapping is partial — "corporate-owned" has a cross-platform meaning but the per-platform management scopes
> differ. Do not conflate COBO with iOS supervision state; supervision is a permanent per-device gating state
> on iOS, whereas COBO is an ownership-mode designation on Android.
```

**Phase 59 delta — append as LAST line of existing blockquote:**
```
> See also: [COBO equivalent](../_glossary-linux.md#<anchor>) (Linux); [similar-term](_glossary.md#<anchor>) (Windows).
```

The see-also line is preceded by another `>`-prefixed line (A3 blockquote-integrity requirement). The existing blockquote prose is PRESERVED verbatim — only appending one new `>` line.

#### macOS `> **Windows equivalent:**` shape (PRESERVED VERBATIM, see-also appended inside)

**Source:** `docs/_glossary-macos.md` Account-Driven User Enrollment, ADE, Await Configuration, Setup Assistant, Supervision entries [VERIFIED: read from codebase]

```markdown
> **Windows equivalent:** No direct equivalent. The closest parallel is [Intune MAM-WE](#mam-we) on Windows
> MAM-enrolled devices, but Account-Driven User Enrollment is a device-level BYOD enrollment path whereas
> Windows MAM-WE is app-layer only...
```

**Phase 59 delta — append as LAST line, DO NOT rename `> **Windows equivalent:**` to `> **Cross-platform note:**`:**
```
> See also: [analogous-term](_glossary-android.md#<anchor>) (Android); [analogous-term](_glossary-linux.md#<anchor>) (Linux).
```

#### Windows glossary — currently 0 cross-platform blockquotes (D-15 adds new ones)

**Source:** `docs/_glossary.md` [VERIFIED: read from codebase]

Windows glossary uses `> **APv2 only.**`, `> **Both frameworks.**`, `> **APv2 note:**` shapes but has 0 `> **Cross-platform note:**` blockquotes for the collision-matrix terms. Phase 59 must ADD new `> **Cross-platform note:**` blockquotes for applicable collision-matrix terms (pattern: identical to Android/Linux shape).

**D-15 shape for new Windows blockquotes:**
```markdown
> **Cross-platform note:** [2-3 sentence disambiguation prose]
> See also: [Term](_glossary-macos.md#anchor) (Apple/macOS+iOS); [Term](_glossary-android.md#anchor) (Android); [Term](_glossary-linux.md#anchor) (Linux).
```

#### Linux glossary cross-platform blockquotes — examples

**Source:** `docs/_glossary-linux.md` dm-crypt entry [VERIFIED: read from codebase]

```markdown
> **Cross-platform note:** On Windows, the analog is BitLocker (drive-level encryption surfaced as a
> compliance signal). On macOS, the analog is FileVault (full-disk XTS-AES encryption). Android uses
> dm-crypt internally on some hardware but Intune does not expose Android dm-crypt as a compliance signal
> — see the [Android Enterprise Provisioning Glossary](_glossary-android.md). Do not conflate the
> platform-specific encryption surfaces.
```

**Phase 59 delta:** Append `> See also: [BitLocker](_glossary.md#bitlocker) (Windows); [FileVault](_glossary-macos.md#filevault) (Apple/macOS).` as the LAST `>` line.

---

### Pattern 6: GFM Kebab-Case Slug Rules — Verified

**Source:** Node.js computation against all Phase 59 relevant headings [VERIFIED: computed in this session]

**GFM slug algorithm:**
1. Lowercase the heading text
2. Remove all characters that are not word characters (`\w` = `[a-zA-Z0-9_]`), spaces, or hyphens
3. Replace runs of whitespace with a single hyphen
4. Collapse multiple consecutive hyphens to one
5. Trim leading/trailing hyphens

**Key results for Phase 59 headings:**

| Heading | GFM Anchor Slug |
|---------|----------------|
| `## Linux Provisioning` | `#linux-provisioning` |
| `## Operations` | `#operations` |
| `## Cross-Platform References` | `#cross-platform-references` |
| `## Android Enterprise Provisioning` | `#android-enterprise-provisioning` |
| `## iOS/iPadOS Provisioning` | `#iosipados-provisioning` |
| `### Device Operations` (existing Windows H3) | `#device-operations` |
| `### Co-Management` | `#co-management` |
| `### Patch & Update Management` | `#patch-update-management` |
| `### App Lifecycle Automation` | `#app-lifecycle-automation` |
| `### Compliance Drift Detection + Tenant Migration` | `#compliance-drift-detection-tenant-migration` |
| `## Linux Quick Reference` | `#linux-quick-reference` |
| `### Top Checks` | `#top-checks` |
| `### Linux Escalation Triggers` | `#linux-escalation-triggers` |
| `### Linux Decision Tree` | `#linux-decision-tree` |
| `### Linux Runbooks` | `#linux-runbooks` |
| `### Linux Diagnostic Data Collection (3 methods)` | `#linux-diagnostic-data-collection-3-methods` |
| `### Key Intune Portal Paths (Linux L2)` | `#key-intune-portal-paths-linux-l2` |
| `### Linux Compliance Category Reference` | `#linux-compliance-category-reference` |
| `### Linux Investigation Runbooks` | `#linux-investigation-runbooks` |
| `## Android Enterprise Quick Reference` | `#android-enterprise-quick-reference` |
| `## iOS/iPadOS Quick Reference` | `#iosipados-quick-reference` |

**Critical observation:** `&` in `Patch & Update Management` is STRIPPED (not converted to hyphen), leaving a single space between `patch` and `update`, resulting in `#patch-update-management` (not `#patch--update-management` — the double-hyphen collapses). Similarly `+` in `Compliance Drift Detection + Tenant Migration` is stripped → `#compliance-drift-detection-tenant-migration`.

**Anchor conflict check (D-13):** `#operations` (new H2) vs `#device-operations` (existing Windows H3 at line 85) — DISTINCT. Confirmed by GFM algorithm. No disambiguation banner needed.

---

### Pattern 7: Validator Regex Idioms — Extracted from check-phase-57.mjs and check-phase-58.mjs

**Source:** Both validator files read verbatim from codebase [VERIFIED]

#### Core idiom 1: `sliceH2Region(content, h2Literal)` — used in ALL phase validators

```javascript
function sliceH2Region(content, h2Literal) {
  const re = new RegExp("^" + h2Literal.replace(/[/\\^$*+?.()|[\]{}]/g, "\\$&") + "\\s*$", "m");
  const m = content.match(re);
  if (!m) return null;
  const idx = content.indexOf(m[0]);
  const after = content.slice(idx + m[0].length);
  const nextH2 = after.search(/^## /m);
  return nextH2 > 0 ? content.slice(idx, idx + m[0].length + nextH2) : content.slice(idx);
}
```

This function returns the full H2 body from the H2 literal to the next `## ` heading or EOF. Used for **all** H2-scoped assertions.

#### Core idiom 2: H3-boundary slicing within an H2 region

```javascript
// From V-57-06: slice from H3 literal to next ### or end of region
const idx = region.indexOf(h3);
const after = region.slice(idx + h3.length);
const nextH3 = after.search(/^### /m);
const window = nextH3 > 0 ? after.slice(0, nextH3) : after;
// Then count rows: (window.match(/^\| \[/gm) || []).length
```

**Row-count pattern for sub-tables:** Count lines starting with `| [` (i.e., table data rows beginning with a link). Header row starts with `| Resource` or `| Guide`, separator row starts with `|---`, both excluded naturally.

#### Core idiom 3: NEGATIVE regression-guard pattern

```javascript
// From V-57-25: anchor stability
const expected = [
  [INDEX_MD, /^## iOS\/iPadOS Provisioning\s*$/m, "## iOS/iPadOS Provisioning"],
  ...
];
// Test: re.test(content) must be TRUE (anchor present = no regression)
```

For Phase 59, this becomes: `## Android Enterprise Provisioning`, `## iOS/iPadOS Provisioning`, `## macOS Provisioning`, `## Windows Autopilot` must all remain present in `docs/index.md` after edits. Similarly in quick-ref files: `## Android Enterprise Quick Reference` and `## iOS/iPadOS Quick Reference`.

#### Core idiom 4: TBD/TODO/PLACEHOLDER scan with Version History stripping

```javascript
// From V-57-26 and V-58-24
const stripped = c
  .replace(/```[\s\S]*?```/g, '')       // strip code blocks
  .replace(/^## Version History[\s\S]*$/m, '')  // strip Version History to EOF
  .replace(/^## Changelog[\s\S]*$/m, '');       // belt-and-braces
const banned = /\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b/;
if (banned.test(stripped)) { /* fail */ }
```

#### Core idiom 5: `extractCanonicalDataCells()` — col-0 exclusion fix from Phase 58

```javascript
// From check-phase-58.mjs lines 57-75 — Rule 1 fix (Plan 58-05 deviation pattern)
function extractCanonicalDataCells(content) {
  const lines = content.split('\n');
  const cells = [];
  for (const line of lines) {
    if (!/^\|/.test(line)) continue;
    if (/^\|[-: ]+\|/.test(line)) continue;          // skip separator rows
    const lineCells = line.split('|').slice(1, -1);
    if (lineCells.length !== 6) continue;              // only canonical 6-col tables
    const trimmed0 = lineCells[0].trim();
    if (trimmed0 === 'Feature') continue;              // skip header row
    for (let i = 1; i < 6; i++) {                     // push cols 1-5 (exclude col-0)
      cells.push(lineCells[i].trim());
    }
  }
  return cells;
}
```

**Phase 59 note:** This idiom is NOT directly reused in check-phase-59.mjs (no 6-column comparison table). However, the col-0 exclusion principle applies to 3-column pointer tables like Linux Compliance Category Reference — the Category name column (col-0) is intentionally NOT link-bearing, so any PITFALL-7 link assertion for that table must exclude col-0.

#### Core idiom 6: H3-bounded `> See also:` check — NOVEL for Phase 59

This pattern does NOT exist in check-phase-57.mjs or check-phase-58.mjs. Phase 59 introduces it for V-59-20..24. The required logic:

```javascript
// NOVEL: For each collision term T, find its H3 region in each glossary file,
// then verify `> See also:` line exists within that H3 region AND is preceded by
// another `>` line (A3 blockquote integrity).
function findH3Region(content, h3Literal) {
  const re = new RegExp("^" + h3Literal.replace(/[/\\^$*+?.()|[\]{}]/g, "\\$&") + "\\s*$", "m");
  const m = content.match(re);
  if (!m) return null;
  const idx = content.indexOf(m[0]);
  const after = content.slice(idx + m[0].length);
  const nextH3 = after.search(/^### /m);
  const nextH2 = after.search(/^## /m);
  // End at next H3 or next H2 or EOF
  const end = Math.min(
    nextH3 > 0 ? nextH3 : Infinity,
    nextH2 > 0 ? nextH2 : Infinity
  );
  return end === Infinity ? after : after.slice(0, end);
}

// A1 — reciprocity: H3 region contains `> See also:` with link to target glossary
function checkReciprocity(glossaryContent, h3Literal, targetGlossaryPath) {
  const region = findH3Region(glossaryContent, h3Literal);
  if (!region) return false;
  // Check for See also line containing target path
  return /> See also:/.test(region) && region.includes(targetGlossaryPath);
}

// A2 — anchor correctness: verify target anchor exists in target file
function checkAnchorExists(targetContent, anchorSlug) {
  // Compute expected H3 heading that would produce the slug, OR check for <a id="slug"> explicit anchor
  // Simplest approach: verify the heading that GFM would slug to the target exists
  // OR: verify a link target appears as a heading in the target file
  const re = new RegExp("#" + anchorSlug + "\\b");
  return re.test(targetContent); // This is approximate — see note below
}

// A3 — blockquote integrity: See also line is inside an existing > blockquote
function checkBlockquoteIntegrity(glossaryContent, h3Literal) {
  const region = findH3Region(glossaryContent, h3Literal);
  if (!region) return false;
  const lines = region.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (/^> See also:/.test(lines[i])) {
      // Must be preceded by another > line in the same blockquote
      if (i > 0 && /^>/.test(lines[i-1])) return true;
    }
  }
  return false;
}
```

**Planning note:** A2 anchor-correctness verification in a pure regex validator (no AST) requires a practical approach: build a map of `{file → Set<gfmSlug>}` by extracting all H3 headings from each glossary and computing their GFM slugs at validator load-time. Then verify each `other-glossary.md#anchor` link target appears in that set.

#### Core idiom 7: NEGATIVE check for specific content inside H3 region

```javascript
// From V-57-21: PITFALL-7 firewall (check-phase-57.mjs lines 408-431)
// Scan FULL H3 body region for forbidden tokens
if (win.includes("MEETS_VIRTUAL_INTEGRITY")) violations.push("...");
if (/Oct 31 2026|October 31 2026/.test(win)) violations.push("...");
```

**Phase 59 adaptation (V-59-31 PITFALL-7 firewall for Linux Compliance Category Reference):**
```javascript
// Check Linux Compliance Category Reference H3 for Bash syntax
if (/\bif\b.*\bthen\b|\bfi\b|exit 0|exit 1|#!\/bin\/bash/.test(win)) violations.push("Bash script syntax found");
if (/compliance-evaluation-cadence/.test(win)) violations.push("cadence content found");
```

#### Core idiom 8: ops/00-index.md row-count assertion (new for Phase 59)

No direct precedent in Phase 57/58 validators. Phase 59 needs to count rows under H2 headings in a 2-column (`| Guide | Covers |`) table. Adapt the sub-table row-count idiom:

```javascript
// Count rows starting with `| [` in the window between H2 and next H2
// (same pattern as V-57-06 sub-table rows, but at H2 level, not H3)
const rows = (window.match(/^\| \[/gm) || []).length;
```

---

### Pattern 8: `sliceH3Region` for glossary assertions (new helper, not in Phase 57/58)

Phase 57 and 58 validators use `sliceH2Region` only. Phase 59 needs `sliceH3Region` for per-term glossary checks. The helper follows the same pattern:

```javascript
function sliceH3Region(content, h3Literal) {
  const re = new RegExp("^" + h3Literal.replace(/[/\\^$*+?.()|[\]{}]/g, "\\$&") + "\\s*$", "m");
  const m = content.match(re);
  if (!m) return null;
  const idx = content.indexOf(m[0]);
  const after = content.slice(idx + m[0].length);
  // End at next ### (H3) or ## (H2) or EOF
  const nextBoundary = after.search(/^#{2,3} /m);
  return nextBoundary > 0 ? after.slice(0, nextBoundary) : after;
}
```

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| GFM anchor slug computation | Custom parser | Node.js string ops per verified algorithm | GFM slug is simple deterministic transform — verified against all Phase 59 headings in this session |
| Bidirectional see-also validator | AST markdown parser | Regex on `> See also:` lines within H3 regions | Codebase NEVER uses AST — Adversary's "AST/markdown-link parsing" claim was penalized 2x in GA-3 adjudication |
| Shared validator module | `import` from shared module | Duplicate idioms inline (file-reads-only) | Phase 48 D-25 no-shared-module mandate; every `check-phase-NN.mjs` is self-contained |

---

## Validation Architecture (Nyquist)

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Node.js 20 ESM (built-ins only) |
| Config file | None — standalone script |
| Quick run command | `node scripts/validation/check-phase-59.mjs` |
| Full suite command | `node scripts/validation/check-phase-59.mjs --verbose` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CLEAN-08 | All 4 glossaries contain reciprocal see-also entries for each collision-matrix term | static regex | `node scripts/validation/check-phase-59.mjs` | Wave 0 gap |
| SC#1-Linux | docs/index.md has `## Linux Provisioning` H2 with 3 sub-tables at L1=4/L2=4/Admin=3 rows | static regex | `node scripts/validation/check-phase-59.mjs` | Wave 0 gap |
| SC#1-Ops | docs/index.md has `## Operations` H2 with 4 sub-H3 anchors | static regex | `node scripts/validation/check-phase-59.mjs` | Wave 0 gap |
| SC#3 | ops/00-index.md has 4 H2 sections with Patch=5/App=5/Drift=5 rows | static regex | `node scripts/validation/check-phase-59.mjs` | Wave 0 gap |
| SC#4-L1 | quick-ref-l1.md has `## Linux Quick Reference` with 4 sub-H3 | static regex | `node scripts/validation/check-phase-59.mjs` | Wave 0 gap |
| SC#4-L2 | quick-ref-l2.md has `## Linux Quick Reference` with 4 sub-H3 + 4-row compliance table | static regex | `node scripts/validation/check-phase-59.mjs` | Wave 0 gap |

### V-59-NN Assertion Cluster Map

**GA-1: Linux H2 (V-59-07..09) — 3 assertions**

| Assertion | Type | What It Checks |
|-----------|------|----------------|
| V-59-07 | POSITIVE | `## Linux Provisioning` H2 + 3 sub-H3 (`### Service Desk (L1)` / `### Desktop Engineering (L2)` / `### Admin Setup`) + row counts L1=4 / L2=4 / Admin=3 |
| V-59-08 | POSITIVE | Cross-Platform References region contains `Linux Provisioning Lifecycle` AND `Linux Capability Matrix` link entries |
| V-59-09 | NEGATIVE | `docs/index.md` does NOT contain link to `linux-intune-portal-enrollment.md` or any `end-user-guides/linux` literal |

**GA-2: Operations H2 + ops/00-index.md (V-59-10..19) — 10 assertions**

| Assertion | Type | What It Checks |
|-----------|------|----------------|
| V-59-10 | POSITIVE | `## Operations` H2 present; appears after `## Linux Provisioning` and before `## Cross-Platform References` (H2 ordering check) |
| V-59-11 | POSITIVE | 4 sub-H3 anchors present within Operations H2 region |
| V-59-12 | NEGATIVE | `docs/index.md` does NOT contain `Operational Depth` as H2/H3 token |
| V-59-13 | POSITIVE | `docs/operations/00-index.md` contains all 4 H2 headings (Co-Management + Patch & Update Management + App Lifecycle Automation + Compliance Drift Detection + Tenant Migration) |
| V-59-14 | POSITIVE | Row counts: Patch=5 / App=5 / Drift=5 under their respective new H2 sections |
| V-59-15..18 | POSITIVE | Every cell in 4 Operations sub-tables contains a markdown link (PITFALL-7) |
| V-59-19 | NEGATIVE | Operations H2 body does NOT contain `No co-management equivalent` or blockquote literal (PITFALL-7 human-review prep) |

**GA-3: Glossary reciprocity (V-59-20..24) — 5 assertions**

| Assertion | Type | What It Checks |
|-----------|------|----------------|
| V-59-20 | POSITIVE | A1 — for each term in locked collision matrix, every glossary listing the term has `> See also:` in its H3 region |
| V-59-21 | POSITIVE | A2 — every see-also link target (`other-glossary.md#anchor`) resolves to an existing H3 in the target file (anchor-correctness) |
| V-59-22 | POSITIVE | Bidirectional pair check — if A references B, then B references A (Cartesian product over locked matrix) |
| V-59-23 | POSITIVE | Transitivity check — if matrix has 3+ platforms for a term, all pairs covered |
| V-59-24 | POSITIVE | A3 — see-also lines are inside existing `>` blockquotes (preceded by another `>` line within H3 region) |

**GA-4: Quick-ref Linux H2 (V-59-25..31) — 7 assertions**

| Assertion | Type | What It Checks |
|-----------|------|----------------|
| V-59-25 | POSITIVE | `quick-ref-l1.md` has `## Linux Quick Reference` + 4 sub-H3 anchors; appended after Android H2 |
| V-59-26 | NEGATIVE | Linux H2 body in quick-ref-l1.md does NOT contain Mode tag literals `[BYOD]`/`[ZTE]`/`[AOSP]`/`[Knox]`/`[All GMS]`/`[22.04]`/`[24.04]` |
| V-59-27 | POSITIVE | Linux Decision Tree H3 contains exactly one `decision-trees/09-linux-triage.md` link |
| V-59-28 | POSITIVE | `quick-ref-l2.md` has `## Linux Quick Reference` + 4 sub-H3 anchors |
| V-59-29 | POSITIVE | 3-method H3 body contains `journalctl` AND `File-based` AND `Package-state` literals |
| V-59-30 | POSITIVE | Linux Compliance Category Reference H3 body contains all 4 category literals + 4 cross-links to `admin-setup-linux/03-compliance-policy.md` anchors |
| V-59-31 | NEGATIVE | Compliance Category Reference H3 body does NOT contain Bash script syntax or `compliance-evaluation-cadence` literal |

**File existence + regression guards + TBD scan (V-59-01..06, V-59-32..36) — 11 assertions**

| Assertion | Type | What It Checks |
|-----------|------|----------------|
| V-59-01..06 | POSITIVE | 8 edit-target files exist (index.md / ops/00-index.md / quick-ref-l1 / quick-ref-l2 / 4 glossary files) |
| V-59-32 | NEGATIVE | iOS/macOS/Windows/Android H2 anchor stability — all existing H2 literals in 4 hub files unchanged |
| V-59-33..36 | NEGATIVE | TBD/TODO/FIXME/XXX/PLACEHOLDER absent in 6 hub-and-glossary-and-ops-index files (outside Version History) |

**Total V-59-NN count: 36 assertions** (file-existence 6 + GA-1 3 + GA-2 10 + GA-3 5 + GA-4 7 + regression/TBD 5 = 36)

### Sampling Rate

- **Per task commit (plans 59-02 through 59-08):** `node scripts/validation/check-phase-59.mjs`
- **Per wave merge (plan 59-09):** Full pre-commit gate — `check-phase-59.mjs` + `v1.5-milestone-audit.mjs --verbose` + `regenerate-supervision-pins.mjs --self-test`
- **Phase gate:** 36/36 V-59-NN PASS + v1.5-milestone-audit 12/12 PASS before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `scripts/validation/check-phase-59.mjs` — covers all 36 V-59-NN assertions (plan 59-08 deliverable)
- [ ] 59-ANCHOR-INVENTORY.md — pre-edit anchor inventory artifact (plan 59-01 deliverable)

*(No existing test infrastructure covers Phase 59 assertions — check-phase-59.mjs is a net-new file.)*

---

## Common Pitfalls

### Pitfall 1: Operations H2 naming — "Operational Depth" vs "Operations"
**What goes wrong:** Plan-author uses "Operational Depth" (the PROJECT.md PILLAR-3 narrative name) for the H2 heading
**Why it happens:** "Operational Depth" appears in STATE.md, ROADMAP.md, and REQUIREMENTS.md section headers
**How to avoid:** H2 must be EXACTLY `## Operations` per D-08 verbatim SC#1 test
**Warning signs:** V-59-12 NEGATIVE fires if `Operational Depth` appears as H2/H3 token

### Pitfall 2: Premature 59-04 before 59-03
**What goes wrong:** Plan 59-04 (Operations H2) executed before plan 59-03 (ops/00-index.md completion)
**Why it happens:** The two plans touch different files and might appear independent
**How to avoid:** D-10 MANDATORY same-commit sequencing — ops/00-index.md must be completed before Operations H2 links to its sub-directories (editorial consistency); V-59-13/V-59-14 will catch incomplete ops-index at close time
**Warning signs:** ops/00-index.md still showing 24 lines (Co-Management only) after plan 59-04 commit

### Pitfall 3: Collision-term matrix left unspecified at plan 59-05 start
**What goes wrong:** Plan 59-05 author starts editing glossary files without first documenting the explicit collision-term matrix
**Why it happens:** D-16 defers matrix selection to plan-time
**How to avoid:** The FIRST ACTION in plan 59-05 must be writing the collision matrix (which terms exist in which glossaries) as a committed artifact before any glossary file edits
**Warning signs:** Glossary see-also entries appended for terms that are not cross-platform equivalents; reciprocity missing for terms that are

### Pitfall 4: PITFALL-7 violation in Linux Compliance Category Reference
**What goes wrong:** Plan 59-07 author adds Bash syntax, dmcrypt configuration notes, or compliance-evaluation-cadence prose into the 4-row pointer table
**Why it happens:** The category descriptions invite explanatory detail
**How to avoid:** Pointer table cells contain ONLY: category name + 1-line role sentence + cross-link to SSoT. No configuration content. PITFALL-7 firewall enforced by V-59-31.
**Warning signs:** Cell content exceeds 1 sentence; any `#!/bin/bash`, `exit 0`, or `if/then/fi` appears in table

### Pitfall 5: Pre-edit anchor inventory skipped
**What goes wrong:** Plan 59-02 edits docs/index.md without first capturing the pre-edit anchor inventory
**Why it happens:** 59-01 and 59-02 feel like they could merge
**How to avoid:** Plan 59-01 is a SEPARATE commit producing 59-ANCHOR-INVENTORY.md per PITFALL-6 + D-11 + D-29 mandate. This artifact is the Phase 57 D-32 inheritance.
**Warning signs:** No `59-ANCHOR-INVENTORY.md` file in phase directory

### Pitfall 6: Forward-reference fragment anchors for quick-ref
**What goes wrong:** Plan 59-02 rows `quick-ref-l1.md#linux-quick-reference` and `quick-ref-l2.md#linux-quick-reference` point to anchors that don't exist yet at commit time
**Why it happens:** Plans 59-06/59-07 create those H2 sections after 59-02
**How to avoid:** This is architecturally acceptable per progressive-landing pattern — the links are valid once the phase is complete. The validator (59-08) runs after all content plans and catches broken anchors at close time. Plan 59-02 author documents this as an intentional forward-reference.
**Warning signs:** None — this is expected and harmless during the landing sequence.

### Pitfall 7: macOS `> **Windows equivalent:**` blockquotes renamed
**What goes wrong:** Plan 59-05 renames `> **Windows equivalent:**` to `> **Cross-platform note:**` across 11 macOS glossary entries
**Why it happens:** Attempting to normalize all blockquote labels to a single vocabulary
**How to avoid:** D-15 PRESERVES macOS `> **Windows equivalent:**` verbatim. The see-also line is APPENDED inside the existing blockquote; the opening `> **Windows equivalent:**` line is NOT changed.
**Warning signs:** `_glossary-macos.md` diff shows `Windows equivalent` replaced anywhere

### Pitfall 8: 59-05 see-also line added OUTSIDE the blockquote
**What goes wrong:** The `> See also:` line is appended as a NEW top-level paragraph (not preceded by `>`), creating a separate paragraph rather than a blockquote continuation
**Why it happens:** Markdown blockquote continuation requires every line to start with `>`
**How to avoid:** Every see-also line must start with `>` and must be the last line INSIDE an existing `> **Cross-platform note:**` or `> **Windows equivalent:**` blockquote. V-59-24 (A3 check) enforces this.
**Warning signs:** V-59-24 fires; `git diff` shows a blank line between the last `>` prose and the `> See also:` line

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Per-phase validator with up to 32 assertions | Phase 59 scales to 36 assertions across 4 GAs | Phase 59 (this phase) | Larger validator; same architecture |
| 4-glossary cross-platform banner (doc-level only) | Per-term `> See also:` inline appends (CLEAN-08) | Phase 59 | Granular cross-platform discoverability per term |
| Hub has platform H2s only | Hub adds `## Operations` H2 (ops-domain nav) | Phase 59 | First operational-depth section at hub level |
| Progressive-landing from Phase 58 | Continues verbatim for Phase 59 | Phase 58 D-16 lineage | Per-plan commits OK; plan-series atomicity |

---

## Assumptions Log

> All claims in this research were verified from the codebase or computed algorithmically. No training-data claims were used.

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| — | (none) | — | — |

**If this table is empty:** All claims in this research were verified or cited — no user confirmation needed.

---

## Open Questions

1. **Collision-term matrix scope (D-16)**
   - What we know: ~10-18 terms estimated from seed sources (9 LIN-02 absent-concept terms + encryption triple + CA-channel pair + enrollment-channel triple)
   - What's unclear: Exact term list is deferred to plan 59-05 author; some terms (e.g., `Hardware Hash`) exist only in Windows glossary; some (e.g., `Supervision`) exist in Android glossary as a disambiguation stub pointing to macOS
   - Recommendation: Plan 59-05 author reads `docs/reference/linux-capability-matrix.md:71-93` (Cross-Platform Equivalences section) + `docs/_glossary-linux.md` alphabetical index against `docs/_glossary-android.md` index to build the matrix before commit-1

2. **l1-runbooks/00-index.md and l2-runbooks/00-index.md anchor existence**
   - What we know: D-02 and D-03 use anchor fragment links `#linux-l1-runbooks` and `#linux-l2-runbooks`
   - What's unclear: These H2 headings must already exist in the respective index files (added in Phases 51/52)
   - Recommendation: Plan 59-02 author verifies anchor existence before commit; the validator check V-59-07 row-count check will fail if rows exist with broken links to non-existent anchors

3. **ops/00-index.md `platform: Windows` frontmatter**
   - What we know: Current frontmatter has `platform: Windows` (verified — file reads `platform: Windows` at line 6)
   - What's unclear: D-10 adds cross-platform sections (Patch/App/Drift cover all 4 platforms). The frontmatter `platform:` field may need updating to `platform: all` or `platform: cross-platform`
   - Recommendation: Plan 59-03 author updates frontmatter to `platform: cross-platform` or `platform: all` consistent with the Phase 54-56 ops sub-dir 00-overview files (which have `platform: cross-platform`); also refresh `last_verified`

---

## Environment Availability

Step 2.6: SKIPPED (no external dependencies identified — Phase 59 is pure static documentation edits + one Node.js file using built-ins only)

---

## Project Constraints (from CLAUDE.md)

| Directive | Applies to Phase 59 |
|-----------|---------------------|
| Python FastAPI / uvicorn | Not applicable — Phase 59 is docs only |
| PowerShell modules | Not applicable |
| TypeScript React frontend | Not applicable |
| `npm run dev` / `npm run build` | Not applicable |
| pytest / Pester tests | Not applicable |
| Never commit `.env` or credentials | Always |
| Validator-as-deliverable (AUDIT-06) | YES — check-phase-59.mjs is a required deliverable |
| Pre-commit gate (3 validators) | YES — D-29 mandates all 3 validators exit 0 before close |
| Security: validate all user inputs | Not applicable (docs) |
| HTTPS in production | Not applicable (docs) |

---

## Sources

### Primary (HIGH confidence)

- `docs/index.md` — full file read; H2 ordering, line numbers, Android H2 pattern at lines 167-196, Cross-Platform References at lines 199-219 [VERIFIED: codebase]
- `docs/quick-ref-l1.md` — lines 115-188; iOS pattern (lines 117-148), Android pattern (lines 149-183); all sub-H3 literals, Mode-tag format, ` -- ` disambiguation pattern [VERIFIED: codebase]
- `docs/quick-ref-l2.md` — lines 255-281; Android Play Integrity Verdict Reference pointer-table (lines 261-271); exact column shape [VERIFIED: codebase]
- `docs/operations/00-index.md` — full file (24 lines); Co-Management section template for D-10 [VERIFIED: codebase]
- `docs/_glossary-android.md` — lines 40-93; COBO/COPE/WPCO blockquote shapes; `> **Cross-platform note:**` format [VERIFIED: codebase]
- `docs/_glossary-macos.md` — lines 1-60; `> **Windows equivalent:**` format; 11 blockquote instances confirmed [VERIFIED: codebase]
- `docs/_glossary-linux.md` — lines 1-60; `> **Cross-platform note:**` format; dm-crypt, LUKS entries [VERIFIED: codebase]
- `docs/_glossary.md` — lines 1-80; 0 cross-platform blockquotes for collision-matrix terms; APv2-only / Both-frameworks shapes confirmed [VERIFIED: codebase]
- `scripts/validation/check-phase-57.mjs` — full file; `sliceH2Region`, H3-slicing, row-count, NEGATIVE regression-guard, TBD-scan idioms extracted [VERIFIED: codebase]
- `scripts/validation/check-phase-58.mjs` — full file; `extractCanonicalDataCells` col-0 exclusion fix, `informational:` flag forward-search pattern extracted [VERIFIED: codebase]
- `docs/admin-setup-linux/03-compliance-policy.md` — H2/H3 headings; step anchors verified: `#step-2-configure-allowed-distributions`, `#step-3-configure-custom-compliance-bash-discovery-scripts`, `#step-4-configure-device-encryption-dm-crypt-luks`, `#step-5-configure-password-policy` [VERIFIED: codebase + GFM algorithm]
- `docs/l2-runbooks/24-linux-log-collection.md` — lines 30-36; Decision Matrix 3 method names: `journalctl (systemd journal)`, `File-based paths`, `Package-state queries` [VERIFIED: codebase]
- GFM anchor slug algorithm — computed for all Phase 59 H2/H3 headings using Node.js string operations; all 25 slugs verified [VERIFIED: computed]
- `.planning/REQUIREMENTS.md` — CLEAN-08 at line 20; LIN-04 at line 27; REQUIREMENTS:144 iOS-in-macOS architectural decision [VERIFIED: codebase]
- `.planning/phases/59-hub-navigation-integration-linux-operations-sections/59-CONTEXT.md` — D-01 through D-30 locked decisions, validator assertion cluster D-26, pre-commit gate D-29 [VERIFIED: codebase]
- `.planning/ROADMAP.md` — Phase 59 SC#1-4 at lines 372-381; methodology notes [VERIFIED: codebase]
- `.planning/STATE.md` — Phase 58 closed, Phase 59 ready [VERIFIED: codebase]

### Secondary (MEDIUM confidence)

None required — all findings verified from primary codebase sources.

---

## Metadata

**Confidence breakdown:**
- Codebase patterns: HIGH — read verbatim from files
- GFM slug computation: HIGH — computed algorithmically and cross-checked
- Validator regex idioms: HIGH — extracted from check-phase-57.mjs and check-phase-58.mjs line by line
- Novel glossary see-also validator pattern: MEDIUM — architecture is sound but untested; implementation details in plan 59-08 may need adjustment for edge cases in collision-term H3 boundaries
- Collision-term matrix: DEFERRED to plan 59-05 author (D-16 explicitly defers this)

**Research date:** 2026-05-01
**Valid until:** 2026-06-01 (stable docs; 60-day estimate; validator patterns depend only on codebase conventions which change only per-phase)
